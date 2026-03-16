"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4648],{512:(e,t,r)=>{r.d(t,{x:()=>E,A:()=>N});var n=r(9950),i=r(4752),o=r(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=i.Ay.div`
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
`,u=i.Ay.div`
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
`,m=i.Ay.button`
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
`,h=i.Ay.div``,g=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=i.Ay.button`
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
`,v=i.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,j=i.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,_=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,F=i.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=i.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,C=i.Ay.div`
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
`,A=e=>{let{startDate:t,endDate:r,onRangeSelect:i,onClose:A,isOpen:S}=e;const E=new Date,[B,T]=(0,n.useState)(E.getMonth()),[I,$]=(0,n.useState)(E.getFullYear()),[D,N]=(0,n.useState)(null),[P,O]=(0,n.useState)(null),[z,R]=(0,n.useState)(null),[M,W]=(0,n.useState)("start"),L=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&N(d(t)),r&&O(d(r))},[t,r]),(0,n.useEffect)(()=>{S&&W("start")},[S]),(0,n.useEffect)(()=>{const e=e=>{L.current&&!L.current.contains(e.target)&&A()};return S&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[S,A]);const q=(0,n.useCallback)(()=>{0===B?(T(11),$(e=>e-1)):T(e=>e-1)},[B]),U=(0,n.useCallback)(()=>{11===B?(T(0),$(e=>e+1)):T(e=>e+1)},[B]),V=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let i=0;i<n;i++)d.push(null);for(let i=1;i<=r;i++)d.push(new Date(e,t,i));return(0,o.jsxs)(v,{children:[(0,o.jsx)(j,{children:c(e,t)}),(0,o.jsx)(_,{children:s.map(e=>(0,o.jsx)(F,{children:e},e))}),(0,o.jsx)(w,{children:d.map((e,t)=>{if(!e)return(0,o.jsx)(k,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:s,isHoverEnd:d}=(e=>{const t=D&&l(e,D),r=P&&l(e,P),n="end"===M&&z?z:P;let i=!1;if(D&&n){const[t,r]=D<=n?[D,n]:[n,D];i=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:i,isHoverEnd:"end"===M&&z&&l(e,z)}})(e),c=l(e,E);return(0,o.jsx)(C,{$isStart:!!r,$isEnd:!!n,$isInRange:s,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===M)N(e),O(null),W("end");else{let t=D,r=e;r<t&&([t,r]=[r,t]),N(t),O(r),W("start"),i(a(t),a(r)),setTimeout(A,200)}})(e),onMouseEnter:()=>R(e),onMouseLeave:()=>R(null),children:e.getDate()},e.getTime())})})]})},H=11===B?0:B+1,Y=11===B?I+1:I,G=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}N(r),O(n),W("start"),i(a(r),a(n)),setTimeout(A,150)};return S?(0,o.jsx)(p,{ref:L,children:(0,o.jsxs)(u,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(m,{onClick:()=>G("this_week"),children:"This Week"}),(0,o.jsx)(m,{onClick:()=>G("this_month"),children:"This Month"}),(0,o.jsx)(m,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{children:[(0,o.jsx)(y,{onClick:q,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(y,{onClick:U,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(b,{children:[V(I,B),(0,o.jsx)(f,{children:V(Y,H)})]})]})]})}):null},S=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,i]=t.split("-").map(Number);return new Date(r,n-1,i)}catch{return new Date}})(t);let n=new Date(r);const i=new Date(r);switch(e){case"today":break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:S(n),end:S(i)}},B=i.Ay.div`
  margin-bottom: 24px;
