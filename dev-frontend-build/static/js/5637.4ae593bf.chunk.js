"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5637],{2653:(e,a,n)=>{n.d(a,{M:()=>s});var t=n(9950),r=n(4492);function s(e){const[a,n]=(0,r.ok)(),s=(0,t.useCallback)(()=>a.get("tab")||e,[a,e]),[i,o]=(0,t.useState)(s());return[i,(0,t.useCallback)(e=>{o(e),n({tab:e})},[n])]}},8018:(e,a,n)=>{n.r(a),n.d(a,{default:()=>I});var t=n(9950),r=n(4752),s=n(8409),i=n(2597),o=n(2653),l=n(1367),d=n(2488),c=n(6038),m=n(9018),f=n(8666),p=n(5030),u=n(9955),h=n(4414);const x=()=>{const e=(0,u.c4)();return{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}}},g=(0,r.Ay)(s.A0)`
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
`,y=(0,r.Ay)(s.Hj)`

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
`,j=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #F3F4F6;
  }
`,v=r.Ay.div`
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
`,S=r.Ay.div``,A=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`,w=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`,F=r.Ay.span`
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
`,C=r.Ay.span`
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
`,M=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`,P=r.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,b=r.Ay.div`
  display: flex;
  flex-direction: column;
`,k=r.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=r.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,E=r.Ay.select`
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
`,_=(0,r.Ay)(B)`
  width: 100%;
