"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,n)=>{n.d(r,{DO:()=>c,Jt:()=>d,Qn:()=>l});n(9950);var i=n(4752),t=n(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:r,className:n,style:i,...s}=e;return(0,t.jsx)(a,{className:n,style:i,...s,children:r})},c=e=>{let{placeholder:r="Search...",...n}=e;return(0,t.jsx)(s,{placeholder:r,...n})},d=e=>{let{children:r,...n}=e;return(0,t.jsx)(o,{...n,children:r})}},6837:(e,r,n)=>{n.r(r),n.d(r,{default:()=>te});var i=n(9950),t=n(4752),a=n(3310),s=n(2674),o=n(2488),l=n(6038),c=n(4414);const d=t.Ay.div`
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
  min-height: 550px;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${e=>e.isPopular&&"\n    &::before {\n      content: 'Most Popular';\n      position: absolute;\n      top: -12px;\n      left: 50%;\n      transform: translateX(-50%);\n      background: #635BFF;\n      color: white;\n      padding: 6px 16px;\n      border-radius: 20px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n  "}
`,u=t.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,h=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,x=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,m=t.Ay.div`
  text-align: center;
`,g=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,y=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,f=t.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,v=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,_=t.Ay.span`
  font-size: 14px;
  color: #374151;
`,b=t.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,w=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,A=t.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,F=t.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,C=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,P=t.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,B=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,S=t.Ay.div`
  text-align: center;
