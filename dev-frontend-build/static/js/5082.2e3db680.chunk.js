"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,n)=>{n.r(t),n.d(t,{default:()=>z});var i=n(9950),a=n(4752),r=n(4492),o=n(1367),s=n(7447),l=n(5783),d=n(4414);const c=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,u=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
  }
`,h=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,p=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,x=a.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;

  ${e=>"primary"===e.$variant?"\n    background: #635BFF;\n    color: white;\n    &:hover { background: #5A51E6; transform: translateY(-1px); }\n    &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }\n  ":"danger"===e.$variant?"\n    background: #FEE2E2;\n    color: #DC2626;\n    &:hover { background: #FECACA; }\n  ":"\n    background: #F3F4F6;\n    color: #374151;\n    &:hover { background: #E5E7EB; }\n  "}
`,g=a.Ay.div`
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`,b=a.Ay.div`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
`,f=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`,v=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`,y=a.Ay.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 4px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 10px;
  color: #6B7C93;
  font-weight: 500;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: rgba(99, 91, 255, 0.04);
  }
`,$=a.Ay.div`
  width: ${e=>"rectangle"===e.$shape?"36px":"24px"};
  height: 24px;
  border: 2px solid currentColor;
  border-radius: ${e=>"round"===e.$shape?"50%":"4px"};
`,w=a.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,j=a.Ay.div`
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,E=a.Ay.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  margin-bottom: 4px;
`,C=a.Ay.input`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`,F=a.Ay.select`
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  font-size: 13px;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,S=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,k=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`,A=a.Ay.div`
  font-size: 12px;
  color: ${e=>"success"===e.$type?"#059669":"#6B7C93"};
  font-weight: 500;
