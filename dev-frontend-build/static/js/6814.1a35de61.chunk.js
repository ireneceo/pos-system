"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,n)=>{n.r(t),n.d(t,{default:()=>X});var i=n(9950),r=n(4752),s=n(3422),a=n(1367),o=n(8930),d=n(8012),p=n(8406),u=n(4414);const c=e=>{const t=new Date(e),n=new Date(t.getTime()+18e5),i=e=>{const t=e.getHours(),n=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:n}},r=i(t),s=i(n);return r.period===s.period?`${r.time} - ${s.time} ${s.period}`:`${r.time} ${r.period} - ${s.time} ${s.period}`},l=r.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,m=r.Ay.div`
  padding: 16px 20px;
`,g=r.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,h=r.Ay.div`
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
`,v=r.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,b=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border: 2px solid ${e=>{switch(e.status){case"pending":return"#FBBF24";case"preparing":return"#60A5FA";case"ready":return"#34D399";default:return"#E6EBF1"}}};
`,_=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,w=r.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,A=r.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,j=r.Ay.div`
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
`,F=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,$=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,D=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,S=r.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,C=r.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,E=r.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,B=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,T=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,I=r.Ay.div`
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
  padding: 5px 8px;
  margin: 0 -8px;
  border-bottom: 1px solid #F6F9FC;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};

  &:last-child {
    border-bottom: none;
  }
`,P=r.Ay.div`
  flex: 1;
  min-width: 0;
`,M=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,O=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,J=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: #EDE9FE;
  color: #6D28D9;
`,H=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: #FEF2F2;
  color: #DC2626;
`,K=r.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  ${e=>e.highlight?"\n    background: #FEF2F2;\n    color: #DC2626;\n    padding: 2px 8px;\n    border-radius: 4px;\n    font-size: 15px;\n    letter-spacing: 1px;\n  ":"\n    color: inherit;\n  "}
`,L=r.Ay.button`
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
`,R=r.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,Y=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,U=r.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,Z=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,V={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},W=r.Ay.button`
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
`,Q=r.Ay.button`
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
`,G=r.Ay.div`
  margin-bottom: 4px;
