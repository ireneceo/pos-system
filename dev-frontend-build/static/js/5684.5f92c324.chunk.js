"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{2488:(e,n,r)=>{r.d(n,{DO:()=>c,Jt:()=>d,Qn:()=>l});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
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
`,a=t.Ay.input`
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
`,l=e=>{let{children:n,className:r,style:t,...a}=e;return(0,i.jsx)(o,{className:r,style:t,...a,children:n})},c=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:n,...r})},d=e=>{let{children:n,...r}=e;return(0,i.jsx)(s,{...r,children:n})}},5684:(e,n,r)=>{r.r(n),r.d(n,{default:()=>de});var t=r(9950),i=r(4752),o=r(3310),a=r(2674),s=r(2488),l=r(1367),c=r(6038),d=r(4414);const p=i.Ay.div`
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
`,m=i.Ay.div`
  text-align: center;
`,y=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,f=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,v=i.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,b=i.Ay.span`
  font-size: 14px;
  color: #374151;
`,A=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=i.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,w=i.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,k=i.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,C=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,S=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,B=i.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,z=i.Ay.div`
  text-align: center;
`,$=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,P=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,R=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,M=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,T=i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,I=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,D=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,L=i.Ay.div`
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
`,N=i.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,O=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,W=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,Y=i.Ay.button`
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
`,U=i.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,J=i.Ay.div`
  margin-bottom: 20px;
`,X=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,Q=i.Ay.input`
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
`,V=i.Ay.select`
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
`,q=i.Ay.textarea`
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
`,G=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,H=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,K=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,Z=i.Ay.div`
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
`,ee=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,ne=i.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,re=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,te=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ie=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,oe=i.Ay.div`
  margin: 8px 0;
  padding: 12px 16px;
  background: #EFF6FF;
  border-radius: 8px;
  border: 1px solid #BFDBFE;
`,ae=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;

  &:last-child {
    margin-bottom: 0;
  }
`,se=i.Ay.div`
  margin: 20px 0;
  padding: 12px 0 4px;
  border-top: 2px solid #E6EBF1;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
`,le=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,ce=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
  background: ${e=>e.isAssigned?"#F0FDF4":"white"};

  &:last-child {
    border-bottom: none;
  }
