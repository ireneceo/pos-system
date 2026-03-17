"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ne});var r=i(9950),s=i(4752),n=i(3422),a=i(1367),o=i(8930),d=i(8012),p=i(8406),l=i(4414);const u=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),r=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},s=r(t),n=r(i);return s.period===n.period?`${s.time} - ${n.time} ${n.period}`:`${s.time} ${s.period} - ${n.time} ${n.period}`},c=s.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,m=s.Ay.div`
  padding: 16px 20px;
`,g=s.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,h=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,x=s.Ay.div`
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
`,j=s.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,w=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,A=s.Ay.div`
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
`,$=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,S=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,F=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,I=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,T=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,k=s.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,N=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,E=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,C=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,D=s.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,B=s.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,q=s.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,z=s.Ay.div`
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
`,Q=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,J=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,H=s.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,K=s.Ay.button`
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
`,L=s.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,R=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,W=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,Y=s.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,V={"#F59E0B":{bg:"#F59E0B",hoverBg:"#D97706"},"#3B82F6":{bg:"#3B82F6",hoverBg:"#2563EB"},"#10B981":{bg:"#10B981",hoverBg:"#059669"}},U={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},Z=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: ${e=>{var t;return e.solid?"none":`1px solid ${(null===(t=U[e.color])||void 0===t?void 0:t.text)||e.color}`}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t,i;return e.solid?(null===(t=V[e.color])||void 0===t?void 0:t.bg)||e.color:(null===(i=U[e.color])||void 0===i?void 0:i.bg)||e.color}};
  color: ${e=>{var t;return e.solid?"#FFFFFF":(null===(t=U[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t,i;return e.solid?(null===(t=V[e.color])||void 0===t?void 0:t.hoverBg)||e.color:(null===(i=U[e.color])||void 0===i?void 0:i.hoverBg)||e.color}};
  }
`,G=s.Ay.button`
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
`,X=s.Ay.div`
  margin-bottom: 4px;
`,ee=s.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,te=s.Ay.button`
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
`,ie=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,re=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,se=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ne=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,s]=(0,r.useState)([]),[V,U]=(0,r.useState)(new Date),[,ne]=(0,r.useState)(null),[ae,oe]=(0,r.useState)(!1),[de,pe]=(0,r.useState)(null),[le,ue]=(0,r.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),[ce,me]=(0,r.useState)([]),ge=(0,r.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),r=await i.json();if(r.success&&r.data){const e=r.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,r)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var s;const n=t.set_items.map((i,s)=>({...i,id:`item-${e.id}-${r}-set-${s}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${r}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:n})}else{var n;i.push({...t,id:`item-${e.id}-${r}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});s(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&he(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,r.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();pe(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,r.useEffect)(()=>{ge();const e=setInterval(ge,3e4);return()=>clearInterval(e)},[ge]),(0,r.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,n.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{oe(!0),t.emit("join-restaurant",e.restaurantId),ge()}),t.on("disconnect",()=>oe(!1)),t.on("connect_error",()=>oe(!1)),t.on("reconnect",()=>{oe(!0),ge()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const r=[];i.forEach((e,i)=>{const s=(e.special_instructions||"").match(/^\[(.*?)\]/);if(s){s[1].split(",").map(e=>e.trim()).forEach((s,n)=>{const a=s.match(/^(.*?)\s+x(\d+)$/);if(a){const[,s,o]=a;r.push({id:`item-${t.id}-${i}-set-${n}`,name:s.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&r.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var n;r.push({id:`item-${t.id}-${i}`,name:e.name||(null===(n=e.menuItem)||void 0===n?void 0:n.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const n={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:r,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};s(e=>[n,...e]),he()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&s(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!be(e))))}),t.on("order-deleted",e=>{let{id:t}=e;s(e=>e.filter(e=>e.id!==t.toString()))}),ne(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,r.useEffect)(()=>{const e=setInterval(()=>U(new Date),1e3);return()=>clearInterval(e)},[]);const he=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ye=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},xe=e=>Math.floor((V.getTime()-e.getTime())/1e3/60),fe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&s(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!be(e))));try{const i=localStorage.getItem("auth_token"),r=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await r.json()).success||ge()}catch{ge()}},ve=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},be=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),_e=(e,t)=>{switch(e){case"pending":return"preparing"===t||"ready"===t||"served"===t||"completed"===t;case"preparing":return"ready"===t||"served"===t||"completed"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},je=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>_e(t,e.status||"pending")):_e(t,e.status||"pending")),we=async(e,t)=>{try{const r=i.find(t=>t.id===e);if(!r)return;const n=r.items.map(e=>{if(e.id===t){const t=ve(r.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:n}:t)),je(n,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await fe(e,t,!0)}}catch(r){console.error("updateItemStatus error:",r),ge()}},Ae=async(e,t,r)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const a=n.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===r){const t=ve(n.status,e.status||"pending");return{...e,status:t}}return e}),i=t.every(e=>_e(n.status,e.status||"pending"))?ve(n.status,n.status):n.status;return{...e,set_items:t,status:i}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:a}:t)),je(a,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await fe(e,t,!0)}}catch{ge()}},$e=async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const r=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),n=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await fe(e,"served",!0)}catch{ge()}},Se=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),Fe={pending:Se("pending").length,preparing:Se("preparing").length,ready:Se("ready").length},Ie=e=>{const t=xe(e.orderTime),n=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>_e(e.status,t.status||"pending")).length):(a+=1,_e(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,p=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(I,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(N,{children:e.orderNumber}),(0,l.jsxs)(E,{urgent:n,children:[t,"m"]})]})]}),a>1&&(0,l.jsxs)(C,{children:[(0,l.jsx)(D,{children:(0,l.jsx)(B,{percent:d,color:p})}),(0,l.jsxs)(q,{children:[o,"/",a]})]}),(0,l.jsx)(X,{children:e.items.map(t=>(0,l.jsxs)(r.Fragment,{children:[(0,l.jsxs)(z,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(P,{children:[t.is_set_menu?(0,l.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[ye(t.name)," ",t.quantity>1&&(0,l.jsxs)(H,{highlight:!0,done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,l.jsxs)(M,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:[ye(t.name)," ",t.quantity>1&&(0,l.jsxs)(H,{highlight:!0,done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const r=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==r.length||t.special_instructions?(0,l.jsxs)(O,{children:[r.map((i,r)=>(0,l.jsx)(Q,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:i},r)),t.special_instructions&&(0,l.jsx)(J,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,l.jsx)(G,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&fe(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,l.jsx)(K,{done:_e(e.status,t.status||"pending"),statusColor:p,onClick:()=>we(e.id,t.id),children:_e(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(L,{children:t.set_items.map(i=>(0,l.jsxs)(R,{done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(W,{done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:[ye(i.name)," ",i.quantity>1&&(0,l.jsxs)(H,{highlight:!0,done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,l.jsx)(K,{done:_e(e.status,i.status||"pending"),statusColor:p,onClick:()=>Ae(e.id,t.id,i.id),children:_e(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,l.jsx)(Y,{children:(0,l.jsx)(Z,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const r=i.find(t=>t.id===e);if(!r)return;const n=r.items.map(e=>{const i={...e,status:t};return e.set_items&&e.set_items.length>0&&(i.set_items=e.set_items.map(e=>({...e,status:t}))),i}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})}),s(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await fe(e,t,!0)}catch{ge()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,l.jsxs)(Y,{children:[(0,l.jsx)(G,{onClick:()=>fe(e.id,"pending"),children:"\u21ba"}),(0,l.jsx)(Z,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const r=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),n=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await fe(e,"ready",!0)}catch{ge()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,l.jsxs)(Y,{children:[(0,l.jsx)(G,{onClick:()=>fe(e.id,"preparing"),children:"\u21ba"}),(0,l.jsx)(Z,{color:"#10B981",onClick:()=>$e(e.id),children:"Serve All"})]})]},e.id)},Te=async(e,t,r)=>{const n=[...e.plainSources,...e.optionSources],a=new Map;n.forEach(e=>{a.has(e.orderId)||a.set(e.orderId,new Set),a.get(e.orderId).add(e.itemId)});const o=localStorage.getItem("auth_token"),d=Array.from(a.entries()).map(e=>{let[s,n]=e;const a=i.find(e=>e.id===s);if(!a)return null;const o=a.items.map(e=>{if(e.is_set_menu&&e.set_items){const i={pending:"preparing",preparing:"ready"},s={preparing:"pending",ready:"preparing",served:"ready"},o=r||a.status,d=e.set_items.map(e=>n.has(e.id)?"forward"===t?{...e,status:i[o]||"preparing"}:{...e,status:s[e.status||"pending"]||e.status}:e),p=d.every(e=>_e(a.status,e.status||"pending"))&&i[a.status]||a.status;return{...e,set_items:d,status:p}}if(!n.has(e.id))return e;const i={pending:"preparing",preparing:"ready"},s={preparing:"pending",ready:"preparing",served:"ready"},o=r||a.status;return"forward"===t?{...e,status:i[o]||"preparing"}:{...e,status:s[e.status||"pending"]||e.status}});return{orderId:s,order:a,updatedItems:o}}).filter(Boolean);try{if((await Promise.all(d.map(e=>{let{orderId:t,updatedItems:i}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void ge();s(e=>e.map(e=>{const t=d.find(t=>t.orderId===e.id);return t?{...e,items:t.updatedItems}:e}));const i=new Set(n.map(e=>e.itemId));if("forward"===t&&"pending"===r){const t=`batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;me(r=>[...r,{batchId:t,menuName:e.menuName,formattedName:e.formattedName,itemIds:i}])}else"revert"===t&&"preparing"===r&&me(e=>e.map(e=>{const t=new Set(Array.from(e.itemIds).filter(e=>!i.has(e)));return{...e,itemIds:t}}).filter(e=>e.itemIds.size>0));const a=d.map(e=>{let{orderId:i,order:r,updatedItems:s}=e;if("forward"===t){if(je(s,r.status)){const e={pending:"preparing",preparing:"ready",ready:"served"}[r.status];if(e)return fe(i,e,!0)}}else{const e={preparing:"pending",ready:"preparing",served:"ready"}[r.status];if(e){if(s.every(t=>t.is_set_menu&&t.set_items&&t.set_items.length>0?t.set_items.every(t=>(t.status||"pending")===e):(t.status||"pending")===e))return fe(i,e,!0)}}return Promise.resolve()});await Promise.all(a)}catch{ge()}},ke=(e,t,i)=>{const r=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),s=(e.plainSources.length,e.optionSources.length,new Map);e.plainSources.forEach(e=>{s.set(e.label,(s.get(e.label)||0)+e.quantity)});const n=Array.from(s.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),a="pending"===i?"#F59E0B":"#3B82F6",o=r<=1,d="pending"===i?o?"Start":"Start All":o?"Done":"Done All";return(0,l.jsxs)(ie,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)(re,{children:[e.formattedName,r>1&&(0,l.jsxs)(H,{highlight:!0,children:["x ",r]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:6,alignItems:"center"},children:["preparing"===i&&(0,l.jsx)(G,{style:{padding:"10px 14px",fontSize:"16px"},onClick:()=>Te(e,"revert",i),children:"\u21ba"}),(0,l.jsx)(Z,{color:a,solid:o,style:{flex:"none",padding:"10px 20px",fontSize:"14px"},onClick:()=>Te(e,"forward",i),children:d})]})]}),e.plainQty>0&&(0,l.jsx)(se,{children:n}),e.optionSources.length>0&&(0,l.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var r;return(0,l.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,l.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,l.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,l.jsxs)("span",{style:{fontSize:11,fontWeight:600,color:"#9CA3AF"},children:["x",t.quantity]})]}),(0,l.jsxs)(O,{children:[null===(r=t.options)||void 0===r?void 0:r.map((e,t)=>(0,l.jsx)(Q,{children:e},t)),t.special_instructions&&(0,l.jsx)(J,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},Ne=()=>i.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!be(e)).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return(0,l.jsxs)(c,{children:[(0,l.jsx)(d.Ay,{title:"Kitchen Display",children:(0,l.jsxs)(g,{children:[(0,l.jsxs)(ee,{children:[(0,l.jsx)(te,{active:"order"===le,onClick:()=>{ue("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,l.jsx)(te,{active:"item"===le,onClick:()=>{ue("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,l.jsxs)(y,{connected:ae,children:[(0,l.jsx)(x,{connected:ae}),ae?"Live":"Offline"]}),(0,l.jsx)(h,{children:(0,p.fU)(V,de)})]})}),(0,l.jsx)(m,{children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"pending",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"pending",children:"Pending"})}),(0,l.jsx)(w,{color:"#F59E0B",children:Fe.pending})]}),(0,l.jsx)(A,{children:"order"===le?Se("pending").map(Ie):(()=>{const e=new Map;return i.filter(e=>["pending","preparing"].includes(e.status)).forEach(t=>{const i=t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`;t.items.forEach(r=>{if(r.is_set_menu&&r.set_items&&r.set_items.length>0)r.set_items.forEach(r=>{if("pending"!==(r.status||"pending"))return;const s=r.name;e.has(s)||e.set(s,{menuName:r.name,formattedName:ye(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const n=e.get(s);n.plainQty+=r.quantity,t.orderTime<n.earliestTime&&(n.earliestTime=t.orderTime),n.plainSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity,is_set_menu:!0})});else{var s;if("pending"!==(r.status||"pending"))return;const n=r.name;e.has(n)||e.set(n,{menuName:r.name,formattedName:ye(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const a=e.get(n);t.orderTime<a.earliestTime&&(a.earliestTime=t.orderTime);const o=(null===(s=r.options)||void 0===s?void 0:s.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||r.special_instructions?a.optionSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity,options:o,special_instructions:r.special_instructions}):(a.plainQty+=r.quantity,a.plainSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity}))}})}),Array.from(e.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})().map((e,t)=>ke(e,t,"pending"))})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"preparing",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,l.jsx)(w,{color:"#3B82F6",children:"order"===le?Fe.preparing:i.filter(e=>"preparing"===e.status).reduce((e,t)=>e+t.items.filter(e=>e.is_set_menu&&e.set_items?e.set_items.some(e=>"preparing"===(e.status||"pending")):"preparing"===(e.status||"pending")).length,0)})]}),(0,l.jsx)(A,{children:"order"===le?Se("preparing").map(Ie):(()=>{const e=[],t=new Set;return ce.forEach(r=>{const s={menuName:r.menuName,formattedName:r.formattedName,plainQty:0,plainSources:[],optionSources:[],earliestTime:new Date};let n=!1;i.filter(e=>["preparing","pending"].includes(e.status)).forEach(e=>{const i=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(a=>{if(a.is_set_menu&&a.set_items&&a.set_items.length>0)a.set_items.forEach(a=>{r.itemIds.has(a.id)&&"preparing"===(a.status||"pending")&&(t.add(a.id),n=!0,s.plainQty+=a.quantity,s.plainSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity,is_set_menu:!0}),e.orderTime<s.earliestTime&&(s.earliestTime=e.orderTime))});else{var o;if(!r.itemIds.has(a.id))return;if("preparing"!==(a.status||"pending"))return;t.add(a.id),n=!0,e.orderTime<s.earliestTime&&(s.earliestTime=e.orderTime);const d=(null===(o=a.options)||void 0===o?void 0:o.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!a.special_instructions?s.optionSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity,options:d,special_instructions:a.special_instructions}):(s.plainQty+=a.quantity,s.plainSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity}))}})}),n&&e.push(s)}),i.filter(e=>"preparing"===e.status).forEach(i=>{const r=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(s=>{if(s.is_set_menu&&s.set_items&&s.set_items.length>0)s.set_items.forEach(s=>{t.has(s.id)||"preparing"===(s.status||"pending")&&e.push({menuName:s.name,formattedName:ye(s.name),plainQty:s.quantity,plainSources:[{orderId:i.id,itemId:s.id,label:r,orderNumber:i.orderNumber,quantity:s.quantity,is_set_menu:!0}],optionSources:[],earliestTime:i.orderTime})});else{var n;if(t.has(s.id))return;if("preparing"!==(s.status||"pending"))return;const a=(null===(n=s.options)||void 0===n?void 0:n.filter(e=>!/^.+\sx\d+$/.test(e)))||[],o=a.length>0||!!s.special_instructions;e.push({menuName:s.name,formattedName:ye(s.name),plainQty:o?0:s.quantity,plainSources:o?[]:[{orderId:i.id,itemId:s.id,label:r,orderNumber:i.orderNumber,quantity:s.quantity}],optionSources:o?[{orderId:i.id,itemId:s.id,label:r,orderNumber:i.orderNumber,quantity:s.quantity,options:a,special_instructions:s.special_instructions}]:[],earliestTime:i.orderTime})}})}),e.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime()),e.map((e,t)=>ke(e,t,"preparing"))})()})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"ready",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"ready",children:"Ready"})}),(0,l.jsx)(w,{color:"#10B981",children:"order"===le?Fe.ready:Ne().length})]}),(0,l.jsx)(A,{children:"order"===le?Se("ready").map(Ie):Ne().map(e=>{const t=xe(e.orderTime),i="#10B981";let r=0,n=0,a=0;const o=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{r++;const i=t.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||a++,o.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;r++;const i=e.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||a++,o.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const d=r-n-a,p=r>0?a/r*100:0,c=o.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===c.length?null:(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(I,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(N,{children:e.orderNumber}),(0,l.jsxs)(E,{children:[t,"m"]})]})]}),r>1&&(0,l.jsxs)(C,{children:[(0,l.jsx)(D,{children:(0,l.jsx)(B,{percent:p,color:i})}),(0,l.jsxs)(q,{children:[a,"/",r]})]}),(0,l.jsx)(X,{children:c.map((t,r)=>{var n;const a="served"===t.status||"completed"===t.status;return(0,l.jsxs)(z,{done:a,children:[(0,l.jsxs)(P,{children:[(0,l.jsxs)(M,{done:a,children:[ye(t.name)," ",t.quantity>1&&(0,l.jsxs)(H,{highlight:!0,done:a,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,l.jsxs)(O,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,l.jsx)(Q,{done:a,children:e},t)),t.special_instructions&&(0,l.jsx)(J,{done:a,children:t.special_instructions})]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!a&&(0,l.jsx)(G,{style:{padding:"4px 8px",fontSize:"11px"},onClick:async()=>{const i=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"}),r=localStorage.getItem("auth_token");try{const n=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await n.json()).success)return void ge();s(t=>t.map(t=>t.id===e.id?{...t,items:i}:t)),me(e=>[...e,{batchId:`batch-revert-${Date.now()}`,menuName:t.name,formattedName:ye(t.name),itemIds:new Set([t.id])}]),i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await fe(e.id,"preparing",!0)}catch{ge()}},children:"\u21ba"}),(0,l.jsx)(K,{done:a,statusColor:i,onClick:()=>{t.isSetItem&&t.parentId?Ae(e.id,t.parentId,t.id):we(e.id,t.id)},children:a?"Served":"Serve"})]})]},r)})}),d>0&&(0,l.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&c.length>1&&c.some(e=>"ready"===e.status)&&(0,l.jsx)(Y,{children:(0,l.jsx)(Z,{color:"#10B981",onClick:()=>$e(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var r=i(4752),s=i(4414);const n=r.Ay.div`
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
`,a=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,o=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:i}=e;return(0,s.jsxs)(n,{children:[(0,s.jsx)(a,{children:t}),i&&(0,s.jsx)(o,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>n,ng:()=>r,oB:()=>a,r6:()=>s});const r=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,t,i)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const n={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:r(t)};return s.toLocaleString("en-MY",{...n,...i})},n=(e,t)=>s(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,r=Math.floor(i/6e4),s=Math.floor(i/36e5),n=Math.floor(i/864e5);return r<1?"just now":1===r?"1 min ago":r<60?`${r} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===n?"1 day ago":`${n} days ago`}}}]);