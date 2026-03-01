"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{2488:(e,n,r)=>{r.d(n,{DO:()=>c,Jt:()=>d,Qn:()=>l});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
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
`,s=i.Ay.input`
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
`,o=i.Ay.select`
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
`,l=e=>{let{children:n,className:r,style:i,...s}=e;return(0,t.jsx)(a,{className:r,style:i,...s,children:n})},c=e=>{let{placeholder:n="Search...",...r}=e;return(0,t.jsx)(s,{placeholder:n,...r})},d=e=>{let{children:n,...r}=e;return(0,t.jsx)(o,{...r,children:n})}},4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ne});var i=r(9950),t=r(4752),a=r(6649),s=r(2488),o=r(1367),l=r(6038),c=r(4414);const d=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,p=t.Ay.div`
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
`,h=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,u=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,g=t.Ay.div`
  text-align: center;
`,y=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,v=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,m=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,b=t.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,f=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,_=t.Ay.div`
  text-align: center;
`,A=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,w=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,F=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,k=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,C=t.Ay.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"fixed"===e.chargeType?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"fixed"===e.chargeType?"#1E40AF":"#92400E"};
`,B=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,E=t.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3); }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}
`,S=t.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 40px 20px;
  overflow-y: auto;
`,z=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,$=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,R=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover { background: #F3F4F6; color: #374151; }
`,D=t.Ay.div`
  padding: 24px;
`,T=t.Ay.div`
  margin-bottom: 20px;
`,I=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,M=t.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,N=t.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,O=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,W=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,L=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,Y=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,J=t.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,U=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,Q=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,V=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,X=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,q=t.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,G=t.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
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
`,Z=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,ee={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},ne=()=>{const{user:e}=(0,o.As)(),[n,r]=(0,i.useState)([]),[t,ne]=(0,i.useState)(!0),re=(null===e||void 0===e?void 0:e.brand_id)||null,[ie,te]=(0,i.useState)(""),[ae,se]=(0,i.useState)("all"),[oe,le]=(0,i.useState)("MYR"),[ce,de]=(0,i.useState)({}),[pe,xe]=(0,i.useState)([]),[he,ue]=(0,i.useState)(!1),[ge,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(!1),[me,be]=(0,i.useState)(!1),[fe,_e]=(0,i.useState)(!1),[Ae,we]=(0,i.useState)(null),[Fe,ke]=(0,i.useState)({}),[Ce,Be]=(0,i.useState)([]),Ee={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[Se,ze]=(0,i.useState)(Ee),[$e,Pe]=(0,i.useState)(Ee),Re=(0,i.useCallback)(async e=>{try{ne(!0);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{ne(!1)}},[]);(0,i.useEffect)(()=>{re&&Re(re),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();de(n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=await e.json();xe((n.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),xe(["MYR"])}})()},[re,Re]);const De=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===oe);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},Te=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===oe);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Ie=(e,n)=>Te(e)?(0,l.vv)(De(e,n),oe):"Not Set",Me=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Ne=e=>{we(e),re&&(async(e,n)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of n){var r,i;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=a.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of pe)t[r]||(t[r]={monthly:"0",annual:"0"});ke(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(re,e.id),be(!0)},Oe=e=>{we(e),re&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Be(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(re),_e(!0)},We=n.filter(e=>{const n=e.name.toLowerCase().includes(ie.toLowerCase())||(e.description||"").toLowerCase().includes(ie.toLowerCase()),r="all"===ae||"active"===ae&&e.is_active||"inactive"===ae&&!e.is_active;return n&&r}),Le=n.filter(e=>e.is_active).length,Ye=n.reduce((e,n)=>e+Me(n),0),Je=n.reduce((e,n)=>"fixed"===n.charge_type?e+De(n,"monthly")*Me(n):e,0),Ue=(e,n)=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(q,{children:"Charge Type"}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Charge Type *"}),(0,c.jsxs)(N,{value:e.charge_type,onChange:e=>n(n=>({...n,charge_type:e.target.value})),children:[(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount (Currency Pricing)"}),(0,c.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===e.charge_type?(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[pe.map(r=>{var i,t,a,s;const o=ce[r];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===o||void 0===o?void 0:o.symbol)||r," ",r," - ",(null===o||void 0===o?void 0:o.name)||r]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(T,{style:{marginBottom:0},children:[(0,c.jsx)(I,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(M,{type:"number",placeholder:"0",value:(null===(i=e.currency_prices)||void 0===i||null===(t=i[r])||void 0===t?void 0:t.monthly)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],monthly:e.target.value}}}})})]}),(0,c.jsxs)(T,{style:{marginBottom:0},children:[(0,c.jsx)(I,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(M,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(s=a[r])||void 0===s?void 0:s.annual)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],annual:e.target.value}}}})})]})]})]},r)}),0===pe.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Revenue Percentage (%)"}),(0,c.jsx)(M,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:e.percentage_value,onChange:e=>n(n=>({...n,percentage_value:e.target.value}))})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Revenue Base Period"}),(0,c.jsxs)(N,{value:e.revenue_base,onChange:e=>n(n=>({...n,revenue_base:e.target.value})),children:[(0,c.jsx)("option",{value:"previous_month",children:"Previous Month"}),(0,c.jsx)("option",{value:"previous_year",children:"Previous Year"}),(0,c.jsx)("option",{value:"up_to_billing_day",children:"Up to Billing Day"})]})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Billing Day (1-28)"}),(0,c.jsx)(M,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.value}))}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"Subscription Plans"}),(0,c.jsx)(a.ex,{children:(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>{ze({...Ee,currency_prices:{}}),ue(!0)},children:"Create Plan"})})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(a.MD,{children:[(0,c.jsxs)(a.hI,{color:"#059669",children:[(0,c.jsx)(a.Os,{children:n.length}),(0,c.jsx)(a.v0,{children:"Total Plans"}),(0,c.jsxs)(a.d1,{children:[Le," active"]})]}),(0,c.jsxs)(a.hI,{color:"#10B981",children:[(0,c.jsx)(a.Os,{children:Le}),(0,c.jsx)(a.v0,{children:"Active Plans"}),(0,c.jsxs)(a.d1,{children:[n.length>0?Math.round(Le/n.length*100):0,"% available"]})]}),(0,c.jsxs)(a.hI,{color:"#F59E0B",children:[(0,c.jsx)(a.Os,{children:Ye}),(0,c.jsx)(a.v0,{children:"Total Subscriptions"}),(0,c.jsx)(a.d1,{children:"Across all plans"})]}),(0,c.jsxs)(a.hI,{color:"#DC2626",children:[(0,c.jsx)(a.Os,{children:(0,l.vv)(Je,oe)}),(0,c.jsx)(a.v0,{children:"Fixed Monthly Revenue"}),(0,c.jsx)(a.d1,{children:"From fixed-type plans"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:ie,onChange:e=>te(e.target.value)}),(0,c.jsxs)(s.Jt,{value:ae,onChange:e=>se(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(s.Jt,{value:oe,onChange:e=>le(e.target.value),style:{minWidth:"150px"},children:pe.map(e=>{const n=ce[e];return(0,c.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),t?(0,c.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===We.length?(0,c.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,c.jsx)(d,{children:We.map(e=>(0,c.jsxs)(p,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{chargeType:e.charge_type||"fixed",children:"percentage"===e.charge_type?"% Revenue":"Fixed"}),(0,c.jsx)(F,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:e.name}),e.description&&(0,c.jsx)(u,{children:e.description}),(0,c.jsx)(g,{children:"percentage"===e.charge_type?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(y,{children:[parseFloat(e.percentage_value||"0"),"%"]}),(0,c.jsxs)(j,{children:["of revenue (",ee[e.revenue_base]||e.revenue_base,")"]})]}):Te(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(y,{children:[Ie(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),De(e,"annual")>0&&De(e,"monthly")>0&&(0,c.jsxs)(v,{children:[Ie(e,"annual"),"/year",12*De(e,"monthly")>De(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*De(e,"monthly")-De(e,"annual"))/(12*De(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(y,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",oe,' price in "Prices"']})]})})]}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Billing Day"}),(0,c.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:e.billing_day?`Every ${e.billing_day}${1===e.billing_day?"st":2===e.billing_day?"nd":3===e.billing_day?"rd":"th"}`:"Subscription Start"})]}),e.auto_generate&&(0,c.jsxs)(H,{style:{marginTop:4},children:[(0,c.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Auto-invoice"}),(0,c.jsx)("span",{style:{color:"#059669",fontWeight:600},children:"Enabled"})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,c.jsx)(m,{children:e.features.map((e,n)=>(0,c.jsx)(b,{children:e},n))}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(_,{children:[(0,c.jsx)(A,{children:Me(e)}),(0,c.jsx)(w,{children:"Subscriptions"})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(A,{children:"fixed"===e.charge_type?(0,l.vv)(De(e,"monthly")*Me(e),oe):`${parseFloat(e.percentage_value||"0")}% rev`}),(0,c.jsx)(w,{children:"fixed"===e.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{variant:"primary",onClick:()=>(e=>{var n,r;we(e);let i={};if(e.prices)for(const s of e.prices){var t,a;i[s.currency]={monthly:(null===(t=s.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=s.annual_price)||void 0===a?void 0:a.toString())||"0"}}Pe({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:i,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),ye(!0)})(e),children:"Edit"}),"fixed"===e.charge_type&&(0,c.jsx)(E,{variant:"secondary",onClick:()=>Ne(e),children:"Prices"}),(0,c.jsx)(E,{variant:"secondary",onClick:()=>(e=>{we(e),je(!0)})(e),children:"View"})]})]},e.id))}),he&&(0,c.jsx)(S,{onClick:()=>ue(!1),children:(0,c.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)($,{children:[(0,c.jsx)(P,{children:"Create New Plan"}),(0,c.jsx)(R,{onClick:()=>ue(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Plan Name *"}),(0,c.jsx)(M,{type:"text",placeholder:"e.g., Royalty Fee, Monthly Rent, Management Fee",value:Se.name,onChange:e=>ze(n=>({...n,name:e.target.value}))})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Description"}),(0,c.jsx)(O,{placeholder:"Enter plan description...",rows:3,value:Se.description,onChange:e=>ze(n=>({...n,description:e.target.value}))})]}),Ue(Se,ze),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Features (one per line)"}),(0,c.jsx)(O,{placeholder:"Enter features, one per line...",rows:4,value:Se.features,onChange:e=>ze(n=>({...n,features:e.target.value}))})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:Se.auto_generate,onChange:e=>ze(n=>({...n,auto_generate:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-popular",checked:Se.is_popular,onChange:e=>ze(n=>({...n,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"create-active",checked:Se.is_active,onChange:e=>ze(n=>({...n,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(re)try{const e=localStorage.getItem("auth_token"),n={name:Se.name,description:Se.description||null,charge_type:Se.charge_type,billing_day:Se.billing_day?parseInt(Se.billing_day):null,auto_generate:Se.auto_generate,currency:"MYR",is_popular:Se.is_popular,is_active:Se.is_active,features:Se.features.split("\n").filter(e=>e.trim())};"percentage"===Se.charge_type?(n.percentage_value=parseFloat(Se.percentage_value)||0,n.revenue_base=Se.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(Se.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/brands/${re}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)ue(!1),ze({...Ee,currency_prices:{}}),Re(re);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ge&&Ae&&(0,c.jsx)(S,{onClick:()=>ye(!1),children:(0,c.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)($,{children:[(0,c.jsxs)(P,{children:["Edit Plan: ",Ae.name]}),(0,c.jsx)(R,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Plan Name *"}),(0,c.jsx)(M,{type:"text",value:$e.name,onChange:e=>Pe(n=>({...n,name:e.target.value}))})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Description"}),(0,c.jsx)(O,{rows:3,value:$e.description,onChange:e=>Pe(n=>({...n,description:e.target.value}))})]}),Ue($e,Pe),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{children:"Features (one per line)"}),(0,c.jsx)(O,{rows:4,value:$e.features,onChange:e=>Pe(n=>({...n,features:e.target.value}))})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:$e.auto_generate,onChange:e=>Pe(n=>({...n,auto_generate:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:$e.is_popular,onChange:e=>Pe(n=>({...n,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(Y,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:$e.is_active,onChange:e=>Pe(n=>({...n,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(re&&window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const n=localStorage.getItem("auth_token");(await fetch(`/api/brands/${re}/plans/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&(ye(!1),Re(re))}catch(n){console.error("Error deleting plan:",n)}})(Ae.id),children:"Delete"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(re&&Ae)try{const e=localStorage.getItem("auth_token"),n={name:$e.name,description:$e.description||null,charge_type:$e.charge_type,billing_day:$e.billing_day?parseInt($e.billing_day):null,auto_generate:$e.auto_generate,is_popular:$e.is_popular,is_active:$e.is_active,features:$e.features.split("\n").filter(e=>e.trim())};"percentage"===$e.charge_type&&(n.percentage_value=parseFloat($e.percentage_value)||0,n.revenue_base=$e.revenue_base);const r=await fetch(`/api/brands/${re}/plans/${Ae.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===$e.charge_type&&Object.keys($e.currency_prices).length>0){const n=Object.fromEntries(Object.entries($e.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));await fetch(`/api/brands/${re}/plans/${Ae.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}ye(!1),Re(re)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),ve&&Ae&&(0,c.jsx)(S,{onClick:()=>je(!1),children:(0,c.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)($,{children:[(0,c.jsxs)(P,{children:["Plan Details: ",Ae.name]}),(0,c.jsx)(R,{onClick:()=>je(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:[(0,c.jsx)("h4",{children:"Plan Info"}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Plan ID"}),(0,c.jsx)(X,{children:Ae.id})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Name"}),(0,c.jsx)(X,{children:Ae.name})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Status"}),(0,c.jsx)(F,{isActive:Ae.is_active,children:Ae.is_active?"Active":"Inactive"})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Charge Type"}),(0,c.jsx)(C,{chargeType:Ae.charge_type||"fixed",children:"percentage"===Ae.charge_type?"% Revenue":"Fixed"})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Popular Plan"}),(0,c.jsx)(X,{children:Ae.is_popular?"Yes":"No"})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)("h4",{children:"Billing"}),"percentage"===Ae.charge_type?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Revenue Percentage"}),(0,c.jsxs)(X,{children:[parseFloat(Ae.percentage_value||"0"),"%"]})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Revenue Base"}),(0,c.jsx)(X,{children:ee[Ae.revenue_base]||Ae.revenue_base})]})]}):(0,c.jsx)(c.Fragment,{children:pe.map(e=>{var n,r;const i=null===(n=Ae.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!i)return null;const t=parseFloat(i.monthly_price)||0,a=parseFloat(i.annual_price)||0;return 0===t&&0===a?null:(0,c.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=ce[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Monthly"}),(0,c.jsx)(X,{children:(0,l.vv)(t,e)})]}),a>0&&(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Annual"}),(0,c.jsx)(X,{children:(0,l.vv)(a,e)})]})]},e)})}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Billing Day"}),(0,c.jsx)(X,{children:Ae.billing_day?`Every ${Ae.billing_day}th`:"Subscription Start Date"})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Auto-generate Invoices"}),(0,c.jsx)(X,{children:Ae.auto_generate?"Yes":"No"})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Current Subscriptions"}),(0,c.jsx)(X,{children:Me(Ae)})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(V,{children:"Created Date"}),(0,c.jsx)(X,{children:new Date(Ae.createdAt).toLocaleDateString()})]})]}),Array.isArray(Ae.features)&&Ae.features.length>0&&(0,c.jsxs)(U,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(m,{children:Ae.features.map((e,n)=>(0,c.jsx)(b,{children:e},n))})]}),(0,c.jsxs)(U,{children:[(0,c.jsxs)("h4",{children:["Assigned Restaurants (",Me(Ae),")"]}),Ae.planRestaurants&&Ae.planRestaurants.length>0?(0,c.jsx)(K,{children:Ae.planRestaurants.map(e=>{var n;return(0,c.jsxs)(Z,{isAssigned:!0,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,c.jsx)(F,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No restaurants assigned to this plan."}),(0,c.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Oe(Ae),children:"Manage Restaurant Assignments"})]})]})]})}),me&&Ae&&(0,c.jsx)(S,{onClick:()=>be(!1),children:(0,c.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)($,{children:[(0,c.jsxs)(P,{children:["Set Prices for ",Ae.name]}),(0,c.jsx)(R,{onClick:()=>be(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsx)("div",{style:{display:"grid",gap:"16px"},children:pe.map(e=>{var n,r;const i=ce[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(n=Fe[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>ke({...Fe,[e]:{...Fe[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Fe[e])||void 0===r?void 0:r.annual)||"",onChange:n=>ke({...Fe,[e]:{...Fe[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)})})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(re&&Ae)try{const e=localStorage.getItem("auth_token"),n=Object.fromEntries(Object.entries(Fe).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));(await fetch(`/api/brands/${re}/plans/${Ae.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(be(!1),Re(re))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})}),fe&&Ae&&(0,c.jsx)(S,{onClick:()=>_e(!1),children:(0,c.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,c.jsxs)($,{children:[(0,c.jsxs)(P,{children:["Manage Restaurants: ",Ae.name]}),(0,c.jsx)(R,{onClick:()=>_e(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,c.jsxs)(K,{children:[Ce.map(e=>{var n;const r=null===(n=Ae.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,c.jsxs)(Z,{isAssigned:r,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,c.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(re&&Ae)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${re}/plans/${Ae.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){Re(re);const e=await fetch(`/api/brands/${re}/plans/${Ae.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();we(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(re&&Ae)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${re}/plans/${Ae.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_ids:[e]})})).ok){Re(re);const e=await fetch(`/api/brands/${re}/plans/${Ae.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();we(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===Ce.length&&(0,c.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No restaurants found."})]})]}),(0,c.jsx)(J,{children:(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>_e(!1),children:"Close"})})]})})]})]})})}}}]);