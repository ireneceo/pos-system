"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2652],{1840:(e,n,t)=>{t.d(n,{ff:()=>i});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const s="";r();async function i(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${s}${e}`,r={credentials:"include",headers:{"Content-Type":"application/json",...n.headers},...n},i=await fetch(t,r);if(!i.ok){const e=await i.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${i.status}`)}return i.json()}},2488:(e,n,t)=>{t.d(n,{DO:()=>c,Jt:()=>d,Qn:()=>l});t(9950);var r=t(4752),s=t(4414);const i=r.Ay.div`
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
`,o=r.Ay.input`
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
`,a=r.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:r,...o}=e;return(0,s.jsx)(i,{className:t,style:r,...o,children:n})},c=e=>{let{placeholder:n="Search...",...t}=e;return(0,s.jsx)(o,{placeholder:n,...t})},d=e=>{let{children:n,...t}=e;return(0,s.jsx)(a,{...t,children:n})}},2652:(e,n,t)=>{t.r(n),t.d(n,{default:()=>A});var r=t(9950),s=t(4752),i=t(3310),o=t(7492),a=t(2488),l=t(1367),c=t(9610),d=t(4021),x=t(6038),u=t(1840),h=t(4414);const p=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,j=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`,g=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.status){case"out_of_stock":return"background: #FEE2E2; color: #DC2626;";case"low_stock":return"background: #FEF3C7; color: #D97706;";default:return"background: #ECFDF5; color: #059669;"}}}
`,f=s.Ay.div`
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
`,m=s.Ay.div`
  flex: 1;
