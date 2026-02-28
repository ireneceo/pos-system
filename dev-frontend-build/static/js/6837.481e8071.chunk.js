"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,n)=>{n.d(r,{DO:()=>c,Jt:()=>d,Qn:()=>s});n(9950);var t=n(4752),i=n(4414);const a=t.Ay.div`
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
`,l=t.Ay.input`
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
`,o=t.Ay.select`
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
`,s=e=>{let{children:r,className:n,style:t,...l}=e;return(0,i.jsx)(a,{className:n,style:t,...l,children:r})},c=e=>{let{placeholder:r="Search...",...n}=e;return(0,i.jsx)(l,{placeholder:r,...n})},d=e=>{let{children:r,...n}=e;return(0,i.jsx)(o,{...n,children:r})}},6837:(e,r,n)=>{n.r(r),n.d(r,{default:()=>te});var t=n(9950),i=n(4752),a=n(2674),l=n(2488),o=n(6038),s=n(4414);const c=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,d=i.Ay.div`
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
`,p=i.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,u=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,h=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,x=i.Ay.div`
  text-align: center;
`,m=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,g=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,y=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,j=i.Ay.div`
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
`,f=i.Ay.span`
  font-size: 14px;
  color: #374151;
`,v=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,b=i.Ay.ul`
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
`,F=i.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,A=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,k=i.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,P=i.Ay.div`
  text-align: center;
