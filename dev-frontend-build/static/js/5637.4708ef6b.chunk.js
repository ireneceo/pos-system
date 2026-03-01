"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5637],{2488:(e,a,r)=>{r.d(a,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var n=r(4752),t=r(4414);const i=n.Ay.div`
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
`,s=n.Ay.input`
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
`,l=e=>{let{children:a,className:r,style:n,...s}=e;return(0,t.jsx)(i,{className:r,style:n,...s,children:a})},d=e=>{let{placeholder:a="Search...",...r}=e;return(0,t.jsx)(s,{placeholder:a,...r})},c=e=>{let{children:a,...r}=e;return(0,t.jsx)(o,{...r,children:a})}},2597:(e,a,r)=>{r.d(a,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),t=r(4414);const i=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,s=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,o=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:a,className:r,style:n}=e;return(0,t.jsx)(i,{className:r,style:n,children:a})},d=e=>{let{active:a,onClick:r,children:n,className:i}=e;return(0,t.jsx)(s,{active:a,onClick:r,className:i,children:n})},c=e=>{let{count:a,variant:r="default",showZero:n=!1}=e;return 0!==a||n?(0,t.jsx)(o,{variant:r,children:a}):null}},2653:(e,a,r)=>{r.d(a,{M:()=>i});var n=r(9950),t=r(4492);function i(e){const[a,r]=(0,t.ok)(),i=(0,n.useCallback)(()=>a.get("tab")||e,[a,e]),[s,o]=(0,n.useState)(i());return[s,(0,n.useCallback)(e=>{o(e),r({tab:e})},[r])]}},8018:(e,a,r)=>{r.r(a),r.d(a,{default:()=>T});var n=r(9950),t=r(4752),i=r(6649),s=r(2597),o=r(2653),l=r(1367),d=r(2488),c=r(6038),p=r(9018),m=r(8666),u=r(4414);const x=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},h=(0,t.Ay)(i.A0)`
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
`,f=(0,t.Ay)(i.Hj)`
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
`,g=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,y=t.Ay.div`
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
`,j=t.Ay.div``,v=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,w=t.Ay.div`
  font-size: 12px;
  color: #6B7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,A=t.Ay.span`
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
`,S=t.Ay.span`
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
`,b=t.Ay.span`
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
`,F=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,k=t.Ay.div`
  padding: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -32px -32px 24px -32px;
`,B=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,E=t.Ay.button`
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
`,_=t.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,R=t.Ay.div`
  display: flex;
  flex-direction: column;
`,M=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,z=t.Ay.input`
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
`,N=(0,t.Ay)(z)`
  width: 100%;
`,D=t.Ay.div`
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
`,$=t.Ay.div`
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
`,O=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,U=t.Ay.div`
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
`,G=t.Ay.div`
  padding: 24px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin: 24px -32px -32px -32px;
