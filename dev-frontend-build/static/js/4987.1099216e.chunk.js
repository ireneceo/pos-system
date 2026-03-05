"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4987],{512:(e,t,r)=>{r.d(t,{x:()=>D,A:()=>T});var n=r(9950),a=r(4752),s=r(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=a.Ay.div`
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
`,x=a.Ay.div`
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
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,b=a.Ay.div`
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
`,$=e=>{let{startDate:t,endDate:r,onRangeSelect:a,onClose:$,isOpen:E}=e;const D=new Date,[C,O]=(0,n.useState)(D.getMonth()),[B,M]=(0,n.useState)(D.getFullYear()),[R,T]=(0,n.useState)(null),[_,z]=(0,n.useState)(null),[I,P]=(0,n.useState)(null),[L,Y]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&T(d(t)),r&&z(d(r))},[t,r]),(0,n.useEffect)(()=>{E&&Y("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&$()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,$]);const H=(0,n.useCallback)(()=>{0===C?(O(11),M(e=>e-1)):O(e=>e-1)},[C]),q=(0,n.useCallback)(()=>{11===C?(O(0),M(e=>e+1)):O(e=>e+1)},[C]),W=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let a=0;a<n;a++)d.push(null);for(let a=1;a<=r;a++)d.push(new Date(e,t,a));return(0,s.jsxs)(y,{children:[(0,s.jsx)(w,{children:c(e,t)}),(0,s.jsx)(F,{children:i.map(e=>(0,s.jsx)(b,{children:e},e))}),(0,s.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,s.jsx)(A,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:i,isHoverEnd:d}=(e=>{const t=R&&l(e,R),r=_&&l(e,_),n="end"===L&&I?I:_;let a=!1;if(R&&n){const[t,r]=R<=n?[R,n]:[n,R];a=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:a,isHoverEnd:"end"===L&&I&&l(e,I)}})(e),c=l(e,D);return(0,s.jsx)(S,{$isStart:!!r,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===L)T(e),z(null),Y("end");else{let t=R,r=e;r<t&&([t,r]=[r,t]),T(t),z(r),Y("start"),a(o(t),o(r)),setTimeout($,200)}})(e),onMouseEnter:()=>P(e),onMouseLeave:()=>P(null),children:e.getDate()},e.getTime())})})]})},G=11===C?0:C+1,U=11===C?B+1:B,V=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}T(r),z(n),Y("start"),a(o(r),o(n)),setTimeout($,150)};return E?(0,s.jsx)(h,{ref:N,children:(0,s.jsxs)(x,{children:[(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{onClick:()=>V("this_week"),children:"This Week"}),(0,s.jsx)(u,{onClick:()=>V("this_month"),children:"This Month"}),(0,s.jsx)(u,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(m,{children:[(0,s.jsx)(f,{onClick:H,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(f,{onClick:q,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(v,{children:[W(B,C),(0,s.jsx)(j,{children:W(U,G)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=e=>{const t=new Date;let r=new Date;const n=new Date;switch(e){case"today":break;case"week":r.setDate(t.getDate()-6);break;case"month":r.setDate(t.getDate()-29);break;case"year":r.setDate(t.getDate()-364);break;case"all":r=new Date(2020,0,1)}return{start:E(r),end:E(n)}},C=a.Ay.div`
  margin-bottom: 24px;
`,O=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,B=a.Ay.button`
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
`,R=a.Ay.button`
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
`,T=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:a,onPeriodChange:i,onCalendarRangeSelect:o,includeToday:d=!1,children:l}=e;const[c,h]=(0,n.useState)(!1),x=d?["today","week","month","year","all"]:["week","month","year","all"],p={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(C,{children:(0,s.jsxs)(O,{children:[x.map(e=>(0,s.jsx)(B,{active:t===e&&!a,onClick:()=>i(e),children:p[e]},e)),(0,s.jsxs)(M,{children:[(0,s.jsxs)(R,{active:a,onClick:()=>h(!c),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),a&&r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)($,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{o(e,t),h(!1)},onClose:()=>h(!1)})]}),l]})})}},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var n=r(9950),a=r(1367),s=r(6038);const i=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[i]=(0,n.useState)(Object.keys(s.DL)),[o,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";r(n)}else r("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),c("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:o,error:l}}},4987:(e,t,r)=>{r.r(t),r.d(t,{default:()=>O});var n=r(9950),a=r(4752),s=r(2853),i=r(8409),o=r(512),d=r(4021),l=r(6038),c=r(4414);const h=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,x=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
  }
`,p=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,u=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,f=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,v=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`,j=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,y=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,w=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,b=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,k=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,A=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,S=a.Ay.div`
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
`,$=a.Ay.div`
  flex: 1;
  min-width: 0;
`,E=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,C=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,O=()=>{const[e,t]=(0,n.useState)("month"),[r,a]=(0,n.useState)(()=>(0,o.x)("month")),[O,B]=(0,n.useState)(!1),[M,R]=(0,n.useState)("all"),[T,_]=(0,n.useState)("sales"),{defaultCurrency:z}=(0,d.i1)(),[I,P]=(0,n.useState)("RM");(0,n.useEffect)(()=>{z&&P(z)},[z]);const[L,Y]=(0,n.useState)([]),[N,H]=(0,n.useState)([]),[q,W]=(0,n.useState)([]),[G,U]=(0,n.useState)(!0);(0,n.useEffect)(()=>{V()},[]),(0,n.useEffect)(()=>{N.length>0&&J()},[N,r.start,r.end]);const V=async()=>{try{U(!0);const e=localStorage.getItem("auth_token"),[t,r]=await Promise.all([fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}})]);let n=[];t.ok&&(n=await t.json(),Y(n));const a=new Map;if(n.forEach(e=>{a.set(e.id,e)}),r.ok){const e=(await r.json()).map(e=>{const t=e.brand_id?a.get(e.brand_id):null;return{id:e.id,name:e.name,brandId:e.brand_id||0,brandName:(null===t||void 0===t?void 0:t.name)||"No Brand",brandCode:(null===t||void 0===t?void 0:t.code)||"-",currency:(null===t||void 0===t?void 0:t.currency)||e.currency||"RM"}});H(e),0===e.length&&U(!1)}else U(!1)}catch(e){console.error("Error fetching data:",e),U(!1)}},J=async()=>{try{U(!0);const e=localStorage.getItem("auth_token");if(0===N.length)return W([]),void U(!1);const t=N.map(async t=>{try{const n=await fetch(`/api/orders?restaurant_id=${t.id}&start_date=${r.start}&end_date=${r.end}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();console.log(`[Performance] Restaurant ${t.id} (${t.name}) orders response:`,e);let r=[];return Array.isArray(e)?r=e:e.data&&Array.isArray(e.data)?r=e.data:e.orders&&Array.isArray(e.orders)&&(r=e.orders),console.log(`[Performance] Restaurant ${t.id} parsed orders:`,r.length,"orders"),r}return[]}catch(n){return console.error(`[Performance] Error fetching orders for restaurant ${t.id}:`,n),[]}}),n=(await Promise.all(t)).flat();console.log("[Performance] Total orders fetched:",n.length),console.log("[Performance] Sample orders:",n.slice(0,3)),W(n)}catch(e){console.error("Error fetching orders:",e)}finally{U(!1)}},K=(0,n.useMemo)(()=>{const e=new Date(r.start),t=new Date(r.end),n=Math.ceil((t.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-n);const i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(s),end:i(a)}},[r.start,r.end]),Q=(0,n.useMemo)(()=>{if(0===N.length)return[];const e=new Date(r.start);e.setHours(0,0,0,0);const t=new Date(r.end);t.setHours(23,59,59,999);const n=new Date(K.start);n.setHours(0,0,0,0);const a=new Date(K.end);return a.setHours(23,59,59,999),N.map(r=>{const s=q.filter(e=>Number(e.restaurant_id)===Number(r.id));console.log(`[Performance] Restaurant ${r.id} (${r.name}):`,{totalOrdersInState:q.length,restaurantOrders:s.length,sampleOrder:s[0]});const i=s.filter(r=>{const n=new Date(r.order_date||r.createdAt);return n>=e&&n<=t});console.log(`[Performance] Restaurant ${r.id} date filter:`,{startDate:e.toISOString(),endDate:t.toISOString(),currentPeriodOrders:i.length});const o=s.filter(e=>{const t=new Date(e.order_date||e.createdAt);return t>=n&&t<=a}),d=i.filter(e=>"completed"===e.status),l=o.filter(e=>"completed"===e.status);console.log(`[Performance] Restaurant ${r.id} completed:`,{completedOrders:d.length,statuses:i.map(e=>e.status).filter((e,t,r)=>r.indexOf(e)===t)});const c=d.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),h=l.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),x=h>0?(c-h)/h*100:c>0?100:0,p=d.length>0?c/d.length:0,u=d.reduce((e,t)=>{const r=parseFloat(t.total_amount||"0");return r>e?r:e},0),g=new Set(i.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.preparation_time&&e.preparation_time>0),f=m.length>0?m.reduce((e,t)=>e+(t.preparation_time||0),0)/m.length:0;return{id:r.id,name:r.name,brandId:r.brandId,brandName:r.brandName,brandCode:r.brandCode,currency:r.currency,totalOrders:i.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*h)/100,growth:Math.round(10*x)/10,avgOrder:Math.round(100*p)/100,maxOrder:Math.round(100*u)/100,uniqueCustomers:g,avgServiceTime:Math.round(f)}})},[N,q,r.start,r.end,K]),X=(0,n.useMemo)(()=>"all"===M?Q:Q.filter(e=>e.brandId.toString()===M),[Q,M]),Z=(0,n.useMemo)(()=>[...X].sort((e,t)=>{switch(T){case"sales":default:return t.sales-e.sales;case"growth":return t.growth-e.growth;case"orders":return t.completedOrders-e.completedOrders;case"customers":return t.uniqueCustomers-e.uniqueCustomers}}),[X,T]),ee=(0,n.useMemo)(()=>{const e=X.reduce((e,t)=>e+t.sales,0),t=X.length,r=X.reduce((e,t)=>e+t.completedOrders,0),n=X.reduce((e,t)=>e+t.previousSales,0),a=X.reduce((e,t)=>e+t.uniqueCustomers,0),s=Math.max(...X.map(e=>e.maxOrder),0),i=r>0?e/r:0,o=X.filter(e=>e.avgServiceTime>0),d=o.length>0?o.reduce((e,t)=>e+t.avgServiceTime,0)/o.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:t,totalOrders:r,totalCustomers:a,maxOrderValue:s,overallAvgOrder:Math.round(100*i)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[X]),te=(e,t)=>{const r=t||I;return(0,l.vv)(e,r)},re=O?`${r.start} ~ ${r.end}`:{today:"Today",week:"This Week",month:"This Month",year:"This Year",all:"All Time"}[e]||e;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(i.mc,{children:[(0,c.jsxs)(i.Y9,{children:[(0,c.jsx)("div",{children:(0,c.jsx)(i.hE,{children:"Performance"})}),(0,c.jsx)(i.ex,{children:(0,c.jsx)(i.$n,{variant:"primary",children:"Export Report"})})]}),(0,c.jsxs)(i.UC,{children:[(0,c.jsx)(o.A,{activePeriod:e,dateRange:r,isCustomDateRange:O,onPeriodChange:e=>{t(e),B(!1),a((0,o.x)(e))},onCalendarRangeSelect:(e,r)=>{B(!0),t("all"),a({start:e,end:r})}}),(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Brand:"}),(0,c.jsxs)(p,{value:M,onChange:e=>R(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Brands"}),L.map(e=>(0,c.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]}),(0,c.jsx)(h,{style:{marginLeft:"16px"},children:"Sort by:"}),(0,c.jsxs)(p,{value:T,onChange:e=>_(e.target.value),children:[(0,c.jsx)("option",{value:"sales",children:"Revenue"}),(0,c.jsx)("option",{value:"growth",children:"Growth"}),(0,c.jsx)("option",{value:"orders",children:"Orders"}),(0,c.jsx)("option",{value:"customers",children:"Customers"})]})]}),(0,c.jsxs)(i.MD,{children:[(0,c.jsxs)(i.hI,{color:"#635BFF",children:[(0,c.jsx)(i.Os,{children:te(ee.totalSales)}),(0,c.jsx)(i.v0,{children:"Total Revenue"}),(0,c.jsx)(i.d1,{children:re})]}),(0,c.jsxs)(i.hI,{color:"#10B981",children:[(0,c.jsx)(i.Os,{children:ee.totalOrders.toLocaleString()}),(0,c.jsx)(i.v0,{children:"Total Orders"}),(0,c.jsx)(i.d1,{children:"Completed orders"})]}),(0,c.jsxs)(i.hI,{color:"#F59E0B",children:[(0,c.jsx)(i.Os,{children:ee.totalCustomers.toLocaleString()}),(0,c.jsx)(i.v0,{children:"Customers"}),(0,c.jsx)(i.d1,{children:"Unique customers"})]}),(0,c.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,c.jsx)(i.Os,{children:te(ee.overallAvgOrder)}),(0,c.jsx)(i.v0,{children:"Avg Order"}),(0,c.jsx)(i.d1,{children:"Per order value"})]})]}),(0,c.jsxs)(i.MD,{style:{marginTop:"-16px"},children:[(0,c.jsxs)(i.hI,{color:"#EC4899",children:[(0,c.jsx)(i.Os,{children:te(ee.maxOrderValue)}),(0,c.jsx)(i.v0,{children:"Max Order"}),(0,c.jsx)(i.d1,{children:"Highest order value"})]}),(0,c.jsxs)(i.hI,{color:"#06B6D4",children:[(0,c.jsx)(i.Os,{children:ee.overallAvgServiceTime>0?`${ee.overallAvgServiceTime} min`:"N/A"}),(0,c.jsx)(i.v0,{children:"Avg Service Time"}),(0,c.jsx)(i.d1,{children:"Preparation time"})]}),(0,c.jsxs)(i.hI,{color:"#F97316",children:[(0,c.jsxs)(i.Os,{children:[ee.overallGrowth>0?"+":"",ee.overallGrowth,"%"]}),(0,c.jsx)(i.v0,{children:"Growth"}),(0,c.jsx)(i.d1,{children:"vs previous period"})]}),(0,c.jsxs)(i.hI,{color:"#14B8A6",children:[(0,c.jsx)(i.Os,{children:ee.totalRestaurants}),(0,c.jsx)(i.v0,{children:"Restaurants"}),(0,c.jsx)(i.d1,{children:"all"===M?"All brands":"Selected brand"})]})]}),G?(0,c.jsx)(s.pp,{children:(0,c.jsx)("p",{children:"Loading performance data..."})}):0===Z.length?(0,c.jsxs)(s.pp,{children:[(0,c.jsx)("h3",{children:"No Data Available"}),(0,c.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u,{children:Z.map(e=>(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(f,{children:e.name}),(0,c.jsx)(v,{children:e.brandCode})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Revenue"}),(0,c.jsxs)(w,{children:[te(e.sales,e.currency),0!==e.growth&&(0,c.jsxs)(F,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Orders"}),(0,c.jsxs)(w,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Customers"}),(0,c.jsxs)(w,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Avg Order"}),(0,c.jsx)(w,{children:e.avgOrder>0?te(e.avgOrder,e.currency):"N/A"})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Max Order"}),(0,c.jsx)(w,{children:e.maxOrder>0?te(e.maxOrder,e.currency):"N/A"})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(y,{children:"Avg Service Time"}),(0,c.jsx)(w,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,c.jsxs)(b,{children:[(0,c.jsxs)(k,{children:["Restaurant Ranking (",re,")"]}),Z.slice(0,10).map((e,t)=>(0,c.jsxs)(A,{children:[(0,c.jsx)(S,{rank:t+1,children:t+1}),(0,c.jsxs)($,{children:[(0,c.jsx)(E,{children:e.name}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(C,{children:["Revenue: ",te(e.sales,e.currency)]}),(0,c.jsxs)(C,{children:["Orders: ",e.completedOrders]}),(0,c.jsxs)(C,{children:["Customers: ",e.uniqueCustomers]}),(0,c.jsxs)(C,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);