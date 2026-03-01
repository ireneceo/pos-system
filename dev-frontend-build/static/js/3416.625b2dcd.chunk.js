"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>p,Qn:()=>l});n(9950);var a=n(4752),r=n(4414);const i=a.Ay.div`
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
`,o=a.Ay.input`
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
`,s=a.Ay.select`
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
`,l=e=>{let{children:t,className:n,style:a,...o}=e;return(0,r.jsx)(i,{className:n,style:a,...o,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,r.jsx)(o,{placeholder:t,...n})},p=e=>{let{children:t,...n}=e;return(0,r.jsx)(s,{...n,children:t})}},3416:(e,t,n)=>{n.r(t),n.d(t,{default:()=>R});var a=n(9950),r=n(4752),i=n(1367),o=n(7960),s=n(9610),l=n(2488),d=n(8666),p=n(4414);const c=[{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],m=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,x=r.Ay.div`
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
`,h=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,u=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,f=r.Ay.button`
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
`,g=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`,v=r.Ay.div`
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
`,w=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=r.Ay.div`
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
`,C=r.Ay.div`
  flex: 1;
  min-width: 0;
`,b=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,S=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,k=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,E=r.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,B=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,_=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`,O=r.Ay.label`
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
`,z=r.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,R=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,a.useState)([]),[r,R]=(0,a.useState)(""),[I,P]=(0,a.useState)(""),[D,N]=(0,a.useState)(!1),[$,T]=(0,a.useState)({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),[Q,M]=(0,a.useState)(!1),[Z,L]=(0,a.useState)(null),[U,q]=(0,a.useState)({name:"",email:"",phone:"",department:"",company_name:"",pin_code:"",permissions:[]}),[J,W]=(0,a.useState)(""),[K,G]=(0,a.useState)(!1),[H,X]=(0,a.useState)(!1),[Y,V]=(0,a.useState)(""),[ee,te]=(0,a.useState)(null),[ne,ae]=(0,a.useState)(null),[re,ie]=(0,a.useState)(""),[oe,se]=(0,a.useState)(""),le=(0,a.useCallback)(async()=>{try{const t=null===e||void 0===e?void 0:e.restaurantId,a={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users",{headers:a});if(r.ok){const e=await r.json(),a=e.data||e,i=a.filter(e=>{var n;return e.restaurant_id===t||(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())===(null===t||void 0===t?void 0:t.toString())}).map(e=>{var t;return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"",pin_code:e.pin_code||null,company_name:e.company_name||"",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}});n(i)}}catch(t){}},[e]);(0,a.useEffect)(()=>{e?le():n([])},[e,le]);const de=t.filter(e=>{if(r){const t=r.toLowerCase();if(!e.name.toLowerCase().includes(t)&&!e.email.toLowerCase().includes(t)&&!e.department.toLowerCase().includes(t))return!1}return!I||e.role===I}),pe={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},ce=()=>{N(!1),se("")},me=(e,t)=>{T(n=>({...n,[e]:t})),oe&&se("")},xe=()=>{M(!1),L(null),se("")},he=(e,t)=>{q(n=>({...n,[e]:t})),oe&&se("")},ue=(e,t)=>(0,p.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"4px"},children:"Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile."}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Toggle additional menu sections below:"}),(0,p.jsx)(_,{children:c.map(n=>(0,p.jsxs)(O,{alwaysOn:n.alwaysOn,children:[(0,p.jsx)("input",{type:"checkbox",checked:n.alwaysOn||e.includes(n.key),disabled:n.alwaysOn,onChange:a=>{if(n.alwaysOn)return;const r=a.target.checked?[...e,n.key]:e.filter(e=>e!==n.key);t(r)},style:{accentColor:"#635BFF"}}),n.label,n.alwaysOn&&(0,p.jsx)(z,{children:"(Always ON)"})]},n.key))})]});return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(m,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:"Restaurant Staff"}),(0,p.jsx)(u,{children:(0,p.jsx)(f,{variant:"primary",onClick:()=>{T({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),se(""),N(!0)},children:"Add Staff"})})]}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{color:"#059669",children:[(0,p.jsx)(o.Os,{children:pe.total}),(0,p.jsx)(o.v0,{children:"Total Staff"})]}),(0,p.jsxs)(o.hI,{color:"#7C3AED",children:[(0,p.jsx)(o.Os,{children:pe.active}),(0,p.jsx)(o.v0,{children:"Active Staff"})]}),(0,p.jsxs)(o.hI,{color:"#DC2626",children:[(0,p.jsx)(o.Os,{children:pe.admins}),(0,p.jsx)(o.v0,{children:"Admins"})]}),(0,p.jsxs)(o.hI,{color:"#2563EB",children:[(0,p.jsx)(o.Os,{children:pe.staff}),(0,p.jsx)(o.v0,{children:"Staff Members"})]})]}),(0,p.jsxs)(l.Qn,{children:[(0,p.jsx)(l.DO,{type:"text",placeholder:"Search by name, email, department...",value:r,onChange:e=>R(e.target.value),autoComplete:"off"}),(0,p.jsxs)(l.Jt,{value:I,onChange:e=>P(e.target.value),children:[(0,p.jsx)("option",{value:"",children:"All Roles"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"Staff",children:"Staff"})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(j,{children:[(0,p.jsx)("span",{children:"Staff Member"}),(0,p.jsx)("span",{children:"Role"}),(0,p.jsx)("span",{children:"Department"}),(0,p.jsx)("span",{children:"PIN"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Actions"})]}),0===de.length?(0,p.jsxs)(B,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):de.map(e=>{return(0,p.jsxs)(v,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{role:e.role,children:(t=e.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,p.jsxs)(C,{children:[(0,p.jsx)(b,{children:e.name}),(0,p.jsx)(S,{children:e.email})]})]}),(0,p.jsx)(A,{role:e.role,children:e.role}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.department||"\u2014"}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:e.pin_code?"****":"\u2014"}),(0,p.jsx)(k,{active:"active"===e.status,children:e.status}),(0,p.jsxs)("div",{children:[(0,p.jsx)(E,{onClick:()=>(e=>{L(e),q({name:e.name,email:e.email,phone:e.phone,department:e.department,company_name:e.company_name||"",pin_code:e.pin_code||"",permissions:[...e.permissions]}),se(""),M(!0)})(e),children:"Edit"}),"Staff"===e.role&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(E,{onClick:()=>ae(e),children:"Reset PW"}),(0,p.jsx)(E,{onClick:()=>(e=>{"Restaurant Admin"!==e.role&&te(e)})(e),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote"})]})]})]},e.id);var t})]})]}),(0,p.jsxs)(s.aF,{isOpen:D,onClose:ce,title:"Add New Staff Member",size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:ce,children:"Cancel"}),(0,p.jsx)(s.yl,{variant:"primary",onClick:async()=>{if($.username&&""!==$.username.trim())if($.name&&""!==$.name.trim())if($.email&&""!==$.email.trim())if($.pin_code&&4===$.pin_code.length)try{const t=null===e||void 0===e?void 0:e.restaurantId,n={username:$.username.trim(),email:$.email.trim(),role:$.role,full_name:$.name.trim(),restaurant_id:parseInt((null===t||void 0===t?void 0:t.toString())||"0"),phone:$.phone?$.phone.trim():null,department:$.department?$.department.trim():null,company_name:$.company_name?$.company_name.trim():null,pin_code:$.pin_code,permissions:"Staff"===$.role?JSON.stringify($.permissions):"[]"},a=localStorage.getItem("auth_token"),r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(r.ok){const e=await r.json();await le();const t=e.generatedPassword;ce(),t&&(W(t),G(!0))}else{const e=await r.json();se(e.error||"Failed to create staff")}}catch(t){se(t.message)}else se("A 4-digit PIN code is required for POS cashier switch.");else se("Email is required.");else se("Full Name is required.");else se("Staff ID (Username) is required.")},children:"Add Staff"})]}),children:[(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Staff ID (Username) *"}),(0,p.jsx)(s.ZQ,{type:"text",value:$.username,onChange:e=>me("username",e.target.value),placeholder:"Enter unique staff ID",autoComplete:"off"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Full Name *"}),(0,p.jsx)(s.ZQ,{type:"text",value:$.name,onChange:e=>me("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Email *"}),(0,p.jsx)(s.ZQ,{type:"email",value:$.email,onChange:e=>me("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Phone"}),(0,p.jsx)(d.A,{value:$.phone,onChange:e=>me("phone",e)})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Role"}),(0,p.jsxs)(s.FX,{value:$.role,onChange:e=>me("role",e.target.value),children:[(0,p.jsx)("option",{value:"Staff",children:"Staff"}),(0,p.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Department"}),(0,p.jsx)(s.ZQ,{type:"text",value:$.department,onChange:e=>me("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Company Name"}),(0,p.jsx)(s.ZQ,{type:"text",value:$.company_name,onChange:e=>me("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"PIN Code (4 digits) *"}),(0,p.jsx)(s.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:$.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");me("pin_code",t)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===$.role&&ue($.permissions,e=>T(t=>({...t,permissions:e}))),oe&&D&&(0,p.jsx)(s.IM,{children:oe})]}),(0,p.jsx)(s.aF,{isOpen:Q,onClose:xe,title:`Edit Staff: ${(null===Z||void 0===Z?void 0:Z.name)||""}`,size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:xe,children:"Cancel"}),(0,p.jsx)(s.yl,{variant:"primary",onClick:async()=>{if(Z)if(U.name&&""!==U.name.trim())if(U.email&&""!==U.email.trim())if(U.pin_code&&4!==U.pin_code.length)se("PIN code must be exactly 4 digits.");else try{const e={full_name:U.name.trim(),email:U.email.trim(),phone:U.phone?U.phone.trim():null,department:U.department?U.department.trim():null,company_name:U.company_name?U.company_name.trim():null};U.pin_code&&(e.pin_code=U.pin_code),"Staff"===Z.role&&(e.permissions=JSON.stringify(U.permissions));const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(n.ok)await le(),xe();else{const e=await n.json();se(e.error||"Failed to update staff")}}catch(e){se(e.message)}else se("Email is required.");else se("Full Name is required.")},children:"Update Staff"})]}),children:Z&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Staff ID (Username)"}),(0,p.jsx)(s.ZQ,{type:"text",value:Z.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Role"}),(0,p.jsx)(s.ZQ,{type:"text",value:Z.role,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Full Name *"}),(0,p.jsx)(s.ZQ,{type:"text",value:U.name,onChange:e=>he("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Email *"}),(0,p.jsx)(s.ZQ,{type:"email",value:U.email,onChange:e=>he("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Phone"}),(0,p.jsx)(d.A,{value:U.phone,onChange:e=>he("phone",e)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Department"}),(0,p.jsx)(s.ZQ,{type:"text",value:U.department,onChange:e=>he("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Company Name"}),(0,p.jsx)(s.ZQ,{type:"text",value:U.company_name,onChange:e=>he("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"PIN Code (4 digits)"}),(0,p.jsx)(s.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:U.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");he("pin_code",t)},placeholder:Z.pin_code?"****":"Enter new PIN",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]})]}),"Staff"===Z.role&&ue(U.permissions,e=>q(t=>({...t,permissions:e}))),oe&&Q&&(0,p.jsx)(s.IM,{children:oe})]})}),(0,p.jsxs)(s.aF,{isOpen:K,onClose:()=>G(!1),title:"Password Generated",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(J),X(!0),setTimeout(()=>X(!1),2e3)},children:H?"Copied!":"Copy Password"}),(0,p.jsx)(s.yl,{variant:"primary",onClick:()=>G(!1),children:"Done"})]}),children:[(0,p.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the staff member. They should change it after first login."}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:J})]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,p.jsx)(s.aF,{isOpen:!!Y,onClose:()=>V(""),title:"Notice",size:"small",footer:(0,p.jsx)(s.yl,{variant:"primary",onClick:()=>V(""),children:"OK"}),children:(0,p.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:Y})}),(0,p.jsxs)(s.aF,{isOpen:!!ne,onClose:()=>ae(null),title:"Reset Password",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>ae(null),children:"Cancel"}),(0,p.jsx)(s.yl,{variant:"primary",onClick:async()=>{const e=ne;if(e){ae(null);try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${e.id}/reset-password`,{method:"POST",headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();e.tempPassword&&(W(e.tempPassword),G(!0))}else{const e=await n.json();V(e.error||"Failed to reset password")}}catch(t){V(t.message)}}},children:"Reset"})]}),children:[(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,p.jsx)("strong",{children:null===ne||void 0===ne?void 0:ne.name}),"?"]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]}),(0,p.jsx)(s.aF,{isOpen:!!ee,onClose:()=>te(null),title:"Promote Staff",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>te(null),children:"Cancel"}),(0,p.jsx)(s.yl,{variant:"primary",onClick:async()=>{const e=ee;if(e){te(null);try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({role:"Restaurant Admin"})});if(n.ok)await le();else{const e=await n.json();V(e.error||"Failed to promote staff")}}catch(t){V(t.message)}}},children:"Promote"})]}),children:(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Promote ",(0,p.jsx)("strong",{children:null===ee||void 0===ee?void 0:ee.name})," to Restaurant Admin?"]})})]})})}}}]);