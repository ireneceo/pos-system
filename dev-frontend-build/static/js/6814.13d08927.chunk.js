"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,s)=>{s.r(t),s.d(t,{default:()=>ne});var i=s(9950),n=s(4752),r=s(3422),a=s(1367),o=s(8930),d=s(8012),p=s(8406),l=s(4414);const u=e=>{const t=new Date(e),s=new Date(t.getTime()+18e5),i=e=>{const t=e.getHours(),s=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:s}},n=i(t),r=i(s);return n.period===r.period?`${n.time} - ${r.time} ${r.period}`:`${n.time} ${n.period} - ${r.time} ${r.period}`},c=n.Ay.div`
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
`,I=n.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,T=n.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,E=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,C=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,D=n.Ay.div`
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
`,se=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,ie=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ne=()=>{const{user:e}=(0,a.As)(),{menuItems:t}=(0,o.b)(),[s,n]=(0,i.useState)([]),[W,ne]=(0,i.useState)(new Date),[,re]=(0,i.useState)(null),[ae,oe]=(0,i.useState)(!1),[de,pe]=(0,i.useState)(null),[le,ue]=(0,i.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),ce=(0,i.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),s=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}}),i=await s.json();if(i.success&&i.data){const e=i.data.filter(e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0}).map(e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}const s=[];return t.forEach((t,i)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var n;const r=t.set_items.map((s,n)=>({...s,id:`item-${e.id}-${i}-set-${n}`,name:s.name,quantity:s.quantity*(t.quantity||1),status:s.status||"pending"}));s.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:r})}else{var r;s.push({...t,id:`item-${e.id}-${i}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),pagerNumber:e.pager_number||void 0,items:s,status:e.status,orderTime:new Date(e.createdAt),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}});n(t=>{const s=new Set(t.map(e=>e.id));return e.filter(e=>!s.has(e.id)).length>0&&me(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,i.useEffect)(()=>{(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),s=await fetch(`/api/restaurants/${e.restaurantId}`,{credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}});if(s.ok){const e=await s.json();pe(e.operation_settings)}}catch(t){console.error("Failed to load operation settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{ce();const e=setInterval(ce,3e4);return()=>clearInterval(e)},[ce]),(0,i.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,r.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{oe(!0),t.emit("join-restaurant",e.restaurantId),ce()}),t.on("disconnect",()=>oe(!1)),t.on("connect_error",()=>oe(!1)),t.on("reconnect",()=>{oe(!0),ce()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let s=t.order_items||[];if("string"===typeof s)try{s=JSON.parse(s)}catch{s=[]}const i=[];s.forEach((e,s)=>{const n=(e.special_instructions||"").match(/^\[(.*?)\]/);if(n){n[1].split(",").map(e=>e.trim()).forEach((n,r)=>{const a=n.match(/^(.*?)\s+x(\d+)$/);if(a){const[,n,o]=a;i.push({id:`item-${t.id}-${s}-set-${r}`,name:n.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&i.push({id:`item-${t.id}-${s}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var r;i.push({id:`item-${t.id}-${s}`,name:e.name||(null===(r=e.menuItem)||void 0===r?void 0:r.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const r={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:i,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};n(e=>[r,...e]),me()}),t.on("order-updated",t=>{t.restaurant_id===e.restaurantId&&n(e=>e.map(e=>e.id===t.id.toString()?{...e,status:t.status,orderTime:new Date(t.createdAt)}:e).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))))}),t.on("order-deleted",e=>{let{id:t}=e;n(e=>e.filter(e=>e.id!==t.toString()))}),re(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,i.useEffect)(()=>{const e=setInterval(()=>ne(new Date),1e3);return()=>clearInterval(e)},[]);const me=()=>{new Audio("/notification.mp3").play().catch(()=>{})},ge=e=>{const s=(e=>{const s=t.find(t=>t.name===e);return(null===s||void 0===s?void 0:s.code)||""})(e);return s?`${s} ${e}`:e},he=e=>Math.floor((W.getTime()-e.getTime())/1e3/60),xe=async function(e,t){(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&n(s=>s.map(s=>s.id===e?{...s,status:t}:s).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!fe(e))));try{const s=localStorage.getItem("auth_token"),i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({status:t})});(await i.json()).success||ce()}catch{ce()}},ye=(e,t)=>{const s={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===s||"ready"===e&&"completed"===t?e:s},fe=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),ve=(e,t)=>{switch(e){case"pending":return"preparing"===t;case"preparing":return"ready"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},be=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>ve(t,e.status||"pending")):ve(t,e.status||"pending")),_e=async(e,t)=>{try{const i=s.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>{if(e.id===t){const t=ye(i.status,e.status||"pending");return{...e,status:t}}return e}),a=localStorage.getItem("auth_token"),o=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})});if(!(await o.json()).success)return;if(n(t=>t.map(t=>t.id===e?{...t,items:r}:t)),be(r,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await xe(e,t,!0)}}catch(i){console.error("updateItemStatus error:",i),ce()}},je=async(e,t,i)=>{try{const r=s.find(t=>t.id===e);if(!r)return;const a=r.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>{if(e.id===i){const t=ye(r.status,e.status||"pending");return{...e,status:t}}return e}),s=t.every(e=>ve(r.status,e.status||"pending"))?ye(r.status,r.status):r.status;return{...e,set_items:t,status:s}}return e}),o=localStorage.getItem("auth_token"),d=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{}},body:JSON.stringify({order_items:a.map(e=>({...e,status:e.status}))})});if(!(await d.json()).success)return;if(n(t=>t.map(t=>t.id===e?{...t,items:a}:t)),be(a,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await xe(e,t,!0)}}catch{ce()}},we=async e=>{try{const t=s.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"served"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"served"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;n(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await xe(e,"served",!0)}catch{ce()}},Ae=e=>s.filter(t=>t.status===e).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),$e={pending:Ae("pending").length,preparing:Ae("preparing").length,ready:Ae("ready").length},Se=e=>{const t=he(e.orderTime),r=t>15&&"pending"===e.status;let a=0,o=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(a+=t.set_items.length,o+=t.set_items.filter(t=>ve(e.status,t.status||"pending")).length):(a+=1,ve(e.status,t.status||"pending")&&(o+=1))});const d=a>0?o/a*100:0,p=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(I,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(I,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(I,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)(E,{children:e.orderNumber}),(0,l.jsxs)(C,{urgent:r,children:[t,"m"]})]})]}),a>1&&(0,l.jsxs)(D,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(N,{percent:d,color:p})}),(0,l.jsxs)(z,{children:[o,"/",a]})]}),(0,l.jsx)(G,{children:e.items.map(t=>(0,l.jsxs)(i.Fragment,{children:[(0,l.jsxs)(q,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(P,{children:[t.is_set_menu?(0,l.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,l.jsxs)(M,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(s=>{const i=(null===(s=t.options)||void 0===s?void 0:s.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==i.length||t.special_instructions?(0,l.jsxs)(O,{children:[i.map((s,i)=>(0,l.jsx)(J,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:s},i)),t.special_instructions&&(0,l.jsx)(H,{done:ve(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===a&&(0,l.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&xe(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&(0,l.jsx)(K,{done:ve(e.status,t.status||"pending"),statusColor:p,onClick:()=>_e(e.id,t.id),children:ve(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,l.jsx)(L,{children:t.set_items.map(s=>(0,l.jsxs)(R,{done:ve(e.status,s.status||"pending")&&"pending"!==e.status,children:[(0,l.jsxs)(Y,{done:ve(e.status,s.status||"pending")&&"pending"!==e.status,children:[ge(s.name)," ",s.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:ve(e.status,s.status||"pending")&&"pending"!==e.status,children:["x ",s.quantity]})]}),(0,l.jsx)(K,{done:ve(e.status,s.status||"pending"),statusColor:p,onClick:()=>je(e.id,t.id,s.id),children:ve(e.status,s.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},s.id))})]},t.id))}),"pending"===e.status&&a>1&&(0,l.jsx)(V,{children:(0,l.jsx)(U,{color:"#F59E0B",onClick:()=>(async(e,t)=>{try{const i=s.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>{const s={...e,status:t};return e.set_items&&e.set_items.length>0&&(s.set_items=e.set_items.map(e=>({...e,status:t}))),s}),a=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:r.map(e=>({...e,status:e.status}))})}),n(t=>t.map(t=>t.id===e?{...t,items:r}:t)),await xe(e,t,!0)}catch{ce()}})(e.id,"preparing"),children:"Start All"})}),"preparing"===e.status&&a>1&&(0,l.jsxs)(V,{children:[(0,l.jsx)(Z,{onClick:()=>xe(e.id,"pending"),children:"\u21ba"}),(0,l.jsx)(U,{color:"#3B82F6",onClick:()=>(async e=>{try{const t=s.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{const t={...e,status:"ready"};return e.set_items&&e.set_items.length>0&&(t.set_items=e.set_items.map(e=>({...e,status:"ready"}))),t}),r=localStorage.getItem("auth_token"),a=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})});if(!(await a.json()).success)return;n(t=>t.map(t=>t.id===e?{...t,items:i}:t)),await xe(e,"ready",!0)}catch{ce()}})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&a>1&&(0,l.jsxs)(V,{children:[(0,l.jsx)(Z,{onClick:()=>xe(e.id,"preparing"),children:"\u21ba"}),(0,l.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})]})]},e.id)},Fe=e=>{const t=new Map;return s.filter(t=>t.status===e).forEach(s=>{const i=s.tableNumber?`T${s.tableNumber.replace(/^T/i,"")}`:s.pagerNumber?`P${s.pagerNumber}`:`#${s.pickupNumber}`;s.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{if(ve(e,n.status||"pending"))return;const r=n.name;t.has(r)||t.set(r,{menuName:n.name,formattedName:ge(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:s.orderTime});const a=t.get(r);a.plainQty+=n.quantity,s.orderTime<a.earliestTime&&(a.earliestTime=s.orderTime),a.plainSources.push({orderId:s.id,itemId:n.id,label:i,orderNumber:s.orderNumber,quantity:n.quantity,is_set_menu:!0})});else{var r;if(ve(e,n.status||"pending"))return;const a=n.name;t.has(a)||t.set(a,{menuName:n.name,formattedName:ge(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:s.orderTime});const o=t.get(a);s.orderTime<o.earliestTime&&(o.earliestTime=s.orderTime);const d=(null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!n.special_instructions?o.optionSources.push({orderId:s.id,itemId:n.id,label:i,orderNumber:s.orderNumber,quantity:n.quantity,options:d,special_instructions:n.special_instructions}):(o.plainQty+=n.quantity,o.plainSources.push({orderId:s.id,itemId:n.id,label:i,orderNumber:s.orderNumber,quantity:n.quantity}))}})}),Array.from(t.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())},ke=async(e,t)=>{const i=[...e.plainSources,...e.optionSources],r=new Map;i.forEach(e=>{r.has(e.orderId)||r.set(e.orderId,new Set),r.get(e.orderId).add(e.itemId)});const a=localStorage.getItem("auth_token"),o=Array.from(r.entries()).map(e=>{let[i,n]=e;const r=s.find(e=>e.id===i);if(!r)return null;const a=r.items.map(e=>{if(e.is_set_menu&&e.set_items){const s=e.set_items.map(e=>{if(!n.has(e.id))return e;if("forward"===t)return{...e,status:ye(r.status,e.status||"pending")};{const t={preparing:"pending",ready:"preparing",served:"ready"};return{...e,status:t[e.status||"pending"]||e.status}}}),i=s.every(e=>ve(r.status,e.status||"pending"))?ye(r.status,r.status):r.status;return{...e,set_items:s,status:i}}if(!n.has(e.id))return e;if("forward"===t)return{...e,status:ye(r.status,e.status||"pending")};{const t={preparing:"pending",ready:"preparing",served:"ready"};return{...e,status:t[e.status||"pending"]||e.status}}});return{orderId:i,order:r,updatedItems:a}}).filter(Boolean);try{if((await Promise.all(o.map(e=>{let{orderId:t,updatedItems:s}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...a?{Authorization:`Bearer ${a}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void ce();n(e=>e.map(e=>{const t=o.find(t=>t.orderId===e.id);return t?{...e,items:t.updatedItems}:e}));for(const{orderId:e,order:s,updatedItems:i}of o)if("forward"===t){if(be(i,s.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[s.status];t&&await xe(e,t,!0)}}else{const t={preparing:"pending",ready:"preparing",served:"ready"}[s.status];if(t){i.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>(e.status||"pending")===t):(e.status||"pending")===t)&&await xe(e,t,!0)}}}catch{ce()}},Ie=(e,t,s)=>{const i=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),n=e.plainSources.length+e.optionSources.length,r=new Map;e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const a=Array.from(r.entries()).map(e=>{let[t,s]=e;return s>1?`${t} x${s}`:t}).join(", "),o="pending"===s?"#F59E0B":"#3B82F6",d="pending"===s?n>1?"Start All":"Start":n>1?"Done All":"Done";return(0,l.jsxs)(te,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)(se,{children:[e.formattedName,i>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",i]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:["preparing"===s&&(0,l.jsx)(Z,{style:{padding:"6px 10px",fontSize:"12px"},onClick:()=>ke(e,"revert"),children:"\u21ba"}),(0,l.jsx)(U,{color:o,style:{flex:"none",padding:"6px 14px",fontSize:"12px"},onClick:()=>ke(e,"forward"),children:d})]})]}),e.plainQty>0&&(0,l.jsx)(ie,{children:a}),e.optionSources.length>0&&(0,l.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,s)=>{var i;return(0,l.jsxs)("div",{style:{padding:"6px 0",borderBottom:s<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,l.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,l.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,children:["x ",t.quantity]})]}),(0,l.jsxs)(O,{children:[null===(i=t.options)||void 0===i?void 0:i.map((e,t)=>(0,l.jsx)(J,{children:e},t)),t.special_instructions&&(0,l.jsx)(H,{children:t.special_instructions})]})]},`opt-${s}`)})})]},`${s}-group-${t}`)},Te=()=>s.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!fe(e)).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return(0,l.jsxs)(c,{children:[(0,l.jsx)(d.Ay,{title:"Kitchen Display",children:(0,l.jsxs)(g,{children:[(0,l.jsxs)(X,{children:[(0,l.jsx)(ee,{active:"order"===le,onClick:()=>{ue("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,l.jsx)(ee,{active:"item"===le,onClick:()=>{ue("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),(0,l.jsxs)(x,{connected:ae,children:[(0,l.jsx)(y,{connected:ae}),ae?"Live":"Offline"]}),(0,l.jsx)(h,{children:(0,p.fU)(W,de)})]})}),(0,l.jsx)(m,{children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"pending",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"pending",children:"Pending"})}),(0,l.jsx)(w,{color:"#F59E0B",children:$e.pending})]}),(0,l.jsx)(A,{children:"order"===le?Ae("pending").map(Se):Fe("pending").map((e,t)=>Ie(e,t,"pending"))})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"preparing",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"preparing",children:"Preparing"})}),(0,l.jsx)(w,{color:"#3B82F6",children:"order"===le?$e.preparing:Fe("preparing").reduce((e,t)=>e+t.plainSources.length+t.optionSources.length,0)})]}),(0,l.jsx)(A,{children:"order"===le?Ae("preparing").map(Se):Fe("preparing").map((e,t)=>Ie(e,t,"preparing"))})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(b,{status:"ready",children:[(0,l.jsx)(_,{children:(0,l.jsx)(j,{status:"ready",children:"Ready"})}),(0,l.jsx)(w,{color:"#10B981",children:"order"===le?$e.ready:Te().length})]}),(0,l.jsx)(A,{children:"order"===le?Ae("ready").map(Se):Te().map(e=>{const t=he(e.orderTime),s="#10B981";let i=0,r=0,a=0;const o=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{i++;const s=t.status||"pending";"ready"===s&&r++,"served"!==s&&"completed"!==s||a++,o.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:s,isSetItem:!0})});else{var t;i++;const s=e.status||"pending";"ready"===s&&r++,"served"!==s&&"completed"!==s||a++,o.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:s,isSetItem:!1})}});const d=i-r-a,p=i>0?a/i*100:0,c=o.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===c.length?null:(0,l.jsxs)($,{children:[(0,l.jsxs)(S,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,l.jsx)(I,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,l.jsxs)(I,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?u(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,l.jsx)(I,{variant:"delivery",children:"DELIVERY"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)(E,{children:e.orderNumber}),(0,l.jsxs)(C,{children:[t,"m"]})]})]}),i>1&&(0,l.jsxs)(D,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(N,{percent:p,color:s})}),(0,l.jsxs)(z,{children:[a,"/",i]})]}),(0,l.jsx)(G,{children:c.map((t,i)=>{var r;const a="served"===t.status||"completed"===t.status;return(0,l.jsxs)(q,{done:a,children:[(0,l.jsxs)(P,{children:[(0,l.jsxs)(M,{done:a,children:[ge(t.name)," ",t.quantity>1&&(0,l.jsxs)(Q,{highlight:!0,done:a,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,l.jsxs)(O,{children:[null===(r=t.options)||void 0===r?void 0:r.map((e,t)=>(0,l.jsx)(J,{done:a,children:e},t)),t.special_instructions&&(0,l.jsx)(H,{done:a,children:t.special_instructions})]})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!a&&(0,l.jsx)(Z,{style:{padding:"4px 8px",fontSize:"11px"},onClick:async()=>{const s=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"}),i=localStorage.getItem("auth_token");try{const t=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({order_items:s.map(e=>({...e,status:e.status}))})});if(!(await t.json()).success)return void ce();n(t=>t.map(t=>t.id===e.id?{...t,items:s}:t)),s.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await xe(e.id,"preparing",!0)}catch{ce()}},children:"\u21ba"}),(0,l.jsx)(K,{done:a,statusColor:s,onClick:()=>{t.isSetItem&&t.parentId?je(e.id,t.parentId,t.id):_e(e.id,t.id)},children:a?"Served":"Serve"})]})]},i)})}),d>0&&(0,l.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&c.length>1&&c.some(e=>"ready"===e.status)&&(0,l.jsx)(V,{children:(0,l.jsx)(U,{color:"#10B981",onClick:()=>we(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,s)=>{s.d(t,{Ay:()=>d});s(9950);var i=s(4752),n=s(4414);const r=i.Ay.div`
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
`,d=e=>{let{title:t,children:s}=e;return(0,n.jsxs)(r,{children:[(0,n.jsx)(a,{children:t}),s&&(0,n.jsx)(o,{children:s})]})}},8406:(e,t,s)=>{s.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>r,ng:()=>i,oB:()=>a,r6:()=>n});const i=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",n=(e,t,s)=>{if(!e)return"";const n=new Date(e);if(isNaN(n.getTime()))return"";const r={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:i(t)};return n.toLocaleString("en-MY",{...r,...s})},r=(e,t)=>n(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const s=new Date;s.setDate(s.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(s)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const s=Date.now()-t,i=Math.floor(s/6e4),n=Math.floor(s/36e5),r=Math.floor(s/864e5);return i<1?"just now":1===i?"1 min ago":i<60?`${i} mins ago`:1===n?"1 hour ago":n<24?`${n} hours ago`:1===r?"1 day ago":`${r} days ago`}}}]);