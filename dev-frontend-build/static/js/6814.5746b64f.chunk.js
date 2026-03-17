"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>de});var n=i(9950),r=i(4752),s=i(3422),a=i(1367),o=i(8930),d=i(8012),p=i(8406),l=i(4414);const c=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},r=n(t),s=n(i);return r.period===s.period?`${r.time} - ${s.time} ${s.period}`:`${r.time} ${r.period} - ${s.time} ${s.period}`},u=r.Ay.div`
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
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,v=r.Ay.div`
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
`,$=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,F=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,k=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,S=r.Ay.div`
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
`,T=r.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,D=r.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,E=r.Ay.div`
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
`,N=r.Ay.div`
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
`,M=r.Ay.div`
  flex: 1;
  min-width: 0;
`,P=r.Ay.div`
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
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,L=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,Q=r.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,H=r.Ay.button`
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
`,K=r.Ay.div`
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
`,V=r.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,Y=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,U={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},Z=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${e=>{var t;return(null===(t=U[e.color])||void 0===t?void 0:t.text)||e.color}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t;return(null===(t=U[e.color])||void 0===t?void 0:t.bg)||e.color}};
  color: ${e=>{var t;return(null===(t=U[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t;return(null===(t=U[e.color])||void 0===t?void 0:t.hoverBg)||e.color}};
  }
`,W=r.Ay.button`
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
`,X=r.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,ee=r.Ay.button`
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
`,te=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,ie=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,ne=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,re=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,se=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`,ae=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,oe=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,de=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[i,r]=(0,n.useState)([]),[U,de]=(0,n.useState)(new Date),[,pe]=(0,n.useState)(null),[le,ce]=(0,n.useState)(!1),[ue,me]=(0,n.useState)(null),[ge,he]=(0,n.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),xe=(0,n.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),n=await i.json();if(n.success&&n.data){const e=n.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const i=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const s=t.set_items.map((i,r)=>({...i,id:`item-${e.id}-${n}-set-${r}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;i.push({...t,id:`item-${e.id}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:i,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});r(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&ye(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,n.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(i.ok){const e=await i.json();me(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{xe();const e=setInterval(xe,3e4);return()=>clearInterval(e)},[xe]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{ce(!0),t.emit("join-restaurant",e.restaurantId),xe()}),t.on("disconnect",()=>ce(!1)),t.on("connect_error",()=>ce(!1)),t.on("reconnect",()=>{ce(!0),xe()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const n=[];i.forEach((e,i)=>{const r=(e.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,s)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;n.push({id:`item-${t.id}-${i}-set-${s}`,name:r.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&n.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;n.push({id:`item-${t.id}-${i}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const s={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:n,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};r(e=>[s,...e]),ye()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&r(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!je(e))))}),t.on("order-deleted",e=>{let{id:t}=e;r(e=>e.filter(e=>e.id!==t.toString()))}),pe(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>de(new Date),1e3);return()=>clearInterval(e)},[]);const ye=()=>{new Audio("/notification.mp3").play().catch(()=>{})},fe=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},be=e=>Math.floor((U.getTime()-e.getTime())/1e3/60),ve=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&r(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!je(e))));try{const i=localStorage.getItem("auth_token"),n=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({status:t})});(await n.json()).success||xe()}catch{xe()}},_e=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},je=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),we=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},Ae=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>we(t,e.status||"pending")):we(t,e.status||"pending")),$e=async(e,t)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const s=n.items.map(e=>{if(e.id===t){const t=_e(n.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),Ae(s,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await ve(e,t,!0)}}catch(n){console.error("updateItemStatus error:",n),xe()}},Fe=async(e,t,n)=>{try{const s=i.find(t=>t.id===e);if(!s)return;const a=s.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===n){const t=_e(s.status,e.status||"pending");return{...e,status:t}}return e}),i=t.every(e=>we(s.status,e.status||"pending"))?_e(s.status,s.status):s.status;return{...e,set_items:t,status:i}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(r(t=>t.map(t=>t.id===e?{...t,items:a}:t)),Ae(a,s.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[s.status];t&&await ve(e,t,!0)}}catch{xe()}},ke=e=>i.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),Se={pending:ke("pending").length,preparing:ke("preparing").length,ready:ke("ready").length},Ie=e=>{const t=be(e.orderTime),s=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>we(e.status,t.status||"pending")).length):(a+=1,we(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,p=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,l.jsxs)($,{children:[(0,l.jsxs)(F,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(S,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(I,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(I,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?c(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(I,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)(D,{children:e.orderNumber}),(0,l.jsxs)(E,{urgent:s,children:[t,"m"]})]})]}),a>1&&(0,l.jsxs)(C,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(N,{percent:d,color:p})}),(0,l.jsxs)(q,{children:[o,"/",a]})]}),(0,l.jsx)(G,{children:e.items.map(t=>(0,l.jsxs)(n.Fragment,{children:[(0,l.jsxs)(z,{done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(M,{children:[t.is_set_menu?(0,l.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[fe(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,l.jsxs)(P,{done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:[fe(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const n=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==n.length||t.special_instructions?(0,l.jsxs)(O,{children:[n.map((i,n)=>(0,l.jsx)(J,{done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:i},n)),t.special_instructions&&(0,l.jsx)(L,{done:we(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,l.jsx)(W,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&ve(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,l.jsx)(H,{done:we(e.status,t.status||"pending"),statusColor:p,onClick:()=>$e(e.id,t.id),children:we(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(K,{children:t.set_items.map(i=>(0,l.jsxs)(R,{done:we(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(V,{done:we(e.status,i.status||"pending")&&"pending"!==e.status,children:[fe(i.name)," ",i.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:we(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,l.jsx)(H,{done:we(e.status,i.status||"pending"),statusColor:p,onClick:()=>Fe(e.id,t.id,i.id),children:we(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,l.jsx)(Y,{children:(0,l.jsx)(Z,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const n=i.find(t=>t.id===e);if(!n)return;const s=n.items.map(e=>{const i={...e,status:t};return e.set_items&&e.set_items.length>0&&(i.set_items=e.set_items.map(e=>({...e,status:t}))),i}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})}),r(t=>t.map(t=>t.id===e?{...t,items:s}:t)),await ve(e,t,!0)}catch{xe()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,l.jsxs)(Y,{children:[(0,l.jsx)(W,{onClick:()=>ve(e.id,"pending"),children:"\u21ba"}),(0,l.jsx)(Z,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const n=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),s=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await ve(e,"ready",!0)}catch{xe()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,l.jsxs)(Y,{children:[(0,l.jsx)(W,{onClick:()=>ve(e.id,"preparing"),children:"\u21ba"}),(0,l.jsx)(Z,{color:"#10B981",onClick:()=>(async e=>{try{const t=i.find(t=>t.id===e);if(!t)return;const n=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),s=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:n.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;r(t=>t.map(t=>t.id===e?{...t,items:n}:t)),await ve(e,"served",!0)}catch{xe()}})(e.id),children:"Serve All"})]})]},e.id)};return(0,l.jsxs)(u,{children:[(0,l.jsx)(d.Ay,{title:"Kitchen Display",children:(0,l.jsxs)(g,{children:[(0,l.jsxs)(X,{children:[(0,l.jsx)(ee,{active:"order"===ge,onClick:()=>{he("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,l.jsx)(ee,{active:"item"===ge,onClick:()=>{he("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,l.jsxs)(x,{connected:le,children:[(0,l.jsx)(y,{connected:le}),le?"Live":"Offline"]}),(0,l.jsx)(h,{children:(0,p.fU)(U,ue)})]})}),(0,l.jsx)(m,{children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"pending",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"pending",children:"Pending"})}),(0,l.jsx)(w,{color:"#F59E0B",children:Se.pending})]}),(0,l.jsx)(A,{children:"order"===ge?ke("pending").map(Ie):(()=>{const e=ke("pending"),t=new Map;return e.forEach(e=>{const i=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{if(we("pending",n.status||"pending"))return;const r=n.name;t.has(r)||t.set(r,{menuName:n.name,formattedName:fe(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:e.orderTime});const s=t.get(r);s.plainQty+=n.quantity,e.orderTime<s.earliestTime&&(s.earliestTime=e.orderTime),s.plainSources.push({orderId:e.id,itemId:n.id,label:i,quantity:n.quantity,is_set_menu:!0})});else{var r;if(we("pending",n.status||"pending"))return;const s=n.name;t.has(s)||t.set(s,{menuName:n.name,formattedName:fe(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:e.orderTime});const a=t.get(s);e.orderTime<a.earliestTime&&(a.earliestTime=e.orderTime);const o=(null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||n.special_instructions?a.optionSources.push({orderId:e.id,itemId:n.id,label:i,quantity:n.quantity,options:o,special_instructions:n.special_instructions}):(a.plainQty+=n.quantity,a.plainSources.push({orderId:e.id,itemId:n.id,label:i,quantity:n.quantity}))}})}),Array.from(t.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})().map((e,t)=>{const n=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),r=new Map;e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const s=Array.from(r.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", ");return(0,l.jsxs)(te,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)(ie,{children:[e.formattedName,n>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",n]})]}),(0,l.jsx)(Z,{color:"#F59E0B",style:{flex:"none",padding:"6px 14px",fontSize:"12px"},onClick:()=>(async e=>{const t=[...e.plainSources,...e.optionSources];for(const n of t)if(n.is_set_menu){const e=i.find(e=>e.id===n.orderId);if(!e)continue;for(const t of e.items)if(t.set_items){const e=t.set_items.find(e=>e.id===n.itemId);e&&!we("pending",e.status||"pending")&&await Fe(n.orderId,t.id,n.itemId)}}else await $e(n.orderId,n.itemId)})(e),children:"Start All"})]}),e.plainQty>0&&(0,l.jsx)(ne,{children:s}),e.optionSources.map((t,i)=>{var n;return(0,l.jsxs)("div",{style:{marginTop:8,paddingTop:8,borderTop:0===i&&e.plainQty>0?"1px solid #F3F4F6":"none"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6},children:[(0,l.jsx)("span",{style:{fontSize:13,fontWeight:600,color:"#6B7C93"},children:t.label}),t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",t.quantity]})]}),(0,l.jsxs)(O,{style:{marginTop:3},children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,l.jsx)(J,{children:e},t)),t.special_instructions&&(0,l.jsx)(L,{children:t.special_instructions})]})]},`opt-${i}`)})]},`group-${t}`)})})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"preparing",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,l.jsx)(w,{color:"#3B82F6",children:Se.preparing})]}),(0,l.jsx)(A,{children:"order"===ge?ke("preparing").map(Ie):(()=>{const e=ke("preparing"),t=[];return e.forEach(e=>{const i=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(n=>{var r;n.is_set_menu&&n.set_items&&n.set_items.length>0?n.set_items.forEach(r=>{t.push({orderId:e.id,itemId:r.id,parentItemId:n.id,menuName:r.name,formattedName:fe(r.name),quantity:r.quantity,orderLabel:i,orderNumber:e.orderNumber,orderTime:e.orderTime,status:r.status||"pending",isSetItem:!0})}):t.push({orderId:e.id,itemId:n.id,menuName:n.name,formattedName:fe(n.name),quantity:n.quantity,orderLabel:i,orderNumber:e.orderNumber,orderTime:e.orderTime,options:null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:n.special_instructions,status:n.status||"pending",isSetItem:!1})})}),t.sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime())})().map((e,t)=>{var i;const n=we("preparing",e.status);return(0,l.jsxs)(re,{children:[(0,l.jsxs)(se,{children:[(0,l.jsxs)(ae,{children:[e.orderLabel," ",e.orderNumber]}),(0,l.jsxs)(E,{urgent:!1,children:[be(e.orderTime),"m"]})]}),(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)("div",{children:[(0,l.jsxs)(oe,{children:[(0,l.jsx)("span",{style:{color:n?"#D1D5DB":"#0A2540"},children:e.formattedName}),e.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:n,children:["x ",e.quantity]})]}),(e.options&&e.options.length>0||e.special_instructions)&&(0,l.jsxs)(O,{style:{marginTop:4},children:[null===(i=e.options)||void 0===i?void 0:i.map((e,t)=>(0,l.jsx)(J,{done:n,children:e},t)),e.special_instructions&&(0,l.jsx)(L,{done:n,children:e.special_instructions})]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[(0,l.jsx)(W,{style:{padding:"6px 10px",fontSize:"12px"},onClick:()=>ve(e.orderId,"pending"),children:"\u21ba"}),(0,l.jsx)(H,{done:n,statusColor:"#3B82F6",onClick:()=>{e.isSetItem&&e.parentItemId?Fe(e.orderId,e.parentItemId,e.itemId):$e(e.orderId,e.itemId)},children:n?"Done \u2713":"Done"})]})]})]},`prep-item-${t}`)})})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(v,{status:"ready",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"ready",children:"Ready"})}),(0,l.jsx)(w,{color:"#10B981",children:Se.ready})]}),(0,l.jsx)(A,{children:ke("ready").map(Ie)})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var n=i(4752),r=i(4414);const s=n.Ay.div`
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