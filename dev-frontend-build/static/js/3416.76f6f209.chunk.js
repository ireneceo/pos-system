"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{2488:(e,t,a)=>{a.d(t,{DO:()=>d,Jt:()=>p,Qn:()=>l});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
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
`,o=n.Ay.input`
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
`,s=n.Ay.select`
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
`,l=e=>{let{children:t,className:a,style:n,...o}=e;return(0,r.jsx)(i,{className:a,style:n,...o,children:t})},d=e=>{let{placeholder:t="Search...",...a}=e;return(0,r.jsx)(o,{placeholder:t,...a})},p=e=>{let{children:t,...a}=e;return(0,r.jsx)(s,{...a,children:t})}},3416:(e,t,a)=>{a.r(t),a.d(t,{default:()=>$});var n=a(9950),r=a(4752),i=a(2853),o=a(1367),s=a(8409),l=a(9610),d=a(2488),p=a(8666),c=a(4414);const x=[{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],m=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=r.Ay.div`
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
`,u=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,f=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,g=r.Ay.button`
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
`,y=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,w=r.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,b=r.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  th:first-child { text-align: left; }
  th:last-child { text-align: right; }
`,v=r.Ay.tr`
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
`,F=r.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;
  text-align: center;

  &:first-child { text-align: left; }
  &:last-child { text-align: right; }

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
`,C=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,S=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
  white-space: nowrap;
`,A=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=r.Ay.div`
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
`,E=r.Ay.div`
  flex: 1;
  min-width: 0;
`,B=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,_=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,O=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,R=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`,I=r.Ay.button`
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
`,D=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`,P=r.Ay.label`
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
`,N=r.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,$=()=>{const{user:e}=(0,o.As)(),[t,a]=(0,n.useState)([]),[r,$]=(0,n.useState)(""),[T,M]=(0,n.useState)(""),[Q,Z]=(0,n.useState)(!1),[L,q]=(0,n.useState)({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),[U,J]=(0,n.useState)(!1),[W,K]=(0,n.useState)(null),[Y,G]=(0,n.useState)({name:"",email:"",phone:"",department:"",company_name:"",pin_code:"",permissions:[]}),[H,X]=(0,n.useState)(""),[V,ee]=(0,n.useState)(!1),[te,ae]=(0,n.useState)(!1),[ne,re]=(0,n.useState)(""),[ie,oe]=(0,n.useState)(null),[se,le]=(0,n.useState)(""),de=(0,n.useCallback)(async()=>{try{const t=null===e||void 0===e?void 0:e.restaurantId,n={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},r=await fetch("/api/users",{headers:n});if(r.ok){const e=await r.json(),n=e.data||e,i=n.filter(e=>{var a;return e.restaurant_id===t||(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())===(null===t||void 0===t?void 0:t.toString())}).map(e=>{var t;return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"",pin_code:e.pin_code||null,company_name:e.company_name||"",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{let t=e.permissions;if(!t)return[];for(let e=0;e<5&&"string"===typeof t;e++)try{t=JSON.parse(t)}catch{return[]}return Array.isArray(t)?t.filter(e=>"string"===typeof e&&e.length>1):[]})()}});a(i)}}catch(t){}},[e]);(0,n.useEffect)(()=>{e?de():a([])},[e,de]);const pe=t.filter(e=>{if(r){const t=r.toLowerCase();if(!e.name.toLowerCase().includes(t)&&!e.email.toLowerCase().includes(t)&&!e.department.toLowerCase().includes(t))return!1}return!T||e.role===T}),ce={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},xe=()=>{Z(!1),le("")},me=(e,t)=>{q(a=>({...a,[e]:t})),se&&le("")},he=()=>{J(!1),K(null),le("")},ue=(e,t)=>{G(a=>({...a,[e]:t})),se&&le("")},fe=(e,t)=>(0,c.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"4px"},children:"Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile."}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Toggle additional menu sections below:"}),(0,c.jsx)(D,{children:x.map(a=>(0,c.jsxs)(P,{alwaysOn:a.alwaysOn,children:[(0,c.jsx)("input",{type:"checkbox",checked:a.alwaysOn||e.includes(a.key),disabled:a.alwaysOn,onChange:n=>{if(a.alwaysOn)return;const r=n.target.checked?[...e,a.key]:e.filter(e=>e!==a.key);t(r)},style:{accentColor:"#635BFF"}}),a.label,a.alwaysOn&&(0,c.jsx)(N,{children:"(Always ON)"})]},a.key))})]});return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(m,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Restaurant Staff"}),(0,c.jsx)(f,{children:(0,c.jsx)(g,{variant:"primary",onClick:()=>{q({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),le(""),Z(!0)},children:"Add Staff"})})]}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{color:"#059669",children:[(0,c.jsx)(s.Os,{children:ce.total}),(0,c.jsx)(s.v0,{children:"Total Staff"})]}),(0,c.jsxs)(s.hI,{color:"#7C3AED",children:[(0,c.jsx)(s.Os,{children:ce.active}),(0,c.jsx)(s.v0,{children:"Active Staff"})]}),(0,c.jsxs)(s.hI,{color:"#DC2626",children:[(0,c.jsx)(s.Os,{children:ce.admins}),(0,c.jsx)(s.v0,{children:"Admins"})]}),(0,c.jsxs)(s.hI,{color:"#2563EB",children:[(0,c.jsx)(s.Os,{children:ce.staff}),(0,c.jsx)(s.v0,{children:"Staff Members"})]})]}),(0,c.jsxs)(d.Qn,{children:[(0,c.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, department...",value:r,onChange:e=>$(e.target.value),autoComplete:"off"}),(0,c.jsxs)(d.Jt,{value:T,onChange:e=>M(e.target.value),children:[(0,c.jsx)("option",{value:"",children:"All Roles"}),(0,c.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"}),(0,c.jsx)("option",{value:"Staff",children:"Staff"})]})]}),(0,c.jsx)(j,{children:0===pe.length?(0,c.jsxs)(i.pp,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):(0,c.jsxs)(w,{children:[(0,c.jsx)(b,{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Staff Member"}),(0,c.jsx)("th",{children:"Role"}),(0,c.jsx)("th",{children:"Department"}),(0,c.jsx)("th",{children:"PIN"}),(0,c.jsx)("th",{children:"Permissions"}),(0,c.jsx)("th",{children:"Status"}),(0,c.jsx)("th",{children:"Actions"})]})}),(0,c.jsx)("tbody",{children:pe.map(e=>{return(0,c.jsxs)(v,{children:[(0,c.jsx)(F,{"data-label":"Staff Member",children:(0,c.jsxs)(A,{children:[(0,c.jsx)(k,{role:e.role,children:(t=e.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:e.name}),(0,c.jsx)(_,{children:e.email})]})]})}),(0,c.jsx)(F,{"data-label":"Role",children:(0,c.jsx)(z,{role:e.role,children:e.role})}),(0,c.jsx)(F,{"data-label":"Department",children:(0,c.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:e.department||"\u2014"})}),(0,c.jsx)(F,{"data-label":"PIN",children:(0,c.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:e.pin_code?"****":"\u2014"})}),(0,c.jsx)(F,{"data-label":"Permissions",children:"Restaurant Admin"===e.role?(0,c.jsx)(S,{style:{background:"#FEE2E2",color:"#DC2626"},children:"Full Access"}):0===e.permissions.length?(0,c.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"No permissions"}):(0,c.jsx)(C,{children:e.permissions.map(e=>{var t;return(0,c.jsx)(S,{children:(null===(t=x.find(t=>t.key===e))||void 0===t?void 0:t.label.split(" (")[0])||e},e)})})}),(0,c.jsx)(F,{"data-label":"Status",children:(0,c.jsx)(O,{active:"active"===e.status,children:e.status})}),(0,c.jsx)(F,{"data-label":"",children:(0,c.jsxs)(R,{children:[(0,c.jsx)(I,{onClick:()=>(e=>{K(e),G({name:e.name,email:e.email,phone:e.phone,department:e.department,company_name:e.company_name||"",pin_code:e.pin_code||"",permissions:[...e.permissions]}),le(""),J(!0)})(e),children:"Edit"}),"Staff"===e.role&&(0,c.jsx)(I,{onClick:()=>oe(e),children:"Reset PW"})]})})]},e.id);var t})})]})})]}),(0,c.jsxs)(l.aF,{isOpen:Q,onClose:xe,title:"Add New Staff Member",size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:xe,children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(L.username&&""!==L.username.trim())if(L.name&&""!==L.name.trim())if(L.email&&""!==L.email.trim())if(L.pin_code&&4===L.pin_code.length)try{const t=null===e||void 0===e?void 0:e.restaurantId,a={username:L.username.trim(),email:L.email.trim(),role:L.role,full_name:L.name.trim(),restaurant_id:parseInt((null===t||void 0===t?void 0:t.toString())||"0"),phone:L.phone?L.phone.trim():null,department:L.department?L.department.trim():null,company_name:L.company_name?L.company_name.trim():null,pin_code:L.pin_code,permissions:"Staff"===L.role?L.permissions:[]},n=localStorage.getItem("auth_token"),r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(a)});if(r.ok){const e=await r.json();await de();const t=e.generatedPassword;xe(),t&&(X(t),ee(!0))}else{const e=await r.json();le(e.error||"Failed to create staff")}}catch(t){le(t.message)}else le("A 4-digit PIN code is required for POS cashier switch.");else le("Email is required.");else le("Full Name is required.");else le("Staff ID (Username) is required.")},children:"Add Staff"})]}),children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff ID (Username) *"}),(0,c.jsx)(l.ZQ,{type:"text",value:L.username,onChange:e=>me("username",e.target.value),placeholder:"Enter unique staff ID",autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:L.name,onChange:e=>me("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:L.email,onChange:e=>me("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:L.phone,onChange:e=>me("phone",e)})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Role"}),(0,c.jsxs)(l.FX,{value:L.role,onChange:e=>me("role",e.target.value),children:[(0,c.jsx)("option",{value:"Staff",children:"Staff"}),(0,c.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Department"}),(0,c.jsx)(l.ZQ,{type:"text",value:L.department,onChange:e=>me("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Company Name"}),(0,c.jsx)(l.ZQ,{type:"text",value:L.company_name,onChange:e=>me("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"PIN Code (4 digits) *"}),(0,c.jsx)(l.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:L.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");me("pin_code",t)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===L.role&&fe(L.permissions,e=>q(t=>({...t,permissions:e}))),se&&Q&&(0,c.jsx)(l.IM,{children:se})]}),(0,c.jsx)(l.aF,{isOpen:U,onClose:he,title:`Edit Staff: ${(null===W||void 0===W?void 0:W.name)||""}`,size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:he,children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(W)if(Y.name&&""!==Y.name.trim())if(Y.email&&""!==Y.email.trim())if(Y.pin_code&&4!==Y.pin_code.length)le("PIN code must be exactly 4 digits.");else try{const e={full_name:Y.name.trim(),email:Y.email.trim(),phone:Y.phone?Y.phone.trim():null,department:Y.department?Y.department.trim():null,company_name:Y.company_name?Y.company_name.trim():null};Y.pin_code&&(e.pin_code=Y.pin_code),"Staff"===W.role&&(e.permissions=Y.permissions);const t=localStorage.getItem("auth_token"),a=await fetch(`/api/users/${W.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(a.ok)await de(),he();else{const e=await a.json();le(e.error||"Failed to update staff")}}catch(e){le(e.message)}else le("Email is required.");else le("Full Name is required.")},children:"Update Staff"})]}),children:W&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Staff ID (Username)"}),(0,c.jsx)(l.ZQ,{type:"text",value:W.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Role"}),(0,c.jsx)(l.ZQ,{type:"text",value:W.role,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:Y.name,onChange:e=>ue("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:Y.email,onChange:e=>ue("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:Y.phone,onChange:e=>ue("phone",e)})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Department"}),(0,c.jsx)(l.ZQ,{type:"text",value:Y.department,onChange:e=>ue("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Company Name"}),(0,c.jsx)(l.ZQ,{type:"text",value:Y.company_name,onChange:e=>ue("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"PIN Code (4 digits)"}),(0,c.jsx)(l.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:Y.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");ue("pin_code",t)},placeholder:W.pin_code?"****":"Enter new PIN",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]})]}),"Staff"===W.role&&fe(Y.permissions,e=>G(t=>({...t,permissions:e}))),se&&U&&(0,c.jsx)(l.IM,{children:se})]})}),(0,c.jsxs)(l.aF,{isOpen:V,onClose:()=>ee(!1),title:"Password Generated",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(H),ae(!0),setTimeout(()=>ae(!1),2e3)},children:te?"Copied!":"Copy Password"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>ee(!1),children:"Done"})]}),children:[(0,c.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the staff member. They should change it after first login."}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:H})]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,c.jsx)(l.aF,{isOpen:!!ne,onClose:()=>re(""),title:"Notice",size:"small",footer:(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>re(""),children:"OK"}),children:(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ne})}),(0,c.jsxs)(l.aF,{isOpen:!!ie,onClose:()=>oe(null),title:"Reset Password",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>oe(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{const e=ie;if(e){oe(null);try{const t=localStorage.getItem("auth_token"),a=await fetch(`/api/users/${e.id}/reset-password`,{method:"POST",headers:{Authorization:`Bearer ${t}`}});if(a.ok){const e=await a.json();e.tempPassword&&(X(e.tempPassword),ee(!0))}else{const e=await a.json();re(e.error||"Failed to reset password")}}catch(t){re(t.message)}}},children:"Reset"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,c.jsx)("strong",{children:null===ie||void 0===ie?void 0:ie.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}}}]);