"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8309],{4021:(e,r,n)=>{n.d(r,{i1:()=>s});var t=n(9950),i=n(1367),o=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[r,n]=(0,t.useState)("RM"),[s,a]=(0,t.useState)(Object.keys(o.DL)),[d,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let i=t>=0?r[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";n(t)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:s,loading:d,error:c}}},8309:(e,r,n)=>{n.r(r),n.d(r,{default:()=>G});var t=n(9950),i=n(4492),o=n(4752),s=n(3310),a=n(7492),d=n(1367),l=n(4021),c=n(6038),p=n(4414);const h=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0 0 16px;
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,v=o.Ay.div`
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
`,j=o.Ay.div`
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
`,f=o.Ay.div`
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
`,b=o.Ay.div`
  background: white;
  border-radius: 0 0 16px 16px;
  border: 1px solid #E6EBF1;
  border-top: none;
  overflow: hidden;
`,A=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,w=o.Ay.thead`
  background: #F8FAFC;
`,F=o.Ay.th`
  padding: 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=o.Ay.tbody``,B=o.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,E=o.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`,C=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,$=o.Ay.div`
  line-height: 1.6;
`,z=o.Ay.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`,N=o.Ay.span`
  color: #6B7280;
  margin-right: 8px;
`,D=o.Ay.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`,I=o.Ay.div`
  color: #6B7280;
  font-size: 13px;
  line-height: 1.4;
`,_=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,R=o.Ay.div`
  color: ${e=>e.isPending?"#FF6B6B":"#6B7280"};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${e=>e.isPending?"500":"normal"};
`,T=o.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  ${e=>{switch(e.variant){case"awaiting_payment":return"background: #FEF3C7; color: #F59E0B;";case"pending":return"background: #FEF3C7; color: #92400E;";case"preparing":return"background: #DBEAFE; color: #1E40AF;";case"ready":case"served":return"background: #D1FAE5; color: #065F46;";case"completed":return"background: #E5E7EB; color: #374151;";case"cancelled":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,O=o.Ay.div`
  margin-bottom: 32px;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,M=o.Ay.div`
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
`,P=o.Ay.div`
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
`,G=()=>{const e=(0,i.Zp)(),{user:r}=(0,d.As)(),n=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id)||"",[o,G]=(0,t.useState)(null),[U,X]=(0,t.useState)(!0),[W,q]=(0,t.useState)("week"),[H,K]=(0,t.useState)([]),{defaultCurrency:Q}=(0,l.i1)(),[V,Y]=(0,t.useState)("RM");if((0,t.useEffect)(()=>{Q&&Y(Q)},[Q]),(0,t.useEffect)(()=>{r&&(async()=>{if(console.log("\ud83d\udd0d Fetching dashboard data from DATABASE for user:",r),console.log("\ud83d\udd0d User ID:",null===r||void 0===r?void 0:r.id),console.log("\ud83d\udd0d Restaurant ID:",null===r||void 0===r?void 0:r.restaurantId),null===r||void 0===r||!r.restaurantId)return console.log("\u274c No restaurant ID found for this user"),void X(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void X(!1);const n=await fetch(`/api/dashboard/restaurant/${r.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Dashboard API response status:",n.status),!n.ok){const e=await n.text();return console.error("\u274c API error:",n.status,e),void X(!1)}const t=await n.json();console.log("\u2705 Dashboard data from DB:",t);const i=t.data||t;console.log("\ud83d\udcca Today orders:",i.today.orders),console.log("\ud83d\udcca Today revenue:",i.today.revenue),console.log("\ud83d\udcca Monthly orders:",i.monthly.orders),console.log("\ud83d\udcca Monthly revenue:",i.monthly.revenue),console.log("\ud83d\udcca Recent orders:",i.recentOrders.length),G(i)}catch(e){console.error("\u274c Error fetching dashboard data:",e)}finally{X(!1)}})()},[r]),(0,t.useEffect)(()=>{r&&(async()=>{const e=(null===r||void 0===r?void 0:r.restaurantId)||(null===r||void 0===r?void 0:r.id);if(e)try{const r=localStorage.getItem("auth_token");if(!r)return void console.error("\u274c No auth token found for sales chart");const n=await fetch(`/api/dashboard/restaurant/${e}/sales-chart?period=${W}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();K(e.data||[])}else console.error("\u274c Sales chart API error:",n.status)}catch(n){console.error("\u274c Error fetching sales chart:",n)}})()},[r,W]),U)return(0,p.jsx)(s.A,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(g,{children:"Restaurant Dashboard"})}),(0,p.jsx)(u,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading dashboard..."})})]})});if(!o)return(0,p.jsx)(s.A,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(g,{children:"Restaurant Dashboard"})}),(0,p.jsx)(u,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No data available"})})]})});const{restaurant:Z,today:J,monthly:ee,yearly:re,total:ne,billing:te,recentOrders:ie}=o;return(0,p.jsx)(s.A,{children:(0,p.jsxs)(h,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:"Restaurant Dashboard"}),(0,p.jsxs)(m,{children:[Z.name," \u2022 ",Z.planType]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(a.Ot,{children:[(0,p.jsxs)(a.XS,{color:"#F59E0B",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,p.jsx)(a.h2,{children:"Today's Sales"}),(0,p.jsx)(a.G$,{children:(0,c.vv)(J.revenue||0,V)})]}),(0,p.jsxs)(a.XS,{color:"#2563EB",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,p.jsx)(a.h2,{children:"Today's Orders"}),(0,p.jsx)(a.G$,{children:J.orders||0})]}),(0,p.jsxs)(a.XS,{color:"#10B981",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,p.jsx)(a.h2,{children:"Monthly Revenue"}),(0,p.jsx)(a.G$,{children:(0,c.vv)(ee.revenue||0,V)})]}),(0,p.jsxs)(a.XS,{color:"#7C3AED",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,p.jsx)(a.h2,{children:"Monthly Orders"}),(0,p.jsx)(a.G$,{children:ee.orders||0})]}),(0,p.jsxs)(a.XS,{color:"#059669",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,p.jsx)(a.h2,{children:"Annual Revenue"}),(0,p.jsx)(a.G$,{children:(0,c.vv)(re.revenue||0,V)})]}),(0,p.jsxs)(a.XS,{color:"#6366F1",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,p.jsx)(a.h2,{children:"Annual Orders"}),(0,p.jsx)(a.G$,{children:re.orders||0})]}),(0,p.jsxs)(a.XS,{color:"#8B5CF6",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,p.jsx)(a.h2,{children:"Total Revenue"}),(0,p.jsx)(a.G$,{children:(0,c.vv)(ne.revenue||0,V)})]}),(0,p.jsxs)(a.XS,{color:"#EF4444",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,p.jsx)(a.h2,{children:"Total Orders"}),(0,p.jsx)(a.G$,{children:ne.orders||0})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:"Sales & Orders Overview"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,p.jsx)("button",{onClick:()=>q("week"),style:{padding:"6px 12px",background:"week"===W?"#635BFF":"transparent",color:"week"===W?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Week"}),(0,p.jsx)("button",{onClick:()=>q("month"),style:{padding:"6px 12px",background:"month"===W?"#635BFF":"transparent",color:"month"===W?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Month"}),(0,p.jsx)("button",{onClick:()=>q("year"),style:{padding:"6px 12px",background:"year"===W?"#635BFF":"transparent",color:"year"===W?"white":"#6B7280",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Year"})]})]}),H.length>0?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"end",height:"120px",gap:"8px",marginBottom:"16px"},children:H.map((e,r)=>{const n=Math.max(...H.map(e=>e.revenue),1),t=new Date(e.date);return(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",flex:1},children:[(0,p.jsx)("div",{style:{width:"100%",maxWidth:"40px",height:`${Math.max(20,e.revenue/n*80)}px`,background:0===e.revenue?"#E5E7EB":"#635BFF",borderRadius:"4px 4px 0 0",marginBottom:"8px",cursor:"pointer",transition:"opacity 0.2s"},title:`${t.toLocaleDateString()}: RM ${e.revenue.toLocaleString()}`,onMouseEnter:e=>e.currentTarget.style.opacity="0.8",onMouseLeave:e=>e.currentTarget.style.opacity="1"}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",textAlign:"center"},children:"week"===W?t.toLocaleDateString("en-US",{month:"short",day:"numeric"}):"month"===W?`Week ${r+1}`:t.toLocaleDateString("en-US",{month:"short",year:"2-digit"})}),(0,p.jsx)("div",{style:{fontSize:"10px",color:"#6B7280",textAlign:"center"},children:(0,c.vv)(e.revenue,V)}),(0,p.jsxs)("div",{style:{fontSize:"9px",color:"#9CA3AF",textAlign:"center"},children:[e.orders||0," ord"]})]},e.date)})}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"12px",borderTop:"1px solid #E5E7EB"},children:[(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"week"===W?"Last 7 days":"month"===W?"Last 12 weeks":"Last 12 months"}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#059669"},children:(()=>{const e=H.find(e=>e.revenue>0),r=H[H.length-1];if(e&&r&&e.revenue>0){const n=(r.revenue-e.revenue)/e.revenue*100;return n>0?`\u2197 +${n.toFixed(1)}%`:n<0?`\u2198 ${n.toFixed(1)}%`:"\u2192 0%"}return"\u2192 No change"})()})]})]}):(0,p.jsx)("div",{style:{padding:"20px",background:"#F8FAFC",borderRadius:"12px",minHeight:"160px"},children:(0,p.jsxs)("div",{style:{textAlign:"center",paddingTop:"40px",color:"#6B7280"},children:[(0,p.jsxs)("p",{children:["Total Revenue: ",(0,c.vv)(ee.revenue,V)]}),(0,p.jsx)("p",{children:"Loading chart data..."})]})})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)("h3",{children:"Notifications"}),(J.pendingOrders||0)>0&&(0,p.jsxs)(f,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/live-orders"),children:[(0,p.jsx)("div",{className:"title",children:"Pending Orders"}),(0,p.jsxs)("div",{className:"description",children:[J.pendingOrders||0," order(s) waiting to be processed"]})]}),(te.unpaidInvoices||0)>0&&(0,p.jsxs)(f,{type:"warning",style:{cursor:"pointer"},onClick:()=>e("/pos/invoices"),children:[(0,p.jsx)("div",{className:"title",children:"Unpaid Invoices"}),(0,p.jsxs)("div",{className:"description",children:[te.unpaidInvoices||0," invoice(s) \u2022 ",(0,c.vv)(te.totalUnpaidAmount||0,V)," due"]})]}),(J.orders||0)>0&&(0,p.jsxs)(f,{type:"info",style:{cursor:"pointer"},onClick:()=>e("/pos/sales"),children:[(0,p.jsx)("div",{className:"title",children:"Today's Performance"}),(0,p.jsxs)("div",{className:"description",children:[(0,c.vv)(J.revenue||0,V)," earned from ",J.orders||0," order(s)"]})]}),0===(J.pendingOrders||0)&&0===(te.unpaidInvoices||0)&&0===(J.orders||0)&&(0,p.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"No new activities today. All systems running smoothly."})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("h3",{children:"Quick Actions"}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(L,{onClick:()=>window.open(`/restaurant/${n}/pos-terminal`,"_blank"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25a6"}),(0,p.jsx)("div",{className:"title",children:"POS Terminal"}),(0,p.jsx)("div",{className:"description",children:"Process orders"})]}),(0,p.jsxs)(L,{onClick:()=>window.open(`/restaurant/${n}/kitchen`,"_blank"),children:[(0,p.jsx)("div",{className:"icon",children:"\u25d0"}),(0,p.jsx)("div",{className:"title",children:"Kitchen Display"}),(0,p.jsx)("div",{className:"description",children:"View kitchen orders"})]}),(0,p.jsxs)(L,{onClick:()=>e(`/restaurant/${n}/live-orders`),children:[(0,p.jsx)("div",{className:"icon",children:"\u25c9"}),(0,p.jsx)("div",{className:"title",children:"Live Orders"}),(0,p.jsx)("div",{className:"description",children:"Monitor all orders"})]}),(0,p.jsxs)(L,{onClick:()=>e(`/restaurant/${n}/menu`),children:[(0,p.jsx)("div",{className:"icon",children:"\u2261"}),(0,p.jsx)("div",{className:"title",children:"Menu"}),(0,p.jsx)("div",{className:"description",children:"Edit menu items"})]})]})]}),(0,p.jsx)(P,{children:(0,p.jsx)("h3",{children:"Recent Orders"})}),(0,p.jsx)(b,{children:(0,p.jsxs)(A,{children:[(0,p.jsx)(w,{children:(0,p.jsxs)(B,{children:[(0,p.jsx)(F,{children:"Order"}),(0,p.jsx)(F,{children:"Items"}),(0,p.jsx)(F,{children:"Status"}),(0,p.jsx)(F,{children:"Time"}),(0,p.jsx)(F,{children:"Amount"})]})}),(0,p.jsx)(k,{children:0===ie.length?(0,p.jsx)(B,{children:(0,p.jsx)(E,{colSpan:5,style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No recent orders"})}):ie.map(e=>(0,p.jsxs)(B,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:e.order_number}),(0,p.jsxs)(S,{children:[e.customer_name||"Guest",(0,p.jsx)("br",{}),e.customer_phone||"N/A",e.table_number&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("br",{}),"Table: ",e.table_number]})]})]}),(0,p.jsx)(E,{children:(0,p.jsx)($,{children:(()=>{const r=e.items||e.order_items||[];return Array.isArray(r)&&0!==r.length?r.map((e,r)=>e?(0,p.jsxs)(z,{children:[(0,p.jsxs)("div",{children:[(0,p.jsxs)(N,{children:[e.quantity||1,"x"]}),e.name||e.menu_item_name||"Unknown Item"]}),e.options&&e.options.length>0&&(0,p.jsx)(D,{children:Array.isArray(e.options)?e.options.join(", "):e.options})]},r):null):(0,p.jsx)("span",{style:{color:"#6B7280",fontSize:"13px"},children:"No items"})})()})}),(0,p.jsx)(E,{children:(0,p.jsx)(T,{variant:e.status,children:(()=>{switch(e.status){case"awaiting_payment":return"Outstanding";case"pending":return"Pending";case"preparing":return"Preparing";case"ready":return"Ready";case"served":return"Served";case"completed":return"Completed";case"cancelled":return"Cancelled";default:return e.status.charAt(0).toUpperCase()+e.status.slice(1)}})()})}),(0,p.jsx)(E,{children:(0,p.jsx)(I,{children:new Date(e.order_date).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})})}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:(0,c.vv)(parseFloat(e.total_amount||0),V)}),(0,p.jsx)(R,{isPending:"pending"===e.payment_status,children:"pending"===e.payment_status?"Pending":e.payment_method||"Cash"})]})]},e.id))})]})})]})]})})}}}]);