import React, { useState } from 'react';
import { X, Download, Copy, Check, FileText, Layers, Trash2 } from 'lucide-react';
import { DorkItem } from '../types';
import { substituteTarget, copyToClipboard } from '../utils/dorkUtils';

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDorks: DorkItem[];
  target: string;
  onClearSelection: () => void;
}

export const BatchModal: React.FC<BatchModalProps> = ({
  isOpen,
  onClose,
  selectedDorks,
  target,
  onClearSelection,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawQueries = selectedDorks.map((d) => substituteTarget(d.query, target || '[TARGET]'));
  const queriesText = rawQueries.join('\n');

  const handleCopyText = async () => {
    const success = await copyToClipboard(queriesText);
    if (success) {
      setCopiedFormat('text');
      setTimeout(() => setCopiedFormat(null), 2000);
    }
  };

  const handleCopyJson = async () => {
    const payload = JSON.stringify(
      selectedDorks.map((d) => ({
        title: d.title,
        query: substituteTarget(d.query, target || '[TARGET]'),
        category: d.category,
        subcategory: d.subcategory,
        severity: d.severity,
      })),
      null,
      2
    );
    const success = await copyToClipboard(payload);
    if (success) {
      setCopiedFormat('json');
      setTimeout(() => setCopiedFormat(null), 2000);
    }
  };

  const handleDownloadTxt = () => {
    const cleanTarget = target.replace(/[^a-zA-Z0-9.-]/g, '_') || 'target';
    const blob = new Blob([queriesText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `infosec_dorks_${cleanTarget}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const cleanTarget = target.replace(/[^a-zA-Z0-9.-]/g, '_') || 'target';
    const payload = JSON.stringify(
      selectedDorks.map((d) => ({
        title: d.title,
        query: substituteTarget(d.query, target || '[TARGET]'),
        category: d.category,
        subcategory: d.subcategory,
        severity: d.severity,
      })),
      null,
      2
    );
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `infosec_dorks_${cleanTarget}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Batch Export Workspace</h2>
              <p className="text-xs text-slate-400">
                {selectedDorks.length} queries queued for target{' '}
                <span className="font-mono text-emerald-400 font-semibold">{target || '[TARGET]'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedDorks.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            <FileText className="h-10 w-10 mx-auto text-slate-600 mb-2" />
            <p className="text-sm font-medium">No dorks selected yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Check the boxes on any dork cards to stage them for batch export.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Preview Box */}
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 max-h-56 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1.5 select-all">
              {rawQueries.map((q, idx) => (
                <div key={idx} className="pb-1 border-b border-slate-900 last:border-0">
                  {q}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={handleCopyText}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedFormat === 'text' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFormat === 'text' ? 'Copied Queries!' : 'Copy Raw Text (Newline List)'}</span>
              </button>

              <button
                onClick={handleCopyJson}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                {copiedFormat === 'json' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedFormat === 'json' ? 'Copied JSON!' : 'Copy Structured JSON'}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
              >
                <Download className="h-4 w-4" />
                <span>Download .TXT File</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
              >
                <Download className="h-4 w-4" />
                <span>Download .JSON File</span>
              </button>
            </div>

            {/* Clear Selection */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={onClearSelection}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear Selection ({selectedDorks.length})</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
