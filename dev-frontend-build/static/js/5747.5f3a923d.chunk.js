"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,r)=>{r.r(t),r.d(t,{default:()=>_e});var n=r(9950),o=r(4752),i=r(4492),a=r(1367),s=r(7447),d=r(5783),l=r(6038),c=r(8285),p=r(9018),u=r(5863),x=r(9189),h=r(8409),g=r(4414);const m=o.Ay.div`
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
`,b=o.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,y=o.Ay.div`
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
`,$=o.Ay.div`
  font-size: 12px;
`,S=o.Ay.span`
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
`,I=o.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,z=o.Ay.button`
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
`,D=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,T=o.Ay.div`
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
`,U=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,G=o.Ay.div`
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
`,V=o.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`,Z=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,K=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,Y=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`,X=o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,Q=o.Ay.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.$danger?"background: #DC2626; color: white; &:hover { background: #B91C1C; }":"background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }"}
`,ee={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},te={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},re=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),ne=e=>{var t;let{tableNumber:r,statusInfo:o,tableInfo:i,currency:a,timezone:d,restaurantId:ne,onClose:oe,onNewOrder:ie,onStatusChange:ae,onPayment:se,onNavigateToPOS:de,onOrderUpdated:le,onClearTable:ce,onClearAllCompleted:pe,orders:ue=[],selectedOrderIndex:xe=0,onOrderIndexChange:he}=e;const[ge,me]=(0,n.useState)(!1),{getStoreInfo:be}=(0,p.Pj)(),[ye,fe]=(0,n.useState)(null),[ve,je]=(0,n.useState)(!1),[Ce,Ae]=(0,n.useState)([]),[we,Fe]=(0,n.useState)([]),[ke,$e]=(0,n.useState)(!1),[Se,Ee]=(0,n.useState)(""),[Be,Ie]=(0,n.useState)(!1),[ze,_e]=(0,n.useState)(null),De=(0,n.useCallback)(async()=>{if(ne)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch(`/api/menu?restaurantId=${ne}`,{headers:t});if(r.ok){var e;const t=await r.json(),n=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Ae(n.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[ne]);(0,n.useEffect)(()=>{ve?De():(Fe([]),Ee(""))},[ve,De]);const Te=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");Fe(o=>{if(0===r.length){const r=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=o.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const i=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Ne=o&&"available"!==o.status,Oe=(null===o||void 0===o?void 0:o.orderStatus)||"",Pe=(null===o||void 0===o?void 0:o.paymentStatus)||"pending",Re=((e,t)=>{switch(e){case"outstanding":return{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Oe,Pe),Me=(null===o||void 0===o?void 0:o.orderItems)||[],We=["preparing","ready","served"].includes(Oe),He=Ne&&s.v[Oe]?s.v[Oe]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},Le=(()=>{switch(Pe){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),qe={};Me.forEach((e,t)=>{const r=e.order_group||0;qe[r]||(qe[r]=[]),qe[r].push({...e,_originalIndex:t})});const Je=Object.keys(qe).map(Number).sort((e,t)=>e-t),Ue=e=>{if(!e)return"-";const t=new Date(e),r=d?{timeZone:d}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...r})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...r})},[Ge,Ve]=(0,n.useState)(!1),Ze=(e,t)=>{if(!o)return null;const n=e||Me;return{orderNumber:o.orderNumber||"",pickupNumber:(o.orderNumber||"").split("-")[1]||"",date:o.orderCreatedAt?new Date(o.orderCreatedAt):new Date,orderType:o.orderType||"dine_in",orderSource:o.orderSource||"pos",tableNumber:r||null,pagerNumber:null,customerName:o.customerName||"Walk-in Customer",groupLabel:t,items:n.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:o.notes||"",takeawayCharge:0}},Ke=async()=>{const e=Ze();e&&0!==Me.length&&await(0,u.Si)(e,be())},Ye="pending"===Oe?"outstanding":re(Oe),Xe=Me.some(e=>(e.order_group||0)>0),Qe=(null===o||void 0===o?void 0:o.paymentProof)||(null===o||void 0===o?void 0:o.payment_proof)||null;return(0,g.jsxs)(m,{children:[(0,g.jsxs)(h.aF,{isOpen:Ge,onClose:()=>Ve(!1),title:"Payment Verification",size:"small",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(h.yl,{variant:"secondary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId){me(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"rejected",status:"outstanding"})}),Ve(!1),le()}catch(e){}me(!1)}},disabled:ge,style:{borderColor:"#FCA5A5",color:"#DC2626",background:"#FEF2F2"},children:"Reject"}),(0,g.jsx)(h.yl,{variant:"primary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId){me(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),"outstanding"===Oe&&await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending"})}),Ve(!1),le()}catch(e){}me(!1)}},disabled:ge,style:{background:"#10B981"},children:"Confirm Payment"})]}),children:[(0,g.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:["#",null===o||void 0===o?void 0:o.orderNumber]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:[a," ",null===o||void 0===o||null===(t=o.totalAmount)||void 0===t?void 0:t.toFixed(2)]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,g.jsx)("strong",{style:{color:"#0A2540"},children:null===o||void 0===o?void 0:o.paymentMethod})]})]}),Qe?(0,g.jsxs)("div",{style:{border:"1px solid #E6EBF1",borderRadius:"8px",padding:"14px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"10px"},children:"Customer Submitted Proof"}),Qe.reference&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,g.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:Qe.reference})]}),Qe.file_name&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",Qe.file_name]}),Qe.uploaded_at&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(Qe.uploaded_at).toLocaleString()]}),Qe.image&&(0,g.jsx)("img",{src:Qe.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(Qe.image,"_blank")})]}):(0,g.jsx)("div",{style:{border:"1px solid #FCA5A5",borderRadius:"8px",padding:"14px",fontSize:"13px",color:"#DC2626"},children:"No payment proof submitted by customer."})]}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(y,{children:[(0,g.jsxs)("h3",{children:["Table ",r]}),(0,g.jsxs)(f,{children:[null!==o&&void 0!==o&&o.guestCount?(0,g.jsxs)("span",{children:[o.guestCount," guests"]}):i?(0,g.jsxs)("span",{children:[i.seats," seats"]}):null,Ne&&(0,g.jsxs)("span",{children:[o.elapsedMinutes,"min"]})]}),Ne&&(0,g.jsxs)(j,{children:[(0,g.jsx)(C,{$color:He.text,$bg:He.bg,children:ee[Oe]||o.status}),(0,g.jsx)(C,{$color:Le.color,$bg:Le.bg,children:"completed"===Pe||"paid"===Pe?"Paid":"Unpaid"})]}),!Ne&&(0,g.jsx)(j,{children:(0,g.jsx)(C,{$color:He.text,$bg:He.bg,children:"Available"})})]}),(0,g.jsx)(v,{onClick:oe,children:"\xd7"})]}),ue.length>1&&(0,g.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[ue.map((e,t)=>{var r;return(0,g.jsxs)("button",{onClick:()=>null===he||void 0===he?void 0:he(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:xe===t?600:400,border:xe===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:xe===t?"#EDE9FE":"white",color:xe===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(r=e.orderNumber)||void 0===r?void 0:r.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[ue.length," orders"]})]}),Ne?ve?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{style:{padding:"16px 20px"},children:[(0,g.jsx)("div",{style:{marginBottom:"16px"},children:(0,g.jsx)("input",{type:"text",placeholder:"Search menu items...",value:Se,onChange:e=>Ee(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),Se.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Ce.filter(e=>{if(!e||!e.name)return!1;const t=Se.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,g.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Te(e,1,[]),Ee("")},children:[(0,g.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,g.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,a)}),t&&(0,g.jsx)("button",{onClick:t=>{t.stopPropagation(),_e(e),Ie(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Ce.filter(e=>{var t;const r=Se.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(r))||e.code&&e.code.toLowerCase().includes(r)}).length&&(0,g.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)(F,{style:{marginBottom:"10px"},children:["Items to Add (",we.reduce((e,t)=>e+t.quantity,0),")"]}),0===we.length?(0,g.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,g.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:we.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,g.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,g.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,g.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),a)," each"]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Fe(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Fe(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,g.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(we.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),a)]})}),(0,g.jsx)(H,{$variant:"primary",onClick:async()=>{if(null!==o&&void 0!==o&&o.orderId&&0!==we.length)try{$e(!0);const e=localStorage.getItem("auth_token"),t=we.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),r=await fetch(`/api/orders/${o.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!r.ok){const e=await r.json();throw new Error(e.message||"Failed to add items")}je(!1),Fe([]),Ee(""),le()}catch(e){console.error("Add items error:",e)}finally{$e(!1)}},disabled:0===we.length||ke,children:ke?"Adding...":"Add to Order"}),(0,g.jsx)(H,{$variant:"secondary",onClick:()=>{je(!1),Fe([]),Ee("")},children:"Cancel"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Order ",o.orderNumber||"",o.customerName&&"Walk-in Customer"!==o.customerName?` \u2014 ${o.customerName}`:""]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Customer"}),(0,g.jsx)(E,{children:o.customerName||"Walk-in"})]}),o.customerPhone&&(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Phone"}),(0,g.jsx)(E,{children:o.customerPhone})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Type"}),(0,g.jsx)(E,{children:(o.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Source"}),(0,g.jsx)(E,{children:te[o.orderSource||"pos"]||o.orderSource})]}),(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Time"}),(0,g.jsx)(E,{children:Ue(o.orderCreatedAt)})]}),o.paymentMethod&&(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Payment"}),(0,g.jsx)(E,{children:(0,c.MA)(o.paymentMethod,o.cardType)})]}),o.cashierName&&(0,g.jsxs)($,{children:[(0,g.jsx)(S,{children:"Cashier"}),(0,g.jsx)(E,{children:o.cashierName})]})]})]}),(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Items (",Me.length,")",We&&Me.length>0&&` \u2014 ${Me.filter(e=>"completed"===e.status).length}/${Me.length} served`]}),Je.map(e=>{const t=qe[e],r=e>0,n=t[0];return(0,g.jsxs)("div",{children:[(Je.length>1||r)&&(0,g.jsxs)(B,{$isAdded:r,children:[(0,g.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===n||void 0===n?void 0:n.added_at)&&(0,g.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:Ue(n.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,n=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,g.jsxs)(I,{$completed:r&&We,children:[We&&(0,g.jsx)(z,{$checked:r,onClick:()=>(async e=>{if(!ge&&null!==o&&void 0!==o&&o.orderId){me(!0);try{const t=Me.map((t,r)=>r===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Oe)&&await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),le())}catch(t){}me(!1)}})(t),disabled:ge,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(D,{$completed:r,children:[e.name," ",(0,g.jsxs)(O,{children:["x",e.quantity]})]}),n&&(0,g.jsx)(T,{children:n})]}),(0,g.jsx)(N,{children:(0,l.vv)(e.price*e.quantity,a)}),"completed"!==Pe&&Me.length>1&&(0,g.jsx)(P,{onClick:()=>{return r=t,n=e.name,void(null!==o&&void 0!==o&&o.orderId&&fe({title:"Delete Item",message:`Delete "${n}" from this order?`,onConfirm:async()=>{fe(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${o.orderId}/items/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&le()}catch(e){}}}));var r,n},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Me.length&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,g.jsxs)(w,{style:{borderBottom:"none"},children:[(0,g.jsx)(F,{children:"Summary"}),(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Subtotal"}),(0,g.jsx)("span",{children:(0,l.vv)(o.subtotal||0,a)})]}),(o.discountPolicyAmount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Discount",o.discountPolicyName?` (${o.discountPolicyName})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.discountPolicyAmount||0,a)]})]}),(o.couponDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Coupon",o.couponCode?` (${o.couponCode})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.couponDiscount||0,a)]})]}),(o.pointDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Points",o.pointsUsed?` (${o.pointsUsed} pts)`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.pointDiscount||0,a)]})]}),(o.discount||0)>0&&!o.couponDiscount&&!o.discountPolicyAmount&&!o.pointDiscount&&(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Discount"}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(o.discount||0,a)]})]}),(o.serviceCharge||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Svc Charge",o.serviceChargeRate?` (${o.serviceChargeRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(o.serviceCharge||0,a)})]}),(o.tax||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Tax",o.taxRate?` (${o.taxRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(o.tax||0,a)})]}),(0,g.jsxs)(R,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:(0,l.vv)(o.totalAmount,a)})]}),o.notes&&(0,g.jsx)(M,{children:o.notes})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(J,{onClick:async()=>{const e=o?{orderNumber:o.orderNumber||"",pickupNumber:(o.orderNumber||"").split("-")[1]||"",tableNumber:r||null,pagerNumber:null,date:o.orderCreatedAt?new Date(o.orderCreatedAt):new Date,items:Me.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(o.subtotal||0)),discount:parseFloat(String(o.discount||0)),coupon:o.couponCode?{code:o.couponCode,discount:parseFloat(String(o.couponDiscount||0))}:null,serviceCharge:parseFloat(String(o.serviceCharge||0)),serviceChargeRate:parseFloat(String(o.serviceChargeRate||10)),tax:parseFloat(String(o.tax||0)),taxRate:parseFloat(String(o.taxRate||6)),total:parseFloat(String(o.totalAmount||0)),paymentMethod:o.paymentMethod||"cash",amountReceived:0,change:0,cashierName:o.cashierName||null}:null;e&&0!==Me.length&&await(0,u.pG)(e,be())},title:"Print Bill",children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,g.jsxs)(J,{onClick:Ke,title:"Print Order Ticket",children:[(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),Xe&&(0,g.jsx)(J,{onClick:async()=>{if(0===Me.length)return;const e=Me.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void Ke();const r=Me.filter(e=>(e.order_group||0)===t),n=Ze(r,`+Order ${t}`);n&&await(0,u.Si)(n,be())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M12 4v16m8-8H4"})})}),Ye&&(0,g.jsx)(J,{onClick:async()=>{if(null===o||void 0===o||!o.orderId||ge)return;const e="pending"===Oe?"outstanding":re(Oe);if(e){me(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),le()}catch(t){}me(!1)}},title:`Revert to ${ee[Ye]||Ye}`,children:(0,g.jsx)(U,{children:"\u21ba"})}),"completed"!==Oe&&"cancelled"!==Oe&&"pending"!==Pe&&"payment_verification_pending"!==Pe&&o.orderId&&(0,g.jsx)(J,{onClick:()=>ae(o.orderId,"completed"),title:"Mark as Completed",children:(0,g.jsx)(U,{children:"\u2713"})})]}),Re&&o.orderId&&"completed"!==Oe&&"cancelled"!==Oe&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>ae(o.orderId,Re.status),disabled:ge,style:"outstanding"===Oe?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Oe?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===Re.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Re.label}),"payment_verification_pending"===Pe&&(0,g.jsx)(H,{$variant:"success",onClick:()=>{Ve(!0)},disabled:ge,children:"Confirm Payment"}),(0,g.jsxs)(L,{children:["pending"===Pe&&!["served","completed","cancelled"].includes(Oe)&&(0,g.jsx)(H,{$variant:"secondary",onClick:()=>je(!0),children:"Add Items"}),"pending"===Pe&&(0,g.jsx)(H,{$variant:"served"===Oe?"success":"secondary",onClick:se,children:"Payment"})]}),"cancelled"!==Oe&&"completed"!==Oe&&(0,g.jsx)(H,{$variant:"danger",onClick:()=>{null!==o&&void 0!==o&&o.orderId&&fe({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{fe(null),me(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${o.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),le()}catch(e){}me(!1)}})},disabled:ge,children:"Cancel Order"}),"completed"===Oe&&o.orderId&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>ce(o.orderId),disabled:ge,children:"Leaved"}),(0,g.jsx)(H,{$variant:"link",onClick:de,children:"Open in POS Terminal \u2197"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(G,{children:[(0,g.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,g.jsx)("p",{children:"This table is available"})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(H,{$variant:"primary",onClick:ie,children:"+ New Order"}),(0,g.jsx)(H,{$variant:"link",onClick:de,children:"Open in POS Terminal \u2197"})]})]}),ze&&(0,g.jsx)(x.A,{isOpen:Be,onClose:()=>{Ie(!1),_e(null)},menuItem:{id:ze.id,name:ze.name,price:parseFloat(ze.price)||0,emoji:ze.emoji||"",image:ze.image,optionGroups:ze.optionGroups},onConfirm:(e,t,r)=>{Te(ze,e,r),Ie(!1),_e(null),Ee("")}}),ye&&(0,g.jsx)(V,{onClick:()=>fe(null),children:(0,g.jsxs)(Z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(K,{children:ye.title}),(0,g.jsx)(Y,{children:ye.message}),(0,g.jsxs)(X,{children:[(0,g.jsx)(Q,{onClick:()=>fe(null),children:"Cancel"}),(0,g.jsx)(Q,{$danger:!0,onClick:ye.onConfirm,children:"Confirm"})]})]})})]})},oe=o.Ay.div`
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
`,ie=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ae=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,se=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,de=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,le=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,ce=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,pe=e=>{let{tables:t,tableStatuses:r,currency:n}=e;const o=t.length,i={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=r[e.tableNumber],n=(null===t||void 0===t?void 0:t.status)||"available";i[n]++,"available"!==n&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,g.jsxs)(oe,{children:[(0,g.jsx)(ie,{children:Object.keys(s.Ez).map(e=>(0,g.jsxs)(ae,{children:[(0,g.jsx)(se,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,g.jsx)(de,{}),(0,g.jsxs)(le,{children:[(0,g.jsxs)(ce,{children:["Tables: ",(0,g.jsx)("span",{children:o})]}),(0,g.jsxs)(ce,{children:["Avail: ",(0,g.jsx)("span",{children:i.available})]}),(0,g.jsxs)(ce,{children:["Occupied: ",(0,g.jsx)("span",{children:i.occupied})]}),i.ready>0&&(0,g.jsxs)(ce,{children:["Ready: ",(0,g.jsx)("span",{children:i.ready})]}),i["needs-attention"]>0&&(0,g.jsxs)(ce,{children:["Attn: ",(0,g.jsx)("span",{children:i["needs-attention"]})]}),(0,g.jsx)(de,{}),(0,g.jsxs)(ce,{children:["Today: ",(0,g.jsx)("span",{children:(0,l.vv)(a,n)})]}),p>0&&(0,g.jsxs)(ce,{children:["Avg: ",(0,g.jsxs)("span",{children:[p,"min"]})]})]})]})};var ue=r(2966),xe=r(8406),he=r(3422);const ge=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,me=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,be=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ye=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,fe=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,ve=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,je=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Ce=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
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
    border-color: #D1D9E0;
  }
`,we=o.Ay.button`
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
`,Fe=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,ke=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,$e=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,Se=o.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,Ee=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,Be=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,Ie=o.Ay.button`
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
`,ze=o.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,_e=()=>{var e;const{restaurantId:t}=(0,i.g)(),r=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,n.useState)(s.He),[p,u]=(0,n.useState)({}),[x,h]=(0,n.useState)(!1),[m,b]=(0,n.useState)(""),[y,f]=(0,n.useState)(!0),[v,j]=(0,n.useState)(""),[C,A]=(0,n.useState)("Asia/Kuala_Lumpur"),w=(0,n.useRef)(null),F=(0,n.useRef)(null),[k,$]=(0,n.useState)(null),[S,E]=(0,n.useState)(0),[B,I]=(0,n.useState)(!1),[z,_]=(0,n.useState)(null),[D,T]=(0,n.useState)(null),[N,O]=(0,n.useState)(!1),[P,R]=(0,n.useState)(""),[M,W]=(0,n.useState)(null);(0,n.useEffect)(()=>{const e=()=>{const e=new Date;b(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const H=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),L=(0,n.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>H(),2e3)},[H]);(0,n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)return;const n=await r.json(),o=n.data||n;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,xe.ng)(e))}o.payment_settings&&_(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&n.data&&T(n.data)}catch(e){}})(),H()},[t,H]),(0,n.useEffect)(()=>{if(!t)return;const e=(0,he.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{h(!0),e.emit("join-restaurant",t),H()}),e.on("disconnect",()=>h(!1)),e.on("order-updated",()=>L()),e.on("order-created",()=>L()),e.on("order-items-added",e=>{L(),W({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>L()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,H,L]),(0,n.useEffect)(()=>{const e=setInterval(()=>H(),3e4);return()=>clearInterval(e)},[H]),(0,n.useEffect)(()=>{const e=e=>{var t,r;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(r=e.data)||void 0===r?void 0:r.type)||(O(!1),R(""),H())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[H]);const q=k?p[k]:void 0,J=(null===q||void 0===q?void 0:q.orders)||(q?[q]:[]),U=Math.min(S,Math.max(J.length-1,0)),G=J.length>0?J[U]:q,V=k?l.tables.find(e=>e.tableNumber===k):void 0;return y?(0,g.jsxs)(ge,{children:[(0,g.jsx)(me,{children:(0,g.jsx)(be,{children:(0,g.jsx)(ye,{children:"Floor Plan"})})}),(0,g.jsx)($e,{children:"Loading floor plan..."})]}):(0,g.jsxs)(ge,{children:[(null===M||void 0===M?void 0:M.isVisible)&&(0,g.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,g.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,g.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,g.jsx)("button",{onClick:()=>W(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,g.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,g.jsxs)("strong",{children:["Order ",M.orderNumber]}),M.tableNumber&&` (Table ${M.tableNumber})`,(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",M.orderGroup]})," ",M.itemCount," item",M.itemCount>1?"s":""," added"]}),(0,g.jsx)("button",{onClick:()=>{M.tableNumber&&$(M.tableNumber),W(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,g.jsxs)(me,{children:[(0,g.jsxs)(be,{children:[(0,g.jsx)(we,{onClick:()=>r(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,g.jsx)(ye,{children:"Floor Plan"}),(0,g.jsxs)(ve,{children:[(0,g.jsx)(fe,{$connected:x}),x?"Live":"Offline"]})]}),(0,g.jsxs)(je,{children:[(0,g.jsx)(Ce,{children:m}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,g.jsx)(Ae,{onClick:()=>r(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,g.jsxs)(Fe,{children:[(0,g.jsx)(ke,{children:(0,g.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{$(t=>t===e?null:e),E(0)},selectedTableId:k?null===(e=l.tables.find(e=>e.tableNumber===k))||void 0===e?void 0:e.id:null,currency:v})}),k&&(0,g.jsx)(ne,{tableNumber:k,statusInfo:G,tableInfo:V,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>$(null),onNewOrder:()=>{if(!k)return;const e=new URLSearchParams;e.set("table",k),e.set("from","floor-plan-overlay"),R(`/restaurant/${t}/pos-terminal?${e.toString()}`),O(!0)},onStatusChange:async(e,t)=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:t})})).ok&&await H()}catch(r){console.error("Failed to update order status:",r)}},onPayment:()=>{I(!0)},onNavigateToPOS:()=>{k&&r(`/restaurant/${t}/pos-terminal?table=${k}&from=floor-plan`)},onOrderUpdated:H,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),$(null),await H()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(k)try{const e=localStorage.getItem("auth_token"),t=J.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),$(null),await H()}catch(e){console.error("Failed to clear table:",e)}},orders:J,selectedOrderIndex:U,onOrderIndexChange:E})]}),(0,g.jsx)(pe,{tables:l.tables,tableStatuses:p,currency:v}),B&&G&&(0,g.jsx)(ue.A,{isOpen:B,onClose:()=>I(!1),total:Number(G.totalAmount||0),subtotal:Number(G.subtotal||G.totalAmount||0),tax:Number(G.tax||0),serviceCharge:Number(G.serviceCharge||0),discountAmount:Number(G.discount||0),couponDiscount:Number(G.couponDiscount||0),onConfirmPayment:async(e,t,r,n,o,i)=>{if(!k)return;const a=p[k];if(null!==a&&void 0!==a&&a.orderId)try{const t=localStorage.getItem("auth_token"),r={payment_status:"completed",payment_method:e,card_type:"card"===e&&i||null};n&&n>0&&o&&o>0&&(r.points_used=n,r.point_discount=o,r.total_amount=(a.totalAmount||0)-o);(await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(r)})).ok&&("outstanding"===a.orderStatus?await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"pending"})}):"served"===a.orderStatus&&await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"completed"})}),I(!1),await H())}catch(s){console.error("Failed to process payment:",s)}},paymentMethods:z,customerId:G.customerId||void 0,restaurantId:Number(t),membershipSettings:D}),(0,g.jsxs)(Se,{$isOpen:N,children:[(0,g.jsxs)(Ee,{children:[(0,g.jsxs)(Be,{children:["POS Terminal \u2014 Table ",k]}),(0,g.jsx)(Ie,{onClick:()=>{O(!1),R(""),H()},children:"\xd7 Close"})]}),N&&P&&(0,g.jsx)(ze,{src:P,title:"POS Terminal"})]})]})}},5783:(e,t,r)=>{r.d(t,{A:()=>C});var n=r(9950),o=r(4752),i=r(7447),a=r(4414);const s=o.Ay.div`
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