"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9327],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>u,Qn:()=>c});n(9950);var a=n(4752),r=n(4414);const i=a.Ay.div`
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
`,c=e=>{let{children:t,className:n,style:a,...o}=e;return(0,r.jsx)(i,{className:n,style:a,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:a,style:i,...d}=e;return(0,r.jsxs)(s,{style:i,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:a,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,r.jsx)(l,{type:"button",onClick:()=>null===a||void 0===a?void 0:a({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:t,...n}=e;return(0,r.jsx)(d,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>r});var a=n(4752);const r=a.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`},9327:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var a=n(9950),r=n(4752),i=n(3705),o=n(8409),s=n(2488),l=n(4414);const d=(0,r.Ay)(o.A0)`
  align-items: center;

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
`,c=(0,r.Ay)(o.Hj)`
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
`,p=r.Ay.div``,u=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,x=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,h=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,m=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{const t=e.planType.toLowerCase();return t.includes("basic")?"#DBEAFE":t.includes("professional")?"#E4E7FF":t.includes("enterprise")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.planType.toLowerCase();return t.includes("basic")?"#1E40AF":t.includes("professional")?"#6366F1":t.includes("enterprise")?"#D97706":"#6B7280"}};
`,g=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,y=r.Ay.div`
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
`,j=r.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,f=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,v=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=r.Ay.label`
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
`,F=r.Ay.select`
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
`,S=()=>{const[e,t]=(0,a.useState)([]),[n,r]=(0,a.useState)(""),[S,C]=(0,a.useState)("active"),[B,A]=(0,a.useState)(!1),[_,k]=(0,a.useState)(!1),[D,T]=(0,a.useState)(""),[E,M]=(0,a.useState)(null),[z,R]=(0,a.useState)(!1),[N,I]=(0,a.useState)(null),[P,$]=(0,a.useState)(!1),[O,W]=(0,a.useState)(null),[L,U]=(0,a.useState)(!1),[V,G]=(0,a.useState)(null),[J,Y]=(0,a.useState)({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+31536e6).toISOString().split("T")[0]}),[q,H]=(0,a.useState)(""),[K,Q]=(0,a.useState)(!1),[X,Z]=(0,a.useState)({managers:[],restaurants:[]}),[ee,te]=(0,a.useState)(null),[ne,ae]=(0,a.useState)([]),[re,ie]=(0,a.useState)([]),[oe,se]=(0,a.useState)([]),[le,de]=(0,a.useState)([]),[ce,pe]=(0,a.useState)([]),[ue,xe]=(0,a.useState)("restaurant");(0,a.useEffect)(()=>{me(),ge(),ye(),he()},[]);const he=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=(await e.json()).filter(e=>e.is_active);pe(t)}}catch(e){console.error("Error fetching plans:",e)}},me=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API...");const e=await fetch("/api/restaurants");if(!e.ok)throw new Error("Failed to fetch restaurants");const n=await e.json(),a=(Array.isArray(n)?n:[]).map((e,t)=>{var n,a,r;const i=e.plan_type||"Basic Plan";let o="active";"active"===e.status?o="active":"inactive"===e.status?o="suspended":"cancelled"===e.status&&(o="cancelled");const s=i.toLowerCase(),l={basic:50,professional:200,enterprise:-1},d=Object.keys(l).find(e=>s.includes(e))||"";return{id:`sub-${e.id}`,restaurantId:(null===(n=e.id)||void 0===n?void 0:n.toString())||`rest-${t}`,restaurantName:e.name||"Restaurant Name",currency:e.currency||"RM",managerId:(null===(a=e.managerId||e.admin_id)||void 0===a?void 0:a.toString())||"",managerName:e.managerName||e.admin_name||"No Manager Assigned",planType:i,status:o,startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"2024-01-01",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+31536e6).toISOString().split("T")[0],monthlyFee:parseFloat(e.plan_amount)||29,billingCycle:"monthly",paymentModel:"manager",payerId:(null===(r=e.managerId||e.admin_id)||void 0===r?void 0:r.toString())||"",payerName:e.managerName||e.admin_name||"No Manager",menuItemLimit:l[d]||50,currentMenuItems:Math.floor(Math.random()*((l[d]||50)>0?.7*(l[d]||50):150))+10,features:[],lastPayment:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:void 0!==e.auto_renew?e.auto_renew:"active"===o,location:e.address||"Location not specified",discountType:e.discount_type||"none",discountValue:parseFloat(e.discount_value)||0,discountReason:e.discount_reason||""}});t(a)}catch(e){console.error("\u274c Error fetching subscriptions:",e),t([])}},ge=async()=>{try{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{},n=await fetch("/api/restaurants",{headers:t}),a=await fetch("/api/users?role=Manager",{headers:t});if(n.ok&&a.ok){const e=await n.json(),t=await a.json(),r=Array.isArray(e)?e:e.data||[],i=Array.isArray(t)?t:t.data||[];ae(r),ie(i),se(r)}}catch(e){console.error("Error fetching available data:",e)}},ye=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=await e.json(),n=(Array.isArray(t)?t:[]).filter(e=>"custom"===e.category);de(n)}}catch(e){console.error("Error fetching custom plans:",e)}},je=e.filter(e=>{const t=e.restaurantName.toLowerCase().includes(n.toLowerCase())||e.managerName.toLowerCase().includes(n.toLowerCase())||e.location.toLowerCase().includes(n.toLowerCase()),a="all"===S||e.status===S;return t&&a}),fe=e.length,ve=e.filter(e=>"active"===e.status).length,be=e.filter(e=>"trial"===e.status).length,we=e.filter(e=>"active"===e.status).reduce((e,t)=>e+t.monthlyFee,0),Fe=e=>{H(e),Q(!0);const t=re.filter(e=>"brand"===ue?"Brand Manager"===e.role||"Brand General"===e.role:"foodcourt"===ue?"Foodcourt Manager"===e.role||"Foodcourt General"===e.role:"owner"!==ue||"Restaurant Owner"===e.role);if(e.length<1)return void Z({managers:t.slice(0,10),restaurants:oe.slice(0,10)});const n=t.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase())),a=oe.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase())||t.address&&t.address.toLowerCase().includes(e.toLowerCase()));Z({managers:n.slice(0,10),restaurants:a.slice(0,10)})},Se=(e,t)=>{te({type:e,data:t}),Q(!1),H("manager"===e?t.fullName||t.full_name||t.username:t.name);let n="restaurant";if("manager"===e&&("Restaurant Owner"===t.role?n="restaurant_owner":"Foodcourt Manager"===t.role||"Foodcourt General"===t.role?n="foodcourt_manager":"Brand Manager"!==t.role&&"Brand General"!==t.role||(n="brand_manager")),"manager"===e){var a;Y({...J,managerId:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",managerName:t.fullName||t.full_name||t.username||"",restaurantId:"",restaurantName:"",paymentModel:n})}else{var r,i;const e=t,n=re.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});Y({...J,restaurantId:(null===(r=e.id)||void 0===r?void 0:r.toString())||"",restaurantName:e.name||"",managerId:(null===(i=e.admin_id)||void 0===i?void 0:i.toString())||"",managerName:n?n.fullName||n.full_name||n.username:"No Manager Assigned",email:e.email||"",phone:e.phone||"",address:e.address||"",paymentModel:"restaurant"})}};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(o.mc,{children:[(0,l.jsxs)(o.Y9,{children:[(0,l.jsx)(o.hE,{children:"Subscriptions"}),(0,l.jsxs)(o.ex,{children:[(0,l.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const t=Object.keys(e[0]);return[t.join(","),...e.map(e=>t.map(t=>{const n=e[t];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(je.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.managerName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":`RM ${e.monthlyFee}`,"Next Payment":e.nextPayment||"N/A",Location:e.location,Manager:e.managerName}))),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`subscriptions-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(n)},children:"Export"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=ce.filter(e=>e.plan_target===ue),t=e.length>0?e[0]:null;Y({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:t?t.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant"===ue?"restaurant":"owner"===ue?"restaurant_owner":"brand"===ue?"brand_manager":"foodcourt_manager",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:t?parseFloat(t.base_price_monthly):29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),te(null),H(""),A(!0)},children:"Add Subscription"})]})]}),(0,l.jsxs)(o.UC,{children:[(0,l.jsxs)(o.MD,{children:[(0,l.jsxs)(o.hI,{color:"#059669",children:[(0,l.jsx)(o.Os,{children:fe}),(0,l.jsx)(o.v0,{children:"Total Subscriptions"}),(0,l.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,l.jsxs)(o.hI,{color:"#2563EB",children:[(0,l.jsx)(o.Os,{children:ve}),(0,l.jsx)(o.v0,{children:"Active Subscriptions"}),(0,l.jsxs)(o.d1,{children:[fe>0?Math.round(ve/fe*100):0,"% operational"]})]}),(0,l.jsxs)(o.hI,{color:"#7C3AED",children:[(0,l.jsx)(o.Os,{children:be}),(0,l.jsx)(o.v0,{children:"Trial Subscriptions"}),(0,l.jsx)(o.d1,{children:"Currently evaluating"})]}),(0,l.jsxs)(o.hI,{color:"#D97706",children:[(0,l.jsxs)(o.Os,{children:["RM ",we.toLocaleString()]}),(0,l.jsx)(o.v0,{children:"Monthly Revenue"}),(0,l.jsx)(o.d1,{children:"From active subscriptions"})]})]}),(0,l.jsxs)(s.Qn,{children:[(0,l.jsxs)(s.Jt,{value:S,onChange:e=>C(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"trial",children:"Trial"}),(0,l.jsx)("option",{value:"expired",children:"Expired"}),(0,l.jsx)("option",{value:"suspended",children:"Suspended"}),(0,l.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,l.jsx)(s.DO,{placeholder:"Search subscriptions...",value:n,onChange:e=>r(e.target.value)})]}),(0,l.jsxs)(o.XI,{children:[(0,l.jsxs)(d,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,l.jsx)("span",{children:"Restaurant Info"}),(0,l.jsx)("span",{children:"Plan"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Menu Items"}),(0,l.jsx)("span",{children:"Monthly Fee"}),(0,l.jsx)("span",{children:"Expires In"}),(0,l.jsx)("span",{children:"Auto-Renew"}),(0,l.jsx)("span",{children:"Actions"})]}),je.map(e=>(0,l.jsxs)(c,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,l.jsxs)(o.Np,{children:[(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Restaurant Info"}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(u,{children:[e.restaurantName," ",e.currency&&(0,l.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency})]}),(0,l.jsxs)(x,{children:[e.managerName," \u2022 ",e.location]})]})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Plan"}),(0,l.jsx)(m,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Status"}),(0,l.jsx)(h,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Monthly Fee"}),"none"!==e.discountType&&e.discountValue>0?(0,l.jsxs)("div",{children:[(0,l.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px"},children:["RM ",e.monthlyFee]}),(0,l.jsxs)("div",{style:{color:"#15803D",fontWeight:"600"},children:["RM ",("percentage"===e.discountType?e.monthlyFee*(1-e.discountValue/100):Math.max(0,e.monthlyFee-e.discountValue)).toFixed(2)]})]}):(0,l.jsxs)(l.Fragment,{children:["RM ",e.monthlyFee]})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Expires In"}),(()=>{const t=new Date,n=new Date(e.endDate).getTime()-t.getTime(),a=Math.ceil(n/864e5);return a<0?(0,l.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===a?(0,l.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):a<=7?(0,l.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[a," days"]}):a<=30?(0,l.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[a," days"]}):(0,l.jsxs)("span",{style:{color:"#6B7280"},children:[a," days"]})})()]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Auto-Renew"}),e.autoRenew?(0,l.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,l.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,l.jsxs)(o.wr,{children:[(0,l.jsx)(o.rA,{onClick:()=>{G(e),U(!0)},children:"View"}),(0,l.jsx)(o.rA,{onClick:()=>(e=>{W(e),$(!0)})(e),children:"Edit"}),(0,l.jsx)(o.K0,{onClick:()=>(e=>{M(e),I("active"===e.status?"suspend":"activate"),R(!0)})(e),title:"active"===e.status?"Suspend Subscription":"Activate Subscription",children:(0,l.jsx)(g,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,l.jsx)(o.K0,{onClick:()=>(e=>{M(e),I("delete"),R(!0)})(e),title:"Delete Subscription",children:(0,l.jsx)(g,{children:"\u2715"})})]})]},e.id))]}),B&&(0,l.jsx)(o.aF,{isOpen:!0,onClose:()=>A(!1),title:"Add Subscription",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>A(!1),children:"Cancel"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{var e,t;if(!ee)return void alert("Please select a manager or restaurant");const n={restaurantId:J.restaurantId,restaurantName:J.restaurantName,managerId:J.managerId,managerName:J.managerName,planType:J.customPlanName||"Custom Plan",monthlyFee:J.monthlyFee,billingCycle:J.billingCycle,startDate:J.startDate,endDate:J.endDate,status:J.status,autoRenew:J.autoRenew,paymentModel:J.paymentModel},a=J.customPlanName||"Custom Plan",r=new Date(new Date(J.startDate).getTime()+12096e5).toISOString().split("T")[0],i="restaurant"===ee.type?"restaurant":"Restaurant Owner"===ee.data.role?"restaurant_owner":null!==(e=ee.data.role)&&void 0!==e&&e.includes("Foodcourt")?"foodcourt_manager":null!==(t=ee.data.role)&&void 0!==t&&t.includes("Brand")?"brand_manager":"restaurant",o={invoice_data:{restaurant_id:"restaurant"===ee.type?ee.data.id:null,due_date:r,total_amount:J.monthlyFee,currency:"MYR",status:"pending_payment",type:"manual",issuer_type:"system_admin",issuer_id:null,payer_type:i,payer_id:"manager"===ee.type?ee.data.id:ee.data.admin_id||null,invoice_category:"subscription",category_display_name:`Subscription - ${a}`,billing_period_start:J.startDate,billing_period_end:J.endDate||r,notes:`POS Subscription: ${a} (${J.billingCycle})`},items:[{item_type:"subscription",description:`${a} - ${"annual"===J.billingCycle?"Annual":"Monthly"} Subscription`,calculation_method:"fixed",fixed_amount:J.monthlyFee,calculated_amount:J.monthlyFee,tax_rate:0,tax_amount:0,total_amount:J.monthlyFee}]},s=localStorage.getItem("auth_token"),l={"Content-Type":"application/json",...s?{Authorization:`Bearer ${s}`}:{}};if("restaurant"===ee.type&&ee.data.id){const e={plan_type:J.customPlanName||"Custom Plan",plan_amount:J.monthlyFee,billing_cycle:J.billingCycle,subscription_start:J.startDate,subscription_end:J.endDate,status:J.status,auto_renew:J.autoRenew};if(!(await fetch(`/api/restaurants/${ee.data.id}`,{method:"PUT",headers:l,body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription")}else if("manager"===ee.type&&ee.data.id){const e=ee.data.role||"",t={plan_type:J.customPlanName||"Custom Plan",subscription_status:"trial"===J.status?"trialing":J.status,subscription_start:J.startDate,subscription_end:J.endDate};if("Brand General"===e||"Brand Manager"===e){const e=ee.data.brand_id;if(e){if(!(await fetch(`/api/brands/${e}/subscription`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update brand subscription")}}else if("Foodcourt General"===e||"Foodcourt Manager"===e){const e=ee.data.foodcourt_id;if(e){if(!(await fetch(`/api/foodcourts/${e}/subscription`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update foodcourt subscription")}}else if("Restaurant Owner"===e){if(!(await fetch(`/api/users/${ee.data.id}`,{method:"PUT",headers:l,body:JSON.stringify(t)})).ok)throw new Error("Failed to update owner subscription")}}const d=localStorage.getItem("auth_token"),c=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",...d?{Authorization:`Bearer ${d}`}:{}},body:JSON.stringify(o)});if(!c.ok){const e=await c.json().catch(()=>({error:"Unknown error"}));throw new Error(e.error||"Failed to create invoice")}console.log("Subscription and invoice created:",n),A(!1),T("Subscription added and invoice generated successfully!"),k(!0),await me()}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}},children:"Add Subscription"})]}),children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"User Type *"}),(0,l.jsxs)(s.Jt,{value:ue,onChange:e=>{const t=e.target.value;xe(t),te(null),H("");const n=ce.filter(e=>e.plan_target===t),a=n.length>0?n[0]:null;a&&Y(e=>({...e,planType:a.display_name,monthlyFee:parseFloat(a.base_price_monthly),paymentModel:"restaurant"===t?"restaurant":"owner"===t?"restaurant_owner":"brand"===t?"brand_manager":"foodcourt_manager"}))},children:[(0,l.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,l.jsx)("option",{value:"owner",children:"Restaurant Owner"}),(0,l.jsx)("option",{value:"brand",children:"Brand Manager"}),(0,l.jsx)("option",{value:"foodcourt",children:"Foodcourt Manager"})]})]}),(0,l.jsxs)(v,{style:{position:"relative",zIndex:100},children:[(0,l.jsx)(b,{children:"restaurant"===ue?"Search Restaurant *":"owner"===ue?"Search Owner *":"Search Manager *"}),(0,l.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,l.jsx)(w,{type:"text",value:q,onChange:e=>Fe(e.target.value),onFocus:()=>{Q(!0),q.length<1&&Fe("")},onBlur:()=>setTimeout(()=>Q(!1),200),placeholder:"restaurant"===ue?"Click to search restaurants...":"owner"===ue?"Click to search owners...":"Click to search managers...",required:!0}),K&&(0,l.jsxs)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:9999,boxShadow:"0 8px 16px rgba(0, 0, 0, 0.15)"},children:["restaurant"!==ue&&X.managers.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"owner"===ue?"OWNERS":"MANAGERS"}),X.managers.map(e=>(0,l.jsxs)("div",{onClick:()=>Se("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName||e.full_name||e.username}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email})]},e.id))]}),"restaurant"===ue&&X.restaurants.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),X.restaurants.map(e=>{const t=re.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});return(0,l.jsxs)("div",{onClick:()=>Se("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,l.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:"No Admin",t?` \u2022 Manager: ${t.fullName||t.full_name||t.username}`:""]})]},e.id)})]})]})]}),ee&&(0,l.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ee.type?ee.data.fullName||ee.data.full_name||ee.data.username:ee.data.name}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ee.type?"Manager":`${ee.data.admin?`Admin: ${ee.data.admin.name}`:"No Admin"} \u2022 ${ee.data.address||"No address"}`})]}),(0,l.jsx)("button",{onClick:()=>{te(null),H("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Subscription Plan *"}),(0,l.jsxs)(F,{value:J.customPlanName||"",onChange:e=>{const t=e.target.value;if("others"===t)Y({...J,planType:"custom",customPlanName:"others",monthlyFee:0});else if(t){const e=ce.find(e=>e.display_name===t);Y({...J,planType:"custom",customPlanName:t,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}else Y({...J,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,l.jsx)("option",{value:"",children:"Select Plan"}),ce.filter(e=>e.plan_target===ue).map(e=>(0,l.jsxs)("option",{value:e.display_name,children:[e.display_name," - RM ",e.base_price_monthly]},e.id)),(0,l.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===J.customPlanName&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Custom Plan Name *"}),(0,l.jsx)(w,{type:"text",value:"",onChange:e=>Y({...J,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Monthly Fee (RM) *"}),(0,l.jsx)(w,{type:"number",step:"0.01",min:"0",value:J.monthlyFee,onChange:e=>Y({...J,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,l.jsx)(v,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===J.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===J.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,l.jsx)("input",{type:"checkbox",checked:"trial"===J.status,onChange:e=>{if(e.target.checked){const e=new Date,t=new Date;t.setDate(t.getDate()+7),Y({...J,status:"trial",startDate:e.toISOString().split("T")[0],endDate:t.toISOString().split("T")[0],monthlyFee:0})}else Y({...J,status:"active",monthlyFee:29})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"Subscription will start with a 7-day free trial period"})]})]})}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Billing Cycle *"}),(0,l.jsxs)(F,{value:J.billingCycle||"monthly",onChange:e=>{const t=e.target.value,n=ce.find(e=>e.display_name===J.customPlanName),a=parseFloat(null===n||void 0===n?void 0:n.base_price_monthly)||J.monthlyFee,r=parseFloat(null===n||void 0===n?void 0:n.base_price_annual)||10*a;Y({...J,billingCycle:t,monthlyFee:"annual"===t?r:a})},children:[(0,l.jsx)("option",{value:"monthly",children:"Monthly"}),(0,l.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Subscription Start Date *"}),(0,l.jsx)(w,{type:"date",value:J.startDate,onChange:e=>Y({...J,startDate:e.target.value})})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Subscription End Date *"}),(0,l.jsx)(w,{type:"date",value:J.endDate,onChange:e=>Y({...J,endDate:e.target.value})})]}),(0,l.jsx)(v,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,l.jsx)("input",{type:"checkbox",checked:J.autoRenew||!1,onChange:e=>Y({...J,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,l.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,l.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,l.jsx)("strong",{children:"Summary:"})}),(0,l.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:["custom"===J.planType?J.customPlanName||"Custom Plan":"basic"===J.planType?"Basic":"professional"===J.planType?"Professional":"Enterprise"," Plan - RM ",J.monthlyFee||29," (",J.billingCycle||"monthly",")"]}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",ee?"restaurant"===ee.type?`${ee.data.name} (Restaurant Admin)`:(()=>{const e="Foodcourt Manager"===ee.data.role?"Foodcourt Manager":"Foodcourt General"===ee.data.role?"Foodcourt General Manager":"Brand Manager"===ee.data.role?"Brand Manager":"Brand General"===ee.data.role?"Brand General Manager":"Manager";return`${ee.data.fullName||ee.data.full_name||ee.data.username} (${e})`})():"Not selected"]})]})]})}),_&&(0,l.jsx)(o.aF,{isOpen:!0,onClose:()=>k(!1),title:"Success!",size:"small",footer:(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>k(!1),children:"OK"})}),children:(0,l.jsxs)("div",{style:{textAlign:"center"},children:[(0,l.jsx)(y,{children:"\u2713"}),(0,l.jsx)(j,{children:D})]})}),P&&O&&(0,l.jsx)(o.aF,{isOpen:!0,onClose:()=>$(!1),title:"Edit Custom Subscription",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>$(!1),children:"Cancel"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(O)try{console.log("\ud83d\udd04 Updating subscription:",O);const e=O.planType||"Custom Plan",t={name:O.restaurantName,managerId:O.managerId||null,planType:e,plan_type:e,planAmount:O.monthlyFee,plan_amount:O.monthlyFee,status:"active"===O.status?"active":"inactive",subscriptionStart:O.startDate,subscriptionEnd:O.endDate,subscription_start:O.startDate,subscription_end:O.endDate,discount_type:O.discountType||"none",discount_value:O.discountValue||0,discount_reason:O.discountReason||null};console.log("\ud83d\udce4 Sending update data:",t);const n={"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`},a=await fetch(`/api/restaurants/${O.restaurantId}`,{method:"PUT",headers:n,body:JSON.stringify(t)});if(console.log("\ud83d\udce1 Subscription update API response status:",a.status),a.ok){const e=await a.json();console.log("\u2705 Subscription updated successfully:",e),$(!1),W(null),console.log("\ud83d\udd04 Re-fetching subscription data..."),await me(),T("Subscription updated successfully!"),k(!0),console.log("\u2705 Modal closed and data refreshed")}else{const e=await a.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update subscription:",e),alert(`Error updating subscription: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating subscription:",e),alert("Error updating subscription. Please check your connection and try again.")}},children:"Update Subscription"})]}),children:(0,l.jsxs)(f,{children:[(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Restaurant *"}),(0,l.jsx)(w,{type:"text",value:O.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Subscription Plan *"}),(0,l.jsxs)(F,{value:O.planType,onChange:e=>{const t=e.target.value;if("others"===t)W({...O,planType:"custom",monthlyFee:0});else if(t){const e=ce.find(e=>e.display_name===t);W({...O,planType:t,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}},children:[(0,l.jsx)("option",{value:"",children:"Select Plan"}),ce.filter(e=>"restaurant"===e.plan_target).map(e=>(0,l.jsxs)("option",{value:e.display_name,children:[e.display_name," - RM ",e.base_price_monthly]},e.id)),(0,l.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===O.planType&&(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Custom Plan Name *"}),(0,l.jsx)(w,{type:"text",value:"",onChange:e=>W({...O,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Monthly Fee (RM) *"}),(0,l.jsx)(w,{type:"number",step:"0.01",min:"0",value:O.monthlyFee,onChange:e=>W({...O,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Status *"}),(0,l.jsxs)(F,{value:O.status,onChange:e=>W({...O,status:e.target.value}),children:[(0,l.jsx)("option",{value:"trial",children:"Trial"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"suspended",children:"Suspended"}),(0,l.jsx)("option",{value:"expired",children:"Expired"}),(0,l.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Billing Cycle *"}),(0,l.jsxs)(F,{value:O.billingCycle||"monthly",onChange:e=>W({...O,billingCycle:e.target.value}),children:[(0,l.jsx)("option",{value:"monthly",children:"Monthly"}),(0,l.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Subscription Start Date *"}),(0,l.jsx)(w,{type:"date",value:O.startDate,onChange:e=>W({...O,startDate:e.target.value})})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Subscription End Date *"}),(0,l.jsx)(w,{type:"date",value:O.endDate,onChange:e=>W({...O,endDate:e.target.value})})]}),(0,l.jsx)(v,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,l.jsx)("input",{type:"checkbox",checked:O.autoRenew||!1,onChange:e=>W({...O,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,l.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Discount"})}),(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"Discount Type"}),(0,l.jsxs)(F,{value:O.discountType||"none",onChange:e=>W({...O,discountType:e.target.value,discountValue:"none"===e.target.value?0:O.discountValue}),children:[(0,l.jsx)("option",{value:"none",children:"None"}),(0,l.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,l.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),"none"!==O.discountType&&(0,l.jsxs)(v,{children:[(0,l.jsx)(b,{children:"percentage"===O.discountType?"Discount Rate (%)":"Discount Amount (RM)"}),(0,l.jsx)(w,{type:"number",step:"percentage"===O.discountType?"1":"0.01",min:"0",max:"percentage"===O.discountType?"100":void 0,value:O.discountValue,onChange:e=>W({...O,discountValue:parseFloat(e.target.value)||0}),placeholder:"percentage"===O.discountType?"e.g. 10":"e.g. 50.00"})]}),"none"!==O.discountType&&(0,l.jsxs)(v,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(b,{children:"Discount Reason"}),(0,l.jsx)(w,{type:"text",value:O.discountReason||"",onChange:e=>W({...O,discountReason:e.target.value}),placeholder:"e.g. Opening promotion, Loyalty discount"})]}),"none"!==O.discountType&&O.discountValue>0&&(0,l.jsxs)("div",{style:{gridColumn:"1 / -1",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Discount Preview"}),(0,l.jsxs)("div",{style:{fontSize:"13px",color:"#15803D"},children:["Monthly Fee: RM ",O.monthlyFee.toFixed(2)," \u2192"," ",(0,l.jsxs)("strong",{children:["RM ",("percentage"===O.discountType?O.monthlyFee*(1-O.discountValue/100):Math.max(0,O.monthlyFee-O.discountValue)).toFixed(2)]})," ","(-","percentage"===O.discountType?`${O.discountValue}%`:`RM ${O.discountValue.toFixed(2)}`,")"]})]})]})}),L&&V&&(0,l.jsx)(o.aF,{isOpen:!0,onClose:()=>U(!1),title:"Subscription Details",footer:(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>U(!1),children:"Close"})}),children:(0,l.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.restaurantName})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Manager"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.managerName})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.location})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.planType.charAt(0).toUpperCase()+V.planType.slice(1)})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,l.jsx)("div",{children:(0,l.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===V.status?"#DCFCE7":"#FEF3C7",color:"active"===V.status?"#15803D":"#92400E"},children:V.status.charAt(0).toUpperCase()+V.status.slice(1)})})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),"none"!==V.discountType&&V.discountValue>0?(0,l.jsxs)("div",{children:[(0,l.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:["RM ",V.monthlyFee]}),(0,l.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:["RM ",("percentage"===V.discountType?V.monthlyFee*(1-V.discountValue/100):Math.max(0,V.monthlyFee-V.discountValue)).toFixed(2),(0,l.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===V.discountType?`${V.discountValue}%`:`RM ${V.discountValue}`,")"]})]})]}):(0,l.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:["RM ",V.monthlyFee]})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.billingCycle.charAt(0).toUpperCase()+V.billingCycle.slice(1)})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.autoRenew?(0,l.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,l.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),"none"!==V.discountType&&V.discountValue>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Discount"}),(0,l.jsxs)("div",{style:{background:"#F0FDF4",padding:"16px",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Type"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===V.discountType?"Percentage":"Fixed Amount"})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Value"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===V.discountType?`${V.discountValue}%`:`RM ${V.discountValue.toFixed(2)}`})]}),V.discountReason&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Reason"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:V.discountReason})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.startDate})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.endDate})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Next Payment"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.nextPayment})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,t=new Date(V.endDate).getTime()-e.getTime(),n=Math.ceil(t/864e5);return n<0?(0,l.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===n?(0,l.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):n<=7?(0,l.jsxs)("span",{style:{color:"#F59E0B"},children:[n," days"]}):n<=30?(0,l.jsxs)("span",{style:{color:"#10B981"},children:[n," days"]}):(0,l.jsxs)("span",{style:{color:"#6B7280"},children:[n," days"]})})()})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,l.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[V.currentMenuItems," / ",-1===V.menuItemLimit?"\u221e":V.menuItemLimit]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Payment Model"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"restaurant"===V.paymentModel?"Restaurant Admin":"Manager"})]})]})]})]})}),z&&(0,l.jsx)(o.aF,{isOpen:!0,onClose:()=>R(!1),title:"Confirm Action",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>R(!1),children:"Cancel"}),(0,l.jsxs)(i.cc,{variant:"delete"===N?"danger":"primary",onClick:async()=>{if(E&&N){try{const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}};if("delete"===N){console.log("Deleting subscription:",E.id,"restaurantId:",E.restaurantId);const e=await fetch(`/api/restaurants/${E.restaurantId}`,{method:"DELETE",headers:t});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to delete subscription")}T("Subscription deleted successfully")}else if("suspend"===N){const e=await fetch(`/api/restaurants/${E.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"inactive"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to suspend subscription")}T("Subscription suspended successfully")}else if("activate"===N){const e=await fetch(`/api/restaurants/${E.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"active"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to activate subscription")}T("Subscription activated successfully")}k(!0),await me()}catch(e){console.error("Action failed:",e),alert(`Action failed: ${e.message||"Unknown error"}. Please try again.`)}R(!1),M(null),I(null)}},children:[" ","delete"===N?"Delete":"suspend"===N?"Suspend":"Activate"," "]})]}),children:(0,l.jsxs)("p",{children:["delete"===N&&`Are you sure you want to delete subscription for ${null===E||void 0===E?void 0:E.restaurantName}?`,"suspend"===N&&`Are you sure you want to suspend subscription for ${null===E||void 0===E?void 0:E.restaurantName}?`,"activate"===N&&`Are you sure you want to activate subscription for ${null===E||void 0===E?void 0:E.restaurantName}?`]})})]})]})})}}}]);