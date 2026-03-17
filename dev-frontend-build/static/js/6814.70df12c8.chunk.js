"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,n)=>{n.r(t),n.d(t,{default:()=>X});var i=n(9950),s=n(4752),r=n(3422),a=n(1367),o=n(8930),d=n(8012),u=n(8406),p=n(4414);const c=e=>{const t=new Date(e),n=new Date(t.getTime()+18e5),i=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},s=i(t),r=i(n);return s.period===r.period?`${s.time} - ${r.time} ${r.period}`:`${s.time} ${s.period} - ${r.time} ${r.period}`},l=s.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,g=s.Ay.div`
  padding: 16px 20px;
`,m=s.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,h=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,x=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,y=s.Ay.div`
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
`,f=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,v=s.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,b=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border: 2px solid ${e=>{switch(e.status){case"pending":return"#FBBF24";case"preparing":return"#60A5FA";case"ready":return"#34D399";default:return"#E6EBF1"}}};
`,_=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,w=s.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,A=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,j=s.Ay.div`
  flex: 1;
  overflow-y: auto;

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
`,F=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,$=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,D=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,E=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,S=s.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,C=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,B=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,T=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,I=s.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,z=s.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,N=s.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,q=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 5px 8px;
  margin: 0 -8px;
  border-bottom: 1px solid #F6F9FC;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};

  &:last-child {
    border-bottom: none;
  }
`,P=s.Ay.div`
  flex: 1;
  min-width: 0;
`,M=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,O=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,J=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,H=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,K=s.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,L=s.Ay.button`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
  border: 1px solid ${e=>e.done?"#E6EBF1":e.statusColor||"#10B981"};
  background: ${e=>e.done?"#F3F4F6":e.statusColor||"#10B981"};
  color: ${e=>e.done?"#9CA3AF":"white"};

  &:hover {
    ${e=>!e.done&&"\n      opacity: 0.85;\n    "}
  }
