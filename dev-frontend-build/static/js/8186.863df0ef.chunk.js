"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8186],{8186:(e,a,n)=>{n.r(a),n.d(a,{default:()=>N});var r=n(9950),s=n(4752),i=n(2853),t=n(1367),o=n(8409),l=n(9610),d=n(2488),c=n(8666),p=n(5030),m=n(9955),h=n(4414);const x=[{key:"dashboard",label:"Dashboard",alwaysOn:!0},{key:"management",label:"Management (Brands / Restaurants / Staff)",alwaysOn:!1},{key:"products",label:"Products & Inventory (Products / Recipes / Suppliers / Inventory)",alwaysOn:!1},{key:"operations",label:"Operations (Invoices / Reports / Performance)",alwaysOn:!1},{key:"communication",label:"Communication (Notices / Inquiries)",alwaysOn:!1},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)",alwaysOn:!1}],g=s.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,f=s.Ay.div`
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
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=s.Ay.div`
  display: flex;
  gap: 12px;
`,b=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: #FEF2F2;\n    color: #EF4444;\n    border: 1px solid #EF4444;\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,j=s.Ay.div`
  padding: 32px;
`,w=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,v=s.Ay.table`
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
`,S=s.Ay.tr`
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
`,k=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,A=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,P=s.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
  white-space: nowrap;
`,B=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=s.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,O=s.Ay.button`
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
`,$=(0,s.Ay)(O)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,D=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,T=s.Ay.label`
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
`,R=s.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,N=()=>{const{t:e}=(0,p.Bd)("common"),{user:a}=(0,t.As)(),[n,s]=(0,r.useState)([]),[N,M]=(0,r.useState)(""),[I,q]=(0,r.useState)(!1),[Q,U]=(0,r.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[Z,J]=(0,r.useState)(!1),[W,_]=(0,r.useState)(null),[L,G]=(0,r.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[Y,H]=(0,r.useState)(""),[K,V]=(0,r.useState)(!1),[X,ee]=(0,r.useState)(!1),[ae,ne]=(0,r.useState)(""),[re,se]=(0,r.useState)(null),[ie,te]=(0,r.useState)(null),[oe,le]=(0,r.useState)(""),de=null===a||void 0===a?void 0:a.brand_id,ce=(0,r.useCallback)(async()=>{if(de)try{const e=(0,m.c4)(),a=await fetch(`/api/brands/${de}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),n=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));s(n)}}catch(e){}},[de]);(0,r.useEffect)(()=>{a&&de&&ce()},[a,de,ce]);const pe=n.filter(e=>{if(N){const a=N.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),me={total:n.length,active:n.filter(e=>"active"===e.status).length},he=(a,n)=>(0,h.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("common:brandStaffPage.menuAccess")}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,h.jsx)(D,{children:x.map(e=>(0,h.jsxs)(T,{alwaysOn:e.alwaysOn,children:[(0,h.jsx)("input",{type:"checkbox",checked:e.alwaysOn||a.includes(e.key),disabled:e.alwaysOn,onChange:r=>{if(e.alwaysOn)return;const s=r.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);n(s)},style:{accentColor:"#635BFF"}}),e.label,e.alwaysOn&&(0,h.jsx)(R,{children:"(Always ON)"})]},e.key))})]}),xe="Brand General"===(null===a||void 0===a?void 0:a.role);return(0,h.jsxs)(g,{children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(u,{children:e("common:brandStaffPage.managers")}),xe&&(0,h.jsx)(y,{children:(0,h.jsx)(b,{variant:"primary",onClick:()=>{U({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),le(""),q(!0)},children:"Add Manager"})})]}),(0,h.jsxs)(j,{children:[(0,h.jsxs)(o.MD,{children:[(0,h.jsxs)(o.hI,{color:"#7C3AED",children:[(0,h.jsx)(o.Os,{children:me.total}),(0,h.jsx)(o.v0,{children:e("common:brandStaffPage.totalManagers")})]}),(0,h.jsxs)(o.hI,{color:"#059669",children:[(0,h.jsx)(o.Os,{children:me.active}),(0,h.jsx)(o.v0,{children:e("common:brandStaffPage.active")})]})]}),(0,h.jsx)(d.Qn,{children:(0,h.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:N,onChange:e=>M(e.target.value),autoComplete:"off"})}),(0,h.jsx)(w,{children:0===pe.length?(0,h.jsxs)(i.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:xe?"Add managers to help manage your brand":"No managers assigned to this brand"})]}):(0,h.jsxs)(v,{children:[(0,h.jsx)(F,{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:e("common:brandStaffPage.manager")}),(0,h.jsx)("th",{children:e("common:brandStaffPage.phone")}),(0,h.jsx)("th",{children:e("common:brandStaffPage.permissions")}),(0,h.jsx)("th",{children:e("common:brandStaffPage.joined")}),(0,h.jsx)("th",{children:e("common:brandStaffPage.status")}),(0,h.jsx)("th",{children:e("common:brandStaffPage.actions")})]})}),(0,h.jsx)("tbody",{children:pe.map(a=>(0,h.jsxs)(S,{children:[(0,h.jsxs)(C,{"data-label":"Manager",children:[(0,h.jsx)(k,{children:a.name}),(0,h.jsx)(A,{children:a.email})]}),(0,h.jsx)(C,{"data-label":"Phone",children:(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.phone||"\u2014"})}),(0,h.jsx)(C,{"data-label":"Permissions",children:(0,h.jsx)(E,{children:0===a.permissions.length?(0,h.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("common:brandStaffPage.noPermissions")}):a.permissions.map(e=>{var a;return(0,h.jsx)(P,{children:(null===(a=x.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,h.jsx)(C,{"data-label":"Joined",children:(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.joinDate||"\u2014"})}),(0,h.jsx)(C,{"data-label":"Status",children:(0,h.jsx)(B,{active:"active"===a.status,children:a.status})}),(0,h.jsx)(C,{"data-label":"",children:(0,h.jsxs)(z,{children:[(0,h.jsx)(O,{onClick:()=>(e=>{_(e),G({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),le(""),J(!0)})(a),children:"Edit"}),xe&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(O,{onClick:()=>te(a),children:"Reset PW"}),(0,h.jsx)($,{onClick:()=>se(a),children:"Delete"})]})]})})]},a.id))})]})})]}),(0,h.jsxs)(l.aF,{isOpen:I,onClose:()=>{q(!1),le("")},title:"Add New Manager",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{q(!1),le("")},children:e("common:brandStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(Q.username.trim())if(Q.name.trim())if(Q.email.trim())try{const e=(0,m.c4)(),a=await fetch(`/api/brands/${de}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:Q.username.trim(),email:Q.email.trim(),full_name:Q.name.trim(),phone:Q.phone.trim()||null,permissions:Q.permissions})});if(a.ok){const e=await a.json();await ce(),q(!1),e.generatedPassword&&(H(e.generatedPassword),V(!0))}else{const e=await a.json();le(e.message||"Failed to create manager")}}catch(e){le(e.message)}else le("Email is required.");else le("Full Name is required.");else le("Username is required.")},children:e("common:brandStaffPage.addManager")})]}),children:[(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Username *"}),(0,h.jsx)(l.ZQ,{type:"text",value:Q.username,onChange:e=>U(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Full Name *"}),(0,h.jsx)(l.ZQ,{type:"text",value:Q.name,onChange:e=>U(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Email *"}),(0,h.jsx)(l.ZQ,{type:"email",value:Q.email,onChange:e=>U(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:brandStaffPage.phone")}),(0,h.jsx)(c.A,{value:Q.phone,onChange:e=>U(a=>({...a,phone:e}))})]})]}),he(Q.permissions,e=>U(a=>({...a,permissions:e}))),oe&&I&&(0,h.jsx)(l.IM,{children:oe})]}),(0,h.jsx)(l.aF,{isOpen:Z,onClose:()=>{J(!1),_(null),le("")},title:`Edit Manager: ${(null===W||void 0===W?void 0:W.name)||""}`,size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{J(!1),_(null),le("")},children:e("common:brandStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(W)if(L.name.trim())if(L.email.trim())try{const e=(0,m.c4)(),a=await fetch(`/api/brands/${de}/staff/${W.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:L.name.trim(),email:L.email.trim(),phone:L.phone.trim()||null,username:L.username.trim()})});if(!a.ok){const e=await a.json();return void le(e.message||"Failed to update manager")}const n=await fetch(`/api/brands/${de}/staff/${W.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:L.permissions})});if(n.ok)await ce(),J(!1),_(null);else{const e=await n.json();le(e.message||"Failed to update permissions")}}catch(e){le(e.message)}else le("Email is required.");else le("Full Name is required.")},children:e("common:brandStaffPage.updateManager")})]}),children:W&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:brandStaffPage.username")}),(0,h.jsx)(l.ZQ,{type:"text",value:L.username,onChange:e=>G(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Full Name *"}),(0,h.jsx)(l.ZQ,{type:"text",value:L.name,onChange:e=>G(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Email *"}),(0,h.jsx)(l.ZQ,{type:"email",value:L.email,onChange:e=>G(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:brandStaffPage.phone")}),(0,h.jsx)(c.A,{value:L.phone,onChange:e=>G(a=>({...a,phone:e}))})]})]}),he(L.permissions,e=>G(a=>({...a,permissions:e}))),oe&&Z&&(0,h.jsx)(l.IM,{children:oe})]})}),(0,h.jsxs)(l.aF,{isOpen:K,onClose:()=>V(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Y),ee(!0),setTimeout(()=>ee(!1),2e3)},children:X?"Copied!":"Copy Password"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:()=>V(!1),children:"Done"})]}),children:[(0,h.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Y})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,h.jsxs)(l.aF,{isOpen:!!re,onClose:()=>se(null),title:"Delete Manager",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>se(null),children:e("common:brandStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(re){try{const e=(0,m.c4)(),a=await fetch(`/api/brands/${de}/staff/${re.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await ce();else{const e=await a.json();ne(e.message||"Failed to delete manager")}}catch(e){ne(e.message)}se(null)}},children:e("common:brandStaffPage.delete")})]}),children:[(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,h.jsx)("strong",{children:null===re||void 0===re?void 0:re.name}),"?"]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,h.jsx)(l.aF,{isOpen:!!ae,onClose:()=>ne(""),title:"Notice",size:"small",footer:(0,h.jsx)(l.yl,{variant:"primary",onClick:()=>ne(""),children:e("common:brandStaffPage.ok")}),children:(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ae})}),(0,h.jsxs)(l.aF,{isOpen:!!ie,onClose:()=>te(null),title:"Reset Password",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>te(null),children:e("common:brandStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ie){try{const e=(0,m.c4)(),a=await fetch(`/api/brands/${de}/staff/${ie.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(H(e.generatedPassword),V(!0))}else{const e=await a.json();ne(e.message||"Failed to reset password")}}catch(e){ne(e.message)}te(null)}},children:e("common:brandStaffPage.reset")})]}),children:[(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,h.jsx)("strong",{children:null===ie||void 0===ie?void 0:ie.name}),"?"]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})}}}]);