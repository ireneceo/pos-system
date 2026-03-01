"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4602],{2488:(e,t,a)=>{a.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});a(9950);var r=a(4752),n=a(4414);const i=r.Ay.div`
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
`,s=r.Ay.select`
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
`,l=e=>{let{children:t,className:a,style:r,...o}=e;return(0,n.jsx)(i,{className:a,style:r,...o,children:t})},d=e=>{let{placeholder:t="Search...",...a}=e;return(0,n.jsx)(o,{placeholder:t,...a})},c=e=>{let{children:t,...a}=e;return(0,n.jsx)(s,{...a,children:t})}},4021:(e,t,a)=>{a.d(t,{i1:()=>o});var r=a(9950),n=a(1367),i=a(6038);const o=()=>{const{user:e}=(0,n.As)(),[t,a]=(0,r.useState)("RM"),[o,s]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";a(r)}else a("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:c}}},4602:(e,t,a)=>{a.r(t),a.d(t,{default:()=>J});var r=a(9950),n=a(4752),i=a(7960),o=a(2488),s=a(1367),l=a(4021),d=a(6038),c=a(4414);const p=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=n.Ay.div`
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
`,h=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=n.Ay.div`
  display: flex;
  gap: 12px;
`,m=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=n.Ay.div`
  padding: 32px;
`,g=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,j=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,v=n.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

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

  /* 정렬 규칙: Role, Department, Status, Last Active는 가운데, Actions는 우측 */
  th:nth-child(3) { text-align: center; } /* Role */
  th:nth-child(4) { text-align: center; } /* Department */
  th:nth-child(5) { text-align: center; } /* Status */
  th:nth-child(6) { text-align: center; } /* Last Active */
  th:nth-child(7) { text-align: right; } /* Actions */
`,b=n.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
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
`,w=n.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: Role, Department, Status, Last Active는 가운데, Actions는 우측 */
  &:nth-child(3) { text-align: center; } /* Role */
  &:nth-child(4) { text-align: center; } /* Department */
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
`,A=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=n.Ay.div``,S=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,k=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,C=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.type){case"restaurant_staff":return"#ECFDF5";case"company_staff":return"#EDE9FE";case"freelancer":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"restaurant_staff":return"#059669";case"company_staff":return"#7C3AED";case"freelancer":return"#DC2626";default:return"#6B7280"}}};
`,_=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,E=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,B=n.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,z=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,R=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,D=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,I=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,M=n.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,O=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,$=n.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,L=n.Ay.div`
  display: flex;
  flex-direction: column;
