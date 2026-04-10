"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),a=r(4492);function i(e){const[t,r]=(0,a.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,o]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var n=r(9950),a=r(4492),i=r(4752),s=r(8409),o=r(2597),c=r(2653),l=r(6038),d=r(9018),h=r(5030),p=r(9955),u=r(4414);const x=e=>"MYR"===e||"RM"===e?"MYR":e,m=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const a=x(r);t[a]=(t[a]||0)+n}),t},g=e=>{const t=m(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,l.vv)(0,"MYR"):r.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},y=(e,t)=>m(e)[t]||0,v=(e,t)=>({lines:[{currency:t,amount:m(e)[t]||0}],single:!0}),f=e=>{const t=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,n,a]=t.split("-").map(Number);return{year:r,month:n-1,day:a}},j=(e,t)=>{const r=new Date(e);if(isNaN(r.getTime()))return{year:0,month:-1,day:0};const n=r.toLocaleDateString("en-CA",{timeZone:t}),[a,i,s]=n.split("-").map(Number);return{year:a,month:i-1,day:s}},b=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,w=i.Ay.button`
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
`,F=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,A=i.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,C=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,k=i.Ay.div`
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
`,D=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,S=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,E=i.Ay.div`
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
`,R=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0 16px 0;
    color: #0A2540;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
`,M=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{switch(e.type){case"error":return"#FEF2F2";case"warning":return"#FFFBEB";case"success":return"#ECFDF5";case"info":return"#EFF6FF";default:return"#F8FAFC"}}};
  border: 1px solid ${e=>{switch(e.type){case"error":return"#FECACA";case"warning":return"#FDE68A";case"success":return"#A7F3D0";case"info":return"#BFDBFE";default:return"#E6EBF1"}}};
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`,T=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,L=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,N=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,_=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,I=i.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;

    .icon {
      color: #0A2540;
    }

    .title {
      color: #0A2540;
    }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #425466;
    margin-bottom: 4px;
  }

  .description {
    font-size: 12px;
    color: #8898AA;
  }
`,Y=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,O=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,U=i.Ay.thead`
  background: #F8FAFC;
`,G=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,W=i.Ay.tbody``,Z=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,P=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,X=i.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,q=i.Ay.div`
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
`,H=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,K=()=>{const{t:e}=(0,h.Bd)("admin"),t=(0,a.Zp)(),{operationSettings:r,siteTimezone:i}=(0,d.Pj)(),[m,K]=(0,c.M)("overview"),[V,Q]=(0,n.useState)([]),[J,ee]=(0,n.useState)([]),[te,re]=(0,n.useState)([]),[ne,ae]=(0,n.useState)("month"),[ie,se]=(0,n.useState)(""),[oe,ce]=(0,n.useState)([]),[le,de]=(0,n.useState)({criticalCount:0,errorCount:0,total:0}),he=(0,n.useMemo)(()=>{try{return(new Date).toLocaleDateString("en-CA",{timeZone:i||"Asia/Kuala_Lumpur"})}catch{return(new Date).toISOString().split("T")[0]}},[i]),[pe,ue]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const r={"Content-Type":"application/json",Authorization:`Bearer ${(0,p.c4)()}`},n=await fetch("/api/users?role=Manager",{headers:r});if(!n.ok)throw new Error("Failed to fetch users");const a=await n.json(),s=(a.data||a).filter(e=>!e.is_demo&&!e.is_test),o=await fetch("/api/restaurants",{headers:r});if(!o.ok)throw new Error("Failed to fetch restaurants");const c=await o.json(),l=(c.data||c).filter(e=>!e.is_demo&&!e.is_test);let d=[];l&&l.length>0&&(d=l.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));let h=[];try{const e=await fetch("/api/currencies/supported",{headers:r});if(e.ok){const t=await e.json();h=(t.data||t||[]).map(e=>x("string"===typeof e?e:e.code))}}catch(e){console.error("Error fetching supported currencies:",e)}0===h.length&&(h=["RM"]),h=Array.from(new Set(h)),ce(h);try{const e=await fetch("/api/system-logs/alerts-summary",{headers:r});if(e.ok){const t=await e.json();t.success&&de(t.data)}}catch(e){console.error("Error fetching system log alerts:",e)}const u=await fetch("/api/invoices",{headers:r});let m=[],g=[];const y={};if(u.ok){const e=await u.json();if(m=e.data||e,re(m),!ie){const e=((e,t)=>{const r={};e.forEach(e=>{if("draft"!==e.status&&"cancelled"!==e.status){const t=x(e.currency||"MYR");r[t]=(r[t]||0)+1}});let n=t[0]||"MYR",a=0;return t.forEach(e=>{(r[e]||0)>a&&(a=r[e]||0,n=e)}),n})(m,h);se(e)}m.filter(e=>"completed"===e.status||"paid"===e.status).forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),r=e.currency||"MYR";y[r]=(y[r]||0)+t});const t=new Map,r=new Date;let n=[];if("week"===ne)for(let a=6;a>=0;a--){const e=new Date(r);e.setDate(r.getDate()-a),n.push(e.toISOString().split("T")[0])}else if("month"===ne)for(let a=11;a>=0;a--){const e=new Date(r);e.setDate(r.getDate()-7*a);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),n.push(`W${Math.floor(a/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===ne)for(let a=5;a>=0;a--){const e=new Date(r);e.setMonth(r.getMonth()-a),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let a=11;a>=0;a--){const e=new Date(r);e.setMonth(r.getMonth()-a),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}n.forEach(e=>{t.set(e,{revenue:0,revenueByCurrency:{},count:0})}),m.forEach(e=>{const n=new Date(e.issueDate||e.createdAt||e.created_at);let a="";if("week"===ne)a=n.toISOString().split("T")[0];else if("month"===ne){const e=new Date(n);e.setDate(n.getDate()-n.getDay());const t=Math.floor((r.getTime()-e.getTime())/6048e5);t<12&&(a=`W${Math.floor(t/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else a=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;if(a&&t.has(a)){const r=parseFloat(e.total_amount||e.amount||e.total||0),n=e.currency||"MYR",i=t.get(a),s={...i.revenueByCurrency};s[n]=(s[n]||0)+r,t.set(a,{revenue:i.revenue+r,revenueByCurrency:s,count:i.count+1})}}),g=Array.from(t.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===ne?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let v=0;try{const e=await fetch("/api/support-tickets",{headers:r});if(e.ok){const t=await e.json();v=(t.data||t||[]).length}}catch(t){console.error("Error fetching support tickets:",t),v=0}ee(g);const b=(s||[]).map(e=>{const t=(l||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=m.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),a=n.filter(e=>"paid"===e.status||"completed"===e.status),i=a.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),s={};a.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";s[r]=(s[r]||0)+t});const o=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),d=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),h=d>=80?"low":d>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:o,restaurantCount:t.length,totalRevenue:i,totalRevenueByCurrency:s,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:d,riskLevel:h}});Q(b);const w=b.length,F=d.filter(e=>"active"===e.status).length,A=(null===l||void 0===l?void 0:l.length)||b.reduce((e,t)=>e+t.restaurantCount,0),C=i||"Asia/Kuala_Lumpur",{year:k,month:D}=f(C),S=m.filter(e=>"completed"===e.status||"paid"===e.status),B=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r,month:n}=j(t,C);return n===D&&r===k}),E={};B.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";E[r]=(E[r]||0)+t});const R=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r}=j(t,C);return r===k}),M={};R.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";M[r]=(M[r]||0)+t});const $=y,T=Object.values(E).reduce((e,t)=>e+t,0),z=w>0?T/w:0,L=d.length,N=L>0?d.filter(e=>"cancelled"===e.status).length/L*100:0,_=w>0?100*(A/w-1):0,I=12*z,Y=F,{year:O,month:U}=f(C),G=b.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=j(e.createdAt,C);return r===U&&t===O}).length,W=l.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=j(e.createdAt,C);return r===U&&t===O}).length,Z=m.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=j(e.createdAt,C);return r===U&&t===O}).length;ue({totalManagers:w,activeSubscriptions:F,totalRestaurants:A,monthlyRevenue:E,yearlyRevenue:M,cumulativeRevenue:$,averageRevenuePerUser:z,churnRate:N,growthRate:_,customerLifetimeValue:I,supportTickets:v,systemUptime:99.9,activeUsers:Y,totalTransactions:G+W+Z})}catch(t){console.error("Error fetching dashboard data:",t)}})()},[ne,i]),(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:(0,u.jsx)(S,{children:e("admin:adminDashboard.adminDashboard")})}),(0,u.jsxs)(D,{children:[oe.length>0&&(0,u.jsxs)(b,{children:[(0,u.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),oe.map(e=>(0,u.jsx)(w,{active:ie===e,onClick:()=>se(e),children:e},e))]}),(0,u.jsxs)(s.Ot,{children:[(0,u.jsxs)(s.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.monthlyRevenue")}),(0,u.jsx)(s.G$,{children:(()=>{const e=v(pe.monthlyRevenue,ie);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,u.jsx)(F,{children:e.lines.map(t=>(0,u.jsx)(A,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,u.jsxs)(s.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.thisYearRevenue")}),(0,u.jsx)(s.G$,{children:(()=>{const e=v(pe.yearlyRevenue,ie);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,u.jsx)(F,{children:e.lines.map(t=>(0,u.jsx)(A,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,u.jsxs)(s.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/report"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.cumulativeRevenue")}),(0,u.jsx)(s.G$,{children:(()=>{const e=v(pe.cumulativeRevenue,ie);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,u.jsx)(F,{children:e.lines.map(t=>(0,u.jsx)(A,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,u.jsxs)(s.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/managers"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.totalManagers")}),(0,u.jsx)(s.G$,{children:pe.totalManagers})]}),(0,u.jsxs)(s.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/subscriptions"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.activeSubscriptions")}),(0,u.jsx)(s.G$,{children:pe.activeSubscriptions})]}),(0,u.jsxs)(s.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/restaurants"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.totalRestaurants")}),(0,u.jsx)(s.G$,{children:pe.totalRestaurants})]}),(0,u.jsxs)(s.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/support"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.supportTickets")}),(0,u.jsx)(s.G$,{children:pe.supportTickets})]}),(0,u.jsxs)(s.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>t("/pos/admin/managers"),children:[(0,u.jsx)(s.h2,{children:e("admin:adminDashboard.activeUsers")}),(0,u.jsx)(s.G$,{children:pe.activeUsers})]})]}),(0,u.jsxs)(B,{children:[(0,u.jsxs)(E,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,u.jsx)("h3",{children:e("admin:adminDashboard.revenueGrowthAnalytics")}),(0,u.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,u.jsx)("button",{onClick:()=>ae("week"),style:{padding:"6px 12px",background:"week"===ne?"#635BFF":"transparent",color:"week"===ne?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,u.jsx)("button",{onClick:()=>ae("month"),style:{padding:"6px 12px",background:"month"===ne?"#635BFF":"transparent",color:"month"===ne?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,u.jsx)("button",{onClick:()=>ae("quarter"),style:{padding:"6px 12px",background:"quarter"===ne?"#635BFF":"transparent",color:"quarter"===ne?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,u.jsx)("button",{onClick:()=>ae("year"),style:{padding:"6px 12px",background:"year"===ne?"#635BFF":"transparent",color:"year"===ne?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,u.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:J.length>0?(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:J.map(e=>{const t=y(e.revenueByCurrency,ie),r=Math.max(...J.map(e=>y(e.revenueByCurrency,ie)));return(0,u.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,u.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(t,ie)}`}),(0,u.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===ne?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===ne?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,u.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?(0,l.vv)(t,ie):"-"}),(0,u.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===ne?"Last 7 days":"month"===ne?"Last 12 weeks":"quarter"===ne?"Last 6 months":"Last 12 months",(0,u.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",ie,")"]})]}),(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>y(e.revenueByCurrency,ie),t=J.find(t=>e(t)>0),r=J[J.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,u.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,u.jsxs)("p",{children:["Total Revenue: ",g(pe.monthlyRevenue)]}),(0,u.jsxs)("p",{children:["Growth Rate: +",pe.growthRate.toFixed(1),"% YoY"]}),(0,u.jsx)("p",{children:e("admin:adminDashboard.invoiceDataLoading")})]})})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)("h3",{children:e("admin:adminDashboard.notifications")}),(0,u.jsxs)(M,{children:[le.total>0&&(0,u.jsx)($,{type:le.criticalCount>0?"error":"warning",onClick:()=>t("/pos/admin/logs"),children:(0,u.jsxs)(T,{children:[(0,u.jsx)(z,{type:le.criticalCount>0?"error":"warning",children:le.criticalCount>0?"Critical System Alerts":"System Error Alerts"}),(0,u.jsxs)(L,{children:[le.criticalCount>0&&`${le.criticalCount} critical`,le.criticalCount>0&&le.errorCount>0&&", ",le.errorCount>0&&`${le.errorCount} error`," ","log(s) in the last 24 hours - Click to investigate"]})]})}),V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length>0&&(0,u.jsx)($,{type:"info",onClick:()=>t("/pos/admin/managers"),children:(0,u.jsxs)(T,{children:[(0,u.jsx)(z,{type:"info",children:e("admin:adminDashboard.newManagerRegistration")}),(0,u.jsxs)(L,{children:[V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length," new manager(s) registered today - Click to view"]})]})}),pe.supportTickets>0&&(0,u.jsx)($,{type:"warning",onClick:()=>t("/pos/admin/support"),children:(0,u.jsxs)(T,{children:[(0,u.jsx)(z,{type:"warning",children:e("admin:adminDashboard.supportTicketsPending")}),(0,u.jsxs)(L,{children:[pe.supportTickets," open support ticket(s) require attention - Click to view"]})]})}),te.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length>0&&(0,u.jsx)($,{type:"info",onClick:()=>t("/pos/admin/report"),children:(0,u.jsxs)(T,{children:[(0,u.jsx)(z,{type:"info",children:e("admin:adminDashboard.newRevenueGenerated")}),(0,u.jsxs)(L,{children:[(()=>{const e=te.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),g(t)})()," ","earned today from ",te.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length," transaction(s) - Click to view details"]})]})}),0===le.total&&0===V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length&&0===pe.supportTickets&&0===te.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:i})===he}catch{return!1}}).length&&(0,u.jsx)($,{type:"success",onClick:()=>{},children:(0,u.jsxs)(T,{children:[(0,u.jsx)(z,{type:"success",children:e("admin:adminDashboard.allClear")}),(0,u.jsx)(L,{children:e("admin:adminDashboard.noNewActivitiesAllSystemsRunningSmoothly")})]})})]})]})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("h3",{children:e("admin:adminDashboard.quickActions")}),(0,u.jsxs)(_,{children:[(0,u.jsxs)(I,{onClick:()=>t("/pos/admin/restaurants"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25d0"}),(0,u.jsx)("div",{className:"title",children:e("admin:adminDashboard.restaurants")}),(0,u.jsx)("div",{className:"description",children:e("admin:adminDashboard.manageAllRestaurants")})]}),(0,u.jsxs)(I,{onClick:()=>t("/pos/admin/invoices"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25a6"}),(0,u.jsx)("div",{className:"title",children:e("admin:adminDashboard.invoices")}),(0,u.jsx)("div",{className:"description",children:e("admin:adminDashboard.invoiceManagement")})]}),(0,u.jsxs)(I,{onClick:()=>t("/pos/admin/notices"),children:[(0,u.jsx)("div",{className:"icon",children:"\u25c8"}),(0,u.jsx)("div",{className:"title",children:e("admin:adminDashboard.notices")}),(0,u.jsx)("div",{className:"description",children:e("admin:adminDashboard.communicationHub")})]}),(0,u.jsxs)(I,{onClick:()=>t("/pos/admin/report"),children:[(0,u.jsx)("div",{className:"icon",children:"\u2630"}),(0,u.jsx)("div",{className:"title",children:e("admin:adminDashboard.report")}),(0,u.jsx)("div",{className:"description",children:e("admin:adminDashboard.platformAnalytics")})]})]})]}),(0,u.jsxs)(o.tU,{children:[(0,u.jsx)(o.oz,{active:"overview"===m,onClick:()=>K("overview"),children:"Manager Overview"}),(0,u.jsx)(o.oz,{active:"performance"===m,onClick:()=>K("performance"),children:"Performance Analytics"}),(0,u.jsx)(o.oz,{active:"health"===m,onClick:()=>K("health"),children:"Account Health"}),(0,u.jsx)(o.oz,{active:"system"===m,onClick:()=>K("system"),children:"System Operations"})]}),"overview"===m&&(0,u.jsx)(Y,{children:(0,u.jsxs)(O,{children:[(0,u.jsx)(U,{children:(0,u.jsxs)(Z,{children:[(0,u.jsx)(G,{children:e("admin:adminDashboard.managerCompany")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.plan")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.status")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.restaurants")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.monthlyRevenue")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.healthScore")}),(0,u.jsx)(G,{children:e("admin:adminDashboard.riskLevel")})]})}),(0,u.jsx)(W,{children:V.map(e=>(0,u.jsxs)(Z,{children:[(0,u.jsx)(P,{children:(0,u.jsxs)(X,{children:[(0,u.jsx)("div",{className:"name",children:e.companyName}),(0,u.jsx)("div",{className:"email",children:e.email})]})}),(0,u.jsx)(P,{children:(0,u.jsx)(H,{variant:e.planType,children:e.planType})}),(0,u.jsx)(P,{children:(0,u.jsx)(H,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,u.jsx)(P,{children:e.restaurantCount}),(0,u.jsx)(P,{children:g(e.totalRevenueByCurrency)}),(0,u.jsx)(P,{children:(0,u.jsxs)(q,{score:e.healthScore,children:[(0,u.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,u.jsx)("div",{className:"bar"})]})}),(0,u.jsx)(P,{children:(0,u.jsx)(H,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===m&&(0,u.jsxs)(Y,{style:{padding:"32px"},children:[(0,u.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.performanceAnalytics")}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights (",ie,")"]}),(0,u.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,l.vv)(y(pe.monthlyRevenue,ie),ie)]}),(0,u.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,l.vv)(y(pe.yearlyRevenue,ie),ie)]}),(0,u.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(pe.averageRevenuePerUser,r.currency)]})]}),(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:e("admin:adminDashboard.businessOverview")}),(0,u.jsxs)("p",{children:["\u2022 Total managers: ",pe.totalManagers]}),(0,u.jsxs)("p",{children:["\u2022 Active subscriptions: ",pe.activeSubscriptions]}),(0,u.jsxs)("p",{children:["\u2022 Open support tickets: ",pe.supportTickets]})]}),(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:e("admin:adminDashboard.restaurantMetrics")}),(0,u.jsxs)("p",{children:["\u2022 Total restaurants: ",pe.totalRestaurants]}),(0,u.jsxs)("p",{children:["\u2022 This month activities: ",pe.totalTransactions]}),(0,u.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,l.vv)(y(pe.cumulativeRevenue,ie),ie)]})]})]})]}),"health"===m&&(0,u.jsxs)(Y,{style:{padding:"32px"},children:[(0,u.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.accountHealthMonitoring")}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("h4",{children:e("admin:adminDashboard.healthScoreDistribution")}),(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",V.filter(e=>e.healthScore>=80).length," accounts"]}),(0,u.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",V.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,u.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",V.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("h4",{children:e("admin:adminDashboard.riskFactors")}),(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,u.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,u.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,u.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===m&&(0,u.jsxs)(Y,{style:{padding:"32px"},children:[(0,u.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:e("admin:adminDashboard.systemOperations")}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsx)("h4",{style:{color:"#059669"},children:e("admin:adminDashboard.invoiceSummary")}),(0,u.jsxs)("p",{children:["\u2022 Total invoices: ",te.length]}),(0,u.jsxs)("p",{children:["\u2022 Paid: ",te.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,u.jsxs)("p",{children:["\u2022 Pending: ",te.filter(e=>"pending_payment"===e.status).length]}),(0,u.jsxs)("p",{children:["\u2022 Overdue: ",te.filter(e=>"overdue"===e.status).length]})]}),(0,u.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,u.jsx)("h4",{style:{color:"#2563EB"},children:e("admin:adminDashboard.userActivity")}),(0,u.jsxs)("p",{children:["\u2022 Total managers: ",pe.totalManagers]}),(0,u.jsxs)("p",{children:["\u2022 Active users: ",pe.activeUsers]}),(0,u.jsxs)("p",{children:["\u2022 Total restaurants: ",pe.totalRestaurants]}),(0,u.jsxs)("p",{children:["\u2022 Active subscriptions: ",pe.activeSubscriptions]})]})]})]})]})]})})}}}]);