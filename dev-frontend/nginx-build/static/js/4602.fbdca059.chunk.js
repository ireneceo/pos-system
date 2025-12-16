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
`,s=r.Ay.input`
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
`,o=r.Ay.select`
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
`,l=e=>{let{children:t,className:a,style:r,...s}=e;return(0,n.jsx)(i,{className:a,style:r,...s,children:t})},d=e=>{let{placeholder:t="Search...",...a}=e;return(0,n.jsx)(s,{placeholder:t,...a})},c=e=>{let{children:t,...a}=e;return(0,n.jsx)(o,{...a,children:t})}},4602:(e,t,a)=>{a.r(t),a.d(t,{default:()=>P});var r=a(9950),n=a(4752),i=a(3310),s=a(7492),o=a(2488),l=a(1367),d=a(4414);const c=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=n.Ay.div`
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
`,x=n.Ay.h1`
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
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=n.Ay.div`
  padding: 32px;
`,h=n.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 150px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,j=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,w=n.Ay.div`
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
`,b=n.Ay.div``,A=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,S=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,F=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.type){case"restaurant_staff":return"#ECFDF5";case"company_staff":return"#EDE9FE";case"freelancer":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"restaurant_staff":return"#059669";case"company_staff":return"#7C3AED";case"freelancer":return"#DC2626";default:return"#6B7280"}}};
`,k=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,_=n.Ay.div`
  display: flex;
  gap: 8px;
`,C=n.Ay.button`
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
`,E=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,B=n.Ay.div`
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
`,z=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,R=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,I=n.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,D=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,O=n.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,$=n.Ay.div`
  display: flex;
  flex-direction: column;
