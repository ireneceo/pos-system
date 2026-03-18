"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9327],{2488:(e,t,n)=>{n.d(t,{DO:()=>u,Jt:()=>p,Qn:()=>c});n(9950);var a=n(4752),r=n(4414);const i=a.Ay.div`
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
`,o=a.Ay.input`
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
`,s=a.Ay.div`
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
`,l=a.Ay.button`
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
`,d=a.Ay.select`
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
`,c=e=>{let{children:t,className:n,style:a,...o}=e;return(0,r.jsx)(i,{className:n,style:a,...o,children:t})},u=e=>{let{placeholder:t="Search...",value:n,onChange:a,style:i,...d}=e;return(0,r.jsxs)(s,{style:i,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:a,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,r.jsx)(l,{type:"button",onClick:()=>null===a||void 0===a?void 0:a({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},p=e=>{let{children:t,...n}=e;return(0,r.jsx)(d,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>r});var a=n(4752);const r=a.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,a.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,a.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9327:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var a=n(9950),r=n(4752),i=n(3705),o=n(8409),s=n(2488),l=n(6038),d=n(4414);const c=(0,r.Ay)(o.A0)`
  @media (max-width: 1400px) {
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }
`,u=(0,r.Ay)(o.Hj)`
  @media (max-width: 1400px) {
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }
`,p=r.Ay.div``,x=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,h=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,g=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{const t=e.planType.toLowerCase();return t.includes("basic")?"#DBEAFE":t.includes("professional")?"#E4E7FF":t.includes("enterprise")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.planType.toLowerCase();return t.includes("basic")?"#1E40AF":t.includes("professional")?"#635BFF":t.includes("enterprise")?"#D97706":"#6B7280"}};
`,y=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=r.Ay.div`
  width: 60px;
  height: 60px;
  background: #10B981;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`,v=r.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,w=r.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

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
`,S=r.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,C=()=>{var e;const[t,n]=(0,a.useState)([]),[r,C]=(0,a.useState)(""),[_,B]=(0,a.useState)("all"),[A,T]=(0,a.useState)(!1),[D,k]=(0,a.useState)(!1),[E,M]=(0,a.useState)(""),[R,z]=(0,a.useState)(null),[N,I]=(0,a.useState)(!1),[P,$]=(0,a.useState)(null),[W,O]=(0,a.useState)(!1),[L,U]=(0,a.useState)(null),[V,Y]=(0,a.useState)(!1),[G,J]=(0,a.useState)(null),[q,H]=(0,a.useState)({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+31536e6).toISOString().split("T")[0]}),[K,Q]=(0,a.useState)(""),[X,Z]=(0,a.useState)(!1),[ee,te]=(0,a.useState)({managers:[],restaurants:[]}),[ne,ae]=(0,a.useState)(null),[re,ie]=(0,a.useState)([]),[oe,se]=(0,a.useState)([]),[le,de]=(0,a.useState)([]),[ce,ue]=(0,a.useState)([]),[pe,xe]=(0,a.useState)([]),[he,me]=(0,a.useState)("restaurant");(0,a.useEffect)(()=>{ye(),fe(),ve(),ge()},[]);const ge=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=(await e.json()).filter(e=>e.is_active);xe(t)}}catch(e){console.error("Error fetching plans:",e)}},ye=async()=>{try{const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json"};e&&(t.Authorization=`Bearer ${e}`);const[a,r]=await Promise.all([fetch("/api/restaurants",{headers:t}),fetch("/api/users",{headers:t})]),i=a.ok?await a.json():[],o=r.ok?await r.json():[],s=Array.isArray(i)?i:[],l=Array.isArray(o)?o:o.data||[];de(s);const d=[];s.forEach((e,t)=>{var n,a,r,i,o;const s=e.planType||e.plan_type||"Basic Plan";let l="active";"trial"===e.status?l="trial":"active"===e.status?l="active":"overdue"===e.status?l="expired":"suspended"===e.status||"inactive"===e.status?l="suspended":"cancelled"===e.status&&(l="cancelled"),d.push({id:`sub-rest-${e.id}`,restaurantId:(null===(n=e.id)||void 0===n?void 0:n.toString())||`rest-${t}`,restaurantName:e.name||"Restaurant Name",currency:e.currency||"MYR",managerId:(null===(a=e.managerId||e.admin_id)||void 0===a?void 0:a.toString())||"",managerName:`${(null===(r=e.admin)||void 0===r?void 0:r.username)||e.managerId||""} \u2022 ${(null===(i=e.admin)||void 0===i?void 0:i.email)||e.managerName||e.admin_name||"No Manager Assigned"}`,planType:s,status:l,startDate:e.subscriptionStart||e.subscription_start?new Date(e.subscriptionStart||e.subscription_start).toISOString().split("T")[0]:"",endDate:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:"",monthlyFee:parseFloat(e.planAmount||e.plan_amount)||0,billingCycle:e.billingCycle||e.billing_cycle||"monthly",paymentModel:"restaurant",payerId:(null===(o=e.managerId||e.admin_id)||void 0===o?void 0:o.toString())||"",payerName:e.managerName||e.admin_name||"",menuItemLimit:e.menu_item_limit||50,currentMenuItems:0,features:[],lastPayment:"",nextPayment:e.subscriptionEnd||e.subscription_end?new Date(e.subscriptionEnd||e.subscription_end).toISOString().split("T")[0]:"",autoRenew:void 0===e.auto_renew||e.auto_renew,location:e.address||"",discountType:e.discount_type||"none",discountValue:parseFloat(e.discount_value)||0,discountReason:e.discount_reason||"",entityType:"restaurant",isDemo:e.is_demo||!1,isTest:e.is_test||!1})}),l.filter(e=>["Brand General","Foodcourt General","Restaurant Owner"].includes(e.role)).forEach(e=>{var t,n,a;let r="",i=0,o="monthly",s="MYR",l="active",c="",u="";"Brand General"===e.role?(r=e.brand_plan_type||e.plan_type||"",i=parseFloat(e.brand_plan_amount||e.plan_amount)||0,o=e.brand_billing_cycle||e.billing_cycle||"monthly",s=e.brand_currency||e.currency||"MYR",l=e.brand_subscription_status||e.subscription_status||"active",c=e.brand_subscription_start||e.subscription_start||"",u=e.brand_subscription_end||e.subscription_end||""):"Foodcourt General"===e.role?(r=e.fc_plan_type||e.plan_type||"",i=parseFloat(e.fc_plan_amount||e.plan_amount)||0,o=e.fc_billing_cycle||e.billing_cycle||"monthly",s=e.fc_currency||e.currency||"MYR",l=e.fc_subscription_status||e.subscription_status||"active",c=e.fc_subscription_start||e.subscription_start||"",u=e.fc_subscription_end||e.subscription_end||""):"Restaurant Owner"===e.role&&(r=e.plan_type||"",i=parseFloat(e.plan_amount)||0,o=e.billing_cycle||"monthly",s=e.currency||"MYR",l=e.subscription_status||"active",c=e.subscription_start||"",u=e.subscription_end||""),r&&d.push({id:`sub-user-${e.id}`,restaurantId:null===(t=e.id)||void 0===t?void 0:t.toString(),restaurantName:e.full_name||e.username,currency:s,managerId:null===(n=e.id)||void 0===n?void 0:n.toString(),managerName:`${e.username} \u2022 ${e.email}`,planType:r,status:l||"active",startDate:c?new Date(c).toISOString().split("T")[0]:"",endDate:u?new Date(u).toISOString().split("T")[0]:"",monthlyFee:i,billingCycle:o,paymentModel:"manager",payerId:null===(a=e.id)||void 0===a?void 0:a.toString(),payerName:e.full_name||e.username,menuItemLimit:0,currentMenuItems:0,features:[],lastPayment:"",nextPayment:u?new Date(u).toISOString().split("T")[0]:"",autoRenew:!0,location:e.address||"",discountType:"none",discountValue:0,discountReason:"",entityType:"Brand General"===e.role?"brand":"Foodcourt General"===e.role?"foodcourt":"owner",userRole:e.role,isDemo:e.is_demo||!1,isTest:e.is_test||!1})}),n(d)}catch(e){console.error("\u274c Error fetching subscriptions:",e),n([])}},fe=async()=>{try{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{},n=await fetch("/api/restaurants",{headers:t}),a=await fetch("/api/users?role=Manager",{headers:t});if(n.ok&&a.ok){const e=await n.json(),t=await a.json(),r=Array.isArray(e)?e:e.data||[],i=Array.isArray(t)?t:t.data||[];ie(r),se(i),de(r)}}catch(e){console.error("Error fetching available data:",e)}},ve=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=await e.json(),n=(Array.isArray(t)?t:[]).filter(e=>"custom"===e.category);ue(n)}}catch(e){console.error("Error fetching custom plans:",e)}},[je,be]=(0,a.useState)("all"),Fe=t.filter(e=>{const t=e.restaurantName.toLowerCase().includes(r.toLowerCase())||e.managerName.toLowerCase().includes(r.toLowerCase())||e.location.toLowerCase().includes(r.toLowerCase()),n="all"===_||e.status===_,a=e.entityType||"restaurant";return t&&n&&("all"===je||a===je)}),we=t.length,Se=t.filter(e=>"active"===e.status).length,Ce=t.filter(e=>"trial"===e.status).length,_e=t.filter(e=>"active"===e.status).reduce((e,t)=>e+t.monthlyFee,0),Be=e=>{Q(e),Z(!0);const t=oe.filter(e=>"brand"===he?"Brand Manager"===e.role||"Brand General"===e.role:"foodcourt"===he?"Foodcourt Manager"===e.role||"Foodcourt General"===e.role:"owner"!==he||"Restaurant Owner"===e.role);if(e.length<1)return void te({managers:t.slice(0,10),restaurants:le.slice(0,10)});const n=t.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase())),a=le.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase())||t.address&&t.address.toLowerCase().includes(e.toLowerCase()));te({managers:n.slice(0,10),restaurants:a.slice(0,10)})},Ae=(e,t)=>{ae({type:e,data:t}),Z(!1),Q("manager"===e?t.fullName||t.full_name||t.username:t.name);let n="restaurant";if("manager"===e&&("Restaurant Owner"===t.role?n="restaurant_owner":"Foodcourt Manager"===t.role||"Foodcourt General"===t.role?n="foodcourt_manager":"Brand Manager"!==t.role&&"Brand General"!==t.role||(n="brand_manager")),"manager"===e){var a;H({...q,managerId:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",managerName:t.fullName||t.full_name||t.username||"",restaurantId:"",restaurantName:"",paymentModel:n})}else{var r,i;const e=t,n=oe.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});H({...q,restaurantId:(null===(r=e.id)||void 0===r?void 0:r.toString())||"",restaurantName:e.name||"",managerId:(null===(i=e.admin_id)||void 0===i?void 0:i.toString())||"",managerName:n?n.fullName||n.full_name||n.username:"No Manager Assigned",email:e.email||"",phone:e.phone||"",address:e.address||"",paymentModel:"restaurant"})}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(o.mc,{children:[(0,d.jsxs)(o.Y9,{children:[(0,d.jsx)(o.hE,{children:"Subscriptions"}),(0,d.jsxs)(o.ex,{children:[(0,d.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const t=Object.keys(e[0]);return[t.join(","),...e.map(e=>t.map(t=>{const n=e[t];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(Fe.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.managerName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":`RM ${e.monthlyFee}`,"Next Payment":e.nextPayment||"N/A",Location:e.location,Manager:e.managerName}))),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`subscriptions-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(n)},children:"Export"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=pe.filter(e=>e.plan_target===he),t=e.length>0?e[0]:null;H({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:t?t.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant"===he?"restaurant":"owner"===he?"restaurant_owner":"brand"===he?"brand_manager":"foodcourt_manager",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:t?(0,l.jL)(t,"MYR"):49,startDate:(new Date).toISOString().split("T")[0],endDate:""}),ae(null),Q(""),T(!0)},children:"Add Subscription"})]})]}),(0,d.jsxs)(o.UC,{children:[(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{color:"#059669",children:[(0,d.jsx)(o.Os,{children:we}),(0,d.jsx)(o.v0,{children:"Total Subscriptions"}),(0,d.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,d.jsxs)(o.hI,{color:"#2563EB",children:[(0,d.jsx)(o.Os,{children:Se}),(0,d.jsx)(o.v0,{children:"Active Subscriptions"}),(0,d.jsxs)(o.d1,{children:[we>0?Math.round(Se/we*100):0,"% operational"]})]}),(0,d.jsxs)(o.hI,{color:"#7C3AED",children:[(0,d.jsx)(o.Os,{children:Ce}),(0,d.jsx)(o.v0,{children:"Trial Subscriptions"}),(0,d.jsx)(o.d1,{children:"Currently evaluating"})]}),(0,d.jsxs)(o.hI,{color:"#D97706",children:[(0,d.jsxs)(o.Os,{children:["RM ",_e.toLocaleString()]}),(0,d.jsx)(o.v0,{children:"Monthly Revenue"}),(0,d.jsx)(o.d1,{children:"From active subscriptions"})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsxs)(s.Jt,{value:_,onChange:e=>B(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,d.jsxs)(s.Jt,{value:je,onChange:e=>be(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Types"}),(0,d.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,d.jsx)("option",{value:"brand",children:"Brand General"}),(0,d.jsx)("option",{value:"foodcourt",children:"Foodcourt General"}),(0,d.jsx)("option",{value:"owner",children:"Restaurant Owner"})]}),(0,d.jsx)(s.DO,{placeholder:"Search subscriptions...",value:r,onChange:e=>C(e.target.value)})]}),(0,d.jsxs)(o.XI,{children:[(0,d.jsxs)(c,{columns:"2.5fr 1.3fr 0.8fr 1fr 1fr 0.8fr 0.8fr 200px",children:[(0,d.jsx)("span",{className:"col-info",children:"Subscriber"}),(0,d.jsx)("span",{children:"Plan"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Menu Items"}),(0,d.jsx)("span",{className:"col-fee",children:"Monthly Fee"}),(0,d.jsx)("span",{children:"Expires In"}),(0,d.jsx)("span",{children:"Auto-Renew"}),(0,d.jsx)("span",{className:"col-action",children:"Actions"})]}),Fe.map(e=>(0,d.jsxs)(u,{columns:"2.5fr 1.3fr 0.8fr 1fr 1fr 0.8fr 0.8fr 200px",children:[(0,d.jsxs)(o.Np,{children:[(0,d.jsxs)(o.Uj,{className:"col-info",children:[(0,d.jsx)(o.PM,{children:"Subscriber"}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(x,{children:[e.restaurantName,e.isDemo&&(0,d.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"DEMO"}),e.isTest&&(0,d.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"TEST"}),e.currency&&(0,d.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency}),e.entityType&&"restaurant"!==e.entityType&&(0,d.jsx)("span",{style:{fontSize:"10px",fontWeight:600,padding:"1px 6px",borderRadius:"4px",marginLeft:"4px",verticalAlign:"middle",color:"brand"===e.entityType?"#7C3AED":"foodcourt"===e.entityType?"#059669":"#D97706",background:"brand"===e.entityType?"#EDE9FE":"foodcourt"===e.entityType?"#D1FAE5":"#FEF3C7"},children:"brand"===e.entityType?"Brand":"foodcourt"===e.entityType?"Foodcourt":"Owner"})]}),(0,d.jsxs)(h,{children:[e.userRole||e.managerName,e.location?` \u2022 ${e.location}`:""]})]})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Plan"}),(0,d.jsx)(g,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Status"}),(0,d.jsx)(m,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,d.jsxs)(o.Uj,{className:"col-fee",children:[(0,d.jsx)(o.PM,{children:"Monthly Fee"}),"none"!==e.discountType&&e.discountValue>0?(0,d.jsxs)("div",{children:[(0,d.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px"},children:["RM ",e.monthlyFee]}),(0,d.jsxs)("div",{style:{color:"#15803D",fontWeight:"600"},children:["RM ",("percentage"===e.discountType?e.monthlyFee*(1-e.discountValue/100):Math.max(0,e.monthlyFee-e.discountValue)).toFixed(2)]})]}):(0,d.jsxs)(d.Fragment,{children:["RM ",e.monthlyFee]})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Expires In"}),(()=>{const t=new Date,n=new Date(e.endDate).getTime()-t.getTime(),a=Math.ceil(n/864e5);return a<0?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===a?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):a<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[a," days"]}):a<=30?(0,d.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[a," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[a," days"]})})()]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Auto-Renew"}),e.autoRenew?(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,d.jsxs)(o.wr,{children:[(0,d.jsx)(o.rA,{onClick:()=>{J(e),Y(!0)},children:"View"}),(0,d.jsx)(o.rA,{onClick:()=>(e=>{U(e),O(!0)})(e),children:"Edit"}),(0,d.jsx)(o.K0,{onClick:()=>(e=>{z(e),$("active"===e.status?"suspend":"activate"),I(!0)})(e),title:"active"===e.status?"Suspend":"suspended"===e.status||"overdue"===e.status?"Restore Subscription":"Activate",children:(0,d.jsx)(y,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,d.jsx)(o.K0,{onClick:()=>(e=>{z(e),$("delete"),I(!0)})(e),title:"Delete Subscription",children:(0,d.jsx)(y,{children:"\u2715"})})]})]},e.id))]}),A&&(0,d.jsx)(o.aF,{isOpen:!0,onClose:()=>T(!1),title:"Add Subscription",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>T(!1),children:"Cancel"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{var e,t;if(!ne)return void alert("Please select a manager or restaurant");const n={restaurantId:q.restaurantId,restaurantName:q.restaurantName,managerId:q.managerId,managerName:q.managerName,planType:q.customPlanName||"Custom Plan",monthlyFee:q.monthlyFee,billingCycle:q.billingCycle,startDate:q.startDate,endDate:q.endDate,status:q.status,autoRenew:q.autoRenew,paymentModel:q.paymentModel},a=q.customPlanName||"Custom Plan",r=new Date(new Date(q.startDate).getTime()+12096e5).toISOString().split("T")[0],i="restaurant"===ne.type?"restaurant":"Restaurant Owner"===ne.data.role?"restaurant_owner":null!==(e=ne.data.role)&&void 0!==e&&e.includes("Foodcourt")?"foodcourt_manager":null!==(t=ne.data.role)&&void 0!==t&&t.includes("Brand")?"brand_manager":"restaurant",o={invoice_data:{restaurant_id:"restaurant"===ne.type?ne.data.id:null,due_date:r,total_amount:q.monthlyFee,currency:"MYR",status:"pending_payment",type:"manual",issuer_type:"system_admin",issuer_id:null,payer_type:i,payer_id:"manager"===ne.type?ne.data.id:ne.data.admin_id||null,invoice_category:"subscription",category_display_name:`Subscription - ${a}`,billing_period_start:q.startDate,billing_period_end:q.endDate||r,notes:`POS Subscription: ${a} (${q.billingCycle})`},items:[{item_type:"subscription",description:`${a} - ${"annual"===q.billingCycle?"Annual":"Monthly"} Subscription`,calculation_method:"fixed",fixed_amount:q.monthlyFee,calculated_amount:q.monthlyFee,tax_rate:0,tax_amount:0,total_amount:q.monthlyFee}]},s=localStorage.getItem("auth_token"),l={"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}};if("restaurant"===ne.type&&ne.data.id){const e={plan_type:q.customPlanName||"Custom Plan",plan_amount:q.monthlyFee,billing_cycle:q.billingCycle,subscription_start:q.startDate,subscription_end:q.endDate,status:q.status,auto_renew:q.autoRenew};if(!(await fetch(`/api/restaurants/${ne.data.id}`,{method:"PUT",headers:l,body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription")}else if("manager"===ne.type&&ne.data.id){const e=ne.data.role||"",t={plan_type:q.planType||q.customPlanName||"Custom Plan",plan_amount:parseFloat(String(q.monthlyFee))||0,billing_cycle:q.billingCycle||"monthly",currency:q.currency||"MYR",subscription_status:"trial"===q.status?"trial":"active",subscription_start:q.startDate,subscription_end:q.endDate};if("Brand General"===e||"Brand Manager"===e){const e=ne.data.brand_id;if(e){if(!(await fetch(`/api/brands/${e}/subscription`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update brand subscription")}}else if("Foodcourt General"===e||"Foodcourt Manager"===e){const e=ne.data.foodcourt_id;if(e){if(!(await fetch(`/api/foodcourts/${e}/subscription`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update foodcourt subscription")}}else if("Restaurant Owner"===e){if(!(await fetch(`/api/users/${ne.data.id}`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update owner subscription")}}const d=localStorage.getItem("auth_token"),c=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify(o)});if(!c.ok){const e=await c.json().catch(()=>({error:"Unknown error"}));throw new Error(e.error||"Failed to create invoice")}console.log("Subscription and invoice created:",n),T(!1),M("Subscription added and invoice generated successfully!"),k(!0),await ye()}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}},children:"Add Subscription"})]}),children:(0,d.jsxs)(j,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"User Type *"}),(0,d.jsxs)(s.Jt,{value:he,onChange:e=>{const t=e.target.value;me(t),ae(null),Q("");const n=pe.filter(e=>e.plan_target===t),a=n.length>0?n[0]:null;a&&H(e=>({...e,planType:a.display_name,monthlyFee:parseFloat(a.base_price_monthly),paymentModel:"restaurant"===t?"restaurant":"owner"===t?"restaurant_owner":"brand"===t?"brand_manager":"foodcourt_manager"}))},children:[(0,d.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,d.jsx)("option",{value:"owner",children:"Restaurant Owner"}),(0,d.jsx)("option",{value:"brand",children:"Brand Manager"}),(0,d.jsx)("option",{value:"foodcourt",children:"Foodcourt Manager"})]})]}),(0,d.jsxs)(b,{style:{position:"relative",zIndex:100},children:[(0,d.jsx)(F,{children:"restaurant"===he?"Search Restaurant *":"owner"===he?"Search Owner *":"Search Manager *"}),(0,d.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,d.jsx)(w,{type:"text",value:K,onChange:e=>Be(e.target.value),onFocus:()=>{Z(!0),K.length<1&&Be("")},onBlur:()=>setTimeout(()=>Z(!1),200),placeholder:"restaurant"===he?"Click to search restaurants...":"owner"===he?"Click to search owners...":"Click to search managers...",required:!0}),X&&(0,d.jsxs)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:9999,boxShadow:"0 8px 16px rgba(0, 0, 0, 0.15)"},children:["restaurant"!==he&&ee.managers.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"owner"===he?"OWNERS":"MANAGERS"}),ee.managers.map(e=>(0,d.jsxs)("div",{onClick:()=>Ae("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName||e.full_name||e.username}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email})]},e.id))]}),"restaurant"===he&&ee.restaurants.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),ee.restaurants.map(e=>{const t=oe.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});return(0,d.jsxs)("div",{onClick:()=>Ae("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:"No Admin",t?` \u2022 Manager: ${t.fullName||t.full_name||t.username}`:""]})]},e.id)})]})]})]}),ne&&(0,d.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ne.type?ne.data.fullName||ne.data.full_name||ne.data.username:ne.data.name}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ne.type?"Manager":`${ne.data.admin?`Admin: ${ne.data.admin.name}`:"No Admin"} \u2022 ${ne.data.address||"No address"}`})]}),(0,d.jsx)("button",{onClick:()=>{ae(null),Q("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Subscription Plan *"}),(0,d.jsxs)(S,{value:q.customPlanName||"",onChange:e=>{const t=e.target.value;if("others"===t)H({...q,planType:"custom",customPlanName:"others",monthlyFee:0});else if(t){var n;const e=pe.find(e=>e.display_name===t);H({...q,planType:"custom",customPlanName:t,monthlyFee:e?(0,l.jL)(e,(0,l.Wh)((null===ne||void 0===ne||null===(n=ne.data)||void 0===n?void 0:n.currency)||"MYR")):0})}else H({...q,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),pe.filter(e=>e.plan_target===he).map(e=>{var t;return(0,d.jsxs)("option",{value:e.display_name,children:[e.display_name," - ",(0,l.m9)(e,(0,l.Wh)((null===ne||void 0===ne||null===(t=ne.data)||void 0===t?void 0:t.currency)||"MYR"))]},e.id)}),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===q.customPlanName&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Custom Plan Name *"}),(0,d.jsx)(w,{type:"text",value:"",onChange:e=>H({...q,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Monthly Fee (RM) *"}),(0,d.jsx)(w,{type:"number",step:"0.01",min:"0",value:q.monthlyFee,onChange:e=>H({...q,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,d.jsx)(b,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===q.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===q.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:"trial"===q.status,onChange:e=>{if(e.target.checked){const e=new Date,t=new Date;t.setDate(t.getDate()+7),H({...q,status:"trial",startDate:e.toISOString().split("T")[0],endDate:t.toISOString().split("T")[0],monthlyFee:0})}else H({...q,status:"active",monthlyFee:29})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"Subscription will start with a 7-day free trial period"})]})]})}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Billing Cycle *"}),(0,d.jsxs)(S,{value:q.billingCycle||"monthly",onChange:e=>{var t;const n=e.target.value,a=pe.find(e=>e.display_name===q.customPlanName),r=(0,l.Wh)((null===ne||void 0===ne||null===(t=ne.data)||void 0===t?void 0:t.currency)||"MYR"),i=a?(0,l.jL)(a,r,n):q.monthlyFee;H({...q,billingCycle:n,monthlyFee:i})},children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Subscription Start Date *"}),(0,d.jsx)(w,{type:"date",value:q.startDate,onChange:e=>H({...q,startDate:e.target.value})})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Subscription End Date *"}),(0,d.jsx)(w,{type:"date",value:q.endDate,onChange:e=>H({...q,endDate:e.target.value})})]}),(0,d.jsx)(b,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:q.autoRenew||!1,onChange:e=>H({...q,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,d.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,d.jsx)("strong",{children:"Summary:"})}),(0,d.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:["custom"===q.planType?q.customPlanName||"Custom Plan":"basic"===q.planType?"Basic":"professional"===q.planType?"Professional":"Enterprise"," Plan - ",(0,l.vv)(q.monthlyFee||29,(0,l.Wh)((null===ne||void 0===ne||null===(e=ne.data)||void 0===e?void 0:e.currency)||"MYR"))," (",q.billingCycle||"monthly",")"]}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",ne?"restaurant"===ne.type?`${ne.data.name} (Restaurant Admin)`:(()=>{const e="Foodcourt Manager"===ne.data.role?"Foodcourt Manager":"Foodcourt General"===ne.data.role?"Foodcourt General Manager":"Brand Manager"===ne.data.role?"Brand Manager":"Brand General"===ne.data.role?"Brand General Manager":"Manager";return`${ne.data.fullName||ne.data.full_name||ne.data.username} (${e})`})():"Not selected"]})]})]})}),D&&(0,d.jsx)(o.aF,{isOpen:!0,onClose:()=>k(!1),title:"Success!",size:"small",footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>k(!1),children:"OK"})}),children:(0,d.jsxs)("div",{style:{textAlign:"center"},children:[(0,d.jsx)(f,{children:"\u2713"}),(0,d.jsx)(v,{children:E})]})}),W&&L&&(0,d.jsx)(o.aF,{isOpen:!0,onClose:()=>O(!1),title:"Edit Custom Subscription",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>O(!1),children:"Cancel"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(L)try{console.log("\ud83d\udd04 Updating subscription:",L);const e=L.planType||"Custom Plan",t={name:L.restaurantName,managerId:L.managerId||null,planType:e,plan_type:e,planAmount:L.monthlyFee,plan_amount:L.monthlyFee,status:"active"===L.status?"active":"inactive",subscriptionStart:L.startDate,subscriptionEnd:L.endDate,subscription_start:L.startDate,subscription_end:L.endDate,discount_type:L.discountType||"none",discount_value:L.discountValue||0,discount_reason:L.discountReason||null};console.log("\ud83d\udce4 Sending update data:",t);const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},a=L.entityType;let r=`/api/restaurants/${L.restaurantId}`,i=t;"brand"!==a&&"foodcourt"!==a&&"owner"!==a||(r=`/api/users/${L.restaurantId}`,i={plan_type:e,plan_amount:L.monthlyFee,billing_cycle:L.billingCycle||"monthly",currency:L.currency||"MYR",subscription_start:L.startDate,subscription_end:L.endDate,subscription_status:L.status});const o=await fetch(r,{method:"PUT",headers:n,body:JSON.stringify(i)});if(console.log("\ud83d\udce1 Subscription update API response status:",o.status),o.ok){const e=await o.json();console.log("\u2705 Subscription updated successfully:",e),O(!1),U(null),console.log("\ud83d\udd04 Re-fetching subscription data..."),await ye(),M("Subscription updated successfully!"),k(!0),console.log("\u2705 Modal closed and data refreshed")}else{const e=await o.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update subscription:",e),alert(`Error updating subscription: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating subscription:",e),alert("Error updating subscription. Please check your connection and try again.")}},children:"Update Subscription"})]}),children:(0,d.jsxs)(j,{children:[(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Restaurant *"}),(0,d.jsx)(w,{type:"text",value:L.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Subscription Plan *"}),(0,d.jsxs)(S,{value:L.planType,onChange:e=>{const t=e.target.value;if("others"===t)U({...L,planType:"custom",monthlyFee:0});else if(t){const e=pe.find(e=>e.display_name===t);if(e){const n=(0,l.Wh)(L.currency||"MYR");U({...L,planType:t,monthlyFee:(0,l.jL)(e,n)})}}},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),pe.filter(e=>"restaurant"===e.plan_target).map(e=>{const t=(0,l.Wh)(L.currency||"MYR"),n=e.display_name===L.planType,a=L.monthlyFee,r=(0,l.jL)(e,t),i=n&&a!==r;return(0,d.jsxs)("option",{value:e.display_name,children:[e.display_name," - ",(0,l.m9)(e,t),i?` (current: ${a})`:""]},e.id)}),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===L.planType&&(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Custom Plan Name *"}),(0,d.jsx)(w,{type:"text",value:"",onChange:e=>U({...L,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(F,{children:["Monthly Fee (",L.currency||"MYR",") *"]}),(0,d.jsx)(w,{type:"number",step:"0.01",min:"0",value:L.monthlyFee,onChange:e=>U({...L,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Status *"}),(0,d.jsxs)(S,{value:L.status,onChange:e=>U({...L,status:e.target.value}),children:[(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Billing Cycle *"}),(0,d.jsxs)(S,{value:L.billingCycle||"monthly",onChange:e=>U({...L,billingCycle:e.target.value}),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Subscription Start Date *"}),(0,d.jsx)(w,{type:"date",value:L.startDate,onChange:e=>U({...L,startDate:e.target.value})})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Subscription End Date *"}),(0,d.jsx)(w,{type:"date",value:L.endDate,onChange:e=>U({...L,endDate:e.target.value})})]}),(0,d.jsx)(b,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:L.autoRenew||!1,onChange:e=>U({...L,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Discount"})}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"Discount Type"}),(0,d.jsxs)(S,{value:L.discountType||"none",onChange:e=>U({...L,discountType:e.target.value,discountValue:"none"===e.target.value?0:L.discountValue}),children:[(0,d.jsx)("option",{value:"none",children:"None"}),(0,d.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),"none"!==L.discountType&&(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:"percentage"===L.discountType?"Discount Rate (%)":"Discount Amount (RM)"}),(0,d.jsx)(w,{type:"number",step:"percentage"===L.discountType?"1":"0.01",min:"0",max:"percentage"===L.discountType?"100":void 0,value:L.discountValue,onChange:e=>U({...L,discountValue:parseFloat(e.target.value)||0}),placeholder:"percentage"===L.discountType?"e.g. 10":"e.g. 50.00"})]}),"none"!==L.discountType&&(0,d.jsxs)(b,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(F,{children:"Discount Reason"}),(0,d.jsx)(w,{type:"text",value:L.discountReason||"",onChange:e=>U({...L,discountReason:e.target.value}),placeholder:"e.g. Opening promotion, Loyalty discount"})]}),"none"!==L.discountType&&L.discountValue>0&&(0,d.jsxs)("div",{style:{gridColumn:"1 / -1",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Discount Preview"}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#15803D"},children:["Monthly Fee: RM ",L.monthlyFee.toFixed(2)," \u2192"," ",(0,d.jsxs)("strong",{children:["RM ",("percentage"===L.discountType?L.monthlyFee*(1-L.discountValue/100):Math.max(0,L.monthlyFee-L.discountValue)).toFixed(2)]})," ","(-","percentage"===L.discountType?`${L.discountValue}%`:`RM ${L.discountValue.toFixed(2)}`,")"]})]})]})}),V&&G&&(0,d.jsx)(o.aF,{isOpen:!0,onClose:()=>Y(!1),title:"Subscription Details",footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>Y(!1),children:"Close"})}),children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.restaurantName})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Manager"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.managerName})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.location})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.planType.charAt(0).toUpperCase()+G.planType.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,d.jsx)("div",{children:(0,d.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===G.status?"#DCFCE7":"#FEF3C7",color:"active"===G.status?"#15803D":"#92400E"},children:G.status.charAt(0).toUpperCase()+G.status.slice(1)})})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),"none"!==G.discountType&&G.discountValue>0?(0,d.jsxs)("div",{children:[(0,d.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:["RM ",G.monthlyFee]}),(0,d.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:["RM ",("percentage"===G.discountType?G.monthlyFee*(1-G.discountValue/100):Math.max(0,G.monthlyFee-G.discountValue)).toFixed(2),(0,d.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===G.discountType?`${G.discountValue}%`:`RM ${G.discountValue}`,")"]})]})]}):(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:["RM ",G.monthlyFee]})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.billingCycle.charAt(0).toUpperCase()+G.billingCycle.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.autoRenew?(0,d.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,d.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),"none"!==G.discountType&&G.discountValue>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Discount"}),(0,d.jsxs)("div",{style:{background:"#F0FDF4",padding:"16px",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Type"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===G.discountType?"Percentage":"Fixed Amount"})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Value"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===G.discountType?`${G.discountValue}%`:`RM ${G.discountValue.toFixed(2)}`})]}),G.discountReason&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Reason"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:G.discountReason})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.startDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.endDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Next Payment"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:G.nextPayment})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,t=new Date(G.endDate).getTime()-e.getTime(),n=Math.ceil(t/864e5);return n<0?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===n?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):n<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B"},children:[n," days"]}):n<=30?(0,d.jsxs)("span",{style:{color:"#10B981"},children:[n," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[n," days"]})})()})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[G.currentMenuItems," / ",-1===G.menuItemLimit?"\u221e":G.menuItemLimit]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Payment Model"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"restaurant"===G.paymentModel?"Restaurant Admin":"Manager"})]})]})]})]})}),N&&(0,d.jsx)(o.aF,{isOpen:!0,onClose:()=>I(!1),title:"Confirm Action",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>I(!1),children:"Cancel"}),(0,d.jsxs)(i.cc,{variant:"delete"===P?"danger":"primary",onClick:async()=>{if(R&&P){try{const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}};if("delete"===P){console.log("Deleting subscription:",R.id,"restaurantId:",R.restaurantId);const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"DELETE",headers:t});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to delete subscription")}M("Subscription deleted successfully")}else if("suspend"===P){const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"suspended"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to suspend subscription")}M("Subscription suspended successfully")}else if("activate"===P){const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"active"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to activate subscription")}M("Subscription activated successfully")}k(!0),await ye()}catch(e){console.error("Action failed:",e),alert(`Action failed: ${e.message||"Unknown error"}. Please try again.`)}I(!1),z(null),$(null)}},children:[" ","delete"===P?"Delete":"suspend"===P?"Suspend":"Activate"," "]})]}),children:(0,d.jsxs)("p",{children:["delete"===P&&`Are you sure you want to delete subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`,"suspend"===P&&`Are you sure you want to suspend subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`,"activate"===P&&`Are you sure you want to activate subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`]})})]})]})})}}}]);