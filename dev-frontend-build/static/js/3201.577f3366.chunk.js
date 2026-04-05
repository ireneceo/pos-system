"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{2597:(e,t,r)=>{r.d(t,{Ex:()=>d,oz:()=>l,tU:()=>c});r(9950);var n=r(4752),i=r(4414);const s=n.Ay.div`
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
`,a=n.Ay.button`
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
`,o=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,c=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(s,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:s}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:s,children:n})},d=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(o,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>s});var n=r(9950),i=r(4492);function s(e){const[t,r]=(0,i.ok)(),s=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,o]=(0,n.useState)(s());return[a,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(9950),i=r(4492),s=r(4752),a=r(8409),o=r(2597),c=r(2653),l=r(6038),d=r(9018),p=r(4414);const h=e=>"MYR"===e||"RM"===e?"MYR":e,u=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const i=h(r);t[i]=(t[i]||0)+n}),t},x=e=>{const t=u(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,l.vv)(0,"MYR"):r.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},g=(e,t)=>u(e)[t]||0,m=(e,t)=>({lines:[{currency:t,amount:u(e)[t]||0}],single:!0}),y=e=>{const t=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,n,i]=t.split("-").map(Number);return{year:r,month:n-1,day:i}},v=(e,t)=>{const r=new Date(e);if(isNaN(r.getTime()))return{year:0,month:-1,day:0};const n=r.toLocaleDateString("en-CA",{timeZone:t}),[i,s,a]=n.split("-").map(Number);return{year:i,month:s-1,day:a}},f=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,j=s.Ay.button`
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
`,b=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,w=s.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,F=s.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,k=s.Ay.div`
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
`,C=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,A=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,B=s.Ay.div`
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
`,E=s.Ay.div`
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
`,R=s.Ay.div`
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
`,D=s.Ay.div`
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
`,M=s.Ay.div`
  flex: 1;
  min-width: 0;
`,$=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,T=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,z=s.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,N=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,L=s.Ay.div`
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
`,I=s.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,_=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,Y=s.Ay.thead`
  background: #F8FAFC;
