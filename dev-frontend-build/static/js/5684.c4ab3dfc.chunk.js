"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{5684:(e,r,o)=>{o.r(r),o.d(r,{default:()=>G});var n=o(9950),t=o(4752),a=o(8409),i=o(2488),s=o(1367),c=o(6038),l=o(7617),d=o(5030),p=o(9955),u=o(4414);const h=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,x=t.Ay.div`
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
`,g=t.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,f=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,y=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,v=t.Ay.div`
  text-align: center;
`,j=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,m=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,b=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,P=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,_=t.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,F=t.Ay.div`
  text-align: center;
`,C=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,w=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,B=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,k=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,E=t.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,$=t.Ay.div`
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
`,z=t.Ay.div`
  margin-bottom: 20px;
`,T=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,D=t.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,O=t.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,R=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,M=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,I=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,N=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,Y=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,L=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,W=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,J=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,U=t.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,H=t.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #EFF6FF;
  border-radius: 8px;
  border: 1px solid #BFDBFE;
`,K=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,Q=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,X=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,q={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},G=()=>{const{t:e}=(0,d.Bd)("foodcourt"),{user:r}=(0,s.As)(),[o,t]=(0,n.useState)([]),[G,V]=(0,n.useState)(!0),Z=(null===r||void 0===r?void 0:r.foodcourt_id)||null,[ee,re]=(0,n.useState)(""),[oe,ne]=(0,n.useState)("all"),[te,ae]=(0,n.useState)(""),[ie,se]=(0,n.useState)({}),[ce,le]=(0,n.useState)([]),[de,pe]=(0,n.useState)(!1),[ue,he]=(0,n.useState)(!1),[xe,ge]=(0,n.useState)(!1),[fe,ye]=(0,n.useState)(!1),[ve,je]=(0,n.useState)(!1),[me,be]=(0,n.useState)(null),[Pe,_e]=(0,n.useState)({}),[Ae,Fe]=(0,n.useState)([]),Ce={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[we,Be]=(0,n.useState)(Ce),[ke,Ee]=(0,n.useState)(Ce),[$e,Se]=(0,n.useState)(!1),[ze,Te]=(0,n.useState)(null),De=(0,n.useCallback)(async e=>{try{V(!0);const r=(0,p.c4)(),o=await fetch(`/api/foodcourts/${e}/plans`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();t(e.success?e.data:Array.isArray(e)?e:[])}}catch(r){console.error("Error fetching plans:",r)}finally{V(!1)}},[]);(0,n.useEffect)(()=>{Z&&De(Z),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();se(r.currencies||r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=((await e.json()).data||[]).map(e=>e.code);le(r),r.length>0&&ae(e=>e||r[0])}}catch(e){console.error("Error fetching supported currencies:",e),le(["MYR","KRW"]),ae(e=>e||"MYR")}})()},[Z,De]);const Oe=(e,r)=>{if(e.prices&&e.prices.length>0){const o=e.prices.find(e=>e.currency===te);if(o)return parseFloat("monthly"===r?o.monthly_price:o.annual_price)||0}return 0},Re=e=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===te);return!(!r||!(parseFloat(r.monthly_price)>0||parseFloat(r.annual_price)>0))}return!1},Me=(e,r)=>Re(e)?(0,c.vv)(Oe(e,r),te):"Not Set",Ie=e=>{var r;return(null===(r=e.planRestaurants)||void 0===r?void 0:r.filter(e=>e.is_active).length)||0},Ne=e=>{be(e),Z&&(async(e,r)=>{try{const t=(0,p.c4)(),a=await fetch(`/api/foodcourts/${e}/plans/${r}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),r=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of r){var o,n;t[a.currency]={monthly:(null===(o=a.monthly_price)||void 0===o?void 0:o.toString())||"0",annual:(null===(n=a.annual_price)||void 0===n?void 0:n.toString())||"0"}}for(const o of ce)t[o]||(t[o]={monthly:"0",annual:"0"});_e(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(Z,e.id),ye(!0)},Ye=e=>{be(e),Z&&(async e=>{try{const r=(0,p.c4)(),o=await fetch(`/api/foodcourts/${e}/restaurants`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();Fe(e.success?e.data:Array.isArray(e)?e:[])}}catch(r){console.error("Error fetching foodcourt restaurants:",r)}})(Z),je(!0)},Le=o.filter(e=>{const r=e.name.toLowerCase().includes(ee.toLowerCase())||(e.description||"").toLowerCase().includes(ee.toLowerCase()),o="all"===oe||"active"===oe&&e.is_active||"inactive"===oe&&!e.is_active;return r&&o}),We=o.filter(e=>e.is_active).length,Je=o.reduce((e,r)=>e+Ie(r),0),Ue=o.reduce((e,r)=>"fixed"===r.charge_type?e+Oe(r,"monthly")*Ie(r):e,0),He=(r,o)=>(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(U,{children:e("foodcourt:foodcourtPlansPage.chargeType")}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:"Charge Type *"}),(0,u.jsxs)(O,{value:r.charge_type,onChange:e=>o(r=>({...r,charge_type:e.target.value})),children:[(0,u.jsx)("option",{value:"fixed",children:e("foodcourt:foodcourtPlansPage.fixedAmountCurrencyPricing")}),(0,u.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===r.charge_type?(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.pricingByCurrency")}),(0,u.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[ce.map(n=>{var t,a,i,s;const c=ie[n];return(0,u.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,u.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===c||void 0===c?void 0:c.symbol)||n," ",n," - ",(null===c||void 0===c?void 0:c.name)||n]}),(0,u.jsxs)(M,{children:[(0,u.jsxs)(z,{style:{marginBottom:0},children:[(0,u.jsx)(T,{style:{fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.monthly")}),(0,u.jsx)(D,{type:"number",placeholder:"0",value:(null===(t=r.currency_prices)||void 0===t||null===(a=t[n])||void 0===a?void 0:a.monthly)||"",onChange:e=>o(r=>{var o;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(o=r.currency_prices)||void 0===o?void 0:o[n],monthly:e.target.value}}}})})]}),(0,u.jsxs)(z,{style:{marginBottom:0},children:[(0,u.jsx)(T,{style:{fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.annual")}),(0,u.jsx)(D,{type:"number",placeholder:"0",value:(null===(i=r.currency_prices)||void 0===i||null===(s=i[n])||void 0===s?void 0:s.annual)||"",onChange:e=>o(r=>{var o;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(o=r.currency_prices)||void 0===o?void 0:o[n],annual:e.target.value}}}})})]})]})]},n)}),0===ce.length&&(0,u.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:"Revenue Percentage (%)"}),(0,u.jsx)(D,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:r.percentage_value,onChange:e=>o(r=>({...r,percentage_value:e.target.value}))})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.revenueBasePeriod")}),(0,u.jsxs)(O,{value:r.revenue_base,onChange:e=>o(r=>({...r,revenue_base:e.target.value})),children:[(0,u.jsx)("option",{value:"previous_month",children:e("foodcourt:foodcourtPlansPage.previousMonth")}),(0,u.jsx)("option",{value:"previous_year",children:e("foodcourt:foodcourtPlansPage.previousYear")}),(0,u.jsx)("option",{value:"up_to_billing_day",children:e("foodcourt:foodcourtPlansPage.upToBillingDay")})]})]})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.billingDay128")}),(0,u.jsx)(D,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:r.billing_day,onChange:e=>o(r=>({...r,billing_day:e.target.value}))}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(a.mc,{children:[(0,u.jsxs)(a.Y9,{children:[(0,u.jsx)(a.hE,{children:e("foodcourt:foodcourtPlansPage.foodcourtPlans")}),(0,u.jsx)(a.ex,{children:(0,u.jsx)(a.$n,{variant:"primary",onClick:()=>{Be({...Ce,currency_prices:{}}),pe(!0)},children:e("foodcourt:foodcourtPlansPage.createPlan")})})]}),(0,u.jsxs)(a.UC,{children:[(0,u.jsxs)(a.MD,{children:[(0,u.jsxs)(a.hI,{color:"#059669",children:[(0,u.jsx)(a.Os,{children:o.length}),(0,u.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.totalPlans")}),(0,u.jsxs)(a.d1,{children:[We," active"]})]}),(0,u.jsxs)(a.hI,{color:"#10B981",children:[(0,u.jsx)(a.Os,{children:We}),(0,u.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.activePlans")}),(0,u.jsxs)(a.d1,{children:[o.length>0?Math.round(We/o.length*100):0,"% available"]})]}),(0,u.jsxs)(a.hI,{color:"#F59E0B",children:[(0,u.jsx)(a.Os,{children:Je}),(0,u.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.totalTenants")}),(0,u.jsx)(a.d1,{children:e("foodcourt:foodcourtPlansPage.acrossAllPlans")})]}),(0,u.jsxs)(a.hI,{color:"#DC2626",children:[(0,u.jsx)(a.Os,{children:(0,c.vv)(Ue,te)}),(0,u.jsx)(a.v0,{children:e("foodcourt:foodcourtPlansPage.fixedMonthlyRevenue")}),(0,u.jsx)(a.d1,{children:e("foodcourt:foodcourtPlansPage.fromFixedtypePlans")})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search plans...",value:ee,onChange:e=>re(e.target.value)}),(0,u.jsxs)(i.Jt,{value:oe,onChange:e=>ne(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:e("foodcourt:foodcourtPlansPage.allStatus")}),(0,u.jsx)("option",{value:"active",children:e("foodcourt:foodcourtPlansPage.active")}),(0,u.jsx)("option",{value:"inactive",children:e("foodcourt:foodcourtPlansPage.inactive")})]}),(0,u.jsx)(i.Jt,{value:te,onChange:e=>ae(e.target.value),style:{minWidth:"150px"},children:ce.map(e=>{const r=ie[e];return(0,u.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),G?(0,u.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:e("foodcourt:foodcourtPlansPage.loadingPlans")}):0===Le.length?(0,u.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===o.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,u.jsx)(h,{children:Le.map(r=>(0,u.jsxs)(x,{isPopular:r.is_popular,isActive:r.is_active,children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(E,{chargeType:r.charge_type||"fixed",children:"percentage"===r.charge_type?"% Revenue":"Fixed"}),(0,u.jsx)(B,{isActive:r.is_active,children:r.is_active?"Active":"Inactive"})]}),(0,u.jsxs)(g,{children:[(0,u.jsx)(f,{children:r.name}),r.description&&(0,u.jsx)(y,{children:r.description}),(0,u.jsx)(v,{children:"percentage"===r.charge_type?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(j,{children:[parseFloat(r.percentage_value||"0"),"%"]}),(0,u.jsxs)(b,{children:["of revenue (",q[r.revenue_base]||r.revenue_base,")"]})]}):Re(r)?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(j,{children:[Me(r,"monthly"),(0,u.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Oe(r,"annual")>0&&Oe(r,"monthly")>0&&(0,u.jsxs)(m,{children:[Me(r,"annual"),"/year",12*Oe(r,"monthly")>Oe(r,"annual")&&(0,u.jsxs)("span",{children:[" (Save ",Math.round((12*Oe(r,"monthly")-Oe(r,"annual"))/(12*Oe(r,"monthly"))*100),"%)"]})]}),(0,u.jsx)(b,{children:e("foodcourt:foodcourtPlansPage.billedMonthlyOrAnnually")})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(j,{style:{color:"#F59E0B"},children:e("foodcourt:foodcourtPlansPage.priceNotSet")}),(0,u.jsxs)(b,{style:{color:"#F59E0B"},children:["Set ",te,' price in "Prices"']})]})})]}),(0,u.jsxs)(H,{children:[(0,u.jsxs)(K,{children:[(0,u.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:e("foodcourt:foodcourtPlansPage.billingDay")}),(0,u.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:r.billing_day?`Every ${r.billing_day}${1===r.billing_day?"st":2===r.billing_day?"nd":3===r.billing_day?"rd":"th"}`:"Subscription Start"})]}),r.auto_generate&&(0,u.jsxs)(K,{style:{marginTop:4},children:[(0,u.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:e("foodcourt:foodcourtPlansPage.autoinvoice")}),(0,u.jsx)("span",{style:{color:"#059669",fontWeight:600},children:e("foodcourt:foodcourtPlansPage.enabled")})]})]}),Array.isArray(r.features)&&r.features.length>0&&(0,u.jsx)(P,{children:r.features.map((e,r)=>(0,u.jsx)(_,{children:e},r))}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(C,{children:Ie(r)}),(0,u.jsx)(w,{children:e("foodcourt:foodcourtPlansPage.tenants")})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(C,{children:"fixed"===r.charge_type?(0,c.vv)(Oe(r,"monthly")*Ie(r),te):`${parseFloat(r.percentage_value||"0")}% rev`}),(0,u.jsx)(w,{children:"fixed"===r.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,u.jsxs)($,{children:[(0,u.jsx)(S,{variant:"primary",onClick:()=>(e=>{var r,o;be(e);let n={};if(e.prices)for(const i of e.prices){var t,a;n[i.currency]={monthly:(null===(t=i.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=i.annual_price)||void 0===a?void 0:a.toString())||"0"}}Ee({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(r=e.percentage_value)||void 0===r?void 0:r.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(o=e.billing_day)||void 0===o?void 0:o.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:n,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),he(!0)})(r),children:e("foodcourt:foodcourtPlansPage.edit")}),"fixed"===r.charge_type&&(0,u.jsx)(S,{variant:"secondary",onClick:()=>Ne(r),children:e("foodcourt:foodcourtPlansPage.prices")}),(0,u.jsx)(S,{variant:"secondary",onClick:()=>(e=>{be(e),ge(!0)})(r),children:e("foodcourt:foodcourtPlansPage.view")})]})]},r.id))}),de&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>pe(!1),title:"Create New Plan",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.$n,{variant:"secondary",onClick:()=>pe(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,u.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Z)try{const e=(0,p.c4)(),r={name:we.name,description:we.description||null,charge_type:we.charge_type,billing_day:we.billing_day?parseInt(we.billing_day):null,auto_generate:we.auto_generate,currency:"MYR",is_popular:we.is_popular,is_active:we.is_active,features:we.features.split("\n").filter(e=>e.trim())};"percentage"===we.charge_type?(r.percentage_value=parseFloat(we.percentage_value)||0,r.revenue_base=we.revenue_base):r.currency_prices=Object.fromEntries(Object.entries(we.currency_prices).map(e=>{let[r,o]=e;return[r,{monthly_price:parseFloat(o.monthly)||0,annual_price:parseFloat(o.annual)||0}]}));const o=await fetch(`/api/foodcourts/${Z}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(r)});if(o.ok)pe(!1),Be({...Ce,currency_prices:{}}),De(Z);else{const e=await o.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:e("foodcourt:foodcourtPlansPage.createPlan")})]}),children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:"Plan Name *"}),(0,u.jsx)(D,{type:"text",placeholder:"e.g., Monthly Rent, Management Fee, Revenue Share",value:we.name,onChange:e=>Be(r=>({...r,name:e.target.value}))})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.description")}),(0,u.jsx)(R,{placeholder:"Enter plan description...",rows:3,value:we.description,onChange:e=>Be(r=>({...r,description:e.target.value}))})]}),He(we,Be),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.featuresOnePerLine")}),(0,u.jsx)(R,{placeholder:"Enter features, one per line...",rows:4,value:we.features,onChange:e=>Be(r=>({...r,features:e.target.value}))})]}),(0,u.jsxs)(I,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:we.auto_generate,onChange:e=>Be(r=>({...r,auto_generate:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"create-auto-generate",children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"create-popular",checked:we.is_popular,onChange:e=>Be(r=>({...r,is_popular:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"create-popular",children:e("foodcourt:foodcourtPlansPage.markAsMostPopular")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"create-active",checked:we.is_active,onChange:e=>Be(r=>({...r,is_active:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"create-active",children:e("foodcourt:foodcourtPlansPage.setAsActive")})]})]})]}),ue&&me&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>he(!1),title:`Edit Plan: ${me.name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.$n,{variant:"secondary",onClick:()=>he(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,u.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=me.id,Te(e),void Se(!0);var e},children:e("foodcourt:foodcourtPlansPage.delete")}),(0,u.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Z&&me)try{const e=(0,p.c4)(),r={name:ke.name,description:ke.description||null,charge_type:ke.charge_type,billing_day:ke.billing_day?parseInt(ke.billing_day):null,auto_generate:ke.auto_generate,is_popular:ke.is_popular,is_active:ke.is_active,features:ke.features.split("\n").filter(e=>e.trim())};"percentage"===ke.charge_type&&(r.percentage_value=parseFloat(ke.percentage_value)||0,r.revenue_base=ke.revenue_base);const o=await fetch(`/api/foodcourts/${Z}/plans/${me.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(r)});if(o.ok){if("fixed"===ke.charge_type&&Object.keys(ke.currency_prices).length>0){const r=Object.entries(ke.currency_prices).map(e=>{let[r,o]=e;return{currency:r,monthly_price:parseFloat(o.monthly)||0,annual_price:parseFloat(o.annual)||0,is_active:!0}});await fetch(`/api/foodcourts/${Z}/plans/${me.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}he(!1),De(Z)}else{const e=await o.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:e("foodcourt:foodcourtPlansPage.saveChanges")})]}),children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:"Plan Name *"}),(0,u.jsx)(D,{type:"text",value:ke.name,onChange:e=>Ee(r=>({...r,name:e.target.value}))})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.description")}),(0,u.jsx)(R,{rows:3,value:ke.description,onChange:e=>Ee(r=>({...r,description:e.target.value}))})]}),He(ke,Ee),(0,u.jsxs)(z,{children:[(0,u.jsx)(T,{children:e("foodcourt:foodcourtPlansPage.featuresOnePerLine")}),(0,u.jsx)(R,{rows:4,value:ke.features,onChange:e=>Ee(r=>({...r,features:e.target.value}))})]}),(0,u.jsxs)(I,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:ke.auto_generate,onChange:e=>Ee(r=>({...r,auto_generate:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"edit-auto-generate",children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"edit-popular",checked:ke.is_popular,onChange:e=>Ee(r=>({...r,is_popular:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"edit-popular",children:e("foodcourt:foodcourtPlansPage.markAsMostPopular")})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("input",{type:"checkbox",id:"edit-active",checked:ke.is_active,onChange:e=>Ee(r=>({...r,is_active:e.target.checked}))}),(0,u.jsx)("label",{htmlFor:"edit-active",children:e("foodcourt:foodcourtPlansPage.setAsActive")})]})]})]}),xe&&me&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>ge(!1),title:`Plan Details: ${me.name}`,footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(a.$n,{variant:"secondary",onClick:()=>ge(!1),children:e("foodcourt:foodcourtPlansPage.close")})}),children:[(0,u.jsxs)(Y,{children:[(0,u.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.planInfo")}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.planId")}),(0,u.jsx)(J,{children:me.id})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.name")}),(0,u.jsx)(J,{children:me.name})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.status")}),(0,u.jsx)(B,{isActive:me.is_active,children:me.is_active?"Active":"Inactive"})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.chargeType")}),(0,u.jsx)(E,{chargeType:me.charge_type||"fixed",children:"percentage"===me.charge_type?"% Revenue":"Fixed"})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.popularPlan")}),(0,u.jsx)(J,{children:me.is_popular?"Yes":"No"})]})]}),(0,u.jsxs)(Y,{children:[(0,u.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.billing")}),"percentage"===me.charge_type?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.revenuePercentage")}),(0,u.jsxs)(J,{children:[parseFloat(me.percentage_value||"0"),"%"]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.revenueBase")}),(0,u.jsx)(J,{children:q[me.revenue_base]||me.revenue_base})]})]}):(0,u.jsx)(u.Fragment,{children:ce.map(r=>{var o,n;const t=null===(o=me.prices)||void 0===o?void 0:o.find(e=>e.currency===r);if(!t)return null;const a=parseFloat(t.monthly_price)||0,i=parseFloat(t.annual_price)||0;return 0===a&&0===i?null:(0,u.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,u.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(n=ie[r])||void 0===n?void 0:n.symbol)||r," ",r]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.monthly")}),(0,u.jsx)(J,{children:(0,c.vv)(a,r)})]}),i>0&&(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.annual")}),(0,u.jsx)(J,{children:(0,c.vv)(i,r)})]})]},r)})}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.billingDay")}),(0,u.jsx)(J,{children:me.billing_day?`Every ${me.billing_day}th`:"Subscription Start Date"})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.autogenerateInvoices")}),(0,u.jsx)(J,{children:me.auto_generate?"Yes":"No"})]})]}),(0,u.jsxs)(Y,{children:[(0,u.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.statistics")}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.currentTenants")}),(0,u.jsx)(J,{children:Ie(me)})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(W,{children:e("foodcourt:foodcourtPlansPage.createdDate")}),(0,u.jsx)(J,{children:new Date(me.createdAt).toLocaleDateString()})]})]}),Array.isArray(me.features)&&me.features.length>0&&(0,u.jsxs)(Y,{children:[(0,u.jsx)("h4",{children:e("foodcourt:foodcourtPlansPage.features")}),(0,u.jsx)(P,{children:me.features.map((e,r)=>(0,u.jsx)(_,{children:e},r))})]}),(0,u.jsxs)(Y,{children:[(0,u.jsxs)("h4",{children:["Assigned Tenants (",Ie(me),")"]}),me.planRestaurants&&me.planRestaurants.length>0?(0,u.jsx)(Q,{children:me.planRestaurants.map(e=>{var r;return(0,u.jsxs)(X,{isAssigned:!0,children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||`Restaurant #${e.restaurant_id}`}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,u.jsx)(B,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,u.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:e("foodcourt:foodcourtPlansPage.noTenantsAssignedToThisPlan")}),(0,u.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ye(me),children:"Manage Tenant Assignments"})]})]}),fe&&me&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>ye(!1),title:`Set Prices for ${me.name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(a.$n,{variant:"secondary",onClick:()=>ye(!1),children:e("foodcourt:foodcourtPlansPage.cancel")}),(0,u.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Z&&me)try{const e=(0,p.c4)(),r=Object.entries(Pe).map(e=>{let[r,o]=e;return{currency:r,monthly_price:parseFloat(o.monthly)||0,annual_price:parseFloat(o.annual)||0,is_active:!0}});(await fetch(`/api/foodcourts/${Z}/plans/${me.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})).ok&&(ye(!1),De(Z))}catch(e){console.error("Error saving plan prices:",e)}},children:e("foodcourt:foodcourtPlansPage.savePrices")})]}),children:[(0,u.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,u.jsx)("div",{style:{display:"grid",gap:"16px"},children:ce.map(r=>{var o,n;const t=ie[r];return(0,u.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,u.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===t||void 0===t?void 0:t.symbol)||r}),(null===t||void 0===t?void 0:t.name)||r," (",r,")"]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("foodcourt:foodcourtPlansPage.monthlyPrice")}),(0,u.jsx)("input",{type:"number",value:(null===(o=Pe[r])||void 0===o?void 0:o.monthly)||"",onChange:e=>_e({...Pe,[r]:{...Pe[r],monthly:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("foodcourt:foodcourtPlansPage.annualPrice")}),(0,u.jsx)("input",{type:"number",value:(null===(n=Pe[r])||void 0===n?void 0:n.annual)||"",onChange:e=>_e({...Pe,[r]:{...Pe[r],annual:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},r)})})]}),ve&&me&&(0,u.jsxs)(a.aF,{isOpen:!0,onClose:()=>je(!1),title:`Manage Tenants: ${me.name}`,footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(a.$n,{variant:"secondary",onClick:()=>je(!1),children:e("foodcourt:foodcourtPlansPage.close")})}),children:[(0,u.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove tenants from this plan."}),(0,u.jsxs)(Q,{children:[Ae.map(r=>{var o;const n=null===(o=me.planRestaurants)||void 0===o?void 0:o.some(e=>e.restaurant_id===r.id&&e.is_active);return(0,u.jsxs)(X,{isAssigned:n,children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:r.name}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.address||"No address"})]}),n?(0,u.jsx)(a.$n,{variant:"danger-outline",onClick:()=>(async e=>{if(Z&&me)try{const r=(0,p.c4)();if((await fetch(`/api/foodcourts/${Z}/plans/${me.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok){De(Z);const e=await fetch(`/api/foodcourts/${Z}/plans/${me.id}`,{headers:{Authorization:`Bearer ${r}`}});if(e.ok){const r=await e.json();be(r.success?r.data:r)}}}catch(r){console.error("Error removing restaurant:",r)}})(r.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.remove")}):(0,u.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(Z&&me)try{const r=(0,p.c4)();if((await fetch(`/api/foodcourts/${Z}/plans/${me.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({restaurant_id:e})})).ok){De(Z);const e=await fetch(`/api/foodcourts/${Z}/plans/${me.id}`,{headers:{Authorization:`Bearer ${r}`}});if(e.ok){const r=await e.json();be(r.success?r.data:r)}}}catch(r){console.error("Error assigning restaurant:",r)}})(r.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("foodcourt:foodcourtPlansPage.assign")})]},r.id)}),0===Ae.length&&(0,u.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:e("foodcourt:foodcourtPlansPage.noTenantsFoundInYourFoodcourt")})]})]})]})]}),(0,u.jsx)(l.A,{isOpen:$e,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(Z&&ze){Se(!1);try{const e=(0,p.c4)();(await fetch(`/api/foodcourts/${Z}/plans/${ze}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(he(!1),De(Z))}catch(e){console.error("Error deleting plan:",e)}Te(null)}},onCancel:()=>{Se(!1),Te(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,r,o)=>{o.d(r,{A:()=>h});o(9950);var n=o(7119),t=o(4752),a=o(9610),i=o(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,c=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
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
`,h=e=>{let{isOpen:r,title:o,message:t,onConfirm:h,onCancel:x,confirmText:g="Confirm",cancelText:f="Cancel",type:y="warning"}=e;return r?n.createPortal((0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(c,{children:[(0,i.jsx)(l,{children:o}),(0,i.jsx)(d,{children:t})]}),(0,i.jsxs)(p,{children:[(0,i.jsx)(u,{variant:"secondary",onClick:x,children:f}),(0,i.jsx)(u,{variant:"primary",type:y,onClick:h,children:g})]})]})}),document.body):null}}}]);