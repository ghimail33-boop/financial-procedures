import React, { useState, useMemo } from 'react';
import { Search, Scale, Bookmark, BookmarkCheck, Copy, Check, ChevronDown, ChevronUp, AlertCircle, ArrowRight } from 'lucide-react';
import { ACT_DAFAS, ACT_CHAPTERS, DafaItem } from '../data/actData';

interface ActSectionProps {
  onOpenDafaModal: (dafa: DafaItem) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onNavigateToRule?: (ruleNo: string) => void;
}

export const ActSection: React.FC<ActSectionProps> = ({
  onOpenDafaModal,
  bookmarks,
  onToggleBookmark,
  onNavigateToRule
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDafas, setExpandedDafas] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedDafas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (dafa: DafaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `दफा ${dafa.dafaNo}: ${dafa.title}\n(${dafa.chapterTitle})\n\n${dafa.fullText}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dafa.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDafas = useMemo(() => {
    return ACT_DAFAS.filter((dafa) => {
      const matchesChapter = selectedChapter === 'all' || dafa.chapterNo === selectedChapter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        dafa.dafaNo.includes(q) ||
        dafa.title.toLowerCase().includes(q) ||
        dafa.summary.toLowerCase().includes(q) ||
        dafa.fullText.toLowerCase().includes(q) ||
        dafa.tags.some((t) => t.toLowerCase().includes(q));
      return matchesChapter && matchesQuery;
    });
  }, [selectedChapter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Introduction Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
              {/* <span>नेपाल कानुन आयोग प्रमाणित</span> */}
              <span>·</span>
              <span>संवत् २०७६ सालको ऐन नं. १०</span>
              <span>·</span>
              <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                पहिलो संशोधन २०८१ सहित
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              सङ्घीय सञ्चित कोष, MTEF, बजेट निकासा, लेखा प्रणाली, आन्तरिक नियन्त्रण, बेरुजु फस्यौट र वित्तीय जवाफदेहिता सम्बन्धी प्रावधानहरु।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              देखाउँदै: <strong>{filteredDafas.length}</strong> / ६८ दफा
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
            placeholder="ऐनभित्र खोज्नुहोस् (उदा: दफा २४, बेरुजु, रकमान्तर, कुमारी चोक, ५० हजार, असोज मसान्त)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                ? 'bg-red-700 text-white shadow-2xs font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            सबै परिच्छेदहरू (६८)
          </button>
          {ACT_CHAPTERS.map((ch) => (
            <button
              key={ch.chapterNo}
              onClick={() => setSelectedChapter(ch.chapterNo)}
              className={`min-w-0 max-w-full whitespace-normal break-words px-3 py-1.5 text-left leading-snug rounded-lg font-medium transition ${
                selectedChapter === ch.chapterNo
                  ? 'bg-red-700 text-white shadow-2xs font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={ch.description}
            >
              परिच्छेद {ch.chapterNo}: {ch.title}
            </button>
          ))}
        </div>
      </div>

      {/* Dafas List */}
      <div className="space-y-4">
        {filteredDafas.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 space-y-2">
            <Scale className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-base font-semibold text-slate-800">खोजिए बमोजिम कुनै दफा फेला परेन।</p>
            <p className="text-xs">कृपया फरक शब्द प्रयोग गर्नुहोस् वा परिच्छेद फिल्टर परिवर्तन गर्नुहोस्।</p>
          </div>
        ) : (
          filteredDafas.map((dafa) => {
            const isExpanded = !!expandedDafas[dafa.id];
            const isBookmarked = bookmarks.includes(`dafa-${dafa.id}`);
            const isCopied = copiedId === dafa.id;

            return (
              <div
                key={dafa.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition"
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md">
                        दफा {dafa.dafaNo}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs font-medium text-slate-500">
                        परिच्छेद {dafa.chapterNo}: {dafa.chapterTitle}
                      </span>
                      {dafa.isAmended2081 && (
                        <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          संशोधन २०८१
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(`dafa-${dafa.id}`);
                        }}
                        className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-100 rounded-md transition"
                        title={isBookmarked ? 'बुकमार्कबाट हटाउनुहोस्' : 'बुकमार्क गर्नुहोस्'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => handleCopy(dafa, e)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition"
                        title="कपी गर्नुहोस्"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onOpenDafaModal(dafa)}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-red-700 transition cursor-pointer"
                  >
                    दफा {dafa.dafaNo}: {dafa.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {dafa.summary}
                  </p>

                  {/* Amendment Alert */}
                  {dafa.isAmended2081 && dafa.amendmentNote && (
                    <div className="mt-3 p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>२०८१ संशोधन:</strong> {dafa.amendmentNote}</span>
                    </div>
                  )}

                  {/* Expanded Full Text */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        मूल कानुनी पाठ:
                      </span>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                        {dafa.fullText}
                      </div>

                      {dafa.relatedRules && dafa.relatedRules.length > 0 && (
                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <span className="text-slate-500 font-semibold">सम्बन्धित नियमहरू:</span>
                          <div className="flex flex-wrap gap-1">
                            {dafa.relatedRules.map((r) => (
                              <button
                                key={r}
                                onClick={() => onNavigateToRule && onNavigateToRule(r)}
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold transition"
                              >
                                {r} →
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Bar: Full detail modal trigger + Expand button */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => onOpenDafaModal(dafa)}
                      className="text-xs font-bold text-red-700 hover:text-red-900 transition flex items-center gap-1"
                    >
                      <span>विस्तृत कानुनी विवरण हेर्नुहोस्</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => toggleExpand(dafa.id)}
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
