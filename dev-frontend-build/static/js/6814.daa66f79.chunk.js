"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>se});var n=i(9950),s=i(4752),r=i(3422),a=i(1367),o=i(8930),d=i(8012),l=i(8406),c=i(4414);const p=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},s=n(t),r=n(i);return s.period===r.period?`${s.time} - ${r.time} ${r.period}`:`${s.time} ${s.period} - ${r.time} ${r.period}`},u=s.Ay.div`
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
`,j=s.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,A=s.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,w=s.Ay.div`
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
`,F=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,k=s.Ay.div`
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
`,E=s.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,C=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,D=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,I=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,B=s.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,N=s.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,z=s.Ay.div`
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
`,Q=s.Ay.span`
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
`,Y=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,V=s.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,W={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},U=s.Ay.button`
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
`,Z=s.Ay.button`
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
`,X=s.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,ee=s.Ay.button`
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
`,te=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,ie=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,ne=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,se=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,s]=(0,n.useState)([]),[W,se]=(0,n.useState)(new Date),[,re]=(0,n.useState)(null),[ae,oe]=(0,n.useState)(!1),[de,le]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),ue=(0,n.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),n=await i.json();if(n.success&&n.data){const e=n.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var s;const r=t.set_items.map((i,s)=>({...i,id:`item-${e.id}-${n}-set-${s}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:r})}else{var r;i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});s(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&me(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,n.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();le(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{ue();const e=setInterval(ue,3e4);return()=>clearInterval(e)},[ue]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,r.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{oe(!0),t.emit("join-restaurant",e.restaurantId),ue()}),t.on("disconnect",()=>oe(!1)),t.on("connect_error",()=>oe(!1)),t.on("reconnect",()=>{oe(!0),ue()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const n=[];i.forEach((e,i)=>{const s=(e.special_instructions||"").match(/^\[(.*?)\]/);if(s){s[1].split(",").map(e=>e.trim()).forEach((s,r)=>{const a=s.match(/^(.*?)\s+x(\d+)$/);if(a){const[,s,o]=a;n.push({id:`item-${t.id}-${i}-set-${r}`,name:s.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&n.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var r;n.push({id:`item-${t.id}-${i}`,name:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const r={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:n,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};s(e=>[r,...e]),me()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&s(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))))}),t.on("order-deleted",e=>{let{id:t}=e;s(e=>e.filter(e=>e.id!==t.toString()))}),re(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>se(new Date),1e3);return()=>clearInterval(e)},[]);const me=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ge=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},he=e=>Math.floor((W.getTime()-e.getTime())/1e3/60),xe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&s(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))));try{const i=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await n.json()).success||ue()}catch{ue()}},ye=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},fe=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),ve=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},be=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>ve(t,e.status||"pending")):ve(t,e.status||"pending")),_e=async(e,t,n,r)=>{try{const a=i.find(t=>t.id===e);if(!a)return;const o=a.items.map(e=>{if(r&&e.id===r&&e.set_items){const i=e.set_items.map(e=>e.id===t?{...e,status:n}:e);return{...e,set_items:i}}return r||e.id!==t?e:{...e,status:n}}),d=localStorage.getItem("auth_token"),l=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify({order_items:o.map(e=>({...e,status:e.status}))})});if(!(await l.json()).success)return void ue();s(t=>t.map(t=>t.id===e?{...t,items:o}:t))}catch(a){console.error("setItemStatusDirect error:",a),ue()}},je=async(e,t)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const r=n.items.map(e=>{if(e.id===t){const t=ye(n.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),be(r,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await xe(e,t,!0)}}catch(n){console.error("updateItemStatus error:",n),ue()}},Ae=async(e,t,n)=>{try{const r=i.find(t=>t.id===e);if(!r)return;const a=r.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===n){const t=ye(r.status,e.status||"pending");return{...e,status:t}}return e}),i=t.every(e=>ve(r.status,e.status||"pending"))?ye(r.status,r.status):r.status;return{...e,set_items:t,status:i}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(s(t=>t.map(t=>t.id===e?{...t,items:a}:t)),be(a,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await xe(e,t,!0)}}catch{ue()}},we=async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const n=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await xe(e,"served",!0)}catch{ue()}},$e=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),Fe={pending:$e("pending").length,preparing:$e("preparing").length,ready:$e("ready").length},Se=e=>{const t=he(e.orderTime),r=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>ve(e.status,t.status||"pending")).length):(a+=1,ve(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,l=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,c.jsxs)($,{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,c.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(C,{children:e.orderNumber}),(0,c.jsxs)(D,{urgent:r,children:[t,"m"]})]})]}),a>1&&(0,c.jsxs)(I,{children:[(0,c.jsx)(B,{children:(0,c.jsx)(N,{percent:d,color:l})}),(0,c.jsxs)(z,{children:[o,"/",a]})]}),(0,c.jsx)(G,{children:e.items.map(t=>(0,c.jsxs)(n.Fragment,{children:[(0,c.jsxs)(q,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,c.jsxs)(P,{children:[t.is_set_menu?(0,c.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[ge(t.name)," ",t.quantity>1&&(0,c.jsxs)(H,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,c.jsxs)(M,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[ge(t.name)," ",t.quantity>1&&(0,c.jsxs)(H,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const n=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==n.length||t.special_instructions?(0,c.jsxs)(O,{children:[n.map((i,n)=>(0,c.jsx)(J,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:i},n)),t.special_instructions&&(0,c.jsx)(Q,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,c.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&xe(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,c.jsx)(K,{done:ve(e.status,t.status||"pending"),statusColor:l,onClick:()=>je(e.id,t.id),children:ve(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,c.jsx)(L,{children:t.set_items.map(i=>(0,c.jsxs)(R,{done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,c.jsxs)(Y,{done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:[ge(i.name)," ",i.quantity>1&&(0,c.jsxs)(H,{highlight:!0,done:ve(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,c.jsx)(K,{done:ve(e.status,i.status||"pending"),statusColor:l,onClick:()=>Ae(e.id,t.id,i.id),children:ve(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,c.jsx)(V,{children:(0,c.jsx)(U,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const r=n.items.map(e=>{const i={...e,status:t};return e.set_items&&e.set_items.length>0&&(i.set_items=e.set_items.map(e=>({...e,status:t}))),i}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})}),s(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await xe(e,t,!0)}catch{ue()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,c.jsxs)(V,{children:[(0,c.jsx)(Z,{onClick:()=>xe(e.id,"pending"),children:"\u21ba"}),(0,c.jsx)(U,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const n=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;s(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await xe(e,"ready",!0)}catch{ue()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,c.jsxs)(V,{children:[(0,c.jsx)(Z,{onClick:()=>xe(e.id,"preparing"),children:"\u21ba"}),(0,c.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})]})]},e.id)},ke=e=>{const t=new Map;return i.filter(t=>t.status===e).forEach(i=>{const n=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(s=>{if(s.is_set_menu&&s.set_items&&s.set_items.length>0)s.set_items.forEach(s=>{if(ve(e,s.status||"pending"))return;const r=s.name;t.has(r)||t.set(r,{menuName:s.name,formattedName:ge(s.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:i.orderTime});const a=t.get(r);a.plainQty+=s.quantity,i.orderTime<a.earliestTime&&(a.earliestTime=i.orderTime),a.plainSources.push({orderId:i.id,itemId:s.id,label:n,orderNumber:i.orderNumber,quantity:s.quantity,is_set_menu:!0})});else{var r;if(ve(e,s.status||"pending"))return;const a=s.name;t.has(a)||t.set(a,{menuName:s.name,formattedName:ge(s.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:i.orderTime});const o=t.get(a);i.orderTime<o.earliestTime&&(o.earliestTime=i.orderTime);const d=(null===(r=s.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!s.special_instructions?o.optionSources.push({orderId:i.id,itemId:s.id,label:n,orderNumber:i.orderNumber,quantity:s.quantity,options:d,special_instructions:s.special_instructions}):(o.plainQty+=s.quantity,o.plainSources.push({orderId:i.id,itemId:s.id,label:n,orderNumber:i.orderNumber,quantity:s.quantity}))}})}),Array.from(t.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())},Te=(e,t,n)=>{const s=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),r=e.plainSources.length+e.optionSources.length,a=new Map;e.plainSources.forEach(e=>{a.set(e.label,(a.get(e.label)||0)+e.quantity)});const o=Array.from(a.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),d="pending"===n?"#F59E0B":"#3B82F6",l="pending"===n?r>1?"Start All":"Start":r>1?"Done All":"Done";return(0,c.jsxs)(te,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,c.jsxs)(ie,{children:[e.formattedName,s>1&&(0,c.jsxs)(H,{highlight:!0,children:["x ",s]})]}),(0,c.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:["preparing"===n&&(0,c.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px"},onClick:()=>(async e=>{const t=[...e.plainSources,...e.optionSources];for(const n of t)if(n.is_set_menu){const e=i.find(e=>e.id===n.orderId);if(!e)continue;for(const t of e.items)t.set_items&&t.set_items.find(e=>e.id===n.itemId)&&await _e(n.orderId,n.itemId,"pending",t.id)}else await _e(n.orderId,n.itemId,"pending")})(e),children:"\u21ba"}),(0,c.jsx)(U,{color:d,style:{flex:"none",padding:"6px 14px",fontSize:"12px"},onClick:()=>(async e=>{const t=[...e.plainSources,...e.optionSources];for(const n of t)if(n.is_set_menu){const e=i.find(e=>e.id===n.orderId);if(!e)continue;for(const t of e.items)if(t.set_items){const i=t.set_items.find(e=>e.id===n.itemId);i&&!ve(e.status,i.status||"pending")&&await Ae(n.orderId,t.id,n.itemId)}}else await je(n.orderId,n.itemId)})(e),children:l})]})]}),e.plainQty>0&&(0,c.jsx)(ne,{children:o}),e.optionSources.length>0&&(0,c.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var n;return(0,c.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,c.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,c.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,c.jsxs)(H,{highlight:!0,children:["x ",t.quantity]})]}),(0,c.jsxs)(O,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,c.jsx)(J,{children:e},t)),t.special_instructions&&(0,c.jsx)(Q,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${n}-group-${t}`)},Ee=()=>i.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!fe(e)).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return(0,c.jsxs)(u,{children:[(0,c.jsx)(d.Ay,{title:"Kitchen Display",children:(0,c.jsxs)(g,{children:[(0,c.jsxs)(X,{children:[(0,c.jsx)(ee,{active:"order"===ce,onClick:()=>{pe("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,c.jsx)(ee,{active:"item"===ce,onClick:()=>{pe("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,c.jsxs)(x,{connected:ae,children:[(0,c.jsx)(y,{connected:ae}),ae?"Live":"Offline"]}),(0,c.jsx)(h,{children:(0,l.fU)(W,de)})]})}),(0,c.jsx)(m,{children:(0,c.jsxs)(f,{children:[(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{status:"pending",children:[(0,c.jsx)(_,{children:(0,c.jsx)(j,{status:"pending",children:"Pending"})}),(0,c.jsx)(A,{color:"#F59E0B",children:Fe.pending})]}),(0,c.jsx)(w,{children:"order"===ce?$e("pending").map(Se):ke("pending").map((e,t)=>Te(e,t,"pending"))})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{status:"preparing",children:[(0,c.jsx)(_,{children:(0,c.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,c.jsx)(A,{color:"#3B82F6",children:"order"===ce?Fe.preparing:ke("preparing").reduce((e,t)=>e+t.plainSources.length+t.optionSources.length,0)})]}),(0,c.jsx)(w,{children:"order"===ce?$e("preparing").map(Se):ke("preparing").map((e,t)=>Te(e,t,"preparing"))})]}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{status:"ready",children:[(0,c.jsx)(_,{children:(0,c.jsx)(j,{status:"ready",children:"Ready"})}),(0,c.jsx)(A,{color:"#10B981",children:"order"===ce?Fe.ready:Ee().length})]}),(0,c.jsx)(w,{children:"order"===ce?$e("ready").map(Se):Ee().map(e=>{const t=he(e.orderTime),i="#10B981";let n=0,s=0,r=0;const a=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{n++;const i=t.status||"pending";"ready"===i&&s++,"served"!==i&&"completed"!==i||r++,a.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;n++;const i=e.status||"pending";"ready"===i&&s++,"served"!==i&&"completed"!==i||r++,a.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const o=n-s-r,d=n>0?r/n*100:0,l=a.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===l.length?null:(0,c.jsxs)($,{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,c.jsx)(T,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(T,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?p(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(T,{variant:"delivery",children:"DELIVERY"})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(C,{children:e.orderNumber}),(0,c.jsxs)(D,{children:[t,"m"]})]})]}),n>1&&(0,c.jsxs)(I,{children:[(0,c.jsx)(B,{children:(0,c.jsx)(N,{percent:d,color:i})}),(0,c.jsxs)(z,{children:[r,"/",n]})]}),(0,c.jsx)(G,{children:l.map((t,n)=>{var s;const r="served"===t.status||"completed"===t.status;return(0,c.jsxs)(q,{done:r,children:[(0,c.jsxs)(P,{children:[(0,c.jsxs)(M,{done:r,children:[ge(t.name)," ",t.quantity>1&&(0,c.jsxs)(H,{highlight:!0,done:r,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,c.jsxs)(O,{children:[null===(s=t.options)||void 0===s?void 0:s.map((e,t)=>(0,c.jsx)(J,{done:r,children:e},t)),t.special_instructions&&(0,c.jsx)(Q,{done:r,children:t.special_instructions})]})]}),(0,c.jsx)(K,{done:r,statusColor:i,onClick:()=>{const i=r?"ready":"served";_e(e.id,t.id,i,t.isSetItem?t.parentId:void 0)},children:r?"Served":"Serve"})]},n)})}),o>0&&(0,c.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",o," item",o>1?"s":""," from kitchen"]}),0===o&&l.some(e=>"ready"===e.status)&&(0,c.jsxs)(V,{children:[(0,c.jsx)(Z,{onClick:()=>xe(e.id,"preparing"),children:"\u21ba"}),(0,c.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})]})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var n=i(4752),s=i(4414);const r=n.Ay.div`
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
`,d=e=>{let{title:t,children:i}=e;return(0,s.jsxs)(r,{children:[(0,s.jsx)(a,{children:t}),i&&(0,s.jsx)(o,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>r,ng:()=>n,oB:()=>a,r6:()=>s});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",s=(e,t,i)=>{if(!e)return"";const s=new Date(e);if(isNaN(s.getTime()))return"";const r={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return s.toLocaleString("en-MY",{...r,...i})},r=(e,t)=>s(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,n=Math.floor(i/6e4),s=Math.floor(i/36e5),r=Math.floor(i/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===s?"1 hour ago":s<24?`${s} hours ago`:1===r?"1 day ago":`${r} days ago`}}}]);