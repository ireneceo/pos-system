"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1],[,(e,t,n)=>{n.r(t),n.d(t,{default:()=>H});var a=n(9950),r=n(4492),s=n(4752),o=n(3310),i=n(2674),l=n(1095),d=n(2847),c=n(3245),u=n(158),h=n(3440),g=n(4094),x=n(4915),p=n(7621),m=n(5297),v=n(2528),j=n(9018),f=n(6038),w=n(4414);const y=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,M=s.Ay.div`
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
`,D=s.Ay.input`
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
`,b=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,S=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,R=s.Ay.div`
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
`,A=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
  }
`,$=s.Ay.button`
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
`,k=s.Ay.button`
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
`,F=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,C=s.Ay.div`
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
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 12px;
  }
`,E=s.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 12px;
  }
`,I=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`,O=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 450px;
  table-layout: fixed;

  @media (max-width: 768px) {
    min-width: 350px;
  }
`,B=s.Ay.th`
  padding: 8px 8px 8px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 10px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  line-height: 1.3;
  vertical-align: bottom;
  word-break: break-word;

  &:first-child {
    padding-left: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 6px 6px 0;
    font-size: 9px;
  }
`,L=s.Ay.td`
  padding: 10px 8px 10px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
  word-break: break-word;

  &:first-child {
    padding-left: 0;
  }

  @media (max-width: 768px) {
    padding: 8px 6px 8px 0;
    font-size: 12px;
  }
`,N=(0,s.Ay)(E)`
  margin-top: 24px;
`,P=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,W=s.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>1===e.rank?"#FFD700":2===e.rank?"#C0C0C0":3===e.rank?"#CD7F32":"#F3F4F6"};
  color: ${e=>e.rank<=3?"#fff":"#6B7280"};
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
`,U=s.Ay.div`
  position: relative;
  min-width: 200px;
`,G=s.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
  }
`,Y=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  display: ${e=>e.isOpen?"block":"none"};
  margin-top: 4px;
`,V=s.Ay.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;

  &:hover {
    background-color: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }
