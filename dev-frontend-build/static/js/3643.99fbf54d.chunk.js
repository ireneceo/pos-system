"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,n,a)=>{a.d(n,{DO:()=>p,Jt:()=>u,Qn:()=>c});a(9950);var r=a(4752),t=a(4414);const s=r.Ay.div`
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
`,o=r.Ay.input`
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
`,l=r.Ay.div`
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
`,i=r.Ay.button`
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
`,d=r.Ay.select`
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
`,c=e=>{let{children:n,className:a,style:r,...o}=e;return(0,t.jsx)(s,{className:a,style:r,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:a,onChange:r,style:s,...d}=e;return(0,t.jsxs)(l,{style:s,children:[(0,t.jsx)(o,{placeholder:n,value:a,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,t.jsx)(i,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:n,...a}=e;return(0,t.jsx)(d,{...a,children:n})}},3643:(e,n,a)=>{a.r(n),a.d(n,{default:()=>k});var r=a(9950),t=a(4492),s=a(4752),o=a(1367),l=a(8409),i=a(2488),d=a(6038),c=a(2924),p=a(8666),u=a(9018),h=a(4414);const x=(0,s.Ay)(l.A0)`
  @media (max-width: 1400px) {
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }
`,m=(0,s.Ay)(l.Hj)`
  @media (max-width: 1400px) {
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }
`,g=s.Ay.div``,j=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,y=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,v=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":return"#DC2626";default:return"#6B7280"}}};
`,f=s.Ay.span`
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,b=s.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,w=s.Ay.div`
  display: flex;
  flex-direction: column;
