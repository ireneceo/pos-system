"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2255],{4636:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});var r=n(9950),o=n(4752),i=n(4492),a=n(1367),s=n(7447),l=n(5783),d=n(3422),c=n(4414);const u=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,x=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,h=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,g=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,b=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,$=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,y=o.Ay.button`
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
`,v=o.Ay.button`
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
`,m=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,w=o.Ay.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-shrink: 0;
`,j=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,F=o.Ay.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,A=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-left: auto;
`,k=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,C=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,E=()=>{const{restaurantId:e}=(0,i.g)(),t=(0,i.Zp)(),{user:n}=(0,a.As)(),[o,E]=(0,r.useState)(s.He),[S,z]=(0,r.useState)({}),[B,D]=(0,r.useState)(!1),[T,R]=(0,r.useState)(""),[I,H]=(0,r.useState)(!0),[N,W]=(0,r.useState)(""),M=(0,r.useRef)(null),O=(0,r.useRef)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;R(e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[]);const P=(0,r.useCallback)(async()=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e}/table-status`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();z(e.data||{})}}catch(t){console.error("Failed to fetch table statuses:",t)}},[e]),L=(0,r.useCallback)(()=>{M.current&&clearTimeout(M.current),M.current=setTimeout(()=>P(),2e3)},[P]);(0,r.useEffect)(()=>{(async()=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${t}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;o.floor_plan&&E(o.floor_plan),o.currency&&W(o.currency)}catch(t){console.error("Failed to load floor plan:",t)}finally{H(!1)}})(),P()},[e,P]),(0,r.useEffect)(()=>{if(!e)return;const t=(0,d.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return t.on("connect",()=>{D(!0),t.emit("join-restaurant",e),P()}),t.on("disconnect",()=>D(!1)),t.on("order-updated",()=>L()),t.on("order-created",()=>L()),t.on("order-items-added",()=>L()),t.on("new-order",()=>L()),O.current=t,()=>{t.disconnect(),O.current=null}},[e,P,L]),(0,r.useEffect)(()=>{const e=setInterval(()=>P(),3e4);return()=>clearInterval(e)},[P]);const _=o.tables.length,Z=o.tables.filter(e=>{var t;const n=null===(t=S[e.tableNumber])||void 0===t?void 0:t.status;return n&&"available"!==n}).length,q=_-Z;return I?(0,c.jsxs)(u,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(p,{children:(0,c.jsx)(h,{children:"Floor Plan"})})}),(0,c.jsx)(C,{children:"Loading floor plan..."})]}):(0,c.jsxs)(u,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(v,{onClick:()=>t(`/restaurant/${e}/dashboard`),children:"\u2190 Back"}),(0,c.jsx)(h,{children:"Floor Plan"}),(0,c.jsxs)(b,{children:[(0,c.jsx)(g,{$connected:B}),B?"Live":"Offline"]})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)($,{children:T}),"Restaurant Admin"===(null===n||void 0===n?void 0:n.role)&&(0,c.jsx)(y,{onClick:()=>t(`/restaurant/${e}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,c.jsx)(m,{children:(0,c.jsx)(l.A,{floorPlan:o,tableStatuses:S,onTableClick:n=>{t(`/restaurant/${e}/pos-terminal?table=${n}&from=floor-plan`)},currency:N})}),(0,c.jsxs)(w,{children:[Object.keys(s.Ez).map(e=>(0,c.jsxs)(j,{children:[(0,c.jsx)(F,{$color:s.Ez[e].border}),s.Zt[e]]},e)),(0,c.jsxs)(A,{children:[(0,c.jsxs)(k,{children:["Tables: ",(0,c.jsx)("span",{children:_})]}),(0,c.jsxs)(k,{children:["Available: ",(0,c.jsx)("span",{children:q})]}),(0,c.jsxs)(k,{children:["Occupied: ",(0,c.jsx)("span",{children:Z})]})]})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>$});var r=n(9950),o=n(4752),i=n(7447),a=n(4414);const s=o.Ay.div`
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
`,u=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:o=!1,onClick:u,onMouseDown:x,onTouchStart:p,statusInfo:h,currency:g=""}=e;const b=o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:i.Ez[n];return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:t.shape,$rotation:t.rotation,$bgColor:b.bg,$borderColor:b.border,$textColor:b.text,$isSelected:r,$isEditing:o,onClick:e=>{!o&&u&&(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{o&&x&&x(e,t.id)},onTouchStart:e=>{o&&p&&p(e,t.id)},children:[(0,a.jsx)(l,{$textColor:b.text,children:t.label||t.tableNumber}),(0,a.jsxs)(d,{$textColor:b.text,children:[t.seats," seats"]}),!o&&h&&"available"!==n&&(0,a.jsxs)(c,{$textColor:b.text,children:[g,h.totalAmount.toFixed(0)," \xb7 ",h.elapsedMinutes,"m"]})]})});u.displayName="TableNode";const x=u,p=o.Ay.div`
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
`,f=o.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,$=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:o=!1,selectedTableId:i,onTableClick:s,onTableMouseDown:l,onTableTouchStart:d,onCanvasClick:c,currency:u=""}=e;const $=(0,r.useRef)(null),y=(0,r.useRef)(null),[v,m]=(0,r.useState)({x:1,y:1}),w=(0,r.useCallback)(()=>{if(!y.current)return;const e=y.current.getBoundingClientRect();m({x:t.canvasWidth/e.width,y:t.canvasHeight/e.height})},[t.canvasWidth,t.canvasHeight]);(0,r.useEffect)(()=>{w();const e=new ResizeObserver(()=>w());return y.current&&e.observe(y.current),()=>e.disconnect()},[w]);const j=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},F=`${t.canvasWidth} / ${t.canvasHeight}`;return(0,a.jsx)(p,{ref:$,children:(0,a.jsxs)(h,{ref:y,$aspectRatio:F,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[t.showGrid&&(0,a.jsx)(g,{$gridSize:t.gridSize,$scaleX:v.x,$scaleY:v.y}),(0,a.jsx)(b,{"data-scaled-layer":!0,style:{transform:`scale(${1/v.x}, ${1/v.y})`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(x,{table:e,status:j(e.tableNumber),isSelected:i===e.id,isEditing:o,onClick:s,onMouseDown:l,onTouchStart:d,statusInfo:n[e.tableNumber],currency:u},e.id))}),0===t.tables.length&&(0,a.jsxs)(f,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>o,Ez:()=>i,He:()=>r,Zt:()=>a});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rectangle",defaultWidth:110,defaultHeight:70}],i={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},a={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);