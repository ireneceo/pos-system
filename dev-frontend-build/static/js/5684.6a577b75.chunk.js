"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{5684:(e,o,r)=>{r.r(o),r.d(o,{default:()=>q});var n=r(9950),t=r(4752),a=r(8409),i=r(2488),s=r(1367),l=r(6038),c=r(7617),d=r(5030),p=r(4414);const u=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,h=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${e=>e.isPopular?"#635BFF":"#E6EBF1"};
  position: relative;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  display: flex;
  flex-direction: column;
  min-height: 450px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${e=>e.isPopular&&"\n    &::before {\n      content: 'Most Popular';\n      position: absolute;\n      top: -12px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #635BFF;\n      color: white;\n      padding: 6px 16px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n  "}
`,x=t.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,g=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,f=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,y=t.Ay.div`
  text-align: center;
`,v=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,j=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,m=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,b=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,P=t.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,_=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,A=t.Ay.div`
  text-align: center;
`,F=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,k=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,C=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,w=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,B=t.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,E=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,S=t.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,$=t.Ay.div`
  margin-bottom: 20px;
`,z=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,T=t.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,D=t.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,I=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,O=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,R=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,M=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,N=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,Y=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,L=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,W=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,J=t.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,U=t.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #EFF6FF;
  border-radius: 8px;
  border: 1px solid #BFDBFE;
`,H=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,K=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,Q=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,X={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},q=()=>{const{t:e}=(0,d.Bd)("foodcourt"),{user:o}=(0,s.As)(),[r,t]=(0,n.useState)([]),[q,G]=(0,n.useState)(!0),V=(null===o||void 0===o?void 0:o.foodcourt_id)||null,[Z,ee]=(0,n.useState)(""),[oe,re]=(0,n.useState)("all"),[ne,te]=(0,n.useState)(""),[ae,ie]=(0,n.useState)({}),[se,le]=(0,n.useState)([]),[ce,de]=(0,n.useState)(!1),[pe,ue]=(0,n.useState)(!1),[he,xe]=(0,n.useState)(!1),[ge,fe]=(0,n.useState)(!1),[ye,ve]=(0,n.useState)(!1),[je,me]=(0,n.useState)(null),[be,Pe]=(0,n.useState)({}),[_e,Ae]=(0,n.useState)([]),Fe={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[ke,Ce]=(0,n.useState)(Fe),[we,Be]=(0,n.useState)(Fe),[Ee,Se]=(0,n.useState)(!1),[$e,ze]=(0,n.useState)(null),Te=(0,n.useCallback)(async e=>{try{G(!0);const o=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${e}/plans`,{headers:{Authorization:`Bearer ${o}`}});if(r.ok){const e=await r.json();t(e.success?e.data:Array.isArray(e)?e:[])}}catch(o){console.error("Error fetching plans:",o)}finally{G(!1)}},[]);(0,n.useEffect)(()=>{V&&Te(V),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const o=await e.json();ie(o.currencies||o.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const o=((await e.json()).data||[]).map(e=>e.code);le(o),o.length>0&&te(e=>e||o[0])}}catch(e){console.error("Error fetching supported currencies:",e),le(["MYR","KRW"]),te(e=>e||"MYR")}})()},[V,Te]);const De=(e,o)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===ne);if(r)return parseFloat("monthly"===o?r.monthly_price:r.annual_price)||0}return 0},Ie=e=>{if(e.prices&&e.prices.length>0){const o=e.prices.find(e=>e.currency===ne);return!(!o||!(parseFloat(o.monthly_price)>0||parseFloat(o.annual_price)>0))}return!1},Oe=(e,o)=>Ie(e)?(0,l.vv)(De(e,o),ne):"Not Set",Re=e=>{var o;return(null===(o=e.planRestaurants)||void 0===o?void 0:o.filter(e=>e.is_active).length)||0},Me=e=>{me(e),V&&(async(e,o)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${e}/plans/${o}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),o=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of o){var r,n;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(n=a.annual_price)||void 0===n?void 0:n.toString())||"0"}}for(const r of se)t[r]||(t[r]={monthly:"0",annual:"0"});Pe(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(V,e.id),fe(!0)},Ne=e=>{me(e),V&&(async e=>{try{const o=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${e}/restaurants`,{headers:{Authorization:`Bearer ${o}`}});if(r.ok){const e=await r.json();Ae(e.success?e.data:Array.isArray(e)?e:[])}}catch(o){console.error("Error fetching foodcourt restaurants:",o)}})(V),ve(!0)},Ye=r.filter(e=>{const o=e.name.toLowerCase().includes(Z.toLowerCase())||(e.description||"").toLowerCase().includes(Z.toLowerCase()),r="all"===oe||"active"===oe&&e.is_active||"inactive"===oe&&!e.is_active;return o&&r}),Le=r.filter(e=>e.is_active).length,We=r.reduce((e,o)=>e+Re(o),0),Je=r.reduce((e,o)=>"fixed"===o.charge_type?e+De(o,"monthly")*Re(o):e,0),Ue=(o,r)=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(J,{children:e("foodcourt:foodcourtPlansPage.chargeType")}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Charge Type *"}),(0,p.jsxs)(D,{value:o.charge_type,onChange:e=>r(o=>({...o,charge_type:e.target.value})),children:[(0,p.jsx)("option",{value:"fixed",children:e("foodcourt:foodcourtPlansPage.fixedAmountCurrencyPricing")}),(0,p.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===o.charge_type?(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.pricingByCurrency")}),(0,p.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[se.map(n=>{var t,a,i,s;const l=ae[n];return(0,p.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===l||void 0===l?void 0:l.symbol)||n," ",n," - ",(null===l||void 0===l?void 0:l.name)||n]}),(0,p.jsxs)(O,{children:[(0,p.jsxs)($,{style:{marginBottom:0},children:[(0,p.jsx)(z,{style:{fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.monthly")}),(0,p.jsx)(T,{type:"number",placeholder:"0",value:(null===(t=o.currency_prices)||void 0===t||null===(a=t[n])||void 0===a?void 0:a.monthly)||"",onChange:e=>r(o=>{var r;return{...o,currency_prices:{...o.currency_prices,[n]:{...null===(r=o.currency_prices)||void 0===r?void 0:r[n],monthly:e.target.value}}}})})]}),(0,p.jsxs)($,{style:{marginBottom:0},children:[(0,p.jsx)(z,{style:{fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.annual")}),(0,p.jsx)(T,{type:"number",placeholder:"0",value:(null===(i=o.currency_prices)||void 0===i||null===(s=i[n])||void 0===s?void 0:s.annual)||"",onChange:e=>r(o=>{var r;return{...o,currency_prices:{...o.currency_prices,[n]:{...null===(r=o.currency_prices)||void 0===r?void 0:r[n],annual:e.target.value}}}})})]})]})]},n)}),0===se.length&&(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Revenue Percentage (%)"}),(0,p.jsx)(T,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:o.percentage_value,onChange:e=>r(o=>({...o,percentage_value:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.revenueBasePeriod")}),(0,p.jsxs)(D,{value:o.revenue_base,onChange:e=>r(o=>({...o,revenue_base:e.target.value})),children:[(0,p.jsx)("option",{value:"previous_month",children:e("foodcourt:foodcourtPlansPage.previousMonth")}),(0,p.jsx)("option",{value:"previous_year",children:e("foodcourt:foodcourtPlansPage.previousYear")}),(0,p.jsx)("option",{value:"up_to_billing_day",children:e("foodcourt:foodcourtPlansPage.upToBillingDay")})]})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.billingDay128")}),(0,p.jsx)(T,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:o.billing_day,onChange:e=>r(o=>({...o,billing_day:e.target.value}))}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(a.mc,{children:[(0,p.jsxs)(a.Y9,{children:[(0,p.jsx)(a.hE,{children:e("foodcourt:foodcourtPlansPage.foodcourtPlans")}),(0,p.jsx)(a.ex,{children:(0,p.jsx)(a.$n,{variant:"primary",onClick:()=>{Ce({...Fe,currency_prices:{}}),de(!0)},children:e("foodcourt:foodcourtPlansPage.createPlan")})})]}),(0,p.jsxs)(a.UC,{children:[(0,p.jsxs)(a.MD,{children:[(0,p.jsxs)(a.hI,{color:"#059669",children:[(0,p.jsx)(a.Os,{children:r.length}),(0,p.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.totalPlans")}),(0,p.jsxs)(a.d1,{children:[Le," active"]})]}),(0,p.jsxs)(a.hI,{color:"#10B981",children:[(0,p.jsx)(a.Os,{children:Le}),(0,p.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.activePlans")}),(0,p.jsxs)(a.d1,{children:[r.length>0?Math.round(Le/r.length*100):0,"% available"]})]}),(0,p.jsxs)(a.hI,{color:"#F59E0B",children:[(0,p.jsx)(a.Os,{children:We}),(0,p.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.totalTenants")}),(0,p.jsx)(a.d1,{children:e("foodcourt:foodcourtPlansPage.acrossAllPlans")})]}),(0,p.jsxs)(a.hI,{color:"#DC2626",children:[(0,p.jsx)(a.Os,{children:(0,l.vv)(Je,ne)}),(0,p.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.fixedMonthlyRevenue")}),(0,p.jsx)(a.d1,{children:e("foodcourt:foodcourtPlansPage.fromFixedtypePlans")})]})]}),(0,p.jsxs)(i.Qn,{children:[(0,p.jsx)(i.DO,{type:"text",placeholder:"Search plans...",value:Z,onChange:e=>ee(e.target.value)}),(0,p.jsxs)(i.Jt,{value:oe,onChange:e=>re(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("foodcourt:foodcourtPlansPage.allStatus")}),(0,p.jsx)("option",{value:"active",children:e("foodcourt:foodcourtPlansPage.active")}),(0,p.jsx)("option",{value:"inactive",children:e("foodcourt:foodcourtPlansPage.inactive")})]}),(0,p.jsx)(i.Jt,{value:ne,onChange:e=>te(e.target.value),style:{minWidth:"150px"},children:se.map(e=>{const o=ae[e];return(0,p.jsxs)("option",{value:e,children:[(null===o||void 0===o?void 0:o.symbol)||e," ",e]},e)})})]}),q?(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:e("foodcourt:foodcourtPlansPage.loadingPlans")}):0===Ye.length?(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===r.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,p.jsx)(u,{children:Ye.map(o=>(0,p.jsxs)(h,{isPopular:o.is_popular,isActive:o.is_active,children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(B,{chargeType:o.charge_type||"fixed",children:"percentage"===o.charge_type?"% Revenue":"Fixed"}),(0,p.jsx)(C,{isActive:o.is_active,children:o.is_active?"Active":"Inactive"})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:o.name}),o.description&&(0,p.jsx)(f,{children:o.description}),(0,p.jsx)(y,{children:"percentage"===o.charge_type?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(v,{children:[parseFloat(o.percentage_value||"0"),"%"]}),(0,p.jsxs)(m,{children:["of revenue (",X[o.revenue_base]||o.revenue_base,")"]})]}):Ie(o)?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(v,{children:[Oe(o,"monthly"),(0,p.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),De(o,"annual")>0&&De(o,"monthly")>0&&(0,p.jsxs)(j,{children:[Oe(o,"annual"),"/year",12*De(o,"monthly")>De(o,"annual")&&(0,p.jsxs)("span",{children:[" (Save ",Math.round((12*De(o,"monthly")-De(o,"annual"))/(12*De(o,"monthly"))*100),"%)"]})]}),(0,p.jsx)(m,{children:e("foodcourt:foodcourtPlansPage.billedMonthlyOrAnnually")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{style:{color:"#F59E0B"},children:e("foodcourt:foodcourtPlansPage.priceNotSet")}),(0,p.jsxs)(m,{style:{color:"#F59E0B"},children:["Set ",ne,' price in "Prices"']})]})})]}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(H,{children:[(0,p.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:e("foodcourt:foodcourtPlansPage.billingDay")}),(0,p.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:o.billing_day?`Every ${o.billing_day}${1===o.billing_day?"st":2===o.billing_day?"nd":3===o.billing_day?"rd":"th"}`:"Subscription Start"})]}),o.auto_generate&&(0,p.jsxs)(H,{style:{marginTop:4},children:[(0,p.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:e("foodcourt:foodcourtPlansPage.autoinvoice")}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:600},children:e("foodcourt:foodcourtPlansPage.enabled")})]})]}),Array.isArray(o.features)&&o.features.length>0&&(0,p.jsx)(b,{children:o.features.map((e,o)=>(0,p.jsx)(P,{children:e},o))}),(0,p.jsxs)(_,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:Re(o)}),(0,p.jsx)(k,{children:e("foodcourt:foodcourtPlansPage.tenants")})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"fixed"===o.charge_type?(0,l.vv)(De(o,"monthly")*Re(o),ne):`${parseFloat(o.percentage_value||"0")}% rev`}),(0,p.jsx)(k,{children:"fixed"===o.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(S,{variant:"primary",onClick:()=>(e=>{var o,r;me(e);let n={};if(e.prices)for(const i of e.prices){var t,a;n[i.currency]={monthly:(null===(t=i.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=i.annual_price)||void 0===a?void 0:a.toString())||"0"}}Be({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(o=e.percentage_value)||void 0===o?void 0:o.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:n,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),ue(!0)})(o),children:e("foodcourt:foodcourtPlansPage.edit")}),"fixed"===o.charge_type&&(0,p.jsx)(S,{variant:"secondary",onClick:()=>Me(o),children:e("foodcourt:foodcourtPlansPage.prices")}),(0,p.jsx)(S,{variant:"secondary",onClick:()=>(e=>{me(e),xe(!0)})(o),children:e("foodcourt:foodcourtPlansPage.view")})]})]},o.id))}),ce&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>de(!1),title:"Create New Plan",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>de(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,p.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(V)try{const e=localStorage.getItem("auth_token"),o={name:ke.name,description:ke.description||null,charge_type:ke.charge_type,billing_day:ke.billing_day?parseInt(ke.billing_day):null,auto_generate:ke.auto_generate,currency:"MYR",is_popular:ke.is_popular,is_active:ke.is_active,features:ke.features.split("\n").filter(e=>e.trim())};"percentage"===ke.charge_type?(o.percentage_value=parseFloat(ke.percentage_value)||0,o.revenue_base=ke.revenue_base):o.currency_prices=Object.fromEntries(Object.entries(ke.currency_prices).map(e=>{let[o,r]=e;return[o,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/foodcourts/${V}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(o)});if(r.ok)de(!1),Ce({...Fe,currency_prices:{}}),Te(V);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:e("foodcourt:foodcourtPlansPage.createPlan")})]}),children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Plan Name *"}),(0,p.jsx)(T,{type:"text",placeholder:"e.g., Monthly Rent, Management Fee, Revenue Share",value:ke.name,onChange:e=>Ce(o=>({...o,name:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.description")}),(0,p.jsx)(I,{placeholder:"Enter plan description...",rows:3,value:ke.description,onChange:e=>Ce(o=>({...o,description:e.target.value}))})]}),Ue(ke,Ce),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.featuresOnePerLine")}),(0,p.jsx)(I,{placeholder:"Enter features, one per line...",rows:4,value:ke.features,onChange:e=>Ce(o=>({...o,features:e.target.value}))})]}),(0,p.jsxs)(R,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:ke.auto_generate,onChange:e=>Ce(o=>({...o,auto_generate:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-auto-generate",children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-popular",checked:ke.is_popular,onChange:e=>Ce(o=>({...o,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-popular",children:e("foodcourt:foodcourtPlansPage.markAsMostPopular")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-active",checked:ke.is_active,onChange:e=>Ce(o=>({...o,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-active",children:e("foodcourt:foodcourtPlansPage.setAsActive")})]})]})]}),pe&&je&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>ue(!1),title:`Edit Plan: ${je.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>ue(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,p.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=je.id,ze(e),void Se(!0);var e},children:e("foodcourt:foodcourtPlansPage.delete")}),(0,p.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(V&&je)try{const e=localStorage.getItem("auth_token"),o={name:we.name,description:we.description||null,charge_type:we.charge_type,billing_day:we.billing_day?parseInt(we.billing_day):null,auto_generate:we.auto_generate,is_popular:we.is_popular,is_active:we.is_active,features:we.features.split("\n").filter(e=>e.trim())};"percentage"===we.charge_type&&(o.percentage_value=parseFloat(we.percentage_value)||0,o.revenue_base=we.revenue_base);const r=await fetch(`/api/foodcourts/${V}/plans/${je.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(o)});if(r.ok){if("fixed"===we.charge_type&&Object.keys(we.currency_prices).length>0){const o=Object.entries(we.currency_prices).map(e=>{let[o,r]=e;return{currency:o,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/foodcourts/${V}/plans/${je.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:o})})}ue(!1),Te(V)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:e("foodcourt:foodcourtPlansPage.saveChanges")})]}),children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Plan Name *"}),(0,p.jsx)(T,{type:"text",value:we.name,onChange:e=>Be(o=>({...o,name:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.description")}),(0,p.jsx)(I,{rows:3,value:we.description,onChange:e=>Be(o=>({...o,description:e.target.value}))})]}),Ue(we,Be),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("foodcourt:foodcourtPlansPage.featuresOnePerLine")}),(0,p.jsx)(I,{rows:4,value:we.features,onChange:e=>Be(o=>({...o,features:e.target.value}))})]}),(0,p.jsxs)(R,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:we.auto_generate,onChange:e=>Be(o=>({...o,auto_generate:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-auto-generate",children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-popular",checked:we.is_popular,onChange:e=>Be(o=>({...o,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-popular",children:e("foodcourt:foodcourtPlansPage.markAsMostPopular")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-active",checked:we.is_active,onChange:e=>Be(o=>({...o,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-active",children:e("foodcourt:foodcourtPlansPage.setAsActive")})]})]})]}),he&&je&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(!1),title:`Plan Details: ${je.name}`,footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>xe(!1),children:e("foodcourt:foodcourtPlansPage.close")})}),children:[(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.planInfo")}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.planId")}),(0,p.jsx)(W,{children:je.id})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.name")}),(0,p.jsx)(W,{children:je.name})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.status")}),(0,p.jsx)(C,{isActive:je.is_active,children:je.is_active?"Active":"Inactive"})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.chargeType")}),(0,p.jsx)(B,{chargeType:je.charge_type||"fixed",children:"percentage"===je.charge_type?"% Revenue":"Fixed"})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.popularPlan")}),(0,p.jsx)(W,{children:je.is_popular?"Yes":"No"})]})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.billing")}),"percentage"===je.charge_type?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.revenuePercentage")}),(0,p.jsxs)(W,{children:[parseFloat(je.percentage_value||"0"),"%"]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.revenueBase")}),(0,p.jsx)(W,{children:X[je.revenue_base]||je.revenue_base})]})]}):(0,p.jsx)(p.Fragment,{children:se.map(o=>{var r,n;const t=null===(r=je.prices)||void 0===r?void 0:r.find(e=>e.currency===o);if(!t)return null;const a=parseFloat(t.monthly_price)||0,i=parseFloat(t.annual_price)||0;return 0===a&&0===i?null:(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(n=ae[o])||void 0===n?void 0:n.symbol)||o," ",o]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.monthly")}),(0,p.jsx)(W,{children:(0,l.vv)(a,o)})]}),i>0&&(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.annual")}),(0,p.jsx)(W,{children:(0,l.vv)(i,o)})]})]},o)})}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.billingDay")}),(0,p.jsx)(W,{children:je.billing_day?`Every ${je.billing_day}th`:"Subscription Start Date"})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")}),(0,p.jsx)(W,{children:je.auto_generate?"Yes":"No"})]})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.statistics")}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.currentTenants")}),(0,p.jsx)(W,{children:Re(je)})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(L,{children:e("foodcourt:foodcourtPlansPage.createdDate")}),(0,p.jsx)(W,{children:new Date(je.createdAt).toLocaleDateString()})]})]}),Array.isArray(je.features)&&je.features.length>0&&(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.features")}),(0,p.jsx)(b,{children:je.features.map((e,o)=>(0,p.jsx)(P,{children:e},o))})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)("h4",{children:["Assigned Tenants (",Re(je),")"]}),je.planRestaurants&&je.planRestaurants.length>0?(0,p.jsx)(K,{children:je.planRestaurants.map(e=>{var o;return(0,p.jsxs)(Q,{isAssigned:!0,children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(o=e.restaurant)||void 0===o?void 0:o.name)||`Restaurant #${e.restaurant_id}`}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,p.jsx)(C,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:e("foodcourt:foodcourtPlansPage.noTenantsAssignedToThisPlan")}),(0,p.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ne(je),children:"Manage Tenant Assignments"})]})]}),ge&&je&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>fe(!1),title:`Set Prices for ${je.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>fe(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,p.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(V&&je)try{const e=localStorage.getItem("auth_token"),o=Object.entries(be).map(e=>{let[o,r]=e;return{currency:o,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});(await fetch(`/api/foodcourts/${V}/plans/${je.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:o})})).ok&&(fe(!1),Te(V))}catch(e){console.error("Error saving plan prices:",e)}},children:e("foodcourt:foodcourtPlansPage.savePrices")})]}),children:[(0,p.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,p.jsx)("div",{style:{display:"grid",gap:"16px"},children:se.map(o=>{var r,n;const t=ae[o];return(0,p.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===t||void 0===t?void 0:t.symbol)||o}),(null===t||void 0===t?void 0:t.name)||o," (",o,")"]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("foodcourt:foodcourtPlansPage.monthlyPrice")}),(0,p.jsx)("input",{type:"number",value:(null===(r=be[o])||void 0===r?void 0:r.monthly)||"",onChange:e=>Pe({...be,[o]:{...be[o],monthly:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("foodcourt:foodcourtPlansPage.annualPrice")}),(0,p.jsx)("input",{type:"number",value:(null===(n=be[o])||void 0===n?void 0:n.annual)||"",onChange:e=>Pe({...be,[o]:{...be[o],annual:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},o)})})]}),ye&&je&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>ve(!1),title:`Manage Tenants: ${je.name}`,footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>ve(!1),children:e("foodcourt:foodcourtPlansPage.close")})}),children:[(0,p.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove tenants from this plan."}),(0,p.jsxs)(K,{children:[_e.map(o=>{var r;const n=null===(r=je.planRestaurants)||void 0===r?void 0:r.some(e=>e.restaurant_id===o.id&&e.is_active);return(0,p.jsxs)(Q,{isAssigned:n,children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:o.name}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:o.address||"No address"})]}),n?(0,p.jsx)(a.$n,{variant:"danger-outline",onClick:()=>(async e=>{if(V&&je)try{const o=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${V}/plans/${je.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${o}`}})).ok){Te(V);const e=await fetch(`/api/foodcourts/${V}/plans/${je.id}`,{headers:{Authorization:`Bearer ${o}`}});if(e.ok){const o=await e.json();me(o.success?o.data:o)}}}catch(o){console.error("Error removing restaurant:",o)}})(o.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.remove")}):(0,p.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(V&&je)try{const o=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${V}/plans/${je.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({restaurant_id:e})})).ok){Te(V);const e=await fetch(`/api/foodcourts/${V}/plans/${je.id}`,{headers:{Authorization:`Bearer ${o}`}});if(e.ok){const o=await e.json();me(o.success?o.data:o)}}}catch(o){console.error("Error assigning restaurant:",o)}})(o.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.assign")})]},o.id)}),0===_e.length&&(0,p.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:e("foodcourt:foodcourtPlansPage.noTenantsFoundInYourFoodcourt")})]})]})]})]}),(0,p.jsx)(c.A,{isOpen:Ee,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(V&&$e){Se(!1);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/foodcourts/${V}/plans/${$e}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(ue(!1),Te(V))}catch(e){console.error("Error deleting plan:",e)}ze(null)}},onCancel:()=>{Se(!1),ze(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,o,r)=>{r.d(o,{A:()=>h});r(9950);var n=r(7119),t=r(4752),a=r(9610),i=r(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,c=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,h=e=>{let{isOpen:o,title:r,message:t,onConfirm:h,onCancel:x,confirmText:g="Confirm",cancelText:f="Cancel",type:y="warning"}=e;return o?n.createPortal((0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:r}),(0,i.jsx)(d,{children:t})]}),(0,i.jsxs)(p,{children:[(0,i.jsx)(u,{variant:"secondary",onClick:x,children:f}),(0,i.jsx)(u,{variant:"primary",type:y,onClick:h,children:g})]})]})}),document.body):null}}}]);