`,N=n.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,T=n.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,U=n.Ay.select`
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
`,P=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,J=()=>{const{user:e}=(0,s.As)(),[t,a]=(0,r.useState)("all"),[n,J]=(0,r.useState)([]),[H,W]=(0,r.useState)(""),[K,Q]=(0,r.useState)("all"),[Y,q]=(0,r.useState)("all"),[G,V]=(0,r.useState)("all"),[X,Z]=(0,r.useState)(!1),{defaultCurrency:ee}=(0,l.i1)(),[te,ae]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ee&&ae(ee)},[ee]);const[re,ne]=(0,r.useState)({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""});(0,r.useEffect)(()=>{e?(async()=>{try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udc65 Fetching staff for manager:",t);const a={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users",{headers:a});if(console.log("\ud83d\udce1 Users API response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udc65 Users data from API:",e);const n=await fetch(`/api/restaurants/manager/${t}`,{headers:a}),i=n.ok?await n.json():[];console.log("\ud83c\udfea Restaurants data for staff mapping:",i);const o={};i.forEach(e=>{o[e.id]=e.name});const s=(e.data||e).filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||!(!e.restaurant_id||!i.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?o[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 Transformed staff data:",s),J(s)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():J([])},[e]);const ie=n.filter(e=>("all"===t||e.type===`${t}_staff`||e.type===t)&&(!(H&&!e.name.toLowerCase().includes(H.toLowerCase())&&!e.email.toLowerCase().includes(H.toLowerCase()))&&(("all"===K||e.role===K)&&(("all"===Y||e.status===Y)&&("all"===G||e.restaurantId===G))))),oe={total:n.length,restaurant:n.filter(e=>"restaurant_staff"===e.type).length,company:n.filter(e=>"company_staff"===e.type).length,freelancer:n.filter(e=>"freelancer"===e.type).length,active:n.filter(e=>"active"===e.status).length,totalSalary:n.filter(e=>e.salary).reduce((e,t)=>e+(t.salary||0),0)},se=()=>{Z(!1),ne({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""})},le=(e,t)=>{ne(a=>({...a,[e]:t}))},de=Array.from(new Map(n.filter(e=>e.restaurantId).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()).concat([{id:"rest-004",name:"Satay Station"},{id:"rest-005",name:"Laksa Paradise"}]),ce=Array.from(new Set(n.map(e=>e.role)));return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Staff"}),(0,c.jsxs)(u,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:()=>{const t={exportDate:(new Date).toISOString(),totalStaff:n.length,manager:null===e||void 0===e?void 0:e.name,statistics:{total:oe.total,restaurant:oe.restaurant,company:oe.company,freelancer:oe.freelancer,active:oe.active,monthlyPayroll:oe.totalSalary},staff:n.map(e=>({name:e.name,email:e.email,phone:e.phone,type:e.type,role:e.role,department:e.department,restaurantName:e.restaurantName||"Head Office",status:e.status,joinDate:e.joinDate,lastActive:e.lastActive,salary:e.salary||"N/A",permissions:e.permissions.join(", ")}))},a=JSON.stringify(t,null,2),r=new Blob([a],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Data"}),(0,c.jsx)(m,{variant:"primary",onClick:()=>{Z(!0)},children:"Add Staff"})]})]}),(0,c.jsxs)(f,{children:[(0,c.jsxs)(i.j,{children:[(0,c.jsxs)(i.oz,{active:"all"===t,onClick:()=>a("all"),children:["All Staff (",oe.total,")"]}),(0,c.jsxs)(i.oz,{active:"restaurant"===t,onClick:()=>a("restaurant"),children:["Restaurant Staff (",oe.restaurant,")"]}),(0,c.jsxs)(i.oz,{active:"company"===t,onClick:()=>a("company"),children:["Company Staff (",oe.company,")"]}),(0,c.jsxs)(i.oz,{active:"freelancer"===t,onClick:()=>a("freelancer"),children:["Freelancers (",oe.freelancer,")"]})]}),(0,c.jsxs)(i.MD,{children:[(0,c.jsxs)(i.hI,{color:"#059669",children:[(0,c.jsx)(i.Os,{children:oe.total}),(0,c.jsx)(i.v0,{children:"Total Staff"}),(0,c.jsx)(g,{children:"Across all categories"})]}),(0,c.jsxs)(i.hI,{color:"#7C3AED",children:[(0,c.jsx)(i.Os,{children:oe.active}),(0,c.jsx)(i.v0,{children:"Active Staff"}),(0,c.jsxs)(g,{children:[Math.round(oe.active/oe.total*100),"% of total"]})]}),(0,c.jsxs)(i.hI,{color:"#2563EB",children:[(0,c.jsx)(i.Os,{children:oe.restaurant}),(0,c.jsx)(i.v0,{children:"Restaurant Staff"}),(0,c.jsxs)(g,{children:["From ",de.length," restaurants"]})]}),(0,c.jsxs)(i.hI,{color:"#DC2626",children:[(0,c.jsx)(i.Os,{children:(0,d.vv)(oe.totalSalary,te)}),(0,c.jsx)(i.v0,{children:"Monthly Payroll"}),(0,c.jsx)(g,{children:"Company staff only"})]})]}),(0,c.jsxs)(o.Qn,{children:[(0,c.jsx)(o.DO,{type:"text",placeholder:"Search by name or email...",value:H,onChange:e=>W(e.target.value)}),(0,c.jsxs)(o.Jt,{value:K,onChange:e=>Q(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Roles"}),ce.map(e=>(0,c.jsx)("option",{value:e,children:e},e))]}),(0,c.jsxs)(o.Jt,{value:Y,onChange:e=>q(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsxs)(o.Jt,{value:G,onChange:e=>V(e.target.value),style:{display:"all"===t||"restaurant"===t?"block":"none"},children:[(0,c.jsx)("option",{value:"all",children:"All Restaurants"}),de.map(e=>(0,c.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,c.jsx)(y,{children:0===ie.length?(0,c.jsxs)(z,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Staff Member"}),(0,c.jsx)("th",{children:"Restaurant & Type"}),(0,c.jsx)("th",{children:"Role"}),(0,c.jsx)("th",{children:"Department"}),(0,c.jsx)("th",{children:"Status"}),(0,c.jsx)("th",{children:"Last Active"}),(0,c.jsx)("th",{children:"Actions"})]})}),(0,c.jsx)("tbody",{children:ie.map(e=>(0,c.jsxs)(b,{children:[(0,c.jsx)(w,{"data-label":"Staff Member",children:(0,c.jsx)(A,{children:(0,c.jsxs)(F,{children:[(0,c.jsx)(S,{children:e.name}),(0,c.jsx)(k,{children:e.email})]})})}),(0,c.jsx)(w,{"data-label":"Restaurant & Type",children:e.restaurantName?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:e.restaurantName}),(0,c.jsx)(C,{type:e.type,children:e.type.replace("_"," ")})]}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Head Office"}),(0,c.jsx)(C,{type:e.type,children:e.type.replace("_"," ")})]})}),(0,c.jsx)(w,{"data-label":"Role",children:e.role}),(0,c.jsx)(w,{"data-label":"Department",children:e.department}),(0,c.jsx)(w,{"data-label":"Status",children:(0,c.jsx)(_,{status:e.status,children:e.status})}),(0,c.jsx)(w,{"data-label":"Last Active",children:e.lastActive}),(0,c.jsx)(w,{"data-label":"",children:(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(e),children:"Edit"}),(0,c.jsx)(B,{onClick:()=>(e=>{alert(`${e.name} permissions: ${e.permissions.join(", ")}`)})(e),children:"Permissions"})]})})]},e.id))})]})})]}),(0,c.jsx)(R,{show:X,children:(0,c.jsxs)(D,{children:[(0,c.jsxs)(I,{children:[(0,c.jsx)(M,{children:"Add New Staff Member"}),(0,c.jsx)(O,{onClick:se,children:"\xd7"})]}),(0,c.jsxs)($,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Full Name"}),(0,c.jsx)(T,{type:"text",value:re.name,onChange:e=>le("name",e.target.value),placeholder:"Enter full name"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Email"}),(0,c.jsx)(T,{type:"email",value:re.email,onChange:e=>le("email",e.target.value),placeholder:"Enter email address"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Phone"}),(0,c.jsx)(T,{type:"text",value:re.phone,onChange:e=>le("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Staff Type"}),(0,c.jsxs)(U,{value:re.type,onChange:e=>le("type",e.target.value),children:[(0,c.jsx)("option",{value:"restaurant_staff",children:"Restaurant Staff"}),(0,c.jsx)("option",{value:"company_staff",children:"Company Staff"}),(0,c.jsx)("option",{value:"freelancer",children:"Freelancer"})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Role"}),(0,c.jsx)(T,{type:"text",value:re.role,onChange:e=>le("role",e.target.value),placeholder:"e.g. Manager, Cashier, Kitchen Head"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Department"}),(0,c.jsx)(T,{type:"text",value:re.department,onChange:e=>le("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen"})]}),"restaurant_staff"===re.type&&(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Restaurant"}),(0,c.jsxs)(U,{value:re.restaurantId,onChange:e=>le("restaurantId",e.target.value),children:[(0,c.jsx)("option",{value:"",children:"Select Restaurant"}),de.map(e=>(0,c.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"company_staff"===re.type&&(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Monthly Salary (RM)"}),(0,c.jsx)(T,{type:"number",value:re.salary,onChange:e=>le("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:se,children:"Cancel"}),(0,c.jsx)(m,{variant:"primary",onClick:async()=>{if(re.name&&re.email&&re.restaurantId)try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a={username:re.email.split("@")[0]+"_staff",email:re.email,password:"staff123",role:"Staff",full_name:re.name,restaurant_id:parseInt(re.restaurantId),manager_id:parseInt(t)};console.log("\ud83d\udd04 Creating staff user:",a);const r=localStorage.getItem("auth_token"),n=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(a)});if(n.ok){const e=await n.json();console.log("\u2705 Staff created successfully:",e);const a=await fetch("/api/users",{headers:{Authorization:`Bearer ${r}`}});if(a.ok){const e=await a.json(),n=await fetch(`/api/restaurants/manager/${t}`,{headers:{Authorization:`Bearer ${r}`}}),i=n.ok?await n.json():[],o={};i.forEach(e=>{o[e.id]=e.name});const s=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||(!(!e.restaurant_id||!i.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role))).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:re.phone||"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?o[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});J(s)}se(),alert("Staff member added successfully! Default password: staff123")}else{const e=await n.json();console.error("Failed to create staff:",e),alert("Failed to create staff: "+(e.error||"Unknown error"))}}catch(t){console.error("Error creating staff:",t),alert("Error creating staff: "+t.message)}else alert("Please fill in all required fields")},children:"Add Staff"})]})]})})]})})}}}]);