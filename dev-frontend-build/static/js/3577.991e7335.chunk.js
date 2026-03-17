"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,n,i)=>{i.d(n,{A:()=>_});var t=i(9950),r=i(7119),s=i(4752),o=i(1367),d=i(9018),l=i(6038),a=i(8285),c=i(4414);const x={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},h={pos:"POS",mobile:"Mobile Order"},p={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},u=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 40px 20px;
  overflow-y: auto;

  @media print {
    position: static;
    background: none;
    padding: 0;
    overflow: visible;
  }
`,v=s.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  @media print {
    max-width: none;
    border-radius: 0;
    box-shadow: none;
  }
`,j=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,g=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,m=s.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6B7C93;
  font-size: 20px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,f=s.Ay.button`
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};

  &:hover {
    border-color: #635BFF;
    color: ${e=>e.active?"white":"#635BFF"};
  }
`,b=s.Ay.input`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  margin-left: auto;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=s.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,w=s.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.primary?"#635BFF":"#E6EBF1"};
  background: ${e=>e.primary?"#635BFF":"white"};
  color: ${e=>e.primary?"white":"#0A2540"};

  &:hover {
    background: ${e=>e.primary?"#5A51E6":"#F6F9FC"};
  }
`,C=s.Ay.div`
  padding: 24px;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #1F2937;
  max-height: 70vh;
  overflow-y: auto;

  @media print {
    max-height: none;
    overflow: visible;
    padding: 5mm;
    width: 80mm;
    max-width: 80mm;
    font-size: 11px;
  }
`,F=s.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,S=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,E=s.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,T=s.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 12px 0;
  padding: 8px 0;
  border-top: 1px dashed #9CA3AF;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 13px;
  }
`,k=s.Ay.div`
  margin-bottom: 12px;