`,C=s.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,S=s.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,A=s.Ay.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,F=s.Ay.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  font-weight: bold;
`,_=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,M=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},k=()=>{const{operationSettings:e}=(0,u.Pj)();(0,o.As)();const[n,a]=(0,r.useState)([]),[s,k]=(0,r.useState)(""),[E,I]=(0,r.useState)("all"),[N,R]=(0,r.useState)(!1),[B,T]=(0,r.useState)(!1),[O,D]=(0,r.useState)(""),[P,G]=(0,r.useState)(null),[L,$]=(0,r.useState)(!1),[z,U]=(0,r.useState)(null),[J,Y]=(0,r.useState)(!1),[W,K]=(0,r.useState)(!1),[H,q]=(0,r.useState)(null),[Q,V]=(0,r.useState)(""),[X,Z]=(0,r.useState)(""),[ee,ne]=(0,r.useState)(""),[ae,re]=(0,r.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[te,se]=(0,r.useState)([]),oe=(0,r.useMemo)(()=>(0,d.vL)(te),[te]),[le,ie]=(0,r.useState)([]),[de,ce]=(0,r.useState)([]),pe=(0,t.Zp)(),ue=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:M()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const r=await n.json();console.log("\ud83d\udc65 Manager users data from API:",r);const t=await fetch("/api/restaurants",{headers:M()}),s=t.ok?await t.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=r.data||r;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void a([]);let l=[];try{const e=await fetch("/api/invoices",{headers:M()});if(e.ok){const n=await e.json();l=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=s.filter(e=>{const a=e.managerId===n.id.toString(),r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||r});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let r=0;try{r=l.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),r=0}const t="Brand General"===n.role,o="Foodcourt General"===n.role,i=t?n.brand_plan_type:o?n.fc_plan_type:n.plan_type,d=t?n.brand_plan_amount:o?n.fc_plan_amount:null,c=t?n.brand_billing_cycle:o?n.fc_billing_cycle:null,p=t?n.brand_subscription_status:o?n.fc_subscription_status:n.subscription_status,u=t?n.brand_subscription_start:o?n.fc_subscription_start:n.subscription_start,h=t?n.brand_subscription_end:o?n.fc_subscription_end:n.subscription_end,x=t?n.brand_currency:o?n.fc_currency:"MYR",m={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name&&"Unknown Company"!==n.company_name?n.company_name:n.brand_name||n.foodcourt_name||n.full_name||"N/A",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:r,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided",role:n.role,planType:i||void 0,planAmount:d||void 0,billingCycle:c||void 0,subscriptionStatus:p||void 0,subscriptionStart:u?new Date(u).toISOString().split("T")[0]:void 0,subscriptionEnd:h?new Date(h).toISOString().split("T")[0]:void 0,currency:x||"MYR",is_demo:n.is_demo||!1,is_test:n.is_test||!1};return console.log("\u2705 Transformed manager:",m),m});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),a(i)}else console.error("\u274c Failed to fetch users:",n.status),a([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),a([])}};(0,r.useEffect)(()=>{ue(),xe(),he()},[]);const he=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:M()});if(e.ok){const n=await e.json(),a=n.data||n,r=a.filter(e=>"Brand General"===e.role);ie(r);const t=a.filter(e=>"Foodcourt General"===e.role);ce(t),console.log("\ud83d\udcca Loaded Brand Generals:",r.length,"Foodcourt Generals:",t.length)}}catch(e){console.error("Error fetching general managers:",e)}},xe=async()=>{try{const e=await fetch("/api/plans",{headers:M()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);se(n)}}catch(e){console.error("Error fetching plans:",e)}},me=e=>"Brand General"===e||"Brand Manager"===e?te.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?te.filter(e=>"foodcourt"===e.plan_target):"Restaurant Owner"===e?te.filter(e=>"owner"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:s,filterStatus:E,managers:n});const ge=n.filter(e=>{const n=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),a="all"===E||e.status===E;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:E}),n&&a});console.log("\ud83d\udd0d Filtered results:",ge.length,"managers");const je=n.length,ye=n.reduce((e,n)=>e+n.restaurantCount,0),ve=ye,fe=n.reduce((e,n)=>e+n.totalRevenue,0),be=()=>{R(!1);const e=te.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=(new Date).toISOString().split("T")[0];re({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:a,subscriptionEnd:we(a,"monthly")})},we=(e,n)=>{if(!e)return"";const a=new Date(e);return"annual"===n?a.setFullYear(a.getFullYear()+1):a.setMonth(a.getMonth()+1),a.toISOString().split("T")[0]},Ce=(e,n)=>{re(a=>{const r={...a,[e]:"autoRenew"===e?"true"===n||!0===n:n};if("subscriptionStart"===e||"billingCycle"===e){const t="subscriptionStart"===e?String(n):a.subscriptionStart,s="billingCycle"===e?String(n):a.billingCycle;r.subscriptionEnd=we(t,s)}return r})};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Managers"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(ge.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),r=document.createElement("a");r.href=a,r.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a)},children:"Export"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=te.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=(new Date).toISOString().split("T")[0];re({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:a,subscriptionEnd:we(a,"monthly")}),R(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),V("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:je}),(0,h.jsx)(l.v0,{children:"Total Managers"}),(0,h.jsx)(l.d1,{children:"Currently active"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:ve}),(0,h.jsx)(l.v0,{children:"Active Subscriptions"}),(0,h.jsxs)(l.d1,{children:[je>0?(ye/je).toFixed(1):0," restaurants per manager"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:ye}),(0,h.jsx)(l.v0,{children:"Total Restaurants"}),(0,h.jsx)(l.d1,{children:"Across all managers"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsxs)(l.Os,{children:[(0,d.vv)(fe/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,h.jsx)(l.v0,{children:"Total Revenue"}),(0,h.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,h.jsxs)(i.Qn,{children:[(0,h.jsxs)(i.Jt,{value:E,onChange:e=>I(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,h.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>k(e.target.value)})]}),(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,h.jsx)("span",{className:"col-info",children:"Manager Info"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Restaurants"}),(0,h.jsx)("span",{className:"col-revenue",children:"Revenue (RM)"}),(0,h.jsx)("span",{children:"Last Active"}),(0,h.jsx)("span",{className:"col-action",children:"Actions"})]}),0===ge.length?(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):ge.map(e=>(0,h.jsxs)(m,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,h.jsxs)(l.Np,{children:[(0,h.jsxs)(l.Uj,{className:"col-info",children:[(0,h.jsx)(l.PM,{children:"Manager Info"}),(0,h.jsxs)(g,{children:[(0,h.jsxs)(j,{children:[e.fullName,e.is_demo&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"DEMO"}),e.is_test&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"TEST"})]}),(0,h.jsxs)(y,{children:[e.managerId," \u2022 ",e.email]})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Status"}),(0,h.jsx)("div",{children:(0,h.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Restaurants"}),(0,h.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),pe(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,h.jsxs)(l.Uj,{className:"col-revenue",children:[(0,h.jsx)(l.PM,{children:"Revenue (RM)"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Last Active"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.K0,{onClick:()=>(e=>{const n=e.role,a=me(n),r=a.length>0?a[0]:null;q({...e,planType:e.planType||(r?r.display_name:""),planAmount:e.planAmount||(r?r.base_price_monthly:"149.00"),billingCycle:e.billingCycle||"monthly",paymentModel:"Brand General"===n?"brand_manager":"Restaurant Owner"===n?"restaurant_owner":"foodcourt_manager",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||"",currency:e.currency||"MYR"}),K(!0)})(e),title:"Edit Manager",children:(0,h.jsx)(f,{children:"Edit"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{G(e),U("toggle"),$(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,h.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{G(e),U("resetPassword"),$(!0)})(e),title:"Reset Password",children:(0,h.jsx)(f,{children:"\u26b7"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{G(e),U("delete"),$(!0)})(e),title:"Delete Manager",children:(0,h.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),N&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:be,title:"Add New Manager",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:be,children:"Cancel"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",ae);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:M(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(ae.managerId&&ae.fullName&&ae.companyName&&ae.email&&ae.position&&ae.department&&ae.phone)if("Brand Manager"!==ae.role||ae.parentManagerId)if("Foodcourt Manager"!==ae.role||ae.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:ae.managerId,email:ae.email,password:"manager123",role:ae.role,full_name:ae.fullName,company_name:ae.companyName,position:ae.position,department:ae.department,phone:ae.phone,address:ae.address};"Brand General"!==ae.role&&"Foodcourt General"!==ae.role&&"Restaurant Owner"!==ae.role||(n.plan_type=ae.planType,n.plan_amount=parseFloat(ae.planAmount)||0,n.billing_cycle=ae.billingCycle,n.currency=ae.currency,n.subscription_start=ae.subscriptionStart,n.subscription_end=ae.subscriptionEnd,n.auto_renew=!1!==ae.autoRenew),"Brand Manager"!==ae.role&&"Foodcourt Manager"!==ae.role||!ae.parentManagerId||(n.manager_id=parseInt(ae.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:M(),body:JSON.stringify(n)});let r;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const t=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",t),t&&t.includes("application/json"))r=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{r=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",r),a.ok?(D("Manager created. Default password: manager123"),T(!0),be(),await ue()):V("Failed to create manager: "+(r.error||r.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?V("Cannot connect to server. Please ensure the backend server is running"):V("Error creating manager: "+n.message)}}else V("Please select a Foodcourt General for this Foodcourt Manager");else V("Please select a Brand General for this Brand Manager");else V("Please fill in all required fields");else V("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]}),children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter unique manager ID",value:ae.managerId,onChange:e=>Ce("managerId",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter full name",value:ae.fullName,onChange:e=>Ce("fullName",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter company name",value:ae.companyName,onChange:e=>Ce("companyName",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager Role *"}),(0,h.jsxs)(i.Jt,{value:ae.role,onChange:e=>{const n=e.target.value;Ce("role",n);const a=me(n),r=a.length>0?a[0]:null,t="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";re(e=>({...e,role:n,parentManagerId:"",planType:r?r.display_name:e.planType,planAmount:r?String((0,d.jL)(r||{},e.currency)):e.planAmount,paymentModel:t}))},children:[(0,h.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,h.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,h.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,h.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===ae.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Brand General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:ae.parentManagerId,onChange:e=>Ce("parentManagerId",e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Select Brand General"}),le.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ae.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Foodcourt General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:ae.parentManagerId,onChange:e=>Ce("parentManagerId",e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Select Foodcourt General"}),de.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:ae.position,onChange:e=>Ce("position",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:ae.department,onChange:e=>Ce("department",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address *"}),(0,h.jsx)(S,{type:"email",placeholder:"Enter email address",value:ae.email,onChange:e=>Ce("email",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:ae.phone,onChange:e=>Ce("phone",e)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(A,{placeholder:"Enter company address",value:ae.address,onChange:e=>Ce("address",e.target.value)})]}),("Foodcourt General"===ae.role||"Brand General"===ae.role||"Restaurant Owner"===ae.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,h.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Currency *"}),(0,h.jsx)(i.Jt,{value:ae.currency,onChange:e=>{const n=e.target.value,a=me(ae.role).find(e=>e.display_name===ae.planType);Ce("currency",n),a&&Ce("planAmount",String((0,d.jL)(a,n)))},children:oe.map(e=>(0,h.jsx)("option",{value:e,children:e},e))})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Plan *"}),(0,h.jsxs)(i.Jt,{value:ae.planType,onChange:e=>{const n=me(ae.role).find(n=>n.display_name===e.target.value);Ce("planType",e.target.value),n&&Ce("planAmount",String((0,d.jL)(n,ae.currency)))},children:[(0,h.jsx)("option",{value:"",children:"Select Plan"}),me(ae.role).map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,ae.currency),"/month)"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Billing Cycle *"}),(0,h.jsxs)(i.Jt,{value:ae.billingCycle,onChange:e=>Ce("billingCycle",e.target.value),children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Start Date *"}),(0,h.jsx)(S,{type:"date",value:ae.subscriptionStart,onChange:e=>Ce("subscriptionStart",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription End Date (Auto)"}),(0,h.jsx)(S,{type:"date",value:ae.subscriptionEnd,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(w,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("input",{type:"checkbox",checked:ae.autoRenew,onChange:e=>Ce("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,h.jsx)(C,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),Q&&(0,h.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:Q})]}),B&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>T(!1),title:"Success",size:"small",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>T(!1),children:"OK"})}),children:(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsx)(F,{children:"\u2713"}),(0,h.jsx)(_,{children:O}),(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>T(!1),children:"OK"})]})}),J&&P&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>Y(!1),title:"Manager Details",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>Y(!1),children:"Close"})}),children:(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID"}),(0,h.jsx)(S,{type:"text",value:P.managerId,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name"}),(0,h.jsx)(S,{type:"text",value:P.fullName,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name"}),(0,h.jsx)(S,{type:"text",value:P.companyName,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position"}),(0,h.jsx)(S,{type:"text",value:P.position,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department"}),(0,h.jsx)(S,{type:"text",value:P.department,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address"}),(0,h.jsx)(S,{type:"email",value:P.email,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number"}),(0,h.jsx)(S,{type:"tel",value:(0,c.FI)(P.phone),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Status"}),(0,h.jsx)(S,{type:"text",value:"active"===P.status?"Active":"Inactive",disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Restaurant Count"}),(0,h.jsx)(S,{type:"text",value:P.restaurantCount.toString(),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Total Revenue"}),(0,h.jsx)(S,{type:"text",value:(0,d.vv)(P.totalRevenue,e.currency),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Created Date"}),(0,h.jsx)(S,{type:"text",value:P.createdAt,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Last Active"}),(0,h.jsx)(S,{type:"text",value:P.lastActive,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(A,{value:P.address,disabled:!0})]})]})}),W&&H&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:()=>K(!1),title:"Edit Manager",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{K(!1),Z("")},children:"Cancel"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(H)if(H.managerId&&H.fullName&&H.companyName&&H.email&&H.position&&H.department&&H.phone)try{console.log("\ud83d\udd04 Updating manager:",H);const e=H.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:H.managerId,full_name:H.fullName,company_name:H.companyName,email:H.email,position:H.position,department:H.department,phone:H.phone,address:H.address};"Brand General"!==H.role&&"Foodcourt General"!==H.role&&"Restaurant Owner"!==H.role||(n.plan_type=H.planType,n.plan_amount=parseFloat(String(H.planAmount))||0,n.billing_cycle=H.billingCycle,n.currency=H.currency||"MYR",n.subscription_start=H.subscriptionStart,n.subscription_end=H.subscriptionEnd,n.auto_renew=!1!==H.autoRenew),console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:M(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)K(!1),q(null),Z(""),await ue();else{const e=await a.json();Z(e.error||"Update failed")}}catch(e){Z("Error updating manager: "+e.message)}else Z("Please fill in all required fields")},children:"Update Manager"})]}),children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID * (Read-only)"}),(0,h.jsx)(S,{type:"text",value:H.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name *"}),(0,h.jsx)(S,{type:"text",value:H.fullName,onChange:e=>q({...H,fullName:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name *"}),(0,h.jsx)(S,{type:"text",value:H.companyName,onChange:e=>q({...H,companyName:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position *"}),(0,h.jsx)(S,{type:"text",value:H.position,onChange:e=>q({...H,position:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department *"}),(0,h.jsx)(S,{type:"text",value:H.department,onChange:e=>q({...H,department:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address *"}),(0,h.jsx)(S,{type:"email",value:H.email,onChange:e=>q({...H,email:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:H.phone,onChange:e=>q({...H,phone:e})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(A,{value:H.address,onChange:e=>q({...H,address:e.target.value})})]}),"Brand Manager"===H.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Brand General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:H.manager_id||"",onChange:e=>q({...H,manager_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Brand General"}),le.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===H.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Foodcourt General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:H.manager_id||"",onChange:e=>q({...H,manager_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Foodcourt General"}),de.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===H.role||"Brand General"===H.role||"Restaurant Owner"===H.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,h.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Currency *"}),(0,h.jsx)(i.Jt,{value:(0,d.Wh)(H.currency||"MYR"),onChange:e=>{const n=e.target.value,a=me(H.role).find(e=>e.display_name===H.planType);q({...H,currency:n,planAmount:a?String((0,d.jL)(a,n)):H.planAmount})},children:oe.map(e=>(0,h.jsx)("option",{value:e,children:e},e))})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Plan *"}),(0,h.jsxs)(i.Jt,{value:H.planType||"",onChange:e=>{const n=me(H.role).find(n=>n.display_name===e.target.value),a=(0,d.Wh)(H.currency||"MYR");q({...H,planType:e.target.value,planAmount:n?String((0,d.jL)(n,a)):H.planAmount})},children:[(0,h.jsx)("option",{value:"",children:"Select Plan"}),me(H.role).map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,(0,d.Wh)(H.currency||"MYR")),"/month)"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Billing Cycle *"}),(0,h.jsxs)(i.Jt,{value:H.billingCycle||"monthly",onChange:e=>{const n=e.target.value;q({...H,billingCycle:n,subscriptionEnd:we(H.subscriptionStart||"",n)})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Start Date *"}),(0,h.jsx)(S,{type:"date",value:H.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>{const n=e.target.value;q({...H,subscriptionStart:n,subscriptionEnd:we(n,H.billingCycle||"monthly")})}})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription End Date (Auto)"}),(0,h.jsx)(S,{type:"date",value:H.subscriptionEnd||"",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})]}),X&&(0,h.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:X})]}),L&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>$(!1),title:"Confirm Action",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>$(!1),children:"Cancel"}),(0,h.jsxs)(l.$n,{variant:"delete"===z?"danger":"primary",onClick:async()=>{if(P&&z){try{if("delete"===z){const e=P.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:M()});if(n.ok)await ue();else{const e=await n.json().catch(()=>({error:"Delete failed"}));ne(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===z){const e=P.id.replace("mgr-",""),n=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:M(),body:JSON.stringify({newPassword:n})})).ok?(D(`New password: ${n}\n\nPlease save this password and share it securely with the manager.`),T(!0)):ne("Password reset failed")}else if("toggle"===z){const e=P.id.replace("mgr-",""),n="active"===P.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:M(),body:JSON.stringify({status:n})})).ok?a(e=>e.map(e=>e.id===P.id?{...e,status:n}:e)):ne("Status update failed")}}catch(e){ne(`Action failed: ${e.message}. Please try again.`)}$(!1),G(null),U(null)}},children:[" ","delete"===z?"Delete":"resetPassword"===z?"Reset Password":"Confirm"," "]})]}),children:(0,h.jsxs)("div",{children:["delete"===z&&(0,h.jsxs)("div",{children:[(0,h.jsxs)("p",{style:{margin:"0 0 12px",fontWeight:"600",color:"#DC2626"},children:['Are you sure you want to delete "',null===P||void 0===P?void 0:P.fullName,'" (',null===P||void 0===P?void 0:P.managerId,")?"]}),(0,h.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA",fontSize:"13px",color:"#991B1B",lineHeight:"1.6"},children:["Brand General"===(null===P||void 0===P?void 0:P.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 Brands owned by this user will be unlinked (owner cleared, brands remain)"}),(0,h.jsx)("div",{children:"\u2022 Restaurants under those brands will not be affected"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),"Foodcourt General"===(null===P||void 0===P?void 0:P.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 Foodcourts owned by this user will be unlinked (owner cleared, foodcourts remain)"}),(0,h.jsx)("div",{children:"\u2022 Restaurants under those foodcourts will not be affected"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),"Restaurant Owner"===(null===P||void 0===P?void 0:P.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 All restaurant ownership links will be removed"}),(0,h.jsx)("div",{children:"\u2022 Restaurants will remain but without an owner"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),(0,h.jsx)("div",{style:{marginTop:"8px",fontWeight:"600"},children:"This action cannot be undone."})]})]}),"resetPassword"===z&&(0,h.jsxs)("p",{children:['Are you sure you want to reset the password for "',null===P||void 0===P?void 0:P.fullName,'" (',null===P||void 0===P?void 0:P.managerId,")?"]}),"toggle"===z&&(0,h.jsxs)("p",{children:["Are you sure you want to ","active"===(null===P||void 0===P?void 0:P.status)?"deactivate":"activate",' "',null===P||void 0===P?void 0:P.fullName,'" (',null===P||void 0===P?void 0:P.managerId,")?"]})]})}),ee&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>ne(""),title:"Error",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>ne(""),children:"OK"})}),children:(0,h.jsx)("p",{style:{color:"#DC2626"},children:ee})})]})]})})}}}]);