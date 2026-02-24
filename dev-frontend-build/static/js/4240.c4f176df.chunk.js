"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4240],{2488:(e,n,r)=>{r.d(n,{DO:()=>c,Jt:()=>d,Qn:()=>l});r(9950);var t=r(4752),i=r(4414);const a=t.Ay.div`
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
`,s=t.Ay.select`
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
`,l=e=>{let{children:n,className:r,style:t,...o}=e;return(0,i.jsx)(a,{className:r,style:t,...o,children:n})},c=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(o,{placeholder:n,...r})},d=e=>{let{children:n,...r}=e;return(0,i.jsx)(s,{...r,children:n})}},4240:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ee});var t=r(9950),i=r(4752),a=r(3310),o=r(2674),s=r(2488),l=r(1367),c=r(6038),d=r(4414);const p=i.Ay.div`
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
  min-height: 550px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${e=>e.isPopular&&"\n    &::before {\n      content: 'Most Popular';\n      position: absolute;\n      top: -12px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #635BFF;\n      color: white;\n      padding: 6px 16px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n  "}
`,h=i.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,u=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,g=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,y=i.Ay.div`
  text-align: center;
`,m=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,v=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,f=(i.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,i.Ay.span`
  font-size: 14px;
  color: #374151;
`,i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,i.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`),b=i.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,_=(i.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,i.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`),A=i.Ay.div`
  text-align: center;
`,F=i.Ay.div`
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
`,C=(i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`),S=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,B=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,E=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,z=i.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,$=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,R=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,P=i.Ay.button`
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

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,D=i.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,M=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,N=i.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,I=i.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,O=i.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,W=(i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`),Y=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    flex-shrink: 0;
    accent-color: #635BFF;
  }

  label {
    font-size: 14px;
    color: #0A2540;
    cursor: pointer;
  }
