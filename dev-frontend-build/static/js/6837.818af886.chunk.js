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
`,o=e=>{let{children:r,className:t,style:n,...l}=e;return(0,i.jsx)(a,{className:t,style:n,...l,children:r})},c=e=>{let{placeholder:r="Search...",...t}=e;return(0,i.jsx)(l,{placeholder:r,...t})},d=e=>{let{children:r,...t}=e;return(0,i.jsx)(s,{...t,children:r})}},6837:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ie});var n=t(9950),i=t(4752),a=t(8409),l=t(2488),s=t(6038),o=t(7617),c=t(4414);const d=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,p=i.Ay.div`
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
`,u=i.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,h=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,m=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,x=i.Ay.div`
  text-align: center;
`,g=i.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,y=i.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,_=i.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,f=i.Ay.div`
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
`,v=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,w=i.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,F=i.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=i.Ay.div`
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
`,k=i.Ay.div`
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
`,P=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,S=i.Ay.div`
  text-align: center;
`,E=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,z=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,L=i.Ay.span`
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
`,T=i.Ay.div`
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
`,I=i.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,O=i.Ay.div`
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
`,R=i.Ay.div`
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
`,U=i.Ay.button`
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
`,W=i.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,J=i.Ay.div`
  margin-bottom: 20px;