`,X=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[n,r]=(0,i.useState)([]),[V,X]=(0,i.useState)(new Date),[,ee]=(0,i.useState)(null),[te,ne]=(0,i.useState)(!1),[ie,re]=(0,i.useState)(null),se=(0,i.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),i=await n.json();if(i.success&&i.data){const e=i.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const n=[];return t.forEach((t,i)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const s=t.set_items.map((n,r)=>({...n,id:`item-${e.id}-${i}-set-${r}`,name:n.name,quantity:n.quantity*(t.quantity||1),status:n.status||"pending"}));n.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;n.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:n,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});r(t=>{const n=new Set(t.map(e=>e.id));return e.filter(e=>!n.has(e.id)).length>0&&ae(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,i.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(n.ok){const e=await n.json();re(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{se();const e=setInterval(se,3e4);return()=>clearInterval(e)},[se]),(0,i.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{ne(!0),t.emit("join-restaurant",e.restaurantId),se()}),t.on("disconnect",()=>ne(!1)),t.on("connect_error",()=>ne(!1)),t.on("reconnect",()=>{ne(!0),se()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let n=t.order_items||[];if("string"===typeof n)try{n=JSON.parse(n)}catch{n=[]}const i=[];n.forEach((e,n)=>{const r=(e.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,s)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;i.push({id:`item-${t.id}-${n}-set-${s}`,name:r.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&i.push({id:`item-${t.id}-${n}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;i.push({id:`item-${t.id}-${n}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const s={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:i,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};r(e=>[s,...e]),ae()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&r(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!ue(e))))}),t.on("order-deleted",e=>{let{id:t}=e;r(e=>e.filter(e=>e.id!==t.toString()))}),ee(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{const e=setInterval(()=>X(new Date),1e3);return()=>clearInterval(e)},[]);const ae=()=>{new Audio("/notification.mp3").play().catch(()=>{})},oe=e=>{const n=(e=>{const n=t.find(t=>t.name===e);return(null===n||void 0===n?void 0:n.code)||""})(e);return n?`${n} ${e}`:e},de=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&r(n=>n.map(n=>n.id===e?{...n,status:t}:n).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!ue(e))));try{const n=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:t})});(await i.json()).success||se()}catch{se()}},pe=(e,t)=>{const n={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===n||"ready"===e&&"completed"===t?e:n},ue=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),ce=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},le=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>ce(t,e.status||"pending")):ce(t,e.status||"pending")),me=e=>n.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),ge={pending:me("pending").length,preparing:me("preparing").length,ready:me("ready").length},he=e=>{const t=(s=e.orderTime,Math.floor((V.getTime()-s.getTime())/1e3/60));var s;const a=t>15&&"pending"===e.status;let o=0,d=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(o+=t.set_items.length,d+=t.set_items.filter(t=>ce(e.status,t.status||"pending")).length):(o+=1,ce(e.status,t.status||"pending")&&(d+=1))});const p=o>0?d/o*100:0,l=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,u.jsxs)(F,{children:[(0,u.jsxs)($,{children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(D,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,u.jsx)(S,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,u.jsxs)(S,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,u.jsx)(S,{variant:"delivery",children:"DELIVERY"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(E,{children:e.orderNumber}),(0,u.jsxs)(B,{urgent:a,children:[t,"m"]})]})]}),o>1&&(0,u.jsxs)(T,{children:[(0,u.jsx)(I,{children:(0,u.jsx)(z,{percent:p,color:l})}),(0,u.jsxs)(N,{children:[d,"/",o]})]}),(0,u.jsx)(G,{children:e.items.map(t=>(0,u.jsxs)(i.Fragment,{children:[(0,u.jsxs)(q,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,u.jsxs)(P,{children:[t.is_set_menu?(0,u.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[oe(t.name)," ",t.quantity>1&&(0,u.jsxs)(K,{highlight:!0,children:["x ",t.quantity]})]}):(0,u.jsxs)(M,{done:ce(e.status,t.status||"pending")&&"pending"!==e.status,children:[oe(t.name)," ",t.quantity>1&&(0,u.jsxs)(K,{highlight:!0,children:["x ",t.quantity]})]}),(e=>{const n=(null===(e=t.options)||void 0===e?void 0:e.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==n.length||t.special_instructions?(0,u.jsxs)(O,{children:[n.map((e,t)=>(0,u.jsx)(J,{children:e},t)),t.special_instructions&&(0,u.jsx)(H,{children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===o&&(0,u.jsx)(Q,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&de(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,u.jsx)(L,{done:ce(e.status,t.status||"pending"),statusColor:l,onClick:()=>(async(e,t)=>{try{const i=n.find(t=>t.id===e);if(!i)return;const s=i.items.map(e=>{if(e.id===t){const t=pe(i.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),le(s,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await de(e,t,!0)}}catch(i){console.error("updateItemStatus error:",i),se()}})(e.id,t.id),children:ce(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,u.jsx)(R,{children:t.set_items.map(i=>(0,u.jsxs)(Y,{done:ce(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,u.jsxs)(U,{done:ce(e.status,i.status||"pending")&&"pending"!==e.status,children:[oe(i.name)," ",i.quantity>1&&(0,u.jsxs)(K,{highlight:!0,children:["x ",i.quantity]})]}),(0,u.jsx)(L,{done:ce(e.status,i.status||"pending"),statusColor:l,onClick:()=>(async(e,t,i)=>{try{const s=n.find(t=>t.id===e);if(!s)return;const a=s.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===i){const t=pe(s.status,e.status||"pending");return{...e,status:t}}return e}),n=t.every(e=>ce(s.status,e.status||"pending"))?pe(s.status,s.status):s.status;return{...e,set_items:t,status:n}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:a}:t)),le(a,s.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[s.status];t&&await de(e,t,!0)}}catch{se()}})(e.id,t.id,i.id),children:ce(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&o>1&&(0,u.jsx)(Z,{children:(0,u.jsx)(W,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const i=n.find(t=>t.id===e);if(!i)return;const s=i.items.map(e=>{const n={...e,status:t};return e.set_items&&e.set_items.length>0&&(n.set_items=e.set_items.map(e=>({...e,status:t}))),n}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})}),r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await de(e,t,!0)}catch{se()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&o>1&&(0,u.jsxs)(Z,{children:[(0,u.jsx)(Q,{onClick:()=>de(e.id,"pending"),children:"\u21ba"}),(0,u.jsx)(W,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=n.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),s=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await de(e,"ready",!0)}catch{se()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&o>1&&(0,u.jsxs)(Z,{children:[(0,u.jsx)(Q,{onClick:()=>de(e.id,"preparing"),children:"\u21ba"}),(0,u.jsx)(W,{color:"#10B981",onClick:()=>(async e=>{try{const t=n.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),s=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await de(e,"served",!0)}catch{se()}})(e.id),children:"Serve All"})]})]},e.id)};return(0,u.jsxs)(l,{children:[(0,u.jsx)(d.Ay,{title:"Kitchen Display",children:(0,u.jsxs)(g,{children:[(0,u.jsxs)(x,{connected:te,children:[(0,u.jsx)(y,{connected:te}),te?"Live":"Offline"]}),(0,u.jsx)(h,{children:(0,p.fU)(V,ie)})]})}),(0,u.jsx)(m,{children:(0,u.jsxs)(f,{children:[(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"pending",children:[(0,u.jsx)(_,{children:(0,u.jsx)(w,{status:"pending",children:"Pending"})}),(0,u.jsx)(A,{color:"#F59E0B",children:ge.pending})]}),(0,u.jsx)(j,{children:me("pending").map(he)})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"preparing",children:[(0,u.jsx)(_,{children:(0,u.jsx)(w,{status:"preparing",children:"Preparing"})}),(0,u.jsx)(A,{color:"#3B82F6",children:ge.preparing})]}),(0,u.jsx)(j,{children:me("preparing").map(he)})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"ready",children:[(0,u.jsx)(_,{children:(0,u.jsx)(w,{status:"ready",children:"Ready"})}),(0,u.jsx)(A,{color:"#10B981",children:ge.ready})]}),(0,u.jsx)(j,{children:me("ready").map(he)})]})]})})]})}},8012:(e,t,n)=>{n.d(t,{Ay:()=>d});n(9950);var i=n(4752),r=n(4414);const s=i.Ay.div`
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
`,d=e=>{let{title:t,children:n}=e;return(0,r.jsxs)(s,{children:[(0,r.jsx)(a,{children:t}),n&&(0,r.jsx)(o,{children:n})]})}},8406:(e,t,n)=>{n.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>s,ng:()=>i,oB:()=>a,r6:()=>r});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,n)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return r.toLocaleString("en-MY",{...s,...n})},s=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const n=new Date;n.setDate(n.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(n)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const n=Date.now()-t,i=Math.floor(n/6e4),r=Math.floor(n/36e5),s=Math.floor(n/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);