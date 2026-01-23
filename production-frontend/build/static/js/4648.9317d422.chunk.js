"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Ee});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(3310),d=r(8012),l=r(1367),c=r(2966),p=r(9189),u=r(9018),m=r(6038),x=r(2674),h=r(5863),g=r(8406),y=r(4414);const b=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},v=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,y.jsx)("span",{style:{fontSize:"12px"},children:r})},j=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
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
`,w=o.Ay.button`
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
`,F=o.Ay.button`
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
`,k=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,C=o.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,A=o.Ay.div`
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
`,S=o.Ay.button`
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
`,B=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,E=o.Ay.div`
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
`,I=o.Ay.button`
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
`,N=o.Ay.div`
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
`,O=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,$=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,z=o.Ay.span`
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
`,D=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,R=o.Ay.div`
  line-height: 1.6;
`,M=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,W=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,q=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,L=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"awaiting_payment":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"awaiting_payment":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,U=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,V=(o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`),H=o.Ay.button`
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
`,G=o.Ay.button`
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
`,Y=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 180px;

  @media (max-width: 1024px) {
    max-width: none;
    gap: 8px;
  }
`,J=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,K=(o.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,o.Ay.div`
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
`),X=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,Q=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Z=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,ee=o.Ay.button`
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
`,te=o.Ay.div`
  padding: 24px;
`,re=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,ne=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,ie=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,oe=o.Ay.span`
  color: #6B7C93;
`,se=o.Ay.span`
  font-weight: 500;
`,ae=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,de=o.Ay.div`
  flex: 1;
