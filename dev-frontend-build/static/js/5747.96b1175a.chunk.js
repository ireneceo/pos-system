"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ne});var r=n(9950),o=n(4752),i=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(8285),p=n(9018),u=n(5863),x=n(9189),h=n(8409),g=n(4414);const m=o.Ay.div`
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
`,y=o.Ay.div`
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
`,f=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,v=o.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,j=o.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,C=o.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,A=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,w=o.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,F=o.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,k=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,S=o.Ay.div`
  font-size: 12px;
`,$=o.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,E=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,B=o.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,z=o.Ay.div`
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
`,_=o.Ay.div`
  flex: 1;
  min-width: 0;
`,T=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,D=o.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,N=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,O=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,P=o.Ay.button`
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
`,R=o.Ay.div`
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
`,W=o.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,H=o.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,L=o.Ay.div`
  display: flex;
  gap: 6px;
`,q=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,J=o.Ay.button`
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
`,V=o.Ay.span`
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
`,G=(0,o.Ay)(h.yl)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`,Z=(0,o.Ay)(h.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`,K=o.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`,Y=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,X=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,Q=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`,ee=o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,te=o.Ay.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.$danger?"background: #FEF2F2; color: #EF4444; border: 1px solid #EF4444; &:hover { background: #FEE2E2; }":"background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }"}
`,ne={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},re={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},oe=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),ie=e=>{var t;let{tableNumber:n,statusInfo:o,tableInfo:i,currency:a,timezone:d,restaurantId:ie,onClose:ae,onNewOrder:se,onStatusChange:de,onPayment:le,onNavigateToPOS:ce,onOrderUpdated:pe,onClearTable:ue,onClearAllCompleted:xe,orders:he=[],selectedOrderIndex:ge=0,onOrderIndexChange:me}=e;const[ye,be]=(0,r.useState)(!1),{getStoreInfo:fe,paymentSettings:ve}=(0,p.Pj)(),[je,Ce]=(0,r.useState)(null),[Ae,we]=(0,r.useState)(!1),[Fe,ke]=(0,r.useState)([]),[Se,$e]=(0,r.useState)([]),[Ee,Be]=(0,r.useState)(!1),[ze,Ie]=(0,r.useState)(""),[_e,Te]=(0,r.useState)(!1),[De,Ne]=(0,r.useState)(null),Oe=(0,r.useCallback)(async()=>{if(ie)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch(`/api/menu?restaurantId=${ie}`,{headers:t});if(n.ok){var e;const t=await n.json(),r=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});ke(r.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[ie]);(0,r.useEffect)(()=>{Ae?Oe():($e([]),Ie(""))},[Ae,Oe]);const Pe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=n.map(e=>e.id||e.name).sort().join(",");$e(o=>{if(0===n.length){const n=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}else{const n=o.find(t=>{var n;return t.menuItemId===e.id&&(null===(n=t.selectedOptions)||void 0===n?void 0:n.map(e=>e.id||e.name).sort().join(","))===r});if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}const i=n.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:n,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Re=o&&"available"!==o.status,Me=(null===o||void 0===o?void 0:o.orderStatus)||"",We=(null===o||void 0===o?void 0:o.paymentStatus)||"pending",He=((e,t)=>{switch(e){case"outstanding":return"payment_verification_pending"===t||"rejected"===t?null:{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Me,We),Le=(null===o||void 0===o?void 0:o.orderItems)||[],qe=["preparing","ready","served"].includes(Me),Je=Re&&s.v[Me]?s.v[Me]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},Ve=(()=>{switch(We){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":case"rejected":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),Ue={};Le.forEach((e,t)=>{const n=e.order_group||0;Ue[n]||(Ue[n]=[]),Ue[n].push({...e,_originalIndex:t})});const Ge=Object.keys(Ue).map(Number).sort((e,t)=>e-t),Ze=e=>{if(!e)return"-";const t=new Date(e),n=d?{timeZone:d}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},[Ke,Ye]=(0,r.useState)(!1),Xe=(e,t)=>{if(!o)return null;const r=e||Le;return{orderNumber:o.orderNumber||"",pickupNumber:(o.orderNumber||"").split("-")[1]||"",date:o.orderCreatedAt?new Date(o.orderCreatedAt):new Date,orderType:o.orderType||"dine_in",orderSource:o.orderSource||"pos",tableNumber:n||null,pagerNumber:null,customerName:o.customerName||"Walk-in Customer",groupLabel:t,items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:o.notes||"",takeawayCharge:0}},Qe=async()=>{const e=Xe();e&&0!==Le.length&&await(0,u.Si)(e,fe())},et="pending"===Me?"outstanding":oe(Me),tt=Le.some(e=>(e.order_group||0)>0),nt=(null===o||void 0===o?void 0:o.paymentProof)||(null===o||void 0===o?void 0:o.payment_proof)||null,rt=(ot=nt)?ot.hasOwnProperty("current")?ot.current:ot:null;var ot;const it=(e=>e&&e.hasOwnProperty("history")&&e.history||[])(nt);return(0,g.jsxs)(m,{children:[(0,g.jsxs)(h.aF,{isOpen:!!Ke,onClose:()=>Ye(!1),title:"verify"===Ke?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"verify"===Ke?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(G,{variant:"secondary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId){be(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"rejected",status:"outstanding"})}),Ye(!1),pe()}catch(e){}be(!1)}},disabled:ye,children:"Reject"}),(0,g.jsx)(Z,{variant:"primary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId){be(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),"outstanding"===Me&&await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending"})}),Ye(!1),pe()}catch(e){}be(!1)}},disabled:ye,children:"Confirm Payment"})]}):void 0,children:[(0,g.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:["#",null===o||void 0===o?void 0:o.orderNumber]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:[a," ",null===o||void 0===o||null===(t=o.totalAmount)||void 0===t?void 0:t.toFixed(2)]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,g.jsx)("strong",{style:{color:"#0A2540"},children:null===o||void 0===o?void 0:o.paymentMethod})]})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),rt?(0,g.jsxs)(g.Fragment,{children:[rt.reference&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,g.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:rt.reference})]}),rt.file_name&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",rt.file_name]}),rt.uploaded_at&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(rt.uploaded_at).toLocaleString()]}),rt.image&&(0,g.jsx)("img",{src:rt.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(rt.image,"_blank")})]}):(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===We?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),it.length>0&&(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",it.length,")"]}),it.map((e,t)=>(0,g.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:t<it.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||t+1]}),e.rejected_at&&(0,g.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,g.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,g.jsx)("img",{src:e.image,alt:`Previous proof #${t+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},t))]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(b,{children:[(0,g.jsxs)("h3",{children:["Table ",n]}),(0,g.jsxs)(f,{children:[null!==o&&void 0!==o&&o.guestCount?(0,g.jsxs)("span",{children:[o.guestCount," guests"]}):i?(0,g.jsxs)("span",{children:[i.seats," seats"]}):null,Re&&(0,g.jsxs)("span",{children:[o.elapsedMinutes,"min"]})]}),Re&&(0,g.jsxs)(j,{children:[(0,g.jsx)(C,{$color:Je.text,$bg:Je.bg,children:ne[Me]||o.status}),(0,g.jsx)(C,{$color:Ve.color,$bg:Ve.bg,children:"completed"===We||"paid"===We?"Paid":"rejected"===We?"Rejected":"payment_verification_pending"===We?"Verifying":"Unpaid"})]}),!Re&&(0,g.jsx)(j,{children:(0,g.jsx)(C,{$color:Je.text,$bg:Je.bg,children:"Available"})})]}),(0,g.jsx)(v,{onClick:ae,children:"\xd7"})]}),he.length>1&&(0,g.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[he.map((e,t)=>{var n;return(0,g.jsxs)("button",{onClick:()=>null===me||void 0===me?void 0:me(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:ge===t?600:400,border:ge===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:ge===t?"#EDE9FE":"white",color:ge===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(n=e.orderNumber)||void 0===n?void 0:n.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[he.length," orders"]})]}),Re?Ae?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{style:{padding:"16px 20px"},children:[(0,g.jsx)("div",{style:{marginBottom:"16px"},children:(0,g.jsx)("input",{type:"text",placeholder:"Search menu items...",value:ze,onChange:e=>Ie(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),ze.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Fe.filter(e=>{if(!e||!e.name)return!1;const t=ze.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,g.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Pe(e,1,[]),Ie("")},children:[(0,g.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,g.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,a)}),t&&(0,g.jsx)("button",{onClick:t=>{t.stopPropagation(),Ne(e),Te(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Fe.filter(e=>{var t;const n=ze.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n))||e.code&&e.code.toLowerCase().includes(n)}).length&&(0,g.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)(F,{style:{marginBottom:"10px"},children:["Items to Add (",Se.reduce((e,t)=>e+t.quantity,0),")"]}),0===Se.length?(0,g.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,g.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Se.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,g.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,g.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,g.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),a)," each"]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void $e(e=>{const n=e.find(e=>e.cartId===t);return n&&n.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void $e(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,g.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(Se.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),a)]})}),(0,g.jsx)(H,{$variant:"primary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId&&0!==Se.length)try{Be(!0);const e=localStorage.getItem("auth_token"),t=Se.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),n=await fetch(`/api/orders/${o.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!n.ok){const e=await n.json();throw new Error(e.message||"Failed to add items")}we(!1),$e([]),Ie(""),pe()}catch(e){console.error("Add items error:",e)}finally{Be(!1)}},disabled:0===Se.length||Ee,children:Ee?"Adding...":"Add to Order"}),(0,g.jsx)(H,{$variant:"secondary",onClick:()=>{we(!1),$e([]),Ie("")},children:"Cancel"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Order ",o.orderNumber||"",o.customerName&&"Walk-in Customer"!==o.customerName?` \u2014 ${o.customerName}`:""]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Customer"}),(0,g.jsx)(E,{children:o.customerName||"Walk-in"})]}),o.customerPhone&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Phone"}),(0,g.jsx)(E,{children:o.customerPhone})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Type"}),(0,g.jsx)(E,{children:(o.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Source"}),(0,g.jsx)(E,{children:re[o.orderSource||"pos"]||o.orderSource})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Time"}),(0,g.jsx)(E,{children:Ze(o.orderCreatedAt)})]}),o.paymentMethod&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Payment"}),(0,g.jsx)(E,{children:(0,c.MA)(o.paymentMethod,o.cardType,ve||void 0)})]}),rt&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Receipt"}),(0,g.jsx)(E,{children:(0,g.jsx)("span",{onClick:()=>Ye("view"),style:{color:"#635BFF",cursor:"pointer",fontWeight:500},children:"View \u2192"})})]}),o.cashierName&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Cashier"}),(0,g.jsx)(E,{children:o.cashierName})]})]})]}),(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Items (",Le.length,")",qe&&Le.length>0&&` \u2014 ${Le.filter(e=>"completed"===e.status).length}/${Le.length} served`]}),Ge.map(e=>{const t=Ue[e],n=e>0,r=t[0];return(0,g.jsxs)("div",{children:[(Ge.length>1||n)&&(0,g.jsxs)(B,{$isAdded:n,children:[(0,g.jsx)("span",{children:n?`+Added #${e}`:"Original Order"}),n&&(null===r||void 0===r?void 0:r.added_at)&&(0,g.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:Ze(r.added_at)})]}),t.map(e=>{const t=e._originalIndex,n="completed"===e.status,r=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,g.jsxs)(z,{$completed:n&&qe,children:[qe&&(0,g.jsx)(I,{$checked:n,onClick:()=>(async e=>{if(!ye&&null!==o&&void 0!==o&&o.orderId){be(!0);try{const t=Le.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Me)&&await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"served"})}),pe())}catch(t){}be(!1)}})(t),disabled:ye,title:n?"Mark as not served":"Mark as served",children:n?"\u2713":""}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(T,{$completed:n,children:[e.name," ",(0,g.jsxs)(O,{children:["x",e.quantity]})]}),r&&(0,g.jsx)(D,{children:r})]}),(0,g.jsx)(N,{children:(0,l.vv)(e.price*e.quantity,a)}),"completed"!==We&&Le.length>1&&(0,g.jsx)(P,{onClick:()=>{return n=t,r=e.name,void(null!==o&&void 0!==o&&o.orderId&&Ce({title:"Delete Item",message:`Delete "${r}" from this order?`,onConfirm:async()=>{Ce(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items/${n}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&pe()}catch(e){}}}));var n,r},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Le.length&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,g.jsxs)(w,{style:{borderBottom:"none"},children:[(0,g.jsx)(F,{children:"Summary"}),(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Subtotal"}),(0,g.jsx)("span",{children:(0,l.vv)(o.subtotal||0,a)})]}),(o.discountPolicyAmount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Discount",o.discountPolicyName?` (${o.discountPolicyName})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.discountPolicyAmount||0,a)]})]}),(o.couponDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Coupon",o.couponCode?` (${o.couponCode})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.couponDiscount||0,a)]})]}),(o.pointDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Points",o.pointsUsed?` (${o.pointsUsed} pts)`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.pointDiscount||0,a)]})]}),(o.discount||0)>0&&!o.couponDiscount&&!o.discountPolicyAmount&&!o.pointDiscount&&(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Discount"}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.discount||0,a)]})]}),(o.serviceCharge||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Svc Charge",o.serviceChargeRate?` (${o.serviceChargeRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(o.serviceCharge||0,a)})]}),(o.tax||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Tax",o.taxRate?` (${o.taxRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(o.tax||0,a)})]}),(0,g.jsxs)(R,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:(0,l.vv)(o.totalAmount,a)})]}),o.notes&&(0,g.jsx)(M,{children:o.notes})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(J,{onClick:async()=>{const e=o?{orderNumber:o.orderNumber||"",pickupNumber:(o.orderNumber||"").split("-")[1]||"",tableNumber:n||null,pagerNumber:null,date:o.orderCreatedAt?new Date(o.orderCreatedAt):new Date,items:Le.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(o.subtotal||0)),discount:parseFloat(String(o.discount||0)),coupon:o.couponCode?{code:o.couponCode,discount:parseFloat(String(o.couponDiscount||0))}:null,serviceCharge:parseFloat(String(o.serviceCharge||0)),serviceChargeRate:parseFloat(String(o.serviceChargeRate||10)),tax:parseFloat(String(o.tax||0)),taxRate:parseFloat(String(o.taxRate||6)),total:parseFloat(String(o.totalAmount||0)),paymentMethod:o.paymentMethod||"cash",amountReceived:0,change:0,cashierName:o.cashierName||null}:null;e&&0!==Le.length&&await(0,u.pG)(e,fe())},title:"Print Bill",children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,g.jsxs)(J,{onClick:Qe,title:"Print Order Ticket",children:[(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),tt&&(0,g.jsx)(J,{onClick:async()=>{if(0===Le.length)return;const e=Le.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void Qe();const n=Le.filter(e=>(e.order_group||0)===t),r=Xe(n,`+Order ${t}`);r&&await(0,u.Si)(r,fe())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M12 4v16m8-8H4"})})}),et&&(0,g.jsx)(J,{onClick:async()=>{if(null===o||void 0===o||!o.orderId||ye)return;const e="pending"===Me?"outstanding":oe(Me);if(e){be(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),pe()}catch(t){}be(!1)}},title:`Revert to ${ne[et]||et}`,children:(0,g.jsx)(V,{children:"\u21ba"})}),"completed"!==Me&&"cancelled"!==Me&&"pending"!==We&&"payment_verification_pending"!==We&&o.orderId&&(0,g.jsx)(J,{onClick:()=>de(o.orderId,"completed"),title:"Mark as Completed",children:(0,g.jsx)(V,{children:"\u2713"})})]}),He&&o.orderId&&"completed"!==Me&&"cancelled"!==Me&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>de(o.orderId,He.status),disabled:ye,style:"outstanding"===Me?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Me?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===He.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:He.label}),"payment_verification_pending"===We&&(0,g.jsx)(H,{$variant:"success",onClick:()=>{Ye("verify")},disabled:ye,children:"Confirm Payment"}),(0,g.jsxs)(L,{children:["pending"===We&&!["served","completed","cancelled"].includes(Me)&&(0,g.jsx)(H,{$variant:"secondary",onClick:()=>we(!0),children:"Add Items"}),"pending"===We&&(0,g.jsx)(H,{$variant:"served"===Me?"success":"secondary",onClick:le,children:"Payment"})]}),"cancelled"!==Me&&"completed"!==Me&&(0,g.jsx)(H,{$variant:"danger",onClick:()=>{null!==o&&void 0!==o&&o.orderId&&Ce({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{Ce(null),be(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),pe()}catch(e){}be(!1)}})},disabled:ye,children:"Cancel Order"}),"completed"===Me&&o.orderId&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>ue(o.orderId),disabled:ye,children:"Leaved"}),(0,g.jsx)(H,{$variant:"link",onClick:ce,children:"Open in POS Terminal \u2197"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(U,{children:[(0,g.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,g.jsx)("p",{children:"This table is available"})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(H,{$variant:"primary",onClick:se,children:"+ New Order"}),(0,g.jsx)(H,{$variant:"link",onClick:ce,children:"Open in POS Terminal \u2197"})]})]}),De&&(0,g.jsx)(x.A,{isOpen:_e,onClose:()=>{Te(!1),Ne(null)},menuItem:{id:De.id,name:De.name,price:parseFloat(De.price)||0,emoji:De.emoji||"",image:De.image,optionGroups:De.optionGroups},onConfirm:(e,t,n)=>{Pe(De,e,n),Te(!1),Ne(null),Ie("")}}),je&&(0,g.jsx)(K,{onClick:()=>Ce(null),children:(0,g.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(X,{children:je.title}),(0,g.jsx)(Q,{children:je.message}),(0,g.jsxs)(ee,{children:[(0,g.jsx)(te,{onClick:()=>Ce(null),children:"Cancel"}),(0,g.jsx)(te,{$danger:!0,onClick:je.onConfirm,children:"Confirm"})]})]})})]})},ae=o.Ay.div`
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
`,se=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,de=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,le=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,ce=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,pe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,ue=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,xe=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const o=t.length,i={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";i[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,g.jsxs)(ae,{children:[(0,g.jsx)(se,{children:Object.keys(s.Ez).map(e=>(0,g.jsxs)(de,{children:[(0,g.jsx)(le,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,g.jsx)(ce,{}),(0,g.jsxs)(pe,{children:[(0,g.jsxs)(ue,{children:["Tables: ",(0,g.jsx)("span",{children:o})]}),(0,g.jsxs)(ue,{children:["Avail: ",(0,g.jsx)("span",{children:i.available})]}),(0,g.jsxs)(ue,{children:["Occupied: ",(0,g.jsx)("span",{children:i.occupied})]}),i.ready>0&&(0,g.jsxs)(ue,{children:["Ready: ",(0,g.jsx)("span",{children:i.ready})]}),i["needs-attention"]>0&&(0,g.jsxs)(ue,{children:["Attn: ",(0,g.jsx)("span",{children:i["needs-attention"]})]}),(0,g.jsx)(ce,{}),(0,g.jsxs)(ue,{children:["Today: ",(0,g.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,g.jsxs)(ue,{children:["Avg: ",(0,g.jsxs)("span",{children:[p,"min"]})]})]})]})};var he=n(2966),ge=n(8406),me=n(3577),ye=n(3422);const be=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,fe=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,ve=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,je=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Ce=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,Ae=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,we=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Fe=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,ke=o.Ay.button`
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
`,Se=o.Ay.button`
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
`,$e=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,Ee=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Be=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,ze=o.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,Ie=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,_e=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,Te=o.Ay.button`
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
`,De=o.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,Ne=()=>{var e;const{restaurantId:t}=(0,i.g)(),n=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[x,h]=(0,r.useState)(!1),[m,y]=(0,r.useState)(""),[b,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[C,A]=(0,r.useState)("Asia/Kuala_Lumpur"),w=(0,r.useRef)(null),F=(0,r.useRef)(null),[k,S]=(0,r.useState)(null),[$,E]=(0,r.useState)(0),[B,z]=(0,r.useState)(!1),[I,_]=(0,r.useState)(null),[T,D]=(0,r.useState)(null),[N,O]=(0,r.useState)(!1),[P,R]=(0,r.useState)(!1),[M,W]=(0,r.useState)(""),[H,L]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;y(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const q=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),J=(0,r.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>q(),2e3)},[q]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,ge.ng)(e))}o.payment_settings&&_(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&r.data&&D(r.data)}catch(e){}})(),q()},[t,q]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,ye.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{h(!0),e.emit("join-restaurant",t),q()}),e.on("disconnect",()=>h(!1)),e.on("order-updated",()=>J()),e.on("order-created",()=>J()),e.on("order-items-added",e=>{J(),L({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>J()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,q,J]),(0,r.useEffect)(()=>{const e=setInterval(()=>q(),3e4);return()=>clearInterval(e)},[q]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(R(!1),W(""),q())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[q]);const V=k?p[k]:void 0,U=(null===V||void 0===V?void 0:V.orders)||(V?[V]:[]),G=Math.min($,Math.max(U.length-1,0)),Z=U.length>0?U[G]:V,K=k?l.tables.find(e=>e.tableNumber===k):void 0;return b?(0,g.jsxs)(be,{children:[(0,g.jsx)(fe,{children:(0,g.jsx)(ve,{children:(0,g.jsx)(je,{children:"Floor Plan"})})}),(0,g.jsx)(Be,{children:"Loading floor plan..."})]}):(0,g.jsxs)(be,{children:[(null===H||void 0===H?void 0:H.isVisible)&&(0,g.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,g.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,g.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,g.jsx)("button",{onClick:()=>L(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,g.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,g.jsxs)("strong",{children:["Order ",H.orderNumber]}),H.tableNumber&&` (Table ${H.tableNumber})`,(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",H.orderGroup]})," ",H.itemCount," item",H.itemCount>1?"s":""," added"]}),(0,g.jsx)("button",{onClick:()=>{H.tableNumber&&S(H.tableNumber),L(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,g.jsxs)(fe,{children:[(0,g.jsxs)(ve,{children:[(0,g.jsx)(Se,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,g.jsx)(je,{children:"Floor Plan"}),(0,g.jsxs)(Ae,{children:[(0,g.jsx)(Ce,{$connected:x}),x?"Live":"Offline"]})]}),(0,g.jsxs)(we,{children:[(0,g.jsx)(Fe,{children:m}),(0,g.jsxs)(ke,{onClick:()=>O(!0),children:[(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"14px",height:"14px",verticalAlign:"middle",marginRight:"4px"},children:(0,g.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,g.jsx)(ke,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,g.jsxs)($e,{children:[(0,g.jsx)(Ee,{children:(0,g.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{S(t=>t===e?null:e),E(0)},selectedTableId:k?null===(e=l.tables.find(e=>e.tableNumber===k))||void 0===e?void 0:e.id:null,currency:v})}),k&&(0,g.jsx)(ie,{tableNumber:k,statusInfo:Z,tableInfo:K,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>S(null),onNewOrder:()=>{if(!k)return;const e=new URLSearchParams;e.set("table",k),e.set("from","floor-plan-overlay"),W(`/restaurant/${t}/pos-terminal?${e.toString()}`),R(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await q()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{z(!0)},onNavigateToPOS:()=>{k&&n(`/restaurant/${t}/pos-terminal?table=${k}&from=floor-plan`)},onOrderUpdated:q,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),S(null),await q()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(k)try{const e=localStorage.getItem("auth_token"),t=U.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),S(null),await q()}catch(e){console.error("Failed to clear table:",e)}},orders:U,selectedOrderIndex:G,onOrderIndexChange:E})]}),(0,g.jsx)(xe,{tables:l.tables,tableStatuses:p,currency:v}),B&&Z&&(0,g.jsx)(he.A,{isOpen:B,onClose:()=>z(!1),total:Number(Z.totalAmount||0),subtotal:Number(Z.subtotal||Z.totalAmount||0),tax:Number(Z.tax||0),serviceCharge:Number(Z.serviceCharge||0),discountAmount:Number(Z.discount||0),couponDiscount:Number(Z.couponDiscount||0),onConfirmPayment:async(e,t,n,r,o,i)=>{if(!k)return;const a=p[k];if(null!==a&&void 0!==a&&a.orderId)try{const t=localStorage.getItem("auth_token"),n={payment_status:"completed",payment_method:e,card_type:"card"===e&&i||null};r&&r>0&&o&&o>0&&(n.points_used=r,n.point_discount=o,n.total_amount=(a.totalAmount||0)-o);(await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&("outstanding"===a.orderStatus?await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"pending"})}):"served"===a.orderStatus&&await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"completed"})}),z(!1),await q())}catch(s){console.error("Failed to process payment:",s)}},paymentMethods:I,customerId:Z.customerId||void 0,restaurantId:Number(t),membershipSettings:T}),(0,g.jsxs)(ze,{$isOpen:P,children:[(0,g.jsxs)(Ie,{children:[(0,g.jsxs)(_e,{children:["POS Terminal \u2014 Table ",k]}),(0,g.jsx)(Te,{onClick:()=>{R(!1),W(""),q()},children:"\xd7 Close"})]}),P&&M&&(0,g.jsx)(De,{src:M,title:"POS Terminal"})]}),(0,g.jsx)(me.A,{isOpen:N,onClose:()=>O(!1)})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>C});var r=n(9950),o=n(4752),i=n(7447),a=n(4414);const s=o.Ay.div`
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
`,x=new Set(["kitchen","entrance"]),h={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},g=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:o=!1,onClick:g,onMouseDown:m,onTouchStart:y,statusInfo:b,currency:f=""}=e;const v=t.tableType||"table",j="table"!==v,C=x.has(v),A=j?h[v]||h.kitchen:o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!o&&null!==b&&void 0!==b&&b.orderStatus&&i.v[b.orderStatus]?i.v[b.orderStatus]:i.Ez[n],w=j?{...C?{background:"transparent",border:r&&o?"1.5px dashed #635BFF":"none",boxShadow:r&&o?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":A.border}`},cursor:o?"grab":"default",opacity:o?1:.85}:void 0,F="counter"===v&&t.width<t.height,k=!o&&"staffMeal"===(null===b||void 0===b?void 0:b.paymentMethod);return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:C?"square":t.shape,$rotation:t.rotation,$bgColor:C?"transparent":A.bg,$borderColor:C?"transparent":A.border,$textColor:A.text,$isSelected:r&&!C,$isEditing:o,onClick:e=>{o||!g||j||(e.stopPropagation(),g(t.tableNumber))},onMouseDown:e=>{o&&m&&m(e,t.id)},onTouchStart:e=>{o&&y&&y(e,t.id)},style:w,children:[k&&(0,a.jsx)(p,{children:"STAFF"}),!j&&(null===b||void 0===b?void 0:b.orderCount)&&b.orderCount>1&&(0,a.jsx)(u,{children:b.orderCount}),(0,a.jsx)(d,{$textColor:A.text,style:C?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:F?{writingMode:"vertical-rl",textOrientation:"mixed",letterSpacing:"1px"}:void 0,children:t.label||t.tableNumber}),!j&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:A.text,children:!o&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!o&&b&&"available"!==n&&(0,a.jsx)(c,{$textColor:A.text,children:k?"Staff Meal":{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});g.displayName="TableNode";const m=g,y=o.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,b=o.Ay.div`
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
`,C=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:o=!1,selectedTableId:i,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const u=(0,r.useRef)(null),x=(0,r.useRef)(null),[h,g]=(0,r.useState)(1),[C,A]=(0,r.useState)({x:0,y:0}),w=(0,r.useMemo)(()=>{if(o||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,i=-1/0;for(const o of t.tables){const t=o.width/2,a=o.height/2;e=Math.min(e,o.x-t),n=Math.min(n,o.y-a),r=Math.max(r,o.x+t),i=Math.max(i,o.y+a)}const a=r-e,s=i-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,o]),F=(0,r.useCallback)(()=>{if(!x.current)return;const e=x.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=w.w/e.width,n=w.h/e.height,r=Math.max(t,n);g(r);const o=w.w/r,i=w.h/r;A({x:(e.width-o)/2,y:(e.height-i)/2})},[w]);(0,r.useEffect)(()=>{F();const e=new ResizeObserver(()=>F());return u.current&&e.observe(u.current),()=>e.disconnect()},[F]);const k=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(y,{ref:u,children:(0,a.jsxs)(b,{ref:x,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[o&&t.showGrid&&(0,a.jsx)(f,{$gridSize:t.gridSize,$scale:h}),(0,a.jsx)(v,{"data-scaled-layer":!0,style:{transform:`scale(${1/h})`,left:o?0:C.x-w.x/h+"px",top:o?0:C.y-w.y/h+"px",width:o?`${t.canvasWidth}px`:`${w.w}px`,height:o?`${t.canvasHeight}px`:`${w.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(m,{table:e,status:k(e.tableNumber),isSelected:i===e.id,isEditing:o,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(j,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>o,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>i,v:()=>d});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],i=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EDE9FE",border:"#7C3AED",text:"#6D28D9"},ready:{bg:"#DCFCE7",border:"#16A34A",text:"#15803D"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#B91C1C"},completed:{bg:"#F3F4F6",border:"#9CA3AF",text:"#6B7280"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention",completed:"Completed"},d={outstanding:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"},pending:{bg:"#FEF9C3",text:"#A16207",border:"#CA8A04"},preparing:{bg:"#EDE9FE",text:"#6D28D9",border:"#7C3AED"},ready:{bg:"#DCFCE7",text:"#15803D",border:"#16A34A"},served:{bg:"#D1FAE5",text:"#047857",border:"#059669"},completed:{bg:"#F3F4F6",text:"#6B7280",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#B91C1C",border:"#DC2626"},awaiting_payment:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"}}}}]);