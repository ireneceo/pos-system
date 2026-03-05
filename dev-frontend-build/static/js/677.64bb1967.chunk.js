"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[677],{512:(e,t,r)=>{r.d(t,{x:()=>B,A:()=>O});var n=r(9950),s=r(4752),i=r(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,v=s.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=s.Ay.div`
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
`,S=s.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=s.Ay.div`
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
`,C=e=>{let{startDate:t,endDate:r,onRangeSelect:s,onClose:C,isOpen:E}=e;const B=new Date,[$,D]=(0,n.useState)(B.getMonth()),[M,_]=(0,n.useState)(B.getFullYear()),[I,O]=(0,n.useState)(null),[R,z]=(0,n.useState)(null),[T,L]=(0,n.useState)(null),[P,N]=(0,n.useState)("start"),W=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&O(d(t)),r&&z(d(r))},[t,r]),(0,n.useEffect)(()=>{E&&N("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{W.current&&!W.current.contains(e.target)&&C()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,C]);const Y=(0,n.useCallback)(()=>{0===$?(D(11),_(e=>e-1)):D(e=>e-1)},[$]),H=(0,n.useCallback)(()=>{11===$?(D(0),_(e=>e+1)):D(e=>e+1)},[$]),U=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let s=0;s<n;s++)d.push(null);for(let s=1;s<=r;s++)d.push(new Date(e,t,s));return(0,i.jsxs)(y,{children:[(0,i.jsx)(F,{children:c(e,t)}),(0,i.jsx)(b,{children:a.map(e=>(0,i.jsx)(w,{children:e},e))}),(0,i.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,i.jsx)(S,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:a,isHoverEnd:d}=(e=>{const t=I&&l(e,I),r=R&&l(e,R),n="end"===P&&T?T:R;let s=!1;if(I&&n){const[t,r]=I<=n?[I,n]:[n,I];s=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:s,isHoverEnd:"end"===P&&T&&l(e,T)}})(e),c=l(e,B);return(0,i.jsx)(A,{$isStart:!!r,$isEnd:!!n,$isInRange:a,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===P)O(e),z(null),N("end");else{let t=I,r=e;r<t&&([t,r]=[r,t]),O(t),z(r),N("start"),s(o(t),o(r)),setTimeout(C,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},K=11===$?0:$+1,J=11===$?M+1:M,V=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}O(r),z(n),N("start"),s(o(r),o(n)),setTimeout(C,150)};return E?(0,i.jsx)(h,{ref:W,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[(0,i.jsx)(p,{onClick:()=>V("this_week"),children:"This Week"}),(0,i.jsx)(p,{onClick:()=>V("this_month"),children:"This Month"}),(0,i.jsx)(p,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,i.jsxs)(g,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(j,{onClick:Y,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(j,{onClick:H,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(v,{children:[U(M,$),(0,i.jsx)(f,{children:U(J,K)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,B=e=>{const t=new Date;let r=new Date;const n=new Date;switch(e){case"today":break;case"week":r.setDate(t.getDate()-6);break;case"month":r.setDate(t.getDate()-29);break;case"year":r.setDate(t.getDate()-364);break;case"all":r=new Date(2020,0,1)}return{start:E(r),end:E(n)}},$=s.Ay.div`
  margin-bottom: 24px;
