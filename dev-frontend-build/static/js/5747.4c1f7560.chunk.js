"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5747],{5747:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Ie});var r=n(9950),o=n(4752),i=n(4492),a=n(1367),s=n(7447),d=n(5783),l=n(6038),c=n(9018),p=n(5863),u=n(9189),x=n(4414);const h=o.Ay.div`
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
`,g=o.Ay.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
`,m=o.Ay.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`,b=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`,y=o.Ay.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover { background: #F3F4F6; }
`,f=o.Ay.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`,v=o.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${e=>e.$color};
  background: ${e=>e.$bg};
`,j=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`,C=o.Ay.div`
  padding: 14px 20px;
  border-bottom: 1px solid #F0F2F5;
`,A=o.Ay.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`,F=o.Ay.div`
  font-size: 12px;
`,k=o.Ay.span`
  color: #9CA3AF;
  font-weight: 500;
`,$=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  margin-left: 4px;
`,S=o.Ay.div`
  padding: 5px 0;
  font-size: 10px;
  font-weight: 600;
  color: ${e=>e.$isAdded?"#92400E":"#6B7280"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=o.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 0;
  border-bottom: 1px solid #F8FAFC;
  opacity: ${e=>e.$completed?.5:1};

  &:last-child { border-bottom: none; }
`,B=o.Ay.button`
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
`,I=o.Ay.div`
  flex: 1;
  min-width: 0;
`,z=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  text-decoration: ${e=>e.$completed?"line-through":"none"};
`,_=o.Ay.div`
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
`,T=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  font-weight: 500;
`,D=o.Ay.button`
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
`,O=o.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: ${e=>e.$bold?"14px":"12px"};
  color: ${e=>e.$bold?"#0A2540":"#6B7C93"};
  font-weight: ${e=>e.$bold?"700":"500"};
  padding: 2px 0;
`,P=o.Ay.div`
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
`,M=o.Ay.button`
  width: 100%;
  padding: 9px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>{switch(e.$variant){case"primary":return"background: #635BFF; color: white; &:hover { background: #5A51E6; }";case"success":return"background: #10B981; color: white; border: 1px solid #10B981; &:hover { background: #059669; }";case"secondary":return"background: #F6F9FC; color: #6B7C93; border: 1px solid #E6EBF1; &:hover { background: #E6EBF1; }";case"danger":return"background: white; color: #DC2626; border: 1px solid #FCA5A5; &:hover { background: #FEF2F2; }";case"link":return"background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }"}}}
`,W=o.Ay.div`
  display: flex;
  gap: 6px;
`,H=o.Ay.div`
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
`,L=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,J=o.Ay.div`
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
`,U=o.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`,G=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,V=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,Z=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin-bottom: 20px;
  line-height: 1.5;
