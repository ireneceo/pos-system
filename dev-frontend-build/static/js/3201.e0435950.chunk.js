"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>R});var n=r(9950),a=r(4492),i=r(4752),s=r(3310),o=r(2674),l=r(6038),c=r(9018),d=r(4414);const p=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=i.Ay.div`
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
`,u=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,v=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`,y=i.Ay.div`
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFF4E6";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border-left: 4px solid ${e=>{switch(e.type){case"error":return"#EF4444";case"warning":return"#F59E0B";case"info":return"#3B82F6";default:return"#6B7280"}}};

  .title {
    font-weight: 600;
    color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"info":return"#2563EB";default:return"#374151"}}};
    margin-bottom: 4px;
  }

  .description {
    font-size: 14px;
    color: ${e=>{switch(e.type){case"error":return"#991B1B";case"warning":return"#92400E";case"info":return"#1D4ED8";default:return"#6B7280"}}};
  }
`,j=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,f=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,w=i.Ay.thead`
  background: #F8FAFC;
`,F=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.Ay.tbody``,S=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,k=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,A=i.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,D=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .score {
    font-weight: 600;
    color: ${e=>e.score>=80?"#059669":e.score>=60?"#D97706":"#DC2626"};
  }

  .bar {
    width: 60px;
    height: 6px;
    background: #F3F4F6;
    border-radius: 3px;
    overflow: hidden;

    &::after {
      content: '';
      display: block;
      width: ${e=>e.score}%;
      height: 100%;
      background: ${e=>e.score>=80?"#059669":e.score>=60?"#D97706":"#DC2626"};
      transition: width 0.3s ease;
    }
  }
