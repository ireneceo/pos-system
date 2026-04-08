"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1143],{512:(e,r,t)=>{t.d(r,{x:()=>C,A:()=>R});var n=t(9950),a=t(4752),o=t(5030),s=t(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},c=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),x=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=a.Ay.div`
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
`,u=a.Ay.div`
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
`,g=a.Ay.button`
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
`,m=a.Ay.div``,w=a.Ay.div`
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
`,F=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,A=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,D=a.Ay.div`
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
`,S=e=>{let{startDate:r,endDate:t,onRangeSelect:a,onClose:S,isOpen:E}=e;const{t:C}=(0,o.Bd)("common"),O=new Date,[B,P]=(0,n.useState)(O.getMonth()),[T,M]=(0,n.useState)(O.getFullYear()),[R,z]=(0,n.useState)(null),[_,I]=(0,n.useState)(null),[Y,L]=(0,n.useState)(null),[N,q]=(0,n.useState)("start"),H=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&z(l(r)),t&&I(l(t))},[r,t]),(0,n.useEffect)(()=>{E&&q("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&S()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,S]);const U=(0,n.useCallback)(()=>{0===B?(P(11),M(e=>e-1)):P(e=>e-1)},[B]),W=(0,n.useCallback)(()=>{11===B?(P(0),M(e=>e+1)):P(e=>e+1)},[B]),G=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),o=[];for(let a=0;a<n;a++)o.push(null);for(let a=1;a<=t;a++)o.push(new Date(e,r,a));return(0,s.jsxs)(y,{children:[(0,s.jsx)(F,{children:x(e,r)}),(0,s.jsx)(b,{children:i.map(e=>(0,s.jsx)(A,{children:e},e))}),(0,s.jsx)(k,{children:o.map((e,r)=>{if(!e)return(0,s.jsx)(D,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:o,isHoverEnd:i}=(e=>{const r=R&&c(e,R),t=_&&c(e,_),n="end"===N&&Y?Y:_;let a=!1;if(R&&n){const[r,t]=R<=n?[R,n]:[n,R];a=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:a,isHoverEnd:"end"===N&&Y&&c(e,Y)}})(e),l=c(e,O);return(0,s.jsx)($,{$isStart:!!t,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!i,$isToday:l,onClick:()=>(e=>{if("start"===N)z(e),I(null),q("end");else{let r=R,t=e;t<r&&([r,t]=[t,r]),z(r),I(t),q("start"),a(d(r),d(t)),setTimeout(S,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},V=11===B?0:B+1,Z=11===B?T+1:T,J=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}z(t),I(n),q("start"),a(d(t),d(n)),setTimeout(S,150)};return E?(0,s.jsx)(h,{ref:H,children:(0,s.jsxs)(p,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{onClick:()=>J("this_week"),children:"This Week"}),(0,s.jsx)(g,{onClick:()=>J("this_month"),children:"This Month"}),(0,s.jsx)(g,{onClick:()=>J("this_year"),children:"This Year"})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(w,{children:[(0,s.jsx)(f,{onClick:U,"aria-label":"Previous month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,s.jsx)(f,{onClick:W,"aria-label":"Next month",children:(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,s.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,s.jsxs)(v,{children:[G(T,B),(0,s.jsx)(j,{children:G(Z,V)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,C=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,a]=r.split("-").map(Number);return new Date(t,n-1,a)}catch{return new Date}})(r);let n=new Date(t);const a=new Date(t);switch(e){case"today":break;case"yesterday":n.setDate(t.getDate()-1),a.setDate(t.getDate()-1);break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(a)}},O=a.Ay.div`
  margin-bottom: 24px;
