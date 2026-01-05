"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,i)=>{i.r(r),i.d(r,{default:()=>P});var n=i(9950),t=i(4752),o=i(3310),a=i(1367),s=i(4414);const d=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=t.Ay.div`
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
`,c=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=t.Ay.div`
  display: grid;
  gap: 20px;
`,f=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,b=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=t.Ay.div`
  flex: 1;
`,v=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=t.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,w=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,E=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,B=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,k=t.Ay.div`
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
`,C=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,q=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,T=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,z=t.Ay.button`
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
`,I=t.Ay.div`
  padding: 24px;
`,S=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,D=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,M=t.Ay.div`
  margin-bottom: 20px;
`,N=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,$=t.Ay.input`
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
`,R=t.Ay.select`
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
`,G=t.Ay.textarea`
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
`,P=()=>{const{user:e}=(0,a.As)(),[r,i]=(0,n.useState)([]),[t,P]=(0,n.useState)([]),[O,Y]=(0,n.useState)(!1),[L,U]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),H=(null===e||void 0===e?void 0:e.id)||"3",J=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",W=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",_=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",K=(null===e||void 0===e?void 0:e.restaurantId)||"1",Q=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){X(),V();const e=setInterval(X,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{if(t.length>0){const e=t.some(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role),r=t.some(e=>"Brand General"===e.role||"Brand Manager"===e.role);U(e&&!r?e=>({...e,inquiryType:"foodcourt"}):r&&!e?e=>({...e,inquiryType:"brand"}):e=>({...e,inquiryType:""}))}},[t]);const V=async()=>{try{const e=await fetch(`/api/restaurants/${K}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?P(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},X=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${H}&userRole=${_}`);if(e.ok){const r=await e.json();i(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},Z=r.length,ee=r.filter(e=>"open"===e.status).length,re=r.filter(e=>"in-progress"===e.status).length,ie=r.filter(e=>"resolved"===e.status).length,ne=e=>new Date(e).toLocaleString("en-MY"),te=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,s.jsx)(o.A,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,s.jsx)(x,{variant:"secondary",onClick:X,children:"Refresh"}),(0,s.jsx)(x,{variant:"primary",onClick:()=>{Y(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(h,{color:"#059669",children:[(0,s.jsx)(g,{children:Z}),(0,s.jsx)(y,{children:"Total Inquiries"})]}),(0,s.jsxs)(h,{color:"#D97706",children:[(0,s.jsx)(g,{children:ee}),(0,s.jsx)(y,{children:"Open"})]}),(0,s.jsxs)(h,{color:"#2563EB",children:[(0,s.jsx)(g,{children:re}),(0,s.jsx)(y,{children:"In Progress"})]}),(0,s.jsxs)(h,{color:"#7C3AED",children:[(0,s.jsx)(g,{children:ie}),(0,s.jsx)(y,{children:"Resolved"})]})]}),(0,s.jsxs)(m,{children:[r.map(e=>(0,s.jsxs)(f,{children:[(0,s.jsxs)(b,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:e.ticketNumber}),(0,s.jsx)(F,{children:e.subject}),(0,s.jsxs)(w,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,s.jsx)(A,{status:e.status,children:e.status}),(0,s.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(B,{children:e.description}),e.response&&(0,s.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,s.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Manager Response \u2022 ",e.resolvedAt&&ne(e.resolvedAt)]}),(0,s.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:e.response})]}),(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",fontSize:"12px",color:"#6B7280"},children:[(0,s.jsxs)("span",{children:["Created: ",ne(e.createdAt)]}),(0,s.jsxs)("span",{children:["Category: ",e.category]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",te(e.responseTime)]})]})]},e.id)),0===r.length&&(0,s.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,s.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),O&&(0,s.jsx)(k,{onClick:()=>Y(!1),children:(0,s.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(q,{children:[(0,s.jsx)(T,{children:"Create Operation Inquiry"}),(0,s.jsx)(z,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(M,{children:[(0,s.jsx)(N,{children:"\ubb38\uc758\ub300\uc0c1 *"}),(0,s.jsxs)(R,{value:L.inquiryType,onChange:e=>U({...L,inquiryType:e.target.value}),required:!0,disabled:0===t.length||(t.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0?1:0)+(t.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0?1:0)===1,children:[(0,s.jsx)("option",{value:"",children:0===t.length?"No managers connected":"Select Inquiry Target"}),t.filter(e=>"Foodcourt General"===e.role||"Foodcourt Manager"===e.role).length>0&&(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt"}),t.filter(e=>"Brand General"===e.role||"Brand Manager"===e.role).length>0&&(0,s.jsx)("option",{value:"brand",children:"Brand"})]}),0===t.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to any manager. Please contact system administrator."})]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(N,{children:"Subject *"}),(0,s.jsx)($,{type:"text",value:L.subject,onChange:e=>U({...L,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(N,{children:"Description *"}),(0,s.jsx)(G,{value:L.description,onChange:e=>U({...L,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(D,{children:[(0,s.jsxs)(M,{children:[(0,s.jsx)(N,{children:"Priority"}),(0,s.jsxs)(R,{value:L.priority,onChange:e=>U({...L,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(N,{children:"Category"}),(0,s.jsxs)(R,{value:L.category,onChange:e=>U({...L,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:()=>Y(!1),children:"Cancel"}),(0,s.jsx)(x,{variant:"primary",onClick:async()=>{if(L.subject.trim()&&L.description.trim()&&L.inquiryType)try{const e=t.filter(e=>"foodcourt"===L.inquiryType?"Foodcourt General"===e.role||"Foodcourt Manager"===e.role:"Brand General"===e.role||"Brand Manager"===e.role);if(0===e.length)return void alert(`No ${L.inquiryType} managers connected to this restaurant.`);const r=e[0],i={requesterId:parseInt(H),requesterName:J,requesterEmail:W,requesterRole:_,restaurantId:parseInt(K),restaurantName:Q,managerId:r.id,managerName:r.company_name||r.username,subject:L.subject,description:L.description,priority:L.priority,category:L.category,inquiryType:L.inquiryType};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})).ok?(await X(),U({subject:"",description:"",priority:"medium",category:"other",inquiryType:""}),Y(!1)):alert("Failed to create inquiry. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating inquiry. Please try again.")}else alert("Please fill in all required fields and select inquiry type.")},disabled:!L.subject.trim()||!L.description.trim()||!L.inquiryType,children:"Submit Inquiry"})]})]})})]})]})})}}}]);