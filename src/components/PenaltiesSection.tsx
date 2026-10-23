import React, { useState, useMemo } from 'react';
import { AlertTriangle, Search, Scale, ShieldAlert, Info, ArrowRight } from 'lucide-react';
import { PENALTIES_DATA, PenaltyItem } from '../data/penaltiesData';

export const PenaltiesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'fine' | 'disciplinary'>('all');

  const filteredPenalties = useMemo(() => {
    return PENALTIES_DATA.filter((p) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.offense.toLowerCase().includes(q) ||
        p.legalSection.toLowerCase().includes(q) ||
        p.penalizedPerson.toLowerCase().includes(q) ||
        p.penaltyFine.toLowerCase().includes(q) ||
        p.adjudicatingOfficer.toLowerCase().includes(q);

      const matchesFilter =
        filterType === 'all' ||
        (filterType === 'fine' && p.fineAmountMax !== undefined) ||
        (filterType === 'disciplinary' && p.disciplinaryAction);

      return matchesQuery && matchesFilter;
    });
  }, [searchQuery, filterType]);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-1">
          <span>वित्तीय अनुशासन तथा दण्डात्मक व्यवस्था</span>
          <span>·</span>
          <span>ऐनको दफा ५७, ५८ र ५९</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          सजाय, जरिवाना तथा कानुनी उपचार निर्देशिका (Penalties Matrix)
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          सरकारी रकम, निकासा, लेखापरीक्षण, पेश्की र खरिद प्रक्रियामा हुने गैरकानुनी कार्य वा लापरबाहीमा तोकिएका स्पष्ट जरिवाना रकम, कारबाही गर्ने अधिकारी र पुनरावेदनको व्यवस्था।
        </p>

        {/* Search & Filter */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="कसूर, दफा, जरिवाना रकम वा अधिकारी खोज्नुहोस् (उदा: ५० हजार, भुक्तानी, पेश्की, ठेक्का)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === 'all' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              सबै ({PENALTIES_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('fine')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === 'fine' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              नगद जरिवाना तोकिएका
            </button>
            <button
              onClick={() => setFilterType('disciplinary')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterType === 'disciplinary' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              विभागीय कारबाही
            </button>
          </div>
        </div>
      </div>

      {/* Penalties Table / Cards */}
      <div className="space-y-4">
        {filteredPenalties.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-xs transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    {item.legalSection}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-medium">कसूरदार: {item.penalizedPerson}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.offense}
                </h3>
              </div>

              {/* Penalty Highlight Badge */}
              <div className="p-3 bg-red-50/80 border border-red-200 rounded-xl shrink-0 sm:text-right">
                <span className="text-[10px] uppercase font-bold text-red-700 tracking-wider block">
                  तोकिएको सजाय / जरिवाना
                </span>
                <span className="text-sm font-extrabold text-red-950 block mt-0.5">
                  {item.penaltyFine}
                </span>
                {item.disciplinaryAction && (
                  <span className="text-[10px] text-red-700 font-semibold block mt-0.5">
                    + विभागीय कारबाही समेत हुने
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 font-medium">सजाय गर्ने अधिकारी:</span>
                <div className="font-semibold text-slate-800">{item.adjudicatingOfficer}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-400 font-medium">कानुनी उपचार / पुनरावेदन (दफा ५९):</span>
                <div className="text-slate-700">{item.remedyAppeal}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Appeal & Remission Explanatory Note */}
      <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-950">
        <h4 className="font-bold text-sm text-amber-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-700" />
          <span>जरिवाना मिनाहा र पुनरावेदनको कानुनी प्रावधान (दफा ५८ र ५९):</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <strong>दफा ५८ (जरिवाना मिनाहा वा कम गर्ने):</strong> सजायको आदेश भएको मितिले १५ दिनभित्र मनासिब कारण खोली लिखित निवेदन दिएमा सजाय गर्ने अधिकारीले पहिले गरेको जरिवाना मिनाहा वा कम गर्न सक्छ।
          </div>
          <div>
            <strong>दफा ५९ (पुनरावेदन):</strong> चित्त नबुझेमा निर्णय पाएको १५ दिनभित्र एक तह माथिको अधिकारी समक्ष पुनरावेदन गर्न सकिन्छ। पुनरावेदन सुन्ने अधिकारीले ३५ दिनभित्र दिने निर्णय अन्तिम हुन्छ।
          </div>
        </div>
      </div>
    </div>
  );
};
