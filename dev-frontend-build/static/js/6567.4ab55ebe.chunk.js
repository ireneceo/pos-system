"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6567],{5783:(e,t,n)=>{n.d(t,{A:()=>v});var i=n(9950),r=n(4752),o=n(7447),a=n(4414);const s=r.Ay.div`
  position: absolute;
  left: ${e=>e.$x-e.$w/2}px;
  top: ${e=>e.$y-e.$h/2}px;
  width: ${e=>e.$w}px;
  height: ${e=>e.$h}px;
  background: ${e=>e.$bgColor};
  border: 2.5px solid ${e=>e.$isSelected?"#635BFF":e.$borderColor};
  border-radius: ${e=>"round"===e.$shape?"50%":"8px"};
  transform: rotate(${e=>e.$rotation}deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: ${e=>e.$isEditing?"grab":"pointer"};
  transition: ${e=>e.$isEditing?"none":"box-shadow 0.15s, transform 0.15s"};
  user-select: none;
  -webkit-user-select: none;
  box-shadow: ${e=>e.$isSelected?"0 0 0 3px rgba(99, 91, 255, 0.3)":"0 1px 3px rgba(0, 0, 0, 0.08)"};
  z-index: ${e=>e.$isSelected?10:1};

  &:hover {
    box-shadow: ${e=>e.$isEditing?e.$isSelected?"0 0 0 3px rgba(99, 91, 255, 0.3)":"0 2px 8px rgba(0, 0, 0, 0.12)":"0 4px 12px rgba(0, 0, 0, 0.15)"};
    ${e=>!e.$isEditing&&"transform: scale(1.03);"}
  }

  &:active {
    ${e=>e.$isEditing&&"cursor: grabbing;"}
  }
`,d=r.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  line-height: 1;
`,l=r.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,c=r.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,p=new Set(["kitchen","entrance"]),x={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},u=i.memo(e=>{let{table:t,status:n="available",isSelected:i=!1,isEditing:r=!1,onClick:u,onMouseDown:h,onTouchStart:g,statusInfo:b,currency:m=""}=e;const f=t.tableType||"table",y="table"!==f,v=p.has(f),j=y?x[f]||x.kitchen:r?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:o.Ez[n],w=y?{...v?{background:"transparent",border:i&&r?"1.5px dashed #635BFF":"none",boxShadow:i&&r?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${i?"#635BFF":j.border}`},cursor:r?"grab":"default",opacity:r?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:i&&!v,$isEditing:r,onClick:e=>{r||!u||y||(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{r&&h&&h(e,t.id)},onTouchStart:e=>{r&&g&&g(e,t.id)},style:w,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!r&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!r&&b&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});u.displayName="TableNode";const h=u,g=r.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,b=r.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,m=r.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,f=r.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,y=r.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:r=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const x=(0,i.useRef)(null),u=(0,i.useRef)(null),[v,j]=(0,i.useState)(1),[w,A]=(0,i.useState)({x:0,y:0}),F=(0,i.useMemo)(()=>{if(r||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,i=-1/0,o=-1/0;for(const r of t.tables){const t=r.width/2,a=r.height/2;e=Math.min(e,r.x-t),n=Math.min(n,r.y-a),i=Math.max(i,r.x+t),o=Math.max(o,r.y+a)}const a=i-e,s=o-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,r]),$=(0,i.useCallback)(()=>{if(!u.current)return;const e=u.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=F.w/e.width,n=F.h/e.height,i=Math.max(t,n);j(i);const r=F.w/i,o=F.h/i;A({x:(e.width-r)/2,y:(e.height-o)/2})},[F]);(0,i.useEffect)(()=>{$();const e=new ResizeObserver(()=>$());return x.current&&e.observe(x.current),()=>e.disconnect()},[$]);const C=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:x,children:(0,a.jsxs)(b,{ref:u,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[r&&t.showGrid&&(0,a.jsx)(m,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(f,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:r?0:w.x-F.x/v+"px",top:r?0:w.y-F.y/v+"px",width:r?`${t.canvasWidth}px`:`${F.w}px`,height:r?`${t.canvasHeight}px`:`${F.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(h,{table:e,status:C(e.tableNumber),isSelected:o===e.id,isEditing:r,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(y,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),r?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>r,Ez:()=>a,He:()=>i,Zt:()=>s,h_:()=>o});const i={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},r=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}},8948:(e,t,n)=>{n.r(t),n.d(t,{default:()=>xt});var i=n(9950),r=n(4752),o=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(4414);const p=r.Ay.div`
  width: 380px;
  min-width: 380px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    position: absolute;
    inset: 0;
    z-index: 20;
  }
`,x=r.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,u=r.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,h=r.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,g=r.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,b=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,m=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,f=r.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,y=r.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,v=r.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,w=r.Ay.div`
  font-size: 12px;
`,A=r.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,F=r.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,$=r.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=r.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,k=r.Ay.button`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${e=>e.$checked?"#059669":"#D1D5DB"};
  background: ${e=>e.$checked?"#059669":"white"};
  color: white;
  font-size: 11px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
  transition: all 0.15s;

  &:hover {
    border-color: ${e=>e.$checked?"#047857":"#9CA3AF"};
  }
`,E=r.Ay.div`
  flex: 1;
  min-width: 0;
`,S=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,B=r.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,z=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,I=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,O=r.Ay.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #D1D5DB;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;

  &:hover {
    color: #DC2626;
    background: #FEE2E2;
  }
`,D=r.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,T=r.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,N=r.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,_=r.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5046E5; }";case"success":return"background: #059669; color: white; &:hover { background: #047857; }";case"secondary":return"background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,P=r.Ay.div`
  display: flex;
  gap: 6px;
`,R=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #9CA3AF;

  p {
    margin: 8px 0 0;
    font-size: 13px;
  }
`,M={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},H={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},q=e=>{let{tableNumber:t,statusInfo:n,tableInfo:r,currency:o,timezone:a,onClose:d,onNewOrder:q,onAddItems:W,onStatusChange:L,onPayment:U,onNavigateToPOS:G,onOrderUpdated:J}=e;const[Y,Z]=(0,i.useState)(!1),K=n&&"available"!==n.status,V=(null===n||void 0===n?void 0:n.orderStatus)||"",Q=(null===n||void 0===n?void 0:n.paymentStatus)||"pending",X=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(V),ee=(null===n||void 0===n?void 0:n.orderItems)||[],te="completed"!==Q&&!["completed","cancelled"].includes(V),ne=K?s.Ez[n.status]:s.Ez.available,ie=(()=>{switch(Q){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),re={};ee.forEach((e,t)=>{const n=e.order_group||0;re[n]||(re[n]=[]),re[n].push({...e,_originalIndex:t})});const oe=Object.keys(re).map(Number).sort((e,t)=>e-t),ae=e=>{if(!e)return"-";const t=new Date(e),n=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})};return(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)("h3",{children:["Table ",t]}),(0,c.jsxs)(h,{children:[null!==n&&void 0!==n&&n.guestCount?(0,c.jsxs)("span",{children:[n.guestCount," guests"]}):r?(0,c.jsxs)("span",{children:[r.seats," seats"]}):null,K&&(0,c.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),K&&(0,c.jsxs)(b,{children:[(0,c.jsx)(m,{$color:ne.text,$bg:ne.bg,children:M[V]||n.status}),(0,c.jsx)(m,{$color:ie.color,$bg:ie.bg,children:"completed"===Q||"paid"===Q?"Paid":"Unpaid"})]}),!K&&(0,c.jsx)(b,{children:(0,c.jsx)(m,{$color:ne.text,$bg:ne.bg,children:"Available"})})]}),(0,c.jsx)(g,{onClick:d,children:"\xd7"})]}),K?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(v,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Customer"}),(0,c.jsx)(F,{children:n.customerName||"Walk-in"})]}),n.customerPhone&&(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Phone"}),(0,c.jsx)(F,{children:n.customerPhone})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Type"}),(0,c.jsx)(F,{children:(n.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Source"}),(0,c.jsx)(F,{children:H[n.orderSource||"pos"]||n.orderSource})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Time"}),(0,c.jsx)(F,{children:ae(n.orderCreatedAt)})]}),n.paymentMethod&&(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Payment"}),(0,c.jsx)(F,{children:n.paymentMethod})]}),n.cashierName&&(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:"Cashier"}),(0,c.jsx)(F,{children:n.cashierName})]})]})]}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(v,{children:["Items (",ee.length,")",ee.length>0&&` \u2014 ${ee.filter(e=>"completed"===e.status).length}/${ee.length} served`]}),oe.map(e=>{const t=re[e],i=e>0,r=t[0];return(0,c.jsxs)("div",{children:[(oe.length>1||i)&&(0,c.jsxs)($,{$isAdded:i,children:[(0,c.jsx)("span",{children:i?`+Added #${e}`:"Original Order"}),i&&(null===r||void 0===r?void 0:r.added_at)&&(0,c.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:ae(r.added_at)})]}),t.map(e=>{const t=e._originalIndex,i="completed"===e.status,r=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,c.jsxs)(C,{$completed:i,children:[(0,c.jsx)(k,{$checked:i,onClick:()=>(async e=>{if(!Y&&null!==n&&void 0!==n&&n.orderId){Z(!0);try{const t=ee.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),i=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&"preparing"===V&&await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({status:"ready"})}),J())}catch(t){}Z(!1)}})(t),disabled:Y,title:i?"Mark as not served":"Mark as served",children:i?"\u2713":""}),(0,c.jsxs)(E,{children:[(0,c.jsxs)(S,{$completed:i,children:[e.name," ",(0,c.jsxs)(I,{children:["x",e.quantity]})]}),r&&(0,c.jsx)(B,{children:r})]}),(0,c.jsx)(z,{children:(0,l.vv)(e.price*e.quantity,o)}),te&&ee.length>1&&(0,c.jsx)(O,{onClick:()=>(async(e,t)=>{if(null!==n&&void 0!==n&&n.orderId&&te&&window.confirm(`Delete "${t}" from this order?`))try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&J()}catch(i){}})(t,e.name),title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===ee.length&&(0,c.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,c.jsxs)(y,{style:{borderBottom:"none"},children:[(0,c.jsx)(v,{children:"Summary"}),(0,c.jsxs)(D,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,l.vv)(n.subtotal||0,o)})]}),(n.discountPolicyAmount||0)>0&&(0,c.jsxs)(D,{children:[(0,c.jsxs)("span",{children:["Discount",n.discountPolicyName?` (${n.discountPolicyName})`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(n.discountPolicyAmount||0,o)]})]}),(n.couponDiscount||0)>0&&(0,c.jsxs)(D,{children:[(0,c.jsxs)("span",{children:["Coupon",n.couponCode?` (${n.couponCode})`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(n.couponDiscount||0,o)]})]}),(n.pointDiscount||0)>0&&(0,c.jsxs)(D,{children:[(0,c.jsxs)("span",{children:["Points",n.pointsUsed?` (${n.pointsUsed} pts)`:""]}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(n.pointDiscount||0,o)]})]}),(n.discount||0)>0&&!n.couponDiscount&&!n.discountPolicyAmount&&!n.pointDiscount&&(0,c.jsxs)(D,{children:[(0,c.jsx)("span",{children:"Discount"}),(0,c.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,o)]})]}),(n.serviceCharge||0)>0&&(0,c.jsxs)(D,{children:[(0,c.jsxs)("span",{children:["Svc Charge",n.serviceChargeRate?` (${n.serviceChargeRate}%)`:""]}),(0,c.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,o)})]}),(n.tax||0)>0&&(0,c.jsxs)(D,{children:[(0,c.jsxs)("span",{children:["Tax",n.taxRate?` (${n.taxRate}%)`:""]}),(0,c.jsx)("span",{children:(0,l.vv)(n.tax||0,o)})]}),(0,c.jsxs)(D,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,l.vv)(n.totalAmount,o)})]}),n.notes&&(0,c.jsx)(T,{children:n.notes})]})]}),(0,c.jsxs)(N,{children:[X&&n.orderId&&te&&(0,c.jsx)(_,{$variant:"success",onClick:()=>L(n.orderId,X.status),disabled:Y,children:X.label}),(0,c.jsxs)(P,{children:[te&&(0,c.jsx)(_,{$variant:"primary",onClick:W,children:"+ Add Items"}),"pending"===Q&&te&&(0,c.jsx)(_,{$variant:"secondary",onClick:U,children:"Payment"})]}),(0,c.jsxs)(P,{children:[te&&"cancelled"!==V&&(0,c.jsx)(_,{$variant:"danger",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&window.confirm("Cancel this order?")){Z(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),J()}catch(e){}Z(!1)}},disabled:Y,children:"Cancel Order"}),(0,c.jsx)(_,{$variant:"link",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&window.confirm("Delete this order? This action cannot be undone."))try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),J(),d()}catch(e){}},children:"Delete"})]}),(0,c.jsx)(_,{$variant:"link",onClick:G,children:"Open in POS Terminal \u2197"})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(R,{children:[(0,c.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,c.jsx)("p",{children:"This table is available"})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)(_,{$variant:"primary",onClick:q,children:"+ New Order"}),(0,c.jsx)(_,{$variant:"link",onClick:G,children:"Open in POS Terminal \u2197"})]})]})]})},W=r.Ay.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 12px;
  }
