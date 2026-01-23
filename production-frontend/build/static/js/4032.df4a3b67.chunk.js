"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4032],{4032:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var n=r(9950),s=r(4752),o=r(4492),a=r(3310),d=r(2674),i=r(1367),l=r(9018),c=r(6038),h=r(8406),u=r(1095),x=r(2847),p=r(3245),g=r(158),m=r(3440),j=r(4094),v=r(4915),y=r(7621),f=r(5297),F=r(2528),b=r(294),S=r(3588),w=r(8012),A=r(4414);const $=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,k=s.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,E=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,O=s.Ay.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 16px 0;
  }
`,C=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,M=s.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
  }
`,D=s.Ay.button`
  padding: 12px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #5A51E6;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`,I=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,R=d.MD,B=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,T=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,P=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,L=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,N=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,z=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,U=s.Ay.div`
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
`,W=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,Y=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,H=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,V=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],K=()=>{var e,t;const{user:r}=(0,i.As)(),{operationSettings:s}=(0,l.Pj)(),K=()=>{var e,t,r;const n=(0,h.ng)(s),o=new Date,a=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(o),d=parseInt((null===(e=a.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),i=parseInt((null===(t=a.find(e=>"month"===e.type))||void 0===t?void 0:t.value)||"0"),l=parseInt((null===(r=a.find(e=>"day"===e.type))||void 0===r?void 0:r.value)||"0");return new Date(d,i-1,l)},G=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[Z,J]=(0,o.ok)(),[q,Q]=(0,n.useState)(()=>Z.get("tab")||"sales");(0,n.useEffect)(()=>{J({tab:q},{replace:!0})},[q,J]);const[X,ee]=(0,n.useState)("week"),[te,re]=(0,n.useState)(()=>{const e=new Date,t=G(e),r=new Date(e);r.setDate(r.getDate()-6);return{start:G(r),end:t}}),[ne,se]=(0,n.useState)(!1),[oe,ae]=(0,n.useState)([]),[de,ie]=(0,n.useState)(!0),[le,ce]=(0,n.useState)(null),[he,ue]=(0,n.useState)([]),[xe,pe]=(0,n.useState)([]),[ge,me]=(0,n.useState)([]),[je,ve]=(0,n.useState)(new Set),[ye,fe]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{localStorage.setItem("reports_active_tab",q)},[q]),(0,n.useEffect)(()=>{s&&!ne&&Ce(X)},[null===s||void 0===s?void 0:s.timeZone]);const Fe=(0,n.useMemo)(()=>{if(!oe||0===oe.length)return[];const e=new Date(te.start);e.setHours(0,0,0,0);const t=new Date(te.end);return t.setHours(23,59,59,999),oe.filter(r=>{const n=r.order_date||r.createdAt;if(!n)return!1;const s=new Date(n),o=s>=e&&s<=t,a="completed"===r.status;return o&&a})},[oe,te.start,te.end]),be=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e=e=>new Date(e.order_date||e.createdAt),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0);if("today"===X){const r={};return Fe.forEach(n=>{const s=e(n).getHours(),o=12===s?"12PM":s>12?s-12+"PM":`${s}AM`;r[o]=(r[o]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===X){const r=K(),n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],s=[];for(let e=6;e>=0;e--){const t=new Date(r);t.setDate(t.getDate()-e),s.push(t)}const o={};return Fe.forEach(r=>{const n=e(r),s=G(n);o[s]=(o[s]||0)+t(r)}),s.map(e=>{const t=G(e);return{date:n[e.getDay()],sales:Math.round(o[t]||0)}})}if("month"===X){const r={};return Fe.forEach(n=>{const s=e(n),o=`${(s.getMonth()+1).toString().padStart(2,"0")}/${s.getDate().toString().padStart(2,"0")}`;r[o]=(r[o]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>e.date.localeCompare(t.date))}{const r=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Fe.forEach(s=>{const o=r[e(s).getMonth()];n[o]=(n[o]||0)+t(s)}),r.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Fe,X]),Se=(0,n.useMemo)(()=>{if(0===Fe.length)return[{name:"No Data",value:100,sales:0}];const e={},t={};ge.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)}),xe.forEach(r=>{if(r.id){const n=r.categoryId?t[r.categoryId.toString()]||r.categoryId:"Other";e[r.id.toString()]=n}});const r={};let n=0;Fe.forEach(t=>{t.order_items&&Array.isArray(t.order_items)&&t.order_items.forEach(t=>{var s,o,a,d;const i=parseFloat(t.price||0)*parseInt(t.quantity||1);n+=i;const l=(null===(s=t.menuItem)||void 0===s||null===(o=s.id)||void 0===o?void 0:o.toString())||(null===(a=t.product_id)||void 0===a?void 0:a.toString())||(null===(d=t.id)||void 0===d?void 0:d.toString()),c=l&&e[l]||"Other";r[c]=(r[c]||0)+i})});const s=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return s.length>0?s:[{name:"No Data",value:100,sales:0}]},[Fe,xe,ge]),we=(0,n.useMemo)(()=>{var e;if(0===Fe.length)return[];const t={};ge.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};xe.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Fe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,s,o;const a=e.menu_name||e.name||"Unknown",d=(null===(t=e.menuItem)||void 0===t||null===(s=t.id)||void 0===s?void 0:s.toString())||(null===(o=e.product_id)||void 0===o?void 0:o.toString()),i=d?r[d]||"Other":e.category||"Other";n[a]||(n[a]={category:i,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[a].orders+=l,n[a].revenue+=c*l})});const s=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),o=(null===(e=s[0])||void 0===e?void 0:e.orders)||1;return s.forEach(e=>{e.performance=Math.round(e.orders/o*100)}),s},[Fe,xe,ge]),Ae=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e={};return Fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Fe]),$e=async()=>{if(null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found"),void ie(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void ie(!1);const t=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),n=await fetch(`/api/orders?restaurant_id=${r.restaurantId}&limit=0`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),s=await fetch(`/api/customers/${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),o=await fetch(`/api/menu?restaurantId=${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();ce(e.data||e)}if(n.ok){const e=await n.json();ae(e.data||e||[])}if(s.ok){const e=await s.json();e.success&&Array.isArray(e.data)&&ue(e.data)}if(o.ok){const e=await o.json();e.success&&e.data&&(e.data.items&&pe(e.data.items),e.data.categories&&me(e.data.categories))}}catch(e){console.error("\u274c Error fetching restaurant data:",e)}finally{ie(!1)}};(0,n.useEffect)(()=>{$e();const e=setInterval(()=>{$e()},3e4);return()=>clearInterval(e)},[r]);const ke=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e={};return Fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Fe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Fe]),Ee=(0,n.useMemo)(()=>{if(0===Fe.length)return{};const e={};return Fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t),n=r.getFullYear().toString(),s=`${n}-${(r.getMonth()+1).toString().padStart(2,"0")}`,o=r.toISOString().split("T")[0];e[n]||(e[n]={year:n,revenue:0,orders:0,months:{}}),e[n].months[s]||(e[n].months[s]={month:s,revenue:0,orders:0,days:{}}),e[n].months[s].days[o]||(e[n].months[s].days[o]={day:o,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t);e[n].revenue+=a,e[n].orders+=1,e[n].months[s].revenue+=a,e[n].months[s].orders+=1,e[n].months[s].days[o].revenue+=a,e[n].months[s].days[o].orders+=1}),e},[Fe]),Oe=()=>{const e=new Date(te.start),t=new Date(te.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(()=>{const e=Oe()})();n.useEffect(()=>{const e=Oe();if(e<=31){const e=new Set(Object.keys(Ee)),t=new Set;Object.keys(Ee).forEach(e=>{Object.keys(Ee[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),ve(e),fe(t)}else if(e<=365){const e=new Set(Object.keys(Ee));ve(e),fe(new Set)}else ve(new Set),fe(new Set)},[te.start,te.end,Fe.length]);const Ce=e=>{ee(e),se(!1);const t=K();let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r=new Date(t),r.setDate(r.getDate()-6);break;case"month":r=new Date(t),r.setDate(r.getDate()-29);break;case"year":r=new Date(t),r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":if(oe.length>0){r=oe.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}const n=G(r),s=G(t);re({start:n,end:s})},Me=()=>{const e=be.reduce((e,t)=>e+t.sales,0),t=Fe.length,n=t>0?e/t:0,s=Fe.filter(e=>"completed"===e.status).length,o=he.filter(e=>e.total_orders>1).length,a={period:ne?`${te.start} to ${te.end}`:X,generatedAt:(new Date).toISOString(),restaurantId:null===r||void 0===r?void 0:r.restaurantId,tab:q,data:{sales:{totalRevenue:e,totalOrders:t,completedOrders:s,averageOrderValue:n,salesData:be,categoryData:Se,hourlyData:Ae},menu:{menuItems:we,totalItems:we.length,totalRevenue:we.reduce((e,t)=>e+t.revenue,0),totalOrders:we.reduce((e,t)=>e+t.orders,0)},customers:{totalCustomers:he.length,repeatCustomers:o,repeatRate:he.length>0?(o/he.length*100).toFixed(1):"0",customerList:he,totalRevenue:he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0),avgSpent:he.length>0?he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/he.length:0},operations:{peakTimes:ke,totalOrders:t,avgPreparationTime:"15 mins"},details:{drilldownData:Ee}}},d=De(a),i=new Blob([d],{type:"text/csv;charset=utf-8;"}),l=document.createElement("a");l.href=URL.createObjectURL(i),l.download=`restaurant_${null===r||void 0===r?void 0:r.restaurantId}_report_${q}_${te.start}_to_${te.end}.csv`,l.click()},De=e=>{const t=(0,h.ng)(s);let r="Restaurant Analytics Report\n";return r+=`Restaurant ID,${e.restaurantId||"N/A"}\n`,r+=`Generated,${(new Date).toLocaleString("en-MY",{timeZone:t})}\n`,r+=`Period,${e.period}\n`,r+=`Report Type,${e.tab.toUpperCase()}\n\n`,"sales"===q?(r+="SALES SUMMARY\n",r+=`Total Revenue,${(0,c.vv)(e.data.sales.totalRevenue,s.currency)}\n`,r+=`Total Orders,${e.data.sales.totalOrders}\n`,r+=`Completed Orders,${e.data.sales.completedOrders}\n`,r+=`Average Order Value,${(0,c.vv)(e.data.sales.averageOrderValue,s.currency)}\n\n`,r+="DAILY SALES TREND\n",r+="Date,Revenue (RM),Orders\n",e.data.sales.salesData.forEach(e=>{r+=`${e.date},${e.sales.toFixed(2)},${e.orders||0}\n`}),r+="\nCATEGORY PERFORMANCE\n",r+="Category,Percentage,Revenue (RM)\n",e.data.sales.categoryData.forEach(e=>{var t;r+=`${e.name},${e.value}%,${(null===(t=e.sales)||void 0===t?void 0:t.toFixed(2))||"0.00"}\n`}),r+="\nHOURLY ORDER DISTRIBUTION\n",r+="Hour,Orders\n",e.data.sales.hourlyData.forEach(e=>{r+=`${e.hour},${e.orders}\n`})):"details"===q?(r+="DETAILED SALES BREAKDOWN\n",r+="Period,Revenue (RM),Orders,Avg Order Value (RM)\n",Object.keys(e.data.details.drilldownData).sort((e,t)=>t.localeCompare(e)).forEach(t=>{const n=e.data.details.drilldownData[t];r+=`${t},${n.revenue.toFixed(2)},${n.orders},${(n.revenue/n.orders).toFixed(2)}\n`,Object.keys(n.months).sort((e,t)=>t.localeCompare(e)).forEach(e=>{const t=n.months[e],s=new Date(e+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});r+=`  ${s},${t.revenue.toFixed(2)},${t.orders},${(t.revenue/t.orders).toFixed(2)}\n`,Object.keys(t.days).sort((e,t)=>t.localeCompare(e)).forEach(e=>{const n=t.days[e],s=new Date(e).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric"});r+=`    ${s},${n.revenue.toFixed(2)},${n.orders},${(n.revenue/n.orders).toFixed(2)}\n`})})})):"menu"===q?(r+="MENU PERFORMANCE ANALYSIS\n",r+=`Total Menu Items,${e.data.menu.totalItems}\n`,r+=`Total Revenue,${(0,c.vv)(e.data.menu.totalRevenue,s.currency)}\n`,r+=`Total Orders,${e.data.menu.totalOrders}\n\n`,r+="COMPLETE MENU RANKING\n",r+="Rank,Item Name,Category,Price (RM),Orders,Revenue (RM),Performance %\n",e.data.menu.menuItems.forEach((t,n)=>{var s;const o=(null===(s=e.data.menu.menuItems[0])||void 0===s?void 0:s.orders)||1,a=Math.round(t.orders/o*100);r+=`${n+1},${t.name},${t.category},${t.price.toFixed(2)},${t.orders},${t.revenue.toFixed(2)},${a}\n`})):"customers"===q?(r+="CUSTOMER INSIGHTS SUMMARY\n",r+=`Total Customers,${e.data.customers.totalCustomers}\n`,r+=`Repeat Customers,${e.data.customers.repeatCustomers}\n`,r+=`Repeat Rate,${e.data.customers.repeatRate}%\n`,r+=`Total Revenue,${(0,c.vv)(e.data.customers.totalRevenue,s.currency)}\n`,r+=`Average Spent per Customer,${(0,c.vv)(e.data.customers.avgSpent,s.currency)}\n\n`,r+="TOP CUSTOMERS\n",r+="Rank,Name,Phone,Type,Total Orders,Total Spent (RM),Points,Tier\n",e.data.customers.customerList.sort((e,t)=>parseFloat(t.total_spent||0)-parseFloat(e.total_spent||0)).slice(0,50).forEach((e,t)=>{r+=`${t+1},${e.customer.name},${e.customer.phone},${e.customer.type},${e.total_orders},${parseFloat(e.total_spent||0).toFixed(2)},${e.points||0},${e.tier||"Bronze"}\n`})):"operations"===q&&(r+="OPERATIONS PERFORMANCE\n",r+=`Total Orders,${e.data.operations.totalOrders}\n`,r+=`Average Preparation Time,${e.data.operations.avgPreparationTime}\n\n`,r+="PEAK TIMES ANALYSIS\n",r+="Time Slot,Orders,Revenue (RM),Efficiency %\n",e.data.operations.peakTimes.forEach(e=>{r+=`${e.time},${e.orders},${e.revenue},${e.efficiency}\n`})),r},Ie=()=>(0,A.jsxs)(O,{children:[(0,A.jsxs)(C,{children:[(0,A.jsx)(M,{active:"today"===X&&!ne,onClick:()=>Ce("today"),children:"Today"}),(0,A.jsx)(M,{active:"week"===X&&!ne,onClick:()=>Ce("week"),children:"Week"}),(0,A.jsx)(M,{active:"month"===X&&!ne,onClick:()=>Ce("month"),children:"Month"}),(0,A.jsx)(M,{active:"year"===X&&!ne,onClick:()=>Ce("year"),children:"Year"}),(0,A.jsx)(M,{active:"all"===X&&!ne,onClick:()=>Ce("all"),children:"All"}),(0,A.jsxs)(E,{children:[(0,A.jsx)(k,{type:"date",value:te.start,onChange:e=>{re({...te,start:e.target.value}),se(!0)}}),(0,A.jsx)("span",{children:"to"}),(0,A.jsx)(k,{type:"date",value:te.end,onChange:e=>{re({...te,end:e.target.value}),se(!0)}})]})]}),(0,A.jsxs)(D,{onClick:Me,children:[(0,A.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,A.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,A.jsx)(a.A,{children:(0,A.jsxs)($,{children:[(0,A.jsx)(w.Ay,{title:"Reports"}),(0,A.jsxs)(I,{children:[(0,A.jsxs)(d.j,{children:[(0,A.jsx)(d.oz,{active:"sales"===q,onClick:()=>Q("sales"),children:"Sales Report"}),(0,A.jsx)(d.oz,{active:"details"===q,onClick:()=>Q("details"),children:"Sales Details"}),(0,A.jsx)(d.oz,{active:"menu"===q,onClick:()=>Q("menu"),children:"Menu Analysis"}),(0,A.jsx)(d.oz,{active:"customers"===q,onClick:()=>Q("customers"),children:"Customer Insights"}),(0,A.jsx)(d.oz,{active:"operations"===q,onClick:()=>Q("operations"),children:"Operations"})]}),(0,A.jsxs)("div",{style:{display:"sales"===q?"block":"none"},children:[(0,A.jsx)(Ie,{}),de?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(R,{children:[(0,A.jsxs)(d.hI,{color:"#059669",children:[(0,A.jsx)(d.v0,{children:"Total Revenue"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(be.reduce((e,t)=>e+t.sales,0),s.currency)}),(0,A.jsxs)(d.d1,{children:[Fe.length," orders in selected period"]})]}),(0,A.jsxs)(d.hI,{color:"#2563EB",children:[(0,A.jsx)(d.v0,{children:"Total Orders"}),(0,A.jsx)(d.Os,{children:Fe.length.toLocaleString()}),(0,A.jsx)(d.d1,{children:"For selected period"})]}),(0,A.jsxs)(d.hI,{color:"#DC2626",children:[(0,A.jsx)(d.v0,{children:"Average Order Value"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(Fe.length>0?be.reduce((e,t)=>e+t.sales,0)/Fe.length:0,s.currency)}),(0,A.jsx)(d.d1,{children:"Per order"})]}),(0,A.jsxs)(d.hI,{color:"#7C3AED",children:[(0,A.jsx)(d.v0,{children:"Completed Orders"}),(0,A.jsx)(d.Os,{children:Fe.filter(e=>"completed"===e.status).length}),(0,A.jsxs)(d.d1,{children:[Math.round(Fe.filter(e=>"completed"===e.status).length/Fe.length*100||0),"% completion rate"]})]})]}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(T,{children:[(0,A.jsx)(_,{children:"Revenue Trend"}),(0,A.jsx)(u.u,{width:"100%",height:300,children:(0,A.jsxs)(x.b,{data:be,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(g.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(v.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,A.jsxs)(T,{children:[(0,A.jsx)(_,{children:"Sales by Category"}),(0,A.jsx)(u.u,{width:"100%",height:300,children:(0,A.jsxs)(y.r,{children:[(0,A.jsx)(f.F,{data:Se,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Se.map((e,t)=>(0,A.jsx)(F.f,{fill:V[t%V.length]},`cell-${t}`))}),(0,A.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,A.jsxs)(T,{children:[(0,A.jsx)(_,{children:"Hourly Orders Distribution"}),(0,A.jsx)(u.u,{width:"100%",height:250,children:(0,A.jsxs)(b.E,{data:Ae,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(g.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,A.jsxs)("div",{style:{display:"details"===q?"block":"none"},children:[(0,A.jsx)(Ie,{}),de?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(R,{children:[(0,A.jsxs)(d.hI,{color:"#059669",children:[(0,A.jsx)(d.v0,{children:"Total Revenue"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(be.reduce((e,t)=>e+t.sales,0),s.currency)}),(0,A.jsxs)(d.d1,{children:[Fe.length," orders in selected period"]})]}),(0,A.jsxs)(d.hI,{color:"#2563EB",children:[(0,A.jsx)(d.v0,{children:"Total Orders"}),(0,A.jsx)(d.Os,{children:Fe.length.toLocaleString()}),(0,A.jsxs)(d.d1,{children:[Fe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,A.jsxs)(d.hI,{color:"#DC2626",children:[(0,A.jsx)(d.v0,{children:"Average Order Value"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(Fe.length>0?be.reduce((e,t)=>e+t.sales,0)/Fe.length:0,s.currency)}),(0,A.jsx)(d.d1,{children:"Per order average"})]}),(0,A.jsxs)(d.hI,{color:"#7C3AED",children:[(0,A.jsx)(d.v0,{children:"Period"}),(0,A.jsx)(d.Os,{children:ne?Oe():"today"===X?"1":"week"===X?"7":"month"===X?"30":"year"===X?"365":Oe()}),(0,A.jsx)(d.d1,{children:ne?`${te.start} to ${te.end}`:"today"===X?"Day":"Days"})]})]}),(0,A.jsxs)(P,{children:[(0,A.jsxs)(_,{children:["Detailed Sales Breakdown (",ne?`${te.start} to ${te.end}`:X,")"]}),(0,A.jsxs)(L,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(N,{style:{width:"40%"},children:"Period"}),(0,A.jsx)(N,{style:{textAlign:"right"},children:"Revenue"}),(0,A.jsx)(N,{style:{textAlign:"right"},children:"Orders"}),(0,A.jsx)(N,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,A.jsx)("tbody",{children:Object.keys(Ee).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Ee[e],r=je.has(e);return(0,A.jsxs)(n.Fragment,{children:[(0,A.jsxs)(W,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(je);if(t.has(e)){var r;t.delete(e);const n=new Set(ye);Object.keys((null===(r=Ee[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),fe(n)}else t.add(e);ve(t)})(e),children:[(0,A.jsxs)(Y,{level:0,bold:!0,children:[(0,A.jsx)(H,{expanded:r,children:"\u25b6"}),e]}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,s.currency)}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,A.jsx)(Y,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,s.currency)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const o=t.months[r],a=`${e}-${r}`,d=ye.has(a),i=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,A.jsxs)(n.Fragment,{children:[(0,A.jsxs)(W,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(ye);t.has(e)?t.delete(e):t.add(e),fe(t)})(a),children:[(0,A.jsxs)(Y,{level:1,bold:!0,children:[(0,A.jsx)(H,{expanded:d,children:"\u25b6"}),i]}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue,s.currency)}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:o.orders}),(0,A.jsx)(Y,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue/o.orders,s.currency)})]}),d&&Object.keys(o.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=o.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,A.jsxs)(W,{level:2,children:[(0,A.jsx)(Y,{level:2,children:r}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,s.currency)}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right"},children:t.orders}),(0,A.jsx)(Y,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,s.currency)})]},e)})]},a)})]},e)})})]})]})]})]}),(0,A.jsxs)("div",{style:{display:"menu"===q?"block":"none"},children:[(0,A.jsx)(Ie,{}),(0,A.jsxs)(R,{children:[(0,A.jsxs)(d.hI,{color:"#F59E0B",children:[(0,A.jsx)(d.v0,{children:"Best Seller"}),(0,A.jsx)(d.Os,{children:(null===(e=we[0])||void 0===e?void 0:e.name)||"N/A"}),(0,A.jsxs)(d.d1,{children:[(null===(t=we[0])||void 0===t?void 0:t.orders)||0," orders in ","today"===X?"today":`this ${X}`]})]}),(0,A.jsxs)(d.hI,{color:"#10B981",children:[(0,A.jsx)(d.v0,{children:"Total Items Analyzed"}),(0,A.jsx)(d.Os,{children:we.length}),(0,A.jsx)(d.d1,{children:"Complete menu analysis"})]}),(0,A.jsxs)(d.hI,{color:"#3B82F6",children:[(0,A.jsx)(d.v0,{children:"Total Orders"}),(0,A.jsx)(d.Os,{children:we.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,A.jsx)(d.d1,{children:"For selected period"})]}),(0,A.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,A.jsx)(d.v0,{children:"Total Revenue"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(we.reduce((e,t)=>e+t.revenue,0),s.currency)}),(0,A.jsx)(d.d1,{children:"For selected period"})]})]}),(0,A.jsxs)(P,{children:[(0,A.jsxs)(_,{children:["Complete Menu Performance Ranking (",ne?`${te.start} to ${te.end}`:X,")"]}),(0,A.jsxs)(L,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(N,{children:"Rank"}),(0,A.jsx)(N,{children:"Menu Item"}),(0,A.jsx)(N,{children:"Category"}),(0,A.jsx)(N,{children:"Price"}),(0,A.jsx)(N,{children:"Orders"}),(0,A.jsx)(N,{children:"Revenue"}),(0,A.jsx)(N,{children:"Performance"})]})}),(0,A.jsx)("tbody",{children:we.map((e,t)=>{var r;const n=(null===(r=we[0])||void 0===r?void 0:r.orders)||1;return(0,A.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsxs)(z,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,A.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,A.jsx)(z,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,A.jsx)(z,{children:(0,c.vv)(e.price,s.currency)}),(0,A.jsx)(z,{children:e.orders.toLocaleString()}),(0,A.jsx)(z,{children:(0,c.vv)(e.revenue,s.currency)}),(0,A.jsx)(z,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(U,{percentage:e.orders/n*100}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,A.jsxs)("div",{style:{display:"customers"===q?"block":"none"},children:[(0,A.jsx)(Ie,{}),de?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===he.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customer data available"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(R,{children:[(0,A.jsxs)(d.hI,{color:"#635BFF",children:[(0,A.jsx)(d.v0,{children:"Total Customers"}),(0,A.jsx)(d.Os,{children:he.length.toLocaleString()}),(0,A.jsxs)(d.d1,{children:[he.filter(e=>"member"===e.customer.type).length," members, ",he.filter(e=>"guest"===e.customer.type).length," guests"]})]}),(0,A.jsxs)(d.hI,{color:"#00D924",children:[(0,A.jsx)(d.v0,{children:"Repeat Customers"}),(0,A.jsx)(d.Os,{children:he.filter(e=>e.total_orders>1).length}),(0,A.jsxs)(d.d1,{children:[he.length>0?Math.round(he.filter(e=>e.total_orders>1).length/he.length*100):0,"% return rate"]})]}),(0,A.jsxs)(d.hI,{color:"#FFB800",children:[(0,A.jsx)(d.v0,{children:"Average Spent"}),(0,A.jsx)(d.Os,{children:(0,c.vv)(he.length>0?he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/he.length:0,s.currency)}),(0,A.jsx)(d.d1,{children:"Per customer"})]}),(0,A.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,A.jsx)(d.v0,{children:"Total Points"}),(0,A.jsx)(d.Os,{children:he.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,A.jsx)(d.d1,{children:"Across all customers"})]})]}),(0,A.jsxs)(P,{children:[(0,A.jsx)(_,{children:"Top Customers"}),(0,A.jsxs)(L,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(N,{children:"Rank"}),(0,A.jsx)(N,{children:"Name"}),(0,A.jsx)(N,{children:"Phone"}),(0,A.jsx)(N,{children:"Type"}),(0,A.jsx)(N,{children:"Orders"}),(0,A.jsx)(N,{children:"Total Spent"}),(0,A.jsx)(N,{children:"Points"}),(0,A.jsx)(N,{children:"Tier"})]})}),(0,A.jsx)("tbody",{children:he.sort((e,t)=>parseFloat(t.total_spent||0)-parseFloat(e.total_spent||0)).slice(0,10).map((e,t)=>(0,A.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsxs)(z,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,A.jsx)(z,{style:{fontWeight:600},children:e.customer.name}),(0,A.jsx)(z,{children:e.customer.phone}),(0,A.jsx)(z,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===e.customer.type?"#E0F2FE":"#F3F4F6",color:"member"===e.customer.type?"#0369A1":"#6B7280"},children:"member"===e.customer.type?"Member":"Guest"})}),(0,A.jsx)(z,{children:e.total_orders||0}),(0,A.jsx)(z,{children:(0,c.vv)(parseFloat(e.total_spent||0),s.currency)}),(0,A.jsx)(z,{children:e.points||0}),(0,A.jsx)(z,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},e.customer.id))})]})]})]})]}),(0,A.jsxs)("div",{style:{display:"operations"===q?"block":"none"},children:[(0,A.jsx)(Ie,{}),(0,A.jsxs)(R,{children:[(0,A.jsxs)(d.hI,{color:"#10B981",children:[(0,A.jsx)(d.v0,{children:"Order Fulfillment"}),(0,A.jsxs)(d.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,A.jsx)(d.d1,{children:"On-time completion"})]}),(0,A.jsxs)(d.hI,{color:"#F59E0B",children:[(0,A.jsx)(d.v0,{children:"Avg. Wait Time"}),(0,A.jsxs)(d.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,A.jsxs)(d.d1,{children:["-",Math.round(1+4*Math.random())," min from target"]})]}),(0,A.jsxs)(d.hI,{color:"#EF4444",children:[(0,A.jsx)(d.v0,{children:"Peak Hour"}),(0,A.jsx)(d.Os,{children:"12-1 PM"}),(0,A.jsxs)(d.d1,{children:[Math.round(45*("today"===X?1:"week"===X?7:"month"===X?30:365)*(.8+.4*Math.random()))," orders/","today"===X?"hour":X]})]}),(0,A.jsxs)(d.hI,{color:"#6366F1",children:[(0,A.jsx)(d.v0,{children:"Staff Efficiency"}),(0,A.jsxs)(d.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,A.jsxs)(d.d1,{children:["+",(6*Math.random()).toFixed(1),"% from last ","today"===X?"day":X]})]})]}),(0,A.jsxs)(P,{children:[(0,A.jsx)(_,{children:"Peak Hours Performance"}),(0,A.jsxs)(L,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(N,{children:"Time Slot"}),(0,A.jsx)(N,{children:"Orders"}),(0,A.jsx)(N,{children:"Revenue"}),(0,A.jsx)(N,{children:"Efficiency"})]})}),(0,A.jsx)("tbody",{children:ke.map((e,t)=>(0,A.jsxs)("tr",{children:[(0,A.jsx)(z,{style:{fontWeight:600},children:e.time}),(0,A.jsx)(z,{children:e.orders}),(0,A.jsx)(z,{children:(0,c.vv)(e.revenue,s.currency)}),(0,A.jsx)(z,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(U,{percentage:e.efficiency}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]})]})]})})}},8012:(e,t,r)=>{r.d(t,{Ay:()=>i});r(9950);var n=r(4752),s=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,d=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,i=e=>{let{title:t,children:r}=e;return(0,s.jsxs)(o,{children:[(0,s.jsx)(a,{children:t}),r&&(0,s.jsx)(d,{children:r})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>a,fU:()=>o,ng:()=>n,r6:()=>s});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,t,r)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const o={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return s.toLocaleString("en-MY",{...o,...r})},o=(e,t)=>s(e,t,{year:void 0,month:void 0,day:void 0}),a=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),s=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===o?"1 day ago":`${o} days ago`}}}]);