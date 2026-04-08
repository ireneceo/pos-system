"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5082],{5082:(e,t,n)=>{n.r(t),n.d(t,{default:()=>T});var a=n(9950),r=n(4752),i=n(4492),o=n(7447),l=n(5783),s=n(5030),d=n(4414);const c=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,h=r.Ay.div`
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
`,p=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,u=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,x=r.Ay.button`
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
`,g=r.Ay.div`
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
`,b=r.Ay.div`
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
`,f=r.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
`,v=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,m=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,y=r.Ay.button`
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
`,w=r.Ay.div`
  width: ${e=>"vertical"===e.$variant?"24px":"rectangle"===e.$shape?"36px":"24px"};
  height: ${e=>"vertical"===e.$variant?"36px":"24px"};
  border: 2px solid currentColor;
  border-radius: ${e=>"round"===e.$shape?"50%":"4px"};
`,$=r.Ay.div`
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
`,E=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`,C=r.Ay.div`
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,F=r.Ay.label`
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  margin-bottom: 4px;
`,j=r.Ay.input`
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
`,S=r.Ay.select`
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
`,A=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`,k=r.Ay.div`
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`,z=r.Ay.button`
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
`,B=r.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  margin-top: 8px;
`,D=r.Ay.div`
  font-size: 12px;
  color: ${e=>"success"===e.$type?"#059669":"#6B7C93"};
  font-weight: 500;
`,T=()=>{const{t:e}=(0,s.Bd)("floorplan"),{restaurantId:t}=(0,i.g)(),n=(0,a.useRef)(null),[r,T]=(0,a.useState)(o.He),[M,P]=(0,a.useState)(null),[H,N]=(0,a.useState)(!1),[W,R]=(0,a.useState)({x:0,y:0}),I=(0,a.useRef)(!1),[L,O]=(0,a.useState)([]),[_,X]=(0,a.useState)(!1),[Y,q]=(0,a.useState)(!1),[U,G]=(0,a.useState)(""),[K,J]=(0,a.useState)([]),[V,Z]=(0,a.useState)(""),[Q,ee]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{try{var e;const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${n}`}});if(!a.ok)return;const r=await a.json(),i=r.data||r;if(i.name&&Z(i.name),i.floor_plan&&T(i.floor_plan),null!==(e=i.table_settings)&&void 0!==e&&e.enableTableNumbers){const{totalTables:e,tablePrefix:t}=i.table_settings,n=[];for(let a=1;a<=e;a++)n.push(`${t}${String(a).padStart(3,"0")}`);J(n)}}catch(n){console.error("Failed to load floor plan:",n)}finally{ee(!1)}})()},[t]);const te=r.tables.find(e=>e.id===M)||null,ne=r.tables.map(e=>e.tableNumber),ae=K.filter(e=>!ne.includes(e)),re=e=>{const t={id:`fx-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:"",label:e.textOnly?e.label.toUpperCase():e.label.replace(/ \(.\)$/,"").toUpperCase(),shape:"rectangle",x:r.canvasWidth/2,y:r.canvasHeight/2,width:e.defaultWidth,height:e.defaultHeight,rotation:0,seats:0,tableType:e.type};oe(),T(e=>({...e,tables:[...e.tables,t]})),P(t.id),X(!0)},ie=()=>{M&&(oe(),T(e=>({...e,tables:e.tables.filter(e=>e.id!==M)})),P(null),X(!0))},oe=()=>{O(e=>[...e.slice(-19),JSON.parse(JSON.stringify(r))])},le=()=>{if(0===L.length)return;const e=L[L.length-1];O(e=>e.slice(0,-1)),T(e),P(null),X(!0)},se=e=>{M&&(T(t=>({...t,tables:t.tables.map(t=>t.id===M?{...t,...e}:t)})),X(!0))},de=(0,a.useCallback)(()=>{var e,t;const a=null===(e=n.current)||void 0===e||null===(t=e.querySelector("[data-scaled-layer]"))||void 0===t?void 0:t.parentElement;if(!a)return{x:1,y:1,rect:new DOMRect};const i=a.getBoundingClientRect();return{x:r.canvasWidth/i.width,y:r.canvasHeight/i.height,rect:i}},[r.canvasWidth,r.canvasHeight]),ce=(e,t,n)=>{const a=r.tables.find(e=>e.id===n);if(!a)return;const{x:i,y:o,rect:l}=de();R({x:(e-l.left)*i-a.x,y:(t-l.top)*o-a.y}),oe(),N(!0),P(n)};return(0,a.useEffect)(()=>{if(!H||!M)return;const e=e=>{e.preventDefault();const{clientX:t,clientY:n}=(e=>"touches"in e&&e.touches.length>0?{clientX:e.touches[0].clientX,clientY:e.touches[0].clientY}:"clientX"in e?{clientX:e.clientX,clientY:e.clientY}:{clientX:0,clientY:0})(e),{x:a,y:i,rect:o}=de();let l=(t-o.left)*a-W.x,s=(n-o.top)*i-W.y;r.gridSize>0&&(l=Math.round(l/r.gridSize)*r.gridSize,s=Math.round(s/r.gridSize)*r.gridSize),l=Math.max(0,Math.min(r.canvasWidth,l)),s=Math.max(0,Math.min(r.canvasHeight,s)),T(e=>({...e,tables:e.tables.map(e=>e.id===M?{...e,x:l,y:s}:e)})),X(!0)},t=()=>{N(!1),I.current=!0,setTimeout(()=>{I.current=!1},0)};return document.addEventListener("mousemove",e,{passive:!1}),document.addEventListener("mouseup",t),document.addEventListener("touchmove",e,{passive:!1}),document.addEventListener("touchend",t),()=>{document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t),document.removeEventListener("touchmove",e),document.removeEventListener("touchend",t)}},[H,M,W,de,r.gridSize,r.canvasWidth,r.canvasHeight]),(0,a.useEffect)(()=>{const e=e=>{if("Delete"===e.key||"Backspace"===e.key){const t=e.target.tagName;if("INPUT"===t||"SELECT"===t||"TEXTAREA"===t)return;ie()}(e.metaKey||e.ctrlKey)&&"z"===e.key&&(e.preventDefault(),le())};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[M,L]),Q?(0,d.jsxs)(c,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(p,{children:e("floorplan:floorPlanEditor.floorPlanEditor")})}),(0,d.jsx)(g,{children:(0,d.jsx)("div",{style:{color:"#6B7C93"},children:e("floorplan:floorPlanEditor.loading")})})]}):(0,d.jsxs)(c,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(p,{children:e("floorplan:floorPlanEditor.floorPlanEditor")}),(0,d.jsxs)(u,{children:[U&&(0,d.jsx)(D,{$type:"success",children:U}),_&&(0,d.jsx)(D,{$type:"info",children:e("floorplan:floorPlanEditor.unsavedChanges")}),(0,d.jsx)(x,{$variant:"secondary",onClick:le,disabled:0===L.length,children:"Undo"}),(0,d.jsx)(x,{$variant:"primary",onClick:async()=>{q(!0);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/restaurants/${t}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:V,floor_plan:r})})).ok&&(X(!1),G("Saved"),setTimeout(()=>G(""),2e3))}catch(e){console.error("Failed to save:",e)}finally{q(!1)}},disabled:Y||!_,children:Y?"Saving...":"Save"})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:["Add Table (",ae.length," left)"]}),(0,d.jsxs)(m,{children:[o.Em.map((e,t)=>(0,d.jsxs)(y,{onClick:()=>((e,t)=>{const n=ae[0];if(!n)return;const a=t||o.Em.find(t=>t.value===e),i={id:`ft-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,tableNumber:n,label:n,shape:e,x:r.canvasWidth/2,y:r.canvasHeight/2,width:a.defaultWidth,height:a.defaultHeight,rotation:0,seats:"square"===e?2:4,tableType:"table"};oe(),T(e=>({...e,tables:[...e.tables,i]})),P(i.id),X(!0)})(e.value,e),disabled:0===ae.length,title:`Add ${e.label} table`,children:[(0,d.jsx)(w,{$shape:e.value,$variant:e.variant}),e.label]},`${e.value}-${t}`)),o.h_.filter(e=>!e.textOnly).map((e,t)=>(0,d.jsxs)(y,{onClick:()=>re(e),title:`Add ${e.label}`,children:[(0,d.jsx)(w,{$shape:"rectangle",$variant:"vertical"===e.variant?"vertical":void 0}),e.label]},`counter-${t}`))]})]}),(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{children:e("floorplan:floorPlanEditor.labels")}),(0,d.jsx)(m,{children:o.h_.filter(e=>e.textOnly).map(e=>(0,d.jsxs)(y,{onClick:()=>re(e),title:`Add ${e.label} label`,children:[(0,d.jsx)($,{$type:e.type,children:e.icon}),e.label]},e.type))})]}),te&&(()=>{const t=te.tableType&&"table"!==te.tableType;return(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{children:t?"Fixture Properties":"Table Properties"}),!t&&(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.tableNumber")}),(0,d.jsxs)(S,{value:te.tableNumber,onChange:e=>se({tableNumber:e.target.value,label:e.target.value}),children:[(0,d.jsx)("option",{value:te.tableNumber,children:te.tableNumber}),ae.map(e=>(0,d.jsx)("option",{value:e,children:e},e))]})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.label")}),(0,d.jsx)(j,{value:te.label,onChange:e=>se({label:e.target.value})})]}),!t&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.shape")}),(0,d.jsx)(S,{value:te.shape,onChange:e=>{const t=e.target.value,n=o.Em.find(e=>e.value===t);se({shape:t,width:n.defaultWidth,height:n.defaultHeight})},children:o.Em.map((e,t)=>(0,d.jsx)("option",{value:e.value,children:e.label},`${e.value}-${t}`))})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.size")}),(0,d.jsx)(k,{children:(()=>{const e="rectangle"===te.shape,t=te.width<te.height;return(e?t?[{label:"S",w:55,h:85,seats:2},{label:"M",w:70,h:110,seats:4},{label:"L",w:90,h:140,seats:6}]:[{label:"S",w:85,h:55,seats:2},{label:"M",w:110,h:70,seats:4},{label:"L",w:140,h:90,seats:6}]:[{label:"S",w:60,h:60,seats:2},{label:"M",w:70,h:70,seats:4},{label:"L",w:90,h:90,seats:6}]).map(e=>(0,d.jsx)(z,{$active:te.width===e.w&&te.height===e.h,onClick:()=>se({width:e.w,height:e.h,seats:e.seats}),children:e.label},e.label))})()})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.seats")}),(0,d.jsx)(j,{type:"number",min:1,max:20,value:te.seats,onChange:e=>se({seats:parseInt(e.target.value)||1})})]})]}),(0,d.jsxs)(A,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.width")}),(0,d.jsx)(j,{type:"number",min:30,max:300,value:te.width,onChange:e=>{const t=parseInt(e.target.value)||60;se({width:t,height:"round"===te.shape||"square"===te.shape?t:te.height})}})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.height")}),(0,d.jsx)(j,{type:"number",min:30,max:300,value:te.height,onChange:e=>se({height:parseInt(e.target.value)||60}),disabled:!t&&"rectangle"!==te.shape})]})]}),(0,d.jsxs)(x,{$variant:"danger",onClick:ie,style:{width:"100%",justifyContent:"center",marginTop:"12px"},children:["Delete ",t?"Fixture":"Table"]})]})})(),(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{children:e("floorplan:floorPlanEditor.canvas")}),(0,d.jsxs)(B,{children:[(0,d.jsx)("input",{type:"checkbox",checked:r.showGrid,onChange:e=>{T(t=>({...t,showGrid:e.target.checked})),X(!0)}}),"Show Grid"]}),(0,d.jsxs)(C,{style:{marginTop:"8px"},children:[(0,d.jsx)(F,{children:e("floorplan:floorPlanEditor.gridSize")}),(0,d.jsx)(j,{type:"number",min:10,max:50,step:5,value:r.gridSize,onChange:e=>{T(t=>({...t,gridSize:parseInt(e.target.value)||20})),X(!0)}})]})]})]}),(0,d.jsx)(E,{ref:n,children:(0,d.jsx)(l.A,{floorPlan:r,isEditing:!0,selectedTableId:M,onTableMouseDown:(e,t)=>{e.preventDefault(),e.stopPropagation(),ce(e.clientX,e.clientY,t)},onTableTouchStart:(e,t)=>{e.stopPropagation();const n=e.touches[0];ce(n.clientX,n.clientY,t)},onCanvasClick:()=>{I.current||P(null)}})})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>E});var a=n(9950),r=n(4752),i=n(7447),o=n(5030),l=n(4414);const s=r.Ay.div`
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
`,c=r.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,h=r.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,p=r.Ay.div`
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 1px 5px;
  border-radius: 6px;
  background: #F3F4F6;
  color: #6B7280;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.3px;
  z-index: 5;
  border: 1px solid #D1D5DB;
`,u=r.Ay.div`
  position: absolute;
  top: -6px;
  left: -6px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  background: #635BFF;
  color: white;
  font-size: 9px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  border: 1.5px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
`,x=new Set(["kitchen","entrance"]),g={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},b=a.memo(e=>{let{table:t,status:n="available",isSelected:a=!1,isEditing:r=!1,onClick:b,onMouseDown:f,onTouchStart:v,statusInfo:m,currency:y=""}=e;const w=t.tableType||"table",$="table"!==w,E=x.has(w),C=$?g[w]||g.kitchen:r?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!r&&null!==m&&void 0!==m&&m.orderStatus&&i.v[m.orderStatus]?i.v[m.orderStatus]:i.Ez[n],F=$?{...E?{background:"transparent",border:a&&r?"1.5px dashed #635BFF":"none",boxShadow:a&&r?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${a?"#635BFF":C.border}`},cursor:r?"grab":"default",opacity:r?1:.85}:void 0,j="counter"===w&&t.width<t.height,S=!r&&"staffMeal"===(null===m||void 0===m?void 0:m.paymentMethod),{t:A}=(0,o.Bd)("floorplan");return(0,l.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:E?"square":t.shape,$rotation:t.rotation,$bgColor:E?"transparent":C.bg,$borderColor:E?"transparent":C.border,$textColor:C.text,$isSelected:a&&!E,$isEditing:r,onClick:e=>{r||!b||$||(e.stopPropagation(),b(t.tableNumber))},onMouseDown:e=>{r&&f&&f(e,t.id)},onTouchStart:e=>{r&&v&&v(e,t.id)},style:F,children:[S&&(0,l.jsx)(p,{children:"STAFF"}),!$&&(null===m||void 0===m?void 0:m.orderCount)&&m.orderCount>1&&(0,l.jsx)(u,{children:m.orderCount}),(0,l.jsx)(d,{$textColor:C.text,style:E?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:j?{writingMode:"vertical-rl",textOrientation:"mixed",letterSpacing:"1px"}:void 0,children:t.label||t.tableNumber}),!$&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(c,{$textColor:C.text,children:!r&&null!==m&&void 0!==m&&m.guestCount?`${m.guestCount} guests`:`${t.seats} seats`}),!r&&m&&"available"!==n&&(0,l.jsx)(h,{$textColor:C.text,children:S?"Staff Meal":{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[m.orderStatus||""]||"Occupied"})]})]})});b.displayName="TableNode";const f=b,v=r.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,m=r.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,y=r.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,w=r.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,$=r.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,E=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:r=!1,selectedTableId:i,onTableClick:s,onTableMouseDown:d,onTableTouchStart:c,onCanvasClick:h,currency:p=""}=e;const{t:u}=(0,o.Bd)("common"),x=(0,a.useRef)(null),g=(0,a.useRef)(null),[b,E]=(0,a.useState)(1),[C,F]=(0,a.useState)({x:0,y:0}),j=(0,a.useMemo)(()=>{if(r||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,a=-1/0,i=-1/0;for(const r of t.tables){const t=r.width/2,o=r.height/2;e=Math.min(e,r.x-t),n=Math.min(n,r.y-o),a=Math.max(a,r.x+t),i=Math.max(i,r.y+o)}const o=a-e,l=i-n,s=Math.max(.1*o,40),d=Math.max(.1*l,40);return{x:e-s,y:n-d,w:o+2*s,h:l+2*d}},[t,r]),S=(0,a.useCallback)(()=>{if(!g.current)return;const e=g.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=j.w/e.width,n=j.h/e.height,a=Math.max(t,n);E(a);const r=j.w/a,i=j.h/a;F({x:(e.width-r)/2,y:(e.height-i)/2})},[j]);(0,a.useEffect)(()=>{S();const e=new ResizeObserver(()=>S());return x.current&&e.observe(x.current),()=>e.disconnect()},[S]);const A=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,l.jsx)(v,{ref:x,children:(0,l.jsxs)(m,{ref:g,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===h||void 0===h||h())},children:[r&&t.showGrid&&(0,l.jsx)(y,{$gridSize:t.gridSize,$scale:b}),(0,l.jsx)(w,{"data-scaled-layer":!0,style:{transform:`scale(${1/b})`,left:r?0:C.x-j.x/b+"px",top:r?0:C.y-j.y/b+"px",width:r?`${t.canvasWidth}px`:`${j.w}px`,height:r?`${t.canvasHeight}px`:`${j.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===h||void 0===h||h())},children:t.tables.map(e=>(0,l.jsx)(f,{table:e,status:A(e.tableNumber),isSelected:i===e.id,isEditing:r,onClick:s,onMouseDown:d,onTouchStart:c,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,l.jsxs)($,{children:[(0,l.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),r?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>r,Ez:()=>o,He:()=>a,Zt:()=>l,h_:()=>i,v:()=>s});const a={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},r=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],i=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],o={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EDE9FE",border:"#7C3AED",text:"#6D28D9"},ready:{bg:"#DCFCE7",border:"#16A34A",text:"#15803D"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#B91C1C"},completed:{bg:"#F3F4F6",border:"#9CA3AF",text:"#6B7280"}},l={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention",completed:"Completed"},s={outstanding:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"},pending:{bg:"#FEF9C3",text:"#A16207",border:"#CA8A04"},preparing:{bg:"#EDE9FE",text:"#6D28D9",border:"#7C3AED"},ready:{bg:"#DCFCE7",text:"#15803D",border:"#16A34A"},served:{bg:"#D1FAE5",text:"#047857",border:"#059669"},completed:{bg:"#F3F4F6",text:"#6B7280",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#B91C1C",border:"#DC2626"},awaiting_payment:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"}}}}]);