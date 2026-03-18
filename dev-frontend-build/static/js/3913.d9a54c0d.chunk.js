"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3913],{512:(e,t,n)=>{n.d(t,{x:()=>D,A:()=>O});var r=n(9950),i=n(4752),s=n(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,r]=e.split("-").map(Number);return new Date(t,n-1,r)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),x=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),c=i.Ay.div`
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
`,h=i.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,p=i.Ay.div`
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
`,u=i.Ay.button`
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
`,m=i.Ay.div``,g=i.Ay.div`
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
`,f=i.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,j=i.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,v=i.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=i.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=i.Ay.div`
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
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=i.Ay.div`
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
`,S=e=>{let{startDate:t,endDate:n,onRangeSelect:i,onClose:S,isOpen:E}=e;const D=new Date,[$,R]=(0,r.useState)(D.getMonth()),[B,z]=(0,r.useState)(D.getFullYear()),[M,O]=(0,r.useState)(null),[T,I]=(0,r.useState)(null),[P,L]=(0,r.useState)(null),[W,Y]=(0,r.useState)("start"),N=(0,r.useRef)(null);(0,r.useEffect)(()=>{t&&O(d(t)),n&&I(d(n))},[t,n]),(0,r.useEffect)(()=>{E&&Y("start")},[E]),(0,r.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&S()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,S]);const _=(0,r.useCallback)(()=>{0===$?(R(11),z(e=>e-1)):R(e=>e-1)},[$]),q=(0,r.useCallback)(()=>{11===$?(R(0),z(e=>e+1)):R(e=>e+1)},[$]),H=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),r=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let i=0;i<r;i++)d.push(null);for(let i=1;i<=n;i++)d.push(new Date(e,t,i));return(0,s.jsxs)(v,{children:[(0,s.jsx)(w,{children:x(e,t)}),(0,s.jsx)(b,{children:a.map(e=>(0,s.jsx)(F,{children:e},e))}),(0,s.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,s.jsx)(A,{},`e-${t}`);const{isStart:n,isEnd:r,isInRange:a,isHoverEnd:d}=(e=>{const t=M&&l(e,M),n=T&&l(e,T),r="end"===W&&P?P:T;let i=!1;if(M&&r){const[t,n]=M<=r?[M,r]:[r,M];i=((e,t,n)=>{const r=e.getTime();return r>t.getTime()&&r<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:i,isHoverEnd:"end"===W&&P&&l(e,P)}})(e),x=l(e,D);return(0,s.jsx)(C,{$isStart:!!n,$isEnd:!!r,$isInRange:a,$isHoverEnd:!!d,$isToday:x,onClick:()=>(e=>{if("start"===W)O(e),I(null),Y("end");else{let t=M,n=e;n<t&&([t,n]=[n,t]),O(t),I(n),Y("start"),i(o(t),o(n)),setTimeout(S,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},K=11===$?0:$+1,U=11===$?B+1:B,V=e=>{const t=new Date;let n;const r=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}O(n),I(r),Y("start"),i(o(n),o(r)),setTimeout(S,150)};return E?(0,s.jsx)(c,{ref:N,children:(0,s.jsxs)(h,{children:[(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{onClick:()=>V("this_week"),children:"This Week"}),(0,s.jsx)(u,{onClick:()=>V("this_month"),children:"This Month"}),(0,s.jsx)(u,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(g,{children:[(0,s.jsx)(y,{onClick:_,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(y,{onClick:q,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(f,{children:[H(B,$),(0,s.jsx)(j,{children:H(U,K)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,r,i]=t.split("-").map(Number);return new Date(n,r-1,i)}catch{return new Date}})(t);let r=new Date(n);const i=new Date(n);switch(e){case"today":break;case"week":r.setDate(n.getDate()-6);break;case"month":r.setDate(n.getDate()-29);break;case"year":r.setDate(n.getDate()-364);break;case"all":r=new Date(2020,0,1)}return{start:E(r),end:E(i)}},$=i.Ay.div`
  margin-bottom: 24px;
`,R=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,B=i.Ay.button`
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
`,z=i.Ay.div`
  position: relative;
  display: inline-block;
`,M=i.Ay.button`
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
`,O=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:i,onPeriodChange:a,onCalendarRangeSelect:o,includeToday:d=!1,children:l}=e;const[x,c]=(0,r.useState)(!1),h=d?["today","week","month","year","all"]:["week","month","year","all"],p={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)($,{children:(0,s.jsxs)(R,{children:[h.map(e=>(0,s.jsx)(B,{active:t===e&&!i,onClick:()=>a(e),children:p[e]},e)),(0,s.jsxs)(z,{children:[(0,s.jsxs)(M,{active:i,onClick:()=>c(!x),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,s.jsx)(S,{isOpen:x,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{o(e,t),c(!1)},onClose:()=>c(!1)})]}),l]})})}},2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>h,Qn:()=>x});n(9950);var r=n(4752),i=n(4414);const s=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,o=r.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,d=r.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,x=e=>{let{children:t,className:n,style:r,...a}=e;return(0,i.jsx)(s,{className:n,style:r,...a,children:t})},c=e=>{let{placeholder:t="Search...",value:n,onChange:r,style:s,...l}=e;return(0,i.jsxs)(o,{style:s,children:[(0,i.jsx)(a,{placeholder:t,value:n,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,i.jsx)(d,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:t,...n}=e;return(0,i.jsx)(l,{...n,children:t})}},3913:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var r=n(9950),i=n(4752),s=n(1367),a=n(4492),o=n(2488),d=n(8409),l=n(4021),x=n(6038),c=n(512),h=n(4414);const p=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=i.Ay.div`
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
`,m=i.Ay.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=i.Ay.div`
  font-size: 12px;
  color: ${e=>"up"===e.trend?"#059669":"down"===e.trend?"#DC2626":"#6B7280"};
  font-weight: 500;
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,v=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,b=i.Ay.div`
  height: 300px;
  background: #F8FAFC;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,F=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,k=i.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,A=i.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,C=i.Ay.div`
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
`,S=()=>{var e;const{user:t}=(0,s.As)(),n=(0,a.zy)(),[i,S]=(0,r.useState)("all"),[E,D]=(0,r.useState)("month"),[$,R]=(0,r.useState)(()=>(0,c.x)("month")),[B,z]=(0,r.useState)(!1),{defaultCurrency:M}=(0,l.i1)(),[O,T]=(0,r.useState)("RM");(0,r.useEffect)(()=>{M&&T(M)},[M]);const[I]=(0,r.useState)([{id:"rest-001",name:"Nasi Lemak Corner",location:"KLCC"},{id:"rest-002",name:"Char Kuey Teow King",location:"Pavilion KL"},{id:"rest-003",name:"Roti Canai House",location:"Mid Valley"},{id:"rest-004",name:"Satay House",location:"Level 1, Unit 108"},{id:"rest-005",name:"Japanese Sushi Bar",location:"Level 2, Unit 208"},{id:"rest-006",name:"Laksa Paradise",location:"Level 2, Unit 210"}]);(0,r.useEffect)(()=>{const e=new URLSearchParams(n.search),t=e.get("restaurantId")||e.get("restaurant");t&&S(t)},[n]);const[P,L]=(0,r.useState)({totalRevenue:13130,totalOrders:222,averageOrderValue:59.14,topItems:[{name:"Nasi Lemak Special",quantity:45,revenue:450},{name:"CKT Special",quantity:38,revenue:570},{name:"Roti Canai",quantity:85,revenue:255},{name:"Rendang Set",quantity:32,revenue:480},{name:"Penang CKT",quantity:29,revenue:435}],customerCount:856,staffPerformance:[{name:"Ahmad Rahman",orders:45,efficiency:92},{name:"Siti Nurhaliza",orders:38,efficiency:88},{name:"Raj Kumar",orders:42,efficiency:90},{name:"Li Wei",orders:35,efficiency:85},{name:"Maria Santos",orders:40,efficiency:87}],hourlyData:[{hour:"11AM",orders:25,revenue:680},{hour:"12PM",orders:45,revenue:1280},{hour:"1PM",orders:38,revenue:940},{hour:"2PM",orders:22,revenue:580},{hour:"3PM",orders:18,revenue:420},{hour:"4PM",orders:15,revenue:380},{hour:"5PM",orders:25,revenue:650},{hour:"6PM",orders:42,revenue:1120},{hour:"7PM",orders:35,revenue:890},{hour:"8PM",orders:20,revenue:520}],customerAnalysis:{newCustomers:284,returningCustomers:572,satisfaction:4.7,totalCustomers:856,vipCustomers:128,averageOrdersPerCustomer:4.2,customerRetentionRate:78.5}});(0,r.useEffect)(()=>{const e="all"===i?1:.33;L(t=>({...t,totalRevenue:Math.round(13130*e*(.8+.4*Math.random())),totalOrders:Math.round(222*e*(.8+.4*Math.random()))}))},[i,$.start,$.end]);return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(p,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(m,{children:(0,h.jsx)(g,{children:"all"===i?"Reports Dashboard":`${(null===(e=I.find(e=>e.id===i))||void 0===e?void 0:e.name)||"Restaurant"} Reports`})})}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(o.Qn,{children:[(0,h.jsx)(c.A,{activePeriod:E,dateRange:$,isCustomDateRange:B,onPeriodChange:e=>{D(e),R((0,c.x)(e)),z(!1)},onCalendarRangeSelect:(e,t)=>{z(!0),D("all"),R({start:e,end:t})}}),(0,h.jsxs)(o.Jt,{value:i,onChange:e=>S(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Restaurants"}),I.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,h.jsxs)(d.MD,{children:[(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:(0,x.vv)(P.totalRevenue,O)}),(0,h.jsx)(d.v0,{children:"Total Revenue"}),(0,h.jsx)(f,{trend:"up",children:"+18% vs yesterday"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.totalOrders}),(0,h.jsx)(d.v0,{children:"Total Orders"}),(0,h.jsx)(f,{trend:"up",children:"+12% vs yesterday"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:(0,x.vv)(P.averageOrderValue,O)}),(0,h.jsx)(d.v0,{children:"Average Order Value"}),(0,h.jsx)(f,{trend:"up",children:"+5.3% vs yesterday"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.customerCount}),(0,h.jsx)(d.v0,{children:"Customer Count"}),(0,h.jsx)(f,{trend:"up",children:"+24% vs yesterday"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:"all"===i?I.length:1}),(0,h.jsx)(d.v0,{children:"Active Restaurants"}),(0,h.jsx)(f,{children:"All operational"})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Order Analysis"}),(0,h.jsxs)(w,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Revenue Trend"}),(0,h.jsxs)(b,{children:["Revenue trend chart will be displayed here",(0,h.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Line chart showing revenue over time"})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Order Distribution"}),(0,h.jsxs)(b,{children:["\ud83c\udf70 Order distribution pie chart",(0,h.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Distribution by restaurant/category"})]})]})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Customer Analysis"}),(0,h.jsxs)(d.MD,{style:{marginBottom:"24px"},children:[(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.customerAnalysis.totalCustomers}),(0,h.jsx)(d.v0,{children:"Total Customers"}),(0,h.jsx)(f,{trend:"up",children:"Active across all restaurants"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.customerAnalysis.newCustomers}),(0,h.jsx)(d.v0,{children:"New Customers"}),(0,h.jsx)(f,{trend:"up",children:"+15% vs last period"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.customerAnalysis.vipCustomers}),(0,h.jsx)(d.v0,{children:"VIP Customers"}),(0,h.jsxs)(f,{trend:"up",children:[Math.round(P.customerAnalysis.vipCustomers/P.customerAnalysis.totalCustomers*100),"% of total"]})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsx)(d.Os,{children:P.customerAnalysis.averageOrdersPerCustomer}),(0,h.jsx)(d.v0,{children:"Avg Orders per Customer"}),(0,h.jsx)(f,{trend:"up",children:"+0.3 vs last period"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsxs)(d.Os,{children:[P.customerAnalysis.customerRetentionRate,"%"]}),(0,h.jsx)(d.v0,{children:"Customer Retention"}),(0,h.jsx)(f,{trend:"up",children:"+2.1% vs last period"})]}),(0,h.jsxs)(d.hI,{children:[(0,h.jsxs)(d.Os,{children:[P.customerAnalysis.satisfaction,"/5.0"]}),(0,h.jsx)(d.v0,{children:"Satisfaction Score"}),(0,h.jsx)(f,{trend:"up",children:"+0.2 vs last period"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Segmentation"}),(0,h.jsxs)(b,{children:["Customer tier distribution",(0,h.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bronze, Silver, Gold, VIP breakdown"})]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Growth"}),(0,h.jsxs)(b,{children:["Customer acquisition trend",(0,h.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"New vs returning customers over time"})]})]})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Popular Items"}),(0,h.jsxs)(F,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)(k,{children:"Rank"}),(0,h.jsx)(k,{children:"Item Name"}),(0,h.jsx)(k,{children:"Quantity Sold"}),(0,h.jsx)(k,{children:"Revenue"}),(0,h.jsx)(k,{children:"Performance"})]})}),(0,h.jsx)("tbody",{children:P.topItems.map((e,t)=>{var n;const r=(null===(n=P.topItems[0])||void 0===n?void 0:n.quantity)||1;return(0,h.jsxs)("tr",{children:[(0,h.jsxs)(A,{style:{fontWeight:"600"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,h.jsx)(A,{style:{fontWeight:"600"},children:e.name}),(0,h.jsx)(A,{children:e.quantity}),(0,h.jsx)(A,{children:(0,x.vv)(e.revenue,O)}),(0,h.jsx)(A,{children:(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(C,{percentage:e.quantity/r*100}),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.quantity/r*100),"%"]})]})})]},t)})})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Hourly Analysis"}),(0,h.jsx)("div",{style:{marginBottom:"20px"},children:(0,h.jsxs)(b,{style:{height:"250px"},children:["Hourly orders and revenue bar chart",(0,h.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bar chart showing orders and revenue by hour"})]})}),(0,h.jsxs)(F,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)(k,{children:"Time Slot"}),(0,h.jsx)(k,{children:"Orders"}),(0,h.jsx)(k,{children:"Revenue"}),(0,h.jsx)(k,{children:"Avg Order Value"})]})}),(0,h.jsx)("tbody",{children:P.hourlyData.map((e,t)=>(0,h.jsxs)("tr",{children:[(0,h.jsx)(A,{style:{fontWeight:"600"},children:e.hour}),(0,h.jsx)(A,{children:e.orders}),(0,h.jsx)(A,{children:(0,x.vv)(e.revenue,O)}),(0,h.jsx)(A,{children:(0,x.vv)(e.revenue/e.orders,O)})]},t))})]})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Staff Performance"}),(0,h.jsxs)(F,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)(k,{children:"Staff Name"}),(0,h.jsx)(k,{children:"Orders Handled"}),(0,h.jsx)(k,{children:"Efficiency"}),(0,h.jsx)(k,{children:"Performance"})]})}),(0,h.jsx)("tbody",{children:P.staffPerformance.map((e,t)=>(0,h.jsxs)("tr",{children:[(0,h.jsx)(A,{style:{fontWeight:"600"},children:e.name}),(0,h.jsx)(A,{children:e.orders}),(0,h.jsxs)(A,{children:[e.efficiency,"%"]}),(0,h.jsx)(A,{children:(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)(C,{percentage:e.efficiency}),(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),i=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(s.DL)),[o,d]=(0,r.useState)(!0),[l,x]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";n(r)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),x("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:l}}}}]);