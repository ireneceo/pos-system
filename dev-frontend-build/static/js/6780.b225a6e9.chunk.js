"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6780],{6780:(e,r,n)=>{n.r(r),n.d(r,{default:()=>T});var a=n(9950),t=n(4752),o=n(5781),s=n(1367),i=n(9610),l=n(1313),d=n(8666),c=n(8012),p=n(4414);const x=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=t.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,h=t.Ay.div`
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
`,g=t.Ay.div`
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
`,f=t.Ay.div`
  flex: 1;
`,y=t.Ay.div`
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
`,w=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,j=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,b=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,A=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,F=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,S=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,E=t.Ay.input`
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
`,P=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`,C=t.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,B=t.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,k=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,D=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,z=t.Ay.button`
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
`,_=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,U=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,$=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,I=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=t.Ay.div`
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
`,T=()=>{const{currentStaff:e,updateStaff:r,isLoggedIn:n}=(0,o.g)(),{user:t,isAuthenticated:T,updateUser:M,isLoading:N}=(0,s.As)(),[L,O]=(0,a.useState)("profile"),[W,G]=(0,a.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[H,J]=(0,a.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[Y,q]=(0,a.useState)(""),[V,Z]=(0,a.useState)(!1),K=(e,r)=>{G(n=>({...n,[e]:r})),Q||(X(!0),oe(!1))},[Q,X]=(0,a.useState)(!1),[ee,re]=(0,a.useState)(!1),[ne,ae]=(0,a.useState)(null),[te,oe]=(0,a.useState)(!1),[se,ie]=(0,a.useState)(null),[le,de]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)throw new Error("Failed to fetch user");const n=await r.json(),a=n.data||n;console.log(" Fetched user:",a),ie(a)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");de(!1)})()},[null===t||void 0===t?void 0:t.id]);const ce=(0,a.useMemo)(()=>{const e=se||t;return e?{id:e.id,name:(null===se||void 0===se?void 0:se.full_name)||(null===se||void 0===se?void 0:se.name)||(null===t||void 0===t?void 0:t.name)||(null===t||void 0===t?void 0:t.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===se||void 0===se?void 0:se.username)||e.email,role:e.role,department:(null===se||void 0===se?void 0:se.department)||(null===se||void 0===se?void 0:se.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===se||void 0===se?void 0:se.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===se||void 0===se?void 0:se.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null},[se,t]);(0,a.useEffect)(()=>{se&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:se.full_name,username:se.username,email:se.email,role:se.role,department:se.department,position:se.position,createdAt:se.createdAt,updatedAt:se.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",ce))},[se]);const[pe,xe]=(0,a.useState)(!1);(0,a.useEffect)(()=>{if(se&&!pe){console.log("\ud83d\udd25 Initializing formData from dbUser:",se);const e={name:se.full_name||se.name||"",email:se.email||"",phone:se.phone||"",department:se.department||se.position||"",company_name:se.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),G(e),X(!1),xe(!0)}else if(ce&&""===W.name&&!se){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",ce);const e={name:ce.name||"",email:ce.email||"",phone:ce.phone||"",department:ce.department||"",company_name:ce.company_name||""};G(e),X(!1)}},[se,ce,pe]),(0,a.useEffect)(()=>{if(ce){const e=W.name!==ce.name||W.email!==ce.email||W.phone!==ce.phone||W.department!==(ce.department||"")||W.company_name!==(ce.company_name||"");X(e),e&&te&&oe(!1)}},[W,ce,te]);(0,a.useEffect)(()=>{const e=e=>{if(Q)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[Q]);const me=(e,r,n)=>{ae(a=>({...a,[e]:{...a[e],[r]:n}}))};return N||le?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(c.Ay,{title:"My Profile"}),(0,p.jsx)(m,{children:(0,p.jsx)(b,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,p.jsx)("div",{children:"Loading profile..."})})})})]})}):T&&ce?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(c.Ay,{title:"My Profile"}),(0,p.jsxs)(m,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{role:ce.role,children:(e=>{if(!e)return"?";const r=e.trim().split(" ").filter(e=>e.length>0);return 0===r.length?"?":1===r.length?r[0].substring(0,2).toUpperCase():r.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(ce.name)}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(y,{children:[ce.name," ",se&&(0,p.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(w,{role:ce.role,children:ce.role}),(0,p.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:ce.department})]}),(0,p.jsxs)(j,{children:["Member since ",(ue=ce.joinDate,new Date(ue).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const r=new Date(e),n=(new Date).getTime()-r.getTime(),a=Math.floor(n/36e5);if(a<1)return"Just now";if(a<24)return`${a}h ago`;return`${Math.floor(a/24)}d ago`})(ce.lastLogin),se&&(0,p.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",se.id]})]})]})]}),(0,p.jsx)(l.Ay,{useUrlParams:!0,defaultTab:"profile",onTabChange:e=>{"System Admin"===(null===ce||void 0===ce?void 0:ce.role)&&"performance"===e?O("profile"):O(e)},tabs:[{key:"profile",label:"Personal Information"},{key:"schedule",label:"Work Schedule"},..."System Admin"!==ce.role?[{key:"performance",label:"Performance"}]:[],{key:"security",label:"Change Password"}]}),"profile"===L&&(0,p.jsx)(b,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Full Name"}),(0,p.jsx)(E,{type:"text",value:W.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),K("name",e.target.value)},placeholder:"Enter full name"})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Role"}),(0,p.jsx)(E,{type:"text",value:ce.role,disabled:!0})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Email Address"}),(0,p.jsx)(E,{type:"email",value:W.email||"",onChange:e=>K("email",e.target.value),placeholder:"Enter email address"})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Username"}),(0,p.jsx)(E,{type:"text",value:ce.username,disabled:!0})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Phone Number"}),(0,p.jsx)(d.A,{value:W.phone||"",onChange:e=>K("phone",e)})]}),"System Admin"===ce.role&&(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Company Name"}),(0,p.jsx)(E,{type:"text",value:W.company_name||"",onChange:e=>K("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Department"}),(0,p.jsx)(E,{type:"text",value:W.department||"",onChange:e=>K("department",e.target.value),placeholder:"Enter department"})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(z,{type:"button",onClick:()=>{ce&&(G({name:ce.name,email:ce.email,phone:ce.phone,department:ce.department||"",company_name:ce.company_name||""}),X(!1),oe(!1))},disabled:!Q,children:"Reset"}),(0,p.jsx)(z,{type:"button",variant:"primary",disabled:!Q,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",ce),console.log("\ud83d\udd25 hasChanges:",Q),console.log("\ud83d\udd25 formData:",W),console.log("\ud83d\udd25 dbUser:",se),console.log("\ud83d\udd25 authUser:",t),ce&&Q)try{if(console.log("\ud83d\udd25 Saving profile data..."),se&&null!==t&&void 0!==t&&t.id){console.log("\ud83d\udd25 Updating database user with ID:",t.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:W.name,email:W.email,phone:W.phone,department:W.department,company_name:W.company_name})});if(!r.ok)throw console.error("\u274c Database update failed:",r.status),new Error("Failed to update user in database");const n=await r.json();console.log("\u2705 Database update result:",n);const a=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),r=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",r),ie(r)}M({name:W.name,email:W.email}),X(!1),oe(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(r){console.error("\u274c Failed to update profile:",r),alert("Failed to save profile: "+r.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,p.jsx)(R,{show:te&&!Q,children:"Your profile has been successfully updated."})]})}),"schedule"===L&&(0,p.jsxs)(b,{children:[(0,p.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===ce||void 0===ce?void 0:ce.role)||"manager"===(null===ce||void 0===ce?void 0:ce.role))&&(0,p.jsx)(z,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{ce&&(ae({...ce.schedule}),re(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===ce||void 0===ce?void 0:ce.role)&&"manager"!==(null===ce||void 0===ce?void 0:ce.role)&&(0,p.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,p.jsx)(_,{children:Object.entries(ce.schedule).map(e=>{let[r,n]=e;return(0,p.jsxs)(U,{active:n.active,children:[(0,p.jsx)($,{children:r}),(0,p.jsx)(I,{children:n.active?`${n.start} - ${n.end}`:"Off"})]},r)})})]}),"performance"===L&&(0,p.jsxs)(b,{children:[(0,p.jsx)(u,{children:"Performance Statistics"}),(0,p.jsxs)(P,{children:[(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:ce.totalShifts}),(0,p.jsx)(k,{children:"Total Shifts"})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(B,{children:["RM ",ce.totalSales.toLocaleString()]}),(0,p.jsx)(k,{children:"Total Sales"})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(B,{children:[ce.performance.efficiency,"%"]}),(0,p.jsx)(k,{children:"Efficiency"})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:ce.performance.customerRating.toFixed(1)}),(0,p.jsx)(k,{children:"Customer Rating"})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:ce.performance.ordersProcessed.toLocaleString()}),(0,p.jsx)(k,{children:"Orders Processed"})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:ce.performance.ordersProcessed>0?(ce.totalSales/ce.performance.ordersProcessed).toFixed(2):"0.00"}),(0,p.jsx)(k,{children:"Avg Order Value"})]})]})]}),"security"===L&&(0,p.jsx)(b,{children:(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,p.jsx)("strong",{children:"Password Requirements:"}),(0,p.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,p.jsx)("li",{children:"At least 8 characters"}),(0,p.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,p.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,p.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Current Password"}),(0,p.jsx)(E,{type:"password",value:H.currentPassword,onChange:e=>J({...H,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"New Password"}),(0,p.jsx)(E,{type:"password",value:H.newPassword,onChange:e=>J({...H,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number"})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Confirm New Password"}),(0,p.jsx)(E,{type:"password",value:H.confirmPassword,onChange:e=>J({...H,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),Y&&(0,p.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:Y}),V&&(0,p.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,p.jsx)(D,{children:(0,p.jsx)(z,{variant:"primary",onClick:async()=>{if(q(""),Z(!1),H.currentPassword&&H.newPassword&&H.confirmPassword)if(H.newPassword.length<8)q("Password must be at least 8 characters long");else if(/[a-z]/.test(H.newPassword))if(/[A-Z]/.test(H.newPassword))if(/[0-9]/.test(H.newPassword))if(H.newPassword===H.confirmPassword)if(H.currentPassword!==H.newPassword)try{const e=await fetch(`/api/users/${null===ce||void 0===ce?void 0:ce.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:H.currentPassword,newPassword:H.newPassword})});if(!e.ok){const r=await e.json();return void q(r.error||"Failed to change password")}Z(!0),J({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{Z(!1)},5e3)}catch(e){console.error("Error changing password:",e),q("An error occurred while changing password")}else q("New password must be different from current password");else q("New passwords do not match");else q("Password must contain at least one number");else q("Password must contain at least one uppercase letter");else q("Password must contain at least one lowercase letter");else q("All fields are required")},children:"Change Password"})})]})})]}),(0,p.jsx)(i.aF,{isOpen:ee,onClose:()=>re(!1),title:"Edit Schedule",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(i.yl,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,p.jsx)(i.yl,{onClick:async()=>{ce&&ne&&(e&&await r(e.id,{schedule:ne}),re(!1),ae(null))},children:"Save Schedule"})]}),children:ne&&(0,p.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(ne).map(e=>{let[r,n]=e;return(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,p.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:r}),(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,p.jsx)("input",{type:"checkbox",checked:n.active,onChange:e=>me(r,"active",e.target.checked),style:{cursor:"pointer"}}),(0,p.jsx)("span",{style:{color:n.active?"#059669":"#6B7280"},children:n.active?"Active":"Off"})]}),n.active&&(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,p.jsx)("input",{type:"time",value:n.start,onChange:e=>me(r,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,p.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,p.jsx)("input",{type:"time",value:n.end,onChange:e=>me(r,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},r)})})})]})}):(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(c.Ay,{title:"My Profile"}),(0,p.jsx)(m,{children:(0,p.jsx)(b,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var ue}},8012:(e,r,n)=>{n.d(r,{Ay:()=>l});n(9950);var a=n(4752),t=n(4414);const o=a.Ay.div`
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
`,s=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,i=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:r,children:n}=e;return(0,t.jsxs)(o,{children:[(0,t.jsx)(s,{children:r}),n&&(0,t.jsx)(i,{children:n})]})}}}]);