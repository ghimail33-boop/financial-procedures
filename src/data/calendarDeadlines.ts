export interface FiscalDeadline {
  id: string;
  monthNepali: string;
  dayNepali: string;
  title: string;
  legalProvision: string;
  responsibleEntity: string;
  targetEntity: string;
  category: "budget" | "audit" | "reporting" | "freeze" | "settlement";
  importance: "critical" | "high" | "medium";
  description: string;
}

export const FISCAL_DEADLINES: FiscalDeadline[] = [
  {
    id: "d1",
    monthNepali: "माघ",
    dayNepali: "मसान्त",
    title: "MTEF तथा आगामी ३ वर्षको स्रोत तथा खर्च सीमा पूर्वानुमान",
    legalProvision: "ऐनको दफा ७(१) र नियमावलीको नियम ११(१)",
    responsibleEntity: "राष्ट्रिय स्रोत अनुमान समिति / योजना आयोग",
    targetEntity: "अर्थ मन्त्रालय",
    category: "budget",
    importance: "critical",
    description: "आगामी तीन वर्षमा उपलब्ध हुने राष्ट्रिय स्रोत तथा खर्चको सीमाको पूर्वानुमान माघ मसान्तभित्र गरिसक्नुपर्ने।"
  },
  {
    id: "d2",
    monthNepali: "फागुन",
    dayNepali: "७ गते",
    title: "स्रोत अनुमान तथा खर्च सीमा प्रतिवेदन अर्थ मन्त्री समक्ष पेश",
    legalProvision: "ऐनको दफा ७(७) र दफा ८(१)",
    responsibleEntity: "राष्ट्रिय स्रोत अनुमान समिति / योजना आयोग",
    targetEntity: "अर्थ मन्त्री",
    category: "budget",
    importance: "critical",
    description: "आगामी ३ वर्षको बजेट सीमा, MTEF खाका र राष्ट्रिय गौरवका आयोजनाको स्रोत सुनिश्चितता सहितको मार्गदर्शन अर्थ मन्त्री समक्ष पेश गर्ने।"
  },
  {
    id: "d3",
    monthNepali: "फागुन",
    dayNepali: "१५ गते",
    title: "मन्त्रालयहरूमा बजेट सीमा तथा मार्गदर्शन प्रेषित",
    legalProvision: "ऐनको दफा ८(१) र नियमावलीको नियम १६(२)",
    responsibleEntity: "अर्थ मन्त्रालय",
    targetEntity: "सबै मन्त्रालय तथा केन्द्रीय निकायहरू",
    category: "budget",
    importance: "critical",
    description: "मन्त्रालयगत खर्च मापदण्ड (नर्म्स) र राजस्व लक्ष्य सहितको बजेट सीमा मन्त्रालयहरूमा पठाउने।"
  },
  {
    id: "d4",
    monthNepali: "फागुन",
    dayNepali: "मसान्त",
    title: "केन्द्रीय निकायद्वारा MTEF र बजेट प्रस्ताव LMBIS मा प्रविष्टि",
    legalProvision: "ऐनको दफा ९(१) र नियमावलीको नियम ११(२)",
    responsibleEntity: "सबै मन्त्रालय तथा केन्द्रीय निकायहरू",
    targetEntity: "योजना आयोग र अर्थ मन्त्रालय",
    category: "budget",
    importance: "high",
    description: "आगामी वर्षको नीति, कार्यक्रम र बजेट प्रस्ताव LMBIS प्रणालीमा प्रविष्ट गरी पठाउने।"
  },
  {
    id: "d5",
    monthNepali: "चैत",
    dayNepali: "१५ गते",
    title: "खर्च हुन नसक्ने बजेट रकम अर्थ मन्त्रालयमा समर्पण (Surrender)",
    legalProvision: "ऐनको दफा २१(३)",
    responsibleEntity: "लेखा उत्तरदायी अधिकृत (सचिव)",
    targetEntity: "अर्थ मन्त्रालय",
    category: "freeze",
    importance: "high",
    description: "फागुन मसान्तसम्म खर्च नभएको वा बाँकी अवधिमा खर्च हुन नसक्ने बजेट चैत १५ भित्र समर्पण गर्नुपर्ने।"
  },
  {
    id: "d6",
    monthNepali: "जेठ",
    dayNepali: "१ गते अगावै (१५ दिन पूर्व)",
    title: "बजेटका सिद्धान्त र प्राथमिकता सङ्घीय संसद्मा प्रस्तुत",
    legalProvision: "ऐनको दफा ११(१)",
    responsibleEntity: "अर्थ मन्त्री",
    targetEntity: "सङ्घीय संसद्",
    category: "budget",
    importance: "critical",
    description: "विनियोजन विधेयक पेश हुनुभन्दा कम्तीमा १५ दिन अगावै बजेट तथा कार्यक्रमका सिद्धान्त र प्राथमिकता संसदमा पेश गर्ने।"
  },
  {
    id: "d7",
    monthNepali: "जेठ",
    dayNepali: "१४ गते",
    title: "आर्थिक सर्वेक्षण सङ्घीय संसद्मा पेश",
    legalProvision: "ऐनको दफा १४(२)",
    responsibleEntity: "अर्थ मन्त्री",
    targetEntity: "सङ्घीय संसद्",
    category: "reporting",
    importance: "high",
    description: "बजेट पेश गर्नु अगावै चालू आर्थिक वर्षको आर्थिक सर्वेक्षण दुवै सदनमा पेश गर्ने।"
  },
  {
    id: "d8",
    monthNepali: "जेठ",
    dayNepali: "१५ गते",
    title: "सङ्घीय संसद्मा वार्षिक बजेट (राजस्व र व्ययको अनुमान) पेश",
    legalProvision: "संविधानको धारा ११९ र ऐनको दफा १४(१)",
    responsibleEntity: "अर्थ मन्त्री",
    targetEntity: "सङ्घीय संसद्को संयुक्त बैठक",
    category: "budget",
    importance: "critical",
    description: "आगामी आर्थिक वर्षको वार्षिक बजेट र विनियोजन विधेयक जेठ १५ गते संसदको संयुक्त बैठकमा पेश गर्ने संवैधानिक मिति।"
  },
  {
    id: "d9",
    monthNepali: "असार",
    dayNepali: "२४ गते (मसान्तभन्दा ७ दिन पूर्व)",
    title: "आर्थिक वर्षको भुक्तानी निकासा पूर्ण बन्द",
    legalProvision: "नियमावलीको नियम ३०(१)",
    responsibleEntity: "सबै सरकारी कार्यालय, कोलेनिका, प्रदेश र स्थानीय तह",
    targetEntity: "सङ्घीय सञ्चित कोष",
    category: "freeze",
    importance: "critical",
    description: "फ्रिज नहुने शीर्षक बाहेक अन्य सबै भुक्तानी आर्थिक वर्ष समाप्त हुनुभन्दा ७ दिन अगावै बन्द गर्नुपर्ने।"
  },
  {
    id: "d10",
    monthNepali: "साउन",
    dayNepali: "२१ गते",
    title: "नसाटिएका चेक समायोजन गरी कोलेनिकामा पेश",
    legalProvision: "नियमावलीको नियम ३०(४)",
    responsibleEntity: "सम्बन्धित सरकारी कार्यालयहरू",
    targetEntity: "कोलेनिका",
    category: "settlement",
    importance: "medium",
    description: "असार मसान्तसम्म जारी चेक १५ दिनभित्र नसाटिएमा निकासा र खर्च घटाई समायोजन विवरण पठाउने।"
  },
  {
    id: "d11",
    monthNepali: "भदौ",
    dayNepali: "मसान्त",
    title: "आन्तरिक लेखापरीक्षणको वार्षिक प्रतिवेदन मलेनिकामा पेश",
    legalProvision: "नियमावलीको नियम ८३(१०)",
    responsibleEntity: "कोष तथा लेखा नियन्त्रक कार्यालय (कोलेनिका)",
    targetEntity: "महालेखा नियन्त्रक कार्यालय (मलेनिका)",
    category: "audit",
    importance: "high",
    description: "कार्यक्षेत्रभित्रका कार्यालयहरूको आन्तरिक लेखापरीक्षणको वार्षिक प्रतिवेदन भदौ मसान्तभित्र मलेनिकामा पठाउने।"
  },
  {
    id: "d12",
    monthNepali: "असोज",
    dayNepali: "मसान्त",
    title: "केन्द्रीय लेखा तथा सम्पत्ति दायित्व विवरण मलेनिकामा पेश",
    legalProvision: "ऐनको दफा २६(४), दफा २९(२) र नियमावलीको नियम १०(१), ७८(६)",
    responsibleEntity: "लेखा उत्तरदायी अधिकृत (सचिव) र स्थानीय तह",
    targetEntity: "महालेखा नियन्त्रक कार्यालय",
    category: "reporting",
    importance: "high",
    description: "मन्त्रालयगत आयव्यय, सम्पत्ति, दायित्व र धरौटीको केन्द्रीय विवरण असोज मसान्तभित्र मलेनिकामा पेश गर्ने।"
  },
  {
    id: "d13",
    monthNepali: "कात्तिक",
    dayNepali: "१५ गते",
    title: "प्रदेश तथा केन्द्रीय एकीकृत वित्तीय विवरण पेश",
    legalProvision: "नियमावलीको नियम १०(२) र ऐनको दफा २९(१)",
    responsibleEntity: "प्रदेश लेखा नियन्त्रक कार्यालय र मलेनिका",
    targetEntity: "महालेखा परीक्षकको कार्यालय",
    category: "reporting",
    importance: "high",
    description: "प्रदेशले मलेनिकामा र मलेनिकाले केन्द्रीय एकीकृत लेखा महालेखा परीक्षकको कार्यालयमा पेश गर्ने।"
  },
  {
    id: "d14",
    monthNepali: "कात्तिक",
    dayNepali: "मसान्त",
    title: "आन्तरिक लेखापरीक्षण प्रतिवेदन अर्थ मन्त्री समक्ष पेश",
    legalProvision: "ऐनको दफा ३३(११) र नियमावलीको नियम ७८(७)",
    responsibleEntity: "महालेखा नियन्त्रक कार्यालय",
    targetEntity: "अर्थ मन्त्री",
    category: "audit",
    importance: "high",
    description: "आन्तरिक लेखापरीक्षणको एकीकृत वार्षिक प्रतिवेदन कात्तिक मसान्तभित्र अर्थ मन्त्री समक्ष पेश गर्ने।"
  },
  {
    id: "d15",
    monthNepali: "पुस",
    dayNepali: "१५ गते",
    title: "एकीकृत वित्तीय विवरण अर्थ मन्त्रालयमा पेश",
    legalProvision: "नियमावलीको नियम १०(३)",
    responsibleEntity: "महालेखा नियन्त्रक कार्यालय",
    targetEntity: "अर्थ मन्त्रालय र महालेखा परीक्षक",
    category: "reporting",
    importance: "high",
    description: "तीनै तहको सञ्चित कोष र अन्य कोषको एकीकृत वित्तीय विवरण अर्थ मन्त्रालयमा पठाउने।"
  },
  {
    id: "d16",
    monthNepali: "पुस",
    dayNepali: "मसान्त",
    title: "एकीकृत वित्तीय विवरण सार्वजनिक गर्नुपर्ने",
    legalProvision: "ऐनको दफा ५(६)",
    responsibleEntity: "अर्थ मन्त्रालय",
    targetEntity: "सार्वजनिक (जनता/सरोकारवाला)",
    category: "reporting",
    importance: "critical",
    description: "नेपाल सरकारको समग्र सङ्घ, प्रदेश र स्थानीय तहको एकीकृत वित्तीय विवरण पुस मसान्तभित्र अनिवार्य सार्वजनिक गर्ने।"
  }
];
