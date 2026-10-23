import React, { useState } from 'react';
import { Calculator, Info, RotateCcw, AlertCircle, ShieldCheck } from 'lucide-react';

interface AssetCategory {
  id: string;
  name: string;
  rate: number;
  minYears: number;
  description: string;
}

const ASSET_CATEGORIES: AssetCategory[] = [
  { id: 'it', name: 'कम्प्युटर तथा सूचना प्रविधि उपकरण (ल्यापटप, प्रिन्टर, सर्भर)', rate: 25, minYears: 5, description: '५ वर्ष पुगेपछि वा मर्मत खर्च २५% भन्दा बढी भएमा' },
  { id: 'furniture', name: 'फर्निचर तथा फिक्सचर्स (टेबल, कुर्सी, दराज, आदि)', rate: 25, minYears: 10, description: '१० वर्ष पुगेपछि वा टुटफुट भई काम नलाग्ने भएमा' },
  { id: 'automobiles', name: 'सवारी साधन (अटोमोबाइल्स, बस, जिप, भ्यान, मोटरसाइकल)', rate: 20, minYears: 20, description: '२० वर्ष पुगेपछि प्राविधिक जाँच गराई लिलाम गर्न सकिने' },
  { id: 'construction', name: 'निर्माण तथा उत्खनन् उपकरण (डोजर, रोलर, एक्साभेटर)', rate: 15, minYears: 15, description: '१५ वर्ष पुगेपछि प्राविधिक परीक्षण पश्चात' },
  { id: 'machinery', name: 'अन्य मेशिनरी तथा औजार (जेनेरेटर, पम्प, उपकरण)', rate: 15, minYears: 15, description: '१५ वर्ष पुगेपछि वा मर्मत असम्भव भएमा' },
];

