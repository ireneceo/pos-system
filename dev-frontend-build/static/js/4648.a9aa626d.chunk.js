"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{3781:(e,t,r)=>{r.d(t,{Ay:()=>p});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,s=n.Ay.button`
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
`,d=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    width: 120px;
  }
`,l=n.Ay.div`
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
`,c=n.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid #E6EBF1;
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
`,p=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:p,onDateRangeChange:u,onDownload:x,showDownload:m=!1}=e;return(0,i.jsx)(o,{children:(0,i.jsxs)(a,{children:[(0,i.jsx)(s,{active:"today"===t&&!n,onClick:()=>p("today"),children:"Today"}),(0,i.jsx)(s,{active:"week"===t&&!n,onClick:()=>p("week"),children:"Week"}),(0,i.jsx)(s,{active:"month"===t&&!n,onClick:()=>p("month"),children:"Month"}),(0,i.jsx)(s,{active:"year"===t&&!n,onClick:()=>p("year"),children:"Year"}),(0,i.jsx)(s,{active:"all"===t&&!n,onClick:()=>p("all"),children:"All"}),(0,i.jsxs)(l,{children:[(0,i.jsx)(d,{type:"date",value:r.start,onChange:e=>u("start",e.target.value)}),(0,i.jsx)("span",{children:"to"}),(0,i.jsx)(d,{type:"date",value:r.end,onChange:e=>u("end",e.target.value)})]}),m&&x&&(0,i.jsxs)(c,{onClick:x,children:[(0,i.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,i.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Pe});var n=r(9950),i=r(7119),o=r(4752),a=r(3422),s=r(3310),d=r(8012),l=r(1367),c=r(2966),p=r(9189),u=r(9018),x=r(6038),m=r(2674),h=r(5863),g=r(8406),y=r(7617),b=r(3781),f=r(4414);const v=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},_=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,f.jsx)("span",{style:{fontSize:"12px"},children:r})},w=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,F=o.Ay.button`
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
`,k=o.Ay.button`
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
`,C=o.Ay.button`
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
`,A=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,S=o.Ay.div`
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
`,B=o.Ay.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`,E=o.Ay.input`
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
`,I=o.Ay.button`
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
`,T=o.Ay.button`
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

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background: #E6EBF1;
  }
`,N=o.Ay.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9CA3AF;
`,P=o.Ay.div`
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
`,O=o.Ay.button`
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
`,$=o.Ay.span`
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
`,z=o.Ay.div`
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
`,D=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,R=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,M=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,W=o.Ay.span`
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
`,q=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,L=o.Ay.div`
  line-height: 1.6;
`,U=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,V=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,H=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,G=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"outstanding":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"outstanding":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,Y=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,J=(o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`),K=o.Ay.button`
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
`,Z=o.Ay.button`
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
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,Q=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,ee=(o.Ay.div`
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
`),te=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,re=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ne=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,ie=o.Ay.button`
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
`,oe=o.Ay.div`
  padding: 24px;
