"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Q});var n=i(9950),r=i(4752),s=i(3422),a=i(1367),o=i(8930),d=i(8012),c=i(8406),l=i(4414);const p=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},r=n(t),s=n(i);return r.period===s.period?`${r.time} - ${s.time} ${s.period}`:`${r.time} ${r.period} - ${s.time} ${s.period}`},u=r.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,m=r.Ay.div`
  padding: 16px 20px;
`,h=r.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,g=r.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,x=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,y=r.Ay.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${e=>e.connected?"#059669":"#DC2626"};
  animation: ${e=>e.connected?"pulse 2s infinite":"none"};

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`,f=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,b=r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,v=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border-bottom: 1px solid #E6EBF1;
`,w=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,j=r.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #0A2540;
`,A=r.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,$=r.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #D1D5DB;
    border-radius: 3px;
  }
`,_=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,k=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,C=r.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
`,D=r.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,S=r.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,B=r.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,E=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,T=r.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,z=r.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,N=r.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,q=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  border-bottom: 1px solid #F6F9FC;
  opacity: ${e=>e.done?.45:1};

  &:last-child {
    border-bottom: none;
  }
`,P=r.Ay.div`
  flex: 1;
  min-width: 0;
`,M=r.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.done?"line-through":"none"};
`,O=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 1px;
`,J=r.Ay.div`
  font-size: 12px;
  color: #DC2626;
  font-style: italic;
  margin-top: 1px;
`,K=r.Ay.div`
  font-size: 15px;
  font-weight: 700;
  color: #635BFF;
  margin: 0 8px;
  flex-shrink: 0;
`,L=r.Ay.button`
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  border: 1px solid ${e=>e.done?e.statusColor||"#10B981":"#E6EBF1"};
  background: ${e=>e.done?e.statusColor||"#10B981":"white"};
  color: ${e=>e.done?"white":"#6B7280"};

  &:hover {
    border-color: ${e=>e.statusColor||"#10B981"};
    color: ${e=>e.done?"white":e.statusColor||"#10B981"};
    background: ${e=>e.done?e.statusColor||"#10B981":"#ECFDF5"};
  }
`,H=r.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,Y=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  opacity: ${e=>e.done?.45:1};
`,R=r.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  flex: 1;
  text-decoration: ${e=>e.done?"line-through":"none"};
