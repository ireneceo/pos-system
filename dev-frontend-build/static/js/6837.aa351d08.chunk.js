"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,t)=>{t.d(r,{DO:()=>p,Jt:()=>u,Qn:()=>d});t(9950);var n=t(4752),i=t(4414);const a=n.Ay.div`
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
`,o=n.Ay.div`
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
`,s=n.Ay.button`
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
`,c=n.Ay.select`
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
`,d=e=>{let{children:r,className:t,style:n,...l}=e;return(0,i.jsx)(a,{className:t,style:n,...l,children:r})},p=e=>{let{placeholder:r="Search...",value:t,onChange:n,style:a,...c}=e;return(0,i.jsxs)(o,{style:a,children:[(0,i.jsx)(l,{placeholder:r,value:t,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...c}),t&&(0,i.jsx)(s,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:r,...t}=e;return(0,i.jsx)(c,{...t,children:r})}},6837:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var n=t(9950),i=t(4752),a=t(8409),l=t(2488),o=t(6038),s=t(7617),c=t(4414);const d={restaurant:["dashboard","membership"],brand:["brand_dashboard"],foodcourt:["fc_dashboard"],owner:["owner_dashboard"]},p=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,u=i.Ay.div`
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
`,m=i.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,h=i.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,x=(i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,i.Ay.div`
  text-align: center;
`),g=i.Ay.div`
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
`,C=i.Ay.div`
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
`,S=i.Ay.div`
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
  margin-bottom: 20px;
