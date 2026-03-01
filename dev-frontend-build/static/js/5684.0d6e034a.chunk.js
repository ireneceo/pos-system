"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{2488:(e,n,r)=>{r.d(n,{DO:()=>d,Jt:()=>p,Qn:()=>c});var i=r(8819),t=(r(9950),r(4752)),a=r(4414);const s=t.Ay.div`
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
`,o=t.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,l=t.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,c=e=>{let{children:n,className:r,style:i,...t}=e;return(0,a.jsx)(s,{className:r,style:i,...t,children:n})},d=e=>{let{placeholder:n="Search...",...r}=e;return(0,a.jsx)(o,{placeholder:n,...r})},p=e=>{let{children:n,...r}=e;return(0,a.jsx)(l,{...r,children:n})}},5684:(e,n,r)=>{r.r(n),r.d(n,{default:()=>W});var i=r(8819),t=r(9950),a=r(4752),s=r(2674),o=r(2488),l=r(1367),c=r(6038),d=r(4414);const p=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,h=a.Ay.div`
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
`,x=a.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,u=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${i.w.colors.secondary};
  margin-bottom: 8px;
`,g=a.Ay.p`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  margin-bottom: 24px;
`,y=a.Ay.div`
  text-align: center;
`,j=a.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: ${i.w.colors.secondary};
  margin-bottom: 4px;
`,v=a.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,m=a.Ay.div`
  font-size: 12px;
  color: ${i.w.colors.text.muted};
