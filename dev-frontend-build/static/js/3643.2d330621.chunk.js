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
`,i=e=>{let{children:a,className:n,style:t,...o}=e;return(0,r.jsx)(s,{className:n,style:t,...o,children:a})},d=e=>{let{placeholder:a="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:a,...n})},c=e=>{let{children:a,...n}=e;return(0,r.jsx)(l,{...n,children:a})}},3643:(e,a,n)=>{n.r(a),n.d(a,{default:()=>$});var t=n(9950),r=n(4492),s=n(4752),o=n(1367),l=n(7960),i=n(2488),d=n(6038),c=n(2924),p=n(8666),h=n(9018),u=n(4414);const x=(0,s.Ay)(l.A0)`
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
`,D=s.Ay.h3`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`,R=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,T=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},$=()=>{const{operationSettings:e}=(0,h.Pj)(),{user:a}=(0,o.As)(),[n,s]=(0,t.useState)([]),[$,O]=(0,t.useState)(""),[G,U]=(0,t.useState)("all"),[L,z]=(0,t.useState)(!1),[J,Y]=(0,t.useState)(!1),[K,W]=(0,t.useState)(""),[q,H]=(0,t.useState)(null),[V,Q]=(0,t.useState)(!1),[X,Z]=(0,t.useState)(null),[ee,ae]=(0,t.useState)(!1),[ne,te]=(0,t.useState)(!1),[re,se]=(0,t.useState)(null),[oe,le]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[ie,de]=(0,t.useState)([]),[ce,pe]=(0,t.useState)([]),[he,ue]=(0,t.useState)([]),xe=(0,r.Zp)(),ge=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const a=await fetch("/api/users?role=Manager",{headers:T()});if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const n=await a.json();console.log("\ud83d\udc65 Manager users data from API:",n);const t=await fetch("/api/restaurants",{headers:T()}),r=t.ok?await t.json():[];console.log("\ud83c\udfea All restaurants data:",r);const o=n.data||n;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void s([]);let l=[];try{const e=await fetch("/api/invoices",{headers:T()});if(e.ok){const a=await e.json();l=a.data||a}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(a=>{console.log("\ud83d\udd04 Processing manager:",a);const n=r.filter(e=>{const n=e.managerId===a.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===a.id.toString());return n||t});console.log(`\ud83d\udd0d Manager ${a.username} (ID: ${a.id}) has ${n.length} restaurants`);let t=0;try{t=l.filter(e=>n.some(a=>{var n;return a.id.toString()===(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())})).reduce((e,a)=>e+parseFloat(a.amount||a.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const s={id:`mgr-${a.id}`,managerId:a.username||`manager-${a.id}`,userId:a.id,fullName:a.full_name||a.username||"Unknown Name",companyName:a.company_name||"Unknown Company",email:a.email,position:a.role||a.position||"Manager",department:a.department||"Management",phone:a.phone||"+60 12-345-6789",status:"active",restaurantCount:n.length,totalRevenue:t,createdAt:a.createdAt?new Date(a.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:a.address||"No address provided"};return console.log("\u2705 Transformed manager:",s),s});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),s(i)}else console.error("\u274c Failed to fetch users:",a.status),s([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),s([])}};(0,t.useEffect)(()=>{ge(),je(),me()},[]);const me=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:T()});if(e.ok){const a=await e.json(),n=a.data||a,t=n.filter(e=>"Brand General"===e.role);pe(t);const r=n.filter(e=>"Foodcourt General"===e.role);ue(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},je=async()=>{try{const e=await fetch("/api/plans",{headers:T()});if(e.ok){const a=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);de(a)}}catch(e){console.error("Error fetching plans:",e)}},ye=e=>"Brand General"===e||"Brand Manager"===e?ie.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?ie.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:$,filterStatus:G,managers:n});const fe=n.filter(e=>{const a=e.managerId.toLowerCase().includes($.toLowerCase())||e.fullName.toLowerCase().includes($.toLowerCase())||e.companyName.toLowerCase().includes($.toLowerCase())||e.position.toLowerCase().includes($.toLowerCase())||e.department.toLowerCase().includes($.toLowerCase())||e.email.toLowerCase().includes($.toLowerCase()),n="all"===G||e.status===G;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:a,matchesFilter:n,managerStatus:e.status,expectedStatus:G}),a&&n});console.log("\ud83d\udd0d Filtered results:",fe.length,"managers");const ve=n.length,we=n.reduce((e,a)=>e+a.restaurantCount,0),be=we,Ce=n.reduce((e,a)=>e+a.totalRevenue,0),Se=()=>{z(!1);const e=ie.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),le({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]})},Ae=(e,a)=>{le(n=>({...n,[e]:"autoRenew"===e?"true"===a||!0===a:a}))};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Managers"}),(0,u.jsxs)(l.ex,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(fe.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(a),t=document.createElement("a");t.href=n,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=ie.filter(e=>"foodcourt"===e.plan_target),a=e.length>0?e[0]:null,n=new Date;n.setFullYear(n.getFullYear()+1),le({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:a?a.display_name:"",planAmount:a?a.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:n.toISOString().split("T")[0]}),z(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),alert("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:ve}),(0,u.jsx)(l.v0,{children:"Total Managers"}),(0,u.jsx)(l.d1,{children:"Currently active"})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:be}),(0,u.jsx)(l.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(l.d1,{children:[ve>0?(we/ve).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:we}),(0,u.jsx)(l.v0,{children:"Total Restaurants"}),(0,u.jsx)(l.d1,{children:"Across all managers"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsxs)(l.Os,{children:[(0,d.vv)(Ce/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(l.v0,{children:"Total Revenue"}),(0,u.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:$,onChange:e=>O(e.target.value)}),(0,u.jsxs)(i.Jt,{value:G,onChange:e=>U(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{children:"Actions"})]}),0===fe.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):fe.map(e=>(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Manager Info"}),(0,u.jsxs)(m,{children:[(0,u.jsx)(j,{children:e.fullName}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(f,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),xe(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.K0,{onClick:()=>(e=>{const a=e.role,n=ye(a),t=n.length>0?n[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),se({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===a?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),te(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(v,{children:"Edit"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{H(e),Z("toggle"),Q(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(v,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{H(e),Z("resetPassword"),Q(!0)})(e),title:"Reset Password",children:(0,u.jsx)(v,{children:"\u26b7"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{H(e),Z("delete"),Q(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(v,{children:"\u2715"})})]})]},e.id))]}),L&&(0,u.jsx)(w,{show:L,onClick:Se,children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Add New Manager"}),(0,u.jsx)(A,{onClick:Se,children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter unique manager ID",value:oe.managerId,onChange:e=>Ae("managerId",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter full name",value:oe.fullName,onChange:e=>Ae("fullName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter company name",value:oe.companyName,onChange:e=>Ae("companyName",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:oe.role,onChange:e=>{const a=e.target.value;Ae("role",a);const n=ye(a),t=n.length>0?n[0]:null,r="Restaurant Owner"===a?"restaurant_owner":"Brand General"===a||"Brand Manager"===a?"brand_manager":"foodcourt_manager";le(e=>({...e,role:a,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===oe.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:oe.parentManagerId,onChange:e=>Ae("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ce.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===oe.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:oe.parentManagerId,onChange:e=>Ae("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),he.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:oe.position,onChange:e=>Ae("position",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:oe.department,onChange:e=>Ae("department",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",placeholder:"Enter email address",value:oe.email,onChange:e=>Ae("email",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:oe.phone,onChange:e=>Ae("phone",e)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{placeholder:"Enter company address",value:oe.address,onChange:e=>Ae("address",e.target.value)})]}),("Foodcourt General"===oe.role||"Brand General"===oe.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:oe.planType,onChange:e=>{const a=ye(oe.role).find(a=>a.display_name===e.target.value);Ae("planType",e.target.value),a&&Ae("planAmount",a.base_price_monthly)},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),ye(oe.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:oe.billingCycle,onChange:e=>Ae("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:oe.subscriptionStart,onChange:e=>Ae("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:oe.subscriptionEnd,onChange:e=>Ae("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:oe.autoRenew,onChange:e=>Ae("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:Se,children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",oe);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:T(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const a=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(a)?`${a.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})()){if(!oe.managerId||!oe.fullName||!oe.companyName||!oe.email||!oe.position||!oe.department||!oe.phone)return console.error("\u274c Validation failed:",{managerId:oe.managerId,fullName:oe.fullName,companyName:oe.companyName,email:oe.email,position:oe.position,department:oe.department,phone:oe.phone}),void alert("Please fill in all required fields");if("Brand Manager"!==oe.role||oe.parentManagerId)if("Foodcourt Manager"!==oe.role||oe.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const a={username:oe.managerId,email:oe.email,password:"manager123",role:oe.role,full_name:oe.fullName,company_name:oe.companyName,position:oe.position,department:oe.department,phone:oe.phone,address:oe.address};"Brand Manager"!==oe.role&&"Foodcourt Manager"!==oe.role||!oe.parentManagerId||(a.manager_id=parseInt(oe.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",a),console.log("\ud83d\udccd API URL:","/api/users");const n=await fetch("/api/users",{method:"POST",headers:T(),body:JSON.stringify(a)});let t;console.log("\ud83d\udce1 Response status:",n.status),console.log("\ud83d\udce1 Response ok:",n.ok);const r=n.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await n.json();else{const a=await n.text();if(console.log("\ud83d\udce1 Response text:",a),""===a.trim())throw new Error("Empty response from server");try{t=JSON.parse(a)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",a),new Error(`Invalid JSON response: ${a.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),n.ok?(console.log("\u2705 Manager created successfully:",t),Se(),W("Manager created successfully! Default password: manager123"),Y(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await ge()):(console.error("\u274c Failed to create manager:",t),alert("Failed to create manager: "+(t.error||t.message||"Unknown error")))}catch(a){console.error("\u274c Error creating manager:",a),console.error("Error details:",{name:a.name,message:a.message,stack:a.stack}),a.message.includes("Failed to fetch")?alert("Cannot connect to server. Please ensure the backend server is running"):alert("Error creating manager: "+a.message)}}else alert("Please select a Foodcourt General for this Foodcourt Manager");else alert("Please select a Brand General for this Brand Manager")}else alert("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),J&&(0,u.jsx)(w,{show:J,onClick:()=>Y(!1),children:(0,u.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(P,{children:"\u2713"}),(0,u.jsx)(D,{children:"Success!"}),(0,u.jsx)(R,{children:K}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>Y(!1),children:"OK"})]})}),ee&&q&&(0,u.jsx)(w,{show:ee,onClick:()=>ae(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Manager Details"}),(0,u.jsx)(A,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID"}),(0,u.jsx)(N,{type:"text",value:q.managerId,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name"}),(0,u.jsx)(N,{type:"text",value:q.fullName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name"}),(0,u.jsx)(N,{type:"text",value:q.companyName,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position"}),(0,u.jsx)(N,{type:"text",value:q.position,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department"}),(0,u.jsx)(N,{type:"text",value:q.department,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address"}),(0,u.jsx)(N,{type:"email",value:q.email,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number"}),(0,u.jsx)(N,{type:"tel",value:(0,c.FI)(q.phone),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Status"}),(0,u.jsx)(N,{type:"text",value:"active"===q.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Restaurant Count"}),(0,u.jsx)(N,{type:"text",value:q.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Total Revenue"}),(0,u.jsx)(N,{type:"text",value:(0,d.vv)(q.totalRevenue,e.currency),disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Created Date"}),(0,u.jsx)(N,{type:"text",value:q.createdAt,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Last Active"}),(0,u.jsx)(N,{type:"text",value:q.lastActive,disabled:!0})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:q.address,disabled:!0})]})]})}),(0,u.jsx)(k,{children:(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})}),ne&&re&&(0,u.jsx)(w,{show:ne,onClick:()=>te(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Edit Manager"}),(0,u.jsx)(A,{onClick:()=>te(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(N,{type:"text",value:re.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Full Name *"}),(0,u.jsx)(N,{type:"text",value:re.fullName,onChange:e=>se({...re,fullName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Company Name *"}),(0,u.jsx)(N,{type:"text",value:re.companyName,onChange:e=>se({...re,companyName:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Position *"}),(0,u.jsx)(N,{type:"text",value:re.position,onChange:e=>se({...re,position:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Department *"}),(0,u.jsx)(N,{type:"text",value:re.department,onChange:e=>se({...re,department:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Email Address *"}),(0,u.jsx)(N,{type:"email",value:re.email,onChange:e=>se({...re,email:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:re.phone,onChange:e=>se({...re,phone:e})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Address"}),(0,u.jsx)(_,{value:re.address,onChange:e=>se({...re,address:e.target.value})})]}),"Brand Manager"===re.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:re.manager_id||"",onChange:e=>se({...re,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),ce.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===re.role&&(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:re.manager_id||"",onChange:e=>se({...re,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),he.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===re.role||"Brand General"===re.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:re.planType||"",onChange:e=>{const a=ye(re.role).find(a=>a.display_name===e.target.value);se({...re,planType:e.target.value,planAmount:a?a.base_price_monthly:re.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),ye(re.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:re.billingCycle||"monthly",onChange:e=>se({...re,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription Start Date *"}),(0,u.jsx)(N,{type:"date",value:re.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>se({...re,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{children:"Subscription End Date"}),(0,u.jsx)(N,{type:"date",value:re.subscriptionEnd||"",onChange:e=>se({...re,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===re.autoRenew||re.autoRenew,onChange:e=>se({...re,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(re)if(re.managerId&&re.fullName&&re.companyName&&re.email&&re.position&&re.department&&re.phone)try{console.log("\ud83d\udd04 Updating manager:",re);const e=re.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a={username:re.managerId,full_name:re.fullName,company_name:re.companyName,email:re.email,position:re.position,department:re.department,phone:re.phone,address:re.address};console.log("\ud83d\udcdd Update data:",a);const n=await fetch(`/api/users/${e}`,{method:"PUT",headers:T(),body:JSON.stringify(a)});if(console.log("\ud83d\udce1 Update response status:",n.status),!n.ok){const e=await n.json();throw console.error("\u274c Update failed:",e),new Error(e.error||"Update failed")}{const e=await n.json();console.log("\u2705 Manager updated successfully:",e),te(!1),se(null),W("Manager updated successfully"),Y(!0),console.log("\ud83d\udd04 Refreshing managers list..."),await ge()}}catch(e){console.error("\u274c Error updating manager:",e),alert("Error updating manager: "+e.message)}else alert("Please fill in all required fields")},children:"Update Manager"})]})]})}),V&&(0,u.jsx)(w,{show:V,onClick:()=>Q(!1),children:(0,u.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(S,{children:"Confirm Action"}),(0,u.jsx)(A,{onClick:()=>Q(!1),children:"\xd7"})]}),(0,u.jsx)(M,{children:(0,u.jsxs)("p",{children:["delete"===X&&`Are you sure you want to delete Manager ID: ${null===q||void 0===q?void 0:q.managerId}?`,"resetPassword"===X&&`Are you sure you want to reset password for Manager ID: ${null===q||void 0===q?void 0:q.managerId}?`,"toggle"===X&&`Are you sure you want to ${"active"===(null===q||void 0===q?void 0:q.status)?"deactivate":"activate"} Manager ID: ${null===q||void 0===q?void 0:q.managerId}?`]})}),(0,u.jsxs)(k,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"delete"===X?"danger":"primary",onClick:async()=>{if(q&&X){try{if("delete"===X){console.log("\ud83d\udd04 Deleting manager:",q.id);const e=q.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const a=await fetch(`/api/users/${e}`,{method:"DELETE",headers:T()});if(console.log("\ud83d\udce1 Delete response status:",a.status),!a.ok){const e=await a.text();throw console.error("\u274c Delete failed:",e),new Error(`Delete failed: ${a.status}`)}await ge(),W("Manager deleted successfully"),console.log("\u2705 Manager deleted and list refreshed")}else if("resetPassword"===X){const e=q.id.replace("mgr-",""),a=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();if(!(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:T(),body:JSON.stringify({newPassword:a})})).ok)throw new Error("Password reset failed");W(`Password reset successfully. New password: ${a}\n\nPlease save this password and share it securely with the manager.`)}else if("toggle"===X){const e=q.id.replace("mgr-",""),a="active"===q.status?"inactive":"active";if(!(await fetch(`/api/users/${e}`,{method:"PUT",headers:T(),body:JSON.stringify({status:a})})).ok)throw new Error("Status update failed");s(e=>e.map(e=>e.id===q.id?{...e,status:a}:e)),W(`Manager ${"active"===a?"activated":"deactivated"} successfully`)}Y(!0)}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Q(!1),H(null),Z(null)}},children:"delete"===X?"Delete":"resetPassword"===X?"Reset Password":"Confirm"})]})]})})]})]})})}}}]);