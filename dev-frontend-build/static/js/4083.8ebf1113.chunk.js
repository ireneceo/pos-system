"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var n=t(9950),i=t(4752),o=t(1367),s=t(4414);const a=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=i.Ay.div`
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
`,d=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=i.Ay.div`
  display: flex;
  gap: 12px;
`,x=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,h=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,m=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,y=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.input`
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
`,b=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=i.Ay.div`
  display: grid;
  gap: 20px;
`,A=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=i.Ay.div`
  flex: 1;
`,B=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,k=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,I=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,q=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,R=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=i.Ay.span`
  color: #374151;
`,M=i.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,T=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,O=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,L=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,P=i.Ay.div`
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
`,G=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,U=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,H=i.Ay.button`
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
`,_=i.Ay.div`
  padding: 24px;
`,J=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Q=i.Ay.div`
  margin-bottom: 20px;
`,V=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=i.Ay.input`
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
`,X=i.Ay.select`
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
`,Z=i.Ay.textarea`
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
`,ee=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,ee]=(0,n.useState)([]),[re,te]=(0,n.useState)(""),[ne,ie]=(0,n.useState)("all"),[oe,se]=(0,n.useState)("all"),[ae,le]=(0,n.useState)("all"),[de,ce]=(0,n.useState)(!1),[pe,xe]=(0,n.useState)(""),[ue,he]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),ge=(null===e||void 0===e?void 0:e.id)||"3",me=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",fe=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",je=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",ye=(null===e||void 0===e?void 0:e.restaurantId)||"1",ve=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){we(),be();const e=setInterval(we,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===i.length&&xe(i[0].id.toString())},[i]);const be=async()=>{try{const e=await fetch(`/api/restaurants/${ye}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?ee(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},we=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ge}&userRole=${je}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ae=r.filter(e=>{const r=e.subject.toLowerCase().includes(re.toLowerCase())||e.ticketNumber.toLowerCase().includes(re.toLowerCase())||e.managerName.toLowerCase().includes(re.toLowerCase()),t="all"===ne||e.status===ne,n="all"===oe||e.priority===oe,i="all"===ae||e.category===ae;return r&&t&&n&&i}),Fe=r.length,Ee=r.filter(e=>"open"===e.status).length,Be=r.filter(e=>"in-progress"===e.status).length,Ce=r.filter(e=>"resolved"===e.status).length,ke=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),Se=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(c,{children:"Operation Inquiry"}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:we,children:"Refresh"}),(0,s.jsx)(x,{variant:"primary",onClick:()=>{ce(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(d,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(h,{color:"#635BFF",children:[(0,s.jsx)(g,{children:Fe}),(0,s.jsx)(m,{children:"Total Inquiries"})]}),(0,s.jsxs)(h,{color:"#F59E0B",children:[(0,s.jsx)(g,{children:Ee}),(0,s.jsx)(m,{children:"Open"})]}),(0,s.jsxs)(h,{color:"#3B82F6",children:[(0,s.jsx)(g,{children:Be}),(0,s.jsx)(m,{children:"In Progress"})]}),(0,s.jsxs)(h,{color:"#10B981",children:[(0,s.jsx)(g,{children:Ce}),(0,s.jsx)(m,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(y,{children:"Search"}),(0,s.jsx)(v,{placeholder:"Search inquiries...",value:re,onChange:e=>te(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(y,{children:"Status"}),(0,s.jsxs)(b,{value:ne,onChange:e=>ie(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(y,{children:"Priority"}),(0,s.jsxs)(b,{value:oe,onChange:e=>se(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(y,{children:"Category"}),(0,s.jsxs)(b,{value:ae,onChange:e=>le(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(w,{children:[Ae.map(e=>(0,s.jsxs)(A,{children:[(0,s.jsxs)(F,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(B,{children:e.ticketNumber}),(0,s.jsx)(C,{children:e.subject}),(0,s.jsxs)(k,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(z,{status:e.status,children:e.status}),(0,s.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(q,{children:e.description}),e.response&&(0,s.jsxs)(M,{children:[(0,s.jsxs)(T,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${ke(e.resolvedAt)}`]}),(0,s.jsx)(O,{children:e.response})]}),(0,s.jsxs)($,{children:[(0,s.jsxs)(N,{children:[(0,s.jsx)(R,{children:"Created"}),(0,s.jsx)(D,{children:ke(e.createdAt)})]}),(0,s.jsxs)(N,{children:[(0,s.jsx)(R,{children:"Category"}),(0,s.jsx)(D,{children:e.category})]}),e.responseTime>0&&(0,s.jsxs)(N,{children:[(0,s.jsx)(R,{children:"Response Time"}),(0,s.jsx)(D,{children:Se(e.responseTime)})]})]})]},e.id)),0===Ae.length&&(0,s.jsxs)(L,{children:[(0,s.jsx)("h3",{children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),de&&(0,s.jsx)(P,{onClick:()=>ce(!1),children:(0,s.jsxs)(G,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(U,{children:[(0,s.jsx)(Y,{children:"Create Operation Inquiry"}),(0,s.jsx)(H,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,s.jsxs)(_,{children:[(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Inquiry Target *"}),(0,s.jsxs)(X,{value:pe,onChange:e=>xe(e.target.value),required:!0,disabled:i.length<=1,children:[(0,s.jsx)("option",{value:"",children:0===i.length?"No one connected":"Select Inquiry Target"}),i.map(e=>{return(0,s.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===i.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Subject *"}),(0,s.jsx)(W,{type:"text",value:ue.subject,onChange:e=>he({...ue,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Description *"}),(0,s.jsx)(Z,{value:ue.description,onChange:e=>he({...ue,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Priority"}),(0,s.jsxs)(X,{value:ue.priority,onChange:e=>he({...ue,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Category"}),(0,s.jsxs)(X,{value:ue.category,onChange:e=>he({...ue,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(J,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,s.jsx)(x,{variant:"primary",onClick:async()=>{if(!ue.subject.trim()||!ue.description.trim()||!pe)return;const e=i.find(e=>e.id.toString()===pe);if(!e)return;const r=(e=>{const r=i.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(pe);try{const t={requesterId:parseInt(ge),requesterName:me,requesterEmail:fe,requesterRole:je,restaurantId:parseInt(ye),restaurantName:ve,managerId:parseInt(e.id.toString()),managerName:e.name,subject:ue.subject,description:ue.description,priority:ue.priority,category:ue.category,inquiryType:r},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await we(),he({subject:"",description:"",priority:"medium",category:"other"}),xe(1===i.length?i[0].id.toString():""),ce(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ue.subject.trim()||!ue.description.trim()||!pe,children:"Submit Inquiry"})]})]})})]})]})})}}}]);