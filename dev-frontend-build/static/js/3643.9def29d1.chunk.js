"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,n,a)=>{a.d(n,{DO:()=>p,Jt:()=>u,Qn:()=>c});a(9950);var t=a(4752),r=a(4414);const s=t.Ay.div`
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
`,o=t.Ay.input`
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
`,l=t.Ay.div`
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
`,i=t.Ay.button`
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
`,d=t.Ay.select`
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
`,c=e=>{let{children:n,className:a,style:t,...o}=e;return(0,r.jsx)(s,{className:a,style:t,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:a,onChange:t,style:s,...d}=e;return(0,r.jsxs)(l,{style:s,children:[(0,r.jsx)(o,{placeholder:n,value:a,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,r.jsx)(i,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:n,...a}=e;return(0,r.jsx)(d,{...a,children:n})}},3643:(e,n,a)=>{a.r(n),a.d(n,{default:()=>_});var t=a(9950),r=a(4492),s=a(4752),o=a(1367),l=a(8409),i=a(2488),d=a(6038),c=a(2924),p=a(8666),u=a(9018),h=a(4414);const x=(0,s.Ay)(l.A0)`
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
`,g=(0,s.Ay)(l.Hj)`
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
`,m=s.Ay.div``,j=s.Ay.div`
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
`,F=s.Ay.textarea`
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
`,A=(s.Ay.div`
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
`,s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}}),_=()=>{const{operationSettings:e}=(0,u.Pj)();(0,o.As)();const[n,a]=(0,t.useState)([]),[s,_]=(0,t.useState)(""),[M,k]=(0,t.useState)("all"),[E,R]=(0,t.useState)(!1),[B,I]=(0,t.useState)(!1),[N,T]=(0,t.useState)(""),[P,D]=(0,t.useState)(""),[O,G]=(0,t.useState)(!1),[L,$]=(0,t.useState)(null),[z,U]=(0,t.useState)(!1),[J,W]=(0,t.useState)(null),[Y,K]=(0,t.useState)(!1),[H,q]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(null),[X,Z]=(0,t.useState)(""),[ee,ne]=(0,t.useState)(""),[ae,te]=(0,t.useState)(""),[re,se]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[oe,le]=(0,t.useState)([]),ie=(0,t.useMemo)(()=>(0,d.vL)(oe),[oe]),[de,ce]=(0,t.useState)([]),[pe,ue]=(0,t.useState)([]),he=(0,r.Zp)(),xe=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:A()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const t=await n.json();console.log("\ud83d\udc65 Manager users data from API:",t);const r=await fetch("/api/restaurants",{headers:A()}),s=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=t.data||t;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void a([]);let l=[];try{const e=await fetch("/api/invoices",{headers:A()});if(e.ok){const n=await e.json();l=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=s.filter(e=>{const a=e.managerId===n.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||t});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let t=0;try{t=l.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const r="Brand General"===n.role,o="Foodcourt General"===n.role,i=r?n.brand_plan_type:o?n.fc_plan_type:n.plan_type,d=r?n.brand_plan_amount:o?n.fc_plan_amount:null,c=r?n.brand_billing_cycle:o?n.fc_billing_cycle:null,p=r?n.brand_subscription_status:o?n.fc_subscription_status:n.subscription_status,u=r?n.brand_subscription_start:o?n.fc_subscription_start:n.subscription_start,h=r?n.brand_subscription_end:o?n.fc_subscription_end:n.subscription_end,x=r?n.brand_currency:o?n.fc_currency:"MYR",g={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name&&"Unknown Company"!==n.company_name?n.company_name:n.brand_name||n.foodcourt_name||n.full_name||"N/A",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:t,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided",role:n.role,planType:i||void 0,planAmount:d||void 0,billingCycle:c||void 0,subscriptionStatus:p||void 0,subscriptionStart:u?new Date(u).toISOString().split("T")[0]:void 0,subscriptionEnd:h?new Date(h).toISOString().split("T")[0]:void 0,currency:x||"MYR",is_demo:n.is_demo||!1,is_test:n.is_test||!1};return console.log("\u2705 Transformed manager:",g),g});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),a(i)}else console.error("\u274c Failed to fetch users:",n.status),a([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),a([])}};(0,t.useEffect)(()=>{xe(),me(),ge()},[]);const ge=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:A()});if(e.ok){const n=await e.json(),a=n.data||n,t=a.filter(e=>"Brand General"===e.role);ce(t);const r=a.filter(e=>"Foodcourt General"===e.role);ue(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},me=async()=>{try{const e=await fetch("/api/plans",{headers:A()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);le(n)}}catch(e){console.error("Error fetching plans:",e)}},je=e=>"Brand General"===e||"Brand Manager"===e?oe.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?oe.filter(e=>"foodcourt"===e.plan_target):"Restaurant Owner"===e?oe.filter(e=>"owner"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:s,filterStatus:M,managers:n});const ye=n.filter(e=>{const n=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),a="all"===M||e.status===M;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:M}),n&&a});console.log("\ud83d\udd0d Filtered results:",ye.length,"managers");const ve=n.length,fe=n.reduce((e,n)=>e+n.restaurantCount,0),be=fe,we=n.reduce((e,n)=>e+n.totalRevenue,0),Ce=()=>{R(!1);const e=oe.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=(new Date).toISOString().split("T")[0];se({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:a,subscriptionEnd:Se(a,"monthly")})},Se=(e,n)=>{if(!e)return"";const a=new Date(e);return"annual"===n?a.setFullYear(a.getFullYear()+1):a.setMonth(a.getMonth()+1),a.toISOString().split("T")[0]},Fe=(e,n)=>{se(a=>{const t={...a,[e]:"autoRenew"===e?"true"===n||!0===n:n};if("subscriptionStart"===e||"billingCycle"===e){const r="subscriptionStart"===e?String(n):a.subscriptionStart,s="billingCycle"===e?String(n):a.billingCycle;t.subscriptionEnd=Se(r,s)}return t})};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Managers"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(ye.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=oe.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=(new Date).toISOString().split("T")[0];se({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:a,subscriptionEnd:Se(a,"monthly")}),R(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),Z("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:ve}),(0,h.jsx)(l.v0,{children:"Total Managers"}),(0,h.jsx)(l.d1,{children:"Currently active"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:be}),(0,h.jsx)(l.v0,{children:"Active Subscriptions"}),(0,h.jsxs)(l.d1,{children:[ve>0?(fe/ve).toFixed(1):0," restaurants per manager"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:fe}),(0,h.jsx)(l.v0,{children:"Total Restaurants"}),(0,h.jsx)(l.d1,{children:"Across all managers"})]}),(0,h.jsxs)(l.hI,{color:"#D97706",children:[(0,h.jsxs)(l.Os,{children:[(0,d.vv)(we/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,h.jsx)(l.v0,{children:"Total Revenue"}),(0,h.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,h.jsxs)(i.Qn,{children:[(0,h.jsxs)(i.Jt,{value:M,onChange:e=>k(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,h.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>_(e.target.value)})]}),(0,h.jsxs)(l.XI,{children:[(0,h.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,h.jsx)("span",{className:"col-info",children:"Manager Info"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Restaurants"}),(0,h.jsx)("span",{className:"col-revenue",children:"Revenue (RM)"}),(0,h.jsx)("span",{children:"Last Active"}),(0,h.jsx)("span",{className:"col-action",children:"Actions"})]}),0===ye.length?(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):ye.map(e=>(0,h.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,h.jsxs)(l.Np,{children:[(0,h.jsxs)(l.Uj,{className:"col-info",children:[(0,h.jsx)(l.PM,{children:"Manager Info"}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(j,{children:[e.fullName,e.is_demo&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"DEMO"}),e.is_test&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"TEST"})]}),(0,h.jsxs)(y,{children:[e.managerId," \u2022 ",e.email]})]})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Status"}),(0,h.jsx)("div",{children:(0,h.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Restaurants"}),(0,h.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),he(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,h.jsxs)(l.Uj,{className:"col-revenue",children:[(0,h.jsx)(l.PM,{children:"Revenue (RM)"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,h.jsxs)(l.Uj,{children:[(0,h.jsx)(l.PM,{children:"Last Active"}),(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,h.jsxs)(l.wr,{children:[(0,h.jsx)(l.K0,{onClick:()=>(e=>{const n=e.role,a=je(n),t=a.length>0?a[0]:null;V({...e,planType:e.planType||(t?t.display_name:""),planAmount:e.planAmount||(t?t.base_price_monthly:"149.00"),billingCycle:e.billingCycle||"monthly",paymentModel:"Brand General"===n?"brand_manager":"Restaurant Owner"===n?"restaurant_owner":"foodcourt_manager",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||"",currency:e.currency||"MYR"}),q(!0)})(e),title:"Edit Manager",children:(0,h.jsx)(f,{children:"Edit"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{$(e),W("toggle"),U(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,h.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{$(e),W("resetPassword"),U(!0)})(e),title:"Reset Password",children:(0,h.jsx)(f,{children:"\u26b7"})}),(0,h.jsx)(l.K0,{onClick:()=>(e=>{$(e),W("delete"),U(!0)})(e),title:"Delete Manager",children:(0,h.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),E&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:Ce,title:"Add New Manager",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:Ce,children:"Cancel"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",re);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:A(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(re.managerId&&re.fullName&&re.companyName&&re.email&&re.position&&re.department&&re.phone)if("Brand Manager"!==re.role||re.parentManagerId)if("Foodcourt Manager"!==re.role||re.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:re.managerId,email:re.email,role:re.role,full_name:re.fullName,company_name:re.companyName,position:re.position,department:re.department,phone:re.phone,address:re.address};"Brand General"!==re.role&&"Foodcourt General"!==re.role&&"Restaurant Owner"!==re.role||(n.plan_type=re.planType,n.plan_amount=parseFloat(re.planAmount)||0,n.billing_cycle=re.billingCycle,n.currency=re.currency,n.subscription_start=re.subscriptionStart,n.subscription_end=re.subscriptionEnd,n.auto_renew=!1!==re.autoRenew),"Brand Manager"!==re.role&&"Foodcourt Manager"!==re.role||!re.parentManagerId||(n.manager_id=parseInt(re.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:A(),body:JSON.stringify(n)});let t;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const r=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{t=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),a.ok?(T("Manager created successfully."),D(t.generatedPassword||""),G(!1),I(!0),Ce(),await xe()):Z("Failed to create manager: "+(t.error||t.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?Z("Cannot connect to server. Please ensure the backend server is running"):Z("Error creating manager: "+n.message)}}else Z("Please select a Foodcourt General for this Foodcourt Manager");else Z("Please select a Brand General for this Brand Manager");else Z("Please fill in all required fields");else Z("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]}),children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter unique manager ID",value:re.managerId,onChange:e=>Fe("managerId",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter full name",value:re.fullName,onChange:e=>Fe("fullName",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter company name",value:re.companyName,onChange:e=>Fe("companyName",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager Role *"}),(0,h.jsxs)(i.Jt,{value:re.role,onChange:e=>{const n=e.target.value;Fe("role",n);const a=je(n),t=a.length>0?a[0]:null,r="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";se(e=>({...e,role:n,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?String((0,d.jL)(t||{},e.currency)):e.planAmount,paymentModel:r}))},children:[(0,h.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,h.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,h.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,h.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,h.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===re.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Brand General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:re.parentManagerId,onChange:e=>Fe("parentManagerId",e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Select Brand General"}),de.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===re.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Foodcourt General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:re.parentManagerId,onChange:e=>Fe("parentManagerId",e.target.value),children:[(0,h.jsx)("option",{value:"",children:"Select Foodcourt General"}),pe.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:re.position,onChange:e=>Fe("position",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department *"}),(0,h.jsx)(S,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:re.department,onChange:e=>Fe("department",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address *"}),(0,h.jsx)(S,{type:"email",placeholder:"Enter email address",value:re.email,onChange:e=>Fe("email",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:re.phone,onChange:e=>Fe("phone",e)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(F,{placeholder:"Enter company address",value:re.address,onChange:e=>Fe("address",e.target.value)})]}),("Foodcourt General"===re.role||"Brand General"===re.role||"Restaurant Owner"===re.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,h.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Currency *"}),(0,h.jsx)(i.Jt,{value:re.currency,onChange:e=>{const n=e.target.value,a=je(re.role).find(e=>e.display_name===re.planType);Fe("currency",n),a&&Fe("planAmount",String((0,d.jL)(a,n)))},children:ie.map(e=>(0,h.jsx)("option",{value:e,children:e},e))})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Plan *"}),(0,h.jsxs)(i.Jt,{value:re.planType,onChange:e=>{const n=je(re.role).find(n=>n.display_name===e.target.value);Fe("planType",e.target.value),n&&Fe("planAmount",String((0,d.jL)(n,re.currency)))},children:[(0,h.jsx)("option",{value:"",children:"Select Plan"}),je(re.role).map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,re.currency),"/month)"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Billing Cycle *"}),(0,h.jsxs)(i.Jt,{value:re.billingCycle,onChange:e=>Fe("billingCycle",e.target.value),children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Start Date *"}),(0,h.jsx)(S,{type:"date",value:re.subscriptionStart,onChange:e=>Fe("subscriptionStart",e.target.value)})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription End Date (Auto)"}),(0,h.jsx)(S,{type:"date",value:re.subscriptionEnd,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(w,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,h.jsx)("input",{type:"checkbox",checked:re.autoRenew,onChange:e=>Fe("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,h.jsx)(C,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),X&&(0,h.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:X})]}),B&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:()=>I(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[P&&(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(P),G(!0),setTimeout(()=>G(!1),2e3)},children:O?"Copied!":"Copy Password"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>I(!1),children:"Done"})]}),children:[(0,h.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[N," Please share this password securely. They should change it after first login."]}),P&&(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:P})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),Y&&L&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>K(!1),title:"Manager Details",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>K(!1),children:"Close"})}),children:(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID"}),(0,h.jsx)(S,{type:"text",value:L.managerId,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name"}),(0,h.jsx)(S,{type:"text",value:L.fullName,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name"}),(0,h.jsx)(S,{type:"text",value:L.companyName,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position"}),(0,h.jsx)(S,{type:"text",value:L.position,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department"}),(0,h.jsx)(S,{type:"text",value:L.department,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address"}),(0,h.jsx)(S,{type:"email",value:L.email,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number"}),(0,h.jsx)(S,{type:"tel",value:(0,c.FI)(L.phone),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Status"}),(0,h.jsx)(S,{type:"text",value:"active"===L.status?"Active":"Inactive",disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Restaurant Count"}),(0,h.jsx)(S,{type:"text",value:L.restaurantCount.toString(),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Total Revenue"}),(0,h.jsx)(S,{type:"text",value:(0,d.vv)(L.totalRevenue,e.currency),disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Created Date"}),(0,h.jsx)(S,{type:"text",value:L.createdAt,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Last Active"}),(0,h.jsx)(S,{type:"text",value:L.lastActive,disabled:!0})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(F,{value:L.address,disabled:!0})]})]})}),H&&Q&&(0,h.jsxs)(l.aF,{isOpen:!0,onClose:()=>q(!1),title:"Edit Manager",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>{q(!1),ne("")},children:"Cancel"}),(0,h.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(Q)if(Q.managerId&&Q.fullName&&Q.companyName&&Q.email&&Q.position&&Q.department&&Q.phone)try{console.log("\ud83d\udd04 Updating manager:",Q);const e=Q.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:Q.managerId,full_name:Q.fullName,company_name:Q.companyName,email:Q.email,position:Q.position,department:Q.department,phone:Q.phone,address:Q.address};"Brand General"!==Q.role&&"Foodcourt General"!==Q.role&&"Restaurant Owner"!==Q.role||(n.plan_type=Q.planType,n.plan_amount=parseFloat(String(Q.planAmount))||0,n.billing_cycle=Q.billingCycle,n.currency=Q.currency||"MYR",n.subscription_start=Q.subscriptionStart,n.subscription_end=Q.subscriptionEnd,n.auto_renew=!1!==Q.autoRenew),console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:A(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)q(!1),V(null),ne(""),await xe();else{const e=await a.json();ne(e.error||"Update failed")}}catch(e){ne("Error updating manager: "+e.message)}else ne("Please fill in all required fields")},children:"Update Manager"})]}),children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Manager ID * (Read-only)"}),(0,h.jsx)(S,{type:"text",value:Q.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Full Name *"}),(0,h.jsx)(S,{type:"text",value:Q.fullName,onChange:e=>V({...Q,fullName:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Company Name *"}),(0,h.jsx)(S,{type:"text",value:Q.companyName,onChange:e=>V({...Q,companyName:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Position *"}),(0,h.jsx)(S,{type:"text",value:Q.position,onChange:e=>V({...Q,position:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Department *"}),(0,h.jsx)(S,{type:"text",value:Q.department,onChange:e=>V({...Q,department:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Email Address *"}),(0,h.jsx)(S,{type:"email",value:Q.email,onChange:e=>V({...Q,email:e.target.value})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Phone Number *"}),(0,h.jsx)(p.A,{value:Q.phone,onChange:e=>V({...Q,phone:e})})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Address"}),(0,h.jsx)(F,{value:Q.address,onChange:e=>V({...Q,address:e.target.value})})]}),"Brand Manager"===Q.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Brand General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:Q.manager_id||"",onChange:e=>V({...Q,manager_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Brand General"}),de.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===Q.role&&(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Foodcourt General * (Parent Manager)"}),(0,h.jsxs)(i.Jt,{value:Q.manager_id||"",onChange:e=>V({...Q,manager_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Foodcourt General"}),pe.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===Q.role||"Brand General"===Q.role||"Restaurant Owner"===Q.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(w,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,h.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Currency *"}),(0,h.jsx)(i.Jt,{value:(0,d.Wh)(Q.currency||"MYR"),onChange:e=>{const n=e.target.value,a=je(Q.role).find(e=>e.display_name===Q.planType);V({...Q,currency:n,planAmount:a?String((0,d.jL)(a,n)):Q.planAmount})},children:ie.map(e=>(0,h.jsx)("option",{value:e,children:e},e))})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Plan *"}),(0,h.jsxs)(i.Jt,{value:Q.planType||"",onChange:e=>{const n=je(Q.role).find(n=>n.display_name===e.target.value),a=(0,d.Wh)(Q.currency||"MYR");V({...Q,planType:e.target.value,planAmount:n?String((0,d.jL)(n,a)):Q.planAmount})},children:[(0,h.jsx)("option",{value:"",children:"Select Plan"}),je(Q.role).map(e=>(0,h.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,(0,d.Wh)(Q.currency||"MYR")),"/month)"]},e.id))]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Billing Cycle *"}),(0,h.jsxs)(i.Jt,{value:Q.billingCycle||"monthly",onChange:e=>{const n=e.target.value;V({...Q,billingCycle:n,subscriptionEnd:Se(Q.subscriptionStart||"",n)})},children:[(0,h.jsx)("option",{value:"monthly",children:"Monthly"}),(0,h.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription Start Date *"}),(0,h.jsx)(S,{type:"date",value:Q.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>{const n=e.target.value;V({...Q,subscriptionStart:n,subscriptionEnd:Se(n,Q.billingCycle||"monthly")})}})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(C,{children:"Subscription End Date (Auto)"}),(0,h.jsx)(S,{type:"date",value:Q.subscriptionEnd||"",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})]}),ee&&(0,h.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:ee})]}),z&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>U(!1),title:"Confirm Action",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.$n,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,h.jsxs)(l.$n,{variant:"delete"===J?"danger":"primary",onClick:async()=>{if(L&&J){try{if("delete"===J){const e=L.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:A()});if(n.ok)await xe();else{const e=await n.json().catch(()=>({error:"Delete failed"}));te(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===J){const e=L.id.replace("mgr-",""),n=await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:A()});if(n.ok){const e=await n.json();T("Password has been reset."),D(e.tempPassword||""),G(!1),I(!0)}else te("Password reset failed")}else if("toggle"===J){const e=L.id.replace("mgr-",""),n="active"===L.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:A(),body:JSON.stringify({status:n})})).ok?a(e=>e.map(e=>e.id===L.id?{...e,status:n}:e)):te("Status update failed")}}catch(e){te(`Action failed: ${e.message}. Please try again.`)}U(!1),$(null),W(null)}},children:[" ","delete"===J?"Delete":"resetPassword"===J?"Reset Password":"Confirm"," "]})]}),children:(0,h.jsxs)("div",{children:["delete"===J&&(0,h.jsxs)("div",{children:[(0,h.jsxs)("p",{style:{margin:"0 0 12px",fontWeight:"600",color:"#DC2626"},children:['Are you sure you want to delete "',null===L||void 0===L?void 0:L.fullName,'" (',null===L||void 0===L?void 0:L.managerId,")?"]}),(0,h.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA",fontSize:"13px",color:"#991B1B",lineHeight:"1.6"},children:["Brand General"===(null===L||void 0===L?void 0:L.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 Brands owned by this user will be unlinked (owner cleared, brands remain)"}),(0,h.jsx)("div",{children:"\u2022 Restaurants under those brands will not be affected"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),"Foodcourt General"===(null===L||void 0===L?void 0:L.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 Foodcourts owned by this user will be unlinked (owner cleared, foodcourts remain)"}),(0,h.jsx)("div",{children:"\u2022 Restaurants under those foodcourts will not be affected"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),"Restaurant Owner"===(null===L||void 0===L?void 0:L.role)&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 All restaurant ownership links will be removed"}),(0,h.jsx)("div",{children:"\u2022 Restaurants will remain but without an owner"}),(0,h.jsx)("div",{children:"\u2022 Operation tickets and notices by this user will be preserved"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),(0,h.jsx)("div",{style:{marginTop:"8px",fontWeight:"600"},children:"This action cannot be undone."})]})]}),"resetPassword"===J&&(0,h.jsxs)("p",{children:['Are you sure you want to reset the password for "',null===L||void 0===L?void 0:L.fullName,'" (',null===L||void 0===L?void 0:L.managerId,")?"]}),"toggle"===J&&(0,h.jsxs)("p",{children:["Are you sure you want to ","active"===(null===L||void 0===L?void 0:L.status)?"deactivate":"activate",' "',null===L||void 0===L?void 0:L.fullName,'" (',null===L||void 0===L?void 0:L.managerId,")?"]})]})}),ae&&(0,h.jsx)(l.aF,{isOpen:!0,onClose:()=>te(""),title:"Error",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(l.$n,{variant:"primary",onClick:()=>te(""),children:"OK"})}),children:(0,h.jsx)("p",{style:{color:"#DC2626"},children:ae})})]})]})})}}}]);