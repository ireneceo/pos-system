"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6],{6:(e,a,i)=>{i.r(a),i.d(a,{default:()=>D});var t=i(9950),n=i(4752),r=i(2853),s=i(1367),o=i(8409),l=i(9610),d=i(2488),p=i(8666),c=i(4414);const x=[{key:"dashboard",label:"Dashboard"},{key:"management",label:"Management (Foodcourts / Restaurants / Staff)"},{key:"operations",label:"Operations (Invoices / Statistics / Customers / Coupons)"},{key:"communication",label:"Communication (Notices / Inquiries)"},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)"}],h=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=n.Ay.div`
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
`,f=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant||"danger"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"danger"===e.variant?"#DC2626":"white"};
  color: ${e=>"primary"===e.variant||"danger"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"danger"===e.variant?"#B91C1C":"#F6F9FC"};
    transform: translateY(-1px);
  }
`,y=n.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,w=n.Ay.table`
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
`,b=n.Ay.thead`
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
`,v=n.Ay.tr`
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
`,F=n.Ay.td`
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
`,C=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,k=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`,S=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #DBEAFE;
  color: #2563EB;
  white-space: nowrap;
`,E=n.Ay.span`
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
`,P=(0,n.Ay)(z)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,T=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,$=n.Ay.label`
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
`,D=()=>{const{user:e}=(0,s.As)(),[a,i]=(0,t.useState)([]),[n,D]=(0,t.useState)(""),[O,N]=(0,t.useState)(!1),[M,R]=(0,t.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[I,U]=(0,t.useState)(!1),[_,J]=(0,t.useState)(null),[Q,q]=(0,t.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[Z,W]=(0,t.useState)(""),[L,G]=(0,t.useState)(!1),[Y,K]=(0,t.useState)(!1),[H,V]=(0,t.useState)(""),[X,ee]=(0,t.useState)(null),[ae,ie]=(0,t.useState)(null),[te,ne]=(0,t.useState)(""),re=null===e||void 0===e?void 0:e.foodcourt_id,se=(0,t.useCallback)(async()=>{if(re)try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${re}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),t=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));i(t)}}catch(e){}},[re]);(0,t.useEffect)(()=>{e&&re&&se()},[e,re,se]);const oe=a.filter(e=>{if(n){const a=n.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),le={total:a.length,active:a.filter(e=>"active"===e.status).length},de=(e,a)=>(0,c.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,c.jsx)(T,{children:x.map(i=>(0,c.jsxs)($,{children:[(0,c.jsx)("input",{type:"checkbox",checked:e.includes(i.key),onChange:t=>{const n=t.target.checked?[...e,i.key]:e.filter(e=>e!==i.key);a(n)},style:{accentColor:"#635BFF"}}),i.label]},i.key))})]}),pe="Foodcourt General"===(null===e||void 0===e?void 0:e.role);return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(h,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(u,{children:"Foodcourt Managers"}),pe&&(0,c.jsx)(g,{children:(0,c.jsx)(f,{variant:"primary",onClick:()=>{R({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),ne(""),N(!0)},children:"Add Manager"})})]}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#2563EB",children:[(0,c.jsx)(o.Os,{children:le.total}),(0,c.jsx)(o.v0,{children:"Total Managers"})]}),(0,c.jsxs)(o.hI,{color:"#059669",children:[(0,c.jsx)(o.Os,{children:le.active}),(0,c.jsx)(o.v0,{children:"Active"})]})]}),(0,c.jsx)(d.Qn,{children:(0,c.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:n,onChange:e=>D(e.target.value),autoComplete:"off"})}),(0,c.jsx)(j,{children:0===oe.length?(0,c.jsxs)(r.pp,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:pe?"Add managers to help manage your foodcourt":"No managers assigned to this foodcourt"})]}):(0,c.jsxs)(w,{children:[(0,c.jsx)(b,{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{children:"Manager"}),(0,c.jsx)("th",{children:"Phone"}),(0,c.jsx)("th",{children:"Permissions"}),(0,c.jsx)("th",{children:"Joined"}),(0,c.jsx)("th",{children:"Status"}),(0,c.jsx)("th",{children:"Actions"})]})}),(0,c.jsx)("tbody",{children:oe.map(e=>(0,c.jsxs)(v,{children:[(0,c.jsxs)(F,{"data-label":"Manager",children:[(0,c.jsx)(C,{children:e.name}),(0,c.jsx)(k,{children:e.email})]}),(0,c.jsx)(F,{"data-label":"Phone",children:(0,c.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.phone||"\u2014"})}),(0,c.jsx)(F,{"data-label":"Permissions",children:(0,c.jsx)(A,{children:0===e.permissions.length?(0,c.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"No permissions"}):e.permissions.map(e=>{var a;return(0,c.jsx)(S,{children:(null===(a=x.find(a=>a.key===e))||void 0===a?void 0:a.label.split(" (")[0])||e},e)})})}),(0,c.jsx)(F,{"data-label":"Joined",children:(0,c.jsx)("span",{style:{fontSize:"13px",color:"#6B7280"},children:e.joinDate||"\u2014"})}),(0,c.jsx)(F,{"data-label":"Status",children:(0,c.jsx)(E,{active:"active"===e.status,children:e.status})}),(0,c.jsx)(F,{"data-label":"",children:(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{onClick:()=>(e=>{J(e),q({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),ne(""),U(!0)})(e),children:"Edit"}),pe&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(z,{onClick:()=>ie(e),children:"Reset PW"}),(0,c.jsx)(P,{onClick:()=>ee(e),children:"Delete"})]})]})})]},e.id))})]})})]}),(0,c.jsxs)(l.aF,{isOpen:O,onClose:()=>{N(!1),ne("")},title:"Add New Manager",size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{N(!1),ne("")},children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(M.username.trim())if(M.name.trim())if(M.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${re}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:M.username.trim(),email:M.email.trim(),full_name:M.name.trim(),phone:M.phone.trim()||null,permissions:JSON.stringify(M.permissions)})});if(a.ok){const e=await a.json();await se(),N(!1),e.generatedPassword&&(W(e.generatedPassword),G(!0))}else{const e=await a.json();ne(e.message||"Failed to create manager")}}catch(e){ne(e.message)}else ne("Email is required.");else ne("Full Name is required.");else ne("Username is required.")},children:"Add Manager"})]}),children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Username *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.username,onChange:e=>R(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.name,onChange:e=>R(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:M.email,onChange:e=>R(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:M.phone,onChange:e=>R(a=>({...a,phone:e}))})]})]}),de(M.permissions,e=>R(a=>({...a,permissions:e}))),te&&O&&(0,c.jsx)(l.IM,{children:te})]}),(0,c.jsx)(l.aF,{isOpen:I,onClose:()=>{U(!1),J(null),ne("")},title:`Edit Manager: ${(null===_||void 0===_?void 0:_.name)||""}`,size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{U(!1),J(null),ne("")},children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(_)if(Q.name.trim())if(Q.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${re}/staff/${_.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:Q.name.trim(),email:Q.email.trim(),phone:Q.phone.trim()||null,username:Q.username.trim()})});if(!a.ok){const e=await a.json();return void ne(e.message||"Failed to update manager")}const i=await fetch(`/api/foodcourts/${re}/staff/${_.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:Q.permissions})});if(i.ok)await se(),U(!1),J(null);else{const e=await i.json();ne(e.message||"Failed to update permissions")}}catch(e){ne(e.message)}else ne("Email is required.");else ne("Full Name is required.")},children:"Update Manager"})]}),children:_&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Username"}),(0,c.jsx)(l.ZQ,{type:"text",value:Q.username,onChange:e=>q(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:Q.name,onChange:e=>q(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:Q.email,onChange:e=>q(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:Q.phone,onChange:e=>q(a=>({...a,phone:e}))})]})]}),de(Q.permissions,e=>q(a=>({...a,permissions:e}))),te&&I&&(0,c.jsx)(l.IM,{children:te})]})}),(0,c.jsxs)(l.aF,{isOpen:L,onClose:()=>G(!1),title:"Password Generated",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Z),K(!0),setTimeout(()=>K(!1),2e3)},children:Y?"Copied!":"Copy Password"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>G(!1),children:"Done"})]}),children:[(0,c.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Z})]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,c.jsxs)(l.aF,{isOpen:!!X,onClose:()=>ee(null),title:"Delete Manager",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>ee(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(X){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${re}/staff/${X.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await se();else{const e=await a.json();V(e.message||"Failed to delete manager")}}catch(e){V(e.message)}ee(null)}},children:"Delete"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,c.jsx)("strong",{children:null===X||void 0===X?void 0:X.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,c.jsx)(l.aF,{isOpen:!!H,onClose:()=>V(""),title:"Notice",size:"small",footer:(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>V(""),children:"OK"}),children:(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:H})}),(0,c.jsxs)(l.aF,{isOpen:!!ae,onClose:()=>ie(null),title:"Reset Password",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>ie(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ae){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/foodcourts/${re}/staff/${ae.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(W(e.generatedPassword),G(!0))}else{const e=await a.json();V(e.message||"Failed to reset password")}}catch(e){V(e.message)}ie(null)}},children:"Reset"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,c.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}},2488:(e,a,i)=>{i.d(a,{DO:()=>d,Jt:()=>p,Qn:()=>l});i(9950);var t=i(4752),n=i(4414);const r=t.Ay.div`
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
`,s=t.Ay.input`
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
`,o=t.Ay.select`
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
`,l=e=>{let{children:a,className:i,style:t,...s}=e;return(0,n.jsx)(r,{className:i,style:t,...s,children:a})},d=e=>{let{placeholder:a="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:a,...i})},p=e=>{let{children:a,...i}=e;return(0,n.jsx)(o,{...i,children:a})}}}]);