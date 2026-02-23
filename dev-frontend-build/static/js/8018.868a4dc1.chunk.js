"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,a,n)=>{n.d(a,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var r=n(4752),t=n(4414);const i=r.Ay.div`
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
`,l=e=>{let{children:a,className:n,style:r,...s}=e;return(0,t.jsx)(i,{className:n,style:r,...s,children:a})},d=e=>{let{placeholder:a="Search...",...n}=e;return(0,t.jsx)(s,{placeholder:a,...n})},c=e=>{let{children:a,...n}=e;return(0,t.jsx)(o,{...n,children:a})}},8018:(e,a,n)=>{n.r(a),n.d(a,{default:()=>H});var r=n(9950),t=n(4752),i=n(3310),s=n(2674),o=n(1367),l=n(2488),d=n(6038),c=n(9018),p=n(8666),m=n(4414);const u=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},h=(0,t.Ay)(s.A0)`
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
`,x=(0,t.Ay)(s.Hj)`
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
`,f=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,g=t.Ay.div`
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
`,y=t.Ay.div``,j=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,v=t.Ay.div`
  font-size: 12px;
  color: #6B7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,w=t.Ay.span`
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
`,A=t.Ay.span`
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
`,S=t.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,C=t.Ay.div`
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
`,b=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,F=t.Ay.div`
  padding: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -32px -32px 24px -32px;
`,k=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,B=t.Ay.button`
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
`,E=t.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,_=t.Ay.div`
  display: flex;
  flex-direction: column;
`,R=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,M=t.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=t.Ay.select`
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
`,z=(0,t.Ay)(M)`
  width: 100%;
`,N=t.Ay.div`
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
`,I=t.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,$=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=t.Ay.div`
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
`,U=t.Ay.div`
  padding: 24px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin: 24px -32px -32px -32px;
