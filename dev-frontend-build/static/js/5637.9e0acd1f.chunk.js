"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5637],{2488:(e,a,r)=>{r.d(a,{DO:()=>c,Jt:()=>m,Qn:()=>d});var n=r(8819),t=(r(9950),r(4752)),s=r(4414);const i=t.Ay.div`
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
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
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
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
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
`,d=e=>{let{children:a,className:r,style:n,...t}=e;return(0,s.jsx)(i,{className:r,style:n,...t,children:a})},c=e=>{let{placeholder:a="Search...",...r}=e;return(0,s.jsx)(o,{placeholder:a,...r})},m=e=>{let{children:a,...r}=e;return(0,s.jsx)(l,{...r,children:a})}},8018:(e,a,r)=>{r.r(a),r.d(a,{default:()=>z});var n=r(8819),t=r(9950),s=r(4752),i=r(2674),o=r(1367),l=r(2488),d=r(6038),c=r(9018),m=r(8666),p=r(4414);const u=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},h=(0,s.Ay)(i.A0)`
  /* 정렬 규칙: 상태는 가운데, 금액/액션은 우측 */
  & > span:nth-child(5) { text-align: center; } /* Status */
  & > span:nth-child(6) { text-align: right; } /* Salary */
  & > span:nth-child(7) { text-align: right; } /* Actions */

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
`,x=(0,s.Ay)(i.Hj)`
  /* 정렬 규칙: 상태는 가운데, 금액/액션은 우측 */
  & > div:nth-child(3) { text-align: center; } /* Status (MobileGrid 내부) */

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
`,f=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,g=s.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":return"#DC2626";case"Restaurant Admin":return"#059669";case"Staff":return"#7C3AED";case"Foodcourt Manager":return"#D97706";case"Foodcourt General":return"#EA580C";case"Brand Manager":return"#2563EB";case"Brand General":return"#1D4ED8";default:return"#6B7280"}}};

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`,y=s.Ay.div``,j=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,v=s.Ay.div`
  font-size: 12px;
  color: #6B7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,w=s.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
  max-width: 100%;
  word-wrap: break-word;
  background: ${e=>{switch(e.role){case"System Admin":return"#FEE2E2";case"Restaurant Admin":return"#ECFDF5";case"Staff":return"#EDE9FE";case"Foodcourt Manager":return"#FEF3C7";case"Foodcourt General":return"#FED7AA";case"Brand Manager":return"#DBEAFE";case"Brand General":return"#BFDBFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":return"#DC2626";case"Restaurant Admin":return"#059669";case"Staff":return"#7C3AED";case"Foodcourt Manager":return"#D97706";case"Foodcourt General":return"#EA580C";case"Brand Manager":return"#2563EB";case"Brand General":return"#1D4ED8";default:return"#6B7280"}}};

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
  }
`,S=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":return"#DC2626";default:return"#6B7280"}}};

  @media (max-width: 768px) {
    font-size: 10px;
    padding: 4px 10px;
  }
`,A=s.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,C=s.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,b=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin-bottom: 8px;
`,F=s.Ay.input`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }
`,k=s.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
    cursor: not-allowed;
  }
`,E=(0,s.Ay)(F)`
  width: 100%;
