"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4844],{4844:(e,n,t)=>{t.r(n),t.d(n,{default:()=>M});var i=t(9950),r=t(4752),o=t(4492),s=t(3422),c=t(6038),l=t(4414);const a=r.Ay.div`
  min-height: 100vh;
  background: #0A0A0A;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
`,d=r.i7`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,p=(r.i7`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`,r.Ay.div`
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1A1A2E;
`),x=r.Ay.h1`
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin: 0;
`,u=r.Ay.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${e=>e.connected?"#10B981":"#EF4444"};
  display: inline-block;
  margin-right: 8px;
`,h=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 40px;
`,f=r.Ay.h2`
  font-size: 36px;
  font-weight: 300;
  color: #E5E7EB;
  margin: 0;
`,g=r.Ay.div`
  padding: 20px 32px;
  background: #1A1A2E;
  border: 1px solid #2D2D44;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    background: #252540;
    border-color: #635BFF;
  }
`,y=r.Ay.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`,m=r.Ay.div`
  background: #1A1A2E;
  border-radius: 16px;
  padding: 32px;
  width: 340px;
`,v=r.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  padding: 16px;
  margin-bottom: 20px;
  min-height: 50px;
  letter-spacing: 2px;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`,A=r.Ay.button`
  padding: 16px;
  font-size: 24px;
  font-weight: 500;
  background: #252540;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background 0.15s;
  &:hover { background: #353555; }
  &:active { background: #635BFF; }
`,b=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`,k=r.Ay.button`
  flex: 1;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background: ${e=>"primary"===e.variant?"#635BFF":"#252540"};
  color: #fff;
  &:hover { opacity: 0.9; }
`,w=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32px 32px;
  animation: ${d} 0.3s ease;
`,C=r.Ay.h2`
  font-size: 18px;
  font-weight: 500;
  color: #9CA3AF;
  margin: 24px 0 16px;
`,z=r.Ay.div`
  flex: 1;
  overflow-y: auto;
`,E=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #1A1A2E;
  animation: ${d} 0.3s ease;
`,B=r.Ay.div`
  flex: 1;
`,S=r.Ay.div`
  font-size: 16px;
  font-weight: 500;
  color: #E5E7EB;
`,F=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,$=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  margin-left: 16px;
`,T=r.Ay.div`
  border-top: 1px solid #2D2D44;
  margin: 16px 0;
`,D=r.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: ${e=>e.bold?"22px":"15px"};
  font-weight: ${e=>e.bold?700:400};
  color: ${e=>e.bold?"#fff":"#9CA3AF"};
