"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6814],{6814:(e,t,i)=>{i.r(t),i.d(t,{default:()=>pe});var n=i(9950),r=i(4492),s=i(4752),a=i(3422),o=i(1367),d=i(8930),l=i(9018),u=i(8012),p=i(8406),c=i(5863),m=i(4414);const g=e=>{const t=new Date(e),i=new Date(t.getTime()+18e5),n=e=>{const t=e.getHours(),i=t>=12?"PM":"AM";return{time:`${t%12||12}:${e.getMinutes().toString().padStart(2,"0")}`,period:i}},r=n(t),s=n(i);return r.period===s.period?`${r.time} - ${s.time} ${s.period}`:`${r.time} ${r.period} - ${s.time} ${s.period}`},h=s.Ay.div`
  background: #F0F2F5;
  min-height: 100vh;
  color: #0A2540;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`,x=s.Ay.div`
  padding: 16px 20px;
`,y=s.Ay.div`
  display: flex;
  gap: 24px;
  align-items: center;
`,f=s.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #6B7C93;
`,v=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: ${e=>e.connected?"#059669":"#DC2626"};
`,b=s.Ay.div`
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
`,_=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: calc(100vh - 140px);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;
    gap: 12px;
  }
`,j=s.Ay.div`
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
`,w=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,k=s.Ay.h2`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${e=>{switch(e.status){case"pending":return"#D97706";case"preparing":return"#2563EB";case"ready":return"#059669";default:return"#0A2540"}}};
`,F=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.color||"#0A2540"};
  display: flex;
  align-items: center;
  gap: 4px;
`,A=s.Ay.span`
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
`,N=s.Ay.div`
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
`,E=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,C=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,D=s.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"pickup":return"#EDE9FE";case"delivery":return"#D1FAE5";default:return"#FEF3C7"}}};
  color: ${e=>{switch(e.variant){case"pickup":return"#7C3AED";case"delivery":return"#059669";default:return"#D97706"}}};
`,B=s.Ay.div`
  text-align: right;
  flex-shrink: 0;
`,q=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,M=s.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${e=>e.urgent?"#DC2626":"#6B7C93"};
`,z=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`,P=s.Ay.div`
  flex: 1;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
`,Q=s.Ay.div`
  height: 100%;
  width: ${e=>e.percent}%;
  background: ${e=>e.color};
  border-radius: 2px;
  transition: width 0.3s ease;
`,O=s.Ay.div`
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
`,W=s.Ay.div`
  flex: 1;
  min-width: 0;
`,K=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
`,J=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`,H=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.done?"#E5E7EB":"#EDE9FE"};
  color: ${e=>e.done?"#9CA3AF":"#6D28D9"};
`,L=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-style: italic;
  background: ${e=>e.done?"#E5E7EB":"#FEF2F2"};
  color: ${e=>e.done?"#9CA3AF":"#DC2626"};
`,V=s.Ay.span`
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
`,U=s.Ay.div`
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #E6EBF1;
`,Z=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin: 0 -8px;
  border-radius: 4px;
  background: ${e=>e.done?"#F3F4F6":"transparent"};
`,G=s.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${e=>e.done?"#D1D5DB":"#0A2540"};
  flex: 1;
`,X=s.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 8px;
`,ee={"#F59E0B":{bg:"#F59E0B",hoverBg:"#D97706"},"#3B82F6":{bg:"#3B82F6",hoverBg:"#2563EB"},"#10B981":{bg:"#10B981",hoverBg:"#059669"}},te={"#F59E0B":{bg:"#FFF7ED",text:"#D97706",hoverBg:"#FEF3C7"},"#3B82F6":{bg:"#EFF6FF",text:"#1D4ED8",hoverBg:"#DBEAFE"},"#10B981":{bg:"#ECFDF5",text:"#047857",hoverBg:"#D1FAE5"}},ie=s.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border: ${e=>{var t;return e.solid?"none":`1px solid ${(null===(t=te[e.color])||void 0===t?void 0:t.text)||e.color}`}};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>{var t,i;return e.solid?(null===(t=ee[e.color])||void 0===t?void 0:t.bg)||e.color:(null===(i=te[e.color])||void 0===i?void 0:i.bg)||e.color}};
  color: ${e=>{var t;return e.solid?"#FFFFFF":(null===(t=te[e.color])||void 0===t?void 0:t.text)||"white"}};

  &:hover {
    background: ${e=>{var t,i;return e.solid?(null===(t=ee[e.color])||void 0===t?void 0:t.hoverBg)||e.color:(null===(i=te[e.color])||void 0===i?void 0:i.hoverBg)||e.color}};
  }
`,ne=s.Ay.button`
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
`,re=s.Ay.div`
  margin-bottom: 4px;
`,se=s.Ay.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`,ae=s.Ay.button`
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
`,oe=s.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
`,de=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  display: flex;
  align-items: center;
  gap: 6px;
