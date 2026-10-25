import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { ActSection } from './components/ActSection';
import { RulesSection } from './components/RulesSection';
import { SchedulesSection } from './components/SchedulesSection';
import { GuidesSection } from './components/GuidesSection';
import { PenaltiesSection } from './components/PenaltiesSection';
import { CalendarSection } from './components/CalendarSection';
import { CalculatorsSection } from './components/CalculatorsSection';
import { PdfViewerSection } from './components/PdfViewerModal';
import { FiscalFrameworkSection } from './components/FiscalFrameworkSection';
import { SearchModal } from './components/SearchModal';
import { ScheduleDetailModal } from './components/ScheduleDetailModal';
import { DafaDetailModal } from './components/DafaDetailModal';
import { NiyamDetailModal } from './components/NiyamDetailModal';
import { BookmarksModal } from './components/BookmarksModal';
import { DafaItem, ACT_DAFAS } from './data/actData';
import { NiyamItem, RULES_DATA } from './data/rulesData';
import { ScheduleItem, SCHEDULES_DATA } from './data/schedulesData';
import { Scale, Heart, ExternalLink, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksModalOpen, setBookmarksModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Bookmarks persisted in localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('np_pfm_bookmarks');
      return saved ? JSON.parse(saved) : ['dafa-24', 'dafa-57', 'rule-30', 'rule-51'];
    } catch {
      return ['dafa-24', 'dafa-57', 'rule-30', 'rule-51'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('np_pfm_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b !== id));
  };

  const clearAllBookmarks = () => {
    setBookmarks([]);
  };

  // Modals state
  const [selectedDafa, setSelectedDafa] = useState<DafaItem | null>(null);
  const [selectedNiyam, setSelectedNiyam] = useState<NiyamItem | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(null);
  const [requestedRuleNo, setRequestedRuleNo] = useState<string | null>(null);

  // Keyboard shortcut '/' or 'Cmd+K' to open search
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.key === '/' && document.activeElement?.tagName !== 'INPUT') || ((e.metaKey || e.ctrlKey) && e.key === 'k')) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleNavigate = (tab: ActiveTab, targetId?: string | number) => {
    setRequestedRuleNo(null);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetId !== undefined) {
      if (tab === 'act') {
        const d = ACT_DAFAS.find((item) => item.id === Number(targetId) || item.dafaNo === String(targetId));
        if (d) setSelectedDafa(d);
      } else if (tab === 'rules') {
        const r = RULES_DATA.find((item) => item.id === Number(targetId) || item.niyamNo === String(targetId));
        if (r) setSelectedNiyam(r);
      } else if (tab === 'schedules') {
        const s = SCHEDULES_DATA.find((item) => item.scheduleNo === Number(targetId) || item.id === Number(targetId));
        if (s) setSelectedSchedule(s);
      }
    }
  };

  const handleNavigateToRule = (ruleString: string) => {
    const match = ruleString.match(/[०-९0-9]+/)?.[0];
    if (!match) return;

    const toArabicNumerals = (value: string) =>
      value.replace(/[०-९]/g, (digit) => String(digit.charCodeAt(0) - 0x0966));
    const ruleNumber = toArabicNumerals(match);
    const found = RULES_DATA.find((rule) => toArabicNumerals(rule.niyamNo) === ruleNumber);

    setSelectedDafa(null);
    setSelectedSchedule(null);
    setRequestedRuleNo(found ? null : ruleNumber);
    setSelectedNiyam(found ?? null);
    setActiveTab('rules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDafa = (dafaString: string) => {
    const match = dafaString.match(/\d+/);
    if (match) {
      const num = match[0];
      const found = ACT_DAFAS.find((d) => d.dafaNo === num);
      if (found) {
        setSelectedDafa(found);
      }
    }
  };

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_p]:text-base'
      : fontSize === 'large'
      ? 'text-base [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_p]:text-sm'
      : '';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 ${fontSizeClass}`}>
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setRequestedRuleNo(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        bookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setBookmarksModalOpen(true)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />

      <div className={`min-h-screen pt-16 transition-[margin] duration-200 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-[14.4rem]'}`}>
      <main className="w-full px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomeSection
            onSelectTab={(tab) => {
              setRequestedRuleNo(null);
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSearch={() => setSearchModalOpen(true)}
          />
        )}

        {activeTab === 'act' && (
          <ActSection
            onOpenDafaModal={setSelectedDafa}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            onNavigateToRule={handleNavigateToRule}
          />
        )}

        {activeTab === 'rules' && (
          <RulesSection
            onOpenNiyamModal={setSelectedNiyam}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
            requestedRuleNo={requestedRuleNo}
            onNavigateToSchedule={(schedNo) => {
              const s = SCHEDULES_DATA.find((item) => item.scheduleNo === schedNo);
              if (s) setSelectedSchedule(s);
            }}
            onNavigateToDafa={handleNavigateToDafa}
          />
        )}

        {activeTab === 'schedules' && (
          <SchedulesSection
            onOpenScheduleModal={setSelectedSchedule}
            onOpenAuctionCalculator={() => {
              setActiveTab('calculators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'guides' && <GuidesSection />}

        {activeTab === 'penalties' && <PenaltiesSection />}

        {activeTab === 'calendar' && <CalendarSection />}

        {activeTab === 'calculators' && <CalculatorsSection />}

        {activeTab === 'pdfs' && <PdfViewerSection />}

        {activeTab === 'fiscal-framework' && (
          <FiscalFrameworkSection onOpenOfficialPdfs={() => setActiveTab('pdfs')} />
        )}
      </main>

      {/* Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      <BookmarksModal
        isOpen={bookmarksModalOpen}
        onClose={() => setBookmarksModalOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={removeBookmark}
        onClearAll={clearAllBookmarks}
        onNavigate={handleNavigate}
      />

      <DafaDetailModal
        dafa={selectedDafa}
        onClose={() => setSelectedDafa(null)}
        isBookmarked={selectedDafa ? bookmarks.includes(`dafa-${selectedDafa.id}`) : false}
        onToggleBookmark={toggleBookmark}
        onNavigateToRule={handleNavigateToRule}
      />

      <NiyamDetailModal
        niyam={selectedNiyam}
        onClose={() => setSelectedNiyam(null)}
        isBookmarked={selectedNiyam ? bookmarks.includes(`rule-${selectedNiyam.id}`) : false}
        onToggleBookmark={toggleBookmark}
        onNavigateToSchedule={(scheduleNo) => {
          const schedule = SCHEDULES_DATA.find((item) => item.scheduleNo === scheduleNo);
          if (!schedule) return;
          setSelectedNiyam(null);
          setActiveTab('schedules');
          setSelectedSchedule(schedule);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToDafa={handleNavigateToDafa}
      />

      <ScheduleDetailModal
        schedule={selectedSchedule}
        onClose={() => setSelectedSchedule(null)}
      />

      {/* Official Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Scale className="w-4 h-4 text-red-500" />
                {/* <span>नेपाल सरकार</span> */}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                सार्वजनिक वित्तीय व्यवस्थापन (PFM) प्रणाली सम्बन्धी जानकारीमूलक पेज।
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-white text-xs block uppercase">सम्बन्धित निकायहरू:</span>
              <ul className="space-y-1 text-slate-400">
                <li>• अर्थ मन्त्रालय (Ministry of Finance)</li>
                <li>• महालेखा नियन्त्रक कार्यालय (मलेनिका)</li>
                <li>• राष्ट्रिय योजना आयोग (NPC)</li>
                <li>• महालेखापरीक्षकको कार्यालय (OAG)</li>
                <li>• कुमारी चोक तथा केन्द्रीय तहसिल कार्यालय</li>
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-white text-xs block uppercase">प्रणालीमा उपलब्ध दस्तावेज:</span>
              <ul className="space-y-1 text-slate-400">
                <li>• नेपालको संविधान, २०७२</li>
                <li>• आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६</li>
                <li>• आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७</li>
                <li>• अन्तर–सरकारी वित्त व्यवस्थापन ऐन, २०७४</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white text-xs block uppercase">द्रुत पहुँच:</span>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => handleNavigate('act')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  ऐन २०७६
                </button>
                <button onClick={() => handleNavigate('rules')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  नियमावली २०७७
                </button>
                <button onClick={() => handleNavigate('schedules')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  अनुसूची १९
                </button>
                <button onClick={() => handleNavigate('penalties')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  सजाय दफा ५७
                </button>
                <button onClick={() => handleNavigate('calculators')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  क्याल्कुलेटर
                </button>
                <button onClick={() => handleNavigate('pdfs')} className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px]">
                  मूल पीडीएफ
                </button>
              </div>
            </div>
          </div>

          {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>
              © २०८३ · आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व सम्बन्धी कानूनको जानकारीमूलक पेज।
            </div>
          </div> */}
        </div>
      </footer>
      </div>
    </div>
  );
}