`,T=i.Ay.div`
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
`,D=i.Ay.button`
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
`,N=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:i,onPeriodChange:s,onCalendarRangeSelect:a,includeToday:d=!1,children:l}=e;const[c,p]=(0,n.useState)(!1),u=d?["today","week","month","year","all"]:["week","month","year","all"],x={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(B,{children:(0,o.jsxs)(T,{children:[u.map(e=>(0,o.jsx)(I,{active:t===e&&!i,onClick:()=>s(e),children:x[e]},e)),(0,o.jsxs)($,{children:[(0,o.jsxs)(D,{active:i,onClick:()=>p(!c),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,o.jsx)(A,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{a(e,t),p(!1)},onClose:()=>p(!1)})]}),l]})})}},4648:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Ee});var n=r(9950),i=r(7119),o=r(4752),s=r(3422),a=r(8012),d=r(1367),l=r(2966),c=r(9189),p=r(9018),u=r(6038),x=r(8285),m=r(8409),h=r(5863),g=r(8406),y=r(7617),b=r(512),f=r(4414);const v=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),o=n(r);return i.period===o.period?`${i.time} - ${o.time} ${o.period}`:`${i.time} ${i.period} - ${o.time} ${o.period}`},j=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const t=localStorage.getItem("auth_token");return{...e,credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{},...e.headers||{}}}},_=e=>{let{dateString:t}=e;const[r,i]=n.useState("calculating...");return n.useEffect(()=>{const e=()=>{i((0,g.MQ)(t))};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[t]),(0,f.jsx)("span",{style:{fontSize:"12px"},children:r})},F=o.Ay.div`
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

  /* Override DatePeriodFilter internal margin */
  & > div:first-child > div {
    margin-bottom: 0 !important;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`,E=o.Ay.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`,B=o.Ay.input`
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
`,T=o.Ay.button`
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
`,I=o.Ay.button`
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
`,$=o.Ay.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #9CA3AF;
`,D=o.Ay.div`
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
`,N=o.Ay.button`
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
`,P=o.Ay.span`
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
`,O=o.Ay.div`
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
`,z=o.Ay.span`
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
`,L=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`,q=o.Ay.div`
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
`,Y=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"outstanding":case"pending":return"#FEF3C7";case"preparing":return"#DBEAFE";case"ready":case"served":return"#D1FAE5";case"completed":return"#E5E7EB";case"cancelled":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"outstanding":return"#F59E0B";case"pending":return"#92400E";case"preparing":return"#1E40AF";case"ready":case"served":return"#065F46";case"completed":return"#374151";case"cancelled":return"#991B1B";default:return"#6B7280"}}};
`,G=o.Ay.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`,J=o.Ay.div`
  color: ${e=>e.isVerificationPending?"#F59E0B":e.isPending?"#FF6B6B":"#6B7C93"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending||e.isVerificationPending?"500":"normal"};
`,K=o.Ay.button`
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
`,X=(0,o.Ay)(m.yl)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`,Z=(0,o.Ay)(m.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
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
`,ee=o.Ay.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`,te=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
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
`,xe=o.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`,me=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${e=>e.isTotal?"18px":"14px"};
  font-weight: ${e=>e.isTotal?"700":"400"};
  color: ${e=>e.isTotal?"#0A2540":"#6B7C93"};
`,he=o.Ay.div`
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
`,ge=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`,ye=o.Ay.button`
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
`,be=o.Ay.div`
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
`,fe=o.DU`
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
`,ve=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,je=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,_e=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,Fe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,we=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,ke=o.Ay.div`
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
`,Ce=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,Ae=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,Se=o.Ay.button`
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
`,Ee=()=>{var e,t,r;const{user:o}=(0,d.As)(),{getStoreInfo:Ee,operationSettings:Be}=(0,p.Pj)(),[Te,Ie]=(0,n.useState)([]),[$e,De]=(0,n.useState)({all:0,outstanding:0,pending:0,preparing:0,ready:0,served:0,completed:0,cancelled:0}),[Ne,Pe]=(0,n.useState)({totalSales:0,avgAmount:0,maxAmount:0,orderCount:0}),[,Oe]=(0,n.useState)(null),[ze,Re]=(0,n.useState)("all"),[Me,We]=(0,n.useState)(null),[Le,qe]=(0,n.useState)(!1),[Ue,Ve]=(0,n.useState)(!1),[He,Ye]=(0,n.useState)(null),[Ge,Je]=(0,n.useState)(!1),[Ke,Xe]=(0,n.useState)(null),[Ze,Qe]=(0,n.useState)(!1),[et,tt]=(0,n.useState)(null),[rt,nt]=(0,n.useState)(!1),[it,ot]=(0,n.useState)(null),[,]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[st,at]=(0,n.useState)(!1),[dt,lt]=(0,n.useState)(!1),[ct,pt]=(0,n.useState)(!0),[ut,xt]=(0,n.useState)(1),[mt,ht]=(0,n.useState)(1),[gt,yt]=(0,n.useState)(0),[bt,ft]=(0,n.useState)(null),[vt,jt]=(0,n.useState)(null),[_t,Ft]=(0,n.useState)(0),[wt,kt]=(0,n.useState)(!0),[Ct,At]=(0,n.useState)(null),[St,Et]=(0,n.useState)("today"),[Bt,Tt]=(0,n.useState)(()=>(0,b.x)("today",Be.timeZone)),[It,$t]=(0,n.useState)(!1),[Dt,Nt]=(0,n.useState)(""),[Pt,Ot]=(0,n.useState)(null),[zt,Rt]=(0,n.useState)(!1),[Mt,Wt]=(0,n.useState)([]),[Lt,qt]=(0,n.useState)(!1),[Ut,Vt]=(0,n.useState)(!1),[Ht,Yt]=(0,n.useState)(null),[Gt,Jt]=(0,n.useState)(!1),[Kt,Xt]=(0,n.useState)([]),[,Zt]=(0,n.useState)([]),[,Qt]=(0,n.useState)(null),[er,tr]=(0,n.useState)([]),[rr,nr]=(0,n.useState)(!1),[ir,or]=(0,n.useState)(""),[sr,ar]=(0,n.useState)(!1),[dr,lr]=(0,n.useState)(null),[cr,pr]=(0,n.useState)({message:"",type:"success",isVisible:!1}),[ur,xr]=(0,n.useState)(null),mr=(0,n.useCallback)(function(e){pr({message:e,type:arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success",isVisible:!0}),setTimeout(()=>{pr(e=>({...e,isVisible:!1}))},4e3)},[]),hr=(0,n.useCallback)(()=>{if(wt)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=800,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5),setTimeout(()=>{const t=e.createOscillator(),r=e.createGain();t.connect(r),r.connect(e.destination),t.frequency.value=1e3,t.type="sine",r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(.3,e.currentTime+.01),r.gain.exponentialRampToValueAtTime(.01,e.currentTime+.5),t.start(e.currentTime),t.stop(e.currentTime+.5)},200)}catch(e){console.error("Failed to play notification sound:",e)}},[wt]);(0,n.useEffect)(()=>{Ft(e=>e+1);const e=setInterval(()=>{Ft(e=>e+1)},1e4);return()=>clearInterval(e)},[]);const gr=(0,n.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;if(null!==o&&void 0!==o&&o.restaurantId)try{const t=new URLSearchParams({page:String(e),limit:"100",includeCompleted:"true"});"all"!==ze&&"outstanding"!==ze&&t.append("status",ze),Bt.start&&t.append("startDate",Bt.start),Bt.end&&t.append("endDate",Bt.end),Dt.trim()&&t.append("search",Dt.trim());const r=await fetch(`/api/orders/restaurant/${o.restaurantId}?${t}`,j()),n=await r.json();n.success&&n.data&&(Ie(n.data),n.pagination&&(xt(n.pagination.currentPage),ht(n.pagination.totalPages),yt(n.pagination.totalCount)))}catch(t){console.error("Failed to fetch orders:",t)}finally{pt(!1)}},[null===o||void 0===o?void 0:o.restaurantId,Bt.start,Bt.end,Dt,ze]),yr=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{var e,t;const r=new URLSearchParams;Bt.start&&r.append("startDate",Bt.start),Bt.end&&r.append("endDate",Bt.end);const n=await fetch(`/api/orders/restaurant/${o.restaurantId}/counts?${r}`,j()),i=await n.json();i.success&&null!==(e=i.data)&&void 0!==e&&e.counts&&De(i.data.counts),i.success&&null!==(t=i.data)&&void 0!==t&&t.statistics&&Pe(i.data.statistics)}catch(r){console.error("Failed to fetch order counts:",r)}},[null===o||void 0===o?void 0:o.restaurantId,Bt.start,Bt.end]),br=(0,n.useCallback)(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/membership/settings/${o.restaurantId}`,j()),t=await e.json();t.success&&t.data&&At(t.data)}catch(e){console.error("Failed to fetch membership settings:",e)}},[null===o||void 0===o?void 0:o.restaurantId]),fr=(0,n.useRef)(hr);(0,n.useEffect)(()=>{fr.current=hr},[hr]),(0,n.useEffect)(()=>{if(null===o||void 0===o||!o.restaurantId)return;const e=(0,s.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("\u2705 Connected to Socket.IO /orders namespace"),e.emit("join-restaurant",o.restaurantId)}),e.on("connect_error",e=>{console.error("Socket.IO connection error:",e)}),e.on("order-created",e=>{console.log("\ud83d\udce5 Socket: order-created",e.id),Ie(t=>[e,...t]),De(t=>({...t,all:t.all+1,[e.status]:(t[e.status]||0)+1})),fr.current(),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-updated",e=>{console.log("\ud83d\udce5 Socket: order-updated",e.id,e.status),Ie(t=>{const r=t.find(t=>t.id===e.id);return r&&r.status!==e.status&&De(t=>({...t,[r.status]:Math.max(0,(t[r.status]||0)-1),[e.status]:(t[e.status]||0)+1})),t.map(t=>t.id===e.id?e:t)}),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-deleted",e=>{let{id:t}=e;console.log("\ud83d\udce5 Socket: order-deleted",t),Ie(e=>{const r=e.find(e=>e.id===t);return r&&De(e=>({...e,all:Math.max(0,e.all-1),[r.status]:Math.max(0,(e[r.status]||0)-1)})),e.filter(e=>e.id!==t)}),window.dispatchEvent(new Event("refreshBadgeCounts"))}),e.on("order-items-added",e=>{console.log("\ud83d\udce5 Socket: order-items-added",e.orderId,`+Order ${e.orderGroup}`),fr.current(),xr({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),Oe(e),()=>{e.disconnect()}},[null===o||void 0===o?void 0:o.restaurantId]),(0,n.useEffect)(()=>{gr(ut)},[gr,ut]),(0,n.useEffect)(()=>{yr()},[yr]),(0,n.useEffect)(()=>{xt(1)},[ze,Bt.start,Bt.end,St]);const vr=()=>Te;(0,n.useEffect)(()=>{(async()=>{if(null!==o&&void 0!==o&&o.restaurantId)try{const e=await fetch(`/api/restaurants/${o.restaurantId}`,j()),t=await e.json();if(t.success||e.ok){const e=t.data||t;ft({companyName:e.name||"",address:e.address||"",city:e.city||"",state:e.state||"",postcode:e.postal_code||"",phone:e.phone||"",email:e.email||"",taxNo:e.tax_id||""}),e.payment_settings&&jt(e.payment_settings)}}catch(e){console.error("Failed to load company info:",e)}})(),br()},[null===o||void 0===o?void 0:o.restaurantId,br]);const jr=e=>"outstanding"===e.status,_r=e=>e.status,Fr=e=>"outstanding"===e?"Outstanding":e.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),wr=()=>{const e=vr();let t;return t="all"===ze?e:"outstanding"===ze?e.filter(e=>jr(e)):e.filter(e=>e.status===ze),t.sort((e,t)=>{const r=new Date(e.createdAt||e.order_date).getTime();return new Date(t.createdAt||t.order_date).getTime()-r})},kr=e=>$e[e]||0,Cr=async function(e,t){var r;let n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];kt(!1);const i=(new Date).toISOString(),o=null===(r=Te.find(t=>t.id===e))||void 0===r?void 0:r.status;Ie(r=>r.map(r=>r.id===e?{...r,status:t,...n&&{kitchen_ready:!0},...("served"===t||"completed"===t)&&!r.served_at&&{served_at:i}}:r)),o&&o!==t&&De(e=>({...e,[o]:Math.max(0,(e[o]||0)-1),[t]:(e[t]||0)+1}));try{const r={status:t};n&&(r.kitchen_ready=!0);const o=Te.find(t=>t.id===e);"served"!==t&&"completed"!==t||null!==o&&void 0!==o&&o.served_at||(r.served_at=i);const s=await fetch(`/api/orders/${e}/status`,j({method:"PATCH",body:JSON.stringify(r)}));(await s.json()).success?window.dispatchEvent(new Event("refreshBadgeCounts")):gr()}catch(s){console.error("Failed to update status:",s),gr()}},Ar=(e,t,r)=>{if("delivery"===r){return{outstanding:"Proceed Without Payment",pending:"Start Preparing",preparing:"Mark Ready",ready:"Out for Delivery",served:"Mark Delivered",completed:"Completed",cancelled:"Cancelled"}[e]||""}return{outstanding:"Proceed Without Payment",pending:"Start Cooking",preparing:"Mark Ready",ready:"Served",served:"Complete Order",completed:"Completed",cancelled:"Cancelled"}[e]||""},Sr=()=>{zt&&Wt([]),Rt(!zt)},Er=e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status),Br=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");tr(i=>{if(0===r.length){const r=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=i.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return i.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const o=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),s=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:s,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})};(0,n.useEffect)(()=>{Gt?(async()=>{try{const r=(null===Me||void 0===Me?void 0:Me.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId);if(!r)return void console.error("No restaurant ID available for fetching menu");const[n,i]=await Promise.all([fetch(`/api/menu/categories?restaurantId=${r}`,j()),fetch(`/api/menu?restaurantId=${r}`,j())]);if(n.ok&&i.ok){var e,t;const r=await n.json(),o=await i.json(),s=(null===(e=r.data)||void 0===e?void 0:e.categories)||r.categories||[],a=(null===(t=o.data)||void 0===t?void 0:t.items)||o.items||[];console.log("\ud83d\udce6 Add Items - Categories loaded:",s.length),console.log("\ud83d\udce6 Add Items - Items loaded:",a.length),Zt(s.filter(e=>!1!==e.is_active));const d=a.map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Xt(d.filter(e=>!1!==e.is_available)),s.length>0&&Qt(String(s[0].id))}else console.error("Failed to fetch menu - Categories:",n.status,"Items:",i.status)}catch(r){console.error("Failed to fetch menu:",r)}})():(tr([]),Qt(null))},[Gt]);const Tr=e=>{We(e),qe(!0)},Ir=()=>{qe(!1),We(null),at(!1),lt(!1),Jt(!1),tr([])},$r=async e=>{const t=e||Me;if(t){const e=Ee(),r=Array.isArray(t.order_items)?t.order_items:[];if(0===r.length)return console.error("\u274c No items found in order!"),void mr("Cannot print: Order has no items.","error");const n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.order_date||t.createdAt),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){console.warn("Failed to parse options:",t),t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||"",takeawayCharge:parseFloat(t.takeaway_charge||"0")};await(0,h.Si)(n,e)&&console.log("Kitchen ticket printed successfully via RawBT")}},Dr=e=>{Ye(e),Ve(!0)},Nr=()=>{Ye(null),Ve(!1)},Pr=e=>{Xe(e),Je(!0)},Or=()=>{Xe(null),Je(!1)},zr=(e,t)=>{t&&t.stopPropagation(),ot(e),nt(!0)},Rr=e=>(0,g.r6)(e,null===bt||void 0===bt?void 0:bt.operation_settings);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(fe,{}),(null===ur||void 0===ur?void 0:ur.isVisible)&&(0,f.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideIn 0.3s ease-out"},children:[(0,f.jsx)("style",{children:"\n            @keyframes slideIn {\n              from { transform: translateX(100%); opacity: 0; }\n              to { transform: translateX(0); opacity: 1; }\n            }\n          "}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,f.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,f.jsx)("button",{onClick:()=>xr(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,f.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,f.jsxs)("strong",{children:["Order ",ur.orderNumber]}),ur.tableNumber&&` (Table ${ur.tableNumber})`,(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",ur.orderGroup]})," ",ur.itemCount," item",ur.itemCount>1?"s":""," added"]}),(0,f.jsx)("button",{onClick:()=>{Nt(ur.orderNumber),Re("all"),xr(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Order"})]}),(0,f.jsxs)(F,{className:"no-print",children:[(0,f.jsxs)(a.Ay,{title:"Live Orders",children:[zt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(C,{onClick:async()=>{if(Mt.length<2)return void mr("Please select at least 2 orders to merge","info");Te.filter(e=>Mt.includes(e.id)).filter(e=>"pending"!==e.payment_status||["served","completed","cancelled"].includes(e.status)).length>0?mr("Cannot merge orders that are already paid, served, completed, or cancelled.","error"):Vt(!0)},disabled:Mt.length<2||Lt,children:Lt?"Merging...":`Merge (${Mt.length})`}),(0,f.jsx)(k,{active:!1,onClick:Sr,children:"Cancel"})]}),!zt&&(0,f.jsx)(k,{active:zt,onClick:Sr,children:"Select to Merge"}),(0,f.jsx)(w,{enabled:wt,onClick:()=>kt(!wt),title:wt?"Stop notification sound":"Play notification sound",children:wt?(0,f.jsxs)("svg",{viewBox:"0 0 24 24",children:[(0,f.jsx)("rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}),(0,f.jsx)("rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"})]}):(0,f.jsx)("svg",{viewBox:"0 0 24 24",children:(0,f.jsx)("path",{d:"M8 5v14l11-7z"})})})]}),(0,f.jsxs)(A,{children:[(0,f.jsxs)(S,{children:[(0,f.jsx)("div",{children:(0,f.jsx)(b.A,{activePeriod:St,dateRange:Bt,isCustomDateRange:It,onPeriodChange:e=>{Et(e),$t(!1),Tt((0,b.x)(e,Be.timeZone))},onCalendarRangeSelect:(e,t)=>{$t(!0),Et("all"),Tt({start:e,end:t})},includeToday:!0})}),(0,f.jsxs)(E,{children:[(0,f.jsx)($,{children:"\ud83d\udd0d"}),(0,f.jsx)(B,{type:"text",placeholder:"Search...",value:Dt,onChange:e=>Nt(e.target.value)}),Dt&&(0,f.jsx)(T,{onClick:()=>Nt(""),title:"Clear search",children:"\xd7"})]}),(0,f.jsxs)(I,{onClick:()=>{const e=vr();if(0===e.length)return void mr("No orders to download","info");const t=e.map(e=>{var t;const r=new Date(e.order_date||e.createdAt).toLocaleString("en-MY",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0}),n=(null===(t=e.order_items)||void 0===t?void 0:t.map(e=>`${e.quantity}x ${e.menu_item_name||e.name||"Unknown"}`).join("; "))||"",i=e;return[e.order_number||"",r,e.customer_name||"Guest",e.customer_phone||"",(e.order_type||"").replace("_"," ").toUpperCase(),e.table_number||"",e.status||"",e.payment_method||"",e.payment_status||"completed",(0,u.vv)(i.subtotal||e.total_amount||0,Be.currency),(0,u.vv)(i.service_charge||0,Be.currency),(0,u.vv)(i.tax||0,Be.currency),(0,u.vv)(i.discount||0,Be.currency),(0,u.vv)(e.total_amount||0,Be.currency),n]}),r="\ufeff"+[["Order Number","Date & Time","Customer Name","Phone","Order Type","Table Number","Status","Payment Method","Payment Status","Subtotal","Service Charge","Tax","Discount","Total Amount","Items"].join(","),...t.map(e=>e.map(e=>`"${e}"`).join(","))].join("\n"),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),o=URL.createObjectURL(n);i.setAttribute("href",o),i.setAttribute("download",`live_orders_${Bt.start}_to_${Bt.end}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},title:"Download CSV",children:[(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,f.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),(0,f.jsx)("span",{className:"download-label",children:"Download CSV"})]})]}),(0,f.jsxs)(D,{children:[(0,f.jsxs)(N,{active:"all"===ze,onClick:()=>Re("all"),children:["All Orders",(0,f.jsx)(P,{children:kr("all")})]}),(0,f.jsxs)(N,{active:"outstanding"===ze,onClick:()=>Re("outstanding"),children:["Outstanding",(0,f.jsx)(P,{children:kr("outstanding")})]}),(0,f.jsxs)(N,{active:"pending"===ze,onClick:()=>Re("pending"),children:["Pending",(0,f.jsx)(P,{children:kr("pending")})]}),(0,f.jsxs)(N,{active:"preparing"===ze,onClick:()=>Re("preparing"),children:["Preparing",(0,f.jsx)(P,{children:kr("preparing")})]}),(0,f.jsxs)(N,{active:"ready"===ze,onClick:()=>Re("ready"),children:["Ready",(0,f.jsx)(P,{children:kr("ready")})]}),(0,f.jsxs)(N,{active:"served"===ze,onClick:()=>Re("served"),children:["Served",(0,f.jsx)(P,{children:kr("served")})]}),(0,f.jsxs)(N,{active:"completed"===ze,onClick:()=>Re("completed"),children:["Completed",(0,f.jsx)(P,{children:kr("completed")})]}),(0,f.jsxs)(N,{active:"cancelled"===ze,onClick:()=>Re("cancelled"),children:["Cancelled",(0,f.jsx)(P,{children:kr("cancelled")})]})]}),(0,f.jsx)(O,{children:(()=>{const e=(()=>{const e=wr().filter(e=>"cancelled"!==e.status);if(0===e.length)return{totalSales:0,avgOrderAmount:0,maxOrderAmount:0,ordersAbove20Percent:0,avgServeTime:0,maxServeTime:0,minServeTime:0};const t=e.reduce((e,t)=>e+parseFloat(t.total_amount.toString()),0),r=t/e.length,n=Math.max(...e.map(e=>parseFloat(e.total_amount.toString()))),i=e.filter(e=>parseFloat(e.total_amount.toString())>=20).length/e.length*100,o=e.filter(e=>e.served_at&&e.createdAt);let s=0,a=0,d=0;if(o.length>0){const e=o.map(e=>{const t=new Date(e.createdAt).getTime();return(new Date(e.served_at).getTime()-t)/1e3/60});s=e.reduce((e,t)=>e+t,0)/e.length,a=Math.max(...e),d=Math.min(...e)}return{totalSales:t,avgOrderAmount:r,maxOrderAmount:n,ordersAbove20Percent:i,avgServeTime:s,maxServeTime:a,minServeTime:d}})();return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(z,{children:["Total Sales ",(0,f.jsxs)("strong",{children:["RM",Ne.totalSales.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["Avg ",(0,f.jsxs)("strong",{children:["RM",Ne.avgAmount.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["Max ",(0,f.jsxs)("strong",{children:["RM",Ne.maxAmount.toFixed(2)]})]}),(0,f.jsxs)(z,{children:["\u2265RM20 ",(0,f.jsxs)("strong",{children:[e.ordersAbove20Percent.toFixed(1),"%"]})]}),(0,f.jsxs)(z,{children:["Avg Serve ",(0,f.jsxs)("strong",{children:[e.avgServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(z,{children:["Max Serve ",(0,f.jsxs)("strong",{children:[e.maxServeTime.toFixed(1),"m"]})]}),(0,f.jsxs)(z,{children:["Min Serve ",(0,f.jsxs)("strong",{children:[e.minServeTime.toFixed(1),"m"]})]})]})})()}),(0,f.jsx)(R,{children:wr().length>0?(0,f.jsxs)(m.bQ,{children:[(0,f.jsx)(m.B_,{children:(0,f.jsxs)("tr",{children:[zt&&(0,f.jsx)(m.gU,{align:"center",width:"50px",children:(0,f.jsx)("input",{type:"checkbox",checked:Mt.length>0&&Mt.length===wr().slice(50*(ut-1),50*ut).filter(e=>Er(e)).length,onChange:()=>{const e=wr().slice(50*(ut-1),50*ut).filter(e=>"pending"===e.payment_status&&!["served","completed","cancelled"].includes(e.status));Mt.length===e.length?Wt([]):Wt(e.map(e=>e.id))},style:{width:"18px",height:"18px",cursor:"pointer"}})}),(0,f.jsx)(m.gU,{children:"Order"}),(0,f.jsx)(m.gU,{children:"Items"}),(0,f.jsx)(m.gU,{children:"Status"}),(0,f.jsx)(m.gU,{children:"Time"}),(0,f.jsx)(m.gU,{align:"right",children:"Amount"}),(0,f.jsx)(m.gU,{style:{width:"20%",minWidth:"180px"},children:"Action"})]})}),(0,f.jsx)("tbody",{children:wr().slice(50*(ut-1),50*ut).map(e=>(0,f.jsxs)(m.J2,{style:zt&&Mt.includes(e.id)?{backgroundColor:"#EEF2FF"}:{},children:[zt&&(0,f.jsx)(m.Bv,{align:"center",style:{width:"50px"},children:Er(e)?(0,f.jsx)("input",{type:"checkbox",checked:Mt.includes(e.id),onChange:()=>{return t=e.id,void Wt(e=>e.includes(t)?e.filter(e=>e!==t):[...e,t]);var t},style:{width:"18px",height:"18px",cursor:"pointer"}}):(0,f.jsx)("span",{style:{color:"#9CA3AF",fontSize:"12px"},children:"-"})}),(0,f.jsxs)(m.Bv,{"data-label":"ORDER",children:[(0,f.jsxs)(M,{onClick:()=>Tr(e),children:[e.order_number,"takeaway"===e.order_type&&(0,f.jsx)(W,{children:"TAKEAWAY"}),"pickup"===e.order_type&&(0,f.jsx)(W,{style:{background:"#EDE9FE",color:"#7C3AED"},children:"PICKUP"}),"delivery"===e.order_type&&(0,f.jsx)(W,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"}),"mobile"===e.source&&(0,f.jsx)(W,{style:{background:"#DBEAFE",color:"#2563EB"},children:"MOBILE"}),"mobile"===e.source&&(e.customer_id?(0,f.jsx)(W,{style:{background:"#D1FAE5",color:"#059669"},children:"MEMBER"}):(0,f.jsx)(W,{style:{background:"#F3F4F6",color:"#6B7280"},children:"GUEST"})),"kiosk"===e.source&&(0,f.jsx)(W,{style:{background:"#FEF3C7",color:"#D97706"},children:"KIOSK"}),"staffMeal"===e.payment_method&&(0,f.jsx)(W,{style:{background:"#FEE2E2",color:"#DC2626"},children:"STAFF MEAL"})]}),(0,f.jsxs)(L,{children:[e.customer_name||"Guest",e.customer_phone&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),e.customer_phone]}),e.table_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#635BFF",fontWeight:500},children:["Table: ",e.table_number,e.guest_count?` (${e.guest_count}p)`:""]})]}),e.pager_number&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),"Pager: ",e.pager_number]}),"pickup"===e.order_type&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8B5CF6",fontWeight:500},children:["Pickup: ",e.scheduled_pickup_time?v(e.scheduled_pickup_time):"ASAP"]})]}),e.cashier_name&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("br",{}),(0,f.jsxs)("span",{style:{color:"#8898AA",fontSize:"11px"},children:["Cashier: ",e.cashier_name]})]})]})]}),(0,f.jsx)(m.Bv,{"data-label":"ITEMS",children:(0,f.jsx)(q,{children:e.order_items&&Array.isArray(e.order_items)&&e.order_items.map((e,t)=>{var r;return(0,f.jsxs)(U,{children:[(0,f.jsxs)("div",{children:[(0,f.jsxs)(V,{children:[e.quantity,"x"]}),e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item"]}),e.options&&e.options.length>0&&(0,f.jsx)(H,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},t)})})}),(0,f.jsx)(m.Bv,{"data-label":"STATUS",align:"center",children:(0,f.jsx)(Y,{status:_r(e),children:Fr(_r(e))})}),(0,f.jsx)(m.Bv,{"data-label":"TIME",align:"center",children:(0,f.jsxs)(G,{children:[Rr(e.createdAt||e.order_date),(0,f.jsx)("br",{}),!e.served_at&&(0,f.jsx)(_,{dateString:e.createdAt||e.order_date||""},`time-${e.id}-${_t}`),e.served_at&&(0,f.jsxs)("span",{style:{fontSize:"11px",color:"#0A2540"},children:["Served: ",Rr(e.served_at),(()=>{const t=new Date(e.createdAt||e.order_date).getTime(),r=new Date(e.served_at).getTime();return` (${Math.round((r-t)/1e3/60)}min)`})()]})]})}),(0,f.jsx)(m.Bv,{"data-label":"AMOUNT",align:"right",children:(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)(m.DM,{highlight:!0,children:(0,u.vv)(Number(e.total_amount),Be.currency)}),Number(e.points_used)>0&&(0,f.jsxs)("div",{style:{fontSize:"11px",color:"#10B981"},children:["(-",Number(e.points_used).toLocaleString(),"P)"]}),Number(e.coupon_discount)>0&&(0,f.jsx)("div",{style:{fontSize:"11px",color:"#F59E0B"},children:"(Coupon)"}),(0,f.jsxs)(J,{isPending:"pending"===e.payment_status,isVerificationPending:"payment_verification_pending"===e.payment_status,children:[(0,x.MA)(e.payment_method,e.card_type),"pending"===e.payment_status&&" (Pending)","payment_verification_pending"===e.payment_status&&" (Verifying)"]})]})}),(0,f.jsx)(m.Bv,{"data-label":"ACTION",mobileFullWidth:!0,children:(0,f.jsxs)(ee,{children:["completed"!==e.status&&"cancelled"!==e.status&&(0,f.jsxs)(f.Fragment,{children:[jr(e)&&"payment_verification_pending"!==e.payment_status&&"rejected"!==e.payment_status&&(0,f.jsx)(K,{onClick:t=>{t.stopPropagation(),Cr(e.id,"pending")},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),!jr(e)&&(0,f.jsx)(K,{onClick:()=>{const t=(r=e.status,{outstanding:"pending",pending:"preparing",preparing:"ready",ready:"served",served:"completed"===e.payment_status?"completed":null,completed:null,cancelled:null}[r]||null);var r;t&&Cr(e.id,t)},style:"ready"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:"served"===e.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Ar(e.status,e.payment_status,e.order_type)})]}),"cancelled"!==e.status&&!jr(e)&&(0,f.jsx)(K,{variant:"secondary",onClick:()=>{if("pending"===e.status)Cr(e.id,"outstanding");else{const t={preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e.status]||null;t&&Cr(e.id,t)}},title:"Revert to previous status",children:"\u21ba"}),"pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>zr(e,t),style:"served"===e.status?{background:"#10B981",borderColor:"#10B981",color:"white"}:{background:"#F6F9FC",color:"#6B7C93",border:"1px solid #E6EBF1"},children:"Payment"}),"payment_verification_pending"===e.payment_status&&(0,f.jsx)(K,{onClick:t=>{t.stopPropagation(),Ot(e)},style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"completed"!==e.status&&"cancelled"!==e.status&&"pending"!==e.payment_status&&"payment_verification_pending"!==e.payment_status&&(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),Cr(e.id,"completed")},title:"Mark as Completed",children:(0,f.jsx)(te,{children:"\u2713"})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),Tr(e)},title:"View Details",children:(0,f.jsx)(te,{children:"\u25c9"})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{const r=e||Me;if(r){console.log("\ud83d\udd0d Print Bill - Full order object:",r),console.log("\ud83d\udce6 order_items field:",r.order_items),console.log("\ud83d\udce6 order_items type:",typeof r.order_items),console.log("\ud83d\udce6 Is array?:",Array.isArray(r.order_items));const e=Ee(),n=Array.isArray(r.order_items)?r.order_items:[];if(console.log("\ud83d\udce6 Processed orderItems:",n),console.log("\ud83d\udce6 orderItems length:",n.length),0===n.length)return console.error("\u274c No items found in order!"),void mr("Cannot print: Order has no items.","error");const i={orderNumber:r.order_number,pickupNumber:r.order_number.split("-")[1],tableNumber:r.table_number||null,pagerNumber:r.pager_number||null,date:new Date(r.order_date||r.createdAt),items:n.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){console.warn("Failed to parse options:",r),r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:r}}),subtotal:parseFloat(r.subtotal||"0"),discount:parseFloat(r.discount||"0"),coupon:r.coupon_code?{code:r.coupon_code,discount:parseFloat(r.coupon_discount||"0")}:null,takeawayCharge:parseFloat(r.takeaway_charge||"0"),serviceCharge:parseFloat(r.service_charge||"0"),serviceChargeRate:parseFloat(r.service_charge_rate||"10"),tax:parseFloat(r.tax||"0"),taxRate:parseFloat(r.tax_rate||"6"),total:parseFloat(r.final_price||r.total_amount||"0"),paymentMethod:r.payment_method||"cash",amountReceived:parseFloat(r.amount_received||"0"),change:parseFloat(r.change||"0"),cashierName:r.cashier_name||null};await(0,h.pG)(i,e)&&console.log("Bill printed successfully via RawBT")}})(e)},title:"Print Bill",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),$r(e)},title:"Print Kitchen Ticket",children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(()=>{const t=Array.isArray(e.order_items)?e.order_items:[],r=t.length>0?Math.max(...t.map(e=>e.order_group||0)):0;return r>0?(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),(async e=>{var r;const n=Ee(),i=Array.isArray(e.order_items)?e.order_items:[];if(0===i.length)return void mr("No items in order","error");const o=i.map(e=>e.order_group||0),s=Math.max(...o);if(0===s)return void $r(e);const a=i.filter(e=>(e.order_group||0)===s),d={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:null!==(r=a[0])&&void 0!==r&&r.added_at?new Date(a[0].added_at):new Date(e.order_date||e.createdAt),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",groupLabel:`+Order ${s}`,items:a.map(e=>{let r=e.options||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(t){r=[]}return Array.isArray(r)||(r=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:r}}),notes:"",takeawayCharge:0};await(0,h.Si)(d,n)&&mr(`Kitchen ticket for +Order ${s} printed`,"success")})(e)},title:`Print +Order ${r} Ticket`,style:{background:"#FEF3C7",color:"#92400E"},children:(0,f.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{d:"M12 4v16m8-8H4"})})}):null})(),(0,f.jsx)(Q,{onClick:t=>{t.stopPropagation(),"cancelled"===e.status?Dr(e.id):Pr(e.id)},title:"cancelled"===e.status?"Remove Order":"Cancel Order",children:(0,f.jsx)(te,{children:"\u2715"})})]})})]},e.id))})]}):(0,f.jsx)(m.ys,{children:"No orders found in this category"})}),Le&&Me&&(0,f.jsx)(m.aF,{isOpen:!0,onClose:()=>{at(!1),lt(!1),Jt(!1),tr([]),Ir()},title:Gt?"Add Items to Order":st?"Receipt Preview":dt?"Kitchen Order Ticket Preview":`Order ${Me.order_number}`,footer:Gt?void 0:st?(0,f.jsx)(K,{onClick:()=>at(!1),children:"Back to Order Details"}):dt?(0,f.jsx)(K,{onClick:()=>lt(!1),children:"Back to Order Details"}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:()=>Dr(Me.id),style:{background:"#6B7280",borderColor:"#6B7280",color:"white"},children:"Remove"}),"cancelled"!==Me.status&&"completed"!==Me.status&&(0,f.jsx)(K,{onClick:()=>Pr(Me.id),style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Cancel Order"}),jr(Me)&&"pending"!==Me.status&&"payment_verification_pending"!==Me.payment_status&&"rejected"!==Me.payment_status&&(0,f.jsx)(K,{onClick:()=>{Cr(Me.id,"pending"),Ir()},style:{background:"#F59E0B",borderColor:"#F59E0B",color:"white"},children:"Proceed Without Payment"}),"pending"===Me.payment_status&&(0,f.jsx)(K,{onClick:()=>zr(Me),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Payment"}),"payment_verification_pending"===Me.payment_status&&(0,f.jsx)(K,{onClick:()=>Ot(Me),style:{background:"#10B981",borderColor:"#10B981",color:"white"},children:"Confirm Payment"}),"pending"===Me.payment_status&&!["served","completed","cancelled"].includes(Me.status)&&(0,f.jsx)(K,{onClick:()=>Jt(!0),style:{background:"#8B5CF6",borderColor:"#8B5CF6",color:"white"},children:"Add Items"}),(0,f.jsx)(K,{onClick:()=>at(!0),style:{marginRight:"10px"},children:"View Receipt"}),(0,f.jsx)(K,{onClick:()=>lt(!0),style:{marginRight:"10px"},children:"View Order Ticket"}),(0,f.jsx)(K,{onClick:async()=>{if(Me){const e=Ee(),t={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,date:new Date(Me.order_date||Me.createdAt),items:Me.order_items.map(e=>({menuItem:{name:e.menu_item_name,price:parseFloat(e.price)},quantity:e.quantity,options:e.options||[]})),subtotal:parseFloat(Me.subtotal||"0"),discount:parseFloat(Me.discount||"0"),coupon:Me.coupon_code?{code:Me.coupon_code,discount:parseFloat(Me.coupon_discount||"0")}:null,serviceCharge:parseFloat(Me.service_charge||"0"),serviceChargeRate:parseFloat(Me.service_charge_rate||"10"),tax:parseFloat(Me.tax||"0"),taxRate:parseFloat(Me.tax_rate||"6"),total:parseFloat(Me.final_price||Me.total_amount||"0"),paymentMethod:Me.payment_method||"cash",amountReceived:parseFloat(Me.amount_received||"0"),change:parseFloat(Me.change||"0"),cashierName:Me.cashier_name||null};await(0,h.pG)(t,e)&&console.log("Receipt printed successfully via RawBT")}},children:"Print Bill"})]}),children:Gt?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{padding:"20px",maxHeight:"calc(70vh - 80px)",overflow:"auto"},children:[(0,f.jsx)("div",{style:{marginBottom:"20px"},children:(0,f.jsx)("input",{type:"text",placeholder:"Search menu items...",value:ir,onChange:e=>or(e.target.value),style:{width:"100%",padding:"12px 16px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"15px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>e.currentTarget.style.borderColor="#635BFF",onBlur:e=>e.currentTarget.style.borderColor="#E5E7EB",autoFocus:!0})}),ir.length>0&&(0,f.jsxs)("div",{style:{marginBottom:"20px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Kt.filter(e=>{if(!e||!e.name)return!1;const t=ir.toLowerCase(),r=e.name.toLowerCase().includes(t),n=!!e.code&&e.code.toLowerCase().includes(t);return r||n}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,f.jsxs)("div",{style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",transition:"background 0.1s"},onMouseEnter:e=>e.currentTarget.style.background="#F9FAFB",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0,cursor:"pointer"},onClick:()=>{Br(e,1,[]),or("")},children:[(0,f.jsxs)("span",{style:{fontWeight:500},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,f.jsx)("span",{style:{marginLeft:"8px",fontSize:"11px",background:"#EDE9FE",color:"#7C3AED",padding:"2px 6px",borderRadius:"4px"},children:"SET"})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("span",{style:{color:"#635BFF",fontWeight:500},children:(0,u.vv)(parseFloat(e.price)||0,Be.currency)}),t&&(0,f.jsx)("button",{onClick:t=>{t.stopPropagation(),lr(e),ar(!0)},style:{padding:"4px 10px",fontSize:"12px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Kt.filter(e=>e.name.toLowerCase().includes(ir.toLowerCase())||e.code&&e.code.toLowerCase().includes(ir.toLowerCase())).length&&(0,f.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF"},children:"No items found"})]}),(0,f.jsxs)("div",{children:[(0,f.jsxs)("h4",{style:{margin:"0 0 12px 0",fontWeight:600,color:"#0A2540"},children:["Items to Add (",er.reduce((e,t)=>e+t.quantity,0),")"]}),0===er.length?(0,f.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px"},children:"Search and select items to add"}):(0,f.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:er.map(e=>(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,f.jsx)("div",{style:{fontWeight:500},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,f.jsxs)("div",{style:{color:"#6B7280",fontSize:"13px"},children:[(0,u.vv)(e.unitPrice||parseFloat(e.price),Be.currency)," each"]})]}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void tr(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"-"}),(0,f.jsx)("span",{style:{minWidth:"28px",textAlign:"center",fontWeight:600,fontSize:"15px"},children:e.quantity}),(0,f.jsx)("button",{onClick:()=>{return t=e.cartId,void tr(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"32px",height:"32px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"18px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,f.jsx)("div",{style:{borderTop:"1px solid #E5E7EB",padding:"16px 20px",display:"flex",flexWrap:"wrap",justifyContent:"flex-end",gap:"8px"},children:(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},children:[(0,f.jsxs)("div",{style:{fontWeight:600},children:["Total: ",(0,u.vv)(er.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),Be.currency)]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,f.jsx)(K,{onClick:()=>{Jt(!1),tr([]),or(""),Ir()},style:{background:"white",color:"#6B7C93",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(null!==Me&&void 0!==Me&&Me.id&&0!==er.length)try{nr(!0);const e=er.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),t=await fetch(`/api/orders/${null===Me||void 0===Me?void 0:Me.id}/merge-items`,j({method:"POST",body:JSON.stringify({items:e,source:"live_orders"})}));if(!t.ok){const e=await t.json();throw new Error(e.message||"Failed to add items")}mr("Items added successfully","success"),Jt(!1),tr([]),or(""),Ir(),gr()}catch(e){console.error("Add items error:",e),mr(e.message||"Failed to add items","error")}finally{nr(!1)}},disabled:0===er.length||rr,style:{background:0===er.length?"#E5E7EB":"#635BFF",color:"white",cursor:0===er.length?"not-allowed":"pointer"},children:rr?"Adding...":"Add to Order"})]})]})})]}):dt?(0,f.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ee(),t=Array.isArray(Me.order_items)?Me.order_items:[],r={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],date:new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,orderSource:Me.order_source||"pos",tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,customerName:Me.customer_name||"Walk-in Customer",scheduledPickupTime:Me.scheduled_pickup_time||null,items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:e.options||[]})),notes:Me.notes||"",takeawayCharge:parseFloat(Me.takeaway_charge||"0")};return(0,h.KB)(r,e).split("\n").map((e,t)=>(0,f.jsx)("div",{children:e||"\xa0"},t))})()})}):st?(0,f.jsx)("div",{style:{display:"flex",justifyContent:"center",padding:"20px"},children:(0,f.jsx)("div",{style:{width:"302px",padding:"20px",fontFamily:"monospace",fontSize:"11px",lineHeight:"1.3",whiteSpace:"pre",backgroundColor:"#ffffff",border:"2px solid #333",borderRadius:"4px",boxShadow:"0 4px 6px rgba(0,0,0,0.1)",maxHeight:"600px",overflowY:"auto",overflowX:"hidden"},children:(()=>{const e=Ee(),t=Array.isArray(Me.order_items)?Me.order_items:[],r={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],pagerNumber:Me.pager_number||null,date:new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,scheduledPickupTime:Me.scheduled_pickup_time||null,currency:Be.currency||"RM",items:t.map(e=>({menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0")},quantity:e.quantity||1,options:e.options||[]})),subtotal:parseFloat(Me.subtotal||"0"),discount:parseFloat(Me.discount||"0"),discountPolicy:Me.discount_policy_name?{name:Me.discount_policy_name,amount:parseFloat(Me.discount_policy_amount||"0")}:void 0,coupon:Me.coupon_code?{code:Me.coupon_code,discount:parseFloat(Me.coupon_discount||"0")}:null,takeawayCharge:parseFloat(Me.takeaway_charge||"0"),serviceCharge:parseFloat(Me.service_charge||"0"),serviceChargeRate:parseFloat(Me.service_charge_rate||"10"),tax:parseFloat(Me.tax||"0"),taxRate:parseFloat(Me.tax_rate||"6"),total:parseFloat(Me.final_price||Me.total_amount||"0"),paymentMethod:Me.payment_method||"cash",amountReceived:parseFloat(Me.amount_received||"0"),change:parseFloat(Me.change||"0"),deliveryInfo:Me.delivery_info||null,deliveryFee:parseFloat(Me.delivery_fee||"0")};return(0,h.qE)(r,e).replace(/\x1B[@E][\x00\x01]/g,"").replace(/\x1Ba[\x00-\x02]/g,"").replace(/\x1D![\x00-\x11]/g,"").replace(/\x1DB[\x00\x01]/g,"").replace(/\x1DV\x41\x00/g,"").replace(/[\x1B\x1D]./g,"")})()})}):(0,f.jsxs)("div",{style:{padding:"24px"},children:[(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Customer Information"}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Name:"}),(0,f.jsx)(se,{children:Me.customer_name||"Guest"})]}),Me.customer_phone&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Phone:"}),(0,f.jsx)(se,{children:Me.customer_phone})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Order Type:"}),(0,f.jsx)(se,{children:null===(e=Me.order_type)||void 0===e?void 0:e.replace("_"," ").toUpperCase()})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Source:"}),(0,f.jsx)(se,{children:"mobile"===Me.source?"Mobile Order":"kiosk"===Me.source?"Kiosk":"POS Terminal"})]}),"mobile"===Me.source&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Customer Type:"}),(0,f.jsx)(se,{children:Me.customer_id?"Member":"Guest"})]}),Me.table_number&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Table Number:"}),(0,f.jsxs)(se,{children:[Me.table_number,Me.guest_count?` (${Me.guest_count} guests)`:""]})]}),"pickup"===Me.order_type&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Scheduled Pickup:"}),(0,f.jsx)(se,{style:{color:"#8B5CF6",fontWeight:600},children:Me.scheduled_pickup_time?v(Me.scheduled_pickup_time):"ASAP"})]})]}),"delivery"===Me.order_type&&Me.delivery_info&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ue,{}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Delivery Information"}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Address:"}),(0,f.jsx)(se,{children:Me.delivery_info.address})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Phone:"}),(0,f.jsx)(se,{children:Me.delivery_info.phone})]}),Me.delivery_info.zoneName&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Zone:"}),(0,f.jsx)(se,{children:Me.delivery_info.zoneName})]}),Me.delivery_info.notes&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Notes:"}),(0,f.jsx)(se,{style:{fontStyle:"italic"},children:Me.delivery_info.notes})]}),Me.delivery_fee>0&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Delivery Fee:"}),(0,f.jsx)(se,{children:(0,u.vv)(parseFloat(Me.delivery_fee||"0"),Be.currency)})]})]})]}),(0,f.jsx)(ue,{}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Order Information"}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Order Time:"}),(0,f.jsx)(se,{children:Rr(Me.createdAt)})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Status:"}),(0,f.jsx)(se,{children:(0,f.jsx)(Y,{status:Me.status,children:Fr(Me.status)})})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Payment Method:"}),(0,f.jsx)(se,{children:(0,x.MA)(Me.payment_method,Me.card_type)})]}),(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Payment Status:"}),(0,f.jsx)(se,{children:"payment_verification_pending"===Me.payment_status?(0,f.jsx)("span",{style:{color:"#F59E0B",fontWeight:500},children:"\u23f3 Verification Pending"}):"pending"===Me.payment_status?(0,f.jsx)("span",{style:{color:"#FF6B6B",fontWeight:500},children:"Pending"}):"paid"===Me.payment_status?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:500},children:"\u2713 Paid"}):Me.payment_status||"N/A"})]}),Me.cashier_name&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Cashier:"}),(0,f.jsx)(se,{children:Me.cashier_name})]})]}),Me.payment_proof&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ue,{}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Customer Submitted Proof"}),Me.payment_proof.reference&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Transaction Reference:"}),(0,f.jsx)(se,{style:{fontWeight:600,fontFamily:"monospace"},children:Me.payment_proof.reference})]}),Me.payment_proof.file_name&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Receipt File:"}),(0,f.jsx)(se,{children:Me.payment_proof.file_name})]}),Me.payment_proof.uploaded_at&&(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:"Submitted At:"}),(0,f.jsx)(se,{children:Rr(Me.payment_proof.uploaded_at)})]}),Me.payment_proof.image&&(0,f.jsxs)("div",{style:{marginTop:"16px"},children:[(0,f.jsx)(oe,{style:{marginBottom:"14px"},children:"Receipt Image:"}),(0,f.jsx)("div",{style:{position:"relative"},children:(0,f.jsx)("img",{src:Me.payment_proof.image,alt:"Payment receipt",style:{maxWidth:"100%",maxHeight:"400px",borderRadius:"8px",border:"1px solid #E5E7EB",cursor:"pointer",display:"block"},onClick:()=>window.open(Me.payment_proof.image,"_blank")})})]})]})]}),(0,f.jsx)(ue,{}),(0,f.jsxs)(re,{children:[(0,f.jsx)(ne,{children:"Order Items"}),(()=>{const e=Me.order_items&&Array.isArray(Me.order_items)?Me.order_items:[],t=e.map((e,t)=>({...e,_originalIndex:t})),r={};t.forEach(e=>{const t=e.order_group||0;r[t]||(r[t]=[]),r[t].push(e)});const n=Object.keys(r).map(Number).sort((e,t)=>e-t),i=n.length>1||1===n.length&&n[0]>0;return n.map(t=>{var n;return(0,f.jsxs)("div",{children:[i&&(0,f.jsxs)("div",{style:{background:0===t?"#F3F4F6":"#FEF3C7",padding:"6px 12px",borderRadius:"4px",fontSize:"12px",fontWeight:600,color:0===t?"#6B7280":"#92400E",marginTop:t>0?"12px":"0",marginBottom:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsx)("span",{children:0===t?"Original Order":`+Order ${t}`}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[t>0&&(null===(n=r[t][0])||void 0===n?void 0:n.added_at)&&(0,f.jsx)("span",{style:{fontWeight:400,fontSize:"11px"},children:new Date(r[t][0].added_at).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}),(0,f.jsx)("button",{onClick:()=>(async(e,t)=>{var r;if(!Me)return;const n=Ee();if(0===t.length)return void mr("No items in this group","error");const i={orderNumber:Me.order_number,pickupNumber:Me.order_number.split("-")[1],date:null!==(r=t[0])&&void 0!==r&&r.added_at?new Date(t[0].added_at):new Date(Me.order_date||Me.createdAt),orderType:Me.order_type,orderSource:Me.order_source||"pos",tableNumber:Me.table_number||null,pagerNumber:Me.pager_number||null,customerName:Me.customer_name||"Walk-in Customer",groupLabel:0===e?"Original Order":`+Order ${e}`,items:t.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||e.menuItem&&e.menuItem.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:Me.notes||"",takeawayCharge:0};await(0,h.Si)(i,n)&&mr(`Kitchen ticket for ${0===e?"Original Order":`+Order ${e}`} printed`,"success")})(t,r[t]),style:{background:0===t?"#6B7280":"#F59E0B",color:"white",border:"none",borderRadius:"4px",padding:"4px 8px",fontSize:"11px",fontWeight:500,cursor:"pointer"},title:"Print kitchen ticket for this group",children:"Print"})]})]}),r[t].map((r,n)=>{var i,o,s;return(0,f.jsxs)(ae,{style:{display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,f.jsxs)(de,{style:{flex:1},children:[(0,f.jsx)(le,{children:r.name||(null===(i=r.menuItem)||void 0===i?void 0:i.name)||"Item"}),r.options&&r.options.length>0&&(0,f.jsx)(ce,{children:Array.isArray(r.options)?r.options.join(", "):r.options}),(0,f.jsxs)(pe,{children:[(0,f.jsxs)("span",{children:[r.quantity," \xd7 ",(0,u.vv)(parseFloat(r.price||(null===(o=r.menuItem)||void 0===o?void 0:o.price)||0),Be.currency)]}),(0,f.jsx)("span",{children:(0,u.vv)(r.quantity*parseFloat(r.price||(null===(s=r.menuItem)||void 0===s?void 0:s.price)||0),Be.currency)})]})]}),"completed"!==Me.payment_status&&e.length>1&&(0,f.jsx)("button",{onClick:()=>{var e,t,n;return t=r._originalIndex,n=r.name||(null===(e=r.menuItem)||void 0===e?void 0:e.name)||"Item",void(Me&&(tt({index:t,name:n}),Qe(!0)))},style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",padding:"4px",marginTop:"2px",fontSize:"16px",lineHeight:1},title:"Remove item",children:"\xd7"})]},`${t}-${n}`)})]},t)})})()]}),(0,f.jsx)(ue,{}),(0,f.jsxs)(xe,{children:[(0,f.jsxs)(me,{children:[(0,f.jsx)("span",{children:"Subtotal"}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.subtotal||Me.total_amount),Be.currency)})]}),Me.takeaway_charge&&parseFloat(Me.takeaway_charge)>0&&(0,f.jsxs)(me,{children:[(0,f.jsx)("span",{children:"Takeaway Charge"}),(0,f.jsx)("span",{children:(0,u.vv)(parseFloat(Me.takeaway_charge),Be.currency)})]}),Me.discount>0&&(0,f.jsxs)(me,{children:[(0,f.jsx)("span",{children:"Discount"}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.discount),Be.currency)})]}),Me.discount_policy_amount>0&&(0,f.jsxs)(me,{children:[(0,f.jsxs)("span",{children:["Discount (",Me.discount_policy_name,")"]}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.discount_policy_amount),Be.currency)})]}),Me.coupon_discount>0&&(0,f.jsxs)(me,{children:[(0,f.jsxs)("span",{children:["Coupon (",Me.coupon_code,")"]}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.coupon_discount),Be.currency)})]}),Number(Me.point_discount)>0&&(0,f.jsxs)(me,{children:[(0,f.jsxs)("span",{children:["Points (",Number(Me.points_used||0).toLocaleString()," pts)"]}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.point_discount),Be.currency)})]}),Me.service_charge>0&&(0,f.jsxs)(me,{children:[(0,f.jsxs)("span",{children:["Service Charge (",Me.service_charge_rate||10,"%)"]}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.service_charge),Be.currency)})]}),Me.tax>0&&(0,f.jsxs)(me,{children:[(0,f.jsxs)("span",{children:["Tax (",Me.tax_rate||6,"%)"]}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.tax),Be.currency)})]}),(0,f.jsxs)(me,{isTotal:!0,children:[(0,f.jsx)("span",{children:"Total"}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.total_amount),Be.currency)})]})]})]})}),Me&&i.createPortal((0,f.jsxs)(be,{id:"bill-print-content",children:[(0,f.jsxs)(ve,{children:[(0,f.jsx)(je,{children:(null===bt||void 0===bt?void 0:bt.companyName)||"Restaurant"}),bt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{fontSize:"11px",marginTop:"5px"},children:bt.address}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:[bt.city,", ",bt.state," ",bt.postcode]}),(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Tel: ",bt.phone]}),bt.email&&(0,f.jsxs)("div",{style:{fontSize:"11px"},children:["Email: ",bt.email]}),bt.taxNo&&(0,f.jsxs)("div",{style:{fontSize:"11px",marginTop:"3px"},children:["Tax No: ",bt.taxNo]})]}),(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"bold",marginTop:"5px"},children:"ORDER RECEIPT"})]}),(0,f.jsxs)(_e,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Order No:"}),(0,f.jsx)("span",{children:Me.order_number})]}),(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Date:"}),(0,f.jsx)("span",{children:Rr(Me.order_date||Me.createdAt)})]}),(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Customer:"}),(0,f.jsx)("span",{children:Me.customer_name||"Guest"})]}),Me.customer_phone&&(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Phone:"}),(0,f.jsx)("span",{children:Me.customer_phone})]}),(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Order Type:"}),(0,f.jsx)("span",{children:"dine_in"===Me.order_type?"DINE IN":null===(t=Me.order_type)||void 0===t?void 0:t.toUpperCase()})]}),Me.table_number&&(0,f.jsxs)(Fe,{children:[(0,f.jsx)("strong",{children:"Table:"}),(0,f.jsxs)("span",{children:[Me.table_number,Me.guest_count?` (${Me.guest_count}p)`:""]})]}),("takeaway"===Me.order_type||"pickup"===Me.order_type)&&(0,f.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",Me.order_number.split("-")[1]||"000"]}),"pickup"===Me.order_type&&(0,f.jsxs)("div",{style:{fontSize:"14px",fontWeight:"bold",textAlign:"center",margin:"5px 0",color:"#8B5CF6"},children:["Pickup: ",Me.scheduled_pickup_time?v(Me.scheduled_pickup_time):"ASAP"]})]}),(0,f.jsx)(_e,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,f.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,f.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,f.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,f.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,f.jsx)("tbody",{children:Me.order_items&&Array.isArray(Me.order_items)&&Me.order_items.map((e,t)=>{var r,n,i;return(0,f.jsxs)("tr",{children:[(0,f.jsxs)("td",{style:{padding:"5px 0"},children:[e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",e.options&&e.options.length>0&&(0,f.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:Array.isArray(e.options)?e.options.join(", "):e.options})]}),(0,f.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,f.jsx)("td",{style:{textAlign:"right"},children:parseFloat(e.price||(null===(n=e.menuItem)||void 0===n?void 0:n.price)||0).toFixed(2)}),(0,f.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*parseFloat(e.price||(null===(i=e.menuItem)||void 0===i?void 0:i.price)||0)).toFixed(2)})]},t)})})]})}),(0,f.jsxs)(_e,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(Fe,{children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.subtotal||Me.total_amount),Be.currency)})]}),Me.discount>0&&(0,f.jsxs)(Fe,{children:[(0,f.jsx)("span",{children:"Discount:"}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.discount),Be.currency)})]}),Me.coupon_discount>0&&(0,f.jsxs)(Fe,{children:[(0,f.jsxs)("span",{children:["Coupon (",Me.coupon_code,"):"]}),(0,f.jsx)("span",{children:(0,u.vv)(-Number(Me.coupon_discount),Be.currency)})]}),parseFloat(Me.takeaway_charge||0)>0&&(0,f.jsxs)(Fe,{children:[(0,f.jsx)("span",{children:"Takeaway Charge:"}),(0,f.jsx)("span",{children:(0,u.vv)(parseFloat(Me.takeaway_charge),Be.currency)})]}),Me.service_charge>0&&(0,f.jsxs)(Fe,{children:[(0,f.jsxs)("span",{children:["Service Charge (",Me.service_charge_rate||10,"%):"]}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.service_charge),Be.currency)})]}),Me.tax>0&&(0,f.jsxs)(Fe,{children:[(0,f.jsxs)("span",{children:["Tax (",Me.tax_rate||6,"%):"]}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.tax),Be.currency)})]}),(0,f.jsxs)(Fe,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,f.jsx)("span",{children:"TOTAL:"}),(0,f.jsx)("span",{children:(0,u.vv)(Number(Me.total_amount),Be.currency)})]})]}),(0,f.jsxs)(_e,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,f.jsxs)(Fe,{children:[(0,f.jsx)("span",{children:"Payment Method:"}),(0,f.jsx)("span",{children:(0,x.MA)(Me.payment_method,Me.card_type).toUpperCase()})]}),(0,f.jsxs)(Fe,{children:[(0,f.jsx)("span",{children:"Order Status:"}),(0,f.jsx)("span",{children:Me.status.toUpperCase()})]})]}),(0,f.jsxs)(we,{children:[(0,f.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,f.jsx)("div",{children:"Thank you for your purchase!"}),(0,f.jsx)("div",{children:"Please keep this receipt for your records"})]})]}),document.body),Ue&&(0,f.jsxs)(m.aF,{isOpen:!0,onClose:Nr,title:"Delete Order",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Nr,children:"Cancel"}),(0,f.jsx)(K,{onClick:async()=>{if(He){const t=He;Ie(e=>e.filter(e=>e.id!==t)),Ve(!1),Ye(null);try{const e=await fetch(`/api/orders/${t}`,j({method:"DELETE"}));(await e.json()).success?console.log("Order deleted successfully"):gr()}catch(e){console.error("Failed to delete order:",e),gr()}}else Ve(!1)},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Delete Order"})]}),children:[(0,f.jsx)("p",{children:"Are you sure you want to delete this order? This action cannot be undone."}),(0,f.jsxs)("p",{style:{color:"#FF6B6B",fontWeight:500,marginTop:"16px"},children:["Order #",He&&(null===(r=Te.find(e=>e.id===He))||void 0===r?void 0:r.order_number)]})]}),Ge&&(0,f.jsx)(m.aF,{isOpen:!0,onClose:Or,title:"Cancel Order",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{variant:"secondary",onClick:Or,children:"No, Keep Order"}),(0,f.jsx)(K,{onClick:async()=>{if(Ke){Ie(e=>e.map(e=>e.id===Ke?{...e,status:"cancelled"}:e)),Je(!1),(null===Me||void 0===Me?void 0:Me.id)===Ke&&Ir();try{const e=await fetch(`/api/orders/${Ke}/status`,j({method:"PATCH",body:JSON.stringify({status:"cancelled"})}));(await e.json()).success?console.log("Order cancelled successfully"):gr()}catch(e){console.error("Failed to cancel order:",e),gr()}finally{Xe(null)}}},style:{background:"#FF6B6B",borderColor:"#FF6B6B",color:"white"},children:"Yes, Cancel Order"})]}),children:(0,f.jsx)("p",{style:{margin:0,fontSize:"14px",lineHeight:"1.6"},children:"Are you sure you want to cancel this order? The order history will be kept for your records."})}),(0,f.jsx)(y.A,{isOpen:Ze,title:"Remove Item",message:`Are you sure you want to remove "${(null===et||void 0===et?void 0:et.name)||""}" from this order?`,onConfirm:async()=>{if(Me&&et)try{const e=await fetch(`/api/orders/${Me.id}/items/${et.index}`,{...j({method:"DELETE"})}),t=await e.json();t.success?(mr(`Item removed: ${et.name}`,"success"),We(t.data),gr()):mr(t.error||"Failed to remove item","error")}catch(e){console.error("Error deleting item:",e),mr("Failed to remove item","error")}finally{Qe(!1),tt(null)}},onCancel:()=>{Qe(!1),tt(null)},confirmText:"Remove",cancelText:"Cancel",type:"danger"}),(0,f.jsx)(m.aF,{isOpen:!!Pt,onClose:()=>Ot(null),title:"Payment Verification",size:"small",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(X,{variant:"secondary",onClick:async()=>{if(Pt)try{await fetch(`/api/orders/${Pt.id}`,j({method:"PATCH",body:JSON.stringify({payment_status:"rejected",status:"outstanding"})})),Ot(null),gr()}catch(e){console.error("Error rejecting payment:",e)}},children:"Reject"}),(0,f.jsx)(Z,{variant:"primary",onClick:async()=>{if(Pt){kt(!1);try{await fetch(`/api/orders/${Pt.id}`,j({method:"PATCH",body:JSON.stringify({payment_status:"completed"})})),"outstanding"===Pt.status&&await fetch(`/api/orders/${Pt.id}/status`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})),Ot(null),gr()}catch(e){console.error("Error confirming payment:",e)}}},children:"Confirm Payment"})]}),children:Pt&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,f.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,f.jsxs)("strong",{style:{color:"#0A2540"},children:["#",Pt.order_number]})]}),(0,f.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,f.jsx)("strong",{style:{color:"#0A2540"},children:(0,u.vv)(Pt.total_amount,Be.currency)})]}),(0,f.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,f.jsx)("strong",{style:{color:"#0A2540"},children:Pt.payment_method})]})]}),(0,f.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),Pt.payment_proof?(0,f.jsxs)(f.Fragment,{children:[Pt.payment_proof.reference&&(0,f.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,f.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,f.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:Pt.payment_proof.reference})]}),Pt.payment_proof.file_name&&(0,f.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",Pt.payment_proof.file_name]}),Pt.payment_proof.uploaded_at&&(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(Pt.payment_proof.uploaded_at).toLocaleString()]}),Pt.payment_proof.image&&(0,f.jsx)("img",{src:Pt.payment_proof.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(Pt.payment_proof.image,"_blank")})]}):(0,f.jsx)("div",{style:{fontSize:"13px",color:"#DC2626"},children:"No payment proof submitted by customer."})]})]})}),rt&&it&&(0,f.jsx)(l.A,{isOpen:rt,onClose:()=>{nt(!1),setTimeout(()=>{ot(null)},100)},total:Number(it.total_amount),subtotal:Number(it.subtotal||it.total_amount||0),tax:Number(it.tax||0),serviceCharge:Number(it.service_charge||0),discountAmount:Number(it.discount||0),couponDiscount:Number(it.coupon_discount||0),onConfirmPayment:async(e,t,r,n,i,o)=>{if(it){kt(!1);try{const t={payment_status:"completed",payment_method:e,card_type:"card"===e&&o||null};n&&n>0&&i&&i>0&&(t.points_used=n,t.point_discount=i,t.total_amount=Number(it.total_amount)-i);if(!(await fetch(`/api/orders/${it.id}`,j({method:"PATCH",body:JSON.stringify(t)}))).ok)throw new Error("Failed to confirm payment");"outstanding"===it.status?await fetch(`/api/orders/${it.id}`,j({method:"PATCH",body:JSON.stringify({status:"pending"})})):"served"===it.status&&await fetch(`/api/orders/${it.id}`,j({method:"PATCH",body:JSON.stringify({status:"completed"})})),nt(!1),ot(null),await gr(),Le&&(qe(!1),We(null))}catch(s){console.error("\u274c Payment error:",s)}}},paymentMethods:vt,customerId:it.customer_id||void 0,restaurantId:null!==o&&void 0!==o&&o.restaurantId?Number(o.restaurantId):void 0,membershipSettings:Ct}),dr&&(0,f.jsx)(c.A,{isOpen:sr,onClose:()=>{ar(!1),lr(null)},menuItem:{id:dr.id,name:dr.name,price:parseFloat(dr.price)||0,emoji:dr.emoji||"\ud83c\udf7d\ufe0f",image:dr.image,optionGroups:dr.optionGroups},onConfirm:(e,t,r)=>{Br(dr,e,r),ar(!1),lr(null),or("")}}),Ut&&(0,f.jsx)(m.aF,{isOpen:!0,onClose:()=>Vt(!1),title:"Select Target Order",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(K,{onClick:()=>Vt(!1),style:{background:"white",color:"#374151",border:"1px solid #E5E7EB"},children:"Cancel"}),(0,f.jsx)(K,{onClick:()=>Ht&&(async e=>{try{qt(!0),Vt(!1);const t=Mt,r=await fetch("/api/orders/merge",j({method:"POST",body:JSON.stringify({orderIds:t,targetOrderId:e})}));if(!r.ok){let e="Failed to merge orders";try{const t=await r.json();e=t.error||t.message||e}catch{403===r.status?e="Session expired. Please refresh the page and try again.":401===r.status&&(e="Authentication required. Please log in again.")}throw new Error(e)}const n=await r.json();mr(`Successfully merged ${t.length} orders into ${n.data.order_number}`,"success"),Rt(!1),Wt([]),Yt(null),gr()}catch(t){console.error("Merge error:",t),mr(t.message||"Failed to merge orders","error")}finally{qt(!1)}})(Ht),disabled:!Ht||Lt,style:{background:Ht?"#635BFF":"#E5E7EB",color:Ht?"white":"#9CA3AF",cursor:Ht?"pointer":"not-allowed"},children:Lt?"Merging...":"Merge Orders"})]}),children:(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{style:{marginBottom:"16px",color:"#6B7C93",fontSize:"14px"},children:"Select which order to merge INTO. The selected order's table/pager number will be kept."}),(0,f.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Te.filter(e=>Mt.includes(e.id)).sort((e,t)=>new Date(e.createdAt||e.order_date).getTime()-new Date(t.createdAt||t.order_date).getTime()).map(e=>{var t;return(0,f.jsxs)("div",{onClick:()=>Yt(e.id),style:{padding:"16px",border:"2px solid "+(Ht===e.id?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Ht===e.id?"#F0EEFF":"white",transition:"all 0.15s"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{style:{fontWeight:600,fontSize:"16px",color:"#0A2540"},children:e.order_number}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93",marginTop:"4px"},children:[e.table_number?`Table ${e.table_number}${e.guest_count?` (${e.guest_count}p)`:""}`:"",e.table_number&&e.pager_number?" / ":"",e.pager_number?`Pager ${e.pager_number}`:"",e.table_number||e.pager_number?"":"No Table/Pager"]}),e.customer_name&&"Guest"!==e.customer_name&&"Mobile Guest"!==e.customer_name&&(0,f.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"2px",fontWeight:500},children:e.customer_name})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:500,color:"#0A2540"},children:(0,u.vv)(e.total_amount,Be.currency)}),(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:[(null===(t=e.order_items)||void 0===t?void 0:t.length)||0," items"]})]})]}),Ht===e.id&&(0,f.jsx)("div",{style:{marginTop:"8px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:"Other orders will be merged into this order"})]},e.id)})})]})})]}),(()=>{const e=wr().length,t=Math.ceil(e/50);return t>1&&(0,f.jsxs)(ke,{children:[(0,f.jsxs)(Ce,{children:["Showing ",50*(ut-1)+1,"-",Math.min(50*ut,e)," of ",e," orders"]}),(0,f.jsxs)(Ae,{children:[(0,f.jsx)(Se,{onClick:()=>xt(1),disabled:1===ut,children:"First"}),(0,f.jsx)(Se,{onClick:()=>xt(e=>Math.max(1,e-1)),disabled:1===ut,children:"Previous"}),[...Array(Math.min(5,t))].map((e,r)=>{let n;return n=t<=5||ut<=3?r+1:ut>=t-2?t-4+r:ut-2+r,(0,f.jsx)(Se,{active:ut===n,onClick:()=>xt(n),children:n},n)}),(0,f.jsx)(Se,{onClick:()=>xt(e=>Math.min(t,e+1)),disabled:ut===t,children:"Next"}),(0,f.jsx)(Se,{onClick:()=>xt(t),disabled:ut===t,children:"Last"})]})]})})()]}),i.createPortal((0,f.jsxs)(he,{isVisible:cr.isVisible,type:cr.type,children:[(0,f.jsx)(ge,{children:cr.message}),(0,f.jsx)(ye,{onClick:()=>pr(e=>({...e,isVisible:!1})),children:"\xd7"})]}),document.body)]})}},7617:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),i=r(9610),o=r(4414);const s=n.Ay.div`
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
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,s=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,i.jsxs)(o,{children:[(0,i.jsx)(s,{children:t}),r&&(0,i.jsx)(a,{children:r})]})}}}]);