"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2980],{2488:(e,t,n)=>{n.d(t,{DO:()=>o,Jt:()=>d,Qn:()=>c});n(9950);var r=n(4752),i=n(4414);const s=r.Ay.div`
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
`,l=r.Ay.select`
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
`,c=e=>{let{children:t,className:n,style:r,...a}=e;return(0,i.jsx)(s,{className:n,style:r,...a,children:t})},o=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(a,{placeholder:t,...n})},d=e=>{let{children:t,...n}=e;return(0,i.jsx)(l,{...n,children:t})}},2980:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var r=n(9950),i=n(4492),s=n(4752),a=n(3310),l=n(7492),c=n(2488),o=n(1367),d=n(9610),x=n(4021),h=n(6038),u=n(4414);const p=s.Ay.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,j=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,y=s.Ay.div`
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
`,m=s.Ay.div`
  flex: 1;
`,v=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${e=>{switch(e.level){case"critical":return"background: #DC2626; color: white;";case"high":return"background: #F59E0B; color: white;";default:return"background: #10B981; color: white;"}}}
`,_=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${e=>{switch(e.urgency){case"expired":case"critical":return"#FEF2F2";case"warning":return"#FFFBEB";default:return"#F0F9FF"}}};
  border: 1px solid ${e=>{switch(e.urgency){case"expired":case"critical":return"#FECACA";case"warning":return"#FED7AA";default:return"#BAE6FD"}}};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,S=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,w=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,b=s.Ay.button`
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 4px;
  font-size: 12px;

  &:hover {
    background: #F3F4F6;
    color: #0A2540;
  }
`,C=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`,F=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,A=s.Ay.div``,E=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,$=(0,s.Ay)(l.A0)`
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
`,z=(0,s.Ay)(l.Hj)`
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
`,I=e=>{let{restaurantId:t,currency:n}=e;const[i,s]=(0,r.useState)([]),[a,c]=(0,r.useState)(!0);(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}/inventory/transactions?limit=50`,{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&s(r.data)}catch(e){console.error("Failed to fetch transactions:",e)}finally{c(!1)}})()},[t]);const o=e=>{switch(e){case"initial":return"Initial Setup";case"purchase":return"Received";case"order_deduct":return"Order";case"stock_take":return"Stock Take";case"waste":return"Waste";case"adjustment":return"Adjustment";default:return e}},d=e=>{switch(e){case"purchase":case"initial":return"#059669";case"order_deduct":case"waste":return"#DC2626";case"stock_take":case"adjustment":return"#6B7280";default:return"#0A2540"}};return a?(0,u.jsx)(l.pp,{children:"Loading transactions..."}):0===i.length?(0,u.jsxs)(l.pp,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No transactions recorded yet"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"Transactions will appear here when you receive or waste stock."})]}):(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(l.A0,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:[(0,u.jsx)("span",{children:"Date"}),(0,u.jsx)("span",{children:"Ingredient"}),(0,u.jsx)("span",{children:"Type"}),(0,u.jsx)("span",{children:"Change"}),(0,u.jsx)("span",{children:"After"}),(0,u.jsx)("span",{children:"Notes"})]}),i.map(e=>{var t;return(0,u.jsx)(l.Hj,{columns:"1.5fr 1.5fr 1fr 1fr 1fr 2fr",children:(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Date"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:new Date(e.created_at).toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Ingredient"}),(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"-"})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Type"}),(0,u.jsx)("span",{style:{color:d(e.transaction_type),fontWeight:600},children:o(e.transaction_type)})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Change"}),(0,u.jsxs)("div",{style:{color:parseFloat(String(e.quantity_change))>=0?"#059669":"#DC2626",fontWeight:600},children:[parseFloat(String(e.quantity_change))>=0?"+":"",e.quantity_change," ",e.unit]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"After"}),(0,u.jsxs)("div",{style:{color:"#0A2540"},children:[e.stock_after," ",e.unit]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Notes"}),(0,u.jsx)("div",{style:{color:"#6B7280",fontSize:"13px"},children:e.notes||"-"})]})]})},e.id)})]})},R=()=>{const{user:e}=(0,o.As)(),{restaurantId:t}=(0,i.g)(),[n,s]=(0,i.ok)(),{defaultCurrency:R}=(0,x.i1)(),[D,O]=(0,r.useState)("RM"),M=n.get("tab")||"dashboard",P=e=>{s({tab:e})},[T,U]=(0,r.useState)(!0),[Q,L]=(0,r.useState)(null),[q,N]=(0,r.useState)([]),[W,Z]=(0,r.useState)([]),[J,H]=(0,r.useState)([]),[X,Y]=(0,r.useState)([]),[G,V]=(0,r.useState)(""),[K,ee]=(0,r.useState)("all"),[te,ne]=(0,r.useState)([]),[re,ie]=(0,r.useState)(null),[se,ae]=(0,r.useState)(!1),[le,ce]=(0,r.useState)(!1),[oe,de]=(0,r.useState)(""),[xe,he]=(0,r.useState)(""),[ue,pe]=(0,r.useState)("all"),[ge,je]=(0,r.useState)(!1),[ye,me]=(0,r.useState)(!1),[ve,fe]=(0,r.useState)(!1),[ke,_e]=(0,r.useState)(null),[Se,we]=(0,r.useState)(""),[be,Ce]=(0,r.useState)(""),[Fe,Ae]=(0,r.useState)(""),[Ee,Be]=(0,r.useState)(""),[$e,ze]=(0,r.useState)(""),[Ie,Re]=(0,r.useState)({}),[De,Oe]=(0,r.useState)(!1),[Me,Pe]=(0,r.useState)(!1),[Te,Ue]=(0,r.useState)(!1),[Qe,Le]=(0,r.useState)(null),[qe,Ne]=(0,r.useState)({lead_time_days:"",safety_stock_percent:"",manual_daily_usage:"",min_stock:""}),[We,Ze]=(0,r.useState)(!1),[Je,He]=(0,r.useState)(!1),[Xe,Ye]=(0,r.useState)({name:"",unit:"kg",unit_cost:"",category:"Produce",current_stock:"",min_stock:""}),[Ge,Ve]=(0,r.useState)(!1),Ke=t?parseInt(t,10):null===e||void 0===e?void 0:e.restaurant_id;(0,r.useEffect)(()=>{R&&O(R)},[R]);const et=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),tt=(0,r.useCallback)(async function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=et();return(await fetch(e,{...t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`,...t.headers}})).json()},[et]),nt=(0,r.useCallback)(async()=>{if(Ke)try{U(!0);const[e,t,n,r,i,s]=await Promise.all([tt(`/api/restaurants/${Ke}/inventory/summary`),tt(`/api/restaurants/${Ke}/inventory`),tt(`/api/restaurants/${Ke}/inventory/alerts?resolved=false`),tt(`/api/restaurants/${Ke}/inventory/reorder-suggestions`),tt(`/api/restaurants/${Ke}/inventory/expiring?days=14`),tt(`/api/restaurants/${Ke}/inventory/products`)]);e.success&&L(e.data),t.success&&N(t.data),n.success&&Z(n.data),r.success&&H(r.data),i.success&&Y(i.data),s.success&&ne(s.data||[])}catch(e){console.error("Failed to fetch inventory data:",e)}finally{U(!1)}},[Ke,tt]);(0,r.useEffect)(()=>{nt()},[nt]),(0,r.useEffect)(()=>{if(q.length>0){const e=q.some(e=>e.current_stock>0||e.last_stock_take_at);Oe(!e)}},[q]);const rt=(e,t,n)=>{Re(r=>({...r,[e]:{...r[e],[t]:n}}))},it=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}},st=e=>{_e(e),we(""),Ce(""),Ae(""),Be(""),ze(""),je(!0)},at=e=>{_e(e),we(""),Ce(""),me(!0)},lt=q.filter(e=>{const t=e.name.toLowerCase().includes(G.toLowerCase()),n="all"===K||e.stock_status===K;return t&&n}),ct=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}};return Ke?(0,u.jsxs)(a.A,{children:[(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Inventory"}),(0,u.jsxs)(l.ex,{children:[De&&(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{const e={};q.forEach(t=>{e[t.id]={quantity:t.current_stock.toString(),min_stock:t.min_stock.toString()}}),Re(e),fe(!0)},children:"Set Initial Stock"}),(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${Ke}/stock-take`,children:"Stock Take"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.j,{children:[(0,u.jsx)(l.oz,{active:"dashboard"===M,onClick:()=>P("dashboard"),children:"Dashboard"}),(0,u.jsx)(l.oz,{active:"list"===M,onClick:()=>P("list"),children:"Stock List"}),(0,u.jsx)(l.oz,{active:"history"===M,onClick:()=>P("history"),children:"History"})]}),T?(0,u.jsx)(l.pp,{children:"Loading..."}):"dashboard"===M?(0,u.jsxs)(u.Fragment,{children:[De&&q.length>0&&(0,u.jsxs)(p,{children:[(0,u.jsx)("strong",{children:"Welcome to Inventory Management"}),(0,u.jsx)("br",{}),'Set your initial stock levels to start tracking inventory. Click the "Set Initial Stock" button above to enter your current stock quantities.']}),(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:(null===Q||void 0===Q?void 0:Q.total_items)||0}),(0,u.jsx)(l.v0,{children:"Total Ingredients"}),(0,u.jsx)(l.d1,{children:"managed items"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsx)(l.Os,{children:(null===Q||void 0===Q?void 0:Q.low_stock_count)||0}),(0,u.jsx)(l.v0,{children:"Low Stock"}),(0,u.jsx)(l.d1,{children:"need attention"})]}),(0,u.jsxs)(l.hI,{color:"#DC2626",children:[(0,u.jsx)(l.Os,{children:(null===Q||void 0===Q?void 0:Q.out_of_stock_count)||0}),(0,u.jsx)(l.v0,{children:"Out of Stock"}),(0,u.jsx)(l.d1,{children:"urgent"})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:(0,h.vv)((null===Q||void 0===Q?void 0:Q.monthly_loss)||0,D)}),(0,u.jsx)(l.v0,{children:"Monthly Loss"}),(0,u.jsx)(l.d1,{children:"this month"})]}),(0,u.jsxs)(l.hI,{color:"#EA580C",children:[(0,u.jsx)(l.Os,{children:X.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length}),(0,u.jsx)(l.v0,{children:"Expiring Soon"}),(0,u.jsx)(l.d1,{children:"within 3 days"})]})]}),W.length>0&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g,{children:"Stock Alerts"}),(0,u.jsx)("div",{children:W.slice(0,5).map(e=>(0,u.jsxs)(y,{type:e.alert_type,children:[(0,u.jsxs)(m,{children:[(0,u.jsx)(v,{children:e.ingredient.name}),(0,u.jsxs)(f,{children:["Current: ",e.current_stock," ",e.ingredient.unit," / Min: ",e.min_stock," ",e.ingredient.unit]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{const t=q.find(t=>t.id===e.ingredient_id);t&&st(t)},style:{padding:"8px 16px",fontSize:"13px"},children:"Receive"}),(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>(async e=>{try{(await tt(`/api/restaurants/${Ke}/inventory/alerts/${e}/resolve`,{method:"PUT"})).success&&nt()}catch(t){console.error("Failed to resolve alert:",t)}})(e.id),style:{padding:"8px 16px",fontSize:"13px"},children:"Dismiss"})]})]},e.id))})]}),X.length>0&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g,{children:"Expiring Items"}),(0,u.jsx)("div",{children:X.slice(0,5).map(e=>(0,u.jsxs)(_,{urgency:e.urgency,children:[(0,u.jsxs)(m,{children:[(0,u.jsxs)(v,{children:[e.ingredient_name,e.batch_number&&(0,u.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]})]}),(0,u.jsxs)(f,{children:[e.remaining_quantity," ",e.unit," remaining \u2022 Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,u.jsx)(S,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`}),(0,u.jsx)(l.$n,{variant:"danger",onClick:()=>{const t=q.find(t=>t.id===e.ingredient_id);t&&at(t)},style:{padding:"6px 12px",fontSize:"12px"},children:"Dispose"})]})]},e.id))})]}),J.length>0&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(g,{children:"Reorder Suggestions"}),(0,u.jsx)(p,{children:"Calculated based on average daily usage over the last 30 days and supplier lead time."}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(l.A0,{columns:"2fr 1fr 1fr 1fr 1fr 100px",children:[(0,u.jsx)("span",{children:"Ingredient"}),(0,u.jsx)("span",{children:"Current Stock"}),(0,u.jsx)("span",{children:"Daily Usage"}),(0,u.jsx)("span",{children:"Suggested Qty"}),(0,u.jsx)("span",{children:"Est. Cost"}),(0,u.jsx)("span",{children:"Urgency"})]}),J.slice(0,10).map(e=>(0,u.jsxs)(l.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 100px",children:[(0,u.jsx)("div",{children:e.ingredient.name}),(0,u.jsxs)("div",{children:[e.current_stock," ",e.ingredient.unit]}),(0,u.jsxs)("div",{children:[(parseFloat(e.avg_daily_usage)||0).toFixed(2)," ",e.ingredient.unit,"/day"]}),(0,u.jsxs)("div",{style:{fontWeight:600},children:[e.suggested_qty," ",e.ingredient.unit]}),(0,u.jsx)("div",{children:(0,h.vv)(e.estimated_cost,D)}),(0,u.jsx)("div",{children:(0,u.jsx)(k,{level:e.urgency,children:e.urgency.toUpperCase()})})]},e.ingredient.id))]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{0===q.length?window.location.href=`/restaurant/${Ke}/recipe-management?tab=ingredients`:P("list")},children:"+ Receive Stock"}),(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{0===q.length?window.location.href=`/restaurant/${Ke}/recipe-management?tab=ingredients`:P("list")},children:"+ Record Waste"}),(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>P("history"),children:"View All Transactions"})]})]}):"list"===M?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(c.Qn,{children:[(0,u.jsxs)(c.Jt,{value:ue,onChange:e=>pe(e.target.value),style:{minWidth:"140px"},children:[(0,u.jsx)("option",{value:"all",children:"All Items"}),(0,u.jsx)("option",{value:"ingredients",children:"Ingredients"}),(0,u.jsx)("option",{value:"products",children:"Products"})]}),(0,u.jsx)(c.DO,{type:"text",placeholder:"Search...",value:G,onChange:e=>V(e.target.value)}),(0,u.jsxs)(c.Jt,{value:K,onChange:e=>ee(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,u.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]})]}),("all"===ue||"products"===ue)&&te.length>0&&(0,u.jsxs)(u.Fragment,{children:["all"===ue&&(0,u.jsxs)(g,{children:["Products (",te.filter(e=>{const t=e.name.toLowerCase().includes(G.toLowerCase()),n="all"===K||e.stock_status===K;return t&&n}).length,")"]}),(0,u.jsxs)(l.XI,{style:{marginBottom:"24px"},children:[(0,u.jsxs)($,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,u.jsx)("span",{children:"Product"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Current Stock"}),(0,u.jsx)("span",{children:"Min Stock"}),(0,u.jsx)("span",{children:"Unit Cost"}),(0,u.jsx)("span",{children:"Supplier"}),(0,u.jsx)("span",{children:"Actions"})]}),te.filter(e=>{const t=e.name.toLowerCase().includes(G.toLowerCase()),n="all"===K||e.stock_status===K;return t&&n}).map(e=>(0,u.jsxs)(z,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 150px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Product"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(E,{children:e.name}),(0,u.jsxs)(B,{children:[e.category," \u2022 ",(0,h.vv)(e.price,D)]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)(j,{status:e.stock_status,children:ct(e.stock_status)})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Current Stock"}),(0,u.jsxs)("div",{style:{fontWeight:600,color:"#0A2540"},children:[e.current_stock," ",e.stock_unit]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Min Stock"}),(0,u.jsxs)("div",{style:{color:"#6B7280"},children:[e.min_stock," ",e.stock_unit]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Unit Cost"}),(0,u.jsx)("div",{style:{color:"#0A2540"},children:(0,h.vv)(e.unit_cost,D)})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Supplier"}),(0,u.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{ie(e),de(""),he(""),ae(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,u.jsx)(l.$n,{variant:"danger",onClick:()=>{ie(e),de(""),he(""),ce(!0)},style:{padding:"6px 12px",fontSize:"13px"},children:"Adjust"})]})]},`product-${e.id}`))]})]}),("all"===ue||"ingredients"===ue)&&(0,u.jsxs)(u.Fragment,{children:["all"===ue&&(0,u.jsxs)(g,{children:["Ingredients (",lt.length,")"]}),0===lt.length?(0,u.jsxs)(l.pp,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:0===q.length?"No ingredients found":"No matching ingredients"}),(0,u.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:0===q.length?"Add ingredients in the Ingredients page first.":"Try adjusting your search or filter."}),0===q.length&&(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${Ke}/recipe-management?tab=ingredients`,children:"Go to Ingredients"})]}):(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)($,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsx)("span",{children:"Ingredient"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Current Stock"}),(0,u.jsx)("span",{children:"Min / Prediction"}),(0,u.jsx)("span",{children:"Unit Cost"}),(0,u.jsx)("span",{children:"Supplier"}),(0,u.jsx)("span",{children:"Last Stock Take"}),(0,u.jsx)("span",{children:"Actions"})]}),lt.map(e=>{return(0,u.jsxs)(z,{columns:"2fr 1fr 1fr 1fr 1fr 1fr 1fr 180px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Ingredient"}),(0,u.jsxs)(A,{children:[(0,u.jsx)(E,{children:e.name}),(0,u.jsxs)(B,{children:[e.category," \u2022 ",(parseFloat(String(e.avg_daily_usage))||0).toFixed(2)," ",e.unit,"/day"]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)(j,{status:e.stock_status,children:ct(e.stock_status)})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Current Stock"}),(0,u.jsxs)("div",{style:{fontWeight:600,color:"#0A2540"},children:[e.current_stock," ",e.unit]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Min / Prediction"}),(0,u.jsxs)("div",{style:{color:"#6B7280",marginBottom:"4px"},children:["Min: ",e.min_stock," ",e.unit]}),(0,u.jsx)(w,{level:e.prediction_confidence||"none",children:it(e.prediction_confidence||"none")})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Unit Cost"}),(0,u.jsx)("div",{style:{color:"#0A2540"},children:(0,h.vv)(e.unit_cost,D)})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Supplier"}),(0,u.jsx)("div",{style:{color:e.supplier_name?"#0A2540":"#9CA3AF",fontSize:"13px"},children:e.supplier_name||"-"})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Stock Take"}),(0,u.jsx)("div",{style:{color:"#6B7280"},children:(t=e.last_stock_take_at,t?new Date(t).toLocaleDateString():"-")})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>st(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Receive"}),(0,u.jsx)(l.$n,{variant:"danger",onClick:()=>at(e),style:{padding:"6px 12px",fontSize:"13px"},children:"Waste"}),(0,u.jsx)(b,{onClick:()=>(e=>{var t;Le(e),Ne({lead_time_days:(e.lead_time_days||1).toString(),safety_stock_percent:(e.safety_stock_percent||20).toString(),manual_daily_usage:(null===(t=e.manual_daily_usage)||void 0===t?void 0:t.toString())||"",min_stock:(e.min_stock||0).toString()}),Ue(!0)})(e),children:"Settings"})]})]},e.id);var t})]})]})]}):(0,u.jsx)(I,{restaurantId:Ke,currency:D})]})]}),(0,u.jsx)(d.aF,{isOpen:ge,onClose:()=>je(!1),title:"Receive Stock",size:"medium",children:ke&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p,{children:"Enter the quantity received and batch details for inventory tracking."}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Ingredient"}),(0,u.jsx)(d.ZQ,{type:"text",value:ke.name,disabled:!0})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Current Stock"}),(0,u.jsx)(d.ZQ,{type:"text",value:`${ke.current_stock} ${ke.unit}`,disabled:!0})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsxs)(d.lR,{children:["Quantity Received (",ke.unit,") *"]}),(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",value:Se,onChange:e=>we(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,u.jsxs)("div",{style:{borderTop:"1px solid #E5E7EB",margin:"16px 0",paddingTop:"16px"},children:[(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"12px"},children:"Batch Details (Optional)"}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,u.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,u.jsx)(d.lR,{children:"Batch/Lot Number"}),(0,u.jsx)(d.ZQ,{type:"text",value:Fe,onChange:e=>Ae(e.target.value),placeholder:"e.g., LOT-2024-001"})]}),(0,u.jsxs)(d.gE,{style:{marginBottom:0},children:[(0,u.jsx)(d.lR,{children:"Manufacture Date"}),(0,u.jsx)(d.ZQ,{type:"date",value:Ee,onChange:e=>Be(e.target.value)})]})]}),(0,u.jsxs)(d.gE,{style:{marginTop:"12px"},children:[(0,u.jsx)(d.lR,{children:"Expiry Date"}),(0,u.jsx)(d.ZQ,{type:"date",value:$e,onChange:e=>ze(e.target.value)}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Items with earlier expiry dates will be used first (FIFO)"})]})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Notes (Optional)"}),(0,u.jsx)(d.ZQ,{type:"text",value:be,onChange:e=>Ce(e.target.value),placeholder:"e.g., PO #12345"})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>je(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(ke&&Se)try{(await tt(`/api/restaurants/${Ke}/inventory/receive`,{method:"POST",body:JSON.stringify({ingredient_id:ke.id,quantity:parseFloat(Se),notes:be,batch_number:Fe||null,manufacture_date:Ee||null,expiry_date:$e||null})})).success&&(je(!1),_e(null),we(""),Ce(""),Ae(""),Be(""),ze(""),nt())}catch(e){console.error("Failed to receive stock:",e)}},children:"Confirm Receive"})]})]})}),(0,u.jsx)(d.aF,{isOpen:ye,onClose:()=>me(!1),title:"Record Waste",size:"small",children:ke&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p,{children:"Record wasted or disposed stock. This will be deducted from current stock."}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Ingredient"}),(0,u.jsx)(d.ZQ,{type:"text",value:ke.name,disabled:!0})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Current Stock"}),(0,u.jsx)(d.ZQ,{type:"text",value:`${ke.current_stock} ${ke.unit}`,disabled:!0})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsxs)(d.lR,{children:["Waste Quantity (",ke.unit,") *"]}),(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",value:Se,onChange:e=>we(e.target.value),placeholder:"Enter quantity",required:!0})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Reason (Optional)"}),(0,u.jsx)(d.ZQ,{type:"text",value:be,onChange:e=>Ce(e.target.value),placeholder:"e.g., Expired, Damaged"})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(ke&&Se)try{(await tt(`/api/restaurants/${Ke}/inventory/waste`,{method:"POST",body:JSON.stringify({ingredient_id:ke.id,quantity:parseFloat(Se),notes:be})})).success&&(me(!1),_e(null),we(""),Ce(""),nt())}catch(e){console.error("Failed to record waste:",e)}},children:"Confirm Waste"})]})]})}),(0,u.jsxs)(d.aF,{isOpen:ve,onClose:()=>fe(!1),title:"Set Initial Stock",size:"large",children:[(0,u.jsx)(p,{children:"Enter your current stock quantities and minimum stock levels. Items with 0 quantity will be skipped."}),(0,u.jsx)("div",{style:{maxHeight:"60vh",overflowY:"auto"},children:Object.entries(q.reduce((e,t)=>{const n=t.category||"Other";return e[n]||(e[n]=[]),e[n].push(t),e},{})).map(e=>{let[t,n]=e;return(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsx)("h3",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"12px",textTransform:"capitalize"},children:t.replace("_"," ")}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(l.A0,{columns:"2fr 1fr 1fr",children:[(0,u.jsx)("span",{children:"Ingredient"}),(0,u.jsx)("span",{children:"Current Qty"}),(0,u.jsx)("span",{children:"Min Stock"})]}),n.map(e=>{var t,n;return(0,u.jsxs)(l.Hj,{columns:"2fr 1fr 1fr",style:{padding:"12px 16px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.unit})]}),(0,u.jsx)("div",{children:(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(t=Ie[e.id])||void 0===t?void 0:t.quantity)||"",onChange:t=>rt(e.id,"quantity",t.target.value),placeholder:"0",style:{width:"100px"}})}),(0,u.jsx)("div",{children:(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:(null===(n=Ie[e.id])||void 0===n?void 0:n.min_stock)||"",onChange:t=>rt(e.id,"min_stock",t.target.value),placeholder:"0",style:{width:"100px"}})})]},e.id)})]})]},t)})}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{const e=Object.entries(Ie).filter(e=>{let[t,n]=e;return parseFloat(n.quantity)>0}).map(e=>{let[t,n]=e;return{ingredient_id:parseInt(t),quantity:parseFloat(n.quantity),min_stock:parseFloat(n.min_stock)||0}});if(0!==e.length)try{Pe(!0);(await tt(`/api/restaurants/${Ke}/inventory/initial`,{method:"POST",body:JSON.stringify({items:e})})).success&&(fe(!1),Oe(!1),nt())}catch(t){console.error("Failed to save initial stock:",t)}finally{Pe(!1)}},disabled:Me,children:Me?"Saving...":"Save Initial Stock"})]})]}),(0,u.jsx)(d.aF,{isOpen:se,onClose:()=>ae(!1),title:`Receive Stock: ${(null===re||void 0===re?void 0:re.name)||""}`,size:"small",children:re&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,u.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[re.current_stock," ",re.stock_unit]})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Quantity to Add *"}),(0,u.jsx)(d.ZQ,{type:"number",min:"0",step:"0.01",value:oe,onChange:e=>de(e.target.value),placeholder:"Enter quantity"})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Notes (Optional)"}),(0,u.jsx)(d.ZQ,{value:xe,onChange:e=>he(e.target.value),placeholder:"Enter notes"})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(oe&&!(parseFloat(oe)<=0))try{(await tt(`/api/restaurants/${Ke}/inventory/products/${re.id}/receive`,{method:"POST",body:JSON.stringify({quantity:parseFloat(oe),notes:xe})})).success&&(ae(!1),nt())}catch(e){console.error("Failed to receive product:",e)}},disabled:!oe||parseFloat(oe)<=0,children:"Receive"})]})]})}),(0,u.jsx)(d.aF,{isOpen:le,onClose:()=>ce(!1),title:`Adjust Stock: ${(null===re||void 0===re?void 0:re.name)||""}`,size:"small",children:re&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Current Stock"}),(0,u.jsxs)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540"},children:[re.current_stock," ",re.stock_unit]})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Adjustment Quantity *"}),(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",value:oe,onChange:e=>de(e.target.value),placeholder:"Enter quantity (negative to reduce)"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#8898AA",marginTop:"4px"},children:"Use negative value to reduce stock (e.g., -5 for waste/damage)"})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Reason / Notes"}),(0,u.jsx)(d.ZQ,{value:xe,onChange:e=>he(e.target.value),placeholder:"e.g., Damaged, Expired, Correction"})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(oe)try{(await tt(`/api/restaurants/${Ke}/inventory/products/${re.id}/adjust`,{method:"POST",body:JSON.stringify({quantity:parseFloat(oe),reason:xe,notes:xe})})).success&&(ce(!1),nt())}catch(e){console.error("Failed to adjust product:",e)}},disabled:!oe,children:"Adjust"})]})]})}),(0,u.jsx)(d.aF,{isOpen:Te,onClose:()=>Ue(!1),title:`Settings: ${(null===Qe||void 0===Qe?void 0:Qe.name)||""}`,size:"small",children:Qe&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p,{children:"Configure PAR Level calculation parameters and manual usage settings."}),(0,u.jsxs)("div",{style:{marginBottom:"16px",padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:"Current Prediction"}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)(w,{level:Qe.prediction_confidence||"none",children:it(Qe.prediction_confidence||"none")}),(0,u.jsxs)("span",{style:{fontSize:"14px",color:"#0A2540"},children:[(parseFloat(String(Qe.avg_daily_usage))||0).toFixed(2)," ",Qe.unit,"/day (calculated)"]})]})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsxs)(d.lR,{children:["Minimum Stock Level (",Qe.unit,")"]}),(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:qe.min_stock,onChange:e=>Ne({...qe,min_stock:e.target.value}),placeholder:"0"})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Lead Time (days)"}),(0,u.jsx)(d.ZQ,{type:"number",min:"1",value:qe.lead_time_days,onChange:e=>Ne({...qe,lead_time_days:e.target.value}),placeholder:"1"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Time from order to delivery"})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsx)(d.lR,{children:"Safety Stock (%)"}),(0,u.jsx)(d.ZQ,{type:"number",min:"0",max:"100",value:qe.safety_stock_percent,onChange:e=>Ne({...qe,safety_stock_percent:e.target.value}),placeholder:"20"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Buffer percentage for unexpected demand"})]}),(0,u.jsxs)(d.gE,{children:[(0,u.jsxs)(d.lR,{children:["Manual Daily Usage (",Qe.unit,"/day)"]}),(0,u.jsx)(d.ZQ,{type:"number",step:"0.01",min:"0",value:qe.manual_daily_usage,onChange:e=>Ne({...qe,manual_daily_usage:e.target.value}),placeholder:"Leave empty to use calculated value"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Override calculated usage when prediction confidence is low"})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(d.yl,{variant:"secondary",onClick:()=>Ue(!1),children:"Cancel"}),(0,u.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(Qe)try{Ze(!0);(await tt(`/api/restaurants/${Ke}/inventory/${Qe.id}/settings`,{method:"PUT",body:JSON.stringify({lead_time_days:parseInt(qe.lead_time_days)||1,safety_stock_percent:parseFloat(qe.safety_stock_percent)||20,manual_daily_usage:qe.manual_daily_usage?parseFloat(qe.manual_daily_usage):null,min_stock:parseFloat(qe.min_stock)||0})})).success&&(Ue(!1),nt())}catch(e){console.error("Failed to save settings:",e)}finally{Ze(!1)}},disabled:We,children:We?"Saving...":"Save Settings"})]})]})})]}):(0,u.jsx)(a.A,{children:(0,u.jsx)(l.mc,{children:(0,u.jsx)(l.pp,{children:(0,u.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),i=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[a,l]=(0,r.useState)(Object.keys(s.DL)),[c,o]=(0,r.useState)(!0),[d,x]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void o(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(r)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),x("Failed to load currency settings"),n("RM")}finally{o(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:c,error:d}}}}]);