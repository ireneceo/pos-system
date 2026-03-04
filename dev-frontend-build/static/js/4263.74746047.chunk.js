"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
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
`,i=n.Ay.button`
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
`,l=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(o,{className:t,style:n,children:r})},d=e=>{let{active:r,onClick:t,children:n,className:o}=e;return(0,s.jsx)(i,{active:r,onClick:t,className:o,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(a,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var n=t(9950),s=t(4492);function o(e){const[r,t]=(0,s.ok)(),o=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[i,a]=(0,n.useState)(o());return[i,(0,n.useCallback)(e=>{a(e),t({tab:e})},[t])]}},3781:(e,r,t)=>{t.d(r,{Ay:()=>h});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,i=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,a=n.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5046e5":"#F6F9FC"};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,l=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    width: 120px;
  }
`,d=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;

  span {
    color: #6B7C93;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
  }
`,c=n.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: auto;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #E6EBF1;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 8px;
    width: 100%;
    justify-content: center;
  }
`,h=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:h,onDateRangeChange:u,onDownload:x,showDownload:p=!1}=e;return(0,s.jsx)(o,{children:(0,s.jsxs)(i,{children:[(0,s.jsx)(a,{active:"today"===r&&!n,onClick:()=>h("today"),children:"Today"}),(0,s.jsx)(a,{active:"week"===r&&!n,onClick:()=>h("week"),children:"Week"}),(0,s.jsx)(a,{active:"month"===r&&!n,onClick:()=>h("month"),children:"Month"}),(0,s.jsx)(a,{active:"year"===r&&!n,onClick:()=>h("year"),children:"Year"}),(0,s.jsx)(a,{active:"all"===r&&!n,onClick:()=>h("all"),children:"All"}),(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{type:"date",value:t.start,onChange:e=>u("start",e.target.value)}),(0,s.jsx)("span",{children:"to"}),(0,s.jsx)(l,{type:"date",value:t.end,onChange:e=>u("end",e.target.value)})]}),p&&x&&(0,s.jsxs)(c,{onClick:x,children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>H});var n=t(9950),s=t(4752),o=t(8409),i=t(2597),a=t(2653),l=t(1367),d=t(9018),c=t(6038),h=t(8406);const u=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(u).join(",");var p=t(1095),g=t(2847),v=t(3245),m=t(158),j=t(3440),y=t(2174),f=t(4915),F=t(7621),b=t(5297),k=t(2528),w=t(294),S=t(3588),C=t(8012),A=t(3781),D=t(4414);const $=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,B=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,E=o.MD,M=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,O=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,I=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,P=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,T=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,_=s.Ay.td`
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
`,N=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,L=s.Ay.td`
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
`,U=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],H=()=>{var e,r;const{user:t}=(0,l.As)(),{operationSettings:s}=(0,d.Pj)(),H=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[K,V]=(0,a.M)("sales"),[Z,Y]=(0,n.useState)("week"),[q,G]=(0,n.useState)(()=>{const e=new Date,r=H(e),t=new Date(e);t.setDate(t.getDate()-6);return{start:H(t),end:r}}),[J,Q]=(0,n.useState)(!1),[,X]=(0,n.useState)([]),[ee,re]=(0,n.useState)(!0),[te,ne]=(0,n.useState)(!1),[se,oe]=(0,n.useState)(null),[ie,ae]=(0,n.useState)([]),[,le]=(0,n.useState)([]),[,de]=(0,n.useState)([]),[ce,he]=(0,n.useState)(null),[ue,xe]=(0,n.useState)(new Set),[pe,ge]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{s&&!J&&$e(Z)},[null===s||void 0===s?void 0:s.timeZone]);const ve=(0,n.useMemo)(()=>{if(null===ce||void 0===ce||!ce.dailySales||0===ce.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===Z)return ce.hourlySales?ce.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===Z)return ce.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===Z)return ce.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return ce.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[ce,Z]),me=(0,n.useMemo)(()=>{var e;return(null===ce||void 0===ce||null===(e=ce.summary)||void 0===e?void 0:e.totalRevenue)||0},[ce]),je=(0,n.useMemo)(()=>{var e;return(null===ce||void 0===ce||null===(e=ce.summary)||void 0===e?void 0:e.totalOrders)||0},[ce]),ye=(0,n.useMemo)(()=>{if(null===ce||void 0===ce||!ce.categorySales||0===ce.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=ce.categorySales.reduce((e,r)=>e+r.revenue,0);return ce.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[ce]),fe=(0,n.useMemo)(()=>{var e;if(null===ce||void 0===ce||!ce.menuSales||0===ce.menuSales.length)return[];const r=(null===(e=ce.menuSales[0])||void 0===e?void 0:e.quantity)||1;return ce.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[ce]),Fe=(0,n.useMemo)(()=>null!==ce&&void 0!==ce&&ce.hourlySales?ce.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[ce]),be=(0,n.useMemo)(()=>ie.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[ie]),ke=(0,n.useMemo)(()=>{if(null===ce||void 0===ce||!ce.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;ce.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[ce]),we=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return console.log("\u274c No restaurant ID found"),void re(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void re(!1);const[r,n,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${t.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${t.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();oe(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&ae(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&le(e.data.items),e.data.categories&&de(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{re(!1)}},[null===t||void 0===t?void 0:t.restaurantId]),Se=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){ne(!0);try{const r=new URLSearchParams({startDate:q.start,endDate:q.end}),n=await fetch(`/api/dashboard/restaurant/${t.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&(he(e.data),X([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{ne(!1)}}},[null===t||void 0===t?void 0:t.restaurantId,q.start,q.end]);(0,n.useEffect)(()=>{we()},[we]),(0,n.useEffect)(()=>{Se()},[Se]);const Ce=(0,n.useMemo)(()=>{var e;if(null===ce||void 0===ce||!ce.hourlySales)return[];const r=(null===(e=ce.summary)||void 0===e?void 0:e.totalOrders)||1;return ce.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[ce]),Ae=(0,n.useMemo)(()=>{if(null===ce||void 0===ce||!ce.dailySales||0===ce.dailySales.length)return{};const e={};return ce.dailySales.forEach(r=>{const[t,n]=r.date.split("-"),s=`${t}-${n}`,o=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[s]||(e[t].months[s]={month:s,revenue:0,orders:0,days:{}}),e[t].months[s].days[o]||(e[t].months[s].days[o]={day:o,revenue:0,orders:0});const i=r.revenue,a=r.orders;e[t].revenue+=i,e[t].orders+=a,e[t].months[s].revenue+=i,e[t].months[s].orders+=a,e[t].months[s].days[o].revenue+=i,e[t].months[s].days[o].orders+=a}),e},[ce]),De=()=>{const e=new Date(q.start),r=new Date(q.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=De()})();n.useEffect(()=>{const e=De();if(e<=31){const e=new Set(Object.keys(Ae)),r=new Set;Object.keys(Ae).forEach(e=>{Object.keys(Ae[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),xe(e),ge(r)}else if(e<=365){const e=new Set(Object.keys(Ae));xe(e),ge(new Set)}else xe(new Set),ge(new Set)},[q.start,q.end,je]);const $e=async e=>{Y(e),Q(!1);const r=(()=>{var e,r,t;const n=(0,h.ng)(s),o=new Date,i=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o),a=parseInt((null===(e=i.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),l=parseInt((null===(r=i.find(e=>"month"===e.type))||void 0===r?void 0:r.value)||"0"),d=parseInt((null===(t=i.find(e=>"day"===e.type))||void 0===t?void 0:t.value)||"0");return new Date(a,l-1,d)})();let n=new Date(r);switch(e){case"today":n=new Date(r);break;case"week":n=new Date(r),n.setDate(n.getDate()-6);break;case"month":n=new Date(r),n.setDate(n.getDate()-29);break;case"year":n=new Date(r),n.setDate(n.getDate()-364);break;case"all":try{const e=localStorage.getItem("auth_token"),s=await fetch(`/api/dashboard/restaurant/${null===t||void 0===t?void 0:t.restaurantId}/earliest-order`,{headers:{Authorization:`Bearer ${e}`}}),o=await s.json();n=o.success&&o.data.earliestDate?new Date(o.data.earliestDate):new Date(r.getFullYear()-5,0,1)}catch{n=new Date(r.getFullYear()-5,0,1)}}const o=H(n),i=H(r);G({start:o,end:i})},Be=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Ee=(0,n.useCallback)(()=>{const e=["Date,Revenue"];return ve.forEach(r=>{e.push(`${u(r.date)},${Be(r.sales)}`)}),e.join("\n")},[ve]),Me=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ae).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Ae[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Be(t.revenue)},${t.orders},${Be(s)}`)})})}),e.join("\n")},[Ae]),Oe=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return fe.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Be(r.price),r.orders,Be(r.revenue)]))}),e.join("\n")},[fe]),Ie=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...be].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,o;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Be(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[be]),Pe=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Ce.forEach(r=>{e.push(x([r.time,r.orders,Be(r.revenue)]))}),e.join("\n")},[Ce]),Re=(0,n.useCallback)(()=>{let e;switch(K){case"sales":default:e=Ee();break;case"details":e=Me();break;case"menu":e=Oe();break;case"customers":e=Ie();break;case"operations":e=Pe()}var r,n,s,o,i,a;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===t||void 0===t?void 0:t.restaurantId)||"report"}`,n=K,s=Z,o=J,i=q.start,a=q.end,`${r}_${n}_${o?`${i}_${a}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[K,Z,J,q,null===t||void 0===t?void 0:t.restaurantId,Ee,Me,Oe,Ie,Pe]),Te=(e,r)=>{G({...q,[e]:r}),Q(!0)},_e=()=>(0,D.jsx)(A.Ay,{activePeriod:Z,dateRange:q,isCustomDateRange:J,onPeriodChange:$e,onDateRangeChange:Te,onDownload:Re,showDownload:!0,timezone:null===s||void 0===s?void 0:s.timeZone});return(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)($,{children:[(0,D.jsx)(C.Ay,{title:"Reports"}),(0,D.jsxs)(B,{children:[(0,D.jsxs)(i.tU,{children:[(0,D.jsx)(i.oz,{active:"sales"===K,onClick:()=>V("sales"),children:"Sales Report"}),(0,D.jsx)(i.oz,{active:"details"===K,onClick:()=>V("details"),children:"Sales Details"}),(0,D.jsx)(i.oz,{active:"menu"===K,onClick:()=>V("menu"),children:"Menu Analysis"}),(0,D.jsx)(i.oz,{active:"customers"===K,onClick:()=>V("customers"),children:"Customer Insights"}),(0,D.jsx)(i.oz,{active:"operations"===K,onClick:()=>V("operations"),children:"Operations"})]}),(0,D.jsxs)("div",{style:{display:"sales"===K?"block":"none"},children:[(0,D.jsx)(_e,{}),ee||te?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===je?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(o.hI,{color:"#059669",children:[(0,D.jsx)(o.v0,{children:"Total Revenue"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(me,s.currency)}),(0,D.jsxs)(o.d1,{children:[je," orders in selected period"]})]}),(0,D.jsxs)(o.hI,{color:"#2563EB",children:[(0,D.jsx)(o.v0,{children:"Total Orders"}),(0,D.jsx)(o.Os,{children:je.toLocaleString()}),(0,D.jsx)(o.d1,{children:"For selected period"})]}),(0,D.jsxs)(o.hI,{color:"#DC2626",children:[(0,D.jsx)(o.v0,{children:"Average Order Value"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(je>0?me/je:0,s.currency)}),(0,D.jsx)(o.d1,{children:"Per order"})]}),(0,D.jsxs)(o.hI,{color:"#7C3AED",children:[(0,D.jsx)(o.v0,{children:"Completed Orders"}),(0,D.jsx)(o.Os,{children:je}),(0,D.jsx)(o.d1,{children:"100% completion rate"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Revenue Trend"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(g.b,{data:ve,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Sales by Category"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(F.r,{children:[(0,D.jsx)(b.F,{data:ye,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:ye.map((e,r)=>(0,D.jsx)(k.f,{fill:U[r%U.length]},`cell-${r}`))}),(0,D.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Hourly Orders Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(w.E,{data:Fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,D.jsxs)("div",{style:{display:"details"===K?"block":"none"},children:[(0,D.jsx)(_e,{}),ee||te?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===je?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(o.hI,{color:"#059669",children:[(0,D.jsx)(o.v0,{children:"Total Revenue"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(me,s.currency)}),(0,D.jsxs)(o.d1,{children:[je," orders in selected period"]})]}),(0,D.jsxs)(o.hI,{color:"#2563EB",children:[(0,D.jsx)(o.v0,{children:"Total Orders"}),(0,D.jsx)(o.Os,{children:je.toLocaleString()}),(0,D.jsxs)(o.d1,{children:[je," completed"]})]}),(0,D.jsxs)(o.hI,{color:"#DC2626",children:[(0,D.jsx)(o.v0,{children:"Average Order Value"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(je>0?me/je:0,s.currency)}),(0,D.jsx)(o.d1,{children:"Per order average"})]}),(0,D.jsxs)(o.hI,{color:"#7C3AED",children:[(0,D.jsx)(o.v0,{children:"Period"}),(0,D.jsx)(o.Os,{children:J?De():"today"===Z?"1":"week"===Z?"7":"month"===Z?"30":"year"===Z?"365":De()}),(0,D.jsx)(o.d1,{children:J?`${q.start} to ${q.end}`:"today"===Z?"Day":"Days"})]})]}),(0,D.jsxs)(P,{children:[(0,D.jsxs)(I,{children:["Detailed Sales Breakdown (",J?`${q.start} to ${q.end}`:Z,")"]}),(0,D.jsxs)(R,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(T,{style:{width:"40%"},children:"Period"}),(0,D.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,D.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,D.jsx)(T,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,D.jsx)("tbody",{children:Object.keys(Ae).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Ae[e],t=ue.has(e);return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ue);if(r.has(e)){var t;r.delete(e);const n=new Set(pe);Object.keys((null===(t=Ae[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),ge(n)}else r.add(e);xe(r)})(e),children:[(0,D.jsxs)(L,{level:0,bold:!0,children:[(0,D.jsx)(W,{expanded:t,children:"\u25b6"}),e]}),(0,D.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,s.currency)}),(0,D.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,D.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const o=r.months[t],i=`${e}-${t}`,a=pe.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(pe);r.has(e)?r.delete(e):r.add(e),ge(r)})(i),children:[(0,D.jsxs)(L,{level:1,bold:!0,children:[(0,D.jsx)(W,{expanded:a,children:"\u25b6"}),l]}),(0,D.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue,s.currency)}),(0,D.jsx)(L,{level:1,style:{textAlign:"right"},children:o.orders}),(0,D.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue/o.orders,s.currency)})]}),a&&Object.keys(o.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=o.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,D.jsxs)(N,{level:2,children:[(0,D.jsx)(L,{level:2,children:t}),(0,D.jsx)(L,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,s.currency)}),(0,D.jsx)(L,{level:2,style:{textAlign:"right"},children:r.orders}),(0,D.jsx)(L,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"menu"===K?"block":"none"},children:[(0,D.jsx)(_e,{}),(0,D.jsxs)(E,{children:[(0,D.jsxs)(o.hI,{color:"#F59E0B",children:[(0,D.jsx)(o.v0,{children:"Best Seller"}),(0,D.jsx)(o.Os,{children:(null===(e=fe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,D.jsxs)(o.d1,{children:[(null===(r=fe[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,D.jsxs)(o.hI,{color:"#10B981",children:[(0,D.jsx)(o.v0,{children:"Menu Items"}),(0,D.jsx)(o.Os,{children:fe.length}),(0,D.jsx)(o.d1,{children:"Items with sales"})]}),(0,D.jsxs)(o.hI,{color:"#3B82F6",children:[(0,D.jsx)(o.v0,{children:"Items Sold"}),(0,D.jsx)(o.Os,{children:fe.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,D.jsx)(o.d1,{children:"Total quantity sold"})]}),(0,D.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,D.jsx)(o.v0,{children:"Total Revenue"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(fe.reduce((e,r)=>e+r.revenue,0),s.currency)}),(0,D.jsx)(o.d1,{children:"For selected period"})]})]}),(0,D.jsxs)(P,{children:[(0,D.jsxs)(I,{children:["Complete Menu Performance Ranking (",J?`${q.start} to ${q.end}`:Z,")"]}),(0,D.jsxs)(R,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(T,{children:"Rank"}),(0,D.jsx)(T,{children:"Menu Item"}),(0,D.jsx)(T,{children:"Category"}),(0,D.jsx)(T,{children:"Price"}),(0,D.jsx)(T,{children:"Qty Sold"}),(0,D.jsx)(T,{children:"Revenue"}),(0,D.jsx)(T,{children:"Performance"})]})}),(0,D.jsx)("tbody",{children:fe.map((e,r)=>{var t;const n=(null===(t=fe[0])||void 0===t?void 0:t.orders)||1;return(0,D.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,D.jsx)(_,{style:{fontWeight:600},children:e.name}),(0,D.jsx)(_,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,D.jsx)(_,{children:(0,c.vv)(e.price,s.currency)}),(0,D.jsx)(_,{children:e.orders.toLocaleString()}),(0,D.jsx)(_,{children:(0,c.vv)(e.revenue,s.currency)}),(0,D.jsx)(_,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:e.orders/n*100}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,D.jsxs)("div",{style:{display:"customers"===K?"block":"none"},children:[(0,D.jsx)(_e,{}),ee||te?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===be.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(o.hI,{color:"#635BFF",children:[(0,D.jsx)(o.v0,{children:"Active Customers"}),(0,D.jsx)(o.Os,{children:be.length.toLocaleString()}),(0,D.jsxs)(o.d1,{children:[be.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",be.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,D.jsxs)(o.hI,{color:"#00D924",children:[(0,D.jsx)(o.v0,{children:"Repeat Customers"}),(0,D.jsx)(o.Os,{children:be.filter(e=>e.period_orders>1).length}),(0,D.jsxs)(o.d1,{children:[be.length>0?Math.round(be.filter(e=>e.period_orders>1).length/be.length*100):0,"% ordered multiple times"]})]}),(0,D.jsxs)(o.hI,{color:"#FFB800",children:[(0,D.jsx)(o.v0,{children:"Average Spent"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(be.length>0?be.reduce((e,r)=>e+(r.period_spent||0),0)/be.length:0,s.currency)}),(0,D.jsx)(o.d1,{children:"Per customer in period"})]}),(0,D.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,D.jsx)(o.v0,{children:"Period Revenue"}),(0,D.jsx)(o.Os,{children:(0,c.vv)(be.reduce((e,r)=>e+(r.period_spent||0),0),s.currency)}),(0,D.jsxs)(o.d1,{children:["From ",be.length," customers"]})]})]}),(0,D.jsxs)(P,{children:[(0,D.jsxs)(I,{children:["Top Customers (",J?`${q.start} to ${q.end}`:Z,")"]}),(0,D.jsxs)(R,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(T,{children:"Rank"}),(0,D.jsx)(T,{children:"Name"}),(0,D.jsx)(T,{children:"Phone"}),(0,D.jsx)(T,{children:"Type"}),(0,D.jsx)(T,{children:"Period Orders"}),(0,D.jsx)(T,{children:"Period Spent"}),(0,D.jsx)(T,{children:"Total Points"}),(0,D.jsx)(T,{children:"Tier"})]})}),(0,D.jsx)("tbody",{children:be.slice(0,20).map((e,r)=>{var t,n,o,i,a,l;return(0,D.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,D.jsx)(_,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,D.jsx)(_,{children:(null===(o=e.customer)||void 0===o?void 0:o.phone)||"-"}),(0,D.jsx)(_,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,D.jsx)(_,{children:e.period_orders||0}),(0,D.jsx)(_,{children:(0,c.vv)(e.period_spent||0,s.currency)}),(0,D.jsx)(_,{children:e.points||0}),(0,D.jsx)(_,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"operations"===K?"block":"none"},children:[(0,D.jsx)(_e,{}),ee||te?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===je?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(o.hI,{color:"#10B981",children:[(0,D.jsx)(o.v0,{children:"Completed Orders"}),(0,D.jsx)(o.Os,{children:je.toLocaleString()}),(0,D.jsxs)(o.d1,{children:[ke.completionRate,"% fulfillment rate"]})]}),(0,D.jsxs)(o.hI,{color:"#F59E0B",children:[(0,D.jsx)(o.v0,{children:"Avg. Prep Time"}),(0,D.jsx)(o.Os,{children:ke.avgPrepTime>0?`${ke.avgPrepTime} min`:"N/A"}),(0,D.jsx)(o.d1,{children:ke.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,D.jsxs)(o.hI,{color:"#EF4444",children:[(0,D.jsx)(o.v0,{children:"Peak Hour"}),(0,D.jsx)(o.Os,{children:ke.peakHour}),(0,D.jsxs)(o.d1,{children:[ke.peakHourOrders," orders in this slot"]})]}),(0,D.jsxs)(o.hI,{color:"#6366F1",children:[(0,D.jsx)(o.v0,{children:"Orders per Day"}),(0,D.jsx)(o.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(q.end).getTime()-new Date(q.start).getTime())/864e5)+1);return Math.round(je/e)})()}),(0,D.jsx)(o.d1,{children:"Average daily orders"})]})]}),(0,D.jsxs)(P,{children:[(0,D.jsxs)(I,{children:["Peak Hours Performance (",J?`${q.start} to ${q.end}`:Z,")"]}),(0,D.jsxs)(R,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(T,{children:"Time Slot"}),(0,D.jsx)(T,{children:"Orders"}),(0,D.jsx)(T,{children:"Revenue"}),(0,D.jsx)(T,{children:"Share"})]})}),(0,D.jsx)("tbody",{children:0===Ce.length?(0,D.jsx)("tr",{children:(0,D.jsx)(_,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Ce.map((e,r)=>(0,D.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,D.jsxs)(_,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,D.jsx)(_,{children:e.orders}),(0,D.jsx)(_,{children:(0,c.vv)(e.revenue,s.currency)}),(0,D.jsx)(_,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:je>0?e.orders/je*100:0}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[je>0?Math.round(e.orders/je*100):0,"%"]})]})})]},r))})]})]}),(0,D.jsxs)(O,{style:{marginTop:"24px"},children:[(0,D.jsx)(I,{children:"Hourly Order Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(w.E,{data:Fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>l});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
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
`,i=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(o,{children:[(0,s.jsx)(i,{children:r}),t&&(0,s.jsx)(a,{children:t})]})}},8406:(e,r,t)=>{t.d(r,{MQ:()=>l,Vp:()=>a,fU:()=>o,ng:()=>n,oB:()=>i,r6:()=>s});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,r,t)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(r)};return s.toLocaleString("en-MY",{...o,...t})},o=(e,r)=>s(e,r,{year:void 0,month:void 0,day:void 0}),i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const r=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const t=new Date;t.setDate(t.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:r,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const r=new Date;return r.setDate(r.getDate()+e),`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const r=new Date(e).getTime();if(isNaN(r))return"just now";const t=Date.now()-r,n=Math.floor(t/6e4),s=Math.floor(t/36e5),o=Math.floor(t/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);