`,R=s.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,Y=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,U=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,Z=s.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,V={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},W=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${e=>{var t;return(null===(t=V[e.color])||void 0===t?void 0:t.text)||e.color}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t;return(null===(t=V[e.color])||void 0===t?void 0:t.bg)||e.color}};
  color: ${e=>{var t;return(null===(t=V[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t;return(null===(t=V[e.color])||void 0===t?void 0:t.hoverBg)||e.color}};
  }
`,Q=s.Ay.button`
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
`,G=s.Ay.div`
  margin-bottom: 4px;
`,X=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[n,s]=(0,i.useState)([]),[V,X]=(0,i.useState)(new Date),[,ee]=(0,i.useState)(null),[te,ne]=(0,i.useState)(!1),[ie,se]=(0,i.useState)(null),re=(0,i.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),i=await n.json();if(i.success&&i.data){const e=i.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const n=[];return t.forEach((t,i)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var s;const r=t.set_items.map((n,s)=>({...n,id:`item-${e.id}-${i}-set-${s}`,name:n.name,quantity:n.quantity*(t.quantity||1),status:n.status||"pending"}));n.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:r})}else{var r;n.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:n,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});s(t=>{const n=new Set(t.map(e=>e.id));return e.filter(e=>!n.has(e.id)).length>0&&ae(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,i.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(n.ok){const e=await n.json();se(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{re();const e=setInterval(re,3e4);return()=>clearInterval(e)},[re]),(0,i.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,r.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{ne(!0),t.emit("join-restaurant",e.restaurantId),re()}),t.on("disconnect",()=>ne(!1)),t.on("connect_error",()=>ne(!1)),t.on("reconnect",()=>{ne(!0),re()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let n=t.order_items||[];if("string"===typeof n)try{n=JSON.parse(n)}catch{n=[]}const i=[];n.forEach((e,n)=>{const s=(e.special_instructions||"").match(/^\[(.*?)\]/);if(s){s[1].split(",").map(e=>e.trim()).forEach((s,r)=>{const a=s.match(/^(.*?)\s+x(\d+)$/);if(a){const[,s,o]=a;i.push({id:`item-${t.id}-${n}-set-${r}`,name:s.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&i.push({id:`item-${t.id}-${n}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var r;i.push({id:`item-${t.id}-${n}`,name:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const r={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:i,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};s(e=>[r,...e]),ae()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&s(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!pe(e))))}),t.on("order-deleted",e=>{let{id:t}=e;s(e=>e.filter(e=>e.id!==t.toString()))}),ee(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{const e=setInterval(()=>X(new Date),1e3);return()=>clearInterval(e)},[]);const ae=()=>{new Audio("/notification.mp3").play().catch(()=>{})},oe=e=>{const n=(e=>{const n=t.find(t=>t.name===e);return(null===n||void 0===n?void 0:n.code)||""})(e);return n?`${n} ${e}`:e},de=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&s(n=>n.map(n=>n.id===e?{...n,status:t}:n).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!pe(e))));try{const n=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:t})});(await i.json()).success||re()}catch{re()}},ue=(e,t)=>{const n={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===n||"ready"===e&&"completed"===t?e:n},pe=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),ce=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},le=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>ce(t,e.status||"pending")):ce(t,e.status||"pending")),ge=e=>n.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),me={pending:ge("pending").length,preparing:ge("preparing").length,ready:ge("ready").length},he=e=>{const t=(r=e.orderTime,Math.floor((V.getTime()-r.getTime())/1e3/60));var r;const a=t>15&&"pending"===e.status;let o=0,d=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(o+=t.set_items.length,d+=t.set_items.filter(t=>ce(e.status,t.status||"pending")).length):(o+=1,ce(e.status,t.status||"pending")&&(d+=1))});const u=o>0?d/o*100:0,l=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,p.jsxs)(F,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(k,{children:[(0,p.jsx)(D,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,p.jsx)(E,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,p.jsxs)(E,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,p.jsx)(E,{variant:"delivery",children:"DELIVERY"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(C,{children:e.orderNumber}),(0,p.jsxs)(B,{urgent:a,children:[t,"m"]})]})]}),o>1&&(0,p.jsxs)(T,{children:[(0,p.jsx)(I,{children:(0,p.jsx)(z,{percent:u,color:l})}),(0,p.jsxs)(N,{children:[d,"/",o]})]}),(0,p.jsx)(G,{children:e.items.map(t=>(0,p.jsxs)(i.Fragment,{children:[(0,p.jsxs)(q,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,p.jsxs)(P,{children:[t.is_set_menu?(0,p.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[oe(t.name)," ",t.quantity>1&&(0,p.jsxs)(K,{highlight:!0,done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,p.jsxs)(M,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:[oe(t.name)," ",t.quantity>1&&(0,p.jsxs)(K,{highlight:!0,done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(n=>{const i=(null===(n=t.options)||void 0===n?void 0:n.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==i.length||t.special_instructions?(0,p.jsxs)(O,{children:[i.map((n,i)=>(0,p.jsx)(J,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:n},i)),t.special_instructions&&(0,p.jsx)(H,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===o&&(0,p.jsx)(Q,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&de(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,p.jsx)(L,{done:ce(e.status,t.status||"pending"),statusColor:l,onClick:()=>(async(e,t)=>{try{const i=n.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>{if(e.id===t){const t=ue(i.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),le(r,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await de(e,t,!0)}}catch(i){console.error("updateItemStatus error:",i),re()}})(e.id,t.id),children:ce(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,p.jsx)(R,{children:t.set_items.map(i=>(0,p.jsxs)(Y,{done:ce(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,p.jsxs)(U,{done:ce(e.status,i.status||"pending")&&"pending"!==e.status,children:[oe(i.name)," ",i.quantity>1&&(0,p.jsxs)(K,{highlight:!0,done:ce(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,p.jsx)(L,{done:ce(e.status,i.status||"pending"),statusColor:l,onClick:()=>(async(e,t,i)=>{try{const r=n.find(t=>t.id===e);if(!r)return;const a=r.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===i){const t=ue(r.status,e.status||"pending");return{...e,status:t}}return e}),n=t.every(e=>ce(r.status,e.status||"pending"))?ue(r.status,r.status):r.status;return{...e,set_items:t,status:n}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:a}:t)),le(a,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await de(e,t,!0)}}catch{re()}})(e.id,t.id,i.id),children:ce(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&o>1&&(0,p.jsx)(Z,{children:(0,p.jsx)(W,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const i=n.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>{const n={...e,status:t};return e.set_items&&e.set_items.length>0&&(n.set_items=e.set_items.map(e=>({...e,status:t}))),n}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})}),s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await de(e,t,!0)}catch{re()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&o>1&&(0,p.jsxs)(Z,{children:[(0,p.jsx)(Q,{onClick:()=>de(e.id,"pending"),children:"\u21ba"}),(0,p.jsx)(W,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=n.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await de(e,"ready",!0)}catch{re()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&o>1&&(0,p.jsxs)(Z,{children:[(0,p.jsx)(Q,{onClick:()=>de(e.id,"preparing"),children:"\u21ba"}),(0,p.jsx)(W,{color:"#10B981",onClick:()=>(async e=>{try{const t=n.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await de(e,"served",!0)}catch{re()}})(e.id),children:"Serve All"})]})]},e.id)};return(0,p.jsxs)(l,{children:[(0,p.jsx)(d.Ay,{title:"Kitchen Display",children:(0,p.jsxs)(m,{children:[(0,p.jsxs)(x,{connected:te,children:[(0,p.jsx)(y,{connected:te}),te?"Live":"Offline"]}),(0,p.jsx)(h,{children:(0,u.fU)(V,ie)})]})}),(0,p.jsx)(g,{children:(0,p.jsxs)(f,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{status:"pending",children:[(0,p.jsx)(_,{children:(0,p.jsx)(w,{status:"pending",children:"Pending"})}),(0,p.jsx)(A,{color:"#F59E0B",children:me.pending})]}),(0,p.jsx)(j,{children:ge("pending").map(he)})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{status:"preparing",children:[(0,p.jsx)(_,{children:(0,p.jsx)(w,{status:"preparing",children:"Preparing"})}),(0,p.jsx)(A,{color:"#3B82F6",children:me.preparing})]}),(0,p.jsx)(j,{children:ge("preparing").map(he)})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{status:"ready",children:[(0,p.jsx)(_,{children:(0,p.jsx)(w,{status:"ready",children:"Ready"})}),(0,p.jsx)(A,{color:"#10B981",children:me.ready})]}),(0,p.jsx)(j,{children:ge("ready").map(he)})]})]})})]})}},8012:(e,t,n)=>{n.d(t,{Ay:()=>d});n(9950);var i=n(4752),s=n(4414);const r=i.Ay.div`
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
`,a=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,o=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:n}=e;return(0,s.jsxs)(r,{children:[(0,s.jsx)(a,{children:t}),n&&(0,s.jsx)(o,{children:n})]})}},8406:(e,t,n)=>{n.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>r,ng:()=>i,oB:()=>a,r6:()=>s});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,t,n)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const r={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return s.toLocaleString("en-MY",{...r,...n})},r=(e,t)=>s(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const n=new Date;n.setDate(n.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(n)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,i=Math.floor(n/6e4),s=Math.floor(n/36e5),r=Math.floor(n/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===r?"1 day ago":`${r} days ago`}}}]);