"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{3416:(e,t,n)=>{n.r(t),n.d(t,{default:()=>L});var r=n(9950),i=n(4752),a=n(3310),o=n(1367),s=n(2674),l=n(4414);const d=[{key:"dashboard",label:"Dashboard",alwaysOn:!0},{key:"pos_terminal",label:"POS Terminal",alwaysOn:!0},{key:"live_orders",label:"Live Orders",alwaysOn:!0},{key:"kitchen_display",label:"Kitchen Display",alwaysOn:!0},{key:"customer_display",label:"Customer Display",alwaysOn:!0},{key:"menu_management",label:"Products (Menu / Categories / Options / Recipe)",alwaysOn:!1},{key:"inventory",label:"Stock Management (Suppliers / Inventory)",alwaysOn:!1},{key:"marketing",label:"Marketing (Customers / Coupons)",alwaysOn:!1},{key:"reports",label:"Analytics (Reports / Activity History)",alwaysOn:!1},{key:"support",label:"Support (Invoices / Inquiries)",alwaysOn:!1},{key:"settings",label:"Settings (Store / Company / Notifications)",alwaysOn:!1}],c=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=i.Ay.div`
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
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,u=i.Ay.button`
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
`,m=i.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,f=i.Ay.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px 1fr 150px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${e=>e.clickable?"pointer":"default"};
  
  &:hover {
    background: ${e=>e.clickable?"#F8FAFC":"transparent"};
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
`,b=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,w=i.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"manager":return"#7C3AED";case"staff":case"kitchen":return"#059669";case"cashier":return"#2563EB";default:return"#6B7280"}}};
`,k=i.Ay.div`
  flex: 1;
`,A=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,S=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,F=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"manager":return"#EDE9FE";case"staff":case"kitchen":return"#ECFDF5";case"cashier":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"manager":return"#7C3AED";case"staff":case"kitchen":return"#059669";case"cashier":return"#1E40AF";default:return"#6B7280"}}};
`,C=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,B=i.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
  
  &:last-child {
    margin-right: 0;
  }
`,E=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,O=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,z=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,D=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,I=i.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,P=i.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,T=i.Ay.div`
  display: flex;
  flex-direction: column;
`,$=i.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,R=i.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,N=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,L=()=>{const{user:e}=(0,o.As)(),[t,n]=(0,r.useState)([]),[i,L]=(0,r.useState)(""),[W,U]=(0,r.useState)(!1),[q,K]=(0,r.useState)({name:"",email:"",phone:"",role:"Staff",department:"Operations",pin_code:"",permissions:[]}),[J,H]=(0,r.useState)(""),[Y,G]=(0,r.useState)(!1),[Q,V]=(0,r.useState)(""),[X,Z]=(0,r.useState)(!1),ee=(0,r.useCallback)(e=>{"Escape"===e.key&&(Q?V(""):Y?G(!1):W&&re())},[Q,Y,W]);(0,r.useEffect)(()=>(window.addEventListener("keydown",ee),()=>window.removeEventListener("keydown",ee)),[ee]),(0,r.useEffect)(()=>{e?(async()=>{try{const t=null===e||void 0===e?void 0:e.restaurantId,r={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},i=await fetch("/api/users",{headers:r});if(i.ok){const e=await i.json(),r=(e.data||e).filter(e=>{var n;return e.restaurant_id===t||(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())===(null===t||void 0===t?void 0:t.toString())}).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"Operations",pin_code:e.pin_code||null,restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastActive:"Active",permissions:Array.isArray(e.permissions)?e.permissions:[]}});n(r)}}catch(t){}})():n([])},[e]);const te=t.filter(e=>!(i&&!e.name.toLowerCase().includes(i.toLowerCase())&&!e.email.toLowerCase().includes(i.toLowerCase()))),ne={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},re=()=>{U(!1),K({name:"",email:"",phone:"",role:"Staff",department:"Operations",pin_code:"",permissions:[]})},ie=async()=>{try{const t=null===e||void 0===e?void 0:e.restaurantId,r=localStorage.getItem("auth_token"),i=await fetch("/api/users",{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json(),r=e.data||e,a=r.filter(e=>{var n;return e.restaurant_id===t||(null===(n=e.restaurant_id)||void 0===n?void 0:n.toString())===(null===t||void 0===t?void 0:t.toString())}).map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,department:e.department||"Operations",pin_code:e.pin_code||null,restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"",lastActive:"Active",permissions:Array.isArray(e.permissions)?e.permissions:[]}});n(a)}}catch(t){}},ae=(e,t)=>{K(n=>({...n,[e]:t}))},[oe,se]=(0,r.useState)(null);return(0,l.jsx)(a.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:"Restaurant Staff"}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>V("Export functionality is coming soon."),children:"Export"}),(0,l.jsx)(u,{variant:"primary",onClick:()=>{U(!0)},children:"Add Staff"})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(s.MD,{children:[(0,l.jsxs)(s.hI,{color:"#059669",children:[(0,l.jsx)(s.Os,{children:ne.total}),(0,l.jsx)(s.v0,{children:"Total Staff"})]}),(0,l.jsxs)(s.hI,{color:"#7C3AED",children:[(0,l.jsx)(s.Os,{children:ne.active}),(0,l.jsx)(s.v0,{children:"Active Staff"})]}),(0,l.jsxs)(s.hI,{color:"#DC2626",children:[(0,l.jsx)(s.Os,{children:ne.admins}),(0,l.jsx)(s.v0,{children:"Admins"})]}),(0,l.jsxs)(s.hI,{color:"#2563EB",children:[(0,l.jsx)(s.Os,{children:ne.staff}),(0,l.jsx)(s.v0,{children:"Staff Members"})]})]}),(0,l.jsx)(g,{children:(0,l.jsx)(f,{type:"text",placeholder:"Search staff by name or email...",value:i,onChange:e=>L(e.target.value)})}),(0,l.jsxs)(y,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)("span",{children:"Staff Member"}),(0,l.jsx)("span",{children:"Role"}),(0,l.jsx)("span",{children:"Department"}),(0,l.jsx)("span",{children:"PIN"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Actions"})]}),0===te.length?(0,l.jsxs)(E,{children:[(0,l.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,l.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):te.map(e=>{return(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:[(0,l.jsx)(w,{role:e.role,children:(t=e.name,t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{children:e.name}),(0,l.jsx)(S,{children:e.email})]})]}),(0,l.jsx)(F,{role:e.role,children:e.role}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:e.department}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:e.pin_code?"****":"\u2014"}),(0,l.jsx)(C,{active:"active"===e.status,children:e.status}),(0,l.jsxs)("div",{children:[(0,l.jsx)(B,{onClick:()=>{V("Edit functionality is coming soon.")},children:"Edit"}),"Staff"===e.role&&(0,l.jsx)(B,{onClick:()=>(e=>{"Restaurant Admin"!==e.role&&se(e)})(e),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote"})]})]},e.id);var t})]})]}),(0,l.jsx)(O,{show:W,onClick:e=>{e.target===e.currentTarget&&re()},children:(0,l.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(D,{children:"Add New Staff Member"}),(0,l.jsx)(I,{onClick:re,children:"\xd7"})]}),(0,l.jsxs)(P,{children:[(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"Full Name"}),(0,l.jsx)(R,{type:"text",value:q.name,onChange:e=>ae("name",e.target.value),placeholder:"Enter full name"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"Email"}),(0,l.jsx)(R,{type:"email",value:q.email,onChange:e=>ae("email",e.target.value),placeholder:"Enter email address"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"Phone"}),(0,l.jsx)(R,{type:"text",value:q.phone,onChange:e=>ae("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"Role"}),(0,l.jsxs)(N,{value:q.role,onChange:e=>ae("role",e.target.value),children:[(0,l.jsx)("option",{value:"Staff",children:"Staff"}),(0,l.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"Department"}),(0,l.jsxs)(N,{value:q.department,onChange:e=>ae("department",e.target.value),children:[(0,l.jsx)("option",{value:"Operations",children:"Operations"}),(0,l.jsx)("option",{value:"Kitchen",children:"Kitchen"}),(0,l.jsx)("option",{value:"Service",children:"Service"}),(0,l.jsx)("option",{value:"Management",children:"Management"})]})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)($,{children:"PIN Code (4 digits) *"}),(0,l.jsx)(R,{type:"text",inputMode:"numeric",maxLength:4,value:q.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");ae("pin_code",t)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,l.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),"Staff"===q.role&&(0,l.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#0A2540",marginBottom:"4px"},children:"Menu Access"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93",marginBottom:"12px"},children:"Select which menu sections this staff member can access. Core system menus are always enabled."}),(0,l.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))",gap:"8px"},children:d.map(e=>(0,l.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderRadius:"6px",background:e.alwaysOn?"#F0FDF4":"white",border:"1px solid "+(e.alwaysOn?"#BBF7D0":"#E6EBF1"),cursor:e.alwaysOn?"default":"pointer",fontSize:"13px",color:e.alwaysOn?"#166534":"#374151",opacity:e.alwaysOn?.8:1},children:[(0,l.jsx)("input",{type:"checkbox",checked:e.alwaysOn||q.permissions.includes(e.key),disabled:e.alwaysOn,onChange:t=>{if(e.alwaysOn)return;const n=t.target.checked?[...q.permissions,e.key]:q.permissions.filter(t=>t!==e.key);K(e=>({...e,permissions:n}))},style:{accentColor:"#635BFF"}}),e.label,e.alwaysOn&&(0,l.jsx)("span",{style:{fontSize:"11px",color:"#16A34A"},children:"(Always ON)"})]},e.key))})]}),(0,l.jsxs)(M,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:re,children:"Cancel"}),(0,l.jsx)(u,{variant:"primary",onClick:async()=>{if(q.name&&q.email)if(q.pin_code&&4===q.pin_code.length)try{const t=null===e||void 0===e?void 0:e.restaurantId,n={username:q.email.split("@")[0],email:q.email,role:q.role,full_name:q.name,restaurant_id:parseInt((null===t||void 0===t?void 0:t.toString())||"0"),phone:q.phone,department:q.department,pin_code:q.pin_code,permissions:"Staff"===q.role?JSON.stringify(q.permissions):"[]"},r=localStorage.getItem("auth_token"),i=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(n)});if(i.ok){const e=await i.json();await ie();const t=e.generatedPassword;re(),t&&(H(t),G(!0))}else{const e=await i.json();V(e.error||"Failed to create staff")}}catch(t){V(t.message)}else V("A 4-digit PIN code is required for POS cashier switch.");else V("Name and email are required.")},children:"Add Staff"})]})]})}),(0,l.jsx)(O,{show:Y,onClick:e=>{e.target===e.currentTarget&&G(!1)},children:(0,l.jsxs)(z,{style:{maxWidth:"420px"},onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(D,{children:"Staff Created"}),(0,l.jsx)(I,{onClick:()=>G(!1),children:"\xd7"})]}),(0,l.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"The staff account has been created with an auto-generated password. Please share this password with the staff member."}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,l.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:J})]}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginBottom:"20px"},children:"This password will not be shown again. Please copy it now."}),(0,l.jsxs)(M,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(J),Z(!0),setTimeout(()=>Z(!1),2e3)},children:X?"Copied!":"Copy Password"}),(0,l.jsx)(u,{variant:"primary",onClick:()=>G(!1),children:"Done"})]})]})}),(0,l.jsx)(O,{show:!!Q,onClick:e=>{e.target===e.currentTarget&&V("")},children:(0,l.jsxs)(z,{style:{maxWidth:"400px"},onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(D,{style:{fontSize:"18px"},children:"Notice"}),(0,l.jsx)(I,{onClick:()=>V(""),children:"\xd7"})]}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#374151",marginBottom:"20px"},children:Q}),(0,l.jsx)(M,{children:(0,l.jsx)(u,{variant:"primary",onClick:()=>V(""),children:"OK"})})]})}),(0,l.jsx)(O,{show:!!oe,onClick:e=>{e.target===e.currentTarget&&se(null)},children:(0,l.jsxs)(z,{style:{maxWidth:"420px"},onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(D,{style:{fontSize:"18px"},children:"Promote Staff"}),(0,l.jsx)(I,{onClick:()=>se(null),children:"\xd7"})]}),(0,l.jsxs)("div",{style:{fontSize:"14px",color:"#374151",marginBottom:"20px"},children:["Promote ",(0,l.jsx)("strong",{children:null===oe||void 0===oe?void 0:oe.name})," to Restaurant Admin?"]}),(0,l.jsxs)(M,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>se(null),children:"Cancel"}),(0,l.jsx)(u,{variant:"primary",onClick:async()=>{const e=oe;if(e){se(null);try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({role:"Restaurant Admin"})});if(n.ok)await ie();else{const e=await n.json();V(e.error||"Failed to promote staff")}}catch(t){V(t.message)}}},children:"Promote"})]})]})})]})})}}}]);