`,U=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,J=i.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,X=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,Q=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,V=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,q=i.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
`,G=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
`,H=i.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,K=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,Z=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};

  &:last-child {
    border-bottom: none;
  }
`,ee=()=>{const{user:e}=(0,l.As)(),[n,r]=(0,t.useState)([]),[i,ee]=(0,t.useState)(!0),ne=(null===e||void 0===e?void 0:e.brand_id)||null,[re,te]=(0,t.useState)(""),[ie,ae]=(0,t.useState)("all"),[oe,se]=(0,t.useState)("MYR"),[le,ce]=(0,t.useState)({}),[de,pe]=(0,t.useState)([]),[xe,he]=(0,t.useState)([]),[ue,ge]=(0,t.useState)(!1),[ye,me]=(0,t.useState)(!1),[je,ve]=(0,t.useState)(!1),[fe,be]=(0,t.useState)(!1),[_e,Ae]=(0,t.useState)(!1),[Fe,we]=(0,t.useState)(null),[ke,Ce]=(0,t.useState)({}),[Se,Be]=(0,t.useState)([]),Ee={name:"",description:"",category:"custom",subscription_fee:"0",revenue_percentage:"0",rent_type:"none",rent_fixed:"0",rent_percentage:"0",billing_cycle:"monthly",auto_generate:!0,tax_rate:"6",currency_prices:{},menu_item_limit:"-1",order_limit:"-1",staff_limit:"-1",features:"",included_modules:[],is_popular:!1,is_active:!0},[ze,$e]=(0,t.useState)(Ee),[Re,Pe]=(0,t.useState)(Ee),De=(0,t.useCallback)(async e=>{try{ee(!0);const n=localStorage.getItem("auth_token"),t=await fetch(`/api/brands/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{ee(!1)}},[]);(0,t.useEffect)(()=>{ne&&De(ne),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();ce(n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=await e.json();pe((n.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),pe(["MYR"])}})(),(async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(e.ok){const n=await e.json();he(Array.isArray(n)?n:[])}}catch(e){console.error("Error fetching addon modules:",e),he([])}})()},[ne,De]);const Me=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===oe);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},Te=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===oe);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Ne=(e,n)=>{if(!Te(e))return"Not Set";const r=Me(e,n);return(0,c.vv)(r,oe)},Ie=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},Oe=e=>{we(e),ne&&(async(e,n)=>{try{const i=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(a.ok){const e=await a.json(),n=e.success?e.data:Array.isArray(e)?e:[],i={};for(const a of n){var r,t;i[a.currency]={monthly:(null===(r=a.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=a.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of de)i[r]||(i[r]={monthly:"0",annual:"0"});Ce(i)}}catch(i){console.error("Error fetching plan prices:",i)}})(ne,e.id),be(!0)},Le=e=>{we(e),ne&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/brands/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();Be(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching brand restaurants:",n)}})(ne),Ae(!0)},We=n.filter(e=>{const n=e.name.toLowerCase().includes(re.toLowerCase())||(e.description||"").toLowerCase().includes(re.toLowerCase()),r="all"===ie||"active"===ie&&e.is_active||"inactive"===ie&&!e.is_active;return n&&r}),Ye=n.filter(e=>e.is_active).length,Ue=n.reduce((e,n)=>e+Ie(n),0),Je=n.reduce((e,n)=>e+Me(n,"monthly")*Ie(n),0),Xe=(e,n)=>(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Pricing by Currency"}),(0,d.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[de.map(r=>{var t,i,a,o;const s=le[r];return(0,d.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===s||void 0===s?void 0:s.symbol)||r," ",r," - ",(null===s||void 0===s?void 0:s.name)||r]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(M,{style:{marginBottom:0},children:[(0,d.jsx)(T,{style:{fontSize:"12px"},children:"Monthly"}),(0,d.jsx)(N,{type:"number",placeholder:"0",value:(null===(t=e.currency_prices)||void 0===t||null===(i=t[r])||void 0===i?void 0:i.monthly)||"",onChange:e=>n(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[r],monthly:e.target.value}}}})})]}),(0,d.jsxs)(M,{style:{marginBottom:0},children:[(0,d.jsx)(T,{style:{fontSize:"12px"},children:"Annual"}),(0,d.jsx)(N,{type:"number",placeholder:"0",value:(null===(a=e.currency_prices)||void 0===a||null===(o=a[r])||void 0===o?void 0:o.annual)||"",onChange:e=>n(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[r],annual:e.target.value}}}})})]})]})]},r)}),0===de.length&&(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),Qe=(e,n)=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(H,{children:"Brand Charges"}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Subscription Fee (Monthly)"}),(0,d.jsx)(N,{type:"number",placeholder:"0",value:e.subscription_fee,onChange:e=>n(n=>({...n,subscription_fee:e.target.value}))})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Revenue Royalty (%)"}),(0,d.jsx)(N,{type:"number",placeholder:"0",step:"0.01",value:e.revenue_percentage,onChange:e=>n(n=>({...n,revenue_percentage:e.target.value}))})]})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Rent Type"}),(0,d.jsxs)(I,{value:e.rent_type,onChange:e=>n(n=>({...n,rent_type:e.target.value})),children:[(0,d.jsx)("option",{value:"none",children:"No Rent"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount"}),(0,d.jsx)("option",{value:"percentage",children:"Revenue Percentage"}),(0,d.jsx)("option",{value:"combined",children:"Combined (MAX of fixed, percentage)"})]})]}),("fixed"===e.rent_type||"combined"===e.rent_type)&&(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Rent Fixed Amount"}),(0,d.jsx)(N,{type:"number",placeholder:"0",value:e.rent_fixed,onChange:e=>n(n=>({...n,rent_fixed:e.target.value}))})]}),("percentage"===e.rent_type||"combined"===e.rent_type)&&(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Rent Percentage (%)"}),(0,d.jsx)(N,{type:"number",placeholder:"0",step:"0.01",value:e.rent_percentage,onChange:e=>n(n=>({...n,rent_percentage:e.target.value}))})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Tax Rate (%)"}),(0,d.jsx)(N,{type:"number",placeholder:"6",step:"0.01",value:e.tax_rate,onChange:e=>n(n=>({...n,tax_rate:e.target.value}))})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Billing Cycle"}),(0,d.jsxs)(I,{value:e.billing_cycle,onChange:e=>n(n=>({...n,billing_cycle:e.target.value})),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual"})]})]})]})]});return(0,d.jsx)(a.A,{children:(0,d.jsxs)(o.mc,{children:[(0,d.jsxs)(o.Y9,{children:[(0,d.jsx)(o.hE,{children:"Subscription Plans"}),(0,d.jsxs)(o.ex,{children:[(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>{const e=[["Plan Name","Category","Status","Subscription Fee","Revenue %","Rent Type","Billing Cycle","Restaurants","Created"].join(",")];n.forEach(n=>{e.push([`"${n.name}"`,n.category,n.is_active?"Active":"Inactive",n.subscription_fee,n.revenue_percentage,n.rent_type,n.billing_cycle,Ie(n).toString(),new Date(n.createdAt).toLocaleDateString()].join(","))});const r=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(r),i=document.createElement("a");i.href=t,i.download=`brand-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"}),(0,d.jsx)(o.$n,{variant:"primary",onClick:()=>{$e({...Ee,currency_prices:{}}),ge(!0)},children:"Create Plan"})]})]}),(0,d.jsxs)(o.UC,{children:[(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{color:"#059669",children:[(0,d.jsx)(o.Os,{children:n.length}),(0,d.jsx)(o.v0,{children:"Total Plans"}),(0,d.jsxs)(o.d1,{children:[Ye," active"]})]}),(0,d.jsxs)(o.hI,{color:"#10B981",children:[(0,d.jsx)(o.Os,{children:Ye}),(0,d.jsx)(o.v0,{children:"Active Plans"}),(0,d.jsxs)(o.d1,{children:[n.length>0?Math.round(Ye/n.length*100):0,"% available"]})]}),(0,d.jsxs)(o.hI,{color:"#F59E0B",children:[(0,d.jsx)(o.Os,{children:Ue}),(0,d.jsx)(o.v0,{children:"Total Subscriptions"}),(0,d.jsx)(o.d1,{children:"Across all plans"})]}),(0,d.jsxs)(o.hI,{color:"#DC2626",children:[(0,d.jsx)(o.Os,{children:(0,c.vv)(Je,oe)}),(0,d.jsx)(o.v0,{children:"Monthly Revenue"}),(0,d.jsx)(o.d1,{children:"From all subscriptions"})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:re,onChange:e=>te(e.target.value)}),(0,d.jsxs)(s.Jt,{value:ie,onChange:e=>ae(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsx)(s.Jt,{value:oe,onChange:e=>se(e.target.value),style:{minWidth:"150px"},children:de.map(e=>{const n=le[e];return(0,d.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),i?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===We.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,d.jsx)(p,{children:We.map(e=>(0,d.jsxs)(x,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,d.jsx)(C,{children:(0,d.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{children:e.name}),e.description&&(0,d.jsx)(g,{children:e.description}),(0,d.jsx)(y,{children:Te(e)?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(m,{children:[Ne(e,"monthly"),(0,d.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Me(e,"annual")>0&&Me(e,"monthly")>0&&(0,d.jsxs)(j,{children:[Ne(e,"annual"),"/year",12*Me(e,"monthly")>Me(e,"annual")&&(0,d.jsxs)("span",{children:[" (Save ",Math.round((12*Me(e,"monthly")-Me(e,"annual"))/(12*Me(e,"monthly"))*100),"%)"]})]}),(0,d.jsx)(v,{children:"Billed monthly or annually"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,d.jsxs)(v,{style:{color:"#F59E0B"},children:["Set ",oe,' price in "Prices" button']})]})})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Subscription Fee"}),(0,d.jsxs)("span",{style:{color:"#0A2540",fontWeight:600},children:[(0,c.vv)(parseFloat(e.subscription_fee)||0,e.currency||"MYR"),"/mo"]})]}),parseFloat(e.revenue_percentage)>0&&(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{style:{color:"#92400E",fontWeight:500},children:"Revenue Royalty"}),(0,d.jsxs)("span",{style:{color:"#0A2540",fontWeight:600},children:[e.revenue_percentage,"%"]})]}),"none"!==e.rent_type&&(0,d.jsxs)(G,{children:[(0,d.jsxs)("span",{style:{color:"#92400E",fontWeight:500},children:["Rent (",e.rent_type,")"]}),(0,d.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:"fixed"===e.rent_type?(0,c.vv)(parseFloat(e.rent_fixed)||0,e.currency||"MYR"):"percentage"===e.rent_type?`${e.rent_percentage}%`:`MAX(${(0,c.vv)(parseFloat(e.rent_fixed)||0,e.currency||"MYR")}, ${e.rent_percentage}%)`})]})]}),Array.isArray(e.features)&&e.features.length>0&&(0,d.jsx)(f,{children:e.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))}),(0,d.jsxs)(_,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:Ie(e)}),(0,d.jsx)(w,{children:"Subscriptions"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:(0,c.vv)(Me(e,"monthly")*Ie(e),oe)}),(0,d.jsx)(w,{children:"Monthly Revenue"})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{variant:"primary",onClick:()=>(async e=>{var n,r,t,i,a,o,s,l;we(e);let c={};if(e.prices)for(const x of e.prices){var d,p;c[x.currency]={monthly:(null===(d=x.monthly_price)||void 0===d?void 0:d.toString())||"0",annual:(null===(p=x.annual_price)||void 0===p?void 0:p.toString())||"0"}}Pe({name:e.name,description:e.description||"",category:e.category||"custom",subscription_fee:(null===(n=e.subscription_fee)||void 0===n?void 0:n.toString())||"0",revenue_percentage:(null===(r=e.revenue_percentage)||void 0===r?void 0:r.toString())||"0",rent_type:e.rent_type||"none",rent_fixed:(null===(t=e.rent_fixed)||void 0===t?void 0:t.toString())||"0",rent_percentage:(null===(i=e.rent_percentage)||void 0===i?void 0:i.toString())||"0",billing_cycle:e.billing_cycle||"monthly",auto_generate:!1!==e.auto_generate,tax_rate:(null===(a=e.tax_rate)||void 0===a?void 0:a.toString())||"6",currency_prices:c,menu_item_limit:(null===(o=e.menu_item_limit)||void 0===o?void 0:o.toString())||"-1",order_limit:(null===(s=e.order_limit)||void 0===s?void 0:s.toString())||"-1",staff_limit:(null===(l=e.staff_limit)||void 0===l?void 0:l.toString())||"-1",features:Array.isArray(e.features)?e.features.join("\n"):"",included_modules:Array.isArray(e.included_modules)?e.included_modules:[],is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),me(!0)})(e),children:"Edit"}),(0,d.jsx)(B,{variant:"secondary",onClick:()=>Oe(e),children:"Prices"}),(0,d.jsx)(B,{variant:"secondary",onClick:()=>(e=>{we(e),ve(!0)})(e),children:"View"})]})]},e.id))}),ue&&(0,d.jsx)(E,{onClick:()=>ge(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)($,{children:[(0,d.jsx)(R,{children:"Create New Plan"}),(0,d.jsx)(P,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,d.jsxs)(D,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Plan Name *"}),(0,d.jsx)(N,{type:"text",placeholder:"e.g., Standard Franchise Plan",value:ze.name,onChange:e=>$e(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Description"}),(0,d.jsx)(O,{placeholder:"Enter plan description...",rows:3,value:ze.description,onChange:e=>$e(n=>({...n,description:e.target.value}))})]}),Xe(ze,$e),Qe(ze,$e),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Features (one per line)"}),(0,d.jsx)(O,{placeholder:"Enter features, one per line...",rows:6,value:ze.features,onChange:e=>$e(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(W,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:ze.auto_generate,onChange:e=>$e(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-popular",checked:ze.is_popular,onChange:e=>$e(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-active",checked:ze.is_active,onChange:e=>$e(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,d.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(ne)try{const e=localStorage.getItem("auth_token"),n={name:ze.name,description:ze.description||null,category:"custom",subscription_fee:parseFloat(ze.subscription_fee)||0,revenue_percentage:parseFloat(ze.revenue_percentage)||0,rent_type:ze.rent_type,rent_fixed:parseFloat(ze.rent_fixed)||0,rent_percentage:parseFloat(ze.rent_percentage)||0,billing_cycle:ze.billing_cycle,auto_generate:ze.auto_generate,tax_rate:parseFloat(ze.tax_rate)||0,currency:"MYR",is_popular:ze.is_popular,is_active:ze.is_active,features:ze.features.split("\n").filter(e=>e.trim()),included_modules:[],menu_item_limit:-1,order_limit:-1,staff_limit:-1,currency_prices:Object.fromEntries(Object.entries(ze.currency_prices).map(e=>{let[n,r]=e;return[n,{monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0}]}))},r=await fetch(`/api/brands/${ne}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok)ge(!1),$e({...Ee,currency_prices:{}}),De(ne);else{const e=await r.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ye&&Fe&&(0,d.jsx)(E,{onClick:()=>me(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)($,{children:[(0,d.jsxs)(R,{children:["Edit Plan: ",Fe.name]}),(0,d.jsx)(P,{onClick:()=>me(!1),children:"\xd7"})]}),(0,d.jsxs)(D,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Plan Name *"}),(0,d.jsx)(N,{type:"text",placeholder:"e.g., Standard Franchise Plan",value:Re.name,onChange:e=>Pe(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Description"}),(0,d.jsx)(O,{placeholder:"Enter plan description...",rows:3,value:Re.description,onChange:e=>Pe(n=>({...n,description:e.target.value}))})]}),Xe(Re,Pe),Qe(Re,Pe),(0,d.jsxs)(M,{children:[(0,d.jsx)(T,{children:"Features (one per line)"}),(0,d.jsx)(O,{placeholder:"Enter features, one per line...",rows:6,value:Re.features,onChange:e=>Pe(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(W,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:Re.auto_generate,onChange:e=>Pe(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Re.is_popular,onChange:e=>Pe(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-active",checked:Re.is_active,onChange:e=>Pe(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,d.jsx)(o.$n,{variant:"danger",onClick:()=>(async e=>{if(ne&&window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const n=localStorage.getItem("auth_token");(await fetch(`/api/brands/${ne}/plans/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&(me(!1),De(ne))}catch(n){console.error("Error deleting plan:",n)}})(Fe.id),children:"Delete"}),(0,d.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(ne&&Fe)try{const e=localStorage.getItem("auth_token"),n={name:Re.name,description:Re.description||null,category:"custom",subscription_fee:parseFloat(Re.subscription_fee)||0,revenue_percentage:parseFloat(Re.revenue_percentage)||0,rent_type:Re.rent_type,rent_fixed:parseFloat(Re.rent_fixed)||0,rent_percentage:parseFloat(Re.rent_percentage)||0,billing_cycle:Re.billing_cycle,auto_generate:Re.auto_generate,tax_rate:parseFloat(Re.tax_rate)||0,is_popular:Re.is_popular,is_active:Re.is_active,features:Re.features.split("\n").filter(e=>e.trim()),included_modules:[],menu_item_limit:-1,order_limit:-1,staff_limit:-1},r=await fetch(`/api/brands/${ne}/plans/${Fe.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(n)});if(r.ok){if(Re.currency_prices&&Object.keys(Re.currency_prices).length>0){const n=Object.entries(Re.currency_prices).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/brands/${ne}/plans/${Fe.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}me(!1),De(ne)}else{const e=await r.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),je&&Fe&&(0,d.jsx)(E,{onClick:()=>ve(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)($,{children:[(0,d.jsxs)(R,{children:["Plan Details: ",Fe.name]}),(0,d.jsx)(P,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,d.jsxs)(D,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)("h4",{children:"Plan Info"}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Plan ID"}),(0,d.jsx)(V,{children:Fe.id})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Name"}),(0,d.jsx)(V,{children:Fe.name})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Status"}),(0,d.jsx)(k,{isActive:Fe.is_active,children:Fe.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Popular Plan"}),(0,d.jsx)(V,{children:Fe.is_popular?"Yes":"No"})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("h4",{children:"Pricing"}),de.map(e=>{var n,r;const t=null===(n=Fe.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!t)return null;const i=parseFloat(t.monthly_price)||0,a=parseFloat(t.annual_price)||0;return 0===i&&0===a?null:(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=le[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Monthly"}),(0,d.jsx)(V,{children:(0,c.vv)(i,e)})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Annual"}),(0,d.jsx)(V,{children:(0,c.vv)(a,e)})]}),i>0&&a>0&&12*i>a&&(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Annual Discount"}),(0,d.jsxs)(V,{style:{color:"#059669"},children:[Math.round((12*i-a)/(12*i)*100),"%"]})]})]},e)})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("h4",{children:"Brand Charges"}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Subscription Fee"}),(0,d.jsxs)(V,{children:[(0,c.vv)(parseFloat(Fe.subscription_fee)||0,Fe.currency||"MYR"),"/mo"]})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Revenue Royalty"}),(0,d.jsxs)(V,{children:[Fe.revenue_percentage,"%"]})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Rent Type"}),(0,d.jsx)(V,{children:Fe.rent_type})]}),"none"!==Fe.rent_type&&(0,d.jsxs)(d.Fragment,{children:[("fixed"===Fe.rent_type||"combined"===Fe.rent_type)&&(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Rent Fixed"}),(0,d.jsx)(V,{children:(0,c.vv)(parseFloat(Fe.rent_fixed)||0,Fe.currency||"MYR")})]}),("percentage"===Fe.rent_type||"combined"===Fe.rent_type)&&(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Rent Percentage"}),(0,d.jsxs)(V,{children:[Fe.rent_percentage,"%"]})]})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Tax Rate"}),(0,d.jsxs)(V,{children:[Fe.tax_rate,"%"]})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Billing Cycle"}),(0,d.jsx)(V,{children:Fe.billing_cycle})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Auto-generate Invoices"}),(0,d.jsx)(V,{children:Fe.auto_generate?"Yes":"No"})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)("h4",{children:"Statistics"}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Current Subscriptions"}),(0,d.jsx)(V,{children:Ie(Fe)})]}),(0,d.jsxs)(X,{children:[(0,d.jsx)(Q,{children:"Created Date"}),(0,d.jsx)(V,{children:new Date(Fe.createdAt).toLocaleDateString()})]})]}),Array.isArray(Fe.features)&&Fe.features.length>0&&(0,d.jsxs)(J,{children:[(0,d.jsx)("h4",{children:"Features"}),(0,d.jsx)(f,{children:Fe.features.map((e,n)=>(0,d.jsx)(b,{children:e},n))})]}),(0,d.jsxs)(J,{children:[(0,d.jsxs)("h4",{children:["Assigned Restaurants (",Ie(Fe),")"]}),Fe.planRestaurants&&Fe.planRestaurants.length>0?(0,d.jsx)(K,{children:Fe.planRestaurants.map(e=>{var n;return(0,d.jsxs)(Z,{isAssigned:!0,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,d.jsx)(k,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No restaurants assigned to this plan."}),(0,d.jsx)(o.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>Le(Fe),children:"Manage Restaurant Assignments"})]})]})]})}),fe&&Fe&&(0,d.jsx)(E,{onClick:()=>be(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,d.jsxs)($,{children:[(0,d.jsxs)(R,{children:["Set Prices for ",Fe.name]}),(0,d.jsx)(P,{onClick:()=>be(!1),children:"\xd7"})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,d.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[de.map(e=>{var n,r;const t=le[e];return(0,d.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===t||void 0===t?void 0:t.symbol)||e}),(null===t||void 0===t?void 0:t.name)||e," (",e,")"]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,d.jsx)("input",{type:"number",value:(null===(n=ke[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>Ce({...ke,[e]:{...ke[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,d.jsx)("input",{type:"number",value:(null===(r=ke[e])||void 0===r?void 0:r.annual)||"",onChange:n=>Ce({...ke,[e]:{...ke[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)}),0===de.length&&(0,d.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,d.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(ne&&Fe)try{const e=localStorage.getItem("auth_token"),n=Object.entries(ke).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});(await fetch(`/api/brands/${ne}/plans/${Fe.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(be(!1),De(ne))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})}),_e&&Fe&&(0,d.jsx)(E,{onClick:()=>Ae(!1),children:(0,d.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,d.jsxs)($,{children:[(0,d.jsxs)(R,{children:["Manage Restaurants: ",Fe.name]}),(0,d.jsx)(P,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove restaurants from this plan."}),(0,d.jsxs)(K,{children:[Se.map(e=>{var n;const r=null===(n=Fe.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,d.jsxs)(Z,{isAssigned:r,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,d.jsx)(o.$n,{variant:"danger",onClick:()=>(async e=>{if(ne&&Fe)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${ne}/plans/${Fe.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){De(ne);const e=await fetch(`/api/brands/${ne}/plans/${Fe.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();we(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,d.jsx)(o.$n,{variant:"primary",onClick:()=>(async e=>{if(ne&&Fe)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/brands/${ne}/plans/${Fe.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_id:e})})).ok){De(ne);const e=await fetch(`/api/brands/${ne}/plans/${Fe.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();we(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===Se.length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No restaurants found in your brand."})]})]}),(0,d.jsx)(U,{children:(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>Ae(!1),children:"Close"})})]})})]})]})})}}}]);