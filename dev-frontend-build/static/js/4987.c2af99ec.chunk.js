"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4987],{512:(e,t,r)=>{r.d(t,{x:()=>D,A:()=>R});var n=r(9950),a=r(4752),s=r(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,h=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,p=a.Ay.div`
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
`,f=a.Ay.button`
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
`,j=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,y=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,F=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=a.Ay.div`
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
`,$=e=>{let{startDate:t,endDate:r,onRangeSelect:a,onClose:$,isOpen:C}=e;const D=new Date,[E,B]=(0,n.useState)(D.getMonth()),[O,T]=(0,n.useState)(D.getFullYear()),[M,R]=(0,n.useState)(null),[z,I]=(0,n.useState)(null),[_,L]=(0,n.useState)(null),[P,Y]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&R(d(t)),r&&I(d(r))},[t,r]),(0,n.useEffect)(()=>{C&&Y("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&$()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,$]);const H=(0,n.useCallback)(()=>{0===E?(B(11),T(e=>e-1)):B(e=>e-1)},[E]),q=(0,n.useCallback)(()=>{11===E?(B(0),T(e=>e+1)):B(e=>e+1)},[E]),W=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let a=0;a<n;a++)d.push(null);for(let a=1;a<=r;a++)d.push(new Date(e,t,a));return(0,s.jsxs)(y,{children:[(0,s.jsx)(w,{children:c(e,t)}),(0,s.jsx)(b,{children:o.map(e=>(0,s.jsx)(F,{children:e},e))}),(0,s.jsx)(A,{children:d.map((e,t)=>{if(!e)return(0,s.jsx)(k,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:o,isHoverEnd:d}=(e=>{const t=M&&l(e,M),r=z&&l(e,z),n="end"===P&&_?_:z;let a=!1;if(M&&n){const[t,r]=M<=n?[M,n]:[n,M];a=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:a,isHoverEnd:"end"===P&&_&&l(e,_)}})(e),c=l(e,D);return(0,s.jsx)(S,{$isStart:!!r,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===P)R(e),I(null),Y("end");else{let t=M,r=e;r<t&&([t,r]=[r,t]),R(t),I(r),Y("start"),a(i(t),i(r)),setTimeout($,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},G=11===E?0:E+1,U=11===E?O+1:O,V=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}R(r),I(n),Y("start"),a(i(r),i(n)),setTimeout($,150)};return C?(0,s.jsx)(x,{ref:N,children:(0,s.jsxs)(h,{children:[(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{onClick:()=>V("this_week"),children:"This Week"}),(0,s.jsx)(u,{onClick:()=>V("this_month"),children:"This Month"}),(0,s.jsx)(u,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(m,{children:[(0,s.jsx)(f,{onClick:H,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(f,{onClick:q,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(v,{children:[W(O,E),(0,s.jsx)(j,{children:W(U,G)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,a]=t.split("-").map(Number);return new Date(r,n-1,a)}catch{return new Date}})(t);let n=new Date(r);const a=new Date(r);switch(e){case"today":break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:C(n),end:C(a)}},E=a.Ay.div`
  margin-bottom: 24px;
`,B=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,O=a.Ay.button`
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
`,T=a.Ay.div`
  position: relative;
  display: inline-block;
