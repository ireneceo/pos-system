"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{3781:(e,r,t)=>{t.d(r,{Ay:()=>u});var n=t(8819),s=(t(9950),t(4752)),o=t(4414);const i=s.Ay.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`,a=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,l=s.Ay.button`
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
`,d=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  color: ${n.w.colors.secondary};

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 12px;
    width: 120px;
  }
`,c=s.Ay.div`
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
`,h=s.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F6F9FC;
  color: #0A2540;
  border: 1px solid ${n.w.colors.border};
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
`,u=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:s,onDateRangeChange:u,onDownload:x,showDownload:p=!1}=e;return(0,o.jsx)(i,{children:(0,o.jsxs)(a,{children:[(0,o.jsx)(l,{active:"today"===r&&!n,onClick:()=>s("today"),children:"Today"}),(0,o.jsx)(l,{active:"week"===r&&!n,onClick:()=>s("week"),children:"Week"}),(0,o.jsx)(l,{active:"month"===r&&!n,onClick:()=>s("month"),children:"Month"}),(0,o.jsx)(l,{active:"year"===r&&!n,onClick:()=>s("year"),children:"Year"}),(0,o.jsx)(l,{active:"all"===r&&!n,onClick:()=>s("all"),children:"All"}),(0,o.jsxs)(c,{children:[(0,o.jsx)(d,{type:"date",value:t.start,onChange:e=>u("start",e.target.value)}),(0,o.jsx)("span",{children:"to"}),(0,o.jsx)(d,{type:"date",value:t.end,onChange:e=>u("end",e.target.value)})]}),p&&x&&(0,o.jsxs)(h,{onClick:x,children:[(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,o.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>U});var n=t(8819),s=t(9950),o=t(4752),i=t(4492),a=t(2674),l=t(1367),d=t(9018),c=t(6038),h=t(8406);const u=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(u).join(",");var p=t(1095),g=t(2847),v=t(3245),j=t(158),m=t(3440),y=t(2174),f=t(4915),b=t(7621),F=t(5297),k=t(2528),w=t(294),S=t(3588),C=t(8012),A=t(3781),$=t(4414);const D=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,B=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,M=a.MD,E=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,O=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${n.w.colors.border};
`,I=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin-bottom: 20px;
`,_=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,P=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,R=o.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid ${n.w.colors.backgroundAlt};
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=o.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,z=o.Ay.div`
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
`,L=o.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,N=o.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,W=o.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,H=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],U=()=>{var e,r;const{user:t}=(0,l.As)(),{operationSettings:n}=(0,d.Pj)(),o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[U,K]=(0,i.ok)(),[V,Y]=(0,s.useState)(()=>U.get("tab")||"sales");(0,s.useEffect)(()=>{K({tab:V},{replace:!0})},[V,K]);const[Z,q]=(0,s.useState)("week"),[G,J]=(0,s.useState)(()=>{const e=new Date,r=o(e),t=new Date(e);t.setDate(t.getDate()-6);return{start:o(t),end:r}}),[Q,X]=(0,s.useState)(!1),[ee,re]=(0,s.useState)([]),[te,ne]=(0,s.useState)(!0),[se,oe]=(0,s.useState)(!1),[ie,ae]=(0,s.useState)(null),[le,de]=(0,s.useState)([]),[ce,he]=(0,s.useState)([]),[ue,xe]=(0,s.useState)([]),[pe,ge]=(0,s.useState)(null),[ve,je]=(0,s.useState)(new Set),[me,ye]=(0,s.useState)(new Set);(0,s.useEffect)(()=>{localStorage.setItem("reports_active_tab",V)},[V]),(0,s.useEffect)(()=>{n&&!Q&&Oe(Z)},[null===n||void 0===n?void 0:n.timeZone]);const fe=(0,s.useMemo)(()=>{if(null===pe||void 0===pe||!pe.dailySales||0===pe.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===Z)return pe.hourlySales?pe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===Z)return pe.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===Z)return pe.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return pe.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[pe,Z]),be=(0,s.useMemo)(()=>{var e;return(null===pe||void 0===pe||null===(e=pe.summary)||void 0===e?void 0:e.totalRevenue)||0},[pe]),Fe=(0,s.useMemo)(()=>{var e;return(null===pe||void 0===pe||null===(e=pe.summary)||void 0===e?void 0:e.totalOrders)||0},[pe]),ke=(0,s.useMemo)(()=>{if(null===pe||void 0===pe||!pe.categorySales||0===pe.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=pe.categorySales.reduce((e,r)=>e+r.revenue,0);return pe.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[pe]),we=(0,s.useMemo)(()=>{var e;if(null===pe||void 0===pe||!pe.menuSales||0===pe.menuSales.length)return[];const r=(null===(e=pe.menuSales[0])||void 0===e?void 0:e.quantity)||1;return pe.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[pe]),Se=(0,s.useMemo)(()=>null!==pe&&void 0!==pe&&pe.hourlySales?pe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[pe]),Ce=(0,s.useMemo)(()=>le.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[le]),Ae=(0,s.useMemo)(()=>{if(null===pe||void 0===pe||!pe.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;pe.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[pe]),$e=(0,s.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return console.log("\u274c No restaurant ID found"),void ne(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void ne(!1);const[r,n,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${t.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${t.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ae(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&de(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&he(e.data.items),e.data.categories&&xe(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{ne(!1)}},[null===t||void 0===t?void 0:t.restaurantId]),De=(0,s.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){oe(!0);try{const r=new URLSearchParams({startDate:G.start,endDate:G.end}),n=await fetch(`/api/dashboard/restaurant/${t.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&(ge(e.data),re([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{oe(!1)}}},[null===t||void 0===t?void 0:t.restaurantId,G.start,G.end]);(0,s.useEffect)(()=>{$e()},[$e]),(0,s.useEffect)(()=>{De()},[De]);const Be=(0,s.useMemo)(()=>{var e;if(null===pe||void 0===pe||!pe.hourlySales)return[];const r=(null===(e=pe.summary)||void 0===e?void 0:e.totalOrders)||1;return pe.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[pe]),Me=(0,s.useMemo)(()=>{if(null===pe||void 0===pe||!pe.dailySales||0===pe.dailySales.length)return{};const e={};return pe.dailySales.forEach(r=>{const[t,n,s]=r.date.split("-"),o=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[o]||(e[t].months[o]={month:o,revenue:0,orders:0,days:{}}),e[t].months[o].days[i]||(e[t].months[o].days[i]={day:i,revenue:0,orders:0});const a=r.revenue,l=r.orders;e[t].revenue+=a,e[t].orders+=l,e[t].months[o].revenue+=a,e[t].months[o].orders+=l,e[t].months[o].days[i].revenue+=a,e[t].months[o].days[i].orders+=l}),e},[pe]),Ee=()=>{const e=new Date(G.start),r=new Date(G.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Ee()})();s.useEffect(()=>{const e=Ee();if(e<=31){const e=new Set(Object.keys(Me)),r=new Set;Object.keys(Me).forEach(e=>{Object.keys(Me[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),je(e),ye(r)}else if(e<=365){const e=new Set(Object.keys(Me));je(e),ye(new Set)}else je(new Set),ye(new Set)},[G.start,G.end,Fe]);const Oe=async e=>{q(e),X(!1);const r=(()=>{var e,r,t;const s=(0,h.ng)(n),o=new Date,i=new Intl.DateTimeFormat("en-US",{timeZone:s,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o),a=parseInt((null===(e=i.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),l=parseInt((null===(r=i.find(e=>"month"===e.type))||void 0===r?void 0:r.value)||"0"),d=parseInt((null===(t=i.find(e=>"day"===e.type))||void 0===t?void 0:t.value)||"0");return new Date(a,l-1,d)})();let s=new Date(r);switch(e){case"today":s=new Date(r);break;case"week":s=new Date(r),s.setDate(s.getDate()-6);break;case"month":s=new Date(r),s.setDate(s.getDate()-29);break;case"year":s=new Date(r),s.setDate(s.getDate()-364);break;case"all":try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/dashboard/restaurant/${null===t||void 0===t?void 0:t.restaurantId}/earliest-order`,{headers:{Authorization:`Bearer ${e}`}}),o=await n.json();s=o.success&&o.data.earliestDate?new Date(o.data.earliestDate):new Date(r.getFullYear()-5,0,1)}catch{s=new Date(r.getFullYear()-5,0,1)}}const i=o(s),a=o(r);J({start:i,end:a})},Ie=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},_e=((0,s.useCallback)(()=>[],[]),(0,s.useCallback)(()=>{const e=["Date,Revenue"];return fe.forEach(r=>{e.push(`${u(r.date)},${Ie(r.sales)}`)}),e.join("\n")},[fe])),Pe=(0,s.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Me).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Me[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ie(t.revenue)},${t.orders},${Ie(s)}`)})})}),e.join("\n")},[Me]),Re=(0,s.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return we.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Ie(r.price),r.orders,Ie(r.revenue)]))}),e.join("\n")},[we]),Te=(0,s.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ce].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,o;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Ie(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ce]),ze=(0,s.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Be.forEach(r=>{e.push(x([r.time,r.orders,Ie(r.revenue)]))}),e.join("\n")},[Be]),Le=(0,s.useCallback)(()=>{let e;switch(V){case"sales":default:e=_e();break;case"details":e=Pe();break;case"menu":e=Re();break;case"customers":e=Te();break;case"operations":e=ze()}var r,n,s,o,i,a;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===t||void 0===t?void 0:t.restaurantId)||"report"}`,n=V,s=Z,o=Q,i=G.start,a=G.end,`${r}_${n}_${o?`${i}_${a}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[V,Z,Q,G,null===t||void 0===t?void 0:t.restaurantId,_e,Pe,Re,Te,ze]),Ne=(e,r)=>{J({...G,[e]:r}),X(!0)},We=()=>(0,$.jsx)(A.Ay,{activePeriod:Z,dateRange:G,isCustomDateRange:Q,onPeriodChange:Oe,onDateRangeChange:Ne,onDownload:Le,showDownload:!0,timezone:null===n||void 0===n?void 0:n.timeZone});return(0,$.jsx)($.Fragment,{children:(0,$.jsxs)(D,{children:[(0,$.jsx)(C.Ay,{title:"Reports"}),(0,$.jsxs)(B,{children:[(0,$.jsxs)(a.j,{children:[(0,$.jsx)(a.oz,{active:"sales"===V,onClick:()=>Y("sales"),children:"Sales Report"}),(0,$.jsx)(a.oz,{active:"details"===V,onClick:()=>Y("details"),children:"Sales Details"}),(0,$.jsx)(a.oz,{active:"menu"===V,onClick:()=>Y("menu"),children:"Menu Analysis"}),(0,$.jsx)(a.oz,{active:"customers"===V,onClick:()=>Y("customers"),children:"Customer Insights"}),(0,$.jsx)(a.oz,{active:"operations"===V,onClick:()=>Y("operations"),children:"Operations"})]}),(0,$.jsxs)("div",{style:{display:"sales"===V?"block":"none"},children:[(0,$.jsx)(We,{}),te||se?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(M,{children:[(0,$.jsxs)(a.hI,{color:"#059669",children:[(0,$.jsx)(a.v0,{children:"Total Revenue"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(be,n.currency)}),(0,$.jsxs)(a.d1,{children:[Fe," orders in selected period"]})]}),(0,$.jsxs)(a.hI,{color:"#2563EB",children:[(0,$.jsx)(a.v0,{children:"Total Orders"}),(0,$.jsx)(a.Os,{children:Fe.toLocaleString()}),(0,$.jsx)(a.d1,{children:"For selected period"})]}),(0,$.jsxs)(a.hI,{color:"#DC2626",children:[(0,$.jsx)(a.v0,{children:"Average Order Value"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(Fe>0?be/Fe:0,n.currency)}),(0,$.jsx)(a.d1,{children:"Per order"})]}),(0,$.jsxs)(a.hI,{color:"#7C3AED",children:[(0,$.jsx)(a.v0,{children:"Completed Orders"}),(0,$.jsx)(a.Os,{children:Fe}),(0,$.jsx)(a.d1,{children:"100% completion rate"})]})]}),(0,$.jsxs)(E,{children:[(0,$.jsxs)(O,{children:[(0,$.jsx)(I,{children:"Revenue Trend"}),(0,$.jsx)(p.u,{width:"100%",height:300,children:(0,$.jsxs)(g.b,{data:fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(j.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,$.jsxs)(O,{children:[(0,$.jsx)(I,{children:"Sales by Category"}),(0,$.jsx)(p.u,{width:"100%",height:300,children:(0,$.jsxs)(b.r,{children:[(0,$.jsx)(F.F,{data:ke,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:ke.map((e,r)=>(0,$.jsx)(k.f,{fill:H[r%H.length]},`cell-${r}`))}),(0,$.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,$.jsxs)(O,{children:[(0,$.jsx)(I,{children:"Hourly Orders Distribution"}),(0,$.jsx)(p.u,{width:"100%",height:250,children:(0,$.jsxs)(w.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(j.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,$.jsxs)("div",{style:{display:"details"===V?"block":"none"},children:[(0,$.jsx)(We,{}),te||se?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(M,{children:[(0,$.jsxs)(a.hI,{color:"#059669",children:[(0,$.jsx)(a.v0,{children:"Total Revenue"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(be,n.currency)}),(0,$.jsxs)(a.d1,{children:[Fe," orders in selected period"]})]}),(0,$.jsxs)(a.hI,{color:"#2563EB",children:[(0,$.jsx)(a.v0,{children:"Total Orders"}),(0,$.jsx)(a.Os,{children:Fe.toLocaleString()}),(0,$.jsxs)(a.d1,{children:[Fe," completed"]})]}),(0,$.jsxs)(a.hI,{color:"#DC2626",children:[(0,$.jsx)(a.v0,{children:"Average Order Value"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(Fe>0?be/Fe:0,n.currency)}),(0,$.jsx)(a.d1,{children:"Per order average"})]}),(0,$.jsxs)(a.hI,{color:"#7C3AED",children:[(0,$.jsx)(a.v0,{children:"Period"}),(0,$.jsx)(a.Os,{children:Q?Ee():"today"===Z?"1":"week"===Z?"7":"month"===Z?"30":"year"===Z?"365":Ee()}),(0,$.jsx)(a.d1,{children:Q?`${G.start} to ${G.end}`:"today"===Z?"Day":"Days"})]})]}),(0,$.jsxs)(_,{children:[(0,$.jsxs)(I,{children:["Detailed Sales Breakdown (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,$.jsxs)(P,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(R,{style:{width:"40%"},children:"Period"}),(0,$.jsx)(R,{style:{textAlign:"right"},children:"Revenue"}),(0,$.jsx)(R,{style:{textAlign:"right"},children:"Orders"}),(0,$.jsx)(R,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,$.jsx)("tbody",{children:Object.keys(Me).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Me[e],t=ve.has(e);return(0,$.jsxs)(s.Fragment,{children:[(0,$.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ve);if(r.has(e)){var t;r.delete(e);const n=new Set(me);Object.keys((null===(t=Me[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),ye(n)}else r.add(e);je(r)})(e),children:[(0,$.jsxs)(N,{level:0,bold:!0,children:[(0,$.jsx)(W,{expanded:t,children:"\u25b6"}),e]}),(0,$.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,n.currency)}),(0,$.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,$.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,n.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const o=r.months[t],i=`${e}-${t}`,a=me.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,$.jsxs)(s.Fragment,{children:[(0,$.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(me);r.has(e)?r.delete(e):r.add(e),ye(r)})(i),children:[(0,$.jsxs)(N,{level:1,bold:!0,children:[(0,$.jsx)(W,{expanded:a,children:"\u25b6"}),l]}),(0,$.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue,n.currency)}),(0,$.jsx)(N,{level:1,style:{textAlign:"right"},children:o.orders}),(0,$.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue/o.orders,n.currency)})]}),a&&Object.keys(o.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=o.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,$.jsxs)(L,{level:2,children:[(0,$.jsx)(N,{level:2,children:t}),(0,$.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,n.currency)}),(0,$.jsx)(N,{level:2,style:{textAlign:"right"},children:r.orders}),(0,$.jsx)(N,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,n.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,$.jsxs)("div",{style:{display:"menu"===V?"block":"none"},children:[(0,$.jsx)(We,{}),(0,$.jsxs)(M,{children:[(0,$.jsxs)(a.hI,{color:"#F59E0B",children:[(0,$.jsx)(a.v0,{children:"Best Seller"}),(0,$.jsx)(a.Os,{children:(null===(e=we[0])||void 0===e?void 0:e.name)||"N/A"}),(0,$.jsxs)(a.d1,{children:[(null===(r=we[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,$.jsxs)(a.hI,{color:"#10B981",children:[(0,$.jsx)(a.v0,{children:"Menu Items"}),(0,$.jsx)(a.Os,{children:we.length}),(0,$.jsx)(a.d1,{children:"Items with sales"})]}),(0,$.jsxs)(a.hI,{color:"#3B82F6",children:[(0,$.jsx)(a.v0,{children:"Items Sold"}),(0,$.jsx)(a.Os,{children:we.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,$.jsx)(a.d1,{children:"Total quantity sold"})]}),(0,$.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,$.jsx)(a.v0,{children:"Total Revenue"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(we.reduce((e,r)=>e+r.revenue,0),n.currency)}),(0,$.jsx)(a.d1,{children:"For selected period"})]})]}),(0,$.jsxs)(_,{children:[(0,$.jsxs)(I,{children:["Complete Menu Performance Ranking (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,$.jsxs)(P,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(R,{children:"Rank"}),(0,$.jsx)(R,{children:"Menu Item"}),(0,$.jsx)(R,{children:"Category"}),(0,$.jsx)(R,{children:"Price"}),(0,$.jsx)(R,{children:"Qty Sold"}),(0,$.jsx)(R,{children:"Revenue"}),(0,$.jsx)(R,{children:"Performance"})]})}),(0,$.jsx)("tbody",{children:we.map((e,r)=>{var t;const s=(null===(t=we[0])||void 0===t?void 0:t.orders)||1;return(0,$.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,$.jsxs)(T,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,$.jsx)(T,{style:{fontWeight:600},children:e.name}),(0,$.jsx)(T,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,$.jsx)(T,{children:(0,c.vv)(e.price,n.currency)}),(0,$.jsx)(T,{children:e.orders.toLocaleString()}),(0,$.jsx)(T,{children:(0,c.vv)(e.revenue,n.currency)}),(0,$.jsx)(T,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(z,{percentage:e.orders/s*100}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/s*100),"%"]})]})})]},r)})})]})]})]}),(0,$.jsxs)("div",{style:{display:"customers"===V?"block":"none"},children:[(0,$.jsx)(We,{}),te||se?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ce.length?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(M,{children:[(0,$.jsxs)(a.hI,{color:"#635BFF",children:[(0,$.jsx)(a.v0,{children:"Active Customers"}),(0,$.jsx)(a.Os,{children:Ce.length.toLocaleString()}),(0,$.jsxs)(a.d1,{children:[Ce.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Ce.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,$.jsxs)(a.hI,{color:"#00D924",children:[(0,$.jsx)(a.v0,{children:"Repeat Customers"}),(0,$.jsx)(a.Os,{children:Ce.filter(e=>e.period_orders>1).length}),(0,$.jsxs)(a.d1,{children:[Ce.length>0?Math.round(Ce.filter(e=>e.period_orders>1).length/Ce.length*100):0,"% ordered multiple times"]})]}),(0,$.jsxs)(a.hI,{color:"#FFB800",children:[(0,$.jsx)(a.v0,{children:"Average Spent"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(Ce.length>0?Ce.reduce((e,r)=>e+(r.period_spent||0),0)/Ce.length:0,n.currency)}),(0,$.jsx)(a.d1,{children:"Per customer in period"})]}),(0,$.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,$.jsx)(a.v0,{children:"Period Revenue"}),(0,$.jsx)(a.Os,{children:(0,c.vv)(Ce.reduce((e,r)=>e+(r.period_spent||0),0),n.currency)}),(0,$.jsxs)(a.d1,{children:["From ",Ce.length," customers"]})]})]}),(0,$.jsxs)(_,{children:[(0,$.jsxs)(I,{children:["Top Customers (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,$.jsxs)(P,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(R,{children:"Rank"}),(0,$.jsx)(R,{children:"Name"}),(0,$.jsx)(R,{children:"Phone"}),(0,$.jsx)(R,{children:"Type"}),(0,$.jsx)(R,{children:"Period Orders"}),(0,$.jsx)(R,{children:"Period Spent"}),(0,$.jsx)(R,{children:"Total Points"}),(0,$.jsx)(R,{children:"Tier"})]})}),(0,$.jsx)("tbody",{children:Ce.slice(0,20).map((e,r)=>{var t,s,o,i,a,l;return(0,$.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,$.jsxs)(T,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,$.jsx)(T,{style:{fontWeight:600},children:(null===(s=e.customer)||void 0===s?void 0:s.name)||"Guest"}),(0,$.jsx)(T,{children:(null===(o=e.customer)||void 0===o?void 0:o.phone)||"-"}),(0,$.jsx)(T,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,$.jsx)(T,{children:e.period_orders||0}),(0,$.jsx)(T,{children:(0,c.vv)(e.period_spent||0,n.currency)}),(0,$.jsx)(T,{children:e.points||0}),(0,$.jsx)(T,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,$.jsxs)("div",{style:{display:"operations"===V?"block":"none"},children:[(0,$.jsx)(We,{}),te||se?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===Fe?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(M,{children:[(0,$.jsxs)(a.hI,{color:"#10B981",children:[(0,$.jsx)(a.v0,{children:"Completed Orders"}),(0,$.jsx)(a.Os,{children:Fe.toLocaleString()}),(0,$.jsxs)(a.d1,{children:[Ae.completionRate,"% fulfillment rate"]})]}),(0,$.jsxs)(a.hI,{color:"#F59E0B",children:[(0,$.jsx)(a.v0,{children:"Avg. Prep Time"}),(0,$.jsx)(a.Os,{children:Ae.avgPrepTime>0?`${Ae.avgPrepTime} min`:"N/A"}),(0,$.jsx)(a.d1,{children:Ae.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,$.jsxs)(a.hI,{color:"#EF4444",children:[(0,$.jsx)(a.v0,{children:"Peak Hour"}),(0,$.jsx)(a.Os,{children:Ae.peakHour}),(0,$.jsxs)(a.d1,{children:[Ae.peakHourOrders," orders in this slot"]})]}),(0,$.jsxs)(a.hI,{color:"#6366F1",children:[(0,$.jsx)(a.v0,{children:"Orders per Day"}),(0,$.jsx)(a.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(G.end).getTime()-new Date(G.start).getTime())/864e5)+1);return Math.round(Fe/e)})()}),(0,$.jsx)(a.d1,{children:"Average daily orders"})]})]}),(0,$.jsxs)(_,{children:[(0,$.jsxs)(I,{children:["Peak Hours Performance (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,$.jsxs)(P,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(R,{children:"Time Slot"}),(0,$.jsx)(R,{children:"Orders"}),(0,$.jsx)(R,{children:"Revenue"}),(0,$.jsx)(R,{children:"Share"})]})}),(0,$.jsx)("tbody",{children:0===Be.length?(0,$.jsx)("tr",{children:(0,$.jsx)(T,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Be.map((e,r)=>(0,$.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,$.jsxs)(T,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,$.jsx)(T,{children:e.orders}),(0,$.jsx)(T,{children:(0,c.vv)(e.revenue,n.currency)}),(0,$.jsx)(T,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(z,{percentage:Fe>0?e.orders/Fe*100:0}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[Fe>0?Math.round(e.orders/Fe*100):0,"%"]})]})})]},r))})]})]}),(0,$.jsxs)(O,{style:{marginTop:"24px"},children:[(0,$.jsx)(I,{children:"Hourly Order Distribution"}),(0,$.jsx)(p.u,{width:"100%",height:250,children:(0,$.jsxs)(w.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(j.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(S.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>d});var n=t(8819),s=(t(9950),t(4752)),o=t(4414);const i=s.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${n.w.colors.border};
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
`,a=s.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,l=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:r,children:t}=e;return(0,o.jsxs)(i,{children:[(0,o.jsx)(a,{children:r}),t&&(0,o.jsx)(l,{children:t})]})}},8406:(e,r,t)=>{t.d(r,{MQ:()=>l,Vp:()=>a,fU:()=>o,ng:()=>n,oB:()=>i,r6:()=>s});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,r,t)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(r)};return s.toLocaleString("en-MY",{...o,...t})},o=(e,r)=>s(e,r,{year:void 0,month:void 0,day:void 0}),i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const r=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const t=new Date;t.setDate(t.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:r,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const r=new Date;return r.setDate(r.getDate()+e),`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const r=new Date(e).getTime();if(isNaN(r))return"just now";const t=Date.now()-r,n=Math.floor(t/6e4),s=Math.floor(t/36e5),o=Math.floor(t/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);