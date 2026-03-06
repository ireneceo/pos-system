"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6e3],{6e3:(t,e,r)=>{r.r(e),r.d(e,{default:()=>P});var a=r(9950),o=r(4752),n=r(8819),s=r(1367),i=r(9018),d=r(3422),c=r(8406),l=r(4414);const u=o.i7`
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
`,p=o.Ay.div`
  background: ${n.w.colors.background};
  min-height: 100vh;
  padding: ${n.w.spacing.lg};
`,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${n.w.spacing["2xl"]};
`,y=o.Ay.div`
  text-align: center;
  flex: 1;
`,w=o.Ay.div`
  text-align: right;
  min-width: 180px;
  flex-shrink: 0;
`,h=o.Ay.div`
  font-size: ${n.w.typography.fontSize.lg};
  font-weight: ${n.w.typography.fontWeight.semibold};
  color: ${n.w.colors.text.primary};
  margin-bottom: 4px;
`,f=o.Ay.div`
  font-size: ${n.w.typography.fontSize["2xl"]};
  font-weight: ${n.w.typography.fontWeight.bold};
  color: ${n.w.colors.primary};
`,$=o.Ay.h1`
  font-size: ${n.w.typography.fontSize["3xl"]};
  font-weight: ${n.w.typography.fontWeight.bold};
  color: ${n.w.colors.text.primary};
  margin-bottom: ${n.w.spacing.sm};
`,x=o.Ay.p`
  font-size: ${n.w.typography.fontSize.lg};
  color: ${n.w.colors.text.secondary};
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${n.w.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`,S=o.Ay.div`
  background: ${n.w.colors.surface};
  border-radius: ${n.w.borderRadius.xl};
  padding: ${n.w.spacing.xl};
  box-shadow: ${n.w.shadows.md};
  border: 3px solid ${t=>"ready"===t.status?n.w.colors.status.success:"preparing"===t.status?n.w.colors.status.warning:n.w.colors.border};
  animation: ${t=>t.isNew?o.AH`${u} 0.5s ease-out`:"none"};
  transition: all ${n.w.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${n.w.shadows.lg};
  }

  ${t=>"ready"===t.status&&o.AH`
    animation: ${g} 2s infinite;
  `}
`,v=o.Ay.div`
  text-align: center;
  margin-bottom: ${n.w.spacing.lg};
`,A=o.Ay.div`
  font-size: 4rem;
  font-weight: ${n.w.typography.fontWeight.bold};
  color: ${t=>"ready"===t.status?n.w.colors.status.success:"preparing"===t.status?n.w.colors.status.warning:n.w.colors.text.primary};
  line-height: 1;
  margin-bottom: ${n.w.spacing.sm};
`,j=o.Ay.span`
  display: inline-block;
  padding: ${n.w.spacing.sm} ${n.w.spacing.md};
  border-radius: ${n.w.borderRadius.full};
  font-size: ${n.w.typography.fontSize.sm};
  font-weight: ${n.w.typography.fontWeight.semibold};
  text-transform: uppercase;
  background: ${t=>"ready"===t.status?n.w.colors.status.success:"preparing"===t.status?n.w.colors.status.warning:n.w.colors.status.info};
  color: ${n.w.colors.surface};
`,D=o.Ay.div`
  margin-bottom: ${n.w.spacing.md};
  text-align: center;
`,k=o.Ay.p`
  font-size: ${n.w.typography.fontSize.lg};
  font-weight: ${n.w.typography.fontWeight.semibold};
  color: ${n.w.colors.text.primary};
  margin-bottom: ${n.w.spacing.xs};
`,z=o.Ay.p`
  font-size: ${n.w.typography.fontSize.sm};
  color: ${n.w.colors.text.secondary};
`,T=o.Ay.div`
  margin-top: ${n.w.spacing.md};
`,N=o.Ay.h4`
  font-size: ${n.w.typography.fontSize.base};
  font-weight: ${n.w.typography.fontWeight.semibold};
  color: ${n.w.colors.text.primary};
  margin-bottom: ${n.w.spacing.sm};
`,I=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${n.w.spacing.xs} 0;
  font-size: ${n.w.typography.fontSize.sm};
  color: ${n.w.colors.text.secondary};
  border-bottom: 1px solid ${n.w.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,_=o.Ay.div`
  text-align: center;
  margin-top: ${n.w.spacing.md};
  padding: ${n.w.spacing.sm};
  background: ${t=>"preparing"===t.status?`${n.w.colors.status.warning}20`:`${n.w.colors.status.success}20`};
  border-radius: ${n.w.borderRadius.md};
  font-size: ${n.w.typography.fontSize.sm};
  color: ${n.w.colors.text.primary};
`,M=o.Ay.div`
  text-align: center;
  padding: ${n.w.spacing["2xl"]};
  color: ${n.w.colors.text.secondary};
  font-size: ${n.w.typography.fontSize.lg};
`,P=()=>{const{user:t}=(0,s.As)(),{operationSettings:e}=(0,i.Pj)(),[r,o]=(0,a.useState)([]),[n,u]=(0,a.useState)([]),[g,P]=(0,a.useState)(new Set),[,C]=(0,a.useState)(null),[W,L]=(0,a.useState)({date:"",time:""}),R=(0,c.ng)(e);(0,a.useEffect)(()=>{const t=()=>{const t=new Date,e=t.toLocaleDateString("en-US",{timeZone:R,weekday:"short",year:"numeric",month:"short",day:"numeric"}),r=t.toLocaleTimeString("en-US",{timeZone:R,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});L({date:e,time:r})};t();const e=setInterval(t,1e3);return()=>clearInterval(e)},[R]);const Z=(0,a.useCallback)(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=localStorage.getItem("auth_token"),r={credentials:"include",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},a=(0,c.oB)(R),[n,s]=await Promise.all([fetch(`/api/orders/restaurant/${t.restaurantId}?status=preparing&limit=100&startDate=${a}&endDate=${a}`,r),fetch(`/api/orders/restaurant/${t.restaurantId}?status=ready&limit=100&startDate=${a}&endDate=${a}`,r)]),i=await n.json(),d=await s.json(),l=[...i.success?i.data:[],...d.success?d.data:[]];o(l)}catch(e){console.error("Failed to fetch orders:",e)}},[null===t||void 0===t?void 0:t.restaurantId,R]);(0,a.useEffect)(()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=(0,d.io)("/orders",{transports:["websocket","polling"]});return e.on("connect",()=>{console.log("Connected to /orders namespace"),e.emit("join-restaurant",t.restaurantId)}),e.on("order-created",t=>{console.log("New order received:",t),o(e=>[t,...e])}),e.on("order-updated",t=>{console.log("Order updated:",t),o(e=>e.map(e=>e.id===t.id?t:e))}),e.on("order-deleted",t=>{let{id:e}=t;console.log("Order deleted:",e),o(t=>t.filter(t=>t.id!==e))}),C(e),()=>{e.disconnect()}},[null===t||void 0===t?void 0:t.restaurantId]),(0,a.useEffect)(()=>{Z()},[Z]),(0,a.useEffect)(()=>{const t=(t=>t.filter(t=>("preparing"===t.status||"ready"===t.status)&&"delivery"!==t.order_type).map(t=>({id:String(t.id),orderNumber:t.order_number,pickupNumber:t.order_number.split("-")[1]||String(t.id).padStart(3,"0"),tableNumber:t.table_number,orderType:t.order_type,status:t.status,customerName:t.customer_name||"Guest",items:Array.isArray(t.order_items)?t.order_items.map(t=>{var e;return{name:t.name||(null===(e=t.menuItem)||void 0===e?void 0:e.name)||"Item",quantity:t.quantity||1}}):[],createdAt:t.createdAt,estimatedTime:15})))(r);u(e=>{const r=new Set(e.map(t=>t.id)),a=t.filter(t=>!r.has(t.id)).map(t=>t.id);return a.length>0&&(P(new Set(a)),setTimeout(()=>{P(new Set)},1e3)),t})},[r]);const F=t=>{let e;if(t.includes(":")&&!t.includes("T")){const r=new Date,a=t.replace(/\s*(AM|PM)/i," $1");e=new Date(`${r.toDateString()} ${a}`)}else e=new Date(t);return e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:R})},Y=t=>{if("ready"===t.status)return"Ready for Pickup";const e=new Date(t.createdAt),r=new Date,a=Math.floor((r.getTime()-e.getTime())/1e3/60),o=t.estimatedTime||15,n=Math.max(0,o-a);return 0===n?"Almost Ready":`About ${n} min wait`},E=t=>{switch(t){case"dine_in":return"Dine In";case"takeaway":return"Takeaway";case"pickup":return"Pre-order";default:return""}},O=[...n.filter(t=>"ready"===t.status),...n.filter(t=>"preparing"===t.status)];return(0,l.jsxs)(p,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)("div",{style:{minWidth:180}}),(0,l.jsxs)(y,{children:[(0,l.jsx)($,{children:"Order Status"}),(0,l.jsx)(x,{children:"Please check your pickup number"})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(h,{children:W.date}),(0,l.jsx)(f,{children:W.time})]})]}),(0,l.jsx)(b,{children:0===O.length?(0,l.jsx)(M,{children:"No orders in progress"}):O.map(t=>(0,l.jsxs)(S,{status:t.status,isNew:g.has(t.id),children:[(0,l.jsxs)(v,{children:[(0,l.jsx)(A,{status:t.status,children:t.tableNumber?`T${t.tableNumber.replace(/^T/i,"")}`:t.pickupNumber}),(0,l.jsx)(j,{status:t.status,children:t.tableNumber?"ready"===t.status?"Ready - Table Service":"Preparing":"ready"===t.status?"Ready for Pickup":"preparing"===t.status?"Preparing":"Completed"})]}),(0,l.jsxs)(D,{children:[t.customerName&&(0,l.jsx)(k,{children:t.customerName}),(0,l.jsxs)(z,{children:[F(t.createdAt),t.orderType&&E(t.orderType)&&(0,l.jsxs)(l.Fragment,{children:[" / ",E(t.orderType)]})]})]}),(0,l.jsx)(_,{status:t.status,children:Y(t)}),(0,l.jsxs)(T,{children:[(0,l.jsx)(N,{children:"Order Items"}),t.items.map((t,e)=>(0,l.jsxs)(I,{children:[(0,l.jsx)("span",{children:t.name}),(0,l.jsxs)("span",{children:[t.quantity,"x"]})]},e))]})]},t.id))})]})}},8406:(t,e,r)=>{r.d(e,{MQ:()=>d,Vp:()=>i,fU:()=>n,ng:()=>a,oB:()=>s,r6:()=>o});const a=t=>(null===t||void 0===t?void 0:t.timeZone)||"Asia/Kuala_Lumpur",o=(t,e,r)=>{if(!t)return"";const o=new Date(t);if(isNaN(o.getTime()))return"";const n={year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:a(e)};return o.toLocaleString("en-MY",{...n,...r})},n=(t,e)=>o(t,e,{year:void 0,month:void 0,day:void 0}),s=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Asia/Kuala_Lumpur";try{const e=new Date;return new Intl.DateTimeFormat("en-CA",{timeZone:t,year:"numeric",month:"2-digit",day:"2-digit"}).format(e)}catch{const t=new Date;return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}},i=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Asia/Kuala_Lumpur";try{const r=new Date;r.setDate(r.getDate()+t);return new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(r)}catch{const e=new Date;return e.setDate(e.getDate()+t),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}},d=t=>{if(!t)return"just now";const e=new Date(t).getTime();if(isNaN(e))return"just now";const r=Date.now()-e,a=Math.floor(r/6e4),o=Math.floor(r/36e5),n=Math.floor(r/864e5);return a<1?"just now":1===a?"1 min ago":a<60?`${a} mins ago`:1===o?"1 hour ago":o<24?`${o} hours ago`:1===n?"1 day ago":`${n} days ago`}}}]);