`,U=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,Z=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.color};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`,V=r.Ay.button`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: white;
  color: #6B7C93;
  flex-shrink: 0;

  &:hover {
    background: #F6F9FC;
    border-color: #D1D5DB;
  }
`,W=r.Ay.div`
  margin-bottom: 4px;
`,Q=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,r]=(0,n.useState)([]),[Q,G]=(0,n.useState)(new Date),[,X]=(0,n.useState)(null),[ee,te]=(0,n.useState)(!1),[ie,ne]=(0,n.useState)(null),re=(0,n.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),n=await i.json();if(n.success&&n.data){const e=n.data.filter(e=>["pending","preparing","ready"].includes(e.status)).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const s=t.set_items.map((i,r)=>({...i,id:`item-${e.id}-${n}-set-${r}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});r(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&se(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,n.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();ne(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{re();const e=setInterval(re,3e4);return()=>clearInterval(e)},[re]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{te(!0),t.emit("join-restaurant",e.restaurantId),re()}),t.on("disconnect",()=>te(!1)),t.on("connect_error",()=>te(!1)),t.on("reconnect",()=>{te(!0),re()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const n=[];i.forEach((e,i)=>{const r=(e.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,s)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;n.push({id:`item-${t.id}-${i}-set-${s}`,name:r.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&n.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;n.push({id:`item-${t.id}-${i}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const s={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:n,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};r(e=>[s,...e]),se()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&r(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>["pending","preparing","ready"].includes(e.status)))}),t.on("order-deleted",e=>{let{id:t}=e;r(e=>e.filter(e=>e.id!==t.toString()))}),X(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>G(new Date),1e3);return()=>clearInterval(e)},[]);const se=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ae=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},oe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&r(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>["pending","preparing","ready"].includes(e.status)));try{const i=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await n.json()).success||re()}catch{re()}},de=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),ce={pending:de("pending").length,preparing:de("preparing").length,ready:de("ready").length},le=e=>{const t=(s=e.orderTime,Math.floor((Q.getTime()-s.getTime())/1e3/60));var s;const a=t>15&&"pending"===e.status,o=e.items.filter(e=>"completed"===e.status).length,d=e.items.length,c=d>0?o/d*100:0,u=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,l.jsxs)(_,{children:[(0,l.jsxs)(k,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(C,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(D,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(D,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(S,{children:[(0,l.jsx)(B,{children:e.orderNumber}),(0,l.jsxs)(E,{urgent:a,children:[t,"m"]})]})]}),"ready"!==e.status&&(0,l.jsxs)(I,{children:[(0,l.jsx)(T,{children:(0,l.jsx)(z,{percent:c,color:u})}),(0,l.jsxs)(N,{children:[o,"/",d]})]}),(0,l.jsx)(W,{children:e.items.map(t=>(0,l.jsxs)(n.Fragment,{children:[(0,l.jsxs)(q,{done:"completed"===t.status,children:[(0,l.jsxs)(P,{children:[(0,l.jsx)(M,{done:"completed"===t.status,children:ae(t.name)}),t.options&&t.options.length>0&&(()=>{const e=[],i=[];return t.options.forEach(t=>{/^.+\sx\d+$/.test(t)?e.push(t):i.push(t)}),(0,l.jsxs)(l.Fragment,{children:[e.length>0&&(0,l.jsx)(O,{style:{fontWeight:600},children:e.join(", ")}),i.length>0&&(0,l.jsx)(O,{children:i.join(", ")})]})})(),t.special_instructions&&(0,l.jsx)(J,{children:t.special_instructions})]}),(0,l.jsxs)(K,{children:["x",t.quantity]}),!t.is_set_menu&&"ready"!==e.status&&(0,l.jsx)(L,{done:"completed"===t.status,statusColor:u,onClick:()=>(async(e,t)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const s=n.items.map(e=>e.id===t?{...e,status:"completed"===e.status?"pending":"completed"}:e),a=s.every(e=>"completed"===e.status),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),a&&"preparing"===n.status&&await oe(e,"ready",!0)}catch{re()}})(e.id,t.id),children:(t.status,"Done")})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(H,{children:t.set_items.map(n=>(0,l.jsxs)(Y,{done:"completed"===n.status,children:[(0,l.jsxs)(R,{done:"completed"===n.status,children:[ae(n.name)," x",n.quantity]}),"ready"!==e.status&&(0,l.jsx)(L,{done:"completed"===n.status,statusColor:u,onClick:()=>(async(e,t,n)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const a=s.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>e.id===n?{...e,status:"completed"===e.status?"pending":"completed"}:e),i=t.every(e=>"completed"===e.status);return{...e,set_items:t,status:i?"completed":"pending"}}return e}),o=a.every(e=>"completed"===e.status),d=localStorage.getItem("auth_token"),c=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await c.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:a}:t)),o&&"preparing"===s.status&&await oe(e,"ready",!0)}catch{re()}})(e.id,t.id,n.id),style:{padding:"2px 8px",fontSize:"10px"},children:(n.status,"Done")})]},n.id))})]},t.id))}),"pending"===e.status&&(0,l.jsx)(U,{children:(0,l.jsx)(Z,{color:"#F59E0B",onClick:()=>oe(e.id,"preparing"),children:"Start Cooking"})}),"preparing"===e.status&&(0,l.jsxs)(U,{children:[(0,l.jsx)(Z,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const n=t.items.map(e=>{const t={...e,status:"completed"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"completed"}))),t}),s=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await oe(e,"ready",!0)}catch{re()}})(e.id),children:"Mark Ready"}),(0,l.jsx)(V,{onClick:()=>oe(e.id,"pending"),children:"\u21ba"})]}),"ready"===e.status&&(0,l.jsxs)(U,{children:[(0,l.jsx)(Z,{color:"#10B981",onClick:()=>oe(e.id,"served"),children:"Served"}),(0,l.jsx)(V,{onClick:()=>oe(e.id,"preparing"),children:"\u21ba"})]})]},e.id)};return(0,l.jsxs)(u,{children:[(0,l.jsx)(d.Ay,{title:"Kitchen Display",children:(0,l.jsxs)(h,{children:[(0,l.jsxs)(x,{connected:ee,children:[(0,l.jsx)(y,{connected:ee}),ee?"Live":"Offline"]}),(0,l.jsx)(g,{children:(0,c.fU)(Q,ie)})]})}),(0,l.jsx)(m,{children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"pending",children:[(0,l.jsx)(w,{children:(0,l.jsx)(j,{children:"Pending"})}),(0,l.jsx)(A,{color:"#F59E0B",children:ce.pending})]}),(0,l.jsx)($,{children:de("pending").map(le)})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"preparing",children:[(0,l.jsx)(w,{children:(0,l.jsx)(j,{children:"Preparing"})}),(0,l.jsx)(A,{color:"#3B82F6",children:ce.preparing})]}),(0,l.jsx)($,{children:de("preparing").map(le)})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"ready",children:[(0,l.jsx)(w,{children:(0,l.jsx)(j,{children:"Ready"})}),(0,l.jsx)(A,{color:"#10B981",children:ce.ready})]}),(0,l.jsx)($,{children:de("ready").map(le)})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var n=i(4752),r=i(4414);const s=n.Ay.div`
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
`,a=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,o=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:i}=e;return(0,r.jsxs)(s,{children:[(0,r.jsx)(a,{children:t}),i&&(0,r.jsx)(o,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>s,ng:()=>n,oB:()=>a,r6:()=>r});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,i)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return r.toLocaleString("en-MY",{...s,...i})},s=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,n=Math.floor(i/6e4),r=Math.floor(i/36e5),s=Math.floor(i/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);