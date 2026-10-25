import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Bookmark,
  Calculator,
  Calendar,
  ChevronLeft,
  Download,
  FileSpreadsheet,
  Menu,
  Search,
  Scale,
  Type,
  X
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'act'
  | 'rules'
  | 'schedules'
  | 'guides'
  | 'penalties'
  | 'calendar'
  | 'calculators'
  | 'pdfs'
  | 'fiscal-framework';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

const navigationGroups: {
  label: string;
  items: { id: ActiveTab; label: string; icon: LucideIcon }[];
}[] = [
  {
    label: 'मुख्य पृष्ठ',
    items: [{ id: 'home', label: 'गृहपृष्ठ', icon: BookOpen }]
  },
  {
    label: 'कानूनी प्रावधानहरू',
    items: [
      { id: 'act', label: 'ऐन, २०७६', icon: Scale },
      { id: 'rules', label: 'नियमावली, २०७७', icon: BookOpen },
      { id: 'schedules', label: 'अनुसूचीहरू (१–१९)', icon: FileSpreadsheet },
      { id: 'fiscal-framework', label: 'संविधान तथा संघीय वित्त', icon: Scale },
      { id: 'pdfs', label: 'मूल कानून PDF', icon: Download }
    ]
  },
  {
    label: 'गाइड तथा क्याल्कुलेटर',
    items: [
      { id: 'guides', label: 'सरल गाइड', icon: BookOpen },
      { id: 'penalties', label: 'सजाय र जरिवाना', icon: AlertTriangle },
      { id: 'calendar', label: 'वित्तीय क्यालेन्डर', icon: Calendar },
      { id: 'calculators', label: 'क्याल्कुलेटर', icon: Calculator }
    ]
  }
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  bookmarksCount,
  onOpenBookmarks,
  fontSize,
  onChangeFontSize,
  sidebarCollapsed,
  onToggleSidebar
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarWidth = sidebarCollapsed ? 'md:w-20' : 'md:w-[14.4rem]';
  const toolbarOffset = sidebarCollapsed ? 'md:left-20' : 'md:left-[14.4rem]';

  const selectTab = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="मेनु बन्द गर्नुहोस्"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[14.4rem] flex-col bg-[#21446b] text-blue-100 shadow-xl transition-all duration-200 ${sidebarWidth} ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className={`flex items-center justify-between border-b border-white/10 px-4 py-4 ${sidebarCollapsed ? 'md:justify-center md:px-2' : ''}`}>
          <button
            type="button"
            onClick={() => selectTab('home')}
            className={`flex min-w-0 items-center gap-3 text-left ${sidebarCollapsed ? 'md:justify-center' : ''}`}
            aria-label="गृहपृष्ठ"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Scale className="h-5 w-5" />
            </span>
            <span className={`min-w-0 ${sidebarCollapsed ? 'md:hidden' : ''}`}>
              <span className="block truncate text-sm font-bold text-white">आर्थिक कार्यविधि पोर्टल</span>
              <span className="mt-0.5 block truncate text-[10px] text-blue-200">
                ऐन २०७६ · नियमावली २०७७
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 768) setMobileMenuOpen(false);
              else onToggleSidebar();
            }}
            className={`rounded-lg p-1.5 text-blue-200 transition-colors hover:bg-white/10 hover:text-white ${
              sidebarCollapsed ? 'md:hidden' : ''
            }`}
            aria-label={sidebarCollapsed ? 'साइडबार विस्तार गर्नुहोस्' : 'साइडबार साँघुरो गर्नुहोस्'}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-1.5 text-blue-200 hover:bg-white/10 hover:text-white md:hidden"
            aria-label="मेनु बन्द गर्नुहोस्"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className={`space-y-2 border-b border-white/10 p-3 ${sidebarCollapsed ? 'md:px-2' : ''}`}>
          <button
            type="button"
            onClick={onOpenSearch}
            title="दफा, नियम वा विषय खोज्नुहोस्"
            className={`flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/10 p-2 text-xs text-blue-100 transition-colors hover:bg-white/15 ${
              sidebarCollapsed ? 'md:justify-center' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4 shrink-0" />
              <span className={sidebarCollapsed ? 'md:hidden' : ''}>दफा, नियम वा विषय खोज्नुहोस्</span>
            </span>
            <kbd className={`rounded bg-white/10 px-1.5 py-0.5 text-[10px] ${sidebarCollapsed ? 'md:hidden' : ''}`}>/</kbd>
          </button>
          <button
            type="button"
            onClick={onOpenBookmarks}
            title="बुकमार्क"
            className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs text-blue-100 transition-colors hover:bg-white/10 ${
              sidebarCollapsed ? 'md:justify-center' : ''
            }`}
          >
            <span className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 shrink-0" />
              <span className={sidebarCollapsed ? 'md:hidden' : ''}>बुकमार्क</span>
            </span>
            {bookmarksCount > 0 && (
              <span className={`rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white ${sidebarCollapsed ? 'md:hidden' : ''}`}>
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>

        <nav aria-label="मुख्य नेभिगेसन" className="sidebar-navigation-scroll flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {navigationGroups.map((group) => (
            <section key={group.label}>
              <h2 className={`mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-blue-200/70 ${sidebarCollapsed ? 'md:hidden' : ''}`}>
                {group.label}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectTab(item.id)}
                      title={sidebarCollapsed ? item.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex w-full items-center gap-3 rounded-lg border-l-4 px-2.5 py-2.5 text-left text-xs transition-all ${
                        isActive
                          ? 'border-blue-400 bg-blue-100 font-bold text-blue-950 shadow-sm'
                          : 'border-transparent text-blue-100 hover:bg-white/10 hover:text-white'
                      } ${sidebarCollapsed ? 'md:justify-center md:px-0' : ''}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className={sidebarCollapsed ? 'md:hidden' : ''}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className={`border-t border-white/10 p-3 text-center ${sidebarCollapsed ? 'md:hidden' : ''}`}>
          <span className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[10px] font-medium text-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
            पहिलो संशोधन २०८१ सहित
          </span>
          <p className="mt-2 text-[10px] text-blue-200/70">सार्वजनिक वित्तीय जानकारी पेज</p>
        </div>
      </aside>

      <header className={`fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-[#21446b] px-4 text-white shadow-sm transition-[left] duration-200 sm:px-6 ${toolbarOffset}`}>
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 768) setMobileMenuOpen(true);
              else onToggleSidebar();
            }}
            className="rounded-lg p-2 text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="नेभिगेसन मेनु टगल गर्नुहोस्"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <span className="truncate text-sm font-bold sm:text-base">
            {navigationGroups.flatMap((group) => group.items).find((item) => item.id === activeTab)?.label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="rounded-lg border border-white/15 bg-white/10 p-2 text-blue-100 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="खोज खोल्नुहोस्"
          >
            <Search className="h-4 w-4" />
          </button>
          <div className="hidden items-center gap-1 rounded-lg bg-white/10 p-1 sm:flex">
            <Type className="mx-1 h-3.5 w-3.5 text-blue-200" />
            {(['normal', 'large', 'xlarge'] as const).map((size, index) => (
              <button
                key={size}
                type="button"
                onClick={() => onChangeFontSize(size)}
                title={['सामान्य अक्षर', 'ठूलो अक्षर', 'अझ ठूलो अक्षर'][index]}
                className={`rounded px-1.5 py-0.5 text-[11px] transition-colors ${
                  fontSize === size ? 'bg-blue-600 font-bold text-white' : 'text-blue-100 hover:bg-white/10'
                }`}
              >
                {['अ', 'अ+', 'अ++'][index]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenBookmarks}
            className="relative rounded-lg p-2 text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={`बुकमार्क (${bookmarksCount})`}
          >
            <Bookmark className="h-4 w-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 text-[9px] font-bold text-white">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
};
