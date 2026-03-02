"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,n)=>{n.r(t),n.d(t,{default:()=>z});var a=n(9950),i=n(4752),r=n(4492),o=n(7447),l=n(5783),s=n(4414);const d=i.Ay.div`
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
`,z=()=>{const{restaurantId:e}=(0,r.g)(),t=(0,a.useRef)(null),[n,i]=(0,a.useState)(o.He),[z,T]=(0,a.useState)(null),[B,M]=(0,a.useState)(!1),[H,W]=(0,a.useState)({x:0,y:0}),D=(0,a.useRef)(!1),[N,R]=(0,a.useState)([]),[I,L]=(0,a.useState)(!1),[P,O]=(0,a.useState)(!1),[X,_]=(0,a.useState)(""),[Y,U]=(0,a.useState)([]),[q,G]=(0,a.useState)(""),[K,J]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{try{var t;const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${e}`,{headers:{Authorization:`Bearer ${n}`}});if(!a.ok)return;const r=await a.json(),o=r.data||r;if(o.name&&G(o.name),o.floor_plan&&i(o.floor_plan),null!==(t=o.table_settings)&&void 0!==t&&t.enableTableNumbers){const{totalTables:e,tablePrefix:t}=o.table_settings,n=[];for(let a=1;a<=e;a++)n.push(`${t}${String(a).padStart(3,"0")}`);U(n)}}catch(n){console.error("Failed to load floor plan:",n)}finally{J(!1)}})()},[e]);const V=n.tables.find(e=>e.id===z)||null,Z=n.tables.map(e=>e.tableNumber),Q=Y.filter(e=>!Z.includes(e)),ee=e=>{const t={id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:"",label:e.textOnly?e.label.toUpperCase():e.label.replace(/ \(.\)$/,"").toUpperCase(),shape:"rectangle",x:n.canvasWidth/2,y:n.canvasHeight/2,width:e.defaultWidth,height:e.defaultHeight,rotation:0,seats:0,tableType:e.type};ne(),i(e=>({...e,tables:[...e.tables,t]})),T(t.id),L(!0)},te=()=>{z&&(ne(),i(e=>({...e,tables:e.tables.filter(e=>e.id!==z)})),T(null),L(!0))},ne=()=>{R(e=>[...e.slice(-19),JSON.parse(JSON.stringify(n))])},ae=()=>{if(0===N.length)return;const e=N[N.length-1];R(e=>e.slice(0,-1)),i(e),T(null),L(!0)},ie=e=>{z&&(i(t=>({...t,tables:t.tables.map(t=>t.id===z?{...t,...e}:t)})),L(!0))},re=(0,a.useCallback)(()=>{var e,a;const i=null===(e=t.current)||void 0===e||null===(a=e.querySelector("[data-scaled-layer]"))||void 0===a?void 0:a.parentElement;if(!i)return{x:1,y:1,rect:new DOMRect};const r=i.getBoundingClientRect();return{x:n.canvasWidth/r.width,y:n.canvasHeight/r.height,rect:r}},[n.canvasWidth,n.canvasHeight]),oe=(e,t,a)=>{const i=n.tables.find(e=>e.id===a);if(!i)return;const{x:r,y:o,rect:l}=re();W({x:(e-l.left)*r-i.x,y:(t-l.top)*o-i.y}),ne(),M(!0),T(a)};return(0,a.useEffect)(()=>{if(!B||!z)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:a}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:r,y:o,rect:l}=re();let s=(t-l.left)*r-H.x,d=(a-l.top)*o-H.y;n.gridSize>0&&(s=Math.round(s/n.gridSize)*n.gridSize,d=Math.round(d/n.gridSize)*n.gridSize),s=Math.max(0,Math.min(n.canvasWidth,s)),d=Math.max(0,Math.min(n.canvasHeight,d)),i(e=>({...e,tables:e.tables.map(e=>e.id===z?{...e,x:s,y:d}:e)})),L(!0)},t=()=>{M(!1),D.current=!0,setTimeout(()=>{D.current=!1},0)};return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[B,z,H,re,n.gridSize,n.canvasWidth,n.canvasHeight]),(0,a.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;te()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),ae())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[z,N]),K?(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:(0,s.jsx)(h,{children:"Floor Plan Editor"})}),(0,s.jsx)(x,{children:(0,s.jsx)("div",{style:{color:"#6B7C93"},children:"Loading..."})})]}):(0,s.jsxs)(d,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(h,{children:"Floor Plan Editor"}),(0,s.jsxs)(u,{children:[X&&(0,s.jsx)(A,{$type:"success",children:X}),I&&(0,s.jsx)(A,{$type:"info",children:"Unsaved changes"}),(0,s.jsx)(p,{$variant:"secondary",onClick:ae,disabled:0===N.length,children:"Undo"}),(0,s.jsx)(p,{$variant:"primary",onClick:async()=>{O(!0);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${e}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({name:q,floor_plan:n})})).ok&&(L(!1),_("Saved"),setTimeout(()=>_(""),2e3))}catch(t){console.error("Failed to save:",t)}finally{O(!1)}},disabled:P||!I,children:P?"Saving...":"Save"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(g,{children:[(0,s.jsxs)(b,{children:[(0,s.jsxs)(f,{children:["Add Table (",Q.length," left)"]}),(0,s.jsxs)(v,{children:[o.Em.map((e,t)=>(0,s.jsxs)(m,{onClick:()=>((e,t)=>{const a=Q[0];if(!a)return;const r=t||o.Em.find(t=>t.value===e),l={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:a,label:a,shape:e,x:n.canvasWidth/2,y:n.canvasHeight/2,width:r.defaultWidth,height:r.defaultHeight,rotation:0,seats:"square"===e?2:4,tableType:"table"};ne(),i(e=>({...e,tables:[...e.tables,l]})),T(l.id),L(!0)})(e.value,e),disabled:0===Q.length,title:`Add ${e.label} table`,children:[(0,s.jsx)(y,{$shape:e.value,$variant:e.variant}),e.label]},`${e.value}-${t}`)),o.h_.filter(e=>!e.textOnly).map((e,t)=>(0,s.jsxs)(m,{onClick:()=>ee(e),title:`Add ${e.label}`,children:[(0,s.jsx)(y,{$shape:"rectangle",$variant:"vertical"===e.variant?"vertical":void 0}),e.label]},`counter-${t}`))]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Labels"}),(0,s.jsx)(v,{children:o.h_.filter(e=>e.textOnly).map(e=>(0,s.jsxs)(m,{onClick:()=>ee(e),title:`Add ${e.label} label`,children:[(0,s.jsx)($,{$type:e.type,children:e.icon}),e.label]},e.type))})]}),V&&(()=>{const e=V.tableType&&"table"!==V.tableType;return(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:e?"Fixture Properties":"Table Properties"}),!e&&(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Table Number"}),(0,s.jsxs)(F,{value:V.tableNumber,onChange:e=>ie({tableNumber:e.target.value,label:e.target.value}),children:[(0,s.jsx)("option",{value:V.tableNumber,children:V.tableNumber}),Q.map(e=>(0,s.jsx)("option",{value:e,children:e},e))]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Label"}),(0,s.jsx)(E,{value:V.label,onChange:e=>ie({label:e.target.value})})]}),!e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Shape"}),(0,s.jsx)(F,{value:V.shape,onChange:e=>{const t=e.target.value,n=o.Em.find(e=>e.value===t);ie({shape:t,width:n.defaultWidth,height:n.defaultHeight})},children:o.Em.map((e,t)=>(0,s.jsx)("option",{value:e.value,children:e.label},`${e.value}-${t}`))})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Seats"}),(0,s.jsx)(E,{type:"number",min:1,max:20,value:V.seats,onChange:e=>ie({seats:parseInt(e.target.value)||1})})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Width"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:V.width,onChange:e=>{const t=parseInt(e.target.value)||60;ie({width:t,height:"round"===V.shape||"square"===V.shape?t:V.height})}})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(C,{children:"Height"}),(0,s.jsx)(E,{type:"number",min:30,max:300,value:V.height,onChange:e=>ie({height:parseInt(e.target.value)||60}),disabled:!e&&"rectangle"!==V.shape})]})]}),(0,s.jsxs)(p,{$variant:"danger",onClick:te,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:["Delete ",e?"Fixture":"Table"]})]})})(),(0,s.jsxs)(b,{children:[(0,s.jsx)(f,{children:"Canvas"}),(0,s.jsxs)(k,{children:[(0,s.jsx)("input",{type:"checkbox",checked:n.showGrid,onChange:e=>{i(t=>({...t,showGrid:e.target.checked})),L(!0)}}),"Show Grid"]}),(0,s.jsxs)(j,{style:{marginTop:"8px"},children:[(0,s.jsx)(C,{children:"Grid Size"}),(0,s.jsx)(E,{type:"number",min:10,max:50,step:5,value:n.gridSize,onChange:e=>{i(t=>({...t,gridSize:parseInt(e.target.value)||20})),L(!0)}})]})]})]}),(0,s.jsx)(w,{ref:t,children:(0,s.jsx)(l.A,{floorPlan:n,isEditing:!0,selectedTableId:z,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),oe(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const n=e.touches[0];oe(n.clientX,n.clientY,t)},onCanvasClick:()=>{D.current||T(null)}})})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>y});var a=n(9950),i=n(4752),r=n(7447),o=n(4414);const l=i.Ay.div`
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
`,h=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},p=a.memo(e=>{let{table:t,status:n="available",isSelected:a=!1,isEditing:i=!1,onClick:p,onMouseDown:x,onTouchStart:g,statusInfo:b,currency:f=""}=e;const v=t.tableType||"table",m="table"!==v,y=h.has(v),$=m?u[v]||u.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:r.Ez[n],w=m?{...y?{background:"transparent",border:a&&i?"1.5px dashed #635BFF":"none",boxShadow:a&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${a?"#635BFF":$.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,o.jsxs)(l,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:y?"square":t.shape,$rotation:t.rotation,$bgColor:y?"transparent":$.bg,$borderColor:y?"transparent":$.border,$textColor:$.text,$isSelected:a&&!y,$isEditing:i,onClick:e=>{i||!p||m||(e.stopPropagation(),p(t.tableNumber))},onMouseDown:e=>{i&&x&&x(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:w,children:[(0,o.jsx)(s,{$textColor:$.text,style:y?{fontSize:"14px",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!m&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{$textColor:$.text,children:!i&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!i&&b&&"available"!==n&&(0,o.jsxs)(c,{$textColor:$.text,children:[f,b.totalAmount.toFixed(0)," \xb7 ",b.elapsedMinutes,"m"]})]})]})});p.displayName="TableNode";const x=p,g=i.Ay.div`
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
`,y=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:i=!1,selectedTableId:r,onTableClick:l,onTableMouseDown:s,onTableTouchStart:d,onCanvasClick:c,currency:h=""}=e;const u=(0,a.useRef)(null),p=(0,a.useRef)(null),[y,$]=(0,a.useState)(1),[w,j]=(0,a.useState)({x:0,y:0}),C=(0,a.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,a=-1/0,r=-1/0;for(const i of t.tables){const t=i.width/2,o=i.height/2;e=Math.min(e,i.x-t),n=Math.min(n,i.y-o),a=Math.max(a,i.x+t),r=Math.max(r,i.y+o)}const o=a-e,l=r-n,s=Math.max(.15*o,60),d=Math.max(.15*l,60),c=Math.max(0,e-s),h=Math.max(0,n-d);return{x:c,y:h,w:Math.min(t.canvasWidth-c,o+2*s),h:Math.min(t.canvasHeight-h,l+2*d)}},[t,i]),E=(0,a.useCallback)(()=>{if(!p.current)return;const e=p.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=C.w/e.width,n=C.h/e.height,a=Math.max(t,n);$(a);const i=C.w/a,r=C.h/a;j({x:(e.width-i)/2,y:(e.height-r)/2})},[C]);(0,a.useEffect)(()=>{E();const e=new ResizeObserver(()=>E());return p.current&&e.observe(p.current),()=>e.disconnect()},[E]);const F=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"},S=`${C.w} / ${C.h}`;return(0,o.jsx)(g,{ref:u,children:(0,o.jsxs)(b,{ref:p,$aspectRatio:S,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,o.jsx)(f,{$gridSize:t.gridSize,$scale:y}),(0,o.jsx)(v,{"data-scaled-layer":!0,style:{transform:`scale(${1/y})`,left:i?0:w.x-C.x/y+"px",top:i?0:w.y-C.y/y+"px",width:i?`${t.canvasWidth}px`:`${C.w}px`,height:i?`${t.canvasHeight}px`:`${C.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,o.jsx)(x,{table:e,status:F(e.tableNumber),isSelected:r===e.id,isEditing:i,onClick:l,onMouseDown:s,onTouchStart:d,statusInfo:n[e.tableNumber],currency:h},e.id))}),0===t.tables.length&&(0,o.jsxs)(m,{children:[(0,o.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>i,Ez:()=>o,He:()=>a,Zt:()=>l,h_:()=>r});const a={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],r=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],o={available:{bg:"#ECFDF5",border:"#059669",text:"#059669"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},l={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"}}}]);