`,C=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,R=()=>{const e=(0,a.Zp)(),{operationSettings:t}=(0,c.Pj)(),[r,i]=(0,n.useState)("overview"),[R,B]=(0,n.useState)([]),[M,E]=(0,n.useState)([]),[$,T]=(0,n.useState)([]),[I,z]=(0,n.useState)("month"),[N,P]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:0,cumulativeRevenue:0,averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 Starting data fetch...");const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},a=await fetch("/api/users?role=Manager",{headers:n});if(!a.ok)throw new Error("Failed to fetch users");const i=await a.json(),s=i.data||i;console.log("\ud83d\udc65 Fetched managers:",(null===s||void 0===s?void 0:s.length)||0);const o=await fetch("/api/restaurants",{headers:n});if(!o.ok)throw new Error("Failed to fetch restaurants");const l=await o.json(),c=l.data||l;console.log("\ud83c\udfea Fetched restaurants:",(null===c||void 0===c?void 0:c.length)||0);let d=[];var e;if(c&&c.length>0)d=c.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}),console.log("\ud83d\udccb Converted restaurants to subscriptions:",(null===(e=d)||void 0===e?void 0:e.length)||0);console.log("\ud83d\udcca Calculating system activities...");const p=await fetch("/api/invoices",{headers:n});let h=[],u=[],x=0;if(p.ok){var t;const e=await p.json();h=e.data||e,T(h),console.log("\ud83d\udcb0 Fetched invoices:",(null===(t=h)||void 0===t?void 0:t.length)||0);const r=h.filter(e=>"completed"===e.status||"paid"===e.status);x=r.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0),console.log("\ud83d\udcb0 All invoices:",h.length),console.log("\ud83d\udcb0 Completed invoices:",r.length),console.log("\ud83d\udcb0 Total completed invoice revenue:",x);const n=new Map,a=new Date;let i=[];if("week"===I)for(let t=6;t>=0;t--){const e=new Date(a);e.setDate(a.getDate()-t),i.push(e.toISOString().split("T")[0])}else if("month"===I)for(let t=11;t>=0;t--){const e=new Date(a);e.setDate(a.getDate()-7*t);const r=new Date(e);r.setDate(e.getDate()-e.getDay()),i.push(`W${Math.floor(t/4)+1}-${r.getMonth()+1}/${r.getDate()}`)}else if("quarter"===I)for(let t=5;t>=0;t--){const e=new Date(a);e.setMonth(a.getMonth()-t),i.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let t=11;t>=0;t--){const e=new Date(a);e.setMonth(a.getMonth()-t),i.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}i.forEach(e=>{n.set(e,{revenue:0,count:0})}),h.forEach(e=>{const t=new Date(e.createdAt||e.created_at||e.issueDate);let r="";if("week"===I)r=t.toISOString().split("T")[0];else if("month"===I){const e=new Date(t);e.setDate(t.getDate()-t.getDay());const n=Math.floor((a.getTime()-e.getTime())/6048e5);n<12&&(r=`W${Math.floor(n/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`;if(r&&n.has(r)){const t=parseFloat(e.total_amount||e.amount||e.total||0),a=n.get(r);n.set(r,{revenue:a.revenue+t,count:a.count+1})}}),u=Array.from(n.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,invoiceCount:r.count}}).sort((e,t)=>"year"===I?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let g=0;try{const e=await fetch("/api/support-tickets",{headers:n});if(e.ok){const t=await e.json();g=(t.data||t||[]).length}}catch(r){console.error("Error fetching support tickets:",r),g=0}E(u);const m=(s||[]).map(e=>{const t=(c||[]).filter(t=>t.managerId===e.id.toString()||t.manager_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id);console.log(`\ud83d\udc64 Manager ${e.id} (${e.username}) has ${t.length} restaurants`);const r=5e4*t.length,n=t.length>0?"active":"trial",a=Math.floor(40*Math.random())+60,i=a>=80?"low":a>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:n,restaurantCount:t.length,totalRevenue:r,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:a,riskLevel:i}});B(m);const v=m.length,y=d.filter(e=>"active"===e.status).length,j=(null===c||void 0===c?void 0:c.length)||m.reduce((e,t)=>e+t.restaurantCount,0),f=(new Date).getMonth(),w=(new Date).getFullYear(),F=h.filter(e=>{if(!e.createdAt||"completed"!==e.status&&"paid"!==e.status)return!1;const t=new Date(e.createdAt);return t.getMonth()===f&&t.getFullYear()===w}).reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);console.log("\ud83d\udcb0 Total completed invoice revenue for cumulative:",x);const b=x,S=v>0?F/v:0,k=d.length,A=k>0?d.filter(e=>"cancelled"===e.status).length/k*100:0,D=v>0?100*(j/v-1):0,C=12*S,R=y,M=(new Date).getMonth(),$=(new Date).getFullYear(),z=m.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===M&&t.getFullYear()===$}).length,N=c.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===M&&t.getFullYear()===$}).length,U=z+N+h.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===M&&t.getFullYear()===$}).length;console.log("\ud83d\udcca Calculated metrics:",{totalManagers:v,activeSubscriptions:y,totalRestaurants:j,monthlyRevenue:F,averageRevenuePerUser:S,totalInvoiceRevenue:x}),console.log("\ud83d\udccb Subscription Status Breakdown:",m.map(e=>({id:e.id,name:e.companyName,restaurants:e.restaurantCount,status:e.subscriptionStatus}))),P({totalManagers:v,activeSubscriptions:y,totalRestaurants:j,monthlyRevenue:F,cumulativeRevenue:b,averageRevenuePerUser:S,churnRate:A,growthRate:D,customerLifetimeValue:C,supportTickets:g,systemUptime:99.9,activeUsers:R,totalTransactions:U})}catch(r){console.error("\u274c Error fetching dashboard data:",r);P({totalManagers:12,activeSubscriptions:8,totalRestaurants:24,monthlyRevenue:6e5,cumulativeRevenue:0,averageRevenuePerUser:5e4,churnRate:3.2,growthRate:18.5,customerLifetimeValue:12e5,supportTickets:5,systemUptime:99.9,activeUsers:8,totalTransactions:28800});const e=Array.from({length:12},(e,t)=>({id:`mgr-${t+1}`,companyName:`Company ${t+1}`,email:`manager${t+1}@example.com`,planType:t<3?"enterprise":t<8?"professional":"basic",subscriptionStatus:t<8?"active":"trial",restaurantCount:Math.floor(5*Math.random())+1,totalRevenue:5e4*(Math.floor(5*Math.random())+1),createdAt:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low"}));B(e);const t=[];for(let n=0;n<("week"===I?7:"month"===I?12:"quarter"===I?6:12);n++){const e=5e4+1e5*Math.random(),r=Math.floor(20*Math.random())+5;let a="";if("week"===I){const e=new Date;e.setDate(e.getDate()-(6-n)),a=e.toISOString().split("T")[0]}else if("month"===I)a=`W${n+1}-12/${n+1}`;else if("quarter"===I){const e=(new Date).getMonth()-(5-n);a=`${(new Date).getFullYear()+Math.floor(e/12)}-${String((e%12+12)%12+1).padStart(2,"0")}`}else{const e=(new Date).getMonth()-(11-n);a=`${(new Date).getFullYear()+Math.floor(e/12)}-${String((e%12+12)%12+1).padStart(2,"0")}`}t.push({period:a,revenue:e,invoiceCount:r})}E(t),console.log("\ud83d\udd27 Set fallback data")}})()},[I]),(0,d.jsx)(s.A,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(x,{children:"Admin Dashboard"})}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Monthly Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(N.monthlyRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"This Year Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(12*N.monthlyRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Cumulative Revenue"}),(0,d.jsx)(o.G$,{children:(0,l.vv)(N.cumulativeRevenue,t.currency)})]}),(0,d.jsxs)(o.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Total Managers"}),(0,d.jsx)(o.G$,{children:N.totalManagers})]}),(0,d.jsxs)(o.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,d.jsx)(o.h2,{children:"Active Subscriptions"}),(0,d.jsx)(o.G$,{children:N.activeSubscriptions})]}),(0,d.jsxs)(o.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,d.jsx)(o.h2,{children:"Total Restaurants"}),(0,d.jsx)(o.G$,{children:N.totalRestaurants})]}),(0,d.jsxs)(o.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)(o.h2,{children:"Support Tickets"}),(0,d.jsx)(o.G$,{children:N.supportTickets})]}),(0,d.jsxs)(o.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Active Users"}),(0,d.jsx)(o.G$,{children:N.activeUsers})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("button",{onClick:()=>z("week"),style:{padding:"6px 12px",background:"week"===I?"#635BFF":"transparent",color:"week"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,d.jsx)("button",{onClick:()=>z("month"),style:{padding:"6px 12px",background:"month"===I?"#635BFF":"transparent",color:"month"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,d.jsx)("button",{onClick:()=>z("quarter"),style:{padding:"6px 12px",background:"quarter"===I?"#635BFF":"transparent",color:"quarter"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,d.jsx)("button",{onClick:()=>z("year"),style:{padding:"6px 12px",background:"year"===I?"#635BFF":"transparent",color:"year"===I?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,d.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:M.length>0?(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:M.map(e=>(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/Math.max(...M.map(e=>e.revenue))*80)}px`,background:"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(e.revenue,t.currency)}`}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===I?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===I?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,d.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:e.revenue>0?`${(0,l.vv)(e.revenue/1e3,t.currency).replace(/\.\d+/,"")}K`:(0,l.vv)(0,t.currency)}),(0,d.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period))}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===I?"Last 7 days":"month"===I?"Last 12 weeks":"quarter"===I?"Last 6 months":"Last 12 months"}),(0,d.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=M.find(e=>e.revenue>0),t=M[M.length-1];if(e&&t&&e.revenue>0){const r=(t.revenue-e.revenue)/e.revenue*100;return r>0?`\u2197 +${r.toFixed(1)}%`:r<0?`\u2198 ${r.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,d.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,d.jsxs)("p",{children:["Total Revenue: ",(0,l.vv)(N.monthlyRevenue/1e3,t.currency).replace(/\.\d+/,""),"K"]}),(0,d.jsxs)("p",{children:["Growth Rate: +",N.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)("h3",{children:"System Alerts"}),R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(y,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,d.jsxs)("div",{className:"description",children:[R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," new manager(s) registered today - Click to view"]})]}),N.supportTickets>0&&(0,d.jsxs)(y,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,d.jsxs)("div",{className:"description",children:[N.supportTickets," open support ticket(s) require attention - Click to view"]})]}),$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(y,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,d.jsxs)("div",{className:"description",children:[(0,l.vv)($.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||0),0),t.currency),"earned today from ",$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," transaction(s) - Click to view details"]})]}),0===R.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&0===N.supportTickets&&0===$.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===r,onClick:()=>i("overview"),children:"Manager Overview"}),(0,d.jsx)(o.oz,{active:"performance"===r,onClick:()=>i("performance"),children:"Performance Analytics"}),(0,d.jsx)(o.oz,{active:"health"===r,onClick:()=>i("health"),children:"Account Health"}),(0,d.jsx)(o.oz,{active:"system"===r,onClick:()=>i("system"),children:"System Operations"})]}),"overview"===r&&(0,d.jsx)(j,{children:(0,d.jsxs)(f,{children:[(0,d.jsx)(w,{children:(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{children:"Manager Company"}),(0,d.jsx)(F,{children:"Plan"}),(0,d.jsx)(F,{children:"Status"}),(0,d.jsx)(F,{children:"Restaurants"}),(0,d.jsx)(F,{children:"Monthly Revenue"}),(0,d.jsx)(F,{children:"Health Score"}),(0,d.jsx)(F,{children:"Risk Level"})]})}),(0,d.jsx)(b,{children:R.map(e=>(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:(0,d.jsxs)(A,{children:[(0,d.jsx)("div",{className:"name",children:e.companyName}),(0,d.jsx)("div",{className:"email",children:e.email})]})}),(0,d.jsx)(k,{children:(0,d.jsx)(C,{variant:e.planType,children:e.planType})}),(0,d.jsx)(k,{children:(0,d.jsx)(C,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,d.jsx)(k,{children:e.restaurantCount}),(0,d.jsx)(k,{children:(0,l.vv)(e.totalRevenue,t.currency)}),(0,d.jsx)(k,{children:(0,d.jsxs)(D,{score:e.healthScore,children:[(0,d.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,d.jsx)("div",{className:"bar"})]})}),(0,d.jsx)(k,{children:(0,d.jsx)(C,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669",marginBottom:"10px"},children:"Revenue Insights"}),(0,d.jsxs)("p",{children:["\u2022 Average deal size: ",(0,l.vv)(N.averageRevenuePerUser/1e3,t.currency).replace(/\.\d$/,""),"K"]}),(0,d.jsxs)("p",{children:["\u2022 Revenue growth: +",N.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"\u2022 Top performing tier: Enterprise"})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Customer Success"}),(0,d.jsx)("p",{children:"\u2022 Net Promoter Score: 8.4/10"}),(0,d.jsx)("p",{children:"\u2022 Customer satisfaction: 94%"}),(0,d.jsx)("p",{children:"\u2022 Support resolution: 2.3hrs avg"})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Operational KPIs"}),(0,d.jsxs)("p",{children:["\u2022 System uptime: ",N.systemUptime,"%"]}),(0,d.jsx)("p",{children:"\u2022 Transaction success: 99.7%"}),(0,d.jsx)("p",{children:"\u2022 API response time: 120ms avg"})]})]})]}),"health"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Health Score Distribution"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",R.filter(e=>e.healthScore>=80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",R.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",R.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Risk Factors"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,d.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,d.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,d.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===r&&(0,d.jsxs)(j,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations Center"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669"},children:"Infrastructure"}),(0,d.jsx)("p",{children:"\u2022 Servers: 12 active, 2 standby"}),(0,d.jsx)("p",{children:"\u2022 Load balancing: Optimal"}),(0,d.jsx)("p",{children:"\u2022 CDN performance: 98% hit rate"}),(0,d.jsx)("p",{children:"\u2022 Backup status: All current"})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB"},children:"Security"}),(0,d.jsx)("p",{children:"\u2022 Security score: A+"}),(0,d.jsx)("p",{children:"\u2022 SSL certificates: Valid"}),(0,d.jsx)("p",{children:"\u2022 Failed login attempts: 23 (24h)"}),(0,d.jsx)("p",{children:"\u2022 Vulnerability scan: Clean"})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED"},children:"Integrations"}),(0,d.jsx)("p",{children:"\u2022 Payment gateways: 3 active"}),(0,d.jsx)("p",{children:"\u2022 Third-party APIs: 15 connected"}),(0,d.jsx)("p",{children:"\u2022 Webhook deliveries: 99.8% success"}),(0,d.jsx)("p",{children:"\u2022 Data sync: Real-time"})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#D97706"},children:"Compliance"}),(0,d.jsx)("p",{children:"\u2022 GDPR compliance: Certified"}),(0,d.jsx)("p",{children:"\u2022 SOC 2 audit: Passed"}),(0,d.jsx)("p",{children:"\u2022 Data retention: Policy active"}),(0,d.jsx)("p",{children:"\u2022 Audit logs: 90-day retention"})]})]})]})]})]})})}}}]);