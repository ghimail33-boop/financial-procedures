import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  Scale,
  Calculator,
  Download,
  Bookmark,
  Menu,
  X,
  Type
} from 'lucide-react';

export type ActiveTab =
  | 'home'
  | 'act'
  | 'rules'
  | 'schedules'
  | 'guides'
  | 'penalties'
  | 'calendar'
  | 'calculators'
  | 'pdfs';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  bookmarksCount,
  onOpenBookmarks,
  fontSize,
  onChangeFontSize
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: any }[] = [
    { id: 'home', label: 'गृहपृष्ठ', icon: BookOpen },
    { id: 'act', label: 'ऐन, २०७६', icon: Scale },
    { id: 'rules', label: 'नियमावली, २०७७', icon: BookOpen },
    { id: 'schedules', label: 'अनुसूचीहरू (१-१९)', icon: FileSpreadsheet },
    { id: 'guides', label: 'सरल निर्देशिका', icon: BookOpen },
    { id: 'penalties', label: 'सजाय र जरिवाना', icon: AlertTriangle },
    { id: 'calendar', label: 'वित्तीय क्यालेन्डर', icon: Calendar },
    { id: 'calculators', label: 'क्याल्कुलेटर', icon: Calculator },
    { id: 'pdfs', label: 'मूल कानुनी पीडीएफ', icon: Download }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Topmost Government Official Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-semibold text-white">नेपाल सरकार</span>
            <span className="text-slate-500">·</span>
            <span>अर्थ मन्त्रालय</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="hidden sm:inline">महालेखा नियन्त्रक कार्यालय (मलेनिका)</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
              <Type className="w-3 h-3 text-slate-400 mr-1" />
              <button
                onClick={() => onChangeFontSize('normal')}
                className={`px-1.5 rounded transition ${fontSize === 'normal' ? 'bg-red-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="सामान्य अक्षर"
              >
                अ
              </button>
              <button
                onClick={() => onChangeFontSize('large')}
                className={`px-1.5 rounded transition ${fontSize === 'large' ? 'bg-red-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="ठूलो अक्षर"
              >
                अ+
              </button>
              <button
                onClick={() => onChangeFontSize('xlarge')}
                className={`px-1.5 rounded transition ${fontSize === 'xlarge' ? 'bg-red-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                title="अझ ठूलो अक्षर"
              >
                अ++
              </button>
            </div>

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition px-2 py-0.5 rounded hover:bg-slate-800"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-400" />
              <span>बुकमार्क</span>
              {bookmarksCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {bookmarksCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Search Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Emblem & Title */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          {/* Official Emblem Representation */}
          <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-white shadow-xs shrink-0 ring-2 ring-red-100 group-hover:bg-red-800 transition">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-red-700">
              सार्वजनिक वित्तीय व्यवस्थापन (PFM) कानुन पोर्टल
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व
            </h1>
            <div className="text-xs text-slate-500 font-medium">
              ऐन, २०७६ (संशोधन २०८१ सहित) र नियमावली, २०७७ (१९ अनुसूची)
            </div>
          </div>
        </div>

        {/* Global Search Bar Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-3 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 text-sm font-medium transition shadow-2xs group w-48 sm:w-64"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-red-700" />
            <span className="truncate text-xs sm:text-sm">दफा, नियम वा विषय खोज्नुहोस्...</span>
            <kbd className="hidden md:inline-block ml-auto text-[10px] bg-white border border-slate-300 rounded px-1.5 py-0.5 text-slate-500 font-mono">
              /
            </kbd>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="hidden lg:block border-t border-slate-200 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-md transition whitespace-nowrap ${
                    isActive
                      ? 'bg-red-700 text-white shadow-2xs'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg text-left transition ${
                  isActive
                    ? 'bg-red-700 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
