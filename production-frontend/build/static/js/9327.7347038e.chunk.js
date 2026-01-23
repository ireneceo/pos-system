"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9327],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var a=t(4752),r=t(4414);const i=a.Ay.div`
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
`,s=a.Ay.input`
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
`,o=a.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:a,...s}=e;return(0,r.jsx)(i,{className:t,style:a,...s,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,r.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,r.jsx)(o,{...t,children:n})}},3705:(e,n,t)=>{t.d(n,{cc:()=>r});var a=t(4752);const r=a.Ay.button`
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
`},9327:(e,n,t)=>{t.r(n),t.d(n,{default:()=>I});var a=t(9950),r=t(4752),i=t(3310),s=t(3705),o=t(2674),l=t(2488),d=t(4414);const c=(0,r.Ay)(o.A0)`
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
`,p=(0,r.Ay)(o.Hj)`
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
`,u=r.Ay.div``,x=r.Ay.div`
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
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,g=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.planType){case"basic":return"#DBEAFE";case"professional":return"#E4E7FF";case"enterprise":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.planType){case"basic":return"#1E40AF";case"professional":return"#6366F1";case"enterprise":return"#D97706";default:return"#6B7280"}}};
`,y=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,j=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
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
`,v=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,b=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,w=r.Ay.button`
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
`,F=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,C=r.Ay.div`
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
`,A=r.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,B=r.Ay.div`
  padding: 24px;
`,k=r.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,E=r.Ay.div`
  display: grid;
  gap: 20px;
`,D=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,M=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,N=r.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
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
`,T=r.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,I=()=>{const[e,n]=(0,a.useState)([]),[t,r]=(0,a.useState)(""),[I,z]=(0,a.useState)("active"),[P,_]=(0,a.useState)(!1),[R,$]=(0,a.useState)(!1),[L,W]=(0,a.useState)(""),[O,U]=(0,a.useState)(null),[G,J]=(0,a.useState)(!1),[Y,q]=(0,a.useState)(null),[H,K]=(0,a.useState)(!1),[Q,V]=(0,a.useState)(null),[X,Z]=(0,a.useState)(!1),[ee,ne]=(0,a.useState)(null),[te,ae]=(0,a.useState)({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+31536e6).toISOString().split("T")[0]}),[re,ie]=(0,a.useState)(""),[se,oe]=(0,a.useState)(!1),[le,de]=(0,a.useState)({managers:[],restaurants:[]}),[ce,pe]=(0,a.useState)(null),[ue,xe]=(0,a.useState)([]),[he,me]=(0,a.useState)([]),[ge,ye]=(0,a.useState)([]),[je,fe]=(0,a.useState)([]),[ve,be]=(0,a.useState)([]),[we,Fe]=(0,a.useState)("restaurant");(0,a.useEffect)(()=>{Se(),Ae(),Be(),Ce()},[]);const Ce=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>e.is_active);be(n)}}catch(e){console.error("Error fetching plans:",e)}},Se=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API...");const e=await fetch("/api/restaurants");if(!e.ok)throw new Error("Failed to fetch restaurants");const t=await e.json(),a=(Array.isArray(t)?t:[]).map((e,n)=>{var t,a,r,i;const s=(null===(t=e.plan_type)||void 0===t?void 0:t.toLowerCase().replace(" plan",""))||"basic";let o="active";"active"===e.status?o="active":"inactive"===e.status?o="suspended":"cancelled"===e.status&&(o="cancelled");const l={basic:50,professional:200,enterprise:-1};return{id:`sub-${e.id}`,restaurantId:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,restaurantName:e.name||"Restaurant Name",managerId:(null===(r=e.managerId||e.manager_id)||void 0===r?void 0:r.toString())||"",managerName:e.managerName||e.manager_name||"No Manager Assigned",planType:s,status:o,startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"2024-01-01",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+31536e6).toISOString().split("T")[0],monthlyFee:parseFloat(e.plan_amount)||29,billingCycle:"monthly",paymentModel:"manager",payerId:(null===(i=e.managerId||e.manager_id)||void 0===i?void 0:i.toString())||"",payerName:e.managerName||e.manager_name||"No Manager",menuItemLimit:l[s]||50,currentMenuItems:Math.floor(Math.random()*(l[s]>0?.7*l[s]:150))+10,features:[],lastPayment:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:"active"===o,location:e.address||"Location not specified"}});n(a)}catch(e){console.error("\u274c Error fetching subscriptions:",e),n([])}},Ae=async()=>{try{const e=await fetch("/api/restaurants"),n=await fetch("/api/users");if(e.ok&&n.ok){const t=await e.json(),a=await n.json(),r=Array.isArray(a)?a.filter(e=>"Foodcourt Manager"===e.role||"Foodcourt General"===e.role||"Brand Manager"===e.role||"Brand General"===e.role):[];xe(Array.isArray(t)?t:[]),me(r),ye(Array.isArray(t)?t:[])}}catch(e){console.error("Error fetching available data:",e)}},Be=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=await e.json(),t=(Array.isArray(n)?n:[]).filter(e=>"custom"===e.category);fe(t)}}catch(e){console.error("Error fetching custom plans:",e)}},ke=e.filter(e=>{const n=e.restaurantName.toLowerCase().includes(t.toLowerCase())||e.managerName.toLowerCase().includes(t.toLowerCase())||e.location.toLowerCase().includes(t.toLowerCase()),a="all"===I||e.status===I;return n&&a}),Ee=e.length,De=e.filter(e=>"active"===e.status).length,Me=e.filter(e=>"trial"===e.status).length,Ne=e.filter(e=>"active"===e.status).reduce((e,n)=>e+n.monthlyFee,0),Te=(e,n)=>{pe({type:e,data:n}),oe(!1),ie("manager"===e?n.fullName||n.full_name||n.username:n.name);let t="restaurant";if("manager"===e&&("Foodcourt Manager"===n.role||"Foodcourt General"===n.role?t="foodcourt_manager":"Brand Manager"!==n.role&&"Brand General"!==n.role||(t="brand_manager")),"manager"===e){var a;ae({...te,managerId:(null===(a=n.id)||void 0===a?void 0:a.toString())||"",managerName:n.fullName||n.full_name||n.username||"",restaurantId:"",restaurantName:"",paymentModel:t})}else{var r,i;const e=n,t=he.find(n=>{var t,a;return(null===(t=n.id)||void 0===t?void 0:t.toString())===(null===(a=e.manager_id)||void 0===a?void 0:a.toString())});ae({...te,restaurantId:(null===(r=e.id)||void 0===r?void 0:r.toString())||"",restaurantName:e.name||"",managerId:(null===(i=e.manager_id)||void 0===i?void 0:i.toString())||"",managerName:t?t.fullName||t.full_name||t.username:"No Manager Assigned",email:e.email||"",phone:e.phone||"",address:e.address||"",paymentModel:"restaurant"})}};return(0,d.jsx)(i.A,{children:(0,d.jsxs)(o.mc,{children:[(0,d.jsxs)(o.Y9,{children:[(0,d.jsx)(o.hE,{children:"Subscriptions"}),(0,d.jsxs)(o.ex,{children:[(0,d.jsx)(s.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const t=e[n];return"string"===typeof t&&(t.includes(",")||t.includes('"')||t.includes("\n"))?`"${t.replace(/"/g,'""')}"`:t||""}).join(","))].join("\n")})(ke.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.managerName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":`RM ${e.monthlyFee}`,"Next Payment":e.nextPayment||"N/A",Location:e.location,Manager:e.managerName}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(n),a=document.createElement("a");a.href=t,a.download=`subscriptions-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(t)},children:"Export"}),(0,d.jsx)(s.cc,{variant:"primary",onClick:()=>{const e=ve.filter(e=>e.plan_target===we),n=e.length>0?e[0]:null;ae({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:n?n.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant"===we?"restaurant":"brand"===we?"brand_manager":"foodcourt_manager",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:n?parseFloat(n.base_price_monthly):29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),pe(null),ie(""),_(!0)},children:"Add Subscription"})]})]}),(0,d.jsxs)(o.UC,{children:[(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{color:"#059669",children:[(0,d.jsx)(o.Os,{children:Ee}),(0,d.jsx)(o.v0,{children:"Total Subscriptions"}),(0,d.jsx)(o.d1,{children:"Across all restaurants"})]}),(0,d.jsxs)(o.hI,{color:"#2563EB",children:[(0,d.jsx)(o.Os,{children:De}),(0,d.jsx)(o.v0,{children:"Active Subscriptions"}),(0,d.jsxs)(o.d1,{children:[Ee>0?Math.round(De/Ee*100):0,"% operational"]})]}),(0,d.jsxs)(o.hI,{color:"#7C3AED",children:[(0,d.jsx)(o.Os,{children:Me}),(0,d.jsx)(o.v0,{children:"Trial Subscriptions"}),(0,d.jsx)(o.d1,{children:"Currently evaluating"})]}),(0,d.jsxs)(o.hI,{color:"#D97706",children:[(0,d.jsxs)(o.Os,{children:["RM ",Ne.toLocaleString()]}),(0,d.jsx)(o.v0,{children:"Monthly Revenue"}),(0,d.jsx)(o.d1,{children:"From active subscriptions"})]})]}),(0,d.jsxs)(l.Qn,{children:[(0,d.jsx)(l.DO,{placeholder:"Search subscriptions...",value:t,onChange:e=>r(e.target.value)}),(0,d.jsxs)(l.Jt,{value:I,onChange:e=>z(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsxs)(o.XI,{children:[(0,d.jsxs)(c,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,d.jsx)("span",{children:"Restaurant Info"}),(0,d.jsx)("span",{children:"Plan"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Menu Items"}),(0,d.jsx)("span",{children:"Monthly Fee"}),(0,d.jsx)("span",{children:"Expires In"}),(0,d.jsx)("span",{children:"Auto-Renew"}),(0,d.jsx)("span",{children:"Actions"})]}),ke.map(e=>(0,d.jsxs)(p,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,d.jsxs)(o.Np,{children:[(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Restaurant Info"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(x,{children:e.restaurantName}),(0,d.jsxs)(h,{children:[e.managerName," \u2022 ",e.location]})]})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Plan"}),(0,d.jsx)(g,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Status"}),(0,d.jsx)(m,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Monthly Fee"}),"RM ",e.monthlyFee]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Expires In"}),(()=>{const n=new Date,t=new Date(e.endDate).getTime()-n.getTime(),a=Math.ceil(t/864e5);return a<0?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===a?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):a<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[a," days"]}):a<=30?(0,d.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[a," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[a," days"]})})()]}),(0,d.jsxs)(o.Uj,{children:[(0,d.jsx)(o.PM,{children:"Auto-Renew"}),e.autoRenew?(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,d.jsxs)(o.wr,{children:[(0,d.jsx)(o.rA,{onClick:()=>{ne(e),Z(!0)},children:"View"}),"basic"!==e.planType&&"professional"!==e.planType&&"enterprise"!==e.planType&&(0,d.jsx)(o.rA,{onClick:()=>(e=>{V(e),K(!0)})(e),children:"Edit"}),(0,d.jsx)(o.K0,{onClick:()=>(e=>{U(e),q("active"===e.status?"suspend":"activate"),J(!0)})(e),title:"active"===e.status?"Suspend Subscription":"Activate Subscription",children:(0,d.jsx)(y,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,d.jsx)(o.K0,{onClick:()=>(e=>{U(e),q("delete"),J(!0)})(e),title:"Delete Subscription",children:(0,d.jsx)(y,{children:"\u2715"})})]})]},e.id))]}),P&&(0,d.jsx)(j,{show:P,onClick:()=>_(!1),children:(0,d.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Add Subscription"}),(0,d.jsx)(w,{onClick:()=>_(!1),children:"\xd7"})]}),(0,d.jsx)(B,{children:(0,d.jsxs)(E,{children:[(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"User Type *"}),(0,d.jsxs)(l.Jt,{value:we,onChange:e=>{const n=e.target.value;Fe(n),pe(null),ie("");const t=ve.filter(e=>e.plan_target===n),a=t.length>0?t[0]:null;a&&ae(e=>({...e,planType:a.display_name,monthlyFee:parseFloat(a.base_price_monthly),paymentModel:"restaurant"===n?"restaurant":"brand"===n?"brand_manager":"foodcourt_manager"}))},children:[(0,d.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,d.jsx)("option",{value:"brand",children:"Brand Manager"}),(0,d.jsx)("option",{value:"foodcourt",children:"Foodcourt Manager"})]})]}),(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"restaurant"===we?"Search Restaurant *":"Search Manager *"}),(0,d.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,d.jsx)(N,{type:"text",value:re,onChange:e=>(e=>{if(ie(e),oe(!0),e.length<2)return void de({managers:[],restaurants:[]});const n=he.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase())),t=ge.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));de({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>oe(!0),onBlur:()=>setTimeout(()=>oe(!1),200),placeholder:"restaurant"===we?"Type to search for restaurants":"Type to search for managers",required:!0,style:{width:"100%"}}),se&&(le.managers.length>0||le.restaurants.length>0)&&(0,d.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:["restaurant"!==we&&le.managers.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),le.managers.map(e=>(0,d.jsxs)("div",{onClick:()=>Te("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName||e.full_name||e.username}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email})]},e.id))]}),"restaurant"===we&&le.restaurants.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),le.restaurants.map(e=>{const n=he.find(n=>{var t,a;return(null===(t=n.id)||void 0===t?void 0:t.toString())===(null===(a=e.manager_id)||void 0===a?void 0:a.toString())});return(0,d.jsxs)("div",{onClick:()=>Te("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",n?n.fullName||n.full_name||n.username:"Unknown"]})]},e.id)})]})]})]}),ce&&(0,d.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ce.type?ce.data.fullName||ce.data.full_name||ce.data.username:ce.data.name}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ce.type?"Manager":`${ce.data.address||"No address"} \u2022 Restaurant`})]}),(0,d.jsx)("button",{onClick:()=>{pe(null),ie("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"Subscription Plan *"}),(0,d.jsxs)(T,{value:te.customPlanName||"",onChange:e=>{const n=e.target.value;if("others"===n)ae({...te,planType:"custom",customPlanName:"others",monthlyFee:0});else if(n){const e=ve.find(e=>e.display_name===n);ae({...te,planType:"custom",customPlanName:n,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}else ae({...te,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),ve.filter(e=>e.plan_target===we).map(e=>(0,d.jsxs)("option",{value:e.display_name,children:[e.display_name," - RM ",e.base_price_monthly]},e.id)),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===te.customPlanName&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"Custom Plan Name *"}),(0,d.jsx)(N,{type:"text",value:"",onChange:e=>ae({...te,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Monthly Fee (RM) *"}),(0,d.jsx)(N,{type:"number",step:"0.01",min:"0",value:te.monthlyFee,onChange:e=>ae({...te,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Status *"}),(0,d.jsxs)(T,{value:te.status,onChange:e=>ae({...te,status:e.target.value}),children:[(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Billing Cycle *"}),(0,d.jsxs)(T,{value:te.billingCycle||"monthly",onChange:e=>{const n=e.target.value,t={basic:{monthly:29,annual:290},professional:{monthly:99,annual:990},enterprise:{monthly:199,annual:2190}},a=t[te.planType]||t.basic;ae({...te,billingCycle:n,monthlyFee:a[n]})},children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Subscription Start Date *"}),(0,d.jsx)(N,{type:"date",value:te.startDate,onChange:e=>ae({...te,startDate:e.target.value})})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Subscription End Date *"}),(0,d.jsx)(N,{type:"date",value:te.endDate,onChange:e=>ae({...te,endDate:e.target.value})})]}),(0,d.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:te.autoRenew||!1,onChange:e=>ae({...te,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,d.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,d.jsx)("strong",{children:"Summary:"})}),(0,d.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:["custom"===te.planType?te.customPlanName||"Custom Plan":"basic"===te.planType?"Basic":"professional"===te.planType?"Professional":"Enterprise"," Plan - RM ",te.monthlyFee||29," (",te.billingCycle||"monthly",")"]}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",ce?"restaurant"===ce.type?`${ce.data.name} (Restaurant Admin)`:(()=>{const e="Foodcourt Manager"===ce.data.role?"Foodcourt Manager":"Foodcourt General"===ce.data.role?"Foodcourt General Manager":"Brand Manager"===ce.data.role?"Brand Manager":"Brand General"===ce.data.role?"Brand General Manager":"Manager";return`${ce.data.fullName||ce.data.full_name||ce.data.username} (${e})`})():"Not selected"]})]})]})}),(0,d.jsxs)(k,{children:[(0,d.jsx)(s.cc,{variant:"cancel",onClick:()=>_(!1),children:"Cancel"}),(0,d.jsx)(s.cc,{variant:"primary",onClick:async()=>{try{if(!ce)return void alert("Please select a manager or restaurant");const e={restaurantId:te.restaurantId,restaurantName:te.restaurantName,managerId:te.managerId,managerName:te.managerName,planType:te.customPlanName||"Custom Plan",monthlyFee:te.monthlyFee,billingCycle:te.billingCycle,startDate:te.startDate,endDate:te.endDate,status:te.status,autoRenew:te.autoRenew,paymentModel:te.paymentModel};let n="",t="",a="",r="";if("restaurant"===ce.type){n=ce.data.name,r=ce.data.name,a=ce.data.name;const e=[];ce.data.address&&e.push(ce.data.address),ce.data.phone&&e.push(`Phone: ${ce.data.phone}`),ce.data.email&&e.push(`Email: ${ce.data.email}`),t=e.join("\n")}else if("manager"===ce.type){n=ce.data.fullName||ce.data.full_name||ce.data.username,a=ce.data.companyName||n,r=te.restaurantName||"";const e=[];ce.data.companyName&&e.push(ce.data.companyName),ce.data.email&&e.push(`Email: ${ce.data.email}`),t=e.join("\n")}const i={restaurantId:"restaurant"===ce.type?ce.data.id:null,restaurantName:r,managerId:"manager"===ce.type?ce.data.id:ce.data.manager_id||null,managerName:"manager"===ce.type?ce.data.fullName||ce.data.full_name||ce.data.username:te.managerName,customerName:n,customerAddress:t,companyName:a,planName:te.customPlanName||"Custom Plan",amount:te.monthlyFee,billingCycle:te.billingCycle,issueDate:te.startDate,dueDate:new Date(new Date(te.startDate).getTime()+12096e5).toISOString().split("T")[0],paidBy:"restaurant"===ce.type?"Restaurant Admin":"Foodcourt Manager"===ce.data.role?"Foodcourt Manager":"Foodcourt General"===ce.data.role?"Foodcourt General Manager":"Brand Manager"===ce.data.role?"Brand Manager":"Brand General"===ce.data.role?"Brand General Manager":"Manager",status:"pending"};if("restaurant"===ce.type&&ce.data.id){const e={plan_type:te.customPlanName||"Custom Plan",plan_amount:te.monthlyFee,billing_cycle:te.billingCycle,subscription_start:te.startDate,subscription_end:te.endDate,status:te.status};if(!(await fetch(`/api/restaurants/${ce.data.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription")}if(!(await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).ok)throw new Error("Failed to create invoice");console.log("\u2705 Subscription and invoice created:",e,i),_(!1),W("Subscription added and invoice generated successfully!"),$(!0),await Se()}catch(e){console.error("Error adding subscription:",e),alert("Error adding subscription. Please try again.")}},children:"Add Subscription"})]})]})}),R&&(0,d.jsx)(j,{show:R,onClick:()=>$(!1),children:(0,d.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(C,{children:"\u2713"}),(0,d.jsx)(S,{children:"Success!"}),(0,d.jsx)(A,{children:L}),(0,d.jsx)(s.cc,{variant:"primary",onClick:()=>$(!1),children:"OK"})]})}),H&&Q&&(0,d.jsx)(j,{show:H,onClick:()=>K(!1),children:(0,d.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Edit Custom Subscription"}),(0,d.jsx)(w,{onClick:()=>K(!1),children:"\xd7"})]}),(0,d.jsx)(B,{children:(0,d.jsxs)(E,{children:[(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"Restaurant *"}),(0,d.jsx)(N,{type:"text",value:Q.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"Custom Subscription Plan *"}),(0,d.jsxs)(T,{value:Q.planType,onChange:e=>{const n=e.target.value;if("others"===n)V({...Q,planType:"custom",monthlyFee:0});else if(n){const e=je.find(e=>e.name===n);V({...Q,planType:n,monthlyFee:(null===e||void 0===e?void 0:e.monthly_price)||0})}},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),je.map(e=>(0,d.jsxs)("option",{value:e.name,children:[e.display_name," - RM ",e.monthly_price]},e.id)),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===Q.planType&&(0,d.jsxs)(D,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(M,{children:"Custom Plan Name *"}),(0,d.jsx)(N,{type:"text",value:"",onChange:e=>V({...Q,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Monthly Fee (RM) *"}),(0,d.jsx)(N,{type:"number",step:"0.01",min:"0",value:Q.monthlyFee,onChange:e=>V({...Q,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Status *"}),(0,d.jsxs)(T,{value:Q.status,onChange:e=>V({...Q,status:e.target.value}),children:[(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Billing Cycle *"}),(0,d.jsxs)(T,{value:Q.billingCycle||"monthly",onChange:e=>V({...Q,billingCycle:e.target.value}),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Subscription Start Date *"}),(0,d.jsx)(N,{type:"date",value:Q.startDate,onChange:e=>V({...Q,startDate:e.target.value})})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(M,{children:"Subscription End Date *"}),(0,d.jsx)(N,{type:"date",value:Q.endDate,onChange:e=>V({...Q,endDate:e.target.value})})]}),(0,d.jsx)(D,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:Q.autoRenew||!1,onChange:e=>V({...Q,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})})]})}),(0,d.jsxs)(k,{children:[(0,d.jsx)(s.cc,{variant:"cancel",onClick:()=>K(!1),children:"Cancel"}),(0,d.jsx)(s.cc,{variant:"primary",onClick:async()=>{if(Q)try{console.log("\ud83d\udd04 Updating subscription:",Q);const e={name:Q.restaurantName,managerId:Q.managerId||null,planType:"basic"===Q.planType?"Basic Plan":"professional"===Q.planType?"Professional Plan":"Enterprise Plan",planAmount:Q.monthlyFee,status:"active"===Q.status?"active":"inactive",subscriptionStart:Q.startDate,subscriptionEnd:Q.endDate};console.log("\ud83d\udce4 Sending update data:",e);const n=await fetch(`/api/restaurants/${Q.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(console.log("\ud83d\udce1 Subscription update API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 Subscription updated successfully:",e),K(!1),V(null),console.log("\ud83d\udd04 Re-fetching subscription data..."),await Se(),W("Subscription updated successfully!"),$(!0),console.log("\u2705 Modal closed and data refreshed")}else{const e=await n.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update subscription:",e),alert(`Error updating subscription: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating subscription:",e),alert("Error updating subscription. Please check your connection and try again.")}},children:"Update Subscription"})]})]})}),X&&ee&&(0,d.jsx)(j,{show:X,onClick:()=>Z(!1),children:(0,d.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Subscription Details"}),(0,d.jsx)(w,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,d.jsx)(B,{children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.restaurantName})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Manager"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.managerName})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.location})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.planType.charAt(0).toUpperCase()+ee.planType.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,d.jsx)("div",{children:(0,d.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===ee.status?"#DCFCE7":"#FEF3C7",color:"active"===ee.status?"#15803D":"#92400E"},children:ee.status.charAt(0).toUpperCase()+ee.status.slice(1)})})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:["RM ",ee.monthlyFee]})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.billingCycle.charAt(0).toUpperCase()+ee.billingCycle.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.autoRenew?(0,d.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,d.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.startDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.endDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Next Payment"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:ee.nextPayment})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,n=new Date(ee.endDate).getTime()-e.getTime(),t=Math.ceil(n/864e5);return t<0?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===t?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):t<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B"},children:[t," days"]}):t<=30?(0,d.jsxs)("span",{style:{color:"#10B981"},children:[t," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[t," days"]})})()})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[ee.currentMenuItems," / ",-1===ee.menuItemLimit?"\u221e":ee.menuItemLimit]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Payment Model"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"restaurant"===ee.paymentModel?"Restaurant Admin":"Manager"})]})]})]})]})}),(0,d.jsx)(k,{children:(0,d.jsx)(s.cc,{variant:"primary",onClick:()=>Z(!1),children:"Close"})})]})}),G&&(0,d.jsx)(j,{show:G,onClick:()=>J(!1),children:(0,d.jsxs)(f,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Confirm Action"}),(0,d.jsx)(w,{onClick:()=>J(!1),children:"\xd7"})]}),(0,d.jsx)(B,{children:(0,d.jsxs)("p",{children:["delete"===Y&&`Are you sure you want to delete subscription for ${null===O||void 0===O?void 0:O.restaurantName}?`,"suspend"===Y&&`Are you sure you want to suspend subscription for ${null===O||void 0===O?void 0:O.restaurantName}?`,"activate"===Y&&`Are you sure you want to activate subscription for ${null===O||void 0===O?void 0:O.restaurantName}?`]})}),(0,d.jsxs)(k,{children:[(0,d.jsx)(s.cc,{variant:"cancel",onClick:()=>J(!1),children:"Cancel"}),(0,d.jsx)(s.cc,{variant:"delete"===Y?"danger":"primary",onClick:async()=>{if(O&&Y){try{"delete"===Y?(console.log("Deleting subscription:",O.id),W("Subscription deleted successfully")):"suspend"===Y?W("Subscription suspended successfully"):"activate"===Y&&W("Subscription activated successfully"),$(!0),await Se()}catch(e){console.error("Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}J(!1),U(null),q(null)}},children:"delete"===Y?"Delete":"suspend"===Y?"Suspend":"Activate"})]})]})})]})]})})}}}]);