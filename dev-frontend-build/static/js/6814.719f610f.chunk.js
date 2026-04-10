"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>me});var n=i(9950),r=i(4492),s=i(4752),a=i(3422),o=i(1367),d=i(8930),l=i(9018),c=i(8012),p=i(8406),u=i(5863),m=i(5030),g=i(9955),h=i(4414);const y=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},r=n(t),s=n(i);return r.period===s.period?`${r.time} - ${s.time} ${s.period}`:`${r.time} ${r.period} - ${s.time} ${s.period}`},x=s.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,f=s.Ay.div`
  padding: 16px 20px;
`,v=s.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,b=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,_=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,j=s.Ay.div`
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
`,k=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,w=s.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    max-height: 600px;
  }
`,S=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${e=>{switch(e.status){case"pending":return"#FFF7ED";case"preparing":return"#EFF6FF";case"ready":return"#ECFDF5";default:return"#F6F9FC"}}};
  border: 2px solid ${e=>{switch(e.status){case"pending":return"#FBBF24";case"preparing":return"#60A5FA";case"ready":return"#34D399";default:return"#E6EBF1"}}};
`,F=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,N=s.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,A=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
  display: flex;
  align-items: center;
  gap: 4px;
`,$=s.Ay.span`
  font-size: 20px;
  font-weight: 700;
`,T=s.Ay.span`
  font-size: 11px;
  font-weight: 500;
  opacity: 0.7;
`,I=s.Ay.div`
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
`,D=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #C7D2FE;
  }