`,z=()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,o.As)(),n=(0,i.useRef)(null),[a,z]=(0,i.useState)(s.He),[T,B]=(0,i.useState)(null),[D,N]=(0,i.useState)(!1),[H,M]=(0,i.useState)({x:0,y:0}),[W,I]=(0,i.useState)([]),[R,L]=(0,i.useState)(!1),[X,P]=(0,i.useState)(!1),[Y,_]=(0,i.useState)(""),[G,O]=(0,i.useState)([]),[U,q]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{var t;const n=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${n}`}});if(!i.ok)return;const a=await i.json(),r=a.data||a;if(r.floor_plan&&z(r.floor_plan),null!==(t=r.table_settings)&&void 0!==t&&t.enableTableNumbers){const{totalTables:e,tablePrefix:t}=r.table_settings,n=[];for(let i=1;i<=e;i++)n.push(`${t}${String(i).padStart(3,"0")}`);O(n)}}catch(n){console.error("Failed to load floor plan:",n)}finally{q(!1)}})()},[e]);const J=a.tables.find(e=>e.id===T)||null,K=a.tables.map(e=>e.tableNumber),Z=G.filter(e=>!K.includes(e)),Q=()=>{T&&(V(),z(e=>({...e,tables:e.tables.filter(e=>e.id!==T)})),B(null),L(!0))},V=()=>{I(e=>[...e.slice(-19),JSON.parse(JSON.stringify(a))])},ee=()=>{if(0===W.length)return;const e=W[W.length-1];I(e=>e.slice(0,-1)),z(e),B(null),L(!0)},te=e=>{T&&(z(t=>({...t,tables:t.tables.map(t=>t.id===T?{...t,...e}:t)})),L(!0))},ne=(0,i.useCallback)(()=>{var e,t;const i=null===(e=n.current)||void 0===e||null===(t=e.querySelector("[data-scaled-layer]"))||void 0===t?void 0:t.parentElement;if(!i)return{x:1,y:1,rect:new DOMRect};const r=i.getBoundingClientRect();return{x:a.canvasWidth/r.width,y:a.canvasHeight/r.height,rect:r}},[a.canvasWidth,a.canvasHeight]),ie=(e,t,n)=>{const i=a.tables.find(e=>e.id===n);if(!i)return;const{x:r,y:o,rect:s}=ne();M({x:(e-s.left)*r-i.x,y:(t-s.top)*o-i.y}),V(),N(!0),B(n)};return(0,i.useEffect)(()=>{if(!D||!T)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:n}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:i,y:r,rect:o}=ne();let s=(t-o.left)*i-H.x,l=(n-o.top)*r-H.y;a.gridSize>0&&(s=Math.round(s/a.gridSize)*a.gridSize,l=Math.round(l/a.gridSize)*a.gridSize),s=Math.max(0,Math.min(a.canvasWidth,s)),l=Math.max(0,Math.min(a.canvasHeight,l)),z(e=>({...e,tables:e.tables.map(e=>e.id===T?{...e,x:s,y:l}:e)})),L(!0)},t=()=>N(!1);return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[D,T,H,ne,a.gridSize,a.canvasWidth,a.canvasHeight]),(0,i.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;Q()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),ee())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[T,W]),U?(0,d.jsxs)(c,{children:[(0,d.jsx)(u,{children:(0,d.jsx)(h,{children:"Floor Plan Editor"})}),(0,d.jsx)(g,{children:(0,d.jsx)("div",{style:{color:"#6B7C93"},children:"Loading..."})})]}):(0,d.jsxs)(c,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(h,{children:"Floor Plan Editor"}),(0,d.jsxs)(p,{children:[Y&&(0,d.jsx)(A,{$type:"success",children:Y}),R&&(0,d.jsx)(A,{$type:"info",children:"Unsaved changes"}),(0,d.jsx)(x,{$variant:"secondary",onClick:ee,disabled:0===W.length,children:"Undo"}),(0,d.jsx)(x,{$variant:"primary",onClick:async()=>{P(!0);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({floor_plan:a})})).ok&&(L(!1),_("Saved"),setTimeout(()=>_(""),2e3))}catch(t){console.error("Failed to save:",t)}finally{P(!1)}},disabled:X||!R,children:X?"Saving...":"Save"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:["Add Table (",Z.length," left)"]}),(0,d.jsx)(m,{children:s.Em.map(e=>(0,d.jsxs)(y,{onClick:()=>(e=>{const t=Z[0];if(!t)return;const n=s.Em.find(t=>t.value===e),i={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:t,label:t,shape:e,x:a.canvasWidth/2,y:a.canvasHeight/2,width:n.defaultWidth,height:n.defaultHeight,rotation:0,seats:4};V(),z(e=>({...e,tables:[...e.tables,i]})),B(i.id),L(!0)})(e.value),disabled:0===Z.length,title:`Add ${e.label} table`,children:[(0,d.jsx)($,{$shape:e.value}),e.label]},e.value))}),T&&(0,d.jsx)(x,{$variant:"danger",onClick:Q,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:"Delete Table"})]}),J&&(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{children:"Properties"}),(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Table Number"}),(0,d.jsxs)(F,{value:J.tableNumber,onChange:e=>te({tableNumber:e.target.value,label:e.target.value}),children:[(0,d.jsx)("option",{value:J.tableNumber,children:J.tableNumber}),Z.map(e=>(0,d.jsx)("option",{value:e,children:e},e))]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Label"}),(0,d.jsx)(C,{value:J.label,onChange:e=>te({label:e.target.value})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Shape"}),(0,d.jsx)(F,{value:J.shape,onChange:e=>{const t=e.target.value,n=s.Em.find(e=>e.value===t);te({shape:t,width:n.defaultWidth,height:n.defaultHeight})},children:s.Em.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Seats"}),(0,d.jsx)(C,{type:"number",min:1,max:20,value:J.seats,onChange:e=>te({seats:parseInt(e.target.value)||1})})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Width"}),(0,d.jsx)(C,{type:"number",min:40,max:200,value:J.width,onChange:e=>{const t=parseInt(e.target.value)||60;te({width:t,height:"round"===J.shape||"square"===J.shape?t:J.height})}})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(E,{children:"Height"}),(0,d.jsx)(C,{type:"number",min:40,max:200,value:J.height,onChange:e=>te({height:parseInt(e.target.value)||60}),disabled:"rectangle"!==J.shape})]})]})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{children:"Canvas"}),(0,d.jsxs)(k,{children:[(0,d.jsx)("input",{type:"checkbox",checked:a.showGrid,onChange:e=>{z(t=>({...t,showGrid:e.target.checked})),L(!0)}}),"Show Grid"]}),(0,d.jsxs)(j,{style:{marginTop:"8px"},children:[(0,d.jsx)(E,{children:"Grid Size"}),(0,d.jsx)(C,{type:"number",min:10,max:50,step:5,value:a.gridSize,onChange:e=>{z(t=>({...t,gridSize:parseInt(e.target.value)||20})),L(!0)}})]})]})]}),(0,d.jsx)(w,{ref:n,children:(0,d.jsx)(l.A,{floorPlan:a,isEditing:!0,selectedTableId:T,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),ie(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const n=e.touches[0];ie(n.clientX,n.clientY,t)},onCanvasClick:()=>B(null)})})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>v});var i=n(9950),a=n(4752),r=n(7447),o=n(4414);const s=a.Ay.div`
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
`,l=a.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  letter-spacing: 0.3px;
  line-height: 1;
`,d=a.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,c=a.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,u=i.memo(e=>{let{table:t,status:n="available",isSelected:i=!1,isEditing:a=!1,onClick:u,onMouseDown:h,onTouchStart:p,statusInfo:x,currency:g=""}=e;const b=a?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[n];return(0,o.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:t.shape,$rotation:t.rotation,$bgColor:b.bg,$borderColor:b.border,$textColor:b.text,$isSelected:i,$isEditing:a,onClick:e=>{!a&&u&&(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{a&&h&&h(e,t.id)},onTouchStart:e=>{a&&p&&p(e,t.id)},children:[(0,o.jsx)(l,{$textColor:b.text,children:t.label||t.tableNumber}),(0,o.jsxs)(d,{$textColor:b.text,children:[t.seats," seats"]}),!a&&x&&"available"!==n&&(0,o.jsxs)(c,{$textColor:b.text,children:[g,x.totalAmount.toFixed(0)," \xb7 ",x.elapsedMinutes,"m"]})]})});u.displayName="TableNode";const h=u,p=a.Ay.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #F0F2F5;
  border-radius: 8px;
`,x=a.Ay.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  aspect-ratio: ${e=>e.$aspectRatio};
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
  touch-action: none;
`,g=a.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scaleX}px ${e=>e.$gridSize/e.$scaleY}px;
  opacity: 0.5;