`,L=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,U=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,G=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,J=r.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,Y=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,Z=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,K=e=>{let{tables:t,tableStatuses:n,currency:i}=e;const r=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,p=0;t.forEach(e=>{const t=n[e.tableNumber],i=(null===t||void 0===t?void 0:t.status)||"available";o[i]++,"available"!==i&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,p++)});const x=p>0?Math.round(d/p):0;return(0,c.jsxs)(W,{children:[(0,c.jsx)(L,{children:Object.keys(s.Ez).map(e=>(0,c.jsxs)(U,{children:[(0,c.jsx)(G,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,c.jsx)(J,{}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)(Z,{children:["Tables: ",(0,c.jsx)("span",{children:r})]}),(0,c.jsxs)(Z,{children:["Avail: ",(0,c.jsx)("span",{children:o.available})]}),(0,c.jsxs)(Z,{children:["Occupied: ",(0,c.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,c.jsxs)(Z,{children:["Ready: ",(0,c.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,c.jsxs)(Z,{children:["Attn: ",(0,c.jsx)("span",{children:o["needs-attention"]})]}),(0,c.jsx)(J,{}),(0,c.jsxs)(Z,{children:["Today: ",(0,c.jsx)("span",{children:(0,l.vv)(a,i)})]}),x>0&&(0,c.jsxs)(Z,{children:["Avg: ",(0,c.jsxs)("span",{children:[x,"min"]})]})]})]})};var V=n(2966),Q=n(8930),X=n(9018),ee=n(447),te=n(9189);const ne=r.Ay.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: ${e=>e.$isOpen?"flex":"none"};
  background: rgba(0, 0, 0, 0.5);
  align-items: stretch;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`,ie=r.Ay.div`
  width: 100%;
  max-width: 1200px;
  background: #FAFBFC;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
    max-width: 100%;
  }
`,re=r.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,oe=r.Ay.div`
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
  span {
    font-size: 13px;
    color: #6B7C93;
    font-weight: 500;
  }
`,ae=r.Ay.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover { background: #F3F4F6; color: #0A2540; }
`,se=r.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,de=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`,le=r.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
`,ce=r.Ay.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder { color: #8898AA; }
`,pe=r.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,xe=r.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${e=>e.$active?"#635BFF":"#6B7C93"};

  &:hover { color: #635BFF; }

  ${e=>e.$active&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: #635BFF;\n    }\n  "}
`,ue=r.Ay.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  overflow-y: auto;
  align-content: start;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,he=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: ${e=>e.$soldOut?"not-allowed":"pointer"};
  opacity: ${e=>e.$soldOut?.5:1};
  transition: all 0.15s;
  text-align: center;
  position: relative;

  &:hover {
    ${e=>!e.$soldOut&&"\n      border-color: #C7D2FE;\n      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n      transform: translateY(-2px);\n    "}
  }

  &:active {
    ${e=>!e.$soldOut&&"transform: translateY(0);"}
  }
`,ge=r.Ay.div`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.$hasImage?"0":"36px"};
  color: #C7D2FE;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,be=r.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,me=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,fe=r.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,ye=r.Ay.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }

  &:active { transform: translateY(0); }
`,ve=r.Ay.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FF6B6B;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`,je=r.Ay.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`,we=r.Ay.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9CA3AF;
  font-size: 14px;
`,Ae=r.Ay.div`
  width: 400px;
  min-width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 320px;
    min-width: 320px;
  }
`,Fe=r.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$e=r.Ay.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`,Ce=r.Ay.div`
  padding: 12px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ke=r.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,Ee=r.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Se=r.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 2px; }
`,Be=r.Ay.div`
  padding: 16px 24px;
`,ze=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Ie=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,Oe=r.Ay.div`
  flex: 1;
`,De=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Te=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Ne=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,_e=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Pe=r.Ay.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }

  &:active { background: #F0F4FF; }
`,Re=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,Me=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,He=r.Ay.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;

  &:hover { background: #FFE6E6; }
`,qe=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
  padding: 40px;
`,We=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Le=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child { margin-bottom: 0; }
`,Ue=r.Ay.span`
  color: #6B7C93;
`,Ge=r.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Je=(0,r.Ay)(Le)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;

  ${Ue} { color: #0A2540; }
  ${Ge} { color: #635BFF; }
`,Ye=r.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,Ze=r.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>"primary"===e.$variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5243E0;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:active { transform: translateY(0); }\n  ":"\n    background: white;\n    color: #6B7C93;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      border-color: #C7D2FE;\n      color: #635BFF;\n    }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,Ke=e=>{let{isOpen:t,onClose:n,tableNumber:r,tableInfo:o,statusInfo:s,mode:d,restaurantId:p,currency:x,onOrderComplete:u}=e;const{categories:h,menuItems:g,getItemsByCategory:b}=(0,Q.b)(),{operationSettings:m}=(0,X.Pj)(),{addOrder:f}=(0,ee.h)(),{user:y}=(0,a.As)(),[v,j]=(0,i.useState)(null),[w,A]=(0,i.useState)(""),[F,$]=(0,i.useState)([]),[C,k]=(0,i.useState)((null===s||void 0===s?void 0:s.guestCount)||0),[E,S]=(0,i.useState)(!1),[B,z]=(0,i.useState)(!1),[I,O]=(0,i.useState)(null);(0,i.useEffect)(()=>{h.length>0&&!v&&j(h[0].id)},[h,v]),(0,i.useEffect)(()=>{t&&($([]),A(""),k((null===s||void 0===s?void 0:s.guestCount)||0),S(!1),h.length>0&&j(h[0].id))},[t,s,h]);const D=(0,i.useMemo)(()=>w.trim()?g.filter(e=>e.name.toLowerCase().includes(w.toLowerCase())):v?b(v):g,[w,v,g,b]),T=(0,i.useMemo)(()=>{const e=F.reduce((e,t)=>{const n=(t.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0);return e+(t.menuItem.price+n)*t.quantity},0),t=null!==m&&void 0!==m&&m.taxEnabled&&m.taxRate||0,n=null!==m&&void 0!==m&&m.serviceChargeEnabled&&m.serviceChargeRate||0,i=e*(t/100),r=e*(n/100);return{subtotal:e,tax:i,serviceCharge:r,total:e+i+r,taxRate:t,serviceChargeRate:n}},[F,m]),N=(0,i.useCallback)((e,t,n,i)=>{const r=`${e.id}_${Date.now()}`;$(o=>[...o,{id:r,menuItem:{id:String(e.id),name:e.name,price:e.price,emoji:e.emoji||"",image:e.image,is_set_menu:e.is_set_menu,set_items:e.set_items},quantity:t,options:n,selectedOptionsData:i}])},[]),_=(0,i.useCallback)(e=>{e.soldOut||(e.optionGroups&&e.optionGroups.length>0?(O(e),z(!0)):N(e,1,[]))},[N]),P=(0,i.useCallback)((e,t)=>{$(n=>n.map(n=>{if(n.id===e){const e=n.quantity+t;return e<=0?null:{...n,quantity:e}}return n}).filter(Boolean))},[]),R=(0,i.useCallback)(e=>{$(t=>t.filter(t=>t.id!==e))},[]),M="new"===d?async()=>{if(0!==F.length&&!E){S(!0);try{const e={id:`fp-${Date.now()}`,orderNumber:"",customer:{name:"Walk-in Customer",phone:""},items:F.map(e=>({id:e.id,menuItem:e.menuItem,quantity:e.quantity,options:e.options})),status:"pending",createdAt:(new Date).toISOString(),subtotal:T.subtotal,tax:T.tax,discount:0,total:T.total,paymentMethod:"",paymentStatus:"pending",orderType:"dine-in",orderSource:"pos",tableNumber:r,guest_count:C||null,serviceCharge:T.serviceCharge,serviceChargeRate:T.serviceChargeRate,taxRate:T.taxRate,cashier_id:(null===y||void 0===y?void 0:y.id)||null,cashier_name:(null===y||void 0===y?void 0:y.name)||(null===y||void 0===y?void 0:y.full_name)||null};await f(e,p),u()}catch(e){console.error("Failed to create order:",e)}finally{S(!1)}}}:async()=>{if(0!==F.length&&!E&&null!==s&&void 0!==s&&s.orderId){S(!0);try{const e=localStorage.getItem("auth_token"),t=F.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:e.options||[]}));(await fetch(`/api/orders/${s.orderId}/add-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t})})).ok&&u()}catch(e){console.error("Failed to add items:",e)}finally{S(!1)}}},H=F.reduce((e,t)=>e+t.quantity,0);return t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(ne,{$isOpen:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,c.jsxs)(ie,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(re,{children:[(0,c.jsxs)(oe,{children:[(0,c.jsxs)("h2",{children:["new"===d?"New Order":"Add Items"," \u2014 Table ",r]}),(0,c.jsxs)("span",{children:[o?`${o.seats} seats`:"","add"===d&&null!==s&&void 0!==s&&s.orderNumber?` \xb7 Order ${s.orderNumber}`:""]})]}),(0,c.jsx)(ae,{onClick:n,children:"\xd7"})]}),(0,c.jsxs)(se,{children:[(0,c.jsxs)(de,{children:[(0,c.jsx)(le,{children:(0,c.jsx)(ce,{placeholder:"Search menu...",value:w,onChange:e=>A(e.target.value)})}),(0,c.jsxs)(pe,{children:[(0,c.jsx)(xe,{$active:!v,onClick:()=>{j(null),A("")},children:"All"}),h.map(e=>(0,c.jsxs)(xe,{$active:v===e.id,onClick:()=>{j(e.id),A("")},children:[e.emoji," ",e.name]},e.id))]}),(0,c.jsxs)(ue,{children:[D.map(e=>(0,c.jsxs)(he,{$soldOut:e.soldOut,onClick:()=>_(e),children:[e.is_set_menu&&(0,c.jsx)(je,{children:"SET"}),(0,c.jsx)(ge,{$hasImage:!!e.image,children:e.image?(0,c.jsx)("img",{src:e.image,alt:e.name}):e.emoji}),(0,c.jsx)(be,{children:e.name}),(0,c.jsx)(me,{children:(0,l.vv)(e.price,x)}),(0,c.jsx)(fe,{children:(0,c.jsx)(ye,{onClick:t=>{t.stopPropagation(),_(e)},children:"+ Add"})}),e.soldOut&&(0,c.jsx)(ve,{children:"SOLD OUT"})]},e.id)),0===D.length&&(0,c.jsx)(we,{children:"No items found"})]})]}),(0,c.jsxs)(Ae,{children:[(0,c.jsxs)(Fe,{children:[(0,c.jsxs)($e,{children:["Table ",r]}),(0,c.jsxs)("span",{style:{fontSize:"13px",color:"#6B7C93"},children:[H," ",1===H?"item":"items"]})]}),"new"===d&&(0,c.jsxs)(Ce,{children:[(0,c.jsx)(ke,{children:"Guests:"}),(0,c.jsxs)(Ee,{value:C,onChange:e=>k(Number(e.target.value)),children:[(0,c.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,c.jsx)("option",{value:e,children:e},e))]})]}),F.length>0?(0,c.jsx)(Se,{children:(0,c.jsxs)(Be,{children:[(0,c.jsxs)(ze,{children:[H," ",1===H?"item":"items"]}),F.map(e=>(0,c.jsxs)(Ie,{children:[(0,c.jsxs)(Oe,{children:[(0,c.jsx)(De,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,c.jsx)(Te,{children:e.options.join(", ")})]}),(0,c.jsxs)(Ne,{children:[(0,c.jsxs)(_e,{children:[(0,c.jsx)(Pe,{onClick:()=>P(e.id,-1),children:"-"}),(0,c.jsx)(Re,{children:e.quantity}),(0,c.jsx)(Pe,{onClick:()=>P(e.id,1),children:"+"})]}),(0,c.jsx)(Me,{children:(0,l.vv)((e.menuItem.price+(e.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0))*e.quantity,x)}),(0,c.jsx)(He,{onClick:()=>R(e.id),children:"\u2715"})]})]},e.id))]})}):(0,c.jsxs)(qe,{children:[(0,c.jsx)("span",{style:{fontSize:"36px",opacity:.3},children:"\ud83d\udccb"}),(0,c.jsx)("span",{children:"No items in order"}),(0,c.jsx)("span",{style:{fontSize:"12px"},children:"Select menu items to start"})]}),(0,c.jsxs)(We,{children:[(0,c.jsxs)(Le,{children:[(0,c.jsx)(Ue,{children:"Subtotal"}),(0,c.jsx)(Ge,{children:(0,l.vv)(T.subtotal,x)})]}),T.tax>0&&(0,c.jsxs)(Le,{children:[(0,c.jsxs)(Ue,{children:["Tax (",T.taxRate,"%)"]}),(0,c.jsx)(Ge,{children:(0,l.vv)(T.tax,x)})]}),T.serviceCharge>0&&(0,c.jsxs)(Le,{children:[(0,c.jsxs)(Ue,{children:["Service (",T.serviceChargeRate,"%)"]}),(0,c.jsx)(Ge,{children:(0,l.vv)(T.serviceCharge,x)})]}),(0,c.jsxs)(Je,{children:[(0,c.jsx)(Ue,{children:"Total"}),(0,c.jsx)(Ge,{children:(0,l.vv)(T.total,x)})]})]}),(0,c.jsxs)(Ye,{children:[(0,c.jsx)(Ze,{$variant:"secondary",onClick:n,children:"Cancel"}),(0,c.jsx)(Ze,{$variant:"primary",onClick:M,disabled:0===F.length||E,children:E?"Submitting...":"new"===d?"Submit Order":"Add Items"})]})]})]})]})}),B&&I&&(0,c.jsx)(te.A,{isOpen:B,onClose:()=>z(!1),menuItem:{id:String(I.id),name:I.name,price:I.price,emoji:I.emoji||"",image:I.image,optionGroups:I.optionGroups},onConfirm:(e,t,n)=>{N(I,e,t,n),z(!1)}})]}):null};var Ve=n(8406),Qe=n(3422);const Xe=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,et=r.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,tt=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,nt=r.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,it=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,rt=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,ot=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,at=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,st=r.Ay.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
    border-color: #D1D9E0;
  }
