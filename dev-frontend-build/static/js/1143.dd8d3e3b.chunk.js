"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1143],{512:(e,t,r)=>{r.d(t,{x:()=>S,A:()=>T});var n=r(9950),a=r(4752),s=r(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,r,n]=e.split("-").map(Number);return new Date(t,r-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=a.Ay.div`
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
`,v=a.Ay.button`
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
`,f=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,j=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,w=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,y=a.Ay.div`
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
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,$=a.Ay.div`
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
`,D=e=>{let{startDate:t,endDate:r,onRangeSelect:a,onClose:D,isOpen:E}=e;const S=new Date,[C,O]=(0,n.useState)(S.getMonth()),[B,M]=(0,n.useState)(S.getFullYear()),[R,T]=(0,n.useState)(null),[z,_]=(0,n.useState)(null),[I,L]=(0,n.useState)(null),[Y,N]=(0,n.useState)("start"),q=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&T(d(t)),r&&_(d(r))},[t,r]),(0,n.useEffect)(()=>{E&&N("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{q.current&&!q.current.contains(e.target)&&D()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,D]);const H=(0,n.useCallback)(()=>{0===C?(O(11),M(e=>e-1)):O(e=>e-1)},[C]),U=(0,n.useCallback)(()=>{11===C?(O(0),M(e=>e+1)):O(e=>e+1)},[C]),P=(e,t)=>{const r=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let a=0;a<n;a++)d.push(null);for(let a=1;a<=r;a++)d.push(new Date(e,t,a));return(0,s.jsxs)(w,{children:[(0,s.jsx)(y,{children:c(e,t)}),(0,s.jsx)(F,{children:i.map(e=>(0,s.jsx)(b,{children:e},e))}),(0,s.jsx)(A,{children:d.map((e,t)=>{if(!e)return(0,s.jsx)(k,{},`e-${t}`);const{isStart:r,isEnd:n,isInRange:i,isHoverEnd:d}=(e=>{const t=R&&l(e,R),r=z&&l(e,z),n="end"===Y&&I?I:z;let a=!1;if(R&&n){const[t,r]=R<=n?[R,n]:[n,R];a=((e,t,r)=>{const n=e.getTime();return n>t.getTime()&&n<r.getTime()})(e,t,r)}return{isStart:t,isEnd:r,isInRange:a,isHoverEnd:"end"===Y&&I&&l(e,I)}})(e),c=l(e,S);return(0,s.jsx)($,{$isStart:!!r,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===Y)T(e),_(null),N("end");else{let t=R,r=e;r<t&&([t,r]=[r,t]),T(t),_(r),N("start"),a(o(t),o(r)),setTimeout(D,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},G=11===C?0:C+1,W=11===C?B+1:B,V=e=>{const t=new Date;let r;const n=t;switch(e){case"this_week":r=new Date(t),r.setDate(t.getDate()-t.getDay());break;case"this_month":r=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":r=new Date(t.getFullYear(),0,1);break;default:return}T(r),_(n),N("start"),a(o(r),o(n)),setTimeout(D,150)};return E?(0,s.jsx)(x,{ref:q,children:(0,s.jsxs)(h,{children:[(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{onClick:()=>V("this_week"),children:"This Week"}),(0,s.jsx)(u,{onClick:()=>V("this_month"),children:"This Month"}),(0,s.jsx)(u,{onClick:()=>V("this_year"),children:"This Year"})]}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(m,{children:[(0,s.jsx)(v,{onClick:H,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(v,{onClick:U,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(f,{children:[P(B,C),(0,s.jsx)(j,{children:P(W,G)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,S=(e,t)=>{const r=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[r,n,a]=t.split("-").map(Number);return new Date(r,n-1,a)}catch{return new Date}})(t);let n=new Date(r);const a=new Date(r);switch(e){case"today":break;case"week":n.setDate(r.getDate()-6);break;case"month":n.setDate(r.getDate()-29);break;case"year":n.setDate(r.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(a)}},C=a.Ay.div`
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
`,T=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:a,onPeriodChange:i,onCalendarRangeSelect:o,includeToday:d=!1,children:l}=e;const[c,x]=(0,n.useState)(!1),h=d?["today","week","month","year","all"]:["week","month","year","all"],p={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(C,{children:(0,s.jsxs)(O,{children:[h.map(e=>(0,s.jsx)(B,{active:t===e&&!a,onClick:()=>i(e),children:p[e]},e)),(0,s.jsxs)(M,{children:[(0,s.jsxs)(R,{active:a,onClick:()=>x(!c),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),r.start&&r.end?`${r.start} ~ ${r.end}`:"Custom Range"]}),(0,s.jsx)(D,{isOpen:c,startDate:r.start,endDate:r.end,onRangeSelect:(e,t)=>{o(e,t),x(!1)},onClose:()=>x(!1)})]}),l]})})}},1143:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var n=r(9950),a=r(4752),s=r(2853),i=r(8409),o=r(6038),d=r(512),l=r(4414);const c=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,x=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,h=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #7C3AED;
  }
`,p=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,u=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,g=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,m=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,v=a.Ay.span`
  font-size: 12px;
  color: ${e=>"active"===e.status?"#059669":"#6B7280"};
  background: ${e=>"active"===e.status?"#ECFDF5":"#F3F4F6"};
  padding: 4px 8px;
  border-radius: 4px;
`,f=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,j=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,w=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,y=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,F=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,b=a.Ay.h2`
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
`,k=a.Ay.div`
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
`,D=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,S=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,C=()=>{const[e,t]=(0,n.useState)("month"),[r,a]=(0,n.useState)(()=>(0,d.x)("month")),[C,O]=(0,n.useState)(!1),[B,M]=(0,n.useState)("sales"),[R,T]=(0,n.useState)([]),[z,_]=(0,n.useState)([]),[I,L]=(0,n.useState)(!0);(0,n.useEffect)(()=>{Y()},[]),(0,n.useEffect)(()=>{R.length>0&&N()},[R,r.start,r.end]);const Y=async()=>{try{L(!0);const e=localStorage.getItem("auth_token"),t=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e,n=(Array.isArray(r)?r:[]).map(e=>({id:e.id,name:e.name,status:e.status||"active",currency:e.currency||"MYR"}));T(n),0===n.length&&L(!1)}else L(!1)}catch(e){console.error("Error fetching data:",e),L(!1)}},N=async()=>{try{L(!0);const e=localStorage.getItem("auth_token");if(0===R.length)return _([]),void L(!1);const t=R.map(async t=>{try{const n=await fetch(`/api/orders?restaurant_id=${t.id}&start_date=${r.start}&end_date=${r.end}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();let t=[];return Array.isArray(e)?t=e:e.data&&Array.isArray(e.data)?t=e.data:e.orders&&Array.isArray(e.orders)&&(t=e.orders),t}return[]}catch(n){return console.error(`Error fetching orders for restaurant ${t.id}:`,n),[]}}),n=(await Promise.all(t)).flat();_(n)}catch(e){console.error("Error fetching orders:",e)}finally{L(!1)}},q=(0,n.useMemo)(()=>{const e=new Date(r.start),t=new Date(r.end),n=Math.ceil((t.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const s=new Date(a);s.setDate(s.getDate()-n);const i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(s),end:i(a)}},[r.start,r.end]),H=(0,n.useMemo)(()=>{if(0===R.length)return[];const e=new Date(r.start);e.setHours(0,0,0,0);const t=new Date(r.end);t.setHours(23,59,59,999);const n=new Date(q.start);n.setHours(0,0,0,0);const a=new Date(q.end);return a.setHours(23,59,59,999),R.map(r=>{const s=z.filter(e=>Number(e.restaurant_id)===Number(r.id)),i=s.filter(r=>{const n=new Date(r.order_date||r.createdAt);return n>=e&&n<=t}),o=s.filter(e=>{const t=new Date(e.order_date||e.createdAt);return t>=n&&t<=a}),d=i.filter(e=>"completed"===e.status),l=o.filter(e=>"completed"===e.status),c=d.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),x=l.reduce((e,t)=>e+parseFloat(t.total_amount||"0"),0),h=x>0?(c-x)/x*100:c>0?100:0,p=d.length>0?c/d.length:0,u=d.reduce((e,t)=>{const r=parseFloat(t.total_amount||"0");return r>e?r:e},0),g=new Set(i.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.served_at&&e.createdAt),v=m.length>0?m.reduce((e,t)=>{const r=new Date(t.createdAt).getTime(),n=(new Date(t.served_at).getTime()-r)/6e4;return e+(n>0?n:0)},0)/m.length:0;return{id:r.id,name:r.name,status:r.status,currency:r.currency,totalOrders:i.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*x)/100,growth:Math.round(10*h)/10,avgOrder:Math.round(100*p)/100,maxOrder:Math.round(100*u)/100,uniqueCustomers:g,avgServiceTime:Math.round(v)}})},[R,z,r.start,r.end,q]),U=(0,n.useMemo)(()=>[...H].sort((e,t)=>{switch(B){case"sales":default:return t.sales-e.sales;case"growth":return t.growth-e.growth;case"orders":return t.completedOrders-e.completedOrders;case"customers":return t.uniqueCustomers-e.uniqueCustomers}}),[H,B]),P=(0,n.useMemo)(()=>{const e=H.reduce((e,t)=>e+t.sales,0),t=H.length,r=H.reduce((e,t)=>e+t.completedOrders,0),n=H.reduce((e,t)=>e+t.previousSales,0),a=H.reduce((e,t)=>e+t.uniqueCustomers,0),s=Math.max(...H.map(e=>e.maxOrder),0),i=r>0?e/r:0,o=H.filter(e=>e.avgServiceTime>0),d=o.length>0?o.reduce((e,t)=>e+t.avgServiceTime,0)/o.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:t,totalOrders:r,totalCustomers:a,maxOrderValue:s,overallAvgOrder:Math.round(100*i)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[H]),G=(e,t)=>{const r=t||"MYR";return(0,o.vv)(e,r)},W=C?`${r.start} ~ ${r.end}`:e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(i.mc,{children:[(0,l.jsxs)(i.Y9,{children:[(0,l.jsx)("div",{children:(0,l.jsx)(i.hE,{children:"Performance"})}),(0,l.jsx)(i.ex,{children:(0,l.jsx)(i.$n,{variant:"primary",onClick:()=>{if(0===U.length)return;const e=U.map(e=>[`"${e.name}"`,e.status,e.sales.toFixed(2),e.completedOrders,e.uniqueCustomers,e.avgOrder.toFixed(2),e.maxOrder.toFixed(2),e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A",`${e.growth}%`]),t=[["Restaurant","Status","Revenue","Orders","Customers","Avg Order","Max Order","Avg Fulfillment","Growth %"].join(","),...e.map(e=>e.join(","))].join("\n"),n=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(n),a.download=`owner-performance-${r.start}-to-${r.end}.csv`,a.click(),URL.revokeObjectURL(a.href)},children:"Export Report"})})]}),(0,l.jsxs)(i.UC,{children:[(0,l.jsx)(d.A,{activePeriod:e,dateRange:r,isCustomDateRange:C,onPeriodChange:e=>{t(e),O(!1),a((0,d.x)(e))},onCalendarRangeSelect:(e,r)=>{O(!0),t("all"),a({start:e,end:r})}}),(0,l.jsxs)(c,{children:[(0,l.jsx)(x,{children:"Sort by:"}),(0,l.jsxs)(h,{value:B,onChange:e=>M(e.target.value),children:[(0,l.jsx)("option",{value:"sales",children:"Revenue"}),(0,l.jsx)("option",{value:"growth",children:"Growth"}),(0,l.jsx)("option",{value:"orders",children:"Orders"}),(0,l.jsx)("option",{value:"customers",children:"Customers"})]})]}),(0,l.jsxs)(i.MD,{children:[(0,l.jsxs)(i.hI,{color:"#7C3AED",children:[(0,l.jsx)(i.Os,{children:G(P.totalSales)}),(0,l.jsx)(i.v0,{children:"Total Revenue"}),(0,l.jsx)(i.d1,{children:W})]}),(0,l.jsxs)(i.hI,{color:"#10B981",children:[(0,l.jsx)(i.Os,{children:P.totalOrders.toLocaleString()}),(0,l.jsx)(i.v0,{children:"Total Orders"}),(0,l.jsx)(i.d1,{children:"Completed orders"})]}),(0,l.jsxs)(i.hI,{color:"#F59E0B",children:[(0,l.jsx)(i.Os,{children:P.totalCustomers.toLocaleString()}),(0,l.jsx)(i.v0,{children:"Customers"}),(0,l.jsx)(i.d1,{children:"Unique customers"})]}),(0,l.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,l.jsx)(i.Os,{children:G(P.overallAvgOrder)}),(0,l.jsx)(i.v0,{children:"Avg Order"}),(0,l.jsx)(i.d1,{children:"Per order value"})]})]}),(0,l.jsxs)(i.MD,{style:{marginTop:"-16px"},children:[(0,l.jsxs)(i.hI,{color:"#EC4899",children:[(0,l.jsx)(i.Os,{children:G(P.maxOrderValue)}),(0,l.jsx)(i.v0,{children:"Max Order"}),(0,l.jsx)(i.d1,{children:"Highest order value"})]}),(0,l.jsxs)(i.hI,{color:"#06B6D4",children:[(0,l.jsx)(i.Os,{children:P.overallAvgServiceTime>0?`${P.overallAvgServiceTime} min`:"N/A"}),(0,l.jsx)(i.v0,{children:"Avg Fulfillment"}),(0,l.jsx)(i.d1,{children:"Order to served"})]}),(0,l.jsxs)(i.hI,{color:"#F97316",children:[(0,l.jsxs)(i.Os,{children:[P.overallGrowth>0?"+":"",P.overallGrowth,"%"]}),(0,l.jsx)(i.v0,{children:"Growth"}),(0,l.jsx)(i.d1,{children:"vs previous period"})]}),(0,l.jsxs)(i.hI,{color:"#14B8A6",children:[(0,l.jsx)(i.Os,{children:P.totalRestaurants}),(0,l.jsx)(i.v0,{children:"Restaurants"}),(0,l.jsx)(i.d1,{children:"Your restaurants"})]})]}),I?(0,l.jsx)(s.pp,{children:(0,l.jsx)("p",{children:"Loading performance data..."})}):0===U.length?(0,l.jsxs)(s.pp,{children:[(0,l.jsx)("h3",{children:"No Data Available"}),(0,l.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(p,{children:U.map(e=>(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{children:e.name}),(0,l.jsx)(v,{status:e.status,children:"active"===e.status?"Active":e.status})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Revenue"}),(0,l.jsxs)(w,{children:[G(e.sales,e.currency),0!==e.growth&&(0,l.jsxs)(y,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Orders"}),(0,l.jsxs)(w,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Customers"}),(0,l.jsxs)(w,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Avg Order"}),(0,l.jsx)(w,{children:e.avgOrder>0?G(e.avgOrder,e.currency):"N/A"})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Max Order"}),(0,l.jsx)(w,{children:e.maxOrder>0?G(e.maxOrder,e.currency):"N/A"})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:"Avg Fulfillment"}),(0,l.jsx)(w,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(b,{children:["Restaurant Ranking (",W,")"]}),U.slice(0,10).map((e,t)=>(0,l.jsxs)(A,{children:[(0,l.jsx)(k,{rank:t+1,children:t+1}),(0,l.jsxs)($,{children:[(0,l.jsx)(D,{children:e.name}),(0,l.jsxs)(E,{children:[(0,l.jsxs)(S,{children:["Revenue: ",G(e.sales,e.currency)]}),(0,l.jsxs)(S,{children:["Orders: ",e.completedOrders]}),(0,l.jsxs)(S,{children:["Customers: ",e.uniqueCustomers]}),(0,l.jsxs)(S,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);