`,le=s.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
  line-height: 1.4;
`,ue=n.memo(e=>{let{operationSettings:t}=e;const[i,r]=(0,n.useState)(new Date);return(0,n.useEffect)(()=>{const e=setInterval(()=>r(new Date),1e3);return()=>clearInterval(e)},[]),(0,m.jsx)(f,{children:(0,p.fU)(i,t)})}),pe=()=>{const{user:e}=(0,o.As)(),{menuItems:t,categories:s}=(0,d.b)(),{getStoreInfo:p,operationSettings:f}=(0,l.Pj)(),[ee,te]=(0,r.ok)(),[pe,ce]=(0,n.useState)([]),[me,ge]=(0,n.useState)(new Date),[,he]=(0,n.useState)(null),[xe,ye]=(0,n.useState)(!1),[fe,ve]=(0,n.useState)(null),[be,_e]=(0,n.useState)("order"),[je,Se]=(0,n.useState)([]),[we,ke]=(0,n.useState)(()=>"false"!==localStorage.getItem("sound_enabled")),[Fe,Ae]=(0,n.useState)([]),Te=ee.get("station"),[Ie,Ne]=(0,n.useState)(()=>Te&&!isNaN(Number(Te))?Number(Te):"all"),[$e,Ee]=(0,n.useState)({time_limit:0,max_count:0}),[Ce,De]=(0,n.useState)(new Map),Be=(e,t)=>{const i=[];return t.forEach((t,n)=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){var r;const s=t.set_items.map((i,r)=>({...i,id:`item-${e}-${n}-set-${r}`,name:i.name,quantity:i.quantity*(t.quantity||1),status:i.status||"pending"}));i.push({...t,id:`item-${e}-${n}`,name:t.name||(null===(r=t.menuItem)||void 0===r?void 0:r.name)||"Set Menu",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!0,set_items:s})}else{var s;i.push({...t,id:`item-${e}-${n}`,name:t.name||(null===(s=t.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||t.specialInstructions||"",status:t.status||"pending",is_set_menu:!1})}}),i},qe=e=>{let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{id:e.id.toString(),orderNumber:e.order_number,pickupNumber:(e.order_number||"").split("-")[1]||(e.order_number||"").slice(-3),pagerNumber:e.pager_number||void 0,items:Be(e.id,t),status:e.status,orderTime:new Date(e.createdAt||Date.now()),paymentStatus:e.payment_status,customerName:e.customer_name||void 0,tableNumber:e.table_number||void 0,orderType:e.order_type||"dine-in",source:e.source||"pos",scheduledPickupTime:e.scheduled_pickup_time||null}},Me=e=>{if(!["pending","preparing","ready"].includes(e.status))return!1;if("ready"===e.status){let t=e.order_items||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}if(t.length>0&&t.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status))return!1}return!0},ze=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},Pe=(0,n.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=await fetch(`/api/orders/restaurant/${e.restaurantId}`,{credentials:"include",headers:ze()}),i=await t.json();if(i.success&&i.data){const e=i.data.filter(Me).map(qe);ce(t=>{const i=new Set(t.map(e=>e.id));return e.filter(e=>!i.has(e.id)).length>0&&Re.current(),e})}}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,n.useEffect)(()=>{f&&ve(f)},[f]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;(async()=>{try{const i=await fetch(`/api/kitchen-stations?restaurant_id=${e.restaurantId}`,{headers:ze()});if(i.ok){var t;const e=await i.json();Ae(((null===(t=e.data)||void 0===t?void 0:t.stations)||[]).filter(e=>!1!==e.is_active))}}catch(i){console.error("Failed to load kitchen stations:",i)}})();(async()=>{try{const t=await fetch(`/api/restaurants/${e.restaurantId}`,{headers:ze()});if(t.ok){const e=await t.json(),i=e.data||e;i.kitchen_item_merge&&Ee(i.kitchen_item_merge)}}catch(t){console.error("Failed to load item merge settings:",t)}})()},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{if(!t.length&&!s.length)return;const e=new Map;s.forEach(t=>{t.kitchen_station_id&&e.set(t.id,t.kitchen_station_id)});const i=new Map;t.forEach(t=>{t.kitchen_station_id?i.set(t.name,t.kitchen_station_id):e.has(t.category)&&i.set(t.name,e.get(t.category))}),De(i),i.size>0?localStorage.setItem("kitchenStationMenuMap",JSON.stringify(Object.fromEntries(i))):localStorage.removeItem("kitchenStationMenuMap")},[t,s]),(0,n.useEffect)(()=>{Pe();const e=setInterval(Pe,3e4);return()=>clearInterval(e)},[Pe]),(0,n.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,a.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:500,reconnectionAttempts:1/0,timeout:1e4});return t.on("connect",()=>{ye(!0),t.emit("join-restaurant",e.restaurantId),Pe()}),t.on("disconnect",()=>ye(!1)),t.on("connect_error",()=>ye(!1)),t.on("reconnect",()=>{ye(!0),t.emit("join-restaurant",e.restaurantId),Pe()}),t.on("order-created",t=>{if(t.restaurant_id!==e.restaurantId)return;let i=t.order_items||[];if("string"===typeof i)try{i=JSON.parse(i)}catch{i=[]}const n=[];i.forEach((e,i)=>{const r=(e.special_instructions||"").match(/^\[(.*?)\]/);if(r){r[1].split(",").map(e=>e.trim()).forEach((r,s)=>{const a=r.match(/^(.*?)\s+x(\d+)$/);if(a){const[,r,o]=a;n.push({id:`item-${t.id}-${i}-set-${s}`,name:r.trim(),quantity:parseInt(o)*e.quantity,options:[],status:e.status||"pending",isSetItem:!0,parentSetName:e.name})}}),e.options&&e.options.length>0&&n.push({id:`item-${t.id}-${i}`,name:`${e.name} (Options)`,quantity:e.quantity,options:e.options,status:e.status||"pending"})}else{var s;n.push({id:`item-${t.id}-${i}`,name:e.name||(null===(s=e.menuItem)||void 0===s?void 0:s.name)||"Item",quantity:e.quantity,options:e.options||[],status:e.status||"pending"})}});const r={id:t.id.toString(),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||t.order_number.slice(-3),items:n,status:t.status||"pending",orderTime:new Date(t.createdAt||Date.now()),tableNumber:t.table_number,customerName:t.customer_name,orderType:t.order_type||"dine-in",source:t.source||"pos",scheduledPickupTime:t.scheduled_pickup_time||null};ce(e=>[r,...e]),Re.current(i);try{var s,a;const e=(0,c.qs)();if((null===(s=e.kitchenPrinter)||void 0===s?void 0:s.enabled)&&(null===(a=e.kitchenPrinter)||void 0===a?void 0:a.autoPrint)){const e=p(),n={orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1],date:new Date(t.createdAt||Date.now()),orderType:t.order_type,orderSource:t.order_source||"pos",tableNumber:t.table_number||null,pagerNumber:t.pager_number||null,customerName:t.customer_name||"Walk-in Customer",items:i.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.menu_item_name||e.name||e.menuItem&&e.menuItem.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:t.notes||""};(0,c.Si)(n,e).then(e=>{e&&console.log("Kitchen ticket auto-printed for order",t.order_number)}).catch(e=>console.error("Auto-print failed:",e))}}catch(o){console.error("Auto-print error:",o)}}),t.on("order-updated",t=>{if(t.restaurant_id!==e.restaurantId)return;if(!Me(t))return void ce(e=>e.filter(e=>e.id!==t.id.toString()));const i=qe(t);ce(e=>e.some(e=>e.id===i.id)?e.map(e=>e.id===i.id?i:e):[i,...e])}),t.on("order-deleted",e=>{let{id:t}=e;ce(e=>e.filter(e=>e.id!==t.toString()))}),he(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,n.useEffect)(()=>{const e=setInterval(()=>ge(new Date),1e4);return()=>clearInterval(e)},[]);const Qe=(0,n.useCallback)(e=>{we&&i.e(2283).then(i.bind(i,2283)).then(t=>{let{startRepeatingSound:i}=t,n="bell";if("all"!==Ie){const t=Fe.find(e=>e.id===Ie);if(t){if(e){if(!e.some(e=>{var t;const i=e.name||(null===(t=e.menuItem)||void 0===t?void 0:t.name)||"",n=Ce.get(i);return void 0===n||n===Ie}))return}n=t.alert_sound||"bell"}}i(n,3e3)})},[we,Ie,Fe,Ce]),Oe=(0,n.useCallback)(()=>{i.e(2283).then(i.bind(i,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[]);(0,n.useEffect)(()=>{we||i.e(2283).then(i.bind(i,2283)).then(e=>{let{stopRepeatingSound:t}=e;t()})},[we]);const Re=(0,n.useRef)(Qe);(0,n.useEffect)(()=>{Re.current=Qe},[Qe]);const We=e=>{const i=(e=>{const i=t.find(t=>t.name===e);return(null===i||void 0===i?void 0:i.code)||""})(e);return i?`${i} ${e}`:e},Ke=e=>Math.floor((me.getTime()-e.getTime())/1e3/60),Je=(e,t)=>{const i={orderNumber:e.orderNumber,date:e.orderTime,tableNumber:e.tableNumber,pagerNumber:e.pagerNumber,customerName:e.customerName||"Walk-in Customer",orderSource:e.source||"pos",items:(t||e.items).map(e=>({name:e.name,quantity:e.quantity,options:e.options||[],special_instructions:e.special_instructions||"",is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]}))};(0,c.Si)(i,p())},He=async(e,t)=>{Oe(),ce(i=>i.map(i=>i.id===e?{...i,status:t}:i).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!Ue(e))));try{const i=await fetch(`/api/orders/${e}/status`,{method:"PATCH",credentials:"include",headers:ze(),body:JSON.stringify({status:t})});(await i.json()).success||Pe()}catch{Pe()}},Le=(0,n.useCallback)(e=>{if("all"===Ie)return!0;const t=Ce.get(e);return void 0===t||t===Ie},[Ie,Ce]),Ve=(0,n.useCallback)(e=>"all"===Ie||e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>Le(e.name)):Le(e.name)),[Ie,Le]),Ye=(e,t)=>{const i={pending:"preparing",preparing:"ready",ready:"served"}[e]||"completed";return t===i||"ready"===e&&"completed"===t?e:i},Ue=e=>e.items.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>"served"===e.status||"completed"===e.status):"served"===e.status||"completed"===e.status),Ze=(e,t)=>{switch(e){case"pending":return"preparing"===t||"ready"===t||"served"===t||"completed"===t;case"preparing":return"ready"===t||"served"===t||"completed"===t;case"ready":return"served"===t||"completed"===t;default:return!1}},Ge=(e,t)=>e.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>Ze(t,e.status||"pending")):Ze(t,e.status||"pending")),Xe=async(e,t)=>{Oe();const i=pe.find(t=>t.id===e);if(!i)return;const n=i.items.map(e=>e.id===t?{...e,status:Ye(i.status,e.status||"pending")}:e);ce(t=>t.map(t=>t.id===e?{...t,items:n}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:ze(),body:JSON.stringify({order_items:n})});if(!(await t.json()).success)return void Pe();if(Ge(n,i.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[i.status];t&&await He(e,t)}}catch{Pe()}},et=async(e,t,i)=>{const n=pe.find(t=>t.id===e);if(!n)return;const r=n.items.map(e=>{if(e.id===t&&e.set_items){const t=e.set_items.map(e=>e.id===i?{...e,status:Ye(n.status,e.status||"pending")}:e),r=t.every(e=>Ze(n.status,e.status||"pending"))?Ye(n.status,n.status):n.status;return{...e,set_items:t,status:r}}return e});ce(t=>t.map(t=>t.id===e?{...t,items:r}:t));try{const t=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:ze(),body:JSON.stringify({order_items:r})});if(!(await t.json()).success)return void Pe();if(Ge(r,n.status)){const t={pending:"preparing",preparing:"ready",ready:"served"}[n.status];t&&await He(e,t)}}catch{Pe()}},tt=async(e,t,i)=>{ce(i=>i.map(i=>i.id===e?{...i,items:t}:i));try{const n=await fetch(`/api/orders/${e}/items`,{method:"PATCH",credentials:"include",headers:ze(),body:JSON.stringify({order_items:t})});if(!(await n.json()).success)return void Pe();await He(e,i)}catch{Pe()}},it=e=>{const t=pe.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{var t;return{...e,status:"served",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>({...e,status:"served"}))}});return tt(e,i,"served")},nt=(0,n.useMemo)(()=>{const e=e=>pe.filter(t=>t.status===e).filter(Ve).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[pe,Ve]),rt=e=>nt[e]||[],st=(0,n.useMemo)(()=>({pending:nt.pending.length,preparing:nt.preparing.length,ready:nt.ready.length}),[nt]),at=(0,n.useMemo)(()=>{const e=e=>e.reduce((e,t)=>e+t.items.reduce((e,t)=>t.is_set_menu&&t.set_items&&t.set_items.length>0?"all"===Ie?e+t.set_items.length:e+t.set_items.filter(e=>Le(e.name)).length:"all"===Ie||Le(t.name)?e+1:e,0),0);return{pending:e(nt.pending),preparing:e(nt.preparing),ready:e(nt.ready)}},[nt,Ie,Le]),ot=e=>at[e]||0,dt=(0,n.useMemo)(()=>{const e=e=>pe.filter(t=>t.status===e).reduce((t,i)=>t+i.items.reduce((t,i)=>i.is_set_menu&&i.set_items&&i.set_items.length>0?t+i.set_items.filter(t=>!("all"!==Ie&&!Le(t.name))&&(t.status||"pending")===e).length:"all"===Ie||Le(i.name)?t+((i.status||"pending")===e?1:0):t,0),0);return{pending:e("pending"),preparing:e("preparing"),ready:e("ready")}},[pe,Ie,Le]),lt=e=>dt[e]||0,ut=e=>{const t=Ke(e.orderTime),i=t>15&&"pending"===e.status,r="all"===Ie?e.items:e.items.filter(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>Le(e.name)):Le(e.name));let s=0,a=0;r.forEach(t=>{if(t.is_set_menu&&t.set_items&&t.set_items.length>0){const i="all"===Ie?t.set_items:t.set_items.filter(e=>Le(e.name));s+=i.length,a+=i.filter(t=>Ze(e.status,t.status||"pending")).length}else s+=1,Ze(e.status,t.status||"pending")&&(a+=1)});const o=s>0?a/s*100:0,d=(e=>{switch(e){case"pending":return"#F59E0B";case"preparing":return"#3B82F6";case"ready":return"#10B981";default:return"#6B7C93"}})(e.status);return(0,m.jsxs)(N,{children:[(0,m.jsxs)($,{children:[(0,m.jsxs)(E,{children:[(0,m.jsx)(C,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,m.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,m.jsxs)(D,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?g(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,m.jsx)(D,{variant:"delivery",children:"DELIVERY"})]}),(0,m.jsxs)(B,{children:[(0,m.jsx)(q,{children:e.orderNumber}),(0,m.jsxs)(M,{urgent:i,children:[t,"m"]})]})]}),s>1&&(0,m.jsxs)(z,{children:[(0,m.jsx)(P,{children:(0,m.jsx)(Q,{percent:o,color:d})}),(0,m.jsxs)(O,{children:[a,"/",s]})]}),(0,m.jsx)(re,{children:r.map(t=>(0,m.jsxs)(n.Fragment,{children:[(0,m.jsxs)(R,{done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:[(0,m.jsxs)(W,{children:[t.is_set_menu?(0,m.jsxs)("div",{style:{fontSize:"12px",fontWeight:500,color:"#6B7C93"},children:[We(t.name)," ",t.quantity>1&&(0,m.jsxs)(V,{highlight:!0,done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}):(0,m.jsxs)(K,{done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:[We(t.name)," ",t.quantity>1&&(0,m.jsxs)(V,{highlight:!0,done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:["x ",t.quantity]})]}),(i=>{const n=(null===(i=t.options)||void 0===i?void 0:i.filter(e=>!/^.+\sx\d+$/.test(e)))||[];return 0!==n.length||t.special_instructions?(0,m.jsxs)(J,{children:[n.map((i,n)=>(0,m.jsx)(H,{done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:i},n)),t.special_instructions&&(0,m.jsx)(L,{done:Ze(e.status,t.status||"pending")&&"pending"!==e.status,children:t.special_instructions})]}):null})()]}),!t.is_set_menu&&1===s&&"pending"!==e.status&&(0,m.jsx)(ne,{style:{padding:"6px 10px",fontSize:"12px",marginRight:4},onClick:()=>{const t="preparing"===e.status?"pending":"ready"===e.status?"preparing":null;t&&He(e.id,t)},children:"\u21ba"}),!t.is_set_menu&&1===s&&"pending"===e.status&&(0,m.jsx)(ne,{style:{padding:"6px 8px",marginRight:4},onClick:()=>Je(e),title:"Print Kitchen Ticket",children:(0,m.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),!t.is_set_menu&&(0,m.jsx)(Y,{done:Ze(e.status,t.status||"pending"),statusColor:d,onClick:()=>Xe(e.id,t.id),children:Ze(e.status,t.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,m.jsx)(U,{children:("all"===Ie?t.set_items:t.set_items.filter(e=>Le(e.name))).map(i=>(0,m.jsxs)(Z,{done:Ze(e.status,i.status||"pending")&&"pending"!==e.status,children:[(0,m.jsxs)(G,{done:Ze(e.status,i.status||"pending")&&"pending"!==e.status,children:[We(i.name)," ",i.quantity>1&&(0,m.jsxs)(V,{highlight:!0,done:Ze(e.status,i.status||"pending")&&"pending"!==e.status,children:["x ",i.quantity]})]}),(0,m.jsx)(Y,{done:Ze(e.status,i.status||"pending"),statusColor:d,onClick:()=>et(e.id,t.id,i.id),children:Ze(e.status,i.status||"pending")?"pending"===e.status?"Started":"preparing"===e.status?"Done \u2713":"Served":"pending"===e.status?"Start":"preparing"===e.status?"Done":"Serve"})]},i.id))})]},t.id))}),"pending"===e.status&&s>1&&(0,m.jsxs)(X,{children:[(0,m.jsx)(ne,{style:{flex:"none",padding:"8px 10px"},onClick:()=>Je(e),title:"Print Kitchen Ticket",children:(0,m.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,m.jsx)(ie,{color:"#F59E0B",onClick:()=>((e,t)=>{const i=pe.find(t=>t.id===e);if(!i)return;const n=i.items.map(e=>{var i;return{...e,status:t,set_items:null===(i=e.set_items)||void 0===i?void 0:i.map(e=>({...e,status:t}))}});return tt(e,n,t)})(e.id,"preparing"),children:"Start All"})]}),"preparing"===e.status&&s>1&&(0,m.jsxs)(X,{children:[(0,m.jsx)(ne,{onClick:()=>He(e.id,"pending"),children:"\u21ba"}),(0,m.jsx)(ie,{color:"#3B82F6",onClick:()=>(e=>{const t=pe.find(t=>t.id===e);if(!t)return;const i=t.items.map(e=>{var t;return{...e,status:"ready",set_items:null===(t=e.set_items)||void 0===t?void 0:t.map(e=>({...e,status:"ready"}))}});return tt(e,i,"ready")})(e.id),children:"Mark Ready"})]}),"ready"===e.status&&s>1&&(0,m.jsxs)(X,{children:[(0,m.jsx)(ne,{onClick:()=>He(e.id,"preparing"),children:"\u21ba"}),(0,m.jsx)(ie,{color:"#10B981",onClick:()=>it(e.id),children:"Serve All"})]})]},e.id)},pt=(0,n.useMemo)(()=>(()=>{const e=new Map;return pe.filter(e=>["pending","preparing"].includes(e.status)).forEach(t=>{const i=t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pagerNumber?`P${t.pagerNumber}`:`#${t.pickupNumber}`;t.items.forEach(n=>{if(n.is_set_menu&&n.set_items&&n.set_items.length>0)n.set_items.forEach(n=>{if("pending"!==(n.status||"pending"))return;if(!Le(n.name))return;const r=n.name;e.has(r)||e.set(r,{menuName:n.name,formattedName:We(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const s=e.get(r);s.plainQty+=n.quantity,t.orderTime<s.earliestTime&&(s.earliestTime=t.orderTime),s.plainSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity,is_set_menu:!0})});else{var r;if("pending"!==(n.status||"pending"))return;if(!Le(n.name))return;const s=n.name;e.has(s)||e.set(s,{menuName:n.name,formattedName:We(n.name),plainQty:0,plainSources:[],optionSources:[],earliestTime:t.orderTime});const a=e.get(s);t.orderTime<a.earliestTime&&(a.earliestTime=t.orderTime);const o=(null===(r=n.options)||void 0===r?void 0:r.filter(e=>!/^.+\sx\d+$/.test(e)))||[];o.length>0||n.special_instructions?a.optionSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity,options:o,special_instructions:n.special_instructions}):(a.plainQty+=n.quantity,a.plainSources.push({orderId:t.id,itemId:n.id,label:i,orderNumber:t.orderNumber,quantity:n.quantity}))}})}),Array.from(e.values()).sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})(),[pe,Ie,Ce]),ct=(0,n.useMemo)(()=>(e=>{const{time_limit:t,max_count:i}=$e;if(!t&&!i)return e;const n=[];for(const s of e){let e=[];if(t>0&&s.plainSources.length>0){var r;const i=s.plainSources.map(e=>{const t=pe.find(t=>t.id===e.orderId);return{...e,orderTime:(null===t||void 0===t?void 0:t.orderTime)||s.earliestTime}}).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime());let n=[],a=null===(r=i[0])||void 0===r?void 0:r.orderTime;for(const r of i)(r.orderTime.getTime()-a.getTime())/6e4>t&&n.length>0?(e.push({plainQty:n.reduce((e,t)=>e+t.quantity,0),plainSources:n,earliestTime:a}),n=[r],a=r.orderTime):n.push(r);n.length>0&&e.push({plainQty:n.reduce((e,t)=>e+t.quantity,0),plainSources:n,earliestTime:a})}else e=[{plainQty:s.plainQty,plainSources:[...s.plainSources],earliestTime:s.earliestTime}];const a=[];for(const t of e)if(i>0&&t.plainQty>i){let e=[...t.plainSources];for(;e.length>0;){let n=0;const r=[],s=[];for(const t of e)if(n+t.quantity<=i)r.push(t),n+=t.quantity;else if(n<i){const e=i-n;r.push({...t,quantity:e}),s.push({...t,quantity:t.quantity-e}),n=i}else s.push(t);a.push({plainQty:n,plainSources:r,earliestTime:t.earliestTime}),e=s}}else a.push(t);a.forEach((e,t)=>{n.push({menuName:s.menuName,formattedName:s.formattedName,plainQty:e.plainQty,plainSources:e.plainSources,optionSources:0===t?s.optionSources:[],earliestTime:e.earliestTime})})}return n.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime())})(pt),[pt,$e,pe]),mt=()=>ct,gt=async(e,t,i)=>{const n=[...e.plainSources,...e.optionSources],r=new Map;n.forEach(e=>{r.has(e.orderId)||r.set(e.orderId,new Set),r.get(e.orderId).add(e.itemId)});const s=localStorage.getItem("auth_token"),a=Array.from(r.entries()).map(e=>{let[n,r]=e;const s=pe.find(e=>e.id===n);if(!s)return null;const a=s.items.map(e=>{if(e.is_set_menu&&e.set_items){const n={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},o=i||s.status,d=e.set_items.map(e=>r.has(e.id)?"forward"===t?{...e,status:n[o]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}:e),l=d.every(e=>Ze(s.status,e.status||"pending"))&&n[s.status]||s.status;return{...e,set_items:d,status:l}}if(!r.has(e.id))return e;const n={pending:"preparing",preparing:"ready"},a={preparing:"pending",ready:"preparing",served:"ready"},o=i||s.status;return"forward"===t?{...e,status:n[o]||"preparing"}:{...e,status:a[e.status||"pending"]||e.status}});return{orderId:n,order:s,updatedItems:a}}).filter(Boolean);ce(e=>e.map(e=>{const i=a.find(t=>t.orderId===e.id);if(!i)return e;const n={...e,items:i.updatedItems};if("revert"===t){const t={preparing:"pending",ready:"preparing"}[e.status];if(t){i.updatedItems.every(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.every(e=>(e.status||"pending")===t):(e.status||"pending")===t)&&(n.status=t)}}return n}).filter(e=>!!["pending","preparing","ready"].includes(e.status)&&("ready"!==e.status||!Ue(e))));const o=new Set(n.map(e=>e.itemId));if("forward"===t&&"pending"===i){const t=`batch-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;Se(i=>[...i,{batchId:t,menuName:e.menuName,formattedName:e.formattedName,itemIds:o}])}else("forward"===t&&"preparing"===i||"revert"===t&&"preparing"===i)&&Se(e=>e.map(e=>({...e,itemIds:new Set(Array.from(e.itemIds).filter(e=>!o.has(e)))})).filter(e=>e.itemIds.size>0));try{if((await Promise.all(a.map(e=>{let{orderId:t,updatedItems:i}=e;return fetch(`/api/orders/${t}/items`,{method:"PATCH",credentials:"include",headers:{"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}},body:JSON.stringify({order_items:i.map(e=>({...e,status:e.status}))})}).then(e=>e.json())}))).some(e=>!e.success))return void Pe()}catch{return void Pe()}const d=a.map(e=>{let{orderId:i,order:n,updatedItems:r}=e;if("forward"===t){if(Ge(r,n.status)){const e={pending:"preparing",preparing:"ready",ready:"served"}[n.status];if(e)return He(i,e)}}else{const e={preparing:"pending",ready:"preparing",served:"ready"}[n.status];if(e){if(r.every(t=>t.is_set_menu&&t.set_items&&t.set_items.length>0?t.set_items.every(t=>(t.status||"pending")===e):(t.status||"pending")===e))return He(i,e)}}return Promise.resolve()});await Promise.all(d)},ht=(e,t,i)=>{const n=e.plainQty+e.optionSources.reduce((e,t)=>e+t.quantity,0),r=new Map;e.plainSources.forEach(e=>{r.set(e.label,(r.get(e.label)||0)+e.quantity)});const s=Array.from(r.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t}).join(", "),a="pending"===i?"#F59E0B":"#3B82F6",o=n<=1,d="pending"===i?o?"Start":"Start All":o?"Done":"Done All";return(0,m.jsxs)(oe,{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)(de,{children:[e.formattedName,n>1&&(0,m.jsxs)(V,{highlight:!0,children:["x ",n]})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:6,alignItems:"center"},children:["preparing"===i&&(0,m.jsx)(ne,{style:{padding:"10px 14px",fontSize:"14px"},onClick:()=>gt(e,"revert",i),children:"\u21ba"}),"pending"===i&&(0,m.jsx)(ne,{style:{padding:"10px 12px"},title:"Print Kitchen Ticket",onClick:()=>(e=>{e.plainSources,e.optionSources,e.plainQty,e.optionSources.reduce((e,t)=>e+t.quantity,0);const t=new Map;e.plainSources.forEach(e=>{t.set(e.label,(t.get(e.label)||0)+e.quantity)});const i=Array.from(t.entries()).map(e=>{let[t,i]=e;return i>1?`${t} x${i}`:t});e.optionSources.forEach(e=>i.push(e.label));const n=[];e.plainQty>0&&n.push({name:e.menuName,quantity:e.plainQty,options:[],special_instructions:""}),e.optionSources.forEach(t=>{n.push({name:e.menuName,quantity:t.quantity,options:t.options||[],special_instructions:t.special_instructions||""})});const r={orderNumber:i.join(", "),date:e.earliestTime,items:n,skipFooterLocation:!0};(0,c.Si)(r,p())})(e),children:(0,m.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,m.jsx)(ie,{color:a,solid:o,style:{flex:"none",padding:"10px 20px",fontSize:"14px"},onClick:()=>gt(e,"forward",i),children:d})]})]}),e.plainQty>0&&(0,m.jsx)(le,{children:s}),e.optionSources.length>0&&(0,m.jsx)("div",{style:{marginTop:8,paddingTop:e.plainQty>0?8:0,borderTop:e.plainQty>0?"1px solid #E6EBF1":"none"},children:e.optionSources.map((t,i)=>{var n;return(0,m.jsxs)("div",{style:{padding:"6px 0",borderBottom:i<e.optionSources.length-1?"1px dashed #E6EBF1":"none"},children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:6,marginBottom:3},children:[(0,m.jsx)("span",{style:{fontSize:12,fontWeight:600,color:"#9CA3AF"},children:t.label}),(0,m.jsx)("span",{style:{fontSize:11,color:"#9CA3AF"},children:t.orderNumber}),t.quantity>1&&(0,m.jsxs)("span",{style:{fontSize:11,fontWeight:600,color:"#9CA3AF"},children:["x",t.quantity]})]}),(0,m.jsxs)(J,{children:[null===(n=t.options)||void 0===n?void 0:n.map((e,t)=>(0,m.jsx)(H,{children:e},t)),t.special_instructions&&(0,m.jsx)(L,{children:t.special_instructions})]})]},`opt-${i}`)})})]},`${i}-group-${t}`)},xt=(0,n.useMemo)(()=>pe.filter(e=>["pending","preparing","ready"].includes(e.status)).filter(e=>!Ue(e)).filter(Ve).filter(e=>e.items.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)).sort((e,t)=>e.orderTime.getTime()-t.orderTime.getTime()),[pe,Ve,Ie,Le]),yt=()=>xt;return(0,m.jsxs)(h,{children:[(0,m.jsx)(u.Ay,{title:"Kitchen Display",children:(0,m.jsxs)(y,{children:[(0,m.jsxs)(se,{children:[(0,m.jsx)(ae,{active:"order"===be,onClick:()=>{_e("order"),localStorage.setItem("kitchenDisplayViewMode","order")},children:"Order"}),(0,m.jsx)(ae,{active:"item"===be,onClick:()=>{_e("item"),localStorage.setItem("kitchenDisplayViewMode","item")},children:"Item"})]}),Fe.length>0&&(0,m.jsxs)(se,{children:[(0,m.jsx)(ae,{active:"all"===Ie,onClick:()=>{Ne("all"),te({})},children:"All"}),Fe.map(e=>(0,m.jsx)(ae,{active:Ie===e.id,onClick:()=>{Ne(e.id),te({station:String(e.id)})},children:e.name},e.id))]}),"item"===be&&($e.time_limit>0||$e.max_count>0)&&(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",padding:"4px 10px",background:"#F0EDFF",borderRadius:"6px",fontSize:"12px",color:"#635BFF",fontWeight:500},children:[(0,m.jsx)("span",{children:"Merge:"}),$e.time_limit>0&&(0,m.jsxs)("span",{children:[$e.time_limit,"min"]}),$e.time_limit>0&&$e.max_count>0&&(0,m.jsx)("span",{children:"\xb7"}),$e.max_count>0&&(0,m.jsxs)("span",{children:["max ",$e.max_count]}),(0,m.jsx)("a",{href:"/pos/settings?tab=kitchenStations",target:"_blank",rel:"noopener noreferrer",title:"Merge Settings",style:{display:"flex",alignItems:"center",color:"#635BFF",textDecoration:"none"},children:"\u2699"})]}),(0,m.jsx)("button",{onClick:()=>{ke(e=>{const t=!e;return localStorage.setItem("sound_enabled",String(t)),t})},title:we?"Sound ON":"Sound OFF",style:{width:"40px",height:"40px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,background:we?"#635BFF":"#E6EBF1",transition:"all 0.15s"},children:(0,m.jsx)("img",{src:we?"/speaker-on.svg":"/speaker-off.svg",alt:we?"Sound ON":"Sound OFF",style:{width:"22px",height:"22px",filter:we?"invert(1)":"opacity(0.4)"}})}),(0,m.jsxs)(v,{connected:xe,children:[(0,m.jsx)(b,{connected:xe}),xe?"Live":"Offline"]}),(0,m.jsx)(ue,{operationSettings:fe})]})}),(0,m.jsx)(x,{children:(0,m.jsxs)(_,{children:[(0,m.jsxs)(j,{children:[(0,m.jsxs)(S,{status:"pending",children:[(0,m.jsx)(w,{children:(0,m.jsx)(k,{status:"pending",children:"Pending"})}),(0,m.jsx)(F,{color:"#F59E0B",children:"order"===be?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:st.pending}),(0,m.jsx)(T,{children:"Orders"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:ot("pending")}),(0,m.jsx)(T,{children:"Items"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:mt().length}),(0,m.jsx)(T,{children:"Menus"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:lt("pending")}),(0,m.jsx)(T,{children:"Items"})]})})]}),(0,m.jsx)(I,{children:"order"===be?rt("pending").map(ut):mt().map((e,t)=>ht(e,t,"pending"))})]}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(S,{status:"preparing",children:[(0,m.jsx)(w,{children:(0,m.jsx)(k,{status:"preparing",children:"Preparing"})}),(0,m.jsx)(F,{color:"#3B82F6",children:"order"===be?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:st.preparing}),(0,m.jsx)(T,{children:"Orders"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:ot("preparing")}),(0,m.jsx)(T,{children:"Items"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:lt("preparing")}),(0,m.jsx)(T,{children:"Menus"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:lt("preparing")}),(0,m.jsx)(T,{children:"Items"})]})})]}),(0,m.jsx)(I,{children:"order"===be?rt("preparing").map(ut):(()=>{const e=[],t=new Set;return je.forEach(i=>{const n={menuName:i.menuName,formattedName:i.formattedName,plainQty:0,plainSources:[],optionSources:[],earliestTime:new Date};let r=!1;pe.filter(e=>["preparing","pending"].includes(e.status)).forEach(e=>{const s=e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`;e.items.forEach(a=>{if(a.is_set_menu&&a.set_items&&a.set_items.length>0)a.set_items.forEach(a=>{i.itemIds.has(a.id)&&"preparing"===(a.status||"pending")&&Le(a.name)&&(t.add(a.id),r=!0,n.plainQty+=a.quantity,n.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,is_set_menu:!0}),e.orderTime<n.earliestTime&&(n.earliestTime=e.orderTime))});else{var o;if(!i.itemIds.has(a.id))return;if("preparing"!==(a.status||"pending"))return;if(!Le(a.name))return;t.add(a.id),r=!0,e.orderTime<n.earliestTime&&(n.earliestTime=e.orderTime);const d=(null===(o=a.options)||void 0===o?void 0:o.filter(e=>!/^.+\sx\d+$/.test(e)))||[];d.length>0||!!a.special_instructions?n.optionSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity,options:d,special_instructions:a.special_instructions}):(n.plainQty+=a.quantity,n.plainSources.push({orderId:e.id,itemId:a.id,label:s,orderNumber:e.orderNumber,quantity:a.quantity}))}})}),r&&e.push(n)}),pe.filter(e=>"preparing"===e.status).forEach(i=>{const n=i.tableNumber?`T${i.tableNumber.replace(/^T/i,"")}`:i.pagerNumber?`P${i.pagerNumber}`:`#${i.pickupNumber}`;i.items.forEach(r=>{if(r.is_set_menu&&r.set_items&&r.set_items.length>0)r.set_items.forEach(r=>{t.has(r.id)||"preparing"===(r.status||"pending")&&Le(r.name)&&e.push({menuName:r.name,formattedName:We(r.name),plainQty:r.quantity,plainSources:[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity,is_set_menu:!0}],optionSources:[],earliestTime:i.orderTime})});else{var s;if(t.has(r.id))return;if("preparing"!==(r.status||"pending"))return;if(!Le(r.name))return;const a=(null===(s=r.options)||void 0===s?void 0:s.filter(e=>!/^.+\sx\d+$/.test(e)))||[],o=a.length>0||!!r.special_instructions;e.push({menuName:r.name,formattedName:We(r.name),plainQty:o?0:r.quantity,plainSources:o?[]:[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity}],optionSources:o?[{orderId:i.id,itemId:r.id,label:n,orderNumber:i.orderNumber,quantity:r.quantity,options:a,special_instructions:r.special_instructions}]:[],earliestTime:i.orderTime})}})}),e.sort((e,t)=>e.earliestTime.getTime()-t.earliestTime.getTime()),e.map((e,t)=>ht(e,t,"preparing"))})()})]}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(S,{status:"ready",children:[(0,m.jsx)(w,{children:(0,m.jsx)(k,{status:"ready",children:"Ready"})}),(0,m.jsx)(F,{color:"#10B981",children:"order"===be?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:st.ready}),(0,m.jsx)(T,{children:"Orders"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:ot("ready")}),(0,m.jsx)(T,{children:"Items"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(A,{children:yt().length}),(0,m.jsx)(T,{children:"Orders"}),(0,m.jsx)("span",{style:{margin:"0 2px",opacity:.4},children:"/"}),(0,m.jsx)(A,{children:lt("ready")}),(0,m.jsx)(T,{children:"Items"})]})})]}),(0,m.jsx)(I,{children:"order"===be?rt("ready").map(ut):yt().map(e=>{const t=Ke(e.orderTime),i="#10B981";let n=0,r=0,s=0;const a=[];e.items.forEach(e=>{if(e.is_set_menu&&e.set_items&&e.set_items.length>0)e.set_items.forEach(t=>{if("all"!==Ie&&!Le(t.name))return;n++;const i=t.status||"pending";"ready"===i&&r++,"served"!==i&&"completed"!==i||s++,a.push({id:t.id,parentId:e.id,name:t.name,quantity:t.quantity,status:i,isSetItem:!0})});else{var t;if("all"!==Ie&&!Le(e.name))return;n++;const i=e.status||"pending";"ready"===i&&r++,"served"!==i&&"completed"!==i||s++,a.push({id:e.id,name:e.name,quantity:e.quantity,options:null===(t=e.options)||void 0===t?void 0:t.filter(e=>!/^.+\sx\d+$/.test(e)),special_instructions:e.special_instructions,status:i,isSetItem:!1})}});const o=n-r-s,d=n>0?s/n*100:0,l=a.filter(e=>"ready"===e.status||"served"===e.status||"completed"===e.status);return 0===l.length?null:(0,m.jsxs)(N,{children:[(0,m.jsxs)($,{children:[(0,m.jsxs)(E,{children:[(0,m.jsx)(C,{children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pagerNumber?`P${e.pagerNumber}`:`#${e.pickupNumber}`}),"takeaway"===e.orderType&&(0,m.jsx)(D,{children:"TAKEAWAY"}),"pickup"===e.orderType&&(0,m.jsxs)(D,{variant:"pickup",children:["PICKUP ",e.scheduledPickupTime?g(e.scheduledPickupTime):"ASAP"]}),"delivery"===e.orderType&&(0,m.jsx)(D,{variant:"delivery",children:"DELIVERY"})]}),(0,m.jsxs)(B,{children:[(0,m.jsx)(q,{children:e.orderNumber}),(0,m.jsxs)(M,{children:[t,"m"]})]})]}),n>1&&(0,m.jsxs)(z,{children:[(0,m.jsx)(P,{children:(0,m.jsx)(Q,{percent:d,color:i})}),(0,m.jsxs)(O,{children:[s,"/",n]})]}),(0,m.jsx)(re,{children:l.map((t,n)=>{var r;const s="served"===t.status||"completed"===t.status;return(0,m.jsxs)(R,{done:s,children:[(0,m.jsxs)(W,{children:[(0,m.jsxs)(K,{done:s,children:[We(t.name)," ",t.quantity>1&&(0,m.jsxs)(V,{highlight:!0,done:s,children:["x ",t.quantity]})]}),(t.options&&t.options.length>0||t.special_instructions)&&(0,m.jsxs)(J,{children:[null===(r=t.options)||void 0===r?void 0:r.map((e,t)=>(0,m.jsx)(H,{done:s,children:e},t)),t.special_instructions&&(0,m.jsx)(L,{done:s,children:t.special_instructions})]})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:4,alignItems:"center"},children:[!s&&(0,m.jsx)(ne,{style:{padding:"6px 10px",fontSize:"12px"},onClick:async()=>{const i=e.items.map(e=>t.isSetItem&&t.parentId&&e.id===t.parentId&&e.set_items?{...e,set_items:e.set_items.map(e=>e.id===t.id?{...e,status:"preparing"}:e)}:t.isSetItem||e.id!==t.id?e:{...e,status:"preparing"});ce(t=>t.map(t=>t.id===e.id?{...t,items:i}:t)),Se(e=>[...e,{batchId:`batch-revert-${Date.now()}`,menuName:t.name,formattedName:We(t.name),itemIds:new Set([t.id])}]);try{const t=await fetch(`/api/orders/${e.id}/items`,{method:"PATCH",credentials:"include",headers:ze(),body:JSON.stringify({order_items:i})});if(!(await t.json()).success)return void Pe();i.some(e=>e.is_set_menu&&e.set_items&&e.set_items.length>0?e.set_items.some(e=>"ready"===e.status||"served"===e.status||"completed"===e.status):"ready"===e.status||"served"===e.status||"completed"===e.status)||"ready"!==e.status||await He(e.id,"preparing")}catch{Pe()}},children:"\u21ba"}),(0,m.jsx)(Y,{done:s,statusColor:i,onClick:()=>{t.isSetItem&&t.parentId?et(e.id,t.parentId,t.id):Xe(e.id,t.id)},children:s?"Served":"Serve"})]})]},n)})}),o>0&&(0,m.jsxs)("div",{style:{marginTop:8,padding:"6px 10px",background:"#FEF3C7",borderRadius:4,fontSize:12,fontWeight:600,color:"#D97706",textAlign:"center"},children:["Waiting ",o," item",o>1?"s":""," from kitchen"]}),0===o&&l.length>1&&l.some(e=>"ready"===e.status)&&(0,m.jsx)(X,{children:(0,m.jsx)(ie,{color:"#10B981",onClick:()=>it(e.id),children:"Serve All"})})]},e.id)})})]})]})})]})}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});i(9950);var n=i(4752),r=i(4414);const s=n.Ay.div`
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