`,dt=r.Ay.button`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #374151;

  &:hover {
    background: #F3F4F6;
  }
`,lt=r.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,ct=r.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,pt=r.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,xt=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:r}=(0,a.As)(),[l,p]=(0,i.useState)(s.He),[x,u]=(0,i.useState)({}),[h,g]=(0,i.useState)(!1),[b,m]=(0,i.useState)(""),[f,y]=(0,i.useState)(!0),[v,j]=(0,i.useState)(""),[w,A]=(0,i.useState)("Asia/Kuala_Lumpur"),F=(0,i.useRef)(null),$=(0,i.useRef)(null),[C,k]=(0,i.useState)(null),[E,S]=(0,i.useState)(!1),[B,z]=(0,i.useState)(!1),[I,O]=(0,i.useState)("new");(0,i.useEffect)(()=>{const e=()=>{const e=new Date;m(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:w}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[w]);const D=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),T=(0,i.useCallback)(()=>{F.current&&clearTimeout(F.current),F.current=setTimeout(()=>D(),2e3)},[D]);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const i=await n.json(),r=i.data||i;if(r.floor_plan&&p(r.floor_plan),r.currency&&j(r.currency),r.operation_settings){const e="string"===typeof r.operation_settings?JSON.parse(r.operation_settings):r.operation_settings;A((0,Ve.ng)(e))}}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),D()},[t,D]),(0,i.useEffect)(()=>{if(!t)return;const e=(0,Qe.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),D()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>T()),e.on("order-created",()=>T()),e.on("order-items-added",()=>T()),e.on("new-order",()=>T()),$.current=e,()=>{e.disconnect(),$.current=null}},[t,D,T]),(0,i.useEffect)(()=>{const e=setInterval(()=>D(),3e4);return()=>clearInterval(e)},[D]);const N=C?x[C]:void 0,_=C?l.tables.find(e=>e.tableNumber===C):void 0;return f?(0,c.jsxs)(Xe,{children:[(0,c.jsx)(et,{children:(0,c.jsx)(tt,{children:(0,c.jsx)(nt,{children:"Floor Plan"})})}),(0,c.jsx)(pt,{children:"Loading floor plan..."})]}):(0,c.jsxs)(Xe,{children:[(0,c.jsxs)(et,{children:[(0,c.jsxs)(tt,{children:[(0,c.jsx)(dt,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,c.jsx)(nt,{children:"Floor Plan"}),(0,c.jsxs)(rt,{children:[(0,c.jsx)(it,{$connected:h}),h?"Live":"Offline"]})]}),(0,c.jsxs)(ot,{children:[(0,c.jsx)(at,{children:b}),"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(0,c.jsx)(st,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,c.jsxs)(lt,{children:[(0,c.jsx)(ct,{children:(0,c.jsx)(d.A,{floorPlan:l,tableStatuses:x,onTableClick:e=>{k(t=>t===e?null:e)},selectedTableId:C?null===(e=l.tables.find(e=>e.tableNumber===C))||void 0===e?void 0:e.id:null,currency:v})}),C&&(0,c.jsx)(q,{tableNumber:C,statusInfo:N,tableInfo:_,currency:v,timezone:w,onClose:()=>k(null),onNewOrder:()=>{O("new"),z(!0)},onAddItems:()=>{O("add"),z(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await D()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{S(!0)},onNavigateToPOS:()=>{C&&n(`/restaurant/${t}/pos-terminal?table=${C}&from=floor-plan`)},onOrderUpdated:D})]}),(0,c.jsx)(K,{tables:l.tables,tableStatuses:x,currency:v}),E&&N&&(0,c.jsx)(V.A,{isOpen:E,onClose:()=>S(!1),total:N.totalAmount||0,subtotal:N.subtotal||0,tax:N.tax||0,serviceCharge:N.serviceCharge||0,discountAmount:N.discount||0,onConfirmPayment:async(e,t,n,i,r)=>{if(!C)return;const o=x[C];if(null!==o&&void 0!==o&&o.orderId)try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({payment_method:e,payment_status:"completed",kitchen_ready:!0,points_used:i||0,point_discount:r||0})})).ok&&(S(!1),await D())}catch(a){console.error("Failed to process payment:",a)}},restaurantId:Number(t),customerId:N.customerId||void 0}),C&&(0,c.jsx)(Ke,{isOpen:B,onClose:()=>z(!1),tableNumber:C,tableInfo:_,statusInfo:N,mode:I,restaurantId:Number(t),currency:v,onOrderComplete:()=>{z(!1),D()}})]})}}}]);