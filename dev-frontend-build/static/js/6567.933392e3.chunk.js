"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6567],{5783:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(9950),r=n(4752),o=n(7447),a=n(4414);const s=r.Ay.div`
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
`,l=r.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  letter-spacing: 0.3px;
  line-height: 1;
`,d=r.Ay.div`
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
`,p={kitchen:{bg:"#F3F4F6",border:"#9CA3AF",text:"#6B7280",borderStyle:"dashed"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"#D1FAE5",border:"#059669",text:"#065F46"}},x=i.memo(e=>{var t;let{table:n,status:i="available",isSelected:r=!1,isEditing:x=!1,onClick:u,onMouseDown:h,onTouchStart:g,statusInfo:b,currency:m=""}=e;const f=n.tableType||"table",y="table"!==f,v=y?p[f]||p.kitchen:x?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:o.Ez[i],j=y&&"dashed"===(null===(t=p[f])||void 0===t?void 0:t.borderStyle)?`2px dashed ${r?"#635BFF":v.border}`:`2.5px solid ${r?"#635BFF":v.border}`;return(0,a.jsxs)(s,{$x:n.x,$y:n.y,$w:n.width,$h:n.height,$shape:n.shape,$rotation:n.rotation,$bgColor:v.bg,$borderColor:v.border,$textColor:v.text,$isSelected:r,$isEditing:x,onClick:e=>{x||!u||y||(e.stopPropagation(),u(n.tableNumber))},onMouseDown:e=>{x&&h&&h(e,n.id)},onTouchStart:e=>{x&&g&&g(e,n.id)},style:y?{border:j,cursor:x?"grab":"default",opacity:x?1:.85}:void 0,children:[(0,a.jsx)(l,{$textColor:v.text,children:n.label||n.tableNumber}),!y&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d,{$textColor:v.text,children:!x&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${n.seats} seats`}),!x&&b&&"available"!==i&&(0,a.jsxs)(c,{$textColor:v.text,children:[m,b.totalAmount.toFixed(0)," \xb7 ",b.elapsedMinutes,"m"]})]})]})});x.displayName="TableNode";const u=x,h=r.Ay.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #F0F2F5;
  border-radius: 8px;
`,g=r.Ay.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  aspect-ratio: ${e=>e.$aspectRatio};
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
  touch-action: none;
`,b=r.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,m=r.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,f=r.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,y=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:r=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:l,onTableTouchStart:d,onCanvasClick:c,currency:p=""}=e;const x=(0,i.useRef)(null),y=(0,i.useRef)(null),[v,j]=(0,i.useState)(1),[w,F]=(0,i.useState)({x:0,y:0}),A=(0,i.useMemo)(()=>{if(r||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,i=-1/0,o=-1/0;for(const r of t.tables){const t=r.width/2,a=r.height/2;e=Math.min(e,r.x-t),n=Math.min(n,r.y-a),i=Math.max(i,r.x+t),o=Math.max(o,r.y+a)}const a=i-e,s=o-n,l=Math.max(.15*a,60),d=Math.max(.15*s,60),c=Math.max(0,e-l),p=Math.max(0,n-d);return{x:c,y:p,w:Math.min(t.canvasWidth-c,a+2*l),h:Math.min(t.canvasHeight-p,s+2*d)}},[t,r]),C=(0,i.useCallback)(()=>{if(!y.current)return;const e=y.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=A.w/e.width,n=A.h/e.height,i=Math.max(t,n);j(i);const r=A.w/i,o=A.h/i;F({x:(e.width-r)/2,y:(e.height-o)/2})},[A]);(0,i.useEffect)(()=>{C();const e=new ResizeObserver(()=>C());return y.current&&e.observe(y.current),()=>e.disconnect()},[C]);const $=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},k=`${A.w} / ${A.h}`;return(0,a.jsx)(h,{ref:x,children:(0,a.jsxs)(g,{ref:y,$aspectRatio:k,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[r&&t.showGrid&&(0,a.jsx)(b,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(m,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:r?0:w.x-A.x/v+"px",top:r?0:w.y-A.y/v+"px",width:r?`${t.canvasWidth}px`:`${A.w}px`,height:r?`${t.canvasHeight}px`:`${A.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(u,{table:e,status:$(e.tableNumber),isSelected:o===e.id,isEditing:r,onClick:s,onMouseDown:l,onTouchStart:d,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(f,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),r?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>r,Ez:()=>a,He:()=>i,Zt:()=>s,h_:()=>o});const i={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},r=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"kitchen",label:"Kitchen",defaultWidth:150,defaultHeight:60,icon:"K"},{type:"counter",label:"Counter",defaultWidth:120,defaultHeight:40,icon:"C"},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:40,icon:"E"}],a={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}},8948:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Qe});var i=n(9950),r=n(4752),o=n(4492),a=n(1367),s=n(7447),l=n(5783),d=n(6038),c=n(4414);const p=r.Ay.div`
  width: 340px;
  min-width: 340px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

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

  &:hover { background: #F3F4F6; }
`,b=r.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
  margin-top: 6px;
`,m=r.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F0F2F5;
`,f=r.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`,y=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,j=r.Ay.span`
  color: #374151;
  font-weight: 500;
`,w=r.Ay.span`
  color: #9CA3AF;
  font-size: 12px;
  margin-left: 4px;
`,F=r.Ay.span`
  color: #0A2540;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`,A=r.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 3px 0;
`,C=r.Ay.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`,$=r.Ay.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5046E5; }";case"success":return"background: #059669; color: white; &:hover { background: #047857; }";case"secondary":return"background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,k=r.Ay.div`
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
`,E={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed"},S=e=>{let{tableNumber:t,statusInfo:n,tableInfo:i,currency:r,onClose:o,onNewOrder:a,onAddItems:l,onStatusChange:S,onPayment:B,onNavigateToPOS:z}=e;const I=n&&"available"!==n.status,O=(null===n||void 0===n?void 0:n.orderStatus)||"",T=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(O),N=I?s.Ez[n.status]:s.Ez.available;return(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)("h3",{children:["Table ",t]}),(0,c.jsxs)(h,{children:[null!==n&&void 0!==n&&n.guestCount?(0,c.jsxs)("span",{children:[n.guestCount," guests"]}):i?(0,c.jsxs)("span",{children:[i.seats," seats"]}):null,I&&(0,c.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),(0,c.jsx)(b,{$color:N.text,$bg:N.bg,children:I?E[O]||n.status:"Available"})]}),(0,c.jsx)(g,{onClick:o,children:"\xd7"})]}),I?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(f,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,c.jsx)(y,{children:n.orderItems&&n.orderItems.length>0?n.orderItems.map((e,t)=>(0,c.jsxs)(v,{children:[(0,c.jsxs)("span",{children:[(0,c.jsx)(j,{children:e.name}),(0,c.jsxs)(w,{children:["x",e.quantity]})]}),(0,c.jsx)(F,{children:(0,d.vv)(e.price*e.quantity,r)})]},t)):(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{style:{color:"#9CA3AF"},children:"No items"}),(0,c.jsx)("span",{})]})})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,d.vv)(n.subtotal||0,r)})]}),(n.discount||0)>0&&(0,c.jsxs)(A,{children:[(0,c.jsx)("span",{children:"Discount"}),(0,c.jsxs)("span",{children:["-",(0,d.vv)(n.discount||0,r)]})]}),(n.tax||0)>0&&(0,c.jsxs)(A,{children:[(0,c.jsx)("span",{children:"Tax"}),(0,c.jsx)("span",{children:(0,d.vv)(n.tax||0,r)})]}),(n.serviceCharge||0)>0&&(0,c.jsxs)(A,{children:[(0,c.jsx)("span",{children:"Service Charge"}),(0,c.jsx)("span",{children:(0,d.vv)(n.serviceCharge||0,r)})]}),(0,c.jsxs)(A,{$bold:!0,children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,d.vv)(n.totalAmount,r)})]})]}),(0,c.jsxs)(C,{children:[T&&n.orderId&&(0,c.jsx)($,{$variant:"success",onClick:()=>S(n.orderId,T.status),children:T.label}),(0,c.jsx)($,{$variant:"primary",onClick:l,children:"+ Add Items"}),"pending"===n.paymentStatus&&(0,c.jsxs)($,{$variant:"secondary",onClick:B,children:["Payment ",(0,d.vv)(n.totalAmount,r)]}),(0,c.jsx)($,{$variant:"link",onClick:z,children:"Open in POS Terminal \u2197"})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,c.jsx)("p",{children:"This table is available"})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)($,{$variant:"primary",onClick:a,children:"+ New Order"}),(0,c.jsx)($,{$variant:"link",onClick:z,children:"Open in POS Terminal \u2197"})]})]})]})},B=r.Ay.div`
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
`,z=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,O=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,T=r.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,N=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,D=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,R=e=>{let{tables:t,tableStatuses:n,currency:i}=e;const r=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,l=0,p=0;t.forEach(e=>{const t=n[e.tableNumber],i=(null===t||void 0===t?void 0:t.status)||"available";o[i]++,"available"!==i&&t&&(a+=t.totalAmount,l+=t.elapsedMinutes,p++)});const x=p>0?Math.round(l/p):0;return(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{children:Object.keys(s.Ez).map(e=>(0,c.jsxs)(I,{children:[(0,c.jsx)(O,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,c.jsx)(T,{}),(0,c.jsxs)(N,{children:[(0,c.jsxs)(D,{children:["Tables: ",(0,c.jsx)("span",{children:r})]}),(0,c.jsxs)(D,{children:["Avail: ",(0,c.jsx)("span",{children:o.available})]}),(0,c.jsxs)(D,{children:["Occupied: ",(0,c.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,c.jsxs)(D,{children:["Ready: ",(0,c.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,c.jsxs)(D,{children:["Attn: ",(0,c.jsx)("span",{children:o["needs-attention"]})]}),(0,c.jsx)(T,{}),(0,c.jsxs)(D,{children:["Today: ",(0,c.jsx)("span",{children:(0,d.vv)(a,i)})]}),x>0&&(0,c.jsxs)(D,{children:["Avg: ",(0,c.jsxs)("span",{children:[x,"min"]})]})]})]})};var _=n(2966),M=n(8930),P=n(9018),H=n(447),q=n(9189);const W=r.Ay.div`
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
`,G=r.Ay.div`
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
`,L=r.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Y=r.Ay.div`
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
`,J=r.Ay.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover { background: #F3F4F6; color: #0A2540; }
`,Z=r.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,K=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`,U=r.Ay.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
`,V=r.Ay.input`
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
`,Q=r.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`,X=r.Ay.button`
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
`,ee=r.Ay.div`
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
`,te=r.Ay.div`
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
`,ne=r.Ay.div`
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
`,ie=r.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,re=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,oe=r.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,ae=r.Ay.button`
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
`,se=r.Ay.div`
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
`,le=r.Ay.div`
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
`,de=r.Ay.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9CA3AF;
  font-size: 14px;
`,ce=r.Ay.div`
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
`,pe=r.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,xe=r.Ay.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`,ue=r.Ay.div`
  padding: 12px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,he=r.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,ge=r.Ay.select`
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
`,be=r.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 2px; }
`,me=r.Ay.div`
  padding: 16px 24px;
