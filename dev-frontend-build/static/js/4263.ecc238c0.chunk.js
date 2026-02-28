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
`,h=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:h,onDateRangeChange:u,onDownload:x,showDownload:p=!1}=e;return(0,s.jsx)(o,{children:(0,s.jsxs)(i,{children:[(0,s.jsx)(a,{active:"today"===r&&!n,onClick:()=>h("today"),children:"Today"}),(0,s.jsx)(a,{active:"week"===r&&!n,onClick:()=>h("week"),children:"Week"}),(0,s.jsx)(a,{active:"month"===r&&!n,onClick:()=>h("month"),children:"Month"}),(0,s.jsx)(a,{active:"year"===r&&!n,onClick:()=>h("year"),children:"Year"}),(0,s.jsx)(a,{active:"all"===r&&!n,onClick:()=>h("all"),children:"All"}),(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{type:"date",value:t.start,onChange:e=>u("start",e.target.value)}),(0,s.jsx)("span",{children:"to"}),(0,s.jsx)(l,{type:"date",value:t.end,onChange:e=>u("end",e.target.value)})]}),p&&x&&(0,s.jsxs)(c,{onClick:x,children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,s.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>H});var n=t(9950),s=t(4752),o=t(4492),i=t(2674),a=t(1367),l=t(9018),d=t(6038),c=t(8406);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},u=e=>e.map(h).join(",");var x=t(1095),p=t(2847),g=t(3245),v=t(158),j=t(3440),m=t(2174),y=t(4915),f=t(7621),F=t(5297),b=t(2528),k=t(294),w=t(3588),S=t(8012),A=t(3781),C=t(4414);const D=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,$=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,B=i.MD,E=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,M=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,O=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,I=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,P=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,R=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,T=s.Ay.div`
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
`,z=s.Ay.tr`
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
`,N=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,W=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],H=()=>{var e,r;const{user:t}=(0,a.As)(),{operationSettings:s}=(0,l.Pj)(),H=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[U,K]=(0,o.ok)(),[V,Y]=(0,n.useState)(()=>U.get("tab")||"sales");(0,n.useEffect)(()=>{K({tab:V},{replace:!0})},[V,K]);const[Z,q]=(0,n.useState)("week"),[G,J]=(0,n.useState)(()=>{const e=new Date,r=H(e),t=new Date(e);t.setDate(t.getDate()-6);return{start:H(t),end:r}}),[Q,X]=(0,n.useState)(!1),[ee,re]=(0,n.useState)([]),[te,ne]=(0,n.useState)(!0),[se,oe]=(0,n.useState)(!1),[ie,ae]=(0,n.useState)(null),[le,de]=(0,n.useState)([]),[ce,he]=(0,n.useState)([]),[ue,xe]=(0,n.useState)([]),[pe,ge]=(0,n.useState)(null),[ve,je]=(0,n.useState)(new Set),[me,ye]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{localStorage.setItem("reports_active_tab",V)},[V]),(0,n.useEffect)(()=>{s&&!Q&&Oe(Z)},[null===s||void 0===s?void 0:s.timeZone]);const fe=(0,n.useMemo)(()=>{if(null===pe||void 0===pe||!pe.dailySales||0===pe.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===Z)return pe.hourlySales?pe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===Z)return pe.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===Z)return pe.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return pe.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[pe,Z]),Fe=(0,n.useMemo)(()=>{var e;return(null===pe||void 0===pe||null===(e=pe.summary)||void 0===e?void 0:e.totalRevenue)||0},[pe]),be=(0,n.useMemo)(()=>{var e;return(null===pe||void 0===pe||null===(e=pe.summary)||void 0===e?void 0:e.totalOrders)||0},[pe]),ke=(0,n.useMemo)(()=>{if(null===pe||void 0===pe||!pe.categorySales||0===pe.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=pe.categorySales.reduce((e,r)=>e+r.revenue,0);return pe.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[pe]),we=(0,n.useMemo)(()=>{var e;if(null===pe||void 0===pe||!pe.menuSales||0===pe.menuSales.length)return[];const r=(null===(e=pe.menuSales[0])||void 0===e?void 0:e.quantity)||1;return pe.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[pe]),Se=(0,n.useMemo)(()=>null!==pe&&void 0!==pe&&pe.hourlySales?pe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[pe]),Ae=(0,n.useMemo)(()=>le.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[le]),Ce=(0,n.useMemo)(()=>{if(null===pe||void 0===pe||!pe.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;pe.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[pe]),De=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return console.log("\u274c No restaurant ID found"),void ne(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void ne(!1);const[r,n,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${t.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${t.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ae(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&de(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&he(e.data.items),e.data.categories&&xe(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{ne(!1)}},[null===t||void 0===t?void 0:t.restaurantId]),$e=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){oe(!0);try{const r=new URLSearchParams({startDate:G.start,endDate:G.end}),n=await fetch(`/api/dashboard/restaurant/${t.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&(ge(e.data),re([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{oe(!1)}}},[null===t||void 0===t?void 0:t.restaurantId,G.start,G.end]);(0,n.useEffect)(()=>{De()},[De]),(0,n.useEffect)(()=>{$e()},[$e]);const Be=(0,n.useMemo)(()=>{var e;if(null===pe||void 0===pe||!pe.hourlySales)return[];const r=(null===(e=pe.summary)||void 0===e?void 0:e.totalOrders)||1;return pe.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[pe]),Ee=(0,n.useMemo)(()=>{if(null===pe||void 0===pe||!pe.dailySales||0===pe.dailySales.length)return{};const e={};return pe.dailySales.forEach(r=>{const[t,n,s]=r.date.split("-"),o=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[o]||(e[t].months[o]={month:o,revenue:0,orders:0,days:{}}),e[t].months[o].days[i]||(e[t].months[o].days[i]={day:i,revenue:0,orders:0});const a=r.revenue,l=r.orders;e[t].revenue+=a,e[t].orders+=l,e[t].months[o].revenue+=a,e[t].months[o].orders+=l,e[t].months[o].days[i].revenue+=a,e[t].months[o].days[i].orders+=l}),e},[pe]),Me=()=>{const e=new Date(G.start),r=new Date(G.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Me()})();n.useEffect(()=>{const e=Me();if(e<=31){const e=new Set(Object.keys(Ee)),r=new Set;Object.keys(Ee).forEach(e=>{Object.keys(Ee[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),je(e),ye(r)}else if(e<=365){const e=new Set(Object.keys(Ee));je(e),ye(new Set)}else je(new Set),ye(new Set)},[G.start,G.end,be]);const Oe=async e=>{q(e),X(!1);const r=(()=>{var e,r,t;const n=(0,c.ng)(s),o=new Date,i=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o),a=parseInt((null===(e=i.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),l=parseInt((null===(r=i.find(e=>"month"===e.type))||void 0===r?void 0:r.value)||"0"),d=parseInt((null===(t=i.find(e=>"day"===e.type))||void 0===t?void 0:t.value)||"0");return new Date(a,l-1,d)})();let n=new Date(r);switch(e){case"today":n=new Date(r);break;case"week":n=new Date(r),n.setDate(n.getDate()-6);break;case"month":n=new Date(r),n.setDate(n.getDate()-29);break;case"year":n=new Date(r),n.setDate(n.getDate()-364);break;case"all":try{const e=localStorage.getItem("auth_token"),s=await fetch(`/api/dashboard/restaurant/${null===t||void 0===t?void 0:t.restaurantId}/earliest-order`,{headers:{Authorization:`Bearer ${e}`}}),o=await s.json();n=o.success&&o.data.earliestDate?new Date(o.data.earliestDate):new Date(r.getFullYear()-5,0,1)}catch{n=new Date(r.getFullYear()-5,0,1)}}const o=H(n),i=H(r);J({start:o,end:i})},Ie=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},_e=((0,n.useCallback)(()=>[],[]),(0,n.useCallback)(()=>{const e=["Date,Revenue"];return fe.forEach(r=>{e.push(`${h(r.date)},${Ie(r.sales)}`)}),e.join("\n")},[fe])),Pe=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ee).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Ee[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ie(t.revenue)},${t.orders},${Ie(s)}`)})})}),e.join("\n")},[Ee]),Re=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return we.forEach((r,t)=>{e.push(u([t+1,r.name,r.category,Ie(r.price),r.orders,Ie(r.revenue)]))}),e.join("\n")},[we]),Te=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ae].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,o;e.push(u([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Ie(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ae]),ze=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Be.forEach(r=>{e.push(u([r.time,r.orders,Ie(r.revenue)]))}),e.join("\n")},[Be]),Le=(0,n.useCallback)(()=>{let e;switch(V){case"sales":default:e=_e();break;case"details":e=Pe();break;case"menu":e=Re();break;case"customers":e=Te();break;case"operations":e=ze()}var r,n,s,o,i,a;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===t||void 0===t?void 0:t.restaurantId)||"report"}`,n=V,s=Z,o=Q,i=G.start,a=G.end,`${r}_${n}_${o?`${i}_${a}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[V,Z,Q,G,null===t||void 0===t?void 0:t.restaurantId,_e,Pe,Re,Te,ze]),Ne=(e,r)=>{J({...G,[e]:r}),X(!0)},We=()=>(0,C.jsx)(A.Ay,{activePeriod:Z,dateRange:G,isCustomDateRange:Q,onPeriodChange:Oe,onDateRangeChange:Ne,onDownload:Le,showDownload:!0,timezone:null===s||void 0===s?void 0:s.timeZone});return(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)(D,{children:[(0,C.jsx)(S.Ay,{title:"Reports"}),(0,C.jsxs)($,{children:[(0,C.jsxs)(i.j,{children:[(0,C.jsx)(i.oz,{active:"sales"===V,onClick:()=>Y("sales"),children:"Sales Report"}),(0,C.jsx)(i.oz,{active:"details"===V,onClick:()=>Y("details"),children:"Sales Details"}),(0,C.jsx)(i.oz,{active:"menu"===V,onClick:()=>Y("menu"),children:"Menu Analysis"}),(0,C.jsx)(i.oz,{active:"customers"===V,onClick:()=>Y("customers"),children:"Customer Insights"}),(0,C.jsx)(i.oz,{active:"operations"===V,onClick:()=>Y("operations"),children:"Operations"})]}),(0,C.jsxs)("div",{style:{display:"sales"===V?"block":"none"},children:[(0,C.jsx)(We,{}),te||se?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===be?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(i.hI,{color:"#059669",children:[(0,C.jsx)(i.v0,{children:"Total Revenue"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(Fe,s.currency)}),(0,C.jsxs)(i.d1,{children:[be," orders in selected period"]})]}),(0,C.jsxs)(i.hI,{color:"#2563EB",children:[(0,C.jsx)(i.v0,{children:"Total Orders"}),(0,C.jsx)(i.Os,{children:be.toLocaleString()}),(0,C.jsx)(i.d1,{children:"For selected period"})]}),(0,C.jsxs)(i.hI,{color:"#DC2626",children:[(0,C.jsx)(i.v0,{children:"Average Order Value"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(be>0?Fe/be:0,s.currency)}),(0,C.jsx)(i.d1,{children:"Per order"})]}),(0,C.jsxs)(i.hI,{color:"#7C3AED",children:[(0,C.jsx)(i.v0,{children:"Completed Orders"}),(0,C.jsx)(i.Os,{children:be}),(0,C.jsx)(i.d1,{children:"100% completion rate"})]})]}),(0,C.jsxs)(E,{children:[(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Revenue Trend"}),(0,C.jsx)(x.u,{width:"100%",height:300,children:(0,C.jsxs)(p.b,{data:fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(v.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(m.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Sales by Category"}),(0,C.jsx)(x.u,{width:"100%",height:300,children:(0,C.jsxs)(f.r,{children:[(0,C.jsx)(F.F,{data:ke,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:ke.map((e,r)=>(0,C.jsx)(b.f,{fill:W[r%W.length]},`cell-${r}`))}),(0,C.jsx)(m.m,{formatter:e=>`${e}%`})]})})]})]}),(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Hourly Orders Distribution"}),(0,C.jsx)(x.u,{width:"100%",height:250,children:(0,C.jsxs)(k.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(m.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,C.jsxs)("div",{style:{display:"details"===V?"block":"none"},children:[(0,C.jsx)(We,{}),te||se?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===be?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(i.hI,{color:"#059669",children:[(0,C.jsx)(i.v0,{children:"Total Revenue"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(Fe,s.currency)}),(0,C.jsxs)(i.d1,{children:[be," orders in selected period"]})]}),(0,C.jsxs)(i.hI,{color:"#2563EB",children:[(0,C.jsx)(i.v0,{children:"Total Orders"}),(0,C.jsx)(i.Os,{children:be.toLocaleString()}),(0,C.jsxs)(i.d1,{children:[be," completed"]})]}),(0,C.jsxs)(i.hI,{color:"#DC2626",children:[(0,C.jsx)(i.v0,{children:"Average Order Value"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(be>0?Fe/be:0,s.currency)}),(0,C.jsx)(i.d1,{children:"Per order average"})]}),(0,C.jsxs)(i.hI,{color:"#7C3AED",children:[(0,C.jsx)(i.v0,{children:"Period"}),(0,C.jsx)(i.Os,{children:Q?Me():"today"===Z?"1":"week"===Z?"7":"month"===Z?"30":"year"===Z?"365":Me()}),(0,C.jsx)(i.d1,{children:Q?`${G.start} to ${G.end}`:"today"===Z?"Day":"Days"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Detailed Sales Breakdown (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,C.jsxs)(_,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(P,{style:{width:"40%"},children:"Period"}),(0,C.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,C.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,C.jsx)(P,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,C.jsx)("tbody",{children:Object.keys(Ee).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Ee[e],t=ve.has(e);return(0,C.jsxs)(n.Fragment,{children:[(0,C.jsxs)(z,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ve);if(r.has(e)){var t;r.delete(e);const n=new Set(me);Object.keys((null===(t=Ee[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),ye(n)}else r.add(e);je(r)})(e),children:[(0,C.jsxs)(L,{level:0,bold:!0,children:[(0,C.jsx)(N,{expanded:t,children:"\u25b6"}),e]}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue,s.currency)}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,s.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const o=r.months[t],i=`${e}-${t}`,a=me.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,C.jsxs)(n.Fragment,{children:[(0,C.jsxs)(z,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(me);r.has(e)?r.delete(e):r.add(e),ye(r)})(i),children:[(0,C.jsxs)(L,{level:1,bold:!0,children:[(0,C.jsx)(N,{expanded:a,children:"\u25b6"}),l]}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,d.vv)(o.revenue,s.currency)}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:o.orders}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,d.vv)(o.revenue/o.orders,s.currency)})]}),a&&Object.keys(o.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=o.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,C.jsxs)(z,{level:2,children:[(0,C.jsx)(L,{level:2,children:t}),(0,C.jsx)(L,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,d.vv)(r.revenue,s.currency)}),(0,C.jsx)(L,{level:2,style:{textAlign:"right"},children:r.orders}),(0,C.jsx)(L,{level:2,style:{textAlign:"right"},children:(0,d.vv)(r.revenue/r.orders,s.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,C.jsxs)("div",{style:{display:"menu"===V?"block":"none"},children:[(0,C.jsx)(We,{}),(0,C.jsxs)(B,{children:[(0,C.jsxs)(i.hI,{color:"#F59E0B",children:[(0,C.jsx)(i.v0,{children:"Best Seller"}),(0,C.jsx)(i.Os,{children:(null===(e=we[0])||void 0===e?void 0:e.name)||"N/A"}),(0,C.jsxs)(i.d1,{children:[(null===(r=we[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,C.jsxs)(i.hI,{color:"#10B981",children:[(0,C.jsx)(i.v0,{children:"Menu Items"}),(0,C.jsx)(i.Os,{children:we.length}),(0,C.jsx)(i.d1,{children:"Items with sales"})]}),(0,C.jsxs)(i.hI,{color:"#3B82F6",children:[(0,C.jsx)(i.v0,{children:"Items Sold"}),(0,C.jsx)(i.Os,{children:we.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,C.jsx)(i.d1,{children:"Total quantity sold"})]}),(0,C.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,C.jsx)(i.v0,{children:"Total Revenue"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(we.reduce((e,r)=>e+r.revenue,0),s.currency)}),(0,C.jsx)(i.d1,{children:"For selected period"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Complete Menu Performance Ranking (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,C.jsxs)(_,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(P,{children:"Rank"}),(0,C.jsx)(P,{children:"Menu Item"}),(0,C.jsx)(P,{children:"Category"}),(0,C.jsx)(P,{children:"Price"}),(0,C.jsx)(P,{children:"Qty Sold"}),(0,C.jsx)(P,{children:"Revenue"}),(0,C.jsx)(P,{children:"Performance"})]})}),(0,C.jsx)("tbody",{children:we.map((e,r)=>{var t;const n=(null===(t=we[0])||void 0===t?void 0:t.orders)||1;return(0,C.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,C.jsxs)(R,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,C.jsx)(R,{style:{fontWeight:600},children:e.name}),(0,C.jsx)(R,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,C.jsx)(R,{children:(0,d.vv)(e.price,s.currency)}),(0,C.jsx)(R,{children:e.orders.toLocaleString()}),(0,C.jsx)(R,{children:(0,d.vv)(e.revenue,s.currency)}),(0,C.jsx)(R,{children:(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,C.jsx)(T,{percentage:e.orders/n*100}),(0,C.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,C.jsxs)("div",{style:{display:"customers"===V?"block":"none"},children:[(0,C.jsx)(We,{}),te||se?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ae.length?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(i.hI,{color:"#635BFF",children:[(0,C.jsx)(i.v0,{children:"Active Customers"}),(0,C.jsx)(i.Os,{children:Ae.length.toLocaleString()}),(0,C.jsxs)(i.d1,{children:[Ae.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Ae.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,C.jsxs)(i.hI,{color:"#00D924",children:[(0,C.jsx)(i.v0,{children:"Repeat Customers"}),(0,C.jsx)(i.Os,{children:Ae.filter(e=>e.period_orders>1).length}),(0,C.jsxs)(i.d1,{children:[Ae.length>0?Math.round(Ae.filter(e=>e.period_orders>1).length/Ae.length*100):0,"% ordered multiple times"]})]}),(0,C.jsxs)(i.hI,{color:"#FFB800",children:[(0,C.jsx)(i.v0,{children:"Average Spent"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(Ae.length>0?Ae.reduce((e,r)=>e+(r.period_spent||0),0)/Ae.length:0,s.currency)}),(0,C.jsx)(i.d1,{children:"Per customer in period"})]}),(0,C.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,C.jsx)(i.v0,{children:"Period Revenue"}),(0,C.jsx)(i.Os,{children:(0,d.vv)(Ae.reduce((e,r)=>e+(r.period_spent||0),0),s.currency)}),(0,C.jsxs)(i.d1,{children:["From ",Ae.length," customers"]})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Top Customers (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,C.jsxs)(_,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(P,{children:"Rank"}),(0,C.jsx)(P,{children:"Name"}),(0,C.jsx)(P,{children:"Phone"}),(0,C.jsx)(P,{children:"Type"}),(0,C.jsx)(P,{children:"Period Orders"}),(0,C.jsx)(P,{children:"Period Spent"}),(0,C.jsx)(P,{children:"Total Points"}),(0,C.jsx)(P,{children:"Tier"})]})}),(0,C.jsx)("tbody",{children:Ae.slice(0,20).map((e,r)=>{var t,n,o,i,a,l;return(0,C.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,C.jsxs)(R,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,C.jsx)(R,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,C.jsx)(R,{children:(null===(o=e.customer)||void 0===o?void 0:o.phone)||"-"}),(0,C.jsx)(R,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,C.jsx)(R,{children:e.period_orders||0}),(0,C.jsx)(R,{children:(0,d.vv)(e.period_spent||0,s.currency)}),(0,C.jsx)(R,{children:e.points||0}),(0,C.jsx)(R,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,C.jsxs)("div",{style:{display:"operations"===V?"block":"none"},children:[(0,C.jsx)(We,{}),te||se?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===be?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(i.hI,{color:"#10B981",children:[(0,C.jsx)(i.v0,{children:"Completed Orders"}),(0,C.jsx)(i.Os,{children:be.toLocaleString()}),(0,C.jsxs)(i.d1,{children:[Ce.completionRate,"% fulfillment rate"]})]}),(0,C.jsxs)(i.hI,{color:"#F59E0B",children:[(0,C.jsx)(i.v0,{children:"Avg. Prep Time"}),(0,C.jsx)(i.Os,{children:Ce.avgPrepTime>0?`${Ce.avgPrepTime} min`:"N/A"}),(0,C.jsx)(i.d1,{children:Ce.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,C.jsxs)(i.hI,{color:"#EF4444",children:[(0,C.jsx)(i.v0,{children:"Peak Hour"}),(0,C.jsx)(i.Os,{children:Ce.peakHour}),(0,C.jsxs)(i.d1,{children:[Ce.peakHourOrders," orders in this slot"]})]}),(0,C.jsxs)(i.hI,{color:"#6366F1",children:[(0,C.jsx)(i.v0,{children:"Orders per Day"}),(0,C.jsx)(i.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(G.end).getTime()-new Date(G.start).getTime())/864e5)+1);return Math.round(be/e)})()}),(0,C.jsx)(i.d1,{children:"Average daily orders"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Peak Hours Performance (",Q?`${G.start} to ${G.end}`:Z,")"]}),(0,C.jsxs)(_,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(P,{children:"Time Slot"}),(0,C.jsx)(P,{children:"Orders"}),(0,C.jsx)(P,{children:"Revenue"}),(0,C.jsx)(P,{children:"Share"})]})}),(0,C.jsx)("tbody",{children:0===Be.length?(0,C.jsx)("tr",{children:(0,C.jsx)(R,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Be.map((e,r)=>(0,C.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,C.jsxs)(R,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,C.jsx)(R,{children:e.orders}),(0,C.jsx)(R,{children:(0,d.vv)(e.revenue,s.currency)}),(0,C.jsx)(R,{children:(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,C.jsx)(T,{percentage:be>0?e.orders/be*100:0}),(0,C.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[be>0?Math.round(e.orders/be*100):0,"%"]})]})})]},r))})]})]}),(0,C.jsxs)(M,{style:{marginTop:"24px"},children:[(0,C.jsx)(O,{children:"Hourly Order Distribution"}),(0,C.jsx)(x.u,{width:"100%",height:250,children:(0,C.jsxs)(k.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(m.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>l});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
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