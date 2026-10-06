import React from 'react';
import { Target, Globe, RefreshCw, X, Search, Check } from 'lucide-react';
import { SearchEngine } from '../types';

interface TargetBarProps {
  target: string;
  onTargetChange: (target: string) => void;
  searchEngine: SearchEngine;
  onSearchEngineChange: (engine: SearchEngine) => void;
  rawMode: boolean;
  onToggleRawMode: () => void;
}

const PRESET_TARGETS = [
  'example.com',
  'target.corp',
  'uber.com',
  'shopify.com',
  'tesla.com',
  'github.com'
];

export const TargetBar: React.FC<TargetBarProps> = ({
  target,
  onTargetChange,
  searchEngine,
  onSearchEngineChange,
  rawMode,
  onToggleRawMode,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Target Input */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-emerald-400" />
            Audit Target Domain / Organization
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Globe className="h-4 w-4 text-emerald-500" />
            </div>
            <input
              type="text"
              value={target}
              onChange={(e) => onTargetChange(e.target.value)}
              placeholder="e.g. example.com or organization-name"
              className="w-full pl-10 pr-24 py-2.5 bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-lg text-sm text-slate-100 placeholder-slate-500 font-mono transition-colors"
            />
            {target && (
              <button
                onClick={() => onTargetChange('')}
                className="absolute inset-y-0 right-2 px-2 flex items-center text-slate-500 hover:text-slate-300"
                title="Clear target"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap text-xs">
            <span className="text-slate-500">Presets:</span>
            {PRESET_TARGETS.map((preset) => (
              <button
                key={preset}
                onClick={() => onTargetChange(preset)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  target.toLowerCase() === preset.toLowerCase()
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Engine & Preview Toggles */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Search Provider
            </label>
            <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
              {(['google', 'duckduckgo', 'bing'] as SearchEngine[]).map((engine) => (
                <button
                  key={engine}
                  onClick={() => onSearchEngineChange(engine)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                    searchEngine === engine
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {engine}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Query View
            </label>
            <button
              onClick={onToggleRawMode}
              className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all ${
                rawMode
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{rawMode ? 'Template ([TARGET])' : 'Target Substituted'}</span>
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
