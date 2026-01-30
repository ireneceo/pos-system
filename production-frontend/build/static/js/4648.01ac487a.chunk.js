"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Ie});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(3310),d=r(8012),l=r(1367),c=r(2966),p=r(9189),u=r(9018),x=r(6038),m=r(2674),h=r(5863),g=r(8406),y=r(7617),b=r(4414);const f=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},v=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},j=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,b.jsx)("span",{style:{fontSize:"12px"},children:r})},_=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,w=o.Ay.button`
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
`,F=o.Ay.button`
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
`,k=o.Ay.button`
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
`,C=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,A=o.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,S=o.Ay.div`
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
`,B=o.Ay.button`
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
`,E=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,I=o.Ay.div`
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
`,T=o.Ay.button`
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
`,N=o.Ay.span`
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
`,P=o.Ay.div`
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
`,O=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,$=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,z=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,D=o.Ay.span`
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
`,R=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,M=o.Ay.div`
  line-height: 1.6;
`,W=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,q=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,L=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,U=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"outstanding":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"outstanding":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,V=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,H=(o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`),G=o.Ay.button`
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
`,Y=o.Ay.button`
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
`,J=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,K=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,Z=(o.Ay.div`
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
`,ee=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,te=o.Ay.button`
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
`,re=o.Ay.div`
  padding: 24px;
`,ne=o.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,ie=o.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,oe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,se=o.Ay.span`
  color: #6B7C93;
`,ae=o.Ay.span`
  font-weight: 500;
`,de=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,le=o.Ay.div`
  flex: 1;
`,ce=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,pe=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,ue=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,xe=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,me=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,he=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,ge=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`,ye=o.Ay.div`
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
`,be=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,fe=o.Ay.button`
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
`,je=o.DU`
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
`,_e=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,we=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,Fe=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,ke=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Ce=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Ae=o.Ay.div`
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
`,Se=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Be=o.Ay.div`
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
`,Ie=()=>{var e,t,r;const{user:o}=(0,l.As)(),{getStoreInfo:Ie,operationSettings:Te}=(0,u.Pj)(),[Ne,Pe]=(0,n.useState)([]),[Oe,$e]=(0,n.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[,ze]=(0,n.useState)(null),[De,Re]=(0,n.useState)("all"),[Me,We]=(0,n.useState)(null),[qe,Le]=(0,n.useState)(!1),[Ue,Ve]=(0,n.useState)(!1),[He,Ge]=(0,n.useState)(null),[Ye,Je]=(0,n.useState)(!1),[Ke,Ze]=(0,n.useState)(null),[Xe,Qe]=(0,n.useState)(!1),[et,tt]=(0,n.useState)(null),[rt,nt]=(0,n.useState)(!1),[it,ot]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[st,at]=(0,n.useState)(!1),[dt,lt]=(0,n.useState)(!1),[ct,pt]=(0,n.useState)(!0),[ut,xt]=(0,n.useState)(1),[mt,ht]=(0,n.useState)(1),[gt,yt]=(0,n.useState)(0),[bt,ft]=(0,n.useState)(null),[vt,jt]=(0,n.useState)(null),[_t,wt]=(0,n.useState)(0),[Ft,kt]=(0,n.useState)(!0),[Ct,At]=(0,n.useState)(null),[St,Bt]=(0,n.useState)("today"),[Et,It]=(0,n.useState)(()=>{const e=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}}();return{start:e,end:e}}),[Tt,Nt]=(0,n.useState)(!1),[Pt,Ot]=(0,n.useState)(""),[$t,zt]=(0,n.useState)(!1),[Dt,Rt]=(0,n.useState)([]),[Mt,Wt]=(0,n.useState)(!1),[qt,Lt]=(0,n.useState)(!1),[Ut,Vt]=(0,n.useState)(null),[Ht,Gt]=(0,n.useState)(!1),[Yt,Jt]=(0,n.useState)([]),[Kt,Zt]=(0,n.useState)([]),[Xt,Qt]=(0,n.useState)(null),[er,tr]=(0,n.useState)([]),[rr,nr]=(0,n.useState)(!1),[ir,or]=(0,n.useState)(""),[sr,ar]=(0,n.useState)(!1),[dr,lr]=(0,n.useState)(null),[cr,pr]=(0,n.useState)({}),[ur,xr]=(0,n.useState)(1),[mr,hr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[gr,yr]=(0,n.useState)(null),[br,fr]=(0,n.useState)(!1),[vr,jr]=(0,n.useState)(null),_r=(0,n.useCallback)(function(e){hr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{hr(e=>({...e,isVisible:!1}))},4e3)},[]),wr=(0,n.useCallback)(()=>{if(Ft)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[Ft]);(0,n.useEffect)(()=>{wt(e=>e+1);const e=setInterval(()=>{wt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const Fr=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=new URLSearchParams({page:String(e),limit:"100",includeCompleted:"true"});"all"!==De&&"outstanding"!==De&&t.append("status",De),Et.start&&t.append("startDate",Et.start),Et.end&&t.append("endDate",Et.end),Pt.trim()&&t.append("search",Pt.trim());const r=await fetch(`/api/orders/restaurant/${o.restaurantId}?${t}`,v()),n=await r.json();n.success&&n.data&&(Pe(n.data),n.pagination&&(xt(n.pagination.currentPage),ht(n.pagination.totalPages),yt(n.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{pt(!1)}},[null===o||void 0===o?void 0:o.restaurantId,Et.start,Et.end,Pt,De]),kr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{var e;const t=new URLSearchParams;Et.start&&t.append("startDate",Et.start),Et.end&&t.append("endDate",Et.end);const r=await fetch(`/api/orders/restaurant/${o.restaurantId}/counts?${t}`,v()),n=await r.json();n.success&&null!==(e=n.data)&&void 0!==e&&e.counts&&$e(n.data.counts)}catch(t){console.error("Failed to fetch order counts:",t)}},[null===o||void 0===o?void 0:o.restaurantId,Et.start,Et.end]),Cr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,v()),t=await e.json();t.success&&t.data&&At(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),Ar=(0,n.useRef)(wr);(0,n.useEffect)(()=>{Ar.current=wr},[wr]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Pe(t=>[e,...t]),$e(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),Ar.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Pe(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&$e(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)})}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Pe(e=>{const r=e.find(e=>e.id===t);return r&&$e(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)})}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Ar.current(),yr({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),ze(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{Fr(ut)},[Fr,ut]),(0,n.useEffect)(()=>{kr()},[kr]),(0,n.useEffect)(()=>{null!==Te&&void 0!==Te&&Te.timeZone&&Sr("today")},[null===Te||void 0===Te?void 0:Te.timeZone]),(0,n.useEffect)(()=>{xt(1)},[De,Et.start,Et.end,St]);const Sr=e=>{Bt(e),Nt(!1);const t=(null===Te||void 0===Te?void 0:Te.timeZone)||"Asia/Kuala_Lumpur",r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},n=r(0);let i;switch(e){case"today":default:i=n;break;case"week":i=r(-7);break;case"month":i=r(-30);break;case"year":i=r(-365);break;case"all":i=r(-1825)}It({start:i,end:n})},Br=()=>Ne,Er=(e,t)=>{It(r=>({...r,[e]:t})),Nt(!0),Bt("today")};(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,v()),t=await e.json();if(t.success||e.ok){const e=t.data||t;ft({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&jt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),Cr()},[null===o||void 0===o?void 0:o.restaurantId,Cr]);const Ir=e=>"outstanding"===e.status,Tr=e=>e.status,Nr=e=>"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Pr=()=>{const e=Br();let t;return t="all"===De?e:"outstanding"===De?e.filter(e=>Ir(e)):e.filter(e=>e.status===De),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Or=e=>Oe[e]||0,$r=async function(e,t){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];kt(!1);const n=(new Date).toISOString();Pe(i=>i.map(i=>i.id===e?{...i,status:t,...r&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!i.served_at&&{served_at:n}}:i));try{const i={status:t};r&&(i.kitchen_ready=!0);const o=Ne.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(i.served_at=n);const s=await fetch(`/api/orders/${e}/status`,v({method:"PATCH",body:JSON.stringify(i)}));(await s.json()).success||Fr()}catch(i){console.error("Failed to update status:",i),Fr()}},zr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Dr=()=>{$t&&Rt([]),zt(!$t)},Rr=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Mr=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");tr(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{Ht?(async()=>{try{const r=(null===Me||void 0===Me?void 0:Me.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,v()),fetch(`/api/menu?restaurantId=${r}`,v())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),Zt(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Jt(d.filter(e=>!1!==e.is_available)),s.length>0&&Qt(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(tr([]),Qt(null))},[Ht]);const Wr=e=>{We(e),Le(!0)},qr=()=>{Le(!1),We(null),at(!1),lt(!1),Gt(!1),tr([])},Lr=async e=>{const t=e||Me;if(t){const e=Ie(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void _r("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Ur=e=>{Ge(e),Ve(!0)},Vr=()=>{Ge(null),Ve(!1)},Hr=e=>{Ze(e),Je(!0)},Gr=()=>{Ze(null),Je(!1)},Yr=(e,t)=>{t&&t.stopPropagation(),ot(e),nt(!0)},Jr=e=>(0,g.r6)(e,null===bt||void 0===bt?void 0:bt.operation_settings);return(0,b.jsxs)(a.A,{children:[(0,b.jsx)(je,{}),(null===gr||void 0===gr?void 0:gr.isVisible)&&(0,b.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,b.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,b.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,b.jsx)("button",{onClick:()=>yr(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,b.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,b.jsxs)("strong",{children:["Order ",gr.orderNumber]}),gr.tableNumber&&` (Table ${gr.tableNumber})`,(0,b.jsx)("br",{}),(0,b.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",gr.orderGroup]})," ",gr.itemCount," item",gr.itemCount>1?"s":""," added"]}),(0,b.jsx)("button",{onClick:()=>{Ot(gr.orderNumber),Re("all"),yr(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,b.jsxs)(_,{className:"no-print",children:[(0,b.jsxs)(d.Ay,{title:"Live Orders",children:[$t&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(k,{onClick:async()=>{if(Dt.length<2)return void _r("Please select at least 2 orders to merge","info");Ne.filter(e=>Dt.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?_r("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Lt(!0)},disabled:Dt.length<2||Mt,children:Mt?"Merging...":`Merge (${Dt.length})`}),(0,b.jsx)(F,{active:!1,onClick:Dr,children:"Cancel"})]}),!$t&&(0,b.jsx)(F,{active:$t,onClick:Dr,children:"Select to Merge"}),(0,b.jsx)(w,{enabled:Ft,onClick:()=>kt(!Ft),title:Ft?"Stop notification sound":"Play notification sound",children:Ft?(0,b.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,b.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,b.jsx)("svg",{viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,b.jsxs)(C,{children:[(0,b.jsx)(A,{children:(0,b.jsxs)(S,{children:[(0,b.jsx)(B,{active:"today"===St&&!Tt,onClick:()=>Sr("today"),children:"Today"}),(0,b.jsx)(B,{active:"week"===St&&!Tt,onClick:()=>Sr("week"),children:"Week"}),(0,b.jsx)(B,{active:"month"===St&&!Tt,onClick:()=>Sr("month"),children:"Month"}),(0,b.jsx)(B,{active:"year"===St&&!Tt,onClick:()=>Sr("year"),children:"Year"}),(0,b.jsx)(B,{active:"all"===St&&!Tt,onClick:()=>Sr("all"),children:"All"}),(0,b.jsx)(E,{type:"date",value:Et.start,onChange:e=>Er("start",e.target.value)}),(0,b.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,b.jsx)(E,{type:"date",value:Et.end,onChange:e=>Er("end",e.target.value)}),(0,b.jsxs)("div",{style:{position:"relative",width:"250px",marginLeft:"16px"},children:[(0,b.jsx)("span",{style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",fontSize:"16px",pointerEvents:"none",zIndex:1},children:"\ud83d\udd0d"}),(0,b.jsx)("input",{type:"text",placeholder:"Search orders...",value:Pt,onChange:e=>Ot(e.target.value),style:{width:"100%",padding:"10px 40px 10px 40px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"all 0.2s",boxSizing:"border-box"}}),Pt&&(0,b.jsx)("button",{onClick:()=>Ot(""),title:"Clear search",style:{position:"absolute",right:"8px",top:"50%",transform:"translateY(-50%)",background:"#E5E7EB",border:"none",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"18px",color:"#6B7280",zIndex:2},children:"\xd7"})]}),(0,b.jsx)("button",{onClick:()=>{const e=Br();if(0===e.length)return void _r("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,x.vv)(i.subtotal||e.total_amount||0,Te.currency),(0,x.vv)(i.service_charge||0,Te.currency),(0,x.vv)(i.tax||0,Te.currency),(0,x.vv)(i.discount||0,Te.currency),(0,x.vv)(e.total_amount||0,Te.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${Et.start}_to_${Et.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",style:{padding:"10px",background:"#635BFF",color:"white",border:"none",borderRadius:"8px",cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:"8px"},children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"18px",height:"18px"},children:(0,b.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})}),(0,b.jsxs)(I,{children:[(0,b.jsxs)(T,{active:"all"===De,onClick:()=>Re("all"),children:["All Orders",(0,b.jsx)(N,{children:Or("all")})]}),(0,b.jsxs)(T,{active:"outstanding"===De,onClick:()=>Re("outstanding"),children:["Outstanding",(0,b.jsx)(N,{children:Or("outstanding")})]}),(0,b.jsxs)(T,{active:"pending"===De,onClick:()=>Re("pending"),children:["Pending",(0,b.jsx)(N,{children:Or("pending")})]}),(0,b.jsxs)(T,{active:"preparing"===De,onClick:()=>Re("preparing"),children:["Preparing",(0,b.jsx)(N,{children:Or("preparing")})]}),(0,b.jsxs)(T,{active:"ready"===De,onClick:()=>Re("ready"),children:["Ready",(0,b.jsx)(N,{children:Or("ready")})]}),(0,b.jsxs)(T,{active:"served"===De,onClick:()=>Re("served"),children:["Served",(0,b.jsx)(N,{children:Or("served")})]}),(0,b.jsxs)(T,{active:"completed"===De,onClick:()=>Re("completed"),children:["Completed",(0,b.jsx)(N,{children:Or("completed")})]}),(0,b.jsxs)(T,{active:"cancelled"===De,onClick:()=>Re("cancelled"),children:["Cancelled",(0,b.jsx)(N,{children:Or("cancelled")})]})]}),(0,b.jsx)(P,{children:(()=>{const e=(()=>{const e=Pr().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(O,{children:["Total Sales ",(0,b.jsxs)("strong",{children:["RM",e.totalSales.toFixed(2)]})]}),(0,b.jsxs)(O,{children:["Avg ",(0,b.jsxs)("strong",{children:["RM",e.avgOrderAmount.toFixed(2)]})]}),(0,b.jsxs)(O,{children:["Max ",(0,b.jsxs)("strong",{children:["RM",e.maxOrderAmount.toFixed(2)]})]}),(0,b.jsxs)(O,{children:["\u2265RM20 ",(0,b.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,b.jsxs)(O,{children:["Avg Serve ",(0,b.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,b.jsxs)(O,{children:["Max Serve ",(0,b.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,b.jsxs)(O,{children:["Min Serve ",(0,b.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,b.jsx)($,{children:Pr().length>0?(0,b.jsxs)(m.bQ,{children:[(0,b.jsx)(m.B_,{children:(0,b.jsxs)("tr",{children:[$t&&(0,b.jsx)(m.gU,{align:"center",width:"50px",children:(0,b.jsx)("input",{type:"checkbox",checked:Dt.length>0&&Dt.length===Pr().slice(50*(ut-1),50*ut).filter(e=>Rr(e)).length,onChange:()=>{const e=Pr().slice(50*(ut-1),50*ut).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Dt.length===e.length?Rt([]):Rt(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,b.jsx)(m.gU,{children:"Order"}),(0,b.jsx)(m.gU,{children:"Items"}),(0,b.jsx)(m.gU,{children:"Status"}),(0,b.jsx)(m.gU,{children:"Time"}),(0,b.jsx)(m.gU,{align:"right",children:"Amount"}),(0,b.jsx)(m.gU,{style:{width:"20%",minWidth:"180px"},children:"Action"})]})}),(0,b.jsx)("tbody",{children:Pr().slice(50*(ut-1),50*ut).map(e=>(0,b.jsxs)(m.J2,{style:$t&&Dt.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[$t&&(0,b.jsx)(m.Bv,{align:"center",style:{width:"50px"},children:Rr(e)?(0,b.jsx)("input",{type:"checkbox",checked:Dt.includes(e.id),onChange:()=>{return t=e.id,void Rt(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,b.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,b.jsxs)(m.Bv,{"data-label":"ORDER",children:[(0,b.jsxs)(z,{onClick:()=>Wr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,b.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,b.jsx)(D,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,b.jsx)(D,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,b.jsxs)(R,{children:[e.customer_name||"Guest",e.customer_phone&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("br",{}),(0,b.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("br",{}),(0,b.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?f(e.scheduled_pickup_time):"ASAP"]})]})]})]}),(0,b.jsx)(m.Bv,{"data-label":"ITEMS",children:(0,b.jsx)(M,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,b.jsxs)(W,{children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)(q,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,b.jsx)(L,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,b.jsx)(m.Bv,{"data-label":"STATUS",align:"center",children:(0,b.jsx)(U,{status:Tr(e),children:Nr(Tr(e))})}),(0,b.jsx)(m.Bv,{"data-label":"TIME",align:"center",children:(0,b.jsxs)(V,{children:[Jr(e.createdAt||e.order_date),(0,b.jsx)("br",{}),!e.served_at&&(0,b.jsx)(j,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${_t}`),e.served_at&&(0,b.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Jr(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,b.jsx)(m.Bv,{"data-label":"AMOUNT",align:"right",children:(0,b.jsxs)("div",{style:{textAlign:"right"},children:[(0,b.jsx)(m.DM,{highlight:!0,children:(0,x.vv)(Number(e.total_amount),Te.currency)}),Number(e.points_used)>0&&(0,b.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,b.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,b.jsxs)(H,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,b.jsx)(m.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,b.jsxs)(J,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,b.jsx)(b.Fragment,{children:Ir(e)?(0,b.jsx)(G,{onClick:t=>{t.stopPropagation(),$r(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,b.jsx)(G,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&$r(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:zr(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&!Ir(e)&&(0,b.jsx)(G,{variant:"secondary",onClick:()=>{if("pending"===e.status)$r(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&$r(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,b.jsx)(G,{onClick:t=>Yr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,b.jsx)(G,{onClick:t=>(async(e,t)=>{t.stopPropagation(),kt(!1);try{const t=Ne.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,v({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");t&&"outstanding"===t.status&&await fetch(`/api/orders/${e}/status`,v({method:"PATCH",body:JSON.stringify({status:"pending"})})),Fr()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),$r(e.id,"completed")},title:"Mark as Completed",children:(0,b.jsx)(K,{children:"\u2713"})}),(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),Wr(e)},title:"View Details",children:(0,b.jsx)(K,{children:"\u25c9"})}),(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Me;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Ie(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void _r("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,b.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,b.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,b.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,b.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),Lr(e)},title:"Print Kitchen Ticket",children:(0,b.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,b.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Ie(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void _r("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Lr(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&_r(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,b.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,b.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,b.jsx)(Y,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Ur(e.id):Hr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,b.jsx)(K,{children:"\u2715"})})]})})]},e.id))})]}):(0,b.jsx)(m.ys,{children:"No orders found in this category"})}),(0,b.jsx)(Z,{isOpen:qe,onClick:qr,"data-modal":"order-detail",children:(0,b.jsx)(X,{onClick:e=>e.stopPropagation(),children:Me&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(Q,{children:[(0,b.jsx)(ee,{children:Ht?"Add Items to Order":st?"Receipt Preview":dt?"Kitchen Order Ticket Preview":`Order ${Me.order_number}`}),(0,b.jsx)(te,{onClick:()=>{at(!1),lt(!1),Gt(!1),tr([]),qr()},children:"\xd7"})]}),Ht?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(re,{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,b.jsx)("div",{style:{marginBottom:"20px"},children:(0,b.jsx)("input",{type:"text",placeholder:"Search menu items...",value:ir,onChange:e=>or(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),ir.length>0&&(0,b.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Yt.filter(e=>{if(!e||!e.name)return!1;const t=ir.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,b.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,b.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Mr(e,1,[]),or("")},children:[(0,b.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,b.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,b.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,x.vv)(parseFloat(e.price)||0,Te.currency)}),t&&(0,b.jsx)("button",{onClick:t=>{t.stopPropagation(),lr(e),ar(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Yt.filter(e=>e.name.toLowerCase().includes(ir.toLowerCase())||e.code&&e.code.toLowerCase().includes(ir.toLowerCase())).length&&(0,b.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",er.reduce((e,t)=>e+t.quantity,0),")"]}),0===er.length?(0,b.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,b.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:er.map(e=>(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,b.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,b.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,b.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,b.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,x.vv)(e.unitPrice||parseFloat(e.price),Te.currency)," each"]})]}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,b.jsx)("button",{onClick:()=>{return t=e.cartId,void tr(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,b.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,b.jsx)("button",{onClick:()=>{return t=e.cartId,void tr(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,b.jsx)(ge,{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px"},children:(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,b.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,x.vv)(er.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Te.currency)]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,b.jsx)(G,{onClick:()=>{Gt(!1),tr([]),or(""),qr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,b.jsx)(G,{onClick:async()=>{if(null!==Me&&void 0!==Me&&Me.id&&0!==er.length)try{nr(!0);const e=er.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Me||void 0===Me?void 0:Me.id}/merge-items`,v({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}_r("Items added successfully","success"),Gt(!1),tr([]),or(""),qr(),Fr()}catch(e){console.error("Add items error:",e),_r(e.message||"Failed to add items","error")}finally{nr(!1)}},disabled:0===er.length||rr,style:{background:0===er.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===er.length?"not-allowed":"pointer"},children:rr?"Adding...":"Add to Order"})]})]})})]}):dt?(0,b.jsx)(re,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,b.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ie(),t=Array.isArray(Me.order_items)?Me.order_items:[],r={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],date:new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,orderSource:Me.order_source||"pos",tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,customerName:Me.customer_name||"Walk-in Customer",scheduledPickupTime:Me.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Me.notes||"",takeawayCharge:parseFloat(Me.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,b.jsx)("div",{children:e||"\xa0"},t))})()})}):st?(0,b.jsx)(re,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,b.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ie(),t=Array.isArray(Me.order_items)?Me.order_items:[],r={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],pagerNumber:Me.pager_number||null,date:new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,scheduledPickupTime:Me.scheduled_pickup_time||null,currency:Te.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Me.subtotal||"0"),discount:parseFloat(Me.discount||"0"),discountPolicy:Me.discount_policy_name?{name:Me.discount_policy_name,amount:parseFloat(Me.discount_policy_amount||"0")}:void 0,coupon:Me.coupon_code?{code:Me.coupon_code,discount:parseFloat(Me.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Me.takeaway_charge||"0"),serviceCharge:parseFloat(Me.service_charge||"0"),serviceChargeRate:parseFloat(Me.service_charge_rate||"10"),tax:parseFloat(Me.tax||"0"),taxRate:parseFloat(Me.tax_rate||"6"),total:parseFloat(Me.final_price||Me.total_amount||"0"),paymentMethod:Me.payment_method||"cash",amountReceived:parseFloat(Me.amount_received||"0"),change:parseFloat(Me.change||"0"),deliveryInfo:Me.delivery_info||null,deliveryFee:parseFloat(Me.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,b.jsxs)(re,{children:[(0,b.jsxs)(ne,{children:[(0,b.jsx)(ie,{children:"Customer Information"}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Name:"}),(0,b.jsx)(ae,{children:Me.customer_name||"Guest"})]}),Me.customer_phone&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Phone:"}),(0,b.jsx)(ae,{children:Me.customer_phone})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Order Type:"}),(0,b.jsx)(ae,{children:null===(e=Me.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Source:"}),(0,b.jsx)(ae,{children:"mobile"===Me.source?"Mobile Order":"kiosk"===Me.source?"Kiosk":"POS Terminal"})]}),Me.table_number&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Table Number:"}),(0,b.jsx)(ae,{children:Me.table_number})]}),"pickup"===Me.order_type&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Scheduled Pickup:"}),(0,b.jsx)(ae,{style:{color:"#8B5CF6",fontWeight:600},children:Me.scheduled_pickup_time?f(Me.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Me.order_type&&Me.delivery_info&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(xe,{}),(0,b.jsxs)(ne,{children:[(0,b.jsx)(ie,{children:"Delivery Information"}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Address:"}),(0,b.jsx)(ae,{children:Me.delivery_info.address})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Phone:"}),(0,b.jsx)(ae,{children:Me.delivery_info.phone})]}),Me.delivery_info.zoneName&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Zone:"}),(0,b.jsx)(ae,{children:Me.delivery_info.zoneName})]}),Me.delivery_info.notes&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Notes:"}),(0,b.jsx)(ae,{style:{fontStyle:"italic"},children:Me.delivery_info.notes})]}),Me.delivery_fee>0&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Delivery Fee:"}),(0,b.jsx)(ae,{children:(0,x.vv)(parseFloat(Me.delivery_fee||"0"),Te.currency)})]})]})]}),(0,b.jsx)(xe,{}),(0,b.jsxs)(ne,{children:[(0,b.jsx)(ie,{children:"Order Information"}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Order Time:"}),(0,b.jsx)(ae,{children:Jr(Me.createdAt)})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Status:"}),(0,b.jsx)(ae,{children:(0,b.jsx)(U,{status:Me.status,children:Nr(Me.status)})})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Payment Method:"}),(0,b.jsx)(ae,{children:Me.payment_method||"N/A"})]}),(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Payment Status:"}),(0,b.jsx)(ae,{children:"payment_verification_pending"===Me.payment_status?(0,b.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===Me.payment_status?(0,b.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Me.payment_status?(0,b.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):Me.payment_status||"N/A"})]})]}),Me.payment_proof&&"payment_verification_pending"===Me.payment_status&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(xe,{}),(0,b.jsxs)(ne,{children:[(0,b.jsx)(ie,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),Me.payment_proof.reference&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Transaction Reference:"}),(0,b.jsx)(ae,{style:{fontWeight:600,fontFamily:"monospace"},children:Me.payment_proof.reference})]}),Me.payment_proof.file_name&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Receipt File:"}),(0,b.jsx)(ae,{children:Me.payment_proof.file_name})]}),Me.payment_proof.uploaded_at&&(0,b.jsxs)(oe,{children:[(0,b.jsx)(se,{children:"Submitted At:"}),(0,b.jsx)(ae,{children:Jr(Me.payment_proof.uploaded_at)})]}),Me.payment_proof.image&&(0,b.jsxs)("div",{style:{marginTop:"16px"},children:[(0,b.jsx)(se,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,b.jsx)("div",{style:{position:"relative"},children:(0,b.jsx)("img",{src:Me.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(Me.payment_proof.image,"_blank")})})]})]})]}),(0,b.jsx)(xe,{}),(0,b.jsxs)(ne,{children:[(0,b.jsx)(ie,{children:"Order Items"}),(()=>{const e=Me.order_items&&Array.isArray(Me.order_items)?Me.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,b.jsxs)("div",{children:[i&&(0,b.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,b.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,b.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Me)return;const n=Ie();if(0===t.length)return void _r("No items in this group","error");const i={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,orderSource:Me.order_source||"pos",tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,customerName:Me.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Me.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&_r(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,s;return(0,b.jsxs)(de,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,b.jsxs)(le,{style:{flex:1},children:[(0,b.jsx)(ce,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,b.jsx)(pe,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,b.jsxs)(ue,{children:[(0,b.jsxs)("span",{children:[r.quantity," \xd7 ",(0,x.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),Te.currency)]}),(0,b.jsx)("span",{children:(0,x.vv)(r.quantity*parseFloat(r.price||(null===(s=r.menuItem)||void 0===s?void 0:s.price)||0),Te.currency)})]})]}),"completed"!==Me.payment_status&&e.length>1&&(0,b.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(Me&&(tt({index:t,name:n}),Qe(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,b.jsx)(xe,{}),(0,b.jsxs)(me,{children:[(0,b.jsxs)(he,{children:[(0,b.jsx)("span",{children:"Subtotal"}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.subtotal||Me.total_amount),Te.currency)})]}),Me.takeaway_charge&&parseFloat(Me.takeaway_charge)>0&&(0,b.jsxs)(he,{children:[(0,b.jsx)("span",{children:"Takeaway Charge"}),(0,b.jsx)("span",{children:(0,x.vv)(parseFloat(Me.takeaway_charge),Te.currency)})]}),Me.discount>0&&(0,b.jsxs)(he,{children:[(0,b.jsx)("span",{children:"Discount"}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.discount),Te.currency)})]}),Me.discount_policy_amount>0&&(0,b.jsxs)(he,{children:[(0,b.jsxs)("span",{children:["Discount (",Me.discount_policy_name,")"]}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.discount_policy_amount),Te.currency)})]}),Me.coupon_discount>0&&(0,b.jsxs)(he,{children:[(0,b.jsxs)("span",{children:["Coupon (",Me.coupon_code,")"]}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.coupon_discount),Te.currency)})]}),Number(Me.point_discount)>0&&(0,b.jsxs)(he,{children:[(0,b.jsxs)("span",{children:["Points (",Number(Me.points_used||0).toLocaleString()," pts)"]}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.point_discount),Te.currency)})]}),Me.service_charge>0&&(0,b.jsxs)(he,{children:[(0,b.jsxs)("span",{children:["Service Charge (",Me.service_charge_rate||10,"%)"]}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.service_charge),Te.currency)})]}),Me.tax>0&&(0,b.jsxs)(he,{children:[(0,b.jsxs)("span",{children:["Tax (",Me.tax_rate||6,"%)"]}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.tax),Te.currency)})]}),(0,b.jsxs)(he,{isTotal:!0,children:[(0,b.jsx)("span",{children:"Total"}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.total_amount),Te.currency)})]})]})]}),!Ht&&(0,b.jsx)(ge,{children:st?(0,b.jsx)(G,{onClick:()=>at(!1),children:"Back to Order Details"}):dt?(0,b.jsx)(G,{onClick:()=>lt(!1),children:"Back to Order Details"}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(G,{variant:"secondary",onClick:()=>Ur(Me.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==Me.status&&"completed"!==Me.status&&(0,b.jsx)(G,{onClick:()=>Hr(Me.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Ir(Me)&&"pending"!==Me.status&&(0,b.jsx)(G,{onClick:()=>{$r(Me.id,"pending"),qr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===Me.payment_status&&(0,b.jsx)(G,{onClick:()=>Yr(Me),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Me.payment_status&&(0,b.jsx)(G,{onClick:async()=>{if(Me){kt(!1);try{if(!(await fetch(`/api/orders/${Me.id}`,v({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"outstanding"===Me.status&&await fetch(`/api/orders/${Me.id}/status`,v({method:"PATCH",body:JSON.stringify({status:"pending"})})),qr(),Fr()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===Me.payment_status&&!["served","completed","cancelled"].includes(Me.status)&&(0,b.jsx)(G,{onClick:()=>Gt(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,b.jsx)(G,{onClick:()=>at(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,b.jsx)(G,{onClick:()=>lt(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,b.jsx)(G,{onClick:async()=>{if(Me){const e=Ie(),t={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,date:new Date(Me.order_date||Me.createdAt),items:Me.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Me.subtotal||"0"),discount:parseFloat(Me.discount||"0"),coupon:Me.coupon_code?{code:Me.coupon_code,discount:parseFloat(Me.coupon_discount||"0")}:null,serviceCharge:parseFloat(Me.service_charge||"0"),serviceChargeRate:parseFloat(Me.service_charge_rate||"10"),tax:parseFloat(Me.tax||"0"),taxRate:parseFloat(Me.tax_rate||"6"),total:parseFloat(Me.final_price||Me.total_amount||"0"),paymentMethod:Me.payment_method||"cash",amountReceived:parseFloat(Me.amount_received||"0"),change:parseFloat(Me.change||"0")};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),Me&&i.createPortal((0,b.jsxs)(ve,{id:"bill-print-content",children:[(0,b.jsxs)(_e,{children:[(0,b.jsx)(we,{children:(null===bt||void 0===bt?void 0:bt.companyName)||"Restaurant"}),bt&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:bt.address}),(0,b.jsxs)("div",{style:{fontSize:"11px"},children:[bt.city,", ",bt.state," ",bt.postcode]}),(0,b.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",bt.phone]}),bt.email&&(0,b.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",bt.email]}),bt.taxNo&&(0,b.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",bt.taxNo]})]}),(0,b.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,b.jsxs)(Fe,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Order No:"}),(0,b.jsx)("span",{children:Me.order_number})]}),(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Date:"}),(0,b.jsx)("span",{children:Jr(Me.order_date||Me.createdAt)})]}),(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Customer:"}),(0,b.jsx)("span",{children:Me.customer_name||"Guest"})]}),Me.customer_phone&&(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Phone:"}),(0,b.jsx)("span",{children:Me.customer_phone})]}),(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Order Type:"}),(0,b.jsx)("span",{children:"dine_in"===Me.order_type?"DINE IN":null===(t=Me.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Me.table_number&&(0,b.jsxs)(ke,{children:[(0,b.jsx)("strong",{children:"Table:"}),(0,b.jsx)("span",{children:Me.table_number})]}),("takeaway"===Me.order_type||"pickup"===Me.order_type)&&(0,b.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Me.order_number.split("-")[1]||"000"]}),"pickup"===Me.order_type&&(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Me.scheduled_pickup_time?f(Me.scheduled_pickup_time):"ASAP"]})]}),(0,b.jsx)(Fe,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,b.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,b.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,b.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,b.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,b.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,b.jsx)("tbody",{children:Me.order_items&&Array.isArray(Me.order_items)&&Me.order_items.map((e,t)=>{var r,n,i;return(0,b.jsxs)("tr",{children:[(0,b.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,b.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,b.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,b.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,b.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,b.jsxs)(Fe,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,b.jsxs)(ke,{children:[(0,b.jsx)("span",{children:"Subtotal:"}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.subtotal||Me.total_amount),Te.currency)})]}),Me.discount>0&&(0,b.jsxs)(ke,{children:[(0,b.jsx)("span",{children:"Discount:"}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.discount),Te.currency)})]}),Me.coupon_discount>0&&(0,b.jsxs)(ke,{children:[(0,b.jsxs)("span",{children:["Coupon (",Me.coupon_code,"):"]}),(0,b.jsx)("span",{children:(0,x.vv)(-Number(Me.coupon_discount),Te.currency)})]}),parseFloat(Me.takeaway_charge||0)>0&&(0,b.jsxs)(ke,{children:[(0,b.jsx)("span",{children:"Takeaway Charge:"}),(0,b.jsx)("span",{children:(0,x.vv)(parseFloat(Me.takeaway_charge),Te.currency)})]}),Me.service_charge>0&&(0,b.jsxs)(ke,{children:[(0,b.jsxs)("span",{children:["Service Charge (",Me.service_charge_rate||10,"%):"]}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.service_charge),Te.currency)})]}),Me.tax>0&&(0,b.jsxs)(ke,{children:[(0,b.jsxs)("span",{children:["Tax (",Me.tax_rate||6,"%):"]}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.tax),Te.currency)})]}),(0,b.jsxs)(ke,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,b.jsx)("span",{children:"TOTAL:"}),(0,b.jsx)("span",{children:(0,x.vv)(Number(Me.total_amount),Te.currency)})]})]}),(0,b.jsxs)(Fe,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,b.jsxs)(ke,{children:[(0,b.jsx)("span",{children:"Payment Method:"}),(0,b.jsx)("span",{children:Me.payment_method?Me.payment_method.toUpperCase():"N/A"})]}),(0,b.jsxs)(ke,{children:[(0,b.jsx)("span",{children:"Order Status:"}),(0,b.jsx)("span",{children:Me.status.toUpperCase()})]})]}),(0,b.jsxs)(Ce,{children:[(0,b.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,b.jsx)("div",{children:"Thank you for your purchase!"}),(0,b.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,b.jsx)(Z,{isOpen:Ue,onClick:Vr,"data-modal":"delete-confirm",children:(0,b.jsxs)(X,{onClick:e=>e.stopPropagation(),children:[(0,b.jsxs)(Q,{children:[(0,b.jsx)(ee,{children:"Delete Order"}),(0,b.jsx)(te,{onClick:Vr,children:"\xd7"})]}),(0,b.jsxs)(re,{children:[(0,b.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,b.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",He&&(null===(r=Ne.find(e=>e.id===He))||void 0===r?void 0:r.order_number)]})]}),(0,b.jsxs)(ge,{children:[(0,b.jsx)(G,{variant:"secondary",onClick:Vr,children:"Cancel"}),(0,b.jsx)(G,{onClick:async()=>{if(He){const t=He;Pe(e=>e.filter(e=>e.id!==t)),Ve(!1),Ge(null);try{const e=await fetch(`/api/orders/${t}`,v({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):Fr()}catch(e){console.error("Failed to delete order:",e),Fr()}}else Ve(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,b.jsx)(Z,{isOpen:Ye,onClick:e=>e.target===e.currentTarget&&Gr(),children:(0,b.jsxs)(X,{onClick:e=>e.stopPropagation(),children:[(0,b.jsxs)(Q,{children:[(0,b.jsx)(ee,{children:"Cancel Order"}),(0,b.jsx)(te,{onClick:Gr,children:"\xd7"})]}),(0,b.jsx)(re,{children:(0,b.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,b.jsxs)(ge,{children:[(0,b.jsx)(G,{variant:"secondary",onClick:Gr,children:"No, Keep Order"}),(0,b.jsx)(G,{onClick:async()=>{if(Ke){Pe(e=>e.map(e=>e.id===Ke?{...e,status:"cancelled"}:e)),Je(!1),(null===Me||void 0===Me?void 0:Me.id)===Ke&&qr();try{const e=await fetch(`/api/orders/${Ke}/status`,v({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):Fr()}catch(e){console.error("Failed to cancel order:",e),Fr()}finally{Ze(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),(0,b.jsx)(y.A,{isOpen:Xe,title:"Remove Item",message:`Are you sure you want to remove "${(null===et||void 0===et?void 0:et.name)||""}" from this order?`,onConfirm:async()=>{if(Me&&et)try{const e=await fetch(`/api/orders/${Me.id}/items/${et.index}`,{...v({method:"DELETE"})}),t=await e.json();t.success?(_r(`Item removed: ${et.name}`,"success"),We(t.data),Fr()):_r(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),_r("Failed to remove item","error")}finally{Qe(!1),tt(null)}},onCancel:()=>{Qe(!1),tt(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),rt&&it&&(0,b.jsx)(c.A,{isOpen:rt,onClose:()=>{nt(!1),setTimeout(()=>{ot(null)},100)},total:Number(it.total_amount),subtotal:Number(it.subtotal||it.total_amount||0),tax:Number(it.tax||0),serviceCharge:Number(it.service_charge||0),discountAmount:Number(it.discount||0),couponDiscount:Number(it.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i)=>{if(it){kt(!1);try{const t={payment_status:"completed",payment_method:e};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(it.total_amount)-i);if(!(await fetch(`/api/orders/${it.id}`,v({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===it.status?await fetch(`/api/orders/${it.id}`,v({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===it.status&&await fetch(`/api/orders/${it.id}`,v({method:"PATCH",body:JSON.stringify({status:"completed"})})),nt(!1),ot(null),await Fr(),qe&&(Le(!1),We(null))}catch(o){console.error("\u274c Payment error:",o)}}},paymentMethods:vt,customerId:it.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:Ct}),dr&&(0,b.jsx)(p.A,{isOpen:sr,onClose:()=>{ar(!1),lr(null)},menuItem:{id:dr.id,name:dr.name,price:parseFloat(dr.price)||0,emoji:dr.emoji||"\ud83c\udf7d\ufe0f",image:dr.image,optionGroups:dr.optionGroups},onConfirm:(e,t,r)=>{Mr(dr,e,r),ar(!1),lr(null),or("")}}),(0,b.jsx)(Z,{isOpen:qt,onClick:()=>Lt(!1),"data-modal":"merge-target",children:(0,b.jsxs)(X,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,b.jsxs)(Q,{children:[(0,b.jsx)(ee,{children:"Select Target Order"}),(0,b.jsx)(te,{onClick:()=>Lt(!1),children:"\xd7"})]}),(0,b.jsxs)(re,{children:[(0,b.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,b.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Ne.filter(e=>Dt.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,b.jsxs)("div",{onClick:()=>Vt(e.id),style:{padding:"16px",border:"2px solid "+(Ut===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Ut===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,b.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,b.jsxs)("div",{style:{textAlign:"right"},children:[(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,x.vv)(e.total_amount,Te.currency)}),(0,b.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Ut===e.id&&(0,b.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]}),(0,b.jsxs)(ge,{children:[(0,b.jsx)(G,{onClick:()=>Lt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,b.jsx)(G,{onClick:()=>Ut&&(async e=>{try{Wt(!0),Lt(!1);const t=Dt,r=await fetch("/api/orders/merge",v({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();_r(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),zt(!1),Rt([]),Vt(null),Fr()}catch(t){console.error("Merge error:",t),_r(t.message||"Failed to merge orders","error")}finally{Wt(!1)}})(Ut),disabled:!Ut||Mt,style:{background:Ut?"#635BFF":"#E5E7EB",color:Ut?"white":"#9CA3AF",cursor:Ut?"pointer":"not-allowed"},children:Mt?"Merging...":"Merge Orders"})]})]})})]}),(()=>{const e=Pr().length,t=Math.ceil(e/50);return t>1&&(0,b.jsxs)(Ae,{children:[(0,b.jsxs)(Se,{children:["Showing ",50*(ut-1)+1,"-",Math.min(50*ut,e)," of ",e," orders"]}),(0,b.jsxs)(Be,{children:[(0,b.jsx)(Ee,{onClick:()=>xt(1),disabled:1===ut,children:"First"}),(0,b.jsx)(Ee,{onClick:()=>xt(e=>Math.max(1,e-1)),disabled:1===ut,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||ut<=3?r+1:ut>=t-2?t-4+r:ut-2+r,(0,b.jsx)(Ee,{active:ut===n,onClick:()=>xt(n),children:n},n)}),(0,b.jsx)(Ee,{onClick:()=>xt(e=>Math.min(t,e+1)),disabled:ut===t,children:"Next"}),(0,b.jsx)(Ee,{onClick:()=>xt(t),disabled:ut===t,children:"Last"})]})]})})()]}),i.createPortal((0,b.jsxs)(ye,{isVisible:mr.isVisible,type:mr.type,children:[(0,b.jsx)(be,{children:mr.message}),(0,b.jsx)(fe,{onClick:()=>hr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},7617:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),i=r(9610),o=r(4414);const s=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
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
`,u=e=>{let{isOpen:t,title:r,message:n,onConfirm:u,onCancel:x,confirmText:m="Confirm",cancelText:h="Cancel",type:g="warning"}=e;return t?(0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(a,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:x,children:h}),(0,o.jsx)(p,{variant:"primary",type:g,onClick:u,children:m})]})]})}):null}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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