`,H=t.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,T=()=>{var e;(0,l.As)();const{operationSettings:a}=(0,p.Pj)(),[r,t]=(0,o.M)("all"),[T,L]=(0,n.useState)([]),[q,W]=(0,n.useState)(""),[J,K]=(0,n.useState)("all"),[Z,Q]=(0,n.useState)("all"),[X,Y]=(0,n.useState)("all"),[V,ee]=(0,n.useState)([]),[ae,re]=(0,n.useState)(""),[ne,te]=(0,n.useState)([]),[ie,se]=(0,n.useState)(!1),[oe,le]=(0,n.useState)(null),[de,ce]=(0,n.useState)(""),[pe,me]=(0,n.useState)([]),[ue,xe]=(0,n.useState)(!1),[he,fe]=(0,n.useState)(null),[ge,ye]=(0,n.useState)(!1),[je,ve]=(0,n.useState)(!1),[we,Ae]=(0,n.useState)(!1),[Se,be]=(0,n.useState)(null),[Ce,Fe]=(0,n.useState)(null),[ke,Be]=(0,n.useState)([]),[Ee,_e]=(0,n.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""}),[Re,Me]=(0,n.useState)(""),[ze,Pe]=(0,n.useState)(!1),[Ne,De]=(0,n.useState)("");(0,n.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:x()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const r=await fetch("/api/restaurants",{headers:x()}),n=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",n),Array.isArray(n)&&ee(n);const t={};Array.isArray(n)&&n.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const i=(a.data||a).map(e=>{var a;let r,n,i="Purple Here";if("System Admin"===e.role)r="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var s,o;if(e.restaurant_id)r="restaurant_staff",n=e.restaurant_name||(null===(s=t[e.restaurant_id])||void 0===s?void 0:s.name)||"Unknown Restaurant",i=(null===(o=t[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else r="our_staff"}else r="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:r,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:n,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Admin] Transformed all staff data:",i),L(i)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const $e=T.filter(e=>{if("all"!==r)if("Managers"===r){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==r)return!1;return!!(!q||e.name.toLowerCase().includes(q.toLowerCase())||e.email.toLowerCase().includes(q.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(q.toLowerCase()))&&(("all"===J||e.role===J)&&(("all"===Z||e.status===Z)&&("all"===X||e.restaurantId===X)))}),Ie=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],Oe={total:T.length,systemAdmin:T.filter(e=>"System Admin"===e.role).length,restaurantAdmin:T.filter(e=>"Restaurant Admin"===e.role).length,staff:T.filter(e=>"Staff"===e.role).length,managers:T.filter(e=>Ie.includes(e.role)).length,active:T.filter(e=>"active"===e.status).length,totalSalary:T.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},Ue=()=>{ye(!1),Me(""),le(null),re(""),_e({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""})},Ge=(e,a)=>{_e(r=>{const n={...r,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":n.type="restaurant_staff";break;case"System Admin":n.type="our_staff";break;default:n.type="company_staff"}return n}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(le(null),re(""),te([]),se(!1))},He=()=>{Ae(!1),Fe(null),Be([])},[Te,Le]=(0,n.useState)(!1),[qe,We]=(0,n.useState)(null),[Je,Ke]=(0,n.useState)(!1),[Ze,Qe]=(0,n.useState)(null),[Xe,Ye]=(0,n.useState)(null),Ve=()=>{Le(!1),We(null)},ea=()=>{ve(!1),be(null)},aa=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},ra=Array.from(new Map(T.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),na=Array.from(new Set(T.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(i.mc,{children:[(0,u.jsxs)(i.Y9,{children:[(0,u.jsx)(i.hE,{children:"Staff Management"}),(0,u.jsxs)(i.ex,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const r=e[a];return"string"===typeof r&&(r.includes(",")||r.includes('"')||r.includes("\n"))?`"${r.replace(/"/g,'""')}"`:r||""}).join(","))].join("\n")})($e.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,c.vv)(e.salary,a.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),r=new Blob([e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(r),t=document.createElement("a");t.href=n,t.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:"Export"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:()=>{ye(!0)},children:"Add Staff"})]})]}),(0,u.jsxs)(i.UC,{children:[(0,u.jsxs)(i.MD,{children:[(0,u.jsxs)(i.hI,{color:"#059669",children:[(0,u.jsx)(i.Os,{children:Oe.total}),(0,u.jsx)(i.v0,{children:"Total Staff"}),(0,u.jsx)(i.d1,{children:"Across entire system"})]}),(0,u.jsxs)(i.hI,{color:"#2563EB",children:[(0,u.jsx)(i.Os,{children:Oe.managers}),(0,u.jsx)(i.v0,{children:"Managers"}),(0,u.jsx)(i.d1,{children:"4 manager roles"})]}),(0,u.jsxs)(i.hI,{color:"#7C3AED",children:[(0,u.jsx)(i.Os,{children:Oe.active}),(0,u.jsx)(i.v0,{children:"Active Staff"}),(0,u.jsxs)(i.d1,{children:[Math.round(Oe.active/Oe.total*100),"% of total"]})]}),(0,u.jsxs)(i.hI,{color:"#D97706",children:[(0,u.jsx)(i.Os,{children:(0,c.vv)(Oe.totalSalary,a.currency)}),(0,u.jsx)(i.v0,{children:"Monthly Payroll"}),(0,u.jsx)(i.d1,{children:"All staff combined"})]})]}),(0,u.jsxs)(s.tU,{children:[(0,u.jsxs)(s.oz,{active:"all"===r,onClick:()=>t("all"),children:["All Staff ",(0,u.jsx)(s.Ex,{count:Oe.total,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"System Admin"===r,onClick:()=>t("System Admin"),children:["System Admin ",(0,u.jsx)(s.Ex,{count:Oe.systemAdmin||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Managers"===r,onClick:()=>t("Managers"),children:["Managers ",(0,u.jsx)(s.Ex,{count:Oe.managers||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Restaurant Admin"===r,onClick:()=>t("Restaurant Admin"),children:["Restaurant Admin ",(0,u.jsx)(s.Ex,{count:Oe.restaurantAdmin||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Staff"===r,onClick:()=>t("Staff"),children:["Staff ",(0,u.jsx)(s.Ex,{count:Oe.staff||0,showZero:!0})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:q,onChange:e=>W(e.target.value)}),(0,u.jsxs)(d.Jt,{value:J,onChange:e=>K(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Roles"}),na.map(e=>(0,u.jsx)("option",{value:e,children:e},e))]}),(0,u.jsxs)(d.Jt,{value:Z,onChange:e=>Q(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,u.jsxs)(d.Jt,{value:X,onChange:e=>Y(e.target.value),style:{display:"all"===r||"Restaurant Admin"===r||"Staff"===r?"block":"none"},children:[(0,u.jsx)("option",{value:"all",children:"All Restaurants"}),ra.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,u.jsxs)(i.XI,{children:[(0,u.jsxs)(h,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,u.jsx)("span",{children:"Staff Member"}),(0,u.jsx)("span",{children:"Company & Location"}),(0,u.jsx)("span",{children:"Role"}),(0,u.jsx)("span",{children:"Department"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{children:"Salary"}),(0,u.jsx)("span",{children:"Actions"})]}),0===$e.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):$e.map(e=>(0,u.jsxs)(f,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(y,{role:e.role,children:aa(e.name)}),(0,u.jsxs)(j,{children:[(0,u.jsx)(v,{children:e.name}),(0,u.jsx)(w,{children:e.email})]})]}),(0,u.jsxs)(i.Np,{children:[(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Company & Location"}),(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,u.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Role"}),(0,u.jsx)(A,{role:e.role,children:e.role})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Department"}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Status"}),(0,u.jsx)(S,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Salary"}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,c.vv)(e.salary,a.currency):"N/A"})]})]}),(0,u.jsxs)(i.wr,{children:[(0,u.jsx)(i.rA,{onClick:()=>(e=>{if(be(e),e.restaurantId){const a=V.find(a=>a.id===e.restaurantId);a&&(ce(a.name),fe(a))}else ce(""),fe(null);ve(!0)})(e),children:"Edit"}),(0,u.jsx)(i.K0,{onClick:()=>(e=>{Ye(e),Qe("toggle"),Ke(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,u.jsx)(b,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(i.K0,{onClick:()=>(e=>{Ye(e),Qe("resetPassword"),Ke(!0)})(e),title:"Reset Password",children:(0,u.jsx)(b,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,u.jsx)(i.K0,{onClick:()=>(async e=>{We(e),Le(!0)})(e),title:"Delete Staff",children:(0,u.jsx)(b,{children:"\xd7"})})]})]},e.id))]})]}),(0,u.jsx)(C,{show:ge,onClick:Ue,children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Add Staff"}),(0,u.jsx)(E,{onClick:Ue,children:"\xd7"})]}),(0,u.jsxs)(_,{children:[(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Role *"}),(0,u.jsxs)(P,{value:Ee.role,onChange:e=>Ge("role",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Role"}),(0,u.jsx)("option",{value:"Staff",children:"Staff"}),(0,u.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),"Restaurant Admin"===Ee.role&&(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"8px",fontSize:"13px",color:"#92400E",lineHeight:"1.5"},children:[(0,u.jsx)("strong",{children:"Note:"})," Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page > Add Restaurant). Creating one here will require manually assigning a restaurant afterwards."]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Staff ID (Username) *"}),(0,u.jsx)(z,{type:"text",value:Ee.username,onChange:e=>Ge("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:"\u2139\ufe0f A strong password will be auto-generated and shown after creation"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Full Name *"}),(0,u.jsx)(z,{type:"text",value:Ee.name,onChange:e=>Ge("name",e.target.value),placeholder:"Enter full name"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Email *"}),(0,u.jsx)(z,{type:"email",value:Ee.email,onChange:e=>Ge("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Phone"}),(0,u.jsx)(m.A,{value:Ee.phone,onChange:e=>Ge("phone",e)})]}),("foodcourt_manager"===Ee.role||"foodcourt_general"===Ee.role||"brand_manager"===Ee.role||"brand_general"===Ee.role)&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Company Name"}),(0,u.jsx)(z,{type:"text",value:Ee.companyName||"",onChange:e=>Ge("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===Ee.role||"Staff"===Ee.role)&&(0,u.jsxs)(R,{style:{position:"relative"},children:[(0,u.jsx)(M,{children:"Restaurant *"}),(0,u.jsx)(N,{type:"text",value:ae,onChange:e=>(e=>{if(re(e),se(!0),e.length<1)return void te(V.slice(0,10));const a=V.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));te(a.slice(0,10))})(e.target.value),onFocus:()=>{se(!0),0===ae.length&&te(V.slice(0,10))},onBlur:()=>setTimeout(()=>se(!1),200),placeholder:"Type to search for restaurants"}),ie&&ne.length>0&&(0,u.jsx)(D,{children:ne.map(e=>(0,u.jsxs)($,{onClick:()=>(e=>{le(e),re(e.name),se(!1),_e(a=>({...a,restaurantId:e.id}))})(e),children:[(0,u.jsx)(I,{children:e.name}),(0,u.jsx)(O,{children:e.address||"No address provided"})]},e.id))}),oe&&(0,u.jsxs)(U,{children:["\u2713 Selected: ",(0,u.jsx)("strong",{children:oe.name})]})]}),"System Admin"===Ee.role&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Company Name"}),(0,u.jsx)(z,{type:"text",value:Ee.companyName||"",onChange:e=>Ge("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Department"}),(0,u.jsx)(z,{type:"text",value:Ee.department,onChange:e=>Ge("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Ee.role||"Staff"===Ee.role)&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"PIN Code (4 digits)"}),(0,u.jsx)(z,{type:"text",inputMode:"numeric",maxLength:4,value:Ee.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");Ge("pin_code",a)},placeholder:"e.g. 1234",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Monthly Salary (RM)"}),(0,u.jsx)(z,{type:"number",value:Ee.salary,onChange:e=>Ge("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),Re&&(0,u.jsx)(H,{style:{marginTop:"16px"},children:Re}),(0,u.jsxs)(G,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:Ue,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Me(""),!Ee.role)return void Me("Role selection is required");if(!Ee.username||""===Ee.username.trim())return void Me("Staff ID (Username) is required");if(!Ee.name||""===Ee.name.trim())return void Me("Full Name is required");if(!Ee.email||""===Ee.email.trim())return void Me("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Ee.email))if("Restaurant Admin"!==Ee.role&&"Staff"!==Ee.role||oe||Ee.restaurantId)try{const e={username:Ee.username.trim(),email:Ee.email.trim(),role:Ee.role,full_name:Ee.name.trim(),phone:Ee.phone?Ee.phone.trim():null,department:Ee.department?Ee.department.trim():null,company_name:Ee.companyName?Ee.companyName.trim():null,restaurant_id:Ee.restaurantId?parseInt(Ee.restaurantId):null,manager_id:null};Ee.pin_code&&4===Ee.pin_code.length&&(e.pin_code=Ee.pin_code),console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:x(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void Me(e.error||"Failed to create staff. Please try again.")}const r=await a.json();console.log("\u2705 [Admin] Staff created successfully:",r),Ue();const n=r.generatedPassword||"(check with admin)";De(`Staff member created successfully!\n\nUsername: ${Ee.username}\nPassword: ${n}\n\nPlease save this information and share it securely with the staff member.`),Pe(!0);const t=await fetch("/api/users",{headers:x()});if(t.ok){const e=await t.json(),a=await fetch("/api/restaurants",{headers:x()}),r=a.ok?await a.json():[],n={};Array.isArray(r)&&r.forEach(e=>{n[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const i=e.data||e;if(!Array.isArray(i))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const s=i.map(e=>{var a;let r,t,i="OrderHere";if("System Admin"===e.role)r="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){r="restaurant_staff";const a=n[e.restaurant_id];t=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",i=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else r="our_staff";else r="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:r,role:e.role,department:e.department||"",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});L(s)}}catch(e){console.error("Error creating staff:",e),Me("An error occurred while creating staff. Please try again.")}else Me("Please select a restaurant for Restaurant Admin and Staff roles");else Me("Please enter a valid email address")},children:"Add Staff"})]})]})}),(0,u.jsx)(C,{show:je,onClick:ea,children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Edit Staff Member"}),(0,u.jsx)(E,{onClick:ea,children:"\xd7"})]}),Se&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(_,{children:[(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Role *"}),(0,u.jsxs)(P,{value:Se.role,onChange:e=>be({...Se,role:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Role"}),(0,u.jsx)("option",{value:"Staff",children:"Staff"}),(0,u.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Staff ID (Username)"}),(0,u.jsx)(z,{type:"text",value:Se.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Full Name *"}),(0,u.jsx)(z,{type:"text",value:Se.name,onChange:e=>be({...Se,name:e.target.value}),placeholder:"Enter full name"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Email *"}),(0,u.jsx)(z,{type:"email",value:Se.email,onChange:e=>be({...Se,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Phone"}),(0,u.jsx)(m.A,{value:Se.phone,onChange:e=>be({...Se,phone:e})})]}),"Manager"===Se.role&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Company Name"}),(0,u.jsx)(z,{type:"text",value:Se.companyName||"",onChange:e=>be({...Se,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===Se.role||"Staff"===Se.role)&&(0,u.jsxs)(R,{style:{position:"relative"},children:[(0,u.jsx)(M,{children:"Restaurant"}),(0,u.jsx)(N,{type:"text",value:de,onChange:e=>(e=>{if(ce(e),xe(!0),e.length<1)return void me(V.slice(0,10));const a=V.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));me(a.slice(0,10))})(e.target.value),onFocus:()=>{xe(!0),0===de.length&&me(V.slice(0,10))},onBlur:()=>setTimeout(()=>xe(!1),200),placeholder:"Type to search for restaurants"}),ue&&pe.length>0&&(0,u.jsx)(D,{children:pe.map(e=>(0,u.jsxs)($,{onClick:()=>(e=>{fe(e),ce(e.name),xe(!1),be(a=>({...a,restaurantId:e.id}))})(e),children:[(0,u.jsx)(I,{children:e.name}),(0,u.jsx)(O,{children:e.address||"No address provided"})]},e.id))}),he&&(0,u.jsxs)(U,{children:["\u2713 Selected: ",(0,u.jsx)("strong",{children:he.name})]})]}),"System Admin"===Se.role&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Company Name"}),(0,u.jsx)(z,{type:"text",value:Se.companyName||"",onChange:e=>be({...Se,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Department"}),(0,u.jsx)(z,{type:"text",value:Se.department,onChange:e=>be({...Se,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Se.role||"Staff"===Se.role)&&(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"PIN Code (4 digits)"}),(0,u.jsx)(z,{type:"text",inputMode:"numeric",maxLength:4,value:Se.pin_code||"",onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");be({...Se,pin_code:a})},placeholder:Se.pin_code?"****":"Enter PIN",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]}),(0,u.jsxs)(R,{children:[(0,u.jsx)(M,{children:"Monthly Salary (RM)"}),(0,u.jsx)(z,{type:"number",value:(null===(e=Se.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>be({...Se,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:ea,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(!Se)return;if(!Se.name||""===Se.name.trim())return void alert("Full Name is required");if(!Se.email||""===Se.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Se.email))if(Se.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",Se);const e={full_name:Se.name.trim(),email:Se.email.trim(),role:Se.role,department:Se.department?Se.department.trim():null,phone:Se.phone?Se.phone.trim():null};Se.pin_code&&4===Se.pin_code.length&&(e.pin_code=Se.pin_code),console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${Se.id}`,{method:"PUT",headers:x(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const r=await a.json();console.log("\u2705 [Admin] Update successful:",r),ve(!1),be(null);const n=await fetch(`/api/users/${Se.id}`,{headers:x()});if(n.ok){const e=await n.json(),a=e.data||e,r=await fetch("/api/restaurants",{headers:x()}),t=r.ok?await r.json():[],i={};let s;Array.isArray(t)&&t.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";L(e=>e.map(e=>e.id===Se.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,pin_code:a.pin_code||null,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},children:"Update Staff"})]})]})]})}),(0,u.jsx)(C,{show:we,onClick:He,children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Permission Management"}),(0,u.jsx)(E,{onClick:He,children:"\xd7"})]}),Ce&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{style:{marginBottom:"24px"},children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:Ce.role,children:aa(Ce.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:Ce.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Ce.role," - ",Ce.companyName]})]})]})}),(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,u.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,u.jsxs)("div",{onClick:()=>{Ce&&(Fe({...Ce,role:e.role}),Be(e.permissions))},style:{padding:"16px",backgroundColor:(null===Ce||void 0===Ce?void 0:Ce.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===Ce||void 0===Ce?void 0:Ce.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,u.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===Ce||void 0===Ce?void 0:Ce.role)===e.role&&(0,u.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,u.jsx)("strong",{children:"Included Permissions:"}),(0,u.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:He,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Ce)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",Ce.id,"New role:",Ce.role);const e=await fetch(`/api/users/${Ce.id}`,{method:"PUT",headers:x(),body:JSON.stringify({role:Ce.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),Ae(!1),Fe(null);const r=await fetch(`/api/users/${Ce.id}`,{headers:x()});if(r.ok){const e=await r.json(),a=e.data||e,n=await fetch("/api/restaurants",{headers:x()}),t=n.ok?await n.json():[],i={};let s;Array.isArray(t)&&t.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";L(e=>e.map(e=>e.id===Ce.id?{...e,role:a.role,permissions:ke,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:"Change Role"})]})]})]})}),(0,u.jsx)(C,{show:Te,onClick:Ve,children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Delete Staff"}),(0,u.jsx)(E,{onClick:Ve,children:"\xd7"})]}),qe&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:qe.role,children:aa(qe.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:qe.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[qe.role," - ",qe.companyName]})]})]}),(0,u.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,u.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0\ufe0f"}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.4"},children:"\uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \uc9c1\uc6d0\uc758 \ubaa8\ub4e0 \ub370\uc774\ud130\uac00 \uc601\uad6c\uc801\uc73c\ub85c \uc0ad\uc81c\ub429\ub2c8\ub2e4."})]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:Ve,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(qe){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${qe.name}...`);(await fetch(`/api/users/${qe.id}`,{method:"DELETE",headers:x()})).ok?L(e=>e.filter(e=>e.id!==qe.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}Le(!1),We(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete"})]})]})]})}),Je&&(0,u.jsx)(C,{show:Je,onClick:()=>Ke(!1),children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Confirm Action"}),(0,u.jsx)(E,{onClick:()=>Ke(!1),children:"\xd7"})]}),Xe&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:Xe.role,children:aa(Xe.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Xe.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Xe.role," - ",Xe.companyName]})]})]}),(0,u.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Ze&&("active"===Xe.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Ze&&"Reset Password?"]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Ze&&`This will ${"active"===Xe.status?"deactivate":"activate"} ${Xe.name}'s account.`,"resetPassword"===Ze&&`This will reset ${Xe.name}'s password. A new strong password will be generated.`]})]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:()=>Ke(!1),children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Xe&&Ze){try{if("toggle"===Ze){const e="active"===Xe.status?"inactive":"active",a=await fetch(`/api/users/${Xe.id}`,{method:"PUT",headers:x(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}L(a=>a.map(a=>a.id===Xe.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Ze){const e=await fetch(`/api/users/${Xe.id}/reset-password`,{method:"POST",headers:x()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=(await e.json()).tempPassword||"(check with admin)";De(`Password reset successfully!\n\nUsername: ${Xe.username||Xe.email}\nNew Password: ${a}\n\nPlease save this information and share it securely with the staff member.`),Pe(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Ke(!1),Ye(null),Qe(null)}},children:"toggle"===Ze?"Confirm":"Reset Password"})]})]})]})}),ze&&(0,u.jsx)(C,{show:ze,onClick:()=>Pe(!1),children:(0,u.jsxs)(F,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(B,{children:"Success"}),(0,u.jsx)(E,{onClick:()=>Pe(!1),children:"\xd7"})]}),(0,u.jsx)("div",{style:{marginBottom:"24px"},children:(0,u.jsx)("div",{style:{padding:"20px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #10B981"},children:(0,u.jsx)("div",{style:{fontSize:"14px",color:"#047857",whiteSpace:"pre-line",lineHeight:"1.8",fontFamily:"monospace"},children:Ne})})}),(0,u.jsx)(G,{children:(0,u.jsx)(i.$n,{variant:"primary",onClick:()=>Pe(!1),children:"OK"})})]})})]})})}}}]);