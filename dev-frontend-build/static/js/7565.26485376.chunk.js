"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7565],{7565:(e,r,n)=>{n.r(r),n.d(r,{default:()=>V});var t=n(9950),i=n(4752),o=n(1367),s=n(4414);const a=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,d=i.Ay.div`
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
`,l=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,c=i.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,h=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,g=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,u=i.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,b=i.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,f=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,m=i.Ay.button`
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
`,y=i.Ay.div`
  display: grid;
  gap: 20px;
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=i.Ay.div`
  flex: 1;
`,A=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,w=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,k=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,E=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,C=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=i.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,R=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`,S=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,D=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,I=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"danger"===e.variant?"\n    background: #FEE2E2;\n    color: #DC2626;\n\n    &:hover {\n      background: #FEE2E2;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  "}
`,T=i.Ay.div`
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
`,N=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,q=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,Y=i.Ay.button`
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
`,O=i.Ay.div`
  padding: 24px;
`,M=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=i.Ay.div`
  margin-bottom: 20px;
`,_=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=i.Ay.select`
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
`,J=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,H=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,K=i.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,Q=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,V=()=>{const{user:e}=(0,o.As)(),[r,n]=(0,t.useState)([]),[i,V]=(0,t.useState)("all"),[W,X]=(0,t.useState)(!1),[Z,ee]=(0,t.useState)(null),[re,ne]=(0,t.useState)(""),[te,ie]=(0,t.useState)("in-progress"),oe=(null===e||void 0===e?void 0:e.id)||"4",se=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,t.useEffect)(()=>{if(e){ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)}},[e]);const ae=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${oe}&userRole=${se}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();n(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},de=r.filter(e=>"all"===i||e.status===i),le=r.length,pe=r.filter(e=>"open"===e.status).length,ce=r.filter(e=>"in-progress"===e.status).length,xe=r.filter(e=>"resolved"===e.status).length,he=r.filter(e=>"closed"===e.status).length,ge=e=>new Date(e).toLocaleString("en-MY"),ue=e=>{const r=Math.floor(e/60),n=e%60;return r>0?`${r}h ${n}m`:`${n}m`};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsx)(c,{children:(0,s.jsx)(x,{variant:"secondary",onClick:ae,children:"Refresh"})})]}),(0,s.jsxs)(l,{children:[(0,s.jsxs)(h,{children:[(0,s.jsxs)(g,{borderColor:"#635BFF",children:[(0,s.jsx)(u,{children:le}),(0,s.jsx)(b,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{borderColor:"#F59E0B",children:[(0,s.jsx)(u,{children:pe}),(0,s.jsx)(b,{children:"Open"})]}),(0,s.jsxs)(g,{borderColor:"#3B82F6",children:[(0,s.jsx)(u,{children:ce}),(0,s.jsx)(b,{children:"In Progress"})]}),(0,s.jsxs)(g,{borderColor:"#10B981",children:[(0,s.jsx)(u,{children:xe}),(0,s.jsx)(b,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(m,{active:"all"===i,onClick:()=>V("all"),children:["All (",le,")"]}),(0,s.jsxs)(m,{active:"open"===i,onClick:()=>V("open"),children:["Open (",pe,")"]}),(0,s.jsxs)(m,{active:"in-progress"===i,onClick:()=>V("in-progress"),children:["In Progress (",ce,")"]}),(0,s.jsxs)(m,{active:"resolved"===i,onClick:()=>V("resolved"),children:["Resolved (",xe,")"]}),(0,s.jsxs)(m,{active:"closed"===i,onClick:()=>V("closed"),children:["Closed (",he,")"]})]}),(0,s.jsxs)(y,{children:[de.map(e=>(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(A,{children:e.ticketNumber}),(0,s.jsx)(w,{children:e.subject}),(0,s.jsxs)(k,{children:[(0,s.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,s.jsxs)("span",{children:["From: ",e.requesterName]}),(0,s.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{status:e.status,children:e.status}),(0,s.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(z,{children:e.description}),e.response&&(0,s.jsxs)($,{children:[(0,s.jsxs)(R,{children:["Your Response \u2022 ",e.resolvedAt&&ge(e.resolvedAt)]}),(0,s.jsx)(S,{children:e.response})]}),(0,s.jsxs)(D,{children:[(0,s.jsxs)("span",{children:["Created: ",ge(e.createdAt)]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",ue(e.responseTime)]}),(0,s.jsx)(I,{variant:"primary",onClick:()=>(e=>{ee(e),ne(e.response||""),ie(e.response?e.status:"in-progress"),X(!0)})(e),children:e.response?"Update Reply":"Reply"})]})]},e.id)),0===de.length&&(0,s.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,s.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,s.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),W&&Z&&(0,s.jsx)(T,{onClick:()=>X(!1),children:(0,s.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(q,{children:[(0,s.jsx)(P,{children:Z.response?"Update Reply":"Reply to Inquiry"}),(0,s.jsx)(Y,{onClick:()=>X(!1),children:"\xd7"})]}),(0,s.jsxs)(O,{children:[(0,s.jsxs)(L,{children:[(0,s.jsxs)(H,{children:[(0,s.jsx)(K,{children:"Ticket Number:"}),(0,s.jsx)(Q,{children:Z.ticketNumber})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(K,{children:"Restaurant:"}),(0,s.jsx)(Q,{children:Z.restaurantName})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(K,{children:"From:"}),(0,s.jsx)(Q,{children:Z.requesterName})]}),(0,s.jsxs)(H,{children:[(0,s.jsx)(K,{children:"Subject:"}),(0,s.jsx)(Q,{children:Z.subject})]})]}),(0,s.jsxs)(U,{children:[(0,s.jsx)(_,{children:"Status *"}),(0,s.jsxs)(G,{value:te,onChange:e=>ie(e.target.value),children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(U,{children:[(0,s.jsx)(_,{children:"Response Message *"}),(0,s.jsx)(J,{value:re,onChange:e=>ne(e.target.value),placeholder:"Enter your response to the inquiry..."})]})]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,s.jsx)(x,{variant:"primary",onClick:async()=>{if(!re.trim()||!Z)return;const e=new Date(Z.createdAt).getTime(),r=(new Date).getTime(),t=Math.round((r-e)/6e4);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:te,response:re,responseTime:t>0?t:1,..."resolved"===te&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),t=e.data||e;n(e=>e.map(e=>e.id===Z.id?{...e,...t}:e)),ne(""),X(!1)}else alert("Failed to send reply. Please try again.")}catch(i){console.error("Error sending reply:",i),alert("Error sending reply. Please try again.")}},disabled:!re.trim(),children:"Send Reply"})]})]})})]})]})})}}}]);