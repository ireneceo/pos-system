"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{3781:(e,t,r)=>{r.d(t,{Ay:()=>u});var n=r(8819),i=(r(9950),r(4752)),o=r(4414);const a=i.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,s=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,d=i.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5046e5":"#F6F9FC"};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,l=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  color: ${n.w.colors.secondary};

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    width: 120px;
  }
`,c=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;

  span {
    color: #6B7C93;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
  }
`,p=i.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #E6EBF1;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    justify-content: center;
  }
`,u=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:i,onDateRangeChange:u,onDownload:m,showDownload:x=!1}=e;return(0,o.jsx)(a,{children:(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{active:"today"===t&&!n,onClick:()=>i("today"),children:"Today"}),(0,o.jsx)(d,{active:"week"===t&&!n,onClick:()=>i("week"),children:"Week"}),(0,o.jsx)(d,{active:"month"===t&&!n,onClick:()=>i("month"),children:"Month"}),(0,o.jsx)(d,{active:"year"===t&&!n,onClick:()=>i("year"),children:"Year"}),(0,o.jsx)(d,{active:"all"===t&&!n,onClick:()=>i("all"),children:"All"}),(0,o.jsxs)(c,{children:[(0,o.jsx)(l,{type:"date",value:r.start,onChange:e=>u("start",e.target.value)}),(0,o.jsx)("span",{children:"to"}),(0,o.jsx)(l,{type:"date",value:r.end,onChange:e=>u("end",e.target.value)})]}),x&&m&&(0,o.jsxs)(p,{onClick:m,children:[(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,o.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Ae});var n=r(8819),i=r(9950),o=r(7119),a=r(4752),s=r(3422),d=r(8012),l=r(1367),c=r(2966),p=r(9189),u=r(9018),m=r(6038),x=r(2674),h=r(5863),g=r(8406),y=r(7617),b=r(3781),f=r(4414);const v=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},_=e=>{let{dateString:t}=e;const[r,n]=i.useState("calculating...");return i.useEffect(()=>{const e=()=>{n((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,f.jsx)("span",{style:{fontSize:"12px"},children:r})},w=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,F=a.Ay.button`
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
    color: #5A51E6;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`,k=a.Ay.button`
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
    background: ${e=>e.active?"#5A51E6":"#F9FAFB"};
  }
`,C=a.Ay.button`
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
    background: ${n.w.colors.text.placeholder};
    cursor: not-allowed;
  }
`,A=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,S=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  /* Override DateRangeFilter internal margin */
  & > div:first-child > div {
    margin-bottom: 0 !important;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`,B=a.Ay.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`,E=a.Ay.input`
  width: 100%;
  height: 38px;
  padding: 0 32px 0 36px;
  border: 1px solid ${n.w.colors.border};
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
`,I=a.Ay.button`
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
`,T=a.Ay.button`
  height: 38px;
  width: 38px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: ${n.w.colors.border};
  }
`,N=a.Ay.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9CA3AF;
`,P=a.Ay.div`
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
`,$=a.Ay.button`
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
`,O=a.Ay.span`
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
`,D=a.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid ${n.w.colors.border};
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
`,z=a.Ay.span`
  white-space: nowrap;

  strong {
    color: ${n.w.colors.secondary};
    font-weight: 600;
    margin-left: 4px;
  }
`,R=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,M=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,W=a.Ay.span`
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
`,q=a.Ay.div`
  color: ${n.w.colors.text.secondary};
  font-size: 13px;
  margin-top: 2px;
`,L=a.Ay.div`
  line-height: 1.6;
`,U=a.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,V=a.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,H=a.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,J=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"outstanding":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"outstanding":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,G=a.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,Y=(a.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,a.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`),K=a.Ay.button`
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
`,Q=a.Ay.button`
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
`,Z=a.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,X=a.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: ${n.w.colors.text.secondary};
  display: inline-block;
  line-height: 1;
`,ee=(a.Ay.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`,a.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`),te=a.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${n.w.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,re=a.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,ne=a.Ay.span`
  color: #6B7C93;
`,ie=a.Ay.span`
  font-weight: 500;
`,oe=a.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,ae=a.Ay.div`
  flex: 1;
