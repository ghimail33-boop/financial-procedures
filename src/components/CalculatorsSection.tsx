import React, { useState } from 'react';
import { Calculator, Coins, Table, Info } from 'lucide-react';
import { AuctionDepreciationCalculator } from './AuctionDepreciationCalculator';
import { AdvanceInterestCalculator } from './AdvanceInterestCalculator';

export const CalculatorsSection: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'auction' | 'advance'>('auction');

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <span>व्यावहारिक वित्तीय उपकरणहरू</span>
              <span>·</span>
              <span>स्वत: कानुनी गणना</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              आधिकारिक वित्तीय क्याल्कुलेटर तथा दररेट उपकरण
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              नियमावली, २०७७ को अनुसूची १९ बमोजिम जिन्सी लिलाम ह्रास कट्टी र नियम ५१ बमोजिम पेश्कीको १०% ब्याज गणना।
            </p>
          </div>

          {/* Segmented control */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveCalc('auction')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${
                activeCalc === 'auction'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>लिलाम ह्रासकट्टी (अनुसूची १९)</span>
            </button>
            <button
              onClick={() => setActiveCalc('advance')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition ${
                activeCalc === 'advance'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>पेश्की १०% ब्याज (नियम ५१)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Selected Calculator */}
      {activeCalc === 'auction' ? (
        <AuctionDepreciationCalculator />
      ) : (
        <AdvanceInterestCalculator />
      )}
    </div>
  );
};
