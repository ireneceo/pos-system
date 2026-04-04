"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Oe});var r=n(9950),o=n(4752),i=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(8285),p=n(9018),u=n(5863),x=n(9189),h=n(8409),g=n(4414);const m=o.Ay.div`
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
`,U=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,V=o.Ay.div`
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
`,Q=(0,o.Ay)(h.yl)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`,Z=o.Ay.div`
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
`,K=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,X=o.Ay.div`
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
`,ne=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 8px;
`,re={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},oe={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},ie=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),ae=e=>{var t,o;let{tableNumber:i,statusInfo:a,tableInfo:d,currency:ae,timezone:se,restaurantId:de,onClose:le,onNewOrder:ce,onStatusChange:pe,onPayment:ue,onNavigateToPOS:xe,onOrderUpdated:he,onClearTable:ge,onClearAllCompleted:me,orders:ye=[],selectedOrderIndex:be=0,onOrderIndexChange:fe,qrMode:ve="static"}=e;const[je,Ce]=(0,r.useState)(!1),{getStoreInfo:Ae,paymentSettings:we}=(0,p.Pj)(),[Fe,ke]=(0,r.useState)(null),[Se,$e]=(0,r.useState)(!1),Ee=(0,r.useCallback)(async()=>{if(de&&i)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&e.data?ke(e.data):ke(null)}else ke(null)}catch{ke(null)}},[de,i]);(0,r.useEffect)(()=>{Ee()},[Ee]);const[Be,ze]=(0,r.useState)(null),[Ie,_e]=(0,r.useState)(!1),[Te,De]=(0,r.useState)([]),[Ne,Oe]=(0,r.useState)([]),[Pe,Re]=(0,r.useState)(!1),[Me,We]=(0,r.useState)(""),[He,Le]=(0,r.useState)(!1),[qe,Je]=(0,r.useState)(null),Ue=(0,r.useCallback)(async()=>{if(de)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch(`/api/menu?restaurantId=${de}`,{headers:t});if(n.ok){var e;const t=await n.json(),r=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});De(r.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[de]);(0,r.useEffect)(()=>{Ie?Ue():(Oe([]),We(""))},[Ie,Ue]);const Ve=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=n.map(e=>e.id||e.name).sort().join(",");Oe(o=>{if(0===n.length){const n=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}else{const n=o.find(t=>{var n;return t.menuItemId===e.id&&(null===(n=t.selectedOptions)||void 0===n?void 0:n.map(e=>e.id||e.name).sort().join(","))===r});if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}const i=n.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:n,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Ge=a&&"available"!==a.status,Qe=(null===a||void 0===a?void 0:a.orderStatus)||"",Ze=(null===a||void 0===a?void 0:a.paymentStatus)||"pending",Ye=((e,t)=>{switch(e){case"outstanding":return"payment_verification_pending"===t||"rejected"===t?null:{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Qe,Ze),Ke=(null===a||void 0===a?void 0:a.orderItems)||[],Xe=["preparing","ready","served"].includes(Qe),et=Ge&&s.v[Qe]?s.v[Qe]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},tt=(()=>{switch(Ze){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":case"rejected":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),nt={};Ke.forEach((e,t)=>{const n=e.order_group||0;nt[n]||(nt[n]=[]),nt[n].push({...e,_originalIndex:t})});const rt=Object.keys(nt).map(Number).sort((e,t)=>e-t),ot=e=>{if(!e)return"-";const t=new Date(e),n=se?{timeZone:se}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},[it,at]=(0,r.useState)(!1),st=(e,t)=>{if(!a)return null;const n=e||Ke;return{orderNumber:a.orderNumber||"",pickupNumber:(a.orderNumber||"").split("-")[1]||"",date:a.orderCreatedAt?new Date(a.orderCreatedAt):new Date,orderType:a.orderType||"dine_in",orderSource:a.orderSource||"pos",tableNumber:i||null,pagerNumber:null,customerName:a.customerName||"Walk-in Customer",groupLabel:t,items:n.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:a.notes||"",takeawayCharge:0}},dt=async()=>{const e=st();e&&0!==Ke.length&&await(0,u.Si)(e,Ae())},lt=async()=>{if(!Se){$e(!0);try{const e=localStorage.getItem("auth_token");let t=Fe;if(!t){const n=await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&e.data&&(t=e.data,ke(e.data))}}if(t){const e=Ae(),r=(null===e||void 0===e?void 0:e.name)||"Restaurant",o=(await n.e(8021).then(n.t.bind(n,8021,19))).default,a=document.createElement("canvas");await o.toCanvas(a,t.qr_url,{width:200,margin:2}),await(0,u.TG)(i,a,r)}}catch(e){console.error("Failed to print QR:",e)}$e(!1)}},ct=async()=>{if(!Se){$e(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/restaurants/${de}/tables/${i}/qr`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),ke(null)}catch(e){console.error("Failed to expire QR:",e)}$e(!1)}},pt="pending"===Qe?"outstanding":ie(Qe),ut=Ke.some(e=>(e.order_group||0)>0),xt=(null===a||void 0===a?void 0:a.paymentProof)||(null===a||void 0===a?void 0:a.payment_proof)||null,ht=(gt=xt)?gt.hasOwnProperty("current")?gt.current:gt:null;var gt;const mt=(e=>e&&e.hasOwnProperty("history")&&e.history||[])(xt);return(0,g.jsxs)(m,{children:[(0,g.jsxs)(h.aF,{isOpen:!!it,onClose:()=>at(!1),title:"verify"===it?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"verify"===it?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(G,{variant:"secondary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId){Ce(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"rejected",status:"outstanding"})}),at(!1),he()}catch(e){}Ce(!1)}},disabled:je,children:"Reject"}),(0,g.jsx)(Q,{variant:"primary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId){Ce(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),"outstanding"===Qe&&await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending"})}),at(!1),he()}catch(e){}Ce(!1)}},disabled:je,children:"Confirm Payment"})]}):void 0,children:[(0,g.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:["#",null===a||void 0===a?void 0:a.orderNumber]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:[ae," ",null===a||void 0===a||null===(t=a.totalAmount)||void 0===t?void 0:t.toFixed(2)]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,g.jsx)("strong",{style:{color:"#0A2540"},children:null===a||void 0===a?void 0:a.paymentMethod})]})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),ht?(0,g.jsxs)(g.Fragment,{children:[ht.reference&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,g.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:ht.reference})]}),ht.file_name&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",ht.file_name]}),ht.uploaded_at&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(ht.uploaded_at).toLocaleString()]}),ht.image&&(0,g.jsx)("img",{src:ht.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(ht.image,"_blank")})]}):(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===Ze?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),mt.length>0&&(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",mt.length,")"]}),mt.map((e,t)=>(0,g.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:t<mt.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||t+1]}),e.rejected_at&&(0,g.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,g.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,g.jsx)("img",{src:e.image,alt:`Previous proof #${t+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},t))]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(b,{children:[(0,g.jsxs)("h3",{children:["Table ",i]}),(0,g.jsxs)(f,{children:[null!==a&&void 0!==a&&a.guestCount?(0,g.jsxs)("span",{children:[a.guestCount," guests"]}):d?(0,g.jsxs)("span",{children:[d.seats," seats"]}):null,Ge&&(0,g.jsxs)("span",{children:[a.elapsedMinutes,"min"]})]}),Ge&&(0,g.jsxs)(j,{children:[(0,g.jsx)(C,{$color:et.text,$bg:et.bg,children:re[Qe]||a.status}),(0,g.jsx)(C,{$color:tt.color,$bg:tt.bg,children:"completed"===Ze||"paid"===Ze?"Paid":"rejected"===Ze?"Rejected":"payment_verification_pending"===Ze?"Verifying":"Unpaid"})]}),!Ge&&(0,g.jsx)(j,{children:(0,g.jsx)(C,{$color:et.text,$bg:et.bg,children:"Available"})})]}),(0,g.jsx)(v,{onClick:le,children:"\xd7"})]}),ye.length>1&&(0,g.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[ye.map((e,t)=>{var n;return(0,g.jsxs)("button",{onClick:()=>null===fe||void 0===fe?void 0:fe(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:be===t?600:400,border:be===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:be===t?"#EDE9FE":"white",color:be===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(n=e.orderNumber)||void 0===n?void 0:n.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[ye.length," orders"]})]}),Ge?Ie?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{style:{padding:"16px 20px"},children:[(0,g.jsx)("div",{style:{marginBottom:"16px"},children:(0,g.jsx)("input",{type:"text",placeholder:"Search menu items...",value:Me,onChange:e=>We(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),Me.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Te.filter(e=>{if(!e||!e.name)return!1;const t=Me.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,g.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Ve(e,1,[]),We("")},children:[(0,g.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,g.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,ae)}),t&&(0,g.jsx)("button",{onClick:t=>{t.stopPropagation(),Je(e),Le(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Te.filter(e=>{var t;const n=Me.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n))||e.code&&e.code.toLowerCase().includes(n)}).length&&(0,g.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)(F,{style:{marginBottom:"10px"},children:["Items to Add (",Ne.reduce((e,t)=>e+t.quantity,0),")"]}),0===Ne.length?(0,g.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,g.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Ne.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,g.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,g.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,g.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),ae)," each"]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Oe(e=>{const n=e.find(e=>e.cartId===t);return n&&n.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Oe(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,g.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(Ne.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),ae)]})}),(0,g.jsx)(H,{$variant:"primary",onClick:async()=>{if(null!==a&&void 0!==a&&a.orderId&&0!==Ne.length)try{Re(!0);const e=localStorage.getItem("auth_token"),t=Ne.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),n=await fetch(`/api/orders/${a.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!n.ok){const e=await n.json();throw new Error(e.message||"Failed to add items")}_e(!1),Oe([]),We(""),he()}catch(e){console.error("Add items error:",e)}finally{Re(!1)}},disabled:0===Ne.length||Pe,children:Pe?"Adding...":"Add to Order"}),(0,g.jsx)(H,{$variant:"secondary",onClick:()=>{_e(!1),Oe([]),We("")},children:"Cancel"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Order ",a.orderNumber||"",a.customerName&&"Walk-in Customer"!==a.customerName?` \u2014 ${a.customerName}`:""]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Customer"}),(0,g.jsx)(E,{children:a.customerName||"Walk-in"})]}),a.customerPhone&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Phone"}),(0,g.jsx)(E,{children:a.customerPhone})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Type"}),(0,g.jsx)(E,{children:(a.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Source"}),(0,g.jsx)(E,{children:oe[a.orderSource||"pos"]||a.orderSource})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Time"}),(0,g.jsx)(E,{children:ot(a.orderCreatedAt)})]}),a.paymentMethod&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Payment"}),(0,g.jsx)(E,{children:(0,c.MA)(a.paymentMethod,a.cardType,we||void 0)})]}),ht&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Receipt"}),(0,g.jsx)(E,{children:(0,g.jsx)("span",{onClick:()=>at("view"),style:{color:"#635BFF",cursor:"pointer",fontWeight:500},children:"View \u2192"})})]}),a.cashierName&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Cashier"}),(0,g.jsx)(E,{children:a.cashierName})]})]})]}),(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Items (",Ke.length,")",Xe&&Ke.length>0&&` \u2014 ${Ke.filter(e=>"completed"===e.status).length}/${Ke.length} served`]}),rt.map(e=>{const t=nt[e],n=e>0,r=t[0];return(0,g.jsxs)("div",{children:[(rt.length>1||n)&&(0,g.jsxs)(B,{$isAdded:n,children:[(0,g.jsx)("span",{children:n?`+Added #${e}`:"Original Order"}),n&&(null===r||void 0===r?void 0:r.added_at)&&(0,g.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:ot(r.added_at)})]}),t.map(e=>{const t=e._originalIndex,n="completed"===e.status,r=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,g.jsxs)(z,{$completed:n&&Xe,children:[Xe&&(0,g.jsx)(I,{$checked:n,onClick:()=>(async e=>{if(!je&&null!==a&&void 0!==a&&a.orderId){Ce(!0);try{const t=Ke.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${a.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Qe)&&await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"served"})}),he())}catch(t){}Ce(!1)}})(t),disabled:je,title:n?"Mark as not served":"Mark as served",children:n?"\u2713":""}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(T,{$completed:n,children:[e.name," ",(0,g.jsxs)(O,{children:["x",e.quantity]})]}),r&&(0,g.jsx)(D,{children:r})]}),(0,g.jsx)(N,{children:(0,l.vv)(e.price*e.quantity,ae)}),"completed"!==Ze&&Ke.length>1&&(0,g.jsx)(P,{onClick:()=>{return n=t,r=e.name,void(null!==a&&void 0!==a&&a.orderId&&ze({title:"Delete Item",message:`Delete "${r}" from this order?`,onConfirm:async()=>{ze(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${a.orderId}/items/${n}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&he()}catch(e){}}}));var n,r},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Ke.length&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,g.jsxs)(w,{style:{borderBottom:"none"},children:[(0,g.jsx)(F,{children:"Summary"}),(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Subtotal"}),(0,g.jsx)("span",{children:(0,l.vv)(a.subtotal||0,ae)})]}),(a.discountPolicyAmount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Discount",a.discountPolicyName?` (${a.discountPolicyName})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(a.discountPolicyAmount||0,ae)]})]}),(a.couponDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Coupon",a.couponCode?` (${a.couponCode})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(a.couponDiscount||0,ae)]})]}),(a.pointDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Points",a.pointsUsed?` (${a.pointsUsed} pts)`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(a.pointDiscount||0,ae)]})]}),(a.discount||0)>0&&!a.couponDiscount&&!a.discountPolicyAmount&&!a.pointDiscount&&(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Discount"}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(a.discount||0,ae)]})]}),(a.serviceCharge||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Svc Charge",a.serviceChargeRate?` (${a.serviceChargeRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(a.serviceCharge||0,ae)})]}),(a.tax||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Tax",a.taxRate?` (${a.taxRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(a.tax||0,ae)})]}),(0,g.jsxs)(R,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:(0,l.vv)(a.totalAmount,ae)})]}),a.notes&&(0,g.jsx)(M,{children:a.notes})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(J,{onClick:async()=>{const e=a?{orderNumber:a.orderNumber||"",pickupNumber:(a.orderNumber||"").split("-")[1]||"",tableNumber:i||null,pagerNumber:null,date:a.orderCreatedAt?new Date(a.orderCreatedAt):new Date,items:Ke.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(a.subtotal||0)),discount:parseFloat(String(a.discount||0)),coupon:a.couponCode?{code:a.couponCode,discount:parseFloat(String(a.couponDiscount||0))}:null,serviceCharge:parseFloat(String(a.serviceCharge||0)),serviceChargeRate:parseFloat(String(a.serviceChargeRate||10)),tax:parseFloat(String(a.tax||0)),taxRate:parseFloat(String(a.taxRate||6)),total:parseFloat(String(a.totalAmount||0)),paymentMethod:a.paymentMethod||"cash",amountReceived:0,change:0,cashierName:a.cashierName||null}:null;e&&0!==Ke.length&&await(0,u.pG)(e,Ae())},title:"Print Bill",children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,g.jsxs)(J,{onClick:dt,title:"Print Order Ticket",children:[(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),ut&&(0,g.jsx)(J,{onClick:async()=>{if(0===Ke.length)return;const e=Ke.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void dt();const n=Ke.filter(e=>(e.order_group||0)===t),r=st(n,`+Order ${t}`);r&&await(0,u.Si)(r,Ae())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M12 4v16m8-8H4"})})}),pt&&(0,g.jsx)(J,{onClick:async()=>{if(null===a||void 0===a||!a.orderId||je)return;const e="pending"===Qe?"outstanding":ie(Qe);if(e){Ce(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),he()}catch(t){}Ce(!1)}},title:`Revert to ${re[pt]||pt}`,children:(0,g.jsx)(U,{children:"\u21ba"})}),"completed"!==Qe&&"cancelled"!==Qe&&"pending"!==Ze&&"payment_verification_pending"!==Ze&&a.orderId&&(0,g.jsx)(J,{onClick:()=>pe(a.orderId,"completed"),title:"Mark as Completed",children:(0,g.jsx)(U,{children:"\u2713"})})]}),Ye&&a.orderId&&"completed"!==Qe&&"cancelled"!==Qe&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>pe(a.orderId,Ye.status),disabled:je,style:"outstanding"===Qe?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Qe?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===Ye.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Ye.label}),"payment_verification_pending"===Ze&&(0,g.jsx)(H,{$variant:"success",onClick:()=>{at("verify")},disabled:je,children:"Confirm Payment"}),(0,g.jsxs)(L,{children:["pending"===Ze&&!["served","completed","cancelled"].includes(Qe)&&(0,g.jsx)(H,{$variant:"secondary",onClick:()=>_e(!0),children:"Add Items"}),"pending"===Ze&&(0,g.jsx)(H,{$variant:"served"===Qe?"success":"secondary",onClick:ue,children:"Payment"})]}),"cancelled"!==Qe&&"completed"!==Qe&&(0,g.jsx)(H,{$variant:"danger",onClick:()=>{null!==a&&void 0!==a&&a.orderId&&ze({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{ze(null),Ce(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${a.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),he()}catch(e){}Ce(!1)}})},disabled:je,children:"Cancel Order"}),"completed"===Qe&&a.orderId&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>ge(a.orderId),disabled:je,children:"Leaved"}),"session"===ve&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(L,{children:[(0,g.jsx)(H,{$variant:"secondary",onClick:lt,disabled:Se,children:Se?"Printing...":(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:4,verticalAlign:"middle"},children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Reprint QR"]})}),Fe&&(0,g.jsx)(H,{$variant:"danger",onClick:ct,disabled:Se,style:{flex:"0 0 auto",width:"auto",padding:"9px 16px"},children:"Expire QR"})]}),Fe?(0,g.jsx)(ne,{children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",null!==(o=Fe.remaining_minutes)&&void 0!==o?o:0,"min left)"]}),(0,g.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:["Printed: ",new Date(Fe.created_at).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})," \xb7 ","Orders until ",new Date(Fe.expires_at).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit"})]})]})}):(0,g.jsx)(g.Fragment,{})]}),(0,g.jsx)(H,{$variant:"link",onClick:xe,children:"Open in POS Terminal \u2197"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(V,{children:[(0,g.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,g.jsx)("p",{children:"This table is available"})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(H,{$variant:"primary",onClick:ce,children:"+ New Order"}),"session"===ve&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(H,{$variant:"secondary",onClick:lt,disabled:Se,children:Se?"Printing...":(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{marginRight:4,verticalAlign:"middle"},children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Print QR"]})}),Fe?(0,g.jsxs)(ne,{children:[(0,g.jsxs)("div",{children:[(0,g.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",Fe.remaining_minutes,"min left)"]}),(0,g.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:["Printed: ",Fe.created_at?new Date(Fe.created_at).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}):"just now",(0,g.jsx)("br",{}),"Orders accepted until ",new Date(Fe.expires_at).toLocaleString("en-US",{hour:"2-digit",minute:"2-digit"})]})]}),(0,g.jsx)(H,{$variant:"link",onClick:ct,style:{padding:"4px 8px",fontSize:"12px",width:"auto"},children:"Expire"})]}):(0,g.jsx)(ne,{style:{color:"#6B7280"},children:"\u25cb No active QR"})]}),(0,g.jsx)(H,{$variant:"link",onClick:xe,children:"Open in POS Terminal \u2197"})]})]}),qe&&(0,g.jsx)(x.A,{isOpen:He,onClose:()=>{Le(!1),Je(null)},menuItem:{id:qe.id,name:qe.name,price:parseFloat(qe.price)||0,emoji:qe.emoji||"",image:qe.image,optionGroups:qe.optionGroups},onConfirm:(e,t,n)=>{Ve(qe,e,n),Le(!1),Je(null),We("")}}),Be&&(0,g.jsx)(Z,{onClick:()=>ze(null),children:(0,g.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(K,{children:Be.title}),(0,g.jsx)(X,{children:Be.message}),(0,g.jsxs)(ee,{children:[(0,g.jsx)(te,{onClick:()=>ze(null),children:"Cancel"}),(0,g.jsx)(te,{$danger:!0,onClick:Be.onConfirm,children:"Confirm"})]})]})})]})},se=o.Ay.div`
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
`,de=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,le=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,ce=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,pe=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,ue=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,xe=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,he=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const o=t.length,i={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";i[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,g.jsxs)(se,{children:[(0,g.jsx)(de,{children:Object.keys(s.Ez).map(e=>(0,g.jsxs)(le,{children:[(0,g.jsx)(ce,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,g.jsx)(pe,{}),(0,g.jsxs)(ue,{children:[(0,g.jsxs)(xe,{children:["Tables: ",(0,g.jsx)("span",{children:o})]}),(0,g.jsxs)(xe,{children:["Avail: ",(0,g.jsx)("span",{children:i.available})]}),(0,g.jsxs)(xe,{children:["Occupied: ",(0,g.jsx)("span",{children:i.occupied})]}),i.ready>0&&(0,g.jsxs)(xe,{children:["Ready: ",(0,g.jsx)("span",{children:i.ready})]}),i["needs-attention"]>0&&(0,g.jsxs)(xe,{children:["Attn: ",(0,g.jsx)("span",{children:i["needs-attention"]})]}),(0,g.jsx)(pe,{}),(0,g.jsxs)(xe,{children:["Today: ",(0,g.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,g.jsxs)(xe,{children:["Avg: ",(0,g.jsxs)("span",{children:[p,"min"]})]})]})]})};var ge=n(2966),me=n(8406),ye=n(3577),be=n(3422);const fe=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ve=o.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,je=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Ce=o.Ay.h1`
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
`,we=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,Fe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ke=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
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
    border-color: #D1D9E0;
  }
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
  }
`,Ee=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,Be=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,ze=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,Ie=o.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,_e=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,Te=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,De=o.Ay.button`
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
`,Oe=()=>{var e;const{restaurantId:t}=(0,i.g)(),n=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[x,h]=(0,r.useState)(!1),[m,y]=(0,r.useState)(""),[b,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[C,A]=(0,r.useState)("Asia/Kuala_Lumpur"),[w,F]=(0,r.useState)("static"),k=(0,r.useRef)(null),S=(0,r.useRef)(null),$=(0,r.useRef)(null),[E,B]=(0,r.useState)(null),[z,I]=(0,r.useState)(0),[_,T]=(0,r.useState)(!1),[D,N]=(0,r.useState)(null),[O,P]=(0,r.useState)(null),[R,M]=(0,r.useState)(!1),[W,H]=(0,r.useState)(!1),[L,q]=(0,r.useState)(""),[J,U]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;y(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const V=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),G=(0,r.useCallback)(()=>{k.current&&clearTimeout(k.current),k.current=setTimeout(()=>V(),2e3)},[V]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.table_settings){const e="string"===typeof o.table_settings?JSON.parse(o.table_settings):o.table_settings;e.qrMode&&F(e.qrMode)}if(o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,me.ng)(e))}o.payment_settings&&N(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&r.data&&P(r.data)}catch(e){}})(),V()},[t,V]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,be.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{h(!0),e.emit("join-restaurant",t),V()}),e.on("disconnect",()=>h(!1)),e.on("order-updated",()=>G()),e.on("order-created",()=>G()),e.on("order-items-added",e=>{G(),U({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>G()),S.current=e,()=>{e.disconnect(),S.current=null}},[t,V,G]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,be.Ay)("/checkout-display",{transports:["websocket","polling"]});return e.on("connect",()=>e.emit("join-restaurant",t)),e.on("customer-checkin",e=>{}),$.current=e,()=>{e.disconnect(),$.current=null}},[t]),(0,r.useEffect)(()=>{const e=setInterval(()=>V(),3e4);return()=>clearInterval(e)},[V]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(H(!1),q(""),V())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[V]);const Q=E?p[E]:void 0,Z=(null===Q||void 0===Q?void 0:Q.orders)||(Q?[Q]:[]),Y=Math.min(z,Math.max(Z.length-1,0)),K=Z.length>0?Z[Y]:Q,X=E?l.tables.find(e=>e.tableNumber===E):void 0;return b?(0,g.jsxs)(fe,{children:[(0,g.jsx)(ve,{children:(0,g.jsx)(je,{children:(0,g.jsx)(Ce,{children:"Floor Plan"})})}),(0,g.jsx)(ze,{children:"Loading floor plan..."})]}):(0,g.jsxs)(fe,{children:[(null===J||void 0===J?void 0:J.isVisible)&&(0,g.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,g.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,g.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,g.jsx)("button",{onClick:()=>U(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,g.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,g.jsxs)("strong",{children:["Order ",J.orderNumber]}),J.tableNumber&&` (Table ${J.tableNumber})`,(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",J.orderGroup]})," ",J.itemCount," item",J.itemCount>1?"s":""," added"]}),(0,g.jsx)("button",{onClick:()=>{J.tableNumber&&B(J.tableNumber),U(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,g.jsxs)(ve,{children:[(0,g.jsxs)(je,{children:[(0,g.jsx)($e,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,g.jsx)(Ce,{children:"Floor Plan"}),(0,g.jsxs)(we,{children:[(0,g.jsx)(Ae,{$connected:x}),x?"Live":"Offline"]})]}),(0,g.jsxs)(Fe,{children:[(0,g.jsx)(ke,{children:m}),(0,g.jsxs)(Se,{onClick:()=>M(!0),children:[(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"14px",height:"14px",verticalAlign:"middle",marginRight:"4px"},children:(0,g.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,g.jsx)(Se,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)(Be,{children:(0,g.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{B(t=>t===e?null:e),I(0)},selectedTableId:E?null===(e=l.tables.find(e=>e.tableNumber===E))||void 0===e?void 0:e.id:null,currency:v})}),E&&(0,g.jsx)(ae,{tableNumber:E,statusInfo:K,tableInfo:X,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>B(null),onNewOrder:()=>{if(!E)return;const e=new URLSearchParams;e.set("table",E),e.set("from","floor-plan-overlay"),q(`/restaurant/${t}/pos-terminal?${e.toString()}`),H(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await V()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{if(T(!0),$.current&&E){const n=p[E];if(n){var e;const r=(null===(e=n.items)||void 0===e?void 0:e.map(e=>({name:e.name||e.menu_item_name||"Item",quantity:e.quantity||1,price:parseFloat(e.price)||0,options:e.options||[]})))||[];$.current.emit("cart-update",{restaurantId:t,items:r,subtotal:parseFloat(n.subtotal||n.totalAmount)||0,tax:parseFloat(n.tax)||0,taxRate:0,serviceCharge:parseFloat(n.serviceCharge)||0,serviceChargeRate:0,discount:parseFloat(n.discount)||0,total:parseFloat(n.totalAmount)||0,currency:"MYR"})}}},onNavigateToPOS:()=>{E&&n(`/restaurant/${t}/pos-terminal?table=${E}&from=floor-plan`)},onOrderUpdated:V,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),B(null),await V()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(E)try{const e=localStorage.getItem("auth_token"),t=Z.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),B(null),await V()}catch(e){console.error("Failed to clear table:",e)}},orders:Z,selectedOrderIndex:Y,onOrderIndexChange:I,qrMode:w})]}),(0,g.jsx)(he,{tables:l.tables,tableStatuses:p,currency:v}),_&&K&&(0,g.jsx)(ge.A,{isOpen:_,onClose:()=>T(!1),total:Number(K.totalAmount||0),subtotal:Number(K.subtotal||K.totalAmount||0),tax:Number(K.tax||0),serviceCharge:Number(K.serviceCharge||0),discountAmount:Number(K.discount||0),couponDiscount:Number(K.couponDiscount||0),onConfirmPayment:async(e,n,r,o,i,a)=>{if(!E)return;const s=p[E];if(null!==s&&void 0!==s&&s.orderId)try{const n=localStorage.getItem("auth_token"),r={payment_status:"completed",payment_method:e,card_type:"card"===e&&a||null};o&&o>0&&i&&i>0&&(r.points_used=o,r.point_discount=i,r.total_amount=(s.totalAmount||0)-i);(await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)})).ok&&("outstanding"===s.orderStatus?await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"pending"})}):"served"===s.orderStatus&&await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"completed"})}),T(!1),await V(),$.current&&$.current.emit("checkout-complete",{restaurantId:t,orderNumber:s.orderNumber||"",total:parseFloat(s.totalAmount)||0,currency:"MYR"}))}catch(d){console.error("Failed to process payment:",d)}},paymentMethods:D,customerId:K.customerId||void 0,restaurantId:Number(t),membershipSettings:O}),(0,g.jsxs)(Ie,{$isOpen:W,children:[(0,g.jsxs)(_e,{children:[(0,g.jsxs)(Te,{children:["POS Terminal \u2014 Table ",E]}),(0,g.jsx)(De,{onClick:()=>{H(!1),q(""),V()},children:"\xd7 Close"})]}),W&&L&&(0,g.jsx)(Ne,{src:L,title:"POS Terminal"})]}),(0,g.jsx)(ye.A,{isOpen:R,onClose:()=>M(!1)})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>C});var r=n(9950),o=n(4752),i=n(7447),a=n(4414);const s=o.Ay.div`
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