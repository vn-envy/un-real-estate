import { useState, useMemo, useCallback, useRef, useEffect, createContext, useContext } from "react";

/* ═══════ i18n ═══════ */
const LangCtx = createContext();
const useLang = () => useContext(LangCtx);

const T = {
  en: {
    tag: "the real cost, before you sign",
    heroSub: "Total Cost Architecture",
    heroH: "Every cost.", heroH2: "No fiction.",
    heroP: "Expand each section. We calculate what they never told you.",
    s_prop: "Property", s_govt: "Government Charges", s_fin: "Financing",
    s_int: "Interiors & Move-in", s_rec: "Recurring Costs", s_up: "Upfront & Hidden",
    auto: "Auto-calculated", req: "Required",
    state: "State", city: "City / Zone", circle: "Circle rate",
    agrVal: "Agreement Value (Rs)", carpet: "Carpet Area (sqft)",
    gender: "Buyer Gender", male: "Male", female: "Female", joint: "Joint",
    txn: "Transaction", txnNew: "New (Builder)", txnRe: "Resale",
    cstat: "Construction Status", csU: "Under Construction", csR: "Ready to Move",
    poss: "Possession (months from now)", rentNow: "Currently renting?",
    yes: "Yes", no: "No", moRent: "Monthly Rent (Rs)",
    propAge: "Property Age", brokPct: "Brokerage %", socTx: "Society Transfer (Rs)",
    cashAmt: "Cash Component (Rs)", cashHelp: "Off-books. We advise zero.",
    cashWhen: "When paid?", booking: "Booking", registration: "Registration", possession: "Possession",
    cashReal: "Handling reality", cashFeeLabel: "Handling fee", cashTotalLabel: "Total cash burden",
    done: "Done", transform: "Transform", transformSub: "See where every rupee goes",
    loanAmt: "Loan Amount (Rs)", intRate: "Interest Rate %", tenure: "Tenure (years)",
    compRent: "Comparable Rent", compRentH: "For Buy vs Rent tab",
    invRet: "Investment Return %", invRetH: "Nifty 50 avg ~12%",
    handover: "Handover Status", condition: "Current Condition",
    bare: "Bare Shell", semi: "Semi-Furnished", full: "Fully Furnished",
    ready: "Move-in Ready", cosmetic: "Needs Refresh", reno: "Major Reno",
    quality: "Interior Quality", parking: "Parking",
    covered: "Covered", open: "Open", included: "Included",
    noInterior: "No interior budget needed for furnished units.",
    tBreak: "Breakdown", tTime: "Timeline", tRent: "Buy vs Rent", tIntel: "Intelligence",
    day1: "Day-1 Cash", monthly: "Monthly", cashBurden: "Cash Burden",
    insights: "Insights", edit: "Edit",
    insMulti: "{mul}x the sticker price",
    insMultiD: "Rs {bp} becomes Rs {tp} over {ten}yr.",
    insCash: "Cash costs Rs {tc}, not Rs {ca}",
    insCashD: "~{cp}% handling (Rs {cf}) to builder-connected broker.",
    insPreE: "Rs {pe} before move-in",
    insPreED: "Pre-EMI: Rs {preE}. {rent}Does not reduce loan.",
    insGender: "Save Rs {save}",
    insGenderD: "Woman's name: {f}% vs {m}% stamp.",
    tlWho: "Who pays what, when",
    tlAmort: "Amortization — Interest vs Principal",
    tlY1: "Year 1: {pct}% of EMI is bank profit. Flips at ~Year {flip}.",
    brTitle: "Buy vs Rent — {ten} years",
    brIf: "If you rent at {rent} and invest Day-1 cash + monthly savings at {inv}%:",
    brInvest: "Investment corpus", brP4: "Property @ 4%", brP7: "Property @ 7%", brTotalRent: "Total rent paid",
    brVerdict1: "Math favours renting + investing", brVerdict2: "Close call", brVerdict3: "Buying looks favourable",
    brOpp: "Opportunity cost of Day-1 cash",
    intelTitle: "Pincode Intelligence", intelSub: "AI analyses real-time data for your location.",
    intelFree: "Free Market Preview", intelFreeD: "2 live insights powered by AI",
    intelBtn: "Get Insights", intelLoading: "Searching...", intelErr: "Could not fetch. Try again.",
    intelMkt: "Market Direction", intelTrend: "Price Trend",
    intelTip: "Analyst tip", intelSrc: "Sources", intelFresh: "Data",
    premTitle: "Premium Intelligence", premH: "All 8 analyses. One PDF.", premH2: "Your exact pincode.",
    premD: "Search-backed, AI-generated, zero builder affiliation.",
    premBtn: "Join Waitlist — Free for first 500",
    premDone: "You are on the list.", premDoneD: "We will notify you when Premium launches.",
    foot: "2025-26 rates. Reference only.",
    you: "YOU", bank: "BANK", interest: "Interest", principal: "Principal",
    premium: "Premium",
  },
  hi: {
    tag: "सच्ची लागत, साइन करने से पहले",
    heroSub: "कुल लागत विश्लेषण",
    heroH: "हर खर्चा।", heroH2: "कोई झूठ नहीं।",
    heroP: "हर सेक्शन खोलें। हम वो बताएंगे जो कोई नहीं बताता।",
    s_prop: "प्रॉपर्टी", s_govt: "सरकारी शुल्क", s_fin: "फाइनेंसिंग",
    s_int: "इंटीरियर और शिफ्टिंग", s_rec: "रिकरिंग खर्चे", s_up: "अपफ्रंट और छिपे खर्चे",
    auto: "ऑटो-कैलकुलेट", req: "ज़रूरी",
    state: "राज्य", city: "शहर / ज़ोन", circle: "सर्किल रेट",
    agrVal: "एग्रीमेंट वैल्यू (Rs)", carpet: "कार्पेट एरिया (sqft)",
    gender: "खरीदार का लिंग", male: "पुरुष", female: "महिला", joint: "संयुक्त",
    txn: "खरीद का प्रकार", txnNew: "नया (बिल्डर)", txnRe: "रीसेल",
    cstat: "निर्माण स्थिति", csU: "निर्माणाधीन", csR: "रेडी टू मूव",
    poss: "पज़ेशन (अभी से महीने)", rentNow: "क्या अभी किराये पर हैं?",
    yes: "हां", no: "नहीं", moRent: "मासिक किराया (Rs)",
    propAge: "प्रॉपर्टी उम्र", brokPct: "ब्रोकरेज %", socTx: "सोसाइटी ट्रांसफर (Rs)",
    cashAmt: "कैश कंपोनेंट (Rs)", cashHelp: "बिना रसीद। हम ज़ीरो की सलाह देते हैं।",
    cashWhen: "कब देना है?", booking: "बुकिंग पर", registration: "रजिस्ट्री पर", possession: "पज़ेशन पर",
    cashReal: "कैश की असलियत", cashFeeLabel: "हैंडलिंग फीस", cashTotalLabel: "कुल कैश बोझ",
    done: "हो गया", transform: "ट्रांसफॉर्म", transformSub: "हर रुपया कहां जाता है देखें",
    loanAmt: "लोन राशि (Rs)", intRate: "ब्याज दर %", tenure: "अवधि (साल)",
    compRent: "समान किराया", compRentH: "Buy vs Rent टैब के लिए",
    invRet: "निवेश रिटर्न %", invRetH: "Nifty 50 औसत ~12%",
    handover: "हैंडओवर स्थिति", condition: "मौजूदा हालत",
    bare: "बेयर शेल", semi: "सेमी-फर्निश्ड", full: "फुली फर्निश्ड",
    ready: "मूव-इन रेडी", cosmetic: "रिफ्रेश चाहिए", reno: "पूरा रेनोवेशन",
    quality: "इंटीरियर क्वालिटी", parking: "पार्किंग",
    covered: "कवर्ड", open: "ओपन", included: "शामिल",
    noInterior: "फर्निश्ड यूनिट में इंटीरियर बजट की ज़रूरत नहीं।",
    tBreak: "हिसाब", tTime: "टाइमलाइन", tRent: "किराया vs खरीद", tIntel: "इंटेलिजेंस",
    day1: "पहले दिन कैश", monthly: "मासिक", cashBurden: "कैश बोझ",
    insights: "इनसाइट्स", edit: "बदलें",
    insMulti: "स्टिकर प्राइस का {mul} गुना",
    insMultiD: "Rs {bp} असल में Rs {tp} बन जाता है {ten} साल में।",
    insCash: "कैश लागत Rs {tc} है, Rs {ca} नहीं",
    insCashD: "~{cp}% हैंडलिंग (Rs {cf}) बिल्डर से जुड़े ब्रोकर को।",
    insPreE: "Rs {pe} मूव-इन से पहले खर्च",
    insPreED: "प्री-EMI: Rs {preE}. {rent}यह लोन कम नहीं करता।",
    insGender: "Rs {save} बचाएं",
    insGenderD: "महिला के नाम: {f}% vs {m}% स्टांप ड्यूटी।",
    tlWho: "कौन क्या कब देता है",
    tlAmort: "लोन — ब्याज vs मूलधन",
    tlY1: "पहला साल: EMI का {pct}% बैंक का मुनाफा। ~साल {flip} में बदलता है।",
    brTitle: "किराया बनाम खरीदना — {ten} साल",
    brIf: "अगर {rent} किराया दें और Day-1 कैश + बचत {inv}% पर निवेश करें:",
    brInvest: "निवेश कॉर्पस", brP4: "प्रॉपर्टी @ 4%", brP7: "प्रॉपर्टी @ 7%", brTotalRent: "कुल किराया",
    brVerdict1: "किराया + निवेश बेहतर दिखता है", brVerdict2: "बराबरी है — लोकेशन तय करेगी", brVerdict3: "खरीदना फायदेमंद दिखता है",
    brOpp: "Day-1 कैश की ऑपर्च्युनिटी कॉस्ट",
    intelTitle: "पिनकोड इंटेलिजेंस", intelSub: "AI आपकी लोकेशन का रीयल-टाइम डेटा देखता है।",
    intelFree: "मुफ्त मार्केट प्रीव्यू", intelFreeD: "AI द्वारा 2 लाइव इनसाइट्स",
    intelBtn: "इनसाइट्स पाएं", intelLoading: "खोज रहे हैं...", intelErr: "डेटा नहीं मिला। फिर कोशिश करें।",
    intelMkt: "मार्केट दिशा", intelTrend: "प्राइस ट्रेंड",
    intelTip: "एनालिस्ट सलाह", intelSrc: "स्रोत", intelFresh: "डेटा",
    premTitle: "प्रीमियम इंटेलिजेंस", premH: "8 विश्लेषण। एक PDF।", premH2: "आपके पिनकोड के लिए।",
    premD: "सर्च-बैक्ड, AI-जनित, बिल्डर से कोई संबंध नहीं।",
    premBtn: "वेटलिस्ट जॉइन करें — पहले 500 को मुफ्त",
    premDone: "आप लिस्ट में हैं।", premDoneD: "प्रीमियम लॉन्च होने पर हम बताएंगे।",
    foot: "2025-26 सरकारी दरें। केवल संदर्भ हेतु।",
    you: "आप", bank: "बैंक", interest: "ब्याज", principal: "मूलधन",
    premium: "प्रीमियम",
  },
};