`,le=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ce=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,pe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,ue=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,me=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,xe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,he=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`,ge=o.Ay.div`
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
`,ye=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,be=o.Ay.button`
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
`,fe=o.Ay.div`
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
`,ve=o.DU`
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
`,je=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,_e=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,we=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,Fe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,ke=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Ce=o.Ay.div`
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
`,Ae=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Se=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Be=o.Ay.button`
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
`,Ee=()=>{var e,t,r;const{user:o}=(0,l.As)(),{getStoreInfo:Ee,operationSettings:Ie}=(0,u.Pj)(),[Te,Ne]=(0,n.useState)([]),[Pe,Oe]=(0,n.useState)([]),[,$e]=(0,n.useState)(null),[ze,De]=(0,n.useState)("all"),[Re,Me]=(0,n.useState)(null),[We,qe]=(0,n.useState)(!1),[Le,Ue]=(0,n.useState)(!1),[Ve,He]=(0,n.useState)(null),[Ge,Ye]=(0,n.useState)(!1),[Je,Ke]=(0,n.useState)(null),[Xe,Qe]=(0,n.useState)(!1),[Ze,et]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[tt,rt]=(0,n.useState)(!1),[nt,it]=(0,n.useState)(!1),[ot,st]=(0,n.useState)(!0),[at,dt]=(0,n.useState)(1),[lt,ct]=(0,n.useState)(1),[pt,ut]=(0,n.useState)(0),[mt,xt]=(0,n.useState)(null),[ht,gt]=(0,n.useState)(null),[yt,bt]=(0,n.useState)(0),[ft,vt]=(0,n.useState)(!0),[jt,_t]=(0,n.useState)(null),[wt,Ft]=(0,n.useState)("today"),[kt,Ct]=(0,n.useState)(()=>{const e=new Date,t=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:t,end:t}}),[At,St]=(0,n.useState)(!1),[Bt,Et]=(0,n.useState)(""),[It,Tt]=(0,n.useState)(!1),[Nt,Pt]=(0,n.useState)([]),[Ot,$t]=(0,n.useState)(!1),[zt,Dt]=(0,n.useState)(!1),[Rt,Mt]=(0,n.useState)(null),[Wt,qt]=(0,n.useState)(!1),[Lt,Ut]=(0,n.useState)([]),[Vt,Ht]=(0,n.useState)([]),[Gt,Yt]=(0,n.useState)(null),[Jt,Kt]=(0,n.useState)([]),[Xt,Qt]=(0,n.useState)(!1),[Zt,er]=(0,n.useState)(""),[tr,rr]=(0,n.useState)(!1),[nr,ir]=(0,n.useState)(null),[or,sr]=(0,n.useState)({}),[ar,dr]=(0,n.useState)(1),[lr,cr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[pr,ur]=(0,n.useState)(null),[mr,xr]=(0,n.useState)(!1),[hr,gr]=(0,n.useState)(null),yr=(0,n.useCallback)(function(e){cr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{cr(e=>({...e,isVisible:!1}))},4e3)},[]),br=(0,n.useCallback)(()=>{if(ft)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[ft]);(0,n.useEffect)(()=>{bt(e=>e+1);const e=setInterval(()=>{bt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const fr=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=${e}&limit=50&includeCompleted=true`,f()),r=await t.json();r.success&&r.data&&(Ne(r.data),r.pagination&&(dt(r.pagination.currentPage),ct(r.pagination.totalPages),ut(r.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{st(!1)}},[null===o||void 0===o?void 0:o.restaurantId]),vr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/orders/restaurant/${o.restaurantId}?page=1&limit=10000&includeCompleted=true`,f()),t=await e.json();t.success&&t.data&&Oe(t.data)}catch(e){console.error("Failed to fetch all orders:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),jr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,f()),t=await e.json();t.success&&t.data&&_t(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),_r=(0,n.useRef)(br);(0,n.useEffect)(()=>{_r.current=br},[br]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Ne(t=>[e,...t]),Oe(t=>[e,...t]),_r.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Ne(t=>t.map(t=>t.id===e.id?e:t)),Oe(t=>t.map(t=>t.id===e.id?e:t))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Ne(e=>e.filter(e=>e.id!==t)),Oe(e=>e.filter(e=>e.id!==t))}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),_r.current(),ur({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),$e(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{fr(at)},[fr,at]),(0,n.useEffect)(()=>{vr()},[vr]),(0,n.useEffect)(()=>{wr("today")},[]),(0,n.useEffect)(()=>{dt(1)},[ze,kt.start,kt.end,wt]);const wr=e=>{Ft(e),St(!1);const t=new Date;let r=new Date;const n=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":r=new Date(t),r.setHours(0,0,0,0);break;case"week":r=new Date(t.getTime()-6048e5);break;case"month":r=new Date(t.getTime()-2592e6);break;case"year":r=new Date(t.getTime()-31536e6);break;case"all":if(Pe.length>0){r=Pe.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}Ct({start:n(r),end:n(t)})},Fr=()=>{if(!kt.start||!kt.end)return Pe;const e=new Date(kt.start);e.setHours(0,0,0,0);const t=new Date(kt.end);t.setHours(23,59,59,999);let r=Pe.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const i=new Date(n);if(isNaN(i.getTime()))return!1;return i>=e&&i<=t});if(Bt.trim()){const e=Bt.toLowerCase().trim();r=r.filter(t=>{var r,n,i,o,s;if(null!==(r=t.order_number)&&void 0!==r&&r.toLowerCase().includes(e))return!0;if(null!==(n=t.customer_name)&&void 0!==n&&n.toLowerCase().includes(e))return!0;if(null!==(i=t.customer_phone)&&void 0!==i&&i.replace(/\D/g,"").includes(e.replace(/\D/g,"")))return!0;if(null!==(o=t.table_number)&&void 0!==o&&o.toString().includes(e))return!0;if(t.order_items&&Array.isArray(t.order_items)){if(t.order_items.some(t=>{var r,n;return(null===(r=t.menu_item_name)||void 0===r?void 0:r.toLowerCase().includes(e))||(null===(n=t.name)||void 0===n?void 0:n.toLowerCase().includes(e))}))return!0}return!(null===(s=t.payment_method)||void 0===s||!s.toLowerCase().includes(e))})}return r},kr=(e,t)=>{Ct(r=>({...r,[e]:t})),St(!0),Ft("today")};(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,f()),t=await e.json();if(t.success||e.ok){const e=t.data||t;xt({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&gt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),jr()},[null===o||void 0===o?void 0:o.restaurantId,jr]);const Cr=e=>"outstanding"===e.status||"awaiting_payment"===e.status,Ar=e=>Cr(e)?"awaiting_payment":e.status,Sr=e=>"awaiting_payment"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Br=()=>{const e=Fr();let t;return t="all"===ze?e:"outstanding"===ze?e.filter(e=>Cr(e)):e.filter(e=>e.status===ze),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Er=e=>{const t=Fr();return"all"===e?t.length:"outstanding"===e?t.filter(e=>Cr(e)).length:t.filter(t=>t.status===e).length},Ir=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];vt(!1);const n=(new Date).toISOString();Ne(i=>i.map(i=>i.id===e?{...i,status:t,...r&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!i.served_at&&{served_at:n}}:i));try{const i={status:t};r&&(i.kitchen_ready=!0);const o=Te.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(i.served_at=n);const s=await fetch(`/api/orders/${e}/status`,f({method:"PATCH",body:JSON.stringify(i)}));(await s.json()).success||fr()}catch(i){console.error("Failed to update status:",i),fr()}},Tr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",awaiting_payment:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Nr=()=>{It&&Pt([]),Tt(!It)},Pr=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Or=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");Kt(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{Wt?(async()=>{try{const r=(null===Re||void 0===Re?void 0:Re.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,f()),fetch(`/api/menu?restaurantId=${r}`,f())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),Ht(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Ut(d.filter(e=>!1!==e.is_available)),s.length>0&&Yt(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(Kt([]),Yt(null))},[Wt]);const $r=e=>{Me(e),qe(!0)},zr=()=>{qe(!1),Me(null),rt(!1),it(!1),qt(!1),Kt([])},Dr=async e=>{const t=e||Re;if(t){const e=Ee(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void yr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Rr=e=>{He(e),Ue(!0)},Mr=()=>{He(null),Ue(!1)},Wr=e=>{Ke(e),Ye(!0)},qr=()=>{Ke(null),Ye(!1)},Lr=(e,t)=>{t&&t.stopPropagation(),et(e),Qe(!0)},Ur=e=>(0,g.r6)(e,null===mt||void 0===mt?void 0:mt.operation_settings);return(0,y.jsxs)(a.A,{children:[(0,y.jsx)(ve,{}),(null===pr||void 0===pr?void 0:pr.isVisible)&&(0,y.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,y.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,y.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,y.jsx)("button",{onClick:()=>ur(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,y.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,y.jsxs)("strong",{children:["Order ",pr.orderNumber]}),pr.tableNumber&&` (Table ${pr.tableNumber})`,(0,y.jsx)("br",{}),(0,y.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",pr.orderGroup]})," ",pr.itemCount," item",pr.itemCount>1?"s":""," added"]}),(0,y.jsx)("button",{onClick:()=>{Et(pr.orderNumber),De("all"),ur(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,y.jsxs)(j,{className:"no-print",children:[(0,y.jsxs)(d.Ay,{title:"Live Orders",children:[It&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(F,{onClick:async()=>{if(Nt.length<2)return void yr("Please select at least 2 orders to merge","info");Te.filter(e=>Nt.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?yr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Dt(!0)},disabled:Nt.length<2||Ot,children:Ot?"Merging...":`Merge (${Nt.length})`}),(0,y.jsx)(w,{active:!1,onClick:Nr,children:"Cancel"})]}),!It&&(0,y.jsx)(w,{active:It,onClick:Nr,children:"Select to Merge"}),(0,y.jsx)(_,{enabled:ft,onClick:()=>vt(!ft),title:ft?"Stop notification sound":"Play notification sound",children:ft?(0,y.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,y.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,y.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,y.jsx)("svg",{viewBox:"0 0 24 24",children:(0,y.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,y.jsxs)(k,{children:[(0,y.jsx)(C,{children:(0,y.jsxs)(A,{children:[(0,y.jsx)(S,{active:"today"===wt&&!At,onClick:()=>wr("today"),children:"Today"}),(0,y.jsx)(S,{active:"week"===wt&&!At,onClick:()=>wr("week"),children:"Week"}),(0,y.jsx)(S,{active:"month"===wt&&!At,onClick:()=>wr("month"),children:"Month"}),(0,y.jsx)(S,{active:"year"===wt&&!At,onClick:()=>wr("year"),children:"Year"}),(0,y.jsx)(S,{active:"all"===wt&&!At,onClick:()=>wr("all"),children:"All"}),(0,y.jsx)(B,{type:"date",value:kt.start,onChange:e=>kr("start",e.target.value)}),(0,y.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,y.jsx)(B,{type:"date",value:kt.end,onChange:e=>kr("end",e.target.value)}),(0,y.jsxs)("div",{style:{position:"relative",width:"250px",marginLeft:"16px"},children:[(0,y.jsx)("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none",zIndex:1},children:"\ud83d\udd0d"}),(0,y.jsx)("input",{type:"text",placeholder:"Search orders...",value:Bt,onChange:e=>Et(e.target.value),style:{width:"100%",padding:"10px 40px 10px 40px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"all 0.2s",boxSizing:"border-box"}}),Bt&&(0,y.jsx)("button",{onClick:()=>Et(""),title:"Clear search",style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"#E5E7EB",border:"none",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"18px",color:"#6B7280",zIndex:2},children:"\xd7"})]}),(0,y.jsx)("button",{onClick:()=>{const e=Fr();if(0===e.length)return void yr("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,m.vv)(i.subtotal||e.total_amount||0,Ie.currency),(0,m.vv)(i.service_charge||0,Ie.currency),(0,m.vv)(i.tax||0,Ie.currency),(0,m.vv)(i.discount||0,Ie.currency),(0,m.vv)(e.total_amount||0,Ie.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${kt.start}_to_${kt.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",style:{padding:"10px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:"8px"},children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"18px",height:"18px"},children:(0,y.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}),(0,y.jsxs)(E,{children:[(0,y.jsxs)(I,{active:"all"===ze,onClick:()=>De("all"),children:["All Orders",(0,y.jsx)(T,{children:Er("all")})]}),(0,y.jsxs)(I,{active:"outstanding"===ze,onClick:()=>De("outstanding"),children:["Outstanding",(0,y.jsx)(T,{children:Er("outstanding")})]}),(0,y.jsxs)(I,{active:"pending"===ze,onClick:()=>De("pending"),children:["Pending",(0,y.jsx)(T,{children:Er("pending")})]}),(0,y.jsxs)(I,{active:"preparing"===ze,onClick:()=>De("preparing"),children:["Preparing",(0,y.jsx)(T,{children:Er("preparing")})]}),(0,y.jsxs)(I,{active:"ready"===ze,onClick:()=>De("ready"),children:["Ready",(0,y.jsx)(T,{children:Er("ready")})]}),(0,y.jsxs)(I,{active:"served"===ze,onClick:()=>De("served"),children:["Served",(0,y.jsx)(T,{children:Er("served")})]}),(0,y.jsxs)(I,{active:"completed"===ze,onClick:()=>De("completed"),children:["Completed",(0,y.jsx)(T,{children:Er("completed")})]}),(0,y.jsxs)(I,{active:"cancelled"===ze,onClick:()=>De("cancelled"),children:["Cancelled",(0,y.jsx)(T,{children:Er("cancelled")})]})]}),(0,y.jsx)(N,{children:(()=>{const e=(()=>{const e=Br().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(P,{children:["Total Sales ",(0,y.jsxs)("strong",{children:["RM",e.totalSales.toFixed(2)]})]}),(0,y.jsxs)(P,{children:["Avg ",(0,y.jsxs)("strong",{children:["RM",e.avgOrderAmount.toFixed(2)]})]}),(0,y.jsxs)(P,{children:["Max ",(0,y.jsxs)("strong",{children:["RM",e.maxOrderAmount.toFixed(2)]})]}),(0,y.jsxs)(P,{children:["\u2265RM20 ",(0,y.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,y.jsxs)(P,{children:["Avg Serve ",(0,y.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,y.jsxs)(P,{children:["Max Serve ",(0,y.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,y.jsxs)(P,{children:["Min Serve ",(0,y.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,y.jsx)(O,{children:Br().length>0?(0,y.jsxs)(x.bQ,{children:[(0,y.jsx)(x.B_,{children:(0,y.jsxs)("tr",{children:[It&&(0,y.jsx)(x.gU,{align:"center",width:"50px",children:(0,y.jsx)("input",{type:"checkbox",checked:Nt.length>0&&Nt.length===Br().slice(50*(at-1),50*at).filter(e=>Pr(e)).length,onChange:()=>{const e=Br().slice(50*(at-1),50*at).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Nt.length===e.length?Pt([]):Pt(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,y.jsx)(x.gU,{children:"Order"}),(0,y.jsx)(x.gU,{children:"Items"}),(0,y.jsx)(x.gU,{children:"Status"}),(0,y.jsx)(x.gU,{children:"Time"}),(0,y.jsx)(x.gU,{align:"right",children:"Amount"}),(0,y.jsx)(x.gU,{children:"Action"})]})}),(0,y.jsx)("tbody",{children:Br().slice(50*(at-1),50*at).map(e=>(0,y.jsxs)(x.J2,{style:It&&Nt.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[It&&(0,y.jsx)(x.Bv,{align:"center",style:{width:"50px"},children:Pr(e)?(0,y.jsx)("input",{type:"checkbox",checked:Nt.includes(e.id),onChange:()=>{return t=e.id,void Pt(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,y.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,y.jsxs)(x.Bv,{"data-label":"ORDER",children:[(0,y.jsxs)($,{onClick:()=>$r(e),children:[e.order_number,"takeaway"===e.order_type&&(0,y.jsx)(z,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,y.jsx)(z,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,y.jsx)(z,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,y.jsxs)(D,{children:[e.customer_name||"Guest",(0,y.jsx)("br",{}),e.customer_phone||("mobile"===e.source?"Mobile Order":"POS Terminal"),e.table_number&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("br",{}),(0,y.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("br",{}),(0,y.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?b(e.scheduled_pickup_time):"ASAP"]})]})]})]}),(0,y.jsx)(x.Bv,{"data-label":"ITEMS",children:(0,y.jsx)(R,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,y.jsxs)(M,{children:[(0,y.jsxs)("div",{children:[(0,y.jsxs)(W,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,y.jsx)(q,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,y.jsx)(x.Bv,{"data-label":"STATUS",align:"center",children:(0,y.jsx)(L,{status:Ar(e),children:Sr(Ar(e))})}),(0,y.jsx)(x.Bv,{"data-label":"TIME",align:"center",children:(0,y.jsxs)(U,{children:[Ur(e.createdAt||e.order_date),(0,y.jsx)("br",{}),!e.served_at&&(0,y.jsx)(v,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${yt}`),e.served_at&&(0,y.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Ur(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,y.jsx)(x.Bv,{"data-label":"AMOUNT",align:"right",children:(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)(x.DM,{highlight:!0,children:(0,m.vv)(Number(e.total_amount),Ie.currency)}),Number(e.points_used)>0&&(0,y.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,y.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,y.jsxs)(V,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,y.jsx)(x.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,y.jsxs)(Y,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,y.jsx)(y.Fragment,{children:Cr(e)?(0,y.jsx)(H,{onClick:t=>{t.stopPropagation(),Ir(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,y.jsx)(H,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",awaiting_payment:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&Ir(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Tr(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&"awaiting_payment"!==e.status&&!Cr(e)&&(0,y.jsx)(H,{variant:"secondary",onClick:()=>{if("pending"===e.status)Ir(e.id,"awaiting_payment");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Ir(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,y.jsx)(H,{onClick:t=>Lr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,y.jsx)(H,{onClick:t=>(async(e,t)=>{t.stopPropagation(),vt(!1);try{const t=Te.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,f({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");!t||"awaiting_payment"!==t.status&&"outstanding"!==t.status||await fetch(`/api/orders/${e}/status`,f({method:"PATCH",body:JSON.stringify({status:"pending"})})),fr()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),Ir(e.id,"completed")},title:"Mark as Completed",children:(0,y.jsx)(J,{children:"\u2713"})}),(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),$r(e)},title:"View Details",children:(0,y.jsx)(J,{children:"\u25c9"})}),(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Re;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Ee(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void yr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),Dr(e)},title:"Print Kitchen Ticket",children:(0,y.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,y.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Ee(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void yr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Dr(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&yr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,y.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,y.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,y.jsx)(G,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Rr(e.id):Wr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,y.jsx)(J,{children:"\u2715"})})]})})]},e.id))})]}):(0,y.jsx)(x.ys,{children:"No orders found in this category"})}),(0,y.jsx)(K,{isOpen:We,onClick:zr,"data-modal":"order-detail",children:(0,y.jsx)(X,{onClick:e=>e.stopPropagation(),children:Re&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(Q,{children:[(0,y.jsx)(Z,{children:Wt?"Add Items to Order":tt?"Receipt Preview":nt?"Kitchen Order Ticket Preview":`Order ${Re.order_number}`}),(0,y.jsx)(ee,{onClick:()=>{rt(!1),it(!1),qt(!1),Kt([]),zr()},children:"\xd7"})]}),Wt?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(te,{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,y.jsx)("div",{style:{marginBottom:"20px"},children:(0,y.jsx)("input",{type:"text",placeholder:"Search menu items...",value:Zt,onChange:e=>er(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),Zt.length>0&&(0,y.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Lt.filter(e=>{if(!e||!e.name)return!1;const t=Zt.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,y.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,y.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Or(e,1,[]),er("")},children:[(0,y.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,y.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,y.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,m.vv)(parseFloat(e.price)||0,Ie.currency)}),t&&(0,y.jsx)("button",{onClick:t=>{t.stopPropagation(),ir(e),rr(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Lt.filter(e=>e.name.toLowerCase().includes(Zt.toLowerCase())||e.code&&e.code.toLowerCase().includes(Zt.toLowerCase())).length&&(0,y.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",Jt.reduce((e,t)=>e+t.quantity,0),")"]}),0===Jt.length?(0,y.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,y.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Jt.map(e=>(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,y.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,y.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,m.vv)(e.unitPrice||parseFloat(e.price),Ie.currency)," each"]})]}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,y.jsx)("button",{onClick:()=>{return t=e.cartId,void Kt(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,y.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,y.jsx)("button",{onClick:()=>{return t=e.cartId,void Kt(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,y.jsx)(he,{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px"},children:(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,y.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,m.vv)(Jt.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Ie.currency)]}),(0,y.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,y.jsx)(H,{onClick:()=>{qt(!1),Kt([]),er(""),zr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,y.jsx)(H,{onClick:async()=>{if(null!==Re&&void 0!==Re&&Re.id&&0!==Jt.length)try{Qt(!0);const e=Jt.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Re||void 0===Re?void 0:Re.id}/merge-items`,f({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}yr("Items added successfully","success"),qt(!1),Kt([]),er(""),zr(),fr()}catch(e){console.error("Add items error:",e),yr(e.message||"Failed to add items","error")}finally{Qt(!1)}},disabled:0===Jt.length||Xt,style:{background:0===Jt.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===Jt.length?"not-allowed":"pointer"},children:Xt?"Adding...":"Add to Order"})]})]})})]}):nt?(0,y.jsx)(te,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,y.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ee(),t=Array.isArray(Re.order_items)?Re.order_items:[],r={orderNumber:Re.order_number,pickupNumber:Re.order_number.split("-")[1],date:new Date(Re.order_date||Re.createdAt),orderType:Re.order_type,orderSource:Re.order_source||"pos",tableNumber:Re.table_number||null,pagerNumber:Re.pager_number||null,customerName:Re.customer_name||"Walk-in Customer",scheduledPickupTime:Re.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Re.notes||"",takeawayCharge:parseFloat(Re.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,y.jsx)("div",{children:e||"\xa0"},t))})()})}):tt?(0,y.jsx)(te,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,y.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ee(),t=Array.isArray(Re.order_items)?Re.order_items:[],r={orderNumber:Re.order_number,pickupNumber:Re.order_number.split("-")[1],pagerNumber:Re.pager_number||null,date:new Date(Re.order_date||Re.createdAt),orderType:Re.order_type,scheduledPickupTime:Re.scheduled_pickup_time||null,currency:Ie.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Re.subtotal||"0"),discount:parseFloat(Re.discount||"0"),discountPolicy:Re.discount_policy_name?{name:Re.discount_policy_name,amount:parseFloat(Re.discount_policy_amount||"0")}:void 0,coupon:Re.coupon_code?{code:Re.coupon_code,discount:parseFloat(Re.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Re.takeaway_charge||"0"),serviceCharge:parseFloat(Re.service_charge||"0"),serviceChargeRate:parseFloat(Re.service_charge_rate||"10"),tax:parseFloat(Re.tax||"0"),taxRate:parseFloat(Re.tax_rate||"6"),total:parseFloat(Re.final_price||Re.total_amount||"0"),paymentMethod:Re.payment_method||"cash",amountReceived:parseFloat(Re.amount_received||"0"),change:parseFloat(Re.change||"0"),deliveryInfo:Re.delivery_info||null,deliveryFee:parseFloat(Re.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,y.jsxs)(te,{children:[(0,y.jsxs)(re,{children:[(0,y.jsx)(ne,{children:"Customer Information"}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Name:"}),(0,y.jsx)(se,{children:Re.customer_name||"Guest"})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Phone:"}),(0,y.jsx)(se,{children:Re.customer_phone||"N/A"})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Order Type:"}),(0,y.jsx)(se,{children:null===(e=Re.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Source:"}),(0,y.jsx)(se,{children:"mobile"===Re.source?"Mobile Order":"kiosk"===Re.source?"Kiosk":"POS Terminal"})]}),Re.table_number&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Table Number:"}),(0,y.jsx)(se,{children:Re.table_number})]}),"pickup"===Re.order_type&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Scheduled Pickup:"}),(0,y.jsx)(se,{style:{color:"#8B5CF6",fontWeight:600},children:Re.scheduled_pickup_time?b(Re.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Re.order_type&&Re.delivery_info&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(ue,{}),(0,y.jsxs)(re,{children:[(0,y.jsx)(ne,{children:"Delivery Information"}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Address:"}),(0,y.jsx)(se,{children:Re.delivery_info.address})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Phone:"}),(0,y.jsx)(se,{children:Re.delivery_info.phone})]}),Re.delivery_info.zoneName&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Zone:"}),(0,y.jsx)(se,{children:Re.delivery_info.zoneName})]}),Re.delivery_info.notes&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Notes:"}),(0,y.jsx)(se,{style:{fontStyle:"italic"},children:Re.delivery_info.notes})]}),Re.delivery_fee>0&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Delivery Fee:"}),(0,y.jsx)(se,{children:(0,m.vv)(parseFloat(Re.delivery_fee||"0"),Ie.currency)})]})]})]}),(0,y.jsx)(ue,{}),(0,y.jsxs)(re,{children:[(0,y.jsx)(ne,{children:"Order Information"}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Order Time:"}),(0,y.jsx)(se,{children:Ur(Re.createdAt)})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Status:"}),(0,y.jsx)(se,{children:(0,y.jsx)(L,{status:Re.status,children:Sr(Re.status)})})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Payment Method:"}),(0,y.jsx)(se,{children:Re.payment_method||"N/A"})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Payment Status:"}),(0,y.jsx)(se,{children:"payment_verification_pending"===Re.payment_status?(0,y.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===Re.payment_status?(0,y.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Re.payment_status?(0,y.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):Re.payment_status||"N/A"})]})]}),Re.payment_proof&&"payment_verification_pending"===Re.payment_status&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(ue,{}),(0,y.jsxs)(re,{children:[(0,y.jsx)(ne,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),Re.payment_proof.reference&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Transaction Reference:"}),(0,y.jsx)(se,{style:{fontWeight:600,fontFamily:"monospace"},children:Re.payment_proof.reference})]}),Re.payment_proof.file_name&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Receipt File:"}),(0,y.jsx)(se,{children:Re.payment_proof.file_name})]}),Re.payment_proof.uploaded_at&&(0,y.jsxs)(ie,{children:[(0,y.jsx)(oe,{children:"Submitted At:"}),(0,y.jsx)(se,{children:Ur(Re.payment_proof.uploaded_at)})]}),Re.payment_proof.image&&(0,y.jsxs)("div",{style:{marginTop:"16px"},children:[(0,y.jsx)(oe,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,y.jsx)("div",{style:{position:"relative"},children:(0,y.jsx)("img",{src:Re.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(Re.payment_proof.image,"_blank")})})]})]})]}),(0,y.jsx)(ue,{}),(0,y.jsxs)(re,{children:[(0,y.jsx)(ne,{children:"Order Items"}),(()=>{const e=Re.order_items&&Array.isArray(Re.order_items)?Re.order_items:[],t={};e.forEach(e=>{const r=e.order_group||0;t[r]||(t[r]=[]),t[r].push(e)});const r=Object.keys(t).map(Number).sort((e,t)=>e-t),n=r.length>1||1===r.length&&r[0]>0;return r.map(e=>{var r;return(0,y.jsxs)("div",{children:[n&&(0,y.jsxs)("div",{style:{background:0===e?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===e?"#6B7280":"#92400E",marginTop:e>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsx)("span",{children:0===e?"Original Order":`+Order ${e}`}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e>0&&(null===(r=t[e][0])||void 0===r?void 0:r.added_at)&&(0,y.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(t[e][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,y.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Re)return;const n=Ee();if(0===t.length)return void yr("No items in this group","error");const i={orderNumber:Re.order_number,pickupNumber:Re.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Re.order_date||Re.createdAt),orderType:Re.order_type,orderSource:Re.order_source||"pos",tableNumber:Re.table_number||null,pagerNumber:Re.pager_number||null,customerName:Re.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Re.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&yr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(e,t[e]),style:{background:0===e?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),t[e].map((t,r)=>{var n,i,o;return(0,y.jsx)(ae,{children:(0,y.jsxs)(de,{children:[(0,y.jsx)(le,{children:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Item"}),t.options&&t.options.length>0&&(0,y.jsx)(ce,{children:Array.isArray(t.options)?t.options.join(", "):t.options}),(0,y.jsxs)(pe,{children:[(0,y.jsxs)("span",{children:[t.quantity," \xd7 ",(0,m.vv)(parseFloat(t.price||(null===(i=t.menuItem)||void 0===i?void 0:i.price)||0),Ie.currency)]}),(0,y.jsx)("span",{children:(0,m.vv)(t.quantity*parseFloat(t.price||(null===(o=t.menuItem)||void 0===o?void 0:o.price)||0),Ie.currency)})]})]})},`${e}-${r}`)})]},e)})})()]}),(0,y.jsx)(ue,{}),(0,y.jsxs)(me,{children:[(0,y.jsxs)(xe,{children:[(0,y.jsx)("span",{children:"Subtotal"}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.subtotal||Re.total_amount),Ie.currency)})]}),Re.takeaway_charge&&parseFloat(Re.takeaway_charge)>0&&(0,y.jsxs)(xe,{children:[(0,y.jsx)("span",{children:"Takeaway Charge"}),(0,y.jsx)("span",{children:(0,m.vv)(parseFloat(Re.takeaway_charge),Ie.currency)})]}),Re.discount>0&&(0,y.jsxs)(xe,{children:[(0,y.jsx)("span",{children:"Discount"}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.discount),Ie.currency)})]}),Re.discount_policy_amount>0&&(0,y.jsxs)(xe,{children:[(0,y.jsxs)("span",{children:["Discount (",Re.discount_policy_name,")"]}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.discount_policy_amount),Ie.currency)})]}),Re.coupon_discount>0&&(0,y.jsxs)(xe,{children:[(0,y.jsxs)("span",{children:["Coupon (",Re.coupon_code,")"]}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.coupon_discount),Ie.currency)})]}),Number(Re.point_discount)>0&&(0,y.jsxs)(xe,{children:[(0,y.jsxs)("span",{children:["Points (",Number(Re.points_used||0).toLocaleString()," pts)"]}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.point_discount),Ie.currency)})]}),Re.service_charge>0&&(0,y.jsxs)(xe,{children:[(0,y.jsxs)("span",{children:["Service Charge (",Re.service_charge_rate||10,"%)"]}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.service_charge),Ie.currency)})]}),Re.tax>0&&(0,y.jsxs)(xe,{children:[(0,y.jsxs)("span",{children:["Tax (",Re.tax_rate||6,"%)"]}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.tax),Ie.currency)})]}),(0,y.jsxs)(xe,{isTotal:!0,children:[(0,y.jsx)("span",{children:"Total"}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.total_amount),Ie.currency)})]})]})]}),!Wt&&(0,y.jsx)(he,{children:tt?(0,y.jsx)(H,{onClick:()=>rt(!1),children:"Back to Order Details"}):nt?(0,y.jsx)(H,{onClick:()=>it(!1),children:"Back to Order Details"}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(H,{variant:"secondary",onClick:()=>Rr(Re.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==Re.status&&"completed"!==Re.status&&(0,y.jsx)(H,{onClick:()=>Wr(Re.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Cr(Re)&&"pending"!==Re.status&&(0,y.jsx)(H,{onClick:()=>{Ir(Re.id,"pending"),zr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===Re.payment_status&&(0,y.jsx)(H,{onClick:()=>Lr(Re),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Re.payment_status&&(0,y.jsx)(H,{onClick:async()=>{if(Re){vt(!1);try{if(!(await fetch(`/api/orders/${Re.id}`,f({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"!==Re.status&&"outstanding"!==Re.status||await fetch(`/api/orders/${Re.id}/status`,f({method:"PATCH",body:JSON.stringify({status:"pending"})})),zr(),fr()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===Re.payment_status&&!["served","completed","cancelled"].includes(Re.status)&&(0,y.jsx)(H,{onClick:()=>qt(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,y.jsx)(H,{onClick:()=>rt(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,y.jsx)(H,{onClick:()=>it(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,y.jsx)(H,{onClick:async()=>{if(Re){const e=Ee(),t={orderNumber:Re.order_number,pickupNumber:Re.order_number.split("-")[1],date:new Date(Re.order_date||Re.createdAt),items:Re.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Re.subtotal||"0"),discount:parseFloat(Re.discount||"0"),coupon:Re.coupon_code?{code:Re.coupon_code,discount:parseFloat(Re.coupon_discount||"0")}:null,serviceCharge:parseFloat(Re.service_charge||"0"),serviceChargeRate:parseFloat(Re.service_charge_rate||"10"),tax:parseFloat(Re.tax||"0"),taxRate:parseFloat(Re.tax_rate||"6"),total:parseFloat(Re.final_price||Re.total_amount||"0"),paymentMethod:Re.payment_method||"cash",amountReceived:parseFloat(Re.amount_received||"0"),change:parseFloat(Re.change||"0")};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),Re&&i.createPortal((0,y.jsxs)(fe,{id:"bill-print-content",children:[(0,y.jsxs)(je,{children:[(0,y.jsx)(_e,{children:(null===mt||void 0===mt?void 0:mt.companyName)||"Restaurant"}),mt&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:mt.address}),(0,y.jsxs)("div",{style:{fontSize:"11px"},children:[mt.city,", ",mt.state," ",mt.postcode]}),(0,y.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",mt.phone]}),mt.email&&(0,y.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",mt.email]}),mt.taxNo&&(0,y.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",mt.taxNo]})]}),(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,y.jsxs)(we,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Order No:"}),(0,y.jsx)("span",{children:Re.order_number})]}),(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Date:"}),(0,y.jsx)("span",{children:Ur(Re.order_date||Re.createdAt)})]}),(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Customer:"}),(0,y.jsx)("span",{children:Re.customer_name||"Guest"})]}),(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Phone:"}),(0,y.jsx)("span",{children:Re.customer_phone||"N/A"})]}),(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Order Type:"}),(0,y.jsx)("span",{children:"dine_in"===Re.order_type?"DINE IN":null===(t=Re.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Re.table_number&&(0,y.jsxs)(Fe,{children:[(0,y.jsx)("strong",{children:"Table:"}),(0,y.jsx)("span",{children:Re.table_number})]}),("takeaway"===Re.order_type||"pickup"===Re.order_type)&&(0,y.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Re.order_number.split("-")[1]||"000"]}),"pickup"===Re.order_type&&(0,y.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Re.scheduled_pickup_time?b(Re.scheduled_pickup_time):"ASAP"]})]}),(0,y.jsx)(we,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,y.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,y.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,y.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,y.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,y.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,y.jsx)("tbody",{children:Re.order_items&&Array.isArray(Re.order_items)&&Re.order_items.map((e,t)=>{var r,n,i;return(0,y.jsxs)("tr",{children:[(0,y.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,y.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,y.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,y.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,y.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,y.jsxs)(we,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,y.jsxs)(Fe,{children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.subtotal||Re.total_amount),Ie.currency)})]}),Re.discount>0&&(0,y.jsxs)(Fe,{children:[(0,y.jsx)("span",{children:"Discount:"}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.discount),Ie.currency)})]}),Re.coupon_discount>0&&(0,y.jsxs)(Fe,{children:[(0,y.jsxs)("span",{children:["Coupon (",Re.coupon_code,"):"]}),(0,y.jsx)("span",{children:(0,m.vv)(-Number(Re.coupon_discount),Ie.currency)})]}),parseFloat(Re.takeaway_charge||0)>0&&(0,y.jsxs)(Fe,{children:[(0,y.jsx)("span",{children:"Takeaway Charge:"}),(0,y.jsx)("span",{children:(0,m.vv)(parseFloat(Re.takeaway_charge),Ie.currency)})]}),Re.service_charge>0&&(0,y.jsxs)(Fe,{children:[(0,y.jsxs)("span",{children:["Service Charge (",Re.service_charge_rate||10,"%):"]}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.service_charge),Ie.currency)})]}),Re.tax>0&&(0,y.jsxs)(Fe,{children:[(0,y.jsxs)("span",{children:["Tax (",Re.tax_rate||6,"%):"]}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.tax),Ie.currency)})]}),(0,y.jsxs)(Fe,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,y.jsx)("span",{children:"TOTAL:"}),(0,y.jsx)("span",{children:(0,m.vv)(Number(Re.total_amount),Ie.currency)})]})]}),(0,y.jsxs)(we,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,y.jsxs)(Fe,{children:[(0,y.jsx)("span",{children:"Payment Method:"}),(0,y.jsx)("span",{children:Re.payment_method?Re.payment_method.toUpperCase():"N/A"})]}),(0,y.jsxs)(Fe,{children:[(0,y.jsx)("span",{children:"Order Status:"}),(0,y.jsx)("span",{children:Re.status.toUpperCase()})]})]}),(0,y.jsxs)(ke,{children:[(0,y.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,y.jsx)("div",{children:"Thank you for your purchase!"}),(0,y.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,y.jsx)(K,{isOpen:Le,onClick:Mr,"data-modal":"delete-confirm",children:(0,y.jsxs)(X,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Q,{children:[(0,y.jsx)(Z,{children:"Delete Order"}),(0,y.jsx)(ee,{onClick:Mr,children:"\xd7"})]}),(0,y.jsxs)(te,{children:[(0,y.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,y.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Ve&&(null===(r=Te.find(e=>e.id===Ve))||void 0===r?void 0:r.order_number)]})]}),(0,y.jsxs)(he,{children:[(0,y.jsx)(H,{variant:"secondary",onClick:Mr,children:"Cancel"}),(0,y.jsx)(H,{onClick:async()=>{if(Ve){const t=Ve;Ne(e=>e.filter(e=>e.id!==t)),Ue(!1),He(null);try{const e=await fetch(`/api/orders/${t}`,f({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):fr()}catch(e){console.error("Failed to delete order:",e),fr()}}else Ue(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,y.jsx)(K,{isOpen:Ge,onClick:e=>e.target===e.currentTarget&&qr(),children:(0,y.jsxs)(X,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(Q,{children:[(0,y.jsx)(Z,{children:"Cancel Order"}),(0,y.jsx)(ee,{onClick:qr,children:"\xd7"})]}),(0,y.jsx)(te,{children:(0,y.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,y.jsxs)(he,{children:[(0,y.jsx)(H,{variant:"secondary",onClick:qr,children:"No, Keep Order"}),(0,y.jsx)(H,{onClick:async()=>{if(Je){Ne(e=>e.map(e=>e.id===Je?{...e,status:"cancelled"}:e)),Ye(!1),(null===Re||void 0===Re?void 0:Re.id)===Je&&zr();try{const e=await fetch(`/api/orders/${Je}/status`,f({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):fr()}catch(e){console.error("Failed to cancel order:",e),fr()}finally{Ke(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),Xe&&Ze&&(0,y.jsx)(c.A,{isOpen:Xe,onClose:()=>{Qe(!1),setTimeout(()=>{et(null)},100)},total:Number(Ze.total_amount),subtotal:Number(Ze.subtotal||0),tax:Number(Ze.tax||0),serviceCharge:Number(Ze.service_charge||0),discountAmount:Number(Ze.discount||0),couponDiscount:Number(Ze.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i)=>{if(Ze){vt(!1);try{const t={payment_status:"completed",payment_method:e};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(Ze.total_amount)-i);if(!(await fetch(`/api/orders/${Ze.id}`,f({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"awaiting_payment"===Ze.status||"outstanding"===Ze.status?await fetch(`/api/orders/${Ze.id}`,f({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===Ze.status&&await fetch(`/api/orders/${Ze.id}`,f({method:"PATCH",body:JSON.stringify({status:"completed"})})),Qe(!1),et(null),await fr(),We&&(qe(!1),Me(null))}catch(o){console.error("\u274c Payment error:",o)}}},paymentMethods:ht,customerId:Ze.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:jt}),nr&&(0,y.jsx)(p.A,{isOpen:tr,onClose:()=>{rr(!1),ir(null)},menuItem:{id:nr.id,name:nr.name,price:parseFloat(nr.price)||0,emoji:nr.emoji||"\ud83c\udf7d\ufe0f",image:nr.image,optionGroups:nr.optionGroups},onConfirm:(e,t,r)=>{Or(nr,e,r),rr(!1),ir(null),er("")}}),(0,y.jsx)(K,{isOpen:zt,onClick:()=>Dt(!1),"data-modal":"merge-target",children:(0,y.jsxs)(X,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,y.jsxs)(Q,{children:[(0,y.jsx)(Z,{children:"Select Target Order"}),(0,y.jsx)(ee,{onClick:()=>Dt(!1),children:"\xd7"})]}),(0,y.jsxs)(te,{children:[(0,y.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,y.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Te.filter(e=>Nt.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,y.jsxs)("div",{onClick:()=>Mt(e.id),style:{padding:"16px",border:"2px solid "+(Rt===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Rt===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,y.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,m.vv)(e.total_amount,Ie.currency)}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Rt===e.id&&(0,y.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]}),(0,y.jsxs)(he,{children:[(0,y.jsx)(H,{onClick:()=>Dt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,y.jsx)(H,{onClick:()=>Rt&&(async e=>{try{$t(!0),Dt(!1);const t=Nt,r=await fetch("/api/orders/merge",f({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();yr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Tt(!1),Pt([]),Mt(null),fr()}catch(t){console.error("Merge error:",t),yr(t.message||"Failed to merge orders","error")}finally{$t(!1)}})(Rt),disabled:!Rt||Ot,style:{background:Rt?"#635BFF":"#E5E7EB",color:Rt?"white":"#9CA3AF",cursor:Rt?"pointer":"not-allowed"},children:Ot?"Merging...":"Merge Orders"})]})]})})]}),(()=>{const e=Br().length,t=Math.ceil(e/50);return t>1&&(0,y.jsxs)(Ce,{children:[(0,y.jsxs)(Ae,{children:["Showing ",50*(at-1)+1,"-",Math.min(50*at,e)," of ",e," orders"]}),(0,y.jsxs)(Se,{children:[(0,y.jsx)(Be,{onClick:()=>dt(1),disabled:1===at,children:"First"}),(0,y.jsx)(Be,{onClick:()=>dt(e=>Math.max(1,e-1)),disabled:1===at,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||at<=3?r+1:at>=t-2?t-4+r:at-2+r,(0,y.jsx)(Be,{active:at===n,onClick:()=>dt(n),children:n},n)}),(0,y.jsx)(Be,{onClick:()=>dt(e=>Math.min(t,e+1)),disabled:at===t,children:"Next"}),(0,y.jsx)(Be,{onClick:()=>dt(t),disabled:at===t,children:"Last"})]})]})})()]}),i.createPortal((0,y.jsxs)(ge,{isVisible:lr.isVisible,type:lr.type,children:[(0,y.jsx)(ye,{children:lr.message}),(0,y.jsx)(be,{onClick:()=>cr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,s=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,i.jsxs)(o,{children:[(0,i.jsx)(s,{children:t}),r&&(0,i.jsx)(a,{children:r})]})}}}]);