"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3577],{3577:(e,t,n)=>{n.d(t,{A:()=>Y});var i=n(9950),r=n(7119),o=n(4752),s=n(1367),l=n(9018),a=n(6038),d=n(8285),c=n(5863),p=n(5030),x=n(9955),h=n(4414);const u={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},v={pos:"POS",mobile:"Mobile Order"},g={visa:"Visa",mastercard:"Mastercard",master:"Mastercard",amex:"Amex",other:"Other",unspecified:"Unspecified"},m=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;

  @media print {
    position: static;
    background: none;
    padding: 0;
    overflow: visible;
  }
`,y=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media print {
    max-width: none;
    max-height: none;
    border-radius: 0;
    box-shadow: none;
  }
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,j=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,b=o.Ay.button`
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
`,w=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,S=o.Ay.button`
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
`,C=o.Ay.input`
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
`,A=o.Ay.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;

  @media print {
    overflow: visible;
  }
`,F=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;
  flex-shrink: 0;

  @media print {
    display: none;
  }
`,$=o.Ay.button`
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
`,D=o.Ay.div`
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
`,k=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,E=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,P=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,T=o.Ay.div`
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
`,O=o.Ay.div`
  margin-bottom: 12px;
`,M=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,B=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};
  padding-left: ${e=>e.indent?"16px":"0"};
  font-weight: ${e=>e.negative?700:void 0};
  color: inherit;

  @media print {
    font-size: ${e=>e.total?"13px":"11px"};
    padding-left: ${e=>e.indent?"12px":"0"};
  }
`,z=o.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,N=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,R=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,L=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,q=o.Ay.div`
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
`,V=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,_=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,I=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),H=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},Y=e=>{var t,o;let{isOpen:Y,onClose:G}=e;const{t:U}=(0,p.Bd)("reports"),{user:Z}=(0,s.As)(),{storeSettings:W,operationSettings:J,paymentSettings:K}=(0,l.Pj)(),Q=J.timeZone||"Asia/Kuala_Lumpur",X=J.currency,[ee,te]=(0,i.useState)(I(Q)),[ne,ie]=(0,i.useState)(null),[re,oe]=(0,i.useState)(!1),se=(0,i.useCallback)(async e=>{if(null===Z||void 0===Z||!Z.restaurantId)return;const t=(0,x.c4)();if(t){oe(!0);try{const n=await fetch(`/api/dashboard/restaurant/${Z.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&ie(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{oe(!1)}}},[null===Z||void 0===Z?void 0:Z.restaurantId]);(0,i.useEffect)(()=>{Y&&se(ee)},[Y,ee,se]);const le=(0,i.useCallback)(()=>{var e,t;if(!ne||!ne.settlement)return"";const n=ne.settlement,i=(null===(e=ne.summary)||void 0===e?void 0:e.totalOrders)||0,r=(null===(t=ne.summary)||void 0===t?void 0:t.averageOrderValue)||0,o=e=>(0,a.vv)(e,X),s=K||void 0,l=(ne.paymentMethodSales||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),c=(ne.cardTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),p=(ne.orderTypeSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),x=(ne.sourceSales||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),h=(ne.categorySales||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),m=(ne.menuSales||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),y=ne.staffMeal||{revenue:0,orders:0},f=l.reduce((e,t)=>e+t.revenue,0),j=(new Date).toLocaleString("en-GB",{timeZone:Q,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),b=(e,t,n)=>`<div style="${["display:flex","justify-content:space-between","align-items:baseline","padding:"+(null!==n&&void 0!==n&&n.total?"8px 0 4px 0":"2px 0"),"font-weight:"+(null!==n&&void 0!==n&&n.bold||null!==n&&void 0!==n&&n.total?700:600),"font-size:"+(null!==n&&void 0!==n&&n.total?"16px":"14px"),null!==n&&void 0!==n&&n.total?"border-top:2px solid #000; margin-top:8px":"",null!==n&&void 0!==n&&n.indent?"padding-left:16px":"",null!==n&&void 0!==n&&n.negative?"font-weight:700":""].filter(Boolean).join(";")}"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:8px">${e}</span>${null!==n&&void 0!==n&&n.count?`<span style="text-align:right;white-space:nowrap;min-width:36px;margin:0 4px">${n.count}</span>`:""}<span style="text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums">${t}</span></div>`,w=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"dashed";return`<div style="border-bottom:${"double"===e?"3px double #000":"solid"===e?"1px solid #666":"1px dashed #666"};margin:8px 0"></div>`},S=e=>`<div style="font-weight:700;font-size:14px;margin-bottom:6px;padding-bottom:4px;border-bottom:1px dashed #666">${e}</div>`;let C=`<div style="font-size:18px;font-weight:900;letter-spacing:1px;margin-bottom:4px">${W.name}</div>`;const A=[];W.address&&A.push(W.address),(W.city||W.state)&&A.push([W.city,W.state,W.postalCode].filter(Boolean).join(", ")),W.phone&&A.push(`Tel: ${W.phone}`);const F=[];W.businessRegistration&&F.push(`Reg No: ${W.businessRegistration}`),W.gstRegNo&&F.push(`Tax No: ${W.gstRegNo}`),F.length>0&&A.push(F.join(" | ")),C+=`<div style="font-size:11px;line-height:1.4">${A.join("<br>")}</div>`;let $="";if($+=`<div style="text-align:center;padding-bottom:12px;margin-bottom:12px;border-bottom:2px solid #000">${C}</div>`,$+="<div style=\"text-align:center;font-size:16px;font-weight:900;letter-spacing:2px;margin:12px 0;padding:8px 0;border-top:1px dashed #666;border-bottom:1px dashed #666\">{t('reports:dailySettlementPrint.dailySettlement')}</div>",$+=b("Date:",H(ee)),$+=b("Printed:",j),$+=w("double"),$+=S("SALES SUMMARY"),$+=b("Gross Sales",o(n.grossSales)),n.totalDiscount>0&&($+=b("(-) Discount",o(n.totalDiscount))),n.totalCouponDiscount>0&&($+=b("(-) Coupon Discount",o(n.totalCouponDiscount))),n.totalPointDiscount>0&&($+=b("(-) Point Discount",o(n.totalPointDiscount))),n.totalTakeawayCharge>0&&($+=b("(+) Takeaway Charge",o(n.totalTakeawayCharge))),n.totalDeliveryFee>0&&($+=b("(+) Delivery Fee",o(n.totalDeliveryFee))),n.totalServiceCharge>0&&($+=b("(+) Service Charge",o(n.totalServiceCharge))),n.totalTax>0&&($+=b("(+) Tax",o(n.totalTax))),$+=b("NET SALES",o(n.netSales),{total:!0}),$+=w("dashed"),$+=b("Total Orders",String(i)),$+=b("Avg Order Value",o(r)),n.cancelledOrders>0&&($+=w("dashed"),$+=b("Cancelled Orders",o(n.cancelledAmount),{negative:!0,count:String(n.cancelledOrders)})),n.outstandingOrders>0&&($+=b("Outstanding Orders",o(n.outstandingAmount),{negative:!0,count:String(n.outstandingOrders)})),$+=w("double"),l.length>0&&($+=S("PAYMENT SETTLEMENT"),l.forEach(e=>{$+=b((0,d._M)(e.method,s),o(e.revenue),{count:`x${e.orders}`}),"card"===e.method&&c.length>0&&c.forEach((e,t)=>{const n=t<c.length-1?"\u251c":"\u2514";$+=b(`${n} ${g[e.type]||e.type}`,o(e.revenue),{indent:!0,count:`x${e.orders}`})})}),$+=b("TOTAL COLLECTED",o(f),{total:!0}),$+=w()),x.length>0&&($+=S("ORDER SOURCE"),x.forEach(e=>{$+=b(v[e.source]||e.source,o(e.revenue),{count:`x${e.orders}`})}),$+=w()),p.length>0&&($+=S("ORDER TYPE"),p.forEach(e=>{$+=b(u[e.type]||e.type,o(e.revenue),{count:`x${e.orders}`})}),$+=w()),h.length>0){$+=S("SALES BY CATEGORY"),h.forEach(e=>{$+=b(e.category,o(e.revenue),{count:`${e.quantity}qty`})});const e=h.reduce((e,t)=>e+t.quantity,0),t=h.reduce((e,t)=>e+t.revenue,0);$+=b("Total",o(t),{bold:!0,count:`${e}qty`})}return m.length>0&&($+=w("dashed"),$+=S("TOP SELLING ITEMS"),m.forEach(e=>{$+=b(e.name,o(e.revenue),{count:`x${e.quantity}`})})),y.orders>0&&($+=w(),$+=S("STAFF MEALS (NON-REVENUE)"),$+=b("Staff Meal Orders",String(y.orders)),$+=b("Staff Meal Value",o(y.revenue))),$+=`<div style="text-align:center;margin-top:16px;padding-top:12px;border-top:1px dashed #666;font-size:11px;line-height:1.6">\n      <div>--- End of Daily Settlement ---</div>\n      <div>${W.name}</div>\n    </div>`,`<!DOCTYPE html>\n    <html><head><meta charset="UTF-8"><title>Daily Settlement - ${H(ee)}</title>\n    <style>\n      @page { size: 80mm auto; margin: 0; }\n      @media print { body { margin: 0; padding: 0; } .no-print { display: none; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }\n      body { font-family: 'Lucida Console', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #000; width: 80mm; max-width: 80mm; margin: 0 auto; padding: 5mm; box-sizing: border-box; -webkit-font-smoothing: none; letter-spacing: 0.3px; }\n    </style></head><body>${$}</body></html>`},[ne,ee,X,W,K,Q]),ae=e=>{te(e)};if(!Y)return null;const de=I(Q),ce=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(Q),pe=null===ne||void 0===ne?void 0:ne.settlement,xe=(null===ne||void 0===ne||null===(t=ne.summary)||void 0===t?void 0:t.totalOrders)||0,he=(null===ne||void 0===ne||null===(o=ne.summary)||void 0===o?void 0:o.averageOrderValue)||0,ue=((null===ne||void 0===ne?void 0:ne.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),ve=((null===ne||void 0===ne?void 0:ne.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),ge=((null===ne||void 0===ne?void 0:ne.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),me=((null===ne||void 0===ne?void 0:ne.sourceSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),ye=((null===ne||void 0===ne?void 0:ne.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),fe=((null===ne||void 0===ne?void 0:ne.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),je=(null===ne||void 0===ne?void 0:ne.staffMeal)||{revenue:0,orders:0},be=ue.reduce((e,t)=>e+t.revenue,0),we=(new Date).toLocaleString("en-GB",{timeZone:Q,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,h.jsx)(m,{onClick:e=>{e.target===e.currentTarget&&G()},children:(0,h.jsxs)(y,{onClick:e=>e.stopPropagation(),children:[(0,h.jsxs)(f,{className:"no-print",children:[(0,h.jsx)(j,{children:U("reports:dailySettlementPrint.dailySettlementReport")}),(0,h.jsx)(b,{onClick:G,children:"\xd7"})]}),(0,h.jsxs)(A,{children:[(0,h.jsxs)(w,{className:"no-print",children:[(0,h.jsx)(S,{active:ee===de,onClick:()=>ae(de),children:"Today"}),(0,h.jsx)(S,{active:ee===ce,onClick:()=>ae(ce),children:"Yesterday"}),(0,h.jsx)(C,{type:"date",value:ee,max:de,onChange:e=>ae(e.target.value)})]}),re?(0,h.jsx)(V,{children:U("reports:dailySettlementPrint.loadingSettlementData")}):ne&&0!==xe?(0,h.jsxs)(D,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:W.name}),(0,h.jsxs)(P,{children:[W.address&&(0,h.jsx)("div",{children:W.address}),(W.city||W.state)&&(0,h.jsx)("div",{children:[W.city,W.state,W.postalCode].filter(Boolean).join(", ")}),W.phone&&(0,h.jsxs)("div",{children:["Tel: ",W.phone]}),(W.businessRegistration||W.gstRegNo)&&(0,h.jsxs)("div",{children:[W.businessRegistration&&(0,h.jsxs)(h.Fragment,{children:["Reg No: ",W.businessRegistration]}),W.businessRegistration&&W.gstRegNo&&" | ",W.gstRegNo&&(0,h.jsxs)(h.Fragment,{children:["Tax No: ",W.gstRegNo]})]})]})]}),(0,h.jsx)(T,{children:U("reports:dailySettlementPrint.dailySettlement")}),(0,h.jsxs)(O,{children:[(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"Date:"}),(0,h.jsx)(N,{children:H(ee)})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"Printed:"}),(0,h.jsx)(N,{children:we})]})]}),(0,h.jsx)(L,{style_type:"double"}),(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.salesSummary")}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.grossSales")}),(0,h.jsx)(N,{children:(0,a.vv)((null===pe||void 0===pe?void 0:pe.grossSales)||0,X)})]}),((null===pe||void 0===pe?void 0:pe.totalDiscount)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(-) Discount"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalDiscount,X)})]}),((null===pe||void 0===pe?void 0:pe.totalCouponDiscount)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(-) Coupon Discount"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalCouponDiscount,X)})]}),((null===pe||void 0===pe?void 0:pe.totalPointDiscount)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(-) Point Discount"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalPointDiscount,X)})]}),((null===pe||void 0===pe?void 0:pe.totalTakeawayCharge)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(+) Takeaway Charge"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalTakeawayCharge,X)})]}),((null===pe||void 0===pe?void 0:pe.totalDeliveryFee)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(+) Delivery Fee"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalDeliveryFee,X)})]}),((null===pe||void 0===pe?void 0:pe.totalServiceCharge)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(+) Service Charge"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalServiceCharge,X)})]}),((null===pe||void 0===pe?void 0:pe.totalTax)||0)>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:"(+) Tax"}),(0,h.jsx)(N,{children:(0,a.vv)(pe.totalTax,X)})]}),(0,h.jsxs)(B,{total:!0,children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.netSales")}),(0,h.jsx)(N,{children:(0,a.vv)((null===pe||void 0===pe?void 0:pe.netSales)||0,X)})]}),(0,h.jsx)(L,{style_type:"dashed"}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.totalOrders")}),(0,h.jsx)(N,{children:xe})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.avgOrderValue")}),(0,h.jsx)(N,{children:(0,a.vv)(he,X)})]}),((null===pe||void 0===pe?void 0:pe.cancelledOrders)||0)>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(L,{style_type:"dashed"}),(0,h.jsxs)(B,{negative:!0,children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.cancelledOrders")}),(0,h.jsx)(R,{children:pe.cancelledOrders}),(0,h.jsx)(N,{children:(0,a.vv)(pe.cancelledAmount,X)})]})]}),((null===pe||void 0===pe?void 0:pe.outstandingOrders)||0)>0&&(0,h.jsxs)(B,{negative:!0,children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.outstandingOrders")}),(0,h.jsx)(R,{children:pe.outstandingOrders}),(0,h.jsx)(N,{children:(0,a.vv)(pe.outstandingAmount,X)})]})]}),(0,h.jsx)(L,{style_type:"double"}),ue.length>0&&(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.paymentSettlement")}),ue.map(e=>(0,h.jsxs)(i.Fragment,{children:[(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:(0,d._M)(e.method,K||void 0)}),(0,h.jsxs)(R,{children:["x",e.orders]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]}),"card"===e.method&&ve.length>0&&ve.map((e,t)=>(0,h.jsxs)(B,{indent:!0,children:[(0,h.jsxs)(z,{children:[t<ve.length-1?"\u251c":"\u2514"," ",g[e.type]||e.type]}),(0,h.jsxs)(R,{children:["x",e.orders]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]},e.type))]},e.method)),(0,h.jsxs)(B,{total:!0,children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.totalCollected")}),(0,h.jsx)(N,{children:(0,a.vv)(be,X)})]})]}),(0,h.jsx)(L,{}),me.length>0&&(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.orderSource")}),me.map(e=>(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:v[e.source]||e.source}),(0,h.jsxs)(R,{children:["x",e.orders]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]},e.source))]}),(0,h.jsx)(L,{}),ge.length>0&&(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.orderType")}),ge.map(e=>(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:u[e.type]||e.type}),(0,h.jsxs)(R,{children:["x",e.orders]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]},e.type))]}),(0,h.jsx)(L,{}),ye.length>0&&(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.salesByCategory")}),ye.map(e=>(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:e.category}),(0,h.jsxs)(R,{children:[e.quantity,"qty"]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]},e.category)),(0,h.jsxs)(B,{bold:!0,children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.total")}),(0,h.jsxs)(R,{children:[ye.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,h.jsx)(N,{children:(0,a.vv)(ye.reduce((e,t)=>e+t.revenue,0),X)})]})]}),fe.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(L,{style_type:"dashed"}),(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.topSellingItems")}),fe.map((e,t)=>(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:e.name}),(0,h.jsxs)(R,{children:["x",e.quantity]}),(0,h.jsx)(N,{children:(0,a.vv)(e.revenue,X)})]},`${e.name}-${t}`))]})]}),je.orders>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(L,{}),(0,h.jsxs)(O,{children:[(0,h.jsx)(M,{children:U("reports:dailySettlementPrint.staffMealsNonrevenue")}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.staffMealOrders")}),(0,h.jsx)(N,{children:je.orders})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:U("reports:dailySettlementPrint.staffMealValue")}),(0,h.jsx)(N,{children:(0,a.vv)(je.revenue,X)})]})]})]}),(0,h.jsxs)(q,{children:[(0,h.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,h.jsx)("div",{children:W.name})]})]}):(0,h.jsxs)(_,{children:["No sales data for ",H(ee)]})]}),!re&&ne&&xe>0&&(0,h.jsxs)(F,{className:"no-print",children:[(0,h.jsx)($,{onClick:G,children:U("reports:dailySettlementPrint.close")}),(0,h.jsxs)($,{onClick:async()=>{const e=le();if(e)try{const{default:t}=await n.e(5612).then(n.bind(n,5612)),{default:i}=await n.e(1052).then(n.t.bind(n,1052,23)),r=document.createElement("div");r.style.position="absolute",r.style.left="-9999px",r.style.top="0",r.style.width="302px",r.style.background="white",r.innerHTML=e.replace(/<html>|<\/html>|<head>.*?<\/head>|<body>|<\/body>|<!DOCTYPE[^>]*>/gs,""),document.body.appendChild(r);const o=await i(r,{scale:2,width:302,windowWidth:302,backgroundColor:"#ffffff"});document.body.removeChild(r);const s=80,l=o.height*s/o.width,a=new t({orientation:"portrait",unit:"mm",format:[s,l]});a.addImage(o.toDataURL("image/png"),"PNG",0,0,s,l),a.save(`settlement-${ee}.pdf`)}catch(t){console.error("PDF download error:",t)}},children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,h.jsx)("path",{d:"M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"PDF Download"]}),(0,h.jsxs)($,{primary:!0,onClick:()=>{const e=le();e&&(0,c.v3)(e,null)},children:[(0,h.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,h.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]})}),document.body)}},8285:(e,t,n)=>{n.d(t,{MA:()=>v,_M:()=>h});const i="cash",r="card",o="ewallet",s="bank_transfer",l="qr",a="counter",d="online",c="fpx",p="staffMeal",x={[i]:"Cash",[r]:"Credit/Debit Card",[o]:"E-Wallet",[s]:"Bank Transfer",[l]:"QR Payment",[a]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[p]:"Staff Meal"};function h(e,t){if(t){const n=t[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||t[e];if(null!==n&&void 0!==n&&n.label)return n.label}return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function v(e,t,n){if(!e)return"N/A";if("card"===e&&t){return`${h("card",n)}(${u[t]||t})`}return h(e,n)}}}]);