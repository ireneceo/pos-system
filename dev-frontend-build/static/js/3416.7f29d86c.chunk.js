"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{3416:(e,a,t)=>{t.r(a),t.d(a,{default:()=>T});var n=t(9950),s=t(4752),r=t(2853),i=t(1367),l=t(8409),o=t(9610),d=t(2488),c=t(8666),p=t(5030),f=t(4414);const x=[{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],m=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=s.Ay.div`
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
`,u=s.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,g=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,y=s.Ay.button`
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
`,j=s.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,v=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,b=s.Ay.table`
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
`,w=s.Ay.thead`
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
`,F=s.Ay.tr`
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
`,C=s.Ay.td`
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
`,S=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,A=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
  white-space: nowrap;
`,k=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,E=s.Ay.div`
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
`,P=s.Ay.div`
  flex: 1;
  min-width: 0;
`,B=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,_=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,O=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,I=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`,R=s.Ay.button`
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
`,D=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`,$=s.Ay.label`
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
`,N=s.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,T=()=>{const{t:e}=(0,p.Bd)("staff"),{user:a}=(0,i.As)(),[t,s]=(0,n.useState)([]),[T,M]=(0,n.useState)(""),[Q,Z]=(0,n.useState)(""),[L,q]=(0,n.useState)(!1),[U,W]=(0,n.useState)({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),[J,K]=(0,n.useState)(!1),[Y,G]=(0,n.useState)(null),[H,X]=(0,n.useState)({name:"",email:"",phone:"",department:"",company_name:"",pin_code:"",permissions:[]}),[V,ee]=(0,n.useState)(""),[ae,te]=(0,n.useState)(!1),[ne,se]=(0,n.useState)(!1),[re,ie]=(0,n.useState)(""),[le,oe]=(0,n.useState)(null),[de,ce]=(0,n.useState)(""),pe=(0,n.useCallback)(async()=>{try{const e=null===a||void 0===a?void 0:a.restaurantId,t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/users",{headers:t});if(n.ok){const a=await n.json(),t=a.data||a,r=t.filter(a=>{var t;return a.restaurant_id===e||(null===(t=a.restaurant_id)||void 0===t?void 0:t.toString())===(null===e||void 0===e?void 0:e.toString())}).map(e=>{var a;return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"",pin_code:e.pin_code||null,company_name:e.company_name||"",restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{let a=e.permissions;if(!a)return[];for(let e=0;e<5&&"string"===typeof a;e++)try{a=JSON.parse(a)}catch{return[]}return Array.isArray(a)?a.filter(e=>"string"===typeof e&&e.length>1):[]})()}});s(r)}}catch(e){}},[a]);(0,n.useEffect)(()=>{a?pe():s([])},[a,pe]);const fe=t.filter(e=>{if(T){const a=T.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a)&&!e.department.toLowerCase().includes(a))return!1}return!Q||e.role===Q}),xe={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},me=()=>{q(!1),ce("")},he=(e,a)=>{W(t=>({...t,[e]:a})),de&&ce("")},ue=()=>{K(!1),G(null),ce("")},ge=(e,a)=>{X(t=>({...t,[e]:a})),de&&ce("")},ye=(a,t)=>(0,f.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("staff:staffPage.menuAccess")}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"4px"},children:"Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile."}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Toggle additional menu sections below:"}),(0,f.jsx)(D,{children:x.map(e=>(0,f.jsxs)($,{alwaysOn:e.alwaysOn,children:[(0,f.jsx)("input",{type:"checkbox",checked:e.alwaysOn||a.includes(e.key),disabled:e.alwaysOn,onChange:n=>{if(e.alwaysOn)return;const s=n.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);t(s)},style:{accentColor:"#635BFF"}}),e.label,e.alwaysOn&&(0,f.jsx)(N,{children:"(Always ON)"})]},e.key))})]});return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(m,{children:[(0,f.jsxs)(h,{children:[(0,f.jsx)(u,{children:e("staff:staffPage.restaurantStaff")}),(0,f.jsx)(g,{children:(0,f.jsx)(y,{variant:"primary",onClick:()=>{W({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),ce(""),q(!0)},children:"Add Staff"})})]}),(0,f.jsxs)(j,{children:[(0,f.jsxs)(l.MD,{children:[(0,f.jsxs)(l.hI,{color:"#059669",children:[(0,f.jsx)(l.Os,{children:xe.total}),(0,f.jsx)(l.v0,{children:e("staff:staffPage.totalStaff")})]}),(0,f.jsxs)(l.hI,{color:"#7C3AED",children:[(0,f.jsx)(l.Os,{children:xe.active}),(0,f.jsx)(l.v0,{children:e("staff:staffPage.activeStaff")})]}),(0,f.jsxs)(l.hI,{color:"#DC2626",children:[(0,f.jsx)(l.Os,{children:xe.admins}),(0,f.jsx)(l.v0,{children:e("staff:staffPage.admins")})]}),(0,f.jsxs)(l.hI,{color:"#2563EB",children:[(0,f.jsx)(l.Os,{children:xe.staff}),(0,f.jsx)(l.v0,{children:e("staff:staffPage.staffMembers")})]})]}),(0,f.jsxs)(d.Qn,{children:[(0,f.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, department...",value:T,onChange:e=>M(e.target.value),autoComplete:"off"}),(0,f.jsxs)(d.Jt,{value:Q,onChange:e=>Z(e.target.value),children:[(0,f.jsx)("option",{value:"",children:e("staff:staffPage.allRoles")}),(0,f.jsx)("option",{value:"Restaurant Admin",children:e("staff:staffPage.restaurantAdmin")}),(0,f.jsx)("option",{value:"Staff",children:e("staff:staffPage.staff")})]})]}),(0,f.jsx)(v,{children:0===fe.length?(0,f.jsxs)(r.pp,{children:[(0,f.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,f.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):(0,f.jsxs)(b,{children:[(0,f.jsx)(w,{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:e("staff:staffPage.staffMember")}),(0,f.jsx)("th",{children:e("staff:staffPage.role")}),(0,f.jsx)("th",{children:e("staff:staffPage.department")}),(0,f.jsx)("th",{children:e("staff:staffPage.pin")}),(0,f.jsx)("th",{children:e("staff:staffPage.permissions")}),(0,f.jsx)("th",{children:e("staff:staffPage.status")}),(0,f.jsx)("th",{children:e("staff:staffPage.actions")})]})}),(0,f.jsx)("tbody",{children:fe.map(a=>{return(0,f.jsxs)(F,{children:[(0,f.jsx)(C,{"data-label":"Staff Member",children:(0,f.jsxs)(k,{children:[(0,f.jsx)(E,{role:a.role,children:(t=a.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,f.jsxs)(P,{children:[(0,f.jsx)(B,{children:a.name}),(0,f.jsx)(_,{children:a.email})]})]})}),(0,f.jsx)(C,{"data-label":"Role",children:(0,f.jsx)(z,{role:a.role,children:a.role})}),(0,f.jsx)(C,{"data-label":"Department",children:(0,f.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:a.department||"\u2014"})}),(0,f.jsx)(C,{"data-label":"PIN",children:(0,f.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:a.pin_code?"****":"\u2014"})}),(0,f.jsx)(C,{"data-label":"Permissions",children:"Restaurant Admin"===a.role?(0,f.jsx)(A,{style:{background:"#FEE2E2",color:"#DC2626"},children:e("staff:staffPage.fullAccess")}):0===a.permissions.length?(0,f.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("staff:staffPage.noPermissions")}):(0,f.jsx)(S,{children:a.permissions.map(e=>{var a;return(0,f.jsx)(A,{children:(null===(a=x.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,f.jsx)(C,{"data-label":"Status",children:(0,f.jsx)(O,{active:"active"===a.status,children:a.status})}),(0,f.jsx)(C,{"data-label":"",children:(0,f.jsxs)(I,{children:[(0,f.jsx)(R,{onClick:()=>(e=>{G(e),X({name:e.name,email:e.email,phone:e.phone,department:e.department,company_name:e.company_name||"",pin_code:e.pin_code||"",permissions:[...e.permissions]}),ce(""),K(!0)})(a),children:"Edit"}),"Staff"===a.role&&(0,f.jsx)(R,{onClick:()=>oe(a),children:"Reset PW"})]})})]},a.id);var t})})]})})]}),(0,f.jsxs)(o.aF,{isOpen:L,onClose:me,title:"Add New Staff Member",size:"large",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o.yl,{variant:"secondary",onClick:me,children:e("staff:staffPage.cancel")}),(0,f.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(U.username&&""!==U.username.trim())if(U.name&&""!==U.name.trim())if(U.email&&""!==U.email.trim())if(U.pin_code&&4===U.pin_code.length)try{const e=null===a||void 0===a?void 0:a.restaurantId,t={username:U.username.trim(),email:U.email.trim(),role:U.role,full_name:U.name.trim(),restaurant_id:parseInt((null===e||void 0===e?void 0:e.toString())||"0"),phone:U.phone?U.phone.trim():null,department:U.department?U.department.trim():null,company_name:U.company_name?U.company_name.trim():null,pin_code:U.pin_code,permissions:"Staff"===U.role?U.permissions:[]},n=localStorage.getItem("auth_token"),s=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)});if(s.ok){const e=await s.json();await pe();const a=e.generatedPassword;me(),a&&(ee(a),te(!0))}else{const e=await s.json();ce(e.error||"Failed to create staff")}}catch(e){ce(e.message)}else ce("A 4-digit PIN code is required for POS cashier switch.");else ce("Email is required.");else ce("Full Name is required.");else ce("Staff ID (Username) is required.")},children:e("staff:staffPage.addStaff")})]}),children:[(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Staff ID (Username) *"}),(0,f.jsx)(o.ZQ,{type:"text",value:U.username,onChange:e=>he("username",e.target.value),placeholder:"Enter unique staff ID",autoComplete:"off"}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Full Name *"}),(0,f.jsx)(o.ZQ,{type:"text",value:U.name,onChange:e=>he("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Email *"}),(0,f.jsx)(o.ZQ,{type:"email",value:U.email,onChange:e=>he("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.phone")}),(0,f.jsx)(c.A,{value:U.phone,onChange:e=>he("phone",e)})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.role")}),(0,f.jsxs)(o.FX,{value:U.role,onChange:e=>he("role",e.target.value),children:[(0,f.jsx)("option",{value:"Staff",children:e("staff:staffPage.staff")}),(0,f.jsx)("option",{value:"Restaurant Admin",children:e("staff:staffPage.restaurantAdmin")})]})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.department")}),(0,f.jsx)(o.ZQ,{type:"text",value:U.department,onChange:e=>he("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.companyName")}),(0,f.jsx)(o.ZQ,{type:"text",value:U.company_name,onChange:e=>he("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"PIN Code (4 digits) *"}),(0,f.jsx)(o.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:U.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");he("pin_code",a)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===U.role&&ye(U.permissions,e=>W(a=>({...a,permissions:e}))),de&&L&&(0,f.jsx)(o.IM,{children:de})]}),(0,f.jsx)(o.aF,{isOpen:J,onClose:ue,title:`Edit Staff: ${(null===Y||void 0===Y?void 0:Y.name)||""}`,size:"large",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o.yl,{variant:"secondary",onClick:ue,children:e("staff:staffPage.cancel")}),(0,f.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(Y)if(H.name&&""!==H.name.trim())if(H.email&&""!==H.email.trim())if(H.pin_code&&4!==H.pin_code.length)ce("PIN code must be exactly 4 digits.");else try{const e={full_name:H.name.trim(),email:H.email.trim(),phone:H.phone?H.phone.trim():null,department:H.department?H.department.trim():null,company_name:H.company_name?H.company_name.trim():null};H.pin_code&&(e.pin_code=H.pin_code),"Staff"===Y.role&&(e.permissions=H.permissions);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/users/${Y.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(e)});if(t.ok)await pe(),ue();else{const e=await t.json();ce(e.error||"Failed to update staff")}}catch(e){ce(e.message)}else ce("Email is required.");else ce("Full Name is required.")},children:e("staff:staffPage.updateStaff")})]}),children:Y&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.staffIdUsername")}),(0,f.jsx)(o.ZQ,{type:"text",value:Y.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.role")}),(0,f.jsx)(o.ZQ,{type:"text",value:Y.role,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Full Name *"}),(0,f.jsx)(o.ZQ,{type:"text",value:H.name,onChange:e=>ge("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Email *"}),(0,f.jsx)(o.ZQ,{type:"email",value:H.email,onChange:e=>ge("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.phone")}),(0,f.jsx)(c.A,{value:H.phone,onChange:e=>ge("phone",e)})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.department")}),(0,f.jsx)(o.ZQ,{type:"text",value:H.department,onChange:e=>ge("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,f.jsxs)(o.fh,{children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.companyName")}),(0,f.jsx)(o.ZQ,{type:"text",value:H.company_name,onChange:e=>ge("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:e("staff:staffPage.pinCode4Digits")}),(0,f.jsx)(o.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:H.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ge("pin_code",a)},placeholder:Y.pin_code?"****":"Enter new PIN",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]})]}),"Staff"===Y.role&&ye(H.permissions,e=>X(a=>({...a,permissions:e}))),de&&J&&(0,f.jsx)(o.IM,{children:de})]})}),(0,f.jsxs)(o.aF,{isOpen:ae,onClose:()=>te(!1),title:"Password Generated",size:"small",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(V),se(!0),setTimeout(()=>se(!1),2e3)},children:ne?"Copied!":"Copy Password"}),(0,f.jsx)(o.yl,{variant:"primary",onClick:()=>te(!1),children:"Done"})]}),children:[(0,f.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the staff member. They should change it after first login."}),(0,f.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,f.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:V})]}),(0,f.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,f.jsx)(o.aF,{isOpen:!!re,onClose:()=>ie(""),title:"Notice",size:"small",footer:(0,f.jsx)(o.yl,{variant:"primary",onClick:()=>ie(""),children:e("staff:staffPage.ok")}),children:(0,f.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:re})}),(0,f.jsxs)(o.aF,{isOpen:!!le,onClose:()=>oe(null),title:"Reset Password",size:"small",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(o.yl,{variant:"secondary",onClick:()=>oe(null),children:e("staff:staffPage.cancel")}),(0,f.jsx)(o.yl,{variant:"primary",onClick:async()=>{const e=le;if(e){oe(null);try{const a=localStorage.getItem("auth_token"),t=await fetch(`/api/users/${e.id}/reset-password`,{method:"POST",headers:{Authorization:`Bearer ${a}`}});if(t.ok){const e=await t.json();e.tempPassword&&(ee(e.tempPassword),te(!0))}else{const e=await t.json();ie(e.error||"Failed to reset password")}}catch(a){ie(a.message)}}},children:e("staff:staffPage.reset")})]}),children:[(0,f.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,f.jsx)("strong",{children:null===le||void 0===le?void 0:le.name}),"?"]}),(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}}}]);