`,f=a.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,b=a.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,_=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid ${i.w.colors.border};
  border-bottom: 1px solid #E6EBF1;
`,w=a.Ay.div`
  text-align: center;
`,A=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,k=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,F=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,C=a.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,$=a.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,S=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,E=a.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?`\n    background: ${i.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":`\n    background: transparent;\n    color: ${i.w.colors.text.muted};\n    border-color: ${i.w.colors.border};\n    &:hover { background: #F8FAFC; color: ${i.w.colors.secondary}; }\n  `}
`,B=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,z=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,P=a.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: ${i.w.colors.secondary}; cursor: pointer; }
`,R=a.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: ${i.w.colors.secondary}; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid ${i.w.colors.border}; }
`,T=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,D=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,I=a.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,M=a.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,N=a.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #EFF6FF;
  border-radius: 8px;
  border: 1px solid #BFDBFE;
`,O=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,L=a.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,J=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,Q={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},W=()=>{const{user:e}=(0,l.As)(),[n,r]=(0,t.useState)([]),[i,a]=(0,t.useState)(!0),W=(null===e||void 0===e?void 0:e.foodcourt_id)||null,[Y,U]=(0,t.useState)(""),[H,Z]=(0,t.useState)("all"),[X,V]=(0,t.useState)("MYR"),[q,G]=(0,t.useState)({}),[K,ee]=(0,t.useState)([]),[ne,re]=(0,t.useState)(!1),[ie,te]=(0,t.useState)(!1),[ae,se]=(0,t.useState)(!1),[oe,le]=(0,t.useState)(!1),[ce,de]=(0,t.useState)(!1),[pe,he]=(0,t.useState)(null),[xe,ue]=(0,t.useState)({}),[ge,ye]=(0,t.useState)([]),je={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[ve,me]=(0,t.useState)(je),[fe,be]=(0,t.useState)(je),_e=(0,t.useCallback)(async e=>{try{a(!0);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{a(!1)}},[]);(0,t.useEffect)(()=>{W&&_e(W),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();G(n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=await e.json();ee((n.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),ee(["MYR"])}})()},[W,_e]);const we=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===X);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},Ae=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===X);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},ke=(e,n)=>Ae(e)?(0,c.vv)(we(e,n),X):"Not Set",Fe=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Ce=e=>{he(e),W&&(async(e,n)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of n){var r,i;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=a.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of K)t[r]||(t[r]={monthly:"0",annual:"0"});ue(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(W,e.id),le(!0)},$e=e=>{he(e),W&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();ye(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching foodcourt restaurants:",n)}})(W),de(!0)},Se=n.filter(e=>{const n=e.name.toLowerCase().includes(Y.toLowerCase())||(e.description||"").toLowerCase().includes(Y.toLowerCase()),r="all"===H||"active"===H&&e.is_active||"inactive"===H&&!e.is_active;return n&&r}),Ee=n.filter(e=>e.is_active).length,Be=n.reduce((e,n)=>e+Fe(n),0),ze=n.reduce((e,n)=>"fixed"===n.charge_type?e+we(n,"monthly")*Fe(n):e,0),Pe=(e,n)=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(M,{children:"Charge Type"}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Charge Type *"}),(0,d.jsxs)(s.FX,{value:e.charge_type,onChange:e=>n(n=>({...n,charge_type:e.target.value})),children:[(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (Currency Pricing)"}),(0,d.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===e.charge_type?(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Pricing by Currency"}),(0,d.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[K.map(r=>{var i,t,a,o;const l=q[r];return(0,d.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===l||void 0===l?void 0:l.symbol)||r," ",r," - ",(null===l||void 0===l?void 0:l.name)||r]}),(0,d.jsxs)(B,{children:[(0,d.jsxs)(s.gE,{style:{marginBottom:0},children:[(0,d.jsx)(s.lR,{style:{fontSize:"12px"},children:"Monthly"}),(0,d.jsx)(s.ZQ,{type:"number",placeholder:"0",value:(null===(i=e.currency_prices)||void 0===i||null===(t=i[r])||void 0===t?void 0:t.monthly)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],monthly:e.target.value}}}})})]}),(0,d.jsxs)(s.gE,{style:{marginBottom:0},children:[(0,d.jsx)(s.lR,{style:{fontSize:"12px"},children:"Annual"}),(0,d.jsx)(s.ZQ,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(o=a[r])||void 0===o?void 0:o.annual)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],annual:e.target.value}}}})})]})]})]},r)}),0===K.length&&(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Revenue Percentage (%)"}),(0,d.jsx)(s.ZQ,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:e.percentage_value,onChange:e=>n(n=>({...n,percentage_value:e.target.value}))})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Revenue Base Period"}),(0,d.jsxs)(s.FX,{value:e.revenue_base,onChange:e=>n(n=>({...n,revenue_base:e.target.value})),children:[(0,d.jsx)("option",{value:"previous_month",children:"Previous Month"}),(0,d.jsx)("option",{value:"previous_year",children:"Previous Year"}),(0,d.jsx)("option",{value:"up_to_billing_day",children:"Up to Billing Day"})]})]})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Billing Day"}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,d.jsx)(s.ZQ,{type:"number",min:"1",max:"28",placeholder:"1-28",value:"-1"===e.billing_day?"":e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.value})),disabled:"-1"===e.billing_day,style:{width:"100px",opacity:"-1"===e.billing_day?.5:1}}),(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"14px",color:"#374151",cursor:"pointer",whiteSpace:"nowrap"},children:[(0,d.jsx)("input",{type:"checkbox",checked:"-1"===e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.checked?"-1":""})),style:{width:"16px",height:"16px",cursor:"pointer"}}),"End of Month"]})]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(s.mc,{children:[(0,d.jsxs)(s.Y9,{children:[(0,d.jsx)(s.hE,{children:"Subscription Plans"}),(0,d.jsx)(s.ex,{children:(0,d.jsx)(s.$n,{variant:"primary",onClick:()=>{me({...je,currency_prices:{}}),re(!0)},children:"Create Plan"})})]}),(0,d.jsxs)(s.UC,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{color:"#059669",children:[(0,d.jsx)(s.Os,{children:n.length}),(0,d.jsx)(s.v0,{children:"Total Plans"}),(0,d.jsxs)(s.d1,{children:[Ee," active"]})]}),(0,d.jsxs)(s.hI,{color:"#10B981",children:[(0,d.jsx)(s.Os,{children:Ee}),(0,d.jsx)(s.v0,{children:"Active Plans"}),(0,d.jsxs)(s.d1,{children:[n.length>0?Math.round(Ee/n.length*100):0,"% available"]})]}),(0,d.jsxs)(s.hI,{color:"#F59E0B",children:[(0,d.jsx)(s.Os,{children:Be}),(0,d.jsx)(s.v0,{children:"Total Tenants"}),(0,d.jsx)(s.d1,{children:"Across all plans"})]}),(0,d.jsxs)(s.hI,{color:"#DC2626",children:[(0,d.jsx)(s.Os,{children:(0,c.vv)(ze,X)}),(0,d.jsx)(s.v0,{children:"Fixed Monthly Revenue"}),(0,d.jsx)(s.d1,{children:"From fixed-type plans"})]})]}),(0,d.jsxs)(o.Qn,{children:[(0,d.jsx)(o.DO,{type:"text",placeholder:"Search plans...",value:Y,onChange:e=>U(e.target.value)}),(0,d.jsxs)(o.Jt,{value:H,onChange:e=>Z(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsx)(o.Jt,{value:X,onChange:e=>V(e.target.value),style:{minWidth:"150px"},children:K.map(e=>{const n=q[e];return(0,d.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),i?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===Se.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,d.jsx)(p,{children:Se.map(e=>(0,d.jsxs)(h,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,d.jsxs)(C,{children:[(0,d.jsx)($,{chargeType:e.charge_type||"fixed",children:"percentage"===e.charge_type?"% Revenue":"Fixed"}),(0,d.jsx)(F,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(u,{children:e.name}),e.description&&(0,d.jsx)(g,{children:e.description}),(0,d.jsx)(y,{children:"percentage"===e.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(j,{children:[parseFloat(e.percentage_value||"0"),"%"]}),(0,d.jsxs)(m,{children:["of revenue (",Q[e.revenue_base]||e.revenue_base,")"]})]}):Ae(e)?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(j,{children:[ke(e,"monthly"),(0,d.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),we(e,"annual")>0&&we(e,"monthly")>0&&(0,d.jsxs)(v,{children:[ke(e,"annual"),"/year",12*we(e,"monthly")>we(e,"annual")&&(0,d.jsxs)("span",{children:[" (Save ",Math.round((12*we(e,"monthly")-we(e,"annual"))/(12*we(e,"monthly"))*100),"%)"]})]}),(0,d.jsx)(m,{children:"Billed monthly or annually"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(j,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,d.jsxs)(m,{style:{color:"#F59E0B"},children:["Set ",X,' price in "Prices"']})]})})]}),(0,d.jsxs)(N,{children:[(0,d.jsxs)(O,{children:[(0,d.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Billing Day"}),(0,d.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:-1===e.billing_day?"End of Month":e.billing_day?`Every ${e.billing_day}${1===e.billing_day?"st":2===e.billing_day?"nd":3===e.billing_day?"rd":"th"}`:"Subscription Start"})]}),e.auto_generate&&(0,d.jsxs)(O,{style:{marginTop:4},children:[(0,d.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Auto-invoice"}),(0,d.jsx)("span",{style:{color:"#059669",fontWeight:600},children:"Enabled"})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,d.jsx)(f,{children:e.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))}),(0,d.jsxs)(_,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:Fe(e)}),(0,d.jsx)(k,{children:"Tenants"})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:"fixed"===e.charge_type?(0,c.vv)(we(e,"monthly")*Fe(e),X):`${parseFloat(e.percentage_value||"0")}% rev`}),(0,d.jsx)(k,{children:"fixed"===e.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(E,{variant:"primary",onClick:()=>(e=>{var n,r;he(e);let i={};if(e.prices)for(const s of e.prices){var t,a;i[s.currency]={monthly:(null===(t=s.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=s.annual_price)||void 0===a?void 0:a.toString())||"0"}}be({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:i,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),te(!0)})(e),children:"Edit"}),"fixed"===e.charge_type&&(0,d.jsx)(E,{variant:"secondary",onClick:()=>Ce(e),children:"Prices"}),(0,d.jsx)(E,{variant:"secondary",onClick:()=>(e=>{he(e),se(!0)})(e),children:"View"})]})]},e.id))}),ne&&(0,d.jsx)(s.mH,{onClick:()=>re(!1),children:(0,d.jsxs)(s.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsx)(s.wt,{children:"Create New Plan"}),(0,d.jsx)(s.Jn,{onClick:()=>re(!1),children:"\xd7"})]}),(0,d.jsxs)(s.cw,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Plan Name *"}),(0,d.jsx)(s.ZQ,{type:"text",placeholder:"e.g., Monthly Rent, Management Fee, Revenue Share",value:ve.name,onChange:e=>me(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Description"}),(0,d.jsx)(s.Lz,{placeholder:"Enter plan description...",rows:3,value:ve.description,onChange:e=>me(n=>({...n,description:e.target.value}))})]}),Pe(ve,me),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Features (one per line)"}),(0,d.jsx)(s.Lz,{placeholder:"Enter features, one per line...",rows:4,value:ve.features,onChange:e=>me(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(z,{children:[(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:ve.auto_generate,onChange:e=>me(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-popular",checked:ve.is_popular,onChange:e=>me(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-active",checked:ve.is_active,onChange:e=>me(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(s.$n,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,d.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(W)try{const e=localStorage.getItem("auth_token"),n={name:ve.name,description:ve.description||null,charge_type:ve.charge_type,billing_day:""!==ve.billing_day?parseInt(ve.billing_day):null,auto_generate:ve.auto_generate,currency:"MYR",is_popular:ve.is_popular,is_active:ve.is_active,features:ve.features.split("\n").filter(e=>e.trim())};"percentage"===ve.charge_type?(n.percentage_value=parseFloat(ve.percentage_value)||0,n.revenue_base=ve.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(ve.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/foodcourts/${W}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)re(!1),me({...je,currency_prices:{}}),_e(W);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},disabled:!ve.name.trim(),children:"Create"})]})]})}),ie&&pe&&(0,d.jsx)(s.mH,{onClick:()=>te(!1),children:(0,d.jsxs)(s.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsxs)(s.wt,{children:["Edit Plan: ",pe.name]}),(0,d.jsx)(s.Jn,{onClick:()=>te(!1),children:"\xd7"})]}),(0,d.jsxs)(s.cw,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Plan Name *"}),(0,d.jsx)(s.ZQ,{type:"text",value:fe.name,onChange:e=>be(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Description"}),(0,d.jsx)(s.Lz,{rows:3,value:fe.description,onChange:e=>be(n=>({...n,description:e.target.value}))})]}),Pe(fe,be),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Features (one per line)"}),(0,d.jsx)(s.Lz,{rows:4,value:fe.features,onChange:e=>be(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(z,{children:[(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:fe.auto_generate,onChange:e=>be(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-popular",checked:fe.is_popular,onChange:e=>be(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-active",checked:fe.is_active,onChange:e=>be(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(s.$n,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,d.jsx)(s.$n,{variant:"danger",onClick:()=>(async e=>{if(W&&window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const n=localStorage.getItem("auth_token");(await fetch(`/api/foodcourts/${W}/plans/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&(te(!1),_e(W))}catch(n){console.error("Error deleting plan:",n)}})(pe.id),children:"Delete"}),(0,d.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(W&&pe)try{const e=localStorage.getItem("auth_token"),n={name:fe.name,description:fe.description||null,charge_type:fe.charge_type,billing_day:""!==fe.billing_day?parseInt(fe.billing_day):null,auto_generate:fe.auto_generate,is_popular:fe.is_popular,is_active:fe.is_active,features:fe.features.split("\n").filter(e=>e.trim())};"percentage"===fe.charge_type&&(n.percentage_value=parseFloat(fe.percentage_value)||0,n.revenue_base=fe.revenue_base);const r=await fetch(`/api/foodcourts/${W}/plans/${pe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===fe.charge_type&&Object.keys(fe.currency_prices).length>0){const n=Object.entries(fe.currency_prices).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/foodcourts/${W}/plans/${pe.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}te(!1),_e(W)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},disabled:!fe.name.trim(),children:"Update"})]})]})}),ae&&pe&&(0,d.jsx)(s.mH,{onClick:()=>se(!1),children:(0,d.jsxs)(s.$m,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsxs)(s.wt,{children:["Plan Details: ",pe.name]}),(0,d.jsx)(s.Jn,{onClick:()=>se(!1),children:"\xd7"})]}),(0,d.jsxs)(s.cw,{children:[(0,d.jsxs)(R,{children:[(0,d.jsx)("h4",{children:"Plan Info"}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Plan ID"}),(0,d.jsx)(I,{children:pe.id})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Name"}),(0,d.jsx)(I,{children:pe.name})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Status"}),(0,d.jsx)(F,{isActive:pe.is_active,children:pe.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Charge Type"}),(0,d.jsx)($,{chargeType:pe.charge_type||"fixed",children:"percentage"===pe.charge_type?"% Revenue":"Fixed"})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Popular Plan"}),(0,d.jsx)(I,{children:pe.is_popular?"Yes":"No"})]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)("h4",{children:"Billing"}),"percentage"===pe.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Revenue Percentage"}),(0,d.jsxs)(I,{children:[parseFloat(pe.percentage_value||"0"),"%"]})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Revenue Base"}),(0,d.jsx)(I,{children:Q[pe.revenue_base]||pe.revenue_base})]})]}):(0,d.jsx)(d.Fragment,{children:K.map(e=>{var n,r;const i=null===(n=pe.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!i)return null;const t=parseFloat(i.monthly_price)||0,a=parseFloat(i.annual_price)||0;return 0===t&&0===a?null:(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=q[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Monthly"}),(0,d.jsx)(I,{children:(0,c.vv)(t,e)})]}),a>0&&(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Annual"}),(0,d.jsx)(I,{children:(0,c.vv)(a,e)})]})]},e)})}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Billing Day"}),(0,d.jsx)(I,{children:-1===pe.billing_day?"End of Month":pe.billing_day?`Every ${pe.billing_day}${1===pe.billing_day?"st":2===pe.billing_day?"nd":3===pe.billing_day?"rd":"th"}`:"Subscription Start Date"})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Auto-generate Invoices"}),(0,d.jsx)(I,{children:pe.auto_generate?"Yes":"No"})]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)("h4",{children:"Statistics"}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Current Tenants"}),(0,d.jsx)(I,{children:Fe(pe)})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{children:"Created Date"}),(0,d.jsx)(I,{children:new Date(pe.createdAt).toLocaleDateString()})]})]}),Array.isArray(pe.features)&&pe.features.length>0&&(0,d.jsxs)(R,{children:[(0,d.jsx)("h4",{children:"Features"}),(0,d.jsx)(f,{children:pe.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)("h4",{children:["Assigned Tenants (",Fe(pe),")"]}),pe.planRestaurants&&pe.planRestaurants.length>0?(0,d.jsx)(L,{children:pe.planRestaurants.map(e=>{var n;return(0,d.jsxs)(J,{isAssigned:!0,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,d.jsx)(F,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No tenants assigned to this plan."}),(0,d.jsx)(s.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>$e(pe),children:"Manage Tenant Assignments"})]})]})]})}),oe&&pe&&(0,d.jsx)(s.mH,{onClick:()=>le(!1),children:(0,d.jsxs)(s.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsxs)(s.wt,{children:["Set Prices for ",pe.name]}),(0,d.jsx)(s.Jn,{onClick:()=>le(!1),children:"\xd7"})]}),(0,d.jsxs)(s.cw,{children:[(0,d.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,d.jsx)("div",{style:{display:"grid",gap:"16px"},children:K.map(e=>{var n,r;const i=q[e];return(0,d.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,d.jsx)("input",{type:"number",value:(null===(n=xe[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>ue({...xe,[e]:{...xe[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,d.jsx)("input",{type:"number",value:(null===(r=xe[e])||void 0===r?void 0:r.annual)||"",onChange:n=>ue({...xe,[e]:{...xe[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)})})]}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(s.$n,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,d.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(W&&pe)try{const e=localStorage.getItem("auth_token"),n=Object.entries(xe).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});(await fetch(`/api/foodcourts/${W}/plans/${pe.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(le(!1),_e(W))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})}),ce&&pe&&(0,d.jsx)(s.mH,{onClick:()=>de(!1),children:(0,d.jsxs)(s.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsxs)(s.wt,{children:["Manage Tenants: ",pe.name]}),(0,d.jsx)(s.Jn,{onClick:()=>de(!1),children:"\xd7"})]}),(0,d.jsxs)(s.cw,{children:[(0,d.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove tenants from this plan."}),(0,d.jsxs)(L,{children:[ge.map(e=>{var n;const r=null===(n=pe.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,d.jsxs)(J,{isAssigned:r,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,d.jsx)(s.$n,{variant:"danger",onClick:()=>(async e=>{if(W&&pe)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${W}/plans/${pe.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){_e(W);const e=await fetch(`/api/foodcourts/${W}/plans/${pe.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();he(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,d.jsx)(s.$n,{variant:"primary",onClick:()=>(async e=>{if(W&&pe)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${W}/plans/${pe.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_id:e})})).ok){_e(W);const e=await fetch(`/api/foodcourts/${W}/plans/${pe.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();he(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===ge.length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No tenants found in your foodcourt."})]})]}),(0,d.jsx)(s.jl,{children:(0,d.jsx)(s.$n,{variant:"secondary",onClick:()=>de(!1),children:"Close"})})]})})]})]})})}}}]);