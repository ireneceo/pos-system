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
`,N=o.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,D=o.Ay.div`
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
`,q=o.Ay.div`
  display: flex;
  gap: 6px;
`,L=o.Ay.div`
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
`,U=(0,o.Ay)(h.yl)`
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
`,re={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},oe={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},ie=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),ae=e=>{var t;let{tableNumber:o,statusInfo:i,tableInfo:a,currency:d,timezone:ae,restaurantId:se,onClose:de,onNewOrder:le,onStatusChange:ce,onPayment:pe,onNavigateToPOS:ue,onOrderUpdated:xe,onClearTable:he,onClearAllCompleted:ge,orders:me=[],selectedOrderIndex:ye=0,onOrderIndexChange:be}=e;const[fe,ve]=(0,r.useState)(!1),{getStoreInfo:je,paymentSettings:Ce}=(0,p.Pj)(),[Ae,we]=(0,r.useState)(null),[Fe,ke]=(0,r.useState)(!1),Se=(0,r.useCallback)(async()=>{if(se&&o)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${se}/tables/${o}/qr`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&e.data?we(e.data):we(null)}else we(null)}catch{we(null)}},[se,o]);(0,r.useEffect)(()=>{Se()},[Se]);const[$e,Ee]=(0,r.useState)(null),[Be,ze]=(0,r.useState)(!1),[Ie,_e]=(0,r.useState)([]),[Te,Ne]=(0,r.useState)([]),[De,Oe]=(0,r.useState)(!1),[Pe,Re]=(0,r.useState)(""),[Me,We]=(0,r.useState)(!1),[He,qe]=(0,r.useState)(null),Le=(0,r.useCallback)(async()=>{if(se)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch(`/api/menu?restaurantId=${se}`,{headers:t});if(n.ok){var e;const t=await n.json(),r=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});_e(r.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[se]);(0,r.useEffect)(()=>{Be?Le():(Ne([]),Re(""))},[Be,Le]);const Je=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=n.map(e=>e.id||e.name).sort().join(",");Ne(o=>{if(0===n.length){const n=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}else{const n=o.find(t=>{var n;return t.menuItemId===e.id&&(null===(n=t.selectedOptions)||void 0===n?void 0:n.map(e=>e.id||e.name).sort().join(","))===r});if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}const i=n.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:n,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Ve=i&&"available"!==i.status,Ge=(null===i||void 0===i?void 0:i.orderStatus)||"",Ue=(null===i||void 0===i?void 0:i.paymentStatus)||"pending",Qe=((e,t)=>{switch(e){case"outstanding":return"payment_verification_pending"===t||"rejected"===t?null:{status:"pending",label:"Proceed Without Payment"};case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Served"};case"served":return"completed"===t?{status:"completed",label:"Complete Order"}:null;default:return null}})(Ge,Ue),Ze=(null===i||void 0===i?void 0:i.orderItems)||[],Ye=["preparing","ready","served"].includes(Ge),Ke=Ve&&s.v[Ge]?s.v[Ge]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},Xe=(()=>{switch(Ue){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":case"rejected":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),et={};Ze.forEach((e,t)=>{const n=e.order_group||0;et[n]||(et[n]=[]),et[n].push({...e,_originalIndex:t})});const tt=Object.keys(et).map(Number).sort((e,t)=>e-t),nt=e=>{if(!e)return"-";const t=new Date(e),n=ae?{timeZone:ae}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},[rt,ot]=(0,r.useState)(!1),it=(e,t)=>{if(!i)return null;const n=e||Ze;return{orderNumber:i.orderNumber||"",pickupNumber:(i.orderNumber||"").split("-")[1]||"",date:i.orderCreatedAt?new Date(i.orderCreatedAt):new Date,orderType:i.orderType||"dine_in",orderSource:i.orderSource||"pos",tableNumber:o||null,pagerNumber:null,customerName:i.customerName||"Walk-in Customer",groupLabel:t,items:n.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:i.notes||"",takeawayCharge:0}},at=async()=>{const e=it();e&&0!==Ze.length&&await(0,u.Si)(e,je())},st=async()=>{if(!Fe){ke(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${se}/tables/${o}/qr`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.success&&e.data){we(e.data);const t=je(),r=(null===t||void 0===t?void 0:t.name)||"Restaurant",i=(await n.e(8021).then(n.t.bind(n,8021,19))).default,a=document.createElement("canvas");await i.toCanvas(a,e.data.qr_url,{width:200,margin:2}),await(0,u.TG)(o,a,r)}}}catch(e){console.error("Failed to print QR:",e)}ke(!1)}},dt=async()=>{if(!Fe){ke(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/restaurants/${se}/tables/${o}/qr`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),we(null)}catch(e){console.error("Failed to expire QR:",e)}ke(!1)}},lt="pending"===Ge?"outstanding":ie(Ge),ct=Ze.some(e=>(e.order_group||0)>0),pt=(null===i||void 0===i?void 0:i.paymentProof)||(null===i||void 0===i?void 0:i.payment_proof)||null,ut=(xt=pt)?xt.hasOwnProperty("current")?xt.current:xt:null;var xt;const ht=(e=>e&&e.hasOwnProperty("history")&&e.history||[])(pt);return(0,g.jsxs)(m,{children:[(0,g.jsxs)(h.aF,{isOpen:!!rt,onClose:()=>ot(!1),title:"verify"===rt?"Payment Verification":"Customer Submitted Proof",size:"small",footer:"verify"===rt?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(U,{variant:"secondary",onClick:async()=>{if(null!==i&&void 0!==i&&i.orderId){ve(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${i.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"rejected",status:"outstanding"})}),ot(!1),xe()}catch(e){}ve(!1)}},disabled:fe,children:"Reject"}),(0,g.jsx)(Q,{variant:"primary",onClick:async()=>{if(null!==i&&void 0!==i&&i.orderId){ve(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${i.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),"outstanding"===Ge&&await fetch(`/api/orders/${i.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending"})}),ot(!1),xe()}catch(e){}ve(!1)}},disabled:fe,children:"Confirm Payment"})]}):void 0,children:[(0,g.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Order: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:["#",null===i||void 0===i?void 0:i.orderNumber]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93",marginBottom:"6px"},children:["Amount: ",(0,g.jsxs)("strong",{style:{color:"#0A2540"},children:[d," ",null===i||void 0===i||null===(t=i.totalAmount)||void 0===t?void 0:t.toFixed(2)]})]}),(0,g.jsxs)("div",{style:{fontSize:"14px",color:"#6B7C93"},children:["Method: ",(0,g.jsx)("strong",{style:{color:"#0A2540"},children:null===i||void 0===i?void 0:i.paymentMethod})]})]}),(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,g.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Customer Submitted Proof"}),ut?(0,g.jsxs)(g.Fragment,{children:[ut.reference&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px"},children:[(0,g.jsx)("span",{style:{color:"#6B7C93"},children:"Reference: "}),(0,g.jsx)("span",{style:{fontFamily:"monospace",fontWeight:600,color:"#0A2540"},children:ut.reference})]}),ut.file_name&&(0,g.jsxs)("div",{style:{fontSize:"13px",marginBottom:"6px",color:"#6B7C93"},children:["File: ",ut.file_name]}),ut.uploaded_at&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",marginBottom:"6px"},children:["Submitted: ",new Date(ut.uploaded_at).toLocaleString()]}),ut.image&&(0,g.jsx)("img",{src:ut.image,alt:"Payment proof",style:{width:"100%",borderRadius:"6px",marginTop:"8px",cursor:"pointer"},onClick:()=>window.open(ut.image,"_blank")})]}):(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"rejected"===Ue?"Waiting for customer to resubmit.":"No payment proof submitted."})]}),ht.length>0&&(0,g.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px",marginTop:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7C93",marginBottom:"10px"},children:["Previous Attempts (",ht.length,")"]}),ht.map((e,t)=>(0,g.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"6px",marginBottom:t<ht.length-1?"8px":0,border:"1px solid #E5E7EB"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},children:[(0,g.jsxs)("span",{style:{fontSize:"12px",color:"#DC2626",fontWeight:600},children:["Rejected #",e.reject_count||t+1]}),e.rejected_at&&(0,g.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:new Date(e.rejected_at).toLocaleString()})]}),e.reference&&(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:["Ref: ",(0,g.jsx)("span",{style:{fontFamily:"monospace"},children:e.reference})]}),e.image&&(0,g.jsx)("img",{src:e.image,alt:`Previous proof #${t+1}`,style:{width:"100%",maxHeight:"150px",objectFit:"contain",borderRadius:"4px",marginTop:"6px",cursor:"pointer"},onClick:()=>window.open(e.image,"_blank")})]},t))]})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(b,{children:[(0,g.jsxs)("h3",{children:["Table ",o]}),(0,g.jsxs)(f,{children:[null!==i&&void 0!==i&&i.guestCount?(0,g.jsxs)("span",{children:[i.guestCount," guests"]}):a?(0,g.jsxs)("span",{children:[a.seats," seats"]}):null,Ve&&(0,g.jsxs)("span",{children:[i.elapsedMinutes,"min"]})]}),Ve&&(0,g.jsxs)(j,{children:[(0,g.jsx)(C,{$color:Ke.text,$bg:Ke.bg,children:re[Ge]||i.status}),(0,g.jsx)(C,{$color:Xe.color,$bg:Xe.bg,children:"completed"===Ue||"paid"===Ue?"Paid":"rejected"===Ue?"Rejected":"payment_verification_pending"===Ue?"Verifying":"Unpaid"})]}),!Ve&&(0,g.jsx)(j,{children:(0,g.jsx)(C,{$color:Ke.text,$bg:Ke.bg,children:"Available"})})]}),(0,g.jsx)(v,{onClick:de,children:"\xd7"})]}),me.length>1&&(0,g.jsxs)("div",{style:{padding:"8px 20px",borderBottom:"1px solid #E6EBF1",display:"flex",gap:"6px",flexWrap:"wrap",background:"#F9FAFB"},children:[me.map((e,t)=>{var n;return(0,g.jsxs)("button",{onClick:()=>null===be||void 0===be?void 0:be(t),style:{padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:ye===t?600:400,border:ye===t?"1.5px solid #635BFF":"1px solid #D1D5DB",background:ye===t?"#EDE9FE":"white",color:ye===t?"#635BFF":"#6B7280",cursor:"pointer",transition:"all 0.15s"},children:["#",(null===(n=e.orderNumber)||void 0===n?void 0:n.split("-")[1])||t+1,"paid"===e.paymentStatus||"completed"===e.paymentStatus?" \u2713":""]},e.orderId||t)}),(0,g.jsxs)("span",{style:{fontSize:"11px",color:"#9CA3AF",alignSelf:"center",marginLeft:"4px"},children:[me.length," orders"]})]}),Ve?Be?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{style:{padding:"16px 20px"},children:[(0,g.jsx)("div",{style:{marginBottom:"16px"},children:(0,g.jsx)("input",{type:"text",placeholder:"Search menu items...",value:Pe,onChange:e=>Re(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),Pe.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[Ie.filter(e=>{if(!e||!e.name)return!1;const t=Pe.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,g.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Je(e,1,[]),Re("")},children:[(0,g.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,g.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,d)}),t&&(0,g.jsx)("button",{onClick:t=>{t.stopPropagation(),qe(e),We(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===Ie.filter(e=>{var t;const n=Pe.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n))||e.code&&e.code.toLowerCase().includes(n)}).length&&(0,g.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,g.jsxs)("div",{children:[(0,g.jsxs)(F,{style:{marginBottom:"10px"},children:["Items to Add (",Te.reduce((e,t)=>e+t.quantity,0),")"]}),0===Te.length?(0,g.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,g.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:Te.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,g.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,g.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,g.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,g.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),d)," each"]})]}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Ne(e=>{const n=e.find(e=>e.cartId===t);return n&&n.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,g.jsx)("button",{onClick:()=>{return t=e.cartId,void Ne(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,g.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(Te.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),d)]})}),(0,g.jsx)(H,{$variant:"primary",onClick:async()=>{if(null!==i&&void 0!==i&&i.orderId&&0!==Te.length)try{Oe(!0);const e=localStorage.getItem("auth_token"),t=Te.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),n=await fetch(`/api/orders/${i.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!n.ok){const e=await n.json();throw new Error(e.message||"Failed to add items")}ze(!1),Ne([]),Re(""),xe()}catch(e){console.error("Add items error:",e)}finally{Oe(!1)}},disabled:0===Te.length||De,children:De?"Adding...":"Add to Order"}),(0,g.jsx)(H,{$variant:"secondary",onClick:()=>{ze(!1),Ne([]),Re("")},children:"Cancel"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(A,{children:[(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Order ",i.orderNumber||"",i.customerName&&"Walk-in Customer"!==i.customerName?` \u2014 ${i.customerName}`:""]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Customer"}),(0,g.jsx)(E,{children:i.customerName||"Walk-in"})]}),i.customerPhone&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Phone"}),(0,g.jsx)(E,{children:i.customerPhone})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Type"}),(0,g.jsx)(E,{children:(i.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Source"}),(0,g.jsx)(E,{children:oe[i.orderSource||"pos"]||i.orderSource})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Time"}),(0,g.jsx)(E,{children:nt(i.orderCreatedAt)})]}),i.paymentMethod&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Payment"}),(0,g.jsx)(E,{children:(0,c.MA)(i.paymentMethod,i.cardType,Ce||void 0)})]}),ut&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Receipt"}),(0,g.jsx)(E,{children:(0,g.jsx)("span",{onClick:()=>ot("view"),style:{color:"#635BFF",cursor:"pointer",fontWeight:500},children:"View \u2192"})})]}),i.cashierName&&(0,g.jsxs)(S,{children:[(0,g.jsx)($,{children:"Cashier"}),(0,g.jsx)(E,{children:i.cashierName})]})]})]}),(0,g.jsxs)(w,{children:[(0,g.jsxs)(F,{children:["Items (",Ze.length,")",Ye&&Ze.length>0&&` \u2014 ${Ze.filter(e=>"completed"===e.status).length}/${Ze.length} served`]}),tt.map(e=>{const t=et[e],n=e>0,r=t[0];return(0,g.jsxs)("div",{children:[(tt.length>1||n)&&(0,g.jsxs)(B,{$isAdded:n,children:[(0,g.jsx)("span",{children:n?`+Added #${e}`:"Original Order"}),n&&(null===r||void 0===r?void 0:r.added_at)&&(0,g.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:nt(r.added_at)})]}),t.map(e=>{const t=e._originalIndex,n="completed"===e.status,r=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,g.jsxs)(z,{$completed:n&&Ye,children:[Ye&&(0,g.jsx)(I,{$checked:n,onClick:()=>(async e=>{if(!fe&&null!==i&&void 0!==i&&i.orderId){ve(!0);try{const t=Ze.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${i.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Ge)&&await fetch(`/api/orders/${i.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"served"})}),xe())}catch(t){}ve(!1)}})(t),disabled:fe,title:n?"Mark as not served":"Mark as served",children:n?"\u2713":""}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(T,{$completed:n,children:[e.name," ",(0,g.jsxs)(O,{children:["x",e.quantity]})]}),r&&(0,g.jsx)(N,{children:r})]}),(0,g.jsx)(D,{children:(0,l.vv)(e.price*e.quantity,d)}),"completed"!==Ue&&Ze.length>1&&(0,g.jsx)(P,{onClick:()=>{return n=t,r=e.name,void(null!==i&&void 0!==i&&i.orderId&&Ee({title:"Delete Item",message:`Delete "${r}" from this order?`,onConfirm:async()=>{Ee(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${i.orderId}/items/${n}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&xe()}catch(e){}}}));var n,r},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Ze.length&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,g.jsxs)(w,{style:{borderBottom:"none"},children:[(0,g.jsx)(F,{children:"Summary"}),(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Subtotal"}),(0,g.jsx)("span",{children:(0,l.vv)(i.subtotal||0,d)})]}),(i.discountPolicyAmount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Discount",i.discountPolicyName?` (${i.discountPolicyName})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(i.discountPolicyAmount||0,d)]})]}),(i.couponDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Coupon",i.couponCode?` (${i.couponCode})`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(i.couponDiscount||0,d)]})]}),(i.pointDiscount||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Points",i.pointsUsed?` (${i.pointsUsed} pts)`:""]}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(i.pointDiscount||0,d)]})]}),(i.discount||0)>0&&!i.couponDiscount&&!i.discountPolicyAmount&&!i.pointDiscount&&(0,g.jsxs)(R,{children:[(0,g.jsx)("span",{children:"Discount"}),(0,g.jsxs)("span",{children:["-",(0,l.vv)(i.discount||0,d)]})]}),(i.serviceCharge||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Svc Charge",i.serviceChargeRate?` (${i.serviceChargeRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(i.serviceCharge||0,d)})]}),(i.tax||0)>0&&(0,g.jsxs)(R,{children:[(0,g.jsxs)("span",{children:["Tax",i.taxRate?` (${i.taxRate}%)`:""]}),(0,g.jsx)("span",{children:(0,l.vv)(i.tax||0,d)})]}),(0,g.jsxs)(R,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,g.jsx)("span",{children:"Total"}),(0,g.jsx)("span",{children:(0,l.vv)(i.totalAmount,d)})]}),i.notes&&(0,g.jsx)(M,{children:i.notes})]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(L,{children:[(0,g.jsxs)(J,{onClick:async()=>{const e=i?{orderNumber:i.orderNumber||"",pickupNumber:(i.orderNumber||"").split("-")[1]||"",tableNumber:o||null,pagerNumber:null,date:i.orderCreatedAt?new Date(i.orderCreatedAt):new Date,items:Ze.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(i.subtotal||0)),discount:parseFloat(String(i.discount||0)),coupon:i.couponCode?{code:i.couponCode,discount:parseFloat(String(i.couponDiscount||0))}:null,serviceCharge:parseFloat(String(i.serviceCharge||0)),serviceChargeRate:parseFloat(String(i.serviceChargeRate||10)),tax:parseFloat(String(i.tax||0)),taxRate:parseFloat(String(i.taxRate||6)),total:parseFloat(String(i.totalAmount||0)),paymentMethod:i.paymentMethod||"cash",amountReceived:0,change:0,cashierName:i.cashierName||null}:null;e&&0!==Ze.length&&await(0,u.pG)(e,je())},title:"Print Bill",children:[(0,g.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,g.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,g.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,g.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,g.jsxs)(J,{onClick:at,title:"Print Order Ticket",children:[(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),ct&&(0,g.jsx)(J,{onClick:async()=>{if(0===Ze.length)return;const e=Ze.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void at();const n=Ze.filter(e=>(e.order_group||0)===t),r=it(n,`+Order ${t}`);r&&await(0,u.Si)(r,je())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,g.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,g.jsx)("path",{d:"M12 4v16m8-8H4"})})}),lt&&(0,g.jsx)(J,{onClick:async()=>{if(null===i||void 0===i||!i.orderId||fe)return;const e="pending"===Ge?"outstanding":ie(Ge);if(e){ve(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${i.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),xe()}catch(t){}ve(!1)}},title:`Revert to ${re[lt]||lt}`,children:(0,g.jsx)(V,{children:"\u21ba"})}),"completed"!==Ge&&"cancelled"!==Ge&&"pending"!==Ue&&"payment_verification_pending"!==Ue&&i.orderId&&(0,g.jsx)(J,{onClick:()=>ce(i.orderId,"completed"),title:"Mark as Completed",children:(0,g.jsx)(V,{children:"\u2713"})})]}),Qe&&i.orderId&&"completed"!==Ge&&"cancelled"!==Ge&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>ce(i.orderId,Qe.status),disabled:fe,style:"outstanding"===Ge?{background:"#F59E0B",borderColor:"#F59E0B",color:"white"}:"ready"===Ge?{background:"#10B981",borderColor:"#10B981",color:"white"}:"completed"===Qe.status?{background:"#9CA3AF",borderColor:"#9CA3AF",color:"white"}:void 0,children:Qe.label}),"payment_verification_pending"===Ue&&(0,g.jsx)(H,{$variant:"success",onClick:()=>{ot("verify")},disabled:fe,children:"Confirm Payment"}),(0,g.jsxs)(q,{children:["pending"===Ue&&!["served","completed","cancelled"].includes(Ge)&&(0,g.jsx)(H,{$variant:"secondary",onClick:()=>ze(!0),children:"Add Items"}),"pending"===Ue&&(0,g.jsx)(H,{$variant:"served"===Ge?"success":"secondary",onClick:pe,children:"Payment"})]}),"cancelled"!==Ge&&"completed"!==Ge&&(0,g.jsx)(H,{$variant:"danger",onClick:()=>{null!==i&&void 0!==i&&i.orderId&&Ee({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{Ee(null),ve(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${i.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),xe()}catch(e){}ve(!1)}})},disabled:fe,children:"Cancel Order"}),"completed"===Ge&&i.orderId&&(0,g.jsx)(H,{$variant:"primary",onClick:()=>he(i.orderId),disabled:fe,children:"Leaved"}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{$variant:"secondary",onClick:st,disabled:Fe,children:Fe?"Printing...":"\ud83d\udda8\ufe0f Reprint QR"}),Ae&&(0,g.jsx)(H,{$variant:"danger",onClick:dt,disabled:Fe,style:{flex:"0 0 auto",width:"auto",padding:"9px 16px"},children:"Expire QR"})]}),Ae?(0,g.jsx)(ne,{children:(0,g.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",Ae.remaining_minutes,"min left)"]})}):(0,g.jsx)(ne,{style:{color:"#6B7280"},children:"\u25cb No active QR"}),(0,g.jsx)(H,{$variant:"link",onClick:ue,children:"Open in POS Terminal \u2197"})]})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(G,{children:[(0,g.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,g.jsx)("p",{children:"This table is available"})]}),(0,g.jsxs)(W,{children:[(0,g.jsx)(H,{$variant:"primary",onClick:le,children:"+ New Order"}),(0,g.jsx)(H,{$variant:"secondary",onClick:st,disabled:Fe,children:Fe?"Printing...":"\ud83d\udda8\ufe0f Print QR"}),Ae?(0,g.jsxs)(ne,{children:[(0,g.jsxs)("span",{style:{color:"#059669"},children:["\u25cf Active QR (",Ae.remaining_minutes,"min left)"]}),(0,g.jsx)(H,{$variant:"link",onClick:dt,style:{padding:"4px 8px",fontSize:"12px",width:"auto"},children:"Expire"})]}):(0,g.jsx)(ne,{style:{color:"#6B7280"},children:"\u25cb No active QR"}),(0,g.jsx)(H,{$variant:"link",onClick:ue,children:"Open in POS Terminal \u2197"})]})]}),He&&(0,g.jsx)(x.A,{isOpen:Me,onClose:()=>{We(!1),qe(null)},menuItem:{id:He.id,name:He.name,price:parseFloat(He.price)||0,emoji:He.emoji||"",image:He.image,optionGroups:He.optionGroups},onConfirm:(e,t,n)=>{Je(He,e,n),We(!1),qe(null),Re("")}}),$e&&(0,g.jsx)(Z,{onClick:()=>Ee(null),children:(0,g.jsxs)(Y,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(K,{children:$e.title}),(0,g.jsx)(X,{children:$e.message}),(0,g.jsxs)(ee,{children:[(0,g.jsx)(te,{onClick:()=>Ee(null),children:"Cancel"}),(0,g.jsx)(te,{$danger:!0,onClick:$e.onConfirm,children:"Confirm"})]})]})})]})},se=o.Ay.div`
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
`,Ne=o.Ay.button`
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
`,Oe=()=>{var e;const{restaurantId:t}=(0,i.g)(),n=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[x,h]=(0,r.useState)(!1),[m,y]=(0,r.useState)(""),[b,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[C,A]=(0,r.useState)("Asia/Kuala_Lumpur"),w=(0,r.useRef)(null),F=(0,r.useRef)(null),k=(0,r.useRef)(null),[S,$]=(0,r.useState)(null),[E,B]=(0,r.useState)(0),[z,I]=(0,r.useState)(!1),[_,T]=(0,r.useState)(null),[N,D]=(0,r.useState)(null),[O,P]=(0,r.useState)(!1),[R,M]=(0,r.useState)(!1),[W,H]=(0,r.useState)(""),[q,L]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;y(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const J=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),V=(0,r.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>J(),2e3)},[J]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,me.ng)(e))}o.payment_settings&&T(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&r.data&&D(r.data)}catch(e){}})(),J()},[t,J]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,be.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{h(!0),e.emit("join-restaurant",t),J()}),e.on("disconnect",()=>h(!1)),e.on("order-updated",()=>V()),e.on("order-created",()=>V()),e.on("order-items-added",e=>{V(),L({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>V()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,J,V]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,be.Ay)("/checkout-display",{transports:["websocket","polling"]});return e.on("connect",()=>e.emit("join-restaurant",t)),e.on("customer-checkin",e=>{}),k.current=e,()=>{e.disconnect(),k.current=null}},[t]),(0,r.useEffect)(()=>{const e=setInterval(()=>J(),3e4);return()=>clearInterval(e)},[J]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(M(!1),H(""),J())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[J]);const G=S?p[S]:void 0,U=(null===G||void 0===G?void 0:G.orders)||(G?[G]:[]),Q=Math.min(E,Math.max(U.length-1,0)),Z=U.length>0?U[Q]:G,Y=S?l.tables.find(e=>e.tableNumber===S):void 0;return b?(0,g.jsxs)(fe,{children:[(0,g.jsx)(ve,{children:(0,g.jsx)(je,{children:(0,g.jsx)(Ce,{children:"Floor Plan"})})}),(0,g.jsx)(ze,{children:"Loading floor plan..."})]}):(0,g.jsxs)(fe,{children:[(null===q||void 0===q?void 0:q.isVisible)&&(0,g.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,g.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,g.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,g.jsx)("button",{onClick:()=>L(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,g.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,g.jsxs)("strong",{children:["Order ",q.orderNumber]}),q.tableNumber&&` (Table ${q.tableNumber})`,(0,g.jsx)("br",{}),(0,g.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",q.orderGroup]})," ",q.itemCount," item",q.itemCount>1?"s":""," added"]}),(0,g.jsx)("button",{onClick:()=>{q.tableNumber&&$(q.tableNumber),L(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,g.jsxs)(ve,{children:[(0,g.jsxs)(je,{children:[(0,g.jsx)($e,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,g.jsx)(Ce,{children:"Floor Plan"}),(0,g.jsxs)(we,{children:[(0,g.jsx)(Ae,{$connected:x}),x?"Live":"Offline"]})]}),(0,g.jsxs)(Fe,{children:[(0,g.jsx)(ke,{children:m}),(0,g.jsxs)(Se,{onClick:()=>P(!0),children:[(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"14px",height:"14px",verticalAlign:"middle",marginRight:"4px"},children:(0,g.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,g.jsx)(Se,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,g.jsxs)(Ee,{children:[(0,g.jsx)(Be,{children:(0,g.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{$(t=>t===e?null:e),B(0)},selectedTableId:S?null===(e=l.tables.find(e=>e.tableNumber===S))||void 0===e?void 0:e.id:null,currency:v})}),S&&(0,g.jsx)(ae,{tableNumber:S,statusInfo:Z,tableInfo:Y,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>$(null),onNewOrder:()=>{if(!S)return;const e=new URLSearchParams;e.set("table",S),e.set("from","floor-plan-overlay"),H(`/restaurant/${t}/pos-terminal?${e.toString()}`),M(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await J()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{if(I(!0),k.current&&S){const n=p[S];if(n){var e;const r=(null===(e=n.items)||void 0===e?void 0:e.map(e=>({name:e.name||e.menu_item_name||"Item",quantity:e.quantity||1,price:parseFloat(e.price)||0,options:e.options||[]})))||[];k.current.emit("cart-update",{restaurantId:t,items:r,subtotal:parseFloat(n.subtotal||n.totalAmount)||0,tax:parseFloat(n.tax)||0,taxRate:0,serviceCharge:parseFloat(n.serviceCharge)||0,serviceChargeRate:0,discount:parseFloat(n.discount)||0,total:parseFloat(n.totalAmount)||0,currency:"MYR"})}}},onNavigateToPOS:()=>{S&&n(`/restaurant/${t}/pos-terminal?table=${S}&from=floor-plan`)},onOrderUpdated:J,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),$(null),await J()}catch(t){console.error("Failed to clear table:",t)}},onClearAllCompleted:async()=>{if(S)try{const e=localStorage.getItem("auth_token"),t=U.filter(e=>"completed"===e.orderStatus);await Promise.all(t.map(t=>fetch(`/api/orders/${t.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({table_number:null})}))),$(null),await J()}catch(e){console.error("Failed to clear table:",e)}},orders:U,selectedOrderIndex:Q,onOrderIndexChange:B})]}),(0,g.jsx)(he,{tables:l.tables,tableStatuses:p,currency:v}),z&&Z&&(0,g.jsx)(ge.A,{isOpen:z,onClose:()=>I(!1),total:Number(Z.totalAmount||0),subtotal:Number(Z.subtotal||Z.totalAmount||0),tax:Number(Z.tax||0),serviceCharge:Number(Z.serviceCharge||0),discountAmount:Number(Z.discount||0),couponDiscount:Number(Z.couponDiscount||0),onConfirmPayment:async(e,n,r,o,i,a)=>{if(!S)return;const s=p[S];if(null!==s&&void 0!==s&&s.orderId)try{const n=localStorage.getItem("auth_token"),r={payment_status:"completed",payment_method:e,card_type:"card"===e&&a||null};o&&o>0&&i&&i>0&&(r.points_used=o,r.point_discount=i,r.total_amount=(s.totalAmount||0)-i);(await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)})).ok&&("outstanding"===s.orderStatus?await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"pending"})}):"served"===s.orderStatus&&await fetch(`/api/orders/${s.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:"completed"})}),I(!1),await J(),k.current&&k.current.emit("checkout-complete",{restaurantId:t,orderNumber:s.orderNumber||"",total:parseFloat(s.totalAmount)||0,currency:"MYR"}))}catch(d){console.error("Failed to process payment:",d)}},paymentMethods:_,customerId:Z.customerId||void 0,restaurantId:Number(t),membershipSettings:N}),(0,g.jsxs)(Ie,{$isOpen:R,children:[(0,g.jsxs)(_e,{children:[(0,g.jsxs)(Te,{children:["POS Terminal \u2014 Table ",S]}),(0,g.jsx)(Ne,{onClick:()=>{M(!1),H(""),J()},children:"\xd7 Close"})]}),R&&W&&(0,g.jsx)(De,{src:W,title:"POS Terminal"})]}),(0,g.jsx)(ye.A,{isOpen:O,onClose:()=>P(!1)})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>C});var r=n(9950),o=n(4752),i=n(7447),a=n(4414);const s=o.Ay.div`
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