`,y=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=s.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${e=>{switch(e.urgency){case"expired":return"background: #7F1D1D; color: white;";case"critical":return"background: #DC2626; color: white;";case"warning":return"background: #F59E0B; color: white;";default:return"background: #059669; color: white;"}}}
`,k=s.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>{switch(e.level){case"high":return"background: #ECFDF5; color: #059669;";case"medium":return"background: #FEF3C7; color: #D97706;";case"low":return"background: #FEE2E2; color: #DC2626;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,_=s.Ay.div``,b=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=s.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #E0E7FF;
  color: #4338CA;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
`,A=()=>{var e;const{user:n}=(0,l.As)(),{defaultCurrency:t}=(0,d.i1)(),[s,A]=(0,r.useState)("RM"),[C,E]=(0,r.useState)("overview"),[$,B]=(0,r.useState)(!0),[D,z]=(0,r.useState)([]),[I,M]=(0,r.useState)("all"),[R,O]=(0,r.useState)(null),[P,N]=(0,r.useState)([]),[L,U]=(0,r.useState)([]),[Q,T]=(0,r.useState)(""),[Z,H]=(0,r.useState)("all"),[W,J]=(0,r.useState)(!1),[V,X]=(0,r.useState)(null),Y=null===n||void 0===n?void 0:n.brand_id;(0,r.useEffect)(()=>{t&&A(t)},[t]);const q=(0,r.useCallback)(async()=>{if(Y)try{B(!0);const e=await(0,u.ff)(`/api/brands/${Y}/restaurants`);e.success&&z(e.data||[]);const n=await(0,u.ff)(`/api/brands/${Y}/inventory/summary`);n.success&&O(n.data);const t=await(0,u.ff)(`/api/brands/${Y}/inventory`);t.success&&N(t.data||[]);const r=await(0,u.ff)(`/api/brands/${Y}/inventory/expiring?days=14`);r.success&&U(r.data||[])}catch(e){console.error("Failed to fetch brand inventory data:",e)}finally{B(!1)}},[Y]);(0,r.useEffect)(()=>{q()},[q]);const G=P.filter(e=>{var n;const t=e.name.toLowerCase().includes(Q.toLowerCase()),r="all"===Z||e.stock_status===Z,s="all"===I||(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())===I;return t&&r&&s}),K=e=>{switch(e){case"out_of_stock":return"Out of Stock";case"low_stock":return"Low Stock";default:return"Normal"}},ee=e=>{switch(e){case"high":return"High";case"medium":return"Medium";case"low":return"Low";default:return"No Data"}};return Y?(0,h.jsxs)(i.A,{children:[(0,h.jsxs)(o.mc,{children:[(0,h.jsxs)(o.Y9,{children:[(0,h.jsx)(o.hE,{children:"Brand Inventory"}),(0,h.jsx)(o.ex,{children:(0,h.jsxs)(a.Jt,{value:I,onChange:e=>M(e.target.value),style:{minWidth:"200px"},children:[(0,h.jsx)("option",{value:"all",children:"All Restaurants"}),D.map(e=>(0,h.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]})})]}),(0,h.jsxs)(o.UC,{children:[(0,h.jsxs)(o.j,{children:[(0,h.jsx)(o.oz,{active:"overview"===C,onClick:()=>E("overview"),children:"Overview"}),(0,h.jsxs)(o.oz,{active:"alerts"===C,onClick:()=>E("alerts"),children:["Alerts (",L.filter(e=>"expired"===e.urgency||"critical"===e.urgency).length+P.filter(e=>"out_of_stock"===e.stock_status||"low_stock"===e.stock_status).length,")"]}),(0,h.jsx)(o.oz,{active:"by-restaurant"===C,onClick:()=>E("by-restaurant"),children:"By Restaurant"})]}),$?(0,h.jsx)(o.pp,{children:"Loading..."}):"overview"===C?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{children:"Brand-wide inventory overview showing stock levels across all your restaurants."}),(0,h.jsxs)(o.MD,{children:[(0,h.jsxs)(o.hI,{color:"#635BFF",children:[(0,h.jsx)(o.Os,{children:(null===R||void 0===R?void 0:R.total_restaurants)||0}),(0,h.jsx)(o.v0,{children:"Restaurants"}),(0,h.jsx)(o.d1,{children:"active locations"})]}),(0,h.jsxs)(o.hI,{color:"#059669",children:[(0,h.jsx)(o.Os,{children:(null===R||void 0===R?void 0:R.total_ingredients)||0}),(0,h.jsx)(o.v0,{children:"Total Items"}),(0,h.jsx)(o.d1,{children:"tracked ingredients"})]}),(0,h.jsxs)(o.hI,{color:"#D97706",children:[(0,h.jsx)(o.Os,{children:(null===R||void 0===R?void 0:R.low_stock_count)||0}),(0,h.jsx)(o.v0,{children:"Low Stock"}),(0,h.jsx)(o.d1,{children:"need attention"})]}),(0,h.jsxs)(o.hI,{color:"#DC2626",children:[(0,h.jsx)(o.Os,{children:(null===R||void 0===R?void 0:R.out_of_stock_count)||0}),(0,h.jsx)(o.v0,{children:"Out of Stock"}),(0,h.jsx)(o.d1,{children:"urgent"})]}),(0,h.jsxs)(o.hI,{color:"#EA580C",children:[(0,h.jsx)(o.Os,{children:(null===R||void 0===R?void 0:R.expiring_count)||0}),(0,h.jsx)(o.v0,{children:"Expiring Soon"}),(0,h.jsx)(o.d1,{children:"within 7 days"})]})]}),(0,h.jsx)(j,{children:"Inventory Status"}),(0,h.jsxs)(a.Qn,{children:[(0,h.jsx)(a.DO,{type:"text",placeholder:"Search ingredients...",value:Q,onChange:e=>T(e.target.value)}),(0,h.jsxs)(a.Jt,{value:Z,onChange:e=>H(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"normal",children:"Normal"}),(0,h.jsx)("option",{value:"low_stock",children:"Low Stock"}),(0,h.jsx)("option",{value:"out_of_stock",children:"Out of Stock"})]})]}),0===G.length?(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No inventory data found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Inventory data from your restaurants will appear here."})]}):(0,h.jsxs)(o.XI,{children:[(0,h.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Restaurant"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Prediction"}),(0,h.jsx)("span",{children:"Actions"})]}),G.slice(0,20).map(e=>(0,h.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,h.jsxs)(o.Np,{children:[(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Ingredient"}),(0,h.jsxs)(_,{children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)(F,{children:[e.category," - ",(0,x.vv)(e.unit_cost,s),"/",e.unit]})]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Restaurant"}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#4338CA"},children:e.restaurant_name||"-"})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Status"}),(0,h.jsx)(g,{status:e.stock_status,children:K(e.stock_status)})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontWeight:600,color:"#0A2540"},children:[e.current_stock," ",e.unit]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Prediction"}),(0,h.jsx)(k,{level:e.prediction_confidence||"none",children:ee(e.prediction_confidence||"none")})]})]}),(0,h.jsx)(o.wr,{children:(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>(X(e),void J(!0)),style:{padding:"6px 12px",fontSize:"13px"},children:"View"})})]},`${e.restaurant_id}-${e.id}`))]})]}):"alerts"===C?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{children:"Stock alerts and expiring items across all your restaurants."}),P.filter(e=>"out_of_stock"===e.stock_status||"low_stock"===e.stock_status).length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j,{children:"Stock Alerts"}),(0,h.jsx)("div",{children:P.filter(e=>"out_of_stock"===e.stock_status||"low_stock"===e.stock_status).slice(0,10).map(e=>(0,h.jsxs)(f,{urgency:"out_of_stock"===e.stock_status?"expired":"warning",children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)(y,{children:[e.name,(0,h.jsx)(S,{children:e.restaurant_name})]}),(0,h.jsxs)(v,{children:["Current: ",e.current_stock," ",e.unit," / Min: ",e.min_stock," ",e.unit]})]}),(0,h.jsx)(g,{status:e.stock_status,children:K(e.stock_status)})]},`stock-${e.restaurant_id}-${e.id}`))})]}),L.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j,{children:"Expiring Items"}),(0,h.jsx)("div",{children:L.slice(0,10).map(e=>(0,h.jsxs)(f,{urgency:e.urgency,children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)(y,{children:[e.ingredient_name,e.batch_number&&(0,h.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:["Batch: ",e.batch_number]}),(0,h.jsx)(S,{children:e.restaurant_name})]}),(0,h.jsxs)(v,{children:[e.remaining_quantity," ",e.unit," remaining - Expires: ",new Date(e.expiry_date).toLocaleDateString()]})]}),(0,h.jsx)(w,{urgency:e.urgency,children:"expired"===e.urgency?"EXPIRED":"critical"===e.urgency?`${e.days_until_expiry}d LEFT`:"warning"===e.urgency?`${e.days_until_expiry} DAYS`:`${e.days_until_expiry} days`})]},e.id))})]}),0===P.filter(e=>"normal"!==e.stock_status).length&&0===L.length&&(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No alerts"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"All inventory levels are healthy across your restaurants."})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p,{children:"View inventory breakdown by individual restaurant."}),D.map(e=>{const n=P.filter(n=>n.restaurant_id===e.id),t=n.filter(e=>"low_stock"===e.stock_status).length,r=n.filter(e=>"out_of_stock"===e.stock_status).length;return(0,h.jsxs)("div",{style:{marginBottom:"32px"},children:[(0,h.jsxs)(j,{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.name,r>0&&(0,h.jsxs)(g,{status:"out_of_stock",children:[r," Out"]}),t>0&&(0,h.jsxs)(g,{status:"low_stock",children:[t," Low"]})]}),0===n.length?(0,h.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",padding:"16px 0"},children:"No inventory data for this restaurant."}):(0,h.jsxs)(o.XI,{children:[(0,h.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 100px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Current Stock"}),(0,h.jsx)("span",{children:"Min Stock"}),(0,h.jsx)("span",{children:"Actions"})]}),n.slice(0,10).map(n=>(0,h.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 100px",children:[(0,h.jsxs)(o.Np,{children:[(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Ingredient"}),(0,h.jsxs)(_,{children:[(0,h.jsx)(b,{children:n.name}),(0,h.jsx)(F,{children:n.category})]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Status"}),(0,h.jsx)(g,{status:n.stock_status,children:K(n.stock_status)})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Current Stock"}),(0,h.jsxs)("div",{style:{fontWeight:600},children:[n.current_stock," ",n.unit]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Min Stock"}),(0,h.jsxs)("div",{style:{color:"#6B7280"},children:[n.min_stock," ",n.unit]})]})]}),(0,h.jsx)(o.wr,{children:(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${e.id}/inventory`,style:{padding:"6px 12px",fontSize:"12px"},children:"Manage"})})]},n.id))]})]},e.id)})]})]})]}),(0,h.jsx)(c.aF,{isOpen:W,onClose:()=>J(!1),title:`Inventory Detail: ${(null===V||void 0===V?void 0:V.name)||""}`,size:"medium",children:V&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Restaurant"}),(0,h.jsx)(c.ZQ,{type:"text",value:V.restaurant_name||"-",disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Category"}),(0,h.jsx)(c.ZQ,{type:"text",value:V.category,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Current Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${V.current_stock} ${V.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Minimum Stock"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${V.min_stock} ${V.unit}`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit Cost"}),(0,h.jsx)(c.ZQ,{type:"text",value:(0,x.vv)(V.unit_cost,s),disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Avg. Daily Usage"}),(0,h.jsx)(c.ZQ,{type:"text",value:`${(null===(e=V.avg_daily_usage)||void 0===e?void 0:e.toFixed(2))||"0"} ${V.unit}/day`,disabled:!0})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Prediction Confidence"}),(0,h.jsx)("div",{style:{marginTop:"8px"},children:(0,h.jsx)(k,{level:V.prediction_confidence||"none",children:ee(V.prediction_confidence||"none")})})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px"},children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>J(!1),children:"Close"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:()=>window.location.href=`/restaurant/${V.restaurant_id}/inventory`,children:"Go to Restaurant Inventory"})]})]})})]}):(0,h.jsx)(i.A,{children:(0,h.jsx)(o.mc,{children:(0,h.jsx)(o.pp,{children:(0,h.jsx)("p",{children:"Brand not found. Please log in with a brand account."})})})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>o});var r=t(9950),s=t(1367),i=t(6038);const o=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)("RM"),[o,a]=(0,r.useState)(Object.keys(i.DL)),[l,c]=(0,r.useState)(!0),[d,x]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let s=r>=0?n[r+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),x("Failed to load currency settings"),t("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:l,error:d}}}}]);