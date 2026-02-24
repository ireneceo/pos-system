"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var i=n(4752),r=n(4414);const s=i.Ay.div`
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
`,a=i.Ay.input`
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
`,o=i.Ay.select`
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
`,l=e=>{let{children:t,className:n,style:i,...a}=e;return(0,r.jsx)(s,{className:n,style:i,...a,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(a,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,r.jsx)(o,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>r});var i=n(4752);const r=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var i=n(9950),r=n(1367),s=n(6038);const a=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[a,o]=(0,i.useState)(Object.keys(s.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),i=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";n(i)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),n("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:l,error:c}}},6950:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});var i=n(9950),r=n(4752),s=n(3310),a=n(1367),o=n(6038),l=n(4021),d=n(3705),c=n(2488),p=n(2674),x=n(4414);const h=(0,r.Ay)(p.A0)`
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
`,u=(0,r.Ay)(p.Hj)`
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
`,m=r.Ay.div``,y=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,g=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,j=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"overdue":return"#FEF9C3";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"overdue":return"#CA8A04";case"expired":case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,v=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.planType){case"basic":return"#DBEAFE";case"professional":return"#E4E7FF";case"enterprise":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.planType){case"basic":return"#1E40AF";case"professional":return"#6366F1";case"enterprise":return"#D97706";default:return"#6B7280"}}};
`,b=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,f=r.Ay.div`
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
`,w=r.Ay.div`
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
`,F=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,S=r.Ay.button`
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
`,A=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,B=r.Ay.div`
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
`,k=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,E=r.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,D=r.Ay.div`
  padding: 24px;
`,z=r.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,T=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  & > * {
    min-width: 0;
  }
