"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ze});var n=r(9950),o=r(4752),i=r(4492),a=r(1367),s=r(7447),d=r(5783),l=r(6038),c=r(8285),p=r(9018),u=r(5863),x=r(9189),h=r(4414);const g=o.Ay.div`
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
`,m=o.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,b=o.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,y=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,f=o.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,v=o.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,j=o.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,C=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,A=o.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,w=o.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,k=o.Ay.div`
  font-size: 12px;
`,$=o.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,S=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,E=o.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,B=o.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,I=o.Ay.button`
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
`,z=o.Ay.div`
  flex: 1;
  min-width: 0;
`,_=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,D=o.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,T=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,N=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,O=o.Ay.button`
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
`,P=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,M=o.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,R=o.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,W=o.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,H=o.Ay.div`
  display: flex;
  gap: 6px;
`,L=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,q=o.Ay.button`
  padding: 6px 10px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 32px;
  font-size: 12px;
  color: #6B7C93;
  white-space: nowrap;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,J=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,U=o.Ay.div`
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
`,G=o.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`,V=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,Z=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,K=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`,Y=o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,X=o.Ay.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.$danger?"background: #DC2626; color: white; &:hover { background: #B91C1C; }":"background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }"}
`,Q={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},ee={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},te=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),re=e=>{let{tableNumber:t,statusInfo:r,tableInfo:o,currency:i,timezone:a,restaurantId:d,onClose:re,onNewOrder:ne,onStatusChange:oe,onPayment:ie,onNavigateToPOS:ae,onOrderUpdated:se,onClearTable:de,onClearAllCompleted:le,orders:ce=[],selectedOrderIndex:pe=0,onOrderIndexChange:ue}=e;const[xe,he]=(0,n.useState)(!1),{getStoreInfo:ge}=(0,p.Pj)(),[me,be]=(0,n.useState)(null),[ye,fe]=(0,n.useState)(!1),[ve,je]=(0,n.useState)([]),[Ce,Ae]=(0,n.useState)([]),[we,Fe]=(0,n.useState)(!1),[ke,$e]=(0,n.useState)(""),[Se,Ee]=(0,n.useState)(!1),[Be,Ie]=(0,n.useState)(null),ze=(0,n.useCallback)(async()=>{if(d)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch(`/api/menu?restaurantId=${d}`,{headers:t});if(r.ok){var e;const t=await r.json(),n=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});je(n.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[d]);(0,n.useEffect)(()=>{ye?ze():(Ae([]),$e(""))},[ye,ze]);const _e=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");Ae(o=>{if(0===r.length){const r=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=o.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const i=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},De=r&&"available"!==r.status,Te=(null===r||void 0===r?void 0:r.orderStatus)||"",Ne=(null===r||void 0===r?void 0:r.paymentStatus)||"pending",Oe=((e,t)=>{switch(e){case"outstanding":return{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Te,Ne),Pe=(null===r||void 0===r?void 0:r.orderItems)||[],Me=["preparing","ready","served"].includes(Te),Re=De&&s.v[Te]?s.v[Te]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},We=(()=>{switch(Ne){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),He={};Pe.forEach((e,t)=>{const r=e.order_group||0;He[r]||(He[r]=[]),He[r].push({...e,_originalIndex:t})});const Le=Object.keys(He).map(Number).sort((e,t)=>e-t),qe=e=>{if(!e)return"-";const t=new Date(e),r=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...r})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...r})},Je=(e,n)=>{if(!r)return null;const o=e||Pe;return{orderNumber:r.orderNumber||"",pickupNumber:(r.orderNumber||"").split("-")[1]||"",date:r.orderCreatedAt?new Date(r.orderCreatedAt):new Date,orderType:r.orderType||"dine_in",orderSource:r.orderSource||"pos",tableNumber:t||null,pagerNumber:null,customerName:r.customerName||"Walk-in Customer",groupLabel:n,items:o.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:r.notes||"",takeawayCharge:0}},Ue=async()=>{const e=Je();e&&0!==Pe.length&&await(0,u.Si)(e,ge())},Ge="pending"===Te?"outstanding":te(Te),Ve=Pe.some(e=>(e.order_group||0)>0);return(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)("h3",{children:["Table ",t]}),(0,h.jsxs)(y,{children:[null!==r&&void 0!==r&&r.guestCount?(0,h.jsxs)("span",{children:[r.guestCount," guests"]}):o?(0,h.jsxs)("span",{children:[o.seats," seats"]}):null,De&&(0,h.jsxs)("span",{children:[r.elapsedMinutes,"min"]})]}),De&&(0,h.jsxs)(v,{children:[(0,h.jsx)(j,{$color:Re.text,$bg:Re.bg,children:Q[Te]||r.status}),(0,h.jsx)(j,{$color:We.color,$bg:We.bg,children:"completed"===Ne||"paid"===Ne?"Paid":"Unpaid"})]}),!De&&(0,h.jsx)(v,{children:(0,h.jsx)(j,{$color:Re.text,$bg:Re.bg,children:"Available"})})]}),(0,h.jsx)(f,{onClick:re,children:"\xd7"})]}),ce.length>1&&(0,h.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[ce.map((e,t)=>{var r;return(0,h.jsxs)("button",{onClick:()=>null===ue||void 0===ue?void 0:ue(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:pe===t?600:400,border:pe===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:pe===t?"#EDE9FE":"white",color:pe===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(r=e.orderNumber)||void 0===r?void 0:r.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,h.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[ce.length," orders"]})]}),De?ye?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(C,{style:{padding:"16px 20px"},children:[(0,h.jsx)("div",{style:{marginBottom:"16px"},children:(0,h.jsx)("input",{type:"text",placeholder:"Search menu items...",value:ke,onChange:e=>$e(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),ke.length>0&&(0,h.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[ve.filter(e=>{if(!e||!e.name)return!1;const t=ke.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,h.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,h.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{_e(e,1,[]),$e("")},children:[(0,h.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,h.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,h.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,i)}),t&&(0,h.jsx)("button",{onClick:t=>{t.stopPropagation(),Ie(e),Ee(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===ve.filter(e=>{var t;const r=ke.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(r))||e.code&&e.code.toLowerCase().includes(r)}).length&&(0,h.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,h.jsxs)("div",{children:[(0,h.jsxs)(w,{style:{marginBottom:"10px"},children:["Items to Add (",Ce.reduce((e,t)=>e+t.quantity,0),")"]}),0===Ce.length?(0,h.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,h.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Ce.map(e=>(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,h.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,h.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,h.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,h.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),i)," each"]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,h.jsx)("button",{onClick:()=>{return t=e.cartId,void Ae(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,h.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,h.jsx)("button",{onClick:()=>{return t=e.cartId,void Ae(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,h.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(Ce.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),i)]})}),(0,h.jsx)(W,{$variant:"primary",onClick:async()=>{if(null!==r&&void 0!==r&&r.orderId&&0!==Ce.length)try{Fe(!0);const e=localStorage.getItem("auth_token"),t=Ce.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),n=await fetch(`/api/orders/${r.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!n.ok){const e=await n.json();throw new Error(e.message||"Failed to add items")}fe(!1),Ae([]),$e(""),se()}catch(e){console.error("Add items error:",e)}finally{Fe(!1)}},disabled:0===Ce.length||we,children:we?"Adding...":"Add to Order"}),(0,h.jsx)(W,{$variant:"secondary",onClick:()=>{fe(!1),Ae([]),$e("")},children:"Cancel"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{children:["Order ",r.orderNumber||"",r.customerName&&"Walk-in Customer"!==r.customerName?` \u2014 ${r.customerName}`:""]}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Customer"}),(0,h.jsx)(S,{children:r.customerName||"Walk-in"})]}),r.customerPhone&&(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Phone"}),(0,h.jsx)(S,{children:r.customerPhone})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Type"}),(0,h.jsx)(S,{children:(r.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Source"}),(0,h.jsx)(S,{children:ee[r.orderSource||"pos"]||r.orderSource})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Time"}),(0,h.jsx)(S,{children:qe(r.orderCreatedAt)})]}),r.paymentMethod&&(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Payment"}),(0,h.jsx)(S,{children:(0,c.MA)(r.paymentMethod,r.cardType)})]}),r.cashierName&&(0,h.jsxs)(k,{children:[(0,h.jsx)($,{children:"Cashier"}),(0,h.jsx)(S,{children:r.cashierName})]})]})]}),(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{children:["Items (",Pe.length,")",Me&&Pe.length>0&&` \u2014 ${Pe.filter(e=>"completed"===e.status).length}/${Pe.length} served`]}),Le.map(e=>{const t=He[e],n=e>0,o=t[0];return(0,h.jsxs)("div",{children:[(Le.length>1||n)&&(0,h.jsxs)(E,{$isAdded:n,children:[(0,h.jsx)("span",{children:n?`+Added #${e}`:"Original Order"}),n&&(null===o||void 0===o?void 0:o.added_at)&&(0,h.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:qe(o.added_at)})]}),t.map(e=>{const t=e._originalIndex,n="completed"===e.status,o=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,h.jsxs)(B,{$completed:n&&Me,children:[Me&&(0,h.jsx)(I,{$checked:n,onClick:()=>(async e=>{if(!xe&&null!==r&&void 0!==r&&r.orderId){he(!0);try{const t=Pe.map((t,r)=>r===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${r.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Te)&&await fetch(`/api/orders/${r.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"served"})}),se())}catch(t){}he(!1)}})(t),disabled:xe,title:n?"Mark as not served":"Mark as served",children:n?"\u2713":""}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(_,{$completed:n,children:[e.name," ",(0,h.jsxs)(N,{children:["x",e.quantity]})]}),o&&(0,h.jsx)(D,{children:o})]}),(0,h.jsx)(T,{children:(0,l.vv)(e.price*e.quantity,i)}),"completed"!==Ne&&Pe.length>1&&(0,h.jsx)(O,{onClick:()=>{return n=t,o=e.name,void(null!==r&&void 0!==r&&r.orderId&&be({title:"Delete Item",message:`Delete "${o}" from this order?`,onConfirm:async()=>{be(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${r.orderId}/items/${n}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&se()}catch(e){}}}));var n,o},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Pe.length&&(0,h.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,h.jsxs)(A,{style:{borderBottom:"none"},children:[(0,h.jsx)(w,{children:"Summary"}),(0,h.jsxs)(P,{children:[(0,h.jsx)("span",{children:"Subtotal"}),(0,h.jsx)("span",{children:(0,l.vv)(r.subtotal||0,i)})]}),(r.discountPolicyAmount||0)>0&&(0,h.jsxs)(P,{children:[(0,h.jsxs)("span",{children:["Discount",r.discountPolicyName?` (${r.discountPolicyName})`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(r.discountPolicyAmount||0,i)]})]}),(r.couponDiscount||0)>0&&(0,h.jsxs)(P,{children:[(0,h.jsxs)("span",{children:["Coupon",r.couponCode?` (${r.couponCode})`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(r.couponDiscount||0,i)]})]}),(r.pointDiscount||0)>0&&(0,h.jsxs)(P,{children:[(0,h.jsxs)("span",{children:["Points",r.pointsUsed?` (${r.pointsUsed} pts)`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(r.pointDiscount||0,i)]})]}),(r.discount||0)>0&&!r.couponDiscount&&!r.discountPolicyAmount&&!r.pointDiscount&&(0,h.jsxs)(P,{children:[(0,h.jsx)("span",{children:"Discount"}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(r.discount||0,i)]})]}),(r.serviceCharge||0)>0&&(0,h.jsxs)(P,{children:[(0,h.jsxs)("span",{children:["Svc Charge",r.serviceChargeRate?` (${r.serviceChargeRate}%)`:""]}),(0,h.jsx)("span",{children:(0,l.vv)(r.serviceCharge||0,i)})]}),(r.tax||0)>0&&(0,h.jsxs)(P,{children:[(0,h.jsxs)("span",{children:["Tax",r.taxRate?` (${r.taxRate}%)`:""]}),(0,h.jsx)("span",{children:(0,l.vv)(r.tax||0,i)})]}),(0,h.jsxs)(P,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:(0,l.vv)(r.totalAmount,i)})]}),r.notes&&(0,h.jsx)(M,{children:r.notes})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsxs)(L,{children:[(0,h.jsxs)(q,{onClick:async()=>{const e=r?{orderNumber:r.orderNumber||"",pickupNumber:(r.orderNumber||"").split("-")[1]||"",tableNumber:t||null,pagerNumber:null,date:r.orderCreatedAt?new Date(r.orderCreatedAt):new Date,items:Pe.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(r.subtotal||0)),discount:parseFloat(String(r.discount||0)),coupon:r.couponCode?{code:r.couponCode,discount:parseFloat(String(r.couponDiscount||0))}:null,serviceCharge:parseFloat(String(r.serviceCharge||0)),serviceChargeRate:parseFloat(String(r.serviceChargeRate||10)),tax:parseFloat(String(r.tax||0)),taxRate:parseFloat(String(r.taxRate||6)),total:parseFloat(String(r.totalAmount||0)),paymentMethod:r.paymentMethod||"cash",amountReceived:0,change:0,cashierName:r.cashierName||null}:null;e&&0!==Pe.length&&await(0,u.pG)(e,ge())},title:"Print Bill",children:[(0,h.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,h.jsxs)(q,{onClick:Ue,title:"Print Order Ticket",children:[(0,h.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),Ve&&(0,h.jsx)(q,{onClick:async()=>{if(0===Pe.length)return;const e=Pe.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void Ue();const r=Pe.filter(e=>(e.order_group||0)===t),n=Je(r,`+Order ${t}`);n&&await(0,u.Si)(n,ge())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,h.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M12 4v16m8-8H4"})})}),Ge&&(0,h.jsx)(q,{onClick:async()=>{if(null===r||void 0===r||!r.orderId||xe)return;const e="pending"===Te?"outstanding":te(Te);if(e){he(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${r.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),se()}catch(t){}he(!1)}},title:`Revert to ${Q[Ge]||Ge}`,children:(0,h.jsx)(J,{children:"\u21ba"})}),"completed"!==Te&&"cancelled"!==Te&&"pending"!==Ne&&"payment_verification_pending"!==Ne&&r.orderId&&(0,h.jsx)(q,{onClick:()=>oe(r.orderId,"completed"),title:"Mark as Completed",children:(0,h.jsx)(J,{children:"\u2713"})})]}),Oe&&r.orderId&&"completed"!==Te&&"cancelled"!==Te&&(0,h.jsx)(W,{$variant:"primary",onClick:()=>oe(r.orderId,Oe.status),disabled:xe,style:"outstanding"===Te?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Te?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===Oe.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Oe.label}),"payment_verification_pending"===Ne&&(0,h.jsx)(W,{$variant:"success",onClick:async()=>{if(null!==r&&void 0!==r&&r.orderId){he(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${r.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),se()}catch(e){}he(!1)}},disabled:xe,children:"Confirm Payment"}),(0,h.jsxs)(H,{children:["pending"===Ne&&!["served","completed","cancelled"].includes(Te)&&(0,h.jsx)(W,{$variant:"secondary",onClick:()=>fe(!0),children:"Add Items"}),"pending"===Ne&&(0,h.jsx)(W,{$variant:"served"===Te?"success":"secondary",onClick:ie,children:"Payment"})]}),"cancelled"!==Te&&"completed"!==Te&&(0,h.jsx)(W,{$variant:"danger",onClick:()=>{null!==r&&void 0!==r&&r.orderId&&be({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{be(null),he(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${r.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),se()}catch(e){}he(!1)}})},disabled:xe,children:"Cancel Order"}),"completed"===Te&&r.orderId&&(0,h.jsx)(W,{$variant:"primary",onClick:()=>de(r.orderId),disabled:xe,children:"Leaved"}),(0,h.jsx)(W,{$variant:"link",onClick:ae,children:"Open in POS Terminal \u2197"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(U,{children:[(0,h.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,h.jsx)("p",{children:"This table is available"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(W,{$variant:"primary",onClick:ne,children:"+ New Order"}),(0,h.jsx)(W,{$variant:"link",onClick:ae,children:"Open in POS Terminal \u2197"})]})]}),Be&&(0,h.jsx)(x.A,{isOpen:Se,onClose:()=>{Ee(!1),Ie(null)},menuItem:{id:Be.id,name:Be.name,price:parseFloat(Be.price)||0,emoji:Be.emoji||"",image:Be.image,optionGroups:Be.optionGroups},onConfirm:(e,t,r)=>{_e(Be,e,r),Ee(!1),Ie(null),$e("")}}),me&&(0,h.jsx)(G,{onClick:()=>be(null),children:(0,h.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(Z,{children:me.title}),(0,h.jsx)(K,{children:me.message}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(X,{onClick:()=>be(null),children:"Cancel"}),(0,h.jsx)(X,{$danger:!0,onClick:me.onConfirm,children:"Confirm"})]})]})})]})},ne=o.Ay.div`
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
`,oe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ie=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,ae=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,se=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,de=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,le=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,ce=e=>{let{tables:t,tableStatuses:r,currency:n}=e;const o=t.length,i={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=r[e.tableNumber],n=(null===t||void 0===t?void 0:t.status)||"available";i[n]++,"available"!==n&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,h.jsxs)(ne,{children:[(0,h.jsx)(oe,{children:Object.keys(s.Ez).map(e=>(0,h.jsxs)(ie,{children:[(0,h.jsx)(ae,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,h.jsx)(se,{}),(0,h.jsxs)(de,{children:[(0,h.jsxs)(le,{children:["Tables: ",(0,h.jsx)("span",{children:o})]}),(0,h.jsxs)(le,{children:["Avail: ",(0,h.jsx)("span",{children:i.available})]}),(0,h.jsxs)(le,{children:["Occupied: ",(0,h.jsx)("span",{children:i.occupied})]}),i.ready>0&&(0,h.jsxs)(le,{children:["Ready: ",(0,h.jsx)("span",{children:i.ready})]}),i["needs-attention"]>0&&(0,h.jsxs)(le,{children:["Attn: ",(0,h.jsx)("span",{children:i["needs-attention"]})]}),(0,h.jsx)(se,{}),(0,h.jsxs)(le,{children:["Today: ",(0,h.jsx)("span",{children:(0,l.vv)(a,n)})]}),p>0&&(0,h.jsxs)(le,{children:["Avg: ",(0,h.jsxs)("span",{children:[p,"min"]})]})]})]})};var pe=r(2966),ue=r(8406),xe=r(3422);const he=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ge=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,me=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,be=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,ye=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,fe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,ve=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,je=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,Ce=o.Ay.button`
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
`,Ae=o.Ay.button`
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
`,we=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,Fe=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,ke=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,$e=o.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,Se=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,Ee=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,Be=o.Ay.button`
  background: rgba(255,255,255,0.15);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: rgba(255,255,255,0.25); }
`,Ie=o.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,ze=()=>{var e;const{restaurantId:t}=(0,i.g)(),r=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,n.useState)(s.He),[p,u]=(0,n.useState)({}),[x,g]=(0,n.useState)(!1),[m,b]=(0,n.useState)(""),[y,f]=(0,n.useState)(!0),[v,j]=(0,n.useState)(""),[C,A]=(0,n.useState)("Asia/Kuala_Lumpur"),w=(0,n.useRef)(null),F=(0,n.useRef)(null),[k,$]=(0,n.useState)(null),[S,E]=(0,n.useState)(0),[B,I]=(0,n.useState)(!1),[z,_]=(0,n.useState)(null),[D,T]=(0,n.useState)(null),[N,O]=(0,n.useState)(!1),[P,M]=(0,n.useState)(""),[R,W]=(0,n.useState)(null);(0,n.useEffect)(()=>{const e=()=>{const e=new Date;b(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const H=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),L=(0,n.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>H(),2e3)},[H]);(0,n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)return;const n=await r.json(),o=n.data||n;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,ue.ng)(e))}o.payment_settings&&_(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&n.data&&T(n.data)}catch(e){}})(),H()},[t,H]),(0,n.useEffect)(()=>{if(!t)return;const e=(0,xe.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),H()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>L()),e.on("order-created",()=>L()),e.on("order-items-added",e=>{L(),W({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>L()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,H,L]),(0,n.useEffect)(()=>{const e=setInterval(()=>H(),3e4);return()=>clearInterval(e)},[H]),(0,n.useEffect)(()=>{const e=e=>{var t,r;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(r=e.data)||void 0===r?void 0:r.type)||(O(!1),M(""),H())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[H]);const q=k?p[k]:void 0,J=(null===q||void 0===q?void 0:q.orders)||(q?[q]:[]),U=Math.min(S,Math.max(J.length-1,0)),G=J.length>0?J[U]:q,V=k?l.tables.find(e=>e.tableNumber===k):void 0;return y?(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{children:(0,h.jsx)(me,{children:(0,h.jsx)(be,{children:"Floor Plan"})})}),(0,h.jsx)(ke,{children:"Loading floor plan..."})]}):(0,h.jsxs)(he,{children:[(null===R||void 0===R?void 0:R.isVisible)&&(0,h.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,h.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,h.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,h.jsx)("button",{onClick:()=>W(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,h.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,h.jsxs)("strong",{children:["Order ",R.orderNumber]}),R.tableNumber&&` (Table ${R.tableNumber})`,(0,h.jsx)("br",{}),(0,h.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",R.orderGroup]})," ",R.itemCount," item",R.itemCount>1?"s":""," added"]}),(0,h.jsx)("button",{onClick:()=>{R.tableNumber&&$(R.tableNumber),W(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,h.jsxs)(ge,{children:[(0,h.jsxs)(me,{children:[(0,h.jsx)(Ae,{onClick:()=>r(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,h.jsx)(be,{children:"Floor Plan"}),(0,h.jsxs)(fe,{children:[(0,h.jsx)(ye,{$connected:x}),x?"Live":"Offline"]})]}),(0,h.jsxs)(ve,{children:[(0,h.jsx)(je,{children:m}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,h.jsx)(Ce,{onClick:()=>r(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,h.jsxs)(we,{children:[(0,h.jsx)(Fe,{children:(0,h.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{$(t=>t===e?null:e),E(0)},selectedTableId:k?null===(e=l.tables.find(e=>e.tableNumber===k))||void 0===e?void 0:e.id:null,currency:v})}),k&&(0,h.jsx)(re,{tableNumber:k,statusInfo:G,tableInfo:V,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>$(null),onNewOrder:()=>{if(!k)return;const e=new URLSearchParams;e.set("table",k),e.set("from","floor-plan-overlay"),M(`/restaurant/${t}/pos-terminal?${e.toString()}`),O(!0)},onStatusChange:async(e,t)=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:t})})).ok&&await H()}catch(r){console.error("Failed to update order status:",r)}},onPayment:()=>{I(!0)},onNavigateToPOS:()=>{k&&r(`/restaurant/${t}/pos-terminal?table=${k}&from=floor-plan`)},onOrderUpdated:H,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),$(null),await H()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(k)try{const e=localStorage.getItem("auth_token"),t=J.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),$(null),await H()}catch(e){console.error("Failed to clear table:",e)}},orders:J,selectedOrderIndex:U,onOrderIndexChange:E})]}),(0,h.jsx)(ce,{tables:l.tables,tableStatuses:p,currency:v}),B&&G&&(0,h.jsx)(pe.A,{isOpen:B,onClose:()=>I(!1),total:Number(G.totalAmount||0),subtotal:Number(G.subtotal||G.totalAmount||0),tax:Number(G.tax||0),serviceCharge:Number(G.serviceCharge||0),discountAmount:Number(G.discount||0),couponDiscount:Number(G.couponDiscount||0),onConfirmPayment:async(e,t,r,n,o,i)=>{if(!k)return;const a=p[k];if(null!==a&&void 0!==a&&a.orderId)try{const t=localStorage.getItem("auth_token"),r={payment_status:"completed",payment_method:e,card_type:"card"===e&&i||null};n&&n>0&&o&&o>0&&(r.points_used=n,r.point_discount=o,r.total_amount=(a.totalAmount||0)-o);(await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(r)})).ok&&("outstanding"===a.orderStatus?await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"pending"})}):"served"===a.orderStatus&&await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"completed"})}),I(!1),await H())}catch(s){console.error("Failed to process payment:",s)}},paymentMethods:z,customerId:G.customerId||void 0,restaurantId:Number(t),membershipSettings:D}),(0,h.jsxs)($e,{$isOpen:N,children:[(0,h.jsxs)(Se,{children:[(0,h.jsxs)(Ee,{children:["POS Terminal \u2014 Table ",k]}),(0,h.jsx)(Be,{onClick:()=>{O(!1),M(""),H()},children:"\xd7 Close"})]}),N&&P&&(0,h.jsx)(Ie,{src:P,title:"POS Terminal"})]})]})}},5783:(e,t,r)=>{r.d(t,{A:()=>C});var n=r(9950),o=r(4752),i=r(7447),a=r(4414);const s=o.Ay.div`
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
`,d=o.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  line-height: 1;
`,l=o.Ay.div`
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
`,p=o.Ay.div`
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
`,u=o.Ay.div`
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
`,x=new Set(["kitchen","entrance"]),h={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},g=n.memo(e=>{let{table:t,status:r="available",isSelected:n=!1,isEditing:o=!1,onClick:g,onMouseDown:m,onTouchStart:b,statusInfo:y,currency:f=""}=e;const v=t.tableType||"table",j="table"!==v,C=x.has(v),A=j?h[v]||h.kitchen:o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!o&&null!==y&&void 0!==y&&y.orderStatus&&i.v[y.orderStatus]?i.v[y.orderStatus]:i.Ez[r],w=j?{...C?{background:"transparent",border:n&&o?"1.5px dashed #635BFF":"none",boxShadow:n&&o?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${n?"#635BFF":A.border}`},cursor:o?"grab":"default",opacity:o?1:.85}:void 0,F="counter"===v&&t.width<t.height,k=!o&&"staffMeal"===(null===y||void 0===y?void 0:y.paymentMethod);return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:C?"square":t.shape,$rotation:t.rotation,$bgColor:C?"transparent":A.bg,$borderColor:C?"transparent":A.border,$textColor:A.text,$isSelected:n&&!C,$isEditing:o,onClick:e=>{o||!g||j||(e.stopPropagation(),g(t.tableNumber))},onMouseDown:e=>{o&&m&&m(e,t.id)},onTouchStart:e=>{o&&b&&b(e,t.id)},style:w,children:[k&&(0,a.jsx)(p,{children:"STAFF"}),!j&&(null===y||void 0===y?void 0:y.orderCount)&&y.orderCount>1&&(0,a.jsx)(u,{children:y.orderCount}),(0,a.jsx)(d,{$textColor:A.text,style:C?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:F?{writingMode:"vertical-rl",textOrientation:"mixed",letterSpacing:"1px"}:void 0,children:t.label||t.tableNumber}),!j&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:A.text,children:!o&&null!==y&&void 0!==y&&y.guestCount?`${y.guestCount} guests`:`${t.seats} seats`}),!o&&y&&"available"!==r&&(0,a.jsx)(c,{$textColor:A.text,children:k?"Staff Meal":{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[y.orderStatus||""]||"Occupied"})]})]})});g.displayName="TableNode";const m=g,b=o.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,y=o.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,f=o.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,v=o.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,j=o.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,C=e=>{let{floorPlan:t,tableStatuses:r={},isEditing:o=!1,selectedTableId:i,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const u=(0,n.useRef)(null),x=(0,n.useRef)(null),[h,g]=(0,n.useState)(1),[C,A]=(0,n.useState)({x:0,y:0}),w=(0,n.useMemo)(()=>{if(o||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,r=1/0,n=-1/0,i=-1/0;for(const o of t.tables){const t=o.width/2,a=o.height/2;e=Math.min(e,o.x-t),r=Math.min(r,o.y-a),n=Math.max(n,o.x+t),i=Math.max(i,o.y+a)}const a=n-e,s=i-r,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:r-l,w:a+2*d,h:s+2*l}},[t,o]),F=(0,n.useCallback)(()=>{if(!x.current)return;const e=x.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=w.w/e.width,r=w.h/e.height,n=Math.max(t,r);g(n);const o=w.w/n,i=w.h/n;A({x:(e.width-o)/2,y:(e.height-i)/2})},[w]);(0,n.useEffect)(()=>{F();const e=new ResizeObserver(()=>F());return u.current&&e.observe(u.current),()=>e.disconnect()},[F]);const k=e=>{var t;return(null===(t=r[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(b,{ref:u,children:(0,a.jsxs)(y,{ref:x,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[o&&t.showGrid&&(0,a.jsx)(f,{$gridSize:t.gridSize,$scale:h}),(0,a.jsx)(v,{"data-scaled-layer":!0,style:{transform:`scale(${1/h})`,left:o?0:C.x-w.x/h+"px",top:o?0:C.y-w.y/h+"px",width:o?`${t.canvasWidth}px`:`${w.w}px`,height:o?`${t.canvasHeight}px`:`${w.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(m,{table:e,status:k(e.tableNumber),isSelected:i===e.id,isEditing:o,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:r[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(j,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,r)=>{r.d(t,{Em:()=>o,Ez:()=>a,He:()=>n,Zt:()=>s,h_:()=>i,v:()=>d});const n={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],i=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EDE9FE",border:"#7C3AED",text:"#6D28D9"},ready:{bg:"#DCFCE7",border:"#16A34A",text:"#15803D"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#B91C1C"},completed:{bg:"#F3F4F6",border:"#9CA3AF",text:"#6B7280"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention",completed:"Completed"},d={outstanding:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"},pending:{bg:"#FEF9C3",text:"#A16207",border:"#CA8A04"},preparing:{bg:"#EDE9FE",text:"#6D28D9",border:"#7C3AED"},ready:{bg:"#DCFCE7",text:"#15803D",border:"#16A34A"},served:{bg:"#D1FAE5",text:"#047857",border:"#059669"},completed:{bg:"#F3F4F6",text:"#6B7280",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#B91C1C",border:"#DC2626"},awaiting_payment:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"}}}}]);