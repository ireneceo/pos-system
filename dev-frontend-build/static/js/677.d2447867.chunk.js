"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>_});var n=t(9950),a=t(4752),s=t(5030),d=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},c=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),h=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,p=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,g=a.Ay.div`
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
`,u=a.Ay.button`
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
`,b=a.Ay.div``,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,j=a.Ay.button`
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
`,v=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,y=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,S=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,R=a.Ay.div`
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
`,C=e=>{let{startDate:r,endDate:t,onRangeSelect:a,onClose:C,isOpen:P}=e;const{t:E}=(0,s.Bd)("common"),B=new Date,[D,$]=(0,n.useState)(B.getMonth()),[M,I]=(0,n.useState)(B.getFullYear()),[_,O]=(0,n.useState)(null),[z,T]=(0,n.useState)(null),[L,W]=(0,n.useState)(null),[Y,N]=(0,n.useState)("start"),H=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&O(l(r)),t&&T(l(t))},[r,t]),(0,n.useEffect)(()=>{P&&N("start")},[P]),(0,n.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&C()};return P&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[P,C]);const U=(0,n.useCallback)(()=>{0===D?($(11),I(e=>e-1)):$(e=>e-1)},[D]),K=(0,n.useCallback)(()=>{11===D?($(0),I(e=>e+1)):$(e=>e+1)},[D]),J=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),s=[];for(let a=0;a<n;a++)s.push(null);for(let a=1;a<=t;a++)s.push(new Date(e,r,a));return(0,d.jsxs)(y,{children:[(0,d.jsx)(F,{children:h(e,r)}),(0,d.jsx)(w,{children:o.map(e=>(0,d.jsx)(k,{children:e},e))}),(0,d.jsx)(S,{children:s.map((e,r)=>{if(!e)return(0,d.jsx)(A,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:s,isHoverEnd:o}=(e=>{const r=_&&c(e,_),t=z&&c(e,z),n="end"===Y&&L?L:z;let a=!1;if(_&&n){const[r,t]=_<=n?[_,n]:[n,_];a=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:a,isHoverEnd:"end"===Y&&L&&c(e,L)}})(e),l=c(e,B);return(0,d.jsx)(R,{$isStart:!!t,$isEnd:!!n,$isInRange:s,$isHoverEnd:!!o,$isToday:l,onClick:()=>(e=>{if("start"===Y)O(e),T(null),N("end");else{let r=_,t=e;t<r&&([r,t]=[t,r]),O(r),T(t),N("start"),a(i(r),i(t)),setTimeout(C,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},V=11===D?0:D+1,q=11===D?M+1:M,G=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}O(t),T(n),N("start"),a(i(t),i(n)),setTimeout(C,150)};return P?(0,d.jsx)(x,{ref:H,children:(0,d.jsxs)(p,{children:[(0,d.jsxs)(g,{children:[(0,d.jsx)(u,{onClick:()=>G("this_week"),children:"This Week"}),(0,d.jsx)(u,{onClick:()=>G("this_month"),children:"This Month"}),(0,d.jsx)(u,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(j,{onClick:U,"aria-label":"Previous month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,d.jsx)(j,{onClick:K,"aria-label":"Next month",children:(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,d.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,d.jsxs)(v,{children:[J(M,D),(0,d.jsx)(f,{children:J(q,V)})]})]})]})}):null},P=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,a]=r.split("-").map(Number);return new Date(t,n-1,a)}catch{return new Date}})(r);let n=new Date(t);const a=new Date(t);switch(e){case"today":break;case"yesterday":n.setDate(t.getDate()-1),a.setDate(t.getDate()-1);break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:P(n),end:P(a)}},B=a.Ay.div`
  margin-bottom: 24px;
`,D=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,$=a.Ay.button`
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
`,M=a.Ay.div`
  position: relative;
  display: inline-block;
