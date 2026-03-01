"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>c,Qn:()=>d});var a=n(8819),r=(n(9950),n(4752)),i=n(4414);const o=r.Ay.div`
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
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${a.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
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
`,l=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
  }

  &:disabled {
    background: ${a.w.colors.surfaceHover};
    color: ${a.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:n,style:a,...r}=e;return(0,i.jsx)(o,{className:n,style:a,...r,children:t})},p=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(s,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,i.jsx)(l,{...n,children:t})}},3416:(e,t,n)=>{n.r(t),n.d(t,{default:()=>$});var a=n(8819),r=n(9950),i=n(4752),o=n(1367),s=n(2674),l=n(9610),d=n(2488),p=n(8666),c=n(4414);const m=[{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],x=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=i.Ay.div`
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
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,f=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,g=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F6F9FC"};
    transform: translateY(-1px);
  }
`,y=i.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${a.w.colors.border};
  overflow: hidden;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  background: ${a.w.colors.surfaceHover};
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
`,b=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,C=i.Ay.div`
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
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,S=i.Ay.div`
  flex: 1;
  min-width: 0;
`,F=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,k=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,E=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,_=i.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: ${a.w.colors.text.muted};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: ${a.w.colors.primary};
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,B=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,O=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`,z=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: ${e=>e.alwaysOn?"#F0FDF4":"white"};
  border: 1px solid ${e=>e.alwaysOn?"#BBF7D0":"#E6EBF1"};
  cursor: ${e=>e.alwaysOn?"default":"pointer"};
  font-size: 13px;
  color: ${e=>e.alwaysOn?"#166534":"#374151"};
  opacity: ${e=>e.alwaysOn?.8:1};
  transition: all 0.15s;

  &:hover {
    border-color: ${e=>e.alwaysOn?"#BBF7D0":"#635BFF"};
  }