`,K=s.Ay.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #6B7280;
  text-align: center;
`,J=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],H=()=>{var e;const{operationSettings:t}=(0,j.Pj)(),n=t.currency,[s]=(0,r.ok)(),[H,q]=(0,a.useState)("system"),[Q,X]=(0,a.useState)("month"),[Z,ee]=(0,a.useState)({start:new Date(Date.now()-2592e6).toISOString().split("T")[0],end:(new Date).toISOString().split("T")[0]}),[te,ne]=(0,a.useState)(!1),[ae,re]=(0,a.useState)(0),[se,oe]=(0,a.useState)("all"),[ie,le]=(0,a.useState)("all"),[de,ce]=(0,a.useState)([]),[ue,he]=(0,a.useState)([]),[ge,xe]=(0,a.useState)([]),[pe,me]=(0,a.useState)([]),[,ve]=(0,a.useState)(null),[je,fe]=(0,a.useState)([]),[,we]=(0,a.useState)(null),[,ye]=(0,a.useState)([]),[Me,De]=(0,a.useState)(""),[be,Se]=(0,a.useState)("All Managers"),[Re,Ae]=(0,a.useState)(!1),[$e,ke]=(0,a.useState)(""),[Fe,Ce]=(0,a.useState)("All Restaurants"),[Te,_e]=(0,a.useState)(!1);(0,a.useEffect)(()=>{const e=s.get("restaurantId"),t=s.get("restaurantName");e&&t&&(console.log("Setting restaurant filter from URL:",{restaurantId:e,restaurantName:t}),oe(e),Ce(decodeURIComponent(t)),q("restaurant_sales"))},[s]),(0,a.useEffect)(()=>{(async()=>{try{await fetch("/api/sample-data/create",{method:"POST"});const e=await fetch("/api/restaurants");if(e.ok){const t=await e.json();console.log("Restaurants data:",t),ce(t.data||t||[])}console.log("Fetching managers...");const t=await fetch("/api/admin-analytics/managers");if(console.log("Managers response status:",t.status),t.ok){const e=await t.json();console.log("Raw managers data:",e),console.log("Processed managers:",e.data||e||[]);const n=e.data||e||[];console.log("Final managers array:",n),he(n)}else console.error("Failed to fetch managers:",t.status,await t.text());console.log("Fetching invoices...");const n=await fetch("/api/invoices");if(n.ok){const e=await n.json();console.log("Invoices data:",e),xe(e.data||e||[])}else console.error("Failed to fetch invoices:",n.status);console.log("Fetching orders...");const a=await fetch("/api/orders?limit=1000");if(a.ok){const e=await a.json();console.log("Orders data:",e),me(e.data||e||[])}else console.error("Failed to fetch orders:",a.status)}catch(e){console.error("Error fetching filter data:",e)}})()},[]),(0,a.useEffect)(()=>{console.log("useEffect triggered:",{dateRange:Z,isCustomDateRange:te}),Ee()},[Q,se,ie,H,Z.start,Z.end,te]);const Ee=async()=>{console.log("Fetching analytics data:",{isCustomDateRange:te,dateRange:Z,activePeriod:Q});try{const e=new URLSearchParams({period:te?"custom":Q,...te&&{start_date:Z.start,end_date:Z.end},..."all"!==se&&{restaurant_id:se},..."all"!==ie&&{manager_id:ie}});if("manager_sales"===H||"restaurant_sales"===H){const t=await fetch(`/api/admin-analytics/system-stats?${e}`);if(t.ok){const e=await t.json();ve(e.data)}const n=await fetch(`/api/admin-analytics/sales-trend?${e}`);if(n.ok){const e=await n.json();fe(e.data)}}if("subscriptions"===H){const e=await fetch("/api/admin-analytics/subscription-stats");if(e.ok){const t=await e.json();we(t.data)}}if("restaurants"===H){const e=new URLSearchParams({period:Q,...te&&{start_date:Z.start,end_date:Z.end},..."all"!==ie&&{manager_id:ie}}),t=await fetch(`/api/admin-analytics/regional-stats?${e}`);if(t.ok){const e=await t.json();ye(e.data)}}}catch(e){console.error("Error fetching analytics data:",e)}},Ie=e=>{const t=new Date;switch(e){case"today":return new Date(t.getFullYear(),t.getMonth(),t.getDate());case"week":const e=new Date(t);return e.setDate(t.getDate()-7),e;case"month":default:return new Date(t.getFullYear(),t.getMonth(),1);case"year":return new Date(t.getFullYear(),0,1)}},Oe=(0,a.useMemo)(()=>{const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date;return ge.filter(n=>{const a=new Date(n.issueDate||n.createdAt),r=a>=e&&a<=t;if("all"!==ie){var s;const e=(null===(s=n.managerId)||void 0===s?void 0:s.toString())===ie;return r&&e}return r})},[ge,te,Z.start,Z.end,Q,ie]),Be=(0,a.useMemo)(()=>(()=>{console.log("getSalesData called with:",{isCustomDateRange:te,dateRange:Z,activePeriod:Q,selectedRestaurant:se,selectedManager:ie});let e=1;"all"!==se?e=.05:"all"!==ie&&(e=.15);let t=1;if(te){const e=new Date(Z.start),n=new Date(Z.end),a=Math.abs(n.getTime()-e.getTime()),r=Math.ceil(a/864e5);t=r/30}else t="today"===Q?.033:"week"===Q?.233:"month"===Q?1:12;if("today"!==Q||te){if("week"!==Q||te){if("month"===Q||te){if(te){const e=new Date(Z.start),t=new Date(Z.end),n=Math.ceil((t.getTime()-e.getTime())/864e5)+1,a=2e5;return Array.from({length:Math.min(n,30)},(t,r)=>{const s=new Date(e);s.setDate(s.getDate()+r);const o=s.getTime()/1e6,i=.3*Math.sin(o)+1;return{date:`${s.getMonth()+1}/${s.getDate()}`,sales:Math.round(a*i*(n/30))}})}return Array.from({length:30},(e,n)=>({date:`${n+1}`,sales:Math.round((2e5+4e5*Math.random())*t)}))}return Array.from({length:12},(e,t)=>({date:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t],sales:Math.round((2e6+4e6*Math.random())*(.8+.4*Math.random()))}))}{const e=(new Date).getTime()/6048e5,t=(t,n,a)=>{const r=1e4*Math.sin(e+a);return t+(r-Math.floor(r))*(n-t)};return[{date:"Mon",sales:Math.round(24e4*t(.8,1.2,1))},{date:"Tue",sales:Math.round(198e3*t(.8,1.2,2))},{date:"Wed",sales:Math.round(38e4*t(.8,1.2,3))},{date:"Thu",sales:Math.round(39e4*t(.8,1.2,4))},{date:"Fri",sales:Math.round(48e4*t(.8,1.2,5))},{date:"Sat",sales:Math.round(58e4*t(.8,1.2,6))},{date:"Sun",sales:Math.round(43e4*t(.8,1.2,7))}]}}{const t=new Date,n=1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate(),a=(e,t)=>{const a=1e4*Math.sin(n);return e+(a-Math.floor(a))*(t-e)};return[{date:"9AM",sales:Math.round(8e3*a(.8,1.2)*e)},{date:"10AM",sales:Math.round(12e3*a(.9,1.3)*e)},{date:"11AM",sales:Math.round(24e3*a(.85,1.15)*e)},{date:"12PM",sales:Math.round(38e3*a(.9,1.1)*e)},{date:"1PM",sales:Math.round(35e3*a(.85,1.15)*e)},{date:"2PM",sales:Math.round(22e3*a(.8,1.2)*e)},{date:"3PM",sales:Math.round(18e3*a(.9,1.1)*e)},{date:"4PM",sales:Math.round(15e3*a(.85,1.15)*e)},{date:"5PM",sales:Math.round(2e4*a(.8,1.2)*e)},{date:"6PM",sales:Math.round(32e3*a(.9,1.1)*e)},{date:"7PM",sales:Math.round(28e3*a(.85,1.15)*e)},{date:"8PM",sales:Math.round(16e3*a(.8,1.2)*e)}]}})(),[Q,te,Z.start,Z.end,se,ie]),Le=(0,a.useMemo)(()=>[{name:"Basic Plan",value:35,subscriptions:150,revenue:Math.round(4350*(.8+.4*Math.random()))},{name:"Professional Plan",value:45,subscriptions:89,revenue:Math.round(5251*(.8+.4*Math.random()))},{name:"Enterprise Plan",value:20,subscriptions:35,revenue:Math.round(3465*(.8+.4*Math.random()))}],[ie]),Ne=(0,a.useMemo)(()=>(()=>{let e=1;if(te){const t=new Date(Z.start),n=new Date(Z.end),a=Math.abs(n.getTime()-t.getTime());e=Math.ceil(a/864e5)}else e="today"===Q?1:"week"===Q?7:"month"===Q?30:365;return[{region:"Seoul",restaurants:156,revenue:Math.round(892e3*e*(.8+.4*Math.random())),orders:Math.round(42800*e*(.8+.4*Math.random())),growth:12.5},{region:"Busan",restaurants:98,revenue:Math.round(654e3*e*(.8+.4*Math.random())),orders:Math.round(28900*e*(.8+.4*Math.random())),growth:8.9},{region:"Daegu",restaurants:67,revenue:Math.round(445e3*e*(.8+.4*Math.random())),orders:Math.round(19200*e*(.8+.4*Math.random())),growth:15.3},{region:"Incheon",restaurants:54,revenue:Math.round(312e3*e*(.8+.4*Math.random())),orders:Math.round(14500*e*(.8+.4*Math.random())),growth:6.7},{region:"Gwangju",restaurants:43,revenue:Math.round(278e3*e*(.8+.4*Math.random())),orders:Math.round(11800*e*(.8+.4*Math.random())),growth:19.2}]})(),[Q,te,Z.start,Z.end,ie]),Pe=(0,a.useMemo)(()=>(()=>{let e=1;if(te){const t=new Date(Z.start),n=new Date(Z.end);e=Math.ceil((n.getTime()-t.getTime())/864e5)+1}else e="today"===Q?1:"week"===Q?7:"month"===Q?30:365;let t=1;"all"!==se?t=.05:"all"!==ie&&(t=.15);const n=Be.reduce((e,t)=>e+t.sales,0),a=Math.round((1200+300*Math.random())*t),r=n*("today"===Q?1:e)*t,s=a*e,o=Math.round(Le.reduce((e,t)=>e+t.subscriptions,0)*t),i="all"!==se?1:"all"!==ie?Math.round(.15*Ne.reduce((e,t)=>e+t.restaurants,0)):Ne.reduce((e,t)=>e+t.restaurants,0);return console.log("System metrics calculation:",{period:Q,multiplier:e,filterReduction:t,selectedRestaurant:se,selectedManager:ie,baseDailyRevenue:n,totalRevenue:r,totalOrders:s}),{totalRevenue:Math.round(r),totalSubscriptions:o,totalRestaurants:i,totalOrders:Math.round(s),avgOrderValue:s>0?Math.round(r/s):0}})(),[Be,Le,Ne,te,Z,Q,se,ie]),We=e=>{console.log("Period changed to:",e),X(e),ne(!1),re(e=>e+1);const t=new Date;let n=new Date;switch(e){case"today":n=new Date(t);break;case"week":n=new Date(t.getTime()-6048e5);break;case"month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"year":n=new Date(t.getFullYear(),0,1)}ee({start:n.toISOString().split("T")[0],end:t.toISOString().split("T")[0]})},ze=()=>{const e={period:te?`${Z.start} to ${Z.end}`:Q,generatedAt:(new Date).toISOString(),tab:H,metrics:Pe,filteredInvoices:Oe,filters:{restaurant:se,manager:ie}},t=Ue(e),n=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(n),a.download=`system_admin_report_${H}_${Z.start}_to_${Z.end}.csv`,a.click()},Ue=e=>{let t="System Administrator Analytics Report\n";if(t+=`Generated: ${(new Date).toLocaleString()}\n`,t+=`Period: ${e.period}\n`,t+=`Report Type: ${e.tab.toUpperCase()}\n`,t+=`Filters: Manager=${be}, Restaurant=${Fe}\n\n`,"manager_sales"===H){t+="MANAGER SALES REPORT (Invoice Revenue - Royalty & Rent)\n",t+=`Invoice Revenue,${(0,f.vv)(.15*e.metrics.totalRevenue,n)}\n`,t+=`Total Invoices,${Math.round(e.metrics.totalOrders/100).toLocaleString()}\n`,t+=`Average Invoice Value,${(0,f.vv)(10*e.metrics.avgOrderValue,n)}\n`,t+=`Active Managers,${Math.round(e.metrics.totalRestaurants/10)}\n\n`;const a=ue.map(e=>({name:e.full_name||e.username,revenue:Math.round((15e3+2e3*e.id%25e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue);if(t+="MANAGER RANKINGS\n",t+=`Rank,Manager Name,Revenue (${n})\n`,a.forEach((e,n)=>{t+=`${n+1},${e.name},${e.revenue.toLocaleString()}\n`}),t+="\n","all"!==ie){const e=de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie||e.manager_name&&be&&e.manager_name.toLowerCase().includes(be.toLowerCase())||e.managerName&&be&&e.managerName.toLowerCase().includes(be.toLowerCase()));e.length>0&&(t+=`${be}'S RESTAURANTS\n`,t+=`Restaurant Name,Revenue (${n}),Orders,Performance\n`,e.forEach(e=>{const n=Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),a=Math.round((50+10*e.id%100)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),r=n>1e4?"Good":n>5e3?"Average":"Below Average";t+=`${e.name},${n.toLocaleString()},${a},${r}\n`}))}}else if("restaurant_sales"===H)if(t+="RESTAURANT SALES REPORT (Actual Restaurant Sales)\n",t+=`Restaurant Revenue,${(0,f.vv)(.85*e.metrics.totalRevenue,n)}\n`,t+=`Total Orders,${e.metrics.totalOrders.toLocaleString()}\n`,t+=`Average Order Value,${(0,f.vv)(e.metrics.avgOrderValue,n)}\n`,t+=`Total Restaurants,${e.metrics.totalRestaurants}\n\n`,"all"!==se){const e=de.find(e=>e.id.toString()===se);if(e){t+=`SELECTED RESTAURANT: ${e.name}\n`,t+=`Manager,${e.manager_name||e.managerName||"Unknown"}\n`,t+=`Location,${e.location||e.address||"N/A"}\n\n`;const a=8e3+1500*e.id%2e4,r=150+15*e.id%300;let s="";if("today"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=1){s="HOURLY BREAKDOWN",t+=`${s}\n`,t+=`Hour,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;for(let e=8;e<=22;e++){const n=Math.round(.033*a*(.3+1.4*Math.random())),s=Math.round(.033*r*(.3+1.4*Math.random())),o=n>.04*a?"Good":n>.025*a?"Average":"Low";t+=`${e}:00,${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`}}else if("week"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=7){s="DAILY BREAKDOWN (WEEK)",t+=`${s}\n`,t+=`Day,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach(e=>{const n=Math.round(.233*a*(.7+.6*Math.random())),s=Math.round(.233*r*(.7+.6*Math.random())),o=n>.25*a?"Good":n>.2*a?"Average":"Low";t+=`${e},${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`})}else if("year"===Q){s="MONTHLY BREAKDOWN",t+=`${s}\n`,t+=`Month,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach(e=>{const n=Math.round(12*a*(.8+.4*Math.random())),s=Math.round(12*r*(.8+.4*Math.random())),o=n>13*a?"Good":n>10*a?"Average":"Low";t+=`${e},${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`})}else{s="DAILY BREAKDOWN",t+=`${s}\n`,t+=`Date,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;const e=te?new Date(Z.start):new Date((new Date).getFullYear(),(new Date).getMonth(),1),o=te?new Date(Z.end):new Date,i=Math.ceil((o.getTime()-e.getTime())/864e5)+1;for(let n=0;n<Math.min(i,15);n++){const s=new Date(e);s.setDate(e.getDate()+n);const o=Math.round(a*(.8+.4*Math.random())),i=Math.round(r*(.8+.4*Math.random())),l=o>1.1*a?"Good":o>.9*a?"Average":"Low";t+=`${s.getMonth()+1}/${s.getDate()},${o.toLocaleString()},${i},${i>0?Math.round(o/i):0},${l}\n`}}}}else{const e=de.map(e=>({name:e.name,manager:e.manager_name||e.managerName||"Unknown",revenue:Math.round((8e3+1500*e.id%2e4)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),orders:Math.round((150+15*e.id%300)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue);t+="RESTAURANT RANKINGS\n",t+=`Rank,Restaurant Name,Manager,Revenue (${n}),Orders,Avg Order Value (${n})\n`,e.forEach((e,n)=>{t+=`${n+1},${e.name},${e.manager},${e.revenue.toLocaleString()},${e.orders},${Math.round(e.revenue/e.orders)}\n`})}else if("subscriptions"===H){t+="SUBSCRIPTION REPORT\n";const e="all"===ie?de:de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie||e.manager_name&&be&&e.manager_name.toLowerCase().includes(be.toLowerCase())||e.managerName&&be&&e.managerName.toLowerCase().includes(be.toLowerCase())),a=e.length,r=e.reduce((e,t)=>e+(t.plan_amount||t.planAmount||0),0),s=e.filter(e=>"active"===(e.status||"active")).length;t+=`Total Subscriptions,${a}\n`,t+=`Active Subscriptions,${s}\n`,t+=`Total Monthly Revenue,${(0,f.vv)(r,n)}\n`,t+=`Average Monthly Revenue per Restaurant,${(0,f.vv)(a>0?r/a:0,n)}\n\n`,t+="RESTAURANT SUBSCRIPTION DETAILS\n",t+=`Restaurant Name,Manager,Plan Type,Monthly Fee (${n}),Status,Subscription Start,Subscription End,Location\n`,e.forEach(e=>{const n=e.name||"Unknown Restaurant",a=e.manager_name||e.managerName||"Unknown Manager",r=e.plan_type||e.planType||"Basic Plan",s=(e.plan_amount||e.planAmount||29).toFixed(2),o=e.status||"active",i=e.subscription_start?new Date(e.subscription_start).toLocaleDateString():e.subscriptionStart?new Date(e.subscriptionStart).toLocaleDateString():"N/A",l=e.subscription_end?new Date(e.subscription_end).toLocaleDateString():e.subscriptionEnd?new Date(e.subscriptionEnd).toLocaleDateString():"N/A",d=e.address||e.location||"N/A";t+=`${n},${a},${r},${s},${o},${i},${l},"${d}"\n`}),t+="\nPLAN DISTRIBUTION SUMMARY\n";const o={},i={};e.forEach(e=>{const t=e.plan_type||e.planType||"Basic Plan",n=e.plan_amount||e.planAmount||29;o[t]=(o[t]||0)+1,i[t]=(i[t]||0)+n}),t+=`Plan Type,Subscribers,Monthly Revenue (${n}),Avg Revenue per Subscriber (${n})\n`,Object.keys(o).forEach(e=>{const n=o[e],a=i[e],r=a/n;t+=`${e},${n},${a.toFixed(2)},${r.toFixed(2)}\n`})}else if("system"===H){t+="SYSTEM ANALYTICS REPORT\n";const a=de.reduce((e,t)=>e+parseFloat(t.planAmount||t.plan_amount||"0"),0),r="today"===Q?.033:"week"===Q?.25:"month"===Q?1:12,s=Math.round(a*r*150);t+=`Total Business Volume,${(0,f.vv)(s,n)}\n`,t+=`Growth Rate,${(10*Math.random()-5+12.5).toFixed(1)}%\n`,t+=`Market Penetration,${Math.round(.15*de.length)}%\n`,t+=`Customer Satisfaction,${(4.2+.6*Math.random()).toFixed(1)}/5.0\n\n`,t+="PLAN TYPE PERFORMANCE\n",t+="Plan Type,Subscribers,Revenue Share,Growth Rate\n";const o={};de.forEach(t=>{var n;const a=t.plan_type||t.planType||"Basic Plan",r=((null===(n=e.filteredInvoices)||void 0===n?void 0:n.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}))||[]).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);o[a]||(o[a]={subscribers:0,revenue:0}),o[a].subscribers+=1,o[a].revenue+=r});const i=Object.values(o).reduce((e,t)=>e+t.revenue,0);Object.entries(o).sort((e,t)=>{let[,n]=e,[,a]=t;return a.revenue-n.revenue}).forEach(e=>{let[n,a]=e;t+=`${n},${a.subscribers},${(a.revenue/i*100).toFixed(1)}%,+${(8+12*Math.random()).toFixed(1)}%\n`}),t+="\nMANAGER PERFORMANCE RANKING\n",t+=`Rank,Manager,Restaurants,Total Revenue (${n})\n`;const l={};de.forEach(t=>{var n;const a=t.manager_name||t.managerName||"Unknown",r=((null===(n=e.filteredInvoices)||void 0===n?void 0:n.filter(e=>{var n,a;return(null===(n=e.managerId)||void 0===n?void 0:n.toString())===(null===(a=t.manager_id)||void 0===a?void 0:a.toString())}))||[]).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);l[a]||(l[a]={restaurants:0,revenue:0}),l[a].restaurants+=1,l[a].revenue+=r}),Object.entries(l).sort((e,t)=>{let[,n]=e,[,a]=t;return a.revenue-n.revenue}).slice(0,10).forEach((e,n)=>{let[a,r]=e;t+=`${n+1},${a},${r.restaurants},${r.revenue.toFixed(2)}\n`}),t+="\nKEY PERFORMANCE INDICATORS\n",t+=`Average Revenue per Restaurant,${(0,f.vv)(de.reduce((e,t)=>e+parseFloat(t.planAmount||t.plan_amount||"29"),0)/de.length,n)}\n`,t+=`Manager Coverage Rate,${Math.round(ue.length/de.length*100)}%\n`,t+=`System Adoption Rate,${Math.round(de.filter(e=>"active"===e.status).length/de.length*100)}%\n`,t+=`Market Expansion Potential,${100-Math.round(.15*de.length)}% remaining\n`}return t+=`\nReport generated on ${(new Date).toLocaleString()}\n`,t},Ge=ue.filter(e=>e.full_name&&e.full_name.toLowerCase().includes(Me.toLowerCase())),Ye=()=>{le("all"),Se("All Managers"),De(""),Ae(!1),re(e=>e+1)},Ve=de.filter(e=>e.name.toLowerCase().includes($e.toLowerCase())),Ke=()=>{oe("all"),Ce("All Restaurants"),ke(""),_e(!1),re(e=>e+1)},Je=()=>(console.log("Rendering SearchableManagerDropdown, managers:",ue),(0,w.jsxs)(U,{children:[(0,w.jsx)(G,{type:"text",value:Re?Me:be,onChange:e=>De(e.target.value),onFocus:()=>{Ae(!0),"all"!==ie&&De("")},onBlur:()=>{setTimeout(()=>Ae(!1),200)},placeholder:"Search managers..."}),(0,w.jsxs)(Y,{isOpen:Re,children:[(0,w.jsx)(V,{onClick:Ye,children:"All Managers"}),0===ue.length?(0,w.jsx)(K,{children:"Loading managers..."}):Ge.length>0?Ge.map(e=>(0,w.jsx)(V,{onClick:()=>(e=>{le(e.id),Se(e.full_name),De(""),Ae(!1),re(e=>e+1)})(e),children:e.full_name||e.username||`Manager ${e.id}`},e.id)):(0,w.jsx)(K,{children:"No managers found"})]})]})),He=()=>(0,w.jsxs)(U,{children:[(0,w.jsx)(G,{type:"text",value:Te?$e:Fe,onChange:e=>ke(e.target.value),onFocus:()=>{_e(!0),"all"!==se&&ke("")},onBlur:()=>{setTimeout(()=>_e(!1),200)},placeholder:"Search restaurants..."}),(0,w.jsxs)(Y,{isOpen:Te,children:[(0,w.jsx)(V,{onClick:Ke,children:"All Restaurants"}),Ve.length>0?Ve.map(e=>(0,w.jsx)(V,{onClick:()=>(e=>{oe(e.id),Ce(e.name),ke(""),_e(!1),re(e=>e+1)})(e),children:e.name},e.id)):$e&&(0,w.jsx)(K,{children:"No restaurants found"})]})]});return(0,w.jsx)(o.A,{children:(0,w.jsxs)(y,{children:[(0,w.jsx)(M,{children:(0,w.jsx)(S,{children:"Reports"})}),(0,w.jsxs)(F,{children:[(0,w.jsxs)(i.j,{children:[(0,w.jsx)(i.oz,{active:"system"===H,onClick:()=>q("system"),children:"System Analytics"}),(0,w.jsx)(i.oz,{active:"subscriptions"===H,onClick:()=>q("subscriptions"),children:"Subscription Report"}),(0,w.jsx)(i.oz,{active:"manager_sales"===H,onClick:()=>q("manager_sales"),children:"Manager Sales"}),(0,w.jsx)(i.oz,{active:"restaurant_sales"===H,onClick:()=>q("restaurant_sales"),children:"Restaurant Sales"})]}),"manager_sales"===H&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(R,{children:[(0,w.jsxs)(A,{children:[(0,w.jsx)($,{active:"today"===Q&&!te,onClick:()=>We("today"),children:"Today"}),(0,w.jsx)($,{active:"week"===Q&&!te,onClick:()=>We("week"),children:"Week"}),(0,w.jsx)($,{active:"month"===Q&&!te,onClick:()=>We("month"),children:"Month"}),(0,w.jsx)($,{active:"year"===Q&&!te,onClick:()=>We("year"),children:"Year"}),(0,w.jsx)($,{active:te,onClick:()=>ne(!0),children:"Custom"}),te&&(0,w.jsxs)(b,{children:[(0,w.jsx)(D,{type:"date",value:Z.start,onChange:e=>{console.log("Start date changed to:",e.target.value),ee(t=>({...t,start:e.target.value}))},max:Z.end}),(0,w.jsx)(D,{type:"date",value:Z.end,onChange:e=>{console.log("End date changed to:",e.target.value),ee(t=>({...t,end:e.target.value}))},min:Z.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,w.jsxs)(A,{children:[(0,w.jsx)(Je,{}),(0,w.jsxs)(k,{onClick:ze,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,w.jsxs)(i.MD,{children:[(0,w.jsxs)(i.hI,{color:"#059669",children:[(0,w.jsx)(i.Os,{children:(0,f.vv)((()=>{if(!ge.length)return 0;const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=ge.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===ie)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===ie||n.managerName&&be&&n.managerName.toLowerCase().includes(be.toLowerCase());return s&&o}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return Math.round(n)})(),n)}),(0,w.jsx)(i.v0,{children:"Invoice Revenue"}),(0,w.jsx)(i.d1,{children:"all"!==ie?`${be}'s revenue`:"All managers revenue"})]}),(0,w.jsxs)(i.hI,{color:"#2563EB",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!ge.length)return"0";const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date;return ge.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===ie)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===ie||n.managerName&&be&&n.managerName.toLowerCase().includes(be.toLowerCase());return s&&o}).length.toLocaleString()})()}),(0,w.jsx)(i.v0,{children:"Total Invoices"}),(0,w.jsx)(i.d1,{children:"Issued invoices for period"})]}),(0,w.jsxs)(i.hI,{color:"#DC2626",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!ge.length)return(0,f.vv)(0,n);const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,a=ge.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===ie)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===ie||n.managerName&&be&&n.managerName.toLowerCase().includes(be.toLowerCase());return s&&o});if(!a.length)return(0,f.vv)(0,n);const r=a.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0)/a.length;return(0,f.vv)(Math.round(r),n)})()}),(0,w.jsx)(i.v0,{children:"Average Invoice Value"}),(0,w.jsx)(i.d1,{children:"Per invoice average"})]}),(0,w.jsxs)(i.hI,{color:"#7C3AED",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!ge.length)return"0%";const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=ge.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===ie)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===ie||n.managerName&&be&&n.managerName.toLowerCase().includes(be.toLowerCase());return s&&o});if(!n.length)return"0%";const a=n.filter(e=>"paid"===e.status).length;return`${Math.round(a/n.length*100)}%`})()}),(0,w.jsx)(i.v0,{children:"Payment Rate"}),(0,w.jsx)(i.d1,{children:"Invoice collection rate"})]})]},`manager-sales-stats-${ae}-${Q}-${ie}-${Z.start}-${Z.end}`),(0,w.jsxs)(C,{children:[(0,w.jsxs)(T,{children:[(0,w.jsx)(_,{children:"Manager Invoice Revenue Trend"}),(0,w.jsx)(l.u,{width:"100%",height:300,children:(0,w.jsxs)(d.b,{data:je.length>0?je:Be,children:[(0,w.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(h.h,{stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(x.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(_,{children:"Revenue by Region"}),(0,w.jsx)(l.u,{width:"100%",height:300,children:(0,w.jsxs)(p.r,{children:[(0,w.jsx)(m.F,{data:Ne,cx:"50%",cy:"50%",labelLine:!1,label:e=>{let{region:t,revenue:n}=e;return`${t} (${(n/Ne.reduce((e,t)=>e+t.revenue,0)*100).toFixed(1)}%)`},outerRadius:80,fill:"#8884d8",dataKey:"revenue",children:Ne.map((e,t)=>(0,w.jsx)(v.f,{fill:J[t%J.length]},`cell-${t}`))}),(0,w.jsx)(g.m,{})]})})]})]}),(0,w.jsxs)(N,{children:[(0,w.jsx)(_,{children:"all"!==ie?`${be}'s Restaurants`:"All Restaurants by Manager"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"Restaurant Name"}),(0,w.jsx)(B,{children:"Manager"}),(0,w.jsx)(B,{children:"Invoice Revenue"}),(0,w.jsx)(B,{children:"Monthly Fee"}),(0,w.jsx)(B,{children:"Status"}),(0,w.jsx)(B,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:("all"!==ie?de.filter(e=>{if(console.log("Filtering restaurant:",e.name,"manager_id:",e.manager_id,"managerId:",e.managerId,"selected:",ie),e.manager_id&&e.manager_id.toString()===ie)return!0;if(e.managerId&&e.managerId.toString()===ie)return!0;const t=e.manager_name||e.managerName;return!!(t&&be&&t.toLowerCase().includes(be.toLowerCase()))}).map(e=>({id:e.id,name:e.name,manager:be,revenue:Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),monthlyFee:Math.round(2e3+500*e.id%3e3),status:"active"===e.status?"Active":"Inactive",performance:Math.round(75+3*e.id%25)})):de.slice(0,15).map(e=>{const t=e.manager_id?ue.findIndex(t=>t.id===e.manager_id):e.id%ue.length,n=ue[t]||ue[0];return{id:e.id,name:e.name,manager:(null===n||void 0===n?void 0:n.full_name)||(null===n||void 0===n?void 0:n.username)||"Unassigned",revenue:Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),monthlyFee:Math.round(2e3+500*e.id%3e3),status:"active"===e.status?"Active":"Inactive",performance:Math.round(75+3*e.id%25)}})).map((e,t)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(L,{children:e.manager}),(0,w.jsx)(L,{children:(0,f.vv)(e.revenue,n)}),(0,w.jsx)(L,{children:(0,f.vv)(e.monthlyFee,n)}),(0,w.jsx)(L,{children:(0,w.jsx)("span",{style:{color:"Active"===e.status?"#059669":"#DC2626",fontWeight:500},children:e.status})}),(0,w.jsx)(L,{children:(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)(z,{percentage:e.performance}),(0,w.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[e.performance,"%"]})]})})]},e.id||t))})]})]}),"all"===ie&&(0,w.jsxs)(N,{children:[(0,w.jsx)(_,{children:"Top Managers by Invoice Revenue (Royalty & Rent)"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"Rank"}),(0,w.jsx)(B,{children:"Manager Name"}),(0,w.jsx)(B,{children:"Total Invoice Revenue"}),(0,w.jsx)(B,{children:"Restaurants"}),(0,w.jsx)(B,{children:"Avg. per Restaurant"}),(0,w.jsx)(B,{children:"Growth"})]})}),(0,w.jsx)("tbody",{children:ue.slice(0,5).map((e,t)=>{const a=t+1,r=6e4-8e3*a,s=Math.round(r*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),o=Math.floor(10*Math.random())+5;return(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{children:(0,w.jsx)(W,{rank:a,children:a})}),(0,w.jsx)(L,{style:{fontWeight:600},children:e.full_name||e.username||`Manager ${a}`}),(0,w.jsx)(L,{children:(0,f.vv)(s,n)}),(0,w.jsx)(L,{children:o}),(0,w.jsx)(L,{children:(0,f.vv)(Math.round(s/o),n)}),(0,w.jsxs)(L,{style:{color:a<=3?"#059669":"#DC2626"},children:[a<=3?"+":"-",Math.abs(20-3*a),"%"]})]},e.id)})})]})]})]}),"restaurant_sales"===H&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(R,{children:[(0,w.jsxs)(A,{children:[(0,w.jsx)($,{active:"today"===Q&&!te,onClick:()=>We("today"),children:"Today"}),(0,w.jsx)($,{active:"week"===Q&&!te,onClick:()=>We("week"),children:"Week"}),(0,w.jsx)($,{active:"month"===Q&&!te,onClick:()=>We("month"),children:"Month"}),(0,w.jsx)($,{active:"year"===Q&&!te,onClick:()=>We("year"),children:"Year"}),(0,w.jsx)($,{active:te,onClick:()=>ne(!0),children:"Custom"}),te&&(0,w.jsxs)(b,{children:[(0,w.jsx)(D,{type:"date",value:Z.start,onChange:e=>{console.log("Start date changed to:",e.target.value),ee(t=>({...t,start:e.target.value}))},max:Z.end}),(0,w.jsx)(D,{type:"date",value:Z.end,onChange:e=>{console.log("End date changed to:",e.target.value),ee(t=>({...t,end:e.target.value}))},min:Z.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,w.jsxs)(A,{children:[(0,w.jsx)(He,{}),(0,w.jsxs)(k,{onClick:ze,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,w.jsxs)(i.MD,{children:[(0,w.jsxs)(i.hI,{color:"#059669",children:[(0,w.jsx)(i.Os,{children:(0,f.vv)((()=>{if(!pe.length)return 0;const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=pe.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===se)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===se;return s&&o&&"completed"===n.status}).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return Math.round(n)})(),n)}),(0,w.jsx)(i.v0,{children:"Restaurant Revenue"}),(0,w.jsx)(i.d1,{children:"all"!==se?`${Fe} sales`:"All restaurants sales"})]}),(0,w.jsxs)(i.hI,{color:"#2563EB",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!pe.length)return"0";const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date;return pe.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===se)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===se;return s&&o&&"completed"===n.status}).length.toLocaleString()})()}),(0,w.jsx)(i.v0,{children:"Total Orders"}),(0,w.jsx)(i.d1,{children:"Completed orders for period"})]}),(0,w.jsxs)(i.hI,{color:"#DC2626",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!pe.length)return(0,f.vv)(0,n);const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,a=pe.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===se)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===se;return s&&o&&"completed"===n.status});if(!a.length)return(0,f.vv)(0,n);const r=a.reduce((e,t)=>e+parseFloat(t.total_amount||0),0)/a.length;return(0,f.vv)(Math.round(r),n)})()}),(0,w.jsx)(i.v0,{children:"Average Order Value"}),(0,w.jsx)(i.d1,{children:"Per order average"})]}),(0,w.jsxs)(i.hI,{color:"#7C3AED",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!pe.length)return"0%";const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=pe.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===se)return s;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===se;return s&&o});if(!n.length)return"0%";const a=n.filter(e=>"completed"===e.status).length;return`${Math.round(a/n.length*100)}%`})()}),(0,w.jsx)(i.v0,{children:"Order Success Rate"}),(0,w.jsx)(i.d1,{children:"Orders completion rate"})]})]},`restaurant-sales-stats-${ae}-${Q}-${se}-${Z.start}-${Z.end}`),(0,w.jsxs)(C,{children:[(0,w.jsxs)(T,{children:[(0,w.jsx)(_,{children:"Restaurant Sales Trend"}),(0,w.jsx)(l.u,{width:"100%",height:300,children:(0,w.jsxs)(d.b,{data:Be.map(e=>({...e,sales:Math.round(.85*e.sales)})),children:[(0,w.jsx)(c.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,w.jsx)(u.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(h.h,{stroke:"#6B7C93",fontSize:12}),(0,w.jsx)(g.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,w.jsx)(x.N,{type:"monotone",dataKey:"sales",stroke:"#059669",strokeWidth:2,dot:{fill:"#059669",r:4}})]})})]}),(0,w.jsxs)(T,{children:[(0,w.jsx)(_,{children:"Sales by Category"}),(0,w.jsx)(l.u,{width:"100%",height:300,children:(0,w.jsxs)(p.r,{children:[(0,w.jsx)(m.F,{data:[{name:"Food",value:45,revenue:Math.round(.45*Pe.totalRevenue)},{name:"Beverage",value:25,revenue:Math.round(.25*Pe.totalRevenue)},{name:"Dessert",value:15,revenue:Math.round(.15*Pe.totalRevenue)},{name:"Others",value:15,revenue:Math.round(.15*Pe.totalRevenue)}],cx:"50%",cy:"50%",labelLine:!1,label:e=>{let{name:t,value:n}=e;return`${t} ${n}%`},outerRadius:80,fill:"#8884d8",dataKey:"value",children:[0,1,2,3].map((e,t)=>(0,w.jsx)(v.f,{fill:J[t%J.length]},`cell-${t}`))}),(0,w.jsx)(g.m,{})]})})]})]}),"all"!==se?(0,w.jsxs)(N,{children:[(0,w.jsxs)(_,{children:[(null===(e=de.find(e=>e.id.toString()===se))||void 0===e?void 0:e.name)||"Selected Restaurant"," - Sales Breakdown"]}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"today"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=1?"Hour":"week"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=7?"Day":"year"===Q?"Month":"Date"}),(0,w.jsx)(B,{children:"Sales (RM)"}),(0,w.jsx)(B,{children:"Orders"}),(0,w.jsx)(B,{children:"Avg. Order Value"}),(0,w.jsx)(B,{children:"Performance"})]})}),(0,w.jsx)("tbody",{children:(()=>{const e=de.find(e=>e.id.toString()===se);if(!e)return[];let t=[];const a=8e3+1500*e.id%2e4,r=150+15*e.id%300;if("today"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=1)for(let n=8;n<=22;n++){const e=Math.round(.033*a*(.3+1.4*Math.random())),s=Math.round(.033*r*(.3+1.4*Math.random()));t.push({period:`${n}:00`,revenue:e,orders:s,avgOrder:s>0?e/s:0,performance:e>.04*a?"Good":e>.025*a?"Average":"Low"})}else if("week"===Q||te&&Math.ceil((new Date(Z.end).getTime()-new Date(Z.start).getTime())/864e5)<=7){["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach(e=>{const n=Math.round(.233*a*(.7+.6*Math.random())),s=Math.round(.233*r*(.7+.6*Math.random()));t.push({period:e,revenue:n,orders:s,avgOrder:s>0?n/s:0,performance:n>.25*a?"Good":n>.2*a?"Average":"Low"})})}else if("year"===Q){["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach(e=>{const n=Math.round(12*a*(.8+.4*Math.random())),s=Math.round(12*r*(.8+.4*Math.random()));t.push({period:e,revenue:n,orders:s,avgOrder:s>0?n/s:0,performance:n>13*a?"Good":n>10*a?"Average":"Low"})})}else{const e=te?new Date(Z.start):new Date((new Date).getFullYear(),(new Date).getMonth(),1),n=te?new Date(Z.end):new Date,s=Math.ceil((n.getTime()-e.getTime())/864e5)+1;for(let o=0;o<Math.min(s,31);o++){const n=new Date(e);n.setDate(e.getDate()+o);const s=Math.round(a*(.8+.4*Math.random())),i=Math.round(r*(.8+.4*Math.random()));t.push({period:`${n.getMonth()+1}/${n.getDate()}`,revenue:s,orders:i,avgOrder:i>0?s/i:0,performance:s>1.1*a?"Good":s>.9*a?"Average":"Low"})}}return t.slice(0,15).map((e,t)=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{style:{fontWeight:600},children:e.period}),(0,w.jsx)(L,{children:(0,f.vv)(e.revenue,n)}),(0,w.jsx)(L,{children:e.orders}),(0,w.jsx)(L,{children:(0,f.vv)(Math.round(e.avgOrder),n)}),(0,w.jsx)(L,{style:{color:"Good"===e.performance?"#059669":"Average"===e.performance?"#F59E0B":"#DC2626",fontWeight:500},children:e.performance})]},t))})()})]})]}):(0,w.jsxs)(N,{children:[(0,w.jsx)(_,{children:"Top Restaurants by Sales Revenue"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"Rank"}),(0,w.jsx)(B,{children:"Restaurant Name"}),(0,w.jsx)(B,{children:"Total Sales"}),(0,w.jsx)(B,{children:"Orders"}),(0,w.jsx)(B,{children:"Avg. Order Value"}),(0,w.jsx)(B,{children:"Growth"})]})}),(0,w.jsx)("tbody",{children:de.map(e=>({id:e.id,name:e.name,manager:e.manager_name||e.managerName||"Unknown",revenue:Math.round((8e3+1500*e.id%2e4)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),orders:Math.round((150+15*e.id%300)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue).slice(0,10).map((e,t)=>{const a=t+1;return(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{children:(0,w.jsx)(W,{rank:a,children:a})}),(0,w.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(L,{children:(0,f.vv)(e.revenue,n)}),(0,w.jsx)(L,{children:e.orders.toLocaleString()}),(0,w.jsx)(L,{children:(0,f.vv)(Math.round(e.revenue/e.orders),n)}),(0,w.jsxs)(L,{style:{color:a<=5?"#059669":"#DC2626"},children:[a<=5?"+":"-",Math.abs(20-2*a),"%"]})]},e.id)})})]})]})]}),"subscriptions"===H&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(R,{children:[(0,w.jsxs)(A,{children:[(0,w.jsx)($,{active:"today"===Q&&!te,onClick:()=>We("today"),children:"Today"}),(0,w.jsx)($,{active:"week"===Q&&!te,onClick:()=>We("week"),children:"Week"}),(0,w.jsx)($,{active:"month"===Q&&!te,onClick:()=>We("month"),children:"Month"}),(0,w.jsx)($,{active:"year"===Q&&!te,onClick:()=>We("year"),children:"Year"}),(0,w.jsx)($,{active:te,onClick:()=>ne(!0),children:"Custom"}),te&&(0,w.jsxs)(b,{children:[(0,w.jsx)(D,{type:"date",value:Z.start,onChange:e=>{console.log("Start date changed to:",e.target.value),ee(t=>({...t,start:e.target.value}))},max:Z.end}),(0,w.jsx)(D,{type:"date",value:Z.end,onChange:e=>{console.log("End date changed to:",e.target.value),ee(t=>({...t,end:e.target.value}))},min:Z.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,w.jsxs)(A,{children:[(0,w.jsx)(Je,{}),(0,w.jsxs)(k,{onClick:ze,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,w.jsxs)(i.MD,{children:[(0,w.jsxs)(i.hI,{color:"#635BFF",children:[(0,w.jsx)(i.Os,{children:(()=>{let e="all"!==ie?de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie):de;const t=te?new Date(Z.start):Ie(Q),n=te?new Date(Z.end):new Date;return e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t}),e.length})()}),(0,w.jsx)(i.v0,{children:"Total Subscriptions"}),(0,w.jsxs)(i.d1,{children:["all"!==ie?`${be}'s restaurants`:"All restaurants"," in period"]})]}),(0,w.jsxs)(i.hI,{color:"#2563EB",children:[(0,w.jsx)(i.Os,{children:(()=>{let e="all"!==ie?de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie):de;const t=te?new Date(Z.start):Ie(Q),n=te?new Date(Z.end):new Date;e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t});const a={};e.forEach(e=>{const t=e.plan_type||e.planType||"Basic Plan";a[t]=(a[t]||0)+1});return Object.keys(a).reduce((e,t)=>a[e]>a[t]?e:t,"Professional")})()}),(0,w.jsx)(i.v0,{children:"Most Popular Plan"}),(0,w.jsx)(i.d1,{children:"Most common in period"})]}),(0,w.jsxs)(i.hI,{color:"#059669",children:[(0,w.jsx)(i.Os,{children:(0,f.vv)((()=>{let e="all"!==ie?de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie):de;const t=te?new Date(Z.start):Ie(Q),n=te?new Date(Z.end):new Date;e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t});return e.reduce((e,a)=>{const r=parseFloat(a.planAmount||a.plan_amount||"0"),s=a.subscription_start||a.subscriptionStart,o=a.subscription_end||a.subscriptionEnd;if(!s)return e+r;const i=new Date(Math.max(new Date(s).getTime(),t.getTime())),l=new Date(Math.min(o?new Date(o).getTime():n.getTime(),n.getTime())),d=Math.max(1,Math.ceil((l.getTime()-i.getTime())/2592e6));return e+r*Math.min(d,"today"===Q?.033:"week"===Q?.25:"month"===Q?1:12)},0)})(),n)}),(0,w.jsx)(i.v0,{children:"Total Revenue"}),(0,w.jsx)(i.d1,{children:"Revenue for selected period"})]}),(0,w.jsxs)(i.hI,{color:"#DC2626",children:[(0,w.jsx)(i.Os,{children:(()=>{let e="all"!==ie?de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie):de;const t=te?new Date(Z.start):Ie(Q),n=te?new Date(Z.end):new Date;return e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return"active"===e.status;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return"active"===e.status&&s<=n&&o>=t}),e.length})()}),(0,w.jsx)(i.v0,{children:"Active Plans"}),(0,w.jsx)(i.d1,{children:"Active in period"})]})]},`subscription-stats-${ae}-${Q}-${ie}-${Z.start}-${Z.end}`),(0,w.jsxs)(N,{children:[(0,w.jsx)(_,{children:"Restaurant Subscriptions"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"Restaurant Name"}),(0,w.jsx)(B,{children:"Manager"}),(0,w.jsx)(B,{children:"Plan Type"}),(0,w.jsx)(B,{children:"Monthly Fee"}),(0,w.jsx)(B,{children:"Status"}),(0,w.jsx)(B,{children:"Subscription Period"}),(0,w.jsx)(B,{children:"Location"})]})}),(0,w.jsx)("tbody",{children:(()=>{let e="all"!==ie?de.filter(e=>e.manager_id&&e.manager_id.toString()===ie||e.managerId&&e.managerId.toString()===ie):de;const t=te?new Date(Z.start):Ie(Q),a=te?new Date(Z.end):new Date;return e=e.filter(e=>{const n=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!n)return!0;const s=new Date(n),o=r?new Date(r):new Date("2099-12-31");return s<=a&&o>=t}),e.map(e=>(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,w.jsx)(L,{children:e.manager_name||e.managerName||"Unknown"}),(0,w.jsx)(L,{children:(0,w.jsx)("span",{style:{background:"Enterprise Plan"===e.planType?"#8B5CF6":"Professional Plan"===e.planType?"#059669":"#635BFF",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:500},children:e.planType||e.plan_type||"Basic"})}),(0,w.jsx)(L,{children:(0,f.vv)(parseFloat(e.planAmount||e.plan_amount||"29.00"),n)}),(0,w.jsx)(L,{children:(0,w.jsx)("span",{style:{color:"active"===e.status?"#059669":"inactive"===e.status?"#DC2626":"#F59E0B",fontWeight:600,textTransform:"capitalize"},children:e.status||"Active"})}),(0,w.jsx)(L,{children:e.subscriptionStart&&e.subscriptionEnd?`${e.subscriptionStart} - ${e.subscriptionEnd}`:e.subscription_start&&e.subscription_end?`${e.subscription_start} - ${e.subscription_end}`:"N/A"}),(0,w.jsx)(L,{children:e.location||e.address||"N/A"})]},e.id))})()})]})]},`subscription-table-${ae}-${Q}-${ie}-${Z.start}-${Z.end}`)]}),"system"===H&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(R,{children:[(0,w.jsxs)(A,{children:[(0,w.jsx)($,{active:"today"===Q&&!te,onClick:()=>We("today"),children:"Today"}),(0,w.jsx)($,{active:"week"===Q&&!te,onClick:()=>We("week"),children:"Week"}),(0,w.jsx)($,{active:"month"===Q&&!te,onClick:()=>We("month"),children:"Month"}),(0,w.jsx)($,{active:"year"===Q&&!te,onClick:()=>We("year"),children:"Year"}),(0,w.jsx)($,{active:te,onClick:()=>ne(!0),children:"Custom"}),te&&(0,w.jsxs)(b,{children:[(0,w.jsx)(D,{type:"date",value:Z.start,onChange:e=>{ee(t=>({...t,start:e.target.value}))},max:Z.end}),(0,w.jsx)(D,{type:"date",value:Z.end,onChange:e=>{ee(t=>({...t,end:e.target.value}))},min:Z.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,w.jsx)(A,{children:(0,w.jsxs)(k,{onClick:ze,children:[(0,w.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})})]}),(0,w.jsxs)(i.MD,{children:[(0,w.jsxs)(i.hI,{color:"#635BFF",children:[(0,w.jsx)(i.Os,{children:(0,f.vv)((()=>{if(!ge.length)return 0;const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=ge.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return Math.round(n)})(),n)}),(0,w.jsx)(i.v0,{children:"Total Business Volume"}),(0,w.jsx)(i.d1,{children:"Invoice-based revenue for period"})]}),(0,w.jsxs)(i.hI,{color:"#059669",children:[(0,w.jsx)(i.Os,{children:(()=>{if(!ge.length)return"+0.0%";const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,n=Math.ceil((t.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-n);const r=new Date(e),s=ge.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0),o=ge.filter(e=>{const t=new Date(e.issueDate||e.createdAt);return t>=a&&t<=r}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0),i=o>0?(s-o)/o*100:0;return i>0?`+${i.toFixed(1)}%`:`${i.toFixed(1)}%`})()}),(0,w.jsx)(i.v0,{children:"Growth Rate"}),(0,w.jsx)(i.d1,{children:"Compared to previous period"})]}),(0,w.jsxs)(i.hI,{color:"#2563EB",children:[(0,w.jsxs)(i.Os,{children:[(de.filter(e=>"active"===e.status).length/2e5*100).toFixed(2),"%"]}),(0,w.jsx)(i.v0,{children:"Market Penetration"}),(0,w.jsx)(i.d1,{children:"Of estimated market covered"})]}),(0,w.jsxs)(i.hI,{color:"#7C3AED",children:[(0,w.jsxs)(i.Os,{children:[(()=>{if(!ge.length||!de.length)return"0.0/5.0";const e=ge.filter(e=>"paid"===e.status).length,t=ge.length>0?e/ge.length:0,n=de.filter(e=>"active"===e.status).length;return(5*(.6*t+.4*(de.length>0?n/de.length:0))).toFixed(1)})(),"/5.0"]}),(0,w.jsx)(i.v0,{children:"Customer Satisfaction"}),(0,w.jsx)(i.d1,{children:"Based on payment & retention"})]})]},`system-analytics-${ae}-${Q}-${Z.start}-${Z.end}`),(0,w.jsxs)(I,{children:[(0,w.jsxs)(E,{children:[(0,w.jsx)(_,{children:"Top Performing Plan Types"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsxs)(B,{children:["Plan",(0,w.jsx)("br",{}),"Type"]}),(0,w.jsxs)(B,{children:["Sub-",(0,w.jsx)("br",{}),"scribers"]}),(0,w.jsxs)(B,{children:["Revenue",(0,w.jsx)("br",{}),"Share"]}),(0,w.jsx)(B,{children:"Growth"})]})}),(0,w.jsx)("tbody",{children:(()=>{const e={};de.forEach(t=>{const n=t.plan_type||t.planType||"Basic Plan";e[n]||(e[n]={subscribers:0,revenue:0,invoiceRevenue:0}),e[n].subscribers+=1,e[n].revenue+=parseFloat(t.planAmount||t.plan_amount||29);const a=Oe.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);e[n].invoiceRevenue+=a});const t=Object.values(e).reduce((e,t)=>e+t.invoiceRevenue,0);return Object.entries(e).sort((e,t)=>{let[,n]=e,[,a]=t;return a.invoiceRevenue-n.invoiceRevenue}).map(e=>{let[n,a]=e;const r=a.revenue>0?(a.invoiceRevenue-a.revenue)/a.revenue*100:0;return(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{style:{fontWeight:600},children:n}),(0,w.jsx)(L,{children:a.subscribers}),(0,w.jsxs)(L,{children:[t>0?(a.invoiceRevenue/t*100).toFixed(1):"0.0","%"]}),(0,w.jsxs)(L,{style:{color:r>=0?"#059669":"#DC2626"},children:[r>=0?"+":"",r.toFixed(1),"%"]})]},n)})})()})]})]}),(0,w.jsxs)(E,{children:[(0,w.jsx)(_,{children:"Manager Performance Ranking"}),(0,w.jsxs)(O,{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)(B,{children:"Rank"}),(0,w.jsx)(B,{children:"Manager"}),(0,w.jsxs)(B,{children:["Restau-",(0,w.jsx)("br",{}),"rants"]}),(0,w.jsxs)(B,{children:["Total",(0,w.jsx)("br",{}),"Revenue"]})]})}),(0,w.jsx)("tbody",{children:(()=>{const e={};return de.forEach(t=>{const n=t.manager_name||t.managerName||"Unknown Manager";e[n]||(e[n]={restaurants:0,subscriptionRevenue:0,invoiceRevenue:0}),e[n].restaurants+=1,e[n].subscriptionRevenue+=parseFloat(t.planAmount||t.plan_amount||29);const a=Oe.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);e[n].invoiceRevenue+=a}),Object.entries(e).sort((e,t)=>{let[,n]=e,[,a]=t;return a.invoiceRevenue-n.invoiceRevenue}).slice(0,5).map((e,t)=>{let[a,r]=e;return(0,w.jsxs)("tr",{children:[(0,w.jsx)(L,{style:{fontWeight:600},children:(0,w.jsxs)("span",{style:{background:0===t?"#FFD700":1===t?"#C0C0C0":2===t?"#CD7F32":"#E6EBF1",color:t<3?"white":"#6B7C93",padding:"4px 8px",borderRadius:"12px",fontSize:"12px",fontWeight:600},children:["#",t+1]})}),(0,w.jsx)(L,{children:a}),(0,w.jsx)(L,{children:r.restaurants}),(0,w.jsx)(L,{children:(0,f.vv)(r.invoiceRevenue,n)})]},a)})})()})]})]})]}),(0,w.jsxs)(N,{children:[(0,w.jsx)(_,{children:"Business Intelligence Insights"}),(0,w.jsx)("div",{style:{padding:"20px"},children:(0,w.jsxs)(P,{children:[(0,w.jsxs)("div",{children:[(0,w.jsx)("h4",{style:{margin:"0 0 12px 0",color:"#2B3674",fontSize:"16px",fontWeight:600},children:"Revenue Distribution"}),(0,w.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:(()=>{const e={};let t=0;return de.forEach(n=>{const a=n.plan_type||n.planType||"Basic Plan",r=parseFloat(n.planAmount||n.plan_amount||"29");e[a]=(e[a]||0)+r,t+=r}),Object.entries(e).map(e=>{let[n,a]=e;return(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,w.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:n}),(0,w.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,w.jsx)("div",{style:{width:"60px",height:"6px",background:"#E6EBF1",borderRadius:"3px",overflow:"hidden"},children:(0,w.jsx)("div",{style:{width:a/t*100+"%",height:"100%",background:n.includes("Enterprise")?"#8B5CF6":n.includes("Professional")?"#059669":"#635BFF"}})}),(0,w.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2B3674",minWidth:"40px"},children:[(a/t*100).toFixed(1),"%"]})]})]},n)})})()})]}),(0,w.jsxs)("div",{children:[(0,w.jsx)("h4",{style:{margin:"0 0 12px 0",color:"#2B3674",fontSize:"16px",fontWeight:600},children:"Key Performance Indicators"}),(0,w.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,w.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Average Invoice Revenue per Restaurant"}),(0,w.jsx)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2B3674"},children:(()=>{if(!ge.length||!de.length)return(0,f.vv)(0,n);const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,a=ge.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return(0,f.vv)(a/de.length,n)})()})]}),(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,w.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Invoice Payment Rate"}),(0,w.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#059669"},children:[(()=>{if(!ge.length)return"0";const e=ge.filter(e=>"paid"===e.status).length;return Math.round(e/ge.length*100)})(),"%"]})]}),(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,w.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"System Adoption Rate"}),(0,w.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2563EB"},children:[de.length>0?Math.round(de.filter(e=>"active"===e.status).length/de.length*100):0,"%"]})]}),(0,w.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,w.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Revenue per Manager"}),(0,w.jsx)("span",{style:{fontSize:"14px",fontWeight:600,color:"#7C3AED"},children:(()=>{if(!ge.length||!ue.length)return(0,f.vv)(0,n);const e=te?new Date(Z.start):Ie(Q),t=te?new Date(Z.end):new Date,a=ge.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return(0,f.vv)(a/ue.length,n)})()})]})]})]})]})})]})]})]})]})})}}]]);