"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2122],{1472:(e,t,n)=>{n.d(t,{A:()=>r});n(9950);var i=n(9610),o=n(4414);const r=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:s,message:a,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.yl,{variant:"secondary",onClick:n,children:d}),(0,o.jsx)(i.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:r,children:l})]});return(0,o.jsx)(i.aF,{isOpen:t,onClose:n,title:s,footer:p,children:(0,o.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,o.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,o.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:a})]})})}},2122:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Et});var i=n(9950),o=n(4752),r=n(4492),s=n(2966),a=n(9189),l=n(9610),d=n(2159),c=n(9018),p=n(5863),u=n(8406),x=n(6038),h=n(4414);const m=o.DU`
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
`,g=o.Ay.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`,b=o.Ay.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,y=o.Ay.span`
  color: #6B7280;
`,f=o.Ay.span`
  font-weight: 500;
  color: #1F2937;
`,j=o.Ay.div`
  margin-bottom: 20px;
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,C=o.Ay.div`
  flex: 1;
`,w=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,k=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,A=o.Ay.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`,B=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,S=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`,E=o.Ay.div`
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
`,N=o.Ay.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`,z=o.Ay.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`,I=o.Ay.div`
  margin: 10px 0;
  padding: 5px 0;
`,_=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`,P=o.Ay.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`,T=o.Ay.button`
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
`,$=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:$,onPrintBill:O}=e;const{getStoreInfo:D,operationSettings:R}=(0,c.Pj)(),L=D(),q=e=>(0,u.r6)(e,R),M=async()=>{await(0,p.pG)($,L)&&setTimeout(()=>{O()},100)},U=async()=>{await(0,p.Si)($,L)},W=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:M,children:"Print Bill"}),(0,h.jsx)(l.yl,{variant:"secondary",onClick:U,children:"Print Order Ticket"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:a,children:"Close"})]}),G=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(T,{onClick:M,title:"Print Bill",children:[(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,h.jsx)("span",{children:"Bill"})]}),(0,h.jsxs)(T,{onClick:U,title:"Print Order Ticket",children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,h.jsx)("span",{children:"Ticket"})]})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{}),(0,h.jsxs)(l.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:W,headerActions:G,children:[(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsxs)(g,{children:["Order ",$.orderNumber]}),$.pagerNumber?(0,h.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pagerNumber})]}):(0,h.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pickupNumber||(null!==(t=$.orderNumber)&&void 0!==t&&t.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Date & Time"}),(0,h.jsx)(f,{children:q($.date)})]}),$.cashierName&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Cashier"}),(0,h.jsx)(f,{children:$.cashierName})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Payment Method"}),(0,h.jsx)(f,{children:$.paymentMethod})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Amount Received"}),(0,h.jsx)(f,{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Change"}),(0,h.jsx)(f,{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsx)(S,{children:"Order Items"}),(0,h.jsx)(j,{children:$.items.map((e,t)=>(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(w,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,h.jsx)(k,{children:e.options.join(", ")})]}),(0,h.jsxs)(A,{children:[e.quantity,"x"]}),(0,h.jsx)(B,{children:(0,x.vv)(e.menuItem.price*e.quantity,R.currency)})]},t))})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Subtotal"}),(0,h.jsx)(f,{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Takeaway Charge"}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Discount"}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Discount (",$.discountPolicy.name,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Coupon (",$.coupon.code,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Points (",null===(n=$.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Service Charge (",$.serviceChargeRate||10,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Tax (",$.taxRate||6,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.tax),R.currency)})]})]}),(0,h.jsxs)(d.i_,{style:{marginTop:0},children:[(0,h.jsx)(d.nJ,{children:"Total"}),(0,h.jsx)(d.aX,{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(E,{id:"order-complete-bill-print",children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(z,{children:L.name}),(0,h.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[L.address,(0,h.jsx)("br",{}),"Tel: ",L.phone,(0,h.jsx)("br",{}),"GST Reg No: ",L.gstRegNo]})]}),(0,h.jsxs)(I,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Order No:"}),(0,h.jsx)("span",{children:$.orderNumber})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Date:"}),(0,h.jsx)("span",{children:q($.date)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Cashier:"}),(0,h.jsx)("span",{children:$.cashierName||"POS Terminal"})]}),(0,h.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",$.pickupNumber||(null!==(o=$.orderNumber)&&void 0!==o&&o.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"]}),$.pagerNumber&&(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",$.pagerNumber]})]}),(0,h.jsx)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,h.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,h.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,h.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,h.jsx)("tbody",{children:$.items.map((e,t)=>(0,h.jsx)(i.Fragment,{children:(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,h.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,h.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,h.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,h.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Subtotal:"}),(0,h.jsx)("span",{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Takeaway Charge:"}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Discount:"}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Discount (",$.discountPolicy.name,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Coupon (",$.coupon.code,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Points (",null===(r=$.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Service Charge (",$.serviceChargeRate||10,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Tax (",$.taxRate||6,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.tax),R.currency)})]}),(0,h.jsxs)(_,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,h.jsx)("span",{children:"TOTAL:"}),(0,h.jsx)("span",{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Payment Method:"}),(0,h.jsx)("span",{children:$.paymentMethod.toUpperCase()})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Amount Received:"}),(0,h.jsx)("span",{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Change:"}),(0,h.jsx)("span",{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,h.jsx)("div",{children:"Thank you for your purchase!"}),(0,h.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},O=o.Ay.div`
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
`,D=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 360px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`,R=o.Ay.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  text-align: center;
  margin: 0 0 4px;
