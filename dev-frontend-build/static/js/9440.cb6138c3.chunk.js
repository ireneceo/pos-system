"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{512:(e,t,i)=>{i.d(t,{x:()=>E,A:()=>R});var n=i(9950),a=i(4752),r=i(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,i,n]=e.split("-").map(Number);return new Date(t,i-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,c=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,h=a.Ay.div`
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
`,g=a.Ay.div``,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,w=a.Ay.button`
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
`,y=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,v=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,j=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=a.Ay.div`
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
`,$=e=>{let{startDate:t,endDate:i,onRangeSelect:a,onClose:$,isOpen:C}=e;const E=new Date,[D,B]=(0,n.useState)(E.getMonth()),[z,_]=(0,n.useState)(E.getFullYear()),[T,R]=(0,n.useState)(null),[M,L]=(0,n.useState)(null),[Y,I]=(0,n.useState)(null),[P,W]=(0,n.useState)("start"),U=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&R(d(t)),i&&L(d(i))},[t,i]),(0,n.useEffect)(()=>{C&&W("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&$()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,$]);const N=(0,n.useCallback)(()=>{0===D?(B(11),_(e=>e-1)):B(e=>e-1)},[D]),H=(0,n.useCallback)(()=>{11===D?(B(0),_(e=>e+1)):B(e=>e+1)},[D]),O=(e,t)=>{const i=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let a=0;a<n;a++)d.push(null);for(let a=1;a<=i;a++)d.push(new Date(e,t,a));return(0,r.jsxs)(v,{children:[(0,r.jsx)(b,{children:p(e,t)}),(0,r.jsx)(F,{children:o.map(e=>(0,r.jsx)(j,{children:e},e))}),(0,r.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,r.jsx)(A,{},`e-${t}`);const{isStart:i,isEnd:n,isInRange:o,isHoverEnd:d}=(e=>{const t=T&&l(e,T),i=M&&l(e,M),n="end"===P&&Y?Y:M;let a=!1;if(T&&n){const[t,i]=T<=n?[T,n]:[n,T];a=((e,t,i)=>{const n=e.getTime();return n>t.getTime()&&n<i.getTime()})(e,t,i)}return{isStart:t,isEnd:i,isInRange:a,isHoverEnd:"end"===P&&Y&&l(e,Y)}})(e),p=l(e,E);return(0,r.jsx)(S,{$isStart:!!i,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!d,$isToday:p,onClick:()=>(e=>{if("start"===P)R(e),L(null),W("end");else{let t=T,i=e;i<t&&([t,i]=[i,t]),R(t),L(i),W("start"),a(s(t),s(i)),setTimeout($,200)}})(e),onMouseEnter:()=>I(e),onMouseLeave:()=>I(null),children:e.getDate()},e.getTime())})})]})},J=11===D?0:D+1,Q=11===D?z+1:z,Z=e=>{const t=new Date;let i;const n=t;switch(e){case"this_week":i=new Date(t),i.setDate(t.getDate()-t.getDay());break;case"this_month":i=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":i=new Date(t.getFullYear(),0,1);break;default:return}R(i),L(n),W("start"),a(s(i),s(n)),setTimeout($,150)};return C?(0,r.jsx)(x,{ref:U,children:(0,r.jsxs)(c,{children:[(0,r.jsxs)(h,{children:[(0,r.jsx)(u,{onClick:()=>Z("this_week"),children:"This Week"}),(0,r.jsx)(u,{onClick:()=>Z("this_month"),children:"This Month"}),(0,r.jsx)(u,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,r.jsxs)(g,{children:[(0,r.jsxs)(m,{children:[(0,r.jsx)(w,{onClick:N,"aria-label":"Previous month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,r.jsx)(w,{onClick:H,"aria-label":"Next month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,r.jsxs)(y,{children:[O(z,D),(0,r.jsx)(f,{children:O(Q,J)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,t)=>{const i=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[i,n,a]=t.split("-").map(Number);return new Date(i,n-1,a)}catch{return new Date}})(t);let n=new Date(i);const a=new Date(i);switch(e){case"today":break;case"week":n.setDate(i.getDate()-6);break;case"month":n.setDate(i.getDate()-29);break;case"year":n.setDate(i.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:C(n),end:C(a)}},D=a.Ay.div`
  margin-bottom: 24px;
`,B=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,z=a.Ay.button`
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
`,_=a.Ay.div`
  position: relative;
  display: inline-block;
`,T=a.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:i,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:s,includeToday:d=!1,children:l}=e;const[p,x]=(0,n.useState)(!1),c=d?["today","week","month","year","all"]:["week","month","year","all"],h={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,r.jsx)(D,{children:(0,r.jsxs)(B,{children:[c.map(e=>(0,r.jsx)(z,{active:t===e&&!a,onClick:()=>o(e),children:h[e]},e)),(0,r.jsxs)(_,{children:[(0,r.jsxs)(T,{active:a,onClick:()=>x(!p),children:[(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),i.start&&i.end?`${i.start} ~ ${i.end}`:"Custom Range"]}),(0,r.jsx)($,{isOpen:p,startDate:i.start,endDate:i.end,onRangeSelect:(e,t)=>{s(e,t),x(!1)},onClose:()=>x(!1)})]}),l]})})}},2488:(e,t,i)=>{i.d(t,{DO:()=>x,Jt:()=>c,Qn:()=>p});i(9950);var n=i(4752),a=i(4414);const r=n.Ay.div`
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
`,o=n.Ay.input`
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
`,s=n.Ay.div`
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
`,d=n.Ay.button`
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
`,l=n.Ay.select`
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
`,p=e=>{let{children:t,className:i,style:n,...o}=e;return(0,a.jsx)(r,{className:i,style:n,...o,children:t})},x=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:r,...l}=e;return(0,a.jsxs)(s,{style:r,children:[(0,a.jsx)(o,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,a.jsx)(d,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},c=e=>{let{children:t,...i}=e;return(0,a.jsx)(l,{...i,children:t})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>k});var n=i(9950),a=i(4752),r=i(2853),o=i(3832),s=i(4728),d=i(2488),l=i(512),p=i(1367),x=i(4414);const c=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,h=a.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,u=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,g=a.Ay.div`
  flex: 1;
