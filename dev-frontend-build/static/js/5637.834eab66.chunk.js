"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5637],{2488:(e,a,r)=>{r.d(a,{DO:()=>p,Jt:()=>m,Qn:()=>c});r(9950);var t=r(4752),n=r(4414);const i=t.Ay.div`
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
`,s=t.Ay.input`
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
`,o=t.Ay.div`
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
`,c=e=>{let{children:a,className:r,style:t,...s}=e;return(0,n.jsx)(i,{className:r,style:t,...s,children:a})},p=e=>{let{placeholder:a="Search...",value:r,onChange:t,style:i,...d}=e;return(0,n.jsxs)(o,{style:i,children:[(0,n.jsx)(s,{placeholder:a,value:r,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,n.jsx)(l,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},m=e=>{let{children:a,...r}=e;return(0,n.jsx)(d,{...r,children:a})}},2597:(e,a,r)=>{r.d(a,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var t=r(4752),n=r(4414);const i=t.Ay.div`
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
`,s=t.Ay.button`
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
`,o=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:a,className:r,style:t}=e;return(0,n.jsx)(i,{className:r,style:t,children:a})},d=e=>{let{active:a,onClick:r,children:t,className:i}=e;return(0,n.jsx)(s,{active:a,onClick:r,className:i,children:t})},c=e=>{let{count:a,variant:r="default",showZero:t=!1}=e;return 0!==a||t?(0,n.jsx)(o,{variant:r,children:a}):null}},2653:(e,a,r)=>{r.d(a,{M:()=>i});var t=r(9950),n=r(4492);function i(e){const[a,r]=(0,n.ok)(),i=(0,t.useCallback)(()=>a.get("tab")||e,[a,e]),[s,o]=(0,t.useState)(i());return[s,(0,t.useCallback)(e=>{o(e),r({tab:e})},[r])]}},8018:(e,a,r)=>{r.r(a),r.d(a,{default:()=>$});var t=r(9950),n=r(4752),i=r(8409),s=r(2597),o=r(2653),l=r(1367),d=r(2488),c=r(6038),p=r(9018),m=r(8666),u=r(4414);const x=()=>{const e=localStorage.getItem("auth_token");return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},h=(0,n.Ay)(i.A0)`
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
`,f=(0,n.Ay)(i.Hj)`

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
`,g=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,y=n.Ay.div`
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
`,j=n.Ay.div``,v=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,w=n.Ay.div`
  font-size: 12px;
  color: #6B7280;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,A=n.Ay.span`
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
`,S=n.Ay.span`
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
`,b=n.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,F=n.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,C=n.Ay.div`
  display: flex;
  flex-direction: column;
`,k=n.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=n.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,E=n.Ay.select`
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
`,_=(0,n.Ay)(B)`
  width: 100%;