`,E=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,C=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,B=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,q=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,P=s.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,M=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,z=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,O=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,Q=s.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,J=s.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,H=s.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
`,R=s.Ay.div`
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
`,K=s.Ay.div`
  flex: 1;
  min-width: 0;
`,W=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,L=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,V=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,Z=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,U=s.Ay.span`
  font-weight: 700;
  margin-left: 6px;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  ${e=>e.highlight?`\n    padding: 1px 7px;\n    border-radius: 4px;\n    font-size: 14px;\n    letter-spacing: 0.5px;\n    ${e.done?"background: #E5E7EB; color: #9CA3AF;":"background: #FEF2F2; color: #DC2626;"}\n  `:"\n    color: inherit;\n  "}
`,Y=s.Ay.button`
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
`,G=s.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,X=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,ee=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,te=s.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,ie={"#F59E0B":{bg:"#F59E0B",hoverBg:"#D97706"},"#3B82F6":{bg:"#3B82F6",hoverBg:"#2563EB"},"#10B981":{bg:"#10B981",hoverBg:"#059669"}},ne={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},re=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: ${e=>{var t;return e.solid?"none":`1px solid ${(null===(t=ne[e.color])||void 0===t?void 0:t.text)||e.color}`}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t,i;return e.solid?(null===(t=ie[e.color])||void 0===t?void 0:t.bg)||e.color:(null===(i=ne[e.color])||void 0===i?void 0:i.bg)||e.color}};
  color: ${e=>{var t;return e.solid?"#FFFFFF":(null===(t=ne[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t,i;return e.solid?(null===(t=ie[e.color])||void 0===t?void 0:t.hoverBg)||e.color:(null===(i=ne[e.color])||void 0===i?void 0:i.hoverBg)||e.color}};
  }
`,se=s.Ay.button`
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
`,ae=s.Ay.div`
  margin-bottom: 4px;
`,oe=s.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,de=s.Ay.button`
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
`,le=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,ce=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,pe=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ue=n.memo(e=>{let{operationSettings:t}=e;const[i,r]=(0,n.useState)(new Date);return(0,n.useEffect)(()=>{const e=setInterval(()=>r(new Date),1e3);return()=>clearInterval(e)},[]),(0,h.jsx)(b,{children:(0,p.fU)(i,t)})}),me=()=>{const{t:e}=(0,m.Bd)("kitchen"),{user:t}=(0,o.As)(),{menuItems:s,categories:p}=(0,d.b)(),{getStoreInfo:b,operationSettings:ie}=(0,l.Pj)(),[ne,me]=(0,r.ok)(),[ge,he]=(0,n.useState)([]),[ye,xe]=(0,n.useState)(new Date),[,fe]=(0,n.useState)(null),[ve,be]=(0,n.useState)(!1),[_e,je]=(0,n.useState)(null),[ke,we]=(0,n.useState)(()=>"item"===localStorage.getItem("kitchenDisplayViewMode")?"item":"order"),[Se,Fe]=(0,n.useState)([]),[Ne,Ae]=(0,n.useState)(()=>"false"!==localStorage.getItem("sound_enabled")),[$e,Te]=(0,n.useState)([]),Ie=ne.get("station"),[De,Ee]=(0,n.useState)("all"),Ce=(0,n.useRef)(!1),[Be,qe]=(0,n.useState)({time_limit:0,max_count:0}),[Pe,Me]=(0,n.useState)(new Map),ze=(e,t)=>{const i=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const s=t.set_items.map((i,r)=>({...i,id:`item-${e}-${n}-set-${r}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e}-${n}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;i.push({...t,id:`item-${e}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),i},Oe=e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:(e.order_number||"").split("-")[1]||(e.order_number||"").slice(-3),pagerNumber:e.pager_number||void 0,items:ze(e.id,t),status:e.status,orderTime:new Date(e.createdAt||Date.now()),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}},Qe=e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0},Je=()=>{const e=(0,g.c4)();return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},He=(0,n.useCallback)(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=(null===_e||void 0===_e?void 0:_e.timeZone)||"Asia/Kuala_Lumpur",i=(new Date).toLocaleDateString("en-CA",{timeZone:e}),n=await fetch(`/api/orders/restaurant/${t.restaurantId}?startDate=${i}&endDate=${i}`,{credentials:"include",headers:Je()}),r=await n.json();if(r.success&&r.data){const e=r.data.filter(Qe).map(Oe);he(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&We.current(),e})}}catch(e){console.error("Failed to fetch orders:",e)}},[null===t||void 0===t?void 0:t.restaurantId,null===_e||void 0===_e?void 0:_e.timeZone]);(0,n.useEffect)(()=>{ie&&je(ie)},[ie]),(0,n.useEffect)(()=>{if(null===t||void 0===t||!t.restaurantId)return;(async()=>{try{const i=await fetch(`/api/kitchen-stations?restaurant_id=${t.restaurantId}`,{headers:Je()});if(i.ok){var e;const t=await i.json();Te(((null===(e=t.data)||void 0===e?void 0:e.stations)||[]).filter(e=>!1!==e.is_active))}}catch(i){console.error("Failed to load kitchen stations:",i)}})();(async()=>{try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{headers:Je()});if(e.ok){const t=await e.json(),i=t.data||t;i.kitchen_item_merge&&qe(i.kitchen_item_merge)}}catch(e){console.error("Failed to load item merge settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,n.useEffect)(()=>{if(Ce.current||!Ie||0===$e.length)return;const e=parseInt(Ie);!isNaN(e)&&e>=1&&e<=$e.length&&(Ee($e[e-1].id),Ce.current=!0)},[$e,Ie]),(0,n.useEffect)(()=>{if(!s.length&&!p.length)return;const e=new Map;p.forEach(t=>{t.kitchen_station_id&&e.set(Number(t.id),t.kitchen_station_id)});const t=new Map;s.forEach(i=>{const n=i.kitchen_station_id||e.get(Number(i.category));n&&(t.set(i.name,n),i.code&&t.set(`${i.code} ${i.name}`,n))}),Me(t),t.size>0?localStorage.setItem("kitchenStationMenuMap",JSON.stringify(Object.fromEntries(t))):localStorage.removeItem("kitchenStationMenuMap")},[s,p]),(0,n.useEffect)(()=>{He();const e=setInterval(He,3e4);return()=>clearInterval(e)},[He]),(0,n.useEffect)(()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=(0,a.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:500,reconnectionAttempts:1/0,timeout:1e4});return e.on("connect",()=>{be(!0),e.emit("join-restaurant",t.restaurantId),He()}),e.on("disconnect",()=>be(!1)),e.on("connect_error",()=>be(!1)),e.on("reconnect",()=>{be(!0),e.emit("join-restaurant",t.restaurantId),He()}),e.on("order-created",e=>{if(e.restaurant_id!==t.restaurantId)return;let i=e.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const n=[];i.forEach((t,i)=>{const r=(t.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,s)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;n.push({id:`item-${e.id}-${i}-set-${s}`,name:r.trim(),quantity:parseInt(o)*t.quantity,options:[],status:t.status||"pending",isSetItem:!0,parentSetName:t.name})}}),t.options&&t.options.length>0&&n.push({id:`item-${e.id}-${i}`,name:`${t.name} (Options)`,quantity:t.quantity,options:t.options,status:t.status||"pending"})}else{var s;n.push({id:`item-${e.id}-${i}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],status:t.status||"pending"})}});const r={id:e.id.toString(),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||e.order_number.slice(-3),items:n,status:e.status||"pending",orderTime:new Date(e.createdAt||Date.now()),tableNumber:e.table_number,customerName:e.customer_name,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null};he(e=>[r,...e]),We.current(i);try{var s,a;const t=(0,u.qs)();if((null===(s=t.kitchenPrinter)||void 0===s?void 0:s.enabled)&&(null===(a=t.kitchenPrinter)||void 0===a?void 0:a.autoPrint)){const t=b(),n={orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1],date:new Date(e.createdAt||Date.now()),orderType:e.order_type,orderSource:e.order_source||"pos",tableNumber:e.table_number||null,pagerNumber:e.pager_number||null,customerName:e.customer_name||"Walk-in Customer",items:i.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:e.notes||""};(0,u.Si)(n,t).then(t=>{t&&console.log("Kitchen ticket auto-printed for order",e.order_number)}).catch(e=>console.error("Auto-print failed:",e))}}catch(o){console.error("Auto-print error:",o)}}),e.on("order-updated",e=>{if(e.restaurant_id!==t.restaurantId)return;if(!Qe(e))return void he(t=>t.filter(t=>t.id!==e.id.toString()));const i=Oe(e);he(e=>e.some(e=>e.id===i.id)?e.map(e=>e.id===i.id?i:e):[i,...e])}),e.on("order-deleted",e=>{let{id:t}=e;he(e=>e.filter(e=>e.id!==t.toString()))}),fe(e),()=>{e.disconnect()}},[null===t||void 0===t?void 0:t.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>xe(new Date),1e4);return()=>clearInterval(e)},[]);const Re=(0,n.useCallback)(e=>{Ne&&i.e(2283).then(i.bind(i,2283)).then(t=>{let{startRepeatingSound:i}=t,n="bell";if("all"!==De){const t=$e.find(e=>e.id===De);if(t){if(e){if(!e.some(e=>{var t;const i=e.name||(null===(t=e.menuItem)||void 0===t?void 0:t.name)||"",n=Pe.get(i);return void 0===n||n===De}))return}n=t.alert_sound||"bell"}}i(n,3e3)})},[Ne,De,$e,Pe]),Ke=(0,n.useCallback)(()=>{i.e(2283).then(i.bind(i,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[]);(0,n.useEffect)(()=>{Ne||i.e(2283).then(i.bind(i,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[Ne]);const We=(0,n.useRef)(Re);(0,n.useEffect)(()=>{We.current=Re},[Re]);const Le=e=>{const t=(e=>{const t=s.find(t=>t.name===e);return(null===t||void 0===t?void 0:t.code)||""})(e);return t?`${t} ${e}`:e},Ve=e=>Math.floor((ye.getTime()-e.getTime())/1e3/60),Ze=(e,t)=>{const i={orderNumber:e.orderNumber,date:e.orderTime,tableNumber:e.tableNumber,pagerNumber:e.pagerNumber,customerName:e.customerName||"Walk-in Customer",orderSource:e.source||"pos",items:(t||e.items).map(e=>({name:e.name,quantity:e.quantity,options:e.options||[],special_instructions:e.special_instructions||"",is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]}))};(0,u.Si)(i,b())},Ue=async(e,t)=>{Ke(),he(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!et(e))));try{const i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({status:t})});(await i.json()).success||He()}catch{He()}},Ye=(0,n.useCallback)(e=>{if("all"===De)return!0;const t=Pe.get(e);return void 0===t||t===De},[De,Pe]),Ge=(0,n.useCallback)(e=>"all"===De||e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>Ye(e.name)):Ye(e.name)),[De,Ye]),Xe=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},et=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),tt=(e,t)=>{switch(e){case"pending":return"preparing"===t||"ready"===t||"served"===t||"completed"===t;case"preparing":return"ready"===t||"served"===t||"completed"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},it=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>tt(t,e.status||"pending")):tt(t,e.status||"pending")),nt=async(e,t)=>{Ke();const i=ge.find(t=>t.id===e);if(!i)return;const n=i.items.map(e=>e.id===t?{...e,status:Xe(i.status,e.status||"pending")}:e);he(t=>t.map(t=>t.id===e?{...t,items:n}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:n})});if(!(await t.json()).success)return void He();if(it(n,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await Ue(e,t)}}catch{He()}},rt=async(e,t,i)=>{const n=ge.find(t=>t.id===e);if(!n)return;const r=n.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>e.id===i?{...e,status:Xe(n.status,e.status||"pending")}:e),r=t.every(e=>tt(n.status,e.status||"pending"))?Xe(n.status,n.status):n.status;return{...e,set_items:t,status:r}}return e});he(t=>t.map(t=>t.id===e?{...t,items:r}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:r})});if(!(await t.json()).success)return void He();if(it(r,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await Ue(e,t)}}catch{He()}},st=async e=>{const t=ge.find(t=>t.id===e);if(!t)return;const i={pending:0,preparing:1,ready:2,served:3,completed:4},n=t.items.map(e=>{var t;const n=i[e.status||"pending"]||0;return{...e,status:n<3?"served":e.status||"pending",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>{const t=i[e.status||"pending"]||0;return{...e,status:t<3?"served":e.status||"pending"}})}});he(t=>t.map(t=>t.id===e?{...t,items:n}:t));try{const i=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:n})});if(!(await i.json()).success)return void He();if(it(n,t.status)){const i={pending:"preparing",preparing:"ready",ready:"served"}[t.status];i&&await Ue(e,i)}}catch{He()}},at=(0,n.useMemo)(()=>{const e=e=>ge.filter(t=>t.status===e).filter(Ge).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[ge,Ge]),ot=e=>at[e]||[],dt=(0,n.useMemo)(()=>({pending:at.pending.length,preparing:at.preparing.length,ready:at.ready.length}),[at]),lt=(0,n.useMemo)(()=>{const e=e=>e.reduce((e,t)=>e+t.items.reduce((e,t)=>t.is_set_menu&&t.set_items&&t.set_items.length>0?"all"===De?e+t.set_items.length:e+t.set_items.filter(e=>Ye(e.name)).length:"all"===De||Ye(t.name)?e+1:e,0),0);return{pending:e(at.pending),preparing:e(at.preparing),ready:e(at.ready)}},[at,De,Ye]),ct=e=>lt[e]||0,pt=(0,n.useMemo)(()=>{const e=e=>ge.filter(t=>t.status===e).reduce((t,i)=>t+i.items.reduce((t,i)=>i.is_set_menu&&i.set_items&&i.set_items.length>0?t+i.set_items.filter(t=>!("all"!==De&&!Ye(t.name))&&(t.status||"pending")===e).length:"all"===De||Ye(i.name)?t+((i.status||"pending")===e?1:0):t,0),0);return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[ge,De,Ye]),ut=e=>pt[e]||0,mt=t=>{const i=Ve(t.orderTime),r=i>15&&"pending"===t.status,s="all"===De?t.items:t.items.filter(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>Ye(e.name)):Ye(e.name));let a=0,o=0;s.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0){const i="all"===De?e.set_items:e.set_items.filter(e=>Ye(e.name));a+=i.length,o+=i.filter(e=>tt(t.status,e.status||"pending")).length}else a+=1,tt(t.status,e.status||"pending")&&(o+=1)});const d=a>0?o/a*100:0,l=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(t.status);return(0,h.jsxs)(D,{children:[(0,h.jsxs)(E,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(B,{children:t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`}),"takeaway"===t.orderType&&(0,h.jsx)(q,{children:e("kitchen:kitchenDisplayPage.takeaway")}),"pickup"===t.orderType&&(0,h.jsxs)(q,{variant:"pickup",children:["PICKUP ",t.scheduledPickupTime?y(t.scheduledPickupTime):"ASAP"]}),"delivery"===t.orderType&&(0,h.jsx)(q,{variant:"delivery",children:e("kitchen:kitchenDisplayPage.delivery")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(M,{children:t.orderNumber}),(0,h.jsxs)(z,{urgent:r,children:[i,"m"]})]})]}),a>1&&(0,h.jsxs)(O,{children:[(0,h.jsx)(Q,{children:(0,h.jsx)(J,{percent:d,color:l})}),(0,h.jsxs)(H,{children:[o,"/",a]})]}),(0,h.jsx)(ae,{children:s.map(e=>(0,h.jsxs)(n.Fragment,{children:[(0,h.jsxs)(R,{done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:[(0,h.jsxs)(K,{children:[e.is_set_menu?(0,h.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[Le(e.name)," ",e.quantity>1&&(0,h.jsxs)(U,{highlight:!0,done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:["x ",e.quantity]})]}):(0,h.jsxs)(W,{done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:[Le(e.name)," ",e.quantity>1&&(0,h.jsxs)(U,{highlight:!0,done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:["x ",e.quantity]})]}),(i=>{const n=(null===(i=e.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==n.length||e.special_instructions?(0,h.jsxs)(L,{children:[n.map((i,n)=>(0,h.jsx)(V,{done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:i},n)),e.special_instructions&&(0,h.jsx)(Z,{done:tt(t.status,e.status||"pending")&&"pending"!==t.status,children:e.special_instructions})]}):null})()]}),!e.is_set_menu&&1===a&&"pending"!==t.status&&(0,h.jsx)(se,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const e="preparing"===t.status?"pending":"ready"===t.status?"preparing":null;e&&Ue(t.id,e)},children:"\u21ba"}),!e.is_set_menu&&1===a&&"pending"===t.status&&(0,h.jsx)(se,{style:{padding:"6px 8px",marginRight:4},onClick:()=>Ze(t),title:"Print Kitchen Ticket",children:(0,h.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),!e.is_set_menu&&(0,h.jsx)(Y,{done:tt(t.status,e.status||"pending"),statusColor:l,onClick:()=>nt(t.id,e.id),children:tt(t.status,e.status||"pending")?"pending"===t.status?"Started":"preparing"===t.status?"Done \u2713":"Served":"pending"===t.status?"Start":"preparing"===t.status?"Done":"Serve"})]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,h.jsx)(G,{children:("all"===De?e.set_items:e.set_items.filter(e=>Ye(e.name))).map(i=>(0,h.jsxs)(X,{done:tt(t.status,i.status||"pending")&&"pending"!==t.status,children:[(0,h.jsxs)(ee,{done:tt(t.status,i.status||"pending")&&"pending"!==t.status,children:[Le(i.name)," ",i.quantity>1&&(0,h.jsxs)(U,{highlight:!0,done:tt(t.status,i.status||"pending")&&"pending"!==t.status,children:["x ",i.quantity]})]}),(0,h.jsx)(Y,{done:tt(t.status,i.status||"pending"),statusColor:l,onClick:()=>rt(t.id,e.id,i.id),children:tt(t.status,i.status||"pending")?"pending"===t.status?"Started":"preparing"===t.status?"Done \u2713":"Served":"pending"===t.status?"Start":"preparing"===t.status?"Done":"Serve"})]},i.id))})]},e.id))}),"pending"===t.status&&a>1&&(0,h.jsxs)(te,{children:[(0,h.jsx)(se,{style:{flex:"none",padding:"8px 10px"},onClick:()=>Ze(t),title:"Print Kitchen Ticket",children:(0,h.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,h.jsx)(re,{color:"#F59E0B",onClick:()=>(async(e,t)=>{const i=ge.find(t=>t.id===e);if(!i)return;const n={pending:0,preparing:1,ready:2,served:3,completed:4},r=n[t]||0,s=i.items.map(e=>{var i;const s=(n[e.status||"pending"]||0)<r?t:e.status||"pending";return{...e,status:s,set_items:null===(i=e.set_items)||void 0===i?void 0:i.map(e=>{const i=n[e.status||"pending"]||0;return{...e,status:i<r?t:e.status||"pending"}})}});he(t=>t.map(t=>t.id===e?{...t,items:s}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:s})});if(!(await t.json()).success)return void He();if(it(s,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await Ue(e,t)}}catch{He()}})(t.id,"preparing"),children:"Start All"})]}),"preparing"===t.status&&a>1&&(0,h.jsxs)(te,{children:[(0,h.jsx)(se,{onClick:()=>Ue(t.id,"pending"),children:"\u21ba"}),(0,h.jsx)(re,{color:"#3B82F6",onClick:()=>(async e=>{const t=ge.find(t=>t.id===e);if(!t)return;const i={pending:0,preparing:1,ready:2,served:3,completed:4},n=t.items.map(e=>{var t;const n=i[e.status||"pending"]||0;return{...e,status:n<2?"ready":e.status||"pending",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>{const t=i[e.status||"pending"]||0;return{...e,status:t<2?"ready":e.status||"pending"}})}});he(t=>t.map(t=>t.id===e?{...t,items:n}:t));try{const i=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:n})});if(!(await i.json()).success)return void He();if(it(n,t.status)){const i={pending:"preparing",preparing:"ready",ready:"served"}[t.status];i&&await Ue(e,i)}}catch{He()}})(t.id),children:"Mark Ready"})]}),"ready"===t.status&&a>1&&(0,h.jsxs)(te,{children:[(0,h.jsx)(se,{onClick:()=>Ue(t.id,"preparing"),children:"\u21ba"}),(0,h.jsx)(re,{color:"#10B981",onClick:()=>st(t.id),children:"Serve All"})]})]},t.id)},gt=(0,n.useMemo)(()=>(()=>{const e=new Map;return ge.filter(e=>["pending","preparing"].includes(e.status)).forEach(t=>{const i=t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`;t.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{if("pending"!==(n.status||"pending"))return;if(!Ye(n.name))return;const r=n.name;e.has(r)||e.set(r,{menuName:n.name,formattedName:Le(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const s=e.get(r);s.plainQty+=n.quantity,t.orderTime<s.earliestTime&&(s.earliestTime=t.orderTime),s.plainSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity,is_set_menu:!0})});else{var r;if("pending"!==(n.status||"pending"))return;if(!Ye(n.name))return;const s=n.name;e.has(s)||e.set(s,{menuName:n.name,formattedName:Le(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const a=e.get(s);t.orderTime<a.earliestTime&&(a.earliestTime=t.orderTime);const o=(null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||n.special_instructions?a.optionSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity,options:o,special_instructions:n.special_instructions}):(a.plainQty+=n.quantity,a.plainSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity}))}})}),Array.from(e.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})(),[ge,De,Pe]),ht=(0,n.useMemo)(()=>(e=>{const{time_limit:t,max_count:i}=Be;if(!t&&!i)return e;const n=[];for(const r of e){const e=[...r.plainSources.map(e=>({...e,isOption:!1})),...r.optionSources.map(e=>({...e,isOption:!0}))].map(e=>{const t=ge.find(t=>t.id===e.orderId);return{...e,orderTime:(null===t||void 0===t?void 0:t.orderTime)||r.earliestTime}}).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());if(0===e.length)continue;let s=[];if(t>0){let i=[],n=e[0].orderTime;for(const r of e)(r.orderTime.getTime()-n.getTime())/6e4>t&&i.length>0?(s.push({sources:i,earliestTime:n}),i=[r],n=r.orderTime):i.push(r);i.length>0&&s.push({sources:i,earliestTime:n})}else s=[{sources:e,earliestTime:r.earliestTime}];for(const t of s){const e=t.sources.reduce((e,t)=>e+t.quantity,0);if(i>0&&e>i){let e=[...t.sources];for(;e.length>0;){let s=0;const a=[],o=[];for(const t of e)if(s+t.quantity<=i)a.push(t),s+=t.quantity;else if(s<i){const e=i-s;a.push({...t,quantity:e}),o.push({...t,quantity:t.quantity-e}),s=i}else o.push(t);const d=a.filter(e=>!e.isOption),l=a.filter(e=>e.isOption);n.push({menuName:r.menuName,formattedName:r.formattedName,plainQty:d.reduce((e,t)=>e+t.quantity,0),plainSources:d,optionSources:l,earliestTime:t.earliestTime}),e=o}}else{const e=t.sources.filter(e=>!e.isOption),i=t.sources.filter(e=>e.isOption);n.push({menuName:r.menuName,formattedName:r.formattedName,plainQty:e.reduce((e,t)=>e+t.quantity,0),plainSources:e,optionSources:i,earliestTime:t.earliestTime})}}}return n.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})(gt),[gt,Be,ge]),yt=()=>ht,xt=async(e,t,i)=>{const n=[...e.plainSources,...e.optionSources],r=new Map;n.forEach(e=>{r.has(e.orderId)||r.set(e.orderId,new Set),r.get(e.orderId).add(e.itemId)});const s=(0,g.c4)(),a=Array.from(r.entries()).map(e=>{let[n,r]=e;const s=ge.find(e=>e.id===n);if(!s)return null;const a=s.items.map(e=>{if(e.is_set_menu&&e.set_items){const n={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},o=i||s.status,d=e.set_items.map(e=>r.has(e.id)?"forward"===t?{...e,status:n[o]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}:e),l=d.every(e=>tt(s.status,e.status||"pending"))&&n[s.status]||s.status;return{...e,set_items:d,status:l}}if(!r.has(e.id))return e;const n={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},o=i||s.status;return"forward"===t?{...e,status:n[o]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}});return{orderId:n,order:s,updatedItems:a}}).filter(Boolean);he(e=>e.map(e=>{const i=a.find(t=>t.orderId===e.id);if(!i)return e;const n={...e,items:i.updatedItems};if("revert"===t){const t={preparing:"pending",ready:"preparing"}[e.status];if(t){i.updatedItems.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>(e.status||"pending")===t):(e.status||"pending")===t)&&(n.status=t)}}return n}).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!et(e))));const o=new Set(n.map(e=>e.itemId));if("forward"===t&&"pending"===i){const t=`batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;Fe(i=>[...i,{batchId:t,menuName:e.menuName,formattedName:e.formattedName,itemIds:o}])}else("forward"===t&&"preparing"===i||"revert"===t&&"preparing"===i)&&Fe(e=>e.map(e=>({...e,itemIds:new Set(Array.from(e.itemIds).filter(e=>!o.has(e)))})).filter(e=>e.itemIds.size>0));try{if((await Promise.all(a.map(e=>{let{orderId:t,updatedItems:i}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void He()}catch{return void He()}const d=a.map(e=>{let{orderId:i,order:n,updatedItems:r}=e;if("forward"===t){if(it(r,n.status)){const e={pending:"preparing",preparing:"ready",ready:"served"}[n.status];if(e)return Ue(i,e)}}else{const e={preparing:"pending",ready:"preparing",served:"ready"}[n.status];if(e){if(r.every(t=>t.is_set_menu&&t.set_items&&t.set_items.length>0?t.set_items.every(t=>(t.status||"pending")===e):(t.status||"pending")===e))return Ue(i,e)}}return Promise.resolve()});await Promise.all(d)},ft=(e,t,i)=>{const n=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),r=new Map;e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const s=Array.from(r.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),a="pending"===i?"#F59E0B":"#3B82F6",o=n<=1,d="pending"===i?o?"Start":"Start All":o?"Done":"Done All";return(0,h.jsxs)(le,{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)(ce,{children:[e.formattedName,n>1&&(0,h.jsxs)(U,{highlight:!0,children:["x ",n]})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:6,alignItems:"center"},children:["preparing"===i&&(0,h.jsx)(se,{style:{padding:"10px 14px",fontSize:"14px"},onClick:()=>xt(e,"revert",i),children:"\u21ba"}),"pending"===i&&(0,h.jsx)(se,{style:{padding:"10px 12px"},title:"Print Kitchen Ticket",onClick:()=>(e=>{e.plainSources,e.optionSources,e.plainQty,e.optionSources.reduce((e,t)=>e+t.quantity,0);const t=new Map;e.plainSources.forEach(e=>{t.set(e.label,(t.get(e.label)||0)+e.quantity)});const i=Array.from(t.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t});e.optionSources.forEach(e=>i.push(e.label));const n=[];e.plainQty>0&&n.push({name:e.menuName,quantity:e.plainQty,options:[],special_instructions:""}),e.optionSources.forEach(t=>{n.push({name:e.menuName,quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||""})});const r={orderNumber:i.join(", "),date:e.earliestTime,items:n,skipFooterLocation:!0};(0,u.Si)(r,b())})(e),children:(0,h.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,h.jsx)(re,{color:a,solid:o,style:{flex:"none",padding:"10px 20px",fontSize:"14px"},onClick:()=>xt(e,"forward",i),children:d})]})]}),e.plainQty>0&&(0,h.jsx)(pe,{children:s}),e.optionSources.length>0&&(0,h.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var n;return(0,h.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,h.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,h.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,h.jsxs)("span",{style:{fontSize:11,fontWeight:600,color:"#9CA3AF"},children:["x",t.quantity]})]}),(0,h.jsxs)(L,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,h.jsx)(V,{children:e},t)),t.special_instructions&&(0,h.jsx)(Z,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},vt=(0,n.useMemo)(()=>ge.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!et(e)).filter(Ge).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),[ge,Ge,De,Ye]),bt=()=>vt;return(0,h.jsxs)(x,{children:[(0,h.jsx)(c.Ay,{title:"Kitchen Display",children:(0,h.jsxs)(v,{children:["item"===ke&&(0,h.jsxs)("a",{href:`/restaurant/${null===t||void 0===t?void 0:t.restaurantId}/settings?tab=kitchenStations`,target:"_blank",rel:"noopener noreferrer",style:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 12px",background:"#F0F0FF",color:"#635BFF",borderRadius:"8px",fontSize:"12px",fontWeight:500,textDecoration:"none",whiteSpace:"nowrap",border:"none"},children:[Be.time_limit>0||Be.max_count>0?`Merge: ${Be.time_limit>0?Be.time_limit+"min":""}${Be.time_limit>0&&Be.max_count>0?", ":""}${Be.max_count>0?"max "+Be.max_count:""}`:"Merge: No limit",(0,h.jsx)("span",{style:{fontSize:"14px"},children:"\u2699"})]}),(0,h.jsxs)(oe,{children:[(0,h.jsx)(de,{active:"order"===ke,onClick:()=>{we("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:e("kitchen:kitchenDisplayPage.order")}),(0,h.jsx)(de,{active:"item"===ke,onClick:()=>{we("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:e("kitchen:kitchenDisplayPage.item")})]}),$e.length>0&&(0,h.jsxs)(oe,{children:[(0,h.jsx)(de,{active:"all"===De,onClick:()=>{Ee("all"),me({})},children:e("kitchen:kitchenDisplayPage.all")}),$e.map((e,t)=>(0,h.jsx)(de,{active:De===e.id,onClick:()=>{Ee(e.id),me({station:String(t+1)})},children:e.name},e.id))]}),(0,h.jsx)("button",{onClick:()=>{Ae(e=>{const t=!e;return localStorage.setItem("sound_enabled",String(t)),t})},title:Ne?"Sound ON":"Sound OFF",style:{width:"40px",height:"40px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,background:Ne?"#635BFF":"#E6EBF1",transition:"all 0.15s"},children:(0,h.jsx)("img",{src:Ne?"/speaker-on.svg":"/speaker-off.svg",alt:Ne?"Sound ON":"Sound OFF",style:{width:"22px",height:"22px",filter:Ne?"invert(1)":"opacity(0.4)"}})}),(0,h.jsxs)(_,{connected:ve,children:[(0,h.jsx)(j,{connected:ve}),ve?"Live":"Offline"]}),(0,h.jsx)(ue,{operationSettings:_e})]})}),(0,h.jsx)(f,{children:(0,h.jsxs)(k,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(S,{status:"pending",children:[(0,h.jsx)(F,{children:(0,h.jsx)(N,{status:"pending",children:e("kitchen:kitchenDisplayPage.pending")})}),(0,h.jsx)(A,{color:"#F59E0B",children:"order"===ke?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:dt.pending}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.orders")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ct("pending")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:yt().length}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.menus")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ut("pending")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]})})]}),(0,h.jsx)(I,{children:"order"===ke?ot("pending").map(mt):yt().map((e,t)=>ft(e,t,"pending"))})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(S,{status:"preparing",children:[(0,h.jsx)(F,{children:(0,h.jsx)(N,{status:"preparing",children:e("kitchen:kitchenDisplayPage.preparing")})}),(0,h.jsx)(A,{color:"#3B82F6",children:"order"===ke?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:dt.preparing}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.orders")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ct("preparing")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:ut("preparing")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.menus")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ut("preparing")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]})})]}),(0,h.jsx)(I,{children:"order"===ke?ot("preparing").map(mt):(()=>{const e=[],t=new Set;return Se.forEach(i=>{const n={menuName:i.menuName,formattedName:i.formattedName,plainQty:0,plainSources:[],optionSources:[],earliestTime:new Date};let r=!1;ge.filter(e=>["preparing","pending"].includes(e.status)).forEach(e=>{const s=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(a=>{if(a.is_set_menu&&a.set_items&&a.set_items.length>0)a.set_items.forEach(a=>{i.itemIds.has(a.id)&&"preparing"===(a.status||"pending")&&Ye(a.name)&&(t.add(a.id),r=!0,n.plainQty+=a.quantity,n.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,is_set_menu:!0}),e.orderTime<n.earliestTime&&(n.earliestTime=e.orderTime))});else{var o;if(!i.itemIds.has(a.id))return;if("preparing"!==(a.status||"pending"))return;if(!Ye(a.name))return;t.add(a.id),r=!0,e.orderTime<n.earliestTime&&(n.earliestTime=e.orderTime);const d=(null===(o=a.options)||void 0===o?void 0:o.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!a.special_instructions?n.optionSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,options:d,special_instructions:a.special_instructions}):(n.plainQty+=a.quantity,n.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity}))}})}),r&&e.push(n)}),ge.filter(e=>"preparing"===e.status).forEach(i=>{const n=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(r=>{if(r.is_set_menu&&r.set_items&&r.set_items.length>0)r.set_items.forEach(r=>{t.has(r.id)||"preparing"===(r.status||"pending")&&Ye(r.name)&&e.push({menuName:r.name,formattedName:Le(r.name),plainQty:r.quantity,plainSources:[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity,is_set_menu:!0}],optionSources:[],earliestTime:i.orderTime})});else{var s;if(t.has(r.id))return;if("preparing"!==(r.status||"pending"))return;if(!Ye(r.name))return;const a=(null===(s=r.options)||void 0===s?void 0:s.filter(e=>!/^.+\sx\d+$/.test(e)))||[],o=a.length>0||!!r.special_instructions;e.push({menuName:r.name,formattedName:Le(r.name),plainQty:o?0:r.quantity,plainSources:o?[]:[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity}],optionSources:o?[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity,options:a,special_instructions:r.special_instructions}]:[],earliestTime:i.orderTime})}})}),e.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime()),e.map((e,t)=>ft(e,t,"preparing"))})()})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(S,{status:"ready",children:[(0,h.jsx)(F,{children:(0,h.jsx)(N,{status:"ready",children:e("kitchen:kitchenDisplayPage.ready")})}),(0,h.jsx)(A,{color:"#10B981",children:"order"===ke?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:dt.ready}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.orders")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ct("ready")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:bt().length}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.orders")}),(0,h.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,h.jsx)($,{children:ut("ready")}),(0,h.jsx)(T,{children:e("kitchen:kitchenDisplayPage.items")})]})})]}),(0,h.jsx)(I,{children:"order"===ke?ot("ready").map(mt):bt().map(t=>{const i=Ve(t.orderTime),n="#10B981";let r=0,s=0,a=0;const o=[];t.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{if("all"!==De&&!Ye(t.name))return;r++;const i=t.status||"pending";"ready"===i&&s++,"served"!==i&&"completed"!==i||a++,o.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;if("all"!==De&&!Ye(e.name))return;r++;const i=e.status||"pending";"ready"===i&&s++,"served"!==i&&"completed"!==i||a++,o.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const d=r-s-a,l=r>0?a/r*100:0,c=o.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===c.length?null:(0,h.jsxs)(D,{children:[(0,h.jsxs)(E,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(B,{children:t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`}),"takeaway"===t.orderType&&(0,h.jsx)(q,{children:e("kitchen:kitchenDisplayPage.takeaway")}),"pickup"===t.orderType&&(0,h.jsxs)(q,{variant:"pickup",children:["PICKUP ",t.scheduledPickupTime?y(t.scheduledPickupTime):"ASAP"]}),"delivery"===t.orderType&&(0,h.jsx)(q,{variant:"delivery",children:e("kitchen:kitchenDisplayPage.delivery")})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(M,{children:t.orderNumber}),(0,h.jsxs)(z,{children:[i,"m"]})]})]}),r>1&&(0,h.jsxs)(O,{children:[(0,h.jsx)(Q,{children:(0,h.jsx)(J,{percent:l,color:n})}),(0,h.jsxs)(H,{children:[a,"/",r]})]}),(0,h.jsx)(ae,{children:c.map((e,i)=>{var r;const s="served"===e.status||"completed"===e.status;return(0,h.jsxs)(R,{done:s,children:[(0,h.jsxs)(K,{children:[(0,h.jsxs)(W,{done:s,children:[Le(e.name)," ",e.quantity>1&&(0,h.jsxs)(U,{highlight:!0,done:s,children:["x ",e.quantity]})]}),(e.options&&e.options.length>0||e.special_instructions)&&(0,h.jsxs)(L,{children:[null===(r=e.options)||void 0===r?void 0:r.map((e,t)=>(0,h.jsx)(V,{done:s,children:e},t)),e.special_instructions&&(0,h.jsx)(Z,{done:s,children:e.special_instructions})]})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!s&&(0,h.jsx)(se,{style:{padding:"6px 10px",fontSize:"12px"},onClick:async()=>{const i=t.items.map(t=>e.isSetItem&&e.parentId&&t.id===e.parentId&&t.set_items?{...t,set_items:t.set_items.map(t=>t.id===e.id?{...t,status:"preparing"}:t)}:e.isSetItem||t.id!==e.id?t:{...t,status:"preparing"});he(e=>e.map(e=>e.id===t.id?{...e,items:i}:e)),Fe(t=>[...t,{batchId:`batch-revert-${Date.now()}`,menuName:e.name,formattedName:Le(e.name),itemIds:new Set([e.id])}]);try{const e=await fetch(`/api/orders/${t.id}/items`,{method:"PATCH",credentials:"include",headers:Je(),body:JSON.stringify({order_items:i})});if(!(await e.json()).success)return void He();i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==t.status||await Ue(t.id,"preparing")}catch{He()}},children:"\u21ba"}),(0,h.jsx)(Y,{done:s,statusColor:n,onClick:()=>{e.isSetItem&&e.parentId?rt(t.id,e.parentId,e.id):nt(t.id,e.id)},children:s?"Served":"Serve"})]})]},i)})}),d>0&&(0,h.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",d," item",d>1?"s":""," from kitchen"]}),0===d&&c.length>1&&c.some(e=>"ready"===e.status)&&(0,h.jsx)(te,{children:(0,h.jsx)(re,{color:"#10B981",onClick:()=>st(t.id),children:e("kitchen:kitchenDisplayPage.serveAll")})})]},t.id)})})]})]})})]})}},8406:(e,t,i)=>{i.d(t,{MQ:()=>d,Vp:()=>o,fU:()=>s,ng:()=>n,oB:()=>a,r6:()=>r});const n=e=>(null===e||void 0===e?void 0:e.timeZone)||"Asia/Kuala_Lumpur",r=(e,t,i)=>{if(!e)return"";const r=new Date(e);if(isNaN(r.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:n(t)};return r.toLocaleString("en-MY",{...s,...i})},s=(e,t)=>r(e,t,{year:void 0,month:void 0,day:void 0}),a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const t=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(t)}catch{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},o=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const i=new Date;i.setDate(i.getDate()+e);return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(i)}catch{const t=new Date;return t.setDate(t.getDate()+e),`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},d=e=>{if(!e)return"just now";const t=new Date(e).getTime();if(isNaN(t))return"just now";const i=Date.now()-t,n=Math.floor(i/6e4),r=Math.floor(i/36e5),s=Math.floor(i/864e5);return n<1?"just now":1===n?"1 min ago":n<60?`${n} mins ago`:1===r?"1 hour ago":r<24?`${r} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);