`,E=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,z=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,$=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,M=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,T=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,L=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,I=t.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,O=t.Ay.div`
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
`,N=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,D=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=t.Ay.h2`
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

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,J=t.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,W=t.Ay.div`
  margin-bottom: 20px;
`,Y=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,Q=t.Ay.input`
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
`,q=t.Ay.select`
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
`,K=t.Ay.textarea`
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
`,V=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,X=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,G=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,H=t.Ay.div`
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
`,Z=t.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,ee=t.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,re=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,ne=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ie=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,te=()=>{const[e,r]=(0,i.useState)([]),[n,t]=(0,i.useState)(null),[te,ae]=(0,i.useState)(!1),[se,oe]=(0,i.useState)(!1),[le,ce]=(0,i.useState)(!1),[de,pe]=(0,i.useState)({}),[ue,he]=(0,i.useState)(""),[xe,me]=(0,i.useState)("all"),[ge,ye]=(0,i.useState)("all"),[je,fe]=(0,i.useState)("all"),[ve,_e]=(0,i.useState)("USD"),[be,we]=(0,i.useState)([]),[Ae,Fe]=(0,i.useState)({}),[Ce,ke]=(0,i.useState)([]),[Pe,Be]=(0,i.useState)(!1),[,Se]=(0,i.useState)([]),[Ee,ze]=(0,i.useState)({}),[$e,Me]=(0,i.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[Te,Le]=(0,i.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,i.useEffect)(()=>{De(),Ne(),Ie(),Oe()},[]);const Ie=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();Fe(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Oe=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();ke((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),ke(["USD","RM","KRW"])}};(0,i.useEffect)(()=>{Object.keys(de).length>=0&&Ue()},[de]);const Ne=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();we(r)}catch(e){console.error("Error fetching addon modules:",e),we([])}},De=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),n={};r&&Array.isArray(r)&&r.forEach(e=>{n[e.plan_name]=e.count||0}),pe(n)}catch(e){console.error("Error fetching subscription stats:",e),pe({})}},Ue=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const n=await e.json(),i=localStorage.getItem("auth_token"),t=await Promise.all(n.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let n=[];try{"string"===typeof e.included_modules?n=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(n=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),n=[]}let t={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])t[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Re(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),restaurantLimit:e.staff_limit,orderLimit:e.order_limit,features:r,includedModules:n,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:de[e.display_name]||0,currencyPrices:t}}));r(t)}catch(e){console.error("Error fetching plans:",e),r(Je())}},Re=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Je=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,restaurantLimit:1,orderLimit:1e3,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,restaurantLimit:5,orderLimit:1e4,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,restaurantLimit:-1,orderLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Enterprise||0}],We=e.filter(e=>e.isActive).length,Ye=e.reduce((e,r)=>e+r.subscriptionCount,0),Qe=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),qe=e=>-1===e?"Unlimited":e.toLocaleString(),Ke=(e,r)=>e.currencyPrices&&e.currencyPrices[ve]?e.currencyPrices[ve][r]:0,Ve=e=>!!(e.currencyPrices&&e.currencyPrices[ve]&&(e.currencyPrices[ve].monthly>0||e.currencyPrices[ve].annual>0)),Xe=(e,r)=>{if(!Ve(e))return"Not Set";const n=Ke(e,r);return(0,l.vv)(n,ve)},Ge=e.filter(e=>{const r=e.displayName.toLowerCase().includes(ue.toLowerCase())||e.description.toLowerCase().includes(ue.toLowerCase()),n="all"===xe||e.planTarget===xe,i="all"===ge||e.category===ge,t="all"===je||"active"===je&&e.isActive||"inactive"===je&&!e.isActive;return r&&n&&i&&t}),He=e.filter(e=>"basic"===e.category).length,Ze=e.filter(e=>"custom"===e.category).length;return(0,c.jsx)(a.A,{children:(0,c.jsxs)(s.mc,{children:[(0,c.jsxs)(s.Y9,{children:[(0,c.jsx)(s.hE,{children:"Subscription Plans"}),(0,c.jsxs)(s.ex,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),n=window.URL.createObjectURL(r),i=document.createElement("a");i.href=n,i.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(n),document.body.removeChild(i)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(s.UC,{children:[(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{color:"#059669",children:[(0,c.jsx)(s.Os,{children:e.length}),(0,c.jsx)(s.v0,{children:"Total Plans"}),(0,c.jsxs)(s.d1,{children:[He," basic + ",Ze," custom"]})]}),(0,c.jsxs)(s.hI,{color:"#10B981",children:[(0,c.jsx)(s.Os,{children:We}),(0,c.jsx)(s.v0,{children:"Active Plans"}),(0,c.jsxs)(s.d1,{children:[e.length>0?Math.round(We/e.length*100):0,"% available"]})]}),(0,c.jsxs)(s.hI,{color:"#F59E0B",children:[(0,c.jsx)(s.Os,{children:Ye}),(0,c.jsx)(s.v0,{children:"Total Subscriptions"}),(0,c.jsx)(s.d1,{children:"Across all plans"})]}),(0,c.jsxs)(s.hI,{color:"#DC2626",children:[(0,c.jsx)(s.Os,{children:(0,l.vv)(Qe)}),(0,c.jsx)(s.v0,{children:"Monthly Revenue"}),(0,c.jsx)(s.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(o.Qn,{children:[(0,c.jsx)(o.DO,{type:"text",placeholder:"Search plans...",value:ue,onChange:e=>he(e.target.value)}),(0,c.jsxs)(o.Jt,{value:xe,onChange:e=>me(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"})]}),(0,c.jsxs)(o.Jt,{value:ge,onChange:e=>ye(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(o.Jt,{value:je,onChange:e=>fe(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(o.Jt,{value:ve,onChange:e=>_e(e.target.value),style:{minWidth:"150px"},children:Ce.map(e=>{const r=Ae[e];return(0,c.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),(0,c.jsx)(d,{children:Ge.map(e=>(0,c.jsxs)(p,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(M,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)($,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:e.displayName}),(0,c.jsx)(x,{children:e.description}),(0,c.jsx)(m,{children:Ve(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(g,{children:[Xe(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Ke(e,"annual")>0&&Ke(e,"monthly")>0&&(0,c.jsxs)(y,{children:[Xe(e,"annual"),"/year",12*Ke(e,"monthly")>Ke(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*Ke(e,"monthly")-Ke(e,"annual"))/(12*Ke(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",ve,' price in "Prices" button']})]})})]}),"basic"===e.category&&(0,c.jsxs)(f,{children:[(0,c.jsxs)(v,{children:[(0,c.jsx)(_,{children:"Staff Limit"}),(0,c.jsx)(b,{children:qe(e.restaurantLimit)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(_,{children:"Orders/month"}),(0,c.jsx)(b,{children:qe(e.orderLimit)})]})]}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>be.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),n=e.includedModules.map(e=>be.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(k,{children:r.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]}),n.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Advanced Modules (",n.length,")"]}),(0,c.jsx)(k,{children:n.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:e.subscriptionCount}),(0,c.jsx)(z,{children:"Subscriptions"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:(0,l.vv)(Ke(e,"monthly")*e.subscriptionCount,ve)}),(0,c.jsx)(z,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>(async e=>{t(e);let r={};try{const t=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),s=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(s.ok){const e=await s.json();for(const t of e.data||[]){var n,i;r[t.currency]={monthly:(null===(n=t.monthly_price)||void 0===n?void 0:n.toString())||"0",annual:(null===(i=t.annual_price)||void 0===i?void 0:i.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Le({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:"50",staff_limit:e.restaurantLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),oe(!0)})(e),children:"Edit"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>{t(e),(async e=>{try{const i=localStorage.getItem("auth_token"),t=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${t}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(a.ok){const e=await a.json();Se(e.data||[]);const i={};for(const t of e.data||[]){var r,n;i[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(n=t.annual_price)||void 0===n?void 0:n.toString())||"0"}}for(const r of Ce)i[r]||(i[r]={monthly:"0",annual:"0"});ze(i)}}catch(i){console.error("Error fetching plan prices:",i)}})(e.id),Be(!0)},children:"Prices"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>(e=>{t(e),ce(!0)})(e),children:"View"})]})]},e.id))}),te&&(0,c.jsx)(O,{onClick:()=>ae(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsx)(U,{children:"Create New Plan"}),(0,c.jsx)(R,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:$e.plan_target,onChange:e=>Me(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:$e.category,onChange:e=>Me(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:$e.display_name,onChange:e=>{const r=e.target.value,n=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();Me(e=>({...e,display_name:r,name:n}))}})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Description"}),(0,c.jsx)(K,{placeholder:"Enter plan description...",rows:3,value:$e.description,onChange:e=>Me(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ce.map(e=>{var r,n,i,t;const a=Ae[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=$e.currency_prices)||void 0===r||null===(n=r[e])||void 0===n?void 0:n.monthly)||"",onChange:r=>Me(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(i=$e.currency_prices)||void 0===i||null===(t=i[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Me(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===$e.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(X,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.menu_item_limit,onChange:e=>Me(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.order_limit,onChange:e=>Me(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.staff_limit,onChange:e=>Me(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===$e.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),be.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(G,{children:be.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(G,{children:be.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(K,{placeholder:"Enter features, one per line...",rows:6,value:$e.features,onChange:e=>Me(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:$e.is_popular,onChange:e=>Me(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:$e.is_active,onChange:e=>Me(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===$e.category,r={name:$e.name,display_name:$e.display_name,description:$e.description,category:$e.category,plan_target:$e.plan_target,base_price_monthly:parseFloat($e.base_price_monthly)||0,base_price_annual:parseFloat($e.base_price_annual)||0,order_limit:e?-1:parseInt($e.order_limit)||-1,menu_item_limit:e?-1:parseInt($e.menu_item_limit)||-1,staff_limit:e?-1:parseInt($e.staff_limit)||-1,features:$e.features.split("\n").filter(e=>e.trim()),included_modules:$e.included_modules,is_popular:$e.is_popular,is_active:$e.is_active};console.log("Creating plan with data:",r);const n=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to create plan")}const i=await n.json();if($e.currency_prices&&Object.keys($e.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries($e.currency_prices).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${i.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}Me({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ae(!1),Ue()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),se&&n&&(0,c.jsx)(O,{onClick:()=>oe(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Edit Plan: ",n.displayName]}),(0,c.jsx)(R,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Te.display_name,onChange:e=>Le(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",Te.name]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:Te.plan_target,onChange:e=>Le(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:Te.category,onChange:e=>Le(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ce.map(e=>{var r,n,i,t;const a=Ae[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=Te.currency_prices)||void 0===r||null===(n=r[e])||void 0===n?void 0:n.monthly)||"",onChange:r=>Le(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(i=Te.currency_prices)||void 0===i||null===(t=i[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Le(n=>{var i;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(i=n.currency_prices)||void 0===i?void 0:i[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===Te.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(X,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Te.menu_item_limit,onChange:e=>Le(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Te.order_limit,onChange:e=>Le(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Te.staff_limit,onChange:e=>Le(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Te.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),be.filter(e=>"basic"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(G,{children:be.filter(e=>"basic"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const r=Te.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"advanced"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(G,{children:be.filter(e=>"advanced"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const r=Te.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(K,{placeholder:"Enter features, one per line...",rows:6,value:Te.features,onChange:e=>Le(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Te.is_popular,onChange:e=>Le(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:Te.is_active,onChange:e=>Le(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}oe(!1),Ue()}catch(r){console.error("Error deleting plan:",r)}})(n.id),children:"Delete"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{try{if(!Te.display_name)return void console.log("Display name is required");const e="custom"===Te.category,r={display_name:Te.display_name,description:Te.description,category:Te.category,plan_target:Te.plan_target,base_price_monthly:parseFloat(Te.base_price_monthly)||0,base_price_annual:parseFloat(Te.base_price_annual)||0,order_limit:e?-1:parseInt(Te.order_limit)||-1,menu_item_limit:e?-1:parseInt(Te.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Te.staff_limit)||-1,features:Te.features.split("\n").filter(e=>e.trim()),included_modules:Te.included_modules,is_popular:Te.is_popular,is_active:Te.is_active};console.log("Updating plan with data:",r);const n=Te.id.replace("plan-",""),i=await fetch(`/api/plans/${n}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok){const e=await i.json();throw new Error(e.error||"Failed to update plan")}if(Te.currency_prices&&Object.keys(Te.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Te.currency_prices).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}oe(!1),Ue()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),le&&n&&(0,c.jsx)(O,{onClick:()=>ce(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Plan Details: ",n.displayName]}),(0,c.jsx)(R,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(ee,{children:[(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Plan ID"}),(0,c.jsx)(ie,{children:n.id})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Internal Name"}),(0,c.jsx)(ie,{children:n.name})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Display Name"}),(0,c.jsx)(ie,{children:n.displayName})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Status"}),(0,c.jsx)($,{isActive:n.isActive,children:n.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Popular Plan"}),(0,c.jsx)(ie,{children:n.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Monthly Price"}),(0,c.jsx)(ie,{children:(0,l.vv)(n.monthlyPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Annual Price"}),(0,c.jsx)(ie,{children:(0,l.vv)(n.annualPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Annual Discount"}),(0,c.jsxs)(ie,{children:[Math.round((12*n.monthlyPrice-n.annualPrice)/(12*n.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Limits"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Restaurant Limit"}),(0,c.jsx)(ie,{children:qe(n.restaurantLimit)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Monthly Order Limit"}),(0,c.jsx)(ie,{children:qe(n.orderLimit)})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Current Subscriptions"}),(0,c.jsx)(ie,{children:n.subscriptionCount})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Monthly Revenue"}),(0,c.jsx)(ie,{children:(0,l.vv)(n.monthlyPrice*n.subscriptionCount)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ne,{children:"Created Date"}),(0,c.jsx)(ie,{children:n.createdAt})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(n.features)?n.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))})]})]})]})}),Pe&&n&&(0,c.jsx)(O,{onClick:()=>Be(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Set Prices for ",n.displayName]}),(0,c.jsx)(R,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ce.map(e=>{var r,n;const i=Ae[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===i||void 0===i?void 0:i.symbol)||e}),(null===i||void 0===i?void 0:i.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Ee[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>ze({...Ee,[e]:{...Ee[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(n=Ee[e])||void 0===n?void 0:n.annual)||"",onChange:r=>ze({...Ee,[e]:{...Ee[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token"),r=n.id.replace("plan-",""),i=Object.entries(Ee).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}}),t=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:i})});if(t.ok)Be(!1);else{const e=await t.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);