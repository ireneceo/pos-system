"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6780],{6780:(e,r,n)=>{n.r(r),n.d(r,{default:()=>M});var a=n(9950),t=n(4752),o=n(3310),s=n(5781),i=n(1367),l=n(9610),d=n(1313),c=n(2874),p=n(4414);const x=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=t.Ay.div`
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
`,u=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,h=t.Ay.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,f=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
`,y=t.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,j=t.Ay.div`
  flex: 1;
`,w=t.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,v=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,b=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,A=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,F=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,S=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,E=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,C=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,P=t.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,B=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`,k=t.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,D=t.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,z=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,U=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,$=t.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E5E7EB"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7280"};
  
  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F9FAFB"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,I=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,T=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,_=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,R=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,N=t.Ay.div`
  min-height: 40px;
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${e=>e.show?1:0};
  visibility: ${e=>e.show?"visible":"hidden"};
  transition: opacity 0.3s, visibility 0.3s;
  background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
  color: #0369A1;
  border: 1px solid #BAE6FD;

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0369A1;
    color: white;
    font-size: 12px;
    flex-shrink: 0;
  }
`,M=()=>{const{currentStaff:e,updateStaff:r,isLoggedIn:n}=(0,s.g)(),{user:t,isAuthenticated:M,updateUser:L}=(0,i.As)(),[O,W]=(0,a.useState)("profile"),[G,J]=(0,a.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[Y,H]=(0,a.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[V,q]=(0,a.useState)(""),[K,Q]=(0,a.useState)(!1),X=(e,r)=>{J(n=>({...n,[e]:r})),Z||(ee(!0),se(!1))},[Z,ee]=(0,a.useState)(!1),[re,ne]=(0,a.useState)(!1),[ae,te]=(0,a.useState)(null),[oe,se]=(0,a.useState)(!1),[ie,le]=(0,a.useState)(null),[de,ce]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=await fetch(`/api/users/${t.id}`);if(!e.ok)throw new Error("Failed to fetch user");const r=await e.json(),n=r.data||r;console.log(" Fetched user:",n),le(n)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");ce(!1)})()},[null===t||void 0===t?void 0:t.id]);const pe=(0,a.useMemo)(()=>ie?{id:ie.id,name:ie.full_name||ie.name||"Unknown",email:ie.email,phone:ie.phone||"",username:ie.username||ie.email,role:ie.role,department:ie.department||ie.position||("System Admin"===ie.role?"System Administration":"Administration"),company_name:ie.company_name||("System Admin"===ie.role?"Purple Here Technologies Sdn Bhd":""),joinDate:ie.createdAt||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null,[ie]);(0,a.useEffect)(()=>{ie&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:ie.full_name,username:ie.username,email:ie.email,role:ie.role,department:ie.department,position:ie.position,createdAt:ie.createdAt,updatedAt:ie.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",pe))},[ie]),(0,a.useEffect)(()=>{if(pe&&""===G.name){console.log("\ud83d\udd25 Initializing formData from currentUser:",pe);const e={name:pe.name||"",email:pe.email||"",phone:pe.phone||"",department:pe.department||"",company_name:pe.company_name||""};console.log("\ud83d\udd25 New formData:",e),J(e),ee(!1)}},[pe,G.name]),(0,a.useEffect)(()=>{if(pe){const e=G.name!==pe.name||G.email!==pe.email||G.phone!==pe.phone||G.department!==(pe.department||"")||G.company_name!==(pe.company_name||"");ee(e),e&&oe&&se(!1)}},[G,pe,oe]);(0,a.useEffect)(()=>{const e=e=>{if(Z)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[Z]);const xe=(e,r,n)=>{te(a=>({...a,[e]:{...a[e],[r]:n}}))};return M&&pe?de||!pe?(0,p.jsx)(o.A,{children:(0,p.jsx)(x,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:(0,p.jsx)("div",{children:"Loading profile..."})})})}):(0,p.jsx)(o.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(m,{children:(0,p.jsx)(u,{children:"My Profile"})}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(y,{role:pe.role,children:(e=>{if(!e)return"?";const r=e.trim().split(" ").filter(e=>e.length>0);return 0===r.length?"?":1===r.length?r[0].substring(0,2).toUpperCase():r.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(pe.name)}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(w,{children:[pe.name," ",ie&&(0,p.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(b,{role:pe.role,children:pe.role}),(0,p.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:pe.department})]}),(0,p.jsxs)(A,{children:["Member since ",(me=pe.joinDate,new Date(me).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const r=new Date(e),n=(new Date).getTime()-r.getTime(),a=Math.floor(n/36e5);if(a<1)return"Just now";if(a<24)return`${a}h ago`;return`${Math.floor(a/24)}d ago`})(pe.lastLogin),ie&&(0,p.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",ie.id]})]})]})]}),(0,p.jsx)(d.Ay,{useUrlParams:!0,defaultTab:"profile",onTabChange:e=>{"System Admin"===(null===pe||void 0===pe?void 0:pe.role)&&"performance"===e?W("profile"):W(e)},tabs:[{key:"profile",label:"Personal Information"},{key:"schedule",label:"Work Schedule"},..."System Admin"!==pe.role?[{key:"performance",label:"Performance"}]:[],{key:"security",label:"Change Password"}]}),"profile"===O&&(0,p.jsx)(F,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)(S,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Full Name"}),(0,p.jsx)(P,{type:"text",value:G.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),X("name",e.target.value)},placeholder:"Enter full name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Role"}),(0,p.jsx)(P,{type:"text",value:pe.role,disabled:!0})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Email Address"}),(0,p.jsx)(P,{type:"email",value:G.email||"",onChange:e=>X("email",e.target.value),placeholder:"Enter email address"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Username"}),(0,p.jsx)(P,{type:"text",value:pe.username,disabled:!0})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Phone Number"}),(0,p.jsx)(c.A,{value:G.phone||"",onChange:e=>X("phone",e)})]}),"System Admin"===pe.role&&(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Company Name"}),(0,p.jsx)(P,{type:"text",value:G.company_name||"",onChange:e=>X("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Department"}),(0,p.jsx)(P,{type:"text",value:G.department||"",onChange:e=>X("department",e.target.value),placeholder:"Enter department"})]})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)($,{type:"button",onClick:()=>{pe&&(J({name:pe.name,email:pe.email,phone:pe.phone,department:pe.department||"",company_name:pe.company_name||""}),ee(!1),se(!1))},disabled:!Z,children:"Reset"}),(0,p.jsx)($,{type:"button",variant:"primary",disabled:!Z,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",pe),console.log("\ud83d\udd25 hasChanges:",Z),console.log("\ud83d\udd25 formData:",G),console.log("\ud83d\udd25 dbUser:",ie),console.log("\ud83d\udd25 authUser:",t),pe&&Z)try{if(console.log("\ud83d\udd25 Saving profile data..."),ie&&null!==t&&void 0!==t&&t.id){console.log("\ud83d\udd25 Updating database user with ID:",t.id);const e=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({full_name:G.name,email:G.email,phone:G.phone,department:G.department,company_name:G.company_name})});if(!e.ok)throw console.error("\u274c Database update failed:",e.status),new Error("Failed to update user in database");const r=await e.json();console.log("\u2705 Database update result:",r);const n=await fetch(`/api/users/${t.id}`);if(n.ok){const e=await n.json(),r=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",r),le(r)}L({name:G.name,email:G.email}),ee(!1),se(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(r){console.error("\u274c Failed to update profile:",r),alert("Failed to save profile: "+r.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,p.jsx)(N,{show:oe&&!Z,children:"Your profile has been successfully updated."})]})}),"schedule"===O&&(0,p.jsxs)(F,{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===pe||void 0===pe?void 0:pe.role)||"manager"===(null===pe||void 0===pe?void 0:pe.role))&&(0,p.jsx)($,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{pe&&(te({...pe.schedule}),ne(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===pe||void 0===pe?void 0:pe.role)&&"manager"!==(null===pe||void 0===pe?void 0:pe.role)&&(0,p.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,p.jsx)(I,{children:Object.entries(pe.schedule).map(e=>{let[r,n]=e;return(0,p.jsxs)(T,{active:n.active,children:[(0,p.jsx)(_,{children:r}),(0,p.jsx)(R,{children:n.active?`${n.start} - ${n.end}`:"Off"})]},r)})})]}),"performance"===O&&(0,p.jsxs)(F,{children:[(0,p.jsx)(g,{children:"Performance Statistics"}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(k,{children:[(0,p.jsx)(D,{children:pe.totalShifts}),(0,p.jsx)(z,{children:"Total Shifts"})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(D,{children:["RM ",pe.totalSales.toLocaleString()]}),(0,p.jsx)(z,{children:"Total Sales"})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(D,{children:[pe.performance.efficiency,"%"]}),(0,p.jsx)(z,{children:"Efficiency"})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(D,{children:pe.performance.customerRating.toFixed(1)}),(0,p.jsx)(z,{children:"Customer Rating"})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(D,{children:pe.performance.ordersProcessed.toLocaleString()}),(0,p.jsx)(z,{children:"Orders Processed"})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)(D,{children:pe.performance.ordersProcessed>0?(pe.totalSales/pe.performance.ordersProcessed).toFixed(2):"0.00"}),(0,p.jsx)(z,{children:"Avg Order Value"})]})]})]}),"security"===O&&(0,p.jsx)(F,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)(S,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Current Password"}),(0,p.jsx)(P,{type:"password",value:Y.currentPassword,onChange:e=>H({...Y,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"New Password"}),(0,p.jsx)(P,{type:"password",value:Y.newPassword,onChange:e=>H({...Y,newPassword:e.target.value}),placeholder:"Enter new password (min 4 characters)"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(C,{children:"Confirm New Password"}),(0,p.jsx)(P,{type:"password",value:Y.confirmPassword,onChange:e=>H({...Y,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),V&&(0,p.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:V}),K&&(0,p.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,p.jsx)(U,{children:(0,p.jsx)($,{variant:"primary",onClick:async()=>{if(q(""),Q(!1),Y.currentPassword&&Y.newPassword&&Y.confirmPassword)if(Y.newPassword.length<4)q("New password must be at least 4 characters long");else if(Y.newPassword===Y.confirmPassword)if(Y.currentPassword!==Y.newPassword)try{const e=await fetch(`/api/users/${null===pe||void 0===pe?void 0:pe.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:Y.currentPassword,newPassword:Y.newPassword})});if(!e.ok){const r=await e.json();return void q(r.error||"Failed to change password")}Q(!0),H({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{Q(!1)},5e3)}catch(e){console.error("Error changing password:",e),q("An error occurred while changing password")}else q("New password must be different from current password");else q("New passwords do not match");else q("All fields are required")},children:"Change Password"})})]})})]}),(0,p.jsx)(l.aF,{isOpen:re,onClose:()=>ne(!1),title:"Edit Schedule",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,p.jsx)(l.yl,{onClick:async()=>{pe&&ae&&(e&&await r(e.id,{schedule:ae}),ne(!1),te(null))},children:"Save Schedule"})]}),children:ae&&(0,p.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(ae).map(e=>{let[r,n]=e;return(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,p.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:r}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,p.jsx)("input",{type:"checkbox",checked:n.active,onChange:e=>xe(r,"active",e.target.checked),style:{cursor:"pointer"}}),(0,p.jsx)("span",{style:{color:n.active?"#059669":"#6B7280"},children:n.active?"Active":"Off"})]}),n.active&&(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("input",{type:"time",value:n.start,onChange:e=>xe(r,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,p.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,p.jsx)("input",{type:"time",value:n.end,onChange:e=>xe(r,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},r)})})})]})}):(0,p.jsx)(o.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(m,{children:(0,p.jsx)(u,{children:"My Profile"})}),(0,p.jsx)(h,{children:(0,p.jsx)(F,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var me}}}]);