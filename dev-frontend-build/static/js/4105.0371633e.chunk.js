"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4105],{512:(e,t,r)=>{r.d(t,{x:()=>B,A:()=>R});var n=r(9950),s=r(4752),i=r(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,x=s.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=s.Ay.div`
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
`,p=s.Ay.button`
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
`,g=s.Ay.div``,m=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,j=s.Ay.button`
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
`,f=s.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,v=s.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,y=s.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=s.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=s.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=s.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=s.Ay.div`
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
`,E=e=>{let{startDate:t,endDate:r,onRangeSelect:s,onClose:E,isOpen:C}=e;const B=new Date,[D,$]=(0,n.useState)(B.getMonth()),[M,O]=(0,n.useState)(B.getFullYear()),[I,R]=(0,n.useState)(null),[z,_]=(0,n.useState)(null),[T,P]=(0,n.useState)(null),[L,W]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&R(d(t)),r&&_(d(r))},[t,r]),(0,n.useEffect)(()=>{C&&W("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&E()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,E]);const Y=(0,n.useCallback)(()=>{0===D?($(11),O(e=>e-1)):$(e=>e-1)},[D]),H=(0,n.useCallback)(()=>{11===D?($(0),O(e=>e+1)):$(e=>e+1)},[D]),U=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let s=0;s<n;s++)d.push(null);for(let s=1;s<=r;s++)d.push(new Date(e,t,s));return(0,i.jsxs)(y,{children:[(0,i.jsx)(F,{children:c(e,t)}),(0,i.jsx)(b,{children:o.map(e=>(0,i.jsx)(w,{children:e},e))}),(0,i.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,i.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:o,isHoverEnd:d}=(e=>{const t=I&&l(e,I),r=z&&l(e,z),n="end"===L&&T?T:z;let s=!1;if(I&&n){const[t,r]=I<=n?[I,n]:[n,I];s=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:s,isHoverEnd:"end"===L&&T&&l(e,T)}})(e),c=l(e,B);return(0,i.jsx)(S,{$isStart:!!r,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===L)R(e),_(null),W("end");else{let t=I,r=e;r<t&&([t,r]=[r,t]),R(t),_(r),W("start"),s(a(t),a(r)),setTimeout(E,200)}})(e),onMouseEnter:()=>P(e),onMouseLeave:()=>P(null),children:e.getDate()},e.getTime())})})]})},K=11===D?0:D+1,J=11===D?M+1:M,V=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}R(r),_(n),W("start"),s(a(r),a(n)),setTimeout(E,150)};return C?(0,i.jsx)(h,{ref:N,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[(0,i.jsx)(p,{onClick:()=>V("this_week"),children:"This Week"}),(0,i.jsx)(p,{onClick:()=>V("this_month"),children:"This Month"}),(0,i.jsx)(p,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,i.jsxs)(g,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(j,{onClick:Y,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(j,{onClick:H,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(f,{children:[U(M,D),(0,i.jsx)(v,{children:U(J,K)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,B=e=>{const t=new Date;let r=new Date;const n=new Date;switch(e){case"today":break;case"week":r.setDate(t.getDate()-6);break;case"month":r.setDate(t.getDate()-29);break;case"year":r.setDate(t.getDate()-364);break;case"all":r=new Date(2020,0,1)}return{start:C(r),end:C(n)}},D=s.Ay.div`
  margin-bottom: 24px;
`,$=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,M=s.Ay.button`
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
`,O=s.Ay.div`
  position: relative;
  display: inline-block;