`,se=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,de=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,le=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,ce=a.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,pe=a.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,ue=a.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,me=a.Ay.div`
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
`,xe=a.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,he=a.Ay.button`
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
`,ge=a.Ay.div`
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
`,ye=a.DU`
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
`,be=a.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,fe=a.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,ve=a.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,je=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,_e=a.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,we=a.Ay.div`
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
`,Fe=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,ke=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Ce=a.Ay.button`
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
`,Ae=()=>{var e,t,r;const{user:n}=(0,l.As)(),{getStoreInfo:a,operationSettings:Ae}=(0,u.Pj)(),[Se,Be]=(0,i.useState)([]),[Ee,Ie]=(0,i.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[Te,Ne]=(0,i.useState)({totalSales:0,avgAmount:0,maxAmount:0,orderCount:0}),[,Pe]=(0,i.useState)(null),[$e,Oe]=(0,i.useState)("all"),[De,ze]=(0,i.useState)(null),[Re,Me]=(0,i.useState)(!1),[We,qe]=(0,i.useState)(!1),[Le,Ue]=(0,i.useState)(null),[Ve,He]=(0,i.useState)(!1),[Je,Ge]=(0,i.useState)(null),[Ye,Ke]=(0,i.useState)(!1),[Qe,Ze]=(0,i.useState)(null),[Xe,et]=(0,i.useState)(!1),[tt,rt]=(0,i.useState)(null),[,]=(0,i.useState)(!1),[,]=(0,i.useState)(null),[nt,it]=(0,i.useState)(!1),[ot,at]=(0,i.useState)(!1),[st,dt]=(0,i.useState)(!0),[lt,ct]=(0,i.useState)(1),[pt,ut]=(0,i.useState)(1),[mt,xt]=(0,i.useState)(0),[ht,gt]=(0,i.useState)(null),[yt,bt]=(0,i.useState)(null),[ft,vt]=(0,i.useState)(0),[jt,_t]=(0,i.useState)(!0),[wt,Ft]=(0,i.useState)(null),[kt,Ct]=(0,i.useState)("today"),[At,St]=(0,i.useState)(()=>{const e=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}}();return{start:e,end:e}}),[Bt,Et]=(0,i.useState)(!1),[It,Tt]=(0,i.useState)(""),[Nt,Pt]=(0,i.useState)(!1),[$t,Ot]=(0,i.useState)([]),[Dt,zt]=(0,i.useState)(!1),[Rt,Mt]=(0,i.useState)(!1),[Wt,qt]=(0,i.useState)(null),[Lt,Ut]=(0,i.useState)(!1),[Vt,Ht]=(0,i.useState)([]),[Jt,Gt]=(0,i.useState)([]),[Yt,Kt]=(0,i.useState)(null),[Qt,Zt]=(0,i.useState)([]),[Xt,er]=(0,i.useState)(!1),[tr,rr]=(0,i.useState)(""),[nr,ir]=(0,i.useState)(!1),[or,ar]=(0,i.useState)(null),[sr,dr]=(0,i.useState)({}),[lr,cr]=(0,i.useState)(1),[pr,ur]=(0,i.useState)({message:"",type:"success",isVisible:!1}),[mr,xr]=(0,i.useState)(null),[hr,gr]=(0,i.useState)(!1),[yr,br]=(0,i.useState)(null),fr=(0,i.useCallback)(function(e){ur({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{ur(e=>({...e,isVisible:!1}))},4e3)},[]),vr=(0,i.useCallback)(()=>{if(jt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[jt]);(0,i.useEffect)(()=>{vt(e=>e+1);const e=setInterval(()=>{vt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const jr=(0,i.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==n&&void 0!==n&&n.restaurantId)try{const t=new URLSearchParams({page:String(e),limit:"100",includeCompleted:"true"});"all"!==$e&&"outstanding"!==$e&&t.append("status",$e),At.start&&t.append("startDate",At.start),At.end&&t.append("endDate",At.end),It.trim()&&t.append("search",It.trim());const r=await fetch(`/api/orders/restaurant/${n.restaurantId}?${t}`,j()),i=await r.json();i.success&&i.data&&(Be(i.data),i.pagination&&(ct(i.pagination.currentPage),ut(i.pagination.totalPages),xt(i.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{dt(!1)}},[null===n||void 0===n?void 0:n.restaurantId,At.start,At.end,It,$e]),_r=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.restaurantId)try{var e,t;const r=new URLSearchParams;At.start&&r.append("startDate",At.start),At.end&&r.append("endDate",At.end);const i=await fetch(`/api/orders/restaurant/${n.restaurantId}/counts?${r}`,j()),o=await i.json();o.success&&null!==(e=o.data)&&void 0!==e&&e.counts&&Ie(o.data.counts),o.success&&null!==(t=o.data)&&void 0!==t&&t.statistics&&Ne(o.data.statistics)}catch(r){console.error("Failed to fetch order counts:",r)}},[null===n||void 0===n?void 0:n.restaurantId,At.start,At.end]),wr=(0,i.useCallback)(async()=>{if(null!==n&&void 0!==n&&n.restaurantId)try{const e=await fetch(`/api/membership/settings/${n.restaurantId}`,j()),t=await e.json();t.success&&t.data&&Ft(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===n||void 0===n?void 0:n.restaurantId]),Fr=(0,i.useRef)(vr);(0,i.useEffect)(()=>{Fr.current=vr},[vr]),(0,i.useEffect)(()=>{if(null===n||void 0===n||!n.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",n.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Be(t=>[e,...t]),Ie(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),Fr.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Be(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&Ie(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)})}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Be(e=>{const r=e.find(e=>e.id===t);return r&&Ie(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)})}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Fr.current(),xr({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),Pe(e),()=>{e.disconnect()}},[null===n||void 0===n?void 0:n.restaurantId]),(0,i.useEffect)(()=>{jr(lt)},[jr,lt]),(0,i.useEffect)(()=>{_r()},[_r]),(0,i.useEffect)(()=>{null!==Ae&&void 0!==Ae&&Ae.timeZone&&kr("today")},[null===Ae||void 0===Ae?void 0:Ae.timeZone]),(0,i.useEffect)(()=>{ct(1)},[$e,At.start,At.end,kt]);const kr=e=>{Ct(e),Et(!1);const t=(null===Ae||void 0===Ae?void 0:Ae.timeZone)||"Asia/Kuala_Lumpur",r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},n=r(0);let i;switch(e){case"today":default:i=n;break;case"week":i=r(-6);break;case"month":i=r(-29);break;case"year":i=r(-364);break;case"all":i=r(-1825)}St({start:i,end:n})},Cr=()=>Se;(0,i.useEffect)(()=>{(async()=>{if(null!==n&&void 0!==n&&n.restaurantId)try{const e=await fetch(`/api/restaurants/${n.restaurantId}`,j()),t=await e.json();if(t.success||e.ok){const e=t.data||t;gt({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&bt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),wr()},[null===n||void 0===n?void 0:n.restaurantId,wr]);const Ar=e=>"outstanding"===e.status,Sr=e=>e.status,Br=e=>"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Er=()=>{const e=Cr();let t;return t="all"===$e?e:"outstanding"===$e?e.filter(e=>Ar(e)):e.filter(e=>e.status===$e),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Ir=e=>Ee[e]||0,Tr=async function(e,t){var r;let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];_t(!1);const i=(new Date).toISOString(),o=null===(r=Se.find(t=>t.id===e))||void 0===r?void 0:r.status;Be(r=>r.map(r=>r.id===e?{...r,status:t,...n&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!r.served_at&&{served_at:i}}:r)),o&&o!==t&&Ie(e=>({...e,[o]:Math.max(0,(e[o]||0)-1),[t]:(e[t]||0)+1}));try{const r={status:t};n&&(r.kitchen_ready=!0);const o=Se.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(r.served_at=i);const a=await fetch(`/api/orders/${e}/status`,j({method:"PATCH",body:JSON.stringify(r)}));(await a.json()).success||jr()}catch(a){console.error("Failed to update status:",a),jr()}},Nr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Pr=()=>{Nt&&Ot([]),Pt(!Nt)},$r=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Or=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");Zt(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,i.useEffect)(()=>{Lt?(async()=>{try{const r=(null===De||void 0===De?void 0:De.restaurant_id)||(null===n||void 0===n?void 0:n.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[i,o]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,j()),fetch(`/api/menu?restaurantId=${r}`,j())]);if(i.ok&&o.ok){var e,t;const r=await i.json(),n=await o.json(),a=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],s=(null===(t=n.data)||void 0===t?void 0:t.items)||n.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",a.length),console.log("\ud83d\udce6 Add Items - Items loaded:",s.length),Gt(a.filter(e=>!1!==e.is_active));const d=s.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Ht(d.filter(e=>!1!==e.is_available)),a.length>0&&Kt(String(a[0].id))}else console.error("Failed to fetch menu - Categories:",i.status,"Items:",o.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(Zt([]),Kt(null))},[Lt]);const Dr=e=>{ze(e),Me(!0)},zr=()=>{Me(!1),ze(null),it(!1),at(!1),Ut(!1),Zt([])},Rr=async e=>{const t=e||De;if(t){const e=a(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void fr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Mr=e=>{Ue(e),qe(!0)},Wr=()=>{Ue(null),qe(!1)},qr=e=>{Ge(e),He(!0)},Lr=()=>{Ge(null),He(!1)},Ur=(e,t)=>{t&&t.stopPropagation(),rt(e),et(!0)},Vr=e=>(0,g.r6)(e,null===ht||void 0===ht?void 0:ht.operation_settings);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ye,{}),(null===mr||void 0===mr?void 0:mr.isVisible)&&(0,f.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,f.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,f.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,f.jsx)("button",{onClick:()=>xr(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,f.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,f.jsxs)("strong",{children:["Order ",mr.orderNumber]}),mr.tableNumber&&` (Table ${mr.tableNumber})`,(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",mr.orderGroup]})," ",mr.itemCount," item",mr.itemCount>1?"s":""," added"]}),(0,f.jsx)("button",{onClick:()=>{Tt(mr.orderNumber),Oe("all"),xr(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,f.jsxs)(w,{className:"no-print",children:[(0,f.jsxs)(d.Ay,{title:"Live Orders",children:[Nt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(C,{onClick:async()=>{if($t.length<2)return void fr("Please select at least 2 orders to merge","info");Se.filter(e=>$t.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?fr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Mt(!0)},disabled:$t.length<2||Dt,children:Dt?"Merging...":`Merge (${$t.length})`}),(0,f.jsx)(k,{active:!1,onClick:Pr,children:"Cancel"})]}),!Nt&&(0,f.jsx)(k,{active:Nt,onClick:Pr,children:"Select to Merge"}),(0,f.jsx)(F,{enabled:jt,onClick:()=>_t(!jt),title:jt?"Stop notification sound":"Play notification sound",children:jt?(0,f.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,f.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,f.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,f.jsx)("svg",{viewBox:"0 0 24 24",children:(0,f.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(S,{children:[(0,f.jsx)("div",{children:(0,f.jsx)(b.Ay,{activePeriod:kt,dateRange:At,isCustomDateRange:Bt,onPeriodChange:kr,onDateRangeChange:(e,t)=>{St(r=>({...r,[e]:t})),Et(!0),Ct("today")},timezone:null===Ae||void 0===Ae?void 0:Ae.timeZone})}),(0,f.jsxs)(B,{children:[(0,f.jsx)(N,{children:"\ud83d\udd0d"}),(0,f.jsx)(E,{type:"text",placeholder:"Search...",value:It,onChange:e=>Tt(e.target.value)}),It&&(0,f.jsx)(I,{onClick:()=>Tt(""),title:"Clear search",children:"\xd7"})]}),(0,f.jsx)(T,{onClick:()=>{const e=Cr();if(0===e.length)return void fr("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,m.vv)(i.subtotal||e.total_amount||0,Ae.currency),(0,m.vv)(i.service_charge||0,Ae.currency),(0,m.vv)(i.tax||0,Ae.currency),(0,m.vv)(i.discount||0,Ae.currency),(0,m.vv)(e.total_amount||0,Ae.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${At.start}_to_${At.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,f.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),(0,f.jsxs)(P,{children:[(0,f.jsxs)($,{active:"all"===$e,onClick:()=>Oe("all"),children:["All Orders",(0,f.jsx)(O,{children:Ir("all")})]}),(0,f.jsxs)($,{active:"outstanding"===$e,onClick:()=>Oe("outstanding"),children:["Outstanding",(0,f.jsx)(O,{children:Ir("outstanding")})]}),(0,f.jsxs)($,{active:"pending"===$e,onClick:()=>Oe("pending"),children:["Pending",(0,f.jsx)(O,{children:Ir("pending")})]}),(0,f.jsxs)($,{active:"preparing"===$e,onClick:()=>Oe("preparing"),children:["Preparing",(0,f.jsx)(O,{children:Ir("preparing")})]}),(0,f.jsxs)($,{active:"ready"===$e,onClick:()=>Oe("ready"),children:["Ready",(0,f.jsx)(O,{children:Ir("ready")})]}),(0,f.jsxs)($,{active:"served"===$e,onClick:()=>Oe("served"),children:["Served",(0,f.jsx)(O,{children:Ir("served")})]}),(0,f.jsxs)($,{active:"completed"===$e,onClick:()=>Oe("completed"),children:["Completed",(0,f.jsx)(O,{children:Ir("completed")})]}),(0,f.jsxs)($,{active:"cancelled"===$e,onClick:()=>Oe("cancelled"),children:["Cancelled",(0,f.jsx)(O,{children:Ir("cancelled")})]})]}),(0,f.jsx)(D,{children:(()=>{const e=(()=>{const e=Er().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let a=0,s=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});a=e.reduce((e,t)=>e+t,0)/e.length,s=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:a,maxServeTime:s,minServeTime:d}})();return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(z,{children:["Total Sales ",(0,f.jsxs)("strong",{children:["RM",Te.totalSales.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["Avg ",(0,f.jsxs)("strong",{children:["RM",Te.avgAmount.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["Max ",(0,f.jsxs)("strong",{children:["RM",Te.maxAmount.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["\u2265RM20 ",(0,f.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,f.jsxs)(z,{children:["Avg Serve ",(0,f.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(z,{children:["Max Serve ",(0,f.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(z,{children:["Min Serve ",(0,f.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,f.jsx)(R,{children:Er().length>0?(0,f.jsxs)(x.bQ,{children:[(0,f.jsx)(x.B_,{children:(0,f.jsxs)("tr",{children:[Nt&&(0,f.jsx)(x.gU,{align:"center",width:"50px",children:(0,f.jsx)("input",{type:"checkbox",checked:$t.length>0&&$t.length===Er().slice(50*(lt-1),50*lt).filter(e=>$r(e)).length,onChange:()=>{const e=Er().slice(50*(lt-1),50*lt).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));$t.length===e.length?Ot([]):Ot(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,f.jsx)(x.gU,{children:"Order"}),(0,f.jsx)(x.gU,{children:"Items"}),(0,f.jsx)(x.gU,{children:"Status"}),(0,f.jsx)(x.gU,{children:"Time"}),(0,f.jsx)(x.gU,{align:"right",children:"Amount"}),(0,f.jsx)(x.gU,{style:{width:"20%",minWidth:"180px"},children:"Action"})]})}),(0,f.jsx)("tbody",{children:Er().slice(50*(lt-1),50*lt).map(e=>(0,f.jsxs)(x.J2,{style:Nt&&$t.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[Nt&&(0,f.jsx)(x.Bv,{align:"center",style:{width:"50px"},children:$r(e)?(0,f.jsx)("input",{type:"checkbox",checked:$t.includes(e.id),onChange:()=>{return t=e.id,void Ot(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,f.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,f.jsxs)(x.Bv,{"data-label":"ORDER",children:[(0,f.jsxs)(M,{onClick:()=>Dr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,f.jsx)(W,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,f.jsx)(W,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,f.jsx)(W,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,f.jsxs)(q,{children:[e.customer_name||"Guest",e.customer_phone&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?v(e.scheduled_pickup_time):"ASAP"]})]}),e.cashier_name&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8898AA",fontSize:"11px"},children:["Cashier: ",e.cashier_name]})]})]})]}),(0,f.jsx)(x.Bv,{"data-label":"ITEMS",children:(0,f.jsx)(L,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,f.jsxs)(U,{children:[(0,f.jsxs)("div",{children:[(0,f.jsxs)(V,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,f.jsx)(H,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,f.jsx)(x.Bv,{"data-label":"STATUS",align:"center",children:(0,f.jsx)(J,{status:Sr(e),children:Br(Sr(e))})}),(0,f.jsx)(x.Bv,{"data-label":"TIME",align:"center",children:(0,f.jsxs)(G,{children:[Vr(e.createdAt||e.order_date),(0,f.jsx)("br",{}),!e.served_at&&(0,f.jsx)(_,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${ft}`),e.served_at&&(0,f.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Vr(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,f.jsx)(x.Bv,{"data-label":"AMOUNT",align:"right",children:(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)(x.DM,{highlight:!0,children:(0,m.vv)(Number(e.total_amount),Ae.currency)}),Number(e.points_used)>0&&(0,f.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,f.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,f.jsxs)(Y,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,f.jsx)(x.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,f.jsxs)(Z,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,f.jsx)(f.Fragment,{children:Ar(e)?(0,f.jsx)(K,{onClick:t=>{t.stopPropagation(),Tr(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,f.jsx)(K,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&Tr(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Nr(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&!Ar(e)&&(0,f.jsx)(K,{variant:"secondary",onClick:()=>{if("pending"===e.status)Tr(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Tr(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>Ur(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>(async(e,t)=>{t.stopPropagation(),_t(!1);try{const t=Se.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,j({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");t&&"outstanding"===t.status&&await fetch(`/api/orders/${e}/status`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})),jr()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),Tr(e.id,"completed")},title:"Mark as Completed",children:(0,f.jsx)(X,{children:"\u2713"})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),Dr(e)},title:"View Details",children:(0,f.jsx)(X,{children:"\u25c9"})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||De;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=a(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void fr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0"),cashierName:r.cashier_name||null};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),Rr(e)},title:"Print Kitchen Ticket",children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=a(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void fr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Rr(e);const d=i.filter(e=>(e.order_group||0)===s),l={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=d[0])&&void 0!==r&&r.added_at?new Date(d[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:d.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(l,n)&&fr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Mr(e.id):qr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,f.jsx)(X,{children:"\u2715"})})]})})]},e.id))})]}):(0,f.jsx)(x.ys,{children:"No orders found in this category"})}),(0,f.jsx)(x.mH,{isOpen:Re,onClick:zr,"data-modal":"order-detail",children:(0,f.jsx)(x.$m,{onClick:e=>e.stopPropagation(),children:De&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(x.rQ,{children:[(0,f.jsx)(x.wt,{children:Lt?"Add Items to Order":nt?"Receipt Preview":ot?"Kitchen Order Ticket Preview":`Order ${De.order_number}`}),(0,f.jsx)(x.Jn,{onClick:()=>{it(!1),at(!1),Ut(!1),Zt([]),zr()},children:"\xd7"})]}),Lt?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(x.cw,{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,f.jsx)("div",{style:{marginBottom:"20px"},children:(0,f.jsx)("input",{type:"text",placeholder:"Search menu items...",value:tr,onChange:e=>rr(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),tr.length>0&&(0,f.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Vt.filter(e=>{if(!e||!e.name)return!1;const t=tr.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,f.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Or(e,1,[]),rr("")},children:[(0,f.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,f.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,m.vv)(parseFloat(e.price)||0,Ae.currency)}),t&&(0,f.jsx)("button",{onClick:t=>{t.stopPropagation(),ar(e),ir(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Vt.filter(e=>e.name.toLowerCase().includes(tr.toLowerCase())||e.code&&e.code.toLowerCase().includes(tr.toLowerCase())).length&&(0,f.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,f.jsxs)("div",{children:[(0,f.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",Qt.reduce((e,t)=>e+t.quantity,0),")"]}),0===Qt.length?(0,f.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,f.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Qt.map(e=>(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,f.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,f.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,m.vv)(e.unitPrice||parseFloat(e.price),Ae.currency)," each"]})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void Zt(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,f.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void Zt(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,f.jsx)(x.jl,{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px"},children:(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,f.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,m.vv)(Qt.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Ae.currency)]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,f.jsx)(K,{onClick:()=>{Ut(!1),Zt([]),rr(""),zr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(null!==De&&void 0!==De&&De.id&&0!==Qt.length)try{er(!0);const e=Qt.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===De||void 0===De?void 0:De.id}/merge-items`,j({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}fr("Items added successfully","success"),Ut(!1),Zt([]),rr(""),zr(),jr()}catch(e){console.error("Add items error:",e),fr(e.message||"Failed to add items","error")}finally{er(!1)}},disabled:0===Qt.length||Xt,style:{background:0===Qt.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===Qt.length?"not-allowed":"pointer"},children:Xt?"Adding...":"Add to Order"})]})]})})]}):ot?(0,f.jsx)(x.cw,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=a(),t=Array.isArray(De.order_items)?De.order_items:[],r={orderNumber:De.order_number,pickupNumber:De.order_number.split("-")[1],date:new Date(De.order_date||De.createdAt),orderType:De.order_type,orderSource:De.order_source||"pos",tableNumber:De.table_number||null,pagerNumber:De.pager_number||null,customerName:De.customer_name||"Walk-in Customer",scheduledPickupTime:De.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:De.notes||"",takeawayCharge:parseFloat(De.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,f.jsx)("div",{children:e||"\xa0"},t))})()})}):nt?(0,f.jsx)(x.cw,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=a(),t=Array.isArray(De.order_items)?De.order_items:[],r={orderNumber:De.order_number,pickupNumber:De.order_number.split("-")[1],pagerNumber:De.pager_number||null,date:new Date(De.order_date||De.createdAt),orderType:De.order_type,scheduledPickupTime:De.scheduled_pickup_time||null,currency:Ae.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(De.subtotal||"0"),discount:parseFloat(De.discount||"0"),discountPolicy:De.discount_policy_name?{name:De.discount_policy_name,amount:parseFloat(De.discount_policy_amount||"0")}:void 0,coupon:De.coupon_code?{code:De.coupon_code,discount:parseFloat(De.coupon_discount||"0")}:null,takeawayCharge:parseFloat(De.takeaway_charge||"0"),serviceCharge:parseFloat(De.service_charge||"0"),serviceChargeRate:parseFloat(De.service_charge_rate||"10"),tax:parseFloat(De.tax||"0"),taxRate:parseFloat(De.tax_rate||"6"),total:parseFloat(De.final_price||De.total_amount||"0"),paymentMethod:De.payment_method||"cash",amountReceived:parseFloat(De.amount_received||"0"),change:parseFloat(De.change||"0"),deliveryInfo:De.delivery_info||null,deliveryFee:parseFloat(De.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,f.jsxs)(x.cw,{children:[(0,f.jsxs)(ee,{children:[(0,f.jsx)(te,{children:"Customer Information"}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Name:"}),(0,f.jsx)(ie,{children:De.customer_name||"Guest"})]}),De.customer_phone&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Phone:"}),(0,f.jsx)(ie,{children:De.customer_phone})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Order Type:"}),(0,f.jsx)(ie,{children:null===(e=De.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Source:"}),(0,f.jsx)(ie,{children:"mobile"===De.source?"Mobile Order":"kiosk"===De.source?"Kiosk":"POS Terminal"})]}),De.table_number&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Table Number:"}),(0,f.jsx)(ie,{children:De.table_number})]}),"pickup"===De.order_type&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Scheduled Pickup:"}),(0,f.jsx)(ie,{style:{color:"#8B5CF6",fontWeight:600},children:De.scheduled_pickup_time?v(De.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===De.order_type&&De.delivery_info&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ce,{}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(te,{children:"Delivery Information"}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Address:"}),(0,f.jsx)(ie,{children:De.delivery_info.address})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Phone:"}),(0,f.jsx)(ie,{children:De.delivery_info.phone})]}),De.delivery_info.zoneName&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Zone:"}),(0,f.jsx)(ie,{children:De.delivery_info.zoneName})]}),De.delivery_info.notes&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Notes:"}),(0,f.jsx)(ie,{style:{fontStyle:"italic"},children:De.delivery_info.notes})]}),De.delivery_fee>0&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Delivery Fee:"}),(0,f.jsx)(ie,{children:(0,m.vv)(parseFloat(De.delivery_fee||"0"),Ae.currency)})]})]})]}),(0,f.jsx)(ce,{}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(te,{children:"Order Information"}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Order Time:"}),(0,f.jsx)(ie,{children:Vr(De.createdAt)})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Status:"}),(0,f.jsx)(ie,{children:(0,f.jsx)(J,{status:De.status,children:Br(De.status)})})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Payment Method:"}),(0,f.jsx)(ie,{children:De.payment_method||"N/A"})]}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Payment Status:"}),(0,f.jsx)(ie,{children:"payment_verification_pending"===De.payment_status?(0,f.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===De.payment_status?(0,f.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===De.payment_status?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):De.payment_status||"N/A"})]})]}),De.payment_proof&&"payment_verification_pending"===De.payment_status&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ce,{}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(te,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),De.payment_proof.reference&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Transaction Reference:"}),(0,f.jsx)(ie,{style:{fontWeight:600,fontFamily:"monospace"},children:De.payment_proof.reference})]}),De.payment_proof.file_name&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Receipt File:"}),(0,f.jsx)(ie,{children:De.payment_proof.file_name})]}),De.payment_proof.uploaded_at&&(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Submitted At:"}),(0,f.jsx)(ie,{children:Vr(De.payment_proof.uploaded_at)})]}),De.payment_proof.image&&(0,f.jsxs)("div",{style:{marginTop:"16px"},children:[(0,f.jsx)(ne,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,f.jsx)("div",{style:{position:"relative"},children:(0,f.jsx)("img",{src:De.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(De.payment_proof.image,"_blank")})})]})]})]}),(0,f.jsx)(ce,{}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(te,{children:"Order Items"}),(()=>{const e=De.order_items&&Array.isArray(De.order_items)?De.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,f.jsxs)("div",{children:[i&&(0,f.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,f.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,f.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!De)return;const n=a();if(0===t.length)return void fr("No items in this group","error");const i={orderNumber:De.order_number,pickupNumber:De.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(De.order_date||De.createdAt),orderType:De.order_type,orderSource:De.order_source||"pos",tableNumber:De.table_number||null,pagerNumber:De.pager_number||null,customerName:De.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:De.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&fr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,a;return(0,f.jsxs)(oe,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,f.jsxs)(ae,{style:{flex:1},children:[(0,f.jsx)(se,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,f.jsx)(de,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,f.jsxs)(le,{children:[(0,f.jsxs)("span",{children:[r.quantity," \xd7 ",(0,m.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),Ae.currency)]}),(0,f.jsx)("span",{children:(0,m.vv)(r.quantity*parseFloat(r.price||(null===(a=r.menuItem)||void 0===a?void 0:a.price)||0),Ae.currency)})]})]}),"completed"!==De.payment_status&&e.length>1&&(0,f.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(De&&(Ze({index:t,name:n}),Ke(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,f.jsx)(ce,{}),(0,f.jsxs)(pe,{children:[(0,f.jsxs)(ue,{children:[(0,f.jsx)("span",{children:"Subtotal"}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.subtotal||De.total_amount),Ae.currency)})]}),De.takeaway_charge&&parseFloat(De.takeaway_charge)>0&&(0,f.jsxs)(ue,{children:[(0,f.jsx)("span",{children:"Takeaway Charge"}),(0,f.jsx)("span",{children:(0,m.vv)(parseFloat(De.takeaway_charge),Ae.currency)})]}),De.discount>0&&(0,f.jsxs)(ue,{children:[(0,f.jsx)("span",{children:"Discount"}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.discount),Ae.currency)})]}),De.discount_policy_amount>0&&(0,f.jsxs)(ue,{children:[(0,f.jsxs)("span",{children:["Discount (",De.discount_policy_name,")"]}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.discount_policy_amount),Ae.currency)})]}),De.coupon_discount>0&&(0,f.jsxs)(ue,{children:[(0,f.jsxs)("span",{children:["Coupon (",De.coupon_code,")"]}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.coupon_discount),Ae.currency)})]}),Number(De.point_discount)>0&&(0,f.jsxs)(ue,{children:[(0,f.jsxs)("span",{children:["Points (",Number(De.points_used||0).toLocaleString()," pts)"]}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.point_discount),Ae.currency)})]}),De.service_charge>0&&(0,f.jsxs)(ue,{children:[(0,f.jsxs)("span",{children:["Service Charge (",De.service_charge_rate||10,"%)"]}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.service_charge),Ae.currency)})]}),De.tax>0&&(0,f.jsxs)(ue,{children:[(0,f.jsxs)("span",{children:["Tax (",De.tax_rate||6,"%)"]}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.tax),Ae.currency)})]}),(0,f.jsxs)(ue,{isTotal:!0,children:[(0,f.jsx)("span",{children:"Total"}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.total_amount),Ae.currency)})]})]})]}),!Lt&&(0,f.jsx)(x.jl,{children:nt?(0,f.jsx)(K,{onClick:()=>it(!1),children:"Back to Order Details"}):ot?(0,f.jsx)(K,{onClick:()=>at(!1),children:"Back to Order Details"}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:()=>Mr(De.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==De.status&&"completed"!==De.status&&(0,f.jsx)(K,{onClick:()=>qr(De.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Ar(De)&&"pending"!==De.status&&(0,f.jsx)(K,{onClick:()=>{Tr(De.id,"pending"),zr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===De.payment_status&&(0,f.jsx)(K,{onClick:()=>Ur(De),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===De.payment_status&&(0,f.jsx)(K,{onClick:async()=>{if(De){_t(!1);try{if(!(await fetch(`/api/orders/${De.id}`,j({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"outstanding"===De.status&&await fetch(`/api/orders/${De.id}/status`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})),zr(),jr()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===De.payment_status&&!["served","completed","cancelled"].includes(De.status)&&(0,f.jsx)(K,{onClick:()=>Ut(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,f.jsx)(K,{onClick:()=>it(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,f.jsx)(K,{onClick:()=>at(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,f.jsx)(K,{onClick:async()=>{if(De){const e=a(),t={orderNumber:De.order_number,pickupNumber:De.order_number.split("-")[1],tableNumber:De.table_number||null,pagerNumber:De.pager_number||null,date:new Date(De.order_date||De.createdAt),items:De.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(De.subtotal||"0"),discount:parseFloat(De.discount||"0"),coupon:De.coupon_code?{code:De.coupon_code,discount:parseFloat(De.coupon_discount||"0")}:null,serviceCharge:parseFloat(De.service_charge||"0"),serviceChargeRate:parseFloat(De.service_charge_rate||"10"),tax:parseFloat(De.tax||"0"),taxRate:parseFloat(De.tax_rate||"6"),total:parseFloat(De.final_price||De.total_amount||"0"),paymentMethod:De.payment_method||"cash",amountReceived:parseFloat(De.amount_received||"0"),change:parseFloat(De.change||"0"),cashierName:De.cashier_name||null};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),De&&o.createPortal((0,f.jsxs)(ge,{id:"bill-print-content",children:[(0,f.jsxs)(be,{children:[(0,f.jsx)(fe,{children:(null===ht||void 0===ht?void 0:ht.companyName)||"Restaurant"}),ht&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:ht.address}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:[ht.city,", ",ht.state," ",ht.postcode]}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",ht.phone]}),ht.email&&(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",ht.email]}),ht.taxNo&&(0,f.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",ht.taxNo]})]}),(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,f.jsxs)(ve,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Order No:"}),(0,f.jsx)("span",{children:De.order_number})]}),(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Date:"}),(0,f.jsx)("span",{children:Vr(De.order_date||De.createdAt)})]}),(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Customer:"}),(0,f.jsx)("span",{children:De.customer_name||"Guest"})]}),De.customer_phone&&(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Phone:"}),(0,f.jsx)("span",{children:De.customer_phone})]}),(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Order Type:"}),(0,f.jsx)("span",{children:"dine_in"===De.order_type?"DINE IN":null===(t=De.order_type)||void 0===t?void 0:t.toUpperCase()})]}),De.table_number&&(0,f.jsxs)(je,{children:[(0,f.jsx)("strong",{children:"Table:"}),(0,f.jsx)("span",{children:De.table_number})]}),("takeaway"===De.order_type||"pickup"===De.order_type)&&(0,f.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",De.order_number.split("-")[1]||"000"]}),"pickup"===De.order_type&&(0,f.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",De.scheduled_pickup_time?v(De.scheduled_pickup_time):"ASAP"]})]}),(0,f.jsx)(ve,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,f.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,f.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,f.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,f.jsx)("tbody",{children:De.order_items&&Array.isArray(De.order_items)&&De.order_items.map((e,t)=>{var r,n,i;return(0,f.jsxs)("tr",{children:[(0,f.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,f.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,f.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,f.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,f.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,f.jsxs)(ve,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(je,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.subtotal||De.total_amount),Ae.currency)})]}),De.discount>0&&(0,f.jsxs)(je,{children:[(0,f.jsx)("span",{children:"Discount:"}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.discount),Ae.currency)})]}),De.coupon_discount>0&&(0,f.jsxs)(je,{children:[(0,f.jsxs)("span",{children:["Coupon (",De.coupon_code,"):"]}),(0,f.jsx)("span",{children:(0,m.vv)(-Number(De.coupon_discount),Ae.currency)})]}),parseFloat(De.takeaway_charge||0)>0&&(0,f.jsxs)(je,{children:[(0,f.jsx)("span",{children:"Takeaway Charge:"}),(0,f.jsx)("span",{children:(0,m.vv)(parseFloat(De.takeaway_charge),Ae.currency)})]}),De.service_charge>0&&(0,f.jsxs)(je,{children:[(0,f.jsxs)("span",{children:["Service Charge (",De.service_charge_rate||10,"%):"]}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.service_charge),Ae.currency)})]}),De.tax>0&&(0,f.jsxs)(je,{children:[(0,f.jsxs)("span",{children:["Tax (",De.tax_rate||6,"%):"]}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.tax),Ae.currency)})]}),(0,f.jsxs)(je,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,f.jsx)("span",{children:"TOTAL:"}),(0,f.jsx)("span",{children:(0,m.vv)(Number(De.total_amount),Ae.currency)})]})]}),(0,f.jsxs)(ve,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(je,{children:[(0,f.jsx)("span",{children:"Payment Method:"}),(0,f.jsx)("span",{children:De.payment_method?De.payment_method.toUpperCase():"N/A"})]}),(0,f.jsxs)(je,{children:[(0,f.jsx)("span",{children:"Order Status:"}),(0,f.jsx)("span",{children:De.status.toUpperCase()})]})]}),(0,f.jsxs)(_e,{children:[(0,f.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,f.jsx)("div",{children:"Thank you for your purchase!"}),(0,f.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,f.jsx)(x.mH,{isOpen:We,onClick:Wr,"data-modal":"delete-confirm",children:(0,f.jsxs)(x.$m,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(x.rQ,{children:[(0,f.jsx)(x.wt,{children:"Delete Order"}),(0,f.jsx)(x.Jn,{onClick:Wr,children:"\xd7"})]}),(0,f.jsxs)(x.cw,{children:[(0,f.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,f.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Le&&(null===(r=Se.find(e=>e.id===Le))||void 0===r?void 0:r.order_number)]})]}),(0,f.jsxs)(x.jl,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Wr,children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(Le){const t=Le;Be(e=>e.filter(e=>e.id!==t)),qe(!1),Ue(null);try{const e=await fetch(`/api/orders/${t}`,j({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):jr()}catch(e){console.error("Failed to delete order:",e),jr()}}else qe(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,f.jsx)(x.mH,{isOpen:Ve,onClick:e=>e.target===e.currentTarget&&Lr(),children:(0,f.jsxs)(x.$m,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(x.rQ,{children:[(0,f.jsx)(x.wt,{children:"Cancel Order"}),(0,f.jsx)(x.Jn,{onClick:Lr,children:"\xd7"})]}),(0,f.jsx)(x.cw,{children:(0,f.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,f.jsxs)(x.jl,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Lr,children:"No, Keep Order"}),(0,f.jsx)(K,{onClick:async()=>{if(Je){Be(e=>e.map(e=>e.id===Je?{...e,status:"cancelled"}:e)),He(!1),(null===De||void 0===De?void 0:De.id)===Je&&zr();try{const e=await fetch(`/api/orders/${Je}/status`,j({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):jr()}catch(e){console.error("Failed to cancel order:",e),jr()}finally{Ge(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),(0,f.jsx)(y.A,{isOpen:Ye,title:"Remove Item",message:`Are you sure you want to remove "${(null===Qe||void 0===Qe?void 0:Qe.name)||""}" from this order?`,onConfirm:async()=>{if(De&&Qe)try{const e=await fetch(`/api/orders/${De.id}/items/${Qe.index}`,{...j({method:"DELETE"})}),t=await e.json();t.success?(fr(`Item removed: ${Qe.name}`,"success"),ze(t.data),jr()):fr(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),fr("Failed to remove item","error")}finally{Ke(!1),Ze(null)}},onCancel:()=>{Ke(!1),Ze(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),Xe&&tt&&(0,f.jsx)(c.A,{isOpen:Xe,onClose:()=>{et(!1),setTimeout(()=>{rt(null)},100)},total:Number(tt.total_amount),subtotal:Number(tt.subtotal||tt.total_amount||0),tax:Number(tt.tax||0),serviceCharge:Number(tt.service_charge||0),discountAmount:Number(tt.discount||0),couponDiscount:Number(tt.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i)=>{if(tt){_t(!1);try{const t={payment_status:"completed",payment_method:e};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(tt.total_amount)-i);if(!(await fetch(`/api/orders/${tt.id}`,j({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===tt.status?await fetch(`/api/orders/${tt.id}`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===tt.status&&await fetch(`/api/orders/${tt.id}`,j({method:"PATCH",body:JSON.stringify({status:"completed"})})),et(!1),rt(null),await jr(),Re&&(Me(!1),ze(null))}catch(o){console.error("\u274c Payment error:",o)}}},paymentMethods:yt,customerId:tt.customer_id||void 0,restaurantId:null!==n&&void 0!==n&&n.restaurantId?Number(n.restaurantId):void 0,membershipSettings:wt}),or&&(0,f.jsx)(p.A,{isOpen:nr,onClose:()=>{ir(!1),ar(null)},menuItem:{id:or.id,name:or.name,price:parseFloat(or.price)||0,emoji:or.emoji||"\ud83c\udf7d\ufe0f",image:or.image,optionGroups:or.optionGroups},onConfirm:(e,t,r)=>{Or(or,e,r),ir(!1),ar(null),rr("")}}),(0,f.jsx)(x.mH,{isOpen:Rt,onClick:()=>Mt(!1),"data-modal":"merge-target",children:(0,f.jsxs)(x.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,f.jsxs)(x.rQ,{children:[(0,f.jsx)(x.wt,{children:"Select Target Order"}),(0,f.jsx)(x.Jn,{onClick:()=>Mt(!1),children:"\xd7"})]}),(0,f.jsxs)(x.cw,{children:[(0,f.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,f.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Se.filter(e=>$t.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,f.jsxs)("div",{onClick:()=>qt(e.id),style:{padding:"16px",border:"2px solid "+(Wt===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Wt===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,m.vv)(e.total_amount,Ae.currency)}),(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Wt===e.id&&(0,f.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]}),(0,f.jsxs)(x.jl,{children:[(0,f.jsx)(K,{onClick:()=>Mt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:()=>Wt&&(async e=>{try{zt(!0),Mt(!1);const t=$t,r=await fetch("/api/orders/merge",j({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();fr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Pt(!1),Ot([]),qt(null),jr()}catch(t){console.error("Merge error:",t),fr(t.message||"Failed to merge orders","error")}finally{zt(!1)}})(Wt),disabled:!Wt||Dt,style:{background:Wt?"#635BFF":"#E5E7EB",color:Wt?"white":"#9CA3AF",cursor:Wt?"pointer":"not-allowed"},children:Dt?"Merging...":"Merge Orders"})]})]})})]}),(()=>{const e=Er().length,t=Math.ceil(e/50);return t>1&&(0,f.jsxs)(we,{children:[(0,f.jsxs)(Fe,{children:["Showing ",50*(lt-1)+1,"-",Math.min(50*lt,e)," of ",e," orders"]}),(0,f.jsxs)(ke,{children:[(0,f.jsx)(Ce,{onClick:()=>ct(1),disabled:1===lt,children:"First"}),(0,f.jsx)(Ce,{onClick:()=>ct(e=>Math.max(1,e-1)),disabled:1===lt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||lt<=3?r+1:lt>=t-2?t-4+r:lt-2+r,(0,f.jsx)(Ce,{active:lt===n,onClick:()=>ct(n),children:n},n)}),(0,f.jsx)(Ce,{onClick:()=>ct(e=>Math.min(t,e+1)),disabled:lt===t,children:"Next"}),(0,f.jsx)(Ce,{onClick:()=>ct(t),disabled:lt===t,children:"Last"})]})]})})()]}),o.createPortal((0,f.jsxs)(me,{isVisible:pr.isVisible,type:pr.type,children:[(0,f.jsx)(xe,{children:pr.message}),(0,f.jsx)(he,{onClick:()=>ur(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},7617:(e,t,r)=>{r.d(t,{A:()=>m});var n=r(8819),i=(r(9950),r(4752)),o=r(9610),a=r(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${n.w.colors.border};
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=i.Ay.button`
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
`,m=e=>{let{isOpen:t,title:r,message:n,onConfirm:i,onCancel:m,confirmText:x="Confirm",cancelText:h="Cancel",type:g="warning"}=e;return t?(0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&m()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(c,{children:n})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:m,children:h}),(0,a.jsx)(u,{variant:"primary",type:g,onClick:i,children:x})]})]})}):null}},8012:(e,t,r)=>{r.d(t,{Ay:()=>l});var n=r(8819),i=(r(9950),r(4752)),o=r(4414);const a=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${n.w.colors.border};
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
`,s=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,d=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:t,children:r}=e;return(0,o.jsxs)(a,{children:[(0,o.jsx)(s,{children:t}),r&&(0,o.jsx)(d,{children:r})]})}}}]);