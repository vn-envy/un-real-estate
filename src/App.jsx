import{useState,useMemo,useCallback,useRef,useEffect}from"react";
const SD={telangana:{l:"Telangana",c:{hy_u:{l:"Hyderabad (GHMC)",m:4.5,pt:.0015,cr:[4500,12e3]},hy_s:{l:"Hyderabad (Suburbs)",m:3.5,pt:.0012,cr:[3e3,7e3]},war:{l:"Warangal",m:2.5,pt:.001,cr:[2e3,4500]}},st:{male:.06,female:.06,joint:.06},rg:.005,rc:null,ms:.005},maharashtra:{l:"Maharashtra",c:{mum:{l:"Mumbai / MMR",m:6,pt:.002,cr:[8e3,5e4]},pun:{l:"Pune / PCMC",m:4.5,pt:.0015,cr:[4e3,12e3]},tha:{l:"Thane / Navi Mumbai",m:5,pt:.0018,cr:[5e3,15e3]},nag:{l:"Nagpur / Nashik",m:3,pt:.0012,cr:[2500,6e3]}},st:{male:.06,female:.05,joint:.06},rg:.01,rc:3e4,lb:.01},karnataka:{l:"Karnataka",c:{blr:{l:"Bengaluru (BBMP)",m:5,pt:.0018,cr:[4500,14e3]},bda:{l:"Bengaluru (Outskirts)",m:3.5,pt:.0014,cr:[3e3,8e3]},mys:{l:"Mysuru / Hubli",m:2.5,pt:.001,cr:[2e3,5e3]}},st:{male:.056,female:.042,joint:.05},rg:.01,rc:null,cs:.1},delhi:{l:"Delhi NCR",c:{dls:{l:"South Delhi",m:6,pt:.002,cr:[1e4,8e4]},dlo:{l:"East/West/North",m:4,pt:.0018,cr:[5e3,2e4]},noi:{l:"Noida / Gr. Noida",m:4,pt:.0015,cr:[3500,9e3]},gur:{l:"Gurgaon",m:5,pt:.0015,cr:[4500,14e3]}},st:{male:.06,female:.04,joint:.05},rg:.01,rc:null},tamilnadu:{l:"Tamil Nadu",c:{che:{l:"Chennai",m:4.5,pt:.0015,cr:[4e3,15e3]},cbe:{l:"Coimbatore",m:3,pt:.001,cr:[2500,6e3]}},st:{male:.07,female:.07,joint:.07},rg:.04,rc:null}};
const INTR=[{v:0,l:"Not needed",d:"Move-in ready"},{v:400,l:"Minimal Rs 400/sqft",d:"Paint, fans"},{v:1400,l:"Standard Rs 1400/sqft",d:"Semi-modular"},{v:2400,l:"Premium Rs 2400/sqft",d:"Full modular"},{v:3800,l:"Luxury Rs 3800/sqft",d:"Italian marble"}];
const f$=n=>{if(!n||isNaN(n))return"0";if(n>=1e7)return`${(n/1e7).toFixed(2)} Cr`;if(n>=1e5)return`${(n/1e5).toFixed(1)} L`;return Math.round(n).toLocaleString("en-IN")};
const fF=n=>`Rs ${Math.round(n||0).toLocaleString("en-IN")}`;const fM=n=>`Rs ${Math.round(n||0).toLocaleString("en-IN")}/mo`;
function calcEMI(p,r,y){if(!p||p<=0)return 0;const ri=r/100/12,n=y*12;if(ri===0)return p/n;return(p*ri*Math.pow(1+ri,n))/(Math.pow(1+ri,n)-1)}
function cashF(a){if(a<=0)return 0;if(a<=1e6)return a*.02;if(a<=2e6)return a*.03;if(a<=5e6)return a*.04;return a*.05}
function cashP(a){if(a<=0)return 0;if(a<=1e6)return 2;if(a<=2e6)return 3;if(a<=5e6)return 4;return 5}