`,de=()=>{const{user:e}=(0,l.As)(),[n,r]=(0,t.useState)([]),[i,de]=(0,t.useState)(!0),[pe,xe]=(0,t.useState)(null),[he,ue]=(0,t.useState)(""),[ge,me]=(0,t.useState)("all"),[ye,je]=(0,t.useState)("all"),[fe,ve]=(0,t.useState)("MYR"),[_e,be]=(0,t.useState)({}),[Ae,Fe]=(0,t.useState)([]),[we,ke]=(0,t.useState)([]),[Ce,Se]=(0,t.useState)(!1),[Be,Ee]=(0,t.useState)(!1),[ze,$e]=(0,t.useState)(!1),[Pe,Re]=(0,t.useState)(!1),[Me,Te]=(0,t.useState)(!1),[Ie,De]=(0,t.useState)(null),[Le,Ne]=(0,t.useState)({}),[Oe,We]=(0,t.useState)([]),Ye={name:"",description:"",category:"custom",subscription_fee:"0",revenue_percentage:"0",rent_type:"none",rent_fixed:"0",rent_percentage:"0",billing_cycle:"monthly",auto_generate:!0,tax_rate:"6",currency_prices:{},menu_item_limit:"-1",order_limit:"-1",staff_limit:"-1",features:"",included_modules:[],is_popular:!1,is_active:!0},[Ue,Je]=(0,t.useState)(Ye),[Xe,Qe]=(0,t.useState)(Ye),Ve=(0,t.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/foodcourts/my-foodcourt",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.success&&e.data)return xe(e.data.id),e.data.id}}catch(e){console.error("Error fetching foodcourt:",e)}return null},[]),qe=(0,t.useCallback)(async e=>{try{de(!0);const n=localStorage.getItem("auth_token"),t=await fetch(`/api/foodcourts/${e}/plans`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json();r(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching plans:",n)}finally{de(!1)}},[]);(0,t.useEffect)(()=>{(async()=>{const e=await Ve();e&&qe(e)})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();be(n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const n=await e.json();Fe((n.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),Fe(["MYR"])}})(),(async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(e.ok){const n=await e.json();ke(Array.isArray(n)?n:[])}}catch(e){console.error("Error fetching addon modules:",e),ke([])}})()},[Ve,qe]);const Ge=e=>-1===e?"Unlimited":e.toLocaleString(),He=(e,n)=>{if(e.prices&&e.prices.length>0){const r=e.prices.find(e=>e.currency===fe);if(r)return parseFloat("monthly"===n?r.monthly_price:r.annual_price)||0}return 0},Ke=e=>{if(e.prices&&e.prices.length>0){const n=e.prices.find(e=>e.currency===fe);return!(!n||!(parseFloat(n.monthly_price)>0||parseFloat(n.annual_price)>0))}return!1},Ze=(e,n)=>{if(!Ke(e))return"Not Set";const r=He(e,n);return(0,c.vv)(r,fe)},en=e=>{var n;return(null===(n=e.planRestaurants)||void 0===n?void 0:n.filter(e=>e.is_active).length)||0},nn=e=>{De(e),pe&&(async(e,n)=>{try{const i=localStorage.getItem("auth_token"),o=await fetch(`/api/foodcourts/${e}/plans/${n}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(o.ok){const e=await o.json(),n=e.success?e.data:Array.isArray(e)?e:[],i={};for(const o of n){var r,t;i[o.currency]={monthly:(null===(r=o.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=o.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of Ae)i[r]||(i[r]={monthly:"0",annual:"0"});Ne(i)}}catch(i){console.error("Error fetching plan prices:",i)}})(pe,e.id),Re(!0)},rn=e=>{De(e),pe&&(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${e}/restaurants`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();We(e.success?e.data:Array.isArray(e)?e:[])}}catch(n){console.error("Error fetching foodcourt restaurants:",n)}})(pe),Te(!0)},tn=n.filter(e=>{const n=e.name.toLowerCase().includes(he.toLowerCase())||(e.description||"").toLowerCase().includes(he.toLowerCase()),r="all"===ge||e.category===ge,t="all"===ye||"active"===ye&&e.is_active||"inactive"===ye&&!e.is_active;return n&&r&&t}),on=n.filter(e=>e.is_active).length,an=n.reduce((e,n)=>e+en(n),0),sn=n.reduce((e,n)=>e+He(n,"monthly")*en(n),0),ln=n.filter(e=>"basic"===e.category).length,cn=n.filter(e=>"custom"===e.category).length,dn=(e,n)=>(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Pricing by Currency"}),(0,d.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(r=>{var t,i,o,a;const s=_e[r];return(0,d.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===s||void 0===s?void 0:s.symbol)||r," ",r," - ",(null===s||void 0===s?void 0:s.name)||r]}),(0,d.jsxs)(G,{children:[(0,d.jsxs)(J,{style:{marginBottom:0},children:[(0,d.jsx)(X,{style:{fontSize:"12px"},children:"Monthly"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",value:(null===(t=e.currency_prices)||void 0===t||null===(i=t[r])||void 0===i?void 0:i.monthly)||"",onChange:e=>n(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[r],monthly:e.target.value}}}})})]}),(0,d.jsxs)(J,{style:{marginBottom:0},children:[(0,d.jsx)(X,{style:{fontSize:"12px"},children:"Annual"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",value:(null===(o=e.currency_prices)||void 0===o||null===(a=o[r])||void 0===a?void 0:a.annual)||"",onChange:e=>n(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[r]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[r],annual:e.target.value}}}})})]})]})]},r)}),0===Ae.length&&(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),pn=(e,n)=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(se,{children:"Foodcourt Charges"}),(0,d.jsxs)(G,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Management Fee (Monthly)"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",value:e.subscription_fee,onChange:e=>n(n=>({...n,subscription_fee:e.target.value}))})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Revenue Share (%)"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",step:"0.01",value:e.revenue_percentage,onChange:e=>n(n=>({...n,revenue_percentage:e.target.value}))})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Rent Type"}),(0,d.jsxs)(V,{value:e.rent_type,onChange:e=>n(n=>({...n,rent_type:e.target.value})),children:[(0,d.jsx)("option",{value:"none",children:"No Rent"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount"}),(0,d.jsx)("option",{value:"percentage",children:"Revenue Percentage"}),(0,d.jsx)("option",{value:"combined",children:"Combined (MAX of fixed, percentage)"})]})]}),("fixed"===e.rent_type||"combined"===e.rent_type)&&(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Rent Fixed Amount"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",value:e.rent_fixed,onChange:e=>n(n=>({...n,rent_fixed:e.target.value}))})]}),("percentage"===e.rent_type||"combined"===e.rent_type)&&(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Rent Percentage (%)"}),(0,d.jsx)(Q,{type:"number",placeholder:"0",step:"0.01",value:e.rent_percentage,onChange:e=>n(n=>({...n,rent_percentage:e.target.value}))})]}),(0,d.jsxs)(G,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Tax Rate (%)"}),(0,d.jsx)(Q,{type:"number",placeholder:"6",step:"0.01",value:e.tax_rate,onChange:e=>n(n=>({...n,tax_rate:e.target.value}))})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Billing Cycle"}),(0,d.jsxs)(V,{value:e.billing_cycle,onChange:e=>n(n=>({...n,billing_cycle:e.target.value})),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual"})]})]})]})]}),xn=(e,n,r)=>(0,d.jsxs)(d.Fragment,{children:["basic"===e.category&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(se,{children:"Limits"}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Menu Item Limit"}),(0,d.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:e.menu_item_limit,onChange:e=>n(n=>({...n,menu_item_limit:e.target.value}))})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Order Limit (per month)"}),(0,d.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:e.order_limit,onChange:e=>n(n=>({...n,order_limit:e.target.value}))})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Staff Limit"}),(0,d.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:e.staff_limit,onChange:e=>n(n=>({...n,staff_limit:e.target.value}))})]})]}),"basic"===e.category&&(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Included Modules"}),we.filter(e=>"basic"===e.category&&("foodcourt"===e.target_user_type||"all"===e.target_user_type)).length>0&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,d.jsx)(K,{children:we.filter(e=>"basic"===e.category&&("foodcourt"===e.target_user_type||"all"===e.target_user_type)).map(t=>{const i=e.included_modules.includes(t.module_code);return(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:`${r}-module-${t.module_code}`,checked:i,onChange:e=>{e.target.checked?n(e=>({...e,included_modules:[...e.included_modules,t.module_code]})):n(e=>({...e,included_modules:e.included_modules.filter(e=>e!==t.module_code)}))}}),(0,d.jsxs)("label",{htmlFor:`${r}-module-${t.module_code}`,children:[(0,d.jsx)("strong",{children:t.name}),(0,d.jsx)("br",{}),(0,d.jsx)("small",{style:{color:"#6B7280"},children:t.description})]})]},t.module_code)})})]}),we.filter(e=>"advanced"===e.category&&("foodcourt"===e.target_user_type||"all"===e.target_user_type)).length>0&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,d.jsx)(K,{children:we.filter(e=>"advanced"===e.category&&("foodcourt"===e.target_user_type||"all"===e.target_user_type)).map(t=>{const i=e.included_modules.includes(t.module_code);return(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:`${r}-module-${t.module_code}`,checked:i,onChange:e=>{e.target.checked?n(e=>({...e,included_modules:[...e.included_modules,t.module_code]})):n(e=>({...e,included_modules:e.included_modules.filter(e=>e!==t.module_code)}))}}),(0,d.jsxs)("label",{htmlFor:`${r}-module-${t.module_code}`,children:[(0,d.jsx)("strong",{children:t.name}),(0,d.jsx)("br",{}),(0,d.jsx)("small",{style:{color:"#6B7280"},children:t.description})]})]},t.module_code)})})]})]})]});return(0,d.jsx)(o.A,{children:(0,d.jsxs)(a.mc,{children:[(0,d.jsxs)(a.Y9,{children:[(0,d.jsx)(a.hE,{children:"Subscription Plans"}),(0,d.jsxs)(a.ex,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>{const e=[["Plan Name","Category","Status","Management Fee","Revenue Share %","Rent Type","Billing Cycle","Tenants","Created"].join(",")];n.forEach(n=>{e.push([`"${n.name}"`,n.category,n.is_active?"Active":"Inactive",n.subscription_fee,n.revenue_percentage,n.rent_type,n.billing_cycle,en(n).toString(),new Date(n.createdAt).toLocaleDateString()].join(","))});const r=new Blob([e.join("\n")],{type:"text/csv"}),t=window.URL.createObjectURL(r),i=document.createElement("a");i.href=t,i.download=`foodcourt-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(t),document.body.removeChild(i)},children:"Export"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>{Je({...Ye,currency_prices:{}}),Se(!0)},children:"Create Plan"})]})]}),(0,d.jsxs)(a.UC,{children:[(0,d.jsxs)(a.MD,{children:[(0,d.jsxs)(a.hI,{color:"#059669",children:[(0,d.jsx)(a.Os,{children:n.length}),(0,d.jsx)(a.v0,{children:"Total Plans"}),(0,d.jsxs)(a.d1,{children:[ln," basic + ",cn," custom"]})]}),(0,d.jsxs)(a.hI,{color:"#10B981",children:[(0,d.jsx)(a.Os,{children:on}),(0,d.jsx)(a.v0,{children:"Active Plans"}),(0,d.jsxs)(a.d1,{children:[n.length>0?Math.round(on/n.length*100):0,"% available"]})]}),(0,d.jsxs)(a.hI,{color:"#F59E0B",children:[(0,d.jsx)(a.Os,{children:an}),(0,d.jsx)(a.v0,{children:"Total Tenants"}),(0,d.jsx)(a.d1,{children:"Across all plans"})]}),(0,d.jsxs)(a.hI,{color:"#DC2626",children:[(0,d.jsx)(a.Os,{children:(0,c.vv)(sn,fe)}),(0,d.jsx)(a.v0,{children:"Monthly Revenue"}),(0,d.jsx)(a.d1,{children:"From all tenants"})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:he,onChange:e=>ue(e.target.value)}),(0,d.jsxs)(s.Jt,{value:ge,onChange:e=>me(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,d.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,d.jsxs)(s.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsx)(s.Jt,{value:fe,onChange:e=>ve(e.target.value),style:{minWidth:"150px"},children:Ae.map(e=>{const n=_e[e];return(0,d.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})})]}),i?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:"Loading plans..."}):0===tn.length?(0,d.jsx)("div",{style:{textAlign:"center",padding:"60px 0",color:"#6B7280"},children:0===n.length?'No plans created yet. Click "Create Plan" to get started.':"No plans match your filters."}):(0,d.jsx)(p,{children:tn.map(e=>(0,d.jsxs)(x,{isPopular:e.is_popular,isActive:e.is_active,children:[(0,d.jsxs)(T,{children:[(0,d.jsx)(M,{category:e.category||"custom",children:"basic"===e.category?"Basic":"Custom"}),(0,d.jsx)(R,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{children:e.name}),e.description&&(0,d.jsx)(g,{children:e.description}),(0,d.jsx)(m,{children:Ke(e)?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(y,{children:[Ze(e,"monthly"),(0,d.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),He(e,"annual")>0&&He(e,"monthly")>0&&(0,d.jsxs)(j,{children:[Ze(e,"annual"),"/year",12*He(e,"monthly")>He(e,"annual")&&(0,d.jsxs)("span",{children:[" (Save ",Math.round((12*He(e,"monthly")-He(e,"annual"))/(12*He(e,"monthly"))*100),"%)"]})]}),(0,d.jsx)(f,{children:"Billed monthly or annually"})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(y,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,d.jsxs)(f,{style:{color:"#F59E0B"},children:["Set ",fe,' price in "Prices" button']})]})})]}),(0,d.jsxs)(oe,{children:[(0,d.jsxs)(ae,{children:[(0,d.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Management Fee"}),(0,d.jsxs)("span",{style:{color:"#0A2540",fontWeight:600},children:[(0,c.vv)(parseFloat(e.subscription_fee)||0,e.currency||"MYR"),"/mo"]})]}),parseFloat(e.revenue_percentage)>0&&(0,d.jsxs)(ae,{children:[(0,d.jsx)("span",{style:{color:"#1E40AF",fontWeight:500},children:"Revenue Share"}),(0,d.jsxs)("span",{style:{color:"#0A2540",fontWeight:600},children:[e.revenue_percentage,"%"]})]}),"none"!==e.rent_type&&(0,d.jsxs)(ae,{children:[(0,d.jsxs)("span",{style:{color:"#1E40AF",fontWeight:500},children:["Rent (",e.rent_type,")"]}),(0,d.jsx)("span",{style:{color:"#0A2540",fontWeight:600},children:"fixed"===e.rent_type?(0,c.vv)(parseFloat(e.rent_fixed)||0,e.currency||"MYR"):"percentage"===e.rent_type?`${e.rent_percentage}%`:`MAX(${(0,c.vv)(parseFloat(e.rent_fixed)||0,e.currency||"MYR")}, ${e.rent_percentage}%)`})]})]}),"basic"===e.category&&(0,d.jsxs)(v,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(b,{children:"Staff Limit"}),(0,d.jsx)(A,{children:Ge(e.staff_limit)})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(b,{children:"Orders/month"}),(0,d.jsx)(A,{children:Ge(e.order_limit)})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(b,{children:"Menu Items"}),(0,d.jsx)(A,{children:Ge(e.menu_item_limit)})]})]}),Array.isArray(e.included_modules)&&e.included_modules.length>0&&(()=>{const n=e.included_modules.map(e=>we.find(n=>n.module_code===e)).filter(e=>e&&"basic"===e.category),r=e.included_modules.map(e=>we.find(n=>n.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,d.jsxs)(d.Fragment,{children:[n.length>0&&(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["Basic Modules (",n.length,")"]}),(0,d.jsx)(S,{children:n.map((e,n)=>(0,d.jsx)(B,{children:e.name},n))})]}),r.length>0&&(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["Advanced Modules (",r.length,")"]}),(0,d.jsx)(S,{children:r.map((e,n)=>(0,d.jsx)(B,{children:e.name},n))})]})]})})(),Array.isArray(e.features)&&e.features.length>0&&(0,d.jsx)(F,{children:e.features.map((e,n)=>(0,d.jsx)(w,{children:e},n))}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(z,{children:[(0,d.jsx)($,{children:en(e)}),(0,d.jsx)(P,{children:"Tenants"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)($,{children:(0,c.vv)(He(e,"monthly")*en(e),fe)}),(0,d.jsx)(P,{children:"Monthly Revenue"})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)(D,{variant:"primary",onClick:()=>(async e=>{var n,r,t,i,o,a,s,l;De(e);let c={};if(e.prices)for(const x of e.prices){var d,p;c[x.currency]={monthly:(null===(d=x.monthly_price)||void 0===d?void 0:d.toString())||"0",annual:(null===(p=x.annual_price)||void 0===p?void 0:p.toString())||"0"}}Qe({name:e.name,description:e.description||"",category:e.category||"custom",subscription_fee:(null===(n=e.subscription_fee)||void 0===n?void 0:n.toString())||"0",revenue_percentage:(null===(r=e.revenue_percentage)||void 0===r?void 0:r.toString())||"0",rent_type:e.rent_type||"none",rent_fixed:(null===(t=e.rent_fixed)||void 0===t?void 0:t.toString())||"0",rent_percentage:(null===(i=e.rent_percentage)||void 0===i?void 0:i.toString())||"0",billing_cycle:e.billing_cycle||"monthly",auto_generate:!1!==e.auto_generate,tax_rate:(null===(o=e.tax_rate)||void 0===o?void 0:o.toString())||"6",currency_prices:c,menu_item_limit:(null===(a=e.menu_item_limit)||void 0===a?void 0:a.toString())||"-1",order_limit:(null===(s=e.order_limit)||void 0===s?void 0:s.toString())||"-1",staff_limit:(null===(l=e.staff_limit)||void 0===l?void 0:l.toString())||"-1",features:Array.isArray(e.features)?e.features.join("\n"):"",included_modules:Array.isArray(e.included_modules)?e.included_modules:[],is_popular:e.is_popular||!1,is_active:!1!==e.is_active}),Ee(!0)})(e),children:"Edit"}),(0,d.jsx)(D,{variant:"secondary",onClick:()=>nn(e),children:"Prices"}),(0,d.jsx)(D,{variant:"secondary",onClick:()=>(e=>{De(e),$e(!0)})(e),children:"View"})]})]},e.id))}),Ce&&(0,d.jsx)(L,{onClick:()=>Se(!1),children:(0,d.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(W,{children:"Create New Plan"}),(0,d.jsx)(Y,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Plan Category *"}),(0,d.jsxs)(V,{value:Ue.category,onChange:e=>Je(n=>({...n,category:e.target.value})),children:[(0,d.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,d.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Plan Name *"}),(0,d.jsx)(Q,{type:"text",placeholder:"e.g., Standard Tenant Plan",value:Ue.name,onChange:e=>Je(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Description"}),(0,d.jsx)(q,{placeholder:"Enter plan description...",rows:3,value:Ue.description,onChange:e=>Je(n=>({...n,description:e.target.value}))})]}),dn(Ue,Je),pn(Ue,Je),xn(Ue,Je,"create"),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Features (one per line)"}),(0,d.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:Ue.features,onChange:e=>Je(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-auto-generate",checked:Ue.auto_generate,onChange:e=>Je(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-popular",checked:Ue.is_popular,onChange:e=>Je(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"create-active",checked:Ue.is_active,onChange:e=>Je(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"create-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(ee,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>Se(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(pe)try{const e=localStorage.getItem("auth_token"),n="custom"===Ue.category,r={name:Ue.name,description:Ue.description||null,category:Ue.category,subscription_fee:parseFloat(Ue.subscription_fee)||0,revenue_percentage:parseFloat(Ue.revenue_percentage)||0,rent_type:Ue.rent_type,rent_fixed:parseFloat(Ue.rent_fixed)||0,rent_percentage:parseFloat(Ue.rent_percentage)||0,billing_cycle:Ue.billing_cycle,auto_generate:Ue.auto_generate,tax_rate:parseFloat(Ue.tax_rate)||0,is_popular:Ue.is_popular,is_active:Ue.is_active,features:Ue.features.split("\n").filter(e=>e.trim()),included_modules:n?[]:Ue.included_modules,menu_item_limit:n?-1:parseInt(Ue.menu_item_limit)||-1,order_limit:n?-1:parseInt(Ue.order_limit)||-1,staff_limit:n?-1:parseInt(Ue.staff_limit)||-1,currency_prices:Ue.currency_prices},t=await fetch(`/api/foodcourts/${pe}/plans`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(r)});if(t.ok)Se(!1),Je({...Ye,currency_prices:{}}),qe(pe);else{const e=await t.json();console.error("Failed to create plan:",e)}}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),Be&&Ie&&(0,d.jsx)(L,{onClick:()=>Ee(!1),children:(0,d.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(O,{children:[(0,d.jsxs)(W,{children:["Edit Plan: ",Ie.name]}),(0,d.jsx)(Y,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Plan Category *"}),(0,d.jsxs)(V,{value:Xe.category,onChange:e=>Qe(n=>({...n,category:e.target.value})),children:[(0,d.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,d.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Plan Name *"}),(0,d.jsx)(Q,{type:"text",placeholder:"e.g., Standard Tenant Plan",value:Xe.name,onChange:e=>Qe(n=>({...n,name:e.target.value}))})]}),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Description"}),(0,d.jsx)(q,{placeholder:"Enter plan description...",rows:3,value:Xe.description,onChange:e=>Qe(n=>({...n,description:e.target.value}))})]}),dn(Xe,Qe),pn(Xe,Qe),xn(Xe,Qe,"edit"),(0,d.jsxs)(J,{children:[(0,d.jsx)(X,{children:"Features (one per line)"}),(0,d.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:Xe.features,onChange:e=>Qe(n=>({...n,features:e.target.value}))})]}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-auto-generate",checked:Xe.auto_generate,onChange:e=>Qe(n=>({...n,auto_generate:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-auto-generate",children:"Auto-generate invoices"})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Xe.is_popular,onChange:e=>Qe(n=>({...n,is_popular:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)("input",{type:"checkbox",id:"edit-active",checked:Xe.is_active,onChange:e=>Qe(n=>({...n,is_active:e.target.checked}))}),(0,d.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,d.jsxs)(ee,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(pe&&window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const n=localStorage.getItem("auth_token");(await fetch(`/api/foodcourts/${pe}/plans/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&(Ee(!1),qe(pe))}catch(n){console.error("Error deleting plan:",n)}})(Ie.id),children:"Delete"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(pe&&Ie)try{const e=localStorage.getItem("auth_token"),n="custom"===Xe.category,r={name:Xe.name,description:Xe.description||null,category:Xe.category,subscription_fee:parseFloat(Xe.subscription_fee)||0,revenue_percentage:parseFloat(Xe.revenue_percentage)||0,rent_type:Xe.rent_type,rent_fixed:parseFloat(Xe.rent_fixed)||0,rent_percentage:parseFloat(Xe.rent_percentage)||0,billing_cycle:Xe.billing_cycle,auto_generate:Xe.auto_generate,tax_rate:parseFloat(Xe.tax_rate)||0,is_popular:Xe.is_popular,is_active:Xe.is_active,features:Xe.features.split("\n").filter(e=>e.trim()),included_modules:n?[]:Xe.included_modules,menu_item_limit:n?-1:parseInt(Xe.menu_item_limit)||-1,order_limit:n?-1:parseInt(Xe.order_limit)||-1,staff_limit:n?-1:parseInt(Xe.staff_limit)||-1},t=await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(r)});if(t.ok){if(Xe.currency_prices&&Object.keys(Xe.currency_prices).length>0){const n=Object.entries(Xe.currency_prices).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}Ee(!1),qe(pe)}else{const e=await t.json();console.error("Failed to update plan:",e)}}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),ze&&Ie&&(0,d.jsx)(L,{onClick:()=>$e(!1),children:(0,d.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(O,{children:[(0,d.jsxs)(W,{children:["Plan Details: ",Ie.name]}),(0,d.jsx)(Y,{onClick:()=>$e(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Plan Info"}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Plan ID"}),(0,d.jsx)(ie,{children:Ie.id})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Name"}),(0,d.jsx)(ie,{children:Ie.name})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Category"}),(0,d.jsx)(M,{category:Ie.category||"custom",children:"basic"===Ie.category?"Basic":"Custom"})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Status"}),(0,d.jsx)(R,{isActive:Ie.is_active,children:Ie.is_active?"Active":"Inactive"})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Popular Plan"}),(0,d.jsx)(ie,{children:Ie.is_popular?"Yes":"No"})]})]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Pricing"}),Ae.map(e=>{var n,r;const t=null===(n=Ie.prices)||void 0===n?void 0:n.find(n=>n.currency===e);if(!t)return null;const i=parseFloat(t.monthly_price)||0,o=parseFloat(t.annual_price)||0;return 0===i&&0===o?null:(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:[(null===(r=_e[e])||void 0===r?void 0:r.symbol)||e," ",e]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Monthly"}),(0,d.jsx)(ie,{children:(0,c.vv)(i,e)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Annual"}),(0,d.jsx)(ie,{children:(0,c.vv)(o,e)})]}),i>0&&o>0&&12*i>o&&(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Annual Discount"}),(0,d.jsxs)(ie,{style:{color:"#059669"},children:[Math.round((12*i-o)/(12*i)*100),"%"]})]})]},e)})]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Foodcourt Charges"}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Management Fee"}),(0,d.jsxs)(ie,{children:[(0,c.vv)(parseFloat(Ie.subscription_fee)||0,Ie.currency||"MYR"),"/mo"]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Revenue Share"}),(0,d.jsxs)(ie,{children:[Ie.revenue_percentage,"%"]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Rent Type"}),(0,d.jsx)(ie,{children:Ie.rent_type})]}),"none"!==Ie.rent_type&&(0,d.jsxs)(d.Fragment,{children:[("fixed"===Ie.rent_type||"combined"===Ie.rent_type)&&(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Rent Fixed"}),(0,d.jsx)(ie,{children:(0,c.vv)(parseFloat(Ie.rent_fixed)||0,Ie.currency||"MYR")})]}),("percentage"===Ie.rent_type||"combined"===Ie.rent_type)&&(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Rent Percentage"}),(0,d.jsxs)(ie,{children:[Ie.rent_percentage,"%"]})]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Tax Rate"}),(0,d.jsxs)(ie,{children:[Ie.tax_rate,"%"]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Billing Cycle"}),(0,d.jsx)(ie,{children:Ie.billing_cycle})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Auto-generate Invoices"}),(0,d.jsx)(ie,{children:Ie.auto_generate?"Yes":"No"})]})]}),"basic"===Ie.category&&(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Limits"}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Menu Item Limit"}),(0,d.jsx)(ie,{children:Ge(Ie.menu_item_limit)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Order Limit"}),(0,d.jsx)(ie,{children:Ge(Ie.order_limit)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Staff Limit"}),(0,d.jsx)(ie,{children:Ge(Ie.staff_limit)})]})]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Statistics"}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Current Tenants"}),(0,d.jsx)(ie,{children:en(Ie)})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(te,{children:"Created Date"}),(0,d.jsx)(ie,{children:new Date(Ie.createdAt).toLocaleDateString()})]})]}),Array.isArray(Ie.features)&&Ie.features.length>0&&(0,d.jsxs)(ne,{children:[(0,d.jsx)("h4",{children:"Features"}),(0,d.jsx)(F,{children:Ie.features.map((e,n)=>(0,d.jsx)(w,{children:e},n))})]}),(0,d.jsxs)(ne,{children:[(0,d.jsxs)("h4",{children:["Assigned Tenants (",en(Ie),")"]}),Ie.planRestaurants&&Ie.planRestaurants.length>0?(0,d.jsx)(le,{children:Ie.planRestaurants.map(e=>{var n;return(0,d.jsxs)(ce,{isAssigned:!0,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(null===(n=e.restaurant)||void 0===n?void 0:n.name)||`Restaurant #${e.restaurant_id}`}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Since ",new Date(e.activation_date).toLocaleDateString()]})]}),(0,d.jsx)(R,{isActive:e.is_active,children:e.is_active?"Active":"Inactive"})]},e.id)})}):(0,d.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No tenants assigned to this plan."}),(0,d.jsx)(a.$n,{variant:"secondary",style:{marginTop:"12px",width:"100%"},onClick:()=>rn(Ie),children:"Manage Tenant Assignments"})]})]})]})}),Pe&&Ie&&(0,d.jsx)(L,{onClick:()=>Re(!1),children:(0,d.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,d.jsxs)(O,{children:[(0,d.jsxs)(W,{children:["Set Prices for ",Ie.name]}),(0,d.jsx)(Y,{onClick:()=>Re(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,d.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ae.map(e=>{var n,r;const t=_e[e];return(0,d.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,d.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===t||void 0===t?void 0:t.symbol)||e}),(null===t||void 0===t?void 0:t.name)||e," (",e,")"]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,d.jsx)("input",{type:"number",value:(null===(n=Le[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>Ne({...Le,[e]:{...Le[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,d.jsx)("input",{type:"number",value:(null===(r=Le[e])||void 0===r?void 0:r.annual)||"",onChange:n=>Ne({...Le,[e]:{...Le[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)}),0===Ae.length&&(0,d.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,d.jsxs)(ee,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>Re(!1),children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(pe&&Ie)try{const e=localStorage.getItem("auth_token"),n=Object.entries(Le).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});(await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})).ok&&(Re(!1),qe(pe))}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})}),Me&&Ie&&(0,d.jsx)(L,{onClick:()=>Te(!1),children:(0,d.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,d.jsxs)(O,{children:[(0,d.jsxs)(W,{children:["Manage Tenants: ",Ie.name]}),(0,d.jsx)(Y,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)("p",{style:{marginBottom:"16px",color:"#6B7280",fontSize:"14px"},children:"Assign or remove tenants from this plan."}),(0,d.jsxs)(le,{children:[Oe.map(e=>{var n;const r=null===(n=Ie.planRestaurants)||void 0===n?void 0:n.some(n=>n.restaurant_id===e.id&&n.is_active);return(0,d.jsxs)(ce,{isAssigned:r,children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.name}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.address||"No address"})]}),r?(0,d.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(pe&&Ie)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}/restaurants/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok){qe(pe);const e=await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();De(n.success?n.data:n)}}}catch(n){console.error("Error removing restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Remove"}):(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>(async e=>{if(pe&&Ie)try{const n=localStorage.getItem("auth_token");if((await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}/restaurants`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({restaurant_id:e})})).ok){qe(pe);const e=await fetch(`/api/foodcourts/${pe}/plans/${Ie.id}`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){const n=await e.json();De(n.success?n.data:n)}}}catch(n){console.error("Error assigning restaurant:",n)}})(e.id),style:{padding:"6px 12px",fontSize:"12px"},children:"Assign"})]},e.id)}),0===Oe.length&&(0,d.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7280"},children:"No tenants found in your foodcourt."})]})]}),(0,d.jsx)(ee,{children:(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>Te(!1),children:"Close"})})]})})]})]})})}}}]);