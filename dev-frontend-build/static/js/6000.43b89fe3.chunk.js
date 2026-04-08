"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6e3],{6e3:(t,e,r)=>{r.r(e),r.d(e,{default:()=>C});var a=r(9950),o=r(4752),s=r(8819),n=r(1367),i=r(9018),d=r(3422),c=r(8406),l=r(5030),u=r(4414);const p=o.i7`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,g=o.i7`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`,m=o.Ay.div`
  background: ${s.w.colors.background};
  min-height: 100vh;
  padding: ${s.w.spacing.lg};
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${s.w.spacing["2xl"]};
`,w=o.Ay.div`
  text-align: center;
  flex: 1;
`,h=o.Ay.div`
  text-align: right;
  min-width: 180px;
  flex-shrink: 0;
`,f=o.Ay.div`
  font-size: ${s.w.typography.fontSize.lg};
  font-weight: ${s.w.typography.fontWeight.semibold};
  color: ${s.w.colors.text.primary};
  margin-bottom: 4px;
`,$=o.Ay.div`
  font-size: ${s.w.typography.fontSize["2xl"]};
  font-weight: ${s.w.typography.fontWeight.bold};
  color: ${s.w.colors.primary};
`,x=o.Ay.h1`
  font-size: ${s.w.typography.fontSize["3xl"]};
  font-weight: ${s.w.typography.fontWeight.bold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.sm};
`,b=o.Ay.p`
  font-size: ${s.w.typography.fontSize.lg};
  color: ${s.w.colors.text.secondary};
