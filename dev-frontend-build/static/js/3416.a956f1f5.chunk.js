"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{3416:(e,a,t)=>{t.r(a),t.d(a,{default:()=>M});var n=t(9950),s=t(4752),r=t(2853),i=t(1367),l=t(8409),o=t(9610),d=t(2488),c=t(8666),p=t(5030),f=t(9955),x=t(4414);const m=[{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],h=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=s.Ay.div`
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
`,g=s.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,j=s.Ay.button`
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
`,v=s.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,w=s.Ay.table`
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
`,F=s.Ay.thead`
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
`,C=s.Ay.tr`
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
`,S=s.Ay.td`
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
`,A=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,k=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
  white-space: nowrap;
`,E=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,P=s.Ay.div`
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
`,B=s.Ay.div`
  flex: 1;
  min-width: 0;
`,_=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,z=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"staff":return"#059669";default:return"#6B7280"}}};
`,R=s.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,D=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`,I=s.Ay.button`
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
`,$=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
`,N=s.Ay.label`
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
`,T=s.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,M=()=>{const{t:e}=(0,p.Bd)("staff"),{user:a}=(0,i.As)(),[t,s]=(0,n.useState)([]),[M,Q]=(0,n.useState)(""),[Z,L]=(0,n.useState)(""),[q,U]=(0,n.useState)(!1),[W,J]=(0,n.useState)({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),[K,Y]=(0,n.useState)(!1),[G,H]=(0,n.useState)(null),[X,V]=(0,n.useState)({name:"",email:"",phone:"",department:"",company_name:"",pin_code:"",permissions:[]}),[ee,ae]=(0,n.useState)(""),[te,ne]=(0,n.useState)(!1),[se,re]=(0,n.useState)(!1),[ie,le]=(0,n.useState)(""),[oe,de]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(""),fe=(0,n.useCallback)(async()=>{try{const e=null===a||void 0===a?void 0:a.restaurantId,t={Authorization:`Bearer ${(0,f.c4)()}`},n=await fetch("/api/users",{headers:t});if(n.ok){const a=await n.json(),t=a.data||a,r=t.filter(a=>{var t;return a.restaurant_id===e||(null===(t=a.restaurant_id)||void 0===t?void 0:t.toString())===(null===e||void 0===e?void 0:e.toString())}).map(e=>{var a;return{id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"",pin_code:e.pin_code||null,company_name:e.company_name||"",restaurantId:null===(a=e.restaurant_id)||void 0===a?void 0:a.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{let a=e.permissions;if(!a)return[];for(let e=0;e<5&&"string"===typeof a;e++)try{a=JSON.parse(a)}catch{return[]}return Array.isArray(a)?a.filter(e=>"string"===typeof e&&e.length>1):[]})()}});s(r)}}catch(e){}},[a]);(0,n.useEffect)(()=>{a?fe():s([])},[a,fe]);const xe=t.filter(e=>{if(M){const a=M.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a)&&!e.department.toLowerCase().includes(a))return!1}return!Z||e.role===Z}),me={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},he=()=>{U(!1),pe("")},ue=(e,a)=>{J(t=>({...t,[e]:a})),ce&&pe("")},ge=()=>{Y(!1),H(null),pe("")},ye=(e,a)=>{V(t=>({...t,[e]:a})),ce&&pe("")},je=(a,t)=>(0,x.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("staff:staffPage.menuAccess")}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"4px"},children:"Core menus are always visible: Dashboard, POS Terminal, Live Orders, Kitchen Display, Customer Display, Mobile Order, Profile."}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Toggle additional menu sections below:"}),(0,x.jsx)($,{children:m.map(e=>(0,x.jsxs)(N,{alwaysOn:e.alwaysOn,children:[(0,x.jsx)("input",{type:"checkbox",checked:e.alwaysOn||a.includes(e.key),disabled:e.alwaysOn,onChange:n=>{if(e.alwaysOn)return;const s=n.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);t(s)},style:{accentColor:"#635BFF"}}),e.label,e.alwaysOn&&(0,x.jsx)(T,{children:"(Always ON)"})]},e.key))})]});return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(g,{children:e("staff:staffPage.restaurantStaff")}),(0,x.jsx)(y,{children:(0,x.jsx)(j,{variant:"primary",onClick:()=>{J({username:"",name:"",email:"",phone:"",role:"Staff",department:"",company_name:"",pin_code:"",permissions:[]}),pe(""),U(!0)},children:"Add Staff"})})]}),(0,x.jsxs)(v,{children:[(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{color:"#059669",children:[(0,x.jsx)(l.Os,{children:me.total}),(0,x.jsx)(l.v0,{children:e("staff:staffPage.totalStaff")})]}),(0,x.jsxs)(l.hI,{color:"#7C3AED",children:[(0,x.jsx)(l.Os,{children:me.active}),(0,x.jsx)(l.v0,{children:e("staff:staffPage.activeStaff")})]}),(0,x.jsxs)(l.hI,{color:"#DC2626",children:[(0,x.jsx)(l.Os,{children:me.admins}),(0,x.jsx)(l.v0,{children:e("staff:staffPage.admins")})]}),(0,x.jsxs)(l.hI,{color:"#2563EB",children:[(0,x.jsx)(l.Os,{children:me.staff}),(0,x.jsx)(l.v0,{children:e("staff:staffPage.staffMembers")})]})]}),(0,x.jsxs)(d.Qn,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search by name, email, department...",value:M,onChange:e=>Q(e.target.value),autoComplete:"off"}),(0,x.jsxs)(d.Jt,{value:Z,onChange:e=>L(e.target.value),children:[(0,x.jsx)("option",{value:"",children:e("staff:staffPage.allRoles")}),(0,x.jsx)("option",{value:"Restaurant Admin",children:e("staff:staffPage.restaurantAdmin")}),(0,x.jsx)("option",{value:"Staff",children:e("staff:staffPage.staff")})]})]}),(0,x.jsx)(b,{children:0===xe.length?(0,x.jsxs)(r.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):(0,x.jsxs)(w,{children:[(0,x.jsx)(F,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:e("staff:staffPage.staffMember")}),(0,x.jsx)("th",{children:e("staff:staffPage.role")}),(0,x.jsx)("th",{children:e("staff:staffPage.department")}),(0,x.jsx)("th",{children:e("staff:staffPage.pin")}),(0,x.jsx)("th",{children:e("staff:staffPage.permissions")}),(0,x.jsx)("th",{children:e("staff:staffPage.status")}),(0,x.jsx)("th",{children:e("staff:staffPage.actions")})]})}),(0,x.jsx)("tbody",{children:xe.map(a=>{return(0,x.jsxs)(C,{children:[(0,x.jsx)(S,{"data-label":"Staff Member",children:(0,x.jsxs)(E,{children:[(0,x.jsx)(P,{role:a.role,children:(t=a.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,x.jsxs)(B,{children:[(0,x.jsx)(_,{children:a.name}),(0,x.jsx)(z,{children:a.email})]})]})}),(0,x.jsx)(S,{"data-label":"Role",children:(0,x.jsx)(O,{role:a.role,children:a.role})}),(0,x.jsx)(S,{"data-label":"Department",children:(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:a.department||"\u2014"})}),(0,x.jsx)(S,{"data-label":"PIN",children:(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:a.pin_code?"****":"\u2014"})}),(0,x.jsx)(S,{"data-label":"Permissions",children:"Restaurant Admin"===a.role?(0,x.jsx)(k,{style:{background:"#FEE2E2",color:"#DC2626"},children:e("staff:staffPage.fullAccess")}):0===a.permissions.length?(0,x.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("staff:staffPage.noPermissions")}):(0,x.jsx)(A,{children:a.permissions.map(e=>{var a;return(0,x.jsx)(k,{children:(null===(a=m.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,x.jsx)(S,{"data-label":"Status",children:(0,x.jsx)(R,{active:"active"===a.status,children:a.status})}),(0,x.jsx)(S,{"data-label":"",children:(0,x.jsxs)(D,{children:[(0,x.jsx)(I,{onClick:()=>(e=>{H(e),V({name:e.name,email:e.email,phone:e.phone,department:e.department,company_name:e.company_name||"",pin_code:e.pin_code||"",permissions:[...e.permissions]}),pe(""),Y(!0)})(a),children:"Edit"}),"Staff"===a.role&&(0,x.jsx)(I,{onClick:()=>de(a),children:"Reset PW"})]})})]},a.id);var t})})]})})]}),(0,x.jsxs)(o.aF,{isOpen:q,onClose:he,title:"Add New Staff Member",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.yl,{variant:"secondary",onClick:he,children:e("staff:staffPage.cancel")}),(0,x.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(W.username&&""!==W.username.trim())if(W.name&&""!==W.name.trim())if(W.email&&""!==W.email.trim())if(W.pin_code&&4===W.pin_code.length)try{const e=null===a||void 0===a?void 0:a.restaurantId,t={username:W.username.trim(),email:W.email.trim(),role:W.role,full_name:W.name.trim(),restaurant_id:parseInt((null===e||void 0===e?void 0:e.toString())||"0"),phone:W.phone?W.phone.trim():null,department:W.department?W.department.trim():null,company_name:W.company_name?W.company_name.trim():null,pin_code:W.pin_code,permissions:"Staff"===W.role?W.permissions:[]},n=(0,f.c4)(),s=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)});if(s.ok){const e=await s.json();await fe();const a=e.generatedPassword;he(),a&&(ae(a),ne(!0))}else{const e=await s.json();pe(e.error||"Failed to create staff")}}catch(e){pe(e.message)}else pe("A 4-digit PIN code is required for POS cashier switch.");else pe("Email is required.");else pe("Full Name is required.");else pe("Staff ID (Username) is required.")},children:e("staff:staffPage.addStaff")})]}),children:[(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"Staff ID (Username) *"}),(0,x.jsx)(o.ZQ,{type:"text",value:W.username,onChange:e=>ue("username",e.target.value),placeholder:"Enter unique staff ID",autoComplete:"off"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"Full Name *"}),(0,x.jsx)(o.ZQ,{type:"text",value:W.name,onChange:e=>ue("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"Email *"}),(0,x.jsx)(o.ZQ,{type:"email",value:W.email,onChange:e=>ue("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.phone")}),(0,x.jsx)(c.A,{value:W.phone,onChange:e=>ue("phone",e)})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.role")}),(0,x.jsxs)(o.FX,{value:W.role,onChange:e=>ue("role",e.target.value),children:[(0,x.jsx)("option",{value:"Staff",children:e("staff:staffPage.staff")}),(0,x.jsx)("option",{value:"Restaurant Admin",children:e("staff:staffPage.restaurantAdmin")})]})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.department")}),(0,x.jsx)(o.ZQ,{type:"text",value:W.department,onChange:e=>ue("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.companyName")}),(0,x.jsx)(o.ZQ,{type:"text",value:W.company_name,onChange:e=>ue("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"PIN Code (4 digits) *"}),(0,x.jsx)(o.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:W.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ue("pin_code",a)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===W.role&&je(W.permissions,e=>J(a=>({...a,permissions:e}))),ce&&q&&(0,x.jsx)(o.IM,{children:ce})]}),(0,x.jsx)(o.aF,{isOpen:K,onClose:ge,title:`Edit Staff: ${(null===G||void 0===G?void 0:G.name)||""}`,size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.yl,{variant:"secondary",onClick:ge,children:e("staff:staffPage.cancel")}),(0,x.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(G)if(X.name&&""!==X.name.trim())if(X.email&&""!==X.email.trim())if(X.pin_code&&4!==X.pin_code.length)pe("PIN code must be exactly 4 digits.");else try{const e={full_name:X.name.trim(),email:X.email.trim(),phone:X.phone?X.phone.trim():null,department:X.department?X.department.trim():null,company_name:X.company_name?X.company_name.trim():null};X.pin_code&&(e.pin_code=X.pin_code),"Staff"===G.role&&(e.permissions=X.permissions);const a=(0,f.c4)(),t=await fetch(`/api/users/${G.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(e)});if(t.ok)await fe(),ge();else{const e=await t.json();pe(e.error||"Failed to update staff")}}catch(e){pe(e.message)}else pe("Email is required.");else pe("Full Name is required.")},children:e("staff:staffPage.updateStaff")})]}),children:G&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.staffIdUsername")}),(0,x.jsx)(o.ZQ,{type:"text",value:G.username,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.role")}),(0,x.jsx)(o.ZQ,{type:"text",value:G.role,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"Full Name *"}),(0,x.jsx)(o.ZQ,{type:"text",value:X.name,onChange:e=>ye("name",e.target.value),placeholder:"Enter full name",autoComplete:"off"})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:"Email *"}),(0,x.jsx)(o.ZQ,{type:"email",value:X.email,onChange:e=>ye("email",e.target.value),placeholder:"Enter email address",autoComplete:"off"})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.phone")}),(0,x.jsx)(c.A,{value:X.phone,onChange:e=>ye("phone",e)})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.department")}),(0,x.jsx)(o.ZQ,{type:"text",value:X.department,onChange:e=>ye("department",e.target.value),placeholder:"e.g. Operations, Kitchen, Service",autoComplete:"off"})]})]}),(0,x.jsxs)(o.fh,{children:[(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.companyName")}),(0,x.jsx)(o.ZQ,{type:"text",value:X.company_name,onChange:e=>ye("company_name",e.target.value),placeholder:"Enter company name",autoComplete:"off"})]}),(0,x.jsxs)(o.gE,{children:[(0,x.jsx)(o.lR,{children:e("staff:staffPage.pinCode4Digits")}),(0,x.jsx)(o.ZQ,{type:"text",inputMode:"numeric",maxLength:4,value:X.pin_code,onChange:e=>{const a=e.target.value.replace(/[^0-9]/g,"");ye("pin_code",a)},placeholder:G.pin_code?"****":"Enter new PIN",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"},autoComplete:"off"}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Leave empty to keep current PIN"})]})]}),"Staff"===G.role&&je(X.permissions,e=>V(a=>({...a,permissions:e}))),ce&&K&&(0,x.jsx)(o.IM,{children:ce})]})}),(0,x.jsxs)(o.aF,{isOpen:te,onClose:()=>ne(!1),title:"Password Generated",size:"small",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(ee),re(!0),setTimeout(()=>re(!1),2e3)},children:se?"Copied!":"Copy Password"}),(0,x.jsx)(o.yl,{variant:"primary",onClick:()=>ne(!1),children:"Done"})]}),children:[(0,x.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the staff member. They should change it after first login."}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,x.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:ee})]}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,x.jsx)(o.aF,{isOpen:!!ie,onClose:()=>le(""),title:"Notice",size:"small",footer:(0,x.jsx)(o.yl,{variant:"primary",onClick:()=>le(""),children:e("staff:staffPage.ok")}),children:(0,x.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ie})}),(0,x.jsxs)(o.aF,{isOpen:!!oe,onClose:()=>de(null),title:"Reset Password",size:"small",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.yl,{variant:"secondary",onClick:()=>de(null),children:e("staff:staffPage.cancel")}),(0,x.jsx)(o.yl,{variant:"primary",onClick:async()=>{const e=oe;if(e){de(null);try{const a=(0,f.c4)(),t=await fetch(`/api/users/${e.id}/reset-password`,{method:"POST",headers:{Authorization:`Bearer ${a}`}});if(t.ok){const e=await t.json();e.tempPassword&&(ae(e.tempPassword),ne(!0))}else{const e=await t.json();le(e.error||"Failed to reset password")}}catch(a){le(a.message)}}},children:e("staff:staffPage.reset")})]}),children:[(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,x.jsx)("strong",{children:null===oe||void 0===oe?void 0:oe.name}),"?"]}),(0,x.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}}}]);