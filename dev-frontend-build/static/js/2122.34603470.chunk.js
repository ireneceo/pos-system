"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2122],{1472:(e,t,o)=>{o.d(t,{A:()=>i});o(9950);var n=o(9610),r=o(4414);const i=e=>{let{isOpen:t,onClose:o,onConfirm:i,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.yl,{variant:"secondary",onClick:o,children:d}),(0,r.jsx)(n.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:i,children:l})]});return(0,r.jsx)(n.aF,{isOpen:t,onClose:o,title:s,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2122:(e,t,o)=>{o.r(t),o.d(t,{default:()=>Nt});var n=o(8819),r=o(9950),i=o(4752),s=o(4492),a=o(2966),l=o(9189),d=o(9610),c=o(2159),p=o(9018),u=o(5863),x=o(8406),h=o(6038),m=o(4414);const g=i.DU`
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
`,b=i.Ay.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`,y=i.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,v=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,f=i.Ay.span`
  color: ${n.w.colors.text.muted};
`,j=i.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,w=i.Ay.div`
  margin-bottom: 20px;
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,F=i.Ay.div`
  flex: 1;
`,k=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,A=i.Ay.div`
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  margin-top: 4px;
`,S=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,$=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,B=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,N=i.Ay.div`
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
`,z=i.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,I=i.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,E=i.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,P=i.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,T=i.Ay.button`
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
`,O=e=>{var t,o,n,i;let{isOpen:s,onClose:a,orderData:l,onPrintBill:O}=e;const{getStoreInfo:D,operationSettings:R}=(0,p.Pj)(),L=D(),q=e=>(0,x.r6)(e,R),M=async()=>{await(0,u.pG)(l,L)&&setTimeout(()=>{O()},100)},U=async()=>{await(0,u.Si)(l,L)},W=(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(d.yl,{variant:"secondary",onClick:M,children:"Print Bill"}),(0,m.jsx)(d.yl,{variant:"secondary",onClick:U,children:"Print Order Ticket"}),(0,m.jsx)(d.yl,{variant:"primary",onClick:a,children:"Close"})]}),Y=(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(T,{onClick:M,title:"Print Bill",children:[(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,m.jsx)("span",{children:"Bill"})]}),(0,m.jsxs)(T,{onClick:U,title:"Print Order Ticket",children:[(0,m.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,m.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,m.jsx)("span",{children:"Ticket"})]})]});return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(g,{}),(0,m.jsxs)(d.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:W,headerActions:Y,children:[(0,m.jsxs)("div",{style:{textAlign:"center"},children:[(0,m.jsxs)(b,{children:["Order ",l.orderNumber]}),l.pagerNumber?(0,m.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,m.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pagerNumber})]}):(0,m.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,m.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:l.pickupNumber||(null!==(t=l.orderNumber)&&void 0!==t&&t.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"})]})]}),(0,m.jsxs)(y,{children:[(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Date & Time"}),(0,m.jsx)(j,{children:q(l.date)})]}),l.cashierName&&(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Cashier"}),(0,m.jsx)(j,{children:l.cashierName})]}),(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Payment Method"}),(0,m.jsx)(j,{children:l.paymentMethod})]}),"cash"===l.paymentMethod&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Amount Received"}),(0,m.jsx)(j,{children:(0,h.vv)(l.amountReceived,R.currency)})]}),(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Change"}),(0,m.jsx)(j,{children:(0,h.vv)(l.change,R.currency)})]})]})]}),(0,m.jsxs)(c.wn,{children:[(0,m.jsx)(B,{children:"Order Items"}),(0,m.jsx)(w,{children:l.items.map((e,t)=>(0,m.jsxs)(C,{children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,m.jsx)(A,{children:e.options.join(", ")})]}),(0,m.jsxs)(S,{children:[e.quantity,"x"]}),(0,m.jsx)($,{children:(0,h.vv)(e.menuItem.price*e.quantity,R.currency)})]},t))})]}),(0,m.jsxs)(c.wn,{children:[(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Subtotal"}),(0,m.jsx)(j,{children:(0,h.vv)(l.subtotal,R.currency)})]}),Number(l.takeawayCharge)>0&&(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Takeaway Charge"}),(0,m.jsx)(j,{children:(0,h.vv)(Number(l.takeawayCharge),R.currency)})]}),Number(l.discount)>0&&(0,m.jsxs)(v,{children:[(0,m.jsx)(f,{children:"Discount"}),(0,m.jsx)(j,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discount),R.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,m.jsxs)(v,{children:[(0,m.jsxs)(f,{children:["Discount (",l.discountPolicy.name,")"]}),(0,m.jsx)(j,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.discountPolicy.amount),R.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,m.jsxs)(v,{children:[(0,m.jsxs)(f,{children:["Coupon (",l.coupon.code,")"]}),(0,m.jsx)(j,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.coupon.discount),R.currency)})]}),Number(l.pointDiscount)>0&&(0,m.jsxs)(v,{children:[(0,m.jsxs)(f,{children:["Points (",null===(o=l.pointsUsed)||void 0===o?void 0:o.toLocaleString()," pts)"]}),(0,m.jsx)(j,{style:{color:"#10B981"},children:(0,h.vv)(-Number(l.pointDiscount),R.currency)})]}),Number(l.serviceCharge)>0&&(0,m.jsxs)(v,{children:[(0,m.jsxs)(f,{children:["Service Charge (",l.serviceChargeRate||10,"%)"]}),(0,m.jsx)(j,{children:(0,h.vv)(Number(l.serviceCharge),R.currency)})]}),Number(l.tax)>0&&(0,m.jsxs)(v,{children:[(0,m.jsxs)(f,{children:["Tax (",l.taxRate||6,"%)"]}),(0,m.jsx)(j,{children:(0,h.vv)(Number(l.tax),R.currency)})]})]}),(0,m.jsxs)(c.i_,{style:{marginTop:0},children:[(0,m.jsx)(c.nJ,{children:"Total"}),(0,m.jsx)(c.aX,{children:(0,h.vv)(l.total,R.currency)})]})]}),(0,m.jsxs)(N,{id:"order-complete-bill-print",children:[(0,m.jsxs)(z,{children:[(0,m.jsx)(I,{children:L.name}),(0,m.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[L.address,(0,m.jsx)("br",{}),"Tel: ",L.phone,(0,m.jsx)("br",{}),"GST Reg No: ",L.gstRegNo]})]}),(0,m.jsxs)(E,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,m.jsxs)(_,{children:[(0,m.jsx)("strong",{children:"Order No:"}),(0,m.jsx)("span",{children:l.orderNumber})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)("strong",{children:"Date:"}),(0,m.jsx)("span",{children:q(l.date)})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)("strong",{children:"Cashier:"}),(0,m.jsx)("span",{children:l.cashierName||"POS Terminal"})]}),(0,m.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",l.pickupNumber||(null!==(n=l.orderNumber)&&void 0!==n&&n.includes("-")?l.orderNumber.split("-")[1]:l.orderNumber)||"-"]}),l.pagerNumber&&(0,m.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",l.pagerNumber]})]}),(0,m.jsx)(E,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,m.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,m.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,m.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,m.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,m.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,m.jsx)("tbody",{children:l.items.map((e,t)=>(0,m.jsx)(r.Fragment,{children:(0,m.jsxs)("tr",{children:[(0,m.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,m.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,m.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,m.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,m.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,m.jsxs)(E,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,h.vv)(l.subtotal,R.currency)})]}),Number(l.takeawayCharge)>0&&(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Takeaway Charge:"}),(0,m.jsx)("span",{children:(0,h.vv)(Number(l.takeawayCharge),R.currency)})]}),Number(l.discount)>0&&(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Discount:"}),(0,m.jsx)("span",{children:(0,h.vv)(-Number(l.discount),R.currency)})]}),l.discountPolicy&&Number(l.discountPolicy.amount)>0&&(0,m.jsxs)(_,{children:[(0,m.jsxs)("span",{children:["Discount (",l.discountPolicy.name,"):"]}),(0,m.jsx)("span",{children:(0,h.vv)(-Number(l.discountPolicy.amount),R.currency)})]}),l.coupon&&Number(l.coupon.discount)>0&&(0,m.jsxs)(_,{children:[(0,m.jsxs)("span",{children:["Coupon (",l.coupon.code,"):"]}),(0,m.jsx)("span",{children:(0,h.vv)(-Number(l.coupon.discount),R.currency)})]}),Number(l.pointDiscount)>0&&(0,m.jsxs)(_,{children:[(0,m.jsxs)("span",{children:["Points (",null===(i=l.pointsUsed)||void 0===i?void 0:i.toLocaleString()," pts):"]}),(0,m.jsx)("span",{children:(0,h.vv)(-Number(l.pointDiscount),R.currency)})]}),Number(l.serviceCharge)>0&&(0,m.jsxs)(_,{children:[(0,m.jsxs)("span",{children:["Service Charge (",l.serviceChargeRate||10,"%):"]}),(0,m.jsx)("span",{children:(0,h.vv)(Number(l.serviceCharge),R.currency)})]}),Number(l.tax)>0&&(0,m.jsxs)(_,{children:[(0,m.jsxs)("span",{children:["Tax (",l.taxRate||6,"%):"]}),(0,m.jsx)("span",{children:(0,h.vv)(Number(l.tax),R.currency)})]}),(0,m.jsxs)(_,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,m.jsx)("span",{children:"TOTAL:"}),(0,m.jsx)("span",{children:(0,h.vv)(l.total,R.currency)})]})]}),(0,m.jsxs)(E,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Payment Method:"}),(0,m.jsx)("span",{children:l.paymentMethod.toUpperCase()})]}),"cash"===l.paymentMethod&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Amount Received:"}),(0,m.jsx)("span",{children:(0,h.vv)(l.amountReceived,R.currency)})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:"Change:"}),(0,m.jsx)("span",{children:(0,h.vv)(l.change,R.currency)})]})]})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,m.jsx)("div",{children:"Thank you for your purchase!"}),(0,m.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},D=i.Ay.div`
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
`,R=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,L=i.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`,q=i.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  margin: 0 0 24px;
`,M=i.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`,U=i.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${e=>e.error?"#DC2626":e.filled?"#635BFF":"#E6EBF1"};
  background: ${e=>e.error?"#DC2626":e.filled?"#635BFF":"transparent"};
  transition: all 0.15s;