`,fe=r.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,ye=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,ve=r.Ay.div`
  flex: 1;
`,je=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,we=r.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,Fe=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Ae=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ce=r.Ay.button`
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
`,$e=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,ke=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ee=r.Ay.button`
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
`,Se=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
  padding: 40px;
`,Be=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,ze=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child { margin-bottom: 0; }
`,Ie=r.Ay.span`
  color: #6B7C93;
`,Oe=r.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Te=(0,r.Ay)(ze)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;

  ${Ie} { color: #0A2540; }
  ${Oe} { color: #635BFF; }
`,Ne=r.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,De=r.Ay.button`
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
`,Re=e=>{let{isOpen:t,onClose:n,tableNumber:r,tableInfo:o,statusInfo:s,mode:l,restaurantId:p,currency:x,onOrderComplete:u}=e;const{categories:h,menuItems:g,getItemsByCategory:b}=(0,M.b)(),{operationSettings:m}=(0,P.Pj)(),{addOrder:f}=(0,H.h)(),{user:y}=(0,a.As)(),[v,j]=(0,i.useState)(null),[w,F]=(0,i.useState)(""),[A,C]=(0,i.useState)([]),[$,k]=(0,i.useState)((null===s||void 0===s?void 0:s.guestCount)||0),[E,S]=(0,i.useState)(!1),[B,z]=(0,i.useState)(!1),[I,O]=(0,i.useState)(null);(0,i.useEffect)(()=>{h.length>0&&!v&&j(h[0].id)},[h,v]),(0,i.useEffect)(()=>{t&&(C([]),F(""),k((null===s||void 0===s?void 0:s.guestCount)||0),S(!1),h.length>0&&j(h[0].id))},[t,s,h]);const T=(0,i.useMemo)(()=>w.trim()?g.filter(e=>e.name.toLowerCase().includes(w.toLowerCase())):v?b(v):g,[w,v,g,b]),N=(0,i.useMemo)(()=>{const e=A.reduce((e,t)=>{const n=(t.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0);return e+(t.menuItem.price+n)*t.quantity},0),t=null!==m&&void 0!==m&&m.taxEnabled&&m.taxRate||0,n=null!==m&&void 0!==m&&m.serviceChargeEnabled&&m.serviceChargeRate||0,i=e*(t/100),r=e*(n/100);return{subtotal:e,tax:i,serviceCharge:r,total:e+i+r,taxRate:t,serviceChargeRate:n}},[A,m]),D=(0,i.useCallback)((e,t,n,i)=>{const r=`${e.id}_${Date.now()}`;C(o=>[...o,{id:r,menuItem:{id:String(e.id),name:e.name,price:e.price,emoji:e.emoji||"",image:e.image,is_set_menu:e.is_set_menu,set_items:e.set_items},quantity:t,options:n,selectedOptionsData:i}])},[]),R=(0,i.useCallback)(e=>{e.soldOut||(e.optionGroups&&e.optionGroups.length>0?(O(e),z(!0)):D(e,1,[]))},[D]),_=(0,i.useCallback)((e,t)=>{C(n=>n.map(n=>{if(n.id===e){const e=n.quantity+t;return e<=0?null:{...n,quantity:e}}return n}).filter(Boolean))},[]),Re=(0,i.useCallback)(e=>{C(t=>t.filter(t=>t.id!==e))},[]),_e="new"===l?async()=>{if(0!==A.length&&!E){S(!0);try{const e={id:`fp-${Date.now()}`,orderNumber:"",customer:{name:"Walk-in Customer",phone:""},items:A.map(e=>({id:e.id,menuItem:e.menuItem,quantity:e.quantity,options:e.options})),status:"pending",createdAt:(new Date).toISOString(),subtotal:N.subtotal,tax:N.tax,discount:0,total:N.total,paymentMethod:"",paymentStatus:"pending",orderType:"dine-in",orderSource:"pos",tableNumber:r,guest_count:$||null,serviceCharge:N.serviceCharge,serviceChargeRate:N.serviceChargeRate,taxRate:N.taxRate,cashier_id:(null===y||void 0===y?void 0:y.id)||null,cashier_name:(null===y||void 0===y?void 0:y.name)||(null===y||void 0===y?void 0:y.full_name)||null};await f(e,p),u()}catch(e){console.error("Failed to create order:",e)}finally{S(!1)}}}:async()=>{if(0!==A.length&&!E&&null!==s&&void 0!==s&&s.orderId){S(!0);try{const e=localStorage.getItem("auth_token"),t=A.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:e.options||[]}));(await fetch(`/api/orders/${s.orderId}/add-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t})})).ok&&u()}catch(e){console.error("Failed to add items:",e)}finally{S(!1)}}},Me=A.reduce((e,t)=>e+t.quantity,0);return t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{$isOpen:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,c.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(L,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsxs)("h2",{children:["new"===l?"New Order":"Add Items"," \u2014 Table ",r]}),(0,c.jsxs)("span",{children:[o?`${o.seats} seats`:"","add"===l&&null!==s&&void 0!==s&&s.orderNumber?` \xb7 Order ${s.orderNumber}`:""]})]}),(0,c.jsx)(J,{onClick:n,children:"\xd7"})]}),(0,c.jsxs)(Z,{children:[(0,c.jsxs)(K,{children:[(0,c.jsx)(U,{children:(0,c.jsx)(V,{placeholder:"Search menu...",value:w,onChange:e=>F(e.target.value)})}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{$active:!v,onClick:()=>{j(null),F("")},children:"All"}),h.map(e=>(0,c.jsxs)(X,{$active:v===e.id,onClick:()=>{j(e.id),F("")},children:[e.emoji," ",e.name]},e.id))]}),(0,c.jsxs)(ee,{children:[T.map(e=>(0,c.jsxs)(te,{$soldOut:e.soldOut,onClick:()=>R(e),children:[e.is_set_menu&&(0,c.jsx)(le,{children:"SET"}),(0,c.jsx)(ne,{$hasImage:!!e.image,children:e.image?(0,c.jsx)("img",{src:e.image,alt:e.name}):e.emoji}),(0,c.jsx)(ie,{children:e.name}),(0,c.jsx)(re,{children:(0,d.vv)(e.price,x)}),(0,c.jsx)(oe,{children:(0,c.jsx)(ae,{onClick:t=>{t.stopPropagation(),R(e)},children:"+ Add"})}),e.soldOut&&(0,c.jsx)(se,{children:"SOLD OUT"})]},e.id)),0===T.length&&(0,c.jsx)(de,{children:"No items found"})]})]}),(0,c.jsxs)(ce,{children:[(0,c.jsxs)(pe,{children:[(0,c.jsxs)(xe,{children:["Table ",r]}),(0,c.jsxs)("span",{style:{fontSize:"13px",color:"#6B7C93"},children:[Me," ",1===Me?"item":"items"]})]}),"new"===l&&(0,c.jsxs)(ue,{children:[(0,c.jsx)(he,{children:"Guests:"}),(0,c.jsxs)(ge,{value:$,onChange:e=>k(Number(e.target.value)),children:[(0,c.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,c.jsx)("option",{value:e,children:e},e))]})]}),A.length>0?(0,c.jsx)(be,{children:(0,c.jsxs)(me,{children:[(0,c.jsxs)(fe,{children:[Me," ",1===Me?"item":"items"]}),A.map(e=>(0,c.jsxs)(ye,{children:[(0,c.jsxs)(ve,{children:[(0,c.jsx)(je,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,c.jsx)(we,{children:e.options.join(", ")})]}),(0,c.jsxs)(Fe,{children:[(0,c.jsxs)(Ae,{children:[(0,c.jsx)(Ce,{onClick:()=>_(e.id,-1),children:"-"}),(0,c.jsx)($e,{children:e.quantity}),(0,c.jsx)(Ce,{onClick:()=>_(e.id,1),children:"+"})]}),(0,c.jsx)(ke,{children:(0,d.vv)((e.menuItem.price+(e.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0))*e.quantity,x)}),(0,c.jsx)(Ee,{onClick:()=>Re(e.id),children:"\u2715"})]})]},e.id))]})}):(0,c.jsxs)(Se,{children:[(0,c.jsx)("span",{style:{fontSize:"36px",opacity:.3},children:"\ud83d\udccb"}),(0,c.jsx)("span",{children:"No items in order"}),(0,c.jsx)("span",{style:{fontSize:"12px"},children:"Select menu items to start"})]}),(0,c.jsxs)(Be,{children:[(0,c.jsxs)(ze,{children:[(0,c.jsx)(Ie,{children:"Subtotal"}),(0,c.jsx)(Oe,{children:(0,d.vv)(N.subtotal,x)})]}),N.tax>0&&(0,c.jsxs)(ze,{children:[(0,c.jsxs)(Ie,{children:["Tax (",N.taxRate,"%)"]}),(0,c.jsx)(Oe,{children:(0,d.vv)(N.tax,x)})]}),N.serviceCharge>0&&(0,c.jsxs)(ze,{children:[(0,c.jsxs)(Ie,{children:["Service (",N.serviceChargeRate,"%)"]}),(0,c.jsx)(Oe,{children:(0,d.vv)(N.serviceCharge,x)})]}),(0,c.jsxs)(Te,{children:[(0,c.jsx)(Ie,{children:"Total"}),(0,c.jsx)(Oe,{children:(0,d.vv)(N.total,x)})]})]}),(0,c.jsxs)(Ne,{children:[(0,c.jsx)(De,{$variant:"secondary",onClick:n,children:"Cancel"}),(0,c.jsx)(De,{$variant:"primary",onClick:_e,disabled:0===A.length||E,children:E?"Submitting...":"new"===l?"Submit Order":"Add Items"})]})]})]})]})}),B&&I&&(0,c.jsx)(q.A,{isOpen:B,onClose:()=>z(!1),menuItem:{id:String(I.id),name:I.name,price:I.price,emoji:I.emoji||"",image:I.image,optionGroups:I.optionGroups},onConfirm:(e,t,n)=>{D(I,e,t,n),z(!1)}})]}):null};var _e=n(3422);const Me=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Pe=r.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,He=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,qe=r.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,We=r.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,Ge=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,Le=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Ye=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,Je=r.Ay.button`
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
`,Ze=r.Ay.button`
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
`,Ke=r.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,Ue=r.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Ve=r.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,Qe=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:r}=(0,a.As)(),[d,p]=(0,i.useState)(s.He),[x,u]=(0,i.useState)({}),[h,g]=(0,i.useState)(!1),[b,m]=(0,i.useState)(""),[f,y]=(0,i.useState)(!0),[v,j]=(0,i.useState)(""),w=(0,i.useRef)(null),F=(0,i.useRef)(null),[A,C]=(0,i.useState)(null),[$,k]=(0,i.useState)(!1),[E,B]=(0,i.useState)(!1),[z,I]=(0,i.useState)("new");(0,i.useEffect)(()=>{const e=()=>{const e=new Date;m(e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[]);const O=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),T=(0,i.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>O(),2e3)},[O]);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const i=await n.json(),r=i.data||i;r.floor_plan&&p(r.floor_plan),r.currency&&j(r.currency)}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),O()},[t,O]),(0,i.useEffect)(()=>{if(!t)return;const e=(0,_e.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),O()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>T()),e.on("order-created",()=>T()),e.on("order-items-added",()=>T()),e.on("new-order",()=>T()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,O,T]),(0,i.useEffect)(()=>{const e=setInterval(()=>O(),3e4);return()=>clearInterval(e)},[O]);const N=A?x[A]:void 0,D=A?d.tables.find(e=>e.tableNumber===A):void 0;return f?(0,c.jsxs)(Me,{children:[(0,c.jsx)(Pe,{children:(0,c.jsx)(He,{children:(0,c.jsx)(qe,{children:"Floor Plan"})})}),(0,c.jsx)(Ve,{children:"Loading floor plan..."})]}):(0,c.jsxs)(Me,{children:[(0,c.jsxs)(Pe,{children:[(0,c.jsxs)(He,{children:[(0,c.jsx)(Ze,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,c.jsx)(qe,{children:"Floor Plan"}),(0,c.jsxs)(Ge,{children:[(0,c.jsx)(We,{$connected:h}),h?"Live":"Offline"]})]}),(0,c.jsxs)(Le,{children:[(0,c.jsx)(Ye,{children:b}),"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(0,c.jsx)(Je,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,c.jsxs)(Ke,{children:[(0,c.jsx)(Ue,{children:(0,c.jsx)(l.A,{floorPlan:d,tableStatuses:x,onTableClick:e=>{C(t=>t===e?null:e)},selectedTableId:A?null===(e=d.tables.find(e=>e.tableNumber===A))||void 0===e?void 0:e.id:null,currency:v})}),A&&(0,c.jsx)(S,{tableNumber:A,statusInfo:N,tableInfo:D,currency:v,onClose:()=>C(null),onNewOrder:()=>{I("new"),B(!0)},onAddItems:()=>{I("add"),B(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await O()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{k(!0)},onNavigateToPOS:()=>{A&&n(`/restaurant/${t}/pos-terminal?table=${A}&from=floor-plan`)}})]}),(0,c.jsx)(R,{tables:d.tables,tableStatuses:x,currency:v}),$&&N&&(0,c.jsx)(_.A,{isOpen:$,onClose:()=>k(!1),total:N.totalAmount||0,subtotal:N.subtotal||0,tax:N.tax||0,serviceCharge:N.serviceCharge||0,discountAmount:N.discount||0,onConfirmPayment:async(e,t,n,i,r)=>{if(!A)return;const o=x[A];if(null!==o&&void 0!==o&&o.orderId)try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({payment_method:e,payment_status:"completed",kitchen_ready:!0,points_used:i||0,point_discount:r||0})})).ok&&(k(!1),await O())}catch(a){console.error("Failed to process payment:",a)}},restaurantId:Number(t),customerId:N.customerId||void 0}),A&&(0,c.jsx)(Re,{isOpen:E,onClose:()=>B(!1),tableNumber:A,tableInfo:D,statusInfo:N,mode:z,restaurantId:Number(t),currency:v,onOrderComplete:()=>{B(!1),O()}})]})}}}]);