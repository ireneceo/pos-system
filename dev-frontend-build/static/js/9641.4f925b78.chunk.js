"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9641],{8285:(e,t,n)=>{n.d(t,{MA:()=>m,_M:()=>x});const i="cash",o="card",r="ewallet",s="bank_transfer",a="qr",l="counter",d="online",c="fpx",u="staffMeal",p={[i]:"Cash",[o]:"Credit/Debit Card",[r]:"E-Wallet",[s]:"Bank Transfer",[a]:"QR Payment",[l]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[u]:"Staff Meal"};function x(e,t){if(t){const n=t[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||t[e];if(null!==n&&void 0!==n&&n.label)return n.label}return p[e]||e}const h={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function m(e,t,n){if(!e)return"N/A";if("card"===e&&t){return`${x("card",n)}(${h[t]||t})`}return x(e,n)}},9641:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_t});var i=n(9950),o=n(4752),r=n(3422),s=n(4492),a=n(2966),l=n(9189),d=n(9610),c=n(2159),u=n(9018),p=n(5863),x=n(8406),h=n(6038),m=n(8285),g=n(5030),v=n(4414);const b=o.DU`
  @media print {
    /* Reset body for print */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    /* Hide all elements by default */
    body > * {
      display: none !important;
    }

    /* Show only the print content */
    #order-complete-bill-print {
      display: block !important;
      position: static !important;
      left: 0 !important;
      top: 0 !important;
      visibility: visible !important;
    }

    #order-complete-bill-print * {
      visibility: visible !important;
    }

    /* Ensure proper page settings */
    @page {
      size: 80mm auto;
      margin: 0;
    }
  }
`,y=o.Ay.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`,f=o.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,F=o.Ay.span`
  color: #6B7280;
`,w=o.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,k=o.Ay.div`
  margin-bottom: 20px;
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,A=o.Ay.div`
  flex: 1;
`,S=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,B=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,E=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,N=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,I=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,_=o.Ay.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;
  z-index: -1;

  @media print {
    position: static !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 9999 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`,z=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,P=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,T=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,$=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,O=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,D=o.Ay.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
  font-weight: 500;

  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }

  &:active {
    transform: scale(0.98);
  }
