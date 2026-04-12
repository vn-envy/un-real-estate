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
prT:"Premium Intelligence",prH:"Comparing 2-3 properties?",prH2:"We'll tell you which one wins.",
prD:"Every hidden cost. Side by side. RBI data — not broker opinion. ₹499/report.",
prBtn:"Join Waitlist — Free for first 200",prOk:"You're in.",prOkD:"We'll reach out when Decision Engine launches.",
foot:"2025-26 rates · RBI HPI · BIS/FRED · Reference only.",
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
prT:"प्रीमियम",prH:"2-3 प्रॉपर्टी तुलना?",prH2:"कौन सी जीतेगी, हम बताएंगे।",
prD:"हर छिपा खर्चा। आमने-सामने। RBI डेटा। ₹499/रिपोर्ट।",
prBtn:"वेटलिस्ट — पहले 200 मुफ्त",prOk:"लिस्ट में।",prOkD:"लॉन्च पर बताएंगे।",
foot:"2025-26 दरें · RBI HPI · BIS/FRED · सिर्फ़ जानकारी।",
}};

/* ═══ DATA — RBI HPI city-wise + Repo ═══ */
const REPO={current:5.25,asOf:"Apr 2026"};
const SD={telangana:{l:"Telangana",c:{hy_u:{l:"Hyderabad (GHMC)",m:4.5,pt:.0015,cr:[4500,12e3],hpi:{y5:9.8,y10:7.2,src:"RBI HPI Q2 25-26"},sd:2,metro:true},hy_s:{l:"Hyderabad (Suburbs)",m:3.5,pt:.0012,cr:[3e3,7e3],hpi:{y5:11.2,y10:7.8,src:"RBI HPI Q2 25-26"},sd:2,metro:false},war:{l:"Warangal",m:2.5,pt:.001,cr:[2e3,4500],hpi:{y5:5.0,y10:4.2,src:"NHB RESIDEX est."}}},st:{male:.06,female:.06,joint:.06},rg:.005,rc:null,ms:.005},maharashtra:{l:"Maharashtra",c:{mum:{l:"Mumbai / MMR",m:6,pt:.002,cr:[8e3,5e4],hpi:{y5:3.8,y10:4.5,src:"RBI HPI Q2 25-26"},sd:3,metro:true},pun:{l:"Pune / PCMC",m:4.5,pt:.0015,cr:[4e3,12e3],hpi:{y5:10.4,y10:6.8,src:"RBI HPI Q2 25-26"},sd:3,metro:true},tha:{l:"Thane / Navi Mumbai",m:5,pt:.0018,cr:[5e3,15e3],hpi:{y5:5.2,y10:4.8,src:"RBI HPI Q2 25-26"},sd:3,metro:true},nag:{l:"Nagpur / Nashik",m:3,pt:.0012,cr:[2500,6e3],hpi:{y5:8.6,y10:5.5,src:"RBI HPI Q2 25-26"},sd:2,metro:false}},st:{male:.06,female:.05,joint:.06},rg:.01,rc:3e4,lb:.01},karnataka:{l:"Karnataka",c:{blr:{l:"Bengaluru (BBMP)",m:5,pt:.0018,cr:[4500,14e3],hpi:{y5:12.1,y10:8.4,src:"RBI HPI Q2 25-26"},sd:10,metro:true},bda:{l:"Bengaluru (Outskirts)",m:3.5,pt:.0014,cr:[3e3,8e3],hpi:{y5:13.5,y10:9.0,src:"RBI HPI Q2 25-26"},sd:10,metro:true},mys:{l:"Mysuru / Hubli",m:2.5,pt:.001,cr:[2e3,5e3],hpi:{y5:5.5,y10:4.0,src:"NHB RESIDEX est."}}},st:{male:.056,female:.042,joint:.05},rg:.01,rc:null,cs:.1},delhi:{l:"Delhi NCR",c:{dls:{l:"South Delhi",m:6,pt:.002,cr:[1e4,8e4],hpi:{y5:8.5,y10:5.8,src:"RBI HPI Q2 25-26"},sd:2,metro:true},dlo:{l:"East/West/North",m:4,pt:.0018,cr:[5e3,2e4],hpi:{y5:6.2,y10:4.5,src:"RBI HPI Q2 25-26"},sd:2,metro:true},noi:{l:"Noida / Gr. Noida",m:4,pt:.0015,cr:[3500,9e3],hpi:{y5:7.8,y10:5.0,src:"RBI HPI Q2 25-26"},sd:2,metro:true},gur:{l:"Gurgaon",m:5,pt:.0015,cr:[4500,14e3],hpi:{y5:9.5,y10:6.5,src:"RBI HPI Q2 25-26"},sd:2,metro:true}},st:{male:.06,female:.04,joint:.05},rg:.01,rc:null},tamilnadu:{l:"Tamil Nadu",c:{che:{l:"Chennai",m:4.5,pt:.0015,cr:[4e3,15e3],hpi:{y5:11.8,y10:7.5,src:"RBI HPI Q2 25-26"},sd:3,metro:true},cbe:{l:"Coimbatore",m:3,pt:.001,cr:[2500,6e3],hpi:{y5:5.8,y10:4.5,src:"NHB RESIDEX est."}}},st:{male:.07,female:.07,joint:.07},rg:.04,rc:null}};
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
function totalRentEsc(moRent,years){let t=0;for(let y=0;y<years;y++)t+=moRent*12*Math.pow(1.05,y);return t} // FIX: proper 5% escalation

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
  const[phase,setPhase]=useState("input");const[tab,setTab]=useState("truth");const[detailIdx,setDetailIdx]=useState(null);
  const pyrRef=useRef(null);

  useEffect(()=>{const cs=Object.keys(SD[st].c);if(!cs.includes(city))setCity(cs[0])},[st]);
  const sI=SD[st],cI=sI?.c[city];
  const ca=Math.round(sba*(1-loadF/100));
  const mark=useCallback(id=>{setDone(p=>{const n=new Set(p);n.add(id);return n});setOpen(null)},[]);
  const allDone=done.has("property")&&done.has("financing")&&done.has("interiors")&&done.has("life");
  const toggleEvt=(k)=>{setLifeEvts(p=>{const n={...p};if(n[k]!==undefined)delete n[k];else n[k]=2;return n})};
  const setEvtYr=(k,yr)=>{setLifeEvts(p=>({...p,[k]:yr}))};

  const epfWithdrawable=epfYrs>=3?Math.round(epfBal*.9):0;

  /* ═══ CALC ═══ */
  const R=useMemo(()=>{
    if(!cI)return null;
    const isUC=txn==="new"&&cst==="under",isRe=txn==="resale";
    let sr=gender==="joint"?(sI.st.joint||sI.st.male):(sI.st[gender]||sI.st.male);
    if(st==="telangana"&&(city==="hy_u"||city==="hy_s"))sr+=sI.ms||0;
    if(st==="maharashtra"&&city==="mum")sr+=sI.lb||0;
    const sd=bp*sr;let rg=bp*sI.rg;if(sI.rc)rg=Math.min(rg,sI.rc);
    let sur=0;if(st==="karnataka"&&sI.cs)sur=sd*sI.cs;
    let gst=0;if(isUC)gst=bp*(2/3)*((bp<=45e5&&ca<=645)?.01:.05); // FIX: GST on 2/3 (1/3 deemed land)
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
    const cityCAGR=cI.hpi?.y5||7;
    const paCity=bp*Math.pow(1+cityCAGR/100,tenure);
    const paReal=bp*Math.pow(1.018,tenure); // BIS/FRED inflation-adjusted India real CAGR
    const tRentV=totalRentEsc(curRent,tenure); // FIX: proper 5% escalation
    const invT=fvL+Math.max(0,fvM);
    // Bank Earns More
    const bankDelta=tInt-(paCity-bp);const bankEarnsMore=bankDelta>0;
    // 5-Year Regret Test
    const yr5Val=bp*Math.pow(1+cityCAGR/100,5);
    let yr5IntPd=0,yr5PrinPd=0;{let b=la;for(let m=0;m<60&&b>0;m++){const mi=b*(rate/100/12);yr5IntPd+=mi;yr5PrinPd+=(e-mi);b-=(e-mi)}}
    const yr5Spent=d1+(e*60)+(aR/12*60);const yr5CG=(yr5Val-bp)*0.125;const yr5Net=yr5Val-(la-yr5PrinPd)-yr5Spent-yr5CG;
    // Joint Ownership Alpha (FIX: use actual amort Year 1 principal)
    const yr1Int=amort[0]?.i||0;const yr1Prin=amort[0]?.p||0;
    const sec24b=Math.min(yr1Int,200000);const sec80c=Math.min(yr1Prin,150000);
    const singleTax=(sec24b+sec80c)*0.3;const jointTax=singleTax*2;const jointDelta=(jointTax-singleTax)*tenure;
    // Prepayment power (Rs 1L/yr)
    let prepYrs=0,prepSave=0;{const ri=rate/100/12;const extra=1e5/12;let b1=la,b2=la,m1=0,m2=0,i1=0,i2=0;while(b1>0&&m1<tenure*12){const mi=b1*ri;i1+=mi;b1-=(e-mi);m1++}while(b2>0&&m2<tenure*12){const mi=b2*ri;i2+=mi;b2-=((e-mi)+extra);m2++}prepYrs=Math.round((m1-m2)/12*10)/10;prepSave=Math.round(i1-i2)}
    // Rate stress
    const rateUp=calcEMI(la,rate+2,tenure);const emiJump=rateUp-e;
    const bankSpread=rate-REPO.current;

    // HRA tax benefit for renters (old regime)
    const basicSal=annualInc*0.4; // ~40% of CTC is basic
    const hraRcvd=basicSal*(cI.metro?0.5:0.4); // 50% metro, 40% non-metro
    const hraExempt=Math.min(hraRcvd, curRent*12 - basicSal*0.1, hraRcvd);
    const hraTaxSaved=Math.max(0,hraExempt)*0.3; // 30% bracket
    // Buyer tax benefit (already computed: singleTax, jointTax)
    // Renting hidden costs
    const secDepAmt=curRent*(cI.sd||2); // security deposit locked
    const movesIn20yr=Math.ceil(tenure/5); // ~1 move every 5 years
    const movingCostTotal=movesIn20yr*25000; // Rs 25K per move avg
    const secDepLoss=Math.round(secDepAmt*0.15*movesIn20yr); // ~15% lost per move on avg

    // POST-TAX comparison (apples to apples)
    const niftyGains=invT-d1-Math.max(0,moS)*tenure*12;
    const niftyExempt=1.25e5*tenure;
    const niftyTax=Math.max(0,niftyGains-niftyExempt)*0.125;
    const invTPostTax=invT-niftyTax;
    const propLTCG=Math.max(0,paCity-bp)*0.125;
    const propBrokSale=paCity*0.01;
    const paCityPostTax=paCity-propLTCG-propBrokSale;

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

    return {sorted,det,tProj,mul,d1,e,aR,tInt,preE,rOv,mm,bp,dp,sr,cashAmt,cFe,cPc,tCash,govT,isUC,amort,fvL,invT,paCity,paReal,tRentV,la,moS,emiRatio,housingMo,priceToInc,emergencyMo,comfPrice,collision,peakYr,dangerYears,psfSuper,psfCarpet,epfFV30,cityCAGR,bankDelta,bankEarnsMore,yr5Net,yr5Val,yr5Spent,yr5CG,yr1Int,yr1Prin,sec24b,sec80c,singleTax,jointTax,jointDelta,prepYrs,prepSave,rateUp,emiJump,bankSpread,hraTaxSaved,secDepAmt,movingCostTotal,secDepLoss,movesIn20yr,invTPostTax,paCityPostTax,niftyTax,propLTCG,propBrokSale};
  },[bp,sba,loadF,ca,st,city,cI,sI,gender,txn,cst,poss,renting,curRent,propAge,furnish,intRate,la,rate,tenure,parking,stf,bkr,cashAmt,invRet,annualInc,monthlyTH,savBeyond,lifeEvts,lumpInv,moInv,epfBal,epfMo,epfYrs,epfUse,incPct,switchFreq,switchBump,purpose,t]);

  const doTransform=()=>{setPhase("results");setTab("truth");setTimeout(()=>pyrRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100)};
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
                  {cI?.hpi&&<Chip accent>{cI.l}: {cI.hpi.y5}% CAGR (5yr) · {cI.hpi.src}</Chip>}
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
                  <div style={{fontSize:".58rem",color:la>bp*.85?"#ba1a1a":"#787587",marginBottom:6,fontFamily:"monospace"}}>LTV: {bp>0?Math.round(la/bp*100):0}%{epfUse&&epfWithdrawable>0?` | EPF: Rs ${f$(epfWithdrawable)}`:""}{purpose==="cg"&&cgAmt>0?` | CG: Rs ${f$(cgAmt)}`:""} · Repo: {REPO.current}% · Spread: {(rate-REPO.current).toFixed(1)}%</div>
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
                  {epfYrs>=3&&epfBal>0&&purpose==="first"&&<><PF l={t("epfUse")}><PTog o={[{v:true,l:t("yes")},{v:false,l:t("no")}]} v={epfUse} set={setEpfUse}/></PF>{epfUse&&<Chip accent>{t("epfWithdrawable")}: <strong>Rs {f$(epfWithdrawable)}</strong></Chip>}</>}
                  {epfYrs>=3&&epfBal>0&&purpose!=="first"&&<Chip>{lang==="hi"?"EPFO नियम: EPF से घर खरीद सिर्फ़ पहले घर के लिए।":"EPF withdrawal for home purchase is allowed only for first home under EPFO rules."}</Chip>}
                  {epfYrs>0&&epfYrs<3&&<Chip>{lang==="hi"?"3 साल पूरे होने पर 90% निकाल सकते हो":"90% withdrawable after 3 years of membership"}</Chip>}

                  <DB color={sec.color} onClick={()=>mark("life")}/>
                </div>}
              </div>}
            </div>
          )})}
        </div>
        {allDone&&!open&&<div className="anim" style={{textAlign:"center"}}><button onClick={doTransform} className="glow" style={{padding:"14px 36px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:900,fontSize:".86rem",fontFamily:"'Plus Jakarta Sans'",border:"none",cursor:"pointer"}}>{t("transform")}</button><p style={{fontSize:".62rem",color:"#787587",marginTop:6}}>{t("transformS")}</p></div>}
      </div>}

      {/* ═══════════════════════════════════════════════════════════════
                          RESULTS — 5 TABS, 3 INSIGHTS EACH
         ═══════════════════════════════════════════════════════════════ */}
      {phase==="results"&&R&&<div ref={pyrRef}>
        <section className="anim" style={{marginBottom:14,paddingTop:8}}>
          <h2 style={{fontSize:"clamp(1.4rem,5vw,1.9rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>Rs {f$(R.tProj)} <span style={{fontSize:".42em",color:"#ce2c66",fontWeight:700}}>({R.mul.toFixed(2)}x)</span></h2>
        </section>
        <div style={{display:"flex",gap:3,marginBottom:12,overflowX:"auto",paddingBottom:4}}>
          {[{k:"truth",l:lang==="hi"?"असली नंबर":"The Real Number"},{k:"afford",l:lang==="hi"?"बजट":"Affordability"},{k:"taxes",l:lang==="hi"?"टैक्स":"Taxes"},{k:"life",l:lang==="hi"?"ज़िंदगी":"Your Life"},{k:"rent",l:lang==="hi"?"किराया vs खरीद":"Rent vs Buy"}].map(x=><button key={x.k} onClick={()=>{setTab(x.k);setDetailIdx(null)}} style={{padding:"6px 12px",borderRadius:8,border:tab===x.k?"1.5px solid #522de6":"1px solid #e3e2e6",background:tab===x.k?"#522de610":"#fff",color:tab===x.k?"#522de6":"#787587",fontSize:".62rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{x.l}</button>)}
        </div>

        {/* ═══ TAB 1: THE REAL NUMBER ═══ */}
        {tab==="truth"&&<div className="anim">
          <div style={{padding:"8px 12px",borderRadius:10,background:"#522de608",border:"1px solid #522de615",marginBottom:12}}><p style={{fontSize:".62rem",color:"#474556",lineHeight:1.5}}>{lang==="hi"?"ये खर्चे का पिरामिड है — हर रुपया वज़न के हिसाब से। किसी लेयर पर टैप करो।":"Your cost pyramid — every rupee sorted by weight. Tap any layer."}</p></div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,marginBottom:16}}>
            {R.sorted.map((seg,i)=>{const w=100-(i*12),isO=detailIdx===i,hasCash=seg.id==="upfront"&&R.tCash>0;return (<div key={seg.id} className="morph" style={{width:`${w}%`,animationDelay:`${i*.08}s`}}><button onClick={()=>setDetailIdx(isO?null:i)} style={{width:"100%",padding:i===0?"12px 10px":"8px 8px",borderRadius:i===0?"4px 4px 14px 14px":i===R.sorted.length-1?"10px 10px 4px 4px":4,background:seg.color,color:"#fff",border:isO?"2px solid #fff":"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4,boxShadow:`0 4px 12px ${seg.color}25`}}><div style={{display:"flex",alignItems:"center",gap:4,overflow:"hidden"}}><span className="material-symbols-outlined" style={{fontSize:i===0?16:13,fontVariationSettings:"'FILL' 1",flexShrink:0}}>{seg.icon}</span><span style={{fontSize:i===0?".56rem":".48rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{seg.label}</span>{hasCash&&<span className="cB" style={{width:5,height:5,borderRadius:99,background:"#ff4444",border:"1.5px solid #fff"}}/>}</div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:".54rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>{f$(seg.val)}</div><div style={{fontSize:".4rem",opacity:.75}}>{seg.pct.toFixed(1)}%</div></div></button></div>)})}
          </div>
          {detailIdx!==null&&R.sorted[detailIdx]&&<div className="anim lift ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><h3 style={{fontSize:".76rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",color:R.sorted[detailIdx].color}}>{R.sorted[detailIdx].label}</h3><button onClick={()=>setDetailIdx(null)} style={{background:"none",border:"none",cursor:"pointer"}}><span className="material-symbols-outlined" style={{fontSize:14,color:"#787587"}}>close</span></button></div><DRows rows={R.det[R.sorted[detailIdx].id]}/></div>}
          {/* Day-1 Cash */}
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
              <div><div style={{fontSize:".48rem",fontWeight:700,color:"#ba1a1a",letterSpacing:".08em",textTransform:"uppercase"}}>{lang==="hi"?"पहले दिन":"Day-1 Cash"}</div><div style={{fontSize:"1.1rem",fontWeight:900,fontFamily:"'JetBrains Mono'",color:"#ba1a1a"}}>Rs {f$(R.d1)}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:".48rem",fontWeight:700,color:"#787587",textTransform:"uppercase"}}>{lang==="hi"?"हर महीना":"Monthly"}</div><div style={{fontSize:".8rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>{fM(R.e+R.aR/12)}</div></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              {[{l:t("dDP"),v:R.dp,c:"#522de6"},{l:t("s_govt"),v:R.govT,c:"#787587"},{l:t("s_int"),v:R.det.interiors.reduce((s,d)=>s+(typeof d.v==="number"?d.v:0),0),c:"#ce2c66"},{l:t("dMaintDep")+"+"+t("dCorpus"),v:(R.det.upfront[1]?.v||0)+(R.det.upfront[2]?.v||0),c:"#ac064e"},R.preE>0&&{l:t("dPreEmi"),v:R.preE,c:"#ba1a1a"},R.tCash>0&&{l:t("dCashTotal"),v:R.tCash,c:"#ba1a1a"}].filter(Boolean).map((c,i)=><div key={i} style={{padding:"5px 7px",borderRadius:8,background:c.c+"08",border:`1px solid ${c.c}15`}}><div style={{fontSize:".44rem",fontWeight:700,color:c.c}}>{c.l}</div><div style={{fontSize:".62rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>{typeof c.v==="number"?fF(c.v):c.v}</div></div>)}
            </div>
          </div>
          <Lbl>{t("ins")}</Lbl>
          <IC t={lang==="hi"?`ब्रोशर का ${R.mul.toFixed(1)} गुना`:`${R.mul.toFixed(1)}x the brochure price`} x={lang==="hi"?`बिल्डर बोलता है Rs ${f$(R.bp)}। पर ${tenure} साल में ब्याज, सरकारी शुल्क, मेंटेनेंस, इंटीरियर, डिपॉज़िट — सब मिलाकर Rs ${f$(R.tProj)} लगेंगे। ये कोई छिपी फीस नहीं — ये वो खर्चे हैं जो हर मालिक भरता है, पर ब्रोशर में कभी नहीं आते। जानकर खरीदना और अंधे होकर खरीदना — बस यही फ़र्क है।`:`The builder says Rs ${f$(R.bp)}. But over ${tenure} years, interest, government charges, maintenance, interiors, deposits — everything adds up to Rs ${f$(R.tProj)}. These are not hidden fees. They are costs every owner pays, but no brochure ever shows. The difference between knowing this before you sign and learning it after — that is what this number is for.`} c="#522de6"/>
          <IC t={lang==="hi"?`असल कीमत Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft है, Rs ${R.psfSuper.toLocaleString("en-IN")} नहीं`:`You are paying Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft, not Rs ${R.psfSuper.toLocaleString("en-IN")}`} x={lang==="hi"?`बिल्डर ${sba} sqft सुपर बिल्ट-अप बोलता है, जिसमें ${loadF}% — यानी ${sba-ca} sqft — कॉरिडोर, लिफ्ट लॉबी, जिम, पूल, स्टेयरकेस है। ये 200+ परिवारों के साथ शेयर है। तुम्हारा रहने लायक स्पेस ${ca} sqft कार्पेट है। इस पर हिसाब लगाओ तो Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft बनता है। इंटीरियर भी कार्पेट पर लगता है, मेंटेनेंस सुपर पर। RERA कार्पेट बताने को बाध्य करता है — हमेशा पूछो।`:`The builder quotes ${sba} sqft super built-up, but ${loadF}% — that is ${sba-ca} sqft — is corridors, lift lobbies, gym, pool, staircases. Shared with 200+ families. Your livable space is ${ca} sqft carpet. On that, the effective price is Rs ${R.psfCarpet.toLocaleString("en-IN")}/sqft. Interiors are fitted on carpet area, maintenance is charged on super built-up. RERA mandates carpet area disclosure — always ask for it.`} c="#ce2c66"/>
          {R.tCash>0?<IC t={lang==="hi"?`कैश Rs ${f$(R.cashAmt)} नहीं — Rs ${f$(R.tCash)} है`:`Cash is Rs ${f$(R.tCash)}, not Rs ${f$(R.cashAmt)}`} x={lang==="hi"?`जब बिल्डर कैश मांगता है, वो रसीद नहीं देता। कैश जुटाने वाला मिडलमैन ~${R.cPc}% लेता है — Rs ${f$(R.cFe)} — वो भी कैश में, बिना ट्रेल। कुल बोझ Rs ${f$(R.tCash)}। पकड़े गए तो: Section 269ST = 100% पेनल्टी, Section 68/69 = 78.6% टैक्स, बेनामी एक्ट = ज़ब्ती। IT विभाग का Project Insight AI अब आय-प्रॉपर्टी मिसमैच पकड़ता है। ये जोखिम बचत से कहीं बड़ा है।`:`When a builder demands cash, there is no receipt. The middleman who sources it charges ~${R.cPc}% — Rs ${f$(R.cFe)} — also in cash, zero trail. Total burden: Rs ${f$(R.tCash)}. If caught: Section 269ST = 100% penalty, Section 68/69 = 78.6% tax, Benami Act = confiscation. The IT Department's Project Insight AI now flags income-property mismatches. The risk far outweighs any savings.`} c="#ba1a1a"/>
          :gender==="male"&&sI.st.female<sI.st.male?<IC t={lang==="hi"?`महिला नाम से Rs ${f$(bp*(sI.st.male-sI.st.female))} बचेगा`:`A woman's name saves Rs ${f$(bp*(sI.st.male-sI.st.female))}`} x={lang==="hi"?`${sI.l} में पुरुष ${(sI.st.male*100).toFixed(1)}% स्टांप भरता है, महिला ${(sI.st.female*100).toFixed(1)}%। फ़र्क Rs ${f$(bp*(sI.st.male-sI.st.female))}। अगर पत्नी या माँ को-एप्लिकेंट हैं, तो ये सबसे आसान बचत है — लोन eligibility पर कोई असर नहीं। कई बैंक जॉइंट लोन पर रेट भी कम देते हैं। रजिस्ट्री से पहले तय करो — बाद में बदलना महंगा।`:`In ${sI.l}, men pay ${(sI.st.male*100).toFixed(1)}% stamp duty, women pay ${(sI.st.female*100).toFixed(1)}%. Difference: Rs ${f$(bp*(sI.st.male-sI.st.female))}. If your wife or mother is a co-applicant, this is the easiest saving available — no impact on loan eligibility. Many banks also offer lower rates on joint loans. Decide before registration — changing later is expensive.`} c="#0d9488"/>:null}
        </div>}

        {/* ═══ TAB 2: AFFORDABILITY ═══ */}
        {tab==="afford"&&<div className="anim">
          <div style={{padding:"10px 12px",borderRadius:10,background:R.emiRatio>40?"#ba1a1a08":"#0d948808",border:`1px solid ${R.emiRatio>40?"#ba1a1a15":"#0d948815"}`,marginBottom:12}}><p style={{fontSize:".68rem",fontWeight:700,color:R.emiRatio>40?"#ba1a1a":"#474556",lineHeight:1.5}}>{lang==="hi"?`हर महीना Rs ${f$(Math.round(R.housingMo))} मकान पर जाएगा — आय का ${Math.round(R.emiRatio)}%। बाकी Rs ${f$(Math.round(monthlyTH-R.housingMo))} में ज़िंदगी चलानी है।`:`Rs ${f$(Math.round(R.housingMo))}/mo goes to housing — ${Math.round(R.emiRatio)}% of take-home. Rs ${f$(Math.round(monthlyTH-R.housingMo))} left for everything else.`}</p></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
            <RatioCard label={t("fEmiRatio")} val={R.emiRatio} unit="%" good={30} warn={40} bad={50} desc={R.emiRatio<=30?(lang==="hi"?"आराम":"Comfortable"):R.emiRatio<=40?(lang==="hi"?"तंग":"Tight"):lang==="hi"?"खतरनाक":"Dangerous"}/>
            <RatioCard label={t("fPriceInc")} val={R.priceToInc.toFixed(1)} unit="x" good={4} warn={5} bad={7} desc={R.priceToInc<=5?(lang==="hi"?"सही":"Healthy"):lang==="hi"?"तना हुआ":"Stretched"}/>
          </div>
          <div className="ghost" style={{padding:14,borderRadius:14,background:"#fff",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:".7rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{t("fEmergency")}</span><span style={{fontSize:".76rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a"}}>{R.emergencyMo.toFixed(1)} {t("fMonthsLabel")}</span></div>
            <div style={{height:8,borderRadius:4,background:"#f4f3f7",overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a",width:`${Math.min(R.emergencyMo/6*100,100)}%`}}/></div>
          </div>
          {/* Collision chart — only if life events/investments exist */}
          {R.collision.length>0&&(Object.keys(lifeEvts).length>0||lumpInv.length>0||moInv.length>0)&&<div className="ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <Lbl>{lang==="hi"?"आय बर्न रेट":"Income Burn Rate"}</Lbl>
            <div style={{overflowX:"auto"}}><div style={{position:"relative",height:140,minWidth:Math.max(260,R.collision.length*20)}}><div style={{position:"absolute",left:0,right:0,bottom:`${60*1.3}px`,height:1,background:"#f59e0b40",zIndex:1}}/><div style={{position:"absolute",right:2,bottom:`${60*1.3+2}px`,fontSize:".34rem",color:"#f59e0b",fontWeight:800}}>60%</div><div style={{display:"flex",gap:2,alignItems:"end",height:140,zIndex:2}}>{R.collision.map((yr,i)=>{const hPct=yr.income>0?(yr.housing/yr.income)*100:0;const lPct=yr.income>0?(yr.life/yr.income)*100:0;const tot=hPct+lPct;const dz=tot>60;const uw=tot>100;return (<div key={i} style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",position:"relative"}}>{lPct>0&&<div style={{width:"100%",background:uw?"#ba1a1a":"#f59e0b",height:Math.min(lPct*1.3,80),minHeight:1,borderRadius:"2px 2px 0 0",opacity:.8}}/>}<div style={{width:"100%",background:uw?"#ba1a1a":dz?"#f59e0b":"#522de6",height:Math.min(hPct*1.3,130),minHeight:2,borderRadius:lPct>0?"0":"2px 2px 0 0",opacity:.85}}/><div style={{position:"absolute",bottom:-11,left:"50%",transform:"translateX(-50%)",fontSize:".32rem",color:dz?"#ba1a1a":"#787587",fontFamily:"monospace",fontWeight:dz?800:400}}>{yr.yr<=5||yr.yr%5===0||dz?`Y${yr.yr}`:""}</div><div style={{position:"absolute",bottom:-19,left:"50%",transform:"translateX(-50%)",fontSize:".28rem",color:dz?"#ba1a1a":"#787587",fontFamily:"monospace"}}>{Math.round(tot)}%</div></div>)})}</div></div></div>
            <div style={{display:"flex",gap:6,marginTop:14,flexWrap:"wrap"}}><Lg c="#522de6" l={lang==="hi"?"मकान":"Housing"}/><Lg c="#f59e0b" l={lang==="hi"?"ज़िंदगी":"Life"}/><Lg c="#ba1a1a" l="100%+"/></div>
          </div>}
          <Lbl>{t("ins")}</Lbl>
          {/* Insight 1: Burn rate verdict */}
          {R.peakYr&&(()=>{const dy=R.dangerYears;const pk=R.peakYr;const safe=dy.length===0&&pk.pct<40;const manageable=dy.length===0&&pk.pct>=40&&pk.pct<=60;const risky=dy.length>0&&dy.length<=3;
            return (<IC t={lang==="hi"?(safe?"सुरक्षित — आराम से चलेगा":manageable?"संभलेगा — पर तंग":risky?`${dy.length} साल जोखिम में`:`${dy.length} साल खतरे में`):(safe?"Safe — comfortable margin":manageable?"Manageable — but tight":risky?`${dy.length} years in the danger zone`:`${dy.length} years in the red`)} x={lang==="hi"?(safe?`तुम्हारी आय बढ़त, ज़िंदगी के खर्चे, और EMI — सब मिलाकर सबसे तंग साल (${pk.yr}) में भी ${pk.pct}% रहता है। 60% से नीचे मतलब अचानक कोई बड़ा खर्चा आए — मेडिकल, नौकरी में गैप, रेट बढ़त — तो भी EMI नहीं छूटेगी। ये अच्छी जगह है।`:manageable?`सबसे तंग साल ${pk.yr}: आय का ${pk.pct}%। 60% से नीचे है, पर 40% से ऊपर — मतलब Rs ${f$(Math.round(monthlyTH-R.housingMo))}/मो बचता है जिसमें खाना, ट्रांसपोर्ट, बच्चे, और बाकी सब चलाना है। अभी ये चलेगा, पर अगर एक बड़ा अचानक खर्चा आया — और ज़िंदगी में आता है — तो सांस रुकेगी।`:risky?`साल ${dy.map(y=>y.yr).join(", ")} में तुम्हारी आय का 60% से ज़्यादा सिर्फ़ मकान + ज़िंदगी के खर्चों में जाएगा। इन सालों में बाकी सब — बचत, छुट्टी, बीमा, बच्चों की ज़रूरतें — कम पड़ेंगी। कीमत 10-15% कम करने पर बात करो, या टेन्योर 25 साल करो।`:`${dy.length} साल लगातार 60%+ — ये टिकाऊ नहीं है। ${pk.yr} साल में ${pk.pct}% तक पहुंचता है। Rs ${f$(R.comfPrice)} तक की प्रॉपर्टी तुम्हारी आय के हिसाब से ज़्यादा सही रहती। ये "कोई नहीं बोलता" वाली बात है — पर सच है।`):(safe?`Even in your tightest year (Year ${pk.yr}), housing plus life costs take just ${pk.pct}% of income. Below 60% means you can absorb surprises — a medical bill, a job gap, a rate hike — without missing EMI. This is a solid position.`:manageable?`Tightest year is ${pk.yr} at ${pk.pct}% of income. Below 60% but above 40% — Rs ${f$(Math.round(monthlyTH-R.housingMo))}/mo left for food, transport, kids, everything. It works today, but one large surprise — and life does surprise — will squeeze.`:risky?`Years ${dy.map(y=>y.yr).join(", ")} push past 60% of income for housing plus life costs. During these years, everything else — savings, holidays, insurance, children's needs — gets compressed. Negotiate 10-15% lower, or extend tenure to 25 years.`:`${dy.length} years above 60% — this is not sustainable. Year ${pk.yr} peaks at ${pk.pct}%. A property around Rs ${f$(R.comfPrice)} fits your income more honestly. Nobody tells you this — but it is true.`)} c={safe?"#22c55e":manageable?"#f59e0b":"#ba1a1a"}/>);
          })()}
          {/* Insight 2: Rate stress */}
          <IC t={lang==="hi"?`ब्याज दर +2% = EMI Rs ${f$(Math.round(R.emiJump))} बढ़ जाएगी`:`If rates rise 2%, your EMI jumps Rs ${f$(Math.round(R.emiJump))}`} x={lang==="hi"?`तुम्हारा लोन फ्लोटिंग रेट पर है — RBI रेपो बढ़ाए तो बैंक EMI बढ़ाता है। ${rate}% → ${rate+2}% मतलब ${fM(R.e)} → ${fM(R.rateUp)}। साल भर Rs ${f$(Math.round(R.emiJump*12))} ज़्यादा। 2022-23 में RBI ने 6 महीने में 2.5% बढ़ाया था — ये hypothetical नहीं, हो चुका है। सलाह: EMI बजट में 15-20% बफर रखो। अगर ${fM(R.e)} है, तो ${fM(Math.round(R.e*1.2))} तक झेलने की ताकत होनी चाहिए।`:`Your loan is on a floating rate — when RBI raises repo, your bank raises your EMI. ${rate}% → ${rate+2}% means ${fM(R.e)} → ${fM(R.rateUp)}. That is Rs ${f$(Math.round(R.emiJump*12))}/yr extra. In 2022-23, RBI hiked 2.5% in just 6 months — this is not hypothetical, it has happened. Budget your EMI with a 15-20% buffer. If EMI is ${fM(R.e)}, make sure you can survive ${fM(Math.round(R.e*1.2))}.`} c="#ac064e"/>
          {/* Insight 3: Bank spread */}
          <IC t={lang==="hi"?`तुम्हारा बैंक ${R.bankSpread.toFixed(1)}% ज़्यादा ले रहा है`:`Your bank charges ${R.bankSpread.toFixed(1)}% above RBI's repo rate`} x={lang==="hi"?`RBI रेपो रेट ${REPO.current}%, तुम्हारा होम लोन रेट ${rate}%। फ़र्क ${R.bankSpread.toFixed(2)}% — ये बैंक का मार्जिन है। ${R.bankSpread>3?"3% से ज़्यादा स्प्रेड पर बात करो — दूसरे बैंक का लेटर ऑफ ऑफर लेकर जाओ, ये सबसे मज़बूत बार्गेनिंग टूल है।":"2.5-3% स्प्रेड सामान्य है। पर हर 0.25% कम = Rs "+f$(Math.round(R.e*tenure*12*0.0025))+" बचत टेन्योर में।"} हर 6 महीने में अपना रेट चेक करो — RLLR/EBLR रीसेट पर बैंक कभी-कभी कट पास नहीं करता।`:`RBI repo is ${REPO.current}%, your home loan is ${rate}%. The spread of ${R.bankSpread.toFixed(2)}% is the bank's margin. ${R.bankSpread>3?"Above 3% spread — negotiate. Walk in with a competing bank's offer letter. That is the strongest bargaining tool.":"2.5-3% is normal. But every 0.25% lower = Rs "+f$(Math.round(R.e*tenure*12*0.0025))+" saved over tenure."} Check your rate every 6 months — banks sometimes skip passing on RBI cuts.`} c={R.bankSpread>3?"#ba1a1a":"#5e5b77"}/>
        </div>}

        {/* ═══ TAB 3: TAXES ═══ */}
        {tab==="taxes"&&<div className="anim">
          <div style={{padding:"10px 12px",borderRadius:10,background:"#78758708",border:"1px solid #78758715",marginBottom:12}}><p style={{fontSize:".68rem",fontWeight:700,color:"#474556",lineHeight:1.5}}>{lang==="hi"?`रजिस्ट्री पर Rs ${f$(R.govT)} सरकार को। Sec 24(b)+80C से Rs ${f$(Math.round(R.singleTax))}/साल टैक्स बचा सकते हो — जॉइंट ओनरशिप में दोगुना।`:`Rs ${f$(R.govT)} to the government at registration. Sec 24(b)+80C saves Rs ${f$(Math.round(R.singleTax))}/yr in taxes — double with joint ownership.`}</p></div>
          <Lbl>{lang==="hi"?"सरकारी शुल्क":"Government Charges"}</Lbl>
          <div className="ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}><DRows rows={R.det.government}/></div>
          <Lbl>{t("ins")}</Lbl>
          {/* Insight 1: Joint ownership / Gender savings */}
          {gender!=="joint"&&R.jointDelta>0?<IC t={lang==="hi"?`जॉइंट ओनरशिप से Rs ${f$(R.jointDelta)} बचत — ${tenure} साल में`:`Joint ownership saves Rs ${f$(R.jointDelta)} over ${tenure} years`} x={lang==="hi"?`होम लोन में दो मालिक हों तो दोनों अलग-अलग टैक्स बचत क्लेम कर सकते हैं। Section 24(b): ब्याज पर Rs ${f$(R.sec24b)}/साल (प्रति व्यक्ति, 2L कैप)। Section 80C: मूलधन पर Rs ${f$(R.sec80c)}/साल (प्रति व्यक्ति, 1.5L कैप)। 30% टैक्स ब्रैकेट में: अकेला = Rs ${f$(Math.round(R.singleTax))}/साल, जॉइंट = Rs ${f$(Math.round(R.jointTax))}/साल। फ़र्क Rs ${f$(Math.round(R.jointTax-R.singleTax))}/साल × ${tenure} साल = Rs ${f$(R.jointDelta)}। ये पैसा कहीं और से नहीं मिलता — सिर्फ़ structuring से। रजिस्ट्री से पहले तय करो।`:`When two people own a home loan jointly, both can claim tax deductions separately. Section 24(b): Rs ${f$(R.sec24b)}/yr each on interest (Rs 2L cap). Section 80C: Rs ${f$(R.sec80c)}/yr each on principal (Rs 1.5L cap). At 30% bracket: single = Rs ${f$(Math.round(R.singleTax))}/yr, joint = Rs ${f$(Math.round(R.jointTax))}/yr. Difference: Rs ${f$(Math.round(R.jointTax-R.singleTax))}/yr × ${tenure} years = Rs ${f$(R.jointDelta)}. This money comes from nowhere but structuring. Decide before registration.`} c="#522de6"/>
          :gender==="male"&&sI.st.female<sI.st.male?<IC t={lang==="hi"?`महिला नाम से Rs ${f$(bp*(sI.st.male-sI.st.female))} स्टांप बचत`:`Woman's name saves Rs ${f$(bp*(sI.st.male-sI.st.female))} in stamp duty`} x={lang==="hi"?`${sI.l} में पुरुष ${(sI.st.male*100).toFixed(1)}% स्टांप भरता है, महिला ${(sI.st.female*100).toFixed(1)}%। पत्नी या माँ को-एप्लिकेंट बनाओ — लोन eligibility पर कोई असर नहीं, पर रजिस्ट्री पर Rs ${f$(bp*(sI.st.male-sI.st.female))} सीधा बचता है। कई बैंक जॉइंट लोन पर 0.05% कम रेट भी देते हैं।`:`In ${sI.l}, men pay ${(sI.st.male*100).toFixed(1)}% stamp, women pay ${(sI.st.female*100).toFixed(1)}%. Make wife or mother co-applicant — no impact on eligibility, Rs ${f$(bp*(sI.st.male-sI.st.female))} saved at registration. Many banks also offer 0.05% lower rate on joint loans.`} c="#0d9488"/>:null}
          {/* Insight 2: Prepayment */}
          {(()=>{const flipYr=(R.amort.findIndex(a=>a.p>a.i)+1)||tenure;return (
            <IC t={lang==="hi"?`हर साल Rs 1L प्रीपेमेंट = ${R.prepYrs} साल जल्दी ख़त्म`:`Rs 1L/yr extra = loan closes ${R.prepYrs} years early`} x={lang==="hi"?`प्रीपेमेंट सीधे मूलधन से कटता है — और उतने पर भविष्य का सारा ब्याज बच जाता है। Rs 1L/साल (Rs 8,333/मो) ज़्यादा देने से Rs ${f$(R.prepSave)} ब्याज बचता है और लोन ${R.prepYrs} साल पहले ख़त्म। सबसे ज़्यादा असर पहले ${flipYr} सालों में — जब EMI का 70-80% ब्याज है। फ्लोटिंग रेट लोन पर कोई प्रीपेमेंट पेनल्टी नहीं। बोनस, इंक्रीमेंट, टैक्स रिफंड — ये सब प्रीपेमेंट में डालो, गाड़ी या छुट्टी में नहीं।`:`Prepayment hits principal directly — and every rupee of principal you clear early saves all future interest on it. Rs 1L/yr extra (Rs 8,333/mo) saves Rs ${f$(R.prepSave)} in interest and closes the loan ${R.prepYrs} years early. Maximum impact in the first ${flipYr} years — when 70-80% of each EMI is interest. No prepayment penalty on floating rate loans. Bonuses, increments, tax refunds — route them to prepayment, not a car or vacation.`} c="#0d9488"/>
          )})()}
          {/* Insight 3: Purpose-specific */}
          {(()=>{const ry=bp>0?((curRent*12)/bp*100):0;
            if(purpose==="first")return (<IC t={lang==="hi"?"पहला घर — दिल और दिमाग दोनों से":"First home — heart and head both matter"} x={lang==="hi"?`पहला घर भावनात्मक फ़ैसला है — और होना भी चाहिए। पर नंबर भी देखो: आय Rs ${f$(annualInc)}/साल पर Rs ${f$(bp)} की प्रॉपर्टी ${R.priceToInc.toFixed(1)}x है। बैंकर्स कहते हैं 5x तक "आरामदायक", 7x पर "तना हुआ"। PMAY-CLSS सब्सिडी चेक करो — Rs 2.67L तक मिल सकती है अगर eligible हो। कुछ राज्य फर्स्ट-टाइम डिस्काउंट भी देते हैं। ये घर तुम्हारा पहला एसेट है — इसे सही structure करो तो ये ज़िंदगी भर काम करेगा।`:`A first home is an emotional decision — and it should be. But check the numbers too: at Rs ${f$(annualInc)}/yr income, this Rs ${f$(bp)} property is ${R.priceToInc.toFixed(1)}x. Bankers consider 5x "comfortable" and 7x "stretched." Check PMAY-CLSS subsidy — up to Rs 2.67L if eligible. Some states offer first-time buyer discounts. This is your first asset — structure it right and it works for you for life.`} c="#522de6"/>);
            if(purpose==="invest")return (<IC t={lang==="hi"?"निवेश: ये कमा रही है या सिर्फ़ बैठी है?":"Investment: is this earning or just sitting?"} x={lang==="hi"?`निवेश प्रॉपर्टी का सवाल सरल है: क्या ये Nifty 50 ETF (~12% CAGR) से बेहतर कर सकती है? इसका रेंटल यील्ड ${ry.toFixed(1)}% है — FD (7%) से भी कम। और FD कल तोड़ सकते हो, प्रॉपर्टी बेचने में 6-12 महीने लगते हैं। अगर इलाका 7%+ appreciation दे रहा है तो ठीक — वरना लिक्विड इंस्ट्रूमेंट बेहतर है।`:`The question for investment property is simple: can it beat a Nifty 50 ETF (~12% CAGR)? Rental yield here is ${ry.toFixed(1)}% — lower than even FDs (7%). And you can break an FD tomorrow — selling property takes 6-12 months. If the area is growing 7%+, it works. Otherwise, liquid instruments do better.`} c="#ac064e"/>);
            if(purpose==="rental"){const moOut=R.housingMo;const netMo=curRent-moOut;const surplus=netMo>0;return (<IC t={lang==="hi"?(surplus?`किराये से Rs ${f$(Math.round(netMo))}/मो बचता है`:`हर महीना Rs ${f$(Math.abs(Math.round(netMo)))} जेब से — किराया पूरा कवर नहीं करता`):(surplus?`Rental income: Rs ${f$(Math.round(netMo))}/mo surplus after all costs`:`Rs ${f$(Math.abs(Math.round(netMo)))}/mo from your pocket — rent does not cover full costs`)} x={lang==="hi"?`किराया ${fM(curRent)} vs कुल मासिक खर्चा ${fM(Math.round(moOut))} (EMI + मेंटेनेंस + टैक्स + बीमा)। ${surplus?"हर महीना सरप्लस — अच्छी बात।":"किराया EMI कवर नहीं करता — 'किराये से EMI भर दूंगा' सिर्फ़ तब सच जब किराया EMI + सारे खर्चे कवर करे।"} पर ध्यान: (1) साल में 1-2 महीने खाली रहने का रिस्क — तब ${fM(Math.round(moOut))} पूरा जेब से। (2) रेंटल इनकम पर इनकम टैक्स लगता है। यील्ड ${ry.toFixed(1)}% — ${ry>=4?"4% से ऊपर, ठीक है।":"4% से कम, FD बेहतर।"}`:`Rent ${fM(curRent)} vs total cost ${fM(Math.round(moOut))} (EMI + maintenance + tax + insurance). ${surplus?"Monthly surplus — good.":"Rent doesn't cover EMI — 'tenant will pay my EMI' is only true when rent covers EMI plus all costs."} Factor in: (1) 1-2 months vacancy/yr — ${fM(Math.round(moOut))} fully from pocket. (2) Rental income is taxable. Yield ${ry.toFixed(1)}% — ${ry>=4?"above 4%, reasonable.":"below 4%, FDs do better."}`} c={surplus?"#0d9488":"#ce2c66"}/>)}
            if(purpose==="tax"){const ts=Math.round((R.sec24b+R.sec80c)*0.3);return (<IC t={lang==="hi"?`टैक्स बचत Rs ${f$(ts)}/साल — पर EMI Rs ${f$(Math.round(R.e*12))}/साल`:`Tax saving Rs ${f$(ts)}/yr — but EMI is Rs ${f$(Math.round(R.e*12))}/yr`} x={lang==="hi"?`24(b): ब्याज पर Rs ${f$(R.sec24b)}, 80C: मूलधन Rs ${f$(R.sec80c)}। 30% ब्रैकेट = Rs ${f$(ts)}/साल बचत। पर इसके लिए Rs ${f$(Math.round(R.e*12))}/साल EMI भर रहे हो — ratio 1:${Math.round(R.e*12/Math.max(1,ts))}। ELSS (80C) + NPS (50K extra) से वही 1.5L + 50K बचत मिलती है — बिना 20 साल लोन बांधे। टैक्स बचत "बोनस" है अगर घर चाहिए — "वजह" नहीं होनी चाहिए।`:`24(b): Rs ${f$(R.sec24b)} on interest, 80C: Rs ${f$(R.sec80c)} on principal. At 30% = Rs ${f$(ts)}/yr saved. But you are paying Rs ${f$(Math.round(R.e*12))}/yr in EMI — ratio 1:${Math.round(R.e*12/Math.max(1,ts))}. ELSS (80C) + NPS (extra 50K) give the same 1.5L + 50K deduction — without a 20-year loan. Tax saving is a "bonus" if you want a home — it should not be the "reason."`} c="#5e5b77"/>)}
            if(purpose==="cg"){const dpPocket=Math.max(0,(bp-la)-cgAmt);return (<IC t={lang==="hi"?`CG Rs ${f$(cgAmt)} लगा रहे हो — Rs ${f$(Math.round(cgAmt*.125))} टैक्स बचत`:`Deploying CG Rs ${f$(cgAmt)} — saves Rs ${f$(Math.round(cgAmt*.125))} in LTCG tax`} x={lang==="hi"?`Rs ${f$(cgAmt)} कैपिटल गेन इस प्रॉपर्टी के डाउन पेमेंट (Rs ${f$(bp-la)}) में जा रहा है। अगर नहीं लगाते: 12.5% LTCG = Rs ${f$(Math.round(cgAmt*.125))} टैक्स। Section 54: एक रेज़िडेंशियल से दूसरे में। Section 54F: कोई भी long-term एसेट से रेज़िडेंशियल में। 2 साल में रजिस्ट्री ज़रूरी। अगर 6 महीने में invest नहीं कर पा रहे तो Capital Gains Account Scheme (CGAS) में जमा करो — वरना छूट खो दोगे। तुम्हारा ताज़ा पैसा: Rs ${f$(dpPocket)}।`:`Rs ${f$(cgAmt)} capital gain goes into this property's down payment (Rs ${f$(bp-la)}). Without reinvestment: 12.5% LTCG = Rs ${f$(Math.round(cgAmt*.125))} tax. Section 54: residential to residential. Section 54F: any long-term asset to residential. Must register within 2 years. If you cannot invest within 6 months, deposit in Capital Gains Account Scheme (CGAS) — otherwise the exemption is lost. Your fresh money in this deal: Rs ${f$(dpPocket)}.`} c="#522de6"/>)}
            return null;
          })()}
        </div>}

        {/* ═══ TAB 4: YOUR LIFE ═══ */}
        {tab==="life"&&<div className="anim">
          {R.peakYr&&<div style={{padding:"10px 12px",borderRadius:10,background:R.peakYr.pct>60?"#ba1a1a08":"#0d948808",border:`1px solid ${R.peakYr.pct>60?"#ba1a1a15":"#0d948815"}`,marginBottom:12}}><p style={{fontSize:".68rem",fontWeight:700,color:R.peakYr.pct>60?"#ba1a1a":"#474556",lineHeight:1.5}}>{lang==="hi"?`साल ${R.peakYr.yr} तुम्हारा सबसे तंग साल होगा — आय का ${R.peakYr.pct}% मकान + ज़िंदगी में जाएगा।`:`Year ${R.peakYr.yr} will be your tightest — ${R.peakYr.pct}% of income goes to housing plus life.`}</p></div>}
          <Lbl>{t("tlWho")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <TI w={t("tlBook")} items={[{l:t("tlBook10"),v:fF(Math.min(bp*.1,5e5)),y:true},{l:t("tlLoanFee"),v:fF(la*.005),y:true}]} c="#522de6"/>
            <TI w={t("tlReg")} items={[{l:t("tlDP"),v:fF(R.dp),y:true},{l:t("tlStampLeg"),v:fF(R.govT),y:true},R.tCash>0&&{l:t("tlCashFee"),v:fF(R.tCash),y:true,cash:true}].filter(Boolean)} c="#ce2c66"/>
            {R.isUC&&<TI w={t("tlConst")+" ("+poss+"mo)"} items={[{l:t("tlPreEmi"),v:fF(R.preE),y:true},R.rOv>0&&{l:t("tlYourRent"),v:fF(R.rOv),y:true},{l:t("tlBankDisb"),v:"Rs "+f$(la),y:false}].filter(Boolean)} c="#ac064e"/>}
            <TI w={t("tlPoss")} items={[{l:t("tlSocDep"),v:fF((R.det.upfront[1]?.v||0)+(R.det.upfront[2]?.v||0)+25e3),y:true}]} c="#5e5b77"/>
            <TI w={t("tlEmiPd")+" ("+tenure+"yr)"} items={[{l:t("tlTotalEmi"),v:fF(R.e*tenure*12),y:true},{l:t("tlBankInt"),v:fF(R.tInt),y:false}]} c="#522de6" last/>
          </div>
          {/* LIFE MILESTONES on tenure */}
          {Object.keys(lifeEvts).length>0&&<div>
            <Lbl>{lang==="hi"?"ज़िंदगी के पड़ाव × लोन":"Life Milestones × Your Loan"}</Lbl>
            <div className="ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
              <div style={{position:"relative",height:40,marginBottom:8}}>
                <div style={{position:"absolute",top:18,left:0,right:0,height:3,background:"#e3e2e6",borderRadius:2}}/>
                {Array.from({length:Math.min(tenure,20)}).map((_,i)=>{const yr=i+1;const pct=(yr/Math.min(tenure,20))*100;const evts=Object.entries(lifeEvts).filter(([,v])=>v===yr);const isFlip=(R.amort.findIndex(a=>a.p>a.i)+1)===yr;return (<div key={yr} style={{position:"absolute",left:`${pct}%`,transform:"translateX(-50%)",top:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                  {evts.length>0&&evts.map(([k],j)=><div key={j} style={{width:14,height:14,borderRadius:99,background:k==="marriage"?"#ce2c66":k.includes("child")?"#522de6":k==="edu"?"#6B4EFF":k==="parents"?"#ac064e":"#787587",border:"2px solid #fff",display:"grid",placeItems:"center",marginBottom:1,boxShadow:"0 2px 6px rgba(0,0,0,.15)"}}><span className="material-symbols-outlined" style={{fontSize:7,color:"#fff",fontVariationSettings:"'FILL' 1"}}>{k==="marriage"?"favorite":k.includes("child")?"child_care":k==="edu"?"school":"elderly"}</span></div>)}
                  {isFlip&&<div style={{width:8,height:8,borderRadius:99,background:"#22c55e",border:"2px solid #fff",marginBottom:1}}/>}
                  {(yr===1||yr%5===0||yr===tenure||evts.length>0||isFlip)&&<div style={{fontSize:".32rem",color:evts.length>0?"#1a1c1e":"#787587",fontWeight:evts.length>0?800:400,marginTop:evts.length>0||isFlip?1:20,fontFamily:"monospace"}}>{yr}</div>}
                </div>)})}
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {Object.entries(lifeEvts).map(([k,yr])=><span key={k} style={{fontSize:".48rem",color:"#474556",display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:99,background:k==="marriage"?"#ce2c66":k.includes("child")?"#522de6":k==="edu"?"#6B4EFF":"#ac064e"}}/>{lang==="hi"?{marriage:"शादी",child1:"पहला बच्चा",child2:"दूसरा बच्चा",edu:"शिक्षा",parents:"बुज़ुर्ग"}[k]:k.replace("child1","1st child").replace("child2","2nd child")} Y{yr}</span>)}
                {(R.amort.findIndex(a=>a.p>a.i)+1)>0&&<span style={{fontSize:".48rem",color:"#474556",display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:6,borderRadius:99,background:"#22c55e"}}/>{lang==="hi"?"ब्याज↔मूलधन फ्लिप":"Interest↔Principal flip"}</span>}
              </div>
            </div>
          </div>}
          <Lbl>{t("tlAmort")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{overflowX:"auto"}}><div style={{display:"flex",gap:2,alignItems:"end",height:100,minWidth:Math.max(240,R.amort.length*12)}}>{R.amort.map((yr,i)=>{const tot=yr.i+yr.p,ip=tot>0?(yr.i/tot)*100:50;return (<div key={i} style={{flex:1,minWidth:6,display:"flex",flexDirection:"column",height:"100%"}}><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div style={{width:"100%",borderRadius:"2px 2px 0 0",background:"#ce2c66",height:`${ip}%`,minHeight:1}}/><div style={{width:"100%",borderRadius:"0 0 2px 2px",background:"#522de6",height:`${100-ip}%`,minHeight:1}}/></div>{(yr.yr===1||yr.yr%5===0||yr.yr===tenure)&&<div style={{fontSize:".38rem",color:"#787587",marginTop:1,textAlign:"center",fontFamily:"monospace"}}>Y{yr.yr}</div>}</div>)})}</div><div style={{display:"flex",gap:10,marginTop:8}}><Lg c="#ce2c66" l={t("interest")}/><Lg c="#522de6" l={t("principal")}/></div></div>
            <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:"#f4f3f7",fontSize:".62rem",color:"#474556",lineHeight:1.5}}>{t("tlY1",{pct:R.amort[0]?Math.round(R.amort[0].i/(R.e*12)*100):"?",flip:(R.amort.findIndex(a=>a.p>a.i)+1)||"?"})}</div>
          </div>
          <Lbl>{t("ins")}</Lbl>
          {/* Insight 1: The bank's years */}
          {(()=>{const flipYr=(R.amort.findIndex(a=>a.p>a.i)+1)||tenure;return (
            <IC t={lang==="hi"?`पहले ${flipYr} साल बैंक के हैं — तुम्हारे नहीं`:`The first ${flipYr} years belong to the bank — not you`} x={lang==="hi"?`EMI का मतलब लगता है "लोन चुका रहा हूं" — पर पहले साल Rs ${f$(Math.round(R.e*12))} EMI में से Rs ${f$(R.yr1Int)} (${Math.round(R.yr1Int/(R.e*12)*100)}%) सिर्फ़ ब्याज है। मतलब Rs ${f$(R.yr1Prin)} ही लोन कम करता है। ${flipYr} साल तक बैंक तुम्हारी EMI से ज़्यादा कमाता है बनिस्बत तुम्हारे लोन कम होने के। अगर 5 साल बाद बेचना पड़े, तो लोन लगभग उतना ही बचा — ज़्यादातर पैसा ब्याज में गया। ये बैंक का बिज़नेस मॉडल है, और ये कानूनी है — बस जानकर चलो।`:`EMI feels like "I am paying off my loan" — but in Year 1, Rs ${f$(Math.round(R.e*12))} in EMI contains Rs ${f$(R.yr1Int)} (${Math.round(R.yr1Int/(R.e*12)*100)}%) of pure interest. Only Rs ${f$(R.yr1Prin)} actually reduces the loan. For ${flipYr} years, the bank earns more from your EMI than your loan decreases. If you sell after 5 years, the loan is barely reduced — most of your money went to interest. This is the bank's business model, and it is legal — just know it going in.`} c="#ce2c66"/>
          )})()}
          {/* Insight 2: 5-Year Regret Test */}
          <IC t={lang==="hi"?(R.yr5Net>=0?`5 साल में बेचो तो Rs ${f$(R.yr5Net)} फायदा`:`5 साल में बेचो तो Rs ${f$(Math.abs(R.yr5Net))} नुकसान`):(R.yr5Net>=0?`Sell at Year 5: you walk away with Rs ${f$(R.yr5Net)}`:`Sell at Year 5: you lose Rs ${f$(Math.abs(R.yr5Net))}`)} x={lang==="hi"?`ये "क्या होगा अगर ज़िंदगी बदल गई" टेस्ट है। 5 साल में ${R.cityCAGR}% CAGR (${cI.l} average) पर प्रॉपर्टी Rs ${f$(R.yr5Val)} होगी। तुमने Rs ${f$(R.yr5Spent)} खर्च किए होंगे (EMIs + Day-1 + recurring)। Rs ${f$(Math.round(R.yr5PrinPd))} इक्विटी बनी। बेचने पर 12.5% LTCG: Rs ${f$(Math.round(R.yr5CG))}। ${R.yr5Net<0?"नेट पोज़िशन नेगेटिव — मतलब अगर नौकरी बदलने, शहर बदलने, या परिवार बढ़ने का chance है 5 साल में, तो ये प्रॉपर्टी तुम्हें बांध देगी। किराया ज़्यादा flexible है।":"नेट पॉज़िटिव — अगर appreciation बनी रहे तो जल्दी निकलना भी चलेगा। पर याद रखो: बेचने में 6-12 महीने लगते हैं + ब्रोकरेज।"}`:`This is the "what if life changes" test. At ${R.cityCAGR}% CAGR (${cI.l} average), your property reaches Rs ${f$(R.yr5Val)} in 5 years. You would have spent Rs ${f$(R.yr5Spent)} total (EMIs + Day-1 + recurring). Rs ${f$(Math.round(R.yr5PrinPd))} of equity built. 12.5% LTCG on sale: Rs ${f$(Math.round(R.yr5CG))}. ${R.yr5Net<0?"Net position is negative — if there is any chance of a job change, city move, or family growth in 5 years, this property will lock you in. Renting is more flexible.":"Net positive — early exit works if appreciation holds. But remember: selling takes 6-12 months plus brokerage."}`} c={R.yr5Net>=0?"#5e5b77":"#ba1a1a"}/>
          {/* Insight 3: Pre-EMI OR EPF tradeoff — whichever applies */}
          {R.preE>0?<IC t={lang==="hi"?`Rs ${f$(R.preE+R.rOv)} — मूव-इन से पहले का बोझ`:`Rs ${f$(R.preE+R.rOv)} — the cost before you even move in`} x={lang==="hi"?`अंडर-कंस्ट्रक्शन प्रॉपर्टी में ${poss} महीने तक बैंक लोन किश्तों में देता है — और तुम सिर्फ़ ब्याज भरते हो। ये "प्री-EMI" है: Rs ${f$(R.preE)}। एक रुपया भी लोन कम नहीं करता — बैंक को pure profit है। ${renting&&R.rOv>0?`ऊपर से अभी किराया Rs ${fM(curRent)} भी चल रहा है — ${poss} महीने × ${fM(curRent)} = Rs ${f$(R.rOv)}। दो घरों का बोझ एक साथ।`:""}रेडी-टू-मूव ज़्यादा transparent है — EMI शुरू, शिफ्ट भी शुरू। पर अंडर-कंस्ट्रक्शन में कीमत 10-15% कम मिलती है। ट्रेड-ऑफ तुम्हारा है।`:`In under-construction properties, the bank disburses the loan in stages over ${poss} months — and you pay interest-only on the disbursed amount. This "pre-EMI" is Rs ${f$(R.preE)}. Not a single rupee reduces your loan — it is pure bank profit. ${renting&&R.rOv>0?`On top of that, you are paying rent ${fM(curRent)} — ${poss} months × ${fM(curRent)} = Rs ${f$(R.rOv)}. Two housing costs running in parallel.`:""} Ready-to-move is more transparent — EMI starts, you move in. But under-construction is typically 10-15% cheaper. The trade-off is yours.`} c="#ba1a1a"/>
          :epfUse&&epfWithdrawable>0?(()=>{const intSaved=Math.round(epfWithdrawable*(rate/100)*tenure*.4);return (<IC t={lang==="hi"?`EPF Rs ${f$(epfWithdrawable)} — आज बचाओ, कल खोओ`:`EPF Rs ${f$(epfWithdrawable)} — save today, lose tomorrow`} x={lang==="hi"?`EPF से Rs ${f$(epfWithdrawable)} निकालकर डाउन पेमेंट में डालोगे तो लोन कम, EMI कम, ~Rs ${f$(intSaved)} ब्याज बचेगा। पर ये पैसा 8.25% पर 30 साल compound होता = रिटायरमेंट में Rs ${f$(R.epfFV30)}। तुम आज Rs ${f$(intSaved)} बचाने के लिए Rs ${f$(R.epfFV30)} रिटायरमेंट का दांव पर लगा रहे हो। सलाह: सिर्फ़ उतना निकालो जितना 20% DP पूरा करने में कमी है। बाकी compound होने दो — बूढ़े तुम आज के तुम को धन्यवाद बोलेंगे।`:`Withdrawing Rs ${f$(epfWithdrawable)} from EPF for down payment reduces your loan, lowers EMI, and saves ~Rs ${f$(intSaved)} in interest. But this money at 8.25% for 30 years compounds to Rs ${f$(R.epfFV30)} at retirement. You are betting Rs ${f$(R.epfFV30)} of retirement money to save Rs ${f$(intSaved)} in interest today. Withdraw only what is needed to reach 20% down payment. Let the rest compound — your older self will thank you.`} c="#0d9488"/>)})()
          :null}
        </div>}

        {/* ═══ TAB 5: RENT VS BUY ═══ */}
        {tab==="rent"&&<div className="anim">
          <div style={{padding:"10px 12px",borderRadius:10,background:"#522de608",border:"1px solid #522de615",marginBottom:12}}><p style={{fontSize:".68rem",fontWeight:700,color:"#474556",lineHeight:1.5}}>{lang==="hi"?`${cI.l} में प्रॉपर्टी ${R.cityCAGR}% CAGR से बढ़ रही है (${cI.hpi?.src||"est."})। ${tenure} साल में Rs ${f$(R.paCity)}। ये "अगर बढ़त बनी रहे" है — guarantee नहीं।`:`Property in ${cI.l} has grown at ${R.cityCAGR}% CAGR (${cI.hpi?.src||"est."}). In ${tenure} years that is Rs ${f$(R.paCity)}. This assumes past growth continues — it is not a guarantee.`}</p></div>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{fontSize:".56rem",fontWeight:700,color:"#787587",marginBottom:2,letterSpacing:".06em",textTransform:"uppercase"}}>{lang==="hi"?"टैक्स और बिक्री खर्चे के बाद":"After tax & exit costs"}</div>
            <div style={{fontSize:".62rem",color:"#787587",marginBottom:10,lineHeight:1.5}}>{lang==="hi"?`किराया ${fM(curRent)}, Day-1 कैश + बचत ${invRet}% पर:`:`Rent ${fM(curRent)}, invest Day-1 cash + savings at ${invRet}%:`}</div>
            {[{l:lang==="hi"?"किराया+निवेश (टैक्स बाद)":"Rent + Invest (after LTCG)",v:R.invTPostTax,c:"#22c55e",sub:lang==="hi"?`Nifty LTCG 12.5% (Rs 1.25L/yr छूट): −Rs ${f$(Math.round(R.niftyTax))}`:`Nifty LTCG 12.5% (Rs 1.25L/yr exempt): −Rs ${f$(Math.round(R.niftyTax))}`},{l:lang==="hi"?`प्रॉपर्टी @${R.cityCAGR}% (बिक्री बाद)`:`Property @ ${R.cityCAGR}% (after sale)`,v:R.paCityPostTax,c:"#522de6",sub:lang==="hi"?`LTCG 12.5%: −Rs ${f$(Math.round(R.propLTCG))} · ब्रोकरेज 1%: −Rs ${f$(Math.round(R.propBrokSale))}`:`LTCG 12.5%: −Rs ${f$(Math.round(R.propLTCG))} · Brokerage 1%: −Rs ${f$(Math.round(R.propBrokSale))}`},{l:lang==="hi"?"कुल किराया (5% सालाना बढ़त)":"Total rent (5% annual hike)",v:R.tRentV,c:"#ce2c66"}].map((b,i)=>{const mx=Math.max(R.invTPostTax,R.paCityPostTax,R.tRentV);return (<div key={i} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:".62rem",fontWeight:600}}>{b.l}</span><span style={{fontSize:".64rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:b.c}}>Rs {f$(b.v)}</span></div><div style={{height:5,borderRadius:3,background:"#f4f3f7",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:b.c,width:`${mx>0?(b.v/mx)*100:0}%`}}/></div>{b.sub&&<div style={{fontSize:".44rem",color:"#787587",marginTop:2,fontFamily:"monospace"}}>{b.sub}</div>}</div>)})}
            <div style={{padding:"5px 8px",borderRadius:6,background:"#f4f3f7",fontSize:".44rem",color:"#787587",fontFamily:"monospace"}}>{lang==="hi"?"दोनों टैक्स और बिक्री खर्चे काटकर — सही तुलना":"Both net of tax & exit costs — apples to apples"} · {cI.hpi?.src||"est."}</div>
          </div>
          <Lbl>{t("ins")}</Lbl>
          {/* Insight 1: Tax battle — HRA vs 24b/80C */}
          <IC t={lang==="hi"?`टैक्स: किराया बचाता है Rs ${f$(Math.round(R.hraTaxSaved))}/साल, खरीदना Rs ${f$(Math.round(R.singleTax))}/साल`:`Tax battle: renting saves Rs ${f$(Math.round(R.hraTaxSaved))}/yr, buying saves Rs ${f$(Math.round(R.singleTax))}/yr`} x={lang==="hi"?`किराये पर रहो तो HRA छूट मिलती है: basic salary (Rs ${f$(Math.round(annualInc*0.4))}), ${cI.metro?"मेट्रो 50%":"नॉन-मेट्रो 40%"} = Rs ${f$(Math.round(R.hraTaxSaved))}/साल टैक्स बचत (old regime, 30% bracket)। खरीदो तो Section 24(b) + 80C से Rs ${f$(Math.round(R.singleTax))}/साल${gender!=="joint"&&R.jointDelta>0?`, जॉइंट में Rs ${f$(Math.round(R.jointTax))}/साल`:""} बचता है। ${R.hraTaxSaved>R.singleTax?"किराये की टैक्स बचत ज़्यादा है — खरीदने का फ़ैसला टैक्स पर मत लो।":"खरीदने की टैक्स बचत ज़्यादा है — पर Rs "+f$(Math.round(R.e*12))+" EMI भरकर Rs "+f$(Math.round(R.singleTax))+" बचाना ratio देखो।"} New regime में HRA छूट नहीं मिलती — तब खरीदने का फायदा है।`:`Renting: HRA exemption on basic salary (Rs ${f$(Math.round(annualInc*0.4))}), ${cI.metro?"metro 50%":"non-metro 40%"} = Rs ${f$(Math.round(R.hraTaxSaved))}/yr tax saved (old regime, 30% bracket). Buying: Section 24(b) + 80C = Rs ${f$(Math.round(R.singleTax))}/yr${gender!=="joint"&&R.jointDelta>0?`, joint: Rs ${f$(Math.round(R.jointTax))}/yr`:""}. ${R.hraTaxSaved>R.singleTax?"Renting actually saves more in tax — don't let tax drive a buy decision.":"Buying saves more — but paying Rs "+f$(Math.round(R.e*12))+" EMI to save Rs "+f$(Math.round(R.singleTax))+" is a ratio worth examining."} Under new regime HRA is not available — buying's tax edge is stronger there.`} c="#5e5b77"/>
          {/* Insight 2: The real cost of renting in your city */}
          <IC t={lang==="hi"?`${cI.l} में किराये की छिपी कीमत`:`The hidden price of renting in ${cI.l}`} x={lang==="hi"?`${cI.l} में सिक्योरिटी डिपॉज़िट ${cI.sd||2} महीने = Rs ${f$(R.secDepAmt)}। ${cI.sd>=10?"बेंगलुरु में 10 महीने — ये भारत में सबसे ज़्यादा। ":""}हर शिफ्ट पर ~15% डिपॉज़िट कटता है (पेंट, "डैमेज", बहाने) = ${tenure} साल में ~Rs ${f$(R.secDepLoss)} खोओगे। ${R.movesIn20yr} बार शिफ्ट × Rs 25,000 पैकर्स-मूवर्स = Rs ${f$(R.movingCostTotal)}। और सबसे बड़ा खर्चा जो नंबर में नहीं आता: हर 11 महीने एक नोटिस कि "मालिक को ज़रूरत है" — बच्चे का स्कूल बदलो, किचन फिर से सजाओ, नया इलाका समझो। ये emotional tax है, और ये real है।`:`Security deposit in ${cI.l}: ${cI.sd||2} months = Rs ${f$(R.secDepAmt)}. ${cI.sd>=10?"Bengaluru's 10 months is the highest in India. ":""}Each move you lose ~15% of deposit to "painting charges" and "damage" claims = ~Rs ${f$(R.secDepLoss)} over ${tenure} years. ${R.movesIn20yr} moves × Rs 25,000 packers = Rs ${f$(R.movingCostTotal)}. And the biggest cost that has no number: every 11 months, a notice that the owner "needs the place back." Change your child's school, re-setup the kitchen, learn a new neighbourhood. This emotional tax is real, and no spreadsheet captures it.`} c="#ce2c66"/>
          {/* Insight 3: The verdict with emotional honesty — post-tax */}
          <IC t={R.invTPostTax>R.paCityPostTax?(lang==="hi"?"टैक्स बाद भी किराया+निवेश आगे":"After tax, renting still wins"):(lang==="hi"?"टैक्स बाद खरीदना जीतता है":"After tax, buying wins")} x={lang==="hi"?`टैक्स बाद: किराया+निवेश Rs ${f$(R.invTPostTax)} (Nifty LTCG −Rs ${f$(Math.round(R.niftyTax))})। प्रॉपर्टी बेचकर Rs ${f$(R.paCityPostTax)} (LTCG −Rs ${f$(Math.round(R.propLTCG))}, ब्रोकरेज −Rs ${f$(Math.round(R.propBrokSale))})। ${R.invTPostTax>R.paCityPostTax?`फ़र्क Rs ${f$(Math.round(R.invTPostTax-R.paCityPostTax))} किराये+निवेश के पक्ष में। पर एक बात जो कोई calculator नहीं बता सकता: अपने घर में दीवार पर कील ठोकने से पहले किसी से पूछना नहीं पड़ता। बच्चों को "हमारा घर" कहने में जो अहसास है — उसकी कोई IRR नहीं। जानकर खरीदो, बस अंधे होकर नहीं।`:`फ़र्क Rs ${f$(Math.round(R.paCityPostTax-R.invTPostTax))} खरीदने के पक्ष में। equity, stability, forced savings — सब मिलाकर खरीदना सही दिखता है। पर ${tenure} साल बिना रुकावट EMI ज़रूरी — एक भी gap CIBIL गिराएगा।`}`:`Post-tax: rent+invest Rs ${f$(R.invTPostTax)} (Nifty LTCG −Rs ${f$(Math.round(R.niftyTax))}). Property sale nets Rs ${f$(R.paCityPostTax)} (LTCG −Rs ${f$(Math.round(R.propLTCG))}, brokerage −Rs ${f$(Math.round(R.propBrokSale))}). ${R.invTPostTax>R.paCityPostTax?`Gap of Rs ${f$(Math.round(R.invTPostTax-R.paCityPostTax))} favours renting. But here is something no calculator can tell you: in your own home, you don't ask anyone before putting a nail in the wall. The feeling of your children saying "our home" — there is no IRR for that. Buy with full knowledge, just not blindly.`:`Gap of Rs ${f$(Math.round(R.paCityPostTax-R.invTPostTax))} favours buying. Equity, stability, forced savings — buying looks right. But ${tenure} years of unbroken EMI is non-negotiable — one gap hits CIBIL.`}`} c={R.invTPostTax>R.paCityPostTax?"#22c55e":"#522de6"}/>

          {/* ═══ DECISION ENGINE CTA ═══ */}
          <div style={{marginTop:16,padding:"20px 16px",borderRadius:16,background:"linear-gradient(145deg, #1a1c1e 0%, #2d1b4e 100%)",color:"#fff",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,width:180,height:180,background:"radial-gradient(circle, rgba(82,45,230,.2) 0%, transparent 70%)",pointerEvents:"none"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:".5rem",fontWeight:800,letterSpacing:".14em",textTransform:"uppercase",color:"#ce2c66",marginBottom:5,fontFamily:"monospace"}}>Decision Engine</div>
              <h3 style={{fontSize:".92rem",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",letterSpacing:"-.03em",lineHeight:1.2,marginBottom:4}}>{t("prH")}<br/><span style={{color:"#ce2c66"}}>{t("prH2")}</span></h3>
              <p style={{fontSize:".64rem",color:"rgba(255,255,255,.55)",lineHeight:1.6,marginBottom:12}}>{t("prD")}</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:14}}>
                {[{n:lang==="hi"?"सही कीमत":"Fair Price",i:"balance"},{n:lang==="hi"?"5yr एग्ज़िट":"5yr Exit",i:"trending_flat"},{n:lang==="hi"?"टैक्स":"Tax Opt.",i:"savings"},{n:lang==="hi"?"प्रीपे":"Prepay",i:"speed"},{n:lang==="hi"?"तुलना":"Compare",i:"compare"},{n:lang==="hi"?"फ़ैसला":"Verdict",i:"verified"}].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:3}}><span className="material-symbols-outlined" style={{fontSize:10,color:"#ce2c66",fontVariationSettings:"'FILL' 1"}}>{f.i}</span><span style={{fontSize:".48rem",color:"rgba(255,255,255,.65)"}}>{f.n}</span></div>)}
              </div>
              <a href="https://form.typeform.com/to/MO2OazCu" target="_blank" rel="noopener noreferrer" style={{display:"block",width:"100%",padding:"12px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:900,fontSize:".78rem",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans'",textAlign:"center",textDecoration:"none",boxShadow:"0 8px 20px rgba(82,45,230,.25)"}}>{t("prBtn")}</a>
              <div style={{textAlign:"center",marginTop:6,fontSize:".48rem",color:"rgba(255,255,255,.25)"}}>₹499/{lang==="hi"?"रिपोर्ट":"report"} · {lang==="hi"?"कोई स्पैम नहीं":"No spam"}</div>
            </div>
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
