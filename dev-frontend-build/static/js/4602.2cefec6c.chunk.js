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
`,l=e=>{let{children:t,className:a,style:r,...o}=e;return(0,n.jsx)(i,{className:a,style:r,...o,children:t})},d=e=>{let{placeholder:t="Search...",...a}=e;return(0,n.jsx)(o,{placeholder:t,...a})},c=e=>{let{children:t,...a}=e;return(0,n.jsx)(s,{...a,children:t})}},4021:(e,t,a)=>{a.d(t,{i1:()=>o});var r=a(9950),n=a(1367),i=a(6038);const o=()=>{const{user:e}=(0,n.As)(),[t,a]=(0,r.useState)("RM"),[o,s]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return a("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";a(r)}else a("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),a("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:c}}},4602:(e,t,a)=>{a.r(t),a.d(t,{default:()=>W});var r=a(9950),n=a(4752),i=a(3310),o=a(2674),s=a(2488),l=a(1367),d=a(4021),c=a(6038),p=a(4414);const x=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=n.Ay.div`
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
`,m=n.Ay.div`
  display: flex;
  gap: 12px;
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=n.Ay.div`
  padding: 32px;
`,y=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,v=n.Ay.div`
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
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,b=n.Ay.thead`
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

  /* 정렬 규칙: 상태는 가운데, 액션은 우측 */
  th:nth-child(5) { text-align: center; } /* Status */
  th:nth-child(6) { text-align: center; } /* Last Active */
  th:nth-child(7) { text-align: right; } /* Actions */
`,w=n.Ay.tr`
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
`,A=n.Ay.td`
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
`,S=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=n.Ay.div`
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
`,k=n.Ay.div``,_=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,C=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.type){case"restaurant_staff":return"#ECFDF5";case"company_staff":return"#EDE9FE";case"freelancer":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"restaurant_staff":return"#059669";case"company_staff":return"#7C3AED";case"freelancer":return"#DC2626";default:return"#6B7280"}}};
`,R=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
`,z=n.Ay.button`
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
`,D=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,I=n.Ay.div`
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
`,M=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,O=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,$=n.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,N=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,T=n.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,U=n.Ay.div`
  display: flex;
  flex-direction: column;