`,ae=o.Ay.div`
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
`,de=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`,le=o.Ay.span`
  color: #6B7C93;
`,ce=o.Ay.span`
  font-weight: 500;
`,pe=o.Ay.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,ue=o.Ay.div`
  flex: 1;
`,xe=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,me=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`,he=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`,ge=o.Ay.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`,ye=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,be=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,fe=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`,ve=o.Ay.div`
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
`,je=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,_e=o.Ay.button`
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
`,we=o.Ay.div`
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
`,Fe=o.DU`
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
`,ke=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,Ce=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,Ae=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,Se=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,Be=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Ee=o.Ay.div`
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
`,Ie=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Te=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Ne=o.Ay.button`
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
`,Pe=()=>{var e,t,r;const{user:o}=(0,l.As)(),{getStoreInfo:Pe,operationSettings:Oe}=(0,u.Pj)(),[$e,ze]=(0,n.useState)([]),[De,Re]=(0,n.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[Me,We]=(0,n.useState)({totalSales:0,avgAmount:0,maxAmount:0,orderCount:0}),[,qe]=(0,n.useState)(null),[Le,Ue]=(0,n.useState)("all"),[Ve,He]=(0,n.useState)(null),[Ge,Ye]=(0,n.useState)(!1),[Je,Ke]=(0,n.useState)(!1),[Ze,Xe]=(0,n.useState)(null),[Qe,et]=(0,n.useState)(!1),[tt,rt]=(0,n.useState)(null),[nt,it]=(0,n.useState)(!1),[ot,at]=(0,n.useState)(null),[st,dt]=(0,n.useState)(!1),[lt,ct]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[pt,ut]=(0,n.useState)(!1),[xt,mt]=(0,n.useState)(!1),[ht,gt]=(0,n.useState)(!0),[yt,bt]=(0,n.useState)(1),[ft,vt]=(0,n.useState)(1),[jt,_t]=(0,n.useState)(0),[wt,Ft]=(0,n.useState)(null),[kt,Ct]=(0,n.useState)(null),[At,St]=(0,n.useState)(0),[Bt,Et]=(0,n.useState)(!0),[It,Tt]=(0,n.useState)(null),[Nt,Pt]=(0,n.useState)("today"),[Ot,$t]=(0,n.useState)(()=>{const e=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}}();return{start:e,end:e}}),[zt,Dt]=(0,n.useState)(!1),[Rt,Mt]=(0,n.useState)(""),[Wt,qt]=(0,n.useState)(!1),[Lt,Ut]=(0,n.useState)([]),[Vt,Ht]=(0,n.useState)(!1),[Gt,Yt]=(0,n.useState)(!1),[Jt,Kt]=(0,n.useState)(null),[Zt,Xt]=(0,n.useState)(!1),[Qt,er]=(0,n.useState)([]),[tr,rr]=(0,n.useState)([]),[nr,ir]=(0,n.useState)(null),[or,ar]=(0,n.useState)([]),[sr,dr]=(0,n.useState)(!1),[lr,cr]=(0,n.useState)(""),[pr,ur]=(0,n.useState)(!1),[xr,mr]=(0,n.useState)(null),[hr,gr]=(0,n.useState)({}),[yr,br]=(0,n.useState)(1),[fr,vr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[jr,_r]=(0,n.useState)(null),[wr,Fr]=(0,n.useState)(!1),[kr,Cr]=(0,n.useState)(null),Ar=(0,n.useCallback)(function(e){vr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{vr(e=>({...e,isVisible:!1}))},4e3)},[]),Sr=(0,n.useCallback)(()=>{if(Bt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[Bt]);(0,n.useEffect)(()=>{St(e=>e+1);const e=setInterval(()=>{St(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const Br=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=new URLSearchParams({page:String(e),limit:"100",includeCompleted:"true"});"all"!==Le&&"outstanding"!==Le&&t.append("status",Le),Ot.start&&t.append("startDate",Ot.start),Ot.end&&t.append("endDate",Ot.end),Rt.trim()&&t.append("search",Rt.trim());const r=await fetch(`/api/orders/restaurant/${o.restaurantId}?${t}`,j()),n=await r.json();n.success&&n.data&&(ze(n.data),n.pagination&&(bt(n.pagination.currentPage),vt(n.pagination.totalPages),_t(n.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{gt(!1)}},[null===o||void 0===o?void 0:o.restaurantId,Ot.start,Ot.end,Rt,Le]),Er=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{var e,t;const r=new URLSearchParams;Ot.start&&r.append("startDate",Ot.start),Ot.end&&r.append("endDate",Ot.end);const n=await fetch(`/api/orders/restaurant/${o.restaurantId}/counts?${r}`,j()),i=await n.json();i.success&&null!==(e=i.data)&&void 0!==e&&e.counts&&Re(i.data.counts),i.success&&null!==(t=i.data)&&void 0!==t&&t.statistics&&We(i.data.statistics)}catch(r){console.error("Failed to fetch order counts:",r)}},[null===o||void 0===o?void 0:o.restaurantId,Ot.start,Ot.end]),Ir=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,j()),t=await e.json();t.success&&t.data&&Tt(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),Tr=(0,n.useRef)(Sr);(0,n.useEffect)(()=>{Tr.current=Sr},[Sr]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,a.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),ze(t=>[e,...t]),Re(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),Tr.current()}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),ze(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&Re(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)})}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),ze(e=>{const r=e.find(e=>e.id===t);return r&&Re(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)})}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Tr.current(),_r({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),qe(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{Br(yt)},[Br,yt]),(0,n.useEffect)(()=>{Er()},[Er]),(0,n.useEffect)(()=>{null!==Oe&&void 0!==Oe&&Oe.timeZone&&Nr("today")},[null===Oe||void 0===Oe?void 0:Oe.timeZone]),(0,n.useEffect)(()=>{bt(1)},[Le,Ot.start,Ot.end,Nt]);const Nr=e=>{Pt(e),Dt(!1);const t=(null===Oe||void 0===Oe?void 0:Oe.timeZone)||"Asia/Kuala_Lumpur",r=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},n=r(0);let i;switch(e){case"today":default:i=n;break;case"week":i=r(-6);break;case"month":i=r(-29);break;case"year":i=r(-364);break;case"all":i=r(-1825)}$t({start:i,end:n})},Pr=()=>$e;(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,j()),t=await e.json();if(t.success||e.ok){const e=t.data||t;Ft({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&Ct(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),Ir()},[null===o||void 0===o?void 0:o.restaurantId,Ir]);const Or=e=>"outstanding"===e.status,$r=e=>e.status,zr=e=>"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Dr=()=>{const e=Pr();let t;return t="all"===Le?e:"outstanding"===Le?e.filter(e=>Or(e)):e.filter(e=>e.status===Le),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Rr=e=>De[e]||0,Mr=async function(e,t){var r;let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Et(!1);const i=(new Date).toISOString(),o=null===(r=$e.find(t=>t.id===e))||void 0===r?void 0:r.status;ze(r=>r.map(r=>r.id===e?{...r,status:t,...n&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!r.served_at&&{served_at:i}}:r)),o&&o!==t&&Re(e=>({...e,[o]:Math.max(0,(e[o]||0)-1),[t]:(e[t]||0)+1}));try{const r={status:t};n&&(r.kitchen_ready=!0);const o=$e.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(r.served_at=i);const a=await fetch(`/api/orders/${e}/status`,j({method:"PATCH",body:JSON.stringify(r)}));(await a.json()).success||Br()}catch(a){console.error("Failed to update status:",a),Br()}},Wr=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},qr=()=>{Wt&&Ut([]),qt(!Wt)},Lr=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Ur=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");ar(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{Zt?(async()=>{try{const r=(null===Ve||void 0===Ve?void 0:Ve.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,j()),fetch(`/api/menu?restaurantId=${r}`,j())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),a=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],s=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",a.length),console.log("\ud83d\udce6 Add Items - Items loaded:",s.length),rr(a.filter(e=>!1!==e.is_active));const d=s.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});er(d.filter(e=>!1!==e.is_available)),a.length>0&&ir(String(a[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(ar([]),ir(null))},[Zt]);const Vr=e=>{He(e),Ye(!0)},Hr=()=>{Ye(!1),He(null),ut(!1),mt(!1),Xt(!1),ar([])},Gr=async e=>{const t=e||Ve;if(t){const e=Pe(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void Ar("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Yr=e=>{Xe(e),Ke(!0)},Jr=()=>{Xe(null),Ke(!1)},Kr=e=>{rt(e),et(!0)},Zr=()=>{rt(null),et(!1)},Xr=(e,t)=>{t&&t.stopPropagation(),ct(e),dt(!0)},Qr=e=>(0,g.r6)(e,null===wt||void 0===wt?void 0:wt.operation_settings);return(0,f.jsxs)(s.A,{children:[(0,f.jsx)(Fe,{}),(null===jr||void 0===jr?void 0:jr.isVisible)&&(0,f.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,f.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,f.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,f.jsx)("button",{onClick:()=>_r(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,f.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,f.jsxs)("strong",{children:["Order ",jr.orderNumber]}),jr.tableNumber&&` (Table ${jr.tableNumber})`,(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",jr.orderGroup]})," ",jr.itemCount," item",jr.itemCount>1?"s":""," added"]}),(0,f.jsx)("button",{onClick:()=>{Mt(jr.orderNumber),Ue("all"),_r(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,f.jsxs)(w,{className:"no-print",children:[(0,f.jsxs)(d.Ay,{title:"Live Orders",children:[Wt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(C,{onClick:async()=>{if(Lt.length<2)return void Ar("Please select at least 2 orders to merge","info");$e.filter(e=>Lt.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?Ar("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Yt(!0)},disabled:Lt.length<2||Vt,children:Vt?"Merging...":`Merge (${Lt.length})`}),(0,f.jsx)(k,{active:!1,onClick:qr,children:"Cancel"})]}),!Wt&&(0,f.jsx)(k,{active:Wt,onClick:qr,children:"Select to Merge"}),(0,f.jsx)(F,{enabled:Bt,onClick:()=>Et(!Bt),title:Bt?"Stop notification sound":"Play notification sound",children:Bt?(0,f.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,f.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,f.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,f.jsx)("svg",{viewBox:"0 0 24 24",children:(0,f.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(S,{children:[(0,f.jsx)("div",{children:(0,f.jsx)(b.Ay,{activePeriod:Nt,dateRange:Ot,isCustomDateRange:zt,onPeriodChange:Nr,onDateRangeChange:(e,t)=>{$t(r=>({...r,[e]:t})),Dt(!0),Pt("today")},timezone:null===Oe||void 0===Oe?void 0:Oe.timeZone})}),(0,f.jsxs)(B,{children:[(0,f.jsx)(N,{children:"\ud83d\udd0d"}),(0,f.jsx)(E,{type:"text",placeholder:"Search...",value:Rt,onChange:e=>Mt(e.target.value)}),Rt&&(0,f.jsx)(I,{onClick:()=>Mt(""),title:"Clear search",children:"\xd7"})]}),(0,f.jsx)(T,{onClick:()=>{const e=Pr();if(0===e.length)return void Ar("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,x.vv)(i.subtotal||e.total_amount||0,Oe.currency),(0,x.vv)(i.service_charge||0,Oe.currency),(0,x.vv)(i.tax||0,Oe.currency),(0,x.vv)(i.discount||0,Oe.currency),(0,x.vv)(e.total_amount||0,Oe.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${Ot.start}_to_${Ot.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,f.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),(0,f.jsxs)(P,{children:[(0,f.jsxs)(O,{active:"all"===Le,onClick:()=>Ue("all"),children:["All Orders",(0,f.jsx)($,{children:Rr("all")})]}),(0,f.jsxs)(O,{active:"outstanding"===Le,onClick:()=>Ue("outstanding"),children:["Outstanding",(0,f.jsx)($,{children:Rr("outstanding")})]}),(0,f.jsxs)(O,{active:"pending"===Le,onClick:()=>Ue("pending"),children:["Pending",(0,f.jsx)($,{children:Rr("pending")})]}),(0,f.jsxs)(O,{active:"preparing"===Le,onClick:()=>Ue("preparing"),children:["Preparing",(0,f.jsx)($,{children:Rr("preparing")})]}),(0,f.jsxs)(O,{active:"ready"===Le,onClick:()=>Ue("ready"),children:["Ready",(0,f.jsx)($,{children:Rr("ready")})]}),(0,f.jsxs)(O,{active:"served"===Le,onClick:()=>Ue("served"),children:["Served",(0,f.jsx)($,{children:Rr("served")})]}),(0,f.jsxs)(O,{active:"completed"===Le,onClick:()=>Ue("completed"),children:["Completed",(0,f.jsx)($,{children:Rr("completed")})]}),(0,f.jsxs)(O,{active:"cancelled"===Le,onClick:()=>Ue("cancelled"),children:["Cancelled",(0,f.jsx)($,{children:Rr("cancelled")})]})]}),(0,f.jsx)(z,{children:(()=>{const e=(()=>{const e=Dr().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let a=0,s=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});a=e.reduce((e,t)=>e+t,0)/e.length,s=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:a,maxServeTime:s,minServeTime:d}})();return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(D,{children:["Total Sales ",(0,f.jsxs)("strong",{children:["RM",Me.totalSales.toFixed(2)]})]}),(0,f.jsxs)(D,{children:["Avg ",(0,f.jsxs)("strong",{children:["RM",Me.avgAmount.toFixed(2)]})]}),(0,f.jsxs)(D,{children:["Max ",(0,f.jsxs)("strong",{children:["RM",Me.maxAmount.toFixed(2)]})]}),(0,f.jsxs)(D,{children:["\u2265RM20 ",(0,f.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,f.jsxs)(D,{children:["Avg Serve ",(0,f.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(D,{children:["Max Serve ",(0,f.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(D,{children:["Min Serve ",(0,f.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,f.jsx)(R,{children:Dr().length>0?(0,f.jsxs)(m.bQ,{children:[(0,f.jsx)(m.B_,{children:(0,f.jsxs)("tr",{children:[Wt&&(0,f.jsx)(m.gU,{align:"center",width:"50px",children:(0,f.jsx)("input",{type:"checkbox",checked:Lt.length>0&&Lt.length===Dr().slice(50*(yt-1),50*yt).filter(e=>Lr(e)).length,onChange:()=>{const e=Dr().slice(50*(yt-1),50*yt).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Lt.length===e.length?Ut([]):Ut(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,f.jsx)(m.gU,{children:"Order"}),(0,f.jsx)(m.gU,{children:"Items"}),(0,f.jsx)(m.gU,{children:"Status"}),(0,f.jsx)(m.gU,{children:"Time"}),(0,f.jsx)(m.gU,{align:"right",children:"Amount"}),(0,f.jsx)(m.gU,{style:{width:"20%",minWidth:"180px"},children:"Action"})]})}),(0,f.jsx)("tbody",{children:Dr().slice(50*(yt-1),50*yt).map(e=>(0,f.jsxs)(m.J2,{style:Wt&&Lt.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[Wt&&(0,f.jsx)(m.Bv,{align:"center",style:{width:"50px"},children:Lr(e)?(0,f.jsx)("input",{type:"checkbox",checked:Lt.includes(e.id),onChange:()=>{return t=e.id,void Ut(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,f.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,f.jsxs)(m.Bv,{"data-label":"ORDER",children:[(0,f.jsxs)(M,{onClick:()=>Vr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,f.jsx)(W,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,f.jsx)(W,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,f.jsx)(W,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,f.jsxs)(q,{children:[e.customer_name||"Guest",e.customer_phone&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number]})]}),e.pager_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?v(e.scheduled_pickup_time):"ASAP"]})]}),e.cashier_name&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8898AA",fontSize:"11px"},children:["Cashier: ",e.cashier_name]})]})]})]}),(0,f.jsx)(m.Bv,{"data-label":"ITEMS",children:(0,f.jsx)(L,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,f.jsxs)(U,{children:[(0,f.jsxs)("div",{children:[(0,f.jsxs)(V,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,f.jsx)(H,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,f.jsx)(m.Bv,{"data-label":"STATUS",align:"center",children:(0,f.jsx)(G,{status:$r(e),children:zr($r(e))})}),(0,f.jsx)(m.Bv,{"data-label":"TIME",align:"center",children:(0,f.jsxs)(Y,{children:[Qr(e.createdAt||e.order_date),(0,f.jsx)("br",{}),!e.served_at&&(0,f.jsx)(_,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${At}`),e.served_at&&(0,f.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Qr(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,f.jsx)(m.Bv,{"data-label":"AMOUNT",align:"right",children:(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)(m.DM,{highlight:!0,children:(0,x.vv)(Number(e.total_amount),Oe.currency)}),Number(e.points_used)>0&&(0,f.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,f.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,f.jsxs)(J,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[e.payment_method||"N/A","pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,f.jsx)(m.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,f.jsxs)(X,{children:["completed"!==e.status&&"cancelled"!==e.status&&"served"!==e.status&&(0,f.jsx)(f.Fragment,{children:Or(e)?(0,f.jsx)(K,{onClick:t=>{t.stopPropagation(),Mr(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}):(0,f.jsx)(K,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"completed"===e.payment_status?"completed":"served",served:"completed",completed:null,cancelled:null}[r]||null);var r;t&&Mr(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:void 0,children:Wr(e.status,e.payment_status,e.order_type)})}),"cancelled"!==e.status&&!Or(e)&&(0,f.jsx)(K,{variant:"secondary",onClick:()=>{if("pending"===e.status)Mr(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Mr(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>Xr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>(async(e,t)=>{t.stopPropagation(),Et(!1);try{const t=$e.find(t=>t.id===e);if(!(await fetch(`/api/orders/${e}`,j({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");t&&"outstanding"===t.status&&await fetch(`/api/orders/${e}/status`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})),Br()}catch(r){console.error("Error in quick confirm:",r)}})(e.id,t),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),Mr(e.id,"completed")},title:"Mark as Completed",children:(0,f.jsx)(Q,{children:"\u2713"})}),(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),Vr(e)},title:"View Details",children:(0,f.jsx)(Q,{children:"\u25c9"})}),(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Ve;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Pe(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void Ar("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0")};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),Gr(e)},title:"Print Kitchen Ticket",children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Pe(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void Ar("No items in order","error");const o=i.map(e=>e.order_group||0),a=Math.max(...o);if(0===a)return void Gr(e);const s=i.filter(e=>(e.order_group||0)===a),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=s[0])&&void 0!==r&&r.added_at?new Date(s[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${a}`,items:s.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&Ar(`Kitchen ticket for +Order ${a} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,f.jsx)(Z,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Yr(e.id):Kr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,f.jsx)(Q,{children:"\u2715"})})]})})]},e.id))})]}):(0,f.jsx)(m.ys,{children:"No orders found in this category"})}),(0,f.jsx)(ee,{isOpen:Ge,onClick:Hr,"data-modal":"order-detail",children:(0,f.jsx)(te,{onClick:e=>e.stopPropagation(),children:Ve&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:Zt?"Add Items to Order":pt?"Receipt Preview":xt?"Kitchen Order Ticket Preview":`Order ${Ve.order_number}`}),(0,f.jsx)(ie,{onClick:()=>{ut(!1),mt(!1),Xt(!1),ar([]),Hr()},children:"\xd7"})]}),Zt?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(oe,{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,f.jsx)("div",{style:{marginBottom:"20px"},children:(0,f.jsx)("input",{type:"text",placeholder:"Search menu items...",value:lr,onChange:e=>cr(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),lr.length>0&&(0,f.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Qt.filter(e=>{if(!e||!e.name)return!1;const t=lr.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,f.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Ur(e,1,[]),cr("")},children:[(0,f.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,f.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,x.vv)(parseFloat(e.price)||0,Oe.currency)}),t&&(0,f.jsx)("button",{onClick:t=>{t.stopPropagation(),mr(e),ur(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Qt.filter(e=>e.name.toLowerCase().includes(lr.toLowerCase())||e.code&&e.code.toLowerCase().includes(lr.toLowerCase())).length&&(0,f.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,f.jsxs)("div",{children:[(0,f.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",or.reduce((e,t)=>e+t.quantity,0),")"]}),0===or.length?(0,f.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,f.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:or.map(e=>(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,f.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,f.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,x.vv)(e.unitPrice||parseFloat(e.price),Oe.currency)," each"]})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void ar(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,f.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void ar(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,f.jsx)(fe,{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px"},children:(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,f.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,x.vv)(or.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Oe.currency)]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,f.jsx)(K,{onClick:()=>{Xt(!1),ar([]),cr(""),Hr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(null!==Ve&&void 0!==Ve&&Ve.id&&0!==or.length)try{dr(!0);const e=or.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Ve||void 0===Ve?void 0:Ve.id}/merge-items`,j({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}Ar("Items added successfully","success"),Xt(!1),ar([]),cr(""),Hr(),Br()}catch(e){console.error("Add items error:",e),Ar(e.message||"Failed to add items","error")}finally{dr(!1)}},disabled:0===or.length||sr,style:{background:0===or.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===or.length?"not-allowed":"pointer"},children:sr?"Adding...":"Add to Order"})]})]})})]}):xt?(0,f.jsx)(oe,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(Ve.order_items)?Ve.order_items:[],r={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],date:new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,orderSource:Ve.order_source||"pos",tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,customerName:Ve.customer_name||"Walk-in Customer",scheduledPickupTime:Ve.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Ve.notes||"",takeawayCharge:parseFloat(Ve.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,f.jsx)("div",{children:e||"\xa0"},t))})()})}):pt?(0,f.jsx)(oe,{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Pe(),t=Array.isArray(Ve.order_items)?Ve.order_items:[],r={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],pagerNumber:Ve.pager_number||null,date:new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,scheduledPickupTime:Ve.scheduled_pickup_time||null,currency:Oe.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Ve.subtotal||"0"),discount:parseFloat(Ve.discount||"0"),discountPolicy:Ve.discount_policy_name?{name:Ve.discount_policy_name,amount:parseFloat(Ve.discount_policy_amount||"0")}:void 0,coupon:Ve.coupon_code?{code:Ve.coupon_code,discount:parseFloat(Ve.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Ve.takeaway_charge||"0"),serviceCharge:parseFloat(Ve.service_charge||"0"),serviceChargeRate:parseFloat(Ve.service_charge_rate||"10"),tax:parseFloat(Ve.tax||"0"),taxRate:parseFloat(Ve.tax_rate||"6"),total:parseFloat(Ve.final_price||Ve.total_amount||"0"),paymentMethod:Ve.payment_method||"cash",amountReceived:parseFloat(Ve.amount_received||"0"),change:parseFloat(Ve.change||"0"),deliveryInfo:Ve.delivery_info||null,deliveryFee:parseFloat(Ve.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,f.jsxs)(oe,{children:[(0,f.jsxs)(ae,{children:[(0,f.jsx)(se,{children:"Customer Information"}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Name:"}),(0,f.jsx)(ce,{children:Ve.customer_name||"Guest"})]}),Ve.customer_phone&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Phone:"}),(0,f.jsx)(ce,{children:Ve.customer_phone})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Order Type:"}),(0,f.jsx)(ce,{children:null===(e=Ve.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Source:"}),(0,f.jsx)(ce,{children:"mobile"===Ve.source?"Mobile Order":"kiosk"===Ve.source?"Kiosk":"POS Terminal"})]}),Ve.table_number&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Table Number:"}),(0,f.jsx)(ce,{children:Ve.table_number})]}),"pickup"===Ve.order_type&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Scheduled Pickup:"}),(0,f.jsx)(ce,{style:{color:"#8B5CF6",fontWeight:600},children:Ve.scheduled_pickup_time?v(Ve.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Ve.order_type&&Ve.delivery_info&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ge,{}),(0,f.jsxs)(ae,{children:[(0,f.jsx)(se,{children:"Delivery Information"}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Address:"}),(0,f.jsx)(ce,{children:Ve.delivery_info.address})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Phone:"}),(0,f.jsx)(ce,{children:Ve.delivery_info.phone})]}),Ve.delivery_info.zoneName&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Zone:"}),(0,f.jsx)(ce,{children:Ve.delivery_info.zoneName})]}),Ve.delivery_info.notes&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Notes:"}),(0,f.jsx)(ce,{style:{fontStyle:"italic"},children:Ve.delivery_info.notes})]}),Ve.delivery_fee>0&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Delivery Fee:"}),(0,f.jsx)(ce,{children:(0,x.vv)(parseFloat(Ve.delivery_fee||"0"),Oe.currency)})]})]})]}),(0,f.jsx)(ge,{}),(0,f.jsxs)(ae,{children:[(0,f.jsx)(se,{children:"Order Information"}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Order Time:"}),(0,f.jsx)(ce,{children:Qr(Ve.createdAt)})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Status:"}),(0,f.jsx)(ce,{children:(0,f.jsx)(G,{status:Ve.status,children:zr(Ve.status)})})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Payment Method:"}),(0,f.jsx)(ce,{children:Ve.payment_method||"N/A"})]}),(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Payment Status:"}),(0,f.jsx)(ce,{children:"payment_verification_pending"===Ve.payment_status?(0,f.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===Ve.payment_status?(0,f.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Ve.payment_status?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):Ve.payment_status||"N/A"})]})]}),Ve.payment_proof&&"payment_verification_pending"===Ve.payment_status&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ge,{}),(0,f.jsxs)(ae,{children:[(0,f.jsx)(se,{style:{color:"#F59E0B"},children:"Payment Proof (Customer Submitted)"}),Ve.payment_proof.reference&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Transaction Reference:"}),(0,f.jsx)(ce,{style:{fontWeight:600,fontFamily:"monospace"},children:Ve.payment_proof.reference})]}),Ve.payment_proof.file_name&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Receipt File:"}),(0,f.jsx)(ce,{children:Ve.payment_proof.file_name})]}),Ve.payment_proof.uploaded_at&&(0,f.jsxs)(de,{children:[(0,f.jsx)(le,{children:"Submitted At:"}),(0,f.jsx)(ce,{children:Qr(Ve.payment_proof.uploaded_at)})]}),Ve.payment_proof.image&&(0,f.jsxs)("div",{style:{marginTop:"16px"},children:[(0,f.jsx)(le,{style:{marginBottom:"8px"},children:"Receipt Image:"}),(0,f.jsx)("div",{style:{position:"relative"},children:(0,f.jsx)("img",{src:Ve.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(Ve.payment_proof.image,"_blank")})})]})]})]}),(0,f.jsx)(ge,{}),(0,f.jsxs)(ae,{children:[(0,f.jsx)(se,{children:"Order Items"}),(()=>{const e=Ve.order_items&&Array.isArray(Ve.order_items)?Ve.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,f.jsxs)("div",{children:[i&&(0,f.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,f.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,f.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Ve)return;const n=Pe();if(0===t.length)return void Ar("No items in this group","error");const i={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Ve.order_date||Ve.createdAt),orderType:Ve.order_type,orderSource:Ve.order_source||"pos",tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,customerName:Ve.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Ve.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&Ar(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,a;return(0,f.jsxs)(pe,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,f.jsxs)(ue,{style:{flex:1},children:[(0,f.jsx)(xe,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,f.jsx)(me,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,f.jsxs)(he,{children:[(0,f.jsxs)("span",{children:[r.quantity," \xd7 ",(0,x.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),Oe.currency)]}),(0,f.jsx)("span",{children:(0,x.vv)(r.quantity*parseFloat(r.price||(null===(a=r.menuItem)||void 0===a?void 0:a.price)||0),Oe.currency)})]})]}),"completed"!==Ve.payment_status&&e.length>1&&(0,f.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(Ve&&(at({index:t,name:n}),it(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,f.jsx)(ge,{}),(0,f.jsxs)(ye,{children:[(0,f.jsxs)(be,{children:[(0,f.jsx)("span",{children:"Subtotal"}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.subtotal||Ve.total_amount),Oe.currency)})]}),Ve.takeaway_charge&&parseFloat(Ve.takeaway_charge)>0&&(0,f.jsxs)(be,{children:[(0,f.jsx)("span",{children:"Takeaway Charge"}),(0,f.jsx)("span",{children:(0,x.vv)(parseFloat(Ve.takeaway_charge),Oe.currency)})]}),Ve.discount>0&&(0,f.jsxs)(be,{children:[(0,f.jsx)("span",{children:"Discount"}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.discount),Oe.currency)})]}),Ve.discount_policy_amount>0&&(0,f.jsxs)(be,{children:[(0,f.jsxs)("span",{children:["Discount (",Ve.discount_policy_name,")"]}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.discount_policy_amount),Oe.currency)})]}),Ve.coupon_discount>0&&(0,f.jsxs)(be,{children:[(0,f.jsxs)("span",{children:["Coupon (",Ve.coupon_code,")"]}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.coupon_discount),Oe.currency)})]}),Number(Ve.point_discount)>0&&(0,f.jsxs)(be,{children:[(0,f.jsxs)("span",{children:["Points (",Number(Ve.points_used||0).toLocaleString()," pts)"]}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.point_discount),Oe.currency)})]}),Ve.service_charge>0&&(0,f.jsxs)(be,{children:[(0,f.jsxs)("span",{children:["Service Charge (",Ve.service_charge_rate||10,"%)"]}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.service_charge),Oe.currency)})]}),Ve.tax>0&&(0,f.jsxs)(be,{children:[(0,f.jsxs)("span",{children:["Tax (",Ve.tax_rate||6,"%)"]}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.tax),Oe.currency)})]}),(0,f.jsxs)(be,{isTotal:!0,children:[(0,f.jsx)("span",{children:"Total"}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.total_amount),Oe.currency)})]})]})]}),!Zt&&(0,f.jsx)(fe,{children:pt?(0,f.jsx)(K,{onClick:()=>ut(!1),children:"Back to Order Details"}):xt?(0,f.jsx)(K,{onClick:()=>mt(!1),children:"Back to Order Details"}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:()=>Yr(Ve.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==Ve.status&&"completed"!==Ve.status&&(0,f.jsx)(K,{onClick:()=>Kr(Ve.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),Or(Ve)&&"pending"!==Ve.status&&(0,f.jsx)(K,{onClick:()=>{Mr(Ve.id,"pending"),Hr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===Ve.payment_status&&(0,f.jsx)(K,{onClick:()=>Xr(Ve),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Ve.payment_status&&(0,f.jsx)(K,{onClick:async()=>{if(Ve){Et(!1);try{if(!(await fetch(`/api/orders/${Ve.id}`,j({method:"PATCH",body:JSON.stringify({payment_status:"completed"})}))).ok)throw new Error("Failed to confirm payment");"outstanding"===Ve.status&&await fetch(`/api/orders/${Ve.id}/status`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})),Hr(),Br()}catch(e){console.error("Error confirming payment:",e)}}},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===Ve.payment_status&&!["served","completed","cancelled"].includes(Ve.status)&&(0,f.jsx)(K,{onClick:()=>Xt(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,f.jsx)(K,{onClick:()=>ut(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,f.jsx)(K,{onClick:()=>mt(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,f.jsx)(K,{onClick:async()=>{if(Ve){const e=Pe(),t={orderNumber:Ve.order_number,pickupNumber:Ve.order_number.split("-")[1],tableNumber:Ve.table_number||null,pagerNumber:Ve.pager_number||null,date:new Date(Ve.order_date||Ve.createdAt),items:Ve.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Ve.subtotal||"0"),discount:parseFloat(Ve.discount||"0"),coupon:Ve.coupon_code?{code:Ve.coupon_code,discount:parseFloat(Ve.coupon_discount||"0")}:null,serviceCharge:parseFloat(Ve.service_charge||"0"),serviceChargeRate:parseFloat(Ve.service_charge_rate||"10"),tax:parseFloat(Ve.tax||"0"),taxRate:parseFloat(Ve.tax_rate||"6"),total:parseFloat(Ve.final_price||Ve.total_amount||"0"),paymentMethod:Ve.payment_method||"cash",amountReceived:parseFloat(Ve.amount_received||"0"),change:parseFloat(Ve.change||"0")};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]})})]})})}),Ve&&i.createPortal((0,f.jsxs)(we,{id:"bill-print-content",children:[(0,f.jsxs)(ke,{children:[(0,f.jsx)(Ce,{children:(null===wt||void 0===wt?void 0:wt.companyName)||"Restaurant"}),wt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:wt.address}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:[wt.city,", ",wt.state," ",wt.postcode]}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",wt.phone]}),wt.email&&(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",wt.email]}),wt.taxNo&&(0,f.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",wt.taxNo]})]}),(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,f.jsxs)(Ae,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Order No:"}),(0,f.jsx)("span",{children:Ve.order_number})]}),(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Date:"}),(0,f.jsx)("span",{children:Qr(Ve.order_date||Ve.createdAt)})]}),(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Customer:"}),(0,f.jsx)("span",{children:Ve.customer_name||"Guest"})]}),Ve.customer_phone&&(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Phone:"}),(0,f.jsx)("span",{children:Ve.customer_phone})]}),(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Order Type:"}),(0,f.jsx)("span",{children:"dine_in"===Ve.order_type?"DINE IN":null===(t=Ve.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Ve.table_number&&(0,f.jsxs)(Se,{children:[(0,f.jsx)("strong",{children:"Table:"}),(0,f.jsx)("span",{children:Ve.table_number})]}),("takeaway"===Ve.order_type||"pickup"===Ve.order_type)&&(0,f.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Ve.order_number.split("-")[1]||"000"]}),"pickup"===Ve.order_type&&(0,f.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Ve.scheduled_pickup_time?v(Ve.scheduled_pickup_time):"ASAP"]})]}),(0,f.jsx)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,f.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,f.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,f.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,f.jsx)("tbody",{children:Ve.order_items&&Array.isArray(Ve.order_items)&&Ve.order_items.map((e,t)=>{var r,n,i;return(0,f.jsxs)("tr",{children:[(0,f.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,f.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,f.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,f.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,f.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,f.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(Se,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.subtotal||Ve.total_amount),Oe.currency)})]}),Ve.discount>0&&(0,f.jsxs)(Se,{children:[(0,f.jsx)("span",{children:"Discount:"}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.discount),Oe.currency)})]}),Ve.coupon_discount>0&&(0,f.jsxs)(Se,{children:[(0,f.jsxs)("span",{children:["Coupon (",Ve.coupon_code,"):"]}),(0,f.jsx)("span",{children:(0,x.vv)(-Number(Ve.coupon_discount),Oe.currency)})]}),parseFloat(Ve.takeaway_charge||0)>0&&(0,f.jsxs)(Se,{children:[(0,f.jsx)("span",{children:"Takeaway Charge:"}),(0,f.jsx)("span",{children:(0,x.vv)(parseFloat(Ve.takeaway_charge),Oe.currency)})]}),Ve.service_charge>0&&(0,f.jsxs)(Se,{children:[(0,f.jsxs)("span",{children:["Service Charge (",Ve.service_charge_rate||10,"%):"]}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.service_charge),Oe.currency)})]}),Ve.tax>0&&(0,f.jsxs)(Se,{children:[(0,f.jsxs)("span",{children:["Tax (",Ve.tax_rate||6,"%):"]}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.tax),Oe.currency)})]}),(0,f.jsxs)(Se,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,f.jsx)("span",{children:"TOTAL:"}),(0,f.jsx)("span",{children:(0,x.vv)(Number(Ve.total_amount),Oe.currency)})]})]}),(0,f.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(Se,{children:[(0,f.jsx)("span",{children:"Payment Method:"}),(0,f.jsx)("span",{children:Ve.payment_method?Ve.payment_method.toUpperCase():"N/A"})]}),(0,f.jsxs)(Se,{children:[(0,f.jsx)("span",{children:"Order Status:"}),(0,f.jsx)("span",{children:Ve.status.toUpperCase()})]})]}),(0,f.jsxs)(Be,{children:[(0,f.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,f.jsx)("div",{children:"Thank you for your purchase!"}),(0,f.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),(0,f.jsx)(ee,{isOpen:Je,onClick:Jr,"data-modal":"delete-confirm",children:(0,f.jsxs)(te,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Delete Order"}),(0,f.jsx)(ie,{onClick:Jr,children:"\xd7"})]}),(0,f.jsxs)(oe,{children:[(0,f.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,f.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",Ze&&(null===(r=$e.find(e=>e.id===Ze))||void 0===r?void 0:r.order_number)]})]}),(0,f.jsxs)(fe,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Jr,children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(Ze){const t=Ze;ze(e=>e.filter(e=>e.id!==t)),Ke(!1),Xe(null);try{const e=await fetch(`/api/orders/${t}`,j({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):Br()}catch(e){console.error("Failed to delete order:",e),Br()}}else Ke(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]})]})}),(0,f.jsx)(ee,{isOpen:Qe,onClick:e=>e.target===e.currentTarget&&Zr(),children:(0,f.jsxs)(te,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Cancel Order"}),(0,f.jsx)(ie,{onClick:Zr,children:"\xd7"})]}),(0,f.jsx)(oe,{children:(0,f.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,f.jsxs)(fe,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Zr,children:"No, Keep Order"}),(0,f.jsx)(K,{onClick:async()=>{if(tt){ze(e=>e.map(e=>e.id===tt?{...e,status:"cancelled"}:e)),et(!1),(null===Ve||void 0===Ve?void 0:Ve.id)===tt&&Hr();try{const e=await fetch(`/api/orders/${tt}/status`,j({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):Br()}catch(e){console.error("Failed to cancel order:",e),Br()}finally{rt(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]})]})}),(0,f.jsx)(y.A,{isOpen:nt,title:"Remove Item",message:`Are you sure you want to remove "${(null===ot||void 0===ot?void 0:ot.name)||""}" from this order?`,onConfirm:async()=>{if(Ve&&ot)try{const e=await fetch(`/api/orders/${Ve.id}/items/${ot.index}`,{...j({method:"DELETE"})}),t=await e.json();t.success?(Ar(`Item removed: ${ot.name}`,"success"),He(t.data),Br()):Ar(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),Ar("Failed to remove item","error")}finally{it(!1),at(null)}},onCancel:()=>{it(!1),at(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),st&&lt&&(0,f.jsx)(c.A,{isOpen:st,onClose:()=>{dt(!1),setTimeout(()=>{ct(null)},100)},total:Number(lt.total_amount),subtotal:Number(lt.subtotal||lt.total_amount||0),tax:Number(lt.tax||0),serviceCharge:Number(lt.service_charge||0),discountAmount:Number(lt.discount||0),couponDiscount:Number(lt.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i)=>{if(lt){Et(!1);try{const t={payment_status:"completed",payment_method:e};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(lt.total_amount)-i);if(!(await fetch(`/api/orders/${lt.id}`,j({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===lt.status?await fetch(`/api/orders/${lt.id}`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===lt.status&&await fetch(`/api/orders/${lt.id}`,j({method:"PATCH",body:JSON.stringify({status:"completed"})})),dt(!1),ct(null),await Br(),Ge&&(Ye(!1),He(null))}catch(o){console.error("\u274c Payment error:",o)}}},paymentMethods:kt,customerId:lt.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:It}),xr&&(0,f.jsx)(p.A,{isOpen:pr,onClose:()=>{ur(!1),mr(null)},menuItem:{id:xr.id,name:xr.name,price:parseFloat(xr.price)||0,emoji:xr.emoji||"\ud83c\udf7d\ufe0f",image:xr.image,optionGroups:xr.optionGroups},onConfirm:(e,t,r)=>{Ur(xr,e,r),ur(!1),mr(null),cr("")}}),(0,f.jsx)(ee,{isOpen:Gt,onClick:()=>Yt(!1),"data-modal":"merge-target",children:(0,f.jsxs)(te,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Select Target Order"}),(0,f.jsx)(ie,{onClick:()=>Yt(!1),children:"\xd7"})]}),(0,f.jsxs)(oe,{children:[(0,f.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,f.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:$e.filter(e=>Lt.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,f.jsxs)("div",{onClick:()=>Kt(e.id),style:{padding:"16px",border:"2px solid "+(Jt===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Jt===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,x.vv)(e.total_amount,Oe.currency)}),(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Jt===e.id&&(0,f.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]}),(0,f.jsxs)(fe,{children:[(0,f.jsx)(K,{onClick:()=>Yt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:()=>Jt&&(async e=>{try{Ht(!0),Yt(!1);const t=Lt,r=await fetch("/api/orders/merge",j({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();Ar(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),qt(!1),Ut([]),Kt(null),Br()}catch(t){console.error("Merge error:",t),Ar(t.message||"Failed to merge orders","error")}finally{Ht(!1)}})(Jt),disabled:!Jt||Vt,style:{background:Jt?"#635BFF":"#E5E7EB",color:Jt?"white":"#9CA3AF",cursor:Jt?"pointer":"not-allowed"},children:Vt?"Merging...":"Merge Orders"})]})]})})]}),(()=>{const e=Dr().length,t=Math.ceil(e/50);return t>1&&(0,f.jsxs)(Ee,{children:[(0,f.jsxs)(Ie,{children:["Showing ",50*(yt-1)+1,"-",Math.min(50*yt,e)," of ",e," orders"]}),(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{onClick:()=>bt(1),disabled:1===yt,children:"First"}),(0,f.jsx)(Ne,{onClick:()=>bt(e=>Math.max(1,e-1)),disabled:1===yt,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||yt<=3?r+1:yt>=t-2?t-4+r:yt-2+r,(0,f.jsx)(Ne,{active:yt===n,onClick:()=>bt(n),children:n},n)}),(0,f.jsx)(Ne,{onClick:()=>bt(e=>Math.min(t,e+1)),disabled:yt===t,children:"Next"}),(0,f.jsx)(Ne,{onClick:()=>bt(t),disabled:yt===t,children:"Last"})]})]})})()]}),i.createPortal((0,f.jsxs)(ve,{isVisible:fr.isVisible,type:fr.type,children:[(0,f.jsx)(je,{children:fr.message}),(0,f.jsx)(_e,{onClick:()=>vr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},7617:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),i=r(9610),o=r(4414);const a=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=n.Ay.div`
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
`,u=e=>{let{isOpen:t,title:r,message:n,onConfirm:u,onCancel:x,confirmText:m="Confirm",cancelText:h="Cancel",type:g="warning"}=e;return t?(0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:x,children:h}),(0,o.jsx)(p,{variant:"primary",type:g,onClick:u,children:m})]})]})}):null}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,s=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,i.jsxs)(o,{children:[(0,i.jsx)(a,{children:t}),r&&(0,i.jsx)(s,{children:r})]})}}}]);