`,R=r.Ay.div`
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
`,N=r.Ay.div`
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
`,z=r.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,D=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=r.Ay.div`
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
`,$=r.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  line-height: 1.5;
`,I=()=>{var e;const{t:a}=(0,p.Bd)("admin"),{operationSettings:n}=((0,l.As)(),(0,m.Pj)()),[r,u]=(0,o.M)("all"),[I,U]=(0,t.useState)([]),[T,G]=(0,t.useState)(""),[H,L]=(0,t.useState)("all"),[W,q]=(0,t.useState)("all"),[J,K]=(0,t.useState)("all"),[Z,Q]=(0,t.useState)([]),[X,Y]=(0,t.useState)(""),[V,ee]=(0,t.useState)([]),[ae,ne]=(0,t.useState)(!1),[te,re]=(0,t.useState)(null),[se,ie]=(0,t.useState)(""),[oe,le]=(0,t.useState)([]),[de,ce]=(0,t.useState)(!1),[me,fe]=(0,t.useState)(null),[pe,ue]=(0,t.useState)(!1),[he,xe]=(0,t.useState)(!1),[ge,ye]=(0,t.useState)(!1),[je,ve]=(0,t.useState)(null),[Se,Ae]=(0,t.useState)(null),[we,Fe]=(0,t.useState)([]),[Ce,Me]=(0,t.useState)({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""}),[Pe,be]=(0,t.useState)(""),[ke,Be]=(0,t.useState)(!1),[Ee,_e]=(0,t.useState)(""),[Re,Ne]=(0,t.useState)(""),[ze,De]=(0,t.useState)(!1);(0,t.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udc65 [Admin] Fetching all staff across system...");const e=await fetch("/api/users",{headers:x()});if(console.log("\ud83d\udce1 Users API response status:",e.status),e.ok){const a=await e.json();console.log("\ud83d\udc65 All users data from API:",a);const n=await fetch("/api/restaurants",{headers:x()}),t=n.ok?await n.json():[];console.log("\ud83c\udfea All restaurants data:",t),Array.isArray(t)&&Q(t);const r={};Array.isArray(t)&&t.forEach(e=>{r[e.id]={name:e.name,company:e.company_name||"Purple Here"}});const s=(a.data||a).map(e=>{var a;let n,t,s="Purple Here";if("System Admin"===e.role)n="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))n="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role){var i,o;if(e.restaurant_id)n="restaurant_staff",t=e.restaurant_name||(null===(i=r[e.restaurant_id])||void 0===i?void 0:i.name)||"Unknown Restaurant",s=(null===(o=r[e.restaurant_id])||void 0===o?void 0:o.company)||"Purple Here";else n="our_staff"}else n="company_staff";return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",type:n,role:e.role,department:e.restaurant_id?"Restaurant Operations":"System Admin"===e.role?"Administration":"Operations",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:"System Admin"===e.role?12e3:"Restaurant Admin"===e.role?5e3:3e3,permissions:"System Admin"===e.role?["all"]:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"],is_demo:e.is_demo||!1}});console.log("\u2705 [Admin] Transformed all staff data:",s),U(s)}else console.error("Failed to fetch users data")}catch(e){console.error("Error fetching staff data:",e)}})()},[]);const Oe=I.filter(e=>{if("all"!==r)if("Managers"===r){if(!["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"].includes(e.role))return!1}else if(e.role!==r)return!1;return!!(!T||e.name.toLowerCase().includes(T.toLowerCase())||e.email.toLowerCase().includes(T.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(T.toLowerCase()))&&(("all"===H||e.role===H)&&(("all"===W||e.status===W)&&("all"===J||e.restaurantId===J)))}),$e=["Foodcourt General","Foodcourt Manager","Brand General","Brand Manager"],Ie={total:I.length,systemAdmin:I.filter(e=>"System Admin"===e.role).length,restaurantAdmin:I.filter(e=>"Restaurant Admin"===e.role).length,staff:I.filter(e=>"Staff"===e.role).length,managers:I.filter(e=>$e.includes(e.role)).length,active:I.filter(e=>"active"===e.status).length,totalSalary:I.filter(e=>e.salary).reduce((e,a)=>e+(a.salary||0),0)},Ue=()=>{ue(!1),be(""),re(null),Y(""),Me({username:"",name:"",email:"",phone:"",type:"restaurant_staff",role:"",department:"",restaurantId:"",companyName:"",salary:"",pin_code:""})},Te=(e,a)=>{Me(n=>{const t={...n,[e]:a};if("role"===e)switch(a){case"Staff":case"Restaurant Admin":t.type="restaurant_staff";break;case"System Admin":t.type="our_staff";break;default:t.type="company_staff"}return t}),"role"===e&&"Restaurant Admin"!==a&&"Staff"!==a&&(re(null),Y(""),ee([]),ne(!1))},Ge=()=>{ye(!1),Ae(null),Fe([])},[He,Le]=(0,t.useState)(!1),[We,qe]=(0,t.useState)(null),[Je,Ke]=(0,t.useState)(!1),[Ze,Qe]=(0,t.useState)(null),[Xe,Ye]=(0,t.useState)(null),Ve=()=>{Le(!1),qe(null)},ea=()=>{xe(!1),ve(null)},aa=e=>{if(!e)return"?";const a=e.trim().split(" ").filter(e=>e.length>0);return 0===a.length?"?":1===a.length?a[0].substring(0,2).toUpperCase():a.slice(0,2).map(e=>e[0]).join("").toUpperCase()},na=Array.from(new Map(I.filter(e=>e.restaurantId&&e.restaurantName&&""!==e.restaurantName.trim()).map(e=>[e.restaurantId,{id:e.restaurantId,name:e.restaurantName}])).values()),ta=Array.from(new Set(I.map(e=>e.role))).filter(e=>"Manager"!==e);return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)(s.hE,{children:a("admin:staffManagementPage.staffManagement")}),(0,h.jsxs)(s.ex,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>{const e=(e=>{if(0===e.length)return"";const a=Object.keys(e[0]);return[a.join(","),...e.map(e=>a.map(a=>{const n=e[a];return"string"===typeof n&&(n.includes(",")||n.includes('"')||n.includes("\n"))?`"${n.replace(/"/g,'""')}"`:n||""}).join(","))].join("\n")})(Oe.map(e=>({"Staff Member":e.name,Email:e.email,"Company & Location":`${e.companyName} - ${e.restaurantName||"Head Office"}`,Role:e.role,Department:e.department,Status:e.status,Salary:e.salary?(0,c.vv)(e.salary,n.currency):"N/A",Phone:e.phone,"Join Date":e.joinDate,"Last Active":e.lastActive}))),a=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`staff-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:a("admin:staffManagementPage.export")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{ue(!0)},children:"Add Staff"})]})]}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{color:"#059669",children:[(0,h.jsx)(s.Os,{children:Ie.total}),(0,h.jsx)(s.v0,{children:a("admin:staffManagementPage.totalStaff")}),(0,h.jsx)(s.d1,{children:a("admin:staffManagementPage.acrossEntireSystem")})]}),(0,h.jsxs)(s.hI,{color:"#2563EB",children:[(0,h.jsx)(s.Os,{children:Ie.managers}),(0,h.jsx)(s.v0,{children:a("admin:staffManagementPage.managers")}),(0,h.jsx)(s.d1,{children:"4 manager roles"})]}),(0,h.jsxs)(s.hI,{color:"#7C3AED",children:[(0,h.jsx)(s.Os,{children:Ie.active}),(0,h.jsx)(s.v0,{children:a("admin:staffManagementPage.activeStaff")}),(0,h.jsxs)(s.d1,{children:[Math.round(Ie.active/Ie.total*100),"% of total"]})]}),(0,h.jsxs)(s.hI,{color:"#D97706",children:[(0,h.jsx)(s.Os,{children:(0,c.vv)(Ie.totalSalary,n.currency)}),(0,h.jsx)(s.v0,{children:a("admin:staffManagementPage.monthlyPayroll")}),(0,h.jsx)(s.d1,{children:a("admin:staffManagementPage.allStaffCombined")})]})]}),(0,h.jsxs)(i.tU,{children:[(0,h.jsxs)(i.oz,{active:"all"===r,onClick:()=>u("all"),children:["All Staff ",(0,h.jsx)(i.Ex,{count:Ie.total,showZero:!0})]}),(0,h.jsxs)(i.oz,{active:"System Admin"===r,onClick:()=>u("System Admin"),children:["System Admin ",(0,h.jsx)(i.Ex,{count:Ie.systemAdmin||0,showZero:!0})]}),(0,h.jsxs)(i.oz,{active:"Managers"===r,onClick:()=>u("Managers"),children:["Managers ",(0,h.jsx)(i.Ex,{count:Ie.managers||0,showZero:!0})]}),(0,h.jsxs)(i.oz,{active:"Restaurant Admin"===r,onClick:()=>u("Restaurant Admin"),children:["Restaurant Admin ",(0,h.jsx)(i.Ex,{count:Ie.restaurantAdmin||0,showZero:!0})]}),(0,h.jsxs)(i.oz,{active:"Staff"===r,onClick:()=>u("Staff"),children:["Staff ",(0,h.jsx)(i.Ex,{count:Ie.staff||0,showZero:!0})]})]}),(0,h.jsxs)(d.Qn,{children:[(0,h.jsxs)(d.Jt,{value:H,onChange:e=>L(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:a("admin:staffManagementPage.allRoles")}),ta.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]}),(0,h.jsxs)(d.Jt,{value:W,onChange:e=>q(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:a("admin:staffManagementPage.allStatus")}),(0,h.jsx)("option",{value:"active",children:a("admin:staffManagementPage.active")}),(0,h.jsx)("option",{value:"inactive",children:a("admin:staffManagementPage.inactive")})]}),(0,h.jsxs)(d.Jt,{value:J,onChange:e=>K(e.target.value),style:{display:"all"===r||"Restaurant Admin"===r||"Staff"===r?"block":"none"},children:[(0,h.jsx)("option",{value:"all",children:a("admin:staffManagementPage.allRestaurants")}),na.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,h.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, or restaurant...",value:T,onChange:e=>G(e.target.value)})]}),(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(g,{columns:"2fr 2fr 1.2fr 1.2fr 0.8fr 1fr 200px",children:[(0,h.jsx)("span",{className:"col-info",children:a("admin:staffManagementPage.staffMember")}),(0,h.jsx)("span",{className:"col-info",children:a("admin:staffManagementPage.companyLocation")}),(0,h.jsx)("span",{children:a("admin:staffManagementPage.role")}),(0,h.jsx)("span",{children:a("admin:staffManagementPage.department")}),(0,h.jsx)("span",{children:a("admin:staffManagementPage.status")}),(0,h.jsx)("span",{className:"col-salary",children:a("admin:staffManagementPage.salary")}),(0,h.jsx)("span",{className:"col-action",children:a("admin:staffManagementPage.actions")})]}),0===Oe.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or add new staff members"})]}):Oe.map(e=>(0,h.jsxs)(y,{columns:"2fr 2fr 1.2fr 1.2fr 0.8fr 1fr 200px",children:[(0,h.jsxs)(j,{className:"col-info",children:[(0,h.jsx)(v,{role:e.role,children:aa(e.name)}),(0,h.jsxs)(S,{children:[(0,h.jsxs)(A,{children:[e.name,e.is_demo&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#F59E0B",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a("admin:staffManagementPage.demo")}),e.is_test&&(0,h.jsx)("span",{style:{fontSize:"10px",fontWeight:600,color:"#fff",background:"#8B5CF6",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:a("admin:staffManagementPage.test")})]}),(0,h.jsxs)(w,{children:[e.username," \u2022 ",e.email]})]})]}),(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:a("admin:staffManagementPage.companyLocation")}),(0,h.jsx)("div",{style:{fontSize:"13px",fontWeight:"600",color:"#0A2540",marginBottom:"2px"},children:e.companyName}),(0,h.jsx)("div",{style:{fontSize:"11px",color:"#6B7280"},children:e.restaurantName||"Head Office"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:a("admin:staffManagementPage.role")}),(0,h.jsx)(F,{role:e.role,children:e.role})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:a("admin:staffManagementPage.department")}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.department})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:a("admin:staffManagementPage.status")}),(0,h.jsx)(C,{status:e.status,children:"active"===e.status?"Active":"Inactive"})]}),(0,h.jsxs)(s.Uj,{className:"col-salary",children:[(0,h.jsx)(s.PM,{children:a("admin:staffManagementPage.salary")}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#374151",fontWeight:"600"},children:e.salary?(0,c.vv)(e.salary,n.currency):"N/A"})]})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.rA,{onClick:()=>(e=>{if(ve(e),e.restaurantId){const a=Z.find(a=>a.id===e.restaurantId);a&&(ie(a.name),fe(a))}else ie(""),fe(null);xe(!0)})(e),children:"Edit"}),(0,h.jsx)(s.K0,{onClick:()=>(e=>{Ye(e),Qe("toggle"),Ke(!0)})(e),title:"active"===e.status?"Deactivate Staff":"Activate Staff",children:(0,h.jsx)(M,{children:"active"===e.status?"\u2297":"\u25c9"})}),(0,h.jsx)(s.K0,{onClick:()=>(e=>{Ye(e),Qe("resetPassword"),Ke(!0)})(e),title:"Reset Password",children:(0,h.jsx)(M,{children:"\u26b7"})}),"System Admin"!==e.role&&(0,h.jsx)(s.K0,{onClick:()=>(async e=>{qe(e),Le(!0)})(e),title:"Delete Staff",children:(0,h.jsx)(M,{children:"\xd7"})})]})]},e.id))]})]}),pe&&(0,h.jsxs)(s.aF,{isOpen:!0,onClose:Ue,title:"Add Staff",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:Ue,children:a("admin:staffManagementPage.cancel")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(be(""),!Ce.role)return void be("Role selection is required");if(!Ce.username||""===Ce.username.trim())return void be("Staff ID (Username) is required");if(!Ce.name||""===Ce.name.trim())return void be("Full Name is required");if(!Ce.email||""===Ce.email.trim())return void be("Email address is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Ce.email))if("Restaurant Admin"!==Ce.role&&"Staff"!==Ce.role||te||Ce.restaurantId)try{const e={username:Ce.username.trim(),email:Ce.email.trim(),role:Ce.role,full_name:Ce.name.trim(),phone:Ce.phone?Ce.phone.trim():null,department:Ce.department?Ce.department.trim():null,company_name:Ce.companyName?Ce.companyName.trim():null,restaurant_id:Ce.restaurantId?parseInt(Ce.restaurantId):null,manager_id:null};Ce.pin_code&&4===Ce.pin_code.length&&(e.pin_code=Ce.pin_code),console.log("\ud83d\udd04 [Admin] Creating new staff user:",e);const a=await fetch("/api/users",{method:"POST",headers:x(),body:JSON.stringify(e)});if(!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to create staff:",e),void be(e.error||"Failed to create staff. Please try again.")}const n=await a.json();console.log("\u2705 [Admin] Staff created successfully:",n),Ue(),_e(`Staff member "${Ce.username}" created successfully.`),Ne(n.generatedPassword||""),De(!1),Be(!0);const t=await fetch("/api/users",{headers:x()});if(t.ok){const e=await t.json(),a=await fetch("/api/restaurants",{headers:x()}),n=a.ok?await a.json():[],r={};Array.isArray(n)&&n.forEach(e=>{r[e.id]={name:e.name,company:e.company_name||"OrderHere"}});const s=e.data||e;if(!Array.isArray(s))throw console.error("Invalid users data format:",e),new Error("Invalid users data format");const i=s.map(e=>{var a;let n,t,s="OrderHere";if("System Admin"===e.role)n="our_staff",s=e.company_name||"Purple Here";else if(["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(e.role))n="company_staff",s=e.company_name||"Purple Here";else if("Restaurant Admin"===e.role||"Staff"===e.role)if(e.restaurant_id){n="restaurant_staff";const a=r[e.restaurant_id];t=e.restaurant_name||(null===a||void 0===a?void 0:a.name)||"Unknown Restaurant",s=(null===a||void 0===a?void 0:a.company)||"Purple Here"}else n="our_staff";else n="company_staff";return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",type:n,role:e.role,department:e.department||"",pin_code:e.pin_code||null,restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),restaurantName:t,companyName:s,status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",salary:0,permissions:e.permissions||[]}});U(i)}}catch(e){console.error("Error creating staff:",e),be("An error occurred while creating staff. Please try again.")}else be("Please select a restaurant for Restaurant Admin and Staff roles");else be("Please enter a valid email address")},children:a("admin:staffManagementPage.addStaff")})]}),children:[(0,h.jsxs)(P,{children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Role *"}),(0,h.jsxs)(E,{value:Ce.role,onChange:e=>Te("role",e.target.value),children:[(0,h.jsx)("option",{value:"",children:a("admin:staffManagementPage.selectRole")}),(0,h.jsx)("option",{value:"Staff",children:a("admin:staffManagementPage.staff")}),(0,h.jsx)("option",{value:"Restaurant Admin",children:a("admin:staffManagementPage.restaurantAdmin")}),(0,h.jsx)("option",{value:"Foodcourt Manager",children:a("admin:staffManagementPage.foodcourtManager")}),(0,h.jsx)("option",{value:"Foodcourt General",children:a("admin:staffManagementPage.foodcourtGeneral")}),(0,h.jsx)("option",{value:"Brand Manager",children:a("admin:staffManagementPage.brandManager")}),(0,h.jsx)("option",{value:"Brand General",children:a("admin:staffManagementPage.brandGeneral")}),(0,h.jsx)("option",{value:"System Admin",children:a("admin:staffManagementPage.systemAdmin")})]})]}),"Restaurant Admin"===Ce.role&&(0,h.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"12px 16px",background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:"8px",fontSize:"13px",color:"#92400E",lineHeight:"1.5"},children:[(0,h.jsx)("strong",{children:"Note:"})," Restaurant Admin accounts are normally created automatically when registering a new restaurant (Restaurants page > Add Restaurant). Creating one here will require manually assigning a restaurant afterwards."]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Staff ID (Username) *"}),(0,h.jsx)(B,{type:"text",value:Ce.username,onChange:e=>Te("username",e.target.value),placeholder:"Enter unique staff ID"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"6px",padding:"8px",background:"#F3F4F6",borderRadius:"4px"},children:"\u2139\ufe0f A strong password will be auto-generated and shown after creation"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Full Name *"}),(0,h.jsx)(B,{type:"text",value:Ce.name,onChange:e=>Te("name",e.target.value),placeholder:"Enter full name"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Email *"}),(0,h.jsx)(B,{type:"email",value:Ce.email,onChange:e=>Te("email",e.target.value),placeholder:"Enter email address",required:!0})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.phone")}),(0,h.jsx)(f.A,{value:Ce.phone,onChange:e=>Te("phone",e)})]}),("foodcourt_manager"===Ce.role||"foodcourt_general"===Ce.role||"brand_manager"===Ce.role||"brand_general"===Ce.role)&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.companyName")}),(0,h.jsx)(B,{type:"text",value:Ce.companyName||"",onChange:e=>Te("companyName",e.target.value),placeholder:"Enter company name"})]}),("Restaurant Admin"===Ce.role||"Staff"===Ce.role)&&(0,h.jsxs)(b,{style:{position:"relative"},children:[(0,h.jsx)(k,{children:"Restaurant *"}),(0,h.jsx)(_,{type:"text",value:X,onChange:e=>(e=>{if(Y(e),ne(!0),e.length<1)return void ee(Z.slice(0,10));const a=Z.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));ee(a.slice(0,10))})(e.target.value),onFocus:()=>{ne(!0),0===X.length&&ee(Z.slice(0,10))},onBlur:()=>setTimeout(()=>ne(!1),200),placeholder:"Type to search for restaurants"}),ae&&V.length>0&&(0,h.jsx)(R,{children:V.map(e=>(0,h.jsxs)(N,{onClick:()=>(e=>{re(e),Y(e.name),ne(!1),Me(a=>({...a,restaurantId:e.id}))})(e),children:[(0,h.jsx)(z,{children:e.name}),(0,h.jsx)(D,{children:e.address||"No address provided"})]},e.id))}),te&&(0,h.jsxs)(O,{children:["\u2713 Selected: ",(0,h.jsx)("strong",{children:te.name})]})]}),"System Admin"===Ce.role&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.companyName")}),(0,h.jsx)(B,{type:"text",value:Ce.companyName||"",onChange:e=>Te("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.department")}),(0,h.jsx)(B,{type:"text",value:Ce.department,onChange:e=>Te("department",e.target.value),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===Ce.role||"Staff"===Ce.role)&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.pinCode4Digits")}),(0,h.jsx)(B,{type:"text",inputMode:"numeric",maxLength:4,value:Ce.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");Te("pin_code",a)},placeholder:"e.g. 1234",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.monthlySalaryRm")}),(0,h.jsx)(B,{type:"number",value:Ce.salary,onChange:e=>Te("salary",e.target.value),placeholder:"Enter monthly salary"})]})]}),Pe&&(0,h.jsx)($,{style:{marginTop:"16px"},children:Pe})]}),he&&(0,h.jsx)(s.aF,{isOpen:!0,onClose:ea,title:"Edit Staff Member",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:ea,children:a("admin:staffManagementPage.cancel")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(!je)return;if(!je.name||""===je.name.trim())return void alert("Full Name is required");if(!je.email||""===je.email.trim())return void alert("Email is required");if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(je.email))if(je.role)try{console.log("\ud83d\udd04 [Admin] Updating staff:",je);const e={full_name:je.name.trim(),email:je.email.trim(),role:je.role,department:je.department?je.department.trim():null,phone:je.phone?je.phone.trim():null};je.pin_code&&4===je.pin_code.length&&(e.pin_code=je.pin_code),console.log("\ud83d\udcdd [Admin] Request data:",e);const a=await fetch(`/api/users/${je.id}`,{method:"PUT",headers:x(),body:JSON.stringify(e)});if(console.log("\ud83d\udcdd [Admin] Response status:",a.status),!a.ok){const e=await a.json();return console.error("\u274c [Admin] Failed to update staff:",e),void alert(`Failed to update staff: ${e.error||"Unknown error"}`)}const n=await a.json();console.log("\u2705 [Admin] Update successful:",n),xe(!1),ve(null);const t=await fetch(`/api/users/${je.id}`,{headers:x()});if(t.ok){const e=await t.json(),a=e.data||e,n=await fetch("/api/restaurants",{headers:x()}),r=n.ok?await n.json():[],s={};let i;Array.isArray(r)&&r.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";U(e=>e.map(e=>e.id===je.id?{...e,name:a.full_name,email:a.email,role:a.role,department:a.department,phone:a.phone,pin_code:a.pin_code||null,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("\u274c [Admin] Error updating staff:",e),alert(`\uc2a4\ud0ed \uc815\ubcf4 \uc5c5\ub370\uc774\ud2b8 \uc5d0\ub7ec: ${e.message}`)}else alert("Role is required");else alert("Please enter a valid email address")},children:a("admin:staffManagementPage.updateStaff")})]}),children:je&&(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(P,{children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Role *"}),(0,h.jsxs)(E,{value:je.role,onChange:e=>ve({...je,role:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:a("admin:staffManagementPage.selectRole")}),(0,h.jsx)("option",{value:"Staff",children:a("admin:staffManagementPage.staff")}),(0,h.jsx)("option",{value:"Restaurant Admin",children:a("admin:staffManagementPage.restaurantAdmin")}),(0,h.jsx)("option",{value:"Foodcourt Manager",children:a("admin:staffManagementPage.foodcourtManager")}),(0,h.jsx)("option",{value:"Foodcourt General",children:a("admin:staffManagementPage.foodcourtGeneral")}),(0,h.jsx)("option",{value:"Brand Manager",children:a("admin:staffManagementPage.brandManager")}),(0,h.jsx)("option",{value:"Brand General",children:a("admin:staffManagementPage.brandGeneral")}),(0,h.jsx)("option",{value:"System Admin",children:a("admin:staffManagementPage.systemAdmin")})]})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.staffIdUsername")}),(0,h.jsx)(B,{type:"text",value:je.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Full Name *"}),(0,h.jsx)(B,{type:"text",value:je.name,onChange:e=>ve({...je,name:e.target.value}),placeholder:"Enter full name"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:"Email *"}),(0,h.jsx)(B,{type:"email",value:je.email,onChange:e=>ve({...je,email:e.target.value}),placeholder:"Enter email address",required:!0})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.phone")}),(0,h.jsx)(f.A,{value:je.phone,onChange:e=>ve({...je,phone:e})})]}),"Manager"===je.role&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.companyName")}),(0,h.jsx)(B,{type:"text",value:je.companyName||"",onChange:e=>ve({...je,companyName:e.target.value}),placeholder:"Enter company name"})]}),("Restaurant Admin"===je.role||"Staff"===je.role)&&(0,h.jsxs)(b,{style:{position:"relative"},children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.restaurant")}),(0,h.jsx)(_,{type:"text",value:se,onChange:e=>(e=>{if(ie(e),ce(!0),e.length<1)return void le(Z.slice(0,10));const a=Z.filter(a=>a.name&&a.name.toLowerCase().includes(e.toLowerCase()));le(a.slice(0,10))})(e.target.value),onFocus:()=>{ce(!0),0===se.length&&le(Z.slice(0,10))},onBlur:()=>setTimeout(()=>ce(!1),200),placeholder:"Type to search for restaurants"}),de&&oe.length>0&&(0,h.jsx)(R,{children:oe.map(e=>(0,h.jsxs)(N,{onClick:()=>(e=>{fe(e),ie(e.name),ce(!1),ve(a=>({...a,restaurantId:e.id}))})(e),children:[(0,h.jsx)(z,{children:e.name}),(0,h.jsx)(D,{children:e.address||"No address provided"})]},e.id))}),me&&(0,h.jsxs)(O,{children:["\u2713 Selected: ",(0,h.jsx)("strong",{children:me.name})]})]}),"System Admin"===je.role&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.companyName")}),(0,h.jsx)(B,{type:"text",value:je.companyName||"",onChange:e=>ve({...je,companyName:e.target.value}),placeholder:"Enter company name"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.department")}),(0,h.jsx)(B,{type:"text",value:je.department,onChange:e=>ve({...je,department:e.target.value}),placeholder:"e.g. Operations, Service, Kitchen, Management"})]}),("Restaurant Admin"===je.role||"Staff"===je.role)&&(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.pinCode4Digits")}),(0,h.jsx)(B,{type:"text",inputMode:"numeric",maxLength:4,value:je.pin_code||"",onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ve({...je,pin_code:a})},placeholder:je.pin_code?"****":"Enter PIN",autoComplete:"off",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(k,{children:a("admin:staffManagementPage.monthlySalaryRm")}),(0,h.jsx)(B,{type:"number",value:(null===(e=je.salary)||void 0===e?void 0:e.toString())||"",onChange:e=>ve({...je,salary:parseFloat(e.target.value)||0}),placeholder:"Enter monthly salary"})]})]})})}),ge&&(0,h.jsx)(s.aF,{isOpen:!0,onClose:Ge,title:"Permission Management",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:Ge,children:a("admin:staffManagementPage.cancel")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Se)try{console.log("\ud83d\udd04 [Admin] Updating permissions for user:",Se.id,"New role:",Se.role);const e=await fetch(`/api/users/${Se.id}`,{method:"PUT",headers:x(),body:JSON.stringify({role:Se.role})});if(!e.ok){const a=await e.json();return console.error("\u274c [Admin] Failed to update permissions:",a),void alert(`\uad8c\ud55c \uc5c5\ub370\uc774\ud2b8 \uc2e4\ud328: ${a.error||"Unknown error"}`)}const a=await e.json();console.log("\u2705 [Admin] Permissions update successful:",a),ye(!1),Ae(null);const n=await fetch(`/api/users/${Se.id}`,{headers:x()});if(n.ok){const e=await n.json(),a=e.data||e,t=await fetch("/api/restaurants",{headers:x()}),r=t.ok?await t.json():[],s={};let i;Array.isArray(r)&&r.forEach(e=>{s[e.id]={name:e.name,company:e.company_name||"OrderHere"}});let o,l="OrderHere";const d=["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"];if("System Admin"===a.role)i="our_staff",l=a.company_name||"OrderHere";else if(d.includes(a.role))i="company_staff",l=a.company_name||"OrderHere";else if("Restaurant Admin"===a.role||"Staff"===a.role)if(a.restaurant_id){i="restaurant_staff";const e=s[a.restaurant_id];o=a.restaurant_name||(null===e||void 0===e?void 0:e.name)||"Unknown Restaurant",l=(null===e||void 0===e?void 0:e.company)||"Purple Here"}else i="our_staff";else i="company_staff";U(e=>e.map(e=>e.id===Se.id?{...e,role:a.role,permissions:we,type:i,companyName:l,restaurantName:o}:e))}else window.location.reload()}catch(e){console.error("Error updating role:",e)}},children:a("admin:staffManagementPage.changeRole")})]}),children:Se&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{style:{marginBottom:"24px"},children:(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,h.jsx)(v,{role:Se.role,children:aa(Se.name)}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:Se.name}),(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Se.role," - ",Se.companyName]})]})]})}),(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsx)("h3",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Select Role"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"16px"},children:"Select an appropriate role. Each role includes predefined permissions."}),(0,h.jsx)("div",{style:{display:"grid",gap:"12px"},children:[{role:"Staff",title:"General Staff",description:"Basic POS system usage",permissions:["POS System","Order Processing","Customer Service"],color:"#059669"},{role:"Restaurant Admin",title:"Restaurant Manager",description:"Overall restaurant operations management",permissions:["POS System","Menu Management","Order Management","Staff Management","Sales Reports"],color:"#DC2626"},{role:"System Admin",title:"System Administrator",description:"Full system management",permissions:["Full System Management","All User Management","Subscription Management","Invoice Management","System Settings"],color:"#DC2626"}].map((e,a)=>(0,h.jsxs)("div",{onClick:()=>{Se&&(Ae({...Se,role:e.role}),Fe(e.permissions))},style:{padding:"16px",backgroundColor:(null===Se||void 0===Se?void 0:Se.role)===e.role?"#F0F4FF":"#F8FAFC",borderRadius:"8px",border:(null===Se||void 0===Se?void 0:Se.role)===e.role?"2px solid #635BFF":"1px solid #E6EBF1",cursor:"pointer",transition:"all 0.2s"},children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[(0,h.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:e.color,marginRight:"12px"}}),(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.title}),(null===Se||void 0===Se?void 0:Se.role)===e.role&&(0,h.jsx)("span",{style:{marginLeft:"auto",color:"#635BFF",fontSize:"14px"},children:"\u2713"})]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px"},children:e.description}),(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#374151"},children:[(0,h.jsx)("strong",{children:"Included Permissions:"}),(0,h.jsx)("div",{style:{marginTop:"4px",fontSize:"11px",color:"#6B7280"},children:e.permissions.join(", ")})]})]},a))})]})]})}),He&&We&&(0,h.jsx)(s.aF,{isOpen:!0,onClose:Ve,title:"Delete Staff",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:Ve,children:a("admin:staffManagementPage.cancel")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(We){try{console.log(`\ud83d\udd04 [Admin] Deleting staff: ${We.name}...`);(await fetch(`/api/users/${We.id}`,{method:"DELETE",headers:x()})).ok?U(e=>e.filter(e=>e.id!==We.id)):console.error("Failed to delete staff")}catch(e){console.error("Error deleting staff:",e)}Le(!1),qe(null)}},style:{backgroundColor:"#DC2626",borderColor:"#EF4444"},children:a("admin:staffManagementPage.delete")})]}),children:(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,h.jsx)(v,{role:We.role,children:aa(We.name)}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:We.name}),(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[We.role," - ",We.companyName]})]})]}),(0,h.jsxs)("div",{style:{padding:"16px",backgroundColor:"#FEF2F2",borderRadius:"8px",border:"1px solid #FECACA"},children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,h.jsx)("span",{style:{color:"#DC2626",fontSize:"16px"},children:"\u26a0"}),(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#DC2626"},children:"Are you sure you want to delete?"})]}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#991B1B",lineHeight:"1.6"},children:["Restaurant Admin"===We.role?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 The restaurant's admin will be unlinked (restaurant remains)"}),(0,h.jsx)("div",{children:"\u2022 Orders processed by this admin will keep their records"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{children:"\u2022 This staff account will be permanently deleted"}),(0,h.jsx)("div",{children:"\u2022 POS cashier sessions by this staff will keep their records"}),(0,h.jsx)("div",{children:"\u2022 Activity logs will be preserved (user reference cleared)"})]}),(0,h.jsx)("div",{style:{marginTop:"8px",fontWeight:"600"},children:a("admin:staffManagementPage.thisActionCannotBeUndone")})]})]})]})}),Je&&Xe&&(0,h.jsx)(s.aF,{isOpen:!0,onClose:()=>Ke(!1),title:"Confirm Action",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>Ke(!1),children:a("admin:staffManagementPage.cancel")}),(0,h.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Xe&&Ze){try{if("toggle"===Ze){const e="active"===Xe.status?"inactive":"active",a=await fetch(`/api/users/${Xe.id}`,{method:"PUT",headers:x(),body:JSON.stringify({status:e})});if(!a.ok){const e=await a.json();throw new Error(e.error||"Status update failed")}U(a=>a.map(a=>a.id===Xe.id?{...a,status:e}:a)),alert(`Staff ${"active"===e?"activated":"deactivated"} successfully`)}else if("resetPassword"===Ze){const e=await fetch(`/api/users/${Xe.id}/reset-password`,{method:"POST",headers:x()});if(!e.ok){const a=await e.json();throw new Error(a.error||"Password reset failed")}{const a=await e.json();_e(`Password for "${Xe.username||Xe.email}" has been reset.`),Ne(a.tempPassword||""),De(!1),Be(!0)}}}catch(e){console.error("\u274c Action failed:",e),alert(`Action failed: ${e.message}. Please try again.`)}Ke(!1),Ye(null),Qe(null)}},children:"toggle"===Ze?"Confirm":"Reset Password"})]}),children:(0,h.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,h.jsx)(v,{role:Xe.role,children:aa(Xe.name)}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Xe.name}),(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:[Xe.role," - ",Xe.companyName]})]})]}),(0,h.jsxs)("div",{style:{padding:"16px",backgroundColor:"#F3F4F6",borderRadius:"8px"},children:[(0,h.jsxs)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#374151",marginBottom:"8px"},children:["toggle"===Ze&&("active"===Xe.status?"Deactivate":"Activate")+" Staff Member?","resetPassword"===Ze&&"Reset Password?"]}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.4"},children:["toggle"===Ze&&`This will ${"active"===Xe.status?"deactivate":"activate"} ${Xe.name}'s account.`,"resetPassword"===Ze&&`This will reset ${Xe.name}'s password. A new strong password will be generated.`]})]})]})}),ke&&(0,h.jsxs)(s.aF,{isOpen:!0,onClose:()=>Be(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[Re&&(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Re),De(!0),setTimeout(()=>De(!1),2e3)},children:ze?"Copied!":"Copy Password"}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>Be(!1),children:a("admin:staffManagementPage.done")})]}),children:[(0,h.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[Ee," Please share this password securely. They should change it after first login."]}),Re&&(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:a("admin:staffManagementPage.temporaryPassword")}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Re})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:a("admin:staffManagementPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})})}}}]);