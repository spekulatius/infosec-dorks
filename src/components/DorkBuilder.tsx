import React, { useState, useMemo } from 'react';
import { X, Plus, Terminal, Search, ExternalLink, Save, Check } from 'lucide-react';
import { DorkItem, SearchEngine } from '../types';
import { getSearchUrl, copyToClipboard } from '../utils/dorkUtils';

interface DorkBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  target: string;
  searchEngine: SearchEngine;
  onSaveDork: (dork: DorkItem) => void;
}

export const DorkBuilder: React.FC<DorkBuilderProps> = ({
  isOpen,
  onClose,
  target,
  searchEngine,
  onSaveDork,
}) => {
  const [title, setTitle] = useState('');
  const [siteTarget, setSiteTarget] = useState(target || 'example.com');
  const [inurl, setInurl] = useState('');
  const [intitle, setIntitle] = useState('');
  const [intext, setIntext] = useState('');
  const [ext, setExt] = useState('');
  const [exclude, setExclude] = useState('');
  const [customAppend, setCustomAppend] = useState('');
  const [subcategory, setSubcategory] = useState('Custom Recon');
  const [severity, setSeverity] = useState<'critical' | 'high' | 'medium' | 'info'>('high');
  const [copied, setCopied] = useState(false);

  // Construct query
  const constructedQuery = useMemo(() => {
    const parts: string[] = [];

    if (siteTarget.trim()) {
      parts.push(`site:${siteTarget.trim()}`);
    }

    if (ext.trim()) {
      const exts = ext.split(',').map((e) => e.trim().replace(/^\./, '')).filter(Boolean);
      if (exts.length === 1) {
        parts.push(`ext:${exts[0]}`);
      } else if (exts.length > 1) {
        parts.push(`(${exts.map((e) => `ext:${e}`).join(' | ')})`);
      }
    }

    if (inurl.trim()) {
      parts.push(`inurl:${inurl.trim()}`);
    }

    if (intitle.trim()) {
      parts.push(`intitle:"${intitle.trim()}"`);
    }

    if (intext.trim()) {
      parts.push(`intext:"${intext.trim()}"`);
    }

    if (exclude.trim()) {
      const exclusions = exclude.split(' ').map((ex) => ex.trim()).filter(Boolean);
      exclusions.forEach((ex) => parts.push(ex.startsWith('-') ? ex : `-${ex}`));
    }

    if (customAppend.trim()) {
      parts.push(customAppend.trim());
    }

    return parts.join(' ') || 'site:[TARGET]';
  }, [siteTarget, inurl, intitle, intext, ext, exclude, customAppend]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(constructedQuery);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Convert concrete target in query to [TARGET] if matching
    const rawTemplate = siteTarget
      ? constructedQuery.replace(new RegExp(siteTarget, 'g'), '[TARGET]')
      : constructedQuery;

    const newDork: DorkItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      query: rawTemplate,
      category: 'Custom Saved',
      subcategory: subcategory.trim() || 'Custom Recon',
      description: `Custom dork created in query builder targeting ${siteTarget || 'target'}.`,
      tags: ['custom', subcategory.toLowerCase().replace(/\s+/g, '-')],
      severity,
      isCustom: true,
      fileExtensions: ext ? ext.split(',').map((e) => e.trim()) : undefined,
    };

    onSaveDork(newDork);
    onClose();
  };

  const testSearchUrl = getSearchUrl(constructedQuery, searchEngine);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Custom Google Dork Builder</h2>
              <p className="text-xs text-slate-400">Compose, test, and save tailored search operator queries</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Title & Subcategory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dork Name / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Find Exposed API Swagger Specs"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg text-sm text-slate-200 placeholder-slate-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subcategory
              </label>
              <input
                type="text"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                placeholder="e.g. API Discovery, Auth, Cloud"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg text-sm text-slate-200 placeholder-slate-500"
              />
            </div>
          </div>

          {/* Builder Fields */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Search Operators
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Target Domain (<span className="font-mono text-emerald-400">site:</span>)
                </label>
                <input
                  type="text"
                  value={siteTarget}
                  onChange={(e) => setSiteTarget(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  File Extensions (<span className="font-mono text-emerald-400">ext:</span>)
                </label>
                <input
                  type="text"
                  value={ext}
                  onChange={(e) => setExt(e.target.value)}
                  placeholder="Comma separated: sql, env, bak, xml"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  In URL Path (<span className="font-mono text-emerald-400">inurl:</span>)
                </label>
                <input
                  type="text"
                  value={inurl}
                  onChange={(e) => setInurl(e.target.value)}
                  placeholder="e.g. /wp-content or admin"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Page Title (<span className="font-mono text-emerald-400">intitle:</span>)
                </label>
                <input
                  type="text"
                  value={intitle}
                  onChange={(e) => setIntitle(e.target.value)}
                  placeholder="e.g. Index of / or Dashboard"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Exact Body Text (<span className="font-mono text-emerald-400">intext:</span>)
                </label>
                <input
                  type="text"
                  value={intext}
                  onChange={(e) => setIntext(e.target.value)}
                  placeholder="e.g. DB_PASSWORD or syntax error"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Exclusions (<span className="font-mono text-emerald-400">-site:</span>, etc.)
                </label>
                <input
                  type="text"
                  value={exclude}
                  onChange={(e) => setExclude(e.target.value)}
                  placeholder="e.g. -site:github.com -site:stackoverflow.com"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Custom Boolean / Appended Operators
              </label>
              <input
                type="text"
                value={customAppend}
                onChange={(e) => setCustomAppend(e.target.value)}
                placeholder='e.g. AND ("secret_key" | "api_key")'
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-md text-xs font-mono text-slate-200"
              />
            </div>
          </div>

          {/* Severity */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-300">Severity:</label>
            {(['critical', 'high', 'medium', 'info'] as const).map((sev) => (
              <label key={sev} className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer capitalize">
                <input
                  type="radio"
                  name="severity"
                  checked={severity === sev}
                  onChange={() => setSeverity(sev)}
                  className="text-emerald-500 bg-slate-950 border-slate-700"
                />
                {sev}
              </label>
            ))}
          </div>

          {/* Live Preview Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Constructed Live Query:
            </label>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 break-all leading-relaxed select-all">
              {constructedQuery}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : null}
                <span>{copied ? 'Copied' : 'Copy Query'}</span>
              </button>

              <a
                href={testSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 capitalize"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Test in {searchEngine}</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Save to My Dorks</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
