import React, { useState, useEffect, useMemo } from 'react';
import { DORKS_DATABASE, ALL_CATEGORIES } from './data/dorks';
import { DorkItem, SearchEngine } from './types';
import { Header } from './components/Header';
import { TargetBar } from './components/TargetBar';
import { FilterBar } from './components/FilterBar';
import { DorkCard } from './components/DorkCard';
import { DorkBuilder } from './components/DorkBuilder';
import { BatchModal } from './components/BatchModal';
import { RemediationGuide } from './components/RemediationGuide';
import { CheckSquare, Square, Download, Sparkles, Shield, Github } from 'lucide-react';

const STORAGE_BOOKMARKS_KEY = 'infosec_dorks_bookmarks';
const STORAGE_CUSTOM_KEY = 'infosec_dorks_custom';
const STORAGE_TARGET_KEY = 'infosec_dorks_target';

export const App: React.FC = () => {
  // State
  const [target, setTarget] = useState<string>(() => {
    return localStorage.getItem(STORAGE_TARGET_KEY) || 'example.com';
  });
  const [searchEngine, setSearchEngine] = useState<SearchEngine>('google');
  const [rawMode, setRawMode] = useState<boolean>(false);

  // Filters
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedExtension, setSelectedExtension] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);

  // Selection & Modals
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [isBatchOpen, setIsBatchOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);

  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set(['surf-config-1', 'surf-db-1', 'surf-git-1']);
    } catch {
      return new Set(['surf-config-1', 'surf-db-1', 'surf-git-1']);
    }
  });

  // Custom user dorks
  const [customDorks, setCustomDorks] = useState<DorkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_TARGET_KEY, target);
  }, [target]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customDorks));
  }, [customDorks]);

  // Combined dorks
  const allDorks = useMemo(() => {
    return [...customDorks, ...DORKS_DATABASE];
  }, [customDorks]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: allDorks.length,
      'Surface Discovery': 0,
      Services: 0,
      'Cloud Services & Online Dev Tools': 0,
      'Custom Saved': customDorks.length,
    };

    allDorks.forEach((d) => {
      if (counts[d.category] !== undefined) {
        counts[d.category] += 1;
      }
    });

    return counts;
  }, [allDorks, customDorks.length]);

  // Filtered dorks
  const filteredDorks = useMemo(() => {
    return allDorks.filter((dork) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Custom Saved' && !dork.isCustom) return false;
        if (selectedCategory !== 'Custom Saved' && dork.category !== selectedCategory) return false;
      }

      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.has(dork.id)) {
        return false;
      }

      // Severity filter
      if (selectedSeverity !== 'all' && dork.severity !== selectedSeverity) {
        return false;
      }

      // Extension filter
      if (selectedExtension) {
        const hasExtInArray = dork.fileExtensions?.some(
          (ext) => ext.toLowerCase() === selectedExtension.toLowerCase()
        );
        const hasExtInQuery = dork.query.toLowerCase().includes(selectedExtension.toLowerCase());
        if (!hasExtInArray && !hasExtInQuery) {
          return false;
        }
      }

      // Tag filter
      if (activeTag && !dork.tags.includes(activeTag)) {
        return false;
      }

      // Text search
      if (search.trim()) {
        const queryNorm = search.toLowerCase().trim();
        const matchesTitle = dork.title.toLowerCase().includes(queryNorm);
        const matchesQuery = dork.query.toLowerCase().includes(queryNorm);
        const matchesSubcat = dork.subcategory.toLowerCase().includes(queryNorm);
        const matchesDesc = dork.description.toLowerCase().includes(queryNorm);
        const matchesTags = dork.tags.some((t) => t.toLowerCase().includes(queryNorm));
        if (!matchesTitle && !matchesQuery && !matchesSubcat && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [
    allDorks,
    selectedCategory,
    showBookmarksOnly,
    bookmarkedIds,
    selectedSeverity,
    selectedExtension,
    activeTag,
    search,
  ]);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAllFiltered = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      filteredDorks.forEach((d) => next.add(d.id));
      return next;
    });
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const handleSaveCustomDork = (newDork: DorkItem) => {
    setCustomDorks((prev) => [newDork, ...prev]);
  };

  const handleDeleteCustomDork = (id: string) => {
    setCustomDorks((prev) => prev.filter((d) => d.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedSeverity('all');
    setSelectedExtension('');
    setActiveTag('');
    setShowBookmarksOnly(false);
  };

  const selectedDorksList = useMemo(() => {
    return allDorks.filter((d) => selectedIds.has(d.id));
  }, [allDorks, selectedIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <Header
        totalDorks={allDorks.length}
        bookmarkedCount={bookmarkedIds.size}
        customCount={customDorks.length}
        activeTarget={target}
        onOpenBuilder={() => setIsBuilderOpen(true)}
        onOpenBatch={() => setIsBatchOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        showBookmarksOnly={showBookmarksOnly}
        onToggleBookmarks={() => setShowBookmarksOnly(!showBookmarksOnly)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Target & Provider Configuration Bar */}
        <TargetBar
          target={target}
          onTargetChange={setTarget}
          searchEngine={searchEngine}
          onSearchEngineChange={setSearchEngine}
          rawMode={rawMode}
          onToggleRawMode={() => setRawMode(!rawMode)}
        />

        {/* Filters & Search */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSeverity={selectedSeverity}
          onSeverityChange={setSelectedSeverity}
          selectedExtension={selectedExtension}
          onExtensionChange={setSelectedExtension}
          activeTag={activeTag}
          onClearTag={() => setActiveTag('')}
          onResetFilters={handleResetFilters}
          categoryCounts={categoryCounts}
        />

        {/* Batch Selection Banner */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-slate-200">{filteredDorks.length}</strong> of{' '}
              {allDorks.length} dorks
            </span>
            <button
              onClick={handleSelectAllFiltered}
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              <span>Select all ({filteredDorks.length})</span>
            </button>
            {selectedIds.size > 0 && (
              <button
                onClick={handleDeselectAll}
                className="hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <Square className="h-3.5 w-3.5" />
                <span>Deselect all</span>
              </button>
            )}
          </div>

          {selectedIds.size > 0 && (
            <button
              onClick={() => setIsBatchOpen(true)}
              className="px-3 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/40 flex items-center gap-1.5 font-medium transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export {selectedIds.size} Selected</span>
            </button>
          )}
        </div>

        {/* Dorks Grid */}
        {filteredDorks.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl py-16 px-4 text-center">
            <Shield className="h-12 w-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-200">No matching dorks found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, clearing the file extension filter, or switching category tabs.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredDorks.map((dork) => (
              <DorkCard
                key={dork.id}
                dork={dork}
                target={target}
                searchEngine={searchEngine}
                rawMode={rawMode}
                isBookmarked={bookmarkedIds.has(dork.id)}
                isSelected={selectedIds.has(dork.id)}
                onToggleBookmark={handleToggleBookmark}
                onToggleSelect={handleToggleSelect}
                onDeleteCustom={dork.isCustom ? handleDeleteCustomDork : undefined}
                onSelectTag={(tag) => setActiveTag(tag)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-400">InfoSec Dorks</span>
            <span>—</span>
            <span>Curated OSINT & Search Engine Intelligence for defensive security</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Repository: bambambambam101/infosec-dorks</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DorkBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        target={target}
        searchEngine={searchEngine}
        onSaveDork={handleSaveCustomDork}
      />

      <BatchModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
        selectedDorks={selectedDorksList}
        target={target}
        onClearSelection={handleDeselectAll}
      />

      <RemediationGuide
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
};
