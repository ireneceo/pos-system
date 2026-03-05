"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{2488:(e,n,r)=>{r.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>d});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
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
`,o=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,l=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,c=i.Ay.select`
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
`,d=e=>{let{children:n,className:r,style:i,...s}=e;return(0,t.jsx)(a,{className:r,style:i,...s,children:n})},p=e=>{let{placeholder:n="Search...",value:r,onChange:i,style:a,...c}=e;return(0,t.jsxs)(o,{style:a,children:[(0,t.jsx)(s,{placeholder:n,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...c}),r&&(0,t.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...r}=e;return(0,t.jsx)(c,{...r,children:n})}},4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>re});var i=r(9950),t=r(4752),a=r(8409),s=r(2488),o=r(1367),l=r(6038),c=r(7617),d=r(4414);const p=t.Ay.div`
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
`,h=t.Ay.div`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 36px;
`,u=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,g=t.Ay.p`
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
`,m=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,b=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,f=t.Ay.li`
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
`,w=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,F=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,k=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,C=t.Ay.div`
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
`,z=t.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 40px 20px;
  overflow-y: auto;
`,$=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,P=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,T=t.Ay.button`
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
`,R=t.Ay.div`
  padding: 24px;
`,I=t.Ay.div`
  margin-bottom: 20px;
`,M=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,O=t.Ay.input`
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
`,W=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,L=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,Y=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,J=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  input[type="checkbox"] { width: 16px; height: 16px; margin-top: 2px; flex-shrink: 0; accent-color: #635BFF; }
  label { font-size: 14px; color: #0A2540; cursor: pointer; }
`,U=t.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,Q=t.Ay.div`
  margin-bottom: 24px;
  h4 { font-size: 16px; font-weight: 600; color: #0A2540; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E6EBF1; }
`,H=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &:last-child { margin-bottom: 0; }
`,K=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,V=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,X=t.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,q=t.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
`,G=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`,Z=t.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,ee=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};
  &:last-child { border-bottom: none; }
`,ne={previous_month:"Previous Month",previous_year:"Previous Year",up_to_billing_day:"Up to Billing Day"},re=()=>{const{user:e}=(0,o.As)(),[n,r]=(0,i.useState)([]),[t,re]=(0,i.useState)(!0),ie=(null===e||void 0===e?void 0:e.brand_id)||null,[te,ae]=(0,i.useState)(""),[se,oe]=(0,i.useState)("all"),[le,ce]=(0,i.useState)(""),[de,pe]=(0,i.useState)({}),[xe,he]=(0,i.useState)([]),[ue,ge]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[me,je]=(0,i.useState)(!1),[be,fe]=(0,i.useState)(!1),[_e,Ae]=(0,i.useState)(!1),[we,Fe]=(0,i.useState)(null),[ke,Ce]=(0,i.useState)({}),[Be,Ee]=(0,i.useState)([]),Se={name:"",description:"",charge_type:"fixed",percentage_value:"",revenue_base:"previous_month",billing_day:"",auto_generate:!0,currency_prices:{},features:"",is_popular:!1,is_active:!0},[ze,$e]=(0,i.useState)(Se),[Pe,De]=(0,i.useState)(Se),[Te,Re]=(0,i.useState)(!1),[Ie,Me]=(0,i.useState)(null),Oe=(0,i.useCallback)(async e=>{try{re(!0);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{re(!1)}},[]);(0,i.useEffect)(()=>{ie&&Oe(ie),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();pe(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);he(n),n.length>0&&ce(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),he(["MYR","KRW"]),ce(e=>e||"MYR")}})()},[ie,Oe]);const Ne=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===le);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},We=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===le);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Le=(e,n)=>We(e)?(0,l.vv)(Ne(e,n),le):"Not Set",Ye=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Je=e=>{Fe(e),ie&&(async(e,n)=>{try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],t={};for(const a of n){var r,i;t[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=a.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of xe)t[r]||(t[r]={monthly:"0",annual:"0"});Ce(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(ie,e.id),fe(!0)},Ue=e=>{Fe(e),ie&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Ee(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(ie),Ae(!0)},Qe=n.filter(e=>{const n=e.name.toLowerCase().includes(te.toLowerCase())||(e.description||"").toLowerCase().includes(te.toLowerCase()),r="all"===se||"active"===se&&e.is_active||"inactive"===se&&!e.is_active;return n&&r}),He=n.filter(e=>e.is_active).length,Ke=n.reduce((e,n)=>e+Ye(n),0),Ve=n.reduce((e,n)=>"fixed"===n.charge_type?e+Ne(n,"monthly")*Ye(n):e,0),Xe=(e,n)=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(X,{children:"Charge Type"}),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Charge Type *"}),(0,d.jsxs)(N,{value:e.charge_type,onChange:e=>n(n=>({...n,charge_type:e.target.value})),children:[(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (Currency Pricing)"}),(0,d.jsx)("option",{value:"percentage",children:"% of Revenue"})]})]}),"fixed"===e.charge_type?(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Pricing by Currency"}),(0,d.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[xe.map(r=>{var i,t,a,s;const o=de[r];return(0,d.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===o||void 0===o?void 0:o.symbol)||r," ",r," - ",(null===o||void 0===o?void 0:o.name)||r]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(I,{style:{marginBottom:0},children:[(0,d.jsx)(M,{style:{fontSize:"12px"},children:"Monthly"}),(0,d.jsx)(O,{type:"number",placeholder:"0",value:(null===(i=e.currency_prices)||void 0===i||null===(t=i[r])||void 0===t?void 0:t.monthly)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],monthly:e.target.value}}}})})]}),(0,d.jsxs)(I,{style:{marginBottom:0},children:[(0,d.jsx)(M,{style:{fontSize:"12px"},children:"Annual"}),(0,d.jsx)(O,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(s=a[r])||void 0===s?void 0:s.annual)||"",onChange:e=>n(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[r],annual:e.target.value}}}})})]})]})]},r)}),0===xe.length&&(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Revenue Percentage (%)"}),(0,d.jsx)(O,{type:"number",step:"0.01",placeholder:"e.g., 5.00",value:e.percentage_value,onChange:e=>n(n=>({...n,percentage_value:e.target.value}))})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Revenue Base Period"}),(0,d.jsxs)(N,{value:e.revenue_base,onChange:e=>n(n=>({...n,revenue_base:e.target.value})),children:[(0,d.jsx)("option",{value:"previous_month",children:"Previous Month"}),(0,d.jsx)("option",{value:"previous_year",children:"Previous Year"}),(0,d.jsx)("option",{value:"up_to_billing_day",children:"Up to Billing Day"})]})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Billing Day (1-28)"}),(0,d.jsx)(O,{type:"number",min:"1",max:"28",placeholder:"e.g., 15 (empty = subscription start date)",value:e.billing_day,onChange:e=>n(n=>({...n,billing_day:e.target.value}))}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to use subscription start date. Invoice auto-generated 14 days before billing day."})]})]});return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a.mc,{children:[(0,d.jsxs)(a.Y9,{children:[(0,d.jsx)(a.hE,{children:"Subscription Plans"}),(0,d.jsx)(a.ex,{children:(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>{$e({...Se,currency_prices:{}}),ge(!0)},children:"Create Plan"})})]}),(0,d.jsxs)(a.UC,{children:[(0,d.jsxs)(a.MD,{children:[(0,d.jsxs)(a.hI,{color:"#059669",children:[(0,d.jsx)(a.Os,{children:n.length}),(0,d.jsx)(a.v0,{children:"Total Plans"}),(0,d.jsxs)(a.d1,{children:[He," active"]})]}),(0,d.jsxs)(a.hI,{color:"#10B981",children:[(0,d.jsx)(a.Os,{children:He}),(0,d.jsx)(a.v0,{children:"Active Plans"}),(0,d.jsxs)(a.d1,{children:[n.length>0?Math.round(He/n.length*100):0,"% available"]})]}),(0,d.jsxs)(a.hI,{color:"#F59E0B",children:[(0,d.jsx)(a.Os,{children:Ke}),(0,d.jsx)(a.v0,{children:"Total Subscriptions"}),(0,d.jsx)(a.d1,{children:"Across all plans"})]}),(0,d.jsxs)(a.hI,{color:"#DC2626",children:[(0,d.jsx)(a.Os,{children:(0,l.vv)(Ve,le)}),(0,d.jsx)(a.v0,{children:"Fixed Monthly Revenue"}),(0,d.jsx)(a.d1,{children:"From fixed-type plans"})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:te,onChange:e=>ae(e.target.value)}),(0,d.jsxs)(s.Jt,{value:se,onChange:e=>oe(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsx)(s.Jt,{value:le,onChange:e=>ce(e.target.value),style:{minWidth:"150px"},children:xe.map(e=>{const n=de[e];return(0,d.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),t?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===Qe.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,d.jsx)(p,{children:Qe.map(e=>(0,d.jsxs)(x,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(B,{chargeType:e.charge_type||"fixed",children:"percentage"===e.charge_type?"% Revenue":"Fixed"}),(0,d.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{children:e.name}),e.description&&(0,d.jsx)(g,{children:e.description}),(0,d.jsx)(y,{children:"percentage"===e.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[parseFloat(e.percentage_value||"0"),"%"]}),(0,d.jsxs)(j,{children:["of revenue (",ne[e.revenue_base]||e.revenue_base,")"]})]}):We(e)?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(v,{children:[Le(e,"monthly"),(0,d.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Ne(e,"annual")>0&&Ne(e,"monthly")>0&&(0,d.jsxs)(m,{children:[Le(e,"annual"),"/year",12*Ne(e,"monthly")>Ne(e,"annual")&&(0,d.jsxs)("span",{children:[" (Save ",Math.round((12*Ne(e,"monthly")-Ne(e,"annual"))/(12*Ne(e,"monthly"))*100),"%)"]})]}),(0,d.jsx)(j,{children:"Billed monthly or annually"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(v,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,d.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",le,' price in "Prices"']})]})})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Billing Day"}),(0,d.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:e.billing_day?`Every ${e.billing_day}${1===e.billing_day?"st":2===e.billing_day?"nd":3===e.billing_day?"rd":"th"}`:"Subscription Start"})]}),e.auto_generate&&(0,d.jsxs)(G,{style:{marginTop:4},children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Auto-invoice"}),(0,d.jsx)("span",{style:{color:"#059669",fontWeight:600},children:"Enabled"})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,d.jsx)(b,{children:e.features.map((e,n)=>(0,d.jsx)(f,{children:e},n))}),(0,d.jsxs)(_,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:Ye(e)}),(0,d.jsx)(F,{children:"Subscriptions"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:"fixed"===e.charge_type?(0,l.vv)(Ne(e,"monthly")*Ye(e),le):`${parseFloat(e.percentage_value||"0")}% rev`}),(0,d.jsx)(F,{children:"fixed"===e.charge_type?"Monthly Revenue":"Revenue Based"})]})]}),(0,d.jsxs)(E,{children:[(0,d.jsx)(S,{variant:"primary",onClick:()=>(e=>{var n,r;Fe(e);let i={};if(e.prices)for(const s of e.prices){var t,a;i[s.currency]={monthly:(null===(t=s.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(a=s.annual_price)||void 0===a?void 0:a.toString())||"0"}}De({name:e.name,description:e.description||"",charge_type:e.charge_type||"fixed",percentage_value:(null===(n=e.percentage_value)||void 0===n?void 0:n.toString())||"0",revenue_base:e.revenue_base||"previous_month",billing_day:(null===(r=e.billing_day)||void 0===r?void 0:r.toString())||"",auto_generate:!1!==e.auto_generate,currency_prices:i,features:Array.isArray(e.features)?e.features.join("\n"):"",is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),ve(!0)})(e),children:"Edit"}),"fixed"===e.charge_type&&(0,d.jsx)(S,{variant:"secondary",onClick:()=>Je(e),children:"Prices"}),(0,d.jsx)(S,{variant:"secondary",onClick:()=>(e=>{Fe(e),je(!0)})(e),children:"View"})]})]},e.id))}),ue&&(0,d.jsx)(z,{onClick:()=>ge(!1),children:(0,d.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(P,{children:[(0,d.jsx)(D,{children:"Create New Plan"}),(0,d.jsx)(T,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Plan Name *"}),(0,d.jsx)(O,{type:"text",placeholder:"e.g., Royalty Fee, Monthly Rent, Management Fee",value:ze.name,onChange:e=>$e(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Description"}),(0,d.jsx)(W,{placeholder:"Enter plan description...",rows:3,value:ze.description,onChange:e=>$e(n=>({...n,description:e.target.value}))})]}),Xe(ze,$e),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Features (one per line)"}),(0,d.jsx)(W,{placeholder:"Enter features, one per line...",rows:4,value:ze.features,onChange:e=>$e(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:ze.auto_generate,onChange:e=>$e(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-popular",checked:ze.is_popular,onChange:e=>$e(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-active",checked:ze.is_active,onChange:e=>$e(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(ie)try{const e=localStorage.getItem("auth_token"),n={name:ze.name,description:ze.description||null,charge_type:ze.charge_type,billing_day:ze.billing_day?parseInt(ze.billing_day):null,auto_generate:ze.auto_generate,currency:"MYR",is_popular:ze.is_popular,is_active:ze.is_active,features:ze.features.split("\n").filter(e=>e.trim())};"percentage"===ze.charge_type?(n.percentage_value=parseFloat(ze.percentage_value)||0,n.revenue_base=ze.revenue_base):n.currency_prices=Object.fromEntries(Object.entries(ze.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));const r=await fetch(`/api/brands/${ie}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)ge(!1),$e({...Se,currency_prices:{}}),Oe(ie);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ye&&we&&(0,d.jsx)(z,{onClick:()=>ve(!1),children:(0,d.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(P,{children:[(0,d.jsxs)(D,{children:["Edit Plan: ",we.name]}),(0,d.jsx)(T,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Plan Name *"}),(0,d.jsx)(O,{type:"text",value:Pe.name,onChange:e=>De(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Description"}),(0,d.jsx)(W,{rows:3,value:Pe.description,onChange:e=>De(n=>({...n,description:e.target.value}))})]}),Xe(Pe,De),(0,d.jsxs)(I,{children:[(0,d.jsx)(M,{children:"Features (one per line)"}),(0,d.jsx)(W,{rows:4,value:Pe.features,onChange:e=>De(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:Pe.auto_generate,onChange:e=>De(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Pe.is_popular,onChange:e=>De(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-active",checked:Pe.is_active,onChange:e=>De(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=we.id,Me(e),void Re(!0);var e},children:"Delete"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(ie&&we)try{const e=localStorage.getItem("auth_token"),n={name:Pe.name,description:Pe.description||null,charge_type:Pe.charge_type,billing_day:Pe.billing_day?parseInt(Pe.billing_day):null,auto_generate:Pe.auto_generate,is_popular:Pe.is_popular,is_active:Pe.is_active,features:Pe.features.split("\n").filter(e=>e.trim())};"percentage"===Pe.charge_type&&(n.percentage_value=parseFloat(Pe.percentage_value)||0,n.revenue_base=Pe.revenue_base);const r=await fetch(`/api/brands/${ie}/plans/${we.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if("fixed"===Pe.charge_type&&Object.keys(Pe.currency_prices).length>0){const n=Object.fromEntries(Object.entries(Pe.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));await fetch(`/api/brands/${ie}/plans/${we.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}ve(!1),Oe(ie)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),me&&we&&(0,d.jsx)(z,{onClick:()=>je(!1),children:(0,d.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(P,{children:[(0,d.jsxs)(D,{children:["Plan Details: ",we.name]}),(0,d.jsx)(T,{onClick:()=>je(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsx)("h4",{children:"Plan Info"}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Plan ID"}),(0,d.jsx)(V,{children:we.id})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Name"}),(0,d.jsx)(V,{children:we.name})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Status"}),(0,d.jsx)(k,{isActive:we.is_active,children:we.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Charge Type"}),(0,d.jsx)(B,{chargeType:we.charge_type||"fixed",children:"percentage"===we.charge_type?"% Revenue":"Fixed"})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Popular Plan"}),(0,d.jsx)(V,{children:we.is_popular?"Yes":"No"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("h4",{children:"Billing"}),"percentage"===we.charge_type?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Revenue Percentage"}),(0,d.jsxs)(V,{children:[parseFloat(we.percentage_value||"0"),"%"]})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Revenue Base"}),(0,d.jsx)(V,{children:ne[we.revenue_base]||we.revenue_base})]})]}):(0,d.jsx)(d.Fragment,{children:xe.map(e=>{var n,r;const i=null===(n=we.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!i)return null;const t=parseFloat(i.monthly_price)||0,a=parseFloat(i.annual_price)||0;return 0===t&&0===a?null:(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=de[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Monthly"}),(0,d.jsx)(V,{children:(0,l.vv)(t,e)})]}),a>0&&(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Annual"}),(0,d.jsx)(V,{children:(0,l.vv)(a,e)})]})]},e)})}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Billing Day"}),(0,d.jsx)(V,{children:we.billing_day?`Every ${we.billing_day}th`:"Subscription Start Date"})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Auto-generate Invoices"}),(0,d.jsx)(V,{children:we.auto_generate?"Yes":"No"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("h4",{children:"Statistics"}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Current Subscriptions"}),(0,d.jsx)(V,{children:Ye(we)})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(K,{children:"Created Date"}),(0,d.jsx)(V,{children:new Date(we.createdAt).toLocaleDateString()})]})]}),Array.isArray(we.features)&&we.features.length>0&&(0,d.jsxs)(Q,{children:[(0,d.jsx)("h4",{children:"Features"}),(0,d.jsx)(b,{children:we.features.map((e,n)=>(0,d.jsx)(f,{children:e},n))})]}),(0,d.jsxs)(Q,{children:[(0,d.jsxs)("h4",{children:["Assigned Restaurants (",Ye(we),")"]}),we.planRestaurants&&we.planRestaurants.length>0?(0,d.jsx)(Z,{children:we.planRestaurants.map(e=>{var n;return(0,d.jsxs)(ee,{isAssigned:!0,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,d.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No restaurants assigned to this plan."}),(0,d.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Ue(we),children:"Manage Restaurant Assignments"})]})]})]})}),be&&we&&(0,d.jsx)(z,{onClick:()=>fe(!1),children:(0,d.jsxs)($,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,d.jsxs)(P,{children:[(0,d.jsxs)(D,{children:["Set Prices for ",we.name]}),(0,d.jsx)(T,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,d.jsx)("div",{style:{display:"grid",gap:"16px"},children:xe.map(e=>{var n,r;const i=de[e];return(0,d.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,d.jsx)("input",{type:"number",value:(null===(n=ke[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>Ce({...ke,[e]:{...ke[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,d.jsx)("input",{type:"number",value:(null===(r=ke[e])||void 0===r?void 0:r.annual)||"",onChange:n=>Ce({...ke,[e]:{...ke[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)})})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>fe(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(ie&&we)try{const e=localStorage.getItem("auth_token"),n=Object.fromEntries(Object.entries(ke).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}));(await fetch(`/api/brands/${ie}/plans/${we.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(fe(!1),Oe(ie))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})}),_e&&we&&(0,d.jsx)(z,{onClick:()=>Ae(!1),children:(0,d.jsxs)($,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,d.jsxs)(P,{children:[(0,d.jsxs)(D,{children:["Manage Restaurants: ",we.name]}),(0,d.jsx)(T,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,d.jsxs)(Z,{children:[Be.map(e=>{var n;const r=null===(n=we.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,d.jsxs)(ee,{isAssigned:r,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,d.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(ie&&we)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${ie}/plans/${we.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){Oe(ie);const e=await fetch(`/api/brands/${ie}/plans/${we.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();Fe(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(ie&&we)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${ie}/plans/${we.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_ids:[e]})})).ok){Oe(ie);const e=await fetch(`/api/brands/${ie}/plans/${we.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();Fe(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===Be.length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No restaurants found."})]})]}),(0,d.jsx)(U,{children:(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>Ae(!1),children:"Close"})})]})})]})]}),(0,d.jsx)(c.A,{isOpen:Te,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(ie&&Ie){Re(!1);try{const e=localStorage.getItem("auth_token");(await fetch(`/api/brands/${ie}/plans/${Ie}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&(ve(!1),Oe(ie))}catch(e){console.error("Error deleting plan:",e)}Me(null)}},onCancel:()=>{Re(!1),Me(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var i=r(4752),t=r(9610),a=r(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,o=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,d=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return n?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:y,onClick:x,children:u})]})]})}):null}}}]);