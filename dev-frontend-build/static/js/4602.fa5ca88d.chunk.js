"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4602],{2488:(e,t,a)=>{a.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var r=a(8819),n=(a(9950),a(4752)),o=a(4414);const s=n.Ay.div`
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
`,i=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${r.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
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
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }

  &:disabled {
    background: ${r.w.colors.surfaceHover};
    color: ${r.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:a,style:r,...n}=e;return(0,o.jsx)(s,{className:a,style:r,...n,children:t})},c=e=>{let{placeholder:t="Search...",...a}=e;return(0,o.jsx)(i,{placeholder:t,...a})},p=e=>{let{children:t,...a}=e;return(0,o.jsx)(l,{...a,children:t})}},4021:(e,t,a)=>{a.d(t,{i1:()=>s});var r=a(9950),n=a(1367),o=a(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,a]=(0,r.useState)("RM"),[s,i]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";a(r)}else a("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:c}}},4602:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var r=a(8819),n=a(9950),o=a(4752),s=a(2674),i=a(2488),l=a(1367),d=a(4021),c=a(6038),p=a(4414);const u=o.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,x=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=o.Ay.div`
  display: flex;
  gap: 12px;
`,f=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: ${r.w.colors.text.muted};\n    border: 1px solid ${r.w.colors.border};\n    \n    &:hover {\n      background: ${r.w.colors.surfaceHover};\n      color: ${r.w.colors.secondary};\n      border-color: #CBD5E1;\n    }\n  `}
`,g=o.Ay.div`
  padding: 32px;
`,y=o.Ay.div`
  font-size: 12px;
  color: ${r.w.colors.text.placeholder};
  margin-top: 4px;
`,w=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${r.w.colors.border};
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,v=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,j=o.Ay.thead`
  background: ${r.w.colors.surfaceHover};
  border-bottom: 1px solid ${r.w.colors.border};

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 상태는 가운데, 액션은 우측 */
  th:nth-child(5) { text-align: center; } /* Status */
  th:nth-child(6) { text-align: center; } /* Last Active */
  th:nth-child(7) { text-align: right; } /* Actions */
`,b=o.Ay.tr`
  border-bottom: 1px solid ${r.w.colors.surfaceMuted};
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,A=o.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: 상태는 가운데, 액션은 우측 */
  &:nth-child(5) { text-align: center; } /* Status */
  &:nth-child(6) { text-align: center; } /* Last Active */
  &:nth-child(7) { text-align: right; } /* Actions */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,S=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=o.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background: ${e=>{switch(e.type){case"restaurant_staff":return"#059669";case"company_staff":return"#7C3AED";case"freelancer":return"#DC2626";default:return"#6B7280"}}};
`,_=o.Ay.div``,C=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,$=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.type){case"restaurant_staff":return"#ECFDF5";case"company_staff":return"#EDE9FE";case"freelancer":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"restaurant_staff":return"#059669";case"company_staff":return"#7C3AED";case"freelancer":return"#DC2626";default:return"#6B7280"}}};
`,E=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,R=o.Ay.div`
  display: flex;
  gap: 8px;
`,z=o.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${r.w.colors.border};
  border-radius: 6px;
  color: ${r.w.colors.text.muted};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${r.w.colors.primary};
    color: ${r.w.colors.primary};
    background: #F4F3FF;
  }
