"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ne});var s=i(9950),r=i(4752),n=i(3422),a=i(1367),o=i(8930),d=i(8012),p=i(8406),u=i(4414);const l=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),s=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},r=s(t),n=s(i);return r.period===n.period?`${r.time} - ${n.time} ${n.period}`:`${r.time} ${r.period} - ${n.time} ${n.period}`},c=r.Ay.div`
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
`,y=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,x=r.Ay.div`
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
`,j=r.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,w=r.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: ${e=>e.color||"#0A2540"};
`,A=r.Ay.div`
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
`,S=r.Ay.div`
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
`,F=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,T=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,I=r.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,k=r.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,E=r.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,N=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,C=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,B=r.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,D=r.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,q=r.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,z=r.Ay.div`
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
`,Q=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,O=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,J=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,H=r.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,K=r.Ay.button`
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
`,L=r.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,R=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,W=r.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,Y=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,V={"#F59E0B":{bg:"#F59E0B",hoverBg:"#D97706"},"#3B82F6":{bg:"#3B82F6",hoverBg:"#2563EB"},"#10B981":{bg:"#10B981",hoverBg:"#059669"}},U={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},Z=r.Ay.button`
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
`,G=r.Ay.button`
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
`,X=r.Ay.div`
  margin-bottom: 4px;
`,ee=r.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,te=r.Ay.button`
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
`,ie=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,se=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,re=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ne=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,r]=(0,s.useState)([]),[V,U]=(0,s.useState)(new Date),[,ne]=(0,s.useState)(null),[ae,oe]=(0,s.useState)(!1),[de,pe]=(0,s.useState)(null),[ue,le]=(0,s.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),[ce,me]=(0,s.useState)([]),ge=(0,s.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),s=await i.json();if(s.success&&s.data){const e=s.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,s)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const n=t.set_items.map((i,r)=>({...i,id:`item-${e.id}-${s}-set-${r}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${s}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:n})}else{var n;i.push({...t,id:`item-${e.id}-${s}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}}),t=localStorage.getItem("auth_token");e.forEach(e=>{!e.items.every(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)return e.set_items.every(e=>{const t=e.status||"pending";return"ready"===t||"served"===t||"completed"===t});const t=e.status||"pending";return"ready"===t||"served"===t||"completed"===t})||"pending"!==e.status&&"preparing"!==e.status||(fetch(`/api/orders/${e.id}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify({status:"ready"})}).catch(()=>{}),e.status="ready")}),r(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&he(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,s.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();pe(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,s.useEffect)(()=>{ge();const e=setInterval(ge,3e4);return()=>clearInterval(e)},[ge]),(0,s.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,n.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{oe(!0),t.emit("join-restaurant",e.restaurantId),ge()}),t.on("disconnect",()=>oe(!1)),t.on("connect_error",()=>oe(!1)),t.on("reconnect",()=>{oe(!0),ge()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const s=[];i.forEach((e,i)=>{const r=(e.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,n)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;s.push({id:`item-${t.id}-${i}-set-${n}`,name:r.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&s.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var n;s.push({id:`item-${t.id}-${i}`,name:e.name||(null===(n=e.menuItem)||void 0===n?void 0:n.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const n={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:s,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};r(e=>[n,...e]),he()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&r(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!be(e))))}),t.on("order-deleted",e=>{let{id:t}=e;r(e=>e.filter(e=>e.id!==t.toString()))}),ne(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,s.useEffect)(()=>{const e=setInterval(()=>U(new Date),1e3);return()=>clearInterval(e)},[]);const he=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ye=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},xe=e=>Math.floor((V.getTime()-e.getTime())/1e3/60),fe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&r(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!be(e))));try{const i=localStorage.getItem("auth_token"),s=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await s.json()).success||ge()}catch{ge()}},ve=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},be=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),_e=(e,t)=>{switch(e){case"pending":return"preparing"===t||"ready"===t||"served"===t||"completed"===t;case"preparing":return"ready"===t||"served"===t||"completed"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},je=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>_e(t,e.status||"pending")):_e(t,e.status||"pending")),we=async(e,t)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const n=s.items.map(e=>{if(e.id===t){const t=ve(s.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:n}:t)),je(n,s.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[s.status];t&&await fe(e,t,!0)}}catch(s){console.error("updateItemStatus error:",s),ge()}},Ae=async(e,t,s)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const a=n.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===s){const t=ve(n.status,e.status||"pending");return{...e,status:t}}return e}),i=t.every(e=>_e(n.status,e.status||"pending"))?ve(n.status,n.status):n.status;return{...e,set_items:t,status:i}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:a}:t)),je(a,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await fe(e,t,!0)}}catch{ge()}},Se=async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const s=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),n=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await fe(e,"served",!0)}catch{ge()}},$e=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),Fe={pending:$e("pending").length,preparing:$e("preparing").length,ready:$e("ready").length},Te=e=>{const t=xe(e.orderTime),n=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>_e(e.status,t.status||"pending")).length):(a+=1,_e(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,p=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,u.jsxs)(S,{children:[(0,u.jsxs)($,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(T,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,u.jsx)(I,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,u.jsxs)(I,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?l(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,u.jsx)(I,{variant:"delivery",children:"DELIVERY"})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(E,{children:e.orderNumber}),(0,u.jsxs)(N,{urgent:n,children:[t,"m"]})]})]}),a>1&&(0,u.jsxs)(C,{children:[(0,u.jsx)(B,{children:(0,u.jsx)(D,{percent:d,color:p})}),(0,u.jsxs)(q,{children:[o,"/",a]})]}),(0,u.jsx)(X,{children:e.items.map(t=>(0,u.jsxs)(s.Fragment,{children:[(0,u.jsxs)(z,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,u.jsxs)(P,{children:[t.is_set_menu?(0,u.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[ye(t.name)," ",t.quantity>1&&(0,u.jsxs)(H,{highlight:!0,done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,u.jsxs)(M,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:[ye(t.name)," ",t.quantity>1&&(0,u.jsxs)(H,{highlight:!0,done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const s=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==s.length||t.special_instructions?(0,u.jsxs)(Q,{children:[s.map((i,s)=>(0,u.jsx)(O,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:i},s)),t.special_instructions&&(0,u.jsx)(J,{done:_e(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,u.jsx)(G,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&fe(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,u.jsx)(K,{done:_e(e.status,t.status||"pending"),statusColor:p,onClick:()=>we(e.id,t.id),children:_e(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,u.jsx)(L,{children:t.set_items.map(i=>(0,u.jsxs)(R,{done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,u.jsxs)(W,{done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:[ye(i.name)," ",i.quantity>1&&(0,u.jsxs)(H,{highlight:!0,done:_e(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,u.jsx)(K,{done:_e(e.status,i.status||"pending"),statusColor:p,onClick:()=>Ae(e.id,t.id,i.id),children:_e(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,u.jsx)(Y,{children:(0,u.jsx)(Z,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const n=s.items.map(e=>{const i={...e,status:t};return e.set_items&&e.set_items.length>0&&(i.set_items=e.set_items.map(e=>({...e,status:t}))),i}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})}),r(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await fe(e,t,!0)}catch{ge()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,u.jsxs)(Y,{children:[(0,u.jsx)(G,{onClick:()=>fe(e.id,"pending"),children:"\u21ba"}),(0,u.jsx)(Z,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const s=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),n=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await fe(e,"ready",!0)}catch{ge()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,u.jsxs)(Y,{children:[(0,u.jsx)(G,{onClick:()=>fe(e.id,"preparing"),children:"\u21ba"}),(0,u.jsx)(Z,{color:"#10B981",onClick:()=>Se(e.id),children:"Serve All"})]})]},e.id)},Ie=async(e,t,s)=>{const n=[...e.plainSources,...e.optionSources],a=new Map;n.forEach(e=>{a.has(e.orderId)||a.set(e.orderId,new Set),a.get(e.orderId).add(e.itemId)});const o=localStorage.getItem("auth_token"),d=Array.from(a.entries()).map(e=>{let[r,n]=e;const a=i.find(e=>e.id===r);if(!a)return null;const o=a.items.map(e=>{if(e.is_set_menu&&e.set_items){const i={pending:"preparing",preparing:"ready"},r={preparing:"pending",ready:"preparing",served:"ready"},o=s||a.status,d=e.set_items.map(e=>n.has(e.id)?"forward"===t?{...e,status:i[o]||"preparing"}:{...e,status:r[e.status||"pending"]||e.status}:e),p=d.every(e=>_e(a.status,e.status||"pending"))&&i[a.status]||a.status;return{...e,set_items:d,status:p}}if(!n.has(e.id))return e;const i={pending:"preparing",preparing:"ready"},r={preparing:"pending",ready:"preparing",served:"ready"},o=s||a.status;return"forward"===t?{...e,status:i[o]||"preparing"}:{...e,status:r[e.status||"pending"]||e.status}});return{orderId:r,order:a,updatedItems:o}}).filter(Boolean);try{if((await Promise.all(d.map(e=>{let{orderId:t,updatedItems:i}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void ge();r(e=>e.map(e=>{const t=d.find(t=>t.orderId===e.id);return t?{...e,items:t.updatedItems}:e}));const i=new Set(n.map(e=>e.itemId));if("forward"===t&&"pending"===s){const t=`batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;me(s=>[...s,{batchId:t,menuName:e.menuName,formattedName:e.formattedName,itemIds:i}])}else"revert"===t&&"preparing"===s&&me(e=>e.map(e=>{const t=new Set(Array.from(e.itemIds).filter(e=>!i.has(e)));return{...e,itemIds:t}}).filter(e=>e.itemIds.size>0));const a=d.map(e=>{let{orderId:i,order:s,updatedItems:r}=e;if("forward"===t){if(je(r,s.status)){const e={pending:"preparing",preparing:"ready",ready:"served"}[s.status];if(e)return fe(i,e,!0)}}else{const e={preparing:"pending",ready:"preparing",served:"ready"}[s.status];if(e){if(r.every(t=>t.is_set_menu&&t.set_items&&t.set_items.length>0?t.set_items.every(t=>(t.status||"pending")===e):(t.status||"pending")===e))return fe(i,e,!0)}}return Promise.resolve()});await Promise.all(a)}catch{ge()}},ke=(e,t,i)=>{const s=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),r=(e.plainSources.length,e.optionSources.length,new Map);e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const n=Array.from(r.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),a="pending"===i?"#F59E0B":"#3B82F6",o=s<=1,d="pending"===i?o?"Start":"Start All":o?"Done":"Done All";return(0,u.jsxs)(ie,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,u.jsxs)(se,{children:[e.formattedName,s>1&&(0,u.jsxs)(H,{highlight:!0,children:["x ",s]})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:6,alignItems:"center"},children:["preparing"===i&&(0,u.jsx)(G,{style:{padding:"10px 14px",fontSize:"16px"},onClick:()=>Ie(e,"revert",i),children:"\u21ba"}),(0,u.jsx)(Z,{color:a,solid:o,style:{flex:"none",padding:"10px 20px",fontSize:"14px"},onClick:()=>Ie(e,"forward",i),children:d})]})]}),e.plainQty>0&&(0,u.jsx)(re,{children:n}),e.optionSources.length>0&&(0,u.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var s;return(0,u.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,u.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,u.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,u.jsxs)("span",{style:{fontSize:11,fontWeight:600,color:"#9CA3AF"},children:["x",t.quantity]})]}),(0,u.jsxs)(Q,{children:[null===(s=t.options)||void 0===s?void 0:s.map((e,t)=>(0,u.jsx)(O,{children:e},t)),t.special_instructions&&(0,u.jsx)(J,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},Ee=()=>i.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!be(e)).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return(0,u.jsxs)(c,{children:[(0,u.jsx)(d.Ay,{title:"Kitchen Display",children:(0,u.jsxs)(g,{children:[(0,u.jsxs)(ee,{children:[(0,u.jsx)(te,{active:"order"===ue,onClick:()=>{le("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,u.jsx)(te,{active:"item"===ue,onClick:()=>{le("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,u.jsxs)(y,{connected:ae,children:[(0,u.jsx)(x,{connected:ae}),ae?"Live":"Offline"]}),(0,u.jsx)(h,{children:(0,p.fU)(V,de)})]})}),(0,u.jsx)(m,{children:(0,u.jsxs)(f,{children:[(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"pending",children:[(0,u.jsx)(_,{children:(0,u.jsx)(j,{status:"pending",children:"Pending"})}),(0,u.jsx)(w,{color:"#F59E0B",children:Fe.pending})]}),(0,u.jsx)(A,{children:"order"===ue?$e("pending").map(Te):(()=>{const e=new Map;return i.filter(e=>["pending","preparing"].includes(e.status)).forEach(t=>{const i=t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`;t.items.forEach(s=>{if(s.is_set_menu&&s.set_items&&s.set_items.length>0)s.set_items.forEach(s=>{if("pending"!==(s.status||"pending"))return;const r=s.name;e.has(r)||e.set(r,{menuName:s.name,formattedName:ye(s.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const n=e.get(r);n.plainQty+=s.quantity,t.orderTime<n.earliestTime&&(n.earliestTime=t.orderTime),n.plainSources.push({orderId:t.id,itemId:s.id,label:i,orderNumber:t.orderNumber,quantity:s.quantity,is_set_menu:!0})});else{var r;if("pending"!==(s.status||"pending"))return;const n=s.name;e.has(n)||e.set(n,{menuName:s.name,formattedName:ye(s.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const a=e.get(n);t.orderTime<a.earliestTime&&(a.earliestTime=t.orderTime);const o=(null===(r=s.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||s.special_instructions?a.optionSources.push({orderId:t.id,itemId:s.id,label:i,orderNumber:t.orderNumber,quantity:s.quantity,options:o,special_instructions:s.special_instructions}):(a.plainQty+=s.quantity,a.plainSources.push({orderId:t.id,itemId:s.id,label:i,orderNumber:t.orderNumber,quantity:s.quantity}))}})}),Array.from(e.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})().map((e,t)=>ke(e,t,"pending"))})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"preparing",children:[(0,u.jsx)(_,{children:(0,u.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,u.jsx)(w,{color:"#3B82F6",children:"order"===ue?Fe.preparing:i.filter(e=>"preparing"===e.status).reduce((e,t)=>e+t.items.filter(e=>e.is_set_menu&&e.set_items?e.set_items.some(e=>"preparing"===(e.status||"pending")):"preparing"===(e.status||"pending")).length,0)})]}),(0,u.jsx)(A,{children:"order"===ue?$e("preparing").map(Te):(()=>{const e=[],t=new Set;ce.forEach(s=>{const r={menuName:s.menuName,formattedName:s.formattedName,plainQty:0,plainSources:[],optionSources:[],earliestTime:new Date};let n=!1;i.filter(e=>["preparing","pending"].includes(e.status)).forEach(e=>{const i=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(a=>{if(a.is_set_menu&&a.set_items&&a.set_items.length>0)a.set_items.forEach(a=>{s.itemIds.has(a.id)&&"preparing"===(a.status||"pending")&&(t.add(a.id),n=!0,r.plainQty+=a.quantity,r.plainSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity,is_set_menu:!0}),e.orderTime<r.earliestTime&&(r.earliestTime=e.orderTime))});else{var o;if(!s.itemIds.has(a.id))return;if("preparing"!==(a.status||"pending"))return;t.add(a.id),n=!0,e.orderTime<r.earliestTime&&(r.earliestTime=e.orderTime);const d=(null===(o=a.options)||void 0===o?void 0:o.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!a.special_instructions?r.optionSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity,options:d,special_instructions:a.special_instructions}):(r.plainQty+=a.quantity,r.plainSources.push({orderId:e.id,itemId:a.id,label:i,orderNumber:e.orderNumber,quantity:a.quantity}))}})}),n&&e.push(r)});const s=new Map;return i.filter(e=>"preparing"===e.status).forEach(e=>{const i=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(r=>{if(r.is_set_menu&&r.set_items&&r.set_items.length>0)r.set_items.forEach(r=>{if(t.has(r.id))return;if("preparing"!==(r.status||"pending"))return;const n=r.name;s.has(n)||s.set(n,{menuName:r.name,formattedName:ye(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:e.orderTime});const a=s.get(n);a.plainQty+=r.quantity,a.plainSources.push({orderId:e.id,itemId:r.id,label:i,orderNumber:e.orderNumber,quantity:r.quantity,is_set_menu:!0})});else{var n;if(t.has(r.id))return;if("preparing"!==(r.status||"pending"))return;const a=r.name;s.has(a)||s.set(a,{menuName:r.name,formattedName:ye(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:e.orderTime});const o=s.get(a),d=(null===(n=r.options)||void 0===n?void 0:n.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!r.special_instructions?o.optionSources.push({orderId:e.id,itemId:r.id,label:i,orderNumber:e.orderNumber,quantity:r.quantity,options:d,special_instructions:r.special_instructions}):(o.plainQty+=r.quantity,o.plainSources.push({orderId:e.id,itemId:r.id,label:i,orderNumber:e.orderNumber,quantity:r.quantity}))}})}),e.push(...Array.from(s.values())),e.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime()),e.map((e,t)=>ke(e,t,"preparing"))})()})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(b,{status:"ready",children:[(0,u.jsx)(_,{children:(0,u.jsx)(j,{status:"ready",children:"Ready"})}),(0,u.jsx)(w,{color:"#10B981",children:"order"===ue?Fe.ready:Ee().length})]}),(0,u.jsx)(A,{children:"order"===ue?$e("ready").map(Te):Ee().map(e=>{const t=xe(e.orderTime),i="#10B981";let s=0,n=0,a=0;const o=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{s++;const i=t.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||a++,o.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;s++;const i=e.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||a++,o.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const d=s-n-a,p=s>0?a/s*100:0,c=o.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===c.length?null:(0,u.jsxs)(S,{children:[(0,u.jsxs)($,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(T,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,u.jsx)(I,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,u.jsxs)(I,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?l(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,u.jsx)(I,{variant:"delivery",children:"DELIVERY"})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(E,{children:e.orderNumber}),(0,u.jsxs)(N,{children:[t,"m"]})]})]}),s>1&&(0,u.jsxs)(C,{children:[(0,u.jsx)(B,{children:(0,u.jsx)(D,{percent:p,color:i})}),(0,u.jsxs)(q,{children:[a,"/",s]})]}),(0,u.jsx)(X,{children:c.map((t,s)=>{var n;const a="served"===t.status||"completed"===t.status;return(0,u.jsxs)(z,{done:a,children:[(0,u.jsxs)(P,{children:[(0,u.jsxs)(M,{done:a,children:[ye(t.name)," ",t.quantity>1&&(0,u.jsxs)(H,{highlight:!0,done:a,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,u.jsxs)(Q,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,u.jsx)(O,{done:a,children:e},t)),t.special_instructions&&(0,u.jsx)(J,{done:a,children:t.special_instructions})]})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!a&&(0,u.jsx)(G,{style:{padding:"4px 8px",fontSize:"11px"},onClick:async()=>{const i=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"}),s=localStorage.getItem("auth_token");try{const t=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await t.json()).success)return void ge();r(t=>t.map(t=>t.id===e.id?{...t,items:i}:t)),i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await fe(e.id,"preparing",!0)}catch{ge()}},children:"\u21ba"}),(0,u.jsx)(K,{done:a,statusColor:i,onClick:()=>{t.isSetItem&&t.parentId?Ae(e.id,t.parentId,t.id):we(e.id,t.id)},children:a?"Served":"Serve"})]})]},s)})}),d>0&&(0,u.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&c.length>1&&c.some(e=>"ready"===e.status)&&(0,u.jsx)(Y,{children:(0,u.jsx)(Z,{color:"#10B981",onClick:()=>Se(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var s=i(4752),r=i(4414);const n=s.Ay.div`
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
`,d=e=>{let{title:t,children:i}=e;return(0,r.jsxs)(n,{children:[(0,r.jsx)(a,{children:t}),i&&(0,r.jsx)(o,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>n,ng:()=>s,oB:()=>a,r6:()=>r});const s=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,i)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const n={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:s(t)};return r.toLocaleString("en-MY",{...n,...i})},n=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,s=Math.floor(i/6e4),r=Math.floor(i/36e5),n=Math.floor(i/864e5);return s<1?"just now":1===s?"1 min ago":s<60?`${s} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===n?"1 day ago":`${n} days ago`}}}]);