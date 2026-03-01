"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3201],{2597:(e,t,r)=>{r.d(t,{Ex:()=>d,oz:()=>l,tU:()=>c});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,s=n.Ay.button`
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
`,c=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(s,{active:t,onClick:r,className:a,children:n})},d=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(o,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[s,o]=(0,n.useState)(a());return[s,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},3201:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var n=r(9950),i=r(4492),a=r(4752),s=r(8409),o=r(2597),c=r(2653),l=r(6038),d=r(9018),p=r(4414);const u=e=>"MYR"===e||"RM"===e?"RM":e,h=e=>{const t={};return Object.entries(e).forEach(e=>{let[r,n]=e;const i=u(r);t[i]=(t[i]||0)+n}),t},x=e=>{const t=h(e),r=Object.entries(t).filter(e=>{let[,t]=e;return t>0});return 0===r.length?(0,l.vv)(0,"RM"):r.map(e=>{let[t,r]=e;return(0,l.vv)(r,t)}).join(" / ")},g=(e,t)=>h(e)[t]||0,m=(e,t)=>({lines:[{currency:t,amount:h(e)[t]||0}],single:!0}),y=e=>{const t=(new Date).toLocaleDateString("en-CA",{timeZone:e}),[r,n,i]=t.split("-").map(Number);return{year:r,month:n-1,day:i}},v=(e,t)=>{const r=new Date(e);if(isNaN(r.getTime()))return{year:0,month:-1,day:0};const n=r.toLocaleDateString("en-CA",{timeZone:t}),[i,a,s]=n.split("-").map(Number);return{year:i,month:a-1,day:s}},f=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`,j=a.Ay.button`
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
`,b=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,w=a.Ay.div`
  font-size: ${e=>e.fontSize||"14px"};
  font-weight: 700;
  color: inherit;
  line-height: 1.3;
  white-space: nowrap;
`,F=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,k=a.Ay.div`
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
`,C=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,A=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,S=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,B=a.Ay.div`
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
`,E=a.Ay.div`
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
`,R=a.Ay.div`
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
`,D=a.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,M=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,$=a.Ay.thead`
  background: #F8FAFC;
`,T=a.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,z=a.Ay.tbody``,N=a.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,L=a.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,I=a.Ay.div`
  .name {
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 4px;
  }

  .email {
    font-size: 13px;
    color: #6B7280;
  }
`,_=a.Ay.div`
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
`,U=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"enterprise":return"background: #EDE9FE; color: #5B21B6;";case"professional":return"background: #DBEAFE; color: #1E40AF;";case"basic":default:return"background: #F3F4F6; color: #6B7280;";case"active":case"low":return"background: #ECFDF5; color: #059669;";case"trial":case"medium":return"background: #FEF3C7; color: #D97706;";case"expired":case"high":return"background: #FEE2E2; color: #DC2626;"}}}
`,Y=()=>{const e=(0,i.Zp)(),{operationSettings:t,siteTimezone:r}=(0,d.Pj)(),[a,h]=(0,c.M)("overview"),[Y,O]=(0,n.useState)([]),[P,Z]=(0,n.useState)([]),[G,W]=(0,n.useState)([]),[X,q]=(0,n.useState)("month"),[H,K]=(0,n.useState)(""),[V,Q]=(0,n.useState)([]),[J,ee]=(0,n.useState)({criticalCount:0,errorCount:0,total:0}),te=(0,n.useMemo)(()=>{try{return(new Date).toLocaleDateString("en-CA",{timeZone:r||"Asia/Kuala_Lumpur"})}catch{return(new Date).toISOString().split("T")[0]}},[r]),[re,ne]=(0,n.useState)({totalManagers:0,activeSubscriptions:0,totalRestaurants:0,monthlyRevenue:{},yearlyRevenue:{},cumulativeRevenue:{},averageRevenuePerUser:0,churnRate:0,growthRate:0,customerLifetimeValue:0,supportTickets:0,systemUptime:99.9,activeUsers:0,totalTransactions:0});return(0,n.useEffect)(()=>{(async()=>{try{const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},i=await fetch("/api/users?role=Manager",{headers:n});if(!i.ok)throw new Error("Failed to fetch users");const a=await i.json(),s=a.data||a,o=await fetch("/api/restaurants",{headers:n});if(!o.ok)throw new Error("Failed to fetch restaurants");const c=await o.json(),l=c.data||c;let d=[];l&&l.length>0&&(d=l.map(e=>{let t="active";return"active"===e.status?t="active":"inactive"===e.status&&(t="suspended"),{status:t,restaurantId:e.id,restaurantName:e.name}}));let p=[];try{const e=await fetch("/api/currencies/supported",{headers:n});if(e.ok){const t=await e.json();p=(t.data||t||[]).map(e=>u("string"===typeof e?e:e.code))}}catch(e){console.error("Error fetching supported currencies:",e)}0===p.length&&(p=["RM"]),p=[...new Set(p)],Q(p);try{const e=await fetch("/api/system-logs/alerts-summary",{headers:n});if(e.ok){const t=await e.json();t.success&&ee(t.data)}}catch(e){console.error("Error fetching system log alerts:",e)}const h=await fetch("/api/invoices",{headers:n});let x=[],g=[],m=0;if(h.ok){const e=await h.json();if(x=e.data||e,W(x),!H){const e=((e,t)=>{const r={};e.forEach(e=>{if("draft"!==e.status&&"cancelled"!==e.status){const t=u(e.currency||"MYR");r[t]=(r[t]||0)+1}});let n=t[0]||"RM",i=0;return t.forEach(e=>{(r[e]||0)>i&&(i=r[e]||0,n=e)}),n})(x,p);K(e)}const t=x.filter(e=>"completed"===e.status||"paid"===e.status),r={};t.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||0),n=e.currency||"MYR";r[n]=(r[n]||0)+t}),m=t.reduce((e,t)=>e+parseFloat(t.total||t.total_amount||t.amount||0),0);const n=new Map,i=new Date;let a=[];if("week"===X)for(let s=6;s>=0;s--){const e=new Date(i);e.setDate(i.getDate()-s),a.push(e.toISOString().split("T")[0])}else if("month"===X)for(let s=11;s>=0;s--){const e=new Date(i);e.setDate(i.getDate()-7*s);const t=new Date(e);t.setDate(e.getDate()-e.getDay()),a.push(`W${Math.floor(s/4)+1}-${t.getMonth()+1}/${t.getDate()}`)}else if("quarter"===X)for(let s=5;s>=0;s--){const e=new Date(i);e.setMonth(i.getMonth()-s),a.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}else for(let s=11;s>=0;s--){const e=new Date(i);e.setMonth(i.getMonth()-s),a.push(`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}`)}a.forEach(e=>{n.set(e,{revenue:0,revenueByCurrency:{},count:0})}),x.forEach(e=>{const t=new Date(e.issueDate||e.createdAt||e.created_at);let r="";if("week"===X)r=t.toISOString().split("T")[0];else if("month"===X){const e=new Date(t);e.setDate(t.getDate()-t.getDay());const n=Math.floor((i.getTime()-e.getTime())/6048e5);n<12&&(r=`W${Math.floor(n/4)+1}-${e.getMonth()+1}/${e.getDate()}`)}else r=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}`;if(r&&n.has(r)){const t=parseFloat(e.total_amount||e.amount||e.total||0),i=e.currency||"MYR",a=n.get(r),s={...a.revenueByCurrency};s[i]=(s[i]||0)+t,n.set(r,{revenue:a.revenue+t,revenueByCurrency:s,count:a.count+1})}}),g=Array.from(n.entries()).map(e=>{let[t,r]=e;return{period:t,revenue:r.revenue,revenueByCurrency:r.revenueByCurrency,invoiceCount:r.count}}).sort((e,t)=>"year"===X?parseInt(e.period)-parseInt(t.period):e.period.localeCompare(t.period))}let f=0;try{const e=await fetch("/api/support-tickets",{headers:n});if(e.ok){const t=await e.json();f=(t.data||t||[]).length}}catch(t){console.error("Error fetching support tickets:",t),f=0}Z(g);const j=(s||[]).map(e=>{const t=(l||[]).filter(t=>t.managerId===e.id.toString()||t.admin_id===parseInt(e.id)||parseInt(t.managerId)===e.id||t.managerId===e.id),r=t.map(e=>e.id),n=x.filter(e=>r.includes(e.restaurant_id||e.restaurantId)),i=n.filter(e=>"paid"===e.status||"completed"===e.status),a=i.reduce((e,t)=>e+parseFloat(t.total_amount||t.amount||t.total||"0"),0),s={};i.forEach(e=>{const t=parseFloat(e.total_amount||e.amount||e.total||"0"),r=e.currency||"MYR";s[r]=(s[r]||0)+t});const o=t.length>0?"active":"trial",c=n.filter(e=>"overdue"===e.status),d=0===n.length?70:Math.max(0,Math.min(100,Math.round(100-c.length/Math.max(n.length,1)*100))),p=d>=80?"low":d>=60?"medium":"high";return{id:`mgr-${e.id}`,companyName:e.full_name||e.username||"Manager Company",email:e.email,planType:t.length>5?"enterprise":t.length>2?"professional":"basic",subscriptionStatus:o,restaurantCount:t.length,totalRevenue:a,totalRevenueByCurrency:s,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],healthScore:d,riskLevel:p}});O(j);const b=j.length,w=d.filter(e=>"active"===e.status).length,F=(null===l||void 0===l?void 0:l.length)||j.reduce((e,t)=>e+t.restaurantCount,0),k=r||"Asia/Kuala_Lumpur",{year:C,month:A}=y(k),S=x.filter(e=>"completed"===e.status||"paid"===e.status),B=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r,month:n}=v(t,k);return n===A&&r===C}),E={};B.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";E[r]=(E[r]||0)+t});const R=S.filter(e=>{const t=e.issueDate||e.issued_at||e.createdAt,{year:r}=v(t,k);return r===C}),D={};R.forEach(e=>{const t=parseFloat(e.total||e.total_amount||e.amount||"0"),r=e.currency||"MYR";D[r]=(D[r]||0)+t});const M=cumulativeRevenueByCurrency,$=Object.values(E).reduce((e,t)=>e+t,0),T=b>0?$/b:0,z=d.length,N=z>0?d.filter(e=>"cancelled"===e.status).length/z*100:0,L=b>0?100*(F/b-1):0,I=12*T,_=w,{year:U,month:Y}=y(k),P=j.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===Y&&t===U}).length,G=l.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===Y&&t===U}).length,q=x.filter(e=>{if(!e.createdAt)return!1;const{year:t,month:r}=v(e.createdAt,k);return r===Y&&t===U}).length;ne({totalManagers:b,activeSubscriptions:w,totalRestaurants:F,monthlyRevenue:E,yearlyRevenue:D,cumulativeRevenue:M,averageRevenuePerUser:T,churnRate:N,growthRate:L,customerLifetimeValue:I,supportTickets:f,systemUptime:99.9,activeUsers:_,totalTransactions:P+G+q})}catch(t){console.error("Error fetching dashboard data:",t)}})()},[X,r]),(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:(0,p.jsx)(A,{children:"Admin Dashboard"})}),(0,p.jsxs)(C,{children:[V.length>0&&(0,p.jsxs)(f,{children:[(0,p.jsx)("span",{style:{fontSize:"13px",color:"#6B7C93",fontWeight:500,marginRight:"4px"},children:"Currency:"}),V.map(e=>(0,p.jsx)(j,{active:H===e,onClick:()=>K(e),children:e},e))]}),(0,p.jsxs)(s.Ot,{children:[(0,p.jsxs)(s.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:"Monthly Revenue"}),(0,p.jsx)(s.G$,{children:(()=>{const e=m(re.monthlyRevenue,H);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:"This Year Revenue"}),(0,p.jsx)(s.G$,{children:(()=>{const e=m(re.yearlyRevenue,H);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)(s.h2,{children:"Cumulative Revenue"}),(0,p.jsx)(s.G$,{children:(()=>{const e=m(re.cumulativeRevenue,H);return e.single?(0,l.vv)(e.lines[0].amount,e.lines[0].currency):(0,p.jsx)(b,{children:e.lines.map(t=>(0,p.jsx)(w,{fontSize:e.lines.length>2?"14px":"16px",children:(0,l.vv)(t.amount,t.currency)},t.currency))})})()})]}),(0,p.jsxs)(s.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,p.jsx)(s.h2,{children:"Total Managers"}),(0,p.jsx)(s.G$,{children:re.totalManagers})]}),(0,p.jsxs)(s.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/subscriptions"),children:[(0,p.jsx)(s.h2,{children:"Active Subscriptions"}),(0,p.jsx)(s.G$,{children:re.activeSubscriptions})]}),(0,p.jsxs)(s.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/restaurants"),children:[(0,p.jsx)(s.h2,{children:"Total Restaurants"}),(0,p.jsx)(s.G$,{children:re.totalRestaurants})]}),(0,p.jsxs)(s.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,p.jsx)(s.h2,{children:"Support Tickets"}),(0,p.jsx)(s.G$,{children:re.supportTickets})]}),(0,p.jsxs)(s.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,p.jsx)(s.h2,{children:"Active Users"}),(0,p.jsx)(s.G$,{children:re.activeUsers})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:"Revenue & Growth Analytics"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>q("week"),style:{padding:"6px 12px",background:"week"===X?"#635BFF":"transparent",color:"week"===X?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,p.jsx)("button",{onClick:()=>q("month"),style:{padding:"6px 12px",background:"month"===X?"#635BFF":"transparent",color:"month"===X?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,p.jsx)("button",{onClick:()=>q("quarter"),style:{padding:"6px 12px",background:"quarter"===X?"#635BFF":"transparent",color:"quarter"===X?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Quarter"}),(0,p.jsx)("button",{onClick:()=>q("year"),style:{padding:"6px 12px",background:"year"===X?"#635BFF":"transparent",color:"year"===X?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),(0,p.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:P.length>0?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:P.map(e=>{const t=g(e.revenueByCurrency,H),r=Math.max(...P.map(e=>g(e.revenueByCurrency,H)));return(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,p.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${r>0?Math.max(4,t/r*80):4}px`,background:t>0?"#635BFF":"#E5E7EB",borderRadius:"4px 4px 0 0",marginBottom:"8px"},title:`${e.period}: ${(0,l.vv)(t,H)}`}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===X?new Date(e.period).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===X?e.period.replace("W1-","").replace("W2-","").replace("W3-","").replace("W4-",""):new Date(e.period+"-01").toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,p.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:t>0?(0,l.vv)(t,H):"-"}),(0,p.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.invoiceCount||0," inv"]})]},e.period)})}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["week"===X?"Last 7 days":"month"===X?"Last 12 weeks":"quarter"===X?"Last 6 months":"Last 12 months",(0,p.jsxs)("span",{style:{marginLeft:"8px",color:"#635BFF",fontWeight:600},children:["(",H,")"]})]}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=e=>g(e.revenueByCurrency,H),t=P.find(t=>e(t)>0),r=P[P.length-1];if(t&&r&&e(t)>0){const n=(e(r)-e(t))/e(t)*100;return n>0?`+${n.toFixed(1)}%`:n<0?`${n.toFixed(1)}%`:"0%"}return"No change"})()})]})]}):(0,p.jsxs)("div",{style:{textAlign:"center",color:"#6B7280",paddingTop:"40px"},children:[(0,p.jsxs)("p",{children:["Total Revenue: ",x(re.monthlyRevenue)]}),(0,p.jsxs)("p",{children:["Growth Rate: +",re.growthRate.toFixed(1),"% YoY"]}),(0,p.jsx)("p",{children:"Invoice data loading..."})]})})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)("h3",{children:"System Alerts"}),J.total>0&&(0,p.jsxs)(R,{type:J.criticalCount>0?"error":"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/logs"),children:[(0,p.jsx)("div",{className:"title",children:J.criticalCount>0?"Critical System Alerts":"System Error Alerts"}),(0,p.jsxs)("div",{className:"description",children:[J.criticalCount>0&&`${J.criticalCount} critical`,J.criticalCount>0&&J.errorCount>0&&", ",J.errorCount>0&&`${J.errorCount} error`," ","log(s) in the last 24 hours - Click to investigate"]})]}),Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length>0&&(0,p.jsxs)(R,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/managers"),children:[(0,p.jsx)("div",{className:"title",children:"New Manager Registration"}),(0,p.jsxs)("div",{className:"description",children:[Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length," new manager(s) registered today - Click to view"]})]}),re.supportTickets>0&&(0,p.jsxs)(R,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/support"),children:[(0,p.jsx)("div",{className:"title",children:"Support Tickets Pending"}),(0,p.jsxs)("div",{className:"description",children:[re.supportTickets," open support ticket(s) require attention - Click to view"]})]}),G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length>0&&(0,p.jsxs)(R,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/admin/report"),children:[(0,p.jsx)("div",{className:"title",children:"New Revenue Generated"}),(0,p.jsxs)("div",{className:"description",children:[(()=>{const e=G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}),t={};return e.forEach(e=>{const r=parseFloat(e.total_amount||e.amount||0),n=e.currency||"MYR";t[n]=(t[n]||0)+r}),x(t)})()," ","earned today from ",G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length," transaction(s) - Click to view details"]})]}),0===J.total&&0===Y.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length&&0===re.supportTickets&&0===G.filter(e=>{try{return new Date(e.createdAt).toLocaleDateString("en-CA",{timeZone:r})===te}catch{return!1}}).length&&(0,p.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,p.jsxs)(o.tU,{children:[(0,p.jsx)(o.oz,{active:"overview"===a,onClick:()=>h("overview"),children:"Manager Overview"}),(0,p.jsx)(o.oz,{active:"performance"===a,onClick:()=>h("performance"),children:"Performance Analytics"}),(0,p.jsx)(o.oz,{active:"health"===a,onClick:()=>h("health"),children:"Account Health"}),(0,p.jsx)(o.oz,{active:"system"===a,onClick:()=>h("system"),children:"System Operations"})]}),"overview"===a&&(0,p.jsx)(D,{children:(0,p.jsxs)(M,{children:[(0,p.jsx)($,{children:(0,p.jsxs)(N,{children:[(0,p.jsx)(T,{children:"Manager Company"}),(0,p.jsx)(T,{children:"Plan"}),(0,p.jsx)(T,{children:"Status"}),(0,p.jsx)(T,{children:"Restaurants"}),(0,p.jsx)(T,{children:"Monthly Revenue"}),(0,p.jsx)(T,{children:"Health Score"}),(0,p.jsx)(T,{children:"Risk Level"})]})}),(0,p.jsx)(z,{children:Y.map(e=>(0,p.jsxs)(N,{children:[(0,p.jsx)(L,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)("div",{className:"name",children:e.companyName}),(0,p.jsx)("div",{className:"email",children:e.email})]})}),(0,p.jsx)(L,{children:(0,p.jsx)(U,{variant:e.planType,children:e.planType})}),(0,p.jsx)(L,{children:(0,p.jsx)(U,{variant:e.subscriptionStatus,children:e.subscriptionStatus})}),(0,p.jsx)(L,{children:e.restaurantCount}),(0,p.jsx)(L,{children:x(e.totalRevenueByCurrency)}),(0,p.jsx)(L,{children:(0,p.jsxs)(_,{score:e.healthScore,children:[(0,p.jsxs)("span",{className:"score",children:[e.healthScore,"%"]}),(0,p.jsx)("div",{className:"bar"})]})}),(0,p.jsx)(L,{children:(0,p.jsx)(U,{variant:e.riskLevel,children:e.riskLevel})})]},e.id))})]})}),"performance"===a&&(0,p.jsxs)(D,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Performance Analytics"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("h4",{style:{color:"#059669",marginBottom:"10px"},children:["Revenue Insights (",H,")"]}),(0,p.jsxs)("p",{children:["\u2022 Monthly revenue: ",(0,l.vv)(g(re.monthlyRevenue,H),H)]}),(0,p.jsxs)("p",{children:["\u2022 Yearly revenue: ",(0,l.vv)(g(re.yearlyRevenue,H),H)]}),(0,p.jsxs)("p",{children:["\u2022 ARPU: ",(0,l.vv)(re.averageRevenuePerUser,t.currency)]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB",marginBottom:"10px"},children:"Business Overview"}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",re.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",re.activeSubscriptions]}),(0,p.jsxs)("p",{children:["\u2022 Open support tickets: ",re.supportTickets]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#7C3AED",marginBottom:"10px"},children:"Restaurant Metrics"}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",re.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 This month activities: ",re.totalTransactions]}),(0,p.jsxs)("p",{children:["\u2022 Cumulative revenue: ",(0,l.vv)(g(re.cumulativeRevenue,H),H)]})]})]})]}),"health"===a&&(0,p.jsxs)(D,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"Account Health Monitoring"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:"Health Score Distribution"}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsxs)("p",{children:["\ud83d\udfe2 Healthy (80-100): ",Y.filter(e=>e.healthScore>=80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udfe1 At Risk (60-79): ",Y.filter(e=>e.healthScore>=60&&e.healthScore<80).length," accounts"]}),(0,p.jsxs)("p",{children:["\ud83d\udd34 Critical (<60): ",Y.filter(e=>e.healthScore<60).length," accounts"]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{children:"Risk Factors"}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("p",{children:"\u2022 Payment delays: Monitor automated"}),(0,p.jsx)("p",{children:"\u2022 Usage decline: Real-time alerts"}),(0,p.jsx)("p",{children:"\u2022 Support escalations: Tracked"}),(0,p.jsx)("p",{children:"\u2022 Contract renewals: 45-day alerts"})]})]})]})]}),"system"===a&&(0,p.jsxs)(D,{style:{padding:"32px"},children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540"},children:"System Operations"}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",gap:"20px"},children:[(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#059669"},children:"Invoice Summary"}),(0,p.jsxs)("p",{children:["\u2022 Total invoices: ",G.length]}),(0,p.jsxs)("p",{children:["\u2022 Paid: ",G.filter(e=>"paid"===e.status||"completed"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Pending: ",G.filter(e=>"pending_payment"===e.status).length]}),(0,p.jsxs)("p",{children:["\u2022 Overdue: ",G.filter(e=>"overdue"===e.status).length]})]}),(0,p.jsxs)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px"},children:[(0,p.jsx)("h4",{style:{color:"#2563EB"},children:"User Activity"}),(0,p.jsxs)("p",{children:["\u2022 Total managers: ",re.totalManagers]}),(0,p.jsxs)("p",{children:["\u2022 Active users: ",re.activeUsers]}),(0,p.jsxs)("p",{children:["\u2022 Total restaurants: ",re.totalRestaurants]}),(0,p.jsxs)("p",{children:["\u2022 Active subscriptions: ",re.activeSubscriptions]})]})]})]})]})]})})}}}]);