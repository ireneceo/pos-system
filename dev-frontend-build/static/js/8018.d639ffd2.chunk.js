"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,a,r)=>{r.d(a,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),t=r(4414);const s=n.Ay.div`
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
`,o=n.Ay.select`
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
`,l=e=>{let{children:a,className:r,style:n,...i}=e;return(0,t.jsx)(s,{className:r,style:n,...i,children:a})},d=e=>{let{placeholder:a="Search...",...r}=e;return(0,t.jsx)(i,{placeholder:a,...r})},c=e=>{let{children:a,...r}=e;return(0,t.jsx)(o,{...r,children:a})}},8018:(e,a,r)=>{r.r(a),r.d(a,{default:()=>G});var n=r(9950),t=r(4752),s=r(3310),i=r(2674),o=r(1367),l=r(2488),d=r(6038),c=r(9018),p=r(4414);const m=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},u=(0,t.Ay)(i.A0)`
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
`,h=(0,t.Ay)(i.Hj)`
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
`,x=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,f=t.Ay.div`
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
`,g=t.Ay.div``,y=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,j=t.Ay.div`
  font-size: 12px;
  color: #6B7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,v=t.Ay.span`
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
`,w=t.Ay.span`
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
`,A=t.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,S=t.Ay.div`
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
`,C=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,b=t.Ay.div`
  padding: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -32px -32px 24px -32px;
`,F=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,k=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,B=t.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,E=t.Ay.div`
  display: flex;
  flex-direction: column;
`,_=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,R=t.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=t.Ay.select`
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

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }
`,P=(0,t.Ay)(R)`
  width: 100%;
`,z=t.Ay.div`
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
`,D=t.Ay.div`
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
`,N=t.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,$=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,I=t.Ay.div`
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
`,O=t.Ay.div`
  padding: 24px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin: 24px -32px -32px -32px;
