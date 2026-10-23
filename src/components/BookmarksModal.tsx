import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { ACT_DAFAS } from '../data/actData';
import { RULES_DATA } from '../data/rulesData';
import { ActiveTab } from './Header';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: string[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (tab: ActiveTab, targetId: string | number) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onClearAll,
  onNavigate
}) => {
  if (!isOpen) return null;

  const bookmarkedItems = bookmarks.map((bId) => {
    if (bId.startsWith('dafa-')) {
      const id = parseInt(bId.replace('dafa-', ''), 10);
      const dafa = ACT_DAFAS.find((d) => d.id === id);
      return {
        id: bId,
        type: 'act' as const,
        title: dafa ? `दफा ${dafa.dafaNo}: ${dafa.title}` : `दफा #${id}`,
        subtitle: dafa ? `ऐन, २०७६ · परिच्छेद ${dafa.chapterNo}` : 'ऐन',
        targetId: id,
        tab: 'act' as ActiveTab,
        summary: dafa?.summary || ''
      };
    } else if (bId.startsWith('rule-')) {
      const id = parseInt(bId.replace('rule-', ''), 10);
      const rule = RULES_DATA.find((r) => r.id === id);
      return {
        id: bId,
        type: 'rule' as const,
        title: rule ? `नियम ${rule.niyamNo}: ${rule.title}` : `नियम #${id}`,
        subtitle: rule ? `नियमावली, २०७७ · परिच्छेद ${rule.chapterNo}` : 'नियमावली',
        targetId: id,
        tab: 'rules' as ActiveTab,
        summary: rule?.summary || ''
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">सङ्ग्रहित दफा तथा नियमहरू (Bookmarks)</h3>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
              {bookmarkedItems.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 flex-1">
          {bookmarkedItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">हाल कुनै पनि दफा वा नियम बुकमार्क गरिएको छैन।</p>
              <p className="text-xs text-slate-500">
                कुनै पनि दफा वा नियम खोल्दा माथि रहेको बुकमार्क आइकन थिचेर सुरक्षित गर्न सक्नुहुन्छ।
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {bookmarkedItems.map((item: any) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 flex items-start justify-between gap-3 group"
                >
                  <div
                    onClick={() => {
                      onNavigate(item.tab, item.targetId);
                      onClose();
                    }}
                    className="cursor-pointer space-y-0.5 min-w-0 flex-1"
                  >
                    <div className="text-[11px] font-semibold text-red-700">{item.subtitle}</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
                      {item.title}
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1">{item.summary}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="हटाउनुहोस्"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onNavigate(item.tab, item.targetId);
                        onClose();
                      }}
                      className="p-1.5 text-slate-400 group-hover:text-red-700 rounded-lg transition"
                      title="हेर्नुहोस्"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {bookmarkedItems.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              onClick={onClearAll}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              सबै हटाउनुहोस्
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition"
            >
              बन्द गर्नुहोस्
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
