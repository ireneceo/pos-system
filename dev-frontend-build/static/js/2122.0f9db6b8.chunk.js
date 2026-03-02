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
`,$=e=>{var t,n,o,r;let{isOpen:s,onClose:a,orderData:$,onPrintBill:O}=e;const{getStoreInfo:D,operationSettings:R}=(0,c.Pj)(),L=D(),q=e=>(0,u.r6)(e,R),M=async()=>{await(0,p.pG)($,L)&&setTimeout(()=>{O()},100)},U=async()=>{await(0,p.Si)($,L)},W=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:M,children:"Print Bill"}),(0,h.jsx)(l.yl,{variant:"secondary",onClick:U,children:"Print Order Ticket"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:a,children:"Close"})]}),Y=(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(T,{onClick:M,title:"Print Bill",children:[(0,h.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,h.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,h.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,h.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]}),(0,h.jsx)("span",{children:"Bill"})]}),(0,h.jsxs)(T,{onClick:U,title:"Print Order Ticket",children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,h.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})}),(0,h.jsx)("span",{children:"Ticket"})]})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{}),(0,h.jsxs)(l.aF,{isOpen:s,onClose:a,title:"Order Complete!",footer:W,headerActions:Y,children:[(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsxs)(g,{children:["Order ",$.orderNumber]}),$.pagerNumber?(0,h.jsxs)("div",{style:{background:"#10B981",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pager Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pagerNumber})]}):(0,h.jsxs)("div",{style:{background:"#635BFF",color:"white",borderRadius:"12px",padding:"16px 24px",margin:"0 auto 24px",display:"inline-block"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",opacity:.9,marginBottom:"4px"},children:"Pickup Number"}),(0,h.jsx)("div",{style:{fontSize:"36px",fontWeight:"700",lineHeight:1},children:$.pickupNumber||(null!==(t=$.orderNumber)&&void 0!==t&&t.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Date & Time"}),(0,h.jsx)(f,{children:q($.date)})]}),$.cashierName&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Cashier"}),(0,h.jsx)(f,{children:$.cashierName})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Payment Method"}),(0,h.jsx)(f,{children:$.paymentMethod})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Amount Received"}),(0,h.jsx)(f,{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Change"}),(0,h.jsx)(f,{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsx)(S,{children:"Order Items"}),(0,h.jsx)(j,{children:$.items.map((e,t)=>(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(w,{children:e.menuItem.name}),e.options&&e.options.length>0&&(0,h.jsx)(k,{children:e.options.join(", ")})]}),(0,h.jsxs)(A,{children:[e.quantity,"x"]}),(0,h.jsx)(B,{children:(0,x.vv)(e.menuItem.price*e.quantity,R.currency)})]},t))})]}),(0,h.jsxs)(d.wn,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Subtotal"}),(0,h.jsx)(f,{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Takeaway Charge"}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsx)(y,{children:"Discount"}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Discount (",$.discountPolicy.name,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Coupon (",$.coupon.code,")"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Points (",null===(n=$.pointsUsed)||void 0===n?void 0:n.toLocaleString()," pts)"]}),(0,h.jsx)(f,{style:{color:"#10B981"},children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Service Charge (",$.serviceChargeRate||10,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(v,{children:[(0,h.jsxs)(y,{children:["Tax (",$.taxRate||6,"%)"]}),(0,h.jsx)(f,{children:(0,x.vv)(Number($.tax),R.currency)})]})]}),(0,h.jsxs)(d.i_,{style:{marginTop:0},children:[(0,h.jsx)(d.nJ,{children:"Total"}),(0,h.jsx)(d.aX,{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(E,{id:"order-complete-bill-print",children:[(0,h.jsxs)(N,{children:[(0,h.jsx)(z,{children:L.name}),(0,h.jsxs)("div",{style:{fontSize:"11px",marginTop:"5px"},children:[L.address,(0,h.jsx)("br",{}),"Tel: ",L.phone,(0,h.jsx)("br",{}),"GST Reg No: ",L.gstRegNo]})]}),(0,h.jsxs)(I,{style:{borderTop:"2px solid #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Order No:"}),(0,h.jsx)("span",{children:$.orderNumber})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Date:"}),(0,h.jsx)("span",{children:q($.date)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("strong",{children:"Cashier:"}),(0,h.jsx)("span",{children:$.cashierName||"POS Terminal"})]}),(0,h.jsxs)("div",{style:{fontSize:"20px",fontWeight:"bold",textAlign:"center",margin:"10px 0"},children:["PICKUP #",$.pickupNumber||(null!==(o=$.orderNumber)&&void 0!==o&&o.includes("-")?$.orderNumber.split("-")[1]:$.orderNumber)||"-"]}),$.pagerNumber&&(0,h.jsxs)("div",{style:{fontSize:"16px",fontWeight:"bold",textAlign:"center",margin:"5px 0"},children:["PAGER #",$.pagerNumber]})]}),(0,h.jsx)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:(0,h.jsxs)("table",{style:{width:"100%",fontSize:"12px"},children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{style:{borderBottom:"1px dashed #000"},children:[(0,h.jsx)("th",{style:{textAlign:"left",padding:"5px 0"},children:"Item"}),(0,h.jsx)("th",{style:{textAlign:"center",width:"40px"},children:"Qty"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Price"}),(0,h.jsx)("th",{style:{textAlign:"right",width:"60px"},children:"Total"})]})}),(0,h.jsx)("tbody",{children:$.items.map((e,t)=>(0,h.jsx)(i.Fragment,{children:(0,h.jsxs)("tr",{children:[(0,h.jsxs)("td",{style:{padding:"5px 0"},children:[e.menuItem.name,e.options&&e.options.length>0&&(0,h.jsx)("div",{style:{fontSize:"10px",fontStyle:"italic",marginLeft:"10px"},children:e.options.join(", ")})]}),(0,h.jsx)("td",{style:{textAlign:"center"},children:e.quantity}),(0,h.jsx)("td",{style:{textAlign:"right"},children:e.menuItem.price.toFixed(2)}),(0,h.jsx)("td",{style:{textAlign:"right"},children:(e.quantity*e.menuItem.price).toFixed(2)})]})},t))})]})}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Subtotal:"}),(0,h.jsx)("span",{children:(0,x.vv)($.subtotal,R.currency)})]}),Number($.takeawayCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Takeaway Charge:"}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.takeawayCharge),R.currency)})]}),Number($.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Discount:"}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discount),R.currency)})]}),$.discountPolicy&&Number($.discountPolicy.amount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Discount (",$.discountPolicy.name,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.discountPolicy.amount),R.currency)})]}),$.coupon&&Number($.coupon.discount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Coupon (",$.coupon.code,"):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.coupon.discount),R.currency)})]}),Number($.pointDiscount)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Points (",null===(r=$.pointsUsed)||void 0===r?void 0:r.toLocaleString()," pts):"]}),(0,h.jsx)("span",{children:(0,x.vv)(-Number($.pointDiscount),R.currency)})]}),Number($.serviceCharge)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Service Charge (",$.serviceChargeRate||10,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.serviceCharge),R.currency)})]}),Number($.tax)>0&&(0,h.jsxs)(_,{children:[(0,h.jsxs)("span",{children:["Tax (",$.taxRate||6,"%):"]}),(0,h.jsx)("span",{children:(0,x.vv)(Number($.tax),R.currency)})]}),(0,h.jsxs)(_,{style:{borderTop:"1px solid #000",paddingTop:"5px",fontSize:"14px",fontWeight:"bold"},children:[(0,h.jsx)("span",{children:"TOTAL:"}),(0,h.jsx)("span",{children:(0,x.vv)($.total,R.currency)})]})]}),(0,h.jsxs)(I,{style:{borderTop:"1px dashed #000",paddingTop:"10px"},children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Payment Method:"}),(0,h.jsx)("span",{children:$.paymentMethod.toUpperCase()})]}),"cash"===$.paymentMethod&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Amount Received:"}),(0,h.jsx)("span",{children:(0,x.vv)($.amountReceived,R.currency)})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)("span",{children:"Change:"}),(0,h.jsx)("span",{children:(0,x.vv)($.change,R.currency)})]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)("div",{children:"*** CUSTOMER COPY ***"}),(0,h.jsx)("div",{children:"Thank you for your purchase!"}),(0,h.jsx)("div",{children:"Please keep this receipt for your records"})]})]})]})},O=o.Ay.div`
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
`,Y=o.Ay.div`
  text-align: center;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  min-height: 20px;
