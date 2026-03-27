"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4844],{4844:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var i=n(9950),o=n(4752),r=n(4492),s=n(3422),d=n(6038),l=n(2924),a=n(4414);const c=o.i7`from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}`,p=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  user-select: none;
`,x=o.Ay.div`
  background: white;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,h=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,u=o.Ay.div`
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
`,g=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`,y=o.Ay.button`
  padding: 14px;
  font-size: 20px;
  font-weight: 500;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  color: #0A2540;
  cursor: pointer;
  &:active { background: #635BFF; color: white; }
`,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  animation: ${c} 0.2s ease;
  &:last-child { border-bottom: none; }
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: ${e=>e.bold?"18px":"13px"};
  font-weight: ${e=>e.bold?700:400};
  color: ${e=>e.bold?"#0A2540":"#6B7C93"};
`,j=()=>{const{restaurantId:e}=(0,r.g)(),[t,n]=(0,i.useState)(""),[o,c]=(0,i.useState)("MY"),[j,b]=(0,i.useState)(!1),[S,F]=(0,i.useState)(""),[C,z]=(0,i.useState)(!1),[w,B]=(0,i.useState)(null),[k,A]=(0,i.useState)(null),[R,E]=(0,i.useState)("idle"),[W,T]=(0,i.useState)(null),[I,D]=(0,i.useState)(!1),[O,Y]=(0,i.useState)(!1),[$,_]=(0,i.useState)(""),L=(0,i.useRef)(null);(0,i.useEffect)(()=>{e&&fetch(`/api/restaurants/${e}`).then(e=>e.json()).then(e=>{const t=e.data||e;_(t.name||"");const n=t.country||"MY";l.FS.find(e=>e.code===n)&&c(n)}).catch(()=>{})},[e]),(0,i.useEffect)(()=>{if(!e)return;const t=(0,s.io)("/checkout-display",{transports:["websocket","polling"]});return L.current=t,t.on("connect",()=>{t.emit("join-restaurant",e),Y(!0)}),t.on("disconnect",()=>Y(!1)),t.on("cart-update",e=>{B(e),I&&D(!1)}),t.on("checkout-complete",e=>{T(e),D(!0),B(null),setTimeout(()=>{D(!1),T(null),n(""),A(null),E("idle"),b(!1),F("")},5e3)}),()=>{t.disconnect()}},[e]);const P=l.FS.find(e=>e.code===o)||l.FS[0],M=P.maxLength+1,N=e=>{t.length<M&&n(t=>t+e)},q=()=>{n(""),E("idle"),A(null),b(!1),F("")},U=()=>(0,l.n4)(t,o),H=async()=>{if((t.startsWith("0")?t.length-1:t.length)<P.minLength)return;const n=U();E("searching");try{const t=await fetch(`/api/customers/phone/${encodeURIComponent(n)}`),d=await t.json();if(d.success&&d.data){var i,o,r,s;const t=d.data,n=null===(i=t.restaurants)||void 0===i?void 0:i.find(t=>t.id===parseInt(e||"0"));A({id:t.id,name:t.name,phone:t.phone,points:(null===n||void 0===n||null===(o=n.RestaurantCustomer)||void 0===o?void 0:o.points)||0,tier:(null===n||void 0===n||null===(r=n.RestaurantCustomer)||void 0===r?void 0:r.loyalty_tier)||"Bronze",totalOrders:(null===n||void 0===n||null===(s=n.RestaurantCustomer)||void 0===s?void 0:s.total_orders)||0}),E("found")}else E("not_found")}catch{E("not_found")}L.current&&L.current.emit("customer-checkin",{phone:n,restaurantId:e})},J=(null===w||void 0===w?void 0:w.currency)||"MYR",G=w&&w.items.length>0;return I&&W?(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{children:(0,a.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:$})}),(0,a.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px"},children:[(0,a.jsx)("div",{style:{fontSize:"48px"},children:"\u2713"}),(0,a.jsx)("div",{style:{fontSize:"28px",fontWeight:300,color:"#10B981"},children:"Thank You!"}),(0,a.jsxs)("div",{style:{fontSize:"16px",color:"#6B7C93"},children:["Order ",W.orderNumber]}),(0,a.jsx)("div",{style:{fontSize:"24px",fontWeight:700,color:"#0A2540",marginTop:"8px"},children:(0,d.vv)(W.total,W.currency)}),k&&(0,a.jsx)("div",{style:{fontSize:"14px",color:"#635BFF",marginTop:"4px"},children:"\u2b50 Points earned"})]})]}):(0,a.jsxs)(p,{children:[(0,a.jsxs)(x,{children:[(0,a.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:$||"POS"}),(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,a.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:O?"#10B981":"#EF4444",display:"inline-block"}}),(0,a.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:O?"Connected":"Connecting..."})]})]}),(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{children:[(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",marginBottom:"8px",textAlign:"center"},children:"Enter phone number for points"}),(0,a.jsx)("div",{style:{fontSize:"24px",fontWeight:600,color:"#0A2540",textAlign:"center",padding:"10px 0",minHeight:"40px",letterSpacing:"2px"},children:t||"\u2014"}),"found"===R&&k&&(0,a.jsxs)("div",{style:{padding:"14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"10px",marginBottom:"12px",animation:"fadeIn 0.3s"},children:[(0,a.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46"},children:k.name}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Points"}),(0,a.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#635BFF"},children:k.points.toLocaleString()})]}),(0,a.jsxs)("div",{style:{textAlign:"center"},children:[(0,a.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Tier"}),(0,a.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:k.tier})]}),(0,a.jsxs)("div",{style:{textAlign:"right"},children:[(0,a.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Orders"}),(0,a.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:k.totalOrders})]})]})]}),"searching"===R&&(0,a.jsx)("div",{style:{textAlign:"center",color:"#6B7C93",fontSize:"14px",padding:"12px 0"},children:"Checking..."}),"not_found"===R&&!j&&(0,a.jsxs)("div",{style:{padding:"12px",background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:"8px",marginBottom:"12px"},children:[(0,a.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#92400E",marginBottom:"8px"},children:"No account found"}),(0,a.jsx)("button",{onClick:()=>b(!0),style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#F59E0B",color:"white",cursor:"pointer"},children:"Register for Points"})]}),j&&(0,a.jsxs)("div",{style:{padding:"12px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",marginBottom:"12px"},children:[(0,a.jsx)("input",{type:"text",placeholder:"Your name",value:S,onChange:e=>F(e.target.value),autoFocus:!0,style:{width:"100%",padding:"10px",border:"1px solid #BAE6FD",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box",marginBottom:"8px"}}),(0,a.jsx)("button",{onClick:async()=>{if(!S.trim())return;z(!0);const t=U();try{const i=await fetch("/api/customers/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:S.trim(),phone:t,restaurantId:e})}),o=await i.json();if(o.success||i.ok){var n;const i={id:(null===(n=o.data)||void 0===n?void 0:n.id)||0,name:S.trim(),phone:t,points:0,tier:"Bronze",totalOrders:0};A(i),E("found"),b(!1),L.current&&L.current.emit("customer-checkin",{phone:t,restaurantId:e})}else alert(o.message||"Registration failed")}catch{}z(!1)},disabled:!S.trim()||C,style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#635BFF",color:"white",cursor:"pointer",opacity:S.trim()?1:.5},children:C?"Registering...":"Complete"})]}),"found"!==R&&"not_found"!==R&&!j&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(g,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,a.jsx)(y,{onClick:()=>N(e),children:e},e)),(0,a.jsx)(y,{onClick:q,style:{fontSize:"13px",color:"#6B7C93"},children:"Clear"}),(0,a.jsx)(y,{onClick:()=>N("0"),children:"0"}),(0,a.jsx)(y,{onClick:()=>{n(e=>e.slice(0,-1)),"idle"!==R&&(E("idle"),A(null),b(!1))},style:{fontSize:"16px"},children:"\u232b"})]}),(()=>{const e=(t.startsWith("0")?t.length-1:t.length)>=P.minLength;return(0,a.jsx)("button",{onClick:H,disabled:!e,style:{width:"100%",marginTop:"10px",padding:"14px",fontSize:"15px",fontWeight:600,border:"none",borderRadius:"8px",background:"#635BFF",color:"white",cursor:"pointer",opacity:e?1:.5},children:"Done"})})()]}),("idle"!==R||t)&&(0,a.jsx)("button",{onClick:q,style:{marginTop:"12px",padding:"10px",fontSize:"13px",border:"none",borderRadius:"6px",background:"transparent",color:"#635BFF",cursor:"pointer",width:"100%",textDecoration:"underline"},children:"found"===R?"Change Number":"Start Over"})]}),(0,a.jsx)(f,{children:G?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{style:{fontSize:"14px",fontWeight:500,color:"#6B7C93",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Your Order"}),(0,a.jsx)("div",{style:{flex:1,overflow:"auto"},children:w.items.map((e,t)=>{var n;return(0,a.jsxs)(m,{children:[(0,a.jsxs)("div",{style:{flex:1},children:[(0,a.jsxs)("div",{style:{fontSize:"15px",fontWeight:500,color:"#0A2540"},children:[e.quantity>1?`${e.quantity}\xd7 `:"",e.name]}),null===(n=e.options)||void 0===n?void 0:n.map((e,t)=>(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"2px"},children:["+ ",e]},t))]}),(0,a.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",whiteSpace:"nowrap",marginLeft:"16px"},children:(0,d.vv)(e.price*e.quantity,J)})]},t)})}),(0,a.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"10px",padding:"14px",marginTop:"12px"},children:[w.subtotal!==w.total&&(0,a.jsxs)(v,{children:[(0,a.jsx)("span",{children:"Subtotal"}),(0,a.jsx)("span",{children:(0,d.vv)(w.subtotal,J)})]}),w.tax>0&&(0,a.jsxs)(v,{children:[(0,a.jsxs)("span",{children:["Tax (",w.taxRate,"%)"]}),(0,a.jsx)("span",{children:(0,d.vv)(w.tax,J)})]}),w.serviceCharge>0&&(0,a.jsxs)(v,{children:[(0,a.jsxs)("span",{children:["Service (",w.serviceChargeRate,"%)"]}),(0,a.jsx)("span",{children:(0,d.vv)(w.serviceCharge,J)})]}),w.discount>0&&(0,a.jsxs)(v,{children:[(0,a.jsx)("span",{children:"Discount"}),(0,a.jsxs)("span",{style:{color:"#10B981"},children:["-",(0,d.vv)(w.discount,J)]})]}),(0,a.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",margin:"6px 0"}}),(0,a.jsxs)(v,{bold:!0,children:[(0,a.jsx)("span",{children:"Total"}),(0,a.jsx)("span",{children:(0,d.vv)(w.total,J)})]})]})]}):(0,a.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#9CA3AF"},children:[(0,a.jsx)("div",{style:{fontSize:"40px",marginBottom:"12px",opacity:.3},children:"\ud83d\uded2"}),(0,a.jsx)("div",{style:{fontSize:"16px"},children:"Waiting for order..."}),(0,a.jsx)("div",{style:{fontSize:"13px",marginTop:"4px"},children:"Items will appear here as the cashier adds them"})]})})]})]})}}}]);