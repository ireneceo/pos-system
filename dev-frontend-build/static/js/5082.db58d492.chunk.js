"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,a)=>{a.r(t),a.d(t,{default:()=>T});var n=a(9950),i=a(4752),r=a(4492),l=a(7447),o=a(5783),s=a(4414);const d=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  min-height: 0;
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
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: visible;
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
`,y=i.Ay.button`
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
`,m=i.Ay.div`
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
`,k=i.Ay.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`,A=i.Ay.button`
  flex: 1;
  padding: 6px 4px;
  border: 1px solid ${e=>e.$active?"#635BFF":"#E6EBF1"};
  border-radius: 4px;
  background: ${e=>e.$active?"rgba(99, 91, 255, 0.08)":"white"};
  color: ${e=>e.$active?"#635BFF":"#6B7C93"};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s;
  &:hover { border-color: #635BFF; }
`,z=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`,B=i.Ay.div`
  font-size: 12px;
  color: ${e=>"success"===e.$type?"#059669":"#6B7C93"};
  font-weight: 500;
`,T=()=>{const{restaurantId:e}=(0,r.g)(),t=(0,n.useRef)(null),[a,i]=(0,n.useState)(l.He),[T,M]=(0,n.useState)(null),[H,D]=(0,n.useState)(!1),[W,N]=(0,n.useState)({x:0,y:0}),L=(0,n.useRef)(!1),[R,P]=(0,n.useState)([]),[I,O]=(0,n.useState)(!1),[_,X]=(0,n.useState)(!1),[Y,U]=(0,n.useState)(""),[q,G]=(0,n.useState)([]),[K,J]=(0,n.useState)(""),[V,Z]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{var t;const a=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${a}`}});if(!n.ok)return;const r=await n.json(),l=r.data||r;if(l.name&&J(l.name),l.floor_plan&&i(l.floor_plan),null!==(t=l.table_settings)&&void 0!==t&&t.enableTableNumbers){const{totalTables:e,tablePrefix:t}=l.table_settings,a=[];for(let n=1;n<=e;n++)a.push(`${t}${String(n).padStart(3,"0")}`);G(a)}}catch(a){console.error("Failed to load floor plan:",a)}finally{Z(!1)}})()},[e]);const Q=a.tables.find(e=>e.id===T)||null,ee=a.tables.map(e=>e.tableNumber),te=q.filter(e=>!ee.includes(e)),ae=e=>{const t={id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:"",label:e.textOnly?e.label.toUpperCase():e.label.replace(/ \(.\)$/,"").toUpperCase(),shape:"rectangle",x:a.canvasWidth/2,y:a.canvasHeight/2,width:e.defaultWidth,height:e.defaultHeight,rotation:0,seats:0,tableType:e.type};ie(),i(e=>({...e,tables:[...e.tables,t]})),M(t.id),O(!0)},ne=()=>{T&&(ie(),i(e=>({...e,tables:e.tables.filter(e=>e.id!==T)})),M(null),O(!0))},ie=()=>{P(e=>[...e.slice(-19),JSON.parse(JSON.stringify(a))])},re=()=>{if(0===R.length)return;const e=R[R.length-1];P(e=>e.slice(0,-1)),i(e),M(null),O(!0)},le=e=>{T&&(i(t=>({...t,tables:t.tables.map(t=>t.id===T?{...t,...e}:t)})),O(!0))},oe=(0,n.useCallback)(()=>{var e,n;const i=null===(e=t.current)||void 0===e||null===(n=e.querySelector("[data-scaled-layer]"))||void 0===n?void 0:n.parentElement;if(!i)return{x:1,y:1,rect:new DOMRect};const r=i.getBoundingClientRect();return{x:a.canvasWidth/r.width,y:a.canvasHeight/r.height,rect:r}},[a.canvasWidth,a.canvasHeight]),se=(e,t,n)=>{const i=a.tables.find(e=>e.id===n);if(!i)return;const{x:r,y:l,rect:o}=oe();N({x:(e-o.left)*r-i.x,y:(t-o.top)*l-i.y}),ie(),D(!0),M(n)};return(0,n.useEffect)(()=>{if(!H||!T)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:n}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:r,y:l,rect:o}=oe();let s=(t-o.left)*r-W.x,d=(n-o.top)*l-W.y;a.gridSize>0&&(s=Math.round(s/a.gridSize)*a.gridSize,d=Math.round(d/a.gridSize)*a.gridSize),s=Math.max(0,Math.min(a.canvasWidth,s)),d=Math.max(0,Math.min(a.canvasHeight,d)),i(e=>({...e,tables:e.tables.map(e=>e.id===T?{...e,x:s,y:d}:e)})),O(!0)},t=()=>{D(!1),L.current=!0,setTimeout(()=>{L.current=!1},0)};return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[H,T,W,oe,a.gridSize,a.canvasWidth,a.canvasHeight]),(0,n.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;ne()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),re())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[T,R]),V?(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:(0,s.jsx)(h,{children:"Floor Plan Editor"})}),(0,s.jsx)(x,{children:(0,s.jsx)("div",{style:{color:"#6B7C93"},children:"Loading..."})})]}):(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(h,{children:"Floor Plan Editor"}),(0,s.jsxs)(u,{children:[Y&&(0,s.jsx)(B,{$type:"success",children:Y}),I&&(0,s.jsx)(B,{$type:"info",children:"Unsaved changes"}),(0,s.jsx)(p,{$variant:"secondary",onClick:re,disabled:0===R.length,children:"Undo"}),(0,s.jsx)(p,{$variant:"primary",onClick:async()=>{X(!0);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({name:K,floor_plan:a})})).ok&&(O(!1),U("Saved"),setTimeout(()=>U(""),2e3))}catch(t){console.error("Failed to save:",t)}finally{X(!1)}},disabled:_||!I,children:_?"Saving...":"Save"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(g,{children:[(0,s.jsxs)(b,{children:[(0,s.jsxs)(f,{children:["Add Table (",te.length," left)"]}),(0,s.jsxs)(v,{children:[l.Em.map((e,t)=>(0,s.jsxs)(y,{onClick:()=>((e,t)=>{const n=te[0];if(!n)return;const r=t||l.Em.find(t=>t.value===e),o={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:n,label:n,shape:e,x:a.canvasWidth/2,y:a.canvasHeight/2,width:r.defaultWidth,height:r.defaultHeight,rotation:0,seats:"square"===e?2:4,tableType:"table"};ie(),i(e=>({...e,tables:[...e.tables,o]})),M(o.id),O(!0)})(e.value,e),disabled:0===te.length,title:`Add ${e.label} table`,children:[(0,s.jsx)(m,{$shape:e.value,$variant:e.variant}),e.label]},`${e.value}-${t}`)),l.h_.filter(e=>!e.textOnly).map((e,t)=>(0,s.jsxs)(y,{onClick:()=>ae(e),title:`Add ${e.label}`,children:[(0,s.jsx)(m,{$shape:"rectangle",$variant:"vertical"===e.variant?"vertical":void 0}),e.label]},`counter-${t}`))]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Labels"}),(0,s.jsx)(v,{children:l.h_.filter(e=>e.textOnly).map(e=>(0,s.jsxs)(y,{onClick:()=>ae(e),title:`Add ${e.label} label`,children:[(0,s.jsx)($,{$type:e.type,children:e.icon}),e.label]},e.type))})]}),Q&&(()=>{const e=Q.tableType&&"table"!==Q.tableType;return(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:e?"Fixture Properties":"Table Properties"}),!e&&(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Table Number"}),(0,s.jsxs)(F,{value:Q.tableNumber,onChange:e=>le({tableNumber:e.target.value,label:e.target.value}),children:[(0,s.jsx)("option",{value:Q.tableNumber,children:Q.tableNumber}),te.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Label"}),(0,s.jsx)(E,{value:Q.label,onChange:e=>le({label:e.target.value})})]}),!e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Shape"}),(0,s.jsx)(F,{value:Q.shape,onChange:e=>{const t=e.target.value,a=l.Em.find(e=>e.value===t);le({shape:t,width:a.defaultWidth,height:a.defaultHeight})},children:l.Em.map((e,t)=>(0,s.jsx)("option",{value:e.value,children:e.label},`${e.value}-${t}`))})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Size"}),(0,s.jsx)(k,{children:(()=>{const e="rectangle"===Q.shape,t=Q.width<Q.height;return(e?t?[{label:"S",w:55,h:85,seats:2},{label:"M",w:70,h:110,seats:4},{label:"L",w:90,h:140,seats:6}]:[{label:"S",w:85,h:55,seats:2},{label:"M",w:110,h:70,seats:4},{label:"L",w:140,h:90,seats:6}]:[{label:"S",w:60,h:60,seats:2},{label:"M",w:70,h:70,seats:4},{label:"L",w:90,h:90,seats:6}]).map(e=>(0,s.jsx)(A,{$active:Q.width===e.w&&Q.height===e.h,onClick:()=>le({width:e.w,height:e.h,seats:e.seats}),children:e.label},e.label))})()})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Seats"}),(0,s.jsx)(E,{type:"number",min:1,max:20,value:Q.seats,onChange:e=>le({seats:parseInt(e.target.value)||1})})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Width"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:Q.width,onChange:e=>{const t=parseInt(e.target.value)||60;le({width:t,height:"round"===Q.shape||"square"===Q.shape?t:Q.height})}})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Height"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:Q.height,onChange:e=>le({height:parseInt(e.target.value)||60}),disabled:!e&&"rectangle"!==Q.shape})]})]}),(0,s.jsxs)(p,{$variant:"danger",onClick:ne,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:["Delete ",e?"Fixture":"Table"]})]})})(),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Canvas"}),(0,s.jsxs)(z,{children:[(0,s.jsx)("input",{type:"checkbox",checked:a.showGrid,onChange:e=>{i(t=>({...t,showGrid:e.target.checked})),O(!0)}}),"Show Grid"]}),(0,s.jsxs)(j,{style:{marginTop:"8px"},children:[(0,s.jsx)(C,{children:"Grid Size"}),(0,s.jsx)(E,{type:"number",min:10,max:50,step:5,value:a.gridSize,onChange:e=>{i(t=>({...t,gridSize:parseInt(e.target.value)||20})),O(!0)}})]})]})]}),(0,s.jsx)(w,{ref:t,children:(0,s.jsx)(o.A,{floorPlan:a,isEditing:!0,selectedTableId:T,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),se(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const a=e.touches[0];se(a.clientX,a.clientY,t)},onCanvasClick:()=>{L.current||M(null)}})})]})]})}},5783:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(9950),i=a(4752),r=a(7447),l=a(4414);const o=i.Ay.div`
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
`,h=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},p=n.memo(e=>{let{table:t,status:a="available",isSelected:n=!1,isEditing:i=!1,onClick:p,onMouseDown:x,onTouchStart:g,statusInfo:b,currency:f=""}=e;const v=t.tableType||"table",y="table"!==v,m=h.has(v),$=y?u[v]||u.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[a],w=y?{...m?{background:"transparent",border:n&&i?"1.5px dashed #635BFF":"none",boxShadow:n&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${n?"#635BFF":$.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,l.jsxs)(o,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:m?"square":t.shape,$rotation:t.rotation,$bgColor:m?"transparent":$.bg,$borderColor:m?"transparent":$.border,$textColor:$.text,$isSelected:n&&!m,$isEditing:i,onClick:e=>{i||!p||y||(e.stopPropagation(),p(t.tableNumber))},onMouseDown:e=>{i&&x&&x(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:w,children:[(0,l.jsx)(s,{$textColor:$.text,style:m?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!y&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d,{$textColor:$.text,children:!i&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!i&&b&&"available"!==a&&(0,l.jsx)(c,{$textColor:$.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});p.displayName="TableNode";const x=p,g=i.Ay.div`
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
`,m=e=>{let{floorPlan:t,tableStatuses:a={},isEditing:i=!1,selectedTableId:r,onTableClick:o,onTableMouseDown:s,onTableTouchStart:d,onCanvasClick:c,currency:h=""}=e;const u=(0,n.useRef)(null),p=(0,n.useRef)(null),[m,$]=(0,n.useState)(1),[w,j]=(0,n.useState)({x:0,y:0}),C=(0,n.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,a=1/0,n=-1/0,r=-1/0;for(const i of t.tables){const t=i.width/2,l=i.height/2;e=Math.min(e,i.x-t),a=Math.min(a,i.y-l),n=Math.max(n,i.x+t),r=Math.max(r,i.y+l)}const l=n-e,o=r-a,s=Math.max(.1*l,40),d=Math.max(.1*o,40);return{x:e-s,y:a-d,w:l+2*s,h:o+2*d}},[t,i]),E=(0,n.useCallback)(()=>{if(!p.current)return;const e=p.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=C.w/e.width,a=C.h/e.height,n=Math.max(t,a);$(n);const i=C.w/n,r=C.h/n;j({x:(e.width-i)/2,y:(e.height-r)/2})},[C]);(0,n.useEffect)(()=>{E();const e=new ResizeObserver(()=>E());return u.current&&e.observe(u.current),()=>e.disconnect()},[E]);const F=e=>{var t;return(null===(t=a[e])||void 0===t?void 0:t.status)||"available"};return(0,l.jsx)(g,{ref:u,children:(0,l.jsxs)(b,{ref:p,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,l.jsx)(f,{$gridSize:t.gridSize,$scale:m}),(0,l.jsx)(v,{"data-scaled-layer":!0,style:{transform:`scale(${1/m})`,left:i?0:w.x-C.x/m+"px",top:i?0:w.y-C.y/m+"px",width:i?`${t.canvasWidth}px`:`${C.w}px`,height:i?`${t.canvasHeight}px`:`${C.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,l.jsx)(x,{table:e,status:F(e.tableNumber),isSelected:r===e.id,isEditing:i,onClick:o,onMouseDown:s,onTouchStart:d,statusInfo:a[e.tableNumber],currency:h},e.id))}),0===t.tables.length&&(0,l.jsxs)(y,{children:[(0,l.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,a)=>{a.d(t,{Em:()=>i,Ez:()=>l,He:()=>n,Zt:()=>o,h_:()=>r});const n={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],r=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],l={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},o={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);