`,K=o.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`,Y=o.Ay.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.$danger?"background: #DC2626; color: white; &:hover { background: #B91C1C; }":"background: #F3F4F6; color: #374151; &:hover { background: #E5E7EB; }"}
`,X={pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Payment",outstanding:"Outstanding",completed:"Completed",cancelled:"Cancelled"},Q={pos:"POS Terminal",mobile:"Mobile Order",kiosk:"Kiosk"},ee=e=>({preparing:"pending",ready:"preparing",served:"ready",completed:"served",pending:null,cancelled:null}[e]||null),te=e=>{let{tableNumber:t,statusInfo:n,tableInfo:o,currency:i,timezone:a,restaurantId:d,onClose:te,onNewOrder:ne,onStatusChange:re,onPayment:oe,onNavigateToPOS:ie,onOrderUpdated:ae,onClearTable:se}=e;const[de,le]=(0,r.useState)(!1),{getStoreInfo:ce}=(0,c.Pj)(),[pe,ue]=(0,r.useState)(null),[xe,he]=(0,r.useState)(!1),[ge,me]=(0,r.useState)([]),[be,ye]=(0,r.useState)([]),[fe,ve]=(0,r.useState)(!1),[je,Ce]=(0,r.useState)(""),[Ae,we]=(0,r.useState)(!1),[Fe,ke]=(0,r.useState)(null),$e=(0,r.useCallback)(async()=>{if(d)try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch(`/api/menu?restaurantId=${d}`,{headers:t});if(n.ok){var e;const t=await n.json(),r=((null===(e=t.data)||void 0===e?void 0:e.items)||t.items||[]).map(e=>{let t=e.optionGroups;if("string"===typeof t)try{t=JSON.parse(t)}catch{t=[]}return{...e,category_id:e.category_id||e.categoryId,optionGroups:Array.isArray(t)?t:[]}});me(r.filter(e=>!1!==e.is_available))}}catch(t){console.error("Failed to fetch menu:",t)}},[d]);(0,r.useEffect)(()=>{xe?$e():(ye([]),Ce(""))},[xe,$e]);const Se=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const r=n.map(e=>e.id||e.name).sort().join(",");ye(o=>{if(0===n.length){const n=o.find(t=>t.menuItemId===e.id&&(!t.selectedOptions||0===t.selectedOptions.length));if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}else{const n=o.find(t=>{var n;return t.menuItemId===e.id&&(null===(n=t.selectedOptions)||void 0===n?void 0:n.map(e=>e.id||e.name).sort().join(","))===r});if(n)return o.map(e=>e.cartId===n.cartId?{...e,quantity:e.quantity+t}:e)}const i=n.reduce((e,t)=>e+(parseFloat(t.price)||0),0),a=parseFloat(e.price)+i;return[...o,{cartId:`cart-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,menuItemId:e.id,name:e.name,price:e.price,unitPrice:a,quantity:t,selectedOptions:n,is_set_menu:e.is_set_menu,set_items:e.set_items}]})},Ee=n&&"available"!==n.status,Be=(null===n||void 0===n?void 0:n.orderStatus)||"",Ie=(null===n||void 0===n?void 0:n.paymentStatus)||"pending",ze=((e,t)=>{switch(e){case"pending":return{status:"preparing",label:"Start Cooking"};case"preparing":return{status:"ready",label:"Mark Ready"};case"ready":return"completed"===t?{status:"completed",label:"Complete Order"}:{status:"served",label:"Served"};case"served":return{status:"completed",label:"Complete Order"};default:return null}})(Be,Ie),_e=(null===n||void 0===n?void 0:n.orderItems)||[],Ne=["preparing","ready","served"].includes(Be),Te=Ee&&s.v[Be]?s.v[Be]:{bg:"#F3F4F6",text:"#9CA3AF",border:"#D1D5DB"},De=(()=>{switch(Ie){case"completed":case"paid":return{color:"#059669",bg:"#ECFDF5"};case"failed":return{color:"#DC2626",bg:"#FEE2E2"};case"payment_verification_pending":return{color:"#D97706",bg:"#FEF3C7"};default:return{color:"#6B7280",bg:"#F3F4F6"}}})(),Oe={};_e.forEach((e,t)=>{const n=e.order_group||0;Oe[n]||(Oe[n]=[]),Oe[n].push({...e,_originalIndex:t})});const Pe=Object.keys(Oe).map(Number).sort((e,t)=>e-t),Re=e=>{if(!e)return"-";const t=new Date(e),n=a?{timeZone:a}:{};return t.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"numeric",...n})+", "+t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",...n})},Me=(e,r)=>{if(!n)return null;const o=e||_e;return{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,orderType:n.orderType||"dine_in",orderSource:n.orderSource||"pos",tableNumber:t||null,pagerNumber:null,customerName:n.customerName||"Walk-in Customer",groupLabel:r,items:o.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),notes:n.notes||"",takeawayCharge:0}},We=async()=>{const e=Me();e&&0!==_e.length&&await(0,p.Si)(e,ce())},He=ee(Be),qe=_e.some(e=>(e.order_group||0)>0);return(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsxs)(m,{children:[(0,x.jsxs)("h3",{children:["Table ",t]}),(0,x.jsxs)(b,{children:[null!==n&&void 0!==n&&n.guestCount?(0,x.jsxs)("span",{children:[n.guestCount," guests"]}):o?(0,x.jsxs)("span",{children:[o.seats," seats"]}):null,Ee&&(0,x.jsxs)("span",{children:[n.elapsedMinutes,"min"]})]}),Ee&&(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{$color:Te.text,$bg:Te.bg,children:X[Be]||n.status}),(0,x.jsx)(v,{$color:De.color,$bg:De.bg,children:"completed"===Ie||"paid"===Ie?"Paid":"Unpaid"})]}),!Ee&&(0,x.jsx)(f,{children:(0,x.jsx)(v,{$color:Te.text,$bg:Te.bg,children:"Available"})})]}),(0,x.jsx)(y,{onClick:te,children:"\xd7"})]}),Ee?xe?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(j,{style:{padding:"16px 20px"},children:[(0,x.jsx)("div",{style:{marginBottom:"16px"},children:(0,x.jsx)("input",{type:"text",placeholder:"Search menu items...",value:je,onChange:e=>Ce(e.target.value),style:{width:"100%",padding:"10px 14px",border:"2px solid #E5E7EB",borderRadius:"8px",fontSize:"14px",outline:"none",transition:"border-color 0.15s",boxSizing:"border-box"},onFocus:e=>{e.currentTarget.style.borderColor="#635BFF"},onBlur:e=>{e.currentTarget.style.borderColor="#E5E7EB"},autoFocus:!0})}),je.length>0&&(0,x.jsxs)("div",{style:{marginBottom:"16px",maxHeight:"200px",overflowY:"auto",border:"1px solid #E5E7EB",borderRadius:"8px"},children:[ge.filter(e=>{if(!e||!e.name)return!1;const t=je.toLowerCase();return e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)}).slice(0,15).map(e=>{const t=Array.isArray(e.optionGroups)&&e.optionGroups.length>0;return(0,x.jsxs)("div",{style:{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6",cursor:"pointer"},onMouseEnter:e=>{e.currentTarget.style.background="#F9FAFB"},onMouseLeave:e=>{e.currentTarget.style.background="white"},children:[(0,x.jsxs)("div",{style:{flex:1,minWidth:0},onClick:()=>{Se(e,1,[]),Ce("")},children:[(0,x.jsxs)("span",{style:{fontWeight:500,fontSize:"13px"},children:[e.code?`${e.code} `:"",e.name]}),e.is_set_menu&&(0,x.jsx)("span",{style:{marginLeft:"6px",fontSize:"10px",background:"#EDE9FE",color:"#7C3AED",padding:"1px 5px",borderRadius:"3px"},children:"SET"})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,x.jsx)("span",{style:{color:"#635BFF",fontWeight:500,fontSize:"13px"},children:(0,l.vv)(parseFloat(e.price)||0,i)}),t&&(0,x.jsx)("button",{onClick:t=>{t.stopPropagation(),ke(e),we(!0)},style:{padding:"3px 8px",fontSize:"11px",background:"#FEF3C7",color:"#D97706",border:"1px solid #FCD34D",borderRadius:"4px",cursor:"pointer",fontWeight:500},children:"Options"})]})]},e.id)}),0===ge.filter(e=>{var t;const n=je.toLowerCase();return(null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n))||e.code&&e.code.toLowerCase().includes(n)}).length&&(0,x.jsx)("div",{style:{padding:"14px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No items found"})]}),(0,x.jsxs)("div",{children:[(0,x.jsxs)(A,{style:{marginBottom:"10px"},children:["Items to Add (",be.reduce((e,t)=>e+t.quantity,0),")"]}),0===be.length?(0,x.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#9CA3AF",background:"#F9FAFB",borderRadius:"8px",fontSize:"13px"},children:"Search and select items to add"}):(0,x.jsx)("div",{style:{border:"1px solid #E5E7EB",borderRadius:"8px",overflow:"hidden"},children:be.map(e=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid #F3F4F6"},children:[(0,x.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,x.jsx)("div",{style:{fontWeight:500,fontSize:"13px"},children:e.name}),e.selectedOptions&&e.selectedOptions.length>0&&(0,x.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"1px"},children:e.selectedOptions.map(e=>e.name).join(", ")}),(0,x.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[(0,l.vv)(e.unitPrice||parseFloat(e.price),i)," each"]})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexShrink:0},children:[(0,x.jsx)("button",{onClick:()=>{return t=e.cartId,void ye(e=>{const n=e.find(e=>e.cartId===t);return n&&n.quantity>1?e.map(e=>e.cartId===t?{...e,quantity:e.quantity-1}:e):e.filter(e=>e.cartId!==t)});var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"-"}),(0,x.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600,fontSize:"14px"},children:e.quantity}),(0,x.jsx)("button",{onClick:()=>{return t=e.cartId,void ye(e=>e.map(e=>e.cartId===t?{...e,quantity:e.quantity+1}:e));var t},style:{width:"28px",height:"28px",border:"1px solid #E5E7EB",borderRadius:"6px",background:"white",cursor:"pointer",fontSize:"16px",fontWeight:500},children:"+"})]})]},e.cartId))})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:(0,x.jsxs)("span",{style:{fontWeight:600,fontSize:"14px"},children:["Total: ",(0,l.vv)(be.reduce((e,t)=>e+(t.unitPrice||parseFloat(t.price))*t.quantity,0),i)]})}),(0,x.jsx)(M,{$variant:"primary",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId&&0!==be.length)try{ve(!0);const e=localStorage.getItem("auth_token"),t=be.map(e=>{var t;return{menu_item_id:e.menuItemId,menu_item_name:e.name,name:e.name,quantity:e.quantity,price:e.price,unitPrice:e.unitPrice||e.price,options:(null===(t=e.selectedOptions)||void 0===t?void 0:t.map(e=>({name:e.name,price:e.price||0})))||[],is_set_menu:e.is_set_menu,set_items:e.set_items}}),r=await fetch(`/api/orders/${n.orderId}/merge-items`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({items:t,source:"floor_plan"})});if(!r.ok){const e=await r.json();throw new Error(e.message||"Failed to add items")}he(!1),ye([]),Ce(""),ae()}catch(e){console.error("Add items error:",e)}finally{ve(!1)}},disabled:0===be.length||fe,children:fe?"Adding...":"Add to Order"}),(0,x.jsx)(M,{$variant:"secondary",onClick:()=>{he(!1),ye([]),Ce("")},children:"Cancel"})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(j,{children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)(A,{children:["Order ",n.orderNumber||"",n.customerName&&"Walk-in Customer"!==n.customerName?` \u2014 ${n.customerName}`:""]}),(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Customer"}),(0,x.jsx)($,{children:n.customerName||"Walk-in"})]}),n.customerPhone&&(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Phone"}),(0,x.jsx)($,{children:n.customerPhone})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Type"}),(0,x.jsx)($,{children:(n.orderType||"dine_in").replace(/_/g," ").toUpperCase()})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Source"}),(0,x.jsx)($,{children:Q[n.orderSource||"pos"]||n.orderSource})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Time"}),(0,x.jsx)($,{children:Re(n.orderCreatedAt)})]}),n.paymentMethod&&(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Payment"}),(0,x.jsx)($,{children:n.paymentMethod})]}),n.cashierName&&(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"Cashier"}),(0,x.jsx)($,{children:n.cashierName})]})]})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(A,{children:["Items (",_e.length,")",Ne&&_e.length>0&&` \u2014 ${_e.filter(e=>"completed"===e.status).length}/${_e.length} served`]}),Pe.map(e=>{const t=Oe[e],r=e>0,o=t[0];return(0,x.jsxs)("div",{children:[(Pe.length>1||r)&&(0,x.jsxs)(S,{$isAdded:r,children:[(0,x.jsx)("span",{children:r?`+Added #${e}`:"Original Order"}),r&&(null===o||void 0===o?void 0:o.added_at)&&(0,x.jsx)("span",{style:{fontSize:"9px",fontWeight:400,color:"#9CA3AF"},children:Re(o.added_at)})]}),t.map(e=>{const t=e._originalIndex,r="completed"===e.status,o=Array.isArray(e.options)?e.options.map(e=>"string"===typeof e?e:(null===e||void 0===e?void 0:e.name)||"").filter(Boolean).join(", "):"";return(0,x.jsxs)(E,{$completed:r&&Ne,children:[Ne&&(0,x.jsx)(B,{$checked:r,onClick:()=>(async e=>{if(!de&&null!==n&&void 0!==n&&n.orderId){le(!0);try{const t=_e.map((t,n)=>n===e?{...t,status:"completed"===t.status?"pending":"completed"}:t),r=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({order_items:t})})).ok&&(t.every(e=>"completed"===e.status)&&["preparing","ready"].includes(Be)&&await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"served"})}),ae())}catch(t){}le(!1)}})(t),disabled:de,title:r?"Mark as not served":"Mark as served",children:r?"\u2713":""}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{$completed:r,children:[e.name," ",(0,x.jsxs)(T,{children:["x",e.quantity]})]}),o&&(0,x.jsx)(_,{children:o})]}),(0,x.jsx)(N,{children:(0,l.vv)(e.price*e.quantity,i)}),"completed"!==Ie&&_e.length>1&&(0,x.jsx)(D,{onClick:()=>{return r=t,o=e.name,void(null!==n&&void 0!==n&&n.orderId&&ue({title:"Delete Item",message:`Delete "${o}" from this order?`,onConfirm:async()=>{ue(null);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/orders/${n.orderId}/items/${r}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&ae()}catch(e){}}}));var r,o},title:"Delete item",children:"\xd7"})]},t)})]},e)}),0===_e.length&&(0,x.jsx)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:"No items"})]}),(0,x.jsxs)(C,{style:{borderBottom:"none"},children:[(0,x.jsx)(A,{children:"Summary"}),(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Subtotal"}),(0,x.jsx)("span",{children:(0,l.vv)(n.subtotal||0,i)})]}),(n.discountPolicyAmount||0)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Discount",n.discountPolicyName?` (${n.discountPolicyName})`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.discountPolicyAmount||0,i)]})]}),(n.couponDiscount||0)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Coupon",n.couponCode?` (${n.couponCode})`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.couponDiscount||0,i)]})]}),(n.pointDiscount||0)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Points",n.pointsUsed?` (${n.pointsUsed} pts)`:""]}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.pointDiscount||0,i)]})]}),(n.discount||0)>0&&!n.couponDiscount&&!n.discountPolicyAmount&&!n.pointDiscount&&(0,x.jsxs)(O,{children:[(0,x.jsx)("span",{children:"Discount"}),(0,x.jsxs)("span",{children:["-",(0,l.vv)(n.discount||0,i)]})]}),(n.serviceCharge||0)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Svc Charge",n.serviceChargeRate?` (${n.serviceChargeRate}%)`:""]}),(0,x.jsx)("span",{children:(0,l.vv)(n.serviceCharge||0,i)})]}),(n.tax||0)>0&&(0,x.jsxs)(O,{children:[(0,x.jsxs)("span",{children:["Tax",n.taxRate?` (${n.taxRate}%)`:""]}),(0,x.jsx)("span",{children:(0,l.vv)(n.tax||0,i)})]}),(0,x.jsxs)(O,{$bold:!0,style:{marginTop:"4px",paddingTop:"6px",borderTop:"1px solid #E6EBF1"},children:[(0,x.jsx)("span",{children:"Total"}),(0,x.jsx)("span",{children:(0,l.vv)(n.totalAmount,i)})]}),n.notes&&(0,x.jsx)(P,{children:n.notes})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(H,{children:[(0,x.jsxs)(q,{onClick:async()=>{const e=n?{orderNumber:n.orderNumber||"",pickupNumber:(n.orderNumber||"").split("-")[1]||"",tableNumber:t||null,pagerNumber:null,date:n.orderCreatedAt?new Date(n.orderCreatedAt):new Date,items:_e.map(e=>{let t=e.options||[];if("string"===typeof t)try{t=JSON.parse(t)}catch(n){t=[]}return Array.isArray(t)||(t=[]),{menuItem:{name:e.name||"Unknown Item",price:parseFloat(e.price||"0"),is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[]},quantity:e.quantity||1,options:t}}),subtotal:parseFloat(String(n.subtotal||0)),discount:parseFloat(String(n.discount||0)),coupon:n.couponCode?{code:n.couponCode,discount:parseFloat(String(n.couponDiscount||0))}:null,serviceCharge:parseFloat(String(n.serviceCharge||0)),serviceChargeRate:parseFloat(String(n.serviceChargeRate||10)),tax:parseFloat(String(n.tax||0)),taxRate:parseFloat(String(n.taxRate||6)),total:parseFloat(String(n.totalAmount||0)),paymentMethod:n.paymentMethod||"cash",amountReceived:0,change:0,cashierName:n.cashierName||null}:null;e&&0!==_e.length&&await(0,p.pG)(e,ce())},title:"Print Bill",children:[(0,x.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,x.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,x.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,x.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),"Bill"]}),(0,x.jsxs)(q,{onClick:We,title:"Print Order Ticket",children:[(0,x.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),"Ticket"]}),qe&&(0,x.jsx)(q,{onClick:async()=>{if(0===_e.length)return;const e=_e.map(e=>e.order_group||0),t=Math.max(...e);if(0===t)return void We();const n=_e.filter(e=>(e.order_group||0)===t),r=Me(n,`+Order ${t}`);r&&await(0,p.Si)(r,ce())},title:"+Order Ticket",style:{background:"#FEF3C7",color:"#92400E"},children:(0,x.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M12 4v16m8-8H4"})})}),He&&(0,x.jsx)(q,{onClick:async()=>{if(null===n||void 0===n||!n.orderId||de)return;const e=ee(Be);if(e){le(!0);try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:e})}),ae()}catch(t){}le(!1)}},title:`Revert to ${X[He]||He}`,children:(0,x.jsx)(L,{children:"\u21ba"})})]}),ze&&n.orderId&&"completed"!==Be&&"cancelled"!==Be&&(0,x.jsx)(M,{$variant:"ready"===Be?"success":"primary",onClick:()=>re(n.orderId,ze.status),disabled:de,children:ze.label}),"payment_verification_pending"===Ie&&(0,x.jsx)(M,{$variant:"success",onClick:async()=>{if(null!==n&&void 0!==n&&n.orderId){le(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_status:"completed"})}),ae()}catch(e){}le(!1)}},disabled:de,children:"Confirm Payment"}),(0,x.jsxs)(W,{children:["pending"===Ie&&!["served","completed","cancelled"].includes(Be)&&(0,x.jsx)(M,{$variant:"secondary",onClick:()=>he(!0),children:"Add Items"}),"pending"===Ie&&(0,x.jsx)(M,{$variant:"served"===Be?"success":"secondary",onClick:oe,children:"Payment"})]}),"cancelled"!==Be&&"completed"!==Be&&(0,x.jsx)(M,{$variant:"danger",onClick:()=>{null!==n&&void 0!==n&&n.orderId&&ue({title:"Cancel Order",message:"Are you sure you want to cancel this order? This action cannot be undone.",onConfirm:async()=>{ue(null),le(!0);try{const e=localStorage.getItem("auth_token");await fetch(`/api/orders/${n.orderId}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})}),ae()}catch(e){}le(!1)}})},disabled:de,children:"Cancel Order"}),"completed"===Be&&n.orderId&&(0,x.jsx)(M,{$variant:"primary",onClick:()=>se(n.orderId),disabled:de,children:"Leaved"}),(0,x.jsx)(M,{$variant:"link",onClick:ie,children:"Open in POS Terminal \u2197"})]})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(J,{children:[(0,x.jsx)("span",{style:{fontSize:40,opacity:.3},children:"\u25cb"}),(0,x.jsx)("p",{children:"This table is available"})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(M,{$variant:"primary",onClick:ne,children:"+ New Order"}),(0,x.jsx)(M,{$variant:"link",onClick:ie,children:"Open in POS Terminal \u2197"})]})]}),Fe&&(0,x.jsx)(u.A,{isOpen:Ae,onClose:()=>{we(!1),ke(null)},menuItem:{id:Fe.id,name:Fe.name,price:parseFloat(Fe.price)||0,emoji:Fe.emoji||"",image:Fe.image,optionGroups:Fe.optionGroups},onConfirm:(e,t,n)=>{Se(Fe,e,n),we(!1),ke(null),Ce("")}}),pe&&(0,x.jsx)(U,{onClick:()=>ue(null),children:(0,x.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(V,{children:pe.title}),(0,x.jsx)(Z,{children:pe.message}),(0,x.jsxs)(K,{children:[(0,x.jsx)(Y,{onClick:()=>ue(null),children:"Cancel"}),(0,x.jsx)(Y,{$danger:!0,onClick:pe.onConfirm,children:"Confirm"})]})]})})]})},ne=o.Ay.div`
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
`,re=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,oe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
`,ie=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$color};
`,ae=o.Ay.div`
  width: 1px;
  height: 20px;
  background: #E6EBF1;
