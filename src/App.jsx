import { useState, useMemo, useCallback, useRef, useEffect } from "react";

/* ═══ LANG ═══ */
const S={en:{
tag:"the real cost, before you sign",heroS:"Total Cost Architecture",heroH:"Every cost.",heroH2:"No fiction.",heroP:"Fill what you know. We reveal what nobody tells you — including how this home fits your actual life.",
s_prop:"Property",s_fin:"Financing",s_int:"Interiors",s_life:"Your Life",s_govt:"Government",s_rec:"Recurring",s_up:"Upfront & Hidden",
req:"Required",done:"Done",edit:"Edit",
state:"State",city:"City / Zone",circle:"Circle rate",agr:"Agreement Value (Rs)",
sba:"Super Built-Up Area (sqft)",sbaH:"As quoted by builder — includes common areas",loadF:"Loading Factor %",loadFH:"Typically 25-40%. Common areas, corridors, amenities",carpetCalc:"Carpet Area (livable)",
gender:"Buyer Gender",male:"Male",female:"Female",joint:"Joint",
txn:"Transaction",txnNew:"New (Builder)",txnRe:"Resale",
purp:"Why are you buying?",purpFirst:"First Home",purpInvest:"Investment",purpRental:"Rental Income",purpTax:"Tax Savings",purpCG:"Capital Gains",
cgAmt:"Capital Gain Amount (Rs)",cgAmtH:"Must reinvest within 2 years (Section 54/54F)",
cs:"Construction Status",csU:"Under Construction",csR:"Ready to Move",
poss:"Months to Possession",rentQ:"Currently renting?",yes:"Yes",no:"No",moRent:"Monthly Rent (Rs)",
age:"Property Age",brok:"Brokerage %",socTx:"Society Transfer (Rs)",
cash:"Cash Component (Rs)",cashH:"Off-books. We advise zero.",cashW:"When paid?",
atBook:"At Booking",atReg:"At Registration",atPoss:"At Possession",cashReal:"Cash handling reality",
transform:"See the Truth",transformS:"Every rupee. Every year. Your real life.",
loan:"Loan Amount (Rs)",rate:"Interest Rate %",ten:"Tenure (years)",compR:"Comparable Rent",compRH:"Buy vs Rent",invR:"Investment Return %",invRH:"Nifty50 ~12%",
handover:"Handover",condition:"Condition",bare:"Bare Shell",semi:"Semi-Furnished",full:"Fully Furnished",ready:"Move-in Ready",cosmetic:"Refresh",reno:"Major Reno",quality:"Interior Quality",
parking:"Parking",covered:"Covered",open:"Open",incl:"Included",noInt:"No interior budget needed.",
income:"Annual Household Income (Rs)",incomeH:"Both partners, pre-tax",takeHome:"Monthly Take-home (Rs)",takeHomeH:"Post-tax, in-hand",
savings:"Savings Beyond Down Payment (Rs)",savingsH:"Liquid cash after all upfront costs",
incPct:"Annual Increment %",switchFreq:"Job Switch Every",switchBump:"Switch Bump %",sw3:"3 years",sw5:"5 years",swNone:"None",
lifeEvt:"Life Events (next 10 years)",
evtMarriage:"Marriage",evtChild1:"First Child",evtChild2:"Second Child",evtEdu:"Higher Education",evtParents:"Dependents 60+",evtWhen:"In how many years?",
invLump:"Lump Sum Investments",invLumpH:"FD, ELSS, Gold — amount + maturity year",
invMo:"Monthly Investments",invMoH:"SIP, PPF, NPS — monthly amount + years",
invEpf:"EPF (Provident Fund)",epfBal:"Current EPF Balance (Rs)",epfMo:"Monthly Contribution (your share, Rs)",epfYrs:"Years of Membership",epfUse:"Use EPF for home purchase?",epfWithdrawable:"Withdrawable (90% after 3yr)",
invAdd:"+ Add",
tB:"Breakdown",tF:"Your Finances",tT:"Timeline",tR:"Buy vs Rent",tI:"Intelligence",
obP:"This is your cost pyramid — every rupee sorted by weight. Tap any layer for the breakdown. Explore tabs below for deeper analysis.",
obProp:"The registered sale deed price — what the builder quotes. The starting point, not the finish line.",
obGovt:"Stamp duty, registration, GST, TDS, legal. Non-negotiable. Varies by state, gender, city.",
obFin:"Total interest over the full tenure + loan processing + pre-EMI. The bank's profit from your purchase.",
obInt:"Interior fit-out, renovation, moving, utilities, club. Making concrete livable.",
obRec:"Maintenance, property tax, insurance — compounded over tenure. Small monthly numbers, large totals.",
obUp:"Down payment, deposits, parking, brokerage, loan fees, cash component. Money due before or at handover.",
obTabs:"Explore the tabs for insights tailored to your income, life, and purpose.",
qD1:"Day-1 Cash",qMo:"Monthly",
dAgr:"Agreement Value",dPsf:"Per sqft (super built-up)",dPsfC:"Per sqft (carpet — livable)",dLoc:"Location",
dStamp:"Stamp Duty",dReg:"Registration",dCess:"Cess",dGst:"GST",dTds:"TDS",dLegal:"Legal + Docs",
dEmi:"Monthly EMI",dTotInt:"Total Interest",dLoanFee:"Loan Fees",dPreEmi:"Pre-EMI Interest",dRentOv:"Rent During Construction",
dInt:"Interior",dReno:"Renovation",dMovEtc:"Moving + Utilities + Club",
dMaintMo:"Maintenance / mo",dTaxYr:"Property Tax / yr",dInsYr:"Insurance / yr",dYrTot:"yr total",
dDP:"Down Payment",dMaintDep:"Maint Deposit",dCorpus:"Corpus",dBrok:"Brokerage",dSocTx:"Society Transfer",dCash:"CASH",dHandling:"Handling Fee",dCashTotal:"Total Cash Burden",
fEmiRatio:"EMI / Income",fPriceInc:"Price / Income",fEmergency:"Emergency Fund",fMonthsLabel:"months expenses",
ins:"Deep Insights",interest:"Interest",principal:"Principal",
tlWho:"Who pays what, when",tlAmort:"Loan Amortization",
tlBook:"Booking",tlBook10:"Booking ~10%",tlLoanFee:"Loan fee",tlReg:"Registration",tlDP:"Down payment",tlStampLeg:"Stamp+Reg+Legal",tlCashFee:"Cash+handling",
tlConst:"Construction",tlPreEmi:"Pre-EMI",tlYourRent:"Your rent",tlBankDisb:"Bank disburses",tlPoss:"Possession",tlSocDep:"Society+utilities",
tlEmiPd:"EMI Period",tlTotalEmi:"Total EMIs",tlBankInt:"Bank interest",
tlY1:"Year 1: {pct}% of EMI is bank profit. Flips at ~Year {flip}.",
brT:"Buy vs Rent — {ten} years",brIf:"Rent {rent}, invest at {inv}%:",
brInv:"Investment corpus",brP4:"Property @ 4%",brP7:"Property @ 7%",brTR:"Total rent",
brV1:"Math favours renting",brV2:"Close call",brV3:"Buying favourable",brOpp:"Opportunity cost",
itT:"Market Intelligence",itFree:"Free Preview",itFreeD:"2 AI insights",itBtn:"Get Insights",itLoad:"Searching...",itMkt:"Market Direction",itTrend:"Price Trend",itTip:"Tip",itSrc:"Sources",
prT:"Premium Intelligence",prH:"The full picture. One PDF.",prH2:"Built for your exact situation.",
prD:"Deep analyses: income, career, life events, investments, purpose.",
prBtn:"Join Waitlist — Free for first 500",prOk:"On the list.",prOkD:"We'll notify you.",
foot:"2025-26 rates. Reference only.",
},hi:{
tag:"सच्ची लागत, साइन से पहले",heroS:"कुल लागत का सच",heroH:"हर खर्चा।",heroH2:"बिना झूठ।",heroP:"जो जानते हो भरो। बाकी हम बताएंगे।",
s_prop:"प्रॉपर्टी",s_fin:"लोन और ब्याज",s_int:"इंटीरियर",s_life:"आपकी ज़िंदगी",s_govt:"सरकारी",s_rec:"हर महीने/साल",s_up:"जेब से + छिपे",
req:"ज़रूरी",done:"हो गया",edit:"बदलो",
state:"राज्य",city:"शहर",circle:"सर्किल रेट",agr:"डील कीमत (Rs)",
sba:"सुपर बिल्ट-अप एरिया (sqft)",sbaH:"बिल्डर जो बोलता है — कॉमन एरिया शामिल",loadF:"लोडिंग फैक्टर %",loadFH:"आमतौर पर 25-40%",carpetCalc:"कार्पेट एरिया (रहने लायक)",
gender:"खरीदार",male:"पुरुष",female:"महिला",joint:"दोनों",
txn:"खरीदारी",txnNew:"नया (बिल्डर)",txnRe:"रीसेल",
purp:"घर क्यों खरीद रहे हो?",purpFirst:"पहला घर",purpInvest:"निवेश",purpRental:"किराये की आमदनी",purpTax:"टैक्स बचत",purpCG:"कैपिटल गेन",
cgAmt:"कैपिटल गेन (Rs)",cgAmtH:"2 साल में लगाना है (Section 54/54F)",
cs:"हालत",csU:"बन रहा",csR:"बना हुआ",
poss:"पज़ेशन कब?",rentQ:"किराये पर?",yes:"हां",no:"नहीं",moRent:"किराया (Rs)",
age:"कितनी पुरानी?",brok:"दलाली %",socTx:"सोसाइटी ट्रांसफर (Rs)",
cash:"कैश (Rs)",cashH:"बिना रसीद। सलाह: ज़ीरो।",cashW:"कब?",
atBook:"बुकिंग",atReg:"रजिस्ट्री",atPoss:"पज़ेशन",cashReal:"कैश असलियत",
transform:"सच दिखाओ",transformS:"हर रुपया। हर साल।",
loan:"लोन (Rs)",rate:"ब्याज %",ten:"कितने साल",compR:"किराया",compRH:"किराया vs खरीद",invR:"निवेश रिटर्न %",invRH:"Nifty50 ~12%",
handover:"बिल्डर दे रहा",condition:"हालत",bare:"खाली",semi:"आधा तैयार",full:"पूरा तैयार",ready:"रहने लायक",cosmetic:"हल्का काम",reno:"पूरा तोड़-जोड़",quality:"इंटीरियर लेवल",
parking:"पार्किंग",covered:"ढकी",open:"खुली",incl:"शामिल",noInt:"इंटीरियर नहीं चाहिए।",
income:"सालाना आय (Rs)",incomeH:"दोनों, टैक्स पहले",takeHome:"मासिक हाथ में (Rs)",takeHomeH:"टैक्स बाद",
savings:"डाउन पेमेंट के बाद बचत (Rs)",savingsH:"लिक्विड",
incPct:"सालाना बढ़त %",switchFreq:"जॉब स्विच हर",switchBump:"स्विच बढ़त %",sw3:"3 साल",sw5:"5 साल",swNone:"नहीं",
lifeEvt:"ज़िंदगी की घटनाएं (10 साल)",
evtMarriage:"शादी",evtChild1:"पहला बच्चा",evtChild2:"दूसरा बच्चा",evtEdu:"उच्च शिक्षा",evtParents:"60+ आश्रित",evtWhen:"कितने साल में?",
invLump:"एकमुश्त निवेश",invLumpH:"FD, ELSS, सोना — राशि + कब लिक्विड",
invMo:"मासिक निवेश",invMoH:"SIP, PPF, NPS — मासिक + कितने साल",
invEpf:"EPF (प्रॉविडेंट फंड)",epfBal:"EPF बैलेंस (Rs)",epfMo:"मासिक योगदान (आपका हिस्सा, Rs)",epfYrs:"सदस्यता कितने साल",epfUse:"घर खरीदने में EPF लगाओगे?",epfWithdrawable:"निकाल सकते हो (90%)",
invAdd:"+ जोड़ो",
tB:"पूरा हिसाब",tF:"माली हालत",tT:"कब क्या",tR:"किराया या खरीद?",tI:"AI इंटेलिजेंस",
obP:"ये खर्चे का पिरामिड है। किसी लेयर पर टैप करो — हिसाब खुलेगा। नीचे टैब्स में गहरी इनसाइट्स।",
obProp:"रजिस्ट्री वाली कीमत। शुरुआत है, अंत नहीं।",obGovt:"स्टांप, रजिस्ट्रेशन, GST, TDS, वकील।",obFin:"कुल ब्याज + प्रोसेसिंग + प्री-EMI। बैंक का मुनाफा।",obInt:"इंटीरियर, शिफ्टिंग, बिजली-पानी।",obRec:"मेंटेनेंस, टैक्स, बीमा — पूरे लोन में।",obUp:"डाउन पेमेंट, जमा, पार्किंग, दलाली, कैश।",
obTabs:"नीचे टैब्स में — आय, ज़िंदगी, मकसद के हिसाब से इनसाइट्स।",
qD1:"पहले दिन",qMo:"हर महीना",
dAgr:"कीमत",dPsf:"प्रति sqft (सुपर)",dPsfC:"प्रति sqft (कार्पेट)",dLoc:"जगह",
dStamp:"स्टांप ड्यूटी",dReg:"रजिस्ट्रेशन",dCess:"सेस",dGst:"GST",dTds:"TDS",dLegal:"वकील",
dEmi:"EMI",dTotInt:"कुल ब्याज",dLoanFee:"लोन फीस",dPreEmi:"प्री-EMI",dRentOv:"किराया (बनने तक)",
dInt:"इंटीरियर",dReno:"मरम्मत",dMovEtc:"शिफ्टिंग+बिजली+क्लब",
dMaintMo:"मेंटेनेंस/मो",dTaxYr:"टैक्स/साल",dInsYr:"बीमा/साल",dYrTot:"साल कुल",
dDP:"डाउन पेमेंट",dMaintDep:"मेंटेनेंस जमा",dCorpus:"कॉर्पस",dBrok:"दलाली",dSocTx:"ट्रांसफर",dCash:"कैश",dHandling:"जुगाड़ फीस",dCashTotal:"कुल कैश",
fEmiRatio:"EMI/आय",fPriceInc:"कीमत/आय",fEmergency:"इमरजेंसी फंड",fMonthsLabel:"महीने",
ins:"गहरी इनसाइट्स",interest:"ब्याज",principal:"मूलधन",
tlWho:"कौन क्या कब",tlAmort:"लोन — ब्याज vs मूलधन",
tlBook:"बुकिंग",tlBook10:"बुकिंग ~10%",tlLoanFee:"लोन फीस",tlReg:"रजिस्ट्री",tlDP:"डाउन पेमेंट",tlStampLeg:"स्टांप+रजिस्ट्री+वकील",tlCashFee:"कैश+जुगाड़",
tlConst:"कंस्ट्रक्शन",tlPreEmi:"प्री-EMI",tlYourRent:"किराया",tlBankDisb:"बैंक देगा",tlPoss:"पज़ेशन",tlSocDep:"सोसाइटी+बिजली",
tlEmiPd:"EMI दौर",tlTotalEmi:"कुल EMI",tlBankInt:"बैंक ब्याज",
tlY1:"पहला साल: EMI का {pct}% बैंक का। ~साल {flip} में पलटेगा।",
brT:"किराया या खरीद — {ten} साल",brIf:"किराया {rent}, बचत {inv}% पर:",
brInv:"निवेश कॉर्पस",brP4:"प्रॉपर्टी @4%",brP7:"प्रॉपर्टी @7%",brTR:"कुल किराया",
brV1:"किराया+निवेश बेहतर",brV2:"बराबरी",brV3:"खरीदना फायदे में",brOpp:"ऑपर्च्युनिटी कॉस्ट",
itT:"मार्केट इंटेलिजेंस",itFree:"मुफ्त झलक",itFreeD:"2 AI इनसाइट्स",itBtn:"इनसाइट्स लाओ",itLoad:"खोज रहे हैं...",itMkt:"मार्केट दिशा",itTrend:"दाम रुख",itTip:"सलाह",itSrc:"स्रोत",
prT:"प्रीमियम",prH:"पूरी तस्वीर। एक PDF।",prH2:"आपकी ज़िंदगी के हिसाब से।",
prD:"गहरे विश्लेषण — आय, करियर, ज़िंदगी, निवेश, मकसद।",
prBtn:"वेटलिस्ट — पहले 500 मुफ्त",prOk:"लिस्ट में।",prOkD:"लॉन्च पर बताएंगे।",
foot:"2025-26 दरें। सिर्फ़ जानकारी।",
}};

