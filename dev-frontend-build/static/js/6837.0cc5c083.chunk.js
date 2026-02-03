"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{2488:(e,r,i)=>{i.d(r,{DO:()=>c,Jt:()=>d,Qn:()=>l});i(9950);var n=i(4752),t=i(4414);const a=n.Ay.div`
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
`,o=n.Ay.input`
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
`,l=e=>{let{children:r,className:i,style:n,...o}=e;return(0,t.jsx)(a,{className:i,style:n,...o,children:r})},c=e=>{let{placeholder:r="Search...",...i}=e;return(0,t.jsx)(o,{placeholder:r,...i})},d=e=>{let{children:r,...i}=e;return(0,t.jsx)(s,{...i,children:r})}},6837:(e,r,i)=>{i.r(r),i.d(r,{default:()=>te});var n=i(9950),t=i(4752),a=i(3310),o=i(2674),s=i(2488),l=i(6038),c=i(4414);const d=t.Ay.div`
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
`,b=t.Ay.span`
  font-size: 14px;
  color: #374151;
`,_=t.Ay.span`
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
`,ie=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,ne=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,te=()=>{const[e,r]=(0,n.useState)([]),[i,t]=(0,n.useState)(null),[te,ae]=(0,n.useState)(!1),[oe,se]=(0,n.useState)(!1),[le,ce]=(0,n.useState)(!1),[de,pe]=(0,n.useState)({}),[ue,he]=(0,n.useState)(""),[xe,me]=(0,n.useState)("all"),[ge,ye]=(0,n.useState)("all"),[je,fe]=(0,n.useState)("all"),[ve,be]=(0,n.useState)([]),[_e,we]=(0,n.useState)({}),[Ae,Fe]=(0,n.useState)([]),[Ce,ke]=(0,n.useState)(!1),[,Pe]=(0,n.useState)([]),[Be,Se]=(0,n.useState)({}),[Ee,ze]=(0,n.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[$e,Me]=(0,n.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0});(0,n.useEffect)(()=>{Oe(),Ie(),Te(),Le()},[]);const Te=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();we(r.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Le=async()=>{try{const e=await fetch("/api/currencies/supported");if(e.ok){const r=await e.json();Fe((r.data||[]).map(e=>e.code))}}catch(e){console.error("Error fetching supported currencies:",e),Fe(["USD","RM","KRW"])}};(0,n.useEffect)(()=>{Object.keys(de).length>=0&&Ne()},[de]);const Ie=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true");if(!e.ok)throw new Error("Failed to fetch addon modules");const r=await e.json();be(r)}catch(e){console.error("Error fetching addon modules:",e),be([])}},Oe=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions");if(!e.ok)throw new Error("Failed to fetch subscription stats");const r=await e.json(),i={};r&&Array.isArray(r)&&r.forEach(e=>{i[e.plan_name]=e.count||0}),pe(i)}catch(e){console.error("Error fetching subscription stats:",e),pe({})}},Ne=async()=>{try{const e=await fetch("/api/plans");if(!e.ok)throw new Error("Failed to fetch plans");const i=(await e.json()).map(e=>{let r=[];try{"string"===typeof e.features?r=JSON.parse(e.features):Array.isArray(e.features)&&(r=e.features)}catch(n){console.warn("Failed to parse features for plan:",e.name,n),r=[]}let i=[];try{"string"===typeof e.included_modules?i=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(i=e.included_modules)}catch(n){console.warn("Failed to parse included_modules for plan:",e.name,n),i=[]}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:De(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),restaurantLimit:e.staff_limit,orderLimit:e.order_limit,features:r,includedModules:i,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:de[e.display_name]||0}});r(i)}catch(e){console.error("Error fetching plans:",e),r(Ue())}},De=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Ue=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,restaurantLimit:1,orderLimit:1e3,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,restaurantLimit:5,orderLimit:1e4,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,restaurantLimit:-1,orderLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:de.Enterprise||0}],Re=e.filter(e=>e.isActive).length,Je=e.reduce((e,r)=>e+r.subscriptionCount,0),We=e.reduce((e,r)=>e+r.monthlyPrice*r.subscriptionCount,0),Ye=e=>-1===e?"Unlimited":e.toLocaleString(),Qe=e.filter(e=>{const r=e.displayName.toLowerCase().includes(ue.toLowerCase())||e.description.toLowerCase().includes(ue.toLowerCase()),i="all"===xe||e.planTarget===xe,n="all"===ge||e.category===ge,t="all"===je||"active"===je&&e.isActive||"inactive"===je&&!e.isActive;return r&&i&&n&&t}),qe=e.filter(e=>"basic"===e.category).length,Ke=e.filter(e=>"custom"===e.category).length;return(0,c.jsx)(a.A,{children:(0,c.jsxs)(o.mc,{children:[(0,c.jsxs)(o.Y9,{children:[(0,c.jsx)(o.hE,{children:"Subscription Plans"}),(0,c.jsxs)(o.ex,{children:[(0,c.jsx)(o.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv");if(!e.ok)throw new Error("Failed to export plans");const r=await e.blob(),i=window.URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),window.URL.revokeObjectURL(i),document.body.removeChild(n)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:"Export"}),(0,c.jsx)(o.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Plan"})]})]}),(0,c.jsxs)(o.UC,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#059669",children:[(0,c.jsx)(o.Os,{children:e.length}),(0,c.jsx)(o.v0,{children:"Total Plans"}),(0,c.jsxs)(o.d1,{children:[qe," basic + ",Ke," custom"]})]}),(0,c.jsxs)(o.hI,{color:"#10B981",children:[(0,c.jsx)(o.Os,{children:Re}),(0,c.jsx)(o.v0,{children:"Active Plans"}),(0,c.jsxs)(o.d1,{children:[e.length>0?Math.round(Re/e.length*100):0,"% available"]})]}),(0,c.jsxs)(o.hI,{color:"#F59E0B",children:[(0,c.jsx)(o.Os,{children:Je}),(0,c.jsx)(o.v0,{children:"Total Subscriptions"}),(0,c.jsx)(o.d1,{children:"Across all plans"})]}),(0,c.jsxs)(o.hI,{color:"#DC2626",children:[(0,c.jsx)(o.Os,{children:(0,l.vv)(We)}),(0,c.jsx)(o.v0,{children:"Monthly Revenue"}),(0,c.jsx)(o.d1,{children:"From all subscriptions"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search plans...",value:ue,onChange:e=>he(e.target.value)}),(0,c.jsxs)(s.Jt,{value:xe,onChange:e=>me(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Plans"}),(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plans"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plans"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plans"})]}),(0,c.jsxs)(s.Jt,{value:ge,onChange:e=>ye(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"basic",children:"Basic Plans"}),(0,c.jsx)("option",{value:"custom",children:"Custom Plans"})]}),(0,c.jsxs)(s.Jt,{value:je,onChange:e=>fe(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,c.jsx)(d,{children:Qe.map(e=>(0,c.jsxs)(p,{isPopular:e.isPopular,isActive:e.isActive,children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(M,{category:e.category,children:"basic"===e.category?"Basic":"Custom"}),(0,c.jsx)($,{isActive:e.isActive,children:e.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:e.displayName}),(0,c.jsx)(x,{children:e.description}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(g,{children:[(0,l.vv)(e.monthlyPrice),(0,c.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),e.annualPrice>0&&e.monthlyPrice>0&&(0,c.jsxs)(y,{children:[(0,l.vv)(e.annualPrice),"/year",12*e.monthlyPrice>e.annualPrice&&(0,c.jsxs)("span",{children:[" (Save ",Math.round((12*e.monthlyPrice-e.annualPrice)/(12*e.monthlyPrice)*100),"%)"]})]}),(0,c.jsx)(j,{children:"Billed monthly or annually"})]})]}),"basic"===e.category&&(0,c.jsxs)(f,{children:[(0,c.jsxs)(v,{children:[(0,c.jsx)(b,{children:"Staff Limit"}),(0,c.jsx)(_,{children:Ye(e.restaurantLimit)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(b,{children:"Orders/month"}),(0,c.jsx)(_,{children:Ye(e.orderLimit)})]})]}),e.includedModules&&e.includedModules.length>0&&(()=>{const r=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"===e.category),i=e.includedModules.map(e=>ve.find(r=>r.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,c.jsxs)(c.Fragment,{children:[r.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Basic Modules (",r.length,")"]}),(0,c.jsx)(k,{children:r.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]}),i.length>0&&(0,c.jsxs)(F,{children:[(0,c.jsxs)(C,{children:["Advanced Modules (",i.length,")"]}),(0,c.jsx)(k,{children:i.map((e,r)=>(0,c.jsx)(P,{children:e.name},r))})]})]})})(),(0,c.jsx)(w,{children:(Array.isArray(e.features)?e.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:e.subscriptionCount}),(0,c.jsx)(z,{children:"Subscriptions"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:(0,l.vv)(e.monthlyPrice*e.subscriptionCount)}),(0,c.jsx)(z,{children:"Monthly Revenue"})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>(async e=>{t(e);let r={};try{const t=localStorage.getItem("auth_token"),a=e.id.replace("plan-",""),o=await fetch(`/api/currencies/plans/${a}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(o.ok){const e=await o.json();for(const t of e.data||[]){var i,n;r[t.currency]={monthly:(null===(i=t.monthly_price)||void 0===i?void 0:i.toString())||"0",annual:(null===(n=t.annual_price)||void 0===n?void 0:n.toString())||"0"}}}}catch(a){console.error("Error loading plan prices:",a)}Me({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:r,order_limit:e.orderLimit.toString(),menu_item_limit:"50",staff_limit:e.restaurantLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),se(!0)})(e),children:"Edit"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>{t(e),(async e=>{try{const n=localStorage.getItem("auth_token"),t=e.replace("plan-",""),a=await fetch(`/api/currencies/plans/${t}/prices`,{headers:{Authorization:`Bearer ${n}`}});if(a.ok){const e=await a.json();Pe(e.data||[]);const n={};for(const t of e.data||[]){var r,i;n[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(i=t.annual_price)||void 0===i?void 0:i.toString())||"0"}}for(const r of Ae)n[r]||(n[r]={monthly:"0",annual:"0"});Se(n)}}catch(n){console.error("Error fetching plan prices:",n)}})(e.id),ke(!0)},children:"Prices"}),(0,c.jsx)(I,{variant:"secondary",onClick:()=>(e=>{t(e),ce(!0)})(e),children:"View"})]})]},e.id))}),te&&(0,c.jsx)(O,{onClick:()=>ae(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsx)(U,{children:"Create New Plan"}),(0,c.jsx)(R,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:Ee.plan_target,onChange:e=>ze(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:Ee.category,onChange:e=>ze(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Ee.display_name,onChange:e=>{const r=e.target.value,i=r.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();ze(e=>({...e,display_name:r,name:i}))}})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Description"}),(0,c.jsx)(K,{placeholder:"Enter plan description...",rows:3,value:Ee.description,onChange:e=>ze(r=>({...r,description:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,i,n,t;const a=_e[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=Ee.currency_prices)||void 0===r||null===(i=r[e])||void 0===i?void 0:i.monthly)||"",onChange:r=>ze(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=Ee.currency_prices)||void 0===n||null===(t=n[e])||void 0===t?void 0:t.annual)||"",onChange:r=>ze(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===Ee.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(X,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ee.menu_item_limit,onChange:e=>ze(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ee.order_limit,onChange:e=>ze(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:Ee.staff_limit,onChange:e=>ze(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===Ee.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ee.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(G,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===Ee.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ee.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ze(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ze(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ee.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(G,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===Ee.plan_target||"all"===e.target_user_type)).map(e=>{const r=Ee.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?ze(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):ze(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(K,{placeholder:"Enter features, one per line...",rows:6,value:Ee.features,onChange:e=>ze(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"popular",checked:Ee.is_popular,onChange:e=>ze(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"active",checked:Ee.is_active,onChange:e=>ze(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(o.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,c.jsx)(o.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===Ee.category,r={name:Ee.name,display_name:Ee.display_name,description:Ee.description,category:Ee.category,plan_target:Ee.plan_target,base_price_monthly:parseFloat(Ee.base_price_monthly)||0,base_price_annual:parseFloat(Ee.base_price_annual)||0,order_limit:e?-1:parseInt(Ee.order_limit)||-1,menu_item_limit:e?-1:parseInt(Ee.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Ee.staff_limit)||-1,features:Ee.features.split("\n").filter(e=>e.trim()),included_modules:Ee.included_modules,is_popular:Ee.is_popular,is_active:Ee.is_active};console.log("Creating plan with data:",r);const i=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok){const e=await i.json();throw new Error(e.error||"Failed to create plan")}const n=await i.json();if(Ee.currency_prices&&Object.keys(Ee.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries(Ee.currency_prices).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${n.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}ze({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ae(!1),Ne()}catch(e){console.error("Error creating plan:",e)}},children:"Create"})]})]})}),oe&&i&&(0,c.jsx)(O,{onClick:()=>se(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Edit Plan: ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>se(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Name *"}),(0,c.jsx)(Q,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:$e.display_name,onChange:e=>Me(r=>({...r,display_name:e.target.value}))}),(0,c.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",$e.name]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Target *"}),(0,c.jsxs)(q,{value:$e.plan_target,onChange:e=>Me(r=>({...r,plan_target:e.target.value})),children:[(0,c.jsx)("option",{value:"restaurant",children:"Restaurant Plan"}),(0,c.jsx)("option",{value:"brand",children:"Brand Plan"}),(0,c.jsx)("option",{value:"foodcourt",children:"Foodcourt Plan"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Plan Category *"}),(0,c.jsxs)(q,{value:$e.category,onChange:e=>Me(r=>({...r,category:e.target.value})),children:[(0,c.jsx)("option",{value:"basic",children:"Basic Subscription"}),(0,c.jsx)("option",{value:"custom",children:"Custom Subscription"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Pricing by Currency"}),(0,c.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[Ae.map(e=>{var r,i,n,t;const a=_e[e];return(0,c.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===a||void 0===a?void 0:a.symbol)||e," ",e," - ",(null===a||void 0===a?void 0:a.name)||e]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Monthly"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(r=$e.currency_prices)||void 0===r||null===(i=r[e])||void 0===i?void 0:i.monthly)||"",onChange:r=>Me(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],monthly:r.target.value}}}})})]}),(0,c.jsxs)(W,{style:{marginBottom:0},children:[(0,c.jsx)(Y,{style:{fontSize:"12px"},children:"Annual"}),(0,c.jsx)(Q,{type:"number",placeholder:"0",value:(null===(n=$e.currency_prices)||void 0===n||null===(t=n[e])||void 0===t?void 0:t.annual)||"",onChange:r=>Me(i=>{var n;return{...i,currency_prices:{...i.currency_prices,[e]:{...null===(n=i.currency_prices)||void 0===n?void 0:n[e],annual:r.target.value}}}})})]})]})]},e)}),0===Ae.length&&(0,c.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===$e.category&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(X,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Menu Item Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.menu_item_limit,onChange:e=>Me(r=>({...r,menu_item_limit:e.target.value}))})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Order Limit (per month)"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.order_limit,onChange:e=>Me(r=>({...r,order_limit:e.target.value}))})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Staff Limit"}),(0,c.jsx)(Q,{type:"number",placeholder:"-1 for unlimited",value:$e.staff_limit,onChange:e=>Me(r=>({...r,staff_limit:e.target.value}))})]})]}),"basic"===$e.category&&(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Included Modules"}),ve.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,c.jsx)(G,{children:ve.filter(e=>"basic"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),ve.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).length>0&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,c.jsx)(G,{children:ve.filter(e=>"advanced"===e.category&&(e.target_user_type===$e.plan_target||"all"===e.target_user_type)).map(e=>{const r=$e.included_modules.includes(e.module_code);return(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:r,onChange:r=>{r.target.checked?Me(r=>({...r,included_modules:[...r.included_modules,e.module_code]})):Me(r=>({...r,included_modules:r.included_modules.filter(r=>r!==e.module_code)}))}}),(0,c.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,c.jsx)("strong",{children:e.name}),(0,c.jsx)("br",{}),(0,c.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(Y,{children:"Features (one per line)"}),(0,c.jsx)(K,{placeholder:"Enter features, one per line...",rows:6,value:$e.features,onChange:e=>Me(r=>({...r,features:e.target.value}))})]}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-popular",checked:$e.is_popular,onChange:e=>Me(r=>({...r,is_popular:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-popular",children:"Mark as Most Popular"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)("input",{type:"checkbox",id:"edit-active",checked:$e.is_active,onChange:e=>Me(r=>({...r,is_active:e.target.checked}))}),(0,c.jsx)("label",{htmlFor:"edit-active",children:"Set as Active"})]})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(o.$n,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,c.jsx)(o.$n,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this plan? This action cannot be undone."))try{const r=await fetch(`/api/plans/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}se(!1),Ne()}catch(r){console.error("Error deleting plan:",r)}})(i.id),children:"Delete"}),(0,c.jsx)(o.$n,{variant:"primary",onClick:async()=>{try{if(!$e.display_name)return void console.log("Display name is required");const e="custom"===$e.category,r={display_name:$e.display_name,description:$e.description,category:$e.category,plan_target:$e.plan_target,base_price_monthly:parseFloat($e.base_price_monthly)||0,base_price_annual:parseFloat($e.base_price_annual)||0,order_limit:e?-1:parseInt($e.order_limit)||-1,menu_item_limit:e?-1:parseInt($e.menu_item_limit)||-1,staff_limit:e?-1:parseInt($e.staff_limit)||-1,features:$e.features.split("\n").filter(e=>e.trim()),included_modules:$e.included_modules,is_popular:$e.is_popular,is_active:$e.is_active};console.log("Updating plan with data:",r);const i=$e.id.replace("plan-",""),n=await fetch(`/api/plans/${i}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!n.ok){const e=await n.json();throw new Error(e.error||"Failed to update plan")}if($e.currency_prices&&Object.keys($e.currency_prices).length>0){const e=localStorage.getItem("auth_token"),r=Object.entries($e.currency_prices).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${i}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})})}se(!1),Ne()}catch(e){console.error("Error updating plan:",e)}},children:"Update"})]})]})}),le&&i&&(0,c.jsx)(O,{onClick:()=>ce(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Plan Details: ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsxs)(ee,{children:[(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Plan ID"}),(0,c.jsx)(ne,{children:i.id})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Internal Name"}),(0,c.jsx)(ne,{children:i.name})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Display Name"}),(0,c.jsx)(ne,{children:i.displayName})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Status"}),(0,c.jsx)($,{isActive:i.isActive,children:i.isActive?"Active":"Inactive"})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Popular Plan"}),(0,c.jsx)(ne,{children:i.isPopular?"Yes":"No"})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Pricing"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Monthly Price"}),(0,c.jsx)(ne,{children:(0,l.vv)(i.monthlyPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Annual Price"}),(0,c.jsx)(ne,{children:(0,l.vv)(i.annualPrice)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Annual Discount"}),(0,c.jsxs)(ne,{children:[Math.round((12*i.monthlyPrice-i.annualPrice)/(12*i.monthlyPrice)*100),"%"]})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Limits"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Restaurant Limit"}),(0,c.jsx)(ne,{children:Ye(i.restaurantLimit)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Monthly Order Limit"}),(0,c.jsx)(ne,{children:Ye(i.orderLimit)})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Statistics"}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Current Subscriptions"}),(0,c.jsx)(ne,{children:i.subscriptionCount})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Monthly Revenue"}),(0,c.jsx)(ne,{children:(0,l.vv)(i.monthlyPrice*i.subscriptionCount)})]}),(0,c.jsxs)(re,{children:[(0,c.jsx)(ie,{children:"Created Date"}),(0,c.jsx)(ne,{children:i.createdAt})]})]}),(0,c.jsxs)(ee,{children:[(0,c.jsx)("h4",{children:"Features"}),(0,c.jsx)(w,{children:(Array.isArray(i.features)?i.features:[]).map((e,r)=>(0,c.jsx)(A,{children:e},r))})]})]})]})}),Ce&&i&&(0,c.jsx)(O,{onClick:()=>ke(!1),children:(0,c.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,c.jsxs)(D,{children:[(0,c.jsxs)(U,{children:["Set Prices for ",i.displayName]}),(0,c.jsx)(R,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,c.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[Ae.map(e=>{var r,i;const n=_e[e];return(0,c.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,c.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===n||void 0===n?void 0:n.symbol)||e}),(null===n||void 0===n?void 0:n.name)||e," (",e,")"]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,c.jsx)("input",{type:"number",value:(null===(r=Be[e])||void 0===r?void 0:r.monthly)||"",onChange:r=>Se({...Be,[e]:{...Be[e],monthly:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,c.jsx)("input",{type:"number",value:(null===(i=Be[e])||void 0===i?void 0:i.annual)||"",onChange:r=>Se({...Be,[e]:{...Be[e],annual:r.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px"},placeholder:"0.00"})]})]})]},e)}),0===Ae.length&&(0,c.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(o.$n,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,c.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(i)try{const e=localStorage.getItem("auth_token"),r=i.id.replace("plan-",""),n=Object.entries(Be).map(e=>{let[r,i]=e;return{currency:r,monthly_price:parseFloat(i.monthly)||0,annual_price:parseFloat(i.annual)||0,is_active:!0}}),t=await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})});if(t.ok)ke(!1);else{const e=await t.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:"Save Prices"})]})]})})]})]})})}}}]);