`,se=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`,de=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
  white-space: nowrap;

  span {
    font-weight: 700;
    color: #0A2540;
  }
`,le=e=>{let{tables:t,tableStatuses:n,currency:r}=e;const o=t.length,i={available:0,occupied:0,ready:0,"needs-attention":0};let a=0,d=0,c=0;t.forEach(e=>{const t=n[e.tableNumber],r=(null===t||void 0===t?void 0:t.status)||"available";i[r]++,"available"!==r&&t&&(a+=t.totalAmount,d+=t.elapsedMinutes,c++)});const p=c>0?Math.round(d/c):0;return(0,x.jsxs)(ne,{children:[(0,x.jsx)(re,{children:Object.keys(s.Ez).map(e=>(0,x.jsxs)(oe,{children:[(0,x.jsx)(ie,{$color:s.Ez[e].border}),s.Zt[e]]},e))}),(0,x.jsx)(ae,{}),(0,x.jsxs)(se,{children:[(0,x.jsxs)(de,{children:["Tables: ",(0,x.jsx)("span",{children:o})]}),(0,x.jsxs)(de,{children:["Avail: ",(0,x.jsx)("span",{children:i.available})]}),(0,x.jsxs)(de,{children:["Occupied: ",(0,x.jsx)("span",{children:i.occupied})]}),i.ready>0&&(0,x.jsxs)(de,{children:["Ready: ",(0,x.jsx)("span",{children:i.ready})]}),i["needs-attention"]>0&&(0,x.jsxs)(de,{children:["Attn: ",(0,x.jsx)("span",{children:i["needs-attention"]})]}),(0,x.jsx)(ae,{}),(0,x.jsxs)(de,{children:["Today: ",(0,x.jsx)("span",{children:(0,l.vv)(a,r)})]}),p>0&&(0,x.jsxs)(de,{children:["Avg: ",(0,x.jsxs)("span",{children:[p,"min"]})]})]})]})};var ce=n(2966),pe=n(8406),ue=n(3422);const xe=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #FAFBFC;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,he=o.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 12px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,ge=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,me=o.Ay.h1`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,be=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.$connected?"#059669":"#DC2626"};
  flex-shrink: 0;
