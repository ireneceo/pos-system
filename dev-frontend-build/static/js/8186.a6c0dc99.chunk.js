"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8186],{2488:(e,a,n)=>{n.d(a,{DO:()=>d,Jt:()=>p,Qn:()=>l});n(9950);var i=n(4752),t=n(4414);const r=i.Ay.div`
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
`,s=i.Ay.input`
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
`,o=i.Ay.select`
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
`,l=e=>{let{children:a,className:n,style:i,...s}=e;return(0,t.jsx)(r,{className:n,style:i,...s,children:a})},d=e=>{let{placeholder:a="Search...",...n}=e;return(0,t.jsx)(s,{placeholder:a,...n})},p=e=>{let{children:a,...n}=e;return(0,t.jsx)(o,{...n,children:a})}},8186:(e,a,n)=>{n.r(a),n.d(a,{default:()=>T});var i=n(9950),t=n(4752),r=n(1367),s=n(7960),o=n(9610),l=n(2488),d=n(8666),p=n(4414);const c=[{key:"dashboard",label:"Dashboard",alwaysOn:!0},{key:"management",label:"Management (Brands / Restaurants / Staff)",alwaysOn:!1},{key:"products",label:"Products & Inventory (Products / Recipes / Suppliers / Inventory)",alwaysOn:!1},{key:"operations",label:"Operations (Invoices / Reports / Performance)",alwaysOn:!1},{key:"communication",label:"Communication (Notices / Inquiries)",alwaysOn:!1},{key:"plans_payments",label:"Plans & Payments (Plans / Subscriptions / Payment Settings)",alwaysOn:!1}],x=t.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=t.Ay.div`
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
`,m=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=t.Ay.div`
  display: flex;
  gap: 12px;
`,u=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"danger"===e.variant?"\n    background: #DC2626;\n    color: white;\n    &:hover {\n      background: #B91C1C;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=t.Ay.div`
  padding: 32px;
`,y=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,w=t.Ay.table`
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
`,b=t.Ay.thead`
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
`,j=t.Ay.tr`
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
`,v=t.Ay.td`
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
`,F=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,k=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,C=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,A=t.Ay.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 500;
  background: #EDE9FE;
  color: #7C3AED;
`,E=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,S=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,B=t.Ay.button`
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
`,z=(0,t.Ay)(B)`
  &:hover {
    border-color: #DC2626;
    color: #DC2626;
    background: #FEF2F2;
  }
`,O=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,P=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
`,$=t.Ay.label`
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
`,D=t.Ay.span`
  font-size: 11px;
  color: #16A34A;