function tr(key, vars) {
  const ctx = useContext(LangCtx);
  let s = T[ctx.lang]?.[key] || T.en[key] || key;
  if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v); });
  return s;
}

/* ═══════ DATA ═══════ */
const SD = {
  telangana: { l: "Telangana", c: { hy_u: { l: "Hyderabad (GHMC)", m: 4.5, pt: .0015, cr: [4500, 12000] }, hy_s: { l: "Hyderabad (Suburbs)", m: 3.5, pt: .0012, cr: [3000, 7000] }, war: { l: "Warangal", m: 2.5, pt: .001, cr: [2000, 4500] } }, st: { male: .06, female: .06, joint: .06 }, rg: .005, rc: null, ms: .005 },
  maharashtra: { l: "Maharashtra", c: { mum: { l: "Mumbai / MMR", m: 6, pt: .002, cr: [8000, 50000] }, pun: { l: "Pune / PCMC", m: 4.5, pt: .0015, cr: [4000, 12000] }, tha: { l: "Thane / Navi Mumbai", m: 5, pt: .0018, cr: [5000, 15000] }, nag: { l: "Nagpur / Nashik", m: 3, pt: .0012, cr: [2500, 6000] } }, st: { male: .06, female: .05, joint: .06 }, rg: .01, rc: 30000, lb: .01 },
  karnataka: { l: "Karnataka", c: { blr: { l: "Bengaluru (BBMP)", m: 5, pt: .0018, cr: [4500, 14000] }, bda: { l: "Bengaluru (Outskirts)", m: 3.5, pt: .0014, cr: [3000, 8000] }, mys: { l: "Mysuru / Hubli", m: 2.5, pt: .001, cr: [2000, 5000] } }, st: { male: .056, female: .042, joint: .05 }, rg: .01, rc: null, cs: .1 },
  delhi: { l: "Delhi NCR", c: { dls: { l: "South Delhi", m: 6, pt: .002, cr: [10000, 80000] }, dlo: { l: "East/West/North", m: 4, pt: .0018, cr: [5000, 20000] }, noi: { l: "Noida / Gr. Noida", m: 4, pt: .0015, cr: [3500, 9000] }, gur: { l: "Gurgaon", m: 5, pt: .0015, cr: [4500, 14000] } }, st: { male: .06, female: .04, joint: .05 }, rg: .01, rc: null },
  tamilnadu: { l: "Tamil Nadu", c: { che: { l: "Chennai", m: 4.5, pt: .0015, cr: [4000, 15000] }, cbe: { l: "Coimbatore", m: 3, pt: .001, cr: [2500, 6000] } }, st: { male: .07, female: .07, joint: .07 }, rg: .04, rc: null },
};
const INTR = [
  { v: 0, l: "Not needed", d: "Furnished" }, { v: 400, l: "Rs 400/sqft", d: "Paint, fans" },
  { v: 1400, l: "Rs 1,400/sqft", d: "Semi-modular" }, { v: 2400, l: "Rs 2,400/sqft", d: "Full modular" },
  { v: 3800, l: "Rs 3,800/sqft", d: "Luxury" },
];

/* ═══════ HELPERS ═══════ */
const f$ = (n) => { if (!n || isNaN(n)) return "0"; if (n >= 1e7) return (n / 1e7).toFixed(2) + " Cr"; if (n >= 1e5) return (n / 1e5).toFixed(1) + " L"; return Math.round(n).toLocaleString("en-IN"); };
const fF = (n) => "Rs " + Math.round(n || 0).toLocaleString("en-IN");
const fM = (n) => "Rs " + Math.round(n || 0).toLocaleString("en-IN") + "/mo";
function calcEMI(p, r, y) { if (!p || p <= 0) return 0; const ri = r / 100 / 12, n = y * 12; if (ri === 0) return p / n; return (p * ri * Math.pow(1 + ri, n)) / (Math.pow(1 + ri, n) - 1); }
function cashFn(a) { if (a <= 0) return 0; if (a <= 1e6) return a * .02; if (a <= 2e6) return a * .03; if (a <= 5e6) return a * .04; return a * .05; }
function cashPc(a) { if (a <= 0) return 0; if (a <= 1e6) return 2; if (a <= 2e6) return 3; if (a <= 5e6) return 4; return 5; }

