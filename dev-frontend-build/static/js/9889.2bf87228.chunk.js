"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{9889:(e,r,o)=>{o.r(r),o.d(r,{default:()=>O});var n=o(9950),t=o(4752),i=o(4414);const s=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,a=t.Ay.div`
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
`,d=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,l=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,c=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,x=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,h=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,u=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,g=t.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,b=t.Ay.input`
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
`,y=t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
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
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,v=t.Ay.div`
  flex: 1;
`,F=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=t.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,w=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,k=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,E=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,B=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,z=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,S=t.Ay.div`
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
`,N=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,R=t.Ay.div`
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
`,q=t.Ay.button`
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
`,D=t.Ay.div`
  padding: 24px;
`,I=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,$=t.Ay.div`
  margin-bottom: 20px;
`,L=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,P=t.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,O=()=>{const[e,r]=(0,n.useState)([]),[o,t]=(0,n.useState)(""),[O,M]=(0,n.useState)("all"),[W,H]=(0,n.useState)("all"),[U,Y]=(0,n.useState)(null),[J,G]=(0,n.useState)(!1),[K,Q]=(0,n.useState)(!1),[V,X]=(0,n.useState)(""),[Z,_]=(0,n.useState)(""),ee=localStorage.getItem("userId")||"2";(0,n.useEffect)(()=>{re();const e=setInterval(re,1e4);return()=>clearInterval(e)},[]);const re=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ee}&userRole=Manager`);if(e.ok){const o=await e.json();r(o)}}catch(e){console.error("Error fetching operation tickets:",e)}},oe=e.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase()),n="all"===O||e.status===O,t="all"===W||e.priority===W;return r&&n&&t}),ne=e.length,te=e.filter(e=>"open"===e.status).length,ie=e.filter(e=>"in-progress"===e.status).length,se=e.filter(e=>"resolved"===e.status).length,ae=e=>new Date(e).toLocaleString("en-MY"),de=e=>{const r=Math.floor(e/60),o=e%60;return r>0?`${r}h ${o}m`:`${o}m`},le=async(e,r)=>{try{(await fetch(`/api/operation-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:r})})).ok&&await re()}catch(o){console.error("Error updating status:",o)}};return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(s,{children:[(0,i.jsxs)(a,{children:[(0,i.jsx)(l,{children:"Operation Inquiry"}),(0,i.jsx)(p,{variant:"secondary",onClick:re,children:"Refresh"})]}),(0,i.jsxs)(d,{children:[(0,i.jsxs)(c,{children:[(0,i.jsxs)(x,{color:"#059669",children:[(0,i.jsx)(h,{children:ne}),(0,i.jsx)(u,{children:"Total Inquiries"})]}),(0,i.jsxs)(x,{color:"#D97706",children:[(0,i.jsx)(h,{children:te}),(0,i.jsx)(u,{children:"Open"})]}),(0,i.jsxs)(x,{color:"#2563EB",children:[(0,i.jsx)(h,{children:ie}),(0,i.jsx)(u,{children:"In Progress"})]}),(0,i.jsxs)(x,{color:"#7C3AED",children:[(0,i.jsx)(h,{children:se}),(0,i.jsx)(u,{children:"Resolved"})]})]}),(0,i.jsxs)(g,{children:[(0,i.jsx)(b,{placeholder:"Search inquiries...",value:o,onChange:e=>t(e.target.value)}),(0,i.jsxs)(y,{value:O,onChange:e=>M(e.target.value),children:[(0,i.jsx)("option",{value:"all",children:"All Status"}),(0,i.jsx)("option",{value:"open",children:"Open"}),(0,i.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,i.jsx)("option",{value:"resolved",children:"Resolved"}),(0,i.jsx)("option",{value:"closed",children:"Closed"})]}),(0,i.jsxs)(y,{value:W,onChange:e=>H(e.target.value),children:[(0,i.jsx)("option",{value:"all",children:"All Priority"}),(0,i.jsx)("option",{value:"urgent",children:"Urgent"}),(0,i.jsx)("option",{value:"high",children:"High"}),(0,i.jsx)("option",{value:"medium",children:"Medium"}),(0,i.jsx)("option",{value:"low",children:"Low"})]})]}),(0,i.jsx)(m,{children:oe.map(e=>(0,i.jsxs)(f,{children:[(0,i.jsxs)(j,{children:[(0,i.jsxs)(v,{children:[(0,i.jsx)(F,{children:e.ticketNumber}),(0,i.jsx)(A,{children:e.subject}),(0,i.jsxs)(w,{children:[e.requesterName," (",e.requesterRole,") \u2022 ",e.restaurantName]})]}),(0,i.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,i.jsx)(C,{status:e.status,children:e.status}),(0,i.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,i.jsx)(E,{children:e.description}),e.response&&(0,i.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,i.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Manager Response \u2022 ",e.resolvedAt&&ae(e.resolvedAt)]}),(0,i.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:e.response})]}),e.internalNotes&&(0,i.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,i.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#92400E",marginBottom:"6px"},children:"Internal Notes (Not visible to requester)"}),(0,i.jsx)("div",{style:{fontSize:"14px",color:"#78350F"},children:e.internalNotes})]}),(0,i.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",fontSize:"12px",color:"#6B7280"},children:[(0,i.jsxs)("span",{children:["Created: ",ae(e.createdAt)]}),e.responseTime>0&&(0,i.jsxs)("span",{children:["Response Time: ",de(e.responseTime)]})]}),(0,i.jsxs)(B,{children:["open"===e.status&&(0,i.jsx)(z,{variant:"primary",onClick:()=>le(e,"in-progress"),children:"Start Working"}),"closed"!==e.status&&"resolved"!==e.status&&(0,i.jsx)(z,{variant:"primary",onClick:()=>(e=>{Y(e),G(!0)})(e),children:"Reply"}),(0,i.jsx)(z,{onClick:()=>(e=>{Y(e),_(e.internalNotes||""),Q(!0)})(e),children:e.internalNotes?"Edit Note":"Add Note"}),"resolved"===e.status&&(0,i.jsx)(z,{onClick:()=>le(e,"closed"),children:"Close Inquiry"})]})]},e.id))}),J&&U&&(0,i.jsx)(S,{onClick:()=>G(!1),children:(0,i.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(R,{children:[(0,i.jsxs)(T,{children:["Reply to ",U.ticketNumber]}),(0,i.jsx)(q,{onClick:()=>G(!1),children:"\xd7"})]}),(0,i.jsxs)(D,{children:[(0,i.jsx)("div",{style:{marginBottom:"20px"},children:(0,i.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,i.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:U.subject}),(0,i.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",U.requesterName," (",U.requesterRole,")"]}),(0,i.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:U.description})]})}),(0,i.jsxs)($,{children:[(0,i.jsx)(L,{children:"Your Reply"}),(0,i.jsx)(P,{value:V,onChange:e=>X(e.target.value),placeholder:"Type your reply to the staff member...",style:{minHeight:"120px"}})]})]}),(0,i.jsxs)(I,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,i.jsx)(p,{variant:"primary",onClick:async()=>{if(U&&V.trim())try{(await fetch(`/api/operation-tickets/${U.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({response:V,status:"resolved"})})).ok&&(await re(),X(""),G(!1))}catch(e){console.error("Error sending reply:",e)}},disabled:!V.trim(),children:"Send Reply"})]})]})}),K&&U&&(0,i.jsx)(S,{onClick:()=>Q(!1),children:(0,i.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(R,{children:[(0,i.jsxs)(T,{children:["Internal Note for ",U.ticketNumber]}),(0,i.jsx)(q,{onClick:()=>Q(!1),children:"\xd7"})]}),(0,i.jsxs)(D,{children:[(0,i.jsx)("div",{style:{marginBottom:"20px"},children:(0,i.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,i.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:U.subject}),(0,i.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",U.requesterName," (",U.requesterRole,")"]})]})}),(0,i.jsxs)($,{children:[(0,i.jsx)(L,{children:"Internal Note (Not visible to requester)"}),(0,i.jsx)(P,{value:Z,onChange:e=>_(e.target.value),placeholder:"Add internal notes about this inquiry...",style:{minHeight:"120px"}})]})]}),(0,i.jsxs)(I,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,i.jsx)(p,{variant:"primary",onClick:async()=>{if(U)try{(await fetch(`/api/operation-tickets/${U.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({internalNotes:Z})})).ok&&(await re(),_(""),Q(!1))}catch(e){console.error("Error saving note:",e)}},children:"Save Note"})]})]})})]})]})})}}}]);