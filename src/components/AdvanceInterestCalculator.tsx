import React, { useState } from 'react';
import { Coins, AlertTriangle, ShieldX, CheckCircle, FileText } from 'lucide-react';

export const AdvanceInterestCalculator: React.FC = () => {
  const [advanceAmount, setAdvanceAmount] = useState<number>(150000);
  const [advanceType, setAdvanceType] = useState<'travel' | 'purchase' | 'contractor'>('travel');
  const [overdueDays, setOverdueDays] = useState<number>(45);

  const interestRate = 10; // 10% annual as per Rule 50(2) & Rule 51(1)

  // Calculations
  const dailyRate = interestRate / 365 / 100;
  const interestAmount = Math.round(advanceAmount * dailyRate * overdueDays);
  const totalPayable = advanceAmount + interestAmount;

  // Grace period info
  const gracePeriodText =
    advanceType === 'travel'
      ? 'भ्रमण खर्च पेश्की: फर्केको १५ दिनभित्र फस्यौट गर्नुपर्ने (नियम ४८)'
      : advanceType === 'purchase'
      ? 'मालसामान खरिद पेश्की: फर्केको २१ दिनभित्र फस्यौट गर्नुपर्ने (नियम ४९)'
      : 'व्यक्ति/फर्म पेश्की: बैंक ग्यारेन्टी आवश्यक, म्याद नाघेमा १०% ब्याज (नियम ५०)';

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">सरकारी पेश्की म्याद नाघेको १०% ब्याज क्याल्कुलेटर</h3>
            <p className="text-sm text-slate-300">
              नियमावली २०७७ को नियम ५०(२) र नियम ५१(१) बमोजिम वार्षिक १०% का दरले लाग्ने कानुनी ब्याज गणना
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              पेश्कीको प्रकार (Advance Type)
            </label>
            <select
              value={advanceType}
              onChange={(e) => setAdvanceType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
            >
              <option value="travel">दैनिक तथा भ्रमण खर्च पेश्की (१५ दिन म्याद - नियम ४८)</option>
              <option value="purchase">मालसामान खरिद पेश्की (२१ दिन म्याद - नियम ४९)</option>
              <option value="contractor">व्यक्ति, फर्म, संस्था वा कम्पनीलाई दिइने पेश्की (नियम ५०)</option>
            </select>
            <p className="text-xs text-slate-500 mt-1.5">{gracePeriodText}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              बाँकी पेश्की रकम (Principal Advance Amount)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-semibold text-sm">रू.</span>
              <input
                type="number"
                min="1000"
                step="1000"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              म्याद नाघेको दिन संख्या (Overdue Days)
            </label>
            <input
              type="number"
              min="1"
              max="1500"
              value={overdueDays}
              onChange={(e) => setOverdueDays(Math.max(1, Number(e.target.value)))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              तोकिएको म्याद (१५ दिन/२१ दिन) समाप्त भएपछिको जम्मा दिन संख्या
            </p>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-medium">द्रुत उदाहरण:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setAdvanceType('travel'); setAdvanceAmount(40000); setOverdueDays(30); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                भ्रमण पेश्की ३० दिन नाघेको (रु ४० हजार)
              </button>
              <button
                type="button"
                onClick={() => { setAdvanceType('contractor'); setAdvanceAmount(500000); setOverdueDays(90); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                ठेकेदार पेश्की ९० दिन नाघेको (रु ५ लाख)
              </button>
              <button
                type="button"
                onClick={() => { setAdvanceType('purchase'); setAdvanceAmount(100000); setOverdueDays(60); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                खरिद पेश्की ६० दिन नाघेको (रु १ लाख)
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                मूल साँवा पेश्की
              </span>
              <div className="text-xl font-bold text-slate-900 mt-1">
                रु. {advanceAmount.toLocaleString('ne-NP')}
              </div>
              <p className="text-xs text-slate-500 mt-1">फस्यौट हुन बाँकी</p>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <span className="text-xs font-semibold text-red-700 uppercase tracking-wider block">
                १०% दरले ब्याज ({overdueDays} दिन)
              </span>
              <div className="text-xl font-bold text-red-950 mt-1">
                + रु. {interestAmount.toLocaleString('ne-NP')}
              </div>
              <p className="text-xs text-red-700 mt-1">दैनिक रु. {Math.round(advanceAmount * dailyRate).toLocaleString('ne-NP')}</p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                कुल असुल गर्नुपर्ने रकम
              </span>
              <div className="text-xl font-bold text-emerald-950 mt-1">
                रु. {totalPayable.toLocaleString('ne-NP')}
              </div>
              <p className="text-xs text-emerald-700 mt-1">साँवा + ब्याज एकमुष्ट</p>
            </div>
          </div>

          {/* Legal Consequence Steps */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>कानुनी कारबाही तथा असुली प्रक्रिया (नियमावलीको नियम ५१):</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">१</span>
                <span><strong>तलब तथा भत्ता रोक्का:</strong> कर्मचारीले म्यादभित्र आवश्यक कागजात नबुझाएमा कार्यालय प्रमुखले मासिक तलब, भत्ता रोक्का वा कट्टा गरी असुल गर्नेछ (नियम ५१(२))।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">२</span>
                <span><strong>नाम सार्वजनिक:</strong> व्यक्ति, फर्म वा कम्पनी भए नाम सार्वजनिक गरी ब्याज सहित सरकारी बाँकी सरह असुल गर्न तालुक निकायमा लेखी पठाइनेछ (नियम ५१(३))।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">३</span>
                <span><strong>कुमारी चोक तथा केन्द्रीय तहसिलमा पठाउने:</strong> ३ वर्षसम्म असुल नभएमा ऐनको दफा ४७ र नियम ९०(१०) बमोजिम अनुसूची-१५ भरी जायजेथाबाट असुल गर्न पठाइनेछ।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">४</span>
                <span><strong>म्याद थप सुविधा:</strong> मनासिब कारण भए कार्यालय प्रमुखले बढीमा १५ दिनसम्मको म्याद थप गरिदिन सक्ने व्यवस्था नियम ५४ मा छ।</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