`,G=t.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,H=()=>{var e;(0,o.As)();const{operationSettings:a}=(0,c.Pj)(),[n,t]=(0,r.useState)("all"),[H,T]=(0,r.useState)([]),[L,q]=(0,r.useState)(""),[W,J]=(0,r.useState)("all"),[K,Q]=(0,r.useState)("all"),[X,Y]=(0,r.useState)("all"),[V,Z]=(0,r.useState)([]),[ee,ae]=(0,r.useState)(""),[ne,re]=(0,r.useState)([]),[te,ie]=(0,r.useState)(!1),[se,oe]=(0,r.useState)(null),[le,de]=(0,r.useState)(""),[ce,pe]=(0,r.useState)([]),[me,ue]=(0,r.useState)(!1),[he,xe]=(0,r.useState)(null),[fe,ge]=(0,r.useState)(!1),[ye,je]=(0,r.useState)(!1),[ve,we]=(0,r.useState)(!1),[Ae,Se]=(0,r.useState)(null),[Ce,be]=(0,r.useState)(null),[Fe,ke]=(0,r.useState)([]),[Be,Ee]=(0,r.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""}),[_e,Re]=(0,r.useState)(""),[Me,Pe]=(0,r.useState)(!1),[ze,Ne]=(0,r.useState)("");(0,r.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:u()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const n=await fetch("/api/restaurants",{headers:u()}),r=n.ok?await n.json():[];console.log("\ud83c\udfea All restaurants data:",r),Array.isArray(r)&&Z(r);const t={};Array.isArray(r)&&r.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const i=(a.data||a).map(e=>{var a;let n,r,i="Purple Here";if("System Admin"===e.role)n="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))n="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var s,o;if(e.restaurant_id)n="restaurant_staff",r=e.restaurant_name||(null===(s=t[e.restaurant_id])||void 0===s?void 0:s.name)||"Unknown Restaurant",i=(null===(o=t[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else n="our_staff"}else n="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:n,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:r,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Admin] Transformed all staff data:",i),T(i)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const De=H.filter(e=>{if("all"!==n)if("Managers"===n){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==n)return!1;return!!(!L||e.name.toLowerCase().includes(L.toLowerCase())||e.email.toLowerCase().includes(L.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(L.toLowerCase()))&&(("all"===W||e.role===W)&&(("all"===K||e.status===K)&&("all"===X||e.restaurantId===X)))}),Ie=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],$e={total:H.length,systemAdmin:H.filter(e=>"System Admin"===e.role).length,restaurantAdmin:H.filter(e=>"Restaurant Admin"===e.role).length,staff:H.filter(e=>"Staff"===e.role).length,managers:H.filter(e=>Ie.includes(e.role)).length,active:H.filter(e=>"active"===e.status).length,totalSalary:H.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},Oe=()=>{ge(!1),Re(""),oe(null),ae(""),Ee({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""})},Ue=(e,a)=>{Ee(n=>{const r={...n,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":r.type="restaurant_staff";break;case"System Admin":r.type="our_staff";break;default:r.type="company_staff"}return r}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(oe(null),ae(""),re([]),ie(!1))},Ge=()=>{we(!1),be(null),ke([])},[He,Te]=(0,r.useState)(!1),[Le,qe]=(0,r.useState)(null),[We,Je]=(0,r.useState)(!1),[Ke,Qe]=(0,r.useState)(null),[Xe,Ye]=(0,r.useState)(null),Ve=()=>{Te(!1),qe(null)},Ze=()=>{je(!1),Se(null)},ea=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},aa=Array.from(new Map(H.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),na=Array.from(new Set(H.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,m.jsx)(i.A,{children:(0,m.jsxs)(s.mc,{children:[(0,m.jsxs)(s.Y9,{children:[(0,m.jsx)(s.hE,{children:"Staff Management"}),(0,m.jsxs)(s.ex,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(De.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,d.vv)(e.salary,a.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),n=new Blob([e],{type:"text/csv;charset=utf-8;"}),r=URL.createObjectURL(n),t=document.createElement("a");t.href=r,t.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(r)},children:"Export"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{ge(!0)},children:"Add Staff"})]})]}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(s.MD,{children:[(0,m.jsxs)(s.hI,{color:"#059669",children:[(0,m.jsx)(s.Os,{children:$e.total}),(0,m.jsx)(s.v0,{children:"Total Staff"}),(0,m.jsx)(s.d1,{children:"Across entire system"})]}),(0,m.jsxs)(s.hI,{color:"#2563EB",children:[(0,m.jsx)(s.Os,{children:$e.managers}),(0,m.jsx)(s.v0,{children:"Managers"}),(0,m.jsx)(s.d1,{children:"4 manager roles"})]}),(0,m.jsxs)(s.hI,{color:"#7C3AED",children:[(0,m.jsx)(s.Os,{children:$e.active}),(0,m.jsx)(s.v0,{children:"Active Staff"}),(0,m.jsxs)(s.d1,{children:[Math.round($e.active/$e.total*100),"% of total"]})]}),(0,m.jsxs)(s.hI,{color:"#D97706",children:[(0,m.jsx)(s.Os,{children:(0,d.vv)($e.totalSalary,a.currency)}),(0,m.jsx)(s.v0,{children:"Monthly Payroll"}),(0,m.jsx)(s.d1,{children:"All staff combined"})]})]}),(0,m.jsxs)(s.j,{children:[(0,m.jsxs)(s.oz,{active:"all"===n,onClick:()=>t("all"),children:["All Staff (",$e.total,")"]}),(0,m.jsxs)(s.oz,{active:"System Admin"===n,onClick:()=>t("System Admin"),children:["System Admin (",$e.systemAdmin||0,")"]}),(0,m.jsxs)(s.oz,{active:"Managers"===n,onClick:()=>t("Managers"),children:["Managers (",$e.managers||0,")"]}),(0,m.jsxs)(s.oz,{active:"Restaurant Admin"===n,onClick:()=>t("Restaurant Admin"),children:["Restaurant Admin (",$e.restaurantAdmin||0,")"]}),(0,m.jsxs)(s.oz,{active:"Staff"===n,onClick:()=>t("Staff"),children:["Staff (",$e.staff||0,")"]})]}),(0,m.jsxs)(l.Qn,{children:[(0,m.jsx)(l.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:L,onChange:e=>q(e.target.value)}),(0,m.jsxs)(l.Jt,{value:W,onChange:e=>J(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Roles"}),na.map(e=>(0,m.jsx)("option",{value:e,children:e},e))]}),(0,m.jsxs)(l.Jt,{value:K,onChange:e=>Q(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Status"}),(0,m.jsx)("option",{value:"active",children:"Active"}),(0,m.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,m.jsxs)(l.Jt,{value:X,onChange:e=>Y(e.target.value),style:{display:"all"===n||"Restaurant Admin"===n||"Staff"===n?"block":"none"},children:[(0,m.jsx)("option",{value:"all",children:"All Restaurants"}),aa.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,m.jsxs)(s.XI,{children:[(0,m.jsxs)(h,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,m.jsx)("span",{children:"Staff Member"}),(0,m.jsx)("span",{children:"Company & Location"}),(0,m.jsx)("span",{children:"Role"}),(0,m.jsx)("span",{children:"Department"}),(0,m.jsx)("span",{children:"Status"}),(0,m.jsx)("span",{children:"Salary"}),(0,m.jsx)("span",{children:"Actions"})]}),0===De.length?(0,m.jsxs)(s.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,m.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):De.map(e=>(0,m.jsxs)(x,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(g,{role:e.role,children:ea(e.name)}),(0,m.jsxs)(y,{children:[(0,m.jsx)(j,{children:e.name}),(0,m.jsx)(v,{children:e.email})]})]}),(0,m.jsxs)(s.Np,{children:[(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Company & Location"}),(0,m.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,m.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Role"}),(0,m.jsx)(w,{role:e.role,children:e.role})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Department"}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Status"}),(0,m.jsx)(A,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,m.jsxs)(s.Uj,{children:[(0,m.jsx)(s.PM,{children:"Salary"}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,d.vv)(e.salary,a.currency):"N/A"})]})]}),(0,m.jsxs)(s.wr,{children:[(0,m.jsx)(s.rA,{onClick:()=>(e=>{if(Se(e),e.restaurantId){const a=V.find(a=>a.id===e.restaurantId);a&&(de(a.name),xe(a))}else de(""),xe(null);je(!0)})(e),children:"Edit"}),(0,m.jsx)(s.K0,{onClick:()=>(e=>{Ye(e),Qe("toggle"),Je(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,m.jsx)(S,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,m.jsx)(s.K0,{onClick:()=>(e=>{Ye(e),Qe("resetPassword"),Je(!0)})(e),title:"Reset Password",children:(0,m.jsx)(S,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,m.jsx)(s.K0,{onClick:()=>(async e=>{qe(e),Te(!0)})(e),title:"Delete Staff",children:(0,m.jsx)(S,{children:"\xd7"})})]})]},e.id))]})]}),(0,m.jsx)(C,{show:fe,onClick:Oe,children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Add Staff"}),(0,m.jsx)(B,{onClick:Oe,children:"\xd7"})]}),(0,m.jsxs)(E,{children:[(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Role *"}),(0,m.jsxs)(P,{value:Be.role,onChange:e=>Ue("role",e.target.value),children:[(0,m.jsx)("option",{value:"",children:"Select Role"}),(0,m.jsx)("option",{value:"Staff",children:"Staff"}),(0,m.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,m.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,m.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,m.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,m.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,m.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),"Restaurant Admin"===Be.role&&(0,m.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"8px",fontSize:"13px",color:"#92400E",lineHeight:"1.5"},children:[(0,m.jsx)("strong",{children:"Note:"})," Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page > Add Restaurant). Creating one here will require manually assigning a restaurant afterwards."]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Staff ID (Username) *"}),(0,m.jsx)(M,{type:"text",value:Be.username,onChange:e=>Ue("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:"\u2139\ufe0f A strong password will be auto-generated and shown after creation"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Full Name *"}),(0,m.jsx)(M,{type:"text",value:Be.name,onChange:e=>Ue("name",e.target.value),placeholder:"Enter full name"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Email *"}),(0,m.jsx)(M,{type:"email",value:Be.email,onChange:e=>Ue("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Phone"}),(0,m.jsx)(p.A,{value:Be.phone,onChange:e=>Ue("phone",e)})]}),("foodcourt_manager"===Be.role||"foodcourt_general"===Be.role||"brand_manager"===Be.role||"brand_general"===Be.role)&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Company Name"}),(0,m.jsx)(M,{type:"text",value:Be.companyName||"",onChange:e=>Ue("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===Be.role||"Staff"===Be.role)&&(0,m.jsxs)(_,{style:{position:"relative"},children:[(0,m.jsx)(R,{children:"Restaurant *"}),(0,m.jsx)(z,{type:"text",value:ee,onChange:e=>(e=>{if(ae(e),ie(!0),e.length<1)return void re(V.slice(0,10));const a=V.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));re(a.slice(0,10))})(e.target.value),onFocus:()=>{ie(!0),0===ee.length&&re(V.slice(0,10))},onBlur:()=>setTimeout(()=>ie(!1),200),placeholder:"Type to search for restaurants"}),te&&ne.length>0&&(0,m.jsx)(N,{children:ne.map(e=>(0,m.jsxs)(D,{onClick:()=>(e=>{oe(e),ae(e.name),ie(!1),Ee(a=>({...a,restaurantId:e.id}))})(e),children:[(0,m.jsx)(I,{children:e.name}),(0,m.jsx)($,{children:e.address||"No address provided"})]},e.id))}),se&&(0,m.jsxs)(O,{children:["\u2713 Selected: ",(0,m.jsx)("strong",{children:se.name})]})]}),"System Admin"===Be.role&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Company Name"}),(0,m.jsx)(M,{type:"text",value:Be.companyName||"",onChange:e=>Ue("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Department"}),(0,m.jsx)(M,{type:"text",value:Be.department,onChange:e=>Ue("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Be.role||"Staff"===Be.role)&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"PIN Code (4 digits)"}),(0,m.jsx)(M,{type:"text",inputMode:"numeric",maxLength:4,value:Be.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");Ue("pin_code",a)},placeholder:"e.g. 1234",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Monthly Salary (RM)"}),(0,m.jsx)(M,{type:"number",value:Be.salary,onChange:e=>Ue("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),_e&&(0,m.jsx)(G,{style:{marginTop:"16px"},children:_e}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:Oe,children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Re(""),!Be.role)return void Re("Role selection is required");if(!Be.username||""===Be.username.trim())return void Re("Staff ID (Username) is required");if(!Be.name||""===Be.name.trim())return void Re("Full Name is required");if(!Be.email||""===Be.email.trim())return void Re("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Be.email))if("Restaurant Admin"!==Be.role&&"Staff"!==Be.role||se||Be.restaurantId)try{const e={username:Be.username.trim(),email:Be.email.trim(),role:Be.role,full_name:Be.name.trim(),phone:Be.phone?Be.phone.trim():null,department:Be.department?Be.department.trim():null,company_name:Be.companyName?Be.companyName.trim():null,restaurant_id:Be.restaurantId?parseInt(Be.restaurantId):null,manager_id:null};Be.pin_code&&4===Be.pin_code.length&&(e.pin_code=Be.pin_code),console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:u(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void Re(e.error||"Failed to create staff. Please try again.")}const n=await a.json();console.log("\u2705 [Admin] Staff created successfully:",n),Oe();const r=n.generatedPassword||"(check with admin)";Ne(`Staff member created successfully!\n\nUsername: ${Be.username}\nPassword: ${r}\n\nPlease save this information and share it securely with the staff member.`),Pe(!0);const t=await fetch("/api/users",{headers:u()});if(t.ok){const e=await t.json(),a=await fetch("/api/restaurants",{headers:u()}),n=a.ok?await a.json():[],r={};Array.isArray(n)&&n.forEach(e=>{r[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const i=e.data||e;if(!Array.isArray(i))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const s=i.map(e=>{var a;let n,t,i="OrderHere";if("System Admin"===e.role)n="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))n="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){n="restaurant_staff";const a=r[e.restaurant_id];t=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",i=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else n="our_staff";else n="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:n,role:e.role,department:e.department||"",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});T(s)}}catch(e){console.error("Error creating staff:",e),Re("An error occurred while creating staff. Please try again.")}else Re("Please select a restaurant for Restaurant Admin and Staff roles");else Re("Please enter a valid email address")},children:"Add Staff"})]})]})}),(0,m.jsx)(C,{show:ye,onClick:Ze,children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Edit Staff Member"}),(0,m.jsx)(B,{onClick:Ze,children:"\xd7"})]}),Ae&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(E,{children:[(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Role *"}),(0,m.jsxs)(P,{value:Ae.role,onChange:e=>Se({...Ae,role:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"Select Role"}),(0,m.jsx)("option",{value:"Staff",children:"Staff"}),(0,m.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,m.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,m.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,m.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,m.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,m.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Staff ID (Username)"}),(0,m.jsx)(M,{type:"text",value:Ae.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Full Name *"}),(0,m.jsx)(M,{type:"text",value:Ae.name,onChange:e=>Se({...Ae,name:e.target.value}),placeholder:"Enter full name"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Email *"}),(0,m.jsx)(M,{type:"email",value:Ae.email,onChange:e=>Se({...Ae,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Phone"}),(0,m.jsx)(p.A,{value:Ae.phone,onChange:e=>Se({...Ae,phone:e})})]}),"Manager"===Ae.role&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Company Name"}),(0,m.jsx)(M,{type:"text",value:Ae.companyName||"",onChange:e=>Se({...Ae,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===Ae.role||"Staff"===Ae.role)&&(0,m.jsxs)(_,{style:{position:"relative"},children:[(0,m.jsx)(R,{children:"Restaurant"}),(0,m.jsx)(z,{type:"text",value:le,onChange:e=>(e=>{if(de(e),ue(!0),e.length<1)return void pe(V.slice(0,10));const a=V.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));pe(a.slice(0,10))})(e.target.value),onFocus:()=>{ue(!0),0===le.length&&pe(V.slice(0,10))},onBlur:()=>setTimeout(()=>ue(!1),200),placeholder:"Type to search for restaurants"}),me&&ce.length>0&&(0,m.jsx)(N,{children:ce.map(e=>(0,m.jsxs)(D,{onClick:()=>(e=>{xe(e),de(e.name),ue(!1),Se(a=>({...a,restaurantId:e.id}))})(e),children:[(0,m.jsx)(I,{children:e.name}),(0,m.jsx)($,{children:e.address||"No address provided"})]},e.id))}),he&&(0,m.jsxs)(O,{children:["\u2713 Selected: ",(0,m.jsx)("strong",{children:he.name})]})]}),"System Admin"===Ae.role&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Company Name"}),(0,m.jsx)(M,{type:"text",value:Ae.companyName||"",onChange:e=>Se({...Ae,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Department"}),(0,m.jsx)(M,{type:"text",value:Ae.department,onChange:e=>Se({...Ae,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Ae.role||"Staff"===Ae.role)&&(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"PIN Code (4 digits)"}),(0,m.jsx)(M,{type:"text",inputMode:"numeric",maxLength:4,value:Ae.pin_code||"",onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");Se({...Ae,pin_code:a})},placeholder:Ae.pin_code?"****":"Enter PIN",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(R,{children:"Monthly Salary (RM)"}),(0,m.jsx)(M,{type:"number",value:(null===(e=Ae.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>Se({...Ae,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:Ze,children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(!Ae)return;if(!Ae.name||""===Ae.name.trim())return void alert("Full Name is required");if(!Ae.email||""===Ae.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Ae.email))if(Ae.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",Ae);const e={full_name:Ae.name.trim(),email:Ae.email.trim(),role:Ae.role,department:Ae.department?Ae.department.trim():null,phone:Ae.phone?Ae.phone.trim():null};Ae.pin_code&&4===Ae.pin_code.length&&(e.pin_code=Ae.pin_code),console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${Ae.id}`,{method:"PUT",headers:u(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const n=await a.json();console.log("\u2705 [Admin] Update successful:",n),je(!1),Se(null);const r=await fetch(`/api/users/${Ae.id}`,{headers:u()});if(r.ok){const e=await r.json(),a=e.data||e,n=await fetch("/api/restaurants",{headers:u()}),t=n.ok?await n.json():[],i={};let s;Array.isArray(t)&&t.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";T(e=>e.map(e=>e.id===Ae.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,pin_code:a.pin_code||null,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},children:"Update Staff"})]})]})]})}),(0,m.jsx)(C,{show:ve,onClick:Ge,children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Permission Management"}),(0,m.jsx)(B,{onClick:Ge,children:"\xd7"})]}),Ce&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{style:{marginBottom:"24px"},children:(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,m.jsx)(g,{role:Ce.role,children:ea(Ce.name)}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:Ce.name}),(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Ce.role," - ",Ce.companyName]})]})]})}),(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,m.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,m.jsxs)("div",{onClick:()=>{Ce&&(be({...Ce,role:e.role}),ke(e.permissions))},style:{padding:"16px",backgroundColor:(null===Ce||void 0===Ce?void 0:Ce.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===Ce||void 0===Ce?void 0:Ce.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,m.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===Ce||void 0===Ce?void 0:Ce.role)===e.role&&(0,m.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,m.jsx)("strong",{children:"Included Permissions:"}),(0,m.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:Ge,children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Ce)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",Ce.id,"New role:",Ce.role);const e=await fetch(`/api/users/${Ce.id}`,{method:"PUT",headers:u(),body:JSON.stringify({role:Ce.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),we(!1),be(null);const n=await fetch(`/api/users/${Ce.id}`,{headers:u()});if(n.ok){const e=await n.json(),a=e.data||e,r=await fetch("/api/restaurants",{headers:u()}),t=r.ok?await r.json():[],i={};let s;Array.isArray(t)&&t.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";T(e=>e.map(e=>e.id===Ce.id?{...e,role:a.role,permissions:Fe,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:"Change Role"})]})]})]})}),(0,m.jsx)(C,{show:He,onClick:Ve,children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Delete Staff"}),(0,m.jsx)(B,{onClick:Ve,children:"\xd7"})]}),Le&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,m.jsx)(g,{role:Le.role,children:ea(Le.name)}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Le.name}),(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Le.role," - ",Le.companyName]})]})]}),(0,m.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,m.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0\ufe0f"}),(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.4"},children:"\uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc9c1\uc6d0\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\uac00 \uc601\uad6c\uc801\uc73c\ub85c \uc0ad\uc81c\ub429\ub2c8\ub2e4."})]})]}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:Ve,children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Le){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${Le.name}...`);(await fetch(`/api/users/${Le.id}`,{method:"DELETE",headers:u()})).ok?T(e=>e.filter(e=>e.id!==Le.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}Te(!1),qe(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete"})]})]})]})}),We&&(0,m.jsx)(C,{show:We,onClick:()=>Je(!1),children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Confirm Action"}),(0,m.jsx)(B,{onClick:()=>Je(!1),children:"\xd7"})]}),Xe&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,m.jsx)(g,{role:Xe.role,children:ea(Xe.name)}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Xe.name}),(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Xe.role," - ",Xe.companyName]})]})]}),(0,m.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,m.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Ke&&("active"===Xe.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Ke&&"Reset Password?"]}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Ke&&`This will ${"active"===Xe.status?"deactivate":"activate"} ${Xe.name}'s account.`,"resetPassword"===Ke&&`This will reset ${Xe.name}'s password. A new strong password will be generated.`]})]})]}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>Je(!1),children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Xe&&Ke){try{if("toggle"===Ke){const e="active"===Xe.status?"inactive":"active",a=await fetch(`/api/users/${Xe.id}`,{method:"PUT",headers:u(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}T(a=>a.map(a=>a.id===Xe.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Ke){const e=await fetch(`/api/users/${Xe.id}/reset-password`,{method:"POST",headers:u()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=(await e.json()).tempPassword||"(check with admin)";Ne(`Password reset successfully!\n\nUsername: ${Xe.username||Xe.email}\nNew Password: ${a}\n\nPlease save this information and share it securely with the staff member.`),Pe(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Je(!1),Ye(null),Qe(null)}},children:"toggle"===Ke?"Confirm":"Reset Password"})]})]})]})}),Me&&(0,m.jsx)(C,{show:Me,onClick:()=>Pe(!1),children:(0,m.jsxs)(b,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:"Success"}),(0,m.jsx)(B,{onClick:()=>Pe(!1),children:"\xd7"})]}),(0,m.jsx)("div",{style:{marginBottom:"24px"},children:(0,m.jsx)("div",{style:{padding:"20px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #10B981"},children:(0,m.jsx)("div",{style:{fontSize:"14px",color:"#047857",whiteSpace:"pre-line",lineHeight:"1.8",fontFamily:"monospace"},children:ze})})}),(0,m.jsx)(U,{children:(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>Pe(!1),children:"OK"})})]})})]})})}}}]);