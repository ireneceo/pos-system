"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6780],{6780:(e,r,n)=>{n.r(r),n.d(r,{default:()=>T});var t=n(8819),a=n(9950),o=n(4752),s=n(5781),i=n(1367),l=n(9610),d=n(1313),c=n(8666),p=n(8012),x=n(4414);const m=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,g=o.Ay.div`
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
`,f=o.Ay.div`
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
`,y=o.Ay.div`
  flex: 1;
`,w=o.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,v=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,j=o.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,b=o.Ay.div`
  font-size: 14px;
  color: ${t.w.colors.text.muted};
`,A=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${t.w.colors.border};
  padding: 32px;
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,S=o.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,E=o.Ay.input`
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
    color: ${t.w.colors.text.muted};
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,P=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`,C=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,B=o.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,k=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,D=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,z=o.Ay.button`
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
`,$=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,_=o.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,U=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,I=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=o.Ay.div`
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
`,T=()=>{const{currentStaff:e,updateStaff:r,isLoggedIn:n}=(0,s.g)(),{user:t,isAuthenticated:o,updateUser:T,isLoading:M}=(0,i.As)(),[N,L]=(0,a.useState)("profile"),[O,W]=(0,a.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[G,H]=(0,a.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[J,Y]=(0,a.useState)(""),[q,V]=(0,a.useState)(!1),Z=(e,r)=>{W(n=>({...n,[e]:r})),K||(Q(!0),ae(!1))},[K,Q]=(0,a.useState)(!1),[X,ee]=(0,a.useState)(!1),[re,ne]=(0,a.useState)(null),[te,ae]=(0,a.useState)(!1),[oe,se]=(0,a.useState)(null),[ie,le]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)throw new Error("Failed to fetch user");const n=await r.json(),a=n.data||n;console.log(" Fetched user:",a),se(a)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");le(!1)})()},[null===t||void 0===t?void 0:t.id]);const de=(0,a.useMemo)(()=>{const e=oe||t;return e?{id:e.id,name:(null===oe||void 0===oe?void 0:oe.full_name)||(null===oe||void 0===oe?void 0:oe.name)||(null===t||void 0===t?void 0:t.name)||(null===t||void 0===t?void 0:t.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===oe||void 0===oe?void 0:oe.username)||e.email,role:e.role,department:(null===oe||void 0===oe?void 0:oe.department)||(null===oe||void 0===oe?void 0:oe.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===oe||void 0===oe?void 0:oe.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===oe||void 0===oe?void 0:oe.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null},[oe,t]);(0,a.useEffect)(()=>{oe&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:oe.full_name,username:oe.username,email:oe.email,role:oe.role,department:oe.department,position:oe.position,createdAt:oe.createdAt,updatedAt:oe.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",de))},[oe]);const[ce,pe]=(0,a.useState)(!1);(0,a.useEffect)(()=>{if(oe&&!ce){console.log("\ud83d\udd25 Initializing formData from dbUser:",oe);const e={name:oe.full_name||oe.name||"",email:oe.email||"",phone:oe.phone||"",department:oe.department||oe.position||"",company_name:oe.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),W(e),Q(!1),pe(!0)}else if(de&&""===O.name&&!oe){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",de);const e={name:de.name||"",email:de.email||"",phone:de.phone||"",department:de.department||"",company_name:de.company_name||""};W(e),Q(!1)}},[oe,de,ce]),(0,a.useEffect)(()=>{if(de){const e=O.name!==de.name||O.email!==de.email||O.phone!==de.phone||O.department!==(de.department||"")||O.company_name!==(de.company_name||"");Q(e),e&&te&&ae(!1)}},[O,de,te]);(0,a.useEffect)(()=>{const e=e=>{if(K)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[K]);const xe=(e,r,n)=>{ne(t=>({...t,[e]:{...t[e],[r]:n}}))};return M||ie?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(m,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(u,{children:(0,x.jsx)(A,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,x.jsx)("div",{children:"Loading profile..."})})})})]})}):o&&de?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(m,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsxs)(u,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(f,{role:de.role,children:(e=>{if(!e)return"?";const r=e.trim().split(" ").filter(e=>e.length>0);return 0===r.length?"?":1===r.length?r[0].substring(0,2).toUpperCase():r.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(de.name)}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(w,{children:[de.name," ",oe&&(0,x.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,x.jsxs)(v,{children:[(0,x.jsx)(j,{role:de.role,children:de.role}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:de.department})]}),(0,x.jsxs)(b,{children:["Member since ",(me=de.joinDate,new Date(me).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/36e5);if(t<1)return"Just now";if(t<24)return`${t}h ago`;return`${Math.floor(t/24)}d ago`})(de.lastLogin),oe&&(0,x.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",oe.id]})]})]})]}),(0,x.jsx)(d.Ay,{useUrlParams:!0,defaultTab:"profile",onTabChange:e=>{"System Admin"===(null===de||void 0===de?void 0:de.role)&&"performance"===e?L("profile"):L(e)},tabs:[{key:"profile",label:"Personal Information"},{key:"schedule",label:"Work Schedule"},..."System Admin"!==de.role?[{key:"performance",label:"Performance"}]:[],{key:"security",label:"Change Password"}]}),"profile"===N&&(0,x.jsx)(A,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Full Name"}),(0,x.jsx)(E,{type:"text",value:O.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),Z("name",e.target.value)},placeholder:"Enter full name"})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Role"}),(0,x.jsx)(E,{type:"text",value:de.role,disabled:!0})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Email Address"}),(0,x.jsx)(E,{type:"email",value:O.email||"",onChange:e=>Z("email",e.target.value),placeholder:"Enter email address"})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Username"}),(0,x.jsx)(E,{type:"text",value:de.username,disabled:!0})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Phone Number"}),(0,x.jsx)(c.A,{value:O.phone||"",onChange:e=>Z("phone",e)})]}),"System Admin"===de.role&&(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Company Name"}),(0,x.jsx)(E,{type:"text",value:O.company_name||"",onChange:e=>Z("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Department"}),(0,x.jsx)(E,{type:"text",value:O.department||"",onChange:e=>Z("department",e.target.value),placeholder:"Enter department"})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(z,{type:"button",onClick:()=>{de&&(W({name:de.name,email:de.email,phone:de.phone,department:de.department||"",company_name:de.company_name||""}),Q(!1),ae(!1))},disabled:!K,children:"Reset"}),(0,x.jsx)(z,{type:"button",variant:"primary",disabled:!K,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",de),console.log("\ud83d\udd25 hasChanges:",K),console.log("\ud83d\udd25 formData:",O),console.log("\ud83d\udd25 dbUser:",oe),console.log("\ud83d\udd25 authUser:",t),de&&K)try{if(console.log("\ud83d\udd25 Saving profile data..."),oe&&null!==t&&void 0!==t&&t.id){console.log("\ud83d\udd25 Updating database user with ID:",t.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:O.name,email:O.email,phone:O.phone,department:O.department,company_name:O.company_name})});if(!r.ok)throw console.error("\u274c Database update failed:",r.status),new Error("Failed to update user in database");const n=await r.json();console.log("\u2705 Database update result:",n);const a=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json(),r=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",r),se(r)}T({name:O.name,email:O.email}),Q(!1),ae(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(r){console.error("\u274c Failed to update profile:",r),alert("Failed to save profile: "+r.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,x.jsx)(R,{show:te&&!K,children:"Your profile has been successfully updated."})]})}),"schedule"===N&&(0,x.jsxs)(A,{children:[(0,x.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===de||void 0===de?void 0:de.role)||"manager"===(null===de||void 0===de?void 0:de.role))&&(0,x.jsx)(z,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{de&&(ne({...de.schedule}),ee(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===de||void 0===de?void 0:de.role)&&"manager"!==(null===de||void 0===de?void 0:de.role)&&(0,x.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,x.jsx)($,{children:Object.entries(de.schedule).map(e=>{let[r,n]=e;return(0,x.jsxs)(_,{active:n.active,children:[(0,x.jsx)(U,{children:r}),(0,x.jsx)(I,{children:n.active?`${n.start} - ${n.end}`:"Off"})]},r)})})]}),"performance"===N&&(0,x.jsxs)(A,{children:[(0,x.jsx)(h,{children:"Performance Statistics"}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(B,{children:de.totalShifts}),(0,x.jsx)(k,{children:"Total Shifts"})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(B,{children:["RM ",de.totalSales.toLocaleString()]}),(0,x.jsx)(k,{children:"Total Sales"})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(B,{children:[de.performance.efficiency,"%"]}),(0,x.jsx)(k,{children:"Efficiency"})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(B,{children:de.performance.customerRating.toFixed(1)}),(0,x.jsx)(k,{children:"Customer Rating"})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(B,{children:de.performance.ordersProcessed.toLocaleString()}),(0,x.jsx)(k,{children:"Orders Processed"})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(B,{children:de.performance.ordersProcessed>0?(de.totalSales/de.performance.ordersProcessed).toFixed(2):"0.00"}),(0,x.jsx)(k,{children:"Avg Order Value"})]})]})]}),"security"===N&&(0,x.jsx)(A,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{children:"Password Requirements:"}),(0,x.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,x.jsx)("li",{children:"At least 8 characters"}),(0,x.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,x.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,x.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Current Password"}),(0,x.jsx)(E,{type:"password",value:G.currentPassword,onChange:e=>H({...G,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"New Password"}),(0,x.jsx)(E,{type:"password",value:G.newPassword,onChange:e=>H({...G,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number"})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(S,{children:"Confirm New Password"}),(0,x.jsx)(E,{type:"password",value:G.confirmPassword,onChange:e=>H({...G,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),J&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:J}),q&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,x.jsx)(D,{children:(0,x.jsx)(z,{variant:"primary",onClick:async()=>{if(Y(""),V(!1),G.currentPassword&&G.newPassword&&G.confirmPassword)if(G.newPassword.length<8)Y("Password must be at least 8 characters long");else if(/[a-z]/.test(G.newPassword))if(/[A-Z]/.test(G.newPassword))if(/[0-9]/.test(G.newPassword))if(G.newPassword===G.confirmPassword)if(G.currentPassword!==G.newPassword)try{const e=await fetch(`/api/users/${null===de||void 0===de?void 0:de.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:G.currentPassword,newPassword:G.newPassword})});if(!e.ok){const r=await e.json();return void Y(r.error||"Failed to change password")}V(!0),H({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{V(!1)},5e3)}catch(e){console.error("Error changing password:",e),Y("An error occurred while changing password")}else Y("New password must be different from current password");else Y("New passwords do not match");else Y("Password must contain at least one number");else Y("Password must contain at least one uppercase letter");else Y("Password must contain at least one lowercase letter");else Y("All fields are required")},children:"Change Password"})})]})})]}),(0,x.jsx)(l.aF,{isOpen:X,onClose:()=>ee(!1),title:"Edit Schedule",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(l.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,x.jsx)(l.yl,{onClick:async()=>{de&&re&&(e&&await r(e.id,{schedule:re}),ee(!1),ne(null))},children:"Save Schedule"})]}),children:re&&(0,x.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(re).map(e=>{let[r,n]=e;return(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,x.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:r}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:n.active,onChange:e=>xe(r,"active",e.target.checked),style:{cursor:"pointer"}}),(0,x.jsx)("span",{style:{color:n.active?"#059669":"#6B7280"},children:n.active?"Active":"Off"})]}),n.active&&(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"time",value:n.start,onChange:e=>xe(r,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,x.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,x.jsx)("input",{type:"time",value:n.end,onChange:e=>xe(r,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},r)})})})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(m,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(u,{children:(0,x.jsx)(A,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,x.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var me}},8012:(e,r,n)=>{n.d(r,{Ay:()=>d});var t=n(8819),a=(n(9950),n(4752)),o=n(4414);const s=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${t.w.colors.border};
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
`,i=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,l=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:r,children:n}=e;return(0,o.jsxs)(s,{children:[(0,o.jsx)(i,{children:r}),n&&(0,o.jsx)(l,{children:n})]})}}}]);