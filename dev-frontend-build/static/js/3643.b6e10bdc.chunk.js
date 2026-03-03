"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,n,a)=>{a.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>i});a(9950);var t=a(4752),r=a(4414);const s=t.Ay.div`
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
`,l=t.Ay.select`
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
`,i=e=>{let{children:n,className:a,style:t,...o}=e;return(0,r.jsx)(s,{className:a,style:t,...o,children:n})},d=e=>{let{placeholder:n="Search...",...a}=e;return(0,r.jsx)(o,{placeholder:n,...a})},c=e=>{let{children:n,...a}=e;return(0,r.jsx)(l,{...a,children:n})}},3643:(e,n,a)=>{a.r(n),a.d(n,{default:()=>T});var t=a(9950),r=a(4492),s=a(4752),o=a(1367),l=a(8409),i=a(2488),d=a(6038),c=a(2924),p=a(8666),h=a(9018),u=a(4414);const x=(0,s.Ay)(l.A0)`
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
`,w=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`,b=s.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,C=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,S=s.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
`,A=s.Ay.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #6B7280;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #F3F4F6;
    color: #0A2540;
  }
`,M=s.Ay.div`
  padding: 24px;
`,k=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,F=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,I=s.Ay.div`
  display: flex;
  flex-direction: column;
`,E=s.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,N=s.Ay.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,_=s.Ay.textarea`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,B=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,P=s.Ay.div`
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
`,D=(s.Ay.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`),R=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},T=()=>{const{operationSettings:e}=(0,h.Pj)(),{user:n}=(0,o.As)(),[a,s]=(0,t.useState)([]),[T,$]=(0,t.useState)(""),[O,G]=(0,t.useState)("all"),[z,U]=(0,t.useState)(!1),[L,J]=(0,t.useState)(!1),[Y,K]=(0,t.useState)(""),[W,q]=(0,t.useState)(null),[H,Q]=(0,t.useState)(!1),[V,X]=(0,t.useState)(null),[Z,ee]=(0,t.useState)(!1),[ne,ae]=(0,t.useState)(!1),[te,re]=(0,t.useState)(null),[se,oe]=(0,t.useState)(""),[le,ie]=(0,t.useState)(""),[de,ce]=(0,t.useState)(""),[pe,he]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[ue,xe]=(0,t.useState)([]),[ge,me]=(0,t.useState)([]),[je,ye]=(0,t.useState)([]),ve=(0,r.Zp)(),fe=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:R()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const a=await n.json();console.log("\ud83d\udc65 Manager users data from API:",a);const t=await fetch("/api/restaurants",{headers:R()}),r=t.ok?await t.json():[];console.log("\ud83c\udfea All restaurants data:",r);const o=a.data||a;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void s([]);let l=[];try{const e=await fetch("/api/invoices",{headers:R()});if(e.ok){const n=await e.json();l=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=r.filter(e=>{const a=e.managerId===n.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||t});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let t=0;try{t=l.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const s={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name||"Unknown Company",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:t,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided"};return console.log("\u2705 Transformed manager:",s),s});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),s(i)}else console.error("\u274c Failed to fetch users:",n.status),s([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),s([])}};(0,t.useEffect)(()=>{fe(),be(),we()},[]);const we=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:R()});if(e.ok){const n=await e.json(),a=n.data||n,t=a.filter(e=>"Brand General"===e.role);me(t);const r=a.filter(e=>"Foodcourt General"===e.role);ye(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},be=async()=>{try{const e=await fetch("/api/plans",{headers:R()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);xe(n)}}catch(e){console.error("Error fetching plans:",e)}},Ce=e=>"Brand General"===e||"Brand Manager"===e?ue.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?ue.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:a.length,searchTerm:T,filterStatus:O,managers:a});const Se=a.filter(e=>{const n=e.managerId.toLowerCase().includes(T.toLowerCase())||e.fullName.toLowerCase().includes(T.toLowerCase())||e.companyName.toLowerCase().includes(T.toLowerCase())||e.position.toLowerCase().includes(T.toLowerCase())||e.department.toLowerCase().includes(T.toLowerCase())||e.email.toLowerCase().includes(T.toLowerCase()),a="all"===O||e.status===O;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:O}),n&&a});console.log("\ud83d\udd0d Filtered results:",Se.length,"managers");const Ae=a.length,Me=a.reduce((e,n)=>e+n.restaurantCount,0),ke=Me,Fe=a.reduce((e,n)=>e+n.totalRevenue,0),Ie=()=>{U(!1);const e=ue.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),he({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]})},Ee=(e,n)=>{he(a=>({...a,[e]:"autoRenew"===e?"true"===n||!0===n:n}))};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Managers"}),(0,u.jsxs)(l.ex,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Se.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=ue.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),he({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]}),U(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),oe("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:Ae}),(0,u.jsx)(l.v0,{children:"Total Managers"}),(0,u.jsx)(l.d1,{children:"Currently active"})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:ke}),(0,u.jsx)(l.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(l.d1,{children:[Ae>0?(Me/Ae).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:Me}),(0,u.jsx)(l.v0,{children:"Total Restaurants"}),(0,u.jsx)(l.d1,{children:"Across all managers"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsxs)(l.Os,{children:[(0,d.vv)(Fe/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(l.v0,{children:"Total Revenue"}),(0,u.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:T,onChange:e=>$(e.target.value)}),(0,u.jsxs)(i.Jt,{value:O,onChange:e=>G(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{children:"Actions"})]}),0===Se.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Data may still be loading...":"Try adjusting your filters"})]}):Se.map(e=>(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Manager Info"}),(0,u.jsxs)(m,{children:[(0,u.jsx)(j,{children:e.fullName}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),ve(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.K0,{onClick:()=>(e=>{const n=e.role,a=Ce(n),t=a.length>0?a[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),re({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===n?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),ae(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(f,{children:"Edit"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{q(e),X("toggle"),Q(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{q(e),X("resetPassword"),Q(!0)})(e),title:"Reset Password",children:(0,u.jsx)(f,{children:"\u26b7"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{q(e),X("delete"),Q(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),z&&(0,u.jsx)(w,{show:z,onClick:Ie,children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Add New Manager"}),(0,u.jsx)(A,{onClick:Ie,children:"\xd7"})]}),(0,u.jsxs)(M,{children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter unique manager ID",value:pe.managerId,onChange:e=>Ee("managerId",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter full name",value:pe.fullName,onChange:e=>Ee("fullName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter company name",value:pe.companyName,onChange:e=>Ee("companyName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:pe.role,onChange:e=>{const n=e.target.value;Ee("role",n);const a=Ce(n),t=a.length>0?a[0]:null,r="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";he(e=>({...e,role:n,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===pe.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:pe.parentManagerId,onChange:e=>Ee("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ge.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===pe.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:pe.parentManagerId,onChange:e=>Ee("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),je.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:pe.position,onChange:e=>Ee("position",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:pe.department,onChange:e=>Ee("department",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",placeholder:"Enter email address",value:pe.email,onChange:e=>Ee("email",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:pe.phone,onChange:e=>Ee("phone",e)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{placeholder:"Enter company address",value:pe.address,onChange:e=>Ee("address",e.target.value)})]}),("Foodcourt General"===pe.role||"Brand General"===pe.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:pe.planType,onChange:e=>{const n=Ce(pe.role).find(n=>n.display_name===e.target.value);Ee("planType",e.target.value),n&&Ee("planAmount",n.base_price_monthly)},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),Ce(pe.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:pe.billingCycle,onChange:e=>Ee("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:pe.subscriptionStart,onChange:e=>Ee("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:pe.subscriptionEnd,onChange:e=>Ee("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:pe.autoRenew,onChange:e=>Ee("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),se&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:se})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:Ie,children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",pe);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:R(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(pe.managerId&&pe.fullName&&pe.companyName&&pe.email&&pe.position&&pe.department&&pe.phone)if("Brand Manager"!==pe.role||pe.parentManagerId)if("Foodcourt Manager"!==pe.role||pe.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:pe.managerId,email:pe.email,password:"manager123",role:pe.role,full_name:pe.fullName,company_name:pe.companyName,position:pe.position,department:pe.department,phone:pe.phone,address:pe.address};"Brand Manager"!==pe.role&&"Foodcourt Manager"!==pe.role||!pe.parentManagerId||(n.manager_id=parseInt(pe.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:R(),body:JSON.stringify(n)});let t;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const r=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{t=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),a.ok?(K("Manager created. Default password: manager123"),J(!0),Ie(),await fe()):oe("Failed to create manager: "+(t.error||t.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?oe("Cannot connect to server. Please ensure the backend server is running"):oe("Error creating manager: "+n.message)}}else oe("Please select a Foodcourt General for this Foodcourt Manager");else oe("Please select a Brand General for this Brand Manager");else oe("Please fill in all required fields");else oe("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),L&&(0,u.jsx)(w,{show:L,onClick:()=>J(!1),children:(0,u.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(P,{children:"\u2713"}),(0,u.jsx)(D,{children:Y}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>J(!1),children:"OK"})]})}),Z&&W&&(0,u.jsx)(w,{show:Z,onClick:()=>ee(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Manager Details"}),(0,u.jsx)(A,{onClick:()=>ee(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID"}),(0,u.jsx)(N,{type:"text",value:W.managerId,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name"}),(0,u.jsx)(N,{type:"text",value:W.fullName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name"}),(0,u.jsx)(N,{type:"text",value:W.companyName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position"}),(0,u.jsx)(N,{type:"text",value:W.position,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department"}),(0,u.jsx)(N,{type:"text",value:W.department,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address"}),(0,u.jsx)(N,{type:"email",value:W.email,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number"}),(0,u.jsx)(N,{type:"tel",value:(0,c.FI)(W.phone),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Status"}),(0,u.jsx)(N,{type:"text",value:"active"===W.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Restaurant Count"}),(0,u.jsx)(N,{type:"text",value:W.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Total Revenue"}),(0,u.jsx)(N,{type:"text",value:(0,d.vv)(W.totalRevenue,e.currency),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Created Date"}),(0,u.jsx)(N,{type:"text",value:W.createdAt,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Last Active"}),(0,u.jsx)(N,{type:"text",value:W.lastActive,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:W.address,disabled:!0})]})]})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>ee(!1),children:"Close"})})]})}),ne&&te&&(0,u.jsx)(w,{show:ne,onClick:()=>ae(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Edit Manager"}),(0,u.jsx)(A,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,u.jsxs)(M,{children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(N,{type:"text",value:te.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",value:te.fullName,onChange:e=>re({...te,fullName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",value:te.companyName,onChange:e=>re({...te,companyName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",value:te.position,onChange:e=>re({...te,position:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",value:te.department,onChange:e=>re({...te,department:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",value:te.email,onChange:e=>re({...te,email:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:te.phone,onChange:e=>re({...te,phone:e})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:te.address,onChange:e=>re({...te,address:e.target.value})})]}),"Brand Manager"===te.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:te.manager_id||"",onChange:e=>re({...te,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ge.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===te.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:te.manager_id||"",onChange:e=>re({...te,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),je.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===te.role||"Brand General"===te.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:te.planType||"",onChange:e=>{const n=Ce(te.role).find(n=>n.display_name===e.target.value);re({...te,planType:e.target.value,planAmount:n?n.base_price_monthly:te.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),Ce(te.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:te.billingCycle||"monthly",onChange:e=>re({...te,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:te.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>re({...te,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:te.subscriptionEnd||"",onChange:e=>re({...te,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===te.autoRenew||te.autoRenew,onChange:e=>re({...te,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),le&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:le})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{ae(!1),ie("")},children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(te)if(te.managerId&&te.fullName&&te.companyName&&te.email&&te.position&&te.department&&te.phone)try{console.log("\ud83d\udd04 Updating manager:",te);const e=te.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:te.managerId,full_name:te.fullName,company_name:te.companyName,email:te.email,position:te.position,department:te.department,phone:te.phone,address:te.address};console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)ae(!1),re(null),ie(""),await fe();else{const e=await a.json();ie(e.error||"Update failed")}}catch(e){ie("Error updating manager: "+e.message)}else ie("Please fill in all required fields")},children:"Update Manager"})]})]})}),H&&(0,u.jsx)(w,{show:H,onClick:()=>Q(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Confirm Action"}),(0,u.jsx)(A,{onClick:()=>Q(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)("p",{children:["delete"===V&&`Are you sure you want to delete Manager ID: ${null===W||void 0===W?void 0:W.managerId}? This action cannot be undone.`,"resetPassword"===V&&`Are you sure you want to reset password for Manager ID: ${null===W||void 0===W?void 0:W.managerId}?`,"toggle"===V&&`Are you sure you want to ${"active"===(null===W||void 0===W?void 0:W.status)?"deactivate":"activate"} Manager ID: ${null===W||void 0===W?void 0:W.managerId}?`]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"delete"===V?"danger":"primary",onClick:async()=>{if(W&&V){try{if("delete"===V){const e=W.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:R()});if(n.ok)await fe();else{const e=await n.json().catch(()=>({error:"Delete failed"}));ce(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===V){const e=W.id.replace("mgr-",""),n=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:R(),body:JSON.stringify({newPassword:n})})).ok?(K(`New password: ${n}\n\nPlease save this password and share it securely with the manager.`),J(!0)):ce("Password reset failed")}else if("toggle"===V){const e=W.id.replace("mgr-",""),n="active"===W.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify({status:n})})).ok?s(e=>e.map(e=>e.id===W.id?{...e,status:n}:e)):ce("Status update failed")}}catch(e){ce(`Action failed: ${e.message}. Please try again.`)}Q(!1),q(null),X(null)}},children:"delete"===V?"Delete":"resetPassword"===V?"Reset Password":"Confirm"})]})]})}),de&&(0,u.jsx)(w,{show:!!de,onClick:()=>ce(""),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Error"}),(0,u.jsx)(A,{onClick:()=>ce(""),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsx)("p",{style:{color:"#DC2626"},children:de})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>ce(""),children:"OK"})})]})})]})]})})}}}]);