`,S=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${s.w.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`,v=o.Ay.div`
  background: ${s.w.colors.surface};
  border-radius: ${s.w.borderRadius.xl};
  padding: ${s.w.spacing.xl};
  box-shadow: ${s.w.shadows.md};
  border: 3px solid ${t=>"ready"===t.status?s.w.colors.status.success:"preparing"===t.status?s.w.colors.status.warning:s.w.colors.border};
  animation: ${t=>t.isNew?o.AH`${p} 0.5s ease-out`:"none"};
  transition: all ${s.w.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${s.w.shadows.lg};
  }

  ${t=>"ready"===t.status&&o.AH`
    animation: ${g} 2s infinite;
  `}
`,A=o.Ay.div`
  text-align: center;
  margin-bottom: ${s.w.spacing.lg};
`,j=o.Ay.div`
  font-size: 4rem;
  font-weight: ${s.w.typography.fontWeight.bold};
  color: ${t=>"ready"===t.status?s.w.colors.status.success:"preparing"===t.status?s.w.colors.status.warning:s.w.colors.text.primary};
  line-height: 1;
  margin-bottom: ${s.w.spacing.sm};
`,D=o.Ay.span`
  display: inline-block;
  padding: ${s.w.spacing.sm} ${s.w.spacing.md};
  border-radius: ${s.w.borderRadius.full};
  font-size: ${s.w.typography.fontSize.sm};
  font-weight: ${s.w.typography.fontWeight.semibold};
  text-transform: uppercase;
  background: ${t=>"ready"===t.status?s.w.colors.status.success:"preparing"===t.status?s.w.colors.status.warning:s.w.colors.status.info};
  color: ${s.w.colors.surface};
`,k=o.Ay.div`
  margin-bottom: ${s.w.spacing.md};
  text-align: center;
`,z=o.Ay.p`
  font-size: ${s.w.typography.fontSize.lg};
  font-weight: ${s.w.typography.fontWeight.semibold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.xs};
`,T=o.Ay.p`
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.secondary};
`,N=o.Ay.div`
  margin-top: ${s.w.spacing.md};
`,I=o.Ay.h4`
  font-size: ${s.w.typography.fontSize.base};
  font-weight: ${s.w.typography.fontWeight.semibold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.sm};
`,_=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${s.w.spacing.xs} 0;
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.secondary};
  border-bottom: 1px solid ${s.w.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,P=o.Ay.div`
  text-align: center;
  margin-top: ${s.w.spacing.md};
  padding: ${s.w.spacing.sm};
  background: ${t=>"preparing"===t.status?`${s.w.colors.status.warning}20`:`${s.w.colors.status.success}20`};
  border-radius: ${s.w.borderRadius.md};
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.primary};
`,M=o.Ay.div`
  text-align: center;
  padding: ${s.w.spacing["2xl"]};
  color: ${s.w.colors.text.secondary};
  font-size: ${s.w.typography.fontSize.lg};
`,C=()=>{const{t:t}=(0,l.Bd)("pos"),{user:e}=(0,n.As)(),{operationSettings:r}=(0,i.Pj)(),[o,s]=(0,a.useState)([]),[p,g]=(0,a.useState)([]),[C,W]=(0,a.useState)(new Set),[,L]=(0,a.useState)(null),[R,Y]=(0,a.useState)({date:"",time:""}),Z=(0,c.ng)(r);(0,a.useEffect)(()=>{const t=()=>{const t=new Date,e=t.toLocaleDateString("en-US",{timeZone:Z,weekday:"short",year:"numeric",month:"short",day:"numeric"}),r=t.toLocaleTimeString("en-US",{timeZone:Z,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});Y({date:e,time:r})};t();const e=setInterval(t,1e3);return()=>clearInterval(e)},[Z]);const F=(0,a.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const t=localStorage.getItem("auth_token"),r={credentials:"include",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}}},a=(0,c.oB)(Z),[o,n]=await Promise.all([fetch(`/api/orders/restaurant/${e.restaurantId}?status=preparing&limit=100&startDate=${a}&endDate=${a}`,r),fetch(`/api/orders/restaurant/${e.restaurantId}?status=ready&limit=100&startDate=${a}&endDate=${a}`,r)]),i=await o.json(),d=await n.json(),l=[...i.success?i.data:[],...d.success?d.data:[]];s(l)}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId,Z]);(0,a.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,d.io)("/orders",{transports:["websocket","polling"]});return t.on("connect",()=>{console.log("Connected to /orders namespace"),t.emit("join-restaurant",e.restaurantId)}),t.on("order-created",t=>{console.log("New order received:",t),s(e=>[t,...e])}),t.on("order-updated",t=>{console.log("Order updated:",t),s(e=>e.map(e=>e.id===t.id?t:e))}),t.on("order-deleted",t=>{let{id:e}=t;console.log("Order deleted:",e),s(t=>t.filter(t=>t.id!==e))}),L(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,a.useEffect)(()=>{F()},[F]),(0,a.useEffect)(()=>{const t=(t=>t.filter(t=>("preparing"===t.status||"ready"===t.status)&&"delivery"!==t.order_type).map(t=>({id:String(t.id),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||String(t.id).padStart(3,"0"),tableNumber:t.table_number,orderType:t.order_type,status:t.status,customerName:t.customer_name||"Guest",items:Array.isArray(t.order_items)?t.order_items.map(t=>{var e;return{name:t.name||(null===(e=t.menuItem)||void 0===e?void 0:e.name)||"Item",quantity:t.quantity||1}}):[],createdAt:t.createdAt,estimatedTime:15})))(o);g(e=>{const r=new Set(e.map(t=>t.id)),a=t.filter(t=>!r.has(t.id)).map(t=>t.id);return a.length>0&&(W(new Set(a)),setTimeout(()=>{W(new Set)},1e3)),t})},[o]);const B=t=>{let e;if(t.includes(":")&&!t.includes("T")){const r=new Date,a=t.replace(/\s*(AM|PM)/i," $1");e=new Date(`${r.toDateString()} ${a}`)}else e=new Date(t);return e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:Z})},E=t=>{if("ready"===t.status)return"Ready for Pickup";const e=new Date(t.createdAt),r=new Date,a=Math.floor((r.getTime()-e.getTime())/1e3/60),o=t.estimatedTime||15,s=Math.max(0,o-a);return 0===s?"Almost Ready":`About ${s} min wait`},U=t=>{switch(t){case"dine_in":return"Dine In";case"takeaway":return"Takeaway";case"pickup":return"Pre-order";default:return""}},q=[...p.filter(t=>"ready"===t.status),...p.filter(t=>"preparing"===t.status)];return(0,u.jsxs)(m,{children:[(0,u.jsxs)(y,{children:[(0,u.jsx)("div",{style:{minWidth:180}}),(0,u.jsxs)(w,{children:[(0,u.jsx)(x,{children:t("pos:customerDisplayPage.orderStatus")}),(0,u.jsx)(b,{children:t("pos:customerDisplayPage.pleaseCheckYourPickupNumber")})]}),(0,u.jsxs)(h,{children:[(0,u.jsx)(f,{children:R.date}),(0,u.jsx)($,{children:R.time})]})]}),(0,u.jsx)(S,{children:0===q.length?(0,u.jsx)(M,{children:"No orders in progress"}):q.map(e=>(0,u.jsxs)(v,{status:e.status,isNew:C.has(e.id),children:[(0,u.jsxs)(A,{children:[(0,u.jsx)(j,{status:e.status,children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pickupNumber}),(0,u.jsx)(D,{status:e.status,children:e.tableNumber?"ready"===e.status?"Ready - Table Service":"Preparing":"ready"===e.status?"Ready for Pickup":"preparing"===e.status?"Preparing":"Completed"})]}),(0,u.jsxs)(k,{children:[e.customerName&&(0,u.jsx)(z,{children:e.customerName}),(0,u.jsxs)(T,{children:[B(e.createdAt),e.orderType&&U(e.orderType)&&(0,u.jsxs)(u.Fragment,{children:[" / ",U(e.orderType)]})]})]}),(0,u.jsx)(P,{status:e.status,children:E(e)}),(0,u.jsxs)(N,{children:[(0,u.jsx)(I,{children:t("pos:customerDisplayPage.orderItems")}),e.items.map((t,e)=>(0,u.jsxs)(_,{children:[(0,u.jsx)("span",{children:t.name}),(0,u.jsxs)("span",{children:[t.quantity,"x"]})]},e))]})]},e.id))})]})}},8406:(t,e,r)=>{r.d(e,{MQ:()=>d,Vp:()=>i,fU:()=>s,ng:()=>a,oB:()=>n,r6:()=>o});const a=t=>(null===t||void 0===t?void 0:t.timeZone)||"Asia/Kuala_Lumpur",o=(t,e,r)=>{if(!t)return"";const o=new Date(t);if(isNaN(o.getTime()))return"";const s={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:a(e)};return o.toLocaleString("en-MY",{...s,...r})},s=(t,e)=>o(t,e,{year:void 0,month:void 0,day:void 0}),n=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const e=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}catch{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},i=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+t);return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const e=new Date;return e.setDate(e.getDate()+t),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},d=t=>{if(!t)return"just now";const e=new Date(t).getTime();if(isNaN(e))return"just now";const r=Date.now()-e,a=Math.floor(r/6e4),o=Math.floor(r/36e5),s=Math.floor(r/864e5);return a<1?"just now":1===a?"1 min ago":a<60?`${a} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===s?"1 day ago":`${s} days ago`}}}]);