"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6],{6:(e,a,o)=>{o.r(a),o.d(a,{default:()=>R});var t=o(9950),n=o(4752),i=o(2853),r=o(1367),s=o(8409),l=o(9610),d=o(2488),c=o(8666),p=o(5030),m=o(9955),h=o(4414);const x=[{key:"dashboard",label:"Dashboard"},{key:"management",label:"Management (Foodcourts / Restaurants / Staff)"},{key:"operations",label:"Operations (Invoices / Statistics / Customers / Coupons)"},{key:"communication",label:"Communication (Notices / Inquiries)"},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)"}],f=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=n.Ay.div`
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
`,g=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,j=n.Ay.button`
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
`,b=n.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,F=n.Ay.table`
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
`,w=n.Ay.thead`
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
`,S=n.Ay.tr`
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
`,C=n.Ay.td`
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
`,A=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,P=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #DBEAFE;
  color: #2563EB;
  white-space: nowrap;
`,B=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
`,$=n.Ay.button`
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
`,T=(0,n.Ay)($)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,D=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,O=n.Ay.label`
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
`,R=()=>{const{t:e}=(0,p.Bd)("common"),{user:a}=(0,r.As)(),[o,n]=(0,t.useState)([]),[R,M]=(0,t.useState)(""),[N,I]=(0,t.useState)(!1),[U,q]=(0,t.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[Q,Z]=(0,t.useState)(!1),[J,W]=(0,t.useState)(null),[_,L]=(0,t.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[G,Y]=(0,t.useState)(""),[H,K]=(0,t.useState)(!1),[V,X]=(0,t.useState)(!1),[ee,ae]=(0,t.useState)(""),[oe,te]=(0,t.useState)(null),[ne,ie]=(0,t.useState)(null),[re,se]=(0,t.useState)(""),le=null===a||void 0===a?void 0:a.foodcourt_id,de=(0,t.useCallback)(async()=>{if(le)try{const e=(0,m.c4)(),a=await fetch(`/api/foodcourts/${le}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),o=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));n(o)}}catch(e){}},[le]);(0,t.useEffect)(()=>{a&&le&&de()},[a,le,de]);const ce=o.filter(e=>{if(R){const a=R.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),pe={total:o.length,active:o.filter(e=>"active"===e.status).length},me=(a,o)=>(0,h.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:e("common:foodcourtStaffPage.menuAccess")}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,h.jsx)(D,{children:x.map(e=>(0,h.jsxs)(O,{children:[(0,h.jsx)("input",{type:"checkbox",checked:a.includes(e.key),onChange:t=>{const n=t.target.checked?[...a,e.key]:a.filter(a=>a!==e.key);o(n)},style:{accentColor:"#635BFF"}}),e.label]},e.key))})]}),he="Foodcourt General"===(null===a||void 0===a?void 0:a.role);return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(f,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:e("common:foodcourtStaffPage.foodcourtManagers")}),he&&(0,h.jsx)(y,{children:(0,h.jsx)(j,{variant:"primary",onClick:()=>{q({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),se(""),I(!0)},children:"Add Manager"})})]}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{color:"#2563EB",children:[(0,h.jsx)(s.Os,{children:pe.total}),(0,h.jsx)(s.v0,{children:e("common:foodcourtStaffPage.totalManagers")})]}),(0,h.jsxs)(s.hI,{color:"#059669",children:[(0,h.jsx)(s.Os,{children:pe.active}),(0,h.jsx)(s.v0,{children:e("common:foodcourtStaffPage.active")})]})]}),(0,h.jsx)(d.Qn,{children:(0,h.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:R,onChange:e=>M(e.target.value),autoComplete:"off"})}),(0,h.jsx)(v,{children:0===ce.length?(0,h.jsxs)(i.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:he?"Add managers to help manage your foodcourt":"No managers assigned to this foodcourt"})]}):(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.manager")}),(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.phone")}),(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.permissions")}),(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.joined")}),(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.status")}),(0,h.jsx)("th",{children:e("common:foodcourtStaffPage.actions")})]})}),(0,h.jsx)("tbody",{children:ce.map(a=>(0,h.jsxs)(S,{children:[(0,h.jsxs)(C,{"data-label":"Manager",children:[(0,h.jsx)(k,{children:a.name}),(0,h.jsx)(A,{children:a.email})]}),(0,h.jsx)(C,{"data-label":"Phone",children:(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.phone||"\u2014"})}),(0,h.jsx)(C,{"data-label":"Permissions",children:(0,h.jsx)(E,{children:0===a.permissions.length?(0,h.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:e("common:foodcourtStaffPage.noPermissions")}):a.permissions.map(e=>{var a;return(0,h.jsx)(P,{children:(null===(a=x.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,h.jsx)(C,{"data-label":"Joined",children:(0,h.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:a.joinDate||"\u2014"})}),(0,h.jsx)(C,{"data-label":"Status",children:(0,h.jsx)(B,{active:"active"===a.status,children:a.status})}),(0,h.jsx)(C,{"data-label":"",children:(0,h.jsxs)(z,{children:[(0,h.jsx)($,{onClick:()=>(e=>{W(e),L({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),se(""),Z(!0)})(a),children:"Edit"}),he&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{onClick:()=>ie(a),children:"Reset PW"}),(0,h.jsx)(T,{onClick:()=>te(a),children:"Delete"})]})]})})]},a.id))})]})})]}),(0,h.jsxs)(l.aF,{isOpen:N,onClose:()=>{I(!1),se("")},title:"Add New Manager",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{I(!1),se("")},children:e("common:foodcourtStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(U.username.trim())if(U.name.trim())if(U.email.trim())try{const e=(0,m.c4)(),a=await fetch(`/api/foodcourts/${le}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:U.username.trim(),email:U.email.trim(),full_name:U.name.trim(),phone:U.phone.trim()||null,permissions:U.permissions})});if(a.ok){const e=await a.json();await de(),I(!1),e.generatedPassword&&(Y(e.generatedPassword),K(!0))}else{const e=await a.json();se(e.message||"Failed to create manager")}}catch(e){se(e.message)}else se("Email is required.");else se("Full Name is required.");else se("Username is required.")},children:e("common:foodcourtStaffPage.addManager")})]}),children:[(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Username *"}),(0,h.jsx)(l.ZQ,{type:"text",value:U.username,onChange:e=>q(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Full Name *"}),(0,h.jsx)(l.ZQ,{type:"text",value:U.name,onChange:e=>q(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Email *"}),(0,h.jsx)(l.ZQ,{type:"email",value:U.email,onChange:e=>q(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:foodcourtStaffPage.phone")}),(0,h.jsx)(c.A,{value:U.phone,onChange:e=>q(a=>({...a,phone:e}))})]})]}),me(U.permissions,e=>q(a=>({...a,permissions:e}))),re&&N&&(0,h.jsx)(l.IM,{children:re})]}),(0,h.jsx)(l.aF,{isOpen:Q,onClose:()=>{Z(!1),W(null),se("")},title:`Edit Manager: ${(null===J||void 0===J?void 0:J.name)||""}`,size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{Z(!1),W(null),se("")},children:e("common:foodcourtStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(J)if(_.name.trim())if(_.email.trim())try{const e=(0,m.c4)(),a=await fetch(`/api/foodcourts/${le}/staff/${J.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:_.name.trim(),email:_.email.trim(),phone:_.phone.trim()||null,username:_.username.trim()})});if(!a.ok){const e=await a.json();return void se(e.message||"Failed to update manager")}const o=await fetch(`/api/foodcourts/${le}/staff/${J.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:_.permissions})});if(o.ok)await de(),Z(!1),W(null);else{const e=await o.json();se(e.message||"Failed to update permissions")}}catch(e){se(e.message)}else se("Email is required.");else se("Full Name is required.")},children:e("common:foodcourtStaffPage.updateManager")})]}),children:J&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:foodcourtStaffPage.username")}),(0,h.jsx)(l.ZQ,{type:"text",value:_.username,onChange:e=>L(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Full Name *"}),(0,h.jsx)(l.ZQ,{type:"text",value:_.name,onChange:e=>L(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,h.jsxs)(l.fh,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Email *"}),(0,h.jsx)(l.ZQ,{type:"email",value:_.email,onChange:e=>L(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:e("common:foodcourtStaffPage.phone")}),(0,h.jsx)(c.A,{value:_.phone,onChange:e=>L(a=>({...a,phone:e}))})]})]}),me(_.permissions,e=>L(a=>({...a,permissions:e}))),re&&Q&&(0,h.jsx)(l.IM,{children:re})]})}),(0,h.jsxs)(l.aF,{isOpen:H,onClose:()=>K(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(G),X(!0),setTimeout(()=>X(!1),2e3)},children:V?"Copied!":"Copy Password"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:()=>K(!1),children:"Done"})]}),children:[(0,h.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:G})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,h.jsxs)(l.aF,{isOpen:!!oe,onClose:()=>te(null),title:"Delete Manager",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>te(null),children:e("common:foodcourtStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(oe){try{const e=(0,m.c4)(),a=await fetch(`/api/foodcourts/${le}/staff/${oe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await de();else{const e=await a.json();ae(e.message||"Failed to delete manager")}}catch(e){ae(e.message)}te(null)}},children:e("common:foodcourtStaffPage.delete")})]}),children:[(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,h.jsx)("strong",{children:null===oe||void 0===oe?void 0:oe.name}),"?"]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,h.jsx)(l.aF,{isOpen:!!ee,onClose:()=>ae(""),title:"Notice",size:"small",footer:(0,h.jsx)(l.yl,{variant:"primary",onClick:()=>ae(""),children:e("common:foodcourtStaffPage.ok")}),children:(0,h.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ee})}),(0,h.jsxs)(l.aF,{isOpen:!!ne,onClose:()=>ie(null),title:"Reset Password",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>ie(null),children:e("common:foodcourtStaffPage.cancel")}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ne){try{const e=(0,m.c4)(),a=await fetch(`/api/foodcourts/${le}/staff/${ne.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(Y(e.generatedPassword),K(!0))}else{const e=await a.json();ae(e.message||"Failed to reset password")}}catch(e){ae(e.message)}ie(null)}},children:e("common:foodcourtStaffPage.reset")})]}),children:[(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,h.jsx)("strong",{children:null===ne||void 0===ne?void 0:ne.name}),"?"]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}}}]);