`,R=n.Ay.div`
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
`,N=n.Ay.div`
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
`,M=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,z=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,P=n.Ay.div`
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
`,D=n.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,$=()=>{var e;(0,l.As)();const{operationSettings:a}=(0,p.Pj)(),[r,n]=(0,o.M)("all"),[$,O]=(0,t.useState)([]),[I,U]=(0,t.useState)(""),[G,H]=(0,t.useState)("all"),[L,T]=(0,t.useState)("all"),[q,W]=(0,t.useState)("all"),[J,K]=(0,t.useState)([]),[Z,Q]=(0,t.useState)(""),[Y,X]=(0,t.useState)([]),[V,ee]=(0,t.useState)(!1),[ae,re]=(0,t.useState)(null),[te,ne]=(0,t.useState)(""),[ie,se]=(0,t.useState)([]),[oe,le]=(0,t.useState)(!1),[de,ce]=(0,t.useState)(null),[pe,me]=(0,t.useState)(!1),[ue,xe]=(0,t.useState)(!1),[he,fe]=(0,t.useState)(!1),[ge,ye]=(0,t.useState)(null),[je,ve]=(0,t.useState)(null),[we,Ae]=(0,t.useState)([]),[Se,be]=(0,t.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""}),[Fe,Ce]=(0,t.useState)(""),[ke,Be]=(0,t.useState)(!1),[Ee,_e]=(0,t.useState)("");(0,t.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:x()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const r=await fetch("/api/restaurants",{headers:x()}),t=r.ok?await r.json():[];console.log("\ud83c\udfea All restaurants data:",t),Array.isArray(t)&&K(t);const n={};Array.isArray(t)&&t.forEach(e=>{n[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const i=(a.data||a).map(e=>{var a;let r,t,i="Purple Here";if("System Admin"===e.role)r="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var s,o;if(e.restaurant_id)r="restaurant_staff",t=e.restaurant_name||(null===(s=n[e.restaurant_id])||void 0===s?void 0:s.name)||"Unknown Restaurant",i=(null===(o=n[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else r="our_staff"}else r="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:r,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Admin] Transformed all staff data:",i),O(i)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const Re=$.filter(e=>{if("all"!==r)if("Managers"===r){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==r)return!1;return!!(!I||e.name.toLowerCase().includes(I.toLowerCase())||e.email.toLowerCase().includes(I.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(I.toLowerCase()))&&(("all"===G||e.role===G)&&(("all"===L||e.status===L)&&("all"===q||e.restaurantId===q)))}),Ne=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],Me={total:$.length,systemAdmin:$.filter(e=>"System Admin"===e.role).length,restaurantAdmin:$.filter(e=>"Restaurant Admin"===e.role).length,staff:$.filter(e=>"Staff"===e.role).length,managers:$.filter(e=>Ne.includes(e.role)).length,active:$.filter(e=>"active"===e.status).length,totalSalary:$.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},ze=()=>{me(!1),Ce(""),re(null),Q(""),be({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""})},Pe=(e,a)=>{be(r=>{const t={...r,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":t.type="restaurant_staff";break;case"System Admin":t.type="our_staff";break;default:t.type="company_staff"}return t}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(re(null),Q(""),X([]),ee(!1))},De=()=>{fe(!1),ve(null),Ae([])},[$e,Oe]=(0,t.useState)(!1),[Ie,Ue]=(0,t.useState)(null),[Ge,He]=(0,t.useState)(!1),[Le,Te]=(0,t.useState)(null),[qe,We]=(0,t.useState)(null),Je=()=>{Oe(!1),Ue(null)},Ke=()=>{xe(!1),ye(null)},Ze=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},Qe=Array.from(new Map($.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),Ye=Array.from(new Set($.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(i.mc,{children:[(0,u.jsxs)(i.Y9,{children:[(0,u.jsx)(i.hE,{children:"Staff Management"}),(0,u.jsxs)(i.ex,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const r=e[a];return"string"===typeof r&&(r.includes(",")||r.includes('"')||r.includes("\n"))?`"${r.replace(/"/g,'""')}"`:r||""}).join(","))].join("\n")})(Re.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,c.vv)(e.salary,a.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),r=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(r),n=document.createElement("a");n.href=t,n.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(t)},children:"Export"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:()=>{me(!0)},children:"Add Staff"})]})]}),(0,u.jsxs)(i.UC,{children:[(0,u.jsxs)(i.MD,{children:[(0,u.jsxs)(i.hI,{color:"#059669",children:[(0,u.jsx)(i.Os,{children:Me.total}),(0,u.jsx)(i.v0,{children:"Total Staff"}),(0,u.jsx)(i.d1,{children:"Across entire system"})]}),(0,u.jsxs)(i.hI,{color:"#2563EB",children:[(0,u.jsx)(i.Os,{children:Me.managers}),(0,u.jsx)(i.v0,{children:"Managers"}),(0,u.jsx)(i.d1,{children:"4 manager roles"})]}),(0,u.jsxs)(i.hI,{color:"#7C3AED",children:[(0,u.jsx)(i.Os,{children:Me.active}),(0,u.jsx)(i.v0,{children:"Active Staff"}),(0,u.jsxs)(i.d1,{children:[Math.round(Me.active/Me.total*100),"% of total"]})]}),(0,u.jsxs)(i.hI,{color:"#D97706",children:[(0,u.jsx)(i.Os,{children:(0,c.vv)(Me.totalSalary,a.currency)}),(0,u.jsx)(i.v0,{children:"Monthly Payroll"}),(0,u.jsx)(i.d1,{children:"All staff combined"})]})]}),(0,u.jsxs)(s.tU,{children:[(0,u.jsxs)(s.oz,{active:"all"===r,onClick:()=>n("all"),children:["All Staff ",(0,u.jsx)(s.Ex,{count:Me.total,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"System Admin"===r,onClick:()=>n("System Admin"),children:["System Admin ",(0,u.jsx)(s.Ex,{count:Me.systemAdmin||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Managers"===r,onClick:()=>n("Managers"),children:["Managers ",(0,u.jsx)(s.Ex,{count:Me.managers||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Restaurant Admin"===r,onClick:()=>n("Restaurant Admin"),children:["Restaurant Admin ",(0,u.jsx)(s.Ex,{count:Me.restaurantAdmin||0,showZero:!0})]}),(0,u.jsxs)(s.oz,{active:"Staff"===r,onClick:()=>n("Staff"),children:["Staff ",(0,u.jsx)(s.Ex,{count:Me.staff||0,showZero:!0})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsxs)(d.Jt,{value:G,onChange:e=>H(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Roles"}),Ye.map(e=>(0,u.jsx)("option",{value:e,children:e},e))]}),(0,u.jsxs)(d.Jt,{value:L,onChange:e=>T(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"active",children:"Active"}),(0,u.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,u.jsxs)(d.Jt,{value:q,onChange:e=>W(e.target.value),style:{display:"all"===r||"Restaurant Admin"===r||"Staff"===r?"block":"none"},children:[(0,u.jsx)("option",{value:"all",children:"All Restaurants"}),Qe.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,u.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:I,onChange:e=>U(e.target.value)})]}),(0,u.jsxs)(i.XI,{children:[(0,u.jsxs)(h,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,u.jsx)("span",{className:"col-info",children:"Staff Member"}),(0,u.jsx)("span",{className:"col-info",children:"Company & Location"}),(0,u.jsx)("span",{children:"Role"}),(0,u.jsx)("span",{children:"Department"}),(0,u.jsx)("span",{children:"Status"}),(0,u.jsx)("span",{className:"col-salary",children:"Salary"}),(0,u.jsx)("span",{className:"col-action",children:"Actions"})]}),0===Re.length?(0,u.jsxs)(i.pp,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):Re.map(e=>(0,u.jsxs)(f,{columns:"2.5fr 2.5fr 1fr 1fr 1fr 1fr 220px",children:[(0,u.jsxs)(g,{className:"col-info",children:[(0,u.jsx)(y,{role:e.role,children:Ze(e.name)}),(0,u.jsxs)(j,{children:[(0,u.jsx)(v,{children:e.name}),(0,u.jsx)(w,{children:e.email})]})]}),(0,u.jsxs)(i.Np,{children:[(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Company & Location"}),(0,u.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,u.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Role"}),(0,u.jsx)(A,{role:e.role,children:e.role})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Department"}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,u.jsxs)(i.Uj,{children:[(0,u.jsx)(i.PM,{children:"Status"}),(0,u.jsx)(S,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,u.jsxs)(i.Uj,{className:"col-salary",children:[(0,u.jsx)(i.PM,{children:"Salary"}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,c.vv)(e.salary,a.currency):"N/A"})]})]}),(0,u.jsxs)(i.wr,{children:[(0,u.jsx)(i.rA,{onClick:()=>(e=>{if(ye(e),e.restaurantId){const a=J.find(a=>a.id===e.restaurantId);a&&(ne(a.name),ce(a))}else ne(""),ce(null);xe(!0)})(e),children:"Edit"}),(0,u.jsx)(i.K0,{onClick:()=>(e=>{We(e),Te("toggle"),He(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,u.jsx)(b,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,u.jsx)(i.K0,{onClick:()=>(e=>{We(e),Te("resetPassword"),He(!0)})(e),title:"Reset Password",children:(0,u.jsx)(b,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,u.jsx)(i.K0,{onClick:()=>(async e=>{Ue(e),Oe(!0)})(e),title:"Delete Staff",children:(0,u.jsx)(b,{children:"\xd7"})})]})]},e.id))]})]}),pe&&(0,u.jsxs)(i.aF,{isOpen:!0,onClose:ze,title:"Add Staff",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:ze,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Ce(""),!Se.role)return void Ce("Role selection is required");if(!Se.username||""===Se.username.trim())return void Ce("Staff ID (Username) is required");if(!Se.name||""===Se.name.trim())return void Ce("Full Name is required");if(!Se.email||""===Se.email.trim())return void Ce("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Se.email))if("Restaurant Admin"!==Se.role&&"Staff"!==Se.role||ae||Se.restaurantId)try{const e={username:Se.username.trim(),email:Se.email.trim(),role:Se.role,full_name:Se.name.trim(),phone:Se.phone?Se.phone.trim():null,department:Se.department?Se.department.trim():null,company_name:Se.companyName?Se.companyName.trim():null,restaurant_id:Se.restaurantId?parseInt(Se.restaurantId):null,manager_id:null};Se.pin_code&&4===Se.pin_code.length&&(e.pin_code=Se.pin_code),console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:x(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void Ce(e.error||"Failed to create staff. Please try again.")}const r=await a.json();console.log("\u2705 [Admin] Staff created successfully:",r),ze();const t=r.generatedPassword||"(check with admin)";_e(`Staff member created successfully!\n\nUsername: ${Se.username}\nPassword: ${t}\n\nPlease save this information and share it securely with the staff member.`),Be(!0);const n=await fetch("/api/users",{headers:x()});if(n.ok){const e=await n.json(),a=await fetch("/api/restaurants",{headers:x()}),r=a.ok?await a.json():[],t={};Array.isArray(r)&&r.forEach(e=>{t[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const i=e.data||e;if(!Array.isArray(i))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const s=i.map(e=>{var a;let r,n,i="OrderHere";if("System Admin"===e.role)r="our_staff",i=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))r="company_staff",i=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){r="restaurant_staff";const a=t[e.restaurant_id];n=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",i=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else r="our_staff";else r="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:r,role:e.role,department:e.department||"",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:n,companyName:i,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});O(s)}}catch(e){console.error("Error creating staff:",e),Ce("An error occurred while creating staff. Please try again.")}else Ce("Please select a restaurant for Restaurant Admin and Staff roles");else Ce("Please enter a valid email address")},children:"Add Staff"})]}),children:[(0,u.jsxs)(F,{children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Role *"}),(0,u.jsxs)(E,{value:Se.role,onChange:e=>Pe("role",e.target.value),children:[(0,u.jsx)("option",{value:"",children:"Select Role"}),(0,u.jsx)("option",{value:"Staff",children:"Staff"}),(0,u.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),"Restaurant Admin"===Se.role&&(0,u.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"8px",fontSize:"13px",color:"#92400E",lineHeight:"1.5"},children:[(0,u.jsx)("strong",{children:"Note:"})," Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page > Add Restaurant). Creating one here will require manually assigning a restaurant afterwards."]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Staff ID (Username) *"}),(0,u.jsx)(B,{type:"text",value:Se.username,onChange:e=>Pe("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:"\u2139\ufe0f A strong password will be auto-generated and shown after creation"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Full Name *"}),(0,u.jsx)(B,{type:"text",value:Se.name,onChange:e=>Pe("name",e.target.value),placeholder:"Enter full name"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Email *"}),(0,u.jsx)(B,{type:"email",value:Se.email,onChange:e=>Pe("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Phone"}),(0,u.jsx)(m.A,{value:Se.phone,onChange:e=>Pe("phone",e)})]}),("foodcourt_manager"===Se.role||"foodcourt_general"===Se.role||"brand_manager"===Se.role||"brand_general"===Se.role)&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Company Name"}),(0,u.jsx)(B,{type:"text",value:Se.companyName||"",onChange:e=>Pe("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===Se.role||"Staff"===Se.role)&&(0,u.jsxs)(C,{style:{position:"relative"},children:[(0,u.jsx)(k,{children:"Restaurant *"}),(0,u.jsx)(_,{type:"text",value:Z,onChange:e=>(e=>{if(Q(e),ee(!0),e.length<1)return void X(J.slice(0,10));const a=J.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));X(a.slice(0,10))})(e.target.value),onFocus:()=>{ee(!0),0===Z.length&&X(J.slice(0,10))},onBlur:()=>setTimeout(()=>ee(!1),200),placeholder:"Type to search for restaurants"}),V&&Y.length>0&&(0,u.jsx)(R,{children:Y.map(e=>(0,u.jsxs)(N,{onClick:()=>(e=>{re(e),Q(e.name),ee(!1),be(a=>({...a,restaurantId:e.id}))})(e),children:[(0,u.jsx)(M,{children:e.name}),(0,u.jsx)(z,{children:e.address||"No address provided"})]},e.id))}),ae&&(0,u.jsxs)(P,{children:["\u2713 Selected: ",(0,u.jsx)("strong",{children:ae.name})]})]}),"System Admin"===Se.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Company Name"}),(0,u.jsx)(B,{type:"text",value:Se.companyName||"",onChange:e=>Pe("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Department"}),(0,u.jsx)(B,{type:"text",value:Se.department,onChange:e=>Pe("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Se.role||"Staff"===Se.role)&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"PIN Code (4 digits)"}),(0,u.jsx)(B,{type:"text",inputMode:"numeric",maxLength:4,value:Se.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");Pe("pin_code",a)},placeholder:"e.g. 1234",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Monthly Salary (RM)"}),(0,u.jsx)(B,{type:"number",value:Se.salary,onChange:e=>Pe("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),Fe&&(0,u.jsx)(D,{style:{marginTop:"16px"},children:Fe})]}),ue&&(0,u.jsx)(i.aF,{isOpen:!0,onClose:Ke,title:"Edit Staff Member",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:Ke,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(!ge)return;if(!ge.name||""===ge.name.trim())return void alert("Full Name is required");if(!ge.email||""===ge.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ge.email))if(ge.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",ge);const e={full_name:ge.name.trim(),email:ge.email.trim(),role:ge.role,department:ge.department?ge.department.trim():null,phone:ge.phone?ge.phone.trim():null};ge.pin_code&&4===ge.pin_code.length&&(e.pin_code=ge.pin_code),console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${ge.id}`,{method:"PUT",headers:x(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const r=await a.json();console.log("\u2705 [Admin] Update successful:",r),xe(!1),ye(null);const t=await fetch(`/api/users/${ge.id}`,{headers:x()});if(t.ok){const e=await t.json(),a=e.data||e,r=await fetch("/api/restaurants",{headers:x()}),n=r.ok?await r.json():[],i={};let s;Array.isArray(n)&&n.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";O(e=>e.map(e=>e.id===ge.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,pin_code:a.pin_code||null,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},children:"Update Staff"})]}),children:ge&&(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(F,{children:[(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Role *"}),(0,u.jsxs)(E,{value:ge.role,onChange:e=>ye({...ge,role:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select Role"}),(0,u.jsx)("option",{value:"Staff",children:"Staff"}),(0,u.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,u.jsx)("option",{value:"Foodcourt Manager",children:"Foodcourt Manager"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Brand Manager",children:"Brand Manager"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"})]})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Staff ID (Username)"}),(0,u.jsx)(B,{type:"text",value:ge.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Full Name *"}),(0,u.jsx)(B,{type:"text",value:ge.name,onChange:e=>ye({...ge,name:e.target.value}),placeholder:"Enter full name"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Email *"}),(0,u.jsx)(B,{type:"email",value:ge.email,onChange:e=>ye({...ge,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Phone"}),(0,u.jsx)(m.A,{value:ge.phone,onChange:e=>ye({...ge,phone:e})})]}),"Manager"===ge.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Company Name"}),(0,u.jsx)(B,{type:"text",value:ge.companyName||"",onChange:e=>ye({...ge,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===ge.role||"Staff"===ge.role)&&(0,u.jsxs)(C,{style:{position:"relative"},children:[(0,u.jsx)(k,{children:"Restaurant"}),(0,u.jsx)(_,{type:"text",value:te,onChange:e=>(e=>{if(ne(e),le(!0),e.length<1)return void se(J.slice(0,10));const a=J.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));se(a.slice(0,10))})(e.target.value),onFocus:()=>{le(!0),0===te.length&&se(J.slice(0,10))},onBlur:()=>setTimeout(()=>le(!1),200),placeholder:"Type to search for restaurants"}),oe&&ie.length>0&&(0,u.jsx)(R,{children:ie.map(e=>(0,u.jsxs)(N,{onClick:()=>(e=>{ce(e),ne(e.name),le(!1),ye(a=>({...a,restaurantId:e.id}))})(e),children:[(0,u.jsx)(M,{children:e.name}),(0,u.jsx)(z,{children:e.address||"No address provided"})]},e.id))}),de&&(0,u.jsxs)(P,{children:["\u2713 Selected: ",(0,u.jsx)("strong",{children:de.name})]})]}),"System Admin"===ge.role&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Company Name"}),(0,u.jsx)(B,{type:"text",value:ge.companyName||"",onChange:e=>ye({...ge,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Department"}),(0,u.jsx)(B,{type:"text",value:ge.department,onChange:e=>ye({...ge,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===ge.role||"Staff"===ge.role)&&(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"PIN Code (4 digits)"}),(0,u.jsx)(B,{type:"text",inputMode:"numeric",maxLength:4,value:ge.pin_code||"",onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ye({...ge,pin_code:a})},placeholder:ge.pin_code?"****":"Enter PIN",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]}),(0,u.jsxs)(C,{children:[(0,u.jsx)(k,{children:"Monthly Salary (RM)"}),(0,u.jsx)(B,{type:"number",value:(null===(e=ge.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>ye({...ge,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]})})}),he&&(0,u.jsx)(i.aF,{isOpen:!0,onClose:De,title:"Permission Management",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:De,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(je)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",je.id,"New role:",je.role);const e=await fetch(`/api/users/${je.id}`,{method:"PUT",headers:x(),body:JSON.stringify({role:je.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),fe(!1),ve(null);const r=await fetch(`/api/users/${je.id}`,{headers:x()});if(r.ok){const e=await r.json(),a=e.data||e,t=await fetch("/api/restaurants",{headers:x()}),n=t.ok?await t.json():[],i={};let s;Array.isArray(n)&&n.forEach(e=>{i[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)s="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))s="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){s="restaurant_staff";const e=i[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else s="our_staff";else s="company_staff";O(e=>e.map(e=>e.id===je.id?{...e,role:a.role,permissions:we,type:s,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:"Change Role"})]}),children:je&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{style:{marginBottom:"24px"},children:(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:je.role,children:Ze(je.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:je.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[je.role," - ",je.companyName]})]})]})}),(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,u.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,u.jsxs)("div",{onClick:()=>{je&&(ve({...je,role:e.role}),Ae(e.permissions))},style:{padding:"16px",backgroundColor:(null===je||void 0===je?void 0:je.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===je||void 0===je?void 0:je.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,u.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===je||void 0===je?void 0:je.role)===e.role&&(0,u.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,u.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,u.jsx)("strong",{children:"Included Permissions:"}),(0,u.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]})]})}),$e&&Ie&&(0,u.jsx)(i.aF,{isOpen:!0,onClose:Je,title:"Delete Staff",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:Je,children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(Ie){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${Ie.name}...`);(await fetch(`/api/users/${Ie.id}`,{method:"DELETE",headers:x()})).ok?O(e=>e.filter(e=>e.id!==Ie.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}Oe(!1),Ue(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete"})]}),children:(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:Ie.role,children:Ze(Ie.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ie.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Ie.role," - ",Ie.companyName]})]})]}),(0,u.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,u.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0"}),(0,u.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,u.jsx)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.4"},children:"This action cannot be undone. All staff data will be permanently deleted."})]})]})}),Ge&&qe&&(0,u.jsx)(i.aF,{isOpen:!0,onClose:()=>He(!1),title:"Confirm Action",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.$n,{variant:"secondary",onClick:()=>He(!1),children:"Cancel"}),(0,u.jsx)(i.$n,{variant:"primary",onClick:async()=>{if(qe&&Le){try{if("toggle"===Le){const e="active"===qe.status?"inactive":"active",a=await fetch(`/api/users/${qe.id}`,{method:"PUT",headers:x(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}O(a=>a.map(a=>a.id===qe.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Le){const e=await fetch(`/api/users/${qe.id}/reset-password`,{method:"POST",headers:x()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=(await e.json()).tempPassword||"(check with admin)";_e(`Password reset successfully!\n\nUsername: ${qe.username||qe.email}\nNew Password: ${a}\n\nPlease save this information and share it securely with the staff member.`),Be(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}He(!1),We(null),Te(null)}},children:"toggle"===Le?"Confirm":"Reset Password"})]}),children:(0,u.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,u.jsx)(y,{role:qe.role,children:Ze(qe.name)}),(0,u.jsxs)("div",{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:qe.name}),(0,u.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[qe.role," - ",qe.companyName]})]})]}),(0,u.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,u.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Le&&("active"===qe.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Le&&"Reset Password?"]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Le&&`This will ${"active"===qe.status?"deactivate":"activate"} ${qe.name}'s account.`,"resetPassword"===Le&&`This will reset ${qe.name}'s password. A new strong password will be generated.`]})]})]})}),ke&&(0,u.jsx)(i.aF,{isOpen:!0,onClose:()=>Be(!1),title:"Success",footer:(0,u.jsx)(i.$n,{variant:"primary",onClick:()=>Be(!1),children:"OK"}),children:(0,u.jsx)("div",{style:{marginBottom:"24px"},children:(0,u.jsx)("div",{style:{padding:"20px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #10B981"},children:(0,u.jsx)("div",{style:{fontSize:"14px",color:"#047857",whiteSpace:"pre-line",lineHeight:"1.8",fontFamily:"monospace"},children:Ee})})})})]})})}}}]);