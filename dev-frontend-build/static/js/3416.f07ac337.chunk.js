"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{3416:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var n=r(9950),a=r(4752),i=r(3310),o=r(1367),s=r(2674),l=r(4414);const d=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,c=a.Ay.div`
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
`,p=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,x=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,h=a.Ay.button`
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
`,u=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,f=a.Ay.input`
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
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=a.Ay.div`
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
`,j=a.Ay.div`
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
`,y=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,A=a.Ay.div`
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
`,b=a.Ay.div`
  flex: 1;
`,w=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,F=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,S=a.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#FEE2E2";case"manager":return"#EDE9FE";case"staff":case"kitchen":return"#ECFDF5";case"cashier":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role.toLowerCase()){case"restaurant admin":return"#DC2626";case"manager":return"#7C3AED";case"staff":case"kitchen":return"#059669";case"cashier":return"#1E40AF";default:return"#6B7280"}}};
`,C=a.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,k=a.Ay.button`
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
`,E=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,B=a.Ay.div`
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
`,z=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,_=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,I=a.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,D=a.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,$=a.Ay.div`
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
`,O=a.Ay.div`
  display: flex;
  flex-direction: column;
`,R=a.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,P=a.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,T=a.Ay.select`
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
`,N=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,U=()=>{const{user:e}=(0,o.As)(),[t,r]=(0,n.useState)([]),[a,U]=(0,n.useState)(""),[L,M]=(0,n.useState)(!1),[W,q]=(0,n.useState)({name:"",email:"",phone:"",role:"Staff",department:"Operations",pin_code:""}),[K,J]=(0,n.useState)(""),[Y,G]=(0,n.useState)(!1),[H,Q]=(0,n.useState)("");(0,n.useEffect)(()=>{e?(async()=>{try{console.log("\ud83d\udc65 [Restaurant] Fetching staff for restaurant...");const t=null===e||void 0===e?void 0:e.restaurantId;console.log("\ud83c\udfea Current restaurant ID:",t);const n={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},a=await fetch("/api/users",{headers:n});if(console.log("\ud83d\udce1 Users API response status:",a.status),a.ok){const e=await a.json();console.log("\ud83d\udc65 All users data from API:",e);const n=(e.data||e).filter(e=>{var r;return e.restaurant_id===t||(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())===(null===t||void 0===t?void 0:t.toString())});console.log("\ud83c\udfea Filtered restaurant staff:",n);const i=n.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",pin_code:e.pin_code||null,restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Restaurant] Transformed staff data:",i),r(i)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():r([])},[e]);const V=t.filter(e=>!(a&&!e.name.toLowerCase().includes(a.toLowerCase())&&!e.email.toLowerCase().includes(a.toLowerCase()))),X={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},Z=()=>{M(!1),q({name:"",email:"",phone:"",role:"Staff",department:"Operations",pin_code:""})},ee=(e,t)=>{q(r=>({...r,[e]:t}))};return(0,l.jsx)(i.A,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:"Restaurant Staff"}),(0,l.jsxs)(x,{children:[(0,l.jsx)(h,{variant:"secondary",onClick:()=>alert("Export functionality will be implemented"),children:"Export"}),(0,l.jsx)(h,{variant:"primary",onClick:()=>{M(!0)},children:"Add Staff"})]})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(s.MD,{children:[(0,l.jsxs)(s.hI,{color:"#059669",children:[(0,l.jsx)(s.Os,{children:X.total}),(0,l.jsx)(s.v0,{children:"Total Staff"})]}),(0,l.jsxs)(s.hI,{color:"#7C3AED",children:[(0,l.jsx)(s.Os,{children:X.active}),(0,l.jsx)(s.v0,{children:"Active Staff"})]}),(0,l.jsxs)(s.hI,{color:"#DC2626",children:[(0,l.jsx)(s.Os,{children:X.admins}),(0,l.jsx)(s.v0,{children:"Admins"})]}),(0,l.jsxs)(s.hI,{color:"#2563EB",children:[(0,l.jsx)(s.Os,{children:X.staff}),(0,l.jsx)(s.v0,{children:"Staff Members"})]})]}),(0,l.jsx)(m,{children:(0,l.jsx)(f,{type:"text",placeholder:"Search staff by name or email...",value:a,onChange:e=>U(e.target.value)})}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)("span",{children:"Staff Member"}),(0,l.jsx)("span",{children:"Role"}),(0,l.jsx)("span",{children:"Department"}),(0,l.jsx)("span",{children:"PIN"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Actions"})]}),0===V.length?(0,l.jsxs)(E,{children:[(0,l.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,l.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):V.map(t=>{return(0,l.jsxs)(j,{children:[(0,l.jsxs)(y,{children:[(0,l.jsx)(A,{role:t.role,children:(n=t.name,n.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,l.jsxs)(b,{children:[(0,l.jsx)(w,{children:t.name}),(0,l.jsx)(F,{children:t.email})]})]}),(0,l.jsx)(S,{role:t.role,children:t.role}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:t.department}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontFamily:"monospace",letterSpacing:"2px"},children:t.pin_code||"\u2014"}),(0,l.jsx)(C,{active:"active"===t.status,children:t.status}),(0,l.jsxs)("div",{children:[(0,l.jsx)(k,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(t),children:"Edit"}),"Staff"===t.role&&(0,l.jsx)(k,{onClick:()=>(async t=>{if("Restaurant Admin"===t.role)return void alert(`${t.name} is already a Restaurant Admin`);if(confirm(`Promote ${t.name} to Restaurant Admin?`))try{console.log(`\ud83d\udd04 [Restaurant] Promoting ${t.name} to Restaurant Admin...`);const n=localStorage.getItem("auth_token"),a=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({role:"Restaurant Admin"})});if(a.ok){const a=null===e||void 0===e?void 0:e.restaurantId,i=await fetch("/api/users",{headers:{Authorization:`Bearer ${n}`}});if(i.ok){const e=await i.json(),t=(e.data||e).filter(e=>{var t;return e.restaurant_id===a||(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())===(null===a||void 0===a?void 0:a.toString())}),n=t.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",pin_code:e.pin_code||null,restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});r(n)}alert(`${t.name} has been promoted to Restaurant Admin successfully!`)}else{const e=await a.json();console.error("Failed to promote staff:",e),alert("Failed to promote staff: "+(e.error||"Unknown error"))}}catch(n){console.error("Error promoting staff:",n),alert("Error promoting staff: "+n.message)}})(t),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote"})]})]},t.id);var n})]})]}),(0,l.jsx)(B,{show:L,children:(0,l.jsxs)(z,{children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(I,{children:"Add New Staff Member"}),(0,l.jsx)(D,{onClick:Z,children:"\xd7"})]}),(0,l.jsxs)($,{children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"Full Name"}),(0,l.jsx)(P,{type:"text",value:W.name,onChange:e=>ee("name",e.target.value),placeholder:"Enter full name"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"Email"}),(0,l.jsx)(P,{type:"email",value:W.email,onChange:e=>ee("email",e.target.value),placeholder:"Enter email address"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"Phone"}),(0,l.jsx)(P,{type:"text",value:W.phone,onChange:e=>ee("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"Role"}),(0,l.jsxs)(T,{value:W.role,onChange:e=>ee("role",e.target.value),children:[(0,l.jsx)("option",{value:"Staff",children:"Staff"}),(0,l.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"Department"}),(0,l.jsxs)(T,{value:W.department,onChange:e=>ee("department",e.target.value),children:[(0,l.jsx)("option",{value:"Operations",children:"Operations"}),(0,l.jsx)("option",{value:"Kitchen",children:"Kitchen"}),(0,l.jsx)("option",{value:"Service",children:"Service"}),(0,l.jsx)("option",{value:"Management",children:"Management"})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(R,{children:"PIN Code (4 digits) *"}),(0,l.jsx)(P,{type:"text",inputMode:"numeric",maxLength:4,value:W.pin_code,onChange:e=>{const t=e.target.value.replace(/[^0-9]/g,"");ee("pin_code",t)},placeholder:"e.g. 1234",style:{letterSpacing:"8px",fontSize:"18px",textAlign:"center",fontFamily:"monospace"}}),(0,l.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"Used for quick cashier switch at POS terminal"})]})]}),(0,l.jsxs)(N,{children:[(0,l.jsx)(h,{variant:"secondary",onClick:Z,children:"Cancel"}),(0,l.jsx)(h,{variant:"primary",onClick:async()=>{if(W.name&&W.email)if(W.pin_code&&4===W.pin_code.length)try{const t=null===e||void 0===e?void 0:e.restaurantId,n={username:W.email.split("@")[0],email:W.email,role:W.role,full_name:W.name,restaurant_id:parseInt((null===t||void 0===t?void 0:t.toString())||"0"),phone:W.phone,department:W.department,pin_code:W.pin_code},a=localStorage.getItem("auth_token"),i=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(i.ok){const e=await i.json(),n=await fetch("/api/users",{headers:{Authorization:`Bearer ${a}`}});if(n.ok){const e=await n.json(),a=(e.data||e).filter(e=>{var r;return e.restaurant_id===t||(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())===(null===t||void 0===t?void 0:t.toString())}),i=a.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||W.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});r(i)}const o=e.generatedPassword;Z(),o&&(J(o),G(!0))}else{const e=await i.json();Q(e.error||"Failed to create staff")}}catch(t){Q(t.message)}else Q("A 4-digit PIN code is required for POS cashier switch.");else Q("Name and email are required.")},children:"Add Staff"})]})]})}),(0,l.jsx)(B,{show:Y,children:(0,l.jsxs)(z,{style:{maxWidth:"420px"},children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(I,{children:"Staff Created"}),(0,l.jsx)(D,{onClick:()=>G(!1),children:"\xd7"})]}),(0,l.jsx)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"The staff account has been created with an auto-generated password. Please share this password with the staff member."}),(0,l.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:"Temporary Password"}),(0,l.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:K})]}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginBottom:"20px"},children:"This password will not be shown again. Please copy it now."}),(0,l.jsxs)(N,{children:[(0,l.jsx)(h,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(K)},children:"Copy Password"}),(0,l.jsx)(h,{variant:"primary",onClick:()=>G(!1),children:"Done"})]})]})}),(0,l.jsx)(B,{show:!!H,children:(0,l.jsxs)(z,{style:{maxWidth:"400px"},children:[(0,l.jsxs)(_,{children:[(0,l.jsx)(I,{style:{fontSize:"18px",color:"#DC2626"},children:"Error"}),(0,l.jsx)(D,{onClick:()=>Q(""),children:"\xd7"})]}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#374151",marginBottom:"20px"},children:H}),(0,l.jsx)(N,{children:(0,l.jsx)(h,{variant:"primary",onClick:()=>Q(""),children:"OK"})})]})})]})})}}}]);