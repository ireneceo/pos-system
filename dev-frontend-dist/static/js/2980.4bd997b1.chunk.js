"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{1840:(e,t,n)=>{n.d(t,{ff:()=>i});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const s="";r();async function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${s}${e}`,r={credentials:"include",headers:{"Content-Type":"application/json",...t.headers},...t},i=await fetch(n,r);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},2488:(e,t,n)=>{n.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});n(9950);var r=n(4752),s=n(4414);const i=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,o=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:n,style:r,...a}=e;return(0,s.jsx)(i,{className:n,style:r,...a,children:t})},l=e=>{let{placeholder:t="Search...",...n}=e;return(0,s.jsx)(a,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,s.jsx)(o,{...n,children:t})}},2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var r=n(9950),s=n(4492),i=n(4752),a=n(3310),o=n(7492),d=n(2488),l=n(1367),c=n(9610),h=n(4021),x=n(6038),u=n(1840),p=n(4414);const j=i.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=i.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,f=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>"out_of_stock"===e.type?"#FEF2F2":"#FFFBEB"};
  border: 1px solid ${e=>"out_of_stock"===e.type?"#FECACA":"#FED7AA"};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,m=i.Ay.div`
  flex: 1;
`,v=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,S=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,C=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,b=i.Ay.div``,_=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,F=(0,i.Ay)(o.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(4) {
      display: none;
    }
  }
