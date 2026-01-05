"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,a,n)=>{n.d(a,{DO:()=>d,Jt:()=>c,Qn:()=>i});n(9950);var t=n(4752),r=n(4414);const s=t.Ay.div`
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
`,i=e=>{let{children:a,className:n,style:t,...o}=e;return(0,r.jsx)(s,{className:n,style:t,...o,children:a})},d=e=>{let{placeholder:a="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:a,...n})},c=e=>{let{children:a,...n}=e;return(0,r.jsx)(l,{...n,children:a})}},3643:(e,a,n)=>{n.r(a),n.d(a,{default:()=>R});var t=n(9950),r=n(4492),s=n(4752),o=n(3310),l=n(7492),i=n(2488),d=n(6038),c=n(2924),p=n(2874),h=n(9018),u=n(4414);const x=(0,s.Ay)(l.A0)`
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
`,f=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":return"#DC2626";default:return"#6B7280"}}};
`,v=s.Ay.span`
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
  align-items: center;
  justify-content: center;
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
`,A=s.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
`,S=s.Ay.button`
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
`,T=s.Ay.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,D=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,R=()=>{const{operationSettings:e}=(0,h.Pj)(),[a,n]=(0,t.useState)([]),[s,R]=(0,t.useState)(""),[$,G]=(0,t.useState)("all"),[O,U]=(0,t.useState)(!1),[L,z]=(0,t.useState)(!1),[J,Y]=(0,t.useState)(""),[K,W]=(0,t.useState)(null),[q,H]=(0,t.useState)(!1),[V,Q]=(0,t.useState)(null),[X,Z]=(0,t.useState)(!1),[ee,ae]=(0,t.useState)(!1),[ne,te]=(0,t.useState)(null),[re,se]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[oe,le]=(0,t.useState)([]),[ie,de]=(0,t.useState)([]),[ce,pe]=(0,t.useState)([]),he=(0,r.Zp)(),ue=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const a=await fetch("/api/users?role=Manager");if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const t=await a.json();console.log("\ud83d\udc65 Manager users data from API:",t);const r=await fetch("/api/restaurants"),s=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=t.data||t;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void n([]);let l=[];try{const e=await fetch("/api/invoices");if(e.ok){const a=await e.json();l=a.data||a}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(a=>{console.log("\ud83d\udd04 Processing manager:",a);const n=s.filter(e=>{const n=e.managerId===a.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===a.id.toString());return n||t});console.log(`\ud83d\udd0d Manager ${a.username} (ID: ${a.id}) has ${n.length} restaurants`);let t=0;try{t=l.filter(e=>n.some(a=>{var n;return a.id.toString()===(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())})).reduce((e,a)=>e+parseFloat(a.amount||a.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const r={id:`mgr-${a.id}`,managerId:a.username||`manager-${a.id}`,userId:a.id,fullName:a.full_name||a.username||"Unknown Name",companyName:a.company_name||"Unknown Company",email:a.email,position:a.role||a.position||"Manager",department:a.department||"Management",phone:a.phone||"+60 12-345-6789",status:"active",restaurantCount:n.length,totalRevenue:t,createdAt:a.createdAt?new Date(a.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:a.address||"No address provided"};return console.log("\u2705 Transformed manager:",r),r});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),n(i)}else console.error("\u274c Failed to fetch users:",a.status),n([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),n([])}};(0,t.useEffect)(()=>{ue(),ge(),xe()},[]);const xe=async()=>{try{const e=await fetch("/api/users?role=Manager");if(e.ok){const a=await e.json(),n=a.data||a,t=n.filter(e=>"Brand General"===e.role);de(t);const r=n.filter(e=>"Foodcourt General"===e.role);pe(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},ge=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const a=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);le(a)}}catch(e){console.error("Error fetching plans:",e)}},me=e=>"Brand General"===e||"Brand Manager"===e?oe.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?oe.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:a.length,searchTerm:s,filterStatus:$,managers:a});const je=a.filter(e=>{const a=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),n="all"===$||e.status===$;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:a,matchesFilter:n,managerStatus:e.status,expectedStatus:$}),a&&n});console.log("\ud83d\udd0d Filtered results:",je.length,"managers");const ye=a.length,fe=a.reduce((e,a)=>e+a.restaurantCount,0),ve=fe,we=a.reduce((e,a)=>e+a.totalRevenue,0),be=()=>{U(!1);const e=oe.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),se({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]})},Ce=(e,a)=>{se(n=>({...n,[e]:"autoRenew"===e?"true"===a||!0===a:a}))};return(0,u.jsx)(o.A,{children:(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Managers"}),(0,u.jsxs)(l.ex,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(je.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(a),t=document.createElement("a");t.href=n,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=oe.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),se({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]}),U(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),alert("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:ye}),(0,u.jsx)(l.v0,{children:"Total Managers"}),(0,u.jsx)(l.d1,{children:"Currently active"})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:ve}),(0,u.jsx)(l.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(l.d1,{children:[ye>0?(fe/ye).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:fe}),(0,u.jsx)(l.v0,{children:"Total Restaurants"}),(0,u.jsx)(l.d1,{children:"Across all managers"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsxs)(l.Os,{children:[(0,d.vv)(we/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(l.v0,{children:"Total Revenue"}),(0,u.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>R(e.target.value)}),(0,u.jsxs)(i.Jt,{value:$,onChange:e=>G(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{children:"Actions"})]}),0===je.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Data may still be loading...":"Try adjusting your filters"})]}):je.map(e=>(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Manager Info"}),(0,u.jsxs)(m,{children:[(0,u.jsx)(j,{children:e.fullName}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(f,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),he(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.K0,{onClick:()=>(e=>{const a=e.role,n=me(a),t=n.length>0?n[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),te({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===a?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),ae(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(v,{children:"Edit"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),Q("toggle"),H(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(v,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),Q("resetPassword"),H(!0)})(e),title:"Reset Password",children:(0,u.jsx)(v,{children:"\u26b7"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{W(e),Q("delete"),H(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(v,{children:"\u2715"})})]})]},e.id))]}),O&&(0,u.jsx)(w,{show:O,onClick:be,children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(A,{children:"Add New Manager"}),(0,u.jsx)(S,{onClick:be,children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter unique manager ID",value:re.managerId,onChange:e=>Ce("managerId",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter full name",value:re.fullName,onChange:e=>Ce("fullName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter company name",value:re.companyName,onChange:e=>Ce("companyName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:re.role,onChange:e=>{const a=e.target.value;Ce("role",a);const n=me(a),t=n.length>0?n[0]:null,r="Brand General"===a||"Brand Manager"===a?"brand_manager":"foodcourt_manager";se(e=>({...e,role:a,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"})]})]}),"Brand Manager"===re.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:re.parentManagerId,onChange:e=>Ce("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ie.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===re.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:re.parentManagerId,onChange:e=>Ce("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),ce.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:re.position,onChange:e=>Ce("position",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:re.department,onChange:e=>Ce("department",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",placeholder:"Enter email address",value:re.email,onChange:e=>Ce("email",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:re.phone,onChange:e=>Ce("phone",e)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{placeholder:"Enter company address",value:re.address,onChange:e=>Ce("address",e.target.value)})]}),("Foodcourt General"===re.role||"Brand General"===re.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:re.planType,onChange:e=>{const a=me(re.role).find(a=>a.display_name===e.target.value);Ce("planType",e.target.value),a&&Ce("planAmount",a.base_price_monthly)},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),me(re.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:re.billingCycle,onChange:e=>Ce("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:re.subscriptionStart,onChange:e=>Ce("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:re.subscriptionEnd,onChange:e=>Ce("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:re.autoRenew,onChange:e=>Ce("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:be,children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",re);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:{Accept:"application/json"},mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const a=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(a)?`${a.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})()){if(!re.managerId||!re.fullName||!re.companyName||!re.email||!re.position||!re.department||!re.phone)return console.error("\u274c Validation failed:",{managerId:re.managerId,fullName:re.fullName,companyName:re.companyName,email:re.email,position:re.position,department:re.department,phone:re.phone}),void alert("Please fill in all required fields");if("Brand Manager"!==re.role||re.parentManagerId)if("Foodcourt Manager"!==re.role||re.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const a={username:re.managerId,email:re.email,password:"manager123",role:re.role,full_name:re.fullName,company_name:re.companyName,position:re.position,department:re.department,phone:re.phone,address:re.address};"Brand Manager"!==re.role&&"Foodcourt Manager"!==re.role||!re.parentManagerId||(a.manager_id=parseInt(re.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",a),console.log("\ud83d\udccd API URL:","/api/users");const n=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)});let t;console.log("\ud83d\udce1 Response status:",n.status),console.log("\ud83d\udce1 Response ok:",n.ok);const r=n.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await n.json();else{const a=await n.text();if(console.log("\ud83d\udce1 Response text:",a),""===a.trim())throw new Error("Empty response from server");try{t=JSON.parse(a)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",a),new Error(`Invalid JSON response: ${a.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),n.ok?(console.log("\u2705 Manager created successfully:",t),be(),Y("Manager created successfully! Default password: manager123"),z(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await ue()):(console.error("\u274c Failed to create manager:",t),alert("Failed to create manager: "+(t.error||t.message||"Unknown error")))}catch(a){console.error("\u274c Error creating manager:",a),console.error("Error details:",{name:a.name,message:a.message,stack:a.stack}),a.message.includes("Failed to fetch")?alert("Cannot connect to server. Please ensure the backend server is running"):alert("Error creating manager: "+a.message)}}else alert("Please select a Foodcourt General for this Foodcourt Manager");else alert("Please select a Brand General for this Brand Manager")}else alert("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),L&&(0,u.jsx)(w,{show:L,onClick:()=>z(!1),children:(0,u.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(P,{children:"\u2713"}),(0,u.jsx)(T,{children:"Success!"}),(0,u.jsx)(D,{children:J}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>z(!1),children:"OK"})]})}),X&&K&&(0,u.jsx)(w,{show:X,onClick:()=>Z(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(A,{children:"Manager Details"}),(0,u.jsx)(S,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID"}),(0,u.jsx)(N,{type:"text",value:K.managerId,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name"}),(0,u.jsx)(N,{type:"text",value:K.fullName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name"}),(0,u.jsx)(N,{type:"text",value:K.companyName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position"}),(0,u.jsx)(N,{type:"text",value:K.position,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department"}),(0,u.jsx)(N,{type:"text",value:K.department,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address"}),(0,u.jsx)(N,{type:"email",value:K.email,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number"}),(0,u.jsx)(N,{type:"tel",value:(0,c.FI)(K.phone),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Status"}),(0,u.jsx)(N,{type:"text",value:"active"===K.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Restaurant Count"}),(0,u.jsx)(N,{type:"text",value:K.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Total Revenue"}),(0,u.jsx)(N,{type:"text",value:(0,d.vv)(K.totalRevenue,e.currency),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Created Date"}),(0,u.jsx)(N,{type:"text",value:K.createdAt,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Last Active"}),(0,u.jsx)(N,{type:"text",value:K.lastActive,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:K.address,disabled:!0})]})]})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})}),ee&&ne&&(0,u.jsx)(w,{show:ee,onClick:()=>ae(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(A,{children:"Edit Manager"}),(0,u.jsx)(S,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(N,{type:"text",value:ne.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",value:ne.fullName,onChange:e=>te({...ne,fullName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",value:ne.companyName,onChange:e=>te({...ne,companyName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",value:ne.position,onChange:e=>te({...ne,position:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",value:ne.department,onChange:e=>te({...ne,department:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",value:ne.email,onChange:e=>te({...ne,email:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:ne.phone,onChange:e=>te({...ne,phone:e})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:ne.address,onChange:e=>te({...ne,address:e.target.value})})]}),"Brand Manager"===ne.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ne.manager_id||"",onChange:e=>te({...ne,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ie.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ne.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ne.manager_id||"",onChange:e=>te({...ne,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),ce.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===ne.role||"Brand General"===ne.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:ne.planType||"",onChange:e=>{const a=me(ne.role).find(a=>a.display_name===e.target.value);te({...ne,planType:e.target.value,planAmount:a?a.base_price_monthly:ne.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),me(ne.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:ne.billingCycle||"monthly",onChange:e=>te({...ne,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:ne.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>te({...ne,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:ne.subscriptionEnd||"",onChange:e=>te({...ne,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===ne.autoRenew||ne.autoRenew,onChange:e=>te({...ne,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(ne)if(ne.managerId&&ne.fullName&&ne.companyName&&ne.email&&ne.position&&ne.department&&ne.phone)try{console.log("\ud83d\udd04 Updating manager:",ne);const e=ne.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a={username:ne.managerId,full_name:ne.fullName,company_name:ne.companyName,email:ne.email,position:ne.position,department:ne.department,phone:ne.phone,address:ne.address};console.log("\ud83d\udcdd Update data:",a);const n=await fetch(`/api/users/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Update response status:",n.status),!n.ok){const e=await n.json();throw console.error("\u274c Update failed:",e),new Error(e.error||"Update failed")}{const e=await n.json();console.log("\u2705 Manager updated successfully:",e),ae(!1),te(null),Y("Manager updated successfully"),z(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await ue()}}catch(e){console.error("\u274c Error updating manager:",e),alert("Error updating manager: "+e.message)}else alert("Please fill in all required fields")},children:"Update Manager"})]})]})}),q&&(0,u.jsx)(w,{show:q,onClick:()=>H(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(A,{children:"Confirm Action"}),(0,u.jsx)(S,{onClick:()=>H(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)("p",{children:["delete"===V&&`Are you sure you want to delete Manager ID: ${null===K||void 0===K?void 0:K.managerId}?`,"resetPassword"===V&&`Are you sure you want to reset password for Manager ID: ${null===K||void 0===K?void 0:K.managerId}?`,"toggle"===V&&`Are you sure you want to ${"active"===(null===K||void 0===K?void 0:K.status)?"deactivate":"activate"} Manager ID: ${null===K||void 0===K?void 0:K.managerId}?`]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"delete"===V?"danger":"primary",onClick:async()=>{if(K&&V){try{if("delete"===V){console.log("\ud83d\udd04 Deleting manager:",K.id);const e=K.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a=await fetch(`/api/users/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 Delete response status:",a.status),!a.ok){const e=await a.text();throw console.error("\u274c Delete failed:",e),new Error(`Delete failed: ${a.status}`)}await ue(),Y("Manager deleted successfully"),console.log("\u2705 Manager deleted and list refreshed")}else if("resetPassword"===V){const e=K.id.replace("mgr-",""),a=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();if(!(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({newPassword:a})})).ok)throw new Error("Password reset failed");Y(`Password reset successfully. New password: ${a}\n\nPlease save this password and share it securely with the manager.`)}else if("toggle"===V){const e=K.id.replace("mgr-",""),a="active"===K.status?"inactive":"active";if(!(await fetch(`/api/users/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:a})})).ok)throw new Error("Status update failed");n(e=>e.map(e=>e.id===K.id?{...e,status:a}:e)),Y(`Manager ${"active"===a?"activated":"deactivated"} successfully`)}z(!0)}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}H(!1),W(null),Q(null)}},children:"delete"===V?"Delete":"resetPassword"===V?"Reset Password":"Confirm"})]})]})})]})]})})}}}]);