`,ye=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7C93;
`,fe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,ve=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  font-variant-numeric: tabular-nums;
`,je=o.Ay.button`
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
  }
`,Ae=o.Ay.div`
  flex: 1;
  display: flex;
  min-height: 0;
`,we=o.Ay.div`
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`,Fe=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  font-size: 14px;
`,ke=o.Ay.div`
  display: ${e=>e.$isOpen?"flex":"none"};
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: white;
  flex-direction: column;
`,$e=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #0A2540;
  flex-shrink: 0;
`,Se=o.Ay.div`
  color: white;
  font-size: 14px;
  font-weight: 600;
`,Ee=o.Ay.button`
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
`,Be=o.Ay.iframe`
  flex: 1;
  width: 100%;
  border: none;
`,Ie=()=>{var e;const{restaurantId:t}=(0,i.g)(),n=(0,i.Zp)(),{user:o}=(0,a.As)(),[l,c]=(0,r.useState)(s.He),[p,u]=(0,r.useState)({}),[h,g]=(0,r.useState)(!1),[m,b]=(0,r.useState)(""),[y,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(""),[C,A]=(0,r.useState)("Asia/Kuala_Lumpur"),w=(0,r.useRef)(null),F=(0,r.useRef)(null),[k,$]=(0,r.useState)(null),[S,E]=(0,r.useState)(!1),[B,I]=(0,r.useState)(null),[z,_]=(0,r.useState)(null),[N,T]=(0,r.useState)(!1),[D,O]=(0,r.useState)(""),[P,R]=(0,r.useState)(null);(0,r.useEffect)(()=>{const e=()=>{const e=new Date;b(e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:C}))};e();const t=setInterval(e,3e4);return()=>clearInterval(t)},[C]);const M=(0,r.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/table-status`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();u(e.data||{})}}catch(e){console.error("Failed to fetch table statuses:",e)}},[t]),W=(0,r.useCallback)(()=>{w.current&&clearTimeout(w.current),w.current=setTimeout(()=>M(),2e3)},[M]);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)return;const r=await n.json(),o=r.data||r;if(o.floor_plan&&c(o.floor_plan),o.currency&&j(o.currency),o.operation_settings){const e="string"===typeof o.operation_settings?JSON.parse(o.operation_settings):o.operation_settings;A((0,pe.ng)(e))}o.payment_settings&&I(o.payment_settings)}catch(e){console.error("Failed to load floor plan:",e)}finally{f(!1)}})(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/membership/settings/${t}`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&r.data&&_(r.data)}catch(e){}})(),M()},[t,M]),(0,r.useEffect)(()=>{if(!t)return;const e=(0,ue.Ay)("/orders",{transports:["websocket","polling"],reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:10});return e.on("connect",()=>{g(!0),e.emit("join-restaurant",t),M()}),e.on("disconnect",()=>g(!1)),e.on("order-updated",()=>W()),e.on("order-created",()=>W()),e.on("order-items-added",e=>{W(),R({isVisible:!0,orderId:e.orderId,orderNumber:e.orderNumber,tableNumber:e.tableNumber,orderGroup:e.orderGroup,itemCount:e.itemCount})}),e.on("new-order",()=>W()),F.current=e,()=>{e.disconnect(),F.current=null}},[t,M,W]),(0,r.useEffect)(()=>{const e=setInterval(()=>M(),3e4);return()=>clearInterval(e)},[M]),(0,r.useEffect)(()=>{const e=e=>{var t,n;"pos-order-complete"!==(null===(t=e.data)||void 0===t?void 0:t.type)&&"pos-close"!==(null===(n=e.data)||void 0===n?void 0:n.type)||(T(!1),O(""),M())};return window.addEventListener("message",e),()=>window.removeEventListener("message",e)},[M]);const H=k?p[k]:void 0,q=k?l.tables.find(e=>e.tableNumber===k):void 0;return y?(0,x.jsxs)(xe,{children:[(0,x.jsx)(he,{children:(0,x.jsx)(ge,{children:(0,x.jsx)(me,{children:"Floor Plan"})})}),(0,x.jsx)(Fe,{children:"Loading floor plan..."})]}):(0,x.jsxs)(xe,{children:[(null===P||void 0===P?void 0:P.isVisible)&&(0,x.jsxs)("div",{style:{position:"fixed",top:"20px",right:"20px",background:"#FEF3C7",border:"2px solid #F59E0B",borderRadius:"12px",padding:"16px 20px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",zIndex:1e4,maxWidth:"320px",animation:"slideInRight 0.3s ease-out"},children:[(0,x.jsx)("style",{children:"@keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }"}),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},children:[(0,x.jsx)("div",{style:{fontWeight:700,fontSize:"15px",color:"#92400E"},children:"New Items Added"}),(0,x.jsx)("button",{onClick:()=>R(null),style:{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#92400E",padding:"0",lineHeight:1},children:"\xd7"})]}),(0,x.jsxs)("div",{style:{color:"#78350F",fontSize:"14px",marginBottom:"12px"},children:[(0,x.jsxs)("strong",{children:["Order ",P.orderNumber]}),P.tableNumber&&` (Table ${P.tableNumber})`,(0,x.jsx)("br",{}),(0,x.jsxs)("span",{style:{background:"#FCD34D",padding:"2px 8px",borderRadius:"4px",fontWeight:600},children:["+Order ",P.orderGroup]})," ",P.itemCount," item",P.itemCount>1?"s":""," added"]}),(0,x.jsx)("button",{onClick:()=>{P.tableNumber&&$(P.tableNumber),R(null)},style:{width:"100%",padding:"10px",background:"#F59E0B",color:"white",border:"none",borderRadius:"8px",fontWeight:600,cursor:"pointer",fontSize:"14px"},children:"View Table"})]}),(0,x.jsxs)(he,{children:[(0,x.jsxs)(ge,{children:[(0,x.jsx)(Ce,{onClick:()=>n(`/restaurant/${t}/dashboard`),children:"\u2190 Back"}),(0,x.jsx)(me,{children:"Floor Plan"}),(0,x.jsxs)(ye,{children:[(0,x.jsx)(be,{$connected:h}),h?"Live":"Offline"]})]}),(0,x.jsxs)(fe,{children:[(0,x.jsx)(ve,{children:m}),"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(0,x.jsx)(je,{onClick:()=>n(`/restaurant/${t}/floor-plan-editor`),children:"Edit Layout"})]})]}),(0,x.jsxs)(Ae,{children:[(0,x.jsx)(we,{children:(0,x.jsx)(d.A,{floorPlan:l,tableStatuses:p,onTableClick:e=>{$(t=>t===e?null:e)},selectedTableId:k?null===(e=l.tables.find(e=>e.tableNumber===k))||void 0===e?void 0:e.id:null,currency:v})}),k&&(0,x.jsx)(te,{tableNumber:k,statusInfo:H,tableInfo:q,currency:v,timezone:C,restaurantId:Number(t),onClose:()=>$(null),onNewOrder:()=>{if(!k)return;const e=new URLSearchParams;e.set("table",k),e.set("from","floor-plan-overlay"),O(`/restaurant/${t}/pos-terminal?${e.toString()}`),T(!0)},onStatusChange:async(e,t)=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/orders/${e}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({status:t})})).ok&&await M()}catch(n){console.error("Failed to update order status:",n)}},onPayment:()=>{E(!0)},onNavigateToPOS:()=>{k&&n(`/restaurant/${t}/pos-terminal?table=${k}&from=floor-plan`)},onOrderUpdated:M,onClearTable:async e=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/orders/${e}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({table_number:null})}),$(null),await M()}catch(t){console.error("Failed to clear table:",t)}}})]}),(0,x.jsx)(le,{tables:l.tables,tableStatuses:p,currency:v}),S&&H&&(0,x.jsx)(ce.A,{isOpen:S,onClose:()=>E(!1),total:Number(H.totalAmount||0),subtotal:Number(H.subtotal||H.totalAmount||0),tax:Number(H.tax||0),serviceCharge:Number(H.serviceCharge||0),discountAmount:Number(H.discount||0),couponDiscount:Number(H.couponDiscount||0),onConfirmPayment:async(e,t,n,r,o)=>{if(!k)return;const i=p[k];if(null!==i&&void 0!==i&&i.orderId)try{const t=localStorage.getItem("auth_token"),n={payment_status:"completed",payment_method:e};r&&r>0&&o&&o>0&&(n.points_used=r,n.point_discount=o,n.total_amount=(i.totalAmount||0)-o);(await fetch(`/api/orders/${i.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(n)})).ok&&("outstanding"===i.orderStatus?await fetch(`/api/orders/${i.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"pending"})}):"served"===i.orderStatus&&await fetch(`/api/orders/${i.orderId}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"completed"})}),E(!1),await M())}catch(a){console.error("Failed to process payment:",a)}},paymentMethods:B,customerId:H.customerId||void 0,restaurantId:Number(t),membershipSettings:z}),(0,x.jsxs)(ke,{$isOpen:N,children:[(0,x.jsxs)($e,{children:[(0,x.jsxs)(Se,{children:["POS Terminal \u2014 Table ",k]}),(0,x.jsx)(Ee,{onClick:()=>{T(!1),O(""),M()},children:"\xd7 Close"})]}),N&&D&&(0,x.jsx)(Be,{src:D,title:"POS Terminal"})]})]})}},5783:(e,t,n)=>{n.d(t,{A:()=>v});var r=n(9950),o=n(4752),i=n(7447),a=n(4414);const s=o.Ay.div`
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
`,p=new Set(["kitchen","entrance"]),u={kitchen:{bg:"transparent",border:"transparent",text:"#6B7280"},counter:{bg:"#FEF3C7",border:"#D97706",text:"#92400E"},entrance:{bg:"transparent",border:"transparent",text:"#6B7280"}},x=r.memo(e=>{let{table:t,status:n="available",isSelected:r=!1,isEditing:o=!1,onClick:x,onMouseDown:h,onTouchStart:g,statusInfo:m,currency:b=""}=e;const y=t.tableType||"table",f="table"!==y,v=p.has(y),j=f?u[y]||u.kitchen:o?{bg:"#F8F9FA",border:"#D1D9E0",text:"#374151"}:!o&&null!==m&&void 0!==m&&m.orderStatus&&i.v[m.orderStatus]?i.v[m.orderStatus]:i.Ez[n],C=f?{...v?{background:"transparent",border:r&&o?"1.5px dashed #635BFF":"none",boxShadow:r&&o?"0 0 0 2px rgba(99, 91, 255, 0.2)":"none",borderRadius:"4px"}:{border:`2.5px solid ${r?"#635BFF":j.border}`},cursor:o?"grab":"default",opacity:o?1:.85}:void 0;return(0,a.jsxs)(s,{$x:t.x,$y:t.y,$w:t.width,$h:t.height,$shape:v?"square":t.shape,$rotation:t.rotation,$bgColor:v?"transparent":j.bg,$borderColor:v?"transparent":j.border,$textColor:j.text,$isSelected:r&&!v,$isEditing:o,onClick:e=>{o||!x||f||(e.stopPropagation(),x(t.tableNumber))},onMouseDown:e=>{o&&h&&h(e,t.id)},onTouchStart:e=>{o&&g&&g(e,t.id)},style:C,children:[(0,a.jsx)(d,{$textColor:j.text,style:v?{fontSize:"14px",fontWeight:600,whiteSpace:"nowrap"}:void 0,children:t.label||t.tableNumber}),!f&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{$textColor:j.text,children:!o&&null!==m&&void 0!==m&&m.guestCount?`${m.guestCount} guests`:`${t.seats} seats`}),!o&&m&&"available"!==n&&(0,a.jsx)(c,{$textColor:j.text,children:{pending:"Pending",preparing:"Preparing",ready:"Ready",served:"Served",awaiting_payment:"Awaiting Pay",outstanding:"Outstanding"}[m.orderStatus||""]||"Occupied"})]})]})});x.displayName="TableNode";const h=x,g=o.Ay.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  position: relative;
`,m=o.Ay.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
`,b=o.Ay.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, #F0F2F5 1px, transparent 1px),
    linear-gradient(to bottom, #F0F2F5 1px, transparent 1px);
  background-size:
    ${e=>e.$gridSize/e.$scale}px ${e=>e.$gridSize/e.$scale}px;
  opacity: 0.5;
`,y=o.Ay.div`
  position: absolute;
  transform-origin: 0 0;
`,f=o.Ay.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
`,v=e=>{let{floorPlan:t,tableStatuses:n={},isEditing:o=!1,selectedTableId:i,onTableClick:s,onTableMouseDown:d,onTableTouchStart:l,onCanvasClick:c,currency:p=""}=e;const u=(0,r.useRef)(null),x=(0,r.useRef)(null),[v,j]=(0,r.useState)(1),[C,A]=(0,r.useState)({x:0,y:0}),w=(0,r.useMemo)(()=>{if(o||0===t.tables.length)return{x:0,y:0,w:t.canvasWidth,h:t.canvasHeight};let e=1/0,n=1/0,r=-1/0,i=-1/0;for(const o of t.tables){const t=o.width/2,a=o.height/2;e=Math.min(e,o.x-t),n=Math.min(n,o.y-a),r=Math.max(r,o.x+t),i=Math.max(i,o.y+a)}const a=r-e,s=i-n,d=Math.max(.1*a,40),l=Math.max(.1*s,40);return{x:e-d,y:n-l,w:a+2*d,h:s+2*l}},[t,o]),F=(0,r.useCallback)(()=>{if(!x.current)return;const e=x.current.getBoundingClientRect();if(0===e.width||0===e.height)return;const t=w.w/e.width,n=w.h/e.height,r=Math.max(t,n);j(r);const o=w.w/r,i=w.h/r;A({x:(e.width-o)/2,y:(e.height-i)/2})},[w]);(0,r.useEffect)(()=>{F();const e=new ResizeObserver(()=>F());return u.current&&e.observe(u.current),()=>e.disconnect()},[F]);const k=e=>{var t;return(null===(t=n[e])||void 0===t?void 0:t.status)||"available"};return(0,a.jsx)(g,{ref:u,children:(0,a.jsxs)(m,{ref:x,onClick:e=>{(e.target===e.currentTarget||e.target.closest("[data-scaled-layer]"))&&(null===c||void 0===c||c())},children:[o&&t.showGrid&&(0,a.jsx)(b,{$gridSize:t.gridSize,$scale:v}),(0,a.jsx)(y,{"data-scaled-layer":!0,style:{transform:`scale(${1/v})`,left:o?0:C.x-w.x/v+"px",top:o?0:C.y-w.y/v+"px",width:o?`${t.canvasWidth}px`:`${w.w}px`,height:o?`${t.canvasHeight}px`:`${w.h}px`},onClick:e=>{e.target===e.currentTarget&&(null===c||void 0===c||c())},children:t.tables.map(e=>(0,a.jsx)(h,{table:e,status:k(e.tableNumber),isSelected:i===e.id,isEditing:o,onClick:s,onMouseDown:d,onTouchStart:l,statusInfo:n[e.tableNumber],currency:p},e.id))}),0===t.tables.length&&(0,a.jsxs)(f,{children:[(0,a.jsx)("span",{style:{fontSize:"32px"},children:"\u25a6"}),o?"Add tables using the toolbar above":"No floor plan configured yet"]})]})})}},7447:(e,t,n)=>{n.d(t,{Em:()=>o,Ez:()=>a,He:()=>r,Zt:()=>s,h_:()=>i,v:()=>d});const r={version:1,canvasWidth:1200,canvasHeight:800,gridSize:20,showGrid:!0,tables:[]},o=[{value:"round",label:"Round",defaultWidth:70,defaultHeight:70},{value:"square",label:"Square",defaultWidth:70,defaultHeight:70},{value:"rectangle",label:"Rect (H)",defaultWidth:110,defaultHeight:70},{value:"rectangle",label:"Rect (V)",defaultWidth:70,defaultHeight:110,variant:"vertical"}],i=[{type:"counter",label:"Counter (H)",defaultWidth:120,defaultHeight:40,icon:"C",variant:"horizontal"},{type:"counter",label:"Counter (V)",defaultWidth:40,defaultHeight:120,icon:"C",variant:"vertical"},{type:"kitchen",label:"Kitchen",defaultWidth:80,defaultHeight:30,icon:"K",textOnly:!0},{type:"entrance",label:"Entrance",defaultWidth:80,defaultHeight:30,icon:"E",textOnly:!0}],a={available:{bg:"#F3F4F6",border:"#D1D5DB",text:"#9CA3AF"},occupied:{bg:"#EFF6FF",border:"#635BFF",text:"#635BFF"},ready:{bg:"#FEF3C7",border:"#D97706",text:"#D97706"},"needs-attention":{bg:"#FEE2E2",border:"#DC2626",text:"#DC2626"},completed:{bg:"#E5E7EB",border:"#9CA3AF",text:"#374151"}},s={available:"Available",occupied:"Occupied",ready:"Ready","needs-attention":"Attention",completed:"Completed"},d={outstanding:{bg:"#FEF3C7",text:"#F59E0B",border:"#F59E0B"},pending:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"},preparing:{bg:"#DBEAFE",text:"#1E40AF",border:"#3B82F6"},ready:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},served:{bg:"#D1FAE5",text:"#065F46",border:"#10B981"},completed:{bg:"#E5E7EB",text:"#374151",border:"#9CA3AF"},cancelled:{bg:"#FEE2E2",text:"#991B1B",border:"#DC2626"},awaiting_payment:{bg:"#FEF3C7",text:"#92400E",border:"#D97706"}}}}]);