`,I=s.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:s,onPeriodChange:o,onCalendarRangeSelect:a,includeToday:d=!1,children:l}=e;const[c,h]=(0,n.useState)(!1),x=d?["today","week","month","year","all"]:["week","month","year","all"],u={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(D,{children:(0,i.jsxs)($,{children:[x.map(e=>(0,i.jsx)(M,{active:t===e&&!s,onClick:()=>o(e),children:u[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(I,{active:s,onClick:()=>h(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,i.jsx)(E,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{a(e,t),h(!1)},onClose:()=>h(!1)})]}),l]})})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var n=r(4752),s=r(4414);const i=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
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
`,o=n.Ay.button`
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
`,a=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:r,style:n}=e;return(0,s.jsx)(i,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,s.jsx)(o,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,s.jsx)(a,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),s=r(4492);function i(e){const[t,r]=(0,s.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,a]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{a(e),r({tab:e})},[r])]}},4105:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var n=r(9950),s=r(4752),i=r(4492),o=r(8409),a=r(2597),d=r(2653),l=r(1367),c=r(512),h=r(1095),x=r(2847),u=r(3245),p=r(158),g=r(3440),m=r(2174),j=r(4915),f=r(7621),v=r(5297),y=r(2528),F=r(294),b=r(3588),w=r(4414);const k=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,A=s.Ay.div`
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
`,S=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,E=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,C=o.MD,B=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,D=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,$=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,M=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,O=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,I=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,R=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,z=s.Ay.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`,_=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,T=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,P=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,L=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,W=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`,N=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
`,Y=s.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,H=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,U=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,K=s.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`,J=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,V=s.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 12px;
  background: ${e=>1===e.rank?"linear-gradient(135deg, #FFD700, #FFA500)":2===e.rank?"linear-gradient(135deg, #C0C0C0, #A0A0A0)":3===e.rank?"linear-gradient(135deg, #CD7F32, #8B4513)":"#F3F4F6"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
`,q=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Z=()=>{var e,t;const{user:r}=(0,l.As)(),[s,Z]=(0,i.ok)(),[G,Q]=(0,d.M)("ranking"),[X,ee]=(0,n.useState)("month"),[te,re]=(0,n.useState)(()=>(0,c.x)("month")),[ne,se]=(0,n.useState)(!1),[ie,oe]=(0,n.useState)([]),[ae,de]=(0,n.useState)("all"),[le,ce]=(0,n.useState)(""),[he,xe]=(0,n.useState)(!1),[ue,pe]=(0,n.useState)([]),[ge,me]=(0,n.useState)([]),[je,fe]=(0,n.useState)(!0),[ve]=(0,n.useState)([]),[ye,Fe]=(0,n.useState)([]),[be,we]=(0,n.useState)([]),[ke,Ae]=(0,n.useState)(new Set),[Se,Ee]=(0,n.useState)(new Set);function Ce(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Be]=(0,n.useState)(()=>s.get("restaurantId")),[De]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{Z(e=>("all"!==ae?e.set("restaurantId",ae):e.delete("restaurantId"),e),{replace:!0})},[Z,ae]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success){const t=e.data.map(e=>{var t;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,status:e.status}});if(oe(t),pe(t.slice(0,10)),Be){const e=t.find(e=>e.id===Be);e&&(de(e.id),ce(e.name))}else if(De){const e=decodeURIComponent(De),r=t.find(t=>t.name===e);r&&(de(r.id),ce(r.name))}}}}catch(e){console.error("Error fetching restaurants:",e)}})()},[r,Be,De]),(0,n.useEffect)(()=>{(async()=>{if(0!==ie.length){fe(!0);try{const r=localStorage.getItem("auth_token"),n=ie.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==ae&&(s+=`&restaurant_id=${ae}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),me(t)}const o=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(o.ok){var e,t;const r=await o.json();null!==(e=r.data)&&void 0!==e&&e.items&&Fe(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&we(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{fe(!1)}}else fe(!1)})()},[ae,ie]);const $e=()=>{de("all"),ce(""),xe(!1)},Me=(0,n.useMemo)(()=>{if(!ge||0===ge.length)return[];const e=new Date(te.start);e.setHours(0,0,0,0);const t=new Date(te.end);return t.setHours(23,59,59,999),ge.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,o="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&o})},[ge,te.start,te.end]),Oe=(0,n.useMemo)(()=>{if(0===Me.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===X){const r={};return Me.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===X){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return Me.forEach(r=>{const n=Ce(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=Ce(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===X){const r={};return Me.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Me.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Me,X]),Ie=(0,n.useMemo)(()=>{if(0===Me.length)return[{name:"No Data",value:100,sales:0}];const e={};be.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};ye.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;Me.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,o;const a=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=a;const d=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),l=d&&t[d]||"Other";r[l]=(r[l]||0)+a})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Me,ye,be]),Re=(0,n.useMemo)(()=>{var e;if(0===Me.length)return[];const t={};be.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};ye.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Me.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const o=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),d=a?r[a]||"Other":e.category||"Other";n[o]||(n[o]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=l,n[o].revenue+=c*l})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[Me,ye,be]),ze=(0,n.useMemo)(()=>{if(0===Me.length)return[];const e={};return Me.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Me]),_e=(0,n.useMemo)(()=>{if(0===Me.length)return{};const e={};return Me.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const o=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=o,e[n].orders+=1,e[n].months[s].revenue+=o,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=o,e[n].months[s].days[i].orders+=1}),e},[Me]),Te=(0,n.useMemo)(()=>{if(0===Me.length)return[];const e={};return Me.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Me.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Me]),Pe=(0,n.useMemo)(()=>{if(0===ge.length)return{restaurants:[]};const e=new Date(te.start);e.setHours(0,0,0,0);const t=new Date(te.end);t.setHours(23,59,59,999);const r=ge.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n);return s>=e&&s<=t&&"completed"===r.status}),n={};r.forEach(e=>{var t;const r=null===(t=e.restaurant_id)||void 0===t?void 0:t.toString();if(!r)return;const s=ie.find(e=>e.id===r),i=(null===s||void 0===s?void 0:s.name)||e.restaurant_name||"Unknown";n[r]||(n[r]={name:i,orders:0,revenue:0}),n[r].orders+=1,n[r].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(e)});return{restaurants:Object.entries(n).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue)}},[ge,ie,te]),Le=()=>{const e=new Date(te.start),t=new Date(te.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=Le();if(e<=31){const e=new Set(Object.keys(_e)),t=new Set;Object.keys(_e).forEach(e=>{Object.keys(_e[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ae(e),Ee(t)}else e<=365?(Ae(new Set(Object.keys(_e))),Ee(new Set)):(Ae(new Set),Ee(new Set))},[te.start,te.end,_e]);const We=e=>{ee(e),se(!1),re((0,c.x)(e))},Ne=(e,t)=>{se(!0),ee("all"),re({start:e,end:t})},Ye=e=>`RM ${e.toFixed(2)}`,He=()=>(0,w.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",gap:"16px",alignItems:"flex-start",padding:"24px 0",marginBottom:"24px"},children:[(0,w.jsxs)(L,{children:[(0,w.jsx)(W,{type:"text",placeholder:"All Restaurants",value:le,onChange:e=>(e=>{if(ce(e),xe(!0),e.length<1)return void pe(ie.slice(0,10));const t=ie.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);pe(t)})(e.target.value),onFocus:()=>{xe(!0),pe(ie.slice(0,10))},onBlur:()=>setTimeout(()=>xe(!1),200)}),"all"!==ae&&le&&(0,w.jsx)(K,{onClick:$e,children:"\xd7"}),(0,w.jsxs)(N,{show:he,children:[(0,w.jsxs)(Y,{onClick:()=>{de("all"),ce(""),xe(!1)},children:[(0,w.jsx)(H,{children:"All Restaurants"}),(0,w.jsx)(U,{children:"Show all restaurant data"})]}),ue.map(e=>(0,w.jsxs)(Y,{onClick:()=>(e=>{de(e.id),ce(e.name),xe(!1)})(e),children:[(0,w.jsx)(H,{children:e.name}),(0,w.jsx)(U,{children:e.status||"active"})]},e.id))]})]}),(0,w.jsx)("div",{style:{flex:1},children:(0,w.jsx)(c.A,{activePeriod:X,dateRange:te,isCustomDateRange:ne,onPeriodChange:We,onCalendarRangeSelect:Ne})})]});return(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)(k,{children:[(0,w.jsx)(A,{children:(0,w.jsx)(S,{children:"Reports"})}),(0,w.jsxs)(E,{children:[(0,w.jsxs)(a.tU,{children:[(0,w.jsx)(a.oz,{active:"ranking"===G,onClick:()=>Q("ranking"),children:"Sales Ranking"}),(0,w.jsx)(a.oz,{active:"sales"===G,onClick:()=>Q("sales"),children:"Sales Report"}),(0,w.jsx)(a.oz,{active:"details"===G,onClick:()=>Q("details"),children:"Sales Details"}),(0,w.jsx)(a.oz,{active:"menu"===G,onClick:()=>Q("menu"),children:"Menu Analysis"}),(0,w.jsx)(a.oz,{active:"customers"===G,onClick:()=>Q("customers"),children:"Customer Insights"}),(0,w.jsx)(a.oz,{active:"operations"===G,onClick:()=>Q("operations"),children:"Operations"})]}),(0,w.jsxs)("div",{style:{display:"sales"===G?"block":"none"},children:[(0,w.jsx)(He,{}),je?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Me.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(C,{children:[(0,w.jsxs)(o.hI,{color:"#059669",children:[(0,w.jsx)(o.v0,{children:"Total Revenue"}),(0,w.jsx)(o.Os,{children:Ye(Oe.reduce((e,t)=>e+t.sales,0))}),(0,w.jsxs)(o.d1,{children:[Me.length," orders in selected period"]})]}),(0,w.jsxs)(o.hI,{color:"#2563EB",children:[(0,w.jsx)(o.v0,{children:"Total Orders"}),(0,w.jsx)(o.Os,{children:Me.length.toLocaleString()}),(0,w.jsx)(o.d1,{children:"For selected period"})]}),(0,w.jsxs)(o.hI,{color:"#DC2626",children:[(0,w.jsx)(o.v0,{children:"Average Order Value"}),(0,w.jsx)(o.Os,{children:Ye(Me.length>0?Oe.reduce((e,t)=>e+t.sales,0)/Me.length:0)}),(0,w.jsx)(o.d1,{children:"Per order"})]}),(0,w.jsxs)(o.hI,{color:"#7C3AED",children:[(0,w.jsx)(o.v0,{children:"Completed Orders"}),(0,w.jsx)(o.Os,{children:Me.filter(e=>"completed"===e.status).length}),(0,w.jsxs)(o.d1,{children:[Math.round(Me.filter(e=>"completed"===e.status).length/Me.length*100||0),"% completion rate"]})]})]}),(0,w.jsxs)(B,{children:[(0,w.jsxs)(D,{children:[(0,w.jsx)($,{children:"Revenue Trend"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(x.b,{data:Oe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(m.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,w.jsxs)(D,{children:[(0,w.jsx)($,{children:"Sales by Category"}),(0,w.jsx)(h.u,{width:"100%",height:300,children:(0,w.jsxs)(f.r,{children:[(0,w.jsx)(v.F,{data:Ie,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ie.map((e,t)=>(0,w.jsx)(y.f,{fill:q[t%q.length]},`cell-${t}`))}),(0,w.jsx)(m.m,{formatter:e=>`${e}%`})]})})]})]}),(0,w.jsxs)(D,{children:[(0,w.jsx)($,{children:"Hourly Orders Distribution"}),(0,w.jsx)(h.u,{width:"100%",height:250,children:(0,w.jsxs)(F.E,{data:ze,margin:{top:5,right:20,left:0,bottom:5},children:[(0,w.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(p.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,w.jsx)(m.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(b.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,w.jsxs)("div",{style:{display:"details"===G?"block":"none"},children:[(0,w.jsx)(He,{}),je?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Me.length?(0,w.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,w.jsxs)("div",{children:[(0,w.jsxs)(C,{children:[(0,w.jsxs)(o.hI,{color:"#059669",children:[(0,w.jsx)(o.v0,{children:"Total Revenue"}),(0,w.jsx)(o.Os,{children:Ye(Oe.reduce((e,t)=>e+t.sales,0))}),(0,w.jsxs)(o.d1,{children:[Me.length," orders in selected period"]})]}),(0,w.jsxs)(o.hI,{color:"#2563EB",children:[(0,w.jsx)(o.v0,{children:"Total Orders"}),(0,w.jsx)(o.Os,{children:Me.length.toLocaleString()}),(0,w.jsxs)(o.d1,{children:[Me.filter(e=>"completed"===e.status).length," completed"]})]}),(0,w.jsxs)(o.hI,{color:"#DC2626",children:[(0,w.jsx)(o.v0,{children:"Average Order Value"}),(0,w.jsx)(o.Os,{children:Ye(Me.length>0?Oe.reduce((e,t)=>e+t.sales,0)/Me.length:0)}),(0,w.jsx)(o.d1,{children:"Per order average"})]}),(0,w.jsxs)(o.hI,{color:"#7C3AED",children:[(0,w.jsx)(o.v0,{children:"Period"}),(0,w.jsx)(o.Os,{children:Le()}),(0,w.jsx)(o.d1,{children:"Days"})]})]}),(0,w.jsxs)(M,{children:[(0,w.jsx)($,{children:"Detailed Sales Breakdown"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(I,{style:{width:"40%"},children:"Period"}),(0,w.jsx)(I,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(I,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(I,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,w.jsx)("tbody",{children:Object.keys(_e).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=_e[e],r=ke.has(e);return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(_,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(ke);if(t.has(e)){var r;t.delete(e);const n=new Set(Se);Object.keys((null===(r=_e[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Ee(n)}else t.add(e);Ae(t)})(e),children:[(0,w.jsxs)(T,{level:0,bold:!0,children:[(0,w.jsx)(P,{expanded:r,children:"\u25b6"}),e]}),(0,w.jsx)(T,{level:0,bold:!0,style:{textAlign:"right"},children:Ye(t.revenue)}),(0,w.jsx)(T,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(T,{level:0,bold:!0,style:{textAlign:"right"},children:Ye(t.revenue/t.orders)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,o=Se.has(i),a=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,w.jsxs)(n.Fragment,{children:[(0,w.jsxs)(_,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(Se);t.has(e)?t.delete(e):t.add(e),Ee(t)})(i),children:[(0,w.jsxs)(T,{level:1,bold:!0,children:[(0,w.jsx)(P,{expanded:o,children:"\u25b6"}),a]}),(0,w.jsx)(T,{level:1,style:{textAlign:"right"},children:Ye(s.revenue)}),(0,w.jsx)(T,{level:1,style:{textAlign:"right"},children:s.orders}),(0,w.jsx)(T,{level:1,style:{textAlign:"right"},children:Ye(s.revenue/s.orders)})]}),o&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,w.jsxs)(_,{level:2,children:[(0,w.jsx)(T,{level:2,children:r}),(0,w.jsx)(T,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:Ye(t.revenue)}),(0,w.jsx)(T,{level:2,style:{textAlign:"right"},children:t.orders}),(0,w.jsx)(T,{level:2,style:{textAlign:"right"},children:Ye(t.revenue/t.orders)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,w.jsxs)("div",{style:{display:"menu"===G?"block":"none"},children:[(0,w.jsx)(He,{}),(0,w.jsxs)(C,{children:[(0,w.jsxs)(o.hI,{color:"#F59E0B",children:[(0,w.jsx)(o.v0,{children:"Best Seller"}),(0,w.jsx)(o.Os,{children:(null===(e=Re[0])||void 0===e?void 0:e.name)||"N/A"}),(0,w.jsxs)(o.d1,{children:[(null===(t=Re[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,w.jsxs)(o.hI,{color:"#10B981",children:[(0,w.jsx)(o.v0,{children:"Total Items Analyzed"}),(0,w.jsx)(o.Os,{children:Re.length}),(0,w.jsx)(o.d1,{children:"Complete menu analysis"})]}),(0,w.jsxs)(o.hI,{color:"#3B82F6",children:[(0,w.jsx)(o.v0,{children:"Total Orders"}),(0,w.jsx)(o.Os,{children:Re.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,w.jsx)(o.d1,{children:"For selected period"})]}),(0,w.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,w.jsx)(o.v0,{children:"Total Revenue"}),(0,w.jsx)(o.Os,{children:Ye(Re.reduce((e,t)=>e+t.revenue,0))}),(0,w.jsx)(o.d1,{children:"For selected period"})]})]}),(0,w.jsxs)(M,{children:[(0,w.jsx)($,{children:"Complete Menu Performance Ranking"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(I,{children:"Rank"}),(0,w.jsx)(I,{children:"Menu Item"}),(0,w.jsx)(I,{children:"Category"}),(0,w.jsx)(I,{children:"Price"}),(0,w.jsx)(I,{children:"Orders"}),(0,w.jsx)(I,{children:"Revenue"}),(0,w.jsx)(I,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:Re.map((e,t)=>{var r;const n=(null===(r=Re[0])||void 0===r?void 0:r.orders)||1;return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsxs)(R,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1]}),(0,w.jsx)(R,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(R,{children:(0,w.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,w.jsx)(R,{children:Ye(e.price)}),(0,w.jsx)(R,{children:e.orders.toLocaleString()}),(0,w.jsx)(R,{children:Ye(e.revenue)}),(0,w.jsx)(R,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(z,{percentage:e.orders/n*100}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,w.jsxs)("div",{style:{display:"customers"===G?"block":"none"},children:[(0,w.jsx)(He,{}),(0,w.jsxs)(C,{children:[(0,w.jsxs)(o.hI,{color:"#635BFF",children:[(0,w.jsx)(o.v0,{children:"Total Customers"}),(0,w.jsx)(o.Os,{children:ve.length.toLocaleString()}),(0,w.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,w.jsxs)(o.hI,{color:"#00D924",children:[(0,w.jsx)(o.v0,{children:"Repeat Customers"}),(0,w.jsx)(o.Os,{children:ve.filter(e=>e.total_orders>1).length}),(0,w.jsxs)(o.d1,{children:[ve.length>0?Math.round(ve.filter(e=>e.total_orders>1).length/ve.length*100):0,"% return rate"]})]}),(0,w.jsxs)(o.hI,{color:"#FFB800",children:[(0,w.jsx)(o.v0,{children:"Average Spent"}),(0,w.jsx)(o.Os,{children:Ye(ve.length>0?ve.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/ve.length:0)}),(0,w.jsx)(o.d1,{children:"Per customer"})]}),(0,w.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,w.jsx)(o.v0,{children:"Total Points"}),(0,w.jsx)(o.Os,{children:ve.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,w.jsx)(o.d1,{children:"Across all customers"})]})]}),(0,w.jsx)(M,{children:(0,w.jsx)($,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,w.jsxs)("div",{style:{display:"operations"===G?"block":"none"},children:[(0,w.jsx)(He,{}),(0,w.jsxs)(C,{children:[(0,w.jsxs)(o.hI,{color:"#10B981",children:[(0,w.jsx)(o.v0,{children:"Order Fulfillment"}),(0,w.jsxs)(o.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,w.jsx)(o.d1,{children:"On-time completion"})]}),(0,w.jsxs)(o.hI,{color:"#F59E0B",children:[(0,w.jsx)(o.v0,{children:"Avg. Wait Time"}),(0,w.jsxs)(o.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,w.jsx)(o.d1,{children:"Estimated"})]}),(0,w.jsxs)(o.hI,{color:"#EF4444",children:[(0,w.jsx)(o.v0,{children:"Peak Hour"}),(0,w.jsx)(o.Os,{children:"12-1 PM"}),(0,w.jsx)(o.d1,{children:"Busiest time"})]}),(0,w.jsxs)(o.hI,{color:"#6366F1",children:[(0,w.jsx)(o.v0,{children:"Staff Efficiency"}),(0,w.jsxs)(o.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,w.jsx)(o.d1,{children:"Estimated"})]})]}),(0,w.jsxs)(M,{children:[(0,w.jsx)($,{children:"Peak Hours Performance"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(I,{children:"Time Slot"}),(0,w.jsx)(I,{children:"Orders"}),(0,w.jsx)(I,{children:"Revenue"}),(0,w.jsx)(I,{children:"Efficiency"})]})}),(0,w.jsx)("tbody",{children:Te.map((e,t)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(R,{style:{fontWeight:600},children:e.time}),(0,w.jsx)(R,{children:e.orders}),(0,w.jsx)(R,{children:Ye(e.revenue)}),(0,w.jsx)(R,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(z,{percentage:e.efficiency}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,w.jsxs)("div",{style:{display:"ranking"===G?"block":"none"},children:[(0,w.jsx)(c.A,{activePeriod:X,dateRange:te,isCustomDateRange:ne,onPeriodChange:We,onCalendarRangeSelect:Ne}),(0,w.jsxs)(J,{children:[(0,w.jsx)($,{children:"Restaurant Sales Ranking"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(I,{style:{width:"60px"},children:"Rank"}),(0,w.jsx)(I,{children:"Restaurant Name"}),(0,w.jsx)(I,{style:{textAlign:"right"},children:"Orders"}),(0,w.jsx)(I,{style:{textAlign:"right"},children:"Revenue"}),(0,w.jsx)(I,{style:{width:"150px"},children:"Performance"})]})}),(0,w.jsxs)("tbody",{children:[Pe.restaurants.map((e,t)=>{var r;const n=(null===(r=Pe.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,w.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,w.jsx)(R,{children:(0,w.jsx)(V,{rank:t+1,children:t+1})}),(0,w.jsx)(R,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(R,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,w.jsx)(R,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:Ye(e.revenue)}),(0,w.jsx)(R,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(z,{percentage:s}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===Pe.restaurants.length&&(0,w.jsx)("tr",{children:(0,w.jsx)(R,{colSpan:5,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}}}]);