`,I=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,D=o.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,B=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,M=o.Ay.input`
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,O=o.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=()=>{const{user:e}=(0,l.As)(),[t,a]=(0,n.useState)("all"),[r,o]=(0,n.useState)([]),[L,N]=(0,n.useState)(""),[T,U]=(0,n.useState)("all"),[P,J]=(0,n.useState)("all"),[H,Q]=(0,n.useState)("all"),[W,K]=(0,n.useState)(!1),{defaultCurrency:Y}=(0,d.i1)(),[q,G]=(0,n.useState)("RM");(0,n.useEffect)(()=>{Y&&G(Y)},[Y]);const[V,X]=(0,n.useState)({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""});(0,n.useEffect)(()=>{e?(async()=>{try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udc65 Fetching staff for manager:",t);const a={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users",{headers:a});if(console.log("\ud83d\udce1 Users API response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udc65 Users data from API:",e);const n=await fetch(`/api/restaurants/manager/${t}`,{headers:a}),s=n.ok?await n.json():[];console.log("\ud83c\udfea Restaurants data for staff mapping:",s);const i={};s.forEach(e=>{i[e.id]=e.name});const l=(e.data||e).filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||!(!e.restaurant_id||!s.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 Transformed staff data:",l),o(l)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():o([])},[e]);const Z=r.filter(e=>("all"===t||e.type===`${t}_staff`||e.type===t)&&(!(L&&!e.name.toLowerCase().includes(L.toLowerCase())&&!e.email.toLowerCase().includes(L.toLowerCase()))&&(("all"===T||e.role===T)&&(("all"===P||e.status===P)&&("all"===H||e.restaurantId===H))))),ee={total:r.length,restaurant:r.filter(e=>"restaurant_staff"===e.type).length,company:r.filter(e=>"company_staff"===e.type).length,freelancer:r.filter(e=>"freelancer"===e.type).length,active:r.filter(e=>"active"===e.status).length,totalSalary:r.filter(e=>e.salary).reduce((e,t)=>e+(t.salary||0),0)},te=()=>{K(!1),X({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""})},ae=(e,t)=>{X(a=>({...a,[e]:t}))},re=Array.from(new Map(r.filter(e=>e.restaurantId).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()).concat([{id:"rest-004",name:"Satay Station"},{id:"rest-005",name:"Laksa Paradise"}]),ne=Array.from(new Set(r.map(e=>e.role)));return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(x,{children:"Staff"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:()=>{const t={exportDate:(new Date).toISOString(),totalStaff:r.length,manager:null===e||void 0===e?void 0:e.name,statistics:{total:ee.total,restaurant:ee.restaurant,company:ee.company,freelancer:ee.freelancer,active:ee.active,monthlyPayroll:ee.totalSalary},staff:r.map(e=>({name:e.name,email:e.email,phone:e.phone,type:e.type,role:e.role,department:e.department,restaurantName:e.restaurantName||"Head Office",status:e.status,joinDate:e.joinDate,lastActive:e.lastActive,salary:e.salary||"N/A",permissions:e.permissions.join(", ")}))},a=JSON.stringify(t,null,2),n=new Blob([a],{type:"application/json"}),o=URL.createObjectURL(n),s=document.createElement("a");s.href=o,s.download=`staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},children:"Export Data"}),(0,p.jsx)(f,{variant:"primary",onClick:()=>{K(!0)},children:"Add Staff"})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(s.j,{children:[(0,p.jsxs)(s.oz,{active:"all"===t,onClick:()=>a("all"),children:["All Staff (",ee.total,")"]}),(0,p.jsxs)(s.oz,{active:"restaurant"===t,onClick:()=>a("restaurant"),children:["Restaurant Staff (",ee.restaurant,")"]}),(0,p.jsxs)(s.oz,{active:"company"===t,onClick:()=>a("company"),children:["Company Staff (",ee.company,")"]}),(0,p.jsxs)(s.oz,{active:"freelancer"===t,onClick:()=>a("freelancer"),children:["Freelancers (",ee.freelancer,")"]})]}),(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#059669",children:[(0,p.jsx)(s.Os,{children:ee.total}),(0,p.jsx)(s.v0,{children:"Total Staff"}),(0,p.jsx)(y,{children:"Across all categories"})]}),(0,p.jsxs)(s.hI,{color:"#7C3AED",children:[(0,p.jsx)(s.Os,{children:ee.active}),(0,p.jsx)(s.v0,{children:"Active Staff"}),(0,p.jsxs)(y,{children:[Math.round(ee.active/ee.total*100),"% of total"]})]}),(0,p.jsxs)(s.hI,{color:"#2563EB",children:[(0,p.jsx)(s.Os,{children:ee.restaurant}),(0,p.jsx)(s.v0,{children:"Restaurant Staff"}),(0,p.jsxs)(y,{children:["From ",re.length," restaurants"]})]}),(0,p.jsxs)(s.hI,{color:"#DC2626",children:[(0,p.jsx)(s.Os,{children:(0,c.vv)(ee.totalSalary,q)}),(0,p.jsx)(s.v0,{children:"Monthly Payroll"}),(0,p.jsx)(y,{children:"Company staff only"})]})]}),(0,p.jsxs)(i.Qn,{children:[(0,p.jsx)(i.DO,{type:"text",placeholder:"Search by name or email...",value:L,onChange:e=>N(e.target.value)}),(0,p.jsxs)(i.Jt,{value:T,onChange:e=>U(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),ne.map(e=>(0,p.jsx)("option",{value:e,children:e},e))]}),(0,p.jsxs)(i.Jt,{value:P,onChange:e=>J(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,p.jsxs)(i.Jt,{value:H,onChange:e=>Q(e.target.value),style:{display:"all"===t||"restaurant"===t?"block":"none"},children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),re.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsx)(w,{children:0===Z.length?(0,p.jsxs)(I,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):(0,p.jsxs)(v,{children:[(0,p.jsx)(j,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Staff Member"}),(0,p.jsx)("th",{children:"Restaurant & Type"}),(0,p.jsx)("th",{children:"Role"}),(0,p.jsx)("th",{children:"Department"}),(0,p.jsx)("th",{children:"Status"}),(0,p.jsx)("th",{children:"Last Active"}),(0,p.jsx)("th",{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:Z.map(t=>{return(0,p.jsxs)(b,{children:[(0,p.jsx)(A,{"data-label":"Staff Member",children:(0,p.jsxs)(S,{children:[(0,p.jsx)(k,{type:t.type,children:(a=t.name,a.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,p.jsxs)(_,{children:[(0,p.jsx)(C,{children:t.name}),(0,p.jsx)(F,{children:t.email})]})]})}),(0,p.jsx)(A,{"data-label":"Restaurant & Type",children:t.restaurantName?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:t.restaurantName}),(0,p.jsx)($,{type:t.type,children:t.type.replace("_"," ")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Head Office"}),(0,p.jsx)($,{type:t.type,children:t.type.replace("_"," ")})]})}),(0,p.jsx)(A,{"data-label":"Role",children:t.role}),(0,p.jsx)(A,{"data-label":"Department",children:t.department}),(0,p.jsx)(A,{"data-label":"Status",children:(0,p.jsx)(E,{status:t.status,children:t.status})}),(0,p.jsx)(A,{"data-label":"Last Active",children:t.lastActive}),(0,p.jsx)(A,{"data-label":"",children:(0,p.jsxs)(R,{children:[(0,p.jsx)(z,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(t),children:"Edit"}),(0,p.jsx)(z,{onClick:()=>(e=>{alert(`${e.name} permissions: ${e.permissions.join(", ")}`)})(t),children:"Permissions"}),"restaurant_staff"===t.type&&"Staff"===t.role&&(0,p.jsx)(z,{onClick:()=>(async t=>{if("Restaurant Admin"===t.role)return void alert(`${t.name} is already a Restaurant Admin`);if(confirm(`Promote ${t.name} to Restaurant Admin? They will be able to manage the restaurant independently.`))try{console.log(`\ud83d\udd04 Promoting ${t.name} to Restaurant Admin...`);const a=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({role:"Restaurant Admin"})});if(r.ok){const n=await r.json();console.log("\u2705 Staff promoted successfully:",n);const s=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",i=await fetch("/api/users",{headers:{Authorization:`Bearer ${a}`}});if(i.ok){const e=await i.json(),t=await fetch(`/api/restaurants/manager/${s}`,{headers:{Authorization:`Bearer ${a}`}}),r=t.ok?await t.json():[],n={};r.forEach(e=>{n[e.id]=e.name});const l=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==s)||!(!e.restaurant_id||!r.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?n[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});o(l)}alert(`${t.name} has been promoted to Restaurant Admin successfully!`)}else{const e=await r.json();console.error("Failed to promote staff:",e),alert("Failed to promote staff: "+(e.error||"Unknown error"))}}catch(a){console.error("Error promoting staff:",a),alert("Error promoting staff: "+a.message)}})(t),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote to Admin"})]})})]},t.id);var a})})]})})]}),(0,p.jsx)(s.mH,{show:W,children:(0,p.jsxs)(s.$m,{children:[(0,p.jsxs)(s.rQ,{children:[(0,p.jsx)(s.wt,{children:"Add New Staff Member"}),(0,p.jsx)(s.Jn,{onClick:te,children:"\xd7"})]}),(0,p.jsxs)(D,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Full Name"}),(0,p.jsx)(M,{type:"text",value:V.name,onChange:e=>ae("name",e.target.value),placeholder:"Enter full name"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Email"}),(0,p.jsx)(M,{type:"email",value:V.email,onChange:e=>ae("email",e.target.value),placeholder:"Enter email address"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Phone"}),(0,p.jsx)(M,{type:"text",value:V.phone,onChange:e=>ae("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Staff Type"}),(0,p.jsxs)(O,{value:V.type,onChange:e=>ae("type",e.target.value),children:[(0,p.jsx)("option",{value:"restaurant_staff",children:"Restaurant Staff"}),(0,p.jsx)("option",{value:"company_staff",children:"Company Staff"}),(0,p.jsx)("option",{value:"freelancer",children:"Freelancer"})]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Role"}),(0,p.jsx)(M,{type:"text",value:V.role,onChange:e=>ae("role",e.target.value),placeholder:"e.g. Manager, Cashier, Kitchen Head"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Department"}),(0,p.jsx)(M,{type:"text",value:V.department,onChange:e=>ae("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen"})]}),"restaurant_staff"===V.type&&(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Restaurant"}),(0,p.jsxs)(O,{value:V.restaurantId,onChange:e=>ae("restaurantId",e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Select Restaurant"}),re.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"company_staff"===V.type&&(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(B,{children:"Monthly Salary (RM)"}),(0,p.jsx)(M,{type:"number",value:V.salary,onChange:e=>ae("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),(0,p.jsxs)(s.jl,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:te,children:"Cancel"}),(0,p.jsx)(f,{variant:"primary",onClick:async()=>{if(V.name&&V.email&&V.restaurantId)try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a={username:V.email.split("@")[0]+"_staff",email:V.email,password:"staff123",role:"Staff",full_name:V.name,restaurant_id:parseInt(V.restaurantId),manager_id:parseInt(t)};console.log("\ud83d\udd04 Creating staff user:",a);const r=localStorage.getItem("auth_token"),n=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(a)});if(n.ok){const e=await n.json();console.log("\u2705 Staff created successfully:",e);const a=await fetch("/api/users",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){const e=await a.json(),n=await fetch(`/api/restaurants/manager/${t}`,{headers:{Authorization:`Bearer ${r}`}}),s=n.ok?await n.json():[],i={};s.forEach(e=>{i[e.id]=e.name});const l=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||(!(!e.restaurant_id||!s.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role))).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:V.phone||"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});o(l)}te(),alert("Staff member added successfully! Default password: staff123")}else{const e=await n.json();console.error("Failed to create staff:",e),alert("Failed to create staff: "+(e.error||"Unknown error"))}}catch(t){console.error("Error creating staff:",t),alert("Error creating staff: "+t.message)}else alert("Please fill in all required fields")},disabled:!V.name.trim()||!V.email.trim(),children:"Add Staff"})]})]})})]})})}}}]);