`,W=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`,Y=i.Ay.button`
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
`,G=i.Ay.div`
  text-align: center;
  color: ${n.w.colors.danger};
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,H=i.Ay.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.danger};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEF2F2;
    border-color: #DC2626;
  }
`,V=i.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`,K=e=>{let{show:t,onClose:o,onVerified:n,onLogout:i,currentCashierName:s}=e;const[a,l]=(0,r.useState)(""),[d,c]=(0,r.useState)(""),[p,u]=(0,r.useState)(!1);(0,r.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,r.useCallback)(async e=>{u(!0),c("");try{const t=localStorage.getItem("auth_token"),o=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),r=await o.json();r.success&&r.token&&r.user?n({data:r.data,token:r.token,user:r.user}):r.success?n({data:r.data,token:"",user:r.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{u(!1)}},[n]),h=(0,r.useCallback)(e=>{if(p)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,p,x]);return(0,r.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?h(e.key):"Backspace"===e.key?h("backspace"):"Escape"===e.key&&o()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,h,o]),t?(0,m.jsx)(D,{show:t,onClick:e=>{e.target===e.currentTarget&&o()},children:(0,m.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)(L,{children:"Switch Cashier"}),(0,m.jsx)(q,{children:"Enter 4-digit PIN to switch"}),s&&(0,m.jsxs)(V,{children:["Current: ",s]}),(0,m.jsx)(M,{children:[0,1,2,3].map(e=>(0,m.jsx)(U,{filled:a.length>e,error:!!d},e))}),(0,m.jsx)(G,{children:d}),(0,m.jsxs)(W,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,m.jsx)(Y,{onClick:()=>h(e),children:e},e)),(0,m.jsx)(Y,{variant:"action",onClick:()=>h("backspace"),children:"\u232b"}),(0,m.jsx)(Y,{onClick:()=>h("0"),children:"0"}),(0,m.jsx)(Y,{variant:"action",onClick:o,children:"Close"})]}),i&&(0,m.jsx)(H,{onClick:i,children:"Logout"})]})}):null};var J=o(1472);const Q=e=>{let{isOpen:t,onClose:o,title:n,message:r,buttonText:i="OK"}=e;const s=(0,m.jsx)(d.yl,{onClick:o,style:{maxWidth:"200px",margin:"0 auto"},children:i});return(0,m.jsx)(d.aF,{isOpen:t,onClose:o,title:n,footer:s,children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,m.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:r})})})};var X=o(2538),Z=o(447),ee=o(8930),te=o(9037),oe=o(5781),ne=o(1367),re=o(2420);const ie=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,se=i.Ay.div`
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
`,ae=i.Ay.div`
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
`,le=i.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,de=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,ce=i.Ay.div`
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
`,pe=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.text.secondary};
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;
`,ue=i.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,xe=i.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,he=i.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid ${n.w.colors.border};
  display: flex;
  align-items: center;
  gap: 12px;