`,R=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:l,onPrintBill:R}=e;const{t:M}=(0,g.Bd)("common"),{getStoreInfo:q,operationSettings:L,paymentSettings:U}=(0,u.Pj)(),W=q(),Y=e=>(0,x.r6)(e,L),G=async()=>{await(0,p.pG)(l,W)&&setTimeout(()=>{R()},100)},V=async()=>{await(0,p.Si)(l,W)},H=(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(d.yl,{variant:"secondary",onClick:G,children:"Print Bill"}),(0,v.jsx)(d.yl,{variant:"secondary",onClick:V,children:"Print Order Ticket"}),(0,v.jsx)(d.yl,{variant:"primary",onClick:a,children:"Close"})]}),J=(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(D,{onClick:G,title:"Print Bill",children:[(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,v.jsx)("span",{children:"Bill"})]}),(0,v.jsxs)(D,{onClick:V,title:"Print Order Ticket",children:[(0,v.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,v.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,v.jsx)("span",{children:"Ticket"})]})]});return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(b,{}),(0,v.jsxs)(d.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:H,headerActions:J,children:[(0,v.jsxs)("div",{style:{textAlign:"center"},children:[(0,v.jsxs)(y,{children:["Order ",l.orderNumber]}),l.pagerNumber?(0,v.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,v.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,v.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pagerNumber})]}):(0,v.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,v.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,v.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pickupNumber||(null!==(t=l.orderNumber)&&void 0!==t&&t.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"})]})]}),(0,v.jsxs)(f,{children:[(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Date & Time"}),(0,v.jsx)(w,{children:Y(l.date)})]}),l.cashierName&&(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Cashier"}),(0,v.jsx)(w,{children:l.cashierName})]}),(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Payment Method"}),(0,v.jsx)(w,{children:(0,m.MA)(l.paymentMethod,l.cardType,U||void 0)})]}),"cash"===l.paymentMethod&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Amount Received"}),(0,v.jsx)(w,{children:(0,h.vv)(l.amountReceived,L.currency)})]}),(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Change"}),(0,v.jsx)(w,{children:(0,h.vv)(l.change,L.currency)})]})]})]}),(0,v.jsxs)(c.wn,{children:[(0,v.jsx)(I,{children:"Order Items"}),(0,v.jsx)(k,{children:l.items.map((e,t)=>(0,v.jsxs)(C,{children:[(0,v.jsxs)(A,{children:[(0,v.jsx)(S,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,v.jsx)(B,{children:e.options.join(", ")})]}),(0,v.jsxs)(E,{children:[e.quantity,"x"]}),(0,v.jsx)(N,{children:(0,h.vv)(e.menuItem.price*e.quantity,L.currency)})]},t))})]}),(0,v.jsxs)(c.wn,{children:[(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Subtotal"}),(0,v.jsx)(w,{children:(0,h.vv)(l.subtotal,L.currency)})]}),Number(l.takeawayCharge)>0&&(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Takeaway Charge"}),(0,v.jsx)(w,{children:(0,h.vv)(Number(l.takeawayCharge),L.currency)})]}),Number(l.discount)>0&&(0,v.jsxs)(j,{children:[(0,v.jsx)(F,{children:"Discount"}),(0,v.jsx)(w,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discount),L.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,v.jsxs)(j,{children:[(0,v.jsxs)(F,{children:["Discount (",l.discountPolicy.name,")"]}),(0,v.jsx)(w,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discountPolicy.amount),L.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,v.jsxs)(j,{children:[(0,v.jsxs)(F,{children:["Coupon (",l.coupon.code,")"]}),(0,v.jsx)(w,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.coupon.discount),L.currency)})]}),Number(l.pointDiscount)>0&&(0,v.jsxs)(j,{children:[(0,v.jsxs)(F,{children:["Points (",null===(n=l.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,v.jsx)(w,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.pointDiscount),L.currency)})]}),Number(l.serviceCharge)>0&&(0,v.jsxs)(j,{children:[(0,v.jsxs)(F,{children:["Service Charge (",l.serviceChargeRate||10,"%)"]}),(0,v.jsx)(w,{children:(0,h.vv)(Number(l.serviceCharge),L.currency)})]}),Number(l.tax)>0&&(0,v.jsxs)(j,{children:[(0,v.jsxs)(F,{children:["Tax (",l.taxRate||6,"%)"]}),(0,v.jsx)(w,{children:(0,h.vv)(Number(l.tax),L.currency)})]})]}),(0,v.jsxs)(c.i_,{style:{marginTop:0},children:[(0,v.jsx)(c.nJ,{children:"Total"}),(0,v.jsx)(c.aX,{children:(0,h.vv)(l.total,L.currency)})]})]}),(0,v.jsxs)(_,{id:"order-complete-bill-print",children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(P,{children:W.name}),(0,v.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[W.address,(0,v.jsx)("br",{}),"Tel: ",W.phone,(W.businessRegistration||W.gstRegNo)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("br",{}),W.businessRegistration&&(0,v.jsxs)(v.Fragment,{children:["Reg No: ",W.businessRegistration]}),W.businessRegistration&&W.gstRegNo&&" | ",W.gstRegNo&&(0,v.jsxs)(v.Fragment,{children:["Tax No: ",W.gstRegNo]})]})]})]}),(0,v.jsxs)(T,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,v.jsxs)($,{children:[(0,v.jsx)("strong",{children:"Order No:"}),(0,v.jsx)("span",{children:l.orderNumber})]}),(0,v.jsxs)($,{children:[(0,v.jsx)("strong",{children:"Date:"}),(0,v.jsx)("span",{children:Y(l.date)})]}),(0,v.jsxs)($,{children:[(0,v.jsx)("strong",{children:"Cashier:"}),(0,v.jsx)("span",{children:l.cashierName||"POS Terminal"})]}),(0,v.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",l.pickupNumber||(null!==(o=l.orderNumber)&&void 0!==o&&o.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"]}),l.pagerNumber&&(0,v.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",l.pagerNumber]})]}),(0,v.jsx)(T,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,v.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,v.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,v.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,v.jsx)("tbody",{children:l.items.map((e,t)=>(0,v.jsx)(i.Fragment,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,v.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,v.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,v.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,v.jsxs)(T,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,h.vv)(l.subtotal,L.currency)})]}),Number(l.takeawayCharge)>0&&(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Takeaway Charge:"}),(0,v.jsx)("span",{children:(0,h.vv)(Number(l.takeawayCharge),L.currency)})]}),Number(l.discount)>0&&(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Discount:"}),(0,v.jsx)("span",{children:(0,h.vv)(-Number(l.discount),L.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Discount (",l.discountPolicy.name,"):"]}),(0,v.jsx)("span",{children:(0,h.vv)(-Number(l.discountPolicy.amount),L.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Coupon (",l.coupon.code,"):"]}),(0,v.jsx)("span",{children:(0,h.vv)(-Number(l.coupon.discount),L.currency)})]}),Number(l.pointDiscount)>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Points (",null===(r=l.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,v.jsx)("span",{children:(0,h.vv)(-Number(l.pointDiscount),L.currency)})]}),Number(l.serviceCharge)>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Service Charge (",l.serviceChargeRate||10,"%):"]}),(0,v.jsx)("span",{children:(0,h.vv)(Number(l.serviceCharge),L.currency)})]}),Number(l.tax)>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Tax (",l.taxRate||6,"%):"]}),(0,v.jsx)("span",{children:(0,h.vv)(Number(l.tax),L.currency)})]}),(0,v.jsxs)($,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,v.jsx)("span",{children:"TOTAL:"}),(0,v.jsx)("span",{children:(0,h.vv)(l.total,L.currency)})]})]}),(0,v.jsxs)(T,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Payment Method:"}),(0,v.jsx)("span",{children:(0,m.MA)(l.paymentMethod,l.cardType,U||void 0).toUpperCase()})]}),"cash"===l.paymentMethod&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Amount Received:"}),(0,v.jsx)("span",{children:(0,h.vv)(l.amountReceived,L.currency)})]}),(0,v.jsxs)($,{children:[(0,v.jsx)("span",{children:"Change:"}),(0,v.jsx)("span",{children:(0,h.vv)(l.change,L.currency)})]})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,v.jsx)("div",{children:"Thank you for your purchase!"}),(0,v.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},M=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`,q=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,L=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`,U=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  margin: 0 0 24px;
`,W=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`,Y=o.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${e=>e.error?"#DC2626":e.filled?"#635BFF":"#E6EBF1"};
  background: ${e=>e.error?"#DC2626":e.filled?"#635BFF":"transparent"};
  transition: all 0.15s;
`,G=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`,V=o.Ay.button`
  height: 56px;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  font-size: ${e=>"action"===e.variant?"14px":"22px"};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>"action"===e.variant?"#F8FAFC":"white"};
  color: ${e=>"action"===e.variant?"#6B7C93":"#0A2540"};

  &:hover {
    background: ${e=>"action"===e.variant?"#F0F4FF":"#F8FAFC"};
    border-color: #635BFF;
  }

  &:active {
    transform: scale(0.96);
    background: #F0F4FF;
  }
`,H=o.Ay.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,J=o.Ay.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF2F2;
    border-color: #DC2626;
  }
`,Q=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`,K=e=>{let{show:t,onClose:n,onVerified:o,onLogout:r,currentCashierName:s}=e;const[a,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(""),[u,p]=(0,i.useState)(!1);(0,i.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,i.useCallback)(async e=>{p(!0),c("");try{const t=localStorage.getItem("auth_token"),n=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),i=await n.json();i.success&&i.token&&i.user?o({data:i.data,token:i.token,user:i.user}):i.success?o({data:i.data,token:"",user:i.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{p(!1)}},[o]),h=(0,i.useCallback)(e=>{if(u)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,u,x]);return(0,i.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?h(e.key):"Backspace"===e.key?h("backspace"):"Escape"===e.key&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,h,n]),t?(0,v.jsx)(M,{show:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,v.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,v.jsx)(L,{children:"Switch Cashier"}),(0,v.jsx)(U,{children:"Enter 4-digit PIN to switch"}),s&&(0,v.jsxs)(Q,{children:["Current: ",s]}),(0,v.jsx)(W,{children:[0,1,2,3].map(e=>(0,v.jsx)(Y,{filled:a.length>e,error:!!d},e))}),(0,v.jsx)(H,{children:d}),(0,v.jsxs)(G,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,v.jsx)(V,{onClick:()=>h(e),children:e},e)),(0,v.jsx)(V,{variant:"action",onClick:()=>h("backspace"),children:"\u232b"}),(0,v.jsx)(V,{onClick:()=>h("0"),children:"0"}),(0,v.jsx)(V,{variant:"action",onClick:n,children:"Close"})]}),r&&(0,v.jsx)(J,{onClick:r,children:"Logout"})]})}):null};var X=n(1472),Z=n(4334),ee=n(2538),te=n(447),ne=n(8930),ie=n(9037),oe=n(5781),re=n(1367),se=n(2420);const ae=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,le=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,de=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`,ce=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,ue=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,pe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: ${e=>e.clickable?"pointer":"default"};
  padding: ${e=>e.clickable?"8px 12px":"0"};
  border-radius: ${e=>e.clickable?"8px":"0"};
  transition: all 0.2s;
  color: #6B7C93;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"transparent"};
    color: ${e=>e.clickable?"#0A2540":"#6B7C93"};
  }