`,_=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,B=s.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,R=s.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,$=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,M=s.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,P=s.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,z=()=>{var e,a,r,n;(0,o.As)();const{operationSettings:s}=(0,c.Pj)(),[z,N]=(0,t.useState)("all"),[D,I]=(0,t.useState)([]),[O,H]=(0,t.useState)(""),[U,G]=(0,t.useState)("all"),[L,T]=(0,t.useState)("all"),[J,q]=(0,t.useState)("all"),[W,Q]=(0,t.useState)([]),[K,X]=(0,t.useState)(""),[Y,V]=(0,t.useState)([]),[Z,ee]=(0,t.useState)(!1),[ae,re]=(0,t.useState)(null),[ne,te]=(0,t.useState)(""),[se,ie]=(0,t.useState)([]),[oe,le]=(0,t.useState)(!1),[de,ce]=(0,t.useState)(null),[me,pe]=(0,t.useState)(!1),[ue,he]=(0,t.useState)(!1),[xe,fe]=(0,t.useState)(!1),[ge,ye]=(0,t.useState)(null),[je,ve]=(0,t.useState)(null),[we,Se]=(0,t.useState)([]),[Ae,Ce]=(0,t.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""}),[be,Fe]=(0,t.useState)(""),[ke,Ee]=(0,t.useState)(!1),[_e,Be]=(0,t.useState)("");(0,t.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:u()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const r=await fetch("/api/restaurants",{headers:u()}),n=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",n),Array.isArray(n)&&Q(n);const t={};Array.isArray(n)&&n.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const s=(a.data||a).map(e=>{var a;let r,n,s="Purple Here";if("System Admin"===e.role)r="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var i,o;if(e.restaurant_id)r="restaurant_staff",n=e.restaurant_name||(null===(i=t[e.restaurant_id])||void 0===i?void 0:i.name)||"Unknown Restaurant",s=(null===(o=t[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else r="our_staff"}else r="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:r,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:n,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Admin] Transformed all staff data:",s),I(s)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const Re=D.filter(e=>{if("all"!==z)if("Managers"===z){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==z)return!1;return!!(!O||e.name.toLowerCase().includes(O.toLowerCase())||e.email.toLowerCase().includes(O.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(O.toLowerCase()))&&(("all"===U||e.role===U)&&(("all"===L||e.status===L)&&("all"===J||e.restaurantId===J)))}),$e=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],Me={total:D.length,systemAdmin:D.filter(e=>"System Admin"===e.role).length,restaurantAdmin:D.filter(e=>"Restaurant Admin"===e.role).length,staff:D.filter(e=>"Staff"===e.role).length,managers:D.filter(e=>$e.includes(e.role)).length,active:D.filter(e=>"active"===e.status).length,totalSalary:D.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},Pe=()=>{pe(!1),Fe(""),re(null),X(""),Ce({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""})},ze=(e,a)=>{Ce(r=>{const n={...r,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":n.type="restaurant_staff";break;case"System Admin":n.type="our_staff";break;default:n.type="company_staff"}return n}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(re(null),X(""),V([]),ee(!1))},Ne=()=>{fe(!1),ve(null),Se([])},[De,Ie]=(0,t.useState)(!1),[Oe,He]=(0,t.useState)(null),[Ue,Ge]=(0,t.useState)(!1),[Le,Te]=(0,t.useState)(null),[Je,qe]=(0,t.useState)(null),We=()=>{Ie(!1),He(null)},Qe=()=>{he(!1),ye(null)},Ke=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},Xe=Array.from(new Map(D.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),Ye=Array.from(new Set(D.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:"Staff Management"}),(0,p.jsxs)(i.ex,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const r=e[a];return"string"===typeof r&&(r.includes(",")||r.includes('"')||r.includes("\n"))?`"${r.replace(/"/g,'""')}"`:r||""}).join(","))].join("\n")})(Re.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,d.vv)(e.salary,s.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(a),n=document.createElement("a");n.href=r,n.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(r)},children:"Export"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>{pe(!0)},children:"Add Staff"})]})]}),(0,p.jsxs)(i.UC,{children:[(0,p.jsxs)(i.MD,{children:[(0,p.jsxs)(i.hI,{color:"#059669",children:[(0,p.jsx)(i.Os,{children:Me.total}),(0,p.jsx)(i.v0,{children:"Total Staff"}),(0,p.jsx)(i.d1,{children:"Across entire system"})]}),(0,p.jsxs)(i.hI,{color:"#2563EB",children:[(0,p.jsx)(i.Os,{children:Me.managers}),(0,p.jsx)(i.v0,{children:"Managers"}),(0,p.jsx)(i.d1,{children:"4 manager roles"})]}),(0,p.jsxs)(i.hI,{color:"#7C3AED",children:[(0,p.jsx)(i.Os,{children:Me.active}),(0,p.jsx)(i.v0,{children:"Active Staff"}),(0,p.jsxs)(i.d1,{children:[Math.round(Me.active/Me.total*100),"% of total"]})]}),(0,p.jsxs)(i.hI,{color:"#D97706",children:[(0,p.jsx)(i.Os,{children:(0,d.vv)(Me.totalSalary,s.currency)}),(0,p.jsx)(i.v0,{children:"Monthly Payroll"}),(0,p.jsx)(i.d1,{children:"All staff combined"})]})]}),(0,p.jsxs)(i.j,{children:[(0,p.jsxs)(i.oz,{active:"all"===z,onClick:()=>N("all"),children:["All Staff (",Me.total,")"]}),(0,p.jsxs)(i.oz,{active:"System Admin"===z,onClick:()=>N("System Admin"),children:["System Admin (",Me.systemAdmin||0,")"]}),(0,p.jsxs)(i.oz,{active:"Managers"===z,onClick:()=>N("Managers"),children:["Managers (",Me.managers||0,")"]}),(0,p.jsxs)(i.oz,{active:"Restaurant Admin"===z,onClick:()=>N("Restaurant Admin"),children:["Restaurant Admin (",Me.restaurantAdmin||0,")"]}),(0,p.jsxs)(i.oz,{active:"Staff"===z,onClick:()=>N("Staff"),children:["Staff (",Me.staff||0,")"]})]}),(0,p.jsxs)(l.Qn,{children:[(0,p.jsx)(l.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:O,onChange:e=>H(e.target.value)}),(0,p.jsxs)(l.Jt,{value:U,onChange:e=>G(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),Ye.map(e=>(0,p.jsx)("option",{value:e,children:e},e))]}),(0,p.jsxs)(l.Jt,{value:L,onChange:e=>T(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,p.jsxs)(l.Jt,{value:J,onChange:e=>q(e.target.value),style:{display:"all"===z||"Restaurant Admin"===z||"Staff"===z?"block":"none"},children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),Xe.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsxs)(i.XI,{children:[(0,p.jsxs)(h,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,p.jsx)("span",{children:"Staff Member"}),(0,p.jsx)("span",{children:"Company & Location"}),(0,p.jsx)("span",{children:"Role"}),(0,p.jsx)("span",{children:"Department"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Salary"}),(0,p.jsx)("span",{children:"Actions"})]}),0===Re.length?(0,p.jsxs)(i.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):Re.map(e=>(0,p.jsxs)(x,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(g,{role:e.role,children:Ke(e.name)}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:e.name}),(0,p.jsx)(v,{children:e.email})]})]}),(0,p.jsxs)(i.Np,{children:[(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Company & Location"}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Role"}),(0,p.jsx)(w,{role:e.role,children:e.role})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Department"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Status"}),(0,p.jsx)(S,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Salary"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,d.vv)(e.salary,s.currency):"N/A"})]})]}),(0,p.jsxs)(i.wr,{children:[(0,p.jsx)(i.rA,{onClick:()=>(e=>{if(ye(e),e.restaurantId){const a=W.find(a=>a.id===e.restaurantId);a&&(te(a.name),ce(a))}else te(""),ce(null);he(!0)})(e),children:"Edit"}),(0,p.jsx)(i.K0,{onClick:()=>(e=>{qe(e),Te("toggle"),Ge(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,p.jsx)(A,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,p.jsx)(i.K0,{onClick:()=>(e=>{qe(e),Te("resetPassword"),Ge(!0)})(e),title:"Reset Password",children:(0,p.jsx)(A,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,p.jsx)(i.K0,{onClick:()=>(async e=>{He(e),Ie(!0)})(e),title:"Delete Staff",children:(0,p.jsx)(A,{children:"\xd7"})})]})]},e.id))]})]}),(0,p.jsx)(i.mH,{show:me,onClick:Pe,children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Add Staff"}),(0,p.jsx)(i.Jn,{onClick:Pe,children:"\xd7"})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Role *"}),(0,p.jsxs)(k,{value:Ae.role,onChange:e=>ze("role",e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Select Role"}),(0,p.jsx)("option",{value:"Staff",children:"Staff"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,p.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,p.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,p.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),"Restaurant Admin"===Ae.role&&(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"8px",fontSize:"13px",color:"#92400E",lineHeight:"1.5"},children:[(0,p.jsx)("strong",{children:"Note:"})," Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page > Add Restaurant). Creating one here will require manually assigning a restaurant afterwards."]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Staff ID (Username) *"}),(0,p.jsx)(F,{type:"text",value:Ae.username,onChange:e=>ze("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:"\u2139\ufe0f A strong password will be auto-generated and shown after creation"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Full Name *"}),(0,p.jsx)(F,{type:"text",value:Ae.name,onChange:e=>ze("name",e.target.value),placeholder:"Enter full name"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Email *"}),(0,p.jsx)(F,{type:"email",value:Ae.email,onChange:e=>ze("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Phone"}),(0,p.jsx)(m.A,{value:Ae.phone,onChange:e=>ze("phone",e)})]}),("foodcourt_manager"===Ae.role||"foodcourt_general"===Ae.role||"brand_manager"===Ae.role||"brand_general"===Ae.role)&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Company Name"}),(0,p.jsx)(F,{type:"text",value:Ae.companyName||"",onChange:e=>ze("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===Ae.role||"Staff"===Ae.role)&&(0,p.jsxs)(i.gE,{style:{position:"relative"},children:[(0,p.jsx)(b,{children:"Restaurant *"}),(0,p.jsx)(E,{type:"text",value:K,onChange:e=>(e=>{if(X(e),ee(!0),e.length<1)return void V(W.slice(0,10));const a=W.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));V(a.slice(0,10))})(e.target.value),onFocus:()=>{ee(!0),0===K.length&&V(W.slice(0,10))},onBlur:()=>setTimeout(()=>ee(!1),200),placeholder:"Type to search for restaurants"}),Z&&Y.length>0&&(0,p.jsx)(_,{children:Y.map(e=>(0,p.jsxs)(B,{onClick:()=>(e=>{re(e),X(e.name),ee(!1),Ce(a=>({...a,restaurantId:e.id}))})(e),children:[(0,p.jsx)(R,{children:e.name}),(0,p.jsx)($,{children:e.address||"No address provided"})]},e.id))}),ae&&(0,p.jsxs)(M,{children:["\u2713 Selected: ",(0,p.jsx)("strong",{children:ae.name})]})]}),"System Admin"===Ae.role&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Company Name"}),(0,p.jsx)(F,{type:"text",value:Ae.companyName||"",onChange:e=>ze("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Department"}),(0,p.jsx)(F,{type:"text",value:Ae.department,onChange:e=>ze("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Ae.role||"Staff"===Ae.role)&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"PIN Code (4 digits)"}),(0,p.jsx)(F,{type:"text",inputMode:"numeric",maxLength:4,value:Ae.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ze("pin_code",a)},placeholder:"e.g. 1234",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Monthly Salary (RM)"}),(0,p.jsx)(F,{type:"number",value:Ae.salary,onChange:e=>ze("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),be&&(0,p.jsx)(P,{style:{marginTop:"16px"},children:be}),(0,p.jsxs)(i.jl,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Pe,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Fe(""),!Ae.role)return void Fe("Role selection is required");if(!Ae.username||""===Ae.username.trim())return void Fe("Staff ID (Username) is required");if(!Ae.name||""===Ae.name.trim())return void Fe("Full Name is required");if(!Ae.email||""===Ae.email.trim())return void Fe("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Ae.email))if("Restaurant Admin"!==Ae.role&&"Staff"!==Ae.role||ae||Ae.restaurantId)try{const e={username:Ae.username.trim(),email:Ae.email.trim(),role:Ae.role,full_name:Ae.name.trim(),phone:Ae.phone?Ae.phone.trim():null,department:Ae.department?Ae.department.trim():null,company_name:Ae.companyName?Ae.companyName.trim():null,restaurant_id:Ae.restaurantId?parseInt(Ae.restaurantId):null,manager_id:null};Ae.pin_code&&4===Ae.pin_code.length&&(e.pin_code=Ae.pin_code),console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:u(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void Fe(e.error||"Failed to create staff. Please try again.")}const r=await a.json();console.log("\u2705 [Admin] Staff created successfully:",r),Pe();const n=r.generatedPassword||"(check with admin)";Be(`Staff member created successfully!\n\nUsername: ${Ae.username}\nPassword: ${n}\n\nPlease save this information and share it securely with the staff member.`),Ee(!0);const t=await fetch("/api/users",{headers:u()});if(t.ok){const e=await t.json(),a=await fetch("/api/restaurants",{headers:u()}),r=a.ok?await a.json():[],n={};Array.isArray(r)&&r.forEach(e=>{n[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const s=e.data||e;if(!Array.isArray(s))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const i=s.map(e=>{var a;let r,t,s="OrderHere";if("System Admin"===e.role)r="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){r="restaurant_staff";const a=n[e.restaurant_id];t=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",s=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else r="our_staff";else r="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:r,role:e.role,department:e.department||"",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});I(i)}}catch(e){console.error("Error creating staff:",e),Fe("An error occurred while creating staff. Please try again.")}else Fe("Please select a restaurant for Restaurant Admin and Staff roles");else Fe("Please enter a valid email address")},disabled:!Ae.name.trim()||!Ae.username.trim()||!Ae.email.trim(),children:"Add Staff"})]})]})}),(0,p.jsx)(i.mH,{show:ue,onClick:Qe,children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Edit Staff Member"}),(0,p.jsx)(i.Jn,{onClick:Qe,children:"\xd7"})]}),ge&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Role *"}),(0,p.jsxs)(k,{value:ge.role,onChange:e=>ye({...ge,role:e.target.value}),children:[(0,p.jsx)("option",{value:"",children:"Select Role"}),(0,p.jsx)("option",{value:"Staff",children:"Staff"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,p.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,p.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,p.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Staff ID (Username)"}),(0,p.jsx)(F,{type:"text",value:ge.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Full Name *"}),(0,p.jsx)(F,{type:"text",value:ge.name,onChange:e=>ye({...ge,name:e.target.value}),placeholder:"Enter full name"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Email *"}),(0,p.jsx)(F,{type:"email",value:ge.email,onChange:e=>ye({...ge,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Phone"}),(0,p.jsx)(m.A,{value:ge.phone,onChange:e=>ye({...ge,phone:e})})]}),"Manager"===ge.role&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Company Name"}),(0,p.jsx)(F,{type:"text",value:ge.companyName||"",onChange:e=>ye({...ge,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===ge.role||"Staff"===ge.role)&&(0,p.jsxs)(i.gE,{style:{position:"relative"},children:[(0,p.jsx)(b,{children:"Restaurant"}),(0,p.jsx)(E,{type:"text",value:ne,onChange:e=>(e=>{if(te(e),le(!0),e.length<1)return void ie(W.slice(0,10));const a=W.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));ie(a.slice(0,10))})(e.target.value),onFocus:()=>{le(!0),0===ne.length&&ie(W.slice(0,10))},onBlur:()=>setTimeout(()=>le(!1),200),placeholder:"Type to search for restaurants"}),oe&&se.length>0&&(0,p.jsx)(_,{children:se.map(e=>(0,p.jsxs)(B,{onClick:()=>(e=>{ce(e),te(e.name),le(!1),ye(a=>({...a,restaurantId:e.id}))})(e),children:[(0,p.jsx)(R,{children:e.name}),(0,p.jsx)($,{children:e.address||"No address provided"})]},e.id))}),de&&(0,p.jsxs)(M,{children:["\u2713 Selected: ",(0,p.jsx)("strong",{children:de.name})]})]}),"System Admin"===ge.role&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Company Name"}),(0,p.jsx)(F,{type:"text",value:ge.companyName||"",onChange:e=>ye({...ge,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Department"}),(0,p.jsx)(F,{type:"text",value:ge.department,onChange:e=>ye({...ge,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===ge.role||"Staff"===ge.role)&&(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"PIN Code (4 digits)"}),(0,p.jsx)(F,{type:"text",inputMode:"numeric",maxLength:4,value:ge.pin_code||"",onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ye({...ge,pin_code:a})},placeholder:ge.pin_code?"****":"Enter PIN",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]}),(0,p.jsxs)(i.gE,{children:[(0,p.jsx)(b,{children:"Monthly Salary (RM)"}),(0,p.jsx)(F,{type:"number",value:(null===(e=ge.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>ye({...ge,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]}),(0,p.jsxs)(i.jl,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Qe,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(!ge)return;if(!ge.name||""===ge.name.trim())return void alert("Full Name is required");if(!ge.email||""===ge.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ge.email))if(ge.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",ge);const e={full_name:ge.name.trim(),email:ge.email.trim(),role:ge.role,department:ge.department?ge.department.trim():null,phone:ge.phone?ge.phone.trim():null};ge.pin_code&&4===ge.pin_code.length&&(e.pin_code=ge.pin_code),console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${ge.id}`,{method:"PUT",headers:u(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const r=await a.json();console.log("\u2705 [Admin] Update successful:",r),he(!1),ye(null);const n=await fetch(`/api/users/${ge.id}`,{headers:u()});if(n.ok){const e=await n.json(),a=e.data||e,r=await fetch("/api/restaurants",{headers:u()}),t=r.ok?await r.json():[],s={};let i;Array.isArray(t)&&t.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";I(e=>e.map(e=>e.id===ge.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,pin_code:a.pin_code||null,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},disabled:!(null!==ge&&void 0!==ge&&null!==(a=ge.name)&&void 0!==a&&a.trim())||!(null!==ge&&void 0!==ge&&null!==(r=ge.username)&&void 0!==r&&r.trim())||!(null!==ge&&void 0!==ge&&null!==(n=ge.email)&&void 0!==n&&n.trim()),children:"Update Staff"})]})]})]})}),(0,p.jsx)(i.mH,{show:xe,onClick:Ne,children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Permission Management"}),(0,p.jsx)(i.Jn,{onClick:Ne,children:"\xd7"})]}),je&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginBottom:"24px"},children:(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(g,{role:je.role,children:Ke(je.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:je.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[je.role," - ",je.companyName]})]})]})}),(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,p.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,p.jsxs)("div",{onClick:()=>{je&&(ve({...je,role:e.role}),Se(e.permissions))},style:{padding:"16px",backgroundColor:(null===je||void 0===je?void 0:je.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===je||void 0===je?void 0:je.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,p.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===je||void 0===je?void 0:je.role)===e.role&&(0,p.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,p.jsx)("strong",{children:"Included Permissions:"}),(0,p.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]}),(0,p.jsxs)(i.jl,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Ne,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(je)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",je.id,"New role:",je.role);const e=await fetch(`/api/users/${je.id}`,{method:"PUT",headers:u(),body:JSON.stringify({role:je.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),fe(!1),ve(null);const r=await fetch(`/api/users/${je.id}`,{headers:u()});if(r.ok){const e=await r.json(),a=e.data||e,n=await fetch("/api/restaurants",{headers:u()}),t=n.ok?await n.json():[],s={};let i;Array.isArray(t)&&t.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";I(e=>e.map(e=>e.id===je.id?{...e,role:a.role,permissions:we,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:"Change Role"})]})]})]})}),(0,p.jsx)(i.mH,{show:De,onClick:We,children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Delete Staff"}),(0,p.jsx)(i.Jn,{onClick:We,children:"\xd7"})]}),Oe&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(g,{role:Oe.role,children:Ke(Oe.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Oe.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Oe.role," - ",Oe.companyName]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0\ufe0f"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.4"},children:"\uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc9c1\uc6d0\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\uac00 \uc601\uad6c\uc801\uc73c\ub85c \uc0ad\uc81c\ub429\ub2c8\ub2e4."})]})]}),(0,p.jsxs)(i.jl,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:We,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Oe){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${Oe.name}...`);(await fetch(`/api/users/${Oe.id}`,{method:"DELETE",headers:u()})).ok?I(e=>e.filter(e=>e.id!==Oe.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}Ie(!1),He(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete"})]})]})]})}),Ue&&(0,p.jsx)(i.mH,{show:Ue,onClick:()=>Ge(!1),children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Confirm Action"}),(0,p.jsx)(i.Jn,{onClick:()=>Ge(!1),children:"\xd7"})]}),Je&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(g,{role:Je.role,children:Ke(Je.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Je.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Je.role," - ",Je.companyName]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Le&&("active"===Je.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Le&&"Reset Password?"]}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Le&&`This will ${"active"===Je.status?"deactivate":"activate"} ${Je.name}'s account.`,"resetPassword"===Le&&`This will reset ${Je.name}'s password. A new strong password will be generated.`]})]})]}),(0,p.jsxs)(i.jl,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>Ge(!1),children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Je&&Le){try{if("toggle"===Le){const e="active"===Je.status?"inactive":"active",a=await fetch(`/api/users/${Je.id}`,{method:"PUT",headers:u(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}I(a=>a.map(a=>a.id===Je.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Le){const e=await fetch(`/api/users/${Je.id}/reset-password`,{method:"POST",headers:u()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=(await e.json()).tempPassword||"(check with admin)";Be(`Password reset successfully!\n\nUsername: ${Je.username||Je.email}\nNew Password: ${a}\n\nPlease save this information and share it securely with the staff member.`),Ee(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Ge(!1),qe(null),Te(null)}},children:"toggle"===Le?"Confirm":"Reset Password"})]})]})]})}),ke&&(0,p.jsx)(i.mH,{show:ke,onClick:()=>Ee(!1),children:(0,p.jsxs)(i.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(i.rQ,{children:[(0,p.jsx)(i.wt,{children:"Success"}),(0,p.jsx)(i.Jn,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,p.jsx)("div",{style:{marginBottom:"24px"},children:(0,p.jsx)("div",{style:{padding:"20px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #10B981"},children:(0,p.jsx)("div",{style:{fontSize:"14px",color:"#047857",whiteSpace:"pre-line",lineHeight:"1.8",fontFamily:"monospace"},children:_e})})}),(0,p.jsx)(i.jl,{children:(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>Ee(!1),children:"OK"})})]})})]})})}}}]);