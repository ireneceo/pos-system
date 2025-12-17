"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>O});var t=n(9950),i=n(4492),o=n(4752),s=n(3310),d=n(7492),a=n(1367),l=n(4414);const c=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=o.Ay.div`
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
`,x=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,g=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=o.Ay.div`
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
`,y=o.Ay.div`
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
`,j=o.Ay.div`
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
`,v=o.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,f=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,b=o.Ay.thead`
  background: #F8FAFC;
`,A=o.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=o.Ay.tbody``,w=o.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,k=o.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,B=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,S=o.Ay.div`
  line-height: 1.6;
`,C=o.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,$=o.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,z=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,N=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,R=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,D=o.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,I=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,M=o.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,T=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`,L=o.Ay.div`
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
`,_=o.Ay.div`
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
`,O=()=>{const e=(0,i.Zp)(),{user:r}=(0,a.As)(),n=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[o,O]=(0,t.useState)(null),[P,G]=(0,t.useState)(!0),[U,X]=(0,t.useState)("week"),[W,K]=(0,t.useState)([]);if((0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void G(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void G(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void G(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),O(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{G(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${U}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();K(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,U]),P)return(0,l.jsx)(s.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(h,{children:"Restaurant Dashboard"})}),(0,l.jsx)(x,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!o)return(0,l.jsx)(s.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(h,{children:"Restaurant Dashboard"})}),(0,l.jsx)(x,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:q,today:H,monthly:Q,yearly:V,total:Y,billing:Z,recentOrders:J}=o;return(0,l.jsx)(s.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Restaurant Dashboard"}),(0,l.jsxs)(u,{children:[q.name," \u2022 ",q.planType]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(d.Ot,{children:[(0,l.jsxs)(d.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,l.jsx)(d.h2,{children:"Today's Sales"}),(0,l.jsxs)(d.G$,{children:["RM ",(H.revenue||0).toLocaleString()]})]}),(0,l.jsxs)(d.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,l.jsx)(d.h2,{children:"Today's Orders"}),(0,l.jsx)(d.G$,{children:H.orders||0})]}),(0,l.jsxs)(d.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,l.jsx)(d.h2,{children:"Monthly Revenue"}),(0,l.jsxs)(d.G$,{children:["RM ",(Q.revenue||0).toLocaleString()]})]}),(0,l.jsxs)(d.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,l.jsx)(d.h2,{children:"Monthly Orders"}),(0,l.jsx)(d.G$,{children:Q.orders||0})]}),(0,l.jsxs)(d.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,l.jsx)(d.h2,{children:"Annual Revenue"}),(0,l.jsxs)(d.G$,{children:["RM ",(V.revenue||0).toLocaleString()]})]}),(0,l.jsxs)(d.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,l.jsx)(d.h2,{children:"Annual Orders"}),(0,l.jsx)(d.G$,{children:V.orders||0})]}),(0,l.jsxs)(d.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,l.jsx)(d.h2,{children:"Total Revenue"}),(0,l.jsxs)(d.G$,{children:["RM ",(Y.revenue||0).toLocaleString()]})]}),(0,l.jsxs)(d.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,l.jsx)(d.h2,{children:"Total Orders"}),(0,l.jsx)(d.G$,{children:Y.orders||0})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,l.jsx)("h3",{children:"Sales & Orders Overview"}),(0,l.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,l.jsx)("button",{onClick:()=>X("week"),style:{padding:"6px 12px",background:"week"===U?"#635BFF":"transparent",color:"week"===U?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,l.jsx)("button",{onClick:()=>X("month"),style:{padding:"6px 12px",background:"month"===U?"#635BFF":"transparent",color:"month"===U?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,l.jsx)("button",{onClick:()=>X("year"),style:{padding:"6px 12px",background:"year"===U?"#635BFF":"transparent",color:"year"===U?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),W.length>0?(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:W.map((e,r)=>{const n=Math.max(...W.map(e=>e.revenue),1),t=new Date(e.date);return(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,l.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,l.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===U?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===U?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,l.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:e.revenue>0?`RM ${(e.revenue/1e3).toFixed(1)}K`:"RM 0"}),(0,l.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===U?"Last 7 days":"month"===U?"Last 12 weeks":"Last 12 months"}),(0,l.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=W.find(e=>e.revenue>0),r=W[W.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,l.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,l.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,l.jsxs)("p",{children:["Total Revenue: RM ",(Q.revenue/1e3).toFixed(0),"K"]}),(0,l.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)("h3",{children:"Notifications"}),(H.pendingOrders||0)>0&&(0,l.jsxs)(j,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,l.jsx)("div",{className:"title",children:"Pending Orders"}),(0,l.jsxs)("div",{className:"description",children:[H.pendingOrders||0," order(s) waiting to be processed"]})]}),(Z.unpaidInvoices||0)>0&&(0,l.jsxs)(j,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/invoices"),children:[(0,l.jsx)("div",{className:"title",children:"Unpaid Invoices"}),(0,l.jsxs)("div",{className:"description",children:[Z.unpaidInvoices||0," invoice(s) \u2022 RM ",(Z.totalUnpaidAmount||0).toLocaleString()," due"]})]}),(H.orders||0)>0&&(0,l.jsxs)(j,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,l.jsx)("div",{className:"title",children:"Today's Performance"}),(0,l.jsxs)("div",{className:"description",children:["RM ",(H.revenue||0).toLocaleString()," earned from ",H.orders||0," order(s)"]})]}),0===(H.pendingOrders||0)&&0===(Z.unpaidInvoices||0)&&0===(H.orders||0)&&(0,l.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,l.jsxs)(M,{children:[(0,l.jsx)("h3",{children:"Quick Actions"}),(0,l.jsxs)(T,{children:[(0,l.jsxs)(L,{onClick:()=>window.open(`/restaurant/${n}/pos-terminal`,"_blank"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25a6"}),(0,l.jsx)("div",{className:"title",children:"POS Terminal"}),(0,l.jsx)("div",{className:"description",children:"Process orders"})]}),(0,l.jsxs)(L,{onClick:()=>window.open(`/restaurant/${n}/kitchen`,"_blank"),children:[(0,l.jsx)("div",{className:"icon",children:"\u25d0"}),(0,l.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,l.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,l.jsxs)(L,{onClick:()=>e(`/restaurant/${n}/live-orders`),children:[(0,l.jsx)("div",{className:"icon",children:"\u25c9"}),(0,l.jsx)("div",{className:"title",children:"Live Orders"}),(0,l.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,l.jsxs)(L,{onClick:()=>e(`/restaurant/${n}/menu`),children:[(0,l.jsx)("div",{className:"icon",children:"\u2261"}),(0,l.jsx)("div",{className:"title",children:"Menu"}),(0,l.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,l.jsx)(_,{children:(0,l.jsx)("h3",{children:"Recent Orders"})}),(0,l.jsx)(v,{children:(0,l.jsxs)(f,{children:[(0,l.jsx)(b,{children:(0,l.jsxs)(w,{children:[(0,l.jsx)(A,{children:"Order"}),(0,l.jsx)(A,{children:"Items"}),(0,l.jsx)(A,{children:"Status"}),(0,l.jsx)(A,{children:"Time"}),(0,l.jsx)(A,{children:"Amount"})]})}),(0,l.jsx)(F,{children:0===J.length?(0,l.jsx)(w,{children:(0,l.jsx)(k,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):J.map(e=>(0,l.jsxs)(w,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(B,{children:e.order_number}),(0,l.jsxs)(E,{children:[e.customer_name||"Guest",(0,l.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,l.jsx)(k,{children:(0,l.jsx)(S,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,l.jsxs)(C,{children:[(0,l.jsxs)("div",{children:[(0,l.jsxs)($,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,l.jsx)(z,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,l.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,l.jsx)(k,{children:(0,l.jsx)(I,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,l.jsx)(k,{children:(0,l.jsx)(N,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,l.jsxs)(k,{children:[(0,l.jsxs)(R,{children:["RM ",parseFloat(e.total_amount||0).toFixed(2)]}),(0,l.jsx)(D,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":e.payment_method||"Cash"})]})]},e.id))})]})})]})]})})}}}]);