"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6e3],{6e3:(e,t,r)=>{r.r(t),r.d(t,{default:()=>T});var s=r(8819),a=r(9950),o=r(4752),n=r(1367),i=r(3422),d=r(4414);const c=o.i7`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,l=o.i7`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`,u=o.Ay.div`
  background: ${s.w.colors.background};
  min-height: 100vh;
  padding: ${s.w.spacing.lg};
`,p=o.Ay.div`
  text-align: center;
  margin-bottom: ${s.w.spacing["2xl"]};
`,m=o.Ay.h1`
  font-size: ${s.w.typography.fontSize["3xl"]};
  font-weight: ${s.w.typography.fontWeight.bold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.sm};
`,g=o.Ay.p`
  font-size: ${s.w.typography.fontSize.lg};
  color: ${s.w.colors.text.secondary};
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${s.w.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`,y=o.Ay.div`
  background: ${s.w.colors.surface};
  border-radius: ${s.w.borderRadius.xl};
  padding: ${s.w.spacing.xl};
  box-shadow: ${s.w.shadows.md};
  border: 3px solid ${e=>"ready"===e.status?s.w.colors.status.success:"preparing"===e.status?s.w.colors.status.warning:s.w.colors.border};
  animation: ${e=>e.isNew?o.AH`${c} 0.5s ease-out`:"none"};
  transition: all ${s.w.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${s.w.shadows.lg};
  }

  ${e=>"ready"===e.status&&o.AH`
    animation: ${l} 2s infinite;
  `}
`,h=o.Ay.div`
  text-align: center;
  margin-bottom: ${s.w.spacing.lg};
`,f=o.Ay.div`
  font-size: 4rem;
  font-weight: ${s.w.typography.fontWeight.bold};
  color: ${e=>"ready"===e.status?s.w.colors.status.success:"preparing"===e.status?s.w.colors.status.warning:s.w.colors.text.primary};
  line-height: 1;
  margin-bottom: ${s.w.spacing.sm};
`,$=o.Ay.span`
  display: inline-block;
  padding: ${s.w.spacing.sm} ${s.w.spacing.md};
  border-radius: ${s.w.borderRadius.full};
  font-size: ${s.w.typography.fontSize.sm};
  font-weight: ${s.w.typography.fontWeight.semibold};
  text-transform: uppercase;
  background: ${e=>"ready"===e.status?s.w.colors.status.success:"preparing"===e.status?s.w.colors.status.warning:s.w.colors.status.info};
  color: ${s.w.colors.surface};
`,b=o.Ay.div`
  margin-bottom: ${s.w.spacing.md};
  text-align: center;
`,x=o.Ay.p`
  font-size: ${s.w.typography.fontSize.lg};
  font-weight: ${s.w.typography.fontWeight.semibold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.xs};
`,A=o.Ay.p`
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.secondary};
`,v=o.Ay.div`
  margin-top: ${s.w.spacing.md};
`,S=o.Ay.h4`
  font-size: ${s.w.typography.fontSize.base};
  font-weight: ${s.w.typography.fontWeight.semibold};
  color: ${s.w.colors.text.primary};
  margin-bottom: ${s.w.spacing.sm};
`,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${s.w.spacing.xs} 0;
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.secondary};
  border-bottom: 1px solid ${s.w.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,k=o.Ay.div`
  text-align: center;
  margin-top: ${s.w.spacing.md};
  padding: ${s.w.spacing.sm};
  background: ${e=>"preparing"===e.status?`${s.w.colors.status.warning}20`:`${s.w.colors.status.success}20`};
  border-radius: ${s.w.borderRadius.md};
  font-size: ${s.w.typography.fontSize.sm};
  color: ${s.w.colors.text.primary};
`,z=o.Ay.div`
  text-align: center;
  padding: ${s.w.spacing["2xl"]};
  color: ${s.w.colors.text.secondary};
  font-size: ${s.w.typography.fontSize.lg};
