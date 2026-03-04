"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6780],{2597:(e,r,n)=>{n.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var t=n(4752),a=n(4414);const o=t.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,i=t.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:n,style:t}=e;return(0,a.jsx)(o,{className:n,style:t,children:r})},d=e=>{let{active:r,onClick:n,children:t,className:o}=e;return(0,a.jsx)(i,{active:r,onClick:n,className:o,children:t})},c=e=>{let{count:r,variant:n="default",showZero:t=!1}=e;return 0!==r||t?(0,a.jsx)(s,{variant:n,children:r}):null}},2653:(e,r,n)=>{n.d(r,{M:()=>o});var t=n(9950),a=n(4492);function o(e){const[r,n]=(0,a.ok)(),o=(0,t.useCallback)(()=>r.get("tab")||e,[r,e]),[i,s]=(0,t.useState)(o());return[i,(0,t.useCallback)(e=>{s(e),n({tab:e})},[n])]}},6780:(e,r,n)=>{n.r(r),n.d(r,{default:()=>R});var t=n(9950),a=n(4752),o=n(5781),i=n(1367),s=n(9610),l=n(2597),d=n(2653),c=n(8666),p=n(8012),x=n(4414);const u=a.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=a.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,g=a.Ay.div`
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
`,f=a.Ay.div`
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
`,y=a.Ay.div`
  flex: 1;
`,v=a.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,w=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,j=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,b=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,S=a.Ay.div`
  margin-bottom: 20px;