`,R=r.Ay.div`
  padding: 10px 0;
  text-align: center;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  &:hover { color: #635BFF; }
`,I=r.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  animation: ${d} 0.5s ease;
`,Y=r.Ay.h2`
  font-size: 42px;
  font-weight: 300;
  color: #10B981;
  margin: 0;
`,q=r.Ay.div`
  font-size: 20px;
  color: #9CA3AF;
`,O=r.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-top: 8px;
`,M=()=>{const{restaurantId:e}=(0,o.g)(),[n,t]=(0,i.useState)("welcome"),[r,d]=(0,i.useState)(!1),[M,N]=(0,i.useState)(""),[P,U]=(0,i.useState)(null),[W,G]=(0,i.useState)(null),[H,J]=(0,i.useState)(!1),[K,L]=(0,i.useState)(""),Q=(0,i.useRef)(null),V=(0,i.useRef)(null);(0,i.useEffect)(()=>{e&&fetch(`/api/restaurants/${e}`).then(e=>e.json()).then(e=>{var n;return L(e.name||(null===(n=e.data)||void 0===n?void 0:n.name)||"")}).catch(()=>{})},[e]),(0,i.useEffect)(()=>{if(!e)return;const n=(0,s.io)("/checkout-display",{transports:["websocket","polling"]});return Q.current=n,n.on("connect",()=>{n.emit("join-restaurant",e),J(!0)}),n.on("disconnect",()=>J(!1)),n.on("cart-update",e=>{U(e),e.items.length>0?(t("order"),d(!1)):t("welcome")}),n.on("checkout-complete",e=>{G(e),t("thankyou"),U(null),V.current&&clearTimeout(V.current),V.current=setTimeout(()=>{t("welcome"),G(null),N("")},5e3)}),()=>{n.disconnect(),V.current&&clearTimeout(V.current)}},[e]);const X=e=>{M.length<15&&N(n=>n+e)},Z=(null===P||void 0===P?void 0:P.currency)||"MYR";return(0,l.jsxs)(a,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:K||"POS"}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",display:"flex",alignItems:"center"},children:[(0,l.jsx)(u,{connected:H}),H?"Connected":"Connecting..."]})]}),"welcome"===n&&(0,l.jsxs)(h,{children:[(0,l.jsx)(f,{children:"Welcome"}),(0,l.jsxs)(g,{onClick:()=>d(!0),children:[(0,l.jsx)("div",{style:{fontSize:"16px",color:"#E5E7EB",marginBottom:"6px"},children:"Enter your phone number"}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Earn points & view your order history"})]})]}),"order"===n&&P&&(0,l.jsxs)(w,{children:[(0,l.jsx)(C,{children:"Your Order"}),(0,l.jsx)(z,{children:P.items.map((e,n)=>{var t;return(0,l.jsxs)(E,{children:[(0,l.jsxs)(B,{children:[(0,l.jsxs)(S,{children:[e.quantity>1?`${e.quantity}x `:"",e.name]}),null===(t=e.options)||void 0===t?void 0:t.map((e,n)=>(0,l.jsxs)(F,{children:["\u2605 ",e]},n))]}),(0,l.jsx)($,{children:(0,c.vv)(e.price*e.quantity,Z)})]},n)})}),(0,l.jsx)(T,{}),P.subtotal!==P.total&&(0,l.jsxs)(D,{children:[(0,l.jsx)("span",{children:"Subtotal"}),(0,l.jsx)("span",{children:(0,c.vv)(P.subtotal,Z)})]}),P.tax>0&&(0,l.jsxs)(D,{children:[(0,l.jsxs)("span",{children:["Tax (",P.taxRate,"%)"]}),(0,l.jsx)("span",{children:(0,c.vv)(P.tax,Z)})]}),P.serviceCharge>0&&(0,l.jsxs)(D,{children:[(0,l.jsxs)("span",{children:["Service Charge (",P.serviceChargeRate,"%)"]}),(0,l.jsx)("span",{children:(0,c.vv)(P.serviceCharge,Z)})]}),P.discount>0&&(0,l.jsxs)(D,{children:[(0,l.jsx)("span",{children:"Discount"}),(0,l.jsxs)("span",{style:{color:"#10B981"},children:["-",(0,c.vv)(P.discount,Z)]})]}),(0,l.jsx)(T,{}),(0,l.jsxs)(D,{bold:!0,children:[(0,l.jsx)("span",{children:"Total"}),(0,l.jsx)("span",{children:(0,c.vv)(P.total,Z)})]}),!M&&(0,l.jsx)(R,{onClick:()=>d(!0),children:"\ud83d\udcf1 Tap to enter phone number for points"})]}),"thankyou"===n&&W&&(0,l.jsxs)(I,{children:[(0,l.jsx)(Y,{children:"Thank You!"}),(0,l.jsxs)(q,{children:["Order ",W.orderNumber]}),(0,l.jsx)(O,{children:(0,c.vv)(W.total,W.currency)})]}),r&&(0,l.jsx)(y,{onClick:e=>{e.target===e.currentTarget&&d(!1)},children:(0,l.jsxs)(m,{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF",textAlign:"center",marginBottom:"8px"},children:"Enter your phone number"}),(0,l.jsx)(v,{children:M||"\u2014"}),(0,l.jsxs)(j,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,l.jsx)(A,{onClick:()=>X(e),children:e},e)),(0,l.jsx)(A,{onClick:()=>{N(e=>e.slice(0,-1))},children:"\u2190"}),(0,l.jsx)(A,{onClick:()=>X("0"),children:"0"}),(0,l.jsx)(A,{onClick:()=>X("+"),children:"+"})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(k,{variant:"secondary",onClick:()=>d(!1),children:"Skip"}),(0,l.jsx)(k,{variant:"primary",onClick:()=>{M.length>=8&&Q.current&&(Q.current.emit("customer-checkin",{phone:M,restaurantId:e}),d(!1))},style:{opacity:M.length<8?.5:1},children:"Done"})]})]})})]})}}}]);