import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, Search, Eye, Table, Calculator, Download, ArrowRight } from 'lucide-react';
import { SCHEDULES_DATA, ScheduleItem } from '../data/schedulesData';

interface SchedulesSectionProps {
  onOpenScheduleModal: (schedule: ScheduleItem) => void;
  onOpenAuctionCalculator: () => void;
}

export const SchedulesSection: React.FC<SchedulesSectionProps> = ({
  onOpenScheduleModal,
  onOpenAuctionCalculator
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSchedules = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return SCHEDULES_DATA;
    return SCHEDULES_DATA.filter((s) => {
      return (
        s.scheduleNo.toString().includes(q) ||
        s.nepaliNumber.includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.purpose.toLowerCase().includes(q) ||
        s.relatedRule.toLowerCase().includes(q) ||
        (s.columns && s.columns.some((c) => c.toLowerCase().includes(q)))
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
              <span>आधिकारिक अनुसूची ढाँचाहरू</span>
              <span>·</span>
              <span>नेपाल राजपत्र भाग ३</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              नियमावली, २०७७ का १९ वटा कानूनी अनुसूचीहरू (Schedules)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              बजेट तर्जुमा, खर्च, वैदेशिक सहायता शोधभर्ना, धरौटी, बेरुजु लगत, बरबुझारथ र सम्पत्ति लिलाम ह्रासकट्टी दररेट लगायतका सबै १९ अनुसूचीहरू।
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAuctionCalculator}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-2xs"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>अनुसूची १९ ह्रासकट्टी क्याल्कुलेटर</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अनुसूची नम्बर वा नाम खोज्नुहोस् (उदा: अनुसूची १९, ह्रास कट्टी, बेरुजु, धरौटी, बरबुझारथ)..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
      </div>

      {/* Featured Schedule 19 Card */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 text-xs font-semibold">
              <span>विशेष अनुसूची (नियम १०७)</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">
              अनुसूची-१९: लिलाम गर्ने सम्पत्ति तथा जिन्सी मालसामानको ह्रास कट्टी दररेट
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              कम्प्युटर २५%, फर्निचर २५%, सवारी साधन २०%, निर्माण उपकरण १५%, मेसिनरी १५% वार्षिक घट्दो ह्रास कट्टी दर।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const s19 = SCHEDULES_DATA.find((s) => s.scheduleNo === 19);
                if (s19) onOpenScheduleModal(s19);
              }}
              className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs transition"
            >
              दररेट तालिका हेर्नुहोस्
            </button>
            <button
              onClick={onOpenAuctionCalculator}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition shadow-sm"
            >
              ह्रासकट्टी क्याल्कुलेटर खोल्नुहोस् →
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.id}
            onClick={() => onOpenScheduleModal(schedule)}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-xs transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  अनुसूची-{schedule.nepaliNumber}
                </span>
                <span className="text-[11px] text-slate-400">{schedule.relatedRule}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                {schedule.title}
              </h4>

              <p className="text-xs text-slate-600 line-clamp-3">
                {schedule.purpose}
              </p>

              {schedule.columns && (
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                  <Table className="w-3.5 h-3.5 text-slate-400" />
                  <span>महलहरू: {schedule.columns.length} वटा स्तम्भहरू</span>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 group-hover:text-slate-600 font-medium">
                ढाँचा तथा विवरण
              </span>
              <span className="text-xs font-bold text-blue-700 group-hover:translate-x-1 transition flex items-center gap-1">
                <span>खोल्नुहोस्</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
