"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>p,Qn:()=>c});var n=t(8819),i=(t(9950),t(4752)),a=t(4414);const l=i.Ay.div`
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
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
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
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
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
`,c=e=>{let{children:r,className:t,style:n,...i}=e;return(0,a.jsx)(l,{className:t,style:n,...i,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,a.jsx)(s,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,a.jsx)(o,{...t,children:r})}},6837:(e,r,t)=>{t.r(r),t.d(r,{default:()=>W});var n=t(8819),i=t(9950),a=t(4752),l=t(2674),s=t(2488),o=t(6038),c=t(4414);const d=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,p=a.Ay.div`
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
`,u=a.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,m=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
  margin-bottom: 8px;
  text-transform: capitalize;
`,h=a.Ay.p`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  margin-bottom: 24px;
`,x=a.Ay.div`
  text-align: center;
`,g=a.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
`,y=a.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,j=a.Ay.div`
  font-size: 12px;
  color: ${n.w.colors.text.muted};
`,_=a.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: ${n.w.colors.surfaceHover};
  border-radius: 12px;
`,f=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,v=a.Ay.span`
  font-size: 14px;
  color: ${n.w.colors.text.dark};
`,b=a.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
`,w=a.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0;
`,C=a.Ay.li`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  line-height: 1.5;
`,F=a.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid ${n.w.colors.border};
`,k=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: ${n.w.colors.text.muted};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,P=a.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,S=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid ${n.w.colors.border};
  border-bottom: 1px solid #E6EBF1;
`,E=a.Ay.div`
  text-align: center;
`,B=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,$=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,L=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,R=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,z=a.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,M=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,T=a.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?`\n    background: ${n.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":`\n    background: transparent;\n    color: ${n.w.colors.text.muted};\n    border-color: ${n.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: ${n.w.colors.secondary};\n    }\n  `}
`,I=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,N=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,D=a.Ay.div`
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
    color: ${n.w.colors.secondary};
    cursor: pointer;
  }
`,Q=a.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,U=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,Z=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,J=a.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,W=()=>{const[e,r]=(0,i.useState)([]),[t,n]=(0,i.useState)(null),[a,W]=(0,i.useState)(!1),[H,X]=(0,i.useState)(!1),[Y,q]=(0,i.useState)(!1),[K,V]=(0,i.useState)({}),[G,ee]=(0,i.useState)(""),[re,te]=(0,i.useState)("all"),[ne,ie]=(0,i.useState)("all"),[ae,le]=(0,i.useState)("all"),[se,oe]=(0,i.useState)("USD"),[ce,de]=(0,i.useState)([]),[pe,ue]=(0,i.useState)({}),[me,he]=(0,i.useState)([]),[xe,ge]=(0,i.useState)(!1),[,ye]=(0,i.useState)([]),[je,_e]=(0,i.useState)({}),[fe,ve]=(0,i.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[be,we]=(0,i.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,i.useEffect)(()=>{Ae(),ke(),Ce(),Fe()},[]);const Ce=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();ue(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Fe=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();he((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),he(["USD","RM","KRW"])}};(0,i.useEffect)(()=>{Object.keys(K).length>=0&&Pe()},[K]);const ke=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();de(r)}catch(e){console.error("Error fetching addon modules:",e),de([])}},Ae=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),t={};r&&Array.isArray(r)&&r.forEach(e=>{t[e.plan_name]=e.count||0}),V(t)}catch(e){console.error("Error fetching subscription stats:",e),V({})}},Pe=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const t=await e.json(),n=localStorage.getItem("auth_token"),i=await Promise.all(t.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let t=[];try{"string"===typeof e.included_modules?t=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(t=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),t=[]}let i={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])i[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Se(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),orderLimit:e.order_limit,menuItemLimit:e.menu_item_limit,staffLimit:e.staff_limit,restaurantLimit:e.restaurant_limit,managerLimit:e.manager_limit,features:r,includedModules:t,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:K[e.display_name]||0,currencyPrices:i}}));r(i)}catch(e){console.error("Error fetching plans:",e),r(Ee())}},Se=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Ee=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,menuItemLimit:50,orderLimit:1e3,staffLimit:5,restaurantLimit:-1,managerLimit:-1,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:K.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,menuItemLimit:200,orderLimit:1e4,staffLimit:20,restaurantLimit:-1,managerLimit:-1,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:K.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,menuItemLimit:-1,orderLimit:-1,staffLimit:-1,restaurantLimit:-1,managerLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:K.Enterprise||0}],Be=e.filter(e=>e.isActive).length,$e=e.reduce((e,r)=>e+r.subscriptionCount,0),Le=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Re=e=>-1===e?"Unlimited":e.toLocaleString(),ze=(e,r)=>e.currencyPrices&&e.currencyPrices[se]?e.currencyPrices[se][r]:0,Me=e=>!!(e.currencyPrices&&e.currencyPrices[se]&&(e.currencyPrices[se].monthly>0||e.currencyPrices[se].annual>0)),Te=(e,r)=>{if(!Me(e))return"Not Set";const t=ze(e,r);return(0,o.vv)(t,se)},Ie=e.filter(e=>{const r=e.displayName.toLowerCase().includes(G.toLowerCase())||e.description.toLowerCase().includes(G.toLowerCase()),t="all"===re||e.planTarget===re,n="all"===ne||e.category===ne,i="all"===ae||"active"===ae&&e.isActive||"inactive"===ae&&!e.isActive;return r&&t&&n&&i}),Oe=e.filter(e=>"basic"===e.category).length,Ne=e.filter(e=>"custom"===e.category).length;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l.mc,{children:[(0,c.jsxs)(l.Y9,{children:[(0,c.jsx)(l.hE,{children:"Subscription Plans"}),(0,c.jsxs)(l.ex,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),t=window.URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>{W(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(l.UC,{children:[(0,c.jsxs)(l.MD,{children:[(0,c.jsxs)(l.hI,{color:"#059669",children:[(0,c.jsx)(l.Os,{children:e.length}),(0,c.jsx)(l.v0,{children:"Total Plans"}),(0,c.jsxs)(l.d1,{children:[Oe," basic + ",Ne," custom"]})]}),(0,c.jsxs)(l.hI,{color:"#10B981",children:[(0,c.jsx)(l.Os,{children:Be}),(0,c.jsx)(l.v0,{children:"Active Plans"}),(0,c.jsxs)(l.d1,{children:[e.length>0?Math.round(Be/e.length*100):0,"% available"]})]}),(0,c.jsxs)(l.hI,{color:"#F59E0B",children:[(0,c.jsx)(l.Os,{children:$e}),(0,c.jsx)(l.v0,{children:"Total Subscriptions"}),(0,c.jsx)(l.d1,{children:"Across all plans"})]}),(0,c.jsxs)(l.hI,{color:"#DC2626",children:[(0,c.jsx)(l.Os,{children:(0,o.vv)(Le)}),(0,c.jsx)(l.v0,{children:"Monthly Revenue"}),(0,c.jsx)(l.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:G,onChange:e=>ee(e.target.value)}),(0,c.jsxs)(s.Jt,{value:re,onChange:e=>te(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plans"})]}),(0,c.jsxs)(s.Jt,{value:ne,onChange:e=>ie(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(s.Jt,{value:ae,onChange:e=>le(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(s.Jt,{value:se,onChange:e=>oe(e.target.value),style:{minWidth:"150px"},children:me.map(e=>{const r=pe[e];return(0,c.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})})]}),(0,c.jsx)(d,{children:Ie.map(e=>(0,c.jsxs)(p,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(R,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)(L,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(m,{children:e.displayName}),(0,c.jsx)(h,{children:e.description}),(0,c.jsx)(x,{children:Me(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(g,{children:[Te(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),ze(e,"annual")>0&&ze(e,"monthly")>0&&(0,c.jsxs)(y,{children:[Te(e,"annual"),"/year",12*ze(e,"monthly")>ze(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*ze(e,"monthly")-ze(e,"annual"))/(12*ze(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",se,' price in "Prices" button']})]})})]}),"basic"===e.category&&"restaurant"===e.planTarget&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Menu Items"}),(0,c.jsx)(b,{children:Re(e.menuItemLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Orders/month"}),(0,c.jsx)(b,{children:Re(e.orderLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Staff"}),(0,c.jsx)(b,{children:Re(e.staffLimit)})]})]}),"basic"===e.category&&("brand"===e.planTarget||"foodcourt"===e.planTarget)&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Restaurants"}),(0,c.jsx)(b,{children:Re(e.restaurantLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Managers"}),(0,c.jsx)(b,{children:Re(e.managerLimit)})]})]}),"basic"===e.category&&"owner"===e.planTarget&&(0,c.jsx)(_,{children:(0,c.jsxs)(f,{children:[(0,c.jsx)(v,{children:"Restaurants"}),(0,c.jsx)(b,{children:Re(e.restaurantLimit)})]})}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>ce.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),t=e.includedModules.map(e=>ce.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(k,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(A,{children:r.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]}),t.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(k,{children:["Advanced Modules (",t.length,")"]}),(0,c.jsx)(A,{children:t.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(C,{children:e},r))}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:e.subscriptionCount}),(0,c.jsx)($,{children:"Subscriptions"})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:(0,o.vv)(ze(e,"monthly")*e.subscriptionCount,se)}),(0,c.jsx)($,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(T,{variant:"primary",onClick:()=>(async e=>{n(e);let r={};try{const n=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(l.ok){const e=await l.json();for(const n of e.data||[]){var t,i;r[n.currency]={monthly:(null===(t=n.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(i=n.annual_price)||void 0===i?void 0:i.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}we({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:e.menuItemLimit.toString(),staff_limit:e.staffLimit.toString(),restaurant_limit:e.restaurantLimit.toString(),manager_limit:e.managerLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),X(!0)})(e),children:"Edit"}),(0,c.jsx)(T,{variant:"secondary",onClick:()=>{n(e),(async e=>{try{const n=localStorage.getItem("auth_token"),i=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();ye(e.data||[]);const n={};for(const i of e.data||[]){var r,t;n[i.currency]={monthly:(null===(r=i.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=i.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of me)n[r]||(n[r]={monthly:"0",annual:"0"});_e(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),ge(!0)},children:"Prices"}),(0,c.jsx)(T,{variant:"secondary",onClick:()=>(e=>{n(e),q(!0)})(e),children:"View"})]})]},e.id))}),a&&(0,c.jsx)(l.mH,{onClick:()=>W(!1),children:(0,c.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(l.rQ,{children:[(0,c.jsx)(l.wt,{children:"Create New Plan"}),(0,c.jsx)(l.Jn,{onClick:()=>W(!1),children:"\xd7"})]}),(0,c.jsxs)(l.cw,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Target *"}),(0,c.jsxs)(l.FX,{value:fe.plan_target,onChange:e=>ve(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Category *"}),(0,c.jsxs)(l.FX,{value:fe.category,onChange:e=>ve(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Name *"}),(0,c.jsx)(l.ZQ,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:fe.display_name,onChange:e=>{const r=e.target.value,t=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();ve(e=>({...e,display_name:r,name:t}))}})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Description"}),(0,c.jsx)(l.Lz,{placeholder:"Enter plan description...",rows:3,value:fe.description,onChange:e=>ve(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[me.map(e=>{var r,t,n,i;const a=pe[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(I,{children:[(0,c.jsxs)(l.gE,{style:{marginBottom:0},children:[(0,c.jsx)(l.lR,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"0",value:(null===(r=fe.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>ve(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(l.gE,{style:{marginBottom:0},children:[(0,c.jsx)(l.lR,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"0",value:(null===(n=fe.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>ve(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===me.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===fe.category&&"restaurant"===fe.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(O,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Menu Item Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.menu_item_limit,onChange:e=>ve(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Order Limit (per month)"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.order_limit,onChange:e=>ve(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.staff_limit,onChange:e=>ve(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===fe.category&&("brand"===fe.plan_target||"foodcourt"===fe.plan_target)&&(0,c.jsxs)(O,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Restaurant Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.restaurant_limit,onChange:e=>ve(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Manager Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.manager_limit,onChange:e=>ve(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===fe.category&&"owner"===fe.plan_target&&(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Restaurant Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:fe.restaurant_limit,onChange:e=>ve(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===fe.category&&(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Included Modules"}),ce.filter(e=>"basic"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"basic"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).map(e=>{const r=fe.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ve(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ve(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"advanced"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"advanced"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).map(e=>{const r=fe.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ve(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ve(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"revenue"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"revenue"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).map(e=>{const r=fe.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ve(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ve(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"operation"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"operation"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).map(e=>{const r=fe.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ve(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ve(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"analytics"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"analytics"===e.category&&(e.target_user_type===fe.plan_target||"all"===e.target_user_type)).map(e=>{const r=fe.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ve(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ve(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Features (one per line)"}),(0,c.jsx)(l.Lz,{placeholder:"Enter features, one per line...",rows:6,value:fe.features,onChange:e=>ve(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(N,{children:[(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:fe.is_popular,onChange:e=>ve(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:fe.is_active,onChange:e=>ve(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(l.jl,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===fe.category,r={name:fe.name,display_name:fe.display_name,description:fe.description,category:fe.category,plan_target:fe.plan_target,base_price_monthly:parseFloat(fe.base_price_monthly)||0,base_price_annual:parseFloat(fe.base_price_annual)||0,order_limit:e?-1:parseInt(fe.order_limit)||-1,menu_item_limit:e?-1:parseInt(fe.menu_item_limit)||-1,staff_limit:e?-1:parseInt(fe.staff_limit)||-1,restaurant_limit:e?-1:parseInt(fe.restaurant_limit)||-1,manager_limit:e?-1:parseInt(fe.manager_limit)||-1,features:fe.features.split("\n").filter(e=>e.trim()),included_modules:fe.included_modules,is_popular:fe.is_popular,is_active:fe.is_active};console.log("Creating plan with data:",r);const t=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to create plan")}const n=await t.json();if(fe.currency_prices&&Object.keys(fe.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(fe.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}ve({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),W(!1),Pe()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),H&&t&&(0,c.jsx)(l.mH,{onClick:()=>X(!1),children:(0,c.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(l.rQ,{children:[(0,c.jsxs)(l.wt,{children:["Edit Plan: ",t.displayName]}),(0,c.jsx)(l.Jn,{onClick:()=>X(!1),children:"\xd7"})]}),(0,c.jsxs)(l.cw,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Name *"}),(0,c.jsx)(l.ZQ,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:be.display_name,onChange:e=>we(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",be.name]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Target *"}),(0,c.jsxs)(l.FX,{value:be.plan_target,onChange:e=>we(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Plan Category *"}),(0,c.jsxs)(l.FX,{value:be.category,onChange:e=>we(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[me.map(e=>{var r,t,n,i;const a=pe[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(I,{children:[(0,c.jsxs)(l.gE,{style:{marginBottom:0},children:[(0,c.jsx)(l.lR,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"0",value:(null===(r=be.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>we(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(l.gE,{style:{marginBottom:0},children:[(0,c.jsx)(l.lR,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"0",value:(null===(n=be.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>we(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===me.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===be.category&&"restaurant"===be.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(O,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Menu Item Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.menu_item_limit,onChange:e=>we(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Order Limit (per month)"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.order_limit,onChange:e=>we(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.staff_limit,onChange:e=>we(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===be.category&&("brand"===be.plan_target||"foodcourt"===be.plan_target)&&(0,c.jsxs)(O,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Restaurant Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.restaurant_limit,onChange:e=>we(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Manager Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.manager_limit,onChange:e=>we(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===be.category&&"owner"===be.plan_target&&(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Restaurant Limit"}),(0,c.jsx)(l.ZQ,{type:"number",placeholder:"-1 for unlimited",value:be.restaurant_limit,onChange:e=>we(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===be.category&&(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Included Modules"}),ce.filter(e=>"basic"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"basic"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).map(e=>{const r=be.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?we(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):we(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"advanced"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"advanced"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).map(e=>{const r=be.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?we(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):we(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"revenue"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"revenue"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).map(e=>{const r=be.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?we(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):we(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"operation"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"operation"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).map(e=>{const r=be.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?we(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):we(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ce.filter(e=>"analytics"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(N,{children:ce.filter(e=>"analytics"===e.category&&(e.target_user_type===be.plan_target||"all"===e.target_user_type)).map(e=>{const r=be.included_modules.includes(e.module_code);return(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?we(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):we(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Features (one per line)"}),(0,c.jsx)(l.Lz,{placeholder:"Enter features, one per line...",rows:6,value:be.features,onChange:e=>we(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(N,{children:[(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:be.is_popular,onChange:e=>we(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:be.is_active,onChange:e=>we(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(l.jl,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}X(!1),Pe()}catch(r){console.error("Error deleting plan:",r)}})(t.id),children:"Delete"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{try{if(!be.display_name)return void console.log("Display name is required");const e="custom"===be.category,r={display_name:be.display_name,description:be.description,category:be.category,plan_target:be.plan_target,base_price_monthly:parseFloat(be.base_price_monthly)||0,base_price_annual:parseFloat(be.base_price_annual)||0,order_limit:e?-1:parseInt(be.order_limit)||-1,menu_item_limit:e?-1:parseInt(be.menu_item_limit)||-1,staff_limit:e?-1:parseInt(be.staff_limit)||-1,restaurant_limit:e?-1:parseInt(be.restaurant_limit)||-1,manager_limit:e?-1:parseInt(be.manager_limit)||-1,features:be.features.split("\n").filter(e=>e.trim()),included_modules:be.included_modules,is_popular:be.is_popular,is_active:be.is_active};console.log("Updating plan with data:",r);const t=be.id.replace("plan-",""),n=await fetch(`/api/plans/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if(be.currency_prices&&Object.keys(be.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(be.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${t}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}X(!1),Pe()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),Y&&t&&(0,c.jsx)(l.mH,{onClick:()=>q(!1),children:(0,c.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(l.rQ,{children:[(0,c.jsxs)(l.wt,{children:["Plan Details: ",t.displayName]}),(0,c.jsx)(l.Jn,{onClick:()=>q(!1),children:"\xd7"})]}),(0,c.jsxs)(l.cw,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Plan ID"}),(0,c.jsx)(J,{children:t.id})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Internal Name"}),(0,c.jsx)(J,{children:t.name})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Display Name"}),(0,c.jsx)(J,{children:t.displayName})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Status"}),(0,c.jsx)(L,{isActive:t.isActive,children:t.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Popular Plan"}),(0,c.jsx)(J,{children:t.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Monthly Price"}),(0,c.jsx)(J,{children:(0,o.vv)(t.monthlyPrice)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Annual Price"}),(0,c.jsx)(J,{children:(0,o.vv)(t.annualPrice)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Annual Discount"}),(0,c.jsxs)(J,{children:[Math.round((12*t.monthlyPrice-t.annualPrice)/(12*t.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("h4",{children:"Limits"}),"restaurant"===t.planTarget&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Menu Item Limit"}),(0,c.jsx)(J,{children:Re(t.menuItemLimit)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Monthly Order Limit"}),(0,c.jsx)(J,{children:Re(t.orderLimit)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Staff Limit"}),(0,c.jsx)(J,{children:Re(t.staffLimit)})]})]}),("brand"===t.planTarget||"foodcourt"===t.planTarget)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Restaurant Limit"}),(0,c.jsx)(J,{children:Re(t.restaurantLimit)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Manager Limit"}),(0,c.jsx)(J,{children:Re(t.managerLimit)})]})]}),"owner"===t.planTarget&&(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Restaurant Limit"}),(0,c.jsx)(J,{children:Re(t.restaurantLimit)})]})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Current Subscriptions"}),(0,c.jsx)(J,{children:t.subscriptionCount})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Monthly Revenue"}),(0,c.jsx)(J,{children:(0,o.vv)(t.monthlyPrice*t.subscriptionCount)})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(Z,{children:"Created Date"}),(0,c.jsx)(J,{children:t.createdAt})]})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(t.features)?t.features:[]).map((e,r)=>(0,c.jsx)(C,{children:e},r))})]})]})]})}),xe&&t&&(0,c.jsx)(l.mH,{onClick:()=>ge(!1),children:(0,c.jsxs)(l.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)(l.rQ,{children:[(0,c.jsxs)(l.wt,{children:["Set Prices for ",t.displayName]}),(0,c.jsx)(l.Jn,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,c.jsxs)(l.cw,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[me.map(e=>{var r,t;const n=pe[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=je[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>_e({...je,[e]:{...je[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(t=je[e])||void 0===t?void 0:t.annual)||"",onChange:r=>_e({...je,[e]:{...je[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===me.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,c.jsxs)(l.jl,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token"),r=t.id.replace("plan-",""),n=Object.entries(je).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}}),i=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(i.ok)ge(!1);else{const e=await i.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);