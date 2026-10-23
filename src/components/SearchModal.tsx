import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Scale, BookOpen, FileSpreadsheet, AlertTriangle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ACT_DAFAS, DafaItem } from '../data/actData';
import { RULES_DATA, NiyamItem } from '../data/rulesData';
import { SCHEDULES_DATA, ScheduleItem } from '../data/schedulesData';
import { GUIDES_DATA, GuideTopic } from '../data/guidesData';
import { PENALTIES_DATA, PenaltyItem } from '../data/penaltiesData';
import { ActiveTab } from './Header';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, targetId?: string | number) => void;
}

type SearchCategory = 'all' | 'act' | 'rules' | 'schedules' | 'guides' | 'penalties';

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<SearchCategory>('all');

  // Keyboard shortcut: close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const q = query.trim().toLowerCase();

    const results: {
      id: string;
      title: string;
      subtitle: string;
      categoryLabel: string;
      category: SearchCategory;
      tab: ActiveTab;
      targetId: string | number;
      snippet: string;
    }[] = [];

    // Search in Act
    if (selectedFilter === 'all' || selectedFilter === 'act') {
      ACT_DAFAS.forEach((item) => {
        const textToSearch = `${item.dafaNo} ${item.title} ${item.chapterTitle} ${item.summary} ${item.fullText} ${item.tags.join(' ')}`.toLowerCase();
        if (textToSearch.includes(q)) {
          results.push({
            id: `act-${item.id}`,
            title: `दफा ${item.dafaNo}: ${item.title}`,
            subtitle: `परिच्छेद ${item.chapterNo}: ${item.chapterTitle}`,
            categoryLabel: 'ऐन, २०७६',
            category: 'act',
            tab: 'act',
            targetId: item.id,
            snippet: item.summary
          });
        }
      });
    }

    // Search in Rules
    if (selectedFilter === 'all' || selectedFilter === 'rules') {
      RULES_DATA.forEach((item) => {
        const textToSearch = `${item.niyamNo} ${item.title} ${item.chapterTitle} ${item.summary} ${item.fullText} ${item.tags.join(' ')}`.toLowerCase();
        if (textToSearch.includes(q)) {
          results.push({
            id: `rule-${item.id}`,
            title: `नियम ${item.niyamNo}: ${item.title}`,
            subtitle: `परिच्छेद ${item.chapterNo}: ${item.chapterTitle}`,
            categoryLabel: 'नियमावली, २०७७',
            category: 'rules',
            tab: 'rules',
            targetId: item.id,
            snippet: item.summary
          });
        }
      });
    }

    // Search in Schedules
    if (selectedFilter === 'all' || selectedFilter === 'schedules') {
      SCHEDULES_DATA.forEach((item) => {
        const textToSearch = `${item.scheduleNo} ${item.nepaliNumber} ${item.title} ${item.purpose} ${item.description} ${(item.columns || []).join(' ')}`.toLowerCase();
        if (textToSearch.includes(q)) {
          results.push({
            id: `sched-${item.id}`,
            title: `अनुसूची-${item.nepaliNumber}: ${item.title}`,
            subtitle: `${item.relatedRule}`,
            categoryLabel: 'अनुसूची',
            category: 'schedules',
            tab: 'schedules',
            targetId: item.scheduleNo,
            snippet: item.purpose
          });
        }
      });
    }

    // Search in Guides
    if (selectedFilter === 'all' || selectedFilter === 'guides') {
      GUIDES_DATA.forEach((item) => {
        const questionsText = item.questions.map((q) => `${q.q} ${q.a}`).join(' ');
        const textToSearch = `${item.title} ${item.category} ${item.summary} ${item.lawBasis} ${questionsText}`.toLowerCase();
        if (textToSearch.includes(q)) {
          results.push({
            id: `guide-${item.id}`,
            title: item.title,
            subtitle: `${item.category} · ${item.lawBasis}`,
            categoryLabel: 'सरल निर्देशिका',
            category: 'guides',
            tab: 'guides',
            targetId: item.id,
            snippet: item.summary
          });
        }
      });
    }

    // Search in Penalties
    if (selectedFilter === 'all' || selectedFilter === 'penalties') {
      PENALTIES_DATA.forEach((item) => {
        const textToSearch = `${item.offense} ${item.legalSection} ${item.penalizedPerson} ${item.penaltyFine}`.toLowerCase();
        if (textToSearch.includes(q)) {
          results.push({
            id: `pen-${item.id}`,
            title: item.offense,
            subtitle: `${item.legalSection} · जरिवाना: ${item.penaltyFine}`,
            categoryLabel: 'सजाय र जरिवाना',
            category: 'penalties',
            tab: 'penalties',
            targetId: item.id,
            snippet: `कारबाही अधिकारी: ${item.adjudicatingOfficer}`
          });
        }
      });
    }

    return results.slice(0, 30);
  }, [query, selectedFilter]);

  if (!isOpen) return null;

  const quickPicks = [
    { label: 'बेरुजु फस्यौट', query: 'बेरुजु' },
    { label: 'सरकारी पेश्की र १०% ब्याज', query: 'पेश्की' },
    { label: 'दफा ५७ (सजाय)', query: 'दफा ५७' },
    { label: 'असार २४ निकासा बन्द', query: 'असार' },
    { label: 'अनुसूची १९ ह्रासकट्टी दर', query: 'अनुसूची १९' },
    { label: 'कुमारी चोक', query: 'कुमारी चोक' },
    { label: 'रकमान्तर', query: 'रकमान्तर' },
    { label: 'MTEF / मध्यमकालीन खर्च', query: 'MTEF' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="दफा नम्बर, नियम, अनुसूची वा शब्द खोज्नुहोस् (उदा: बेरुजु, पेश्की, दफा २४, लिलाम)..."
            className="w-full bg-transparent border-none text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none text-base sm:text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition"
          >
            <span className="text-xs font-semibold px-1.5 py-0.5 bg-slate-200 rounded">ESC</span>
          </button>
        </div>

        {/* Filter Categories */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold mr-1 shrink-0">फिल्टर:</span>
          {(
            [
              { id: 'all', label: 'सबै' },
              { id: 'act', label: 'ऐनका दफाहरू' },
              { id: 'rules', label: 'नियमावलीका नियम' },
              { id: 'schedules', label: 'अनुसूचीहरू (१-१९)' },
              { id: 'guides', label: 'सरल निर्देशिका' },
              { id: 'penalties', label: 'सजाय र जरिवाना' }
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-3 py-1 rounded-md font-medium transition whitespace-nowrap ${
                selectedFilter === filter.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results / Suggestion Body */}
        <div className="overflow-y-auto p-4 divide-y divide-slate-100 flex-1">
          {query.trim() === '' ? (
            <div className="py-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                लोकप्रिय खोजहरू (Quick Search Suggestions):
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map((pick) => (
                  <button
                    key={pick.label}
                    onClick={() => setQuery(pick.query)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition flex items-center gap-1.5"
                  >
                    <span>{pick.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
              <div className="pt-4 text-xs text-slate-500">
                💡 सुझाव: तपाईंले नेपाली वा अङ्ग्रेजी दुवैमा खोज्न सक्नुहुन्छ (उदा: <code>दफा २४</code>, <code>नियम ३०</code>, <code>Schedule 19</code>, <code>MTEF</code>, <code>LMBIS</code>, <code>TSA</code>)।
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <p className="text-base font-semibold text-slate-800">
                "{query}" सम्बन्धी कुनै नतिजा फेला परेन।
              </p>
              <p className="text-xs">
                कृपया फरक शब्द वा दफा/नियम नम्बर प्रयोग गरी पुन: खोज्नुहोस्।
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 mb-2">
                कुल {searchResults.length} वटा नतिजा फेला पर्‍यो:
              </div>
              {searchResults.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    onNavigate(res.tab, res.targetId);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-200 flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                        {res.categoryLabel}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 truncate">{res.subtitle}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
                      {res.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{res.snippet}</p>
                  </div>
                  <CornerDownLeft className="w-4 h-4 text-slate-300 group-hover:text-red-600 shrink-0 mt-1 transition" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>खोजिएको शब्द: <strong>{query || 'कुनै छैन'}</strong></span>
          <span>थिच्नुहोस् <strong>ESC</strong> बन्द गर्न</span>
        </div>
      </div>
    </div>
  );
};
