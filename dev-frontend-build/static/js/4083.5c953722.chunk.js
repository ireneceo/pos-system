"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>re});var o=t(9950),n=t(4752),i=t(1367),a=t(4302),s=t(4414);const d=n.Ay.div`
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
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
`,h=n.Ay.button`
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
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=n.Ay.div`
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
`,v=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.input`
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
`,w=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=n.Ay.div`
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
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=n.Ay.div`
  flex: 1;
`,C=n.Ay.div`
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
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,I=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=n.Ay.span`
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
`,T=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,N=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,M=n.Ay.span`
  color: #374151;
`,R=n.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,O=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,_=n.Ay.div`
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
`,U=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,G=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,J=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=n.Ay.button`
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
`,Y=n.Ay.div`
  padding: 24px;
`,H=n.Ay.div`
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
`,X=n.Ay.input`
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
`,Z=n.Ay.select`
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
`,ee=n.Ay.textarea`
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
`,re=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,o.useState)([]),[n,re]=(0,o.useState)([]),[te,oe]=(0,o.useState)(""),[ne,ie]=(0,o.useState)("all"),[ae,se]=(0,o.useState)("all"),[de,le]=(0,o.useState)("all"),[ce,pe]=(0,o.useState)(!1),[xe,he]=(0,o.useState)(""),[ue,ge]=(0,o.useState)({subject:"",description:"",priority:"medium",category:"other"}),[me,fe]=(0,o.useState)(null),ye=(null===e||void 0===e?void 0:e.id)||"3",je=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",ve=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",be=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",we=(null===e||void 0===e?void 0:e.restaurantId)||"1",Ae=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,o.useEffect)(()=>{if(e&&e.restaurantId){ke(),Fe();const e=setInterval(ke,1e4);return()=>clearInterval(e)}},[e]),(0,o.useEffect)(()=>{1===n.length&&he(n[0].id.toString())},[n]);const Fe=async()=>{try{const e=await fetch(`/api/restaurants/${we}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?re(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},ke=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ye}&userRole=${be}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},Ee=r.filter(e=>{const r=e.subject.toLowerCase().includes(te.toLowerCase())||e.ticketNumber.toLowerCase().includes(te.toLowerCase())||e.managerName.toLowerCase().includes(te.toLowerCase()),t="all"===ne||e.status===ne,o="all"===ae||e.priority===ae,n="all"===de||e.category===de;return r&&t&&o&&n}),Ce=r.length,Be=r.filter(e=>"open"===e.status).length,Se=r.filter(e=>"in-progress"===e.status).length,ze=r.filter(e=>"resolved"===e.status).length,Ie=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),$e=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:ke,children:"Refresh"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{pe(!0)},children:"New Inquiry"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{color:"#635BFF",children:[(0,s.jsx)(m,{children:Ce}),(0,s.jsx)(f,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{color:"#F59E0B",children:[(0,s.jsx)(m,{children:Be}),(0,s.jsx)(f,{children:"Open"})]}),(0,s.jsxs)(g,{color:"#3B82F6",children:[(0,s.jsx)(m,{children:Se}),(0,s.jsx)(f,{children:"In Progress"})]}),(0,s.jsxs)(g,{color:"#10B981",children:[(0,s.jsx)(m,{children:ze}),(0,s.jsx)(f,{children:"Resolved"})]})]}),(0,s.jsxs)(y,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Search"}),(0,s.jsx)(b,{placeholder:"Search inquiries...",value:te,onChange:e=>oe(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Status"}),(0,s.jsxs)(w,{value:ne,onChange:e=>ie(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Priority"}),(0,s.jsxs)(w,{value:ae,onChange:e=>se(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsx)(v,{children:"Category"}),(0,s.jsxs)(w,{value:de,onChange:e=>le(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,s.jsxs)(A,{children:[Ee.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{fe(e)})(e),style:{cursor:"pointer"},children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(S,{children:["Manager: ",e.managerName]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(I,{status:e.status,children:e.status}),(0,s.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(q,{children:e.description}),e.response&&(0,s.jsxs)(R,{children:[(0,s.jsxs)(O,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${Ie(e.resolvedAt)}`]}),(0,s.jsx)(_,{children:e.response})]}),(0,s.jsxs)(T,{children:[(0,s.jsxs)(D,{children:[(0,s.jsx)(N,{children:"Created"}),(0,s.jsx)(M,{children:Ie(e.createdAt)})]}),(0,s.jsxs)(D,{children:[(0,s.jsx)(N,{children:"Category"}),(0,s.jsx)(M,{children:e.category})]}),e.responseTime>0&&(0,s.jsxs)(D,{children:[(0,s.jsx)(N,{children:"Response Time"}),(0,s.jsx)(M,{children:$e(e.responseTime)})]})]})]},e.id)),0===Ee.length&&(0,s.jsxs)(L,{children:[(0,s.jsx)("h3",{children:"No inquiries yet"}),(0,s.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),me&&(0,s.jsx)(P,{onClick:()=>fe(null),children:(0,s.jsxs)(U,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,s.jsxs)(G,{children:[(0,s.jsx)(J,{children:me.ticketNumber}),(0,s.jsx)(W,{onClick:()=>fe(null),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,s.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:me.subject}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,s.jsx)(I,{status:me.status,children:me.status}),(0,s.jsx)($,{priority:me.priority,children:me.priority}),(0,s.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:me.category})]}),(0,s.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",me.managerName," \xb7 ",Ie(me.createdAt)]})]}),(0,s.jsx)(q,{children:me.description}),me.response&&(0,s.jsxs)(R,{children:[(0,s.jsxs)(O,{children:["Manager Response ",me.resolvedAt&&`\xb7 ${Ie(me.resolvedAt)}`]}),(0,s.jsx)(_,{children:me.response})]}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(me.id),currentUserId:null===e||void 0===e?void 0:e.id})]})]})}),ce&&(0,s.jsx)(P,{onClick:()=>pe(!1),children:(0,s.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(G,{children:[(0,s.jsx)(J,{children:"Create Operation Inquiry"}),(0,s.jsx)(W,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Inquiry Target *"}),(0,s.jsxs)(Z,{value:xe,onChange:e=>he(e.target.value),required:!0,disabled:n.length<=1,children:[(0,s.jsx)("option",{value:"",children:0===n.length?"No one connected":"Select Inquiry Target"}),n.map(e=>{return(0,s.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===n.length&&(0,s.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Subject *"}),(0,s.jsx)(X,{type:"text",value:ue.subject,onChange:e=>ge({...ue,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Description *"}),(0,s.jsx)(ee,{value:ue.description,onChange:e=>ge({...ue,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,s.jsxs)(K,{children:[(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Priority"}),(0,s.jsxs)(Z,{value:ue.priority,onChange:e=>ge({...ue,priority:e.target.value}),children:[(0,s.jsx)("option",{value:"low",children:"Low"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,s.jsxs)(Q,{children:[(0,s.jsx)(V,{children:"Category"}),(0,s.jsxs)(Z,{value:ue.category,onChange:e=>ge({...ue,category:e.target.value}),children:[(0,s.jsx)("option",{value:"schedule",children:"Schedule"}),(0,s.jsx)("option",{value:"inventory",children:"Inventory"}),(0,s.jsx)("option",{value:"staff",children:"Staff"}),(0,s.jsx)("option",{value:"menu",children:"Menu"}),(0,s.jsx)("option",{value:"customer",children:"Customer"}),(0,s.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(!ue.subject.trim()||!ue.description.trim()||!xe)return;const e=n.find(e=>e.id.toString()===xe);if(!e)return;const r=(e=>{const r=n.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(xe);try{const t={requesterId:parseInt(ye),requesterName:je,requesterEmail:ve,requesterRole:be,restaurantId:parseInt(we),restaurantName:Ae,managerId:parseInt(e.id.toString()),managerName:e.name,subject:ue.subject,description:ue.description,priority:ue.priority,category:ue.category,inquiryType:r},o=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify(t)})).ok&&(await ke(),ge({subject:"",description:"",priority:"medium",category:"other"}),he(1===n.length?n[0].id.toString():""),pe(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ue.subject.trim()||!ue.description.trim()||!xe,children:"Submit Inquiry"})]})]})})]})]})})}},4302:(e,r,t)=>{t.d(r,{A:()=>w});var o=t(9950),n=t(4752),i=t(4414);const a=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,s=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=n.Ay.div`
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
`,p=n.Ay.div`
  flex: 1;
  min-width: 0;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,f=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=n.Ay.textarea`
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
`,v=n.Ay.button`
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
`,b=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,w=e=>{let{entityType:r,entityId:t,currentUserId:n}=e;const[w,A]=(0,o.useState)([]),[F,k]=(0,o.useState)(""),[E,C]=(0,o.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&A(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,o.useEffect)(()=>{t&&B()},[r,t]);const S=async()=>{if(F.trim()&&!E){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:F.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(a,{children:[(0,i.jsxs)(s,{children:["Comments (",w.length,")"]}),w.length>0?(0,i.jsx)(d,{children:w.map(e=>{var r,t,o;return(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(p,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(o=e.author)||void 0===o?void 0:o.role)||e.author_role}),(0,i.jsx)(g,{children:z(e.createdAt)}),n&&e.author_id===n&&(0,i.jsx)(f,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(b,{children:"No comments yet"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(j,{value:F,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(v,{onClick:S,disabled:!F.trim()||E,children:"Send"})]})]})}}}]);