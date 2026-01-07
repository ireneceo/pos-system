"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{9889:(e,r,o)=>{o.r(r),o.d(r,{default:()=>M});var n=o(9950),t=o(4752),i=o(3310),s=o(4414);const a=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,d=t.Ay.div`
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
`,l=t.Ay.div`
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
`,c=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,x=t.Ay.div`
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
`,u=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,g=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=t.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,y=t.Ay.input`
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
`,m=t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,f=t.Ay.div`
  display: grid;
  gap: 20px;
`,j=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=t.Ay.div`
  flex: 1;
`,A=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=t.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,C=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=t.Ay.span`
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
`,z=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,S=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,N=t.Ay.div`
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
`,R=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,q=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=t.Ay.button`
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
`,$=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=t.Ay.div`
  margin-bottom: 20px;
`,P=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=t.Ay.textarea`
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
`,M=()=>{const[e,r]=(0,n.useState)([]),[o,t]=(0,n.useState)(""),[M,W]=(0,n.useState)("all"),[H,U]=(0,n.useState)("all"),[Y,J]=(0,n.useState)(null),[G,K]=(0,n.useState)(!1),[Q,V]=(0,n.useState)(!1),[X,Z]=(0,n.useState)(""),[_,ee]=(0,n.useState)(""),re=localStorage.getItem("userId")||"2";(0,n.useEffect)(()=>{oe();const e=setInterval(oe,1e4);return()=>clearInterval(e)},[]);const oe=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${re}&userRole=Manager`);if(e.ok){const o=await e.json();r(o)}}catch(e){console.error("Error fetching operation tickets:",e)}},ne=e.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase()),n="all"===M||e.status===M,t="all"===H||e.priority===H;return r&&n&&t}),te=e.length,ie=e.filter(e=>"open"===e.status).length,se=e.filter(e=>"in-progress"===e.status).length,ae=e.filter(e=>"resolved"===e.status).length,de=e=>new Date(e).toLocaleString("en-MY"),le=e=>{const r=Math.floor(e/60),o=e%60;return r>0?`${r}h ${o}m`:`${o}m`},pe=async(e,r)=>{try{(await fetch(`/api/operation-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:r})})).ok&&await oe()}catch(o){console.error("Error updating status:",o)}};return(0,s.jsx)(i.A,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsx)(c,{variant:"secondary",onClick:oe,children:"Refresh"})]}),(0,s.jsxs)(l,{children:[(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{color:"#059669",children:[(0,s.jsx)(u,{children:te}),(0,s.jsx)(g,{children:"Total Inquiries"})]}),(0,s.jsxs)(h,{color:"#D97706",children:[(0,s.jsx)(u,{children:ie}),(0,s.jsx)(g,{children:"Open"})]}),(0,s.jsxs)(h,{color:"#2563EB",children:[(0,s.jsx)(u,{children:se}),(0,s.jsx)(g,{children:"In Progress"})]}),(0,s.jsxs)(h,{color:"#7C3AED",children:[(0,s.jsx)(u,{children:ae}),(0,s.jsx)(g,{children:"Resolved"})]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(y,{placeholder:"Search inquiries...",value:o,onChange:e=>t(e.target.value)}),(0,s.jsxs)(m,{value:M,onChange:e=>W(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]}),(0,s.jsxs)(m,{value:H,onChange:e=>U(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]}),(0,s.jsx)(f,{children:ne.map(e=>(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(A,{children:e.ticketNumber}),(0,s.jsx)(w,{children:e.subject}),(0,s.jsxs)(C,{children:[e.requesterName," (",e.requesterRole,") \u2022 ",e.restaurantName]})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px"},children:[(0,s.jsx)(k,{status:e.status,children:e.status}),(0,s.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(B,{children:e.description}),e.response&&(0,s.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,s.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Manager Response \u2022 ",e.resolvedAt&&de(e.resolvedAt)]}),(0,s.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:e.response})]}),e.internalNotes&&(0,s.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,s.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#92400E",marginBottom:"6px"},children:"Internal Notes (Not visible to requester)"}),(0,s.jsx)("div",{style:{fontSize:"14px",color:"#78350F"},children:e.internalNotes})]}),(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",fontSize:"12px",color:"#6B7280"},children:[(0,s.jsxs)("span",{children:["Created: ",de(e.createdAt)]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",le(e.responseTime)]})]}),(0,s.jsxs)(z,{children:["open"===e.status&&(0,s.jsx)(S,{variant:"primary",onClick:()=>pe(e,"in-progress"),children:"Start Working"}),"closed"!==e.status&&"resolved"!==e.status&&(0,s.jsx)(S,{variant:"primary",onClick:()=>(e=>{J(e),K(!0)})(e),children:"Reply"}),(0,s.jsx)(S,{onClick:()=>(e=>{J(e),ee(e.internalNotes||""),V(!0)})(e),children:e.internalNotes?"Edit Note":"Add Note"}),"resolved"===e.status&&(0,s.jsx)(S,{onClick:()=>pe(e,"closed"),children:"Close Inquiry"})]})]},e.id))}),G&&Y&&(0,s.jsx)(N,{onClick:()=>K(!1),children:(0,s.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(T,{children:[(0,s.jsxs)(q,{children:["Reply to ",Y.ticketNumber]}),(0,s.jsx)(D,{onClick:()=>K(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsx)("div",{style:{marginBottom:"20px"},children:(0,s.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,s.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Y.subject}),(0,s.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",Y.requesterName," (",Y.requesterRole,")"]}),(0,s.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:Y.description})]})}),(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:"Your Reply"}),(0,s.jsx)(O,{value:X,onChange:e=>Z(e.target.value),placeholder:"Type your reply to the staff member...",style:{minHeight:"120px"}})]})]}),(0,s.jsxs)($,{children:[(0,s.jsx)(c,{variant:"secondary",onClick:()=>K(!1),children:"Cancel"}),(0,s.jsx)(c,{variant:"primary",onClick:async()=>{if(Y&&X.trim())try{(await fetch(`/api/operation-tickets/${Y.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({response:X,status:"resolved"})})).ok&&(await oe(),Z(""),K(!1))}catch(e){console.error("Error sending reply:",e)}},disabled:!X.trim(),children:"Send Reply"})]})]})}),Q&&Y&&(0,s.jsx)(N,{onClick:()=>V(!1),children:(0,s.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(T,{children:[(0,s.jsxs)(q,{children:["Internal Note for ",Y.ticketNumber]}),(0,s.jsx)(D,{onClick:()=>V(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsx)("div",{style:{marginBottom:"20px"},children:(0,s.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,s.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Y.subject}),(0,s.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",Y.requesterName," (",Y.requesterRole,")"]})]})}),(0,s.jsxs)(L,{children:[(0,s.jsx)(P,{children:"Internal Note (Not visible to requester)"}),(0,s.jsx)(O,{value:_,onChange:e=>ee(e.target.value),placeholder:"Add internal notes about this inquiry...",style:{minHeight:"120px"}})]})]}),(0,s.jsxs)($,{children:[(0,s.jsx)(c,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,s.jsx)(c,{variant:"primary",onClick:async()=>{if(Y)try{(await fetch(`/api/operation-tickets/${Y.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({internalNotes:_})})).ok&&(await oe(),ee(""),V(!1))}catch(e){console.error("Error saving note:",e)}},children:"Save Note"})]})]})})]})]})})}}}]);