`,I=a.Ay.button`
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
`,_=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:i,includeToday:l=!1,children:c}=e;const{t:h}=(0,s.Bd)("common"),[x,p]=(0,n.useState)(!1),g=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],u={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,d.jsx)(B,{children:(0,d.jsxs)(D,{children:[g.map(e=>(0,d.jsx)($,{active:r===e&&!a,onClick:()=>o(e),children:u[e]},e)),(0,d.jsxs)(M,{children:[(0,d.jsxs)(I,{active:a,onClick:()=>p(!x),children:[(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,d.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,d.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,d.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,d.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,d.jsx)(C,{isOpen:x,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{i(e,r),p(!1)},onClose:()=>p(!1)})]}),c]})})}},677:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var n=t(9950),a=t(4752),s=t(4492),d=t(8409),o=t(2597),i=t(2653),l=t(1367),c=t(6038),h=t(4021),x=t(512),p=t(1095),g=t(2847),u=t(3245),b=t(158),m=t(3440),j=t(2174),v=t(4915),f=t(7621),y=t(5297),F=t(2528),w=t(294),k=t(3588),S=t(4414);const A=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,R=a.Ay.div`
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
`,C=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,P=a.Ay.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
  }
`,E=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,B=d.MD,D=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,$=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,M=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,I=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,O=a.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,z=a.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,T=a.Ay.div`
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
`,L=a.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,W=a.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,Y=a.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,N=a.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,H=a.Ay.input`
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
`,U=a.Ay.div`
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
`,K=a.Ay.div`
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
`,J=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,V=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,q=a.Ay.button`
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
`,G=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Z=a.Ay.span`
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
`,Q=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],X=()=>{var e,r;const{t:t}=useTranslation("brand"),{user:a}=(0,l.As)(),[X,ee]=(0,s.ok)(),{defaultCurrency:re}=(0,h.i1)(),[te,ne]=(0,n.useState)("RM");(0,n.useEffect)(()=>{re&&ne(re)},[re]);const[ae,se]=(0,i.M)("ranking"),[de,oe]=(0,n.useState)("month"),[ie,le]=(0,n.useState)(()=>(0,x.x)("month")),[ce,he]=(0,n.useState)(!1),[xe,pe]=(0,n.useState)([]),[ge,ue]=(0,n.useState)([]),[be,me]=(0,n.useState)("all"),[je,ve]=(0,n.useState)("all"),[fe,ye]=(0,n.useState)(""),[Fe,we]=(0,n.useState)(""),[ke,Se]=(0,n.useState)(!1),[Ae,Re]=(0,n.useState)(!1),[Ce,Pe]=(0,n.useState)([]),[Ee,Be]=(0,n.useState)([]),[De,$e]=(0,n.useState)([]),[Me,Ie]=(0,n.useState)(!0),[_e]=(0,n.useState)([]),[Oe,ze]=(0,n.useState)([]),[Te,Le]=(0,n.useState)([]),[We,Ye]=(0,n.useState)(new Set),[Ne,He]=(0,n.useState)(new Set);function Ue(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ke]=(0,n.useState)(()=>X.get("restaurantId")),[Je]=(0,n.useState)(()=>X.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:ae};"all"!==je&&(e.restaurantId=je),ee(e,{replace:!0})},[je,ee,ae]),(0,n.useEffect)(()=>{a&&(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();pe(e),Pe(e.slice(0,10))}let t="/api/restaurants";null===a||void 0===a||!a.id||"Brand General"!==a.role&&"Brand Manager"!==a.role||(t=`/api/restaurants/manager/${a.id}`);const n=await fetch(t,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json(),r=(e.data||e||[]).map(e=>{var r,t;return{id:null===(r=e.id)||void 0===r?void 0:r.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(t=e.brand)||void 0===t?void 0:t.name)}});if(ue(r),Be(r.slice(0,10)),Ke){const e=r.find(e=>e.id===Ke);e&&(ve(e.id),we(e.name))}else if(Je){const e=decodeURIComponent(Je),t=r.find(r=>r.name===e);t&&(ve(t.id),we(t.name))}}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[a,Ke,Je]),(0,n.useEffect)(()=>{(async()=>{if(0!==ge.length){Ie(!0);try{const t=localStorage.getItem("auth_token"),n=ge.map(e=>e.id);let a="/api/orders?limit=5000";"all"!==je&&(a+=`&restaurant_id=${je}`);const s=await fetch(a,{headers:{Authorization:`Bearer ${t}`}});if(s.ok){const e=await s.json();let r=e.data||e||[];if(r=r.filter(e=>{var r;return n.includes(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())}),"all"!==be){const e=ge.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===be}).map(e=>e.id);r=r.filter(r=>{var t;return e.includes(null===(t=r.restaurant_id)||void 0===t?void 0:t.toString())})}$e(r)}const d=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${t}`}});if(d.ok){var e,r;const t=await d.json();null!==(e=t.data)&&void 0!==e&&e.items&&ze(t.data.items),null!==(r=t.data)&&void 0!==r&&r.categories&&Le(t.data.categories)}}catch(t){console.error("Error fetching data:",t)}finally{Ie(!1)}}else Ie(!1)})()},[be,je,ge]);const Ve=()=>{me("all"),ye(""),Se(!1)},qe=()=>{ve("all"),we(""),Re(!1)},Ge=(0,n.useMemo)(()=>{if(!De||0===De.length)return[];const e=new Date(ie.start);e.setHours(0,0,0,0);const r=new Date(ie.end);return r.setHours(23,59,59,999),De.filter(t=>{const n=t.order_date||t.createdAt;if(!n)return!1;const a=new Date(n),s=a>=e&&a<=r,d="completed"===t.payment_status||"completed"===t.status||"pending"===t.status||"preparing"===t.status||"ready"===t.status;return s&&d})},[De,ie.start,ie.end]),Ze=(0,n.useMemo)(()=>{if(0===Ge.length)return[];const e=e=>new Date(e.order_date||e.createdAt),r=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===de){const t={};return Ge.forEach(n=>{const a=e(n).getHours(),s=12===a?"12PM":a>12?a-12+"PM":`${a}AM`;t[s]=(t[s]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}})}if("week"===de){const t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,a=[];for(let e=6;e>=0;e--){const r=new Date(n);r.setDate(r.getDate()-e),a.push(r)}const s={};return Ge.forEach(t=>{const n=Ue(e(t));s[n]=(s[n]||0)+r(t)}),a.map(e=>{const r=Ue(e);return{date:t[e.getDay()],sales:Math.round(s[r]||0)}})}if("month"===de){const t={};return Ge.forEach(n=>{const a=e(n).getDate().toString();t[a]=(t[a]||0)+r(n)}),Object.entries(t).map(e=>{let[r,t]=e;return{date:r,sales:Math.round(t)}}).sort((e,r)=>parseInt(e.date)-parseInt(r.date))}{const t=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Ge.forEach(a=>{const s=t[e(a).getMonth()];n[s]=(n[s]||0)+r(a)}),t.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Ge,de]),Qe=(0,n.useMemo)(()=>{if(0===Ge.length)return[{name:"No Data",value:100,sales:0}];const e={};Te.forEach(r=>{r.id&&r.name&&(e[r.id.toString()]=r.name)});const r={};Oe.forEach(t=>{if(t.id){const n=t.categoryId?e[t.categoryId.toString()]||t.categoryId:"Other";r[t.id.toString()]=n}});const t={};let n=0;Ge.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var a,s,d;const o=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=o;const i=(null===(a=e.menuItem)||void 0===a||null===(s=a.id)||void 0===s?void 0:s.toString())||(null===(d=e.product_id)||void 0===d?void 0:d.toString()),l=i&&r[i]||"Other";t[l]=(t[l]||0)+o})});const a=Object.entries(t).map(e=>{let[r,t]=e;return{name:r,value:n>0?Math.round(t/n*100):0,sales:Math.round(t)}}).sort((e,r)=>r.sales-e.sales);return a.length>0?a:[{name:"No Data",value:100,sales:0}]},[Ge,Oe,Te]),Xe=(0,n.useMemo)(()=>{var e;if(0===Ge.length)return[];const r={};Te.forEach(e=>{e.id&&e.name&&(r[e.id.toString()]=e.name)});const t={};Oe.forEach(e=>{if(e.id){const n=e.categoryId?r[e.categoryId.toString()]||e.categoryId:"Other";t[e.id.toString()]=n}});const n={};Ge.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var r,a,s;const d=e.menu_name||e.name||"Unknown",o=(null===(r=e.menuItem)||void 0===r||null===(a=r.id)||void 0===a?void 0:a.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),i=o?t[o]||"Other":e.category||"Other";n[d]||(n[d]={category:i,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[d].orders+=l,n[d].revenue+=c*l})});const a=Object.entries(n).map(e=>{let[r,t]=e;return{name:r,category:t.category,price:t.price,orders:t.orders,revenue:Math.round(t.revenue),performance:0}}).sort((e,r)=>r.orders-e.orders),s=(null===(e=a[0])||void 0===e?void 0:e.orders)||1;return a.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),a},[Ge,Oe,Te]),er=(0,n.useMemo)(()=>{if(0===Ge.length)return[];const e={};return Ge.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=0===t?"12AM":12===t?"12PM":t>12?t-12+"PM":`${t}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[r,t]=e;return{hour:r,orders:t}}).sort((e,r)=>{const t=e=>{const r=parseInt(e),t=e.includes("PM");return t&&12!==r?r+12:12!==r||t?r:0};return t(e.hour)-t(r.hour)})},[Ge]),rr=(0,n.useMemo)(()=>{if(0===Ge.length)return{};const e={};return Ge.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r),n=t.getFullYear().toString(),a=`${n}-${(t.getMonth()+1).toString().padStart(2,"0")}`,s=t.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[a]||(e[n].months[a]={month:a,revenue:0,orders:0,days:{}}),e[n].months[a].days[s]||(e[n].months[a].days[s]={day:s,revenue:0,orders:0});const d=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);e[n].revenue+=d,e[n].orders+=1,e[n].months[a].revenue+=d,e[n].months[a].orders+=1,e[n].months[a].days[s].revenue+=d,e[n].months[a].days[s].orders+=1}),e},[Ge]),tr=(0,n.useMemo)(()=>{if(0===Ge.length)return[];const e={};return Ge.forEach(r=>{const t=(e=>new Date(e.order_date||e.createdAt))(r).getHours(),n=`${t.toString().padStart(2,"0")}:00-${(t+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r)}),Object.entries(e).map(e=>{let[r,t]=e;return{time:r,orders:t.orders,revenue:Math.round(t.revenue),efficiency:Math.min(100,Math.round(t.orders/(Ge.length/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[Ge]),nr=(0,n.useMemo)(()=>{if(0===De.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=new Date(ie.start);r.setHours(0,0,0,0);const t=new Date(ie.end);t.setHours(23,59,59,999);const n=De.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const a=new Date(n);return a>=r&&a<=t&&"completed"===e.status}),a={};n.forEach(r=>{var t,n;const s=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString();if(!s)return;const d=ge.find(e=>e.id===s),o=(null===d||void 0===d?void 0:d.name)||r.restaurant_name||"Unknown",i=(null===d||void 0===d?void 0:d.brand_name)||(null===(n=xe.find(e=>e.id===(null===d||void 0===d?void 0:d.brand_id)))||void 0===n?void 0:n.name)||"Independent";a[s]||(a[s]={name:o,brandName:i,orders:0,revenue:0}),a[s].orders+=1,a[s].revenue+=e(r)});const s=Object.entries(a).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).sort((e,r)=>r.revenue-e.revenue),d={},o=new Set(ge.map(e=>{var r;return null===(r=e.brand_id)||void 0===r?void 0:r.toString()}).filter(Boolean));xe.forEach(e=>{o.has(e.id.toString())&&(d[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),ge.some(e=>!e.brand_id)&&(d.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),ge.forEach(e=>{var r;const t=(null===(r=e.brand_id)||void 0===r?void 0:r.toString())||"independent";d[t]&&(d[t].restaurantCount+=1)}),n.forEach(r=>{var t,n;const a=null===(t=r.restaurant_id)||void 0===t?void 0:t.toString(),s=ge.find(e=>e.id===a),o=(null===s||void 0===s||null===(n=s.brand_id)||void 0===n?void 0:n.toString())||"independent";d[o]&&(d[o].orders+=1,d[o].revenue+=e(r))});return{brands:Object.entries(d).map(e=>{let[r,t]=e;return{id:r,...t,revenue:Math.round(t.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,r)=>r.revenue-e.revenue),restaurants:s}},[De,ge,xe,ie]),ar=()=>{const e=new Date(ie.start),r=new Date(ie.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=ar();if(e<=31){const e=new Set(Object.keys(rr)),r=new Set;Object.keys(rr).forEach(e=>{Object.keys(rr[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Ye(e),He(r)}else e<=365?(Ye(new Set(Object.keys(rr))),He(new Set)):(Ye(new Set),He(new Set))},[ie.start,ie.end,rr]);const sr=e=>{oe(e),he(!1),le((0,x.x)(e))},dr=(e,r)=>{he(!0),oe("all"),le({start:e,end:r})},or=()=>(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(P,{children:[(0,S.jsxs)(N,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Brands",value:fe,onChange:e=>(e=>{if(ye(e),Se(!0),e.length<1)return void Pe(xe.slice(0,10));const r=xe.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)||r.code.toLowerCase().includes(t)}).slice(0,10);Pe(r)})(e.target.value),onFocus:()=>{Se(!0),0===fe.length&&Pe(xe.slice(0,10))},onBlur:()=>setTimeout(()=>Se(!1),200)}),"all"!==be&&fe&&(0,S.jsx)(q,{onClick:Ve,children:"\xd7"}),(0,S.jsxs)(U,{show:ke,children:[(0,S.jsxs)(K,{onClick:()=>{me("all"),ye(""),Se(!1)},children:[(0,S.jsx)(J,{children:t("brand:brandReportsPage.allBrands")}),(0,S.jsx)(V,{children:t("brand:brandReportsPage.showAllBrandData")})]}),Ce.map(e=>(0,S.jsxs)(K,{onClick:()=>(e=>{me(e.id.toString()),ye(e.name),Se(!1),ve("all"),we("")})(e),children:[(0,S.jsx)(J,{children:e.name}),(0,S.jsxs)(V,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,S.jsxs)(N,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Restaurants",value:Fe,onChange:e=>(e=>{we(e),Re(!0);let r=ge;if("all"!==be&&(r=ge.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===be})),e.length<1)return void Be(r.slice(0,10));const t=r.filter(r=>{const t=e.toLowerCase();return r.name.toLowerCase().includes(t)}).slice(0,10);Be(t)})(e.target.value),onFocus:()=>{Re(!0);let e=ge;"all"!==be&&(e=ge.filter(e=>{var r;return(null===(r=e.brand_id)||void 0===r?void 0:r.toString())===be})),Be(e.slice(0,10))},onBlur:()=>setTimeout(()=>Re(!1),200)}),"all"!==je&&Fe&&(0,S.jsx)(q,{onClick:qe,children:"\xd7"}),(0,S.jsxs)(U,{show:Ae,children:[(0,S.jsxs)(K,{onClick:()=>{ve("all"),we(""),Re(!1)},children:[(0,S.jsx)(J,{children:t("brand:brandReportsPage.allRestaurants")}),(0,S.jsx)(V,{children:t("brand:brandReportsPage.showAllRestaurantData")})]}),Ee.map(e=>(0,S.jsxs)(K,{onClick:()=>(e=>{ve(e.id),we(e.name),Re(!1)})(e),children:[(0,S.jsx)(J,{children:e.name}),(0,S.jsx)(V,{children:e.brand_name||"Independent"})]},e.id))]})]})]}),(0,S.jsx)(x.A,{activePeriod:de,dateRange:ie,isCustomDateRange:ce,onPeriodChange:sr,onCalendarRangeSelect:dr})]});return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(A,{children:[(0,S.jsx)(R,{children:(0,S.jsx)(C,{children:t("brand:brandReportsPage.brandReports")})}),(0,S.jsxs)(E,{children:[(0,S.jsxs)(o.tU,{children:[(0,S.jsx)(o.oz,{active:"ranking"===ae,onClick:()=>se("ranking"),children:t("brand:brandReportsPage.salesRanking")}),(0,S.jsx)(o.oz,{active:"sales"===ae,onClick:()=>se("sales"),children:t("brand:brandReportsPage.salesReport")}),(0,S.jsx)(o.oz,{active:"details"===ae,onClick:()=>se("details"),children:t("brand:brandReportsPage.salesDetails")}),(0,S.jsx)(o.oz,{active:"menu"===ae,onClick:()=>se("menu"),children:t("brand:brandReportsPage.menuAnalysis")}),(0,S.jsx)(o.oz,{active:"customers"===ae,onClick:()=>se("customers"),children:t("brand:brandReportsPage.customerInsights")}),(0,S.jsx)(o.oz,{active:"operations"===ae,onClick:()=>se("operations"),children:t("brand:brandReportsPage.operations")})]}),(0,S.jsxs)("div",{style:{display:"sales"===ae?"block":"none"},children:[(0,S.jsx)(or,{}),Me?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:t("brand:brandReportsPage.loading")}):0===Ge.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:t("brand:brandReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(B,{children:[(0,S.jsxs)(d.hI,{color:"#059669",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Ze.reduce((e,r)=>e+r.sales,0),te)}),(0,S.jsxs)(d.d1,{children:[Ge.length," orders in selected period"]})]}),(0,S.jsxs)(d.hI,{color:"#2563EB",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Ge.length.toLocaleString()}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(d.hI,{color:"#DC2626",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.averageOrderValue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Ge.length>0?Ze.reduce((e,r)=>e+r.sales,0)/Ge.length:0,te)}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.perOrder")})]}),(0,S.jsxs)(d.hI,{color:"#7C3AED",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.completedOrders")}),(0,S.jsx)(d.Os,{children:Ge.filter(e=>"completed"===e.status).length}),(0,S.jsxs)(d.d1,{children:[Math.round(Ge.filter(e=>"completed"===e.status).length/Ge.length*100||0),"% completion rate"]})]})]}),(0,S.jsxs)(D,{children:[(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.revenueTrend")}),(0,S.jsx)(p.u,{width:"100%",height:300,children:(0,S.jsxs)(g.b,{data:Ze,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(b.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.salesByCategory")}),(0,S.jsx)(p.u,{width:"100%",height:300,children:(0,S.jsxs)(f.r,{children:[(0,S.jsx)(y.F,{data:Qe,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Qe.map((e,r)=>(0,S.jsx)(F.f,{fill:Q[r%Q.length]},`cell-${r}`))}),(0,S.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,S.jsxs)($,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.hourlyOrdersDistribution")}),(0,S.jsx)(p.u,{width:"100%",height:250,children:(0,S.jsxs)(w.E,{data:er,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(b.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(k.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,S.jsxs)("div",{style:{display:"details"===ae?"block":"none"},children:[(0,S.jsx)(or,{}),Me?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:t("brand:brandReportsPage.loading")}):0===Ge.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:t("brand:brandReportsPage.noOrderDataAvailableForTheSelectedPeriod")}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(B,{children:[(0,S.jsxs)(d.hI,{color:"#059669",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Ze.reduce((e,r)=>e+r.sales,0),te)}),(0,S.jsxs)(d.d1,{children:[Ge.length," orders in selected period"]})]}),(0,S.jsxs)(d.hI,{color:"#2563EB",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Ge.length.toLocaleString()}),(0,S.jsxs)(d.d1,{children:[Ge.filter(e=>"completed"===e.status).length," completed"]})]}),(0,S.jsxs)(d.hI,{color:"#DC2626",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.averageOrderValue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Ge.length>0?Ze.reduce((e,r)=>e+r.sales,0)/Ge.length:0,te)}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.perOrderAverage")})]}),(0,S.jsxs)(d.hI,{color:"#7C3AED",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.period")}),(0,S.jsx)(d.Os,{children:ar()}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.days")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.detailedSalesBreakdown")}),(0,S.jsxs)(_,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{style:{width:"40%"},children:t("brand:brandReportsPage.period")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.revenue")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.orders")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.avgOrderValue")})]})}),(0,S.jsx)("tbody",{children:Object.keys(rr).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=rr[e],t=We.has(e);return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(We);if(r.has(e)){var t;r.delete(e);const n=new Set(Ne);Object.keys((null===(t=rr[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),He(n)}else r.add(e);Ye(r)})(e),children:[(0,S.jsxs)(W,{level:0,bold:!0,children:[(0,S.jsx)(Y,{expanded:t,children:"\u25b6"}),e]}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,te)}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,S.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,te)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const a=r.months[t],s=`${e}-${t}`,d=Ne.has(s),o=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Ne);r.has(e)?r.delete(e):r.add(e),He(r)})(s),children:[(0,S.jsxs)(W,{level:1,bold:!0,children:[(0,S.jsx)(Y,{expanded:d,children:"\u25b6"}),o]}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(a.revenue,te)}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:a.orders}),(0,S.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(a.revenue/a.orders,te)})]}),d&&Object.keys(a.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=a.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,S.jsxs)(L,{level:2,children:[(0,S.jsx)(W,{level:2,children:t}),(0,S.jsx)(W,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,te)}),(0,S.jsx)(W,{level:2,style:{textAlign:"right"},children:r.orders}),(0,S.jsx)(W,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,te)})]},e)})]},s)})]},e)})})]})]})]})]}),(0,S.jsxs)("div",{style:{display:"menu"===ae?"block":"none"},children:[(0,S.jsx)(or,{}),(0,S.jsxs)(B,{children:[(0,S.jsxs)(d.hI,{color:"#F59E0B",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.bestSeller")}),(0,S.jsx)(d.Os,{children:(null===(e=Xe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,S.jsxs)(d.d1,{children:[(null===(r=Xe[0])||void 0===r?void 0:r.orders)||0," orders"]})]}),(0,S.jsxs)(d.hI,{color:"#10B981",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalItemsAnalyzed")}),(0,S.jsx)(d.Os,{children:Xe.length}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.completeMenuAnalysis")})]}),(0,S.jsxs)(d.hI,{color:"#3B82F6",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalOrders")}),(0,S.jsx)(d.Os,{children:Xe.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.forSelectedPeriod")})]}),(0,S.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalRevenue")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(Xe.reduce((e,r)=>e+r.revenue,0),te)}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.forSelectedPeriod")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.completeMenuPerformanceRanking")}),(0,S.jsxs)(_,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{children:t("brand:brandReportsPage.rank")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.menuItem")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.category")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.price")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.orders")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.revenue")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.performance")})]})}),(0,S.jsx)("tbody",{children:Xe.map((e,r)=>{var t;const n=(null===(t=Xe[0])||void 0===t?void 0:t.orders)||1;return(0,S.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsxs)(z,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{children:(0,S.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,S.jsx)(z,{children:(0,c.vv)(e.price,te)}),(0,S.jsx)(z,{children:e.orders.toLocaleString()}),(0,S.jsx)(z,{children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:e.orders/n*100}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,S.jsxs)("div",{style:{display:"customers"===ae?"block":"none"},children:[(0,S.jsx)(or,{}),(0,S.jsxs)(B,{children:[(0,S.jsxs)(d.hI,{color:"#635BFF",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalCustomers")}),(0,S.jsx)(d.Os,{children:_e.length.toLocaleString()}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.acrossAllRestaurants")})]}),(0,S.jsxs)(d.hI,{color:"#6FCF97",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.repeatCustomers")}),(0,S.jsx)(d.Os,{children:_e.filter(e=>e.total_orders>1).length}),(0,S.jsxs)(d.d1,{children:[_e.length>0?Math.round(_e.filter(e=>e.total_orders>1).length/_e.length*100):0,"% return rate"]})]}),(0,S.jsxs)(d.hI,{color:"#FFB800",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.averageSpent")}),(0,S.jsx)(d.Os,{children:(0,c.vv)(_e.length>0?_e.reduce((e,r)=>e+parseFloat(r.total_spent||0),0)/_e.length:0,te)}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.perCustomer")})]}),(0,S.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.totalPoints")}),(0,S.jsx)(d.Os,{children:_e.reduce((e,r)=>e+(r.points||0),0).toLocaleString()}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.acrossAllCustomers")})]})]}),(0,S.jsx)(I,{children:(0,S.jsx)(M,{children:t("brand:brandReportsPage.customerInsightsWillBeAvailableWhenCustomerDataIsLoaded")})})]}),(0,S.jsxs)("div",{style:{display:"operations"===ae?"block":"none"},children:[(0,S.jsx)(or,{}),(0,S.jsxs)(B,{children:[(0,S.jsxs)(d.hI,{color:"#10B981",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.orderFulfillment")}),(0,S.jsxs)(d.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.ontimeCompletion")})]}),(0,S.jsxs)(d.hI,{color:"#F59E0B",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.avgWaitTime")}),(0,S.jsxs)(d.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.estimated")})]}),(0,S.jsxs)(d.hI,{color:"#EF4444",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.peakHour")}),(0,S.jsx)(d.Os,{children:"12-1 PM"}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.busiestTime")})]}),(0,S.jsxs)(d.hI,{color:"#6366F1",children:[(0,S.jsx)(d.v0,{children:t("brand:brandReportsPage.staffEfficiency")}),(0,S.jsxs)(d.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,S.jsx)(d.d1,{children:t("brand:brandReportsPage.estimated")})]})]}),(0,S.jsxs)(I,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.peakHoursPerformance")}),(0,S.jsxs)(_,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{children:t("brand:brandReportsPage.timeSlot")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.orders")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.revenue")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.efficiency")})]})}),(0,S.jsx)("tbody",{children:tr.map((e,r)=>(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{style:{fontWeight:600},children:e.time}),(0,S.jsx)(z,{children:e.orders}),(0,S.jsx)(z,{children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:e.efficiency}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]}),(0,S.jsxs)("div",{style:{display:"ranking"===ae?"block":"none"},children:[(0,S.jsx)(x.A,{activePeriod:de,dateRange:ie,isCustomDateRange:ce,onPeriodChange:sr,onCalendarRangeSelect:dr}),(0,S.jsxs)(G,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.brandSalesRanking")}),(0,S.jsxs)(_,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{style:{width:"60px"},children:t("brand:brandReportsPage.rank")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.brandName")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.restaurants")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.orders")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.revenue")}),(0,S.jsx)(O,{style:{width:"150px"},children:t("brand:brandReportsPage.performance")})]})}),(0,S.jsxs)("tbody",{children:[nr.brands.map((e,r)=>{var t;const n=(null===(t=nr.brands[0])||void 0===t?void 0:t.revenue)||1,a=Math.round(e.revenue/n*100);return(0,S.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(z,{children:(0,S.jsx)(Z,{rank:r+1,children:r+1})}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.restaurantCount}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(z,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:a}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[a,"%"]})]})})]},e.id)}),0===nr.brands.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(z,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:t("brand:brandReportsPage.noBrandDataAvailable")})})]})]})]}),(0,S.jsxs)(G,{children:[(0,S.jsx)(M,{children:t("brand:brandReportsPage.restaurantSalesRanking")}),(0,S.jsxs)(_,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(O,{style:{width:"60px"},children:t("brand:brandReportsPage.rank")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.restaurantName")}),(0,S.jsx)(O,{children:t("brand:brandReportsPage.brand")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.orders")}),(0,S.jsx)(O,{style:{textAlign:"right"},children:t("brand:brandReportsPage.revenue")}),(0,S.jsx)(O,{style:{width:"150px"},children:t("brand:brandReportsPage.performance")})]})}),(0,S.jsxs)("tbody",{children:[nr.restaurants.slice(0,20).map((e,r)=>{var t;const n=(null===(t=nr.restaurants[0])||void 0===t?void 0:t.revenue)||1,a=Math.round(e.revenue/n*100);return(0,S.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(z,{children:(0,S.jsx)(Z,{rank:r+1,children:r+1})}),(0,S.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(z,{children:(0,S.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,S.jsx)(z,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(z,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(z,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(T,{percentage:a}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[a,"%"]})]})})]},e.id)}),0===nr.restaurants.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(z,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:t("brand:brandReportsPage.noRestaurantDataAvailable")})})]})]})]})]})]})]})})}},2653:(e,r,t)=>{t.d(r,{M:()=>s});var n=t(9950),a=t(4492);function s(e){const[r,t]=(0,a.ok)(),s=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[d,o]=(0,n.useState)(s());return[d,(0,n.useCallback)(e=>{o(e),t({tab:e})},[t])]}},4021:(e,r,t)=>{t.d(r,{i1:()=>d});var n=t(9950),a=t(1367),s=t(6038);const d=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)("RM"),[d]=(0,n.useState)(Object.keys(s.DL)),[o,i]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let a=n>=0?r[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void i(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";t(n)}else t("MYR")}catch(d){console.error("Failed to fetch restaurant currency:",d),c("Failed to load currency settings"),t("MYR")}finally{i(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:d,loading:o,error:l}}}}]);