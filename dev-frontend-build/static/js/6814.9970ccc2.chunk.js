"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var i=r(9950),n=r(4752),s=r(3422),o=r(1367),a=r(8930),d=r(8012),l=r(8406),c=r(4414);const p=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),i=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},n=i(t),s=i(r);return n.period===s.period?`${n.time} - ${s.time} ${s.period}`:`${n.time} ${n.period} - ${s.time} ${s.period}`},u=n.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
  color: #0A2540;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,m=n.Ay.div`
  display: flex;
  gap: 30px;
  align-items: center;
`,h=n.Ay.div`
  font-size: 20px;
  font-weight: 500;
  color: #6B7C93;
`,g=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,x=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.connected?"#059669":"#DC2626"};
  animation: ${e=>e.connected?"pulse 2s infinite":"none"};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: calc(100vh - 180px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 16px;
  }
`,f=n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,j=n.Ay.div`
  padding: 20px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF4E6";case"preparing":return"#EFF6FF";case"ready":case"served":return"#ECFDF5";default:return"#F6F9FC"}}};
  border-bottom: 2px solid ${e=>{switch(e.status){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":case"served":return"#10B981";default:return"#E6EBF1"}}};
`,b=n.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #0A2540;
`,v=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,A=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,F=n.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`,w=n.Ay.div`
  background: #FAFBFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.15s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #C7D2FE;
  }
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,_=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 8px;
`,E=n.Ay.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`,T=n.Ay.div`
  text-align: right;
`,$=n.Ay.div`
  font-size: 11px;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,D=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#0A2540"};
  margin-top: 2px;
`,C=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6B7C93;
`,N=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,I=n.Ay.div`
  margin-bottom: 16px;
`,S=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F6F9FC;

  &:last-child {
    border-bottom: none;
  }
`,B=n.Ay.div`
  flex: 1;
`,P=n.Ay.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,z=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,K=n.Ay.div`
  margin-left: 16px;
  margin-top: 8px;
  border-left: 2px solid #667eea;
  padding-left: 12px;
`,q=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
`,O=n.Ay.div`
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
  flex: 1;
`,R=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,Y=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-left: 12px;
`,M=n.Ay.button`
  padding: 4px 8px;
  font-size: 11px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #10B981;
    color: #10B981;
    background: #ECFDF5;
  }
`,L=n.Ay.div`
  display: flex;
  gap: 8px;
  width: 100%;
`,H=n.Ay.button`
  flex: ${e=>"secondary"===e.variant?"0 0 auto":"1"};
  padding: 10px 16px;
  border: ${e=>"secondary"===e.variant?"1px solid #E6EBF1":"none"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>"secondary"===e.variant?"white":"preparing"===e.variant?"#3B82F6":"ready"===e.variant?"#10B981":"primary"===e.variant?"#F59E0B":"#10B981"};
  color: ${e=>"secondary"===e.variant?"#6B7C93":"white"};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    background: ${e=>"secondary"===e.variant?"#F6F9FC":void 0};
  }

  &:active {
    transform: translateY(0);
  }
