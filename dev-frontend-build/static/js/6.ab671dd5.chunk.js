"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6],{6:(e,a,o)=>{o.r(a),o.d(a,{default:()=>O});var t=o(9950),n=o(4752),r=o(2853),i=o(1367),s=o(8409),l=o(9610),d=o(2488),c=o(8666),p=o(5030),m=o(4414);const h=[{key:"dashboard",label:"Dashboard"},{key:"management",label:"Management (Foodcourts / Restaurants / Staff)"},{key:"operations",label:"Operations (Invoices / Statistics / Customers / Coupons)"},{key:"communication",label:"Communication (Notices / Inquiries)"},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)"}],x=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,f=n.Ay.div`
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
`,u=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,g=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,y=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"danger"===e.variant?"1px solid #EF4444":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"danger"===e.variant?"#FEF2F2":"white"};
  color: ${e=>"primary"===e.variant?"white":"danger"===e.variant?"#EF4444":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"danger"===e.variant?"#FEE2E2":"#F6F9FC"};
    transform: translateY(-1px);
  }
`,j=n.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,v=n.Ay.table`
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
`,F=n.Ay.thead`
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
`,w=n.Ay.tr`
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
`,S=n.Ay.td`
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
`,k=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,C=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,E=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #DBEAFE;
  color: #2563EB;
  white-space: nowrap;
`,P=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,B=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`,z=n.Ay.button`
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
`,$=(0,n.Ay)(z)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,T=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,D=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: white;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }
`,O=()=>{const{t:e}=(0,p.Bd)("common"),{user:a}=(0,i.As)(),[o,n]=(0,t.useState)([]),[O,R]=(0,t.useState)(""),[I,M]=(0,t.useState)(!1),[N,_]=(0,t.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[U,q]=(0,t.useState)(!1),[Q,Z]=(0,t.useState)(null),[J,W]=(0,t.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[L,G]=(0,t.useState)(""),[Y,H]=(0,t.useState)(!1),[K,V]=(0,t.useState)(!1),[X,ee]=(0,t.useState)(""),[ae,oe]=(0,t.useState)(null),[te,ne]=(0,t.useState)(null),[re,ie]=(0,t.useState)(""),se=null===a||void 0===a?void 0:a.foodcourt_id,le=(0,t.useCallback)(async()=>{if(se)try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${se}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),o=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));n(o)}}catch(e){}},[se]);(0,t.useEffect)(()=>{a&&se&&le()},[a,se,le]);const de=o.filter(e=>{if(O){const a=O.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),ce={total:o.length,active:o.filter(e=>"active"===e.status).length},pe=(a,o)=>(0,m.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("common:foodcourtStaffPage.menuAccess")}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,m.jsx)(T,{children:h.map(e=>(0,m.jsxs)(D,{children:[(0,m.jsx)("input",{type:"checkbox",checked:a.includes(e.key),onChange:t=>{const n=t.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);o(n)},style:{accentColor:"#635BFF"}}),e.label]},e.key))})]}),me="Foodcourt General"===(null===a||void 0===a?void 0:a.role);return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(x,{children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(u,{children:e("common:foodcourtStaffPage.foodcourtManagers")}),me&&(0,m.jsx)(g,{children:(0,m.jsx)(y,{variant:"primary",onClick:()=>{_({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),ie(""),M(!0)},children:"Add Manager"})})]}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(s.MD,{children:[(0,m.jsxs)(s.hI,{color:"#2563EB",children:[(0,m.jsx)(s.Os,{children:ce.total}),(0,m.jsx)(s.v0,{children:e("common:foodcourtStaffPage.totalManagers")})]}),(0,m.jsxs)(s.hI,{color:"#059669",children:[(0,m.jsx)(s.Os,{children:ce.active}),(0,m.jsx)(s.v0,{children:e("common:foodcourtStaffPage.active")})]})]}),(0,m.jsx)(d.Qn,{children:(0,m.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:O,onChange:e=>R(e.target.value),autoComplete:"off"})}),(0,m.jsx)(b,{children:0===de.length?(0,m.jsxs)(r.pp,{children:[(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,m.jsx)("div",{style:{fontSize:"14px"},children:me?"Add managers to help manage your foodcourt":"No managers assigned to this foodcourt"})]}):(0,m.jsxs)(v,{children:[(0,m.jsx)(F,{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.manager")}),(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.phone")}),(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.permissions")}),(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.joined")}),(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.status")}),(0,m.jsx)("th",{children:e("common:foodcourtStaffPage.actions")})]})}),(0,m.jsx)("tbody",{children:de.map(a=>(0,m.jsxs)(w,{children:[(0,m.jsxs)(S,{"data-label":"Manager",children:[(0,m.jsx)(k,{children:a.name}),(0,m.jsx)(C,{children:a.email})]}),(0,m.jsx)(S,{"data-label":"Phone",children:(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.phone||"\u2014"})}),(0,m.jsx)(S,{"data-label":"Permissions",children:(0,m.jsx)(A,{children:0===a.permissions.length?(0,m.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("common:foodcourtStaffPage.noPermissions")}):a.permissions.map(e=>{var a;return(0,m.jsx)(E,{children:(null===(a=h.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,m.jsx)(S,{"data-label":"Joined",children:(0,m.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.joinDate||"\u2014"})}),(0,m.jsx)(S,{"data-label":"Status",children:(0,m.jsx)(P,{active:"active"===a.status,children:a.status})}),(0,m.jsx)(S,{"data-label":"",children:(0,m.jsxs)(B,{children:[(0,m.jsx)(z,{onClick:()=>(e=>{Z(e),W({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),ie(""),q(!0)})(a),children:"Edit"}),me&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(z,{onClick:()=>ne(a),children:"Reset PW"}),(0,m.jsx)($,{onClick:()=>oe(a),children:"Delete"})]})]})})]},a.id))})]})})]}),(0,m.jsxs)(l.aF,{isOpen:I,onClose:()=>{M(!1),ie("")},title:"Add New Manager",size:"large",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{M(!1),ie("")},children:e("common:foodcourtStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(N.username.trim())if(N.name.trim())if(N.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${se}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:N.username.trim(),email:N.email.trim(),full_name:N.name.trim(),phone:N.phone.trim()||null,permissions:N.permissions})});if(a.ok){const e=await a.json();await le(),M(!1),e.generatedPassword&&(G(e.generatedPassword),H(!0))}else{const e=await a.json();ie(e.message||"Failed to create manager")}}catch(e){ie(e.message)}else ie("Email is required.");else ie("Full Name is required.");else ie("Username is required.")},children:e("common:foodcourtStaffPage.addManager")})]}),children:[(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Username *"}),(0,m.jsx)(l.ZQ,{type:"text",value:N.username,onChange:e=>_(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Full Name *"}),(0,m.jsx)(l.ZQ,{type:"text",value:N.name,onChange:e=>_(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Email *"}),(0,m.jsx)(l.ZQ,{type:"email",value:N.email,onChange:e=>_(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:foodcourtStaffPage.phone")}),(0,m.jsx)(c.A,{value:N.phone,onChange:e=>_(a=>({...a,phone:e}))})]})]}),pe(N.permissions,e=>_(a=>({...a,permissions:e}))),re&&I&&(0,m.jsx)(l.IM,{children:re})]}),(0,m.jsx)(l.aF,{isOpen:U,onClose:()=>{q(!1),Z(null),ie("")},title:`Edit Manager: ${(null===Q||void 0===Q?void 0:Q.name)||""}`,size:"large",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{q(!1),Z(null),ie("")},children:e("common:foodcourtStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(Q)if(J.name.trim())if(J.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${se}/staff/${Q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:J.name.trim(),email:J.email.trim(),phone:J.phone.trim()||null,username:J.username.trim()})});if(!a.ok){const e=await a.json();return void ie(e.message||"Failed to update manager")}const o=await fetch(`/api/foodcourts/${se}/staff/${Q.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:J.permissions})});if(o.ok)await le(),q(!1),Z(null);else{const e=await o.json();ie(e.message||"Failed to update permissions")}}catch(e){ie(e.message)}else ie("Email is required.");else ie("Full Name is required.")},children:e("common:foodcourtStaffPage.updateManager")})]}),children:Q&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:foodcourtStaffPage.username")}),(0,m.jsx)(l.ZQ,{type:"text",value:J.username,onChange:e=>W(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Full Name *"}),(0,m.jsx)(l.ZQ,{type:"text",value:J.name,onChange:e=>W(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,m.jsxs)(l.fh,{children:[(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:"Email *"}),(0,m.jsx)(l.ZQ,{type:"email",value:J.email,onChange:e=>W(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,m.jsxs)(l.gE,{children:[(0,m.jsx)(l.lR,{children:e("common:foodcourtStaffPage.phone")}),(0,m.jsx)(c.A,{value:J.phone,onChange:e=>W(a=>({...a,phone:e}))})]})]}),pe(J.permissions,e=>W(a=>({...a,permissions:e}))),re&&U&&(0,m.jsx)(l.IM,{children:re})]})}),(0,m.jsxs)(l.aF,{isOpen:Y,onClose:()=>H(!1),title:"Password Generated",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(L),V(!0),setTimeout(()=>V(!1),2e3)},children:K?"Copied!":"Copy Password"}),(0,m.jsx)(l.yl,{variant:"primary",onClick:()=>H(!1),children:"Done"})]}),children:[(0,m.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,m.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:L})]}),(0,m.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,m.jsxs)(l.aF,{isOpen:!!ae,onClose:()=>oe(null),title:"Delete Manager",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>oe(null),children:e("common:foodcourtStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ae){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${se}/staff/${ae.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await le();else{const e=await a.json();ee(e.message||"Failed to delete manager")}}catch(e){ee(e.message)}oe(null)}},children:e("common:foodcourtStaffPage.delete")})]}),children:[(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,m.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name}),"?"]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,m.jsx)(l.aF,{isOpen:!!X,onClose:()=>ee(""),title:"Notice",size:"small",footer:(0,m.jsx)(l.yl,{variant:"primary",onClick:()=>ee(""),children:e("common:foodcourtStaffPage.ok")}),children:(0,m.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:X})}),(0,m.jsxs)(l.aF,{isOpen:!!te,onClose:()=>ne(null),title:"Reset Password",size:"small",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l.yl,{variant:"secondary",onClick:()=>ne(null),children:e("common:foodcourtStaffPage.cancel")}),(0,m.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(te){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${se}/staff/${te.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(G(e.generatedPassword),H(!0))}else{const e=await a.json();ee(e.message||"Failed to reset password")}}catch(e){ee(e.message)}ne(null)}},children:e("common:foodcourtStaffPage.reset")})]}),children:[(0,m.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,m.jsx)("strong",{children:null===te||void 0===te?void 0:te.name}),"?"]}),(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}}}]);