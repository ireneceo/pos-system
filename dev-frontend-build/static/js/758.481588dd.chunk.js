"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[758],{758:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var r=n(9950),s=n(4492),i=n(4752),a=n(8409),o=n(1367),d=n(4021),l=n(6038),c=n(4414);const p=i.Ay.div`
  min-height: 100vh;
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
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
  align-items: stretch;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
`,y=i.Ay.div`
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
`,f=i.Ay.div`
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
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
`,j=i.Ay.div`
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

  &:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
`,b=i.Ay.div`
  flex: 1;
  min-width: 0;
`,A=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>{switch(e.type){case"error":return"#DC2626";case"warning":return"#D97706";case"success":return"#059669";case"info":return"#2563EB";default:return"#374151"}}};
`,w=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,k=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,E=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,B=i.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,C=i.Ay.div`
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F6F9FC;
    .icon { color: #0A2540; }
    .title { color: #0A2540; }
  }

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    color: #6B7C93;
    transition: color 0.2s;
    font-family: 'Lucida Console', 'Courier New', monospace;
  }

  .title {
    font-weight: 600;
    font-size: 16px;
    color: #0A2540;
    margin-bottom: 4px;
    transition: color 0.2s;
  }

  .description {
    font-size: 13px;
    color: #6B7280;
  }
`,R=i.Ay.div`
  h3 {
    background: white;
    padding: 20px 24px;
    margin: 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #E6EBF1;
    border-radius: 16px 16px 0 0;
  }
`,N=i.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,$=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=i.Ay.thead`
  background: #F8FAFC;
`,D=i.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=i.Ay.tbody``,_=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  cursor: pointer;
  &:hover { background: #F8FAFC; }
  &:last-child { border-bottom: none; }
`,O=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,T=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  ${e=>{switch(e.status){case"active":return"background: #D1FAE5; color: #065F46;";case"trial":return"background: #DBEAFE; color: #1E40AF;";case"expired":return"background: #FEE2E2; color: #991B1B;";case"suspended":return"background: #FEF3C7; color: #92400E;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,M=()=>{const e=(0,s.Zp)(),{user:t}=(0,o.As)(),[n,i]=(0,r.useState)([]),[M,q]=(0,r.useState)(!0),[G,X]=(0,r.useState)(""),{defaultCurrency:P}=(0,d.i1)(),[L,W]=(0,r.useState)("RM"),[Y,U]=(0,r.useState)([]),[Q,V]=(0,r.useState)({systemInquiry:0,operationInquiry:0,notices:0,invoices:0}),[Z,H]=(0,r.useState)({overdue:0,pending:0}),[J,K]=(0,r.useState)(0);(0,r.useEffect)(()=>{P&&W(P)},[P]);(0,r.useEffect)(()=>{t&&(async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const t=await fetch("/api/badge-counts",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&V(e.data)}}catch{}})()},[t]),(0,r.useEffect)(()=>{const e=[];Z.overdue>0&&e.push({type:"warning",title:"Overdue Invoices",message:`${Z.overdue} invoice(s) need attention`,link:"/pos/brand/invoices"}),Z.pending>0&&e.push({type:"info",title:"Pending Invoices",message:`${Z.pending} invoice(s) pending payment`,link:"/pos/brand/invoices"}),J>0&&e.push({type:"info",title:"No Orders Today",message:`${J} restaurant(s) with no orders today`,link:"/pos/manager/restaurants"}),Q.notices>0&&e.push({type:"info",title:"Unread Notices",message:`${Q.notices} unread notice(s)`,link:"/pos/brand/notices"}),Q.systemInquiry>0&&e.push({type:"info",title:"System Inquiry",message:`${Q.systemInquiry} inquiry(s) with new replies`,link:"/pos/brand/system-inquiry"}),0!==e.length||M||e.push({type:"success",title:"All Clear",message:"All systems running smoothly. No issues detected."}),e.length>0&&U(e)},[Q,Z,J,M]),(0,r.useEffect)(()=>{t&&(async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},t=await fetch("/api/brands",{headers:e});if(t.ok){const e=await t.json();e.length>0&&X(e[0].name||"")}const[n,r]=await Promise.all([fetch("/api/restaurants",{headers:e}),fetch("/api/invoices",{headers:e})]),s=r.ok?await r.json():{data:[]},a=s.data||s||[],o=a.filter(e=>"overdue"===e.status).length,d=a.filter(e=>"pending_payment"===e.status||"sent"===e.status).length;if(n.ok){const t=await n.json(),r=(new Date).toISOString().split("T")[0],s=await fetch("/api/orders",{headers:e}),a=s.ok?await s.json():[],l=a.data||a||[],c=t.map(e=>{const t=l.filter(t=>{var n,r;return(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===(r=e.id)||void 0===r?void 0:r.toString())}),n=t.filter(e=>{var t;return null===(t=e.order_date)||void 0===t?void 0:t.startsWith(r)}),s=n.reduce((e,t)=>e+parseFloat(t.total_amount||0),0),i=new Date;i.setDate(1);const a=i.toISOString().split("T")[0],o=t.filter(e=>e.order_date&&e.order_date>=a).reduce((e,t)=>e+parseFloat(t.total_amount||0),0);return{id:e.id,name:e.name,status:e.status||"active",address:e.address||"No address",cuisine:e.cuisine||"Various",planType:e.plan_type||e.planType||"Basic Plan",adminName:e.admin_name||e.managerName||"-",todayOrders:n.length,todayRevenue:s,monthlyRevenue:o}});i(c),H({overdue:o,pending:d}),K(c.filter(e=>0===e.todayOrders).length)}}catch(e){console.error("Error fetching brand manager data:",e)}finally{q(!1)}})()},[t]);const ee=n.length,te=n.filter(e=>"active"===e.status).length,ne=n.reduce((e,t)=>e+t.todayRevenue,0),re=n.reduce((e,t)=>e+t.todayOrders,0),se=n.reduce((e,t)=>e+t.monthlyRevenue,0),ie=ee>0?se/ee:0;return M?(0,c.jsxs)(p,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(x,{children:"Brand Manager Dashboard"})}),(0,c.jsx)(u,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]}):(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Brand Manager Dashboard"}),G&&(0,c.jsx)(g,{children:(0,c.jsx)("span",{children:G})})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(a.Ot,{children:[(0,c.jsxs)(a.XS,{color:"#DC2626",children:[(0,c.jsx)(a.h2,{children:"Total Restaurants"}),(0,c.jsx)(a.G$,{children:ee})]}),(0,c.jsxs)(a.XS,{color:"#059669",children:[(0,c.jsx)(a.h2,{children:"Active Restaurants"}),(0,c.jsx)(a.G$,{children:te})]}),(0,c.jsxs)(a.XS,{color:"#F59E0B",children:[(0,c.jsx)(a.h2,{children:"Today's Revenue"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(ne,L)})]}),(0,c.jsxs)(a.XS,{color:"#2563EB",children:[(0,c.jsx)(a.h2,{children:"Today's Orders"}),(0,c.jsx)(a.G$,{children:re})]}),(0,c.jsxs)(a.XS,{color:"#10B981",children:[(0,c.jsx)(a.h2,{children:"Monthly Revenue"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(se,L)})]}),(0,c.jsxs)(a.XS,{color:"#7C3AED",children:[(0,c.jsx)(a.h2,{children:"Avg Revenue / Store"}),(0,c.jsx)(a.G$,{children:(0,l.vv)(ie,L)})]})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)("h3",{children:"Brand Summary"}),(0,c.jsxs)(F,{children:[(0,c.jsx)(k,{children:"Monthly Revenue"}),(0,c.jsx)(E,{children:(0,l.vv)(se,L)})]}),(0,c.jsxs)(F,{children:[(0,c.jsx)(k,{children:"Avg Revenue / Store"}),(0,c.jsx)(E,{children:(0,l.vv)(ie,L)})]}),(0,c.jsxs)(F,{children:[(0,c.jsx)(k,{children:"Active Restaurants"}),(0,c.jsxs)(E,{children:[te," / ",ee]})]}),(0,c.jsxs)(F,{children:[(0,c.jsx)(k,{children:"Today's Total Orders"}),(0,c.jsx)(E,{children:re})]})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)("h3",{children:"Notifications"}),(0,c.jsx)(v,{children:Y.map((t,n)=>(0,c.jsx)(j,{type:t.type,onClick:()=>t.link&&e(t.link),children:(0,c.jsxs)(b,{children:[(0,c.jsx)(A,{type:t.type,children:t.title}),(0,c.jsx)(w,{children:t.message})]})},n))})]})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)("h3",{children:"Quick Actions"}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(C,{onClick:()=>e("/pos/manager/restaurants"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25d0"}),(0,c.jsx)("div",{className:"title",children:"Restaurants"}),(0,c.jsx)("div",{className:"description",children:"Restaurant management"})]}),(0,c.jsxs)(C,{onClick:()=>e("/pos/brand/invoices"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25a6"}),(0,c.jsx)("div",{className:"title",children:"Invoices"}),(0,c.jsx)("div",{className:"description",children:"Invoice management"})]}),(0,c.jsxs)(C,{onClick:()=>e("/pos/brand/general/reports"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25c9"}),(0,c.jsx)("div",{className:"title",children:"Reports"}),(0,c.jsx)("div",{className:"description",children:"Performance analytics"})]}),(0,c.jsxs)(C,{onClick:()=>e("/pos/manager/admins"),children:[(0,c.jsx)("div",{className:"icon",children:"\u25c6"}),(0,c.jsx)("div",{className:"title",children:"Restaurant Admins"}),(0,c.jsx)("div",{className:"description",children:"Admin management"})]})]})]}),(0,c.jsx)(R,{children:(0,c.jsx)("h3",{children:"Restaurant Performance"})}),(0,c.jsx)(N,{children:(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:(0,c.jsxs)(_,{children:[(0,c.jsx)(D,{children:"Restaurant"}),(0,c.jsx)(D,{children:"Admin"}),(0,c.jsx)(D,{children:"Status"}),(0,c.jsx)(D,{children:"Today's Orders"}),(0,c.jsx)(D,{children:"Today's Revenue"}),(0,c.jsx)(D,{children:"Monthly Revenue"})]})}),(0,c.jsx)(I,{children:n.length>0?n.map(t=>(0,c.jsxs)(_,{onClick:()=>e(`/pos/brand/general/reports?restaurantId=${t.id}&restaurantName=${encodeURIComponent(t.name)}`),children:[(0,c.jsx)(O,{style:{fontWeight:600,color:"#0A2540"},children:t.name}),(0,c.jsx)(O,{children:t.adminName}),(0,c.jsx)(O,{children:(0,c.jsx)(T,{status:t.status,children:t.status})}),(0,c.jsx)(O,{children:t.todayOrders}),(0,c.jsx)(O,{children:(0,l.vv)(t.todayRevenue,L)}),(0,c.jsx)(O,{style:{fontWeight:600},children:(0,l.vv)(t.monthlyRevenue,L)})]},t.id)):(0,c.jsx)(_,{children:(0,c.jsx)(O,{colSpan:6,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No restaurants registered yet"})})})]})})]})]})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),s=n(1367),i=n(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(i.DL)),[o,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";n(r)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:l}}}}]);