`,M=a.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:i,includeToday:d=!1,children:l}=e;const[c,x]=(0,n.useState)(!1),h=d?["today","week","month","year","all"]:["week","month","year","all"],p={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(E,{children:(0,s.jsxs)(B,{children:[h.map(e=>(0,s.jsx)(O,{active:t===e&&!a,onClick:()=>o(e),children:p[e]},e)),(0,s.jsxs)(T,{children:[(0,s.jsxs)(M,{active:a,onClick:()=>x(!c),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)($,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{i(e,t),x(!1)},onClose:()=>x(!1)})]}),l]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>o});var n=r(9950),a=r(1367),s=r(6038);const o=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[o]=(0,n.useState)(Object.keys(s.DL)),[i,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";r(n)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:i,error:l}}},4987:(e,t,r)=>{r.r(t),r.d(t,{default:()=>_});var n=r(9950),a=r(4752),s=r(2853),o=r(8409),i=r(512),d=r(4021),l=r(6038),c=r(4414);const x=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,h=a.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,p=a.Ay.input`
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
`,u=a.Ay.div`
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
`,g=a.Ay.div`
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
`,m=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 13px;
`,f=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,v=a.Ay.button`
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
`,j=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,w=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,b=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,F=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,A=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,k=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`,S=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,C=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,D=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,E=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,B=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,O=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,T=a.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${e=>1===e.rank?"#FFD700":2===e.rank?"#C0C0C0":3===e.rank?"#CD7F32":"#E5E7EB"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
`,M=a.Ay.div`
  flex: 1;
  min-width: 0;
`,R=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,I=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,_=()=>{const[e,t]=(0,n.useState)("month"),[r,a]=(0,n.useState)(()=>(0,i.x)("month")),[_,L]=(0,n.useState)(!1),[P,Y]=(0,n.useState)("all"),[N,H]=(0,n.useState)("all"),[q,W]=(0,n.useState)("sales"),[G,U]=(0,n.useState)(""),[V,Z]=(0,n.useState)(""),[J,K]=(0,n.useState)(!1),[Q,X]=(0,n.useState)(!1),[ee,te]=(0,n.useState)([]),[re,ne]=(0,n.useState)([]),{defaultCurrency:ae}=(0,d.i1)(),[se,oe]=(0,n.useState)("RM");(0,n.useEffect)(()=>{ae&&oe(ae)},[ae]);const[ie,de]=(0,n.useState)([]),[le,ce]=(0,n.useState)([]),[xe,he]=(0,n.useState)([]),[pe,ue]=(0,n.useState)(!0);(0,n.useEffect)(()=>{ge()},[]),(0,n.useEffect)(()=>{le.length>0&&me()},[le,r.start,r.end]);const ge=async()=>{try{ue(!0);const e=localStorage.getItem("auth_token"),[t,r]=await Promise.all([fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}})]);let n=[];t.ok&&(n=await t.json(),de(n));const a=new Map;if(n.forEach(e=>{a.set(e.id,e)}),r.ok){const e=(await r.json()).map(e=>{const t=e.brand_id?a.get(e.brand_id):null;return{id:e.id,name:e.name,brandId:e.brand_id||0,brandName:(null===t||void 0===t?void 0:t.name)||"No Brand",brandCode:(null===t||void 0===t?void 0:t.code)||"-",currency:(null===t||void 0===t?void 0:t.currency)||e.currency||"RM"}});ce(e),0===e.length&&ue(!1)}else ue(!1)}catch(e){console.error("Error fetching data:",e),ue(!1)}},me=async()=>{try{ue(!0);const e=localStorage.getItem("auth_token");if(0===le.length)return he([]),void ue(!1);const t=le.map(async t=>{try{const n=await fetch(`/api/orders?restaurant_id=${t.id}&start_date=${r.start}&end_date=${r.end}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();console.log(`[Performance] Restaurant ${t.id} (${t.name}) orders response:`,e);let r=[];return Array.isArray(e)?r=e:e.data&&Array.isArray(e.data)?r=e.data:e.orders&&Array.isArray(e.orders)&&(r=e.orders),console.log(`[Performance] Restaurant ${t.id} parsed orders:`,r.length,"orders"),r}return[]}catch(n){return console.error(`[Performance] Error fetching orders for restaurant ${t.id}:`,n),[]}}),n=(await Promise.all(t)).flat();console.log("[Performance] Total orders fetched:",n.length),console.log("[Performance] Sample orders:",n.slice(0,3)),he(n)}catch(e){console.error("Error fetching orders:",e)}finally{ue(!1)}},fe=(0,n.useMemo)(()=>{const e=new Date(r.start),t=new Date(r.end),n=Math.ceil((t.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-n);const o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:o(s),end:o(a)}},[r.start,r.end]),ve=(0,n.useMemo)(()=>{if(0===le.length)return[];const e=new Date(r.start);e.setHours(0,0,0,0);const t=new Date(r.end);t.setHours(23,59,59,999);const n=new Date(fe.start);n.setHours(0,0,0,0);const a=new Date(fe.end);return a.setHours(23,59,59,999),le.map(r=>{const s=xe.filter(e=>Number(e.restaurant_id)===Number(r.id));console.log(`[Performance] Restaurant ${r.id} (${r.name}):`,{totalOrdersInState:xe.length,restaurantOrders:s.length,sampleOrder:s[0]});const o=s.filter(r=>{const n=new Date(r.order_date||r.createdAt);return n>=e&&n<=t});console.log(`[Performance] Restaurant ${r.id} date filter:`,{startDate:e.toISOString(),endDate:t.toISOString(),currentPeriodOrders:o.length});const i=s.filter(e=>{const t=new Date(e.order_date||e.createdAt);return t>=n&&t<=a}),d=o.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status);console.log(`[Performance] Restaurant ${r.id} completed:`,{completedOrders:d.length,statuses:o.map(e=>e.status).filter((e,t,r)=>r.indexOf(e)===t)});const c=d.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),x=l.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),h=x>0?(c-x)/x*100:c>0?100:0,p=d.length>0?c/d.length:0,u=d.reduce((e,t)=>{const r=parseFloat(t.total_amount||"0");return r>e?r:e},0),g=new Set(o.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.served_at&&e.createdAt),f=m.length>0?m.reduce((e,t)=>{const r=new Date(t.createdAt).getTime(),n=(new Date(t.served_at).getTime()-r)/6e4;return e+(n>0?n:0)},0)/m.length:0;return{id:r.id,name:r.name,brandId:r.brandId,brandName:r.brandName,brandCode:r.brandCode,currency:r.currency,totalOrders:o.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*x)/100,growth:Math.round(10*h)/10,avgOrder:Math.round(100*p)/100,maxOrder:Math.round(100*u)/100,uniqueCustomers:g,avgServiceTime:Math.round(f)}})},[le,xe,r.start,r.end,fe]),je=(0,n.useMemo)(()=>{let e=ve;return"all"!==P&&(e=e.filter(e=>e.brandId.toString()===P)),"all"!==N&&(e=e.filter(e=>e.id.toString()===N)),e},[ve,P,N]),ye=(0,n.useMemo)(()=>[...je].sort((e,t)=>{switch(q){case"sales":default:return t.sales-e.sales;case"growth":return t.growth-e.growth;case"orders":return t.completedOrders-e.completedOrders;case"customers":return t.uniqueCustomers-e.uniqueCustomers}}),[je,q]),we=(0,n.useMemo)(()=>{const e=je.reduce((e,t)=>e+t.sales,0),t=je.length,r=je.reduce((e,t)=>e+t.completedOrders,0),n=je.reduce((e,t)=>e+t.previousSales,0),a=je.reduce((e,t)=>e+t.uniqueCustomers,0),s=Math.max(...je.map(e=>e.maxOrder),0),o=r>0?e/r:0,i=je.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,t)=>e+t.avgServiceTime,0)/i.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:t,totalOrders:r,totalCustomers:a,maxOrderValue:s,overallAvgOrder:Math.round(100*o)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[je]),be=(e,t)=>{const r=t||se;return(0,l.vv)(e,r)},Fe=_?`${r.start} ~ ${r.end}`:{today:"Today",week:"This Week",month:"This Month",year:"This Year",all:"All Time"}[e]||e;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(o.mc,{children:[(0,c.jsxs)(o.Y9,{children:[(0,c.jsx)("div",{children:(0,c.jsx)(o.hE,{children:"Performance"})}),(0,c.jsx)(o.ex,{children:(0,c.jsx)(o.$n,{variant:"primary",children:"Export Report"})})]}),(0,c.jsxs)(o.UC,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(p,{type:"text",placeholder:"All Brands",value:G,onChange:e=>{return t=e.target.value,U(t),void(0===t.length?te(ie.slice(0,10)):te(ie.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())).slice(0,10)));var t},onFocus:()=>{K(!0),0===G.length&&te(ie.slice(0,10))},onBlur:()=>setTimeout(()=>K(!1),200)}),"all"!==P&&G&&(0,c.jsx)(v,{onClick:()=>{Y("all"),U(""),H("all"),Z("")},children:"\xd7"}),(0,c.jsxs)(u,{show:J,children:[(0,c.jsxs)(g,{onClick:()=>{Y("all"),U(""),K(!1),H("all"),Z("")},children:[(0,c.jsx)(m,{children:"All Brands"}),(0,c.jsx)(f,{children:"Show all brand data"})]}),ee.map(e=>(0,c.jsxs)(g,{onClick:()=>(e=>{Y(e.id.toString()),U(e.name),K(!1),H("all"),Z("")})(e),children:[(0,c.jsx)(m,{children:e.name}),(0,c.jsxs)(f,{children:[e.code," ",e.currency?`\u2022 ${e.currency}`:""]})]},e.id))]})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(p,{type:"text",placeholder:"All Restaurants",value:V,onChange:e=>(e=>{Z(e);let t=le;"all"!==P&&(t=le.filter(e=>e.brandId.toString()===P)),0===e.length?ne(t.slice(0,10)):ne(t.filter(t=>t.name.toLowerCase().includes(e.toLowerCase())).slice(0,10))})(e.target.value),onFocus:()=>{X(!0);let e=le;"all"!==P&&(e=le.filter(e=>e.brandId.toString()===P)),ne(e.slice(0,10))},onBlur:()=>setTimeout(()=>X(!1),200)}),"all"!==N&&V&&(0,c.jsx)(v,{onClick:()=>{H("all"),Z("")},children:"\xd7"}),(0,c.jsxs)(u,{show:Q,children:[(0,c.jsxs)(g,{onClick:()=>{H("all"),Z(""),X(!1)},children:[(0,c.jsx)(m,{children:"All Restaurants"}),(0,c.jsx)(f,{children:"Show all restaurant data"})]}),re.map(e=>(0,c.jsxs)(g,{onClick:()=>(e=>{H(e.id.toString()),Z(e.name),X(!1)})(e),children:[(0,c.jsx)(m,{children:e.name}),(0,c.jsx)(f,{children:e.brandName||"Independent"})]},e.id))]})]})]}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap",marginBottom:"8px"},children:[(0,c.jsx)("div",{style:{flex:1},children:(0,c.jsx)(i.A,{activePeriod:e,dateRange:r,isCustomDateRange:_,onPeriodChange:e=>{t(e),L(!1),a((0,i.x)(e))},onCalendarRangeSelect:(e,r)=>{L(!0),t("all"),a({start:e,end:r})}})}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexShrink:0},children:[(0,c.jsx)(y,{children:"Sort by:"}),(0,c.jsxs)(j,{value:q,onChange:e=>W(e.target.value),children:[(0,c.jsx)("option",{value:"sales",children:"Revenue"}),(0,c.jsx)("option",{value:"growth",children:"Growth"}),(0,c.jsx)("option",{value:"orders",children:"Orders"}),(0,c.jsx)("option",{value:"customers",children:"Customers"})]})]})]}),(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#635BFF",children:[(0,c.jsx)(o.Os,{children:be(we.totalSales)}),(0,c.jsx)(o.v0,{children:"Total Revenue"}),(0,c.jsx)(o.d1,{children:Fe})]}),(0,c.jsxs)(o.hI,{color:"#10B981",children:[(0,c.jsx)(o.Os,{children:we.totalOrders.toLocaleString()}),(0,c.jsx)(o.v0,{children:"Total Orders"}),(0,c.jsx)(o.d1,{children:"Completed orders"})]}),(0,c.jsxs)(o.hI,{color:"#F59E0B",children:[(0,c.jsx)(o.Os,{children:we.totalCustomers.toLocaleString()}),(0,c.jsx)(o.v0,{children:"Customers"}),(0,c.jsx)(o.d1,{children:"Unique customers"})]}),(0,c.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,c.jsx)(o.Os,{children:be(we.overallAvgOrder)}),(0,c.jsx)(o.v0,{children:"Avg Order"}),(0,c.jsx)(o.d1,{children:"Per order value"})]})]}),(0,c.jsxs)(o.MD,{style:{marginTop:"-16px"},children:[(0,c.jsxs)(o.hI,{color:"#EC4899",children:[(0,c.jsx)(o.Os,{children:be(we.maxOrderValue)}),(0,c.jsx)(o.v0,{children:"Max Order"}),(0,c.jsx)(o.d1,{children:"Highest order value"})]}),(0,c.jsxs)(o.hI,{color:"#06B6D4",children:[(0,c.jsx)(o.Os,{children:we.overallAvgServiceTime>0?`${we.overallAvgServiceTime} min`:"N/A"}),(0,c.jsx)(o.v0,{children:"Avg Fulfillment Time"}),(0,c.jsx)(o.d1,{children:"Order to served"})]}),(0,c.jsxs)(o.hI,{color:"#F97316",children:[(0,c.jsxs)(o.Os,{children:[we.overallGrowth>0?"+":"",we.overallGrowth,"%"]}),(0,c.jsx)(o.v0,{children:"Growth"}),(0,c.jsx)(o.d1,{children:"vs previous period"})]}),(0,c.jsxs)(o.hI,{color:"#14B8A6",children:[(0,c.jsx)(o.Os,{children:we.totalRestaurants}),(0,c.jsx)(o.v0,{children:"Restaurants"}),(0,c.jsx)(o.d1,{children:"all"===P?"All brands":"Selected brand"})]})]}),pe?(0,c.jsx)(s.pp,{children:(0,c.jsx)("p",{children:"Loading performance data..."})}):0===ye.length?(0,c.jsxs)(s.pp,{children:[(0,c.jsx)("h3",{children:"No Data Available"}),(0,c.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(w,{children:ye.map(e=>(0,c.jsxs)(b,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:e.name}),(0,c.jsx)(k,{children:e.brandCode})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Revenue"}),(0,c.jsxs)(C,{children:[be(e.sales,e.currency),0!==e.growth&&(0,c.jsxs)(D,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Orders"}),(0,c.jsxs)(C,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Customers"}),(0,c.jsxs)(C,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Avg Order"}),(0,c.jsx)(C,{children:e.avgOrder>0?be(e.avgOrder,e.currency):"N/A"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Max Order"}),(0,c.jsx)(C,{children:e.maxOrder>0?be(e.maxOrder,e.currency):"N/A"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)($,{children:"Avg Fulfillment"}),(0,c.jsx)(C,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,c.jsxs)(E,{children:[(0,c.jsxs)(B,{children:["Restaurant Ranking (",Fe,")"]}),ye.slice(0,10).map((e,t)=>(0,c.jsxs)(O,{children:[(0,c.jsx)(T,{rank:t+1,children:t+1}),(0,c.jsxs)(M,{children:[(0,c.jsx)(R,{children:e.name}),(0,c.jsxs)(z,{children:[(0,c.jsxs)(I,{children:["Revenue: ",be(e.sales,e.currency)]}),(0,c.jsxs)(I,{children:["Orders: ",e.completedOrders]}),(0,c.jsxs)(I,{children:["Customers: ",e.uniqueCustomers]}),(0,c.jsxs)(I,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);