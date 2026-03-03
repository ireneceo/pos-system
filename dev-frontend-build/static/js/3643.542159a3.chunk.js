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
`,D=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,R=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},T=()=>{const{operationSettings:e}=(0,h.Pj)();(0,o.As)();const[n,a]=(0,t.useState)([]),[s,T]=(0,t.useState)(""),[$,O]=(0,t.useState)("all"),[G,U]=(0,t.useState)(!1),[z,L]=(0,t.useState)(!1),[J,Y]=(0,t.useState)(""),[K,W]=(0,t.useState)(null),[q,H]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(null),[X,Z]=(0,t.useState)(!1),[ee,ne]=(0,t.useState)(!1),[ae,te]=(0,t.useState)(null),[re,se]=(0,t.useState)(""),[oe,le]=(0,t.useState)(""),[ie,de]=(0,t.useState)(""),[ce,pe]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[he,ue]=(0,t.useState)([]),[xe,ge]=(0,t.useState)([]),[me,je]=(0,t.useState)([]),ye=(0,r.Zp)(),ve=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:R()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const t=await n.json();console.log("\ud83d\udc65 Manager users data from API:",t);const r=await fetch("/api/restaurants",{headers:R()}),s=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=t.data||t;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void a([]);let l=[];try{const e=await fetch("/api/invoices",{headers:R()});if(e.ok){const n=await e.json();l=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=s.filter(e=>{const a=e.managerId===n.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||t});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let t=0;try{t=l.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const r={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name||"Unknown Company",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:t,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided"};return console.log("\u2705 Transformed manager:",r),r});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),a(i)}else console.error("\u274c Failed to fetch users:",n.status),a([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),a([])}};(0,t.useEffect)(()=>{ve(),we(),fe()},[]);const fe=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:R()});if(e.ok){const n=await e.json(),a=n.data||n,t=a.filter(e=>"Brand General"===e.role);ge(t);const r=a.filter(e=>"Foodcourt General"===e.role);je(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},we=async()=>{try{const e=await fetch("/api/plans",{headers:R()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);ue(n)}}catch(e){console.error("Error fetching plans:",e)}},be=e=>"Brand General"===e||"Brand Manager"===e?he.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?he.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:s,filterStatus:$,managers:n});const Ce=n.filter(e=>{const n=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),a="all"===$||e.status===$;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:$}),n&&a});console.log("\ud83d\udd0d Filtered results:",Ce.length,"managers");const Se=n.length,Ae=n.reduce((e,n)=>e+n.restaurantCount,0),Me=Ae,ke=n.reduce((e,n)=>e+n.totalRevenue,0),Fe=()=>{U(!1);const e=he.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),pe({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]})},Ie=(e,n)=>{pe(a=>({...a,[e]:"autoRenew"===e?"true"===n||!0===n:n}))};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Managers"}),(0,u.jsxs)(l.ex,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Ce.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=he.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),pe({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]}),U(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),se("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:Se}),(0,u.jsx)(l.v0,{children:"Total Managers"}),(0,u.jsx)(l.d1,{children:"Currently active"})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:Me}),(0,u.jsx)(l.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(l.d1,{children:[Se>0?(Ae/Se).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:Ae}),(0,u.jsx)(l.v0,{children:"Total Restaurants"}),(0,u.jsx)(l.d1,{children:"Across all managers"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsxs)(l.Os,{children:[(0,d.vv)(ke/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(l.v0,{children:"Total Revenue"}),(0,u.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>T(e.target.value)}),(0,u.jsxs)(i.Jt,{value:$,onChange:e=>O(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{children:"Actions"})]}),0===Ce.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):Ce.map(e=>(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Manager Info"}),(0,u.jsxs)(m,{children:[(0,u.jsx)(j,{children:e.fullName}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),ye(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.K0,{onClick:()=>(e=>{const n=e.role,a=be(n),t=a.length>0?a[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),te({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===n?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),ne(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(f,{children:"Edit"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),V("toggle"),H(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),V("resetPassword"),H(!0)})(e),title:"Reset Password",children:(0,u.jsx)(f,{children:"\u26b7"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),V("delete"),H(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),G&&(0,u.jsx)(w,{show:G,onClick:Fe,children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Add New Manager"}),(0,u.jsx)(A,{onClick:Fe,children:"\xd7"})]}),(0,u.jsxs)(M,{children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter unique manager ID",value:ce.managerId,onChange:e=>Ie("managerId",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter full name",value:ce.fullName,onChange:e=>Ie("fullName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter company name",value:ce.companyName,onChange:e=>Ie("companyName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:ce.role,onChange:e=>{const n=e.target.value;Ie("role",n);const a=be(n),t=a.length>0?a[0]:null,r="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";pe(e=>({...e,role:n,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===ce.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ce.parentManagerId,onChange:e=>Ie("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),xe.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ce.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ce.parentManagerId,onChange:e=>Ie("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),me.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:ce.position,onChange:e=>Ie("position",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:ce.department,onChange:e=>Ie("department",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",placeholder:"Enter email address",value:ce.email,onChange:e=>Ie("email",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:ce.phone,onChange:e=>Ie("phone",e)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{placeholder:"Enter company address",value:ce.address,onChange:e=>Ie("address",e.target.value)})]}),("Foodcourt General"===ce.role||"Brand General"===ce.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:ce.planType,onChange:e=>{const n=be(ce.role).find(n=>n.display_name===e.target.value);Ie("planType",e.target.value),n&&Ie("planAmount",n.base_price_monthly)},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),be(ce.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:ce.billingCycle,onChange:e=>Ie("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:ce.subscriptionStart,onChange:e=>Ie("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:ce.subscriptionEnd,onChange:e=>Ie("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:ce.autoRenew,onChange:e=>Ie("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),re&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:re})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:Fe,children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",ce);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:R(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(ce.managerId&&ce.fullName&&ce.companyName&&ce.email&&ce.position&&ce.department&&ce.phone)if("Brand Manager"!==ce.role||ce.parentManagerId)if("Foodcourt Manager"!==ce.role||ce.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:ce.managerId,email:ce.email,password:"manager123",role:ce.role,full_name:ce.fullName,company_name:ce.companyName,position:ce.position,department:ce.department,phone:ce.phone,address:ce.address};"Brand Manager"!==ce.role&&"Foodcourt Manager"!==ce.role||!ce.parentManagerId||(n.manager_id=parseInt(ce.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:R(),body:JSON.stringify(n)});let t;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const r=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{t=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),a.ok?(Y("Manager created. Default password: manager123"),L(!0),Fe(),await ve()):se("Failed to create manager: "+(t.error||t.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?se("Cannot connect to server. Please ensure the backend server is running"):se("Error creating manager: "+n.message)}}else se("Please select a Foodcourt General for this Foodcourt Manager");else se("Please select a Brand General for this Brand Manager");else se("Please fill in all required fields");else se("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),z&&(0,u.jsx)(w,{show:z,onClick:()=>L(!1),children:(0,u.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(P,{children:"\u2713"}),(0,u.jsx)(D,{children:J}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>L(!1),children:"OK"})]})}),X&&K&&(0,u.jsx)(w,{show:X,onClick:()=>Z(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Manager Details"}),(0,u.jsx)(A,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID"}),(0,u.jsx)(N,{type:"text",value:K.managerId,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name"}),(0,u.jsx)(N,{type:"text",value:K.fullName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name"}),(0,u.jsx)(N,{type:"text",value:K.companyName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position"}),(0,u.jsx)(N,{type:"text",value:K.position,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department"}),(0,u.jsx)(N,{type:"text",value:K.department,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address"}),(0,u.jsx)(N,{type:"email",value:K.email,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number"}),(0,u.jsx)(N,{type:"tel",value:(0,c.FI)(K.phone),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Status"}),(0,u.jsx)(N,{type:"text",value:"active"===K.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Restaurant Count"}),(0,u.jsx)(N,{type:"text",value:K.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Total Revenue"}),(0,u.jsx)(N,{type:"text",value:(0,d.vv)(K.totalRevenue,e.currency),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Created Date"}),(0,u.jsx)(N,{type:"text",value:K.createdAt,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Last Active"}),(0,u.jsx)(N,{type:"text",value:K.lastActive,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:K.address,disabled:!0})]})]})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})}),ee&&ae&&(0,u.jsx)(w,{show:ee,onClick:()=>ne(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Edit Manager"}),(0,u.jsx)(A,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,u.jsxs)(M,{children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(N,{type:"text",value:ae.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",value:ae.fullName,onChange:e=>te({...ae,fullName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",value:ae.companyName,onChange:e=>te({...ae,companyName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",value:ae.position,onChange:e=>te({...ae,position:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",value:ae.department,onChange:e=>te({...ae,department:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",value:ae.email,onChange:e=>te({...ae,email:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:ae.phone,onChange:e=>te({...ae,phone:e})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:ae.address,onChange:e=>te({...ae,address:e.target.value})})]}),"Brand Manager"===ae.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ae.manager_id||"",onChange:e=>te({...ae,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),xe.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ae.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ae.manager_id||"",onChange:e=>te({...ae,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),me.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===ae.role||"Brand General"===ae.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:ae.planType||"",onChange:e=>{const n=be(ae.role).find(n=>n.display_name===e.target.value);te({...ae,planType:e.target.value,planAmount:n?n.base_price_monthly:ae.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),be(ae.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:ae.billingCycle||"monthly",onChange:e=>te({...ae,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:ae.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>te({...ae,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:ae.subscriptionEnd||"",onChange:e=>te({...ae,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===ae.autoRenew||ae.autoRenew,onChange:e=>te({...ae,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),oe&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:oe})]}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{ne(!1),le("")},children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(ae)if(ae.managerId&&ae.fullName&&ae.companyName&&ae.email&&ae.position&&ae.department&&ae.phone)try{console.log("\ud83d\udd04 Updating manager:",ae);const e=ae.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:ae.managerId,full_name:ae.fullName,company_name:ae.companyName,email:ae.email,position:ae.position,department:ae.department,phone:ae.phone,address:ae.address};console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)ne(!1),te(null),le(""),await ve();else{const e=await a.json();le(e.error||"Update failed")}}catch(e){le("Error updating manager: "+e.message)}else le("Please fill in all required fields")},children:"Update Manager"})]})]})}),q&&(0,u.jsx)(w,{show:q,onClick:()=>H(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Confirm Action"}),(0,u.jsx)(A,{onClick:()=>H(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)("p",{children:["delete"===Q&&`Are you sure you want to delete Manager ID: ${null===K||void 0===K?void 0:K.managerId}? This action cannot be undone.`,"resetPassword"===Q&&`Are you sure you want to reset password for Manager ID: ${null===K||void 0===K?void 0:K.managerId}?`,"toggle"===Q&&`Are you sure you want to ${"active"===(null===K||void 0===K?void 0:K.status)?"deactivate":"activate"} Manager ID: ${null===K||void 0===K?void 0:K.managerId}?`]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"delete"===Q?"danger":"primary",onClick:async()=>{if(K&&Q){try{if("delete"===Q){const e=K.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:R()});if(n.ok)await ve();else{const e=await n.json().catch(()=>({error:"Delete failed"}));de(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===Q){const e=K.id.replace("mgr-",""),n=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:R(),body:JSON.stringify({newPassword:n})})).ok?(Y(`New password: ${n}\n\nPlease save this password and share it securely with the manager.`),L(!0)):de("Password reset failed")}else if("toggle"===Q){const e=K.id.replace("mgr-",""),n="active"===K.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify({status:n})})).ok?a(e=>e.map(e=>e.id===K.id?{...e,status:n}:e)):de("Status update failed")}}catch(e){de(`Action failed: ${e.message}. Please try again.`)}H(!1),W(null),V(null)}},children:"delete"===Q?"Delete":"resetPassword"===Q?"Reset Password":"Confirm"})]})]})}),ie&&(0,u.jsx)(w,{show:!!ie,onClick:()=>de(""),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Error"}),(0,u.jsx)(A,{onClick:()=>de(""),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsx)("p",{style:{color:"#DC2626"},children:ie})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>de(""),children:"OK"})})]})})]})]})})}}}]);