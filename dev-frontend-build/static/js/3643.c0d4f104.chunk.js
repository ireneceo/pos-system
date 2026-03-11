"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3643],{2488:(e,n,a)=>{a.d(n,{DO:()=>p,Jt:()=>h,Qn:()=>c});a(9950);var t=a(4752),r=a(4414);const s=t.Ay.div`
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
`,c=e=>{let{children:n,className:a,style:t,...o}=e;return(0,r.jsx)(s,{className:a,style:t,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:a,onChange:t,style:s,...d}=e;return(0,r.jsxs)(l,{style:s,children:[(0,r.jsx)(o,{placeholder:n,value:a,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,r.jsx)(i,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:n,...a}=e;return(0,r.jsx)(d,{...a,children:n})}},3643:(e,n,a)=>{a.r(n),a.d(n,{default:()=>I});var t=a(9950),r=a(4492),s=a(4752),o=a(1367),l=a(8409),i=a(2488),d=a(6038),c=a(2924),p=a(8666),h=a(9018),u=a(4414);const x=(0,s.Ay)(l.A0)`
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,C=s.Ay.div`
  display: flex;
  flex-direction: column;
`,b=s.Ay.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,S=s.Ay.input`
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
`,A=s.Ay.textarea`
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
`,M=s.Ay.div`
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
`,F=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,k=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},I=()=>{const{operationSettings:e}=(0,h.Pj)();(0,o.As)();const[n,a]=(0,t.useState)([]),[s,I]=(0,t.useState)(""),[E,N]=(0,t.useState)("all"),[R,B]=(0,t.useState)(!1),[_,T]=(0,t.useState)(!1),[D,P]=(0,t.useState)(""),[O,$]=(0,t.useState)(null),[L,G]=(0,t.useState)(!1),[U,z]=(0,t.useState)(null),[J,Y]=(0,t.useState)(!1),[W,K]=(0,t.useState)(!1),[q,H]=(0,t.useState)(null),[Q,V]=(0,t.useState)(""),[X,Z]=(0,t.useState)(""),[ee,ne]=(0,t.useState)(""),[ae,te]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[re,se]=(0,t.useState)([]),[oe,le]=(0,t.useState)([]),[ie,de]=(0,t.useState)([]),ce=(0,r.Zp)(),pe=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:k()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const t=await n.json();console.log("\ud83d\udc65 Manager users data from API:",t);const r=await fetch("/api/restaurants",{headers:k()}),s=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=t.data||t;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void a([]);let l=[];try{const e=await fetch("/api/invoices",{headers:k()});if(e.ok){const n=await e.json();l=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const i=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=s.filter(e=>{const a=e.managerId===n.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||t});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let t=0;try{t=l.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const r={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name||"Unknown Company",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:t,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided",is_demo:n.is_demo||!1};return console.log("\u2705 Transformed manager:",r),r});console.log("\u2705 All transformed managers data:",i),console.log("\u2705 Setting managers state with",i.length,"managers"),a(i)}else console.error("\u274c Failed to fetch users:",n.status),a([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),a([])}};(0,t.useEffect)(()=>{pe(),ue(),he()},[]);const he=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:k()});if(e.ok){const n=await e.json(),a=n.data||n,t=a.filter(e=>"Brand General"===e.role);le(t);const r=a.filter(e=>"Foodcourt General"===e.role);de(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},ue=async()=>{try{const e=await fetch("/api/plans",{headers:k()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);se(n)}}catch(e){console.error("Error fetching plans:",e)}},xe=e=>"Brand General"===e||"Brand Manager"===e?re.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?re.filter(e=>"foodcourt"===e.plan_target):"Restaurant Owner"===e?re.filter(e=>"owner"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:s,filterStatus:E,managers:n});const ge=n.filter(e=>{const n=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),a="all"===E||e.status===E;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:E}),n&&a});console.log("\ud83d\udd0d Filtered results:",ge.length,"managers");const me=n.length,je=n.reduce((e,n)=>e+n.restaurantCount,0),ye=je,ve=n.reduce((e,n)=>e+n.totalRevenue,0),fe=()=>{B(!1);const e=re.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),te({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]})},we=(e,n)=>{te(a=>({...a,[e]:"autoRenew"===e?"true"===n||!0===n:n}))};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Managers"}),(0,u.jsxs)(l.ex,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(ge.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=re.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),te({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",currency:"MYR",planType:n?n.display_name:"",planAmount:n?String((0,d.jL)(n||{},"MYR")):"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]}),B(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),V("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#059669",children:[(0,u.jsx)(l.Os,{children:me}),(0,u.jsx)(l.v0,{children:"Total Managers"}),(0,u.jsx)(l.d1,{children:"Currently active"})]}),(0,u.jsxs)(l.hI,{color:"#2563EB",children:[(0,u.jsx)(l.Os,{children:ye}),(0,u.jsx)(l.v0,{children:"Active Subscriptions"}),(0,u.jsxs)(l.d1,{children:[me>0?(je/me).toFixed(1):0," restaurants per manager"]})]}),(0,u.jsxs)(l.hI,{color:"#7C3AED",children:[(0,u.jsx)(l.Os,{children:je}),(0,u.jsx)(l.v0,{children:"Total Restaurants"}),(0,u.jsx)(l.d1,{children:"Across all managers"})]}),(0,u.jsxs)(l.hI,{color:"#D97706",children:[(0,u.jsxs)(l.Os,{children:[(0,d.vv)(ve/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,u.jsx)(l.v0,{children:"Total Revenue"}),(0,u.jsx)(l.d1,{children:"From actual invoices"})]})]}),(0,u.jsxs)(i.Qn,{children:[(0,u.jsxs)(i.Jt,{value:E,onChange:e=>N(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,u.jsx)(i.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>I(e.target.value)})]}),(0,u.jsxs)(l.XI,{children:[(0,u.jsxs)(x,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsx)("span",{className:"col-info",children:"Manager Info"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Restaurants"}),(0,u.jsx)("span",{className:"col-revenue",children:"Revenue (RM)"}),(0,u.jsx)("span",{children:"Last Active"}),(0,u.jsx)("span",{className:"col-action",children:"Actions"})]}),0===ge.length?(0,u.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):ge.map(e=>(0,u.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,u.jsxs)(l.Np,{children:[(0,u.jsxs)(l.Uj,{className:"col-info",children:[(0,u.jsx)(l.PM,{children:"Manager Info"}),(0,u.jsxs)(m,{children:[(0,u.jsxs)(j,{children:[e.fullName,e.is_demo&&(0,u.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:"DEMO"})]}),(0,u.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Status"}),(0,u.jsx)("div",{children:(0,u.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Restaurants"}),(0,u.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),ce(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,u.jsxs)(l.Uj,{className:"col-revenue",children:[(0,u.jsx)(l.PM,{children:"Revenue (RM)"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,u.jsxs)(l.Uj,{children:[(0,u.jsx)(l.PM,{children:"Last Active"}),(0,u.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,u.jsxs)(l.wr,{children:[(0,u.jsx)(l.K0,{onClick:()=>(e=>{const n=e.role,a=xe(n),t=a.length>0?a[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),H({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===n?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),K(!0)})(e),title:"Edit Manager",children:(0,u.jsx)(f,{children:"Edit"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{$(e),z("toggle"),G(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,u.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{$(e),z("resetPassword"),G(!0)})(e),title:"Reset Password",children:(0,u.jsx)(f,{children:"\u26b7"})}),(0,u.jsx)(l.K0,{onClick:()=>(e=>{$(e),z("delete"),G(!0)})(e),title:"Delete Manager",children:(0,u.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),R&&(0,u.jsxs)(l.aF,{isOpen:!0,onClose:fe,title:"Add New Manager",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:fe,children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",ae);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:k(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(ae.managerId&&ae.fullName&&ae.companyName&&ae.email&&ae.position&&ae.department&&ae.phone)if("Brand Manager"!==ae.role||ae.parentManagerId)if("Foodcourt Manager"!==ae.role||ae.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:ae.managerId,email:ae.email,password:"manager123",role:ae.role,full_name:ae.fullName,company_name:ae.companyName,position:ae.position,department:ae.department,phone:ae.phone,address:ae.address};"Brand Manager"!==ae.role&&"Foodcourt Manager"!==ae.role||!ae.parentManagerId||(n.manager_id=parseInt(ae.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:k(),body:JSON.stringify(n)});let t;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const r=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{t=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),a.ok?(P("Manager created. Default password: manager123"),T(!0),fe(),await pe()):V("Failed to create manager: "+(t.error||t.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?V("Cannot connect to server. Please ensure the backend server is running"):V("Error creating manager: "+n.message)}}else V("Please select a Foodcourt General for this Foodcourt Manager");else V("Please select a Brand General for this Brand Manager");else V("Please fill in all required fields");else V("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]}),children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Manager ID *"}),(0,u.jsx)(S,{type:"text",placeholder:"Enter unique manager ID",value:ae.managerId,onChange:e=>we("managerId",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Full Name *"}),(0,u.jsx)(S,{type:"text",placeholder:"Enter full name",value:ae.fullName,onChange:e=>we("fullName",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Company Name *"}),(0,u.jsx)(S,{type:"text",placeholder:"Enter company name",value:ae.companyName,onChange:e=>we("companyName",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Manager Role *"}),(0,u.jsxs)(i.Jt,{value:ae.role,onChange:e=>{const n=e.target.value;we("role",n);const a=xe(n),t=a.length>0?a[0]:null,r="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";te(e=>({...e,role:n,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?String((0,d.jL)(t||{},e.currency)):e.planAmount,paymentModel:r}))},children:[(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===ae.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ae.parentManagerId,onChange:e=>we("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),oe.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ae.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:ae.parentManagerId,onChange:e=>we("parentManagerId",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),ie.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Position *"}),(0,u.jsx)(S,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:ae.position,onChange:e=>we("position",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Department *"}),(0,u.jsx)(S,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:ae.department,onChange:e=>we("department",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Email Address *"}),(0,u.jsx)(S,{type:"email",placeholder:"Enter email address",value:ae.email,onChange:e=>we("email",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:ae.phone,onChange:e=>we("phone",e)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Address"}),(0,u.jsx)(A,{placeholder:"Enter company address",value:ae.address,onChange:e=>we("address",e.target.value)})]}),("Foodcourt General"===ae.role||"Brand General"===ae.role||"Restaurant Owner"===ae.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(C,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Currency *"}),(0,u.jsx)(i.Jt,{value:ae.currency,onChange:e=>{const n=e.target.value,a=xe(ae.role).find(e=>e.display_name===ae.planType);we("currency",n),a&&we("planAmount",String((0,d.jL)(a,n)))},children:d.cr.map(e=>(0,u.jsx)("option",{value:e,children:e},e))})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:ae.planType,onChange:e=>{const n=xe(ae.role).find(n=>n.display_name===e.target.value);we("planType",e.target.value),n&&we("planAmount",String((0,d.jL)(n,ae.currency)))},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),xe(ae.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,ae.currency),"/month)"]},e.id))]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:ae.billingCycle,onChange:e=>we("billingCycle",e.target.value),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription Start Date *"}),(0,u.jsx)(S,{type:"date",value:ae.subscriptionStart,onChange:e=>we("subscriptionStart",e.target.value)})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription End Date"}),(0,u.jsx)(S,{type:"date",value:ae.subscriptionEnd,onChange:e=>we("subscriptionEnd",e.target.value)})]}),(0,u.jsxs)(C,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:ae.autoRenew,onChange:e=>we("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(b,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),Q&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:Q})]}),_&&(0,u.jsx)(l.aF,{isOpen:!0,onClose:()=>T(!1),title:"Success",size:"small",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>T(!1),children:"OK"})}),children:(0,u.jsxs)("div",{style:{textAlign:"center"},children:[(0,u.jsx)(M,{children:"\u2713"}),(0,u.jsx)(F,{children:D}),(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>T(!1),children:"OK"})]})}),J&&O&&(0,u.jsx)(l.aF,{isOpen:!0,onClose:()=>Y(!1),title:"Manager Details",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>Y(!1),children:"Close"})}),children:(0,u.jsxs)(w,{children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Manager ID"}),(0,u.jsx)(S,{type:"text",value:O.managerId,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Full Name"}),(0,u.jsx)(S,{type:"text",value:O.fullName,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Company Name"}),(0,u.jsx)(S,{type:"text",value:O.companyName,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Position"}),(0,u.jsx)(S,{type:"text",value:O.position,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Department"}),(0,u.jsx)(S,{type:"text",value:O.department,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Email Address"}),(0,u.jsx)(S,{type:"email",value:O.email,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Phone Number"}),(0,u.jsx)(S,{type:"tel",value:(0,c.FI)(O.phone),disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Status"}),(0,u.jsx)(S,{type:"text",value:"active"===O.status?"Active":"Inactive",disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Restaurant Count"}),(0,u.jsx)(S,{type:"text",value:O.restaurantCount.toString(),disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Total Revenue"}),(0,u.jsx)(S,{type:"text",value:(0,d.vv)(O.totalRevenue,e.currency),disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Created Date"}),(0,u.jsx)(S,{type:"text",value:O.createdAt,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Last Active"}),(0,u.jsx)(S,{type:"text",value:O.lastActive,disabled:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Address"}),(0,u.jsx)(A,{value:O.address,disabled:!0})]})]})}),W&&q&&(0,u.jsxs)(l.aF,{isOpen:!0,onClose:()=>K(!1),title:"Edit Manager",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>{K(!1),Z("")},children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(q)if(q.managerId&&q.fullName&&q.companyName&&q.email&&q.position&&q.department&&q.phone)try{console.log("\ud83d\udd04 Updating manager:",q);const e=q.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:q.managerId,full_name:q.fullName,company_name:q.companyName,email:q.email,position:q.position,department:q.department,phone:q.phone,address:q.address};console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:k(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)K(!1),H(null),Z(""),await pe();else{const e=await a.json();Z(e.error||"Update failed")}}catch(e){Z("Error updating manager: "+e.message)}else Z("Please fill in all required fields")},children:"Update Manager"})]}),children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Manager ID * (Read-only)"}),(0,u.jsx)(S,{type:"text",value:q.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Full Name *"}),(0,u.jsx)(S,{type:"text",value:q.fullName,onChange:e=>H({...q,fullName:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Company Name *"}),(0,u.jsx)(S,{type:"text",value:q.companyName,onChange:e=>H({...q,companyName:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Position *"}),(0,u.jsx)(S,{type:"text",value:q.position,onChange:e=>H({...q,position:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Department *"}),(0,u.jsx)(S,{type:"text",value:q.department,onChange:e=>H({...q,department:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Email Address *"}),(0,u.jsx)(S,{type:"email",value:q.email,onChange:e=>H({...q,email:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Phone Number *"}),(0,u.jsx)(p.A,{value:q.phone,onChange:e=>H({...q,phone:e})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Address"}),(0,u.jsx)(A,{value:q.address,onChange:e=>H({...q,address:e.target.value})})]}),"Brand Manager"===q.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Brand General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:q.manager_id||"",onChange:e=>H({...q,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Brand General"}),oe.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===q.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Foodcourt General * (Parent Manager)"}),(0,u.jsxs)(i.Jt,{value:q.manager_id||"",onChange:e=>H({...q,manager_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Foodcourt General"}),ie.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===q.role||"Brand General"===q.role||"Restaurant Owner"===q.role)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(C,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,u.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Currency *"}),(0,u.jsx)(i.Jt,{value:(0,d.Wh)(q.currency||"MYR"),onChange:e=>{const n=e.target.value,a=xe(q.role).find(e=>e.display_name===q.planType);H({...q,currency:n,planAmount:a?String((0,d.jL)(a,n)):q.planAmount})},children:d.cr.map(e=>(0,u.jsx)("option",{value:e,children:e},e))})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription Plan *"}),(0,u.jsxs)(i.Jt,{value:q.planType||"",onChange:e=>{const n=xe(q.role).find(n=>n.display_name===e.target.value),a=(0,d.Wh)(q.currency||"MYR");H({...q,planType:e.target.value,planAmount:n?String((0,d.jL)(n,a)):q.planAmount})},children:[(0,u.jsx)("option",{value:"",children:"Select Plan"}),xe(q.role).map(e=>(0,u.jsxs)("option",{value:e.display_name,children:[e.display_name," (",(0,d.m9)(e,(0,d.Wh)(q.currency||"MYR")),"/month)"]},e.id))]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Billing Cycle *"}),(0,u.jsxs)(i.Jt,{value:q.billingCycle||"monthly",onChange:e=>H({...q,billingCycle:e.target.value}),children:[(0,u.jsx)("option",{value:"monthly",children:"Monthly"}),(0,u.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription Start Date *"}),(0,u.jsx)(S,{type:"date",value:q.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>H({...q,subscriptionStart:e.target.value})})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(b,{children:"Subscription End Date"}),(0,u.jsx)(S,{type:"date",value:q.subscriptionEnd||"",onChange:e=>H({...q,subscriptionEnd:e.target.value})})]}),(0,u.jsxs)(C,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:void 0===q.autoRenew||q.autoRenew,onChange:e=>H({...q,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,u.jsx)(b,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),X&&(0,u.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:X})]}),L&&(0,u.jsx)(l.aF,{isOpen:!0,onClose:()=>G(!1),title:"Confirm Action",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,u.jsxs)(l.$n,{variant:"delete"===U?"danger":"primary",onClick:async()=>{if(O&&U){try{if("delete"===U){const e=O.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:k()});if(n.ok)await pe();else{const e=await n.json().catch(()=>({error:"Delete failed"}));ne(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===U){const e=O.id.replace("mgr-",""),n=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:k(),body:JSON.stringify({newPassword:n})})).ok?(P(`New password: ${n}\n\nPlease save this password and share it securely with the manager.`),T(!0)):ne("Password reset failed")}else if("toggle"===U){const e=O.id.replace("mgr-",""),n="active"===O.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:k(),body:JSON.stringify({status:n})})).ok?a(e=>e.map(e=>e.id===O.id?{...e,status:n}:e)):ne("Status update failed")}}catch(e){ne(`Action failed: ${e.message}. Please try again.`)}G(!1),$(null),z(null)}},children:[" ","delete"===U?"Delete":"resetPassword"===U?"Reset Password":"Confirm"," "]})]}),children:(0,u.jsxs)("p",{children:["delete"===U&&`Are you sure you want to delete Manager ID: ${null===O||void 0===O?void 0:O.managerId}? This action cannot be undone.`,"resetPassword"===U&&`Are you sure you want to reset password for Manager ID: ${null===O||void 0===O?void 0:O.managerId}?`,"toggle"===U&&`Are you sure you want to ${"active"===(null===O||void 0===O?void 0:O.status)?"deactivate":"activate"} Manager ID: ${null===O||void 0===O?void 0:O.managerId}?`]})}),ee&&(0,u.jsx)(l.aF,{isOpen:!0,onClose:()=>ne(""),title:"Error",footer:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>ne(""),children:"OK"})}),children:(0,u.jsx)("p",{style:{color:"#DC2626"},children:ee})})]})]})})}}}]);