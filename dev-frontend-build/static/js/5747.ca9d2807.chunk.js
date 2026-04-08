"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Oe});var n=r(9950),o=r(4752),i=r(4492),a=r(1367),s=r(7447),l=r(5783),d=r(6038),c=r(8285),p=r(9018),u=r(5863),h=r(9189),x=r(8409),g=r(5030),m=r(4414);const f=o.Ay.div`
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
`,v=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,j=o.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,C=o.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,w=o.Ay.span`
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
`,F=o.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,S=o.Ay.div`
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
`,E=o.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,B=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,_=o.Ay.div`
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
`,T=o.Ay.div`
  flex: 1;
  min-width: 0;
`,D=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,P=o.Ay.div`
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
`,R=o.Ay.button`
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
`,M=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,W=o.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,H=o.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,L=o.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,q=o.Ay.div`
  display: flex;
  gap: 6px;
`,J=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,U=o.Ay.button`
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
`,Q=(0,o.Ay)(x.yl)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`,K=(0,o.Ay)(x.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`,Y=o.Ay.div`
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
`,X=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,ee=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`,te=o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,re=o.Ay.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.$danger?"background: #FEF2F2; color: #EF4444; border: 1px solid #EF4444; &:hover { background: #FEE2E2; }":"background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }"}
`,ne=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 8px;
`,oe={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},ie={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},ae=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),se=e=>{var t,o;let{tableNumber:i,statusInfo:a,tableInfo:l,currency:se,timezone:le,restaurantId:de,onClose:ce,onNewOrder:pe,onStatusChange:ue,onPayment:he,onNavigateToPOS:xe,onOrderUpdated:ge,onClearTable:me,onClearAllCompleted:fe,orders:ye=[],selectedOrderIndex:be=0,onOrderIndexChange:ve,qrMode:je="static"}=e;const{t:Ce}=(0,g.Bd)("floorplan"),[we,Ae]=(0,n.useState)(!1),{getStoreInfo:Fe,paymentSettings:Se}=(0,p.Pj)(),[ke,$e]=(0,n.useState)(null),[Ee,Be]=(0,n.useState)(!1),_e=(0,n.useCallback)(async()=>{if(de&&i)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&e.data?$e(e.data):$e(null)}else $e(null)}catch{$e(null)}},[de,i]);(0,n.useEffect)(()=>{_e()},[_e]);const[Ie,ze]=(0,n.useState)(null),[Te,De]=(0,n.useState)(!1),[Pe,Ne]=(0,n.useState)([]),[Oe,Re]=(0,n.useState)([]),[Me,We]=(0,n.useState)(!1),[He,Le]=(0,n.useState)(""),[qe,Je]=(0,n.useState)(!1),[Ue,Ve]=(0,n.useState)(null),Ge=(0,n.useCallback)(async()=>{if(de)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch(`/api/menu?restaurantId=${de}`,{headers:t});if(r.ok){var e;const t=await r.json(),n=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});Ne(n.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[de]);(0,n.useEffect)(()=>{Te?Ge():(Re([]),Le(""))},[Te,Ge]);const Qe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const n=r.map(e=>e.id||e.name).sort().join(",");Re(o=>{if(0===r.length){const r=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}else{const r=o.find(t=>{var r;return t.menuItemId===e.id&&(null===(r=t.selectedOptions)||void 0===r?void 0:r.map(e=>e.id||e.name).sort().join(","))===n});if(r)return o.map(e=>e.cartId===r.cartId?{...e,quantity:e.quantity+t}:e)}const i=r.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:r,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Ke=a&&"available"!==a.status,Ye=(null===a||void 0===a?void 0:a.orderStatus)||"",Ze=(null===a||void 0===a?void 0:a.paymentStatus)||"pending",Xe=((e,t)=>{switch(e){case"outstanding":return"payment_verification_pending"===t||"rejected"===t?null:{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Ye,Ze),et=(null===a||void 0===a?void 0:a.orderItems)||[],tt=["preparing","ready","served"].includes(Ye),rt=Ke&&s.v[Ye]?s.v[Ye]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},nt=(()=>{switch(Ze){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":case"rejected":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),ot={};et.forEach((e,t)=>{const r=e.order_group||0;ot[r]||(ot[r]=[]),ot[r].push({...e,_originalIndex:t})});const it=Object.keys(ot).map(Number).sort((e,t)=>e-t),at=e=>{if(!e)return"-";const t=new Date(e),r=le?{timeZone:le}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...r})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...r})},[st,lt]=(0,n.useState)(!1),dt=(e,t)=>{if(!a)return null;const r=e||et;return{orderNumber:a.orderNumber||"",pickupNumber:(a.orderNumber||"").split("-")[1]||"",date:a.orderCreatedAt?new Date(a.orderCreatedAt):new Date,orderType:a.orderType||"dine_in",orderSource:a.orderSource||"pos",tableNumber:i||null,pagerNumber:null,customerName:a.customerName||"Walk-in Customer",groupLabel:t,items:r.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:a.notes||"",takeawayCharge:0}},ct=async()=>{const e=dt();e&&0!==et.length&&await(0,u.Si)(e,Fe())},pt=async()=>{if(!Ee){Be(!0);try{const e=localStorage.getItem("auth_token");let t=ke;if(!t){const r=await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&e.data&&(t=e.data,$e(e.data))}}if(t){const e=Fe(),n=(null===e||void 0===e?void 0:e.name)||"Restaurant",o=(await r.e(8021).then(r.t.bind(r,8021,19))).default,a=document.createElement("canvas");await o.toCanvas(a,t.qr_url,{width:200,margin:2}),await(0,u.TG)(i,a,n)}}catch(e){console.error("Failed to print QR:",e)}Be(!1)}},ut=async()=>{if(!Ee){Be(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),$e(null)}catch(e){console.error("Failed to expire QR:",e)}Be(!1)}},ht="pending"===Ye?"outstanding":ae(Ye),xt=et.some(e=>(e.order_group||0)>0),gt=(null===a||void 0===a?void 0:a.paymentProof)||(null===a||void 0===a?void 0:a.payment_proof)||null,mt=(ft=gt)?ft.hasOwnProperty("current")?ft.current:ft:null;var ft;const yt=(e=>e&&e.hasOwnProperty("history")&&e.history||[])(gt);return(0,m.jsxs)(f,{children:[(0,m.jsxs)(x.aF,{isOpen:!!st,onClose:()=>lt(!1),title:"verify"===st?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"verify"===st?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(Q,{variant:"secondary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId){Ae(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"rejected",status:"outstanding"})}),lt(!1),ge()}catch(e){}Ae(!1)}},disabled:we,children:"Reject"}),(0,m.jsx)(K,{variant:"primary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId){Ae(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),"outstanding"===Ye&&await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending"})}),lt(!1),ge()}catch(e){}Ae(!1)}},disabled:we,children:"Confirm Payment"})]}):void 0,children:[(0,m.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,m.jsxs)("strong",{style:{color:"#0A2540"},children:["#",null===a||void 0===a?void 0:a.orderNumber]})]}),(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,m.jsxs)("strong",{style:{color:"#0A2540"},children:[se," ",null===a||void 0===a||null===(t=a.totalAmount)||void 0===t?void 0:t.toFixed(2)]})]}),(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,m.jsx)("strong",{style:{color:"#0A2540"},children:null===a||void 0===a?void 0:a.paymentMethod})]})]}),(0,m.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),mt?(0,m.jsxs)(m.Fragment,{children:[mt.reference&&(0,m.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,m.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,m.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:mt.reference})]}),mt.file_name&&(0,m.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",mt.file_name]}),mt.uploaded_at&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(mt.uploaded_at).toLocaleString()]}),mt.image&&(0,m.jsx)("img",{src:mt.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(mt.image,"_blank")})]}):(0,m.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===Ze?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),yt.length>0&&(0,m.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,m.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",yt.length,")"]}),yt.map((e,t)=>(0,m.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:t<yt.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,m.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||t+1]}),e.rejected_at&&(0,m.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,m.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,m.jsx)("img",{src:e.image,alt:`Previous proof #${t+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},t))]})]}),(0,m.jsxs)(y,{children:[(0,m.jsxs)(b,{children:[(0,m.jsxs)("h3",{children:["Table ",i]}),(0,m.jsxs)(v,{children:[null!==a&&void 0!==a&&a.guestCount?(0,m.jsxs)("span",{children:[a.guestCount," guests"]}):l?(0,m.jsxs)("span",{children:[l.seats," seats"]}):null,Ke&&(0,m.jsxs)("span",{children:[a.elapsedMinutes,"min"]})]}),Ke&&(0,m.jsxs)(C,{children:[(0,m.jsx)(w,{$color:rt.text,$bg:rt.bg,children:oe[Ye]||a.status}),(0,m.jsx)(w,{$color:nt.color,$bg:nt.bg,children:"completed"===Ze||"paid"===Ze?"Paid":"rejected"===Ze?"Rejected":"payment_verification_pending"===Ze?"Verifying":"Unpaid"})]}),!Ke&&(0,m.jsx)(C,{children:(0,m.jsx)(w,{$color:rt.text,$bg:rt.bg,children:"Available"})})]}),(0,m.jsx)(j,{onClick:ce,children:"\xd7"})]}),ye.length>1&&(0,m.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[ye.map((e,t)=>{var r;return(0,m.jsxs)("button",{onClick:()=>null===ve||void 0===ve?void 0:ve(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:be===t?600:400,border:be===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:be===t?"#EDE9FE":"white",color:be===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(r=e.orderNumber)||void 0===r?void 0:r.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[ye.length," orders"]})]}),Ke?Te?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(A,{style:{padding:"16px 20px"},children:[(0,m.jsx)("div",{style:{marginBottom:"16px"},children:(0,m.jsx)("input",{type:"text",placeholder:"Search menu items...",value:He,onChange:e=>Le(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),He.length>0&&(0,m.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Pe.filter(e=>{if(!e||!e.name)return!1;const t=He.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,m.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,m.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Qe(e,1,[]),Le("")},children:[(0,m.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,m.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,m.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,d.vv)(parseFloat(e.price)||0,se)}),t&&(0,m.jsx)("button",{onClick:t=>{t.stopPropagation(),Ve(e),Je(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Pe.filter(e=>{var t;const r=He.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(r))||e.code&&e.code.toLowerCase().includes(r)}).length&&(0,m.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,m.jsxs)("div",{children:[(0,m.jsxs)(S,{style:{marginBottom:"10px"},children:["Items to Add (",Oe.reduce((e,t)=>e+t.quantity,0),")"]}),0===Oe.length?(0,m.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,m.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Oe.map(e=>(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,m.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,m.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,m.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,m.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,d.vv)(e.unitPrice||parseFloat(e.price),se)," each"]})]}),(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,m.jsx)("button",{onClick:()=>{return t=e.cartId,void Re(e=>{const r=e.find(e=>e.cartId===t);return r&&r.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,m.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,m.jsx)("button",{onClick:()=>{return t=e.cartId,void Re(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,m.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,d.vv)(Oe.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),se)]})}),(0,m.jsx)(L,{$variant:"primary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId&&0!==Oe.length)try{We(!0);const e=localStorage.getItem("auth_token"),t=Oe.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),r=await fetch(`/api/orders/${a.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!r.ok){const e=await r.json();throw new Error(e.message||"Failed to add items")}De(!1),Re([]),Le(""),ge()}catch(e){console.error("Add items error:",e)}finally{We(!1)}},disabled:0===Oe.length||Me,children:Me?"Adding...":"Add to Order"}),(0,m.jsx)(L,{$variant:"secondary",onClick:()=>{De(!1),Re([]),Le("")},children:"Cancel"})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(A,{children:[(0,m.jsxs)(F,{children:[(0,m.jsxs)(S,{children:["Order ",a.orderNumber||"",a.customerName&&"Walk-in Customer"!==a.customerName?` \u2014 ${a.customerName}`:""]}),(0,m.jsxs)(k,{children:[(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Customer"}),(0,m.jsx)(B,{children:a.customerName||"Walk-in"})]}),a.customerPhone&&(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Phone"}),(0,m.jsx)(B,{children:a.customerPhone})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Type"}),(0,m.jsx)(B,{children:(a.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Source"}),(0,m.jsx)(B,{children:ie[a.orderSource||"pos"]||a.orderSource})]}),(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Time"}),(0,m.jsx)(B,{children:at(a.orderCreatedAt)})]}),a.paymentMethod&&(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Payment"}),(0,m.jsx)(B,{children:(0,c.MA)(a.paymentMethod,a.cardType,Se||void 0)})]}),mt&&(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Receipt"}),(0,m.jsx)(B,{children:(0,m.jsx)("span",{onClick:()=>lt("view"),style:{color:"#635BFF",cursor:"pointer",fontWeight:500},children:"View \u2192"})})]}),a.cashierName&&(0,m.jsxs)($,{children:[(0,m.jsx)(E,{children:"Cashier"}),(0,m.jsx)(B,{children:a.cashierName})]})]})]}),(0,m.jsxs)(F,{children:[(0,m.jsxs)(S,{children:["Items (",et.length,")",tt&&et.length>0&&` \u2014 ${et.filter(e=>"completed"===e.status).length}/${et.length} served`]}),it.map(e=>{const t=ot[e],r=e>0,n=t[0];return(0,m.jsxs)("div",{children:[(it.length>1||r)&&(0,m.jsxs)(_,{$isAdded:r,children:[(0,m.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===n||void 0===n?void 0:n.added_at)&&(0,m.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:at(n.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,n=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,m.jsxs)(I,{$completed:r&&tt,children:[tt&&(0,m.jsx)(z,{$checked:r,onClick:()=>(async e=>{if(!we&&null!==a&&void 0!==a&&a.orderId){Ae(!0);try{const t=et.map((t,r)=>r===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${a.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Ye)&&await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),ge())}catch(t){}Ae(!1)}})(t),disabled:we,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,m.jsxs)(T,{children:[(0,m.jsxs)(D,{$completed:r,children:[e.name," ",(0,m.jsxs)(O,{children:["x",e.quantity]})]}),n&&(0,m.jsx)(P,{children:n})]}),(0,m.jsx)(N,{children:(0,d.vv)(e.price*e.quantity,se)}),"completed"!==Ze&&et.length>1&&(0,m.jsx)(R,{onClick:()=>{return r=t,n=e.name,void(null!==a&&void 0!==a&&a.orderId&&ze({title:"Delete Item",message:`Delete "${n}" from this order?`,onConfirm:async()=>{ze(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${a.orderId}/items/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&ge()}catch(e){}}}));var r,n},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===et.length&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,m.jsxs)(F,{style:{borderBottom:"none"},children:[(0,m.jsx)(S,{children:"Summary"}),(0,m.jsxs)(M,{children:[(0,m.jsx)("span",{children:"Subtotal"}),(0,m.jsx)("span",{children:(0,d.vv)(a.subtotal||0,se)})]}),(a.discountPolicyAmount||0)>0&&(0,m.jsxs)(M,{children:[(0,m.jsxs)("span",{children:["Discount",a.discountPolicyName?` (${a.discountPolicyName})`:""]}),(0,m.jsxs)("span",{children:["-",(0,d.vv)(a.discountPolicyAmount||0,se)]})]}),(a.couponDiscount||0)>0&&(0,m.jsxs)(M,{children:[(0,m.jsxs)("span",{children:["Coupon",a.couponCode?` (${a.couponCode})`:""]}),(0,m.jsxs)("span",{children:["-",(0,d.vv)(a.couponDiscount||0,se)]})]}),(a.pointDiscount||0)>0&&(0,m.jsxs)(M,{children:[(0,m.jsxs)("span",{children:["Points",a.pointsUsed?` (${a.pointsUsed} pts)`:""]}),(0,m.jsxs)("span",{children:["-",(0,d.vv)(a.pointDiscount||0,se)]})]}),(a.discount||0)>0&&!a.couponDiscount&&!a.discountPolicyAmount&&!a.pointDiscount&&(0,m.jsxs)(M,{children:[(0,m.jsx)("span",{children:"Discount"}),(0,m.jsxs)("span",{children:["-",(0,d.vv)(a.discount||0,se)]})]}),(a.serviceCharge||0)>0&&(0,m.jsxs)(M,{children:[(0,m.jsxs)("span",{children:["Svc Charge",a.serviceChargeRate?` (${a.serviceChargeRate}%)`:""]}),(0,m.jsx)("span",{children:(0,d.vv)(a.serviceCharge||0,se)})]}),(a.tax||0)>0&&(0,m.jsxs)(M,{children:[(0,m.jsxs)("span",{children:["Tax",a.taxRate?` (${a.taxRate}%)`:""]}),(0,m.jsx)("span",{children:(0,d.vv)(a.tax||0,se)})]}),(0,m.jsxs)(M,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,m.jsx)("span",{children:"Total"}),(0,m.jsx)("span",{children:(0,d.vv)(a.totalAmount,se)})]}),a.notes&&(0,m.jsx)(W,{children:a.notes})]})]}),(0,m.jsxs)(H,{children:[(0,m.jsxs)(J,{children:[(0,m.jsxs)(U,{onClick:async()=>{const e=a?{orderNumber:a.orderNumber||"",pickupNumber:(a.orderNumber||"").split("-")[1]||"",tableNumber:i||null,pagerNumber:null,date:a.orderCreatedAt?new Date(a.orderCreatedAt):new Date,items:et.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(r){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(a.subtotal||0)),discount:parseFloat(String(a.discount||0)),coupon:a.couponCode?{code:a.couponCode,discount:parseFloat(String(a.couponDiscount||0))}:null,serviceCharge:parseFloat(String(a.serviceCharge||0)),serviceChargeRate:parseFloat(String(a.serviceChargeRate||10)),tax:parseFloat(String(a.tax||0)),taxRate:parseFloat(String(a.taxRate||6)),total:parseFloat(String(a.totalAmount||0)),paymentMethod:a.paymentMethod||"cash",amountReceived:0,change:0,cashierName:a.cashierName||null}:null;e&&0!==et.length&&await(0,u.pG)(e,Fe())},title:"Print Bill",children:[(0,m.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,m.jsxs)(U,{onClick:ct,title:"Print Order Ticket",children:[(0,m.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),xt&&(0,m.jsx)(U,{onClick:async()=>{if(0===et.length)return;const e=et.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void ct();const r=et.filter(e=>(e.order_group||0)===t),n=dt(r,`+Order ${t}`);n&&await(0,u.Si)(n,Fe())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,m.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,m.jsx)("path",{d:"M12 4v16m8-8H4"})})}),ht&&(0,m.jsx)(U,{onClick:async()=>{if(null===a||void 0===a||!a.orderId||we)return;const e="pending"===Ye?"outstanding":ae(Ye);if(e){Ae(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),ge()}catch(t){}Ae(!1)}},title:`Revert to ${oe[ht]||ht}`,children:(0,m.jsx)(V,{children:"\u21ba"})}),"completed"!==Ye&&"cancelled"!==Ye&&"pending"!==Ze&&"payment_verification_pending"!==Ze&&a.orderId&&(0,m.jsx)(U,{onClick:()=>ue(a.orderId,"completed"),title:"Mark as Completed",children:(0,m.jsx)(V,{children:"\u2713"})})]}),Xe&&a.orderId&&"completed"!==Ye&&"cancelled"!==Ye&&(0,m.jsx)(L,{$variant:"primary",onClick:()=>ue(a.orderId,Xe.status),disabled:we,style:"outstanding"===Ye?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Ye?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===Xe.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Xe.label}),"payment_verification_pending"===Ze&&(0,m.jsx)(L,{$variant:"success",onClick:()=>{lt("verify")},disabled:we,children:"Confirm Payment"}),(0,m.jsxs)(q,{children:["pending"===Ze&&!["served","completed","cancelled"].includes(Ye)&&(0,m.jsx)(L,{$variant:"secondary",onClick:()=>De(!0),children:"Add Items"}),"pending"===Ze&&(0,m.jsx)(L,{$variant:"served"===Ye?"success":"secondary",onClick:he,children:"Payment"})]}),"cancelled"!==Ye&&"completed"!==Ye&&(0,m.jsx)(L,{$variant:"danger",onClick:()=>{null!==a&&void 0!==a&&a.orderId&&ze({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{ze(null),Ae(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),ge()}catch(e){}Ae(!1)}})},disabled:we,children:"Cancel Order"}),"completed"===Ye&&a.orderId&&(0,m.jsx)(L,{$variant:"primary",onClick:()=>me(a.orderId),disabled:we,children:"Leaved"}),"session"===je&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(q,{children:[(0,m.jsx)(L,{$variant:"secondary",onClick:pt,disabled:Ee,children:Ee?"Printing...":(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:4,verticalAlign:"middle"},children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Reprint QR"]})}),ke&&(0,m.jsx)(L,{$variant:"danger",onClick:ut,disabled:Ee,style:{flex:"0 0 auto",width:"auto",padding:"9px 16px"},children:"Expire QR"})]}),ke?(0,m.jsx)(ne,{children:(0,m.jsxs)("div",{children:[(0,m.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",null!==(o=ke.remaining_minutes)&&void 0!==o?o:0,"min left)"]}),(0,m.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:["Printed: ",new Date(ke.created_at).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})," \xb7 ","Orders until ",new Date(ke.expires_at).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit"})]})]})}):(0,m.jsx)(m.Fragment,{})]}),(0,m.jsx)(L,{$variant:"link",onClick:xe,children:"Open in POS Terminal \u2197"})]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(G,{children:[(0,m.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,m.jsx)("p",{children:"This table is available"})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(L,{$variant:"primary",onClick:pe,children:"+ New Order"}),"session"===je&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(L,{$variant:"secondary",onClick:pt,disabled:Ee,children:Ee?"Printing...":(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:4,verticalAlign:"middle"},children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Print QR"]})}),ke?(0,m.jsxs)(ne,{children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",ke.remaining_minutes,"min left)"]}),(0,m.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:["Printed: ",ke.created_at?new Date(ke.created_at).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"just now",(0,m.jsx)("br",{}),"Orders accepted until ",new Date(ke.expires_at).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit"})]})]}),(0,m.jsx)(L,{$variant:"link",onClick:ut,style:{padding:"4px 8px",fontSize:"12px",width:"auto"},children:"Expire"})]}):(0,m.jsx)(ne,{style:{color:"#6B7280",fontSize:"12px"},children:"Print QR to generate a session-based ordering code for this table."})]}),(0,m.jsx)(L,{$variant:"link",onClick:xe,children:"Open in POS Terminal \u2197"})]})]}),Ue&&(0,m.jsx)(h.A,{isOpen:qe,onClose:()=>{Je(!1),Ve(null)},menuItem:{id:Ue.id,name:Ue.name,price:parseFloat(Ue.price)||0,emoji:Ue.emoji||"",image:Ue.image,optionGroups:Ue.optionGroups},onConfirm:(e,t,r)=>{Qe(Ue,e,r),Je(!1),Ve(null),Le("")}}),Ie&&(0,m.jsx)(Y,{onClick:()=>ze(null),children:(0,m.jsxs)(Z,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)(X,{children:Ie.title}),(0,m.jsx)(ee,{children:Ie.message}),(0,m.jsxs)(te,{children:[(0,m.jsx)(re,{onClick:()=>ze(null),children:"Cancel"}),(0,m.jsx)(re,{$danger:!0,onClick:Ie.onConfirm,children:"Confirm"})]})]})})]})},le=o.Ay.div`
  background: white;
  padding: 10px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  flex-wrap: wrap;
  font-size: 12px;

  @media (max-width: 768px) {
    padding: 8px 12px;
    gap: 10px;
    font-size: 11px;
  }
`,de=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,ce=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
  font-weight: 500;
`,pe=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,ue=o.Ay.div`
  width: 1px;
  height: 18px;
  background: #E6EBF1;
`,he=o.Ay.div`
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,xe=o.Ay.input`
  width: 36px;
  border: none;
  border-bottom: 1px dashed #635BFF;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  padding: 0;
  outline: none;

  &:focus {
    border-bottom-style: solid;
    border-bottom-color: #635BFF;
  }
`,ge=e=>{let{tables:t,tableStatuses:r,currency:o,restaurantId:i}=e;const{t:a}=(0,g.Bd)("floorplan"),[l,d]=(t.length,(0,n.useState)(null)),[c,p]=(0,n.useState)(20),[u,h]=(0,n.useState)(!1),x=(0,n.useRef)(null),f=(0,n.useRef)(null),y={available:0,occupied:0,ready:0,"needs-attention":0,completed:0};t.forEach(e=>{const t=r[e.tableNumber],n=(null===t||void 0===t?void 0:t.status)||"available";y[n]++}),(0,n.useEffect)(()=>{const e=async()=>{try{const e=localStorage.getItem("auth_token"),t=(new Date).toISOString().split("T")[0],r=await fetch(`/api/orders/restaurant/${i}/counts?startDate=${t}&endDate=${t}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const n=await r.json(),o=n.statistics||n,a=await fetch(`/api/orders?restaurantId=${i}&status=all&startDate=${t}&endDate=${t}&limit=500`,{headers:{Authorization:`Bearer ${e}`}});let s={avg:0,max:0,min:0},l=0,p=0;if(a.ok){const e=await a.json(),t=e.data||e.orders||e||[];if(p=Array.isArray(t)?t.length:0,Array.isArray(t)&&t.length>0){const e=[];t.forEach(t=>{if("cancelled"!==t.status&&t.created_at&&t.completed_at){const r=(new Date(t.completed_at).getTime()-new Date(t.created_at).getTime())/6e4;r>0&&r<300&&e.push(r)}}),e.length>0&&(s.avg=parseFloat((e.reduce((e,t)=>e+t,0)/e.length).toFixed(1)),s.max=parseFloat(Math.max(...e).toFixed(1)),s.min=parseFloat(Math.min(...e).toFixed(1)));const r=t.filter(e=>"cancelled"!==e.status),n=r.filter(e=>parseFloat(e.total_amount)>=c).length;l=r.length>0?parseFloat((n/r.length*100).toFixed(1)):0}}d({totalSales:parseFloat(o.totalSales||o.total_sales||0),avgAmount:parseFloat(o.avgAmount||o.avg_amount||0),maxAmount:parseFloat(o.maxAmount||o.max_amount||0),orderCount:parseInt(o.totalOrders||o.total_orders||p||0),avgServeTime:s.avg,maxServeTime:s.max,minServeTime:s.min,aboveThresholdPercent:l})}}catch(e){console.error("Failed to fetch floor plan stats:",e)}};(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e,n="string"===typeof r.operation_settings?JSON.parse(r.operation_settings):r.operation_settings;null!==n&&void 0!==n&&n.salesThreshold&&p(n.salesThreshold)}}catch(e){}})(),e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[i,c]);const b="MYR"===o?"RM":o;return(0,m.jsxs)(le,{children:[(0,m.jsx)(de,{children:Object.keys(s.Ez).map(e=>(0,m.jsxs)(ce,{children:[(0,m.jsx)(pe,{$color:s.Ez[e].border}),s.Zt[e]," ",y[e]]},e))}),l&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(ue,{}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.sales"),(0,m.jsxs)("span",{children:[b,l.totalSales.toLocaleString(void 0,{minimumFractionDigits:"KRW"===o?0:2})]})]}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.avg"),(0,m.jsxs)("span",{children:[b,l.avgAmount.toLocaleString(void 0,{minimumFractionDigits:"KRW"===o?0:2})]})]}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.max"),(0,m.jsxs)("span",{children:[b,l.maxAmount.toLocaleString(void 0,{minimumFractionDigits:"KRW"===o?0:2})]})]}),(0,m.jsxs)(he,{children:["\u2265",b,(0,m.jsx)(xe,{ref:x,type:"number",value:c,onChange:e=>(t=>{const r=parseInt(t)||0;p(r),f.current&&clearTimeout(f.current),f.current=setTimeout(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const n=await t.json(),o=n.data||n,a="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings||{};a.salesThreshold=r,await fetch(`/api/restaurants/${i}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({operation_settings:a})})}}catch(e){console.error("Failed to save threshold:",e)}},1e3)})(e.target.value),onFocus:()=>h(!0),onBlur:()=>h(!1),min:"0"})," ",(0,m.jsxs)("span",{children:[l.aboveThresholdPercent,"%"]})]}),l.avgServeTime>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(ue,{}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.avgServe"),(0,m.jsxs)("span",{children:[l.avgServeTime,"m"]})]}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.max"),(0,m.jsxs)("span",{children:[l.maxServeTime,"m"]})]}),(0,m.jsxs)(he,{children:[a("floorplan:floorPlanStatsBar.min"),(0,m.jsxs)("span",{children:[l.minServeTime,"m"]})]})]})]})]})};var me=r(2966),fe=r(8406),ye=r(3577),be=r(3422);const ve=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,je=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,Ce=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,we=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Ae=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,Fe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,Se=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ke=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,$e=o.Ay.button`
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
`,Ee=o.Ay.button`
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
`,Be=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,_e=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Ie=o.Ay.div`
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
`,Te=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,De=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,Pe=o.Ay.button`
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
`,Ne=o.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,Oe=()=>{var e;const{t:t}=(0,g.Bd)("floorplan"),{restaurantId:r}=(0,i.g)(),o=(0,i.Zp)(),{user:d}=(0,a.As)(),[c,p]=(0,n.useState)(s.He),[u,h]=(0,n.useState)({}),[x,f]=(0,n.useState)(!1),[y,b]=(0,n.useState)(""),[v,j]=(0,n.useState)(!0),[C,w]=(0,n.useState)(""),[A,F]=(0,n.useState)("Asia/Kuala_Lumpur"),[S,k]=(0,n.useState)("static"),$=(0,n.useRef)(null),E=(0,n.useRef)(null),B=(0,n.useRef)(null),[_,I]=(0,n.useState)(null),[z,T]=(0,n.useState)(0),[D,P]=(0,n.useState)(!1),[N,O]=(0,n.useState)(null),[R,M]=(0,n.useState)(null),[W,H]=(0,n.useState)(!1),[L,q]=(0,n.useState)(!1),[J,U]=(0,n.useState)(""),[V,G]=(0,n.useState)(null);(0,n.useEffect)(()=>{const e=()=>{const e=new Date;b(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:A}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[A]);const Q=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();h(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[r]),K=(0,n.useCallback)(()=>{$.current&&clearTimeout($.current),$.current=setTimeout(()=>Q(),2e3)},[Q]);(0,n.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(!t.ok)return;const n=await t.json(),o=n.data||n;if(o.floor_plan&&p(o.floor_plan),o.currency&&w(o.currency),o.table_settings){const e="string"===typeof o.table_settings?JSON.parse(o.table_settings):o.table_settings;e.qrMode&&k(e.qrMode)}if(o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;F((0,fe.ng)(e))}o.payment_settings&&O(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{j(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/membership/settings/${r}`,{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&n.data&&M(n.data)}catch(e){}})(),Q()},[r,Q]),(0,n.useEffect)(()=>{if(!r)return;const e=(0,be.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{f(!0),e.emit("join-restaurant",r),Q()}),e.on("disconnect",()=>f(!1)),e.on("order-updated",()=>K()),e.on("order-created",()=>K()),e.on("order-items-added",e=>{K(),G({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>K()),E.current=e,()=>{e.disconnect(),E.current=null}},[r,Q,K]),(0,n.useEffect)(()=>{if(!r)return;const e=(0,be.Ay)("/checkout-display",{transports:["websocket","polling"]});return e.on("connect",()=>e.emit("join-restaurant",r)),e.on("customer-checkin",e=>{}),B.current=e,()=>{e.disconnect(),B.current=null}},[r]),(0,n.useEffect)(()=>{const e=setInterval(()=>Q(),3e4);return()=>clearInterval(e)},[Q]),(0,n.useEffect)(()=>{const e=e=>{var t,r;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(r=e.data)||void 0===r?void 0:r.type)||(q(!1),U(""),Q())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[Q]);const Y=_?u[_]:void 0,Z=(null===Y||void 0===Y?void 0:Y.orders)||(Y?[Y]:[]),X=Math.min(z,Math.max(Z.length-1,0)),ee=Z.length>0?Z[X]:Y,te=_?c.tables.find(e=>e.tableNumber===_):void 0;return v?(0,m.jsxs)(ve,{children:[(0,m.jsx)(je,{children:(0,m.jsx)(Ce,{children:(0,m.jsx)(we,{children:t("floorplan:floorPlanPage.floorPlan")})})}),(0,m.jsx)(Ie,{children:t("floorplan:floorPlanPage.loadingFloorPlan")})]}):(0,m.jsxs)(ve,{children:[(null===V||void 0===V?void 0:V.isVisible)&&(0,m.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,m.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,m.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:t("floorplan:floorPlanPage.newItemsAdded")}),(0,m.jsx)("button",{onClick:()=>G(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,m.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,m.jsxs)("strong",{children:["Order ",V.orderNumber]}),V.tableNumber&&` (Table ${V.tableNumber})`,(0,m.jsx)("br",{}),(0,m.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",V.orderGroup]})," ",V.itemCount," item",V.itemCount>1?"s":""," added"]}),(0,m.jsx)("button",{onClick:()=>{V.tableNumber&&I(V.tableNumber),G(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:t("floorplan:floorPlanPage.viewTable")})]}),(0,m.jsxs)(je,{children:[(0,m.jsxs)(Ce,{children:[(0,m.jsx)(Ee,{onClick:()=>o(`/restaurant/${r}/dashboard`),children:"\u2190 Back"}),(0,m.jsx)(we,{children:t("floorplan:floorPlanPage.floorPlan")}),(0,m.jsxs)(Fe,{children:[(0,m.jsx)(Ae,{$connected:x}),x?"Live":"Offline"]})]}),(0,m.jsxs)(Se,{children:[(0,m.jsx)(ke,{children:y}),(0,m.jsxs)($e,{onClick:()=>H(!0),children:[(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"14px",height:"14px",verticalAlign:"middle",marginRight:"4px"},children:(0,m.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]}),"Restaurant Admin"===(null===d||void 0===d?void 0:d.role)&&(0,m.jsx)($e,{onClick:()=>o(`/restaurant/${r}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,m.jsxs)(Be,{children:[(0,m.jsx)(_e,{children:(0,m.jsx)(l.A,{floorPlan:c,tableStatuses:u,onTableClick:e=>{I(t=>t===e?null:e),T(0)},selectedTableId:_?null===(e=c.tables.find(e=>e.tableNumber===_))||void 0===e?void 0:e.id:null,currency:C})}),_&&(0,m.jsx)(se,{tableNumber:_,statusInfo:ee,tableInfo:te,currency:C,timezone:A,restaurantId:Number(r),onClose:()=>I(null),onNewOrder:()=>{if(!_)return;const e=new URLSearchParams;e.set("table",_),e.set("from","floor-plan-overlay"),U(`/restaurant/${r}/pos-terminal?${e.toString()}`),q(!0)},onStatusChange:async(e,t)=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:t})})).ok&&await Q()}catch(r){console.error("Failed to update order status:",r)}},onPayment:()=>{if(P(!0),B.current&&_){const t=u[_];if(t){var e;const n=(null===(e=t.items)||void 0===e?void 0:e.map(e=>({name:e.name||e.menu_item_name||"Item",quantity:e.quantity||1,price:parseFloat(e.price)||0,options:e.options||[]})))||[];B.current.emit("cart-update",{restaurantId:r,items:n,subtotal:parseFloat(t.subtotal||t.totalAmount)||0,tax:parseFloat(t.tax)||0,taxRate:0,serviceCharge:parseFloat(t.serviceCharge)||0,serviceChargeRate:0,discount:parseFloat(t.discount)||0,total:parseFloat(t.totalAmount)||0,currency:"MYR"})}}},onNavigateToPOS:()=>{_&&o(`/restaurant/${r}/pos-terminal?table=${_}&from=floor-plan`)},onOrderUpdated:Q,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),I(null),await Q()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(_)try{const e=localStorage.getItem("auth_token"),t=Z.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),I(null),await Q()}catch(e){console.error("Failed to clear table:",e)}},orders:Z,selectedOrderIndex:X,onOrderIndexChange:T,qrMode:S})]}),(0,m.jsx)(ge,{tables:c.tables,tableStatuses:u,currency:C,restaurantId:Number(r)}),D&&ee&&(0,m.jsx)(me.A,{isOpen:D,onClose:()=>P(!1),total:Number(ee.totalAmount||0),subtotal:Number(ee.subtotal||ee.totalAmount||0),tax:Number(ee.tax||0),serviceCharge:Number(ee.serviceCharge||0),discountAmount:Number(ee.discount||0),couponDiscount:Number(ee.couponDiscount||0),onConfirmPayment:async(e,t,n,o,i,a)=>{if(!_)return;const s=u[_];if(null!==s&&void 0!==s&&s.orderId)try{const t=localStorage.getItem("auth_token"),n={payment_status:"completed",payment_method:e,card_type:"card"===e&&a||null};o&&o>0&&i&&i>0&&(n.points_used=o,n.point_discount=i,n.total_amount=(s.totalAmount||0)-i);(await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&("outstanding"===s.orderStatus?await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"pending"})}):"served"===s.orderStatus&&await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"completed"})}),P(!1),await Q(),B.current&&B.current.emit("checkout-complete",{restaurantId:r,orderNumber:s.orderNumber||"",total:parseFloat(s.totalAmount)||0,currency:"MYR"}))}catch(l){console.error("Failed to process payment:",l)}},paymentMethods:N,customerId:ee.customerId||void 0,restaurantId:Number(r),membershipSettings:R}),(0,m.jsxs)(ze,{$isOpen:L,children:[(0,m.jsxs)(Te,{children:[(0,m.jsxs)(De,{children:["POS Terminal \u2014 Table ",_]}),(0,m.jsx)(Pe,{onClick:()=>{q(!1),U(""),Q()},children:"\xd7 Close"})]}),L&&J&&(0,m.jsx)(Ne,{src:J,title:"POS Terminal"})]}),(0,m.jsx)(ye.A,{isOpen:W,onClose:()=>H(!1)})]})}},5783:(e,t,r)=>{r.d(t,{A:()=>w});var n=r(9950),o=r(4752),i=r(7447),a=r(5030),s=r(4414);const l=o.Ay.div`
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
`,c=o.Ay.div`
  font-size: 10px;
  font-weight: 500;
  color: ${e=>e.$textColor};
  opacity: 0.7;
  margin-top: 2px;
`,p=o.Ay.div`
  font-size: 9px;
  font-weight: 600;
  color: ${e=>e.$textColor};
  margin-top: 3px;
`,u=o.Ay.div`
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
`,h=o.Ay.div`
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
`,x=new Set(["kitchen","entrance"]),g={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},m=n.memo(e=>{let{table:t,status:r="available",isSelected:n=!1,isEditing:o=!1,onClick:m,onMouseDown:f,onTouchStart:y,statusInfo:b,currency:v=""}=e;const j=t.tableType||"table",C="table"!==j,w=x.has(j),A=C?g[j]||g.kitchen:o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!o&&null!==b&&void 0!==b&&b.orderStatus&&i.v[b.orderStatus]?i.v[b.orderStatus]:i.Ez[r],F=C?{...w?{background:"transparent",border:n&&o?"1.5px dashed #635BFF":"none",boxShadow:n&&o?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${n?"#635BFF":A.border}`},cursor:o?"grab":"default",opacity:o?1:.85}:void 0,S="counter"===j&&t.width<t.height,k=!o&&"staffMeal"===(null===b||void 0===b?void 0:b.paymentMethod),{t:$}=(0,a.Bd)("floorplan");return(0,s.jsxs)(l,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:w?"square":t.shape,$rotation:t.rotation,$bgColor:w?"transparent":A.bg,$borderColor:w?"transparent":A.border,$textColor:A.text,$isSelected:n&&!w,$isEditing:o,onClick:e=>{o||!m||C||(e.stopPropagation(),m(t.tableNumber))},onMouseDown:e=>{o&&f&&f(e,t.id)},onTouchStart:e=>{o&&y&&y(e,t.id)},style:F,children:[k&&(0,s.jsx)(u,{children:"STAFF"}),!C&&(null===b||void 0===b?void 0:b.orderCount)&&b.orderCount>1&&(0,s.jsx)(h,{children:b.orderCount}),(0,s.jsx)(d,{$textColor:A.text,style:w?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:S?{writingMode:"vertical-rl",textOrientation:"mixed",letterSpacing:"1px"}:void 0,children:t.label||t.tableNumber}),!C&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c,{$textColor:A.text,children:!o&&null!==b&&void 0!==b&&b.guestCount?`${b.guestCount} guests`:`${t.seats} seats`}),!o&&b&&"available"!==r&&(0,s.jsx)(p,{$textColor:A.text,children:k?"Staff Meal":{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[b.orderStatus||""]||"Occupied"})]})]})});m.displayName="TableNode";const f=m,y=o.Ay.div`
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
`,v=o.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,j=o.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,C=o.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,w=e=>{let{floorPlan:t,tableStatuses:r={},isEditing:o=!1,selectedTableId:i,onTableClick:l,onTableMouseDown:d,onTableTouchStart:c,onCanvasClick:p,currency:u=""}=e;const{t:h}=(0,a.Bd)("common"),x=(0,n.useRef)(null),g=(0,n.useRef)(null),[m,w]=(0,n.useState)(1),[A,F]=(0,n.useState)({x:0,y:0}),S=(0,n.useMemo)(()=>{if(o||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,r=1/0,n=-1/0,i=-1/0;for(const o of t.tables){const t=o.width/2,a=o.height/2;e=Math.min(e,o.x-t),r=Math.min(r,o.y-a),n=Math.max(n,o.x+t),i=Math.max(i,o.y+a)}const a=n-e,s=i-r,l=Math.max(.1*a,40),d=Math.max(.1*s,40);return{x:e-l,y:r-d,w:a+2*l,h:s+2*d}},[t,o]),k=(0,n.useCallback)(()=>{if(!g.current)return;const e=g.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=S.w/e.width,r=S.h/e.height,n=Math.max(t,r);w(n);const o=S.w/n,i=S.h/n;F({x:(e.width-o)/2,y:(e.height-i)/2})},[S]);(0,n.useEffect)(()=>{k();const e=new ResizeObserver(()=>k());return x.current&&e.observe(x.current),()=>e.disconnect()},[k]);const $=e=>{var t;return(null===(t=r[e])||void 0===t?void 0:t.status)||"available"};return(0,s.jsx)(y,{ref:x,children:(0,s.jsxs)(b,{ref:g,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===p||void 0===p||p())},children:[o&&t.showGrid&&(0,s.jsx)(v,{$gridSize:t.gridSize,$scale:m}),(0,s.jsx)(j,{"data-scaled-layer":!0,style:{transform:`scale(${1/m})`,left:o?0:A.x-S.x/m+"px",top:o?0:A.y-S.y/m+"px",width:o?`${t.canvasWidth}px`:`${S.w}px`,height:o?`${t.canvasHeight}px`:`${S.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===p||void 0===p||p())},children:t.tables.map(e=>(0,s.jsx)(f,{table:e,status:$(e.tableNumber),isSelected:i===e.id,isEditing:o,onClick:l,onMouseDown:d,onTouchStart:c,statusInfo:r[e.tableNumber],currency:u},e.id))}),0===t.tables.length&&(0,s.jsxs)(C,{children:[(0,s.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,r)=>{r.d(t,{Em:()=>o,Ez:()=>a,He:()=>n,Zt:()=>s,h_:()=>i,v:()=>l});const n={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],i=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EDE9FE",border:"#7C3AED",text:"#6D28D9"},ready:{bg:"#DCFCE7",border:"#16A34A",text:"#15803D"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#B91C1C"},completed:{bg:"#F3F4F6",border:"#9CA3AF",text:"#6B7280"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention",completed:"Completed"},l={outstanding:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"},pending:{bg:"#FEF9C3",text:"#A16207",border:"#CA8A04"},preparing:{bg:"#EDE9FE",text:"#6D28D9",border:"#7C3AED"},ready:{bg:"#DCFCE7",text:"#15803D",border:"#16A34A"},served:{bg:"#D1FAE5",text:"#047857",border:"#059669"},completed:{bg:"#F3F4F6",text:"#6B7280",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#B91C1C",border:"#DC2626"},awaiting_payment:{bg:"#FFF7ED",text:"#C2410C",border:"#F97316"}}}}]);