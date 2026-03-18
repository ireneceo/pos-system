"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>pe});var r=i(9950),n=i(4752),s=i(3422),a=i(1367),d=i(8930),o=i(9018),l=i(8012),p=i(8406),u=i(5863),c=i(4414);const m=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),r=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},n=r(t),s=r(i);return n.period===s.period?`${n.time} - ${s.time} ${s.period}`:`${n.time} ${n.period} - ${s.time} ${s.period}`},g=n.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,h=n.Ay.div`
  padding: 16px 20px;
`,x=n.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,y=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,f=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,v=n.Ay.div`
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
`,b=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,_=n.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,j=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border: 2px solid ${e=>{switch(e.status){case"pending":return"#FBBF24";case"preparing":return"#60A5FA";case"ready":return"#34D399";default:return"#E6EBF1"}}};
`,w=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,A=n.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,S=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
  display: flex;
  align-items: center;
  gap: 4px;
`,F=n.Ay.span`
  font-size: 20px;
  font-weight: 700;
`,k=n.Ay.span`
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
`,$=n.Ay.div`
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
`,I=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,N=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,T=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,D=n.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,C=n.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,B=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,q=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,M=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,z=n.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,P=n.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,O=n.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,Q=n.Ay.div`
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
`,K=n.Ay.div`
  flex: 1;
  min-width: 0;