`,C=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`,E=a.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

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
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`,B=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,P=a.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,z=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,D=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,$=a.Ay.button`
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
`,U=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,_=a.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,I=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,M=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,N=a.Ay.div`
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
`,R=()=>{const{currentStaff:e,updateStaff:r,isLoggedIn:n}=(0,o.g)(),{user:a,isAuthenticated:R,updateUser:T,isLoading:L}=(0,i.As)(),[O,W]=(0,d.M)("profile"),[G,H]=(0,t.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[J,Y]=(0,t.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[Z,q]=(0,t.useState)(""),[V,K]=(0,t.useState)(!1),Q=(e,r)=>{H(n=>({...n,[e]:r})),X||(ee(!0),ie(!1))},[X,ee]=(0,t.useState)(!1),[re,ne]=(0,t.useState)(!1),[te,ae]=(0,t.useState)(null),[oe,ie]=(0,t.useState)(!1),[se,le]=(0,t.useState)(null),[de,ce]=(0,t.useState)(!0);(0,t.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",a),console.log("\ud83d\udd04 authUser.id:",null===a||void 0===a?void 0:a.id),null!==a&&void 0!==a&&a.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",a.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${a.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!r.ok)throw new Error("Failed to fetch user");const n=await r.json(),t=n.data||n;console.log(" Fetched user:",t),le(t)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");ce(!1)})()},[null===a||void 0===a?void 0:a.id]);const pe=(0,t.useMemo)(()=>{const e=se||a;return e?{id:e.id,name:(null===se||void 0===se?void 0:se.full_name)||(null===se||void 0===se?void 0:se.name)||(null===a||void 0===a?void 0:a.name)||(null===a||void 0===a?void 0:a.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===se||void 0===se?void 0:se.username)||e.email,role:e.role,department:(null===se||void 0===se?void 0:se.department)||(null===se||void 0===se?void 0:se.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===se||void 0===se?void 0:se.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===se||void 0===se?void 0:se.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null},[se,a]);(0,t.useEffect)(()=>{se&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:se.full_name,username:se.username,email:se.email,role:se.role,department:se.department,position:se.position,createdAt:se.createdAt,updatedAt:se.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",pe))},[se]);const[xe,ue]=(0,t.useState)(!1);(0,t.useEffect)(()=>{if(se&&!xe){console.log("\ud83d\udd25 Initializing formData from dbUser:",se);const e={name:se.full_name||se.name||"",email:se.email||"",phone:se.phone||"",department:se.department||se.position||"",company_name:se.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),H(e),ee(!1),ue(!0)}else if(pe&&""===G.name&&!se){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",pe);const e={name:pe.name||"",email:pe.email||"",phone:pe.phone||"",department:pe.department||"",company_name:pe.company_name||""};H(e),ee(!1)}},[se,pe,xe]),(0,t.useEffect)(()=>{if(pe){const e=G.name!==pe.name||G.email!==pe.email||G.phone!==pe.phone||G.department!==(pe.department||"")||G.company_name!==(pe.company_name||"");ee(e),e&&oe&&ie(!1)}},[G,pe,oe]);const me=e=>{"System Admin"===(null===pe||void 0===pe?void 0:pe.role)&&"performance"===e?W("profile"):W(e)};(0,t.useEffect)(()=>{const e=e=>{if(X)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[X]);const he=(e,r,n)=>{ae(t=>({...t,[e]:{...t[e],[r]:n}}))};return L||de?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(u,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(m,{children:(0,x.jsx)(A,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,x.jsx)("div",{children:"Loading profile..."})})})})]})}):R&&pe?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(u,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(f,{role:pe.role,children:(e=>{if(!e)return"?";const r=e.trim().split(" ").filter(e=>e.length>0);return 0===r.length?"?":1===r.length?r[0].substring(0,2).toUpperCase():r.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(pe.name)}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[pe.name," ",se&&(0,x.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(j,{role:pe.role,children:pe.role}),(0,x.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:pe.department})]}),(0,x.jsxs)(b,{children:["Member since ",(ge=pe.joinDate,new Date(ge).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/36e5);if(t<1)return"Just now";if(t<24)return`${t}h ago`;return`${Math.floor(t/24)}d ago`})(pe.lastLogin),se&&(0,x.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",se.id]})]})]})]}),(0,x.jsxs)(l.tU,{children:[(0,x.jsx)(l.oz,{active:"profile"===O,onClick:()=>me("profile"),children:"Personal Information"}),(0,x.jsx)(l.oz,{active:"schedule"===O,onClick:()=>me("schedule"),children:"Work Schedule"}),"System Admin"!==pe.role&&(0,x.jsx)(l.oz,{active:"performance"===O,onClick:()=>me("performance"),children:"Performance"}),(0,x.jsx)(l.oz,{active:"security"===O,onClick:()=>me("security"),children:"Change Password"})]}),"profile"===O&&(0,x.jsx)(A,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Full Name"}),(0,x.jsx)(E,{type:"text",value:G.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),Q("name",e.target.value)},placeholder:"Enter full name"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Role"}),(0,x.jsx)(E,{type:"text",value:pe.role,disabled:!0})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Email Address"}),(0,x.jsx)(E,{type:"email",value:G.email||"",onChange:e=>Q("email",e.target.value),placeholder:"Enter email address"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Username"}),(0,x.jsx)(E,{type:"text",value:pe.username,disabled:!0})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Phone Number"}),(0,x.jsx)(c.A,{value:G.phone||"",onChange:e=>Q("phone",e)})]}),"System Admin"===pe.role&&(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Company Name"}),(0,x.jsx)(E,{type:"text",value:G.company_name||"",onChange:e=>Q("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Department"}),(0,x.jsx)(E,{type:"text",value:G.department||"",onChange:e=>Q("department",e.target.value),placeholder:"Enter department"})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)($,{type:"button",onClick:()=>{pe&&(H({name:pe.name,email:pe.email,phone:pe.phone,department:pe.department||"",company_name:pe.company_name||""}),ee(!1),ie(!1))},disabled:!X,children:"Reset"}),(0,x.jsx)($,{type:"button",variant:"primary",disabled:!X,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",pe),console.log("\ud83d\udd25 hasChanges:",X),console.log("\ud83d\udd25 formData:",G),console.log("\ud83d\udd25 dbUser:",se),console.log("\ud83d\udd25 authUser:",a),pe&&X)try{if(console.log("\ud83d\udd25 Saving profile data..."),se&&null!==a&&void 0!==a&&a.id){console.log("\ud83d\udd25 Updating database user with ID:",a.id);const e=localStorage.getItem("auth_token"),r=await fetch(`/api/users/${a.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:G.name,email:G.email,phone:G.phone,department:G.department,company_name:G.company_name})});if(!r.ok)throw console.error("\u274c Database update failed:",r.status),new Error("Failed to update user in database");const n=await r.json();console.log("\u2705 Database update result:",n);const t=await fetch(`/api/users/${a.id}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",r),le(r)}T({name:G.name,email:G.email}),ee(!1),ie(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(r){console.error("\u274c Failed to update profile:",r),alert("Failed to save profile: "+r.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,x.jsx)(N,{show:oe&&!X,children:"Your profile has been successfully updated."})]})}),"schedule"===O&&(0,x.jsxs)(A,{children:[(0,x.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===pe||void 0===pe?void 0:pe.role)||"manager"===(null===pe||void 0===pe?void 0:pe.role))&&(0,x.jsx)($,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{pe&&(ae({...pe.schedule}),ne(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===pe||void 0===pe?void 0:pe.role)&&"manager"!==(null===pe||void 0===pe?void 0:pe.role)&&(0,x.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,x.jsx)(U,{children:Object.entries(pe.schedule).map(e=>{let[r,n]=e;return(0,x.jsxs)(_,{active:n.active,children:[(0,x.jsx)(I,{children:r}),(0,x.jsx)(M,{children:n.active?`${n.start} - ${n.end}`:"Off"})]},r)})})]}),"performance"===O&&(0,x.jsxs)(A,{children:[(0,x.jsx)(h,{children:"Performance Statistics"}),(0,x.jsxs)(k,{children:[(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:pe.totalShifts}),(0,x.jsx)(z,{children:"Total Shifts"})]}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(P,{children:["RM ",pe.totalSales.toLocaleString()]}),(0,x.jsx)(z,{children:"Total Sales"})]}),(0,x.jsxs)(B,{children:[(0,x.jsxs)(P,{children:[pe.performance.efficiency,"%"]}),(0,x.jsx)(z,{children:"Efficiency"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:pe.performance.customerRating.toFixed(1)}),(0,x.jsx)(z,{children:"Customer Rating"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:pe.performance.ordersProcessed.toLocaleString()}),(0,x.jsx)(z,{children:"Orders Processed"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)(P,{children:pe.performance.ordersProcessed>0?(pe.totalSales/pe.performance.ordersProcessed).toFixed(2):"0.00"}),(0,x.jsx)(z,{children:"Avg Order Value"})]})]})]}),"security"===O&&(0,x.jsx)(A,{children:(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,x.jsx)("strong",{children:"Password Requirements:"}),(0,x.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,x.jsx)("li",{children:"At least 8 characters"}),(0,x.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,x.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,x.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Current Password"}),(0,x.jsx)(E,{type:"password",value:J.currentPassword,onChange:e=>Y({...J,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"New Password"}),(0,x.jsx)(E,{type:"password",value:J.newPassword,onChange:e=>Y({...J,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number"})]}),(0,x.jsxs)(S,{children:[(0,x.jsx)(C,{children:"Confirm New Password"}),(0,x.jsx)(E,{type:"password",value:J.confirmPassword,onChange:e=>Y({...J,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),Z&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:Z}),V&&(0,x.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,x.jsx)(D,{children:(0,x.jsx)($,{variant:"primary",onClick:async()=>{if(q(""),K(!1),J.currentPassword&&J.newPassword&&J.confirmPassword)if(J.newPassword.length<8)q("Password must be at least 8 characters long");else if(/[a-z]/.test(J.newPassword))if(/[A-Z]/.test(J.newPassword))if(/[0-9]/.test(J.newPassword))if(J.newPassword===J.confirmPassword)if(J.currentPassword!==J.newPassword)try{const e=await fetch(`/api/users/${null===pe||void 0===pe?void 0:pe.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:J.currentPassword,newPassword:J.newPassword})});if(!e.ok){const r=await e.json();return void q(r.error||"Failed to change password")}K(!0),Y({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{K(!1)},5e3)}catch(e){console.error("Error changing password:",e),q("An error occurred while changing password")}else q("New password must be different from current password");else q("New passwords do not match");else q("Password must contain at least one number");else q("Password must contain at least one uppercase letter");else q("Password must contain at least one lowercase letter");else q("All fields are required")},children:"Change Password"})})]})})]}),(0,x.jsx)(s.aF,{isOpen:re,onClose:()=>ne(!1),title:"Edit Schedule",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,x.jsx)(s.yl,{onClick:async()=>{pe&&te&&(e&&await r(e.id,{schedule:te}),ne(!1),ae(null))},children:"Save Schedule"})]}),children:te&&(0,x.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(te).map(e=>{let[r,n]=e;return(0,x.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,x.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:r}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,x.jsx)("input",{type:"checkbox",checked:n.active,onChange:e=>he(r,"active",e.target.checked),style:{cursor:"pointer"}}),(0,x.jsx)("span",{style:{color:n.active?"#059669":"#6B7280"},children:n.active?"Active":"Off"})]}),n.active&&(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)("input",{type:"time",value:n.start,onChange:e=>he(r,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,x.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,x.jsx)("input",{type:"time",value:n.end,onChange:e=>he(r,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},r)})})})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(u,{children:[(0,x.jsx)(p.Ay,{title:"My Profile"}),(0,x.jsx)(m,{children:(0,x.jsx)(A,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,x.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var ge}},8012:(e,r,n)=>{n.d(r,{Ay:()=>l});n(9950);var t=n(4752),a=n(4414);const o=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,i=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:r,children:n}=e;return(0,a.jsxs)(o,{children:[(0,a.jsx)(i,{children:r}),n&&(0,a.jsx)(s,{children:n})]})}}}]);