"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{3781:(e,r,t)=>{t.d(r,{Ay:()=>h});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
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
`,l=n.Ay.button`
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
`,a=n.Ay.input`
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
`,h=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:h,onDateRangeChange:u,onDownload:x,showDownload:p=!1}=e;return(0,s.jsx)(o,{children:(0,s.jsxs)(i,{children:[(0,s.jsx)(l,{active:"today"===r&&!n,onClick:()=>h("today"),children:"Today"}),(0,s.jsx)(l,{active:"week"===r&&!n,onClick:()=>h("week"),children:"Week"}),(0,s.jsx)(l,{active:"month"===r&&!n,onClick:()=>h("month"),children:"Month"}),(0,s.jsx)(l,{active:"year"===r&&!n,onClick:()=>h("year"),children:"Year"}),(0,s.jsx)(l,{active:"all"===r&&!n,onClick:()=>h("all"),children:"All"}),(0,s.jsxs)(d,{children:[(0,s.jsx)(a,{type:"date",value:t.start,onChange:e=>u("start",e.target.value)}),(0,s.jsx)("span",{children:"to"}),(0,s.jsx)(a,{type:"date",value:t.end,onChange:e=>u("end",e.target.value)})]}),p&&x&&(0,s.jsxs)(c,{onClick:x,children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>U});var n=t(9950),s=t(4752),o=t(4492),i=t(3310),l=t(2674),a=t(1367),d=t(9018),c=t(6038),h=t(8406);const u=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(u).join(",");var p=t(1095),g=t(2847),v=t(3245),j=t(158),m=t(3440),y=t(4094),f=t(4915),F=t(7621),b=t(5297),k=t(2528),w=t(294),S=t(3588),A=t(8012),C=t(3781),D=t(4414);const $=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,B=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,E=l.MD,M=s.Ay.div`
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
`,_=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,P=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,R=s.Ay.th`
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
`,L=s.Ay.tr`
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
`,H=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],U=()=>{var e,r;const{user:t}=(0,a.As)(),{operationSettings:s}=(0,d.Pj)(),U=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[K,V]=(0,o.ok)(),[Z,q]=(0,n.useState)(()=>K.get("tab")||"sales");(0,n.useEffect)(()=>{V({tab:Z},{replace:!0})},[Z,V]);const[G,Y]=(0,n.useState)("week"),[J,Q]=(0,n.useState)(()=>{const e=new Date,r=U(e),t=new Date(e);t.setDate(t.getDate()-6);return{start:U(t),end:r}}),[X,ee]=(0,n.useState)(!1),[re,te]=(0,n.useState)([]),[ne,se]=(0,n.useState)(!0),[oe,ie]=(0,n.useState)(!1),[le,ae]=(0,n.useState)(null),[de,ce]=(0,n.useState)([]),[he,ue]=(0,n.useState)([]),[xe,pe]=(0,n.useState)([]),[ge,ve]=(0,n.useState)(null),[je,me]=(0,n.useState)(new Set),[ye,fe]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{localStorage.setItem("reports_active_tab",Z)},[Z]),(0,n.useEffect)(()=>{s&&!X&&Ie(G)},[null===s||void 0===s?void 0:s.timeZone]);const Fe=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.dailySales||0===ge.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===G)return ge.hourlySales?ge.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===G)return ge.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===G)return ge.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return ge.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[ge,G]),be=(0,n.useMemo)(()=>{var e;return(null===ge||void 0===ge||null===(e=ge.summary)||void 0===e?void 0:e.totalRevenue)||0},[ge]),ke=(0,n.useMemo)(()=>{var e;return(null===ge||void 0===ge||null===(e=ge.summary)||void 0===e?void 0:e.totalOrders)||0},[ge]),we=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.categorySales||0===ge.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=ge.categorySales.reduce((e,r)=>e+r.revenue,0);return ge.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[ge]),Se=(0,n.useMemo)(()=>{var e;if(null===ge||void 0===ge||!ge.menuSales||0===ge.menuSales.length)return[];const r=(null===(e=ge.menuSales[0])||void 0===e?void 0:e.quantity)||1;return ge.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[ge]),Ae=(0,n.useMemo)(()=>null!==ge&&void 0!==ge&&ge.hourlySales?ge.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[ge]),Ce=(0,n.useMemo)(()=>de.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[de]),De=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;ge.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[ge]),$e=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return console.log("\u274c No restaurant ID found"),void se(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void se(!1);const[r,n,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${t.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ae(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&ce(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&ue(e.data.items),e.data.categories&&pe(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{se(!1)}},[null===t||void 0===t?void 0:t.restaurantId]),Be=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){ie(!0);try{const r=new URLSearchParams({startDate:J.start,endDate:J.end}),n=await fetch(`/api/dashboard/restaurant/${t.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&(ve(e.data),te([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{ie(!1)}}},[null===t||void 0===t?void 0:t.restaurantId,J.start,J.end]);(0,n.useEffect)(()=>{$e()},[$e]),(0,n.useEffect)(()=>{Be()},[Be]);const Ee=(0,n.useMemo)(()=>{var e;if(null===ge||void 0===ge||!ge.hourlySales)return[];const r=(null===(e=ge.summary)||void 0===e?void 0:e.totalOrders)||1;return ge.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[ge]),Me=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.dailySales||0===ge.dailySales.length)return{};const e={};return ge.dailySales.forEach(r=>{const[t,n,s]=r.date.split("-"),o=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[o]||(e[t].months[o]={month:o,revenue:0,orders:0,days:{}}),e[t].months[o].days[i]||(e[t].months[o].days[i]={day:i,revenue:0,orders:0});const l=r.revenue,a=r.orders;e[t].revenue+=l,e[t].orders+=a,e[t].months[o].revenue+=l,e[t].months[o].orders+=a,e[t].months[o].days[i].revenue+=l,e[t].months[o].days[i].orders+=a}),e},[ge]),Oe=()=>{const e=new Date(J.start),r=new Date(J.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Oe()})();n.useEffect(()=>{const e=Oe();if(e<=31){const e=new Set(Object.keys(Me)),r=new Set;Object.keys(Me).forEach(e=>{Object.keys(Me[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),me(e),fe(r)}else if(e<=365){const e=new Set(Object.keys(Me));me(e),fe(new Set)}else me(new Set),fe(new Set)},[J.start,J.end,ke]);const Ie=e=>{Y(e),ee(!1);const r=(()=>{var e,r,t;const n=(0,h.ng)(s),o=new Date,i=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o),l=parseInt((null===(e=i.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),a=parseInt((null===(r=i.find(e=>"month"===e.type))||void 0===r?void 0:r.value)||"0"),d=parseInt((null===(t=i.find(e=>"day"===e.type))||void 0===t?void 0:t.value)||"0");return new Date(l,a-1,d)})();let t=new Date(r);switch(e){case"today":t=new Date(r);break;case"week":t=new Date(r),t.setDate(t.getDate()-6);break;case"month":t=new Date(r),t.setDate(t.getDate()-29);break;case"year":t=new Date(r),t.setDate(t.getDate()-364);break;case"all":if(re.length>0){t=re.reduce((e,r)=>{const t=new Date(r.order_date||r.createdAt);return t<e?t:e},new Date)}else t=new Date(r.getFullYear()-5,0,1)}const n=U(t),o=U(r);Q({start:n,end:o})},_e=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Pe=((0,n.useCallback)(()=>[],[]),(0,n.useCallback)(()=>{const e=["Date,Revenue"];return Fe.forEach(r=>{e.push(`${u(r.date)},${_e(r.sales)}`)}),e.join("\n")},[Fe])),Re=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Me).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Me[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${_e(t.revenue)},${t.orders},${_e(s)}`)})})}),e.join("\n")},[Me]),Te=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return Se.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,_e(r.price),r.orders,_e(r.revenue)]))}),e.join("\n")},[Se]),ze=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ce].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,o;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,_e(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ce]),Le=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Ee.forEach(r=>{e.push(x([r.time,r.orders,_e(r.revenue)]))}),e.join("\n")},[Ee]),Ne=(0,n.useCallback)(()=>{let e;switch(Z){case"sales":default:e=Pe();break;case"details":e=Re();break;case"menu":e=Te();break;case"customers":e=ze();break;case"operations":e=Le()}var r,n,s,o,i,l;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===t||void 0===t?void 0:t.restaurantId)||"report"}`,n=Z,s=G,o=X,i=J.start,l=J.end,`${r}_${n}_${o?`${i}_${l}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[Z,G,X,J,null===t||void 0===t?void 0:t.restaurantId,Pe,Re,Te,ze,Le]),We=(e,r)=>{Q({...J,[e]:r}),ee(!0)},He=()=>(0,D.jsx)(C.Ay,{activePeriod:G,dateRange:J,isCustomDateRange:X,onPeriodChange:Ie,onDateRangeChange:We,onDownload:Ne,showDownload:!0,timezone:null===s||void 0===s?void 0:s.timeZone});return(0,D.jsx)(i.A,{children:(0,D.jsxs)($,{children:[(0,D.jsx)(A.Ay,{title:"Reports"}),(0,D.jsxs)(B,{children:[(0,D.jsxs)(l.j,{children:[(0,D.jsx)(l.oz,{active:"sales"===Z,onClick:()=>q("sales"),children:"Sales Report"}),(0,D.jsx)(l.oz,{active:"details"===Z,onClick:()=>q("details"),children:"Sales Details"}),(0,D.jsx)(l.oz,{active:"menu"===Z,onClick:()=>q("menu"),children:"Menu Analysis"}),(0,D.jsx)(l.oz,{active:"customers"===Z,onClick:()=>q("customers"),children:"Customer Insights"}),(0,D.jsx)(l.oz,{active:"operations"===Z,onClick:()=>q("operations"),children:"Operations"})]}),(0,D.jsxs)("div",{style:{display:"sales"===Z?"block":"none"},children:[(0,D.jsx)(He,{}),ne||oe?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===ke?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(l.hI,{color:"#059669",children:[(0,D.jsx)(l.v0,{children:"Total Revenue"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(be,s.currency)}),(0,D.jsxs)(l.d1,{children:[ke," orders in selected period"]})]}),(0,D.jsxs)(l.hI,{color:"#2563EB",children:[(0,D.jsx)(l.v0,{children:"Total Orders"}),(0,D.jsx)(l.Os,{children:ke.toLocaleString()}),(0,D.jsx)(l.d1,{children:"For selected period"})]}),(0,D.jsxs)(l.hI,{color:"#DC2626",children:[(0,D.jsx)(l.v0,{children:"Average Order Value"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(ke>0?be/ke:0,s.currency)}),(0,D.jsx)(l.d1,{children:"Per order"})]}),(0,D.jsxs)(l.hI,{color:"#7C3AED",children:[(0,D.jsx)(l.v0,{children:"Completed Orders"}),(0,D.jsx)(l.Os,{children:ke}),(0,D.jsx)(l.d1,{children:"100% completion rate"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Revenue Trend"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(g.b,{data:Fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(j.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Sales by Category"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(F.r,{children:[(0,D.jsx)(b.F,{data:we,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:we.map((e,r)=>(0,D.jsx)(k.f,{fill:H[r%H.length]},`cell-${r}`))}),(0,D.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,D.jsxs)(O,{children:[(0,D.jsx)(I,{children:"Hourly Orders Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(w.E,{data:Ae,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(j.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,D.jsxs)("div",{style:{display:"details"===Z?"block":"none"},children:[(0,D.jsx)(He,{}),ne||oe?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===ke?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(l.hI,{color:"#059669",children:[(0,D.jsx)(l.v0,{children:"Total Revenue"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(be,s.currency)}),(0,D.jsxs)(l.d1,{children:[ke," orders in selected period"]})]}),(0,D.jsxs)(l.hI,{color:"#2563EB",children:[(0,D.jsx)(l.v0,{children:"Total Orders"}),(0,D.jsx)(l.Os,{children:ke.toLocaleString()}),(0,D.jsxs)(l.d1,{children:[ke," completed"]})]}),(0,D.jsxs)(l.hI,{color:"#DC2626",children:[(0,D.jsx)(l.v0,{children:"Average Order Value"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(ke>0?be/ke:0,s.currency)}),(0,D.jsx)(l.d1,{children:"Per order average"})]}),(0,D.jsxs)(l.hI,{color:"#7C3AED",children:[(0,D.jsx)(l.v0,{children:"Period"}),(0,D.jsx)(l.Os,{children:X?Oe():"today"===G?"1":"week"===G?"7":"month"===G?"30":"year"===G?"365":Oe()}),(0,D.jsx)(l.d1,{children:X?`${J.start} to ${J.end}`:"today"===G?"Day":"Days"})]})]}),(0,D.jsxs)(_,{children:[(0,D.jsxs)(I,{children:["Detailed Sales Breakdown (",X?`${J.start} to ${J.end}`:G,")"]}),(0,D.jsxs)(P,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(R,{style:{width:"40%"},children:"Period"}),(0,D.jsx)(R,{style:{textAlign:"right"},children:"Revenue"}),(0,D.jsx)(R,{style:{textAlign:"right"},children:"Orders"}),(0,D.jsx)(R,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,D.jsx)("tbody",{children:Object.keys(Me).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Me[e],t=je.has(e);return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(je);if(r.has(e)){var t;r.delete(e);const n=new Set(ye);Object.keys((null===(t=Me[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),fe(n)}else r.add(e);me(r)})(e),children:[(0,D.jsxs)(N,{level:0,bold:!0,children:[(0,D.jsx)(W,{expanded:t,children:"\u25b6"}),e]}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,s.currency)}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const o=r.months[t],i=`${e}-${t}`,l=ye.has(i),a=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(ye);r.has(e)?r.delete(e):r.add(e),fe(r)})(i),children:[(0,D.jsxs)(N,{level:1,bold:!0,children:[(0,D.jsx)(W,{expanded:l,children:"\u25b6"}),a]}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue,s.currency)}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:o.orders}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue/o.orders,s.currency)})]}),l&&Object.keys(o.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=o.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,D.jsxs)(L,{level:2,children:[(0,D.jsx)(N,{level:2,children:t}),(0,D.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,s.currency)}),(0,D.jsx)(N,{level:2,style:{textAlign:"right"},children:r.orders}),(0,D.jsx)(N,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"menu"===Z?"block":"none"},children:[(0,D.jsx)(He,{}),(0,D.jsxs)(E,{children:[(0,D.jsxs)(l.hI,{color:"#F59E0B",children:[(0,D.jsx)(l.v0,{children:"Best Seller"}),(0,D.jsx)(l.Os,{children:(null===(e=Se[0])||void 0===e?void 0:e.name)||"N/A"}),(0,D.jsxs)(l.d1,{children:[(null===(r=Se[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,D.jsxs)(l.hI,{color:"#10B981",children:[(0,D.jsx)(l.v0,{children:"Menu Items"}),(0,D.jsx)(l.Os,{children:Se.length}),(0,D.jsx)(l.d1,{children:"Items with sales"})]}),(0,D.jsxs)(l.hI,{color:"#3B82F6",children:[(0,D.jsx)(l.v0,{children:"Items Sold"}),(0,D.jsx)(l.Os,{children:Se.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,D.jsx)(l.d1,{children:"Total quantity sold"})]}),(0,D.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,D.jsx)(l.v0,{children:"Total Revenue"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(Se.reduce((e,r)=>e+r.revenue,0),s.currency)}),(0,D.jsx)(l.d1,{children:"For selected period"})]})]}),(0,D.jsxs)(_,{children:[(0,D.jsxs)(I,{children:["Complete Menu Performance Ranking (",X?`${J.start} to ${J.end}`:G,")"]}),(0,D.jsxs)(P,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(R,{children:"Rank"}),(0,D.jsx)(R,{children:"Menu Item"}),(0,D.jsx)(R,{children:"Category"}),(0,D.jsx)(R,{children:"Price"}),(0,D.jsx)(R,{children:"Qty Sold"}),(0,D.jsx)(R,{children:"Revenue"}),(0,D.jsx)(R,{children:"Performance"})]})}),(0,D.jsx)("tbody",{children:Se.map((e,r)=>{var t;const n=(null===(t=Se[0])||void 0===t?void 0:t.orders)||1;return(0,D.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(T,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,D.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,D.jsx)(T,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,D.jsx)(T,{children:(0,c.vv)(e.price,s.currency)}),(0,D.jsx)(T,{children:e.orders.toLocaleString()}),(0,D.jsx)(T,{children:(0,c.vv)(e.revenue,s.currency)}),(0,D.jsx)(T,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:e.orders/n*100}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,D.jsxs)("div",{style:{display:"customers"===Z?"block":"none"},children:[(0,D.jsx)(He,{}),ne||oe?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ce.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(l.hI,{color:"#635BFF",children:[(0,D.jsx)(l.v0,{children:"Active Customers"}),(0,D.jsx)(l.Os,{children:Ce.length.toLocaleString()}),(0,D.jsxs)(l.d1,{children:[Ce.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Ce.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,D.jsxs)(l.hI,{color:"#00D924",children:[(0,D.jsx)(l.v0,{children:"Repeat Customers"}),(0,D.jsx)(l.Os,{children:Ce.filter(e=>e.period_orders>1).length}),(0,D.jsxs)(l.d1,{children:[Ce.length>0?Math.round(Ce.filter(e=>e.period_orders>1).length/Ce.length*100):0,"% ordered multiple times"]})]}),(0,D.jsxs)(l.hI,{color:"#FFB800",children:[(0,D.jsx)(l.v0,{children:"Average Spent"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(Ce.length>0?Ce.reduce((e,r)=>e+(r.period_spent||0),0)/Ce.length:0,s.currency)}),(0,D.jsx)(l.d1,{children:"Per customer in period"})]}),(0,D.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,D.jsx)(l.v0,{children:"Period Revenue"}),(0,D.jsx)(l.Os,{children:(0,c.vv)(Ce.reduce((e,r)=>e+(r.period_spent||0),0),s.currency)}),(0,D.jsxs)(l.d1,{children:["From ",Ce.length," customers"]})]})]}),(0,D.jsxs)(_,{children:[(0,D.jsxs)(I,{children:["Top Customers (",X?`${J.start} to ${J.end}`:G,")"]}),(0,D.jsxs)(P,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(R,{children:"Rank"}),(0,D.jsx)(R,{children:"Name"}),(0,D.jsx)(R,{children:"Phone"}),(0,D.jsx)(R,{children:"Type"}),(0,D.jsx)(R,{children:"Period Orders"}),(0,D.jsx)(R,{children:"Period Spent"}),(0,D.jsx)(R,{children:"Total Points"}),(0,D.jsx)(R,{children:"Tier"})]})}),(0,D.jsx)("tbody",{children:Ce.slice(0,20).map((e,r)=>{var t,n,o,i,l,a;return(0,D.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(T,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,D.jsx)(T,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,D.jsx)(T,{children:(null===(o=e.customer)||void 0===o?void 0:o.phone)||"-"}),(0,D.jsx)(T,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"#0369A1":"#6B7280"},children:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"Member":"Guest"})}),(0,D.jsx)(T,{children:e.period_orders||0}),(0,D.jsx)(T,{children:(0,c.vv)(e.period_spent||0,s.currency)}),(0,D.jsx)(T,{children:e.points||0}),(0,D.jsx)(T,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"operations"===Z?"block":"none"},children:[(0,D.jsx)(He,{}),ne||oe?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===ke?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(E,{children:[(0,D.jsxs)(l.hI,{color:"#10B981",children:[(0,D.jsx)(l.v0,{children:"Completed Orders"}),(0,D.jsx)(l.Os,{children:ke.toLocaleString()}),(0,D.jsxs)(l.d1,{children:[De.completionRate,"% fulfillment rate"]})]}),(0,D.jsxs)(l.hI,{color:"#F59E0B",children:[(0,D.jsx)(l.v0,{children:"Avg. Prep Time"}),(0,D.jsx)(l.Os,{children:De.avgPrepTime>0?`${De.avgPrepTime} min`:"N/A"}),(0,D.jsx)(l.d1,{children:De.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,D.jsxs)(l.hI,{color:"#EF4444",children:[(0,D.jsx)(l.v0,{children:"Peak Hour"}),(0,D.jsx)(l.Os,{children:De.peakHour}),(0,D.jsxs)(l.d1,{children:[De.peakHourOrders," orders in this slot"]})]}),(0,D.jsxs)(l.hI,{color:"#6366F1",children:[(0,D.jsx)(l.v0,{children:"Orders per Day"}),(0,D.jsx)(l.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(J.end).getTime()-new Date(J.start).getTime())/864e5)+1);return Math.round(ke/e)})()}),(0,D.jsx)(l.d1,{children:"Average daily orders"})]})]}),(0,D.jsxs)(_,{children:[(0,D.jsxs)(I,{children:["Peak Hours Performance (",X?`${J.start} to ${J.end}`:G,")"]}),(0,D.jsxs)(P,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(R,{children:"Time Slot"}),(0,D.jsx)(R,{children:"Orders"}),(0,D.jsx)(R,{children:"Revenue"}),(0,D.jsx)(R,{children:"Share"})]})}),(0,D.jsx)("tbody",{children:0===Ee.length?(0,D.jsx)("tr",{children:(0,D.jsx)(T,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Ee.map((e,r)=>(0,D.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,D.jsxs)(T,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,D.jsx)(T,{children:e.orders}),(0,D.jsx)(T,{children:(0,c.vv)(e.revenue,s.currency)}),(0,D.jsx)(T,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:ke>0?e.orders/ke*100:0}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[ke>0?Math.round(e.orders/ke*100):0,"%"]})]})})]},r))})]})]}),(0,D.jsxs)(O,{style:{marginTop:"24px"},children:[(0,D.jsx)(I,{children:"Hourly Order Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(w.E,{data:Ae,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(j.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>a});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
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
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,a=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(o,{children:[(0,s.jsx)(i,{children:r}),t&&(0,s.jsx)(l,{children:t})]})}},8406:(e,r,t)=>{t.d(r,{MQ:()=>a,Vp:()=>l,fU:()=>o,ng:()=>n,oB:()=>i,r6:()=>s});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,r,t)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(r)};return s.toLocaleString("en-MY",{...o,...t})},o=(e,r)=>s(e,r,{year:void 0,month:void 0,day:void 0}),i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const r=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},l=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const t=new Date;t.setDate(t.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:r,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const r=new Date;return r.setDate(r.getDate()+e),`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`}},a=e=>{if(!e)return"just now";const r=new Date(e).getTime();if(isNaN(r))return"just now";const t=Date.now()-r,n=Math.floor(t/6e4),s=Math.floor(t/36e5),o=Math.floor(t/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);