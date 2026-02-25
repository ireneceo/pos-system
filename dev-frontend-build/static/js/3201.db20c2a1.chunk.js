"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>N});var n=r(9950),s=r(4492),i=r(4752),a=r(3310),o=r(2674),l=r(6038),c=r(9018),d=r(4414);const p=e=>"MYR"===e||"RM"===e?"RM":e,u=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const s=p(r);t[s]=(t[s]||0)+n}),t},h=e=>{const t=u(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,l.vv)(0,"RM"):r.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},x=(e,t)=>{const r=u(e);return"all"===t?Object.values(r).reduce((e,t)=>e+t,0):r[t]||0},g=(e,t)=>{const r=u(e);if("all"!==t)return{lines:[{currency:t,amount:r[t]||0}],single:!0};const n=Object.entries(r).filter(e=>{let[,t]=e;return t>0});return 0===n.length?{lines:[{currency:"RM",amount:0}],single:!0}:{lines:n.map(e=>{let[t,r]=e;return{currency:t,amount:r}}),single:n.length<=1}},m=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,v=i.Ay.button`
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};
  font-size: 13px;
  font-weight: ${e=>e.active?"600":"500"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: ${e=>e.active?"white":"#635BFF"};
  }
`,y=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,j=i.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,f=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,w=i.Ay.div`
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
`,F=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,k=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,A=i.Ay.div`
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
`,S=i.Ay.div`
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
`,C=i.Ay.div`
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
`,D=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,R=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,B=i.Ay.thead`
  background: #F8FAFC;
