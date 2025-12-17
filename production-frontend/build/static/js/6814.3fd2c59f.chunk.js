"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var n=r(9950),i=r(4752),s=r(3422),o=r(1367),a=r(8930),d=r(8406),l=r(4414);const c=e=>{const t=new Date(e),r=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),r=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:r}},i=n(t),s=n(r);return i.period===s.period?`${i.time} - ${s.time} ${s.period}`:`${i.time} ${i.period} - ${s.time} ${s.period}`},p=i.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
  color: #0A2540;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,u=i.Ay.div`
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
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.div`
  display: flex;
  gap: 30px;
  align-items: center;
`,g=i.Ay.div`
  font-size: 20px;
  font-weight: 500;
  color: #6B7C93;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,y=i.Ay.div`
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
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: calc(100vh - 180px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 16px;
  }
`,j=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,b=i.Ay.div`
  padding: 20px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF4E6";case"preparing":return"#EFF6FF";case"ready":case"served":return"#ECFDF5";default:return"#F6F9FC"}}};
  border-bottom: 2px solid ${e=>{switch(e.status){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":case"served":return"#10B981";default:return"#E6EBF1"}}};
`,v=i.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #0A2540;
`,A=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,F=i.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-top: 4px;
`,k=i.Ay.div`
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
`,w=i.Ay.div`
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
`,T=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,_=i.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 8px;
`,E=i.Ay.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`,$=i.Ay.div`
  text-align: right;
`,C=i.Ay.div`
  font-size: 11px;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,I=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#0A2540"};
  margin-top: 2px;
`,D=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #6B7C93;
`,N=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,S=i.Ay.div`
  margin-bottom: 16px;
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F6F9FC;

  &:last-child {
    border-bottom: none;
  }
`,P=i.Ay.div`
  flex: 1;
`,z=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,q=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 2px;
`,K=i.Ay.div`
  margin-left: 16px;
  margin-top: 8px;
  border-left: 2px solid #667eea;
  padding-left: 12px;
`,R=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 0;
`,O=i.Ay.div`
  font-size: 13px;
  color: #667eea;
  font-weight: 500;
  flex: 1;
`,Y=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,M=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-left: 12px;
`,W=i.Ay.button`
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
`,H=i.Ay.div`
  display: flex;
  gap: 8px;
  width: 100%;
`,L=i.Ay.button`
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
`,U=()=>{const{user:e}=(0,o.As)(),{menuItems:t}=(0,a.b)(),[r,i]=(0,n.useState)([]),[U,J]=(0,n.useState)(new Date),[,V]=(0,n.useState)(null),[Z,Q]=(0,n.useState)(!1),[G,X]=(0,n.useState)(null),ee=(0,n.useCallback)(async()=>{if(console.log("\ud83c\udf73 Kitchen Display - fetchOrders called"),console.log("User:",e),console.log("Restaurant ID:",null===e||void 0===e?void 0:e.restaurantId),null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token");console.log("Token exists:",!!t);const r=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});console.log("Response status:",r.status);const n=await r.json();if(console.log("API Result:",n),n.success&&n.data){const e=n.data;console.log("Total orders from DB:",e.length);const t=e.filter(e=>["pending","preparing","ready"].includes(e.status)).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){console.error("Failed to parse order_items:",n),t=[]}const r=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var i;const s=t.set_items.map((r,i)=>({id:`item-${e.id}-${n}-set-${i}`,name:r.name,quantity:r.quantity*(t.quantity||1),status:r.status||"pending"}));r.push({id:`item-${e.id}-${n}`,name:t.name||(null===(i=t.menuItem)||void 0===i?void 0:i.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;r.push({id:`item-${e.id}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),items:r,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",scheduledPickupTime:e.scheduled_pickup_time||null}});console.log("Kitchen orders after filter:",t.length),i(e=>{const r=new Set(e.map(e=>e.id)),n=t.filter(e=>!r.has(e.id));return n.length>0&&(console.log("New orders detected:",n.length),te()),t})}else console.error("API error:",n.error)}catch(t){console.error("Failed to fetch orders:",t)}else console.log("\u274c No restaurant ID found")},[null===e||void 0===e?void 0:e.restaurantId]);(0,n.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(r.ok){const e=await r.json();X(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{ee();const e=setInterval(ee,3e4);return()=>clearInterval(e)},[ee]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{console.log("\u2705 Kitchen Display connected to /orders namespace"),Q(!0),t.emit("join-restaurant",e.restaurantId),console.log(`\u2705 Joined restaurant_${e.restaurantId}`),ee()}),t.on("disconnect",()=>{console.log("\u26a0\ufe0f Kitchen Display disconnected from /orders namespace"),Q(!1)}),t.on("connect_error",e=>{console.error("\u274c Socket.IO connection error:",e),Q(!1)}),t.on("reconnect",e=>{console.log(`\ud83d\udd04 Reconnected after ${e} attempts`),Q(!0),ee()}),t.on("order-created",t=>{if(console.log("\ud83d\udd14 KITCHEN: New order received:",{orderId:t.id,orderNumber:t.order_number,restaurant_id:t.restaurant_id,status:t.status,timestamp:(new Date).toISOString()}),t.restaurant_id!==e.restaurantId)return void console.log("\u26a0\ufe0f Order restaurant_id mismatch, ignoring");let r=t.order_items||[];if("string"===typeof r)try{r=JSON.parse(r)}catch(o){console.error("Failed to parse order_items:",o),r=[]}const n=[];r.forEach((e,r)=>{const i=(e.special_instructions||"").match(/^\[(.*?)\]/);if(i){i[1].split(",").map(e=>e.trim()).forEach((i,s)=>{const o=i.match(/^(.*?)\s+x(\d+)$/);if(o){const[,i,a]=o;n.push({id:`item-${t.id}-${r}-set-${s}`,name:i.trim(),quantity:parseInt(a)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&n.push({id:`item-${t.id}-${r}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;n.push({id:`item-${t.id}-${r}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const s={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:n,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",scheduledPickupTime:t.scheduled_pickup_time||null};console.log("\u2705 KITCHEN: Adding order to display:",s.orderNumber),i(e=>(console.log(`\ud83d\udcca KITCHEN: Current orders count: ${e.length}, adding new order`),[s,...e])),te(),console.log("\ud83d\udd14 KITCHEN: Notification sound played")}),t.on("order-updated",t=>{console.log("Order updated:",t),t.restaurant_id===e.restaurantId&&i(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>["pending","preparing","ready"].includes(e.status)))}),t.on("order-deleted",e=>{let{id:t}=e;console.log("Order deleted:",t),i(e=>e.filter(e=>e.id!==t.toString()))}),V(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>{J(new Date)},1e3);return()=>clearInterval(e)},[]);const te=()=>{new Audio("/notification.mp3").play().catch(e=>console.log("Could not play notification sound:",e))},re=e=>{const r=(e=>{const r=t.find(t=>t.name===e);return(null===r||void 0===r?void 0:r.code)||""})(e);return r?`${r} ${e}`:e},ne=e=>Math.floor((U.getTime()-e.getTime())/1e3/60),ie=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&i(r=>r.map(r=>r.id===e?{...r,status:t}:r).filter(e=>["pending","preparing","ready"].includes(e.status)));try{const r=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({status:t})});(await n.json()).success?console.log("Status updated successfully"):ee()}catch(r){console.error("Failed to update status:",r),ee()}},se=e=>r.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),oe={pending:se("pending").length,preparing:se("preparing").length,ready:se("ready").length};return(0,l.jsxs)(p,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(m,{children:"Kitchen Display"}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(x,{connected:Z,children:[(0,l.jsx)(y,{connected:Z}),Z?"Connected":"Disconnected"]}),(0,l.jsx)(g,{children:(0,d.fU)(U,G)})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{status:"pending",children:[(0,l.jsx)(v,{children:"Pending Orders"}),(0,l.jsx)(A,{color:"#F59E0B",children:oe.pending}),(0,l.jsx)(F,{children:"Waiting to start"})]}),(0,l.jsx)(k,{children:se("pending").map(e=>{const t=ne(e.orderTime),r=t>15;return(0,l.jsxs)(w,{children:[(0,l.jsxs)(T,{children:[(0,l.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,l.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,l.jsxs)($,{children:[(0,l.jsx)(C,{children:"Waiting"}),(0,l.jsxs)(I,{urgent:r,children:[t," min"]})]})]}),(0,l.jsxs)(D,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Table Order"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,l.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"takeaway"===e.orderType&&(0,l.jsx)(N,{children:"\ud83e\udd61 TAKEAWAY"}),"delivery"===e.orderType&&(0,l.jsx)(N,{children:"\ud83d\ude9a DELIVERY"})]}),(0,l.jsx)(S,{children:e.items.map((e,t)=>(0,l.jsxs)(B,{children:[(0,l.jsxs)(P,{children:[(0,l.jsx)(z,{children:re(e.name)}),e.options&&e.options.length>0&&(()=>{const t=[],r=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):r.push(e)}),(0,l.jsxs)(l.Fragment,{children:[t.length>0&&(0,l.jsx)(q,{style:{fontWeight:600},children:t.join(", ")}),r.length>0&&(0,l.jsxs)(q,{children:["\u2b50 ",r.join(", ")]})]})})(),e.special_instructions&&(0,l.jsxs)(q,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",e.special_instructions]})]}),(0,l.jsxs)(Y,{children:["\xd7",e.quantity]})]},t))}),(0,l.jsx)(L,{variant:"primary",onClick:()=>ie(e.id,"preparing"),children:"Start Cooking \u2192"})]},e.id)})})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{status:"preparing",children:[(0,l.jsx)(v,{children:"Preparing"}),(0,l.jsx)(A,{color:"#3B82F6",children:oe.preparing}),(0,l.jsx)(F,{children:"In progress"})]}),(0,l.jsx)(k,{children:se("preparing").map(e=>{const t=ne(e.orderTime),s=e.items.filter(e=>"completed"===e.status).length;return(0,l.jsxs)(w,{children:[(0,l.jsxs)(T,{children:[(0,l.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,l.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,l.jsxs)($,{children:[(0,l.jsx)(C,{children:"Cooking"}),(0,l.jsxs)(I,{children:[t," min"]})]})]}),(0,l.jsxs)(D,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Table Order"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,l.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"delivery"===e.orderType&&(0,l.jsx)(N,{children:"\ud83d\ude9a DELIVERY"}),(0,l.jsxs)(N,{children:["\u2713 ",s,"/",e.items.length," items"]})]}),(0,l.jsx)(S,{children:e.items.map(t=>(0,l.jsxs)(n.Fragment,{children:[(0,l.jsxs)(B,{children:[(0,l.jsxs)(P,{style:{opacity:"completed"===t.status?.5:1},children:[(0,l.jsx)(z,{style:{textDecoration:"completed"===t.status?"line-through":"none"},children:re(t.name)}),t.options&&t.options.length>0&&(()=>{const e=[],r=[];return t.options.forEach(t=>{/^.+\sx\d+$/.test(t)?e.push(t):r.push(t)}),(0,l.jsxs)(l.Fragment,{children:[e.length>0&&(0,l.jsx)(q,{style:{fontWeight:600},children:e.join(", ")}),r.length>0&&(0,l.jsxs)(q,{children:["\u2b50 ",r.join(", ")]})]})})(),t.special_instructions&&(0,l.jsxs)(q,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",t.special_instructions]})]}),(0,l.jsxs)(Y,{children:["\xd7",t.quantity]}),!t.is_set_menu&&(0,l.jsx)(M,{children:(0,l.jsx)(W,{onClick:()=>(async(e,t)=>{try{const n=r.find(t=>t.id===e);if(!n)return;const s=n.items.map(e=>{if(e.id===t){const t="completed"===e.status?"pending":"completed";return{...e,status:t}}return e}),o=s.every(e=>"completed"===e.status),a=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({name:e.name,quantity:e.quantity,options:e.options||[],status:e.status}))})});if(!(await d.json()).success)return void console.error("Failed to update item status");i(t=>t.map(t=>t.id===e?{...t,items:s,status:t.status}:t)),o&&"preparing"===n.status&&(console.log("All items completed, advancing to ready:",e),await ie(e,"ready",!0))}catch(n){console.error("Failed to update item status:",n),ee()}})(e.id,t.id),style:{background:"completed"===t.status?"#3B82F6":"#F3F4F6",color:"completed"===t.status?"white":"#6B7280",border:"completed"===t.status?"1px solid #3B82F6":"1px solid #E5E7EB"},children:"completed"===t.status?"\u2713 Done":"Done"})})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(K,{children:t.set_items.map(n=>(0,l.jsxs)(R,{children:[(0,l.jsxs)(O,{style:{textDecoration:"completed"===n.status?"line-through":"none",opacity:"completed"===n.status?.5:1},children:["\u2022 ",re(n.name)," x",n.quantity]}),(0,l.jsx)(M,{children:(0,l.jsx)(W,{onClick:()=>(async(e,t,n)=>{try{const s=r.find(t=>t.id===e);if(!s)return;const o=s.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===n){const t="completed"===e.status?"pending":"completed";return{...e,status:t}}return e}),r=t.every(e=>"completed"===e.status);return{...e,set_items:t,status:r?"completed":"pending"}}return e}),a=o.every(e=>"completed"===e.status),d=localStorage.getItem("auth_token"),l=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify({order_items:o.map(e=>({name:e.name,quantity:e.quantity,options:e.options||[],status:e.status,is_set_menu:e.is_set_menu,set_items:e.set_items}))})});if(!(await l.json()).success)return void console.error("Failed to update set item status");i(t=>t.map(t=>t.id===e?{...t,items:o,status:t.status}:t)),a&&"preparing"===s.status&&(console.log("All items completed, advancing to ready:",e),await ie(e,"ready",!0))}catch(s){console.error("Failed to update set item status:",s),ee()}})(e.id,t.id,n.id),style:{background:"completed"===n.status?"#3B82F6":"#F3F4F6",color:"completed"===n.status?"white":"#6B7280",border:"completed"===n.status?"1px solid #3B82F6":"1px solid #E5E7EB"},children:"completed"===n.status?"\u2713 Done":"Done"})})]},n.id))})]},t.id))}),(0,l.jsxs)(H,{children:[(0,l.jsx)(L,{variant:"preparing",onClick:()=>ie(e.id,"ready"),children:"Mark Ready \u2192"}),(0,l.jsx)(L,{variant:"secondary",onClick:()=>ie(e.id,"pending"),title:"Revert to pending",children:"\u21ba"})]})]},e.id)})})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{status:"ready",children:[(0,l.jsx)(v,{children:"Ready for Pickup"}),(0,l.jsx)(A,{color:"#10B981",children:oe.ready}),(0,l.jsx)(F,{children:"Waiting for pickup"})]}),(0,l.jsx)(k,{children:se("ready").map(e=>{const t=ne(e.orderTime);return(0,l.jsxs)(w,{children:[(0,l.jsxs)(T,{children:[(0,l.jsxs)(_,{children:[e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:`#${e.pickupNumber}`,"takeaway"===e.orderType&&(0,l.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(E,{style:{background:"#EDE9FE",color:"#7C3AED"},children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(E,{style:{background:"#D1FAE5",color:"#059669"},children:"DELIVERY"})]}),(0,l.jsxs)($,{children:[(0,l.jsx)(C,{children:"Ready"}),(0,l.jsxs)(I,{children:[t," min ago"]})]})]}),(0,l.jsxs)(D,{children:["dine-in"===e.orderType&&e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Table Order - Ready to Serve"}),"dine-in"===e.orderType&&!e.tableNumber&&(0,l.jsx)(N,{children:"\ud83d\udccd Free Seating"}),"takeaway"===e.orderType&&e.customerName&&(0,l.jsxs)(N,{children:["\ud83d\udc64 ",e.customerName]}),"takeaway"===e.orderType&&(0,l.jsx)(N,{children:"\ud83e\udd61 TAKEAWAY"}),"delivery"===e.orderType&&(0,l.jsx)(N,{children:"\ud83d\ude9a DELIVERY - Ready for Driver"})]}),(0,l.jsx)(S,{children:e.items.map((e,t)=>(0,l.jsxs)(B,{children:[(0,l.jsxs)(P,{children:[(0,l.jsx)(z,{children:re(e.name)}),e.options&&e.options.length>0&&(0,l.jsxs)(q,{children:["\u2b50 ",e.options.join(", ")]}),e.special_instructions&&(0,l.jsxs)(q,{style:{color:"#DC2626",fontStyle:"italic"},children:["\ud83d\udcdd ",e.special_instructions]})]}),(0,l.jsxs)(Y,{children:["\xd7",e.quantity]})]},t))}),(0,l.jsxs)(H,{children:[(0,l.jsx)(L,{variant:"ready",onClick:()=>{ie(e.id,"served")},children:"Served \u2713"}),(0,l.jsx)(L,{variant:"secondary",onClick:()=>ie(e.id,"preparing"),title:"Revert to preparing",children:"\u21ba"})]})]},e.id)})})]})]})]})}},8406:(e,t,r)=>{r.d(t,{MQ:()=>o,fU:()=>s,ng:()=>n,r6:()=>i});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",i=(e,t,r)=>{if(!e)return"";const i=new Date(e);if(isNaN(i.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return i.toLocaleString("en-MY",{...s,...r})},s=(e,t)=>i(e,t,{year:void 0,month:void 0,day:void 0}),o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const r=Date.now()-t,n=Math.floor(r/6e4),i=Math.floor(r/36e5),s=Math.floor(r/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===i?"1 hour ago":i<24?`${i} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);