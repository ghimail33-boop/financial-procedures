import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Eye, CheckCircle2 } from 'lucide-react';

interface PdfDoc {
  id: string;
  titleNepali: string;
  titleEnglish: string;
  fileName: string;
  filePath: string;
  size: string;
  pages: number;
  date: string;
  type: string;
  description: string;
}

const OFFICIAL_PDFS: PdfDoc[] = [
  {
    id: 'act-2076',
    titleNepali: 'आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व ऐन, २०७६ (संशोधनसहित)',
    titleEnglish: 'Financial Procedures and Fiscal Responsibility Act, 2076 (With 2081 Amendment)',
    fileName: 'aarthik_karyavidhi_ain_2076.pdf',
    filePath: '/assets/aistudio/___________________________________________________08228088.pdf',
    size: '१.१५ MB',
    pages: 42,
    date: 'प्रमाणीकरण: २०७६/०६/२४ (पहिलो संशोधन: २०८१/१२/१८)',
    type: 'ऐन (संसदीय कानुन)',
    description: 'नेपाल कानुन आयोग तथा नेपाल राजपत्रमा प्रकाशित आधिकारिक मूल ऐन दस्तावेज (पहिलो संशोधनसहित ४२ पृष्ठ)।'
  },
  {
    id: 'rules-2077',
    titleNepali: 'आर्थिक कार्यविधि तथा वित्तीय उत्तरदायित्व नियमावली, २०७७ (१९ अनुसूचीसहित)',
    titleEnglish: 'Financial Procedures and Fiscal Responsibility Rules, 2077 (With All 19 Schedules)',
    fileName: 'aarthik_karyavidhi_niyamawali_2077.pdf',
    filePath: '/assets/aistudio/_________________________________________________________d8d8961c.pdf',
    size: '१३.१ MB',
    pages: 197,
    date: 'राजपत्र प्रकाशन: २०७७/१०/१९ (खण्ड ७०, संख्या ४०, भाग ३)',
    type: 'नियमावली (नेपाल राजपत्र)',
    description: 'नेपाल राजपत्रमा प्रकाशित नियमावली र सबै १९ अनुसूची फारामहरू।'
  },
  {
    id: 'constitution-2072',
    titleNepali: 'नेपालको संविधान, २०७२ (संशोधनसहित)',
    titleEnglish: 'Constitution of Nepal, 2072',
    fileName: 'constitution-of-nepal-2072.pdf',
    filePath: '/assets/constitution-of-nepal-2072.pdf',
    size: '४.१५ MB',
    pages: 183,
    date: 'नेपाल राजपत्रमा प्रकाशन: २०७२/०६/०३',
    type: 'संविधान',
    description: 'संघ, प्रदेश र स्थानीय तहको वित्तीय अधिकार, बजेट, सञ्चित कोष, राजस्व बाँडफाँट र लेखापरीक्षणसम्बन्धी संवैधानिक व्यवस्था।'
  },
  {
    id: 'fiscal-act-2074',
    titleNepali: 'अन्तर–सरकारी वित्त व्यवस्थापन ऐन, २०७४',
    titleEnglish: 'Intergovernmental Fiscal Arrangement Act, 2074',
    fileName: 'intergovernmental-fiscal-management-act-2074.pdf',
    filePath: '/assets/intergovernmental-fiscal-management-act-2074.pdf',
    size: '६३६ KB',
    pages: 20,
    date: 'प्रमाणीकरण: २०७४/०६/२७',
    type: 'ऐन (अन्तरसरकारी वित्त)',
    description: 'कर तथा गैरकर अधिकार, राजस्व बाँडफाँट, अनुदान, ऋण, बजेट प्रक्रिया र तीनै तहको वित्तीय जवाफदेहिता सम्बन्धी ऐन।'
  }
];

export const PdfViewerSection: React.FC = () => {
  const [activePdf, setActivePdf] = useState<PdfDoc>(OFFICIAL_PDFS[0]);
  const [showEmbedded, setShowEmbedded] = useState<boolean>(true);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>आधिकारिक कानुनी दस्तावेज संग्रह</span>
              <span>·</span>
              <span className="text-emerald-700">नेपाल राजपत्र / कानुन आयोग प्रमाणित</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              मूल कानुनी कागजातहरू (Official Gazette PDFs)
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              संसद् तथा नेपाल कानून आयोगका उपलब्ध मूल कानुनी दस्तावेजहरू सिधै पढ्न वा डाउनलोड गर्न सकिन्छ।
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={activePdf.filePath}
              download={activePdf.fileName}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-medium text-sm transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>डाउनलोड ({activePdf.size})</span>
            </a>
            <a
              href={activePdf.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium text-sm transition"
            >
              <ExternalLink className="w-4 h-4" />
              <span>नयाँ ट्याबमा खोल्नुहोस्</span>
            </a>
          </div>
        </div>

        {/* Document Selector Segmented Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          {OFFICIAL_PDFS.map((doc) => {
            const isSelected = activePdf.id === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActivePdf(doc)}
                className={`p-4 rounded-xl text-left border transition flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className={`p-2.5 rounded-lg shrink-0 ${
                    isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">{doc.type}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{doc.pages} पृष्ठ</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{doc.size}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {doc.titleNepali}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{doc.date}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold truncate max-w-xl">
              दस्तावेज: {activePdf.titleNepali}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400 hidden sm:inline">पृष्ठ संख्या: {activePdf.pages}</span>
            <button
              type="button"
              onClick={() => setShowEmbedded(!showEmbedded)}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 transition"
            >
              {showEmbedded ? 'PDF लुकाउनुहोस्' : 'PDF देखाउनुहोस्'}
            </button>
          </div>
        </div>

        {showEmbedded ? (
          <div className="relative w-full h-[750px] bg-slate-100">
            <iframe
              src={activePdf.filePath}
              className="w-full h-full border-none"
              title={activePdf.titleNepali}
            />
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-medium">PDF Viewer बन्द गरिएको छ।</p>
            <button
              type="button"
              onClick={() => setShowEmbedded(true)}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
            >
              दस्तावेज यहाँ खोल्नुहोस्
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
