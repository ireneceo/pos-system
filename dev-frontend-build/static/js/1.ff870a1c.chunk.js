"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1],{1:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var a=n(9950),r=n(4492),s=n(4752),o=n(8409),i=n(2597),l=n(2653),d=n(1095),c=n(2847),u=n(3245),h=n(158),g=n(3440),x=n(2174),p=n(4915),m=n(7621),v=n(5297),j=n(2528),w=n(9018),f=n(6038),y=n(4414);const M=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,b=s.Ay.div`
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
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,k=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,F=s.Ay.div`
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
`,R=s.Ay.button`
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
`,$=s.Ay.button`
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
`,C=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,E=s.Ay.div`
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
`,I=s.Ay.div`
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
`,B=s.Ay.div`
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
`,L=s.Ay.th`
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
`,N=s.Ay.td`
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
`,P=(0,s.Ay)(I)`
  margin-top: 24px;
`,z=s.Ay.div`
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
`,G=s.Ay.div`
  position: relative;
  min-width: 200px;
`,Y=s.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #635BFF;
  }
`,V=s.Ay.div`
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
`,K=s.Ay.div`
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
`,J=s.Ay.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #6B7280;
  text-align: center;
`,H=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Z=()=>{var e;const{operationSettings:t}=(0,w.Pj)(),n=t.currency,[s]=(0,r.ok)(),[Z,q]=(0,l.M)("system"),[Q,X]=(0,a.useState)("month"),[ee,te]=(0,a.useState)({start:new Date(Date.now()-2592e6).toISOString().split("T")[0],end:(new Date).toISOString().split("T")[0]}),[ne,ae]=(0,a.useState)(!1),[re,se]=(0,a.useState)(0),[oe,ie]=(0,a.useState)("all"),[le,de]=(0,a.useState)("all"),[ce,ue]=(0,a.useState)([]),[he,ge]=(0,a.useState)([]),[xe,pe]=(0,a.useState)([]),[me,ve]=(0,a.useState)([]),[,je]=(0,a.useState)(null),[we,fe]=(0,a.useState)([]),[,ye]=(0,a.useState)(null),[,Me]=(0,a.useState)([]),[be,De]=(0,a.useState)(""),[Se,ke]=(0,a.useState)("All Managers"),[Fe,Ae]=(0,a.useState)(!1),[Re,$e]=(0,a.useState)(""),[Ce,Ee]=(0,a.useState)("All Restaurants"),[Te,_e]=(0,a.useState)(!1);(0,a.useEffect)(()=>{const e=s.get("restaurantId"),t=s.get("restaurantName");e&&t&&(console.log("Setting restaurant filter from URL:",{restaurantId:e,restaurantName:t}),ie(e),Ee(decodeURIComponent(t)),q("restaurant_sales"))},[s]),(0,a.useEffect)(()=>{(async()=>{try{await fetch("/api/sample-data/create",{method:"POST"});const e=await fetch("/api/restaurants");if(e.ok){const t=await e.json();console.log("Restaurants data:",t),ue(t.data||t||[])}console.log("Fetching managers...");const t=await fetch("/api/admin-analytics/managers");if(console.log("Managers response status:",t.status),t.ok){const e=await t.json();console.log("Raw managers data:",e),console.log("Processed managers:",e.data||e||[]);const n=e.data||e||[];console.log("Final managers array:",n),ge(n)}else console.error("Failed to fetch managers:",t.status,await t.text());console.log("Fetching invoices...");const n=await fetch("/api/invoices");if(n.ok){const e=await n.json();console.log("Invoices data:",e),pe(e.data||e||[])}else console.error("Failed to fetch invoices:",n.status);console.log("Fetching orders...");const a=await fetch("/api/orders?limit=1000");if(a.ok){const e=await a.json();console.log("Orders data:",e),ve(e.data||e||[])}else console.error("Failed to fetch orders:",a.status)}catch(e){console.error("Error fetching filter data:",e)}})()},[]),(0,a.useEffect)(()=>{console.log("useEffect triggered:",{dateRange:ee,isCustomDateRange:ne}),Ie()},[Q,oe,le,Z,ee.start,ee.end,ne]);const Ie=async()=>{console.log("Fetching analytics data:",{isCustomDateRange:ne,dateRange:ee,activePeriod:Q});try{const e=new URLSearchParams({period:ne?"custom":Q,...ne&&{start_date:ee.start,end_date:ee.end},..."all"!==oe&&{restaurant_id:oe},..."all"!==le&&{manager_id:le}});if("manager_sales"===Z||"restaurant_sales"===Z){const t=await fetch(`/api/admin-analytics/system-stats?${e}`);if(t.ok){const e=await t.json();je(e.data)}const n=await fetch(`/api/admin-analytics/sales-trend?${e}`);if(n.ok){const e=await n.json();fe(e.data)}}if("subscriptions"===Z){const e=await fetch("/api/admin-analytics/subscription-stats");if(e.ok){const t=await e.json();ye(t.data)}}if("restaurants"===Z){const e=new URLSearchParams({period:Q,...ne&&{start_date:ee.start,end_date:ee.end},..."all"!==le&&{manager_id:le}}),t=await fetch(`/api/admin-analytics/regional-stats?${e}`);if(t.ok){const e=await t.json();Me(e.data)}}}catch(e){console.error("Error fetching analytics data:",e)}},Be=e=>{const t=new Date;switch(e){case"today":return new Date(t.getFullYear(),t.getMonth(),t.getDate());case"week":const e=new Date(t);return e.setDate(t.getDate()-7),e;case"month":default:return new Date(t.getFullYear(),t.getMonth(),1);case"year":return new Date(t.getFullYear(),0,1)}},Oe=(0,a.useMemo)(()=>{const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date;return xe.filter(n=>{const a=new Date(n.issueDate||n.createdAt),r=a>=e&&a<=t;if("all"!==le){var s;const e=(null===(s=n.managerId)||void 0===s?void 0:s.toString())===le;return r&&e}return r})},[xe,ne,ee.start,ee.end,Q,le]),Le=(0,a.useMemo)(()=>(()=>{console.log("getSalesData called with:",{isCustomDateRange:ne,dateRange:ee,activePeriod:Q,selectedRestaurant:oe,selectedManager:le});let e=1;"all"!==oe?e=.05:"all"!==le&&(e=.15);let t=1;if(ne){const e=new Date(ee.start),n=new Date(ee.end),a=Math.abs(n.getTime()-e.getTime()),r=Math.ceil(a/864e5);t=r/30}else t="today"===Q?.033:"week"===Q?.233:"month"===Q?1:12;if("today"!==Q||ne){if("week"!==Q||ne){if("month"===Q||ne){if(ne){const e=new Date(ee.start),t=new Date(ee.end),n=Math.ceil((t.getTime()-e.getTime())/864e5)+1,a=2e5;return Array.from({length:Math.min(n,30)},(t,r)=>{const s=new Date(e);s.setDate(s.getDate()+r);const o=s.getTime()/1e6,i=.3*Math.sin(o)+1;return{date:`${s.getMonth()+1}/${s.getDate()}`,sales:Math.round(a*i*(n/30))}})}return Array.from({length:30},(e,n)=>({date:`${n+1}`,sales:Math.round((2e5+4e5*Math.random())*t)}))}return Array.from({length:12},(e,t)=>({date:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t],sales:Math.round((2e6+4e6*Math.random())*(.8+.4*Math.random()))}))}{const e=(new Date).getTime()/6048e5,t=(t,n,a)=>{const r=1e4*Math.sin(e+a);return t+(r-Math.floor(r))*(n-t)};return[{date:"Mon",sales:Math.round(24e4*t(.8,1.2,1))},{date:"Tue",sales:Math.round(198e3*t(.8,1.2,2))},{date:"Wed",sales:Math.round(38e4*t(.8,1.2,3))},{date:"Thu",sales:Math.round(39e4*t(.8,1.2,4))},{date:"Fri",sales:Math.round(48e4*t(.8,1.2,5))},{date:"Sat",sales:Math.round(58e4*t(.8,1.2,6))},{date:"Sun",sales:Math.round(43e4*t(.8,1.2,7))}]}}{const t=new Date,n=1e4*t.getFullYear()+100*(t.getMonth()+1)+t.getDate(),a=(e,t)=>{const a=1e4*Math.sin(n);return e+(a-Math.floor(a))*(t-e)};return[{date:"9AM",sales:Math.round(8e3*a(.8,1.2)*e)},{date:"10AM",sales:Math.round(12e3*a(.9,1.3)*e)},{date:"11AM",sales:Math.round(24e3*a(.85,1.15)*e)},{date:"12PM",sales:Math.round(38e3*a(.9,1.1)*e)},{date:"1PM",sales:Math.round(35e3*a(.85,1.15)*e)},{date:"2PM",sales:Math.round(22e3*a(.8,1.2)*e)},{date:"3PM",sales:Math.round(18e3*a(.9,1.1)*e)},{date:"4PM",sales:Math.round(15e3*a(.85,1.15)*e)},{date:"5PM",sales:Math.round(2e4*a(.8,1.2)*e)},{date:"6PM",sales:Math.round(32e3*a(.9,1.1)*e)},{date:"7PM",sales:Math.round(28e3*a(.85,1.15)*e)},{date:"8PM",sales:Math.round(16e3*a(.8,1.2)*e)}]}})(),[Q,ne,ee.start,ee.end,oe,le]),Ne=(0,a.useMemo)(()=>[{name:"Basic Plan",value:35,subscriptions:150,revenue:Math.round(4350*(.8+.4*Math.random()))},{name:"Professional Plan",value:45,subscriptions:89,revenue:Math.round(5251*(.8+.4*Math.random()))},{name:"Enterprise Plan",value:20,subscriptions:35,revenue:Math.round(3465*(.8+.4*Math.random()))}],[le]),Pe=(0,a.useMemo)(()=>(()=>{let e=1;if(ne){const t=new Date(ee.start),n=new Date(ee.end),a=Math.abs(n.getTime()-t.getTime());e=Math.ceil(a/864e5)}else e="today"===Q?1:"week"===Q?7:"month"===Q?30:365;return[{region:"Seoul",restaurants:156,revenue:Math.round(892e3*e*(.8+.4*Math.random())),orders:Math.round(42800*e*(.8+.4*Math.random())),growth:12.5},{region:"Busan",restaurants:98,revenue:Math.round(654e3*e*(.8+.4*Math.random())),orders:Math.round(28900*e*(.8+.4*Math.random())),growth:8.9},{region:"Daegu",restaurants:67,revenue:Math.round(445e3*e*(.8+.4*Math.random())),orders:Math.round(19200*e*(.8+.4*Math.random())),growth:15.3},{region:"Incheon",restaurants:54,revenue:Math.round(312e3*e*(.8+.4*Math.random())),orders:Math.round(14500*e*(.8+.4*Math.random())),growth:6.7},{region:"Gwangju",restaurants:43,revenue:Math.round(278e3*e*(.8+.4*Math.random())),orders:Math.round(11800*e*(.8+.4*Math.random())),growth:19.2}]})(),[Q,ne,ee.start,ee.end,le]),ze=(0,a.useMemo)(()=>(()=>{let e=1;if(ne){const t=new Date(ee.start),n=new Date(ee.end);e=Math.ceil((n.getTime()-t.getTime())/864e5)+1}else e="today"===Q?1:"week"===Q?7:"month"===Q?30:365;let t=1;"all"!==oe?t=.05:"all"!==le&&(t=.15);const n=Le.reduce((e,t)=>e+t.sales,0),a=Math.round((1200+300*Math.random())*t),r=n*("today"===Q?1:e)*t,s=a*e,o=Math.round(Ne.reduce((e,t)=>e+t.subscriptions,0)*t),i="all"!==oe?1:"all"!==le?Math.round(.15*Pe.reduce((e,t)=>e+t.restaurants,0)):Pe.reduce((e,t)=>e+t.restaurants,0);return console.log("System metrics calculation:",{period:Q,multiplier:e,filterReduction:t,selectedRestaurant:oe,selectedManager:le,baseDailyRevenue:n,totalRevenue:r,totalOrders:s}),{totalRevenue:Math.round(r),totalSubscriptions:o,totalRestaurants:i,totalOrders:Math.round(s),avgOrderValue:s>0?Math.round(r/s):0}})(),[Le,Ne,Pe,ne,ee,Q,oe,le]),We=e=>{console.log("Period changed to:",e),X(e),ae(!1),se(e=>e+1);const t=new Date;let n=new Date;switch(e){case"today":n=new Date(t);break;case"week":n=new Date(t.getTime()-6048e5);break;case"month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"year":n=new Date(t.getFullYear(),0,1)}te({start:n.toISOString().split("T")[0],end:t.toISOString().split("T")[0]})},Ue=()=>{const e={period:ne?`${ee.start} to ${ee.end}`:Q,generatedAt:(new Date).toISOString(),tab:Z,metrics:ze,filteredInvoices:Oe,filters:{restaurant:oe,manager:le}},t=Ge(e),n=new Blob([t],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(n),a.download=`system_admin_report_${Z}_${ee.start}_to_${ee.end}.csv`,a.click()},Ge=e=>{let t="System Administrator Analytics Report\n";if(t+=`Generated: ${(new Date).toLocaleString()}\n`,t+=`Period: ${e.period}\n`,t+=`Report Type: ${e.tab.toUpperCase()}\n`,t+=`Filters: Manager=${Se}, Restaurant=${Ce}\n\n`,"manager_sales"===Z){t+="MANAGER SALES REPORT (Invoice Revenue - Royalty & Rent)\n",t+=`Invoice Revenue,${(0,f.vv)(.15*e.metrics.totalRevenue,n)}\n`,t+=`Total Invoices,${Math.round(e.metrics.totalOrders/100).toLocaleString()}\n`,t+=`Average Invoice Value,${(0,f.vv)(10*e.metrics.avgOrderValue,n)}\n`,t+=`Active Managers,${Math.round(e.metrics.totalRestaurants/10)}\n\n`;const a=he.map(e=>({name:e.full_name||e.username,revenue:Math.round((15e3+2e3*e.id%25e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue);if(t+="MANAGER RANKINGS\n",t+=`Rank,Manager Name,Revenue (${n})\n`,a.forEach((e,n)=>{t+=`${n+1},${e.name},${e.revenue.toLocaleString()}\n`}),t+="\n","all"!==le){const e=ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le||e.admin_name&&Se&&e.admin_name.toLowerCase().includes(Se.toLowerCase())||e.managerName&&Se&&e.managerName.toLowerCase().includes(Se.toLowerCase()));e.length>0&&(t+=`${Se}'S RESTAURANTS\n`,t+=`Restaurant Name,Revenue (${n}),Orders,Performance\n`,e.forEach(e=>{const n=Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),a=Math.round((50+10*e.id%100)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),r=n>1e4?"Good":n>5e3?"Average":"Below Average";t+=`${e.name},${n.toLocaleString()},${a},${r}\n`}))}}else if("restaurant_sales"===Z)if(t+="RESTAURANT SALES REPORT (Actual Restaurant Sales)\n",t+=`Restaurant Revenue,${(0,f.vv)(.85*e.metrics.totalRevenue,n)}\n`,t+=`Total Orders,${e.metrics.totalOrders.toLocaleString()}\n`,t+=`Average Order Value,${(0,f.vv)(e.metrics.avgOrderValue,n)}\n`,t+=`Total Restaurants,${e.metrics.totalRestaurants}\n\n`,"all"!==oe){const e=ce.find(e=>e.id.toString()===oe);if(e){t+=`SELECTED RESTAURANT: ${e.name}\n`,t+=`Manager,${e.admin_name||e.managerName||"Unknown"}\n`,t+=`Location,${e.location||e.address||"N/A"}\n\n`;const a=8e3+1500*e.id%2e4,r=150+15*e.id%300;let s="";if("today"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=1){s="HOURLY BREAKDOWN",t+=`${s}\n`,t+=`Hour,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;for(let e=8;e<=22;e++){const n=Math.round(.033*a*(.3+1.4*Math.random())),s=Math.round(.033*r*(.3+1.4*Math.random())),o=n>.04*a?"Good":n>.025*a?"Average":"Low";t+=`${e}:00,${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`}}else if("week"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=7){s="DAILY BREAKDOWN (WEEK)",t+=`${s}\n`,t+=`Day,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach(e=>{const n=Math.round(.233*a*(.7+.6*Math.random())),s=Math.round(.233*r*(.7+.6*Math.random())),o=n>.25*a?"Good":n>.2*a?"Average":"Low";t+=`${e},${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`})}else if("year"===Q){s="MONTHLY BREAKDOWN",t+=`${s}\n`,t+=`Month,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach(e=>{const n=Math.round(12*a*(.8+.4*Math.random())),s=Math.round(12*r*(.8+.4*Math.random())),o=n>13*a?"Good":n>10*a?"Average":"Low";t+=`${e},${n.toLocaleString()},${s},${s>0?Math.round(n/s):0},${o}\n`})}else{s="DAILY BREAKDOWN",t+=`${s}\n`,t+=`Date,Sales (${n}),Orders,Avg Order Value (${n}),Performance\n`;const e=ne?new Date(ee.start):new Date((new Date).getFullYear(),(new Date).getMonth(),1),o=ne?new Date(ee.end):new Date,i=Math.ceil((o.getTime()-e.getTime())/864e5)+1;for(let n=0;n<Math.min(i,15);n++){const s=new Date(e);s.setDate(e.getDate()+n);const o=Math.round(a*(.8+.4*Math.random())),i=Math.round(r*(.8+.4*Math.random())),l=o>1.1*a?"Good":o>.9*a?"Average":"Low";t+=`${s.getMonth()+1}/${s.getDate()},${o.toLocaleString()},${i},${i>0?Math.round(o/i):0},${l}\n`}}}}else{const e=ce.map(e=>({name:e.name,manager:e.admin_name||e.managerName||"Unknown",revenue:Math.round((8e3+1500*e.id%2e4)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),orders:Math.round((150+15*e.id%300)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue);t+="RESTAURANT RANKINGS\n",t+=`Rank,Restaurant Name,Manager,Revenue (${n}),Orders,Avg Order Value (${n})\n`,e.forEach((e,n)=>{t+=`${n+1},${e.name},${e.manager},${e.revenue.toLocaleString()},${e.orders},${Math.round(e.revenue/e.orders)}\n`})}else if("subscriptions"===Z){t+="SUBSCRIPTION REPORT\n";const e="all"===le?ce:ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le||e.admin_name&&Se&&e.admin_name.toLowerCase().includes(Se.toLowerCase())||e.managerName&&Se&&e.managerName.toLowerCase().includes(Se.toLowerCase())),a=e.length,r=e.reduce((e,t)=>e+(t.plan_amount||t.planAmount||0),0),s=e.filter(e=>"active"===(e.status||"active")).length;t+=`Total Subscriptions,${a}\n`,t+=`Active Subscriptions,${s}\n`,t+=`Total Monthly Revenue,${(0,f.vv)(r,n)}\n`,t+=`Average Monthly Revenue per Restaurant,${(0,f.vv)(a>0?r/a:0,n)}\n\n`,t+="RESTAURANT SUBSCRIPTION DETAILS\n",t+=`Restaurant Name,Manager,Plan Type,Monthly Fee (${n}),Status,Subscription Start,Subscription End,Location\n`,e.forEach(e=>{const n=e.name||"Unknown Restaurant",a=e.admin_name||e.managerName||"Unknown Manager",r=e.plan_type||e.planType||"Basic Plan",s=(e.plan_amount||e.planAmount||29).toFixed(2),o=e.status||"active",i=e.subscription_start?new Date(e.subscription_start).toLocaleDateString():e.subscriptionStart?new Date(e.subscriptionStart).toLocaleDateString():"N/A",l=e.subscription_end?new Date(e.subscription_end).toLocaleDateString():e.subscriptionEnd?new Date(e.subscriptionEnd).toLocaleDateString():"N/A",d=e.address||e.location||"N/A";t+=`${n},${a},${r},${s},${o},${i},${l},"${d}"\n`}),t+="\nPLAN DISTRIBUTION SUMMARY\n";const o={},i={};e.forEach(e=>{const t=e.plan_type||e.planType||"Basic Plan",n=e.plan_amount||e.planAmount||29;o[t]=(o[t]||0)+1,i[t]=(i[t]||0)+n}),t+=`Plan Type,Subscribers,Monthly Revenue (${n}),Avg Revenue per Subscriber (${n})\n`,Object.keys(o).forEach(e=>{const n=o[e],a=i[e],r=a/n;t+=`${e},${n},${a.toFixed(2)},${r.toFixed(2)}\n`})}else if("system"===Z){t+="SYSTEM ANALYTICS REPORT\n";const a=ce.reduce((e,t)=>e+parseFloat(t.planAmount||t.plan_amount||"0"),0),r="today"===Q?.033:"week"===Q?.25:"month"===Q?1:12,s=Math.round(a*r*150);t+=`Total Business Volume,${(0,f.vv)(s,n)}\n`,t+=`Growth Rate,${(10*Math.random()-5+12.5).toFixed(1)}%\n`,t+=`Market Penetration,${Math.round(.15*ce.length)}%\n`,t+=`Customer Satisfaction,${(4.2+.6*Math.random()).toFixed(1)}/5.0\n\n`,t+="PLAN TYPE PERFORMANCE\n",t+="Plan Type,Subscribers,Revenue Share,Growth Rate\n";const o={};ce.forEach(t=>{var n;const a=t.plan_type||t.planType||"Basic Plan",r=((null===(n=e.filteredInvoices)||void 0===n?void 0:n.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}))||[]).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);o[a]||(o[a]={subscribers:0,revenue:0}),o[a].subscribers+=1,o[a].revenue+=r});const i=Object.values(o).reduce((e,t)=>e+t.revenue,0);Object.entries(o).sort((e,t)=>{let[,n]=e,[,a]=t;return a.revenue-n.revenue}).forEach(e=>{let[n,a]=e;t+=`${n},${a.subscribers},${(a.revenue/i*100).toFixed(1)}%,+${(8+12*Math.random()).toFixed(1)}%\n`}),t+="\nMANAGER PERFORMANCE RANKING\n",t+=`Rank,Manager,Restaurants,Total Revenue (${n})\n`;const l={};ce.forEach(t=>{var n;const a=t.admin_name||t.managerName||"Unknown",r=((null===(n=e.filteredInvoices)||void 0===n?void 0:n.filter(e=>{var n,a;return(null===(n=e.managerId)||void 0===n?void 0:n.toString())===(null===(a=t.admin_id)||void 0===a?void 0:a.toString())}))||[]).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);l[a]||(l[a]={restaurants:0,revenue:0}),l[a].restaurants+=1,l[a].revenue+=r}),Object.entries(l).sort((e,t)=>{let[,n]=e,[,a]=t;return a.revenue-n.revenue}).slice(0,10).forEach((e,n)=>{let[a,r]=e;t+=`${n+1},${a},${r.restaurants},${r.revenue.toFixed(2)}\n`}),t+="\nKEY PERFORMANCE INDICATORS\n",t+=`Average Revenue per Restaurant,${(0,f.vv)(ce.reduce((e,t)=>e+parseFloat(t.planAmount||t.plan_amount||"29"),0)/ce.length,n)}\n`,t+=`Manager Coverage Rate,${Math.round(he.length/ce.length*100)}%\n`,t+=`System Adoption Rate,${Math.round(ce.filter(e=>"active"===e.status).length/ce.length*100)}%\n`,t+=`Market Expansion Potential,${100-Math.round(.15*ce.length)}% remaining\n`}return t+=`\nReport generated on ${(new Date).toLocaleString()}\n`,t},Ye=he.filter(e=>e.full_name&&e.full_name.toLowerCase().includes(be.toLowerCase())),Ve=()=>{de("all"),ke("All Managers"),De(""),Ae(!1),se(e=>e+1)},Ke=ce.filter(e=>e.name.toLowerCase().includes(Re.toLowerCase())),Je=()=>{ie("all"),Ee("All Restaurants"),$e(""),_e(!1),se(e=>e+1)},He=()=>(console.log("Rendering SearchableManagerDropdown, managers:",he),(0,y.jsxs)(G,{children:[(0,y.jsx)(Y,{type:"text",value:Fe?be:Se,onChange:e=>De(e.target.value),onFocus:()=>{Ae(!0),"all"!==le&&De("")},onBlur:()=>{setTimeout(()=>Ae(!1),200)},placeholder:"Search managers..."}),(0,y.jsxs)(V,{isOpen:Fe,children:[(0,y.jsx)(K,{onClick:Ve,children:"All Managers"}),0===he.length?(0,y.jsx)(J,{children:"Loading managers..."}):Ye.length>0?Ye.map(e=>(0,y.jsx)(K,{onClick:()=>(e=>{de(e.id),ke(e.full_name),De(""),Ae(!1),se(e=>e+1)})(e),children:e.full_name||e.username||`Manager ${e.id}`},e.id)):(0,y.jsx)(J,{children:"No managers found"})]})]})),Ze=()=>(0,y.jsxs)(G,{children:[(0,y.jsx)(Y,{type:"text",value:Te?Re:Ce,onChange:e=>$e(e.target.value),onFocus:()=>{_e(!0),"all"!==oe&&$e("")},onBlur:()=>{setTimeout(()=>_e(!1),200)},placeholder:"Search restaurants..."}),(0,y.jsxs)(V,{isOpen:Te,children:[(0,y.jsx)(K,{onClick:Je,children:"All Restaurants"}),Ke.length>0?Ke.map(e=>(0,y.jsx)(K,{onClick:()=>(e=>{ie(e.id),Ee(e.name),$e(""),_e(!1),se(e=>e+1)})(e),children:e.name},e.id)):Re&&(0,y.jsx)(J,{children:"No restaurants found"})]})]});return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(M,{children:[(0,y.jsx)(b,{children:(0,y.jsx)(k,{children:"Reports"})}),(0,y.jsxs)(C,{children:[(0,y.jsxs)(i.tU,{children:[(0,y.jsx)(i.oz,{active:"system"===Z,onClick:()=>q("system"),children:"System Analytics"}),(0,y.jsx)(i.oz,{active:"subscriptions"===Z,onClick:()=>q("subscriptions"),children:"Subscription Report"}),(0,y.jsx)(i.oz,{active:"manager_sales"===Z,onClick:()=>q("manager_sales"),children:"Manager Sales"}),(0,y.jsx)(i.oz,{active:"restaurant_sales"===Z,onClick:()=>q("restaurant_sales"),children:"Restaurant Sales"})]}),"manager_sales"===Z&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(F,{children:[(0,y.jsxs)(A,{children:[(0,y.jsx)(R,{active:"today"===Q&&!ne,onClick:()=>We("today"),children:"Today"}),(0,y.jsx)(R,{active:"week"===Q&&!ne,onClick:()=>We("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===Q&&!ne,onClick:()=>We("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===Q&&!ne,onClick:()=>We("year"),children:"Year"}),(0,y.jsx)(R,{active:ne,onClick:()=>ae(!0),children:"Custom"}),ne&&(0,y.jsxs)(S,{children:[(0,y.jsx)(D,{type:"date",value:ee.start,onChange:e=>{console.log("Start date changed to:",e.target.value),te(t=>({...t,start:e.target.value}))},max:ee.end}),(0,y.jsx)(D,{type:"date",value:ee.end,onChange:e=>{console.log("End date changed to:",e.target.value),te(t=>({...t,end:e.target.value}))},min:ee.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(A,{children:[(0,y.jsx)(He,{}),(0,y.jsxs)($,{onClick:Ue,children:[(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,y.jsxs)(o.MD,{children:[(0,y.jsxs)(o.hI,{color:"#059669",children:[(0,y.jsx)(o.Os,{children:(0,f.vv)((()=>{if(!xe.length)return 0;const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=xe.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===le)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===le||n.managerName&&Se&&n.managerName.toLowerCase().includes(Se.toLowerCase());return s&&o}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return Math.round(n)})(),n)}),(0,y.jsx)(o.v0,{children:"Invoice Revenue"}),(0,y.jsx)(o.d1,{children:"all"!==le?`${Se}'s revenue`:"All managers revenue"})]}),(0,y.jsxs)(o.hI,{color:"#2563EB",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!xe.length)return"0";const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date;return xe.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===le)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===le||n.managerName&&Se&&n.managerName.toLowerCase().includes(Se.toLowerCase());return s&&o}).length.toLocaleString()})()}),(0,y.jsx)(o.v0,{children:"Total Invoices"}),(0,y.jsx)(o.d1,{children:"Issued invoices for period"})]}),(0,y.jsxs)(o.hI,{color:"#DC2626",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!xe.length)return(0,f.vv)(0,n);const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,a=xe.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===le)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===le||n.managerName&&Se&&n.managerName.toLowerCase().includes(Se.toLowerCase());return s&&o});if(!a.length)return(0,f.vv)(0,n);const r=a.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0)/a.length;return(0,f.vv)(Math.round(r),n)})()}),(0,y.jsx)(o.v0,{children:"Average Invoice Value"}),(0,y.jsx)(o.d1,{children:"Per invoice average"})]}),(0,y.jsxs)(o.hI,{color:"#7C3AED",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!xe.length)return"0%";const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=xe.filter(n=>{var a;const r=new Date(n.issueDate||n.createdAt),s=r>=e&&r<=t;if("all"===le)return s;const o=(null===(a=n.managerId)||void 0===a?void 0:a.toString())===le||n.managerName&&Se&&n.managerName.toLowerCase().includes(Se.toLowerCase());return s&&o});if(!n.length)return"0%";const a=n.filter(e=>"paid"===e.status).length;return`${Math.round(a/n.length*100)}%`})()}),(0,y.jsx)(o.v0,{children:"Payment Rate"}),(0,y.jsx)(o.d1,{children:"Invoice collection rate"})]})]},`manager-sales-stats-${re}-${Q}-${le}-${ee.start}-${ee.end}`),(0,y.jsxs)(E,{children:[(0,y.jsxs)(T,{children:[(0,y.jsx)(_,{children:"Manager Invoice Revenue Trend"}),(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:we.length>0?we:Le,children:[(0,y.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,y.jsx)(h.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,y.jsx)(g.h,{stroke:"#6B7C93",fontSize:12}),(0,y.jsx)(x.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,y.jsx)(p.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,y.jsxs)(T,{children:[(0,y.jsx)(_,{children:"Revenue by Region"}),(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(m.r,{children:[(0,y.jsx)(v.F,{data:Pe,cx:"50%",cy:"50%",labelLine:!1,label:e=>{let{region:t,revenue:n}=e;return`${t} (${(n/Pe.reduce((e,t)=>e+t.revenue,0)*100).toFixed(1)}%)`},outerRadius:80,fill:"#8884d8",dataKey:"revenue",children:Pe.map((e,t)=>(0,y.jsx)(j.f,{fill:H[t%H.length]},`cell-${t}`))}),(0,y.jsx)(x.m,{})]})})]})]}),(0,y.jsxs)(P,{children:[(0,y.jsx)(_,{children:"all"!==le?`${Se}'s Restaurants`:"All Restaurants by Manager"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"Restaurant Name"}),(0,y.jsx)(L,{children:"Manager"}),(0,y.jsx)(L,{children:"Invoice Revenue"}),(0,y.jsx)(L,{children:"Monthly Fee"}),(0,y.jsx)(L,{children:"Status"}),(0,y.jsx)(L,{children:"Performance"})]})}),(0,y.jsx)("tbody",{children:("all"!==le?ce.filter(e=>{if(console.log("Filtering restaurant:",e.name,"admin_id:",e.admin_id,"managerId:",e.managerId,"selected:",le),e.admin_id&&e.admin_id.toString()===le)return!0;if(e.managerId&&e.managerId.toString()===le)return!0;const t=e.admin_name||e.managerName;return!!(t&&Se&&t.toLowerCase().includes(Se.toLowerCase()))}).map(e=>({id:e.id,name:e.name,manager:Se,revenue:Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),monthlyFee:Math.round(2e3+500*e.id%3e3),status:"active"===e.status?"Active":"Inactive",performance:Math.round(75+3*e.id%25)})):ce.slice(0,15).map(e=>{const t=e.admin_id?he.findIndex(t=>t.id===e.admin_id):e.id%he.length,n=he[t]||he[0];return{id:e.id,name:e.name,manager:(null===n||void 0===n?void 0:n.full_name)||(null===n||void 0===n?void 0:n.username)||"Unassigned",revenue:Math.round((5e3+1e3*e.id%15e3)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),monthlyFee:Math.round(2e3+500*e.id%3e3),status:"active"===e.status?"Active":"Inactive",performance:Math.round(75+3*e.id%25)}})).map((e,t)=>(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:e.name}),(0,y.jsx)(N,{children:e.manager}),(0,y.jsx)(N,{children:(0,f.vv)(e.revenue,n)}),(0,y.jsx)(N,{children:(0,f.vv)(e.monthlyFee,n)}),(0,y.jsx)(N,{children:(0,y.jsx)("span",{style:{color:"Active"===e.status?"#059669":"#DC2626",fontWeight:500},children:e.status})}),(0,y.jsx)(N,{children:(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,y.jsx)(U,{percentage:e.performance}),(0,y.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[e.performance,"%"]})]})})]},e.id||t))})]})]}),"all"===le&&(0,y.jsxs)(P,{children:[(0,y.jsx)(_,{children:"Top Managers by Invoice Revenue (Royalty & Rent)"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"Rank"}),(0,y.jsx)(L,{children:"Manager Name"}),(0,y.jsx)(L,{children:"Total Invoice Revenue"}),(0,y.jsx)(L,{children:"Restaurants"}),(0,y.jsx)(L,{children:"Avg. per Restaurant"}),(0,y.jsx)(L,{children:"Growth"})]})}),(0,y.jsx)("tbody",{children:he.slice(0,5).map((e,t)=>{const a=t+1,r=6e4-8e3*a,s=Math.round(r*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),o=Math.floor(10*Math.random())+5;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{children:(0,y.jsx)(W,{rank:a,children:a})}),(0,y.jsx)(N,{style:{fontWeight:600},children:e.full_name||e.username||`Manager ${a}`}),(0,y.jsx)(N,{children:(0,f.vv)(s,n)}),(0,y.jsx)(N,{children:o}),(0,y.jsx)(N,{children:(0,f.vv)(Math.round(s/o),n)}),(0,y.jsxs)(N,{style:{color:a<=3?"#059669":"#DC2626"},children:[a<=3?"+":"-",Math.abs(20-3*a),"%"]})]},e.id)})})]})]})]}),"restaurant_sales"===Z&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(F,{children:[(0,y.jsxs)(A,{children:[(0,y.jsx)(R,{active:"today"===Q&&!ne,onClick:()=>We("today"),children:"Today"}),(0,y.jsx)(R,{active:"week"===Q&&!ne,onClick:()=>We("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===Q&&!ne,onClick:()=>We("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===Q&&!ne,onClick:()=>We("year"),children:"Year"}),(0,y.jsx)(R,{active:ne,onClick:()=>ae(!0),children:"Custom"}),ne&&(0,y.jsxs)(S,{children:[(0,y.jsx)(D,{type:"date",value:ee.start,onChange:e=>{console.log("Start date changed to:",e.target.value),te(t=>({...t,start:e.target.value}))},max:ee.end}),(0,y.jsx)(D,{type:"date",value:ee.end,onChange:e=>{console.log("End date changed to:",e.target.value),te(t=>({...t,end:e.target.value}))},min:ee.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(A,{children:[(0,y.jsx)(Ze,{}),(0,y.jsxs)($,{onClick:Ue,children:[(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,y.jsxs)(o.MD,{children:[(0,y.jsxs)(o.hI,{color:"#059669",children:[(0,y.jsx)(o.Os,{children:(0,f.vv)((()=>{if(!me.length)return 0;const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=me.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===oe)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===oe;return s&&o&&"completed"===n.status}).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return Math.round(n)})(),n)}),(0,y.jsx)(o.v0,{children:"Restaurant Revenue"}),(0,y.jsx)(o.d1,{children:"all"!==oe?`${Ce} sales`:"All restaurants sales"})]}),(0,y.jsxs)(o.hI,{color:"#2563EB",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!me.length)return"0";const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date;return me.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===oe)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===oe;return s&&o&&"completed"===n.status}).length.toLocaleString()})()}),(0,y.jsx)(o.v0,{children:"Total Orders"}),(0,y.jsx)(o.d1,{children:"Completed orders for period"})]}),(0,y.jsxs)(o.hI,{color:"#DC2626",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!me.length)return(0,f.vv)(0,n);const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,a=me.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===oe)return s&&"completed"===n.status;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===oe;return s&&o&&"completed"===n.status});if(!a.length)return(0,f.vv)(0,n);const r=a.reduce((e,t)=>e+parseFloat(t.total_amount||0),0)/a.length;return(0,f.vv)(Math.round(r),n)})()}),(0,y.jsx)(o.v0,{children:"Average Order Value"}),(0,y.jsx)(o.d1,{children:"Per order average"})]}),(0,y.jsxs)(o.hI,{color:"#7C3AED",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!me.length)return"0%";const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=me.filter(n=>{var a;const r=new Date(n.order_date||n.createdAt),s=r>=e&&r<=t;if("all"===oe)return s;const o=(null===(a=n.restaurant_id)||void 0===a?void 0:a.toString())===oe;return s&&o});if(!n.length)return"0%";const a=n.filter(e=>"completed"===e.status).length;return`${Math.round(a/n.length*100)}%`})()}),(0,y.jsx)(o.v0,{children:"Order Success Rate"}),(0,y.jsx)(o.d1,{children:"Orders completion rate"})]})]},`restaurant-sales-stats-${re}-${Q}-${oe}-${ee.start}-${ee.end}`),(0,y.jsxs)(E,{children:[(0,y.jsxs)(T,{children:[(0,y.jsx)(_,{children:"Restaurant Sales Trend"}),(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(c.b,{data:Le.map(e=>({...e,sales:Math.round(.85*e.sales)})),children:[(0,y.jsx)(u.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,y.jsx)(h.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,y.jsx)(g.h,{stroke:"#6B7C93",fontSize:12}),(0,y.jsx)(x.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,y.jsx)(p.N,{type:"monotone",dataKey:"sales",stroke:"#059669",strokeWidth:2,dot:{fill:"#059669",r:4}})]})})]}),(0,y.jsxs)(T,{children:[(0,y.jsx)(_,{children:"Sales by Category"}),(0,y.jsx)(d.u,{width:"100%",height:300,children:(0,y.jsxs)(m.r,{children:[(0,y.jsx)(v.F,{data:[{name:"Food",value:45,revenue:Math.round(.45*ze.totalRevenue)},{name:"Beverage",value:25,revenue:Math.round(.25*ze.totalRevenue)},{name:"Dessert",value:15,revenue:Math.round(.15*ze.totalRevenue)},{name:"Others",value:15,revenue:Math.round(.15*ze.totalRevenue)}],cx:"50%",cy:"50%",labelLine:!1,label:e=>{let{name:t,value:n}=e;return`${t} ${n}%`},outerRadius:80,fill:"#8884d8",dataKey:"value",children:[0,1,2,3].map((e,t)=>(0,y.jsx)(j.f,{fill:H[t%H.length]},`cell-${t}`))}),(0,y.jsx)(x.m,{})]})})]})]}),"all"!==oe?(0,y.jsxs)(P,{children:[(0,y.jsxs)(_,{children:[(null===(e=ce.find(e=>e.id.toString()===oe))||void 0===e?void 0:e.name)||"Selected Restaurant"," - Sales Breakdown"]}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"today"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=1?"Hour":"week"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=7?"Day":"year"===Q?"Month":"Date"}),(0,y.jsx)(L,{children:"Sales (RM)"}),(0,y.jsx)(L,{children:"Orders"}),(0,y.jsx)(L,{children:"Avg. Order Value"}),(0,y.jsx)(L,{children:"Performance"})]})}),(0,y.jsx)("tbody",{children:(()=>{const e=ce.find(e=>e.id.toString()===oe);if(!e)return[];let t=[];const a=8e3+1500*e.id%2e4,r=150+15*e.id%300;if("today"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=1)for(let n=8;n<=22;n++){const e=Math.round(.033*a*(.3+1.4*Math.random())),s=Math.round(.033*r*(.3+1.4*Math.random()));t.push({period:`${n}:00`,revenue:e,orders:s,avgOrder:s>0?e/s:0,performance:e>.04*a?"Good":e>.025*a?"Average":"Low"})}else if("week"===Q||ne&&Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)<=7){["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].forEach(e=>{const n=Math.round(.233*a*(.7+.6*Math.random())),s=Math.round(.233*r*(.7+.6*Math.random()));t.push({period:e,revenue:n,orders:s,avgOrder:s>0?n/s:0,performance:n>.25*a?"Good":n>.2*a?"Average":"Low"})})}else if("year"===Q){["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].forEach(e=>{const n=Math.round(12*a*(.8+.4*Math.random())),s=Math.round(12*r*(.8+.4*Math.random()));t.push({period:e,revenue:n,orders:s,avgOrder:s>0?n/s:0,performance:n>13*a?"Good":n>10*a?"Average":"Low"})})}else{const e=ne?new Date(ee.start):new Date((new Date).getFullYear(),(new Date).getMonth(),1),n=ne?new Date(ee.end):new Date,s=Math.ceil((n.getTime()-e.getTime())/864e5)+1;for(let o=0;o<Math.min(s,31);o++){const n=new Date(e);n.setDate(e.getDate()+o);const s=Math.round(a*(.8+.4*Math.random())),i=Math.round(r*(.8+.4*Math.random()));t.push({period:`${n.getMonth()+1}/${n.getDate()}`,revenue:s,orders:i,avgOrder:i>0?s/i:0,performance:s>1.1*a?"Good":s>.9*a?"Average":"Low"})}}return t.slice(0,15).map((e,t)=>(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:e.period}),(0,y.jsx)(N,{children:(0,f.vv)(e.revenue,n)}),(0,y.jsx)(N,{children:e.orders}),(0,y.jsx)(N,{children:(0,f.vv)(Math.round(e.avgOrder),n)}),(0,y.jsx)(N,{style:{color:"Good"===e.performance?"#059669":"Average"===e.performance?"#F59E0B":"#DC2626",fontWeight:500},children:e.performance})]},t))})()})]})]}):(0,y.jsxs)(P,{children:[(0,y.jsx)(_,{children:"Top Restaurants by Sales Revenue"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"Rank"}),(0,y.jsx)(L,{children:"Restaurant Name"}),(0,y.jsx)(L,{children:"Total Sales"}),(0,y.jsx)(L,{children:"Orders"}),(0,y.jsx)(L,{children:"Avg. Order Value"}),(0,y.jsx)(L,{children:"Growth"})]})}),(0,y.jsx)("tbody",{children:ce.map(e=>({id:e.id,name:e.name,manager:e.admin_name||e.managerName||"Unknown",revenue:Math.round((8e3+1500*e.id%2e4)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12)),orders:Math.round((150+15*e.id%300)*("today"===Q?.033:"week"===Q?.233:"month"===Q?1:12))})).sort((e,t)=>t.revenue-e.revenue).slice(0,10).map((e,t)=>{const a=t+1;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{children:(0,y.jsx)(W,{rank:a,children:a})}),(0,y.jsx)(N,{style:{fontWeight:600},children:e.name}),(0,y.jsx)(N,{children:(0,f.vv)(e.revenue,n)}),(0,y.jsx)(N,{children:e.orders.toLocaleString()}),(0,y.jsx)(N,{children:(0,f.vv)(Math.round(e.revenue/e.orders),n)}),(0,y.jsxs)(N,{style:{color:a<=5?"#059669":"#DC2626"},children:[a<=5?"+":"-",Math.abs(20-2*a),"%"]})]},e.id)})})]})]})]}),"subscriptions"===Z&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(F,{children:[(0,y.jsxs)(A,{children:[(0,y.jsx)(R,{active:"today"===Q&&!ne,onClick:()=>We("today"),children:"Today"}),(0,y.jsx)(R,{active:"week"===Q&&!ne,onClick:()=>We("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===Q&&!ne,onClick:()=>We("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===Q&&!ne,onClick:()=>We("year"),children:"Year"}),(0,y.jsx)(R,{active:ne,onClick:()=>ae(!0),children:"Custom"}),ne&&(0,y.jsxs)(S,{children:[(0,y.jsx)(D,{type:"date",value:ee.start,onChange:e=>{console.log("Start date changed to:",e.target.value),te(t=>({...t,start:e.target.value}))},max:ee.end}),(0,y.jsx)(D,{type:"date",value:ee.end,onChange:e=>{console.log("End date changed to:",e.target.value),te(t=>({...t,end:e.target.value}))},min:ee.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsxs)(A,{children:[(0,y.jsx)(He,{}),(0,y.jsxs)($,{onClick:Ue,children:[(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})]}),(0,y.jsxs)(o.MD,{children:[(0,y.jsxs)(o.hI,{color:"#635BFF",children:[(0,y.jsx)(o.Os,{children:(()=>{let e="all"!==le?ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le):ce;const t=ne?new Date(ee.start):Be(Q),n=ne?new Date(ee.end):new Date;return e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t}),e.length})()}),(0,y.jsx)(o.v0,{children:"Total Subscriptions"}),(0,y.jsxs)(o.d1,{children:["all"!==le?`${Se}'s restaurants`:"All restaurants"," in period"]})]}),(0,y.jsxs)(o.hI,{color:"#2563EB",children:[(0,y.jsx)(o.Os,{children:(()=>{let e="all"!==le?ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le):ce;const t=ne?new Date(ee.start):Be(Q),n=ne?new Date(ee.end):new Date;e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t});const a={};e.forEach(e=>{const t=e.plan_type||e.planType||"Basic Plan";a[t]=(a[t]||0)+1});return Object.keys(a).reduce((e,t)=>a[e]>a[t]?e:t,"Professional")})()}),(0,y.jsx)(o.v0,{children:"Most Popular Plan"}),(0,y.jsx)(o.d1,{children:"Most common in period"})]}),(0,y.jsxs)(o.hI,{color:"#059669",children:[(0,y.jsx)(o.Os,{children:(0,f.vv)((()=>{let e="all"!==le?ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le):ce;const t=ne?new Date(ee.start):Be(Q),n=ne?new Date(ee.end):new Date;e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return!0;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return s<=n&&o>=t});return e.reduce((e,a)=>{const r=parseFloat(a.planAmount||a.plan_amount||"0"),s=a.subscription_start||a.subscriptionStart,o=a.subscription_end||a.subscriptionEnd;if(!s)return e+r;const i=new Date(Math.max(new Date(s).getTime(),t.getTime())),l=new Date(Math.min(o?new Date(o).getTime():n.getTime(),n.getTime())),d=Math.max(1,Math.ceil((l.getTime()-i.getTime())/2592e6));return e+r*Math.min(d,"today"===Q?.033:"week"===Q?.25:"month"===Q?1:12)},0)})(),n)}),(0,y.jsx)(o.v0,{children:"Total Revenue"}),(0,y.jsx)(o.d1,{children:"Revenue for selected period"})]}),(0,y.jsxs)(o.hI,{color:"#DC2626",children:[(0,y.jsx)(o.Os,{children:(()=>{let e="all"!==le?ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le):ce;const t=ne?new Date(ee.start):Be(Q),n=ne?new Date(ee.end):new Date;return e=e.filter(e=>{const a=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!a)return"active"===e.status;const s=new Date(a),o=r?new Date(r):new Date("2099-12-31");return"active"===e.status&&s<=n&&o>=t}),e.length})()}),(0,y.jsx)(o.v0,{children:"Active Plans"}),(0,y.jsx)(o.d1,{children:"Active in period"})]})]},`subscription-stats-${re}-${Q}-${le}-${ee.start}-${ee.end}`),(0,y.jsxs)(P,{children:[(0,y.jsx)(_,{children:"Restaurant Subscriptions"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"Restaurant Name"}),(0,y.jsx)(L,{children:"Manager"}),(0,y.jsx)(L,{children:"Plan Type"}),(0,y.jsx)(L,{children:"Monthly Fee"}),(0,y.jsx)(L,{children:"Status"}),(0,y.jsx)(L,{children:"Subscription Period"}),(0,y.jsx)(L,{children:"Location"})]})}),(0,y.jsx)("tbody",{children:(()=>{let e="all"!==le?ce.filter(e=>e.admin_id&&e.admin_id.toString()===le||e.managerId&&e.managerId.toString()===le):ce;const t=ne?new Date(ee.start):Be(Q),a=ne?new Date(ee.end):new Date;return e=e.filter(e=>{const n=e.subscription_start||e.subscriptionStart,r=e.subscription_end||e.subscriptionEnd;if(!n)return!0;const s=new Date(n),o=r?new Date(r):new Date("2099-12-31");return s<=a&&o>=t}),e.map(e=>(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:e.name}),(0,y.jsx)(N,{children:e.admin_name||e.managerName||"Unknown"}),(0,y.jsx)(N,{children:(0,y.jsx)("span",{style:{background:"Enterprise Plan"===e.planType?"#8B5CF6":"Professional Plan"===e.planType?"#059669":"#635BFF",color:"white",padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:500},children:e.planType||e.plan_type||"Basic"})}),(0,y.jsx)(N,{children:(0,f.vv)(parseFloat(e.planAmount||e.plan_amount||"29.00"),n)}),(0,y.jsx)(N,{children:(0,y.jsx)("span",{style:{color:"active"===e.status?"#059669":"inactive"===e.status?"#DC2626":"#F59E0B",fontWeight:600,textTransform:"capitalize"},children:e.status||"Active"})}),(0,y.jsx)(N,{children:e.subscriptionStart&&e.subscriptionEnd?`${e.subscriptionStart} - ${e.subscriptionEnd}`:e.subscription_start&&e.subscription_end?`${e.subscription_start} - ${e.subscription_end}`:"N/A"}),(0,y.jsx)(N,{children:e.location||e.address||"N/A"})]},e.id))})()})]})]},`subscription-table-${re}-${Q}-${le}-${ee.start}-${ee.end}`)]}),"system"===Z&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(F,{children:[(0,y.jsxs)(A,{children:[(0,y.jsx)(R,{active:"today"===Q&&!ne,onClick:()=>We("today"),children:"Today"}),(0,y.jsx)(R,{active:"week"===Q&&!ne,onClick:()=>We("week"),children:"Week"}),(0,y.jsx)(R,{active:"month"===Q&&!ne,onClick:()=>We("month"),children:"Month"}),(0,y.jsx)(R,{active:"year"===Q&&!ne,onClick:()=>We("year"),children:"Year"}),(0,y.jsx)(R,{active:ne,onClick:()=>ae(!0),children:"Custom"}),ne&&(0,y.jsxs)(S,{children:[(0,y.jsx)(D,{type:"date",value:ee.start,onChange:e=>{te(t=>({...t,start:e.target.value}))},max:ee.end}),(0,y.jsx)(D,{type:"date",value:ee.end,onChange:e=>{te(t=>({...t,end:e.target.value}))},min:ee.start,max:(new Date).toISOString().split("T")[0]})]})]}),(0,y.jsx)(A,{children:(0,y.jsxs)($,{onClick:Ue,children:[(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})})]}),(0,y.jsxs)(o.MD,{children:[(0,y.jsxs)(o.hI,{color:"#635BFF",children:[(0,y.jsx)(o.Os,{children:(0,f.vv)((()=>{if(!xe.length)return 0;const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=xe.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return Math.round(n)})(),n)}),(0,y.jsx)(o.v0,{children:"Total Business Volume"}),(0,y.jsx)(o.d1,{children:"Invoice-based revenue for period"})]}),(0,y.jsxs)(o.hI,{color:"#059669",children:[(0,y.jsx)(o.Os,{children:(()=>{if(!xe.length)return"+0.0%";const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,n=Math.ceil((t.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-n);const r=new Date(e),s=xe.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0),o=xe.filter(e=>{const t=new Date(e.issueDate||e.createdAt);return t>=a&&t<=r}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0),i=o>0?(s-o)/o*100:0;return i>0?`+${i.toFixed(1)}%`:`${i.toFixed(1)}%`})()}),(0,y.jsx)(o.v0,{children:"Growth Rate"}),(0,y.jsx)(o.d1,{children:"Compared to previous period"})]}),(0,y.jsxs)(o.hI,{color:"#2563EB",children:[(0,y.jsxs)(o.Os,{children:[(ce.filter(e=>"active"===e.status).length/2e5*100).toFixed(2),"%"]}),(0,y.jsx)(o.v0,{children:"Market Penetration"}),(0,y.jsx)(o.d1,{children:"Of estimated market covered"})]}),(0,y.jsxs)(o.hI,{color:"#7C3AED",children:[(0,y.jsxs)(o.Os,{children:[(()=>{if(!xe.length||!ce.length)return"0.0/5.0";const e=xe.filter(e=>"paid"===e.status).length,t=xe.length>0?e/xe.length:0,n=ce.filter(e=>"active"===e.status).length;return(5*(.6*t+.4*(ce.length>0?n/ce.length:0))).toFixed(1)})(),"/5.0"]}),(0,y.jsx)(o.v0,{children:"Customer Satisfaction"}),(0,y.jsx)(o.d1,{children:"Based on payment & retention"})]})]},`system-analytics-${re}-${Q}-${ee.start}-${ee.end}`),(0,y.jsxs)(B,{children:[(0,y.jsxs)(I,{children:[(0,y.jsx)(_,{children:"Top Performing Plan Types"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsxs)(L,{children:["Plan",(0,y.jsx)("br",{}),"Type"]}),(0,y.jsxs)(L,{children:["Sub-",(0,y.jsx)("br",{}),"scribers"]}),(0,y.jsxs)(L,{children:["Revenue",(0,y.jsx)("br",{}),"Share"]}),(0,y.jsx)(L,{children:"Growth"})]})}),(0,y.jsx)("tbody",{children:(()=>{const e={};ce.forEach(t=>{const n=t.plan_type||t.planType||"Basic Plan";e[n]||(e[n]={subscribers:0,revenue:0,invoiceRevenue:0}),e[n].subscribers+=1,e[n].revenue+=parseFloat(t.planAmount||t.plan_amount||29);const a=Oe.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);e[n].invoiceRevenue+=a});const t=Object.values(e).reduce((e,t)=>e+t.invoiceRevenue,0);return Object.entries(e).sort((e,t)=>{let[,n]=e,[,a]=t;return a.invoiceRevenue-n.invoiceRevenue}).map(e=>{let[n,a]=e;const r=a.revenue>0?(a.invoiceRevenue-a.revenue)/a.revenue*100:0;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:n}),(0,y.jsx)(N,{children:a.subscribers}),(0,y.jsxs)(N,{children:[t>0?(a.invoiceRevenue/t*100).toFixed(1):"0.0","%"]}),(0,y.jsxs)(N,{style:{color:r>=0?"#059669":"#DC2626"},children:[r>=0?"+":"",r.toFixed(1),"%"]})]},n)})})()})]})]}),(0,y.jsxs)(I,{children:[(0,y.jsx)(_,{children:"Manager Performance Ranking"}),(0,y.jsxs)(O,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(L,{children:"Rank"}),(0,y.jsx)(L,{children:"Manager"}),(0,y.jsxs)(L,{children:["Restau-",(0,y.jsx)("br",{}),"rants"]}),(0,y.jsxs)(L,{children:["Total",(0,y.jsx)("br",{}),"Revenue"]})]})}),(0,y.jsx)("tbody",{children:(()=>{const e={};return ce.forEach(t=>{const n=t.admin_name||t.managerName||"Unknown Manager";e[n]||(e[n]={restaurants:0,subscriptionRevenue:0,invoiceRevenue:0}),e[n].restaurants+=1,e[n].subscriptionRevenue+=parseFloat(t.planAmount||t.plan_amount||29);const a=Oe.filter(e=>{var n,a;return(null===(n=e.restaurantId)||void 0===n?void 0:n.toString())===(null===(a=t.id)||void 0===a?void 0:a.toString())}).reduce((e,t)=>{var n;return e+parseFloat((null===(n=t.total)||void 0===n?void 0:n.toString())||"0")},0);e[n].invoiceRevenue+=a}),Object.entries(e).sort((e,t)=>{let[,n]=e,[,a]=t;return a.invoiceRevenue-n.invoiceRevenue}).slice(0,5).map((e,t)=>{let[a,r]=e;return(0,y.jsxs)("tr",{children:[(0,y.jsx)(N,{style:{fontWeight:600},children:(0,y.jsxs)("span",{style:{background:0===t?"#FFD700":1===t?"#C0C0C0":2===t?"#CD7F32":"#E6EBF1",color:t<3?"white":"#6B7C93",padding:"4px 8px",borderRadius:"12px",fontSize:"12px",fontWeight:600},children:["#",t+1]})}),(0,y.jsx)(N,{children:a}),(0,y.jsx)(N,{children:r.restaurants}),(0,y.jsx)(N,{children:(0,f.vv)(r.invoiceRevenue,n)})]},a)})})()})]})]})]}),(0,y.jsxs)(P,{children:[(0,y.jsx)(_,{children:"Business Intelligence Insights"}),(0,y.jsx)("div",{style:{padding:"20px"},children:(0,y.jsxs)(z,{children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",color:"#2B3674",fontSize:"16px",fontWeight:600},children:"Revenue Distribution"}),(0,y.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:(()=>{const e={};let t=0;return ce.forEach(n=>{const a=n.plan_type||n.planType||"Basic Plan",r=parseFloat(n.planAmount||n.plan_amount||"29");e[a]=(e[a]||0)+r,t+=r}),Object.entries(e).map(e=>{let[n,a]=e;return(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:n}),(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,y.jsx)("div",{style:{width:"60px",height:"6px",background:"#E6EBF1",borderRadius:"3px",overflow:"hidden"},children:(0,y.jsx)("div",{style:{width:a/t*100+"%",height:"100%",background:n.includes("Enterprise")?"#8B5CF6":n.includes("Professional")?"#059669":"#635BFF"}})}),(0,y.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2B3674",minWidth:"40px"},children:[(a/t*100).toFixed(1),"%"]})]})]},n)})})()})]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",color:"#2B3674",fontSize:"16px",fontWeight:600},children:"Key Performance Indicators"}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Average Invoice Revenue per Restaurant"}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2B3674"},children:(()=>{if(!xe.length||!ce.length)return(0,f.vv)(0,n);const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,a=xe.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return(0,f.vv)(a/ce.length,n)})()})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Invoice Payment Rate"}),(0,y.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#059669"},children:[(()=>{if(!xe.length)return"0";const e=xe.filter(e=>"paid"===e.status).length;return Math.round(e/xe.length*100)})(),"%"]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"System Adoption Rate"}),(0,y.jsxs)("span",{style:{fontSize:"14px",fontWeight:600,color:"#2563EB"},children:[ce.length>0?Math.round(ce.filter(e=>"active"===e.status).length/ce.length*100):0,"%"]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("span",{style:{fontSize:"14px",color:"#6B7C93"},children:"Revenue per Manager"}),(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:600,color:"#7C3AED"},children:(()=>{if(!xe.length||!he.length)return(0,f.vv)(0,n);const e=ne?new Date(ee.start):Be(Q),t=ne?new Date(ee.end):new Date,a=xe.filter(n=>{const a=new Date(n.issueDate||n.createdAt);return a>=e&&a<=t}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||0),0);return(0,f.vv)(a/he.length,n)})()})]})]})]})]})})]})]})]})]})})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var a=n(4752),r=n(4414);const s=a.Ay.div`
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
`,o=a.Ay.button`
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
`,i=a.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:a}=e;return(0,r.jsx)(s,{className:n,style:a,children:t})},d=e=>{let{active:t,onClick:n,children:a,className:s}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:s,children:a})},c=e=>{let{count:t,variant:n="default",showZero:a=!1}=e;return 0!==t||a?(0,r.jsx)(i,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>s});var a=n(9950),r=n(4492);function s(e){const[t,n]=(0,r.ok)(),s=(0,a.useCallback)(()=>t.get("tab")||e,[t,e]),[o,i]=(0,a.useState)(s());return[o,(0,a.useCallback)(e=>{i(e),n({tab:e})},[n])]}}}]);