`,E=(0,i.Ay)(o.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(4) {
      display: none;
    }
  }
`,$=e=>{let{restaurantId:t,currency:n}=e;const[s,i]=(0,r.useState)([]),[a,d]=(0,r.useState)(!0);(0,r.useEffect)(()=>{(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${t}/inventory/transactions?limit=50`);e.success&&i(e.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{d(!1)}})()},[t]);const l=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},c=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,p.jsx)(o.pp,{children:"Loading transactions..."}):0===s.length?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,p.jsxs)(o.XI,{children:[(0,p.jsxs)(o.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,p.jsx)("span",{children:"Date"}),(0,p.jsx)("span",{children:"Ingredient"}),(0,p.jsx)("span",{children:"Type"}),(0,p.jsx)("span",{children:"Change"}),(0,p.jsx)("span",{children:"After"}),(0,p.jsx)("span",{children:"Notes"})]}),s.map(e=>{var t;return(0,p.jsx)(o.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,p.jsxs)(o.Np,{children:[(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Date"}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Ingredient"}),(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Type"}),(0,p.jsx)("span",{style:{color:c(e.transaction_type),fontWeight:600},children:l(e.transaction_type)})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Change"}),(0,p.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"After"}),(0,p.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Notes"}),(0,p.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},R=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,s.g)(),{defaultCurrency:n}=(0,h.i1)(),[i,R]=(0,r.useState)("RM"),[z,D]=(0,r.useState)("dashboard"),[I,M]=(0,r.useState)(!0),[O,P]=(0,r.useState)(null),[U,B]=(0,r.useState)([]),[T,N]=(0,r.useState)([]),[L,W]=(0,r.useState)([]),[Q,q]=(0,r.useState)(""),[Z,H]=(0,r.useState)("all"),[J,X]=(0,r.useState)(!1),[V,Y]=(0,r.useState)(!1),[G,K]=(0,r.useState)(null),[ee,te]=(0,r.useState)(""),[ne,re]=(0,r.useState)(""),se=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,r.useEffect)(()=>{n&&R(n)},[n]);const ie=(0,r.useCallback)(async()=>{if(se)try{M(!0);const[e,t,n,r]=await Promise.all([(0,u.ff)(`/api/restaurants/${se}/inventory/summary`),(0,u.ff)(`/api/restaurants/${se}/inventory`),(0,u.ff)(`/api/restaurants/${se}/inventory/alerts?resolved=false`),(0,u.ff)(`/api/restaurants/${se}/inventory/reorder-suggestions`)]);e.success&&P(e.data),t.success&&B(t.data),n.success&&N(n.data),r.success&&W(r.data)}catch(e){console.error("Failed to fetch inventory data:",e)}finally{M(!1)}},[se]);(0,r.useEffect)(()=>{ie()},[ie]);const ae=e=>{K(e),te(""),re(""),X(!0)},oe=U.filter(e=>{const t=e.name.toLowerCase().includes(Q.toLowerCase()),n="all"===Z||e.stock_status===Z;return t&&n}),de=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return se?(0,p.jsxs)(a.A,{children:[(0,p.jsxs)(o.mc,{children:[(0,p.jsxs)(o.Y9,{children:[(0,p.jsx)(o.hE,{children:"Inventory"}),(0,p.jsx)(o.ex,{children:(0,p.jsx)(o.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${se}/inventory/stock-take`,children:"Stock Take"})})]}),(0,p.jsxs)(o.UC,{children:[(0,p.jsxs)(o.j,{children:[(0,p.jsx)(o.oz,{active:"dashboard"===z,onClick:()=>D("dashboard"),children:"Dashboard"}),(0,p.jsx)(o.oz,{active:"list"===z,onClick:()=>D("list"),children:"Stock List"}),(0,p.jsx)(o.oz,{active:"history"===z,onClick:()=>D("history"),children:"History"})]}),I?(0,p.jsx)(o.pp,{children:"Loading..."}):"dashboard"===z?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{color:"#059669",children:[(0,p.jsx)(o.Os,{children:(null===O||void 0===O?void 0:O.total_items)||0}),(0,p.jsx)(o.v0,{children:"Total Ingredients"}),(0,p.jsx)(o.d1,{children:"managed items"})]}),(0,p.jsxs)(o.hI,{color:"#D97706",children:[(0,p.jsx)(o.Os,{children:(null===O||void 0===O?void 0:O.low_stock_count)||0}),(0,p.jsx)(o.v0,{children:"Low Stock"}),(0,p.jsx)(o.d1,{children:"need attention"})]}),(0,p.jsxs)(o.hI,{color:"#DC2626",children:[(0,p.jsx)(o.Os,{children:(null===O||void 0===O?void 0:O.out_of_stock_count)||0}),(0,p.jsx)(o.v0,{children:"Out of Stock"}),(0,p.jsx)(o.d1,{children:"urgent"})]}),(0,p.jsxs)(o.hI,{color:"#7C3AED",children:[(0,p.jsx)(o.Os,{children:(0,x.vv)((null===O||void 0===O?void 0:O.monthly_loss)||0,i)}),(0,p.jsx)(o.v0,{children:"Monthly Loss"}),(0,p.jsx)(o.d1,{children:"this month"})]})]}),T.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:"Stock Alerts"}),(0,p.jsx)("div",{children:T.slice(0,5).map(e=>(0,p.jsxs)(y,{type:e.alert_type,children:[(0,p.jsxs)(m,{children:[(0,p.jsx)(v,{children:e.ingredient.name}),(0,p.jsxs)(w,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,p.jsxs)(o.wr,{children:[(0,p.jsx)(o.$n,{variant:"primary",onClick:()=>{const t=U.find(t=>t.id===e.ingredient_id);t&&ae(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,p.jsx)(o.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/restaurants/${se}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&ie()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),L.length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:"Reorder Suggestions"}),(0,p.jsx)(j,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,p.jsxs)(o.XI,{children:[(0,p.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px",children:[(0,p.jsx)("span",{children:"Ingredient"}),(0,p.jsx)("span",{children:"Current Stock"}),(0,p.jsx)("span",{children:"Daily Usage"}),(0,p.jsx)("span",{children:"Suggested Qty"}),(0,p.jsx)("span",{children:"Est. Cost"}),(0,p.jsx)("span",{children:"Urgency"})]}),L.slice(0,10).map(e=>(0,p.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px",children:[(0,p.jsx)("div",{children:e.ingredient.name}),(0,p.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,p.jsxs)("div",{children:[e.avg_daily_usage.toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,p.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,p.jsx)("div",{children:(0,x.vv)(e.estimated_cost,i)}),(0,p.jsx)("div",{children:(0,p.jsx)(k,{level:e.urgency,children:e.urgency.toUpperCase()})})]},e.ingredient.id))]})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(o.$n,{variant:"primary",onClick:()=>D("list"),children:"+ Receive Stock"}),(0,p.jsx)(o.$n,{variant:"secondary",onClick:()=>D("list"),children:"+ Record Waste"}),(0,p.jsx)(o.$n,{variant:"secondary",onClick:()=>D("history"),children:"View All Transactions"})]})]}):"list"===z?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.Qn,{children:[(0,p.jsx)(d.DO,{type:"text",placeholder:"Search ingredients...",value:Q,onChange:e=>q(e.target.value)}),(0,p.jsxs)(d.Jt,{value:Z,onChange:e=>H(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,p.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]})]}),0===oe.length?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No ingredients found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Add ingredients in the Ingredients page first."})]}):(0,p.jsxs)(o.XI,{children:[(0,p.jsxs)(F,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,p.jsx)("span",{children:"Ingredient"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Current Stock"}),(0,p.jsx)("span",{children:"Min Stock"}),(0,p.jsx)("span",{children:"Unit Cost"}),(0,p.jsx)("span",{children:"Last Stock Take"}),(0,p.jsx)("span",{children:"Actions"})]}),oe.map(e=>{var t,n;return(0,p.jsxs)(E,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,p.jsxs)(o.Np,{children:[(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Ingredient"}),(0,p.jsxs)(b,{children:[(0,p.jsx)(_,{children:e.name}),(0,p.jsxs)(A,{children:[e.category," \u2022 ",(null===(t=e.avg_daily_usage)||void 0===t?void 0:t.toFixed(2))||"0"," ",e.unit,"/day"]})]})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Status"}),(0,p.jsx)(f,{status:e.stock_status,children:de(e.stock_status)})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Current Stock"}),(0,p.jsxs)("div",{style:{fontWeight:600,color:"#0A2540"},children:[e.current_stock," ",e.unit]})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Min Stock"}),(0,p.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.unit]})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Unit Cost"}),(0,p.jsx)("div",{style:{color:"#0A2540"},children:(0,x.vv)(e.unit_cost,i)})]}),(0,p.jsxs)(o.Uj,{children:[(0,p.jsx)(o.PM,{children:"Last Stock Take"}),(0,p.jsx)("div",{style:{color:"#6B7280"},children:(n=e.last_stock_take_at,n?new Date(n).toLocaleDateString():"-")})]})]}),(0,p.jsxs)(o.wr,{children:[(0,p.jsx)(o.$n,{variant:"primary",onClick:()=>ae(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,p.jsx)(o.$n,{variant:"danger",onClick:()=>(K(e),te(""),re(""),void Y(!0)),style:{padding:"6px 12px",fontSize:"13px"},children:"Waste"})]})]},e.id)})]})]}):(0,p.jsx)($,{restaurantId:se,currency:i})]})]}),(0,p.jsx)(c.aF,{isOpen:J,onClose:()=>X(!1),title:"Receive Stock",size:"small",children:G&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{children:"Enter the quantity received. This will be added to the current stock."}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Ingredient"}),(0,p.jsx)(c.ZQ,{type:"text",value:G.name,disabled:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Current Stock"}),(0,p.jsx)(c.ZQ,{type:"text",value:`${G.current_stock} ${G.unit}`,disabled:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsxs)(c.lR,{children:["Quantity Received (",G.unit,") *"]}),(0,p.jsx)(c.ZQ,{type:"number",step:"0.01",value:ee,onChange:e=>te(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Notes (Optional)"}),(0,p.jsx)(c.ZQ,{type:"text",value:ne,onChange:e=>re(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(c.yl,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,p.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(G&&ee)try{const e=await(0,u.ff)(`/api/restaurants/${se}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:G.id,quantity:parseFloat(ee),notes:ne})});e.success?(alert("Stock received successfully"),X(!1),K(null),te(""),re(""),ie()):alert(e.message||"Failed to receive stock")}catch(e){console.error("Failed to receive stock:",e),alert("Failed to receive stock")}},children:"Confirm Receive"})]})]})}),(0,p.jsx)(c.aF,{isOpen:V,onClose:()=>Y(!1),title:"Record Waste",size:"small",children:G&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Ingredient"}),(0,p.jsx)(c.ZQ,{type:"text",value:G.name,disabled:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Current Stock"}),(0,p.jsx)(c.ZQ,{type:"text",value:`${G.current_stock} ${G.unit}`,disabled:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsxs)(c.lR,{children:["Waste Quantity (",G.unit,") *"]}),(0,p.jsx)(c.ZQ,{type:"number",step:"0.01",value:ee,onChange:e=>te(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Reason (Optional)"}),(0,p.jsx)(c.ZQ,{type:"text",value:ne,onChange:e=>re(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(c.yl,{variant:"secondary",onClick:()=>Y(!1),children:"Cancel"}),(0,p.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(G&&ee)try{const e=await(0,u.ff)(`/api/restaurants/${se}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:G.id,quantity:parseFloat(ee),notes:ne})});e.success?(alert("Waste recorded successfully"),Y(!1),K(null),te(""),re(""),ie()):alert(e.message||"Failed to record waste")}catch(e){console.error("Failed to record waste:",e),alert("Failed to record waste")}},children:"Confirm Waste"})]})]})})]}):(0,p.jsx)(a.A,{children:(0,p.jsx)(o.mc,{children:(0,p.jsx)(o.pp,{children:(0,p.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),s=n(1367),i=n(6038);const a=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("RM"),[a,o]=(0,r.useState)(Object.keys(i.DL)),[d,l]=(0,r.useState)(!0),[c,h]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let s=r>=0?t[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";n(r)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),h("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:d,error:c}}}}]);