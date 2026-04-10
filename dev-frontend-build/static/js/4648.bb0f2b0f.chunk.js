"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{512:(e,t,r)=>{r.d(t,{x:()=>B,A:()=>N});var n=r(9950),i=r(4752),o=r(5030),s=r(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),u=i.Ay.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`,m=i.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #E6EBF1;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`,h=i.Ay.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F3F4F6;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F6F9FC;
    border-radius: 8px;
  }
`,g=i.Ay.div``,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,v=i.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,b=i.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=i.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=i.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,_=i.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=i.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,C=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${e=>e.$isStart||e.$isEnd?"#FFFFFF":e.$isInRange?"#635BFF":"#374151"};
  background: ${e=>e.$isStart||e.$isEnd?"#635BFF":e.$isInRange?"#F0EEFF":"transparent"};
  font-weight: ${e=>e.$isStart||e.$isEnd||e.$isToday?700:400};

  ${e=>e.$isToday&&!e.$isStart&&!e.$isEnd&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 4px;\n      width: 4px;\n      height: 4px;\n      border-radius: 50%;\n      background: #635BFF;\n    }\n  "}

  ${e=>e.$isHoverEnd&&!e.$isStart&&!e.$isEnd&&"\n    background: #E8E5FF;\n    color: #635BFF;\n  "}

  &:hover {
    ${e=>!e.$isStart&&!e.$isEnd&&`\n      background: ${e.$isInRange?"#E8E5FF":"#F3F4F6"};\n    `}
  }
`,S=e=>{let{startDate:t,endDate:r,onRangeSelect:i,onClose:S,isOpen:E}=e;const{t:B}=(0,o.Bd)("common"),O=new Date,[P,I]=(0,n.useState)(O.getMonth()),[$,T]=(0,n.useState)(O.getFullYear()),[N,D]=(0,n.useState)(null),[z,R]=(0,n.useState)(null),[M,W]=(0,n.useState)(null),[L,q]=(0,n.useState)("start"),U=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&D(l(t)),r&&R(l(r))},[t,r]),(0,n.useEffect)(()=>{E&&q("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&S()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,S]);const H=(0,n.useCallback)(()=>{0===P?(I(11),T(e=>e-1)):I(e=>e-1)},[P]),Y=(0,n.useCallback)(()=>{11===P?(I(0),T(e=>e+1)):I(e=>e+1)},[P]),V=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),o=[];for(let i=0;i<n;i++)o.push(null);for(let i=1;i<=r;i++)o.push(new Date(e,t,i));return(0,s.jsxs)(j,{children:[(0,s.jsx)(_,{children:p(e,t)}),(0,s.jsx)(F,{children:a.map(e=>(0,s.jsx)(w,{children:e},e))}),(0,s.jsx)(k,{children:o.map((e,t)=>{if(!e)return(0,s.jsx)(C,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:o,isHoverEnd:a}=(e=>{const t=N&&c(e,N),r=z&&c(e,z),n="end"===L&&M?M:z;let i=!1;if(N&&n){const[t,r]=N<=n?[N,n]:[n,N];i=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:i,isHoverEnd:"end"===L&&M&&c(e,M)}})(e),l=c(e,O);return(0,s.jsx)(A,{$isStart:!!r,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!a,$isToday:l,onClick:()=>(e=>{if("start"===L)D(e),R(null),q("end");else{let t=N,r=e;r<t&&([t,r]=[r,t]),D(t),R(r),q("start"),i(d(t),d(r)),setTimeout(S,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},G=11===P?0:P+1,J=11===P?$+1:$,K=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}D(r),R(n),q("start"),i(d(r),d(n)),setTimeout(S,150)};return E?(0,s.jsx)(u,{ref:U,children:(0,s.jsxs)(m,{children:[(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{onClick:()=>K("this_week"),children:"This Week"}),(0,s.jsx)(h,{onClick:()=>K("this_month"),children:"This Month"}),(0,s.jsx)(h,{onClick:()=>K("this_year"),children:"This Year"})]}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(y,{children:[(0,s.jsx)(v,{onClick:H,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(v,{onClick:Y,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(b,{children:[V($,P),(0,s.jsx)(f,{children:V(J,G)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,B=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,i]=t.split("-").map(Number);return new Date(r,n-1,i)}catch{return new Date}})(t);let n=new Date(r);const i=new Date(r);switch(e){case"today":break;case"yesterday":n.setDate(r.getDate()-1),i.setDate(r.getDate()-1);break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(i)}},O=i.Ay.div`
  margin-bottom: 24px;
`,P=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,I=i.Ay.button`
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

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,$=i.Ay.div`
  position: relative;
  display: inline-block;
`,T=i.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${e=>e.active?"#F0EEFF":"#FFFFFF"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`,N=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:i,onPeriodChange:a,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,o.Bd)("common"),[u,m]=(0,n.useState)(!1),x=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],h={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(O,{children:(0,s.jsxs)(P,{children:[x.map(e=>(0,s.jsx)(I,{active:t===e&&!i,onClick:()=>a(e),children:h[e]},e)),(0,s.jsxs)($,{children:[(0,s.jsxs)(T,{active:i,onClick:()=>m(!u),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)(S,{isOpen:u,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{d(e,t),m(!1)},onClose:()=>m(!1)})]}),c]})})}},4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>$e});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(8012),d=r(1367),l=r(2966),c=r(9189),p=r(9018),u=r(6038),m=r(8285),x=r(8409),h=r(5863),g=r(8406),y=r(7617),v=r(512),b=r(3577),f=r(5030),j=r(9955),_=r(4414);const F=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},w=e=>e?e.hasOwnProperty("current")?e.current:e:null,k=e=>e&&e.hasOwnProperty("history")&&e.history||[],C=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=(0,j.c4)();return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},A=e=>{let{dateString:t}=e;const{t:r}=(0,f.Bd)("orders"),[i,o]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{o((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,_.jsx)("span",{style:{fontSize:"12px"},children:i})},S=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,E=o.Ay.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${e=>e.enabled?"#635BFF":"#E6EBF1"};

  img {
    width: 22px;
    height: 22px;
    filter: ${e=>e.enabled?"invert(1)":"opacity(0.4)"};
  }

  &:hover {
    opacity: 0.85;
  }
`,B=o.Ay.button`
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
`,O=o.Ay.button`
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
`,P=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,I=o.Ay.div`
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
`,$=o.Ay.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`,T=o.Ay.input`
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
`,D=o.Ay.button`
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
`,R=o.Ay.div`
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
`,M=o.Ay.button`
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
`,W=o.Ay.span`
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
`,L=o.Ay.div`
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
`,q=o.Ay.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`,U=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`,H=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`,Y=o.Ay.span`
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
`,V=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,G=o.Ay.div`
  line-height: 1.6;
`,J=o.Ay.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,K=o.Ay.span`
  color: #6B7C93;
  margin-right: 8px;
`,Q=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,Z=o.Ay.span`
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
`,ee=o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`,te=o.Ay.button`
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
`,re=(0,o.Ay)(x.yl)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`,ne=(0,o.Ay)(x.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`,ie=o.Ay.button`
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
`,oe=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,se=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,ae=o.Ay.div`
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
`,me=o.Ay.div`
  flex: 1;
`,xe=o.Ay.div`
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
`,ve=o.Ay.div`
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
`,Fe=o.Ay.div`
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
`,we=o.DU`
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
`,Ee=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,Be=o.Ay.div`
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
`,Oe=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Pe=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Ie=o.Ay.button`
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
`,$e=()=>{var e,t,o;const{t:$e}=(0,f.Bd)("orders"),{user:Te}=(0,d.As)(),{getStoreInfo:Ne,operationSettings:De,paymentSettings:ze}=(0,p.Pj)(),[Re,Me]=(0,n.useState)([]),[We,Le]=(0,n.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[qe,Ue]=(0,n.useState)({totalSales:0,avgAmount:0,maxAmount:0,orderCount:0}),[He,Ye]=(0,n.useState)(20),[,Ve]=(0,n.useState)(null),[Ge,Je]=(0,n.useState)("all"),[Ke,Qe]=(0,n.useState)(null),[Ze,Xe]=(0,n.useState)(!1),[et,tt]=(0,n.useState)(!1),[rt,nt]=(0,n.useState)(null),[it,ot]=(0,n.useState)(!1),[st,at]=(0,n.useState)(null),[dt,lt]=(0,n.useState)(!1),[ct,pt]=(0,n.useState)(null),[ut,mt]=(0,n.useState)(!1),[xt,ht]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[gt,yt]=(0,n.useState)(!1),[vt,bt]=(0,n.useState)(!1),[ft,jt]=(0,n.useState)(!0),[_t,Ft]=(0,n.useState)(1),[wt,kt]=(0,n.useState)(1),[Ct,At]=(0,n.useState)(0),[St,Et]=(0,n.useState)(null),[Bt,Ot]=(0,n.useState)({receiptLogo:"",footerMessage:"",showMembership:!1,customQrImage:"",customQrText:"",customQrPosition:"back"}),[Pt,It]=(0,n.useState)(null),[$t,Tt]=(0,n.useState)(0),[Nt,Dt]=(0,n.useState)(()=>"false"!==localStorage.getItem("sound_enabled")),[zt,Rt]=(0,n.useState)(null),[Mt,Wt]=(0,n.useState)("today"),[Lt,qt]=(0,n.useState)(()=>(0,v.x)("today",De.timeZone)),[Ut,Ht]=(0,n.useState)(!1),[Yt,Vt]=(0,n.useState)(""),[Gt,Jt]=(0,n.useState)(!1),[Kt,Qt]=(0,n.useState)(null),[Zt,Xt]=(0,n.useState)(!1),[er,tr]=(0,n.useState)([]),[rr,nr]=(0,n.useState)(!1),[ir,or]=(0,n.useState)(!1),[sr,ar]=(0,n.useState)(null),[dr,lr]=(0,n.useState)(!1),[cr,pr]=(0,n.useState)([]),[,ur]=(0,n.useState)([]),[,mr]=(0,n.useState)(null),[xr,hr]=(0,n.useState)([]),[gr,yr]=(0,n.useState)(!1),[vr,br]=(0,n.useState)(""),[fr,jr]=(0,n.useState)(!1),[_r,Fr]=(0,n.useState)(null),[wr,kr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[Cr,Ar]=(0,n.useState)(null),Sr=(0,n.useCallback)(function(e){kr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{kr(e=>({...e,isVisible:!1}))},4e3)},[]),Er=(0,n.useCallback)(()=>{Nt&&r.e(2283).then(r.bind(r,2283)).then(e=>{let{startRepeatingSound:t}=e;t("bell",3e3)})},[Nt]),Br=(0,n.useCallback)(()=>{r.e(2283).then(r.bind(r,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[]);(0,n.useEffect)(()=>{Nt||r.e(2283).then(r.bind(r,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[Nt]),(0,n.useEffect)(()=>{Tt(e=>e+1);const e=setInterval(()=>{Tt(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const Or=(0,n.useCallback)(async()=>{if(null!==Te&&void 0!==Te&&Te.restaurantId)try{const e=new URLSearchParams({page:"1",limit:"1000",includeCompleted:"true"});"all"!==Ge&&"outstanding"!==Ge&&e.append("status",Ge),Lt.start&&e.append("startDate",Lt.start),Lt.end&&e.append("endDate",Lt.end),Yt.trim()&&e.append("search",Yt.trim());const t=await fetch(`/api/orders/restaurant/${Te.restaurantId}?${e}`,C()),r=await t.json();r.success&&r.data&&(Me(r.data),r.pagination&&(Ft(r.pagination.currentPage),kt(r.pagination.totalPages),At(r.pagination.totalCount)))}catch(e){console.error("Failed to fetch orders:",e)}finally{jt(!1)}},[null===Te||void 0===Te?void 0:Te.restaurantId,Lt.start,Lt.end,Yt,Ge]),Pr=(0,n.useCallback)(async()=>{if(null!==Te&&void 0!==Te&&Te.restaurantId)try{var e,t;const r=new URLSearchParams;Lt.start&&r.append("startDate",Lt.start),Lt.end&&r.append("endDate",Lt.end);const n=await fetch(`/api/orders/restaurant/${Te.restaurantId}/counts?${r}`,C()),i=await n.json();i.success&&null!==(e=i.data)&&void 0!==e&&e.counts&&Le(i.data.counts),i.success&&null!==(t=i.data)&&void 0!==t&&t.statistics&&Ue(i.data.statistics)}catch(r){console.error("Failed to fetch order counts:",r)}},[null===Te||void 0===Te?void 0:Te.restaurantId,Lt.start,Lt.end]),Ir=(0,n.useCallback)(async()=>{if(null!==Te&&void 0!==Te&&Te.restaurantId)try{const e=await fetch(`/api/membership/settings/${Te.restaurantId}`,C()),t=await e.json();t.success&&t.data&&Rt(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===Te||void 0===Te?void 0:Te.restaurantId]),$r=(0,n.useRef)(null);(0,n.useEffect)(()=>{if(null===Te||void 0===Te||!Te.restaurantId)return;const e=(0,s.io)("/checkout-display",{transports:["websocket","polling"]});return e.on("connect",()=>e.emit("join-restaurant",Te.restaurantId)),$r.current=e,()=>{e.disconnect()}},[null===Te||void 0===Te?void 0:Te.restaurantId]);const Tr=(0,n.useRef)(Er),Nr=(0,n.useRef)(Pr);(0,n.useEffect)(()=>{Tr.current=Er},[Er]),(0,n.useEffect)(()=>{Nr.current=Pr},[Pr]),(0,n.useEffect)(()=>{if(null===Te||void 0===Te||!Te.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",Te.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Me(t=>[e,...t]),Le(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),Tr.current(),Nr.current(),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Me(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&Le(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)}),Nr.current(),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Me(e=>{const r=e.find(e=>e.id===t);return r&&Le(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)}),Nr.current(),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),Tr.current(),Nr.current(),Ar({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),Ve(e),()=>{e.disconnect()}},[null===Te||void 0===Te?void 0:Te.restaurantId]),(0,n.useEffect)(()=>{Or()},[Or]),(0,n.useEffect)(()=>{Pr()},[Pr]),(0,n.useEffect)(()=>{Ft(1)},[Ge,Lt.start,Lt.end,Mt]);const Dr=()=>Re;(0,n.useEffect)(()=>{(async()=>{if(null!==Te&&void 0!==Te&&Te.restaurantId)try{const e=await fetch(`/api/restaurants/${Te.restaurantId}`,C()),t=await e.json();if(t.success||e.ok){const e=t.data||t;Et({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||"",slug:e.slug||""});const r=e.printer_settings;null!==r&&void 0!==r&&r.receiptSettings&&Ot(e=>({...e,...r.receiptSettings})),e.payment_settings&&It(e.payment_settings);const n="string"===typeof e.operation_settings?JSON.parse(e.operation_settings):e.operation_settings;null!==n&&void 0!==n&&n.salesThreshold&&Ye(n.salesThreshold)}}catch(e){console.error("Failed to load company info:",e)}})(),Ir()},[null===Te||void 0===Te?void 0:Te.restaurantId,Ir]);const zr=e=>"outstanding"===e.status,Rr=e=>"rejected"===e.payment_status?"rejected":"payment_verification_pending"===e.payment_status?"verifying":e.status,Mr=e=>"rejected"===e?"Payment Rejected":"verifying"===e?"Verifying Payment":"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),Wr=()=>{const e=Dr();let t;return t="all"===Ge?e:"outstanding"===Ge?e.filter(e=>zr(e)):e.filter(e=>e.status===Ge),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},Lr=e=>We[e]||0,qr=async function(e,t){var r;let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Br();const i=(new Date).toISOString(),o=null===(r=Re.find(t=>t.id===e))||void 0===r?void 0:r.status;Me(r=>r.map(r=>r.id===e?{...r,status:t,...n&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!r.served_at&&{served_at:i}}:r)),o&&o!==t&&Le(e=>({...e,[o]:Math.max(0,(e[o]||0)-1),[t]:(e[t]||0)+1}));try{const r={status:t};n&&(r.kitchen_ready=!0);const o=Re.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(r.served_at=i);const s=await fetch(`/api/orders/${e}/status`,C({method:"PATCH",body:JSON.stringify(r)}));(await s.json()).success?window.dispatchEvent(new Event("refreshBadgeCounts")):Or()}catch(s){console.error("Failed to update status:",s),Or()}},Ur=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Hr=()=>{Zt&&tr([]),Xt(!Zt)},Yr=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Vr=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");hr(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{dr?(async()=>{try{const r=(null===Ke||void 0===Ke?void 0:Ke.restaurant_id)||(null===Te||void 0===Te?void 0:Te.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,C()),fetch(`/api/menu?restaurantId=${r}`,C())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),ur(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});pr(d.filter(e=>!1!==e.is_available)),s.length>0&&mr(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(hr([]),mr(null))},[dr]);const Gr=e=>{Qe(e),Xe(!0)},Jr=()=>{Xe(!1),Qe(null),yt(!1),bt(!1),lr(!1),hr([])},Kr=async e=>{const t=e||Ke;if(t){const e=Ne(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void Sr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Qr=e=>{nt(e),tt(!0)},Zr=()=>{nt(null),tt(!1)},Xr=e=>{at(e),ot(!0)},en=()=>{at(null),ot(!1)},tn=(e,t)=>{if(t&&t.stopPropagation(),ht(e),mt(!0),$r.current){const t=("string"===typeof e.order_items?JSON.parse(e.order_items):e.order_items||[]).map(e=>({name:e.name||e.menu_item_name||"Item",quantity:e.quantity||1,price:parseFloat(e.price)||0,options:e.options||[]}));$r.current.emit("cart-update",{restaurantId:null===Te||void 0===Te?void 0:Te.restaurantId,items:t,subtotal:parseFloat(String(e.total_amount))||0,tax:0,taxRate:0,serviceCharge:0,serviceChargeRate:0,discount:0,total:parseFloat(String(e.total_amount))||0,currency:De.currency||"MYR"})}},rn=e=>(0,g.r6)(e,null===St||void 0===St?void 0:St.operation_settings);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(we,{}),(null===Cr||void 0===Cr?void 0:Cr.isVisible)&&(0,_.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,_.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,_.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,_.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,_.jsx)("button",{onClick:()=>Ar(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,_.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,_.jsxs)("strong",{children:["Order ",Cr.orderNumber]}),Cr.tableNumber&&` (Table ${Cr.tableNumber})`,(0,_.jsx)("br",{}),(0,_.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",Cr.orderGroup]})," ",Cr.itemCount," item",Cr.itemCount>1?"s":""," added"]}),(0,_.jsx)("button",{onClick:()=>{Vt(Cr.orderNumber),Je("all"),Ar(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,_.jsxs)(S,{className:"no-print",children:[(0,_.jsxs)(a.Ay,{title:"Live Orders",children:[Zt&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(O,{onClick:async()=>{if(er.length<2)return void Sr("Please select at least 2 orders to merge","info");Re.filter(e=>er.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?Sr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):or(!0)},disabled:er.length<2||rr,children:rr?"Merging...":`Merge (${er.length})`}),(0,_.jsx)(B,{active:!1,onClick:Hr,children:"Cancel"})]}),!Zt&&(0,_.jsx)(B,{active:Zt,onClick:Hr,children:"Select to Merge"}),(0,_.jsx)(E,{enabled:Nt,onClick:()=>{Dt(e=>{const t=!e;return localStorage.setItem("sound_enabled",String(t)),t})},title:Nt?"Sound ON":"Sound OFF",children:(0,_.jsx)("img",{src:Nt?"/speaker-on.svg":"/speaker-off.svg",alt:Nt?"Sound ON":"Sound OFF"})})]}),(0,_.jsxs)(P,{children:[(0,_.jsxs)(I,{children:[(0,_.jsx)("div",{children:(0,_.jsx)(v.A,{activePeriod:Mt,dateRange:Lt,isCustomDateRange:Ut,onPeriodChange:e=>{Wt(e),Ht(!1),qt((0,v.x)(e,De.timeZone))},onCalendarRangeSelect:(e,t)=>{Ht(!0),Wt("all"),qt({start:e,end:t})},includeToday:!0})}),(0,_.jsxs)($,{children:[(0,_.jsx)(z,{children:"\ud83d\udd0d"}),(0,_.jsx)(T,{type:"text",placeholder:"Search...",value:Yt,onChange:e=>Vt(e.target.value)}),Yt&&(0,_.jsx)(N,{onClick:()=>Vt(""),title:"Clear search",children:"\xd7"})]}),(0,_.jsxs)(D,{onClick:async()=>{const e=Dr();if(0===e.length)return void Sr("No orders to download","info");let t={};try{const e=(0,j.c4)(),i=await fetch(`/api/menu?restaurant_id=${null===Te||void 0===Te?void 0:Te.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){var r,n;const e=await i.json(),o=(null===(r=e.data)||void 0===r?void 0:r.items)||[],s=(null===(n=e.data)||void 0===n?void 0:n.categories)||[],a={};s.forEach(e=>{a[e.id]=e.name}),o.forEach(e=>{const r=a[e.category_id]||e.category||"";e.name&&(t[e.name.toLowerCase()]=r)})}}catch{}const i=e.map(e=>{var r,n;const i=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),o=(null===(r=e.order_items)||void 0===r?void 0:r.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",s=(null===(n=e.order_items)||void 0===n?void 0:n.map(e=>{const r=e.menu_item_name||e.name||"Unknown",n=e.quantity||1,i=e.category||e.category_name||t[(r||"").toLowerCase()]||"",o=e.price?` ${e.price}`:"";let s="";e.options&&Array.isArray(e.options)&&e.options.length>0&&(s=" ("+e.options.map(e=>"string"===typeof e?e:`${e.name||e.option_name}${e.price?":"+e.price:""}`).join(", ")+")"),!s&&e.selectedOptions&&Array.isArray(e.selectedOptions)&&e.selectedOptions.length>0&&(s=" ("+e.selectedOptions.map(e=>"string"===typeof e?e:`${e.name||e.optionName}${e.price?":"+e.price:""}`).join(", ")+")");return`${n}x ${r}${i?` [${i}]`:""}${o}${s}`}).join("; "))||"",a=e;return[e.order_number||"",i,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,u.vv)(a.subtotal||e.total_amount||0,De.currency),(0,u.vv)(a.service_charge||0,De.currency),(0,u.vv)(a.tax||0,De.currency),(0,u.vv)(a.discount||0,De.currency),(0,u.vv)(e.total_amount||0,De.currency),o,s]}),o="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items","Item Details"].join(","),...i.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),s=new Blob([o],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a"),d=URL.createObjectURL(s);a.setAttribute("href",d),a.setAttribute("download",`live_orders_${Lt.start}_to_${Lt.end}.csv`),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)},title:"Download CSV",children:[(0,_.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,_.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,_.jsx)("span",{className:"download-label",children:$e("orders:liveOrdersPage.downloadCsv")})]}),(0,_.jsxs)("button",{onClick:()=>Jt(!0),title:"Daily Settlement",style:{marginLeft:"auto",display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",fontWeight:500,flexShrink:0},children:[(0,_.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,_.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]})]}),(0,_.jsxs)(R,{children:[(0,_.jsxs)(M,{active:"all"===Ge,onClick:()=>Je("all"),children:["All Orders",(0,_.jsx)(W,{children:Lr("all")})]}),(0,_.jsxs)(M,{active:"outstanding"===Ge,onClick:()=>Je("outstanding"),children:["Outstanding",(0,_.jsx)(W,{children:Lr("outstanding")})]}),(0,_.jsxs)(M,{active:"pending"===Ge,onClick:()=>Je("pending"),children:["Pending",(0,_.jsx)(W,{children:Lr("pending")})]}),(0,_.jsxs)(M,{active:"preparing"===Ge,onClick:()=>Je("preparing"),children:["Preparing",(0,_.jsx)(W,{children:Lr("preparing")})]}),(0,_.jsxs)(M,{active:"ready"===Ge,onClick:()=>Je("ready"),children:["Ready",(0,_.jsx)(W,{children:Lr("ready")})]}),(0,_.jsxs)(M,{active:"served"===Ge,onClick:()=>Je("served"),children:["Served",(0,_.jsx)(W,{children:Lr("served")})]}),(0,_.jsxs)(M,{active:"completed"===Ge,onClick:()=>Je("completed"),children:["Completed",(0,_.jsx)(W,{children:Lr("completed")})]}),(0,_.jsxs)(M,{active:"cancelled"===Ge,onClick:()=>Je("cancelled"),children:["Cancelled",(0,_.jsx)(W,{children:Lr("cancelled")})]})]}),(0,_.jsx)(L,{children:(()=>{const e=(()=>{const e=Wr().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=He).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.totalSales"),(0,_.jsxs)("strong",{children:["RM",qe.totalSales.toFixed(2)]})]}),(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.avg"),(0,_.jsxs)("strong",{children:["RM",qe.avgAmount.toFixed(2)]})]}),(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.max"),(0,_.jsxs)("strong",{children:["RM",qe.maxAmount.toFixed(2)]})]}),(0,_.jsxs)(q,{children:["\u2265RM",(0,_.jsx)("input",{type:"number",value:He,onChange:e=>{const t=parseInt(e.target.value)||0;Ye(t);const r=(0,j.c4)();fetch(`/api/restaurants/${null===Te||void 0===Te?void 0:Te.restaurantId}`,{headers:{Authorization:`Bearer ${r}`}}).then(e=>e.json()).then(e=>{const n=e.data||e,i="string"===typeof n.operation_settings?JSON.parse(n.operation_settings):n.operation_settings||{};i.salesThreshold=t,fetch(`/api/restaurants/${null===Te||void 0===Te?void 0:Te.restaurantId}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({operation_settings:i})})})},min:"0",style:{width:"32px",border:"none",borderBottom:"1px dashed #635BFF",background:"transparent",fontSize:"13px",fontWeight:700,color:"#0A2540",textAlign:"center",padding:0,outline:"none"}})," ",(0,_.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.avgServe"),(0,_.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.maxServe"),(0,_.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,_.jsxs)(q,{children:[$e("orders:liveOrdersPage.minServe"),(0,_.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,_.jsx)(U,{children:Wr().length>0?(0,_.jsxs)(x.bQ,{children:[(0,_.jsx)(x.B_,{children:(0,_.jsxs)("tr",{children:[Zt&&(0,_.jsx)(x.gU,{align:"center",width:"50px",children:(0,_.jsx)("input",{type:"checkbox",checked:er.length>0&&er.length===Wr().slice(50*(_t-1),50*_t).filter(e=>Yr(e)).length,onChange:()=>{const e=Wr().slice(50*(_t-1),50*_t).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));er.length===e.length?tr([]):tr(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,_.jsx)(x.gU,{children:$e("orders:liveOrdersPage.order")}),(0,_.jsx)(x.gU,{children:$e("orders:liveOrdersPage.items")}),(0,_.jsx)(x.gU,{children:$e("orders:liveOrdersPage.status")}),(0,_.jsx)(x.gU,{children:$e("orders:liveOrdersPage.time")}),(0,_.jsx)(x.gU,{align:"right",children:$e("orders:liveOrdersPage.amount")}),(0,_.jsx)(x.gU,{style:{width:"20%",minWidth:"180px"},children:$e("orders:liveOrdersPage.action")})]})}),(0,_.jsx)("tbody",{children:Wr().slice(50*(_t-1),50*_t).map(e=>(0,_.jsxs)(x.J2,{style:Zt&&er.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[Zt&&(0,_.jsx)(x.Bv,{align:"center",style:{width:"50px"},children:Yr(e)?(0,_.jsx)("input",{type:"checkbox",checked:er.includes(e.id),onChange:()=>{return t=e.id,void tr(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,_.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,_.jsxs)(x.Bv,{"data-label":"ORDER",children:[(0,_.jsxs)(H,{onClick:()=>Gr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,_.jsx)(Y,{children:$e("orders:liveOrdersPage.takeaway")}),"pickup"===e.order_type&&(0,_.jsx)(Y,{style:{background:"#EDE9FE",color:"#7C3AED"},children:$e("orders:liveOrdersPage.pickup")}),"delivery"===e.order_type&&(0,_.jsx)(Y,{style:{background:"#D1FAE5",color:"#059669"},children:$e("orders:liveOrdersPage.delivery")}),"mobile"===e.source&&(0,_.jsx)(Y,{style:{background:"#DBEAFE",color:"#2563EB"},children:$e("orders:liveOrdersPage.mobile")}),"mobile"===e.source&&(e.customer_id?(0,_.jsx)(Y,{style:{background:"#D1FAE5",color:"#059669"},children:$e("orders:liveOrdersPage.member")}):(0,_.jsx)(Y,{style:{background:"#F3F4F6",color:"#6B7280"},children:$e("orders:liveOrdersPage.guest")})),"kiosk"===e.source&&(0,_.jsx)(Y,{style:{background:"#FEF3C7",color:"#D97706"},children:$e("orders:liveOrdersPage.kiosk")}),"staffMeal"===e.payment_method&&(0,_.jsx)(Y,{style:{background:"#FEE2E2",color:"#DC2626"},children:$e("orders:liveOrdersPage.staffMeal")})]}),(0,_.jsxs)(V,{children:[e.customer_name||"Guest",e.customer_phone&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("br",{}),(0,_.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number,e.guest_count?` (${e.guest_count}p)`:""]})]}),e.pager_number&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("br",{}),(0,_.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?F(e.scheduled_pickup_time):"ASAP"]})]}),e.cashier_name&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("br",{}),(0,_.jsxs)("span",{style:{color:"#8898AA",fontSize:"11px"},children:["Cashier: ",e.cashier_name]})]})]})]}),(0,_.jsx)(x.Bv,{"data-label":"ITEMS",children:(0,_.jsx)(G,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,_.jsxs)(J,{children:[(0,_.jsxs)("div",{children:[(0,_.jsxs)(K,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,_.jsx)(Q,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,_.jsx)(x.Bv,{"data-label":"STATUS",align:"center",children:(0,_.jsx)(Z,{status:Rr(e),children:Mr(Rr(e))})}),(0,_.jsx)(x.Bv,{"data-label":"TIME",align:"center",children:(0,_.jsxs)(X,{children:[rn(e.createdAt||e.order_date),(0,_.jsx)("br",{}),!e.served_at&&(0,_.jsx)(A,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${$t}`),e.served_at&&(0,_.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",rn(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,_.jsx)(x.Bv,{"data-label":"AMOUNT",align:"right",children:(0,_.jsxs)("div",{style:{textAlign:"right"},children:[(0,_.jsx)(x.DM,{highlight:!0,children:(0,u.vv)(Number(e.total_amount),De.currency)}),Number(e.points_used)>0&&(0,_.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,_.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,_.jsxs)(ee,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[(0,m.MA)(e.payment_method,e.card_type,ze||void 0),"pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,_.jsx)(x.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,_.jsxs)(oe,{children:["completed"!==e.status&&"cancelled"!==e.status&&(0,_.jsxs)(_.Fragment,{children:[zr(e)&&"payment_verification_pending"!==e.payment_status&&"rejected"!==e.payment_status&&(0,_.jsx)(te,{onClick:t=>{t.stopPropagation(),qr(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),!zr(e)&&(0,_.jsx)(te,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"served",served:"completed"===e.payment_status?"completed":null,completed:null,cancelled:null}[r]||null);var r;t&&qr(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:"served"===e.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Ur(e.status,e.payment_status,e.order_type)})]}),"cancelled"!==e.status&&!zr(e)&&(0,_.jsx)(te,{variant:"secondary",onClick:()=>{if("pending"===e.status)qr(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&qr(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,_.jsx)(te,{onClick:t=>tn(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,_.jsx)(te,{onClick:t=>{t.stopPropagation(),Qt(e)},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&"payment_verification_pending"!==e.payment_status&&(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),qr(e.id,"completed")},title:"Mark as Completed",children:(0,_.jsx)(se,{children:"\u2713"})}),(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),Gr(e)},title:"View Details",children:(0,_.jsx)(se,{children:"\u25c9"})}),(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Ke;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Ne(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void Sr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0"),cashierName:r.cashier_name||null};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,_.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,_.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,_.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,_.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),Kr(e)},title:"Print Kitchen Ticket",children:(0,_.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,_.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Ne(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void Sr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void Kr(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&Sr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,_.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,_.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,_.jsx)(ie,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Qr(e.id):Xr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,_.jsx)(se,{children:"\u2715"})})]})})]},e.id))})]}):(0,_.jsx)(x.ys,{children:"No orders found in this category"})}),Ze&&Ke&&(0,_.jsx)(x.aF,{isOpen:!0,onClose:()=>{yt(!1),bt(!1),lr(!1),hr([]),Jr()},title:dr?"Add Items to Order":gt?"Receipt Preview":vt?"Kitchen Order Ticket Preview":`Order ${Ke.order_number}`,footer:dr?void 0:gt?(0,_.jsx)(te,{onClick:()=>yt(!1),children:$e("orders:liveOrdersPage.backToOrderDetails")}):vt?(0,_.jsx)(te,{onClick:()=>bt(!1),children:$e("orders:liveOrdersPage.backToOrderDetails")}):(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(te,{variant:"secondary",onClick:()=>Qr(Ke.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:$e("orders:liveOrdersPage.remove")}),"cancelled"!==Ke.status&&"completed"!==Ke.status&&(0,_.jsx)(te,{onClick:()=>Xr(Ke.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:$e("orders:liveOrdersPage.cancelOrder")}),zr(Ke)&&"pending"!==Ke.status&&"payment_verification_pending"!==Ke.payment_status&&"rejected"!==Ke.payment_status&&(0,_.jsx)(te,{onClick:()=>{qr(Ke.id,"pending"),Jr()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:$e("orders:liveOrdersPage.proceedWithoutPayment")}),"pending"===Ke.payment_status&&(0,_.jsx)(te,{onClick:()=>tn(Ke),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:$e("orders:liveOrdersPage.payment")}),"payment_verification_pending"===Ke.payment_status&&(0,_.jsx)(te,{onClick:()=>Qt(Ke),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:$e("orders:liveOrdersPage.confirmPayment")}),"pending"===Ke.payment_status&&!["served","completed","cancelled"].includes(Ke.status)&&(0,_.jsx)(te,{onClick:()=>lr(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:$e("orders:liveOrdersPage.addItems")}),(0,_.jsx)(te,{onClick:()=>yt(!0),style:{marginRight:"10px"},children:$e("orders:liveOrdersPage.viewReceipt")}),(0,_.jsx)(te,{onClick:()=>bt(!0),style:{marginRight:"10px"},children:$e("orders:liveOrdersPage.viewOrderTicket")}),(0,_.jsx)(te,{onClick:async()=>{if(Ke){const e=Ne(),t={orderNumber:Ke.order_number,pickupNumber:Ke.order_number.split("-")[1],tableNumber:Ke.table_number||null,pagerNumber:Ke.pager_number||null,date:new Date(Ke.order_date||Ke.createdAt),items:Ke.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Ke.subtotal||"0"),discount:parseFloat(Ke.discount||"0"),coupon:Ke.coupon_code?{code:Ke.coupon_code,discount:parseFloat(Ke.coupon_discount||"0")}:null,serviceCharge:parseFloat(Ke.service_charge||"0"),serviceChargeRate:parseFloat(Ke.service_charge_rate||"10"),tax:parseFloat(Ke.tax||"0"),taxRate:parseFloat(Ke.tax_rate||"6"),total:parseFloat(Ke.final_price||Ke.total_amount||"0"),paymentMethod:Ke.payment_method||"cash",amountReceived:parseFloat(Ke.amount_received||"0"),change:parseFloat(Ke.change||"0"),cashierName:Ke.cashier_name||null};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:$e("orders:liveOrdersPage.printBill")})]}),children:dr?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,_.jsx)("div",{style:{marginBottom:"20px"},children:(0,_.jsx)("input",{type:"text",placeholder:"Search menu items...",value:vr,onChange:e=>br(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),vr.length>0&&(0,_.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[cr.filter(e=>{if(!e||!e.name)return!1;const t=vr.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,_.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,_.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Vr(e,1,[]),br("")},children:[(0,_.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,_.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:$e("orders:liveOrdersPage.set")})]}),(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,_.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,u.vv)(parseFloat(e.price)||0,De.currency)}),t&&(0,_.jsx)("button",{onClick:t=>{t.stopPropagation(),Fr(e),jr(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===cr.filter(e=>e.name.toLowerCase().includes(vr.toLowerCase())||e.code&&e.code.toLowerCase().includes(vr.toLowerCase())).length&&(0,_.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,_.jsxs)("div",{children:[(0,_.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",xr.reduce((e,t)=>e+t.quantity,0),")"]}),0===xr.length?(0,_.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,_.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:xr.map(e=>(0,_.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,_.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,_.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,_.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,_.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,u.vv)(e.unitPrice||parseFloat(e.price),De.currency)," each"]})]}),(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,_.jsx)("button",{onClick:()=>{return t=e.cartId,void hr(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,_.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,_.jsx)("button",{onClick:()=>{return t=e.cartId,void hr(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,_.jsx)("div",{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px",display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:"8px"},children:(0,_.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,_.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,u.vv)(xr.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),De.currency)]}),(0,_.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,_.jsx)(te,{onClick:()=>{lr(!1),hr([]),br(""),Jr()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,_.jsx)(te,{onClick:async()=>{if(null!==Ke&&void 0!==Ke&&Ke.id&&0!==xr.length)try{yr(!0);const e=xr.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Ke||void 0===Ke?void 0:Ke.id}/merge-items`,C({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}Sr("Items added successfully","success"),lr(!1),hr([]),br(""),Jr(),Or()}catch(e){console.error("Add items error:",e),Sr(e.message||"Failed to add items","error")}finally{yr(!1)}},disabled:0===xr.length||gr,style:{background:0===xr.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===xr.length?"not-allowed":"pointer"},children:gr?"Adding...":"Add to Order"})]})]})})]}):vt?(0,_.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,_.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ne(),t=Array.isArray(Ke.order_items)?Ke.order_items:[],r={orderNumber:Ke.order_number,pickupNumber:Ke.order_number.split("-")[1],date:new Date(Ke.order_date||Ke.createdAt),orderType:Ke.order_type,orderSource:Ke.order_source||"pos",tableNumber:Ke.table_number||null,pagerNumber:Ke.pager_number||null,customerName:Ke.customer_name||"Walk-in Customer",scheduledPickupTime:Ke.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Ke.notes||"",takeawayCharge:parseFloat(Ke.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,_.jsx)("div",{children:e||"\xa0"},t))})()})}):gt?(0,_.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(()=>{const e={...Ne(),restaurantId:(null===Te||void 0===Te?void 0:Te.restaurantId)||""},t=Array.isArray(Ke.order_items)?Ke.order_items:[],r={orderNumber:Ke.order_number,pickupNumber:Ke.order_number.split("-")[1],pagerNumber:Ke.pager_number||null,date:new Date(Ke.order_date||Ke.createdAt),orderType:Ke.order_type,scheduledPickupTime:Ke.scheduled_pickup_time||null,currency:De.currency||"MYR",tableNumber:Ke.table_number||null,cashierName:Ke.cashier_name||null,customerName:Ke.customer_name||"Guest",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Ke.subtotal||"0"),discount:parseFloat(Ke.discount||"0"),discountPolicy:Ke.discount_policy_name?{name:Ke.discount_policy_name,amount:parseFloat(Ke.discount_policy_amount||"0")}:void 0,coupon:Ke.coupon_code?{code:Ke.coupon_code,discount:parseFloat(Ke.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Ke.takeaway_charge||"0"),serviceCharge:parseFloat(Ke.service_charge||"0"),serviceChargeRate:parseFloat(Ke.service_charge_rate||"10"),tax:parseFloat(Ke.tax||"0"),taxRate:parseFloat(Ke.tax_rate||"6"),total:parseFloat(Ke.final_price||Ke.total_amount||"0"),paymentMethod:Ke.payment_method||"cash",amountReceived:parseFloat(Ke.amount_received||"0"),change:parseFloat(Ke.change||"0"),deliveryInfo:Ke.delivery_info||null,deliveryFee:parseFloat(Ke.delivery_fee||"0")},n=(0,h._h)(r,e);return(0,_.jsx)("iframe",{srcDoc:n,title:"Receipt Preview",style:{width:"320px",minHeight:"500px",height:"600px",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",background:"white"}})})()}):(0,_.jsxs)("div",{style:{padding:"24px"},children:[(0,_.jsxs)(ae,{children:[(0,_.jsx)(de,{children:$e("orders:liveOrdersPage.customerInformation")}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Name:"}),(0,_.jsx)(pe,{children:Ke.customer_name||"Guest"})]}),Ke.customer_phone&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Phone:"}),(0,_.jsx)(pe,{children:Ke.customer_phone})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Order Type:"}),(0,_.jsx)(pe,{children:null===(e=Ke.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Source:"}),(0,_.jsx)(pe,{children:"mobile"===Ke.source?"Mobile Order":"kiosk"===Ke.source?"Kiosk":"POS Terminal"})]}),"mobile"===Ke.source&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Customer Type:"}),(0,_.jsx)(pe,{children:Ke.customer_id?"Member":"Guest"})]}),Ke.table_number&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Table Number:"}),(0,_.jsxs)(pe,{children:[Ke.table_number,Ke.guest_count?` (${Ke.guest_count} guests)`:""]})]}),"pickup"===Ke.order_type&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Scheduled Pickup:"}),(0,_.jsx)(pe,{style:{color:"#8B5CF6",fontWeight:600},children:Ke.scheduled_pickup_time?F(Ke.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Ke.order_type&&Ke.delivery_info&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(ye,{}),(0,_.jsxs)(ae,{children:[(0,_.jsx)(de,{children:$e("orders:liveOrdersPage.deliveryInformation")}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Address:"}),(0,_.jsx)(pe,{children:Ke.delivery_info.address})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Phone:"}),(0,_.jsx)(pe,{children:Ke.delivery_info.phone})]}),Ke.delivery_info.zoneName&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Zone:"}),(0,_.jsx)(pe,{children:Ke.delivery_info.zoneName})]}),Ke.delivery_info.notes&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Notes:"}),(0,_.jsx)(pe,{style:{fontStyle:"italic"},children:Ke.delivery_info.notes})]}),Ke.delivery_fee>0&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Delivery Fee:"}),(0,_.jsx)(pe,{children:(0,u.vv)(parseFloat(Ke.delivery_fee||"0"),De.currency)})]})]})]}),(0,_.jsx)(ye,{}),(0,_.jsxs)(ae,{children:[(0,_.jsx)(de,{children:$e("orders:liveOrdersPage.orderInformation")}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Order Time:"}),(0,_.jsx)(pe,{children:rn(Ke.createdAt)})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Status:"}),(0,_.jsx)(pe,{children:(0,_.jsx)(Z,{status:Ke.status,children:Mr(Ke.status)})})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Payment Method:"}),(0,_.jsx)(pe,{children:(0,m.MA)(Ke.payment_method,Ke.card_type,ze||void 0)})]}),(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Payment Status:"}),(0,_.jsx)(pe,{children:"payment_verification_pending"===Ke.payment_status?(0,_.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:$e("orders:liveOrdersPage.verificationPending")}):"rejected"===Ke.payment_status?(0,_.jsx)("span",{style:{color:"#DC2626",fontWeight:500},children:$e("orders:liveOrdersPage.paymentRejected")}):"pending"===Ke.payment_status?(0,_.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:$e("orders:liveOrdersPage.pending")}):"paid"===Ke.payment_status||"completed"===Ke.payment_status?(0,_.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:$e("orders:liveOrdersPage.paid")}):Ke.payment_status||"N/A"})]}),Ke.cashier_name&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Cashier:"}),(0,_.jsx)(pe,{children:Ke.cashier_name})]})]}),(()=>{const e=w(Ke.payment_proof),t=k(Ke.payment_proof),r=e||(t.length>0?t[t.length-1]:null);if(!r)return null;const n=!e&&!!r;return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(ye,{}),(0,_.jsxs)(ae,{children:[(0,_.jsxs)(de,{children:["Customer Submitted Proof",n&&(0,_.jsx)("span",{style:{marginLeft:"8px",fontSize:"12px",fontWeight:600,color:"#DC2626"},children:"(Rejected)"})]}),r.reference&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Transaction Reference:"}),(0,_.jsx)(pe,{style:{fontWeight:600,fontFamily:"monospace"},children:r.reference})]}),r.file_name&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Receipt File:"}),(0,_.jsx)(pe,{children:r.file_name})]}),r.uploaded_at&&(0,_.jsxs)(le,{children:[(0,_.jsx)(ce,{children:"Submitted At:"}),(0,_.jsx)(pe,{children:rn(r.uploaded_at)})]}),r.image&&(0,_.jsxs)("div",{style:{marginTop:"16px"},children:[(0,_.jsx)(ce,{style:{marginBottom:"14px"},children:"Receipt Image:"}),(0,_.jsx)("div",{style:{position:"relative"},children:(0,_.jsx)("img",{src:r.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(r.image,"_blank")})})]})]})]})})(),(0,_.jsx)(ye,{}),(0,_.jsxs)(ae,{children:[(0,_.jsx)(de,{children:$e("orders:liveOrdersPage.orderItems")}),(()=>{const e=Ke.order_items&&Array.isArray(Ke.order_items)?Ke.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,_.jsxs)("div",{children:[i&&(0,_.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,_.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,_.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,_.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,_.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Ke)return;const n=Ne();if(0===t.length)return void Sr("No items in this group","error");const i={orderNumber:Ke.order_number,pickupNumber:Ke.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Ke.order_date||Ke.createdAt),orderType:Ke.order_type,orderSource:Ke.order_source||"pos",tableNumber:Ke.table_number||null,pagerNumber:Ke.pager_number||null,customerName:Ke.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Ke.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&Sr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,s;return(0,_.jsxs)(ue,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,_.jsxs)(me,{style:{flex:1},children:[(0,_.jsx)(xe,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,_.jsx)(he,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,_.jsxs)(ge,{children:[(0,_.jsxs)("span",{children:[r.quantity," \xd7 ",(0,u.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),De.currency)]}),(0,_.jsx)("span",{children:(0,u.vv)(r.quantity*parseFloat(r.price||(null===(s=r.menuItem)||void 0===s?void 0:s.price)||0),De.currency)})]})]}),"completed"!==Ke.payment_status&&e.length>1&&(0,_.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(Ke&&(pt({index:t,name:n}),lt(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,_.jsx)(ye,{}),(0,_.jsxs)(ve,{children:[(0,_.jsxs)(be,{children:[(0,_.jsx)("span",{children:$e("orders:liveOrdersPage.subtotal")}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.subtotal||Ke.total_amount),De.currency)})]}),Ke.takeaway_charge&&parseFloat(Ke.takeaway_charge)>0&&(0,_.jsxs)(be,{children:[(0,_.jsx)("span",{children:$e("orders:liveOrdersPage.takeawayCharge")}),(0,_.jsx)("span",{children:(0,u.vv)(parseFloat(Ke.takeaway_charge),De.currency)})]}),Ke.discount>0&&(0,_.jsxs)(be,{children:[(0,_.jsx)("span",{children:$e("orders:liveOrdersPage.discount")}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.discount),De.currency)})]}),Ke.discount_policy_amount>0&&(0,_.jsxs)(be,{children:[(0,_.jsxs)("span",{children:["Discount (",Ke.discount_policy_name,")"]}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.discount_policy_amount),De.currency)})]}),Ke.coupon_discount>0&&(0,_.jsxs)(be,{children:[(0,_.jsxs)("span",{children:["Coupon (",Ke.coupon_code,")"]}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.coupon_discount),De.currency)})]}),Number(Ke.point_discount)>0&&(0,_.jsxs)(be,{children:[(0,_.jsxs)("span",{children:["Points (",Number(Ke.points_used||0).toLocaleString()," pts)"]}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.point_discount),De.currency)})]}),Ke.service_charge>0&&(0,_.jsxs)(be,{children:[(0,_.jsxs)("span",{children:["Service Charge (",Ke.service_charge_rate||10,"%)"]}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.service_charge),De.currency)})]}),Ke.tax>0&&(0,_.jsxs)(be,{children:[(0,_.jsxs)("span",{children:["Tax (",Ke.tax_rate||6,"%)"]}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.tax),De.currency)})]}),(0,_.jsxs)(be,{isTotal:!0,children:[(0,_.jsx)("span",{children:$e("orders:liveOrdersPage.total")}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.total_amount),De.currency)})]})]})]})}),Ke&&i.createPortal((0,_.jsxs)(Fe,{id:"bill-print-content",children:[(0,_.jsxs)(ke,{children:[Bt.receiptLogo&&(0,_.jsx)("img",{src:Bt.receiptLogo,alt:"Logo",style:{maxWidth:"160px",maxHeight:"50px",marginBottom:"8px",filter:"grayscale(100%)"}}),(0,_.jsx)(Ce,{children:(null===St||void 0===St?void 0:St.companyName)||"Restaurant"}),St&&(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:St.address}),(0,_.jsxs)("div",{style:{fontSize:"11px"},children:[St.city,", ",St.state," ",St.postcode]}),(0,_.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",St.phone]}),St.email&&(0,_.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",St.email]}),St.taxNo&&(0,_.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",St.taxNo]})]}),(0,_.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,_.jsxs)(Ae,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Order No:"}),(0,_.jsx)("span",{children:Ke.order_number})]}),(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Date:"}),(0,_.jsx)("span",{children:rn(Ke.order_date||Ke.createdAt)})]}),(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Customer:"}),(0,_.jsx)("span",{children:Ke.customer_name||"Guest"})]}),Ke.customer_phone&&(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Phone:"}),(0,_.jsx)("span",{children:Ke.customer_phone})]}),(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Order Type:"}),(0,_.jsx)("span",{children:"dine_in"===Ke.order_type?"DINE IN":null===(t=Ke.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Ke.table_number&&(0,_.jsxs)(Se,{children:[(0,_.jsx)("strong",{children:"Table:"}),(0,_.jsxs)("span",{children:[Ke.table_number,Ke.guest_count?` (${Ke.guest_count}p)`:""]})]}),("takeaway"===Ke.order_type||"pickup"===Ke.order_type)&&(0,_.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Ke.order_number.split("-")[1]||"000"]}),"pickup"===Ke.order_type&&(0,_.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Ke.scheduled_pickup_time?F(Ke.scheduled_pickup_time):"ASAP"]})]}),(0,_.jsx)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,_.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,_.jsx)("thead",{children:(0,_.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,_.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:$e("orders:liveOrdersPage.item")}),(0,_.jsx)("th",{style:{textAlign:"center",width:"40px"},children:$e("orders:liveOrdersPage.qty")}),(0,_.jsx)("th",{style:{textAlign:"right",width:"60px"},children:$e("orders:liveOrdersPage.price")}),(0,_.jsx)("th",{style:{textAlign:"right",width:"60px"},children:$e("orders:liveOrdersPage.total")})]})}),(0,_.jsx)("tbody",{children:Ke.order_items&&Array.isArray(Ke.order_items)&&Ke.order_items.map((e,t)=>{var r,n,i;return(0,_.jsxs)("tr",{children:[(0,_.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,_.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,_.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,_.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,_.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,_.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,_.jsxs)(Se,{children:[(0,_.jsx)("span",{children:"Subtotal:"}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.subtotal||Ke.total_amount),De.currency)})]}),Ke.discount>0&&(0,_.jsxs)(Se,{children:[(0,_.jsx)("span",{children:"Discount:"}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.discount),De.currency)})]}),Ke.coupon_discount>0&&(0,_.jsxs)(Se,{children:[(0,_.jsxs)("span",{children:["Coupon (",Ke.coupon_code,"):"]}),(0,_.jsx)("span",{children:(0,u.vv)(-Number(Ke.coupon_discount),De.currency)})]}),parseFloat(Ke.takeaway_charge||0)>0&&(0,_.jsxs)(Se,{children:[(0,_.jsx)("span",{children:"Takeaway Charge:"}),(0,_.jsx)("span",{children:(0,u.vv)(parseFloat(Ke.takeaway_charge),De.currency)})]}),Ke.service_charge>0&&(0,_.jsxs)(Se,{children:[(0,_.jsxs)("span",{children:["Service Charge (",Ke.service_charge_rate||10,"%):"]}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.service_charge),De.currency)})]}),Ke.tax>0&&(0,_.jsxs)(Se,{children:[(0,_.jsxs)("span",{children:["Tax (",Ke.tax_rate||6,"%):"]}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.tax),De.currency)})]}),(0,_.jsxs)(Se,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,_.jsx)("span",{children:"TOTAL:"}),(0,_.jsx)("span",{children:(0,u.vv)(Number(Ke.total_amount),De.currency)})]})]}),(0,_.jsxs)(Ae,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,_.jsxs)(Se,{children:[(0,_.jsx)("span",{children:"Payment Method:"}),(0,_.jsx)("span",{children:(0,m.MA)(Ke.payment_method,Ke.card_type,ze||void 0).toUpperCase()})]}),(0,_.jsxs)(Se,{children:[(0,_.jsx)("span",{children:"Order Status:"}),(0,_.jsx)("span",{children:Ke.status.toUpperCase()})]})]}),(0,_.jsxs)(Ee,{children:[(0,_.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,_.jsx)("div",{children:$e("orders:liveOrdersPage.thankYouForYourPurchase")}),(0,_.jsx)("div",{children:$e("orders:liveOrdersPage.pleaseKeepThisReceiptForYourRecords")})]})]}),document.body),et&&(0,_.jsxs)(x.aF,{isOpen:!0,onClose:Zr,title:"Delete Order",footer:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(te,{variant:"secondary",onClick:Zr,children:$e("orders:liveOrdersPage.cancel")}),(0,_.jsx)(te,{onClick:async()=>{if(rt){const t=rt;Me(e=>e.filter(e=>e.id!==t)),tt(!1),nt(null);try{const e=await fetch(`/api/orders/${t}`,C({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):Or()}catch(e){console.error("Failed to delete order:",e),Or()}}else tt(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:$e("orders:liveOrdersPage.deleteOrder")})]}),children:[(0,_.jsx)("p",{children:$e("orders:liveOrdersPage.areYouSureYouWantToDeleteThisOrderThisActionCannotBeUndone")}),(0,_.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",rt&&(null===(o=Re.find(e=>e.id===rt))||void 0===o?void 0:o.order_number)]})]}),it&&(0,_.jsx)(x.aF,{isOpen:!0,onClose:en,title:"Cancel Order",footer:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(te,{variant:"secondary",onClick:en,children:$e("orders:liveOrdersPage.noKeepOrder")}),(0,_.jsx)(te,{onClick:async()=>{if(st){Me(e=>e.map(e=>e.id===st?{...e,status:"cancelled"}:e)),ot(!1),(null===Ke||void 0===Ke?void 0:Ke.id)===st&&Jr();try{const e=await fetch(`/api/orders/${st}/status`,C({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):Or()}catch(e){console.error("Failed to cancel order:",e),Or()}finally{at(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:$e("orders:liveOrdersPage.yesCancelOrder")})]}),children:(0,_.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,_.jsx)(y.A,{isOpen:dt,title:"Remove Item",message:`Are you sure you want to remove "${(null===ct||void 0===ct?void 0:ct.name)||""}" from this order?`,onConfirm:async()=>{if(Ke&&ct)try{const e=await fetch(`/api/orders/${Ke.id}/items/${ct.index}`,{...C({method:"DELETE"})}),t=await e.json();t.success?(Sr(`Item removed: ${ct.name}`,"success"),Qe(t.data),Or()):Sr(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),Sr("Failed to remove item","error")}finally{lt(!1),pt(null)}},onCancel:()=>{lt(!1),pt(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),(0,_.jsx)(x.aF,{isOpen:!!Kt,onClose:()=>Qt(null),title:"payment_verification_pending"===(null===Kt||void 0===Kt?void 0:Kt.payment_status)?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"payment_verification_pending"===(null===Kt||void 0===Kt?void 0:Kt.payment_status)?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(re,{variant:"secondary",onClick:async()=>{if(Kt)try{await fetch(`/api/orders/${Kt.id}`,C({method:"PATCH",body:JSON.stringify({payment_status:"rejected",status:"outstanding"})})),Qt(null),Or()}catch(e){console.error("Error rejecting payment:",e)}},children:$e("orders:liveOrdersPage.reject")}),(0,_.jsx)(ne,{variant:"primary",onClick:async()=>{if(Kt){Dt(!1);try{await fetch(`/api/orders/${Kt.id}`,C({method:"PATCH",body:JSON.stringify({payment_status:"completed"})})),"outstanding"===Kt.status&&await fetch(`/api/orders/${Kt.id}/status`,C({method:"PATCH",body:JSON.stringify({status:"pending"})})),Qt(null),Or()}catch(e){console.error("Error confirming payment:",e)}}},children:$e("orders:liveOrdersPage.confirmPayment")})]}):void 0,children:Kt&&(()=>{const e=w(Kt.payment_proof),t=k(Kt.payment_proof);return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,_.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,_.jsxs)("strong",{style:{color:"#0A2540"},children:["#",Kt.order_number]})]}),(0,_.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,_.jsx)("strong",{style:{color:"#0A2540"},children:(0,u.vv)(Kt.total_amount,De.currency)})]}),(0,_.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,_.jsx)("strong",{style:{color:"#0A2540"},children:Kt.payment_method})]})]}),(0,_.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,_.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:$e("orders:liveOrdersPage.customerSubmittedProof")}),e?(0,_.jsxs)(_.Fragment,{children:[e.reference&&(0,_.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,_.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,_.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:e.reference})]}),e.file_name&&(0,_.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",e.file_name]}),e.uploaded_at&&(0,_.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(e.uploaded_at).toLocaleString()]}),e.image&&(0,_.jsx)("img",{src:e.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]}):(0,_.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===Kt.payment_status?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),t.length>0&&(0,_.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,_.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",t.length,")"]}),t.map((e,r)=>(0,_.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:r<t.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,_.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,_.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||r+1]}),e.rejected_at&&(0,_.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,_.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,_.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,_.jsx)("img",{src:e.image,alt:`Previous proof #${r+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},r))]})]})})()}),ut&&xt&&(0,_.jsx)(l.A,{isOpen:ut,onClose:()=>{mt(!1),setTimeout(()=>{ht(null)},100)},total:Number(xt.total_amount),subtotal:Number(xt.subtotal||xt.total_amount||0),tax:Number(xt.tax||0),serviceCharge:Number(xt.service_charge||0),discountAmount:Number(xt.discount||0),couponDiscount:Number(xt.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i,o)=>{if(xt){Br();try{const t={payment_status:"completed",payment_method:e,card_type:"card"===e&&o||null};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(xt.total_amount)-i);if(!(await fetch(`/api/orders/${xt.id}`,C({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===xt.status?await fetch(`/api/orders/${xt.id}`,C({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===xt.status&&await fetch(`/api/orders/${xt.id}`,C({method:"PATCH",body:JSON.stringify({status:"completed"})})),$r.current&&$r.current.emit("checkout-complete",{restaurantId:null===Te||void 0===Te?void 0:Te.restaurantId,orderNumber:xt.order_number||"",total:parseFloat(String(xt.total_amount))||0,currency:De.currency||"MYR"}),mt(!1),ht(null),await Or(),Ze&&(Xe(!1),Qe(null))}catch(s){console.error("\u274c Payment error:",s)}}},paymentMethods:Pt,customerId:xt.customer_id||void 0,restaurantId:null!==Te&&void 0!==Te&&Te.restaurantId?Number(Te.restaurantId):void 0,membershipSettings:zt}),_r&&(0,_.jsx)(c.A,{isOpen:fr,onClose:()=>{jr(!1),Fr(null)},menuItem:{id:_r.id,name:_r.name,price:parseFloat(_r.price)||0,emoji:_r.emoji||"\ud83c\udf7d\ufe0f",image:_r.image,optionGroups:_r.optionGroups},onConfirm:(e,t,r)=>{Vr(_r,e,r),jr(!1),Fr(null),br("")}}),ir&&(0,_.jsx)(x.aF,{isOpen:!0,onClose:()=>or(!1),title:"Select Target Order",footer:(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(te,{onClick:()=>or(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:$e("orders:liveOrdersPage.cancel")}),(0,_.jsx)(te,{onClick:()=>sr&&(async e=>{try{nr(!0),or(!1);const t=er,r=await fetch("/api/orders/merge",C({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();Sr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Xt(!1),tr([]),ar(null),Or()}catch(t){console.error("Merge error:",t),Sr(t.message||"Failed to merge orders","error")}finally{nr(!1)}})(sr),disabled:!sr||rr,style:{background:sr?"#635BFF":"#E5E7EB",color:sr?"white":"#9CA3AF",cursor:sr?"pointer":"not-allowed"},children:rr?"Merging...":"Merge Orders"})]}),children:(0,_.jsxs)("div",{children:[(0,_.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,_.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Re.filter(e=>er.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,_.jsxs)("div",{onClick:()=>ar(e.id),style:{padding:"16px",border:"2px solid "+(sr===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:sr===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,_.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,_.jsxs)("div",{children:[(0,_.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,_.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}${e.guest_count?` (${e.guest_count}p)`:""}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,_.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,_.jsxs)("div",{style:{textAlign:"right"},children:[(0,_.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,u.vv)(e.total_amount,De.currency)}),(0,_.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),sr===e.id&&(0,_.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]})})]}),(()=>{const e=Wr().length,t=Math.ceil(e/50);return t>1&&(0,_.jsxs)(Be,{children:[(0,_.jsxs)(Oe,{children:["Showing ",50*(_t-1)+1,"-",Math.min(50*_t,e)," of ",e," orders"]}),(0,_.jsxs)(Pe,{children:[(0,_.jsx)(Ie,{onClick:()=>Ft(1),disabled:1===_t,children:"First"}),(0,_.jsx)(Ie,{onClick:()=>Ft(e=>Math.max(1,e-1)),disabled:1===_t,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||_t<=3?r+1:_t>=t-2?t-4+r:_t-2+r,(0,_.jsx)(Ie,{active:_t===n,onClick:()=>Ft(n),children:n},n)}),(0,_.jsx)(Ie,{onClick:()=>Ft(e=>Math.min(t,e+1)),disabled:_t===t,children:"Next"}),(0,_.jsx)(Ie,{onClick:()=>Ft(t),disabled:_t===t,children:"Last"})]})]})})()]}),i.createPortal((0,_.jsxs)(fe,{isVisible:wr.isVisible,type:wr.type,children:[(0,_.jsx)(je,{children:wr.message}),(0,_.jsx)(_e,{onClick:()=>kr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body),(0,_.jsx)(b.A,{isOpen:Gt,onClose:()=>Jt(!1)})]})}},7617:(e,t,r)=>{r.d(t,{A:()=>m});r(9950);var n=r(7119),i=r(4752),o=r(9610),s=r(4414);const a=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
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
  white-space: pre-line;
  text-align: left;
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
`,m=e=>{let{isOpen:t,title:r,message:i,onConfirm:m,onCancel:x,confirmText:h="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return t?n.createPortal((0,s.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,s.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:r}),(0,s.jsx)(c,{children:i})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{variant:"secondary",onClick:x,children:g}),(0,s.jsx)(u,{variant:"primary",type:y,onClick:m,children:h})]})]})}),document.body):null}}}]);