`,G=o.Ay.button`
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
`,V=e=>{let{show:t,onClose:n,onVerified:o,onLogout:r,currentCashierName:s}=e;const[a,l]=(0,i.useState)(""),[d,c]=(0,i.useState)(""),[p,u]=(0,i.useState)(!1);(0,i.useEffect)(()=>{t&&(l(""),c(""))},[t]);const x=(0,i.useCallback)(async e=>{u(!0),c("");try{const t=localStorage.getItem("auth_token"),n=await fetch("/api/staff/verify-pin",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({pin_code:e})}),i=await n.json();i.success&&i.token&&i.user?o({data:i.data,token:i.token,user:i.user}):i.success?o({data:i.data,token:"",user:i.data}):(c("Invalid PIN. Please try again."),l(""))}catch{c("Connection error. Please try again."),l("")}finally{u(!1)}},[o]),m=(0,i.useCallback)(e=>{if(p)return;if("backspace"===e)return l(e=>e.slice(0,-1)),void c("");if(a.length>=4)return;const t=a+e;l(t),c(""),4===t.length&&x(t)},[a,p,x]);return(0,i.useEffect)(()=>{if(!t)return;const e=e=>{e.key>="0"&&e.key<="9"?m(e.key):"Backspace"===e.key?m("backspace"):"Escape"===e.key&&n()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[t,m,n]),t?(0,h.jsx)(O,{show:t,onClick:e=>{e.target===e.currentTarget&&n()},children:(0,h.jsxs)(D,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(R,{children:"Switch Cashier"}),(0,h.jsx)(L,{children:"Enter 4-digit PIN to switch"}),s&&(0,h.jsxs)(H,{children:["Current: ",s]}),(0,h.jsx)(q,{children:[0,1,2,3].map(e=>(0,h.jsx)(M,{filled:a.length>e,error:!!d},e))}),(0,h.jsx)(Y,{children:d}),(0,h.jsxs)(U,{children:[["1","2","3","4","5","6","7","8","9"].map(e=>(0,h.jsx)(W,{onClick:()=>m(e),children:e},e)),(0,h.jsx)(W,{variant:"action",onClick:()=>m("backspace"),children:"\u232b"}),(0,h.jsx)(W,{onClick:()=>m("0"),children:"0"}),(0,h.jsx)(W,{variant:"action",onClick:n,children:"Close"})]}),r&&(0,h.jsx)(G,{onClick:r,children:"Logout"})]})}):null};var K=n(1472);const J=e=>{let{isOpen:t,onClose:n,title:i,message:o,buttonText:r="OK"}=e;const s=(0,h.jsx)(l.yl,{onClick:n,style:{maxWidth:"200px",margin:"0 auto"},children:r});return(0,h.jsx)(l.aF,{isOpen:t,onClose:n,title:i,footer:s,children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,h.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.5"},children:o})})})};var Q=n(2538),X=n(447),Z=n(8930),ee=n(9037),te=n(5781),ne=n(1367),ie=n(2420);const oe=o.Ay.div`
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
`,Ye=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`,Ge=o.Ay.button`
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
`,()=>{const e=(0,r.Zp)(),[t]=(0,r.ok)(),n="floor-plan"===t.get("from"),o=t.get("table"),{user:l,switchUser:d,logout:p}=(0,ne.As)(),u=(()=>{const{restaurantId:e}=(0,r.g)(),{user:t}=(0,ne.As)();return e?parseInt(e,10):null!==t&&void 0!==t&&t.restaurantId?"number"===typeof t.restaurantId?t.restaurantId:parseInt(t.restaurantId,10):(console.warn("useRestaurantId: No restaurantId found in URL or user context, using default 1"),1)})(),{addOrder:m}=(0,X.h)(),{getTakeawayCharge:g,operationSettings:b}=(0,c.Pj)(),{categories:v,menuItems:y,getItemsByCategory:f,loadMenuByCategory:j,isLoadingMenu:F}=(0,Z.b)(),C=v.filter(e=>!1!==e.isActive),{updateCustomerOrderStats:w,searchCustomers:k}=(0,ee.c)(),{currentStaff:A,isLoggedIn:B,logout:S,updateStaff:E}=(0,te.g)(),[N,z]=(0,i.useState)(null),[I,_]=(0,i.useState)(null),[P,T]=(0,i.useState)(""),[O,D]=(0,i.useState)(!1),[R,L]=(0,i.useState)([]),[q,M]=(0,i.useState)(new Date),[U,W]=(0,i.useState)(!1),[Y,G]=(0,i.useState)(!1),[H,Et]=(0,i.useState)(!1),[Nt,zt]=(0,i.useState)(null),[It,_t]=(0,i.useState)(null),[Pt,Tt]=(0,i.useState)(0),[$t,Ot]=(0,i.useState)(!1),[Dt,Rt]=(0,i.useState)(""),[Lt,qt]=(0,i.useState)(null),[Mt,Ut]=(0,i.useState)(null),[Wt,Yt]=(0,i.useState)(!1),[Gt,Ht]=(0,i.useState)(!1),[Vt,Kt]=(0,i.useState)(!1),[Jt,Qt]=(0,i.useState)("dine-in"),[Xt,Zt]=(0,i.useState)(""),[en,tn]=(0,i.useState)([]),[nn,on]=(0,i.useState)(""),[rn,sn]=(0,i.useState)(""),[an,ln]=(0,i.useState)(!1),[dn,cn]=(0,i.useState)(!1),[pn,un]=(0,i.useState)(!1),[xn,hn]=(0,i.useState)(!1),[mn,gn]=(0,i.useState)(""),[bn,vn]=(0,i.useState)(null),[yn,fn]=(0,i.useState)(""),[jn,Fn]=(0,i.useState)(!1),[Cn,wn]=(0,i.useState)(null),[kn,An]=(0,i.useState)([]),[Bn,Sn]=(0,i.useState)(!1),En=(0,i.useRef)(null),[Nn,zn]=(0,i.useState)("RM"),[In,_n]=(0,i.useState)(null),[Pn,Tn]=(0,i.useState)("cash_only"),[$n,On]=(0,i.useState)(null),[Dn,Rn]=(0,i.useState)(0),[Ln,qn]=(0,i.useState)("Bronze"),[Mn,Un]=(0,i.useState)(40),Wn=(0,i.useRef)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json();t.brand_logo?gn(t.brand_logo):t.brandLogo?gn(t.brandLogo):t.logo&&gn(t.logo)}}catch(e){console.error("Failed to load brand logo:",e)}};e();const t=()=>{e()};return window.addEventListener("brandLogoUpdated",t),()=>{window.removeEventListener("brandLogoUpdated",t)}},[]),(0,i.useEffect)(()=>{if(C.length>0&&null===N){const e=C[0].id;z(e),j(e)}},[C,N,j]);(0,i.useEffect)(()=>{var e;C.length>0&&N&&!O&&!C.find(e=>e.id===N)&&z((null===(e=C[0])||void 0===e?void 0:e.id)||null)},[C,N,O]),(0,i.useEffect)(()=>{const e=setInterval(()=>{M(new Date)},1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{if(null!==l&&void 0!==l&&l.restaurantId)try{const e=await fetch(`/api/restaurants/${l.restaurantId}`,{credentials:"include"});if(e.ok){const t=await e.json(),n=t.data||t;if(n.table_settings){const{enableTableNumbers:e,totalTables:t,tablePrefix:i}=n.table_settings;if(e){const e=[];for(let n=1;n<=t;n++)e.push(`${i}${String(n).padStart(3,"0")}`);tn(e)}}}}catch(e){console.error("Failed to load table settings:",e)}})()},[null===l||void 0===l?void 0:l.restaurantId]),(0,i.useEffect)(()=>{o&&en.length>0&&en.includes(o)&&(Zt(o),Qt("dine-in"))},[o,en]),(0,i.useEffect)(()=>{(async()=>{if(null!==l&&void 0!==l&&l.restaurantId)try{const e=await fetch(`/api/restaurants/${l.restaurantId}`);if(e.ok){const t=await e.json(),n=t.data||t;n.payment_settings&&vn(n.payment_settings),zn(n.currency||"RM"),_n(n.cash_rounding?parseFloat(n.cash_rounding):null),Tn(n.rounding_apply_to||"cash_only")}}catch(e){console.error("Failed to load payment settings:",e)}})()},[null===l||void 0===l?void 0:l.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==l&&void 0!==l&&l.restaurantId)try{const e=await fetch(`/api/membership/settings/${l.restaurantId}`);if(e.ok){const t=await e.json();t.success&&t.data&&(On(t.data),console.log("\u2705 Membership settings loaded for POS:",t.data))}}catch(e){console.error("Failed to load membership settings:",e)}})()},[null===l||void 0===l?void 0:l.restaurantId]),(0,i.useEffect)(()=>{(async()=>{if(null!==l&&void 0!==l&&l.restaurantId&&null!==Cn&&void 0!==Cn&&Cn.id)try{const e=await fetch(`/api/membership/customer/${l.restaurantId}/${Cn.id}`);if(e.ok){const t=await e.json();t.success&&t.data&&(Rn(t.data.points||0),qn(t.data.loyalty_tier||"Bronze"),console.log("\u2705 Customer points loaded:",t.data.points,"Tier:",t.data.loyalty_tier))}}catch(e){console.error("Failed to load customer points:",e)}else Rn(0),qn("Bronze")})()},[null===l||void 0===l?void 0:l.restaurantId,null===Cn||void 0===Cn?void 0:Cn.id]);const Yn=(()=>{let e=[];if(O){const t=P.toLowerCase().trim();e=y.filter(e=>e.name.toLowerCase().includes(t)||e.code&&e.code.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t))}else N&&(e=f(N));return e})(),Gn=Yn.length>50;(0,i.useEffect)(()=>{Un(40)},[N,P]),(0,i.useEffect)(()=>{if(!Gn)return;const e=Wn.current;if(!e)return;const t=new IntersectionObserver(e=>{e[0].isIntersecting&&Un(e=>e+30)},{threshold:.1,rootMargin:"100px"});return t.observe(e),()=>t.disconnect()},[Gn,Mn,Yn.length]);const Hn=(e,t)=>{L(R.map(n=>{if(n.id===e){const e=n.quantity+t;return e>0?{...n,quantity:e}:n}return n}).filter(e=>e.quantity>0))},Vn=()=>{const e=b.pagerSystem.totalPagers,t=rn.trim();return t?Array.from({length:e},(e,t)=>t+1).filter(e=>e.toString().startsWith(t)):Array.from({length:e},(e,t)=>t+1)},Kn=()=>{L([]),Tt(0),qt(null),Ut(null),Rt(""),wn(null),fn(""),Qt("dine-in"),Zt(""),on(""),sn(""),T(""),z("all"),Yt(!1),W(!1),G(!1),Et(!1),zt(null),_t(null)},Jn=e=>{Pt===e?(Tt(0),Ut(null)):Tt(e)},Qn=async()=>{if(Dt)try{const e=await fetch("/api/coupons/validate",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({code:Dt.toUpperCase(),restaurant_id:null===l||void 0===l?void 0:l.restaurantId,order_amount:Zn,order_type:Jt})});if(!e.ok)return void Kt(!0);const t=await e.json();t.valid&&t.data?(qt({code:Dt.toUpperCase(),discount:t.data.discountAmount}),Rt("")):Kt(!0)}catch(e){console.error("Coupon validation error:",e),Kt(!0)}},Xn=e=>{if(Mt&&Mt.name===e)return Ut(null),void Tt(0);const t={Staff:{discount:"20%",requiresApproval:!1,status:"active"},VIP:{discount:"15%",requiresApproval:!0,status:"active"}}[e];if(t&&"active"===t.status){const n=parseFloat(t.discount.replace("%","")),i=Zn*(n/100);if(t.requiresApproval){if("MANAGER123"!==prompt(`${e} requires manager approval. Enter manager code:`))return void alert("Invalid manager code. Discount not applied.");Ut({name:e,discount:i,requiresApproval:!0}),Tt(0)}else Ut({name:e,discount:i,requiresApproval:!1}),Tt(0)}},{subtotal:Zn,tax:ei,total:ti,discountAmount:ni,couponDiscount:ii,policyDiscount:oi,takeawayCharge:ri,serviceCharge:si}=(()=>{const e=R.reduce((e,t)=>{let n=t.menuItem.price*t.quantity;if(t.selectedOptions&&t.selectedOptions.length>0){n+=t.selectedOptions.reduce((e,t)=>e+t.price,0)*t.quantity}return e+n},0);let t=0;if("takeaway"===Jt&&b.takeawayPricing.enabled)if("per-item"===b.takeawayPricing.pricingType){const e=R.reduce((e,t)=>e+t.quantity,0);t=e*b.takeawayPricing.perItemCharge}else R.forEach(e=>{const n=g(e.menuItem.category);t+=n*e.quantity});const n=e+t,i=Pt,o=Lt?Lt.discount:0,r=Mt?Mt.discount:0,s=Math.max(0,n-i-o-r),a=b.serviceChargeEnabled?s*(b.serviceChargeRate/100):0,l=b.taxEnabled?s*(b.taxRate/100):0,d=s+a+l;let c=d;return"all"===Pn&&In&&(c=Math.round(d/In)*In),{subtotal:e,tax:l,total:c,discountAmount:i,couponDiscount:o,policyDiscount:r,takeawayCharge:t,serviceCharge:a}})(),ai=(()=>{if(!yn.trim())return[];if(kn.length>0)return kn;return k(yn).slice(0,10)})();return(0,h.jsxs)(oe,{children:[(0,h.jsxs)(re,{children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[(0,h.jsx)(se,{onClick:Kn,children:mn?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ae,{src:mn,alt:"Brand Logo"}),(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})]}):(0,h.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px",fontWeight:500},children:"POS Terminal"})}),(0,h.jsx)("button",{onClick:()=>e(`/restaurant/${u}/dashboard`),style:{background:"none",border:"1px solid #E6EBF1",borderRadius:"6px",padding:"6px 12px",cursor:"pointer",color:"#6B7C93",fontSize:"13px",display:"flex",alignItems:"center",gap:"4px"},children:"\u2190 Dashboard"})]}),(0,h.jsxs)(le,{children:[(0,h.jsxs)(de,{clickable:!0,onClick:()=>un(!0),title:"Click to switch cashier",children:[(0,h.jsx)("span",{style:{fontSize:"16px"},children:"\u25c6"}),(0,h.jsxs)("span",{children:["Cashier: ",(null===l||void 0===l?void 0:l.name)||"Staff"]}),(0,h.jsx)("span",{style:{fontSize:"11px",color:"#8898AA",marginLeft:"4px"},children:"\u25bc"})]}),(0,h.jsx)(ce,{children:(e=>{const t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0});return`${e.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}  ${t}`})(q)})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsxs)(ue,{children:[(0,h.jsx)(xe,{children:(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{children:"\ud83d\udd0d"}),(0,h.jsx)(me,{type:"text",placeholder:"Search menu items...",value:P,onChange:e=>(e=>{if(T(e),e.trim())O||(_(N),D(!0),z(null),j("all"));else if(O){var t;D(!1);const e=I||(null===(t=C[0])||void 0===t?void 0:t.id)||null;z(e),_(null)}})(e.target.value)}),P&&(0,h.jsx)(be,{onClick:()=>{if(T(""),O){var e;D(!1);const t=I||(null===(e=C[0])||void 0===e?void 0:e.id)||null;z(t),_(null)}},title:"Clear search",children:"\xd7"})]})}),(0,h.jsx)(ye,{children:C.map(e=>(0,h.jsxs)(fe,{active:N===e.id&&!O,onClick:()=>{return t=e.id,O&&(D(!1),T("")),z(t),void j(t);var t},children:[e.emoji," ",e.name]},e.id))}),O&&(0,h.jsxs)("div",{style:{padding:"8px 16px",background:"#f0f7ff",borderRadius:"8px",marginBottom:"12px",fontSize:"14px",color:"#1a73e8",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("span",{children:"\ud83d\udd0d"}),(0,h.jsxs)("span",{children:['Search results for "',P,'" (',Yn.length," items)"]})]}),(0,h.jsx)(je,{children:Yn.length>0?(0,h.jsxs)(h.Fragment,{children:[(Gn?Yn.slice(0,Mn):Yn).map(e=>{const t=e.optionGroups&&e.optionGroups.length>0;return(0,h.jsxs)(Fe,{soldOut:e.soldOut,onClick:()=>(e=>{if(e.soldOut)return;let t=[];e.is_set_menu&&e.set_items&&e.set_items.length>0&&(t=e.set_items.map(e=>{const t=y.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}));const n=R.find(t=>t.menuItem.id===e.id&&(!t.options||0===t.options.length)&&!e.is_set_menu);n&&!e.is_set_menu?L(R.map(e=>e.id===n.id?{...e,quantity:e.quantity+1}:e)):L([...R,{id:`order-${Date.now()}`,menuItem:e,quantity:1,options:t.length>0?t:void 0}])})(e),children:[e.is_set_menu&&(0,h.jsx)(Ae,{children:"SET"}),(0,h.jsx)(Ce,{hasImage:!!e.image,children:e.image?(0,h.jsx)("img",{src:e.image,alt:e.name,loading:"lazy"}):e.emoji}),(0,h.jsxs)(we,{children:[e.code?`${e.code} `:"",e.name]}),(0,h.jsxs)(ke,{children:[Nn," ",e.price.toFixed(2)]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,h.jsx)(Be,{children:e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")}),t&&(0,h.jsx)(Se,{children:(0,h.jsx)(Ee,{onClick:t=>((e,t)=>{t.stopPropagation(),e.soldOut||(_t(e),G(!0))})(e,t),disabled:e.soldOut,children:"Options"})})]},e.id)}),Gn&&Mn<Yn.length&&(0,h.jsx)("div",{ref:Wn,style:{gridColumn:"1 / -1",height:"20px"}})]}):F?(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\u23f3"}),(0,h.jsx)("div",{className:"title",children:"Loading..."})]}):(0,h.jsxs)(ve,{children:[(0,h.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,h.jsx)("div",{className:"title",children:O?`No results for "${P}"`:"No items in this category"}),(0,h.jsx)("div",{className:"message",children:O?"Try searching with different keywords":"Select a different category to view items"})]})})]}),(0,h.jsxs)(Ne,{children:[(0,h.jsxs)(dt,{children:[(0,h.jsx)(ct,{active:"dine-in"===Jt,onClick:()=>Qt("dine-in"),children:"Dine In"}),(0,h.jsx)(ct,{active:"takeaway"===Jt,onClick:()=>Qt("takeaway"),children:"Takeaway"})]}),(0,h.jsx)(ut,{children:Cn?(0,h.jsxs)(ft,{children:[(0,h.jsxs)(jt,{children:[(0,h.jsx)(Ft,{children:Cn.name}),(0,h.jsxs)(Ct,{children:[Cn.phone&&`${Cn.phone} \u2022 `,Cn.id]})]}),(0,h.jsx)(St,{onClick:()=>{wn(null),fn(""),An([])},children:"Clear"})]}):(0,h.jsxs)(xt,{children:[(0,h.jsx)(mt,{children:"\ud83d\udd0d"}),(0,h.jsx)(ht,{type:"text",placeholder:"Walk-in Customer",value:yn,onChange:e=>{const t=e.target.value;fn(t),Fn(t.trim().length>0),En.current&&clearTimeout(En.current),t.trim().length>=2?En.current=setTimeout(()=>{(async e=>{if(e.trim()&&null!==l&&void 0!==l&&l.restaurantId){Sn(!0);try{const t=await fetch(`/api/customers/${l.restaurantId}?search=${encodeURIComponent(e)}`);if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>{var t,n,i,o,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id,name:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Unknown",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||"",email:(null===(o=e.customer)||void 0===o?void 0:o.email)||"",type:(null===(r=e.customer)||void 0===r?void 0:r.type)||"member",points:e.points||0,loyaltyTier:e.loyalty_tier||"Bronze",totalOrders:e.total_orders||0,totalSpent:e.total_spent||0}});An(t.slice(0,10))}}}catch(t){console.error("Customer search error:",t)}finally{Sn(!1)}}else An([])})(t)},300):An([])},onFocus:()=>{yn.trim()&&Fn(!0)},onBlur:()=>setTimeout(()=>Fn(!1),200)}),(0,h.jsx)(gt,{show:jn&&ai.length>0,children:ai.map(e=>(0,h.jsxs)(bt,{onClick:()=>(e=>{wn(e),fn(""),Fn(!1),An([])})(e),children:[(0,h.jsx)(vt,{children:e.name}),(0,h.jsxs)(yt,{children:[e.phone&&`${e.phone} \u2022 `,e.id]})]},e.id))}),(0,h.jsx)(gt,{show:jn&&yn.trim().length>0&&0===ai.length&&!Bn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"No customers found"})}),(0,h.jsx)(gt,{show:jn&&Bn,children:(0,h.jsx)(bt,{style:{cursor:"default",color:"#6B7C93"},children:"Searching..."})})]})}),"dine-in"===Jt&&en.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Table Number:"}),(0,h.jsxs)(_e,{value:Xt,onChange:e=>Zt(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Free Seating"}),en.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),0===R.length?(0,h.jsxs)(et,{children:[(0,h.jsx)(tt,{children:"No items in order"}),(0,h.jsx)(tt,{style:{marginTop:"8px",fontSize:"12px"},children:"Select menu items to start"})]}):(0,h.jsxs)(Pe,{children:[(0,h.jsxs)(Te,{children:[(0,h.jsxs)($e,{children:[R.length," ",1===R.length?"item":"items"]}),R.map(e=>(0,h.jsxs)(Oe,{children:[(0,h.jsxs)(De,{children:[(0,h.jsxs)(Re,{children:[e.menuItem.code?`${e.menuItem.code} `:"",e.menuItem.name]}),e.options&&e.options.length>0&&(()=>{const t=[],n=[];return e.options.forEach(e=>{/^.+\sx\d+$/.test(e)?t.push(e):n.push(e)}),(0,h.jsxs)(h.Fragment,{children:[t.length>0&&(0,h.jsx)(Le,{style:{fontWeight:600},children:t.join(", ")}),n.length>0&&(0,h.jsxs)(Le,{children:["\u2b50 ",n.join(", ")]})]})})()]}),(0,h.jsxs)(qe,{children:[(0,h.jsxs)(Me,{children:[(0,h.jsx)(Ue,{onClick:()=>Hn(e.id,-1),children:"-"}),(0,h.jsx)(We,{children:e.quantity}),(0,h.jsx)(Ue,{onClick:()=>Hn(e.id,1),children:"+"})]}),(0,h.jsxs)(Ye,{children:[Nn," ",(()=>{let t=e.menuItem.price*e.quantity;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)*e.quantity}return t.toFixed(2)})()]}),(0,h.jsx)(Ge,{onClick:()=>{return t=e.id,void L(R.filter(e=>e.id!==t));var t},children:"\xd7"})]})]},e.id))]}),(0,h.jsxs)(He,{children:[(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Subtotal"}),(0,h.jsxs)(Je,{children:[Nn," ",Zn.toFixed(2)]})]}),ri>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Takeaway Charge"}),(0,h.jsxs)(Je,{children:[Nn," ",ri.toFixed(2)]})]}),ni>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsx)(Ke,{children:"Discount"}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Nn," ",ni.toFixed(2)]})]}),Lt&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Coupon (",Lt.code,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Nn," ",ii.toFixed(2)]})]}),Mt&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Discount (",Mt.name,")"]}),(0,h.jsxs)(Je,{style:{color:"#10B981"},children:["-",Nn," ",oi.toFixed(2)]})]}),b.serviceChargeEnabled&&si>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Service Charge (",b.serviceChargeRate,"%)"]}),(0,h.jsxs)(Je,{children:[Nn," ",si.toFixed(2)]})]}),b.taxEnabled&&ei>0&&(0,h.jsxs)(Ve,{children:[(0,h.jsxs)(Ke,{children:["Tax (",b.taxRate,"%)"]}),(0,h.jsxs)(Je,{children:[Nn," ",ei.toFixed(2)]})]}),(0,h.jsxs)(Qe,{children:[(0,h.jsx)(Ke,{children:"Total"}),(0,h.jsxs)(Je,{children:[Nn," ",ti.toFixed(2)]})]})]}),(0,h.jsxs)(nt,{children:[(0,h.jsx)(it,{children:Lt?(0,h.jsxs)(lt,{children:[(0,h.jsxs)("span",{children:["Coupon: ",Lt.code," (-",Nn," ",Lt.discount.toFixed(2),")"]}),(0,h.jsx)(pt,{onClick:()=>{qt(null)},children:"\xd7"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(ot,{type:"text",placeholder:"Enter coupon code",value:Dt,onChange:e=>Rt(e.target.value.toUpperCase()),onKeyDown:e=>"Enter"===e.key&&Qn()}),(0,h.jsx)(rt,{onClick:Qn,disabled:!Dt,children:"Apply Coupon"})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsxs)(at,{active:5===Pt,onClick:()=>Jn(5),children:[b.currency," 5"]}),(0,h.jsxs)(at,{active:10===Pt,onClick:()=>Jn(10),children:[b.currency," 10"]}),(0,h.jsxs)(at,{active:15===Pt,onClick:()=>Jn(15),children:[b.currency," 15"]}),(0,h.jsxs)(at,{onClick:()=>cn(!0),children:["Custom ",b.currency]})]})}),(0,h.jsx)(it,{children:(0,h.jsxs)(st,{children:[(0,h.jsx)(at,{active:"Staff"===(null===Mt||void 0===Mt?void 0:Mt.name),onClick:()=>Xn("Staff"),children:"20%"}),(0,h.jsx)(at,{active:"VIP"===(null===Mt||void 0===Mt?void 0:Mt.name),onClick:()=>Xn("VIP"),children:"15%"}),(0,h.jsx)(at,{onClick:()=>hn(!0),children:"Custom %"})]})})]})]}),b.pagerSystem.enabled&&R.length>0&&(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"Pager Number:"}),(0,h.jsxs)(wt,{children:[(0,h.jsx)(kt,{type:"text",value:rn,onChange:e=>{const t=e.target.value;sn(t),on(t),t.trim()?ln(!0):ln(!1)},onFocus:()=>{!rn.trim()&&nn||ln(!0)},onBlur:()=>setTimeout(()=>ln(!1),200),placeholder:nn?`#${nn}`:"Type or click..."}),(0,h.jsx)(At,{show:an,children:Vn().length>0?Vn().map(e=>(0,h.jsxs)(Bt,{onClick:()=>{return on((t=e).toString()),sn(t.toString()),void ln(!1);var t},children:["Pager #",e]},e)):(0,h.jsx)(Bt,{style:{cursor:"default",color:"#6B7C93"},children:"No matching pagers"})})]})]}),(0,h.jsxs)(Xe,{children:[(0,h.jsx)(Ze,{variant:"danger",onClick:()=>{R.length>0&&Yt(!0)},children:"Clear"}),(0,h.jsx)(Ze,{variant:"secondary",onClick:async()=>{if(console.log("\ud83d\udd35 handleAddOrder called"),0!==R.length)if($t)console.warn("POS - Order already in progress, ignoring duplicate call");else{console.log("\ud83d\udfe2 Starting order creation, setting isProcessingPayment=true"),Ot(!0);try{const t=new Date,n={date:t,items:R,subtotal:Zn,discount:ni,discountPolicy:Mt?{name:Mt.name,amount:Mt.discount}:void 0,coupon:Lt?{code:Lt.code,discount:Lt.discount}:null,takeawayCharge:ri,serviceCharge:si,serviceChargeRate:b.serviceChargeRate,tax:ei,taxRate:b.taxRate,total:ti,paymentMethod:"Pending",amountReceived:0,change:0},i={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Cn?Cn.name:(e="Walk-in Customer",e&&"Guest Customer"!==e&&"Mobile Guest"!==e?e:"Walk-in Customer"),phone:Cn?Cn.phone:"POS Terminal",email:Cn&&Cn.email||"",type:Cn?"member":"guest",customerId:null===Cn||void 0===Cn?void 0:Cn.id,loyaltyTier:null===Cn||void 0===Cn?void 0:Cn.loyaltyTier,points:null===Cn||void 0===Cn?void 0:Cn.points},items:R.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Zn,tax:ei,taxRate:b.taxRate,serviceCharge:si,serviceChargeRate:b.serviceChargeRate,discount:ni,coupon:Lt?{code:Lt.code,amount:Lt.discount}:void 0,discountPolicy:Mt?{name:Mt.name,amount:Mt.discount}:void 0,takeawayCharge:ri,total:ti,paymentMethod:"Pending",paymentStatus:"pending",orderType:Jt,orderSource:"pos",tableNumber:"dine-in"===Jt&&Xt?Xt:void 0,pagerNumber:nn||void 0,cashier_id:null!==l&&void 0!==l&&l.id?Number(l.id):null,cashier_name:(null===l||void 0===l?void 0:l.name)||null};console.log("\ud83d\udfe1 Calling addOrder with orderNumber:",i.orderNumber);const o=await m(i,u?Number(u):void 0);console.log("\ud83d\udfe2 addOrder completed, savedOrder:",o),zt({...n,orderNumber:(null===o||void 0===o?void 0:o.order_number)||(null===o||void 0===o?void 0:o.orderNumber)||i.orderNumber,pickupNumber:(null===o||void 0===o?void 0:o.pickup_number)||(null===o||void 0===o?void 0:o.pickupNumber)||(null!==o&&void 0!==o&&o.order_number?o.order_number.split("-")[1]:i.pickupNumber),pagerNumber:(null===o||void 0===o?void 0:o.pager_number)||nn||void 0,tableNumber:(null===o||void 0===o?void 0:o.table_number)||Xt||void 0,takeawayCharge:(null===o||void 0===o?void 0:o.takeaway_charge)||(null===o||void 0===o?void 0:o.takeawayCharge)||n.takeawayCharge,subtotal:(null===o||void 0===o?void 0:o.subtotal)||n.subtotal,tax:(null===o||void 0===o?void 0:o.tax)||n.tax,serviceCharge:(null===o||void 0===o?void 0:o.service_charge)||(null===o||void 0===o?void 0:o.serviceCharge)||n.serviceCharge,discount:(null===o||void 0===o?void 0:o.discount)||n.discount,discountPolicy:n.discountPolicy,coupon:n.coupon,pointsUsed:0,pointDiscount:0,total:(null===o||void 0===o?void 0:o.total)||n.total,cashierName:(null===l||void 0===l?void 0:l.name)||null}),Et(!0),L([]),Tt(0),qt(null),Ut(null),Rt(""),Zt(""),on(""),sn(""),wn(null),fn(""),console.log("POS - Order added without payment:",null===o||void 0===o?void 0:o.orderNumber)}catch(t){console.error("POS - Error adding order:",t),alert("Failed to create order. Please try again.")}finally{Ot(!1)}var e}},children:"Pay Later"}),(0,h.jsx)(Ze,{variant:"primary",onClick:()=>{0!==R.length&&W(!0)},style:{flex:2},children:"Pay Now"})]})]})]}),(0,h.jsx)(s.A,{isOpen:U,onClose:()=>W(!1),total:ti,subtotal:Zn,tax:ei,serviceCharge:si,takeawayCharge:ri,discountAmount:ni,couponDiscount:ii,onConfirmPayment:async(e,t,n,i,o)=>{if($t)return void console.warn("POS - Payment already in progress, ignoring duplicate call");Ot(!0),console.log("POS - Processing payment for method:",e,"Points used:",i);const r=o?ti-o:ti;try{const s=new Date,a={date:s,items:R,subtotal:Zn,discount:ni,discountPolicy:Mt?{name:Mt.name,amount:Mt.discount}:void 0,coupon:Lt?{code:Lt.code,discount:Lt.discount}:null,takeawayCharge:ri,serviceCharge:si,serviceChargeRate:b.serviceChargeRate,tax:ei,taxRate:b.taxRate,total:r,pointsUsed:i||0,pointDiscount:o||0,paymentMethod:e,amountReceived:t||r,change:n||0},d={id:`order-${Date.now()}`,orderNumber:"",pickupNumber:"",customer:{name:Cn?Cn.name:"Walk-in Customer",phone:Cn?Cn.phone:"POS Terminal",email:Cn&&Cn.email||"",type:Cn?"member":"guest",customerId:null===Cn||void 0===Cn?void 0:Cn.id,loyaltyTier:null===Cn||void 0===Cn?void 0:Cn.loyaltyTier,points:null===Cn||void 0===Cn?void 0:Cn.points},items:R.map(e=>{let t=e.menuItem.price;if(e.selectedOptions&&e.selectedOptions.length>0){t+=e.selectedOptions.reduce((e,t)=>e+t.price,0)}return{id:e.id,menuItem:{id:e.menuItem.id,name:e.menuItem.code?`${e.menuItem.code} ${e.menuItem.name}`:e.menuItem.name,price:t,emoji:e.menuItem.emoji,is_set_menu:e.menuItem.is_set_menu,set_items:e.menuItem.set_items},quantity:e.quantity,options:e.options,is_set_menu:e.menuItem.is_set_menu||!1,set_items:e.menuItem.set_items||[]}}),status:"pending",createdAt:s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0}),subtotal:Zn,tax:ei,taxRate:b.taxRate,serviceCharge:si,serviceChargeRate:b.serviceChargeRate,discount:ni,coupon:Lt?{code:Lt.code,amount:Lt.discount}:void 0,discountPolicy:Mt?{name:Mt.name,amount:Mt.discount}:void 0,takeawayCharge:ri,total:r,points_used:i||null,point_discount:o||null,paymentMethod:e,paymentStatus:"completed",orderType:Jt,orderSource:"pos",tableNumber:"dine-in"===Jt&&Xt?Xt:void 0,pagerNumber:nn||void 0,cashier_id:null!==l&&void 0!==l&&l.id?Number(l.id):null,cashier_name:(null===l||void 0===l?void 0:l.name)||null},c=await m(d,null!==l&&void 0!==l&&l.restaurantId?Number(l.restaurantId):void 0);if(Cn&&w(Cn.id,ti),A){const e={...A.performance,ordersProcessed:A.performance.ordersProcessed+1};E(A.id,{totalSales:A.totalSales+ti,totalShifts:A.totalShifts,performance:e})}zt({...a,orderNumber:(null===c||void 0===c?void 0:c.order_number)||(null===c||void 0===c?void 0:c.orderNumber)||"",pickupNumber:(null===c||void 0===c?void 0:c.pickup_number)||(null===c||void 0===c?void 0:c.pickupNumber)||(null!==c&&void 0!==c&&c.order_number?c.order_number.split("-")[1]:null),tableNumber:(null===c||void 0===c?void 0:c.table_number)||Xt||void 0,pagerNumber:(null===c||void 0===c?void 0:c.pager_number)||nn||void 0,takeawayCharge:(null===c||void 0===c?void 0:c.takeaway_charge)||(null===c||void 0===c?void 0:c.takeawayCharge)||a.takeawayCharge,subtotal:(null===c||void 0===c?void 0:c.subtotal)||a.subtotal,tax:(null===c||void 0===c?void 0:c.tax)||a.tax,serviceCharge:(null===c||void 0===c?void 0:c.service_charge)||(null===c||void 0===c?void 0:c.serviceCharge)||a.serviceCharge,discount:(null===c||void 0===c?void 0:c.discount)||a.discount,discountPolicy:a.discountPolicy,coupon:a.coupon,pointsUsed:a.pointsUsed||0,pointDiscount:a.pointDiscount||0,total:(null===c||void 0===c?void 0:c.total)||a.total,cashierName:(null===l||void 0===l?void 0:l.name)||null}),Et(!0),W(!1),L([]),Tt(0),qt(null),Ut(null),Rt(""),Zt(""),on(""),sn(""),wn(null),fn(""),console.log("POS - Payment processing completed:",null===c||void 0===c?void 0:c.orderNumber)}catch(s){console.error("POS - Error processing payment:",s),alert("Failed to process payment. Please try again.")}finally{Ot(!1)}},paymentMethods:bn,taxRate:b.taxRate,serviceChargeRate:b.serviceChargeRate,taxEnabled:b.taxEnabled,serviceChargeEnabled:b.serviceChargeEnabled,cashierName:null===l||void 0===l?void 0:l.name,customerPoints:Dn,customerTier:Ln,membershipSettings:$n}),It&&(0,h.jsx)(a.A,{isOpen:Y,onClose:()=>{G(!1),_t(null)},menuItem:It,onConfirm:(e,t,n)=>{if(!It)return;let i=[...t];if(It.is_set_menu&&It.set_items&&It.set_items.length>0){i=[...It.set_items.map(e=>{const t=y.find(t=>parseInt(t.id)===e.menuItemId),n=null===t||void 0===t?void 0:t.code;return`${n?`${n} `:""}${e.name} x${e.quantity}`}),...t]}const o=i.sort().join(","),r=R.find(e=>{var t;return e.menuItem.id===It.id&&(null===(t=e.options)||void 0===t?void 0:t.sort().join(","))===o});L(r?R.map(t=>t.id===r.id?{...t,quantity:t.quantity+e}:t):[...R,{id:`order-${Date.now()}`,menuItem:It,quantity:e,options:i.length>0?i:void 0,selectedOptions:n}]),G(!1),_t(null)}}),Nt&&(0,h.jsx)($,{isOpen:H,onClose:()=>{Kn(),n&&e(`/restaurant/${u}/floor-plan`)},orderData:Nt,onPrintBill:()=>{}}),(0,h.jsx)(K.A,{isOpen:Wt,onClose:()=>Yt(!1),onConfirm:()=>{L([]),Tt(0),qt(null),Ut(null),Rt(""),wn(null),fn(""),on(""),sn(""),Yt(!1)},title:"Clear Order",message:"Are you sure you want to clear all items from the order?",confirmText:"Clear Order",cancelText:"Cancel",variant:"warning"}),(0,h.jsx)(J,{isOpen:Gt,onClose:()=>Ht(!1),title:"Coming Soon",message:"This feature is coming soon",variant:"info"}),(0,h.jsx)(J,{isOpen:Vt,onClose:()=>Kt(!1),title:"Invalid Coupon",message:"The coupon code you entered is not valid. Please check and try again.",variant:"error"}),(0,h.jsx)(Q.A,{isOpen:dn,onClose:()=>cn(!1),onConfirm:e=>{const t=parseFloat(e);!isNaN(t)&&t>=0&&(Tt(t),Ut(null)),cn(!1)},title:"Custom Discount Amount",label:"Enter discount amount:",placeholder:"25",min:0,suffix:` ${(0,x.Qn)(Nn)}`,confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(Q.A,{isOpen:xn,onClose:()=>hn(!1),onConfirm:e=>{const t=parseFloat(e);if(!isNaN(t)&&t>=0&&t<=100){Ut({name:`${t}%`,discount:Zn*(t/100),requiresApproval:!1}),Tt(0)}hn(!1)},title:"Custom Discount Percentage",label:"Enter discount percentage:",placeholder:"10",min:0,max:100,suffix:"%",confirmText:"Apply Discount",cancelText:"Cancel"}),(0,h.jsx)(ie.A,{}),(0,h.jsx)(V,{show:pn,onClose:()=>un(!1),onVerified:e=>{e.token&&e.user&&d(e.token,e.user),un(!1)},onLogout:()=>{p()},currentCashierName:null===l||void 0===l?void 0:l.name})]})})},2538:(e,t,n)=>{n.d(t,{A:()=>c});var i=n(9950),o=n(9610),r=n(4752),s=n(4414);const a=r.Ay.input`
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