/* ═══ DATA ═══ */
const SD={telangana:{l:"Telangana",c:{hy_u:{l:"Hyderabad (GHMC)",m:4.5,pt:.0015,cr:[4500,12e3]},hy_s:{l:"Hyderabad (Suburbs)",m:3.5,pt:.0012,cr:[3e3,7e3]},war:{l:"Warangal",m:2.5,pt:.001,cr:[2e3,4500]}},st:{male:.06,female:.06,joint:.06},rg:.005,rc:null,ms:.005},maharashtra:{l:"Maharashtra",c:{mum:{l:"Mumbai / MMR",m:6,pt:.002,cr:[8e3,5e4]},pun:{l:"Pune / PCMC",m:4.5,pt:.0015,cr:[4e3,12e3]},tha:{l:"Thane / Navi Mumbai",m:5,pt:.0018,cr:[5e3,15e3]},nag:{l:"Nagpur / Nashik",m:3,pt:.0012,cr:[2500,6e3]}},st:{male:.06,female:.05,joint:.06},rg:.01,rc:3e4,lb:.01},karnataka:{l:"Karnataka",c:{blr:{l:"Bengaluru (BBMP)",m:5,pt:.0018,cr:[4500,14e3]},bda:{l:"Bengaluru (Outskirts)",m:3.5,pt:.0014,cr:[3e3,8e3]},mys:{l:"Mysuru / Hubli",m:2.5,pt:.001,cr:[2e3,5e3]}},st:{male:.056,female:.042,joint:.05},rg:.01,rc:null,cs:.1},delhi:{l:"Delhi NCR",c:{dls:{l:"South Delhi",m:6,pt:.002,cr:[1e4,8e4]},dlo:{l:"East/West/North",m:4,pt:.0018,cr:[5e3,2e4]},noi:{l:"Noida / Gr. Noida",m:4,pt:.0015,cr:[3500,9e3]},gur:{l:"Gurgaon",m:5,pt:.0015,cr:[4500,14e3]}},st:{male:.06,female:.04,joint:.05},rg:.01,rc:null},tamilnadu:{l:"Tamil Nadu",c:{che:{l:"Chennai",m:4.5,pt:.0015,cr:[4e3,15e3]},cbe:{l:"Coimbatore",m:3,pt:.001,cr:[2500,6e3]}},st:{male:.07,female:.07,joint:.07},rg:.04,rc:null}};
const INTR=[{v:0,l:"Not needed"},{v:400,l:"Rs 400/sqft"},{v:1400,l:"Rs 1,400/sqft"},{v:2400,l:"Rs 2,400/sqft"},{v:3800,l:"Rs 3,800/sqft"}];

const f$=n=>{if(!n||isNaN(n))return "0";if(n>=1e7)return (n/1e7).toFixed(2)+" Cr";if(n>=1e5)return (n/1e5).toFixed(1)+" L";return Math.round(n).toLocaleString("en-IN")};
const fF=n=>"Rs "+Math.round(n||0).toLocaleString("en-IN");
const fM=n=>"Rs "+Math.round(n||0).toLocaleString("en-IN")+"/mo";
function calcEMI(p,r,y){if(!p||p<=0)return 0;const ri=r/100/12,n=y*12;if(ri===0)return p/n;return(p*ri*Math.pow(1+ri,n))/(Math.pow(1+ri,n)-1)}
function cashFn(a){if(a<=0)return 0;if(a<=1e6)return a*.02;if(a<=2e6)return a*.03;if(a<=5e6)return a*.04;return a*.05}
function cashPc(a){if(a<=0)return 0;if(a<=1e6)return 2;if(a<=2e6)return 3;if(a<=5e6)return 4;return 5}
function monthlyFV(pmt,annualRate,years){if(!pmt||!years)return 0;const r=annualRate/100/12,n=years*12;if(r===0)return pmt*n;return pmt*((Math.pow(1+r,n)-1)/r)}
function childCost(yr){const inf=Math.pow(1.1,yr);if(yr===0)return 150000+10000*12*inf;if(yr<=2)return 12000*12*inf;if(yr===3)return 50000+8000*12*inf;if(yr<=5)return 10000*12*inf;if(yr===6)return 150000+12000*12*inf;if(yr<=14)return 15000*12*inf;if(yr===15)return 100000+30000*12*inf;if(yr<=17)return 25000*12*inf;if(yr===18)return 300000+25000*12*inf;return 0}
function seniorCost(yr){return 75000*Math.pow(1.15,yr)+(yr<5?30000:yr<10?50000:yr<15?80000:120000)}

