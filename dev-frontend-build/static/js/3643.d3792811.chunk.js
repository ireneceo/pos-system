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
`,i=t.Ay.div`
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
`,l=t.Ay.button`
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
`,c=e=>{let{children:n,className:a,style:t,...o}=e;return(0,r.jsx)(s,{className:a,style:t,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:a,onChange:t,style:s,...d}=e;return(0,r.jsxs)(i,{style:s,children:[(0,r.jsx)(o,{placeholder:n,value:a,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...d}),a&&(0,r.jsx)(l,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:n,...a}=e;return(0,r.jsx)(d,{...a,children:n})}},3643:(e,n,a)=>{a.r(n),a.d(n,{default:()=>T});var t=a(9950),r=a(4492),s=a(4752),o=a(1367),i=a(8409),l=a(2488),d=a(6038),c=a(2924),p=a(8666),h=a(9018),x=a(4414);const u=(0,s.Ay)(i.A0)`
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
`,g=(0,s.Ay)(i.Hj)`
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
  margin: auto 0;
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
`,k=s.Ay.div`
  padding: 24px;
`,M=s.Ay.div`
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
`,R=s.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0 0 32px 0;
  line-height: 1.5;
`,D=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},T=()=>{const{operationSettings:e}=(0,h.Pj)();(0,o.As)();const[n,a]=(0,t.useState)([]),[s,T]=(0,t.useState)(""),[$,O]=(0,t.useState)("all"),[G,L]=(0,t.useState)(!1),[U,z]=(0,t.useState)(!1),[J,W]=(0,t.useState)(""),[Y,K]=(0,t.useState)(null),[q,H]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(null),[X,Z]=(0,t.useState)(!1),[ee,ne]=(0,t.useState)(!1),[ae,te]=(0,t.useState)(null),[re,se]=(0,t.useState)(""),[oe,ie]=(0,t.useState)(""),[le,de]=(0,t.useState)(""),[ce,pe]=(0,t.useState)({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:"",planAmount:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[he,xe]=(0,t.useState)([]),[ue,ge]=(0,t.useState)([]),[me,je]=(0,t.useState)([]),ye=(0,r.Zp)(),ve=async()=>{try{console.log("\ud83d\udd04 Fetching managers from API...");const n=await fetch("/api/users?role=Manager",{headers:D()});if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const t=await n.json();console.log("\ud83d\udc65 Manager users data from API:",t);const r=await fetch("/api/restaurants",{headers:D()}),s=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",s);const o=t.data||t;if(console.log("\ud83d\udc54 Manager users found:",o),0===o.length)return console.log("\u26a0\ufe0f No manager users found"),void a([]);let i=[];try{const e=await fetch("/api/invoices",{headers:D()});if(e.ok){const n=await e.json();i=n.data||n}}catch(e){console.error("\u274c Error fetching invoices:",e)}const l=o.map(n=>{console.log("\ud83d\udd04 Processing manager:",n);const a=s.filter(e=>{const a=e.managerId===n.id.toString(),t=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===n.id.toString());return a||t});console.log(`\ud83d\udd0d Manager ${n.username} (ID: ${n.id}) has ${a.length} restaurants`);let t=0;try{t=i.filter(e=>a.some(n=>{var a;return n.id.toString()===(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())})).reduce((e,n)=>e+parseFloat(n.amount||n.total||0),0)}catch(e){console.log("Could not fetch invoices for revenue calculation:",e),t=0}const r={id:`mgr-${n.id}`,managerId:n.username||`manager-${n.id}`,userId:n.id,fullName:n.full_name||n.username||"Unknown Name",companyName:n.company_name||"Unknown Company",email:n.email,position:n.role||n.position||"Manager",department:n.department||"Management",phone:n.phone||"+60 12-345-6789",status:"active",restaurantCount:a.length,totalRevenue:t,createdAt:n.createdAt?new Date(n.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:(new Date).toISOString().split("T")[0],address:n.address||"No address provided"};return console.log("\u2705 Transformed manager:",r),r});console.log("\u2705 All transformed managers data:",l),console.log("\u2705 Setting managers state with",l.length,"managers"),a(l)}else console.error("\u274c Failed to fetch users:",n.status),a([])}catch(e){console.error("\u274c Error fetching managers:",e),console.error("Error details:",e),a([])}};(0,t.useEffect)(()=>{ve(),we(),fe()},[]);const fe=async()=>{try{const e=await fetch("/api/users?role=Manager",{headers:D()});if(e.ok){const n=await e.json(),a=n.data||n,t=a.filter(e=>"Brand General"===e.role);ge(t);const r=a.filter(e=>"Foodcourt General"===e.role);je(r),console.log("\ud83d\udcca Loaded Brand Generals:",t.length,"Foodcourt Generals:",r.length)}}catch(e){console.error("Error fetching general managers:",e)}},we=async()=>{try{const e=await fetch("/api/plans",{headers:D()});if(e.ok){const n=(await e.json()).filter(e=>("brand"===e.plan_target||"foodcourt"===e.plan_target)&&e.is_active);xe(n)}}catch(e){console.error("Error fetching plans:",e)}},be=e=>"Brand General"===e||"Brand Manager"===e?he.filter(e=>"brand"===e.plan_target):"Foodcourt General"===e||"Foodcourt Manager"===e?he.filter(e=>"foodcourt"===e.plan_target):[];console.log("\ud83d\udd0d Filtering managers:",{totalManagers:n.length,searchTerm:s,filterStatus:$,managers:n});const Ce=n.filter(e=>{const n=e.managerId.toLowerCase().includes(s.toLowerCase())||e.fullName.toLowerCase().includes(s.toLowerCase())||e.companyName.toLowerCase().includes(s.toLowerCase())||e.position.toLowerCase().includes(s.toLowerCase())||e.department.toLowerCase().includes(s.toLowerCase())||e.email.toLowerCase().includes(s.toLowerCase()),a="all"===$||e.status===$;return console.log("\ud83d\udd0d Manager filter check:",{manager:e.managerId,matchesSearch:n,matchesFilter:a,managerStatus:e.status,expectedStatus:$}),n&&a});console.log("\ud83d\udd0d Filtered results:",Ce.length,"managers");const Se=n.length,Ae=n.reduce((e,n)=>e+n.restaurantCount,0),ke=Ae,Me=n.reduce((e,n)=>e+n.totalRevenue,0),Fe=()=>{L(!1);const e=he.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),pe({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]})},Ie=(e,n)=>{pe(a=>({...a,[e]:"autoRenew"===e?"true"===n||!0===n:n}))};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(i.mc,{children:[(0,x.jsxs)(i.Y9,{children:[(0,x.jsx)(i.hE,{children:"Managers"}),(0,x.jsxs)(i.ex,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(Ce.map(e=>({"Manager Info":`${e.fullName} (${e.companyName})`,Email:e.email,Phone:e.phone,Status:e.status,Restaurants:e.restaurantCount,"Revenue (RM)":e.totalRevenue.toLocaleString(),"Last Active":e.lastActive,Position:e.position,Department:e.department,Address:e.address,"Created At":e.createdAt}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`managers-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:()=>{console.log("\ud83d\udd35 Add Manager button clicked");try{const e=he.filter(e=>"foodcourt"===e.plan_target),n=e.length>0?e[0]:null,a=new Date;a.setFullYear(a.getFullYear()+1),pe({managerId:"",fullName:"",companyName:"",email:"",position:"",department:"",phone:"",address:"",role:"Foodcourt General",parentManagerId:"",planType:n?n.display_name:"",planAmount:n?n.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:a.toISOString().split("T")[0]}),L(!0),console.log("\u2705 Modal state updated to true")}catch(e){console.error("\u274c Error opening modal:",e),se("Error opening modal: "+e.message)}},children:"Add Manager"})]})]}),(0,x.jsxs)(i.UC,{children:[(0,x.jsxs)(i.MD,{children:[(0,x.jsxs)(i.hI,{color:"#059669",children:[(0,x.jsx)(i.Os,{children:Se}),(0,x.jsx)(i.v0,{children:"Total Managers"}),(0,x.jsx)(i.d1,{children:"Currently active"})]}),(0,x.jsxs)(i.hI,{color:"#2563EB",children:[(0,x.jsx)(i.Os,{children:ke}),(0,x.jsx)(i.v0,{children:"Active Subscriptions"}),(0,x.jsxs)(i.d1,{children:[Se>0?(Ae/Se).toFixed(1):0," restaurants per manager"]})]}),(0,x.jsxs)(i.hI,{color:"#7C3AED",children:[(0,x.jsx)(i.Os,{children:Ae}),(0,x.jsx)(i.v0,{children:"Total Restaurants"}),(0,x.jsx)(i.d1,{children:"Across all managers"})]}),(0,x.jsxs)(i.hI,{color:"#D97706",children:[(0,x.jsxs)(i.Os,{children:[(0,d.vv)(Me/1e3,e.currency).replace(/\.\d+/,""),"k"]}),(0,x.jsx)(i.v0,{children:"Total Revenue"}),(0,x.jsx)(i.d1,{children:"From actual invoices"})]})]}),(0,x.jsxs)(l.Qn,{children:[(0,x.jsxs)(l.Jt,{value:$,onChange:e=>O(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,x.jsx)(l.DO,{type:"text",placeholder:"Search by name, email, or company...",value:s,onChange:e=>T(e.target.value)})]}),(0,x.jsxs)(i.XI,{children:[(0,x.jsxs)(u,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,x.jsx)("span",{children:"Manager Info"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Restaurants"}),(0,x.jsx)("span",{children:"Revenue (RM)"}),(0,x.jsx)("span",{children:"Last Active"}),(0,x.jsx)("span",{children:"Actions"})]}),0===Ce.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Data may still be loading...":"Try adjusting your filters"})]}):Ce.map(e=>(0,x.jsxs)(g,{columns:"2fr 1fr 1fr 1fr 1fr 200px",children:[(0,x.jsxs)(i.Np,{children:[(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Manager Info"}),(0,x.jsxs)(m,{children:[(0,x.jsx)(j,{children:e.fullName}),(0,x.jsxs)(y,{children:[e.companyName," \u2022 ",e.position," \u2022 ",e.department]})]})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Status"}),(0,x.jsx)("div",{children:(0,x.jsx)(v,{status:e.status,children:"active"===e.status?"Active":"Inactive"})})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Restaurants"}),(0,x.jsx)("span",{style:{color:"#635BFF",cursor:"pointer",textDecoration:"underline",fontWeight:"600"},onClick:()=>(e=>{console.log("\ud83d\udd17 Navigating to restaurants for manager:",e.fullName,"User ID:",e.userId,"Manager object:",e),ye(`/pos/admin/restaurants?managerId=${e.userId}&managerName=${encodeURIComponent(e.fullName)}`)})(e),title:`View restaurants managed by ${e.fullName}`,children:e.restaurantCount})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Revenue (RM)"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#374151",fontWeight:"600"},children:e.totalRevenue.toLocaleString()})]}),(0,x.jsxs)(i.Uj,{children:[(0,x.jsx)(i.PM,{children:"Last Active"}),(0,x.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.lastActive})]})]}),(0,x.jsxs)(i.wr,{children:[(0,x.jsx)(i.K0,{onClick:()=>(e=>{const n=e.role,a=be(n),t=a.length>0?a[0]:null,r=new Date;r.setFullYear(r.getFullYear()+1),te({...e,planType:t?t.display_name:"",planAmount:t?t.base_price_monthly:"149.00",billingCycle:"monthly",paymentModel:"Brand General"===n?"brand_manager":"foodcourt_manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:r.toISOString().split("T")[0]}),ne(!0)})(e),title:"Edit Manager",children:(0,x.jsx)(f,{children:"Edit"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{K(e),V("toggle"),H(!0)})(e),title:"active"===e.status?"Deactivate Manager":"Activate Manager",children:(0,x.jsx)(f,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{K(e),V("resetPassword"),H(!0)})(e),title:"Reset Password",children:(0,x.jsx)(f,{children:"\u26b7"})}),(0,x.jsx)(i.K0,{onClick:()=>(e=>{K(e),V("delete"),H(!0)})(e),title:"Delete Manager",children:(0,x.jsx)(f,{children:"\u2715"})})]})]},e.id))]}),G&&(0,x.jsx)(w,{show:G,onClick:Fe,children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{children:"Add New Manager"}),(0,x.jsx)(A,{onClick:Fe,children:"\xd7"})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Manager ID *"}),(0,x.jsx)(N,{type:"text",placeholder:"Enter unique manager ID",value:ce.managerId,onChange:e=>Ie("managerId",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Full Name *"}),(0,x.jsx)(N,{type:"text",placeholder:"Enter full name",value:ce.fullName,onChange:e=>Ie("fullName",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Company Name *"}),(0,x.jsx)(N,{type:"text",placeholder:"Enter company name",value:ce.companyName,onChange:e=>Ie("companyName",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Manager Role *"}),(0,x.jsxs)(l.Jt,{value:ce.role,onChange:e=>{const n=e.target.value;Ie("role",n);const a=be(n),t=a.length>0?a[0]:null,r="Restaurant Owner"===n?"restaurant_owner":"Brand General"===n||"Brand Manager"===n?"brand_manager":"foodcourt_manager";pe(e=>({...e,role:n,parentManagerId:"",planType:t?t.display_name:e.planType,planAmount:t?t.base_price_monthly:e.planAmount,paymentModel:r}))},children:[(0,x.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,x.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,x.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,x.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,x.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]})]}),"Brand Manager"===ce.role&&(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,x.jsxs)(l.Jt,{value:ce.parentManagerId,onChange:e=>Ie("parentManagerId",e.target.value),children:[(0,x.jsx)("option",{value:"",children:"Select Brand General"}),ue.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ce.role&&(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,x.jsxs)(l.Jt,{value:ce.parentManagerId,onChange:e=>Ie("parentManagerId",e.target.value),children:[(0,x.jsx)("option",{value:"",children:"Select Foodcourt General"}),me.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Position *"}),(0,x.jsx)(N,{type:"text",placeholder:"Enter position (e.g., General Manager, Operations Manager)",value:ce.position,onChange:e=>Ie("position",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Department *"}),(0,x.jsx)(N,{type:"text",placeholder:"Enter department (e.g., Operations, Sales, Marketing)",value:ce.department,onChange:e=>Ie("department",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Email Address *"}),(0,x.jsx)(N,{type:"email",placeholder:"Enter email address",value:ce.email,onChange:e=>Ie("email",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:ce.phone,onChange:e=>Ie("phone",e)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Address"}),(0,x.jsx)(_,{placeholder:"Enter company address",value:ce.address,onChange:e=>Ie("address",e.target.value)})]}),("Foodcourt General"===ce.role||"Brand General"===ce.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,x.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription Plan *"}),(0,x.jsxs)(l.Jt,{value:ce.planType,onChange:e=>{const n=be(ce.role).find(n=>n.display_name===e.target.value);Ie("planType",e.target.value),n&&Ie("planAmount",n.base_price_monthly)},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),be(ce.role).map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Billing Cycle *"}),(0,x.jsxs)(l.Jt,{value:ce.billingCycle,onChange:e=>Ie("billingCycle",e.target.value),children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription Start Date *"}),(0,x.jsx)(N,{type:"date",value:ce.subscriptionStart,onChange:e=>Ie("subscriptionStart",e.target.value)})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription End Date"}),(0,x.jsx)(N,{type:"date",value:ce.subscriptionEnd,onChange:e=>Ie("subscriptionEnd",e.target.value)})]}),(0,x.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:ce.autoRenew,onChange:e=>Ie("autoRenew",e.target.checked?"true":"false"),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,x.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),re&&(0,x.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:re})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:Fe,children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:async()=>{console.log("\ud83d\udd04 Handle submit called with data:",ce);if(await(async()=>{try{console.log("\ud83d\udd17 Testing connection to /api/users...");const e=await fetch("/api/users?role=Manager",{method:"GET",headers:D(),mode:"cors"});if(console.log("\ud83d\udd17 Test response status:",e.status),console.log("\ud83d\udd17 Test response ok:",e.ok),e.ok){const n=await e.json();return console.log("\ud83d\udd17 Test data received:",Array.isArray(n)?`${n.length} managers`:"Non-array response"),!0}return console.error("\ud83d\udd17 Connection test failed with status:",e.status),!1}catch(e){return console.error("\ud83d\udd17 Connection test failed:",e),!1}})())if(ce.managerId&&ce.fullName&&ce.companyName&&ce.email&&ce.position&&ce.department&&ce.phone)if("Brand Manager"!==ce.role||ce.parentManagerId)if("Foodcourt Manager"!==ce.role||ce.parentManagerId){console.log("\u2705 Validation passed, proceeding with manager creation...");try{const n={username:ce.managerId,email:ce.email,password:"manager123",role:ce.role,full_name:ce.fullName,company_name:ce.companyName,position:ce.position,department:ce.department,phone:ce.phone,address:ce.address};"Brand Manager"!==ce.role&&"Foodcourt Manager"!==ce.role||!ce.parentManagerId||(n.manager_id=parseInt(ce.parentManagerId)),console.log("\ud83d\udd04 Creating manager user:",n),console.log("\ud83d\udccd API URL:","/api/users");const a=await fetch("/api/users",{method:"POST",headers:D(),body:JSON.stringify(n)});let t;console.log("\ud83d\udce1 Response status:",a.status),console.log("\ud83d\udce1 Response ok:",a.ok);const r=a.headers.get("content-type");if(console.log("\ud83d\udce1 Content-Type:",r),r&&r.includes("application/json"))t=await a.json();else{const n=await a.text();if(console.log("\ud83d\udce1 Response text:",n),""===n.trim())throw new Error("Empty response from server");try{t=JSON.parse(n)}catch(e){throw console.error("\u274c Failed to parse response:",e),console.error("Response was:",n),new Error(`Invalid JSON response: ${n.substring(0,100)}...`)}}console.log("\ud83d\udce1 Parsed result:",t),a.ok?(W("Manager created. Default password: manager123"),z(!0),Fe(),await ve()):se("Failed to create manager: "+(t.error||t.message||"Unknown error"))}catch(n){n.message.includes("Failed to fetch")?se("Cannot connect to server. Please ensure the backend server is running"):se("Error creating manager: "+n.message)}}else se("Please select a Foodcourt General for this Foodcourt Manager");else se("Please select a Brand General for this Brand Manager");else se("Please fill in all required fields");else se("Cannot connect to backend server. Please check if the server is running")},children:"Add Manager"})]})]})}),U&&(0,x.jsx)(w,{show:U,onClick:()=>z(!1),children:(0,x.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(P,{children:"\u2713"}),(0,x.jsx)(R,{children:J}),(0,x.jsx)(i.$n,{variant:"primary",onClick:()=>z(!1),children:"OK"})]})}),X&&Y&&(0,x.jsx)(w,{show:X,onClick:()=>Z(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{children:"Manager Details"}),(0,x.jsx)(A,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)(F,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Manager ID"}),(0,x.jsx)(N,{type:"text",value:Y.managerId,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Full Name"}),(0,x.jsx)(N,{type:"text",value:Y.fullName,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Company Name"}),(0,x.jsx)(N,{type:"text",value:Y.companyName,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Position"}),(0,x.jsx)(N,{type:"text",value:Y.position,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Department"}),(0,x.jsx)(N,{type:"text",value:Y.department,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Email Address"}),(0,x.jsx)(N,{type:"email",value:Y.email,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Phone Number"}),(0,x.jsx)(N,{type:"tel",value:(0,c.FI)(Y.phone),disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Status"}),(0,x.jsx)(N,{type:"text",value:"active"===Y.status?"Active":"Inactive",disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Restaurant Count"}),(0,x.jsx)(N,{type:"text",value:Y.restaurantCount.toString(),disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Total Revenue"}),(0,x.jsx)(N,{type:"text",value:(0,d.vv)(Y.totalRevenue,e.currency),disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Created Date"}),(0,x.jsx)(N,{type:"text",value:Y.createdAt,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Last Active"}),(0,x.jsx)(N,{type:"text",value:Y.lastActive,disabled:!0})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Address"}),(0,x.jsx)(_,{value:Y.address,disabled:!0})]})]})}),(0,x.jsx)(M,{children:(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>Z(!1),children:"Close"})})]})}),ee&&ae&&(0,x.jsx)(w,{show:ee,onClick:()=>ne(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{children:"Edit Manager"}),(0,x.jsx)(A,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Manager ID * (Read-only)"}),(0,x.jsx)(N,{type:"text",value:ae.managerId,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Full Name *"}),(0,x.jsx)(N,{type:"text",value:ae.fullName,onChange:e=>te({...ae,fullName:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Company Name *"}),(0,x.jsx)(N,{type:"text",value:ae.companyName,onChange:e=>te({...ae,companyName:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Position *"}),(0,x.jsx)(N,{type:"text",value:ae.position,onChange:e=>te({...ae,position:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Department *"}),(0,x.jsx)(N,{type:"text",value:ae.department,onChange:e=>te({...ae,department:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Email Address *"}),(0,x.jsx)(N,{type:"email",value:ae.email,onChange:e=>te({...ae,email:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Phone Number *"}),(0,x.jsx)(p.A,{value:ae.phone,onChange:e=>te({...ae,phone:e})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Address"}),(0,x.jsx)(_,{value:ae.address,onChange:e=>te({...ae,address:e.target.value})})]}),"Brand Manager"===ae.role&&(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Brand General * (Parent Manager)"}),(0,x.jsxs)(l.Jt,{value:ae.manager_id||"",onChange:e=>te({...ae,manager_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Select Brand General"}),ue.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),"Foodcourt Manager"===ae.role&&(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Foodcourt General * (Parent Manager)"}),(0,x.jsxs)(l.Jt,{value:ae.manager_id||"",onChange:e=>te({...ae,manager_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Select Foodcourt General"}),me.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.full_name||e.username," (",e.company_name||"No Company",")"]},e.id))]})]}),("Foodcourt General"===ae.role||"Brand General"===ae.role)&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{style:{gridColumn:"1 / -1",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #E6EBF1"},children:(0,x.jsx)("h3",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Subscription Settings"})}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription Plan *"}),(0,x.jsxs)(l.Jt,{value:ae.planType||"",onChange:e=>{const n=be(ae.role).find(n=>n.display_name===e.target.value);te({...ae,planType:e.target.value,planAmount:n?n.base_price_monthly:ae.planAmount})},children:[(0,x.jsx)("option",{value:"",children:"Select Plan"}),be(ae.role).map(e=>(0,x.jsxs)("option",{value:e.display_name,children:[e.display_name," (RM ",e.base_price_monthly,"/month)"]},e.id))]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Billing Cycle *"}),(0,x.jsxs)(l.Jt,{value:ae.billingCycle||"monthly",onChange:e=>te({...ae,billingCycle:e.target.value}),children:[(0,x.jsx)("option",{value:"monthly",children:"Monthly"}),(0,x.jsx)("option",{value:"annual",children:"Annual"})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription Start Date *"}),(0,x.jsx)(N,{type:"date",value:ae.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>te({...ae,subscriptionStart:e.target.value})})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{children:"Subscription End Date"}),(0,x.jsx)(N,{type:"date",value:ae.subscriptionEnd||"",onChange:e=>te({...ae,subscriptionEnd:e.target.value})})]}),(0,x.jsxs)(I,{style:{gridColumn:"1 / -1",display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:void 0===ae.autoRenew||ae.autoRenew,onChange:e=>te({...ae,autoRenew:e.target.checked}),style:{width:"16px",height:"16px",accentColor:"#635BFF"}}),(0,x.jsx)(E,{style:{marginBottom:0},children:"Auto-renew subscription"})]})]})]}),oe&&(0,x.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",border:"1px solid #EF4444",borderRadius:"8px",color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:oe})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>{ne(!1),ie("")},children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(ae)if(ae.managerId&&ae.fullName&&ae.companyName&&ae.email&&ae.position&&ae.department&&ae.phone)try{console.log("\ud83d\udd04 Updating manager:",ae);const e=ae.id.replace("mgr-","");console.log("\ud83d\udcdd Extracted user ID:",e);const n={username:ae.managerId,full_name:ae.fullName,company_name:ae.companyName,email:ae.email,position:ae.position,department:ae.department,phone:ae.phone,address:ae.address};console.log("\ud83d\udcdd Update data:",n);const a=await fetch(`/api/users/${e}`,{method:"PUT",headers:D(),body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Update response status:",a.status),a.ok)ne(!1),te(null),ie(""),await ve();else{const e=await a.json();ie(e.error||"Update failed")}}catch(e){ie("Error updating manager: "+e.message)}else ie("Please fill in all required fields")},children:"Update Manager"})]})]})}),q&&(0,x.jsx)(w,{show:q,onClick:()=>H(!1),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{children:"Confirm Action"}),(0,x.jsx)(A,{onClick:()=>H(!1),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsxs)("p",{children:["delete"===Q&&`Are you sure you want to delete Manager ID: ${null===Y||void 0===Y?void 0:Y.managerId}? This action cannot be undone.`,"resetPassword"===Q&&`Are you sure you want to reset password for Manager ID: ${null===Y||void 0===Y?void 0:Y.managerId}?`,"toggle"===Q&&`Are you sure you want to ${"active"===(null===Y||void 0===Y?void 0:Y.status)?"deactivate":"activate"} Manager ID: ${null===Y||void 0===Y?void 0:Y.managerId}?`]})}),(0,x.jsxs)(M,{children:[(0,x.jsx)(i.$n,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,x.jsx)(i.$n,{variant:"delete"===Q?"danger":"primary",onClick:async()=>{if(Y&&Q){try{if("delete"===Q){const e=Y.id.replace("mgr-",""),n=await fetch(`/api/users/${e}`,{method:"DELETE",headers:D()});if(n.ok)await ve();else{const e=await n.json().catch(()=>({error:"Delete failed"}));de(e.error||`Delete failed: ${n.status}`)}}else if("resetPassword"===Q){const e=Y.id.replace("mgr-",""),n=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-4).toUpperCase();(await fetch(`/api/users/${e}/reset-password`,{method:"POST",headers:D(),body:JSON.stringify({newPassword:n})})).ok?(W(`New password: ${n}\n\nPlease save this password and share it securely with the manager.`),z(!0)):de("Password reset failed")}else if("toggle"===Q){const e=Y.id.replace("mgr-",""),n="active"===Y.status?"inactive":"active";(await fetch(`/api/users/${e}`,{method:"PUT",headers:D(),body:JSON.stringify({status:n})})).ok?a(e=>e.map(e=>e.id===Y.id?{...e,status:n}:e)):de("Status update failed")}}catch(e){de(`Action failed: ${e.message}. Please try again.`)}H(!1),K(null),V(null)}},children:"delete"===Q?"Delete":"resetPassword"===Q?"Reset Password":"Confirm"})]})]})}),le&&(0,x.jsx)(w,{show:!!le,onClick:()=>de(""),children:(0,x.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{children:"Error"}),(0,x.jsx)(A,{onClick:()=>de(""),children:"\xd7"})]}),(0,x.jsx)(k,{children:(0,x.jsx)("p",{style:{color:"#DC2626"},children:le})}),(0,x.jsx)(M,{children:(0,x.jsx)(i.$n,{variant:"primary",onClick:()=>de(""),children:"OK"})})]})})]})]})})}}}]);