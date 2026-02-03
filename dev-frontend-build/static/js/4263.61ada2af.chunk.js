"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{3781:(e,t,r)=>{r.d(t,{Ay:()=>h});r(9950);var n=r(4752),o=r(4414);const s=n.Ay.div`
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
`,d=n.Ay.input`
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
`,l=n.Ay.div`
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
`,h=e=>{let{activePeriod:t,dateRange:r,isCustomDateRange:n,onPeriodChange:h,onDateRangeChange:u,onDownload:x,showDownload:p=!1}=e;return(0,o.jsx)(s,{children:(0,o.jsxs)(i,{children:[(0,o.jsx)(a,{active:"today"===t&&!n,onClick:()=>h("today"),children:"Today"}),(0,o.jsx)(a,{active:"week"===t&&!n,onClick:()=>h("week"),children:"Week"}),(0,o.jsx)(a,{active:"month"===t&&!n,onClick:()=>h("month"),children:"Month"}),(0,o.jsx)(a,{active:"year"===t&&!n,onClick:()=>h("year"),children:"Year"}),(0,o.jsx)(a,{active:"all"===t&&!n,onClick:()=>h("all"),children:"All"}),(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{type:"date",value:r.start,onChange:e=>u("start",e.target.value)}),(0,o.jsx)("span",{children:"to"}),(0,o.jsx)(d,{type:"date",value:r.end,onChange:e=>u("end",e.target.value)})]}),p&&x&&(0,o.jsxs)(c,{onClick:x,children:[(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,o.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})})}},4263:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var n=r(9950),o=r(4752),s=r(4492),i=r(3310),a=r(2674),d=r(1367),l=r(9018),c=r(6038),h=r(8406);const u=e=>{if(null===e||void 0===e)return"";const t=String(e);return t.includes(",")||t.includes('"')||t.includes("\n")||t.includes("\r")?`"${t.replace(/"/g,'""')}"`:t},x=e=>e.map(u).join(",");var p=r(1095),g=r(2847),m=r(3245),v=r(158),j=r(3440),y=r(4094),f=r(4915),F=r(7621),b=r(5297),w=r(2528),k=r(294),S=r(3588),A=r(8012),C=r(3781),D=r(4414);const E=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,$=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,I=a.MD,_=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,B=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,O=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,M=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,P=o.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,R=o.Ay.td`
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
`,H=o.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,U=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],W=()=>{var e,t;const{user:r}=(0,d.As)(),{operationSettings:o}=(0,l.Pj)(),W=()=>{var e,t,r;const n=(0,h.ng)(o),s=new Date,i=new Intl.DateTimeFormat("en-US",{timeZone:n,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}).formatToParts(s),a=parseInt((null===(e=i.find(e=>"year"===e.type))||void 0===e?void 0:e.value)||"0"),d=parseInt((null===(t=i.find(e=>"month"===e.type))||void 0===t?void 0:t.value)||"0"),l=parseInt((null===(r=i.find(e=>"day"===e.type))||void 0===r?void 0:r.value)||"0");return new Date(a,d-1,l)},K=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,[Z,V]=(0,s.ok)(),[Y,G]=(0,n.useState)(()=>Z.get("tab")||"sales");(0,n.useEffect)(()=>{V({tab:Y},{replace:!0})},[Y,V]);const[q,J]=(0,n.useState)("week"),[Q,X]=(0,n.useState)(()=>{const e=new Date,t=K(e),r=new Date(e);r.setDate(r.getDate()-6);return{start:K(r),end:t}}),[ee,te]=(0,n.useState)(!1),[re,ne]=(0,n.useState)([]),[oe,se]=(0,n.useState)(!0),[ie,ae]=(0,n.useState)(!1),[de,le]=(0,n.useState)(null),[ce,he]=(0,n.useState)([]),[ue,xe]=(0,n.useState)([]),[pe,ge]=(0,n.useState)([]),[me,ve]=(0,n.useState)(new Set),[je,ye]=(0,n.useState)(new Set);(0,n.useEffect)(()=>{localStorage.setItem("reports_active_tab",Y)},[Y]),(0,n.useEffect)(()=>{o&&!ee&&Be(q)},[null===o||void 0===o?void 0:o.timeZone]);const fe=(0,n.useMemo)(()=>re&&0!==re.length?re:[],[re]),Fe=(0,n.useMemo)(()=>{if(0===fe.length)return[];const e=(0,h.ng)(o),t=e=>parseFloat(e.final_price||e.total_amount||e.total_price||0),r=t=>{var r,n,o,s;const i=new Date(t),a=new Intl.DateTimeFormat("en-US",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",weekday:"short"}).formatToParts(i);return{year:parseInt((null===(r=a.find(e=>"year"===e.type))||void 0===r?void 0:r.value)||"0"),month:parseInt((null===(n=a.find(e=>"month"===e.type))||void 0===n?void 0:n.value)||"0"),day:parseInt((null===(o=a.find(e=>"day"===e.type))||void 0===o?void 0:o.value)||"0"),weekday:(null===(s=a.find(e=>"weekday"===e.type))||void 0===s?void 0:s.value)||""}};if("today"===q){const r={};return fe.forEach(n=>{const o=(t=>{const r=new Date(t),n=new Intl.DateTimeFormat("en-US",{timeZone:e,hour:"numeric",hour12:!1});return parseInt(n.format(r))})(n.order_date||n.createdAt),s=12===o?"12PM":o>12?o-12+"PM":0===o?"12AM":`${o}AM`;r[s]=(r[s]||0)+t(n)}),Object.entries(r).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}})}if("week"===q){const r=W(),n=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],o=[];for(let e=6;e>=0;e--){const t=new Date(r);t.setDate(t.getDate()-e),o.push(t)}const s={};return fe.forEach(r=>{const n=r.order_date||r.createdAt,o=(0,h.iF)(n,e);s[o]=(s[o]||0)+t(r)}),o.map(e=>{const t=K(e);return{date:n[e.getDay()],sales:Math.round(s[t]||0)}})}if("month"===q){const e={};return fe.forEach(n=>{const o=n.order_date||n.createdAt,s=r(o),i=`${s.month.toString().padStart(2,"0")}/${s.day.toString().padStart(2,"0")}`;e[i]=(e[i]||0)+t(n)}),Object.entries(e).map(e=>{let[t,r]=e;return{date:t,sales:Math.round(r)}}).sort((e,t)=>e.date.localeCompare(t.date))}{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],n={};return fe.forEach(o=>{const s=o.order_date||o.createdAt,i=r(s),a=e[i.month-1];n[a]=(n[a]||0)+t(o)}),e.map(e=>({date:e,sales:Math.round(n[e]||0)}))}},[fe,q,o]),be=(0,n.useMemo)(()=>fe.reduce((e,t)=>e+parseFloat(t.final_price||t.total_amount||t.total_price||0),0),[fe]),we=(0,n.useMemo)(()=>{if(0===fe.length)return[{name:"No Data",value:100,sales:0}];const e={},t={};pe.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)}),ue.forEach(r=>{if(r.id){const n=r.categoryId?t[r.categoryId.toString()]||r.categoryId:"Other";e[r.id.toString()]=n}});const r={};let n=0;fe.forEach(t=>{t.order_items&&Array.isArray(t.order_items)&&t.order_items.forEach(t=>{var o,s,i,a;const d=parseFloat(t.price||0)*parseInt(t.quantity||1);n+=d;const l=(null===(o=t.menuItem)||void 0===o||null===(s=o.id)||void 0===s?void 0:s.toString())||(null===(i=t.product_id)||void 0===i?void 0:i.toString())||(null===(a=t.id)||void 0===a?void 0:a.toString()),c=l&&e[l]||"Other";r[c]=(r[c]||0)+d})});const o=Object.entries(r).map(e=>{let[t,r]=e;return{name:t,value:n>0?Math.round(r/n*100):0,sales:Math.round(r)}}).sort((e,t)=>t.sales-e.sales);return o.length>0?o:[{name:"No Data",value:100,sales:0}]},[fe,ue,pe]),ke=(0,n.useMemo)(()=>{var e;if(0===fe.length)return[];const t={};pe.forEach(e=>{e.id&&e.name&&(t[e.id.toString()]=e.name)});const r={};ue.forEach(e=>{if(e.id){const n=e.categoryId?t[e.categoryId.toString()]||e.categoryId:"Other";r[e.id.toString()]=n}});const n={};fe.forEach(e=>{e.order_items&&Array.isArray(e.order_items)&&e.order_items.forEach(e=>{var t,o,s;const i=e.menu_name||e.name||"Unknown",a=(null===(t=e.menuItem)||void 0===t||null===(o=t.id)||void 0===o?void 0:o.toString())||(null===(s=e.product_id)||void 0===s?void 0:s.toString()),d=a?r[a]||"Other":e.category||"Other";n[i]||(n[i]={category:d,price:parseFloat(e.price||0),orders:0,revenue:0});const l=parseInt(e.quantity||1),c=parseFloat(e.price||0);n[i].orders+=l,n[i].revenue+=c*l})});const o=Object.entries(n).map(e=>{let[t,r]=e;return{name:t,category:r.category,price:r.price,orders:r.orders,revenue:Math.round(r.revenue),performance:0}}).sort((e,t)=>t.orders-e.orders),s=(null===(e=o[0])||void 0===e?void 0:e.orders)||1;return o.forEach(e=>{e.performance=Math.round(e.orders/s*100)}),o},[fe,ue,pe]),Se=(0,n.useMemo)(()=>{if(0===fe.length)return[];const e={};return fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`;e[n]=(e[n]||0)+1}),Object.entries(e).map(e=>{let[t,r]=e;return{hour:t,orders:r}}).sort((e,t)=>{const r=e=>{const t=parseInt(e),r=e.includes("PM");return r&&12!==t?t+12:12!==t||r?t:0};return r(e.hour)-r(t.hour)})},[fe]),Ae=(0,n.useMemo)(()=>{if(0===ce.length||0===fe.length)return[];const e=new Set,t={};return fe.forEach(r=>{const n=r.customer_id;n&&(e.add(n),t[n]||(t[n]={orders:0,spent:0}),t[n].orders+=1,t[n].spent+=parseFloat(r.total_amount||0))}),ce.filter(t=>{var r;return e.has(null===(r=t.customer)||void 0===r?void 0:r.id)}).map(e=>{var r,n,o,s;return{...e,period_orders:(null===(r=t[null===(n=e.customer)||void 0===n?void 0:n.id])||void 0===r?void 0:r.orders)||0,period_spent:(null===(o=t[null===(s=e.customer)||void 0===s?void 0:s.id])||void 0===o?void 0:o.spent)||0}}).sort((e,t)=>t.period_spent-e.period_spent)},[ce,fe]),Ce=(0,n.useMemo)(()=>{if(0===fe.length)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=0,t=0;fe.forEach(r=>{if(r.served_at&&r.createdAt){const n=new Date(r.createdAt).getTime(),o=(new Date(r.served_at).getTime()-n)/6e4;o>0&&o<120&&(e+=o,t++)}});const r=t>0?Math.round(e/t):0,n={};fe.forEach(e=>{const t=new Date(e.order_date||e.createdAt).getHours();n[t]=(n[t]||0)+1});let o=12,s=0;Object.entries(n).forEach(e=>{let[t,r]=e;r>s&&(s=r,o=parseInt(t))});return{completionRate:100,avgPrepTime:r,peakHour:(e=>{const t=(e+1)%24,r=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${r(e)}-${r(t)}`})(o),peakHourOrders:s,totalOrdersInPeak:s}},[fe]),De=(0,n.useCallback)(async()=>{if(null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found"),void se(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void se(!1);const[t,n,o]=await Promise.all([fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${r.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(t.ok){const e=await t.json();le(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&he(e.data)}if(o.ok){const e=await o.json();e.success&&e.data&&(e.data.items&&xe(e.data.items),e.data.categories&&ge(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{se(!1)}},[null===r||void 0===r?void 0:r.restaurantId]),Ee=(0,n.useCallback)(async()=>{if(null===r||void 0===r||!r.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){ae(!0);try{const t=new URLSearchParams({startDate:Q.start,endDate:Q.end,status:"completed",limit:"10000",includeCompleted:"true"}),n=await fetch(`/api/orders/restaurant/${r.restaurantId}?${t.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();ne(e.data||[])}}catch(t){console.error("\u274c Error fetching orders:",t)}finally{ae(!1)}}},[null===r||void 0===r?void 0:r.restaurantId,Q.start,Q.end]);(0,n.useEffect)(()=>{De()},[De]),(0,n.useEffect)(()=>{Ee()},[Ee]);const $e=(0,n.useMemo)(()=>{if(0===fe.length)return[];const e={};return fe.forEach(t=>{const r=(e=>new Date(e.order_date||e.createdAt))(t).getHours(),n=`${r.toString().padStart(2,"0")}:00-${(r+1).toString().padStart(2,"0")}:00`;e[n]||(e[n]={orders:0,revenue:0}),e[n].orders+=1,e[n].revenue+=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(t)}),Object.entries(e).map(e=>{let[t,r]=e;return{time:t,orders:r.orders,revenue:Math.round(r.revenue),efficiency:Math.min(100,Math.round(r.orders/(fe.length/24)*100))}}).sort((e,t)=>t.orders-e.orders).slice(0,5)},[fe]),Ie=(0,n.useMemo)(()=>{if(0===fe.length)return{};const e=(0,h.ng)(o),t={};return fe.forEach(r=>{const n=(t=>{const r=new Date(t),n=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r),[o,s,i]=n.split("-");return{year:o,month:s,day:i,dateStr:n}})(r.order_date||r.createdAt),o=n.year,s=`${n.year}-${n.month}`,i=n.dateStr;t[o]||(t[o]={year:o,revenue:0,orders:0,months:{}}),t[o].months[s]||(t[o].months[s]={month:s,revenue:0,orders:0,days:{}}),t[o].months[s].days[i]||(t[o].months[s].days[i]={day:i,revenue:0,orders:0});const a=(e=>parseFloat(e.final_price||e.total_amount||e.total_price||0))(r);t[o].revenue+=a,t[o].orders+=1,t[o].months[s].revenue+=a,t[o].months[s].orders+=1,t[o].months[s].days[i].revenue+=a,t[o].months[s].days[i].orders+=1}),t},[fe,o]),_e=()=>{const e=new Date(Q.start),t=new Date(Q.end);return Math.ceil((t.getTime()-e.getTime())/864e5)};(()=>{const e=_e()})();n.useEffect(()=>{const e=_e();if(e<=31){const e=new Set(Object.keys(Ie)),t=new Set;Object.keys(Ie).forEach(e=>{Object.keys(Ie[e].months).forEach(r=>{t.add(`${e}-${r}`)})}),ve(e),ye(t)}else if(e<=365){const e=new Set(Object.keys(Ie));ve(e),ye(new Set)}else ve(new Set),ye(new Set)},[Q.start,Q.end,fe.length]);const Be=e=>{J(e),te(!1);const t=W();let r=new Date(t);switch(e){case"today":r=new Date(t);break;case"week":r=new Date(t),r.setDate(r.getDate()-6);break;case"month":r=new Date(t),r.setDate(r.getDate()-29);break;case"year":r=new Date(t),r.setDate(r.getDate()-364);break;case"all":if(re.length>0){r=re.reduce((e,t)=>{const r=new Date(t.order_date||t.createdAt);return r<e?r:e},new Date)}else r=new Date(t.getFullYear()-5,0,1)}const n=K(r),o=K(t);X({start:n,end:o})},Oe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(t)},Me=((0,n.useCallback)(()=>[],[]),(0,n.useCallback)(()=>{const e=["Date,Revenue"];return Fe.forEach(t=>{e.push(`${u(t.date)},${Oe(t.sales)}`)}),e.join("\n")},[Fe])),Te=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ie).sort((e,t)=>t.localeCompare(e)).forEach(t=>{const r=Ie[t];Object.keys(r.months).sort((e,t)=>t.localeCompare(e)).forEach(t=>{const n=r.months[t];Object.keys(n.days).sort((e,t)=>t.localeCompare(e)).forEach(t=>{const r=n.days[t],o=r.orders>0?r.revenue/r.orders:0;e.push(`${t},${Oe(r.revenue)},${r.orders},${Oe(o)}`)})})}),e.join("\n")},[Ie]),Pe=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return ke.forEach((t,r)=>{e.push(x([r+1,t.name,t.category,Oe(t.price),t.orders,Oe(t.revenue)]))}),e.join("\n")},[ke]),Re=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ae].sort((e,t)=>(t.period_spent||0)-(e.period_spent||0)).forEach((t,r)=>{var n,o,s;e.push(x([r+1,(null===(n=t.customer)||void 0===n?void 0:n.name)||"Guest",(null===(o=t.customer)||void 0===o?void 0:o.phone)||"-","member"===(null===(s=t.customer)||void 0===s?void 0:s.type)?"Member":"Guest",t.period_orders||0,Oe(t.period_spent||0),t.points||0,t.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ae]),ze=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return $e.forEach(t=>{e.push(x([t.time,t.orders,Oe(t.revenue)]))}),e.join("\n")},[$e]),Le=(0,n.useCallback)(()=>{let e;switch(Y){case"sales":default:e=Me();break;case"details":e=Te();break;case"menu":e=Pe();break;case"customers":e=Re();break;case"operations":e=ze()}var t,n,o,s,i,a;((e,t)=>{const r=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(r),o=document.createElement("a");o.setAttribute("href",n),o.setAttribute("download",t),o.style.visibility="hidden",o.style.position="absolute",o.style.left="-9999px",document.body.appendChild(o),o.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(o)},150)})(e,(t=`purplepos_${(null===r||void 0===r?void 0:r.restaurantId)||"report"}`,n=Y,o=q,s=ee,i=Q.start,a=Q.end,`${t}_${n}_${s?`${i}_${a}`:o}_${(new Date).toISOString().split("T")[0]}.csv`))},[Y,q,ee,Q,null===r||void 0===r?void 0:r.restaurantId,Me,Te,Pe,Re,ze]),Ne=(e,t)=>{X({...Q,[e]:t}),te(!0)},He=()=>(0,D.jsx)(C.Ay,{activePeriod:q,dateRange:Q,isCustomDateRange:ee,onPeriodChange:Be,onDateRangeChange:Ne,onDownload:Le,showDownload:!0,timezone:null===o||void 0===o?void 0:o.timeZone});return(0,D.jsx)(i.A,{children:(0,D.jsxs)(E,{children:[(0,D.jsx)(A.Ay,{title:"Reports"}),(0,D.jsxs)($,{children:[(0,D.jsxs)(a.j,{children:[(0,D.jsx)(a.oz,{active:"sales"===Y,onClick:()=>G("sales"),children:"Sales Report"}),(0,D.jsx)(a.oz,{active:"details"===Y,onClick:()=>G("details"),children:"Sales Details"}),(0,D.jsx)(a.oz,{active:"menu"===Y,onClick:()=>G("menu"),children:"Menu Analysis"}),(0,D.jsx)(a.oz,{active:"customers"===Y,onClick:()=>G("customers"),children:"Customer Insights"}),(0,D.jsx)(a.oz,{active:"operations"===Y,onClick:()=>G("operations"),children:"Operations"})]}),(0,D.jsxs)("div",{style:{display:"sales"===Y?"block":"none"},children:[(0,D.jsx)(He,{}),oe||ie?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===fe.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(I,{children:[(0,D.jsxs)(a.hI,{color:"#059669",children:[(0,D.jsx)(a.v0,{children:"Total Revenue"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(be,o.currency)}),(0,D.jsxs)(a.d1,{children:[fe.length," orders in selected period"]})]}),(0,D.jsxs)(a.hI,{color:"#2563EB",children:[(0,D.jsx)(a.v0,{children:"Total Orders"}),(0,D.jsx)(a.Os,{children:fe.length.toLocaleString()}),(0,D.jsx)(a.d1,{children:"For selected period"})]}),(0,D.jsxs)(a.hI,{color:"#DC2626",children:[(0,D.jsx)(a.v0,{children:"Average Order Value"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(fe.length>0?be/fe.length:0,o.currency)}),(0,D.jsx)(a.d1,{children:"Per order"})]}),(0,D.jsxs)(a.hI,{color:"#7C3AED",children:[(0,D.jsx)(a.v0,{children:"Completed Orders"}),(0,D.jsx)(a.Os,{children:fe.filter(e=>"completed"===e.status).length}),(0,D.jsxs)(a.d1,{children:[Math.round(fe.filter(e=>"completed"===e.status).length/fe.length*100||0),"% completion rate"]})]})]}),(0,D.jsxs)(_,{children:[(0,D.jsxs)(B,{children:[(0,D.jsx)(O,{children:"Revenue Trend"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(g.b,{data:Fe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(m.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(v.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,D.jsxs)(B,{children:[(0,D.jsx)(O,{children:"Sales by Category"}),(0,D.jsx)(p.u,{width:"100%",height:300,children:(0,D.jsxs)(F.r,{children:[(0,D.jsx)(b.F,{data:we,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:t,percent:r}=e;return`${t} ${(100*r).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:we.map((e,t)=>(0,D.jsx)(w.f,{fill:U[t%U.length]},`cell-${t}`))}),(0,D.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,D.jsxs)(B,{children:[(0,D.jsx)(O,{children:"Hourly Orders Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(k.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(m.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,D.jsxs)("div",{style:{display:"details"===Y?"block":"none"},children:[(0,D.jsx)(He,{}),oe||ie?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===fe.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(I,{children:[(0,D.jsxs)(a.hI,{color:"#059669",children:[(0,D.jsx)(a.v0,{children:"Total Revenue"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(be,o.currency)}),(0,D.jsxs)(a.d1,{children:[fe.length," orders in selected period"]})]}),(0,D.jsxs)(a.hI,{color:"#2563EB",children:[(0,D.jsx)(a.v0,{children:"Total Orders"}),(0,D.jsx)(a.Os,{children:fe.length.toLocaleString()}),(0,D.jsxs)(a.d1,{children:[fe.filter(e=>"completed"===e.status).length," completed"]})]}),(0,D.jsxs)(a.hI,{color:"#DC2626",children:[(0,D.jsx)(a.v0,{children:"Average Order Value"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(fe.length>0?be/fe.length:0,o.currency)}),(0,D.jsx)(a.d1,{children:"Per order average"})]}),(0,D.jsxs)(a.hI,{color:"#7C3AED",children:[(0,D.jsx)(a.v0,{children:"Period"}),(0,D.jsx)(a.Os,{children:ee?_e():"today"===q?"1":"week"===q?"7":"month"===q?"30":"year"===q?"365":_e()}),(0,D.jsx)(a.d1,{children:ee?`${Q.start} to ${Q.end}`:"today"===q?"Day":"Days"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:["Detailed Sales Breakdown (",ee?`${Q.start} to ${Q.end}`:q,")"]}),(0,D.jsxs)(T,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(P,{style:{width:"40%"},children:"Period"}),(0,D.jsx)(P,{style:{textAlign:"right"},children:"Revenue"}),(0,D.jsx)(P,{style:{textAlign:"right"},children:"Orders"}),(0,D.jsx)(P,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,D.jsx)("tbody",{children:Object.keys(Ie).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=Ie[e],r=me.has(e);return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(L,{level:0,clickable:!0,onClick:()=>(e=>{const t=new Set(me);if(t.has(e)){var r;t.delete(e);const n=new Set(je);Object.keys((null===(r=Ie[e])||void 0===r?void 0:r.months)||{}).forEach(t=>{n.delete(`${e}-${t}`)}),ye(n)}else t.add(e);ve(t)})(e),children:[(0,D.jsxs)(N,{level:0,bold:!0,children:[(0,D.jsx)(H,{expanded:r,children:"\u25b6"}),e]}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue,o.currency)}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:t.orders}),(0,D.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,o.currency)})]}),r&&Object.keys(t.months).sort((e,t)=>t.localeCompare(e)).map(r=>{const s=t.months[r],i=`${e}-${r}`,a=je.has(i),d=new Date(r+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,D.jsxs)(n.Fragment,{children:[(0,D.jsxs)(L,{level:1,clickable:!0,onClick:()=>(e=>{const t=new Set(je);t.has(e)?t.delete(e):t.add(e),ye(t)})(i),children:[(0,D.jsxs)(N,{level:1,bold:!0,children:[(0,D.jsx)(H,{expanded:a,children:"\u25b6"}),d]}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,o.currency)}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:s.orders}),(0,D.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,o.currency)})]}),a&&Object.keys(s.days).sort((e,t)=>t.localeCompare(e)).map(e=>{const t=s.days[e],r=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,D.jsxs)(L,{level:2,children:[(0,D.jsx)(N,{level:2,children:r}),(0,D.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(t.revenue,o.currency)}),(0,D.jsx)(N,{level:2,style:{textAlign:"right"},children:t.orders}),(0,D.jsx)(N,{level:2,style:{textAlign:"right"},children:(0,c.vv)(t.revenue/t.orders,o.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"menu"===Y?"block":"none"},children:[(0,D.jsx)(He,{}),(0,D.jsxs)(I,{children:[(0,D.jsxs)(a.hI,{color:"#F59E0B",children:[(0,D.jsx)(a.v0,{children:"Best Seller"}),(0,D.jsx)(a.Os,{children:(null===(e=ke[0])||void 0===e?void 0:e.name)||"N/A"}),(0,D.jsxs)(a.d1,{children:[(null===(t=ke[0])||void 0===t?void 0:t.orders)||0," sold in selected period"]})]}),(0,D.jsxs)(a.hI,{color:"#10B981",children:[(0,D.jsx)(a.v0,{children:"Menu Items"}),(0,D.jsx)(a.Os,{children:ke.length}),(0,D.jsx)(a.d1,{children:"Items with sales"})]}),(0,D.jsxs)(a.hI,{color:"#3B82F6",children:[(0,D.jsx)(a.v0,{children:"Items Sold"}),(0,D.jsx)(a.Os,{children:ke.reduce((e,t)=>e+t.orders,0).toLocaleString()}),(0,D.jsx)(a.d1,{children:"Total quantity sold"})]}),(0,D.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,D.jsx)(a.v0,{children:"Total Revenue"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(ke.reduce((e,t)=>e+t.revenue,0),o.currency)}),(0,D.jsx)(a.d1,{children:"For selected period"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:["Complete Menu Performance Ranking (",ee?`${Q.start} to ${Q.end}`:q,")"]}),(0,D.jsxs)(T,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(P,{children:"Rank"}),(0,D.jsx)(P,{children:"Menu Item"}),(0,D.jsx)(P,{children:"Category"}),(0,D.jsx)(P,{children:"Price"}),(0,D.jsx)(P,{children:"Qty Sold"}),(0,D.jsx)(P,{children:"Revenue"}),(0,D.jsx)(P,{children:"Performance"})]})}),(0,D.jsx)("tbody",{children:ke.map((e,t)=>{var r;const n=(null===(r=ke[0])||void 0===r?void 0:r.orders)||1;return(0,D.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(R,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,D.jsx)(R,{style:{fontWeight:600},children:e.name}),(0,D.jsx)(R,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,D.jsx)(R,{children:(0,c.vv)(e.price,o.currency)}),(0,D.jsx)(R,{children:e.orders.toLocaleString()}),(0,D.jsx)(R,{children:(0,c.vv)(e.revenue,o.currency)}),(0,D.jsx)(R,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:e.orders/n*100}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},t)})})]})]})]}),(0,D.jsxs)("div",{style:{display:"customers"===Y?"block":"none"},children:[(0,D.jsx)(He,{}),oe||ie?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ae.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(I,{children:[(0,D.jsxs)(a.hI,{color:"#635BFF",children:[(0,D.jsx)(a.v0,{children:"Active Customers"}),(0,D.jsx)(a.Os,{children:Ae.length.toLocaleString()}),(0,D.jsxs)(a.d1,{children:[Ae.filter(e=>{var t;return"member"===(null===(t=e.customer)||void 0===t?void 0:t.type)}).length," members, ",Ae.filter(e=>{var t;return"guest"===(null===(t=e.customer)||void 0===t?void 0:t.type)}).length," guests"]})]}),(0,D.jsxs)(a.hI,{color:"#00D924",children:[(0,D.jsx)(a.v0,{children:"Repeat Customers"}),(0,D.jsx)(a.Os,{children:Ae.filter(e=>e.period_orders>1).length}),(0,D.jsxs)(a.d1,{children:[Ae.length>0?Math.round(Ae.filter(e=>e.period_orders>1).length/Ae.length*100):0,"% ordered multiple times"]})]}),(0,D.jsxs)(a.hI,{color:"#FFB800",children:[(0,D.jsx)(a.v0,{children:"Average Spent"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(Ae.length>0?Ae.reduce((e,t)=>e+(t.period_spent||0),0)/Ae.length:0,o.currency)}),(0,D.jsx)(a.d1,{children:"Per customer in period"})]}),(0,D.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,D.jsx)(a.v0,{children:"Period Revenue"}),(0,D.jsx)(a.Os,{children:(0,c.vv)(Ae.reduce((e,t)=>e+(t.period_spent||0),0),o.currency)}),(0,D.jsxs)(a.d1,{children:["From ",Ae.length," customers"]})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:["Top Customers (",ee?`${Q.start} to ${Q.end}`:q,")"]}),(0,D.jsxs)(T,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(P,{children:"Rank"}),(0,D.jsx)(P,{children:"Name"}),(0,D.jsx)(P,{children:"Phone"}),(0,D.jsx)(P,{children:"Type"}),(0,D.jsx)(P,{children:"Period Orders"}),(0,D.jsx)(P,{children:"Period Spent"}),(0,D.jsx)(P,{children:"Total Points"}),(0,D.jsx)(P,{children:"Tier"})]})}),(0,D.jsx)("tbody",{children:Ae.slice(0,20).map((e,t)=>{var r,n,s,i,a,d;return(0,D.jsxs)("tr",{style:{backgroundColor:t<3?0===t?"#FFF9E6":1===t?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,D.jsxs)(R,{style:{fontWeight:600,color:t<3?0===t?"#FFB800":1===t?"#0EA5E9":"#00D924":"#0A2540"},children:["#",t+1,0===t&&" \ud83e\udd47",1===t&&" \ud83e\udd48",2===t&&" \ud83e\udd49"]}),(0,D.jsx)(R,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,D.jsx)(R,{children:(null===(s=e.customer)||void 0===s?void 0:s.phone)||"-"}),(0,D.jsx)(R,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"#0369A1":"#6B7280"},children:"member"===(null===(d=e.customer)||void 0===d?void 0:d.type)?"Member":"Guest"})}),(0,D.jsx)(R,{children:e.period_orders||0}),(0,D.jsx)(R,{children:(0,c.vv)(e.period_spent||0,o.currency)}),(0,D.jsx)(R,{children:e.points||0}),(0,D.jsx)(R,{children:(0,D.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(r=e.customer)||void 0===r?void 0:r.id)||t)})})]})]})]})]}),(0,D.jsxs)("div",{style:{display:"operations"===Y?"block":"none"},children:[(0,D.jsx)(He,{}),oe||ie?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===fe.length?(0,D.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,D.jsxs)("div",{children:[(0,D.jsxs)(I,{children:[(0,D.jsxs)(a.hI,{color:"#10B981",children:[(0,D.jsx)(a.v0,{children:"Completed Orders"}),(0,D.jsx)(a.Os,{children:fe.length.toLocaleString()}),(0,D.jsxs)(a.d1,{children:[Ce.completionRate,"% fulfillment rate"]})]}),(0,D.jsxs)(a.hI,{color:"#F59E0B",children:[(0,D.jsx)(a.v0,{children:"Avg. Prep Time"}),(0,D.jsx)(a.Os,{children:Ce.avgPrepTime>0?`${Ce.avgPrepTime} min`:"N/A"}),(0,D.jsx)(a.d1,{children:Ce.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,D.jsxs)(a.hI,{color:"#EF4444",children:[(0,D.jsx)(a.v0,{children:"Peak Hour"}),(0,D.jsx)(a.Os,{children:Ce.peakHour}),(0,D.jsxs)(a.d1,{children:[Ce.peakHourOrders," orders in this slot"]})]}),(0,D.jsxs)(a.hI,{color:"#6366F1",children:[(0,D.jsx)(a.v0,{children:"Orders per Day"}),(0,D.jsx)(a.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(Q.end).getTime()-new Date(Q.start).getTime())/864e5)+1);return Math.round(fe.length/e)})()}),(0,D.jsx)(a.d1,{children:"Average daily orders"})]})]}),(0,D.jsxs)(M,{children:[(0,D.jsxs)(O,{children:["Peak Hours Performance (",ee?`${Q.start} to ${Q.end}`:q,")"]}),(0,D.jsxs)(T,{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)(P,{children:"Time Slot"}),(0,D.jsx)(P,{children:"Orders"}),(0,D.jsx)(P,{children:"Revenue"}),(0,D.jsx)(P,{children:"Share"})]})}),(0,D.jsx)("tbody",{children:0===$e.length?(0,D.jsx)("tr",{children:(0,D.jsx)(R,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):$e.map((e,t)=>(0,D.jsxs)("tr",{style:{backgroundColor:0===t?"#FEF3C7":"transparent"},children:[(0,D.jsxs)(R,{style:{fontWeight:600},children:[0===t&&"\ud83d\udd25 ",e.time]}),(0,D.jsx)(R,{children:e.orders}),(0,D.jsx)(R,{children:(0,c.vv)(e.revenue,o.currency)}),(0,D.jsx)(R,{children:(0,D.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,D.jsx)(z,{percentage:fe.length>0?e.orders/fe.length*100:0}),(0,D.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[fe.length>0?Math.round(e.orders/fe.length*100):0,"%"]})]})})]},t))})]})]}),(0,D.jsxs)(B,{style:{marginTop:"24px"},children:[(0,D.jsx)(O,{children:"Hourly Order Distribution"}),(0,D.jsx)(p.u,{width:"100%",height:250,children:(0,D.jsxs)(k.E,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,D.jsx)(m.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,D.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,D.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,D.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,D.jsx)(S.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var n=r(4752),o=r(4414);const s=n.Ay.div`
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
`,d=e=>{let{title:t,children:r}=e;return(0,o.jsxs)(s,{children:[(0,o.jsx)(i,{children:t}),r&&(0,o.jsx)(a,{children:r})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>l,Vp:()=>a,fU:()=>s,iF:()=>d,ng:()=>n,oB:()=>i,r6:()=>o});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",o=(e,t,r)=>{if(!e)return"";const o=new Date(e);if(isNaN(o.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return o.toLocaleString("en-MY",{...s,...r})},s=(e,t)=>o(e,t,{year:void 0,month:void 0,day:void 0}),i=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";try{return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}-${String(r.getDate()).padStart(2,"0")}`}},l=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),o=Math.floor(r/36e5),s=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);