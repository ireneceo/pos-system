"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6567],{5783:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),i=n(4752),o=n(7447),a=n(4414);const s=i.Ay.div`
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
`,d=i.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  line-height: 1;
`,l=i.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,c=i.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,p=new Set(["kitchen","entrance"]),x={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},u=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:i=!1,onClick:u,onMouseDown:h,onTouchStart:g,statusInfo:b,currency:m=""}=e;const f=t.tableType||"table",y="table"!==f,v=p.has(f),j=y?x[f]||x.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!i&&null!==b&&void 0!==b&&b.orderStatus&&o.v[b.orderStatus]?o.v[b.orderStatus]:o.Ez[n],F=y?{...v?{background:"transparent",border:r&&i?"1.5px dashed #635BFF":"none",boxShadow:r&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":j.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:r&&!v,$isEditing:i,onClick:e=>{i||!u||y||(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{i&&h&&h(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:F,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!i&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!i&&b&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});u.displayName="TableNode";const h=u,g=i.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,b=i.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,m=i.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,f=i.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,y=i.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:i=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const x=(0,r.useRef)(null),u=(0,r.useRef)(null),[v,j]=(0,r.useState)(1),[F,w]=(0,r.useState)({x:0,y:0}),A=(0,r.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,o=-1/0;for(const i of t.tables){const t=i.width/2,a=i.height/2;e=Math.min(e,i.x-t),n=Math.min(n,i.y-a),r=Math.max(r,i.x+t),o=Math.max(o,i.y+a)}const a=r-e,s=o-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,i]),C=(0,r.useCallback)(()=>{if(!u.current)return;const e=u.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=A.w/e.width,n=A.h/e.height,r=Math.max(t,n);j(r);const i=A.w/r,o=A.h/r;w({x:(e.width-i)/2,y:(e.height-o)/2})},[A]);(0,r.useEffect)(()=>{C();const e=new ResizeObserver(()=>C());return x.current&&e.observe(x.current),()=>e.disconnect()},[C]);const k=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:x,children:(0,a.jsxs)(b,{ref:u,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,a.jsx)(m,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(f,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:i?0:F.x-A.x/v+"px",top:i?0:F.y-A.y/v+"px",width:i?`${t.canvasWidth}px`:`${A.w}px`,height:i?`${t.canvasHeight}px`:`${A.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(h,{table:e,status:k(e.tableNumber),isSelected:o===e.id,isEditing:i,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(y,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>i,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>o,v:()=>d});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"},d={outstanding:{bg:"#FEF3C7",text:"#F59E0B",border:"#F59E0B"},pending:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"},preparing:{bg:"#DBEAFE",text:"#1E40AF",border:"#3B82F6"},ready:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},served:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},completed:{bg:"#E5E7EB",text:"#374151",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#991B1B",border:"#DC2626"},awaiting_payment:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"}}},8948:(e,t,n)=>{n.r(t),n.d(t,{default:()=>mt});var r=n(9950),i=n(4752),o=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(9018),p=n(5863),x=n(4414);const u=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,g=i.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,b=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,m=i.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,f=i.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,y=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,v=i.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,j=i.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,F=i.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,A=i.Ay.div`
  font-size: 12px;
`,C=i.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,k=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,$=i.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,S=i.Ay.button`
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
`,B=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,I=i.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,O=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,N=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,_=i.Ay.button`
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
`,D=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,T=i.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,P=i.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,R=i.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,M=i.Ay.div`
  display: flex;
  gap: 6px;
`,H=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,q=i.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,W=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,L=i.Ay.div`
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
`,U={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},J={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},G=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),Y=e=>{let{tableNumber:t,statusInfo:n,tableInfo:i,currency:o,timezone:a,onClose:d,onNewOrder:Y,onAddItems:Z,onStatusChange:K,onPayment:V,onNavigateToPOS:Q,onOrderUpdated:X}=e;const[ee,te]=(0,r.useState)(!1),{getStoreInfo:ne}=(0,c.Pj)(),re=n&&"available"!==n.status,ie=(null===n||void 0===n?void 0:n.orderStatus)||"",oe=(null===n||void 0===n?void 0:n.paymentStatus)||"pending",ae=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(ie),se=(null===n||void 0===n?void 0:n.orderItems)||[],de="completed"!==oe&&!["completed","cancelled"].includes(ie),le=["preparing","ready","served"].includes(ie),ce=re&&s.v[ie]?s.v[ie]:{bg:"#ECFDF5",text:"#059669",border:"#059669"},pe=(()=>{switch(oe){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),xe={};se.forEach((e,t)=>{const n=e.order_group||0;xe[n]||(xe[n]=[]),xe[n].push({...e,_originalIndex:t})});const ue=Object.keys(xe).map(Number).sort((e,t)=>e-t),he=e=>{if(!e)return"-";const t=new Date(e),n=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},ge=(e,r)=>{if(!n)return null;const i=e||se;return{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,orderType:n.orderType||"dine_in",orderSource:n.orderSource||"pos",tableNumber:t||null,pagerNumber:null,customerName:n.customerName||"Walk-in Customer",groupLabel:r,items:i.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:n.notes||"",takeawayCharge:0}},be=async()=>{const e=ge();e&&0!==se.length&&await(0,p.Si)(e,ne())},me=G(ie),fe=se.some(e=>(e.order_group||0)>0);return(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsxs)("h3",{children:["Table ",t]}),(0,x.jsxs)(b,{children:[null!==n&&void 0!==n&&n.guestCount?(0,x.jsxs)("span",{children:[n.guestCount," guests"]}):i?(0,x.jsxs)("span",{children:[i.seats," seats"]}):null,re&&(0,x.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),re&&(0,x.jsxs)(f,{children:[(0,x.jsx)(y,{$color:ce.text,$bg:ce.bg,children:U[ie]||n.status}),(0,x.jsx)(y,{$color:pe.color,$bg:pe.bg,children:"completed"===oe||"paid"===oe?"Paid":"Unpaid"})]}),!re&&(0,x.jsx)(f,{children:(0,x.jsx)(y,{$color:ce.text,$bg:ce.bg,children:"Available"})})]}),(0,x.jsx)(m,{onClick:d,children:"\xd7"})]}),re?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(j,{children:[(0,x.jsxs)(F,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,x.jsxs)(w,{children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Customer"}),(0,x.jsx)(k,{children:n.customerName||"Walk-in"})]}),n.customerPhone&&(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Phone"}),(0,x.jsx)(k,{children:n.customerPhone})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Type"}),(0,x.jsx)(k,{children:(n.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Source"}),(0,x.jsx)(k,{children:J[n.orderSource||"pos"]||n.orderSource})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Time"}),(0,x.jsx)(k,{children:he(n.orderCreatedAt)})]}),n.paymentMethod&&(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Payment"}),(0,x.jsx)(k,{children:n.paymentMethod})]}),n.cashierName&&(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{children:"Cashier"}),(0,x.jsx)(k,{children:n.cashierName})]})]})]}),(0,x.jsxs)(j,{children:[(0,x.jsxs)(F,{children:["Items (",se.length,")",le&&se.length>0&&` \u2014 ${se.filter(e=>"completed"===e.status).length}/${se.length} served`]}),ue.map(e=>{const t=xe[e],r=e>0,i=t[0];return(0,x.jsxs)("div",{children:[(ue.length>1||r)&&(0,x.jsxs)($,{$isAdded:r,children:[(0,x.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===i||void 0===i?void 0:i.added_at)&&(0,x.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:he(i.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,i=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,x.jsxs)(E,{$completed:r&&le,children:[le&&(0,x.jsx)(S,{$checked:r,onClick:()=>(async e=>{if(!ee&&null!==n&&void 0!==n&&n.orderId){te(!0);try{const t=se.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(ie)&&await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),X())}catch(t){}te(!1)}})(t),disabled:ee,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(z,{$completed:r,children:[e.name," ",(0,x.jsxs)(N,{children:["x",e.quantity]})]}),i&&(0,x.jsx)(I,{children:i})]}),(0,x.jsx)(O,{children:(0,l.vv)(e.price*e.quantity,o)}),de&&se.length>1&&(0,x.jsx)(_,{onClick:()=>(async(e,t)=>{if(null!==n&&void 0!==n&&n.orderId&&de&&window.confirm(`Delete "${t}" from this order?`))try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&X()}catch(r){}})(t,e.name),title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===se.length&&(0,x.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,x.jsxs)(j,{style:{borderBottom:"none"},children:[(0,x.jsx)(F,{children:"Summary"}),(0,x.jsxs)(D,{children:[(0,x.jsx)("span",{children:"Subtotal"}),(0,x.jsx)("span",{children:(0,l.vv)(n.subtotal||0,o)})]}),(n.discountPolicyAmount||0)>0&&(0,x.jsxs)(D,{children:[(0,x.jsxs)("span",{children:["Discount",n.discountPolicyName?` (${n.discountPolicyName})`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.discountPolicyAmount||0,o)]})]}),(n.couponDiscount||0)>0&&(0,x.jsxs)(D,{children:[(0,x.jsxs)("span",{children:["Coupon",n.couponCode?` (${n.couponCode})`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.couponDiscount||0,o)]})]}),(n.pointDiscount||0)>0&&(0,x.jsxs)(D,{children:[(0,x.jsxs)("span",{children:["Points",n.pointsUsed?` (${n.pointsUsed} pts)`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.pointDiscount||0,o)]})]}),(n.discount||0)>0&&!n.couponDiscount&&!n.discountPolicyAmount&&!n.pointDiscount&&(0,x.jsxs)(D,{children:[(0,x.jsx)("span",{children:"Discount"}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,o)]})]}),(n.serviceCharge||0)>0&&(0,x.jsxs)(D,{children:[(0,x.jsxs)("span",{children:["Svc Charge",n.serviceChargeRate?` (${n.serviceChargeRate}%)`:""]}),(0,x.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,o)})]}),(n.tax||0)>0&&(0,x.jsxs)(D,{children:[(0,x.jsxs)("span",{children:["Tax",n.taxRate?` (${n.taxRate}%)`:""]}),(0,x.jsx)("span",{children:(0,l.vv)(n.tax||0,o)})]}),(0,x.jsxs)(D,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,x.jsx)("span",{children:"Total"}),(0,x.jsx)("span",{children:(0,l.vv)(n.totalAmount,o)})]}),n.notes&&(0,x.jsx)(T,{children:n.notes})]})]}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(H,{children:[(0,x.jsx)(q,{onClick:async()=>{const e=n?{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",tableNumber:t||null,pagerNumber:null,date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,items:se.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(n.subtotal||0)),discount:parseFloat(String(n.discount||0)),coupon:n.couponCode?{code:n.couponCode,discount:parseFloat(String(n.couponDiscount||0))}:null,serviceCharge:parseFloat(String(n.serviceCharge||0)),serviceChargeRate:parseFloat(String(n.serviceChargeRate||10)),tax:parseFloat(String(n.tax||0)),taxRate:parseFloat(String(n.taxRate||6)),total:parseFloat(String(n.totalAmount||0)),paymentMethod:n.paymentMethod||"cash",amountReceived:0,change:0,cashierName:n.cashierName||null}:null;e&&0!==se.length&&await(0,p.pG)(e,ne())},title:"Print Bill",children:(0,x.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,x.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,x.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,x.jsx)(q,{onClick:be,title:"Print Order Ticket",children:(0,x.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),fe&&(0,x.jsx)(q,{onClick:async()=>{if(0===se.length)return;const e=se.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void be();const n=se.filter(e=>(e.order_group||0)===t),r=ge(n,`+Order ${t}`);r&&await(0,p.Si)(r,ne())},title:"Print +Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,x.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M12 4v16m8-8H4"})})}),me&&(0,x.jsx)(q,{onClick:async()=>{if(null===n||void 0===n||!n.orderId||ee)return;const e=G(ie);if(e){te(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),X()}catch(t){}te(!1)}},title:`Revert to ${U[me]||me}`,children:(0,x.jsx)(W,{children:"\u21ba"})})]}),ae&&n.orderId&&de&&(0,x.jsx)(R,{$variant:"ready"===ie?"success":"primary",onClick:()=>K(n.orderId,ae.status),disabled:ee,children:ae.label}),"payment_verification_pending"===oe&&(0,x.jsx)(R,{$variant:"success",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId){te(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),X()}catch(e){}te(!1)}},disabled:ee,children:"Confirm Payment"}),(0,x.jsxs)(M,{children:[de&&(0,x.jsx)(R,{$variant:"primary",onClick:Z,children:"+ Add Items"}),"pending"===oe&&de&&(0,x.jsx)(R,{$variant:"served"===ie?"success":"secondary",onClick:V,children:"Payment"})]}),de&&"cancelled"!==ie&&(0,x.jsx)(R,{$variant:"danger",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&window.confirm("Cancel this order?")){te(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),X()}catch(e){}te(!1)}},disabled:ee,children:"Cancel Order"}),(0,x.jsx)(R,{$variant:"link",onClick:Q,children:"Open in POS Terminal \u2197"})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(L,{children:[(0,x.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,x.jsx)("p",{children:"This table is available"})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(R,{$variant:"primary",onClick:Y,children:"+ New Order"}),(0,x.jsx)(R,{$variant:"link",onClick:Q,children:"Open in POS Terminal \u2197"})]})]})]})},Z=i.Ay.div`
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
`,K=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,V=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,Q=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,X=i.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,te=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,ne=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const i=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";o[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,x.jsxs)(Z,{children:[(0,x.jsx)(K,{children:Object.keys(s.Ez).map(e=>(0,x.jsxs)(V,{children:[(0,x.jsx)(Q,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,x.jsx)(X,{}),(0,x.jsxs)(ee,{children:[(0,x.jsxs)(te,{children:["Tables: ",(0,x.jsx)("span",{children:i})]}),(0,x.jsxs)(te,{children:["Avail: ",(0,x.jsx)("span",{children:o.available})]}),(0,x.jsxs)(te,{children:["Occupied: ",(0,x.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,x.jsxs)(te,{children:["Ready: ",(0,x.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,x.jsxs)(te,{children:["Attn: ",(0,x.jsx)("span",{children:o["needs-attention"]})]}),(0,x.jsx)(X,{}),(0,x.jsxs)(te,{children:["Today: ",(0,x.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,x.jsxs)(te,{children:["Avg: ",(0,x.jsxs)("span",{children:[p,"min"]})]})]})]})};var re=n(2966),ie=n(8930),oe=n(447),ae=n(9189);const se=i.Ay.div`
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
`,de=i.Ay.div`
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
`,le=i.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,ce=i.Ay.div`
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
`,pe=i.Ay.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover { background: #F3F4F6; color: #0A2540; }
`,xe=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,ue=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`,he=i.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
`,ge=i.Ay.input`
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
`,be=i.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,me=i.Ay.button`
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
`,fe=i.Ay.div`
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
`,ye=i.Ay.div`
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
`,ve=i.Ay.div`
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
`,je=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,Fe=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,we=i.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,Ae=i.Ay.button`
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
`,Ce=i.Ay.div`
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
`,ke=i.Ay.div`
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
`,$e=i.Ay.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9CA3AF;
  font-size: 14px;
`,Ee=i.Ay.div`
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
`,Se=i.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Be=i.Ay.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`,ze=i.Ay.div`
  padding: 12px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Ie=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,Oe=i.Ay.select`
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
`,Ne=i.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 2px; }
`,_e=i.Ay.div`
  padding: 16px 24px;
`,De=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Te=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,Pe=i.Ay.div`
  flex: 1;
`,Re=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Me=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,He=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,qe=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,We=i.Ay.button`
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
`,Le=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,Ue=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Je=i.Ay.button`
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
`,Ge=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
  padding: 40px;
`,Ye=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Ze=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child { margin-bottom: 0; }
`,Ke=i.Ay.span`
  color: #6B7C93;
`,Ve=i.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Qe=(0,i.Ay)(Ze)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;

  ${Ke} { color: #0A2540; }
  ${Ve} { color: #635BFF; }
`,Xe=i.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,et=i.Ay.button`
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
`,tt=e=>{let{isOpen:t,onClose:n,tableNumber:i,tableInfo:o,statusInfo:s,mode:d,restaurantId:p,currency:u,onOrderComplete:h}=e;const{categories:g,menuItems:b,getItemsByCategory:m}=(0,ie.b)(),{operationSettings:f}=(0,c.Pj)(),{addOrder:y}=(0,oe.h)(),{user:v}=(0,a.As)(),[j,F]=(0,r.useState)(null),[w,A]=(0,r.useState)(""),[C,k]=(0,r.useState)([]),[$,E]=(0,r.useState)((null===s||void 0===s?void 0:s.guestCount)||0),[S,B]=(0,r.useState)(!1),[z,I]=(0,r.useState)(!1),[O,N]=(0,r.useState)(null);(0,r.useEffect)(()=>{g.length>0&&!j&&F(g[0].id)},[g,j]),(0,r.useEffect)(()=>{t&&(k([]),A(""),E((null===s||void 0===s?void 0:s.guestCount)||0),B(!1),g.length>0&&F(g[0].id))},[t,s,g]);const _=(0,r.useMemo)(()=>w.trim()?b.filter(e=>e.name.toLowerCase().includes(w.toLowerCase())):j?m(j):b,[w,j,b,m]),D=(0,r.useMemo)(()=>{const e=C.reduce((e,t)=>{const n=(t.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0);return e+(t.menuItem.price+n)*t.quantity},0),t=null!==f&&void 0!==f&&f.taxEnabled&&f.taxRate||0,n=null!==f&&void 0!==f&&f.serviceChargeEnabled&&f.serviceChargeRate||0,r=e*(t/100),i=e*(n/100);return{subtotal:e,tax:r,serviceCharge:i,total:e+r+i,taxRate:t,serviceChargeRate:n}},[C,f]),T=(0,r.useCallback)((e,t,n,r)=>{const i=`${e.id}_${Date.now()}`;k(o=>[...o,{id:i,menuItem:{id:String(e.id),name:e.name,price:e.price,emoji:e.emoji||"",image:e.image,is_set_menu:e.is_set_menu,set_items:e.set_items},quantity:t,options:n,selectedOptionsData:r}])},[]),P=(0,r.useCallback)(e=>{e.soldOut||(e.optionGroups&&e.optionGroups.length>0?(N(e),I(!0)):T(e,1,[]))},[T]),R=(0,r.useCallback)((e,t)=>{k(n=>n.map(n=>{if(n.id===e){const e=n.quantity+t;return e<=0?null:{...n,quantity:e}}return n}).filter(Boolean))},[]),M=(0,r.useCallback)(e=>{k(t=>t.filter(t=>t.id!==e))},[]),H="new"===d?async()=>{if(0!==C.length&&!S){B(!0);try{const e={id:`fp-${Date.now()}`,orderNumber:"",customer:{name:"Walk-in Customer",phone:""},items:C.map(e=>({id:e.id,menuItem:e.menuItem,quantity:e.quantity,options:e.options})),status:"pending",createdAt:(new Date).toISOString(),subtotal:D.subtotal,tax:D.tax,discount:0,total:D.total,paymentMethod:"",paymentStatus:"pending",orderType:"dine-in",orderSource:"pos",tableNumber:i,guest_count:$||null,serviceCharge:D.serviceCharge,serviceChargeRate:D.serviceChargeRate,taxRate:D.taxRate,cashier_id:(null===v||void 0===v?void 0:v.id)||null,cashier_name:(null===v||void 0===v?void 0:v.name)||(null===v||void 0===v?void 0:v.full_name)||null};await y(e,p),h()}catch(e){console.error("Failed to create order:",e)}finally{B(!1)}}}:async()=>{if(0!==C.length&&!S&&null!==s&&void 0!==s&&s.orderId){B(!0);try{const e=localStorage.getItem("auth_token"),t=C.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:e.options||[]}));(await fetch(`/api/orders/${s.orderId}/add-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t})})).ok&&h()}catch(e){console.error("Failed to add items:",e)}finally{B(!1)}}},q=C.reduce((e,t)=>e+t.quantity,0);return t?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(se,{$isOpen:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,x.jsxs)(de,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(le,{children:[(0,x.jsxs)(ce,{children:[(0,x.jsxs)("h2",{children:["new"===d?"New Order":"Add Items"," \u2014 Table ",i]}),(0,x.jsxs)("span",{children:[o?`${o.seats} seats`:"","add"===d&&null!==s&&void 0!==s&&s.orderNumber?` \xb7 Order ${s.orderNumber}`:""]})]}),(0,x.jsx)(pe,{onClick:n,children:"\xd7"})]}),(0,x.jsxs)(xe,{children:[(0,x.jsxs)(ue,{children:[(0,x.jsx)(he,{children:(0,x.jsx)(ge,{placeholder:"Search menu...",value:w,onChange:e=>A(e.target.value)})}),(0,x.jsxs)(be,{children:[(0,x.jsx)(me,{$active:!j,onClick:()=>{F(null),A("")},children:"All"}),g.map(e=>(0,x.jsxs)(me,{$active:j===e.id,onClick:()=>{F(e.id),A("")},children:[e.emoji," ",e.name]},e.id))]}),(0,x.jsxs)(fe,{children:[_.map(e=>(0,x.jsxs)(ye,{$soldOut:e.soldOut,onClick:()=>P(e),children:[e.is_set_menu&&(0,x.jsx)(ke,{children:"SET"}),(0,x.jsx)(ve,{$hasImage:!!e.image,children:e.image?(0,x.jsx)("img",{src:e.image,alt:e.name}):e.emoji}),(0,x.jsx)(je,{children:e.name}),(0,x.jsx)(Fe,{children:(0,l.vv)(e.price,u)}),(0,x.jsx)(we,{children:(0,x.jsx)(Ae,{onClick:t=>{t.stopPropagation(),P(e)},children:"+ Add"})}),e.soldOut&&(0,x.jsx)(Ce,{children:"SOLD OUT"})]},e.id)),0===_.length&&(0,x.jsx)($e,{children:"No items found"})]})]}),(0,x.jsxs)(Ee,{children:[(0,x.jsxs)(Se,{children:[(0,x.jsxs)(Be,{children:["Table ",i]}),(0,x.jsxs)("span",{style:{fontSize:"13px",color:"#6B7C93"},children:[q," ",1===q?"item":"items"]})]}),"new"===d&&(0,x.jsxs)(ze,{children:[(0,x.jsx)(Ie,{children:"Guests:"}),(0,x.jsxs)(Oe,{value:$,onChange:e=>E(Number(e.target.value)),children:[(0,x.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,x.jsx)("option",{value:e,children:e},e))]})]}),C.length>0?(0,x.jsx)(Ne,{children:(0,x.jsxs)(_e,{children:[(0,x.jsxs)(De,{children:[q," ",1===q?"item":"items"]}),C.map(e=>(0,x.jsxs)(Te,{children:[(0,x.jsxs)(Pe,{children:[(0,x.jsx)(Re,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,x.jsx)(Me,{children:e.options.join(", ")})]}),(0,x.jsxs)(He,{children:[(0,x.jsxs)(qe,{children:[(0,x.jsx)(We,{onClick:()=>R(e.id,-1),children:"-"}),(0,x.jsx)(Le,{children:e.quantity}),(0,x.jsx)(We,{onClick:()=>R(e.id,1),children:"+"})]}),(0,x.jsx)(Ue,{children:(0,l.vv)((e.menuItem.price+(e.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0))*e.quantity,u)}),(0,x.jsx)(Je,{onClick:()=>M(e.id),children:"\u2715"})]})]},e.id))]})}):(0,x.jsxs)(Ge,{children:[(0,x.jsx)("span",{style:{fontSize:"36px",opacity:.3},children:"\ud83d\udccb"}),(0,x.jsx)("span",{children:"No items in order"}),(0,x.jsx)("span",{style:{fontSize:"12px"},children:"Select menu items to start"})]}),(0,x.jsxs)(Ye,{children:[(0,x.jsxs)(Ze,{children:[(0,x.jsx)(Ke,{children:"Subtotal"}),(0,x.jsx)(Ve,{children:(0,l.vv)(D.subtotal,u)})]}),D.tax>0&&(0,x.jsxs)(Ze,{children:[(0,x.jsxs)(Ke,{children:["Tax (",D.taxRate,"%)"]}),(0,x.jsx)(Ve,{children:(0,l.vv)(D.tax,u)})]}),D.serviceCharge>0&&(0,x.jsxs)(Ze,{children:[(0,x.jsxs)(Ke,{children:["Service (",D.serviceChargeRate,"%)"]}),(0,x.jsx)(Ve,{children:(0,l.vv)(D.serviceCharge,u)})]}),(0,x.jsxs)(Qe,{children:[(0,x.jsx)(Ke,{children:"Total"}),(0,x.jsx)(Ve,{children:(0,l.vv)(D.total,u)})]})]}),(0,x.jsxs)(Xe,{children:[(0,x.jsx)(et,{$variant:"secondary",onClick:n,children:"Cancel"}),(0,x.jsx)(et,{$variant:"primary",onClick:H,disabled:0===C.length||S,children:S?"Submitting...":"new"===d?"Submit Order":"Add Items"})]})]})]})]})}),z&&O&&(0,x.jsx)(ae.A,{isOpen:z,onClose:()=>I(!1),menuItem:{id:String(O.id),name:O.name,price:O.price,emoji:O.emoji||"",image:O.image,optionGroups:O.optionGroups},onConfirm:(e,t,n)=>{T(O,e,t,n),I(!1)}})]}):null};var nt=n(8406),rt=n(3422);const it=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ot=i.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,at=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,st=i.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,dt=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,lt=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,ct=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,pt=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,xt=i.Ay.button`
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
`,ut=i.Ay.button`
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
`,ht=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,gt=i.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,bt=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,mt=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:i}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[h,g]=(0,r.useState)(!1),[b,m]=(0,r.useState)(""),[f,y]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[F,w]=(0,r.useState)("Asia/Kuala_Lumpur"),A=(0,r.useRef)(null),C=(0,r.useRef)(null),[k,$]=(0,r.useState)(null),[E,S]=(0,r.useState)(!1),[B,z]=(0,r.useState)(!1),[I,O]=(0,r.useState)("new");(0,r.useEffect)(()=>{const e=()=>{const e=new Date;m(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:F}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[F]);const N=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),_=(0,r.useCallback)(()=>{A.current&&clearTimeout(A.current),A.current=setTimeout(()=>N(),2e3)},[N]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),i=r.data||r;if(i.floor_plan&&c(i.floor_plan),i.currency&&j(i.currency),i.operation_settings){const e="string"===typeof i.operation_settings?JSON.parse(i.operation_settings):i.operation_settings;w((0,nt.ng)(e))}}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),N()},[t,N]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,rt.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),N()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>_()),e.on("order-created",()=>_()),e.on("order-items-added",()=>_()),e.on("new-order",()=>_()),C.current=e,()=>{e.disconnect(),C.current=null}},[t,N,_]),(0,r.useEffect)(()=>{const e=setInterval(()=>N(),3e4);return()=>clearInterval(e)},[N]);const D=k?p[k]:void 0,T=k?l.tables.find(e=>e.tableNumber===k):void 0;return f?(0,x.jsxs)(it,{children:[(0,x.jsx)(ot,{children:(0,x.jsx)(at,{children:(0,x.jsx)(st,{children:"Floor Plan"})})}),(0,x.jsx)(bt,{children:"Loading floor plan..."})]}):(0,x.jsxs)(it,{children:[(0,x.jsxs)(ot,{children:[(0,x.jsxs)(at,{children:[(0,x.jsx)(ut,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,x.jsx)(st,{children:"Floor Plan"}),(0,x.jsxs)(lt,{children:[(0,x.jsx)(dt,{$connected:h}),h?"Live":"Offline"]})]}),(0,x.jsxs)(ct,{children:[(0,x.jsx)(pt,{children:b}),"Restaurant Admin"===(null===i||void 0===i?void 0:i.role)&&(0,x.jsx)(xt,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,x.jsxs)(ht,{children:[(0,x.jsx)(gt,{children:(0,x.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{$(t=>t===e?null:e)},selectedTableId:k?null===(e=l.tables.find(e=>e.tableNumber===k))||void 0===e?void 0:e.id:null,currency:v})}),k&&(0,x.jsx)(Y,{tableNumber:k,statusInfo:D,tableInfo:T,currency:v,timezone:F,onClose:()=>$(null),onNewOrder:()=>{O("new"),z(!0)},onAddItems:()=>{O("add"),z(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await N()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{S(!0)},onNavigateToPOS:()=>{k&&n(`/restaurant/${t}/pos-terminal?table=${k}&from=floor-plan`)},onOrderUpdated:N})]}),(0,x.jsx)(ne,{tables:l.tables,tableStatuses:p,currency:v}),E&&D&&(0,x.jsx)(re.A,{isOpen:E,onClose:()=>S(!1),total:D.totalAmount||0,subtotal:D.subtotal||0,tax:D.tax||0,serviceCharge:D.serviceCharge||0,discountAmount:D.discount||0,onConfirmPayment:async(e,t,n,r,i)=>{if(!k)return;const o=p[k];if(null!==o&&void 0!==o&&o.orderId)try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({payment_method:e,payment_status:"completed",kitchen_ready:!0,points_used:r||0,point_discount:i||0})})).ok&&(S(!1),await N())}catch(a){console.error("Failed to process payment:",a)}},restaurantId:Number(t),customerId:D.customerId||void 0}),k&&(0,x.jsx)(tt,{isOpen:B,onClose:()=>z(!1),tableNumber:k,tableInfo:T,statusInfo:D,mode:I,restaurantId:Number(t),currency:v,onOrderComplete:()=>{z(!1),N()}})]})}}}]);