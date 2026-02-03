"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8725],{8725:(e,r,i)=>{i.r(r),i.d(r,{default:()=>K});var t=i(9950),o=i(4752),n=i(3310),s=i(1367),a=i(4414);const d=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=o.Ay.div`
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
`,p=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=o.Ay.h1`
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
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,g=o.Ay.div`
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
`,m=o.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,y=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,b=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,f=o.Ay.button`
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
`,j=o.Ay.div`
  display: grid;
  gap: 20px;
`,v=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,A=o.Ay.div`
  flex: 1;
`,F=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,k=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,C=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,E=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,$=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,I=o.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,S=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`,q=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 8px;
`,T=o.Ay.div`
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
`,P=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,R=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=o.Ay.button`
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
`,M=o.Ay.div`
  padding: 24px;
`,Y=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,U=o.Ay.div`
  margin-bottom: 20px;
`,_=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=o.Ay.input`
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
`,H=o.Ay.select`
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
`,J=o.Ay.textarea`
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
`,K=()=>{const{user:e}=(0,s.As)(),[r,i]=(0,t.useState)([]),[o,K]=(0,t.useState)("all"),[Q,V]=(0,t.useState)(!1),[W,X]=(0,t.useState)({subject:"",description:"",priority:"medium",category:"general"}),Z=(null===e||void 0===e?void 0:e.id)||"2",ee=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Brand User",re=(null===e||void 0===e?void 0:e.email)||"brand@example.com",ie=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,t.useEffect)(()=>{if(e){te();const e=setInterval(te,1e4);return()=>clearInterval(e)}},[e]);const te=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/support-tickets?userId=${Z}&userRole=${ie}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.success?e.data:Array.isArray(e)?e:[];i(t)}}catch(e){console.error("Error fetching support tickets:",e)}},oe=r.filter(e=>"all"===o||e.status===o),ne=r.length,se=r.filter(e=>"open"===e.status).length,ae=r.filter(e=>"in-progress"===e.status).length,de=r.filter(e=>"resolved"===e.status).length,le=r.filter(e=>"closed"===e.status).length,pe=e=>new Date(e).toLocaleString("en-MY"),ce=e=>{const r=Math.floor(e/60),i=e%60;return r>0?`${r}h ${i}m`:`${i}m`};return(0,a.jsx)(n.A,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"System Inquiry"}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:te,children:"Refresh"}),(0,a.jsx)(h,{variant:"primary",onClick:()=>{V(!0)},children:"New Inquiry"})]})]}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{borderColor:"#635BFF",children:[(0,a.jsx)(m,{children:ne}),(0,a.jsx)(y,{children:"Total Tickets"})]}),(0,a.jsxs)(g,{borderColor:"#F59E0B",children:[(0,a.jsx)(m,{children:se}),(0,a.jsx)(y,{children:"Open Tickets"})]}),(0,a.jsxs)(g,{borderColor:"#3B82F6",children:[(0,a.jsx)(m,{children:ae}),(0,a.jsx)(y,{children:"In Progress"})]}),(0,a.jsxs)(g,{borderColor:"#10B981",children:[(0,a.jsx)(m,{children:de}),(0,a.jsx)(y,{children:"Resolved"})]})]}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(f,{active:"all"===o,onClick:()=>K("all"),children:["All (",ne,")"]}),(0,a.jsxs)(f,{active:"open"===o,onClick:()=>K("open"),children:["Open (",se,")"]}),(0,a.jsxs)(f,{active:"in-progress"===o,onClick:()=>K("in-progress"),children:["In Progress (",ae,")"]}),(0,a.jsxs)(f,{active:"resolved"===o,onClick:()=>K("resolved"),children:["Resolved (",de,")"]}),(0,a.jsxs)(f,{active:"closed"===o,onClick:()=>K("closed"),children:["Closed (",le,")"]})]}),(0,a.jsxs)(j,{children:[oe.map(e=>(0,a.jsxs)(v,{children:[(0,a.jsxs)(w,{children:[(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{children:e.ticketNumber}),(0,a.jsx)(k,{children:e.subject}),(0,a.jsx)(B,{children:(0,a.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,a.jsxs)(C,{children:[(0,a.jsx)(E,{status:e.status,children:e.status}),(0,a.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)($,{children:e.description}),e.response&&(0,a.jsxs)(I,{children:[(0,a.jsxs)(S,{children:["System Admin Response \u2022 ",e.resolvedAt&&pe(e.resolvedAt)]}),(0,a.jsx)(q,{children:e.response})]}),(0,a.jsxs)(D,{children:[(0,a.jsxs)("span",{children:["Created: ",pe(e.createdAt)]}),e.responseTime>0&&(0,a.jsxs)("span",{children:["Response Time: ",ce(e.responseTime)]})]})]},e.id)),0===oe.length&&(0,a.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,a.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),Q&&(0,a.jsx)(T,{onClick:()=>V(!1),children:(0,a.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(R,{children:[(0,a.jsx)(N,{children:"Create System Inquiry"}),(0,a.jsx)(O,{onClick:()=>V(!1),children:"\xd7"})]}),(0,a.jsxs)(M,{children:[(0,a.jsxs)(U,{children:[(0,a.jsx)(_,{children:"Subject *"}),(0,a.jsx)(G,{type:"text",value:W.subject,onChange:e=>X({...W,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(_,{children:"Description *"}),(0,a.jsx)(J,{value:W.description,onChange:e=>X({...W,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,a.jsxs)(L,{children:[(0,a.jsxs)(U,{children:[(0,a.jsx)(_,{children:"Priority"}),(0,a.jsxs)(H,{value:W.priority,onChange:e=>X({...W,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(U,{children:[(0,a.jsx)(_,{children:"Category"}),(0,a.jsxs)(H,{value:W.category,onChange:e=>X({...W,category:e.target.value}),children:[(0,a.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,a.jsx)("option",{value:"account",children:"Account Management"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature",children:"Feature Request"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)(Y,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(W.subject.trim()&&W.description.trim())try{const e={customerId:Z,customerName:ee,customerEmail:re,customerRole:ie,subject:W.subject,description:W.description,priority:W.priority,category:W.category},r=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)})).ok?(await te(),X({subject:"",description:"",priority:"medium",category:"general"}),V(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!W.subject.trim()||!W.description.trim(),children:"Submit Inquiry"})]})]})})]})]})})}}}]);