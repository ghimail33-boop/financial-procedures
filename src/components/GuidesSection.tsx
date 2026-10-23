import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Scale, ShieldAlert, ArrowRight } from 'lucide-react';
import { GUIDES_DATA, GuideTopic } from '../data/guidesData';

export const GuidesSection: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(GUIDES_DATA[0].id);
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(0);

  const currentTopic = GUIDES_DATA.find((t) => t.id === selectedTopicId) || GUIDES_DATA[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
          <span>व्यावहारिक प्रयोगकर्ता निर्देशिका</span>
          <span>·</span>
          <span>सरल भाषामा कानुनी व्याख्या</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          ऐन तथा नियमावलीको सरल र व्यावहारिक मार्गदर्शक (User-Friendly Guide)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          बजेट, बेरुजु, पेश्की, धरौटी, लिलाम, सरकारी बाँकी र सजाय सम्बन्धी कानुनी प्रावधानहरूको दैनिक कामकाजमा आवश्यक पर्ने सरल प्रश्नोत्तर तथा चरणबद्ध प्रक्रिया।
        </p>
      </div>

      {/* Main Grid: Sidebar of Topics + Topic Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Topic Selector */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
            विषय सूची (Topics):
          </span>
          {GUIDES_DATA.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setOpenQuestionIdx(0);
                }}
                className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 ${
                  isSelected
                    ? 'bg-red-50 text-red-950 border border-red-200 shadow-2xs font-bold'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isSelected ? 'bg-red-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                    {topic.category}
                  </span>
                  <div className="text-xs leading-snug line-clamp-2">{topic.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Topic Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Header */}
            <div className="border-b border-slate-100 pb-5 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-red-700 bg-red-50 px-2.5 py-0.5 rounded">
                  {currentTopic.category}
                </span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-medium">कानुनी आधार: {currentTopic.lawBasis}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentTopic.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentTopic.summary}
              </p>
            </div>

            {/* Step-by-step Process if available */}
            {currentTopic.steps && currentTopic.steps.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  <span>चरणबद्ध कानुनी प्रक्रिया (Step-by-Step Procedure):</span>
                </h4>
                <div className="space-y-2.5">
                  {currentTopic.steps.map((st) => (
                    <div
                      key={st.stepNo}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {st.stepNo}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-xs font-bold text-slate-900">{st.title}</div>
                        <div className="text-xs text-slate-600">{st.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A Accordion */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                <span>व्यावहारिक प्रश्न तथा कानुनी जवाफ (FAQ & Legal Clarifications):</span>
              </h4>
              <div className="space-y-2">
                {currentTopic.questions.map((q, idx) => {
                  const isOpen = openQuestionIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => setOpenQuestionIdx(isOpen ? null : idx)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-900 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-red-700 font-bold">प्र.</span>
                          <span>{q.q}</span>
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                          <p className="whitespace-pre-line">{q.a}</p>
                          {q.legalNote && (
                            <div className="text-xs text-red-700 font-medium pt-1">
                              कानुनी सन्दर्भ: {q.legalNote}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Golden Rules To Remember */}
            {currentTopic.keyRulesToRemember && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  अनिवार्य ख्याल गर्नुपर्ने मुख्य नियमहरू (Golden Rules):
                </span>
                <ul className="text-xs text-amber-950 space-y-1.5">
                  {currentTopic.keyRulesToRemember.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