`,xe=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 768px) {
    min-width: auto;
    text-align: left;
    font-size: 13px;
  }
`,he=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,me=o.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,ge=o.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,ve=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,be=o.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #8898AA;
  }
`,ye=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,fe=o.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }
`,je=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`,Fe=o.Ay.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`,we=o.Ay.button`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};

  &:hover {
    color: #635BFF;
  }

  ${e=>e.active&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      height: 2px;\n      background: #635BFF;\n    }\n  "}
`,ke=o.Ay.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  overflow-y: auto;
  align-content: start;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`,Ce=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  position: relative;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${e=>e.soldOut&&"\n    opacity: 0.5;\n    cursor: not-allowed;\n    \n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 8px;\n      border-radius: 4px;\n      font-size: 11px;\n      font-weight: 600;\n    }\n  "}
`,Ae=o.Ay.div`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${e=>e.hasImage?"0":"36px"};
  color: #C7D2FE;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Se=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,Be=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Ee=o.Ay.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`,Ne=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,Ie=o.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,_e=o.Ay.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,ze=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,Pe=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Te=o.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,$e=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 160px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Oe=o.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 2px;
  }
`,De=o.Ay.div`
  padding: 16px 24px;
`,Re=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Me=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,qe=o.Ay.div`
  flex: 1;
`,Le=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Ue=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,We=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Ye=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ge=o.Ay.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
  
  &:active {
    background: #F0F4FF;
  }
`,Ve=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,He=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Je=o.Ay.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;
  
  &:hover {
    background: #FFE6E6;
  }
`,Qe=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Ke=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Xe=o.Ay.span`
  color: #6B7C93;