`,me=i.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,ge=i.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid ${n.w.colors.border};
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
    color: ${n.w.colors.text.light};
  }
`,be=i.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,ye=i.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: ${n.w.colors.backgroundAlt};
  border-radius: 50%;
  color: ${n.w.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: ${n.w.colors.border};
    color: #0A2540;
  }
`,ve=i.Ay.div`
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
`,fe=i.Ay.div`
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
`,je=i.Ay.button`
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
`,we=i.Ay.div`
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
`,Ce=i.Ay.div`
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
`,Fe=i.Ay.div`
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
`,ke=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
  line-height: 1.3;
`,Ae=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: ${n.w.colors.primary};
`,Se=i.Ay.div`
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
`,$e=i.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,Be=i.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,Ne=i.Ay.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${n.w.colors.primary};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: ${n.w.colors.primary};
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
`,ze=i.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid ${n.w.colors.border};
  display: flex;
  flex-direction: column;
`,Ie=i.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid ${n.w.colors.border};
  display: flex;
  align-items: center;
  gap: 12px;
`,Ee=i.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.text.secondary};
`,_e=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  width: 160px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
  }
`,Pe=i.Ay.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${n.w.colors.backgroundAlt};
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 2px;
  }
`,Te=i.Ay.div`
  padding: 16px 24px;
`,Oe=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${n.w.colors.text.secondary};
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${n.w.colors.border};
`,De=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${n.w.colors.backgroundAlt};
`,Re=i.Ay.div`
  flex: 1;
`,Le=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
`,qe=i.Ay.div`
  font-size: 12px;
  color: ${n.w.colors.text.secondary};
`,Me=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Ue=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,We=i.Ay.button`
  width: 24px;
  height: 24px;
  border: 1px solid ${n.w.colors.border};
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${n.w.colors.text.secondary};
  transition: all 0.15s;
  
  &:hover {
    border-color: ${n.w.colors.primary};
    color: ${n.w.colors.primary};
  }
  
  &:active {
    background: #F0F4FF;
  }
`,Ye=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.secondary};
  min-width: 20px;
  text-align: center;
`,Ge=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  min-width: 80px;
  text-align: right;
`,He=i.Ay.button`
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
`,Ve=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Ke=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Je=i.Ay.span`
  color: #6B7C93;
`,Qe=i.Ay.span`
  font-weight: 500;
  color: ${n.w.colors.secondary};
`,Xe=(0,i.Ay)(Ke)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${Je} {
    color: #0A2540;
  }
  
  ${Qe} {
    color: #635BFF;
  }
`,Ze=i.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,et=i.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return`\n          background: white;\n          color: ${n.w.colors.text.secondary};\n          border: 1px solid ${n.w.colors.border};\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: ${n.w.colors.primary};\n          }\n        `}}}
`,tt=i.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,ot=i.Ay.div`
  font-size: 14px;
`,nt=i.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid ${n.w.colors.border};
`,rt=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,it=i.Ay.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
  }
  
  &::placeholder {
    color: #8898AA;
  }
`,st=i.Ay.button`
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
`,at=i.Ay.div`
  display: flex;
  gap: 8px;
`,lt=i.Ay.button`
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
`,dt=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,ct=i.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,pt=i.Ay.button`
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
`,ut=i.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,xt=i.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid ${n.w.colors.border};
`,ht=i.Ay.div`
  position: relative;
`,mt=i.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid ${n.w.colors.border};
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
    color: ${n.w.colors.text.light};
  }
`,gt=i.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,bt=i.Ay.div`
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
`,yt=i.Ay.div`
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
`,vt=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,ft=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,jt=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,wt=i.Ay.div`
  flex: 1;
`,Ct=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${n.w.colors.primary};
  margin-bottom: 2px;
`,Ft=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,kt=i.Ay.div`
  position: relative;
  width: 140px;
`,At=i.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
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
`,St=i.Ay.div`
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
`,$t=i.Ay.div`
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
`,Bt=i.Ay.button`
  background: none;
  border: none;
  color: ${n.w.colors.primary};
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #E6F0FF;
  }
`,Nt=(i.Ay.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
`,i.Ay.button`
  padding: 12px 20px;
  background: ${n.w.colors.backgroundAlt};
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #F6F9FC;
    border-color: ${n.w.colors.primary};
    color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
  }