`,N=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,I=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,P=r.Ay.input`
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
`,R=r.Ay.select`
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
`,_=r.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,M=r.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,$=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,L=r.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,O=r.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,W=()=>{const{user:e}=(0,a.As)(),{defaultCurrency:t}=(0,l.i1)(),n=t||"MYR",r=localStorage.getItem("auth_token"),[W,U]=(0,i.useState)([]),[J,Y]=(0,i.useState)(!0),[q,H]=(0,i.useState)(""),[K,G]=(0,i.useState)("active"),[Q,V]=(0,i.useState)(!1),[X,Z]=(0,i.useState)(""),[ee,te]=(0,i.useState)(!1),[ne,ie]=(0,i.useState)([]),[re,se]=(0,i.useState)(null),[ae,oe]=(0,i.useState)([]),[le,de]=(0,i.useState)([]),[ce,pe]=(0,i.useState)({restaurantId:"",restaurantName:"",adminName:"",planType:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",autoRenew:!1,monthlyFee:29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),[xe,he]=(0,i.useState)(!1),[ue,me]=(0,i.useState)(null),[ye,ge]=(0,i.useState)(!1),[je,ve]=(0,i.useState)(null),[be,fe]=(0,i.useState)(!1),[we,Fe]=(0,i.useState)(null),[Ce,Se]=(0,i.useState)(null),[Ae,Be]=(0,i.useState)(!1),[ke,Ee]=(0,i.useState)(""),[De,ze]=(0,i.useState)([]);(0,i.useEffect)(()=>{Te(),Ne()},[]);const Te=(0,i.useCallback)(async()=>{Y(!0);try{const e=r?{Authorization:`Bearer ${r}`}:{},t=await fetch("/api/restaurants",{headers:e});if(!t.ok)throw new Error("Failed to fetch restaurants");const n=await t.json(),i=Array.isArray(n)?n:[];oe(i);const s=i.map(e=>{var t,n,i;const r=(null===(t=e.plan_type)||void 0===t?void 0:t.toLowerCase().replace(" plan",""))||"basic";let s="active";"active"===e.status?s="active":"trial"===e.status?s="trial":"inactive"===e.status?s="suspended":"expired"===e.status?s="expired":"cancelled"===e.status&&(s="cancelled");const a={basic:50,professional:200,enterprise:-1};return{id:`sub-${e.id}`,restaurantId:(null===(n=e.id)||void 0===n?void 0:n.toString())||"",restaurantName:e.name||"Restaurant Name",adminId:(null===(i=e.managerId||e.admin_id)||void 0===i?void 0:i.toString())||"",adminName:e.managerName||e.admin_name||"No Admin Assigned",planType:r,status:s,startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"2024-01-01",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:new Date(Date.now()+31536e6).toISOString().split("T")[0],monthlyFee:parseFloat(e.plan_amount)||29,billingCycle:e.billing_cycle||"monthly",menuItemLimit:e.menu_item_limit||a[r]||50,currentMenuItems:Math.floor(Math.random()*((e.menu_item_limit||a[r]||50)>0?.7*(e.menu_item_limit||a[r]||50):150))+10,autoRenew:"active"===s,location:e.address||"Location not specified",email:e.email||"",phone:e.phone||""}});U(s)}catch(e){console.error("Error fetching subscriptions:",e),U([])}finally{Y(!1)}},[r]),Ne=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const t=await e.json(),n=Array.isArray(t)?t.filter(e=>e.is_active):[];de(n);const i=n.filter(e=>"custom"===e.category);ze(i)}}catch(e){console.error("Error fetching plans:",e)}},Ie=W.filter(e=>{const t=e.restaurantName.toLowerCase().includes(q.toLowerCase())||e.adminName.toLowerCase().includes(q.toLowerCase())||e.location.toLowerCase().includes(q.toLowerCase()),n="all"===K||e.status===K;return t&&n}),Pe=W.length,Re=W.filter(e=>"active"===e.status).length,_e=W.filter(e=>"trial"===e.status).length,Me=W.filter(e=>"active"===e.status).reduce((e,t)=>e+t.monthlyFee,0),$e=e=>{if(Z(e),te(!0),e.length<1)return void ie(ae.slice(0,10));const t=ae.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase())||t.address&&t.address.toLowerCase().includes(e.toLowerCase()));ie(t.slice(0,10))};return(0,x.jsx)(s.A,{children:(0,x.jsxs)(p.mc,{children:[(0,x.jsxs)(p.Y9,{children:[(0,x.jsx)(p.hE,{children:"Subscriptions"}),(0,x.jsxs)(p.ex,{children:[(0,x.jsx)(d.cc,{variant:"outline",onClick:()=>{const e=(e=>{if(0===e.length)return"";const t=Object.keys(e[0]);return[t.join(","),...e.map(e=>t.map(t=>{const n=e[t];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(Ie.map(e=>({"Restaurant Info":`${e.restaurantName} - ${e.adminName}`,Plan:e.planType,Status:e.status,"Menu Items":`${e.currentMenuItems}/${e.menuItemLimit}`,"Monthly Fee":(0,o.vv)(e.monthlyFee,n),"Next Payment":e.endDate||"N/A",Location:e.location,Admin:e.adminName}))),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(t),r=document.createElement("a");r.href=i,r.download=`brand-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)},children:"Export"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>{const e=le.filter(e=>"restaurant"===e.plan_target),t=e.length>0?e[0]:null;pe({restaurantId:"",restaurantName:"",adminName:"",planType:t?t.display_name:"basic",customPlanName:"",status:"trial",billingCycle:"monthly",autoRenew:!1,monthlyFee:t?parseFloat(t.base_price_monthly):29,startDate:(new Date).toISOString().split("T")[0],endDate:""}),se(null),Z(""),V(!0)},children:"Add Subscription"})]})]}),(0,x.jsxs)(p.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#059669",children:[(0,x.jsx)(p.Os,{children:Pe}),(0,x.jsx)(p.v0,{children:"Total Subscriptions"}),(0,x.jsx)(p.d1,{children:"Across all restaurants"})]}),(0,x.jsxs)(p.hI,{color:"#2563EB",children:[(0,x.jsx)(p.Os,{children:Re}),(0,x.jsx)(p.v0,{children:"Active Subscriptions"}),(0,x.jsxs)(p.d1,{children:[Pe>0?Math.round(Re/Pe*100):0,"% operational"]})]}),(0,x.jsxs)(p.hI,{color:"#7C3AED",children:[(0,x.jsx)(p.Os,{children:_e}),(0,x.jsx)(p.v0,{children:"Trial Subscriptions"}),(0,x.jsx)(p.d1,{children:"Currently evaluating"})]}),(0,x.jsxs)(p.hI,{color:"#D97706",children:[(0,x.jsx)(p.Os,{children:(0,o.vv)(Me,n)}),(0,x.jsx)(p.v0,{children:"Monthly Revenue"}),(0,x.jsx)(p.d1,{children:"From active subscriptions"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search subscriptions...",value:q,onChange:e=>H(e.target.value)}),(0,x.jsxs)(c.Jt,{value:K,onChange:e=>G(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),J?(0,x.jsx)(O,{children:"Loading subscription data..."}):0===Ie.length?(0,x.jsxs)(_,{children:[(0,x.jsx)(M,{children:"\ud83d\udccb"}),(0,x.jsx)($,{children:0===W.length?"No Subscriptions":"No Results"}),(0,x.jsx)(L,{children:0===W.length?"No restaurants are assigned to this brand yet.":"No subscriptions match your search criteria."})]}):(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(h,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,x.jsx)("span",{children:"Restaurant Info"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Menu Items"}),(0,x.jsx)("span",{children:"Monthly Fee"}),(0,x.jsx)("span",{children:"Expires In"}),(0,x.jsx)("span",{children:"Auto-Renew"}),(0,x.jsx)("span",{children:"Actions"})]}),Ie.map(e=>(0,x.jsxs)(u,{columns:"2.5fr 1fr 1fr 1.2fr 1fr 1fr 1fr 220px",children:[(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant Info"}),(0,x.jsxs)(m,{children:[(0,x.jsx)(y,{children:e.restaurantName}),(0,x.jsxs)(g,{children:[e.adminName," \u2022 ",e.location]})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),(0,x.jsx)(v,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(j,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Menu Items"}),e.currentMenuItems,"/",-1===e.menuItemLimit?"\u221e":e.menuItemLimit]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Monthly Fee"}),(0,o.vv)(e.monthlyFee,n)]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Expires In"}),(()=>{const t=new Date,n=new Date(e.endDate).getTime()-t.getTime(),i=Math.ceil(n/864e5);return i<0?(0,x.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Expired"}):0===i?(0,x.jsx)("span",{style:{color:"#DC2626",fontWeight:"500"},children:"Today"}):i<=7?(0,x.jsxs)("span",{style:{color:"#F59E0B",fontWeight:"500"},children:[i," days"]}):i<=30?(0,x.jsxs)("span",{style:{color:"#10B981",fontWeight:"500"},children:[i," days"]}):(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[i," days"]})})()]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Auto-Renew"}),e.autoRenew?(0,x.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#DCFCE7",color:"#15803D",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"\u2713 Auto"}):(0,x.jsx)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 8px",background:"#FEF3C7",color:"#92400E",borderRadius:"6px",fontSize:"12px",fontWeight:"500"},children:"Manual"})]})]}),(0,x.jsxs)(p.wr,{children:[(0,x.jsx)(p.rA,{onClick:()=>{ve(e),ge(!0)},children:"View"}),"basic"!==e.planType&&"professional"!==e.planType&&"enterprise"!==e.planType&&(0,x.jsx)(p.rA,{onClick:()=>(e=>{me(e),he(!0)})(e),children:"Edit"}),(0,x.jsx)(p.K0,{onClick:()=>(e=>{Fe(e),Se("active"===e.status?"suspend":"activate"),fe(!0)})(e),title:"active"===e.status?"Suspend Subscription":"Activate Subscription",children:(0,x.jsx)(b,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,x.jsx)(p.K0,{onClick:()=>(e=>{Fe(e),Se("delete"),fe(!0)})(e),title:"Delete Subscription",children:(0,x.jsx)(b,{children:"\u2715"})})]})]},e.id))]}),Q&&(0,x.jsx)(f,{show:Q,onClick:()=>V(!1),children:(0,x.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{children:"Add Subscription"}),(0,x.jsx)(S,{onClick:()=>V(!1),children:"\xd7"})]}),(0,x.jsx)(D,{children:(0,x.jsxs)(T,{children:[(0,x.jsxs)(N,{style:{gridColumn:"1 / -1",position:"relative",zIndex:100},children:[(0,x.jsx)(I,{children:"Search Restaurant *"}),(0,x.jsxs)("div",{style:{position:"relative",width:"100%"},children:[(0,x.jsx)(P,{type:"text",value:X,onChange:e=>$e(e.target.value),onFocus:()=>{te(!0),X.length<1&&$e("")},onBlur:()=>setTimeout(()=>te(!1),200),placeholder:"Click to search restaurants...",required:!0}),ee&&(0,x.jsxs)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:9999,boxShadow:"0 8px 16px rgba(0, 0, 0, 0.15)"},children:[(0,x.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),ne.map(e=>(0,x.jsxs)("div",{onClick:()=>(e=>{var t;se(e),te(!1),Z(e.name),pe({...ce,restaurantId:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",restaurantName:e.name||"",adminName:e.admin_name||e.managerName||"No Admin Assigned"})})(e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,x.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Admin: ",e.admin?`${e.admin.name} (${e.admin.email})`:e.admin_name||"No Admin"]})]},e.id))]})]}),re&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:re.name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[re.admin?`Admin: ${re.admin.name}`:"No Admin"," \u2022 ",re.address||"No address"]})]}),(0,x.jsx)("button",{onClick:()=>{se(null),Z("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(I,{children:"Subscription Plan *"}),(0,x.jsxs)(R,{value:ce.customPlanName||"",onChange:e=>{const t=e.target.value;if("others"===t)pe({...ce,planType:"custom",customPlanName:"others",monthlyFee:0});else if(t){const e=le.find(e=>e.display_name===t);pe({...ce,planType:"custom",customPlanName:t,monthlyFee:parseFloat(null===e||void 0===e?void 0:e.base_price_monthly)||0})}else pe({...ce,planType:"custom",customPlanName:"",monthlyFee:0})},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),le.filter(e=>"restaurant"===e.plan_target).map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," - ",(0,o.vv)(parseFloat(e.base_price_monthly),n)]},e.id)),(0,x.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===ce.customPlanName&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(I,{children:"Custom Plan Name *"}),(0,x.jsx)(P,{type:"text",value:"",onChange:e=>pe({...ce,customPlanName:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(I,{children:["Monthly Fee (",n,") *"]}),(0,x.jsx)(P,{type:"number",step:"0.01",min:"0",value:ce.monthlyFee,onChange:e=>pe({...ce,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]})]}),(0,x.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"16px 20px",background:"trial"===ce.status?"#F0EFFF":"#F9FAFB",borderRadius:"12px",border:"trial"===ce.status?"2px solid #635BFF":"2px solid #E5E7EB",cursor:"pointer",transition:"all 0.2s"},children:[(0,x.jsx)("input",{type:"checkbox",checked:"trial"===ce.status,onChange:e=>{if(e.target.checked){const e=new Date,t=new Date;t.setDate(t.getDate()+7),pe({...ce,status:"trial",startDate:e.toISOString().split("T")[0],endDate:t.toISOString().split("T")[0],monthlyFee:0})}else pe({...ce,status:"active",monthlyFee:29})},style:{width:"20px",height:"20px",accentColor:"#635BFF",cursor:"pointer"}}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:"600",color:"#1F2937",fontSize:"15px"},children:"Apply 7-Day Free Trial"}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:"Subscription will start with a 7-day free trial period"})]})]})}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Billing Cycle *"}),(0,x.jsxs)(R,{value:ce.billingCycle||"monthly",onChange:e=>{const t=e.target.value,n={basic:{monthly:29,annual:290},professional:{monthly:99,annual:990},enterprise:{monthly:199,annual:2190}},i=n[ce.planType]||n.basic;pe({...ce,billingCycle:t,monthlyFee:i[t]})},children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Subscription Start Date *"}),(0,x.jsx)(P,{type:"date",value:ce.startDate,onChange:e=>pe({...ce,startDate:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Subscription End Date *"}),(0,x.jsx)(P,{type:"date",value:ce.endDate,onChange:e=>pe({...ce,endDate:e.target.value})})]}),(0,x.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:ce.autoRenew||!1,onChange:e=>pe({...ce,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,x.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,x.jsx)("strong",{children:"Summary:"})}),(0,x.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[ce.customPlanName||"Custom Plan"," - ",(0,o.vv)(ce.monthlyFee||29,n)," (",ce.billingCycle||"monthly",")"]}),(0,x.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",re?`${re.name} (Brand General Manager)`:"Not selected"]})]})]})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>V(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{try{if(!re)return;const e={plan_type:ce.customPlanName||"Custom Plan",plan_amount:ce.monthlyFee,billing_cycle:ce.billingCycle,subscription_start:ce.startDate,subscription_end:ce.endDate,status:"trial"===ce.status?"trial":"active"};if(!(await fetch(`/api/restaurants/${re.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify(e)})).ok)throw new Error("Failed to update restaurant subscription");const t={restaurantId:re.id,restaurantName:re.name,managerId:re.admin_id||null,managerName:re.admin_name||re.managerName||"",customerName:re.name,customerAddress:[re.address,re.phone?`Phone: ${re.phone}`:"",re.email?`Email: ${re.email}`:""].filter(Boolean).join("\n"),companyName:re.name,planName:ce.customPlanName||"Custom Plan",amount:ce.monthlyFee,billingCycle:ce.billingCycle,issueDate:ce.startDate,dueDate:new Date(new Date(ce.startDate).getTime()+12096e5).toISOString().split("T")[0],paidBy:"Brand General Manager",status:"pending"};if(!(await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify(t)})).ok)throw new Error("Failed to create invoice");V(!1),Ee("Subscription added and invoice generated successfully!"),Be(!0),await Te()}catch(e){console.error("Error adding subscription:",e)}},children:"Add Subscription"})]})]})}),Ae&&(0,x.jsx)(f,{show:Ae,onClick:()=>Be(!1),children:(0,x.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(B,{children:"\u2713"}),(0,x.jsx)(k,{children:"Success!"}),(0,x.jsx)(E,{children:ke}),(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>Be(!1),children:"OK"})]})}),xe&&ue&&(0,x.jsx)(f,{show:xe,onClick:()=>he(!1),children:(0,x.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{children:"Edit Custom Subscription"}),(0,x.jsx)(S,{onClick:()=>he(!1),children:"\xd7"})]}),(0,x.jsx)(D,{children:(0,x.jsxs)(T,{children:[(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(I,{children:"Restaurant *"}),(0,x.jsx)(P,{type:"text",value:ue.restaurantName,disabled:!0,style:{background:"#F8FAFC",cursor:"not-allowed"}})]}),(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(I,{children:"Custom Subscription Plan *"}),(0,x.jsxs)(R,{value:ue.planType,onChange:e=>{const t=e.target.value;if("others"===t)me({...ue,planType:"custom",monthlyFee:0});else if(t){const e=De.find(e=>e.name===t);me({...ue,planType:t,monthlyFee:(null===e||void 0===e?void 0:e.monthly_price)||0})}},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),De.map(e=>(0,x.jsxs)("option",{value:e.name,children:[e.display_name," - ",(0,o.vv)(e.monthly_price,n)]},e.id)),(0,x.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===ue.planType&&(0,x.jsxs)(N,{style:{gridColumn:"1 / -1"},children:[(0,x.jsx)(I,{children:"Custom Plan Name *"}),(0,x.jsx)(P,{type:"text",value:"",onChange:e=>me({...ue,planType:e.target.value}),placeholder:"Enter custom plan name",required:!0})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(I,{children:["Monthly Fee (",n,") *"]}),(0,x.jsx)(P,{type:"number",step:"0.01",min:"0",value:ue.monthlyFee,onChange:e=>me({...ue,monthlyFee:parseFloat(e.target.value)||0}),placeholder:"0.00",required:!0})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Status *"}),(0,x.jsxs)(R,{value:ue.status,onChange:e=>me({...ue,status:e.target.value}),children:[(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,x.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,x.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Billing Cycle *"}),(0,x.jsxs)(R,{value:ue.billingCycle||"monthly",onChange:e=>me({...ue,billingCycle:e.target.value}),children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Subscription Start Date *"}),(0,x.jsx)(P,{type:"date",value:ue.startDate,onChange:e=>me({...ue,startDate:e.target.value})})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(I,{children:"Subscription End Date *"}),(0,x.jsx)(P,{type:"date",value:ue.endDate,onChange:e=>me({...ue,endDate:e.target.value})})]}),(0,x.jsx)(N,{style:{gridColumn:"1 / -1"},children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,x.jsx)("input",{type:"checkbox",checked:ue.autoRenew||!1,onChange:e=>me({...ue,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})})]})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>he(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"primary",onClick:async()=>{if(ue)try{const e={name:ue.restaurantName,planType:"basic"===ue.planType?"Basic Plan":"professional"===ue.planType?"Professional Plan":"enterprise"===ue.planType?"Enterprise Plan":ue.planType,planAmount:ue.monthlyFee,status:"active"===ue.status?"active":"inactive",subscriptionStart:ue.startDate,subscriptionEnd:ue.endDate},t=await fetch(`/api/restaurants/${ue.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify(e)});if(t.ok)he(!1),me(null),await Te(),Ee("Subscription updated successfully!"),Be(!0);else{const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("Failed to update subscription:",e)}}catch(e){console.error("Error updating subscription:",e)}},children:"Update Subscription"})]})]})}),ye&&je&&(0,x.jsx)(f,{show:ye,onClick:()=>ge(!1),children:(0,x.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{children:"Subscription Details"}),(0,x.jsx)(S,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,x.jsx)(D,{children:(0,x.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Restaurant Information"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Restaurant Name"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.restaurantName})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Admin"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.adminName})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Location"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.location})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Subscription Details"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Plan Type"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.planType.charAt(0).toUpperCase()+je.planType.slice(1)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Status"}),(0,x.jsx)("div",{children:(0,x.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"500",background:"active"===je.status?"#DCFCE7":"#FEF3C7",color:"active"===je.status?"#15803D":"#92400E"},children:je.status.charAt(0).toUpperCase()+je.status.slice(1)})})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Monthly Fee"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(0,o.vv)(je.monthlyFee,n)})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Billing Cycle"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.billingCycle.charAt(0).toUpperCase()+je.billingCycle.slice(1)})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Auto-Renew"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.autoRenew?(0,x.jsx)("span",{style:{color:"#15803D"},children:"\u2713 Enabled"}):(0,x.jsx)("span",{style:{color:"#92400E"},children:"\u2715 Disabled"})})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Dates"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Start Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.startDate})]}),(0,x.jsxs)("div",{style:{marginBottom:"12px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"End Date"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:je.endDate})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Expires In"}),(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:(()=>{const e=new Date,t=new Date(je.endDate).getTime()-e.getTime(),n=Math.ceil(t/864e5);return n<0?(0,x.jsx)("span",{style:{color:"#DC2626"},children:"Expired"}):0===n?(0,x.jsx)("span",{style:{color:"#DC2626"},children:"Today"}):n<=7?(0,x.jsxs)("span",{style:{color:"#F59E0B"},children:[n," days"]}):n<=30?(0,x.jsxs)("span",{style:{color:"#10B981"},children:[n," days"]}):(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[n," days"]})})()})]})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",fontWeight:"600",marginBottom:"8px",textTransform:"uppercase"},children:"Usage"}),(0,x.jsx)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Menu Items"}),(0,x.jsxs)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#0A2540"},children:[je.currentMenuItems," / ",-1===je.menuItemLimit?"\u221e":je.menuItemLimit]})]})})]})]})}),(0,x.jsx)(z,{children:(0,x.jsx)(d.cc,{variant:"primary",onClick:()=>ge(!1),children:"Close"})})]})}),be&&(0,x.jsx)(f,{show:be,onClick:()=>fe(!1),children:(0,x.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{children:"Confirm Action"}),(0,x.jsx)(S,{onClick:()=>fe(!1),children:"\xd7"})]}),(0,x.jsx)(D,{children:(0,x.jsxs)("p",{children:["delete"===Ce&&`Are you sure you want to delete subscription for ${null===we||void 0===we?void 0:we.restaurantName}?`,"suspend"===Ce&&`Are you sure you want to suspend subscription for ${null===we||void 0===we?void 0:we.restaurantName}?`,"activate"===Ce&&`Are you sure you want to activate subscription for ${null===we||void 0===we?void 0:we.restaurantName}?`]})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(d.cc,{variant:"cancel",onClick:()=>fe(!1),children:"Cancel"}),(0,x.jsx)(d.cc,{variant:"delete"===Ce?"danger":"primary",onClick:async()=>{if(we&&Ce){try{const e={"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{}};if("delete"===Ce){if(!(await fetch(`/api/restaurants/${we.restaurantId}`,{method:"DELETE",headers:e})).ok)throw new Error("Failed to delete subscription");Ee("Subscription deleted successfully")}else if("suspend"===Ce){if(!(await fetch(`/api/restaurants/${we.restaurantId}`,{method:"PUT",headers:e,body:JSON.stringify({status:"inactive"})})).ok)throw new Error("Failed to suspend subscription");Ee("Subscription suspended successfully")}else if("activate"===Ce){if(!(await fetch(`/api/restaurants/${we.restaurantId}`,{method:"PUT",headers:e,body:JSON.stringify({status:"active"})})).ok)throw new Error("Failed to activate subscription");Ee("Subscription activated successfully")}Be(!0),await Te()}catch(e){console.error("Action failed:",e)}fe(!1),Fe(null),Se(null)}},children:"delete"===Ce?"Delete":"suspend"===Ce?"Suspend":"Activate"})]})]})})]})]})})}}}]);