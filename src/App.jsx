import { useState, useMemo, useCallback, useRef, useEffect, createContext, useContext } from "react";

/* ═══ LANG ═══ */
const S={en:{
tag:"the real cost, before you sign",heroS:"Total Cost Architecture",heroH:"Every cost.",heroH2:"No fiction.",heroP:"Fill what you know. We reveal what nobody tells you — including how this home fits your actual life.",
s_prop:"Property",s_govt:"Government",s_fin:"Financing",s_int:"Interiors",s_rec:"Recurring",s_up:"Upfront & Hidden",s_life:"Your Life",
auto:"Auto-calculated",req:"Required",done:"Done",edit:"Edit",
state:"State",city:"City / Zone",circle:"Circle rate",agr:"Agreement Value (Rs)",carpet:"Carpet Area (sqft)",
gender:"Buyer Gender",male:"Male",female:"Female",joint:"Joint",
txn:"Transaction",txnNew:"New (Builder)",txnRe:"Resale",
cs:"Construction Status",csU:"Under Construction",csR:"Ready to Move",
poss:"Months to Possession",rentQ:"Currently renting?",yes:"Yes",no:"No",moRent:"Monthly Rent (Rs)",
age:"Property Age",brok:"Brokerage %",socTx:"Society Transfer (Rs)",
cash:"Cash Component (Rs)",cashH:"Off-books. We advise zero.",cashW:"When paid?",
atBook:"At Booking",atReg:"At Registration",atPoss:"At Possession",cashReal:"Cash handling reality",
transform:"See the Truth",transformS:"Every rupee. Every year. Your real life.",
loan:"Loan Amount (Rs)",rate:"Interest Rate %",ten:"Tenure (years)",compR:"Comparable Rent",compRH:"For Buy vs Rent",invR:"Investment Return %",invRH:"Nifty50 ~12%",
handover:"Handover",condition:"Condition",bare:"Bare Shell",semi:"Semi-Furnished",full:"Fully Furnished",
ready:"Move-in Ready",cosmetic:"Refresh",reno:"Major Reno",quality:"Interior Quality",
parking:"Parking",covered:"Covered",open:"Open",incl:"Included",noInt:"No interior budget needed.",
// Life section
income:"Annual Household Income (Rs)",incomeH:"Both partners combined, before tax",
takeHome:"Monthly Take-home (Rs)",takeHomeH:"Post-tax, in-hand salary",
savings:"Savings Beyond Down Payment (Rs)",savingsH:"Liquid money after all upfront costs",
lifeEvt:"Major Life Events in Next 10 Years",
evtMarriage:"Marriage",evtChild1:"First Child",evtChild2:"Second Child",evtEdu:"Kids Higher Education",evtParents:"Dependents Above 60",
evtWhen:"In how many years?",
// Tabs
tB:"Breakdown",tF:"Your Finances",tT:"Timeline",tR:"Buy vs Rent",tI:"Intelligence",
// Quick stats
qD1:"Day-1 Cash",qMo:"Monthly",qCash:"Cash Burden",
// Detail labels
dAgr:"Agreement Value",dPsf:"Per sqft",dLoc:"Location",
dStamp:"Stamp Duty",dReg:"Registration",dCess:"Cess/Surcharge",dGst:"GST",dTds:"TDS (1%)",dLegal:"Legal + Documentation",
dEmi:"Monthly EMI",dTotInt:"Total Interest",dLoanFee:"Loan Fees",dPreEmi:"Pre-EMI Interest",dRentOv:"Rent During Construction",
dInt:"Interior",dReno:"Renovation",dMovEtc:"Moving + Utilities + Club",
dMaintMo:"Maintenance / month",dTaxYr:"Property Tax / year",dInsYr:"Insurance / year",dYrTot:" year total",
dDP:"Down Payment",dMaintDep:"Maintenance Deposit",dCorpus:"Corpus Fund",dBrok:"Brokerage",dSocTx:"Society Transfer",dCash:"CASH COMPONENT",dHandling:"Handling Fee",dCashTotal:"Total Cash Burden",
// Finance tab
fEmiRatio:"EMI-to-Income Ratio",fHousingRatio:"Total Housing / Income",fPriceInc:"Price-to-Income Ratio",fEmergency:"Emergency Fund",
fMonthsLabel:"months of expenses",fRecommend:"Recommended: 6 months minimum",
// Timeline
tlWho:"Who pays what, when",tlAmort:"Loan Amortization",
tlBook:"Booking",tlBook10:"Booking ~10%",tlLoanFee:"Loan processing fee",
tlReg:"Registration",tlDP:"Down payment",tlStampLeg:"Stamp + Registration + Legal",tlCashFee:"Cash + handling fee",
tlConst:"Construction",tlPreEmi:"Pre-EMI interest",tlYourRent:"Your rent (parallel)",tlBankDisb:"Bank disburses",
tlPoss:"Possession",tlSocDep:"Society deposits + utilities",
tlEmiPd:"EMI Period",tlTotalEmi:"Total EMIs",tlBankInt:"Bank keeps interest",
tlY1:"Year 1: {pct}% of EMI is bank profit. Flips at ~Year {flip}.",
you:"YOU",bank:"BANK",interest:"Interest",principal:"Principal",
ins:"Deep Insights",
// Buy vs Rent
brT:"Buy vs Rent — {ten} years",brIf:"Rent at {rent}, invest Day-1 cash + monthly savings at {inv}%:",
brInv:"Investment corpus",brP4:"Property @ 4%",brP7:"Property @ 7%",brTR:"Total rent paid",
brV1:"Math favours renting + investing",brV2:"Close call",brV3:"Buying looks favourable",brOpp:"Opportunity cost",
// Intel
itT:"Market Intelligence",itFree:"Free Market Preview",itFreeD:"2 live AI insights",
itBtn:"Get Insights",itLoad:"Searching...",itErr:"Could not fetch.",
itMkt:"Market Direction",itTrend:"Price Trend",itTip:"Analyst tip",itSrc:"Sources",
prT:"Premium Intelligence",prH:"The full picture. One PDF.",prH2:"Built for your exact situation.",
prD:"Everything above + 6 deep analyses personalised to your income, life events, pincode, and property.",
prBtn:"Join Waitlist — Free for first 500",prOk:"You are on the list.",prOkD:"We will notify you at launch.",
foot:"2025-26 rates. Reference only.",
},hi:{
tag:"सच्ची लागत, साइन से पहले",heroS:"कुल लागत का पूरा सच",heroH:"हर खर्चा।",heroH2:"बिना झूठ।",heroP:"जो जानते हो भरो। हम वो बताएंगे जो कोई नहीं बताता — ये घर तुम्हारी ज़िंदगी में कैसे फिट होगा, वो भी।",
s_prop:"प्रॉपर्टी",s_govt:"सरकारी खर्चे",s_fin:"लोन और ब्याज",s_int:"इंटीरियर",s_rec:"हर महीने/साल",s_up:"जेब से + छिपे",s_life:"आपकी ज़िंदगी",
auto:"अपने-आप कैलकुलेट",req:"ज़रूरी",done:"हो गया",edit:"बदलो",
state:"राज्य",city:"शहर / इलाका",circle:"सर्किल रेट",agr:"डील की कीमत (Rs)",carpet:"कार्पेट एरिया (sqft)",
gender:"खरीदार",male:"पुरुष",female:"महिला",joint:"दोनों",
txn:"खरीदारी",txnNew:"नया (बिल्डर)",txnRe:"रीसेल",
cs:"बनने की हालत",csU:"अभी बन रहा है",csR:"बना हुआ",
poss:"पज़ेशन कितने महीने में?",rentQ:"अभी किराये पर हो?",yes:"हां",no:"नहीं",moRent:"किराया (महीना, Rs)",
age:"कितनी पुरानी?",brok:"दलाली %",socTx:"सोसाइटी ट्रांसफर (Rs)",
cash:"कैश कंपोनेंट (Rs)",cashH:"बिना रसीद। सलाह: ज़ीरो।",cashW:"कब देना है?",
atBook:"बुकिंग पर",atReg:"रजिस्ट्री पर",atPoss:"पज़ेशन पर",cashReal:"कैश जुगाड़ की असलियत",
transform:"सच दिखाओ",transformS:"हर रुपया। हर साल। आपकी असली ज़िंदगी।",
loan:"लोन (Rs)",rate:"ब्याज दर %",ten:"कितने साल",compR:"इतने ही घर का किराया",compRH:"किराया vs खरीद",invR:"निवेश रिटर्न %",invRH:"Nifty50 ~12%",
handover:"बिल्डर क्या दे रहा",condition:"हालत",bare:"खाली ढांचा",semi:"आधा तैयार",full:"पूरा तैयार",
ready:"रहने लायक",cosmetic:"हल्का काम",reno:"पूरा तोड़-जोड़",quality:"इंटीरियर लेवल",
parking:"पार्किंग",covered:"ढकी",open:"खुली",incl:"शामिल",noInt:"फर्निश्ड — इंटीरियर खर्चा नहीं।",
income:"सालाना घरेलू आय (Rs)",incomeH:"दोनों पार्टनर मिलाकर, टैक्स से पहले",
takeHome:"मासिक हाथ में आने वाला (Rs)",takeHomeH:"टैक्स कटने के बाद",
savings:"डाउन पेमेंट के बाद बची बचत (Rs)",savingsH:"सब अपफ्रंट खर्चों के बाद लिक्विड पैसा",
lifeEvt:"अगले 10 साल में बड़ी ज़िंदगी की घटनाएं",
evtMarriage:"शादी",evtChild1:"पहला बच्चा",evtChild2:"दूसरा बच्चा",evtEdu:"बच्चों की उच्च शिक्षा",evtParents:"60+ उम्र के आश्रित (माता-पिता)",
evtWhen:"कितने साल में?",
tB:"पूरा हिसाब",tF:"आपकी माली हालत",tT:"कब क्या देना",tR:"किराया या खरीद?",tI:"AI इंटेलिजेंस",
qD1:"पहले दिन",qMo:"हर महीना",qCash:"कैश बोझ",
dAgr:"डील कीमत",dPsf:"प्रति sqft",dLoc:"जगह",
dStamp:"स्टांप ड्यूटी",dReg:"रजिस्ट्रेशन",dCess:"सेस",dGst:"GST",dTds:"TDS",dLegal:"वकील + कागज़ात",
dEmi:"EMI (महीना)",dTotInt:"कुल ब्याज (बैंक का)",dLoanFee:"लोन फीस",dPreEmi:"प्री-EMI (बेकार का)",dRentOv:"किराया (बनने तक)",
dInt:"इंटीरियर",dReno:"मरम्मत",dMovEtc:"शिफ्टिंग + बिजली-पानी + क्लब",
dMaintMo:"मेंटेनेंस / महीना",dTaxYr:"टैक्स / साल",dInsYr:"बीमा / साल",dYrTot:" साल कुल",
dDP:"डाउन पेमेंट",dMaintDep:"मेंटेनेंस जमा",dCorpus:"कॉर्पस फंड",dBrok:"दलाली",dSocTx:"सोसाइटी ट्रांसफर",dCash:"कैश (बिना रसीद)",dHandling:"जुगाड़ फीस",dCashTotal:"कुल कैश बोझ",
fEmiRatio:"EMI / आय अनुपात",fHousingRatio:"कुल मकान खर्चा / आय",fPriceInc:"कीमत / आय अनुपात",fEmergency:"इमरजेंसी फंड",
fMonthsLabel:"महीने का खर्चा",fRecommend:"सलाह: कम से कम 6 महीने का बफर",
tlWho:"कौन क्या कब देगा",tlAmort:"लोन — ब्याज vs मूलधन",
tlBook:"बुकिंग",tlBook10:"बुकिंग ~10%",tlLoanFee:"लोन फीस",
tlReg:"रजिस्ट्री",tlDP:"डाउन पेमेंट",tlStampLeg:"स्टांप + रजिस्ट्री + वकील",tlCashFee:"कैश + जुगाड़ फीस",
tlConst:"कंस्ट्रक्शन",tlPreEmi:"प्री-EMI (बेकार पैसा)",tlYourRent:"किराया (साथ-साथ)",tlBankDisb:"बैंक किश्तों में देगा",
tlPoss:"पज़ेशन",tlSocDep:"सोसाइटी जमा + बिजली-पानी",
tlEmiPd:"EMI का दौर",tlTotalEmi:"कुल EMIs",tlBankInt:"बैंक ब्याज रखेगा",
tlY1:"पहला साल: EMI का {pct}% बैंक की जेब। ~साल {flip} में पलटेगा।",
you:"आप",bank:"बैंक",interest:"ब्याज",principal:"मूलधन",ins:"गहरी इनसाइट्स",
brT:"किराया या खरीद? — {ten} साल",brIf:"{rent} किराया दो, बचत {inv}% पर लगाओ:",
brInv:"निवेश कॉर्पस",brP4:"प्रॉपर्टी @ 4%",brP7:"प्रॉपर्टी @ 7%",brTR:"कुल किराया",
brV1:"किराया + निवेश बेहतर",brV2:"बराबरी — इलाका तय करेगा",brV3:"खरीदना फायदे में",brOpp:"ऑपर्च्युनिटी कॉस्ट",
itT:"मार्केट इंटेलिजेंस",itFree:"मुफ्त झलक",itFreeD:"AI से 2 लाइव इनसाइट्स",
itBtn:"इनसाइट्स लाओ",itLoad:"खोज रहे हैं...",itErr:"नहीं मिला।",
itMkt:"मार्केट दिशा",itTrend:"दाम का रुख",itTip:"सलाह",itSrc:"स्रोत",
prT:"प्रीमियम इंटेलिजेंस",prH:"पूरी तस्वीर। एक PDF।",prH2:"आपकी आय, ज़िंदगी, पिनकोड के लिए।",
prD:"ऊपर का सब + 6 गहरे विश्लेषण — आपकी आय, ज़िंदगी की घटनाओं, और प्रॉपर्टी के हिसाब से।",
prBtn:"वेटलिस्ट — पहले 500 को मुफ्त",prOk:"लिस्ट में हो।",prOkD:"लॉन्च पर बताएंगे।",
foot:"2025-26 दरें। सिर्फ़ जानकारी हेतु।",
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

// Life event annual cost models (metro India, 2025 prices)
const LIFE_COSTS={
  marriage:(_yr)=>({onetime:1e6}), // Rs 10L one-time
  child1:(yr)=>({annual:yr<3?18e4:yr<6?24e4:yr<12?36e4:yr<18?48e4:0}), // childcare→school→tuition
  child2:(yr)=>({annual:yr<3?18e4:yr<6?24e4:yr<12?36e4:yr<18?48e4:0}),
  edu:(_yr)=>({onetime:35e5}), // Rs 35L corpus lump
  parents:(yr)=>({annual:75000*Math.pow(1.15,yr)}), // Sr citizen health insurance Rs 75K/yr, premiums rise ~15%/yr after 60
};

/* ═══ APP ═══ */
export default function App(){
  const[lang,setLang]=useState("en");
  const t=useCallback((k,vars)=>{let s=S[lang]?.[k]||S.en[k]||k;if(vars)Object.entries(vars).forEach(([a,b])=>{s=s.replaceAll("{"+a+"}",b)});return s},[lang]);
  const hiF=lang==="hi"?"'Noto Sans Devanagari','Inter',sans-serif":"'Inter',sans-serif";

  const[st,setSt]=useState("telangana");const[city,setCity]=useState("hy_u");
  const[bp,setBP]=useState(8e6);const[ca,setCA]=useState(1200);
  const[gender,setG]=useState("male");const[txn,setTxn]=useState("new");const[cst,setCst]=useState("under");
  const[poss,setPoss]=useState(30);const[renting,setRenting]=useState(true);const[curRent,setCurRent]=useState(25e3);
  const[propAge,setPropAge]=useState("0-5");const[furnish,setFurnish]=useState("bare");
  const[intRate,setIntRate]=useState(2400);const[la,setLA]=useState(6e6);
  const[rate,setRate]=useState(8.5);const[tenure,setTen]=useState(20);
  const[parking,setPk]=useState("covered");const[stf,setSTF]=useState(5e4);const[bkr,setBk]=useState(1);
  const[cashAmt,setCashAmt]=useState(0);const[cashWhen,setCashWhen]=useState("booking");
  const[invRet,setInvRet]=useState(12);
  // Life inputs
  const[annualInc,setAnnualInc]=useState(1800000); // 18L/yr
  const[monthlyTH,setMonthlyTH]=useState(125000);
  const[savBeyond,setSavBeyond]=useState(500000);
  const[lifeEvts,setLifeEvts]=useState({}); // {marriage:2, child1:3, ...}

  const[open,setOpen]=useState(null);const[done,setDone]=useState(new Set());
  const[phase,setPhase]=useState("input");const[tab,setTab]=useState("pyramid");const[detailIdx,setDetailIdx]=useState(null);
  const[aiData,setAiData]=useState(null);const[aiLoading,setAiLoading]=useState(false);const[aiErr,setAiErr]=useState(null);
  const[wlEmail,setWlEmail]=useState("");const[wlPin,setWlPin]=useState("");const[wlSent,setWlSent]=useState(false);
  const pyrRef=useRef(null);

  useEffect(()=>{const cs=Object.keys(SD[st].c);if(!cs.includes(city))setCity(cs[0])},[st]);
  const sI=SD[st],cI=sI?.c[city];
  const mark=useCallback(id=>{setDone(p=>{const n=new Set(p);n.add(id);return n});setOpen(null)},[]);
  const allDone=done.has("property")&&done.has("financing")&&done.has("interiors")&&done.has("life");

  const toggleEvt=(key)=>{setLifeEvts(p=>{const n={...p};if(n[key]!==undefined)delete n[key];else n[key]=2;return n})};
  const setEvtYr=(key,yr)=>{setLifeEvts(p=>({...p,[key]:yr}))};

  const fetchAI=useCallback(async()=>{
    setAiLoading(true);setAiErr(null);
    try{const r=await fetch("/api/intel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:sI.l,city:cI?.l,basePrice:bp,carpet:ca})});const j=await r.json();if(!r.ok||j.error){const dbg=j.debug?"\n"+j.debug.join("\n"):"";throw new Error((j.error||"HTTP "+r.status)+dbg)}setAiData(j)}catch(e){setAiErr(e.message)}finally{setAiLoading(false)}
  },[st,city,sI,cI,bp,ca]);

  /* ═══ CALC ═══ */
  const R=useMemo(()=>{
    if(!cI)return null;
    const isUC=txn==="new"&&cst==="under",isRe=txn==="resale",ec=isRe?"ready":cst;
    let sr=gender==="joint"?(sI.st.joint||sI.st.male):(sI.st[gender]||sI.st.male);
    if(st==="telangana"&&(city==="hy_u"||city==="hy_s"))sr+=sI.ms||0;
    if(st==="maharashtra"&&city==="mum")sr+=sI.lb||0;
    const sd=bp*sr;let rg=bp*sI.rg;if(sI.rc)rg=Math.min(rg,sI.rc);
    let sur=0;if(st==="karnataka"&&sI.cs)sur=sd*sI.cs;
    let gst=0;if(ec==="under")gst=bp*((bp<=45e5&&ca<=645)?.01:.05);
    const tds=bp>=5e6?bp*.01:0;const leg=Math.max(15e3,Math.min(bp*.003,5e4));const doc=5e3;
    const govT=sd+rg+sur+gst+leg+doc;
    const brk=isRe?bp*(bkr/100):0;const stfV=isRe?stf:0;
    const lp=la*.005,cer=500,ld=la>2e6?8e3:3e3,lc=lp+cer+ld;
    const effI=(furnish==="full"||furnish==="ready")?0:intRate;
    const inter=ca*effI,mov=15e3,ud=25e3,club=25e3,moveIn=inter+mov+ud+club;
    const mm=ca*(cI.m||3),md=mm*24,corp=Math.max(5e4,bp*.005);
    let pkC=0;if(parking==="covered")pkC=st==="maharashtra"?5e5:3e5;if(parking==="open")pkC=st==="maharashtra"?25e4:15e4;
    const apt=bp*(cI.pt||.001),aIns=Math.max(3e3,bp*5e-4),aMnt=mm*12,aR=apt+aIns+aMnt;
    const e=calcEMI(la,rate,tenure),tRep=e*tenure*12,tInt=tRep-la;
    let preE=0,rOv=0;if(isUC){preE=(la*.5)*(rate/100/12)*poss;if(renting)rOv=curRent*poss}
    let ren=0;if(isRe&&furnish==="reno"){const rr={"0-5":200,"5-10":500,"10-20":900,"20+":1300};ren=ca*(rr[propAge]||400)}
    const cFe=cashFn(cashAmt),cPc=cashPc(cashAmt),tCash=cashAmt+cFe;
    const dp=bp-la;
    const upV=dp+md+corp+pkC+brk+stfV+lc+tCash;
    const tProj=bp+govT+tInt+moveIn+lc+preE+rOv+ren+(aR*tenure)+md+corp+pkC+brk+stfV+tCash;
    const mul=tProj/bp;
    const d1=dp+govT+moveIn+md+corp+pkC+brk+stfV+lc+preE+ren+tCash;

    // ── FINANCE RATIOS ──
    const emiRatio=monthlyTH>0?((e+aR/12)/monthlyTH*100):0;
    const housingMo=e+aR/12;
    const priceToInc=annualInc>0?(bp/annualInc):0;
    const moExpenses=monthlyTH*.6; // rough: 60% of take-home is expenses
    const emergencyMo=moExpenses>0?(savBeyond/moExpenses):0;
    const comfortablePrice=annualInc*5;

    // ── YEAR-BY-YEAR COLLISION ──
    const collision=[];
    let projInc=monthlyTH*12;
    for(let yr=1;yr<=Math.min(tenure,20);yr++){
      let housing=(e*12)+aR;
      let lifeTotal=0;
      Object.entries(lifeEvts).forEach(([key,startYr])=>{
        const evtYr=yr-startYr; // years since event
        if(evtYr<0)return;
        const model=LIFE_COSTS[key];
        if(!model)return;
        const costs=model(evtYr);
        if(costs.onetime&&evtYr===0)lifeTotal+=costs.onetime;
        if(costs.annual)lifeTotal+=costs.annual;
      });
      const totalOut=housing+lifeTotal;
      const pctInc=projInc>0?(totalOut/projInc*100):0;
      collision.push({yr,housing:Math.round(housing),life:Math.round(lifeTotal),total:Math.round(totalOut),income:Math.round(projInc),pct:Math.round(pctInc)});
      projInc*=1.08; // 8% annual income growth
    }
    const peakYr=collision.reduce((a,b)=>b.pct>a.pct?b:a,collision[0]||{pct:0});
    const dangerYears=collision.filter(y=>y.pct>60);

    // Amortization
    const amort=[];let bal=la;
    for(let yr=1;yr<=Math.min(tenure,30);yr++){let yi=0,yp=0;for(let m=0;m<12;m++){const mi=bal*(rate/100/12),mp=e-mi;yi+=mi;yp+=Math.max(0,mp);bal=Math.max(0,bal-mp)}amort.push({yr,i:Math.round(yi),p:Math.round(yp)})}

    // Buy vs Rent
    const fvL=d1*Math.pow(1+invRet/100,tenure);
    const moS=e+aR/12-curRent;
    let fvM=0;if(moS>0){const ri=invRet/100/12,n=tenure*12;fvM=moS*((Math.pow(1+ri,n)-1)/ri)}
    const pa4=bp*Math.pow(1.04,tenure),pa7=bp*Math.pow(1.07,tenure),tRentV=curRent*12*tenure*1.5,invT=fvL+Math.max(0,fvM);

    // Details
    const det={
      property:[{l:t("dAgr"),v:bp},{l:t("dPsf"),v:"Rs "+Math.round(bp/(ca||1)).toLocaleString("en-IN")},{l:t("dLoc"),v:cI.l+", "+sI.l}],
      government:[{l:t("dStamp")+" ("+(sr*100).toFixed(1)+"%)",v:sd},{l:t("dReg"),v:rg},sur>0&&{l:t("dCess"),v:sur},gst>0&&{l:t("dGst"),v:gst},tds>0&&{l:t("dTds"),v:tds},{l:t("dLegal"),v:leg+doc}].filter(Boolean),
      financing:[{l:t("dEmi"),v:fM(e)},{l:t("dTotInt"),v:tInt,w:true},{l:t("dLoanFee"),v:lc},preE>0&&{l:t("dPreEmi"),v:preE,w:true},rOv>0&&{l:t("dRentOv"),v:rOv,w:true}].filter(Boolean),
      interiors:[inter>0&&{l:t("dInt"),v:inter},ren>0&&{l:t("dReno"),v:ren},{l:t("dMovEtc"),v:mov+ud+club}].filter(Boolean),
      recurring:[{l:t("dMaintMo"),v:fM(mm)},{l:t("dTaxYr"),v:apt},{l:t("dInsYr"),v:aIns},{l:tenure+t("dYrTot"),v:aR*tenure,b:true}],
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
    sorted.forEach((s,i)=>{s.color=pal[i];s.pct=tProj>0?(s.val/tProj*100):0});

    return {sorted,det,tProj,mul,d1,e,aR,tInt,preE,rOv,mm,bp,dp,sr,cashAmt,cFe,cPc,tCash,govT,gst,isUC,amort,fvL,invT,pa4,pa7,tRentV,la,moS,emiRatio,housingMo,priceToInc,emergencyMo,comfortablePrice,collision,peakYr,dangerYears};
  },[bp,ca,st,city,cI,sI,gender,txn,cst,poss,renting,curRent,propAge,furnish,intRate,la,rate,tenure,parking,stf,bkr,cashAmt,cashWhen,invRet,annualInc,monthlyTH,savBeyond,lifeEvts,t]);

  const doTransform=()=>{setPhase("results");setTab("pyramid");setTimeout(()=>pyrRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100)};

  const secs=[
    {id:"property",label:t("s_prop"),icon:"home",color:"#522de6",req:true},
    {id:"government",label:t("s_govt"),icon:"gavel",color:"#787587",auto:true},
    {id:"financing",label:t("s_fin"),icon:"account_balance",color:"#5e5b77",req:true},
    {id:"interiors",label:t("s_int"),icon:"design_services",color:"#ce2c66",req:true},
    {id:"life",label:t("s_life"),icon:"favorite",color:"#0d9488",req:true},
    {id:"recurring",label:t("s_rec"),icon:"autorenew",color:"#ac064e",auto:true},
    {id:"upfront",label:t("s_up"),icon:"visibility",color:"#6B4EFF",auto:true},
  ];

  const EVT_OPTS=[
    {key:"marriage",label:t("evtMarriage"),icon:"favorite"},
    {key:"child1",label:t("evtChild1"),icon:"child_care"},
    {key:"child2",label:t("evtChild2"),icon:"child_care"},
    {key:"edu",label:t("evtEdu"),icon:"school"},
    {key:"parents",label:t("evtParents"),icon:"health_and_safety"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#FAF9FD",color:"#1a1c1e",fontFamily:hiF,overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;700;900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes morphIn{from{opacity:0;transform:scaleY(.3)}to{opacity:1;transform:scaleY(1)}}@keyframes glowP{0%,100%{box-shadow:0 0 20px rgba(82,45,230,.15)}50%{box-shadow:0 0 40px rgba(82,45,230,.3)}}@keyframes cashP{0%,100%{opacity:.6}50%{opacity:1}}@keyframes spin{to{transform:rotate(360deg)}}.anim{animation:fadeUp .4s ease both}.morph{animation:morphIn .6s cubic-bezier(.16,1,.3,1) both}.glow{animation:glowP 2s ease infinite}.cB{animation:cashP 1.5s ease infinite}.glass{background:rgba(250,249,253,.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}.lift{box-shadow:0 20px 40px -12px rgba(98,95,123,.1)}.ghost{border:1px solid rgba(201,196,217,.25)}button{-webkit-tap-highlight-color:transparent}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}`}</style>

      {/* HEADER */}
      <header className="glass" style={{position:"fixed",top:0,width:"100%",zIndex:50,borderBottom:"1px solid rgba(201,196,217,.15)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 16px",maxWidth:520,margin:"0 auto",gap:8}}>
          <div style={{minWidth:0}}><div style={{fontSize:"clamp(.82rem,3.5vw,.95rem)",fontWeight:900,letterSpacing:"-.04em",fontFamily:"'Plus Jakarta Sans'",whiteSpace:"nowrap"}}><span style={{color:"#522de6"}}>un</span>-real-estate</div><div style={{fontSize:".44rem",color:"#787587",whiteSpace:"nowrap"}}>{t("tag")}</div></div>
          <div style={{display:"flex",gap:4,flexShrink:0}}>
            {[{c:"en",l:"EN"},{c:"hi",l:"हि"}].map(x=> <button key={x.c} onClick={()=>setLang(x.c)} style={{padding:"4px 8px",borderRadius:6,border:lang===x.c?"1.5px solid #522de6":"1px solid #e3e2e6",background:lang===x.c?"#522de610":"#fff",color:lang===x.c?"#522de6":"#787587",fontSize:".62rem",fontWeight:800,cursor:"pointer"}}>{x.l}</button>)}
            {phase==="results"&&<button onClick={()=>{setPhase("input");setDetailIdx(null)}} style={{padding:"4px 10px",borderRadius:6,background:"#f4f3f7",fontSize:".62rem",fontWeight:700,color:"#787587",border:"none",cursor:"pointer"}}>{t("edit")}</button>}
          </div>
        </div>
      </header>

      <main style={{maxWidth:520,margin:"0 auto",padding:"60px 14px 80px",overflowX:"hidden"}}>

      {/* ═══ INPUT ═══ */}
      {phase==="input"&&<div>
        <section className="anim" style={{marginBottom:24,paddingTop:10}}>
          <p style={{fontSize:".54rem",fontWeight:600,color:"#787587",letterSpacing:".12em",textTransform:"uppercase",marginBottom:3}}>{t("heroS")}</p>
          <h2 style={{fontSize:"clamp(1.5rem,5vw,2rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>{t("heroH")}<br/><span style={{color:"#522de6"}}>{t("heroH2")}</span></h2>
          <p style={{fontSize:".78rem",color:"#787587",marginTop:6,lineHeight:1.5,maxWidth:400}}>{t("heroP")}</p>
        </section>

        <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:20}}>
          {secs.map(sec=>{
            const isO=open===sec.id,isD=done.has(sec.id),isA=sec.auto&&done.has("property");
            return (
              <div key={sec.id} className={isO?"lift":""} style={{borderRadius:14,overflow:"hidden",border:isO?`1.5px solid ${sec.color}30`:`1px solid ${isD||isA?sec.color+"30":"#e3e2e6"}`,background:"#fff"}}>
                <button onClick={()=>setOpen(isO?null:sec.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:isD||isA?`${sec.color}08`:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
                  <div style={{width:32,height:32,borderRadius:8,background:isD||isA?sec.color:`${sec.color}15`,display:"grid",placeItems:"center",flexShrink:0}}><span className="material-symbols-outlined" style={{fontSize:16,color:isD||isA?"#fff":sec.color,fontVariationSettings:isD||isA?"'FILL' 1":"'FILL' 0"}}>{sec.icon}</span></div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:".76rem",fontWeight:700,fontFamily:"'Plus Jakarta Sans'"}}>{sec.label}</div>{sec.auto&&<div style={{fontSize:".56rem",color:"#787587"}}>{t("auto")}</div>}{sec.req&&!isD&&<div style={{fontSize:".56rem",color:sec.color}}>{t("req")}</div>}</div>
                  {(isD||isA)&&<span className="material-symbols-outlined" style={{fontSize:16,color:sec.color,fontVariationSettings:"'FILL' 1"}}>check_circle</span>}
                  <span className="material-symbols-outlined" style={{fontSize:16,color:"#787587",transform:isO?"rotate(180deg)":"",transition:"transform .2s"}}>expand_more</span>
                </button>

                {isO&&<div style={{padding:"0 14px 14px",animation:"fadeUp .2s ease"}}>
                  {sec.id==="property"&&<div>
                    <PF l={t("state")}><PSel v={st} set={e=>setSt(e.target.value)} o={Object.entries(SD).map(([k,v])=>({v:k,l:v.l}))}/></PF>
                    <PF l={t("city")}><PSel v={city} set={e=>setCity(e.target.value)} o={Object.entries(sI.c).map(([k,v])=>({v:k,l:v.l}))}/></PF>
                    {cI&&<Chip>{t("circle")}: Rs {cI.cr[0].toLocaleString("en-IN")} - {cI.cr[1].toLocaleString("en-IN")}/sqft</Chip>}
                    <PF l={t("agr")}><PNum v={bp} set={setBP}/></PF>
                    <PF l={t("carpet")}><PNum v={ca} set={setCA}/></PF>
                    <PF l={t("gender")}><PTog o={[{v:"male",l:t("male")},{v:"female",l:t("female")},{v:"joint",l:t("joint")}]} v={gender} set={setG}/></PF>
                    <PF l={t("txn")}><PTog o={[{v:"new",l:t("txnNew")},{v:"resale",l:t("txnRe")}]} v={txn} set={setTxn}/></PF>
                    {txn==="new"&&<PF l={t("cs")}><PTog o={[{v:"under",l:t("csU")},{v:"ready",l:t("csR")}]} v={cst} set={setCst}/></PF>}
                    {txn==="new"&&cst==="under"&&<div><PF l={t("poss")}><PNum v={poss} set={setPoss}/></PF><PF l={t("rentQ")}><PTog o={[{v:true,l:t("yes")},{v:false,l:t("no")}]} v={renting} set={setRenting}/></PF>{renting&&<PF l={t("moRent")}><PNum v={curRent} set={setCurRent}/></PF>}</div>}
                    {txn==="resale"&&<div><PF l={t("age")}><PTog o={[{v:"0-5",l:"0-5"},{v:"5-10",l:"5-10"},{v:"10-20",l:"10-20"},{v:"20+",l:"20+"}]} v={propAge} set={setPropAge}/></PF><PF l={t("brok")}><PNum v={bkr} set={setBk}/></PF><PF l={t("socTx")}><PNum v={stf} set={setSTF}/></PF></div>}
                    <div style={{marginTop:10,padding:12,borderRadius:12,background:cashAmt>0?"#ba1a1a08":"#f4f3f7",border:cashAmt>0?"1px solid #ba1a1a20":"1px solid #e3e2e6"}}>
                      <PF l={t("cash")} h={t("cashH")}><PNum v={cashAmt} set={setCashAmt}/></PF>
                      {cashAmt>0&&<div><PF l={t("cashW")}><PTog o={[{v:"booking",l:t("atBook")},{v:"registration",l:t("atReg")},{v:"possession",l:t("atPoss")}]} v={cashWhen} set={setCashWhen}/></PF><div style={{padding:"8px 10px",borderRadius:8,background:"#ba1a1a0d",border:"1px solid #ba1a1a18",fontSize:".66rem",color:"#474556",lineHeight:1.5}}><strong style={{color:"#ba1a1a"}}>{t("cashReal")}:</strong> ~{cashPc(cashAmt)}% = <strong>Rs {f$(cashFn(cashAmt))}</strong><br/>{t("dCashTotal")}: <strong style={{color:"#ba1a1a"}}>Rs {f$(cashAmt+cashFn(cashAmt))}</strong></div></div>}
                    </div>
                    <DB color={sec.color} onClick={()=>{mark("property");mark("government");mark("recurring");mark("upfront")}}/>
                  </div>}

                  {sec.id==="financing"&&<div>
                    <PF l={t("loan")}><PNum v={la} set={setLA}/></PF>
                    <div style={{fontSize:".6rem",color:la>bp*.85?"#ba1a1a":"#787587",marginBottom:6,fontFamily:"monospace"}}>LTV: {bp>0?Math.round(la/bp*100):0}%</div>
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

                  {/* YOUR LIFE */}
                  {sec.id==="life"&&<div>
                    <PF l={t("income")} h={t("incomeH")}><PNum v={annualInc} set={setAnnualInc}/></PF>
                    <PF l={t("takeHome")} h={t("takeHomeH")}><PNum v={monthlyTH} set={setMonthlyTH}/></PF>
                    <PF l={t("savings")} h={t("savingsH")}><PNum v={savBeyond} set={setSavBeyond}/></PF>
                    <div style={{marginTop:8,marginBottom:8}}><label style={{display:"block",fontSize:".64rem",fontWeight:700,color:"#474556",marginBottom:6}}>{t("lifeEvt")}</label>
                      {EVT_OPTS.map(ev=> (
                        <div key={ev.key} style={{marginBottom:6}}>
                          <button onClick={()=>toggleEvt(ev.key)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"8px 10px",borderRadius:8,border:lifeEvts[ev.key]!==undefined?"1.5px solid #0d9488":"1px solid #e3e2e6",background:lifeEvts[ev.key]!==undefined?"#0d948808":"#faf9fd",cursor:"pointer",textAlign:"left"}}>
                            <span className="material-symbols-outlined" style={{fontSize:16,color:lifeEvts[ev.key]!==undefined?"#0d9488":"#787587"}}>{lifeEvts[ev.key]!==undefined?"check_circle":"radio_button_unchecked"}</span>
                            <span style={{fontSize:".68rem",fontWeight:700,color:lifeEvts[ev.key]!==undefined?"#0d9488":"#474556"}}>{ev.label}</span>
                          </button>
                          {lifeEvts[ev.key]!==undefined&&<div style={{marginTop:4,marginLeft:32}}>
                            <div style={{fontSize:".58rem",color:"#787587",marginBottom:2}}>{t("evtWhen")}</div>
                            <div style={{display:"flex",gap:3}}>{[1,2,3,4,5,7,10].map(yr=> <button key={yr} onClick={()=>setEvtYr(ev.key,yr)} style={{padding:"4px 8px",borderRadius:6,border:lifeEvts[ev.key]===yr?"1.5px solid #0d9488":"1px solid #e3e2e6",background:lifeEvts[ev.key]===yr?"#0d948815":"#fff",color:lifeEvts[ev.key]===yr?"#0d9488":"#787587",fontSize:".58rem",fontWeight:700,cursor:"pointer"}}>{yr}yr</button>)}</div>
                          </div>}
                        </div>
                      ))}
                    </div>
                    <DB color={sec.color} onClick={()=>mark("life")}/>
                  </div>}

                  {sec.auto&&R&&<DRows rows={R.det[sec.id]}/>}
                </div>}
              </div>
            );
          })}
        </div>
        {allDone&&!open&&<div className="anim" style={{textAlign:"center"}}><button onClick={doTransform} className="glow" style={{padding:"14px 36px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:900,fontSize:".86rem",fontFamily:"'Plus Jakarta Sans'",border:"none",cursor:"pointer"}}>{t("transform")}</button><p style={{fontSize:".62rem",color:"#787587",marginTop:6}}>{t("transformS")}</p></div>}
      </div>}

      {/* ═══ RESULTS ═══ */}
      {phase==="results"&&R&&<div ref={pyrRef}>
        <section className="anim" style={{marginBottom:14,paddingTop:8}}>
          <h2 style={{fontSize:"clamp(1.4rem,5vw,1.9rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>Rs {f$(R.tProj)} <span style={{fontSize:".42em",color:"#ce2c66",fontWeight:700}}>({R.mul.toFixed(2)}x)</span></h2>
        </section>

        {/* TABS */}
        <div style={{display:"flex",gap:3,marginBottom:12,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
          {[{k:"pyramid",l:t("tB")},{k:"finances",l:t("tF")},{k:"timeline",l:t("tT")},{k:"rent",l:t("tR")},{k:"intel",l:t("tI")}].map(x=> <button key={x.k} onClick={()=>{setTab(x.k);setDetailIdx(null)}} style={{padding:"6px 12px",borderRadius:8,border:tab===x.k?"1.5px solid #522de6":"1px solid #e3e2e6",background:tab===x.k?"#522de610":"#fff",color:tab===x.k?"#522de6":"#787587",fontSize:".62rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{x.l}</button>)}
        </div>

        {/* ── PYRAMID TAB ── */}
        {tab==="pyramid"&&<div className="anim">
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,marginBottom:16,padding:"0 2px"}}>
            {R.sorted.map((seg,i)=>{const w=100-(i*12),isO=detailIdx===i,hasCash=seg.id==="upfront"&&R.tCash>0;
              return (<div key={seg.id} className="morph" style={{width:`${w}%`,maxWidth:"100%",animationDelay:`${i*.08}s`}}>
                <button onClick={()=>setDetailIdx(isO?null:i)} style={{width:"100%",padding:i===0?"12px 10px":"8px 8px",borderRadius:i===0?"4px 4px 14px 14px":i===R.sorted.length-1?"10px 10px 4px 4px":4,background:seg.color,color:"#fff",border:isO?"2px solid #fff":"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",gap:4,boxShadow:`0 4px 12px ${seg.color}25`}}>
                  <div style={{display:"flex",alignItems:"center",gap:4,minWidth:0,overflow:"hidden"}}>
                    <span className="material-symbols-outlined" style={{fontSize:i===0?16:13,fontVariationSettings:"'FILL' 1",flexShrink:0}}>{seg.icon}</span>
                    <span style={{fontSize:i===0?".58rem":".5rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"uppercase",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{seg.label}</span>
                    {hasCash&&<span className="cB" style={{width:5,height:5,borderRadius:99,background:"#ff4444",border:"1.5px solid #fff",flexShrink:0}}/>}
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,lineHeight:1.1}}>
                    <div style={{fontSize:".56rem",fontWeight:800,fontFamily:"'JetBrains Mono'"}}>Rs {f$(seg.val)}</div>
                    <div style={{fontSize:".42rem",opacity:.75}}>{seg.pct.toFixed(1)}%</div>
                  </div>
                </button>
              </div>);
            })}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
            <QS l={t("qD1")} v={"Rs "+f$(R.d1)}/><QS l={t("qMo")} v={fM(R.e+R.aR/12)}/>
            {R.tCash>0&&<div style={{gridColumn:"1/-1"}}><QS l={t("qCash")} v={"Rs "+f$(R.tCash)} w/></div>}
          </div>

          {R.tCash>0&&<div style={{padding:"10px 12px",borderRadius:12,background:"#ba1a1a0a",border:"1px solid #ba1a1a20",marginBottom:12,display:"flex",gap:8}}>
            <span className="material-symbols-outlined cB" style={{fontSize:16,color:"#ba1a1a",flexShrink:0,marginTop:1}}>warning</span>
            <div style={{fontSize:".66rem",color:"#474556",lineHeight:1.5}}><strong style={{color:"#ba1a1a"}}>Rs {f$(R.cashAmt)} ({t(cashWhen==="booking"?"atBook":cashWhen==="registration"?"atReg":"atPoss")})</strong> + Rs {f$(R.cFe)} {t("dHandling")} = <strong style={{color:"#ba1a1a"}}>Rs {f$(R.tCash)}</strong></div>
          </div>}

          {detailIdx!==null&&R.sorted[detailIdx]&&<div className="anim lift ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><h3 style={{fontSize:".78rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",color:R.sorted[detailIdx].color}}>{R.sorted[detailIdx].label}</h3><button onClick={()=>setDetailIdx(null)} style={{background:"none",border:"none",cursor:"pointer"}}><span className="material-symbols-outlined" style={{fontSize:14,color:"#787587"}}>close</span></button></div><DRows rows={R.det[R.sorted[detailIdx].id]}/></div>}
        </div>}

        {/* ── YOUR FINANCES TAB ── */}
        {tab==="finances"&&<div className="anim">
          <Lbl>{t("tF")}</Lbl>

          {/* Ratio gauges */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
            <RatioCard label={t("fEmiRatio")} val={R.emiRatio} unit="%" good={30} warn={40} bad={50} desc={R.emiRatio<=30?lang==="hi"?"आराम की रेंज में। EMI आपकी आय का 30% से कम है।":"Comfortable. EMI is under 30% of take-home.":R.emiRatio<=40?lang==="hi"?"ठीक है, पर तंग। बैंक मंज़ूर करेगा, पर बड़े खर्चे में दिक्कत होगी।":"Acceptable but tight. Bank approves, but any large expense will hurt.":R.emiRatio<=50?lang==="hi"?"खतरनाक। एक नौकरी जाए या इंटरेस्ट रेट बढ़े तो EMI मिस होगी।":"Dangerous. One job loss or rate hike and you miss EMI.":lang==="hi"?"बहुत ज़्यादा। ज़िंदगी का हर दूसरा रुपया बैंक को जा रहा है।":"Extreme. Every other rupee goes to the bank."} />
            <RatioCard label={t("fPriceInc")} val={R.priceToInc.toFixed(1)} unit="x" good={4} warn={5} bad={7} desc={R.priceToInc<=5?lang==="hi"?"5x से कम — सेहतमंद। भारत का औसत 7.5x है, आप बेहतर हैं।":"Under 5x — healthy. India average is 7.5x, you are better.":R.priceToInc<=7?lang==="hi"?"तना हुआ। प्लानर्स 5x तक रहने की सलाह देते हैं। आप "+R.priceToInc.toFixed(1)+"x पर हैं।":"Stretched. Planners recommend under 5x. You are at "+R.priceToInc.toFixed(1)+"x.":lang==="hi"?"बहुत ज़्यादा। इस आय पर Rs "+f$(R.comfortablePrice)+" तक सही रहता।":"Far beyond. At your income, Rs "+f$(R.comfortablePrice)+" would be comfortable."} />
          </div>

          {/* Emergency Fund */}
          <div className="ghost" style={{padding:14,borderRadius:14,background:"#fff",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
              <span style={{fontSize:".72rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{t("fEmergency")}</span>
              <span style={{fontSize:".78rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a"}}>{R.emergencyMo.toFixed(1)} {t("fMonthsLabel")}</span>
            </div>
            <div style={{height:8,borderRadius:4,background:"#f4f3f7",overflow:"hidden",marginBottom:6}}><div style={{height:"100%",borderRadius:4,background:R.emergencyMo>=6?"#22c55e":R.emergencyMo>=3?"#f59e0b":"#ba1a1a",width:`${Math.min(R.emergencyMo/6*100,100)}%`}}/></div>
            <p style={{fontSize:".64rem",color:"#474556",lineHeight:1.6}}>
              {R.emergencyMo<3?(lang==="hi"?`डाउन पेमेंट के बाद आपके पास Rs ${f$(savBeyond)} बचा है। इतने में ${R.emergencyMo.toFixed(1)} महीने चलेंगे। 3 EMI मिस करो तो बैंक रिकवरी शुरू कर सकता है। कम से कम 6 महीने का बफर चाहिए — Rs ${f$(Math.round(monthlyTH*.6*6-savBeyond))} और बचाओ पहले।`:`After down payment, you have Rs ${f$(savBeyond)} left. That covers ${R.emergencyMo.toFixed(1)} months. Miss 3 EMIs and the bank can start recovery. You need 6 months minimum — save Rs ${f$(Math.round(monthlyTH*.6*6-savBeyond))} more before buying.`):R.emergencyMo<6?(lang==="hi"?`${R.emergencyMo.toFixed(1)} महीने का बफर है। ठीक है, पर 6 महीने आदर्श है। Rs ${f$(Math.round(monthlyTH*.6*6-savBeyond))} और हों तो बेहतर।`:`${R.emergencyMo.toFixed(1)} months buffer. Okay, but 6 is ideal. Rs ${f$(Math.round(monthlyTH*.6*6-savBeyond))} more would be safer.`):(lang==="hi"?"6+ महीने का बफर — अच्छी स्थिति। नौकरी जाए या बड़ा खर्चा आए, संभाल लोगे।":"6+ months — solid. You can handle a job loss or major expense.")}
            </p>
          </div>

          {/* Life Event Collision Timeline */}
          {R.collision.length>0&&Object.keys(lifeEvts).length>0&&<div>
            <Lbl>{lang==="hi"?"ज़िंदगी टकराव टाइमलाइन":"Life Collision Timeline"}</Lbl>
            <div className="ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
              <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
                <div style={{display:"flex",gap:2,alignItems:"end",height:120,minWidth:Math.max(240,R.collision.length*20)}}>
                  {R.collision.map((yr,i)=>{
                    const h=yr.pct;const dangerZone=h>60;
                    return (<div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",position:"relative"}}>
                      {dangerZone&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50)",width:2,height:"100%",background:"#ba1a1a10"}}/>}
                      <div style={{flex:1,width:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",gap:1}}>
                        <div style={{width:"100%",borderRadius:"2px 2px 0 0",background:dangerZone?"#ba1a1a":"#522de6",height:`${Math.min(yr.pct,100)*0.8}%`,minHeight:yr.housing>0?2:0,position:"relative"}}>
                          {yr.life>0&&<div style={{position:"absolute",bottom:0,left:0,right:0,background:"#f59e0b",height:`${yr.total>0?(yr.life/yr.total)*100:0}%`,borderRadius:"2px 2px 0 0"}}/>}
                        </div>
                      </div>
                      <div style={{fontSize:".38rem",color:dangerZone?"#ba1a1a":"#787587",marginTop:1,fontFamily:"monospace",fontWeight:dangerZone?800:400}}>{yr.pct}%</div>
                      <div style={{fontSize:".38rem",color:"#787587",fontFamily:"monospace"}}>Y{yr.yr}</div>
                    </div>);
                  })}
                </div>
                <div style={{display:"flex",gap:10,marginTop:6}}><Lg c="#522de6" l={lang==="hi"?"मकान":"Housing"}/><Lg c="#f59e0b" l={lang==="hi"?"ज़िंदगी":"Life events"}/></div>
              </div>

              {R.peakYr&&<p style={{fontSize:".64rem",color:"#474556",lineHeight:1.6,marginTop:8}}>
                {lang==="hi"?`साल ${R.peakYr.yr} सबसे तंग होगा — आपकी आय का ${R.peakYr.pct}% सिर्फ़ मकान + ज़िंदगी में जाएगा। ${R.dangerYears.length} साल ऐसे हैं जब 60% से ज़्यादा खर्च होगा। इन सालों में कोई भी अचानक खर्चा (मेडिकल, नौकरी छूटना, रेट बढ़ना) EMI मिस करा सकता है।`:`Year ${R.peakYr.yr} is your tightest — ${R.peakYr.pct}% of income consumed by housing + life events. ${R.dangerYears.length} years exceed 60%. During these years, any surprise expense (medical, job loss, rate hike) could cause missed EMIs.`}
              </p>}
            </div>
          </div>}

          {/* Deep Insights */}
          <Lbl>{t("ins")}</Lbl>
          <IC t={lang==="hi"?`ब्रोशर प्राइस का ${R.mul.toFixed(1)} गुना`:`${R.mul.toFixed(1)}x the brochure price`} x={lang==="hi"?`बिल्डर बोलता है Rs ${f$(R.bp)}। ${tenure} साल में असल खर्चा Rs ${f$(R.tProj)} होगा। फ़र्क Rs ${f$(R.tProj-R.bp)} का है — ये पैसा कहीं और लगाते तो Rs ${f$(Math.round((R.tProj-R.bp)*Math.pow(1.12,10)))} बन सकता था 10 साल में। ये सिर्फ़ ज़्यादा कीमत नहीं — ये ऑपर्च्युनिटी कॉस्ट है।`:`The builder says Rs ${f$(R.bp)}. Over ${tenure} years, you actually spend Rs ${f$(R.tProj)}. The gap of Rs ${f$(R.tProj-R.bp)} invested at 12% would become Rs ${f$(Math.round((R.tProj-R.bp)*Math.pow(1.12,10)))} in 10 years. This is not just extra cost — it is opportunity cost.`} c="#522de6"/>

          <IC t={lang==="hi"?`EMI तुम्हारी आय का ${Math.round(R.emiRatio)}% खाती है`:`EMI eats ${Math.round(R.emiRatio)}% of your take-home`} x={lang==="hi"?`हर महीना Rs ${f$(Math.round(R.housingMo))} सिर्फ़ मकान पर — EMI + मेंटेनेंस + टैक्स + बीमा। बचता है Rs ${f$(Math.round(monthlyTH-R.housingMo))}। इसमें से खाना, ट्रांसपोर्ट, कपड़े, बाहर जाना, बच्चों का खर्चा, माता-पिता — सब चलाना है। बैंक 50% तक मंज़ूर करता है — पर 50% मतलब ज़िंदगी का आधा हिस्सा बैंक का। फाइनेंशियल प्लानर्स 30% से कम रहने की सलाह देते हैं।`:`Every month Rs ${f$(Math.round(R.housingMo))} goes to housing — EMI + maintenance + tax + insurance. That leaves Rs ${f$(Math.round(monthlyTH-R.housingMo))} for food, transport, clothes, outings, children, parents — everything. Banks approve up to 50%, but 50% means half your life belongs to the bank. Planners recommend staying under 30%.`} c={R.emiRatio>40?"#ba1a1a":"#5e5b77"}/>

          {R.tCash>0&&<IC t={lang==="hi"?`कैश लागत Rs ${f$(R.tCash)} है — Rs ${f$(R.cashAmt)} नहीं`:`Cash costs Rs ${f$(R.tCash)}, not Rs ${f$(R.cashAmt)}`} x={lang==="hi"?`Rs ${f$(R.cashAmt)} कैश में देने का मतलब — कोई (बिल्डर का आदमी) तुम्हें कैश जुगाड़ करके देगा और ~${R.cPc}% लेगा (Rs ${f$(R.cFe)})। ये फीस भी कैश में जाएगी। कोई रसीद नहीं। अगर पकड़े गए: Section 269ST में 100% पेनल्टी, Section 68/69 में 78.6% टैक्स, बेनामी एक्ट में प्रॉपर्टी ज़ब्त। IT विभाग का Project Insight AI तुम्हारी आय और प्रॉपर्टी का मिसमैच पकड़ता है।`:`Rs ${f$(R.cashAmt)} "in cash" means a middleman (builder-connected) arranges it and charges ~${R.cPc}% (Rs ${f$(R.cFe)}). Fee also in cash. No receipt. If caught: Section 269ST = 100% penalty, Section 68/69 = 78.6% tax, Benami Act = confiscation. IT Department's Project Insight AI flags income-property mismatches.`} c="#ba1a1a"/>}

          {gender==="male"&&sI.st.female<sI.st.male&&<IC t={lang==="hi"?`Rs ${f$(bp*(sI.st.male-sI.st.female))} बचाओ`:`Save Rs ${f$(bp*(sI.st.male-sI.st.female))}`} x={lang==="hi"?`${sI.l} में महिला के नाम रजिस्ट्री करवाओ: स्टांप ड्यूटी ${(sI.st.female*100).toFixed(1)}% vs पुरुष ${(sI.st.male*100).toFixed(1)}%। कोई नुकसान नहीं — सीधी बचत। अगर पत्नी/माँ को-एप्लिकेंट हैं तो ये सबसे आसान पैसा बचाने का तरीका है।`:`Register in woman's name in ${sI.l}: stamp duty ${(sI.st.female*100).toFixed(1)}% vs ${(sI.st.male*100).toFixed(1)}% for men. Zero downside, pure saving. If wife/mother is co-applicant, this is the easiest money you'll ever save.`} c="#0d9488"/>}
        </div>}

        {/* ── TIMELINE TAB ── */}
        {tab==="timeline"&&<div className="anim">
          <Lbl>{t("tlWho")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <TI w={t("tlBook")} items={[{l:t("tlBook10"),v:fF(Math.min(bp*.1,5e5)),y:true},{l:t("tlLoanFee"),v:fF(la*.005),y:true}]} c="#522de6"/>
            <TI w={t("tlReg")} items={[{l:t("tlDP"),v:fF(R.dp),y:true},{l:t("tlStampLeg"),v:fF(R.govT),y:true},R.tCash>0&&{l:t("tlCashFee"),v:fF(R.tCash),y:true,cash:true}].filter(Boolean)} c="#ce2c66"/>
            {R.isUC&&<TI w={t("tlConst")+" ("+poss+"mo)"} items={[{l:t("tlPreEmi"),v:fF(R.preE),y:true},R.rOv>0&&{l:t("tlYourRent"),v:fF(R.rOv),y:true},{l:t("tlBankDisb"),v:"Rs "+f$(la),y:false}].filter(Boolean)} c="#ac064e"/>}
            <TI w={t("tlPoss")} items={[{l:t("tlSocDep"),v:fF(R.det.upfront[1].v+R.det.upfront[2].v+25e3),y:true}]} c="#5e5b77"/>
            <TI w={t("tlEmiPd")+" ("+tenure+"yr)"} items={[{l:t("tlTotalEmi"),v:fF(R.e*tenure*12),y:true},{l:t("tlBankInt"),v:fF(R.tInt),y:false}]} c="#522de6" last/>
          </div>
          <Lbl>{t("tlAmort")}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14}}>
            <div style={{overflowX:"auto"}}><div style={{display:"flex",gap:2,alignItems:"end",height:100,minWidth:Math.max(240,R.amort.length*12)}}>{R.amort.map((yr,i)=>{const tot=yr.i+yr.p,ip=tot>0?(yr.i/tot)*100:50;return (<div key={i} style={{flex:1,minWidth:6,display:"flex",flexDirection:"column",height:"100%"}}><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div style={{width:"100%",borderRadius:"2px 2px 0 0",background:"#ce2c66",height:`${ip}%`,minHeight:1}}/><div style={{width:"100%",borderRadius:"0 0 2px 2px",background:"#522de6",height:`${100-ip}%`,minHeight:1}}/></div>{(yr.yr===1||yr.yr%5===0||yr.yr===tenure)&&<div style={{fontSize:".4rem",color:"#787587",marginTop:1,textAlign:"center",fontFamily:"monospace"}}>Y{yr.yr}</div>}</div>)})}</div><div style={{display:"flex",gap:10,marginTop:8}}><Lg c="#ce2c66" l={t("interest")}/><Lg c="#522de6" l={t("principal")}/></div></div>
            <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:"#f4f3f7",fontSize:".64rem",color:"#474556",lineHeight:1.5}}>{t("tlY1",{pct:R.amort[0]?Math.round(R.amort[0].i/(R.e*12)*100):"?",flip:(R.amort.findIndex(a=>a.p>a.i)+1)||"?"})}</div>
          </div>

          {/* TIMELINE DEEP INSIGHTS */}
          <Lbl>{t("ins")}</Lbl>
          {(()=>{
            const y1int=R.amort[0]?R.amort[0].i:0;const y1pri=R.amort[0]?R.amort[0].p:0;
            const flipYr=(R.amort.findIndex(a=>a.p>a.i)+1)||tenure;
            const prepay1L=100000;const intSavedPer1L=Math.round(prepay1L*rate/100*flipYr*.5);
            const y5saved=5*prepay1L;const intSaved5=Math.round(y5saved*rate/100*(tenure-3)*.35);
            const rateUp2=calcEMI(la,rate+2,tenure);const emiJump=rateUp2-R.e;
            return (<>
              <IC t={lang==="hi"?`पहले ${flipYr} साल बैंक का मुनाफा — आपका नहीं`:`The first ${flipYr} years are the bank's profit — not yours`} x={lang==="hi"?`पहले साल आपकी EMI Rs ${f$(Math.round(R.e*12))} है। इसमें से Rs ${f$(y1int)} (${Math.round(y1int/(R.e*12)*100)}%) सीधा बैंक का ब्याज है। सिर्फ़ Rs ${f$(y1pri)} (${Math.round(y1pri/(R.e*12)*100)}%) आपका लोन कम करता है। ये अनुपात ${flipYr} साल तक बैंक के पक्ष में रहता है। इसका मतलब: अगर आप 5 साल बाद बेचते हो, तो आपने ज़्यादातर ब्याज दिया है — मूलधन कम हुआ ही नहीं।`:`In Year 1, your annual EMI outflow is Rs ${f$(Math.round(R.e*12))}. Of this, Rs ${f$(y1int)} (${Math.round(y1int/(R.e*12)*100)}%) is pure bank profit — interest. Only Rs ${f$(y1pri)} (${Math.round(y1pri/(R.e*12)*100)}%) actually reduces your loan. This ratio stays in the bank's favour for ${flipYr} years. What this means: if you sell after 5 years, most of what you paid was interest — your outstanding loan is barely lower.`} c="#ce2c66"/>

              <IC t={lang==="hi"?`हर Rs 1 लाख प्रीपेमेंट ~Rs ${f$(intSavedPer1L)} ब्याज बचाता है`:`Every Rs 1L prepayment saves ~Rs ${f$(intSavedPer1L)} in interest`} x={lang==="hi"?`प्रीपेमेंट का जादू ये है कि पैसा सीधे मूलधन से कटता है — और ब्याज मूलधन पर लगता है। पहले 2 साल में हर Rs 1 लाख की प्रीपेमेंट सबसे ज़्यादा असर करती है, क्योंकि बचा हुआ ब्याज ${tenure-2} साल तक कंपाउंड होता है। अगर आप पहले 5 साल में कुल Rs ${f$(y5saved)} प्रीपेमेंट कर सको, तो ~Rs ${f$(intSaved5)} ब्याज बच सकता है — और लोन 3-4 साल जल्दी ख़त्म। ज़्यादातर बैंक साल में 1-2 बार बिना पेनल्टी प्रीपेमेंट देते हैं। बोनस, इंक्रीमेंट, या टैक्स रिफंड मिले — सीधा प्रीपेमेंट करो।`:`Prepayment magic: the amount directly reduces principal — and interest is charged on principal. Every Rs 1L prepaid in the first 2 years has maximum impact because the interest saved compounds over ${tenure-2} remaining years. If you prepay Rs ${f$(y5saved)} total in the first 5 years, you save ~Rs ${f$(intSaved5)} in interest — and finish your loan 3-4 years early. Most banks allow 1-2 penalty-free prepayments per year on floating rate loans. Every bonus, increment, or tax refund should go here first.`} c="#0d9488"/>

              <IC t={lang==="hi"?`अगर ब्याज दर 2% बढ़ी तो EMI Rs ${f$(Math.round(emiJump))} बढ़ जाएगी`:`If rates rise 2%, your EMI jumps Rs ${f$(Math.round(emiJump))}`} x={lang==="hi"?`फ्लोटिंग रेट लोन पर ब्याज दर बढ़ने का खतरा हमेशा है। ${rate}% से ${rate+2}% होने पर EMI Rs ${fM(R.e)} से Rs ${fM(rateUp2)} हो जाएगी — यानी Rs ${f$(Math.round(emiJump))} ज़्यादा हर महीना। साल भर में Rs ${f$(Math.round(emiJump*12))} का अतिरिक्त बोझ। 2022-23 में RBI ने 2.5% रेट बढ़ाया था — ऐसा फिर हो सकता है। इसके लिए तैयार रहो: EMI बजट में 15-20% का बफर रखो।`:`Floating rate loans carry rate risk. A move from ${rate}% to ${rate+2}% pushes EMI from ${fM(R.e)} to ${fM(rateUp2)} — Rs ${f$(Math.round(emiJump))} more every month, Rs ${f$(Math.round(emiJump*12))} extra per year. RBI hiked 2.5% in 2022-23 — it can happen again. Prepare: keep a 15-20% buffer in your EMI budget.`} c="#ac064e"/>

              {R.preE>0&&<IC t={lang==="hi"?`Rs ${f$(R.preE)} प्री-EMI — बिल्कुल बेकार पैसा`:`Rs ${f$(R.preE)} pre-EMI — completely dead money`} x={lang==="hi"?`कंस्ट्रक्शन के ${poss} महीने में बैंक बिल्डर को किश्तों में पैसा देता है। आप इस पर सिर्फ़ ब्याज देते हो — मूलधन कम नहीं होता। ये पैसा न घर बनाता है, न लोन कम करता है। बस बैंक की जेब में जाता है। ${renting?`ऊपर से किराया Rs ${f$(R.rOv)} अलग चल रहा है। कुल Rs ${f$(R.preE+R.rOv)} — घर में घुसने से पहले।`:""}`:`During ${poss} months of construction, you pay interest-only on whatever the bank has disbursed to the builder. This money does not reduce your principal — it is pure bank profit. Not a single rupee builds your equity. ${renting?`On top of this, rent of Rs ${f$(R.rOv)} runs in parallel. Total Rs ${f$(R.preE+R.rOv)} spent before you set foot in the house.`:""}`} c="#ba1a1a"/>}
            </>);
          })()}
        </div>}

        {/* ── BUY VS RENT ── */}
        {tab==="rent"&&<div className="anim">
          <Lbl>{t("brT",{ten:tenure})}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{fontSize:".66rem",color:"#787587",marginBottom:12,lineHeight:1.5}}>{t("brIf",{rent:fM(curRent),inv:invRet})}</div>
            {[{l:t("brInv"),v:R.invT,c:"#22c55e"},{l:t("brP4"),v:R.pa4,c:"#522de6"},{l:t("brP7"),v:R.pa7,c:"#6B4EFF"},{l:t("brTR"),v:R.tRentV,c:"#ce2c66"}].map((b,i)=>{const mx=Math.max(R.invT,R.pa7,R.tRentV),p=mx>0?(b.v/mx)*100:0;return (<div key={i} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:".64rem",fontWeight:600,color:"#474556"}}>{b.l}</span><span style={{fontSize:".66rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:b.c}}>Rs {f$(b.v)}</span></div><div style={{height:6,borderRadius:3,background:"#f4f3f7",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:b.c,width:`${p}%`}}/></div></div>)})}
          </div>

          <Lbl>{t("ins")}</Lbl>
          <IC t={R.invT>R.pa7?t("brV1"):R.invT>R.pa4?t("brV2"):t("brV3")} x={R.invT>R.pa7?(lang==="hi"?`अगर तुम Rs ${f$(R.d1)} Day-1 पर लगाने की बजाय ${invRet}% पर निवेश करो + हर महीना Rs ${f$(Math.max(0,Math.round(R.moS)))} बचत करो, तो ${tenure} साल में Rs ${f$(R.invT)} बनता है। प्रॉपर्टी 7% बढ़त पर भी Rs ${f$(R.pa7)} ही होगी। फ़र्क Rs ${f$(Math.round(R.invT-R.pa7))} का है — और निवेश लिक्विड है, प्रॉपर्टी नहीं।`:`If you invest Rs ${f$(R.d1)} instead of the down payment at ${invRet}%, plus save Rs ${f$(Math.max(0,Math.round(R.moS)))}/mo, in ${tenure} years you have Rs ${f$(R.invT)}. Property even at 7% growth is Rs ${f$(R.pa7)}. The gap is Rs ${f$(Math.round(R.invT-R.pa7))} — and investments are liquid, property is not.`):R.invT>R.pa4?(lang==="hi"?`निवेश कॉर्पस Rs ${f$(R.invT)} vs प्रॉपर्टी 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}। अगर इलाके में 7% बढ़त का भरोसा है तो खरीदो। नहीं है तो किराया + निवेश ज़्यादा समझदारी है। ये फ़ैसला "क्या मुझे घर चाहिए" नहीं — "क्या इस इलाके में ग्रोथ होगी" है।`:`Investment corpus Rs ${f$(R.invT)} vs property at 4%: Rs ${f$(R.pa4)}, at 7%: Rs ${f$(R.pa7)}. If you are confident this area grows at 7%+, buying wins. If not, renting + investing is smarter. The question is not "should I own" — it is "will this location grow?"`):(lang==="hi"?`प्रॉपर्टी 4% बढ़त पर भी Rs ${f$(R.pa4)} — निवेश कॉर्पस Rs ${f$(R.invT)} के बराबर या ज़्यादा। 7% पर Rs ${f$(R.pa7)}। यहां खरीदना सही दिखता है, पर याद रखो: ये तभी सच है जब तुम ${tenure} साल तक EMI भर सको बिना किसी रुकावट के।`:`Property at even 4% becomes Rs ${f$(R.pa4)} — matching or beating the investment corpus of Rs ${f$(R.invT)}. At 7% it is Rs ${f$(R.pa7)}. Buying looks favourable here, but remember: this only holds if you can sustain EMIs for the full ${tenure} years without interruption.`)} c="#522de6"/>

          <IC t={lang==="hi"?"किराया 'बर्बाद' नहीं है — ये फ्लेक्सिबिलिटी की कीमत है":"Rent is not 'wasted' — it is the price of flexibility"} x={lang==="hi"?`${tenure} साल में कुल किराया Rs ${f$(R.tRentV)} होगा। ये बहुत लगता है, पर सोचो: किराये पर तुम कभी भी शहर बदल सकते हो (बेहतर नौकरी), डाउनसाइज़ कर सकते हो (खर्चा कम), या अपग्रेड कर सकते हो। प्रॉपर्टी में फंसे हो — बेचना 6-12 महीने लगता है, स्टांप ड्यूटी + ब्रोकरेज फिर लगेगी। EMI मिस करो तो CIBIL स्कोर गिरता है। किराये पर कोई ऐसा रिस्क नहीं।`:`Total rent over ${tenure} years: Rs ${f$(R.tRentV)}. Looks like a lot, but consider: as a renter you can relocate for a better job, downsize to cut costs, or upgrade anytime. Property locks you — selling takes 6-12 months, incurs stamp duty + brokerage again. Miss EMIs and your CIBIL score drops. Renting carries none of these risks.`} c="#5e5b77"/>

          {(()=>{const totalBuyCost=R.tProj;const totalRentInvest=R.tRentV+R.invT;const netBuyAdvantage=R.pa7-totalBuyCost+R.tRentV;return (<IC t={lang==="hi"?`ब्रेकईवन: प्रॉपर्टी को ${R.pa7>totalBuyCost?"7%":"4%"} से ज़्यादा बढ़ना होगा`:`Break-even: property needs ${R.pa7>totalBuyCost?"7%":"4%"}+ growth`} x={lang==="hi"?`तुम कुल Rs ${f$(totalBuyCost)} खर्च कर रहे हो (EMI + ब्याज + सब खर्चे)। प्रॉपर्टी को इतना बढ़ना चाहिए कि बेचने पर ये पैसा वापस मिले + किराया जो बचा वो भी कवर हो। 4% बढ़त पर Rs ${f$(R.pa4)}, 7% पर Rs ${f$(R.pa7)}। अगर इलाके में 4% से कम बढ़त है, तो प्रॉपर्टी "एसेट" नहीं, "लायबिलिटी" है — हर साल पैसा खा रही है।`:`Your total cost of ownership is Rs ${f$(totalBuyCost)} (EMI + interest + all costs). Property must appreciate enough to recover this plus the rent savings you forgo. At 4%: Rs ${f$(R.pa4)}, at 7%: Rs ${f$(R.pa7)}. If your area grows under 4%, this property is not an "asset" — it is a liability that consumes money every year.`} c="#ac064e"/>);})()}

          <IC t={t("brOpp")} x={lang==="hi"?`Rs ${f$(R.d1)} — ये तुम्हारा Day-1 खर्चा है। अगर ये पैसा ${invRet}% पर ${tenure} साल लगाओ = Rs ${f$(R.fvL)}। मकान खरीदकर ये कैपिटल लॉक हो गया — ज़रूरत पड़ने पर निकाल नहीं सकते। प्रॉपर्टी बेचने में 6-12 महीने लगते हैं। SIP में कल निकालो। ये "नुकसान" नहीं है — पर ये एक चुनाव है जो आंखें खोलकर करो।`:`Rs ${f$(R.d1)} is your Day-1 outflow. Invested at ${invRet}% for ${tenure} years = Rs ${f$(R.fvL)}. Buying locks this capital — you cannot access it in an emergency. Selling property takes 6-12 months. An SIP can be redeemed tomorrow. Not a "loss" — but a choice you should make with eyes open.`} c="#5e5b77"/>
        </div>}

        {/* ── INTELLIGENCE TAB ── */}
        {tab==="intel"&&<div className="anim">
          <Lbl>{t("itT")} — {cI?.l}</Lbl>
          <div className="ghost lift" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div><div style={{fontSize:".72rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{t("itFree")}</div><div style={{fontSize:".54rem",color:"#787587"}}>{t("itFreeD")}</div></div>
              {!aiData&&!aiLoading&&<button onClick={fetchAI} style={{padding:"6px 14px",borderRadius:99,background:"#522de6",color:"#fff",fontSize:".64rem",fontWeight:800,border:"none",cursor:"pointer",whiteSpace:"nowrap"}}>{t("itBtn")}</button>}
            </div>
            {aiLoading&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{width:20,height:20,border:"2.5px solid #e3e2e6",borderTopColor:"#522de6",borderRadius:99,margin:"0 auto 6px",animation:"spin .8s linear infinite"}}/><div style={{fontSize:".62rem",color:"#787587"}}>{t("itLoad")}</div></div>}
            {aiErr&&<div style={{padding:"8px 12px",borderRadius:8,background:"#ba1a1a08",fontSize:".6rem",color:"#ba1a1a",whiteSpace:"pre-wrap",wordBreak:"break-word",lineHeight:1.4,maxHeight:200,overflow:"auto"}}>{aiErr}</div>}
            {aiData&&aiData.data&&<div style={{display:"grid",gap:6}}>
              {aiData.data.market_direction&&<div style={{padding:"10px 12px",borderRadius:10,background:"#f4f3f7",border:"1px solid #e3e2e6"}}><div style={{fontSize:".5rem",fontWeight:800,color:"#787587",letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:2}}>{t("itMkt")}</div><div style={{fontSize:".78rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"capitalize"}}>{(aiData.data.market_direction.signal||"").replace(/_/g," ")}</div>{aiData.data.market_direction.reason&&<div style={{fontSize:".64rem",color:"#474556",lineHeight:1.4,marginTop:2}}>{aiData.data.market_direction.reason}</div>}</div>}
              {aiData.data.price_trend&&<div style={{padding:"10px 12px",borderRadius:10,background:"#f4f3f7",border:"1px solid #e3e2e6"}}><div style={{fontSize:".5rem",fontWeight:800,color:"#787587",letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:2}}>{t("itTrend")}</div><div style={{fontSize:".78rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"capitalize"}}>{aiData.data.price_trend.direction||"N/A"} {aiData.data.price_trend.yoy_pct!=null&&<span style={{fontSize:".64rem",fontFamily:"'JetBrains Mono'",color:"#22c55e"}}>{aiData.data.price_trend.yoy_pct>0?"+":""}{aiData.data.price_trend.yoy_pct}%</span>}</div>{aiData.data.price_trend.detail&&<div style={{fontSize:".64rem",color:"#474556",lineHeight:1.4,marginTop:2}}>{aiData.data.price_trend.detail}</div>}</div>}
              {aiData.data.buyer_tip&&<div style={{padding:"8px 10px",borderRadius:8,background:"#522de608",fontSize:".64rem",color:"#474556",lineHeight:1.4}}><strong style={{color:"#522de6"}}>{t("itTip")}:</strong> {aiData.data.buyer_tip}</div>}
              {aiData.sources?.length>0&&<div style={{fontSize:".52rem",color:"#787587"}}>{t("itSrc")}: {aiData.sources.slice(0,3).map((s,i)=> <a key={i} href={s.url} target="_blank" rel="noopener" style={{color:"#522de6",marginRight:4}}>{s.title||"Link"}</a>)}</div>}
            </div>}
            {!aiData&&!aiLoading&&!aiErr&&<div style={{textAlign:"center",padding:"12px 0",fontSize:".66rem",color:"#787587"}}>{t("itBtn")} →</div>}
          </div>

          {/* Premium — stronger pitch */}
          <div style={{padding:"18px 16px",borderRadius:16,background:"linear-gradient(135deg,#522de610,#ce2c6608)"}}>
            <div style={{textAlign:"center",marginBottom:14}}>
              <h3 style={{fontSize:".9rem",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",marginBottom:3}}>{t("prH")}<br/><span style={{color:"#522de6"}}>{t("prH2")}</span></h3>
              <p style={{fontSize:".64rem",color:"#787587",lineHeight:1.5,marginBottom:8}}>{t("prD")}</p>
            </div>
            <div style={{display:"grid",gap:4,marginBottom:12}}>
              {[
                {i:"balance",t:lang==="hi"?"सही कीमत: ये दाम वाजिब है या नहीं?":"Fair Price: is this price justified?"},
                {i:"apartment",t:lang==="hi"?"सप्लाई पाइपलाइन: रीसेल पर असर":"Supply Pipeline: resale risk"},
                {i:"train",t:lang==="hi"?"इंफ्रा इंपैक्ट: मेट्रो, हाइवे, IT पार्क":"Infrastructure: metro, highway, IT parks"},
                {i:"handshake",t:lang==="hi"?"निगोशिएशन प्लेबुक: कितना डिस्काउंट मिलेगा":"Negotiation: realistic discount range"},
                {i:"verified",t:lang==="hi"?"बिल्डर ट्रैक रिकॉर्ड: देरी, शिकायतें, केस":"Builder Track: delays, complaints, cases"},
                {i:"target",t:lang==="hi"?`आपकी आय (Rs ${f$(annualInc)}) पर सही प्रॉपर्टी रेंज`:`Right property range for Rs ${f$(annualInc)} income`},
                {i:"family_restroom",t:lang==="hi"?`ज़िंदगी + EMI: ${Object.keys(lifeEvts).length} इवेंट्स का ${tenure} साल कैश फ्लो प्लान`:`Life + EMI: ${Object.keys(lifeEvts).length} events across ${tenure}yr cash flow`},
                {i:"shield",t:lang==="hi"?"रिस्क प्लान: नौकरी जाए, रेट बढ़े, बच्चा हो — तब क्या?":"Risk Plan: job loss, rate hike, new child — then what?"},
              ].map((c,i)=> <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"8px 10px",borderRadius:10,background:"#fff",border:"1px solid rgba(201,196,217,.25)"}}><span className="material-symbols-outlined" style={{fontSize:14,color:"#522de6"}}>{c.i}</span><span style={{fontSize:".62rem",fontWeight:600,flex:1}}>{c.t}</span><span className="material-symbols-outlined" style={{fontSize:11,color:"#ce2c66"}}>lock</span></div>)}
            </div>
            {wlSent?<div style={{textAlign:"center",padding:"12px",borderRadius:10,background:"#22c55e10",border:"1px solid #22c55e25"}}><span className="material-symbols-outlined" style={{fontSize:22,color:"#22c55e",display:"block",marginBottom:3}}>check_circle</span><div style={{fontSize:".74rem",fontWeight:800,color:"#22c55e"}}>{t("prOk")}</div><div style={{fontSize:".58rem",color:"#787587",marginTop:2}}>{t("prOkD")}</div></div>
            :<form name="waitlist" method="POST" data-netlify="true" onSubmit={e=>{e.preventDefault();const fd=new FormData(e.target);fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(fd).toString()}).then(()=>setWlSent(true)).catch(()=>setWlSent(true))}}>
              <input type="hidden" name="form-name" value="waitlist"/><input type="hidden" name="city" value={cI?.l||""}/><input type="hidden" name="state" value={sI?.l||""}/><input type="hidden" name="price" value={bp}/><input type="hidden" name="income" value={annualInc}/>
              <div style={{display:"flex",gap:5,marginBottom:6}}><input type="email" name="email" value={wlEmail} onChange={e=>setWlEmail(e.target.value)} placeholder="your@email.com" required style={{flex:2,height:38,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#fff",fontSize:".76rem",outline:"none"}}/><input type="text" name="pincode" value={wlPin} onChange={e=>setWlPin(e.target.value)} placeholder="Pincode" maxLength={6} style={{flex:1,height:38,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#fff",fontSize:".76rem",outline:"none",fontFamily:"'JetBrains Mono'"}}/></div>
              <button type="submit" style={{width:"100%",padding:"10px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:800,fontSize:".74rem",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans'"}}>{t("prBtn")}</button>
            </form>}
          </div>
        </div>}
      </div>}

      </main>
      <div style={{textAlign:"center",padding:"14px 16px 20px",fontSize:".5rem",color:"#787587",fontFamily:"monospace"}}>{t("foot")}<br/><strong style={{color:"#474556"}}>un-real-estate</strong></div>
    </div>
  );
}

/* ═══ COMPONENTS ═══ */
function DRows({rows}){if(!rows)return null;return (<div>{rows.map((d,i)=> (<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #f4f3f7",alignItems:"baseline",gap:6}}><div style={{display:"flex",alignItems:"center",gap:4,minWidth:0,flex:1}}>{d.cash&&<span style={{width:4,height:4,borderRadius:99,background:"#ba1a1a",flexShrink:0}}/>}<span style={{fontSize:".66rem",color:d.b?"#1a1c1e":d.w?"#ba1a1a":"#474556",fontWeight:d.b?800:500}}>{d.l}</span></div><span style={{fontSize:".66rem",fontFamily:"'JetBrains Mono'",fontWeight:d.b?800:600,color:d.w?"#ba1a1a":"#1a1c1e",whiteSpace:"nowrap",flexShrink:0}}>{typeof d.v==="number"?fF(d.v):d.v}</span></div>))}</div>)}
function PF({l,h,children}){return (<div style={{marginBottom:9}}><label style={{display:"block",fontSize:".64rem",fontWeight:700,color:"#474556",marginBottom:3}}>{l}{h&&<span style={{fontWeight:500,color:"#787587"}}> — {h}</span>}</label>{children}</div>)}
function PSel({v,set,o}){return (<select value={v} onChange={set} style={{width:"100%",height:38,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".78rem",outline:"none"}}>{o.map(x=> <option key={String(x.v)} value={x.v}>{x.l}</option>)}</select>)}
function PNum({v,set}){return (<input type="number" value={v} onChange={e=>set(Number(e.target.value))} style={{width:"100%",height:38,padding:"0 10px",borderRadius:10,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".8rem",outline:"none",fontFamily:"'JetBrains Mono'",fontWeight:600}}/>)}
function PTog({o,v,set}){return (<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{o.map(x=> <button key={String(x.v)} onClick={()=>set(x.v)} style={{flex:1,minWidth:50,padding:"6px 4px",borderRadius:8,border:v===x.v?"1.5px solid #522de6":"1px solid #e3e2e6",background:v===x.v?"#522de610":"#faf9fd",color:v===x.v?"#522de6":"#787587",fontSize:".66rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{x.l}</button>)}</div>)}
function DB({color,onClick}){return (<button onClick={onClick} style={{width:"100%",padding:"10px",borderRadius:10,background:color,color:"#fff",fontWeight:800,fontSize:".74rem",border:"none",cursor:"pointer",marginTop:8,fontFamily:"'Plus Jakarta Sans'"}}>Done</button>)}
function Chip({children,accent}){return (<div style={{padding:"6px 10px",borderRadius:8,background:accent?"#522de608":"#f4f3f7",border:accent?"1px solid #522de615":"1px solid #e3e2e6",fontSize:".64rem",color:"#474556",fontFamily:"'JetBrains Mono'",marginBottom:8,lineHeight:1.5}}>{children}</div>)}
function QS({l,v,w}){return (<div className="ghost" style={{padding:"8px 10px",borderRadius:10,background:w?"#ba1a1a06":"#fff"}}><div style={{fontSize:".48rem",fontWeight:700,color:w?"#ba1a1a":"#787587",letterSpacing:".06em",textTransform:"uppercase",marginBottom:1}}>{l}</div><div style={{fontSize:".74rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:w?"#ba1a1a":"#1a1c1e"}}>{v}</div></div>)}
function IC({t,x,c}){return (<div className="ghost" style={{padding:12,borderRadius:12,background:"#fff",marginBottom:6,boxShadow:"0 4px 14px -4px rgba(98,95,123,.06)"}}><h4 style={{fontSize:".72rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",marginBottom:3,color:c}}>{t}</h4><p style={{fontSize:".64rem",color:"#474556",lineHeight:1.65}}>{x}</p></div>)}
function Lbl({children}){return (<p style={{fontSize:".5rem",fontWeight:700,color:"#787587",letterSpacing:".12em",textTransform:"uppercase",marginBottom:8}}>{children}</p>)}
function Lg({c,l}){return (<span style={{fontSize:".54rem",color:"#474556",display:"flex",alignItems:"center",gap:3}}><span style={{width:6,height:3,borderRadius:1,background:c}}/>{l}</span>)}
function TI({w,items,c,last}){return (<div style={{display:"flex",gap:10,paddingBottom:last?0:12,position:"relative"}}>{!last&&<div style={{position:"absolute",left:5,top:16,bottom:0,width:1.5,background:"#e3e2e6"}}/>}<div style={{width:12,height:12,borderRadius:99,background:c,flexShrink:0,marginTop:2}}/><div style={{flex:1}}><div style={{fontSize:".66rem",fontWeight:800,color:c,marginBottom:2,fontFamily:"'Plus Jakarta Sans'"}}>{w}</div>{items.map((it,i)=> <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",gap:4}}><div style={{display:"flex",alignItems:"center",gap:4}}>{it.cash&&<span style={{width:4,height:4,borderRadius:99,background:"#ba1a1a"}}/>}<span style={{fontSize:".64rem",color:it.y?"#1a1c1e":"#787587",fontWeight:it.y?600:400,fontStyle:it.y?"normal":"italic"}}>{it.l}</span></div>{it.v&&<span style={{fontSize:".64rem",fontFamily:"'JetBrains Mono'",fontWeight:600,color:it.cash?"#ba1a1a":it.y?"#1a1c1e":"#787587",whiteSpace:"nowrap"}}>{it.v}</span>}</div>)}</div></div>)}
function RatioCard({label,val,unit,good,warn,bad,desc}){const n=parseFloat(val);const c=n<=good?"#22c55e":n<=warn?"#f59e0b":n<=bad?"#ba1a1a":"#ba1a1a";return (<div className="ghost" style={{padding:12,borderRadius:12,background:"#fff"}}><div style={{fontSize:".54rem",fontWeight:700,color:"#787587",marginBottom:4}}>{label}</div><div style={{fontSize:"1rem",fontWeight:900,fontFamily:"'JetBrains Mono'",color:c}}>{typeof val==="number"?Math.round(val):val}<span style={{fontSize:".6rem"}}>{unit}</span></div><p style={{fontSize:".58rem",color:"#474556",lineHeight:1.5,marginTop:4}}>{desc}</p></div>)}
