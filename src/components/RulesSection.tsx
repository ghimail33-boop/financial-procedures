import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Bookmark, BookmarkCheck, Copy, Check, ChevronDown, ChevronUp, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { RULES_DATA, RULE_CHAPTERS, NiyamItem } from '../data/rulesData';

interface RulesSectionProps {
  onOpenNiyamModal: (niyam: NiyamItem) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onNavigateToSchedule?: (schedNo: number) => void;
  onNavigateToDafa?: (dafaNo: string) => void;
}

export const RulesSection: React.FC<RulesSectionProps> = ({
  onOpenNiyamModal,
  bookmarks,
  onToggleBookmark,
  onNavigateToSchedule,
  onNavigateToDafa
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNiyams, setExpandedNiyams] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedNiyams((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (niyam: NiyamItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `नियम ${niyam.niyamNo}: ${niyam.title}\n(${niyam.chapterTitle})\n\n${niyam.fullText}`;
    navigator.clipboard.writeText(text);
    setCopiedId(niyam.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredNiyams = useMemo(() => {
    return RULES_DATA.filter((niyam) => {
      const matchesChapter = selectedChapter === 'all' || niyam.chapterNo === selectedChapter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        niyam.niyamNo.includes(q) ||
        niyam.title.toLowerCase().includes(q) ||
        niyam.summary.toLowerCase().includes(q) ||
        niyam.fullText.toLowerCase().includes(q) ||
        niyam.tags.some((t) => t.toLowerCase().includes(q)) ||
        niyam.keyPoints.some((p) => p.toLowerCase().includes(q));
      return matchesChapter && matchesQuery;
    });
  }, [selectedChapter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Introduction Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <span>नेपाल राजपत्र भाग ३ (खण्ड ७०, संख्या ४०)</span>
              <span>·</span>
              <span>प्रकाशन मिति: २०७७।१०।१९</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              एकल खाता कोष (TSA), असार मसान्तभन्दा ७ दिन अगावै निकासा बन्द, पेश्कीमा १०% ब्याज, धरौटी, लिलाम बिक्री र १९ अनुसूची ढाँचाहरू।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              देखाउँदै: <strong>{filteredNiyams.length}</strong> नियमहरू
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नियमावलीभित्र खोज्नुहोस् (उदा: नियम ३०, असार २४, पेश्की, धरौटी, लिलाम, अनुसूची १९)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              हटाउनुहोस्
            </button>
          )}
        </div>

        {/* Chapter Tabs */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedChapter('all')}
            className={`min-w-0 max-w-full whitespace-normal break-words px-3 py-1.5 text-left leading-snug rounded-lg font-medium transition ${
              selectedChapter === 'all'
                ? 'bg-emerald-700 text-white shadow-2xs font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            सबै परिच्छेदहरू (१४)
          </button>
          {RULE_CHAPTERS.map((ch) => (
            <button
              key={ch.chapterNo}
              onClick={() => setSelectedChapter(ch.chapterNo)}
              className={`min-w-0 max-w-full whitespace-normal break-words px-3 py-1.5 text-left leading-snug rounded-lg font-medium transition ${
                selectedChapter === ch.chapterNo
                  ? 'bg-emerald-700 text-white shadow-2xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={ch.description}
            >
              परिच्छेद {ch.chapterNo}: {ch.title}
            </button>
          ))}
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {filteredNiyams.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-2">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-semibold text-slate-800">खोजिए बमोजिम कुनै नियम फेला परेन।</p>
            <p className="text-xs">कृपया फरक शब्द प्रयोग गर्नुहोस् वा परिच्छेद परिवर्तन गर्नुहोस्।</p>
          </div>
        ) : (
          filteredNiyams.map((niyam) => {
            const isExpanded = !!expandedNiyams[niyam.id];
            const isBookmarked = bookmarks.includes(`rule-${niyam.id}`);
            const isCopied = copiedId === niyam.id;

            return (
              <div
                key={niyam.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                        नियम {niyam.niyamNo}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-500">
                        परिच्छेद {niyam.chapterNo}: {niyam.chapterTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(`rule-${niyam.id}`);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-100 rounded-md transition"
                        title={isBookmarked ? 'बुकमार्कबाट हटाउनुहोस्' : 'बुकमार्क गर्नुहोस्'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => handleCopy(niyam, e)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                        title="कपी गर्नुहोस्"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onOpenNiyamModal(niyam)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-emerald-700 transition cursor-pointer"
                  >
                    नियम {niyam.niyamNo}: {niyam.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {niyam.summary}
                  </p>

                  {/* Key Highlights bullet list */}
                  {niyam.keyPoints && niyam.keyPoints.length > 0 && (
                    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        मुख्य कार्यान्वयन व्यवस्था:
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                        {niyam.keyPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Expanded Full Text */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        मूल राजपत्र कानुनी पाठ:
                      </span>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {niyam.fullText}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                        {niyam.relatedDafa && (
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500">सम्बन्धित दफा:</span>
                            <span className="font-bold text-red-700">{niyam.relatedDafa}</span>
                          </div>
                        )}
                        {niyam.relatedSchedules && (
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500">सम्बन्धित अनुसूची:</span>
                            <div className="flex gap-1">
                              {niyam.relatedSchedules.map((s) => (
                                <span key={s} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 font-semibold rounded text-[11px]">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenNiyamModal(niyam)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
                    >
                      <span>विस्तृत नियम हेर्नुहोस्</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => toggleExpand(niyam.id)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'छोटो बनाउनुहोस्' : 'पूर्ण पाठ हेर्नुहोस्'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
