"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Fe});var r=n(9950),i=n(4752),o=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(9018),p=n(5863),u=n(9189),h=n(4414);const x=i.Ay.div`
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
`,g=i.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,m=i.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,y=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,b=i.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,f=i.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,v=i.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,j=i.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,A=i.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,w=i.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,C=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,F=i.Ay.div`
  font-size: 12px;
`,$=i.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,k=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,S=i.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,B=i.Ay.button`
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
`,I=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,_=i.Ay.div`
  font-size: 10px;
  color: #6B7C93;
  margin-top: 1px;
`,D=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`,N=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,T=i.Ay.button`
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
`,O=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,P=i.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  color: #92400E;
  margin-top: 6px;
`,R=i.Ay.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
  border-top: 1px solid #E6EBF1;
`,M=i.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,W=i.Ay.div`
  display: flex;
  gap: 6px;
`,H=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: center;
  padding-bottom: 4px;
`,q=i.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,L=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,U=i.Ay.div`
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
`,J={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},G={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},Z=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),K=e=>{let{tableNumber:t,statusInfo:n,tableInfo:i,currency:o,timezone:a,restaurantId:d,onClose:K,onNewOrder:V,onStatusChange:Y,onPayment:Q,onNavigateToPOS:X,onOrderUpdated:ee}=e;const[te,ne]=(0,r.useState)(!1),{getStoreInfo:re}=(0,c.Pj)(),[ie,oe]=(0,r.useState)(!1),[ae,se]=(0,r.useState)([]),[de,le]=(0,r.useState)([]),[ce,pe]=(0,r.useState)(!1),[ue,he]=(0,r.useState)(""),[xe,ge]=(0,r.useState)(!1),[me,ye]=(0,r.useState)(null),be=(0,r.useCallback)(async()=>{if(d)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch(`/api/menu?restaurantId=${d}`,{headers:t});if(n.ok){var e;const t=await n.json(),r=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});se(r.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[d]);(0,r.useEffect)(()=>{ie?be():(le([]),he(""))},[ie,be]);const fe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=n.map(e=>e.id||e.name).sort().join(",");le(i=>{if(0===n.length){const n=i.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(n)return i.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}else{const n=i.find(t=>{var n;return t.menuItemId===e.id&&(null===(n=t.selectedOptions)||void 0===n?void 0:n.map(e=>e.id||e.name).sort().join(","))===r});if(n)return i.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}const o=n.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+o;return[...i,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:n,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},ve=n&&"available"!==n.status,je=(null===n||void 0===n?void 0:n.orderStatus)||"",Ae=(null===n||void 0===n?void 0:n.paymentStatus)||"pending",we=(e=>{switch(e){case"pending":return{status:"preparing",label:"Start Preparing"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return{status:"served",label:"Mark Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(je),Ce=(null===n||void 0===n?void 0:n.orderItems)||[],Fe="completed"!==Ae&&!["completed","cancelled"].includes(je),$e=["preparing","ready","served"].includes(je),ke=ve&&s.v[je]?s.v[je]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},Se=(()=>{switch(Ae){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),Ee={};Ce.forEach((e,t)=>{const n=e.order_group||0;Ee[n]||(Ee[n]=[]),Ee[n].push({...e,_originalIndex:t})});const Be=Object.keys(Ee).map(Number).sort((e,t)=>e-t),Ie=e=>{if(!e)return"-";const t=new Date(e),n=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},ze=(e,r)=>{if(!n)return null;const i=e||Ce;return{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,orderType:n.orderType||"dine_in",orderSource:n.orderSource||"pos",tableNumber:t||null,pagerNumber:null,customerName:n.customerName||"Walk-in Customer",groupLabel:r,items:i.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:n.notes||"",takeawayCharge:0}},_e=async()=>{const e=ze();e&&0!==Ce.length&&await(0,p.Si)(e,re())},De=Z(je),Ne=Ce.some(e=>(e.order_group||0)>0);return(0,h.jsxs)(x,{children:[(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)("h3",{children:["Table ",t]}),(0,h.jsxs)(y,{children:[null!==n&&void 0!==n&&n.guestCount?(0,h.jsxs)("span",{children:[n.guestCount," guests"]}):i?(0,h.jsxs)("span",{children:[i.seats," seats"]}):null,ve&&(0,h.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),ve&&(0,h.jsxs)(f,{children:[(0,h.jsx)(v,{$color:ke.text,$bg:ke.bg,children:J[je]||n.status}),(0,h.jsx)(v,{$color:Se.color,$bg:Se.bg,children:"completed"===Ae||"paid"===Ae?"Paid":"Unpaid"})]}),!ve&&(0,h.jsx)(f,{children:(0,h.jsx)(v,{$color:ke.text,$bg:ke.bg,children:"Available"})})]}),(0,h.jsx)(b,{onClick:K,children:"\xd7"})]}),ve?ie?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{style:{padding:"16px 20px"},children:[(0,h.jsx)("div",{style:{marginBottom:"16px"},children:(0,h.jsx)("input",{type:"text",placeholder:"Search menu items...",value:ue,onChange:e=>he(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),ue.length>0&&(0,h.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[ae.filter(e=>{if(!e||!e.name)return!1;const t=ue.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,h.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,h.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{fe(e,1,[]),he("")},children:[(0,h.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,h.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,h.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,o)}),t&&(0,h.jsx)("button",{onClick:t=>{t.stopPropagation(),ye(e),ge(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===ae.filter(e=>{var t;const n=ue.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n))||e.code&&e.code.toLowerCase().includes(n)}).length&&(0,h.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,h.jsxs)("div",{children:[(0,h.jsxs)(w,{style:{marginBottom:"10px"},children:["Items to Add (",de.reduce((e,t)=>e+t.quantity,0),")"]}),0===de.length?(0,h.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,h.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:de.map(e=>(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,h.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,h.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,h.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,h.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),o)," each"]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,h.jsx)("button",{onClick:()=>{return t=e.cartId,void le(e=>{const n=e.find(e=>e.cartId===t);return n&&n.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,h.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,h.jsx)("button",{onClick:()=>{return t=e.cartId,void le(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,h.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(de.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),o)]})}),(0,h.jsx)(M,{$variant:"primary",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&0!==de.length)try{pe(!0);const e=localStorage.getItem("auth_token"),t=de.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),r=await fetch(`/api/orders/${n.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!r.ok){const e=await r.json();throw new Error(e.message||"Failed to add items")}oe(!1),le([]),he(""),ee()}catch(e){console.error("Add items error:",e)}finally{pe(!1)}},disabled:0===de.length||ce,children:ce?"Adding...":"Add to Order"}),(0,h.jsx)(M,{$variant:"secondary",onClick:()=>{oe(!1),le([]),he("")},children:"Cancel"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Customer"}),(0,h.jsx)(k,{children:n.customerName||"Walk-in"})]}),n.customerPhone&&(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Phone"}),(0,h.jsx)(k,{children:n.customerPhone})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Type"}),(0,h.jsx)(k,{children:(n.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Source"}),(0,h.jsx)(k,{children:G[n.orderSource||"pos"]||n.orderSource})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Time"}),(0,h.jsx)(k,{children:Ie(n.orderCreatedAt)})]}),n.paymentMethod&&(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Payment"}),(0,h.jsx)(k,{children:n.paymentMethod})]}),n.cashierName&&(0,h.jsxs)(F,{children:[(0,h.jsx)($,{children:"Cashier"}),(0,h.jsx)(k,{children:n.cashierName})]})]})]}),(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{children:["Items (",Ce.length,")",$e&&Ce.length>0&&` \u2014 ${Ce.filter(e=>"completed"===e.status).length}/${Ce.length} served`]}),Be.map(e=>{const t=Ee[e],r=e>0,i=t[0];return(0,h.jsxs)("div",{children:[(Be.length>1||r)&&(0,h.jsxs)(S,{$isAdded:r,children:[(0,h.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===i||void 0===i?void 0:i.added_at)&&(0,h.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:Ie(i.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,i=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,h.jsxs)(E,{$completed:r&&$e,children:[$e&&(0,h.jsx)(B,{$checked:r,onClick:()=>(async e=>{if(!te&&null!==n&&void 0!==n&&n.orderId){ne(!0);try{const t=Ce.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(je)&&await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),ee())}catch(t){}ne(!1)}})(t),disabled:te,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,h.jsxs)(I,{children:[(0,h.jsxs)(z,{$completed:r,children:[e.name," ",(0,h.jsxs)(N,{children:["x",e.quantity]})]}),i&&(0,h.jsx)(_,{children:i})]}),(0,h.jsx)(D,{children:(0,l.vv)(e.price*e.quantity,o)}),Fe&&Ce.length>1&&(0,h.jsx)(T,{onClick:()=>(async(e,t)=>{if(null!==n&&void 0!==n&&n.orderId&&Fe&&window.confirm(`Delete "${t}" from this order?`))try{const t=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&ee()}catch(r){}})(t,e.name),title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===Ce.length&&(0,h.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,h.jsxs)(A,{style:{borderBottom:"none"},children:[(0,h.jsx)(w,{children:"Summary"}),(0,h.jsxs)(O,{children:[(0,h.jsx)("span",{children:"Subtotal"}),(0,h.jsx)("span",{children:(0,l.vv)(n.subtotal||0,o)})]}),(n.discountPolicyAmount||0)>0&&(0,h.jsxs)(O,{children:[(0,h.jsxs)("span",{children:["Discount",n.discountPolicyName?` (${n.discountPolicyName})`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(n.discountPolicyAmount||0,o)]})]}),(n.couponDiscount||0)>0&&(0,h.jsxs)(O,{children:[(0,h.jsxs)("span",{children:["Coupon",n.couponCode?` (${n.couponCode})`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(n.couponDiscount||0,o)]})]}),(n.pointDiscount||0)>0&&(0,h.jsxs)(O,{children:[(0,h.jsxs)("span",{children:["Points",n.pointsUsed?` (${n.pointsUsed} pts)`:""]}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(n.pointDiscount||0,o)]})]}),(n.discount||0)>0&&!n.couponDiscount&&!n.discountPolicyAmount&&!n.pointDiscount&&(0,h.jsxs)(O,{children:[(0,h.jsx)("span",{children:"Discount"}),(0,h.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,o)]})]}),(n.serviceCharge||0)>0&&(0,h.jsxs)(O,{children:[(0,h.jsxs)("span",{children:["Svc Charge",n.serviceChargeRate?` (${n.serviceChargeRate}%)`:""]}),(0,h.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,o)})]}),(n.tax||0)>0&&(0,h.jsxs)(O,{children:[(0,h.jsxs)("span",{children:["Tax",n.taxRate?` (${n.taxRate}%)`:""]}),(0,h.jsx)("span",{children:(0,l.vv)(n.tax||0,o)})]}),(0,h.jsxs)(O,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:(0,l.vv)(n.totalAmount,o)})]}),n.notes&&(0,h.jsx)(P,{children:n.notes})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsxs)(H,{children:[(0,h.jsx)(q,{onClick:async()=>{const e=n?{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",tableNumber:t||null,pagerNumber:null,date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,items:Ce.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(n.subtotal||0)),discount:parseFloat(String(n.discount||0)),coupon:n.couponCode?{code:n.couponCode,discount:parseFloat(String(n.couponDiscount||0))}:null,serviceCharge:parseFloat(String(n.serviceCharge||0)),serviceChargeRate:parseFloat(String(n.serviceChargeRate||10)),tax:parseFloat(String(n.tax||0)),taxRate:parseFloat(String(n.taxRate||6)),total:parseFloat(String(n.totalAmount||0)),paymentMethod:n.paymentMethod||"cash",amountReceived:0,change:0,cashierName:n.cashierName||null}:null;e&&0!==Ce.length&&await(0,p.pG)(e,re())},title:"Print Bill",children:(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,h.jsx)(q,{onClick:_e,title:"Print Order Ticket",children:(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),Ne&&(0,h.jsx)(q,{onClick:async()=>{if(0===Ce.length)return;const e=Ce.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void _e();const n=Ce.filter(e=>(e.order_group||0)===t),r=ze(n,`+Order ${t}`);r&&await(0,p.Si)(r,re())},title:"Print +Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M12 4v16m8-8H4"})})}),De&&(0,h.jsx)(q,{onClick:async()=>{if(null===n||void 0===n||!n.orderId||te)return;const e=Z(je);if(e){ne(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),ee()}catch(t){}ne(!1)}},title:`Revert to ${J[De]||De}`,children:(0,h.jsx)(L,{children:"\u21ba"})})]}),we&&n.orderId&&Fe&&(0,h.jsx)(M,{$variant:"ready"===je?"success":"primary",onClick:()=>Y(n.orderId,we.status),disabled:te,children:we.label}),"payment_verification_pending"===Ae&&(0,h.jsx)(M,{$variant:"success",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId){ne(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),ee()}catch(e){}ne(!1)}},disabled:te,children:"Confirm Payment"}),(0,h.jsxs)(W,{children:[Fe&&(0,h.jsx)(M,{$variant:"primary",onClick:()=>oe(!0),children:"+ Add Items"}),"pending"===Ae&&Fe&&(0,h.jsx)(M,{$variant:"served"===je?"success":"secondary",onClick:Q,children:"Payment"})]}),Fe&&"cancelled"!==je&&(0,h.jsx)(M,{$variant:"danger",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&window.confirm("Cancel this order?")){ne(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),ee()}catch(e){}ne(!1)}},disabled:te,children:"Cancel Order"}),(0,h.jsx)(M,{$variant:"link",onClick:X,children:"Open in POS Terminal \u2197"})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(U,{children:[(0,h.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,h.jsx)("p",{children:"This table is available"})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(M,{$variant:"primary",onClick:V,children:"+ New Order"}),(0,h.jsx)(M,{$variant:"link",onClick:X,children:"Open in POS Terminal \u2197"})]})]}),me&&(0,h.jsx)(u.A,{isOpen:xe,onClose:()=>{ge(!1),ye(null)},menuItem:{id:me.id,name:me.name,price:parseFloat(me.price)||0,emoji:me.emoji||"",image:me.image,optionGroups:me.optionGroups},onConfirm:(e,t,n)=>{fe(me,e,n),ge(!1),ye(null),he("")}})]})},V=i.Ay.div`
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
`,Y=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,X=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,ee=i.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,te=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,ne=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,re=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const i=t.length,o={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";o[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,h.jsxs)(V,{children:[(0,h.jsx)(Y,{children:Object.keys(s.Ez).map(e=>(0,h.jsxs)(Q,{children:[(0,h.jsx)(X,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,h.jsx)(ee,{}),(0,h.jsxs)(te,{children:[(0,h.jsxs)(ne,{children:["Tables: ",(0,h.jsx)("span",{children:i})]}),(0,h.jsxs)(ne,{children:["Avail: ",(0,h.jsx)("span",{children:o.available})]}),(0,h.jsxs)(ne,{children:["Occupied: ",(0,h.jsx)("span",{children:o.occupied})]}),o.ready>0&&(0,h.jsxs)(ne,{children:["Ready: ",(0,h.jsx)("span",{children:o.ready})]}),o["needs-attention"]>0&&(0,h.jsxs)(ne,{children:["Attn: ",(0,h.jsx)("span",{children:o["needs-attention"]})]}),(0,h.jsx)(ee,{}),(0,h.jsxs)(ne,{children:["Today: ",(0,h.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,h.jsxs)(ne,{children:["Avg: ",(0,h.jsxs)("span",{children:[p,"min"]})]})]})]})};var ie=n(2966),oe=n(8406),ae=n(3422);const se=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,de=i.Ay.div`
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,le=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ce=i.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,pe=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,ue=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,he=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,xe=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,ge=i.Ay.button`
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
`,me=i.Ay.button`
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
`,ye=i.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,be=i.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,fe=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,ve=i.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,je=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,Ae=i.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,we=i.Ay.button`
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
`,Ce=i.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,Fe=()=>{var e;const{restaurantId:t}=(0,o.g)(),n=(0,o.Zp)(),{user:i}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[x,g]=(0,r.useState)(!1),[m,y]=(0,r.useState)(""),[b,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[A,w]=(0,r.useState)("Asia/Kuala_Lumpur"),C=(0,r.useRef)(null),F=(0,r.useRef)(null),[$,k]=(0,r.useState)(null),[S,E]=(0,r.useState)(!1),[B,I]=(0,r.useState)(null),[z,_]=(0,r.useState)(null),[D,N]=(0,r.useState)(!1),[T,O]=(0,r.useState)("");(0,r.useEffect)(()=>{const e=()=>{const e=new Date;y(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:A}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[A]);const P=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),R=(0,r.useCallback)(()=>{C.current&&clearTimeout(C.current),C.current=setTimeout(()=>P(),2e3)},[P]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),i=r.data||r;if(i.floor_plan&&c(i.floor_plan),i.currency&&j(i.currency),i.operation_settings){const e="string"===typeof i.operation_settings?JSON.parse(i.operation_settings):i.operation_settings;w((0,oe.ng)(e))}i.payment_settings&&I(i.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&r.data&&_(r.data)}catch(e){}})(),P()},[t,P]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,ae.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),P()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>R()),e.on("order-created",()=>R()),e.on("order-items-added",()=>R()),e.on("new-order",()=>R()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,P,R]),(0,r.useEffect)(()=>{const e=setInterval(()=>P(),3e4);return()=>clearInterval(e)},[P]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(N(!1),O(""),P())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[P]);const M=$?p[$]:void 0,W=$?l.tables.find(e=>e.tableNumber===$):void 0;return b?(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:(0,h.jsx)(le,{children:(0,h.jsx)(ce,{children:"Floor Plan"})})}),(0,h.jsx)(fe,{children:"Loading floor plan..."})]}):(0,h.jsxs)(se,{children:[(0,h.jsxs)(de,{children:[(0,h.jsxs)(le,{children:[(0,h.jsx)(me,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,h.jsx)(ce,{children:"Floor Plan"}),(0,h.jsxs)(ue,{children:[(0,h.jsx)(pe,{$connected:x}),x?"Live":"Offline"]})]}),(0,h.jsxs)(he,{children:[(0,h.jsx)(xe,{children:m}),"Restaurant Admin"===(null===i||void 0===i?void 0:i.role)&&(0,h.jsx)(ge,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,h.jsxs)(ye,{children:[(0,h.jsx)(be,{children:(0,h.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{k(t=>t===e?null:e)},selectedTableId:$?null===(e=l.tables.find(e=>e.tableNumber===$))||void 0===e?void 0:e.id:null,currency:v})}),$&&(0,h.jsx)(K,{tableNumber:$,statusInfo:M,tableInfo:W,currency:v,timezone:A,restaurantId:Number(t),onClose:()=>k(null),onNewOrder:()=>{if(!$)return;const e=new URLSearchParams;e.set("table",$),e.set("from","floor-plan-overlay"),O(`/restaurant/${t}/pos-terminal?${e.toString()}`),N(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await P()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{E(!0)},onNavigateToPOS:()=>{$&&n(`/restaurant/${t}/pos-terminal?table=${$}&from=floor-plan`)},onOrderUpdated:P})]}),(0,h.jsx)(re,{tables:l.tables,tableStatuses:p,currency:v}),S&&M&&(0,h.jsx)(ie.A,{isOpen:S,onClose:()=>E(!1),total:Number(M.totalAmount||0),subtotal:Number(M.subtotal||M.totalAmount||0),tax:Number(M.tax||0),serviceCharge:Number(M.serviceCharge||0),discountAmount:Number(M.discount||0),couponDiscount:Number(M.couponDiscount||0),onConfirmPayment:async(e,t,n,r,i)=>{if(!$)return;const o=p[$];if(null!==o&&void 0!==o&&o.orderId)try{const t=localStorage.getItem("auth_token"),n={payment_status:"completed",payment_method:e};r&&r>0&&i&&i>0&&(n.points_used=r,n.point_discount=i,n.total_amount=(o.totalAmount||0)-i);(await fetch(`/api/orders/${o.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&(E(!1),await P())}catch(a){console.error("Failed to process payment:",a)}},paymentMethods:B,customerId:M.customerId||void 0,restaurantId:Number(t),membershipSettings:z}),(0,h.jsxs)(ve,{$isOpen:D,children:[(0,h.jsxs)(je,{children:[(0,h.jsxs)(Ae,{children:["POS Terminal \u2014 Table ",$]}),(0,h.jsx)(we,{onClick:()=>{N(!1),O(""),P()},children:"\xd7 Close"})]}),D&&T&&(0,h.jsx)(Ce,{src:T,title:"POS Terminal"})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),i=n(4752),o=n(7447),a=n(4414);const s=i.Ay.div`
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
`,d=i.Ay.div`
  font-size: 13px;
  font-weight: 700;
  color: ${e=>e.$textColor};
  line-height: 1;
`,l=i.Ay.div`
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
`,p=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},h=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:i=!1,onClick:h,onMouseDown:x,onTouchStart:g,statusInfo:m,currency:y=""}=e;const b=t.tableType||"table",f="table"!==b,v=p.has(b),j=f?u[b]||u.kitchen:i?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!i&&null!==m&&void 0!==m&&m.orderStatus&&o.v[m.orderStatus]?o.v[m.orderStatus]:o.Ez[n],A=f?{...v?{background:"transparent",border:r&&i?"1.5px dashed #635BFF":"none",boxShadow:r&&i?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":j.border}`},cursor:i?"grab":"default",opacity:i?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:r&&!v,$isEditing:i,onClick:e=>{i||!h||f||(e.stopPropagation(),h(t.tableNumber))},onMouseDown:e=>{i&&x&&x(e,t.id)},onTouchStart:e=>{i&&g&&g(e,t.id)},style:A,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!f&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!i&&null!==m&&void 0!==m&&m.guestCount?`${m.guestCount} guests`:`${t.seats} seats`}),!i&&m&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[m.orderStatus||""]||"Occupied"})]})]})});h.displayName="TableNode";const x=h,g=i.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,m=i.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,y=i.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,b=i.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,f=i.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:i=!1,selectedTableId:o,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const u=(0,r.useRef)(null),h=(0,r.useRef)(null),[v,j]=(0,r.useState)(1),[A,w]=(0,r.useState)({x:0,y:0}),C=(0,r.useMemo)(()=>{if(i||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,o=-1/0;for(const i of t.tables){const t=i.width/2,a=i.height/2;e=Math.min(e,i.x-t),n=Math.min(n,i.y-a),r=Math.max(r,i.x+t),o=Math.max(o,i.y+a)}const a=r-e,s=o-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,i]),F=(0,r.useCallback)(()=>{if(!h.current)return;const e=h.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=C.w/e.width,n=C.h/e.height,r=Math.max(t,n);j(r);const i=C.w/r,o=C.h/r;w({x:(e.width-i)/2,y:(e.height-o)/2})},[C]);(0,r.useEffect)(()=>{F();const e=new ResizeObserver(()=>F());return u.current&&e.observe(u.current),()=>e.disconnect()},[F]);const $=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:u,children:(0,a.jsxs)(m,{ref:h,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[i&&t.showGrid&&(0,a.jsx)(y,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(b,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:i?0:A.x-C.x/v+"px",top:i?0:A.y-C.y/v+"px",width:i?`${t.canvasWidth}px`:`${C.w}px`,height:i?`${t.canvasHeight}px`:`${C.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(x,{table:e,status:$(e.tableNumber),isSelected:o===e.id,isEditing:i,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(f,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),i?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>i,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>o,v:()=>d});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},i=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],o=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention"},d={outstanding:{bg:"#FEF3C7",text:"#F59E0B",border:"#F59E0B"},pending:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"},preparing:{bg:"#DBEAFE",text:"#1E40AF",border:"#3B82F6"},ready:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},served:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},completed:{bg:"#E5E7EB",text:"#374151",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#991B1B",border:"#DC2626"},awaiting_payment:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"}}}}]);