`,B=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,P=a.Ay.button`
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
`,R=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:a,onPeriodChange:i,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:x}=(0,o.Bd)("common"),[h,p]=(0,n.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,s.jsx)(O,{children:(0,s.jsxs)(B,{children:[u.map(e=>(0,s.jsx)(P,{active:r===e&&!a,onClick:()=>i(e),children:g[e]},e)),(0,s.jsxs)(T,{children:[(0,s.jsxs)(M,{active:a,onClick:()=>p(!h),children:[(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,s.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,s.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,s.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,s.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,s.jsx)(S,{isOpen:h,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{d(e,r),p(!1)},onClose:()=>p(!1)})]}),c]})})}},1143:(e,r,t)=>{t.r(r),t.d(r,{default:()=>O});var n=t(9950),a=t(4752),o=t(2853),s=t(8409),i=t(6038),d=t(512),l=t(5030),c=t(4414);const x=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,h=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
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
    border-color: #7C3AED;
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
`,w=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,f=a.Ay.span`
  font-size: 12px;
  color: ${e=>"active"===e.status?"#059669":"#6B7280"};
  background: ${e=>"active"===e.status?"#ECFDF5":"#F3F4F6"};
  padding: 4px 8px;
  border-radius: 4px;
`,v=a.Ay.div`
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
`,y=a.Ay.div`
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
`,A=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,k=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,D=a.Ay.div`
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
`,S=a.Ay.div`
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
`,C=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,O=()=>{const{t:e}=(0,l.Bd)("owner"),[r,t]=(0,n.useState)("month"),[a,O]=(0,n.useState)(()=>(0,d.x)("month")),[B,P]=(0,n.useState)(!1),[T,M]=(0,n.useState)("sales"),[R,z]=(0,n.useState)([]),[_,I]=(0,n.useState)([]),[Y,L]=(0,n.useState)(!0);(0,n.useEffect)(()=>{N()},[]),(0,n.useEffect)(()=>{R.length>0&&q()},[R,a.start,a.end]);const N=async()=>{try{L(!0);const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e,n=(Array.isArray(t)?t:[]).map(e=>({id:e.id,name:e.name,status:e.status||"active",currency:e.currency||"MYR"}));z(n),0===n.length&&L(!1)}else L(!1)}catch(e){console.error("Error fetching data:",e),L(!1)}},q=async()=>{try{L(!0);const e=localStorage.getItem("auth_token");if(0===R.length)return I([]),void L(!1);const r=R.map(async r=>{try{const t=await fetch(`/api/orders?restaurant_id=${r.id}&start_date=${a.start}&end_date=${a.end}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();let r=[];return Array.isArray(e)?r=e:e.data&&Array.isArray(e.data)?r=e.data:e.orders&&Array.isArray(e.orders)&&(r=e.orders),r}return[]}catch(t){return console.error(`Error fetching orders for restaurant ${r.id}:`,t),[]}}),t=(await Promise.all(r)).flat();I(t)}catch(e){console.error("Error fetching orders:",e)}finally{L(!1)}},H=(0,n.useMemo)(()=>{const e=new Date(a.start),r=new Date(a.end),t=Math.ceil((r.getTime()-e.getTime())/864e5),n=new Date(e);n.setDate(n.getDate()-1);const o=new Date(n);o.setDate(o.getDate()-t);const s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:s(o),end:s(n)}},[a.start,a.end]),U=(0,n.useMemo)(()=>{if(0===R.length)return[];const e=new Date(a.start);e.setHours(0,0,0,0);const r=new Date(a.end);r.setHours(23,59,59,999);const t=new Date(H.start);t.setHours(0,0,0,0);const n=new Date(H.end);return n.setHours(23,59,59,999),R.map(a=>{const o=_.filter(e=>Number(e.restaurant_id)===Number(a.id)),s=o.filter(t=>{const n=new Date(t.order_date||t.createdAt);return n>=e&&n<=r}),i=o.filter(e=>{const r=new Date(e.order_date||e.createdAt);return r>=t&&r<=n}),d=s.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status),c=d.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),x=l.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),h=x>0?(c-x)/x*100:c>0?100:0,p=d.length>0?c/d.length:0,u=d.reduce((e,r)=>{const t=parseFloat(r.total_amount||"0");return t>e?t:e},0),g=new Set(s.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.served_at&&e.createdAt),w=m.length>0?m.reduce((e,r)=>{const t=new Date(r.createdAt).getTime(),n=(new Date(r.served_at).getTime()-t)/6e4;return e+(n>0?n:0)},0)/m.length:0;return{id:a.id,name:a.name,status:a.status,currency:a.currency,totalOrders:s.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*x)/100,growth:Math.round(10*h)/10,avgOrder:Math.round(100*p)/100,maxOrder:Math.round(100*u)/100,uniqueCustomers:g,avgServiceTime:Math.round(w)}})},[R,_,a.start,a.end,H]),W=(0,n.useMemo)(()=>[...U].sort((e,r)=>{switch(T){case"sales":default:return r.sales-e.sales;case"growth":return r.growth-e.growth;case"orders":return r.completedOrders-e.completedOrders;case"customers":return r.uniqueCustomers-e.uniqueCustomers}}),[U,T]),G=(0,n.useMemo)(()=>{const e=U.reduce((e,r)=>e+r.sales,0),r=U.length,t=U.reduce((e,r)=>e+r.completedOrders,0),n=U.reduce((e,r)=>e+r.previousSales,0),a=U.reduce((e,r)=>e+r.uniqueCustomers,0),o=Math.max(...U.map(e=>e.maxOrder),0),s=t>0?e/t:0,i=U.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,r)=>e+r.avgServiceTime,0)/i.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:r,totalOrders:t,totalCustomers:a,maxOrderValue:o,overallAvgOrder:Math.round(100*s)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[U]),V=(e,r)=>{const t=r||"MYR";return(0,i.vv)(e,t)},Z=B?`${a.start} ~ ${a.end}`:r;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(s.mc,{children:[(0,c.jsxs)(s.Y9,{children:[(0,c.jsx)("div",{children:(0,c.jsx)(s.hE,{children:e("owner:ownerPerformance.performance")})}),(0,c.jsx)(s.ex,{children:(0,c.jsx)(s.$n,{variant:"primary",onClick:()=>{if(0===W.length)return;const e=W.map(e=>[`"${e.name}"`,e.status,e.sales.toFixed(2),e.completedOrders,e.uniqueCustomers,e.avgOrder.toFixed(2),e.maxOrder.toFixed(2),e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A",`${e.growth}%`]),r=[["Restaurant","Status","Revenue","Orders","Customers","Avg Order","Max Order","Avg Fulfillment","Growth %"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob([r],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a");n.href=URL.createObjectURL(t),n.download=`owner-performance-${a.start}-to-${a.end}.csv`,n.click(),URL.revokeObjectURL(n.href)},children:e("owner:ownerPerformance.exportReport")})})]}),(0,c.jsxs)(s.UC,{children:[(0,c.jsx)(d.A,{activePeriod:r,dateRange:a,isCustomDateRange:B,onPeriodChange:e=>{t(e),P(!1),O((0,d.x)(e))},onCalendarRangeSelect:(e,r)=>{P(!0),t("all"),O({start:e,end:r})}}),(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Sort by:"}),(0,c.jsxs)(p,{value:T,onChange:e=>M(e.target.value),children:[(0,c.jsx)("option",{value:"sales",children:e("owner:ownerPerformance.revenue")}),(0,c.jsx)("option",{value:"growth",children:e("owner:ownerPerformance.growth")}),(0,c.jsx)("option",{value:"orders",children:e("owner:ownerPerformance.orders")}),(0,c.jsx)("option",{value:"customers",children:e("owner:ownerPerformance.customers")})]})]}),(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{color:"#7C3AED",children:[(0,c.jsx)(s.Os,{children:V(G.totalSales)}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.totalRevenue")}),(0,c.jsx)(s.d1,{children:Z})]}),(0,c.jsxs)(s.hI,{color:"#10B981",children:[(0,c.jsx)(s.Os,{children:G.totalOrders.toLocaleString()}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.totalOrders")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.completedOrders")})]}),(0,c.jsxs)(s.hI,{color:"#F59E0B",children:[(0,c.jsx)(s.Os,{children:G.totalCustomers.toLocaleString()}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.customers")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.uniqueCustomers")})]}),(0,c.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,c.jsx)(s.Os,{children:V(G.overallAvgOrder)}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.avgOrder")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.perOrderValue")})]})]}),(0,c.jsxs)(s.MD,{style:{marginTop:"-16px"},children:[(0,c.jsxs)(s.hI,{color:"#EC4899",children:[(0,c.jsx)(s.Os,{children:V(G.maxOrderValue)}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.maxOrder")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.highestOrderValue")})]}),(0,c.jsxs)(s.hI,{color:"#06B6D4",children:[(0,c.jsx)(s.Os,{children:G.overallAvgServiceTime>0?`${G.overallAvgServiceTime} min`:"N/A"}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.avgFulfillment")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.orderToServed")})]}),(0,c.jsxs)(s.hI,{color:"#F97316",children:[(0,c.jsxs)(s.Os,{children:[G.overallGrowth>0?"+":"",G.overallGrowth,"%"]}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.growth")}),(0,c.jsx)(s.d1,{children:"vs previous period"})]}),(0,c.jsxs)(s.hI,{color:"#14B8A6",children:[(0,c.jsx)(s.Os,{children:G.totalRestaurants}),(0,c.jsx)(s.v0,{children:e("owner:ownerPerformance.restaurants")}),(0,c.jsx)(s.d1,{children:e("owner:ownerPerformance.yourRestaurants")})]})]}),Y?(0,c.jsx)(o.pp,{children:(0,c.jsx)("p",{children:e("owner:ownerPerformance.loadingPerformanceData")})}):0===W.length?(0,c.jsxs)(o.pp,{children:[(0,c.jsx)("h3",{children:e("owner:ownerPerformance.noDataAvailable")}),(0,c.jsx)("p",{children:e("owner:ownerPerformance.noPerformanceDataFoundForTheSelectedPeriod")})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u,{children:W.map(r=>(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(w,{children:r.name}),(0,c.jsx)(f,{status:r.status,children:"active"===r.status?"Active":r.status})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.revenue")}),(0,c.jsxs)(y,{children:[V(r.sales,r.currency),0!==r.growth&&(0,c.jsxs)(F,{positive:r.growth>0,children:[r.growth>0?"+":"",r.growth,"%"]})]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.orders")}),(0,c.jsxs)(y,{children:[r.completedOrders.toLocaleString()," completed"]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.customers")}),(0,c.jsxs)(y,{children:[r.uniqueCustomers.toLocaleString()," unique"]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.avgOrder")}),(0,c.jsx)(y,{children:r.avgOrder>0?V(r.avgOrder,r.currency):"N/A"})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.maxOrder")}),(0,c.jsx)(y,{children:r.maxOrder>0?V(r.maxOrder,r.currency):"N/A"})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:e("owner:ownerPerformance.avgFulfillment")}),(0,c.jsx)(y,{children:r.avgServiceTime>0?`${r.avgServiceTime} min`:"N/A"})]})]},r.id))}),(0,c.jsxs)(b,{children:[(0,c.jsxs)(A,{children:["Restaurant Ranking (",Z,")"]}),W.slice(0,10).map((e,r)=>(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{rank:r+1,children:r+1}),(0,c.jsxs)($,{children:[(0,c.jsx)(S,{children:e.name}),(0,c.jsxs)(E,{children:[(0,c.jsxs)(C,{children:["Revenue: ",V(e.sales,e.currency)]}),(0,c.jsxs)(C,{children:["Orders: ",e.completedOrders]}),(0,c.jsxs)(C,{children:["Customers: ",e.uniqueCustomers]}),(0,c.jsxs)(C,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);