`,L=n.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,P=n.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=n.Ay.select`
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
`,H=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,W=()=>{const{user:e}=(0,l.As)(),[t,a]=(0,r.useState)("all"),[n,W]=(0,r.useState)([]),[K,Q]=(0,r.useState)(""),[Y,q]=(0,r.useState)("all"),[G,V]=(0,r.useState)("all"),[X,Z]=(0,r.useState)("all"),[ee,te]=(0,r.useState)(!1),{defaultCurrency:ae}=(0,d.i1)(),[re,ne]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ae&&ne(ae)},[ae]);const[ie,oe]=(0,r.useState)({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""});(0,r.useEffect)(()=>{e?(async()=>{try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udc65 Fetching staff for manager:",t);const a=await fetch("/api/users");if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const e=await a.json();console.log("\ud83d\udc65 Users data from API:",e);const r=await fetch(`/api/restaurants/manager/${t}`),n=r.ok?await r.json():[];console.log("\ud83c\udfea Restaurants data for staff mapping:",n);const i={};n.forEach(e=>{i[e.id]=e.name});const o=(e.data||e).filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||!(!e.restaurant_id||!n.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 Transformed staff data:",o),W(o)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():W([])},[e]);const se=n.filter(e=>("all"===t||e.type===`${t}_staff`||e.type===t)&&(!(K&&!e.name.toLowerCase().includes(K.toLowerCase())&&!e.email.toLowerCase().includes(K.toLowerCase()))&&(("all"===Y||e.role===Y)&&(("all"===G||e.status===G)&&("all"===X||e.restaurantId===X))))),le={total:n.length,restaurant:n.filter(e=>"restaurant_staff"===e.type).length,company:n.filter(e=>"company_staff"===e.type).length,freelancer:n.filter(e=>"freelancer"===e.type).length,active:n.filter(e=>"active"===e.status).length,totalSalary:n.filter(e=>e.salary).reduce((e,t)=>e+(t.salary||0),0)},de=()=>{te(!1),oe({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""})},ce=(e,t)=>{oe(a=>({...a,[e]:t}))},pe=Array.from(new Map(n.filter(e=>e.restaurantId).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()).concat([{id:"rest-004",name:"Satay Station"},{id:"rest-005",name:"Laksa Paradise"}]),xe=Array.from(new Set(n.map(e=>e.role)));return(0,p.jsx)(i.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(h,{children:"Staff"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:()=>{const t={exportDate:(new Date).toISOString(),totalStaff:n.length,manager:null===e||void 0===e?void 0:e.name,statistics:{total:le.total,restaurant:le.restaurant,company:le.company,freelancer:le.freelancer,active:le.active,monthlyPayroll:le.totalSalary},staff:n.map(e=>({name:e.name,email:e.email,phone:e.phone,type:e.type,role:e.role,department:e.department,restaurantName:e.restaurantName||"Head Office",status:e.status,joinDate:e.joinDate,lastActive:e.lastActive,salary:e.salary||"N/A",permissions:e.permissions.join(", ")}))},a=JSON.stringify(t,null,2),r=new Blob([a],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Data"}),(0,p.jsx)(f,{variant:"primary",onClick:()=>{te(!0)},children:"Add Staff"})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(o.j,{children:[(0,p.jsxs)(o.oz,{active:"all"===t,onClick:()=>a("all"),children:["All Staff (",le.total,")"]}),(0,p.jsxs)(o.oz,{active:"restaurant"===t,onClick:()=>a("restaurant"),children:["Restaurant Staff (",le.restaurant,")"]}),(0,p.jsxs)(o.oz,{active:"company"===t,onClick:()=>a("company"),children:["Company Staff (",le.company,")"]}),(0,p.jsxs)(o.oz,{active:"freelancer"===t,onClick:()=>a("freelancer"),children:["Freelancers (",le.freelancer,")"]})]}),(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{color:"#059669",children:[(0,p.jsx)(o.Os,{children:le.total}),(0,p.jsx)(o.v0,{children:"Total Staff"}),(0,p.jsx)(y,{children:"Across all categories"})]}),(0,p.jsxs)(o.hI,{color:"#7C3AED",children:[(0,p.jsx)(o.Os,{children:le.active}),(0,p.jsx)(o.v0,{children:"Active Staff"}),(0,p.jsxs)(y,{children:[Math.round(le.active/le.total*100),"% of total"]})]}),(0,p.jsxs)(o.hI,{color:"#2563EB",children:[(0,p.jsx)(o.Os,{children:le.restaurant}),(0,p.jsx)(o.v0,{children:"Restaurant Staff"}),(0,p.jsxs)(y,{children:["From ",pe.length," restaurants"]})]}),(0,p.jsxs)(o.hI,{color:"#DC2626",children:[(0,p.jsx)(o.Os,{children:(0,c.vv)(le.totalSalary,re)}),(0,p.jsx)(o.v0,{children:"Monthly Payroll"}),(0,p.jsx)(y,{children:"Company staff only"})]})]}),(0,p.jsxs)(s.Qn,{children:[(0,p.jsx)(s.DO,{type:"text",placeholder:"Search by name or email...",value:K,onChange:e=>Q(e.target.value)}),(0,p.jsxs)(s.Jt,{value:Y,onChange:e=>q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),xe.map(e=>(0,p.jsx)("option",{value:e,children:e},e))]}),(0,p.jsxs)(s.Jt,{value:G,onChange:e=>V(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,p.jsxs)(s.Jt,{value:X,onChange:e=>Z(e.target.value),style:{display:"all"===t||"restaurant"===t?"block":"none"},children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),pe.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsx)(v,{children:0===se.length?(0,p.jsxs)(D,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Staff Member"}),(0,p.jsx)("th",{children:"Restaurant & Type"}),(0,p.jsx)("th",{children:"Role"}),(0,p.jsx)("th",{children:"Department"}),(0,p.jsx)("th",{children:"Status"}),(0,p.jsx)("th",{children:"Last Active"}),(0,p.jsx)("th",{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:se.map(t=>{return(0,p.jsxs)(w,{children:[(0,p.jsx)(A,{"data-label":"Staff Member",children:(0,p.jsxs)(S,{children:[(0,p.jsx)(F,{type:t.type,children:(a=t.name,a.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,p.jsxs)(k,{children:[(0,p.jsx)(_,{children:t.name}),(0,p.jsx)(C,{children:t.email})]})]})}),(0,p.jsx)(A,{"data-label":"Restaurant & Type",children:t.restaurantName?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:t.restaurantName}),(0,p.jsx)(E,{type:t.type,children:t.type.replace("_"," ")})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Head Office"}),(0,p.jsx)(E,{type:t.type,children:t.type.replace("_"," ")})]})}),(0,p.jsx)(A,{"data-label":"Role",children:t.role}),(0,p.jsx)(A,{"data-label":"Department",children:t.department}),(0,p.jsx)(A,{"data-label":"Status",children:(0,p.jsx)(R,{status:t.status,children:t.status})}),(0,p.jsx)(A,{"data-label":"Last Active",children:t.lastActive}),(0,p.jsx)(A,{"data-label":"",children:(0,p.jsxs)(B,{children:[(0,p.jsx)(z,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(t),children:"Edit"}),(0,p.jsx)(z,{onClick:()=>(e=>{alert(`${e.name} permissions: ${e.permissions.join(", ")}`)})(t),children:"Permissions"}),"restaurant_staff"===t.type&&"Staff"===t.role&&(0,p.jsx)(z,{onClick:()=>(async t=>{if("Restaurant Admin"===t.role)return void alert(`${t.name} is already a Restaurant Admin`);if(confirm(`Promote ${t.name} to Restaurant Admin? They will be able to manage the restaurant independently.`))try{console.log(`\ud83d\udd04 Promoting ${t.name} to Restaurant Admin...`);const a=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"Restaurant Admin"})});if(a.ok){const r=await a.json();console.log("\u2705 Staff promoted successfully:",r);const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",i=await fetch("/api/users");if(i.ok){const e=await i.json(),t=await fetch(`/api/restaurants/manager/${n}`),a=t.ok?await t.json():[],r={};a.forEach(e=>{r[e.id]=e.name});const o=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==n)||!(!e.restaurant_id||!a.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?r[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});W(o)}alert(`${t.name} has been promoted to Restaurant Admin successfully!`)}else{const e=await a.json();console.error("Failed to promote staff:",e),alert("Failed to promote staff: "+(e.error||"Unknown error"))}}catch(a){console.error("Error promoting staff:",a),alert("Error promoting staff: "+a.message)}})(t),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote to Admin"})]})})]},t.id);var a})})]})})]}),(0,p.jsx)(I,{show:ee,children:(0,p.jsxs)(M,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)($,{children:"Add New Staff Member"}),(0,p.jsx)(N,{onClick:de,children:"\xd7"})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Full Name"}),(0,p.jsx)(P,{type:"text",value:ie.name,onChange:e=>ce("name",e.target.value),placeholder:"Enter full name"})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Email"}),(0,p.jsx)(P,{type:"email",value:ie.email,onChange:e=>ce("email",e.target.value),placeholder:"Enter email address"})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Phone"}),(0,p.jsx)(P,{type:"text",value:ie.phone,onChange:e=>ce("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Staff Type"}),(0,p.jsxs)(J,{value:ie.type,onChange:e=>ce("type",e.target.value),children:[(0,p.jsx)("option",{value:"restaurant_staff",children:"Restaurant Staff"}),(0,p.jsx)("option",{value:"company_staff",children:"Company Staff"}),(0,p.jsx)("option",{value:"freelancer",children:"Freelancer"})]})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Role"}),(0,p.jsx)(P,{type:"text",value:ie.role,onChange:e=>ce("role",e.target.value),placeholder:"e.g. Manager, Cashier, Kitchen Head"})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Department"}),(0,p.jsx)(P,{type:"text",value:ie.department,onChange:e=>ce("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen"})]}),"restaurant_staff"===ie.type&&(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Restaurant"}),(0,p.jsxs)(J,{value:ie.restaurantId,onChange:e=>ce("restaurantId",e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Select Restaurant"}),pe.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"company_staff"===ie.type&&(0,p.jsxs)(U,{children:[(0,p.jsx)(L,{children:"Monthly Salary (RM)"}),(0,p.jsx)(P,{type:"number",value:ie.salary,onChange:e=>ce("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),(0,p.jsxs)(H,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:de,children:"Cancel"}),(0,p.jsx)(f,{variant:"primary",onClick:async()=>{if(ie.name&&ie.email&&ie.restaurantId)try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a={username:ie.email.split("@")[0]+"_staff",email:ie.email,password:"staff123",role:"Staff",full_name:ie.name,restaurant_id:parseInt(ie.restaurantId),manager_id:parseInt(t)};console.log("\ud83d\udd04 Creating staff user:",a);const r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(r.ok){const e=await r.json();console.log("\u2705 Staff created successfully:",e);const a=await fetch("/api/users");if(a.ok){const e=await a.json(),r=await fetch(`/api/restaurants/manager/${t}`),n=r.ok?await r.json():[],i={};n.forEach(e=>{i[e.id]=e.name});const o=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||(!(!e.restaurant_id||!n.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role))).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:ie.phone||"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});W(o)}de(),alert("Staff member added successfully! Default password: staff123")}else{const e=await r.json();console.error("Failed to create staff:",e),alert("Failed to create staff: "+(e.error||"Unknown error"))}}catch(t){console.error("Error creating staff:",t),alert("Error creating staff: "+t.message)}else alert("Please fill in all required fields")},children:"Add Staff"})]})]})})]})})}}}]);