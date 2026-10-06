import React from 'react';
import { Shield, Sparkles, BookOpen, Layers, Bookmark, Terminal, Plus, Download } from 'lucide-react';

interface HeaderProps {
  totalDorks: number;
  bookmarkedCount: number;
  customCount: number;
  activeTarget: string;
  onOpenBuilder: () => void;
  onOpenBatch: () => void;
  onOpenGuide: () => void;
  showBookmarksOnly: boolean;
  onToggleBookmarks: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalDorks,
  bookmarkedCount,
  customCount,
  activeTarget,
  onOpenBuilder,
  onOpenBatch,
  onOpenGuide,
  showBookmarksOnly,
  onToggleBookmarks,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-100 tracking-tight">InfoSec Dorks</span>
                <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OSINT & Recon
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interactive Google Dorks catalog & search generator for defensive auditing
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onToggleBookmarks}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border ${
                showBookmarksOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${showBookmarksOnly ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Saved ({bookmarkedCount})</span>
            </button>

            <button
              onClick={onOpenBuilder}
              className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Dork Builder</span>
            </button>

            <button
              onClick={onOpenBatch}
              className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Batch</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Hardening Guide</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-slate-500" />
              <strong className="text-slate-200">{totalDorks}</strong> dorks cataloged
            </span>
            {customCount > 0 && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Terminal className="h-3.5 w-3.5" />
                <strong className="text-emerald-300">{customCount}</strong> custom queries
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Target:</span>
            <span className="font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400 font-semibold">
              {activeTarget || 'example.com'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
