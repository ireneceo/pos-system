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
`,i=e=>{let{children:a,className:n,style:t,...o}=e;return(0,r.jsx)(s,{className:n,style:t,...o,children:a})},d=e=>{let{placeholder:a="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:a,...n})},c=e=>{let{children:a,...n}=e;return(0,r.jsx)(l,{...n,children:a})}},3643:(e,a,n)=>{n.r(a),n.d(a,{default:()=>G});var t=n(9950),r=n(4492),s=n(4752),o=n(1367),l=n(3310),i=n(2674),d=n(2488),c=n(6038),p=n(2924),h=n(8666),u=n(9018),x=n(4414);const g=(0,s.Ay)(i.A0)`
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
`,m=(0,s.Ay)(i.Hj)`
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
`,j=s.Ay.div``,y=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=s.Ay.div`
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
`,w=s.Ay.span`
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 500;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,b=s.Ay.div`
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
`,C=s.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,S=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,A=s.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
`,M=s.Ay.button`
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
`,k=s.Ay.div`
  padding: 24px;
`,F=s.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`,I=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,E=s.Ay.div`
  display: flex;
  flex-direction: column;
`,N=s.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,_=s.Ay.input`
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
`,B=s.Ay.textarea`
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
`,P=s.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 48px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`,D=s.Ay.div`
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
`,R=s.Ay.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,T=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,$=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},G=()=>{const{operationSettings:e}=(0,u.Pj)(),{user:a}=(0,o.As)(),[n,s]=(0,t.useState)([]),[G,O]=(0,t.useState)(""),[U,L]=(0,t.useState)("all"),[z,J]=(0,t.useState)(!1),[Y,K]=(0,t.useState)(!1),[W,q]=(0,t.useState)(""),[H,V]=(0,t.useState)(null),[Q,X]=(0,t.useState)(!1),[Z,ee]=(0,t.useState)(null),[ae,ne]=(0,t.useState)(!1),[te,re]=(0,t.useState)(!1),[se,oe]=(0,t.useState)(null),[le,ie]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[de,ce]=(0,t.useState)([]),[pe,he]=(0,t.useState)([]),[ue,xe]=(0,t.useState)([]),ge=(0,r.Zp)(),me=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const a=await fetch("/api/users?role=Manager",{headers:$()});if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const n=await a.json();console.log("\ud83d\udc65 Manager users data from API:",n);const t=await fetch("/api/restaurants",{headers:$()}),r=t.ok?await t.json():[];console.log("\ud83c\udfea All restaurants data:",r);const o=n.data||n;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void s([]);let l=[];try{const e=await fetch("/api/invoices",{headers:$()});if(e.ok){const a=await e.json();l=a.data||a}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(a=>{console.log("\ud83d\udd04 Processing manager:",a);const n=r.filter(e=>{const n=e.managerId===a.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===a.id.toString());return n||t});console.log(`\ud83d\udd0d Manager ${a.username} (ID: ${a.id}) has ${n.length} restaurants`);let t=0;try{t=l.filter(e=>n.some(a=>{var n;return a.id.toString()===(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())})).reduce((e,a)=>e+parseFloat(a.amount||a.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const s={id:`mgr-${a.id}`,managerId:a.username||`manager-${a.id}`,userId:a.id,fullName:a.full_name||a.username||"Unknown Name",companyName:a.company_name||"Unknown Company",email:a.email,position:a.role||a.position||"Manager",department:a.department||"Management",phone:a.phone||"+60 12-345-6789",status:"active",restaurantCount:n.length,totalRevenue:t,createdAt:a.createdAt?new Date(a.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:a.address||"No address provided"};return console.log("\u2705 Transformed manager:",s),s});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),s(i)}else console.error("\u274c Failed to fetch users:",a.status),s([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),s([])}};(0,t.useEffect)(()=>{me(),ye(),je()},[]);const je=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:$()});if(e.ok){const a=await e.json(),n=a.data||a,t=n.filter(e=>"Brand General"===e.role);he(t);const r=n.filter(e=>"Foodcourt General"===e.role);xe(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},ye=async()=>{try{const e=await fetch("/api/plans",{headers:$()});if(e.ok){const a=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);ce(a)}}catch(e){console.error("Error fetching plans:",e)}},fe=e=>"Brand General"===e||"Brand Manager"===e?de.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?de.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:G,filterStatus:U,managers:n});const ve=n.filter(e=>{const a=e.managerId.toLowerCase().includes(G.toLowerCase())||e.fullName.toLowerCase().includes(G.toLowerCase())||e.companyName.toLowerCase().includes(G.toLowerCase())||e.position.toLowerCase().includes(G.toLowerCase())||e.department.toLowerCase().includes(G.toLowerCase())||e.email.toLowerCase().includes(G.toLowerCase()),n="all"===U||e.status===U;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:a,matchesFilter:n,managerStatus:e.status,expectedStatus:U}),a&&n});console.log("\ud83d\udd0d Filtered results:",ve.length,"managers");const we=n.length,be=n.reduce((e,a)=>e+a.restaurantCount,0),Ce=be,Se=n.reduce((e,a)=>e+a.totalRevenue,0),Ae=()=>{J(!1);const e=de.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),ie({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]})},Me=(e,a)=>{ie(n=>({...n,[e]:"autoRenew"===e?"true"===a||!0===a:a}))};return(0,x.jsx)(l.A,{children:(0,x.jsxs)(i.mc,{children:[(0,x.jsxs)(i.Y9,{children:[(0,x.jsx)(i.hE,{children:"Managers"}),(0,x.jsxs)(i.ex,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(ve.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(a),t=document.createElement("a");t.href=n,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=de.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),ie({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]}),J(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),alert("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,x.jsxs)(i.UC,{children:[(0,x.jsxs)(i.MD,{children:[(0,x.jsxs)(i.hI,{color:"#059669",children:[(0,x.jsx)(i.Os,{children:we}),(0,x.jsx)(i.v0,{children:"Total Managers"}),(0,x.jsx)(i.d1,{children:"Currently active"})]}),(0,x.jsxs)(i.hI,{color:"#2563EB",children:[(0,x.jsx)(i.Os,{children:Ce}),(0,x.jsx)(i.v0,{children:"Active Subscriptions"}),(0,x.jsxs)(i.d1,{children:[we>0?(be/we).toFixed(1):0," restaurants per manager"]})]}),(0,x.jsxs)(i.hI,{color:"#7C3AED",children:[(0,x.jsx)(i.Os,{children:be}),(0,x.jsx)(i.v0,{children:"Total Restaurants"}),(0,x.jsx)(i.d1,{children:"Across all managers"})]}),(0,x.jsxs)(i.hI,{color:"#D97706",children:[(0,x.jsxs)(i.Os,{children:[(0,c.vv)(Se/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,x.jsx)(i.v0,{children:"Total Revenue"}),(0,x.jsx)(i.d1,{children:"From actual invoices"})]})]}),(0,x.jsxs)(d.Qn,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, or company...",value:G,onChange:e=>O(e.target.value)}),(0,x.jsxs)(d.Jt,{value:U,onChange:e=>L(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,x.jsxs)(i.XI,{children:[(0,x.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,x.jsx)("span",{children:"Manager Info"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Restaurants"}),(0,x.jsx)("span",{children:"Revenue (RM)"}),(0,x.jsx)("span",{children:"Last Active"}),(0,x.jsx)("span",{children:"Actions"})]}),0===ve.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):ve.map(e=>(0,x.jsxs)(m,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,x.jsxs)(i.Np,{children:[(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Manager Info"}),(0,x.jsxs)(j,{children:[(0,x.jsx)(y,{children:e.fullName}),(0,x.jsxs)(f,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Status"}),(0,x.jsx)("div",{children:(0,x.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Restaurants"}),(0,x.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),ge(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Revenue (RM)"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Last Active"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,x.jsxs)(i.wr,{children:[(0,x.jsx)(i.K0,{onClick:()=>(e=>{const a=e.role,n=fe(a),t=n.length>0?n[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),oe({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===a?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),re(!0)})(e),title:"Edit Manager",children:(0,x.jsx)(w,{children:"Edit"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{V(e),ee("toggle"),X(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,x.jsx)(w,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{V(e),ee("resetPassword"),X(!0)})(e),title:"Reset Password",children:(0,x.jsx)(w,{children:"\u26b7"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{V(e),ee("delete"),X(!0)})(e),title:"Delete Manager",children:(0,x.jsx)(w,{children:"\u2715"})})]})]},e.id))]}),z&&(0,x.jsx)(b,{show:z,onClick:Ae,children:(0,x.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(A,{children:"Add New Manager"}),(0,x.jsx)(M,{onClick:Ae,children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)(I,{children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Manager ID *"}),(0,x.jsx)(_,{type:"text",placeholder:"Enter unique manager ID",value:le.managerId,onChange:e=>Me("managerId",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Full Name *"}),(0,x.jsx)(_,{type:"text",placeholder:"Enter full name",value:le.fullName,onChange:e=>Me("fullName",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Company Name *"}),(0,x.jsx)(_,{type:"text",placeholder:"Enter company name",value:le.companyName,onChange:e=>Me("companyName",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Manager Role *"}),(0,x.jsxs)(d.Jt,{value:le.role,onChange:e=>{const a=e.target.value;Me("role",a);const n=fe(a),t=n.length>0?n[0]:null,r="Brand General"===a||"Brand Manager"===a?"brand_manager":"foodcourt_manager";ie(e=>({...e,role:a,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,x.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,x.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,x.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,x.jsx)("option",{value:"Brand Manager",children:"Brand Manager"})]})]}),"Brand Manager"===le.role&&(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Brand General * (Parent Manager)"}),(0,x.jsxs)(d.Jt,{value:le.parentManagerId,onChange:e=>Me("parentManagerId",e.target.value),children:[(0,x.jsx)("option",{value:"",children:"Select Brand General"}),pe.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===le.role&&(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Foodcourt General * (Parent Manager)"}),(0,x.jsxs)(d.Jt,{value:le.parentManagerId,onChange:e=>Me("parentManagerId",e.target.value),children:[(0,x.jsx)("option",{value:"",children:"Select Foodcourt General"}),ue.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Position *"}),(0,x.jsx)(_,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:le.position,onChange:e=>Me("position",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Department *"}),(0,x.jsx)(_,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:le.department,onChange:e=>Me("department",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Email Address *"}),(0,x.jsx)(_,{type:"email",placeholder:"Enter email address",value:le.email,onChange:e=>Me("email",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Phone Number *"}),(0,x.jsx)(h.A,{value:le.phone,onChange:e=>Me("phone",e)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Address"}),(0,x.jsx)(B,{placeholder:"Enter company address",value:le.address,onChange:e=>Me("address",e.target.value)})]}),("Foodcourt General"===le.role||"Brand General"===le.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(E,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,x.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription Plan *"}),(0,x.jsxs)(d.Jt,{value:le.planType,onChange:e=>{const a=fe(le.role).find(a=>a.display_name===e.target.value);Me("planType",e.target.value),a&&Me("planAmount",a.base_price_monthly)},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),fe(le.role).map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Billing Cycle *"}),(0,x.jsxs)(d.Jt,{value:le.billingCycle,onChange:e=>Me("billingCycle",e.target.value),children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription Start Date *"}),(0,x.jsx)(_,{type:"date",value:le.subscriptionStart,onChange:e=>Me("subscriptionStart",e.target.value)})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription End Date"}),(0,x.jsx)(_,{type:"date",value:le.subscriptionEnd,onChange:e=>Me("subscriptionEnd",e.target.value)})]}),(0,x.jsxs)(E,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:le.autoRenew,onChange:e=>Me("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,x.jsx)(N,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,x.jsxs)(F,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:Ae,children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",le);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:$(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const a=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(a)?`${a.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})()){if(!le.managerId||!le.fullName||!le.companyName||!le.email||!le.position||!le.department||!le.phone)return console.error("\u274c Validation failed:",{managerId:le.managerId,fullName:le.fullName,companyName:le.companyName,email:le.email,position:le.position,department:le.department,phone:le.phone}),void alert("Please fill in all required fields");if("Brand Manager"!==le.role||le.parentManagerId)if("Foodcourt Manager"!==le.role||le.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const a={username:le.managerId,email:le.email,password:"manager123",role:le.role,full_name:le.fullName,company_name:le.companyName,position:le.position,department:le.department,phone:le.phone,address:le.address};"Brand Manager"!==le.role&&"Foodcourt Manager"!==le.role||!le.parentManagerId||(a.manager_id=parseInt(le.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",a),console.log("\ud83d\udccd API URL:","/api/users");const n=await fetch("/api/users",{method:"POST",headers:$(),body:JSON.stringify(a)});let t;console.log("\ud83d\udce1 Response status:",n.status),console.log("\ud83d\udce1 Response ok:",n.ok);const r=n.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await n.json();else{const a=await n.text();if(console.log("\ud83d\udce1 Response text:",a),""===a.trim())throw new Error("Empty response from server");try{t=JSON.parse(a)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",a),new Error(`Invalid JSON response: ${a.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),n.ok?(console.log("\u2705 Manager created successfully:",t),Ae(),q("Manager created successfully! Default password: manager123"),K(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await me()):(console.error("\u274c Failed to create manager:",t),alert("Failed to create manager: "+(t.error||t.message||"Unknown error")))}catch(a){console.error("\u274c Error creating manager:",a),console.error("Error details:",{name:a.name,message:a.message,stack:a.stack}),a.message.includes("Failed to fetch")?alert("Cannot connect to server. Please ensure the backend server is running"):alert("Error creating manager: "+a.message)}}else alert("Please select a Foodcourt General for this Foodcourt Manager");else alert("Please select a Brand General for this Brand Manager")}else alert("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),Y&&(0,x.jsx)(b,{show:Y,onClick:()=>K(!1),children:(0,x.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(D,{children:"\u2713"}),(0,x.jsx)(R,{children:"Success!"}),(0,x.jsx)(T,{children:W}),(0,x.jsx)(i.$n,{variant:"primary",onClick:()=>K(!1),children:"OK"})]})}),ae&&H&&(0,x.jsx)(b,{show:ae,onClick:()=>ne(!1),children:(0,x.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(A,{children:"Manager Details"}),(0,x.jsx)(M,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)(I,{children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Manager ID"}),(0,x.jsx)(_,{type:"text",value:H.managerId,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Full Name"}),(0,x.jsx)(_,{type:"text",value:H.fullName,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Company Name"}),(0,x.jsx)(_,{type:"text",value:H.companyName,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Position"}),(0,x.jsx)(_,{type:"text",value:H.position,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Department"}),(0,x.jsx)(_,{type:"text",value:H.department,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Email Address"}),(0,x.jsx)(_,{type:"email",value:H.email,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Phone Number"}),(0,x.jsx)(_,{type:"tel",value:(0,p.FI)(H.phone),disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Status"}),(0,x.jsx)(_,{type:"text",value:"active"===H.status?"Active":"Inactive",disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Restaurant Count"}),(0,x.jsx)(_,{type:"text",value:H.restaurantCount.toString(),disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Total Revenue"}),(0,x.jsx)(_,{type:"text",value:(0,c.vv)(H.totalRevenue,e.currency),disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Created Date"}),(0,x.jsx)(_,{type:"text",value:H.createdAt,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Last Active"}),(0,x.jsx)(_,{type:"text",value:H.lastActive,disabled:!0})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Address"}),(0,x.jsx)(B,{value:H.address,disabled:!0})]})]})}),(0,x.jsx)(F,{children:(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>ne(!1),children:"Close"})})]})}),te&&se&&(0,x.jsx)(b,{show:te,onClick:()=>re(!1),children:(0,x.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(A,{children:"Edit Manager"}),(0,x.jsx)(M,{onClick:()=>re(!1),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)(I,{children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Manager ID * (Read-only)"}),(0,x.jsx)(_,{type:"text",value:se.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Full Name *"}),(0,x.jsx)(_,{type:"text",value:se.fullName,onChange:e=>oe({...se,fullName:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Company Name *"}),(0,x.jsx)(_,{type:"text",value:se.companyName,onChange:e=>oe({...se,companyName:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Position *"}),(0,x.jsx)(_,{type:"text",value:se.position,onChange:e=>oe({...se,position:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Department *"}),(0,x.jsx)(_,{type:"text",value:se.department,onChange:e=>oe({...se,department:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Email Address *"}),(0,x.jsx)(_,{type:"email",value:se.email,onChange:e=>oe({...se,email:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Phone Number *"}),(0,x.jsx)(h.A,{value:se.phone,onChange:e=>oe({...se,phone:e})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Address"}),(0,x.jsx)(B,{value:se.address,onChange:e=>oe({...se,address:e.target.value})})]}),"Brand Manager"===se.role&&(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Brand General * (Parent Manager)"}),(0,x.jsxs)(d.Jt,{value:se.manager_id||"",onChange:e=>oe({...se,manager_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Select Brand General"}),pe.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===se.role&&(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Foodcourt General * (Parent Manager)"}),(0,x.jsxs)(d.Jt,{value:se.manager_id||"",onChange:e=>oe({...se,manager_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Select Foodcourt General"}),ue.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===se.role||"Brand General"===se.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(E,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,x.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription Plan *"}),(0,x.jsxs)(d.Jt,{value:se.planType||"",onChange:e=>{const a=fe(se.role).find(a=>a.display_name===e.target.value);oe({...se,planType:e.target.value,planAmount:a?a.base_price_monthly:se.planAmount})},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),fe(se.role).map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Billing Cycle *"}),(0,x.jsxs)(d.Jt,{value:se.billingCycle||"monthly",onChange:e=>oe({...se,billingCycle:e.target.value}),children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription Start Date *"}),(0,x.jsx)(_,{type:"date",value:se.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>oe({...se,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(E,{children:[(0,x.jsx)(N,{children:"Subscription End Date"}),(0,x.jsx)(_,{type:"date",value:se.subscriptionEnd||"",onChange:e=>oe({...se,subscriptionEnd:e.target.value})})]}),(0,x.jsxs)(E,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:void 0===se.autoRenew||se.autoRenew,onChange:e=>oe({...se,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,x.jsx)(N,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,x.jsxs)(F,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(se)if(se.managerId&&se.fullName&&se.companyName&&se.email&&se.position&&se.department&&se.phone)try{console.log("\ud83d\udd04 Updating manager:",se);const e=se.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a={username:se.managerId,full_name:se.fullName,company_name:se.companyName,email:se.email,position:se.position,department:se.department,phone:se.phone,address:se.address};console.log("\ud83d\udcdd Update data:",a);const n=await fetch(`/api/users/${e}`,{method:"PUT",headers:$(),body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Update response status:",n.status),!n.ok){const e=await n.json();throw console.error("\u274c Update failed:",e),new Error(e.error||"Update failed")}{const e=await n.json();console.log("\u2705 Manager updated successfully:",e),re(!1),oe(null),q("Manager updated successfully"),K(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await me()}}catch(e){console.error("\u274c Error updating manager:",e),alert("Error updating manager: "+e.message)}else alert("Please fill in all required fields")},children:"Update Manager"})]})]})}),Q&&(0,x.jsx)(b,{show:Q,onClick:()=>X(!1),children:(0,x.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(A,{children:"Confirm Action"}),(0,x.jsx)(M,{onClick:()=>X(!1),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)("p",{children:["delete"===Z&&`Are you sure you want to delete Manager ID: ${null===H||void 0===H?void 0:H.managerId}?`,"resetPassword"===Z&&`Are you sure you want to reset password for Manager ID: ${null===H||void 0===H?void 0:H.managerId}?`,"toggle"===Z&&`Are you sure you want to ${"active"===(null===H||void 0===H?void 0:H.status)?"deactivate":"activate"} Manager ID: ${null===H||void 0===H?void 0:H.managerId}?`]})}),(0,x.jsxs)(F,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"delete"===Z?"danger":"primary",onClick:async()=>{if(H&&Z){try{if("delete"===Z){console.log("\ud83d\udd04 Deleting manager:",H.id);const e=H.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a=await fetch(`/api/users/${e}`,{method:"DELETE",headers:$()});if(console.log("\ud83d\udce1 Delete response status:",a.status),!a.ok){const e=await a.text();throw console.error("\u274c Delete failed:",e),new Error(`Delete failed: ${a.status}`)}await me(),q("Manager deleted successfully"),console.log("\u2705 Manager deleted and list refreshed")}else if("resetPassword"===Z){const e=H.id.replace("mgr-",""),a=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();if(!(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:$(),body:JSON.stringify({newPassword:a})})).ok)throw new Error("Password reset failed");q(`Password reset successfully. New password: ${a}\n\nPlease save this password and share it securely with the manager.`)}else if("toggle"===Z){const e=H.id.replace("mgr-",""),a="active"===H.status?"inactive":"active";if(!(await fetch(`/api/users/${e}`,{method:"PUT",headers:$(),body:JSON.stringify({status:a})})).ok)throw new Error("Status update failed");s(e=>e.map(e=>e.id===H.id?{...e,status:a}:e)),q(`Manager ${"active"===a?"activated":"deactivated"} successfully`)}K(!0)}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}X(!1),V(null),ee(null)}},children:"delete"===Z?"Delete":"resetPassword"===Z?"Reset Password":"Confirm"})]})]})})]})]})})}}}]);