`,L=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  text-align: center;
  margin: 0 0 24px;
`,q=o.Ay.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
`,M=o.Ay.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${e=>e.error?"#DC2626":e.filled?"#635BFF":"#E6EBF1"};
  background: ${e=>e.error?"#DC2626":e.filled?"#635BFF":"transparent"};
  transition: all 0.15s;
`,U=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
`,W=o.Ay.button`
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
`,G=o.Ay.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,Y=o.Ay.button`
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
`,H=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 20px;
`,V=e=>{let{show:t,onClose:n,onVerified:o,onLogout:r,currentCashierName:s}=e;const[a,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(""),[p,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,i.useCallback)(async e=>{u(!0),c("");try{const t=localStorage.getItem("auth_token"),n=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),i=await n.json();i.success&&i.token&&i.user?o({data:i.data,token:i.token,user:i.user}):i.success?o({data:i.data,token:"",user:i.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{u(!1)}},[o]),m=(0,i.useCallback)(e=>{if(p)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,p,x]);return(0,i.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?m(e.key):"Backspace"===e.key?m("backspace"):"Escape"===e.key&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,m,n]),t?(0,h.jsx)(O,{show:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,h.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(R,{children:"Switch Cashier"}),(0,h.jsx)(L,{children:"Enter 4-digit PIN to switch"}),s&&(0,h.jsxs)(H,{children:["Current: ",s]}),(0,h.jsx)(q,{children:[0,1,2,3].map(e=>(0,h.jsx)(M,{filled:a.length>e,error:!!d},e))}),(0,h.jsx)(G,{children:d}),(0,h.jsxs)(U,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,h.jsx)(W,{onClick:()=>m(e),children:e},e)),(0,h.jsx)(W,{variant:"action",onClick:()=>m("backspace"),children:"\u232b"}),(0,h.jsx)(W,{onClick:()=>m("0"),children:"0"}),(0,h.jsx)(W,{variant:"action",onClick:n,children:"Close"})]}),r&&(0,h.jsx)(Y,{onClick:r,children:"Logout"})]})}):null};var K=n(1472);const J=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,h.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,h.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,h.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var Q=n(2538),X=n(447),Z=n(8930),ee=n(9037),te=n(5781),ne=n(1367),ie=n(2420);const oe=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`,re=o.Ay.div`
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
`,se=o.Ay.div`
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
`,ae=o.Ay.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`,le=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`,de=o.Ay.div`
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
`,ce=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;
`,pe=o.Ay.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`,ue=o.Ay.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,xe=o.Ay.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,he=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,me=o.Ay.input`
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
`,ge=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,be=o.Ay.button`
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
`,ve=o.Ay.div`
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
`,ye=o.Ay.div`
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
`,fe=o.Ay.button`
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
`,je=o.Ay.div`
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
`,Fe=o.Ay.div`
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
`,Ce=o.Ay.div`
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
`,we=o.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`,ke=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`,Ae=o.Ay.div`
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
`,Be=o.Ay.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`,Se=o.Ay.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`,Ee=o.Ay.button`
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
`,Ne=o.Ay.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`,ze=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`,Ie=o.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`,_e=o.Ay.select`
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
`,Pe=o.Ay.div`
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
`,Te=o.Ay.div`
  padding: 16px 24px;
`,$e=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Oe=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`,De=o.Ay.div`
  flex: 1;
`,Re=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Le=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,qe=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Me=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ue=o.Ay.button`
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
`,We=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`,Ge=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ye=o.Ay.button`
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
`,He=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,Ve=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Ke=o.Ay.span`
  color: #6B7C93;
`,Je=o.Ay.span`
  font-weight: 500;
  color: #0A2540;
`,Qe=(0,o.Ay)(Ve)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${Ke} {
    color: #0A2540;
  }
  
  ${Je} {
    color: #635BFF;
  }
`,Xe=o.Ay.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`,Ze=o.Ay.button`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          \n          &:hover {\n            background: #5243E0;\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n          \n          &:active {\n            transform: translateY(0);\n          }\n        ";case"danger":return"\n          background: #FFE6E6;\n          color: #FF6B6B;\n          \n          &:hover {\n            background: #FFD9D9;\n          }\n        ";default:return"\n          background: white;\n          color: #6B7C93;\n          border: 1px solid #E6EBF1;\n          \n          &:hover {\n            border-color: #C7D2FE;\n            color: #635BFF;\n          }\n        "}}}
`,et=o.Ay.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`,tt=o.Ay.div`
  font-size: 14px;