`,D=s.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,$=s.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};
  padding-left: ${e=>e.indent?"16px":"0"};
  color: ${e=>e.negative?"#DC2626":"inherit"};

  @media print {
    font-size: ${e=>e.total?"13px":"11px"};
    padding-left: ${e=>e.indent?"12px":"0"};
  }
`,z=s.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,B=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,O=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,M=s.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,N=s.Ay.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #9CA3AF;
  font-size: 11px;
  color: #6B7280;
  line-height: 1.6;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,L=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,R=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,I=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),P=e=>{const[n,i,t]=e.split("-");return`${parseInt(t)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(i)-1]} ${n}`},_=e=>{var n,i;let{isOpen:s,onClose:_}=e;const{user:V}=(0,o.As)(),{storeSettings:q,operationSettings:H,paymentSettings:Y}=(0,d.Pj)(),Z=H.timeZone||"Asia/Kuala_Lumpur",G=H.currency,[U,J]=(0,t.useState)(I(Z)),[K,W]=(0,t.useState)(null),[Q,X]=(0,t.useState)(!1),ee=(0,t.useCallback)(async e=>{if(null===V||void 0===V||!V.restaurantId)return;const n=localStorage.getItem("auth_token");if(n){X(!0);try{const i=await fetch(`/api/dashboard/restaurant/${V.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json();e.success&&W(e.data)}}catch(i){console.error("Error fetching settlement data:",i)}finally{X(!1)}}},[null===V||void 0===V?void 0:V.restaurantId]);(0,t.useEffect)(()=>{s&&ee(U)},[s,U,ee]);const ne=t.useRef(null),ie=e=>{J(e)};if(!s)return null;const te=I(Z),re=(e=>{const n=new Date;return n.setDate(n.getDate()-1),n.toLocaleDateString("en-CA",{timeZone:e})})(Z),se=null===K||void 0===K?void 0:K.settlement,oe=(null===K||void 0===K||null===(n=K.summary)||void 0===n?void 0:n.totalOrders)||0,de=(null===K||void 0===K||null===(i=K.summary)||void 0===i?void 0:i.averageOrderValue)||0,le=((null===K||void 0===K?void 0:K.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,n)=>n.revenue-e.revenue),ae=((null===K||void 0===K?void 0:K.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),ce=((null===K||void 0===K?void 0:K.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),xe=((null===K||void 0===K?void 0:K.sourceSales)||[]).filter(e=>e.orders>0).sort((e,n)=>n.revenue-e.revenue),he=((null===K||void 0===K?void 0:K.categorySales)||[]).filter(e=>e.revenue>0).sort((e,n)=>n.revenue-e.revenue),pe=((null===K||void 0===K?void 0:K.menuSales)||[]).filter(e=>e.quantity>0).sort((e,n)=>n.quantity-e.quantity).slice(0,10),ue=(null===K||void 0===K?void 0:K.staffMeal)||{revenue:0,orders:0},ve=le.reduce((e,n)=>e+n.revenue,0),je=(new Date).toLocaleString("en-GB",{timeZone:Z,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,c.jsx)(u,{onClick:e=>{e.target===e.currentTarget&&_()},children:(0,c.jsxs)(v,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(j,{className:"no-print",children:[(0,c.jsx)(g,{children:"Daily Settlement Report"}),(0,c.jsx)(m,{onClick:_,children:"\xd7"})]}),(0,c.jsxs)(y,{className:"no-print",children:[(0,c.jsx)(f,{active:U===te,onClick:()=>ie(te),children:"Today"}),(0,c.jsx)(f,{active:U===re,onClick:()=>ie(re),children:"Yesterday"}),(0,c.jsx)(b,{type:"date",value:U,max:te,onChange:e=>ie(e.target.value)})]}),Q?(0,c.jsx)(L,{children:"Loading settlement data..."}):K&&0!==oe?(0,c.jsxs)(C,{ref:ne,children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(S,{children:q.name}),(0,c.jsxs)(E,{children:[q.address&&(0,c.jsx)("div",{children:q.address}),(q.city||q.state)&&(0,c.jsx)("div",{children:[q.city,q.state,q.postalCode].filter(Boolean).join(", ")}),q.phone&&(0,c.jsxs)("div",{children:["Tel: ",q.phone]}),(q.businessRegistration||q.gstRegNo)&&(0,c.jsxs)("div",{children:[q.businessRegistration&&(0,c.jsxs)(c.Fragment,{children:["Reg No: ",q.businessRegistration]}),q.businessRegistration&&q.gstRegNo&&" | ",q.gstRegNo&&(0,c.jsxs)(c.Fragment,{children:["Tax No: ",q.gstRegNo]})]})]})]}),(0,c.jsx)(T,{children:"DAILY SETTLEMENT"}),(0,c.jsxs)(k,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Date:"}),(0,c.jsx)(B,{children:P(U)})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Printed:"}),(0,c.jsx)(B,{children:je})]})]}),(0,c.jsx)(M,{style_type:"double"}),(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"SALES SUMMARY"}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Gross Sales"}),(0,c.jsx)(B,{children:(0,l.vv)((null===se||void 0===se?void 0:se.grossSales)||0,G)})]}),((null===se||void 0===se?void 0:se.totalDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(-) Discount"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalDiscount,G)})]}),((null===se||void 0===se?void 0:se.totalCouponDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(-) Coupon Discount"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalCouponDiscount,G)})]}),((null===se||void 0===se?void 0:se.totalPointDiscount)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(-) Point Discount"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalPointDiscount,G)})]}),((null===se||void 0===se?void 0:se.totalTakeawayCharge)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(+) Takeaway Charge"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalTakeawayCharge,G)})]}),((null===se||void 0===se?void 0:se.totalDeliveryFee)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(+) Delivery Fee"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalDeliveryFee,G)})]}),((null===se||void 0===se?void 0:se.totalServiceCharge)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(+) Service Charge"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalServiceCharge,G)})]}),((null===se||void 0===se?void 0:se.totalTax)||0)>0&&(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"(+) Tax"}),(0,c.jsx)(B,{children:(0,l.vv)(se.totalTax,G)})]}),(0,c.jsxs)($,{total:!0,children:[(0,c.jsx)(z,{children:"NET SALES"}),(0,c.jsx)(B,{children:(0,l.vv)((null===se||void 0===se?void 0:se.netSales)||0,G)})]}),(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Total Orders"}),(0,c.jsx)(B,{children:oe})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Avg Order Value"}),(0,c.jsx)(B,{children:(0,l.vv)(de,G)})]}),((null===se||void 0===se?void 0:se.cancelledOrders)||0)>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)($,{negative:!0,children:[(0,c.jsx)(z,{children:"Cancelled Orders"}),(0,c.jsx)(O,{children:se.cancelledOrders}),(0,c.jsx)(B,{children:(0,l.vv)(se.cancelledAmount,G)})]})]}),((null===se||void 0===se?void 0:se.outstandingOrders)||0)>0&&(0,c.jsxs)($,{negative:!0,children:[(0,c.jsx)(z,{children:"Outstanding Orders"}),(0,c.jsx)(O,{children:se.outstandingOrders}),(0,c.jsx)(B,{children:(0,l.vv)(se.outstandingAmount,G)})]})]}),(0,c.jsx)(M,{style_type:"double"}),le.length>0&&(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"PAYMENT SETTLEMENT"}),le.map(e=>(0,c.jsxs)(t.Fragment,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:(0,a._M)(e.method,Y||void 0)}),(0,c.jsxs)(O,{children:["x",e.orders]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]}),"card"===e.method&&ae.length>0&&ae.map((e,n)=>(0,c.jsxs)($,{indent:!0,children:[(0,c.jsxs)(z,{children:[n<ae.length-1?"\u251c":"\u2514"," ",p[e.type]||e.type]}),(0,c.jsxs)(O,{children:["x",e.orders]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]},e.type))]},e.method)),(0,c.jsxs)($,{total:!0,children:[(0,c.jsx)(z,{children:"TOTAL COLLECTED"}),(0,c.jsx)(B,{children:(0,l.vv)(ve,G)})]})]}),(0,c.jsx)(M,{}),xe.length>0&&(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"ORDER SOURCE"}),xe.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:h[e.source]||e.source}),(0,c.jsxs)(O,{children:["x",e.orders]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]},e.source))]}),(0,c.jsx)(M,{}),ce.length>0&&(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"ORDER TYPE"}),ce.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:x[e.type]||e.type}),(0,c.jsxs)(O,{children:["x",e.orders]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]},e.type))]}),(0,c.jsx)(M,{}),he.length>0&&(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"SALES BY CATEGORY"}),he.map(e=>(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:e.category}),(0,c.jsxs)(O,{children:[e.quantity,"qty"]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]},e.category)),(0,c.jsxs)($,{bold:!0,children:[(0,c.jsx)(z,{children:"Total"}),(0,c.jsxs)(O,{children:[he.reduce((e,n)=>e+n.quantity,0),"qty"]}),(0,c.jsx)(B,{children:(0,l.vv)(he.reduce((e,n)=>e+n.revenue,0),G)})]})]}),pe.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{style_type:"dashed"}),(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"TOP SELLING ITEMS"}),pe.map((e,n)=>(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:e.name}),(0,c.jsxs)(O,{children:["x",e.quantity]}),(0,c.jsx)(B,{children:(0,l.vv)(e.revenue,G)})]},`${e.name}-${n}`))]})]}),ue.orders>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(M,{}),(0,c.jsxs)(k,{children:[(0,c.jsx)(D,{children:"STAFF MEALS (NON-REVENUE)"}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Staff Meal Orders"}),(0,c.jsx)(B,{children:ue.orders})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(z,{children:"Staff Meal Value"}),(0,c.jsx)(B,{children:(0,l.vv)(ue.revenue,G)})]})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,c.jsx)("div",{children:q.name})]})]}):(0,c.jsxs)(R,{children:["No sales data for ",P(U)]}),!Q&&K&&oe>0&&(0,c.jsxs)(A,{className:"no-print",children:[(0,c.jsx)(w,{onClick:_,children:"Close"}),(0,c.jsxs)(w,{primary:!0,onClick:()=>{if(!ne.current)return;const e=ne.current.cloneNode(!0),n=Array.from(document.querySelectorAll("style[data-styled]")).map(e=>e.outerHTML).join("\n"),i=window.open("","_blank","width=400,height=600,scrollbars=yes");i&&(i.document.write(`\n      <html>\n      <head>\n        <title>Daily Settlement</title>\n        ${n}\n        <style>\n          @page { size: 80mm auto; margin: 0mm; }\n          body {\n            margin: 0; padding: 5mm;\n            font-family: 'Courier New', 'Consolas', monospace;\n            font-size: 11px; line-height: 1.5; color: #000;\n            width: 80mm; max-width: 80mm;\n          }\n          * { color: #000 !important; }\n        </style>\n      </head>\n      <body>${e.outerHTML}</body>\n      </html>\n    `),i.document.close(),i.onload=function(){setTimeout(()=>{i.print(),i.onafterprint=function(){i.close()},setTimeout(()=>{i.closed||i.close()},1e3)},200)})},children:[(0,c.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]})}),document.body)}}}]);