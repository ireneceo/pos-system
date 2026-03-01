"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,a,n)=>{n.d(a,{DO:()=>c,Jt:()=>p,Qn:()=>d});var t=n(8819),r=(n(9950),n(4752)),s=n(4414);const l=r.Ay.div`
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
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${t.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
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
`,i=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  &:disabled {
    background: ${t.w.colors.surfaceHover};
    color: ${t.w.colors.text.muted};
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
`,d=e=>{let{children:a,className:n,style:t,...r}=e;return(0,s.jsx)(l,{className:n,style:t,...r,children:a})},c=e=>{let{placeholder:a="Search...",...n}=e;return(0,s.jsx)(o,{placeholder:a,...n})},p=e=>{let{children:a,...n}=e;return(0,s.jsx)(i,{...n,children:a})}},3643:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var t=n(9950),r=n(4492),s=n(4752),l=n(1367),o=n(2674),i=n(2488),d=n(6038),c=n(2924),p=n(8666),h=n(9018),u=n(4414);const g=(0,s.Ay)(o.A0)`
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
`,m=(0,s.Ay)(o.Hj)`
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
`,x=s.Ay.div``,j=s.Ay.div`
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
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,E=s.Ay.div`
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
`,S=s.Ay.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,M=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,R=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},A=()=>{var e,a;const{operationSettings:n}=(0,h.Pj)(),{user:s}=(0,l.As)(),[A,k]=(0,t.useState)([]),[I,N]=(0,t.useState)(""),[F,_]=(0,t.useState)("all"),[P,D]=(0,t.useState)(!1),[$,B]=(0,t.useState)(!1),[T,O]=(0,t.useState)(""),[Q,G]=(0,t.useState)(null),[L,Z]=(0,t.useState)(!1),[U,J]=(0,t.useState)(null),[z,H]=(0,t.useState)(!1),[Y,K]=(0,t.useState)(!1),[W,q]=(0,t.useState)(null),[V,X]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[ee,ae]=(0,t.useState)([]),[ne,te]=(0,t.useState)([]),[re,se]=(0,t.useState)([]),le=(0,r.Zp)(),oe=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const a=await fetch("/api/users?role=Manager",{headers:R()});if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const n=await a.json();console.log("\ud83d\udc65 Manager users data from API:",n);const t=await fetch("/api/restaurants",{headers:R()}),r=t.ok?await t.json():[];console.log("\ud83c\udfea All restaurants data:",r);const s=n.data||n;if(console.log("\ud83d\udc54 Manager users found:",s),0===s.length)return console.log("\u26a0\ufe0f No manager users found"),void k([]);let l=[];try{const e=await fetch("/api/invoices",{headers:R()});if(e.ok){const a=await e.json();l=a.data||a}}catch(e){console.error("\u274c Error fetching invoices:",e)}const o=s.map(a=>{console.log("\ud83d\udd04 Processing manager:",a);const n=r.filter(e=>{const n=e.managerId===a.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===a.id.toString());return n||t});console.log(`\ud83d\udd0d Manager ${a.username} (ID: ${a.id}) has ${n.length} restaurants`);let t=0;try{t=l.filter(e=>n.some(a=>{var n;return a.id.toString()===(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())})).reduce((e,a)=>e+parseFloat(a.amount||a.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const s={id:`mgr-${a.id}`,managerId:a.username||`manager-${a.id}`,userId:a.id,fullName:a.full_name||a.username||"Unknown Name",companyName:a.company_name||"Unknown Company",email:a.email,position:a.role||a.position||"Manager",department:a.department||"Management",phone:a.phone||"+60 12-345-6789",status:"active",restaurantCount:n.length,totalRevenue:t,createdAt:a.createdAt?new Date(a.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:a.address||"No address provided"};return console.log("\u2705 Transformed manager:",s),s});console.log("\u2705 All transformed managers data:",o),console.log("\u2705 Setting managers state with",o.length,"managers"),k(o)}else console.error("\u274c Failed to fetch users:",a.status),k([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),k([])}};(0,t.useEffect)(()=>{oe(),de(),ie()},[]);const ie=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:R()});if(e.ok){const a=await e.json(),n=a.data||a,t=n.filter(e=>"Brand General"===e.role);te(t);const r=n.filter(e=>"Foodcourt General"===e.role);se(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},de=async()=>{try{const e=await fetch("/api/plans",{headers:R()});if(e.ok){const a=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);ae(a)}}catch(e){console.error("Error fetching plans:",e)}},ce=e=>"Brand General"===e||"Brand Manager"===e?ee.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?ee.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:A.length,searchTerm:I,filterStatus:F,managers:A});const pe=A.filter(e=>{const a=e.managerId.toLowerCase().includes(I.toLowerCase())||e.fullName.toLowerCase().includes(I.toLowerCase())||e.companyName.toLowerCase().includes(I.toLowerCase())||e.position.toLowerCase().includes(I.toLowerCase())||e.department.toLowerCase().includes(I.toLowerCase())||e.email.toLowerCase().includes(I.toLowerCase()),n="all"===F||e.status===F;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:a,matchesFilter:n,managerStatus:e.status,expectedStatus:F}),a&&n});console.log("\ud83d\udd0d Filtered results:",pe.length,"managers");const he=A.length,ue=A.reduce((e,a)=>e+a.restaurantCount,0),ge=ue,me=A.reduce((e,a)=>e+a.totalRevenue,0),xe=()=>{D(!1);const e=ee.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),X({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]})},je=(e,a)=>{X(n=>({...n,[e]:"autoRenew"===e?"true"===a||!0===a:a}))};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(o.mc,{children:[(0,u.jsxs)(o.Y9,{children:[(0,u.jsx)(o.hE,{children:"Managers"}),(0,u.jsxs)(o.ex,{children:[(0,u.jsx)(o.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(pe.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(a),t=document.createElement("a");t.href=n,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,u.jsx)(o.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=ee.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),X({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]}),D(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),alert("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(o.UC,{children:[(0,u.jsxs)(o.MD,{children:[(0,u.jsxs)(o.hI,{color:"#059669",children:[(0,u.jsx)(o.Os,{children:he}),(0,u.jsx)(o.v0,{children:"Total Managers"}),(0,u.jsx)(o.d1,{children:"Currently active"})]}),(0,u.jsxs)(o.hI,{color:"#2563EB",children:[(0,u.jsx)(o.Os,{children:ge}),(0,u.jsx)(o.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(o.d1,{children:[he>0?(ue/he).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(o.hI,{color:"#7C3AED",children:[(0,u.jsx)(o.Os,{children:ue}),(0,u.jsx)(o.v0,{children:"Total Restaurants"}),(0,u.jsx)(o.d1,{children:"Across all managers"})]}),(0,u.jsxs)(o.hI,{color:"#D97706",children:[(0,u.jsxs)(o.Os,{children:[(0,d.vv)(me/1e3,n.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(o.v0,{children:"Total Revenue"}),(0,u.jsx)(o.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:I,onChange:e=>N(e.target.value)}),(0,u.jsxs)(i.Jt,{value:F,onChange:e=>_(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,u.jsxs)(o.XI,{children:[(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{children:"Actions"})]}),0===pe.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===A.length?"Data may still be loading...":"Try adjusting your filters"})]}):pe.map(e=>(0,u.jsxs)(m,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(o.Np,{children:[(0,u.jsxs)(o.Uj,{children:[(0,u.jsx)(o.PM,{children:"Manager Info"}),(0,u.jsxs)(x,{children:[(0,u.jsx)(j,{children:e.fullName}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(o.Uj,{children:[(0,u.jsx)(o.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(o.Uj,{children:[(0,u.jsx)(o.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),le(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(o.Uj,{children:[(0,u.jsx)(o.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(o.Uj,{children:[(0,u.jsx)(o.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(o.wr,{children:[(0,u.jsx)(o.K0,{onClick:()=>(e=>{const a=e.role,n=ce(a),t=n.length>0?n[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),q({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===a?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),K(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(f,{children:"Edit"})}),(0,u.jsx)(o.K0,{onClick:()=>(e=>{G(e),J("toggle"),Z(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(o.K0,{onClick:()=>(e=>{G(e),J("resetPassword"),Z(!0)})(e),title:"Reset Password",children:(0,u.jsx)(f,{children:"\u26b7"})}),(0,u.jsx)(o.K0,{onClick:()=>(e=>{G(e),J("delete"),Z(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),P&&(0,u.jsx)(o.mH,{show:P,onClick:xe,children:(0,u.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(o.rQ,{children:[(0,u.jsx)(o.wt,{children:"Add New Manager"}),(0,u.jsx)(o.Jn,{onClick:xe,children:"\xd7"})]}),(0,u.jsx)(o.cw,{children:(0,u.jsxs)(C,{children:[(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Manager ID *"}),(0,u.jsx)(o.ZQ,{type:"text",placeholder:"Enter unique manager ID",value:V.managerId,onChange:e=>je("managerId",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Full Name *"}),(0,u.jsx)(o.ZQ,{type:"text",placeholder:"Enter full name",value:V.fullName,onChange:e=>je("fullName",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Company Name *"}),(0,u.jsx)(o.ZQ,{type:"text",placeholder:"Enter company name",value:V.companyName,onChange:e=>je("companyName",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:V.role,onChange:e=>{const a=e.target.value;je("role",a);const n=ce(a),t=n.length>0?n[0]:null,r="Restaurant Owner"===a?"restaurant_owner":"Brand General"===a||"Brand Manager"===a?"brand_manager":"foodcourt_manager";X(e=>({...e,role:a,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===V.role&&(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:V.parentManagerId,onChange:e=>je("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ne.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===V.role&&(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:V.parentManagerId,onChange:e=>je("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),re.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Position *"}),(0,u.jsx)(o.ZQ,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:V.position,onChange:e=>je("position",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Department *"}),(0,u.jsx)(o.ZQ,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:V.department,onChange:e=>je("department",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Email Address *"}),(0,u.jsx)(o.ZQ,{type:"email",placeholder:"Enter email address",value:V.email,onChange:e=>je("email",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:V.phone,onChange:e=>je("phone",e)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Address"}),(0,u.jsx)(o.Lz,{placeholder:"Enter company address",value:V.address,onChange:e=>je("address",e.target.value)})]}),("Foodcourt General"===V.role||"Brand General"===V.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.gE,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:V.planType,onChange:e=>{const a=ce(V.role).find(a=>a.display_name===e.target.value);je("planType",e.target.value),a&&je("planAmount",a.base_price_monthly)},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),ce(V.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:V.billingCycle,onChange:e=>je("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription Start Date *"}),(0,u.jsx)(o.ZQ,{type:"date",value:V.subscriptionStart,onChange:e=>je("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription End Date"}),(0,u.jsx)(o.ZQ,{type:"date",value:V.subscriptionEnd,onChange:e=>je("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(o.gE,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:V.autoRenew,onChange:e=>je("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(o.lR,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(o.jl,{children:[(0,u.jsx)(o.$n,{variant:"secondary",onClick:xe,children:"Cancel"}),(0,u.jsx)(o.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",V);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:R(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const a=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(a)?`${a.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})()){if(!V.managerId||!V.fullName||!V.companyName||!V.email||!V.position||!V.department||!V.phone)return console.error("\u274c Validation failed:",{managerId:V.managerId,fullName:V.fullName,companyName:V.companyName,email:V.email,position:V.position,department:V.department,phone:V.phone}),void alert("Please fill in all required fields");if("Brand Manager"!==V.role||V.parentManagerId)if("Foodcourt Manager"!==V.role||V.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const a={username:V.managerId,email:V.email,password:"manager123",role:V.role,full_name:V.fullName,company_name:V.companyName,position:V.position,department:V.department,phone:V.phone,address:V.address};"Brand Manager"!==V.role&&"Foodcourt Manager"!==V.role||!V.parentManagerId||(a.manager_id=parseInt(V.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",a),console.log("\ud83d\udccd API URL:","/api/users");const n=await fetch("/api/users",{method:"POST",headers:R(),body:JSON.stringify(a)});let t;console.log("\ud83d\udce1 Response status:",n.status),console.log("\ud83d\udce1 Response ok:",n.ok);const r=n.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await n.json();else{const a=await n.text();if(console.log("\ud83d\udce1 Response text:",a),""===a.trim())throw new Error("Empty response from server");try{t=JSON.parse(a)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",a),new Error(`Invalid JSON response: ${a.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),n.ok?(console.log("\u2705 Manager created successfully:",t),xe(),O("Manager created successfully! Default password: manager123"),B(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await oe()):(console.error("\u274c Failed to create manager:",t),alert("Failed to create manager: "+(t.error||t.message||"Unknown error")))}catch(a){console.error("\u274c Error creating manager:",a),console.error("Error details:",{name:a.name,message:a.message,stack:a.stack}),a.message.includes("Failed to fetch")?alert("Cannot connect to server. Please ensure the backend server is running"):alert("Error creating manager: "+a.message)}}else alert("Please select a Foodcourt General for this Foodcourt Manager");else alert("Please select a Brand General for this Brand Manager")}else alert("Cannot connect to backend server. Please check if the server is running")},disabled:!V.fullName.trim()||!V.email.trim(),children:"Add Manager"})]})]})}),$&&(0,u.jsx)(o.mH,{show:$,onClick:()=>B(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(E,{children:"\u2713"}),(0,u.jsx)(S,{children:"Success!"}),(0,u.jsx)(M,{children:T}),(0,u.jsx)(o.$n,{variant:"primary",onClick:()=>B(!1),children:"OK"})]})}),z&&Q&&(0,u.jsx)(o.mH,{show:z,onClick:()=>H(!1),children:(0,u.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(o.rQ,{children:[(0,u.jsx)(o.wt,{children:"Manager Details"}),(0,u.jsx)(o.Jn,{onClick:()=>H(!1),children:"\xd7"})]}),(0,u.jsx)(o.cw,{children:(0,u.jsxs)(C,{children:[(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Manager ID"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.managerId,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Full Name"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.fullName,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Company Name"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.companyName,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Position"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.position,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Department"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.department,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Email Address"}),(0,u.jsx)(o.ZQ,{type:"email",value:Q.email,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Phone Number"}),(0,u.jsx)(o.ZQ,{type:"tel",value:(0,c.FI)(Q.phone),disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Status"}),(0,u.jsx)(o.ZQ,{type:"text",value:"active"===Q.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Restaurant Count"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Total Revenue"}),(0,u.jsx)(o.ZQ,{type:"text",value:(0,d.vv)(Q.totalRevenue,n.currency),disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Created Date"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.createdAt,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Last Active"}),(0,u.jsx)(o.ZQ,{type:"text",value:Q.lastActive,disabled:!0})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Address"}),(0,u.jsx)(o.Lz,{value:Q.address,disabled:!0})]})]})}),(0,u.jsx)(o.jl,{children:(0,u.jsx)(o.$n,{variant:"secondary",onClick:()=>H(!1),children:"Close"})})]})}),Y&&W&&(0,u.jsx)(o.mH,{show:Y,onClick:()=>K(!1),children:(0,u.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(o.rQ,{children:[(0,u.jsx)(o.wt,{children:"Edit Manager"}),(0,u.jsx)(o.Jn,{onClick:()=>K(!1),children:"\xd7"})]}),(0,u.jsx)(o.cw,{children:(0,u.jsxs)(C,{children:[(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(o.ZQ,{type:"text",value:W.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Full Name *"}),(0,u.jsx)(o.ZQ,{type:"text",value:W.fullName,onChange:e=>q({...W,fullName:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Company Name *"}),(0,u.jsx)(o.ZQ,{type:"text",value:W.companyName,onChange:e=>q({...W,companyName:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Position *"}),(0,u.jsx)(o.ZQ,{type:"text",value:W.position,onChange:e=>q({...W,position:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Department *"}),(0,u.jsx)(o.ZQ,{type:"text",value:W.department,onChange:e=>q({...W,department:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Email Address *"}),(0,u.jsx)(o.ZQ,{type:"email",value:W.email,onChange:e=>q({...W,email:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:W.phone,onChange:e=>q({...W,phone:e})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Address"}),(0,u.jsx)(o.Lz,{value:W.address,onChange:e=>q({...W,address:e.target.value})})]}),"Brand Manager"===W.role&&(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:W.manager_id||"",onChange:e=>q({...W,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ne.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===W.role&&(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:W.manager_id||"",onChange:e=>q({...W,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),re.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===W.role||"Brand General"===W.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.gE,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:W.planType||"",onChange:e=>{const a=ce(W.role).find(a=>a.display_name===e.target.value);q({...W,planType:e.target.value,planAmount:a?a.base_price_monthly:W.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),ce(W.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:W.billingCycle||"monthly",onChange:e=>q({...W,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription Start Date *"}),(0,u.jsx)(o.ZQ,{type:"date",value:W.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>q({...W,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(o.gE,{children:[(0,u.jsx)(o.lR,{children:"Subscription End Date"}),(0,u.jsx)(o.ZQ,{type:"date",value:W.subscriptionEnd||"",onChange:e=>q({...W,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(o.gE,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===W.autoRenew||W.autoRenew,onChange:e=>q({...W,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(o.lR,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(o.jl,{children:[(0,u.jsx)(o.$n,{variant:"secondary",onClick:()=>K(!1),children:"Cancel"}),(0,u.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(W)if(W.managerId&&W.fullName&&W.companyName&&W.email&&W.position&&W.department&&W.phone)try{console.log("\ud83d\udd04 Updating manager:",W);const e=W.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a={username:W.managerId,full_name:W.fullName,company_name:W.companyName,email:W.email,position:W.position,department:W.department,phone:W.phone,address:W.address};console.log("\ud83d\udcdd Update data:",a);const n=await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Update response status:",n.status),!n.ok){const e=await n.json();throw console.error("\u274c Update failed:",e),new Error(e.error||"Update failed")}{const e=await n.json();console.log("\u2705 Manager updated successfully:",e),K(!1),q(null),O("Manager updated successfully"),B(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await oe()}}catch(e){console.error("\u274c Error updating manager:",e),alert("Error updating manager: "+e.message)}else alert("Please fill in all required fields")},disabled:!(null!==W&&void 0!==W&&null!==(e=W.fullName)&&void 0!==e&&e.trim())||!(null!==W&&void 0!==W&&null!==(a=W.email)&&void 0!==a&&a.trim()),children:"Update Manager"})]})]})}),L&&(0,u.jsx)(o.mH,{show:L,onClick:()=>Z(!1),children:(0,u.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(o.rQ,{children:[(0,u.jsx)(o.wt,{children:"Confirm Action"}),(0,u.jsx)(o.Jn,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,u.jsx)(o.cw,{children:(0,u.jsxs)("p",{children:["delete"===U&&`Are you sure you want to delete Manager ID: ${null===Q||void 0===Q?void 0:Q.managerId}?`,"resetPassword"===U&&`Are you sure you want to reset password for Manager ID: ${null===Q||void 0===Q?void 0:Q.managerId}?`,"toggle"===U&&`Are you sure you want to ${"active"===(null===Q||void 0===Q?void 0:Q.status)?"deactivate":"activate"} Manager ID: ${null===Q||void 0===Q?void 0:Q.managerId}?`]})}),(0,u.jsxs)(o.jl,{children:[(0,u.jsx)(o.$n,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,u.jsx)(o.$n,{variant:"delete"===U?"danger":"primary",onClick:async()=>{if(Q&&U){try{if("delete"===U){console.log("\ud83d\udd04 Deleting manager:",Q.id);const e=Q.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a=await fetch(`/api/users/${e}`,{method:"DELETE",headers:R()});if(console.log("\ud83d\udce1 Delete response status:",a.status),!a.ok){const e=await a.text();throw console.error("\u274c Delete failed:",e),new Error(`Delete failed: ${a.status}`)}await oe(),O("Manager deleted successfully"),console.log("\u2705 Manager deleted and list refreshed")}else if("resetPassword"===U){const e=Q.id.replace("mgr-",""),a=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();if(!(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:R(),body:JSON.stringify({newPassword:a})})).ok)throw new Error("Password reset failed");O(`Password reset successfully. New password: ${a}\n\nPlease save this password and share it securely with the manager.`)}else if("toggle"===U){const e=Q.id.replace("mgr-",""),a="active"===Q.status?"inactive":"active";if(!(await fetch(`/api/users/${e}`,{method:"PUT",headers:R(),body:JSON.stringify({status:a})})).ok)throw new Error("Status update failed");k(e=>e.map(e=>e.id===Q.id?{...e,status:a}:e)),O(`Manager ${"active"===a?"activated":"deactivated"} successfully`)}B(!0)}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Z(!1),G(null),J(null)}},children:"delete"===U?"Delete":"resetPassword"===U?"Reset Password":"Confirm"})]})]})})]})]})})}}}]);