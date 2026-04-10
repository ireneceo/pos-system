"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6837],{6837:(e,n,r)=>{r.r(n),r.d(n,{default:()=>Z});var a=r(9950),t=r(4752),i=r(8409),l=r(2488),s=r(6038),o=r(7617),d=r(5030),c=r(9955),p=r(4414);const u={restaurant:["dashboard","membership"],brand:["brand_dashboard"],foodcourt:["fc_dashboard"],owner:["owner_dashboard"]},m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,h=t.Ay.div`
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
`,g=t.Ay.div`
  text-align: center;
  margin-bottom: 32px;
  margin-top: 36px;
`,x=t.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
  text-transform: capitalize;
`,y=(t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,t.Ay.div`
  text-align: center;
`),j=t.Ay.div`
  font-size: 36px;
  font-weight: 800;
  color: #0A2540;
  margin-bottom: 4px;
`,_=t.Ay.div`
  font-size: 14px;
  color: #059669;
  font-weight: 600;
  margin-bottom: 8px;
`,f=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,v=t.Ay.div`
  margin: 8px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,b=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,P=t.Ay.span`
  font-size: 14px;
  color: #374151;
`,F=t.Ay.span`
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
`,C=t.Ay.div`
  margin: 8px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,B=t.Ay.div`
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
`,S=t.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  font-weight: 500;
`,E=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid #E6EBF1;
  border-bottom: 1px solid #E6EBF1;
`,z=t.Ay.div`
  text-align: center;
`,L=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,$=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,T=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
`,O=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"basic"===e.category?"#DBEAFE":"#FEF3C7"};
  color: ${e=>"basic"===e.category?"#1E40AF":"#92400E"};
`,I=t.Ay.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  align-items: center;
`,M=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,N=t.Ay.button`
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,D=t.Ay.div`
  margin-bottom: 20px;
`,U=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,R=t.Ay.input`
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
`,W=t.Ay.select`
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
`,J=t.Ay.textarea`
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
`,Y=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,q=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,H=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,K=t.Ay.div`
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
`,Q=t.Ay.div`
  margin-bottom: 24px;

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #0A2540;
    margin: 0 0 16px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid #E6EBF1;
  }
`,V=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`,X=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`,G=t.Ay.span`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,Z=()=>{const{t:e}=(0,d.Bd)("admin"),[n,r]=(0,a.useState)([]),[t,Z]=(0,a.useState)(null),[ee,ne]=(0,a.useState)(!1),[re,ae]=(0,a.useState)(!1),[te,ie]=(0,a.useState)(!1),[le,se]=(0,a.useState)({}),[oe,de]=(0,a.useState)(""),[ce,pe]=(0,a.useState)("all"),[ue,me]=(0,a.useState)("all"),[he,ge]=(0,a.useState)("all"),[xe,ye]=(0,a.useState)(""),[je,_e]=(0,a.useState)([]),[fe,ve]=(0,a.useState)({}),[be,Pe]=(0,a.useState)([]),[Fe,we]=(0,a.useState)(!1),[,Ae]=(0,a.useState)([]),[Ce,Be]=(0,a.useState)({}),[ke,Se]=(0,a.useState)(!1),[Ee,ze]=(0,a.useState)(null),[Le,$e]=(0,a.useState)({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),[Te,Oe]=(0,a.useState)({id:"",name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),Ie=()=>{const e=(0,c.c4)();return e?{Authorization:`Bearer ${e}`}:{}};(0,a.useEffect)(()=>{Ue(),De(),Me(),Ne()},[]);const Me=async()=>{try{const e=await fetch("/api/currencies/config",{headers:Ie()});if(e.ok){const n=await e.json();ve(n.currencies||n.data||{})}}catch(e){console.error("Error fetching currency config:",e)}},Ne=async()=>{try{const e=await fetch("/api/currencies/supported",{headers:Ie()});if(e.ok){const n=((await e.json()).data||[]).map(e=>e.code);Pe(n),n.length>0&&ye(e=>e||n[0])}}catch(e){console.error("Error fetching supported currencies:",e),Pe(["MYR","KRW"]),ye(e=>e||"MYR")}};(0,a.useEffect)(()=>{Object.keys(le).length>=0&&Re()},[le]);const De=async()=>{try{const e=await fetch("/api/addon-modules?active_only=true",{headers:Ie()});if(!e.ok)throw new Error("Failed to fetch addon modules");const n=await e.json();_e(n)}catch(e){console.error("Error fetching addon modules:",e),_e([])}},Ue=async()=>{try{const e=await fetch("/api/plans/stats/subscriptions",{headers:Ie()});if(!e.ok)throw new Error("Failed to fetch subscription stats");const n=await e.json(),r={};n&&Array.isArray(n)&&n.forEach(e=>{r[e.plan_name]=e.count||0}),se(r)}catch(e){console.error("Error fetching subscription stats:",e),se({})}},Re=async()=>{try{const e=await fetch("/api/plans",{headers:Ie()});if(!e.ok)throw new Error("Failed to fetch plans");const n=await e.json(),a=(0,c.c4)(),t=await Promise.all(n.map(async e=>{let n=[];try{"string"===typeof e.features?n=JSON.parse(e.features):Array.isArray(e.features)&&(n=e.features)}catch(i){console.warn("Failed to parse features for plan:",e.name,i),n=[]}let r=[];try{"string"===typeof e.included_modules?r=JSON.parse(e.included_modules):Array.isArray(e.included_modules)&&(r=e.included_modules)}catch(i){console.warn("Failed to parse included_modules for plan:",e.name,i),r=[]}let t={};try{const n=await fetch(`/api/currencies/plans/${e.id}/prices`,{headers:{Authorization:`Bearer ${a}`}});if(n.ok){const e=await n.json();for(const n of e.data||[])t[n.currency]={monthly:parseFloat(n.monthly_price)||0,annual:parseFloat(n.annual_price)||0}}}catch(i){console.warn("Failed to fetch currency prices for plan:",e.name,i)}return{id:`plan-${e.id}`,name:e.name,displayName:e.display_name,description:We(e.name),category:e.category||"basic",planTarget:e.plan_target||"restaurant",monthlyPrice:parseFloat(e.base_price_monthly),annualPrice:parseFloat(e.base_price_annual),orderLimit:e.order_limit,menuItemLimit:e.menu_item_limit,staffLimit:e.staff_limit,restaurantLimit:e.restaurant_limit,managerLimit:e.manager_limit,features:n,includedModules:r,isPopular:"professional"===e.name,isActive:e.is_active,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],subscriptionCount:le[e.display_name]||0,currencyPrices:t}}));r(t)}catch(e){console.error("Error fetching plans:",e),r(Je())}},We=e=>{switch(e){case"basic":return"Perfect for single restaurant owners starting their POS journey";case"professional":return"Ideal for growing businesses with multiple locations";case"enterprise":return"Comprehensive solution for large restaurant chains and food courts";default:return"Subscription plan for restaurant management"}},Je=()=>[{id:"plan-basic",name:"basic",displayName:"Basic",description:"Perfect for single restaurant owners starting their POS journey",category:"basic",planTarget:"restaurant",monthlyPrice:29,annualPrice:290,menuItemLimit:50,orderLimit:1e3,staffLimit:5,restaurantLimit:-1,managerLimit:-1,features:["Up to 1,000 orders per month","Up to 50 menu items","Up to 5 staff accounts","Basic analytics","Community support","Standard POS features"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:le.Basic||0},{id:"plan-professional",name:"professional",displayName:"Professional",description:"Ideal for growing businesses with multiple locations",category:"basic",planTarget:"restaurant",monthlyPrice:99,annualPrice:990,menuItemLimit:200,orderLimit:1e4,staffLimit:20,restaurantLimit:-1,managerLimit:-1,features:["Up to 10,000 orders per month","Up to 200 menu items","Up to 20 staff accounts","Advanced analytics","Email support","Inventory management","Customer loyalty program","Multi-location support"],isPopular:!0,isActive:!0,createdAt:"2024-01-01",subscriptionCount:le.Professional||0},{id:"plan-enterprise",name:"enterprise",displayName:"Enterprise",description:"Comprehensive solution for large restaurant chains and food courts",category:"basic",planTarget:"restaurant",monthlyPrice:199,annualPrice:2190,menuItemLimit:-1,orderLimit:-1,staffLimit:-1,restaurantLimit:-1,managerLimit:-1,features:["Unlimited orders","Unlimited menu items","Unlimited staff accounts","Premium analytics & reports","Priority 24/7 support","Custom branding","API access","Dedicated account manager","Custom integrations","Training sessions"],isPopular:!1,isActive:!0,createdAt:"2024-01-01",subscriptionCount:le.Enterprise||0}],Ye=n.filter(e=>e.isActive).length,qe=n.reduce((e,n)=>e+n.subscriptionCount,0),He=n.reduce((e,n)=>e+n.monthlyPrice*n.subscriptionCount,0),Ke=e=>-1===e?"Unlimited":e.toLocaleString(),Qe=(e,n)=>e.currencyPrices&&e.currencyPrices[xe]?e.currencyPrices[xe][n]:0,Ve=e=>!!(e.currencyPrices&&e.currencyPrices[xe]&&(e.currencyPrices[xe].monthly>0||e.currencyPrices[xe].annual>0)),Xe=(e,n)=>{if(!Ve(e))return"Not Set";const r=Qe(e,n);return(0,s.vv)(r,xe)},Ge=async e=>{Z(e);let n={};try{const t=(0,c.c4)(),i=e.id.replace("plan-",""),l=await fetch(`/api/currencies/plans/${i}/prices`,{headers:{Authorization:`Bearer ${t}`}});if(l.ok){const e=await l.json();for(const t of e.data||[]){var r,a;n[t.currency]={monthly:(null===(r=t.monthly_price)||void 0===r?void 0:r.toString())||"0",annual:(null===(a=t.annual_price)||void 0===a?void 0:a.toString())||"0"}}}}catch(t){console.error("Error loading plan prices:",t)}Oe({id:e.id,name:e.name,display_name:e.displayName,description:e.description,category:e.category,plan_target:e.planTarget,base_price_monthly:e.monthlyPrice.toString(),base_price_annual:e.annualPrice.toString(),currency_prices:n,order_limit:e.orderLimit.toString(),menu_item_limit:e.menuItemLimit.toString(),staff_limit:e.staffLimit.toString(),restaurant_limit:e.restaurantLimit.toString(),manager_limit:e.managerLimit.toString(),features:e.features.join("\n"),included_modules:e.includedModules||[],is_popular:e.isPopular,is_active:e.isActive}),ae(!0)},Ze=n.filter(e=>{const n=e.displayName.toLowerCase().includes(oe.toLowerCase())||e.description.toLowerCase().includes(oe.toLowerCase()),r="all"===ce||e.planTarget===ce,a="all"===ue||e.category===ue,t="all"===he||"active"===he&&e.isActive||"inactive"===he&&!e.isActive;return n&&r&&a&&t}),en=n.filter(e=>"basic"===e.category).length,nn=n.filter(e=>"custom"===e.category).length;return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:e("admin:plansPage.subscriptionPlans")}),(0,p.jsxs)(i.ex,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/plans/export/csv",{headers:Ie()});if(!e.ok)throw new Error("Failed to export plans");const n=await e.blob(),r=window.URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=`subscription-plans-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),window.URL.revokeObjectURL(r),document.body.removeChild(a)}catch(e){console.error("Error exporting plans:",e),console.error("Failed to export plans. Please try again.")}},children:e("admin:plansPage.export")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>{ne(!0)},children:e("admin:plansPage.createPlan")})]})]}),(0,p.jsxs)(i.UC,{children:[(0,p.jsxs)(i.MD,{children:[(0,p.jsxs)(i.hI,{color:"#059669",children:[(0,p.jsx)(i.Os,{children:n.length}),(0,p.jsx)(i.v0,{children:e("admin:plansPage.totalPlans")}),(0,p.jsxs)(i.d1,{children:[en," basic + ",nn," custom"]})]}),(0,p.jsxs)(i.hI,{color:"#10B981",children:[(0,p.jsx)(i.Os,{children:Ye}),(0,p.jsx)(i.v0,{children:e("admin:plansPage.activePlans")}),(0,p.jsxs)(i.d1,{children:[n.length>0?Math.round(Ye/n.length*100):0,"% available"]})]}),(0,p.jsxs)(i.hI,{color:"#F59E0B",children:[(0,p.jsx)(i.Os,{children:qe}),(0,p.jsx)(i.v0,{children:e("admin:plansPage.totalSubscriptions")}),(0,p.jsx)(i.d1,{children:e("admin:plansPage.acrossAllPlans")})]}),(0,p.jsxs)(i.hI,{color:"#DC2626",children:[(0,p.jsx)(i.Os,{children:(0,s.vv)(He)}),(0,p.jsx)(i.v0,{children:e("admin:plansPage.monthlyRevenue")}),(0,p.jsx)(i.d1,{children:e("admin:plansPage.fromAllSubscriptions")})]})]}),(0,p.jsxs)(l.Qn,{children:[(0,p.jsxs)(l.Jt,{value:ce,onChange:e=>pe(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:plansPage.allPlans")}),(0,p.jsx)("option",{value:"restaurant",children:e("admin:plansPage.restaurantPlans")}),(0,p.jsx)("option",{value:"brand",children:e("admin:plansPage.brandPlans")}),(0,p.jsx)("option",{value:"foodcourt",children:e("admin:plansPage.foodcourtPlans")}),(0,p.jsx)("option",{value:"owner",children:e("admin:plansPage.restaurantOwnerPlans")})]}),(0,p.jsxs)(l.Jt,{value:ue,onChange:e=>me(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:plansPage.allCategories")}),(0,p.jsx)("option",{value:"basic",children:e("admin:plansPage.basicPlans")}),(0,p.jsx)("option",{value:"custom",children:e("admin:plansPage.customPlans")})]}),(0,p.jsxs)(l.Jt,{value:he,onChange:e=>ge(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:plansPage.allStatus")}),(0,p.jsx)("option",{value:"active",children:e("admin:plansPage.active")}),(0,p.jsx)("option",{value:"inactive",children:e("admin:plansPage.inactive")})]}),(0,p.jsx)(l.Jt,{value:xe,onChange:e=>ye(e.target.value),style:{minWidth:"150px"},children:be.map(e=>{const n=fe[e];return(0,p.jsxs)("option",{value:e,children:[(null===n||void 0===n?void 0:n.symbol)||e," ",e]},e)})}),(0,p.jsx)(l.DO,{type:"text",placeholder:"Search plans...",value:oe,onChange:e=>de(e.target.value)})]}),(0,p.jsx)(m,{children:Ze.map(n=>(0,p.jsxs)(h,{isPopular:n.isPopular,isActive:n.isActive,children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(O,{category:n.category,children:"basic"===n.category?"Basic":"Custom"}),(0,p.jsx)(T,{isActive:n.isActive,children:n.isActive?"Active":"Inactive"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(x,{children:n.displayName}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#635BFF",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"24px"},children:"restaurant"===n.planTarget?"Restaurant Plan":"brand"===n.planTarget?"Brand Plan":"foodcourt"===n.planTarget?"Foodcourt Plan":"Owner Plan"}),(0,p.jsx)(y,{children:Ve(n)?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(j,{children:[Xe(n,"monthly"),(0,p.jsx)("span",{style:{fontSize:"16px",color:"#6B7280"},children:"/month"})]}),Qe(n,"annual")>0&&Qe(n,"monthly")>0&&(0,p.jsxs)(_,{children:[Xe(n,"annual"),"/year",12*Qe(n,"monthly")>Qe(n,"annual")&&(0,p.jsxs)("span",{children:[" (Save ",Math.round((12*Qe(n,"monthly")-Qe(n,"annual"))/(12*Qe(n,"monthly"))*100),"%)"]})]}),(0,p.jsx)(f,{children:e("admin:plansPage.billedMonthlyOrAnnually")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{style:{color:"#F59E0B"},children:"Price Not Set"}),(0,p.jsxs)(f,{style:{color:"#F59E0B"},children:["Set ",xe,' price in "Prices" button']})]})})]}),"basic"===n.category&&"restaurant"===n.planTarget&&(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.menuItems")}),(0,p.jsx)(F,{children:Ke(n.menuItemLimit)})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.ordersmonth")}),(0,p.jsx)(F,{children:Ke(n.orderLimit)})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.staff")}),(0,p.jsx)(F,{children:Ke(n.staffLimit)})]})]}),"basic"===n.category&&("brand"===n.planTarget||"foodcourt"===n.planTarget)&&(0,p.jsxs)(v,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.restaurants")}),(0,p.jsx)(F,{children:Ke(n.restaurantLimit)})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.managers")}),(0,p.jsx)(F,{children:Ke(n.managerLimit)})]})]}),"basic"===n.category&&"owner"===n.planTarget&&(0,p.jsx)(v,{children:(0,p.jsxs)(b,{children:[(0,p.jsx)(P,{children:e("admin:plansPage.restaurants")}),(0,p.jsx)(F,{children:Ke(n.restaurantLimit)})]})}),n.includedModules&&n.includedModules.length>0&&(()=>{const e=n.includedModules.map(e=>je.find(n=>n.module_code===e)).filter(e=>e&&"basic"===e.category),r=n.includedModules.map(e=>je.find(n=>n.module_code===e)).filter(e=>e&&"basic"!==e.category);return(0,p.jsxs)(p.Fragment,{children:[e.length>0&&(0,p.jsxs)(C,{children:[(0,p.jsxs)(B,{children:["Basic Modules (",e.length,")"]}),(0,p.jsx)(k,{children:e.map((e,n)=>(0,p.jsx)(S,{children:e.name},n))})]}),r.length>0&&(0,p.jsxs)(C,{children:[(0,p.jsxs)(B,{children:["Advanced Modules (",r.length,")"]}),(0,p.jsx)(k,{children:r.map((e,n)=>(0,p.jsx)(S,{children:e.name},n))})]})]})})(),(0,p.jsx)(w,{children:(Array.isArray(n.features)?n.features:[]).map((e,n)=>(0,p.jsx)(A,{children:e},n))}),(0,p.jsxs)(E,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(L,{children:n.subscriptionCount}),(0,p.jsx)($,{children:e("admin:plansPage.subscriptions")})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(L,{children:(0,s.vv)(Qe(n,"monthly")*n.subscriptionCount,xe)}),(0,p.jsx)($,{children:e("admin:plansPage.monthlyRevenue")})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(N,{variant:"primary",onClick:()=>Ge(n),children:"Edit"}),(0,p.jsx)(N,{variant:"secondary",onClick:()=>{Z(n),(async e=>{try{const a=(0,c.c4)(),t=e.replace("plan-",""),i=await fetch(`/api/currencies/plans/${t}/prices`,{headers:{Authorization:`Bearer ${a}`}});if(i.ok){const e=await i.json();Ae(e.data||[]);const a={};for(const t of e.data||[]){var n,r;a[t.currency]={monthly:(null===(n=t.monthly_price)||void 0===n?void 0:n.toString())||"0",annual:(null===(r=t.annual_price)||void 0===r?void 0:r.toString())||"0"}}for(const n of be)a[n]||(a[n]={monthly:"0",annual:"0"});Be(a)}}catch(a){console.error("Error fetching plan prices:",a)}})(n.id),we(!0)},children:"Prices"}),(0,p.jsx)(N,{variant:"secondary",onClick:()=>(e=>{Z(e),ie(!0)})(n),children:"View"})]})]},n.id))}),ee&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Create New Plan",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>ne(!1),children:e("admin:plansPage.cancel")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{try{const e="custom"===Le.category,n={name:Le.name,display_name:Le.display_name,description:Le.description,category:Le.category,plan_target:Le.plan_target,base_price_monthly:parseFloat(Le.base_price_monthly)||0,base_price_annual:parseFloat(Le.base_price_annual)||0,order_limit:e?-1:parseInt(Le.order_limit)||-1,menu_item_limit:e?-1:parseInt(Le.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Le.staff_limit)||-1,restaurant_limit:e?-1:parseInt(Le.restaurant_limit)||-1,manager_limit:e?-1:parseInt(Le.manager_limit)||-1,features:Le.features.split("\n").filter(e=>e.trim()),included_modules:[...u[Le.plan_target]||[],...Le.included_modules.filter(e=>!(u[Le.plan_target]||[]).includes(e))],is_popular:Le.is_popular,is_active:Le.is_active};console.log("Creating plan with data:",n);const r=await fetch("/api/plans",{method:"POST",headers:{"Content-Type":"application/json",...Ie()},body:JSON.stringify(n)});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to create plan")}const a=await r.json();if(Le.currency_prices&&Object.keys(Le.currency_prices).length>0){const e=(0,c.c4)(),n=Object.entries(Le.currency_prices).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${a.id}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}$e({name:"",display_name:"",description:"",category:"basic",plan_target:"restaurant",base_price_monthly:"",base_price_annual:"",currency_prices:{},order_limit:"",menu_item_limit:"",staff_limit:"",restaurant_limit:"",manager_limit:"",features:"",included_modules:[],is_popular:!1,is_active:!0}),ne(!1),Re()}catch(e){console.error("Error creating plan:",e)}},children:e("admin:plansPage.createPlan")})]}),children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Target *"}),(0,p.jsxs)(W,{value:Le.plan_target,onChange:e=>$e(n=>({...n,plan_target:e.target.value})),children:[(0,p.jsx)("option",{value:"restaurant",children:e("admin:plansPage.restaurantPlan")}),(0,p.jsx)("option",{value:"brand",children:e("admin:plansPage.brandPlan")}),(0,p.jsx)("option",{value:"foodcourt",children:e("admin:plansPage.foodcourtPlan")}),(0,p.jsx)("option",{value:"owner",children:e("admin:plansPage.restaurantOwnerPlan")})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Category *"}),(0,p.jsxs)(W,{value:Le.category,onChange:e=>$e(n=>({...n,category:e.target.value})),children:[(0,p.jsx)("option",{value:"basic",children:e("admin:plansPage.basicSubscription")}),(0,p.jsx)("option",{value:"custom",children:e("admin:plansPage.customSubscription")})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Name *"}),(0,p.jsx)(R,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Le.display_name,onChange:e=>{const n=e.target.value,r=n.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"_").trim();$e(e=>({...e,display_name:n,name:r}))}})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.description")}),(0,p.jsx)(J,{placeholder:"Enter plan description...",rows:3,value:Le.description,onChange:e=>$e(n=>({...n,description:e.target.value}))})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.pricingByCurrency")}),(0,p.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[be.map(n=>{var r,a,t,i;const l=fe[n];return(0,p.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===l||void 0===l?void 0:l.symbol)||n," ",n," - ",(null===l||void 0===l?void 0:l.name)||n]}),(0,p.jsxs)(Y,{children:[(0,p.jsxs)(D,{style:{marginBottom:0},children:[(0,p.jsx)(U,{style:{fontSize:"12px"},children:e("admin:plansPage.monthly")}),(0,p.jsx)(R,{type:"number",placeholder:"0",value:(null===(r=Le.currency_prices)||void 0===r||null===(a=r[n])||void 0===a?void 0:a.monthly)||"",onChange:e=>$e(r=>{var a;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(a=r.currency_prices)||void 0===a?void 0:a[n],monthly:e.target.value}}}})})]}),(0,p.jsxs)(D,{style:{marginBottom:0},children:[(0,p.jsx)(U,{style:{fontSize:"12px"},children:e("admin:plansPage.annual")}),(0,p.jsx)(R,{type:"number",placeholder:"0",value:(null===(t=Le.currency_prices)||void 0===t||null===(i=t[n])||void 0===i?void 0:i.annual)||"",onChange:e=>$e(r=>{var a;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(a=r.currency_prices)||void 0===a?void 0:a[n],annual:e.target.value}}}})})]})]})]},n)}),0===be.length&&(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:'No currencies configured. Add currencies in "Manage Currencies" first.'})]})]}),"basic"===Le.category&&"restaurant"===Le.plan_target&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(q,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.menuItemLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.menu_item_limit,onChange:e=>$e(n=>({...n,menu_item_limit:e.target.value}))})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.orderLimitPerMonth")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.order_limit,onChange:e=>$e(n=>({...n,order_limit:e.target.value}))})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.staffLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.staff_limit,onChange:e=>$e(n=>({...n,staff_limit:e.target.value}))})]})]}),"basic"===Le.category&&("brand"===Le.plan_target||"foodcourt"===Le.plan_target)&&(0,p.jsxs)(q,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.restaurant_limit,onChange:e=>$e(n=>({...n,restaurant_limit:e.target.value}))})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.managerLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.manager_limit,onChange:e=>$e(n=>({...n,manager_limit:e.target.value}))})]})]}),"basic"===Le.category&&"owner"===Le.plan_target&&(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Le.restaurant_limit,onChange:e=>$e(n=>({...n,restaurant_limit:e.target.value}))})]}),"basic"===Le.category&&(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.includedModules")}),je.filter(e=>"basic"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"basic"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).map(n=>{const r=(u[Le.plan_target]||[]).includes(n.module_code),a=r||Le.included_modules.includes(n.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`module-${n.module_code}`,checked:a,disabled:r,onChange:e=>{r||(e.target.checked?$e(e=>({...e,included_modules:[...e.included_modules,n.module_code]})):$e(e=>({...e,included_modules:e.included_modules.filter(e=>e!==n.module_code)})))}}),(0,p.jsxs)("label",{htmlFor:`module-${n.module_code}`,children:[(0,p.jsx)("strong",{children:n.name}),r&&(0,p.jsx)("span",{style:{color:"#635BFF",fontSize:"12px",marginLeft:"6px"},children:e("admin:plansPage.alwaysIncluded")}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:n.description})]})]},n.module_code)})})]}),je.filter(e=>"advanced"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"advanced"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).map(e=>{const n=Le.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?$e(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):$e(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"revenue"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"revenue"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).map(e=>{const n=Le.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?$e(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):$e(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"operation"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"operation"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).map(e=>{const n=Le.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?$e(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):$e(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"analytics"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"analytics"===e.category&&(e.target_user_type===Le.plan_target||"all"===e.target_user_type)).map(e=>{const n=Le.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?$e(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):$e(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.featuresOnePerLine")}),(0,p.jsx)(J,{placeholder:"Enter features, one per line...",rows:6,value:Le.features,onChange:e=>$e(n=>({...n,features:e.target.value}))})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:"popular",checked:Le.is_popular,onChange:e=>$e(n=>({...n,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"popular",children:e("admin:plansPage.markAsMostPopular")})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:"active",checked:Le.is_active,onChange:e=>$e(n=>({...n,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"active",children:e("admin:plansPage.setAsActive")})]})]})]}),re&&t&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>ae(!1),title:`Edit Plan: ${t.displayName}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>ae(!1),children:e("admin:plansPage.cancel")}),(0,p.jsx)(i.$n,{variant:"danger",onClick:()=>{return e=t.id,ze(e),ae(!1),void Se(!0);var e},children:e("admin:plansPage.delete")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{try{if(!Te.display_name)return void console.log("Display name is required");const e="custom"===Te.category,n={display_name:Te.display_name,description:Te.description,category:Te.category,plan_target:Te.plan_target,base_price_monthly:parseFloat(Te.base_price_monthly)||0,base_price_annual:parseFloat(Te.base_price_annual)||0,order_limit:e?-1:parseInt(Te.order_limit)||-1,menu_item_limit:e?-1:parseInt(Te.menu_item_limit)||-1,staff_limit:e?-1:parseInt(Te.staff_limit)||-1,restaurant_limit:e?-1:parseInt(Te.restaurant_limit)||-1,manager_limit:e?-1:parseInt(Te.manager_limit)||-1,features:Te.features.split("\n").filter(e=>e.trim()),included_modules:[...u[Te.plan_target]||[],...Te.included_modules.filter(e=>!(u[Te.plan_target]||[]).includes(e))],is_popular:Te.is_popular,is_active:Te.is_active};console.log("Updating plan with data:",n);const r=Te.id.replace("plan-",""),a=await fetch(`/api/plans/${r}`,{method:"PUT",headers:{"Content-Type":"application/json",...Ie()},body:JSON.stringify(n)});if(!a.ok){const e=await a.json();throw new Error(e.error||"Failed to update plan")}if(Te.currency_prices&&Object.keys(Te.currency_prices).length>0){const e=(0,c.c4)(),n=Object.entries(Te.currency_prices).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}});await fetch(`/api/currencies/plans/${r}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:n})})}ae(!1),Re()}catch(e){console.error("Error updating plan:",e)}},children:e("admin:plansPage.saveChanges")})]}),children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Name *"}),(0,p.jsx)(R,{type:"text",placeholder:"e.g., Basic Plan, Manager Professional",value:Te.display_name,onChange:e=>Oe(n=>({...n,display_name:e.target.value}))}),(0,p.jsxs)("small",{style:{color:"#9CA3AF",fontSize:"12px",marginTop:"4px",display:"block"},children:["Internal code: ",Te.name]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Target *"}),(0,p.jsxs)(W,{value:Te.plan_target,onChange:e=>Oe(n=>({...n,plan_target:e.target.value})),children:[(0,p.jsx)("option",{value:"restaurant",children:e("admin:plansPage.restaurantPlan")}),(0,p.jsx)("option",{value:"brand",children:e("admin:plansPage.brandPlan")}),(0,p.jsx)("option",{value:"foodcourt",children:e("admin:plansPage.foodcourtPlan")}),(0,p.jsx)("option",{value:"owner",children:e("admin:plansPage.restaurantOwnerPlan")})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:"Plan Category *"}),(0,p.jsxs)(W,{value:Te.category,onChange:e=>Oe(n=>({...n,category:e.target.value})),children:[(0,p.jsx)("option",{value:"basic",children:e("admin:plansPage.basicSubscription")}),(0,p.jsx)("option",{value:"custom",children:e("admin:plansPage.customSubscription")})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.pricingByCurrency")}),(0,p.jsxs)("div",{style:{display:"grid",gap:"12px",marginTop:"8px"},children:[be.map(n=>{var r,a,t,i;const l=fe[n];return(0,p.jsxs)("div",{style:{padding:"12px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"8px",color:"#0A2540"},children:[(null===l||void 0===l?void 0:l.symbol)||n," ",n," - ",(null===l||void 0===l?void 0:l.name)||n]}),(0,p.jsxs)(Y,{children:[(0,p.jsxs)(D,{style:{marginBottom:0},children:[(0,p.jsx)(U,{style:{fontSize:"12px"},children:e("admin:plansPage.monthly")}),(0,p.jsx)(R,{type:"number",placeholder:"0",value:(null===(r=Te.currency_prices)||void 0===r||null===(a=r[n])||void 0===a?void 0:a.monthly)||"",onChange:e=>Oe(r=>{var a;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(a=r.currency_prices)||void 0===a?void 0:a[n],monthly:e.target.value}}}})})]}),(0,p.jsxs)(D,{style:{marginBottom:0},children:[(0,p.jsx)(U,{style:{fontSize:"12px"},children:e("admin:plansPage.annual")}),(0,p.jsx)(R,{type:"number",placeholder:"0",value:(null===(t=Te.currency_prices)||void 0===t||null===(i=t[n])||void 0===i?void 0:i.annual)||"",onChange:e=>Oe(r=>{var a;return{...r,currency_prices:{...r.currency_prices,[n]:{...null===(a=r.currency_prices)||void 0===a?void 0:a[n],annual:e.target.value}}}})})]})]})]},n)}),0===be.length&&(0,p.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"No currencies configured."})]})]}),"basic"===Te.category&&"restaurant"===Te.plan_target&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(q,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.menuItemLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.menu_item_limit,onChange:e=>Oe(n=>({...n,menu_item_limit:e.target.value}))})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.orderLimitPerMonth")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.order_limit,onChange:e=>Oe(n=>({...n,order_limit:e.target.value}))})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.staffLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.staff_limit,onChange:e=>Oe(n=>({...n,staff_limit:e.target.value}))})]})]}),"basic"===Te.category&&("brand"===Te.plan_target||"foodcourt"===Te.plan_target)&&(0,p.jsxs)(q,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.restaurant_limit,onChange:e=>Oe(n=>({...n,restaurant_limit:e.target.value}))})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.managerLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.manager_limit,onChange:e=>Oe(n=>({...n,manager_limit:e.target.value}))})]})]}),"basic"===Te.category&&"owner"===Te.plan_target&&(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(R,{type:"number",placeholder:"-1 for unlimited",value:Te.restaurant_limit,onChange:e=>Oe(n=>({...n,restaurant_limit:e.target.value}))})]}),"basic"===Te.category&&(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.includedModules")}),je.filter(e=>"basic"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"16px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#3B82F6"},children:"Basic Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"basic"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(n=>{const r=(u[Te.plan_target]||[]).includes(n.module_code),a=r||Te.included_modules.includes(n.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`edit-module-${n.module_code}`,checked:a,disabled:r,onChange:e=>{r||(e.target.checked?Oe(e=>({...e,included_modules:[...e.included_modules,n.module_code]})):Oe(e=>({...e,included_modules:e.included_modules.filter(e=>e!==n.module_code)})))}}),(0,p.jsxs)("label",{htmlFor:`edit-module-${n.module_code}`,children:[(0,p.jsx)("strong",{children:n.name}),r&&(0,p.jsx)("span",{style:{color:"#635BFF",fontSize:"12px",marginLeft:"6px"},children:e("admin:plansPage.alwaysIncluded")}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:n.description})]})]},n.module_code)})})]}),je.filter(e=>"advanced"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#8B5CF6"},children:"Advanced Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"advanced"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const n=Te.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?Oe(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):Oe(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"revenue"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#10B981"},children:"Revenue Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"revenue"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const n=Te.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?Oe(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):Oe(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"operation"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#F59E0B"},children:"Operation Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"operation"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const n=Te.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?Oe(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):Oe(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]}),je.filter(e=>"analytics"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).length>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginTop:"24px",marginBottom:"8px",fontSize:"14px",fontWeight:600,color:"#EF4444"},children:"Analytics Modules"}),(0,p.jsx)(H,{children:je.filter(e=>"analytics"===e.category&&(e.target_user_type===Te.plan_target||"all"===e.target_user_type)).map(e=>{const n=Te.included_modules.includes(e.module_code);return(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:`edit-module-${e.module_code}`,checked:n,onChange:n=>{n.target.checked?Oe(n=>({...n,included_modules:[...n.included_modules,e.module_code]})):Oe(n=>({...n,included_modules:n.included_modules.filter(n=>n!==e.module_code)}))}}),(0,p.jsxs)("label",{htmlFor:`edit-module-${e.module_code}`,children:[(0,p.jsx)("strong",{children:e.name}),(0,p.jsx)("br",{}),(0,p.jsx)("small",{style:{color:"#6B7280"},children:e.description})]})]},e.module_code)})})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(U,{children:e("admin:plansPage.featuresOnePerLine")}),(0,p.jsx)(J,{placeholder:"Enter features, one per line...",rows:6,value:Te.features,onChange:e=>Oe(n=>({...n,features:e.target.value}))})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-popular",checked:Te.is_popular,onChange:e=>Oe(n=>({...n,is_popular:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-popular",children:e("admin:plansPage.markAsMostPopular")})]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("input",{type:"checkbox",id:"edit-active",checked:Te.is_active,onChange:e=>Oe(n=>({...n,is_active:e.target.checked}))}),(0,p.jsx)("label",{htmlFor:"edit-active",children:e("admin:plansPage.setAsActive")})]})]})]}),te&&t&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>ie(!1),title:`Plan Details: ${t.displayName}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>ie(!1),children:e("admin:plansPage.close")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>{ie(!1),Ge(t)},children:e("admin:plansPage.editPlan")})]}),children:[(0,p.jsxs)(Q,{children:[(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.planId")}),(0,p.jsx)(G,{children:t.id})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.internalName")}),(0,p.jsx)(G,{children:t.name})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.displayName")}),(0,p.jsx)(G,{children:t.displayName})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.status")}),(0,p.jsx)(T,{isActive:t.isActive,children:t.isActive?"Active":"Inactive"})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.popularPlan")}),(0,p.jsx)(G,{children:t.isPopular?"Yes":"No"})]})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)("h4",{children:e("admin:plansPage.pricing")}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.monthlyPrice")}),(0,p.jsx)(G,{children:(0,s.vv)(t.monthlyPrice)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.annualPrice")}),(0,p.jsx)(G,{children:(0,s.vv)(t.annualPrice)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.annualDiscount")}),(0,p.jsxs)(G,{children:[Math.round((12*t.monthlyPrice-t.annualPrice)/(12*t.monthlyPrice)*100),"%"]})]})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)("h4",{children:e("admin:plansPage.limits")}),"restaurant"===t.planTarget&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.menuItemLimit")}),(0,p.jsx)(G,{children:Ke(t.menuItemLimit)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.monthlyOrderLimit")}),(0,p.jsx)(G,{children:Ke(t.orderLimit)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.staffLimit")}),(0,p.jsx)(G,{children:Ke(t.staffLimit)})]})]}),("brand"===t.planTarget||"foodcourt"===t.planTarget)&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(G,{children:Ke(t.restaurantLimit)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.managerLimit")}),(0,p.jsx)(G,{children:Ke(t.managerLimit)})]})]}),"owner"===t.planTarget&&(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.restaurantLimit")}),(0,p.jsx)(G,{children:Ke(t.restaurantLimit)})]})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)("h4",{children:e("admin:plansPage.statistics")}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.currentSubscriptions")}),(0,p.jsx)(G,{children:t.subscriptionCount})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.monthlyRevenue")}),(0,p.jsx)(G,{children:(0,s.vv)(t.monthlyPrice*t.subscriptionCount)})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(X,{children:e("admin:plansPage.createdDate")}),(0,p.jsx)(G,{children:t.createdAt})]})]}),(0,p.jsxs)(Q,{children:[(0,p.jsx)("h4",{children:e("admin:plansPage.features")}),(0,p.jsx)(w,{children:(Array.isArray(t.features)?t.features:[]).map((e,n)=>(0,p.jsx)(A,{children:e},n))})]})]}),Fe&&t&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>we(!1),title:`Set Prices for ${t.displayName}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>we(!1),children:e("admin:plansPage.cancel")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(t)try{const e=(0,c.c4)(),n=t.id.replace("plan-",""),r=Object.entries(Ce).map(e=>{let[n,r]=e;return{currency:n,monthly_price:parseFloat(r.monthly)||0,annual_price:parseFloat(r.annual)||0,is_active:!0}}),a=await fetch(`/api/currencies/plans/${n}/prices`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({prices:r})});if(a.ok)we(!1),Re();else{const e=await a.json();console.error("Failed to update prices:",e.error)}}catch(e){console.error("Error saving plan prices:",e)}},children:e("admin:plansPage.savePrices")})]}),children:[(0,p.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280",fontSize:"14px"},children:"Configure pricing for each supported currency."}),(0,p.jsxs)("div",{style:{display:"grid",gap:"16px"},children:[be.map(e=>{var n,r;const a=fe[e];return(0,p.jsxs)("div",{style:{padding:"16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"#FAFBFC"},children:[(0,p.jsxs)("div",{style:{fontWeight:600,marginBottom:"12px",color:"#0A2540",display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("span",{style:{padding:"4px 8px",background:"#635BFF",color:"white",borderRadius:"4px",fontSize:"12px"},children:(null===a||void 0===a?void 0:a.symbol)||e}),(null===a||void 0===a?void 0:a.name)||e," (",e,")"]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Monthly Price"}),(0,p.jsx)("input",{type:"number",value:(null===(n=Ce[e])||void 0===n?void 0:n.monthly)||"",onChange:n=>Be({...Ce,[e]:{...Ce[e],monthly:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("label",{style:{fontSize:"13px",color:"#6B7280",display:"block",marginBottom:"4px"},children:"Annual Price"}),(0,p.jsx)("input",{type:"number",value:(null===(r=Ce[e])||void 0===r?void 0:r.annual)||"",onChange:n=>Be({...Ce,[e]:{...Ce[e],annual:n.target.value}}),style:{width:"100%",padding:"10px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",boxSizing:"border-box"},placeholder:"0.00"})]})]})]},e)}),0===be.length&&(0,p.jsx)("p",{style:{textAlign:"center",color:"#6B7280",padding:"20px"},children:"No currencies configured. Please add currencies first."})]})]})]})]}),(0,p.jsx)(o.A,{isOpen:ke,title:"Delete Plan",message:"Are you sure you want to delete this plan? This action cannot be undone.",onConfirm:async()=>{if(Ee){Se(!1);try{const e=(0,c.c4)(),n=Ee.replace("plan-",""),r=await fetch(`/api/plans/${n}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(!r.ok){const e=await r.json();throw new Error(e.error||"Failed to delete plan")}ae(!1),Re()}catch(e){console.error("Error deleting plan:",e)}ze(null)}},onCancel:()=>{Se(!1),ze(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,n,r)=>{r.d(n,{A:()=>m});r(9950);var a=r(7119),t=r(4752),i=r(9610),l=r(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=t.Ay.button`
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
`,m=e=>{let{isOpen:n,title:r,message:t,onConfirm:m,onCancel:h,confirmText:g="Confirm",cancelText:x="Cancel",type:y="warning"}=e;return n?a.createPortal((0,l.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,l.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(o,{children:[(0,l.jsx)(d,{children:r}),(0,l.jsx)(c,{children:t})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:h,children:x}),(0,l.jsx)(u,{variant:"primary",type:y,onClick:m,children:g})]})]})}),document.body):null}}}]);