`,T=()=>{const{user:e}=(0,r.As)(),[a,n]=(0,i.useState)([]),[t,T]=(0,i.useState)(""),[N,R]=(0,i.useState)(!1),[M,I]=(0,i.useState)({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),[_,U]=(0,i.useState)(!1),[Q,q]=(0,i.useState)(null),[J,Z]=(0,i.useState)({name:"",email:"",phone:"",username:"",permissions:[]}),[W,L]=(0,i.useState)(""),[G,Y]=(0,i.useState)(!1),[K,H]=(0,i.useState)(!1),[V,X]=(0,i.useState)(""),[ee,ae]=(0,i.useState)(null),[ne,ie]=(0,i.useState)(null),[te,re]=(0,i.useState)(""),se=null===e||void 0===e?void 0:e.brand_id,oe=(0,i.useCallback)(async()=>{if(se)try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${se}/staff`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),i=(e.data||[]).map(e=>({id:e.id.toString(),username:e.username||"",name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",permissions:(()=>{if(Array.isArray(e.permissions))return e.permissions;if("string"===typeof e.permissions)try{return JSON.parse(e.permissions)}catch{return[]}return[]})()}));n(i)}}catch(e){}},[se]);(0,i.useEffect)(()=>{e&&se&&oe()},[e,se,oe]);const le=a.filter(e=>{if(t){const a=t.toLowerCase();if(!e.name.toLowerCase().includes(a)&&!e.email.toLowerCase().includes(a))return!1}return!0}),de={total:a.length,active:a.filter(e=>"active"===e.status).length},pe=(e,a)=>(0,p.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this manager can access:"}),(0,p.jsx)(P,{children:c.map(n=>(0,p.jsxs)($,{alwaysOn:n.alwaysOn,children:[(0,p.jsx)("input",{type:"checkbox",checked:n.alwaysOn||e.includes(n.key),disabled:n.alwaysOn,onChange:i=>{if(n.alwaysOn)return;const t=i.target.checked?[...e,n.key]:e.filter(e=>e!==n.key);a(t)},style:{accentColor:"#635BFF"}}),n.label,n.alwaysOn&&(0,p.jsx)(D,{children:"(Always ON)"})]},n.key))})]}),ce="Brand General"===(null===e||void 0===e?void 0:e.role);return(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(m,{children:"Managers"}),ce&&(0,p.jsx)(g,{children:(0,p.jsx)(u,{variant:"primary",onClick:()=>{I({username:"",name:"",email:"",phone:"",permissions:["dashboard"]}),re(""),R(!0)},children:"Add Manager"})})]}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#7C3AED",children:[(0,p.jsx)(s.Os,{children:de.total}),(0,p.jsx)(s.v0,{children:"Total Managers"})]}),(0,p.jsxs)(s.hI,{color:"#059669",children:[(0,p.jsx)(s.Os,{children:de.active}),(0,p.jsx)(s.v0,{children:"Active"})]})]}),(0,p.jsx)(l.Qn,{children:(0,p.jsx)(l.DO,{type:"text",placeholder:"Search by name, email...",value:t,onChange:e=>T(e.target.value),autoComplete:"off"})}),(0,p.jsx)(y,{children:0===le.length?(0,p.jsxs)(O,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No managers found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:ce?"Add managers to help manage your brand":"No managers assigned to this brand"})]}):(0,p.jsxs)(w,{children:[(0,p.jsx)(b,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:"Manager"}),(0,p.jsx)("th",{children:"Permissions"}),(0,p.jsx)("th",{children:"Status"}),(0,p.jsx)("th",{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:le.map(e=>(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{"data-label":"Manager",children:[(0,p.jsx)(F,{children:e.name}),(0,p.jsx)(k,{children:e.email})]}),(0,p.jsx)(v,{"data-label":"Permissions",children:(0,p.jsxs)(C,{children:[0===e.permissions.length?(0,p.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"No permissions"}):e.permissions.slice(0,3).map(e=>{var a;return(0,p.jsx)(A,{children:(null===(a=c.find(a=>a.key===e))||void 0===a?void 0:a.key)||e},e)}),e.permissions.length>3&&(0,p.jsxs)(A,{children:["+",e.permissions.length-3]})]})}),(0,p.jsx)(v,{"data-label":"Status",children:(0,p.jsx)(E,{active:"active"===e.status,children:e.status})}),(0,p.jsx)(v,{"data-label":"",children:(0,p.jsxs)(S,{children:[(0,p.jsx)(B,{onClick:()=>(e=>{q(e),Z({name:e.name,email:e.email,phone:e.phone,username:e.username,permissions:[...e.permissions]}),re(""),U(!0)})(e),children:"Edit"}),ce&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(B,{onClick:()=>ie(e),children:"Reset PW"}),(0,p.jsx)(z,{onClick:()=>ae(e),children:"Delete"})]})]})})]},e.id))})]})})]}),(0,p.jsxs)(o.aF,{isOpen:N,onClose:()=>{R(!1),re("")},title:"Add New Manager",size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{R(!1),re("")},children:"Cancel"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(M.username.trim())if(M.name.trim())if(M.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${se}/staff`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:M.username.trim(),email:M.email.trim(),full_name:M.name.trim(),phone:M.phone.trim()||null,permissions:JSON.stringify(M.permissions)})});if(a.ok){const e=await a.json();await oe(),R(!1),e.generatedPassword&&(L(e.generatedPassword),Y(!0))}else{const e=await a.json();re(e.message||"Failed to create manager")}}catch(e){re(e.message)}else re("Email is required.");else re("Full Name is required.");else re("Username is required.")},children:"Add Manager"})]}),children:[(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Username *"}),(0,p.jsx)(o.ZQ,{type:"text",value:M.username,onChange:e=>I(a=>({...a,username:e.target.value})),placeholder:"Enter unique username",autoComplete:"off"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"A strong password will be auto-generated"})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Full Name *"}),(0,p.jsx)(o.ZQ,{type:"text",value:M.name,onChange:e=>I(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Email *"}),(0,p.jsx)(o.ZQ,{type:"email",value:M.email,onChange:e=>I(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Phone"}),(0,p.jsx)(d.A,{value:M.phone,onChange:e=>I(a=>({...a,phone:e}))})]})]}),pe(M.permissions,e=>I(a=>({...a,permissions:e}))),te&&N&&(0,p.jsx)(o.IM,{children:te})]}),(0,p.jsx)(o.aF,{isOpen:_,onClose:()=>{U(!1),q(null),re("")},title:`Edit Manager: ${(null===Q||void 0===Q?void 0:Q.name)||""}`,size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{U(!1),q(null),re("")},children:"Cancel"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(Q)if(J.name.trim())if(J.email.trim())try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${se}/staff/${Q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:J.name.trim(),email:J.email.trim(),phone:J.phone.trim()||null,username:J.username.trim()})});if(!a.ok){const e=await a.json();return void re(e.message||"Failed to update manager")}const n=await fetch(`/api/brands/${se}/staff/${Q.id}/permissions`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({permissions:J.permissions})});if(n.ok)await oe(),U(!1),q(null);else{const e=await n.json();re(e.message||"Failed to update permissions")}}catch(e){re(e.message)}else re("Email is required.");else re("Full Name is required.")},children:"Update Manager"})]}),children:Q&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Username"}),(0,p.jsx)(o.ZQ,{type:"text",value:J.username,onChange:e=>Z(a=>({...a,username:e.target.value})),placeholder:"Username",autoComplete:"off"})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Full Name *"}),(0,p.jsx)(o.ZQ,{type:"text",value:J.name,onChange:e=>Z(a=>({...a,name:e.target.value})),placeholder:"Enter full name",autoComplete:"off"})]})]}),(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Email *"}),(0,p.jsx)(o.ZQ,{type:"email",value:J.email,onChange:e=>Z(a=>({...a,email:e.target.value})),placeholder:"Enter email address",autoComplete:"off"})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Phone"}),(0,p.jsx)(d.A,{value:J.phone,onChange:e=>Z(a=>({...a,phone:e}))})]})]}),pe(J.permissions,e=>Z(a=>({...a,permissions:e}))),te&&_&&(0,p.jsx)(o.IM,{children:te})]})}),(0,p.jsxs)(o.aF,{isOpen:G,onClose:()=>Y(!1),title:"Password Generated",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(W),H(!0),setTimeout(()=>H(!1),2e3)},children:K?"Copied!":"Copy Password"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:()=>Y(!1),children:"Done"})]}),children:[(0,p.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"Please share this password with the manager. They should change it after first login."}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:W})]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:"This password will not be shown again. Please copy it now."})]}),(0,p.jsxs)(o.aF,{isOpen:!!ee,onClose:()=>ae(null),title:"Delete Manager",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>ae(null),children:"Cancel"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(ee){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${se}/staff/${ee.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(a.ok)await oe();else{const e=await a.json();X(e.message||"Failed to delete manager")}}catch(e){X(e.message)}ae(null)}},children:"Delete"})]}),children:[(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Are you sure you want to delete ",(0,p.jsx)("strong",{children:null===ee||void 0===ee?void 0:ee.name}),"?"]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:"This action cannot be undone. The manager will lose access immediately."})]}),(0,p.jsx)(o.aF,{isOpen:!!V,onClose:()=>X(""),title:"Notice",size:"small",footer:(0,p.jsx)(o.yl,{variant:"primary",onClick:()=>X(""),children:"OK"}),children:(0,p.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:V})}),(0,p.jsxs)(o.aF,{isOpen:!!ne,onClose:()=>ie(null),title:"Reset Password",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>ie(null),children:"Cancel"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(ne){try{const e=localStorage.getItem("auth_token"),a=await fetch(`/api/brands/${se}/staff/${ne.id}/reset-password`,{method:"PUT",headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e.generatedPassword&&(L(e.generatedPassword),Y(!0))}else{const e=await a.json();X(e.message||"Failed to reset password")}}catch(e){X(e.message)}ie(null)}},children:"Reset"})]}),children:[(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:["Reset the password for ",(0,p.jsx)("strong",{children:null===ne||void 0===ne?void 0:ne.name}),"?"]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:"A new password will be generated. The current password will no longer work."})]})]})}}}]);