import React from 'react';
import { Search, Filter, X, Tag } from 'lucide-react';
import { ALL_CATEGORIES, ALL_SEVERITIES } from '../data/dorks';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSeverity: string;
  onSeverityChange: (sev: string) => void;
  selectedExtension: string;
  onExtensionChange: (ext: string) => void;
  activeTag: string;
  onClearTag: () => void;
  onResetFilters: () => void;
  categoryCounts: Record<string, number>;
}

const COMMON_EXTENSIONS = ['env', 'sql', 'bak', 'conf', 'key', 'pem', 'xml', 'log', 'db', 'ovpn', 'php'];

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSeverity,
  onSeverityChange,
  selectedExtension,
  onExtensionChange,
  activeTag,
  onClearTag,
  onResetFilters,
  categoryCounts,
}) => {
  const hasActiveFilters = Boolean(
    search || selectedCategory !== 'All' || selectedSeverity !== 'all' || selectedExtension || activeTag
  );

  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        {ALL_CATEGORIES.map((cat) => {
          const count = categoryCounts[cat] || 0;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-sm'
                  : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Input & Dropdown Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search keywords, extensions (e.g. .env, s3, rsa, password, login)..."
            className="w-full pl-9 pr-9 py-2 bg-slate-900 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 transition-colors"
          />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-2 px-1.5 flex items-center text-slate-500 hover:text-slate-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Severity Select */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg focus:border-emerald-500 transition-colors"
          >
            {ALL_SEVERITIES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="px-2.5 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 text-xs transition-colors flex items-center gap-1 shrink-0"
              title="Reset all filters"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Extension Quick-Filter Chips & Active Tag */}
      <div className="flex items-center gap-1.5 flex-wrap text-xs text-slate-400">
        <span className="text-slate-500">File Extensions:</span>
        {COMMON_EXTENSIONS.map((ext) => {
          const isSelected = selectedExtension === ext;
          return (
            <button
              key={ext}
              onClick={() => onExtensionChange(isSelected ? '' : ext)}
              className={`px-2 py-0.5 rounded font-mono transition-colors border ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              .{ext}
            </button>
          );
        })}

        {/* Active Tag pill */}
        {activeTag && (
          <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs">
            <Tag className="h-3 w-3" />
            #{activeTag}
            <button onClick={onClearTag} className="hover:text-white">
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
