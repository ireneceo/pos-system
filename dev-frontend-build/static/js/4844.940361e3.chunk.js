"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4844],{4844:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var i=n(9950),o=n(4752),r=n(4492),s=n(3422),d=n(6038),l=n(4414);const a=o.i7`from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}`,c=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  user-select: none;
`,p=o.Ay.div`
  background: white;
  padding: 14px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,x=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,h=o.Ay.div`
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
`,u=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px;
  overflow-y: auto;
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`,g=o.Ay.button`
  padding: 14px;
  font-size: 20px;
  font-weight: 500;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  color: #0A2540;
  cursor: pointer;
  &:active { background: #635BFF; color: white; }
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  animation: ${a} 0.2s ease;
  &:last-child { border-bottom: none; }
`,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: ${e=>e.bold?"18px":"13px"};
  font-weight: ${e=>e.bold?700:400};
  color: ${e=>e.bold?"#0A2540":"#6B7C93"};
`,v=()=>{const{restaurantId:e}=(0,r.g)(),[t,n]=(0,i.useState)(""),[o,a]=(0,i.useState)(!1),[v,j]=(0,i.useState)(""),[b,S]=(0,i.useState)(!1),[F,C]=(0,i.useState)(null),[k,z]=(0,i.useState)(null),[B,w]=(0,i.useState)("idle"),[A,R]=(0,i.useState)(null),[E,T]=(0,i.useState)(!1),[W,I]=(0,i.useState)(!1),[D,O]=(0,i.useState)(""),$=(0,i.useRef)(null);(0,i.useEffect)(()=>{e&&fetch(`/api/restaurants/${e}`).then(e=>e.json()).then(e=>{var t;return O(e.name||(null===(t=e.data)||void 0===t?void 0:t.name)||"")}).catch(()=>{})},[e]),(0,i.useEffect)(()=>{if(!e)return;const t=(0,s.io)("/checkout-display",{transports:["websocket","polling"]});return $.current=t,t.on("connect",()=>{t.emit("join-restaurant",e),I(!0)}),t.on("disconnect",()=>I(!1)),t.on("cart-update",e=>{C(e),E&&T(!1)}),t.on("checkout-complete",e=>{R(e),T(!0),C(null),setTimeout(()=>{T(!1),R(null),n(""),z(null),w("idle"),a(!1),j("")},5e3)}),()=>{t.disconnect()}},[e]);const Y=e=>{t.length<15&&n(t=>t+e)},_=()=>{n(""),w("idle"),z(null),a(!1),j("")},P=(null===F||void 0===F?void 0:F.currency)||"MYR",N=F&&F.items.length>0;return E&&A?(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:D})}),(0,l.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"48px"},children:"\u2713"}),(0,l.jsx)("div",{style:{fontSize:"28px",fontWeight:300,color:"#10B981"},children:"Thank You!"}),(0,l.jsxs)("div",{style:{fontSize:"16px",color:"#6B7C93"},children:["Order ",A.orderNumber]}),(0,l.jsx)("div",{style:{fontSize:"24px",fontWeight:700,color:"#0A2540",marginTop:"8px"},children:(0,d.vv)(A.total,A.currency)}),k&&(0,l.jsx)("div",{style:{fontSize:"14px",color:"#635BFF",marginTop:"4px"},children:"\u2b50 Points earned"})]})]}):(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)("h1",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",margin:0},children:D||"POS"}),(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[(0,l.jsx)("span",{style:{width:6,height:6,borderRadius:"50%",background:W?"#10B981":"#EF4444",display:"inline-block"}}),(0,l.jsx)("span",{style:{fontSize:"11px",color:"#9CA3AF"},children:W?"Connected":"Connecting..."})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",marginBottom:"8px",textAlign:"center"},children:"Enter phone number for points"}),(0,l.jsx)("div",{style:{fontSize:"24px",fontWeight:600,color:"#0A2540",textAlign:"center",padding:"10px 0",minHeight:"40px",letterSpacing:"2px"},children:t||"\u2014"}),"found"===B&&k&&(0,l.jsxs)("div",{style:{padding:"14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"10px",marginBottom:"12px",animation:"fadeIn 0.3s"},children:[(0,l.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#065F46"},children:k.name}),(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Points"}),(0,l.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#635BFF"},children:k.points.toLocaleString()})]}),(0,l.jsxs)("div",{style:{textAlign:"center"},children:[(0,l.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Tier"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:k.tier})]}),(0,l.jsxs)("div",{style:{textAlign:"right"},children:[(0,l.jsx)("div",{style:{fontSize:"11px",color:"#6B7C93"},children:"Orders"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540"},children:k.totalOrders})]})]})]}),"searching"===B&&(0,l.jsx)("div",{style:{textAlign:"center",color:"#6B7C93",fontSize:"14px",padding:"12px 0"},children:"Checking..."}),"not_found"===B&&!o&&(0,l.jsxs)("div",{style:{padding:"12px",background:"#FEF3C7",border:"1px solid #FDE68A",borderRadius:"8px",marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"13px",fontWeight:500,color:"#92400E",marginBottom:"8px"},children:"No account found"}),(0,l.jsx)("button",{onClick:()=>a(!0),style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#F59E0B",color:"white",cursor:"pointer"},children:"Register for Points"})]}),o&&(0,l.jsxs)("div",{style:{padding:"12px",background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",marginBottom:"12px"},children:[(0,l.jsx)("input",{type:"text",placeholder:"Your name",value:v,onChange:e=>j(e.target.value),autoFocus:!0,style:{width:"100%",padding:"10px",border:"1px solid #BAE6FD",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box",marginBottom:"8px"}}),(0,l.jsx)("button",{onClick:async()=>{if(v.trim()){S(!0);try{const i=await fetch("/api/customers/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:v.trim(),phone:t,restaurantId:e})}),o=await i.json();if(o.success||i.ok){var n;const i={id:(null===(n=o.data)||void 0===n?void 0:n.id)||0,name:v.trim(),phone:t,points:0,tier:"Bronze",totalOrders:0};z(i),w("found"),a(!1),$.current&&$.current.emit("customer-checkin",{phone:t,restaurantId:e})}else alert(o.message||"Registration failed")}catch{}S(!1)}},disabled:!v.trim()||b,style:{padding:"10px",fontSize:"13px",fontWeight:600,width:"100%",border:"none",borderRadius:"6px",background:"#635BFF",color:"white",cursor:"pointer",opacity:v.trim()?1:.5},children:b?"Registering...":"Complete"})]}),"found"!==B&&"not_found"!==B&&!o&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(f,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,l.jsx)(g,{onClick:()=>Y(e),children:e},e)),(0,l.jsx)(g,{onClick:()=>Y("+"),children:"+"}),(0,l.jsx)(g,{onClick:()=>Y("0"),children:"0"}),(0,l.jsx)(g,{onClick:()=>{n(e=>e.slice(0,-1)),"idle"!==B&&(w("idle"),z(null),a(!1))},style:{fontSize:"16px"},children:"\u232b"})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:"6px",marginTop:"10px"},children:[(0,l.jsx)("button",{onClick:_,style:{flex:1,padding:"12px",fontSize:"13px",border:"1px solid #E6EBF1",borderRadius:"6px",background:"white",color:"#6B7C93",cursor:"pointer"},children:"Clear"}),(0,l.jsx)("button",{onClick:async()=>{if(!(t.length<8)){w("searching");try{const s=await fetch(`/api/customers/phone/${encodeURIComponent(t)}`),d=await s.json();if(d.success&&d.data){var n,i,o,r;const t=d.data,s=null===(n=t.restaurants)||void 0===n?void 0:n.find(t=>t.id===parseInt(e||"0"));z({id:t.id,name:t.name,phone:t.phone,points:(null===s||void 0===s||null===(i=s.RestaurantCustomer)||void 0===i?void 0:i.points)||0,tier:(null===s||void 0===s||null===(o=s.RestaurantCustomer)||void 0===o?void 0:o.loyalty_tier)||"Bronze",totalOrders:(null===s||void 0===s||null===(r=s.RestaurantCustomer)||void 0===r?void 0:r.total_orders)||0}),w("found")}else w("not_found")}catch{w("not_found")}$.current&&$.current.emit("customer-checkin",{phone:t,restaurantId:e})}},disabled:t.length<8,style:{flex:1,padding:"12px",fontSize:"13px",fontWeight:600,border:"none",borderRadius:"6px",background:"#635BFF",color:"white",cursor:"pointer",opacity:t.length<8?.5:1},children:"Done"})]})]}),("idle"!==B||t)&&(0,l.jsx)("button",{onClick:_,style:{marginTop:"12px",padding:"10px",fontSize:"13px",border:"none",borderRadius:"6px",background:"transparent",color:"#635BFF",cursor:"pointer",width:"100%",textDecoration:"underline"},children:"found"===B?"Change Number":"Start Over"})]}),(0,l.jsx)(u,{children:N?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("h3",{style:{fontSize:"14px",fontWeight:500,color:"#6B7C93",margin:"0 0 12px",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Your Order"}),(0,l.jsx)("div",{style:{flex:1,overflow:"auto"},children:F.items.map((e,t)=>{var n;return(0,l.jsxs)(y,{children:[(0,l.jsxs)("div",{style:{flex:1},children:[(0,l.jsxs)("div",{style:{fontSize:"15px",fontWeight:500,color:"#0A2540"},children:[e.quantity>1?`${e.quantity}\xd7 `:"",e.name]}),null===(n=e.options)||void 0===n?void 0:n.map((e,t)=>(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"2px"},children:["+ ",e]},t))]}),(0,l.jsx)("div",{style:{fontSize:"15px",fontWeight:600,color:"#0A2540",whiteSpace:"nowrap",marginLeft:"16px"},children:(0,d.vv)(e.price*e.quantity,P)})]},t)})}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"10px",padding:"14px",marginTop:"12px"},children:[F.subtotal!==F.total&&(0,l.jsxs)(m,{children:[(0,l.jsx)("span",{children:"Subtotal"}),(0,l.jsx)("span",{children:(0,d.vv)(F.subtotal,P)})]}),F.tax>0&&(0,l.jsxs)(m,{children:[(0,l.jsxs)("span",{children:["Tax (",F.taxRate,"%)"]}),(0,l.jsx)("span",{children:(0,d.vv)(F.tax,P)})]}),F.serviceCharge>0&&(0,l.jsxs)(m,{children:[(0,l.jsxs)("span",{children:["Service (",F.serviceChargeRate,"%)"]}),(0,l.jsx)("span",{children:(0,d.vv)(F.serviceCharge,P)})]}),F.discount>0&&(0,l.jsxs)(m,{children:[(0,l.jsx)("span",{children:"Discount"}),(0,l.jsxs)("span",{style:{color:"#10B981"},children:["-",(0,d.vv)(F.discount,P)]})]}),(0,l.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",margin:"6px 0"}}),(0,l.jsxs)(m,{bold:!0,children:[(0,l.jsx)("span",{children:"Total"}),(0,l.jsx)("span",{children:(0,d.vv)(F.total,P)})]})]})]}):(0,l.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"#9CA3AF"},children:[(0,l.jsx)("div",{style:{fontSize:"40px",marginBottom:"12px",opacity:.3},children:"\ud83d\uded2"}),(0,l.jsx)("div",{style:{fontSize:"16px"},children:"Waiting for order..."}),(0,l.jsx)("div",{style:{fontSize:"13px",marginTop:"4px"},children:"Items will appear here as the cashier adds them"})]})})]})]})}}}]);