`,S=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,E=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,z=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,$=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,M=i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,T=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,O=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
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
`,I=i.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,N=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,R=i.Ay.button`
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
`,W=i.Ay.div`
  margin-bottom: 20px;
`,J=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,Y=i.Ay.input`
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
`,Q=i.Ay.select`
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
`,K=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,V=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,X=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,G=i.Ay.div`
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
`,H=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,Z=i.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,ee=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,re=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ne=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,te=()=>{const[e,r]=(0,t.useState)([]),[n,i]=(0,t.useState)(null),[te,ie]=(0,t.useState)(!1),[ae,le]=(0,t.useState)(!1),[oe,se]=(0,t.useState)(!1),[ce,de]=(0,t.useState)({}),[pe,ue]=(0,t.useState)(""),[he,xe]=(0,t.useState)("all"),[me,ge]=(0,t.useState)("all"),[ye,je]=(0,t.useState)("all"),[_e,fe]=(0,t.useState)("USD"),[ve,be]=(0,t.useState)([]),[we,Fe]=(0,t.useState)({}),[Ae,Ce]=(0,t.useState)([]),[ke,Be]=(0,t.useState)(!1),[,Pe]=(0,t.useState)([]),[Se,Ee]=(0,t.useState)({}),[ze,$e]=(0,t.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[Me,Te]=(0,t.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,t.useEffect)(()=>{Ne(),Ie(),Oe(),Le()},[]);const Oe=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();Fe(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Le=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();Ce((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),Ce(["USD","RM","KRW"])}};(0,t.useEffect)(()=>{Object.keys(ce).length>=0&&De()},[ce]);const Ie=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();be(r)}catch(e){console.error("Error fetching addon modules:",e),be([])}},Ne=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),n={};r&&Array.isArray(r)&&r.forEach(e=>{n[e.plan_name]=e.count||0}),de(n)}catch(e){console.error("Error fetching subscription stats:",e),de({})}},De=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const n=await e.json(),t=localStorage.getItem("auth_token"),i=await Promise.all(n.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let n=[];try{"string"===typeof e.included_modules?n=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(n=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),n=[]}let i={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])i[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Re(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),restaurantLimit:e.staff_limit,orderLimit:e.order_limit,features:r,includedModules:n,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:ce[e.display_name]||0,currencyPrices:i}}));r(i)}catch(e){console.error("Error fetching plans:",e),r(Ue())}},Re=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Ue=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,restaurantLimit:1,orderLimit:1e3,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,restaurantLimit:5,orderLimit:1e4,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,restaurantLimit:-1,orderLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Enterprise||0}],We=e.filter(e=>e.isActive).length,Je=e.reduce((e,r)=>e+r.subscriptionCount,0),Ye=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Qe=e=>-1===e?"Unlimited":e.toLocaleString(),qe=(e,r)=>e.currencyPrices&&e.currencyPrices[_e]?e.currencyPrices[_e][r]:0,Ke=e=>!!(e.currencyPrices&&e.currencyPrices[_e]&&(e.currencyPrices[_e].monthly>0||e.currencyPrices[_e].annual>0)),Ve=(e,r)=>{if(!Ke(e))return"Not Set";const n=qe(e,r);return(0,o.vv)(n,_e)},Xe=e.filter(e=>{const r=e.displayName.toLowerCase().includes(pe.toLowerCase())||e.description.toLowerCase().includes(pe.toLowerCase()),n="all"===he||e.planTarget===he,t="all"===me||e.category===me,i="all"===ye||"active"===ye&&e.isActive||"inactive"===ye&&!e.isActive;return r&&n&&t&&i}),Ge=e.filter(e=>"basic"===e.category).length,He=e.filter(e=>"custom"===e.category).length;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a.mc,{children:[(0,s.jsxs)(a.Y9,{children:[(0,s.jsx)(a.hE,{children:"Subscription Plans"}),(0,s.jsxs)(a.ex,{children:[(0,s.jsx)(a.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),n=window.URL.createObjectURL(r),t=document.createElement("a");t.href=n,t.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),window.URL.revokeObjectURL(n),document.body.removeChild(t)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,s.jsx)(a.$n,{variant:"primary",onClick:()=>{ie(!0)},children:"Create Plan"})]})]}),(0,s.jsxs)(a.UC,{children:[(0,s.jsxs)(a.MD,{children:[(0,s.jsxs)(a.hI,{color:"#059669",children:[(0,s.jsx)(a.Os,{children:e.length}),(0,s.jsx)(a.v0,{children:"Total Plans"}),(0,s.jsxs)(a.d1,{children:[Ge," basic + ",He," custom"]})]}),(0,s.jsxs)(a.hI,{color:"#10B981",children:[(0,s.jsx)(a.Os,{children:We}),(0,s.jsx)(a.v0,{children:"Active Plans"}),(0,s.jsxs)(a.d1,{children:[e.length>0?Math.round(We/e.length*100):0,"% available"]})]}),(0,s.jsxs)(a.hI,{color:"#F59E0B",children:[(0,s.jsx)(a.Os,{children:Je}),(0,s.jsx)(a.v0,{children:"Total Subscriptions"}),(0,s.jsx)(a.d1,{children:"Across all plans"})]}),(0,s.jsxs)(a.hI,{color:"#DC2626",children:[(0,s.jsx)(a.Os,{children:(0,o.vv)(Ye)}),(0,s.jsx)(a.v0,{children:"Monthly Revenue"}),(0,s.jsx)(a.d1,{children:"From all subscriptions"})]})]}),(0,s.jsxs)(l.Qn,{children:[(0,s.jsx)(l.DO,{type:"text",placeholder:"Search plans...",value:pe,onChange:e=>ue(e.target.value)}),(0,s.jsxs)(l.Jt,{value:he,onChange:e=>xe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Plans"}),(0,s.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,s.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"}),(0,s.jsx)("option",{value:"owner",children:"Restaurant Owner Plans"})]}),(0,s.jsxs)(l.Jt,{value:me,onChange:e=>ge(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,s.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,s.jsxs)(l.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"active",children:"Active"}),(0,s.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,s.jsx)(l.Jt,{value:_e,onChange:e=>fe(e.target.value),style:{minWidth:"150px"},children:Ae.map(e=>{const r=we[e];return(0,s.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),(0,s.jsx)(c,{children:Xe.map(e=>(0,s.jsxs)(d,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,s.jsxs)(M,{children:[(0,s.jsx)($,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,s.jsx)(z,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{children:e.displayName}),(0,s.jsx)(h,{children:e.description}),(0,s.jsx)(x,{children:Ke(e)?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(m,{children:[Ve(e,"monthly"),(0,s.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),qe(e,"annual")>0&&qe(e,"monthly")>0&&(0,s.jsxs)(g,{children:[Ve(e,"annual"),"/year",12*qe(e,"monthly")>qe(e,"annual")&&(0,s.jsxs)("span",{children:[" (Save ",Math.round((12*qe(e,"monthly")-qe(e,"annual"))/(12*qe(e,"monthly"))*100),"%)"]})]}),(0,s.jsx)(y,{children:"Billed monthly or annually"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(m,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,s.jsxs)(y,{style:{color:"#F59E0B"},children:["Set ",_e,' price in "Prices" button']})]})})]}),"basic"===e.category&&(0,s.jsxs)(j,{children:[(0,s.jsxs)(_,{children:[(0,s.jsx)(f,{children:"Staff Limit"}),(0,s.jsx)(v,{children:Qe(e.restaurantLimit)})]}),(0,s.jsxs)(_,{children:[(0,s.jsx)(f,{children:"Orders/month"}),(0,s.jsx)(v,{children:Qe(e.orderLimit)})]})]}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),n=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,s.jsxs)(s.Fragment,{children:[r.length>0&&(0,s.jsxs)(F,{children:[(0,s.jsxs)(A,{children:["Basic Modules (",r.length,")"]}),(0,s.jsx)(C,{children:r.map((e,r)=>(0,s.jsx)(k,{children:e.name},r))})]}),n.length>0&&(0,s.jsxs)(F,{children:[(0,s.jsxs)(A,{children:["Advanced Modules (",n.length,")"]}),(0,s.jsx)(C,{children:n.map((e,r)=>(0,s.jsx)(k,{children:e.name},r))})]})]})})(),(0,s.jsx)(b,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,s.jsx)(w,{children:e},r))}),(0,s.jsxs)(B,{children:[(0,s.jsxs)(P,{children:[(0,s.jsx)(S,{children:e.subscriptionCount}),(0,s.jsx)(E,{children:"Subscriptions"})]}),(0,s.jsxs)(P,{children:[(0,s.jsx)(S,{children:(0,o.vv)(qe(e,"monthly")*e.subscriptionCount,_e)}),(0,s.jsx)(E,{children:"Monthly Revenue"})]})]}),(0,s.jsxs)(T,{children:[(0,s.jsx)(O,{variant:"primary",onClick:()=>(async e=>{i(e);let r={};try{const i=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(l.ok){const e=await l.json();for(const i of e.data||[]){var n,t;r[i.currency]={monthly:(null===(n=i.monthly_price)||void 0===n?void 0:n.toString())||"0",annual:(null===(t=i.annual_price)||void 0===t?void 0:t.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Te({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:"50",staff_limit:e.restaurantLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),le(!0)})(e),children:"Edit"}),(0,s.jsx)(O,{variant:"secondary",onClick:()=>{i(e),(async e=>{try{const t=localStorage.getItem("auth_token"),i=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json();Pe(e.data||[]);const t={};for(const i of e.data||[]){var r,n;t[i.currency]={monthly:(null===(r=i.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(n=i.annual_price)||void 0===n?void 0:n.toString())||"0"}}for(const r of Ae)t[r]||(t[r]={monthly:"0",annual:"0"});Ee(t)}}catch(t){console.error("Error fetching plan prices:",t)}})(e.id),Be(!0)},children:"Prices"}),(0,s.jsx)(O,{variant:"secondary",onClick:()=>(e=>{i(e),se(!0)})(e),children:"View"})]})]},e.id))}),te&&(0,s.jsx)(L,{onClick:()=>ie(!1),children:(0,s.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(N,{children:[(0,s.jsx)(D,{children:"Create New Plan"}),(0,s.jsx)(R,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,s.jsxs)(U,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Target *"}),(0,s.jsxs)(Q,{value:ze.plan_target,onChange:e=>$e(r=>({...r,plan_target:e.target.value})),children:[(0,s.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,s.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,s.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Category *"}),(0,s.jsxs)(Q,{value:ze.category,onChange:e=>$e(r=>({...r,category:e.target.value})),children:[(0,s.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,s.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Name *"}),(0,s.jsx)(Y,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:ze.display_name,onChange:e=>{const r=e.target.value,n=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();$e(e=>({...e,display_name:r,name:n}))}})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Description"}),(0,s.jsx)(q,{placeholder:"Enter plan description...",rows:3,value:ze.description,onChange:e=>$e(r=>({...r,description:e.target.value}))})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Pricing by Currency"}),(0,s.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,n,t,i;const a=we[e];return(0,s.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,s.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(W,{style:{marginBottom:0},children:[(0,s.jsx)(J,{style:{fontSize:"12px"},children:"Monthly"}),(0,s.jsx)(Y,{type:"number",placeholder:"0",value:(null===(r=ze.currency_prices)||void 0===r||null===(n=r[e])||void 0===n?void 0:n.monthly)||"",onChange:r=>$e(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[e],monthly:r.target.value}}}})})]}),(0,s.jsxs)(W,{style:{marginBottom:0},children:[(0,s.jsx)(J,{style:{fontSize:"12px"},children:"Annual"}),(0,s.jsx)(Y,{type:"number",placeholder:"0",value:(null===(t=ze.currency_prices)||void 0===t||null===(i=t[e])||void 0===i?void 0:i.annual)||"",onChange:r=>$e(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,s.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===ze.category&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(V,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Menu Item Limit"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.menu_item_limit,onChange:e=>$e(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Order Limit (per month)"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.order_limit,onChange:e=>$e(r=>({...r,order_limit:e.target.value}))})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Staff Limit"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.staff_limit,onChange:e=>$e(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===ze.category&&(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Features (one per line)"}),(0,s.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:ze.features,onChange:e=>$e(r=>({...r,features:e.target.value}))})]}),(0,s.jsxs)(X,{children:[(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:"popular",checked:ze.is_popular,onChange:e=>$e(r=>({...r,is_popular:e.target.checked}))}),(0,s.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:"active",checked:ze.is_active,onChange:e=>$e(r=>({...r,is_active:e.target.checked}))}),(0,s.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(a.$n,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===ze.category,r={name:ze.name,display_name:ze.display_name,description:ze.description,category:ze.category,plan_target:ze.plan_target,base_price_monthly:parseFloat(ze.base_price_monthly)||0,base_price_annual:parseFloat(ze.base_price_annual)||0,order_limit:e?-1:parseInt(ze.order_limit)||-1,menu_item_limit:e?-1:parseInt(ze.menu_item_limit)||-1,staff_limit:e?-1:parseInt(ze.staff_limit)||-1,features:ze.features.split("\n").filter(e=>e.trim()),included_modules:ze.included_modules,is_popular:ze.is_popular,is_active:ze.is_active};console.log("Creating plan with data:",r);const n=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to create plan")}const t=await n.json();if(ze.currency_prices&&Object.keys(ze.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(ze.currency_prices).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${t.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}$e({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ie(!1),De()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ae&&n&&(0,s.jsx)(L,{onClick:()=>le(!1),children:(0,s.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(N,{children:[(0,s.jsxs)(D,{children:["Edit Plan: ",n.displayName]}),(0,s.jsx)(R,{onClick:()=>le(!1),children:"\xd7"})]}),(0,s.jsxs)(U,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Name *"}),(0,s.jsx)(Y,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Me.display_name,onChange:e=>Te(r=>({...r,display_name:e.target.value}))}),(0,s.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",Me.name]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Target *"}),(0,s.jsxs)(Q,{value:Me.plan_target,onChange:e=>Te(r=>({...r,plan_target:e.target.value})),children:[(0,s.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,s.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,s.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Plan Category *"}),(0,s.jsxs)(Q,{value:Me.category,onChange:e=>Te(r=>({...r,category:e.target.value})),children:[(0,s.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,s.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Pricing by Currency"}),(0,s.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,n,t,i;const a=we[e];return(0,s.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,s.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(W,{style:{marginBottom:0},children:[(0,s.jsx)(J,{style:{fontSize:"12px"},children:"Monthly"}),(0,s.jsx)(Y,{type:"number",placeholder:"0",value:(null===(r=Me.currency_prices)||void 0===r||null===(n=r[e])||void 0===n?void 0:n.monthly)||"",onChange:r=>Te(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[e],monthly:r.target.value}}}})})]}),(0,s.jsxs)(W,{style:{marginBottom:0},children:[(0,s.jsx)(J,{style:{fontSize:"12px"},children:"Annual"}),(0,s.jsx)(Y,{type:"number",placeholder:"0",value:(null===(t=Me.currency_prices)||void 0===t||null===(i=t[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Te(n=>{var t;return{...n,currency_prices:{...n.currency_prices,[e]:{...null===(t=n.currency_prices)||void 0===t?void 0:t[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,s.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===Me.category&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(V,{children:[(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Menu Item Limit"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:Me.menu_item_limit,onChange:e=>Te(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Order Limit (per month)"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:Me.order_limit,onChange:e=>Te(r=>({...r,order_limit:e.target.value}))})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Staff Limit"}),(0,s.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:Me.staff_limit,onChange:e=>Te(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Me.category&&(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).map(e=>{const r=Me.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Te(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Te(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).map(e=>{const r=Me.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Te(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Te(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).map(e=>{const r=Me.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Te(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Te(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"operation"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"operation"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).map(e=>{const r=Me.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Te(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Te(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).length>0&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,s.jsx)(X,{children:ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Me.plan_target||"all"===e.target_user_type)).map(e=>{const r=Me.included_modules.includes(e.module_code);return(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Te(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Te(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,s.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,s.jsx)("strong",{children:e.name}),(0,s.jsx)("br",{}),(0,s.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,s.jsxs)(W,{children:[(0,s.jsx)(J,{children:"Features (one per line)"}),(0,s.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:Me.features,onChange:e=>Te(r=>({...r,features:e.target.value}))})]}),(0,s.jsxs)(X,{children:[(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Me.is_popular,onChange:e=>Te(r=>({...r,is_popular:e.target.checked}))}),(0,s.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)("input",{type:"checkbox",id:"edit-active",checked:Me.is_active,onChange:e=>Te(r=>({...r,is_active:e.target.checked}))}),(0,s.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(a.$n,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}le(!1),De()}catch(r){console.error("Error deleting plan:",r)}})(n.id),children:"Delete"}),(0,s.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{if(!Me.display_name)return void console.log("Display name is required");const e="custom"===Me.category,r={display_name:Me.display_name,description:Me.description,category:Me.category,plan_target:Me.plan_target,base_price_monthly:parseFloat(Me.base_price_monthly)||0,base_price_annual:parseFloat(Me.base_price_annual)||0,order_limit:e?-1:parseInt(Me.order_limit)||-1,menu_item_limit:e?-1:parseInt(Me.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Me.staff_limit)||-1,features:Me.features.split("\n").filter(e=>e.trim()),included_modules:Me.included_modules,is_popular:Me.is_popular,is_active:Me.is_active};console.log("Updating plan with data:",r);const n=Me.id.replace("plan-",""),t=await fetch(`/api/plans/${n}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to update plan")}if(Me.currency_prices&&Object.keys(Me.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Me.currency_prices).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}le(!1),De()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),oe&&n&&(0,s.jsx)(L,{onClick:()=>se(!1),children:(0,s.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(N,{children:[(0,s.jsxs)(D,{children:["Plan Details: ",n.displayName]}),(0,s.jsx)(R,{onClick:()=>se(!1),children:"\xd7"})]}),(0,s.jsxs)(U,{children:[(0,s.jsxs)(Z,{children:[(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Plan ID"}),(0,s.jsx)(ne,{children:n.id})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Internal Name"}),(0,s.jsx)(ne,{children:n.name})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Display Name"}),(0,s.jsx)(ne,{children:n.displayName})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Status"}),(0,s.jsx)(z,{isActive:n.isActive,children:n.isActive?"Active":"Inactive"})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Popular Plan"}),(0,s.jsx)(ne,{children:n.isPopular?"Yes":"No"})]})]}),(0,s.jsxs)(Z,{children:[(0,s.jsx)("h4",{children:"Pricing"}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Monthly Price"}),(0,s.jsx)(ne,{children:(0,o.vv)(n.monthlyPrice)})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Annual Price"}),(0,s.jsx)(ne,{children:(0,o.vv)(n.annualPrice)})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Annual Discount"}),(0,s.jsxs)(ne,{children:[Math.round((12*n.monthlyPrice-n.annualPrice)/(12*n.monthlyPrice)*100),"%"]})]})]}),(0,s.jsxs)(Z,{children:[(0,s.jsx)("h4",{children:"Limits"}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Restaurant Limit"}),(0,s.jsx)(ne,{children:Qe(n.restaurantLimit)})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Monthly Order Limit"}),(0,s.jsx)(ne,{children:Qe(n.orderLimit)})]})]}),(0,s.jsxs)(Z,{children:[(0,s.jsx)("h4",{children:"Statistics"}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Current Subscriptions"}),(0,s.jsx)(ne,{children:n.subscriptionCount})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Monthly Revenue"}),(0,s.jsx)(ne,{children:(0,o.vv)(n.monthlyPrice*n.subscriptionCount)})]}),(0,s.jsxs)(ee,{children:[(0,s.jsx)(re,{children:"Created Date"}),(0,s.jsx)(ne,{children:n.createdAt})]})]}),(0,s.jsxs)(Z,{children:[(0,s.jsx)("h4",{children:"Features"}),(0,s.jsx)(b,{children:(Array.isArray(n.features)?n.features:[]).map((e,r)=>(0,s.jsx)(w,{children:e},r))})]})]})]})}),ke&&n&&(0,s.jsx)(L,{onClick:()=>Be(!1),children:(0,s.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,s.jsxs)(N,{children:[(0,s.jsxs)(D,{children:["Set Prices for ",n.displayName]}),(0,s.jsx)(R,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,s.jsxs)(U,{children:[(0,s.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,s.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ae.map(e=>{var r,n;const t=we[e];return(0,s.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,s.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,s.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===t||void 0===t?void 0:t.symbol)||e}),(null===t||void 0===t?void 0:t.name)||e," (",e,")"]}),(0,s.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,s.jsx)("input",{type:"number",value:(null===(r=Se[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>Ee({...Se,[e]:{...Se[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,s.jsx)("input",{type:"number",value:(null===(n=Se[e])||void 0===n?void 0:n.annual)||"",onChange:r=>Ee({...Se,[e]:{...Se[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===Ae.length&&(0,s.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(a.$n,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token"),r=n.id.replace("plan-",""),t=Object.entries(Se).map(e=>{let[r,n]=e;return{currency:r,monthly_price:parseFloat(n.monthly)||0,annual_price:parseFloat(n.annual)||0,is_active:!0}}),i=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:t})});if(i.ok)Be(!1);else{const e=await i.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);