export default function App(){
  const[st,setSt]=useState("telangana");const[city,setCity]=useState("hy_u");const[bp,setBP]=useState(8e6);const[ca,setCA]=useState(1200);
  const[gender,setG]=useState("male");const[txn,setTxn]=useState("new");const[cst,setCst]=useState("under");
  const[possession,setPoss]=useState(30);const[renting,setRenting]=useState(true);const[curRent,setCurRent]=useState(25e3);
  const[propAge,setPropAge]=useState("0-5");const[furnish,setFurnish]=useState("bare");const[intRate,setIntRate]=useState(2400);
  const[la,setLA]=useState(6e6);const[rate,setRate]=useState(8.5);const[tenure,setTen]=useState(20);
  const[parking,setPk]=useState("covered");const[socTransfer,setSTF]=useState(5e4);const[broker,setBk]=useState(1);
  const[cashAmt,setCashAmt]=useState(0);const[cashWhen,setCashWhen]=useState("booking");const[invRet,setInvRet]=useState(12);
  const[open,setOpen]=useState(null);const[done,setDone]=useState(new Set());
  const[phase,setPhase]=useState("input");const[tab,setTab]=useState("pyramid");const[detailIdx,setDetailIdx]=useState(null);
  const[aiData,setAiData]=useState(null);const[aiLoading,setAiLoading]=useState(false);const[aiErr,setAiErr]=useState(null);
  const[wlEmail,setWlEmail]=useState("");const[wlPin,setWlPin]=useState("");const[wlSent,setWlSent]=useState(false);
  const pyrRef=useRef(null);
  useEffect(()=>{const cs=Object.keys(SD[st].c);if(!cs.includes(city))setCity(cs[0])},[st]);
  const sI=SD[st],cI=sI?.c[city];
  const mark=useCallback(id=>{setDone(p=>{const n=new Set(p);n.add(id);return n});setOpen(null)},[]);
  const allDone=done.has("property")&&done.has("financing")&&done.has("interiors");

  // AI intel fetch with 12hr cache
  const fetchAI=useCallback(async()=>{
    const key=`ure_ai_${st}_${city}`;
    try{const c=JSON.parse(localStorage.getItem(key));if(c&&Date.now()-c.ts<432e5){setAiData(c.d);return;}}catch{}
    setAiLoading(true);setAiErr(null);
    try{
      const res=await fetch("/api/intel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:sI.l,city:cI?.l,basePrice:bp,carpet:ca})});
      if(!res.ok)throw new Error(`${res.status}`);
      const j=await res.json();if(j.error)throw new Error(j.error);
      setAiData(j);try{localStorage.setItem(key,JSON.stringify({d:j,ts:Date.now()}))}catch{}
    }catch(e){setAiErr(e.message)}finally{setAiLoading(false)}
  },[st,city,sI,cI,bp,ca]);

  const R=useMemo(()=>{
    if(!cI)return null;const isUC=txn==="new"&&cst==="under";const isResale=txn==="resale";const ec=isResale?"ready":cst;
    let sr=gender==="joint"?(sI.st.joint||sI.st.male):(sI.st[gender]||sI.st.male);
    if(st==="telangana"&&(city==="hy_u"||city==="hy_s"))sr+=sI.ms||0;if(st==="maharashtra"&&city==="mum")sr+=sI.lb||0;
    const sd=bp*sr;let rg=bp*sI.rg;if(sI.rc)rg=Math.min(rg,sI.rc);let sur=0;if(st==="karnataka"&&sI.cs)sur=sd*sI.cs;
    let gst=0;if(ec==="under")gst=bp*((bp<=45e5&&ca<=645)?.01:.05);const tds=bp>=5e6?bp*.01:0;
    const leg=Math.max(15e3,Math.min(bp*.003,5e4));const doc=5e3;const govT=sd+rg+sur+gst+leg+doc;
    const brk=isResale?bp*(broker/100):0;const stf=isResale?socTransfer:0;
    const lp=la*.005,cer=500,ld=la>2e6?8e3:3e3,lc=lp+cer+ld;
    const eI=(furnish==="full"||furnish==="ready")?0:intRate;const interior=ca*eI;
    const mov=15e3,ud=25e3,club=25e3;const moveIn=interior+mov+ud+club;
    const mm=ca*(cI.m||3),md=mm*24;const corp=Math.max(5e4,bp*.005);
    let pkC=0;if(parking==="covered")pkC=st==="maharashtra"?5e5:3e5;if(parking==="open")pkC=st==="maharashtra"?25e4:15e4;
    const apt=bp*(cI.pt||.001),aIns=Math.max(3e3,bp*5e-4),aM=mm*12;const aR=apt+aIns+aM;
    const e=calcEMI(la,rate,tenure),tRep=e*tenure*12,tInt=tRep-la;
    let preE=0,rOver=0;if(isUC){preE=(la*.5)*(rate/100/12)*possession;if(renting)rOver=curRent*possession}
    let reno=0;if(isResale&&furnish==="reno"){const rr={"0-5":200,"5-10":500,"10-20":900,"20+":1300};reno=ca*(rr[propAge]||400)}
    const cFe=cashF(cashAmt);const cPc=cashP(cashAmt);const tCash=cashAmt+cFe;const dp=bp-la;
    const upV=dp+md+corp+pkC+brk+stf+lc+tCash;
    const tProj=bp+govT+tInt+moveIn+lc+preE+rOver+reno+(aR*tenure)+md+corp+pkC+brk+stf+tCash;const mul=tProj/bp;
    const d1=dp+govT+moveIn+md+corp+pkC+brk+stf+lc+preE+reno+tCash;
    const amort=[];let bal=la;for(let yr=1;yr<=Math.min(tenure,30);yr++){let yi=0,yp=0;for(let m=0;m<12;m++){const mi=bal*(rate/100/12);const mp=e-mi;yi+=mi;yp+=Math.max(0,mp);bal=Math.max(0,bal-mp)}amort.push({yr,i:Math.round(yi),p:Math.round(yp)})}
    const fvL=d1*Math.pow(1+invRet/100,tenure);const moS=e+aR/12-curRent;
    let fvM=0;if(moS>0){const ri=invRet/100/12,n=tenure*12;fvM=moS*((Math.pow(1+ri,n)-1)/ri)}
    const pa4=bp*Math.pow(1.04,tenure),pa7=bp*Math.pow(1.07,tenure),tRent=curRent*12*tenure*1.5;const invT=fvL+Math.max(0,fvM);
    const raw=[{id:"property",label:"Property Price",val:bp,icon:"home",when:"At registration"},{id:"government",label:"Govt Charges",val:govT,icon:"gavel",when:"At registration"},{id:"financing",label:"Financing Cost",val:tInt+lc+preE,icon:"account_balance",when:isUC?"Construction+EMI":"EMI tenure"},{id:"interiors",label:"Interiors & Setup",val:moveIn+reno,icon:"design_services",when:"Before move-in"},{id:"recurring",label:`Recurring (${tenure}yr)`,val:aR*tenure,icon:"autorenew",when:"Monthly/Annual"},{id:"upfront",label:tCash>0?"Upfront + Cash":"Upfront & Hidden",val:upV,icon:"visibility",when:"Before keys"}];
    const sorted=[...raw].sort((a,b)=>b.val-a.val);const pal=["#522de6","#6B4EFF","#ce2c66","#ac064e","#5e5b77","#787587"];
    sorted.forEach((s,i)=>{s.color=pal[i];s.pct=tProj>0?(s.val/tProj*100):0});
    const det={property:[{l:"Agreement Value",v:bp},{l:"Carpet",v:`${ca} sqft`},{l:"Per sqft",v:`Rs ${Math.round(bp/(ca||1)).toLocaleString("en-IN")}`},{l:"Location",v:`${cI.l}, ${sI.l}`}],government:[{l:`Stamp (${(sr*100).toFixed(1)}%)`,v:sd},{l:"Regn",v:rg},sur>0&&{l:"Cess",v:sur},gst>0&&{l:"GST",v:gst},tds>0&&{l:"TDS",v:tds},{l:"Legal+Docs",v:leg+doc}].filter(Boolean),financing:[{l:"Monthly EMI",v:fM(e)},{l:"Total Interest",v:tInt,w:true},{l:"Loan Fees",v:lc},preE>0&&{l:`Pre-EMI (${possession}mo)`,v:preE,w:true},rOver>0&&{l:"Rent During Const.",v:rOver,w:true},{l:"Total Repayment",v:tRep}].filter(Boolean),interiors:[interior>0&&{l:`Interior (Rs ${eI}/sqft)`,v:interior},reno>0&&{l:"Renovation",v:reno},{l:"Moving+Utils+Club",v:mov+ud+club}].filter(Boolean),recurring:[{l:"Monthly Maint",v:fM(mm)},{l:"Annual Tax",v:apt},{l:"Annual Insurance",v:aIns},{l:`${tenure}yr total`,v:aR*tenure,b:true}],upfront:[{l:"Down Payment",v:dp},{l:"Maint Deposit",v:md},{l:"Corpus",v:corp},pkC>0&&{l:"Parking",v:pkC},brk>0&&{l:"Brokerage",v:brk},stf>0&&{l:"Society Transfer",v:stf},{l:"Loan Fees",v:lc},cashAmt>0&&{l:"CASH",v:cashAmt,w:true,cash:true},cFe>0&&{l:`Handling (~${cPc}%)`,v:cFe,w:true,cash:true},tCash>0&&{l:"Total Cash Burden",v:tCash,b:true,w:true,cash:true}].filter(Boolean)};
    return{sorted,det,tProj,mul,d1,e,aR,tInt,preE,rOver,mm,bp,dp,sr,cashAmt,cFe,cPc,tCash,govT,gst,isUC,amort,fvL,fvM,moS,pa4,pa7,tRent,invT,la:la,tenure}
  },[bp,ca,st,city,cI,sI,gender,txn,cst,possession,renting,curRent,propAge,furnish,intRate,la,rate,tenure,parking,socTransfer,broker,cashAmt,cashWhen,invRet]);

  const doTransform=()=>{setPhase("results");setTab("pyramid");setTimeout(()=>pyrRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),100)};
  const secs=[{id:"property",label:"Property",icon:"home",color:"#522de6",req:true},{id:"government",label:"Government Charges",icon:"gavel",color:"#787587",auto:true},{id:"financing",label:"Financing",icon:"account_balance",color:"#5e5b77",req:true},{id:"interiors",label:"Interiors & Move-in",icon:"design_services",color:"#ce2c66",req:true},{id:"recurring",label:"Recurring Costs",icon:"autorenew",color:"#ac064e",auto:true},{id:"upfront",label:"Upfront & Hidden",icon:"visibility",color:"#6B4EFF",auto:true}];

  return(<div style={{minHeight:"100vh",background:"#FAF9FD",color:"#1a1c1e",fontFamily:"'Inter',system-ui,sans-serif"}}>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
    <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes morphIn{from{opacity:0;transform:scaleY(.3)}to{opacity:1;transform:scaleY(1)}}@keyframes glowP{0%,100%{box-shadow:0 0 20px rgba(82,45,230,.15)}50%{box-shadow:0 0 40px rgba(82,45,230,.3)}}@keyframes cashP{0%,100%{opacity:.6}50%{opacity:1}}.anim{animation:fadeUp .4s ease both}.morph{animation:morphIn .6s cubic-bezier(.16,1,.3,1) both}.glow{animation:glowP 2s ease infinite}.cashB{animation:cashP 1.5s ease infinite}@keyframes spin{to{transform:rotate(360deg)}}.glass{background:rgba(250,249,253,.82);backdrop-filter:blur(24px)}.lift{box-shadow:0 24px 48px -12px rgba(98,95,123,.1)}.ghost{border:1px solid rgba(201,196,217,.25)}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}input[type=number]{-moz-appearance:textfield}`}</style>

    <header className="glass" style={{position:"fixed",top:0,width:"100%",zIndex:50,borderBottom:"1px solid rgba(201,196,217,.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",maxWidth:540,margin:"0 auto"}}>
        <div><div style={{fontSize:"1rem",fontWeight:900,letterSpacing:"-.04em",fontFamily:"'Plus Jakarta Sans'"}}><span style={{color:"#522de6"}}>un</span>-real-estate</div><div style={{fontSize:".5rem",color:"#787587",marginTop:-1}}>the real cost, before you sign</div></div>
        {phase==="results"&&<button onClick={()=>{setPhase("input");setDetailIdx(null)}} style={{padding:"6px 14px",borderRadius:99,background:"#f4f3f7",fontSize:".72rem",fontWeight:700,color:"#787587",border:"none",cursor:"pointer"}}>Edit</button>}
      </div>
    </header>

    <main style={{maxWidth:540,margin:"0 auto",padding:"68px 20px 100px"}}>
      {/* INPUT */}
      {phase==="input"&&<><section className="anim" style={{marginBottom:28,paddingTop:12}}><p style={{fontSize:".58rem",fontWeight:600,color:"#787587",letterSpacing:".14em",textTransform:"uppercase",marginBottom:4}}>Total Cost Architecture</p><h2 style={{fontSize:"clamp(1.7rem,5.5vw,2.2rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>Every cost.<br/><span style={{color:"#522de6"}}>No fiction.</span></h2><p style={{fontSize:".82rem",color:"#787587",marginTop:8,lineHeight:1.5,maxWidth:400}}>Expand each section. We calculate what they never told you.</p></section>
      <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:24}}>
        {secs.map(sec=>{const isO=open===sec.id;const isD=done.has(sec.id);const isA=sec.auto&&done.has("property");
          return(<div key={sec.id} className={isO?"lift":""} style={{borderRadius:16,overflow:"hidden",border:isO?`1.5px solid ${sec.color}30`:`1px solid ${isD||isA?sec.color+"30":"#e3e2e6"}`,background:"#fff",transition:"all .3s"}}>
            <button onClick={()=>setOpen(isO?null:sec.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:isD||isA?`${sec.color}08`:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}>
              <div style={{width:36,height:36,borderRadius:10,background:isD||isA?sec.color:`${sec.color}15`,display:"grid",placeItems:"center",flexShrink:0}}><span className="material-symbols-outlined" style={{fontSize:18,color:isD||isA?"#fff":sec.color,fontVariationSettings:isD||isA?"'FILL' 1":"'FILL' 0"}}>{sec.icon}</span></div>
              <div style={{flex:1}}><div style={{fontSize:".82rem",fontWeight:700,fontFamily:"'Plus Jakarta Sans'"}}>{sec.label}</div>{sec.auto&&<div style={{fontSize:".62rem",color:"#787587"}}>Auto-calculated</div>}{sec.req&&!isD&&<div style={{fontSize:".62rem",color:sec.color}}>Required</div>}</div>
              {(isD||isA)&&<span className="material-symbols-outlined" style={{fontSize:18,color:sec.color,fontVariationSettings:"'FILL' 1"}}>check_circle</span>}
              <span className="material-symbols-outlined" style={{fontSize:18,color:"#787587",transform:isO?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>expand_more</span>
            </button>
            {isO&&<div style={{padding:"0 16px 16px",animation:"fadeUp .25s ease"}}>
              {sec.id==="property"&&<><PF l="State"><PSel v={st} set={e=>setSt(e.target.value)} o={Object.entries(SD).map(([k,v])=>({v:k,l:v.l}))}/></PF><PF l="City"><PSel v={city} set={e=>setCity(e.target.value)} o={Object.entries(sI.c).map(([k,v])=>({v:k,l:v.l}))}/></PF>{cI&&<Chip>Circle: Rs {cI.cr[0].toLocaleString("en-IN")} — {cI.cr[1].toLocaleString("en-IN")}/sqft</Chip>}<PF l="Agreement Value (Rs)"><PNum v={bp} set={setBP}/></PF><PF l="Carpet Area (sqft)"><PNum v={ca} set={setCA}/></PF><PF l="Gender"><PTog o={[{v:"male",l:"Male"},{v:"female",l:"Female"},{v:"joint",l:"Joint"}]} v={gender} set={setG}/></PF><PF l="Transaction"><PTog o={[{v:"new",l:"New (Builder)"},{v:"resale",l:"Resale"}]} v={txn} set={setTxn}/></PF>{txn==="new"&&<PF l="Status"><PTog o={[{v:"under",l:"Under Construction"},{v:"ready",l:"Ready"}]} v={cst} set={setCst}/></PF>}{txn==="new"&&cst==="under"&&<><PF l="Possession (months)"><PNum v={possession} set={setPoss}/></PF><PF l="Renting now?"><PTog o={[{v:true,l:"Yes"},{v:false,l:"No"}]} v={renting} set={setRenting}/></PF>{renting&&<PF l="Monthly Rent"><PNum v={curRent} set={setCurRent}/></PF>}</>}{txn==="resale"&&<><PF l="Property Age"><PTog o={[{v:"0-5",l:"0-5yr"},{v:"5-10",l:"5-10yr"},{v:"10-20",l:"10-20yr"},{v:"20+",l:"20+"}]} v={propAge} set={setPropAge}/></PF><PF l="Brokerage %"><PNum v={broker} set={setBk}/></PF><PF l="Society Transfer (Rs)"><PNum v={socTransfer} set={setSTF}/></PF></>}
              <div style={{marginTop:12,padding:14,borderRadius:14,background:cashAmt>0?"#ba1a1a08":"#f4f3f7",border:cashAmt>0?"1px solid #ba1a1a20":"1px solid #e3e2e6"}}><PF l="Cash Component (Rs)" h="Off-books. Advise zero."><PNum v={cashAmt} set={setCashAmt}/></PF>{cashAmt>0&&<><PF l="When paid?"><PTog o={[{v:"booking",l:"Booking"},{v:"registration",l:"Registration"},{v:"possession",l:"Possession"}]} v={cashWhen} set={setCashWhen}/></PF><div style={{padding:"10px 12px",borderRadius:10,background:"#ba1a1a0d",border:"1px solid #ba1a1a18",fontSize:".72rem",color:"#474556",lineHeight:1.6}}><strong style={{color:"#ba1a1a"}}>Handling fee: ~{cashP(cashAmt)}% = Rs {f$(cashF(cashAmt))}</strong><br/>Total burden: <strong style={{color:"#ba1a1a"}}>Rs {f$(cashAmt+cashF(cashAmt))}</strong></div></>}</div>
              <DB color={sec.color} onClick={()=>{mark("property");mark("government");mark("recurring");mark("upfront")}}/></>}
              {sec.id==="financing"&&<><PF l="Loan Amount"><PNum v={la} set={setLA}/></PF><div style={{fontSize:".66rem",color:la>bp*.85?"#ba1a1a":"#787587",marginBottom:8,fontFamily:"monospace"}}>LTV: {bp>0?Math.round(la/bp*100):0}%</div><PF l="Interest %"><PNum v={rate} set={setRate}/></PF><PF l="Tenure (years)"><PNum v={tenure} set={setTen}/></PF><PF l="Comparable Rent" h="For Buy vs Rent"><PNum v={curRent} set={setCurRent}/></PF><PF l="Investment Return %" h="Nifty avg ~12%"><PNum v={invRet} set={setInvRet}/></PF>{R&&<Chip accent>EMI: <strong>{fM(R.e)}</strong> | Interest: <strong style={{color:"#ba1a1a"}}>{fF(R.tInt)}</strong></Chip>}<DB color={sec.color} onClick={()=>mark("financing")}/></>}
              {sec.id==="interiors"&&<><PF l={txn==="resale"?"Condition":"Handover"}><PTog o={txn==="resale"?[{v:"ready",l:"Move-in"},{v:"cosmetic",l:"Refresh"},{v:"reno",l:"Major Reno"}]:[{v:"bare",l:"Bare Shell"},{v:"semi",l:"Semi-Furn"},{v:"full",l:"Fully Furn"}]} v={furnish} set={setFurnish}/></PF>{furnish!=="full"&&furnish!=="ready"&&<PF l="Quality"><PSel v={intRate} set={e=>setIntRate(Number(e.target.value))} o={INTR.map(i=>({v:i.v,l:i.l}))}/></PF>}<PF l="Parking"><PTog o={[{v:"covered",l:"Covered"},{v:"open",l:"Open"},{v:"none",l:"Included"}]} v={parking} set={setPk}/></PF><DB color={sec.color} onClick={()=>mark("interiors")}/></>}
              {sec.auto&&R&&<DRows rows={R.det[sec.id]}/>}
            </div>}
          </div>)})}
      </div>
      {allDone&&!open&&<div className="anim" style={{textAlign:"center"}}><button onClick={doTransform} className="glow" style={{padding:"16px 40px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:900,fontSize:".92rem",fontFamily:"'Plus Jakarta Sans'",border:"none",cursor:"pointer"}}>Transform</button><p style={{fontSize:".68rem",color:"#787587",marginTop:8}}>See where every rupee goes</p></div>}
      </>}

      {/* RESULTS */}
      {phase==="results"&&R&&<div ref={pyrRef}>
        <section className="anim" style={{marginBottom:16,paddingTop:12}}><p style={{fontSize:".58rem",fontWeight:600,color:"#787587",letterSpacing:".14em",textTransform:"uppercase",marginBottom:4}}>Your Cost Architecture</p><h2 style={{fontSize:"clamp(1.5rem,5vw,2rem)",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",lineHeight:1.08,letterSpacing:"-.05em"}}>Rs {f$(R.tProj)} <span style={{fontSize:".42em",color:"#ce2c66",fontWeight:700}}>({R.mul.toFixed(2)}x)</span></h2></section>

        {/* TABS */}
        <div style={{display:"flex",gap:3,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
          {[{k:"pyramid",l:"Breakdown",i:"insights"},{k:"timeline",l:"Timeline",i:"timeline"},{k:"rent",l:"Buy vs Rent",i:"compare"},{k:"intel",l:"Intelligence",i:"auto_awesome"}].map(t=><button key={t.k} onClick={()=>{setTab(t.k);setDetailIdx(null)}} style={{display:"flex",alignItems:"center",gap:4,padding:"8px 12px",borderRadius:9,border:tab===t.k?"1.5px solid #522de6":"1px solid #e3e2e6",background:tab===t.k?"#522de610":"#fff",color:tab===t.k?"#522de6":"#787587",fontSize:".7rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}><span className="material-symbols-outlined" style={{fontSize:14}}>{t.i}</span>{t.l}</button>)}
        </div>

        {/* PYRAMID TAB */}
        {tab==="pyramid"&&<div className="anim">
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,marginBottom:18}}>
            {R.sorted.map((seg,i)=>{const w=100-(i*14);const isO=detailIdx===i;const hasCash=seg.id==="upfront"&&R.tCash>0;
              return <div key={seg.id} className="morph" style={{width:`${w}%`,animationDelay:`${i*.08}s`,position:"relative"}}>
                <button onClick={()=>setDetailIdx(isO?null:i)} style={{width:"100%",padding:i===0?"16px":"11px 14px",borderRadius:i===0?"4px 4px 16px 16px":i===R.sorted.length-1?"12px 12px 4px 4px":5,background:seg.color,color:"#fff",border:isO?"2px solid #fff":"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7,boxShadow:`0 6px 18px ${seg.color}30`,transition:"all .3s",transform:isO?"scale(1.03)":"scale(1)"}}>
                  <span className="material-symbols-outlined" style={{fontSize:i===0?18:15,fontVariationSettings:"'FILL' 1"}}>{seg.icon}</span>
                  <span style={{fontSize:i===0?".72rem":".63rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",letterSpacing:".02em",textTransform:"uppercase"}}>{seg.label}</span>
                  {hasCash&&<span className="cashB" style={{width:7,height:7,borderRadius:99,background:"#ff4444",border:"2px solid #fff"}}/>}
                </button>
                <div style={{position:"absolute",[i%2===0?"right":"left"]:"calc(100% + 10px)",top:"50%",transform:"translateY(-50%)",textAlign:i%2===0?"left":"right",whiteSpace:"nowrap"}}><div style={{fontSize:".55rem",fontWeight:800,color:seg.color}}>{seg.pct.toFixed(1)}%</div><div style={{fontSize:".68rem",fontWeight:700,fontFamily:"'JetBrains Mono'"}}>{f$(seg.val)}</div><div style={{fontSize:".46rem",color:"#787587"}}>{seg.when}</div></div>
              </div>})}
          </div>
          <div style={{display:"grid",gridTemplateColumns:R.tCash>0?"1fr 1fr 1fr":"1fr 1fr",gap:8,marginBottom:12}}><QS l="Day-1" v={`Rs ${f$(R.d1)}`}/><QS l="Monthly" v={fM(R.e+R.aR/12)}/>{R.tCash>0&&<QS l="Cash" v={`Rs ${f$(R.tCash)}`} w/>}</div>
          {R.tCash>0&&<div style={{padding:"11px 13px",borderRadius:12,background:"#ba1a1a0a",border:"1px solid #ba1a1a20",marginBottom:12,display:"flex",gap:9}}><span className="material-symbols-outlined cashB" style={{fontSize:18,color:"#ba1a1a",flexShrink:0,marginTop:1}}>warning</span><div><div style={{fontSize:".74rem",fontWeight:800,color:"#ba1a1a",marginBottom:2}}>Rs {f$(R.cashAmt)} cash ({cashWhen}) + Rs {f$(R.cFe)} handling</div><div style={{fontSize:".68rem",color:"#474556",lineHeight:1.5}}>Total: <strong>Rs {f$(R.tCash)}</strong>. No trail. Penalty if caught: 78-137%.</div></div></div>}
          {detailIdx!==null&&R.sorted[detailIdx]&&<div className="anim lift ghost" style={{borderRadius:14,background:"#fff",padding:14,marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><h3 style={{fontSize:".82rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",color:R.sorted[detailIdx].color}}>{R.sorted[detailIdx].label}</h3><button onClick={()=>setDetailIdx(null)} style={{background:"none",border:"none",cursor:"pointer"}}><span className="material-symbols-outlined" style={{fontSize:16,color:"#787587"}}>close</span></button></div><DRows rows={R.det[R.sorted[detailIdx].id]}/></div>}
          <Lbl>Insights</Lbl>
          <IC t={`${R.mul.toFixed(1)}x sticker`} x={`Rs ${f$(R.bp)} becomes Rs ${f$(R.tProj)} over ${tenure}yr.`} c="#522de6"/>
          {R.tCash>0&&<IC t={`Cash costs Rs ${f$(R.tCash)}, not Rs ${f$(R.cashAmt)}`} x={`~${R.cPc}% handling (Rs ${f$(R.cFe)}) to builder-connected broker. Penalty: 78-137% under IT Act.`} c="#ba1a1a"/>}
          {R.preE>0&&<IC t={`Rs ${f$(R.preE+R.rOver)} before move-in`} x={`Pre-EMI: Rs ${f$(R.preE)}${R.rOver>0?`. Rent: Rs ${f$(R.rOver)}`:""}. Does not reduce loan.`} c="#ac064e"/>}
          {gender==="male"&&sI.st.female<sI.st.male&&<IC t={`Save Rs ${f$(bp*(sI.st.male-sI.st.female))}`} x={`Woman's name: ${(sI.st.female*100).toFixed(1)}% vs ${(sI.st.male*100).toFixed(1)}% stamp.`} c="#0d9488"/>}
        </div>}

        {/* TIMELINE TAB */}
        {tab==="timeline"&&<div className="anim">
          <Lbl>Who pays what, when</Lbl>
          <div className="ghost lift" style={{borderRadius:16,background:"#fff",padding:16,marginBottom:14}}>
            <TI w="Booking" items={[{l:"You pay booking",v:`~${fF(Math.min(bp*.1,5e5))}`,y:true},{l:"Loan processing",v:fF(la*.005),y:true}]} c="#522de6"/>
            <TI w="Registration" items={[{l:"Down payment",v:fF(R.dp),y:true},{l:"Stamp+Regn+Legal",v:fF(R.govT),y:true},R.tCash>0&&{l:`Cash (${cashWhen})`,v:fF(R.tCash),y:true,cash:true}].filter(Boolean)} c="#ce2c66"/>
            {R.isUC&&<TI w={`Construction (${possession}mo)`} items={[{l:"Pre-EMI interest",v:fF(R.preE),y:true},R.rOver>0&&{l:"Your rent",v:fF(R.rOver),y:true},{l:"Bank disburses stages",v:`Rs ${f$(la)}`,y:false}].filter(Boolean)} c="#ac064e"/>}
            <TI w="Possession" items={[{l:"Society deposits",v:fF(R.det.upfront[1].v+R.det.upfront[2].v),y:true},{l:"Bank final tranche",v:"",y:false}]} c="#5e5b77"/>
            <TI w={`EMI (${tenure}yr)`} items={[{l:"Your total EMIs",v:fF(R.e*tenure*12),y:true},{l:"Bank keeps as interest",v:fF(R.tInt),y:false},{l:"Reduces your loan",v:fF(la),y:false}]} c="#522de6" last/>
          </div>
          <Lbl>Amortization — Interest vs Principal</Lbl>
          <div className="ghost lift" style={{borderRadius:16,background:"#fff",padding:16}}>
            <div style={{overflowX:"auto"}}><div style={{display:"flex",gap:2,alignItems:"end",height:120,minWidth:Math.max(260,R.amort.length*14)}}>
              {R.amort.map((yr,i)=>{const tot=yr.i+yr.p;const ip=tot>0?(yr.i/tot)*100:50;return <div key={i} style={{flex:1,minWidth:8,display:"flex",flexDirection:"column",height:"100%"}}><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}><div style={{width:"100%",borderRadius:"3px 3px 0 0",background:"#ce2c66",height:`${ip}%`,minHeight:1}}/><div style={{width:"100%",borderRadius:"0 0 3px 3px",background:"#522de6",height:`${100-ip}%`,minHeight:1}}/></div>{(yr.yr===1||yr.yr%5===0||yr.yr===tenure)&&<div style={{fontSize:".46rem",color:"#787587",marginTop:2,textAlign:"center",fontFamily:"monospace"}}>Y{yr.yr}</div>}</div>})}
            </div><div style={{display:"flex",gap:14,marginTop:10}}><Lg c="#ce2c66" l="Interest"/><Lg c="#522de6" l="Principal"/></div></div>
            <div style={{marginTop:10,padding:"9px 11px",borderRadius:9,background:"#f4f3f7",fontSize:".7rem",color:"#474556",lineHeight:1.5}}>Year 1: {R.amort[0]?`${Math.round(R.amort[0].i/(R.e*12)*100)}% of EMI is bank profit`:""}.  Flips at ~Year {(R.amort.findIndex(a=>a.p>a.i)+1)||"?"}.</div>
          </div>
        </div>}

        {/* BUY VS RENT TAB */}
        {tab==="rent"&&<div className="anim">
          <Lbl>Buy vs Rent — {tenure} years</Lbl>
          <div className="ghost lift" style={{borderRadius:16,background:"#fff",padding:16,marginBottom:14}}>
            <div style={{fontSize:".72rem",color:"#787587",marginBottom:14,lineHeight:1.5}}>If you rent at {fM(curRent)} and invest Day-1 cash ({fF(R.d1)}) + monthly savings ({fM(Math.max(0,R.moS))}) at {invRet}%:</div>
            {[{l:"Investment corpus",v:R.invT,c:"#22c55e"},{l:`Property @ 4% growth`,v:R.pa4,c:"#522de6"},{l:`Property @ 7% growth`,v:R.pa7,c:"#6B4EFF"},{l:"Total rent paid",v:R.tRent,c:"#ce2c66"}].map((b,i)=>{const mx=Math.max(R.invT,R.pa7,R.tRent);const p=mx>0?(b.v/mx)*100:0;return <div key={i} style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:".7rem",fontWeight:600,color:"#474556"}}>{b.l}</span><span style={{fontSize:".72rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:b.c}}>Rs {f$(b.v)}</span></div><div style={{height:8,borderRadius:4,background:"#f4f3f7",overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:b.c,width:`${p}%`,transition:"width .6s"}}/></div></div>})}
          </div>
          <IC t={R.invT>R.pa7?"Math favours renting + investing":R.invT>R.pa4?"Close call — depends on appreciation":"Buying looks favourable"} x={R.invT>R.pa7?`Investing: Rs ${f$(R.invT)} vs property at Rs ${f$(R.pa7)} (7%). Ownership offers stability, but financially renting wins.`:R.invT>R.pa4?`Investing: Rs ${f$(R.invT)}. Property 4%: Rs ${f$(R.pa4)}, 7%: Rs ${f$(R.pa7)}. Location confidence decides.`:`Property 4%: Rs ${f$(R.pa4)} matches Rs ${f$(R.invT)} from investing. At 7%: Rs ${f$(R.pa7)}. Plus equity + no landlord.`} c="#522de6"/>
          <IC t="Opportunity cost of Day-1 cash" x={`Rs ${f$(R.d1)} at ${invRet}% for ${tenure}yr = Rs ${f$(R.fvL)}. That is Rs ${f$(R.fvL-R.d1)} forgone. Not a reason to skip — but a cost to see.`} c="#5e5b77"/>
        </div>}

        {/* INTELLIGENCE TAB */}
        {tab==="intel"&&<div className="anim">
          <Lbl>Pincode Intelligence — {cI?.l||"your area"}</Lbl>

          {/* FREE AI INSIGHTS */}
          <div className="ghost lift" style={{borderRadius:16,background:"#fff",padding:16,marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><div style={{fontSize:".8rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>Free Market Preview</div><div style={{fontSize:".62rem",color:"#787587"}}>2 live insights powered by AI + Google Search</div></div>
              {!aiData&&!aiLoading&&<button onClick={fetchAI} style={{padding:"8px 16px",borderRadius:99,background:"#522de6",color:"#fff",fontSize:".72rem",fontWeight:800,border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans'",whiteSpace:"nowrap"}}>Get Insights</button>}
            </div>

            {aiLoading&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{width:24,height:24,border:"3px solid #e3e2e6",borderTopColor:"#522de6",borderRadius:99,margin:"0 auto 8px",animation:"spin .8s linear infinite"}}/><div style={{fontSize:".68rem",color:"#787587"}}>Searching real-time data...</div></div>}
            {aiErr&&<div style={{padding:"10px 14px",borderRadius:10,background:"#ba1a1a08",border:"1px solid #ba1a1a18",fontSize:".72rem",color:"#ba1a1a"}}>Could not fetch: {aiErr}. Try again.</div>}

            {aiData&&aiData.data&&<div style={{display:"grid",gap:8}}>
              {/* Card 1: Market Direction */}
              {aiData.data.market_direction&&<div style={{padding:"12px 14px",borderRadius:12,background:aiData.data.market_direction.signal==="buyers_market"?"#22c55e0a":aiData.data.market_direction.signal==="sellers_market"?"#ce2c660a":"#f59e0b0a",border:`1px solid ${aiData.data.market_direction.signal==="buyers_market"?"#22c55e20":aiData.data.market_direction.signal==="sellers_market"?"#ce2c6620":"#f59e0b20"}`}}>
                <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",color:"#787587",marginBottom:3}}>Market Direction</div>
                <div style={{fontSize:".88rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"capitalize",marginBottom:3}}>{(aiData.data.market_direction.signal||"").replace(/_/g," ")}</div>
                {aiData.data.market_direction.reason&&<div style={{fontSize:".7rem",color:"#474556",lineHeight:1.5}}>{aiData.data.market_direction.reason}</div>}
              </div>}

              {/* Card 2: Price Trend */}
              {aiData.data.price_trend&&<div style={{padding:"12px 14px",borderRadius:12,background:aiData.data.price_trend.direction==="rising"?"#22c55e0a":aiData.data.price_trend.direction==="falling"?"#ce2c660a":"#f4f3f7",border:"1px solid #e3e2e6"}}>
                <div style={{fontSize:".58rem",fontWeight:800,letterSpacing:".06em",textTransform:"uppercase",fontFamily:"monospace",color:"#787587",marginBottom:3}}>Price Trend</div>
                <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                  <span style={{fontSize:".88rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",textTransform:"capitalize"}}>{aiData.data.price_trend.direction||"N/A"}</span>
                  {aiData.data.price_trend.yoy_pct&&<span style={{fontSize:".72rem",fontFamily:"'JetBrains Mono'",color:aiData.data.price_trend.direction==="rising"?"#22c55e":"#ce2c66"}}>{aiData.data.price_trend.yoy_pct>0?"+":""}{aiData.data.price_trend.yoy_pct}% YoY</span>}
                </div>
                {aiData.data.price_trend.detail&&<div style={{fontSize:".7rem",color:"#474556",lineHeight:1.5,marginTop:3}}>{aiData.data.price_trend.detail}</div>}
              </div>}

              {/* Rate outlook + tip */}
              {aiData.data.rate_outlook&&aiData.data.rate_outlook.direction&&<div style={{padding:"10px 14px",borderRadius:10,background:"#f4f3f7",fontSize:".7rem",color:"#474556",lineHeight:1.5}}>
                <strong>RBI outlook:</strong> Repo at {aiData.data.rate_outlook.repo||"--"}%, direction: {(aiData.data.rate_outlook.direction||"").replace(/_/g," ")}. {aiData.data.rate_outlook.note||""}
              </div>}
              {aiData.data.buyer_tip&&<div style={{padding:"10px 14px",borderRadius:10,background:"#522de608",border:"1px solid #522de615",fontSize:".7rem",color:"#474556",lineHeight:1.5}}><strong style={{color:"#522de6"}}>Analyst tip:</strong> {aiData.data.buyer_tip}</div>}

              {/* Sources */}
              {aiData.sources&&aiData.sources.length>0&&<div style={{fontSize:".58rem",color:"#787587",marginTop:2}}><span style={{fontWeight:700}}>Sources:</span> {aiData.sources.slice(0,3).map((s,i)=> <a key={i} href={s.url} target="_blank" rel="noopener" style={{color:"#522de6",marginRight:6}}>{s.title||"Link"}</a>)}</div>}
              {aiData.data.data_freshness&&<div style={{fontSize:".54rem",color:"#787587",fontFamily:"monospace"}}>Data: {aiData.data.data_freshness}</div>}
            </div>}

            {!aiData&&!aiLoading&&!aiErr&&<div style={{textAlign:"center",padding:"16px 0",color:"#787587",fontSize:".72rem"}}>Tap "Get Insights" to see live market data for {cI?.l||"your area"}</div>}
          </div>

          {/* LOCKED PREMIUM CARDS */}
          <Lbl>Full Premium Report includes</Lbl>
          {[
            {i:"balance",t:"Fair Price Assessment",d:`Is Rs ${Math.round(bp/(ca||1)).toLocaleString("en-IN")}/sqft fair? Based on registered sales, not listings.`,tease:"Verdict: XXXXX at Rs X,XXX/sqft vs area avg Rs X,XXX/sqft"},
            {i:"apartment",t:"Supply Pipeline",d:"RERA projects nearby. High supply = resale pressure.",tease:"XX projects | XX,000 units in 3km radius | Risk: XXXXX"},
            {i:"train",t:"Infrastructure Impact",d:"Metro, highways, IT parks — confirmed timelines + price impact.",tease:"3 projects within 5km | Completion: 202X | +X-X% impact"},
            {i:"handshake",t:"Negotiation Playbook",d:"When to negotiate, realistic discount range, specific tactics.",tease:"Negotiable range: X-X% | Best timing: XXXXX | Leverage: XXXXX"},
            {i:"verified",t:"Builder Track Record",d:"Delivery vs promises, RERA compliance, complaints, legal cases.",tease:"Delivery score: X/10 | Avg delay: X months | Cases: X"},
            {i:"target",t:"What to Actually Target",d:"3-5 alternatives with better value + growth for your budget.",tease:"Alt 1: XXXXX — Rs X,XXX/sqft | Growth: X% | Rating: X/10"}
          ].map((item,i)=> <div key={i} className="ghost" style={{padding:"13px 15px",borderRadius:14,background:"#fff",marginBottom:7,position:"relative",overflow:"hidden"}}>
            <div style={{display:"flex",gap:11}}>
              <div style={{width:34,height:34,borderRadius:9,background:"#522de610",display:"grid",placeItems:"center",flexShrink:0}}><span className="material-symbols-outlined" style={{fontSize:17,color:"#522de6"}}>{item.i}</span></div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:2}}><span style={{fontSize:".78rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'"}}>{item.t}</span><span className="material-symbols-outlined" style={{fontSize:13,color:"#ce2c66"}}>lock</span></div>
                <p style={{fontSize:".68rem",color:"#787587",lineHeight:1.4,marginBottom:6}}>{item.d}</p>
                <div style={{padding:"8px 12px",borderRadius:8,background:"#f4f3f7",position:"relative"}}>
                  <div style={{fontSize:".7rem",fontFamily:"'JetBrains Mono'",color:"#787587",filter:"blur(4px)",userSelect:"none"}}>{item.tease}</div>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                    <span className="material-symbols-outlined" style={{fontSize:14,color:"#522de6"}}>lock</span>
                    <span style={{fontSize:".62rem",fontWeight:800,color:"#522de6"}}>Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>)}

          {/* WAITLIST CTA WITH FORM */}
          <div style={{padding:"22px 18px",borderRadius:18,background:"linear-gradient(135deg,#522de610,#ce2c6608)",marginTop:12}}>
            <div style={{textAlign:"center",marginBottom:14}}>
              <p style={{fontSize:".54rem",fontWeight:800,color:"#ce2c66",letterSpacing:".12em",textTransform:"uppercase",fontFamily:"monospace",marginBottom:4}}>Premium Intelligence</p>
              <h3 style={{fontSize:"1rem",fontWeight:900,fontFamily:"'Plus Jakarta Sans'",letterSpacing:"-.03em",marginBottom:4}}>All 8 analyses. One PDF.<br/><span style={{color:"#522de6"}}>Your exact pincode.</span></h3>
              <p style={{fontSize:".7rem",color:"#787587",lineHeight:1.5}}>Search-backed, AI-generated, zero builder affiliation. Rs 499/report.</p>
            </div>

            {wlSent ? (
              <div style={{textAlign:"center",padding:"14px",borderRadius:12,background:"#22c55e10",border:"1px solid #22c55e25"}}>
                <span className="material-symbols-outlined" style={{fontSize:24,color:"#22c55e",marginBottom:4,display:"block"}}>check_circle</span>
                <div style={{fontSize:".82rem",fontWeight:800,color:"#22c55e"}}>You are on the list.</div>
                <div style={{fontSize:".66rem",color:"#787587",marginTop:2}}>We will notify you when Premium launches for {cI?.l||"your area"}.</div>
              </div>
            ) : (
              <form name="waitlist" method="POST" data-netlify="true" onSubmit={(e)=>{e.preventDefault();const fd=new FormData(e.target);fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(fd).toString()}).then(()=>setWlSent(true)).catch(()=>setWlSent(true));}}>
                <input type="hidden" name="form-name" value="waitlist" />
                <input type="hidden" name="city" value={cI?.l||""} />
                <input type="hidden" name="state" value={sI?.l||""} />
                <input type="hidden" name="price" value={bp} />
                <div style={{display:"flex",gap:6,marginBottom:8}}>
                  <input type="email" name="email" value={wlEmail} onChange={e=>setWlEmail(e.target.value)} placeholder="your@email.com" required style={{flex:2,height:42,padding:"0 12px",borderRadius:11,border:"1px solid #e3e2e6",background:"#fff",fontSize:".82rem",outline:"none"}} />
                  <input type="text" name="pincode" value={wlPin} onChange={e=>setWlPin(e.target.value)} placeholder="Pincode" maxLength={6} style={{flex:1,height:42,padding:"0 12px",borderRadius:11,border:"1px solid #e3e2e6",background:"#fff",fontSize:".82rem",outline:"none",fontFamily:"'JetBrains Mono'"}} />
                </div>
                <button type="submit" style={{width:"100%",padding:"12px",borderRadius:99,background:"linear-gradient(135deg,#522de6,#ce2c66)",color:"#fff",fontWeight:800,fontSize:".82rem",border:"none",cursor:"pointer",fontFamily:"'Plus Jakarta Sans'",boxShadow:"0 8px 20px rgba(82,45,230,.2)"}}>Join Waitlist — Free for first 500</button>
              </form>
            )}
          </div>
        </div>}
      </div>}
    </main>
    <div style={{textAlign:"center",padding:"14px 20px 22px",fontSize:".54rem",color:"#787587",fontFamily:"monospace"}}>2025-26 rates. Reference only. <strong style={{color:"#474556"}}>un-real-estate</strong></div>
  </div>);
}

/* COMPONENTS */
function DRows({rows}){if(!rows)return null;return <div>{rows.map((d,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f4f3f7",alignItems:"baseline"}}><div style={{display:"flex",alignItems:"center",gap:5}}>{d.cash&&<span style={{width:5,height:5,borderRadius:99,background:"#ba1a1a"}}/>}<span style={{fontSize:".73rem",color:d.b?"#1a1c1e":d.w?"#ba1a1a":"#474556",fontWeight:d.b?800:500}}>{d.l}</span></div><span style={{fontSize:".73rem",fontFamily:"'JetBrains Mono'",fontWeight:d.b?800:600,color:d.w?"#ba1a1a":"#1a1c1e"}}>{typeof d.v==="number"?fF(d.v):d.v}</span></div>)}</div>}
function PF({l,h,children}){return <div style={{marginBottom:10}}><label style={{display:"block",fontSize:".69rem",fontWeight:700,color:"#474556",marginBottom:4}}>{l}{h&&<span style={{fontWeight:500,color:"#787587"}}> — {h}</span>}</label>{children}</div>}
function PSel({v,set,o}){return <select value={v} onChange={set} style={{width:"100%",height:40,padding:"0 11px",borderRadius:11,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".83rem",outline:"none"}}>{o.map(x=><option key={String(x.v)} value={x.v}>{x.l}</option>)}</select>}
function PNum({v,set}){return <input type="number" value={v} onChange={e=>set(Number(e.target.value))} style={{width:"100%",height:40,padding:"0 11px",borderRadius:11,border:"1px solid #e3e2e6",background:"#faf9fd",fontSize:".85rem",outline:"none",fontFamily:"'JetBrains Mono'",fontWeight:600}}/>}
function PTog({o,v,set}){return <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{o.map(x=><button key={String(x.v)} onClick={()=>set(x.v)} style={{flex:1,minWidth:56,padding:"7px 5px",borderRadius:9,border:v===x.v?"1.5px solid #522de6":"1px solid #e3e2e6",background:v===x.v?"#522de610":"#faf9fd",color:v===x.v?"#522de6":"#787587",fontSize:".71rem",fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{x.l}</button>)}</div>}
function DB({color,onClick}){return <button onClick={onClick} style={{width:"100%",padding:"11px",borderRadius:12,background:color,color:"#fff",fontWeight:800,fontSize:".8rem",border:"none",cursor:"pointer",marginTop:10,fontFamily:"'Plus Jakarta Sans'"}}>Done</button>}
function Chip({children,accent}){return <div style={{padding:"7px 11px",borderRadius:9,background:accent?"#522de608":"#f4f3f7",border:accent?"1px solid #522de615":"1px solid #e3e2e6",fontSize:".7rem",color:"#474556",fontFamily:"'JetBrains Mono'",marginBottom:10,lineHeight:1.5}}>{children}</div>}
function QS({l,v,w}){return <div className="ghost" style={{padding:"10px 12px",borderRadius:12,background:w?"#ba1a1a06":"#fff"}}><div style={{fontSize:".52rem",fontWeight:700,color:w?"#ba1a1a":"#787587",letterSpacing:".07em",textTransform:"uppercase",marginBottom:1}}>{l}</div><div style={{fontSize:".8rem",fontWeight:800,fontFamily:"'JetBrains Mono'",color:w?"#ba1a1a":"#1a1c1e"}}>{v}</div></div>}
function IC({t,x,c}){return <div className="ghost" style={{padding:13,borderRadius:13,background:"#fff",marginBottom:7,boxShadow:"0 6px 18px -6px rgba(98,95,123,.06)"}}><h4 style={{fontSize:".78rem",fontWeight:800,fontFamily:"'Plus Jakarta Sans'",marginBottom:3,color:c}}>{t}</h4><p style={{fontSize:".71rem",color:"#474556",lineHeight:1.6}}>{x}</p></div>}
function Lbl({children}){return <p style={{fontSize:".55rem",fontWeight:700,color:"#787587",letterSpacing:".14em",textTransform:"uppercase",marginBottom:9}}>{children}</p>}
function Lg({c,l}){return <span style={{fontSize:".61rem",color:"#474556",display:"flex",alignItems:"center",gap:4}}><span style={{width:8,height:4,borderRadius:2,background:c}}/>{l}</span>}
function TI({w,items,c,last}){return <div style={{display:"flex",gap:11,paddingBottom:last?0:14,position:"relative"}}>{!last&&<div style={{position:"absolute",left:6,top:18,bottom:0,width:2,background:"#e3e2e6"}}/>}<div style={{width:14,height:14,borderRadius:99,background:c,flexShrink:0,marginTop:2}}/><div style={{flex:1}}><div style={{fontSize:".72rem",fontWeight:800,color:c,marginBottom:3}}>{w}</div>{items.map((it,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"3px 0"}}><div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:5,height:5,borderRadius:99,background:it.y?c:"#e3e2e6",border:it.cash?"1.5px solid #ba1a1a":"none"}}/><span style={{fontSize:".7rem",color:it.y?"#1a1c1e":"#787587",fontWeight:it.y?600:400,fontStyle:it.y?"normal":"italic"}}>{it.l}</span></div>{it.v&&<span style={{fontSize:".7rem",fontFamily:"'JetBrains Mono'",fontWeight:600,color:it.cash?"#ba1a1a":it.y?"#1a1c1e":"#787587"}}>{it.v}</span>}</div>)}</div></div>}
