"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Pe});var n=r(9950),i=r(7119),o=r(4752),a=r(3422),s=r(3310),d=r(1367),l=r(2966),c=r(9018),p=r(6038),u=r(5863),x=r(8406),m=r(4414);const h=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},g=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},y=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,x.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,m.jsx)("span",{style:{fontSize:"12px"},children:r})},j=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,f=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,b=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,v=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,_=o.Ay.button`
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
`,w=o.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,F=o.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,k=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #E6EBF1;
      border-radius: 4px;
    }
  }
`,A=o.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }
`,C=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,S=o.Ay.div`
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
`,B=o.Ay.button`
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
`,T=o.Ay.span`
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
`,E=o.Ay.div`
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
`,P=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,N=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`,I=o.Ay.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,O=o.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }
`,D=o.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,$=o.Ay.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,z=o.Ay.td`
  padding: 20px 24px;
  font-size: 14px;
  color: #0A2540;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    border-bottom: none;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,R=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,M=o.Ay.span`
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
`,W=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,H=o.Ay.div`
  line-height: 1.6;
`,q=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,L=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,U=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,V=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"awaiting_payment":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"awaiting_payment":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,Y=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,J=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,K=o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`,G=o.Ay.button`
  padding: 6px 12px;
  background: ${e=>"secondary"===e.variant?"#F6F9FC":"#635BFF"};
  color: ${e=>"secondary"===e.variant?"#6B7C93":"white"};
  border: ${e=>"secondary"===e.variant?"1px solid #E6EBF1":"none"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

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
`,Q=o.Ay.button`
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
`,X=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,Z=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,ee=o.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,te=o.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,re=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,ne=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ie=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,oe=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`,ae=o.Ay.div`
  padding: 24px;
`,se=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,de=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,le=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,ce=o.Ay.span`
  color: #6B7C93;
`,pe=o.Ay.span`
  font-weight: 500;
`,ue=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,xe=o.Ay.div`
  flex: 1;