`,U=s.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,O=s.Ay.tbody``,P=s.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,Z=s.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,G=s.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,W=s.Ay.div`
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
`,X=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,q=()=>{const e=(0,i.Zp)(),{operationSettings:t,siteTimezone:r}=(0,d.Pj)(),[s,u]=(0,c.M)("overview"),[q,H]=(0,n.useState)([]),[K,Q]=(0,n.useState)([]),[V,J]=(0,n.useState)([]),[ee,te]=(0,n.useState)("month"),[re,ne]=(0,n.useState)(""),[ie,se]=(0,n.useState)([]),[ae,oe]=(0,n.useState)({criticalCount:0,errorCount:0,total:0}),ce=(0,n.useMemo)(()=>{try{return(new Date).toLocaleDateString("en-CA",{timeZone:r||"Asia/Kuala_Lumpur"})}catch{return(new Date).toISOString().split("T")[0]}},[r]),[le,de]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},i=await fetch("/api/users?role=Manager",{headers:n});if(!i.ok)throw new Error("Failed to fetch users");const s=await i.json(),a=(s.data||s).filter(e=>!e.is_demo&&!e.is_test),o=await fetch("/api/restaurants",{headers:n});if(!o.ok)throw new Error("Failed to fetch restaurants");const c=await o.json(),l=(c.data||c).filter(e=>!e.is_demo&&!e.is_test);let d=[];l&&l.length>0&&(d=l.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));let p=[];try{const e=await fetch("/api/currencies/supported",{headers:n});if(e.ok){const t=await e.json();p=(t.data||t||[]).map(e=>h("string"===typeof e?e:e.code))}}catch(e){console.error("Error fetching supported currencies:",e)}0===p.length&&(p=["RM"]),p=Array.from(new Set(p)),se(p);try{const e=await fetch("/api/system-logs/alerts-summary",{headers:n});if(e.ok){const t=await e.json();t.success&&oe(t.data)}}catch(e){console.error("Error fetching system log alerts:",e)}const u=await fetch("/api/invoices",{headers:n});let x=[],g=[];const m={};if(u.ok){const e=await u.json();if(x=e.data||e,J(x),!re){const e=((e,t)=>{const r={};e.forEach(e=>{if("draft"!==e.status&&"cancelled"!==e.status){const t=h(e.currency||"MYR");r[t]=(r[t]||0)+1}});let n=t[0]||"MYR",i=0;return t.forEach(e=>{(r[e]||0)>i&&(i=r[e]||0,n=e)}),n})(x,p);ne(e)}x.filter(e=>"completed"===e.status||"paid"===e.status).forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),r=e.currency||"MYR";m[r]=(m[r]||0)+t});const t=new Map,r=new Date;let n=[];if("week"===ee)for(let i=6;i>=0;i--){const e=new Date(r);e.setDate(r.getDate()-i),n.push(e.toISOString().split("T")[0])}else if("month"===ee)for(let i=11;i>=0;i--){const e=new Date(r);e.setDate(r.getDate()-7*i);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),n.push(`W${Math.floor(i/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===ee)for(let i=5;i>=0;i--){const e=new Date(r);e.setMonth(r.getMonth()-i),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let i=11;i>=0;i--){const e=new Date(r);e.setMonth(r.getMonth()-i),n.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}n.forEach(e=>{t.set(e,{revenue:0,revenueByCurrency:{},count:0})}),x.forEach(e=>{const n=new Date(e.issueDate||e.createdAt||e.created_at);let i="";if("week"===ee)i=n.toISOString().split("T")[0];else if("month"===ee){const e=new Date(n);e.setDate(n.getDate()-n.getDay());const t=Math.floor((r.getTime()-e.getTime())/6048e5);t<12&&(i=`W${Math.floor(t/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else i=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`;if(i&&t.has(i)){const r=parseFloat(e.total_amount||e.amount||e.total||0),n=e.currency||"MYR",s=t.get(i),a={...s.revenueByCurrency};a[n]=(a[n]||0)+r,t.set(i,{revenue:s.revenue+r,revenueByCurrency:a,count:s.count+1})}}),g=Array.from(t.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===ee?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let f=0;try{const e=await fetch("/api/support-tickets",{headers:n});if(e.ok){const t=await e.json();f=(t.data||t||[]).length}}catch(t){console.error("Error fetching support tickets:",t),f=0}Q(g);const j=(a||[]).map(e=>{const t=(l||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=x.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),i=n.filter(e=>"paid"===e.status||"completed"===e.status),s=i.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),a={};i.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";a[r]=(a[r]||0)+t});const o=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),d=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),p=d>=80?"low":d>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:o,restaurantCount:t.length,totalRevenue:s,totalRevenueByCurrency:a,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:d,riskLevel:p}});H(j);const b=j.length,w=d.filter(e=>"active"===e.status).length,F=(null===l||void 0===l?void 0:l.length)||j.reduce((e,t)=>e+t.restaurantCount,0),k=r||"Asia/Kuala_Lumpur",{year:C,month:A}=y(k),S=x.filter(e=>"completed"===e.status||"paid"===e.status),B=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r,month:n}=v(t,k);return n===A&&r===C}),E={};B.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";E[r]=(E[r]||0)+t});const R=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r}=v(t,k);return r===C}),D={};R.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";D[r]=(D[r]||0)+t});const M=m,$=Object.values(E).reduce((e,t)=>e+t,0),T=b>0?$/b:0,z=d.length,N=z>0?d.filter(e=>"cancelled"===e.status).length/z*100:0,L=b>0?100*(F/b-1):0,I=12*T,_=w,{year:Y,month:U}=y(k),O=j.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===U&&t===Y}).length,P=l.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===U&&t===Y}).length,Z=x.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===U&&t===Y}).length;de({totalManagers:b,activeSubscriptions:w,totalRestaurants:F,monthlyRevenue:E,yearlyRevenue:D,cumulativeRevenue:M,averageRevenuePerUser:T,churnRate:N,growthRate:L,customerLifetimeValue:I,supportTickets:f,systemUptime:99.9,activeUsers:_,totalTransactions:O+P+Z})}catch(t){console.error("Error fetching dashboard data:",t)}})()},[ee,r]),(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:(0,p.jsx)(A,{children:"Admin Dashboard"})}),(0,p.jsxs)(C,{children:[ie.length>0&&(0,p.jsxs)(f,{children:[(0,p.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),ie.map(e=>(0,p.jsx)(j,{active:re===e,onClick:()=>ne(e),children:e},e))]}),(0,p.jsxs)(a.Ot,{children:[(0,p.jsxs)(a.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(a.h2,{children:"Monthly Revenue"}),(0,p.jsx)(a.G$,{children:(()=>{const e=m(le.monthlyRevenue,re);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(a.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(a.h2,{children:"This Year Revenue"}),(0,p.jsx)(a.G$,{children:(()=>{const e=m(le.yearlyRevenue,re);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(a.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(a.h2,{children:"Cumulative Revenue"}),(0,p.jsx)(a.G$,{children:(()=>{const e=m(le.cumulativeRevenue,re);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(a.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,p.jsx)(a.h2,{children:"Total Managers"}),(0,p.jsx)(a.G$,{children:le.totalManagers})]}),(0,p.jsxs)(a.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,p.jsx)(a.h2,{children:"Active Subscriptions"}),(0,p.jsx)(a.G$,{children:le.activeSubscriptions})]}),(0,p.jsxs)(a.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,p.jsx)(a.h2,{children:"Total Restaurants"}),(0,p.jsx)(a.G$,{children:le.totalRestaurants})]}),(0,p.jsxs)(a.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,p.jsx)(a.h2,{children:"Support Tickets"}),(0,p.jsx)(a.G$,{children:le.supportTickets})]}),(0,p.jsxs)(a.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,p.jsx)(a.h2,{children:"Active Users"}),(0,p.jsx)(a.G$,{children:le.activeUsers})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>te("week"),style:{padding:"6px 12px",background:"week"===ee?"#635BFF":"transparent",color:"week"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,p.jsx)("button",{onClick:()=>te("month"),style:{padding:"6px 12px",background:"month"===ee?"#635BFF":"transparent",color:"month"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,p.jsx)("button",{onClick:()=>te("quarter"),style:{padding:"6px 12px",background:"quarter"===ee?"#635BFF":"transparent",color:"quarter"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,p.jsx)("button",{onClick:()=>te("year"),style:{padding:"6px 12px",background:"year"===ee?"#635BFF":"transparent",color:"year"===ee?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,p.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:K.length>0?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:K.map(e=>{const t=g(e.revenueByCurrency,re),r=Math.max(...K.map(e=>g(e.revenueByCurrency,re)));return(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,p.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(t,re)}`}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===ee?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===ee?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,p.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?(0,l.vv)(t,re):"-"}),(0,p.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===ee?"Last 7 days":"month"===ee?"Last 12 weeks":"quarter"===ee?"Last 6 months":"Last 12 months",(0,p.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",re,")"]})]}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>g(e.revenueByCurrency,re),t=K.find(t=>e(t)>0),r=K[K.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,p.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,p.jsxs)("p",{children:["Total Revenue: ",x(le.monthlyRevenue)]}),(0,p.jsxs)("p",{children:["Growth Rate: +",le.growthRate.toFixed(1),"% YoY"]}),(0,p.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)("h3",{children:"Notifications"}),(0,p.jsxs)(R,{children:[ae.total>0&&(0,p.jsx)(D,{type:ae.criticalCount>0?"error":"warning",onClick:()=>e("/pos/admin/logs"),children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{type:ae.criticalCount>0?"error":"warning",children:ae.criticalCount>0?"Critical System Alerts":"System Error Alerts"}),(0,p.jsxs)(T,{children:[ae.criticalCount>0&&`${ae.criticalCount} critical`,ae.criticalCount>0&&ae.errorCount>0&&", ",ae.errorCount>0&&`${ae.errorCount} error`," ","log(s) in the last 24 hours - Click to investigate"]})]})}),q.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length>0&&(0,p.jsx)(D,{type:"info",onClick:()=>e("/pos/admin/managers"),children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{type:"info",children:"New Manager Registration"}),(0,p.jsxs)(T,{children:[q.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length," new manager(s) registered today - Click to view"]})]})}),le.supportTickets>0&&(0,p.jsx)(D,{type:"warning",onClick:()=>e("/pos/admin/support"),children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{type:"warning",children:"Support Tickets Pending"}),(0,p.jsxs)(T,{children:[le.supportTickets," open support ticket(s) require attention - Click to view"]})]})}),V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length>0&&(0,p.jsx)(D,{type:"info",onClick:()=>e("/pos/admin/report"),children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{type:"info",children:"New Revenue Generated"}),(0,p.jsxs)(T,{children:[(()=>{const e=V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),x(t)})()," ","earned today from ",V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length," transaction(s) - Click to view details"]})]})}),0===ae.total&&0===q.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length&&0===le.supportTickets&&0===V.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===ce}catch{return!1}}).length&&(0,p.jsx)(D,{type:"success",onClick:()=>{},children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{type:"success",children:"All Clear"}),(0,p.jsx)(T,{children:"No new activities. All systems running smoothly."})]})})]})]})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)("h3",{children:"Quick Actions"}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(L,{onClick:()=>e("/pos/admin/restaurants"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25d0"}),(0,p.jsx)("div",{className:"title",children:"Restaurants"}),(0,p.jsx)("div",{className:"description",children:"Manage all restaurants"})]}),(0,p.jsxs)(L,{onClick:()=>e("/pos/admin/invoices"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25a6"}),(0,p.jsx)("div",{className:"title",children:"Invoices"}),(0,p.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,p.jsxs)(L,{onClick:()=>e("/pos/admin/notices"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c8"}),(0,p.jsx)("div",{className:"title",children:"Notices"}),(0,p.jsx)("div",{className:"description",children:"Communication hub"})]}),(0,p.jsxs)(L,{onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)("div",{className:"icon",children:"\u2630"}),(0,p.jsx)("div",{className:"title",children:"Report"}),(0,p.jsx)("div",{className:"description",children:"Platform analytics"})]})]})]}),(0,p.jsxs)(o.tU,{children:[(0,p.jsx)(o.oz,{active:"overview"===s,onClick:()=>u("overview"),children:"Manager Overview"}),(0,p.jsx)(o.oz,{active:"performance"===s,onClick:()=>u("performance"),children:"Performance Analytics"}),(0,p.jsx)(o.oz,{active:"health"===s,onClick:()=>u("health"),children:"Account Health"}),(0,p.jsx)(o.oz,{active:"system"===s,onClick:()=>u("system"),children:"System Operations"})]}),"overview"===s&&(0,p.jsx)(I,{children:(0,p.jsxs)(_,{children:[(0,p.jsx)(Y,{children:(0,p.jsxs)(P,{children:[(0,p.jsx)(U,{children:"Manager Company"}),(0,p.jsx)(U,{children:"Plan"}),(0,p.jsx)(U,{children:"Status"}),(0,p.jsx)(U,{children:"Restaurants"}),(0,p.jsx)(U,{children:"Monthly Revenue"}),(0,p.jsx)(U,{children:"Health Score"}),(0,p.jsx)(U,{children:"Risk Level"})]})}),(0,p.jsx)(O,{children:q.map(e=>(0,p.jsxs)(P,{children:[(0,p.jsx)(Z,{children:(0,p.jsxs)(G,{children:[(0,p.jsx)("div",{className:"name",children:e.companyName}),(0,p.jsx)("div",{className:"email",children:e.email})]})}),(0,p.jsx)(Z,{children:(0,p.jsx)(X,{variant:e.planType,children:e.planType})}),(0,p.jsx)(Z,{children:(0,p.jsx)(X,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,p.jsx)(Z,{children:e.restaurantCount}),(0,p.jsx)(Z,{children:x(e.totalRevenueByCurrency)}),(0,p.jsx)(Z,{children:(0,p.jsxs)(W,{score:e.healthScore,children:[(0,p.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,p.jsx)("div",{className:"bar"})]})}),(0,p.jsx)(Z,{children:(0,p.jsx)(X,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===s&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights (",re,")"]}),(0,p.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,l.vv)(g(le.monthlyRevenue,re),re)]}),(0,p.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,l.vv)(g(le.yearlyRevenue,re),re)]}),(0,p.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(le.averageRevenuePerUser,t.currency)]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",le.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",le.activeSubscriptions]}),(0,p.jsxs)("p",{children:["\u2022 Open support tickets: ",le.supportTickets]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",le.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 This month activities: ",le.totalTransactions]}),(0,p.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,l.vv)(g(le.cumulativeRevenue,re),re)]})]})]})]}),"health"===s&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:"Health Score Distribution"}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",q.filter(e=>e.healthScore>=80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",q.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",q.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:"Risk Factors"}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,p.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,p.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,p.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===s&&(0,p.jsxs)(I,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,p.jsxs)("p",{children:["\u2022 Total invoices: ",V.length]}),(0,p.jsxs)("p",{children:["\u2022 Paid: ",V.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Pending: ",V.filter(e=>"pending_payment"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Overdue: ",V.filter(e=>"overdue"===e.status).length]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",le.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active users: ",le.activeUsers]}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",le.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",le.activeSubscriptions]})]})]})]})]})]})})}}}]);