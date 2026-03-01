"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9327],{2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var a=n(8819),r=(n(9950),n(4752)),o=n(4414);const i=r.Ay.div`
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
`,s=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${a.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
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
`,l=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
  }

  &:disabled {
    background: ${a.w.colors.surfaceHover};
    color: ${a.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:n,style:a,...r}=e;return(0,o.jsx)(i,{className:n,style:a,...r,children:t})},c=e=>{let{placeholder:t="Search...",...n}=e;return(0,o.jsx)(s,{placeholder:t,...n})},p=e=>{let{children:t,...n}=e;return(0,o.jsx)(l,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>o.$n});var a=n(8819),r=n(4752),o=n(8829);r.Ay.select`
  padding: ${a.w.components.form.inputPadding};
  border: 1px solid ${a.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${a.w.typography.fontSize.sm};
  background: ${a.w.colors.surface};
  color: ${a.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: ${a.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${a.w.colors.borderHover};
  }
`,r.Ay.input`
  padding: ${a.w.components.form.inputPadding};
  border: 1px solid ${a.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${a.w.typography.fontSize.sm};
  background: ${a.w.colors.surface};
  color: ${a.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: ${a.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${a.w.colors.borderHover};
  }
`,r.Ay.div`
  background: ${a.w.colors.surface};
  border-radius: ${a.w.borderRadius.md};
  border: 1px solid ${a.w.colors.borderLight};
  padding: ${a.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${a.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${a.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${a.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9327:(e,t,n)=>{n.r(t),n.d(t,{default:()=>C});var a=n(8819),r=n(9950),o=n(4752),i=n(3705),s=n(2674),l=n(2488),d=n(4414);const c=(0,o.Ay)(s.A0)`
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
`,p=(0,o.Ay)(s.Hj)`
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
`,u=o.Ay.div``,h=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,x=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,m=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,g=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.planType){case"basic":return"#DBEAFE";case"professional":return"#E4E7FF";case"enterprise":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.planType){case"basic":return"#1E40AF";case"professional":return"#6366F1";case"enterprise":return"#D97706";default:return"#6B7280"}}};
`,y=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,j=o.Ay.div`
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
`,f=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${a.w.colors.text.muted};
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
`,v=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,b=o.Ay.div`
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
`,w=o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,S=o.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,C=()=>{const[e,t]=(0,r.useState)([]),[n,a]=(0,r.useState)(""),[o,C]=(0,r.useState)("active"),[B,A]=(0,r.useState)(!1),[k,T]=(0,r.useState)(!1),[D,E]=(0,r.useState)(""),[R,_]=(0,r.useState)(null),[M,$]=(0,r.useState)(!1),[z,N]=(0,r.useState)(null),[I,P]=(0,r.useState)(!1),[L,W]=(0,r.useState)(null),[O,U]=(0,r.useState)(!1),[V,Q]=(0,r.useState)(null),[H,Z]=(0,r.useState)({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+31536e6).toISOString().split("T")[0]}),[G,J]=(0,r.useState)(""),[X,q]=(0,r.useState)(!1),[Y,K]=(0,r.useState)({managers:[],restaurants:[]}),[ee,te]=(0,r.useState)(null),[ne,ae]=(0,r.useState)([]),[re,oe]=(0,r.useState)([]),[ie,se]=(0,r.useState)([]),[le,de]=(0,r.useState)([]),[ce,pe]=(0,r.useState)([]),[ue,he]=(0,r.useState)("restaurant");(0,r.useEffect)(()=>{me(),ge(),ye(),xe()},[]);const xe=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=(await e.json()).filter(e=>e.is_active);pe(t)}}catch(e){console.error("Error fetching plans:",e)}},me=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API...");const e=await fetch("/api/restaurants");if(!e.ok)throw new Error("Failed to fetch restaurants");const n=await e.json(),a=(Array.isArray(n)?n:[]).map((e,t)=>{var n,a,r,o;const i=(null===(n=e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic";let s="active";"active"===e.status?s="active":"inactive"===e.status?s="suspended":"cancelled"===e.status&&(s="cancelled");const l={basic:50,professional:200,enterprise:-1};return{id:`sub-${e.id}`,restaurantId:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${t}`,restaurantName:e.name||"Restaurant Name",managerId:(null===(r=e.managerId||e.admin_id)||void 0===r?void 0:r.toString())||"",managerName:e.managerName||e.admin_name||"No Manager Assigned",planType:i,status:s,startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"2024-01-01",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+31536e6).toISOString().split("T")[0],monthlyFee:parseFloat(e.plan_amount)||29,billingCycle:"monthly",paymentModel:"manager",payerId:(null===(o=e.managerId||e.admin_id)||void 0===o?void 0:o.toString())||"",payerName:e.managerName||e.admin_name||"No Manager",menuItemLimit:l[i]||50,currentMenuItems:Math.floor(Math.random()*(l[i]>0?.7*l[i]:150))+10,features:[],lastPayment:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",nextPayment:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:void 0!==e.auto_renew?e.auto_renew:"active"===s,location:e.address||"Location not specified",discountType:e.discount_type||"none",discountValue:parseFloat(e.discount_value)||0,discountReason:e.discount_reason||""}});t(a)}catch(e){console.error("\u274c Error fetching subscriptions:",e),t([])}},ge=async()=>{try{const e=localStorage.getItem("auth_token"),t=e?{Authorization:`Bearer ${e}`}:{},n=await fetch("/api/restaurants",{headers:t}),a=await fetch("/api/users?role=Manager",{headers:t});if(n.ok&&a.ok){const e=await n.json(),t=await a.json(),r=Array.isArray(e)?e:e.data||[],o=Array.isArray(t)?t:t.data||[];ae(r),oe(o),se(r)}}catch(e){console.error("Error fetching available data:",e)}},ye=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=await e.json(),n=(Array.isArray(t)?t:[]).filter(e=>"custom"===e.category);de(n)}}catch(e){console.error("Error fetching custom plans:",e)}},je=e.filter(e=>{const t=e.restaurantName.toLowerCase().includes(n.toLowerCase())||e.managerName.toLowerCase().includes(n.toLowerCase())||e.location.toLowerCase().includes(n.toLowerCase()),a="all"===o||e.status===o;return t&&a}),fe=e.length,ve=e.filter(e=>"active"===e.status).length,be=e.filter(e=>"trial"===e.status).length,we=e.filter(e=>"active"===e.status).reduce((e,t)=>e+t.monthlyFee,0),Se=e=>{J(e),q(!0);const t=re.filter(e=>"brand"===ue?"Brand Manager"===e.role||"Brand General"===e.role:"foodcourt"===ue?"Foodcourt Manager"===e.role||"Foodcourt General"===e.role:"owner"!==ue||"Restaurant Owner"===e.role);if(e.length<1)return void K({managers:t.slice(0,10),restaurants:ie.slice(0,10)});const n=t.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase())),a=ie.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase())||t.address&&t.address.toLowerCase().includes(e.toLowerCase()));K({managers:n.slice(0,10),restaurants:a.slice(0,10)})},Fe=(e,t)=>{te({type:e,data:t}),q(!1),J("manager"===e?t.fullName||t.full_name||t.username:t.name);let n="restaurant";if("manager"===e&&("Restaurant Owner"===t.role?n="restaurant_owner":"Foodcourt Manager"===t.role||"Foodcourt General"===t.role?n="foodcourt_manager":"Brand Manager"!==t.role&&"Brand General"!==t.role||(n="brand_manager")),"manager"===e){var a;Z({...H,managerId:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",managerName:t.fullName||t.full_name||t.username||"",restaurantId:"",restaurantName:"",paymentModel:n})}else{var r,o;const e=t,n=re.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});Z({...H,restaurantId:(null===(r=e.id)||void 0===r?void 0:r.toString())||"",restaurantName:e.name||"",managerId:(null===(o=e.admin_id)||void 0===o?void 0:o.toString())||"",managerName:n?n.fullName||n.full_name||n.username:"No Manager Assigned",email:e.email||"",phone:e.phone||"",address:e.address||"",paymentModel:"restaurant"})}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(s.mc,{children:[(0,d.jsxs)(s.Y9,{children:[(0,d.jsx)(s.hE,{children:"Subscriptions"}),(0,d.jsxs)(s.ex,{children:[(0,d.jsx)(i.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const t=Object.keys(e[0]);return[t.join(","),...e.map(e=>t.map(t=>{const n=e[t];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(je.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.managerName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":`RM ${e.monthlyFee}`,"Next Payment":e.nextPayment||"N/A",Location:e.location,Manager:e.managerName}))),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=`subscriptions-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(n)},children:"Export"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=ce.filter(e=>e.plan_target===ue),t=e.length>0?e[0]:null;Z({restaurantId:"",managerId:"",managerName:"",restaurantName:"",planType:t?t.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",paymentModel:"restaurant"===ue?"restaurant":"owner"===ue?"restaurant_owner":"brand"===ue?"brand_manager":"foodcourt_manager",autoRenew:!1,email:"",phone:"",address:"",monthlyFee:t?parseFloat(t.base_price_monthly):29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),te(null),J(""),A(!0)},children:"Add Subscription"})]})]}),(0,d.jsxs)(s.UC,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{color:"#059669",children:[(0,d.jsx)(s.Os,{children:fe}),(0,d.jsx)(s.v0,{children:"Total Subscriptions"}),(0,d.jsx)(s.d1,{children:"Across all restaurants"})]}),(0,d.jsxs)(s.hI,{color:"#2563EB",children:[(0,d.jsx)(s.Os,{children:ve}),(0,d.jsx)(s.v0,{children:"Active Subscriptions"}),(0,d.jsxs)(s.d1,{children:[fe>0?Math.round(ve/fe*100):0,"% operational"]})]}),(0,d.jsxs)(s.hI,{color:"#7C3AED",children:[(0,d.jsx)(s.Os,{children:be}),(0,d.jsx)(s.v0,{children:"Trial Subscriptions"}),(0,d.jsx)(s.d1,{children:"Currently evaluating"})]}),(0,d.jsxs)(s.hI,{color:"#D97706",children:[(0,d.jsxs)(s.Os,{children:["RM ",we.toLocaleString()]}),(0,d.jsx)(s.v0,{children:"Monthly Revenue"}),(0,d.jsx)(s.d1,{children:"From active subscriptions"})]})]}),(0,d.jsxs)(l.Qn,{children:[(0,d.jsx)(l.DO,{placeholder:"Search subscriptions...",value:n,onChange:e=>a(e.target.value)}),(0,d.jsxs)(l.Jt,{value:o,onChange:e=>C(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsxs)(s.XI,{children:[(0,d.jsxs)(c,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,d.jsx)("span",{children:"Restaurant Info"}),(0,d.jsx)("span",{children:"Plan"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Menu Items"}),(0,d.jsx)("span",{children:"Monthly Fee"}),(0,d.jsx)("span",{children:"Expires In"}),(0,d.jsx)("span",{children:"Auto-Renew"}),(0,d.jsx)("span",{children:"Actions"})]}),je.map(e=>(0,d.jsxs)(p,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,d.jsxs)(s.Np,{children:[(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Restaurant Info"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(h,{children:e.restaurantName}),(0,d.jsxs)(x,{children:[e.managerName," \u2022 ",e.location]})]})]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Plan"}),(0,d.jsx)(g,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Status"}),(0,d.jsx)(m,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Monthly Fee"}),"none"!==e.discountType&&e.discountValue>0?(0,d.jsxs)("div",{children:[(0,d.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px"},children:["RM ",e.monthlyFee]}),(0,d.jsxs)("div",{style:{color:"#15803D",fontWeight:"600"},children:["RM ",("percentage"===e.discountType?e.monthlyFee*(1-e.discountValue/100):Math.max(0,e.monthlyFee-e.discountValue)).toFixed(2)]})]}):(0,d.jsxs)(d.Fragment,{children:["RM ",e.monthlyFee]})]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Expires In"}),(()=>{const t=new Date,n=new Date(e.endDate).getTime()-t.getTime(),a=Math.ceil(n/864e5);return a<0?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===a?(0,d.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):a<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[a," days"]}):a<=30?(0,d.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[a," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[a," days"]})})()]}),(0,d.jsxs)(s.Uj,{children:[(0,d.jsx)(s.PM,{children:"Auto-Renew"}),e.autoRenew?(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,d.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,d.jsxs)(s.wr,{children:[(0,d.jsx)(s.rA,{onClick:()=>{Q(e),U(!0)},children:"View"}),(0,d.jsx)(s.rA,{onClick:()=>(e=>{W(e),P(!0)})(e),children:"Edit"}),(0,d.jsx)(s.K0,{onClick:()=>(e=>{_(e),N("active"===e.status?"suspend":"activate"),$(!0)})(e),title:"active"===e.status?"Suspend Subscription":"Activate Subscription",children:(0,d.jsx)(y,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,d.jsx)(s.K0,{onClick:()=>(e=>{_(e),N("delete"),$(!0)})(e),title:"Delete Subscription",children:(0,d.jsx)(y,{children:"\u2715"})})]})]},e.id))]}),B&&(0,d.jsx)(s.mH,{show:B,onClick:()=>A(!1),children:(0,d.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsx)(s.wt,{children:"Add Subscription"}),(0,d.jsx)(f,{onClick:()=>A(!1),children:"\xd7"})]}),(0,d.jsx)(s.cw,{children:(0,d.jsxs)(F,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"User Type *"}),(0,d.jsxs)(l.Jt,{value:ue,onChange:e=>{const t=e.target.value;he(t),te(null),J("");const n=ce.filter(e=>e.plan_target===t),a=n.length>0?n[0]:null;a&&Z(e=>({...e,planType:a.display_name,monthlyFee:parseFloat(a.base_price_monthly),paymentModel:"restaurant"===t?"restaurant":"owner"===t?"restaurant_owner":"brand"===t?"brand_manager":"foodcourt_manager"}))},children:[(0,d.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,d.jsx)("option",{value:"owner",children:"Restaurant Owner"}),(0,d.jsx)("option",{value:"brand",children:"Brand Manager"}),(0,d.jsx)("option",{value:"foodcourt",children:"Foodcourt Manager"})]})]}),(0,d.jsxs)(s.gE,{style:{position:"relative",zIndex:100},children:[(0,d.jsx)(s.lR,{children:"restaurant"===ue?"Search Restaurant *":"owner"===ue?"Search Owner *":"Search Manager *"}),(0,d.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,d.jsx)(s.ZQ,{type:"text",value:G,onChange:e=>Se(e.target.value),onFocus:()=>{q(!0),G.length<1&&Se("")},onBlur:()=>setTimeout(()=>q(!1),200),placeholder:"restaurant"===ue?"Click to search restaurants...":"owner"===ue?"Click to search owners...":"Click to search managers...",required:!0}),X&&(0,d.jsxs)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:9999,boxShadow:"0 8px 16px rgba(0, 0, 0, 0.15)"},children:["restaurant"!==ue&&Y.managers.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"owner"===ue?"OWNERS":"MANAGERS"}),Y.managers.map(e=>(0,d.jsxs)("div",{onClick:()=>Fe("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName||e.full_name||e.username}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email})]},e.id))]}),"restaurant"===ue&&Y.restaurants.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Y.restaurants.map(e=>{const t=re.find(t=>{var n,a;return(null===(n=t.id)||void 0===n?void 0:n.toString())===(null===(a=e.admin_id)||void 0===a?void 0:a.toString())});return(0,d.jsxs)("div",{onClick:()=>Fe("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:"No Admin",t?` \u2022 Manager: ${t.fullName||t.full_name||t.username}`:""]})]},e.id)})]})]})]}),ee&&(0,d.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ee.type?ee.data.fullName||ee.data.full_name||ee.data.username:ee.data.name}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ee.type?"Manager":`${ee.data.admin?`Admin: ${ee.data.admin.name}`:"No Admin"} \u2022 ${ee.data.address||"No address"}`})]}),(0,d.jsx)("button",{onClick:()=>{te(null),J("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Subscription Plan *"}),(0,d.jsxs)(s.FX,{value:H.customPlanName||"",onChange:e=>{const t=e.target.value;if("others"===t)Z({...H,planType:"custom",customPlanName:"others",monthlyFee:0});else if(t){const e=ce.find(e=>e.display_name===t);Z({...H,planType:"custom",customPlanName:t,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}else Z({...H,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),ce.filter(e=>e.plan_target===ue).map(e=>(0,d.jsxs)("option",{value:e.display_name,children:[e.display_name," - RM ",e.base_price_monthly]},e.id)),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===H.customPlanName&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Custom Plan Name *"}),(0,d.jsx)(s.ZQ,{type:"text",value:"",onChange:e=>Z({...H,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Monthly Fee (RM) *"}),(0,d.jsx)(s.ZQ,{type:"number",step:"0.01",min:"0",value:H.monthlyFee,onChange:e=>Z({...H,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,d.jsx)(s.gE,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===H.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===H.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:"trial"===H.status,onChange:e=>{if(e.target.checked){const e=new Date,t=new Date;t.setDate(t.getDate()+7),Z({...H,status:"trial",startDate:e.toISOString().split("T")[0],endDate:t.toISOString().split("T")[0],monthlyFee:0})}else Z({...H,status:"active",monthlyFee:29})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"Subscription will start with a 7-day free trial period"})]})]})}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Billing Cycle *"}),(0,d.jsxs)(s.FX,{value:H.billingCycle||"monthly",onChange:e=>{const t=e.target.value,n={basic:{monthly:29,annual:290},professional:{monthly:99,annual:990},enterprise:{monthly:199,annual:2190}},a=n[H.planType]||n.basic;Z({...H,billingCycle:t,monthlyFee:a[t]})},children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Subscription Start Date *"}),(0,d.jsx)(s.ZQ,{type:"date",value:H.startDate,onChange:e=>Z({...H,startDate:e.target.value})})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Subscription End Date *"}),(0,d.jsx)(s.ZQ,{type:"date",value:H.endDate,onChange:e=>Z({...H,endDate:e.target.value})})]}),(0,d.jsx)(s.gE,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:H.autoRenew||!1,onChange:e=>Z({...H,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,d.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,d.jsx)("strong",{children:"Summary:"})}),(0,d.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:["custom"===H.planType?H.customPlanName||"Custom Plan":"basic"===H.planType?"Basic":"professional"===H.planType?"Professional":"Enterprise"," Plan - RM ",H.monthlyFee||29," (",H.billingCycle||"monthly",")"]}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",ee?"restaurant"===ee.type?`${ee.data.name} (Restaurant Admin)`:(()=>{const e="Foodcourt Manager"===ee.data.role?"Foodcourt Manager":"Foodcourt General"===ee.data.role?"Foodcourt General Manager":"Brand Manager"===ee.data.role?"Brand Manager":"Brand General"===ee.data.role?"Brand General Manager":"Manager";return`${ee.data.fullName||ee.data.full_name||ee.data.username} (${e})`})():"Not selected"]})]})]})}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>A(!1),children:"Cancel"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{var e,t;if(!ee)return void alert("Please select a manager or restaurant");const n={restaurantId:H.restaurantId,restaurantName:H.restaurantName,managerId:H.managerId,managerName:H.managerName,planType:H.customPlanName||"Custom Plan",monthlyFee:H.monthlyFee,billingCycle:H.billingCycle,startDate:H.startDate,endDate:H.endDate,status:H.status,autoRenew:H.autoRenew,paymentModel:H.paymentModel};let a="",r="",o="",i="";if("restaurant"===ee.type){a=ee.data.name,i=ee.data.name,o=ee.data.name;const e=[];ee.data.address&&e.push(ee.data.address),ee.data.phone&&e.push(`Phone: ${ee.data.phone}`),ee.data.email&&e.push(`Email: ${ee.data.email}`),r=e.join("\n")}else if("manager"===ee.type){a=ee.data.fullName||ee.data.full_name||ee.data.username,o=ee.data.companyName||a,i=H.restaurantName||"";const e=[];ee.data.companyName&&e.push(ee.data.companyName),ee.data.email&&e.push(`Email: ${ee.data.email}`),r=e.join("\n")}const s=H.customPlanName||"Custom Plan",l=new Date(new Date(H.startDate).getTime()+12096e5).toISOString().split("T")[0],d="restaurant"===ee.type?"restaurant":"Restaurant Owner"===ee.data.role?"restaurant_owner":null!==(e=ee.data.role)&&void 0!==e&&e.includes("Foodcourt")?"foodcourt_manager":null!==(t=ee.data.role)&&void 0!==t&&t.includes("Brand")?"brand_manager":"restaurant",c={invoice_data:{restaurant_id:"restaurant"===ee.type?ee.data.id:null,due_date:l,total_amount:H.monthlyFee,currency:"MYR",status:"pending_payment",type:"manual",issuer_type:"system_admin",issuer_id:null,payer_type:d,payer_id:"manager"===ee.type?ee.data.id:ee.data.admin_id||null,invoice_category:"subscription",category_display_name:`Subscription - ${s}`,billing_period_start:H.startDate,billing_period_end:H.endDate||l,notes:`POS Subscription: ${s} (${H.billingCycle})`},items:[{item_type:"subscription",description:`${s} - ${"annual"===H.billingCycle?"Annual":"Monthly"} Subscription`,calculation_method:"fixed",fixed_amount:H.monthlyFee,calculated_amount:H.monthlyFee,tax_rate:0,tax_amount:0,total_amount:H.monthlyFee}]};if("restaurant"===ee.type&&ee.data.id){const e={plan_type:H.customPlanName||"Custom Plan",plan_amount:H.monthlyFee,billing_cycle:H.billingCycle,subscription_start:H.startDate,subscription_end:H.endDate,status:H.status,auto_renew:H.autoRenew},t=localStorage.getItem("auth_token");if(!(await fetch(`/api/restaurants/${ee.data.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription")}const p=localStorage.getItem("auth_token"),u=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",...p?{Authorization:`Bearer ${p}`}:{}},body:JSON.stringify(c)});if(!u.ok){const e=await u.json().catch(()=>({error:"Unknown error"}));throw new Error(e.error||"Failed to create invoice")}console.log("Subscription and invoice created:",n),A(!1),E("Subscription added and invoice generated successfully!"),T(!0),await me()}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}},disabled:!H.restaurantId,children:"Add Subscription"})]})]})}),k&&(0,d.jsx)(s.mH,{show:k,onClick:()=>T(!1),children:(0,d.jsxs)(v,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(b,{children:"\u2713"}),(0,d.jsx)(w,{children:"Success!"}),(0,d.jsx)(S,{children:D}),(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>T(!1),children:"OK"})]})}),I&&L&&(0,d.jsx)(s.mH,{show:I,onClick:()=>P(!1),children:(0,d.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsx)(s.wt,{children:"Edit Custom Subscription"}),(0,d.jsx)(f,{onClick:()=>P(!1),children:"\xd7"})]}),(0,d.jsx)(s.cw,{children:(0,d.jsxs)(F,{children:[(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Restaurant *"}),(0,d.jsx)(s.ZQ,{type:"text",value:L.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Custom Subscription Plan *"}),(0,d.jsxs)(s.FX,{value:L.planType,onChange:e=>{const t=e.target.value;if("others"===t)W({...L,planType:"custom",monthlyFee:0});else if(t){const e=le.find(e=>e.name===t);W({...L,planType:t,monthlyFee:(null===e||void 0===e?void 0:e.monthly_price)||0})}},children:[(0,d.jsx)("option",{value:"",children:"Select Plan"}),le.map(e=>(0,d.jsxs)("option",{value:e.name,children:[e.display_name," - RM ",e.monthly_price]},e.id)),(0,d.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===L.planType&&(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Custom Plan Name *"}),(0,d.jsx)(s.ZQ,{type:"text",value:"",onChange:e=>W({...L,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Monthly Fee (RM) *"}),(0,d.jsx)(s.ZQ,{type:"number",step:"0.01",min:"0",value:L.monthlyFee,onChange:e=>W({...L,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Status *"}),(0,d.jsxs)(s.FX,{value:L.status,onChange:e=>W({...L,status:e.target.value}),children:[(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Billing Cycle *"}),(0,d.jsxs)(s.FX,{value:L.billingCycle||"monthly",onChange:e=>W({...L,billingCycle:e.target.value}),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Subscription Start Date *"}),(0,d.jsx)(s.ZQ,{type:"date",value:L.startDate,onChange:e=>W({...L,startDate:e.target.value})})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Subscription End Date *"}),(0,d.jsx)(s.ZQ,{type:"date",value:L.endDate,onChange:e=>W({...L,endDate:e.target.value})})]}),(0,d.jsx)(s.gE,{style:{gridColumn:"1 / -1"},children:(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,d.jsx)("input",{type:"checkbox",checked:L.autoRenew||!1,onChange:e=>W({...L,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,d.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,d.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Discount"})}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"Discount Type"}),(0,d.jsxs)(s.FX,{value:L.discountType||"none",onChange:e=>W({...L,discountType:e.target.value,discountValue:"none"===e.target.value?0:L.discountValue}),children:[(0,d.jsx)("option",{value:"none",children:"None"}),(0,d.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),"none"!==L.discountType&&(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(s.lR,{children:"percentage"===L.discountType?"Discount Rate (%)":"Discount Amount (RM)"}),(0,d.jsx)(s.ZQ,{type:"number",step:"percentage"===L.discountType?"1":"0.01",min:"0",max:"percentage"===L.discountType?"100":void 0,value:L.discountValue,onChange:e=>W({...L,discountValue:parseFloat(e.target.value)||0}),placeholder:"percentage"===L.discountType?"e.g. 10":"e.g. 50.00"})]}),"none"!==L.discountType&&(0,d.jsxs)(s.gE,{style:{gridColumn:"1 / -1"},children:[(0,d.jsx)(s.lR,{children:"Discount Reason"}),(0,d.jsx)(s.ZQ,{type:"text",value:L.discountReason||"",onChange:e=>W({...L,discountReason:e.target.value}),placeholder:"e.g. Opening promotion, Loyalty discount"})]}),"none"!==L.discountType&&L.discountValue>0&&(0,d.jsxs)("div",{style:{gridColumn:"1 / -1",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px",padding:"12px 16px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",fontWeight:"600",marginBottom:"4px"},children:"Discount Preview"}),(0,d.jsxs)("div",{style:{fontSize:"13px",color:"#15803D"},children:["Monthly Fee: RM ",L.monthlyFee.toFixed(2)," \u2192"," ",(0,d.jsxs)("strong",{children:["RM ",("percentage"===L.discountType?L.monthlyFee*(1-L.discountValue/100):Math.max(0,L.monthlyFee-L.discountValue)).toFixed(2)]})," ","(-","percentage"===L.discountType?`${L.discountValue}%`:`RM ${L.discountValue.toFixed(2)}`,")"]})]})]})}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>P(!1),children:"Cancel"}),(0,d.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(L)try{console.log("\ud83d\udd04 Updating subscription:",L);const e={name:L.restaurantName,managerId:L.managerId||null,planType:"basic"===L.planType?"Basic Plan":"professional"===L.planType?"Professional Plan":"Enterprise Plan",planAmount:L.monthlyFee,status:"active"===L.status?"active":"inactive",subscriptionStart:L.startDate,subscriptionEnd:L.endDate,discount_type:L.discountType||"none",discount_value:L.discountValue||0,discount_reason:L.discountReason||null};console.log("\ud83d\udce4 Sending update data:",e);const t=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${L.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(console.log("\ud83d\udce1 Subscription update API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 Subscription updated successfully:",e),P(!1),W(null),console.log("\ud83d\udd04 Re-fetching subscription data..."),await me(),E("Subscription updated successfully!"),T(!0),console.log("\u2705 Modal closed and data refreshed")}else{const e=await n.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update subscription:",e),alert(`Error updating subscription: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating subscription:",e),alert("Error updating subscription. Please check your connection and try again.")}},children:"Update Subscription"})]})]})}),O&&V&&(0,d.jsx)(s.mH,{show:O,onClick:()=>U(!1),children:(0,d.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsx)(s.wt,{children:"Subscription Details"}),(0,d.jsx)(f,{onClick:()=>U(!1),children:"\xd7"})]}),(0,d.jsx)(s.cw,{children:(0,d.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.restaurantName})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Manager"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.managerName})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.location})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.planType.charAt(0).toUpperCase()+V.planType.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,d.jsx)("div",{children:(0,d.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===V.status?"#DCFCE7":"#FEF3C7",color:"active"===V.status?"#15803D":"#92400E"},children:V.status.charAt(0).toUpperCase()+V.status.slice(1)})})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),"none"!==V.discountType&&V.discountValue>0?(0,d.jsxs)("div",{children:[(0,d.jsxs)("span",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"13px"},children:["RM ",V.monthlyFee]}),(0,d.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#15803D"},children:["RM ",("percentage"===V.discountType?V.monthlyFee*(1-V.discountValue/100):Math.max(0,V.monthlyFee-V.discountValue)).toFixed(2),(0,d.jsxs)("span",{style:{fontSize:"12px",fontWeight:"500",marginLeft:"4px"},children:["(-","percentage"===V.discountType?`${V.discountValue}%`:`RM ${V.discountValue}`,")"]})]})]}):(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:["RM ",V.monthlyFee]})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.billingCycle.charAt(0).toUpperCase()+V.billingCycle.slice(1)})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.autoRenew?(0,d.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,d.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),"none"!==V.discountType&&V.discountValue>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Discount"}),(0,d.jsxs)("div",{style:{background:"#F0FDF4",padding:"16px",borderRadius:"8px",border:"1px solid #BBF7D0"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Type"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===V.discountType?"Percentage":"Fixed Amount"})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Value"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:"percentage"===V.discountType?`${V.discountValue}%`:`RM ${V.discountValue.toFixed(2)}`})]}),V.discountReason&&(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#166534",marginBottom:"4px"},children:"Reason"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#15803D"},children:V.discountReason})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.startDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.endDate})]}),(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Next Payment"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:V.nextPayment})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,t=new Date(V.endDate).getTime()-e.getTime(),n=Math.ceil(t/864e5);return n<0?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===n?(0,d.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):n<=7?(0,d.jsxs)("span",{style:{color:"#F59E0B"},children:[n," days"]}):n<=30?(0,d.jsxs)("span",{style:{color:"#10B981"},children:[n," days"]}):(0,d.jsxs)("span",{style:{color:"#6B7280"},children:[n," days"]})})()})]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,d.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,d.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,d.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[V.currentMenuItems," / ",-1===V.menuItemLimit?"\u221e":V.menuItemLimit]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Payment Model"}),(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:"restaurant"===V.paymentModel?"Restaurant Admin":"Manager"})]})]})]})]})}),(0,d.jsx)(s.jl,{children:(0,d.jsx)(i.cc,{variant:"primary",onClick:()=>U(!1),children:"Close"})})]})}),M&&(0,d.jsx)(s.mH,{show:M,onClick:()=>$(!1),children:(0,d.jsxs)(j,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(s.rQ,{children:[(0,d.jsx)(s.wt,{children:"Confirm Action"}),(0,d.jsx)(f,{onClick:()=>$(!1),children:"\xd7"})]}),(0,d.jsx)(s.cw,{children:(0,d.jsxs)("p",{children:["delete"===z&&`Are you sure you want to delete subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`,"suspend"===z&&`Are you sure you want to suspend subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`,"activate"===z&&`Are you sure you want to activate subscription for ${null===R||void 0===R?void 0:R.restaurantName}?`]})}),(0,d.jsxs)(s.jl,{children:[(0,d.jsx)(i.cc,{variant:"cancel",onClick:()=>$(!1),children:"Cancel"}),(0,d.jsx)(i.cc,{variant:"delete"===z?"danger":"primary",onClick:async()=>{if(R&&z){try{const e=localStorage.getItem("auth_token"),t={"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}};if("delete"===z){console.log("Deleting subscription:",R.id,"restaurantId:",R.restaurantId);const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"DELETE",headers:t});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to delete subscription")}E("Subscription deleted successfully")}else if("suspend"===z){const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"inactive"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to suspend subscription")}E("Subscription suspended successfully")}else if("activate"===z){const e=await fetch(`/api/restaurants/${R.restaurantId}`,{method:"PUT",headers:t,body:JSON.stringify({status:"active"})});if(!e.ok){const t=await e.json().catch(()=>({error:"Unknown error"}));throw new Error(t.error||"Failed to activate subscription")}E("Subscription activated successfully")}T(!0),await me()}catch(e){console.error("Action failed:",e),alert(`Action failed: ${e.message||"Unknown error"}. Please try again.`)}$(!1),_(null),N(null)}},children:"delete"===z?"Delete":"suspend"===z?"Suspend":"Activate"})]})]})})]})]})})}}}]);