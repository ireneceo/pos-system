"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Ie});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(8012),d=r(1367),l=r(2966),c=r(9189),p=r(9018),u=r(6038),m=r(8285),x=r(8409),h=r(5863),g=r(8406),y=r(7617),b=r(512),f=r(3577),v=r(4414);const j=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},_=e=>e?e.hasOwnProperty("current")?e.current:e:null,F=e=>e&&e.hasOwnProperty("history")&&e.history||[],w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},C=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,v.jsx)("span",{style:{fontSize:"12px"},children:r})},k=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,A=o.Ay.button`
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #635BFF;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    color: #5A54E5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`,S=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#1F2937"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E5E7EB"};

  &:hover {
    background: ${e=>e.active?"#5A54E5":"#F9FAFB"};
  }
`,B=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: #10B981;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #059669;
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`,E=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,T=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  /* Override DatePeriodFilter internal margin */
  & > div:first-child > div {
    margin-bottom: 0 !important;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`,I=o.Ay.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`,P=o.Ay.input`
  width: 100%;
  height: 38px;
  padding: 0 32px 0 36px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,N=o.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #E5E7EB;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: #6B7280;
  padding: 0;
  line-height: 1;

  &:hover {
    background: #D1D5DB;
  }
`,O=o.Ay.button`
  height: 38px;
  width: 38px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
  }

  .download-label {
    display: none;
  }

  &:hover {
    background: #E6EBF1;
  }

  @media (max-width: 768px) {
    width: 100%;
    order: 11;
    height: 40px;

    .download-label {
      display: inline;
    }
  }
`,z=o.Ay.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9CA3AF;
`,$=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
`,D=o.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,R=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`,M=o.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 12px 20px;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #6B7280;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px 14px;
    font-size: 11px;
  }
`,W=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,q=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,L=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,V=o.Ay.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
`,U=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,H=o.Ay.div`
  line-height: 1.6;
`,G=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,J=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,Y=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,K=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"outstanding":case"pending":case"verifying":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":case"rejected":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"outstanding":case"verifying":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";case"rejected":return"#DC2626";default:return"#6B7280"}}};
`,X=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,Z=o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`,Q=o.Ay.button`
  padding: 6px 12px;
  background: ${e=>"secondary"===e.variant?"#F6F9FC":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#6B7C93":"white"};
  border: ${e=>"secondary"===e.variant?"1px solid #E6EBF1":"none"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    background: ${e=>"secondary"===e.variant?"#E6EBF1":"#5A51E6"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    flex: 0 0 auto;
  }
`,ee=(0,o.Ay)(x.yl)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`,te=(0,o.Ay)(x.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`,re=o.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
    margin-left: 0;
  }
`,ne=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,ie=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,oe=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,se=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,ae=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,de=o.Ay.span`
  color: #6B7C93;
`,le=o.Ay.span`
  font-weight: 500;
`,ce=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,pe=o.Ay.div`
  flex: 1;
`,ue=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,me=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,xe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,he=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,ge=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,ye=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,be=o.Ay.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transform: translateX(${e=>e.isVisible?"0":"120%"});
  opacity: ${e=>e.isVisible?1:0};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: ${e=>{switch(e.type){case"success":default:return"#10B981";case"error":return"#EF4444";case"info":return"#3B82F6"}}};
  color: white;
  max-width: 400px;
`,fe=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,ve=o.Ay.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`,je=o.Ay.div`
  display: none;
  position: absolute;
  top: 0;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;

  @media print {
    display: block !important;
    position: static !important;
    left: 0 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`,_e=o.DU`
  @media print {
    @page {
      size: 80mm auto;
      margin: 0mm;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .no-print {
      display: none !important;
    }

    #bill-print-content {
      display: block !important;
      width: 80mm !important;
      max-width: 80mm !important;
      margin: 0 !important;
      padding: 5mm !important;
      background: white !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    #bill-print-content button {
      display: none !important;
    }
  }
`,Fe=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,we=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,Ce=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,ke=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Ae=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Se=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  border-top: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
  }
`,Be=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Ee=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Te=o.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${e=>e.active?"#5A51E6":"#F6F9FC"};
    border-color: ${e=>e.active?"#5A51E6":"#C7D2FE"};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Ie=()=>{var e,t,r;const{user:o}=(0,d.As)(),{getStoreInfo:Ie,operationSettings:Pe,paymentSettings:Ne}=(0,p.Pj)(),[Oe,ze]=(0,n.useState)([]),[$e,De]=(0,n.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[Re,Me]=(0,n.useState)({totalSales:0,avgAmount:0,maxAmount:0,orderCount:0}),[,We]=(0,n.useState)(null),[qe,Le]=(0,n.useState)("all"),[Ve,Ue]=(0,n.useState)(null),[He,Ge]=(0,n.useState)(!1),[Je,Ye]=(0,n.useState)(!1),[Ke,Xe]=(0,n.useState)(null),[Ze,Qe]=(0,n.useState)(!1),[et,tt]=(0,n.useState)(null),[rt,nt]=(0,n.useState)(!1),[it,ot]=(0,n.useState)(null),[st,at]=(0,n.useState)(!1),[dt,lt]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[ct,pt]=(0,n.useState)(!1),[ut,mt]=(0,n.useState)(!1),[xt,ht]=(0,n.useState)(!0),[gt,yt]=(0,n.useState)(1),[bt,ft]=(0,n.useState)(1),[vt,jt]=(0,n.useState)(0),[_t,Ft]=(0,n.useState)(null),[wt,Ct]=(0,n.useState)(null),[kt,At]=(0,n.useState)(0),[St,Bt]=(0,n.useState)(!0),[Et,Tt]=(0,n.useState)(null),[It,Pt]=(0,n.useState)("today"),[Nt,Ot]=(0,n.useState)(()=>(0,b.x)("today",Pe.timeZone)),[zt,$t]=(0,n.useState)(!1),[Dt,Rt]=(0,n.useState)(""),[Mt,Wt]=(0,n.useState)(!1),[qt,Lt]=(0,n.useState)(null),[Vt,Ut]=(0,n.useState)(!1),[Ht,Gt]=(0,n.useState)([]),[Jt,Yt]=(0,n.useState)(!1),[Kt,Xt]=(0,n.useState)(!1),[Zt,Qt]=(0,n.useState)(null),[er,tr]=(0,n.useState)(!1),[rr,nr]=(0,n.useState)([]),[,ir]=(0,n.useState)([]),[,or]=(0,n.useState)(null),[sr,ar]=(0,n.useState)([]),[dr,lr]=(0,n.useState)(!1),[cr,pr]=(0,n.useState)(""),[ur,mr]=(0,n.useState)(!1),[xr,hr]=(0,n.useState)(null),[gr,yr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[br,fr]=(0,n.useState)(null),vr=(0,n.useCallback)(function(e){yr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{yr(e=>({...e,isVisible:!1}))},4e3)},[]),jr=(0,n.useCallback)(()=>{if(St)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[St]);(0,n.useEffect)(()=>{At(e=>e+1);const e=setInterval(()=>{At(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const _r=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=new URLSearchParams({page:String(e),limit:"100",includeCompleted:"true"});"all"!==qe&&"outstanding"!==qe&&t.append("status",qe),Nt.start&&t.append("startDate",Nt.start),Nt.end&&t.append("endDate",Nt.end),Dt.trim()&&t.append("search",Dt.trim());const r=await fetch(`/api/orders/restaurant/${o.restaurantId}?${t}`,w()),n=await r.json();n.success&&n.data&&(ze(n.data),n.pagination&&(yt(n.pagination.currentPage),ft(n.pagination.totalPages),jt(n.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{ht(!1)}},[null===o||void 0===o?void 0:o.restaurantId,Nt.start,Nt.end,Dt,qe]),Fr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{var e,t;const r=new URLSearchParams;Nt.start&&r.append("startDate",Nt.start),Nt.end&&r.append("endDate",Nt.end);const n=await fetch(`/api/orders/restaurant/${o.restaurantId}/counts?${r}`,w()),i=await n.json();i.success&&null!==(e=i.data)&&void 0!==e&&e.counts&&De(i.data.counts),i.success&&null!==(t=i.data)&&void 0!==t&&t.statistics&&Me(i.data.statistics)}catch(r){console.error("Failed to fetch order counts:",r)}},[null===o||void 0===o?void 0:o.restaurantId,Nt.start,Nt.end]),wr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,w()),t=await e.json();t.success&&t.data&&Tt(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),Cr=(0,n.useRef)(jr);(0,n.useEffect)(()=>{Cr.current=jr},[jr]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),ze(t=>[e,...t]),De(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),Cr.current(),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),ze(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&De(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)}),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),ze(e=>{const r=e.find(e=>e.id===t);return r&&De(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)}),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Cr.current(),fr({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),We(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{_r(gt)},[_r,gt]),(0,n.useEffect)(()=>{Fr()},[Fr]),(0,n.useEffect)(()=>{yt(1)},[qe,Nt.start,Nt.end,It]);const kr=()=>Oe;(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,w()),t=await e.json();if(t.success||e.ok){const e=t.data||t;Ft({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&Ct(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),wr()},[null===o||void 0===o?void 0:o.restaurantId,wr]);const Ar=e=>"outstanding"===e.status,Sr=e=>"rejected"===e.payment_status?"rejected":"payment_verification_pending"===e.payment_status?"verifying":e.status,Br=e=>"rejected"===e?"Payment Rejected":"verifying"===e?"Verifying Payment":"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Er=()=>{const e=kr();let t;return t="all"===qe?e:"outstanding"===qe?e.filter(e=>Ar(e)):e.filter(e=>e.status===qe),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Tr=e=>$e[e]||0,Ir=async function(e,t){var r;let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Bt(!1);const i=(new Date).toISOString(),o=null===(r=Oe.find(t=>t.id===e))||void 0===r?void 0:r.status;ze(r=>r.map(r=>r.id===e?{...r,status:t,...n&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!r.served_at&&{served_at:i}}:r)),o&&o!==t&&De(e=>({...e,[o]:Math.max(0,(e[o]||0)-1),[t]:(e[t]||0)+1}));try{const r={status:t};n&&(r.kitchen_ready=!0);const o=Oe.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(r.served_at=i);const s=await fetch(`/api/orders/${e}/status`,w({method:"PATCH",body:JSON.stringify(r)}));(await s.json()).success?window.dispatchEvent(new Event("refreshBadgeCounts")):_r()}catch(s){console.error("Failed to update status:",s),_r()}},Pr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Nr=()=>{Vt&&Gt([]),Ut(!Vt)},Or=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),zr=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");ar(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{er?(async()=>{try{const r=(null===Ve||void 0===Ve?void 0:Ve.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,w()),fetch(`/api/menu?restaurantId=${r}`,w())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),ir(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});nr(d.filter(e=>!1!==e.is_available)),s.length>0&&or(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(ar([]),or(null))},[er]);const $r=e=>{Ue(e),Ge(!0)},Dr=()=>{Ge(!1),Ue(null),pt(!1),mt(!1),tr(!1),ar([])},Rr=async e=>{const t=e||Ve;if(t){const e=Ie(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void vr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Mr=e=>{Xe(e),Ye(!0)},Wr=()=>{Xe(null),Ye(!1)},qr=e=>{tt(e),Qe(!0)},Lr=()=>{tt(null),Qe(!1)},Vr=(e,t)=>{t&&t.stopPropagation(),lt(e),at(!0)},Ur=e=>(0,g.r6)(e,null===_t||void 0===_t?void 0:_t.operation_settings);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(_e,{}),(null===br||void 0===br?void 0:br.isVisible)&&(0,v.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,v.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,v.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,v.jsx)("button",{onClick:()=>fr(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,v.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,v.jsxs)("strong",{children:["Order ",br.orderNumber]}),br.tableNumber&&` (Table ${br.tableNumber})`,(0,v.jsx)("br",{}),(0,v.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",br.orderGroup]})," ",br.itemCount," item",br.itemCount>1?"s":""," added"]}),(0,v.jsx)("button",{onClick:()=>{Rt(br.orderNumber),Le("all"),fr(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,v.jsxs)(k,{className:"no-print",children:[(0,v.jsxs)(a.Ay,{title:"Live Orders",children:[Vt&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(B,{onClick:async()=>{if(Ht.length<2)return void vr("Please select at least 2 orders to merge","info");Oe.filter(e=>Ht.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?vr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Xt(!0)},disabled:Ht.length<2||Jt,children:Jt?"Merging...":`Merge (${Ht.length})`}),(0,v.jsx)(S,{active:!1,onClick:Nr,children:"Cancel"})]}),!Vt&&(0,v.jsx)(S,{active:Vt,onClick:Nr,children:"Select to Merge"}),(0,v.jsx)(A,{enabled:St,onClick:()=>Bt(!St),title:St?"Stop notification sound":"Play notification sound",children:St?(0,v.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,v.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,v.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,v.jsx)("svg",{viewBox:"0 0 24 24",children:(0,v.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,v.jsxs)(E,{children:[(0,v.jsxs)(T,{children:[(0,v.jsx)("div",{children:(0,v.jsx)(b.A,{activePeriod:It,dateRange:Nt,isCustomDateRange:zt,onPeriodChange:e=>{Pt(e),$t(!1),Ot((0,b.x)(e,Pe.timeZone))},onCalendarRangeSelect:(e,t)=>{$t(!0),Pt("all"),Ot({start:e,end:t})},includeToday:!0})}),(0,v.jsxs)(I,{children:[(0,v.jsx)(z,{children:"\ud83d\udd0d"}),(0,v.jsx)(P,{type:"text",placeholder:"Search...",value:Dt,onChange:e=>Rt(e.target.value)}),Dt&&(0,v.jsx)(N,{onClick:()=>Rt(""),title:"Clear search",children:"\xd7"})]}),(0,v.jsxs)(O,{onClick:()=>{const e=kr();if(0===e.length)return void vr("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,u.vv)(i.subtotal||e.total_amount||0,Pe.currency),(0,u.vv)(i.service_charge||0,Pe.currency),(0,u.vv)(i.tax||0,Pe.currency),(0,u.vv)(i.discount||0,Pe.currency),(0,u.vv)(e.total_amount||0,Pe.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${Nt.start}_to_${Nt.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",children:[(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,v.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,v.jsx)("span",{className:"download-label",children:"Download CSV"})]}),(0,v.jsxs)("button",{onClick:()=>Wt(!0),title:"Daily Settlement",style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",fontWeight:500,flexShrink:0},children:[(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,v.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]})]}),(0,v.jsxs)($,{children:[(0,v.jsxs)(D,{active:"all"===qe,onClick:()=>Le("all"),children:["All Orders",(0,v.jsx)(R,{children:Tr("all")})]}),(0,v.jsxs)(D,{active:"outstanding"===qe,onClick:()=>Le("outstanding"),children:["Outstanding",(0,v.jsx)(R,{children:Tr("outstanding")})]}),(0,v.jsxs)(D,{active:"pending"===qe,onClick:()=>Le("pending"),children:["Pending",(0,v.jsx)(R,{children:Tr("pending")})]}),(0,v.jsxs)(D,{active:"preparing"===qe,onClick:()=>Le("preparing"),children:["Preparing",(0,v.jsx)(R,{children:Tr("preparing")})]}),(0,v.jsxs)(D,{active:"ready"===qe,onClick:()=>Le("ready"),children:["Ready",(0,v.jsx)(R,{children:Tr("ready")})]}),(0,v.jsxs)(D,{active:"served"===qe,onClick:()=>Le("served"),children:["Served",(0,v.jsx)(R,{children:Tr("served")})]}),(0,v.jsxs)(D,{active:"completed"===qe,onClick:()=>Le("completed"),children:["Completed",(0,v.jsx)(R,{children:Tr("completed")})]}),(0,v.jsxs)(D,{active:"cancelled"===qe,onClick:()=>Le("cancelled"),children:["Cancelled",(0,v.jsx)(R,{children:Tr("cancelled")})]})]}),(0,v.jsx)(M,{children:(()=>{const e=(()=>{const e=Er().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(W,{children:["Total Sales ",(0,v.jsxs)("strong",{children:["RM",Re.totalSales.toFixed(2)]})]}),(0,v.jsxs)(W,{children:["Avg ",(0,v.jsxs)("strong",{children:["RM",Re.avgAmount.toFixed(2)]})]}),(0,v.jsxs)(W,{children:["Max ",(0,v.jsxs)("strong",{children:["RM",Re.maxAmount.toFixed(2)]})]}),(0,v.jsxs)(W,{children:["\u2265RM20 ",(0,v.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,v.jsxs)(W,{children:["Avg Serve ",(0,v.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,v.jsxs)(W,{children:["Max Serve ",(0,v.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,v.jsxs)(W,{children:["Min Serve ",(0,v.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,v.jsx)(q,{children:Er().length>0?(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[Vt&&(0,v.jsx)(x.gU,{align:"center",width:"50px",children:(0,v.jsx)("input",{type:"checkbox",checked:Ht.length>0&&Ht.length===Er().slice(50*(gt-1),50*gt).filter(e=>Or(e)).length,onChange:()=>{const e=Er().slice(50*(gt-1),50*gt).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Ht.length===e.length?Gt([]):Gt(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,v.jsx)(x.gU,{children:"Order"}),(0,v.jsx)(x.gU,{children:"Items"}),(0,v.jsx)(x.gU,{children:"Status"}),(0,v.jsx)(x.gU,{children:"Time"}),(0,v.jsx)(x.gU,{align:"right",children:"Amount"}),(0,v.jsx)(x.gU,{style:{width:"20%",minWidth:"180px"},children:"Action"})]})}),(0,v.jsx)("tbody",{children:Er().slice(50*(gt-1),50*gt).map(e=>(0,v.jsxs)(x.J2,{style:Vt&&Ht.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[Vt&&(0,v.jsx)(x.Bv,{align:"center",style:{width:"50px"},children:Or(e)?(0,v.jsx)("input",{type:"checkbox",checked:Ht.includes(e.id),onChange:()=>{return t=e.id,void Gt(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,v.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,v.jsxs)(x.Bv,{"data-label":"ORDER",children:[(0,v.jsxs)(L,{onClick:()=>$r(e),children:[e.order_number,"takeaway"===e.order_type&&(0,v.jsx)(V,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,v.jsx)(V,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,v.jsx)(V,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"}),"mobile"===e.source&&(0,v.jsx)(V,{style:{background:"#DBEAFE",color:"#2563EB"},children:"MOBILE"}),"mobile"===e.source&&(e.customer_id?(0,v.jsx)(V,{style:{background:"#D1FAE5",color:"#059669"},children:"MEMBER"}):(0,v.jsx)(V,{style:{background:"#F3F4F6",color:"#6B7280"},children:"GUEST"})),"kiosk"===e.source&&(0,v.jsx)(V,{style:{background:"#FEF3C7",color:"#D97706"},children:"KIOSK"}),"staffMeal"===e.payment_method&&(0,v.jsx)(V,{style:{background:"#FEE2E2",color:"#DC2626"},children:"STAFF MEAL"})]}),(0,v.jsxs)(U,{children:[e.customer_name||"Guest",e.customer_phone&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),(0,v.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number,e.guest_count?` (${e.guest_count}p)`:""]})]}),e.pager_number&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),(0,v.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?j(e.scheduled_pickup_time):"ASAP"]})]}),e.cashier_name&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),(0,v.jsxs)("span",{style:{color:"#8898AA",fontSize:"11px"},children:["Cashier: ",e.cashier_name]})]})]})]}),(0,v.jsx)(x.Bv,{"data-label":"ITEMS",children:(0,v.jsx)(H,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,v.jsxs)(G,{children:[(0,v.jsxs)("div",{children:[(0,v.jsxs)(J,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,v.jsx)(Y,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,v.jsx)(x.Bv,{"data-label":"STATUS",align:"center",children:(0,v.jsx)(K,{status:Sr(e),children:Br(Sr(e))})}),(0,v.jsx)(x.Bv,{"data-label":"TIME",align:"center",children:(0,v.jsxs)(X,{children:[Ur(e.createdAt||e.order_date),(0,v.jsx)("br",{}),!e.served_at&&(0,v.jsx)(C,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${kt}`),e.served_at&&(0,v.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Ur(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,v.jsx)(x.Bv,{"data-label":"AMOUNT",align:"right",children:(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)(x.DM,{highlight:!0,children:(0,u.vv)(Number(e.total_amount),Pe.currency)}),Number(e.points_used)>0&&(0,v.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,v.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,v.jsxs)(Z,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[(0,m.MA)(e.payment_method,e.card_type,Ne||void 0),"pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,v.jsx)(x.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,v.jsxs)(ne,{children:["completed"!==e.status&&"cancelled"!==e.status&&(0,v.jsxs)(v.Fragment,{children:[Ar(e)&&"payment_verification_pending"!==e.payment_status&&"rejected"!==e.payment_status&&(0,v.jsx)(Q,{onClick:t=>{t.stopPropagation(),Ir(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),!Ar(e)&&(0,v.jsx)(Q,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"served",served:"completed"===e.payment_status?"completed":null,completed:null,cancelled:null}[r]||null);var r;t&&Ir(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:"served"===e.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Pr(e.status,e.payment_status,e.order_type)})]}),"cancelled"!==e.status&&!Ar(e)&&(0,v.jsx)(Q,{variant:"secondary",onClick:()=>{if("pending"===e.status)Ir(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Ir(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,v.jsx)(Q,{onClick:t=>Vr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,v.jsx)(Q,{onClick:t=>{t.stopPropagation(),Lt(e)},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&"payment_verification_pending"!==e.payment_status&&(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),Ir(e.id,"completed")},title:"Mark as Completed",children:(0,v.jsx)(ie,{children:"\u2713"})}),(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),$r(e)},title:"View Details",children:(0,v.jsx)(ie,{children:"\u25c9"})}),(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Ve;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Ie(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void vr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0"),cashierName:r.cashier_name||null};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),Rr(e)},title:"Print Kitchen Ticket",children:(0,v.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,v.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Ie(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void vr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Rr(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&vr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,v.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,v.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,v.jsx)(re,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Mr(e.id):qr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,v.jsx)(ie,{children:"\u2715"})})]})})]},e.id))})]}):(0,v.jsx)(x.ys,{children:"No orders found in this category"})}),He&&Ve&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>{pt(!1),mt(!1),tr(!1),ar([]),Dr()},title:er?"Add Items to Order":ct?"Receipt Preview":ut?"Kitchen Order Ticket Preview":`Order ${Ve.order_number}`,footer:er?void 0:ct?(0,v.jsx)(Q,{onClick:()=>pt(!1),children:"Back to Order Details"}):ut?(0,v.jsx)(Q,{onClick:()=>mt(!1),children:"Back to Order Details"}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Q,{variant:"secondary",onClick:()=>Mr(Ve.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==Ve.status&&"completed"!==Ve.status&&(0,v.jsx)(Q,{onClick:()=>qr(Ve.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Ar(Ve)&&"pending"!==Ve.status&&"payment_verification_pending"!==Ve.payment_status&&"rejected"!==Ve.payment_status&&(0,v.jsx)(Q,{onClick:()=>{Ir(Ve.id,"pending"),Dr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===Ve.payment_status&&(0,v.jsx)(Q,{onClick:()=>Vr(Ve),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Ve.payment_status&&(0,v.jsx)(Q,{onClick:()=>Lt(Ve),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===Ve.payment_status&&!["served","completed","cancelled"].includes(Ve.status)&&(0,v.jsx)(Q,{onClick:()=>tr(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,v.jsx)(Q,{onClick:()=>pt(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,v.jsx)(Q,{onClick:()=>mt(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,v.jsx)(Q,{onClick:async()=>{if(Ve){const e=Ie(),t={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,date:new Date(Ve.order_date||Ve.createdAt),items:Ve.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Ve.subtotal||"0"),discount:parseFloat(Ve.discount||"0"),coupon:Ve.coupon_code?{code:Ve.coupon_code,discount:parseFloat(Ve.coupon_discount||"0")}:null,serviceCharge:parseFloat(Ve.service_charge||"0"),serviceChargeRate:parseFloat(Ve.service_charge_rate||"10"),tax:parseFloat(Ve.tax||"0"),taxRate:parseFloat(Ve.tax_rate||"6"),total:parseFloat(Ve.final_price||Ve.total_amount||"0"),paymentMethod:Ve.payment_method||"cash",amountReceived:parseFloat(Ve.amount_received||"0"),change:parseFloat(Ve.change||"0"),cashierName:Ve.cashier_name||null};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]}),children:er?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,v.jsx)("div",{style:{marginBottom:"20px"},children:(0,v.jsx)("input",{type:"text",placeholder:"Search menu items...",value:cr,onChange:e=>pr(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),cr.length>0&&(0,v.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[rr.filter(e=>{if(!e||!e.name)return!1;const t=cr.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,v.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{zr(e,1,[]),pr("")},children:[(0,v.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,v.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,v.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,u.vv)(parseFloat(e.price)||0,Pe.currency)}),t&&(0,v.jsx)("button",{onClick:t=>{t.stopPropagation(),hr(e),mr(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===rr.filter(e=>e.name.toLowerCase().includes(cr.toLowerCase())||e.code&&e.code.toLowerCase().includes(cr.toLowerCase())).length&&(0,v.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,v.jsxs)("div",{children:[(0,v.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",sr.reduce((e,t)=>e+t.quantity,0),")"]}),0===sr.length?(0,v.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,v.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:sr.map(e=>(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,v.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,v.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,u.vv)(e.unitPrice||parseFloat(e.price),Pe.currency)," each"]})]}),(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,v.jsx)("button",{onClick:()=>{return t=e.cartId,void ar(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,v.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,v.jsx)("button",{onClick:()=>{return t=e.cartId,void ar(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,v.jsx)("div",{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px",display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:"8px"},children:(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,v.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,u.vv)(sr.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Pe.currency)]}),(0,v.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,v.jsx)(Q,{onClick:()=>{tr(!1),ar([]),pr(""),Dr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,v.jsx)(Q,{onClick:async()=>{if(null!==Ve&&void 0!==Ve&&Ve.id&&0!==sr.length)try{lr(!0);const e=sr.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Ve||void 0===Ve?void 0:Ve.id}/merge-items`,w({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}vr("Items added successfully","success"),tr(!1),ar([]),pr(""),Dr(),_r()}catch(e){console.error("Add items error:",e),vr(e.message||"Failed to add items","error")}finally{lr(!1)}},disabled:0===sr.length||dr,style:{background:0===sr.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===sr.length?"not-allowed":"pointer"},children:dr?"Adding...":"Add to Order"})]})]})})]}):ut?(0,v.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,v.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ie(),t=Array.isArray(Ve.order_items)?Ve.order_items:[],r={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],date:new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,orderSource:Ve.order_source||"pos",tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,customerName:Ve.customer_name||"Walk-in Customer",scheduledPickupTime:Ve.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Ve.notes||"",takeawayCharge:parseFloat(Ve.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,v.jsx)("div",{children:e||"\xa0"},t))})()})}):ct?(0,v.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,v.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ie(),t=Array.isArray(Ve.order_items)?Ve.order_items:[],r={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],pagerNumber:Ve.pager_number||null,date:new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,scheduledPickupTime:Ve.scheduled_pickup_time||null,currency:Pe.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Ve.subtotal||"0"),discount:parseFloat(Ve.discount||"0"),discountPolicy:Ve.discount_policy_name?{name:Ve.discount_policy_name,amount:parseFloat(Ve.discount_policy_amount||"0")}:void 0,coupon:Ve.coupon_code?{code:Ve.coupon_code,discount:parseFloat(Ve.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Ve.takeaway_charge||"0"),serviceCharge:parseFloat(Ve.service_charge||"0"),serviceChargeRate:parseFloat(Ve.service_charge_rate||"10"),tax:parseFloat(Ve.tax||"0"),taxRate:parseFloat(Ve.tax_rate||"6"),total:parseFloat(Ve.final_price||Ve.total_amount||"0"),paymentMethod:Ve.payment_method||"cash",amountReceived:parseFloat(Ve.amount_received||"0"),change:parseFloat(Ve.change||"0"),deliveryInfo:Ve.delivery_info||null,deliveryFee:parseFloat(Ve.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,v.jsxs)("div",{style:{padding:"24px"},children:[(0,v.jsxs)(oe,{children:[(0,v.jsx)(se,{children:"Customer Information"}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Name:"}),(0,v.jsx)(le,{children:Ve.customer_name||"Guest"})]}),Ve.customer_phone&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Phone:"}),(0,v.jsx)(le,{children:Ve.customer_phone})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Order Type:"}),(0,v.jsx)(le,{children:null===(e=Ve.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Source:"}),(0,v.jsx)(le,{children:"mobile"===Ve.source?"Mobile Order":"kiosk"===Ve.source?"Kiosk":"POS Terminal"})]}),"mobile"===Ve.source&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Customer Type:"}),(0,v.jsx)(le,{children:Ve.customer_id?"Member":"Guest"})]}),Ve.table_number&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Table Number:"}),(0,v.jsxs)(le,{children:[Ve.table_number,Ve.guest_count?` (${Ve.guest_count} guests)`:""]})]}),"pickup"===Ve.order_type&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Scheduled Pickup:"}),(0,v.jsx)(le,{style:{color:"#8B5CF6",fontWeight:600},children:Ve.scheduled_pickup_time?j(Ve.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Ve.order_type&&Ve.delivery_info&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(he,{}),(0,v.jsxs)(oe,{children:[(0,v.jsx)(se,{children:"Delivery Information"}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Address:"}),(0,v.jsx)(le,{children:Ve.delivery_info.address})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Phone:"}),(0,v.jsx)(le,{children:Ve.delivery_info.phone})]}),Ve.delivery_info.zoneName&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Zone:"}),(0,v.jsx)(le,{children:Ve.delivery_info.zoneName})]}),Ve.delivery_info.notes&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Notes:"}),(0,v.jsx)(le,{style:{fontStyle:"italic"},children:Ve.delivery_info.notes})]}),Ve.delivery_fee>0&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Delivery Fee:"}),(0,v.jsx)(le,{children:(0,u.vv)(parseFloat(Ve.delivery_fee||"0"),Pe.currency)})]})]})]}),(0,v.jsx)(he,{}),(0,v.jsxs)(oe,{children:[(0,v.jsx)(se,{children:"Order Information"}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Order Time:"}),(0,v.jsx)(le,{children:Ur(Ve.createdAt)})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Status:"}),(0,v.jsx)(le,{children:(0,v.jsx)(K,{status:Ve.status,children:Br(Ve.status)})})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Payment Method:"}),(0,v.jsx)(le,{children:(0,m.MA)(Ve.payment_method,Ve.card_type,Ne||void 0)})]}),(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Payment Status:"}),(0,v.jsx)(le,{children:"payment_verification_pending"===Ve.payment_status?(0,v.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"Verification Pending"}):"rejected"===Ve.payment_status?(0,v.jsx)("span",{style:{color:"#DC2626",fontWeight:500},children:"Payment Rejected"}):"pending"===Ve.payment_status?(0,v.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Ve.payment_status||"completed"===Ve.payment_status?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"Paid"}):Ve.payment_status||"N/A"})]}),Ve.cashier_name&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Cashier:"}),(0,v.jsx)(le,{children:Ve.cashier_name})]})]}),(()=>{const e=_(Ve.payment_proof),t=F(Ve.payment_proof),r=e||(t.length>0?t[t.length-1]:null);if(!r)return null;const n=!e&&!!r;return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(he,{}),(0,v.jsxs)(oe,{children:[(0,v.jsxs)(se,{children:["Customer Submitted Proof",n&&(0,v.jsx)("span",{style:{marginLeft:"8px",fontSize:"12px",fontWeight:600,color:"#DC2626"},children:"(Rejected)"})]}),r.reference&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Transaction Reference:"}),(0,v.jsx)(le,{style:{fontWeight:600,fontFamily:"monospace"},children:r.reference})]}),r.file_name&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Receipt File:"}),(0,v.jsx)(le,{children:r.file_name})]}),r.uploaded_at&&(0,v.jsxs)(ae,{children:[(0,v.jsx)(de,{children:"Submitted At:"}),(0,v.jsx)(le,{children:Ur(r.uploaded_at)})]}),r.image&&(0,v.jsxs)("div",{style:{marginTop:"16px"},children:[(0,v.jsx)(de,{style:{marginBottom:"14px"},children:"Receipt Image:"}),(0,v.jsx)("div",{style:{position:"relative"},children:(0,v.jsx)("img",{src:r.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(r.image,"_blank")})})]})]})]})})(),(0,v.jsx)(he,{}),(0,v.jsxs)(oe,{children:[(0,v.jsx)(se,{children:"Order Items"}),(()=>{const e=Ve.order_items&&Array.isArray(Ve.order_items)?Ve.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,v.jsxs)("div",{children:[i&&(0,v.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,v.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,v.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Ve)return;const n=Ie();if(0===t.length)return void vr("No items in this group","error");const i={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,orderSource:Ve.order_source||"pos",tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,customerName:Ve.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Ve.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&vr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,s;return(0,v.jsxs)(ce,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,v.jsxs)(pe,{style:{flex:1},children:[(0,v.jsx)(ue,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,v.jsx)(me,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,v.jsxs)(xe,{children:[(0,v.jsxs)("span",{children:[r.quantity," \xd7 ",(0,u.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),Pe.currency)]}),(0,v.jsx)("span",{children:(0,u.vv)(r.quantity*parseFloat(r.price||(null===(s=r.menuItem)||void 0===s?void 0:s.price)||0),Pe.currency)})]})]}),"completed"!==Ve.payment_status&&e.length>1&&(0,v.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(Ve&&(ot({index:t,name:n}),nt(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,v.jsx)(he,{}),(0,v.jsxs)(ge,{children:[(0,v.jsxs)(ye,{children:[(0,v.jsx)("span",{children:"Subtotal"}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.subtotal||Ve.total_amount),Pe.currency)})]}),Ve.takeaway_charge&&parseFloat(Ve.takeaway_charge)>0&&(0,v.jsxs)(ye,{children:[(0,v.jsx)("span",{children:"Takeaway Charge"}),(0,v.jsx)("span",{children:(0,u.vv)(parseFloat(Ve.takeaway_charge),Pe.currency)})]}),Ve.discount>0&&(0,v.jsxs)(ye,{children:[(0,v.jsx)("span",{children:"Discount"}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.discount),Pe.currency)})]}),Ve.discount_policy_amount>0&&(0,v.jsxs)(ye,{children:[(0,v.jsxs)("span",{children:["Discount (",Ve.discount_policy_name,")"]}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.discount_policy_amount),Pe.currency)})]}),Ve.coupon_discount>0&&(0,v.jsxs)(ye,{children:[(0,v.jsxs)("span",{children:["Coupon (",Ve.coupon_code,")"]}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.coupon_discount),Pe.currency)})]}),Number(Ve.point_discount)>0&&(0,v.jsxs)(ye,{children:[(0,v.jsxs)("span",{children:["Points (",Number(Ve.points_used||0).toLocaleString()," pts)"]}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.point_discount),Pe.currency)})]}),Ve.service_charge>0&&(0,v.jsxs)(ye,{children:[(0,v.jsxs)("span",{children:["Service Charge (",Ve.service_charge_rate||10,"%)"]}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.service_charge),Pe.currency)})]}),Ve.tax>0&&(0,v.jsxs)(ye,{children:[(0,v.jsxs)("span",{children:["Tax (",Ve.tax_rate||6,"%)"]}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.tax),Pe.currency)})]}),(0,v.jsxs)(ye,{isTotal:!0,children:[(0,v.jsx)("span",{children:"Total"}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.total_amount),Pe.currency)})]})]})]})}),Ve&&i.createPortal((0,v.jsxs)(je,{id:"bill-print-content",children:[(0,v.jsxs)(Fe,{children:[(0,v.jsx)(we,{children:(null===_t||void 0===_t?void 0:_t.companyName)||"Restaurant"}),_t&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:_t.address}),(0,v.jsxs)("div",{style:{fontSize:"11px"},children:[_t.city,", ",_t.state," ",_t.postcode]}),(0,v.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",_t.phone]}),_t.email&&(0,v.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",_t.email]}),_t.taxNo&&(0,v.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",_t.taxNo]})]}),(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,v.jsxs)(Ce,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Order No:"}),(0,v.jsx)("span",{children:Ve.order_number})]}),(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Date:"}),(0,v.jsx)("span",{children:Ur(Ve.order_date||Ve.createdAt)})]}),(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Customer:"}),(0,v.jsx)("span",{children:Ve.customer_name||"Guest"})]}),Ve.customer_phone&&(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Phone:"}),(0,v.jsx)("span",{children:Ve.customer_phone})]}),(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Order Type:"}),(0,v.jsx)("span",{children:"dine_in"===Ve.order_type?"DINE IN":null===(t=Ve.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Ve.table_number&&(0,v.jsxs)(ke,{children:[(0,v.jsx)("strong",{children:"Table:"}),(0,v.jsxs)("span",{children:[Ve.table_number,Ve.guest_count?` (${Ve.guest_count}p)`:""]})]}),("takeaway"===Ve.order_type||"pickup"===Ve.order_type)&&(0,v.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Ve.order_number.split("-")[1]||"000"]}),"pickup"===Ve.order_type&&(0,v.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Ve.scheduled_pickup_time?j(Ve.scheduled_pickup_time):"ASAP"]})]}),(0,v.jsx)(Ce,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,v.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,v.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,v.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,v.jsx)("tbody",{children:Ve.order_items&&Array.isArray(Ve.order_items)&&Ve.order_items.map((e,t)=>{var r,n,i;return(0,v.jsxs)("tr",{children:[(0,v.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,v.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,v.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,v.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,v.jsxs)(Ce,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,v.jsxs)(ke,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.subtotal||Ve.total_amount),Pe.currency)})]}),Ve.discount>0&&(0,v.jsxs)(ke,{children:[(0,v.jsx)("span",{children:"Discount:"}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.discount),Pe.currency)})]}),Ve.coupon_discount>0&&(0,v.jsxs)(ke,{children:[(0,v.jsxs)("span",{children:["Coupon (",Ve.coupon_code,"):"]}),(0,v.jsx)("span",{children:(0,u.vv)(-Number(Ve.coupon_discount),Pe.currency)})]}),parseFloat(Ve.takeaway_charge||0)>0&&(0,v.jsxs)(ke,{children:[(0,v.jsx)("span",{children:"Takeaway Charge:"}),(0,v.jsx)("span",{children:(0,u.vv)(parseFloat(Ve.takeaway_charge),Pe.currency)})]}),Ve.service_charge>0&&(0,v.jsxs)(ke,{children:[(0,v.jsxs)("span",{children:["Service Charge (",Ve.service_charge_rate||10,"%):"]}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.service_charge),Pe.currency)})]}),Ve.tax>0&&(0,v.jsxs)(ke,{children:[(0,v.jsxs)("span",{children:["Tax (",Ve.tax_rate||6,"%):"]}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.tax),Pe.currency)})]}),(0,v.jsxs)(ke,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,v.jsx)("span",{children:"TOTAL:"}),(0,v.jsx)("span",{children:(0,u.vv)(Number(Ve.total_amount),Pe.currency)})]})]}),(0,v.jsxs)(Ce,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,v.jsxs)(ke,{children:[(0,v.jsx)("span",{children:"Payment Method:"}),(0,v.jsx)("span",{children:(0,m.MA)(Ve.payment_method,Ve.card_type,Ne||void 0).toUpperCase()})]}),(0,v.jsxs)(ke,{children:[(0,v.jsx)("span",{children:"Order Status:"}),(0,v.jsx)("span",{children:Ve.status.toUpperCase()})]})]}),(0,v.jsxs)(Ae,{children:[(0,v.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,v.jsx)("div",{children:"Thank you for your purchase!"}),(0,v.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),Je&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:Wr,title:"Delete Order",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Q,{variant:"secondary",onClick:Wr,children:"Cancel"}),(0,v.jsx)(Q,{onClick:async()=>{if(Ke){const t=Ke;ze(e=>e.filter(e=>e.id!==t)),Ye(!1),Xe(null);try{const e=await fetch(`/api/orders/${t}`,w({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):_r()}catch(e){console.error("Failed to delete order:",e),_r()}}else Ye(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]}),children:[(0,v.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,v.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Ke&&(null===(r=Oe.find(e=>e.id===Ke))||void 0===r?void 0:r.order_number)]})]}),Ze&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:Lr,title:"Cancel Order",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Q,{variant:"secondary",onClick:Lr,children:"No, Keep Order"}),(0,v.jsx)(Q,{onClick:async()=>{if(et){ze(e=>e.map(e=>e.id===et?{...e,status:"cancelled"}:e)),Qe(!1),(null===Ve||void 0===Ve?void 0:Ve.id)===et&&Dr();try{const e=await fetch(`/api/orders/${et}/status`,w({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):_r()}catch(e){console.error("Failed to cancel order:",e),_r()}finally{tt(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]}),children:(0,v.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,v.jsx)(y.A,{isOpen:rt,title:"Remove Item",message:`Are you sure you want to remove "${(null===it||void 0===it?void 0:it.name)||""}" from this order?`,onConfirm:async()=>{if(Ve&&it)try{const e=await fetch(`/api/orders/${Ve.id}/items/${it.index}`,{...w({method:"DELETE"})}),t=await e.json();t.success?(vr(`Item removed: ${it.name}`,"success"),Ue(t.data),_r()):vr(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),vr("Failed to remove item","error")}finally{nt(!1),ot(null)}},onCancel:()=>{nt(!1),ot(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),(0,v.jsx)(x.aF,{isOpen:!!qt,onClose:()=>Lt(null),title:"payment_verification_pending"===(null===qt||void 0===qt?void 0:qt.payment_status)?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"payment_verification_pending"===(null===qt||void 0===qt?void 0:qt.payment_status)?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(ee,{variant:"secondary",onClick:async()=>{if(qt)try{await fetch(`/api/orders/${qt.id}`,w({method:"PATCH",body:JSON.stringify({payment_status:"rejected",status:"outstanding"})})),Lt(null),_r()}catch(e){console.error("Error rejecting payment:",e)}},children:"Reject"}),(0,v.jsx)(te,{variant:"primary",onClick:async()=>{if(qt){Bt(!1);try{await fetch(`/api/orders/${qt.id}`,w({method:"PATCH",body:JSON.stringify({payment_status:"completed"})})),"outstanding"===qt.status&&await fetch(`/api/orders/${qt.id}/status`,w({method:"PATCH",body:JSON.stringify({status:"pending"})})),Lt(null),_r()}catch(e){console.error("Error confirming payment:",e)}}},children:"Confirm Payment"})]}):void 0,children:qt&&(()=>{const e=_(qt.payment_proof),t=F(qt.payment_proof);return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,v.jsxs)("strong",{style:{color:"#0A2540"},children:["#",qt.order_number]})]}),(0,v.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,v.jsx)("strong",{style:{color:"#0A2540"},children:(0,u.vv)(qt.total_amount,Pe.currency)})]}),(0,v.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,v.jsx)("strong",{style:{color:"#0A2540"},children:qt.payment_method})]})]}),(0,v.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),e?(0,v.jsxs)(v.Fragment,{children:[e.reference&&(0,v.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,v.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,v.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:e.reference})]}),e.file_name&&(0,v.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",e.file_name]}),e.uploaded_at&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(e.uploaded_at).toLocaleString()]}),e.image&&(0,v.jsx)("img",{src:e.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]}):(0,v.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===qt.payment_status?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),t.length>0&&(0,v.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",t.length,")"]}),t.map((e,r)=>(0,v.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:r<t.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,v.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||r+1]}),e.rejected_at&&(0,v.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,v.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,v.jsx)("img",{src:e.image,alt:`Previous proof #${r+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},r))]})]})})()}),st&&dt&&(0,v.jsx)(l.A,{isOpen:st,onClose:()=>{at(!1),setTimeout(()=>{lt(null)},100)},total:Number(dt.total_amount),subtotal:Number(dt.subtotal||dt.total_amount||0),tax:Number(dt.tax||0),serviceCharge:Number(dt.service_charge||0),discountAmount:Number(dt.discount||0),couponDiscount:Number(dt.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i,o)=>{if(dt){Bt(!1);try{const t={payment_status:"completed",payment_method:e,card_type:"card"===e&&o||null};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(dt.total_amount)-i);if(!(await fetch(`/api/orders/${dt.id}`,w({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===dt.status?await fetch(`/api/orders/${dt.id}`,w({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===dt.status&&await fetch(`/api/orders/${dt.id}`,w({method:"PATCH",body:JSON.stringify({status:"completed"})})),at(!1),lt(null),await _r(),He&&(Ge(!1),Ue(null))}catch(s){console.error("\u274c Payment error:",s)}}},paymentMethods:wt,customerId:dt.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:Et}),xr&&(0,v.jsx)(c.A,{isOpen:ur,onClose:()=>{mr(!1),hr(null)},menuItem:{id:xr.id,name:xr.name,price:parseFloat(xr.price)||0,emoji:xr.emoji||"\ud83c\udf7d\ufe0f",image:xr.image,optionGroups:xr.optionGroups},onConfirm:(e,t,r)=>{zr(xr,e,r),mr(!1),hr(null),pr("")}}),Kt&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>Xt(!1),title:"Select Target Order",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Q,{onClick:()=>Xt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,v.jsx)(Q,{onClick:()=>Zt&&(async e=>{try{Yt(!0),Xt(!1);const t=Ht,r=await fetch("/api/orders/merge",w({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();vr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Ut(!1),Gt([]),Qt(null),_r()}catch(t){console.error("Merge error:",t),vr(t.message||"Failed to merge orders","error")}finally{Yt(!1)}})(Zt),disabled:!Zt||Jt,style:{background:Zt?"#635BFF":"#E5E7EB",color:Zt?"white":"#9CA3AF",cursor:Zt?"pointer":"not-allowed"},children:Jt?"Merging...":"Merge Orders"})]}),children:(0,v.jsxs)("div",{children:[(0,v.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,v.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Oe.filter(e=>Ht.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,v.jsxs)("div",{onClick:()=>Qt(e.id),style:{padding:"16px",border:"2px solid "+(Zt===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Zt===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}${e.guest_count?` (${e.guest_count}p)`:""}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,v.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,u.vv)(e.total_amount,Pe.currency)}),(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Zt===e.id&&(0,v.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]})})]}),(()=>{const e=Er().length,t=Math.ceil(e/50);return t>1&&(0,v.jsxs)(Se,{children:[(0,v.jsxs)(Be,{children:["Showing ",50*(gt-1)+1,"-",Math.min(50*gt,e)," of ",e," orders"]}),(0,v.jsxs)(Ee,{children:[(0,v.jsx)(Te,{onClick:()=>yt(1),disabled:1===gt,children:"First"}),(0,v.jsx)(Te,{onClick:()=>yt(e=>Math.max(1,e-1)),disabled:1===gt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||gt<=3?r+1:gt>=t-2?t-4+r:gt-2+r,(0,v.jsx)(Te,{active:gt===n,onClick:()=>yt(n),children:n},n)}),(0,v.jsx)(Te,{onClick:()=>yt(e=>Math.min(t,e+1)),disabled:gt===t,children:"Next"}),(0,v.jsx)(Te,{onClick:()=>yt(t),disabled:gt===t,children:"Last"})]})]})})()]}),i.createPortal((0,v.jsxs)(be,{isVisible:gr.isVisible,type:gr.type,children:[(0,v.jsx)(fe,{children:gr.message}),(0,v.jsx)(ve,{onClick:()=>yr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body),(0,v.jsx)(f.A,{isOpen:Mt,onClose:()=>Wt(!1)})]})}},7617:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),i=r(9610),o=r(4414);const s=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,a=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,u=e=>{let{isOpen:t,title:r,message:n,onConfirm:u,onCancel:m,confirmText:x="Confirm",cancelText:h="Cancel",type:g="warning"}=e;return t?(0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&m()},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(a,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:m,children:h}),(0,o.jsx)(p,{variant:"primary",type:g,onClick:u,children:x})]})]})}):null}}}]);