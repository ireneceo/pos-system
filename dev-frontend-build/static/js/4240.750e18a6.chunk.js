"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>G});var a=r(9950),i=r(4752),t=r(8409),s=r(2488),l=r(1367),o=r(6038),d=r(7617),c=r(5030),p=r(9955),h=r(4414);const x=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,g=i.Ay.div`
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
`,u=i.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,b=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,y=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,v=i.Ay.div`
  text-align: center;
`,j=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,m=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,f=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,P=i.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,_=i.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,F=i.Ay.div`
  text-align: center;
`,C=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,w=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,k=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,B=i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,E=i.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,$=i.Ay.div`
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
`,z=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,O=i.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,R=i.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,D=i.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,M=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,N=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,L=i.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,W=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,Y=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,J=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,U=i.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,H=i.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
`,K=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,Q=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,X=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,q={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},G=()=>{const{t:e}=(0,c.Bd)("brand"),{user:n}=(0,l.As)(),[r,i]=(0,a.useState)([]),[G,V]=(0,a.useState)(!0),Z=(null===n||void 0===n?void 0:n.brand_id)||null,[ee,ne]=(0,a.useState)(""),[re,ae]=(0,a.useState)("all"),[ie,te]=(0,a.useState)(""),[se,le]=(0,a.useState)({}),[oe,de]=(0,a.useState)([]),[ce,pe]=(0,a.useState)(!1),[he,xe]=(0,a.useState)(!1),[ge,ue]=(0,a.useState)(!1),[be,ye]=(0,a.useState)(!1),[ve,je]=(0,a.useState)(!1),[me,fe]=(0,a.useState)(null),[Pe,_e]=(0,a.useState)({}),[Ae,Fe]=(0,a.useState)([]),Ce={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[we,ke]=(0,a.useState)(Ce),[Be,Ee]=(0,a.useState)(Ce),[$e,Se]=(0,a.useState)(!1),[ze,Te]=(0,a.useState)(null),Oe=(0,a.useCallback)(async e=>{try{V(!0);const n=(0,p.c4)(),r=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();i(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{V(!1)}},[]);(0,a.useEffect)(()=>{Z&&Oe(Z),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();le(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);de(n),n.length>0&&te(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),de(["MYR","KRW"]),te(e=>e||"MYR")}})()},[Z,Oe]);const Re=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===ie);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},De=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===ie);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Me=(e,n)=>De(e)?(0,o.vv)(Re(e,n),ie):"Not Set",Ie=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Ne=e=>{fe(e),Z&&(async(e,n)=>{try{const i=(0,p.c4)(),t=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(t.ok){const e=await t.json(),n=e.success?e.data:Array.isArray(e)?e:[],i={};for(const t of n){var r,a;i[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(a=t.annual_price)||void 0===a?void 0:a.toString())||"0"}}for(const r of oe)i[r]||(i[r]={monthly:"0",annual:"0"});_e(i)}}catch(i){console.error("Error fetching plan prices:",i)}})(Z,e.id),ye(!0)},Le=e=>{fe(e),Z&&(async e=>{try{const n=(0,p.c4)(),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Fe(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(Z),je(!0)},We=r.filter(e=>{const n=e.name.toLowerCase().includes(ee.toLowerCase())||(e.description||"").toLowerCase().includes(ee.toLowerCase()),r="all"===re||"active"===re&&e.is_active||"inactive"===re&&!e.is_active;return n&&r}),Ye=r.filter(e=>e.is_active).length,Je=r.reduce((e,n)=>e+Ie(n),0),Ue=r.reduce((e,n)=>"fixed"===n.charge_type?e+Re(n,"monthly")*Ie(n):e,0),He=(n,r)=>(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(U,{children:e("brand:brandPlansPage.chargeType")}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:"Charge Type *"}),(0,h.jsxs)(R,{value:n.charge_type,onChange:e=>r(n=>({...n,charge_type:e.target.value})),children:[(0,h.jsx)("option",{value:"fixed",children:e("brand:brandPlansPage.fixedAmountCurrencyPricing")}),(0,h.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===n.charge_type?(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.pricingByCurrency")}),(0,h.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[oe.map(a=>{var i,t,s,l;const o=se[a];return(0,h.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,h.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===o||void 0===o?void 0:o.symbol)||a," ",a," - ",(null===o||void 0===o?void 0:o.name)||a]}),(0,h.jsxs)(M,{children:[(0,h.jsxs)(z,{style:{marginBottom:0},children:[(0,h.jsx)(T,{style:{fontSize:"12px"},children:e("brand:brandPlansPage.monthly")}),(0,h.jsx)(O,{type:"number",placeholder:"0",value:(null===(i=n.currency_prices)||void 0===i||null===(t=i[a])||void 0===t?void 0:t.monthly)||"",onChange:e=>r(n=>{var r;return{...n,currency_prices:{...n.currency_prices,[a]:{...null===(r=n.currency_prices)||void 0===r?void 0:r[a],monthly:e.target.value}}}})})]}),(0,h.jsxs)(z,{style:{marginBottom:0},children:[(0,h.jsx)(T,{style:{fontSize:"12px"},children:e("brand:brandPlansPage.annual")}),(0,h.jsx)(O,{type:"number",placeholder:"0",value:(null===(s=n.currency_prices)||void 0===s||null===(l=s[a])||void 0===l?void 0:l.annual)||"",onChange:e=>r(n=>{var r;return{...n,currency_prices:{...n.currency_prices,[a]:{...null===(r=n.currency_prices)||void 0===r?void 0:r[a],annual:e.target.value}}}})})]})]})]},a)}),0===oe.length&&(0,h.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:"Revenue Percentage (%)"}),(0,h.jsx)(O,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:n.percentage_value,onChange:e=>r(n=>({...n,percentage_value:e.target.value}))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.revenueBasePeriod")}),(0,h.jsxs)(R,{value:n.revenue_base,onChange:e=>r(n=>({...n,revenue_base:e.target.value})),children:[(0,h.jsx)("option",{value:"previous_month",children:e("brand:brandPlansPage.previousMonth")}),(0,h.jsx)("option",{value:"previous_year",children:e("brand:brandPlansPage.previousYear")}),(0,h.jsx)("option",{value:"up_to_billing_day",children:e("brand:brandPlansPage.upToBillingDay")})]})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.billingDay128")}),(0,h.jsx)(O,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:n.billing_day,onChange:e=>r(n=>({...n,billing_day:e.target.value}))}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(t.mc,{children:[(0,h.jsxs)(t.Y9,{children:[(0,h.jsx)(t.hE,{children:e("brand:brandPlansPage.brandPlans")}),(0,h.jsx)(t.ex,{children:(0,h.jsx)(t.$n,{variant:"primary",onClick:()=>{ke({...Ce,currency_prices:{}}),pe(!0)},children:e("brand:brandPlansPage.createPlan")})})]}),(0,h.jsxs)(t.UC,{children:[(0,h.jsxs)(t.MD,{children:[(0,h.jsxs)(t.hI,{color:"#059669",children:[(0,h.jsx)(t.Os,{children:r.length}),(0,h.jsx)(t.v0,{children:e("brand:brandPlansPage.totalPlans")}),(0,h.jsxs)(t.d1,{children:[Ye," active"]})]}),(0,h.jsxs)(t.hI,{color:"#10B981",children:[(0,h.jsx)(t.Os,{children:Ye}),(0,h.jsx)(t.v0,{children:e("brand:brandPlansPage.activePlans")}),(0,h.jsxs)(t.d1,{children:[r.length>0?Math.round(Ye/r.length*100):0,"% available"]})]}),(0,h.jsxs)(t.hI,{color:"#F59E0B",children:[(0,h.jsx)(t.Os,{children:Je}),(0,h.jsx)(t.v0,{children:e("brand:brandPlansPage.totalSubscriptions")}),(0,h.jsx)(t.d1,{children:e("brand:brandPlansPage.acrossAllPlans")})]}),(0,h.jsxs)(t.hI,{color:"#DC2626",children:[(0,h.jsx)(t.Os,{children:(0,o.vv)(Ue,ie)}),(0,h.jsx)(t.v0,{children:e("brand:brandPlansPage.fixedMonthlyRevenue")}),(0,h.jsx)(t.d1,{children:e("brand:brandPlansPage.fromFixedtypePlans")})]})]}),(0,h.jsxs)(s.Qn,{children:[(0,h.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:ee,onChange:e=>ne(e.target.value)}),(0,h.jsxs)(s.Jt,{value:re,onChange:e=>ae(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("brand:brandPlansPage.allStatus")}),(0,h.jsx)("option",{value:"active",children:e("brand:brandPlansPage.active")}),(0,h.jsx)("option",{value:"inactive",children:e("brand:brandPlansPage.inactive")})]}),(0,h.jsx)(s.Jt,{value:ie,onChange:e=>te(e.target.value),style:{minWidth:"150px"},children:oe.map(e=>{const n=se[e];return(0,h.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),G?(0,h.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:e("brand:brandPlansPage.loadingPlans")}):0===We.length?(0,h.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===r.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,h.jsx)(x,{children:We.map(n=>(0,h.jsxs)(g,{isPopular:n.is_popular,isActive:n.is_active,children:[(0,h.jsxs)(B,{children:[(0,h.jsx)(E,{chargeType:n.charge_type||"fixed",children:"percentage"===n.charge_type?"% Revenue":"Fixed"}),(0,h.jsx)(k,{isActive:n.is_active,children:n.is_active?"Active":"Inactive"})]}),(0,h.jsxs)(u,{children:[(0,h.jsx)(b,{children:n.name}),n.description&&(0,h.jsx)(y,{children:n.description}),(0,h.jsx)(v,{children:"percentage"===n.charge_type?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[parseFloat(n.percentage_value||"0"),"%"]}),(0,h.jsxs)(f,{children:["of revenue (",q[n.revenue_base]||n.revenue_base,")"]})]}):De(n)?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(j,{children:[Me(n,"monthly"),(0,h.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Re(n,"annual")>0&&Re(n,"monthly")>0&&(0,h.jsxs)(m,{children:[Me(n,"annual"),"/year",12*Re(n,"monthly")>Re(n,"annual")&&(0,h.jsxs)("span",{children:[" (Save ",Math.round((12*Re(n,"monthly")-Re(n,"annual"))/(12*Re(n,"monthly"))*100),"%)"]})]}),(0,h.jsx)(f,{children:e("brand:brandPlansPage.billedMonthlyOrAnnually")})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(j,{style:{color:"#F59E0B"},children:e("brand:brandPlansPage.priceNotSet")}),(0,h.jsxs)(f,{style:{color:"#F59E0B"},children:["Set ",ie,' price in "Prices"']})]})})]}),(0,h.jsxs)(H,{children:[(0,h.jsxs)(K,{children:[(0,h.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:e("brand:brandPlansPage.billingDay")}),(0,h.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:n.billing_day?`Every ${n.billing_day}${1===n.billing_day?"st":2===n.billing_day?"nd":3===n.billing_day?"rd":"th"}`:"Subscription Start"})]}),n.auto_generate&&(0,h.jsxs)(K,{style:{marginTop:4},children:[(0,h.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:e("brand:brandPlansPage.autoinvoice")}),(0,h.jsx)("span",{style:{color:"#059669",fontWeight:600},children:e("brand:brandPlansPage.enabled")})]})]}),Array.isArray(n.features)&&n.features.length>0&&(0,h.jsx)(P,{children:n.features.map((e,n)=>(0,h.jsx)(_,{children:e},n))}),(0,h.jsxs)(A,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(C,{children:Ie(n)}),(0,h.jsx)(w,{children:e("brand:brandPlansPage.subscriptions")})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)(C,{children:"fixed"===n.charge_type?(0,o.vv)(Re(n,"monthly")*Ie(n),ie):`${parseFloat(n.percentage_value||"0")}% rev`}),(0,h.jsx)(w,{children:"fixed"===n.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,h.jsxs)($,{children:[(0,h.jsx)(S,{variant:"primary",onClick:()=>(e=>{var n,r;fe(e);let a={};if(e.prices)for(const s of e.prices){var i,t;a[s.currency]={monthly:(null===(i=s.monthly_price)||void 0===i?void 0:i.toString())||"0",annual:(null===(t=s.annual_price)||void 0===t?void 0:t.toString())||"0"}}Ee({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:a,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),xe(!0)})(n),children:e("brand:brandPlansPage.edit")}),"fixed"===n.charge_type&&(0,h.jsx)(S,{variant:"secondary",onClick:()=>Ne(n),children:e("brand:brandPlansPage.prices")}),(0,h.jsx)(S,{variant:"secondary",onClick:()=>(e=>{fe(e),ue(!0)})(n),children:e("brand:brandPlansPage.view")})]})]},n.id))}),ce&&(0,h.jsxs)(t.aF,{isOpen:!0,onClose:()=>pe(!1),title:"Create New Plan",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.$n,{variant:"secondary",onClick:()=>pe(!1),children:e("brand:brandPlansPage.cancel")}),(0,h.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(Z)try{const e=(0,p.c4)(),n={name:we.name,description:we.description||null,charge_type:we.charge_type,billing_day:we.billing_day?parseInt(we.billing_day):null,auto_generate:we.auto_generate,currency:"MYR",is_popular:we.is_popular,is_active:we.is_active,features:we.features.split("\n").filter(e=>e.trim())};"percentage"===we.charge_type?(n.percentage_value=parseFloat(we.percentage_value)||0,n.revenue_base=we.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(we.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/brands/${Z}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)pe(!1),ke({...Ce,currency_prices:{}}),Oe(Z);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:e("brand:brandPlansPage.createPlan")})]}),children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:"Plan Name *"}),(0,h.jsx)(O,{type:"text",placeholder:"e.g., Royalty Fee, Monthly Rent, Management Fee",value:we.name,onChange:e=>ke(n=>({...n,name:e.target.value}))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.description")}),(0,h.jsx)(D,{placeholder:"Enter plan description...",rows:3,value:we.description,onChange:e=>ke(n=>({...n,description:e.target.value}))})]}),He(we,ke),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.featuresOnePerLine")}),(0,h.jsx)(D,{placeholder:"Enter features, one per line...",rows:4,value:we.features,onChange:e=>ke(n=>({...n,features:e.target.value}))})]}),(0,h.jsxs)(I,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:we.auto_generate,onChange:e=>ke(n=>({...n,auto_generate:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"create-auto-generate",children:e("brand:brandPlansPage.autogenerateInvoices")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"create-popular",checked:we.is_popular,onChange:e=>ke(n=>({...n,is_popular:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"create-popular",children:e("brand:brandPlansPage.markAsMostPopular")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"create-active",checked:we.is_active,onChange:e=>ke(n=>({...n,is_active:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"create-active",children:e("brand:brandPlansPage.setAsActive")})]})]})]}),he&&me&&(0,h.jsxs)(t.aF,{isOpen:!0,onClose:()=>xe(!1),title:`Edit Plan: ${me.name}`,footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.$n,{variant:"secondary",onClick:()=>xe(!1),children:e("brand:brandPlansPage.cancel")}),(0,h.jsx)(t.$n,{variant:"danger",onClick:()=>{return e=me.id,Te(e),void Se(!0);var e},children:e("brand:brandPlansPage.delete")}),(0,h.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(Z&&me)try{const e=(0,p.c4)(),n={name:Be.name,description:Be.description||null,charge_type:Be.charge_type,billing_day:Be.billing_day?parseInt(Be.billing_day):null,auto_generate:Be.auto_generate,is_popular:Be.is_popular,is_active:Be.is_active,features:Be.features.split("\n").filter(e=>e.trim())};"percentage"===Be.charge_type&&(n.percentage_value=parseFloat(Be.percentage_value)||0,n.revenue_base=Be.revenue_base);const r=await fetch(`/api/brands/${Z}/plans/${me.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===Be.charge_type&&Object.keys(Be.currency_prices).length>0){const n=Object.fromEntries(Object.entries(Be.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));await fetch(`/api/brands/${Z}/plans/${me.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}xe(!1),Oe(Z)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:e("brand:brandPlansPage.saveChanges")})]}),children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:"Plan Name *"}),(0,h.jsx)(O,{type:"text",value:Be.name,onChange:e=>Ee(n=>({...n,name:e.target.value}))})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.description")}),(0,h.jsx)(D,{rows:3,value:Be.description,onChange:e=>Ee(n=>({...n,description:e.target.value}))})]}),He(Be,Ee),(0,h.jsxs)(z,{children:[(0,h.jsx)(T,{children:e("brand:brandPlansPage.featuresOnePerLine")}),(0,h.jsx)(D,{rows:4,value:Be.features,onChange:e=>Ee(n=>({...n,features:e.target.value}))})]}),(0,h.jsxs)(I,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:Be.auto_generate,onChange:e=>Ee(n=>({...n,auto_generate:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"edit-auto-generate",children:e("brand:brandPlansPage.autogenerateInvoices")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Be.is_popular,onChange:e=>Ee(n=>({...n,is_popular:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"edit-popular",children:e("brand:brandPlansPage.markAsMostPopular")})]}),(0,h.jsxs)(N,{children:[(0,h.jsx)("input",{type:"checkbox",id:"edit-active",checked:Be.is_active,onChange:e=>Ee(n=>({...n,is_active:e.target.checked}))}),(0,h.jsx)("label",{htmlFor:"edit-active",children:e("brand:brandPlansPage.setAsActive")})]})]})]}),ge&&me&&(0,h.jsxs)(t.aF,{isOpen:!0,onClose:()=>ue(!1),title:`Plan Details: ${me.name}`,footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(t.$n,{variant:"secondary",onClick:()=>ue(!1),children:e("brand:brandPlansPage.close")})}),children:[(0,h.jsxs)(L,{children:[(0,h.jsx)("h4",{children:e("brand:brandPlansPage.planInfo")}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.planId")}),(0,h.jsx)(J,{children:me.id})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.name")}),(0,h.jsx)(J,{children:me.name})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.status")}),(0,h.jsx)(k,{isActive:me.is_active,children:me.is_active?"Active":"Inactive"})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.chargeType")}),(0,h.jsx)(E,{chargeType:me.charge_type||"fixed",children:"percentage"===me.charge_type?"% Revenue":"Fixed"})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.popularPlan")}),(0,h.jsx)(J,{children:me.is_popular?"Yes":"No"})]})]}),(0,h.jsxs)(L,{children:[(0,h.jsx)("h4",{children:e("brand:brandPlansPage.billing")}),"percentage"===me.charge_type?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.revenuePercentage")}),(0,h.jsxs)(J,{children:[parseFloat(me.percentage_value||"0"),"%"]})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.revenueBase")}),(0,h.jsx)(J,{children:q[me.revenue_base]||me.revenue_base})]})]}):(0,h.jsx)(h.Fragment,{children:oe.map(n=>{var r,a;const i=null===(r=me.prices)||void 0===r?void 0:r.find(e=>e.currency===n);if(!i)return null;const t=parseFloat(i.monthly_price)||0,s=parseFloat(i.annual_price)||0;return 0===t&&0===s?null:(0,h.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,h.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(a=se[n])||void 0===a?void 0:a.symbol)||n," ",n]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.monthly")}),(0,h.jsx)(J,{children:(0,o.vv)(t,n)})]}),s>0&&(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.annual")}),(0,h.jsx)(J,{children:(0,o.vv)(s,n)})]})]},n)})}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.billingDay")}),(0,h.jsx)(J,{children:me.billing_day?`Every ${me.billing_day}th`:"Subscription Start Date"})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.autogenerateInvoices")}),(0,h.jsx)(J,{children:me.auto_generate?"Yes":"No"})]})]}),(0,h.jsxs)(L,{children:[(0,h.jsx)("h4",{children:e("brand:brandPlansPage.statistics")}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.currentSubscriptions")}),(0,h.jsx)(J,{children:Ie(me)})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(Y,{children:e("brand:brandPlansPage.createdDate")}),(0,h.jsx)(J,{children:new Date(me.createdAt).toLocaleDateString()})]})]}),Array.isArray(me.features)&&me.features.length>0&&(0,h.jsxs)(L,{children:[(0,h.jsx)("h4",{children:e("brand:brandPlansPage.features")}),(0,h.jsx)(P,{children:me.features.map((e,n)=>(0,h.jsx)(_,{children:e},n))})]}),(0,h.jsxs)(L,{children:[(0,h.jsxs)("h4",{children:["Assigned Restaurants (",Ie(me),")"]}),me.planRestaurants&&me.planRestaurants.length>0?(0,h.jsx)(Q,{children:me.planRestaurants.map(e=>{var n;return(0,h.jsxs)(X,{isAssigned:!0,children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,h.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,h.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:e("brand:brandPlansPage.noRestaurantsAssignedToThisPlan")}),(0,h.jsx)(t.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Le(me),children:"Manage Restaurant Assignments"})]})]}),be&&me&&(0,h.jsxs)(t.aF,{isOpen:!0,onClose:()=>ye(!1),title:`Set Prices for ${me.name}`,footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.$n,{variant:"secondary",onClick:()=>ye(!1),children:e("brand:brandPlansPage.cancel")}),(0,h.jsx)(t.$n,{variant:"primary",onClick:async()=>{if(Z&&me)try{const e=(0,p.c4)(),n=Object.fromEntries(Object.entries(Pe).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));(await fetch(`/api/brands/${Z}/plans/${me.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(ye(!1),Oe(Z))}catch(e){console.error("Error saving plan prices:",e)}},children:e("brand:brandPlansPage.savePrices")})]}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,h.jsx)("div",{style:{display:"grid",gap:"16px"},children:oe.map(n=>{var r,a;const i=se[n];return(0,h.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,h.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||n}),(null===i||void 0===i?void 0:i.name)||n," (",n,")"]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("brand:brandPlansPage.monthlyPrice")}),(0,h.jsx)("input",{type:"number",value:(null===(r=Pe[n])||void 0===r?void 0:r.monthly)||"",onChange:e=>_e({...Pe,[n]:{...Pe[n],monthly:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:e("brand:brandPlansPage.annualPrice")}),(0,h.jsx)("input",{type:"number",value:(null===(a=Pe[n])||void 0===a?void 0:a.annual)||"",onChange:e=>_e({...Pe,[n]:{...Pe[n],annual:e.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},n)})})]}),ve&&me&&(0,h.jsxs)(t.aF,{isOpen:!0,onClose:()=>je(!1),title:`Manage Restaurants: ${me.name}`,footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(t.$n,{variant:"secondary",onClick:()=>je(!1),children:e("brand:brandPlansPage.close")})}),children:[(0,h.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,h.jsxs)(Q,{children:[Ae.map(n=>{var r;const a=null===(r=me.planRestaurants)||void 0===r?void 0:r.some(e=>e.restaurant_id===n.id&&e.is_active);return(0,h.jsxs)(X,{isAssigned:a,children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:n.name}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.address||"No address"})]}),a?(0,h.jsx)(t.$n,{variant:"danger-outline",onClick:()=>(async e=>{if(Z&&me)try{const n=(0,p.c4)();if((await fetch(`/api/brands/${Z}/plans/${me.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){Oe(Z);const e=await fetch(`/api/brands/${Z}/plans/${me.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();fe(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(n.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("brand:brandPlansPage.remove")}):(0,h.jsx)(t.$n,{variant:"primary",onClick:()=>(async e=>{if(Z&&me)try{const n=(0,p.c4)();if((await fetch(`/api/brands/${Z}/plans/${me.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_ids:[e]})})).ok){Oe(Z);const e=await fetch(`/api/brands/${Z}/plans/${me.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();fe(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(n.id),style:{padding:"6px 12px",fontSize:"12px"},children:e("brand:brandPlansPage.assign")})]},n.id)}),0===Ae.length&&(0,h.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:e("brand:brandPlansPage.noRestaurantsFound")})]})]})]})]}),(0,h.jsx)(d.A,{isOpen:$e,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(Z&&ze){Se(!1);try{const e=(0,p.c4)();(await fetch(`/api/brands/${Z}/plans/${ze}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(xe(!1),Oe(Z))}catch(e){console.error("Error deleting plan:",e)}Te(null)}},onCancel:()=>{Se(!1),Te(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var a=r(7119),i=r(4752),t=r(9610),s=r(4414);const l=i.Ay.div`
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