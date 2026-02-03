"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var i=t(9950),n=t(4752),o=t(3310),a=t(1367),s=t(4414);const l=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,d=n.Ay.div`
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
`,c=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,h=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,g=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,f=n.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

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
`,b=n.Ay.div`
  display: grid;
  gap: 20px;
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,j=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,B=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,E=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,C=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,q=n.Ay.div`
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
`,T=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,z=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,I=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,S=n.Ay.button`
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
`,$=n.Ay.div`
  padding: 24px;
`,M=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,D=n.Ay.div`
  margin-bottom: 20px;
`,R=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=n.Ay.input`
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
`,P=n.Ay.select`
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
`,O=n.Ay.textarea`
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
`,Y=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,i.useState)([]),[n,Y]=(0,i.useState)([]),[_,L]=(0,i.useState)("all"),[U,H]=(0,i.useState)(!1),[J,W]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),K=(null===e||void 0===e?void 0:e.id)||"3",Q=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",V=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",X=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",Z=(null===e||void 0===e?void 0:e.restaurantId)||"1",ee=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,i.useEffect)(()=>{if(e&&e.restaurantId){te(),re();const e=setInterval(te,1e4);return()=>clearInterval(e)}},[e]),(0,i.useEffect)(()=>{if(n.length>0){const e=n.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role),r=n.some(e=>"Brand General"===e.role||"Brand Manager"===e.role);W(e&&!r?e=>({...e,inquiryType:"foodcourt"}):r&&!e?e=>({...e,inquiryType:"brand"}):e=>({...e,inquiryType:""}))}},[n]);const re=async()=>{try{const e=await fetch(`/api/restaurants/${Z}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?Y(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},te=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${K}&userRole=${X}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},ie=r.filter(e=>"all"===_||e.status===_),ne=r.length,oe=r.filter(e=>"open"===e.status).length,ae=r.filter(e=>"in-progress"===e.status).length,se=r.filter(e=>"resolved"===e.status).length,le=r.filter(e=>"closed"===e.status).length,de=e=>new Date(e).toLocaleString("en-MY"),ce=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,s.jsx)(o.A,{children:(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,s.jsx)(x,{variant:"secondary",onClick:te,children:"Refresh"}),(0,s.jsx)(x,{variant:"primary",onClick:()=>{H(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(h,{color:"#635BFF",children:[(0,s.jsx)(g,{children:ne}),(0,s.jsx)(y,{children:"Total Inquiries"})]}),(0,s.jsxs)(h,{color:"#F59E0B",children:[(0,s.jsx)(g,{children:oe}),(0,s.jsx)(y,{children:"Open"})]}),(0,s.jsxs)(h,{color:"#3B82F6",children:[(0,s.jsx)(g,{children:ae}),(0,s.jsx)(y,{children:"In Progress"})]}),(0,s.jsxs)(h,{color:"#10B981",children:[(0,s.jsx)(g,{children:se}),(0,s.jsx)(y,{children:"Resolved"})]})]}),(0,s.jsxs)(m,{children:[(0,s.jsxs)(f,{active:"all"===_,onClick:()=>L("all"),children:["All (",ne,")"]}),(0,s.jsxs)(f,{active:"open"===_,onClick:()=>L("open"),children:["Open (",oe,")"]}),(0,s.jsxs)(f,{active:"in-progress"===_,onClick:()=>L("in-progress"),children:["In Progress (",ae,")"]}),(0,s.jsxs)(f,{active:"resolved"===_,onClick:()=>L("resolved"),children:["Resolved (",se,")"]}),(0,s.jsxs)(f,{active:"closed"===_,onClick:()=>L("closed"),children:["Closed (",le,")"]})]}),(0,s.jsxs)(b,{children:[ie.map(e=>(0,s.jsxs)(v,{children:[(0,s.jsxs)(j,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(w,{children:e.ticketNumber}),(0,s.jsx)(A,{children:e.subject}),(0,s.jsxs)(B,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,s.jsx)(k,{status:e.status,children:e.status}),(0,s.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(C,{children:e.description}),e.response&&(0,s.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,s.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Manager Response \u2022 ",e.resolvedAt&&de(e.resolvedAt)]}),(0,s.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:e.response})]}),(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",fontSize:"12px",color:"#6B7280"},children:[(0,s.jsxs)("span",{children:["Created: ",de(e.createdAt)]}),(0,s.jsxs)("span",{children:["Category: ",e.category]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",ce(e.responseTime)]})]})]},e.id)),0===ie.length&&(0,s.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,s.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),U&&(0,s.jsx)(q,{onClick:()=>H(!1),children:(0,s.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(z,{children:[(0,s.jsx)(I,{children:"Create Operation Inquiry"}),(0,s.jsx)(S,{onClick:()=>H(!1),children:"\xd7"})]}),(0,s.jsxs)($,{children:[(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Inquiry Target *"}),(0,s.jsxs)(P,{value:J.inquiryType,onChange:e=>W({...J,inquiryType:e.target.value}),required:!0,disabled:0===n.length||(n.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0?1:0)+(n.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0?1:0)===1,children:[(0,s.jsx)("option",{value:"",children:0===n.length?"No managers connected":"Select Inquiry Target"}),n.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0&&(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt General"}),n.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0&&(0,s.jsx)("option",{value:"brand",children:"Brand General"})]}),0===n.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to any manager. Please contact system administrator."})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Subject *"}),(0,s.jsx)(G,{type:"text",value:J.subject,onChange:e=>W({...J,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Description *"}),(0,s.jsx)(O,{value:J.description,onChange:e=>W({...J,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(N,{children:[(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Priority"}),(0,s.jsxs)(P,{value:J.priority,onChange:e=>W({...J,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(R,{children:"Category"}),(0,s.jsxs)(P,{value:J.category,onChange:e=>W({...J,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,s.jsx)(x,{variant:"primary",onClick:async()=>{if(J.subject.trim()&&J.description.trim()&&J.inquiryType)try{const e=n.filter(e=>"foodcourt"===J.inquiryType?"Foodcourt General"===e.role||"Foodcourt Manager"===e.role:"Brand General"===e.role||"Brand Manager"===e.role);if(0===e.length)return void alert(`No ${J.inquiryType} managers connected to this restaurant.`);const r=e[0],t={requesterId:parseInt(K),requesterName:Q,requesterEmail:V,requesterRole:X,restaurantId:parseInt(Z),restaurantName:ee,managerId:r.id,managerName:r.company_name||r.username,subject:J.subject,description:J.description,priority:J.priority,category:J.category,inquiryType:J.inquiryType},i=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok?(await te(),W({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),H(!1)):alert("Failed to create inquiry. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating inquiry. Please try again.")}else alert("Please fill in all required fields and select inquiry type.")},disabled:!J.subject.trim()||!J.description.trim()||!J.inquiryType,children:"Submit Inquiry"})]})]})})]})]})})}}}]);