`,nt=o.Ay.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`,it=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,ot=o.Ay.input`
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
`,rt=o.Ay.button`
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
`,st=o.Ay.div`
  display: flex;
  gap: 8px;
`,at=o.Ay.button`
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
`,lt=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`,dt=o.Ay.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,ct=o.Ay.button`
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
`,pt=o.Ay.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`,ut=o.Ay.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`,xt=o.Ay.div`
  position: relative;
`,ht=o.Ay.input`
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
`,mt=o.Ay.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`,gt=o.Ay.div`
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
`,bt=o.Ay.div`
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
`,vt=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`,yt=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,ft=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`,jt=o.Ay.div`
  flex: 1;
`,Ft=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`,Ct=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,wt=o.Ay.div`
  position: relative;
  width: 140px;
`,kt=o.Ay.input`
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
`,At=o.Ay.div`
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
`,Bt=o.Ay.div`
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
`,St=o.Ay.button`
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
`,Et=(o.Ay.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
`,o.Ay.button`
  padding: 12px 20px;
  background: #F6F9FC;
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
    border-color: #635BFF;
    color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
  }
`,()=>{const e=(0,r.Zp)(),[t]=(0,r.ok)(),n=t.get("from")||"",o="floor-plan"===n||"floor-plan-overlay"===n,l="floor-plan-overlay"===n,d=t.get("table"),{user:p,switchUser:u,logout:m}=(0,ne.As)(),g=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,ne.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:b}=(0,X.h)(),{getTakeawayCharge:v,operationSettings:y}=(0,c.Pj)(),{categories:f,menuItems:j,getItemsByCategory:F,loadMenuByCategory:C,isLoadingMenu:w}=(0,Z.b)(),k=f.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:A,searchCustomers:B}=(0,ee.c)(),{currentStaff:S,isLoggedIn:E,logout:N,updateStaff:z}=(0,te.g)(),[I,_]=(0,i.useState)(null),[P,T]=(0,i.useState)(null),[O,D]=(0,i.useState)(""),[R,L]=(0,i.useState)(!1),[q,M]=(0,i.useState)([]),[U,W]=(0,i.useState)(new Date),[G,Y]=(0,i.useState)(!1),[H,Et]=(0,i.useState)(!1),[Nt,zt]=(0,i.useState)(!1),[It,_t]=(0,i.useState)(null),[Pt,Tt]=(0,i.useState)(null),[$t,Ot]=(0,i.useState)(0),[Dt,Rt]=(0,i.useState)(!1),[Lt,qt]=(0,i.useState)(""),[Mt,Ut]=(0,i.useState)(null),[Wt,Gt]=(0,i.useState)(null),[Yt,Ht]=(0,i.useState)(!1),[Vt,Kt]=(0,i.useState)(!1),[Jt,Qt]=(0,i.useState)(!1),[Xt,Zt]=(0,i.useState)("dine-in"),[en,tn]=(0,i.useState)(""),[nn,on]=(0,i.useState)(0),[rn,sn]=(0,i.useState)([]),[an,ln]=(0,i.useState)(""),[dn,cn]=(0,i.useState)(""),[pn,un]=(0,i.useState)(!1),[xn,hn]=(0,i.useState)(!1),[mn,gn]=(0,i.useState)(!1),[bn,vn]=(0,i.useState)(!1),[yn,fn]=(0,i.useState)(""),[jn,Fn]=(0,i.useState)(null),[Cn,wn]=(0,i.useState)(""),[kn,An]=(0,i.useState)(!1),[Bn,Sn]=(0,i.useState)(null),[En,Nn]=(0,i.useState)([]),[zn,In]=(0,i.useState)(!1),_n=(0,i.useRef)(null),[Pn,Tn]=(0,i.useState)("RM"),[$n,On]=(0,i.useState)(null),[Dn,Rn]=(0,i.useState)("cash_only"),[Ln,qn]=(0,i.useState)(null),[Mn,Un]=(0,i.useState)(0),[Wn,Gn]=(0,i.useState)("Bronze"),[Yn,Hn]=(0,i.useState)(40),Vn=(0,i.useRef)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?fn(t.brand_logo):t.brandLogo?fn(t.brandLogo):t.logo&&fn(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{if(k.length>0&&null===I){const e=k[0].id;_(e),C(e)}},[k,I,C]);(0,i.useEffect)(()=>{var e;k.length>0&&I&&!R&&!k.find(e=>e.id===I)&&_((null===(e=k[0])||void 0===e?void 0:e.id)||null)},[k,I,R]),(0,i.useEffect)(()=>{const e=setInterval(()=>{W(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==p&&void 0!==p&&p.restaurantId)try{const e=await fetch(`/api/restaurants/${p.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);sn(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===p||void 0===p?void 0:p.restaurantId]),(0,i.useEffect)(()=>{d&&rn.length>0&&rn.includes(d)&&(tn(d),Zt("dine-in"))},[d,rn]),(0,i.useEffect)(()=>{(async()=>{if(null!==p&&void 0!==p&&p.restaurantId)try{const e=await fetch(`/api/restaurants/${p.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&Fn(n.payment_settings),Tn(n.currency||"RM"),On(n.cash_rounding?parseFloat(n.cash_rounding):null),Rn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===p||void 0===p?void 0:p.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==p&&void 0!==p&&p.restaurantId)try{const e=await fetch(`/api/membership/settings/${p.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(qn(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===p||void 0===p?void 0:p.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==p&&void 0!==p&&p.restaurantId&&null!==Bn&&void 0!==Bn&&Bn.id)try{const e=await fetch(`/api/membership/customer/${p.restaurantId}/${Bn.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(Un(t.data.points||0),Gn(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else Un(0),Gn("Bronze")})()},[null===p||void 0===p?void 0:p.restaurantId,null===Bn||void 0===Bn?void 0:Bn.id]);const Kn=(()=>{let e=[];if(R){const t=O.toLowerCase().trim();e=j.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else I&&(e=F(I));return e})(),Jn=Kn.length>50;(0,i.useEffect)(()=>{Hn(40)},[I,O]),(0,i.useEffect)(()=>{if(!Jn)return;const e=Vn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Hn(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Jn,Yn,Kn.length]);const Qn=(e,t)=>{M(q.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},Xn=()=>{const e=y.pagerSystem.totalPagers,t=dn.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Zn=()=>{M([]),Ot(0),Ut(null),Gt(null),qt(""),Sn(null),wn(""),Zt("dine-in"),tn(""),on(0),ln(""),cn(""),D(""),_("all"),Ht(!1),Y(!1),Et(!1),zt(!1),_t(null),Tt(null)},ei=e=>{$t===e?(Ot(0),Gt(null)):Ot(e)},ti=async()=>{if(Lt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},body:JSON.stringify({code:Lt.toUpperCase(),restaurant_id:null===p||void 0===p?void 0:p.restaurantId,order_amount:ii,order_type:Xt,customer_id:(null===Bn||void 0===Bn?void 0:Bn.id)||null})});if(!e.ok)return void Qt(!0);const t=await e.json();t.valid&&t.data?(Ut({code:Lt.toUpperCase(),discount:t.data.discountAmount}),qt("")):Qt(!0)}catch(e){console.error("Coupon validation error:",e),Qt(!0)}},ni=e=>{if(Wt&&Wt.name===e)return Gt(null),void Ot(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=ii*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Gt({name:e,discount:i,requiresApproval:!0}),Ot(0)}else Gt({name:e,discount:i,requiresApproval:!1}),Ot(0)}},{subtotal:ii,tax:oi,total:ri,discountAmount:si,couponDiscount:ai,policyDiscount:li,takeawayCharge:di,serviceCharge:ci}=(()=>{const e=q.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Xt&&y.takeawayPricing.enabled)if("per-item"===y.takeawayPricing.pricingType){const e=q.reduce((e,t)=>e+t.quantity,0);t=e*y.takeawayPricing.perItemCharge}else q.forEach(e=>{const n=v(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=$t,o=Mt?Mt.discount:0,r=Wt?Wt.discount:0,s=Math.max(0,n-i-o-r),a=y.serviceChargeEnabled?s*(y.serviceChargeRate/100):0,l=y.taxEnabled?s*(y.taxRate/100):0,d=s+a+l;let c=d;return"all"===Dn&&$n&&(c=Math.round(d/$n)*$n),{subtotal:e,tax:l,total:c,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),pi=(()=>{if(!Cn.trim())return[];if(En.length>0)return En;return B(Cn).slice(0,10)})();return(0,h.jsxs)(oe,{children:[(0,h.jsxs)(re,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,h.jsx)(se,{onClick:Zn,children:yn?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ae,{src:yn,alt:"Brand Logo"}),(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,h.jsx)("button",{onClick:()=>e(`/restaurant/${g}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,h.jsxs)(le,{children:[(0,h.jsxs)(de,{clickable:!0,onClick:()=>gn(!0),title:"Click to switch cashier",children:[(0,h.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,h.jsxs)("span",{children:["Cashier: ",(null===p||void 0===p?void 0:p.name)||"Staff"]}),(0,h.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,h.jsx)(ce,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(U)})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsxs)(ue,{children:[(0,h.jsx)(xe,{children:(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{children:"\ud83d\udd0d"}),(0,h.jsx)(me,{type:"text",placeholder:"Search menu items...",value:O,onChange:e=>(e=>{if(D(e),e.trim())R||(T(I),L(!0),_(null),C("all"));else if(R){var t;L(!1);const e=P||(null===(t=k[0])||void 0===t?void 0:t.id)||null;_(e),T(null)}})(e.target.value)}),O&&(0,h.jsx)(be,{onClick:()=>{if(D(""),R){var e;L(!1);const t=P||(null===(e=k[0])||void 0===e?void 0:e.id)||null;_(t),T(null)}},title:"Clear search",children:"\xd7"})]})}),(0,h.jsx)(ye,{children:k.map(e=>(0,h.jsxs)(fe,{active:I===e.id&&!R,onClick:()=>{return t=e.id,R&&(L(!1),D("")),_(t),void C(t);var t},children:[e.emoji," ",e.name]},e.id))}),R&&(0,h.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("span",{children:"\ud83d\udd0d"}),(0,h.jsxs)("span",{children:['Search results for "',O,'" (',Kn.length," items)"]})]}),(0,h.jsx)(je,{children:Kn.length>0?(0,h.jsxs)(h.Fragment,{children:[(Jn?Kn.slice(0,Yn):Kn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,h.jsxs)(Fe,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=j.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=q.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?M(q.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):M([...q,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,h.jsx)(Ae,{children:"SET"}),(0,h.jsx)(Ce,{hasImage:!!e.image,children:e.image?(0,h.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,h.jsxs)(we,{children:[e.code?`${e.code} `:"",e.name]}),(0,h.jsxs)(ke,{children:[Pn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,h.jsx)(Be,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,h.jsx)(Se,{children:(0,h.jsx)(Ee,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(Tt(e),Et(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Jn&&Yn<Kn.length&&(0,h.jsx)("div",{ref:Vn,style:{gridColumn:"1 / -1",height:"20px"}})]}):w?(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\u23f3"}),(0,h.jsx)("div",{className:"title",children:"Loading..."})]}):(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsx)("div",{className:"title",children:R?`No results for "${O}"`:"No items in this category"}),(0,h.jsx)("div",{className:"message",children:R?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,h.jsxs)(Ne,{children:[(0,h.jsxs)(dt,{children:[(0,h.jsx)(ct,{active:"dine-in"===Xt,onClick:()=>Zt("dine-in"),children:"Dine In"}),(0,h.jsx)(ct,{active:"takeaway"===Xt,onClick:()=>Zt("takeaway"),children:"Takeaway"})]}),(0,h.jsx)(ut,{children:Bn?(0,h.jsxs)(ft,{children:[(0,h.jsxs)(jt,{children:[(0,h.jsx)(Ft,{children:Bn.name}),(0,h.jsxs)(Ct,{children:[Bn.phone&&`${Bn.phone} \u2022 `,Bn.id]})]}),(0,h.jsx)(St,{onClick:()=>{Sn(null),wn(""),Nn([]),Ut(null),qt("")},children:"Clear"})]}):(0,h.jsxs)(xt,{children:[(0,h.jsx)(mt,{children:"\ud83d\udd0d"}),(0,h.jsx)(ht,{type:"text",placeholder:"Walk-in Customer",value:Cn,onChange:e=>{const t=e.target.value;wn(t),An(t.trim().length>0),_n.current&&clearTimeout(_n.current),t.trim().length>=2?_n.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==p&&void 0!==p&&p.restaurantId){In(!0);try{const t=await fetch(`/api/customers/${p.restaurantId}?search=${encodeURIComponent(e)}`);if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});Nn(t.slice(0,10))}}}catch(t){console.error("Customer search error:",t)}finally{In(!1)}}else Nn([])})(t)},300):Nn([])},onFocus:()=>{Cn.trim()&&An(!0)},onBlur:()=>setTimeout(()=>An(!1),200)}),(0,h.jsx)(gt,{show:kn&&pi.length>0,children:pi.map(e=>(0,h.jsxs)(bt,{onClick:()=>(e=>{Sn(e),wn(""),An(!1),Nn([])})(e),children:[(0,h.jsx)(vt,{children:e.name}),(0,h.jsxs)(yt,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,h.jsx)(gt,{show:kn&&Cn.trim().length>0&&0===pi.length&&!zn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,h.jsx)(gt,{show:kn&&zn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Xt&&rn.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Table Number:"}),(0,h.jsxs)(_e,{value:en,onChange:e=>tn(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Free Seating"}),rn.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]}),en&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(Ie,{children:"Guests:"}),(0,h.jsxs)(_e,{value:nn,onChange:e=>on(Number(e.target.value)),style:{width:"80px"},children:[(0,h.jsx)("option",{value:0,children:"-"}),[1,2,3,4,5,6,7,8,9,10,12,15,20].map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]})]}),0===q.length?(0,h.jsxs)(et,{children:[(0,h.jsx)(tt,{children:"No items in order"}),(0,h.jsx)(tt,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,h.jsxs)(Pe,{children:[(0,h.jsxs)(Te,{children:[(0,h.jsxs)($e,{children:[q.length," ",1===q.length?"item":"items"]}),q.map(e=>(0,h.jsxs)(Oe,{children:[(0,h.jsxs)(De,{children:[(0,h.jsxs)(Re,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,h.jsxs)(h.Fragment,{children:[t.length>0&&(0,h.jsx)(Le,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,h.jsxs)(Le,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,h.jsxs)(qe,{children:[(0,h.jsxs)(Me,{children:[(0,h.jsx)(Ue,{onClick:()=>Qn(e.id,-1),children:"-"}),(0,h.jsx)(We,{children:e.quantity}),(0,h.jsx)(Ue,{onClick:()=>Qn(e.id,1),children:"+"})]}),(0,h.jsxs)(Ge,{children:[Pn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,h.jsx)(Ye,{onClick:()=>{return t=e.id,void M(q.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,h.jsxs)(He,{children:[(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Subtotal"}),(0,h.jsxs)(Je,{children:[Pn," ",ii.toFixed(2)]})]}),di>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Takeaway Charge"}),(0,h.jsxs)(Je,{children:[Pn," ",di.toFixed(2)]})]}),si>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Discount"}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Pn," ",si.toFixed(2)]})]}),Mt&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Coupon (",Mt.code,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Pn," ",ai.toFixed(2)]})]}),Wt&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Discount (",Wt.name,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Pn," ",li.toFixed(2)]})]}),y.serviceChargeEnabled&&ci>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Service Charge (",y.serviceChargeRate,"%)"]}),(0,h.jsxs)(Je,{children:[Pn," ",ci.toFixed(2)]})]}),y.taxEnabled&&oi>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Tax (",y.taxRate,"%)"]}),(0,h.jsxs)(Je,{children:[Pn," ",oi.toFixed(2)]})]}),(0,h.jsxs)(Qe,{children:[(0,h.jsx)(Ke,{children:"Total"}),(0,h.jsxs)(Je,{children:[Pn," ",ri.toFixed(2)]})]})]}),(0,h.jsxs)(nt,{children:[(0,h.jsx)(it,{children:Mt?(0,h.jsxs)(lt,{children:[(0,h.jsxs)("span",{children:["Coupon: ",Mt.code," (-",Pn," ",Mt.discount.toFixed(2),")"]}),(0,h.jsx)(pt,{onClick:()=>{Ut(null)},children:"\xd7"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ot,{type:"text",placeholder:"Enter coupon code",value:Lt,onChange:e=>qt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&ti()}),(0,h.jsx)(rt,{onClick:ti,disabled:!Lt,children:"Apply Coupon"})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsxs)(at,{active:5===$t,onClick:()=>ei(5),children:[y.currency," 5"]}),(0,h.jsxs)(at,{active:10===$t,onClick:()=>ei(10),children:[y.currency," 10"]}),(0,h.jsxs)(at,{active:15===$t,onClick:()=>ei(15),children:[y.currency," 15"]}),(0,h.jsxs)(at,{onClick:()=>hn(!0),children:["Custom ",y.currency]})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsx)(at,{active:"Staff"===(null===Wt||void 0===Wt?void 0:Wt.name),onClick:()=>ni("Staff"),children:"20%"}),(0,h.jsx)(at,{active:"VIP"===(null===Wt||void 0===Wt?void 0:Wt.name),onClick:()=>ni("VIP"),children:"15%"}),(0,h.jsx)(at,{onClick:()=>vn(!0),children:"Custom %"})]})})]})]}),y.pagerSystem.enabled&&q.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Pager Number:"}),(0,h.jsxs)(wt,{children:[(0,h.jsx)(kt,{type:"text",value:dn,onChange:e=>{const t=e.target.value;cn(t),ln(t),t.trim()?un(!0):un(!1)},onFocus:()=>{!dn.trim()&&an||un(!0)},onBlur:()=>setTimeout(()=>un(!1),200),placeholder:an?`#${an}`:"Type or click..."}),(0,h.jsx)(At,{show:pn,children:Xn().length>0?Xn().map(e=>(0,h.jsxs)(Bt,{onClick:()=>{return ln((t=e).toString()),cn(t.toString()),void un(!1);var t},children:["Pager #",e]},e)):(0,h.jsx)(Bt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,h.jsxs)(Xe,{children:[(0,h.jsx)(Ze,{variant:"danger",onClick:()=>{q.length>0&&Ht(!0)},children:"Clear"}),(0,h.jsx)(Ze,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==q.length)if(Dt)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),Rt(!0);try{const t=new Date,n={date:t,items:q,subtotal:ii,discount:si,discountPolicy:Wt?{name:Wt.name,amount:Wt.discount}:void 0,coupon:Mt?{code:Mt.code,discount:Mt.discount}:null,takeawayCharge:di,serviceCharge:ci,serviceChargeRate:y.serviceChargeRate,tax:oi,taxRate:y.taxRate,total:ri,paymentMethod:"Pending",amountReceived:0,change:0},i={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Bn?Bn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:Bn?Bn.phone:"POS Terminal",email:Bn&&Bn.email||"",type:Bn?"member":"guest",customerId:null===Bn||void 0===Bn?void 0:Bn.id,loyaltyTier:null===Bn||void 0===Bn?void 0:Bn.loyaltyTier,points:null===Bn||void 0===Bn?void 0:Bn.points},items:q.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:ii,tax:oi,taxRate:y.taxRate,serviceCharge:ci,serviceChargeRate:y.serviceChargeRate,discount:si,coupon:Mt?{code:Mt.code,amount:Mt.discount}:void 0,discountPolicy:Wt?{name:Wt.name,amount:Wt.discount}:void 0,takeawayCharge:di,total:ri,paymentMethod:"Pending",paymentStatus:"pending",orderType:Xt,orderSource:"pos",tableNumber:"dine-in"===Xt&&en?en:void 0,guest_count:"dine-in"===Xt&&nn>0?nn:null,pagerNumber:an||void 0,cashier_id:null!==p&&void 0!==p&&p.id?Number(p.id):null,cashier_name:(null===p||void 0===p?void 0:p.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",i.orderNumber);const o=await b(i,g?Number(g):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",o),_t({...n,orderNumber:(null===o||void 0===o?void 0:o.order_number)||(null===o||void 0===o?void 0:o.orderNumber)||i.orderNumber,pickupNumber:(null===o||void 0===o?void 0:o.pickup_number)||(null===o||void 0===o?void 0:o.pickupNumber)||(null!==o&&void 0!==o&&o.order_number?o.order_number.split("-")[1]:i.pickupNumber),pagerNumber:(null===o||void 0===o?void 0:o.pager_number)||an||void 0,tableNumber:(null===o||void 0===o?void 0:o.table_number)||en||void 0,takeawayCharge:(null===o||void 0===o?void 0:o.takeaway_charge)||(null===o||void 0===o?void 0:o.takeawayCharge)||n.takeawayCharge,subtotal:(null===o||void 0===o?void 0:o.subtotal)||n.subtotal,tax:(null===o||void 0===o?void 0:o.tax)||n.tax,serviceCharge:(null===o||void 0===o?void 0:o.service_charge)||(null===o||void 0===o?void 0:o.serviceCharge)||n.serviceCharge,discount:(null===o||void 0===o?void 0:o.discount)||n.discount,discountPolicy:n.discountPolicy,coupon:n.coupon,pointsUsed:0,pointDiscount:0,total:(null===o||void 0===o?void 0:o.total)||n.total,cashierName:(null===p||void 0===p?void 0:p.name)||null}),zt(!0),M([]),Ot(0),Ut(null),Gt(null),qt(""),tn(""),on(0),ln(""),cn(""),Sn(null),wn(""),console.log("POS - Order added without payment:",null===o||void 0===o?void 0:o.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{Rt(!1)}var e}},children:"Pay Later"}),(0,h.jsx)(Ze,{variant:"primary",onClick:()=>{0!==q.length&&Y(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,h.jsx)(s.A,{isOpen:G,onClose:()=>Y(!1),total:ri,subtotal:ii,tax:oi,serviceCharge:ci,takeawayCharge:di,discountAmount:si,couponDiscount:ai,onConfirmPayment:async(e,t,n,i,o)=>{if(Dt)return void console.warn("POS - Payment already in progress, ignoring duplicate call");Rt(!0),console.log("POS - Processing payment for method:",e,"Points used:",i);const r=o?ri-o:ri;try{const s=new Date,a={date:s,items:q,subtotal:ii,discount:si,discountPolicy:Wt?{name:Wt.name,amount:Wt.discount}:void 0,coupon:Mt?{code:Mt.code,discount:Mt.discount}:null,takeawayCharge:di,serviceCharge:ci,serviceChargeRate:y.serviceChargeRate,tax:oi,taxRate:y.taxRate,total:r,pointsUsed:i||0,pointDiscount:o||0,paymentMethod:e,amountReceived:t||r,change:n||0},l={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Bn?Bn.name:"Walk-in Customer",phone:Bn?Bn.phone:"POS Terminal",email:Bn&&Bn.email||"",type:Bn?"member":"guest",customerId:null===Bn||void 0===Bn?void 0:Bn.id,loyaltyTier:null===Bn||void 0===Bn?void 0:Bn.loyaltyTier,points:null===Bn||void 0===Bn?void 0:Bn.points},items:q.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:ii,tax:oi,taxRate:y.taxRate,serviceCharge:ci,serviceChargeRate:y.serviceChargeRate,discount:si,coupon:Mt?{code:Mt.code,amount:Mt.discount}:void 0,discountPolicy:Wt?{name:Wt.name,amount:Wt.discount}:void 0,takeawayCharge:di,total:r,points_used:i||null,point_discount:o||null,paymentMethod:e,paymentStatus:"completed",orderType:Xt,orderSource:"pos",tableNumber:"dine-in"===Xt&&en?en:void 0,guest_count:"dine-in"===Xt&&nn>0?nn:null,pagerNumber:an||void 0,cashier_id:null!==p&&void 0!==p&&p.id?Number(p.id):null,cashier_name:(null===p||void 0===p?void 0:p.name)||null},d=await b(l,null!==p&&void 0!==p&&p.restaurantId?Number(p.restaurantId):void 0);if(Bn&&A(Bn.id,ri),S){const e={...S.performance,ordersProcessed:S.performance.ordersProcessed+1};z(S.id,{totalSales:S.totalSales+ri,totalShifts:S.totalShifts,performance:e})}_t({...a,orderNumber:(null===d||void 0===d?void 0:d.order_number)||(null===d||void 0===d?void 0:d.orderNumber)||"",pickupNumber:(null===d||void 0===d?void 0:d.pickup_number)||(null===d||void 0===d?void 0:d.pickupNumber)||(null!==d&&void 0!==d&&d.order_number?d.order_number.split("-")[1]:null),tableNumber:(null===d||void 0===d?void 0:d.table_number)||en||void 0,pagerNumber:(null===d||void 0===d?void 0:d.pager_number)||an||void 0,takeawayCharge:(null===d||void 0===d?void 0:d.takeaway_charge)||(null===d||void 0===d?void 0:d.takeawayCharge)||a.takeawayCharge,subtotal:(null===d||void 0===d?void 0:d.subtotal)||a.subtotal,tax:(null===d||void 0===d?void 0:d.tax)||a.tax,serviceCharge:(null===d||void 0===d?void 0:d.service_charge)||(null===d||void 0===d?void 0:d.serviceCharge)||a.serviceCharge,discount:(null===d||void 0===d?void 0:d.discount)||a.discount,discountPolicy:a.discountPolicy,coupon:a.coupon,pointsUsed:a.pointsUsed||0,pointDiscount:a.pointDiscount||0,total:(null===d||void 0===d?void 0:d.total)||a.total,cashierName:(null===p||void 0===p?void 0:p.name)||null}),zt(!0),Y(!1),M([]),Ot(0),Ut(null),Gt(null),qt(""),tn(""),on(0),ln(""),cn(""),Sn(null),wn(""),console.log("POS - Payment processing completed:",null===d||void 0===d?void 0:d.orderNumber)}catch(s){console.error("POS - Error processing payment:",s),alert("Failed to process payment. Please try again.")}finally{Rt(!1)}},paymentMethods:jn,taxRate:y.taxRate,serviceChargeRate:y.serviceChargeRate,taxEnabled:y.taxEnabled,serviceChargeEnabled:y.serviceChargeEnabled,cashierName:null===p||void 0===p?void 0:p.name,customerPoints:Mn,customerTier:Wn,membershipSettings:Ln}),Pt&&(0,h.jsx)(a.A,{isOpen:H,onClose:()=>{Et(!1),Tt(null)},menuItem:Pt,onConfirm:(e,t,n)=>{if(!Pt)return;let i=[...t];if(Pt.is_set_menu&&Pt.set_items&&Pt.set_items.length>0){i=[...Pt.set_items.map(e=>{const t=j.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=q.find(e=>{var t;return e.menuItem.id===Pt.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});M(r?q.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...q,{id:`order-${Date.now()}`,menuItem:Pt,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),Et(!1),Tt(null)}}),It&&(0,h.jsx)($,{isOpen:Nt,onClose:()=>{Zn(),l&&window.parent!==window?window.parent.postMessage({type:"pos-order-complete"},"*"):o&&e(`/restaurant/${g}/floor-plan`)},orderData:It,onPrintBill:()=>{}}),(0,h.jsx)(K.A,{isOpen:Yt,onClose:()=>Ht(!1),onConfirm:()=>{M([]),Ot(0),Ut(null),Gt(null),qt(""),Sn(null),wn(""),ln(""),cn(""),Ht(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,h.jsx)(J,{isOpen:Vt,onClose:()=>Kt(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,h.jsx)(J,{isOpen:Jt,onClose:()=>Qt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,h.jsx)(Q.A,{isOpen:xn,onClose:()=>hn(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(Ot(t),Gt(null)),hn(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,x.Qn)(Pn)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(Q.A,{isOpen:bn,onClose:()=>vn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Gt({name:`${t}%`,discount:ii*(t/100),requiresApproval:!1}),Ot(0)}vn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(ie.A,{}),(0,h.jsx)(V,{show:mn,onClose:()=>gn(!1),onVerified:e=>{e.token&&e.user&&u(e.token,e.user),gn(!1)},onLogout:()=>{m()},currentCashierName:null===p||void 0===p?void 0:p.name})]})})},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,l=r.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=r.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=e=>{let{isOpen:t,onClose:n,onConfirm:r,title:c,label:p,placeholder:u="",min:x=0,max:h,step:m=1,suffix:g="",confirmText:b="Apply",cancelText:v="Cancel"}=e;const[y,f]=(0,i.useState)(""),[j,F]=(0,i.useState)(""),C=()=>{const e=parseFloat(y);!isNaN(e)&&e>=x&&(void 0===h||e<=h)&&(r(y),f(""),F(""),n())},w=()=>{f(""),F(""),n()},k=(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.yl,{variant:"secondary",onClick:w,children:v}),(0,s.jsx)(o.yl,{variant:"primary",onClick:C,disabled:!y||!!j||parseFloat(y)<x,children:b})]});return(0,s.jsx)(o.aF,{isOpen:t,onClose:w,title:c,footer:k,children:(0,s.jsxs)("div",{children:[(0,s.jsx)(o.lR,{children:p}),(0,s.jsx)(a,{type:"text",value:y,onChange:e=>{const t=e.target.value;if(""===t)return f(""),void F("");if(!/^\d*\.?\d*$/.test(t))return;const n=parseFloat(t);isNaN(n)||F(n<x?`Minimum value is ${x}${g}`:void 0!==h&&n>h?`Maximum value is ${h}${g}`:""),f(t)},placeholder:u,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!j&&y&&C()}}),j&&(0,s.jsx)(l,{children:j}),!j&&void 0!==h&&(0,s.jsxs)(d,{children:["Enter a value between ",x,g," and ",h,g]})]})})}}}]);