`,W=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,H=n.Ay.div`
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
`,V=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,L=n.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,R=n.Ay.button`
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
`,Y=n.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,U=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,Z=n.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,G=n.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,X={"#F59E0B":{bg:"#F59E0B",hoverBg:"#D97706"},"#3B82F6":{bg:"#3B82F6",hoverBg:"#2563EB"},"#10B981":{bg:"#10B981",hoverBg:"#059669"}},ee={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},te=n.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: ${e=>{var t;return e.solid?"none":`1px solid ${(null===(t=ee[e.color])||void 0===t?void 0:t.text)||e.color}`}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t,i;return e.solid?(null===(t=X[e.color])||void 0===t?void 0:t.bg)||e.color:(null===(i=ee[e.color])||void 0===i?void 0:i.bg)||e.color}};
  color: ${e=>{var t;return e.solid?"#FFFFFF":(null===(t=ee[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t,i;return e.solid?(null===(t=X[e.color])||void 0===t?void 0:t.hoverBg)||e.color:(null===(i=ee[e.color])||void 0===i?void 0:i.hoverBg)||e.color}};
  }
`,ie=n.Ay.button`
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
`,re=n.Ay.div`
  margin-bottom: 4px;
`,ne=n.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,se=n.Ay.button`
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
`,ae=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,de=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,oe=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,le=r.memo(e=>{let{operationSettings:t}=e;const[i,n]=(0,r.useState)(new Date);return(0,r.useEffect)(()=>{const e=setInterval(()=>n(new Date),1e3);return()=>clearInterval(e)},[]),(0,c.jsx)(y,{children:(0,p.fU)(i,t)})}),pe=()=>{const{user:e}=(0,a.As)(),{menuItems:t,categories:i}=(0,d.b)(),{getStoreInfo:n,operationSettings:p}=(0,o.Pj)(),[y,X]=(0,r.useState)([]),[ee,pe]=(0,r.useState)(new Date),[,ue]=(0,r.useState)(null),[ce,me]=(0,r.useState)(!1),[ge,he]=(0,r.useState)(null),[xe,ye]=(0,r.useState)(()=>localStorage.getItem("kitchenDisplayViewMode")||"order"),[fe,ve]=(0,r.useState)([]),[be,_e]=(0,r.useState)([]),[je,we]=(0,r.useState)("all"),[Ae,Se]=(0,r.useState)(new Map),Fe=(e,t)=>{const i=[];return t.forEach((t,r)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var n;const s=t.set_items.map((i,n)=>({...i,id:`item-${e}-${r}-set-${n}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e}-${r}`,name:t.name||(null===(n=t.menuItem)||void 0===n?void 0:n.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;i.push({...t,id:`item-${e}-${r}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),i},ke=e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:(e.order_number||"").split("-")[1]||(e.order_number||"").slice(-3),pagerNumber:e.pager_number||void 0,items:Fe(e.id,t),status:e.status,orderTime:new Date(e.createdAt||Date.now()),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}},$e=e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0},Ie=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},Ne=(0,r.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:Ie()}),i=await t.json();if(i.success&&i.data){const e=i.data.filter($e).map(ke);X(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&Ee(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,r.useEffect)(()=>{p&&he(p)},[p]),(0,r.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;(async()=>{try{const i=await fetch(`/api/kitchen-stations?restaurant_id=${e.restaurantId}`,{headers:Ie()});if(i.ok){var t;const e=await i.json();_e(((null===(t=e.data)||void 0===t?void 0:t.stations)||[]).filter(e=>!1!==e.is_active))}}catch(i){console.error("Failed to load kitchen stations:",i)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,r.useEffect)(()=>{if(!t.length&&!i.length)return;const e=new Map;i.forEach(t=>{t.kitchen_station_id&&e.set(t.id,t.kitchen_station_id)});const r=new Map;t.forEach(t=>{t.kitchen_station_id?r.set(t.name,t.kitchen_station_id):e.has(t.category)&&r.set(t.name,e.get(t.category))}),Se(r),r.size>0?localStorage.setItem("kitchenStationMenuMap",JSON.stringify(Object.fromEntries(r))):localStorage.removeItem("kitchenStationMenuMap")},[t,i]),(0,r.useEffect)(()=>{Ne();const e=setInterval(Ne,3e4);return()=>clearInterval(e)},[Ne]),(0,r.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,s.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:500,reconnectionAttempts:1/0,timeout:1e4});return t.on("connect",()=>{me(!0),t.emit("join-restaurant",e.restaurantId),Ne()}),t.on("disconnect",()=>me(!1)),t.on("connect_error",()=>me(!1)),t.on("reconnect",()=>{me(!0),t.emit("join-restaurant",e.restaurantId),Ne()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const r=[];i.forEach((e,i)=>{const n=(e.special_instructions||"").match(/^\[(.*?)\]/);if(n){n[1].split(",").map(e=>e.trim()).forEach((n,s)=>{const a=n.match(/^(.*?)\s+x(\d+)$/);if(a){const[,n,d]=a;r.push({id:`item-${t.id}-${i}-set-${s}`,name:n.trim(),quantity:parseInt(d)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&r.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;r.push({id:`item-${t.id}-${i}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const n={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:r,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};X(e=>[n,...e]),Ee()}),t.on("order-updated",t=>{if(t.restaurant_id!==e.restaurantId)return;if(!$e(t))return void X(e=>e.filter(e=>e.id!==t.id.toString()));const i=ke(t);X(e=>e.some(e=>e.id===i.id)?e.map(e=>e.id===i.id?i:e):[i,...e])}),t.on("order-deleted",e=>{let{id:t}=e;X(e=>e.filter(e=>e.id!==t.toString()))}),ue(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,r.useEffect)(()=>{const e=setInterval(()=>pe(new Date),1e4);return()=>clearInterval(e)},[]);const Ee=()=>{new Audio("/notification.mp3").play().catch(()=>{})},Te=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},De=e=>Math.floor((ee.getTime()-e.getTime())/1e3/60),Ce=(e,t)=>{const i={orderNumber:e.orderNumber,date:e.orderTime,tableNumber:e.tableNumber,pagerNumber:e.pagerNumber,customerName:e.customerName||"Walk-in Customer",orderSource:e.source||"pos",items:(t||e.items).map(e=>({name:e.name,quantity:e.quantity,options:e.options||[],special_instructions:e.special_instructions||"",is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]}))};(0,u.Si)(i,n())},Be=async(e,t)=>{X(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!Pe(e))));try{const i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:Ie(),body:JSON.stringify({status:t})});(await i.json()).success||Ne()}catch{Ne()}},qe=(0,r.useCallback)(e=>{if("all"===je)return!0;return Ae.get(e)===je},[je,Ae]),Me=(0,r.useCallback)(e=>"all"===je||e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>qe(e.name)):qe(e.name)),[je,qe]),ze=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},Pe=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),Oe=(e,t)=>{switch(e){case"pending":return"preparing"===t||"ready"===t||"served"===t||"completed"===t;case"preparing":return"ready"===t||"served"===t||"completed"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},Qe=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>Oe(t,e.status||"pending")):Oe(t,e.status||"pending")),Ke=async(e,t)=>{const i=y.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>e.id===t?{...e,status:ze(i.status,e.status||"pending")}:e);X(t=>t.map(t=>t.id===e?{...t,items:r}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Ie(),body:JSON.stringify({order_items:r})});if(!(await t.json()).success)return void Ne();if(Qe(r,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await Be(e,t)}}catch{Ne()}},We=async(e,t,i)=>{const r=y.find(t=>t.id===e);if(!r)return;const n=r.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>e.id===i?{...e,status:ze(r.status,e.status||"pending")}:e),n=t.every(e=>Oe(r.status,e.status||"pending"))?ze(r.status,r.status):r.status;return{...e,set_items:t,status:n}}return e});X(t=>t.map(t=>t.id===e?{...t,items:n}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Ie(),body:JSON.stringify({order_items:n})});if(!(await t.json()).success)return void Ne();if(Qe(n,r.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[r.status];t&&await Be(e,t)}}catch{Ne()}},He=async(e,t,i)=>{X(i=>i.map(i=>i.id===e?{...i,items:t}:i));try{const r=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Ie(),body:JSON.stringify({order_items:t})});if(!(await r.json()).success)return void Ne();await Be(e,i)}catch{Ne()}},Je=e=>{const t=y.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{var t;return{...e,status:"served",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>({...e,status:"served"}))}});return He(e,i,"served")},Ve=(0,r.useMemo)(()=>{const e=e=>y.filter(t=>t.status===e).filter(Me).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[y,Me]),Le=e=>Ve[e]||[],Re=(0,r.useMemo)(()=>({pending:Ve.pending.length,preparing:Ve.preparing.length,ready:Ve.ready.length}),[Ve]),Ye=(0,r.useMemo)(()=>{const e=e=>e.reduce((e,t)=>e+t.items.reduce((e,t)=>t.is_set_menu&&t.set_items&&t.set_items.length>0?e+t.set_items.length:e+1,0),0);return{pending:e(Ve.pending),preparing:e(Ve.preparing),ready:e(Ve.ready)}},[Ve]),Ue=e=>Ye[e]||0,Ze=(0,r.useMemo)(()=>{const e=e=>y.filter(t=>t.status===e).reduce((t,i)=>t+i.items.reduce((t,i)=>i.is_set_menu&&i.set_items&&i.set_items.length>0?t+i.set_items.filter(t=>(t.status||"pending")===e).length:t+((i.status||"pending")===e?1:0),0),0);return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[y]),Ge=e=>Ze[e]||0,Xe=e=>{const t=De(e.orderTime),i=t>15&&"pending"===e.status;let n=0,s=0;e.items.forEach(t=>{t.is_set_menu&&t.set_items&&t.set_items.length>0?(n+=t.set_items.length,s+=t.set_items.filter(t=>Oe(e.status,t.status||"pending")).length):(n+=1,Oe(e.status,t.status||"pending")&&(s+=1))});const a=n>0?s/n*100:0,d=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,c.jsxs)(I,{children:[(0,c.jsxs)(N,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(T,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,c.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(D,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?m(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(D,{variant:"delivery",children:"DELIVERY"})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)(B,{children:e.orderNumber}),(0,c.jsxs)(q,{urgent:i,children:[t,"m"]})]})]}),n>1&&(0,c.jsxs)(M,{children:[(0,c.jsx)(z,{children:(0,c.jsx)(P,{percent:a,color:d})}),(0,c.jsxs)(O,{children:[s,"/",n]})]}),(0,c.jsx)(re,{children:e.items.map(t=>(0,c.jsxs)(r.Fragment,{children:[(0,c.jsxs)(Q,{done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,c.jsxs)(K,{children:[t.is_set_menu?(0,c.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[Te(t.name)," ",t.quantity>1&&(0,c.jsxs)(L,{highlight:!0,done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,c.jsxs)(W,{done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:[Te(t.name)," ",t.quantity>1&&(0,c.jsxs)(L,{highlight:!0,done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const r=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==r.length||t.special_instructions?(0,c.jsxs)(H,{children:[r.map((i,r)=>(0,c.jsx)(J,{done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:i},r)),t.special_instructions&&(0,c.jsx)(V,{done:Oe(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===n&&"pending"!==e.status&&(0,c.jsx)(ie,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&Be(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&1===n&&"pending"===e.status&&(0,c.jsx)(ie,{style:{padding:"6px 8px",marginRight:4},onClick:()=>Ce(e),title:"Print Kitchen Ticket",children:(0,c.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,c.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),!t.is_set_menu&&(0,c.jsx)(R,{done:Oe(e.status,t.status||"pending"),statusColor:d,onClick:()=>Ke(e.id,t.id),children:Oe(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,c.jsx)(Y,{children:t.set_items.map(i=>(0,c.jsxs)(U,{done:Oe(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,c.jsxs)(Z,{done:Oe(e.status,i.status||"pending")&&"pending"!==e.status,children:[Te(i.name)," ",i.quantity>1&&(0,c.jsxs)(L,{highlight:!0,done:Oe(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,c.jsx)(R,{done:Oe(e.status,i.status||"pending"),statusColor:d,onClick:()=>We(e.id,t.id,i.id),children:Oe(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&n>1&&(0,c.jsxs)(G,{children:[(0,c.jsx)(ie,{style:{flex:"none",padding:"8px 10px"},onClick:()=>Ce(e),title:"Print Kitchen Ticket",children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,c.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,c.jsx)(te,{color:"#F59E0B",onClick:()=>((e,t)=>{const i=y.find(t=>t.id===e);if(!i)return;const r=i.items.map(e=>{var i;return{...e,status:t,set_items:null===(i=e.set_items)||void 0===i?void 0:i.map(e=>({...e,status:t}))}});return He(e,r,t)})(e.id,"preparing"),children:"Start All"})]}),"preparing"===e.status&&n>1&&(0,c.jsxs)(G,{children:[(0,c.jsx)(ie,{onClick:()=>Be(e.id,"pending"),children:"\u21ba"}),(0,c.jsx)(te,{color:"#3B82F6",onClick:()=>(e=>{const t=y.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{var t;return{...e,status:"ready",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>({...e,status:"ready"}))}});return He(e,i,"ready")})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&n>1&&(0,c.jsxs)(G,{children:[(0,c.jsx)(ie,{onClick:()=>Be(e.id,"preparing"),children:"\u21ba"}),(0,c.jsx)(te,{color:"#10B981",onClick:()=>Je(e.id),children:"Serve All"})]})]},e.id)},et=(0,r.useMemo)(()=>(()=>{const e=new Map;return y.filter(e=>["pending","preparing"].includes(e.status)).forEach(t=>{const i=t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`;t.items.forEach(r=>{if(r.is_set_menu&&r.set_items&&r.set_items.length>0)r.set_items.forEach(r=>{if("pending"!==(r.status||"pending"))return;if(!qe(r.name))return;const n=r.name;e.has(n)||e.set(n,{menuName:r.name,formattedName:Te(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const s=e.get(n);s.plainQty+=r.quantity,t.orderTime<s.earliestTime&&(s.earliestTime=t.orderTime),s.plainSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity,is_set_menu:!0})});else{var n;if("pending"!==(r.status||"pending"))return;if(!qe(r.name))return;const s=r.name;e.has(s)||e.set(s,{menuName:r.name,formattedName:Te(r.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const a=e.get(s);t.orderTime<a.earliestTime&&(a.earliestTime=t.orderTime);const d=(null===(n=r.options)||void 0===n?void 0:n.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||r.special_instructions?a.optionSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity,options:d,special_instructions:r.special_instructions}):(a.plainQty+=r.quantity,a.plainSources.push({orderId:t.id,itemId:r.id,label:i,orderNumber:t.orderNumber,quantity:r.quantity}))}})}),Array.from(e.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})(),[y,je,Ae]),tt=()=>et,it=async(e,t,i)=>{const r=[...e.plainSources,...e.optionSources],n=new Map;r.forEach(e=>{n.has(e.orderId)||n.set(e.orderId,new Set),n.get(e.orderId).add(e.itemId)});const s=localStorage.getItem("auth_token"),a=Array.from(n.entries()).map(e=>{let[r,n]=e;const s=y.find(e=>e.id===r);if(!s)return null;const a=s.items.map(e=>{if(e.is_set_menu&&e.set_items){const r={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},d=i||s.status,o=e.set_items.map(e=>n.has(e.id)?"forward"===t?{...e,status:r[d]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}:e),l=o.every(e=>Oe(s.status,e.status||"pending"))&&r[s.status]||s.status;return{...e,set_items:o,status:l}}if(!n.has(e.id))return e;const r={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},d=i||s.status;return"forward"===t?{...e,status:r[d]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}});return{orderId:r,order:s,updatedItems:a}}).filter(Boolean);X(e=>e.map(e=>{const i=a.find(t=>t.orderId===e.id);if(!i)return e;const r={...e,items:i.updatedItems};if("revert"===t){const t={preparing:"pending",ready:"preparing"}[e.status];if(t){i.updatedItems.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>(e.status||"pending")===t):(e.status||"pending")===t)&&(r.status=t)}}return r}).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!Pe(e))));const d=new Set(r.map(e=>e.itemId));if("forward"===t&&"pending"===i){const t=`batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;ve(i=>[...i,{batchId:t,menuName:e.menuName,formattedName:e.formattedName,itemIds:d}])}else("forward"===t&&"preparing"===i||"revert"===t&&"preparing"===i)&&ve(e=>e.map(e=>({...e,itemIds:new Set(Array.from(e.itemIds).filter(e=>!d.has(e)))})).filter(e=>e.itemIds.size>0));try{if((await Promise.all(a.map(e=>{let{orderId:t,updatedItems:i}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void Ne()}catch{return void Ne()}const o=a.map(e=>{let{orderId:i,order:r,updatedItems:n}=e;if("forward"===t){if(Qe(n,r.status)){const e={pending:"preparing",preparing:"ready",ready:"served"}[r.status];if(e)return Be(i,e)}}else{const e={preparing:"pending",ready:"preparing",served:"ready"}[r.status];if(e){if(n.every(t=>t.is_set_menu&&t.set_items&&t.set_items.length>0?t.set_items.every(t=>(t.status||"pending")===e):(t.status||"pending")===e))return Be(i,e)}}return Promise.resolve()});await Promise.all(o)},rt=(e,t,i)=>{const r=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),s=new Map;e.plainSources.forEach(e=>{s.set(e.label,(s.get(e.label)||0)+e.quantity)});const a=Array.from(s.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),d="pending"===i?"#F59E0B":"#3B82F6",o=r<=1,l="pending"===i?o?"Start":"Start All":o?"Done":"Done All";return(0,c.jsxs)(ae,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,c.jsxs)(de,{children:[e.formattedName,r>1&&(0,c.jsxs)(L,{highlight:!0,children:["x ",r]})]}),(0,c.jsxs)("div",{style:{display:"flex",gap:6,alignItems:"center"},children:["preparing"===i&&(0,c.jsx)(ie,{style:{padding:"10px 14px",fontSize:"14px"},onClick:()=>it(e,"revert",i),children:"\u21ba"}),"pending"===i&&(0,c.jsx)(ie,{style:{padding:"10px 12px"},title:"Print Kitchen Ticket",onClick:()=>(e=>{e.plainSources,e.optionSources,e.plainQty,e.optionSources.reduce((e,t)=>e+t.quantity,0);const t=new Map;e.plainSources.forEach(e=>{t.set(e.label,(t.get(e.label)||0)+e.quantity)});const i=Array.from(t.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t});e.optionSources.forEach(e=>i.push(e.label));const r=[];e.plainQty>0&&r.push({name:e.menuName,quantity:e.plainQty,options:[],special_instructions:""}),e.optionSources.forEach(t=>{r.push({name:e.menuName,quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||""})});const s={orderNumber:i.join(", "),date:e.earliestTime,items:r,skipFooterLocation:!0};(0,u.Si)(s,n())})(e),children:(0,c.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,c.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,c.jsx)(te,{color:d,solid:o,style:{flex:"none",padding:"10px 20px",fontSize:"14px"},onClick:()=>it(e,"forward",i),children:l})]})]}),e.plainQty>0&&(0,c.jsx)(oe,{children:a}),e.optionSources.length>0&&(0,c.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var r;return(0,c.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,c.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,c.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,c.jsxs)("span",{style:{fontSize:11,fontWeight:600,color:"#9CA3AF"},children:["x",t.quantity]})]}),(0,c.jsxs)(H,{children:[null===(r=t.options)||void 0===r?void 0:r.map((e,t)=>(0,c.jsx)(J,{children:e},t)),t.special_instructions&&(0,c.jsx)(V,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},nt=(0,r.useMemo)(()=>y.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!Pe(e)).filter(Me).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),[y,Me]),st=()=>nt;return(0,c.jsxs)(g,{children:[(0,c.jsx)(l.Ay,{title:"Kitchen Display",children:(0,c.jsxs)(x,{children:[(0,c.jsxs)(ne,{children:[(0,c.jsx)(se,{active:"order"===xe,onClick:()=>{ye("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,c.jsx)(se,{active:"item"===xe,onClick:()=>{ye("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),be.length>0&&(0,c.jsxs)(ne,{children:[(0,c.jsx)(se,{active:"all"===je,onClick:()=>we("all"),children:"All"}),be.map(e=>(0,c.jsx)(se,{active:je===e.id,onClick:()=>we(e.id),children:e.name},e.id))]}),(0,c.jsxs)(f,{connected:ce,children:[(0,c.jsx)(v,{connected:ce}),ce?"Live":"Offline"]}),(0,c.jsx)(le,{operationSettings:ge})]})}),(0,c.jsx)(h,{children:(0,c.jsxs)(b,{children:[(0,c.jsxs)(_,{children:[(0,c.jsxs)(j,{status:"pending",children:[(0,c.jsx)(w,{children:(0,c.jsx)(A,{status:"pending",children:"Pending"})}),(0,c.jsx)(S,{color:"#F59E0B",children:"order"===xe?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:Re.pending}),(0,c.jsx)(k,{children:"Orders"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ue("pending")}),(0,c.jsx)(k,{children:"Items"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:tt().length}),(0,c.jsx)(k,{children:"Menus"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ge("pending")}),(0,c.jsx)(k,{children:"Items"})]})})]}),(0,c.jsx)($,{children:"order"===xe?Le("pending").map(Xe):tt().map((e,t)=>rt(e,t,"pending"))})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(j,{status:"preparing",children:[(0,c.jsx)(w,{children:(0,c.jsx)(A,{status:"preparing",children:"Preparing"})}),(0,c.jsx)(S,{color:"#3B82F6",children:"order"===xe?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:Re.preparing}),(0,c.jsx)(k,{children:"Orders"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ue("preparing")}),(0,c.jsx)(k,{children:"Items"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:Ge("preparing")}),(0,c.jsx)(k,{children:"Menus"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ge("preparing")}),(0,c.jsx)(k,{children:"Items"})]})})]}),(0,c.jsx)($,{children:"order"===xe?Le("preparing").map(Xe):(()=>{const e=[],t=new Set;return fe.forEach(i=>{const r={menuName:i.menuName,formattedName:i.formattedName,plainQty:0,plainSources:[],optionSources:[],earliestTime:new Date};let n=!1;y.filter(e=>["preparing","pending"].includes(e.status)).forEach(e=>{const s=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(a=>{if(a.is_set_menu&&a.set_items&&a.set_items.length>0)a.set_items.forEach(a=>{i.itemIds.has(a.id)&&"preparing"===(a.status||"pending")&&qe(a.name)&&(t.add(a.id),n=!0,r.plainQty+=a.quantity,r.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,is_set_menu:!0}),e.orderTime<r.earliestTime&&(r.earliestTime=e.orderTime))});else{var d;if(!i.itemIds.has(a.id))return;if("preparing"!==(a.status||"pending"))return;if(!qe(a.name))return;t.add(a.id),n=!0,e.orderTime<r.earliestTime&&(r.earliestTime=e.orderTime);const o=(null===(d=a.options)||void 0===d?void 0:d.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||!!a.special_instructions?r.optionSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,options:o,special_instructions:a.special_instructions}):(r.plainQty+=a.quantity,r.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity}))}})}),n&&e.push(r)}),y.filter(e=>"preparing"===e.status).forEach(i=>{const r=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{t.has(n.id)||"preparing"===(n.status||"pending")&&qe(n.name)&&e.push({menuName:n.name,formattedName:Te(n.name),plainQty:n.quantity,plainSources:[{orderId:i.id,itemId:n.id,label:r,orderNumber:i.orderNumber,quantity:n.quantity,is_set_menu:!0}],optionSources:[],earliestTime:i.orderTime})});else{var s;if(t.has(n.id))return;if("preparing"!==(n.status||"pending"))return;if(!qe(n.name))return;const a=(null===(s=n.options)||void 0===s?void 0:s.filter(e=>!/^.+\sx\d+$/.test(e)))||[],d=a.length>0||!!n.special_instructions;e.push({menuName:n.name,formattedName:Te(n.name),plainQty:d?0:n.quantity,plainSources:d?[]:[{orderId:i.id,itemId:n.id,label:r,orderNumber:i.orderNumber,quantity:n.quantity}],optionSources:d?[{orderId:i.id,itemId:n.id,label:r,orderNumber:i.orderNumber,quantity:n.quantity,options:a,special_instructions:n.special_instructions}]:[],earliestTime:i.orderTime})}})}),e.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime()),e.map((e,t)=>rt(e,t,"preparing"))})()})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(j,{status:"ready",children:[(0,c.jsx)(w,{children:(0,c.jsx)(A,{status:"ready",children:"Ready"})}),(0,c.jsx)(S,{color:"#10B981",children:"order"===xe?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:Re.ready}),(0,c.jsx)(k,{children:"Orders"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ue("ready")}),(0,c.jsx)(k,{children:"Items"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(F,{children:st().length}),(0,c.jsx)(k,{children:"Orders"}),(0,c.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,c.jsx)(F,{children:Ge("ready")}),(0,c.jsx)(k,{children:"Items"})]})})]}),(0,c.jsx)($,{children:"order"===xe?Le("ready").map(Xe):st().map(e=>{const t=De(e.orderTime),i="#10B981";let r=0,n=0,s=0;const a=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{r++;const i=t.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||s++,a.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;r++;const i=e.status||"pending";"ready"===i&&n++,"served"!==i&&"completed"!==i||s++,a.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const d=r-n-s,o=r>0?s/r*100:0,l=a.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===l.length?null:(0,c.jsxs)(I,{children:[(0,c.jsxs)(N,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(T,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,c.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,c.jsxs)(D,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?m(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,c.jsx)(D,{variant:"delivery",children:"DELIVERY"})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)(B,{children:e.orderNumber}),(0,c.jsxs)(q,{children:[t,"m"]})]})]}),r>1&&(0,c.jsxs)(M,{children:[(0,c.jsx)(z,{children:(0,c.jsx)(P,{percent:o,color:i})}),(0,c.jsxs)(O,{children:[s,"/",r]})]}),(0,c.jsx)(re,{children:l.map((t,r)=>{var n;const s="served"===t.status||"completed"===t.status;return(0,c.jsxs)(Q,{done:s,children:[(0,c.jsxs)(K,{children:[(0,c.jsxs)(W,{done:s,children:[Te(t.name)," ",t.quantity>1&&(0,c.jsxs)(L,{highlight:!0,done:s,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,c.jsxs)(H,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,c.jsx)(J,{done:s,children:e},t)),t.special_instructions&&(0,c.jsx)(V,{done:s,children:t.special_instructions})]})]}),(0,c.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!s&&(0,c.jsx)(ie,{style:{padding:"6px 10px",fontSize:"12px"},onClick:async()=>{const i=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"});X(t=>t.map(t=>t.id===e.id?{...t,items:i}:t)),ve(e=>[...e,{batchId:`batch-revert-${Date.now()}`,menuName:t.name,formattedName:Te(t.name),itemIds:new Set([t.id])}]);try{const t=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:Ie(),body:JSON.stringify({order_items:i})});if(!(await t.json()).success)return void Ne();i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await Be(e.id,"preparing")}catch{Ne()}},children:"\u21ba"}),(0,c.jsx)(R,{done:s,statusColor:i,onClick:()=>{t.isSetItem&&t.parentId?We(e.id,t.parentId,t.id):Ke(e.id,t.id)},children:s?"Served":"Serve"})]})]},r)})}),d>0&&(0,c.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&l.length>1&&l.some(e=>"ready"===e.status)&&(0,c.jsx)(G,{children:(0,c.jsx)(te,{color:"#10B981",onClick:()=>Je(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>o});i(9950);var r=i(4752),n=i(4414);const s=r.Ay.div`
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
`,d=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,o=e=>{let{title:t,children:i}=e;return(0,n.jsxs)(s,{children:[(0,n.jsx)(a,{children:t}),i&&(0,n.jsx)(d,{children:i})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>o,Vp:()=>d,fU:()=>s,ng:()=>r,oB:()=>a,r6:()=>n});const r=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",n=(e,t,i)=>{if(!e)return"";const n=new Date(e);if(isNaN(n.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:r(t)};return n.toLocaleString("en-MY",{...s,...i})},s=(e,t)=>n(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},o=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,r=Math.floor(i/6e4),n=Math.floor(i/36e5),s=Math.floor(i/864e5);return r<1?"just now":1===r?"1 min ago":r<60?`${r} mins ago`:1===n?"1 hour ago":n<24?`${n} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);