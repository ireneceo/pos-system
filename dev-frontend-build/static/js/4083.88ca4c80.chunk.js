"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>O});var i=t(9950),n=t(4752),o=t(1367),a=t(4414);const s=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=n.Ay.div`
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
`,d=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,x=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,u=n.Ay.div`
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
`,h=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,g=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,m=n.Ay.button`
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
`,f=n.Ay.div`
  display: grid;
  gap: 20px;
`,b=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=n.Ay.div`
  flex: 1;
`,F=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,A=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,k=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,C=n.Ay.div`
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
`,q=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,z=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,I=n.Ay.button`
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
`,S=n.Ay.div`
  padding: 24px;
`,$=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,M=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,N=n.Ay.div`
  margin-bottom: 20px;
`,D=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=n.Ay.input`
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
`,G=n.Ay.select`
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
`,P=n.Ay.textarea`
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
`,O=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,O]=(0,i.useState)([]),[Y,_]=(0,i.useState)("all"),[L,U]=(0,i.useState)(!1),[H,J]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),W=(null===e||void 0===e?void 0:e.id)||"3",K=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",Q=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",V=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",X=(null===e||void 0===e?void 0:e.restaurantId)||"1",Z=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,i.useEffect)(()=>{if(e&&e.restaurantId){re(),ee();const e=setInterval(re,1e4);return()=>clearInterval(e)}},[e]),(0,i.useEffect)(()=>{if(n.length>0){const e=n.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role),r=n.some(e=>"Brand General"===e.role||"Brand Manager"===e.role);J(e&&!r?e=>({...e,inquiryType:"foodcourt"}):r&&!e?e=>({...e,inquiryType:"brand"}):e=>({...e,inquiryType:""}))}},[n]);const ee=async()=>{try{const e=await fetch(`/api/restaurants/${X}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?O(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},re=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${W}&userRole=${V}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},te=r.filter(e=>"all"===Y||e.status===Y),ie=r.length,ne=r.filter(e=>"open"===e.status).length,oe=r.filter(e=>"in-progress"===e.status).length,ae=r.filter(e=>"resolved"===e.status).length,se=r.filter(e=>"closed"===e.status).length,le=e=>new Date(e).toLocaleString("en-MY"),de=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,a.jsx)(p,{variant:"secondary",onClick:re,children:"Refresh"}),(0,a.jsx)(p,{variant:"primary",onClick:()=>{U(!0)},children:"New Inquiry"})]})]}),(0,a.jsxs)(d,{children:[(0,a.jsxs)(x,{children:[(0,a.jsxs)(u,{color:"#635BFF",children:[(0,a.jsx)(h,{children:ie}),(0,a.jsx)(g,{children:"Total Inquiries"})]}),(0,a.jsxs)(u,{color:"#F59E0B",children:[(0,a.jsx)(h,{children:ne}),(0,a.jsx)(g,{children:"Open"})]}),(0,a.jsxs)(u,{color:"#3B82F6",children:[(0,a.jsx)(h,{children:oe}),(0,a.jsx)(g,{children:"In Progress"})]}),(0,a.jsxs)(u,{color:"#10B981",children:[(0,a.jsx)(h,{children:ae}),(0,a.jsx)(g,{children:"Resolved"})]})]}),(0,a.jsxs)(y,{children:[(0,a.jsxs)(m,{active:"all"===Y,onClick:()=>_("all"),children:["All (",ie,")"]}),(0,a.jsxs)(m,{active:"open"===Y,onClick:()=>_("open"),children:["Open (",ne,")"]}),(0,a.jsxs)(m,{active:"in-progress"===Y,onClick:()=>_("in-progress"),children:["In Progress (",oe,")"]}),(0,a.jsxs)(m,{active:"resolved"===Y,onClick:()=>_("resolved"),children:["Resolved (",ae,")"]}),(0,a.jsxs)(m,{active:"closed"===Y,onClick:()=>_("closed"),children:["Closed (",se,")"]})]}),(0,a.jsxs)(f,{children:[te.map(e=>(0,a.jsxs)(b,{children:[(0,a.jsxs)(v,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(F,{children:e.ticketNumber}),(0,a.jsx)(w,{children:e.subject}),(0,a.jsxs)(A,{children:["Manager: ",e.managerName]})]}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,a.jsx)(B,{status:e.status,children:e.status}),(0,a.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(E,{children:e.description}),e.response&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,a.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Manager Response \u2022 ",e.resolvedAt&&le(e.resolvedAt)]}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:e.response})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",fontSize:"12px",color:"#6B7280"},children:[(0,a.jsxs)("span",{children:["Created: ",le(e.createdAt)]}),(0,a.jsxs)("span",{children:["Category: ",e.category]}),e.responseTime>0&&(0,a.jsxs)("span",{children:["Response Time: ",de(e.responseTime)]})]})]},e.id)),0===te.length&&(0,a.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,a.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),L&&(0,a.jsx)(C,{onClick:()=>U(!1),children:(0,a.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(T,{children:[(0,a.jsx)(z,{children:"Create Operation Inquiry"}),(0,a.jsx)(I,{onClick:()=>U(!1),children:"\xd7"})]}),(0,a.jsxs)(S,{children:[(0,a.jsxs)(N,{children:[(0,a.jsx)(D,{children:"Inquiry Target *"}),(0,a.jsxs)(G,{value:H.inquiryType,onChange:e=>J({...H,inquiryType:e.target.value}),required:!0,disabled:0===n.length||(n.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0?1:0)+(n.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0?1:0)===1,children:[(0,a.jsx)("option",{value:"",children:0===n.length?"No managers connected":"Select Inquiry Target"}),n.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0&&(0,a.jsx)("option",{value:"foodcourt",children:"Foodcourt General"}),n.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0&&(0,a.jsx)("option",{value:"brand",children:"Brand General"})]}),0===n.length&&(0,a.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to any manager. Please contact system administrator."})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(D,{children:"Subject *"}),(0,a.jsx)(R,{type:"text",value:H.subject,onChange:e=>J({...H,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(D,{children:"Description *"}),(0,a.jsx)(P,{value:H.description,onChange:e=>J({...H,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,a.jsxs)(M,{children:[(0,a.jsxs)(N,{children:[(0,a.jsx)(D,{children:"Priority"}),(0,a.jsxs)(G,{value:H.priority,onChange:e=>J({...H,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(D,{children:"Category"}),(0,a.jsxs)(G,{value:H.category,onChange:e=>J({...H,category:e.target.value}),children:[(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)($,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,a.jsx)(p,{variant:"primary",onClick:async()=>{if(H.subject.trim()&&H.description.trim()&&H.inquiryType)try{const e=n.filter(e=>"foodcourt"===H.inquiryType?"Foodcourt General"===e.role||"Foodcourt Manager"===e.role:"Brand General"===e.role||"Brand Manager"===e.role);if(0===e.length)return void alert(`No ${H.inquiryType} managers connected to this restaurant.`);const r=e[0],t={requesterId:parseInt(W),requesterName:K,requesterEmail:Q,requesterRole:V,restaurantId:parseInt(X),restaurantName:Z,managerId:r.id,managerName:r.company_name||r.username,subject:H.subject,description:H.description,priority:H.priority,category:H.category,inquiryType:H.inquiryType},i=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok?(await re(),J({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),U(!1)):alert("Failed to create inquiry. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating inquiry. Please try again.")}else alert("Please fill in all required fields and select inquiry type.")},disabled:!H.subject.trim()||!H.description.trim()||!H.inquiryType,children:"Submit Inquiry"})]})]})})]})]})})}}}]);