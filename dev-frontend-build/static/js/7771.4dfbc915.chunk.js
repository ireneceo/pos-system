"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{7771:(e,r,n)=>{n.r(r),n.d(r,{default:()=>W});var t=n(9950),i=n(4752),o=n(3310),s=n(1367),a=n(4414);const d=i.Ay.div`
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
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  display: flex;
  gap: 12px;
`,h=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,u=i.Ay.div`
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
`,b=i.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,f=i.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,m=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,y=i.Ay.button`
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
`,j=i.Ay.div`
  display: grid;
  gap: 20px;
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=i.Ay.div`
  flex: 1;
`,w=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,k=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,E=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,C=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,B=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,R=i.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,S=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`,D=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,I=i.Ay.div`
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
`,T=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"danger"===e.variant?"\n    background: #FEE2E2;\n    color: #DC2626;\n\n    &:hover {\n      background: #FEE2E2;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  "}
`,N=i.Ay.div`
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
`,q=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,P=i.Ay.div`
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
`,O=i.Ay.button`
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
`,M=i.Ay.div`
  padding: 24px;
`,U=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,_=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,J=i.Ay.select`
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
`,L=i.Ay.textarea`
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
`,H=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,K=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,Q=i.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,V=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,W=()=>{const{user:e}=(0,s.As)(),[r,n]=(0,t.useState)([]),[i,W]=(0,t.useState)("all"),[X,Z]=(0,t.useState)(!1),[ee,re]=(0,t.useState)(null),[ne,te]=(0,t.useState)(""),[ie,oe]=(0,t.useState)("in-progress"),se=(null===e||void 0===e?void 0:e.id)||"2",ae=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,t.useEffect)(()=>{if(e){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[e]);const de=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${se}&userRole=${ae}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();n(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},le=r.filter(e=>"all"===i||e.status===i),pe=r.length,ce=r.filter(e=>"open"===e.status).length,xe=r.filter(e=>"in-progress"===e.status).length,he=r.filter(e=>"resolved"===e.status).length,ge=r.filter(e=>"closed"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY"),be=e=>{const r=Math.floor(e/60),n=e%60;return r>0?`${r}h ${n}m`:`${n}m`};return(0,a.jsx)(o.A,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsx)(x,{children:(0,a.jsx)(h,{variant:"secondary",onClick:de,children:"Refresh"})})]}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(g,{children:[(0,a.jsxs)(u,{borderColor:"#635BFF",children:[(0,a.jsx)(b,{children:pe}),(0,a.jsx)(f,{children:"Total Inquiries"})]}),(0,a.jsxs)(u,{borderColor:"#F59E0B",children:[(0,a.jsx)(b,{children:ce}),(0,a.jsx)(f,{children:"Open"})]}),(0,a.jsxs)(u,{borderColor:"#3B82F6",children:[(0,a.jsx)(b,{children:xe}),(0,a.jsx)(f,{children:"In Progress"})]}),(0,a.jsxs)(u,{borderColor:"#10B981",children:[(0,a.jsx)(b,{children:he}),(0,a.jsx)(f,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(y,{active:"all"===i,onClick:()=>W("all"),children:["All (",pe,")"]}),(0,a.jsxs)(y,{active:"open"===i,onClick:()=>W("open"),children:["Open (",ce,")"]}),(0,a.jsxs)(y,{active:"in-progress"===i,onClick:()=>W("in-progress"),children:["In Progress (",xe,")"]}),(0,a.jsxs)(y,{active:"resolved"===i,onClick:()=>W("resolved"),children:["Resolved (",he,")"]}),(0,a.jsxs)(y,{active:"closed"===i,onClick:()=>W("closed"),children:["Closed (",ge,")"]})]}),(0,a.jsxs)(j,{children:[le.map(e=>(0,a.jsxs)(v,{children:[(0,a.jsxs)(A,{children:[(0,a.jsxs)(F,{children:[(0,a.jsx)(w,{children:e.ticketNumber}),(0,a.jsx)(k,{children:e.subject}),(0,a.jsxs)(E,{children:[(0,a.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,a.jsxs)("span",{children:["From: ",e.requesterName]}),(0,a.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,a.jsxs)(C,{children:[(0,a.jsx)(B,{status:e.status,children:e.status}),(0,a.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)($,{children:e.description}),e.response&&(0,a.jsxs)(R,{children:[(0,a.jsxs)(S,{children:["Your Response \u2022 ",e.resolvedAt&&ue(e.resolvedAt)]}),(0,a.jsx)(D,{children:e.response})]}),(0,a.jsxs)(I,{children:[(0,a.jsxs)("span",{children:["Created: ",ue(e.createdAt)]}),e.responseTime>0&&(0,a.jsxs)("span",{children:["Response Time: ",be(e.responseTime)]}),(0,a.jsx)(T,{variant:"primary",onClick:()=>(e=>{re(e),te(e.response||""),oe(e.response?e.status:"in-progress"),Z(!0)})(e),children:e.response?"Update Reply":"Reply"})]})]},e.id)),0===le.length&&(0,a.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,a.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,a.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),X&&ee&&(0,a.jsx)(N,{onClick:()=>Z(!1),children:(0,a.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(P,{children:[(0,a.jsx)(Y,{children:ee.response?"Update Reply":"Reply to Inquiry"}),(0,a.jsx)(O,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,a.jsxs)(M,{children:[(0,a.jsxs)(H,{children:[(0,a.jsxs)(K,{children:[(0,a.jsx)(Q,{children:"Ticket Number:"}),(0,a.jsx)(V,{children:ee.ticketNumber})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(Q,{children:"Restaurant:"}),(0,a.jsx)(V,{children:ee.restaurantName})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(Q,{children:"From:"}),(0,a.jsx)(V,{children:ee.requesterName})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(Q,{children:"Subject:"}),(0,a.jsx)(V,{children:ee.subject})]})]}),(0,a.jsxs)(_,{children:[(0,a.jsx)(G,{children:"Status *"}),(0,a.jsxs)(J,{value:ie,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(_,{children:[(0,a.jsx)(G,{children:"Response Message *"}),(0,a.jsx)(L,{value:ne,onChange:e=>te(e.target.value),placeholder:"Enter your response to the inquiry..."})]})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(!ne.trim()||!ee)return;const e=new Date(ee.createdAt).getTime(),r=(new Date).getTime(),t=Math.round((r-e)/6e4);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ee.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ie,response:ne,responseTime:t>0?t:1,..."resolved"===ie&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),t=e.data||e;n(e=>e.map(e=>e.id===ee.id?{...e,...t}:e)),te(""),Z(!1)}else alert("Failed to send reply. Please try again.")}catch(i){console.error("Error sending reply:",i),alert("Error sending reply. Please try again.")}},disabled:!ne.trim(),children:"Send Reply"})]})]})})]})]})})}}}]);