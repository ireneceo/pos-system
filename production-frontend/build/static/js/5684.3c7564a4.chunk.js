"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5684],{2488:(e,r,i)=>{i.d(r,{DO:()=>c,Jt:()=>d,Qn:()=>l});i(9950);var n=i(4752),t=i(4414);const a=n.Ay.div`
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
`,s=n.Ay.input`
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
`,o=n.Ay.select`
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
`,l=e=>{let{children:r,className:i,style:n,...s}=e;return(0,t.jsx)(a,{className:i,style:n,...s,children:r})},c=e=>{let{placeholder:r="Search...",...i}=e;return(0,t.jsx)(s,{placeholder:r,...i})},d=e=>{let{children:r,...i}=e;return(0,t.jsx)(o,{...i,children:r})}},5684:(e,r,i)=>{i.r(r),i.d(r,{default:()=>ne});var n=i(9950),t=i(4752),a=i(3310),s=i(7492),o=i(2488),l=i(6038),c=i(4414);const d=t.Ay.div`
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
`,_=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,b=t.Ay.span`
  font-size: 14px;
  color: #374151;
`,v=t.Ay.span`
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
`,L=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,T=t.Ay.div`
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
`,q=(t.Ay.select`
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
`,t.Ay.textarea`
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
`),K=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,V=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,X=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,G=t.Ay.div`
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
`,H=t.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,Z=t.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,ee=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,re=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ie=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,ne=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)(null),[ne,te]=(0,n.useState)(!1),[ae,se]=(0,n.useState)(!1),[oe,le]=(0,n.useState)(!1),[ce,de]=(0,n.useState)({}),[pe,ue]=(0,n.useState)(""),[he,xe]=(0,n.useState)("all"),[me,ge]=(0,n.useState)("all"),[ye,je]=(0,n.useState)("all"),[fe,_e]=(0,n.useState)([]),[be,ve]=(0,n.useState)({}),[we,Ae]=(0,n.useState)([]),[Fe,Ce]=(0,n.useState)(!1),[,ke]=(0,n.useState)([]),[Pe,Be]=(0,n.useState)({}),[Se,Ee]=(0,n.useState)({name:"",display_name:"",description:"",category:"custom",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[ze,$e]=(0,n.useState)({id:"",name:"",display_name:"",description:"",category:"custom",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,n.useEffect)(()=>{Ie(),Te(),Me(),Le()},[]);const Me=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();ve(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Le=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();Ae((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),Ae(["USD","RM","KRW"])}};(0,n.useEffect)(()=>{Object.keys(ce).length>=0&&Oe()},[ce]);const Te=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();_e(r)}catch(e){console.error("Error fetching addon modules:",e),_e([])}},Ie=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),i={};r&&Array.isArray(r)&&r.forEach(e=>{i[e.plan_name]=e.count||0}),de(i)}catch(e){console.error("Error fetching subscription stats:",e),de({})}},Oe=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const i=(await e.json()).map(e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(n){console.warn("Failed to parse features for plan:",e.name,n),r=[]}let i=[];try{"string"===typeof e.included_modules?i=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(i=e.included_modules)}catch(n){console.warn("Failed to parse included_modules for plan:",e.name,n),i=[]}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:Ne(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),restaurantLimit:e.staff_limit,orderLimit:e.order_limit,features:r,includedModules:i,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:ce[e.display_name]||0}});r(i)}catch(e){console.error("Error fetching plans:",e),r(De())}},Ne=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},De=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,restaurantLimit:1,orderLimit:1e3,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,restaurantLimit:5,orderLimit:1e4,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,restaurantLimit:-1,orderLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:ce.Enterprise||0}],Ue=e.filter(e=>e.isActive).length,Re=e.reduce((e,r)=>e+r.subscriptionCount,0),Je=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),We=e=>-1===e?"Unlimited":e.toLocaleString(),Ye=e.filter(e=>{const r=e.displayName.toLowerCase().includes(pe.toLowerCase())||e.description.toLowerCase().includes(pe.toLowerCase()),i="all"===he||e.planTarget===he,n="all"===me||e.category===me,t="all"===ye||"active"===ye&&e.isActive||"inactive"===ye&&!e.isActive;return r&&i&&n&&t}),Qe=e.filter(e=>"basic"===e.category).length,qe=e.filter(e=>"custom"===e.category).length;return(0,c.jsx)(a.A,{children:(0,c.jsxs)(s.mc,{children:[(0,c.jsxs)(s.Y9,{children:[(0,c.jsx)(s.hE,{children:"Subscription Plans"}),(0,c.jsxs)(s.ex,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),i=window.URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(i),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:()=>{te(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(s.UC,{children:[(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{color:"#059669",children:[(0,c.jsx)(s.Os,{children:e.length}),(0,c.jsx)(s.v0,{children:"Total Plans"}),(0,c.jsxs)(s.d1,{children:[Qe," basic + ",qe," custom"]})]}),(0,c.jsxs)(s.hI,{color:"#10B981",children:[(0,c.jsx)(s.Os,{children:Ue}),(0,c.jsx)(s.v0,{children:"Active Plans"}),(0,c.jsxs)(s.d1,{children:[e.length>0?Math.round(Ue/e.length*100):0,"% available"]})]}),(0,c.jsxs)(s.hI,{color:"#F59E0B",children:[(0,c.jsx)(s.Os,{children:Re}),(0,c.jsx)(s.v0,{children:"Total Subscriptions"}),(0,c.jsx)(s.d1,{children:"Across all plans"})]}),(0,c.jsxs)(s.hI,{color:"#DC2626",children:[(0,c.jsx)(s.Os,{children:(0,l.vv)(Je)}),(0,c.jsx)(s.v0,{children:"Monthly Revenue"}),(0,c.jsx)(s.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(o.Qn,{children:[(0,c.jsx)(o.DO,{type:"text",placeholder:"Search plans...",value:pe,onChange:e=>ue(e.target.value)}),(0,c.jsxs)(o.Jt,{value:he,onChange:e=>xe(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"})]}),(0,c.jsxs)(o.Jt,{value:me,onChange:e=>ge(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(o.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,c.jsx)(d,{children:Ye.map(e=>(0,c.jsxs)(p,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(M,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)($,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:e.displayName}),(0,c.jsx)(x,{children:e.description}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(g,{children:[(0,l.vv)(e.monthlyPrice),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),e.annualPrice>0&&e.monthlyPrice>0&&(0,c.jsxs)(y,{children:[(0,l.vv)(e.annualPrice),"/year",12*e.monthlyPrice>e.annualPrice&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*e.monthlyPrice-e.annualPrice)/(12*e.monthlyPrice)*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]})]}),"basic"===e.category&&(0,c.jsxs)(f,{children:[(0,c.jsxs)(_,{children:[(0,c.jsx)(b,{children:"Staff Limit"}),(0,c.jsx)(v,{children:We(e.restaurantLimit)})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(b,{children:"Orders/month"}),(0,c.jsx)(v,{children:We(e.orderLimit)})]})]}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>fe.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),i=e.includedModules.map(e=>fe.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(k,{children:r.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]}),i.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Advanced Modules (",i.length,")"]}),(0,c.jsx)(k,{children:i.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:e.subscriptionCount}),(0,c.jsx)(z,{children:"Subscriptions"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:(0,l.vv)(e.monthlyPrice*e.subscriptionCount)}),(0,c.jsx)(z,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>(async e=>{t(e);let r={};try{const t=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),s=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(s.ok){const e=await s.json();for(const t of e.data||[]){var i,n;r[t.currency]={monthly:(null===(i=t.monthly_price)||void 0===i?void 0:i.toString())||"0",annual:(null===(n=t.annual_price)||void 0===n?void 0:n.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}$e({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:"50",staff_limit:e.restaurantLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),se(!0)})(e),children:"Edit"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>{t(e),(async e=>{try{const n=localStorage.getItem("auth_token"),t=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${t}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();ke(e.data||[]);const n={};for(const t of e.data||[]){var r,i;n[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=t.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of we)n[r]||(n[r]={monthly:"0",annual:"0"});Be(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),Ce(!0)},children:"Prices"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>(e=>{t(e),le(!0)})(e),children:"View"})]})]},e.id))}),ne&&(0,c.jsx)(O,{onClick:()=>te(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsx)(U,{children:"Create New Plan"}),(0,c.jsx)(R,{onClick:()=>te(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("div",{style:{padding:"12px",background:"#F0F9FF",borderRadius:"8px",marginBottom:"16px"},children:(0,c.jsxs)("p",{style:{margin:0,fontSize:"14px",color:"#0369A1"},children:["Creating a ",(0,c.jsx)("strong",{children:"Custom Subscription"})," plan for your restaurants."]})}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Se.display_name,onChange:e=>{const r=e.target.value,i=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();Ee(e=>({...e,display_name:r,name:i}))}})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Description"}),(0,c.jsx)(q,{placeholder:"Enter plan description...",rows:3,value:Se.description,onChange:e=>Ee(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[we.map(e=>{var r,i,n,t;const a=be[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(K,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=Se.currency_prices)||void 0===r||null===(i=r[e])||void 0===i?void 0:i.monthly)||"",onChange:r=>Ee(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=Se.currency_prices)||void 0===n||null===(t=n[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Ee(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===we.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===Se.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Se.menu_item_limit,onChange:e=>Ee(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Se.order_limit,onChange:e=>Ee(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Se.staff_limit,onChange:e=>Ee(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Se.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),fe.filter(e=>"basic"===e.category&&(e.target_user_type===Se.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(X,{children:fe.filter(e=>"basic"===e.category&&(e.target_user_type===Se.plan_target||"all"===e.target_user_type)).map(e=>{const r=Se.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),fe.filter(e=>"advanced"===e.category&&(e.target_user_type===Se.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(X,{children:fe.filter(e=>"advanced"===e.category&&(e.target_user_type===Se.plan_target||"all"===e.target_user_type)).map(e=>{const r=Se.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Ee(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Ee(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:Se.features,onChange:e=>Ee(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(X,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:Se.is_popular,onChange:e=>Ee(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:Se.is_active,onChange:e=>Ee(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===Se.category,r={name:Se.name,display_name:Se.display_name,description:Se.description,category:Se.category,plan_target:Se.plan_target,base_price_monthly:parseFloat(Se.base_price_monthly)||0,base_price_annual:parseFloat(Se.base_price_annual)||0,order_limit:e?-1:parseInt(Se.order_limit)||-1,menu_item_limit:e?-1:parseInt(Se.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Se.staff_limit)||-1,features:Se.features.split("\n").filter(e=>e.trim()),included_modules:Se.included_modules,is_popular:Se.is_popular,is_active:Se.is_active};console.log("Creating plan with data:",r);const i=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok){const e=await i.json();throw new Error(e.error||"Failed to create plan")}const n=await i.json();if(Se.currency_prices&&Object.keys(Se.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Se.currency_prices).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}Ee({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),te(!1),Oe()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),ae&&i&&(0,c.jsx)(O,{onClick:()=>se(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Edit Plan: ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>se(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:ze.display_name,onChange:e=>$e(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",ze.name]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[we.map(e=>{var r,i,n,t;const a=be[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(K,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=ze.currency_prices)||void 0===r||null===(i=r[e])||void 0===i?void 0:i.monthly)||"",onChange:r=>$e(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=ze.currency_prices)||void 0===n||null===(t=n[e])||void 0===t?void 0:t.annual)||"",onChange:r=>$e(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===we.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===ze.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:ze.menu_item_limit,onChange:e=>$e(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:ze.order_limit,onChange:e=>$e(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:ze.staff_limit,onChange:e=>$e(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===ze.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),fe.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(X,{children:fe.filter(e=>"basic"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),fe.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(X,{children:fe.filter(e=>"advanced"===e.category&&(e.target_user_type===ze.plan_target||"all"===e.target_user_type)).map(e=>{const r=ze.included_modules.includes(e.module_code);return(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?$e(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):$e(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(q,{placeholder:"Enter features, one per line...",rows:6,value:ze.features,onChange:e=>$e(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(X,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:ze.is_popular,onChange:e=>$e(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:ze.is_active,onChange:e=>$e(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}se(!1),Oe()}catch(r){console.error("Error deleting plan:",r)}})(i.id),children:"Delete"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{try{if(!ze.display_name)return void console.log("Display name is required");const e="custom"===ze.category,r={display_name:ze.display_name,description:ze.description,category:ze.category,plan_target:ze.plan_target,base_price_monthly:parseFloat(ze.base_price_monthly)||0,base_price_annual:parseFloat(ze.base_price_annual)||0,order_limit:e?-1:parseInt(ze.order_limit)||-1,menu_item_limit:e?-1:parseInt(ze.menu_item_limit)||-1,staff_limit:e?-1:parseInt(ze.staff_limit)||-1,features:ze.features.split("\n").filter(e=>e.trim()),included_modules:ze.included_modules,is_popular:ze.is_popular,is_active:ze.is_active};console.log("Updating plan with data:",r);const i=ze.id.replace("plan-",""),n=await fetch(`/api/plans/${i}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if(ze.currency_prices&&Object.keys(ze.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(ze.currency_prices).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${i}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}se(!1),Oe()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),oe&&i&&(0,c.jsx)(O,{onClick:()=>le(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Plan Details: ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>le(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(Z,{children:[(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Plan ID"}),(0,c.jsx)(ie,{children:i.id})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Internal Name"}),(0,c.jsx)(ie,{children:i.name})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Display Name"}),(0,c.jsx)(ie,{children:i.displayName})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Status"}),(0,c.jsx)($,{isActive:i.isActive,children:i.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Popular Plan"}),(0,c.jsx)(ie,{children:i.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Monthly Price"}),(0,c.jsx)(ie,{children:(0,l.vv)(i.monthlyPrice)})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Annual Price"}),(0,c.jsx)(ie,{children:(0,l.vv)(i.annualPrice)})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Annual Discount"}),(0,c.jsxs)(ie,{children:[Math.round((12*i.monthlyPrice-i.annualPrice)/(12*i.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)("h4",{children:"Limits"}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Restaurant Limit"}),(0,c.jsx)(ie,{children:We(i.restaurantLimit)})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Monthly Order Limit"}),(0,c.jsx)(ie,{children:We(i.orderLimit)})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Current Subscriptions"}),(0,c.jsx)(ie,{children:i.subscriptionCount})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Monthly Revenue"}),(0,c.jsx)(ie,{children:(0,l.vv)(i.monthlyPrice*i.subscriptionCount)})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)(re,{children:"Created Date"}),(0,c.jsx)(ie,{children:i.createdAt})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(i.features)?i.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))})]})]})]})}),Fe&&i&&(0,c.jsx)(O,{onClick:()=>Ce(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Set Prices for ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>Ce(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[we.map(e=>{var r,i;const n=be[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Pe[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>Be({...Pe,[e]:{...Pe[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(i=Pe[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Be({...Pe,[e]:{...Pe[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===we.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(s.$n,{variant:"secondary",onClick:()=>Ce(!1),children:"Cancel"}),(0,c.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(i)try{const e=localStorage.getItem("auth_token"),r=i.id.replace("plan-",""),n=Object.entries(Pe).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}}),t=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(t.ok)Ce(!1);else{const e=await t.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);