`,Ze=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,et=(0,o.Ay)(Ke)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${Xe} {
    color: #0A2540;
  }
  
  ${Ze} {
    color: #635BFF;
  }
`,tt=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,nt=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,it=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,ot=o.Ay.div`
  font-size: 14px;
`,rt=o.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`,st=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,at=o.Ay.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
  
  &::placeholder {
    color: #8898AA;
  }
`,lt=o.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  
  &:hover {
    background: #5243E0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,dt=o.Ay.div`
  display: flex;
  gap: 8px;
`,ct=o.Ay.button`
  padding: 8px 12px;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${e=>e.active?"#635BFF":"#D1D5DB"};
    background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,ut=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,pt=o.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,xt=o.Ay.button`
  flex: 1;
  padding: 12px 16px;
  min-height: 44px;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;

  &:hover {
    border-color: ${e=>e.active?"#635BFF":"#D1D5DB"};
    background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }

  span {
    font-size: 18px;
  }
`,ht=o.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,mt=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,gt=o.Ay.div`
  position: relative;
`,vt=o.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`,bt=o.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,yt=o.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
  margin-top: 4px;
`,ft=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,jt=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,Ft=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,wt=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,kt=o.Ay.div`
  flex: 1;
`,Ct=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`,At=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,St=o.Ay.div`
  position: relative;
  width: 140px;
`,Bt=o.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`,Et=o.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
  margin-top: 4px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F3F5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`,Nt=o.Ay.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #0A2540;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,It=o.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #E6F0FF;
  }
`,_t=()=>{const{t:e}=(0,g.Bd)("pos"),t=(0,s.Zp)(),[n]=(0,s.ok)(),o=n.get("from")||"",d="floor-plan"===o||"floor-plan-overlay"===o,c="floor-plan-overlay"===o,x=n.get("table"),{user:m,switchUser:b,logout:y}=(0,re.As)(),f=(()=>{const{restaurantId:e}=(0,s.g)(),{user:t}=(0,re.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:j}=(0,te.h)(),{getTakeawayCharge:F,operationSettings:w,getStoreInfo:k}=(0,u.Pj)(),{categories:C,menuItems:A,getItemsByCategory:S,loadMenuByCategory:B,isLoadingMenu:E}=(0,ne.b)(),N=C.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:I,searchCustomers:_}=(0,ie.c)(),{currentStaff:z,updateStaff:P}=(0,oe.g)(),[T,$]=(0,i.useState)(null),[O,D]=(0,i.useState)(null),[M,q]=(0,i.useState)(""),[L,U]=(0,i.useState)(!1),[W,Y]=(0,i.useState)([]),[G,V]=(0,i.useState)(new Date),[H,J]=(0,i.useState)(!1),[Q,_t]=(0,i.useState)(!1),[zt,Pt]=(0,i.useState)(!1),[Tt,$t]=(0,i.useState)(null),[Ot,Dt]=(0,i.useState)(null),[Rt,Mt]=(0,i.useState)(0),[qt,Lt]=(0,i.useState)(!1),[Ut,Wt]=(0,i.useState)(""),[Yt,Gt]=(0,i.useState)(null),[Vt,Ht]=(0,i.useState)(null),[Jt,Qt]=(0,i.useState)(!1),[Kt,Xt]=(0,i.useState)(!1),[Zt,en]=(0,i.useState)(!1),[tn,nn]=(0,i.useState)("dine-in"),[on,rn]=(0,i.useState)(""),[sn,an]=(0,i.useState)(0),[ln,dn]=(0,i.useState)([]),[cn,un]=(0,i.useState)(""),[pn,xn]=(0,i.useState)(""),[hn,mn]=(0,i.useState)(!1),[gn,vn]=(0,i.useState)(!1),[bn,yn]=(0,i.useState)(!1),[fn,jn]=(0,i.useState)(!1),[Fn,wn]=(0,i.useState)(""),[kn,Cn]=(0,i.useState)(null),[An,Sn]=(0,i.useState)(""),[Bn,En]=(0,i.useState)(!1),[Nn,In]=(0,i.useState)(null),[_n,zn]=(0,i.useState)([]),[Pn,Tn]=(0,i.useState)(!1),$n=(0,i.useRef)(null),[On,Dn]=(0,i.useState)("RM"),[Rn,Mn]=(0,i.useState)(null),[qn,Ln]=(0,i.useState)("cash_only"),[Un,Wn]=(0,i.useState)(null),[Yn,Gn]=(0,i.useState)(0),[Vn,Hn]=(0,i.useState)("Bronze"),[Jn,Qn]=(0,i.useState)(40),Kn=(0,i.useRef)(null);(0,i.useEffect)(()=>{wn("/uploads/logos/brand-logo.png");const e=()=>{wn(`/uploads/logos/brand-logo.png?v=${Date.now()}`)};return window.addEventListener("brandLogoUpdated",e),()=>{window.removeEventListener("brandLogoUpdated",e)}},[]),(0,i.useEffect)(()=>{if(N.length>0&&null===T){const e=N[0].id;$(e),B(e)}},[N,T,B]);(0,i.useEffect)(()=>{var e;N.length>0&&T&&!L&&!N.find(e=>e.id===T)&&$((null===(e=N[0])||void 0===e?void 0:e.id)||null)},[N,T,L]),(0,i.useEffect)(()=>{const e=setInterval(()=>{V(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==m&&void 0!==m&&m.restaurantId)try{const e=await fetch(`/api/restaurants/${m.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);dn(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===m||void 0===m?void 0:m.restaurantId]),(0,i.useEffect)(()=>{x&&ln.length>0&&ln.includes(x)&&(rn(x),nn("dine-in"))},[x,ln]),(0,i.useEffect)(()=>{(async()=>{if(null!==m&&void 0!==m&&m.restaurantId)try{const e=await fetch(`/api/restaurants/${m.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&Cn(n.payment_settings),Dn(n.currency||"MYR"),Mn(n.cash_rounding?parseFloat(n.cash_rounding):null),Ln(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===m||void 0===m?void 0:m.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==m&&void 0!==m&&m.restaurantId)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/membership/settings/${m.restaurantId}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&(Wn(e.data),console.log("\u2705 Membership settings loaded for POS:",e.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===m||void 0===m?void 0:m.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==m&&void 0!==m&&m.restaurantId&&null!==Nn&&void 0!==Nn&&Nn.id)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/membership/customer/${m.restaurantId}/${Nn.id}`,{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&(Gn(e.data.points||0),Hn(e.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",e.data.points,"Tier:",e.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else Gn(0),Hn("Bronze")})()},[null===m||void 0===m?void 0:m.restaurantId,null===Nn||void 0===Nn?void 0:Nn.id]);const Xn=(()=>{let e=[];if(L){const t=M.toLowerCase().trim();e=A.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else T&&(e=S(T));return e})(),Zn=Xn.length>50;(0,i.useEffect)(()=>{Qn(40)},[T,M]),(0,i.useEffect)(()=>{if(!Zn)return;const e=Kn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Qn(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Zn,Jn,Xn.length]);const ei=(e,t)=>{Y(W.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},ti=()=>{const e=w.pagerSystem.totalPagers,t=pn.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},ni=()=>{Y([]),Mt(0),Gt(null),Ht(null),Wt(""),In(null),Sn(""),nn("dine-in"),rn(""),an(0),un(""),xn(""),q(""),$("all"),Qt(!1),J(!1),_t(!1),Pt(!1),$t(null),Dt(null)},ii=e=>{Rt===e?(Mt(0),Ht(null)):Mt(e)},oi=async()=>{if(Ut)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({code:Ut.toUpperCase(),restaurant_id:null===m||void 0===m?void 0:m.restaurantId,order_amount:si,order_type:tn,customer_id:(null===Nn||void 0===Nn?void 0:Nn.id)||null})});if(!e.ok)return void en(!0);const t=await e.json();t.valid&&t.data?(Gt({code:Ut.toUpperCase(),discount:t.data.discountAmount}),Wt("")):en(!0)}catch(e){console.error("Coupon validation error:",e),en(!0)}},ri=e=>{if(Vt&&Vt.name===e)return Ht(null),void Mt(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=si*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Ht({name:e,discount:i,requiresApproval:!0}),Mt(0)}else Ht({name:e,discount:i,requiresApproval:!1}),Mt(0)}},{subtotal:si,tax:ai,total:li,discountAmount:di,couponDiscount:ci,policyDiscount:ui,takeawayCharge:pi,serviceCharge:xi}=(()=>{const e=W.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===tn&&w.takeawayPricing.enabled)if("per-item"===w.takeawayPricing.pricingType){const e=W.reduce((e,t)=>e+t.quantity,0);t=e*w.takeawayPricing.perItemCharge}else W.forEach(e=>{const n=F(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=Rt,o=Yt?Yt.discount:0,r=Vt?Vt.discount:0,s=Math.max(0,n-i-o-r),a=w.serviceChargeEnabled?s*(w.serviceChargeRate/100):0,l=w.taxEnabled?s*(w.taxRate/100):0,d=s+a+l;let c=d;return"all"===qn&&Rn&&(c=Math.round(d/Rn)*Rn),{subtotal:e,tax:l,total:c,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),hi=(0,i.useRef)(null);(0,i.useEffect)(()=>{if(null===m||void 0===m||!m.restaurantId)return;const e=(0,r.io)("/checkout-display",{transports:["websocket","polling"]});return hi.current=e,e.on("connect",()=>{e.emit("join-restaurant",m.restaurantId)}),e.on("customer-checkin",async e=>{if(e.phone&&null!==m&&void 0!==m&&m.restaurantId){Sn(e.phone);try{const s=await fetch(`/api/customers/${m.restaurantId}?search=${encodeURIComponent(e.phone)}`);if(s.ok){const a=await s.json();if(a.success&&a.data&&a.data.length>0){var t,n,i,o,r;const s=a.data[0],l={id:(null===(t=s.customer)||void 0===t?void 0:t.id)||s.customer_id,name:(null===(n=s.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=s.customer)||void 0===i?void 0:i.phone)||e.phone,email:(null===(o=s.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=s.customer)||void 0===r?void 0:r.type)||"member",points:s.points||0,loyaltyTier:s.loyalty_tier||"Bronze",totalOrders:s.total_orders||0,totalSpent:s.total_spent||0};In(l),Sn(""),En(!1)}}}catch{}}}),()=>{e.disconnect()}},[null===m||void 0===m?void 0:m.restaurantId]),(0,i.useEffect)(()=>{if(!hi.current||null===m||void 0===m||!m.restaurantId)return;const e=W.map(e=>{var t,n;return{name:e.menuItem.name,quantity:e.quantity,price:e.menuItem.price+((null===(t=e.selectedOptions)||void 0===t?void 0:t.reduce((e,t)=>e+t.price,0))||0),options:(null===(n=e.selectedOptions)||void 0===n?void 0:n.map(e=>e.name))||[]}});hi.current.emit("cart-update",{restaurantId:m.restaurantId,items:e,subtotal:si,tax:ai,taxRate:w.taxEnabled?w.taxRate:0,serviceCharge:xi,serviceChargeRate:w.serviceChargeEnabled?w.serviceChargeRate:0,discount:di+ci+ui,total:li,currency:w.currency||"MYR"})},[W,si,ai,li,di,ci,ui,xi,null===m||void 0===m?void 0:m.restaurantId,w]);const mi=(()=>{if(!An.trim())return[];if(_n.length>0)return _n;return _(An).slice(0,10)})();return(0,v.jsxs)(ae,{children:[(0,v.jsxs)(le,{children:[(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,v.jsx)(de,{onClick:ni,children:Fn?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(ce,{src:Fn,alt:"Brand Logo"}),(0,v.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,v.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,v.jsx)("button",{onClick:()=>t(`/restaurant/${f}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,v.jsxs)(ue,{children:[(0,v.jsxs)(pe,{clickable:!0,onClick:()=>yn(!0),title:"Click to switch cashier",children:[(0,v.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,v.jsxs)("span",{children:["Cashier: ",(null===m||void 0===m?void 0:m.name)||"Staff"]}),(0,v.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,v.jsx)(xe,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(G)}),(0,v.jsx)("button",{onClick:()=>window.open(`/restaurant/${null===m||void 0===m?void 0:m.restaurantId}/checkout-display`,"_blank"),title:"Open Customer Checkout Display",style:{padding:"6px 12px",fontSize:"12px",fontWeight:500,border:"1px solid #E6EBF1",borderRadius:"6px",background:"#F6F9FC",color:"#6B7C93",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",marginLeft:"8px"},children:"Customer Screen"})]})]}),(0,v.jsxs)(he,{children:[(0,v.jsxs)(me,{children:[(0,v.jsx)(ge,{children:(0,v.jsxs)(ve,{children:[(0,v.jsx)(ye,{children:"\ud83d\udd0d"}),(0,v.jsx)(be,{type:"text",placeholder:"Search menu items...",value:M,onChange:e=>(e=>{if(q(e),e.trim())L||(D(T),U(!0),$(null),B("all"));else if(L){var t;U(!1);const e=O||(null===(t=N[0])||void 0===t?void 0:t.id)||null;$(e),D(null)}})(e.target.value)}),M&&(0,v.jsx)(fe,{onClick:()=>{if(q(""),L){var e;U(!1);const t=O||(null===(e=N[0])||void 0===e?void 0:e.id)||null;$(t),D(null)}},title:"Clear search",children:"\xd7"})]})}),(0,v.jsx)(Fe,{children:N.map(e=>(0,v.jsxs)(we,{active:T===e.id&&!L,onClick:()=>{return t=e.id,L&&(U(!1),q("")),$(t),void B(t);var t},children:[e.emoji," ",e.name]},e.id))}),L&&(0,v.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,v.jsx)("span",{children:"\ud83d\udd0d"}),(0,v.jsxs)("span",{children:['Search results for "',M,'" (',Xn.length," items)"]})]}),(0,v.jsx)(ke,{children:Xn.length>0?(0,v.jsxs)(v.Fragment,{children:[(Zn?Xn.slice(0,Jn):Xn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,v.jsxs)(Ce,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=A.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=W.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?Y(W.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):Y([...W,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,v.jsx)(Ee,{children:"SET"}),(0,v.jsx)(Ae,{hasImage:!!e.image,children:e.image?(0,v.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,v.jsxs)(Se,{children:[e.code?`${e.code} `:"",e.name]}),(0,v.jsxs)(Be,{children:[On," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,v.jsx)(Ne,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,v.jsx)(Ie,{children:(0,v.jsx)(_e,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(Dt(e),_t(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Zn&&Jn<Xn.length&&(0,v.jsx)("div",{ref:Kn,style:{gridColumn:"1 / -1",height:"20px"}})]}):E?(0,v.jsxs)(je,{children:[(0,v.jsx)("div",{className:"icon",children:"\u23f3"}),(0,v.jsx)("div",{className:"title",children:"Loading..."})]}):(0,v.jsxs)(je,{children:[(0,v.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,v.jsx)("div",{className:"title",children:L?`No results for "${M}"`:"No items in this category"}),(0,v.jsx)("div",{className:"message",children:L?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,v.jsxs)(ze,{children:[(0,v.jsxs)(pt,{children:[(0,v.jsx)(xt,{active:"dine-in"===tn,onClick:()=>nn("dine-in"),children:"Dine In"}),(0,v.jsx)(xt,{active:"takeaway"===tn,onClick:()=>nn("takeaway"),children:"Takeaway"})]}),(0,v.jsx)(mt,{children:Nn?(0,v.jsxs)(wt,{children:[(0,v.jsxs)(kt,{children:[(0,v.jsx)(Ct,{children:Nn.name}),(0,v.jsxs)(At,{children:[Nn.phone&&`${Nn.phone} \u2022 `,Nn.id]})]}),(0,v.jsx)(It,{onClick:()=>{In(null),Sn(""),zn([]),Gt(null),Wt("")},children:"Clear"})]}):(0,v.jsxs)(gt,{children:[(0,v.jsx)(bt,{children:"\ud83d\udd0d"}),(0,v.jsx)(vt,{type:"text",placeholder:"Walk-in Customer",value:An,onChange:e=>{const t=e.target.value;Sn(t),En(t.trim().length>0),$n.current&&clearTimeout($n.current),t.trim().length>=2?$n.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==m&&void 0!==m&&m.restaurantId){Tn(!0);try{const t=await fetch(`/api/customers/${m.restaurantId}?search=${encodeURIComponent(e)}`);if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});zn(t.slice(0,10))}}}catch(t){console.error("Customer search error:",t)}finally{Tn(!1)}}else zn([])})(t)},300):zn([])},onFocus:()=>{An.trim()&&En(!0)},onBlur:()=>setTimeout(()=>En(!1),200)}),(0,v.jsx)(yt,{show:Bn&&mi.length>0,children:mi.map(e=>(0,v.jsxs)(ft,{onClick:()=>(e=>{In(e),Sn(""),En(!1),zn([])})(e),children:[(0,v.jsx)(jt,{children:e.name}),(0,v.jsxs)(Ft,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,v.jsx)(yt,{show:Bn&&An.trim().length>0&&0===mi.length&&!Pn,children:(0,v.jsx)(ft,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,v.jsx)(yt,{show:Bn&&Pn,children:(0,v.jsx)(ft,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===tn&&ln.length>0&&(0,v.jsxs)(Pe,{children:[(0,v.jsx)(Te,{children:"Table Number:"}),(0,v.jsxs)($e,{value:on,onChange:e=>rn(e.target.value),children:[(0,v.jsx)("option",{value:"",children:"Free Seating"}),ln.map(e=>(0,v.jsx)("option",{value:e,children:e},e))]}),on&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(Te,{children:"Guests:"}),(0,v.jsxs)($e,{value:sn,onChange:e=>an(Number(e.target.value)),style:{width:"80px"},children:[(0,v.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,v.jsx)("option",{value:e,children:e},e))]})]})]}),0===W.length?(0,v.jsxs)(it,{children:[(0,v.jsx)(ot,{children:"No items in order"}),(0,v.jsx)(ot,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,v.jsxs)(Oe,{children:[(0,v.jsxs)(De,{children:[(0,v.jsxs)(Re,{children:[W.length," ",1===W.length?"item":"items"]}),W.map(e=>(0,v.jsxs)(Me,{children:[(0,v.jsxs)(qe,{children:[(0,v.jsxs)(Le,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,v.jsxs)(v.Fragment,{children:[t.length>0&&(0,v.jsx)(Ue,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,v.jsxs)(Ue,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,v.jsxs)(We,{children:[(0,v.jsxs)(Ye,{children:[(0,v.jsx)(Ge,{onClick:()=>ei(e.id,-1),children:"-"}),(0,v.jsx)(Ve,{children:e.quantity}),(0,v.jsx)(Ge,{onClick:()=>ei(e.id,1),children:"+"})]}),(0,v.jsxs)(He,{children:[On," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,v.jsx)(Je,{onClick:()=>{return t=e.id,void Y(W.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,v.jsxs)(Qe,{children:[(0,v.jsxs)(Ke,{children:[(0,v.jsx)(Xe,{children:"Subtotal"}),(0,v.jsxs)(Ze,{children:[On," ",si.toFixed(2)]})]}),pi>0&&(0,v.jsxs)(Ke,{children:[(0,v.jsx)(Xe,{children:"Takeaway Charge"}),(0,v.jsxs)(Ze,{children:[On," ",pi.toFixed(2)]})]}),di>0&&(0,v.jsxs)(Ke,{children:[(0,v.jsx)(Xe,{children:"Discount"}),(0,v.jsxs)(Ze,{style:{color:"#10B981"},children:["-",On," ",di.toFixed(2)]})]}),Yt&&(0,v.jsxs)(Ke,{children:[(0,v.jsxs)(Xe,{children:["Coupon (",Yt.code,")"]}),(0,v.jsxs)(Ze,{style:{color:"#10B981"},children:["-",On," ",ci.toFixed(2)]})]}),Vt&&(0,v.jsxs)(Ke,{children:[(0,v.jsxs)(Xe,{children:["Discount (",Vt.name,")"]}),(0,v.jsxs)(Ze,{style:{color:"#10B981"},children:["-",On," ",ui.toFixed(2)]})]}),w.serviceChargeEnabled&&xi>0&&(0,v.jsxs)(Ke,{children:[(0,v.jsxs)(Xe,{children:["Service Charge (",w.serviceChargeRate,"%)"]}),(0,v.jsxs)(Ze,{children:[On," ",xi.toFixed(2)]})]}),w.taxEnabled&&ai>0&&(0,v.jsxs)(Ke,{children:[(0,v.jsxs)(Xe,{children:["Tax (",w.taxRate,"%)"]}),(0,v.jsxs)(Ze,{children:[On," ",ai.toFixed(2)]})]}),(0,v.jsxs)(et,{children:[(0,v.jsx)(Xe,{children:"Total"}),(0,v.jsxs)(Ze,{children:[On," ",li.toFixed(2)]})]})]}),(0,v.jsxs)(rt,{children:[(0,v.jsx)(st,{children:Yt?(0,v.jsxs)(ut,{children:[(0,v.jsxs)("span",{children:["Coupon: ",Yt.code," (-",On," ",Yt.discount.toFixed(2),")"]}),(0,v.jsx)(ht,{onClick:()=>{Gt(null)},children:"\xd7"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(at,{type:"text",placeholder:"Enter coupon code",value:Ut,onChange:e=>Wt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&oi()}),(0,v.jsx)(lt,{onClick:oi,disabled:!Ut,children:"Apply Coupon"})]})}),(0,v.jsx)(st,{children:(0,v.jsxs)(dt,{children:[(0,v.jsxs)(ct,{active:5===Rt,onClick:()=>ii(5),children:[w.currency," 5"]}),(0,v.jsxs)(ct,{active:10===Rt,onClick:()=>ii(10),children:[w.currency," 10"]}),(0,v.jsxs)(ct,{active:15===Rt,onClick:()=>ii(15),children:[w.currency," 15"]}),(0,v.jsxs)(ct,{onClick:()=>vn(!0),children:["Custom ",w.currency]})]})}),(0,v.jsx)(st,{children:(0,v.jsxs)(dt,{children:[(0,v.jsx)(ct,{active:"Staff"===(null===Vt||void 0===Vt?void 0:Vt.name),onClick:()=>ri("Staff"),children:"20%"}),(0,v.jsx)(ct,{active:"VIP"===(null===Vt||void 0===Vt?void 0:Vt.name),onClick:()=>ri("VIP"),children:"15%"}),(0,v.jsx)(ct,{onClick:()=>jn(!0),children:"Custom %"})]})})]})]}),w.pagerSystem.enabled&&W.length>0&&(0,v.jsxs)(Pe,{children:[(0,v.jsx)(Te,{children:"Pager Number:"}),(0,v.jsxs)(St,{children:[(0,v.jsx)(Bt,{type:"text",value:pn,onChange:e=>{const t=e.target.value;xn(t),un(t),t.trim()?mn(!0):mn(!1)},onFocus:()=>{!pn.trim()&&cn||mn(!0)},onBlur:()=>setTimeout(()=>mn(!1),200),placeholder:cn?`#${cn}`:"Type or click..."}),(0,v.jsx)(Et,{show:hn,children:ti().length>0?ti().map(e=>(0,v.jsxs)(Nt,{onClick:()=>{return un((t=e).toString()),xn(t.toString()),void mn(!1);var t},children:["Pager #",e]},e)):(0,v.jsx)(Nt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,v.jsxs)(tt,{children:[(0,v.jsx)(nt,{variant:"danger",onClick:()=>{W.length>0&&Qt(!0)},children:"Clear"}),(0,v.jsx)(nt,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==W.length)if(qt)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),Lt(!0);try{const t=new Date,n={date:t,items:W,subtotal:si,discount:di,discountPolicy:Vt?{name:Vt.name,amount:Vt.discount}:void 0,coupon:Yt?{code:Yt.code,discount:Yt.discount}:null,takeawayCharge:pi,serviceCharge:xi,serviceChargeRate:w.serviceChargeRate,tax:ai,taxRate:w.taxRate,total:li,paymentMethod:"Pending",amountReceived:0,change:0},i={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Nn?Nn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:Nn?Nn.phone:"POS Terminal",email:Nn&&Nn.email||"",type:Nn?"member":"guest",customerId:null===Nn||void 0===Nn?void 0:Nn.id,loyaltyTier:null===Nn||void 0===Nn?void 0:Nn.loyaltyTier,points:null===Nn||void 0===Nn?void 0:Nn.points},items:W.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,selectedOptions:e.selectedOptions||[],is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:si,tax:ai,taxRate:w.taxRate,serviceCharge:xi,serviceChargeRate:w.serviceChargeRate,discount:di,coupon:Yt?{code:Yt.code,amount:Yt.discount}:void 0,discountPolicy:Vt?{name:Vt.name,amount:Vt.discount}:void 0,takeawayCharge:pi,total:li,paymentMethod:"Pending",paymentStatus:"pending",orderType:tn,orderSource:"pos",tableNumber:"dine-in"===tn&&on?on:void 0,guest_count:"dine-in"===tn&&sn>0?sn:null,pagerNumber:cn||void 0,cashier_id:null!==m&&void 0!==m&&m.id?Number(m.id):null,cashier_name:(null===m||void 0===m?void 0:m.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",i.orderNumber);const o=await j(i,f?Number(f):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",o),$t({...n,orderNumber:(null===o||void 0===o?void 0:o.order_number)||(null===o||void 0===o?void 0:o.orderNumber)||i.orderNumber,pickupNumber:(null===o||void 0===o?void 0:o.pickup_number)||(null===o||void 0===o?void 0:o.pickupNumber)||(null!==o&&void 0!==o&&o.order_number?o.order_number.split("-")[1]:i.pickupNumber),pagerNumber:(null===o||void 0===o?void 0:o.pager_number)||cn||void 0,tableNumber:(null===o||void 0===o?void 0:o.table_number)||on||void 0,takeawayCharge:(null===o||void 0===o?void 0:o.takeaway_charge)||(null===o||void 0===o?void 0:o.takeawayCharge)||n.takeawayCharge,subtotal:(null===o||void 0===o?void 0:o.subtotal)||n.subtotal,tax:(null===o||void 0===o?void 0:o.tax)||n.tax,serviceCharge:(null===o||void 0===o?void 0:o.service_charge)||(null===o||void 0===o?void 0:o.serviceCharge)||n.serviceCharge,discount:(null===o||void 0===o?void 0:o.discount)||n.discount,discountPolicy:n.discountPolicy,coupon:n.coupon,pointsUsed:0,pointDiscount:0,total:(null===o||void 0===o?void 0:o.total)||n.total,cashierName:(null===m||void 0===m?void 0:m.name)||null}),Pt(!0),hi.current&&hi.current.emit("checkout-complete",{restaurantId:null===m||void 0===m?void 0:m.restaurantId,orderNumber:(null===Tt||void 0===Tt?void 0:Tt.orderNumber)||"",total:(null===o||void 0===o?void 0:o.total)||n.total||li,currency:w.currency||"MYR"}),Y([]),Mt(0),Gt(null),Ht(null),Wt(""),rn(""),an(0),un(""),xn(""),In(null),Sn(""),console.log("POS - Order added without payment:",null===o||void 0===o?void 0:o.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{Lt(!1)}var e}},children:"Pay Later"}),(0,v.jsx)(nt,{variant:"primary",onClick:()=>{0!==W.length&&J(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,v.jsx)(a.A,{isOpen:H,onClose:()=>J(!1),total:li,subtotal:si,tax:ai,serviceCharge:xi,takeawayCharge:pi,discountAmount:di,couponDiscount:ci,onConfirmPayment:async(e,t,n,i,o,r)=>{if(qt)return void console.warn("POS - Payment already in progress, ignoring duplicate call");Lt(!0),console.log("POS - Processing payment for method:",e,"Points used:",i);const s=o?li-o:li;try{var a,l,d,c;const u=new Date,x={date:u,items:W,subtotal:si,discount:di,discountPolicy:Vt?{name:Vt.name,amount:Vt.discount}:void 0,coupon:Yt?{code:Yt.code,discount:Yt.discount}:null,takeawayCharge:pi,serviceCharge:xi,serviceChargeRate:w.serviceChargeRate,tax:ai,taxRate:w.taxRate,total:s,pointsUsed:i||0,pointDiscount:o||0,paymentMethod:e,cardType:"card"===e&&r||null,amountReceived:t||s,change:n||0},h={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Nn?Nn.name:"Walk-in Customer",phone:Nn?Nn.phone:"POS Terminal",email:Nn&&Nn.email||"",type:Nn?"member":"guest",customerId:null===Nn||void 0===Nn?void 0:Nn.id,loyaltyTier:null===Nn||void 0===Nn?void 0:Nn.loyaltyTier,points:null===Nn||void 0===Nn?void 0:Nn.points},items:W.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,selectedOptions:e.selectedOptions||[],is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:u.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:si,tax:ai,taxRate:w.taxRate,serviceCharge:xi,serviceChargeRate:w.serviceChargeRate,discount:di,coupon:Yt?{code:Yt.code,amount:Yt.discount}:void 0,discountPolicy:Vt?{name:Vt.name,amount:Vt.discount}:void 0,takeawayCharge:pi,total:s,points_used:i||null,point_discount:o||null,paymentMethod:e,card_type:"card"===e&&r||null,paymentStatus:"completed",orderType:tn,orderSource:"pos",tableNumber:"dine-in"===tn&&on?on:void 0,guest_count:"dine-in"===tn&&sn>0?sn:null,pagerNumber:cn||void 0,cashier_id:null!==m&&void 0!==m&&m.id?Number(m.id):null,cashier_name:(null===m||void 0===m?void 0:m.name)||null},g=await j(h,null!==m&&void 0!==m&&m.restaurantId?Number(m.restaurantId):void 0);if(Nn&&I(Nn.id,li),z){const e={...z.performance,ordersProcessed:z.performance.ordersProcessed+1};P(z.id,{totalSales:z.totalSales+li,totalShifts:z.totalShifts,performance:e})}$t({...x,orderNumber:(null===g||void 0===g?void 0:g.order_number)||(null===g||void 0===g?void 0:g.orderNumber)||"",pickupNumber:(null===g||void 0===g?void 0:g.pickup_number)||(null===g||void 0===g?void 0:g.pickupNumber)||(null!==g&&void 0!==g&&g.order_number?g.order_number.split("-")[1]:null),tableNumber:(null===g||void 0===g?void 0:g.table_number)||on||void 0,pagerNumber:(null===g||void 0===g?void 0:g.pager_number)||cn||void 0,takeawayCharge:(null===g||void 0===g?void 0:g.takeaway_charge)||(null===g||void 0===g?void 0:g.takeawayCharge)||x.takeawayCharge,subtotal:(null===g||void 0===g?void 0:g.subtotal)||x.subtotal,tax:(null===g||void 0===g?void 0:g.tax)||x.tax,serviceCharge:(null===g||void 0===g?void 0:g.service_charge)||(null===g||void 0===g?void 0:g.serviceCharge)||x.serviceCharge,discount:(null===g||void 0===g?void 0:g.discount)||x.discount,discountPolicy:x.discountPolicy,coupon:x.coupon,pointsUsed:x.pointsUsed||0,pointDiscount:x.pointDiscount||0,total:(null===g||void 0===g?void 0:g.total)||x.total,cashierName:(null===m||void 0===m?void 0:m.name)||null}),Pt(!0),J(!1),hi.current&&hi.current.emit("checkout-complete",{restaurantId:null===m||void 0===m?void 0:m.restaurantId,orderNumber:(null===Tt||void 0===Tt?void 0:Tt.orderNumber)||"",total:(null===g||void 0===g?void 0:g.total)||x.total||li,currency:w.currency||"MYR"});const v=(0,p.qs)(),b=k(),y={...x,orderNumber:(null===g||void 0===g?void 0:g.order_number)||(null===g||void 0===g?void 0:g.orderNumber)||"",pickupNumber:(null===g||void 0===g?void 0:g.pickup_number)||(null===g||void 0===g?void 0:g.pickupNumber)||(null!==g&&void 0!==g&&g.order_number?g.order_number.split("-")[1]:null),tableNumber:(null===g||void 0===g?void 0:g.table_number)||on||void 0,pagerNumber:(null===g||void 0===g?void 0:g.pager_number)||cn||void 0,total:(null===g||void 0===g?void 0:g.total)||x.total,cashierName:(null===m||void 0===m?void 0:m.name)||null};null!==(a=v.billPrinter)&&void 0!==a&&a.enabled&&null!==(l=v.billPrinter)&&void 0!==l&&l.autoPrint&&setTimeout(()=>{(0,p.pG)(y,b).catch(e=>console.error("Auto bill print failed:",e))},300);(null===(d=v.kitchenPrinter)||void 0===d?void 0:d.enabled)&&(null===(c=v.kitchenPrinter)||void 0===c?void 0:c.autoPrint)&&setTimeout(()=>{(0,p.Si)(y,b).catch(e=>console.error("Auto kitchen print failed:",e))},800),Y([]),Mt(0),Gt(null),Ht(null),Wt(""),rn(""),an(0),un(""),xn(""),In(null),Sn(""),console.log("POS - Payment processing completed:",null===g||void 0===g?void 0:g.orderNumber)}catch(u){console.error("POS - Error processing payment:",u),alert("Failed to process payment. Please try again.")}finally{Lt(!1)}},paymentMethods:kn,taxRate:w.taxRate,serviceChargeRate:w.serviceChargeRate,taxEnabled:w.taxEnabled,serviceChargeEnabled:w.serviceChargeEnabled,cashierName:null===m||void 0===m?void 0:m.name,customerPoints:Yn,customerTier:Vn,membershipSettings:Un,selectedCustomerId:null===Nn||void 0===Nn?void 0:Nn.id}),Ot&&(0,v.jsx)(l.A,{isOpen:Q,onClose:()=>{_t(!1),Dt(null)},menuItem:Ot,onConfirm:(e,t,n)=>{if(!Ot)return;let i=[...t];if(Ot.is_set_menu&&Ot.set_items&&Ot.set_items.length>0){i=[...Ot.set_items.map(e=>{const t=A.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=W.find(e=>{var t;return e.menuItem.id===Ot.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});Y(r?W.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...W,{id:`order-${Date.now()}`,menuItem:Ot,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),_t(!1),Dt(null)}}),Tt&&(0,v.jsx)(R,{isOpen:zt,onClose:()=>{ni(),c&&window.parent!==window?window.parent.postMessage({type:"pos-order-complete"},"*"):d&&t(`/restaurant/${f}/floor-plan`)},orderData:Tt,onPrintBill:()=>{}}),(0,v.jsx)(X.A,{isOpen:Jt,onClose:()=>Qt(!1),onConfirm:()=>{Y([]),Mt(0),Gt(null),Ht(null),Wt(""),In(null),Sn(""),un(""),xn(""),Qt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,v.jsx)(Z.A,{isOpen:Kt,onClose:()=>Xt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,v.jsx)(Z.A,{isOpen:Zt,onClose:()=>en(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,v.jsx)(ee.A,{isOpen:gn,onClose:()=>vn(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(Mt(t),Ht(null)),vn(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,h.Qn)(On)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,v.jsx)(ee.A,{isOpen:fn,onClose:()=>jn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Ht({name:`${t}%`,discount:si*(t/100),requiresApproval:!1}),Mt(0)}jn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,v.jsx)(se.A,{}),(0,v.jsx)(K,{show:bn,onClose:()=>yn(!1),onVerified:e=>{e.token&&e.user&&b(e.token,e.user),yn(!1)},onLogout:()=>{y()},currentCashierName:null===m||void 0===m?void 0:m.name})]})}}}]);