/* ═══ APP ═══ */
export default function App(){
  const[lang,setLang]=useState("en");
  const t=useCallback((k,vars)=>{let s=S[lang]?.[k]||S.en[k]||k;if(vars)Object.entries(vars).forEach(([a,b])=>{s=s.replaceAll("{"+a+"}",b)});return s},[lang]);
  const hiF=lang==="hi"?"'Noto Sans Devanagari','Inter',sans-serif":"'Inter',sans-serif";

  // Property
  const[st,setSt]=useState("telangana");const[city,setCity]=useState("hy_u");
  const[purpose,setPurpose]=useState("first");const[cgAmt,setCgAmt]=useState(0);
  const[bp,setBP]=useState(8e6);const[sba,setSBA]=useState(1200);const[loadF,setLoadF]=useState(30);
  const[gender,setG]=useState("male");const[txn,setTxn]=useState("new");const[cst,setCst]=useState("under");
  const[poss,setPoss]=useState(30);const[renting,setRenting]=useState(true);const[curRent,setCurRent]=useState(25e3);
  const[propAge,setPropAge]=useState("0-5");const[furnish,setFurnish]=useState("bare");
  const[intRate,setIntRate]=useState(2400);const[la,setLA]=useState(6e6);
  const[rate,setRate]=useState(8.5);const[tenure,setTen]=useState(20);
  const[parking,setPk]=useState("covered");const[stf,setSTF]=useState(5e4);const[bkr,setBk]=useState(1);
  const[cashAmt,setCashAmt]=useState(0);const[cashWhen,setCashWhen]=useState("booking");
  const[invRet,setInvRet]=useState(12);
  // Life
  const[annualInc,setAnnualInc]=useState(1800000);const[monthlyTH,setMonthlyTH]=useState(125000);
  const[savBeyond,setSavBeyond]=useState(500000);
  const[incPct,setIncPct]=useState(10);const[switchFreq,setSwitchFreq]=useState(5);const[switchBump,setSwitchBump]=useState(30);
  const[lifeEvts,setLifeEvts]=useState({});
  // Investments
  const[lumpInv,setLumpInv]=useState([]); // [{type,amount,year}]
  const[moInv,setMoInv]=useState([]);     // [{type,monthly,years,rate}]
  const[epfBal,setEpfBal]=useState(0);const[epfMo,setEpfMo]=useState(0);const[epfYrs,setEpfYrs]=useState(0);const[epfUse,setEpfUse]=useState(false);

  const[open,setOpen]=useState(null);const[done,setDone]=useState(new Set());
  const[phase,setPhase]=useState("input");const[tab,setTab]=useState("pyramid");const[detailIdx,setDetailIdx]=useState(null);
  const[aiData,setAiData]=useState(null);const[aiLoading,setAiLoading]=useState(false);const[aiErr,setAiErr]=useState(null);
  const[wlEmail,setWlEmail]=useState("");const[wlPin,setWlPin]=useState("");const[wlSent,setWlSent]=useState(false);
  const pyrRef=useRef(null);

  useEffect(()=>{const cs=Object.keys(SD[st].c);if(!cs.includes(city))setCity(cs[0])},[st]);
  const sI=SD[st],cI=sI?.c[city];
  const ca=Math.round(sba*(1-loadF/100)); // carpet area from SBA
  const mark=useCallback(id=>{setDone(p=>{const n=new Set(p);n.add(id);return n});setOpen(null)},[]);
  const allDone=done.has("property")&&done.has("financing")&&done.has("interiors")&&done.has("life");
  const toggleEvt=(k)=>{setLifeEvts(p=>{const n={...p};if(n[k]!==undefined)delete n[k];else n[k]=2;return n})};
  const setEvtYr=(k,yr)=>{setLifeEvts(p=>({...p,[k]:yr}))};

  const epfWithdrawable=epfYrs>=3?Math.round(epfBal*.9):0;

  const fetchAI=useCallback(async()=>{
    setAiLoading(true);setAiErr(null);
    try{const r=await fetch("/api/intel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:sI.l,city:cI?.l,basePrice:bp,carpet:ca})});const j=await r.json();if(!r.ok||j.error)throw new Error((j.error||"HTTP "+r.status)+(j.debug?"\n"+j.debug.join("\n"):""));setAiData(j)}catch(e){setAiErr(e.message)}finally{setAiLoading(false)}
  },[st,city,sI,cI,bp,ca]);

  /* ═══ CALC ═══ */
  const R=useMemo(()=>{
    if(!cI)return null;
    const isUC=txn==="new"&&cst==="under",isRe=txn==="resale";
    let sr=gender==="joint"?(sI.st.joint||sI.st.male):(sI.st[gender]||sI.st.male);
    if(st==="telangana"&&(city==="hy_u"||city==="hy_s"))sr+=sI.ms||0;
    if(st==="maharashtra"&&city==="mum")sr+=sI.lb||0;
    const sd=bp*sr;let rg=bp*sI.rg;if(sI.rc)rg=Math.min(rg,sI.rc);
    let sur=0;if(st==="karnataka"&&sI.cs)sur=sd*sI.cs;
    let gst=0;if(isUC)gst=bp*((bp<=45e5&&ca<=645)?.01:.05);
    const tds=bp>=5e6?bp*.01:0;const leg=Math.max(15e3,Math.min(bp*.003,5e4));const doc=5e3;
    const govT=sd+rg+sur+gst+leg+doc;
    const brk=isRe?bp*(bkr/100):0;const stfV=isRe?stf:0;
    const lp=la*.005,cer=500,ld=la>2e6?8e3:3e3,lc=lp+cer+ld;
    const effI=(furnish==="full"||furnish==="ready")?0:intRate;
    const inter=ca*effI,mov=15e3,ud=25e3,club=25e3,moveIn=inter+mov+ud+club; // interiors on CARPET
    const mm=sba*(cI.m||3); // maintenance on SBA
    const md=mm*24,corp=Math.max(5e4,bp*.005);
    let pkC=0;if(parking==="covered")pkC=st==="maharashtra"?5e5:3e5;if(parking==="open")pkC=st==="maharashtra"?25e4:15e4;
    const apt=bp*(cI.pt||.001),aIns=Math.max(3e3,bp*5e-4),aMnt=mm*12,aR=apt+aIns+aMnt;
    const e=calcEMI(la,rate,tenure),tRep=e*tenure*12,tInt=tRep-la;
    let preE=0,rOv=0;if(isUC){preE=(la*.5)*(rate/100/12)*poss;if(renting)rOv=curRent*poss}
    let ren=0;if(isRe&&furnish==="reno"){const rr={"0-5":200,"5-10":500,"10-20":900,"20+":1300};ren=ca*(rr[propAge]||400)}
    const cFe=cashFn(cashAmt),cPc=cashPc(cashAmt),tCash=cashAmt+cFe;
    const dp=bp-la;const upV=dp+md+corp+pkC+brk+stfV+lc+tCash;
    const tProj=bp+govT+tInt+moveIn+lc+preE+rOv+ren+(aR*tenure)+md+corp+pkC+brk+stfV+tCash;
    const mul=tProj/bp;
    const d1=dp+govT+moveIn+md+corp+pkC+brk+stfV+lc+preE+ren+tCash;
    const psfSuper=sba>0?Math.round(bp/sba):0;const psfCarpet=ca>0?Math.round(bp/ca):0;

    const emiRatio=monthlyTH>0?((e+aR/12)/monthlyTH*100):0;
    const housingMo=e+aR/12;
    const priceToInc=annualInc>0?(bp/annualInc):0;
    const moExp=monthlyTH*.6;const emergencyMo=moExp>0?(savBeyond/moExp):0;
    const comfPrice=annualInc*5;

    function projIncome(yr){let inc=monthlyTH*12;for(let y=1;y<=yr;y++){if(switchFreq>0&&y%switchFreq===0)inc*=(1+switchBump/100);else inc*=(1+incPct/100)}return inc}

    // Collision with continuous life costs + investments
    const collision=[];
    for(let yr=1;yr<=Math.min(tenure,20);yr++){
      const housing=(e*12)+aR;
      let lifeTotal=0;
      Object.entries(lifeEvts).forEach(([key,startYr])=>{
        const evtAge=yr-startYr;if(evtAge<0)return;
        if(key==="marriage"&&evtAge===0)lifeTotal+=1000000;
        if(key==="child1"||key==="child2")lifeTotal+=childCost(evtAge);
        if(key==="edu"){if(evtAge===0)lifeTotal+=300000+25000*12;else if(evtAge<=3)lifeTotal+=30000*12*Math.pow(1.1,evtAge)}
        if(key==="parents")lifeTotal+=seniorCost(evtAge);
      });
      const pInc=projIncome(yr);
      // Investment maturities: lump sum by year, monthly by FV
      let invMat=lumpInv.filter(i=>i.year===yr).reduce((s,i)=>s+i.amount,0);
      moInv.forEach(mi=>{if(mi.years===yr)invMat+=monthlyFV(mi.monthly,mi.rate,mi.years)});
      if(epfUse&&yr===1)invMat+=epfWithdrawable;
      const totalOut=housing+lifeTotal;
      const pct=pInc>0?(totalOut/pInc*100):0;
      collision.push({yr,housing:Math.round(housing),life:Math.round(lifeTotal),total:Math.round(totalOut),income:Math.round(pInc),pct:Math.round(pct),invMat,isSwitch:switchFreq>0&&yr%switchFreq===0});
    }
    const peakYr=collision.length>0?collision.reduce((a,b)=>b.pct>a.pct?b:a,collision[0]):null;
    const dangerYears=collision.filter(y=>y.pct>60);

    const amort=[];let bal=la;
    for(let yr=1;yr<=Math.min(tenure,30);yr++){let yi=0,yp=0;for(let m=0;m<12;m++){const mi=bal*(rate/100/12),mp=e-mi;yi+=mi;yp+=Math.max(0,mp);bal=Math.max(0,bal-mp)}amort.push({yr,i:Math.round(yi),p:Math.round(yp)})}

    const fvL=d1*Math.pow(1+invRet/100,tenure);const moS=e+aR/12-curRent;
    let fvM=0;if(moS>0){const ri=invRet/100/12,n=tenure*12;fvM=moS*((Math.pow(1+ri,n)-1)/ri)}
    const pa4=bp*Math.pow(1.04,tenure),pa7=bp*Math.pow(1.07,tenure),tRentV=curRent*12*tenure*1.5,invT=fvL+Math.max(0,fvM);

    const obKeys={property:"obProp",government:"obGovt",financing:"obFin",interiors:"obInt",recurring:"obRec",upfront:"obUp"};
    const det={
      property:[{l:t("dAgr"),v:bp},{l:t("dPsf"),v:"Rs "+psfSuper.toLocaleString("en-IN")},{l:t("dPsfC"),v:"Rs "+psfCarpet.toLocaleString("en-IN"),w:true},{l:t("dLoc"),v:cI.l+", "+sI.l}],
      government:[{l:t("dStamp")+" ("+(sr*100).toFixed(1)+"%)",v:sd},{l:t("dReg"),v:rg},sur>0&&{l:t("dCess"),v:sur},gst>0&&{l:t("dGst"),v:gst},tds>0&&{l:t("dTds"),v:tds},{l:t("dLegal"),v:leg+doc}].filter(Boolean),
      financing:[{l:t("dEmi"),v:fM(e)},{l:t("dTotInt"),v:tInt,w:true},{l:t("dLoanFee"),v:lc},preE>0&&{l:t("dPreEmi"),v:preE,w:true},rOv>0&&{l:t("dRentOv"),v:rOv,w:true}].filter(Boolean),
      interiors:[inter>0&&{l:t("dInt")+" ("+ca+" sqft carpet)",v:inter},ren>0&&{l:t("dReno"),v:ren},{l:t("dMovEtc"),v:mov+ud+club}].filter(Boolean),
      recurring:[{l:t("dMaintMo")+" ("+sba+" sqft SBA)",v:fM(mm)},{l:t("dTaxYr"),v:apt},{l:t("dInsYr"),v:aIns},{l:tenure+t("dYrTot"),v:aR*tenure,b:true}],
      upfront:[{l:t("dDP"),v:dp},{l:t("dMaintDep"),v:md},{l:t("dCorpus"),v:corp},pkC>0&&{l:t("parking"),v:pkC},brk>0&&{l:t("dBrok"),v:brk},stfV>0&&{l:t("dSocTx"),v:stfV},{l:t("dLoanFee"),v:lc},cashAmt>0&&{l:t("dCash"),v:cashAmt,w:true,cash:true},cFe>0&&{l:t("dHandling")+" ~"+cPc+"%",v:cFe,w:true,cash:true},tCash>0&&{l:t("dCashTotal"),v:tCash,b:true,w:true,cash:true}].filter(Boolean),
    };
    const sorted=[
      {id:"property",label:t("s_prop"),val:bp,icon:"home"},
      {id:"government",label:t("s_govt"),val:govT,icon:"gavel"},
      {id:"financing",label:t("s_fin"),val:tInt+lc+preE,icon:"account_balance"},
      {id:"interiors",label:t("s_int"),val:moveIn+ren,icon:"design_services"},
      {id:"recurring",label:t("s_rec"),val:aR*tenure,icon:"autorenew"},
      {id:"upfront",label:tCash>0?t("s_up")+" + Cash":t("s_up"),val:upV,icon:"visibility"},
    ].sort((a,b)=>b.val-a.val);
    const pal=["#522de6","#6B4EFF","#ce2c66","#ac064e","#5e5b77","#787587"];
    sorted.forEach((s,i)=>{s.color=pal[i];s.pct=tProj>0?(s.val/tProj*100):0;s.ob=obKeys[s.id]});

    // EPF retirement trade-off
    const epfFV30=epfWithdrawable*Math.pow(1.0825,30); // what withdrawn EPF would be at 60

    return {sorted,det,tProj,mul,d1,e,aR,tInt,preE,rOv,mm,bp,dp,sr,cashAmt,cFe,cPc,tCash,govT,isUC,amort,fvL,invT,pa4,pa7,tRentV,la,moS,emiRatio,housingMo,priceToInc,emergencyMo,comfPrice,collision,peakYr,dangerYears,psfSuper,psfCarpet,epfFV30};
  },[bp,sba,loadF,ca,st,city,cI,sI,gender,txn,cst,poss,renting,curRent,propAge,furnish,intRate,la,rate,tenure,parking,stf,bkr,cashAmt,invRet,annualInc,monthlyTH,savBeyond,lifeEvts,lumpInv,moInv,epfBal,epfMo,epfYrs,epfUse,incPct,switchFreq,switchBump,purpose,t]);

  const doTransform=()=>{setPhase("results");setTab("pyramid");setTimeout(()=>pyrRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100)};
  const secs=[{id:"property",label:t("s_prop"),icon:"home",color:"#522de6"},{id:"financing",label:t("s_fin"),icon:"account_balance",color:"#5e5b77"},{id:"interiors",label:t("s_int"),icon:"design_services",color:"#ce2c66"},{id:"life",label:t("s_life"),icon:"favorite",color:"#0d9488"}];
  const EVT_OPTS=[{key:"marriage",label:t("evtMarriage")},{key:"child1",label:t("evtChild1")},{key:"child2",label:t("evtChild2")},{key:"edu",label:t("evtEdu")},{key:"parents",label:t("evtParents")}];
  const LUMP_TYPES=[{v:"fd",l:"FD"},{v:"elss",l:"ELSS"},{v:"other",l:lang==="hi"?"अन्य":"Other"}];
  const MO_TYPES=[{v:"sip",l:"SIP",r:12},{v:"ppf",l:"PPF",r:7.1},{v:"nps",l:"NPS",r:10}];

  return (
    <div style={{minHeight:"100vh",background:"#FAF9FD",color:"#1a1c1e",fontFamily:hiF,overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;700;900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes morphIn{from{opacity:0;transform:scaleY(.3)}to{opacity:1;transform:scaleY(1)}}@keyframes glowP{0%,100%{box-shadow:0 0 20px rgba(82,45,230,.15)}50%{box-shadow:0 0 40px rgba(82,45,230,.3)}}@keyframes cashP{0%,100%{opacity:.6}50%{opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}.anim{animation:fadeUp .4s ease both}.morph{animation:morphIn .6s cubic-bezier(.16,1,.3,1) both}.glow{animation:glowP 2s ease infinite}.cB{animation:cashP 1.5s ease infinite}.glass{background:rgba(250,249,253,.85);backdrop-filter:blur(24px)}.lift{box-shadow:0 20px 40px -12px rgba(98,95,123,.1)}.ghost{border:1px solid rgba(201,196,217,.25)}button{-webkit-tap-highlight-color:transparent}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}`}</style>

      <header className="glass" style={{position:"fixed",top:0,width:"100%",zIndex:50,borderBottom:"1px solid rgba(201,196,217,.15)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",maxWidth:520,margin:"0 auto"}}>
          <div><div style={{fontSize:"clamp(.82rem,3.5vw,.95rem)",fontWeight:900,letterSpacing:"-.04em",fontFamily:"'Plus Jakarta Sans'"}}><span style={{color:"#522de6"}}>un</span>-real-estate</div><div style={{fontSize:".44rem",color:"#787587"}}>{t("tag")}</div></div>
          <div style={{display:"flex",gap:4}}>
            {[{c:"en",l:"EN"},{c:"hi",l:"हि"}].map(x=> <button key={x.c} onClick={()=>setLang(x.c)} style={{padding:"4px 8px",borderRadius:6,border:lang===x.c?"1.5px solid #522de6":"1px solid #e3e2e6",background:lang===x.c?"#522de610":"#fff",color:lang===x.c?"#522de6":"#787587",fontSize:".62rem",fontWeight:800,cursor:"pointer"}}>{x.l}</button>)}
            {phase==="results"&&<button onClick={()=>{setPhase("input");setDetailIdx(null)}} style={{padding:"4px 10px",borderRadius:6,background:"#f4f3f7",fontSize:".62rem",fontWeight:700,color:"#787587",border:"none",cursor:"pointer"}}>{t("edit")}</button>}
          </div>
        </div>
      </header>

      <main style={{maxWidth:520,margin:"0 auto",padding:"60px 14px 80px"}}>

      {phase==="input"&&<div>
        <section className="anim" style={{marginBottom:24,paddingTop:10}}>
          <p style={{fontSize:".54rem",fontWeight:600,color:"#787587",letterSpacing:".12em",textTransform:"uppercase",marginBottom:3}}>{t("heroS")}</p>
          <h2 style={{fontSize:"clamp(1.5rem,5vw,2rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>{t("heroH")}<br/><span style={{color:"#522de6"}}>{t("heroH2")}</span></h2>
          <p style={{fontSize:".78rem",color:"#787587",marginTop:6,lineHeight:1.5}}>{t("heroP")}</p>
        </section>
        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:20}}>
          {secs.map(sec=>{const isO=open===sec.id,isD=done.has(sec.id);return (
            <div key={sec.id} className={isO?"lift":""} style={{borderRadius:14,overflow:"hidden",border:isO?`1.5px solid ${sec.color}30`:`1px solid ${isD?sec.color+"30":"#e3e2e6"}`,background:"#fff"}}>
              <button onClick={()=>setOpen(isO?null:sec.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:isD?`${sec.color}08`:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
                <div style={{width:32,height:32,borderRadius:8,background:isD?sec.color:`${sec.color}15`,display:"grid",placeItems:"center",flexShrink:0}}><span className="material-symbols-outlined" style={{fontSize:16,color:isD?"#fff":sec.color,fontVariationSettings:isD?"'FILL' 1":"'FILL' 0"}}>{sec.icon}</span></div>
                <div style={{flex:1}}><div style={{fontSize:".76rem",fontWeight:700,fontFamily:"'Plus Jakarta Sans'"}}>{sec.label}</div>{!isD&&<div style={{fontSize:".56rem",color:sec.color}}>{t("req")}</div>}</div>
                {isD&&<span className="material-symbols-outlined" style={{fontSize:16,color:sec.color,fontVariationSettings:"'FILL' 1"}}>check_circle</span>}
                <span className="material-symbols-outlined" style={{fontSize:16,color:"#787587",transform:isO?"rotate(180deg)":"",transition:"transform .2s"}}>expand_more</span>
              </button>
              {isO&&<div style={{padding:"0 14px 14px",animation:"fadeUp .2s ease"}}>
                {sec.id==="property"&&<div>
                  <PF l={t("purp")}><PTog o={[{v:"first",l:t("purpFirst")},{v:"invest",l:t("purpInvest")},{v:"rental",l:t("purpRental")},{v:"tax",l:t("purpTax")},{v:"cg",l:t("purpCG")}]} v={purpose} set={setPurpose}/></PF>
                  {purpose==="cg"&&<PF l={t("cgAmt")} h={t("cgAmtH")}><PNum v={cgAmt} set={setCgAmt}/></PF>}
                  <PF l={t("state")}><PSel v={st} set={e=>setSt(e.target.value)} o={Object.entries(SD).map(([k,v])=>({v:k,l:v.l}))}/></PF>
                  <PF l={t("city")}><PSel v={city} set={e=>setCity(e.target.value)} o={Object.entries(sI.c).map(([k,v])=>({v:k,l:v.l}))}/></PF>
                  {cI&&<Chip>{t("circle")}: Rs {cI.cr[0].toLocaleString("en-IN")} - {cI.cr[1].toLocaleString("en-IN")}/sqft</Chip>}
                  <PF l={t("agr")}><PNum v={bp} set={setBP}/></PF>
                  <PF l={t("sba")} h={t("sbaH")}><PNum v={sba} set={setSBA}/></PF>
                  <PF l={t("loadF")} h={t("loadFH")}><PNum v={loadF} set={setLoadF}/></PF>
                  <Chip accent>{t("carpetCalc")}: <strong>{ca} sqft</strong> | Rs {(ca>0?Math.round(bp/ca):0).toLocaleString("en-IN")}/sqft {lang==="hi"?"(असली कीमत)":"(effective)"}</Chip>
                  <PF l={t("gender")}><PTog o={[{v:"male",l:t("male")},{v:"female",l:t("female")},{v:"joint",l:t("joint")}]} v={gender} set={setG}/></PF>
                  <PF l={t("txn")}><PTog o={[{v:"new",l:t("txnNew")},{v:"resale",l:t("txnRe")}]} v={txn} set={setTxn}/></PF>
                  {txn==="new"&&<PF l={t("cs")}><PTog o={[{v:"under",l:t("csU")},{v:"ready",l:t("csR")}]} v={cst} set={setCst}/></PF>}
                  {txn==="new"&&cst==="under"&&<><PF l={t("poss")}><PNum v={poss} set={setPoss}/></PF><PF l={t("rentQ")}><PTog o={[{v:true,l:t("yes")},{v:false,l:t("no")}]} v={renting} set={setRenting}/></PF>{renting&&<PF l={t("moRent")}><PNum v={curRent} set={setCurRent}/></PF>}</>}
                  {txn==="resale"&&<><PF l={t("age")}><PTog o={[{v:"0-5",l:"0-5"},{v:"5-10",l:"5-10"},{v:"10-20",l:"10-20"},{v:"20+",l:"20+"}]} v={propAge} set={setPropAge}/></PF><PF l={t("brok")}><PNum v={bkr} set={setBk}/></PF><PF l={t("socTx")}><PNum v={stf} set={setSTF}/></PF></>}
                  <div style={{marginTop:10,padding:12,borderRadius:12,background:cashAmt>0?"#ba1a1a08":"#f4f3f7",border:cashAmt>0?"1px solid #ba1a1a20":"1px solid #e3e2e6"}}><PF l={t("cash")} h={t("cashH")}><PNum v={cashAmt} set={setCashAmt}/></PF>{cashAmt>0&&<><PF l={t("cashW")}><PTog o={[{v:"booking",l:t("atBook")},{v:"registration",l:t("atReg")},{v:"possession",l:t("atPoss")}]} v={cashWhen} set={setCashWhen}/></PF><div style={{padding:"8px 10px",borderRadius:8,background:"#ba1a1a0d",fontSize:".64rem",color:"#474556",lineHeight:1.5}}><strong style={{color:"#ba1a1a"}}>{t("cashReal")}:</strong> ~{cashPc(cashAmt)}% = Rs {f$(cashFn(cashAmt))} | <strong style={{color:"#ba1a1a"}}>Rs {f$(cashAmt+cashFn(cashAmt))}</strong></div></>}</div>
                  <DB color={sec.color} onClick={()=>mark("property")}/>
                </div>}

                {sec.id==="financing"&&<div>
                  <PF l={t("loan")}><PNum v={la} set={setLA}/></PF>
                  <div style={{fontSize:".58rem",color:la>bp*.85?"#ba1a1a":"#787587",marginBottom:6,fontFamily:"monospace"}}>LTV: {bp>0?Math.round(la/bp*100):0}%{epfUse&&epfWithdrawable>0?` | EPF: Rs ${f$(epfWithdrawable)} available`:""}{purpose==="cg"&&cgAmt>0?` | CG: Rs ${f$(cgAmt)}`:""}</div>
                  <PF l={t("rate")}><PNum v={rate} set={setRate}/></PF>
                  <PF l={t("ten")}><PNum v={tenure} set={setTen}/></PF>
                  <PF l={t("compR")} h={t("compRH")}><PNum v={curRent} set={setCurRent}/></PF>
                  <PF l={t("invR")} h={t("invRH")}><PNum v={invRet} set={setInvRet}/></PF>
                  {R&&<Chip accent>EMI: <strong>{fM(R.e)}</strong> | {t("interest")}: <strong style={{color:"#ba1a1a"}}>{fF(R.tInt)}</strong></Chip>}
                  <DB color={sec.color} onClick={()=>mark("financing")}/>
                </div>}

                {sec.id==="interiors"&&<div>
                  <PF l={txn==="resale"?t("condition"):t("handover")}><PTog o={txn==="resale"?[{v:"ready",l:t("ready")},{v:"cosmetic",l:t("cosmetic")},{v:"reno",l:t("reno")}]:[{v:"bare",l:t("bare")},{v:"semi",l:t("semi")},{v:"full",l:t("full")}]} v={furnish} set={setFurnish}/></PF>
                  {furnish!=="full"&&furnish!=="ready"&&<PF l={t("quality")}><PSel v={intRate} set={e=>setIntRate(Number(e.target.value))} o={INTR.map(i=>({v:i.v,l:i.l}))}/></PF>}
                  {(furnish==="full"||furnish==="ready")&&<Chip>{t("noInt")}</Chip>}
                  <PF l={t("parking")}><PTog o={[{v:"covered",l:t("covered")},{v:"open",l:t("open")},{v:"none",l:t("incl")}]} v={parking} set={setPk}/></PF>
                  <DB color={sec.color} onClick={()=>mark("interiors")}/>
                </div>}

                {sec.id==="life"&&<div>
                  <Lbl>{lang==="hi"?"आय और बढ़त":"Income & Growth"}</Lbl>
                  <PF l={t("income")} h={t("incomeH")}><PNum v={annualInc} set={setAnnualInc}/></PF>
                  <PF l={t("takeHome")} h={t("takeHomeH")}><PNum v={monthlyTH} set={setMonthlyTH}/></PF>
                  <PF l={t("incPct")}><PNum v={incPct} set={setIncPct}/></PF>
                  <PF l={t("switchFreq")}><PTog o={[{v:3,l:t("sw3")},{v:5,l:t("sw5")},{v:0,l:t("swNone")}]} v={switchFreq} set={setSwitchFreq}/></PF>
                  {switchFreq>0&&<PF l={t("switchBump")}><PNum v={switchBump} set={setSwitchBump}/></PF>}
                  <Lbl>{lang==="hi"?"बचत":"Savings"}</Lbl>
                  <PF l={t("savings")} h={t("savingsH")}><PNum v={savBeyond} set={setSavBeyond}/></PF>
                  <Lbl>{t("lifeEvt")}</Lbl>
                  {EVT_OPTS.map(ev=><div key={ev.key} style={{marginBottom:5}}><button onClick={()=>toggleEvt(ev.key)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 10px",borderRadius:8,border:lifeEvts[ev.key]!==undefined?"1.5px solid #0d9488":"1px solid #e3e2e6",background:lifeEvts[ev.key]!==undefined?"#0d948808":"#faf9fd",cursor:"pointer",textAlign:"left"}}><span className="material-symbols-outlined" style={{fontSize:14,color:lifeEvts[ev.key]!==undefined?"#0d9488":"#787587"}}>{lifeEvts[ev.key]!==undefined?"check_circle":"radio_button_unchecked"}</span><span style={{fontSize:".66rem",fontWeight:700,color:lifeEvts[ev.key]!==undefined?"#0d9488":"#474556"}}>{ev.label}</span></button>{lifeEvts[ev.key]!==undefined&&<div style={{marginTop:3,marginLeft:28}}><div style={{fontSize:".56rem",color:"#787587",marginBottom:2}}>{t("evtWhen")}</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{[1,2,3,4,5,7,10].map(yr=><button key={yr} onClick={()=>setEvtYr(ev.key,yr)} style={{padding:"3px 7px",borderRadius:6,border:lifeEvts[ev.key]===yr?"1.5px solid #0d9488":"1px solid #e3e2e6",background:lifeEvts[ev.key]===yr?"#0d948815":"#fff",color:lifeEvts[ev.key]===yr?"#0d9488":"#787587",fontSize:".56rem",fontWeight:700,cursor:"pointer"}}>{yr}yr</button>)}</div></div>}</div>)}

                  {/* INVESTMENTS */}
                  <Lbl>{t("invLump")}</Lbl>
                  <p style={{fontSize:".56rem",color:"#787587",marginBottom:4}}>{t("invLumpH")}</p>
                  {lumpInv.map((inv,i)=><div key={i} style={{display:"flex",gap:3,alignItems:"end",marginBottom:4}}><div style={{flex:1.5}}><PSel v={inv.type} set={e=>{const n=[...lumpInv];n[i]={...n[i],type:e.target.value};setLumpInv(n)}} o={LUMP_TYPES}/></div><div style={{flex:2}}><PNum v={inv.amount} set={v=>{const n=[...lumpInv];n[i]={...n[i],amount:v};setLumpInv(n)}}/></div><div style={{flex:1}}><PNum v={inv.year} set={v=>{const n=[...lumpInv];n[i]={...n[i],year:v};setLumpInv(n)}}/></div><button onClick={()=>setLumpInv(p=>p.filter((_,j)=>j!==i))} style={{width:30,height:38,borderRadius:8,border:"1px solid #e3e2e6",background:"#faf9fd",cursor:"pointer",display:"grid",placeItems:"center"}}><span className="material-symbols-outlined" style={{fontSize:12,color:"#ba1a1a"}}>close</span></button></div>)}
                  <button onClick={()=>setLumpInv(p=>[...p,{type:"fd",amount:500000,year:5}])} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px",borderRadius:8,border:"1px dashed #787587",background:"transparent",cursor:"pointer",fontSize:".6rem",fontWeight:700,color:"#787587",width:"100%",justifyContent:"center",marginBottom:8}}>{t("invAdd")}</button>

                  <Lbl>{t("invMo")}</Lbl>
                  <p style={{fontSize:".56rem",color:"#787587",marginBottom:4}}>{t("invMoH")}</p>
                  {moInv.map((inv,i)=><div key={i} style={{display:"flex",gap:3,alignItems:"end",marginBottom:4}}><div style={{flex:1.5}}><PSel v={inv.type} set={e=>{const n=[...moInv];const mt=MO_TYPES.find(m=>m.v===e.target.value);n[i]={...n[i],type:e.target.value,rate:mt?.r||12};setMoInv(n)}} o={MO_TYPES}/></div><div style={{flex:2}}><PNum v={inv.monthly} set={v=>{const n=[...moInv];n[i]={...n[i],monthly:v};setMoInv(n)}}/></div><div style={{flex:1}}><PNum v={inv.years} set={v=>{const n=[...moInv];n[i]={...n[i],years:v};setMoInv(n)}}/></div><button onClick={()=>setMoInv(p=>p.filter((_,j)=>j!==i))} style={{width:30,height:38,borderRadius:8,border:"1px solid #e3e2e6",background:"#faf9fd",cursor:"pointer",display:"grid",placeItems:"center"}}><span className="material-symbols-outlined" style={{fontSize:12,color:"#ba1a1a"}}>close</span></button></div>)}
                  <button onClick={()=>setMoInv(p=>[...p,{type:"sip",monthly:10000,years:10,rate:12}])} style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px",borderRadius:8,border:"1px dashed #787587",background:"transparent",cursor:"pointer",fontSize:".6rem",fontWeight:700,color:"#787587",width:"100%",justifyContent:"center",marginBottom:8}}>{t("invAdd")}</button>

                  <Lbl>{t("invEpf")}</Lbl>
                  <PF l={t("epfBal")}><PNum v={epfBal} set={setEpfBal}/></PF>
                  <PF l={t("epfMo")}><PNum v={epfMo} set={setEpfMo}/></PF>
                  <PF l={t("epfYrs")}><PNum v={epfYrs} set={setEpfYrs}/></PF>
                  {epfYrs>=3&&epfBal>0&&<><PF l={t("epfUse")}><PTog o={[{v:true,l:t("yes")},{v:false,l:t("no")}]} v={epfUse} set={setEpfUse}/></PF>{epfUse&&<Chip accent>{t("epfWithdrawable")}: <strong>Rs {f$(epfWithdrawable)}</strong></Chip>}</>}
                  {epfYrs>0&&epfYrs<3&&<Chip>{lang==="hi"?"3 साल पूरे होने पर 90% निकाल सकते हो":"90% withdrawable after 3 years of membership"}</Chip>}

                  <DB color={sec.color} onClick={()=>mark("life")}/>
                </div>}
              </div>}
            </div>
          )})}
        </div>
        {allDone&&!open&&<div className="anim" style={{textAlign:"center"}}><button onClick={doTransform} className="glow" style={{padding:"14px 36px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:900,fontSize:".86rem",fontFamily:"'Plus Jakarta Sans'",border:"none",cursor:"pointer"}}>{t("transform")}</button><p style={{fontSize:".62rem",color:"#787587",marginTop:6}}>{t("transformS")}</p></div>}
      </div>}

      {/* ═══ RESULTS ═══ */}
      {phase==="results"&&R&&<div ref={pyrRef}>
        <section className="anim" style={{marginBottom:14,paddingTop:8}}>
          <h2 style={{fontSize:"clamp(1.4rem,5vw,1.9rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>Rs {f$(R.tProj)} <span style={{fontSize:".42em",color:"#ce2c66",fontWeight:700}}>({R.mul.toFixed(2)}x)</span></h2>
        </section>
        <div style={{display:"flex",gap:3,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
          {[{k:"pyramid",l:t("tB")},{k:"finances",l:t("tF")},{k:"timeline",l:t("tT")},{k:"rent",l:t("tR")},{k:"intel",l:t("tI")}].map(x=><button key={x.k} onClick={()=>{setTab(x.k);setDetailIdx(null)}} style={{padding:"6px 12px",borderRadius:8,border:tab===x.k?"1.5px solid #522de6":"1px solid #e3e2e6",background:tab===x.k?"#522de610":"#fff",color:tab===x.k?"#522de6":"#787587",fontSize:".62rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{x.l}</button>)}
        </div>

        {/* ═══ PYRAMID ═══ */}
        {tab==="pyramid"&&<div className="anim">
          <div style={{padding:"10px 12px",borderRadius:12,background:"#522de608",border:"1px solid #522de615",marginBottom:14}}><p style={{fontSize:".64rem",color:"#474556",lineHeight:1.6}}>{t("obP")}</p></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,marginBottom:16}}>
            {R.sorted.map((seg,i)=>{const w=100-(i*12),isO=detailIdx===i,hasCash=seg.id==="upfront"&&R.tCash>0;return (<div key={seg.id} className="morph" style={{width:`${w}%`,animationDelay:`${i*.08}s`}}><button onClick={()=>setDetailIdx(isO?null:i)} style={{width:"100%",padding:i===0?"12px 10px":"8px 8px",borderRadius:i===0?"4px 4px 14px 14px":i===R.sorted.length-1?"10px 10px 4px 4px":4,background:seg.color,color:"#fff",border:isO?"2px solid #fff":"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4,boxShadow:`0 4px 12px ${seg.color}25`}}><div style={{display:"flex",alignItems:"center",gap:4,overflow:"hidden"}}><span className="material-symbols-outlined" style={{fontSize:i===0?16:13,fontVariationSettings:"'FILL' 1",flexShrink:0}}>{seg.icon}</span><span style={{fontSize:i===0?".56rem":".48rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{seg.label}</span>{hasCash&&<span className="cB" style={{width:5,height:5,borderRadius:99,background:"#ff4444",border:"1.5px solid #fff"}}/>}</div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:".54rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>Rs {f$(seg.val)}</div><div style={{fontSize:".4rem",opacity:.75}}>{seg.pct.toFixed(1)}%</div></div></button></div>)})}
          </div>
          {detailIdx!==null&&R.sorted[detailIdx]&&<div className="anim lift ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><h3 style={{fontSize:".76rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",color:R.sorted[detailIdx].color}}>{R.sorted[detailIdx].label}</h3><button onClick={()=>setDetailIdx(null)} style={{background:"none",border:"none",cursor:"pointer"}}><span className="material-symbols-outlined" style={{fontSize:14,color:"#787587"}}>close</span></button></div><p style={{fontSize:".58rem",color:"#787587",lineHeight:1.5,marginBottom:8}}>{t(R.sorted[detailIdx].ob)}</p><DRows rows={R.det[R.sorted[detailIdx].id]}/></div>}

          {/* DAY-1 CASH deep insight */}
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
              <div><div style={{fontSize:".48rem",fontWeight:700,color:"#ba1a1a",letterSpacing:".08em",textTransform:"uppercase"}}>{t("qD1")}</div><div style={{fontSize:"1.1rem",fontWeight:900,fontFamily:"'JetBrains Mono'",color:"#ba1a1a"}}>Rs {f$(R.d1)}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:".48rem",fontWeight:700,color:"#787587",textTransform:"uppercase"}}>{t("qMo")}</div><div style={{fontSize:".8rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>{fM(R.e+R.aR/12)}</div></div>
            </div>
            <p style={{fontSize:".62rem",color:"#474556",lineHeight:1.65,marginBottom:8}}>{lang==="hi"?`ये वो पैसा है जो पहली EMI शुरू होने से पहले जेब से निकलना है। बैंक इसे फंड नहीं करता — लोन से बाहर है। ज़्यादातर खरीदार इस नंबर को बुकिंग के बाद जानते हैं — तब तक टोकन दे चुके होते हैं, पीछे नहीं हट सकते। यही जगह है जहां FD टूटती है, माता-पिता से उधार होता है, या क्रेडिट कार्ड से कैश निकलता है।`:`This must leave your pocket BEFORE your first EMI. The bank does not fund any of this — it is entirely outside the loan. Most buyers learn this number after booking — when the token is paid and there is no turning back. This is where FDs get broken, parents get asked for loans, and credit card cash advances happen.`}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:6}}>
              {[{l:t("dDP"),v:R.dp,c:"#522de6"},{l:t("s_govt"),v:R.govT,c:"#787587"},{l:t("dLoanFee"),v:R.det.financing.find(d=>d.l===t("dLoanFee"))?.v||0,c:"#5e5b77"},{l:t("s_int"),v:R.det.interiors.reduce((s,d)=>s+(typeof d.v==="number"?d.v:0),0),c:"#ce2c66"},{l:t("dMaintDep")+"+"+t("dCorpus"),v:(R.det.upfront[1]?.v||0)+(R.det.upfront[2]?.v||0),c:"#ac064e"},R.preE>0&&{l:t("dPreEmi"),v:R.preE,c:"#ba1a1a"},R.tCash>0&&{l:t("dCashTotal"),v:R.tCash,c:"#ba1a1a"}].filter(Boolean).map((c,i)=><div key={i} style={{padding:"5px 7px",borderRadius:8,background:c.c+"08",border:`1px solid ${c.c}15`}}><div style={{fontSize:".44rem",fontWeight:700,color:c.c}}>{c.l}</div><div style={{fontSize:".62rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>{typeof c.v==="number"?fF(c.v):c.v}</div></div>)}
            </div>
            <p style={{fontSize:".56rem",color:"#787587",textAlign:"center"}}>{t("obTabs")}</p>
          </div>
        </div>}

        {/* ═══ FINANCES ═══ */}
        {tab==="finances"&&<div className="anim">
          <Lbl>{t("tF")}</Lbl>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
            <RatioCard label={t("fEmiRatio")} val={R.emiRatio} unit="%" good={30} warn={40} bad={50} desc={R.emiRatio<=30?(lang==="hi"?"आराम।":"Comfortable."):R.emiRatio<=40?(lang==="hi"?"तंग।":"Tight."):lang==="hi"?"खतरनाक।":"Dangerous."}/>
            <RatioCard label={t("fPriceInc")} val={R.priceToInc.toFixed(1)} unit="x" good={4} warn={5} bad={7} desc={R.priceToInc<=5?(lang==="hi"?"सही।":"Healthy."):lang==="hi"?"तना हुआ।":"Stretched."}/>
          </div>
          <div className="ghost" style={{padding:14,borderRadius:14,background:"#fff",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:".7rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{t("fEmergency")}</span><span style={{fontSize:".76rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a"}}>{R.emergencyMo.toFixed(1)} {t("fMonthsLabel")}</span></div>
            <div style={{height:8,borderRadius:4,background:"#f4f3f7",overflow:"hidden",marginBottom:6}}><div style={{height:"100%",borderRadius:4,background:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a",width:`${Math.min(R.emergencyMo/6*100,100)}%`}}/></div>
            <p style={{fontSize:".6rem",color:"#474556",lineHeight:1.5}}>{R.emergencyMo<3?(lang==="hi"?`डाउन पेमेंट के बाद Rs ${f$(savBeyond)} बचा — ${R.emergencyMo.toFixed(1)} महीने। 3 EMI मिस = बैंक रिकवरी। 6 महीने चाहिए।`:`Rs ${f$(savBeyond)} left — ${R.emergencyMo.toFixed(1)} months. Miss 3 EMIs = bank recovery. Need 6 months.`):R.emergencyMo<6?(lang==="hi"?`${R.emergencyMo.toFixed(1)} महीने — ठीक, 6 आदर्श।`:`${R.emergencyMo.toFixed(1)} months — okay, 6 ideal.`):(lang==="hi"?"6+ — अच्छी स्थिति।":"6+ — solid.")}</p>
          </div>

          {/* BURN RATE CHART */}
          {R.collision.length>0&&(Object.keys(lifeEvts).length>0||lumpInv.length>0||moInv.length>0||epfUse)&&<div>
            <Lbl>{lang==="hi"?"आय बर्न रेट — साल दर साल":"Income Burn Rate — Year by Year"}</Lbl>
            <div className="ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
              <div style={{overflowX:"auto"}}>
                <div style={{position:"relative",height:140,minWidth:Math.max(260,R.collision.length*20)}}>
                  <div style={{position:"absolute",left:0,right:0,bottom:`${60*1.3}px`,height:1,background:"#f59e0b40",zIndex:1}}/>
                  <div style={{position:"absolute",right:2,bottom:`${60*1.3+2}px`,fontSize:".34rem",color:"#f59e0b",fontWeight:800}}>60%</div>
                  <div style={{display:"flex",gap:2,alignItems:"end",height:140,zIndex:2}}>
                    {R.collision.map((yr,i)=>{const hPct=yr.income>0?(yr.housing/yr.income)*100:0;const lPct=yr.income>0?(yr.life/yr.income)*100:0;const tot=hPct+lPct;const dz=tot>60;const uw=tot>100;return (<div key={i} style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",position:"relative"}}>{lPct>0&&<div style={{width:"100%",background:uw?"#ba1a1a":"#f59e0b",height:Math.min(lPct*1.3,80),minHeight:1,borderRadius:"2px 2px 0 0",opacity:.8}}/>}<div style={{width:"100%",background:uw?"#ba1a1a":dz?"#f59e0b":"#522de6",height:Math.min(hPct*1.3,130),minHeight:2,borderRadius:lPct>0?"0":"2px 2px 0 0",opacity:.85}}/>{yr.invMat>0&&<div style={{position:"absolute",top:2,left:"50%",transform:"translateX(-50%)"}}><div style={{width:6,height:6,borderRadius:99,background:"#22c55e",border:"1.5px solid #fff"}}/></div>}{yr.isSwitch&&<div style={{position:"absolute",top:Math.max(0,140-Math.min(tot*1.3,140)-12),left:"50%",transform:"translateX(-50%)",fontSize:".36rem",color:"#22c55e",fontWeight:900}}>↑</div>}<div style={{position:"absolute",bottom:-11,left:"50%",transform:"translateX(-50%)",fontSize:".32rem",color:dz?"#ba1a1a":"#787587",fontFamily:"monospace",fontWeight:dz?800:400}}>{Math.round(tot)}%</div></div>)})}
                  </div>
                </div>
                <div style={{display:"flex",gap:6,marginTop:14,flexWrap:"wrap"}}><Lg c="#522de6" l={lang==="hi"?"मकान":"Housing"}/><Lg c="#f59e0b" l={lang==="hi"?"ज़िंदगी":"Life"}/><Lg c="#ba1a1a" l="100%+"/></div>
              </div>
            </div>
          </div>}

          <Lbl>{t("ins")}</Lbl>
          {/* BURN RATE VERDICT — first insight, reads actual chart data */}
          {R.peakYr&&(()=>{const dy=R.dangerYears;const pk=R.peakYr;const safe=dy.length===0&&pk.pct<40;const manageable=dy.length===0&&pk.pct<60;const risky=dy.length>0&&dy.length<=3;
            return (<IC t={lang==="hi"?(safe?"सुरक्षित — आराम से चलेगा":manageable?"संभलेगा — पर तंग होगा":risky?`जोखिम — ${dy.length} साल 60%+ में`:`खतरनाक — ${dy.length} साल 60%+ में`):(safe?"Safe — comfortable margin":manageable?"Manageable — but tight":risky?`Risky — ${dy.length} years above 60%`:`Dangerous — ${dy.length} years above 60%`)} x={lang==="hi"?(safe?`तुम्हारी आय बढ़त + ज़िंदगी के खर्चे मिलाकर सबसे तंग साल ${pk.yr} में भी ${pk.pct}% ही पहुंचता है। 60% से नीचे = अचानक खर्चा आए (मेडिकल, नौकरी, रेट बढ़त) तो भी EMI बच जाएगी। ये अच्छी हालत है।`:manageable?`सबसे तंग साल ${pk.yr}: आय का ${pk.pct}%। 60% से नीचे है, पर 40% से ऊपर — मतलब हर महीना Rs ${f$(Math.round(monthlyTH-R.housingMo))} बचता है जिसमें खाना, ट्रांसपोर्ट, बच्चे, और बाकी सब चलाना है। एक बड़ा अचानक खर्चा परेशान कर सकता है।`:risky?`साल ${dy.map(y=>y.yr).join(", ")} में 60%+ बर्न। साल ${pk.yr} सबसे तंग: ${pk.pct}%। इन सालों में कोई अचानक खर्चा — मेडिकल, नौकरी छूटना, रेट बढ़त — EMI मिस करा सकता है। ${switchFreq>0?`साल ${switchFreq} का स्विच राहत देगा, पर उसके भरोसे रहना खतरनाक है।`:"सैलरी स्विच नहीं चुना — बढ़त रैखिक रहेगी।"} कीमत 10-15% कम करो, या टेन्योर बढ़ाओ।`:`${dy.length} साल 60%+ में — लगातार तनाव। साल ${pk.yr}: ${pk.pct}%। इस कीमत पर इस आय के साथ ये प्रॉपर्टी बहुत भारी है। Rs ${f$(R.comfPrice)} तक की प्रॉपर्टी ज़्यादा सही रहती।`):(safe?`Even in your tightest year (Year ${pk.yr}), only ${pk.pct}% of income goes to housing + life. Under 60% means you can absorb surprises — medical bills, rate hikes, job gaps — without missing EMI.`:manageable?`Tightest year is ${pk.yr} at ${pk.pct}%. Below 60% but above 40% — leaves Rs ${f$(Math.round(monthlyTH-R.housingMo))}/mo for food, transport, kids, everything. One large surprise could strain you.`:risky?`Years ${dy.map(y=>y.yr).join(", ")} exceed 60%. Year ${pk.yr} peaks at ${pk.pct}%. During these years, any surprise — medical, job loss, rate hike — could cause missed EMIs. ${switchFreq>0?`Your Year ${switchFreq} switch helps, but depending on it is risky.`:"No salary switch selected — growth stays linear."} Negotiate 10-15% lower or extend tenure.`:`${dy.length} years above 60% — sustained stress. Year ${pk.yr}: ${pk.pct}%. At this price and income, this property is too heavy. Rs ${f$(R.comfPrice)} would be comfortable.`)} c={safe?"#22c55e":manageable?"#f59e0b":"#ba1a1a"}/>);
          })()}

          {/* SBA INSIGHT */}
          <IC t={lang==="hi"?`Rs ${R.psfSuper.toLocaleString("en-IN")}/sqft नहीं — असल में Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft`:`Not Rs ${R.psfSuper.toLocaleString("en-IN")}/sqft — actually Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft`} x={lang==="hi"?`बिल्डर बोलता है Rs ${R.psfSuper.toLocaleString("en-IN")}/sqft on ${sba} sqft सुपर बिल्ट-अप। पर ${loadF}% (${sba-ca} sqft) कॉरिडोर, लिफ्ट, लॉबी, जिम, पूल है — 200+ परिवारों के साथ शेयर। तुम्हारा रहने लायक एरिया ${ca} sqft कार्पेट है। इस पर असली कीमत Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft बनती है। इंटीरियर भी कार्पेट पर लगता है — Rs ${intRate>0?intRate:0} × ${ca} = Rs ${f$(ca*(intRate||0))}। मेंटेनेंस सुपर बिल्ट-अप पर — ${fM(R.mm)}। RERA कार्पेट एरिया बताने को बाध्य करता है — हमेशा पूछो।`:`Builder quotes Rs ${R.psfSuper.toLocaleString("en-IN")}/sqft on ${sba} sqft super built-up. But ${loadF}% (${sba-ca} sqft) is corridors, lifts, lobbies, gym, pool — shared with 200+ families. Your livable space is ${ca} sqft carpet. Effective price: Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft. Interiors are on carpet — Rs ${intRate||0} × ${ca} = Rs ${f$(ca*(intRate||0))}. Maintenance is on SBA — ${fM(R.mm)}. RERA mandates carpet area disclosure — always ask.`} c="#ce2c66"/>

          <IC t={lang==="hi"?`ब्रोशर का ${R.mul.toFixed(1)} गुना`:`${R.mul.toFixed(1)}x the brochure price`} x={lang==="hi"?`बिल्डर बोलता है Rs ${f$(R.bp)}। ${tenure} साल में Rs ${f$(R.tProj)} लगेंगे। फ़र्क Rs ${f$(R.tProj-R.bp)} — 12% पर 10 साल में Rs ${f$(Math.round((R.tProj-R.bp)*Math.pow(1.12,10)))} बनता। ये ऑपर्च्युनिटी कॉस्ट है।`:`Builder says Rs ${f$(R.bp)}. Over ${tenure}yr: Rs ${f$(R.tProj)}. Gap Rs ${f$(R.tProj-R.bp)} at 12% for 10yr = Rs ${f$(Math.round((R.tProj-R.bp)*Math.pow(1.12,10)))}. That is opportunity cost.`} c="#522de6"/>

          <IC t={lang==="hi"?`EMI आय का ${Math.round(R.emiRatio)}% खाती है`:`EMI eats ${Math.round(R.emiRatio)}% of take-home`} x={lang==="hi"?`हर महीना Rs ${f$(Math.round(R.housingMo))} मकान पर। बचता Rs ${f$(Math.round(monthlyTH-R.housingMo))}। इसमें खाना, ट्रांसपोर्ट, बच्चे, माता-पिता — सब। बैंक 50% मंज़ूर करता है — पर 50% = आधी ज़िंदगी बैंक की। 30% से कम रहो।`:`Rs ${f$(Math.round(R.housingMo))}/mo to housing. Rs ${f$(Math.round(monthlyTH-R.housingMo))} left for everything. Banks approve 50% — but 50% means half your life is the bank's. Stay under 30%.`} c={R.emiRatio>40?"#ba1a1a":"#5e5b77"}/>

          {R.tCash>0&&<IC t={lang==="hi"?`कैश Rs ${f$(R.tCash)}`:`Cash: Rs ${f$(R.tCash)}`} x={lang==="hi"?`Rs ${f$(R.cashAmt)} कैश, जुगाड़ वाला ~${R.cPc}% लेता है (Rs ${f$(R.cFe)})। रसीद नहीं। पकड़े गए: Section 269ST 100% पेनल्टी, 68/69 में 78.6% टैक्स, बेनामी एक्ट ज़ब्ती।`:`Rs ${f$(R.cashAmt)} cash, middleman charges ~${R.cPc}% (Rs ${f$(R.cFe)}). No receipt. If caught: Section 269ST 100% penalty, 68/69 = 78.6% tax, Benami Act confiscation.`} c="#ba1a1a"/>}

          {gender==="male"&&sI.st.female<sI.st.male&&<IC t={lang==="hi"?`Rs ${f$(bp*(sI.st.male-sI.st.female))} बचाओ`:`Save Rs ${f$(bp*(sI.st.male-sI.st.female))}`} x={lang==="hi"?`${sI.l}: महिला ${(sI.st.female*100).toFixed(1)}% vs पुरुष ${(sI.st.male*100).toFixed(1)}% स्टांप। पत्नी/माँ को-एप्लिकेंट हैं तो सबसे आसान बचत।`:`${sI.l}: women ${(sI.st.female*100).toFixed(1)}% vs men ${(sI.st.male*100).toFixed(1)}%. Easiest saving if wife/mother is co-applicant.`} c="#0d9488"/>}

          {/* EPF INSIGHT */}
          {epfUse&&epfWithdrawable>0&&(()=>{const intSaved=Math.round(epfWithdrawable*(rate/100)*tenure*.4);return (<IC t={lang==="hi"?`EPF Rs ${f$(epfWithdrawable)} — Rs ${f$(intSaved)} ब्याज बचेगा`:`EPF Rs ${f$(epfWithdrawable)} — saves Rs ${f$(intSaved)} interest`} x={lang==="hi"?`Rs ${f$(epfWithdrawable)} EPF से निकालकर डाउन पेमेंट में लगाओगे तो लोन कम, EMI कम, ब्याज ~Rs ${f$(intSaved)} बचेगा। पर ट्रेड-ऑफ: Rs ${f$(epfWithdrawable)} जो 8.25% पर 30 साल कंपाउंड होता = रिटायरमेंट में Rs ${f$(R.epfFV30)}। तुम Rs ${f$(R.epfFV30)} रिटायरमेंट का पैसा खर्च कर रहे हो Rs ${f$(intSaved)} ब्याज बचाने के लिए। सलाह: सिर्फ़ उतना निकालो जितना 20% डाउन पेमेंट पूरा करने को चाहिए। बाकी कंपाउंड होने दो। EPFO पोर्टल पर Form 31 से 3-4 दिन में प्रोसेस।`:`Withdrawing Rs ${f$(epfWithdrawable)} for down payment reduces loan, saves ~Rs ${f$(intSaved)} in interest. But trade-off: Rs ${f$(epfWithdrawable)} at 8.25% for 30yr = Rs ${f$(R.epfFV30)} at retirement. You are spending Rs ${f$(R.epfFV30)} of retirement money to save Rs ${f$(intSaved)} in interest. Withdraw only enough to hit 20% down payment. Keep the rest compounding. Apply via Form 31 on EPFO portal — processed in 3-4 days.`} c="#0d9488"/>)})()}

          {/* PURPOSE-SPECIFIC */}
          {(()=>{const ry=bp>0?((curRent*12)/bp*100):0;const ts=Math.round((Math.min(200000,R.tInt>0?200000:0)+Math.min(150000,R.e*12*.3))*.3);
            if(purpose==="first")return (<IC t={lang==="hi"?"पहला घर — आंखें खोलकर":"First home — eyes wide open"} x={lang==="hi"?`भावनात्मक फ़ैसला — सही है। पर नंबर देखो: आय Rs ${f$(annualInc)}/साल, प्रॉपर्टी ${R.priceToInc.toFixed(1)}x। 5x "आराम", 7x "तंग"। PMAY सब्सिडी चेक करो (2.67L तक), कुछ राज्य फर्स्ट-टाइम डिस्काउंट देते हैं।`:`Emotional decision — that's fine. But see the numbers: income Rs ${f$(annualInc)}/yr, property is ${R.priceToInc.toFixed(1)}x. Under 5x comfortable, above 7x risky. Check PMAY subsidy (up to Rs 2.67L), some states offer first-time discounts.`} c="#522de6"/>);
            if(purpose==="invest")return (<IC t={lang==="hi"?"निवेश: कमा रही है या खा रही?":"Investment: earning or burning?"} x={lang==="hi"?`दो सवाल: (1) इलाका 7%+ बढ़ रहा? नहीं तो Nifty ETF (12%) बेहतर। (2) यील्ड: Rs ${f$(curRent*12)}/साल on Rs ${f$(bp)} = ${ry.toFixed(1)}%। भारत 2-3% — FD (7%) से कम। लिक्विडिटी ज़ीरो।`:`Two questions: (1) Area growing 7%+? If not, Nifty ETF (~12%) wins. (2) Yield: Rs ${f$(curRent*12)}/yr on Rs ${f$(bp)} = ${ry.toFixed(1)}%. India avg 2-3% — below FD. Zero liquidity.`} c="#ac064e"/>);
            if(purpose==="rental"){const moOut=R.housingMo;const netMo=curRent-moOut;const effRent=Math.round(curRent*10/12);const netEff=effRent-moOut;const surplus=netMo>0;return (<IC t={lang==="hi"?(surplus?`किराये से Rs ${f$(Math.round(netMo))}/मो सरप्लस`:`Rs ${f$(Math.abs(Math.round(netMo)))}/मो जेब से — किराया पूरा कवर नहीं करता`):(surplus?`Rent generates Rs ${f$(Math.round(netMo))}/mo surplus`:`Rs ${f$(Math.abs(Math.round(netMo)))}/mo from pocket — rent doesn't cover full costs`)} x={lang==="hi"?(surplus?`किराया ${fM(curRent)} vs कुल मासिक खर्चा ${fM(Math.round(moOut))} (EMI ${fM(R.e)} + मेंटेनेंस + टैक्स + बीमा)। हर महीना Rs ${f$(Math.round(netMo))} सरप्लस — टेनेंट तुम्हारी EMI भर रहा है और ऊपर से कमाई। पर ध्यान: (1) हर साल 1-2 महीने खाली रहने का रिस्क — तब ${fM(Math.round(moOut))} जेब से। असल किराया ~Rs ${f$(effRent)}/मो मानो तो नेट ${netEff>0?"+":""}Rs ${f$(Math.round(netEff))}/मो। (2) टेनेंट ड्रामा — देरी, डैमेज, लीगल। (3) रेंटल इनकम पर टैक्स लगता है। यील्ड ${ry.toFixed(1)}% — ${ry>=4?"4%+ है, ठीक।":"4% से कम, FD (7%) बेहतर।"}`:`किराया ${fM(curRent)} vs कुल मासिक खर्चा ${fM(Math.round(moOut))} (EMI ${fM(R.e)} + मेंटेनेंस + टैक्स + बीमा)। हर महीना Rs ${f$(Math.abs(Math.round(netMo)))} जेब से — टेनेंट होने के बावजूद। "किराये से EMI भर दूंगा" सिर्फ़ तभी सच जब किराया EMI + मेंटेनेंस + टैक्स + बीमा सब कवर करे — यहां नहीं कर रहा। ऊपर से 1-2 महीने खाली रहा तो ${fM(Math.round(moOut))} पूरा जेब से। यील्ड ${ry.toFixed(1)}% — ${ry>=4?"ठीक है, पर कैश फ्लो नेगेटिव।":"FD (7%) बेहतर।"}`):(surplus?`Rent ${fM(curRent)} vs total monthly cost ${fM(Math.round(moOut))} (EMI ${fM(R.e)} + maintenance + tax + insurance). Rs ${f$(Math.round(netMo))}/mo surplus — tenant covers your EMI and more. But factor in: (1) Vacancy risk — 1-2 months/yr empty means ${fM(Math.round(moOut))} from pocket. Effective rent ~Rs ${f$(effRent)}/mo, net ${netEff>0?"+":""}Rs ${f$(Math.round(netEff))}/mo. (2) Tenant drama — delays, damage, legal costs. (3) Rental income is taxable. Yield ${ry.toFixed(1)}% — ${ry>=4?"above 4%, reasonable.":"below 4%, FD (7%) beats this."}`:`Rent ${fM(curRent)} vs total monthly cost ${fM(Math.round(moOut))} (EMI ${fM(R.e)} + maintenance + tax + insurance). Rs ${f$(Math.abs(Math.round(netMo)))}/mo from your pocket even with a tenant. "Rent will cover EMI" is only true when rent covers EMI + maint + tax + insurance — it doesn't here. Plus 1-2 months vacancy/yr = ${fM(Math.round(moOut))} fully from pocket. Yield ${ry.toFixed(1)}% — ${ry>=4?"reasonable, but cash flow is negative.":"below FD (7%)."}`)} c={surplus?"#0d9488":"#ce2c66"}/>)}
            if(purpose==="tax")return (<IC t={lang==="hi"?`टैक्स बचत ~Rs ${f$(ts)}/साल`:`Tax saving ~Rs ${f$(ts)}/yr`} x={lang==="hi"?`24(b): ब्याज 2L, 80C: मूलधन 1.5L। 30% ब्रैकेट = ~Rs ${f$(ts)}/साल। पर Rs ${f$(Math.round(R.e*12))}/साल EMI भर रहे हो — 1:${Math.round(R.e*12/Math.max(1,ts))} ratio। ELSS+NPS से वही 1.5L मिलती है बिना 20 साल लोन। टैक्स "बोनस" है, "वजह" नहीं।`:`24(b): Rs 2L interest, 80C: Rs 1.5L principal. At 30% = ~Rs ${f$(ts)}/yr. But paying Rs ${f$(Math.round(R.e*12))}/yr EMI — 1:${Math.round(R.e*12/Math.max(1,ts))} ratio. ELSS+NPS give same 1.5L without 20yr loan. Tax is "bonus" not "reason."`} c="#5e5b77"/>);
            if(purpose==="cg"){const dpFromPocket=Math.max(0,(bp-la)-cgAmt);return (<IC t={lang==="hi"?`CG Rs ${f$(cgAmt)} लगा रहे हो — Rs ${f$(Math.round(cgAmt*.2))} टैक्स बचा`:`Deploying CG Rs ${f$(cgAmt)} — Rs ${f$(Math.round(cgAmt*.2))} tax saved`} x={lang==="hi"?`डाउन पेमेंट (Rs ${f$(bp-la)}) में Rs ${f$(cgAmt)} CG है। नहीं लगाते तो 20% LTCG = Rs ${f$(Math.round(cgAmt*.2))}। Section 54: रेज़िडेंशियल→रेज़िडेंशियल। 54F: कोई LT एसेट→रेज़िडेंशियल। 2 साल में रजिस्ट्री। 6 महीने में नहीं लगा सके तो CGAS जमा करो। तुम्हारा नया पैसा: Rs ${f$(dpFromPocket)}।`:`Down payment (Rs ${f$(bp-la)}) includes Rs ${f$(cgAmt)} CG. Without reinvestment: 20% LTCG = Rs ${f$(Math.round(cgAmt*.2))}. Section 54: residential→residential. 54F: any LT asset→residential. Register within 2yr. If not invested in 6mo, deposit in CGAS. Your fresh money: Rs ${f$(dpFromPocket)}.`} c="#522de6"/>)}
            return null;
          })()}
        </div>}

        {/* ═══ TIMELINE ═══ */}
        {tab==="timeline"&&<div className="anim">
          <Lbl>{t("tlWho")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <TI w={t("tlBook")} items={[{l:t("tlBook10"),v:fF(Math.min(bp*.1,5e5)),y:true},{l:t("tlLoanFee"),v:fF(la*.005),y:true}]} c="#522de6"/>
            <TI w={t("tlReg")} items={[{l:t("tlDP"),v:fF(R.dp),y:true},{l:t("tlStampLeg"),v:fF(R.govT),y:true},R.tCash>0&&{l:t("tlCashFee"),v:fF(R.tCash),y:true,cash:true}].filter(Boolean)} c="#ce2c66"/>
            {R.isUC&&<TI w={t("tlConst")+" ("+poss+"mo)"} items={[{l:t("tlPreEmi"),v:fF(R.preE),y:true},R.rOv>0&&{l:t("tlYourRent"),v:fF(R.rOv),y:true},{l:t("tlBankDisb"),v:"Rs "+f$(la),y:false}].filter(Boolean)} c="#ac064e"/>}
            <TI w={t("tlPoss")} items={[{l:t("tlSocDep"),v:fF((R.det.upfront[1]?.v||0)+(R.det.upfront[2]?.v||0)+25e3),y:true}]} c="#5e5b77"/>
            <TI w={t("tlEmiPd")+" ("+tenure+"yr)"} items={[{l:t("tlTotalEmi"),v:fF(R.e*tenure*12),y:true},{l:t("tlBankInt"),v:fF(R.tInt),y:false}]} c="#522de6" last/>
          </div>
          <Lbl>{t("tlAmort")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14}}>
            <div style={{overflowX:"auto"}}><div style={{display:"flex",gap:2,alignItems:"end",height:100,minWidth:Math.max(240,R.amort.length*12)}}>{R.amort.map((yr,i)=>{const tot=yr.i+yr.p,ip=tot>0?(yr.i/tot)*100:50;return (<div key={i} style={{flex:1,minWidth:6,display:"flex",flexDirection:"column",height:"100%"}}><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div style={{width:"100%",borderRadius:"2px 2px 0 0",background:"#ce2c66",height:`${ip}%`,minHeight:1}}/><div style={{width:"100%",borderRadius:"0 0 2px 2px",background:"#522de6",height:`${100-ip}%`,minHeight:1}}/></div>{(yr.yr===1||yr.yr%5===0||yr.yr===tenure)&&<div style={{fontSize:".38rem",color:"#787587",marginTop:1,textAlign:"center",fontFamily:"monospace"}}>Y{yr.yr}</div>}</div>)})}</div><div style={{display:"flex",gap:10,marginTop:8}}><Lg c="#ce2c66" l={t("interest")}/><Lg c="#522de6" l={t("principal")}/></div></div>
            <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:"#f4f3f7",fontSize:".62rem",color:"#474556",lineHeight:1.5}}>{t("tlY1",{pct:R.amort[0]?Math.round(R.amort[0].i/(R.e*12)*100):"?",flip:(R.amort.findIndex(a=>a.p>a.i)+1)||"?"})}</div>
          </div>
          <Lbl>{t("ins")}</Lbl>
          {(()=>{const y1i=R.amort[0]?R.amort[0].i:0;const flipYr=(R.amort.findIndex(a=>a.p>a.i)+1)||tenure;const prepSave=Math.round(100000*rate/100*flipYr*.5);const rUp=calcEMI(la,rate+2,tenure);const emiJ=rUp-R.e;return (<>
            <IC t={lang==="hi"?`पहले ${flipYr} साल बैंक का — तुम्हारा नहीं`:`First ${flipYr} years are the bank's — not yours`} x={lang==="hi"?`पहले साल EMI Rs ${f$(Math.round(R.e*12))}। Rs ${f$(y1i)} (${Math.round(y1i/(R.e*12)*100)}%) ब्याज — सिर्फ़ Rs ${f$(Math.round(R.e*12-y1i))} लोन कम करता है। ${flipYr} साल तक बैंक ज़्यादा कमाता है। 5 साल बाद बेचो तो लोन लगभग उतना ही बचा — ज़्यादातर ब्याज गया। ये बैंक का मॉडल है: पहले ब्याज, मूलधन बाद में।`:`Year 1 EMI: Rs ${f$(Math.round(R.e*12))}. Rs ${f$(y1i)} (${Math.round(y1i/(R.e*12)*100)}%) is interest — only Rs ${f$(Math.round(R.e*12-y1i))} reduces loan. Bank profits more than you for ${flipYr} years. Sell after 5 — loan barely reduced. Bank's model: interest first, principal later.`} c="#ce2c66"/>
            <IC t={lang==="hi"?`हर Rs 1L प्रीपेमेंट ~Rs ${f$(prepSave)} बचाता है`:`Every Rs 1L prepayment saves ~Rs ${f$(prepSave)}`} x={lang==="hi"?`प्रीपेमेंट सीधे मूलधन से कटता है। पहले 2 साल में सबसे असरदार — बचत ${tenure-2} साल कंपाउंड होती है। 5 साल में Rs 5L = ~Rs ${f$(prepSave*5)} बचत, लोन 3-4 साल जल्दी ख़त्म। फ्लोटिंग लोन पर पेनल्टी नहीं। बोनस, इंक्रीमेंट, रिफंड — सीधा प्रीपेमेंट, गाड़ी या छुट्टी नहीं।`:`Prepayment hits principal directly. First 2 years = max impact — savings compound over ${tenure-2}yr. Rs 5L in 5yr = ~Rs ${f$(prepSave*5)} saved, loan ends 3-4yr early. No penalty on floating. Bonuses, increments, refunds — straight to prepayment, not a car or vacation.`} c="#0d9488"/>
            <IC t={lang==="hi"?`ब्याज +2% = EMI Rs ${f$(Math.round(emiJ))} बढ़ेगी`:`Rate +2% = EMI jumps Rs ${f$(Math.round(emiJ))}`} x={lang==="hi"?`${rate}% → ${rate+2}% = ${fM(R.e)} → ${fM(rUp)}। हर महीना Rs ${f$(Math.round(emiJ))} ज़्यादा, साल भर Rs ${f$(Math.round(emiJ*12))}। 2022-23 में RBI ने 6 महीने में 2.5% बढ़ाया। EMI बजट में 15-20% बफर रखो — ${fM(R.e)} है तो ${fM(Math.round(R.e*1.2))} तक झेलने की ताकत हो।`:`${rate}% → ${rate+2}%: ${fM(R.e)} → ${fM(rUp)}. Rs ${f$(Math.round(emiJ))}/mo extra, Rs ${f$(Math.round(emiJ*12))}/yr. RBI hiked 2.5% in 6 months in 2022-23. Budget EMI +15-20% — if EMI is ${fM(R.e)}, survive ${fM(Math.round(R.e*1.2))}.`} c="#ac064e"/>
            {R.preE>0&&<IC t={lang==="hi"?`Rs ${f$(R.preE)} प्री-EMI — बेकार पैसा`:`Rs ${f$(R.preE)} pre-EMI — dead money`} x={lang==="hi"?`${poss} महीने कंस्ट्रक्शन में ब्याज दो — मूलधन कम नहीं। एक रुपया इक्विटी नहीं बनाता। ${renting?`किराया Rs ${f$(R.rOv)} साथ-साथ। कुल Rs ${f$(R.preE+R.rOv)} — घर से पहले। रेडी-टू-मूव ज़्यादा transparent।`:""}`:`${poss}mo construction: interest-only, principal untouched. Not a rupee builds equity. ${renting?`Plus rent Rs ${f$(R.rOv)} parallel. Total Rs ${f$(R.preE+R.rOv)} before move-in. Ready-to-move is more transparent.`:""}`} c="#ba1a1a"/>}
          </>)})()}
        </div>}

        {/* ═══ BUY VS RENT ═══ */}
        {tab==="rent"&&<div className="anim">
          <Lbl>{t("brT",{ten:tenure})}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{fontSize:".64rem",color:"#787587",marginBottom:10,lineHeight:1.5}}>{t("brIf",{rent:fM(curRent),inv:invRet})}</div>
            {[{l:t("brInv"),v:R.invT,c:"#22c55e"},{l:t("brP4"),v:R.pa4,c:"#522de6"},{l:t("brP7"),v:R.pa7,c:"#6B4EFF"},{l:t("brTR"),v:R.tRentV,c:"#ce2c66"}].map((b,i)=>{const mx=Math.max(R.invT,R.pa7,R.tRentV);return (<div key={i} style={{marginBottom:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:".62rem",fontWeight:600}}>{b.l}</span><span style={{fontSize:".64rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:b.c}}>Rs {f$(b.v)}</span></div><div style={{height:5,borderRadius:3,background:"#f4f3f7",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:b.c,width:`${mx>0?(b.v/mx)*100:0}%`}}/></div></div>)})}
          </div>
          <Lbl>{t("ins")}</Lbl>
          <IC t={R.invT>R.pa7?t("brV1"):R.invT>R.pa4?t("brV2"):t("brV3")} x={R.invT>R.pa7?(lang==="hi"?`Rs ${f$(R.d1)} + Rs ${f$(Math.max(0,Math.round(R.moS)))}/मो निवेश = ${tenure} साल में Rs ${f$(R.invT)}। प्रॉपर्टी 7% पर Rs ${f$(R.pa7)} — फ़र्क Rs ${f$(Math.round(R.invT-R.pa7))}। निवेश लिक्विड, प्रॉपर्टी नहीं।`:`Invest Rs ${f$(R.d1)} + Rs ${f$(Math.max(0,Math.round(R.moS)))}/mo = Rs ${f$(R.invT)} in ${tenure}yr. Property at 7%: Rs ${f$(R.pa7)}. Gap: Rs ${f$(Math.round(R.invT-R.pa7))}. Investments are liquid, property is not.`):R.invT>R.pa4?(lang==="hi"?`निवेश Rs ${f$(R.invT)} vs 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}। लोकेशन ग्रोथ का भरोसा हो तो खरीदो। गलत इलाके में खरीदना सबसे महंगी गलती।`:`Invest: Rs ${f$(R.invT)} vs 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}. If confident about location growth, buy. Wrong area = most expensive mistake.`):(lang==="hi"?`4% पर भी Rs ${f$(R.pa4)} — निवेश Rs ${f$(R.invT)} बराबर या ज़्यादा। खरीदना सही दिखता है — पर ${tenure} साल EMI बिना रुकावट चाहिए।`:`At 4%: Rs ${f$(R.pa4)} matches invest Rs ${f$(R.invT)}. Buying looks good — but needs ${tenure}yr unbroken EMI.`)} c="#522de6"/>
          <IC t={lang==="hi"?"किराया बर्बाद नहीं — फ्लेक्सिबिलिटी है":"Rent is not wasted — it is flexibility"} x={lang==="hi"?`${tenure} साल किराया Rs ${f$(R.tRentV)}। पर शहर बदल सकते हो, डाउनसाइज़, अपग्रेड। प्रॉपर्टी बेचना 6-12 महीने, फिर स्टांप+ब्रोकरेज। EMI मिस = CIBIL गिरता है। किराये पर कोई ऐसा रिस्क नहीं।`:`${tenure}yr rent: Rs ${f$(R.tRentV)}. But renters relocate, downsize, upgrade freely. Selling takes 6-12mo + stamp + brokerage. Miss EMI = CIBIL hit. Renting = zero such risk.`} c="#5e5b77"/>
          <IC t={lang==="hi"?`ब्रेकईवन: ${R.pa7>R.tProj?"7%":"4%"}+ बढ़त चाहिए`:`Break-even: needs ${R.pa7>R.tProj?"7%":"4%"}+ growth`} x={lang==="hi"?`कुल खरीद लागत Rs ${f$(R.tProj)}। प्रॉपर्टी को इतना बढ़ना चाहिए कि बेचने पर वापस मिले। 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}। 4% से कम बढ़त = ये "एसेट" नहीं, "लायबिलिटी" है।`:`Total ownership: Rs ${f$(R.tProj)}. Property must appreciate to recover this. At 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}. Under 4% growth = liability, not asset.`} c="#ce2c66"/>
          <IC t={t("brOpp")} x={lang==="hi"?`Rs ${f$(R.d1)} अगर ${invRet}% पर ${tenure} साल = Rs ${f$(R.fvL)}। मकान में लॉक — SIP कल निकालो, प्रॉपर्टी 6-12 महीने।`:`Rs ${f$(R.d1)} at ${invRet}% for ${tenure}yr = Rs ${f$(R.fvL)}. Locked in property — SIP redeems tomorrow, property takes 6-12mo.`} c="#ac064e"/>
        </div>}

        {/* ═══ INTEL ═══ */}
        {tab==="intel"&&<div className="anim">
          <Lbl>{t("itT")} — {cI?.l}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div><div style={{fontSize:".7rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{t("itFree")}</div><div style={{fontSize:".52rem",color:"#787587"}}>{t("itFreeD")}</div></div>{!aiData&&!aiLoading&&<button onClick={fetchAI} style={{padding:"6px 14px",borderRadius:99,background:"#522de6",color:"#fff",fontSize:".62rem",fontWeight:800,border:"none",cursor:"pointer"}}>{t("itBtn")}</button>}</div>
            {aiLoading&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{width:20,height:20,border:"2.5px solid #e3e2e6",borderTopColor:"#522de6",borderRadius:99,margin:"0 auto 6px",animation:"spin .8s linear infinite"}}/><div style={{fontSize:".6rem",color:"#787587"}}>{t("itLoad")}</div></div>}
            {aiErr&&<div style={{padding:"8px 12px",borderRadius:8,background:"#ba1a1a08",fontSize:".56rem",color:"#ba1a1a",whiteSpace:"pre-wrap",maxHeight:200,overflow:"auto"}}>{aiErr}</div>}
            {aiData&&aiData.data&&<div style={{display:"grid",gap:6}}>{aiData.data.market_direction&&<div style={{padding:"10px 12px",borderRadius:10,background:"#f4f3f7"}}><div style={{fontSize:".46rem",fontWeight:800,color:"#787587",letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:2}}>{t("itMkt")}</div><div style={{fontSize:".76rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"capitalize"}}>{(aiData.data.market_direction.signal||"").replace(/_/g," ")}</div>{aiData.data.market_direction.reason&&<div style={{fontSize:".6rem",color:"#474556",lineHeight:1.4,marginTop:2}}>{aiData.data.market_direction.reason}</div>}</div>}{aiData.data.price_trend&&<div style={{padding:"10px 12px",borderRadius:10,background:"#f4f3f7"}}><div style={{fontSize:".46rem",fontWeight:800,color:"#787587",letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:2}}>{t("itTrend")}</div><div style={{fontSize:".76rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{aiData.data.price_trend.direction||"N/A"}</div></div>}{aiData.data.buyer_tip&&<div style={{padding:"8px 10px",borderRadius:8,background:"#522de608",fontSize:".6rem",color:"#474556",lineHeight:1.4}}><strong style={{color:"#522de6"}}>{t("itTip")}:</strong> {aiData.data.buyer_tip}</div>}</div>}
          </div>
          <div style={{padding:"16px 14px",borderRadius:16,background:"linear-gradient(135deg,#522de610,#ce2c6608)"}}>
            <div style={{textAlign:"center",marginBottom:12}}><h3 style={{fontSize:".88rem",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",marginBottom:3}}>{t("prH")}<br/><span style={{color:"#522de6"}}>{t("prH2")}</span></h3><p style={{fontSize:".6rem",color:"#787587",lineHeight:1.5}}>{t("prD")}</p></div>
            <div style={{display:"grid",gap:4,marginBottom:12}}>
              {[{i:"balance",t:lang==="hi"?"सही कीमत":"Fair Price"},{i:"apartment",t:lang==="hi"?"सप्लाई पाइपलाइन":"Supply Pipeline"},{i:"family_restroom",t:lang==="hi"?"ज़िंदगी+लोन स्ट्रेस टेस्ट":"Life+Loan Stress Test"},{i:"account_balance_wallet",t:lang==="hi"?"निवेश डिप्लॉयमेंट":"Investment Deployment"},{i:"trending_up",t:lang==="hi"?"करियर रिस्क":"Career Risk Scenario"},{i:"route",t:lang==="hi"?"घर तक का रास्ता — पर्सनलाइज़्ड":"Personalised Path to Home"},{i:"handshake",t:lang==="hi"?"निगोशिएशन":"Negotiation Playbook"},{i:"description",t:lang==="hi"?"20 साल सिमुलेशन PDF":"20yr Simulation PDF"}].map((c,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"7px 10px",borderRadius:10,background:"#fff",border:"1px solid rgba(201,196,217,.25)"}}><span className="material-symbols-outlined" style={{fontSize:13,color:"#522de6"}}>{c.i}</span><span style={{fontSize:".58rem",fontWeight:600,flex:1}}>{c.t}</span><span className="material-symbols-outlined" style={{fontSize:10,color:"#ce2c66"}}>lock</span></div>)}
            </div>
            {wlSent?<div style={{textAlign:"center",padding:"10px",borderRadius:10,background:"#22c55e10"}}><div style={{fontSize:".72rem",fontWeight:800,color:"#22c55e"}}>{t("prOk")}</div></div>
            :<form name="waitlist" method="POST" data-netlify="true" onSubmit={e=>{e.preventDefault();const fd=new FormData(e.target);fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(fd).toString()}).then(()=>setWlSent(true)).catch(()=>setWlSent(true))}}><input type="hidden" name="form-name" value="waitlist"/><input type="hidden" name="city" value={cI?.l||""}/><input type="hidden" name="state" value={sI?.l||""}/><input type="hidden" name="price" value={bp}/><input type="hidden" name="income" value={annualInc}/><input type="hidden" name="purpose" value={purpose}/><div style={{display:"flex",gap:4,marginBottom:6}}><input type="email" name="email" value={wlEmail} onChange={e=>setWlEmail(e.target.value)} placeholder="your@email.com" required style={{flex:2,height:36,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#fff",fontSize:".74rem",outline:"none"}}/><input type="text" name="pincode" value={wlPin} onChange={e=>setWlPin(e.target.value)} placeholder="Pincode" maxLength={6} style={{flex:1,height:36,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#fff",fontSize:".74rem",outline:"none",fontFamily:"'JetBrains Mono'"}}/></div><button type="submit" style={{width:"100%",padding:"10px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:800,fontSize:".72rem",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans'"}}>{t("prBtn")}</button></form>}
          </div>
        </div>}
      </div>}
      </main>
      <div style={{textAlign:"center",padding:"12px 16px 20px",fontSize:".48rem",color:"#787587",fontFamily:"monospace"}}>{t("foot")}<br/><strong style={{color:"#474556"}}>un-real-estate</strong></div>
    </div>
  );
}

/* ═══ COMPONENTS ═══ */
function DRows({rows}){if(!rows)return null;return (<div>{rows.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid #f4f3f7",gap:6}}><div style={{display:"flex",alignItems:"center",gap:4,flex:1}}>{d.cash&&<span style={{width:4,height:4,borderRadius:99,background:"#ba1a1a"}}/>}<span style={{fontSize:".62rem",color:d.b?"#1a1c1e":d.w?"#ba1a1a":"#474556",fontWeight:d.b?800:500}}>{d.l}</span></div><span style={{fontSize:".62rem",fontFamily:"'JetBrains Mono'",fontWeight:d.b?800:600,color:d.w?"#ba1a1a":"#1a1c1e",whiteSpace:"nowrap"}}>{typeof d.v==="number"?fF(d.v):d.v}</span></div>)}</div>)}
function PF({l,h,children}){return (<div style={{marginBottom:8}}><label style={{display:"block",fontSize:".62rem",fontWeight:700,color:"#474556",marginBottom:2}}>{l}{h&&<span style={{fontWeight:500,color:"#787587"}}> — {h}</span>}</label>{children}</div>)}
function PSel({v,set,o}){return (<select value={v} onChange={set} style={{width:"100%",height:36,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".74rem",outline:"none"}}>{o.map(x=><option key={String(x.v)} value={x.v}>{x.l}</option>)}</select>)}
function PNum({v,set}){return (<input type="number" value={v} onChange={e=>set(Number(e.target.value))} style={{width:"100%",height:36,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".76rem",outline:"none",fontFamily:"'JetBrains Mono'",fontWeight:600}}/>)}
function PTog({o,v,set}){return (<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{o.map(x=><button key={String(x.v)} onClick={()=>set(x.v)} style={{flex:1,minWidth:48,padding:"5px 4px",borderRadius:8,border:v===x.v?"1.5px solid #522de6":"1px solid #e3e2e6",background:v===x.v?"#522de610":"#faf9fd",color:v===x.v?"#522de6":"#787587",fontSize:".62rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{x.l}</button>)}</div>)}
function DB({color,onClick}){return (<button onClick={onClick} style={{width:"100%",padding:"10px",borderRadius:10,background:color,color:"#fff",fontWeight:800,fontSize:".72rem",border:"none",cursor:"pointer",marginTop:8,fontFamily:"'Plus Jakarta Sans'"}}>Done</button>)}
function Chip({children,accent}){return (<div style={{padding:"5px 10px",borderRadius:8,background:accent?"#522de608":"#f4f3f7",border:accent?"1px solid #522de615":"1px solid #e3e2e6",fontSize:".62rem",color:"#474556",fontFamily:"'JetBrains Mono'",marginBottom:8,lineHeight:1.5}}>{children}</div>)}
function IC({t,x,c}){return (<div className="ghost" style={{padding:12,borderRadius:12,background:"#fff",marginBottom:6,boxShadow:"0 4px 14px -4px rgba(98,95,123,.06)"}}><h4 style={{fontSize:".68rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",marginBottom:3,color:c}}>{t}</h4><p style={{fontSize:".6rem",color:"#474556",lineHeight:1.65}}>{x}</p></div>)}
function Lbl({children}){return (<p style={{fontSize:".48rem",fontWeight:700,color:"#787587",letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>{children}</p>)}
function Lg({c,l}){return (<span style={{fontSize:".48rem",color:"#474556",display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:3,borderRadius:1,background:c}}/>{l}</span>)}
function TI({w,items,c,last}){return (<div style={{display:"flex",gap:10,paddingBottom:last?0:12,position:"relative"}}>{!last&&<div style={{position:"absolute",left:5,top:16,bottom:0,width:1.5,background:"#e3e2e6"}}/>}<div style={{width:12,height:12,borderRadius:99,background:c,flexShrink:0,marginTop:2}}/><div style={{flex:1}}><div style={{fontSize:".62rem",fontWeight:800,color:c,marginBottom:2,fontFamily:"'Plus Jakarta Sans'"}}>{w}</div>{items.map((it,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",gap:4}}><div style={{display:"flex",alignItems:"center",gap:4}}>{it.cash&&<span style={{width:4,height:4,borderRadius:99,background:"#ba1a1a"}}/>}<span style={{fontSize:".6rem",color:it.y?"#1a1c1e":"#787587",fontWeight:it.y?600:400,fontStyle:it.y?"normal":"italic"}}>{it.l}</span></div>{it.v&&<span style={{fontSize:".6rem",fontFamily:"'JetBrains Mono'",fontWeight:600,color:it.cash?"#ba1a1a":it.y?"#1a1c1e":"#787587",whiteSpace:"nowrap"}}>{it.v}</span>}</div>)}</div></div>)}
function RatioCard({label,val,unit,good,warn,bad,desc}){const n=parseFloat(val);const c=n<=good?"#22c55e":n<=warn?"#f59e0b":"#ba1a1a";return (<div className="ghost" style={{padding:12,borderRadius:12,background:"#fff"}}><div style={{fontSize:".5rem",fontWeight:700,color:"#787587",marginBottom:3}}>{label}</div><div style={{fontSize:"1rem",fontWeight:900,fontFamily:"'JetBrains Mono'",color:c}}>{typeof val==="number"?Math.round(val):val}<span style={{fontSize:".58rem"}}>{unit}</span></div><p style={{fontSize:".54rem",color:"#474556",lineHeight:1.4,marginTop:3}}>{desc}</p></div>)}