export const AuctionDepreciationCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('it');
  const [costPrice, setCostPrice] = useState<number>(85000);
  const [years, setYears] = useState<number>(5);
  const [repairCostPercent, setRepairCostPercent] = useState<number>(30);

  const category = ASSET_CATEGORIES.find((c) => c.id === selectedCategory) || ASSET_CATEGORIES[0];

  // Calculate year by year using Diminishing Balance Method (घट्दो ह्रास कट्टी विधि)
  const breakdown: { year: number; openingValue: number; depreciation: number; closingValue: number }[] = [];
  let currentVal = costPrice;
  for (let i = 1; i <= Math.min(years, 30); i++) {
    const dep = currentVal * (category.rate / 100);
    const closing = Math.max(0, currentVal - dep);
    breakdown.push({
      year: i,
      openingValue: currentVal,
      depreciation: dep,
      closingValue: closing
    });
    currentVal = closing;
  }

  const finalValue = Math.round(currentVal);
  const depositRequired5Percent = Math.round(finalValue * 0.05);
  const isEligibleByAge = years >= category.minYears;
  const isEligibleByRepair = repairCostPercent > 25;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">सरकारी जिन्सी लिलाम ह्रासकट्टी क्याल्कुलेटर</h3>
            <p className="text-sm text-slate-300">
              नियमावली २०७७ को नियम १०७(४) र अनुसूची-१९ बमोजिम घट्दो ह्रास कट्टी विधि (Written Down Value)
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              सामानको वर्ग (अनुसूची १९ अनुसार)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
            >
              {ASSET_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.rate}%)
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              {category.description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              खरिद मूल्य वा प्रारम्भिक लागत (रु.)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-500 font-semibold text-sm">रू.</span>
              <input
                type="number"
                min="100"
                step="500"
                value={costPrice}
                onChange={(e) => setCostPrice(Math.max(0, Number(e.target.value)))}
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                प्रयोग भएको वर्ष (Years)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Math.max(1, Math.min(30, Number(e.target.value))))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                मर्मत खर्च अनुमान (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={repairCostPercent}
                onChange={(e) => setRepairCostPercent(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-xs text-slate-500 block mb-2 font-medium">द्रुत उदाहरण:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setSelectedCategory('it'); setCostPrice(90000); setYears(5); setRepairCostPercent(35); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                ल्यापटप ५ वर्ष (रु ९०,०००)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('automobiles'); setCostPrice(3500000); setYears(20); setRepairCostPercent(40); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                गाडी २० वर्ष (रु ३५ लाख)
              </button>
              <button
                type="button"
                onClick={() => { setSelectedCategory('furniture'); setCostPrice(25000); setYears(10); setRepairCostPercent(20); }}
                className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition"
              >
                फर्निचर १० वर्ष (रु २५,०००)
              </button>
            </div>
          </div>
        </div>

        {/* Results & Legal Status */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                न्यूनतम लिलाम मूल्य (Reserved Price)
              </span>
              <div className="text-2xl font-bold text-emerald-950 mt-1">
                रु. {finalValue.toLocaleString('ne-NP')}
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                {years} वर्ष पछि बाँकी लिखित मूल्य (WDV)
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <span className="text-xs font-semibold text-blue-800 uppercase tracking-wider block">
                आवश्यक ५% धरौटी रकम (नियम १०८)
              </span>
              <div className="text-2xl font-bold text-blue-950 mt-1">
                रु. {depositRequired5Percent.toLocaleString('ne-NP')}
              </div>
              <p className="text-xs text-blue-700 mt-1">
                लिलाम सकार गर्न बोलपत्रदाताले राख्नुपर्ने
              </p>
            </div>
          </div>

          {/* Legal eligibility banner */}
          <div className={`p-4 rounded-xl border ${isEligibleByAge || isEligibleByRepair ? 'bg-amber-50/80 border-amber-300' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-start gap-3">
              {isEligibleByAge || isEligibleByRepair ? (
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1 text-slate-700">
                <span className="font-bold text-slate-900 text-sm block">
                  कानुनी लिलाम योग्यता स्थिति (नियम १०६):
                </span>
                <div>
                  • <strong>अवधि मापदण्ड:</strong> {years} वर्ष प्रयोग भएको छ (मापदण्ड: {category.minYears} वर्ष) —{' '}
                  <span className={isEligibleByAge ? 'text-emerald-700 font-semibold' : 'text-slate-600'}>
                    {isEligibleByAge ? 'अवधि पूरा भएको' : 'अवधि बाँकी रहेको'}
                  </span>
                </div>
                <div>
                  • <strong>मर्मत खर्च मापदण्ड:</strong> बजार मूल्यको {repairCostPercent}% खर्च हुने देखिन्छ —{' '}
                  <span className={isEligibleByRepair ? 'text-emerald-700 font-semibold' : 'text-slate-600'}>
                    {isEligibleByRepair ? '२५% भन्दा बढी भएकाले लिलाम गर्न मिल्ने' : '२५% भन्दा कम'}
                  </span>
                </div>
                <div className="pt-1 text-slate-600">
                  {isEligibleByAge || isEligibleByRepair ? (
                    <span className="text-emerald-800 font-semibold">
                      निष्कर्ष: ऐनको दफा ४५ र नियम १०६ बमोजिम प्राविधिक प्रतिवेदन गराई यो मालसामान लिलाम बिक्री प्रक्रिया अगाडि बढाउन सकिन्छ।
                    </span>
                  ) : (
                    <span className="text-slate-600">
                      निष्कर्ष: सामान्य अवस्थामा यो सामान अझै प्रयोगयोग्य छ। विशेष प्राविधिक कारण बिना लिलाम गर्न मिल्दैन।
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Year-by-year table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              वर्षगत ह्रासकट्टी विवरण (अनुसूची १९ अनुसार {category.rate}% दरले)
            </h4>
            <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-lg text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 sticky top-0">
                  <tr>
                    <th className="py-2 px-3">वर्ष</th>
                    <th className="py-2 px-3">सुरु मूल्य (रु.)</th>
                    <th className="py-2 px-3">ह्रास कट्टी ({category.rate}%)</th>
                    <th className="py-2 px-3 text-right">अन्तिम मौज्दात मूल्य</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {breakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50">
                      <td className="py-1.5 px-3 font-sans font-medium text-slate-800">वर्ष {row.year}</td>
                      <td className="py-1.5 px-3">रु. {Math.round(row.openingValue).toLocaleString('ne-NP')}</td>
                      <td className="py-1.5 px-3 text-red-600">- रु. {Math.round(row.depreciation).toLocaleString('ne-NP')}</td>
                      <td className="py-1.5 px-3 text-right font-semibold text-slate-900">
                        रु. {Math.round(row.closingValue).toLocaleString('ne-NP')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