`,Y=i.Ay.label`
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
`,q=i.Ay.select`
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
`,H=i.Ay.textarea`
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
`,Z=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,ee=i.Ay.div`
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
`,ne=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,ie=()=>{const[e,r]=(0,n.useState)([]),[t,i]=(0,n.useState)(null),[ie,ae]=(0,n.useState)(!1),[le,se]=(0,n.useState)(!1),[oe,ce]=(0,n.useState)(!1),[de,pe]=(0,n.useState)({}),[ue,he]=(0,n.useState)(""),[me,xe]=(0,n.useState)("all"),[ge,ye]=(0,n.useState)("all"),[je,_e]=(0,n.useState)("all"),[fe,be]=(0,n.useState)("USD"),[ve,we]=(0,n.useState)([]),[Fe,Ae]=(0,n.useState)({}),[Ce,ke]=(0,n.useState)([]),[Be,Pe]=(0,n.useState)(!1),[,Se]=(0,n.useState)([]),[Ee,ze]=(0,n.useState)({}),[Le,$e]=(0,n.useState)(!1),[Te,Me]=(0,n.useState)(null),[Ie,Oe]=(0,n.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[Ne,Re]=(0,n.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,n.useEffect)(()=>{Je(),We(),De(),Ue()},[]);const De=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();Ae(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Ue=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();ke((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),ke(["USD","RM","KRW"])}};(0,n.useEffect)(()=>{Object.keys(de).length>=0&&Ye()},[de]);const We=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();we(r)}catch(e){console.error("Error fetching addon modules:",e),we([])}},Je=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),t={};r&&Array.isArray(r)&&r.forEach(e=>{t[e.plan_name]=e.count||0}),pe(t)}catch(e){console.error("Error fetching subscription stats:",e),pe({})}},Ye=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const t=await e.json(),n=localStorage.getItem("auth_token"),i=await Promise.all(t.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let t=[];try{"string"===typeof e.included_modules?t=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(t=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),t=[]}let i={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])i[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Qe(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),orderLimit:e.order_limit,menuItemLimit:e.menu_item_limit,staffLimit:e.staff_limit,restaurantLimit:e.restaurant_limit,managerLimit:e.manager_limit,features:r,includedModules:t,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:de[e.display_name]||0,currencyPrices:i}}));r(i)}catch(e){console.error("Error fetching plans:",e),r(qe())}},Qe=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},qe=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,menuItemLimit:50,orderLimit:1e3,staffLimit:5,restaurantLimit:-1,managerLimit:-1,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,menuItemLimit:200,orderLimit:1e4,staffLimit:20,restaurantLimit:-1,managerLimit:-1,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,menuItemLimit:-1,orderLimit:-1,staffLimit:-1,restaurantLimit:-1,managerLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Enterprise||0}],He=e.filter(e=>e.isActive).length,Ke=e.reduce((e,r)=>e+r.subscriptionCount,0),Ve=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Xe=e=>-1===e?"Unlimited":e.toLocaleString(),Ge=(e,r)=>e.currencyPrices&&e.currencyPrices[fe]?e.currencyPrices[fe][r]:0,Ze=e=>!!(e.currencyPrices&&e.currencyPrices[fe]&&(e.currencyPrices[fe].monthly>0||e.currencyPrices[fe].annual>0)),er=(e,r)=>{if(!Ze(e))return"Not Set";const t=Ge(e,r);return(0,s.vv)(t,fe)},rr=e.filter(e=>{const r=e.displayName.toLowerCase().includes(ue.toLowerCase())||e.description.toLowerCase().includes(ue.toLowerCase()),t="all"===me||e.planTarget===me,n="all"===ge||e.category===ge,i="all"===je||"active"===je&&e.isActive||"inactive"===je&&!e.isActive;return r&&t&&n&&i}),tr=e.filter(e=>"basic"===e.category).length,nr=e.filter(e=>"custom"===e.category).length;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"Subscription Plans"}),(0,c.jsxs)(a.ex,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),t=window.URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(a.MD,{children:[(0,c.jsxs)(a.hI,{color:"#059669",children:[(0,c.jsx)(a.Os,{children:e.length}),(0,c.jsx)(a.v0,{children:"Total Plans"}),(0,c.jsxs)(a.d1,{children:[tr," basic + ",nr," custom"]})]}),(0,c.jsxs)(a.hI,{color:"#10B981",children:[(0,c.jsx)(a.Os,{children:He}),(0,c.jsx)(a.v0,{children:"Active Plans"}),(0,c.jsxs)(a.d1,{children:[e.length>0?Math.round(He/e.length*100):0,"% available"]})]}),(0,c.jsxs)(a.hI,{color:"#F59E0B",children:[(0,c.jsx)(a.Os,{children:Ke}),(0,c.jsx)(a.v0,{children:"Total Subscriptions"}),(0,c.jsx)(a.d1,{children:"Across all plans"})]}),(0,c.jsxs)(a.hI,{color:"#DC2626",children:[(0,c.jsx)(a.Os,{children:(0,s.vv)(Ve)}),(0,c.jsx)(a.v0,{children:"Monthly Revenue"}),(0,c.jsx)(a.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(l.Qn,{children:[(0,c.jsx)(l.DO,{type:"text",placeholder:"Search plans...",value:ue,onChange:e=>he(e.target.value)}),(0,c.jsxs)(l.Jt,{value:me,onChange:e=>xe(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plans"})]}),(0,c.jsxs)(l.Jt,{value:ge,onChange:e=>ye(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(l.Jt,{value:je,onChange:e=>_e(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(l.Jt,{value:fe,onChange:e=>be(e.target.value),style:{minWidth:"150px"},children:Ce.map(e=>{const r=Fe[e];return(0,c.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),(0,c.jsx)(d,{children:rr.map(e=>(0,c.jsxs)(p,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(T,{children:[(0,c.jsx)($,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)(L,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:e.displayName}),(0,c.jsx)(m,{children:e.description}),(0,c.jsx)(x,{children:Ze(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(g,{children:[er(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Ge(e,"annual")>0&&Ge(e,"monthly")>0&&(0,c.jsxs)(y,{children:[er(e,"annual"),"/year",12*Ge(e,"monthly")>Ge(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*Ge(e,"monthly")-Ge(e,"annual"))/(12*Ge(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",fe,' price in "Prices" button']})]})})]}),"basic"===e.category&&"restaurant"===e.planTarget&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Menu Items"}),(0,c.jsx)(v,{children:Xe(e.menuItemLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Orders/month"}),(0,c.jsx)(v,{children:Xe(e.orderLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Staff"}),(0,c.jsx)(v,{children:Xe(e.staffLimit)})]})]}),"basic"===e.category&&("brand"===e.planTarget||"foodcourt"===e.planTarget)&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Restaurants"}),(0,c.jsx)(v,{children:Xe(e.restaurantLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Managers"}),(0,c.jsx)(v,{children:Xe(e.managerLimit)})]})]}),"basic"===e.category&&"owner"===e.planTarget&&(0,c.jsx)(_,{children:(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Restaurants"}),(0,c.jsx)(v,{children:Xe(e.restaurantLimit)})]})}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),t=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(A,{children:[(0,c.jsxs)(C,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(k,{children:r.map((e,r)=>(0,c.jsx)(B,{children:e.name},r))})]}),t.length>0&&(0,c.jsxs)(A,{children:[(0,c.jsxs)(C,{children:["Advanced Modules (",t.length,")"]}),(0,c.jsx)(k,{children:t.map((e,r)=>(0,c.jsx)(B,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(F,{children:e},r))}),(0,c.jsxs)(P,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:e.subscriptionCount}),(0,c.jsx)(z,{children:"Subscriptions"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:(0,s.vv)(Ge(e,"monthly")*e.subscriptionCount,fe)}),(0,c.jsx)(z,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>(async e=>{i(e);let r={};try{const i=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(l.ok){const e=await l.json();for(const i of e.data||[]){var t,n;r[i.currency]={monthly:(null===(t=i.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(n=i.annual_price)||void 0===n?void 0:n.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Re({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:e.menuItemLimit.toString(),staff_limit:e.staffLimit.toString(),restaurant_limit:e.restaurantLimit.toString(),manager_limit:e.managerLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),se(!0)})(e),children:"Edit"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>{i(e),(async e=>{try{const n=localStorage.getItem("auth_token"),i=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();Se(e.data||[]);const n={};for(const i of e.data||[]){var r,t;n[i.currency]={monthly:(null===(r=i.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=i.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of Ce)n[r]||(n[r]={monthly:"0",annual:"0"});ze(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),Pe(!0)},children:"Prices"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>(e=>{i(e),ce(!0)})(e),children:"View"})]})]},e.id))}),ie&&(0,c.jsx)(O,{onClick:()=>ae(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(R,{children:[(0,c.jsx)(D,{children:"Create New Plan"}),(0,c.jsx)(U,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:Ie.plan_target,onChange:e=>Oe(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:Ie.category,onChange:e=>Oe(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Ie.display_name,onChange:e=>{const r=e.target.value,t=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();Oe(e=>({...e,display_name:r,name:t}))}})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Description"}),(0,c.jsx)(H,{placeholder:"Enter plan description...",rows:3,value:Ie.description,onChange:e=>Oe(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ce.map(e=>{var r,t,n,i;const a=Fe[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(K,{children:[(0,c.jsxs)(J,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=Ie.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Oe(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(J,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=Ie.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Oe(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===Ie.category&&"restaurant"===Ie.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(V,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.menu_item_limit,onChange:e=>Oe(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.order_limit,onChange:e=>Oe(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.staff_limit,onChange:e=>Oe(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Ie.category&&("brand"===Ie.plan_target||"foodcourt"===Ie.plan_target)&&(0,c.jsxs)(V,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Restaurant Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.restaurant_limit,onChange:e=>Oe(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Manager Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.manager_limit,onChange:e=>Oe(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===Ie.category&&"owner"===Ie.plan_target&&(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Restaurant Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ie.restaurant_limit,onChange:e=>Oe(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===Ie.category&&(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ie.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Oe(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Oe(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ie.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Oe(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Oe(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ie.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Oe(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Oe(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"operation"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"operation"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ie.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Oe(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Oe(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Ie.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ie.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Oe(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Oe(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(H,{placeholder:"Enter features, one per line...",rows:6,value:Ie.features,onChange:e=>Oe(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(X,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:Ie.is_popular,onChange:e=>Oe(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:Ie.is_active,onChange:e=>Oe(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===Ie.category,r={name:Ie.name,display_name:Ie.display_name,description:Ie.description,category:Ie.category,plan_target:Ie.plan_target,base_price_monthly:parseFloat(Ie.base_price_monthly)||0,base_price_annual:parseFloat(Ie.base_price_annual)||0,order_limit:e?-1:parseInt(Ie.order_limit)||-1,menu_item_limit:e?-1:parseInt(Ie.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Ie.staff_limit)||-1,restaurant_limit:e?-1:parseInt(Ie.restaurant_limit)||-1,manager_limit:e?-1:parseInt(Ie.manager_limit)||-1,features:Ie.features.split("\n").filter(e=>e.trim()),included_modules:Ie.included_modules,is_popular:Ie.is_popular,is_active:Ie.is_active};console.log("Creating plan with data:",r);const t=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to create plan")}const n=await t.json();if(Ie.currency_prices&&Object.keys(Ie.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Ie.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}Oe({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ae(!1),Ye()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),le&&t&&(0,c.jsx)(O,{onClick:()=>se(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(R,{children:[(0,c.jsxs)(D,{children:["Edit Plan: ",t.displayName]}),(0,c.jsx)(U,{onClick:()=>se(!1),children:"\xd7"})]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Ne.display_name,onChange:e=>Re(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",Ne.name]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:Ne.plan_target,onChange:e=>Re(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:Ne.category,onChange:e=>Re(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ce.map(e=>{var r,t,n,i;const a=Fe[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(K,{children:[(0,c.jsxs)(J,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=Ne.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Re(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(J,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=Ne.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Re(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===Ne.category&&"restaurant"===Ne.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(V,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.menu_item_limit,onChange:e=>Re(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.order_limit,onChange:e=>Re(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.staff_limit,onChange:e=>Re(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Ne.category&&("brand"===Ne.plan_target||"foodcourt"===Ne.plan_target)&&(0,c.jsxs)(V,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Restaurant Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.restaurant_limit,onChange:e=>Re(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Manager Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.manager_limit,onChange:e=>Re(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===Ne.category&&"owner"===Ne.plan_target&&(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Restaurant Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ne.restaurant_limit,onChange:e=>Re(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===Ne.category&&(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ne.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Re(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Re(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ne.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Re(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Re(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"revenue"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ne.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Re(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Re(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"operation"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"operation"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ne.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Re(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Re(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(X,{children:ve.filter(e=>"analytics"===e.category&&(e.target_user_type===Ne.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ne.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Re(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Re(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(H,{placeholder:"Enter features, one per line...",rows:6,value:Ne.features,onChange:e=>Re(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(X,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Ne.is_popular,onChange:e=>Re(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:Ne.is_active,onChange:e=>Re(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=t.id,Me(e),void $e(!0);var e},children:"Delete"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{if(!Ne.display_name)return void console.log("Display name is required");const e="custom"===Ne.category,r={display_name:Ne.display_name,description:Ne.description,category:Ne.category,plan_target:Ne.plan_target,base_price_monthly:parseFloat(Ne.base_price_monthly)||0,base_price_annual:parseFloat(Ne.base_price_annual)||0,order_limit:e?-1:parseInt(Ne.order_limit)||-1,menu_item_limit:e?-1:parseInt(Ne.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Ne.staff_limit)||-1,restaurant_limit:e?-1:parseInt(Ne.restaurant_limit)||-1,manager_limit:e?-1:parseInt(Ne.manager_limit)||-1,features:Ne.features.split("\n").filter(e=>e.trim()),included_modules:Ne.included_modules,is_popular:Ne.is_popular,is_active:Ne.is_active};console.log("Updating plan with data:",r);const t=Ne.id.replace("plan-",""),n=await fetch(`/api/plans/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if(Ne.currency_prices&&Object.keys(Ne.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Ne.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${t}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}se(!1),Ye()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),oe&&t&&(0,c.jsx)(O,{onClick:()=>ce(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(R,{children:[(0,c.jsxs)(D,{children:["Plan Details: ",t.displayName]}),(0,c.jsx)(U,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(ee,{children:[(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Plan ID"}),(0,c.jsx)(ne,{children:t.id})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Internal Name"}),(0,c.jsx)(ne,{children:t.name})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Display Name"}),(0,c.jsx)(ne,{children:t.displayName})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Status"}),(0,c.jsx)(L,{isActive:t.isActive,children:t.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Popular Plan"}),(0,c.jsx)(ne,{children:t.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Monthly Price"}),(0,c.jsx)(ne,{children:(0,s.vv)(t.monthlyPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Annual Price"}),(0,c.jsx)(ne,{children:(0,s.vv)(t.annualPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Annual Discount"}),(0,c.jsxs)(ne,{children:[Math.round((12*t.monthlyPrice-t.annualPrice)/(12*t.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Limits"}),"restaurant"===t.planTarget&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Menu Item Limit"}),(0,c.jsx)(ne,{children:Xe(t.menuItemLimit)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Monthly Order Limit"}),(0,c.jsx)(ne,{children:Xe(t.orderLimit)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Staff Limit"}),(0,c.jsx)(ne,{children:Xe(t.staffLimit)})]})]}),("brand"===t.planTarget||"foodcourt"===t.planTarget)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Restaurant Limit"}),(0,c.jsx)(ne,{children:Xe(t.restaurantLimit)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Manager Limit"}),(0,c.jsx)(ne,{children:Xe(t.managerLimit)})]})]}),"owner"===t.planTarget&&(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Restaurant Limit"}),(0,c.jsx)(ne,{children:Xe(t.restaurantLimit)})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Current Subscriptions"}),(0,c.jsx)(ne,{children:t.subscriptionCount})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Monthly Revenue"}),(0,c.jsx)(ne,{children:(0,s.vv)(t.monthlyPrice*t.subscriptionCount)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(te,{children:"Created Date"}),(0,c.jsx)(ne,{children:t.createdAt})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(t.features)?t.features:[]).map((e,r)=>(0,c.jsx)(F,{children:e},r))})]})]})]})}),Be&&t&&(0,c.jsx)(O,{onClick:()=>Pe(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)(R,{children:[(0,c.jsxs)(D,{children:["Set Prices for ",t.displayName]}),(0,c.jsx)(U,{onClick:()=>Pe(!1),children:"\xd7"})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ce.map(e=>{var r,t;const n=Fe[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Ee[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>ze({...Ee,[e]:{...Ee[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(t=Ee[e])||void 0===t?void 0:t.annual)||"",onChange:r=>ze({...Ee,[e]:{...Ee[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===Ce.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>Pe(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token"),r=t.id.replace("plan-",""),n=Object.entries(Ee).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}}),i=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(i.ok)Pe(!1);else{const e=await i.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]}),(0,c.jsx)(o.A,{isOpen:Le,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(Te){$e(!1);try{const e=await fetch(`/api/plans/${Te}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!e.ok){const r=await e.json();throw new Error(r.error||"Failed to delete plan")}se(!1),Ye()}catch(e){console.error("Error deleting plan:",e)}Me(null)}},onCancel:()=>{$e(!1),Me(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),i=t(9610),a=t(4414);const l=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,o=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,d=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=n.Ay.button`
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
`,u=e=>{let{isOpen:r,title:t,message:n,onConfirm:u,onCancel:h,confirmText:m="Confirm",cancelText:x="Cancel",type:g="warning"}=e;return r?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(o,{children:t}),(0,a.jsx)(c,{children:n})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:x}),(0,a.jsx)(p,{variant:"primary",type:g,onClick:u,children:m})]})]})}):null}}}]);