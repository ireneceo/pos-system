"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4844],{4844:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var i=n(9950),o=n(4752),s=n(4492),r=n(3422),l=n(6038),d=n(2924),a=n(5030),c=n(4414);const p=o.i7`from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}`,x=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  user-select: none;
`,h=o.Ay.div`
  background: white;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,u=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,g=o.Ay.div`
  width: 360px;
  min-width: 360px;
  background: white;
  border-right: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    padding: 16px;
  }
`,f=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  overflow-y: auto;
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`,m=o.Ay.button`
  padding: 14px;
  font-size: 20px;
  font-weight: 500;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  color: #0A2540;
  cursor: pointer;
  &:active { background: #635BFF; color: white; }
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  animation: ${p} 0.2s ease;
  &:last-child { border-bottom: none; }
`,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: ${e=>e.bold?"18px":"13px"};
  font-weight: ${e=>e.bold?700:400};
  color: ${e=>e.bold?"#0A2540":"#6B7C93"};
`,b=()=>{const{t:e}=(0,a.Bd)("pos"),{restaurantId:t}=(0,s.g)(),[n,o]=(0,i.useState)(""),[p,b]=(0,i.useState)("MY"),[S,F]=(0,i.useState)(!1),[k,C]=(0,i.useState)(""),[z,A]=(0,i.useState)(!1),[B,w]=(0,i.useState)(null),[D,R]=(0,i.useState)(null),[E,W]=(0,i.useState)("idle"),[P,T]=(0,i.useState)(null),[I,O]=(0,i.useState)(!1),[Y,$]=(0,i.useState)(!1),[_,L]=(0,i.useState)(""),M=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&fetch(`/api/restaurants/${t}`).then(e=>e.json()).then(e=>{const t=e.data||e;L(t.name||"");const n=t.country||"MY";d.FS.find(e=>e.code===n)&&b(n)}).catch(()=>{})},[t]),(0,i.useEffect)(()=>{if(!t)return;const e=(0,r.io)("/checkout-display",{transports:["websocket","polling"]});return M.current=e,e.on("connect",()=>{e.emit("join-restaurant",t),$(!0)}),e.on("disconnect",()=>$(!1)),e.on("cart-update",e=>{w(e),I&&O(!1)}),e.on("checkout-complete",e=>{T(e),O(!0),w(null),setTimeout(()=>{O(!1),T(null),o(""),R(null),W("idle"),F(!1),C("")},5e3)}),()=>{e.disconnect()}},[t]);const q=d.FS.find(e=>e.code===p)||d.FS[0],N=q.maxLength+1,H=e=>{n.length<N&&o(t=>t+e)},U=()=>{o(""),W("idle"),R(null),F(!1),C("")},J=()=>(0,d.n4)(n,p),G=async()=>{if((n.startsWith("0")?n.length-1:n.length)<q.minLength)return;const e=J();W("searching");try{const n=await fetch(`/api/customers/phone/${encodeURIComponent(e)}`),l=await n.json();if(l.success&&l.data){var i,o,s,r;const e=l.data,n=null===(i=e.restaurants)||void 0===i?void 0:i.find(e=>e.id===parseInt(t||"0"));R({id:e.id,name:e.name,phone:e.phone,points:(null===n||void 0===n||null===(o=n.RestaurantCustomer)||void 0===o?void 0:o.points)||0,tier:(null===n||void 0===n||null===(s=n.RestaurantCustomer)||void 0===s?void 0:s.loyalty_tier)||"Bronze",totalOrders:(null===n||void 0===n||null===(r=n.RestaurantCustomer)||void 0===r?void 0:r.total_orders)||0}),W("found")}else W("not_found")}catch{W("not_found")}M.current&&M.current.emit("customer-checkin",{phone:e,restaurantId:t})},K=(null===B||void 0===B?void 0:B.currency)||"MYR",Q=B&&B.items.length>0;return I&&P?(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:(0,c.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:_})}),(0,c.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px"},children:[(0,c.jsx)("div",{style:{fontSize:"48px"},children:"\u2713"}),(0,c.jsx)("div",{style:{fontSize:"28px",fontWeight:300,color:"#10B981"},children:e("pos:checkoutDisplayPage.thankYou")}),(0,c.jsxs)("div",{style:{fontSize:"16px",color:"#6B7C93"},children:["Order ",P.orderNumber]}),(0,c.jsx)("div",{style:{fontSize:"24px",fontWeight:700,color:"#0A2540",marginTop:"8px"},children:(0,l.vv)(P.total,P.currency)}),D&&(0,c.jsx)("div",{style:{fontSize:"14px",color:"#635BFF",marginTop:"4px"},children:"\u2b50 Points earned"})]})]}):(0,c.jsxs)(x,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:_||"POS"}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,c.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:Y?"#10B981":"#EF4444",display:"inline-block"}}),(0,c.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:Y?"Connected":"Connecting..."})]})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(g,{children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",marginBottom:"8px",textAlign:"center"},children:"Enter phone number for points"}),(0,c.jsx)("div",{style:{fontSize:"24px",fontWeight:600,color:"#0A2540",textAlign:"center",padding:"10px 0",minHeight:"40px",letterSpacing:"2px"},children:n||"\u2014"}),"found"===E&&D&&(0,c.jsxs)("div",{style:{padding:"14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"10px",marginBottom:"12px",animation:"fadeIn 0.3s"},children:[(0,c.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46"},children:D.name}),(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:e("pos:checkoutDisplayPage.points")}),(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#635BFF"},children:D.points.toLocaleString()})]}),(0,c.jsxs)("div",{style:{textAlign:"center"},children:[(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:e("pos:checkoutDisplayPage.tier")}),(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:D.tier})]}),(0,c.jsxs)("div",{style:{textAlign:"right"},children:[(0,c.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:e("pos:checkoutDisplayPage.orders")}),(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:D.totalOrders})]})]})]}),"searching"===E&&(0,c.jsx)("div",{style:{textAlign:"center",color:"#6B7C93",fontSize:"14px",padding:"12px 0"},children:e("pos:checkoutDisplayPage.checking")}),"not_found"===E&&!S&&(0,c.jsxs)("div",{style:{padding:"12px",background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:"8px",marginBottom:"12px"},children:[(0,c.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#92400E",marginBottom:"8px"},children:e("pos:checkoutDisplayPage.noAccountFound")}),(0,c.jsx)("button",{onClick:()=>F(!0),style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#F59E0B",color:"white",cursor:"pointer"},children:"Register for Points"})]}),S&&(0,c.jsxs)("div",{style:{padding:"12px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",marginBottom:"12px"},children:[(0,c.jsx)("input",{type:"text",placeholder:"Your name",value:k,onChange:e=>C(e.target.value),autoFocus:!0,style:{width:"100%",padding:"10px",border:"1px solid #BAE6FD",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box",marginBottom:"8px"}}),(0,c.jsx)("button",{onClick:async()=>{if(!k.trim())return;A(!0);const e=J();try{const i=await fetch("/api/customers/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:k.trim(),phone:e,restaurantId:t})}),o=await i.json();if(o.success||i.ok){var n;const i={id:(null===(n=o.data)||void 0===n?void 0:n.id)||0,name:k.trim(),phone:e,points:0,tier:"Bronze",totalOrders:0};R(i),W("found"),F(!1),M.current&&M.current.emit("customer-checkin",{phone:e,restaurantId:t})}else alert(o.message||"Registration failed")}catch{}A(!1)},disabled:!k.trim()||z,style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#635BFF",color:"white",cursor:"pointer",opacity:k.trim()?1:.5},children:z?"Registering...":"Complete"})]}),"found"!==E&&"not_found"!==E&&!S&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(y,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,c.jsx)(m,{onClick:()=>H(e),children:e},e)),(0,c.jsx)(m,{onClick:U,style:{fontSize:"13px",color:"#6B7C93"},children:e("pos:checkoutDisplayPage.clear")}),(0,c.jsx)(m,{onClick:()=>H("0"),children:"0"}),(0,c.jsx)(m,{onClick:()=>{o(e=>e.slice(0,-1)),"idle"!==E&&(W("idle"),R(null),F(!1))},style:{fontSize:"16px"},children:"\u232b"})]}),(()=>{const t=(n.startsWith("0")?n.length-1:n.length)>=q.minLength;return(0,c.jsx)("button",{onClick:G,disabled:!t,style:{width:"100%",marginTop:"10px",padding:"14px",fontSize:"15px",fontWeight:600,border:"none",borderRadius:"8px",background:"#635BFF",color:"white",cursor:"pointer",opacity:t?1:.5},children:e("pos:checkoutDisplayPage.done")})})()]}),("idle"!==E||n)&&(0,c.jsx)("button",{onClick:U,style:{marginTop:"12px",padding:"10px",fontSize:"13px",border:"none",borderRadius:"6px",background:"transparent",color:"#635BFF",cursor:"pointer",width:"100%",textDecoration:"underline"},children:"found"===E?"Change Number":"Start Over"})]}),(0,c.jsx)(f,{children:Q?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("h3",{style:{fontSize:"14px",fontWeight:500,color:"#6B7C93",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"},children:e("pos:checkoutDisplayPage.yourOrder")}),(0,c.jsx)("div",{style:{flex:1,overflow:"auto"},children:B.items.map((e,t)=>{var n;return(0,c.jsxs)(v,{children:[(0,c.jsxs)("div",{style:{flex:1},children:[(0,c.jsxs)("div",{style:{fontSize:"15px",fontWeight:500,color:"#0A2540"},children:[e.quantity>1?`${e.quantity}\xd7 `:"",e.name]}),null===(n=e.options)||void 0===n?void 0:n.map((e,t)=>(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"2px"},children:["+ ",e]},t))]}),(0,c.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",whiteSpace:"nowrap",marginLeft:"16px"},children:(0,l.vv)(e.price*e.quantity,K)})]},t)})}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"10px",padding:"14px",marginTop:"12px"},children:[B.subtotal!==B.total&&(0,c.jsxs)(j,{children:[(0,c.jsx)("span",{children:e("pos:checkoutDisplayPage.subtotal")}),(0,c.jsx)("span",{children:(0,l.vv)(B.subtotal,K)})]}),B.tax>0&&(0,c.jsxs)(j,{children:[(0,c.jsxs)("span",{children:["Tax (",B.taxRate,"%)"]}),(0,c.jsx)("span",{children:(0,l.vv)(B.tax,K)})]}),B.serviceCharge>0&&(0,c.jsxs)(j,{children:[(0,c.jsxs)("span",{children:["Service (",B.serviceChargeRate,"%)"]}),(0,c.jsx)("span",{children:(0,l.vv)(B.serviceCharge,K)})]}),B.discount>0&&(0,c.jsxs)(j,{children:[(0,c.jsx)("span",{children:e("pos:checkoutDisplayPage.discount")}),(0,c.jsxs)("span",{style:{color:"#10B981"},children:["-",(0,l.vv)(B.discount,K)]})]}),(0,c.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",margin:"6px 0"}}),(0,c.jsxs)(j,{bold:!0,children:[(0,c.jsx)("span",{children:e("pos:checkoutDisplayPage.total")}),(0,c.jsx)("span",{children:(0,l.vv)(B.total,K)})]})]})]}):(0,c.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#9CA3AF"},children:[(0,c.jsx)("div",{style:{fontSize:"40px",marginBottom:"12px",opacity:.3},children:"\ud83d\uded2"}),(0,c.jsx)("div",{style:{fontSize:"16px"},children:e("pos:checkoutDisplayPage.waitingForOrder")}),(0,c.jsx)("div",{style:{fontSize:"13px",marginTop:"4px"},children:e("pos:checkoutDisplayPage.itemsWillAppearHereAsTheCashierAddsThem")})]})})]})]})}}}]);