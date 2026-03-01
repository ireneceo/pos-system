"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,t)=>{t.d(r,{DO:()=>c,Jt:()=>d,Qn:()=>o});t(9950);var n=t(4752),i=t(4414);const a=n.Ay.div`
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
`,l=n.Ay.input`
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
`,s=n.Ay.select`
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
`,o=e=>{let{children:r,className:t,style:n,...l}=e;return(0,i.jsx)(a,{className:t,style:n,...l,children:r})},c=e=>{let{placeholder:r="Search...",...t}=e;return(0,i.jsx)(l,{placeholder:r,...t})},d=e=>{let{children:r,...t}=e;return(0,i.jsx)(s,{...t,children:r})}},6837:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ne});var n=t(9950),i=t(4752),a=t(8409),l=t(2488),s=t(6038),o=t(4414);const c=i.Ay.div`
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
`,m=i.Ay.div`
  text-align: center;
`,x=i.Ay.div`
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
`,b=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,v=i.Ay.ul`
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
`,L=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,$=i.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,M=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,T=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,I=i.Ay.div`
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
`,O=i.Ay.div`
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
`,R=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,D=i.Ay.button`
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
`,te=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,ne=()=>{const[e,r]=(0,n.useState)([]),[t,i]=(0,n.useState)(null),[ne,ie]=(0,n.useState)(!1),[ae,le]=(0,n.useState)(!1),[se,oe]=(0,n.useState)(!1),[ce,de]=(0,n.useState)({}),[pe,ue]=(0,n.useState)(""),[he,me]=(0,n.useState)("all"),[xe,ge]=(0,n.useState)("all"),[ye,je]=(0,n.useState)("all"),[_e,fe]=(0,n.useState)("USD"),[be,ve]=(0,n.useState)([]),[we,Fe]=(0,n.useState)({}),[Ae,Ce]=(0,n.useState)([]),[ke,Be]=(0,n.useState)(!1),[,Pe]=(0,n.useState)([]),[Se,Ee]=(0,n.useState)({}),[ze,Le]=(0,n.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[$e,Me]=(0,n.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,n.useEffect)(()=>{Ne(),Oe(),Te(),Ie()},[]);const Te=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();Fe(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Ie=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();Ce((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),Ce(["USD","RM","KRW"])}};(0,n.useEffect)(()=>{Object.keys(ce).length>=0&&Re()},[ce]);const Oe=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();ve(r)}catch(e){console.error("Error fetching addon modules:",e),ve([])}},Ne=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),t={};r&&Array.isArray(r)&&r.forEach(e=>{t[e.plan_name]=e.count||0}),de(t)}catch(e){console.error("Error fetching subscription stats:",e),de({})}},Re=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const t=await e.json(),n=localStorage.getItem("auth_token"),i=await Promise.all(t.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let t=[];try{"string"===typeof e.included_modules?t=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(t=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),t=[]}let i={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])i[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:De(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),orderLimit:e.order_limit,menuItemLimit:e.menu_item_limit,staffLimit:e.staff_limit,restaurantLimit:e.restaurant_limit,managerLimit:e.manager_limit,features:r,includedModules:t,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:ce[e.display_name]||0,currencyPrices:i}}));r(i)}catch(e){console.error("Error fetching plans:",e),r(Ue())}},De=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Ue=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,menuItemLimit:50,orderLimit:1e3,staffLimit:5,restaurantLimit:-1,managerLimit:-1,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,menuItemLimit:200,orderLimit:1e4,staffLimit:20,restaurantLimit:-1,managerLimit:-1,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,menuItemLimit:-1,orderLimit:-1,staffLimit:-1,restaurantLimit:-1,managerLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Enterprise||0}],We=e.filter(e=>e.isActive).length,Je=e.reduce((e,r)=>e+r.subscriptionCount,0),Ye=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Qe=e=>-1===e?"Unlimited":e.toLocaleString(),qe=(e,r)=>e.currencyPrices&&e.currencyPrices[_e]?e.currencyPrices[_e][r]:0,Ke=e=>!!(e.currencyPrices&&e.currencyPrices[_e]&&(e.currencyPrices[_e].monthly>0||e.currencyPrices[_e].annual>0)),Ve=(e,r)=>{if(!Ke(e))return"Not Set";const t=qe(e,r);return(0,s.vv)(t,_e)},Xe=e.filter(e=>{const r=e.displayName.toLowerCase().includes(pe.toLowerCase())||e.description.toLowerCase().includes(pe.toLowerCase()),t="all"===he||e.planTarget===he,n="all"===xe||e.category===xe,i="all"===ye||"active"===ye&&e.isActive||"inactive"===ye&&!e.isActive;return r&&t&&n&&i}),Ge=e.filter(e=>"basic"===e.category).length,He=e.filter(e=>"custom"===e.category).length;return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(a.mc,{children:[(0,o.jsxs)(a.Y9,{children:[(0,o.jsx)(a.hE,{children:"Subscription Plans"}),(0,o.jsxs)(a.ex,{children:[(0,o.jsx)(a.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),t=window.URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,o.jsx)(a.$n,{variant:"primary",onClick:()=>{ie(!0)},children:"Create Plan"})]})]}),(0,o.jsxs)(a.UC,{children:[(0,o.jsxs)(a.MD,{children:[(0,o.jsxs)(a.hI,{color:"#059669",children:[(0,o.jsx)(a.Os,{children:e.length}),(0,o.jsx)(a.v0,{children:"Total Plans"}),(0,o.jsxs)(a.d1,{children:[Ge," basic + ",He," custom"]})]}),(0,o.jsxs)(a.hI,{color:"#10B981",children:[(0,o.jsx)(a.Os,{children:We}),(0,o.jsx)(a.v0,{children:"Active Plans"}),(0,o.jsxs)(a.d1,{children:[e.length>0?Math.round(We/e.length*100):0,"% available"]})]}),(0,o.jsxs)(a.hI,{color:"#F59E0B",children:[(0,o.jsx)(a.Os,{children:Je}),(0,o.jsx)(a.v0,{children:"Total Subscriptions"}),(0,o.jsx)(a.d1,{children:"Across all plans"})]}),(0,o.jsxs)(a.hI,{color:"#DC2626",children:[(0,o.jsx)(a.Os,{children:(0,s.vv)(Ye)}),(0,o.jsx)(a.v0,{children:"Monthly Revenue"}),(0,o.jsx)(a.d1,{children:"From all subscriptions"})]})]}),(0,o.jsxs)(l.Qn,{children:[(0,o.jsx)(l.DO,{type:"text",placeholder:"Search plans...",value:pe,onChange:e=>ue(e.target.value)}),(0,o.jsxs)(l.Jt,{value:he,onChange:e=>me(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Plans"}),(0,o.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,o.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,o.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"}),(0,o.jsx)("option",{value:"owner",children:"Restaurant Owner Plans"})]}),(0,o.jsxs)(l.Jt,{value:xe,onChange:e=>ge(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Categories"}),(0,o.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,o.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,o.jsxs)(l.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"active",children:"Active"}),(0,o.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,o.jsx)(l.Jt,{value:_e,onChange:e=>fe(e.target.value),style:{minWidth:"150px"},children:Ae.map(e=>{const r=we[e];return(0,o.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),(0,o.jsx)(c,{children:Xe.map(e=>(0,o.jsxs)(d,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,o.jsxs)($,{children:[(0,o.jsx)(L,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,o.jsx)(z,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{children:e.displayName}),(0,o.jsx)(h,{children:e.description}),(0,o.jsx)(m,{children:Ke(e)?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(x,{children:[Ve(e,"monthly"),(0,o.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),qe(e,"annual")>0&&qe(e,"monthly")>0&&(0,o.jsxs)(g,{children:[Ve(e,"annual"),"/year",12*qe(e,"monthly")>qe(e,"annual")&&(0,o.jsxs)("span",{children:[" (Save ",Math.round((12*qe(e,"monthly")-qe(e,"annual"))/(12*qe(e,"monthly"))*100),"%)"]})]}),(0,o.jsx)(y,{children:"Billed monthly or annually"})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(x,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,o.jsxs)(y,{style:{color:"#F59E0B"},children:["Set ",_e,' price in "Prices" button']})]})})]}),"basic"===e.category&&"restaurant"===e.planTarget&&(0,o.jsxs)(j,{children:[(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Menu Items"}),(0,o.jsx)(b,{children:Qe(e.menuItemLimit)})]}),(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Orders/month"}),(0,o.jsx)(b,{children:Qe(e.orderLimit)})]}),(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Staff"}),(0,o.jsx)(b,{children:Qe(e.staffLimit)})]})]}),"basic"===e.category&&("brand"===e.planTarget||"foodcourt"===e.planTarget)&&(0,o.jsxs)(j,{children:[(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Restaurants"}),(0,o.jsx)(b,{children:Qe(e.restaurantLimit)})]}),(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Managers"}),(0,o.jsx)(b,{children:Qe(e.managerLimit)})]})]}),"basic"===e.category&&"owner"===e.planTarget&&(0,o.jsx)(j,{children:(0,o.jsxs)(_,{children:[(0,o.jsx)(f,{children:"Restaurants"}),(0,o.jsx)(b,{children:Qe(e.restaurantLimit)})]})}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>be.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),t=e.includedModules.map(e=>be.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,o.jsxs)(o.Fragment,{children:[r.length>0&&(0,o.jsxs)(F,{children:[(0,o.jsxs)(A,{children:["Basic Modules (",r.length,")"]}),(0,o.jsx)(C,{children:r.map((e,r)=>(0,o.jsx)(k,{children:e.name},r))})]}),t.length>0&&(0,o.jsxs)(F,{children:[(0,o.jsxs)(A,{children:["Advanced Modules (",t.length,")"]}),(0,o.jsx)(C,{children:t.map((e,r)=>(0,o.jsx)(k,{children:e.name},r))})]})]})})(),(0,o.jsx)(v,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,o.jsx)(w,{children:e},r))}),(0,o.jsxs)(B,{children:[(0,o.jsxs)(P,{children:[(0,o.jsx)(S,{children:e.subscriptionCount}),(0,o.jsx)(E,{children:"Subscriptions"})]}),(0,o.jsxs)(P,{children:[(0,o.jsx)(S,{children:(0,s.vv)(qe(e,"monthly")*e.subscriptionCount,_e)}),(0,o.jsx)(E,{children:"Monthly Revenue"})]})]}),(0,o.jsxs)(M,{children:[(0,o.jsx)(T,{variant:"primary",onClick:()=>(async e=>{i(e);let r={};try{const i=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(l.ok){const e=await l.json();for(const i of e.data||[]){var t,n;r[i.currency]={monthly:(null===(t=i.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(n=i.annual_price)||void 0===n?void 0:n.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Me({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:e.menuItemLimit.toString(),staff_limit:e.staffLimit.toString(),restaurant_limit:e.restaurantLimit.toString(),manager_limit:e.managerLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),le(!0)})(e),children:"Edit"}),(0,o.jsx)(T,{variant:"secondary",onClick:()=>{i(e),(async e=>{try{const n=localStorage.getItem("auth_token"),i=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();Pe(e.data||[]);const n={};for(const i of e.data||[]){var r,t;n[i.currency]={monthly:(null===(r=i.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=i.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of Ae)n[r]||(n[r]={monthly:"0",annual:"0"});Ee(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),Be(!0)},children:"Prices"}),(0,o.jsx)(T,{variant:"secondary",onClick:()=>(e=>{i(e),oe(!0)})(e),children:"View"})]})]},e.id))}),ne&&(0,o.jsx)(I,{onClick:()=>ie(!1),children:(0,o.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(N,{children:[(0,o.jsx)(R,{children:"Create New Plan"}),(0,o.jsx)(D,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,o.jsxs)(U,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Target *"}),(0,o.jsxs)(Q,{value:ze.plan_target,onChange:e=>Le(r=>({...r,plan_target:e.target.value})),children:[(0,o.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,o.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,o.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,o.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Category *"}),(0,o.jsxs)(Q,{value:ze.category,onChange:e=>Le(r=>({...r,category:e.target.value})),children:[(0,o.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,o.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Name *"}),(0,o.jsx)(Y,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:ze.display_name,onChange:e=>{const r=e.target.value,t=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();Le(e=>({...e,display_name:r,name:t}))}})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Description"}),(0,o.jsx)(q,{placeholder:"Enter plan description...",rows:3,value:ze.description,onChange:e=>Le(r=>({...r,description:e.target.value}))})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Pricing by Currency"}),(0,o.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,t,n,i;const a=we[e];return(0,o.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,o.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,o.jsxs)(K,{children:[(0,o.jsxs)(W,{style:{marginBottom:0},children:[(0,o.jsx)(J,{style:{fontSize:"12px"},children:"Monthly"}),(0,o.jsx)(Y,{type:"number",placeholder:"0",value:(null===(r=ze.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Le(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,o.jsxs)(W,{style:{marginBottom:0},children:[(0,o.jsx)(J,{style:{fontSize:"12px"},children:"Annual"}),(0,o.jsx)(Y,{type:"number",placeholder:"0",value:(null===(n=ze.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Le(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,o.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===ze.category&&"restaurant"===ze.plan_target&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(V,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Menu Item Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.menu_item_limit,onChange:e=>Le(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Order Limit (per month)"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.order_limit,onChange:e=>Le(r=>({...r,order_limit:e.target.value}))})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Staff Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.staff_limit,onChange:e=>Le(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===ze.category&&("brand"===ze.plan_target||"foodcourt"===ze.plan_target)&&(0,o.jsxs)(V,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Restaurant Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.restaurant_limit,onChange:e=>Le(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Manager Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.manager_limit,onChange:e=>Le(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===ze.category&&"owner"===ze.plan_target&&(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Restaurant Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:ze.restaurant_limit,onChange:e=>Le(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===ze.category&&(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Included Modules"}),be.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Features (one per line)"}),(0,o.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:ze.features,onChange:e=>Le(r=>({...r,features:e.target.value}))})]}),(0,o.jsxs)(X,{children:[(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:"popular",checked:ze.is_popular,onChange:e=>Le(r=>({...r,is_popular:e.target.checked}))}),(0,o.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:"active",checked:ze.is_active,onChange:e=>Le(r=>({...r,is_active:e.target.checked}))}),(0,o.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,o.jsxs)(H,{children:[(0,o.jsx)(a.$n,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,o.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===ze.category,r={name:ze.name,display_name:ze.display_name,description:ze.description,category:ze.category,plan_target:ze.plan_target,base_price_monthly:parseFloat(ze.base_price_monthly)||0,base_price_annual:parseFloat(ze.base_price_annual)||0,order_limit:e?-1:parseInt(ze.order_limit)||-1,menu_item_limit:e?-1:parseInt(ze.menu_item_limit)||-1,staff_limit:e?-1:parseInt(ze.staff_limit)||-1,restaurant_limit:e?-1:parseInt(ze.restaurant_limit)||-1,manager_limit:e?-1:parseInt(ze.manager_limit)||-1,features:ze.features.split("\n").filter(e=>e.trim()),included_modules:ze.included_modules,is_popular:ze.is_popular,is_active:ze.is_active};console.log("Creating plan with data:",r);const t=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to create plan")}const n=await t.json();if(ze.currency_prices&&Object.keys(ze.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(ze.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}Le({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ie(!1),Re()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ae&&t&&(0,o.jsx)(I,{onClick:()=>le(!1),children:(0,o.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(N,{children:[(0,o.jsxs)(R,{children:["Edit Plan: ",t.displayName]}),(0,o.jsx)(D,{onClick:()=>le(!1),children:"\xd7"})]}),(0,o.jsxs)(U,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Name *"}),(0,o.jsx)(Y,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:$e.display_name,onChange:e=>Me(r=>({...r,display_name:e.target.value}))}),(0,o.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",$e.name]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Target *"}),(0,o.jsxs)(Q,{value:$e.plan_target,onChange:e=>Me(r=>({...r,plan_target:e.target.value})),children:[(0,o.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,o.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,o.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,o.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Plan Category *"}),(0,o.jsxs)(Q,{value:$e.category,onChange:e=>Me(r=>({...r,category:e.target.value})),children:[(0,o.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,o.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Pricing by Currency"}),(0,o.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,t,n,i;const a=we[e];return(0,o.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,o.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,o.jsxs)(K,{children:[(0,o.jsxs)(W,{style:{marginBottom:0},children:[(0,o.jsx)(J,{style:{fontSize:"12px"},children:"Monthly"}),(0,o.jsx)(Y,{type:"number",placeholder:"0",value:(null===(r=$e.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Me(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,o.jsxs)(W,{style:{marginBottom:0},children:[(0,o.jsx)(J,{style:{fontSize:"12px"},children:"Annual"}),(0,o.jsx)(Y,{type:"number",placeholder:"0",value:(null===(n=$e.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Me(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,o.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===$e.category&&"restaurant"===$e.plan_target&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(V,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Menu Item Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.menu_item_limit,onChange:e=>Me(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Order Limit (per month)"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.order_limit,onChange:e=>Me(r=>({...r,order_limit:e.target.value}))})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Staff Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.staff_limit,onChange:e=>Me(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===$e.category&&("brand"===$e.plan_target||"foodcourt"===$e.plan_target)&&(0,o.jsxs)(V,{children:[(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Restaurant Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.restaurant_limit,onChange:e=>Me(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Manager Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.manager_limit,onChange:e=>Me(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===$e.category&&"owner"===$e.plan_target&&(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Restaurant Limit"}),(0,o.jsx)(Y,{type:"number",placeholder:"-1 for unlimited",value:$e.restaurant_limit,onChange:e=>Me(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===$e.category&&(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Included Modules"}),be.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"revenue"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"revenue"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"operation"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"operation"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),be.filter(e=>"analytics"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,o.jsx)(X,{children:be.filter(e=>"analytics"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,o.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,o.jsx)("strong",{children:e.name}),(0,o.jsx)("br",{}),(0,o.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)(J,{children:"Features (one per line)"}),(0,o.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:$e.features,onChange:e=>Me(r=>({...r,features:e.target.value}))})]}),(0,o.jsxs)(X,{children:[(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:"edit-popular",checked:$e.is_popular,onChange:e=>Me(r=>({...r,is_popular:e.target.checked}))}),(0,o.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)("input",{type:"checkbox",id:"edit-active",checked:$e.is_active,onChange:e=>Me(r=>({...r,is_active:e.target.checked}))}),(0,o.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,o.jsxs)(H,{children:[(0,o.jsx)(a.$n,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,o.jsx)(a.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}le(!1),Re()}catch(r){console.error("Error deleting plan:",r)}})(t.id),children:"Delete"}),(0,o.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{if(!$e.display_name)return void console.log("Display name is required");const e="custom"===$e.category,r={display_name:$e.display_name,description:$e.description,category:$e.category,plan_target:$e.plan_target,base_price_monthly:parseFloat($e.base_price_monthly)||0,base_price_annual:parseFloat($e.base_price_annual)||0,order_limit:e?-1:parseInt($e.order_limit)||-1,menu_item_limit:e?-1:parseInt($e.menu_item_limit)||-1,staff_limit:e?-1:parseInt($e.staff_limit)||-1,restaurant_limit:e?-1:parseInt($e.restaurant_limit)||-1,manager_limit:e?-1:parseInt($e.manager_limit)||-1,features:$e.features.split("\n").filter(e=>e.trim()),included_modules:$e.included_modules,is_popular:$e.is_popular,is_active:$e.is_active};console.log("Updating plan with data:",r);const t=$e.id.replace("plan-",""),n=await fetch(`/api/plans/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if($e.currency_prices&&Object.keys($e.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries($e.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${t}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}le(!1),Re()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),se&&t&&(0,o.jsx)(I,{onClick:()=>oe(!1),children:(0,o.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(N,{children:[(0,o.jsxs)(R,{children:["Plan Details: ",t.displayName]}),(0,o.jsx)(D,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,o.jsxs)(U,{children:[(0,o.jsxs)(Z,{children:[(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Plan ID"}),(0,o.jsx)(te,{children:t.id})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Internal Name"}),(0,o.jsx)(te,{children:t.name})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Display Name"}),(0,o.jsx)(te,{children:t.displayName})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Status"}),(0,o.jsx)(z,{isActive:t.isActive,children:t.isActive?"Active":"Inactive"})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Popular Plan"}),(0,o.jsx)(te,{children:t.isPopular?"Yes":"No"})]})]}),(0,o.jsxs)(Z,{children:[(0,o.jsx)("h4",{children:"Pricing"}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Monthly Price"}),(0,o.jsx)(te,{children:(0,s.vv)(t.monthlyPrice)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Annual Price"}),(0,o.jsx)(te,{children:(0,s.vv)(t.annualPrice)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Annual Discount"}),(0,o.jsxs)(te,{children:[Math.round((12*t.monthlyPrice-t.annualPrice)/(12*t.monthlyPrice)*100),"%"]})]})]}),(0,o.jsxs)(Z,{children:[(0,o.jsx)("h4",{children:"Limits"}),"restaurant"===t.planTarget&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Menu Item Limit"}),(0,o.jsx)(te,{children:Qe(t.menuItemLimit)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Monthly Order Limit"}),(0,o.jsx)(te,{children:Qe(t.orderLimit)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Staff Limit"}),(0,o.jsx)(te,{children:Qe(t.staffLimit)})]})]}),("brand"===t.planTarget||"foodcourt"===t.planTarget)&&(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Restaurant Limit"}),(0,o.jsx)(te,{children:Qe(t.restaurantLimit)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Manager Limit"}),(0,o.jsx)(te,{children:Qe(t.managerLimit)})]})]}),"owner"===t.planTarget&&(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Restaurant Limit"}),(0,o.jsx)(te,{children:Qe(t.restaurantLimit)})]})]}),(0,o.jsxs)(Z,{children:[(0,o.jsx)("h4",{children:"Statistics"}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Current Subscriptions"}),(0,o.jsx)(te,{children:t.subscriptionCount})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Monthly Revenue"}),(0,o.jsx)(te,{children:(0,s.vv)(t.monthlyPrice*t.subscriptionCount)})]}),(0,o.jsxs)(ee,{children:[(0,o.jsx)(re,{children:"Created Date"}),(0,o.jsx)(te,{children:t.createdAt})]})]}),(0,o.jsxs)(Z,{children:[(0,o.jsx)("h4",{children:"Features"}),(0,o.jsx)(v,{children:(Array.isArray(t.features)?t.features:[]).map((e,r)=>(0,o.jsx)(w,{children:e},r))})]})]})]})}),ke&&t&&(0,o.jsx)(I,{onClick:()=>Be(!1),children:(0,o.jsxs)(O,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,o.jsxs)(N,{children:[(0,o.jsxs)(R,{children:["Set Prices for ",t.displayName]}),(0,o.jsx)(D,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,o.jsxs)(U,{children:[(0,o.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,o.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ae.map(e=>{var r,t;const n=we[e];return(0,o.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,o.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,o.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,o.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,o.jsx)("input",{type:"number",value:(null===(r=Se[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>Ee({...Se,[e]:{...Se[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,o.jsx)("input",{type:"number",value:(null===(t=Se[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Ee({...Se,[e]:{...Se[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===Ae.length&&(0,o.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,o.jsxs)(H,{children:[(0,o.jsx)(a.$n,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,o.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token"),r=t.id.replace("plan-",""),n=Object.entries(Se).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}}),i=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(i.ok)Be(!1);else{const e=await i.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);