/* ═══════ APP ═══════ */
export default function App() {
  const [lang, setLang] = useState("en");
  const t = useCallback((key, vars) => {
    let s = T[lang]?.[key] || T.en[key] || key;
    if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.replace(new RegExp(`\\{${k}\\}`, "g"), v); });
    return s;
  }, [lang]);

  const [st, setSt] = useState("telangana"); const [city, setCity] = useState("hy_u");
  const [bp, setBP] = useState(8e6); const [ca, setCA] = useState(1200);
  const [gender, setG] = useState("male"); const [txn, setTxn] = useState("new"); const [cst, setCst] = useState("under");
  const [poss, setPoss] = useState(30); const [renting, setRenting] = useState(true); const [curRent, setCurRent] = useState(25000);
  const [propAge, setPropAge] = useState("0-5"); const [furnish, setFurnish] = useState("bare");
  const [intRate, setIntRate] = useState(2400); const [la, setLA] = useState(6e6);
  const [rate, setRate] = useState(8.5); const [tenure, setTen] = useState(20);
  const [parking, setPk] = useState("covered"); const [stf, setSTF] = useState(5e4); const [bkr, setBk] = useState(1);
  const [cashAmt, setCashAmt] = useState(0); const [cashWhen, setCashWhen] = useState("booking");
  const [invRet, setInvRet] = useState(12);
  const [open, setOpen] = useState(null); const [done, setDone] = useState(new Set());
  const [phase, setPhase] = useState("input"); const [tab, setTab] = useState("pyramid"); const [detailIdx, setDetailIdx] = useState(null);
  const [aiData, setAiData] = useState(null); const [aiLoading, setAiLoading] = useState(false); const [aiErr, setAiErr] = useState(null);
  const [wlEmail, setWlEmail] = useState(""); const [wlPin, setWlPin] = useState(""); const [wlSent, setWlSent] = useState(false);
  const pyrRef = useRef(null);

  useEffect(() => { const cs = Object.keys(SD[st].c); if (!cs.includes(city)) setCity(cs[0]); }, [st]);
  const sI = SD[st], cI = sI?.c[city];
  const mark = useCallback((id) => { setDone(p => { const n = new Set(p); n.add(id); return n; }); setOpen(null); }, []);
  const allDone = done.has("property") && done.has("financing") && done.has("interiors");

  const fetchAI = useCallback(async () => {
    setAiLoading(true); setAiErr(null);
    try {
      const r = await fetch("/api/intel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ state: sI.l, city: cI?.l, basePrice: bp, carpet: ca }) });
      const j = await r.json();
      if (!r.ok || j.error) throw new Error(j.error || r.status);
      setAiData(j);
    } catch (e) { setAiErr(e.message); } finally { setAiLoading(false); }
  }, [st, city, sI, cI, bp, ca]);

  /* ═══ CALC ═══ */
  const R = useMemo(() => {
    if (!cI) return null;
    const isUC = txn === "new" && cst === "under";
    const isRe = txn === "resale";
    const ec = isRe ? "ready" : cst;

    let sr = gender === "joint" ? (sI.st.joint || sI.st.male) : (sI.st[gender] || sI.st.male);
    if (st === "telangana" && (city === "hy_u" || city === "hy_s")) sr += sI.ms || 0;
    if (st === "maharashtra" && city === "mum") sr += sI.lb || 0;
    const sd = bp * sr;
    let rg = bp * sI.rg; if (sI.rc) rg = Math.min(rg, sI.rc);
    let sur = 0; if (st === "karnataka" && sI.cs) sur = sd * sI.cs;
    let gst = 0; if (ec === "under") gst = bp * ((bp <= 45e5 && ca <= 645) ? .01 : .05);
    const tds = bp >= 5e6 ? bp * .01 : 0;
    const leg = Math.max(15e3, Math.min(bp * .003, 5e4)); const doc = 5e3;
    const govT = sd + rg + sur + gst + leg + doc;

    const brk = isRe ? bp * (bkr / 100) : 0;
    const stfV = isRe ? stf : 0;
    const lp = la * .005, cer = 500, ld = la > 2e6 ? 8e3 : 3e3, lc = lp + cer + ld;
    const effInt = (furnish === "full" || furnish === "ready") ? 0 : intRate;
    const inter = ca * effInt;
    const mov = 15e3, ud = 25e3, club = 25e3;
    const moveIn = inter + mov + ud + club;
    const mm = ca * (cI.m || 3), md = mm * 24;
    const corp = Math.max(5e4, bp * .005);
    let pkC = 0;
    if (parking === "covered") pkC = st === "maharashtra" ? 5e5 : 3e5;
    if (parking === "open") pkC = st === "maharashtra" ? 25e4 : 15e4;
    const apt = bp * (cI.pt || .001), aIns = Math.max(3e3, bp * 5e-4), aMaint = mm * 12;
    const aR = apt + aIns + aMaint;
    const e = calcEMI(la, rate, tenure), totalRepay = e * tenure * 12, tInt = totalRepay - la;
    let preE = 0, rOver = 0;
    if (isUC) { preE = (la * .5) * (rate / 100 / 12) * poss; if (renting) rOver = curRent * poss; }
    let reno = 0;
    if (isRe && furnish === "reno") { const rr = { "0-5": 200, "5-10": 500, "10-20": 900, "20+": 1300 }; reno = ca * (rr[propAge] || 400); }

    const cFe = cashFn(cashAmt); const cPc = cashPc(cashAmt); const tCash = cashAmt + cFe;
    const dp = bp - la;
    const upV = dp + md + corp + pkC + brk + stfV + lc + tCash;
    const tProj = bp + govT + tInt + moveIn + lc + preE + rOver + reno + (aR * tenure) + md + corp + pkC + brk + stfV + tCash;
    const mul = tProj / bp;
    const d1 = dp + govT + moveIn + md + corp + pkC + brk + stfV + lc + preE + reno + tCash;

    // Amortization
    const amort = []; let bal = la;
    for (let yr = 1; yr <= Math.min(tenure, 30); yr++) {
      let yi = 0, yp = 0;
      for (let m = 0; m < 12; m++) { const mi = bal * (rate / 100 / 12); const mp = e - mi; yi += mi; yp += Math.max(0, mp); bal = Math.max(0, bal - mp); }
      amort.push({ yr, i: Math.round(yi), p: Math.round(yp) });
    }

    // Buy vs Rent
    const fvL = d1 * Math.pow(1 + invRet / 100, tenure);
    const moS = e + aR / 12 - curRent;
    let fvM = 0; if (moS > 0) { const ri = invRet / 100 / 12, n = tenure * 12; fvM = moS * ((Math.pow(1 + ri, n) - 1) / ri); }
    const pa4 = bp * Math.pow(1.04, tenure);
    const pa7 = bp * Math.pow(1.07, tenure);
    const tRentVal = curRent * 12 * tenure * 1.5;
    const invT = fvL + Math.max(0, fvM);

    // Pyramid segments
    const sorted = [
      { id: "property", label: t("s_prop"), val: bp, icon: "home", when: "Registration" },
      { id: "government", label: t("s_govt"), val: govT, icon: "gavel", when: "Registration" },
      { id: "financing", label: t("s_fin"), val: tInt + lc + preE, icon: "account_balance", when: isUC ? "Construction+EMI" : "EMI" },
      { id: "interiors", label: t("s_int"), val: moveIn + reno, icon: "design_services", when: "Before move-in" },
      { id: "recurring", label: t("s_rec"), val: aR * tenure, icon: "autorenew", when: "Monthly/Annual" },
      { id: "upfront", label: tCash > 0 ? t("s_up") + " + Cash" : t("s_up"), val: upV, icon: "visibility", when: "Before keys" },
    ].sort((a, b) => b.val - a.val);
    const pal = ["#522de6", "#6B4EFF", "#ce2c66", "#ac064e", "#5e5b77", "#787587"];
    sorted.forEach((s, i) => { s.color = pal[i]; s.pct = tProj > 0 ? (s.val / tProj * 100) : 0; });

    // Details
    const det = {
      property: [{ l: t("agrVal"), v: bp }, { l: "/sqft", v: "Rs " + Math.round(bp / (ca || 1)).toLocaleString("en-IN") }, { l: t("city"), v: cI.l + ", " + sI.l }],
      government: [{ l: "Stamp (" + (sr * 100).toFixed(1) + "%)", v: sd }, { l: "Regn", v: rg }, sur > 0 && { l: "Cess", v: sur }, gst > 0 && { l: "GST", v: gst }, tds > 0 && { l: "TDS", v: tds }, { l: "Legal+Docs", v: leg + doc }].filter(Boolean),
      financing: [{ l: "EMI", v: fM(e) }, { l: t("interest"), v: tInt, w: true }, { l: "Loan fees", v: lc }, preE > 0 && { l: "Pre-EMI (" + poss + "mo)", v: preE, w: true }, rOver > 0 && { l: "Rent overlap", v: rOver, w: true }].filter(Boolean),
      interiors: [inter > 0 && { l: "Interior (Rs " + effInt + "/sqft)", v: inter }, reno > 0 && { l: "Renovation", v: reno }, { l: "Moving+Utils+Club", v: mov + ud + club }].filter(Boolean),
      recurring: [{ l: "Maint/mo", v: fM(mm) }, { l: "Tax/yr", v: apt }, { l: "Insurance/yr", v: aIns }, { l: tenure + "yr total", v: aR * tenure, b: true }],
      upfront: [{ l: "Down Payment", v: dp }, { l: "Maint Deposit", v: md }, { l: "Corpus", v: corp }, pkC > 0 && { l: t("parking"), v: pkC }, brk > 0 && { l: "Brokerage", v: brk }, stfV > 0 && { l: "Soc Transfer", v: stfV }, { l: "Loan fees", v: lc }, cashAmt > 0 && { l: "CASH", v: cashAmt, w: true, cash: true }, cFe > 0 && { l: "Handling ~" + cPc + "%", v: cFe, w: true, cash: true }, tCash > 0 && { l: t("cashTotalLabel"), v: tCash, b: true, w: true, cash: true }].filter(Boolean),
    };

    return { sorted, det, tProj, mul, d1, e, aR, tInt, preE, rOver, mm, bp, dp, sr, cashAmt, cFe, cPc, tCash, govT, gst, isUC, amort, fvL, invT, pa4, pa7, tRentVal, la, moS };
  }, [bp, ca, st, city, cI, sI, gender, txn, cst, poss, renting, curRent, propAge, furnish, intRate, la, rate, tenure, parking, stf, bkr, cashAmt, cashWhen, invRet, t]);

  const doTransform = () => { setPhase("results"); setTab("pyramid"); setTimeout(() => pyrRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); };

  const sections = [
    { id: "property", label: t("s_prop"), icon: "home", color: "#522de6", req: true },
    { id: "government", label: t("s_govt"), icon: "gavel", color: "#787587", auto: true },
    { id: "financing", label: t("s_fin"), icon: "account_balance", color: "#5e5b77", req: true },
    { id: "interiors", label: t("s_int"), icon: "design_services", color: "#ce2c66", req: true },
    { id: "recurring", label: t("s_rec"), icon: "autorenew", color: "#ac064e", auto: true },
    { id: "upfront", label: t("s_up"), icon: "visibility", color: "#6B4EFF", auto: true },
  ];

  return (
    <LangCtx.Provider value={{ lang }}>
      <div style={{ minHeight: "100vh", background: "#FAF9FD", color: "#1a1c1e", fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;500;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <style>{`
          @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
          @keyframes morphIn{from{opacity:0;transform:scaleY(.3)}to{opacity:1;transform:scaleY(1)}}
          @keyframes glowP{0%,100%{box-shadow:0 0 20px rgba(82,45,230,.15)}50%{box-shadow:0 0 40px rgba(82,45,230,.3)}}
          @keyframes cashP{0%,100%{opacity:.6}50%{opacity:1}}
          @keyframes spin{to{transform:rotate(360deg)}}
          .anim{animation:fadeUp .4s ease both}
          .morph{animation:morphIn .6s cubic-bezier(.16,1,.3,1) both}
          .glow{animation:glowP 2s ease infinite}
          .cashB{animation:cashP 1.5s ease infinite}
          .glass{background:rgba(250,249,253,.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
          .lift{box-shadow:0 20px 40px -12px rgba(98,95,123,.1)}
          .ghost{border:1px solid rgba(201,196,217,.25)}
          button{-webkit-tap-highlight-color:transparent}
          input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
          input[type=number]{-moz-appearance:textfield}
        `}</style>

        {/* HEADER */}
        <header className="glass" style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, borderBottom: "1px solid rgba(201,196,217,.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", maxWidth: 520, margin: "0 auto", gap: 8 }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "clamp(.82rem,3.5vw,.95rem)", fontWeight: 900, letterSpacing: "-.04em", fontFamily: "'Plus Jakarta Sans'", whiteSpace: "nowrap" }}>
                <span style={{ color: "#522de6" }}>un</span>-real-estate
              </div>
              <div style={{ fontSize: ".44rem", color: "#787587", whiteSpace: "nowrap", fontFamily: lang === "hi" ? "'Noto Sans Devanagari','Inter'" : "'Inter'" }}>{t("tag")}</div>
            </div>
            <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
              {[{ c: "en", l: "EN" }, { c: "hi", l: "हि" }].map((x) => (
                <button key={x.c} onClick={() => setLang(x.c)} style={{ padding: "4px 8px", borderRadius: 6, border: lang === x.c ? "1.5px solid #522de6" : "1px solid #e3e2e6", background: lang === x.c ? "#522de610" : "#fff", color: lang === x.c ? "#522de6" : "#787587", fontSize: ".62rem", fontWeight: 800, cursor: "pointer" }}>{x.l}</button>
              ))}
              {phase === "results" && (
                <button onClick={() => { setPhase("input"); setDetailIdx(null); }} style={{ padding: "4px 10px", borderRadius: 6, background: "#f4f3f7", fontSize: ".62rem", fontWeight: 700, color: "#787587", border: "none", cursor: "pointer" }}>{t("edit")}</button>
              )}
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 520, margin: "0 auto", padding: "60px 14px 80px", overflowX: "hidden", fontFamily: lang === "hi" ? "'Noto Sans Devanagari','Inter',sans-serif" : "'Inter',sans-serif" }}>

          {/* ═══ INPUT ═══ */}
          {phase === "input" && (
            <div>
              <section className="anim" style={{ marginBottom: 24, paddingTop: 10 }}>
                <p style={{ fontSize: ".54rem", fontWeight: 600, color: "#787587", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 3 }}>{t("heroSub")}</p>
                <h2 style={{ fontSize: "clamp(1.5rem,5vw,2rem)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans'", lineHeight: 1.08, letterSpacing: "-.05em" }}>
                  {t("heroH")}<br /><span style={{ color: "#522de6" }}>{t("heroH2")}</span>
                </h2>
                <p style={{ fontSize: ".78rem", color: "#787587", marginTop: 6, lineHeight: 1.5, maxWidth: 380 }}>{t("heroP")}</p>
              </section>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 20 }}>
                {sections.map((sec) => {
                  const isO = open === sec.id;
                  const isD = done.has(sec.id);
                  const isA = sec.auto && done.has("property");
                  return (
                    <div key={sec.id} className={isO ? "lift" : ""} style={{ borderRadius: 14, overflow: "hidden", border: isO ? `1.5px solid ${sec.color}30` : `1px solid ${isD || isA ? sec.color + "30" : "#e3e2e6"}`, background: "#fff" }}>
                      <button onClick={() => setOpen(isO ? null : sec.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: isD || isA ? `${sec.color}08` : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: isD || isA ? sec.color : `${sec.color}15`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: isD || isA ? "#fff" : sec.color, fontVariationSettings: isD || isA ? "'FILL' 1" : "'FILL' 0" }}>{sec.icon}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: ".76rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>{sec.label}</div>
                          {sec.auto && <div style={{ fontSize: ".56rem", color: "#787587" }}>{t("auto")}</div>}
                          {sec.req && !isD && <div style={{ fontSize: ".56rem", color: sec.color }}>{t("req")}</div>}
                        </div>
                        {(isD || isA) && <span className="material-symbols-outlined" style={{ fontSize: 16, color: sec.color, fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#787587", transform: isO ? "rotate(180deg)" : "", transition: "transform .2s" }}>expand_more</span>
                      </button>

                      {isO && (
                        <div style={{ padding: "0 14px 14px", animation: "fadeUp .2s ease" }}>

                          {sec.id === "property" && (
                            <div>
                              <PF l={t("state")}><PSel v={st} set={e => setSt(e.target.value)} o={Object.entries(SD).map(([k, v]) => ({ v: k, l: v.l }))} /></PF>
                              <PF l={t("city")}><PSel v={city} set={e => setCity(e.target.value)} o={Object.entries(sI.c).map(([k, v]) => ({ v: k, l: v.l }))} /></PF>
                              {cI && <Chip>{t("circle")}: Rs {cI.cr[0].toLocaleString("en-IN")} - {cI.cr[1].toLocaleString("en-IN")}/sqft</Chip>}
                              <PF l={t("agrVal")}><PNum v={bp} set={setBP} /></PF>
                              <PF l={t("carpet")}><PNum v={ca} set={setCA} /></PF>
                              <PF l={t("gender")}><PTog o={[{ v: "male", l: t("male") }, { v: "female", l: t("female") }, { v: "joint", l: t("joint") }]} v={gender} set={setG} /></PF>
                              <PF l={t("txn")}><PTog o={[{ v: "new", l: t("txnNew") }, { v: "resale", l: t("txnRe") }]} v={txn} set={setTxn} /></PF>
                              {txn === "new" && <PF l={t("cstat")}><PTog o={[{ v: "under", l: t("csU") }, { v: "ready", l: t("csR") }]} v={cst} set={setCst} /></PF>}
                              {txn === "new" && cst === "under" && (
                                <div>
                                  <PF l={t("poss")}><PNum v={poss} set={setPoss} /></PF>
                                  <PF l={t("rentNow")}><PTog o={[{ v: true, l: t("yes") }, { v: false, l: t("no") }]} v={renting} set={setRenting} /></PF>
                                  {renting && <PF l={t("moRent")}><PNum v={curRent} set={setCurRent} /></PF>}
                                </div>
                              )}
                              {txn === "resale" && (
                                <div>
                                  <PF l={t("propAge")}><PTog o={[{ v: "0-5", l: "0-5yr" }, { v: "5-10", l: "5-10yr" }, { v: "10-20", l: "10-20yr" }, { v: "20+", l: "20+" }]} v={propAge} set={setPropAge} /></PF>
                                  <PF l={t("brokPct")}><PNum v={bkr} set={setBk} /></PF>
                                  <PF l={t("socTx")}><PNum v={stf} set={setSTF} /></PF>
                                </div>
                              )}
                              <div style={{ marginTop: 10, padding: 12, borderRadius: 12, background: cashAmt > 0 ? "#ba1a1a08" : "#f4f3f7", border: cashAmt > 0 ? "1px solid #ba1a1a20" : "1px solid #e3e2e6" }}>
                                <PF l={t("cashAmt")} h={t("cashHelp")}><PNum v={cashAmt} set={setCashAmt} /></PF>
                                {cashAmt > 0 && (
                                  <div>
                                    <PF l={t("cashWhen")}><PTog o={[{ v: "booking", l: t("booking") }, { v: "registration", l: t("registration") }, { v: "possession", l: t("possession") }]} v={cashWhen} set={setCashWhen} /></PF>
                                    <div style={{ padding: "8px 10px", borderRadius: 8, background: "#ba1a1a0d", border: "1px solid #ba1a1a18", fontSize: ".66rem", color: "#474556", lineHeight: 1.5, marginTop: 4 }}>
                                      <strong style={{ color: "#ba1a1a" }}>{t("cashReal")}:</strong> ~{cashPc(cashAmt)}% = <strong>Rs {f$(cashFn(cashAmt))}</strong><br />
                                      {t("cashTotalLabel")}: <strong style={{ color: "#ba1a1a" }}>Rs {f$(cashAmt + cashFn(cashAmt))}</strong>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <DB color={sec.color} onClick={() => { mark("property"); mark("government"); mark("recurring"); mark("upfront"); }} />
                            </div>
                          )}

                          {sec.id === "financing" && (
                            <div>
                              <PF l={t("loanAmt")}><PNum v={la} set={setLA} /></PF>
                              <div style={{ fontSize: ".6rem", color: la > bp * .85 ? "#ba1a1a" : "#787587", marginBottom: 6, fontFamily: "monospace" }}>LTV: {bp > 0 ? Math.round(la / bp * 100) : 0}%</div>
                              <PF l={t("intRate")}><PNum v={rate} set={setRate} /></PF>
                              <PF l={t("tenure")}><PNum v={tenure} set={setTen} /></PF>
                              <PF l={t("compRent")} h={t("compRentH")}><PNum v={curRent} set={setCurRent} /></PF>
                              <PF l={t("invRet")} h={t("invRetH")}><PNum v={invRet} set={setInvRet} /></PF>
                              {R && <Chip accent>EMI: <strong>{fM(R.e)}</strong> | {t("interest")}: <strong style={{ color: "#ba1a1a" }}>{fF(R.tInt)}</strong></Chip>}
                              <DB color={sec.color} onClick={() => mark("financing")} />
                            </div>
                          )}

                          {sec.id === "interiors" && (
                            <div>
                              <PF l={txn === "resale" ? t("condition") : t("handover")}>
                                <PTog o={txn === "resale" ? [{ v: "ready", l: t("ready") }, { v: "cosmetic", l: t("cosmetic") }, { v: "reno", l: t("reno") }] : [{ v: "bare", l: t("bare") }, { v: "semi", l: t("semi") }, { v: "full", l: t("full") }]} v={furnish} set={setFurnish} />
                              </PF>
                              {furnish !== "full" && furnish !== "ready" && <PF l={t("quality")}><PSel v={intRate} set={e => setIntRate(Number(e.target.value))} o={INTR.map(i => ({ v: i.v, l: i.l }))} /></PF>}
                              {(furnish === "full" || furnish === "ready") && <Chip>{t("noInterior")}</Chip>}
                              <PF l={t("parking")}><PTog o={[{ v: "covered", l: t("covered") }, { v: "open", l: t("open") }, { v: "none", l: t("included") }]} v={parking} set={setPk} /></PF>
                              <DB color={sec.color} onClick={() => mark("interiors")} />
                            </div>
                          )}

                          {sec.auto && R && <DRows rows={R.det[sec.id]} />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {allDone && !open && (
                <div className="anim" style={{ textAlign: "center" }}>
                  <button onClick={doTransform} className="glow" style={{ padding: "14px 36px", borderRadius: 99, background: "linear-gradient(135deg,#522de6,#ce2c66)", color: "#fff", fontWeight: 900, fontSize: ".86rem", fontFamily: "'Plus Jakarta Sans'", border: "none", cursor: "pointer" }}>{t("transform")}</button>
                  <p style={{ fontSize: ".62rem", color: "#787587", marginTop: 6 }}>{t("transformSub")}</p>
                </div>
              )}
            </div>
          )}

          {/* ═══ RESULTS ═══ */}
          {phase === "results" && R && (
            <div ref={pyrRef}>
              <section className="anim" style={{ marginBottom: 14, paddingTop: 8 }}>
                <p style={{ fontSize: ".54rem", fontWeight: 600, color: "#787587", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 3 }}>{t("heroSub")}</p>
                <h2 style={{ fontSize: "clamp(1.4rem,5vw,1.9rem)", fontWeight: 900, fontFamily: "'Plus Jakarta Sans'", lineHeight: 1.08, letterSpacing: "-.05em" }}>
                  Rs {f$(R.tProj)} <span style={{ fontSize: ".42em", color: "#ce2c66", fontWeight: 700 }}>({R.mul.toFixed(2)}x)</span>
                </h2>
              </section>

              {/* TABS */}
              <div style={{ display: "flex", gap: 3, marginBottom: 12, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
                {[{ k: "pyramid", l: t("tBreak") }, { k: "timeline", l: t("tTime") }, { k: "rent", l: t("tRent") }, { k: "intel", l: t("tIntel") }].map((x) => (
                  <button key={x.k} onClick={() => { setTab(x.k); setDetailIdx(null); }} style={{ padding: "6px 12px", borderRadius: 8, border: tab === x.k ? "1.5px solid #522de6" : "1px solid #e3e2e6", background: tab === x.k ? "#522de610" : "#fff", color: tab === x.k ? "#522de6" : "#787587", fontSize: ".64rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{x.l}</button>
                ))}
              </div>

              {/* ── PYRAMID TAB ── */}
              {tab === "pyramid" && (
                <div className="anim">
                  {/* Pyramid — labels INSIDE */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, marginBottom: 16, padding: "0 2px" }}>
                    {R.sorted.map((seg, i) => {
                      const w = 100 - (i * 12);
                      const isO = detailIdx === i;
                      const hasCash = seg.id === "upfront" && R.tCash > 0;
                      return (
                        <div key={seg.id} className="morph" style={{ width: `${w}%`, maxWidth: "100%", animationDelay: `${i * .08}s` }}>
                          <button onClick={() => setDetailIdx(isO ? null : i)} style={{ width: "100%", padding: i === 0 ? "12px 10px" : "8px 8px", borderRadius: i === 0 ? "4px 4px 14px 14px" : i === R.sorted.length - 1 ? "10px 10px 4px 4px" : 4, background: seg.color, color: "#fff", border: isO ? "2px solid #fff" : "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, boxShadow: `0 4px 12px ${seg.color}25`, transition: "all .3s", transform: isO ? "scale(1.02)" : "scale(1)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0, overflow: "hidden" }}>
                              <span className="material-symbols-outlined" style={{ fontSize: i === 0 ? 16 : 13, fontVariationSettings: "'FILL' 1", flexShrink: 0 }}>{seg.icon}</span>
                              <span style={{ fontSize: i === 0 ? ".58rem" : ".5rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{seg.label}</span>
                              {hasCash && <span className="cashB" style={{ width: 5, height: 5, borderRadius: 99, background: "#ff4444", border: "1.5px solid #fff", flexShrink: 0 }} />}
                            </div>
                            <div style={{ textAlign: "right", flexShrink: 0, lineHeight: 1.1 }}>
                              <div style={{ fontSize: ".56rem", fontWeight: 800, fontFamily: "'JetBrains Mono'" }}>Rs {f$(seg.val)}</div>
                              <div style={{ fontSize: ".42rem", opacity: .75 }}>{seg.pct.toFixed(1)}%</div>
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quick stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                    <QS l={t("day1")} v={"Rs " + f$(R.d1)} />
                    <QS l={t("monthly")} v={fM(R.e + R.aR / 12)} />
                    {R.tCash > 0 && <div style={{ gridColumn: "1/-1" }}><QS l={t("cashBurden")} v={"Rs " + f$(R.tCash)} w /></div>}
                  </div>

                  {/* Cash banner */}
                  {R.tCash > 0 && (
                    <div style={{ padding: "10px 12px", borderRadius: 12, background: "#ba1a1a0a", border: "1px solid #ba1a1a20", marginBottom: 12, display: "flex", gap: 8 }}>
                      <span className="material-symbols-outlined cashB" style={{ fontSize: 16, color: "#ba1a1a", flexShrink: 0, marginTop: 1 }}>warning</span>
                      <div style={{ fontSize: ".66rem", color: "#474556", lineHeight: 1.5 }}>
                        <strong style={{ color: "#ba1a1a" }}>Rs {f$(R.cashAmt)} cash ({cashWhen})</strong> + Rs {f$(R.cFe)} handling = <strong style={{ color: "#ba1a1a" }}>Rs {f$(R.tCash)}</strong>
                      </div>
                    </div>
                  )}

                  {/* Detail panel */}
                  {detailIdx !== null && R.sorted[detailIdx] && (
                    <div className="anim lift ghost" style={{ borderRadius: 14, background: "#fff", padding: 14, marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <h3 style={{ fontSize: ".78rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", color: R.sorted[detailIdx].color }}>{R.sorted[detailIdx].label}</h3>
                        <button onClick={() => setDetailIdx(null)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#787587" }}>close</span>
                        </button>
                      </div>
                      <DRows rows={R.det[R.sorted[detailIdx].id]} />
                    </div>
                  )}

                  {/* Insights */}
                  <Lbl>{t("insights")}</Lbl>
                  <IC t={t("insMulti", { mul: R.mul.toFixed(1) })} x={t("insMultiD", { bp: f$(R.bp), tp: f$(R.tProj), ten: tenure })} c="#522de6" />
                  {R.tCash > 0 && <IC t={t("insCash", { tc: f$(R.tCash), ca: f$(R.cashAmt) })} x={t("insCashD", { cp: R.cPc, cf: f$(R.cFe) })} c="#ba1a1a" />}
                  {R.preE > 0 && <IC t={t("insPreE", { pe: f$(R.preE + R.rOver) })} x={t("insPreED", { preE: f$(R.preE), rent: R.rOver > 0 ? "Rent: Rs " + f$(R.rOver) + ". " : "" })} c="#ac064e" />}
                  {gender === "male" && sI.st.female < sI.st.male && <IC t={t("insGender", { save: f$(bp * (sI.st.male - sI.st.female)) })} x={t("insGenderD", { f: (sI.st.female * 100).toFixed(1), m: (sI.st.male * 100).toFixed(1) })} c="#0d9488" />}
                </div>
              )}

              {/* ── TIMELINE TAB ── */}
              {tab === "timeline" && (
                <div className="anim">
                  <Lbl>{t("tlWho")}</Lbl>
                  <div className="ghost lift" style={{ borderRadius: 14, background: "#fff", padding: 14, marginBottom: 12 }}>
                    <TI w={t("booking")} items={[{ l: "Booking ~10%", v: fF(Math.min(bp * .1, 5e5)), y: true }]} c="#522de6" />
                    <TI w={t("registration")} items={[{ l: "Down payment", v: fF(R.dp), y: true }, { l: "Stamp+Regn+Legal", v: fF(R.govT), y: true }, R.tCash > 0 && { l: "Cash+" + t("cashFeeLabel"), v: fF(R.tCash), y: true, cash: true }].filter(Boolean)} c="#ce2c66" />
                    {R.isUC && <TI w={poss + "mo construction"} items={[{ l: "Pre-EMI", v: fF(R.preE), y: true }, R.rOver > 0 && { l: t("moRent"), v: fF(R.rOver), y: true }, { l: t("bank") + " disburses", v: "Rs " + f$(la), y: false }].filter(Boolean)} c="#ac064e" />}
                    <TI w={t("possession")} items={[{ l: "Society+Corpus+Utils", v: fF(R.det.upfront[1].v + R.det.upfront[2].v + 25e3), y: true }]} c="#5e5b77" />
                    <TI w={"EMI (" + tenure + "yr)"} items={[{ l: t("you") + " total EMIs", v: fF(R.e * tenure * 12), y: true }, { l: t("bank") + " keeps interest", v: fF(R.tInt), y: false }]} c="#522de6" last />
                  </div>

                  <Lbl>{t("tlAmort")}</Lbl>
                  <div className="ghost lift" style={{ borderRadius: 14, background: "#fff", padding: 14 }}>
                    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                      <div style={{ display: "flex", gap: 2, alignItems: "end", height: 100, minWidth: Math.max(240, R.amort.length * 12) }}>
                        {R.amort.map((yr, i) => {
                          const tot = yr.i + yr.p; const ip = tot > 0 ? (yr.i / tot) * 100 : 50;
                          return (
                            <div key={i} style={{ flex: 1, minWidth: 6, display: "flex", flexDirection: "column", height: "100%" }}>
                              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                                <div style={{ width: "100%", borderRadius: "2px 2px 0 0", background: "#ce2c66", height: `${ip}%`, minHeight: 1 }} />
                                <div style={{ width: "100%", borderRadius: "0 0 2px 2px", background: "#522de6", height: `${100 - ip}%`, minHeight: 1 }} />
                              </div>
                              {(yr.yr === 1 || yr.yr % 5 === 0 || yr.yr === tenure) && <div style={{ fontSize: ".4rem", color: "#787587", marginTop: 1, textAlign: "center", fontFamily: "monospace" }}>Y{yr.yr}</div>}
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <Lg c="#ce2c66" l={t("interest")} /><Lg c="#522de6" l={t("principal")} />
                      </div>
                    </div>
                    <div style={{ marginTop: 8, padding: "8px 10px", borderRadius: 8, background: "#f4f3f7", fontSize: ".64rem", color: "#474556", lineHeight: 1.5 }}>
                      {t("tlY1", { pct: R.amort[0] ? Math.round(R.amort[0].i / (R.e * 12) * 100) : "?", flip: (R.amort.findIndex(a => a.p > a.i) + 1) || "?" })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── BUY VS RENT TAB ── */}
              {tab === "rent" && (
                <div className="anim">
                  <Lbl>{t("brTitle", { ten: tenure })}</Lbl>
                  <div className="ghost lift" style={{ borderRadius: 14, background: "#fff", padding: 14, marginBottom: 12 }}>
                    <div style={{ fontSize: ".66rem", color: "#787587", marginBottom: 12, lineHeight: 1.5 }}>{t("brIf", { rent: fM(curRent), inv: invRet })}</div>
                    {[{ l: t("brInvest"), v: R.invT, c: "#22c55e" }, { l: t("brP4"), v: R.pa4, c: "#522de6" }, { l: t("brP7"), v: R.pa7, c: "#6B4EFF" }, { l: t("brTotalRent"), v: R.tRentVal, c: "#ce2c66" }].map((b, i) => {
                      const mx = Math.max(R.invT, R.pa7, R.tRentVal);
                      const p = mx > 0 ? (b.v / mx) * 100 : 0;
                      return (
                        <div key={i} style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                            <span style={{ fontSize: ".64rem", fontWeight: 600, color: "#474556" }}>{b.l}</span>
                            <span style={{ fontSize: ".66rem", fontWeight: 800, fontFamily: "'JetBrains Mono'", color: b.c }}>Rs {f$(b.v)}</span>
                          </div>
                          <div style={{ height: 6, borderRadius: 3, background: "#f4f3f7", overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 3, background: b.c, width: `${p}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <IC t={R.invT > R.pa7 ? t("brVerdict1") : R.invT > R.pa4 ? t("brVerdict2") : t("brVerdict3")} x={R.invT > R.pa7 ? `Invest: Rs ${f$(R.invT)} vs property: Rs ${f$(R.pa7)}.` : R.invT > R.pa4 ? `Invest: Rs ${f$(R.invT)}. Property 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}.` : `Property 4%: Rs ${f$(R.pa4)} vs invest: Rs ${f$(R.invT)}.`} c="#522de6" />
                  <IC t={t("brOpp")} x={`Rs ${f$(R.d1)} at ${invRet}% for ${tenure}yr = Rs ${f$(R.fvL)}.`} c="#5e5b77" />
                </div>
              )}

              {/* ── INTELLIGENCE TAB ── */}
              {tab === "intel" && (
                <div className="anim">
                  <Lbl>{t("intelTitle")} — {cI?.l}</Lbl>

                  {/* FREE AI */}
                  <div className="ghost lift" style={{ borderRadius: 14, background: "#fff", padding: 14, marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: ".72rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{t("intelFree")}</div>
                        <div style={{ fontSize: ".54rem", color: "#787587" }}>{t("intelFreeD")}</div>
                      </div>
                      {!aiData && !aiLoading && <button onClick={fetchAI} style={{ padding: "6px 14px", borderRadius: 99, background: "#522de6", color: "#fff", fontSize: ".64rem", fontWeight: 800, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>{t("intelBtn")}</button>}
                    </div>

                    {aiLoading && <div style={{ textAlign: "center", padding: "16px 0" }}><div style={{ width: 20, height: 20, border: "2.5px solid #e3e2e6", borderTopColor: "#522de6", borderRadius: 99, margin: "0 auto 6px", animation: "spin .8s linear infinite" }} /><div style={{ fontSize: ".62rem", color: "#787587" }}>{t("intelLoading")}</div></div>}
                    {aiErr && <div style={{ padding: "8px 12px", borderRadius: 8, background: "#ba1a1a08", fontSize: ".66rem", color: "#ba1a1a" }}>{t("intelErr")} ({aiErr})</div>}

                    {aiData && aiData.data && (
                      <div style={{ display: "grid", gap: 6 }}>
                        {aiData.data.market_direction && (
                          <div style={{ padding: "10px 12px", borderRadius: 10, background: aiData.data.market_direction.signal === "buyers_market" ? "#22c55e0a" : "#f59e0b0a", border: "1px solid #e3e2e6" }}>
                            <div style={{ fontSize: ".5rem", fontWeight: 800, color: "#787587", letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 2 }}>{t("intelMkt")}</div>
                            <div style={{ fontSize: ".78rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", textTransform: "capitalize" }}>{(aiData.data.market_direction.signal || "").replace(/_/g, " ")}</div>
                            {aiData.data.market_direction.reason && <div style={{ fontSize: ".64rem", color: "#474556", lineHeight: 1.4, marginTop: 2 }}>{aiData.data.market_direction.reason}</div>}
                          </div>
                        )}
                        {aiData.data.price_trend && (
                          <div style={{ padding: "10px 12px", borderRadius: 10, background: "#f4f3f7", border: "1px solid #e3e2e6" }}>
                            <div style={{ fontSize: ".5rem", fontWeight: 800, color: "#787587", letterSpacing: ".06em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 2 }}>{t("intelTrend")}</div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                              <span style={{ fontSize: ".78rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", textTransform: "capitalize" }}>{aiData.data.price_trend.direction || "N/A"}</span>
                              {aiData.data.price_trend.yoy_pct != null && <span style={{ fontSize: ".64rem", fontFamily: "'JetBrains Mono'", color: aiData.data.price_trend.direction === "rising" ? "#22c55e" : "#ce2c66" }}>{aiData.data.price_trend.yoy_pct > 0 ? "+" : ""}{aiData.data.price_trend.yoy_pct}% YoY</span>}
                            </div>
                            {aiData.data.price_trend.detail && <div style={{ fontSize: ".64rem", color: "#474556", lineHeight: 1.4, marginTop: 2 }}>{aiData.data.price_trend.detail}</div>}
                          </div>
                        )}
                        {aiData.data.buyer_tip && <div style={{ padding: "8px 10px", borderRadius: 8, background: "#522de608", border: "1px solid #522de615", fontSize: ".64rem", color: "#474556", lineHeight: 1.4 }}><strong style={{ color: "#522de6" }}>{t("intelTip")}:</strong> {aiData.data.buyer_tip}</div>}
                        {aiData.sources && aiData.sources.length > 0 && <div style={{ fontSize: ".52rem", color: "#787587" }}>{t("intelSrc")}: {aiData.sources.slice(0, 3).map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener" style={{ color: "#522de6", marginRight: 4 }}>{s.title || "Link"}</a>)}</div>}
                      </div>
                    )}

                    {!aiData && !aiLoading && !aiErr && <div style={{ textAlign: "center", padding: "12px 0", fontSize: ".66rem", color: "#787587" }}>{t("intelBtn")} →</div>}
                  </div>

                  {/* LOCKED PREMIUM */}
                  <Lbl>{t("premTitle")}</Lbl>
                  {[
                    { i: "balance", t: "Fair Price Assessment" },
                    { i: "apartment", t: "Supply Pipeline" },
                    { i: "train", t: "Infrastructure Impact" },
                    { i: "handshake", t: "Negotiation Playbook" },
                    { i: "verified", t: "Builder Track Record" },
                    { i: "target", t: "What to Actually Target" },
                  ].map((card, idx) => (
                    <div key={idx} className="ghost" style={{ padding: "10px 12px", borderRadius: 12, background: "#fff", marginBottom: 5, display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: "#522de610", display: "grid", placeItems: "center", flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#522de6" }}>{card.i}</span>
                      </div>
                      <span style={{ fontSize: ".68rem", fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", flex: 1 }}>{card.t}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: 12, color: "#ce2c66" }}>lock</span>
                    </div>
                  ))}

                  {/* WAITLIST FORM */}
                  <div style={{ padding: "18px 16px", borderRadius: 16, background: "linear-gradient(135deg,#522de610,#ce2c6608)", marginTop: 10 }}>
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <h3 style={{ fontSize: ".9rem", fontWeight: 900, fontFamily: "'Plus Jakarta Sans'", marginBottom: 3 }}>{t("premH")}<br /><span style={{ color: "#522de6" }}>{t("premH2")}</span></h3>
                      <p style={{ fontSize: ".64rem", color: "#787587", lineHeight: 1.4 }}>{t("premD")}</p>
                    </div>
                    {wlSent ? (
                      <div style={{ textAlign: "center", padding: "12px", borderRadius: 10, background: "#22c55e10", border: "1px solid #22c55e25" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#22c55e", display: "block", marginBottom: 3 }}>check_circle</span>
                        <div style={{ fontSize: ".74rem", fontWeight: 800, color: "#22c55e" }}>{t("premDone")}</div>
                        <div style={{ fontSize: ".58rem", color: "#787587", marginTop: 2 }}>{t("premDoneD")}</div>
                      </div>
                    ) : (
                      <form name="waitlist" method="POST" data-netlify="true" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.target); fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(fd).toString() }).then(() => setWlSent(true)).catch(() => setWlSent(true)); }}>
                        <input type="hidden" name="form-name" value="waitlist" />
                        <input type="hidden" name="city" value={cI?.l || ""} />
                        <input type="hidden" name="state" value={sI?.l || ""} />
                        <input type="hidden" name="price" value={bp} />
                        <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
                          <input type="email" name="email" value={wlEmail} onChange={e => setWlEmail(e.target.value)} placeholder="your@email.com" required style={{ flex: 2, height: 38, padding: "0 10px", borderRadius: 10, border: "1px solid #e3e2e6", background: "#fff", fontSize: ".76rem", outline: "none" }} />
                          <input type="text" name="pincode" value={wlPin} onChange={e => setWlPin(e.target.value)} placeholder="Pincode" maxLength={6} style={{ flex: 1, height: 38, padding: "0 10px", borderRadius: 10, border: "1px solid #e3e2e6", background: "#fff", fontSize: ".76rem", outline: "none", fontFamily: "'JetBrains Mono'" }} />
                        </div>
                        <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: 99, background: "linear-gradient(135deg,#522de6,#ce2c66)", color: "#fff", fontWeight: 800, fontSize: ".74rem", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans'" }}>{t("premBtn")}</button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        <div style={{ textAlign: "center", padding: "14px 16px 20px", fontSize: ".5rem", color: "#787587", fontFamily: "monospace" }}>
          {t("foot")}<br /><strong style={{ color: "#474556" }}>un-real-estate</strong>
        </div>
      </div>
    </LangCtx.Provider>
  );
}

/* ═══════ COMPONENTS ═══════ */
function DRows({ rows }) {
  if (!rows) return null;
  return (
    <div>
      {rows.map((d, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #f4f3f7", alignItems: "baseline", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, minWidth: 0, flex: 1 }}>
            {d.cash && <span style={{ width: 4, height: 4, borderRadius: 99, background: "#ba1a1a", flexShrink: 0 }} />}
            <span style={{ fontSize: ".66rem", color: d.b ? "#1a1c1e" : d.w ? "#ba1a1a" : "#474556", fontWeight: d.b ? 800 : 500 }}>{d.l}</span>
          </div>
          <span style={{ fontSize: ".66rem", fontFamily: "'JetBrains Mono'", fontWeight: d.b ? 800 : 600, color: d.w ? "#ba1a1a" : "#1a1c1e", whiteSpace: "nowrap", flexShrink: 0 }}>
            {typeof d.v === "number" ? fF(d.v) : d.v}
          </span>
        </div>
      ))}
    </div>
  );
}

function PF({ l, h, children }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <label style={{ display: "block", fontSize: ".64rem", fontWeight: 700, color: "#474556", marginBottom: 3 }}>
        {l}{h && <span style={{ fontWeight: 500, color: "#787587" }}> — {h}</span>}
      </label>
      {children}
    </div>
  );
}

function PSel({ v, set, o }) {
  return (
    <select value={v} onChange={set} style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 10, border: "1px solid #e3e2e6", background: "#faf9fd", fontSize: ".78rem", outline: "none" }}>
      {o.map(x => <option key={String(x.v)} value={x.v}>{x.l}</option>)}
    </select>
  );
}

function PNum({ v, set }) {
  return (
    <input type="number" value={v} onChange={e => set(Number(e.target.value))} style={{ width: "100%", height: 38, padding: "0 10px", borderRadius: 10, border: "1px solid #e3e2e6", background: "#faf9fd", fontSize: ".8rem", outline: "none", fontFamily: "'JetBrains Mono'", fontWeight: 600 }} />
  );
}

function PTog({ o, v, set }) {
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {o.map(x => (
        <button key={String(x.v)} onClick={() => set(x.v)} style={{ flex: 1, minWidth: 50, padding: "6px 4px", borderRadius: 8, border: v === x.v ? "1.5px solid #522de6" : "1px solid #e3e2e6", background: v === x.v ? "#522de610" : "#faf9fd", color: v === x.v ? "#522de6" : "#787587", fontSize: ".66rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>{x.l}</button>
      ))}
    </div>
  );
}

function DB({ color, onClick }) {
  return (
    <button onClick={onClick} style={{ width: "100%", padding: "10px", borderRadius: 10, background: color, color: "#fff", fontWeight: 800, fontSize: ".74rem", border: "none", cursor: "pointer", marginTop: 8, fontFamily: "'Plus Jakarta Sans'" }}>Done</button>
  );
}

function Chip({ children, accent }) {
  return (
    <div style={{ padding: "6px 10px", borderRadius: 8, background: accent ? "#522de608" : "#f4f3f7", border: accent ? "1px solid #522de615" : "1px solid #e3e2e6", fontSize: ".64rem", color: "#474556", fontFamily: "'JetBrains Mono'", marginBottom: 8, lineHeight: 1.5 }}>{children}</div>
  );
}

function QS({ l, v, w }) {
  return (
    <div className="ghost" style={{ padding: "8px 10px", borderRadius: 10, background: w ? "#ba1a1a06" : "#fff" }}>
      <div style={{ fontSize: ".48rem", fontWeight: 700, color: w ? "#ba1a1a" : "#787587", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 1 }}>{l}</div>
      <div style={{ fontSize: ".74rem", fontWeight: 800, fontFamily: "'JetBrains Mono'", color: w ? "#ba1a1a" : "#1a1c1e" }}>{v}</div>
    </div>
  );
}

function IC({ t, x, c }) {
  return (
    <div className="ghost" style={{ padding: 12, borderRadius: 12, background: "#fff", marginBottom: 6, boxShadow: "0 4px 14px -4px rgba(98,95,123,.06)" }}>
      <h4 style={{ fontSize: ".72rem", fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 2, color: c }}>{t}</h4>
      <p style={{ fontSize: ".66rem", color: "#474556", lineHeight: 1.6 }}>{x}</p>
    </div>
  );
}

function Lbl({ children }) {
  return (
    <p style={{ fontSize: ".5rem", fontWeight: 700, color: "#787587", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{children}</p>
  );
}

function Lg({ c, l }) {
  return (
    <span style={{ fontSize: ".56rem", color: "#474556", display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{ width: 6, height: 3, borderRadius: 1, background: c }} />{l}
    </span>
  );
}

function TI({ w, items, c, last }) {
  return (
    <div style={{ display: "flex", gap: 10, paddingBottom: last ? 0 : 12, position: "relative" }}>
      {!last && <div style={{ position: "absolute", left: 5, top: 16, bottom: 0, width: 1.5, background: "#e3e2e6" }} />}
      <div style={{ width: 12, height: 12, borderRadius: 99, background: c, flexShrink: 0, marginTop: 2 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: ".66rem", fontWeight: 800, color: c, marginBottom: 2, fontFamily: "'Plus Jakarta Sans'" }}>{w}</div>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "2px 0", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {it.cash && <span style={{ width: 4, height: 4, borderRadius: 99, background: "#ba1a1a" }} />}
              <span style={{ fontSize: ".64rem", color: it.y ? "#1a1c1e" : "#787587", fontWeight: it.y ? 600 : 400, fontStyle: it.y ? "normal" : "italic" }}>{it.l}</span>
              <span style={{ fontSize: ".44rem", padding: "1px 4px", borderRadius: 99, background: it.y ? "#f4f3f7" : "#522de610", color: it.y ? "#787587" : "#522de6", fontWeight: 700 }}>{it.y ? "YOU" : "BANK"}</span>
            </div>
            {it.v && <span style={{ fontSize: ".64rem", fontFamily: "'JetBrains Mono'", fontWeight: 600, color: it.cash ? "#ba1a1a" : it.y ? "#1a1c1e" : "#787587", whiteSpace: "nowrap" }}>{it.v}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