`,T=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,a.useState)([]),[s,o]=(0,a.useState)([]),[c,l]=(0,a.useState)(new Set),[,T]=(0,a.useState)(null),N=(0,a.useCallback)(async()=>{if(null!==e&&void 0!==e&&e.restaurantId)try{const[t,s]=await Promise.all([fetch(`/api/orders/restaurant/${e.restaurantId}?status=preparing&limit=100`,{credentials:"include"}),fetch(`/api/orders/restaurant/${e.restaurantId}?status=ready&limit=100`,{credentials:"include"})]),a=await t.json(),o=await s.json(),n=[...a.success?a.data:[],...o.success?o.data:[]];r(n)}catch(t){console.error("Failed to fetch orders:",t)}},[null===e||void 0===e?void 0:e.restaurantId]);(0,a.useEffect)(()=>{if(null===e||void 0===e||!e.restaurantId)return;const t=(0,i.io)("/orders",{transports:["websocket","polling"]});return t.on("connect",()=>{console.log("Connected to /orders namespace"),t.emit("join-restaurant",e.restaurantId)}),t.on("order-created",e=>{console.log("New order received:",e),r(t=>[e,...t])}),t.on("order-updated",e=>{console.log("Order updated:",e),r(t=>t.map(t=>t.id===e.id?e:t))}),t.on("order-deleted",e=>{let{id:t}=e;console.log("Order deleted:",t),r(e=>e.filter(e=>e.id!==t))}),T(t),()=>{t.disconnect()}},[null===e||void 0===e?void 0:e.restaurantId]),(0,a.useEffect)(()=>{N()},[N]),(0,a.useEffect)(()=>{const e=(e=>e.filter(e=>("preparing"===e.status||"ready"===e.status)&&"delivery"!==e.order_type).map(e=>({id:String(e.id),orderNumber:e.order_number,pickupNumber:e.order_number.split("-")[1]||String(e.id).padStart(3,"0"),tableNumber:e.table_number,orderType:e.order_type,status:e.status,customerName:e.customer_name||"Guest",items:Array.isArray(e.order_items)?e.order_items.map(e=>{var t;return{name:e.name||(null===(t=e.menuItem)||void 0===t?void 0:t.name)||"Item",quantity:e.quantity||1}}):[],createdAt:e.createdAt,estimatedTime:15})))(t);o(t=>{const r=new Set(t.map(e=>e.id)),s=e.filter(e=>!r.has(e.id)).map(e=>e.id);return s.length>0&&(l(new Set(s)),setTimeout(()=>{l(new Set)},1e3)),e})},[t]);const I=e=>{let t;if(e.includes(":")&&!e.includes("T")){const r=new Date,s=e.replace(/\s*(AM|PM)/i," $1");t=new Date(`${r.toDateString()} ${s}`)}else t=new Date(e);return t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0})},_=e=>{if("ready"===e.status)return"Ready for Pickup";const t=new Date(e.createdAt),r=new Date,s=Math.floor((r.getTime()-t.getTime())/1e3/60),a=e.estimatedTime||15,o=Math.max(0,a-s);return 0===o?"Almost Ready":`About ${o} min wait`},P=e=>{switch(e){case"dine_in":return"Dine In";case"takeaway":return"Takeaway";case"pickup":return"Pre-order";default:return""}},D=[...s.filter(e=>"ready"===e.status),...s.filter(e=>"preparing"===e.status)];return(0,d.jsxs)(u,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(m,{children:"Order Status"}),(0,d.jsx)(g,{children:"Please check your pickup number"})]}),(0,d.jsx)(w,{children:0===D.length?(0,d.jsx)(z,{children:"No orders in progress"}):D.map(e=>(0,d.jsxs)(y,{status:e.status,isNew:c.has(e.id),children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(f,{status:e.status,children:e.tableNumber?`T${e.tableNumber.replace(/^T/i,"")}`:e.pickupNumber}),(0,d.jsx)($,{status:e.status,children:e.tableNumber?"ready"===e.status?"Ready - Table Service":"Preparing":"ready"===e.status?"Ready for Pickup":"preparing"===e.status?"Preparing":"Completed"})]}),(0,d.jsxs)(b,{children:[e.customerName&&(0,d.jsx)(x,{children:e.customerName}),(0,d.jsxs)(A,{children:[I(e.createdAt),e.orderType&&P(e.orderType)&&(0,d.jsxs)(d.Fragment,{children:[" / ",P(e.orderType)]})]})]}),(0,d.jsx)(k,{status:e.status,children:_(e)}),(0,d.jsxs)(v,{children:[(0,d.jsx)(S,{children:"Order Items"}),e.items.map((e,t)=>(0,d.jsxs)(j,{children:[(0,d.jsx)("span",{children:e.name}),(0,d.jsxs)("span",{children:[e.quantity,"x"]})]},t))]})]},e.id))})]})}}}]);