`,me=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,he=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,ge=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,ye=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,je=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,fe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,be=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,ve=o.Ay.div`
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
`,we=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,Fe=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,ke=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,Ae=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Ce=o.Ay.div`
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
`,Te=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Ee=o.Ay.button`
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
`,Pe=()=>{var e,t,r;const{user:o}=(0,d.As)(),{getStoreInfo:Pe,operationSettings:Ne}=(0,c.Pj)(),[Ie,Oe]=(0,n.useState)([]),[De,$e]=(0,n.useState)([]),[,ze]=(0,n.useState)(null),[Re,Me]=(0,n.useState)("all"),[We,He]=(0,n.useState)(null),[qe,Le]=(0,n.useState)(!1),[Ue,Ve]=(0,n.useState)(!1),[Ye,Je]=(0,n.useState)(null),[Ke,Ge]=(0,n.useState)(!1),[Qe,Xe]=(0,n.useState)(null),[Ze,et]=(0,n.useState)(!1),[tt,rt]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[nt,it]=(0,n.useState)(!1),[ot,at]=(0,n.useState)(!1),[st,dt]=(0,n.useState)(!0),[lt,ct]=(0,n.useState)(1),[pt,ut]=(0,n.useState)(1),[xt,mt]=(0,n.useState)(0),[ht,gt]=(0,n.useState)(null),[yt,jt]=(0,n.useState)(null),[ft,bt]=(0,n.useState)(0),[vt,_t]=(0,n.useState)(!0),[wt,Ft]=(0,n.useState)("today"),[kt,At]=(0,n.useState)(()=>{const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:t,end:t}}),[Ct,St]=(0,n.useState)(!1),[Bt,Tt]=(0,n.useState)(""),Et=(0,n.useCallback)(()=>{if(vt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[vt]);(0,n.useEffect)(()=>{bt(e=>e+1);const e=setInterval(()=>{bt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const Pt=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=${e}&limit=50&includeCompleted=true`,g()),r=await t.json();r.success&&r.data&&(Oe(r.data),r.pagination&&(ct(r.pagination.currentPage),ut(r.pagination.totalPages),mt(r.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{dt(!1)}},[null===o||void 0===o?void 0:o.restaurantId]),Nt=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=1&limit=10000&includeCompleted=true`,g()),t=await e.json();t.success&&t.data&&$e(t.data)}catch(e){console.error("Failed to fetch all orders:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),It=(0,n.useRef)(Et);(0,n.useEffect)(()=>{It.current=Et},[Et]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,a.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Oe(t=>[e,...t]),$e(t=>[e,...t]),It.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Oe(t=>t.map(t=>t.id===e.id?e:t)),$e(t=>t.map(t=>t.id===e.id?e:t))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Oe(e=>e.filter(e=>e.id!==t)),$e(e=>e.filter(e=>e.id!==t))}),ze(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{Pt(lt)},[Pt,lt]),(0,n.useEffect)(()=>{Nt()},[Nt]),(0,n.useEffect)(()=>{Ot("today")},[]),(0,n.useEffect)(()=>{ct(1)},[Re,kt.start,kt.end,wt]);const Ot=e=>{Ft(e),St(!1);const t=new Date;let r=new Date;const n=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":r=new Date(t),r.setHours(0,0,0,0);break;case"week":r=new Date(t.getTime()-6048e5);break;case"month":r=new Date(t.getTime()-2592e6);break;case"year":r=new Date(t.getTime()-31536e6);break;case"all":if(De.length>0){r=De.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}At({start:n(r),end:n(t)})},Dt=()=>{if(!kt.start||!kt.end)return De;const e=new Date(kt.start);e.setHours(0,0,0,0);const t=new Date(kt.end);t.setHours(23,59,59,999);let r=De.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const i=new Date(n);if(isNaN(i.getTime()))return!1;return i>=e&&i<=t});if(Bt.trim()){const e=Bt.toLowerCase().trim();r=r.filter(t=>{var r,n,i,o;if(null!==(r=t.order_number)&&void 0!==r&&r.toLowerCase().includes(e))return!0;if(null!==(n=t.customer_name)&&void 0!==n&&n.toLowerCase().includes(e))return!0;if(null!==(i=t.table_number)&&void 0!==i&&i.toString().includes(e))return!0;if(t.order_items&&Array.isArray(t.order_items)){if(t.order_items.some(t=>{var r,n;return(null===(r=t.menu_item_name)||void 0===r?void 0:r.toLowerCase().includes(e))||(null===(n=t.name)||void 0===n?void 0:n.toLowerCase().includes(e))}))return!0}return!(null===(o=t.payment_method)||void 0===o||!o.toLowerCase().includes(e))})}return r},$t=(e,t)=>{At(r=>({...r,[e]:t})),St(!0),Ft("today")};(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,g()),t=await e.json();if(t.success||e.ok){const e=t.data||t;gt({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&jt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})()},[null===o||void 0===o?void 0:o.restaurantId]);const zt=e=>"outstanding"===e.status||"awaiting_payment"===e.status,Rt=e=>zt(e)?"awaiting_payment":e.status,Mt=e=>"awaiting_payment"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Wt=()=>{const e=Dt();let t;return t="all"===Re?e:"outstanding"===Re?e.filter(e=>zt(e)):e.filter(e=>e.status===Re),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Ht=e=>{const t=Dt();return"all"===e?t.length:"outstanding"===e?t.filter(e=>zt(e)).length:t.filter(t=>t.status===e).length},qt=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];_t(!1);const n=(new Date).toISOString();Oe(i=>i.map(i=>i.id===e?{...i,status:t,...r&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!i.served_at&&{served_at:n}}:i));try{const i={status:t};r&&(i.kitchen_ready=!0);const o=Ie.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(i.served_at=n);const a=await fetch(`/api/orders/${e}/status`,g({method:"PATCH",body:JSON.stringify(i)}));(await a.json()).success||Pt()}catch(i){console.error("Failed to update status:",i),Pt()}},Lt=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Ut=e=>{He(e),Le(!0)},Vt=()=>{Le(!1),He(null),it(!1),at(!1)},Yt=e=>{Je(e),Ve(!0)},Jt=()=>{Je(null),Ve(!1)},Kt=e=>{Xe(e),Ge(!0)},Gt=()=>{Xe(null),Ge(!1)},Qt=(e,t)=>{t&&t.stopPropagation(),rt(e),et(!0)},Xt=e=>(0,x.r6)(e,null===ht||void 0===ht?void 0:ht.operation_settings);return(0,m.jsxs)(s.A,{children:[(0,m.jsx)(_e,{}),(0,m.jsxs)(j,{className:"no-print",children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(b,{children:"Live Orders"}),(0,m.jsx)(v,{children:(0,m.jsx)(_,{enabled:vt,onClick:()=>_t(!vt),title:vt?"Stop notification sound":"Play notification sound",children:vt?(0,m.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,m.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,m.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,m.jsx)("svg",{viewBox:"0 0 24 24",children:(0,m.jsx)("path",{d:"M8 5v14l11-7z"})})})})]}),(0,m.jsxs)(w,{children:[(0,m.jsx)(F,{children:(0,m.jsxs)(k,{children:[(0,m.jsx)(A,{active:"today"===wt&&!Ct,onClick:()=>Ot("today"),children:"Today"}),(0,m.jsx)(A,{active:"week"===wt&&!Ct,onClick:()=>Ot("week"),children:"Week"}),(0,m.jsx)(A,{active:"month"===wt&&!Ct,onClick:()=>Ot("month"),children:"Month"}),(0,m.jsx)(A,{active:"year"===wt&&!Ct,onClick:()=>Ot("year"),children:"Year"}),(0,m.jsx)(A,{active:"all"===wt&&!Ct,onClick:()=>Ot("all"),children:"All"}),(0,m.jsx)(C,{type:"date",value:kt.start,onChange:e=>$t("start",e.target.value)}),(0,m.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,m.jsx)(C,{type:"date",value:kt.end,onChange:e=>$t("end",e.target.value)}),(0,m.jsxs)("div",{style:{position:"relative",width:"250px",marginLeft:"16px"},children:[(0,m.jsx)("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none",zIndex:1},children:"\ud83d\udd0d"}),(0,m.jsx)("input",{type:"text",placeholder:"Search orders...",value:Bt,onChange:e=>Tt(e.target.value),style:{width:"100%",padding:"10px 40px 10px 40px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"all 0.2s",boxSizing:"border-box"}}),Bt&&(0,m.jsx)("button",{onClick:()=>Tt(""),title:"Clear search",style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"#E5E7EB",border:"none",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"18px",color:"#6B7280",zIndex:2},children:"\xd7"})]}),(0,m.jsx)("button",{onClick:()=>{const e=Dt();if(0===e.length)return void alert("No orders to download");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,p.vv)(i.subtotal||e.total_amount||0,Ne.currency),(0,p.vv)(i.service_charge||0,Ne.currency),(0,p.vv)(i.tax||0,Ne.currency),(0,p.vv)(i.discount||0,Ne.currency),(0,p.vv)(e.total_amount||0,Ne.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${kt.start}_to_${kt.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",style:{padding:"10px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:"8px"},children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"18px",height:"18px"},children:(0,m.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}),(0,m.jsxs)(S,{children:[(0,m.jsxs)(B,{active:"all"===Re,onClick:()=>Me("all"),children:["All Orders",(0,m.jsx)(T,{children:Ht("all")})]}),(0,m.jsxs)(B,{active:"outstanding"===Re,onClick:()=>Me("outstanding"),children:["Outstanding",(0,m.jsx)(T,{children:Ht("outstanding")})]}),(0,m.jsxs)(B,{active:"pending"===Re,onClick:()=>Me("pending"),children:["Pending",(0,m.jsx)(T,{children:Ht("pending")})]}),(0,m.jsxs)(B,{active:"preparing"===Re,onClick:()=>Me("preparing"),children:["Preparing",(0,m.jsx)(T,{children:Ht("preparing")})]}),(0,m.jsxs)(B,{active:"ready"===Re,onClick:()=>Me("ready"),children:["Ready",(0,m.jsx)(T,{children:Ht("ready")})]}),(0,m.jsxs)(B,{active:"served"===Re,onClick:()=>Me("served"),children:["Served",(0,m.jsx)(T,{children:Ht("served")})]}),(0,m.jsxs)(B,{active:"completed"===Re,onClick:()=>Me("completed"),children:["Completed",(0,m.jsx)(T,{children:Ht("completed")})]}),(0,m.jsxs)(B,{active:"cancelled"===Re,onClick:()=>Me("cancelled"),children:["Cancelled",(0,m.jsx)(T,{children:Ht("cancelled")})]})]}),(0,m.jsx)(E,{children:(()=>{const e=(()=>{const e=Wt().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let a=0,s=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});a=e.reduce((e,t)=>e+t,0)/e.length,s=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:a,maxServeTime:s,minServeTime:d}})();return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(P,{children:["Total Sales ",(0,m.jsxs)("strong",{children:["RM",e.totalSales.toFixed(2)]})]}),(0,m.jsxs)(P,{children:["Avg ",(0,m.jsxs)("strong",{children:["RM",e.avgOrderAmount.toFixed(2)]})]}),(0,m.jsxs)(P,{children:["Max ",(0,m.jsxs)("strong",{children:["RM",e.maxOrderAmount.toFixed(2)]})]}),(0,m.jsxs)(P,{children:["\u2265RM20 ",(0,m.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,m.jsxs)(P,{children:["Avg Serve ",(0,m.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,m.jsxs)(P,{children:["Max Serve ",(0,m.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,m.jsxs)(P,{children:["Min Serve ",(0,m.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,m.jsx)(N,{children:Wt().length>0?(0,m.jsxs)(I,{children:[(0,m.jsx)(O,{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)($,{children:"Order"}),(0,m.jsx)($,{children:"Items"}),(0,m.jsx)($,{children:"Status"}),(0,m.jsx)($,{children:"Time"}),(0,m.jsx)($,{children:"Amount"}),(0,m.jsx)($,{children:"Action"})]})}),(0,m.jsx)("tbody",{children:Wt().slice(50*(lt-1),50*lt).map(e=>(0,m.jsxs)(D,{children:[(0,m.jsxs)(z,{"data-label":"ORDER",children:[(0,m.jsxs)(R,{onClick:()=>Ut(e),children:[e.order_number,"takeaway"===e.order_type&&(0,m.jsx)(M,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,m.jsx)(M,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,m.jsx)(M,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,m.jsxs)(W,{children:[e.customer_name||"Guest",(0,m.jsx)("br",{}),e.customer_phone||("mobile"===e.source?"Mobile Order":"POS Terminal"),e.table_number&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("br",{}),(0,m.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("br",{}),(0,m.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?h(e.scheduled_pickup_time):"ASAP"]})]})]})]}),(0,m.jsx)(z,{"data-label":"ITEMS",children:(0,m.jsx)(H,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,m.jsxs)(q,{children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)(L,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,m.jsx)(U,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,m.jsx)(z,{"data-label":"STATUS",children:(0,m.jsx)(V,{status:Rt(e),children:Mt(Rt(e))})}),(0,m.jsx)(z,{"data-label":"TIME",children:(0,m.jsxs)(Y,{children:[Xt(e.createdAt||e.order_date),(0,m.jsx)("br",{}),!e.served_at&&(0,m.jsx)(y,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${ft}`),e.served_at&&(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Xt(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,m.jsxs)(z,{"data-label":"AMOUNT",children:[(0,m.jsx)(J,{children:(0,p.vv)(Number(e.total_amount),Ne.currency)}),(0,m.jsxs)(K,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]}),(0,m.jsx)(z,{"data-label":"ACTION",children:(0,m.jsxs)(X,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,m.jsx)(m.Fragment,{children:zt(e)?(0,m.jsx)(G,{onClick:t=>{t.stopPropagation(),qt(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,m.jsx)(G,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",awaiting_payment:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&qt(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Lt(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&"awaiting_payment"!==e.status&&!zt(e)&&(0,m.jsx)(G,{variant:"secondary",onClick:()=>{if("pending"===e.status)qt(e.id,"awaiting_payment");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&qt(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,m.jsx)(G,{onClick:t=>Qt(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,m.jsx)(G,{onClick:t=>(async(e,t)=>{t.stopPropagation(),_t(!1);try{const t=Ie.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");!t||"awaiting_payment"!==t.status&&"outstanding"!==t.status||await fetch(`/api/orders/${e}/status`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})),Pt()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,m.jsx)(Q,{onClick:t=>{t.stopPropagation(),qt(e.id,"completed")},title:"Mark as Completed",children:(0,m.jsx)(Z,{children:"\u2713"})}),(0,m.jsx)(Q,{onClick:t=>{t.stopPropagation(),Ut(e)},title:"View Details",children:(0,m.jsx)(Z,{children:"\u25c9"})}),(0,m.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||We;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Pe(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void alert("Cannot print: Order has no items. Check console for details.");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,u.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,m.jsx)(Z,{children:"\ud83d\udda8"})}),(0,m.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||We;if(r){const e=Pe(),n=Array.isArray(r.order_items)?r.order_items:[];if(0===n.length)return console.error("\u274c No items found in order!"),void alert("Cannot print: Order has no items.");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),orderType:r.order_type,orderSource:r.order_source||"pos",tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,customerName:r.customer_name||"Walk-in Customer",items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:r.notes||"",takeawayCharge:parseFloat(r.takeaway_charge||"0")};await(0,u.Si)(i,e)&&console.log("Kitchen ticket printed successfully via RawBT")}})(e)},title:"Print Kitchen Ticket",children:(0,m.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,m.jsx)(Q,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Yt(e.id):Kt(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,m.jsx)(Z,{children:"\u2715"})})]})})]},e.id))})]}):(0,m.jsx)(ee,{children:"No orders found in this category"})}),(0,m.jsx)(te,{isOpen:qe,onClick:Vt,"data-modal":"order-detail",children:(0,m.jsx)(re,{onClick:e=>e.stopPropagation(),children:We&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(ne,{children:[(0,m.jsx)(ie,{children:nt?"Receipt Preview":ot?"Kitchen Order Ticket Preview":`Order ${We.order_number}`}),(0,m.jsx)(oe,{onClick:Vt,children:"\xd7"})]}),ot?(0,m.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,m.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(We.order_items)?We.order_items:[],r={orderNumber:We.order_number,pickupNumber:We.order_number.split("-")[1],date:new Date(We.order_date||We.createdAt),orderType:We.order_type,orderSource:We.order_source||"pos",tableNumber:We.table_number||null,pagerNumber:We.pager_number||null,customerName:We.customer_name||"Walk-in Customer",scheduledPickupTime:We.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:We.notes||"",takeawayCharge:parseFloat(We.takeaway_charge||"0")};return(0,u.KB)(r,e).split("\n").map((e,t)=>(0,m.jsx)("div",{children:e||"\xa0"},t))})()})}):nt?(0,m.jsx)(ae,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,m.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(We.order_items)?We.order_items:[],r={orderNumber:We.order_number,pickupNumber:We.order_number.split("-")[1],pagerNumber:We.pager_number||null,date:new Date(We.order_date||We.createdAt),orderType:We.order_type,scheduledPickupTime:We.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(We.subtotal||"0"),discount:parseFloat(We.discount||"0"),discountPolicy:We.discount_policy_name?{name:We.discount_policy_name,amount:parseFloat(We.discount_policy_amount||"0")}:void 0,coupon:We.coupon_code?{code:We.coupon_code,discount:parseFloat(We.coupon_discount||"0")}:null,takeawayCharge:parseFloat(We.takeaway_charge||"0"),serviceCharge:parseFloat(We.service_charge||"0"),serviceChargeRate:parseFloat(We.service_charge_rate||"10"),tax:parseFloat(We.tax||"0"),taxRate:parseFloat(We.tax_rate||"6"),total:parseFloat(We.final_price||We.total_amount||"0"),paymentMethod:We.payment_method||"cash",amountReceived:parseFloat(We.amount_received||"0"),change:parseFloat(We.change||"0"),deliveryInfo:We.delivery_info||null,deliveryFee:parseFloat(We.delivery_fee||"0")};return(0,u.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,m.jsxs)(ae,{children:[(0,m.jsxs)(se,{children:[(0,m.jsx)(de,{children:"Customer Information"}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Name:"}),(0,m.jsx)(pe,{children:We.customer_name||"Guest"})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Phone:"}),(0,m.jsx)(pe,{children:We.customer_phone||"N/A"})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Order Type:"}),(0,m.jsx)(pe,{children:null===(e=We.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Source:"}),(0,m.jsx)(pe,{children:"mobile"===We.source?"Mobile Order":"kiosk"===We.source?"Kiosk":"POS Terminal"})]}),We.table_number&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Table Number:"}),(0,m.jsx)(pe,{children:We.table_number})]}),"pickup"===We.order_type&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Scheduled Pickup:"}),(0,m.jsx)(pe,{style:{color:"#8B5CF6",fontWeight:600},children:We.scheduled_pickup_time?h(We.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===We.order_type&&We.delivery_info&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(ye,{}),(0,m.jsxs)(se,{children:[(0,m.jsx)(de,{children:"Delivery Information"}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Address:"}),(0,m.jsx)(pe,{children:We.delivery_info.address})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Phone:"}),(0,m.jsx)(pe,{children:We.delivery_info.phone})]}),We.delivery_info.zoneName&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Zone:"}),(0,m.jsx)(pe,{children:We.delivery_info.zoneName})]}),We.delivery_info.notes&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Notes:"}),(0,m.jsx)(pe,{style:{fontStyle:"italic"},children:We.delivery_info.notes})]}),We.delivery_fee>0&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Delivery Fee:"}),(0,m.jsx)(pe,{children:(0,p.vv)(parseFloat(We.delivery_fee||"0"),Ne.currency)})]})]})]}),(0,m.jsx)(ye,{}),(0,m.jsxs)(se,{children:[(0,m.jsx)(de,{children:"Order Information"}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Order Time:"}),(0,m.jsx)(pe,{children:Xt(We.createdAt)})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Status:"}),(0,m.jsx)(pe,{children:(0,m.jsx)(V,{status:We.status,children:Mt(We.status)})})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Payment Method:"}),(0,m.jsx)(pe,{children:We.payment_method||"N/A"})]}),(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Payment Status:"}),(0,m.jsx)(pe,{children:"payment_verification_pending"===We.payment_status?(0,m.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===We.payment_status?(0,m.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===We.payment_status?(0,m.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):We.payment_status||"N/A"})]})]}),We.payment_proof&&"payment_verification_pending"===We.payment_status&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(ye,{}),(0,m.jsxs)(se,{children:[(0,m.jsx)(de,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),We.payment_proof.reference&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Transaction Reference:"}),(0,m.jsx)(pe,{style:{fontWeight:600,fontFamily:"monospace"},children:We.payment_proof.reference})]}),We.payment_proof.file_name&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Receipt File:"}),(0,m.jsx)(pe,{children:We.payment_proof.file_name})]}),We.payment_proof.uploaded_at&&(0,m.jsxs)(le,{children:[(0,m.jsx)(ce,{children:"Submitted At:"}),(0,m.jsx)(pe,{children:Xt(We.payment_proof.uploaded_at)})]}),We.payment_proof.image&&(0,m.jsxs)("div",{style:{marginTop:"16px"},children:[(0,m.jsx)(ce,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,m.jsx)("div",{style:{position:"relative"},children:(0,m.jsx)("img",{src:We.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(We.payment_proof.image,"_blank")})})]})]})]}),(0,m.jsx)(ye,{}),(0,m.jsxs)(se,{children:[(0,m.jsx)(de,{children:"Order Items"}),We.order_items&&Array.isArray(We.order_items)&&We.order_items.map((e,t)=>{var r,n,i;return(0,m.jsx)(ue,{children:(0,m.jsxs)(xe,{children:[(0,m.jsx)(me,{children:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"}),e.options&&e.options.length>0&&(0,m.jsx)(he,{children:Array.isArray(e.options)?e.options.join(", "):e.options}),(0,m.jsxs)(ge,{children:[(0,m.jsxs)("span",{children:[e.quantity," \xd7 ",(0,p.vv)(parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0),Ne.currency)]}),(0,m.jsx)("span",{children:(0,p.vv)(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0),Ne.currency)})]})]})},t)})]}),(0,m.jsx)(ye,{}),(0,m.jsxs)(je,{children:[(0,m.jsxs)(fe,{children:[(0,m.jsx)("span",{children:"Subtotal"}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.subtotal||We.total_amount),Ne.currency)})]}),We.takeaway_charge&&parseFloat(We.takeaway_charge)>0&&(0,m.jsxs)(fe,{children:[(0,m.jsx)("span",{children:"Takeaway Charge"}),(0,m.jsx)("span",{children:(0,p.vv)(parseFloat(We.takeaway_charge),Ne.currency)})]}),We.discount>0&&(0,m.jsxs)(fe,{children:[(0,m.jsx)("span",{children:"Discount"}),(0,m.jsx)("span",{children:(0,p.vv)(-Number(We.discount),Ne.currency)})]}),We.discount_policy_amount>0&&(0,m.jsxs)(fe,{children:[(0,m.jsxs)("span",{children:["Discount (",We.discount_policy_name,")"]}),(0,m.jsx)("span",{children:(0,p.vv)(-Number(We.discount_policy_amount),Ne.currency)})]}),We.coupon_discount>0&&(0,m.jsxs)(fe,{children:[(0,m.jsxs)("span",{children:["Coupon (",We.coupon_code,")"]}),(0,m.jsx)("span",{children:(0,p.vv)(-Number(We.coupon_discount),Ne.currency)})]}),We.service_charge>0&&(0,m.jsxs)(fe,{children:[(0,m.jsxs)("span",{children:["Service Charge (",We.service_charge_rate||10,"%)"]}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.service_charge),Ne.currency)})]}),We.tax>0&&(0,m.jsxs)(fe,{children:[(0,m.jsxs)("span",{children:["Tax (",We.tax_rate||6,"%)"]}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.tax),Ne.currency)})]}),(0,m.jsxs)(fe,{isTotal:!0,children:[(0,m.jsx)("span",{children:"Total"}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.total_amount),Ne.currency)})]})]})]}),(0,m.jsx)(be,{children:nt?(0,m.jsx)(G,{onClick:()=>it(!1),children:"Back to Order Details"}):ot?(0,m.jsx)(G,{onClick:()=>at(!1),children:"Back to Order Details"}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(G,{variant:"secondary",onClick:()=>Yt(We.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==We.status&&"completed"!==We.status&&(0,m.jsx)(G,{onClick:()=>Kt(We.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),zt(We)&&"pending"!==We.status&&(0,m.jsx)(G,{onClick:()=>{qt(We.id,"pending"),Vt()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===We.payment_status&&(0,m.jsx)(G,{onClick:()=>Qt(We),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===We.payment_status&&(0,m.jsx)(G,{onClick:async()=>{if(We){_t(!1);try{if(!(await fetch(`/api/orders/${We.id}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"!==We.status&&"outstanding"!==We.status||await fetch(`/api/orders/${We.id}/status`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})),Vt(),Pt()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),(0,m.jsx)(G,{onClick:()=>it(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,m.jsx)(G,{onClick:()=>at(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,m.jsx)(G,{onClick:async()=>{if(We){const e=Pe(),t={orderNumber:We.order_number,pickupNumber:We.order_number.split("-")[1],date:new Date(We.order_date||We.createdAt),items:We.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(We.subtotal||"0"),discount:parseFloat(We.discount||"0"),coupon:We.coupon_code?{code:We.coupon_code,discount:parseFloat(We.coupon_discount||"0")}:null,serviceCharge:parseFloat(We.service_charge||"0"),serviceChargeRate:parseFloat(We.service_charge_rate||"10"),tax:parseFloat(We.tax||"0"),taxRate:parseFloat(We.tax_rate||"6"),total:parseFloat(We.final_price||We.total_amount||"0"),paymentMethod:We.payment_method||"cash",amountReceived:parseFloat(We.amount_received||"0"),change:parseFloat(We.change||"0")};await(0,u.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),We&&i.createPortal((0,m.jsxs)(ve,{id:"bill-print-content",children:[(0,m.jsxs)(we,{children:[(0,m.jsx)(Fe,{children:(null===ht||void 0===ht?void 0:ht.companyName)||"Restaurant"}),ht&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:ht.address}),(0,m.jsxs)("div",{style:{fontSize:"11px"},children:[ht.city,", ",ht.state," ",ht.postcode]}),(0,m.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",ht.phone]}),ht.email&&(0,m.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",ht.email]}),ht.taxNo&&(0,m.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",ht.taxNo]})]}),(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,m.jsxs)(ke,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Order No:"}),(0,m.jsx)("span",{children:We.order_number})]}),(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Date:"}),(0,m.jsx)("span",{children:Xt(We.order_date||We.createdAt)})]}),(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Customer:"}),(0,m.jsx)("span",{children:We.customer_name||"Guest"})]}),(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Phone:"}),(0,m.jsx)("span",{children:We.customer_phone||"N/A"})]}),(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Order Type:"}),(0,m.jsx)("span",{children:"dine_in"===We.order_type?"DINE IN":null===(t=We.order_type)||void 0===t?void 0:t.toUpperCase()})]}),We.table_number&&(0,m.jsxs)(Ae,{children:[(0,m.jsx)("strong",{children:"Table:"}),(0,m.jsx)("span",{children:We.table_number})]}),("takeaway"===We.order_type||"pickup"===We.order_type)&&(0,m.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",We.order_number.split("-")[1]||"000"]}),"pickup"===We.order_type&&(0,m.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",We.scheduled_pickup_time?h(We.scheduled_pickup_time):"ASAP"]})]}),(0,m.jsx)(ke,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,m.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,m.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,m.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,m.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,m.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,m.jsx)("tbody",{children:We.order_items&&Array.isArray(We.order_items)&&We.order_items.map((e,t)=>{var r,n,i;return(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,m.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,m.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,m.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,m.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,m.jsxs)(ke,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,m.jsxs)(Ae,{children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.subtotal||We.total_amount),Ne.currency)})]}),We.discount>0&&(0,m.jsxs)(Ae,{children:[(0,m.jsx)("span",{children:"Discount:"}),(0,m.jsx)("span",{children:(0,p.vv)(-Number(We.discount),Ne.currency)})]}),We.coupon_discount>0&&(0,m.jsxs)(Ae,{children:[(0,m.jsxs)("span",{children:["Coupon (",We.coupon_code,"):"]}),(0,m.jsx)("span",{children:(0,p.vv)(-Number(We.coupon_discount),Ne.currency)})]}),parseFloat(We.takeaway_charge||0)>0&&(0,m.jsxs)(Ae,{children:[(0,m.jsx)("span",{children:"Takeaway Charge:"}),(0,m.jsx)("span",{children:(0,p.vv)(parseFloat(We.takeaway_charge),Ne.currency)})]}),We.service_charge>0&&(0,m.jsxs)(Ae,{children:[(0,m.jsxs)("span",{children:["Service Charge (",We.service_charge_rate||10,"%):"]}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.service_charge),Ne.currency)})]}),We.tax>0&&(0,m.jsxs)(Ae,{children:[(0,m.jsxs)("span",{children:["Tax (",We.tax_rate||6,"%):"]}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.tax),Ne.currency)})]}),(0,m.jsxs)(Ae,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,m.jsx)("span",{children:"TOTAL:"}),(0,m.jsx)("span",{children:(0,p.vv)(Number(We.total_amount),Ne.currency)})]})]}),(0,m.jsxs)(ke,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,m.jsxs)(Ae,{children:[(0,m.jsx)("span",{children:"Payment Method:"}),(0,m.jsx)("span",{children:We.payment_method?We.payment_method.toUpperCase():"N/A"})]}),(0,m.jsxs)(Ae,{children:[(0,m.jsx)("span",{children:"Order Status:"}),(0,m.jsx)("span",{children:We.status.toUpperCase()})]})]}),(0,m.jsxs)(Ce,{children:[(0,m.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,m.jsx)("div",{children:"Thank you for your purchase!"}),(0,m.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,m.jsx)(te,{isOpen:Ue,onClick:Jt,"data-modal":"delete-confirm",children:(0,m.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(ne,{children:[(0,m.jsx)(ie,{children:"Delete Order"}),(0,m.jsx)(oe,{onClick:Jt,children:"\xd7"})]}),(0,m.jsxs)(ae,{children:[(0,m.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,m.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Ye&&(null===(r=Ie.find(e=>e.id===Ye))||void 0===r?void 0:r.order_number)]})]}),(0,m.jsxs)(be,{children:[(0,m.jsx)(G,{variant:"secondary",onClick:Jt,children:"Cancel"}),(0,m.jsx)(G,{onClick:async()=>{if(Ye){const t=Ye;Oe(e=>e.filter(e=>e.id!==t)),Ve(!1),Je(null);try{const e=await fetch(`/api/orders/${t}`,g({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):Pt()}catch(e){console.error("Failed to delete order:",e),Pt()}}else Ve(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,m.jsx)(te,{isOpen:Ke,onClick:e=>e.target===e.currentTarget&&Gt(),children:(0,m.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(ne,{children:[(0,m.jsx)(ie,{children:"Cancel Order"}),(0,m.jsx)(oe,{onClick:Gt,children:"\xd7"})]}),(0,m.jsx)(ae,{children:(0,m.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,m.jsxs)(be,{children:[(0,m.jsx)(G,{variant:"secondary",onClick:Gt,children:"No, Keep Order"}),(0,m.jsx)(G,{onClick:async()=>{if(Qe){Oe(e=>e.map(e=>e.id===Qe?{...e,status:"cancelled"}:e)),Ge(!1),(null===We||void 0===We?void 0:We.id)===Qe&&Vt();try{const e=await fetch(`/api/orders/${Qe}/status`,g({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):Pt()}catch(e){console.error("Failed to cancel order:",e),Pt()}finally{Xe(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),Ze&&tt&&(0,m.jsx)(l.A,{isOpen:Ze,onClose:()=>{et(!1),setTimeout(()=>{rt(null)},100)},total:Number(tt.total_amount),subtotal:Number(tt.subtotal||0),tax:Number(tt.tax||0),serviceCharge:Number(tt.service_charge||0),discountAmount:Number(tt.discount||0),couponDiscount:Number(tt.coupon_discount||0),onConfirmPayment:async(e,t,r)=>{if(tt){_t(!1);try{if(!(await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({payment_status:"completed",payment_method:e})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"===tt.status||"outstanding"===tt.status?await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===tt.status&&await fetch(`/api/orders/${tt.id}`,g({method:"PATCH",body:JSON.stringify({status:"completed"})})),et(!1),rt(null),await Pt(),qe&&(Le(!1),He(null))}catch(n){console.error("\u274c Payment error:",n)}}},paymentMethods:yt})]}),(()=>{const e=Wt().length,t=Math.ceil(e/50);return t>1&&(0,m.jsxs)(Se,{children:[(0,m.jsxs)(Be,{children:["Showing ",50*(lt-1)+1,"-",Math.min(50*lt,e)," of ",e," orders"]}),(0,m.jsxs)(Te,{children:[(0,m.jsx)(Ee,{onClick:()=>ct(1),disabled:1===lt,children:"First"}),(0,m.jsx)(Ee,{onClick:()=>ct(e=>Math.max(1,e-1)),disabled:1===lt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||lt<=3?r+1:lt>=t-2?t-4+r:lt-2+r,(0,m.jsx)(Ee,{active:lt===n,onClick:()=>ct(n),children:n},n)}),(0,m.jsx)(Ee,{onClick:()=>ct(e=>Math.min(t,e+1)),disabled:lt===t,children:"Next"}),(0,m.jsx)(Ee,{onClick:()=>ct(t),disabled:lt===t,children:"Last"})]})]})})()]})]})}}}]);