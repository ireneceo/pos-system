"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,a)=>{a.r(t),a.d(t,{default:()=>z});var n=a(9950),i=a(4752),r=a(4492),o=a(7447),l=a(5783),s=a(4414);const d=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`,c=i.Ay.div`
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
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,p=i.Ay.button`
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
`,x=i.Ay.div`
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`,g=i.Ay.div`
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
`,b=i.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`,f=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,m=i.Ay.button`
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
`,y=i.Ay.div`
  width: ${e=>"vertical"===e.$variant?"24px":"rectangle"===e.$shape?"36px":"24px"};
  height: ${e=>"vertical"===e.$variant?"36px":"24px"};
  border: 2px solid currentColor;
  border-radius: ${e=>"round"===e.$shape?"50%":"4px"};
`,$=i.Ay.div`
  width: 36px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  font-style: italic;
  color: currentColor;
  opacity: 0.7;
`,w=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,j=i.Ay.div`
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,C=i.Ay.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  margin-bottom: 4px;
`,E=i.Ay.input`
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
`,F=i.Ay.select`
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
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,k=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`,A=i.Ay.div`
  font-size: 12px;
  color: ${e=>"success"===e.$type?"#059669":"#6B7C93"};
  font-weight: 500;
`,z=()=>{const{restaurantId:e}=(0,r.g)(),t=(0,n.useRef)(null),[a,i]=(0,n.useState)(o.He),[z,T]=(0,n.useState)(null),[B,M]=(0,n.useState)(!1),[H,W]=(0,n.useState)({x:0,y:0}),[D,N]=(0,n.useState)([]),[R,I]=(0,n.useState)(!1),[L,P]=(0,n.useState)(!1),[O,X]=(0,n.useState)(""),[_,Y]=(0,n.useState)([]),[U,G]=(0,n.useState)(""),[q,K]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{var t;const a=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${a}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;if(o.name&&G(o.name),o.floor_plan&&i(o.floor_plan),null!==(t=o.table_settings)&&void 0!==t&&t.enableTableNumbers){const{totalTables:e,tablePrefix:t}=o.table_settings,a=[];for(let n=1;n<=e;n++)a.push(`${t}${String(n).padStart(3,"0")}`);Y(a)}}catch(a){console.error("Failed to load floor plan:",a)}finally{K(!1)}})()},[e]);const J=a.tables.find(e=>e.id===z)||null,V=a.tables.map(e=>e.tableNumber),Z=_.filter(e=>!V.includes(e)),Q=e=>{const t={id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:"",label:e.textOnly?e.label.toUpperCase():e.label.replace(/ \(.\)$/,"").toUpperCase(),shape:"rectangle",x:a.canvasWidth/2,y:a.canvasHeight/2,width:e.defaultWidth,height:e.defaultHeight,rotation:0,seats:0,tableType:e.type};te(),i(e=>({...e,tables:[...e.tables,t]})),T(t.id),I(!0)},ee=()=>{z&&(te(),i(e=>({...e,tables:e.tables.filter(e=>e.id!==z)})),T(null),I(!0))},te=()=>{N(e=>[...e.slice(-19),JSON.parse(JSON.stringify(a))])},ae=()=>{if(0===D.length)return;const e=D[D.length-1];N(e=>e.slice(0,-1)),i(e),T(null),I(!0)},ne=e=>{z&&(i(t=>({...t,tables:t.tables.map(t=>t.id===z?{...t,...e}:t)})),I(!0))},ie=(0,n.useCallback)(()=>{var e,n;const i=null===(e=t.current)||void 0===e||null===(n=e.querySelector("[data-scaled-layer]"))||void 0===n?void 0:n.parentElement;if(!i)return{x:1,y:1,rect:new DOMRect};const r=i.getBoundingClientRect();return{x:a.canvasWidth/r.width,y:a.canvasHeight/r.height,rect:r}},[a.canvasWidth,a.canvasHeight]),re=(e,t,n)=>{const i=a.tables.find(e=>e.id===n);if(!i)return;const{x:r,y:o,rect:l}=ie();W({x:(e-l.left)*r-i.x,y:(t-l.top)*o-i.y}),te(),M(!0),T(n)};return(0,n.useEffect)(()=>{if(!B||!z)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:n}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:r,y:o,rect:l}=ie();let s=(t-l.left)*r-H.x,d=(n-l.top)*o-H.y;a.gridSize>0&&(s=Math.round(s/a.gridSize)*a.gridSize,d=Math.round(d/a.gridSize)*a.gridSize),s=Math.max(0,Math.min(a.canvasWidth,s)),d=Math.max(0,Math.min(a.canvasHeight,d)),i(e=>({...e,tables:e.tables.map(e=>e.id===z?{...e,x:s,y:d}:e)})),I(!0)},t=()=>M(!1);return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[B,z,H,ie,a.gridSize,a.canvasWidth,a.canvasHeight]),(0,n.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;ee()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),ae())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[z,D]),q?(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:(0,s.jsx)(h,{children:"Floor Plan Editor"})}),(0,s.jsx)(x,{children:(0,s.jsx)("div",{style:{color:"#6B7C93"},children:"Loading..."})})]}):(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(h,{children:"Floor Plan Editor"}),(0,s.jsxs)(u,{children:[O&&(0,s.jsx)(A,{$type:"success",children:O}),R&&(0,s.jsx)(A,{$type:"info",children:"Unsaved changes"}),(0,s.jsx)(p,{$variant:"secondary",onClick:ae,disabled:0===D.length,children:"Undo"}),(0,s.jsx)(p,{$variant:"primary",onClick:async()=>{P(!0);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({name:U,floor_plan:a})})).ok&&(I(!1),X("Saved"),setTimeout(()=>X(""),2e3))}catch(t){console.error("Failed to save:",t)}finally{P(!1)}},disabled:L||!R,children:L?"Saving...":"Save"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(g,{children:[(0,s.jsxs)(b,{children:[(0,s.jsxs)(f,{children:["Add Table (",Z.length," left)"]}),(0,s.jsxs)(v,{children:[o.Em.map((e,t)=>(0,s.jsxs)(m,{onClick:()=>((e,t)=>{const n=Z[0];if(!n)return;const r=t||o.Em.find(t=>t.value===e),l={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:n,label:n,shape:e,x:a.canvasWidth/2,y:a.canvasHeight/2,width:r.defaultWidth,height:r.defaultHeight,rotation:0,seats:4,tableType:"table"};te(),i(e=>({...e,tables:[...e.tables,l]})),T(l.id),I(!0)})(e.value,e),disabled:0===Z.length,title:`Add ${e.label} table`,children:[(0,s.jsx)(y,{$shape:e.value,$variant:e.variant}),e.label]},`${e.value}-${t}`)),o.h_.filter(e=>!e.textOnly).map((e,t)=>(0,s.jsxs)(m,{onClick:()=>Q(e),title:`Add ${e.label}`,children:[(0,s.jsx)(y,{$shape:"rectangle",$variant:"vertical"===e.variant?"vertical":void 0}),e.label]},`counter-${t}`))]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Labels"}),(0,s.jsx)(v,{children:o.h_.filter(e=>e.textOnly).map(e=>(0,s.jsxs)(m,{onClick:()=>Q(e),title:`Add ${e.label} label`,children:[(0,s.jsx)($,{$type:e.type,children:e.icon}),e.label]},e.type))})]}),J&&(()=>{const e=J.tableType&&"table"!==J.tableType;return(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:e?"Fixture Properties":"Table Properties"}),!e&&(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Table Number"}),(0,s.jsxs)(F,{value:J.tableNumber,onChange:e=>ne({tableNumber:e.target.value,label:e.target.value}),children:[(0,s.jsx)("option",{value:J.tableNumber,children:J.tableNumber}),Z.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Label"}),(0,s.jsx)(E,{value:J.label,onChange:e=>ne({label:e.target.value})})]}),!e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Shape"}),(0,s.jsx)(F,{value:J.shape,onChange:e=>{const t=e.target.value,a=o.Em.find(e=>e.value===t);ne({shape:t,width:a.defaultWidth,height:a.defaultHeight})},children:o.Em.map((e,t)=>(0,s.jsx)("option",{value:e.value,children:e.label},`${e.value}-${t}`))})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Seats"}),(0,s.jsx)(E,{type:"number",min:1,max:20,value:J.seats,onChange:e=>ne({seats:parseInt(e.target.value)||1})})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Width"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:J.width,onChange:e=>{const t=parseInt(e.target.value)||60;ne({width:t,height:"round"===J.shape||"square"===J.shape?t:J.height})}})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Height"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:J.height,onChange:e=>ne({height:parseInt(e.target.value)||60}),disabled:!e&&"rectangle"!==J.shape})]})]}),(0,s.jsxs)(p,{$variant:"danger",onClick:ee,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:["Delete ",e?"Fixture":"Table"]})]})})(),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Canvas"}),(0,s.jsxs)(k,{children:[(0,s.jsx)("input",{type:"checkbox",checked:a.showGrid,onChange:e=>{i(t=>({...t,showGrid:e.target.checked})),I(!0)}}),"Show Grid"]}),(0,s.jsxs)(j,{style:{marginTop:"8px"},children:[(0,s.jsx)(C,{children:"Grid Size"}),(0,s.jsx)(E,{type:"number",min:10,max:50,step:5,value:a.gridSize,onChange:e=>{i(t=>({...t,gridSize:parseInt(e.target.value)||20})),I(!0)}})]})]})]}),(0,s.jsx)(w,{ref:t,children:(0,s.jsx)(l.A,{floorPlan:a,isEditing:!0,selectedTableId:z,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),re(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const a=e.touches[0];re(a.clientX,a.clientY,t)},onCanvasClick:()=>T(null)})})]})]})}},5783:(e,t,a)=>{a.d(t,{A:()=>y});var n=a(9950),i=a(4752),r=a(7447),o=a(4414);const l=i.Ay.div`
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
`,s=i.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  letter-spacing: 0.3px;
  line-height: 1;
`,d=i.Ay.div`
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
`,h=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},p=n.memo(e=>{let{table:t,status:a="available",isSelected:n=!1,isEditing:i=!1,onClick:p,onMouseDown:x,onTouchStart:g,statusInfo:b,currency:f=""}=e;const v=t.tableType||"table",m="table"!==v,y=h.has(v),$=m?u[v]||u.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[a],w=m?{...y?{background:"transparent",border:n&&i?"1.5px dashed #635BFF":"none",boxShadow:n&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${n?"#635BFF":$.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,o.jsxs)(l,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:y?"square":t.shape,$rotation:t.rotation,$bgColor:y?"transparent":$.bg,$borderColor:y?"transparent":$.border,$textColor:$.text,$isSelected:n&&!y,$isEditing:i,onClick:e=>{i||!p||m||(e.stopPropagation(),p(t.tableNumber))},onMouseDown:e=>{i&&x&&x(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:w,children:[(0,o.jsx)(s,{$textColor:$.text,style:y?{fontSize:"14px",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!m&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{$textColor:$.text,children:!i&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!i&&b&&"available"!==a&&(0,o.jsxs)(c,{$textColor:$.text,children:[f,b.totalAmount.toFixed(0)," \xb7 ",b.elapsedMinutes,"m"]})]})]})});p.displayName="TableNode";const x=p,g=i.Ay.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #F0F2F5;
  border-radius: 8px;
`,b=i.Ay.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  aspect-ratio: ${e=>e.$aspectRatio};
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
  touch-action: none;
`,f=i.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,v=i.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,m=i.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,y=e=>{let{floorPlan:t,tableStatuses:a={},isEditing:i=!1,selectedTableId:r,onTableClick:l,onTableMouseDown:s,onTableTouchStart:d,onCanvasClick:c,currency:h=""}=e;const u=(0,n.useRef)(null),p=(0,n.useRef)(null),[y,$]=(0,n.useState)(1),[w,j]=(0,n.useState)({x:0,y:0}),C=(0,n.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,a=1/0,n=-1/0,r=-1/0;for(const i of t.tables){const t=i.width/2,o=i.height/2;e=Math.min(e,i.x-t),a=Math.min(a,i.y-o),n=Math.max(n,i.x+t),r=Math.max(r,i.y+o)}const o=n-e,l=r-a,s=Math.max(.15*o,60),d=Math.max(.15*l,60),c=Math.max(0,e-s),h=Math.max(0,a-d);return{x:c,y:h,w:Math.min(t.canvasWidth-c,o+2*s),h:Math.min(t.canvasHeight-h,l+2*d)}},[t,i]),E=(0,n.useCallback)(()=>{if(!p.current)return;const e=p.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=C.w/e.width,a=C.h/e.height,n=Math.max(t,a);$(n);const i=C.w/n,r=C.h/n;j({x:(e.width-i)/2,y:(e.height-r)/2})},[C]);(0,n.useEffect)(()=>{E();const e=new ResizeObserver(()=>E());return p.current&&e.observe(p.current),()=>e.disconnect()},[E]);const F=e=>{var t;return(null===(t=a[e])||void 0===t?void 0:t.status)||"available"},S=`${C.w} / ${C.h}`;return(0,o.jsx)(g,{ref:u,children:(0,o.jsxs)(b,{ref:p,$aspectRatio:S,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,o.jsx)(f,{$gridSize:t.gridSize,$scale:y}),(0,o.jsx)(v,{"data-scaled-layer":!0,style:{transform:`scale(${1/y})`,left:i?0:w.x-C.x/y+"px",top:i?0:w.y-C.y/y+"px",width:i?`${t.canvasWidth}px`:`${C.w}px`,height:i?`${t.canvasHeight}px`:`${C.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,o.jsx)(x,{table:e,status:F(e.tableNumber),isSelected:r===e.id,isEditing:i,onClick:l,onMouseDown:s,onTouchStart:d,statusInfo:a[e.tableNumber],currency:h},e.id))}),0===t.tables.length&&(0,o.jsxs)(m,{children:[(0,o.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,a)=>{a.d(t,{Em:()=>i,Ez:()=>o,He:()=>n,Zt:()=>l,h_:()=>r});const n={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],r=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],o={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},l={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);