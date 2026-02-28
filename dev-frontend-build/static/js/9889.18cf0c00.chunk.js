"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{9889:(e,r,n)=>{n.r(r),n.d(r,{default:()=>X});var t=n(9950),i=n(4752),o=n(4414);const s=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,a=i.Ay.div`
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
`,l=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,p=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,c=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,x=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,h=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,u=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,g=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,b=i.Ay.input`
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
`,y=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,m=i.Ay.div`
  display: grid;
  gap: 20px;
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,j=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,v=i.Ay.div`
  flex: 1;
`,F=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,w=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,E=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,C=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,B=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,z=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,N=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,S=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,$=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,q=i.Ay.span`
  color: #374151;
`,D=i.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,I=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,T=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,L=i.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #FEF3C7;
  border-radius: 8px;
  border: 1px solid #FCD34D;
`,P=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 6px;
`,O=i.Ay.div`
  font-size: 14px;
  color: #78350F;
  line-height: 1.5;
`,M=i.Ay.div`
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
`,H=i.Ay.div`
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
`,J=i.Ay.button`
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
`,W=i.Ay.div`
  padding: 24px;
`,G=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=i.Ay.div`
  margin-bottom: 20px;
`,Q=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,V=i.Ay.textarea`
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
`,X=()=>{const[e,r]=(0,t.useState)([]),[n,i]=(0,t.useState)(""),[X,Z]=(0,t.useState)("all"),[_,ee]=(0,t.useState)("all"),[re,ne]=(0,t.useState)(null),[te,ie]=(0,t.useState)(!1),[oe,se]=(0,t.useState)(!1),[ae,de]=(0,t.useState)(""),[le,pe]=(0,t.useState)(""),ce=localStorage.getItem("userId")||"2";(0,t.useEffect)(()=>{xe();const e=setInterval(xe,1e4);return()=>clearInterval(e)},[]);const xe=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ce}&userRole=Manager`);if(e.ok){const n=await e.json();r(n)}}catch(e){console.error("Error fetching operation tickets:",e)}},he=e.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.requesterName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),t="all"===X||e.status===X,i="all"===_||e.priority===_;return r&&t&&i}),ue=e.length,ge=e.filter(e=>"open"===e.status).length,be=e.filter(e=>"in-progress"===e.status).length,ye=e.filter(e=>"resolved"===e.status).length,me=e=>new Date(e).toLocaleString("en-MY"),fe=e=>{const r=Math.floor(e/60),n=e%60;return r>0?`${r}h ${n}m`:`${n}m`},je=async(e,r)=>{try{(await fetch(`/api/operation-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:r})})).ok&&await xe()}catch(n){console.error("Error updating status:",n)}};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:[(0,o.jsx)(l,{children:"Operation Inquiry"}),(0,o.jsx)(p,{variant:"secondary",onClick:xe,children:"Refresh"})]}),(0,o.jsxs)(d,{children:[(0,o.jsxs)(c,{children:[(0,o.jsxs)(x,{color:"#059669",children:[(0,o.jsx)(h,{children:ue}),(0,o.jsx)(u,{children:"Total Inquiries"})]}),(0,o.jsxs)(x,{color:"#D97706",children:[(0,o.jsx)(h,{children:ge}),(0,o.jsx)(u,{children:"Open"})]}),(0,o.jsxs)(x,{color:"#2563EB",children:[(0,o.jsx)(h,{children:be}),(0,o.jsx)(u,{children:"In Progress"})]}),(0,o.jsxs)(x,{color:"#7C3AED",children:[(0,o.jsx)(h,{children:ye}),(0,o.jsx)(u,{children:"Resolved"})]})]}),(0,o.jsxs)(g,{children:[(0,o.jsx)(b,{placeholder:"Search inquiries...",value:n,onChange:e=>i(e.target.value)}),(0,o.jsxs)(y,{value:X,onChange:e=>Z(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"open",children:"Open"}),(0,o.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,o.jsx)("option",{value:"resolved",children:"Resolved"}),(0,o.jsx)("option",{value:"closed",children:"Closed"})]}),(0,o.jsxs)(y,{value:_,onChange:e=>ee(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Priority"}),(0,o.jsx)("option",{value:"urgent",children:"Urgent"}),(0,o.jsx)("option",{value:"high",children:"High"}),(0,o.jsx)("option",{value:"medium",children:"Medium"}),(0,o.jsx)("option",{value:"low",children:"Low"})]})]}),(0,o.jsx)(m,{children:he.map(e=>(0,o.jsxs)(f,{children:[(0,o.jsxs)(j,{children:[(0,o.jsxs)(v,{children:[(0,o.jsx)(F,{children:e.ticketNumber}),(0,o.jsx)(A,{children:e.subject}),(0,o.jsxs)(w,{children:[e.requesterName," (",e.requesterRole,") \u2022 ",e.restaurantName]})]}),(0,o.jsxs)(N,{children:[(0,o.jsx)(k,{status:e.status,children:e.status}),(0,o.jsx)(E,{priority:e.priority,children:e.priority})]})]}),(0,o.jsx)(C,{children:e.description}),e.response&&(0,o.jsxs)(D,{children:[(0,o.jsxs)(I,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${me(e.resolvedAt)}`]}),(0,o.jsx)(T,{children:e.response})]}),e.internalNotes&&(0,o.jsxs)(L,{children:[(0,o.jsx)(P,{children:"Internal Notes (Not visible to requester)"}),(0,o.jsx)(O,{children:e.internalNotes})]}),(0,o.jsxs)(S,{children:[(0,o.jsxs)(R,{children:[(0,o.jsx)($,{children:"Created"}),(0,o.jsx)(q,{children:me(e.createdAt)})]}),e.responseTime>0&&(0,o.jsxs)(R,{children:[(0,o.jsx)($,{children:"Response Time"}),(0,o.jsx)(q,{children:fe(e.responseTime)})]})]}),(0,o.jsxs)(B,{children:["open"===e.status&&(0,o.jsx)(z,{variant:"primary",onClick:()=>je(e,"in-progress"),children:"Start Working"}),"closed"!==e.status&&"resolved"!==e.status&&(0,o.jsx)(z,{variant:"primary",onClick:()=>(e=>{ne(e),ie(!0)})(e),children:"Reply"}),(0,o.jsx)(z,{onClick:()=>(e=>{ne(e),pe(e.internalNotes||""),se(!0)})(e),children:e.internalNotes?"Edit Note":"Add Note"}),"resolved"===e.status&&(0,o.jsx)(z,{onClick:()=>je(e,"closed"),children:"Close Inquiry"})]})]},e.id))}),te&&re&&(0,o.jsx)(M,{onClick:()=>ie(!1),children:(0,o.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(U,{children:[(0,o.jsxs)(Y,{children:["Reply to ",re.ticketNumber]}),(0,o.jsx)(J,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)("div",{style:{marginBottom:"20px"},children:(0,o.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,o.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:re.subject}),(0,o.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",re.requesterName," (",re.requesterRole,")"]}),(0,o.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:re.description})]})}),(0,o.jsxs)(K,{children:[(0,o.jsx)(Q,{children:"Your Reply"}),(0,o.jsx)(V,{value:ae,onChange:e=>de(e.target.value),placeholder:"Type your reply to the staff member...",style:{minHeight:"120px"}})]})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,o.jsx)(p,{variant:"primary",onClick:async()=>{if(re&&ae.trim())try{(await fetch(`/api/operation-tickets/${re.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({response:ae,status:"resolved"})})).ok&&(await xe(),de(""),ie(!1))}catch(e){console.error("Error sending reply:",e)}},disabled:!ae.trim(),children:"Send Reply"})]})]})}),oe&&re&&(0,o.jsx)(M,{onClick:()=>se(!1),children:(0,o.jsxs)(H,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(U,{children:[(0,o.jsxs)(Y,{children:["Internal Note for ",re.ticketNumber]}),(0,o.jsx)(J,{onClick:()=>se(!1),children:"\xd7"})]}),(0,o.jsxs)(W,{children:[(0,o.jsx)("div",{style:{marginBottom:"20px"},children:(0,o.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,o.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:re.subject}),(0,o.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",re.requesterName," (",re.requesterRole,")"]})]})}),(0,o.jsxs)(K,{children:[(0,o.jsx)(Q,{children:"Internal Note (Not visible to requester)"}),(0,o.jsx)(V,{value:le,onChange:e=>pe(e.target.value),placeholder:"Add internal notes about this inquiry...",style:{minHeight:"120px"}})]})]}),(0,o.jsxs)(G,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,o.jsx)(p,{variant:"primary",onClick:async()=>{if(re)try{(await fetch(`/api/operation-tickets/${re.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({internalNotes:le})})).ok&&(await xe(),pe(""),se(!1))}catch(e){console.error("Error saving note:",e)}},children:"Save Note"})]})]})})]})]})})}}}]);