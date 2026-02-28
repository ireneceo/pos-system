"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var i=t(9950),n=t(4752),o=t(1367),a=t(4414);const s=n.Ay.div`
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
`,l=n.Ay.div`
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
`,p=n.Ay.div`
  display: flex;
  gap: 12px;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,m=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,y=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=n.Ay.input`
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
`,b=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,A=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=n.Ay.div`
  flex: 1;
`,E=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,C=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,S=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,I=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,q=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,$=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=n.Ay.span`
  color: #374151;
`,M=n.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,T=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,O=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: break-word;
`,L=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,P=n.Ay.div`
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
`,G=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,U=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,H=n.Ay.button`
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
`,_=n.Ay.div`
  padding: 24px;
`,J=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Q=n.Ay.div`
  margin-bottom: 20px;
`,V=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=n.Ay.input`
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
`,X=n.Ay.select`
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
`,Z=n.Ay.textarea`
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
`,ee=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,ee]=(0,i.useState)([]),[re,te]=(0,i.useState)(""),[ie,ne]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)("all"),[se,de]=(0,i.useState)("all"),[le,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(""),[ue,he]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"other"}),ge=(null===e||void 0===e?void 0:e.id)||"3",me=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",fe=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",je=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",ye=(null===e||void 0===e?void 0:e.restaurantId)||"1",ve=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,i.useEffect)(()=>{if(e&&e.restaurantId){we(),be();const e=setInterval(we,1e4);return()=>clearInterval(e)}},[e]),(0,i.useEffect)(()=>{1===n.length&&xe(n[0].id.toString())},[n]);const be=async()=>{try{const e=await fetch(`/api/restaurants/${ye}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?ee(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},we=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ge}&userRole=${je}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ae=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase())||e.managerName.toLowerCase().includes(re.toLowerCase()),t="all"===ie||e.status===ie,i="all"===oe||e.priority===oe,n="all"===se||e.category===se;return r&&t&&i&&n}),Fe=r.length,ke=r.filter(e=>"open"===e.status).length,Ee=r.filter(e=>"in-progress"===e.status).length,Be=r.filter(e=>"resolved"===e.status).length,Ce=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),Se=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(s,{children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:we,children:"Refresh"}),(0,a.jsx)(x,{variant:"primary",onClick:()=>{ce(!0)},children:"New Inquiry"})]})]}),(0,a.jsxs)(l,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(h,{color:"#635BFF",children:[(0,a.jsx)(g,{children:Fe}),(0,a.jsx)(m,{children:"Total Inquiries"})]}),(0,a.jsxs)(h,{color:"#F59E0B",children:[(0,a.jsx)(g,{children:ke}),(0,a.jsx)(m,{children:"Open"})]}),(0,a.jsxs)(h,{color:"#3B82F6",children:[(0,a.jsx)(g,{children:Ee}),(0,a.jsx)(m,{children:"In Progress"})]}),(0,a.jsxs)(h,{color:"#10B981",children:[(0,a.jsx)(g,{children:Be}),(0,a.jsx)(m,{children:"Resolved"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:"Search"}),(0,a.jsx)(v,{placeholder:"Search inquiries...",value:re,onChange:e=>te(e.target.value)})]}),(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:"Status"}),(0,a.jsxs)(b,{value:ie,onChange:e=>ne(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:"Priority"}),(0,a.jsxs)(b,{value:oe,onChange:e=>ae(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsxs)(j,{children:[(0,a.jsx)(y,{children:"Category"}),(0,a.jsxs)(b,{value:se,onChange:e=>de(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Categories"}),(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,a.jsxs)(w,{children:[Ae.map(e=>(0,a.jsxs)(A,{children:[(0,a.jsxs)(F,{children:[(0,a.jsxs)(k,{children:[(0,a.jsx)(E,{children:e.ticketNumber}),(0,a.jsx)(B,{children:e.subject}),(0,a.jsxs)(C,{children:["Manager: ",e.managerName]})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(z,{status:e.status,children:e.status}),(0,a.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(q,{children:e.description}),e.response&&(0,a.jsxs)(M,{children:[(0,a.jsxs)(T,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${Ce(e.resolvedAt)}`]}),(0,a.jsx)(O,{children:e.response})]}),(0,a.jsxs)($,{children:[(0,a.jsxs)(N,{children:[(0,a.jsx)(R,{children:"Created"}),(0,a.jsx)(D,{children:Ce(e.createdAt)})]}),(0,a.jsxs)(N,{children:[(0,a.jsx)(R,{children:"Category"}),(0,a.jsx)(D,{children:e.category})]}),e.responseTime>0&&(0,a.jsxs)(N,{children:[(0,a.jsx)(R,{children:"Response Time"}),(0,a.jsx)(D,{children:Se(e.responseTime)})]})]})]},e.id)),0===Ae.length&&(0,a.jsxs)(L,{children:[(0,a.jsx)("h3",{children:"No inquiries yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),le&&(0,a.jsx)(P,{onClick:()=>ce(!1),children:(0,a.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(U,{children:[(0,a.jsx)(Y,{children:"Create Operation Inquiry"}),(0,a.jsx)(H,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,a.jsxs)(_,{children:[(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Inquiry Target *"}),(0,a.jsxs)(X,{value:pe,onChange:e=>xe(e.target.value),required:!0,disabled:n.length<=1,children:[(0,a.jsx)("option",{value:"",children:0===n.length?"No one connected":"Select Inquiry Target"}),n.map(e=>{return(0,a.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===n.length&&(0,a.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Subject *"}),(0,a.jsx)(W,{type:"text",value:ue.subject,onChange:e=>he({...ue,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Description *"}),(0,a.jsx)(Z,{value:ue.description,onChange:e=>he({...ue,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,a.jsxs)(K,{children:[(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Priority"}),(0,a.jsxs)(X,{value:ue.priority,onChange:e=>he({...ue,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Category"}),(0,a.jsxs)(X,{value:ue.category,onChange:e=>he({...ue,category:e.target.value}),children:[(0,a.jsx)("option",{value:"schedule",children:"Schedule"}),(0,a.jsx)("option",{value:"inventory",children:"Inventory"}),(0,a.jsx)("option",{value:"staff",children:"Staff"}),(0,a.jsx)("option",{value:"menu",children:"Menu"}),(0,a.jsx)("option",{value:"customer",children:"Customer"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)(J,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(!ue.subject.trim()||!ue.description.trim()||!pe)return;const e=n.find(e=>e.id.toString()===pe);if(!e)return;const r=(e=>{const r=n.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(pe);try{const t={requesterId:parseInt(ge),requesterName:me,requesterEmail:fe,requesterRole:je,restaurantId:parseInt(ye),restaurantName:ve,managerId:parseInt(e.id.toString()),managerName:e.name,subject:ue.subject,description:ue.description,priority:ue.priority,category:ue.category,inquiryType:r},i=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok&&(await we(),he({subject:"",description:"",priority:"medium",category:"other"}),xe(1===n.length?n[0].id.toString():""),ce(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ue.subject.trim()||!ue.description.trim()||!pe,children:"Submit Inquiry"})]})]})})]})]})})}}}]);