"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6],{6:(e,i,a)=>{a.r(i),a.d(i,{default:()=>O});var n=a(9950),r=a(4752),t=a(2853),s=a(1367),o=a(8409),l=a(9610),d=a(2488),p=a(8666),c=a(4414);const x=[{key:"dashboard",label:"Dashboard"},{key:"management",label:"Management (Foodcourts / Restaurants / Staff)"},{key:"operations",label:"Operations (Invoices / Statistics / Customers / Coupons)"},{key:"communication",label:"Communication (Notices / Inquiries)"},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)"}],m=r.Ay.div`
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
`,g=r.Ay.div`
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
  border: ${e=>"primary"===e.variant||"danger"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"danger"===e.variant?"#DC2626":"white"};
  color: ${e=>"primary"===e.variant||"danger"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"danger"===e.variant?"#B91C1C":"#F6F9FC"};
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
`,w=r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 180px;
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
  grid-template-columns: 2fr 1.5fr 1fr 180px;
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
`,b=r.Ay.div`
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
  background: #2563EB;
`,C=r.Ay.div`
  flex: 1;
  min-width: 0;
`,k=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,A=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,S=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=r.Ay.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #DBEAFE;
  color: #2563EB;
`,B=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,z=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,T=r.Ay.button`
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
`,$=(0,r.Ay)(T)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,P=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,D=r.Ay.label`
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
`,O=()=>{const{user:e}=(0,s.As)(),[i,a]=(0,n.useState)([]),[r,O]=(0,n.useState)(""),[N,R]=(0,n.useState)(!1),[M,I]=(0,n.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[U,_]=(0,n.useState)(!1),[Q,q]=(0,n.useState)(null),[J,Z]=(0,n.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[W,L]=(0,n.useState)(""),[G,K]=(0,n.useState)(!1),[Y,H]=(0,n.useState)(!1),[V,X]=(0,n.useState)(""),[ee,ie]=(0,n.useState)(null),[ae,ne]=(0,n.useState)(null),[re,te]=(0,n.useState)(""),se=null===e||void 0===e?void 0:e.foodcourt_id,oe=(0,n.useCallback)(async()=>{if(se)try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${se}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),n=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));a(n)}}catch(e){}},[se]);(0,n.useEffect)(()=>{e&&se&&oe()},[e,se,oe]);const le=i.filter(e=>{if(r){const i=r.toLowerCase();if(!e.name.toLowerCase().includes(i)&&!e.email.toLowerCase().includes(i))return!1}return!0}),de={total:i.length,active:i.filter(e=>"active"===e.status).length},pe=(e,i)=>(0,c.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,c.jsx)(P,{children:x.map(a=>(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",checked:e.includes(a.key),onChange:n=>{const r=n.target.checked?[...e,a.key]:e.filter(e=>e!==a.key);i(r)},style:{accentColor:"#635BFF"}}),a.label]},a.key))})]}),ce="Foodcourt General"===(null===e||void 0===e?void 0:e.role);return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(m,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Foodcourt Managers"}),ce&&(0,c.jsx)(g,{children:(0,c.jsx)(f,{variant:"primary",onClick:()=>{I({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),te(""),R(!0)},children:"Add Manager"})})]}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#2563EB",children:[(0,c.jsx)(o.Os,{children:de.total}),(0,c.jsx)(o.v0,{children:"Total Managers"})]}),(0,c.jsxs)(o.hI,{color:"#059669",children:[(0,c.jsx)(o.Os,{children:de.active}),(0,c.jsx)(o.v0,{children:"Active"})]})]}),(0,c.jsx)(d.Qn,{children:(0,c.jsx)(d.DO,{type:"text",placeholder:"Search by name, email...",value:r,onChange:e=>O(e.target.value),autoComplete:"off"})}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)("span",{children:"Manager"}),(0,c.jsx)("span",{children:"Permissions"}),(0,c.jsx)("span",{children:"Status"}),(0,c.jsx)("span",{children:"Actions"})]}),0===le.length?(0,c.jsxs)(t.pp,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:ce?"Add managers to help manage your foodcourt":"No managers assigned to this foodcourt"})]}):le.map(e=>{return(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(F,{children:(i=e.name,i.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)||"?")}),(0,c.jsxs)(C,{children:[(0,c.jsx)(k,{children:e.name}),(0,c.jsx)(A,{children:e.email})]})]}),(0,c.jsxs)(S,{children:[0===e.permissions.length?(0,c.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"No permissions"}):e.permissions.slice(0,3).map(e=>{var i;return(0,c.jsx)(E,{children:(null===(i=x.find(i=>i.key===e))||void 0===i?void 0:i.key)||e},e)}),e.permissions.length>3&&(0,c.jsxs)(E,{children:["+",e.permissions.length-3]})]}),(0,c.jsx)(B,{active:"active"===e.status,children:e.status}),(0,c.jsxs)(z,{children:[(0,c.jsx)(T,{onClick:()=>(e=>{q(e),Z({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),te(""),_(!0)})(e),children:"Edit"}),ce&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(T,{onClick:()=>ne(e),children:"Reset PW"}),(0,c.jsx)($,{onClick:()=>ie(e),children:"Delete"})]})]})]},e.id);var i})]})]}),(0,c.jsxs)(l.aF,{isOpen:N,onClose:()=>{R(!1),te("")},title:"Add New Manager",size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{R(!1),te("")},children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(M.username.trim())if(M.name.trim())if(M.email.trim())try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${se}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:M.username.trim(),email:M.email.trim(),full_name:M.name.trim(),phone:M.phone.trim()||null,permissions:JSON.stringify(M.permissions)})});if(i.ok){const e=await i.json();await oe(),R(!1),e.generatedPassword&&(L(e.generatedPassword),K(!0))}else{const e=await i.json();te(e.message||"Failed to create manager")}}catch(e){te(e.message)}else te("Email is required.");else te("Full Name is required.");else te("Username is required.")},children:"Add Manager"})]}),children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Username *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.username,onChange:e=>I(i=>({...i,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:M.name,onChange:e=>I(i=>({...i,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:M.email,onChange:e=>I(i=>({...i,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:M.phone,onChange:e=>I(i=>({...i,phone:e}))})]})]}),pe(M.permissions,e=>I(i=>({...i,permissions:e}))),re&&N&&(0,c.jsx)(l.IM,{children:re})]}),(0,c.jsx)(l.aF,{isOpen:U,onClose:()=>{_(!1),q(null),te("")},title:`Edit Manager: ${(null===Q||void 0===Q?void 0:Q.name)||""}`,size:"large",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{_(!1),q(null),te("")},children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(Q)if(J.name.trim())if(J.email.trim())try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${se}/staff/${Q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:J.name.trim(),email:J.email.trim(),phone:J.phone.trim()||null,username:J.username.trim()})});if(!i.ok){const e=await i.json();return void te(e.message||"Failed to update manager")}const a=await fetch(`/api/foodcourts/${se}/staff/${Q.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:J.permissions})});if(a.ok)await oe(),_(!1),q(null);else{const e=await a.json();te(e.message||"Failed to update permissions")}}catch(e){te(e.message)}else te("Email is required.");else te("Full Name is required.")},children:"Update Manager"})]}),children:Q&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Username"}),(0,c.jsx)(l.ZQ,{type:"text",value:J.username,onChange:e=>Z(i=>({...i,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Full Name *"}),(0,c.jsx)(l.ZQ,{type:"text",value:J.name,onChange:e=>Z(i=>({...i,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,c.jsxs)(l.fh,{children:[(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Email *"}),(0,c.jsx)(l.ZQ,{type:"email",value:J.email,onChange:e=>Z(i=>({...i,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,c.jsxs)(l.gE,{children:[(0,c.jsx)(l.lR,{children:"Phone"}),(0,c.jsx)(p.A,{value:J.phone,onChange:e=>Z(i=>({...i,phone:e}))})]})]}),pe(J.permissions,e=>Z(i=>({...i,permissions:e}))),re&&U&&(0,c.jsx)(l.IM,{children:re})]})}),(0,c.jsxs)(l.aF,{isOpen:G,onClose:()=>K(!1),title:"Password Generated",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(W),H(!0),setTimeout(()=>H(!1),2e3)},children:Y?"Copied!":"Copy Password"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>K(!1),children:"Done"})]}),children:[(0,c.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,c.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,c.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:W})]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,c.jsxs)(l.aF,{isOpen:!!ee,onClose:()=>ie(null),title:"Delete Manager",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>ie(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ee){try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${se}/staff/${ee.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(i.ok)await oe();else{const e=await i.json();X(e.message||"Failed to delete manager")}}catch(e){X(e.message)}ie(null)}},children:"Delete"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,c.jsx)("strong",{children:null===ee||void 0===ee?void 0:ee.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,c.jsx)(l.aF,{isOpen:!!V,onClose:()=>X(""),title:"Notice",size:"small",footer:(0,c.jsx)(l.yl,{variant:"primary",onClick:()=>X(""),children:"OK"}),children:(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:V})}),(0,c.jsxs)(l.aF,{isOpen:!!ae,onClose:()=>ne(null),title:"Reset Password",size:"small",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>ne(null),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ae){try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/foodcourts/${se}/staff/${ae.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.generatedPassword&&(L(e.generatedPassword),K(!0))}else{const e=await i.json();X(e.message||"Failed to reset password")}}catch(e){X(e.message)}ne(null)}},children:"Reset"})]}),children:[(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,c.jsx)("strong",{children:null===ae||void 0===ae?void 0:ae.name}),"?"]}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})})}},2488:(e,i,a)=>{a.d(i,{DO:()=>d,Jt:()=>p,Qn:()=>l});a(9950);var n=a(4752),r=a(4414);const t=n.Ay.div`
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
`,s=n.Ay.input`
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
`,o=n.Ay.select`
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
`,l=e=>{let{children:i,className:a,style:n,...s}=e;return(0,r.jsx)(t,{className:a,style:n,...s,children:i})},d=e=>{let{placeholder:i="Search...",...a}=e;return(0,r.jsx)(s,{placeholder:i,...a})},p=e=>{let{children:i,...a}=e;return(0,r.jsx)(o,{...a,children:i})}}}]);