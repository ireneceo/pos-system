"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9327],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var a=n(4752),r=n(4414);const i=a.Ay.div`
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
`,s=a.Ay.select`
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
`,l=e=>{let{children:t,className:n,style:a,...o}=e;return(0,r.jsx)(i,{className:n,style:a,...o,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,r.jsx)(s,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>r});var a=n(4752);const r=a.Ay.button`
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
`},9327:(e,t,n)=>{n.r(t),n.d(t,{default:()=>M});var a=n(9950),r=n(4752),i=n(3705),o=n(7960),s=n(2488),l=n(4414);const d=(0,r.Ay)(o.A0)`
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
  background: ${e=>{switch(e.planType){case"basic":return"#DBEAFE";case"professional":return"#E4E7FF";case"enterprise":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.planType){case"basic":return"#1E40AF";case"professional":return"#6366F1";case"enterprise":return"#D97706";default:return"#6B7280"}}};
`,g=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,y=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  overflow-y: auto;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,j=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  flex-shrink: 0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { 
      transform: translateY(-50px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
`,f=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,v=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,b=r.Ay.button`
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
`,w=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,F=r.Ay.div`
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
`,S=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,C=r.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,B=r.Ay.div`
  padding: 24px;
`,A=r.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,D=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,E=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,T=r.Ay.input`
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
`,_=r.Ay.select`
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
`,M=()=>{const[e,t]=(0,a.useState)([]),[n,r]=(0,a.useState)(""),[M,z]=(0,a.useState)("active"),[N,R]=(0,a.useState)(!1),[I,P]=(0,a.useState)(!1),[$,W]=(0,a.useState)(""),[L,O]=(0,a.useState)(null),[U,V]=(0,a.useState)(!1),[G,J]=(0,a.useState)(null),[Y,q]=(0,a.useState)(!1),[H,K]=(0,a.useState)(null),[Q,X]=(0,a.useState)(!1),[Z,ee]=(0,a.useState)(null),[te,ne]=(0,a.useState)({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+31536e6).toISOString().split("T")[0]}),[ae,re]=(0,a.useState)(""),[ie,oe]=(0,a.useState)(!1),[se,le]=(0,a.useState)({managers:[],restaurants:[]}),[de,ce]=(0,a.useState)(null),[pe,ue]=(0,a.useState)([]),[xe,he]=(0,a.useState)([]),[me,ge]=(0,a.useState)([]),[ye,je]=(0,a.useState)([]),[fe,ve]=(0,a.useState)([]),[be,we]=(0,a.useState)("restaurant");(0,a.useEffect)(()=>{Se(),Ce(),Be(),Fe()},[]);const Fe=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=(await e.json()).filter(e=>e.is_active);ve(t)}}catch(e){console.error("Error fetching plans:",e)}},Se=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API...");const e=await fetch("/api/restaurants");if(!e.ok)throw new Error("Failed to fetch restaurants");const n=await e.json(),a=(Array.isArray(n)?n:[]).map((e,t)=>{var n,a,r,i;const o=(null===(n=e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic";let s="active";"active"===e.status?s="active":"inactive"===e.status?s="suspended":"cancelled"===e.status&&(s="cancelled");const l={basic:50,professional:200,enterprise:-1};return{id:`sub-${e.id}`,restaurantId:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${t}`,restaurantName:e.name||"Restaurant Name",managerId:(null===(r=e.managerId||e.admin_id)||void 0===r?void 0:r.toString())||"",managerName:e.managerName||e.admin_name||"No Manager Assigned",planType:o,status:s,startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"2024-01-01",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+31536e6).toISOString().split("T")[0],monthlyFee:parseFloat(e.plan_amount)||29,billingCycle:"monthly",paymentModel:"manager",payerId:(null===(i=e.managerId||e.admin_id)||void 0===i?void 0:i.toString())||"",payerName:e.managerName||e.admin_name||"No Manager",menuItemLimit:l[o]||50,currentMenuItems:Math.floor(Math.random()*(l[o]>0?.7*l[o]:150))+10,features:[],lastPayment:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:void 0!==e.auto_renew?e.auto_renew:"active"===s,location:e.address||"Location not specified",discountType:e.discount_type||"none",discountValue:parseFloat(e.discount_value)||0,discountReason:e.discount_reason||""}});t(a)}catch(e){console.error("\u274c Error fetching subscriptions:",e),t([])}},Ce=async()=>{try{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{},n=await fetch("/api/restaurants",{headers:t}),a=await fetch("/api/users?role=Manager",{headers:t});if(n.ok&&a.ok){const e=await n.json(),t=await a.json(),r=Array.isArray(e)?e:e.data||[],i=Array.isArray(t)?t:t.data||[];ue(r),he(i),ge(r)}}catch(e){console.error("Error fetching available data:",e)}},Be=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=await e.json(),n=(Array.isArray(t)?t:[]).filter(e=>"custom"===e.category);je(n)}}catch(e){console.error("Error fetching custom plans:",e)}},Ae=e.filter(e=>{const t=e.restaurantName.toLowerCase().includes(n.toLowerCase())||e.managerName.toLowerCase().includes(n.toLowerCase())||e.location.toLowerCase().includes(n.toLowerCase()),a="all"===M||e.status===M;return t&&a}),ke=e.length,De=e.filter(e=>"active"===e.status).length,Ee=e.filter(e=>"trial"===e.status).length,Te=e.filter(e=>"active"===e.status).reduce((e,t)=>e+t.monthlyFee,0),_e=e=>{re(e),oe(!0);const t=xe.filter(e=>"brand"===be?"Brand Manager"===e.role||"Brand General"===e.role:"foodcourt"===be?"Foodcourt Manager"===e.role||"Foodcourt General"===e.role:"owner"!==be||"Restaurant Owner"===e.role);if(e.length<1)return void le({managers:t.slice(0,10),restaurants:me.slice(0,10)});const n=t.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase())),a=me.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase())||t.address&&t.address.toLowerCase().includes(e.toLowerCase()));le({managers:n.slice(0,10),restaurants:a.slice(0,10)})},Me=(e,t)=>{ce({type:e,data:t}),oe(!1),re("manager"===e?t.fullName||t.full_name||t.username:t.name);let n="restaurant";if("manager"===e&&("Restaurant Owner"===t.role?n="restaurant_owner":"Foodcourt Manager"===t.role||"Foodcourt General"===t.role?n="foodcourt_manager":"Brand Manager"!==t.role&&"Brand General"!==t.role||(n="brand_manager")),"manager"===e){var a;ne({...te,managerId:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",managerName:t.fullName||t.full_name||t.username||"",restaurantId:"",restaurantName:"",paymentModel:n})}else{var r,i;const e=t,n=xe.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});ne({...te,restaurantId:(null===(r=e.id)||void 0===r?void 0:r.toString())||"",restaurantName:e.name||"",managerId:(null===(i=e.admin_id)||void 0===i?void 0:i.toString())||"",managerName:n?n.fullName||n.full_name||n.username:"No Manager Assigned",email:e.email||"",phone:e.phone||"",address:e.address||"",paymentModel:"restaurant"})}};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(o.mc,{children:[(0,l.jsxs)(o.Y9,{children:[(0,l.jsx)(o.hE,{children:"Subscriptions"}),(0,l.jsxs)(o.ex,{children:[(0,l.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const t=Object.keys(e[0]);return[t.join(","),...e.map(e=>t.map(t=>{const n=e[t];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(Ae.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.managerName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":`RM ${e.monthlyFee}`,"Next Payment":e.nextPayment||"N/A",Location:e.location,Manager:e.managerName}))),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`subscriptions-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(n)},children:"Export"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=fe.filter(e=>e.plan_target===be),t=e.length>0?e[0]:null;ne({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:t?t.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant"===be?"restaurant":"owner"===be?"restaurant_owner":"brand"===be?"brand_manager":"foodcourt_manager",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:t?parseFloat(t.base_price_monthly):29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),ce(null),re(""),R(!0)},children:"Add Subscription"})]})]}),(0,l.jsxs)(o.UC,{children:[(0,l.jsxs)(o.MD,{children:[(0,l.jsxs)(o.hI,{color:"#059669",children:[(0,l.jsx)(o.Os,{children:ke}),(0,l.jsx)(o.v0,{children:"Total Subscriptions"}),(0,l.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,l.jsxs)(o.hI,{color:"#2563EB",children:[(0,l.jsx)(o.Os,{children:De}),(0,l.jsx)(o.v0,{children:"Active Subscriptions"}),(0,l.jsxs)(o.d1,{children:[ke>0?Math.round(De/ke*100):0,"% operational"]})]}),(0,l.jsxs)(o.hI,{color:"#7C3AED",children:[(0,l.jsx)(o.Os,{children:Ee}),(0,l.jsx)(o.v0,{children:"Trial Subscriptions"}),(0,l.jsx)(o.d1,{children:"Currently evaluating"})]}),(0,l.jsxs)(o.hI,{color:"#D97706",children:[(0,l.jsxs)(o.Os,{children:["RM ",Te.toLocaleString()]}),(0,l.jsx)(o.v0,{children:"Monthly Revenue"}),(0,l.jsx)(o.d1,{children:"From active subscriptions"})]})]}),(0,l.jsxs)(s.Qn,{children:[(0,l.jsx)(s.DO,{placeholder:"Search subscriptions...",value:n,onChange:e=>r(e.target.value)}),(0,l.jsxs)(s.Jt,{value:M,onChange:e=>z(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"trial",children:"Trial"}),(0,l.jsx)("option",{value:"expired",children:"Expired"}),(0,l.jsx)("option",{value:"suspended",children:"Suspended"}),(0,l.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,l.jsxs)(o.XI,{children:[(0,l.jsxs)(d,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,l.jsx)("span",{children:"Restaurant Info"}),(0,l.jsx)("span",{children:"Plan"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Menu Items"}),(0,l.jsx)("span",{children:"Monthly Fee"}),(0,l.jsx)("span",{children:"Expires In"}),(0,l.jsx)("span",{children:"Auto-Renew"}),(0,l.jsx)("span",{children:"Actions"})]}),Ae.map(e=>(0,l.jsxs)(c,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,l.jsxs)(o.Np,{children:[(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Restaurant Info"}),(0,l.jsxs)(p,{children:[(0,l.jsx)(u,{children:e.restaurantName}),(0,l.jsxs)(x,{children:[e.managerName," \u2022 ",e.location]})]})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Plan"}),(0,l.jsx)(m,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Status"}),(0,l.jsx)(h,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Monthly Fee"}),"none"!==e.discountType&&e.discountValue>0?(0,l.jsxs)("div",{children:[(0,l.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px"},children:["RM ",e.monthlyFee]}),(0,l.jsxs)("div",{style:{color:"#15803D",fontWeight:"600"},children:["RM ",("percentage"===e.discountType?e.monthlyFee*(1-e.discountValue/100):Math.max(0,e.monthlyFee-e.discountValue)).toFixed(2)]})]}):(0,l.jsxs)(l.Fragment,{children:["RM ",e.monthlyFee]})]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Expires In"}),(()=>{const t=new Date,n=new Date(e.endDate).getTime()-t.getTime(),a=Math.ceil(n/864e5);return a<0?(0,l.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===a?(0,l.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):a<=7?(0,l.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[a," days"]}):a<=30?(0,l.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[a," days"]}):(0,l.jsxs)("span",{style:{color:"#6B7280"},children:[a," days"]})})()]}),(0,l.jsxs)(o.Uj,{children:[(0,l.jsx)(o.PM,{children:"Auto-Renew"}),e.autoRenew?(0,l.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,l.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,l.jsxs)(o.wr,{children:[(0,l.jsx)(o.rA,{onClick:()=>{ee(e),X(!0)},children:"View"}),(0,l.jsx)(o.rA,{onClick:()=>(e=>{K(e),q(!0)})(e),children:"Edit"}),(0,l.jsx)(o.K0,{onClick:()=>(e=>{O(e),J("active"===e.status?"suspend":"activate"),V(!0)})(e),title:"active"===e.status?"Suspend Subscription":"Activate Subscription",children:(0,l.jsx)(g,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,l.jsx)(o.K0,{onClick:()=>(e=>{O(e),J("delete"),V(!0)})(e),title:"Delete Subscription",children:(0,l.jsx)(g,{children:"\u2715"})})]})]},e.id))]}),N&&(0,l.jsx)(y,{show:N,onClick:()=>R(!1),children:(0,l.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(v,{children:"Add Subscription"}),(0,l.jsx)(b,{onClick:()=>R(!1),children:"\xd7"})]}),(0,l.jsx)(B,{children:(0,l.jsxs)(k,{children:[(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"User Type *"}),(0,l.jsxs)(s.Jt,{value:be,onChange:e=>{const t=e.target.value;we(t),ce(null),re("");const n=fe.filter(e=>e.plan_target===t),a=n.length>0?n[0]:null;a&&ne(e=>({...e,planType:a.display_name,monthlyFee:parseFloat(a.base_price_monthly),paymentModel:"restaurant"===t?"restaurant":"owner"===t?"restaurant_owner":"brand"===t?"brand_manager":"foodcourt_manager"}))},children:[(0,l.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,l.jsx)("option",{value:"owner",children:"Restaurant Owner"}),(0,l.jsx)("option",{value:"brand",children:"Brand Manager"}),(0,l.jsx)("option",{value:"foodcourt",children:"Foodcourt Manager"})]})]}),(0,l.jsxs)(D,{style:{position:"relative",zIndex:100},children:[(0,l.jsx)(E,{children:"restaurant"===be?"Search Restaurant *":"owner"===be?"Search Owner *":"Search Manager *"}),(0,l.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,l.jsx)(T,{type:"text",value:ae,onChange:e=>_e(e.target.value),onFocus:()=>{oe(!0),ae.length<1&&_e("")},onBlur:()=>setTimeout(()=>oe(!1),200),placeholder:"restaurant"===be?"Click to search restaurants...":"owner"===be?"Click to search owners...":"Click to search managers...",required:!0}),ie&&(0,l.jsxs)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:9999,boxShadow:"0 8px 16px rgba(0, 0, 0, 0.15)"},children:["restaurant"!==be&&se.managers.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"owner"===be?"OWNERS":"MANAGERS"}),se.managers.map(e=>(0,l.jsxs)("div",{onClick:()=>Me("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName||e.full_name||e.username}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email})]},e.id))]}),"restaurant"===be&&se.restaurants.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),se.restaurants.map(e=>{const t=xe.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});return(0,l.jsxs)("div",{onClick:()=>Me("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,l.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:"No Admin",t?` \u2022 Manager: ${t.fullName||t.full_name||t.username}`:""]})]},e.id)})]})]})]}),de&&(0,l.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===de.type?de.data.fullName||de.data.full_name||de.data.username:de.data.name}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===de.type?"Manager":`${de.data.admin?`Admin: ${de.data.admin.name}`:"No Admin"} \u2022 ${de.data.address||"No address"}`})]}),(0,l.jsx)("button",{onClick:()=>{ce(null),re("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Subscription Plan *"}),(0,l.jsxs)(_,{value:te.customPlanName||"",onChange:e=>{const t=e.target.value;if("others"===t)ne({...te,planType:"custom",customPlanName:"others",monthlyFee:0});else if(t){const e=fe.find(e=>e.display_name===t);ne({...te,planType:"custom",customPlanName:t,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}else ne({...te,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,l.jsx)("option",{value:"",children:"Select Plan"}),fe.filter(e=>e.plan_target===be).map(e=>(0,l.jsxs)("option",{value:e.display_name,children:[e.display_name," - RM ",e.base_price_monthly]},e.id)),(0,l.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===te.customPlanName&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Custom Plan Name *"}),(0,l.jsx)(T,{type:"text",value:"",onChange:e=>ne({...te,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Monthly Fee (RM) *"}),(0,l.jsx)(T,{type:"number",step:"0.01",min:"0",value:te.monthlyFee,onChange:e=>ne({...te,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,l.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===te.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===te.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,l.jsx)("input",{type:"checkbox",checked:"trial"===te.status,onChange:e=>{if(e.target.checked){const e=new Date,t=new Date;t.setDate(t.getDate()+7),ne({...te,status:"trial",startDate:e.toISOString().split("T")[0],endDate:t.toISOString().split("T")[0],monthlyFee:0})}else ne({...te,status:"active",monthlyFee:29})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"Subscription will start with a 7-day free trial period"})]})]})}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Billing Cycle *"}),(0,l.jsxs)(_,{value:te.billingCycle||"monthly",onChange:e=>{const t=e.target.value,n={basic:{monthly:29,annual:290},professional:{monthly:99,annual:990},enterprise:{monthly:199,annual:2190}},a=n[te.planType]||n.basic;ne({...te,billingCycle:t,monthlyFee:a[t]})},children:[(0,l.jsx)("option",{value:"monthly",children:"Monthly"}),(0,l.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Subscription Start Date *"}),(0,l.jsx)(T,{type:"date",value:te.startDate,onChange:e=>ne({...te,startDate:e.target.value})})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Subscription End Date *"}),(0,l.jsx)(T,{type:"date",value:te.endDate,onChange:e=>ne({...te,endDate:e.target.value})})]}),(0,l.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,l.jsx)("input",{type:"checkbox",checked:te.autoRenew||!1,onChange:e=>ne({...te,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,l.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,l.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,l.jsx)("strong",{children:"Summary:"})}),(0,l.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:["custom"===te.planType?te.customPlanName||"Custom Plan":"basic"===te.planType?"Basic":"professional"===te.planType?"Professional":"Enterprise"," Plan - RM ",te.monthlyFee||29," (",te.billingCycle||"monthly",")"]}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",de?"restaurant"===de.type?`${de.data.name} (Restaurant Admin)`:(()=>{const e="Foodcourt Manager"===de.data.role?"Foodcourt Manager":"Foodcourt General"===de.data.role?"Foodcourt General Manager":"Brand Manager"===de.data.role?"Brand Manager":"Brand General"===de.data.role?"Brand General Manager":"Manager";return`${de.data.fullName||de.data.full_name||de.data.username} (${e})`})():"Not selected"]})]})]})}),(0,l.jsxs)(A,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>R(!1),children:"Cancel"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{var e,t;if(!de)return void alert("Please select a manager or restaurant");const n={restaurantId:te.restaurantId,restaurantName:te.restaurantName,managerId:te.managerId,managerName:te.managerName,planType:te.customPlanName||"Custom Plan",monthlyFee:te.monthlyFee,billingCycle:te.billingCycle,startDate:te.startDate,endDate:te.endDate,status:te.status,autoRenew:te.autoRenew,paymentModel:te.paymentModel};let a="",r="",i="",o="";if("restaurant"===de.type){a=de.data.name,o=de.data.name,i=de.data.name;const e=[];de.data.address&&e.push(de.data.address),de.data.phone&&e.push(`Phone: ${de.data.phone}`),de.data.email&&e.push(`Email: ${de.data.email}`),r=e.join("\n")}else if("manager"===de.type){a=de.data.fullName||de.data.full_name||de.data.username,i=de.data.companyName||a,o=te.restaurantName||"";const e=[];de.data.companyName&&e.push(de.data.companyName),de.data.email&&e.push(`Email: ${de.data.email}`),r=e.join("\n")}const s=te.customPlanName||"Custom Plan",l=new Date(new Date(te.startDate).getTime()+12096e5).toISOString().split("T")[0],d="restaurant"===de.type?"restaurant":"Restaurant Owner"===de.data.role?"restaurant_owner":null!==(e=de.data.role)&&void 0!==e&&e.includes("Foodcourt")?"foodcourt_manager":null!==(t=de.data.role)&&void 0!==t&&t.includes("Brand")?"brand_manager":"restaurant",c={invoice_data:{restaurant_id:"restaurant"===de.type?de.data.id:null,due_date:l,total_amount:te.monthlyFee,currency:"MYR",status:"pending_payment",type:"manual",issuer_type:"system_admin",issuer_id:null,payer_type:d,payer_id:"manager"===de.type?de.data.id:de.data.admin_id||null,invoice_category:"subscription",category_display_name:`Subscription - ${s}`,billing_period_start:te.startDate,billing_period_end:te.endDate||l,notes:`POS Subscription: ${s} (${te.billingCycle})`},items:[{item_type:"subscription",description:`${s} - ${"annual"===te.billingCycle?"Annual":"Monthly"} Subscription`,calculation_method:"fixed",fixed_amount:te.monthlyFee,calculated_amount:te.monthlyFee,tax_rate:0,tax_amount:0,total_amount:te.monthlyFee}]};if("restaurant"===de.type&&de.data.id){const e={plan_type:te.customPlanName||"Custom Plan",plan_amount:te.monthlyFee,billing_cycle:te.billingCycle,subscription_start:te.startDate,subscription_end:te.endDate,status:te.status,auto_renew:te.autoRenew},t=localStorage.getItem("auth_token");if(!(await fetch(`/api/restaurants/${de.data.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription")}const p=localStorage.getItem("auth_token"),u=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",...p?{Authorization:`Bearer ${p}`}:{}},body:JSON.stringify(c)});if(!u.ok){const e=await u.json().catch(()=>({error:"Unknown error"}));throw new Error(e.error||"Failed to create invoice")}console.log("Subscription and invoice created:",n),R(!1),W("Subscription added and invoice generated successfully!"),P(!0),await Se()}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}},children:"Add Subscription"})]})]})}),I&&(0,l.jsx)(y,{show:I,onClick:()=>P(!1),children:(0,l.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(F,{children:"\u2713"}),(0,l.jsx)(S,{children:"Success!"}),(0,l.jsx)(C,{children:$}),(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>P(!1),children:"OK"})]})}),Y&&H&&(0,l.jsx)(y,{show:Y,onClick:()=>q(!1),children:(0,l.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(v,{children:"Edit Custom Subscription"}),(0,l.jsx)(b,{onClick:()=>q(!1),children:"\xd7"})]}),(0,l.jsx)(B,{children:(0,l.jsxs)(k,{children:[(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Restaurant *"}),(0,l.jsx)(T,{type:"text",value:H.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Custom Subscription Plan *"}),(0,l.jsxs)(_,{value:H.planType,onChange:e=>{const t=e.target.value;if("others"===t)K({...H,planType:"custom",monthlyFee:0});else if(t){const e=ye.find(e=>e.name===t);K({...H,planType:t,monthlyFee:(null===e||void 0===e?void 0:e.monthly_price)||0})}},children:[(0,l.jsx)("option",{value:"",children:"Select Plan"}),ye.map(e=>(0,l.jsxs)("option",{value:e.name,children:[e.display_name," - RM ",e.monthly_price]},e.id)),(0,l.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===H.planType&&(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Custom Plan Name *"}),(0,l.jsx)(T,{type:"text",value:"",onChange:e=>K({...H,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Monthly Fee (RM) *"}),(0,l.jsx)(T,{type:"number",step:"0.01",min:"0",value:H.monthlyFee,onChange:e=>K({...H,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Status *"}),(0,l.jsxs)(_,{value:H.status,onChange:e=>K({...H,status:e.target.value}),children:[(0,l.jsx)("option",{value:"trial",children:"Trial"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"suspended",children:"Suspended"}),(0,l.jsx)("option",{value:"expired",children:"Expired"}),(0,l.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Billing Cycle *"}),(0,l.jsxs)(_,{value:H.billingCycle||"monthly",onChange:e=>K({...H,billingCycle:e.target.value}),children:[(0,l.jsx)("option",{value:"monthly",children:"Monthly"}),(0,l.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Subscription Start Date *"}),(0,l.jsx)(T,{type:"date",value:H.startDate,onChange:e=>K({...H,startDate:e.target.value})})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Subscription End Date *"}),(0,l.jsx)(T,{type:"date",value:H.endDate,onChange:e=>K({...H,endDate:e.target.value})})]}),(0,l.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,l.jsx)("input",{type:"checkbox",checked:H.autoRenew||!1,onChange:e=>K({...H,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,l.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,l.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,l.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Discount"})}),(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"Discount Type"}),(0,l.jsxs)(_,{value:H.discountType||"none",onChange:e=>K({...H,discountType:e.target.value,discountValue:"none"===e.target.value?0:H.discountValue}),children:[(0,l.jsx)("option",{value:"none",children:"None"}),(0,l.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,l.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),"none"!==H.discountType&&(0,l.jsxs)(D,{children:[(0,l.jsx)(E,{children:"percentage"===H.discountType?"Discount Rate (%)":"Discount Amount (RM)"}),(0,l.jsx)(T,{type:"number",step:"percentage"===H.discountType?"1":"0.01",min:"0",max:"percentage"===H.discountType?"100":void 0,value:H.discountValue,onChange:e=>K({...H,discountValue:parseFloat(e.target.value)||0}),placeholder:"percentage"===H.discountType?"e.g. 10":"e.g. 50.00"})]}),"none"!==H.discountType&&(0,l.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,l.jsx)(E,{children:"Discount Reason"}),(0,l.jsx)(T,{type:"text",value:H.discountReason||"",onChange:e=>K({...H,discountReason:e.target.value}),placeholder:"e.g. Opening promotion, Loyalty discount"})]}),"none"!==H.discountType&&H.discountValue>0&&(0,l.jsxs)("div",{style:{gridColumn:"1 / -1",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Discount Preview"}),(0,l.jsxs)("div",{style:{fontSize:"13px",color:"#15803D"},children:["Monthly Fee: RM ",H.monthlyFee.toFixed(2)," \u2192"," ",(0,l.jsxs)("strong",{children:["RM ",("percentage"===H.discountType?H.monthlyFee*(1-H.discountValue/100):Math.max(0,H.monthlyFee-H.discountValue)).toFixed(2)]})," ","(-","percentage"===H.discountType?`${H.discountValue}%`:`RM ${H.discountValue.toFixed(2)}`,")"]})]})]})}),(0,l.jsxs)(A,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>q(!1),children:"Cancel"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(H)try{console.log("\ud83d\udd04 Updating subscription:",H);const e={name:H.restaurantName,managerId:H.managerId||null,planType:"basic"===H.planType?"Basic Plan":"professional"===H.planType?"Professional Plan":"Enterprise Plan",planAmount:H.monthlyFee,status:"active"===H.status?"active":"inactive",subscriptionStart:H.startDate,subscriptionEnd:H.endDate,discount_type:H.discountType||"none",discount_value:H.discountValue||0,discount_reason:H.discountReason||null};console.log("\ud83d\udce4 Sending update data:",e);const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${H.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(console.log("\ud83d\udce1 Subscription update API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 Subscription updated successfully:",e),q(!1),K(null),console.log("\ud83d\udd04 Re-fetching subscription data..."),await Se(),W("Subscription updated successfully!"),P(!0),console.log("\u2705 Modal closed and data refreshed")}else{const e=await n.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update subscription:",e),alert(`Error updating subscription: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating subscription:",e),alert("Error updating subscription. Please check your connection and try again.")}},children:"Update Subscription"})]})]})}),Q&&Z&&(0,l.jsx)(y,{show:Q,onClick:()=>X(!1),children:(0,l.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(v,{children:"Subscription Details"}),(0,l.jsx)(b,{onClick:()=>X(!1),children:"\xd7"})]}),(0,l.jsx)(B,{children:(0,l.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.restaurantName})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Manager"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.managerName})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.location})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.planType.charAt(0).toUpperCase()+Z.planType.slice(1)})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,l.jsx)("div",{children:(0,l.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===Z.status?"#DCFCE7":"#FEF3C7",color:"active"===Z.status?"#15803D":"#92400E"},children:Z.status.charAt(0).toUpperCase()+Z.status.slice(1)})})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),"none"!==Z.discountType&&Z.discountValue>0?(0,l.jsxs)("div",{children:[(0,l.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:["RM ",Z.monthlyFee]}),(0,l.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:["RM ",("percentage"===Z.discountType?Z.monthlyFee*(1-Z.discountValue/100):Math.max(0,Z.monthlyFee-Z.discountValue)).toFixed(2),(0,l.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===Z.discountType?`${Z.discountValue}%`:`RM ${Z.discountValue}`,")"]})]})]}):(0,l.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:["RM ",Z.monthlyFee]})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.billingCycle.charAt(0).toUpperCase()+Z.billingCycle.slice(1)})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.autoRenew?(0,l.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,l.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),"none"!==Z.discountType&&Z.discountValue>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Discount"}),(0,l.jsxs)("div",{style:{background:"#F0FDF4",padding:"16px",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Type"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===Z.discountType?"Percentage":"Fixed Amount"})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Value"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===Z.discountType?`${Z.discountValue}%`:`RM ${Z.discountValue.toFixed(2)}`})]}),Z.discountReason&&(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Reason"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:Z.discountReason})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.startDate})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.endDate})]}),(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Next Payment"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:Z.nextPayment})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,t=new Date(Z.endDate).getTime()-e.getTime(),n=Math.ceil(t/864e5);return n<0?(0,l.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===n?(0,l.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):n<=7?(0,l.jsxs)("span",{style:{color:"#F59E0B"},children:[n," days"]}):n<=30?(0,l.jsxs)("span",{style:{color:"#10B981"},children:[n," days"]}):(0,l.jsxs)("span",{style:{color:"#6B7280"},children:[n," days"]})})()})]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,l.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[Z.currentMenuItems," / ",-1===Z.menuItemLimit?"\u221e":Z.menuItemLimit]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Payment Model"}),(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"restaurant"===Z.paymentModel?"Restaurant Admin":"Manager"})]})]})]})]})}),(0,l.jsx)(A,{children:(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>X(!1),children:"Close"})})]})}),U&&(0,l.jsx)(y,{show:U,onClick:()=>V(!1),children:(0,l.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(v,{children:"Confirm Action"}),(0,l.jsx)(b,{onClick:()=>V(!1),children:"\xd7"})]}),(0,l.jsx)(B,{children:(0,l.jsxs)("p",{children:["delete"===G&&`Are you sure you want to delete subscription for ${null===L||void 0===L?void 0:L.restaurantName}?`,"suspend"===G&&`Are you sure you want to suspend subscription for ${null===L||void 0===L?void 0:L.restaurantName}?`,"activate"===G&&`Are you sure you want to activate subscription for ${null===L||void 0===L?void 0:L.restaurantName}?`]})}),(0,l.jsxs)(A,{children:[(0,l.jsx)(i.cc,{variant:"cancel",onClick:()=>V(!1),children:"Cancel"}),(0,l.jsx)(i.cc,{variant:"delete"===G?"danger":"primary",onClick:async()=>{if(L&&G){try{const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}};if("delete"===G){console.log("Deleting subscription:",L.id,"restaurantId:",L.restaurantId);const e=await fetch(`/api/restaurants/${L.restaurantId}`,{method:"DELETE",headers:t});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to delete subscription")}W("Subscription deleted successfully")}else if("suspend"===G){const e=await fetch(`/api/restaurants/${L.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"inactive"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to suspend subscription")}W("Subscription suspended successfully")}else if("activate"===G){const e=await fetch(`/api/restaurants/${L.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"active"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to activate subscription")}W("Subscription activated successfully")}P(!0),await Se()}catch(e){console.error("Action failed:",e),alert(`Action failed: ${e.message||"Unknown error"}. Please try again.`)}V(!1),O(null),J(null)}},children:"delete"===G?"Delete":"suspend"===G?"Suspend":"Activate"})]})]})})]})]})})}}}]);