`,D=s.Ay.div`
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
`,_=s.Ay.div`
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
`,O=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:s,onPeriodChange:a,onCalendarRangeSelect:o,includeToday:d=!1,children:l}=e;const[c,h]=(0,n.useState)(!1),x=d?["today","week","month","year","all"]:["week","month","year","all"],u={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)($,{children:(0,i.jsxs)(D,{children:[x.map(e=>(0,i.jsx)(M,{active:t===e&&!s,onClick:()=>a(e),children:u[e]},e)),(0,i.jsxs)(_,{children:[(0,i.jsxs)(I,{active:s,onClick:()=>h(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,i.jsx)(C,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{o(e,t),h(!1)},onClose:()=>h(!1)})]}),l]})})}},677:(e,t,r)=>{r.r(t),r.d(t,{default:()=>X});var n=r(9950),s=r(4752),i=r(4492),a=r(8409),o=r(2597),d=r(2653),l=r(1367),c=r(6038),h=r(4021),x=r(512),u=r(1095),p=r(2847),g=r(3245),m=r(158),j=r(3440),v=r(2174),f=r(4915),y=r(7621),F=r(5297),b=r(2528),w=r(294),k=r(3588),S=r(4414);const A=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,C=s.Ay.div`
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
`,E=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,B=s.Ay.div`
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
`,$=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,D=a.MD,M=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,_=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,I=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,O=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,L=s.Ay.div`
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
`,P=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,N=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,W=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,Y=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,H=s.Ay.input`
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
`,U=s.Ay.div`
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
`,K=s.Ay.div`
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
`,J=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,V=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,q=s.Ay.button`
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
`,G=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,Z=s.Ay.span`
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
`,Q=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],X=()=>{var e,t;const{user:r}=(0,l.As)(),[s,X]=(0,i.ok)(),{defaultCurrency:ee}=(0,h.i1)(),[te,re]=(0,n.useState)("RM");(0,n.useEffect)(()=>{ee&&re(ee)},[ee]);const[ne,se]=(0,d.M)("ranking"),[ie,ae]=(0,n.useState)("month"),[oe,de]=(0,n.useState)(()=>(0,x.x)("month")),[le,ce]=(0,n.useState)(!1),[he,xe]=(0,n.useState)([]),[ue,pe]=(0,n.useState)([]),[ge,me]=(0,n.useState)("all"),[je,ve]=(0,n.useState)("all"),[fe,ye]=(0,n.useState)(""),[Fe,be]=(0,n.useState)(""),[we,ke]=(0,n.useState)(!1),[Se,Ae]=(0,n.useState)(!1),[Ce,Ee]=(0,n.useState)([]),[Be,$e]=(0,n.useState)([]),[De,Me]=(0,n.useState)([]),[_e,Ie]=(0,n.useState)(!0),[Oe]=(0,n.useState)([]),[Re,ze]=(0,n.useState)([]),[Te,Le]=(0,n.useState)([]),[Pe,Ne]=(0,n.useState)(new Set),[We,Ye]=(0,n.useState)(new Set);function He(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}const[Ue]=(0,n.useState)(()=>s.get("restaurantId")),[Ke]=(0,n.useState)(()=>s.get("restaurantName"));(0,n.useEffect)(()=>{const e={tab:ne};"all"!==je&&(e.restaurantId=je),X(e,{replace:!0})},[je,X,ne]),(0,n.useEffect)(()=>{r&&(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();xe(e),Ee(e.slice(0,10))}let n="/api/restaurants";null===r||void 0===r||!r.id||"Brand General"!==r.role&&"Brand Manager"!==r.role||(n=`/api/restaurants/manager/${r.id}`);const s=await fetch(n,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json(),t=(e.data||e||[]).map(e=>{var t,r;return{id:null===(t=e.id)||void 0===t?void 0:t.toString(),name:e.name,brand_id:e.brand_id,brand_name:e.brand_name||(null===(r=e.brand)||void 0===r?void 0:r.name)}});if(pe(t),$e(t.slice(0,10)),Ue){const e=t.find(e=>e.id===Ue);e&&(ve(e.id),be(e.name))}else if(Ke){const e=decodeURIComponent(Ke),r=t.find(t=>t.name===e);r&&(ve(r.id),be(r.name))}}}catch(e){console.error("Error fetching brands/restaurants:",e)}})()},[r,Ue,Ke]),(0,n.useEffect)(()=>{(async()=>{if(0!==ue.length){Ie(!0);try{const r=localStorage.getItem("auth_token"),n=ue.map(e=>e.id);let s="/api/orders?limit=5000";"all"!==je&&(s+=`&restaurant_id=${je}`);const i=await fetch(s,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();let t=e.data||e||[];if(t=t.filter(e=>{var t;return n.includes(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())}),"all"!==ge){const e=ue.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ge}).map(e=>e.id);t=t.filter(t=>{var r;return e.includes(null===(r=t.restaurant_id)||void 0===r?void 0:r.toString())})}Me(t)}const a=await fetch("/api/menu?excludeImage=true",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){var e,t;const r=await a.json();null!==(e=r.data)&&void 0!==e&&e.items&&ze(r.data.items),null!==(t=r.data)&&void 0!==t&&t.categories&&Le(r.data.categories)}}catch(r){console.error("Error fetching data:",r)}finally{Ie(!1)}}else Ie(!1)})()},[ge,je,ue]);const Je=()=>{me("all"),ye(""),ke(!1)},Ve=()=>{ve("all"),be(""),Ae(!1)},qe=(0,n.useMemo)(()=>{if(!De||0===De.length)return[];const e=new Date(oe.start);e.setHours(0,0,0,0);const t=new Date(oe.end);return t.setHours(23,59,59,999),De.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),i=s>=e&&s<=t,a="completed"===r.payment_status||"completed"===r.status||"pending"===r.status||"preparing"===r.status||"ready"===r.status;return i&&a})},[De,oe.start,oe.end]),Ge=(0,n.useMemo)(()=>{if(0===qe.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===ie){const r={};return qe.forEach(n=>{const s=e(n).getHours(),i=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[i]=(r[i]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===ie){const r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],n=new Date,s=[];for(let e=6;e>=0;e--){const t=new Date(n);t.setDate(t.getDate()-e),s.push(t)}const i={};return qe.forEach(r=>{const n=He(e(r));i[n]=(i[n]||0)+t(r)}),s.map(e=>{const t=He(e);return{date:r[e.getDay()],sales:Math.round(i[t]||0)}})}if("month"===ie){const r={};return qe.forEach(n=>{const s=e(n).getDate().toString();r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>parseInt(e.date)-parseInt(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return qe.forEach(s=>{const i=r[e(s).getMonth()];n[i]=(n[i]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[qe,ie]),Ze=(0,n.useMemo)(()=>{if(0===qe.length)return[{name:"No Data",value:100,sales:0}];const e={};Te.forEach(t=>{t.id&&t.name&&(e[t.id.toString()]=t.name)});const t={};Re.forEach(r=>{if(r.id){const n=r.categoryId?e[r.categoryId.toString()]||r.categoryId:"Other";t[r.id.toString()]=n}});const r={};let n=0;qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var s,i,a;const o=parseFloat(e.price||0)*parseInt(e.quantity||1);n+=o;const d=(null===(s=e.menuItem)||void 0===s||null===(i=s.id)||void 0===i?void 0:i.toString())||(null===(a=e.product_id)||void 0===a?void 0:a.toString()),l=d&&t[d]||"Other";r[l]=(r[l]||0)+o})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[qe,Re,Te]),Qe=(0,n.useMemo)(()=>{var e;if(0===qe.length)return[];const t={};Te.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};Re.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};qe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,i;const a=e.menu_name||e.name||"Unknown",o=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(i=e.product_id)||void 0===i?void 0:i.toString()),d=o?r[o]||"Other":e.category||"Other";n[a]||(n[a]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[a].orders+=l,n[a].revenue+=c*l})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),i=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/i*100)}),s},[qe,Re,Te]),Xe=(0,n.useMemo)(()=>{if(0===qe.length)return[];const e={};return qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[qe]),et=(0,n.useMemo)(()=>{if(0===qe.length)return{};const e={};return qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,i=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[i]||(e[n].months[s].days[i]={day:i,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=a,e[n].orders+=1,e[n].months[s].revenue+=a,e[n].months[s].orders+=1,e[n].months[s].days[i].revenue+=a,e[n].months[s].days[i].orders+=1}),e},[qe]),tt=(0,n.useMemo)(()=>{if(0===qe.length)return[];const e={};return qe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(qe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[qe]),rt=(0,n.useMemo)(()=>{if(0===De.length)return{brands:[],restaurants:[]};const e=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),t=new Date(oe.start);t.setHours(0,0,0,0);const r=new Date(oe.end);r.setHours(23,59,59,999);const n=De.filter(e=>{const n=e.order_date||e.createdAt;if(!n)return!1;const s=new Date(n);return s>=t&&s<=r&&"completed"===e.status}),s={};n.forEach(t=>{var r,n;const i=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString();if(!i)return;const a=ue.find(e=>e.id===i),o=(null===a||void 0===a?void 0:a.name)||t.restaurant_name||"Unknown",d=(null===a||void 0===a?void 0:a.brand_name)||(null===(n=he.find(e=>e.id===(null===a||void 0===a?void 0:a.brand_id)))||void 0===n?void 0:n.name)||"Independent";s[i]||(s[i]={name:o,brandName:d,orders:0,revenue:0}),s[i].orders+=1,s[i].revenue+=e(t)});const i=Object.entries(s).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).sort((e,t)=>t.revenue-e.revenue),a={},o=new Set(ue.map(e=>{var t;return null===(t=e.brand_id)||void 0===t?void 0:t.toString()}).filter(Boolean));he.forEach(e=>{o.has(e.id.toString())&&(a[e.id.toString()]={name:e.name,orders:0,revenue:0,restaurantCount:0})}),ue.some(e=>!e.brand_id)&&(a.independent={name:"Independent",orders:0,revenue:0,restaurantCount:0}),ue.forEach(e=>{var t;const r=(null===(t=e.brand_id)||void 0===t?void 0:t.toString())||"independent";a[r]&&(a[r].restaurantCount+=1)}),n.forEach(t=>{var r,n;const s=null===(r=t.restaurant_id)||void 0===r?void 0:r.toString(),i=ue.find(e=>e.id===s),o=(null===i||void 0===i||null===(n=i.brand_id)||void 0===n?void 0:n.toString())||"independent";a[o]&&(a[o].orders+=1,a[o].revenue+=e(t))});return{brands:Object.entries(a).map(e=>{let[t,r]=e;return{id:t,...r,revenue:Math.round(r.revenue)}}).filter(e=>e.orders>0||e.restaurantCount>0).sort((e,t)=>t.revenue-e.revenue),restaurants:i}},[De,ue,he,oe]),nt=()=>{const e=new Date(oe.start),t=new Date(oe.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(0,n.useEffect)(()=>{const e=nt();if(e<=31){const e=new Set(Object.keys(et)),t=new Set;Object.keys(et).forEach(e=>{Object.keys(et[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),Ne(e),Ye(t)}else e<=365?(Ne(new Set(Object.keys(et))),Ye(new Set)):(Ne(new Set),Ye(new Set))},[oe.start,oe.end,et]);const st=e=>{ae(e),ce(!1),de((0,x.x)(e))},it=(e,t)=>{ce(!0),ae("all"),de({start:e,end:t})},at=()=>(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(B,{children:[(0,S.jsxs)(Y,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Brands",value:fe,onChange:e=>(e=>{if(ye(e),ke(!0),e.length<1)return void Ee(he.slice(0,10));const t=he.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)||t.code.toLowerCase().includes(r)}).slice(0,10);Ee(t)})(e.target.value),onFocus:()=>{ke(!0),0===fe.length&&Ee(he.slice(0,10))},onBlur:()=>setTimeout(()=>ke(!1),200)}),"all"!==ge&&fe&&(0,S.jsx)(q,{onClick:Je,children:"\xd7"}),(0,S.jsxs)(U,{show:we,children:[(0,S.jsxs)(K,{onClick:()=>{me("all"),ye(""),ke(!1)},children:[(0,S.jsx)(J,{children:"All Brands"}),(0,S.jsx)(V,{children:"Show all brand data"})]}),Ce.map(e=>(0,S.jsxs)(K,{onClick:()=>(e=>{me(e.id.toString()),ye(e.name),ke(!1),ve("all"),be("")})(e),children:[(0,S.jsx)(J,{children:e.name}),(0,S.jsxs)(V,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,S.jsxs)(Y,{children:[(0,S.jsx)(H,{type:"text",placeholder:"All Restaurants",value:Fe,onChange:e=>(e=>{be(e),Ae(!0);let t=ue;if("all"!==ge&&(t=ue.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ge})),e.length<1)return void $e(t.slice(0,10));const r=t.filter(t=>{const r=e.toLowerCase();return t.name.toLowerCase().includes(r)}).slice(0,10);$e(r)})(e.target.value),onFocus:()=>{Ae(!0);let e=ue;"all"!==ge&&(e=ue.filter(e=>{var t;return(null===(t=e.brand_id)||void 0===t?void 0:t.toString())===ge})),$e(e.slice(0,10))},onBlur:()=>setTimeout(()=>Ae(!1),200)}),"all"!==je&&Fe&&(0,S.jsx)(q,{onClick:Ve,children:"\xd7"}),(0,S.jsxs)(U,{show:Se,children:[(0,S.jsxs)(K,{onClick:()=>{ve("all"),be(""),Ae(!1)},children:[(0,S.jsx)(J,{children:"All Restaurants"}),(0,S.jsx)(V,{children:"Show all restaurant data"})]}),Be.map(e=>(0,S.jsxs)(K,{onClick:()=>(e=>{ve(e.id),be(e.name),Ae(!1)})(e),children:[(0,S.jsx)(J,{children:e.name}),(0,S.jsx)(V,{children:e.brand_name||"Independent"})]},e.id))]})]})]}),(0,S.jsx)(x.A,{activePeriod:ie,dateRange:oe,isCustomDateRange:le,onPeriodChange:st,onCalendarRangeSelect:it})]});return(0,S.jsx)(S.Fragment,{children:(0,S.jsxs)(A,{children:[(0,S.jsx)(C,{children:(0,S.jsx)(E,{children:"Brand Reports"})}),(0,S.jsxs)($,{children:[(0,S.jsxs)(o.tU,{children:[(0,S.jsx)(o.oz,{active:"ranking"===ne,onClick:()=>se("ranking"),children:"Sales Ranking"}),(0,S.jsx)(o.oz,{active:"sales"===ne,onClick:()=>se("sales"),children:"Sales Report"}),(0,S.jsx)(o.oz,{active:"details"===ne,onClick:()=>se("details"),children:"Sales Details"}),(0,S.jsx)(o.oz,{active:"menu"===ne,onClick:()=>se("menu"),children:"Menu Analysis"}),(0,S.jsx)(o.oz,{active:"customers"===ne,onClick:()=>se("customers"),children:"Customer Insights"}),(0,S.jsx)(o.oz,{active:"operations"===ne,onClick:()=>se("operations"),children:"Operations"})]}),(0,S.jsxs)("div",{style:{display:"sales"===ne?"block":"none"},children:[(0,S.jsx)(at,{}),_e?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===qe.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(D,{children:[(0,S.jsxs)(a.hI,{color:"#059669",children:[(0,S.jsx)(a.v0,{children:"Total Revenue"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(Ge.reduce((e,t)=>e+t.sales,0),te)}),(0,S.jsxs)(a.d1,{children:[qe.length," orders in selected period"]})]}),(0,S.jsxs)(a.hI,{color:"#2563EB",children:[(0,S.jsx)(a.v0,{children:"Total Orders"}),(0,S.jsx)(a.Os,{children:qe.length.toLocaleString()}),(0,S.jsx)(a.d1,{children:"For selected period"})]}),(0,S.jsxs)(a.hI,{color:"#DC2626",children:[(0,S.jsx)(a.v0,{children:"Average Order Value"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(qe.length>0?Ge.reduce((e,t)=>e+t.sales,0)/qe.length:0,te)}),(0,S.jsx)(a.d1,{children:"Per order"})]}),(0,S.jsxs)(a.hI,{color:"#7C3AED",children:[(0,S.jsx)(a.v0,{children:"Completed Orders"}),(0,S.jsx)(a.Os,{children:qe.filter(e=>"completed"===e.status).length}),(0,S.jsxs)(a.d1,{children:[Math.round(qe.filter(e=>"completed"===e.status).length/qe.length*100||0),"% completion rate"]})]})]}),(0,S.jsxs)(M,{children:[(0,S.jsxs)(_,{children:[(0,S.jsx)(I,{children:"Revenue Trend"}),(0,S.jsx)(u.u,{width:"100%",height:300,children:(0,S.jsxs)(p.b,{data:Ge,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,S.jsxs)(_,{children:[(0,S.jsx)(I,{children:"Sales by Category"}),(0,S.jsx)(u.u,{width:"100%",height:300,children:(0,S.jsxs)(y.r,{children:[(0,S.jsx)(F.F,{data:Ze,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ze.map((e,t)=>(0,S.jsx)(b.f,{fill:Q[t%Q.length]},`cell-${t}`))}),(0,S.jsx)(v.m,{formatter:e=>`${e}%`})]})})]})]}),(0,S.jsxs)(_,{children:[(0,S.jsx)(I,{children:"Hourly Orders Distribution"}),(0,S.jsx)(u.u,{width:"100%",height:250,children:(0,S.jsxs)(w.E,{data:Xe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,S.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,S.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,S.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,S.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,S.jsx)(k.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,S.jsxs)("div",{style:{display:"details"===ne?"block":"none"},children:[(0,S.jsx)(at,{}),_e?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===qe.length?(0,S.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,S.jsxs)("div",{children:[(0,S.jsxs)(D,{children:[(0,S.jsxs)(a.hI,{color:"#059669",children:[(0,S.jsx)(a.v0,{children:"Total Revenue"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(Ge.reduce((e,t)=>e+t.sales,0),te)}),(0,S.jsxs)(a.d1,{children:[qe.length," orders in selected period"]})]}),(0,S.jsxs)(a.hI,{color:"#2563EB",children:[(0,S.jsx)(a.v0,{children:"Total Orders"}),(0,S.jsx)(a.Os,{children:qe.length.toLocaleString()}),(0,S.jsxs)(a.d1,{children:[qe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,S.jsxs)(a.hI,{color:"#DC2626",children:[(0,S.jsx)(a.v0,{children:"Average Order Value"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(qe.length>0?Ge.reduce((e,t)=>e+t.sales,0)/qe.length:0,te)}),(0,S.jsx)(a.d1,{children:"Per order average"})]}),(0,S.jsxs)(a.hI,{color:"#7C3AED",children:[(0,S.jsx)(a.v0,{children:"Period"}),(0,S.jsx)(a.Os,{children:nt()}),(0,S.jsx)(a.d1,{children:"Days"})]})]}),(0,S.jsxs)(O,{children:[(0,S.jsx)(I,{children:"Detailed Sales Breakdown"}),(0,S.jsxs)(R,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{style:{width:"40%"},children:"Period"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Revenue"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Orders"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,S.jsx)("tbody",{children:Object.keys(et).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=et[e],r=Pe.has(e);return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(P,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(Pe);if(t.has(e)){var r;t.delete(e);const n=new Set(We);Object.keys((null===(r=et[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),Ye(n)}else t.add(e);Ne(t)})(e),children:[(0,S.jsxs)(N,{level:0,bold:!0,children:[(0,S.jsx)(W,{expanded:r,children:"\u25b6"}),e]}),(0,S.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,te)}),(0,S.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,te)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,a=We.has(i),o=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,S.jsxs)(n.Fragment,{children:[(0,S.jsxs)(P,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(We);t.has(e)?t.delete(e):t.add(e),Ye(t)})(i),children:[(0,S.jsxs)(N,{level:1,bold:!0,children:[(0,S.jsx)(W,{expanded:a,children:"\u25b6"}),o]}),(0,S.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,te)}),(0,S.jsx)(N,{level:1,style:{textAlign:"right"},children:s.orders}),(0,S.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,te)})]}),a&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,S.jsxs)(P,{level:2,children:[(0,S.jsx)(N,{level:2,children:r}),(0,S.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,te)}),(0,S.jsx)(N,{level:2,style:{textAlign:"right"},children:t.orders}),(0,S.jsx)(N,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,te)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,S.jsxs)("div",{style:{display:"menu"===ne?"block":"none"},children:[(0,S.jsx)(at,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(a.hI,{color:"#F59E0B",children:[(0,S.jsx)(a.v0,{children:"Best Seller"}),(0,S.jsx)(a.Os,{children:(null===(e=Qe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,S.jsxs)(a.d1,{children:[(null===(t=Qe[0])||void 0===t?void 0:t.orders)||0," orders"]})]}),(0,S.jsxs)(a.hI,{color:"#10B981",children:[(0,S.jsx)(a.v0,{children:"Total Items Analyzed"}),(0,S.jsx)(a.Os,{children:Qe.length}),(0,S.jsx)(a.d1,{children:"Complete menu analysis"})]}),(0,S.jsxs)(a.hI,{color:"#3B82F6",children:[(0,S.jsx)(a.v0,{children:"Total Orders"}),(0,S.jsx)(a.Os,{children:Qe.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,S.jsx)(a.d1,{children:"For selected period"})]}),(0,S.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,S.jsx)(a.v0,{children:"Total Revenue"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(Qe.reduce((e,t)=>e+t.revenue,0),te)}),(0,S.jsx)(a.d1,{children:"For selected period"})]})]}),(0,S.jsxs)(O,{children:[(0,S.jsx)(I,{children:"Complete Menu Performance Ranking"}),(0,S.jsxs)(R,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{children:"Rank"}),(0,S.jsx)(z,{children:"Menu Item"}),(0,S.jsx)(z,{children:"Category"}),(0,S.jsx)(z,{children:"Price"}),(0,S.jsx)(z,{children:"Orders"}),(0,S.jsx)(z,{children:"Revenue"}),(0,S.jsx)(z,{children:"Performance"})]})}),(0,S.jsx)("tbody",{children:Qe.map((e,t)=>{var r;const n=(null===(r=Qe[0])||void 0===r?void 0:r.orders)||1;return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsxs)(T,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,S.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(T,{children:(0,S.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,S.jsx)(T,{children:(0,c.vv)(e.price,te)}),(0,S.jsx)(T,{children:e.orders.toLocaleString()}),(0,S.jsx)(T,{children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(T,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(L,{percentage:e.orders/n*100}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,S.jsxs)("div",{style:{display:"customers"===ne?"block":"none"},children:[(0,S.jsx)(at,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(a.hI,{color:"#635BFF",children:[(0,S.jsx)(a.v0,{children:"Total Customers"}),(0,S.jsx)(a.Os,{children:Oe.length.toLocaleString()}),(0,S.jsx)(a.d1,{children:"Across all restaurants"})]}),(0,S.jsxs)(a.hI,{color:"#00D924",children:[(0,S.jsx)(a.v0,{children:"Repeat Customers"}),(0,S.jsx)(a.Os,{children:Oe.filter(e=>e.total_orders>1).length}),(0,S.jsxs)(a.d1,{children:[Oe.length>0?Math.round(Oe.filter(e=>e.total_orders>1).length/Oe.length*100):0,"% return rate"]})]}),(0,S.jsxs)(a.hI,{color:"#FFB800",children:[(0,S.jsx)(a.v0,{children:"Average Spent"}),(0,S.jsx)(a.Os,{children:(0,c.vv)(Oe.length>0?Oe.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/Oe.length:0,te)}),(0,S.jsx)(a.d1,{children:"Per customer"})]}),(0,S.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,S.jsx)(a.v0,{children:"Total Points"}),(0,S.jsx)(a.Os,{children:Oe.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,S.jsx)(a.d1,{children:"Across all customers"})]})]}),(0,S.jsx)(O,{children:(0,S.jsx)(I,{children:"Customer insights will be available when customer data is loaded"})})]}),(0,S.jsxs)("div",{style:{display:"operations"===ne?"block":"none"},children:[(0,S.jsx)(at,{}),(0,S.jsxs)(D,{children:[(0,S.jsxs)(a.hI,{color:"#10B981",children:[(0,S.jsx)(a.v0,{children:"Order Fulfillment"}),(0,S.jsxs)(a.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,S.jsx)(a.d1,{children:"On-time completion"})]}),(0,S.jsxs)(a.hI,{color:"#F59E0B",children:[(0,S.jsx)(a.v0,{children:"Avg. Wait Time"}),(0,S.jsxs)(a.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,S.jsx)(a.d1,{children:"Estimated"})]}),(0,S.jsxs)(a.hI,{color:"#EF4444",children:[(0,S.jsx)(a.v0,{children:"Peak Hour"}),(0,S.jsx)(a.Os,{children:"12-1 PM"}),(0,S.jsx)(a.d1,{children:"Busiest time"})]}),(0,S.jsxs)(a.hI,{color:"#6366F1",children:[(0,S.jsx)(a.v0,{children:"Staff Efficiency"}),(0,S.jsxs)(a.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,S.jsx)(a.d1,{children:"Estimated"})]})]}),(0,S.jsxs)(O,{children:[(0,S.jsx)(I,{children:"Peak Hours Performance"}),(0,S.jsxs)(R,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{children:"Time Slot"}),(0,S.jsx)(z,{children:"Orders"}),(0,S.jsx)(z,{children:"Revenue"}),(0,S.jsx)(z,{children:"Efficiency"})]})}),(0,S.jsx)("tbody",{children:tt.map((e,t)=>(0,S.jsxs)("tr",{children:[(0,S.jsx)(T,{style:{fontWeight:600},children:e.time}),(0,S.jsx)(T,{children:e.orders}),(0,S.jsx)(T,{children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(T,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(L,{percentage:e.efficiency}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]}),(0,S.jsxs)("div",{style:{display:"ranking"===ne?"block":"none"},children:[(0,S.jsx)(x.A,{activePeriod:ie,dateRange:oe,isCustomDateRange:le,onPeriodChange:st,onCalendarRangeSelect:it}),(0,S.jsxs)(G,{children:[(0,S.jsx)(I,{children:"Brand Sales Ranking"}),(0,S.jsxs)(R,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{style:{width:"60px"},children:"Rank"}),(0,S.jsx)(z,{children:"Brand Name"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Restaurants"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Orders"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Revenue"}),(0,S.jsx)(z,{style:{width:"150px"},children:"Performance"})]})}),(0,S.jsxs)("tbody",{children:[rt.brands.map((e,t)=>{var r;const n=(null===(r=rt.brands[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(T,{children:(0,S.jsx)(Z,{rank:t+1,children:t+1})}),(0,S.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(T,{style:{textAlign:"right"},children:e.restaurantCount}),(0,S.jsx)(T,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(T,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(T,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(L,{percentage:s}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===rt.brands.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(T,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No brand data available"})})]})]})]}),(0,S.jsxs)(G,{children:[(0,S.jsx)(I,{children:"Restaurant Sales Ranking"}),(0,S.jsxs)(R,{children:[(0,S.jsx)("thead",{children:(0,S.jsxs)("tr",{children:[(0,S.jsx)(z,{style:{width:"60px"},children:"Rank"}),(0,S.jsx)(z,{children:"Restaurant Name"}),(0,S.jsx)(z,{children:"Brand"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Orders"}),(0,S.jsx)(z,{style:{textAlign:"right"},children:"Revenue"}),(0,S.jsx)(z,{style:{width:"150px"},children:"Performance"})]})}),(0,S.jsxs)("tbody",{children:[rt.restaurants.slice(0,20).map((e,t)=>{var r;const n=(null===(r=rt.restaurants[0])||void 0===r?void 0:r.revenue)||1,s=Math.round(e.revenue/n*100);return(0,S.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,S.jsx)(T,{children:(0,S.jsx)(Z,{rank:t+1,children:t+1})}),(0,S.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,S.jsx)(T,{children:(0,S.jsx)("span",{style:{padding:"2px 8px",borderRadius:"4px",fontSize:"11px",backgroundColor:"Independent"===e.brandName?"#F3F4F6":"#E0E7FF",color:"Independent"===e.brandName?"#6B7280":"#4338CA"},children:e.brandName})}),(0,S.jsx)(T,{style:{textAlign:"right"},children:e.orders.toLocaleString()}),(0,S.jsx)(T,{style:{textAlign:"right",fontWeight:600,color:"#635BFF"},children:(0,c.vv)(e.revenue,te)}),(0,S.jsx)(T,{children:(0,S.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,S.jsx)(L,{percentage:s}),(0,S.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s,"%"]})]})})]},e.id)}),0===rt.restaurants.length&&(0,S.jsx)("tr",{children:(0,S.jsx)(T,{colSpan:6,style:{textAlign:"center",color:"#6B7C93",padding:"20px"},children:"No restaurant data available"})})]})]})]})]})]})]})})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var n=r(4752),s=r(4414);const i=n.Ay.div`
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
`,a=n.Ay.button`
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
`,o=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:r,style:n}=e;return(0,s.jsx)(i,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,s.jsx)(a,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,s.jsx)(o,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),s=r(4492);function i(e){const[t,r]=(0,s.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,o]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},4021:(e,t,r)=>{r.d(t,{i1:()=>a});var n=r(9950),s=r(1367),i=r(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(i.DL)),[o,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let s=n>=0?t[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(n)}else r("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:l}}}}]);