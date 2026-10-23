import React from 'react';
import {
  Scale,
  BookOpen,
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  Download,
  Calculator,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Coins,
  Building2,
  FileCheck
} from 'lucide-react';
import { ACT_METADATA } from '../data/actData';
import { RULES_METADATA } from '../data/rulesData';
import { ActiveTab } from './Header';

interface HomeSectionProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onSelectTab, onOpenSearch }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/30 text-red-300 border border-red-500/30 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>नेपाल सरकारको आधिकारिक वित्तीय कानुन तथा नियमावली पोर्टल</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व
            <span className="block text-red-400 mt-1">डिजिटल कानुनी सहायता प्रणाली</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            नेपालको सार्वजनिक वित्तीय व्यवस्थापन प्रणालीलाई जिम्मेवार, पारदर्शी, नतिजामूलक र उत्तरदायी बनाउन जारी
            <strong> आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६ (संशोधन २०८१ सहित)</strong> र{' '}
            <strong>नियमावली, २०७७ (१९ वटा अनुसूची ढाँचाहरू)</strong> को सम्पूर्ण कानुनी ज्ञान, दफा-नियम खोजी र व्यावहारिक निर्देशिका।
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-semibold text-sm transition shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>दफा, नियम वा विषय खोज्नुहोस्</span>
            </button>
            <button
              onClick={() => onSelectTab('guides')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-sm transition"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>१० मुख्य व्यावहारिक निर्देशिकाहरू</span>
            </button>
            <button
              onClick={() => onSelectTab('pdfs')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-sm transition"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>मूल राजपत्र पीडीएफ</span>
            </button>
          </div>
        </div>

        {/* Heraldic background design accent */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <Scale className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Official Statistics Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onSelectTab('act')}
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-red-400 transition cursor-pointer shadow-2xs group"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase">ऐन, २०७६</div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-red-700 mt-1">
            ६८ <span className="text-sm font-semibold text-slate-500">दफाहरू</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">१० वटा परिच्छेद (२०८१ संशोधन)</div>
        </div>

        <div
          onClick={() => onSelectTab('rules')}
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 transition cursor-pointer shadow-2xs group"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase">नियमावली, २०७७</div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-emerald-700 mt-1">
            १३६ <span className="text-sm font-semibold text-slate-500">नियमहरू</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">१४ वटा परिच्छेद (नेपाल राजपत्र)</div>
        </div>

        <div
          onClick={() => onSelectTab('schedules')}
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition cursor-pointer shadow-2xs group"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase">कानुनी ढाँचाहरू</div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-blue-700 mt-1">
            १९ <span className="text-sm font-semibold text-slate-500">अनुसूचीहरू</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">बजेट, बेरुजु, धरौटी र ह्रासकट्टी दर</div>
        </div>

        <div
          onClick={() => onSelectTab('penalties')}
          className="p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-400 transition cursor-pointer shadow-2xs group"
        >
          <div className="text-xs font-semibold text-slate-500 uppercase">जवाफदेहिता</div>
          <div className="text-3xl font-extrabold text-slate-900 group-hover:text-amber-700 mt-1">
            दफा ५७ <span className="text-sm font-semibold text-slate-500">सजाय</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">रु ५० हजारसम्म जरिवाना र बिगो</div>
        </div>
      </div>

      {/* Two Pillars: The Act and The Rules Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Act Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2.5 py-1 rounded-md">
                संसदीय ऐन
              </span>
              <span className="text-xs text-slate-500">{ACT_METADATA.authenticationDate}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {ACT_METADATA.nameNepali}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              सङ्घीय सञ्चित कोष, बजेट चक्र (MTEF, स्रोत अनुमान), निकासा, खर्च नियन्त्रण, दोहोरो लेखा प्रणाली,
              आन्तरिक तथा अन्तिम लेखापरीक्षण, बेरुजु फस्यौट समिति, कुमारी चोक तथा केन्द्रीय तहसिल र वित्तीय जवाफदेहिताको सर्वोच्च ऐन।
            </p>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-1 border border-slate-200">
              <div className="font-semibold text-slate-900">पहिलो संशोधन २०८१ (२०८१।१२।१८):</div>
              <p className="text-slate-600">
                माघ मसान्तमा स्रोत अनुमान, फागुन १५ मा बजेट सीमा, आयोजना बैंकको अनिवार्यता र LMBIS प्रविष्टि सम्बन्धी ऐतिहासिक सुधार।
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">१० परिच्छेद · ६८ दफा</span>
            <button
              onClick={() => onSelectTab('act')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 hover:text-red-900 transition"
            >
              <span>ऐनका दफाहरू पढ्नुहोस्</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rules Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                नेपाल राजपत्र
              </span>
              <span className="text-xs text-slate-500">{RULES_METADATA.gazetteDate}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {RULES_METADATA.nameNepali}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              एकल खाता कोष (TSA), असार मसान्तभन्दा ७ दिन अगावै भुक्तानी बन्द, कार्यसम्पादन करार (८०+ उत्कृष्ट),
              पेश्कीमा १०% ब्याज, धरौटी फिर्ता १ वर्ष, जिन्सी लिलाम बिक्री विधि र १९ वटा अनिवार्य फारामहरू।
            </p>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-1 border border-slate-200">
              <div className="font-semibold text-slate-900">१९ वटा आधिकारिक अनुसूचीहरू:</div>
              <p className="text-slate-600">
                अनुसूची १ देखि १८ सम्मका बजेट, प्रगति, वैदेशिक सहायता, प्रतिबद्धता, धरौटी, बेरुजु, बरबुझारथ र अनुसूची १९ को ह्रासकट्टी दररेट तालिका।
              </p>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">१४ परिच्छेद · १३६ नियम · १९ अनुसूची</span>
            <button
              onClick={() => onSelectTab('rules')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition"
            >
              <span>नियमावलीका नियमहरू पढ्नुहोस्</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 6 Key Functional Pillars (विषयगत स्तम्भहरू) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700">
            कार्यकारी विषयगत मार्गदर्शक
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            सार्वजनिक वित्तीय व्यवस्थापनका ६ मुख्य स्तम्भहरू
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            कार्यालय प्रमुख, लेखा अधिकृत, कर्मचारी तथा सरोकारवालाहरूले अनिवार्य जान्नैपर्ने मुख्य पक्षहरू
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => onSelectTab('guides')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              १
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              बजेट चक्र, MTEF र राष्ट्रिय आयोजना बैङ्क
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              माघ मसान्तमा स्रोत अनुमान, फागुन १५ मा बजेट सीमा, आयोजना बैंकमा दर्ता र जेठ १५ मा संसदमा बजेट पेश।
            </p>
          </div>

          <div
            onClick={() => onSelectTab('guides')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              २
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              बेरुजु फस्यौट, सम्परीक्षण र लगत कट्टा
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              ३५ दिने प्रारम्भिक म्याद, सचिवद्वारा नियमित गर्ने अधिकार, PAC छलफल र बेरुजु फस्यौट समिति (दफा ४२)।
            </p>
          </div>

          <div
            onClick={() => onSelectTab('calculators')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ३
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              पेश्की व्यवस्थापन र १०% ब्याज नियम
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              भ्रमण १५ दिन, खरिद २१ दिन, म्याद नाघेमा १०% ब्याज असुल, तलब रोक्का र बैंक जमानत (नियम ५०, ५१)।
            </p>
          </div>

          <div
            onClick={() => onSelectTab('calendar')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold">
              ४
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              वर्षान्त अनुशासन र ७ दिन अगावै निकासा बन्द
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              असार मसान्तभन्दा ७ दिन अगावै (असार २४) भुक्तानी बन्द, अन्तिम दिन भुक्तानी निषेध र साउन २१ सम्म समायोजन।
            </p>
          </div>

          <div
            onClick={() => onSelectTab('calculators')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              ५
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              जिन्सी संरक्षण, लिलाम र अनुसूची १९ ह्रासकट्टी
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              कम्प्युटर ५ वर्ष (२५%), फर्निचर १० वर्ष (२५%), गाडी २० वर्ष (२०%), मेशिनरी १५ वर्ष (१५%) घट्दो ह्रासकट्टी।
            </p>
          </div>

          <div
            onClick={() => onSelectTab('penalties')}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
              ६
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700 transition">
              सजाय, जरिवाना र कुमारी चोकको अधिकार
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              भुक्तानी नदिए रु ५०,००० सम्म जरिवाना, बजेटभन्दा बढी ठेक्का लगाए बिगो बराबर जरिवाना, जायजेथा लिलाम र कैद आदेश।
            </p>
          </div>
        </div>
      </div>

      {/* Official Downloads Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-lg font-bold">नेपाल राजपत्र र कानुन आयोगका मूल कानुनी पीडीएफ कागजातहरू</h4>
          <p className="text-xs text-slate-400">
            प्रमाणीकरण मिति २०७६।०६।२४ (पहिलो संशोधन २०८१) र राजपत्र २०७७।१०।१९ का पूर्ण दस्तावेजहरू
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="/assets/aistudio/___________________________________________________08228088.pdf"
            download="aarthik_karyavidhi_ain_2076.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>ऐन, २०७६ (१.१५ MB)</span>
          </a>
          <a
            href="/assets/aistudio/_________________________________________________________d8d8961c.pdf"
            download="aarthik_karyavidhi_niyamawali_2077.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>नियमावली, २०७७ (१३.१ MB)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