`,b=a.Ay.div`
  position: absolute;
  inset: 0;
  transform-origin: 0 0;
`,f=a.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:a=!1,selectedTableId:r,onTableClick:s,onTableMouseDown:l,onTableTouchStart:d,onCanvasClick:c,currency:u=""}=e;const v=(0,i.useRef)(null),m=(0,i.useRef)(null),[y,$]=(0,i.useState)({x:1,y:1}),w=(0,i.useCallback)(()=>{if(!m.current)return;const e=m.current.getBoundingClientRect();$({x:t.canvasWidth/e.width,y:t.canvasHeight/e.height})},[t.canvasWidth,t.canvasHeight]);(0,i.useEffect)(()=>{w();const e=new ResizeObserver(()=>w());return m.current&&e.observe(m.current),()=>e.disconnect()},[w]);const j=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},E=`${t.canvasWidth} / ${t.canvasHeight}`;return(0,o.jsx)(p,{ref:v,children:(0,o.jsxs)(x,{ref:m,$aspectRatio:E,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[t.showGrid&&(0,o.jsx)(g,{$gridSize:t.gridSize,$scaleX:y.x,$scaleY:y.y}),(0,o.jsx)(b,{"data-scaled-layer":!0,style:{transform:`scale(${1/y.x}, ${1/y.y})`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,o.jsx)(h,{table:e,status:j(e.tableNumber),isSelected:r===e.id,isEditing:a,onClick:s,onMouseDown:l,onTouchStart:d,statusInfo:n[e.tableNumber],currency:u},e.id))}),0===t.tables.length&&(0,o.jsxs)(f,{children:[(0,o.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),a?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>a,Ez:()=>r,He:()=>i,Zt:()=>o});const i={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},a=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rectangle",defaultWidth:110,defaultHeight:70}],r={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},o={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);