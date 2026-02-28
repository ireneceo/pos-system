"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,n)=>{n.r(r),n.d(r,{default:()=>ee});var i=n(9950),o=n(4752),t=n(1367),a=n(4414);const s=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=o.Ay.div`
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
`,d=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=o.Ay.div`
  display: flex;
  gap: 12px;
`,x=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,f=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,b=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=o.Ay.div`
  display: grid;
  gap: 20px;
`,F=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,A=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=o.Ay.div`
  flex: 1;
`,E=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,k=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,q=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,I=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,M=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=o.Ay.span`
  color: #374151;
`,N=o.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,O=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,D=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,P=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,G=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,L=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,U=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,_=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,H=o.Ay.div`
  padding: 24px;
`,J=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Q=o.Ay.div`
  margin-bottom: 20px;
`,V=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,X=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Z=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ee=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,i.useState)([]),[o,ee]=(0,i.useState)([]),[re,ne]=(0,i.useState)(""),[ie,oe]=(0,i.useState)("all"),[te,ae]=(0,i.useState)("all"),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),ue=(null===e||void 0===e?void 0:e.id)||"3",he=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",ge=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",ye=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",me=(null===e||void 0===e?void 0:e.restaurantId)||"1",fe=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,i.useEffect)(()=>{if(e&&e.restaurantId){ve(),je();const e=setInterval(ve,1e4);return()=>clearInterval(e)}},[e]),(0,i.useEffect)(()=>{if(o.length>0){const e=o.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role),r=o.some(e=>"Brand General"===e.role||"Brand Manager"===e.role),n=o.some(e=>"Restaurant Owner"===e.role);1===[e,r,n].filter(Boolean).length?e?xe(e=>({...e,inquiryType:"foodcourt"})):r?xe(e=>({...e,inquiryType:"brand"})):n&&xe(e=>({...e,inquiryType:"owner"})):xe(e=>({...e,inquiryType:""}))}},[o]);const je=async()=>{try{const e=await fetch(`/api/restaurants/${me}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?ee(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},ve=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ue}&userRole=${ye}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();n(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},be=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase())||e.managerName.toLowerCase().includes(re.toLowerCase()),n="all"===ie||e.status===ie,i="all"===te||e.priority===te,o="all"===se||e.category===se;return r&&n&&i&&o}),we=r.length,Fe=r.filter(e=>"open"===e.status).length,Ae=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,Ee=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),Ce=e=>{const r=Math.floor(e/60),n=e%60;return r>0?`${r}h ${n}m`:`${n}m`};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:ve,children:"Refresh"}),(0,a.jsx)(x,{variant:"primary",onClick:()=>{ce(!0)},children:"New Inquiry"})]})]}),(0,a.jsxs)(d,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(h,{color:"#635BFF",children:[(0,a.jsx)(g,{children:we}),(0,a.jsx)(y,{children:"Total Inquiries"})]}),(0,a.jsxs)(h,{color:"#F59E0B",children:[(0,a.jsx)(g,{children:Fe}),(0,a.jsx)(y,{children:"Open"})]}),(0,a.jsxs)(h,{color:"#3B82F6",children:[(0,a.jsx)(g,{children:Ae}),(0,a.jsx)(y,{children:"In Progress"})]}),(0,a.jsxs)(h,{color:"#10B981",children:[(0,a.jsx)(g,{children:Be}),(0,a.jsx)(y,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(j,{children:"Search"}),(0,a.jsx)(v,{placeholder:"Search inquiries...",value:re,onChange:e=>ne(e.target.value)})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(j,{children:"Status"}),(0,a.jsxs)(b,{value:ie,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(j,{children:"Priority"}),(0,a.jsxs)(b,{value:te,onChange:e=>ae(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(j,{children:"Category"}),(0,a.jsxs)(b,{value:se,onChange:e=>le(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,a.jsxs)(w,{children:[be.map(e=>(0,a.jsxs)(F,{children:[(0,a.jsxs)(A,{children:[(0,a.jsxs)(B,{children:[(0,a.jsx)(E,{children:e.ticketNumber}),(0,a.jsx)(C,{children:e.subject}),(0,a.jsxs)(k,{children:["Manager: ",e.managerName]})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(z,{status:e.status,children:e.status}),(0,a.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(S,{children:e.description}),e.response&&(0,a.jsxs)(N,{children:[(0,a.jsxs)(O,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${Ee(e.resolvedAt)}`]}),(0,a.jsx)(D,{children:e.response})]}),(0,a.jsxs)(I,{children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(R,{children:"Created"}),(0,a.jsx)($,{children:Ee(e.createdAt)})]}),(0,a.jsxs)(M,{children:[(0,a.jsx)(R,{children:"Category"}),(0,a.jsx)($,{children:e.category})]}),e.responseTime>0&&(0,a.jsxs)(M,{children:[(0,a.jsx)(R,{children:"Response Time"}),(0,a.jsx)($,{children:Ce(e.responseTime)})]})]})]},e.id)),0===be.length&&(0,a.jsxs)(P,{children:[(0,a.jsx)("h3",{children:"No inquiries yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),de&&(0,a.jsx)(G,{onClick:()=>ce(!1),children:(0,a.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(U,{children:[(0,a.jsx)(Y,{children:"Create Operation Inquiry"}),(0,a.jsx)(_,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,a.jsxs)(H,{children:[(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Inquiry Target *"}),(0,a.jsxs)(X,{value:pe.inquiryType,onChange:e=>xe({...pe,inquiryType:e.target.value}),required:!0,disabled:0===o.length||1===[o.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role),o.some(e=>"Brand General"===e.role||"Brand Manager"===e.role),o.some(e=>"Restaurant Owner"===e.role)].filter(Boolean).length,children:[(0,a.jsx)("option",{value:"",children:0===o.length?"No one connected":"Select Inquiry Target"}),o.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role)&&(0,a.jsx)("option",{value:"foodcourt",children:"Foodcourt General"}),o.some(e=>"Brand General"===e.role||"Brand Manager"===e.role)&&(0,a.jsx)("option",{value:"brand",children:"Brand General"}),o.some(e=>"Restaurant Owner"===e.role)&&(0,a.jsx)("option",{value:"owner",children:"Restaurant Owner"})]}),0===o.length&&(0,a.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to any manager. Please contact system administrator."})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Subject *"}),(0,a.jsx)(W,{type:"text",value:pe.subject,onChange:e=>xe({...pe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Description *"}),(0,a.jsx)(Z,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,a.jsxs)(K,{children:[(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Priority"}),(0,a.jsxs)(X,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Category"}),(0,a.jsxs)(X,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)(J,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(pe.subject.trim()&&pe.description.trim()&&pe.inquiryType)try{const e=o.filter(e=>"foodcourt"===pe.inquiryType?"Foodcourt General"===e.role||"Foodcourt Manager"===e.role:"brand"===pe.inquiryType?"Brand General"===e.role||"Brand Manager"===e.role:"owner"===pe.inquiryType&&"Restaurant Owner"===e.role);if(0===e.length)return void alert(`No ${pe.inquiryType} connected to this restaurant.`);const r=e[0],n={requesterId:parseInt(ue),requesterName:he,requesterEmail:ge,requesterRole:ye,restaurantId:parseInt(me),restaurantName:fe,managerId:r.id,managerName:r.company_name||r.username,subject:pe.subject,description:pe.description,priority:pe.priority,category:pe.category,inquiryType:pe.inquiryType},i=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(n)})).ok?(await ve(),xe({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),ce(!1)):alert("Failed to create inquiry. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating inquiry. Please try again.")}else alert("Please fill in all required fields and select inquiry type.")},disabled:!pe.subject.trim()||!pe.description.trim()||!pe.inquiryType,children:"Submit Inquiry"})]})]})})]})]})})}}}]);