`,E=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=i.Ay.tbody``,$=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,T=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,z=i.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,Y=i.Ay.div`
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
`,I=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,N=()=>{const e=(0,s.Zp)(),{operationSettings:t}=(0,c.Pj)(),[r,i]=(0,n.useState)("overview"),[N,O]=(0,n.useState)([]),[_,U]=(0,n.useState)([]),[L,P]=(0,n.useState)([]),[G,W]=(0,n.useState)("month"),[X,q]=(0,n.useState)("all"),H=(e=>{const t=new Set;return e.forEach(e=>{const r=p(e.currency||"MYR");t.add(r)}),Array.from(t).sort()})(L),[V,K]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const t={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users?role=Manager",{headers:t});if(!r.ok)throw new Error("Failed to fetch users");const n=await r.json(),s=n.data||n,i=await fetch("/api/restaurants",{headers:t});if(!i.ok)throw new Error("Failed to fetch restaurants");const a=await i.json(),o=a.data||a;let l=[];o&&o.length>0&&(l=o.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));const c=await fetch("/api/invoices",{headers:t});let d=[],p=[],u=0;if(c.ok){const e=await c.json();d=e.data||e,P(d);const t=d.filter(e=>"completed"===e.status||"paid"===e.status),r={};t.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),n=e.currency||"MYR";r[n]=(r[n]||0)+t}),u=t.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);const n=new Map,s=new Date;let i=[];if("week"===G)for(let a=6;a>=0;a--){const e=new Date(s);e.setDate(s.getDate()-a),i.push(e.toISOString().split("T")[0])}else if("month"===G)for(let a=11;a>=0;a--){const e=new Date(s);e.setDate(s.getDate()-7*a);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),i.push(`W${Math.floor(a/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===G)for(let a=5;a>=0;a--){const e=new Date(s);e.setMonth(s.getMonth()-a),i.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let a=11;a>=0;a--){const e=new Date(s);e.setMonth(s.getMonth()-a),i.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}i.forEach(e=>{n.set(e,{revenue:0,revenueByCurrency:{},count:0})}),d.forEach(e=>{const t=new Date(e.issueDate||e.createdAt||e.created_at);let r="";if("week"===G)r=t.toISOString().split("T")[0];else if("month"===G){const e=new Date(t);e.setDate(t.getDate()-t.getDay());const n=Math.floor((s.getTime()-e.getTime())/6048e5);n<12&&(r=`W${Math.floor(n/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`;if(r&&n.has(r)){const t=parseFloat(e.total_amount||e.amount||e.total||0),s=e.currency||"MYR",i=n.get(r),a={...i.revenueByCurrency};a[s]=(a[s]||0)+t,n.set(r,{revenue:i.revenue+t,revenueByCurrency:a,count:i.count+1})}}),p=Array.from(n.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===G?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let h=0;try{const e=await fetch("/api/support-tickets",{headers:t});if(e.ok){const t=await e.json();h=(t.data||t||[]).length}}catch(e){console.error("Error fetching support tickets:",e),h=0}U(p);const x=(s||[]).map(e=>{const t=(o||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=d.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),s=n.filter(e=>"paid"===e.status||"completed"===e.status),i=s.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),a={};s.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";a[r]=(a[r]||0)+t});const l=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),p=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),u=p>=80?"low":p>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:l,restaurantCount:t.length,totalRevenue:i,totalRevenueByCurrency:a,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:p,riskLevel:u}});O(x);const g=x.length,m=l.filter(e=>"active"===e.status).length,v=(null===o||void 0===o?void 0:o.length)||x.reduce((e,t)=>e+t.restaurantCount,0),y=new Date,j=y.getMonth(),f=y.getFullYear(),w=d.filter(e=>"completed"===e.status||"paid"===e.status),F=w.filter(e=>{const t=new Date(e.issueDate||e.issued_at||e.createdAt);return t.getMonth()===j&&t.getFullYear()===f}),b={};F.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";b[r]=(b[r]||0)+t});const k=w.filter(e=>new Date(e.issueDate||e.issued_at||e.createdAt).getFullYear()===f),A={};k.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";A[r]=(A[r]||0)+t});const S=cumulativeRevenueByCurrency,C=Object.values(b).reduce((e,t)=>e+t,0),D=g>0?C/g:0,R=l.length,B=R>0?l.filter(e=>"cancelled"===e.status).length/R*100:0,E=g>0?100*(v/g-1):0,M=12*D,$=m,T=(new Date).getMonth(),z=(new Date).getFullYear(),Y=x.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===z}).length,I=o.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===z}).length,N=d.filter(e=>{if(!e.createdAt)return!1;const t=new Date(e.createdAt);return t.getMonth()===T&&t.getFullYear()===z}).length;K({totalManagers:g,activeSubscriptions:m,totalRestaurants:v,monthlyRevenue:b,yearlyRevenue:A,cumulativeRevenue:S,averageRevenuePerUser:D,churnRate:B,growthRate:E,customerLifetimeValue:M,supportTickets:h,systemUptime:99.9,activeUsers:$,totalTransactions:Y+I+N})}catch(e){console.error("Error fetching dashboard data:",e)}})()},[G]),(0,d.jsx)(a.A,{children:(0,d.jsxs)(f,{children:[(0,d.jsx)(w,{children:(0,d.jsx)(b,{children:"Admin Dashboard"})}),(0,d.jsxs)(F,{children:[H.length>1&&(0,d.jsxs)(m,{children:[(0,d.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),(0,d.jsx)(v,{active:"all"===X,onClick:()=>q("all"),children:"All"}),H.map(e=>(0,d.jsx)(v,{active:X===e,onClick:()=>q(e),children:e},e))]}),(0,d.jsxs)(o.Ot,{children:[(0,d.jsxs)(o.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Monthly Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(V.monthlyRevenue,X);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(y,{children:e.lines.map(t=>(0,d.jsx)(j,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"This Year Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(V.yearlyRevenue,X);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(y,{children:e.lines.map(t=>(0,d.jsx)(j,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)(o.h2,{children:"Cumulative Revenue"}),(0,d.jsx)(o.G$,{children:(()=>{const e=g(V.cumulativeRevenue,X);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,d.jsx)(y,{children:e.lines.map(t=>(0,d.jsx)(j,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,d.jsxs)(o.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Total Managers"}),(0,d.jsx)(o.G$,{children:V.totalManagers})]}),(0,d.jsxs)(o.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,d.jsx)(o.h2,{children:"Active Subscriptions"}),(0,d.jsx)(o.G$,{children:V.activeSubscriptions})]}),(0,d.jsxs)(o.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,d.jsx)(o.h2,{children:"Total Restaurants"}),(0,d.jsx)(o.G$,{children:V.totalRestaurants})]}),(0,d.jsxs)(o.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)(o.h2,{children:"Support Tickets"}),(0,d.jsx)(o.G$,{children:V.supportTickets})]}),(0,d.jsxs)(o.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)(o.h2,{children:"Active Users"}),(0,d.jsx)(o.G$,{children:V.activeUsers})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,d.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,d.jsx)("button",{onClick:()=>W("week"),style:{padding:"6px 12px",background:"week"===G?"#635BFF":"transparent",color:"week"===G?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,d.jsx)("button",{onClick:()=>W("month"),style:{padding:"6px 12px",background:"month"===G?"#635BFF":"transparent",color:"month"===G?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,d.jsx)("button",{onClick:()=>W("quarter"),style:{padding:"6px 12px",background:"quarter"===G?"#635BFF":"transparent",color:"quarter"===G?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,d.jsx)("button",{onClick:()=>W("year"),style:{padding:"6px 12px",background:"year"===G?"#635BFF":"transparent",color:"year"===G?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,d.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:_.length>0?(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:_.map(e=>{const t=x(e.revenueByCurrency,X),r=Math.max(..._.map(e=>x(e.revenueByCurrency,X)));return(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,d.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${"all"===X?h(e.revenueByCurrency):(0,l.vv)(t,X)}`}),(0,d.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===G?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===G?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,d.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?"all"===X?Object.entries(u(e.revenueByCurrency)).filter(e=>{let[,t]=e;return t>0}).map(e=>{let[t,r]=e;return`${(0,l.vv)(r/1e3,t).replace(/\.\d+/,"")}K`}).join(" / "):`${(0,l.vv)(t,X)}`:"-"}),(0,d.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===G?"Last 7 days":"month"===G?"Last 12 weeks":"quarter"===G?"Last 6 months":"Last 12 months","all"!==X&&(0,d.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",X,")"]})]}),(0,d.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>x(e.revenueByCurrency,X),t=_.find(t=>e(t)>0),r=_[_.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,d.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,d.jsxs)("p",{children:["Total Revenue: ",h(V.monthlyRevenue)]}),(0,d.jsxs)("p",{children:["Growth Rate: +",V.growthRate.toFixed(1),"% YoY"]}),(0,d.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)("h3",{children:"System Alerts"}),N.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(C,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,d.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,d.jsxs)("div",{className:"description",children:[N.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," new manager(s) registered today - Click to view"]})]}),V.supportTickets>0&&(0,d.jsxs)(C,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,d.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,d.jsxs)("div",{className:"description",children:[V.supportTickets," open support ticket(s) require attention - Click to view"]})]}),L.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length>0&&(0,d.jsxs)(C,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,d.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,d.jsxs)("div",{className:"description",children:[(()=>{const e=L.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),h(t)})()," ","earned today from ",L.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length," transaction(s) - Click to view details"]})]}),0===N.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&0===V.supportTickets&&0===L.filter(e=>{const t=(new Date).toDateString();return new Date(e.createdAt).toDateString()===t}).length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,d.jsxs)(o.j,{children:[(0,d.jsx)(o.oz,{active:"overview"===r,onClick:()=>i("overview"),children:"Manager Overview"}),(0,d.jsx)(o.oz,{active:"performance"===r,onClick:()=>i("performance"),children:"Performance Analytics"}),(0,d.jsx)(o.oz,{active:"health"===r,onClick:()=>i("health"),children:"Account Health"}),(0,d.jsx)(o.oz,{active:"system"===r,onClick:()=>i("system"),children:"System Operations"})]}),"overview"===r&&(0,d.jsx)(D,{children:(0,d.jsxs)(R,{children:[(0,d.jsx)(B,{children:(0,d.jsxs)($,{children:[(0,d.jsx)(E,{children:"Manager Company"}),(0,d.jsx)(E,{children:"Plan"}),(0,d.jsx)(E,{children:"Status"}),(0,d.jsx)(E,{children:"Restaurants"}),(0,d.jsx)(E,{children:"Monthly Revenue"}),(0,d.jsx)(E,{children:"Health Score"}),(0,d.jsx)(E,{children:"Risk Level"})]})}),(0,d.jsx)(M,{children:N.map(e=>(0,d.jsxs)($,{children:[(0,d.jsx)(T,{children:(0,d.jsxs)(z,{children:[(0,d.jsx)("div",{className:"name",children:e.companyName}),(0,d.jsx)("div",{className:"email",children:e.email})]})}),(0,d.jsx)(T,{children:(0,d.jsx)(I,{variant:e.planType,children:e.planType})}),(0,d.jsx)(T,{children:(0,d.jsx)(I,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,d.jsx)(T,{children:e.restaurantCount}),(0,d.jsx)(T,{children:h(e.totalRevenueByCurrency)}),(0,d.jsx)(T,{children:(0,d.jsxs)(Y,{score:e.healthScore,children:[(0,d.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,d.jsx)("div",{className:"bar"})]})}),(0,d.jsx)(T,{children:(0,d.jsx)(I,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===r&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights ","all"!==X&&`(${X})`]}),(0,d.jsxs)("p",{children:["\u2022 Monthly revenue: ","all"===X?h(V.monthlyRevenue):(0,l.vv)(x(V.monthlyRevenue,X),X)]}),(0,d.jsxs)("p",{children:["\u2022 Yearly revenue: ","all"===X?h(V.yearlyRevenue):(0,l.vv)(x(V.yearlyRevenue,X),X)]}),(0,d.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(V.averageRevenuePerUser,t.currency)]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",V.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",V.activeSubscriptions]}),(0,d.jsxs)("p",{children:["\u2022 Open support tickets: ",V.supportTickets]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",V.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 This month activities: ",V.totalTransactions]}),(0,d.jsxs)("p",{children:["\u2022 Cumulative revenue: ","all"===X?h(V.cumulativeRevenue):(0,l.vv)(x(V.cumulativeRevenue,X),X)]})]})]})]}),"health"===r&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Health Score Distribution"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",N.filter(e=>e.healthScore>=80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",N.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,d.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",N.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{children:"Risk Factors"}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,d.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,d.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,d.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===r&&(0,d.jsxs)(D,{style:{padding:"32px"},children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,d.jsxs)("p",{children:["\u2022 Total invoices: ",L.length]}),(0,d.jsxs)("p",{children:["\u2022 Paid: ",L.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Pending: ",L.filter(e=>"pending_payment"===e.status).length]}),(0,d.jsxs)("p",{children:["\u2022 Overdue: ",L.filter(e=>"overdue"===e.status).length]})]}),(0,d.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,d.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,d.jsxs)("p",{children:["\u2022 Total managers: ",V.totalManagers]}),(0,d.jsxs)("p",{children:["\u2022 Active users: ",V.activeUsers]}),(0,d.jsxs)("p",{children:["\u2022 Total restaurants: ",V.totalRestaurants]}),(0,d.jsxs)("p",{children:["\u2022 Active subscriptions: ",V.activeSubscriptions]})]})]})]})]})]})})}}}]);