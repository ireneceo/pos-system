"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>q});var a=r(9950),i=r(4752),t=r(8409),s=r(2488),l=r(1367),o=r(6038),d=r(7617),c=r(5030),p=r(4414);const h=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,x=i.Ay.div`
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
`,g=i.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,u=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,b=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,y=i.Ay.div`
  text-align: center;
`,v=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,m=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,f=i.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,P=i.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,A=i.Ay.div`
  text-align: center;
`,F=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,k=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,C=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,w=i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,B=i.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,E=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,S=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,$=i.Ay.div`
  margin-bottom: 20px;
`,z=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,T=i.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,O=i.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,R=i.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,D=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,M=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,N=i.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,L=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,W=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,Y=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,J=i.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,U=i.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
`,H=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,K=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,Q=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,X={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},q=()=>{const{t:e}=(0,c.Bd)("brand"),{user:n}=(0,l.As)(),[r,i]=(0,a.useState)([]),[q,G]=(0,a.useState)(!0),V=(null===n||void 0===n?void 0:n.brand_id)||null,[Z,ee]=(0,a.useState)(""),[ne,re]=(0,a.useState)("all"),[ae,ie]=(0,a.useState)(""),[te,se]=(0,a.useState)({}),[le,oe]=(0,a.useState)([]),[de,ce]=(0,a.useState)(!1),[pe,he]=(0,a.useState)(!1),[xe,ge]=(0,a.useState)(!1),[ue,be]=(0,a.useState)(!1),[ye,ve]=(0,a.useState)(!1),[je,me]=(0,a.useState)(null),[fe,Pe]=(0,a.useState)({}),[_e,Ae]=(0,a.useState)([]),Fe={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[ke,Ce]=(0,a.useState)(Fe),[we,Be]=(0,a.useState)(Fe),[Ee,Se]=(0,a.useState)(!1),[$e,ze]=(0,a.useState)(null),Te=(0,a.useCallback)(async e=>{try{G(!0);const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();i(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{G(!1)}},[]);(0,a.useEffect)(()=>{V&&Te(V),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();se(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);oe(n),n.length>0&&ie(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),oe(["MYR","KRW"]),ie(e=>e||"MYR")}})()},[V,Te]);const Oe=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===ae);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},Re=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===ae);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},De=(e,n)=>Re(e)?(0,o.vv)(Oe(e,n),ae):"Not Set",Ie=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Me=e=>{me(e),V&&(async(e,n)=>{try{const i=localStorage.getItem("auth_token"),t=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(t.ok){const e=await t.json(),n=e.success?e.data:Array.isArray(e)?e:[],i={};for(const t of n){var r,a;i[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(a=t.annual_price)||void 0===a?void 0:a.toString())||"0"}}for(const r of le)i[r]||(i[r]={monthly:"0",annual:"0"});Pe(i)}}catch(i){console.error("Error fetching plan prices:",i)}})(V,e.id),be(!0)},Ne=e=>{me(e),V&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Ae(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(V),ve(!0)},Le=r.filter(e=>{const n=e.name.toLowerCase().includes(Z.toLowerCase())||(e.description||"").toLowerCase().includes(Z.toLowerCase()),r="all"===ne||"active"===ne&&e.is_active||"inactive"===ne&&!e.is_active;return n&&r}),We=r.filter(e=>e.is_active).length,Ye=r.reduce((e,n)=>e+Ie(n),0),Je=r.reduce((e,n)=>"fixed"===n.charge_type?e+Oe(n,"monthly")*Ie(n):e,0),Ue=(n,r)=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(J,{children:e("brand:brandPlansPage.chargeType")}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Charge Type *"}),(0,p.jsxs)(O,{value:n.charge_type,onChange:e=>r(n=>({...n,charge_type:e.target.value})),children:[(0,p.jsx)("option",{value:"fixed",children:e("brand:brandPlansPage.fixedAmountCurrencyPricing")}),(0,p.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===n.charge_type?(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.pricingByCurrency")}),(0,p.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[le.map(a=>{var i,t,s,l;const o=te[a];return(0,p.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===o||void 0===o?void 0:o.symbol)||a," ",a," - ",(null===o||void 0===o?void 0:o.name)||a]}),(0,p.jsxs)(D,{children:[(0,p.jsxs)($,{style:{marginBottom:0},children:[(0,p.jsx)(z,{style:{fontSize:"12px"},children:e("brand:brandPlansPage.monthly")}),(0,p.jsx)(T,{type:"number",placeholder:"0",value:(null===(i=n.currency_prices)||void 0===i||null===(t=i[a])||void 0===t?void 0:t.monthly)||"",onChange:e=>r(n=>{var r;return{...n,currency_prices:{...n.currency_prices,[a]:{...null===(r=n.currency_prices)||void 0===r?void 0:r[a],monthly:e.target.value}}}})})]}),(0,p.jsxs)($,{style:{marginBottom:0},children:[(0,p.jsx)(z,{style:{fontSize:"12px"},children:e("brand:brandPlansPage.annual")}),(0,p.jsx)(T,{type:"number",placeholder:"0",value:(null===(s=n.currency_prices)||void 0===s||null===(l=s[a])||void 0===l?void 0:l.annual)||"",onChange:e=>r(n=>{var r;return{...n,currency_prices:{...n.currency_prices,[a]:{...null===(r=n.currency_prices)||void 0===r?void 0:r[a],annual:e.target.value}}}})})]})]})]},a)}),0===le.length&&(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Revenue Percentage (%)"}),(0,p.jsx)(T,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:n.percentage_value,onChange:e=>r(n=>({...n,percentage_value:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.revenueBasePeriod")}),(0,p.jsxs)(O,{value:n.revenue_base,onChange:e=>r(n=>({...n,revenue_base:e.target.value})),children:[(0,p.jsx)("option",{value:"previous_month",children:e("brand:brandPlansPage.previousMonth")}),(0,p.jsx)("option",{value:"previous_year",children:e("brand:brandPlansPage.previousYear")}),(0,p.jsx)("option",{value:"up_to_billing_day",children:e("brand:brandPlansPage.upToBillingDay")})]})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.billingDay128")}),(0,p.jsx)(T,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:n.billing_day,onChange:e=>r(n=>({...n,billing_day:e.target.value}))}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(t.mc,{children:[(0,p.jsxs)(t.Y9,{children:[(0,p.jsx)(t.hE,{children:e("brand:brandPlansPage.brandPlans")}),(0,p.jsx)(t.ex,{children:(0,p.jsx)(t.$n,{variant:"primary",onClick:()=>{Ce({...Fe,currency_prices:{}}),ce(!0)},children:e("brand:brandPlansPage.createPlan")})})]}),(0,p.jsxs)(t.UC,{children:[(0,p.jsxs)(t.MD,{children:[(0,p.jsxs)(t.hI,{color:"#059669",children:[(0,p.jsx)(t.Os,{children:r.length}),(0,p.jsx)(t.v0,{children:e("brand:brandPlansPage.totalPlans")}),(0,p.jsxs)(t.d1,{children:[We," active"]})]}),(0,p.jsxs)(t.hI,{color:"#10B981",children:[(0,p.jsx)(t.Os,{children:We}),(0,p.jsx)(t.v0,{children:e("brand:brandPlansPage.activePlans")}),(0,p.jsxs)(t.d1,{children:[r.length>0?Math.round(We/r.length*100):0,"% available"]})]}),(0,p.jsxs)(t.hI,{color:"#F59E0B",children:[(0,p.jsx)(t.Os,{children:Ye}),(0,p.jsx)(t.v0,{children:e("brand:brandPlansPage.totalSubscriptions")}),(0,p.jsx)(t.d1,{children:e("brand:brandPlansPage.acrossAllPlans")})]}),(0,p.jsxs)(t.hI,{color:"#DC2626",children:[(0,p.jsx)(t.Os,{children:(0,o.vv)(Je,ae)}),(0,p.jsx)(t.v0,{children:e("brand:brandPlansPage.fixedMonthlyRevenue")}),(0,p.jsx)(t.d1,{children:e("brand:brandPlansPage.fromFixedtypePlans")})]})]}),(0,p.jsxs)(s.Qn,{children:[(0,p.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:Z,onChange:e=>ee(e.target.value)}),(0,p.jsxs)(s.Jt,{value:ne,onChange:e=>re(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("brand:brandPlansPage.allStatus")}),(0,p.jsx)("option",{value:"active",children:e("brand:brandPlansPage.active")}),(0,p.jsx)("option",{value:"inactive",children:e("brand:brandPlansPage.inactive")})]}),(0,p.jsx)(s.Jt,{value:ae,onChange:e=>ie(e.target.value),style:{minWidth:"150px"},children:le.map(e=>{const n=te[e];return(0,p.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),q?(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:e("brand:brandPlansPage.loadingPlans")}):0===Le.length?(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===r.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,p.jsx)(h,{children:Le.map(n=>(0,p.jsxs)(x,{isPopular:n.is_popular,isActive:n.is_active,children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(B,{chargeType:n.charge_type||"fixed",children:"percentage"===n.charge_type?"% Revenue":"Fixed"}),(0,p.jsx)(C,{isActive:n.is_active,children:n.is_active?"Active":"Inactive"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:n.name}),n.description&&(0,p.jsx)(b,{children:n.description}),(0,p.jsx)(y,{children:"percentage"===n.charge_type?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(v,{children:[parseFloat(n.percentage_value||"0"),"%"]}),(0,p.jsxs)(m,{children:["of revenue (",X[n.revenue_base]||n.revenue_base,")"]})]}):Re(n)?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(v,{children:[De(n,"monthly"),(0,p.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Oe(n,"annual")>0&&Oe(n,"monthly")>0&&(0,p.jsxs)(j,{children:[De(n,"annual"),"/year",12*Oe(n,"monthly")>Oe(n,"annual")&&(0,p.jsxs)("span",{children:[" (Save ",Math.round((12*Oe(n,"monthly")-Oe(n,"annual"))/(12*Oe(n,"monthly"))*100),"%)"]})]}),(0,p.jsx)(m,{children:e("brand:brandPlansPage.billedMonthlyOrAnnually")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{style:{color:"#F59E0B"},children:e("brand:brandPlansPage.priceNotSet")}),(0,p.jsxs)(m,{style:{color:"#F59E0B"},children:["Set ",ae,' price in "Prices"']})]})})]}),(0,p.jsxs)(U,{children:[(0,p.jsxs)(H,{children:[(0,p.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:e("brand:brandPlansPage.billingDay")}),(0,p.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:n.billing_day?`Every ${n.billing_day}${1===n.billing_day?"st":2===n.billing_day?"nd":3===n.billing_day?"rd":"th"}`:"Subscription Start"})]}),n.auto_generate&&(0,p.jsxs)(H,{style:{marginTop:4},children:[(0,p.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:e("brand:brandPlansPage.autoinvoice")}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:600},children:e("brand:brandPlansPage.enabled")})]})]}),Array.isArray(n.features)&&n.features.length>0&&(0,p.jsx)(f,{children:n.features.map((e,n)=>(0,p.jsx)(P,{children:e},n))}),(0,p.jsxs)(_,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:Ie(n)}),(0,p.jsx)(k,{children:e("brand:brandPlansPage.subscriptions")})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"fixed"===n.charge_type?(0,o.vv)(Oe(n,"monthly")*Ie(n),ae):`${parseFloat(n.percentage_value||"0")}% rev`}),(0,p.jsx)(k,{children:"fixed"===n.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(S,{variant:"primary",onClick:()=>(e=>{var n,r;me(e);let a={};if(e.prices)for(const s of e.prices){var i,t;a[s.currency]={monthly:(null===(i=s.monthly_price)||void 0===i?void 0:i.toString())||"0",annual:(null===(t=s.annual_price)||void 0===t?void 0:t.toString())||"0"}}Be({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:a,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),he(!0)})(n),children:e("brand:brandPlansPage.edit")}),"fixed"===n.charge_type&&(0,p.jsx)(S,{variant:"secondary",onClick:()=>Me(n),children:e("brand:brandPlansPage.prices")}),(0,p.jsx)(S,{variant:"secondary",onClick:()=>(e=>{me(e),ge(!0)})(n),children:e("brand:brandPlansPage.view")})]})]},n.id))}),de&&(0,p.jsxs)(t.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Create New Plan",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.$n,{variant:"secondary",onClick:()=>ce(!1),children:e("brand:brandPlansPage.cancel")}),(0,p.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(V)try{const e=localStorage.getItem("auth_token"),n={name:ke.name,description:ke.description||null,charge_type:ke.charge_type,billing_day:ke.billing_day?parseInt(ke.billing_day):null,auto_generate:ke.auto_generate,currency:"MYR",is_popular:ke.is_popular,is_active:ke.is_active,features:ke.features.split("\n").filter(e=>e.trim())};"percentage"===ke.charge_type?(n.percentage_value=parseFloat(ke.percentage_value)||0,n.revenue_base=ke.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(ke.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/brands/${V}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)ce(!1),Ce({...Fe,currency_prices:{}}),Te(V);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:e("brand:brandPlansPage.createPlan")})]}),children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Plan Name *"}),(0,p.jsx)(T,{type:"text",placeholder:"e.g., Royalty Fee, Monthly Rent, Management Fee",value:ke.name,onChange:e=>Ce(n=>({...n,name:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.description")}),(0,p.jsx)(R,{placeholder:"Enter plan description...",rows:3,value:ke.description,onChange:e=>Ce(n=>({...n,description:e.target.value}))})]}),Ue(ke,Ce),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.featuresOnePerLine")}),(0,p.jsx)(R,{placeholder:"Enter features, one per line...",rows:4,value:ke.features,onChange:e=>Ce(n=>({...n,features:e.target.value}))})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:ke.auto_generate,onChange:e=>Ce(n=>({...n,auto_generate:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-auto-generate",children:e("brand:brandPlansPage.autogenerateInvoices")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-popular",checked:ke.is_popular,onChange:e=>Ce(n=>({...n,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-popular",children:e("brand:brandPlansPage.markAsMostPopular")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"create-active",checked:ke.is_active,onChange:e=>Ce(n=>({...n,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"create-active",children:e("brand:brandPlansPage.setAsActive")})]})]})]}),pe&&je&&(0,p.jsxs)(t.aF,{isOpen:!0,onClose:()=>he(!1),title:`Edit Plan: ${je.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.$n,{variant:"secondary",onClick:()=>he(!1),children:e("brand:brandPlansPage.cancel")}),(0,p.jsx)(t.$n,{variant:"danger",onClick:()=>{return e=je.id,ze(e),void Se(!0);var e},children:e("brand:brandPlansPage.delete")}),(0,p.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(V&&je)try{const e=localStorage.getItem("auth_token"),n={name:we.name,description:we.description||null,charge_type:we.charge_type,billing_day:we.billing_day?parseInt(we.billing_day):null,auto_generate:we.auto_generate,is_popular:we.is_popular,is_active:we.is_active,features:we.features.split("\n").filter(e=>e.trim())};"percentage"===we.charge_type&&(n.percentage_value=parseFloat(we.percentage_value)||0,n.revenue_base=we.revenue_base);const r=await fetch(`/api/brands/${V}/plans/${je.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===we.charge_type&&Object.keys(we.currency_prices).length>0){const n=Object.fromEntries(Object.entries(we.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));await fetch(`/api/brands/${V}/plans/${je.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}he(!1),Te(V)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:e("brand:brandPlansPage.saveChanges")})]}),children:[(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:"Plan Name *"}),(0,p.jsx)(T,{type:"text",value:we.name,onChange:e=>Be(n=>({...n,name:e.target.value}))})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.description")}),(0,p.jsx)(R,{rows:3,value:we.description,onChange:e=>Be(n=>({...n,description:e.target.value}))})]}),Ue(we,Be),(0,p.jsxs)($,{children:[(0,p.jsx)(z,{children:e("brand:brandPlansPage.featuresOnePerLine")}),(0,p.jsx)(R,{rows:4,value:we.features,onChange:e=>Be(n=>({...n,features:e.target.value}))})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:we.auto_generate,onChange:e=>Be(n=>({...n,auto_generate:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-auto-generate",children:e("brand:brandPlansPage.autogenerateInvoices")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-popular",checked:we.is_popular,onChange:e=>Be(n=>({...n,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-popular",children:e("brand:brandPlansPage.markAsMostPopular")})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-active",checked:we.is_active,onChange:e=>Be(n=>({...n,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-active",children:e("brand:brandPlansPage.setAsActive")})]})]})]}),xe&&je&&(0,p.jsxs)(t.aF,{isOpen:!0,onClose:()=>ge(!1),title:`Plan Details: ${je.name}`,footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(t.$n,{variant:"secondary",onClick:()=>ge(!1),children:e("brand:brandPlansPage.close")})}),children:[(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("brand:brandPlansPage.planInfo")}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.planId")}),(0,p.jsx)(Y,{children:je.id})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.name")}),(0,p.jsx)(Y,{children:je.name})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.status")}),(0,p.jsx)(C,{isActive:je.is_active,children:je.is_active?"Active":"Inactive"})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.chargeType")}),(0,p.jsx)(B,{chargeType:je.charge_type||"fixed",children:"percentage"===je.charge_type?"% Revenue":"Fixed"})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.popularPlan")}),(0,p.jsx)(Y,{children:je.is_popular?"Yes":"No"})]})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("brand:brandPlansPage.billing")}),"percentage"===je.charge_type?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.revenuePercentage")}),(0,p.jsxs)(Y,{children:[parseFloat(je.percentage_value||"0"),"%"]})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.revenueBase")}),(0,p.jsx)(Y,{children:X[je.revenue_base]||je.revenue_base})]})]}):(0,p.jsx)(p.Fragment,{children:le.map(n=>{var r,a;const i=null===(r=je.prices)||void 0===r?void 0:r.find(e=>e.currency===n);if(!i)return null;const t=parseFloat(i.monthly_price)||0,s=parseFloat(i.annual_price)||0;return 0===t&&0===s?null:(0,p.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(a=te[n])||void 0===a?void 0:a.symbol)||n," ",n]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.monthly")}),(0,p.jsx)(Y,{children:(0,o.vv)(t,n)})]}),s>0&&(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.annual")}),(0,p.jsx)(Y,{children:(0,o.vv)(s,n)})]})]},n)})}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.billingDay")}),(0,p.jsx)(Y,{children:je.billing_day?`Every ${je.billing_day}th`:"Subscription Start Date"})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.autogenerateInvoices")}),(0,p.jsx)(Y,{children:je.auto_generate?"Yes":"No"})]})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("brand:brandPlansPage.statistics")}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.currentSubscriptions")}),(0,p.jsx)(Y,{children:Ie(je)})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(W,{children:e("brand:brandPlansPage.createdDate")}),(0,p.jsx)(Y,{children:new Date(je.createdAt).toLocaleDateString()})]})]}),Array.isArray(je.features)&&je.features.length>0&&(0,p.jsxs)(N,{children:[(0,p.jsx)("h4",{children:e("brand:brandPlansPage.features")}),(0,p.jsx)(f,{children:je.features.map((e,n)=>(0,p.jsx)(P,{children:e},n))})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)("h4",{children:["Assigned Restaurants (",Ie(je),")"]}),je.planRestaurants&&je.planRestaurants.length>0?(0,p.jsx)(K,{children:je.planRestaurants.map(e=>{var n;return(0,p.jsxs)(Q,{isAssigned:!0,children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,p.jsx)(C,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:e("brand:brandPlansPage.noRestaurantsAssignedToThisPlan")}),(0,p.jsx)(t.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ne(je),children:"Manage Restaurant Assignments"})]})]}),ue&&je&&(0,p.jsxs)(t.aF,{isOpen:!0,onClose:()=>be(!1),title:`Set Prices for ${je.name}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.$n,{variant:"secondary",onClick:()=>be(!1),children:e("brand:brandPlansPage.cancel")}),(0,p.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(V&&je)try{const e=localStorage.getItem("auth_token"),n=Object.fromEntries(Object.entries(fe).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));(await fetch(`/api/brands/${V}/plans/${je.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(be(!1),Te(V))}catch(e){console.error("Error saving plan prices:",e)}},children:e("brand:brandPlansPage.savePrices")})]}),children:[(0,p.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,p.jsx)("div",{style:{display:"grid",gap:"16px"},children:le.map(n=>{var r,a;const i=te[n];return(0,p.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||n}),(null===i||void 0===i?void 0:i.name)||n," (",n,")"]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("brand:brandPlansPage.monthlyPrice")}),(0,p.jsx)("input",{type:"number",value:(null===(r=fe[n])||void 0===r?void 0:r.monthly)||"",onChange:e=>Pe({...fe,[n]:{...fe[n],monthly:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("brand:brandPlansPage.annualPrice")}),(0,p.jsx)("input",{type:"number",value:(null===(a=fe[n])||void 0===a?void 0:a.annual)||"",onChange:e=>Pe({...fe,[n]:{...fe[n],annual:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},n)})})]}),ye&&je&&(0,p.jsxs)(t.aF,{isOpen:!0,onClose:()=>ve(!1),title:`Manage Restaurants: ${je.name}`,footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(t.$n,{variant:"secondary",onClick:()=>ve(!1),children:e("brand:brandPlansPage.close")})}),children:[(0,p.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,p.jsxs)(K,{children:[_e.map(n=>{var r;const a=null===(r=je.planRestaurants)||void 0===r?void 0:r.some(e=>e.restaurant_id===n.id&&e.is_active);return(0,p.jsxs)(Q,{isAssigned:a,children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:n.name}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.address||"No address"})]}),a?(0,p.jsx)(t.$n,{variant:"danger-outline",onClick:()=>(async e=>{if(V&&je)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${V}/plans/${je.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){Te(V);const e=await fetch(`/api/brands/${V}/plans/${je.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(n.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("brand:brandPlansPage.remove")}):(0,p.jsx)(t.$n,{variant:"primary",onClick:()=>(async e=>{if(V&&je)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${V}/plans/${je.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_ids:[e]})})).ok){Te(V);const e=await fetch(`/api/brands/${V}/plans/${je.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();me(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(n.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("brand:brandPlansPage.assign")})]},n.id)}),0===_e.length&&(0,p.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:e("brand:brandPlansPage.noRestaurantsFound")})]})]})]})]}),(0,p.jsx)(d.A,{isOpen:Ee,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(V&&$e){Se(!1);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/brands/${V}/plans/${$e}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(he(!1),Te(V))}catch(e){console.error("Error deleting plan:",e)}ze(null)}},onCancel:()=>{Se(!1),ze(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var a=r(7119),i=r(4752),t=r(9610),s=r(4414);const l=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,h=i.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:g,confirmText:u="Confirm",cancelText:b="Cancel",type:y="warning"}=e;return n?a.createPortal((0,s.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,s.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(o,{children:[(0,s.jsx)(d,{children:r}),(0,s.jsx)(c,{children:i})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:g,children:b}),(0,s.jsx)(h,{variant:"primary",type:y,onClick:x,children:u})]})]})}),document.body):null}}}]);