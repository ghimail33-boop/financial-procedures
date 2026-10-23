export interface PenaltyItem {
  id: string;
  offense: string;
  legalSection: string;
  penalizedPerson: string;
  adjudicatingOfficer: string;
  penaltyFine: string;
  fineAmountMax?: number;
  disciplinaryAction: boolean;
  remedyAppeal: string;
}

export const PENALTIES_DATA: PenaltyItem[] = [
  {
    id: "p1",
    offense: "रीतपूर्वकको कागजात प्राप्त भएको १५ दिनभित्र भुक्तानी नदिएमा",
    legalSection: "ऐनको दफा २४(३) र दफा ५७(१)(क)",
    penalizedPerson: "भुक्तानी दिने जिम्मेवार व्यक्ति",
    adjudicatingOfficer: "एक तह माथिको अधिकारी",
    penaltyFine: "पचास हजार रुपैयाँसम्म (रु. ५०,००० सम्म) जरिवाना",
    fineAmountMax: 50000,
    disciplinaryAction: true,
    remedyAppeal: "निर्णय पाएको १५ दिनभित्र एक तह माथिको अधिकारी समक्ष पुनरावेदन (३५ दिनभित्र अन्तिम निर्णय)"
  },
  {
    id: "p2",
    offense: "विनियोजित बजेटभन्दा बढी रकमको आयोजना स्वीकृत गर्ने, ठेक्का लगाउने वा खरिद प्रक्रिया सुरु गरेमा",
    legalSection: "ऐनको दफा ५७(५)",
    penalizedPerson: "आयोजना स्वीकृत गर्ने, ठेक्का लगाउने वा खरिद प्रक्रिया प्रारम्भ गर्ने कर्मचारी",
    adjudicatingOfficer: "लेखा उत्तरदायी अधिकृत (सचिव) वा विभागीय मन्त्री",
    penaltyFine: "ठेक्का लगाएको वा खरिद प्रक्रिया सुरु गरेको कुल रकम बराबरको रकम जरिवाना (बिगो बराबर १००% जरिवाना)",
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र एक तह माथिको अधिकारी समक्ष पुनरावेदन वा मिनाहा निवेदन"
  },
  {
    id: "p3",
    offense: "थपिएको म्यादभित्र पनि स्रेस्ता खडा नगर्ने, लेखा पेश नगर्ने वा बरबुझारथ बाँकी राखेमा",
    legalSection: "ऐनको दफा २८(४), २९(४), ३६ र ५७(१)(ख)",
    penalizedPerson: "सम्बन्धित जिम्मेवार व्यक्ति",
    adjudicatingOfficer: "एक तह माथिको अधिकारी",
    penaltyFine: "पाँच सय रुपैयाँ (रु. ५००) जरिवाना",
    fineAmountMax: 500,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p4",
    offense: "सरकारी नगदी वा जिन्सी हिनामिना/मस्यौटको सूचना प्राप्त भएपछि कारबाही नगर्ने अधिकारी",
    legalSection: "ऐनको दफा ३९(३), ५४(३) र ५७(१)(ग)",
    penalizedPerson: "कार्यालय प्रमुख / विभागीय प्रमुख / सचिव",
    adjudicatingOfficer: "एक तह माथिको अधिकारी / मन्त्री",
    penaltyFine: "प्रत्येक पटक एक हजार रुपैयाँ (रु. १,०००) जरिवाना",
    fineAmountMax: 1000,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p5",
    offense: "निर्धारित प्रक्रिया पूरा नगरी आर्थिक कारोबार गरेको वा अन्य कैफियत देखिएमा",
    legalSection: "ऐनको दफा ५१(२) र दफा ५७(१)(घ)",
    penalizedPerson: "कारोबार गर्ने जिम्मेवार व्यक्ति",
    adjudicatingOfficer: "तालुक कार्यालय वा विभागीय प्रमुख",
    penaltyFine: "प्रत्येक पटक पाँच सय रुपैयाँ (रु. ५००) जरिवाना",
    fineAmountMax: 500,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p6",
    offense: "लेखा सम्बन्धी काममा अनियमितता गर्ने तथा तोकिएको म्यादभित्र निर्णय नदिने अधिकारी",
    legalSection: "ऐनको दफा ५२(३) र दफा ५७(१)(ङ)",
    penalizedPerson: "निर्णय दिनुपर्ने अधिकार प्राप्त अधिकारी",
    adjudicatingOfficer: "अधिकार प्राप्त अधिकारी / तालुक निकाय",
    penaltyFine: "दुई हजार रुपैयाँ (रु. २,०००) जरिवाना",
    fineAmountMax: 2000,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p7",
    offense: "सजाय तथा जरिवाना गर्नुपर्नेमा नगर्ने (उदासीन) अधिकारी",
    legalSection: "ऐनको दफा ५७(१)(च)",
    penalizedPerson: "सजाय गर्नुपर्ने दायित्व भएको अधिकारी",
    adjudicatingOfficer: "एक तह माथिको अधिकृत",
    penaltyFine: "तीन हजार रुपैयाँसम्म (रु. ३,०००) जरिवाना",
    fineAmountMax: 3000,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p8",
    offense: "ऐन र नियमावलीका अन्य नियम तथा आदेशहरूको उल्लङ्घन गर्ने",
    legalSection: "ऐनको दफा ५७(१)(छ)",
    penalizedPerson: "उल्लङ्घनकर्ता कर्मचारी",
    adjudicatingOfficer: "एक तह माथिको अधिकारी",
    penaltyFine: "पाँच हजार रुपैयाँसम्म (रु. ५,०००) जरिवाना",
    fineAmountMax: 5000,
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र पुनरावेदन"
  },
  {
    id: "p9",
    offense: "बैंकले सरकारी सञ्चित कोषमा राजस्व दाखिला गर्न ३ दिनभन्दा बढी ढिलो गरेमा",
    legalSection: "ऐनको दफा २७(४)",
    penalizedPerson: "सम्बन्धित बैंक",
    adjudicatingOfficer: "महालेखा नियन्त्रक कार्यालय (मलेनिका)",
    penaltyFine: "जम्मा गर्न बाँकी रकमको १०% का दरले जरिवाना र इजाजतपत्र रद्द सम्मको कारबाही सिफारिस",
    disciplinaryAction: false,
    remedyAppeal: "नेपाल राष्ट्र बैंक / अर्थ मन्त्रालयमा उजुरी"
  },
  {
    id: "p10",
    offense: "म्यादभित्र पेश्की फस्यौट नगरेमा",
    legalSection: "नियमावलीको नियम ५०(२) र नियम ५१(१)",
    penalizedPerson: "पेश्की लिने व्यक्ति, फर्म वा कर्मचारी",
    adjudicatingOfficer: "कार्यालय प्रमुख / लेखा प्रमुख",
    penaltyFine: "म्याद नाघेको मितिदेखि वार्षिक १०% (दश प्रतिशत) ब्याज सहित साँवा असुल, मासिक तलब रोक्का",
    disciplinaryAction: true,
    remedyAppeal: "१५ दिनभित्र कार्यालय प्रमुख समक्ष म्याद थपको निवेदन"
  },
  {
    id: "p11",
    offense: "कार्यसम्पादन करार बमोजिम ५० भन्दा कम अङ्क प्राप्त गरेमा",
    legalSection: "ऐनको दफा ५७(४) र नियमावलीको नियम ३१(५)",
    penalizedPerson: "आयोजना प्रमुख वा कार्यालय प्रमुख",
    adjudicatingOfficer: "सचिव / मन्त्री",
    penaltyFine: "विभागीय कारबाही",
    disciplinaryAction: true,
    remedyAppeal: "लोक सेवा आयोग / पुनरावेदन अदालत"
  },
  {
    id: "p12",
    offense: "तोकिएको समयभित्र बजेट समर्पण (Surrender) नगरेमा",
    legalSection: "ऐनको दफा ५७(३)",
    penalizedPerson: "लेखा उत्तरदायी अधिकृत तथा सम्बन्धित कर्मचारी",
    adjudicatingOfficer: "अर्थ मन्त्रालय / नेपाल सरकार",
    penaltyFine: "विभागीय कारबाही",
    disciplinaryAction: true,
    remedyAppeal: "मन्त्रिपरिषद्मा पुनरावलोकन"
  }
];
