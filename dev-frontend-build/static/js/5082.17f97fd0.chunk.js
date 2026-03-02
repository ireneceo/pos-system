"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var i=n(9950),a=n(4752),r=n(4492),o=n(7447),s=n(5783),l=n(4414);const d=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,c=a.Ay.div`
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
`,u=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,h=a.Ay.div`
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
`,p=a.Ay.div`
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`,g=a.Ay.div`
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
`,b=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`,f=a.Ay.div`
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
`,v=a.Ay.button`
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
`,y=a.Ay.div`
  width: ${e=>"rectangle"===e.$shape?"36px":"24px"};
  height: 24px;
  border: 2px solid currentColor;
  border-radius: ${e=>"round"===e.$shape?"50%":"4px"};
`,$=a.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,w=a.Ay.div`
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,j=a.Ay.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  margin-bottom: 4px;
`,E=a.Ay.input`
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
`,C=a.Ay.select`
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
`,F=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`,k=a.Ay.div`
  font-size: 12px;
  color: ${e=>"success"===e.$type?"#059669":"#6B7C93"};
  font-weight: 500;
`,A=()=>{const{restaurantId:e}=(0,r.g)(),t=(0,i.useRef)(null),[n,a]=(0,i.useState)(o.He),[A,z]=(0,i.useState)(null),[T,B]=(0,i.useState)(!1),[M,D]=(0,i.useState)({x:0,y:0}),[N,H]=(0,i.useState)([]),[I,R]=(0,i.useState)(!1),[W,L]=(0,i.useState)(!1),[X,P]=(0,i.useState)(""),[Y,_]=(0,i.useState)([]),[G,O]=(0,i.useState)(""),[U,q]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{try{var t;const n=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${n}`}});if(!i.ok)return;const r=await i.json(),o=r.data||r;if(o.name&&O(o.name),o.floor_plan&&a(o.floor_plan),null!==(t=o.table_settings)&&void 0!==t&&t.enableTableNumbers){const{totalTables:e,tablePrefix:t}=o.table_settings,n=[];for(let i=1;i<=e;i++)n.push(`${t}${String(i).padStart(3,"0")}`);_(n)}}catch(n){console.error("Failed to load floor plan:",n)}finally{q(!1)}})()},[e]);const J=n.tables.find(e=>e.id===A)||null,K=n.tables.map(e=>e.tableNumber),Z=Y.filter(e=>!K.includes(e)),Q=()=>{A&&(V(),a(e=>({...e,tables:e.tables.filter(e=>e.id!==A)})),z(null),R(!0))},V=()=>{H(e=>[...e.slice(-19),JSON.parse(JSON.stringify(n))])},ee=()=>{if(0===N.length)return;const e=N[N.length-1];H(e=>e.slice(0,-1)),a(e),z(null),R(!0)},te=e=>{A&&(a(t=>({...t,tables:t.tables.map(t=>t.id===A?{...t,...e}:t)})),R(!0))},ne=(0,i.useCallback)(()=>{var e,i;const a=null===(e=t.current)||void 0===e||null===(i=e.querySelector("[data-scaled-layer]"))||void 0===i?void 0:i.parentElement;if(!a)return{x:1,y:1,rect:new DOMRect};const r=a.getBoundingClientRect();return{x:n.canvasWidth/r.width,y:n.canvasHeight/r.height,rect:r}},[n.canvasWidth,n.canvasHeight]),ie=(e,t,i)=>{const a=n.tables.find(e=>e.id===i);if(!a)return;const{x:r,y:o,rect:s}=ne();D({x:(e-s.left)*r-a.x,y:(t-s.top)*o-a.y}),V(),B(!0),z(i)};return(0,i.useEffect)(()=>{if(!T||!A)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:i}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:r,y:o,rect:s}=ne();let l=(t-s.left)*r-M.x,d=(i-s.top)*o-M.y;n.gridSize>0&&(l=Math.round(l/n.gridSize)*n.gridSize,d=Math.round(d/n.gridSize)*n.gridSize),l=Math.max(0,Math.min(n.canvasWidth,l)),d=Math.max(0,Math.min(n.canvasHeight,d)),a(e=>({...e,tables:e.tables.map(e=>e.id===A?{...e,x:l,y:d}:e)})),R(!0)},t=()=>B(!1);return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[T,A,M,ne,n.gridSize,n.canvasWidth,n.canvasHeight]),(0,i.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;Q()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),ee())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[A,N]),U?(0,l.jsxs)(d,{children:[(0,l.jsx)(c,{children:(0,l.jsx)(u,{children:"Floor Plan Editor"})}),(0,l.jsx)(p,{children:(0,l.jsx)("div",{style:{color:"#6B7C93"},children:"Loading..."})})]}):(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:"Floor Plan Editor"}),(0,l.jsxs)(h,{children:[X&&(0,l.jsx)(k,{$type:"success",children:X}),I&&(0,l.jsx)(k,{$type:"info",children:"Unsaved changes"}),(0,l.jsx)(x,{$variant:"secondary",onClick:ee,disabled:0===N.length,children:"Undo"}),(0,l.jsx)(x,{$variant:"primary",onClick:async()=>{L(!0);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({name:G,floor_plan:n})})).ok&&(R(!1),P("Saved"),setTimeout(()=>P(""),2e3))}catch(t){console.error("Failed to save:",t)}finally{L(!1)}},disabled:W||!I,children:W?"Saving...":"Save"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(b,{children:[(0,l.jsxs)(f,{children:["Add Table (",Z.length," left)"]}),(0,l.jsx)(m,{children:o.Em.map(e=>(0,l.jsxs)(v,{onClick:()=>(e=>{const t=Z[0];if(!t)return;const i=o.Em.find(t=>t.value===e),r={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:t,label:t,shape:e,x:n.canvasWidth/2,y:n.canvasHeight/2,width:i.defaultWidth,height:i.defaultHeight,rotation:0,seats:4};V(),a(e=>({...e,tables:[...e.tables,r]})),z(r.id),R(!0)})(e.value),disabled:0===Z.length,title:`Add ${e.label} table`,children:[(0,l.jsx)(y,{$shape:e.value}),e.label]},e.value))}),A&&(0,l.jsx)(x,{$variant:"danger",onClick:Q,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:"Delete Table"})]}),J&&(0,l.jsxs)(b,{children:[(0,l.jsx)(f,{children:"Properties"}),(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Table Number"}),(0,l.jsxs)(C,{value:J.tableNumber,onChange:e=>te({tableNumber:e.target.value,label:e.target.value}),children:[(0,l.jsx)("option",{value:J.tableNumber,children:J.tableNumber}),Z.map(e=>(0,l.jsx)("option",{value:e,children:e},e))]})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Label"}),(0,l.jsx)(E,{value:J.label,onChange:e=>te({label:e.target.value})})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Shape"}),(0,l.jsx)(C,{value:J.shape,onChange:e=>{const t=e.target.value,n=o.Em.find(e=>e.value===t);te({shape:t,width:n.defaultWidth,height:n.defaultHeight})},children:o.Em.map(e=>(0,l.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Seats"}),(0,l.jsx)(E,{type:"number",min:1,max:20,value:J.seats,onChange:e=>te({seats:parseInt(e.target.value)||1})})]}),(0,l.jsxs)(S,{children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Width"}),(0,l.jsx)(E,{type:"number",min:40,max:200,value:J.width,onChange:e=>{const t=parseInt(e.target.value)||60;te({width:t,height:"round"===J.shape||"square"===J.shape?t:J.height})}})]}),(0,l.jsxs)(w,{children:[(0,l.jsx)(j,{children:"Height"}),(0,l.jsx)(E,{type:"number",min:40,max:200,value:J.height,onChange:e=>te({height:parseInt(e.target.value)||60}),disabled:"rectangle"!==J.shape})]})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(f,{children:"Canvas"}),(0,l.jsxs)(F,{children:[(0,l.jsx)("input",{type:"checkbox",checked:n.showGrid,onChange:e=>{a(t=>({...t,showGrid:e.target.checked})),R(!0)}}),"Show Grid"]}),(0,l.jsxs)(w,{style:{marginTop:"8px"},children:[(0,l.jsx)(j,{children:"Grid Size"}),(0,l.jsx)(E,{type:"number",min:10,max:50,step:5,value:n.gridSize,onChange:e=>{a(t=>({...t,gridSize:parseInt(e.target.value)||20})),R(!0)}})]})]})]}),(0,l.jsx)($,{ref:t,children:(0,l.jsx)(s.A,{floorPlan:n,isEditing:!0,selectedTableId:A,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),ie(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const n=e.touches[0];ie(n.clientX,n.clientY,t)},onCanvasClick:()=>z(null)})})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>m});var i=n(9950),a=n(4752),r=n(7447),o=n(4414);const s=a.Ay.div`
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
`,u=i.memo(e=>{let{table:t,status:n="available",isSelected:i=!1,isEditing:a=!1,onClick:u,onMouseDown:h,onTouchStart:x,statusInfo:p,currency:g=""}=e;const b=a?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[n];return(0,o.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:t.shape,$rotation:t.rotation,$bgColor:b.bg,$borderColor:b.border,$textColor:b.text,$isSelected:i,$isEditing:a,onClick:e=>{!a&&u&&(e.stopPropagation(),u(t.tableNumber))},onMouseDown:e=>{a&&h&&h(e,t.id)},onTouchStart:e=>{a&&x&&x(e,t.id)},children:[(0,o.jsx)(l,{$textColor:b.text,children:t.label||t.tableNumber}),(0,o.jsx)(d,{$textColor:b.text,children:!a&&null!==p&&void 0!==p&&p.guestCount?`${p.guestCount} guests`:`${t.seats} seats`}),!a&&p&&"available"!==n&&(0,o.jsxs)(c,{$textColor:b.text,children:[g,p.totalAmount.toFixed(0)," \xb7 ",p.elapsedMinutes,"m"]})]})});u.displayName="TableNode";const h=u,x=a.Ay.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #F0F2F5;
  border-radius: 8px;
`,p=a.Ay.div`
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
`,m=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:a=!1,selectedTableId:r,onTableClick:s,onTableMouseDown:l,onTableTouchStart:d,onCanvasClick:c,currency:u=""}=e;const m=(0,i.useRef)(null),v=(0,i.useRef)(null),[y,$]=(0,i.useState)({x:1,y:1}),w=(0,i.useMemo)(()=>{if(a||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,i=-1/0,r=-1/0;for(const a of t.tables){const t=a.width/2,o=a.height/2;e=Math.min(e,a.x-t),n=Math.min(n,a.y-o),i=Math.max(i,a.x+t),r=Math.max(r,a.y+o)}const o=i-e,s=r-n,l=Math.max(.15*o,60),d=Math.max(.15*s,60),c=Math.max(0,e-l),u=Math.max(0,n-d);return{x:c,y:u,w:Math.min(t.canvasWidth-c,o+2*l),h:Math.min(t.canvasHeight-u,s+2*d)}},[t,a]),j=(0,i.useCallback)(()=>{if(!v.current)return;const e=v.current.getBoundingClientRect();$({x:w.w/e.width,y:w.h/e.height})},[w]);(0,i.useEffect)(()=>{j();const e=new ResizeObserver(()=>j());return v.current&&e.observe(v.current),()=>e.disconnect()},[j]);const E=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},C=`${w.w} / ${w.h}`;return(0,o.jsx)(x,{ref:m,children:(0,o.jsxs)(p,{ref:v,$aspectRatio:C,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[a&&t.showGrid&&(0,o.jsx)(g,{$gridSize:t.gridSize,$scaleX:y.x,$scaleY:y.y}),(0,o.jsx)(b,{"data-scaled-layer":!0,style:{transform:`scale(${1/y.x}, ${1/y.y})`,left:a?0:-w.x/y.x+"px",top:a?0:-w.y/y.y+"px"},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,o.jsx)(h,{table:e,status:E(e.tableNumber),isSelected:r===e.id,isEditing:a,onClick:s,onMouseDown:l,onTouchStart:d,statusInfo:n[e.tableNumber],currency:u},e.id))}),0===t.tables.length&&(0,o.jsxs)(f,{children:[(0,o.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),a?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>a,Ez:()=>r,He:()=>i,Zt:()=>o});const i={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},a=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rectangle",defaultWidth:110,defaultHeight:70}],r={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},o={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);