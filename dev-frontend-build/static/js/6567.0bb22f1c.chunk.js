"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6567],{5783:(e,t,n)=>{n.d(t,{A:()=>f});var i=n(9950),o=n(4752),r=n(7447),a=n(4414);const s=o.Ay.div`
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
`,l=o.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  letter-spacing: 0.3px;
  line-height: 1;
`,d=o.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,c=o.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,p=i.memo(e=>{let{table:t,status:n="available",isSelected:i=!1,isEditing:o=!1,onClick:p,onMouseDown:x,onTouchStart:u,statusInfo:h,currency:g=""}=e;const b=o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[n];return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:t.shape,$rotation:t.rotation,$bgColor:b.bg,$borderColor:b.border,$textColor:b.text,$isSelected:i,$isEditing:o,onClick:e=>{!o&&p&&(e.stopPropagation(),p(t.tableNumber))},onMouseDown:e=>{o&&x&&x(e,t.id)},onTouchStart:e=>{o&&u&&u(e,t.id)},children:[(0,a.jsx)(l,{$textColor:b.text,children:t.label||t.tableNumber}),(0,a.jsx)(d,{$textColor:b.text,children:!o&&null!==h&&void 0!==h&&h.guestCount?`${h.guestCount} guests`:`${t.seats} seats`}),!o&&h&&"available"!==n&&(0,a.jsxs)(c,{$textColor:b.text,children:[g,h.totalAmount.toFixed(0)," \xb7 ",h.elapsedMinutes,"m"]})]})});p.displayName="TableNode";const x=p,u=o.Ay.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #F0F2F5;
  border-radius: 8px;
`,h=o.Ay.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  aspect-ratio: ${e=>e.$aspectRatio};
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
  touch-action: none;
`,g=o.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scaleX}px ${e=>e.$gridSize/e.$scaleY}px;
  opacity: 0.5;
`,b=o.Ay.div`
  position: absolute;
  inset: 0;
  transform-origin: 0 0;
`,m=o.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,f=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:o=!1,selectedTableId:r,onTableClick:s,onTableMouseDown:l,onTableTouchStart:d,onCanvasClick:c,currency:p=""}=e;const f=(0,i.useRef)(null),y=(0,i.useRef)(null),[v,j]=(0,i.useState)({x:1,y:1}),w=(0,i.useCallback)(()=>{if(!y.current)return;const e=y.current.getBoundingClientRect();j({x:t.canvasWidth/e.width,y:t.canvasHeight/e.height})},[t.canvasWidth,t.canvasHeight]);(0,i.useEffect)(()=>{w();const e=new ResizeObserver(()=>w());return y.current&&e.observe(y.current),()=>e.disconnect()},[w]);const A=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},$=`${t.canvasWidth} / ${t.canvasHeight}`;return(0,a.jsx)(u,{ref:f,children:(0,a.jsxs)(h,{ref:y,$aspectRatio:$,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[t.showGrid&&(0,a.jsx)(g,{$gridSize:t.gridSize,$scaleX:v.x,$scaleY:v.y}),(0,a.jsx)(b,{"data-scaled-layer":!0,style:{transform:`scale(${1/v.x}, ${1/v.y})`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(x,{table:e,status:A(e.tableNumber),isSelected:r===e.id,isEditing:o,onClick:s,onMouseDown:l,onTouchStart:d,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(m,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>o,Ez:()=>r,He:()=>i,Zt:()=>a});const i={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rectangle",defaultWidth:110,defaultHeight:70}],r={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},a={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}},8948:(e,t,n)=>{n.r(t),n.d(t,{default:()=>qe});var i=n(9950),o=n(4752),r=n(4492),a=n(1367),s=n(7447),l=n(5783),d=n(6038),c=n(4414);const p=o.Ay.div`
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
`,x=o.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,u=o.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,h=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,g=o.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;

  &:hover { background: #F3F4F6; }
`,b=o.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
  margin-top: 6px;
`,m=o.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F0F2F5;
`,f=o.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`,y=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,j=o.Ay.span`
  color: #374151;
  font-weight: 500;
`,w=o.Ay.span`
  color: #9CA3AF;
  font-size: 12px;
  margin-left: 4px;