`,R=i.Ay.label`
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
`,D=i.Ay.select`
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
`,U=i.Ay.textarea`
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
`,W=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,J=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,Y=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,Q=i.Ay.div`
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
`,q=i.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,H=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,K=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,V=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,X=()=>{const[e,r]=(0,n.useState)([]),[t,i]=(0,n.useState)(null),[X,G]=(0,n.useState)(!1),[Z,ee]=(0,n.useState)(!1),[re,te]=(0,n.useState)(!1),[ne,ie]=(0,n.useState)({}),[ae,le]=(0,n.useState)(""),[oe,se]=(0,n.useState)("all"),[ce,de]=(0,n.useState)("all"),[pe,ue]=(0,n.useState)("all"),[me,he]=(0,n.useState)(""),[xe,ge]=(0,n.useState)([]),[ye,je]=(0,n.useState)({}),[_e,fe]=(0,n.useState)([]),[be,ve]=(0,n.useState)(!1),[,we]=(0,n.useState)([]),[Fe,Ce]=(0,n.useState)({}),[Ae,ke]=(0,n.useState)(!1),[Be,Se]=(0,n.useState)(null),[Pe,Ee]=(0,n.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[ze,Le]=(0,n.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,n.useEffect)(()=>{Ie(),Me(),$e(),Te()},[]);const $e=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();je(r.currencies||r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Te=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=((await e.json()).data||[]).map(e=>e.code);fe(r),r.length>0&&he(e=>e||r[0])}}catch(e){console.error("Error fetching supported currencies:",e),fe(["MYR","KRW"]),he(e=>e||"MYR")}};(0,n.useEffect)(()=>{Object.keys(ne).length>=0&&Oe()},[ne]);const Me=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();ge(r)}catch(e){console.error("Error fetching addon modules:",e),ge([])}},Ie=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),t={};r&&Array.isArray(r)&&r.forEach(e=>{t[e.plan_name]=e.count||0}),ie(t)}catch(e){console.error("Error fetching subscription stats:",e),ie({})}},Oe=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const t=await e.json(),n=localStorage.getItem("auth_token"),i=await Promise.all(t.map(async e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(a){console.warn("Failed to parse features for plan:",e.name,a),r=[]}let t=[];try{"string"===typeof e.included_modules?t=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(t=e.included_modules)}catch(a){console.warn("Failed to parse included_modules for plan:",e.name,a),t=[]}let i={};try{const r=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json();for(const r of e.data||[])i[r.currency]={monthly:parseFloat(r.monthly_price)||0,annual:parseFloat(r.annual_price)||0}}}catch(a){console.warn("Failed to fetch currency prices for plan:",e.name,a)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Re(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),orderLimit:e.order_limit,menuItemLimit:e.menu_item_limit,staffLimit:e.staff_limit,restaurantLimit:e.restaurant_limit,managerLimit:e.manager_limit,features:r,includedModules:t,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:ne[e.display_name]||0,currencyPrices:i}}));r(i)}catch(e){console.error("Error fetching plans:",e),r(Ne())}},Re=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Ne=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,menuItemLimit:50,orderLimit:1e3,staffLimit:5,restaurantLimit:-1,managerLimit:-1,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ne.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,menuItemLimit:200,orderLimit:1e4,staffLimit:20,restaurantLimit:-1,managerLimit:-1,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ne.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,menuItemLimit:-1,orderLimit:-1,staffLimit:-1,restaurantLimit:-1,managerLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ne.Enterprise||0}],De=e.filter(e=>e.isActive).length,Ue=e.reduce((e,r)=>e+r.subscriptionCount,0),We=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Je=e=>-1===e?"Unlimited":e.toLocaleString(),Ye=(e,r)=>e.currencyPrices&&e.currencyPrices[me]?e.currencyPrices[me][r]:0,Qe=e=>!!(e.currencyPrices&&e.currencyPrices[me]&&(e.currencyPrices[me].monthly>0||e.currencyPrices[me].annual>0)),qe=(e,r)=>{if(!Qe(e))return"Not Set";const t=Ye(e,r);return(0,o.vv)(t,me)},He=async e=>{i(e);let r={};try{const i=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${i}`}});if(l.ok){const e=await l.json();for(const i of e.data||[]){var t,n;r[i.currency]={monthly:(null===(t=i.monthly_price)||void 0===t?void 0:t.toString())||"0",annual:(null===(n=i.annual_price)||void 0===n?void 0:n.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Le({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:e.menuItemLimit.toString(),staff_limit:e.staffLimit.toString(),restaurant_limit:e.restaurantLimit.toString(),manager_limit:e.managerLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),ee(!0)},Ke=e.filter(e=>{const r=e.displayName.toLowerCase().includes(ae.toLowerCase())||e.description.toLowerCase().includes(ae.toLowerCase()),t="all"===oe||e.planTarget===oe,n="all"===ce||e.category===ce,i="all"===pe||"active"===pe&&e.isActive||"inactive"===pe&&!e.isActive;return r&&t&&n&&i}),Ve=e.filter(e=>"basic"===e.category).length,Xe=e.filter(e=>"custom"===e.category).length;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"Subscription Plans"}),(0,c.jsxs)(a.ex,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),t=window.URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(t),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>{G(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsxs)(a.MD,{children:[(0,c.jsxs)(a.hI,{color:"#059669",children:[(0,c.jsx)(a.Os,{children:e.length}),(0,c.jsx)(a.v0,{children:"Total Plans"}),(0,c.jsxs)(a.d1,{children:[Ve," basic + ",Xe," custom"]})]}),(0,c.jsxs)(a.hI,{color:"#10B981",children:[(0,c.jsx)(a.Os,{children:De}),(0,c.jsx)(a.v0,{children:"Active Plans"}),(0,c.jsxs)(a.d1,{children:[e.length>0?Math.round(De/e.length*100):0,"% available"]})]}),(0,c.jsxs)(a.hI,{color:"#F59E0B",children:[(0,c.jsx)(a.Os,{children:Ue}),(0,c.jsx)(a.v0,{children:"Total Subscriptions"}),(0,c.jsx)(a.d1,{children:"Across all plans"})]}),(0,c.jsxs)(a.hI,{color:"#DC2626",children:[(0,c.jsx)(a.Os,{children:(0,o.vv)(We)}),(0,c.jsx)(a.v0,{children:"Monthly Revenue"}),(0,c.jsx)(a.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(l.Qn,{children:[(0,c.jsxs)(l.Jt,{value:oe,onChange:e=>se(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plans"})]}),(0,c.jsxs)(l.Jt,{value:ce,onChange:e=>de(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(l.Jt,{value:pe,onChange:e=>ue(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsx)(l.Jt,{value:me,onChange:e=>he(e.target.value),style:{minWidth:"150px"},children:_e.map(e=>{const r=ye[e];return(0,c.jsxs)("option",{value:e,children:[(null===r||void 0===r?void 0:r.symbol)||e," ",e]},e)})}),(0,c.jsx)(l.DO,{type:"text",placeholder:"Search plans...",value:ae,onChange:e=>le(e.target.value)})]}),(0,c.jsx)(p,{children:Ke.map(e=>(0,c.jsxs)(u,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(T,{children:[(0,c.jsx)($,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)(L,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(h,{children:e.displayName}),(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#635BFF",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"24px"},children:"restaurant"===e.planTarget?"Restaurant Plan":"brand"===e.planTarget?"Brand Plan":"foodcourt"===e.planTarget?"Foodcourt Plan":"Owner Plan"}),(0,c.jsx)(x,{children:Qe(e)?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(g,{children:[qe(e,"monthly"),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Ye(e,"annual")>0&&Ye(e,"monthly")>0&&(0,c.jsxs)(y,{children:[qe(e,"annual"),"/year",12*Ye(e,"monthly")>Ye(e,"annual")&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*Ye(e,"monthly")-Ye(e,"annual"))/(12*Ye(e,"monthly"))*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,c.jsxs)(j,{style:{color:"#F59E0B"},children:["Set ",me,' price in "Prices" button']})]})})]}),"basic"===e.category&&"restaurant"===e.planTarget&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Menu Items"}),(0,c.jsx)(v,{children:Je(e.menuItemLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Orders/month"}),(0,c.jsx)(v,{children:Je(e.orderLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Staff"}),(0,c.jsx)(v,{children:Je(e.staffLimit)})]})]}),"basic"===e.category&&("brand"===e.planTarget||"foodcourt"===e.planTarget)&&(0,c.jsxs)(_,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Restaurants"}),(0,c.jsx)(v,{children:Je(e.restaurantLimit)})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Managers"}),(0,c.jsx)(v,{children:Je(e.managerLimit)})]})]}),"basic"===e.category&&"owner"===e.planTarget&&(0,c.jsx)(_,{children:(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:"Restaurants"}),(0,c.jsx)(v,{children:Je(e.restaurantLimit)})]})}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>xe.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),t=e.includedModules.map(e=>xe.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(k,{children:r.map((e,r)=>(0,c.jsx)(B,{children:e.name},r))})]}),t.length>0&&(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:["Advanced Modules (",t.length,")"]}),(0,c.jsx)(k,{children:t.map((e,r)=>(0,c.jsx)(B,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(F,{children:e},r))}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(P,{children:[(0,c.jsx)(E,{children:e.subscriptionCount}),(0,c.jsx)(z,{children:"Subscriptions"})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)(E,{children:(0,o.vv)(Ye(e,"monthly")*e.subscriptionCount,me)}),(0,c.jsx)(z,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>He(e),children:"Edit"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>{i(e),(async e=>{try{const n=localStorage.getItem("auth_token"),i=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();we(e.data||[]);const n={};for(const i of e.data||[]){var r,t;n[i.currency]={monthly:(null===(r=i.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(t=i.annual_price)||void 0===t?void 0:t.toString())||"0"}}for(const r of _e)n[r]||(n[r]={monthly:"0",annual:"0"});Ce(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),ve(!0)},children:"Prices"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>(e=>{i(e),te(!0)})(e),children:"View"})]})]},e.id))}),X&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>G(!1),title:"Create New Plan",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===Pe.category,r={name:Pe.name,display_name:Pe.display_name,description:Pe.description,category:Pe.category,plan_target:Pe.plan_target,base_price_monthly:parseFloat(Pe.base_price_monthly)||0,base_price_annual:parseFloat(Pe.base_price_annual)||0,order_limit:e?-1:parseInt(Pe.order_limit)||-1,menu_item_limit:e?-1:parseInt(Pe.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Pe.staff_limit)||-1,restaurant_limit:e?-1:parseInt(Pe.restaurant_limit)||-1,manager_limit:e?-1:parseInt(Pe.manager_limit)||-1,features:Pe.features.split("\n").filter(e=>e.trim()),included_modules:[...d[Pe.plan_target]||[],...Pe.included_modules.filter(e=>!(d[Pe.plan_target]||[]).includes(e))],is_popular:Pe.is_popular,is_active:Pe.is_active};console.log("Creating plan with data:",r);const t=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to create plan")}const n=await t.json();if(Pe.currency_prices&&Object.keys(Pe.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Pe.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}Ee({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),G(!1),Oe()}catch(e){console.error("Error creating plan:",e)}},children:"Create Plan"})]}),children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Target *"}),(0,c.jsxs)(D,{value:Pe.plan_target,onChange:e=>Ee(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Category *"}),(0,c.jsxs)(D,{value:Pe.category,onChange:e=>Ee(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Name *"}),(0,c.jsx)(N,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Pe.display_name,onChange:e=>{const r=e.target.value,t=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();Ee(e=>({...e,display_name:r,name:t}))}})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Description"}),(0,c.jsx)(U,{placeholder:"Enter plan description...",rows:3,value:Pe.description,onChange:e=>Ee(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[_e.map(e=>{var r,t,n,i;const a=ye[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(O,{style:{marginBottom:0},children:[(0,c.jsx)(R,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(N,{type:"number",placeholder:"0",value:(null===(r=Pe.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Ee(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(O,{style:{marginBottom:0},children:[(0,c.jsx)(R,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(N,{type:"number",placeholder:"0",value:(null===(n=Pe.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Ee(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===_e.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===Pe.category&&"restaurant"===Pe.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Menu Item Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.menu_item_limit,onChange:e=>Ee(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Order Limit (per month)"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.order_limit,onChange:e=>Ee(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Staff Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.staff_limit,onChange:e=>Ee(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Pe.category&&("brand"===Pe.plan_target||"foodcourt"===Pe.plan_target)&&(0,c.jsxs)(J,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Restaurant Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.restaurant_limit,onChange:e=>Ee(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Manager Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.manager_limit,onChange:e=>Ee(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===Pe.category&&"owner"===Pe.plan_target&&(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Restaurant Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:Pe.restaurant_limit,onChange:e=>Ee(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===Pe.category&&(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Included Modules"}),xe.filter(e=>"basic"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"basic"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).map(e=>{const r=(d[Pe.plan_target]||[]).includes(e.module_code),t=r||Pe.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:t,disabled:r,onChange:t=>{r||(t.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)})))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),r&&(0,c.jsx)("span",{style:{color:"#635BFF",fontSize:"12px",marginLeft:"6px"},children:"Always Included"}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"advanced"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"advanced"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).map(e=>{const r=Pe.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"revenue"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"revenue"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).map(e=>{const r=Pe.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"operation"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"operation"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).map(e=>{const r=Pe.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"analytics"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"analytics"===e.category&&(e.target_user_type===Pe.plan_target||"all"===e.target_user_type)).map(e=>{const r=Pe.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Features (one per line)"}),(0,c.jsx)(U,{placeholder:"Enter features, one per line...",rows:6,value:Pe.features,onChange:e=>Ee(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:Pe.is_popular,onChange:e=>Ee(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:Pe.is_active,onChange:e=>Ee(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),Z&&t&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ee(!1),title:`Edit Plan: ${t.displayName}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"danger",onClick:()=>{return e=t.id,Se(e),ee(!1),void ke(!0);var e},children:"Delete"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{if(!ze.display_name)return void console.log("Display name is required");const e="custom"===ze.category,r={display_name:ze.display_name,description:ze.description,category:ze.category,plan_target:ze.plan_target,base_price_monthly:parseFloat(ze.base_price_monthly)||0,base_price_annual:parseFloat(ze.base_price_annual)||0,order_limit:e?-1:parseInt(ze.order_limit)||-1,menu_item_limit:e?-1:parseInt(ze.menu_item_limit)||-1,staff_limit:e?-1:parseInt(ze.staff_limit)||-1,restaurant_limit:e?-1:parseInt(ze.restaurant_limit)||-1,manager_limit:e?-1:parseInt(ze.manager_limit)||-1,features:ze.features.split("\n").filter(e=>e.trim()),included_modules:[...d[ze.plan_target]||[],...ze.included_modules.filter(e=>!(d[ze.plan_target]||[]).includes(e))],is_popular:ze.is_popular,is_active:ze.is_active};console.log("Updating plan with data:",r);const t=ze.id.replace("plan-",""),n=await fetch(`/api/plans/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if(ze.currency_prices&&Object.keys(ze.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(ze.currency_prices).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${t}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}ee(!1),Oe()}catch(e){console.error("Error updating plan:",e)}},children:"Save Changes"})]}),children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Name *"}),(0,c.jsx)(N,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:ze.display_name,onChange:e=>Le(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",ze.name]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Target *"}),(0,c.jsxs)(D,{value:ze.plan_target,onChange:e=>Le(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"}),(0,c.jsx)("option",{value:"owner",children:"Restaurant Owner Plan"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Plan Category *"}),(0,c.jsxs)(D,{value:ze.category,onChange:e=>Le(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[_e.map(e=>{var r,t,n,i;const a=ye[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(O,{style:{marginBottom:0},children:[(0,c.jsx)(R,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(N,{type:"number",placeholder:"0",value:(null===(r=ze.currency_prices)||void 0===r||null===(t=r[e])||void 0===t?void 0:t.monthly)||"",onChange:r=>Le(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(O,{style:{marginBottom:0},children:[(0,c.jsx)(R,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(N,{type:"number",placeholder:"0",value:(null===(n=ze.currency_prices)||void 0===n||null===(i=n[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Le(t=>{var n;return{...t,currency_prices:{...t.currency_prices,[e]:{...null===(n=t.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===_e.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===ze.category&&"restaurant"===ze.plan_target&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(J,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Menu Item Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.menu_item_limit,onChange:e=>Le(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Order Limit (per month)"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.order_limit,onChange:e=>Le(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Staff Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.staff_limit,onChange:e=>Le(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===ze.category&&("brand"===ze.plan_target||"foodcourt"===ze.plan_target)&&(0,c.jsxs)(J,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Restaurant Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.restaurant_limit,onChange:e=>Le(r=>({...r,restaurant_limit:e.target.value}))})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Manager Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.manager_limit,onChange:e=>Le(r=>({...r,manager_limit:e.target.value}))})]})]}),"basic"===ze.category&&"owner"===ze.plan_target&&(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Restaurant Limit"}),(0,c.jsx)(N,{type:"number",placeholder:"-1 for unlimited",value:ze.restaurant_limit,onChange:e=>Le(r=>({...r,restaurant_limit:e.target.value}))})]}),"basic"===ze.category&&(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Included Modules"}),xe.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=(d[ze.plan_target]||[]).includes(e.module_code),t=r||ze.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:t,disabled:r,onChange:t=>{r||(t.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)})))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),r&&(0,c.jsx)("span",{style:{color:"#635BFF",fontSize:"12px",marginLeft:"6px"},children:"Always Included"}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"revenue"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"operation"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),xe.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,c.jsx)(Y,{children:xe.filter(e=>"analytics"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Le(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Le(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Features (one per line)"}),(0,c.jsx)(U,{placeholder:"Enter features, one per line...",rows:6,value:ze.features,onChange:e=>Le(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:ze.is_popular,onChange:e=>Le(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:ze.is_active,onChange:e=>Le(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),re&&t&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>te(!1),title:`Plan Details: ${t.displayName}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>te(!1),children:"Close"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:()=>{te(!1),He(t)},children:"Edit Plan"})]}),children:[(0,c.jsxs)(q,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Plan ID"}),(0,c.jsx)(V,{children:t.id})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Internal Name"}),(0,c.jsx)(V,{children:t.name})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Display Name"}),(0,c.jsx)(V,{children:t.displayName})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Status"}),(0,c.jsx)(L,{isActive:t.isActive,children:t.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Popular Plan"}),(0,c.jsx)(V,{children:t.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(q,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Monthly Price"}),(0,c.jsx)(V,{children:(0,o.vv)(t.monthlyPrice)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Annual Price"}),(0,c.jsx)(V,{children:(0,o.vv)(t.annualPrice)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Annual Discount"}),(0,c.jsxs)(V,{children:[Math.round((12*t.monthlyPrice-t.annualPrice)/(12*t.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(q,{children:[(0,c.jsx)("h4",{children:"Limits"}),"restaurant"===t.planTarget&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Menu Item Limit"}),(0,c.jsx)(V,{children:Je(t.menuItemLimit)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Monthly Order Limit"}),(0,c.jsx)(V,{children:Je(t.orderLimit)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Staff Limit"}),(0,c.jsx)(V,{children:Je(t.staffLimit)})]})]}),("brand"===t.planTarget||"foodcourt"===t.planTarget)&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Restaurant Limit"}),(0,c.jsx)(V,{children:Je(t.restaurantLimit)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Manager Limit"}),(0,c.jsx)(V,{children:Je(t.managerLimit)})]})]}),"owner"===t.planTarget&&(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Restaurant Limit"}),(0,c.jsx)(V,{children:Je(t.restaurantLimit)})]})]}),(0,c.jsxs)(q,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Current Subscriptions"}),(0,c.jsx)(V,{children:t.subscriptionCount})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Monthly Revenue"}),(0,c.jsx)(V,{children:(0,o.vv)(t.monthlyPrice*t.subscriptionCount)})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Created Date"}),(0,c.jsx)(V,{children:t.createdAt})]})]}),(0,c.jsxs)(q,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(t.features)?t.features:[]).map((e,r)=>(0,c.jsx)(F,{children:e},r))})]})]}),be&&t&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>ve(!1),title:`Set Prices for ${t.displayName}`,footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a.$n,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,c.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token"),r=t.id.replace("plan-",""),n=Object.entries(Fe).map(e=>{let[r,t]=e;return{currency:r,monthly_price:parseFloat(t.monthly)||0,annual_price:parseFloat(t.annual)||0,is_active:!0}}),i=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(i.ok)ve(!1),Oe();else{const e=await i.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]}),children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[_e.map(e=>{var r,t;const n=ye[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Fe[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>Ce({...Fe,[e]:{...Fe[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(t=Fe[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Ce({...Fe,[e]:{...Fe[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)}),0===_e.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]})]})]}),(0,c.jsx)(s.A,{isOpen:Ae,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(Be){ke(!1);try{const e=localStorage.getItem("auth_token"),r=Be.replace("plan-",""),t=await fetch(`/api/plans/${r}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(!t.ok){const e=await t.json();throw new Error(e.error||"Failed to delete plan")}ee(!1),Oe()}catch(e){console.error("Error deleting plan:",e)}Se(null)}},onCancel:()=>{ke(!1),Se(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),i=t(9610),a=t(4414);const l=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=n.Ay.h2`
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
`,u=e=>{let{isOpen:r,title:t,message:n,onConfirm:u,onCancel:m,confirmText:h="Confirm",cancelText:x="Cancel",type:g="warning"}=e;return r?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&m()},children:(0,a.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(s,{children:t}),(0,a.jsx)(c,{children:n})]}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:m,children:x}),(0,a.jsx)(p,{variant:"primary",type:g,onClick:u,children:h})]})]})}):null}}}]);