`,U=t.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,G=()=>{var e;(0,o.As)();const{operationSettings:a}=(0,c.Pj)(),[r,t]=(0,n.useState)("all"),[G,H]=(0,n.useState)([]),[T,L]=(0,n.useState)(""),[q,W]=(0,n.useState)("all"),[J,K]=(0,n.useState)("all"),[Q,X]=(0,n.useState)("all"),[Y,V]=(0,n.useState)([]),[Z,ee]=(0,n.useState)(""),[ae,re]=(0,n.useState)([]),[ne,te]=(0,n.useState)(!1),[se,ie]=(0,n.useState)(null),[oe,le]=(0,n.useState)(""),[de,ce]=(0,n.useState)([]),[pe,me]=(0,n.useState)(!1),[ue,he]=(0,n.useState)(null),[xe,fe]=(0,n.useState)(!1),[ge,ye]=(0,n.useState)(!1),[je,ve]=(0,n.useState)(!1),[we,Ae]=(0,n.useState)(null),[Se,Ce]=(0,n.useState)(null),[be,Fe]=(0,n.useState)([]),[ke,Be]=(0,n.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:""}),[Ee,_e]=(0,n.useState)(""),[Re,Me]=(0,n.useState)(!1),[Pe,ze]=(0,n.useState)("");(0,n.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:m()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const r=await fetch("/api/restaurants",{headers:m()}),n=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",n),Array.isArray(n)&&V(n);const t={};Array.isArray(n)&&n.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const s=(a.data||a).map(e=>{var a;let r,n,s="Purple Here";if("System Admin"===e.role)r="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var i,o;if(e.restaurant_id)r="restaurant_staff",n=e.restaurant_name||(null===(i=t[e.restaurant_id])||void 0===i?void 0:i.name)||"Unknown Restaurant",s=(null===(o=t[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else r="our_staff"}else r="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:r,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:n,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Admin] Transformed all staff data:",s),H(s)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const De=G.filter(e=>{if("all"!==r)if("Managers"===r){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==r)return!1;return!!(!T||e.name.toLowerCase().includes(T.toLowerCase())||e.email.toLowerCase().includes(T.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(T.toLowerCase()))&&(("all"===q||e.role===q)&&(("all"===J||e.status===J)&&("all"===Q||e.restaurantId===Q)))}),Ne=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],$e={total:G.length,systemAdmin:G.filter(e=>"System Admin"===e.role).length,restaurantAdmin:G.filter(e=>"Restaurant Admin"===e.role).length,staff:G.filter(e=>"Staff"===e.role).length,managers:G.filter(e=>Ne.includes(e.role)).length,active:G.filter(e=>"active"===e.status).length,totalSalary:G.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},Ie=()=>{fe(!1),_e(""),ie(null),ee(""),Be({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:""})},Oe=(e,a)=>{Be(r=>{const n={...r,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":n.type="restaurant_staff";break;case"System Admin":n.type="our_staff";break;default:n.type="company_staff"}return n}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(ie(null),ee(""),re([]),te(!1))},Ue=()=>{ve(!1),Ce(null),Fe([])},[Ge,He]=(0,n.useState)(!1),[Te,Le]=(0,n.useState)(null),[qe,We]=(0,n.useState)(!1),[Je,Ke]=(0,n.useState)(null),[Qe,Xe]=(0,n.useState)(null),Ye=()=>{He(!1),Le(null)},Ve=()=>{ye(!1),Ae(null)},Ze=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},ea=Array.from(new Map(G.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),aa=Array.from(new Set(G.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,p.jsx)(s.A,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:"Staff Management"}),(0,p.jsxs)(i.ex,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const r=e[a];return"string"===typeof r&&(r.includes(",")||r.includes('"')||r.includes("\n"))?`"${r.replace(/"/g,'""')}"`:r||""}).join(","))].join("\n")})(De.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,d.vv)(e.salary,a.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),r=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(r),t=document.createElement("a");t.href=n,t.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>{fe(!0)},children:"Add Staff"})]})]}),(0,p.jsxs)(i.UC,{children:[(0,p.jsxs)(i.MD,{children:[(0,p.jsxs)(i.hI,{color:"#059669",children:[(0,p.jsx)(i.Os,{children:$e.total}),(0,p.jsx)(i.v0,{children:"Total Staff"}),(0,p.jsx)(i.d1,{children:"Across entire system"})]}),(0,p.jsxs)(i.hI,{color:"#2563EB",children:[(0,p.jsx)(i.Os,{children:$e.managers}),(0,p.jsx)(i.v0,{children:"Managers"}),(0,p.jsx)(i.d1,{children:"4 manager roles"})]}),(0,p.jsxs)(i.hI,{color:"#7C3AED",children:[(0,p.jsx)(i.Os,{children:$e.active}),(0,p.jsx)(i.v0,{children:"Active Staff"}),(0,p.jsxs)(i.d1,{children:[Math.round($e.active/$e.total*100),"% of total"]})]}),(0,p.jsxs)(i.hI,{color:"#D97706",children:[(0,p.jsx)(i.Os,{children:(0,d.vv)($e.totalSalary,a.currency)}),(0,p.jsx)(i.v0,{children:"Monthly Payroll"}),(0,p.jsx)(i.d1,{children:"All staff combined"})]})]}),(0,p.jsxs)(i.j,{children:[(0,p.jsxs)(i.oz,{active:"all"===r,onClick:()=>t("all"),children:["All Staff (",$e.total,")"]}),(0,p.jsxs)(i.oz,{active:"System Admin"===r,onClick:()=>t("System Admin"),children:["System Admin (",$e.systemAdmin||0,")"]}),(0,p.jsxs)(i.oz,{active:"Managers"===r,onClick:()=>t("Managers"),children:["Managers (",$e.managers||0,")"]}),(0,p.jsxs)(i.oz,{active:"Restaurant Admin"===r,onClick:()=>t("Restaurant Admin"),children:["Restaurant Admin (",$e.restaurantAdmin||0,")"]}),(0,p.jsxs)(i.oz,{active:"Staff"===r,onClick:()=>t("Staff"),children:["Staff (",$e.staff||0,")"]})]}),(0,p.jsxs)(l.Qn,{children:[(0,p.jsx)(l.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:T,onChange:e=>L(e.target.value)}),(0,p.jsxs)(l.Jt,{value:q,onChange:e=>W(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),aa.map(e=>(0,p.jsx)("option",{value:e,children:e},e))]}),(0,p.jsxs)(l.Jt,{value:J,onChange:e=>K(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,p.jsxs)(l.Jt,{value:Q,onChange:e=>X(e.target.value),style:{display:"all"===r||"Restaurant Admin"===r||"Staff"===r?"block":"none"},children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),ea.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsxs)(i.XI,{children:[(0,p.jsxs)(u,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,p.jsx)("span",{children:"Staff Member"}),(0,p.jsx)("span",{children:"Company & Location"}),(0,p.jsx)("span",{children:"Role"}),(0,p.jsx)("span",{children:"Department"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Salary"}),(0,p.jsx)("span",{children:"Actions"})]}),0===De.length?(0,p.jsxs)(i.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):De.map(e=>(0,p.jsxs)(h,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(f,{role:e.role,children:Ze(e.name)}),(0,p.jsxs)(g,{children:[(0,p.jsx)(y,{children:e.name}),(0,p.jsx)(j,{children:e.email})]})]}),(0,p.jsxs)(i.Np,{children:[(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Company & Location"}),(0,p.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Role"}),(0,p.jsx)(v,{role:e.role,children:e.role})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Department"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Status"}),(0,p.jsx)(w,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,p.jsxs)(i.Uj,{children:[(0,p.jsx)(i.PM,{children:"Salary"}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,d.vv)(e.salary,a.currency):"N/A"})]})]}),(0,p.jsxs)(i.wr,{children:[(0,p.jsx)(i.rA,{onClick:()=>(e=>{if(Ae(e),e.restaurantId){const a=Y.find(a=>a.id===e.restaurantId);a&&(le(a.name),he(a))}else le(""),he(null);ye(!0)})(e),children:"Edit"}),(0,p.jsx)(i.K0,{onClick:()=>(e=>{Xe(e),Ke("toggle"),We(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,p.jsx)(A,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,p.jsx)(i.K0,{onClick:()=>(e=>{Xe(e),Ke("resetPassword"),We(!0)})(e),title:"Reset Password",children:(0,p.jsx)(A,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,p.jsx)(i.K0,{onClick:()=>(async e=>{Le(e),He(!0)})(e),title:"Delete Staff",children:(0,p.jsx)(A,{children:"\xd7"})})]})]},e.id))]})]}),(0,p.jsx)(S,{show:xe,onClick:Ie,children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Add Staff"}),(0,p.jsx)(k,{onClick:Ie,children:"\xd7"})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Role *"}),(0,p.jsxs)(M,{value:ke.role,onChange:e=>Oe("role",e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Select Role"}),(0,p.jsx)("option",{value:"Staff",children:"Staff"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,p.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,p.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,p.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Staff ID (Username) *"}),(0,p.jsx)(R,{type:"text",value:ke.username,onChange:e=>Oe("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:["\u2139\ufe0f Default password: ",(0,p.jsx)("strong",{children:"1234"})," (User must change after first login)"]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Full Name *"}),(0,p.jsx)(R,{type:"text",value:ke.name,onChange:e=>Oe("name",e.target.value),placeholder:"Enter full name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Email *"}),(0,p.jsx)(R,{type:"email",value:ke.email,onChange:e=>Oe("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Phone"}),(0,p.jsx)(R,{type:"text",value:ke.phone,onChange:e=>Oe("phone",e.target.value),placeholder:"Enter phone number"})]}),("foodcourt_manager"===ke.role||"foodcourt_general"===ke.role||"brand_manager"===ke.role||"brand_general"===ke.role)&&(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Company Name"}),(0,p.jsx)(R,{type:"text",value:ke.companyName||"",onChange:e=>Oe("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===ke.role||"Staff"===ke.role)&&(0,p.jsxs)(E,{style:{position:"relative"},children:[(0,p.jsx)(_,{children:"Restaurant *"}),(0,p.jsx)(P,{type:"text",value:Z,onChange:e=>(e=>{if(ee(e),te(!0),e.length<1)return void re(Y.slice(0,10));const a=Y.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));re(a.slice(0,10))})(e.target.value),onFocus:()=>{te(!0),0===Z.length&&re(Y.slice(0,10))},onBlur:()=>setTimeout(()=>te(!1),200),placeholder:"Type to search for restaurants"}),ne&&ae.length>0&&(0,p.jsx)(z,{children:ae.map(e=>(0,p.jsxs)(D,{onClick:()=>(e=>{ie(e),ee(e.name),te(!1),Be(a=>({...a,restaurantId:e.id}))})(e),children:[(0,p.jsx)(N,{children:e.name}),(0,p.jsx)($,{children:e.address||"No address provided"})]},e.id))}),se&&(0,p.jsxs)(I,{children:["\u2713 Selected: ",(0,p.jsx)("strong",{children:se.name})]})]}),"System Admin"===ke.role&&(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Company Name"}),(0,p.jsx)(R,{type:"text",value:ke.companyName||"",onChange:e=>Oe("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Department"}),(0,p.jsx)(R,{type:"text",value:ke.department,onChange:e=>Oe("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Monthly Salary (RM)"}),(0,p.jsx)(R,{type:"number",value:ke.salary,onChange:e=>Oe("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),Ee&&(0,p.jsx)(U,{style:{marginTop:"16px"},children:Ee}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Ie,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(_e(""),!ke.role)return void _e("Role selection is required");if(!ke.username||""===ke.username.trim())return void _e("Staff ID (Username) is required");if(!ke.name||""===ke.name.trim())return void _e("Full Name is required");if(!ke.email||""===ke.email.trim())return void _e("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ke.email))if("Restaurant Admin"!==ke.role&&"Staff"!==ke.role||se||ke.restaurantId)try{const e={username:ke.username.trim(),email:ke.email.trim(),password:"1234",role:ke.role,full_name:ke.name.trim(),phone:ke.phone?ke.phone.trim():null,department:ke.department?ke.department.trim():null,company_name:ke.companyName?ke.companyName.trim():null,restaurant_id:ke.restaurantId?parseInt(ke.restaurantId):null,manager_id:null};console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:m(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void _e(e.error||"Failed to create staff. Please try again.")}const r=await a.json();console.log("\u2705 [Admin] Staff created successfully:",r),Ie(),ze(`Staff member created successfully!\n\nUsername: ${ke.username}\nDefault Password: 1234\n\nPlease save this information and share it securely with the staff member.`),Me(!0);const n=await fetch("/api/users",{headers:m()});if(n.ok){const e=await n.json(),a=await fetch("/api/restaurants",{headers:m()}),r=a.ok?await a.json():[],t={};Array.isArray(r)&&r.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const s=e.data||e;if(!Array.isArray(s))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const i=s.map(e=>{var a;let r,n,s="OrderHere";if("System Admin"===e.role)r="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){r="restaurant_staff";const a=t[e.restaurant_id];n=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",s=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else r="our_staff";else r="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:r,role:e.role,department:e.department||"",restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:n,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});H(i)}}catch(e){console.error("Error creating staff:",e),_e("An error occurred while creating staff. Please try again.")}else _e("Please select a restaurant for Restaurant Admin and Staff roles");else _e("Please enter a valid email address")},children:"Add Staff"})]})]})}),(0,p.jsx)(S,{show:ge,onClick:Ve,children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Edit Staff Member"}),(0,p.jsx)(k,{onClick:Ve,children:"\xd7"})]}),we&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Role *"}),(0,p.jsxs)(M,{value:we.role,onChange:e=>Ae({...we,role:e.target.value}),children:[(0,p.jsx)("option",{value:"",children:"Select Role"}),(0,p.jsx)("option",{value:"Staff",children:"Staff"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,p.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,p.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,p.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Staff ID (Username)"}),(0,p.jsx)(R,{type:"text",value:we.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Full Name *"}),(0,p.jsx)(R,{type:"text",value:we.name,onChange:e=>Ae({...we,name:e.target.value}),placeholder:"Enter full name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Email *"}),(0,p.jsx)(R,{type:"email",value:we.email,onChange:e=>Ae({...we,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Phone"}),(0,p.jsx)(R,{type:"text",value:we.phone,onChange:e=>Ae({...we,phone:e.target.value}),placeholder:"Enter phone number"})]}),"Manager"===we.role&&(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Company Name"}),(0,p.jsx)(R,{type:"text",value:we.companyName||"",onChange:e=>Ae({...we,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===we.role||"Staff"===we.role)&&(0,p.jsxs)(E,{style:{position:"relative"},children:[(0,p.jsx)(_,{children:"Restaurant"}),(0,p.jsx)(P,{type:"text",value:oe,onChange:e=>(e=>{if(le(e),me(!0),e.length<1)return void ce(Y.slice(0,10));const a=Y.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));ce(a.slice(0,10))})(e.target.value),onFocus:()=>{me(!0),0===oe.length&&ce(Y.slice(0,10))},onBlur:()=>setTimeout(()=>me(!1),200),placeholder:"Type to search for restaurants"}),pe&&de.length>0&&(0,p.jsx)(z,{children:de.map(e=>(0,p.jsxs)(D,{onClick:()=>(e=>{he(e),le(e.name),me(!1),Ae(a=>({...a,restaurantId:e.id}))})(e),children:[(0,p.jsx)(N,{children:e.name}),(0,p.jsx)($,{children:e.address||"No address provided"})]},e.id))}),ue&&(0,p.jsxs)(I,{children:["\u2713 Selected: ",(0,p.jsx)("strong",{children:ue.name})]})]}),"System Admin"===we.role&&(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Company Name"}),(0,p.jsx)(R,{type:"text",value:we.companyName||"",onChange:e=>Ae({...we,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Department"}),(0,p.jsx)(R,{type:"text",value:we.department,onChange:e=>Ae({...we,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(_,{children:"Monthly Salary (RM)"}),(0,p.jsx)(R,{type:"number",value:(null===(e=we.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>Ae({...we,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Ve,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(!we)return;if(!we.name||""===we.name.trim())return void alert("Full Name is required");if(!we.email||""===we.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(we.email))if(we.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",we);const e={full_name:we.name.trim(),email:we.email.trim(),role:we.role,department:we.department?we.department.trim():null,phone:we.phone?we.phone.trim():null};console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${we.id}`,{method:"PUT",headers:m(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const r=await a.json();console.log("\u2705 [Admin] Update successful:",r),ye(!1),Ae(null);const n=await fetch(`/api/users/${we.id}`,{headers:m()});if(n.ok){const e=await n.json(),a=e.data||e,r=await fetch("/api/restaurants",{headers:m()}),t=r.ok?await r.json():[],s={};let i;Array.isArray(t)&&t.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";H(e=>e.map(e=>e.id===we.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},children:"Update Staff"})]})]})]})}),(0,p.jsx)(S,{show:je,onClick:Ue,children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Permission Management"}),(0,p.jsx)(k,{onClick:Ue,children:"\xd7"})]}),Se&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{marginBottom:"24px"},children:(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(f,{role:Se.role,children:Ze(Se.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:Se.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Se.role," - ",Se.companyName]})]})]})}),(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,p.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,p.jsxs)("div",{onClick:()=>{Se&&(Ce({...Se,role:e.role}),Fe(e.permissions))},style:{padding:"16px",backgroundColor:(null===Se||void 0===Se?void 0:Se.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===Se||void 0===Se?void 0:Se.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,p.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===Se||void 0===Se?void 0:Se.role)===e.role&&(0,p.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,p.jsx)("strong",{children:"Included Permissions:"}),(0,p.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Ue,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Se)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",Se.id,"New role:",Se.role);const e=await fetch(`/api/users/${Se.id}`,{method:"PUT",headers:m(),body:JSON.stringify({role:Se.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),ve(!1),Ce(null);const r=await fetch(`/api/users/${Se.id}`,{headers:m()});if(r.ok){const e=await r.json(),a=e.data||e,n=await fetch("/api/restaurants",{headers:m()}),t=n.ok?await n.json():[],s={};let i;Array.isArray(t)&&t.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";H(e=>e.map(e=>e.id===Se.id?{...e,role:a.role,permissions:be,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:"Change Role"})]})]})]})}),(0,p.jsx)(S,{show:Ge,onClick:Ye,children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Delete Staff"}),(0,p.jsx)(k,{onClick:Ye,children:"\xd7"})]}),Te&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(f,{role:Te.role,children:Ze(Te.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Te.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Te.role," - ",Te.companyName]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0\ufe0f"}),(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.4"},children:"\uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc9c1\uc6d0\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\uac00 \uc601\uad6c\uc801\uc73c\ub85c \uc0ad\uc81c\ub429\ub2c8\ub2e4."})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:Ye,children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Te){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${Te.name}...`);(await fetch(`/api/users/${Te.id}`,{method:"DELETE",headers:m()})).ok?H(e=>e.filter(e=>e.id!==Te.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}He(!1),Le(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete"})]})]})]})}),qe&&(0,p.jsx)(S,{show:qe,onClick:()=>We(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Confirm Action"}),(0,p.jsx)(k,{onClick:()=>We(!1),children:"\xd7"})]}),Qe&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)(f,{role:Qe.role,children:Ze(Qe.name)}),(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Qe.name}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Qe.role," - ",Qe.companyName]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,p.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Je&&("active"===Qe.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Je&&"Reset Password?"]}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Je&&`This will ${"active"===Qe.status?"deactivate":"activate"} ${Qe.name}'s account.`,"resetPassword"===Je&&`This will reset ${Qe.name}'s password to the default password: 1234`]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(i.$n,{variant:"secondary",onClick:()=>We(!1),children:"Cancel"}),(0,p.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Qe&&Je){try{if("toggle"===Je){const e="active"===Qe.status?"inactive":"active",a=await fetch(`/api/users/${Qe.id}`,{method:"PUT",headers:m(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}H(a=>a.map(a=>a.id===Qe.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Je){const e=await fetch(`/api/users/${Qe.id}/reset-password`,{method:"POST",headers:m()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=(await e.json()).defaultPassword||"1234";ze(`Password reset successfully!\n\nUsername: ${Qe.username||Qe.email}\nNew Password: ${a}\n\nPlease save this information and share it securely with the staff member.`),Me(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}We(!1),Xe(null),Ke(null)}},children:"toggle"===Je?"Confirm":"Reset Password"})]})]})]})}),Re&&(0,p.jsx)(S,{show:Re,onClick:()=>Me(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(F,{children:"Success"}),(0,p.jsx)(k,{onClick:()=>Me(!1),children:"\xd7"})]}),(0,p.jsx)("div",{style:{marginBottom:"24px"},children:(0,p.jsx)("div",{style:{padding:"20px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #10B981"},children:(0,p.jsx)("div",{style:{fontSize:"14px",color:"#047857",whiteSpace:"pre-line",lineHeight:"1.8",fontFamily:"monospace"},children:Pe})})}),(0,p.jsx)(O,{children:(0,p.jsx)(i.$n,{variant:"primary",onClick:()=>Me(!1),children:"OK"})})]})})]})})}}}]);