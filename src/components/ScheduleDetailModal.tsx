import React from 'react';
import { X, Printer, Copy, Check, Download, Info, Table } from 'lucide-react';
import { ScheduleItem } from '../data/schedulesData';

interface ScheduleDetailModalProps {
  schedule: ScheduleItem | null;
  onClose: () => void;
}

export const ScheduleDetailModal: React.FC<ScheduleDetailModalProps> = ({ schedule, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!schedule) return null;

  const handleCopy = () => {
    const text = `नेपाल सरकार\nअनुसूची-${schedule.nepaliNumber}\n${schedule.title}\n(${schedule.relatedRule})\n\nउद्देश्य: ${schedule.purpose}\nविवरण: ${schedule.description}\nस्तम्भहरू:\n${(schedule.columns || []).map((c, i) => `${i + 1}. ${c}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <span>आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              अनुसूची-{schedule.nepaliNumber}: {schedule.title}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              कानूनी आधार: <strong>{schedule.relatedRule}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="ढाँचा कपी गर्नुहोस्"
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Purpose & Description Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                फारामको उद्देश्य (Purpose):
              </span>
              <p className="text-sm font-medium text-slate-800">{schedule.purpose}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                प्रयोग विधि तथा विवरण (Details):
              </span>
              <p className="text-sm text-slate-700">{schedule.description}</p>
            </div>
          </div>

          {/* Schedule 19 Specific Rates Table */}
          {schedule.scheduleNo === 19 && schedule.rates && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Table className="w-4 h-4 text-red-600" />
                  <span>ह्रास कट्टी दररेट तालिका (Depreciation Rate Matrix):</span>
                </h4>
                <span className="text-xs text-slate-500">घट्दो ह्रास कट्टी विधि (WDV)</span>
              </div>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-800 font-semibold text-xs border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4 w-16">क्र.सं.</th>
                      <th className="py-2.5 px-4">सम्पत्ति तथा जिन्सीको विवरण</th>
                      <th className="py-2.5 px-4 w-32 text-center">ह्रास कट्टी दर</th>
                      <th className="py-2.5 px-4">कानूनी मापदण्ड तथा टिप्पणी</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedule.rates.map((r) => (
                      <tr key={r.sn} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-600">{r.sn}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">{r.description}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2.5 py-1 bg-red-100 text-red-800 font-bold rounded-lg text-sm">
                            {r.ratePercent}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-600">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Schedule Form Template Simulation */}
          {schedule.columns && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Table className="w-4 h-4 text-red-600" />
                  <span>आधिकारिक फाराम ढाँचा तथा महलहरू (Official Columns Layout):</span>
                </h4>
                <span className="text-xs text-slate-500">कुल {schedule.columns.length} स्तम्भहरू</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-2xs">
                <div className="p-4 bg-slate-50 border-b border-slate-200 text-center space-y-1">
                  <div className="text-xs font-bold text-red-700 uppercase">नेपाल सरकार</div>
                  <div className="text-xs text-slate-600">मन्त्रालय / निकाय / विभाग / कार्यालय</div>
                  <div className="text-sm font-bold text-slate-900">
                    अनुसूची-{schedule.nepaliNumber}: {schedule.title}
                  </div>
                  <div className="text-xs text-slate-500">आर्थिक वर्ष: ...................</div>
                </div>

                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      {schedule.columns.map((col, idx) => (
                        <th key={idx} className="py-2.5 px-3 border-r border-slate-200 last:border-r-0 whitespace-nowrap">
                          <div className="text-[10px] text-slate-400 font-normal">महल {idx + 1}</div>
                          <div>{col}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-500">
                    {[1, 2, 3].map((row) => (
                      <tr key={row} className="hover:bg-slate-50">
                        {schedule.columns?.map((_, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 border-r border-slate-100 last:border-r-0 text-slate-400">
                            {cIdx === 0 ? row : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Official Signature Section */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-400 mb-6">........................</div>
              <div className="font-bold text-slate-800">तयार गर्ने</div>
              <div className="text-[11px] text-slate-500">सहायक / कर्मचारी</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-400 mb-6">........................</div>
              <div className="font-bold text-slate-800">जाँच गर्ने</div>
              <div className="text-[11px] text-slate-500">शाखा अधिकृत</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-400 mb-6">........................</div>
              <div className="font-bold text-slate-800">आर्थिक प्रशासन शाखा प्रमुख</div>
              <div className="text-[11px] text-slate-500">लेखा अधिकृत / उपसचिव</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-slate-400 mb-6">........................</div>
              <div className="font-bold text-slate-800">कार्यालय प्रमुख / सचिव</div>
              <div className="text-[11px] text-slate-500">स्वीकृत गर्ने अधिकारी</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            यो ढाँचा नियमावली, २०७७ को आधिकारिक अनुसूची हो।
          </span>
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