`,R=i.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,$=()=>{var e,t,n;const{user:a}=(0,o.As)(),[i,$]=(0,r.useState)([]),[I,P]=(0,r.useState)(""),[D,N]=(0,r.useState)(""),[T,Q]=(0,r.useState)(!1),[M,L]=(0,r.useState)({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),[Z,U]=(0,r.useState)(!1),[q,J]=(0,r.useState)(null),[W,K]=(0,r.useState)({name:"",email:"",phone:"",department:"",company_name:"",pin_code:"",permissions:[]}),[H,G]=(0,r.useState)(""),[X,Y]=(0,r.useState)(!1),[V,ee]=(0,r.useState)(!1),[te,ne]=(0,r.useState)(""),[ae,re]=(0,r.useState)(null),[ie,oe]=(0,r.useState)(null),[se,le]=(0,r.useState)(""),[de,pe]=(0,r.useState)(""),ce=(0,r.useCallback)(async()=>{try{const e=null===a||void 0===a?void 0:a.restaurantId,t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/users",{headers:t});if(n.ok){const t=await n.json(),a=t.data||t,r=a.filter(t=>{var n;return t.restaurant_id===e||(null===(n=t.restaurant_id)||void 0===n?void 0:n.toString())===(null===e||void 0===e?void 0:e.toString())}).map(e=>{var t;return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"",pin_code:e.pin_code||null,company_name:e.company_name||"",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}});$(r)}}catch(e){}},[a]);(0,r.useEffect)(()=>{a?ce():$([])},[a,ce]);const me=i.filter(e=>{if(I){const t=I.toLowerCase();if(!e.name.toLowerCase().includes(t)&&!e.email.toLowerCase().includes(t)&&!e.department.toLowerCase().includes(t))return!1}return!D||e.role===D}),xe={total:i.length,active:i.filter(e=>"active"===e.status).length,admins:i.filter(e=>"Restaurant Admin"===e.role).length,staff:i.filter(e=>"Staff"===e.role).length},he=()=>{Q(!1),pe("")},ue=(e,t)=>{L(n=>({...n,[e]:t})),de&&pe("")},fe=()=>{U(!1),J(null),pe("")},ge=(e,t)=>{K(n=>({...n,[e]:t})),de&&pe("")},ye=(e,t)=>(0,c.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"4px"},children:"Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile."}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Toggle additional menu sections below:"}),(0,c.jsx)(O,{children:m.map(n=>(0,c.jsxs)(z,{alwaysOn:n.alwaysOn,children:[(0,c.jsx)("input",{type:"checkbox",checked:n.alwaysOn||e.includes(n.key),disabled:n.alwaysOn,onChange:a=>{if(n.alwaysOn)return;const r=a.target.checked?[...e,n.key]:e.filter(e=>e!==n.key);t(r)},style:{accentColor:"#635BFF"}}),n.label,n.alwaysOn&&(0,c.jsx)(R,{children:"(Always ON)"})]},n.key))})]});return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Restaurant Staff"}),(0,c.jsx)(f,{children:(0,c.jsx)(g,{variant:"primary",onClick:()=>{L({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),pe(""),Q(!0)},children:"Add Staff"})})]}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{color:"#059669",children:[(0,c.jsx)(s.Os,{children:xe.total}),(0,c.jsx)(s.v0,{children:"Total Staff"})]}),(0,c.jsxs)(s.hI,{color:"#7C3AED",children:[(0,c.jsx)(s.Os,{children:xe.active}),(0,c.jsx)(s.v0,{children:"Active Staff"})]}),(0,c.jsxs)(s.hI,{color:"#DC2626",children:[(0,c.jsx)(s.Os,{children:xe.admins}),(0,c.jsx)(s.v0,{children:"Admins"})]}),(0,c.jsxs)(s.hI,{color:"#2563EB",children:[(0,c.jsx)(s.Os,{children:xe.staff}),(0,c.jsx)(s.v0,{children:"Staff Members"})]})]}),(0,c.jsxs)(d.Qn,{children:[(0,c.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, department...",value:I,onChange:e=>P(e.target.value),autoComplete:"off"}),(0,c.jsxs)(d.Jt,{value:D,onChange:e=>N(e.target.value),children:[(0,c.jsx)("option",{value:"",children:"All Roles"}),(0,c.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,c.jsx)("option",{value:"Staff",children:"Staff"})]})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)("span",{children:"Staff Member"}),(0,c.jsx)("span",{children:"Role"}),(0,c.jsx)("span",{children:"Department"}),(0,c.jsx)("span",{children:"PIN"}),(0,c.jsx)("span",{children:"Status"}),(0,c.jsx)("span",{children:"Actions"})]}),0===me.length?(0,c.jsxs)(B,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):me.map(e=>{return(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(C,{role:e.role,children:(t=e.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,c.jsxs)(S,{children:[(0,c.jsx)(F,{children:e.name}),(0,c.jsx)(k,{children:e.email})]})]}),(0,c.jsx)(A,{role:e.role,children:e.role}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.department||"\u2014"}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:e.pin_code?"****":"\u2014"}),(0,c.jsx)(E,{active:"active"===e.status,children:e.status}),(0,c.jsxs)("div",{children:[(0,c.jsx)(_,{onClick:()=>(e=>{J(e),K({name:e.name,email:e.email,phone:e.phone,department:e.department,company_name:e.company_name||"",pin_code:e.pin_code||"",permissions:[...e.permissions]}),pe(""),U(!0)})(e),children:"Edit"}),"Staff"===e.role&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(_,{onClick:()=>oe(e),children:"Reset PW"}),(0,c.jsx)(_,{onClick:()=>(e=>{"Restaurant Admin"!==e.role&&re(e)})(e),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote"})]})]})]},e.id);var t})]})]}),(0,c.jsxs)(l.aF,{isOpen:T,onClose:he,title:"Add New Staff Member",size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:he,children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(M.username&&""!==M.username.trim())if(M.name&&""!==M.name.trim())if(M.email&&""!==M.email.trim())if(M.pin_code&&4===M.pin_code.length)try{const e=null===a||void 0===a?void 0:a.restaurantId,t={username:M.username.trim(),email:M.email.trim(),role:M.role,full_name:M.name.trim(),restaurant_id:parseInt((null===e||void 0===e?void 0:e.toString())||"0"),phone:M.phone?M.phone.trim():null,department:M.department?M.department.trim():null,company_name:M.company_name?M.company_name.trim():null,pin_code:M.pin_code,permissions:"Staff"===M.role?JSON.stringify(M.permissions):"[]"},n=localStorage.getItem("auth_token"),r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)});if(r.ok){const e=await r.json();await ce();const t=e.generatedPassword;he(),t&&(G(t),Y(!0))}else{const e=await r.json();pe(e.error||"Failed to create staff")}}catch(e){pe(e.message)}else pe("A 4-digit PIN code is required for POS cashier switch.");else pe("Email is required.");else pe("Full Name is required.");else pe("Staff ID (Username) is required.")},disabled:!M.name.trim()||!M.username.trim()||!M.email.trim(),children:"Add Staff"})]}),children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff ID (Username) *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.username,onChange:e=>ue("username",e.target.value),placeholder:"Enter unique staff ID",autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.name,onChange:e=>ue("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:M.email,onChange:e=>ue("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:M.phone,onChange:e=>ue("phone",e)})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Role"}),(0,c.jsxs)(l.FX,{value:M.role,onChange:e=>ue("role",e.target.value),children:[(0,c.jsx)("option",{value:"Staff",children:"Staff"}),(0,c.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Department"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.department,onChange:e=>ue("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Company Name"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.company_name,onChange:e=>ue("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"PIN Code (4 digits) *"}),(0,c.jsx)(l.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:M.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");ue("pin_code",t)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===M.role&&ye(M.permissions,e=>L(t=>({...t,permissions:e}))),de&&T&&(0,c.jsx)(l.IM,{children:de})]}),(0,c.jsx)(l.aF,{isOpen:Z,onClose:fe,title:`Edit Staff: ${(null===q||void 0===q?void 0:q.name)||""}`,size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:fe,children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(q)if(W.name&&""!==W.name.trim())if(W.email&&""!==W.email.trim())if(W.pin_code&&4!==W.pin_code.length)pe("PIN code must be exactly 4 digits.");else try{const e={full_name:W.name.trim(),email:W.email.trim(),phone:W.phone?W.phone.trim():null,department:W.department?W.department.trim():null,company_name:W.company_name?W.company_name.trim():null};W.pin_code&&(e.pin_code=W.pin_code),"Staff"===q.role&&(e.permissions=JSON.stringify(W.permissions));const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(n.ok)await ce(),fe();else{const e=await n.json();pe(e.error||"Failed to update staff")}}catch(e){pe(e.message)}else pe("Email is required.");else pe("Full Name is required.")},disabled:!(null!==q&&void 0!==q&&null!==(e=q.name)&&void 0!==e&&e.trim())||!(null!==q&&void 0!==q&&null!==(t=q.username)&&void 0!==t&&t.trim())||!(null!==q&&void 0!==q&&null!==(n=q.email)&&void 0!==n&&n.trim()),children:"Update Staff"})]}),children:q&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff ID (Username)"}),(0,c.jsx)(l.ZQ,{type:"text",value:q.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Role"}),(0,c.jsx)(l.ZQ,{type:"text",value:q.role,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:W.name,onChange:e=>ge("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:W.email,onChange:e=>ge("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:W.phone,onChange:e=>ge("phone",e)})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Department"}),(0,c.jsx)(l.ZQ,{type:"text",value:W.department,onChange:e=>ge("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Company Name"}),(0,c.jsx)(l.ZQ,{type:"text",value:W.company_name,onChange:e=>ge("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"PIN Code (4 digits)"}),(0,c.jsx)(l.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:W.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");ge("pin_code",t)},placeholder:q.pin_code?"****":"Enter new PIN",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]})]}),"Staff"===q.role&&ye(W.permissions,e=>K(t=>({...t,permissions:e}))),de&&Z&&(0,c.jsx)(l.IM,{children:de})]})}),(0,c.jsxs)(l.aF,{isOpen:X,onClose:()=>Y(!1),title:"Password Generated",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(H),ee(!0),setTimeout(()=>ee(!1),2e3)},children:V?"Copied!":"Copy Password"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>Y(!1),children:"Done"})]}),children:[(0,c.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the staff member. They should change it after first login."}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:H})]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,c.jsx)(l.aF,{isOpen:!!te,onClose:()=>ne(""),title:"Notice",size:"small",footer:(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>ne(""),children:"OK"}),children:(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:te})}),(0,c.jsxs)(l.aF,{isOpen:!!ie,onClose:()=>oe(null),title:"Reset Password",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>oe(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{const e=ie;if(e){oe(null);try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${e.id}/reset-password`,{method:"POST",headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();e.tempPassword&&(G(e.tempPassword),Y(!0))}else{const e=await n.json();ne(e.error||"Failed to reset password")}}catch(t){ne(t.message)}}},children:"Reset"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,c.jsx)("strong",{children:null===ie||void 0===ie?void 0:ie.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]}),(0,c.jsx)(l.aF,{isOpen:!!ae,onClose:()=>re(null),title:"Promote Staff",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>re(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{const e=ae;if(e){re(null);try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({role:"Restaurant Admin"})});if(n.ok)await ce();else{const e=await n.json();ne(e.error||"Failed to promote staff")}}catch(t){ne(t.message)}}},children:"Promote"})]}),children:(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Promote ",(0,c.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name})," to Restaurant Admin?"]})})]})})}}}]);