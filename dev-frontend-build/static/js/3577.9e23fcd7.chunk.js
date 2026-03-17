"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,t,n)=>{n.d(t,{A:()=>I});var i=n(9950),r=n(7119),o=n(4752),s=n(1367),d=n(9018),l=n(6038),a=n(8285),c=n(4414);const p={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},x={pos:"POS",mobile:"Mobile Order"},h={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},u=o.Ay.div`
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
`,v=o.Ay.div`
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
`,g=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,m=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,y=o.Ay.button`
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
`,j=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,f=o.Ay.button`
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
`,b=o.Ay.input`
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
`,w=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,A=o.Ay.button`
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
`,S=o.Ay.div`
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
`,E=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,C=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,T=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,D=o.Ay.div`
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
`,F=o.Ay.div`
  margin-bottom: 12px;
`,$=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,O=o.Ay.div`
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
`,k=o.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,M=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,L=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,N=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,z=o.Ay.div`
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
`,R=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,B=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,P=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),q=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},I=e=>{var t,n;let{isOpen:o,onClose:I}=e;const{user:V}=(0,s.As)(),{storeSettings:Y,operationSettings:_,paymentSettings:G}=(0,d.Pj)(),U=_.timeZone||"Asia/Kuala_Lumpur",H=_.currency,[Z,J]=(0,i.useState)(P(U)),[K,W]=(0,i.useState)(null),[Q,X]=(0,i.useState)(!1),ee=(0,i.useCallback)(async e=>{if(null===V||void 0===V||!V.restaurantId)return;const t=localStorage.getItem("auth_token");if(t){X(!0);try{const n=await fetch(`/api/dashboard/restaurant/${V.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&W(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{X(!1)}}},[null===V||void 0===V?void 0:V.restaurantId]);(0,i.useEffect)(()=>{o&&ee(Z)},[o,Z,ee]);const te=(0,i.useCallback)(()=>{var e,t;if(!K||!K.settlement)return"";const n=K.settlement,i=(null===(e=K.summary)||void 0===e?void 0:e.totalOrders)||0,r=(null===(t=K.summary)||void 0===t?void 0:t.averageOrderValue)||0,o=e=>(0,l.vv)(e,H),s=G||void 0,d=(K.paymentMethodSales||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),c=(K.cardTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),u=(K.orderTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),v=(K.sourceSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),g=(K.categorySales||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),m=(K.menuSales||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),y=K.staffMeal||{revenue:0,orders:0},j=d.reduce((e,t)=>e+t.revenue,0),f=(new Date).toLocaleString("en-GB",{timeZone:U,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),b=(e,t,n)=>`<div style="${["display:flex","justify-content:space-between","align-items:baseline","padding:"+(null!==n&&void 0!==n&&n.total?"8px 0 4px 0":"2px 0"),"font-weight:"+(null!==n&&void 0!==n&&n.bold||null!==n&&void 0!==n&&n.total?700:600),"font-size:"+(null!==n&&void 0!==n&&n.total?"16px":"14px"),null!==n&&void 0!==n&&n.total?"border-top:2px solid #000; margin-top:8px":"",null!==n&&void 0!==n&&n.indent?"padding-left:16px":"",null!==n&&void 0!==n&&n.negative?"color:#DC2626":""].filter(Boolean).join(";")}"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px">${e}</span>${null!==n&&void 0!==n&&n.count?`<span style="text-align:right;white-space:nowrap;min-width:36px;margin:0 4px">${n.count}</span>`:""}<span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${t}</span></div>`,w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"dashed";return`<div style="border-bottom:${"double"===e?"3px double #000":"solid"===e?"1px solid #666":"1px dashed #666"};margin:8px 0"></div>`},A=e=>`<div style="font-weight:700;font-size:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px dashed #666">${e}</div>`;let S=`<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${Y.name}</div>`;const E=[];Y.address&&E.push(Y.address),(Y.city||Y.state)&&E.push([Y.city,Y.state,Y.postalCode].filter(Boolean).join(", ")),Y.phone&&E.push(`Tel: ${Y.phone}`);const C=[];Y.businessRegistration&&C.push(`Reg No: ${Y.businessRegistration}`),Y.gstRegNo&&C.push(`Tax No: ${Y.gstRegNo}`),C.length>0&&E.push(C.join(" | ")),S+=`<div style="font-size:11px;line-height:1.4">${E.join("<br>")}</div>`;let T="";if(T+=`<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000">${S}</div>`,T+='<div style="text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666">DAILY SETTLEMENT</div>',T+=b("Date:",q(Z)),T+=b("Printed:",f),T+=w("double"),T+=A("SALES SUMMARY"),T+=b("Gross Sales",o(n.grossSales)),n.totalDiscount>0&&(T+=b("(-) Discount",o(n.totalDiscount))),n.totalCouponDiscount>0&&(T+=b("(-) Coupon Discount",o(n.totalCouponDiscount))),n.totalPointDiscount>0&&(T+=b("(-) Point Discount",o(n.totalPointDiscount))),n.totalTakeawayCharge>0&&(T+=b("(+) Takeaway Charge",o(n.totalTakeawayCharge))),n.totalDeliveryFee>0&&(T+=b("(+) Delivery Fee",o(n.totalDeliveryFee))),n.totalServiceCharge>0&&(T+=b("(+) Service Charge",o(n.totalServiceCharge))),n.totalTax>0&&(T+=b("(+) Tax",o(n.totalTax))),T+=b("NET SALES",o(n.netSales),{total:!0}),T+=w("dashed"),T+=b("Total Orders",String(i)),T+=b("Avg Order Value",o(r)),n.cancelledOrders>0&&(T+=w("dashed"),T+=b("Cancelled Orders",o(n.cancelledAmount),{negative:!0,count:String(n.cancelledOrders)})),n.outstandingOrders>0&&(T+=b("Outstanding Orders",o(n.outstandingAmount),{negative:!0,count:String(n.outstandingOrders)})),T+=w("double"),d.length>0&&(T+=A("PAYMENT SETTLEMENT"),d.forEach(e=>{T+=b((0,a._M)(e.method,s),o(e.revenue),{count:`x${e.orders}`}),"card"===e.method&&c.length>0&&c.forEach((e,t)=>{const n=t<c.length-1?"\u251c":"\u2514";T+=b(`${n} ${h[e.type]||e.type}`,o(e.revenue),{indent:!0,count:`x${e.orders}`})})}),T+=b("TOTAL COLLECTED",o(j),{total:!0}),T+=w()),v.length>0&&(T+=A("ORDER SOURCE"),v.forEach(e=>{T+=b(x[e.source]||e.source,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),u.length>0&&(T+=A("ORDER TYPE"),u.forEach(e=>{T+=b(p[e.type]||e.type,o(e.revenue),{count:`x${e.orders}`})}),T+=w()),g.length>0){T+=A("SALES BY CATEGORY"),g.forEach(e=>{T+=b(e.category,o(e.revenue),{count:`${e.quantity}qty`})});const e=g.reduce((e,t)=>e+t.quantity,0),t=g.reduce((e,t)=>e+t.revenue,0);T+=b("Total",o(t),{bold:!0,count:`${e}qty`})}return m.length>0&&(T+=w("dashed"),T+=A("TOP SELLING ITEMS"),m.forEach(e=>{T+=b(e.name,o(e.revenue),{count:`x${e.quantity}`})})),y.orders>0&&(T+=w(),T+=A("STAFF MEALS (NON-REVENUE)"),T+=b("Staff Meal Orders",String(y.orders)),T+=b("Staff Meal Value",o(y.revenue))),T+=`<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6">\n      <div>--- End of Daily Settlement ---</div>\n      <div>${Y.name}</div>\n    </div>`,`<!DOCTYPE html>\n    <html><head><meta charset="UTF-8"><title>Daily Settlement - ${q(Z)}</title>\n    <style>\n      @page { size: 80mm auto; margin: 0; }\n      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }\n      body { font-family: 'Lucida Console', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; -webkit-font-smoothing: none; letter-spacing: 0.3px; }\n    </style></head><body>${T}</body></html>`},[K,Z,H,Y,G,U]),ne=e=>{J(e)};if(!o)return null;const ie=P(U),re=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(U),oe=null===K||void 0===K?void 0:K.settlement,se=(null===K||void 0===K||null===(t=K.summary)||void 0===t?void 0:t.totalOrders)||0,de=(null===K||void 0===K||null===(n=K.summary)||void 0===n?void 0:n.averageOrderValue)||0,le=((null===K||void 0===K?void 0:K.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),ae=((null===K||void 0===K?void 0:K.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),ce=((null===K||void 0===K?void 0:K.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),pe=((null===K||void 0===K?void 0:K.sourceSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),xe=((null===K||void 0===K?void 0:K.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),he=((null===K||void 0===K?void 0:K.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),ue=(null===K||void 0===K?void 0:K.staffMeal)||{revenue:0,orders:0},ve=le.reduce((e,t)=>e+t.revenue,0),ge=(new Date).toLocaleString("en-GB",{timeZone:U,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,c.jsx)(u,{onClick:e=>{e.target===e.currentTarget&&I()},children:(0,c.jsxs)(v,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(g,{className:"no-print",children:[(0,c.jsx)(m,{children:"Daily Settlement Report"}),(0,c.jsx)(y,{onClick:I,children:"\xd7"})]}),(0,c.jsxs)(j,{className:"no-print",children:[(0,c.jsx)(f,{active:Z===ie,onClick:()=>ne(ie),children:"Today"}),(0,c.jsx)(f,{active:Z===re,onClick:()=>ne(re),children:"Yesterday"}),(0,c.jsx)(b,{type:"date",value:Z,max:ie,onChange:e=>ne(e.target.value)})]}),Q?(0,c.jsx)(R,{children:"Loading settlement data..."}):K&&0!==se?(0,c.jsxs)(S,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(C,{children:Y.name}),(0,c.jsxs)(T,{children:[Y.address&&(0,c.jsx)("div",{children:Y.address}),(Y.city||Y.state)&&(0,c.jsx)("div",{children:[Y.city,Y.state,Y.postalCode].filter(Boolean).join(", ")}),Y.phone&&(0,c.jsxs)("div",{children:["Tel: ",Y.phone]}),(Y.businessRegistration||Y.gstRegNo)&&(0,c.jsxs)("div",{children:[Y.businessRegistration&&(0,c.jsxs)(c.Fragment,{children:["Reg No: ",Y.businessRegistration]}),Y.businessRegistration&&Y.gstRegNo&&" | ",Y.gstRegNo&&(0,c.jsxs)(c.Fragment,{children:["Tax No: ",Y.gstRegNo]})]})]})]}),(0,c.jsx)(D,{children:"DAILY SETTLEMENT"}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Date:"}),(0,c.jsx)(M,{children:q(Z)})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Printed:"}),(0,c.jsx)(M,{children:ge})]})]}),(0,c.jsx)(N,{style_type:"double"}),(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"SALES SUMMARY"}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Gross Sales"}),(0,c.jsx)(M,{children:(0,l.vv)((null===oe||void 0===oe?void 0:oe.grossSales)||0,H)})]}),((null===oe||void 0===oe?void 0:oe.totalDiscount)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(-) Discount"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalDiscount,H)})]}),((null===oe||void 0===oe?void 0:oe.totalCouponDiscount)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(-) Coupon Discount"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalCouponDiscount,H)})]}),((null===oe||void 0===oe?void 0:oe.totalPointDiscount)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(-) Point Discount"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalPointDiscount,H)})]}),((null===oe||void 0===oe?void 0:oe.totalTakeawayCharge)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(+) Takeaway Charge"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalTakeawayCharge,H)})]}),((null===oe||void 0===oe?void 0:oe.totalDeliveryFee)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(+) Delivery Fee"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalDeliveryFee,H)})]}),((null===oe||void 0===oe?void 0:oe.totalServiceCharge)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(+) Service Charge"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalServiceCharge,H)})]}),((null===oe||void 0===oe?void 0:oe.totalTax)||0)>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"(+) Tax"}),(0,c.jsx)(M,{children:(0,l.vv)(oe.totalTax,H)})]}),(0,c.jsxs)(O,{total:!0,children:[(0,c.jsx)(k,{children:"NET SALES"}),(0,c.jsx)(M,{children:(0,l.vv)((null===oe||void 0===oe?void 0:oe.netSales)||0,H)})]}),(0,c.jsx)(N,{style_type:"dashed"}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Total Orders"}),(0,c.jsx)(M,{children:se})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Avg Order Value"}),(0,c.jsx)(M,{children:(0,l.vv)(de,H)})]}),((null===oe||void 0===oe?void 0:oe.cancelledOrders)||0)>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{style_type:"dashed"}),(0,c.jsxs)(O,{negative:!0,children:[(0,c.jsx)(k,{children:"Cancelled Orders"}),(0,c.jsx)(L,{children:oe.cancelledOrders}),(0,c.jsx)(M,{children:(0,l.vv)(oe.cancelledAmount,H)})]})]}),((null===oe||void 0===oe?void 0:oe.outstandingOrders)||0)>0&&(0,c.jsxs)(O,{negative:!0,children:[(0,c.jsx)(k,{children:"Outstanding Orders"}),(0,c.jsx)(L,{children:oe.outstandingOrders}),(0,c.jsx)(M,{children:(0,l.vv)(oe.outstandingAmount,H)})]})]}),(0,c.jsx)(N,{style_type:"double"}),le.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"PAYMENT SETTLEMENT"}),le.map(e=>(0,c.jsxs)(i.Fragment,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:(0,a._M)(e.method,G||void 0)}),(0,c.jsxs)(L,{children:["x",e.orders]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]}),"card"===e.method&&ae.length>0&&ae.map((e,t)=>(0,c.jsxs)(O,{indent:!0,children:[(0,c.jsxs)(k,{children:[t<ae.length-1?"\u251c":"\u2514"," ",h[e.type]||e.type]}),(0,c.jsxs)(L,{children:["x",e.orders]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]},e.type))]},e.method)),(0,c.jsxs)(O,{total:!0,children:[(0,c.jsx)(k,{children:"TOTAL COLLECTED"}),(0,c.jsx)(M,{children:(0,l.vv)(ve,H)})]})]}),(0,c.jsx)(N,{}),pe.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"ORDER SOURCE"}),pe.map(e=>(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:x[e.source]||e.source}),(0,c.jsxs)(L,{children:["x",e.orders]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]},e.source))]}),(0,c.jsx)(N,{}),ce.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"ORDER TYPE"}),ce.map(e=>(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:p[e.type]||e.type}),(0,c.jsxs)(L,{children:["x",e.orders]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]},e.type))]}),(0,c.jsx)(N,{}),xe.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"SALES BY CATEGORY"}),xe.map(e=>(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:e.category}),(0,c.jsxs)(L,{children:[e.quantity,"qty"]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]},e.category)),(0,c.jsxs)(O,{bold:!0,children:[(0,c.jsx)(k,{children:"Total"}),(0,c.jsxs)(L,{children:[xe.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,c.jsx)(M,{children:(0,l.vv)(xe.reduce((e,t)=>e+t.revenue,0),H)})]})]}),he.length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{style_type:"dashed"}),(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"TOP SELLING ITEMS"}),he.map((e,t)=>(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:e.name}),(0,c.jsxs)(L,{children:["x",e.quantity]}),(0,c.jsx)(M,{children:(0,l.vv)(e.revenue,H)})]},`${e.name}-${t}`))]})]}),ue.orders>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{}),(0,c.jsxs)(F,{children:[(0,c.jsx)($,{children:"STAFF MEALS (NON-REVENUE)"}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Staff Meal Orders"}),(0,c.jsx)(M,{children:ue.orders})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(k,{children:"Staff Meal Value"}),(0,c.jsx)(M,{children:(0,l.vv)(ue.revenue,H)})]})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,c.jsx)("div",{children:Y.name})]})]}):(0,c.jsxs)(B,{children:["No sales data for ",q(Z)]}),!Q&&K&&se>0&&(0,c.jsxs)(w,{className:"no-print",children:[(0,c.jsx)(A,{onClick:I,children:"Close"}),(0,c.jsxs)(A,{primary:!0,onClick:()=>{const e=te();if(!e)return;const t=window.open("","_blank","width=400,height=600,scrollbars=yes");t&&(t.document.write(e),t.document.close(),t.onload=function(){setTimeout(()=>{t.print(),t.onafterprint=function(){t.close()},setTimeout(()=>{t.closed||t.close()},1e3)},200)})},children:[(0,c.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,c.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]})}),document.body)}}}]);