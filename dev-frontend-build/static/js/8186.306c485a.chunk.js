"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8186],{8186:(e,a,n)=>{n.r(a),n.d(a,{default:()=>R});var t=n(9950),r=n(4752),s=n(2853),i=n(1367),o=n(8409),l=n(9610),d=n(2488),c=n(8666),p=n(5030),m=n(4414);const h=[{key:"dashboard",label:"Dashboard",alwaysOn:!0},{key:"management",label:"Management (Brands / Restaurants / Staff)",alwaysOn:!1},{key:"products",label:"Products & Inventory (Products / Recipes / Suppliers / Inventory)",alwaysOn:!1},{key:"operations",label:"Operations (Invoices / Reports / Performance)",alwaysOn:!1},{key:"communication",label:"Communication (Notices / Inquiries)",alwaysOn:!1},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)",alwaysOn:!1}],x=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,g=r.Ay.div`
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
`,f=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=r.Ay.div`
  display: flex;
  gap: 12px;
`,y=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: #FEF2F2;\n    color: #EF4444;\n    border: 1px solid #EF4444;\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=r.Ay.div`
  padding: 32px;
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
`,v=r.Ay.thead`
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
`,F=r.Ay.tr`
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
`,S=r.Ay.td`
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
`,k=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,C=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,E=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
  white-space: nowrap;
`,P=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,B=r.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,z=r.Ay.button`
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
`,O=(0,r.Ay)(z)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,$=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,D=r.Ay.label`
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
`,T=r.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,R=()=>{const{t:e}=(0,p.Bd)("common"),{user:a}=(0,i.As)(),[n,r]=(0,t.useState)([]),[R,I]=(0,t.useState)(""),[N,M]=(0,t.useState)(!1),[_,q]=(0,t.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[Q,U]=(0,t.useState)(!1),[Z,J]=(0,t.useState)(null),[W,L]=(0,t.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[G,Y]=(0,t.useState)(""),[H,K]=(0,t.useState)(!1),[V,X]=(0,t.useState)(!1),[ee,ae]=(0,t.useState)(""),[ne,te]=(0,t.useState)(null),[re,se]=(0,t.useState)(null),[ie,oe]=(0,t.useState)(""),le=null===a||void 0===a?void 0:a.brand_id,de=(0,t.useCallback)(async()=>{if(le)try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${le}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),n=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));r(n)}}catch(e){}},[le]);(0,t.useEffect)(()=>{a&&le&&de()},[a,le,de]);const ce=n.filter(e=>{if(R){const a=R.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),pe={total:n.length,active:n.filter(e=>"active"===e.status).length},me=(a,n)=>(0,m.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("common:brandStaffPage.menuAccess")}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,m.jsx)($,{children:h.map(e=>(0,m.jsxs)(D,{alwaysOn:e.alwaysOn,children:[(0,m.jsx)("input",{type:"checkbox",checked:e.alwaysOn||a.includes(e.key),disabled:e.alwaysOn,onChange:t=>{if(e.alwaysOn)return;const r=t.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);n(r)},style:{accentColor:"#635BFF"}}),e.label,e.alwaysOn&&(0,m.jsx)(T,{children:"(Always ON)"})]},e.key))})]}),he="Brand General"===(null===a||void 0===a?void 0:a.role);return(0,m.jsxs)(x,{children:[(0,m.jsxs)(g,{children:[(0,m.jsx)(f,{children:e("common:brandStaffPage.managers")}),he&&(0,m.jsx)(u,{children:(0,m.jsx)(y,{variant:"primary",onClick:()=>{q({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),oe(""),M(!0)},children:"Add Manager"})})]}),(0,m.jsxs)(b,{children:[(0,m.jsxs)(o.MD,{children:[(0,m.jsxs)(o.hI,{color:"#7C3AED",children:[(0,m.jsx)(o.Os,{children:pe.total}),(0,m.jsx)(o.v0,{children:e("common:brandStaffPage.totalManagers")})]}),(0,m.jsxs)(o.hI,{color:"#059669",children:[(0,m.jsx)(o.Os,{children:pe.active}),(0,m.jsx)(o.v0,{children:e("common:brandStaffPage.active")})]})]}),(0,m.jsx)(d.Qn,{children:(0,m.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:R,onChange:e=>I(e.target.value),autoComplete:"off"})}),(0,m.jsx)(j,{children:0===ce.length?(0,m.jsxs)(s.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,m.jsx)("div",{style:{fontSize:"14px"},children:he?"Add managers to help manage your brand":"No managers assigned to this brand"})]}):(0,m.jsxs)(w,{children:[(0,m.jsx)(v,{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{children:e("common:brandStaffPage.manager")}),(0,m.jsx)("th",{children:e("common:brandStaffPage.phone")}),(0,m.jsx)("th",{children:e("common:brandStaffPage.permissions")}),(0,m.jsx)("th",{children:e("common:brandStaffPage.joined")}),(0,m.jsx)("th",{children:e("common:brandStaffPage.status")}),(0,m.jsx)("th",{children:e("common:brandStaffPage.actions")})]})}),(0,m.jsx)("tbody",{children:ce.map(a=>(0,m.jsxs)(F,{children:[(0,m.jsxs)(S,{"data-label":"Manager",children:[(0,m.jsx)(k,{children:a.name}),(0,m.jsx)(C,{children:a.email})]}),(0,m.jsx)(S,{"data-label":"Phone",children:(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.phone||"\u2014"})}),(0,m.jsx)(S,{"data-label":"Permissions",children:(0,m.jsx)(A,{children:0===a.permissions.length?(0,m.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("common:brandStaffPage.noPermissions")}):a.permissions.map(e=>{var a;return(0,m.jsx)(E,{children:(null===(a=h.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,m.jsx)(S,{"data-label":"Joined",children:(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.joinDate||"\u2014"})}),(0,m.jsx)(S,{"data-label":"Status",children:(0,m.jsx)(P,{active:"active"===a.status,children:a.status})}),(0,m.jsx)(S,{"data-label":"",children:(0,m.jsxs)(B,{children:[(0,m.jsx)(z,{onClick:()=>(e=>{J(e),L({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),oe(""),U(!0)})(a),children:"Edit"}),he&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(z,{onClick:()=>se(a),children:"Reset PW"}),(0,m.jsx)(O,{onClick:()=>te(a),children:"Delete"})]})]})})]},a.id))})]})})]}),(0,m.jsxs)(l.aF,{isOpen:N,onClose:()=>{M(!1),oe("")},title:"Add New Manager",size:"large",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{M(!1),oe("")},children:e("common:brandStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(_.username.trim())if(_.name.trim())if(_.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${le}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:_.username.trim(),email:_.email.trim(),full_name:_.name.trim(),phone:_.phone.trim()||null,permissions:_.permissions})});if(a.ok){const e=await a.json();await de(),M(!1),e.generatedPassword&&(Y(e.generatedPassword),K(!0))}else{const e=await a.json();oe(e.message||"Failed to create manager")}}catch(e){oe(e.message)}else oe("Email is required.");else oe("Full Name is required.");else oe("Username is required.")},children:e("common:brandStaffPage.addManager")})]}),children:[(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Username *"}),(0,m.jsx)(l.ZQ,{type:"text",value:_.username,onChange:e=>q(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Full Name *"}),(0,m.jsx)(l.ZQ,{type:"text",value:_.name,onChange:e=>q(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Email *"}),(0,m.jsx)(l.ZQ,{type:"email",value:_.email,onChange:e=>q(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:brandStaffPage.phone")}),(0,m.jsx)(c.A,{value:_.phone,onChange:e=>q(a=>({...a,phone:e}))})]})]}),me(_.permissions,e=>q(a=>({...a,permissions:e}))),ie&&N&&(0,m.jsx)(l.IM,{children:ie})]}),(0,m.jsx)(l.aF,{isOpen:Q,onClose:()=>{U(!1),J(null),oe("")},title:`Edit Manager: ${(null===Z||void 0===Z?void 0:Z.name)||""}`,size:"large",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{U(!1),J(null),oe("")},children:e("common:brandStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(Z)if(W.name.trim())if(W.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${le}/staff/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:W.name.trim(),email:W.email.trim(),phone:W.phone.trim()||null,username:W.username.trim()})});if(!a.ok){const e=await a.json();return void oe(e.message||"Failed to update manager")}const n=await fetch(`/api/brands/${le}/staff/${Z.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:W.permissions})});if(n.ok)await de(),U(!1),J(null);else{const e=await n.json();oe(e.message||"Failed to update permissions")}}catch(e){oe(e.message)}else oe("Email is required.");else oe("Full Name is required.")},children:e("common:brandStaffPage.updateManager")})]}),children:Z&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:brandStaffPage.username")}),(0,m.jsx)(l.ZQ,{type:"text",value:W.username,onChange:e=>L(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Full Name *"}),(0,m.jsx)(l.ZQ,{type:"text",value:W.name,onChange:e=>L(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Email *"}),(0,m.jsx)(l.ZQ,{type:"email",value:W.email,onChange:e=>L(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:brandStaffPage.phone")}),(0,m.jsx)(c.A,{value:W.phone,onChange:e=>L(a=>({...a,phone:e}))})]})]}),me(W.permissions,e=>L(a=>({...a,permissions:e}))),ie&&Q&&(0,m.jsx)(l.IM,{children:ie})]})}),(0,m.jsxs)(l.aF,{isOpen:H,onClose:()=>K(!1),title:"Password Generated",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(G),X(!0),setTimeout(()=>X(!1),2e3)},children:V?"Copied!":"Copy Password"}),(0,m.jsx)(l.yl,{variant:"primary",onClick:()=>K(!1),children:"Done"})]}),children:[(0,m.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,m.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:G})]}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,m.jsxs)(l.aF,{isOpen:!!ne,onClose:()=>te(null),title:"Delete Manager",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>te(null),children:e("common:brandStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ne){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${le}/staff/${ne.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await de();else{const e=await a.json();ae(e.message||"Failed to delete manager")}}catch(e){ae(e.message)}te(null)}},children:e("common:brandStaffPage.delete")})]}),children:[(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,m.jsx)("strong",{children:null===ne||void 0===ne?void 0:ne.name}),"?"]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,m.jsx)(l.aF,{isOpen:!!ee,onClose:()=>ae(""),title:"Notice",size:"small",footer:(0,m.jsx)(l.yl,{variant:"primary",onClick:()=>ae(""),children:e("common:brandStaffPage.ok")}),children:(0,m.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ee})}),(0,m.jsxs)(l.aF,{isOpen:!!re,onClose:()=>se(null),title:"Reset Password",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>se(null),children:e("common:brandStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(re){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${le}/staff/${re.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(Y(e.generatedPassword),K(!0))}else{const e=await a.json();ae(e.message||"Failed to reset password")}}catch(e){ae(e.message)}se(null)}},children:e("common:brandStaffPage.reset")})]}),children:[(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,m.jsx)("strong",{children:null===re||void 0===re?void 0:re.name}),"?"]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})}}}]);