`,m=a.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,w=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,y=a.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,f=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,v=(0,a.Ay)(s.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,b=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,F=a.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,j=a.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,k=()=>{const{user:e}=(0,p.As)(),[t,i]=(0,n.useState)([]),[a,k]=(0,n.useState)(!0),[A,S]=(0,n.useState)(1),[$,C]=(0,n.useState)(1),[E,D]=(0,n.useState)(0),[B,z]=(0,n.useState)(""),[_,T]=(0,n.useState)(""),[R,M]=(0,n.useState)(""),[L,Y]=(0,n.useState)("all"),[I,P]=(0,n.useState)(()=>(0,l.x)("all")),[W,U]=(0,n.useState)(!1);(0,n.useEffect)(()=>{N()},[A,B,_,R,I.start,I.end]);const N=async()=>{const t=e,n=(null===t||void 0===t?void 0:t.restaurantId)||(null===t||void 0===t?void 0:t.restaurant_id),a=null===t||void 0===t?void 0:t.id;if(n||a){k(!0);try{const e=new URLSearchParams({page:A.toString(),limit:50..toString()});B&&e.append("entity_type",B),_&&e.append("action_type",_),R&&e.append("user_id",R),I.start&&e.append("start_date",I.start),I.end&&e.append("end_date",I.end);const t=localStorage.getItem("auth_token"),s=n?`/api/activity-logs/restaurant/${n}`:`/api/activity-logs/user/${a}`,d=await fetch(`${s}?${e}`,{headers:{...t?{Authorization:`Bearer ${t}`}:{}}});if(d.ok){var r,o;const e=await d.json(),t=e.data||e;i(t.logs||[]),C((null===(r=t.pagination)||void 0===r?void 0:r.totalPages)||t.totalPages||1),D((null===(o=t.pagination)||void 0===o?void 0:o.total)||t.totalLogs||0)}else console.error("Failed to fetch activity logs"),i([])}catch(s){console.error("Error fetching activity logs:",s),i([])}finally{k(!1)}}},H=e=>{const t=new Date(e),i=new Date,n=Math.floor((i.getTime()-t.getTime())/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)} minutes ago`:n<86400?`${Math.floor(n/3600)} hours ago`:n<604800?`${Math.floor(n/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},O=e=>{switch(e){case"menu_item":case"category":case"table":default:return"info";case"settings":case"invoice":return"warning";case"staff":case"promotion":return"success";case"order_item":return"error"}},J=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},Q=e=>e.charAt(0).toUpperCase()+e.slice(1),Z=B||_||R||"all"!==L||W;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(o.Y9,{children:(0,x.jsx)(o.hE,{children:"Activity History"})}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(l.A,{activePeriod:L,dateRange:I,isCustomDateRange:W,onPeriodChange:e=>{Y(e),P((0,l.x)(e)),U(!1),S(1)},onCalendarRangeSelect:(e,t)=>{P({start:e,end:t}),U(!0),S(1)},children:[(0,x.jsxs)(d.Jt,{value:B,onChange:e=>{z(e.target.value),S(1)},children:[(0,x.jsx)("option",{value:"",children:"All Types"}),(0,x.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,x.jsx)("option",{value:"category",children:"Category"}),(0,x.jsx)("option",{value:"settings",children:"Settings"}),(0,x.jsx)("option",{value:"staff",children:"Staff"}),(0,x.jsx)("option",{value:"invoice",children:"Invoice"}),(0,x.jsx)("option",{value:"subscription",children:"Subscription"}),(0,x.jsx)("option",{value:"table",children:"Table"}),(0,x.jsx)("option",{value:"promotion",children:"Promotion"}),(0,x.jsx)("option",{value:"order_item",children:"Order Item"})]}),(0,x.jsxs)(d.Jt,{value:_,onChange:e=>{T(e.target.value),S(1)},children:[(0,x.jsx)("option",{value:"",children:"All Actions"}),(0,x.jsx)("option",{value:"create",children:"Create"}),(0,x.jsx)("option",{value:"update",children:"Update"}),(0,x.jsx)("option",{value:"delete",children:"Delete"})]}),Z&&(0,x.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>{z(""),T(""),M(""),Y("all"),P((0,l.x)("all")),U(!1),S(1)},children:"Reset Filters"})]}),a?(0,x.jsx)(j,{children:"Loading activity logs..."}):0===t.length?(0,x.jsx)(c,{children:(0,x.jsx)(r.pp,{children:"No activity logs found"})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c,{children:t.map(e=>{return(0,x.jsx)(h,{children:(0,x.jsxs)(u,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(m,{children:H(e.created_at)}),(0,x.jsx)(w,{children:e.full_name||e.username}),(0,x.jsx)(y,{children:e.description})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{status:O(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,x.jsx)(v,{status:J(e.action_type),children:Q(e.action_type)})]})]})},e.id);var t})}),(0,x.jsxs)(b,{children:[(0,x.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>S(e=>Math.max(1,e-1)),disabled:1===A,children:"Previous"}),(0,x.jsxs)(F,{children:["Page ",A," of ",$," (",E," total logs)"]}),(0,x.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>S(e=>Math.min($,e+1)),disabled:A===$,children:"Next"})]})]})]})]})})}}}]);