`,W=()=>{const{user:e}=(0,o.As)(),{menuItems:t}=(0,a.b)(),[r,n]=(0,i.useState)([]),[W,J]=(0,i.useState)(new Date),[,U]=(0,i.useState)(null),[V,Z]=(0,i.useState)(!1),[Q,G]=(0,i.useState)(null),X=(0,i.useCallback)(async()=>{if(console.log("\ud83c\udf73 Kitchen Display - fetchOrders called"),console.log("User:",e),console.log("Restaurant ID:",null===e||void 0===e?void 0:e.restaurantId),null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token");console.log("Token exists:",!!t);const r=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});console.log("Response status:",r.status);const i=await r.json();if(console.log("API Result:",i),i.success&&i.data){const e=i.data;console.log("Total orders from DB:",e.length);const t=e.filter(e=>["pending","preparing","ready"].includes(e.status)).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(i){console.error("Failed to parse order_items:",i),t=[]}const r=[];return t.forEach((t,i)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var n;const s=t.set_items.map((r,n)=>({...r,id:`item-${e.id}-${i}-set-${n}`,name:r.name,quantity:r.quantity*(t.quantity||1),status:r.status||"pending"}));r.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;r.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:r,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",scheduledPickupTime:e.scheduled_pickup_time||null}});console.log("Kitchen orders after filter:",t.length),n(e=>{const r=new Set(e.map(e=>e.id)),i=t.filter(e=>!r.has(e.id));return i.length>0&&(console.log("New orders detected:",i.length),ee()),t})}else console.error("API error:",i.error)}catch(t){console.error("Failed to fetch orders:",t)}else console.log("\u274c No restaurant ID found")},[null===e||void 0===e?void 0:e.restaurantId]);(0,i.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(r.ok){const e=await r.json();G(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{X();const e=setInterval(X,3e4);return()=>clearInterval(e)},[X]),(0,i.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{console.log("\u2705 Kitchen Display connected to /orders namespace"),Z(!0),t.emit("join-restaurant",e.restaurantId),console.log(`\u2705 Joined restaurant_${e.restaurantId}`),X()}),t.on("disconnect",()=>{console.log("\u26a0\ufe0f Kitchen Display disconnected from /orders namespace"),Z(!1)}),t.on("connect_error",e=>{console.error("\u274c Socket.IO connection error:",e),Z(!1)}),t.on("reconnect",e=>{console.log(`\ud83d\udd04 Reconnected after ${e} attempts`),Z(!0),X()}),t.on("order-created",t=>{if(console.log("\ud83d\udd14 KITCHEN: New order received:",{orderId:t.id,orderNumber:t.order_number,restaurant_id:t.restaurant_id,status:t.status,timestamp:(new Date).toISOString()}),t.restaurant_id!==e.restaurantId)return void console.log("\u26a0\ufe0f Order restaurant_id mismatch, ignoring");let r=t.order_items||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(o){console.error("Failed to parse order_items:",o),r=[]}const i=[];r.forEach((e,r)=>{const n=(e.special_instructions||"").match(/^\[(.*?)\]/);if(n){n[1].split(",").map(e=>e.trim()).forEach((n,s)=>{const o=n.match(/^(.*?)\s+x(\d+)$/);if(o){const[,n,a]=o;i.push({id:`item-${t.id}-${r}-set-${s}`,name:n.trim(),quantity:parseInt(a)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&i.push({id:`item-${t.id}-${r}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;i.push({id:`item-${t.id}-${r}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const s={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:i,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",scheduledPickupTime:t.scheduled_pickup_time||null};console.log("\u2705 KITCHEN: Adding order to display:",s.orderNumber),n(e=>(console.log(`\ud83d\udcca KITCHEN: Current orders count: ${e.length}, adding new order`),[s,...e])),ee(),console.log("\ud83d\udd14 KITCHEN: Notification sound played")}),t.on("order-updated",t=>{console.log("Order updated:",t),t.restaurant_id===e.restaurantId&&n(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>["pending","preparing","ready"].includes(e.status)))}),t.on("order-deleted",e=>{let{id:t}=e;console.log("Order deleted:",t),n(e=>e.filter(e=>e.id!==t.toString()))}),U(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{const e=setInterval(()=>{J(new Date)},1e3);return()=>clearInterval(e)},[]);const ee=()=>{new Audio("/notification.mp3").play().catch(e=>console.log("Could not play notification sound:",e))},te=e=>{const r=(e=>{const r=t.find(t=>t.name===e);return(null===r||void 0===r?void 0:r.code)||""})(e);return r?`${r} ${e}`:e},re=e=>Math.floor((W.getTime()-e.getTime())/1e3/60),ie=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&n(r=>r.map(r=>r.id===e?{...r,status:t}:r).filter(e=>["pending","preparing","ready"].includes(e.status)));try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({status:t})});(await i.json()).success?console.log("Status updated successfully"):X()}catch(r){console.error("Failed to update status:",r),X()}},ne=async(e,t)=>{try{const i=r.find(t=>t.id===e);if(!i)return;const s=i.items.map(e=>{if(e.id===t){const t="completed"===e.status?"pending":"completed";return{...e,status:t}}return e}),o=s.every(e=>"completed"===e.status),a=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return void console.error("Failed to update item status");n(t=>t.map(t=>t.id===e?{...t,items:s,status:t.status}:t)),o&&"preparing"===i.status&&(console.log("All items completed, advancing to ready:",e),await ie(e,"ready",!0))}catch(i){console.error("Failed to update item status:",i),X()}},se=async(e,t,i)=>{try{const s=r.find(t=>t.id===e);if(!s)return;const o=s.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===i){const t="completed"===e.status?"pending":"completed";return{...e,status:t}}return e}),r=t.every(e=>"completed"===e.status);return{...e,set_items:t,status:r?"completed":"pending"}}return e}),a=o.every(e=>"completed"===e.status),d=localStorage.getItem("auth_token"),l=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify({order_items:o.map(e=>({...e,status:e.status}))})});if(!(await l.json()).success)return void console.error("Failed to update set item status");n(t=>t.map(t=>t.id===e?{...t,items:o,status:t.status}:t)),a&&"preparing"===s.status&&(console.log("All items completed, advancing to ready:",e),await ie(e,"ready",!0))}catch(s){console.error("Failed to update set item status:",s),X()}},oe=e=>r.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),ae={pending:oe("pending").length,preparing:oe("preparing").length,ready:oe("ready").length};return(0,c.jsxs)(u,{children:[(0,c.jsx)(d.Ay,{title:"Kitchen Display",children:(0,c.jsxs)(m,{children:[(0,c.jsxs)(g,{connected:V,children:[(0,c.jsx)(x,{connected:V}),V?"Connected":"Disconnected"]}),(0,c.jsx)(h,{children:(0,l.fU)(W,Q)})]})}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)(j,{status:"pending",children:[(0,c.jsx)(b,{children:"Pending Orders"}),(0,c.jsx)(v,{color:"#F59E0B",children:ae.pending}),(0,c.jsx)(A,{children:"Waiting to start"})]}),(0,c.jsx)(F,{children:oe("pending").map(e=>{const t=re(e.orderTime),r=t>15,n=e.items.filter(e=>"completed"===e.status).length;return(0,c.jsxs)(w,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`Pager #${e.pagerNumber}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,c.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)($,{children:e.orderNumber}),(0,c.jsxs)(D,{urgent:r,children:[t," min"]})]})]}),(0,c.jsxs)(C,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Table Order"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,c.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"takeaway"===e.orderType&&(0,c.jsx)(N,{children:"\ud83e\udd61 TAKEAWAY"}),"delivery"===e.orderType&&(0,c.jsx)(N,{children:"\ud83d\ude9a DELIVERY"}),(0,c.jsxs)(N,{children:["\u2713 ",n,"/",e.items.length," items"]})]}),(0,c.jsx)(I,{children:e.items.map(t=>(0,c.jsxs)(i.Fragment,{children:[(0,c.jsxs)(S,{children:[(0,c.jsxs)(B,{style:{opacity:"completed"===t.status?.5:1},children:[(0,c.jsx)(P,{style:{textDecoration:"completed"===t.status?"line-through":"none"},children:te(t.name)}),t.options&&t.options.length>0&&(()=>{const e=[],r=[];return t.options.forEach(t=>{/^.+\sx\d+$/.test(t)?e.push(t):r.push(t)}),(0,c.jsxs)(c.Fragment,{children:[e.length>0&&(0,c.jsx)(z,{style:{fontWeight:600},children:e.join(", ")}),r.length>0&&(0,c.jsxs)(z,{children:["\u2b50 ",r.join(", ")]})]})})(),t.special_instructions&&(0,c.jsxs)(z,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",t.special_instructions]})]}),(0,c.jsxs)(R,{children:["\xd7",t.quantity]}),!t.is_set_menu&&(0,c.jsx)(Y,{children:(0,c.jsx)(M,{onClick:()=>ne(e.id,t.id),style:{background:"completed"===t.status?"#F59E0B":"#F3F4F6",color:"completed"===t.status?"white":"#6B7280",border:"completed"===t.status?"1px solid #F59E0B":"1px solid #E5E7EB"},children:"completed"===t.status?"\u2713 Done":"Done"})})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,c.jsx)(K,{children:t.set_items.map(r=>(0,c.jsxs)(q,{children:[(0,c.jsxs)(O,{style:{textDecoration:"completed"===r.status?"line-through":"none",opacity:"completed"===r.status?.5:1},children:["\u2022 ",te(r.name)," x",r.quantity]}),(0,c.jsx)(Y,{children:(0,c.jsx)(M,{onClick:()=>se(e.id,t.id,r.id),style:{background:"completed"===r.status?"#F59E0B":"#F3F4F6",color:"completed"===r.status?"white":"#6B7280",border:"completed"===r.status?"1px solid #F59E0B":"1px solid #E5E7EB"},children:"completed"===r.status?"\u2713":"Done"})})]},r.id))})]},t.id))}),(0,c.jsx)(H,{variant:"primary",onClick:()=>ie(e.id,"preparing"),children:"Start Cooking \u2192"})]},e.id)})})]}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(j,{status:"preparing",children:[(0,c.jsx)(b,{children:"Preparing"}),(0,c.jsx)(v,{color:"#3B82F6",children:ae.preparing}),(0,c.jsx)(A,{children:"In progress"})]}),(0,c.jsx)(F,{children:oe("preparing").map(e=>{const t=re(e.orderTime),s=e.items.filter(e=>"completed"===e.status).length;return(0,c.jsxs)(w,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`Pager #${e.pagerNumber}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,c.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)($,{children:e.orderNumber}),(0,c.jsxs)(D,{children:[t," min"]})]})]}),(0,c.jsxs)(C,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Table Order"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,c.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"delivery"===e.orderType&&(0,c.jsx)(N,{children:"\ud83d\ude9a DELIVERY"}),(0,c.jsxs)(N,{children:["\u2713 ",s,"/",e.items.length," items"]})]}),(0,c.jsx)(I,{children:e.items.map(t=>(0,c.jsxs)(i.Fragment,{children:[(0,c.jsxs)(S,{children:[(0,c.jsxs)(B,{style:{opacity:"completed"===t.status?.5:1},children:[(0,c.jsx)(P,{style:{textDecoration:"completed"===t.status?"line-through":"none"},children:te(t.name)}),t.options&&t.options.length>0&&(()=>{const e=[],r=[];return t.options.forEach(t=>{/^.+\sx\d+$/.test(t)?e.push(t):r.push(t)}),(0,c.jsxs)(c.Fragment,{children:[e.length>0&&(0,c.jsx)(z,{style:{fontWeight:600},children:e.join(", ")}),r.length>0&&(0,c.jsxs)(z,{children:["\u2b50 ",r.join(", ")]})]})})(),t.special_instructions&&(0,c.jsxs)(z,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",t.special_instructions]})]}),(0,c.jsxs)(R,{children:["\xd7",t.quantity]}),!t.is_set_menu&&(0,c.jsx)(Y,{children:(0,c.jsx)(M,{onClick:()=>ne(e.id,t.id),style:{background:"completed"===t.status?"#3B82F6":"#F3F4F6",color:"completed"===t.status?"white":"#6B7280",border:"completed"===t.status?"1px solid #3B82F6":"1px solid #E5E7EB"},children:"completed"===t.status?"\u2713 Done":"Done"})})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,c.jsx)(K,{children:t.set_items.map(r=>(0,c.jsxs)(q,{children:[(0,c.jsxs)(O,{style:{textDecoration:"completed"===r.status?"line-through":"none",opacity:"completed"===r.status?.5:1},children:["\u2022 ",te(r.name)," x",r.quantity]}),(0,c.jsx)(Y,{children:(0,c.jsx)(M,{onClick:()=>se(e.id,t.id,r.id),style:{background:"completed"===r.status?"#3B82F6":"#F3F4F6",color:"completed"===r.status?"white":"#6B7280",border:"completed"===r.status?"1px solid #3B82F6":"1px solid #E5E7EB"},children:"completed"===r.status?"\u2713 Done":"Done"})})]},r.id))})]},t.id))}),(0,c.jsxs)(L,{children:[(0,c.jsx)(H,{variant:"preparing",onClick:()=>(async e=>{try{const t=r.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"completed"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"completed"}))),t}),s=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return void console.error("Failed to update items to completed");n(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await ie(e,"ready",!0)}catch(t){console.error("Failed to mark all items completed:",t),X()}})(e.id),children:"Mark Ready \u2192"}),(0,c.jsx)(H,{variant:"secondary",onClick:()=>ie(e.id,"pending"),title:"Revert to pending",children:"\u21ba"})]})]},e.id)})})]}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(j,{status:"ready",children:[(0,c.jsx)(b,{children:"Ready for Pickup"}),(0,c.jsx)(v,{color:"#10B981",children:ae.ready}),(0,c.jsx)(A,{children:"Waiting for pickup"})]}),(0,c.jsx)(F,{children:oe("ready").map(e=>{const t=re(e.orderTime);return(0,c.jsxs)(w,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`Pager #${e.pagerNumber}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,c.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)($,{children:e.orderNumber}),(0,c.jsxs)(D,{children:[t," min ago"]})]})]}),(0,c.jsxs)(C,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Table Order - Ready to Serve"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,c.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,c.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"takeaway"===e.orderType&&(0,c.jsx)(N,{children:"\ud83e\udd61 TAKEAWAY"}),"delivery"===e.orderType&&(0,c.jsx)(N,{children:"\ud83d\ude9a DELIVERY - Ready for Driver"})]}),(0,c.jsx)(I,{children:e.items.map((e,t)=>(0,c.jsxs)(S,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(P,{children:te(e.name)}),e.options&&e.options.length>0&&(0,c.jsxs)(z,{children:["\u2b50 ",e.options.join(", ")]}),e.special_instructions&&(0,c.jsxs)(z,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",e.special_instructions]})]}),(0,c.jsxs)(R,{children:["\xd7",e.quantity]})]},t))}),(0,c.jsxs)(L,{children:[(0,c.jsx)(H,{variant:"ready",onClick:()=>{ie(e.id,"served")},children:"Served \u2713"}),(0,c.jsx)(H,{variant:"secondary",onClick:()=>ie(e.id,"preparing"),title:"Revert to preparing",children:"\u21ba"})]})]},e.id)})})]})]})]})}},8012:(e,t,r)=>{r.d(t,{Ay:()=>d});r(9950);var i=r(4752),n=r(4414);const s=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,o=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:r}=e;return(0,n.jsxs)(s,{children:[(0,n.jsx)(o,{children:t}),r&&(0,n.jsx)(a,{children:r})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>d,Vp:()=>a,fU:()=>s,ng:()=>i,oB:()=>o,r6:()=>n});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",n=(e,t,r)=>{if(!e)return"";const n=new Date(e);if(isNaN(n.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return n.toLocaleString("en-MY",{...s,...r})},s=(e,t)=>n(e,t,{year:void 0,month:void 0,day:void 0}),o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,i=Math.floor(r/6e4),n=Math.floor(r/36e5),s=Math.floor(r/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===n?"1 hour ago":n<24?`${n} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);