`,M=n.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,N=n.Ay.input`
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
`,T=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,P=()=>{const{user:e}=(0,l.As)(),[t,a]=(0,r.useState)("all"),[n,P]=(0,r.useState)([]),[L,J]=(0,r.useState)(""),[H,W]=(0,r.useState)("all"),[K,Q]=(0,r.useState)("all"),[q,Y]=(0,r.useState)("all"),[G,V]=(0,r.useState)(!1),[X,Z]=(0,r.useState)({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""});(0,r.useEffect)(()=>{e?(async()=>{try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udc65 Fetching staff for manager:",t);const a=await fetch("/api/users");if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const e=await a.json();console.log("\ud83d\udc65 Users data from API:",e);const r=await fetch(`/api/restaurants/manager/${t}`),n=r.ok?await r.json():[];console.log("\ud83c\udfea Restaurants data for staff mapping:",n);const i={};n.forEach(e=>{i[e.id]=e.name});const s=(e.data||e).filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||!(!e.restaurant_id||!n.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 Transformed staff data:",s),P(s)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():P([])},[e]);const ee=n.filter(e=>("all"===t||e.type===`${t}_staff`||e.type===t)&&(!(L&&!e.name.toLowerCase().includes(L.toLowerCase())&&!e.email.toLowerCase().includes(L.toLowerCase()))&&(("all"===H||e.role===H)&&(("all"===K||e.status===K)&&("all"===q||e.restaurantId===q))))),te={total:n.length,restaurant:n.filter(e=>"restaurant_staff"===e.type).length,company:n.filter(e=>"company_staff"===e.type).length,freelancer:n.filter(e=>"freelancer"===e.type).length,active:n.filter(e=>"active"===e.status).length,totalSalary:n.filter(e=>e.salary).reduce((e,t)=>e+(t.salary||0),0)},ae=()=>{V(!1),Z({name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",salary:""})},re=(e,t)=>{Z(a=>({...a,[e]:t}))},ne=Array.from(new Map(n.filter(e=>e.restaurantId).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()).concat([{id:"rest-004",name:"Satay Station"},{id:"rest-005",name:"Laksa Paradise"}]),ie=Array.from(new Set(n.map(e=>e.role)));return(0,d.jsx)(i.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Staff"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(f,{variant:"secondary",onClick:()=>{const t={exportDate:(new Date).toISOString(),totalStaff:n.length,manager:null===e||void 0===e?void 0:e.name,statistics:{total:te.total,restaurant:te.restaurant,company:te.company,freelancer:te.freelancer,active:te.active,monthlyPayroll:te.totalSalary},staff:n.map(e=>({name:e.name,email:e.email,phone:e.phone,type:e.type,role:e.role,department:e.department,restaurantName:e.restaurantName||"Head Office",status:e.status,joinDate:e.joinDate,lastActive:e.lastActive,salary:e.salary||"N/A",permissions:e.permissions.join(", ")}))},a=JSON.stringify(t,null,2),r=new Blob([a],{type:"application/json"}),i=URL.createObjectURL(r),s=document.createElement("a");s.href=i,s.download=`staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(i)},children:"Export Data"}),(0,d.jsx)(f,{variant:"primary",onClick:()=>{V(!0)},children:"+ Add Staff"})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(s.j,{children:[(0,d.jsxs)(s.oz,{active:"all"===t,onClick:()=>a("all"),children:["All Staff (",te.total,")"]}),(0,d.jsxs)(s.oz,{active:"restaurant"===t,onClick:()=>a("restaurant"),children:["Restaurant Staff (",te.restaurant,")"]}),(0,d.jsxs)(s.oz,{active:"company"===t,onClick:()=>a("company"),children:["Company Staff (",te.company,")"]}),(0,d.jsxs)(s.oz,{active:"freelancer"===t,onClick:()=>a("freelancer"),children:["Freelancers (",te.freelancer,")"]})]}),(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{color:"#059669",children:[(0,d.jsx)(s.Os,{children:te.total}),(0,d.jsx)(s.v0,{children:"Total Staff"}),(0,d.jsx)(h,{children:"Across all categories"})]}),(0,d.jsxs)(s.hI,{color:"#7C3AED",children:[(0,d.jsx)(s.Os,{children:te.active}),(0,d.jsx)(s.v0,{children:"Active Staff"}),(0,d.jsxs)(h,{children:[Math.round(te.active/te.total*100),"% of total"]})]}),(0,d.jsxs)(s.hI,{color:"#2563EB",children:[(0,d.jsx)(s.Os,{children:te.restaurant}),(0,d.jsx)(s.v0,{children:"Restaurant Staff"}),(0,d.jsxs)(h,{children:["From ",ne.length," restaurants"]})]}),(0,d.jsxs)(s.hI,{color:"#DC2626",children:[(0,d.jsxs)(s.Os,{children:["RM ",te.totalSalary.toLocaleString()]}),(0,d.jsx)(s.v0,{children:"Monthly Payroll"}),(0,d.jsx)(h,{children:"Company staff only"})]})]}),(0,d.jsxs)(o.Qn,{children:[(0,d.jsx)(o.DO,{type:"text",placeholder:"Search by name or email...",value:L,onChange:e=>J(e.target.value)}),(0,d.jsxs)(o.Jt,{value:H,onChange:e=>W(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Roles"}),ie.map(e=>(0,d.jsx)("option",{value:e,children:e},e))]}),(0,d.jsxs)(o.Jt,{value:K,onChange:e=>Q(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsxs)(o.Jt,{value:q,onChange:e=>Y(e.target.value),style:{display:"all"===t||"restaurant"===t?"block":"none"},children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),ne.map(e=>(0,d.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)("span",{children:"Staff Member"}),(0,d.jsx)("span",{children:"Restaurant & Type"}),(0,d.jsx)("span",{children:"Role"}),(0,d.jsx)("span",{children:"Department"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Last Active"}),(0,d.jsx)("span",{children:"Actions"})]}),0===ee.length?(0,d.jsxs)(E,{children:[(0,d.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,d.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):ee.map(t=>{return(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(w,{type:t.type,children:(a=t.name,a.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,d.jsxs)(b,{children:[(0,d.jsx)(A,{children:t.name}),(0,d.jsx)(S,{children:t.email})]})]}),(0,d.jsx)("div",{children:t.restaurantName?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:t.restaurantName}),(0,d.jsx)(F,{type:t.type,children:t.type.replace("_"," ")})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Head Office"}),(0,d.jsx)(F,{type:t.type,children:t.type.replace("_"," ")})]})}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:t.role}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:t.department}),(0,d.jsx)(k,{status:t.status,children:t.status}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:t.lastActive}),(0,d.jsxs)(_,{children:[(0,d.jsx)(C,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(t),children:"Edit"}),(0,d.jsx)(C,{onClick:()=>(e=>{alert(`${e.name} permissions: ${e.permissions.join(", ")}`)})(t),children:"Permissions"}),"restaurant_staff"===t.type&&"Staff"===t.role&&(0,d.jsx)(C,{onClick:()=>(async t=>{if("Restaurant Admin"===t.role)return void alert(`${t.name} is already a Restaurant Admin`);if(confirm(`Promote ${t.name} to Restaurant Admin? They will be able to manage the restaurant independently.`))try{console.log(`\ud83d\udd04 Promoting ${t.name} to Restaurant Admin...`);const a=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"Restaurant Admin"})});if(a.ok){const r=await a.json();console.log("\u2705 Staff promoted successfully:",r);const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",i=await fetch("/api/users");if(i.ok){const e=await i.json(),t=await fetch(`/api/restaurants/manager/${n}`),a=t.ok?await t.json():[],r={};a.forEach(e=>{r[e.id]=e.name});const s=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==n)||!(!e.restaurant_id||!a.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role)).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?r[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});P(s)}alert(`${t.name} has been promoted to Restaurant Admin successfully!`)}else{const e=await a.json();console.error("Failed to promote staff:",e),alert("Failed to promote staff: "+(e.error||"Unknown error"))}}catch(a){console.error("Error promoting staff:",a),alert("Error promoting staff: "+a.message)}})(t),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote to Admin"})]})]},t.id);var a})]})]}),(0,d.jsx)(B,{show:G,children:(0,d.jsxs)(z,{children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(I,{children:"Add New Staff Member"}),(0,d.jsx)(D,{onClick:ae,children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Full Name"}),(0,d.jsx)(N,{type:"text",value:X.name,onChange:e=>re("name",e.target.value),placeholder:"Enter full name"})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Email"}),(0,d.jsx)(N,{type:"email",value:X.email,onChange:e=>re("email",e.target.value),placeholder:"Enter email address"})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Phone"}),(0,d.jsx)(N,{type:"text",value:X.phone,onChange:e=>re("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Staff Type"}),(0,d.jsxs)(U,{value:X.type,onChange:e=>re("type",e.target.value),children:[(0,d.jsx)("option",{value:"restaurant_staff",children:"Restaurant Staff"}),(0,d.jsx)("option",{value:"company_staff",children:"Company Staff"}),(0,d.jsx)("option",{value:"freelancer",children:"Freelancer"})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Role"}),(0,d.jsx)(N,{type:"text",value:X.role,onChange:e=>re("role",e.target.value),placeholder:"e.g. Manager, Cashier, Kitchen Head"})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Department"}),(0,d.jsx)(N,{type:"text",value:X.department,onChange:e=>re("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen"})]}),"restaurant_staff"===X.type&&(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Restaurant"}),(0,d.jsxs)(U,{value:X.restaurantId,onChange:e=>re("restaurantId",e.target.value),children:[(0,d.jsx)("option",{value:"",children:"Select Restaurant"}),ne.map(e=>(0,d.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"company_staff"===X.type&&(0,d.jsxs)($,{children:[(0,d.jsx)(M,{children:"Monthly Salary (RM)"}),(0,d.jsx)(N,{type:"number",value:X.salary,onChange:e=>re("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(f,{variant:"secondary",onClick:ae,children:"Cancel"}),(0,d.jsx)(f,{variant:"primary",onClick:async()=>{if(X.name&&X.email&&X.restaurantId)try{const t=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a={username:X.email.split("@")[0]+"_staff",email:X.email,password:"staff123",role:"Staff",full_name:X.name,restaurant_id:parseInt(X.restaurantId),manager_id:parseInt(t)};console.log("\ud83d\udd04 Creating staff user:",a);const r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(r.ok){const e=await r.json();console.log("\u2705 Staff created successfully:",e);const a=await fetch("/api/users");if(a.ok){const e=await a.json(),r=await fetch(`/api/restaurants/manager/${t}`),n=r.ok?await r.json():[],i={};n.forEach(e=>{i[e.id]=e.name});const s=e.data.filter(e=>!(!e.manager_id||e.manager_id.toString()!==t)||(!(!e.restaurant_id||!n.some(t=>t.id===e.restaurant_id))||null===e.restaurant_id&&("Manager"===e.role||"System Admin"===e.role))).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:X.phone||"+60 12-345-6789",type:e.restaurant_id?"restaurant_staff":"company_staff",role:e.role,department:e.restaurant_id?"Restaurant Operations":"Management",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),restaurantName:e.restaurant_id?i[e.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"System Admin"===e.role?["all"]:"Manager"===e.role?["restaurants","staff","reports"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});P(s)}ae(),alert("Staff member added successfully! Default password: staff123")}else{const e=await r.json();console.error("Failed to create staff:",e),alert("Failed to create staff: "+(e.error||"Unknown error"))}}catch(t){console.error("Error creating staff:",t),alert("Error creating staff: "+t.message)}else alert("Please fill in all required fields")},children:"Add Staff"})]})]})})]})})}}}]);