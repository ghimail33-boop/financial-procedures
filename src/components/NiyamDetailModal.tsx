import React, { useState } from 'react';
import { X, Bookmark, BookmarkCheck, Copy, Check, Printer, FileSpreadsheet, Scale, Info } from 'lucide-react';
import { NiyamItem } from '../data/rulesData';

interface NiyamDetailModalProps {
  niyam: NiyamItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateToSchedule?: (schedNo: number) => void;
  onNavigateToDafa?: (dafaNo: string) => void;
}

export const NiyamDetailModal: React.FC<NiyamDetailModalProps> = ({
  niyam,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onNavigateToSchedule,
  onNavigateToDafa
}) => {
  const [copied, setCopied] = useState(false);

  if (!niyam) return null;

  const handleCopy = () => {
    const text = `आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७\nनियम ${niyam.niyamNo}: ${niyam.title}\n(${niyam.chapterTitle})\n\n${niyam.fullText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNavigateToSchedule = (scheduleReference: string) => {
    const digits = scheduleReference.match(/[०-९0-9]+/)?.[0];
    if (!digits || !onNavigateToSchedule) return;

    const scheduleNo = Number(digits.replace(/[०-९]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x0966)
    ));
    if (Number.isInteger(scheduleNo)) onNavigateToSchedule(scheduleNo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <span>आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७</span>
              <span>·</span>
              <span>परिच्छेद {niyam.chapterNo} ({niyam.chapterTitle})</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              नियम {niyam.niyamNo}: {niyam.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(`rule-${niyam.id}`)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title={isBookmarked ? 'बुकमार्कबाट हटाउनुहोस्' : 'बुकमार्क गर्नुहोस्'}
            >
              {isBookmarked ? <BookmarkCheck className="w-5 h-5 text-amber-400" /> : <Bookmark className="w-5 h-5" />}
            </button>
            <button
              onClick={handleCopy}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="कपी गर्नुहोस्"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="प्रिन्ट गर्नुहोस्"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Summary Box */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              नियमको सारसंक्षेप (Rule Summary):
            </span>
            <p className="text-sm font-medium text-emerald-950 leading-relaxed">
              {niyam.summary}
            </p>
          </div>

          {/* Key Bullet Points */}
          {niyam.keyPoints && niyam.keyPoints.length > 0 && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                मुख्य बुँदाहरू (Key Operational Highlights):
              </span>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                {niyam.keyPoints.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong>{point}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Legal Text */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              नेपाल राजपत्रमा प्रकाशित मूल कानुनी पाठ (Official Legal Text):
            </span>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
              {niyam.fullText}
            </div>
          </div>

          {/* Cross references to Act or Schedules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {niyam.relatedDafa && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-red-700 font-semibold block">ऐनको सम्बन्धित दफा:</span>
                  <span className="font-bold text-slate-900">{niyam.relatedDafa}</span>
                </div>
                {onNavigateToDafa && (
                  <button
                    onClick={() => onNavigateToDafa(niyam.relatedDafa!)}
                    className="text-xs text-red-700 hover:text-red-900 font-semibold underline"
                  >
                    दफा हेर्नुहोस् →
                  </button>
                )}
              </div>
            )}

            {niyam.relatedSchedules && niyam.relatedSchedules.length > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                <span className="text-xs text-blue-700 font-semibold block">सम्बन्धित अनुसूची (ढाँचा):</span>
                <div className="flex flex-wrap gap-1.5">
                  {niyam.relatedSchedules.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleNavigateToSchedule(s)}
                      disabled={!onNavigateToSchedule}
                      className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold text-xs transition hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-default disabled:hover:bg-blue-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {niyam.tags.map((t) => (
              <span key={t} className="text-xs text-slate-500">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>नेपाल राजपत्र खण्ड ७०, संख्या ४०, भाग ३ (२०७७।१०।१९)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition"
          >
            बन्द गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
};