`,A=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`,$=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 3px 0;
`,C=o.Ay.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`,F=o.Ay.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5046E5; }";case"success":return"background: #059669; color: white; &:hover { background: #047857; }";case"secondary":return"background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,k=o.Ay.div`
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
`,S={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed"},E=e=>{let{tableNumber:t,statusInfo:n,tableInfo:i,currency:o,onClose:r,onNewOrder:a,onAddItems:l,onStatusChange:E,onPayment:z,onNavigateToPOS:B}=e;const I=n&&"available"!==n.status,O=(null===n||void 0===n?void 0:n.orderStatus)||"",T=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(O),N=I?s.Ez[n.status]:s.Ez.available;return(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)("h3",{children:["Table ",t]}),(0,c.jsxs)(h,{children:[null!==n&&void 0!==n&&n.guestCount?(0,c.jsxs)("span",{children:[n.guestCount," guests"]}):i?(0,c.jsxs)("span",{children:[i.seats," seats"]}):null,I&&(0,c.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),(0,c.jsx)(b,{$color:N.text,$bg:N.bg,children:I?S[O]||n.status:"Available"})]}),(0,c.jsx)(g,{onClick:r,children:"\xd7"})]}),I?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(f,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,c.jsx)(y,{children:n.orderItems&&n.orderItems.length>0?n.orderItems.map((e,t)=>(0,c.jsxs)(v,{children:[(0,c.jsxs)("span",{children:[(0,c.jsx)(j,{children:e.name}),(0,c.jsxs)(w,{children:["x",e.quantity]})]}),(0,c.jsx)(A,{children:(0,d.vv)(e.price*e.quantity,o)})]},t)):(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{style:{color:"#9CA3AF"},children:"No items"}),(0,c.jsx)("span",{})]})})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,d.vv)(n.subtotal||0,o)})]}),(n.discount||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)("span",{children:"Discount"}),(0,c.jsxs)("span",{children:["-",(0,d.vv)(n.discount||0,o)]})]}),(n.tax||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)("span",{children:"Tax"}),(0,c.jsx)("span",{children:(0,d.vv)(n.tax||0,o)})]}),(n.serviceCharge||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)("span",{children:"Service Charge"}),(0,c.jsx)("span",{children:(0,d.vv)(n.serviceCharge||0,o)})]}),(0,c.jsxs)($,{$bold:!0,children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,d.vv)(n.totalAmount,o)})]})]}),(0,c.jsxs)(C,{children:[T&&n.orderId&&(0,c.jsx)(F,{$variant:"success",onClick:()=>E(n.orderId,T.status),children:T.label}),(0,c.jsx)(F,{$variant:"primary",onClick:l,children:"+ Add Items"}),"pending"===n.paymentStatus&&(0,c.jsxs)(F,{$variant:"secondary",onClick:z,children:["Payment ",(0,d.vv)(n.totalAmount,o)]}),(0,c.jsx)(F,{$variant:"link",onClick:B,children:"Open in POS Terminal \u2197"})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,c.jsx)("p",{children:"This table is available"})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)(F,{$variant:"primary",onClick:a,children:"+ New Order"}),(0,c.jsx)(F,{$variant:"link",onClick:B,children:"Open in POS Terminal \u2197"})]})]})]})},z=o.Ay.div`
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
`,B=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,I=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,O=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,T=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,N=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,R=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,D=e=>{let{tables:t,tableStatuses:n,currency:i}=e;const o=t.length,r={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,l=0,p=0;t.forEach(e=>{const t=n[e.tableNumber],i=(null===t||void 0===t?void 0:t.status)||"available";r[i]++,"available"!==i&&t&&(a+=t.totalAmount,l+=t.elapsedMinutes,p++)});const x=p>0?Math.round(l/p):0;return(0,c.jsxs)(z,{children:[(0,c.jsx)(B,{children:Object.keys(s.Ez).map(e=>(0,c.jsxs)(I,{children:[(0,c.jsx)(O,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,c.jsx)(T,{}),(0,c.jsxs)(N,{children:[(0,c.jsxs)(R,{children:["Tables: ",(0,c.jsx)("span",{children:o})]}),(0,c.jsxs)(R,{children:["Avail: ",(0,c.jsx)("span",{children:r.available})]}),(0,c.jsxs)(R,{children:["Occupied: ",(0,c.jsx)("span",{children:r.occupied})]}),r.ready>0&&(0,c.jsxs)(R,{children:["Ready: ",(0,c.jsx)("span",{children:r.ready})]}),r["needs-attention"]>0&&(0,c.jsxs)(R,{children:["Attn: ",(0,c.jsx)("span",{children:r["needs-attention"]})]}),(0,c.jsx)(T,{}),(0,c.jsxs)(R,{children:["Today: ",(0,c.jsx)("span",{children:(0,d.vv)(a,i)})]}),x>0&&(0,c.jsxs)(R,{children:["Avg: ",(0,c.jsxs)("span",{children:[x,"min"]})]})]})]})};var _=n(2966),P=n(8930),q=n(9018),M=n(447),H=n(9189);const W=o.Ay.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: ${e=>e.$isOpen?"flex":"none"};
  background: rgba(0, 0, 0, 0.5);
  align-items: stretch;
  justify-content: center;
  padding: 24px;

  @media (max-width: 768px) {
    padding: 0;
  }
`,G=o.Ay.div`
  width: 100%;
  max-width: 1100px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
    max-width: 100%;
  }
`,L=o.Ay.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,J=o.Ay.div`
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
  span {
    font-size: 12px;
    color: #6B7C93;
    font-weight: 500;
  }
`,Z=o.Ay.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  &:hover { background: #F3F4F6; }
`,U=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,X=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #E6EBF1;
  min-width: 0;
`,Y=o.Ay.div`
  padding: 12px 16px;
  border-bottom: 1px solid #F0F2F5;
`,K=o.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; }
  &::placeholder { color: #9CA3AF; }
`,Q=o.Ay.div`
  display: flex;
  gap: 0;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  flex-shrink: 0;

  &::-webkit-scrollbar { display: none; }
`,V=o.Ay.button`
  padding: 10px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${e=>e.$active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  border-bottom: 2px solid ${e=>e.$active?"#635BFF":"transparent"};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;

  &:hover { color: #374151; }
`,ee=o.Ay.div`
  flex: 1;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  overflow-y: auto;
  align-content: start;
`,te=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px;
  cursor: ${e=>e.$soldOut?"not-allowed":"pointer"};
  opacity: ${e=>e.$soldOut?.5:1};
  transition: all 0.15s;
  text-align: center;
  position: relative;

  &:hover {
    ${e=>!e.$soldOut&&"border-color: #635BFF; box-shadow: 0 2px 8px rgba(99,91,255,0.1);"}
  }
`,ne=o.Ay.div`
  font-size: ${e=>e.$hasImage?"0":"28px"};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  overflow: hidden;
  border-radius: 6px;

  img {
    width: 100%;
    height: 48px;
    object-fit: cover;
    border-radius: 6px;
  }
`,ie=o.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,oe=o.Ay.div`
  font-size: 11px;
  font-weight: 700;
  color: #635BFF;
  margin-top: 3px;
`,re=o.Ay.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FF6B6B;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 9px;
  font-weight: 700;
`,ae=o.Ay.div`
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    display: none;
  }
`,se=o.Ay.div`
  padding: 12px 16px;
  border-bottom: 1px solid #E6EBF1;
  font-size: 13px;
  font-weight: 700;
  color: #0A2540;
`,le=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`,de=o.Ay.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #F8F9FA;
`,ce=o.Ay.div`
  flex: 1;
  min-width: 0;
`,pe=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,xe=o.Ay.div`
  font-size: 10px;
  color: #9CA3AF;
  margin-top: 1px;
`,ue=o.Ay.div`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,he=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,ge=o.Ay.button`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #E6EBF1;
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #F3F4F6; }
`,be=o.Ay.span`
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,me=o.Ay.div`
  padding: 12px 16px;
  border-top: 1px solid #E6EBF1;
  background: #FAFBFC;
`,fe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,ye=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-top: 1px solid #E6EBF1;
`,ve=o.Ay.span`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,je=o.Ay.select`
  padding: 4px 8px;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; }
`,we=o.Ay.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`,Ae=o.Ay.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.15s;

  ${e=>"primary"===e.$variant?"background: #635BFF; color: white; &:hover { background: #5046E5; }":"background: #059669; color: white; &:hover { background: #047857; }"}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,$e=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 13px;
`,Ce=e=>{let{isOpen:t,onClose:n,tableNumber:o,tableInfo:r,statusInfo:s,mode:l,restaurantId:p,currency:x,onOrderComplete:u}=e;const{categories:h,menuItems:g,getItemsByCategory:b}=(0,P.b)(),{operationSettings:m}=(0,q.Pj)(),{addOrder:f}=(0,M.h)(),{user:y}=(0,a.As)(),[v,j]=(0,i.useState)(null),[w,A]=(0,i.useState)(""),[$,C]=(0,i.useState)([]),[F,k]=(0,i.useState)((null===s||void 0===s?void 0:s.guestCount)||0),[S,E]=(0,i.useState)(!1),[z,B]=(0,i.useState)(!1),[I,O]=(0,i.useState)(null);(0,i.useEffect)(()=>{h.length>0&&!v&&j(h[0].id)},[h,v]),(0,i.useEffect)(()=>{t&&(C([]),A(""),k((null===s||void 0===s?void 0:s.guestCount)||0),E(!1),h.length>0&&j(h[0].id))},[t,s,h]);const T=(0,i.useMemo)(()=>w.trim()?g.filter(e=>e.name.toLowerCase().includes(w.toLowerCase())):v?b(v):g,[w,v,g,b]),N=(0,i.useMemo)(()=>{const e=$.reduce((e,t)=>{const n=(t.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0);return e+(t.menuItem.price+n)*t.quantity},0),t=null!==m&&void 0!==m&&m.taxEnabled&&m.taxRate||0,n=null!==m&&void 0!==m&&m.serviceChargeEnabled&&m.serviceChargeRate||0,i=e*(t/100),o=e*(n/100);return{subtotal:e,tax:i,serviceCharge:o,total:e+i+o,taxRate:t,serviceChargeRate:n}},[$,m]),R=(0,i.useCallback)((e,t,n,i)=>{const o=`${e.id}_${Date.now()}`;C(r=>[...r,{id:o,menuItem:{id:String(e.id),name:e.name,price:e.price,emoji:e.emoji||"",image:e.image,is_set_menu:e.is_set_menu,set_items:e.set_items},quantity:t,options:n,selectedOptionsData:i}])},[]),D=(0,i.useCallback)(e=>{e.soldOut||(e.optionGroups&&e.optionGroups.length>0?(O(e),B(!0)):R(e,1,[]))},[R]),_=(0,i.useCallback)((e,t)=>{C(n=>n.map(n=>{if(n.id===e){const e=n.quantity+t;return e<=0?null:{...n,quantity:e}}return n}).filter(Boolean))},[]),Ce="new"===l?async()=>{if(0!==$.length&&!S){E(!0);try{const e={id:`fp-${Date.now()}`,orderNumber:"",customer:{name:"Walk-in Customer",phone:""},items:$.map(e=>({id:e.id,menuItem:e.menuItem,quantity:e.quantity,options:e.options})),status:"pending",createdAt:(new Date).toISOString(),subtotal:N.subtotal,tax:N.tax,discount:0,total:N.total,paymentMethod:"",paymentStatus:"pending",orderType:"dine-in",orderSource:"pos",tableNumber:o,guest_count:F||null,serviceCharge:N.serviceCharge,serviceChargeRate:N.serviceChargeRate,taxRate:N.taxRate,cashier_id:(null===y||void 0===y?void 0:y.id)||null,cashier_name:(null===y||void 0===y?void 0:y.name)||(null===y||void 0===y?void 0:y.full_name)||null};await f(e,p),u()}catch(e){console.error("Failed to create order:",e)}finally{E(!1)}}}:async()=>{if(0!==$.length&&!S&&null!==s&&void 0!==s&&s.orderId){E(!0);try{const e=localStorage.getItem("auth_token"),t=$.map(e=>({name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price,options:e.options||[]}));(await fetch(`/api/orders/${s.orderId}/add-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t})})).ok&&u()}catch(e){console.error("Failed to add items:",e)}finally{E(!1)}}};return t?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(W,{$isOpen:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,c.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(L,{children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)("h2",{children:["new"===l?"New Order":"Add Items"," \u2014 Table ",o]}),(0,c.jsxs)("span",{children:[r?`${r.seats} seats`:"","add"===l&&null!==s&&void 0!==s&&s.orderNumber?` \xb7 Order ${s.orderNumber}`:""]})]}),(0,c.jsx)(Z,{onClick:n,children:"\xd7"})]}),(0,c.jsxs)(U,{children:[(0,c.jsxs)(X,{children:[(0,c.jsx)(Y,{children:(0,c.jsx)(K,{placeholder:"Search menu...",value:w,onChange:e=>A(e.target.value)})}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{$active:!v||"all"===v,onClick:()=>j(null),children:"All"}),h.map(e=>(0,c.jsxs)(V,{$active:v===e.id,onClick:()=>{j(e.id),A("")},children:[e.emoji," ",e.name]},e.id))]}),(0,c.jsxs)(ee,{children:[T.map(e=>(0,c.jsxs)(te,{$soldOut:e.soldOut,onClick:()=>D(e),children:[(0,c.jsx)(ne,{$hasImage:!!e.image,children:e.image?(0,c.jsx)("img",{src:e.image,alt:e.name}):e.emoji}),(0,c.jsx)(ie,{children:e.name}),(0,c.jsx)(oe,{children:(0,d.vv)(e.price,x)}),e.soldOut&&(0,c.jsx)(re,{children:"SOLD OUT"})]},e.id)),0===T.length&&(0,c.jsx)("div",{style:{gridColumn:"1/-1",textAlign:"center",padding:"40px",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]})]}),(0,c.jsxs)(ae,{children:[(0,c.jsxs)(se,{children:["Cart (",$.reduce((e,t)=>e+t.quantity,0)," items)"]}),$.length>0?(0,c.jsx)(le,{children:$.map(e=>(0,c.jsxs)(de,{children:[(0,c.jsxs)(ce,{children:[(0,c.jsx)(pe,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,c.jsx)(xe,{children:e.options.join(", ")})]}),(0,c.jsxs)(he,{children:[(0,c.jsx)(ge,{onClick:()=>_(e.id,-1),children:"-"}),(0,c.jsx)(be,{children:e.quantity}),(0,c.jsx)(ge,{onClick:()=>_(e.id,1),children:"+"})]}),(0,c.jsx)(ue,{children:(0,d.vv)((e.menuItem.price+(e.selectedOptionsData||[]).reduce((e,t)=>e+t.price,0))*e.quantity,x)})]},e.id))}):(0,c.jsx)($e,{children:"Add items from the menu"}),"new"===l&&(0,c.jsxs)(ye,{children:[(0,c.jsx)(ve,{children:"Guests:"}),(0,c.jsxs)(je,{value:F,onChange:e=>k(Number(e.target.value)),children:[(0,c.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,c.jsx)("option",{value:e,children:e},e))]})]}),(0,c.jsxs)(me,{children:[(0,c.jsxs)(fe,{children:[(0,c.jsx)("span",{children:"Subtotal"}),(0,c.jsx)("span",{children:(0,d.vv)(N.subtotal,x)})]}),N.tax>0&&(0,c.jsxs)(fe,{children:[(0,c.jsxs)("span",{children:["Tax (",N.taxRate,"%)"]}),(0,c.jsx)("span",{children:(0,d.vv)(N.tax,x)})]}),N.serviceCharge>0&&(0,c.jsxs)(fe,{children:[(0,c.jsxs)("span",{children:["Service (",N.serviceChargeRate,"%)"]}),(0,c.jsx)("span",{children:(0,d.vv)(N.serviceCharge,x)})]}),(0,c.jsxs)(fe,{$bold:!0,children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,d.vv)(N.total,x)})]})]}),(0,c.jsx)(we,{children:(0,c.jsx)(Ae,{$variant:"primary",onClick:Ce,disabled:0===$.length||S,children:S?"Submitting...":"new"===l?"Submit Order":"Add Items"})})]})]})]})}),z&&I&&(0,c.jsx)(H.A,{isOpen:z,onClose:()=>B(!1),menuItem:{id:String(I.id),name:I.name,price:I.price,emoji:I.emoji||"",image:I.image,optionGroups:I.optionGroups},onConfirm:(e,t,n)=>{R(I,e,t,n),B(!1)}})]}):null};var Fe=n(3422);const ke=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,Se=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Ee=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ze=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Be=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,Ie=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,Oe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Te=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,Ne=o.Ay.button`
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
`,Re=o.Ay.button`
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
`,De=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,_e=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Pe=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,qe=()=>{var e;const{restaurantId:t}=(0,r.g)(),n=(0,r.Zp)(),{user:o}=(0,a.As)(),[d,p]=(0,i.useState)(s.He),[x,u]=(0,i.useState)({}),[h,g]=(0,i.useState)(!1),[b,m]=(0,i.useState)(""),[f,y]=(0,i.useState)(!0),[v,j]=(0,i.useState)(""),w=(0,i.useRef)(null),A=(0,i.useRef)(null),[$,C]=(0,i.useState)(null),[F,k]=(0,i.useState)(!1),[S,z]=(0,i.useState)(!1),[B,I]=(0,i.useState)("new");(0,i.useEffect)(()=>{const e=()=>{const e=new Date;m(e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[]);const O=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),T=(0,i.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>O(),2e3)},[O]);(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const i=await n.json(),o=i.data||i;o.floor_plan&&p(o.floor_plan),o.currency&&j(o.currency)}catch(e){console.error("Failed to load floor plan:",e)}finally{y(!1)}})(),O()},[t,O]),(0,i.useEffect)(()=>{if(!t)return;const e=(0,Fe.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),O()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>T()),e.on("order-created",()=>T()),e.on("order-items-added",()=>T()),e.on("new-order",()=>T()),A.current=e,()=>{e.disconnect(),A.current=null}},[t,O,T]),(0,i.useEffect)(()=>{const e=setInterval(()=>O(),3e4);return()=>clearInterval(e)},[O]);const N=$?x[$]:void 0,R=$?d.tables.find(e=>e.tableNumber===$):void 0;return f?(0,c.jsxs)(ke,{children:[(0,c.jsx)(Se,{children:(0,c.jsx)(Ee,{children:(0,c.jsx)(ze,{children:"Floor Plan"})})}),(0,c.jsx)(Pe,{children:"Loading floor plan..."})]}):(0,c.jsxs)(ke,{children:[(0,c.jsxs)(Se,{children:[(0,c.jsxs)(Ee,{children:[(0,c.jsx)(Re,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,c.jsx)(ze,{children:"Floor Plan"}),(0,c.jsxs)(Ie,{children:[(0,c.jsx)(Be,{$connected:h}),h?"Live":"Offline"]})]}),(0,c.jsxs)(Oe,{children:[(0,c.jsx)(Te,{children:b}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,c.jsx)(Ne,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,c.jsxs)(De,{children:[(0,c.jsx)(_e,{children:(0,c.jsx)(l.A,{floorPlan:d,tableStatuses:x,onTableClick:e=>{C(t=>t===e?null:e)},selectedTableId:$?null===(e=d.tables.find(e=>e.tableNumber===$))||void 0===e?void 0:e.id:null,currency:v})}),$&&(0,c.jsx)(E,{tableNumber:$,statusInfo:N,tableInfo:R,currency:v,onClose:()=>C(null),onNewOrder:()=>{I("new"),z(!0)},onAddItems:()=>{I("add"),z(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await O()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{k(!0)},onNavigateToPOS:()=>{$&&n(`/restaurant/${t}/pos-terminal?table=${$}&from=floor-plan`)}})]}),(0,c.jsx)(D,{tables:d.tables,tableStatuses:x,currency:v}),F&&N&&(0,c.jsx)(_.A,{isOpen:F,onClose:()=>k(!1),total:N.totalAmount||0,subtotal:N.subtotal||0,tax:N.tax||0,serviceCharge:N.serviceCharge||0,discountAmount:N.discount||0,onConfirmPayment:async(e,t,n,i,o)=>{if(!$)return;const r=x[$];if(null!==r&&void 0!==r&&r.orderId)try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${r.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({payment_method:e,payment_status:"completed",kitchen_ready:!0,points_used:i||0,point_discount:o||0})})).ok&&(k(!1),await O())}catch(a){console.error("Failed to process payment:",a)}},restaurantId:Number(t),customerId:N.customerId||void 0}),$&&(0,c.jsx)(Ce,{isOpen:S,onClose:()=>z(!1),tableNumber:$,tableInfo:R,statusInfo:N,mode:B,restaurantId:Number(t),currency:v,onOrderComplete:()=>{z(!1),O()}})]})}}}]);