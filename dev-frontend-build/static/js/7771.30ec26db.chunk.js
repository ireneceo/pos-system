"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{7771:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Z});var t=n(9950),i=n(4752),o=n(1367),s=n(4414);const a=i.Ay.div`
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
`,x=i.Ay.div`
  display: flex;
  gap: 12px;
`,c=i.Ay.button`
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
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
`,m=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=i.Ay.input`
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
`,v=i.Ay.select`
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
`,C=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,k=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,z=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,S=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,R=i.Ay.span`
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
`,D=i.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,I=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`,N=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,T=i.Ay.div`
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
`,q=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"danger"===e.variant?"\n    background: #FEE2E2;\n    color: #DC2626;\n\n    &:hover {\n      background: #FEE2E2;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  "}
`,L=i.Ay.div`
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
`,P=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,O=i.Ay.div`
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
`,M=i.Ay.button`
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
`,U=i.Ay.div`
  padding: 24px;
`,_=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,G=i.Ay.div`
  margin-bottom: 20px;
`,H=i.Ay.label`
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
`,K=i.Ay.textarea`
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
`,Q=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,V=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,W=i.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,X=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,Z=()=>{const{user:e}=(0,o.As)(),[r,n]=(0,t.useState)([]),[i,Z]=(0,t.useState)(""),[ee,re]=(0,t.useState)("all"),[ne,te]=(0,t.useState)("all"),[ie,oe]=(0,t.useState)(!1),[se,ae]=(0,t.useState)(null),[de,le]=(0,t.useState)(""),[pe,xe]=(0,t.useState)("in-progress"),ce=(null===e||void 0===e?void 0:e.id)||"2",he=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,t.useEffect)(()=>{if(e){ue();const e=setInterval(ue,1e4);return()=>clearInterval(e)}},[e]);const ue=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ce}&userRole=${he}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();n(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},ge=r.filter(e=>{const r=e.subject.toLowerCase().includes(i.toLowerCase())||e.ticketNumber.toLowerCase().includes(i.toLowerCase())||e.requesterName.toLowerCase().includes(i.toLowerCase())||e.restaurantName.toLowerCase().includes(i.toLowerCase()),n="all"===ee||e.status===ee,t="all"===ne||e.priority===ne;return r&&n&&t}),be=r.length,fe=r.filter(e=>"open"===e.status).length,me=r.filter(e=>"in-progress"===e.status).length,je=r.filter(e=>"resolved"===e.status).length,ye=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),ve=e=>{const r=Math.floor(e/60),n=e%60;return r>0?`${r}h ${n}m`:`${n}m`};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsx)(x,{children:(0,s.jsx)(c,{variant:"secondary",onClick:ue,children:"Refresh"})})]}),(0,s.jsxs)(l,{children:[(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{borderColor:"#635BFF",children:[(0,s.jsx)(g,{children:be}),(0,s.jsx)(b,{children:"Total Inquiries"})]}),(0,s.jsxs)(u,{borderColor:"#F59E0B",children:[(0,s.jsx)(g,{children:fe}),(0,s.jsx)(b,{children:"Open"})]}),(0,s.jsxs)(u,{borderColor:"#3B82F6",children:[(0,s.jsx)(g,{children:me}),(0,s.jsx)(b,{children:"In Progress"})]}),(0,s.jsxs)(u,{borderColor:"#10B981",children:[(0,s.jsx)(g,{children:je}),(0,s.jsx)(b,{children:"Resolved"})]})]}),(0,s.jsxs)(f,{children:[(0,s.jsxs)(m,{children:[(0,s.jsx)(j,{children:"Search"}),(0,s.jsx)(y,{placeholder:"Search inquiries...",value:i,onChange:e=>Z(e.target.value)})]}),(0,s.jsxs)(m,{children:[(0,s.jsx)(j,{children:"Status"}),(0,s.jsxs)(v,{value:ee,onChange:e=>re(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(m,{children:[(0,s.jsx)(j,{children:"Priority"}),(0,s.jsxs)(v,{value:ne,onChange:e=>te(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,s.jsxs)(w,{children:[ge.map(e=>(0,s.jsxs)(A,{children:[(0,s.jsxs)(F,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(k,{children:e.subject}),(0,s.jsxs)(B,{children:[(0,s.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,s.jsxs)("span",{children:["From: ",e.requesterName]}),(0,s.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(S,{status:e.status,children:e.status}),(0,s.jsx)(R,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)($,{children:e.description}),e.response&&(0,s.jsxs)(D,{children:[(0,s.jsxs)(I,{children:["Your Response \u2022 ",e.resolvedAt&&ye(e.resolvedAt)]}),(0,s.jsx)(N,{children:e.response})]}),(0,s.jsxs)(T,{children:[(0,s.jsxs)("span",{children:["Created: ",ye(e.createdAt)]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",ve(e.responseTime)]}),(0,s.jsx)(q,{variant:"primary",onClick:()=>(e=>{ae(e),le(e.response||""),xe(e.response?e.status:"in-progress"),oe(!0)})(e),children:e.response?"Update Reply":"Reply"})]})]},e.id)),0===ge.length&&(0,s.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,s.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,s.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),ie&&se&&(0,s.jsx)(L,{onClick:()=>oe(!1),children:(0,s.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(O,{children:[(0,s.jsx)(Y,{children:se.response?"Update Reply":"Reply to Inquiry"}),(0,s.jsx)(M,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,s.jsxs)(U,{children:[(0,s.jsxs)(Q,{children:[(0,s.jsxs)(V,{children:[(0,s.jsx)(W,{children:"Ticket Number:"}),(0,s.jsx)(X,{children:se.ticketNumber})]}),(0,s.jsxs)(V,{children:[(0,s.jsx)(W,{children:"Restaurant:"}),(0,s.jsx)(X,{children:se.restaurantName})]}),(0,s.jsxs)(V,{children:[(0,s.jsx)(W,{children:"From:"}),(0,s.jsx)(X,{children:se.requesterName})]}),(0,s.jsxs)(V,{children:[(0,s.jsx)(W,{children:"Subject:"}),(0,s.jsx)(X,{children:se.subject})]})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)(H,{children:"Status *"}),(0,s.jsxs)(J,{value:pe,onChange:e=>xe(e.target.value),children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(G,{children:[(0,s.jsx)(H,{children:"Response Message *"}),(0,s.jsx)(K,{value:de,onChange:e=>le(e.target.value),placeholder:"Enter your response to the inquiry..."})]})]}),(0,s.jsxs)(_,{children:[(0,s.jsx)(c,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,s.jsx)(c,{variant:"primary",onClick:async()=>{if(!de.trim()||!se)return;const e=new Date(se.createdAt).getTime(),r=(new Date).getTime(),t=Math.round((r-e)/6e4);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${se.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:pe,response:de,responseTime:t>0?t:1,..."resolved"===pe&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),t=e.data||e;n(e=>e.map(e=>e.id===se.id?{...e,...t}:e)),le(""),oe(!1)}else alert("Failed to send reply. Please try again.")}catch(i){console.error("Error sending reply:",i),alert("Error sending reply. Please try again.")}},disabled:!de.trim(),children:"Send Reply"})]})]})})]})]})})}}}]);