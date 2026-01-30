"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4032],{4032:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var n=r(9950),a=r(4752),s=r(4492),o=r(3310),i=r(2674),d=r(1367),l=r(9018),c=r(6038),h=r(8406),u=r(1095),x=r(2847),p=r(3245),m=r(158),g=r(3440),v=r(4094),j=r(4915),y=r(7621),f=r(5297),F=r(2528),S=r(294),w=r(3588),A=r(8012),b=r(4414);const $=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,k=a.Ay.input`
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
`,E=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,D=a.Ay.div`
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
`,O=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,C=a.Ay.button`
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
`,I=a.Ay.button`
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
`,M=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,R=i.MD,T=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,B=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,P=a.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,L=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,N=a.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,z=a.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,U=a.Ay.div`
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
`,Y=a.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,W=a.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,K=a.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,V=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Z=()=>{var e,t;const{user:r}=(0,d.As)(),{operationSettings:a}=(0,l.Pj)(),Z=()=>{var e,t,r;const n=(0,h.ng)(a),s=new Date,o=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(s),i=parseInt((null===(e=o.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),d=parseInt((null===(t=o.find(e=>"month"===e.type))||void 0===t?void 0:t.value)||"0"),l=parseInt((null===(r=o.find(e=>"day"===e.type))||void 0===r?void 0:r.value)||"0");return new Date(i,d-1,l)},H=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[G,J]=(0,s.ok)(),[q,Q]=(0,n.useState)(()=>G.get("tab")||"sales");(0,n.useEffect)(()=>{J({tab:q},{replace:!0})},[q,J]);const[X,ee]=(0,n.useState)("week"),[te,re]=(0,n.useState)(()=>{const e=new Date,t=H(e),r=new Date(e);r.setDate(r.getDate()-6);return{start:H(r),end:t}}),[ne,ae]=(0,n.useState)(!1),[se,oe]=(0,n.useState)([]),[ie,de]=(0,n.useState)(!0),[le,ce]=(0,n.useState)(null),[he,ue]=(0,n.useState)([]),[xe,pe]=(0,n.useState)([]),[me,ge]=(0,n.useState)([]),[ve,je]=(0,n.useState)(new Set),[ye,fe]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{localStorage.setItem("reports_active_tab",q)},[q]),(0,n.useEffect)(()=>{a&&!ne&&Ce(X)},[null===a||void 0===a?void 0:a.timeZone]);const Fe=(0,n.useMemo)(()=>{if(!se||0===se.length)return[];const e=(0,h.ng)(a);return se.filter(t=>{const r=t.order_date||t.createdAt;if(!r)return!1;const n=(0,h.iF)(r,e),a=n>=te.start&&n<=te.end,s="completed"===t.status;return a&&s})},[se,te.start,te.end,a]),Se=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e=(0,h.ng)(a),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=t=>{var r,n,a,s;const o=new Date(t),i=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short"}).formatToParts(o);return{year:parseInt((null===(r=i.find(e=>"year"===e.type))||void 0===r?void 0:r.value)||"0"),month:parseInt((null===(n=i.find(e=>"month"===e.type))||void 0===n?void 0:n.value)||"0"),day:parseInt((null===(a=i.find(e=>"day"===e.type))||void 0===a?void 0:a.value)||"0"),weekday:(null===(s=i.find(e=>"weekday"===e.type))||void 0===s?void 0:s.value)||""}};if("today"===X){const r={};return Fe.forEach(n=>{const a=(t=>{const r=new Date(t),n=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"numeric",hour12:!1});return parseInt(n.format(r))})(n.order_date||n.createdAt),s=12===a?"12PM":a>12?a-12+"PM":0===a?"12AM":`${a}AM`;r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===X){const r=Z(),n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],a=[];for(let e=6;e>=0;e--){const t=new Date(r);t.setDate(t.getDate()-e),a.push(t)}const s={};return Fe.forEach(r=>{const n=r.order_date||r.createdAt,a=(0,h.iF)(n,e);s[a]=(s[a]||0)+t(r)}),a.map(e=>{const t=H(e);return{date:n[e.getDay()],sales:Math.round(s[t]||0)}})}if("month"===X){const e={};return Fe.forEach(n=>{const a=n.order_date||n.createdAt,s=r(a),o=`${s.month.toString().padStart(2,"0")}/${s.day.toString().padStart(2,"0")}`;e[o]=(e[o]||0)+t(n)}),Object.entries(e).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>e.date.localeCompare(t.date))}{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return Fe.forEach(a=>{const s=a.order_date||a.createdAt,o=r(s),i=e[o.month-1];n[i]=(n[i]||0)+t(a)}),e.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[Fe,X,a]),we=(0,n.useMemo)(()=>Fe.reduce((e,t)=>e+parseFloat(t.final_price||t.total_amount||t.total_price||0),0),[Fe]),Ae=(0,n.useMemo)(()=>{if(0===Fe.length)return[{name:"No Data",value:100,sales:0}];const e={},t={};me.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)}),xe.forEach(r=>{if(r.id){const n=r.categoryId?t[r.categoryId.toString()]||r.categoryId:"Other";e[r.id.toString()]=n}});const r={};let n=0;Fe.forEach(t=>{t.order_items&&Array.isArray(t.order_items)&&t.order_items.forEach(t=>{var a,s,o,i;const d=parseFloat(t.price||0)*parseInt(t.quantity||1);n+=d;const l=(null===(a=t.menuItem)||void 0===a||null===(s=a.id)||void 0===s?void 0:s.toString())||(null===(o=t.product_id)||void 0===o?void 0:o.toString())||(null===(i=t.id)||void 0===i?void 0:i.toString()),c=l&&e[l]||"Other";r[c]=(r[c]||0)+d})});const a=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return a.length>0?a:[{name:"No Data",value:100,sales:0}]},[Fe,xe,me]),be=(0,n.useMemo)(()=>{var e;if(0===Fe.length)return[];const t={};me.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};xe.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};Fe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,a,s;const o=e.menu_name||e.name||"Unknown",i=(null===(t=e.menuItem)||void 0===t||null===(a=t.id)||void 0===a?void 0:a.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),d=i?r[i]||"Other":e.category||"Other";n[o]||(n[o]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[o].orders+=l,n[o].revenue+=c*l})});const a=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),s=(null===(e=a[0])||void 0===e?void 0:e.orders)||1;return a.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),a},[Fe,xe,me]),$e=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e={};return Fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[Fe]),ke=async()=>{if(null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found"),void de(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void de(!1);const t=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),n=await fetch(`/api/orders?restaurant_id=${r.restaurantId}&limit=0`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),a=await fetch(`/api/customers/${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),s=await fetch(`/api/menu?restaurantId=${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();ce(e.data||e)}if(n.ok){const e=await n.json();oe(e.data||e||[])}if(a.ok){const e=await a.json();e.success&&Array.isArray(e.data)&&ue(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&pe(e.data.items),e.data.categories&&ge(e.data.categories))}}catch(e){console.error("\u274c Error fetching restaurant data:",e)}finally{de(!1)}};(0,n.useEffect)(()=>{ke();const e=setInterval(()=>{ke()},3e4);return()=>clearInterval(e)},[r]);const Ee=(0,n.useMemo)(()=>{if(0===Fe.length)return[];const e={};return Fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(Fe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[Fe]),De=(0,n.useMemo)(()=>{if(0===Fe.length)return{};const e=(0,h.ng)(a),t={};return Fe.forEach(r=>{const n=(t=>{const r=new Date(t),n=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r),[a,s,o]=n.split("-");return{year:a,month:s,day:o,dateStr:n}})(r.order_date||r.createdAt),a=n.year,s=`${n.year}-${n.month}`,o=n.dateStr;t[a]||(t[a]={year:a,revenue:0,orders:0,months:{}}),t[a].months[s]||(t[a].months[s]={month:s,revenue:0,orders:0,days:{}}),t[a].months[s].days[o]||(t[a].months[s].days[o]={day:o,revenue:0,orders:0});const i=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);t[a].revenue+=i,t[a].orders+=1,t[a].months[s].revenue+=i,t[a].months[s].orders+=1,t[a].months[s].days[o].revenue+=i,t[a].months[s].days[o].orders+=1}),t},[Fe,a]),Oe=()=>{const e=new Date(te.start),t=new Date(te.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(()=>{const e=Oe()})();n.useEffect(()=>{const e=Oe();if(e<=31){const e=new Set(Object.keys(De)),t=new Set;Object.keys(De).forEach(e=>{Object.keys(De[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),je(e),fe(t)}else if(e<=365){const e=new Set(Object.keys(De));je(e),fe(new Set)}else je(new Set),fe(new Set)},[te.start,te.end,Fe.length]);const Ce=e=>{ee(e),ae(!1);const t=Z();let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r=new Date(t),r.setDate(r.getDate()-6);break;case"month":r=new Date(t),r.setDate(r.getDate()-29);break;case"year":r=new Date(t),r.setFullYear(r.getFullYear()-1),r.setDate(r.getDate()+1);break;case"all":if(se.length>0){r=se.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}const n=H(r),a=H(t);re({start:n,end:a})},Ie=()=>{const e=Fe.length,t=e>0?we/e:0,n=Fe.filter(e=>"completed"===e.status).length,a=he.filter(e=>e.total_orders>1).length,s={period:ne?`${te.start} to ${te.end}`:X,generatedAt:(new Date).toISOString(),restaurantId:null===r||void 0===r?void 0:r.restaurantId,tab:q,data:{sales:{totalRevenue:we,totalOrders:e,completedOrders:n,averageOrderValue:t,salesData:Se,categoryData:Ae,hourlyData:$e},menu:{menuItems:be,totalItems:be.length,totalRevenue:be.reduce((e,t)=>e+t.revenue,0),totalOrders:be.reduce((e,t)=>e+t.orders,0)},customers:{totalCustomers:he.length,repeatCustomers:a,repeatRate:he.length>0?(a/he.length*100).toFixed(1):"0",customerList:he,totalRevenue:he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0),avgSpent:he.length>0?he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/he.length:0},operations:{peakTimes:Ee,totalOrders:e,avgPreparationTime:"15 mins"},details:{drilldownData:De}}},o=Me(s),i=new Blob([o],{type:"text/csv;charset=utf-8;"}),d=document.createElement("a");d.href=URL.createObjectURL(i),d.download=`restaurant_${null===r||void 0===r?void 0:r.restaurantId}_report_${q}_${te.start}_to_${te.end}.csv`,d.click()},Me=e=>{const t=(0,h.ng)(a);let r="Restaurant Analytics Report\n";return r+=`Restaurant ID,${e.restaurantId||"N/A"}\n`,r+=`Generated,${(new Date).toLocaleString("en-MY",{timeZone:t})}\n`,r+=`Period,${e.period}\n`,r+=`Report Type,${e.tab.toUpperCase()}\n\n`,"sales"===q?(r+="SALES SUMMARY\n",r+=`Total Revenue,${(0,c.vv)(e.data.sales.totalRevenue,a.currency)}\n`,r+=`Total Orders,${e.data.sales.totalOrders}\n`,r+=`Completed Orders,${e.data.sales.completedOrders}\n`,r+=`Average Order Value,${(0,c.vv)(e.data.sales.averageOrderValue,a.currency)}\n\n`,r+="DAILY SALES TREND\n",r+="Date,Revenue (RM),Orders\n",e.data.sales.salesData.forEach(e=>{r+=`${e.date},${e.sales.toFixed(2)},${e.orders||0}\n`}),r+="\nCATEGORY PERFORMANCE\n",r+="Category,Percentage,Revenue (RM)\n",e.data.sales.categoryData.forEach(e=>{var t;r+=`${e.name},${e.value}%,${(null===(t=e.sales)||void 0===t?void 0:t.toFixed(2))||"0.00"}\n`}),r+="\nHOURLY ORDER DISTRIBUTION\n",r+="Hour,Orders\n",e.data.sales.hourlyData.forEach(e=>{r+=`${e.hour},${e.orders}\n`})):"details"===q?(r+="DETAILED SALES BREAKDOWN\n",r+="Period,Revenue (RM),Orders,Avg Order Value (RM)\n",Object.keys(e.data.details.drilldownData).sort((e,t)=>t.localeCompare(e)).forEach(t=>{const n=e.data.details.drilldownData[t];r+=`${t},${n.revenue.toFixed(2)},${n.orders},${(n.revenue/n.orders).toFixed(2)}\n`,Object.keys(n.months).sort((e,t)=>t.localeCompare(e)).forEach(e=>{const t=n.months[e],a=new Date(e+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});r+=`  ${a},${t.revenue.toFixed(2)},${t.orders},${(t.revenue/t.orders).toFixed(2)}\n`,Object.keys(t.days).sort((e,t)=>t.localeCompare(e)).forEach(e=>{const n=t.days[e],a=new Date(e).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric"});r+=`    ${a},${n.revenue.toFixed(2)},${n.orders},${(n.revenue/n.orders).toFixed(2)}\n`})})})):"menu"===q?(r+="MENU PERFORMANCE ANALYSIS\n",r+=`Total Menu Items,${e.data.menu.totalItems}\n`,r+=`Total Revenue,${(0,c.vv)(e.data.menu.totalRevenue,a.currency)}\n`,r+=`Total Orders,${e.data.menu.totalOrders}\n\n`,r+="COMPLETE MENU RANKING\n",r+="Rank,Item Name,Category,Price (RM),Orders,Revenue (RM),Performance %\n",e.data.menu.menuItems.forEach((t,n)=>{var a;const s=(null===(a=e.data.menu.menuItems[0])||void 0===a?void 0:a.orders)||1,o=Math.round(t.orders/s*100);r+=`${n+1},${t.name},${t.category},${t.price.toFixed(2)},${t.orders},${t.revenue.toFixed(2)},${o}\n`})):"customers"===q?(r+="CUSTOMER INSIGHTS SUMMARY\n",r+=`Total Customers,${e.data.customers.totalCustomers}\n`,r+=`Repeat Customers,${e.data.customers.repeatCustomers}\n`,r+=`Repeat Rate,${e.data.customers.repeatRate}%\n`,r+=`Total Revenue,${(0,c.vv)(e.data.customers.totalRevenue,a.currency)}\n`,r+=`Average Spent per Customer,${(0,c.vv)(e.data.customers.avgSpent,a.currency)}\n\n`,r+="TOP CUSTOMERS\n",r+="Rank,Name,Phone,Type,Total Orders,Total Spent (RM),Points,Tier\n",e.data.customers.customerList.sort((e,t)=>parseFloat(t.total_spent||0)-parseFloat(e.total_spent||0)).slice(0,50).forEach((e,t)=>{r+=`${t+1},${e.customer.name},${e.customer.phone},${e.customer.type},${e.total_orders},${parseFloat(e.total_spent||0).toFixed(2)},${e.points||0},${e.tier||"Bronze"}\n`})):"operations"===q&&(r+="OPERATIONS PERFORMANCE\n",r+=`Total Orders,${e.data.operations.totalOrders}\n`,r+=`Average Preparation Time,${e.data.operations.avgPreparationTime}\n\n`,r+="PEAK TIMES ANALYSIS\n",r+="Time Slot,Orders,Revenue (RM),Efficiency %\n",e.data.operations.peakTimes.forEach(e=>{r+=`${e.time},${e.orders},${e.revenue},${e.efficiency}\n`})),r},Re=()=>(0,b.jsxs)(D,{children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(C,{active:"today"===X&&!ne,onClick:()=>Ce("today"),children:"Today"}),(0,b.jsx)(C,{active:"week"===X&&!ne,onClick:()=>Ce("week"),children:"Week"}),(0,b.jsx)(C,{active:"month"===X&&!ne,onClick:()=>Ce("month"),children:"Month"}),(0,b.jsx)(C,{active:"year"===X&&!ne,onClick:()=>Ce("year"),children:"Year"}),(0,b.jsx)(C,{active:"all"===X&&!ne,onClick:()=>Ce("all"),children:"All"}),(0,b.jsxs)(E,{children:[(0,b.jsx)(k,{type:"date",value:te.start,onChange:e=>{re({...te,start:e.target.value}),ae(!0)}}),(0,b.jsx)("span",{children:"to"}),(0,b.jsx)(k,{type:"date",value:te.end,onChange:e=>{re({...te,end:e.target.value}),ae(!0)}})]})]}),(0,b.jsxs)(I,{onClick:Ie,children:[(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,b.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]});return(0,b.jsx)(o.A,{children:(0,b.jsxs)($,{children:[(0,b.jsx)(A.Ay,{title:"Reports"}),(0,b.jsxs)(M,{children:[(0,b.jsxs)(i.j,{children:[(0,b.jsx)(i.oz,{active:"sales"===q,onClick:()=>Q("sales"),children:"Sales Report"}),(0,b.jsx)(i.oz,{active:"details"===q,onClick:()=>Q("details"),children:"Sales Details"}),(0,b.jsx)(i.oz,{active:"menu"===q,onClick:()=>Q("menu"),children:"Menu Analysis"}),(0,b.jsx)(i.oz,{active:"customers"===q,onClick:()=>Q("customers"),children:"Customer Insights"}),(0,b.jsx)(i.oz,{active:"operations"===q,onClick:()=>Q("operations"),children:"Operations"})]}),(0,b.jsxs)("div",{style:{display:"sales"===q?"block":"none"},children:[(0,b.jsx)(Re,{}),ie?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe.length?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,b.jsxs)("div",{children:[(0,b.jsxs)(R,{children:[(0,b.jsxs)(i.hI,{color:"#059669",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(we,a.currency)}),(0,b.jsxs)(i.d1,{children:[Fe.length," orders in selected period"]})]}),(0,b.jsxs)(i.hI,{color:"#2563EB",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:Fe.length.toLocaleString()}),(0,b.jsx)(i.d1,{children:"For selected period"})]}),(0,b.jsxs)(i.hI,{color:"#DC2626",children:[(0,b.jsx)(i.v0,{children:"Average Order Value"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(Fe.length>0?we/Fe.length:0,a.currency)}),(0,b.jsx)(i.d1,{children:"Per order"})]}),(0,b.jsxs)(i.hI,{color:"#7C3AED",children:[(0,b.jsx)(i.v0,{children:"Completed Orders"}),(0,b.jsx)(i.Os,{children:Fe.filter(e=>"completed"===e.status).length}),(0,b.jsxs)(i.d1,{children:[Math.round(Fe.filter(e=>"completed"===e.status).length/Fe.length*100||0),"% completion rate"]})]})]}),(0,b.jsxs)(T,{children:[(0,b.jsxs)(B,{children:[(0,b.jsx)(_,{children:"Revenue Trend"}),(0,b.jsx)(u.u,{width:"100%",height:300,children:(0,b.jsxs)(x.b,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,b.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,b.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,b.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,b.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,b.jsx)(j.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(_,{children:"Sales by Category"}),(0,b.jsx)(u.u,{width:"100%",height:300,children:(0,b.jsxs)(y.r,{children:[(0,b.jsx)(f.F,{data:Ae,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ae.map((e,t)=>(0,b.jsx)(F.f,{fill:V[t%V.length]},`cell-${t}`))}),(0,b.jsx)(v.m,{formatter:e=>`${e}%`})]})})]})]}),(0,b.jsxs)(B,{children:[(0,b.jsx)(_,{children:"Hourly Orders Distribution"}),(0,b.jsx)(u.u,{width:"100%",height:250,children:(0,b.jsxs)(S.E,{data:$e,margin:{top:5,right:20,left:0,bottom:5},children:[(0,b.jsx)(p.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,b.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,b.jsx)(g.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,b.jsx)(v.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,b.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,b.jsxs)("div",{style:{display:"details"===q?"block":"none"},children:[(0,b.jsx)(Re,{}),ie?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Fe.length?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,b.jsxs)("div",{children:[(0,b.jsxs)(R,{children:[(0,b.jsxs)(i.hI,{color:"#059669",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(we,a.currency)}),(0,b.jsxs)(i.d1,{children:[Fe.length," orders in selected period"]})]}),(0,b.jsxs)(i.hI,{color:"#2563EB",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:Fe.length.toLocaleString()}),(0,b.jsxs)(i.d1,{children:[Fe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,b.jsxs)(i.hI,{color:"#DC2626",children:[(0,b.jsx)(i.v0,{children:"Average Order Value"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(Fe.length>0?we/Fe.length:0,a.currency)}),(0,b.jsx)(i.d1,{children:"Per order average"})]}),(0,b.jsxs)(i.hI,{color:"#7C3AED",children:[(0,b.jsx)(i.v0,{children:"Period"}),(0,b.jsx)(i.Os,{children:ne?Oe():"today"===X?"1":"week"===X?"7":"month"===X?"30":"year"===X?"365":Oe()}),(0,b.jsx)(i.d1,{children:ne?`${te.start} to ${te.end}`:"today"===X?"Day":"Days"})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsxs)(_,{children:["Detailed Sales Breakdown (",ne?`${te.start} to ${te.end}`:X,")"]}),(0,b.jsxs)(L,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(N,{style:{width:"40%"},children:"Period"}),(0,b.jsx)(N,{style:{textAlign:"right"},children:"Revenue"}),(0,b.jsx)(N,{style:{textAlign:"right"},children:"Orders"}),(0,b.jsx)(N,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,b.jsx)("tbody",{children:Object.keys(De).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=De[e],r=ve.has(e);return(0,b.jsxs)(n.Fragment,{children:[(0,b.jsxs)(Y,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(ve);if(t.has(e)){var r;t.delete(e);const n=new Set(ye);Object.keys((null===(r=De[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),fe(n)}else t.add(e);je(t)})(e),children:[(0,b.jsxs)(W,{level:0,bold:!0,children:[(0,b.jsx)(K,{expanded:r,children:"\u25b6"}),e]}),(0,b.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,a.currency)}),(0,b.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,b.jsx)(W,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,a.currency)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],o=`${e}-${r}`,i=ye.has(o),d=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,b.jsxs)(n.Fragment,{children:[(0,b.jsxs)(Y,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(ye);t.has(e)?t.delete(e):t.add(e),fe(t)})(o),children:[(0,b.jsxs)(W,{level:1,bold:!0,children:[(0,b.jsx)(K,{expanded:i,children:"\u25b6"}),d]}),(0,b.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,a.currency)}),(0,b.jsx)(W,{level:1,style:{textAlign:"right"},children:s.orders}),(0,b.jsx)(W,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,a.currency)})]}),i&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,b.jsxs)(Y,{level:2,children:[(0,b.jsx)(W,{level:2,children:r}),(0,b.jsx)(W,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,a.currency)}),(0,b.jsx)(W,{level:2,style:{textAlign:"right"},children:t.orders}),(0,b.jsx)(W,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,a.currency)})]},e)})]},o)})]},e)})})]})]})]})]}),(0,b.jsxs)("div",{style:{display:"menu"===q?"block":"none"},children:[(0,b.jsx)(Re,{}),(0,b.jsxs)(R,{children:[(0,b.jsxs)(i.hI,{color:"#F59E0B",children:[(0,b.jsx)(i.v0,{children:"Best Seller"}),(0,b.jsx)(i.Os,{children:(null===(e=be[0])||void 0===e?void 0:e.name)||"N/A"}),(0,b.jsxs)(i.d1,{children:[(null===(t=be[0])||void 0===t?void 0:t.orders)||0," orders in ","today"===X?"today":`this ${X}`]})]}),(0,b.jsxs)(i.hI,{color:"#10B981",children:[(0,b.jsx)(i.v0,{children:"Total Items Analyzed"}),(0,b.jsx)(i.Os,{children:be.length}),(0,b.jsx)(i.d1,{children:"Complete menu analysis"})]}),(0,b.jsxs)(i.hI,{color:"#3B82F6",children:[(0,b.jsx)(i.v0,{children:"Total Orders"}),(0,b.jsx)(i.Os,{children:be.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,b.jsx)(i.d1,{children:"For selected period"})]}),(0,b.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,b.jsx)(i.v0,{children:"Total Revenue"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(be.reduce((e,t)=>e+t.revenue,0),a.currency)}),(0,b.jsx)(i.d1,{children:"For selected period"})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsxs)(_,{children:["Complete Menu Performance Ranking (",ne?`${te.start} to ${te.end}`:X,")"]}),(0,b.jsxs)(L,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(N,{children:"Rank"}),(0,b.jsx)(N,{children:"Menu Item"}),(0,b.jsx)(N,{children:"Category"}),(0,b.jsx)(N,{children:"Price"}),(0,b.jsx)(N,{children:"Orders"}),(0,b.jsx)(N,{children:"Revenue"}),(0,b.jsx)(N,{children:"Performance"})]})}),(0,b.jsx)("tbody",{children:be.map((e,t)=>{var r;const n=(null===(r=be[0])||void 0===r?void 0:r.orders)||1;return(0,b.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,b.jsxs)(z,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,b.jsx)(z,{style:{fontWeight:600},children:e.name}),(0,b.jsx)(z,{children:(0,b.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,b.jsx)(z,{children:(0,c.vv)(e.price,a.currency)}),(0,b.jsx)(z,{children:e.orders.toLocaleString()}),(0,b.jsx)(z,{children:(0,c.vv)(e.revenue,a.currency)}),(0,b.jsx)(z,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)(U,{percentage:e.orders/n*100}),(0,b.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,b.jsxs)("div",{style:{display:"customers"===q?"block":"none"},children:[(0,b.jsx)(Re,{}),ie?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===he.length?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customer data available"}):(0,b.jsxs)("div",{children:[(0,b.jsxs)(R,{children:[(0,b.jsxs)(i.hI,{color:"#635BFF",children:[(0,b.jsx)(i.v0,{children:"Total Customers"}),(0,b.jsx)(i.Os,{children:he.length.toLocaleString()}),(0,b.jsxs)(i.d1,{children:[he.filter(e=>"member"===e.customer.type).length," members, ",he.filter(e=>"guest"===e.customer.type).length," guests"]})]}),(0,b.jsxs)(i.hI,{color:"#00D924",children:[(0,b.jsx)(i.v0,{children:"Repeat Customers"}),(0,b.jsx)(i.Os,{children:he.filter(e=>e.total_orders>1).length}),(0,b.jsxs)(i.d1,{children:[he.length>0?Math.round(he.filter(e=>e.total_orders>1).length/he.length*100):0,"% return rate"]})]}),(0,b.jsxs)(i.hI,{color:"#FFB800",children:[(0,b.jsx)(i.v0,{children:"Average Spent"}),(0,b.jsx)(i.Os,{children:(0,c.vv)(he.length>0?he.reduce((e,t)=>e+parseFloat(t.total_spent||0),0)/he.length:0,a.currency)}),(0,b.jsx)(i.d1,{children:"Per customer"})]}),(0,b.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,b.jsx)(i.v0,{children:"Total Points"}),(0,b.jsx)(i.Os,{children:he.reduce((e,t)=>e+(t.points||0),0).toLocaleString()}),(0,b.jsx)(i.d1,{children:"Across all customers"})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsx)(_,{children:"Top Customers"}),(0,b.jsxs)(L,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(N,{children:"Rank"}),(0,b.jsx)(N,{children:"Name"}),(0,b.jsx)(N,{children:"Phone"}),(0,b.jsx)(N,{children:"Type"}),(0,b.jsx)(N,{children:"Orders"}),(0,b.jsx)(N,{children:"Total Spent"}),(0,b.jsx)(N,{children:"Points"}),(0,b.jsx)(N,{children:"Tier"})]})}),(0,b.jsx)("tbody",{children:he.sort((e,t)=>parseFloat(t.total_spent||0)-parseFloat(e.total_spent||0)).slice(0,10).map((e,t)=>(0,b.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,b.jsxs)(z,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,b.jsx)(z,{style:{fontWeight:600},children:e.customer.name}),(0,b.jsx)(z,{children:e.customer.phone}),(0,b.jsx)(z,{children:(0,b.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===e.customer.type?"#E0F2FE":"#F3F4F6",color:"member"===e.customer.type?"#0369A1":"#6B7280"},children:"member"===e.customer.type?"Member":"Guest"})}),(0,b.jsx)(z,{children:e.total_orders||0}),(0,b.jsx)(z,{children:(0,c.vv)(parseFloat(e.total_spent||0),a.currency)}),(0,b.jsx)(z,{children:e.points||0}),(0,b.jsx)(z,{children:(0,b.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},e.customer.id))})]})]})]})]}),(0,b.jsxs)("div",{style:{display:"operations"===q?"block":"none"},children:[(0,b.jsx)(Re,{}),(0,b.jsxs)(R,{children:[(0,b.jsxs)(i.hI,{color:"#10B981",children:[(0,b.jsx)(i.v0,{children:"Order Fulfillment"}),(0,b.jsxs)(i.Os,{children:[Math.round(95*(.9+.15*Math.random())),"%"]}),(0,b.jsx)(i.d1,{children:"On-time completion"})]}),(0,b.jsxs)(i.hI,{color:"#F59E0B",children:[(0,b.jsx)(i.v0,{children:"Avg. Wait Time"}),(0,b.jsxs)(i.Os,{children:[Math.round(8*(.7+.6*Math.random()))," min"]}),(0,b.jsxs)(i.d1,{children:["-",Math.round(1+4*Math.random())," min from target"]})]}),(0,b.jsxs)(i.hI,{color:"#EF4444",children:[(0,b.jsx)(i.v0,{children:"Peak Hour"}),(0,b.jsx)(i.Os,{children:"12-1 PM"}),(0,b.jsxs)(i.d1,{children:[Math.round(45*("today"===X?1:"week"===X?7:"month"===X?30:365)*(.8+.4*Math.random()))," orders/","today"===X?"hour":X]})]}),(0,b.jsxs)(i.hI,{color:"#6366F1",children:[(0,b.jsx)(i.v0,{children:"Staff Efficiency"}),(0,b.jsxs)(i.Os,{children:[Math.round(87*(.85+.25*Math.random())),"%"]}),(0,b.jsxs)(i.d1,{children:["+",(6*Math.random()).toFixed(1),"% from last ","today"===X?"day":X]})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsx)(_,{children:"Peak Hours Performance"}),(0,b.jsxs)(L,{children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)(N,{children:"Time Slot"}),(0,b.jsx)(N,{children:"Orders"}),(0,b.jsx)(N,{children:"Revenue"}),(0,b.jsx)(N,{children:"Efficiency"})]})}),(0,b.jsx)("tbody",{children:Ee.map((e,t)=>(0,b.jsxs)("tr",{children:[(0,b.jsx)(z,{style:{fontWeight:600},children:e.time}),(0,b.jsx)(z,{children:e.orders}),(0,b.jsx)(z,{children:(0,c.vv)(e.revenue,a.currency)}),(0,b.jsx)(z,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)(U,{percentage:e.efficiency}),(0,b.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},t))})]})]})]})]})]})})}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),a=r(4414);const s=n.Ay.div`
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
`,o=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,i=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,a.jsxs)(s,{children:[(0,a.jsx)(o,{children:t}),r&&(0,a.jsx)(i,{children:r})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>l,Vp:()=>i,fU:()=>s,iF:()=>d,ng:()=>n,oB:()=>o,r6:()=>a});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",a=(e,t,r)=>{if(!e)return"";const a=new Date(e);if(isNaN(a.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return a.toLocaleString("en-MY",{...s,...r})},s=(e,t)=>a(e,t,{year:void 0,month:void 0,day:void 0}),o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";try{return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),a=Math.floor(r/36e5),s=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===a?"1 hour ago":a<24?`${a} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);