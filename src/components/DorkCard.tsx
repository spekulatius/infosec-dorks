import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Bookmark, ShieldAlert, ChevronDown, ChevronUp, Trash2, Tag } from 'lucide-react';
import { DorkItem, SearchEngine } from '../types';
import { substituteTarget, getSearchUrl, copyToClipboard } from '../utils/dorkUtils';

interface DorkCardProps {
  dork: DorkItem;
  target: string;
  searchEngine: SearchEngine;
  rawMode: boolean;
  isBookmarked: boolean;
  isSelected: boolean;
  onToggleBookmark: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onDeleteCustom?: (id: string) => void;
  onSelectTag?: (tag: string) => void;
}

export const DorkCard: React.FC<DorkCardProps> = ({
  dork,
  target,
  searchEngine,
  rawMode,
  isBookmarked,
  isSelected,
  onToggleBookmark,
  onToggleSelect,
  onDeleteCustom,
  onSelectTag,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const displayQuery = rawMode
    ? dork.query
    : substituteTarget(dork.query, target || '[TARGET]');

  const handleCopy = async () => {
    const success = await copyToClipboard(displayQuery);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const searchUrl = getSearchUrl(displayQuery, searchEngine);

  const getSeverityBadge = () => {
    switch (dork.severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
      case 'info':
      default:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    }
  };

  return (
    <div
      className={`border rounded-xl transition-all duration-200 overflow-hidden ${
        isSelected
          ? 'bg-slate-900/90 border-emerald-500/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
          : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      <div className="p-4 sm:p-5">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Selection Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(dork.id)}
              className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
              title="Select for batch export"
            />
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                  {dork.subcategory}
                </span>
                <span className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${getSeverityBadge()}`}>
                  {dork.severity}
                </span>
                {dork.isCustom && (
                  <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    Custom
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-100 text-base leading-snug">
                {dork.title}
              </h3>
            </div>
          </div>

          {/* Action buttons (Bookmark, Delete) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onToggleBookmark(dork.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this dork'}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
            </button>
            {dork.isCustom && onDeleteCustom && (
              <button
                onClick={() => onDeleteCustom(dork.id)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/40 transition-colors"
                title="Delete custom dork"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Query Box */}
        <div className="mt-3 relative group">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs sm:text-sm text-emerald-400 break-all leading-relaxed shadow-inner pr-24 select-all">
            {displayQuery}
          </div>

          <div className="absolute right-2 top-2 flex items-center gap-1 bg-slate-950/90 backdrop-blur-sm p-1 rounded-md border border-slate-800">
            <button
              onClick={handleCopy}
              className={`p-1.5 rounded transition-all text-xs flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Copy query to clipboard"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="text-[11px] hidden sm:inline">Copy</span>
                </>
              )}
            </button>

            <a
              href={searchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-1 text-xs"
              title={`Run on ${searchEngine}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="text-[11px] hidden sm:inline capitalize">Search</span>
            </a>
          </div>
        </div>

        {/* Short description */}
        <p className="mt-2.5 text-xs text-slate-400 leading-normal">
          {dork.description}
        </p>

        {/* Tags & Details Toggle */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {dork.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag && onSelectTag(tag)}
                className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/40 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-slate-400 hover:text-emerald-400 font-medium flex items-center gap-1 ml-auto transition-colors"
          >
            <span>{expanded ? 'Less info' : 'Defensive info'}</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Expanded Defensive Remediation Drawer */}
        {expanded && (
          <div className="mt-3 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div>
              <span className="font-semibold text-emerald-400 block mb-1 flex items-center gap-1.5">
                <ShieldAlert className="h-3.5 w-3.5 text-emerald-400" />
                Defensive Audit Context & Remediation
              </span>
              <p className="text-slate-300 leading-relaxed">
                {dork.remediation || 'Audit public indexing permissions and verify that sensitive resources are placed behind authentication or excluded in server configuration.'}
              </p>
            </div>
            {dork.fileExtensions && dork.fileExtensions.length > 0 && (
              <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-400 font-semibold">Matched Extensions:</span>
                {dork.fileExtensions.map((ext) => (
                  <span key={ext} className="font-mono text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-emerald-400">
                    .{ext}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