`,()=>{const e=(0,s.Zp)(),{user:t,switchUser:o,logout:n}=(0,ne.As)(),i=(()=>{const{restaurantId:e}=(0,s.g)(),{user:t}=(0,ne.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:d}=(0,Z.h)(),{getTakeawayCharge:c,operationSettings:u}=(0,p.Pj)(),{categories:x,menuItems:g,getItemsByCategory:b,loadMenuByCategory:y,isLoadingMenu:v}=(0,ee.b)(),f=x.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:j,searchCustomers:w}=(0,te.c)(),{currentStaff:C,isLoggedIn:F,logout:k,updateStaff:A}=(0,oe.g)(),[S,$]=(0,r.useState)(null),[B,N]=(0,r.useState)(null),[z,I]=(0,r.useState)(""),[E,_]=(0,r.useState)(!1),[P,T]=(0,r.useState)([]),[D,R]=(0,r.useState)(new Date),[L,q]=(0,r.useState)(!1),[M,U]=(0,r.useState)(!1),[W,Y]=(0,r.useState)(!1),[G,H]=(0,r.useState)(null),[V,Nt]=(0,r.useState)(null),[zt,It]=(0,r.useState)(0),[Et,_t]=(0,r.useState)(!1),[Pt,Tt]=(0,r.useState)(""),[Ot,Dt]=(0,r.useState)(null),[Rt,Lt]=(0,r.useState)(null),[qt,Mt]=(0,r.useState)(!1),[Ut,Wt]=(0,r.useState)(!1),[Yt,Gt]=(0,r.useState)(!1),[Ht,Vt]=(0,r.useState)("dine-in"),[Kt,Jt]=(0,r.useState)(""),[Qt,Xt]=(0,r.useState)([]),[Zt,eo]=(0,r.useState)(""),[to,oo]=(0,r.useState)(""),[no,ro]=(0,r.useState)(!1),[io,so]=(0,r.useState)(!1),[ao,lo]=(0,r.useState)(!1),[co,po]=(0,r.useState)(!1),[uo,xo]=(0,r.useState)(""),[ho,mo]=(0,r.useState)(null),[go,bo]=(0,r.useState)(""),[yo,vo]=(0,r.useState)(!1),[fo,jo]=(0,r.useState)(null),[wo,Co]=(0,r.useState)([]),[Fo,ko]=(0,r.useState)(!1),Ao=(0,r.useRef)(null),[So,$o]=(0,r.useState)("RM"),[Bo,No]=(0,r.useState)(null),[zo,Io]=(0,r.useState)("cash_only"),[Eo,_o]=(0,r.useState)(null),[Po,To]=(0,r.useState)(0),[Oo,Do]=(0,r.useState)("Bronze"),[Ro,Lo]=(0,r.useState)(40),qo=(0,r.useRef)(null);(0,r.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?xo(t.brand_logo):t.brandLogo?xo(t.brandLogo):t.logo&&xo(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,r.useEffect)(()=>{if(f.length>0&&null===S){const e=f[0].id;$(e),y(e)}},[f,S,y]);(0,r.useEffect)(()=>{var e;f.length>0&&S&&!E&&!f.find(e=>e.id===S)&&$((null===(e=f[0])||void 0===e?void 0:e.id)||null)},[f,S,E]),(0,r.useEffect)(()=>{const e=setInterval(()=>{R(new Date)},1e3);return()=>clearInterval(e)},[]),(0,r.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),o=t.data||t;if(o.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:n}=o.table_settings;if(e){const e=[];for(let o=1;o<=t;o++)e.push(`${n}${String(o).padStart(3,"0")}`);Xt(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,r.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/restaurants/${t.restaurantId}`);if(e.ok){const t=await e.json(),o=t.data||t;o.payment_settings&&mo(o.payment_settings),$o(o.currency||"RM"),No(o.cash_rounding?parseFloat(o.cash_rounding):null),Io(o.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,r.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId)try{const e=await fetch(`/api/membership/settings/${t.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(_o(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===t||void 0===t?void 0:t.restaurantId]),(0,r.useEffect)(()=>{(async()=>{if(null!==t&&void 0!==t&&t.restaurantId&&null!==fo&&void 0!==fo&&fo.id)try{const e=await fetch(`/api/membership/customer/${t.restaurantId}/${fo.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(To(t.data.points||0),Do(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else To(0),Do("Bronze")})()},[null===t||void 0===t?void 0:t.restaurantId,null===fo||void 0===fo?void 0:fo.id]);const Mo=(()=>{let e=[];if(E){const t=z.toLowerCase().trim();e=g.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else S&&(e=b(S));return e})(),Uo=Mo.length>50;(0,r.useEffect)(()=>{Lo(40)},[S,z]),(0,r.useEffect)(()=>{if(!Uo)return;const e=qo.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Lo(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Uo,Ro,Mo.length]);const Wo=(e,t)=>{T(P.map(o=>{if(o.id===e){const e=o.quantity+t;return e>0?{...o,quantity:e}:o}return o}).filter(e=>e.quantity>0))},Yo=()=>{const e=u.pagerSystem.totalPagers,t=to.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Go=()=>{T([]),It(0),Dt(null),Lt(null),Tt(""),jo(null),bo(""),Vt("dine-in"),Jt(""),eo(""),oo(""),I(""),$("all"),Mt(!1),q(!1),U(!1),Y(!1),H(null),Nt(null)},Ho=e=>{zt===e?(It(0),Lt(null)):It(e)},Vo=async()=>{if(Pt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({code:Pt.toUpperCase(),restaurant_id:null===t||void 0===t?void 0:t.restaurantId,order_amount:Jo,order_type:Ht})});if(!e.ok)return void Gt(!0);const o=await e.json();o.valid&&o.data?(Dt({code:Pt.toUpperCase(),discount:o.data.discountAmount}),Tt("")):Gt(!0)}catch(e){console.error("Coupon validation error:",e),Gt(!0)}},Ko=e=>{if(Rt&&Rt.name===e)return Lt(null),void It(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const o=parseFloat(t.discount.replace("%","")),n=Jo*(o/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Lt({name:e,discount:n,requiresApproval:!0}),It(0)}else Lt({name:e,discount:n,requiresApproval:!1}),It(0)}},{subtotal:Jo,tax:Qo,total:Xo,discountAmount:Zo,couponDiscount:en,policyDiscount:tn,takeawayCharge:on,serviceCharge:nn}=(()=>{const e=P.reduce((e,t)=>{let o=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){o+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+o},0);let t=0;if("takeaway"===Ht&&u.takeawayPricing.enabled)if("per-item"===u.takeawayPricing.pricingType){const e=P.reduce((e,t)=>e+t.quantity,0);t=e*u.takeawayPricing.perItemCharge}else P.forEach(e=>{const o=c(e.menuItem.category);t+=o*e.quantity});const o=e+t,n=zt,r=Ot?Ot.discount:0,i=Rt?Rt.discount:0,s=Math.max(0,o-n-r-i),a=u.serviceChargeEnabled?s*(u.serviceChargeRate/100):0,l=u.taxEnabled?s*(u.taxRate/100):0,d=s+a+l;let p=d;return"all"===zo&&Bo&&(p=Math.round(d/Bo)*Bo),{subtotal:e,tax:l,total:p,discountAmount:n,couponDiscount:r,policyDiscount:i,takeawayCharge:t,serviceCharge:a}})(),rn=(()=>{if(!go.trim())return[];if(wo.length>0)return wo;return w(go).slice(0,10)})();return(0,m.jsxs)(ie,{children:[(0,m.jsxs)(se,{children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,m.jsx)(ae,{onClick:Go,children:uo?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(le,{src:uo,alt:"Brand Logo"}),(0,m.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,m.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,m.jsx)("button",{onClick:()=>e(`/restaurant/${i}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,m.jsxs)(de,{children:[(0,m.jsxs)(ce,{clickable:!0,onClick:()=>lo(!0),title:"Click to switch cashier",children:[(0,m.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,m.jsxs)("span",{children:["Cashier: ",(null===t||void 0===t?void 0:t.name)||"Staff"]}),(0,m.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,m.jsx)(pe,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(D)})]})]}),(0,m.jsxs)(ue,{children:[(0,m.jsxs)(xe,{children:[(0,m.jsx)(he,{children:(0,m.jsxs)(me,{children:[(0,m.jsx)(be,{children:"\ud83d\udd0d"}),(0,m.jsx)(ge,{type:"text",placeholder:"Search menu items...",value:z,onChange:e=>(e=>{if(I(e),e.trim())E||(N(S),_(!0),$(null),y("all"));else if(E){var t;_(!1);const e=B||(null===(t=f[0])||void 0===t?void 0:t.id)||null;$(e),N(null)}})(e.target.value)}),z&&(0,m.jsx)(ye,{onClick:()=>{if(I(""),E){var e;_(!1);const t=B||(null===(e=f[0])||void 0===e?void 0:e.id)||null;$(t),N(null)}},title:"Clear search",children:"\xd7"})]})}),(0,m.jsx)(fe,{children:f.map(e=>(0,m.jsxs)(je,{active:S===e.id&&!E,onClick:()=>{return t=e.id,E&&(_(!1),I("")),$(t),void y(t);var t},children:[e.emoji," ",e.name]},e.id))}),E&&(0,m.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,m.jsx)("span",{children:"\ud83d\udd0d"}),(0,m.jsxs)("span",{children:['Search results for "',z,'" (',Mo.length," items)"]})]}),(0,m.jsx)(we,{children:Mo.length>0?(0,m.jsxs)(m.Fragment,{children:[(Uo?Mo.slice(0,Ro):Mo).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,m.jsxs)(Ce,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=g.find(t=>parseInt(t.id)===e.menuItemId),o=null===t||void 0===t?void 0:t.code;return`${o?`${o} `:""}${e.name} x${e.quantity}`}));const o=P.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);o&&!e.is_set_menu?T(P.map(e=>e.id===o.id?{...e,quantity:e.quantity+1}:e)):T([...P,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,m.jsx)(Se,{children:"SET"}),(0,m.jsx)(Fe,{hasImage:!!e.image,children:e.image?(0,m.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,m.jsxs)(ke,{children:[e.code?`${e.code} `:"",e.name]}),(0,m.jsxs)(Ae,{children:[So," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,m.jsx)($e,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,m.jsx)(Be,{children:(0,m.jsx)(Ne,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(Nt(e),U(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Uo&&Ro<Mo.length&&(0,m.jsx)("div",{ref:qo,style:{gridColumn:"1 / -1",height:"20px"}})]}):v?(0,m.jsxs)(ve,{children:[(0,m.jsx)("div",{className:"icon",children:"\u23f3"}),(0,m.jsx)("div",{className:"title",children:"Loading..."})]}):(0,m.jsxs)(ve,{children:[(0,m.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,m.jsx)("div",{className:"title",children:E?`No results for "${z}"`:"No items in this category"}),(0,m.jsx)("div",{className:"message",children:E?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,m.jsxs)(ze,{children:[(0,m.jsxs)(ct,{children:[(0,m.jsx)(pt,{active:"dine-in"===Ht,onClick:()=>Vt("dine-in"),children:"Dine In"}),(0,m.jsx)(pt,{active:"takeaway"===Ht,onClick:()=>Vt("takeaway"),children:"Takeaway"})]}),(0,m.jsx)(xt,{children:fo?(0,m.jsxs)(jt,{children:[(0,m.jsxs)(wt,{children:[(0,m.jsx)(Ct,{children:fo.name}),(0,m.jsxs)(Ft,{children:[fo.phone&&`${fo.phone} \u2022 `,fo.id]})]}),(0,m.jsx)(Bt,{onClick:()=>{jo(null),bo(""),Co([])},children:"Clear"})]}):(0,m.jsxs)(ht,{children:[(0,m.jsx)(gt,{children:"\ud83d\udd0d"}),(0,m.jsx)(mt,{type:"text",placeholder:"Walk-in Customer",value:go,onChange:e=>{const o=e.target.value;bo(o),vo(o.trim().length>0),Ao.current&&clearTimeout(Ao.current),o.trim().length>=2?Ao.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==t&&void 0!==t&&t.restaurantId){ko(!0);try{const o=await fetch(`/api/customers/${t.restaurantId}?search=${encodeURIComponent(e)}`);if(o.ok){const e=await o.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,o,n,r,i;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(o=e.customer)||void 0===o?void 0:o.name)||"Unknown",phone:(null===(n=e.customer)||void 0===n?void 0:n.phone)||"",email:(null===(r=e.customer)||void 0===r?void 0:r.email)||"",type:(null===(i=e.customer)||void 0===i?void 0:i.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});Co(t.slice(0,10))}}}catch(o){console.error("Customer search error:",o)}finally{ko(!1)}}else Co([])})(o)},300):Co([])},onFocus:()=>{go.trim()&&vo(!0)},onBlur:()=>setTimeout(()=>vo(!1),200)}),(0,m.jsx)(bt,{show:yo&&rn.length>0,children:rn.map(e=>(0,m.jsxs)(yt,{onClick:()=>(e=>{jo(e),bo(""),vo(!1),Co([])})(e),children:[(0,m.jsx)(vt,{children:e.name}),(0,m.jsxs)(ft,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,m.jsx)(bt,{show:yo&&go.trim().length>0&&0===rn.length&&!Fo,children:(0,m.jsx)(yt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,m.jsx)(bt,{show:yo&&Fo,children:(0,m.jsx)(yt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Ht&&Qt.length>0&&(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Ee,{children:"Table Number:"}),(0,m.jsxs)(_e,{value:Kt,onChange:e=>Jt(e.target.value),children:[(0,m.jsx)("option",{value:"",children:"Free Seating"}),Qt.map(e=>(0,m.jsx)("option",{value:e,children:e},e))]})]}),0===P.length?(0,m.jsxs)(tt,{children:[(0,m.jsx)(ot,{children:"No items in order"}),(0,m.jsx)(ot,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,m.jsxs)(Pe,{children:[(0,m.jsxs)(Te,{children:[(0,m.jsxs)(Oe,{children:[P.length," ",1===P.length?"item":"items"]}),P.map(e=>(0,m.jsxs)(De,{children:[(0,m.jsxs)(Re,{children:[(0,m.jsxs)(Le,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],o=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):o.push(e)}),(0,m.jsxs)(m.Fragment,{children:[t.length>0&&(0,m.jsx)(qe,{style:{fontWeight:600},children:t.join(", ")}),o.length>0&&(0,m.jsxs)(qe,{children:["\u2b50 ",o.join(", ")]})]})})()]}),(0,m.jsxs)(Me,{children:[(0,m.jsxs)(Ue,{children:[(0,m.jsx)(We,{onClick:()=>Wo(e.id,-1),children:"-"}),(0,m.jsx)(Ye,{children:e.quantity}),(0,m.jsx)(We,{onClick:()=>Wo(e.id,1),children:"+"})]}),(0,m.jsxs)(Ge,{children:[So," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,m.jsx)(He,{onClick:()=>{return t=e.id,void T(P.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,m.jsxs)(Ve,{children:[(0,m.jsxs)(Ke,{children:[(0,m.jsx)(Je,{children:"Subtotal"}),(0,m.jsxs)(Qe,{children:[So," ",Jo.toFixed(2)]})]}),on>0&&(0,m.jsxs)(Ke,{children:[(0,m.jsx)(Je,{children:"Takeaway Charge"}),(0,m.jsxs)(Qe,{children:[So," ",on.toFixed(2)]})]}),Zo>0&&(0,m.jsxs)(Ke,{children:[(0,m.jsx)(Je,{children:"Discount"}),(0,m.jsxs)(Qe,{style:{color:"#10B981"},children:["-",So," ",Zo.toFixed(2)]})]}),Ot&&(0,m.jsxs)(Ke,{children:[(0,m.jsxs)(Je,{children:["Coupon (",Ot.code,")"]}),(0,m.jsxs)(Qe,{style:{color:"#10B981"},children:["-",So," ",en.toFixed(2)]})]}),Rt&&(0,m.jsxs)(Ke,{children:[(0,m.jsxs)(Je,{children:["Discount (",Rt.name,")"]}),(0,m.jsxs)(Qe,{style:{color:"#10B981"},children:["-",So," ",tn.toFixed(2)]})]}),u.serviceChargeEnabled&&nn>0&&(0,m.jsxs)(Ke,{children:[(0,m.jsxs)(Je,{children:["Service Charge (",u.serviceChargeRate,"%)"]}),(0,m.jsxs)(Qe,{children:[So," ",nn.toFixed(2)]})]}),u.taxEnabled&&Qo>0&&(0,m.jsxs)(Ke,{children:[(0,m.jsxs)(Je,{children:["Tax (",u.taxRate,"%)"]}),(0,m.jsxs)(Qe,{children:[So," ",Qo.toFixed(2)]})]}),(0,m.jsxs)(Xe,{children:[(0,m.jsx)(Je,{children:"Total"}),(0,m.jsxs)(Qe,{children:[So," ",Xo.toFixed(2)]})]})]}),(0,m.jsxs)(nt,{children:[(0,m.jsx)(rt,{children:Ot?(0,m.jsxs)(dt,{children:[(0,m.jsxs)("span",{children:["Coupon: ",Ot.code," (-",So," ",Ot.discount.toFixed(2),")"]}),(0,m.jsx)(ut,{onClick:()=>{Dt(null)},children:"\xd7"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(it,{type:"text",placeholder:"Enter coupon code",value:Pt,onChange:e=>Tt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&Vo()}),(0,m.jsx)(st,{onClick:Vo,disabled:!Pt,children:"Apply Coupon"})]})}),(0,m.jsx)(rt,{children:(0,m.jsxs)(at,{children:[(0,m.jsxs)(lt,{active:5===zt,onClick:()=>Ho(5),children:[u.currency," 5"]}),(0,m.jsxs)(lt,{active:10===zt,onClick:()=>Ho(10),children:[u.currency," 10"]}),(0,m.jsxs)(lt,{active:15===zt,onClick:()=>Ho(15),children:[u.currency," 15"]}),(0,m.jsxs)(lt,{onClick:()=>so(!0),children:["Custom ",u.currency]})]})}),(0,m.jsx)(rt,{children:(0,m.jsxs)(at,{children:[(0,m.jsx)(lt,{active:"Staff"===(null===Rt||void 0===Rt?void 0:Rt.name),onClick:()=>Ko("Staff"),children:"20%"}),(0,m.jsx)(lt,{active:"VIP"===(null===Rt||void 0===Rt?void 0:Rt.name),onClick:()=>Ko("VIP"),children:"15%"}),(0,m.jsx)(lt,{onClick:()=>po(!0),children:"Custom %"})]})})]})]}),u.pagerSystem.enabled&&P.length>0&&(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Ee,{children:"Pager Number:"}),(0,m.jsxs)(kt,{children:[(0,m.jsx)(At,{type:"text",value:to,onChange:e=>{const t=e.target.value;oo(t),eo(t),t.trim()?ro(!0):ro(!1)},onFocus:()=>{!to.trim()&&Zt||ro(!0)},onBlur:()=>setTimeout(()=>ro(!1),200),placeholder:Zt?`#${Zt}`:"Type or click..."}),(0,m.jsx)(St,{show:no,children:Yo().length>0?Yo().map(e=>(0,m.jsxs)($t,{onClick:()=>{return eo((t=e).toString()),oo(t.toString()),void ro(!1);var t},children:["Pager #",e]},e)):(0,m.jsx)($t,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,m.jsxs)(Ze,{children:[(0,m.jsx)(et,{variant:"danger",onClick:()=>{P.length>0&&Mt(!0)},children:"Clear"}),(0,m.jsx)(et,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==P.length)if(Et)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),_t(!0);try{const o=new Date,n={date:o,items:P,subtotal:Jo,discount:Zo,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,coupon:Ot?{code:Ot.code,discount:Ot.discount}:null,takeawayCharge:on,serviceCharge:nn,serviceChargeRate:u.serviceChargeRate,tax:Qo,taxRate:u.taxRate,total:Xo,paymentMethod:"Pending",amountReceived:0,change:0},r={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:fo?fo.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:fo?fo.phone:"POS Terminal",email:fo&&fo.email||"",type:fo?"member":"guest",customerId:null===fo||void 0===fo?void 0:fo.id,loyaltyTier:null===fo||void 0===fo?void 0:fo.loyaltyTier,points:null===fo||void 0===fo?void 0:fo.points},items:P.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:o.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Jo,tax:Qo,taxRate:u.taxRate,serviceCharge:nn,serviceChargeRate:u.serviceChargeRate,discount:Zo,coupon:Ot?{code:Ot.code,amount:Ot.discount}:void 0,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,takeawayCharge:on,total:Xo,paymentMethod:"Pending",paymentStatus:"pending",orderType:Ht,orderSource:"pos",tableNumber:"dine-in"===Ht&&Kt?Kt:void 0,pagerNumber:Zt||void 0,cashier_id:null!==t&&void 0!==t&&t.id?Number(t.id):null,cashier_name:(null===t||void 0===t?void 0:t.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",r.orderNumber);const s=await d(r,i?Number(i):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",s),H({...n,orderNumber:(null===s||void 0===s?void 0:s.order_number)||(null===s||void 0===s?void 0:s.orderNumber)||r.orderNumber,pickupNumber:(null===s||void 0===s?void 0:s.pickup_number)||(null===s||void 0===s?void 0:s.pickupNumber)||(null!==s&&void 0!==s&&s.order_number?s.order_number.split("-")[1]:r.pickupNumber),pagerNumber:(null===s||void 0===s?void 0:s.pager_number)||Zt||void 0,tableNumber:(null===s||void 0===s?void 0:s.table_number)||Kt||void 0,takeawayCharge:(null===s||void 0===s?void 0:s.takeaway_charge)||(null===s||void 0===s?void 0:s.takeawayCharge)||n.takeawayCharge,subtotal:(null===s||void 0===s?void 0:s.subtotal)||n.subtotal,tax:(null===s||void 0===s?void 0:s.tax)||n.tax,serviceCharge:(null===s||void 0===s?void 0:s.service_charge)||(null===s||void 0===s?void 0:s.serviceCharge)||n.serviceCharge,discount:(null===s||void 0===s?void 0:s.discount)||n.discount,discountPolicy:n.discountPolicy,coupon:n.coupon,pointsUsed:0,pointDiscount:0,total:(null===s||void 0===s?void 0:s.total)||n.total,cashierName:(null===t||void 0===t?void 0:t.name)||null}),Y(!0),T([]),It(0),Dt(null),Lt(null),Tt(""),Jt(""),eo(""),oo(""),jo(null),bo(""),console.log("POS - Order added without payment:",null===s||void 0===s?void 0:s.orderNumber)}catch(o){console.error("POS - Error adding order:",o),alert("Failed to create order. Please try again.")}finally{_t(!1)}var e}},children:"Pay Later"}),(0,m.jsx)(et,{variant:"primary",onClick:()=>{0!==P.length&&q(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,m.jsx)(a.A,{isOpen:L,onClose:()=>q(!1),total:Xo,subtotal:Jo,tax:Qo,serviceCharge:nn,takeawayCharge:on,discountAmount:Zo,couponDiscount:en,onConfirmPayment:async(e,o,n,r,i)=>{if(Et)return void console.warn("POS - Payment already in progress, ignoring duplicate call");_t(!0),console.log("POS - Processing payment for method:",e,"Points used:",r);const s=i?Xo-i:Xo;try{const a=new Date,l={date:a,items:P,subtotal:Jo,discount:Zo,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,coupon:Ot?{code:Ot.code,discount:Ot.discount}:null,takeawayCharge:on,serviceCharge:nn,serviceChargeRate:u.serviceChargeRate,tax:Qo,taxRate:u.taxRate,total:s,pointsUsed:r||0,pointDiscount:i||0,paymentMethod:e,amountReceived:o||s,change:n||0},c={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:fo?fo.name:"Walk-in Customer",phone:fo?fo.phone:"POS Terminal",email:fo&&fo.email||"",type:fo?"member":"guest",customerId:null===fo||void 0===fo?void 0:fo.id,loyaltyTier:null===fo||void 0===fo?void 0:fo.loyaltyTier,points:null===fo||void 0===fo?void 0:fo.points},items:P.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:a.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Jo,tax:Qo,taxRate:u.taxRate,serviceCharge:nn,serviceChargeRate:u.serviceChargeRate,discount:Zo,coupon:Ot?{code:Ot.code,amount:Ot.discount}:void 0,discountPolicy:Rt?{name:Rt.name,amount:Rt.discount}:void 0,takeawayCharge:on,total:s,points_used:r||null,point_discount:i||null,paymentMethod:e,paymentStatus:"completed",orderType:Ht,orderSource:"pos",tableNumber:"dine-in"===Ht&&Kt?Kt:void 0,pagerNumber:Zt||void 0,cashier_id:null!==t&&void 0!==t&&t.id?Number(t.id):null,cashier_name:(null===t||void 0===t?void 0:t.name)||null},p=await d(c,null!==t&&void 0!==t&&t.restaurantId?Number(t.restaurantId):void 0);if(fo&&j(fo.id,Xo),C){const e={...C.performance,ordersProcessed:C.performance.ordersProcessed+1};A(C.id,{totalSales:C.totalSales+Xo,totalShifts:C.totalShifts,performance:e})}H({...l,orderNumber:(null===p||void 0===p?void 0:p.order_number)||(null===p||void 0===p?void 0:p.orderNumber)||"",pickupNumber:(null===p||void 0===p?void 0:p.pickup_number)||(null===p||void 0===p?void 0:p.pickupNumber)||(null!==p&&void 0!==p&&p.order_number?p.order_number.split("-")[1]:null),tableNumber:(null===p||void 0===p?void 0:p.table_number)||Kt||void 0,pagerNumber:(null===p||void 0===p?void 0:p.pager_number)||Zt||void 0,takeawayCharge:(null===p||void 0===p?void 0:p.takeaway_charge)||(null===p||void 0===p?void 0:p.takeawayCharge)||l.takeawayCharge,subtotal:(null===p||void 0===p?void 0:p.subtotal)||l.subtotal,tax:(null===p||void 0===p?void 0:p.tax)||l.tax,serviceCharge:(null===p||void 0===p?void 0:p.service_charge)||(null===p||void 0===p?void 0:p.serviceCharge)||l.serviceCharge,discount:(null===p||void 0===p?void 0:p.discount)||l.discount,discountPolicy:l.discountPolicy,coupon:l.coupon,pointsUsed:l.pointsUsed||0,pointDiscount:l.pointDiscount||0,total:(null===p||void 0===p?void 0:p.total)||l.total,cashierName:(null===t||void 0===t?void 0:t.name)||null}),Y(!0),q(!1),T([]),It(0),Dt(null),Lt(null),Tt(""),Jt(""),eo(""),oo(""),jo(null),bo(""),console.log("POS - Payment processing completed:",null===p||void 0===p?void 0:p.orderNumber)}catch(a){console.error("POS - Error processing payment:",a),alert("Failed to process payment. Please try again.")}finally{_t(!1)}},paymentMethods:ho,taxRate:u.taxRate,serviceChargeRate:u.serviceChargeRate,taxEnabled:u.taxEnabled,serviceChargeEnabled:u.serviceChargeEnabled,cashierName:null===t||void 0===t?void 0:t.name,customerPoints:Po,customerTier:Oo,membershipSettings:Eo}),V&&(0,m.jsx)(l.A,{isOpen:M,onClose:()=>{U(!1),Nt(null)},menuItem:V,onConfirm:(e,t,o)=>{if(!V)return;let n=[...t];if(V.is_set_menu&&V.set_items&&V.set_items.length>0){n=[...V.set_items.map(e=>{const t=g.find(t=>parseInt(t.id)===e.menuItemId),o=null===t||void 0===t?void 0:t.code;return`${o?`${o} `:""}${e.name} x${e.quantity}`}),...t]}const r=n.sort().join(","),i=P.find(e=>{var t;return e.menuItem.id===V.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===r});T(i?P.map(t=>t.id===i.id?{...t,quantity:t.quantity+e}:t):[...P,{id:`order-${Date.now()}`,menuItem:V,quantity:e,options:n.length>0?n:void 0,selectedOptions:o}]),U(!1),Nt(null)}}),G&&(0,m.jsx)(O,{isOpen:W,onClose:()=>{Go()},orderData:G,onPrintBill:()=>{}}),(0,m.jsx)(J.A,{isOpen:qt,onClose:()=>Mt(!1),onConfirm:()=>{T([]),It(0),Dt(null),Lt(null),Tt(""),jo(null),bo(""),eo(""),oo(""),Mt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,m.jsx)(Q,{isOpen:Ut,onClose:()=>Wt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,m.jsx)(Q,{isOpen:Yt,onClose:()=>Gt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,m.jsx)(X.A,{isOpen:io,onClose:()=>so(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(It(t),Lt(null)),so(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,h.Qn)(So)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,m.jsx)(X.A,{isOpen:co,onClose:()=>po(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Lt({name:`${t}%`,discount:Jo*(t/100),requiresApproval:!1}),It(0)}po(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,m.jsx)(re.A,{}),(0,m.jsx)(K,{show:ao,onClose:()=>lo(!1),onVerified:e=>{e.token&&e.user&&o(e.token,e.user),lo(!1)},onLogout:()=>{n()},currentCashierName:null===t||void 0===t?void 0:t.name})]})})},2538:(e,t,o)=>{o.d(t,{A:()=>p});var n=o(8819),r=o(9950),i=o(9610),s=o(4752),a=o(4414);const l=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${n.w.colors.borderLight};
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }
`,d=s.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=s.Ay.div`
  color: ${n.w.colors.text.secondary};
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,p=e=>{let{isOpen:t,onClose:o,onConfirm:n,title:s,label:p,placeholder:u="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:b="Apply",cancelText:y="Cancel"}=e;const[v,f]=(0,r.useState)(""),[j,w]=(0,r.useState)(""),C=()=>{const e=parseFloat(v);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(n(v),f(""),w(""),o())},F=()=>{f(""),w(""),o()},k=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.yl,{variant:"secondary",onClick:F,children:y}),(0,a.jsx)(i.yl,{variant:"primary",onClick:C,disabled:!v||!!j||parseFloat(v)<x,children:b})]});return(0,a.jsx)(i.aF,{isOpen:t,onClose:F,title:s,footer:k,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(i.lR,{children:p}),(0,a.jsx)(l,{type:"text",value:v,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void w("");if(!/^\d*\.?\d*$/.test(t))return;const o=parseFloat(t);isNaN(o)||w(o<x?`Minimum value is ${x}${g}`:void 0!==h&&o>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&v&&C()}}),j&&(0,a.jsx)(d,{children:j}),!j&&void 0!==h&&(0,a.jsxs)(c,{children:["Enter a value between ",x,g," and ",h,g]})]})})}}}]);