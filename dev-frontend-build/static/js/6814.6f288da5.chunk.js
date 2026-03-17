"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ne});var s=i(9950),n=i(4752),r=i(3422),a=i(1367),o=i(8930),d=i(8012),p=i(8406),l=i(4414);const u=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),s=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},n=s(t),r=s(i);return n.period===r.period?`${n.time} - ${r.time} ${r.period}`:`${n.time} ${n.period} - ${r.time} ${r.period}`},c=n.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,m=n.Ay.div`
  padding: 16px 20px;
`,g=n.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,h=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,y=n.Ay.div`
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
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,b=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border: 2px solid ${e=>{switch(e.status){case"pending":return"#FBBF24";case"preparing":return"#60A5FA";case"ready":return"#34D399";default:return"#E6EBF1"}}};
`,_=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,j=n.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,w=n.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,A=n.Ay.div`
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
`,$=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,S=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,k=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,T=n.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,E=n.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,C=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,D=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,I=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,B=n.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,N=n.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,z=n.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,q=n.Ay.div`
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
`,P=n.Ay.div`
  flex: 1;
  min-width: 0;
`,M=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,O=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,J=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,H=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,Q=n.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,K=n.Ay.button`
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
`,L=n.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,R=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,Y=n.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,V=n.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,W={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},U=n.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${e=>{var t;return(null===(t=W[e.color])||void 0===t?void 0:t.text)||e.color}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t;return(null===(t=W[e.color])||void 0===t?void 0:t.bg)||e.color}};
  color: ${e=>{var t;return(null===(t=W[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t;return(null===(t=W[e.color])||void 0===t?void 0:t.hoverBg)||e.color}};
  }
`,Z=n.Ay.button`
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
`,G=n.Ay.div`
  margin-bottom: 4px;
`,X=n.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,ee=n.Ay.button`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.active?"white":"transparent"};
  color: ${e=>e.active?"#0A2540":"#6B7C93"};
  box-shadow: ${e=>e.active?"0 1px 2px rgba(0,0,0,0.08)":"none"};
`,te=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,ie=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,se=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ne=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,n]=(0,s.useState)([]),[W,ne]=(0,s.useState)(new Date),[,re]=(0,s.useState)(null),[ae,oe]=(0,s.useState)(!1),[de,pe]=(0,s.useState)(null),[le,ue]=(0,s.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),ce=(0,s.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),s=await i.json();if(s.success&&s.data){const e=s.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,s)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var n;const r=t.set_items.map((i,n)=>({...i,id:`item-${e.id}-${s}-set-${n}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${s}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:r})}else{var r;i.push({...t,id:`item-${e.id}-${s}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});n(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&me(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,s.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();pe(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,s.useEffect)(()=>{ce();const e=setInterval(ce,3e4);return()=>clearInterval(e)},[ce]),(0,s.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,r.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{oe(!0),t.emit("join-restaurant",e.restaurantId),ce()}),t.on("disconnect",()=>oe(!1)),t.on("connect_error",()=>oe(!1)),t.on("reconnect",()=>{oe(!0),ce()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const s=[];i.forEach((e,i)=>{const n=(e.special_instructions||"").match(/^\[(.*?)\]/);if(n){n[1].split(",").map(e=>e.trim()).forEach((n,r)=>{const a=n.match(/^(.*?)\s+x(\d+)$/);if(a){const[,n,o]=a;s.push({id:`item-${t.id}-${i}-set-${r}`,name:n.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&s.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var r;s.push({id:`item-${t.id}-${i}`,name:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const r={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:s,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};n(e=>[r,...e]),me()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&n(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))))}),t.on("order-deleted",e=>{let{id:t}=e;n(e=>e.filter(e=>e.id!==t.toString()))}),re(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,s.useEffect)(()=>{const e=setInterval(()=>ne(new Date),1e3);return()=>clearInterval(e)},[]);const me=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ge=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},he=e=>Math.floor((W.getTime()-e.getTime())/1e3/60),xe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&n(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))));try{const i=localStorage.getItem("auth_token"),s=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await s.json()).success||ce()}catch{ce()}},ye=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},fe=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),ve=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},be=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>ve(t,e.status||"pending")):ve(t,e.status||"pending")),_e=async(e,t)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const r=s.items.map(e=>{if(e.id===t){const t=ye(s.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(n(t=>t.map(t=>t.id===e?{...t,items:r}:t)),be(r,s.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[s.status];t&&await xe(e,t,!0)}}catch(s){console.error("updateItemStatus error:",s),ce()}},je=async(e,t,s)=>{try{const r=i.find(t=>t.id===e);if(!r)return;const a=r.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===s){const t=ye(r.status,e.status||"pending");return{...e,status:t}}return e}),i=t.every(e=>ve(r.status,e.status||"pending"))?ye(r.status,r.status):r.status;return{...e,set_items:t,status:i}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(n(t=>t.map(t=>t.id===e?{...t,items:a}:t)),be(a,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await xe(e,t,!0)}}catch{ce()}},we=async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const s=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;n(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await xe(e,"served",!0)}catch{ce()}},Ae=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),$e={pending:Ae("pending").length,preparing:Ae("preparing").length,ready:Ae("ready").length},Se=e=>{const t=he(e.orderTime),r=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>ve(e.status,t.status||"pending")).length):(a+=1,ve(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,p=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(C,{children:e.orderNumber}),(0,l.jsxs)(D,{urgent:r,children:[t,"m"]})]})]}),a>1&&(0,l.jsxs)(I,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(N,{percent:d,color:p})}),(0,l.jsxs)(z,{children:[o,"/",a]})]}),(0,l.jsx)(G,{children:e.items.map(t=>(0,l.jsxs)(s.Fragment,{children:[(0,l.jsxs)(q,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(P,{children:[t.is_set_menu?(0,l.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,l.jsxs)(M,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const s=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==s.length||t.special_instructions?(0,l.jsxs)(O,{children:[s.map((i,s)=>(0,l.jsx)(J,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:i},s)),t.special_instructions&&(0,l.jsx)(H,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,l.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&xe(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,l.jsx)(K,{done:ve(e.status,t.status||"pending"),statusColor:p,onClick:()=>_e(e.id,t.id),children:ve(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(L,{children:t.set_items.map(i=>(0,l.jsxs)(R,{done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(Y,{done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:[ge(i.name)," ",i.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,l.jsx)(K,{done:ve(e.status,i.status||"pending"),statusColor:p,onClick:()=>je(e.id,t.id,i.id),children:ve(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,l.jsx)(V,{children:(0,l.jsx)(U,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const r=s.items.map(e=>{const i={...e,status:t};return e.set_items&&e.set_items.length>0&&(i.set_items=e.set_items.map(e=>({...e,status:t}))),i}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})}),n(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await xe(e,t,!0)}catch{ce()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,l.jsxs)(V,{children:[(0,l.jsx)(Z,{onClick:()=>xe(e.id,"pending"),children:"\u21ba"}),(0,l.jsx)(U,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const s=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;n(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await xe(e,"ready",!0)}catch{ce()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,l.jsxs)(V,{children:[(0,l.jsx)(Z,{onClick:()=>xe(e.id,"preparing"),children:"\u21ba"}),(0,l.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})]})]},e.id)},Fe=e=>{const t=new Map;return i.filter(t=>t.status===e).forEach(i=>{const s=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{if(ve(e,n.status||"pending"))return;const r=n.name;t.has(r)||t.set(r,{menuName:n.name,formattedName:ge(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:i.orderTime});const a=t.get(r);a.plainQty+=n.quantity,i.orderTime<a.earliestTime&&(a.earliestTime=i.orderTime),a.plainSources.push({orderId:i.id,itemId:n.id,label:s,orderNumber:i.orderNumber,quantity:n.quantity,is_set_menu:!0})});else{var r;if(ve(e,n.status||"pending"))return;const a=n.name;t.has(a)||t.set(a,{menuName:n.name,formattedName:ge(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:i.orderTime});const o=t.get(a);i.orderTime<o.earliestTime&&(o.earliestTime=i.orderTime);const d=(null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!n.special_instructions?o.optionSources.push({orderId:i.id,itemId:n.id,label:s,orderNumber:i.orderNumber,quantity:n.quantity,options:d,special_instructions:n.special_instructions}):(o.plainQty+=n.quantity,o.plainSources.push({orderId:i.id,itemId:n.id,label:s,orderNumber:i.orderNumber,quantity:n.quantity}))}})}),Array.from(t.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())},ke=async(e,t)=>{const s=[...e.plainSources,...e.optionSources],r=new Map;s.forEach(e=>{r.has(e.orderId)||r.set(e.orderId,new Set),r.get(e.orderId).add(e.itemId)});const a=localStorage.getItem("auth_token");for(const[o,d]of Array.from(r.entries())){const e=i.find(e=>e.id===o);if(!e)continue;const s=e.items.map(i=>{if(i.is_set_menu&&i.set_items){const s=i.set_items.map(i=>{if(!d.has(i.id))return i;if("forward"===t)return{...i,status:ye(e.status,i.status||"pending")};{const e={preparing:"pending",ready:"preparing",served:"ready"};return{...i,status:e[i.status||"pending"]||i.status}}}),n=s.every(t=>ve(e.status,t.status||"pending"))?ye(e.status,e.status):e.status;return{...i,set_items:s,status:n}}if(!d.has(i.id))return i;if("forward"===t)return{...i,status:ye(e.status,i.status||"pending")};{const e={preparing:"pending",ready:"preparing",served:"ready"};return{...i,status:e[i.status||"pending"]||i.status}}});try{const i=await fetch(`/api/orders/${o}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await i.json()).success)return void ce();if(n(e=>e.map(e=>e.id===o?{...e,items:s}:e)),"forward"===t){if(be(s,e.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[e.status];t&&await xe(o,t,!0)}}else{const t={preparing:"pending",ready:"preparing",served:"ready"}[e.status];if(t){s.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>(e.status||"pending")===t):(e.status||"pending")===t)&&await xe(o,t,!0)}}}catch{return void ce()}}},Te=(e,t,i)=>{const s=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),n=e.plainSources.length+e.optionSources.length,r=new Map;e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const a=Array.from(r.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),o="pending"===i?"#F59E0B":"#3B82F6",d="pending"===i?n>1?"Start All":"Start":n>1?"Done All":"Done";return(0,l.jsxs)(te,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)(ie,{children:[e.formattedName,s>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",s]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:["preparing"===i&&(0,l.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px"},onClick:()=>ke(e,"revert"),children:"\u21ba"}),(0,l.jsx)(U,{color:o,style:{flex:"none",padding:"6px 14px",fontSize:"12px"},onClick:()=>ke(e,"forward"),children:d})]})]}),e.plainQty>0&&(0,l.jsx)(se,{children:a}),e.optionSources.length>0&&(0,l.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var s;return(0,l.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,l.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,l.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",t.quantity]})]}),(0,l.jsxs)(O,{children:[null===(s=t.options)||void 0===s?void 0:s.map((e,t)=>(0,l.jsx)(J,{children:e},t)),t.special_instructions&&(0,l.jsx)(H,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},Ee=()=>i.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!fe(e)).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return(0,l.jsxs)(c,{children:[(0,l.jsx)(d.Ay,{title:"Kitchen Display",children:(0,l.jsxs)(g,{children:[(0,l.jsxs)(X,{children:[(0,l.jsx)(ee,{active:"order"===le,onClick:()=>{ue("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,l.jsx)(ee,{active:"item"===le,onClick:()=>{ue("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,l.jsxs)(x,{connected:ae,children:[(0,l.jsx)(y,{connected:ae}),ae?"Live":"Offline"]}),(0,l.jsx)(h,{children:(0,p.fU)(W,de)})]})}),(0,l.jsx)(m,{children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"pending",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"pending",children:"Pending"})}),(0,l.jsx)(w,{color:"#F59E0B",children:$e.pending})]}),(0,l.jsx)(A,{children:"order"===le?Ae("pending").map(Se):Fe("pending").map((e,t)=>Te(e,t,"pending"))})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"preparing",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,l.jsx)(w,{color:"#3B82F6",children:"order"===le?$e.preparing:Fe("preparing").reduce((e,t)=>e+t.plainSources.length+t.optionSources.length,0)})]}),(0,l.jsx)(A,{children:"order"===le?Ae("preparing").map(Se):Fe("preparing").map((e,t)=>Te(e,t,"preparing"))})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"ready",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"ready",children:"Ready"})}),(0,l.jsx)(w,{color:"#10B981",children:"order"===le?$e.ready:Ee().length})]}),(0,l.jsx)(A,{children:"order"===le?Ae("ready").map(Se):Ee().map(e=>{const t=he(e.orderTime),i="#10B981";let s=0,r=0,a=0;const o=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{s++;const i=t.status||"pending";"ready"===i&&r++,"served"!==i&&"completed"!==i||a++,o.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;s++;const i=e.status||"pending";"ready"===i&&r++,"served"!==i&&"completed"!==i||a++,o.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const d=s-r-a,p=s>0?a/s*100:0,c=o.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===c.length?null:(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(C,{children:e.orderNumber}),(0,l.jsxs)(D,{children:[t,"m"]})]})]}),s>1&&(0,l.jsxs)(I,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(N,{percent:p,color:i})}),(0,l.jsxs)(z,{children:[a,"/",s]})]}),(0,l.jsx)(G,{children:c.map((t,s)=>{var r;const a="served"===t.status||"completed"===t.status;return(0,l.jsxs)(q,{done:a,children:[(0,l.jsxs)(P,{children:[(0,l.jsxs)(M,{done:a,children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:a,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,l.jsxs)(O,{children:[null===(r=t.options)||void 0===r?void 0:r.map((e,t)=>(0,l.jsx)(J,{done:a,children:e},t)),t.special_instructions&&(0,l.jsx)(H,{done:a,children:t.special_instructions})]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!a&&(0,l.jsx)(Z,{style:{padding:"4px 8px",fontSize:"11px"},onClick:async()=>{const i=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"}),s=localStorage.getItem("auth_token");try{const t=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await t.json()).success)return void ce();n(t=>t.map(t=>t.id===e.id?{...t,items:i}:t)),i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await xe(e.id,"preparing",!0)}catch{ce()}},children:"\u21ba"}),(0,l.jsx)(K,{done:a,statusColor:i,onClick:()=>{t.isSetItem&&t.parentId?je(e.id,t.parentId,t.id):_e(e.id,t.id)},children:a?"Served":"Serve"})]})]},s)})}),d>0&&(0,l.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&c.length>1&&c.some(e=>"ready"===e.status)&&(0,l.jsx)(V,{children:(0,l.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var s=i(4752),n=i(4414);const r=s.Ay.div`
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
`,a=s.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,o=s.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:i}=e;return(0,n.jsxs)(r,{children:[(0,n.jsx)(a,{children:t}),i&&(0,n.jsx)(o,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>r,ng:()=>s,oB:()=>a,r6:()=>n});const s=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",n=(e,t,i)=>{if(!e)return"";const n=new Date(e);if(isNaN(n.getTime()))return"";const r={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:s(t)};return n.toLocaleString("en-MY",{...r,...i})},r=(e,t)=>n(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,s=Math.floor(i/6e4),n=Math.floor(i/36e5),r=Math.floor(i/864e5);return s<1?"just now":1===s?"1 min ago":s<60?`${s} mins ago`:1===n?"1 hour ago":n<24?`${n} hours ago`:1===r?"1 day ago":`${r} days ago`}}}]);