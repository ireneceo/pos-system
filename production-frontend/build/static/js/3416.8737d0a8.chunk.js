"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3416],{3416:(e,t,r)=>{r.r(t),r.d(t,{default:()=>L});var n=r(9950),a=r(4752),o=r(3310),i=r(1367),s=r(7492),l=r(4414);const d=a.Ay.div`
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
`,u=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,x=a.Ay.button`
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
`,f=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,m=a.Ay.input`
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
  grid-template-columns: 2fr 1fr 1fr 1fr 150px;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 150px;
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
`,b=a.Ay.div`
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
`,A=a.Ay.div`
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
`,E=a.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,C=a.Ay.button`
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
`,k=a.Ay.div`
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
`,D=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`,R=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,z=a.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,I=a.Ay.button`
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
`,_=a.Ay.label`
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
`,U=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,L=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,n.useState)([]),[a,L]=(0,n.useState)(""),[M,N]=(0,n.useState)(!1),[J,K]=(0,n.useState)({name:"",email:"",phone:"",role:"Staff",department:"Operations"});(0,n.useEffect)(()=>{e?(async()=>{try{console.log("\ud83d\udc65 [Restaurant] Fetching staff for restaurant...");const t=null===e||void 0===e?void 0:e.restaurantId;console.log("\ud83c\udfea Current restaurant ID:",t);const n=await fetch("/api/users");if(console.log("\ud83d\udce1 Users API response status:",n.status),n.ok){const e=await n.json();console.log("\ud83d\udc65 All users data from API:",e);const a=(e.data||e).filter(e=>{var r;return e.restaurant_id===t||(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())===(null===t||void 0===t?void 0:t.toString())});console.log("\ud83c\udfea Filtered restaurant staff:",a);const o=a.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});console.log("\u2705 [Restaurant] Transformed staff data:",o),r(o)}else console.error("Failed to fetch users data")}catch(t){console.error("Error fetching staff data:",t)}})():r([])},[e]);const q=t.filter(e=>!(a&&!e.name.toLowerCase().includes(a.toLowerCase())&&!e.email.toLowerCase().includes(a.toLowerCase()))),W={total:t.length,active:t.filter(e=>"active"===e.status).length,admins:t.filter(e=>"Restaurant Admin"===e.role).length,staff:t.filter(e=>"Staff"===e.role).length},Y=()=>{N(!1),K({name:"",email:"",phone:"",role:"Staff",department:"Operations"})},G=(e,t)=>{K(r=>({...r,[e]:t}))};return(0,l.jsx)(o.A,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:"Restaurant Staff"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(x,{variant:"secondary",onClick:()=>alert("Export functionality will be implemented"),children:"Export"}),(0,l.jsx)(x,{variant:"primary",onClick:()=>{N(!0)},children:"+ Add Staff"})]})]}),(0,l.jsxs)(f,{children:[(0,l.jsxs)(s.MD,{children:[(0,l.jsxs)(s.hI,{color:"#059669",children:[(0,l.jsx)(s.Os,{children:W.total}),(0,l.jsx)(s.v0,{children:"Total Staff"})]}),(0,l.jsxs)(s.hI,{color:"#7C3AED",children:[(0,l.jsx)(s.Os,{children:W.active}),(0,l.jsx)(s.v0,{children:"Active Staff"})]}),(0,l.jsxs)(s.hI,{color:"#DC2626",children:[(0,l.jsx)(s.Os,{children:W.admins}),(0,l.jsx)(s.v0,{children:"Admins"})]}),(0,l.jsxs)(s.hI,{color:"#2563EB",children:[(0,l.jsx)(s.Os,{children:W.staff}),(0,l.jsx)(s.v0,{children:"Staff Members"})]})]}),(0,l.jsx)(h,{children:(0,l.jsx)(m,{type:"text",placeholder:"Search staff by name or email...",value:a,onChange:e=>L(e.target.value)})}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)("span",{children:"Staff Member"}),(0,l.jsx)("span",{children:"Role"}),(0,l.jsx)("span",{children:"Department"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Actions"})]}),0===q.length?(0,l.jsxs)(k,{children:[(0,l.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No staff found"}),(0,l.jsx)("div",{style:{fontSize:"14px"},children:"Add staff members to manage your restaurant team"})]}):q.map(t=>{return(0,l.jsxs)(j,{children:[(0,l.jsxs)(y,{children:[(0,l.jsx)(b,{role:t.role,children:(n=t.name,n.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,l.jsxs)(A,{children:[(0,l.jsx)(w,{children:t.name}),(0,l.jsx)(F,{children:t.email})]})]}),(0,l.jsx)(S,{role:t.role,children:t.role}),(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:t.department}),(0,l.jsx)(E,{active:"active"===t.status,children:t.status}),(0,l.jsxs)("div",{children:[(0,l.jsx)(C,{onClick:()=>(e=>{alert(`Edit ${e.name} functionality will be implemented`)})(t),children:"Edit"}),"Staff"===t.role&&(0,l.jsx)(C,{onClick:()=>(async t=>{if("Restaurant Admin"===t.role)return void alert(`${t.name} is already a Restaurant Admin`);if(confirm(`Promote ${t.name} to Restaurant Admin?`))try{console.log(`\ud83d\udd04 [Restaurant] Promoting ${t.name} to Restaurant Admin...`);const n=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:"Restaurant Admin"})});if(n.ok){const n=null===e||void 0===e?void 0:e.restaurantId,a=await fetch("/api/users");if(a.ok){const e=await a.json(),t=(e.data||e).filter(e=>{var t;return e.restaurant_id===n||(null===(t=e.restaurant_id)||void 0===t?void 0:t.toString())===(null===n||void 0===n?void 0:n.toString())}),o=t.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});r(o)}alert(`${t.name} has been promoted to Restaurant Admin successfully!`)}else{const e=await n.json();console.error("Failed to promote staff:",e),alert("Failed to promote staff: "+(e.error||"Unknown error"))}}catch(n){console.error("Error promoting staff:",n),alert("Error promoting staff: "+n.message)}})(t),style:{backgroundColor:"#635BFF",color:"white",borderColor:"#635BFF"},children:"Promote"})]})]},t.id);var n})]})]}),(0,l.jsx)(B,{show:M,children:(0,l.jsxs)(D,{children:[(0,l.jsxs)(R,{children:[(0,l.jsx)(z,{children:"Add New Staff Member"}),(0,l.jsx)(I,{onClick:Y,children:"\xd7"})]}),(0,l.jsxs)($,{children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(_,{children:"Full Name"}),(0,l.jsx)(P,{type:"text",value:J.name,onChange:e=>G("name",e.target.value),placeholder:"Enter full name"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(_,{children:"Email"}),(0,l.jsx)(P,{type:"email",value:J.email,onChange:e=>G("email",e.target.value),placeholder:"Enter email address"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(_,{children:"Phone"}),(0,l.jsx)(P,{type:"text",value:J.phone,onChange:e=>G("phone",e.target.value),placeholder:"Enter phone number"})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(_,{children:"Role"}),(0,l.jsxs)(T,{value:J.role,onChange:e=>G("role",e.target.value),children:[(0,l.jsx)("option",{value:"Staff",children:"Staff"}),(0,l.jsx)("option",{value:"Restaurant Admin",children:"Restaurant Admin"})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(_,{children:"Department"}),(0,l.jsxs)(T,{value:J.department,onChange:e=>G("department",e.target.value),children:[(0,l.jsx)("option",{value:"Operations",children:"Operations"}),(0,l.jsx)("option",{value:"Kitchen",children:"Kitchen"}),(0,l.jsx)("option",{value:"Service",children:"Service"}),(0,l.jsx)("option",{value:"Management",children:"Management"})]})]})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)(x,{variant:"secondary",onClick:Y,children:"Cancel"}),(0,l.jsx)(x,{variant:"primary",onClick:async()=>{if(J.name&&J.email)try{const t=null===e||void 0===e?void 0:e.restaurantId,n={username:J.email.split("@")[0],email:J.email,password:"staff123",role:J.role,full_name:J.name,restaurant_id:parseInt((null===t||void 0===t?void 0:t.toString())||"0"),phone:J.phone,department:J.department};console.log("\ud83d\udd04 [Restaurant] Creating new staff user:",n);const a=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(a.ok){const e=await a.json();console.log("\u2705 [Restaurant] Staff created successfully:",e);const n=await fetch("/api/users");if(n.ok){const e=await n.json(),a=(e.data||e).filter(e=>{var r;return e.restaurant_id===t||(null===(r=e.restaurant_id)||void 0===r?void 0:r.toString())===(null===t||void 0===t?void 0:t.toString())}),o=a.map(e=>{var t;return{id:e.id.toString(),name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||J.phone||"+60 12-345-6789",role:e.role,department:e.department||"Operations",restaurantId:null===(t=e.restaurant_id)||void 0===t?void 0:t.toString(),status:"active",joinDate:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastActive:"Active",permissions:"Restaurant Admin"===e.role?["pos","inventory","reports"]:["pos"]}});r(o)}Y(),alert("Staff member added successfully! Default password: staff123")}else{const e=await a.json();console.error("Failed to create staff:",e),alert("Failed to create staff: "+(e.error||"Unknown error"))}}catch(t){console.error("Error creating staff:",t),alert("Error creating staff: "+t.message)}else alert("Please fill in all required fields")},children:"Add Staff"})]})]})})]})})}}}]);