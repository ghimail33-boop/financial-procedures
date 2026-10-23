import React, { useState, useMemo } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle2, ChevronRight, Tag } from 'lucide-react';
import { FISCAL_DEADLINES, FiscalDeadline } from '../data/calendarDeadlines';

export const CalendarSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'सबै समयसीमाहरू' },
    { id: 'budget', label: 'बजेट चक्र र तर्जुमा' },
    { id: 'freeze', label: 'निकासा बन्द र समर्पण' },
    { id: 'reporting', label: 'वित्तीय विवरण र प्रतिवेदन' },
    { id: 'audit', label: 'लेखापरीक्षण' },
    { id: 'settlement', label: 'हिसाब समायोजन' }
  ];

  const filteredDeadlines = useMemo(() => {
    if (selectedCategory === 'all') return FISCAL_DEADLINES;
    return FISCAL_DEADLINES.filter((d) => d.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
          <span>वैधानिक समयतालिका</span>
          <span>·</span>
          <span>आर्थिक वर्षको कानुनी क्यालेन्डर</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          वित्तीय कार्यतालिका तथा अनिवार्य समयसीमाहरू (Fiscal Calendar)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          ऐन तथा नियमावलीले तोकेका स्रोत अनुमान, बजेट पेश, निकासा बन्द, वित्तीय प्रतिवेदन र अडिटका अनिवार्य कानुनी मितिहरू।
        </p>

        {/* Filter Pills */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-blue-700 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-6 ml-4 sm:ml-6">
        {filteredDeadlines.map((item) => {
          const isCritical = item.importance === 'critical';

          return (
            <div key={item.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition ${
                  isCritical
                    ? 'border-red-600 ring-4 ring-red-100'
                    : 'border-blue-600 ring-2 ring-blue-50'
                }`}
              />

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-xs transition space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                        isCritical
                          ? 'bg-red-700 text-white'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {item.monthNepali} {item.dayNepali}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-slate-600">
                      {item.legalProvision}
                    </span>
                  </div>

                  {isCritical && (
                    <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      अति संवेदनशील (Strict Deadline)
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div>
                    जिम्मेवार: <strong className="text-slate-800">{item.responsibleEntity}</strong>
                  </div>
                  <div>
                    पेश गर्ने निकाय: <strong className="text-slate-800">{item.targetEntity}</strong>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
