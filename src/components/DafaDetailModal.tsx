import React, { useState } from 'react';
import { X, Bookmark, BookmarkCheck, Copy, Check, Printer, Share2, Tag, BookOpen, AlertCircle } from 'lucide-react';
import { DafaItem } from '../data/actData';

interface DafaDetailModalProps {
  dafa: DafaItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onNavigateToRule?: (ruleNo: string) => void;
}

export const DafaDetailModal: React.FC<DafaDetailModalProps> = ({
  dafa,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onNavigateToRule
}) => {
  const [copied, setCopied] = useState(false);

  if (!dafa) return null;

  const handleCopy = () => {
    const text = `आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६\nदफा ${dafa.dafaNo}: ${dafa.title}\n(${dafa.chapterTitle})\n\n${dafa.fullText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 mb-1">
              <span>आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६</span>
              <span>·</span>
              <span>परिच्छेद {dafa.chapterNo} ({dafa.chapterTitle})</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>दफा {dafa.dafaNo}: {dafa.title}</span>
              {dafa.isAmended2081 && (
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-normal">
                  पहिलो संशोधन २०८१
                </span>
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleBookmark(`dafa-${dafa.id}`)}
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
          {/* Plain language summary */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block mb-1">
              दफाको सरल सारसंक्षेप (Key Takeaway):
            </span>
            <p className="text-sm font-medium text-amber-950 leading-relaxed">
              {dafa.summary}
            </p>
          </div>

          {/* Amendment note if any */}
          {dafa.isAmended2081 && dafa.amendmentNote && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>पहिलो संशोधन २०८१ को व्यहोरा:</strong> {dafa.amendmentNote}
              </div>
            </div>
          )}

          {/* Full Statutory Text */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              मूल वैधानिक कानुनी पाठ (Official Legal Text):
            </span>
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-2">
              {dafa.fullText}
            </div>
          </div>

          {/* Related Rules Cross-Reference */}
          {dafa.relatedRules && dafa.relatedRules.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                सम्बन्धित नियमावलीका नियमहरू (Cross-References):
              </span>
              <div className="flex flex-wrap gap-2">
                {dafa.relatedRules.map((r) => (
                  <button
                    key={r}
                    onClick={() => onNavigateToRule && onNavigateToRule(r)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium border border-slate-200 transition"
                  >
                    {r} हेर्नुहोस् →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {dafa.tags.map((t) => (
              <span key={t} className="text-xs text-slate-500">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>नेपाल कानुन आयोग तथा प्रमाणीकरण मिति २०७६।०६।२४</span>
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
