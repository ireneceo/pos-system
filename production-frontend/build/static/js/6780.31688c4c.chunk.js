"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6780],{6780:(e,r,n)=>{n.r(r),n.d(r,{default:()=>N});var a=n(9950),t=n(4752),o=n(3310),s=n(5781),i=n(1367),l=n(9610),d=n(1313),c=n(4414);const p=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,x=t.Ay.div`
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
  font-weight: 600;
  color: #0A2540;
`,u=t.Ay.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,g=t.Ay.div`
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
`,f=t.Ay.div`
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
`,y=t.Ay.div`
  flex: 1;
`,j=t.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,w=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,v=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,b=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,F=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,S=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,E=t.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,C=t.Ay.input`
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
`,B=t.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,k=t.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,D=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,z=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,U=t.Ay.button`
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
`,$=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,I=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,T=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,_=t.Ay.div`
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
`,N=()=>{const{currentStaff:e,updateStaff:r,isLoggedIn:n}=(0,s.g)(),{user:t,isAuthenticated:N,updateUser:M}=(0,i.As)(),[L,O]=(0,a.useState)("profile"),[W,G]=(0,a.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[J,Y]=(0,a.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[H,V]=(0,a.useState)(""),[q,K]=(0,a.useState)(!1),Q=(e,r)=>{G(n=>({...n,[e]:r})),X||(Z(!0),oe(!1))},[X,Z]=(0,a.useState)(!1),[ee,re]=(0,a.useState)(!1),[ne,ae]=(0,a.useState)(null),[te,oe]=(0,a.useState)(!1),[se,ie]=(0,a.useState)(null),[le,de]=(0,a.useState)(!0);(0,a.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=await fetch(`/api/users/${t.id}`);if(!e.ok)throw new Error("Failed to fetch user");const r=await e.json(),n=r.data||r;console.log(" Fetched user:",n),ie(n)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");de(!1)})()},[null===t||void 0===t?void 0:t.id]);const ce=(0,a.useMemo)(()=>se?{id:se.id,name:se.full_name||se.name||"Unknown",email:se.email,phone:se.phone||"",username:se.username||se.email,role:se.role,department:se.department||se.position||("System Admin"===se.role?"System Administration":"Administration"),company_name:se.company_name||("System Admin"===se.role?"Purple Here Technologies Sdn Bhd":""),joinDate:se.createdAt||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null,[se]);(0,a.useEffect)(()=>{se&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:se.full_name,username:se.username,email:se.email,role:se.role,department:se.department,position:se.position,createdAt:se.createdAt,updatedAt:se.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",ce))},[se]),(0,a.useEffect)(()=>{if(ce&&""===W.name){console.log("\ud83d\udd25 Initializing formData from currentUser:",ce);const e={name:ce.name||"",email:ce.email||"",phone:ce.phone||"",department:ce.department||"",company_name:ce.company_name||""};console.log("\ud83d\udd25 New formData:",e),G(e),Z(!1)}},[ce,W.name]),(0,a.useEffect)(()=>{if(ce){const e=W.name!==ce.name||W.email!==ce.email||W.phone!==ce.phone||W.department!==(ce.department||"")||W.company_name!==(ce.company_name||"");Z(e),e&&te&&oe(!1)}},[W,ce,te]);(0,a.useEffect)(()=>{const e=e=>{if(X)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[X]);const pe=(e,r,n)=>{ae(a=>({...a,[e]:{...a[e],[r]:n}}))};return N&&ce?le||!ce?(0,c.jsx)(o.A,{children:(0,c.jsx)(p,{children:(0,c.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:(0,c.jsx)("div",{children:"Loading profile..."})})})}):(0,c.jsx)(o.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(m,{children:"My Profile"})}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(g,{children:[(0,c.jsx)(f,{role:ce.role,children:(e=>{if(!e)return"?";const r=e.trim().split(" ").filter(e=>e.length>0);return 0===r.length?"?":1===r.length?r[0].substring(0,2).toUpperCase():r.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(ce.name)}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(j,{children:[ce.name," ",se&&(0,c.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(v,{role:ce.role,children:ce.role}),(0,c.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:ce.department})]}),(0,c.jsxs)(b,{children:["Member since ",(xe=ce.joinDate,new Date(xe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const r=new Date(e),n=(new Date).getTime()-r.getTime(),a=Math.floor(n/36e5);if(a<1)return"Just now";if(a<24)return`${a}h ago`;return`${Math.floor(a/24)}d ago`})(ce.lastLogin),se&&(0,c.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",se.id]})]})]})]}),(0,c.jsx)(d.Ay,{useUrlParams:!0,defaultTab:"profile",onTabChange:e=>{"System Admin"===(null===ce||void 0===ce?void 0:ce.role)&&"performance"===e?O("profile"):O(e)},tabs:[{key:"profile",label:"Personal Information"},{key:"schedule",label:"Work Schedule"},..."System Admin"!==ce.role?[{key:"performance",label:"Performance"}]:[],{key:"security",label:"Change Password"}]}),"profile"===L&&(0,c.jsx)(A,{children:(0,c.jsxs)("div",{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Full Name"}),(0,c.jsx)(C,{type:"text",value:W.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),Q("name",e.target.value)},placeholder:"Enter full name"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Role"}),(0,c.jsx)(C,{type:"text",value:ce.role,disabled:!0})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Email Address"}),(0,c.jsx)(C,{type:"email",value:W.email||"",onChange:e=>Q("email",e.target.value),placeholder:"Enter email address"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Username"}),(0,c.jsx)(C,{type:"text",value:ce.username,disabled:!0})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Phone Number"}),(0,c.jsx)(C,{type:"tel",value:W.phone||"",onChange:e=>Q("phone",e.target.value),placeholder:"Enter phone number"})]}),"System Admin"===ce.role&&(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Company Name"}),(0,c.jsx)(C,{type:"text",value:W.company_name||"",onChange:e=>Q("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Department"}),(0,c.jsx)(C,{type:"text",value:W.department||"",onChange:e=>Q("department",e.target.value),placeholder:"Enter department"})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(U,{type:"button",onClick:()=>{ce&&(G({name:ce.name,email:ce.email,phone:ce.phone,department:ce.department||"",company_name:ce.company_name||""}),Z(!1),oe(!1))},disabled:!X,children:"Reset"}),(0,c.jsx)(U,{type:"button",variant:"primary",disabled:!X,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",ce),console.log("\ud83d\udd25 hasChanges:",X),console.log("\ud83d\udd25 formData:",W),console.log("\ud83d\udd25 dbUser:",se),console.log("\ud83d\udd25 authUser:",t),ce&&X)try{if(console.log("\ud83d\udd25 Saving profile data..."),se&&null!==t&&void 0!==t&&t.id){console.log("\ud83d\udd25 Updating database user with ID:",t.id);const e=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({full_name:W.name,email:W.email,phone:W.phone,department:W.department,company_name:W.company_name})});if(!e.ok)throw console.error("\u274c Database update failed:",e.status),new Error("Failed to update user in database");const r=await e.json();console.log("\u2705 Database update result:",r);const n=await fetch(`/api/users/${t.id}`);if(n.ok){const e=await n.json(),r=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",r),ie(r)}M({name:W.name,email:W.email}),Z(!1),oe(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(r){console.error("\u274c Failed to update profile:",r),alert("Failed to save profile: "+r.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,c.jsx)(R,{show:te&&!X,children:"Your profile has been successfully updated."})]})}),"schedule"===L&&(0,c.jsxs)(A,{children:[(0,c.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===ce||void 0===ce?void 0:ce.role)||"manager"===(null===ce||void 0===ce?void 0:ce.role))&&(0,c.jsx)(U,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{ce&&(ae({...ce.schedule}),re(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===ce||void 0===ce?void 0:ce.role)&&"manager"!==(null===ce||void 0===ce?void 0:ce.role)&&(0,c.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,c.jsx)($,{children:Object.entries(ce.schedule).map(e=>{let[r,n]=e;return(0,c.jsxs)(I,{active:n.active,children:[(0,c.jsx)(T,{children:r}),(0,c.jsx)(_,{children:n.active?`${n.start} - ${n.end}`:"Off"})]},r)})})]}),"performance"===L&&(0,c.jsxs)(A,{children:[(0,c.jsx)(h,{children:"Performance Statistics"}),(0,c.jsxs)(P,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(k,{children:ce.totalShifts}),(0,c.jsx)(D,{children:"Total Shifts"})]}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(k,{children:["RM ",ce.totalSales.toLocaleString()]}),(0,c.jsx)(D,{children:"Total Sales"})]}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(k,{children:[ce.performance.efficiency,"%"]}),(0,c.jsx)(D,{children:"Efficiency"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(k,{children:ce.performance.customerRating.toFixed(1)}),(0,c.jsx)(D,{children:"Customer Rating"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(k,{children:ce.performance.ordersProcessed.toLocaleString()}),(0,c.jsx)(D,{children:"Orders Processed"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(k,{children:ce.performance.ordersProcessed>0?(ce.totalSales/ce.performance.ordersProcessed).toFixed(2):"0.00"}),(0,c.jsx)(D,{children:"Avg Order Value"})]})]})]}),"security"===L&&(0,c.jsx)(A,{children:(0,c.jsxs)("div",{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Current Password"}),(0,c.jsx)(C,{type:"password",value:J.currentPassword,onChange:e=>Y({...J,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"New Password"}),(0,c.jsx)(C,{type:"password",value:J.newPassword,onChange:e=>Y({...J,newPassword:e.target.value}),placeholder:"Enter new password (min 4 characters)"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{children:"Confirm New Password"}),(0,c.jsx)(C,{type:"password",value:J.confirmPassword,onChange:e=>Y({...J,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),H&&(0,c.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:H}),q&&(0,c.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,c.jsx)(z,{children:(0,c.jsx)(U,{variant:"primary",onClick:async()=>{if(V(""),K(!1),J.currentPassword&&J.newPassword&&J.confirmPassword)if(J.newPassword.length<4)V("New password must be at least 4 characters long");else if(J.newPassword===J.confirmPassword)if(J.currentPassword!==J.newPassword)try{const e=await fetch(`/api/users/${null===ce||void 0===ce?void 0:ce.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:J.currentPassword,newPassword:J.newPassword})});if(!e.ok){const r=await e.json();return void V(r.error||"Failed to change password")}K(!0),Y({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{K(!1)},5e3)}catch(e){console.error("Error changing password:",e),V("An error occurred while changing password")}else V("New password must be different from current password");else V("New passwords do not match");else V("All fields are required")},children:"Change Password"})})]})})]}),(0,c.jsx)(l.aF,{isOpen:ee,onClose:()=>re(!1),title:"Edit Schedule",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,c.jsx)(l.yl,{onClick:async()=>{ce&&ne&&(e&&await r(e.id,{schedule:ne}),re(!1),ae(null))},children:"Save Schedule"})]}),children:ne&&(0,c.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(ne).map(e=>{let[r,n]=e;return(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,c.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:r}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,c.jsx)("input",{type:"checkbox",checked:n.active,onChange:e=>pe(r,"active",e.target.checked),style:{cursor:"pointer"}}),(0,c.jsx)("span",{style:{color:n.active?"#059669":"#6B7280"},children:n.active?"Active":"Off"})]}),n.active&&(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,c.jsx)("input",{type:"time",value:n.start,onChange:e=>pe(r,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,c.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,c.jsx)("input",{type:"time",value:n.end,onChange:e=>pe(r,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},r)})})})]})}):(0,c.jsx)(o.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{children:(0,c.jsx)(m,{children:"My Profile"})}),(0,c.jsx)(u,{children:(0,c.jsx)(A,{children:(0,c.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,c.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var xe}}}]);