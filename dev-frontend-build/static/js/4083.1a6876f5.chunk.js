"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var n=t(9950),o=t(4752),i=t(1367),a=t(4302),s=t(4414);const l=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,d=o.Ay.div`
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
`,c=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=o.Ay.div`
  display: flex;
  gap: 12px;
`,h=o.Ay.button`
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
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=o.Ay.input`
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
`,w=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=o.Ay.div`
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
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=o.Ay.div`
  flex: 1;
`,C=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,S=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,I=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,q=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=o.Ay.div`
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
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=o.Ay.span`
  color: #374151;
`,O=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,R=o.Ay.div`
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
`,_=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,L=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=o.Ay.button`
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
`,G=o.Ay.div`
  padding: 24px;
`,J=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,W=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Y=o.Ay.div`
  margin-bottom: 20px;
`,H=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,K=o.Ay.input`
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
`,Q=o.Ay.select`
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
`,V=o.Ay.textarea`
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
`,X=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)([]),[o,X]=(0,n.useState)([]),[Z,ee]=(0,n.useState)(""),[re,te]=(0,n.useState)("all"),[ne,oe]=(0,n.useState)("all"),[ie,ae]=(0,n.useState)("all"),[se,le]=(0,n.useState)(!1),[de,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)({subject:"",description:"",priority:"medium",category:"other"}),[he,ue]=(0,n.useState)(null),ge=(null===e||void 0===e?void 0:e.id)||"3",me=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",fe=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",ye=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",je=(null===e||void 0===e?void 0:e.restaurantId)||"1",ve=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,n.useEffect)(()=>{if(e&&e.restaurantId){we(),be();const e=setInterval(we,1e4);return()=>clearInterval(e)}},[e]),(0,n.useEffect)(()=>{1===o.length&&ce(o[0].id.toString())},[o]);const be=async()=>{try{const e=await fetch(`/api/restaurants/${je}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?X(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},we=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ge}&userRole=${ye}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ae=r.filter(e=>{const r=e.subject.toLowerCase().includes(Z.toLowerCase())||e.ticketNumber.toLowerCase().includes(Z.toLowerCase())||e.managerName.toLowerCase().includes(Z.toLowerCase()),t="all"===re||e.status===re,n="all"===ne||e.priority===ne,o="all"===ie||e.category===ie;return r&&t&&n&&o}),Fe=r.length,ke=r.filter(e=>"open"===e.status).length,Ee=r.filter(e=>"in-progress"===e.status).length,Ce=r.filter(e=>"resolved"===e.status).length,Be=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY"));return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:we,children:"Refresh"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{le(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(m,{children:Fe}),(0,s.jsx)(f,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(m,{children:ke}),(0,s.jsx)(f,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(m,{children:Ee}),(0,s.jsx)(f,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(m,{children:Ce}),(0,s.jsx)(f,{children:"Resolved"})]})]}),(0,s.jsxs)(y,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Search"}),(0,s.jsx)(b,{placeholder:"Search inquiries...",value:Z,onChange:e=>ee(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Status"}),(0,s.jsxs)(w,{value:re,onChange:e=>te(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Priority"}),(0,s.jsxs)(w,{value:ne,onChange:e=>oe(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Category"}),(0,s.jsxs)(w,{value:ie,onChange:e=>ae(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(A,{children:[Ae.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{ue(e)})(e),style:{cursor:"pointer"},children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(S,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(I,{status:e.status,children:e.status}),(0,s.jsx)(q,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)($,{children:e.description}),(0,s.jsxs)(D,{children:[(0,s.jsxs)(N,{children:[(0,s.jsx)(T,{children:"Created"}),(0,s.jsx)(M,{children:Be(e.createdAt)})]}),(0,s.jsxs)(N,{children:[(0,s.jsx)(T,{children:"Category"}),(0,s.jsx)(M,{children:e.category})]})]})]},e.id)),0===Ae.length&&(0,s.jsxs)(O,{children:[(0,s.jsx)("h3",{children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),he&&(0,s.jsx)(R,{onClick:()=>ue(null),children:(0,s.jsxs)(_,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:he.ticketNumber}),(0,s.jsx)(U,{onClick:()=>ue(null),children:"\xd7"})]}),(0,s.jsxs)(G,{children:[(0,s.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,s.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:he.subject}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,s.jsx)(I,{status:he.status,children:he.status}),(0,s.jsx)(q,{priority:he.priority,children:he.priority}),(0,s.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:he.category})]}),(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",he.managerName," \xb7 ",Be(he.createdAt)]})]}),(0,s.jsx)($,{children:he.description}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(he.id),currentUserId:null===e||void 0===e?void 0:e.id})]})]})}),se&&(0,s.jsx)(R,{onClick:()=>le(!1),children:(0,s.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:"Create Operation Inquiry"}),(0,s.jsx)(U,{onClick:()=>le(!1),children:"\xd7"})]}),(0,s.jsxs)(G,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Inquiry Target *"}),(0,s.jsxs)(Q,{value:de,onChange:e=>ce(e.target.value),required:!0,disabled:o.length<=1,children:[(0,s.jsx)("option",{value:"",children:0===o.length?"No one connected":"Select Inquiry Target"}),o.map(e=>{return(0,s.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===o.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Subject *"}),(0,s.jsx)(K,{type:"text",value:pe.subject,onChange:e=>xe({...pe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Description *"}),(0,s.jsx)(V,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(W,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Priority"}),(0,s.jsxs)(Q,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(H,{children:"Category"}),(0,s.jsxs)(Q,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(J,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(!pe.subject.trim()||!pe.description.trim()||!de)return;const e=o.find(e=>e.id.toString()===de);if(!e)return;const r=(e=>{const r=o.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(de);try{const t={requesterId:parseInt(ge),requesterName:me,requesterEmail:fe,requesterRole:ye,restaurantId:parseInt(je),restaurantName:ve,managerId:parseInt(e.id.toString()),managerName:e.name,subject:pe.subject,description:pe.description,priority:pe.priority,category:pe.category,inquiryType:r},n=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(t)})).ok&&(await we(),xe({subject:"",description:"",priority:"medium",category:"other"}),ce(1===o.length?o[0].id.toString():""),le(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!pe.subject.trim()||!pe.description.trim()||!de,children:"Submit Inquiry"})]})]})})]})]})})}},4302:(e,r,t)=>{t.d(r,{A:()=>w});var n=t(9950),o=t(4752),i=t(4414);const a=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,l=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,d=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=o.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,p=o.Ay.div`
  flex: 1;
  min-width: 0;
`,x=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,f=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,y=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=o.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,v=o.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,b=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,w=e=>{let{entityType:r,entityId:t,currentUserId:o}=e;const[w,A]=(0,n.useState)([]),[F,k]=(0,n.useState)(""),[E,C]=(0,n.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&A(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&B()},[r,t]);const S=async()=>{if(F.trim()&&!E){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:F.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(a,{children:[(0,i.jsxs)(s,{children:["Comments (",w.length,")"]}),w.length>0?(0,i.jsx)(l,{children:w.map(e=>{var r,t,n;return(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(p,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,i.jsx)(g,{children:z(e.createdAt)}),o&&e.author_id===o&&(0,i.jsx)(f,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(b,{children:"No comments yet"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(j,{value:F,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(v,{onClick:S,disabled:!F.trim()||E,children:"Send"})]})]})}}}]);