"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4302:(e,r,t)=>{t.d(r,{A:()=>A});var o=t(9950),n=t(4752),i=t(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=n.Ay.h4`
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
`,p=n.Ay.div`
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
`,c=n.Ay.div`
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
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,f=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,b=n.Ay.textarea`
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
`,j=n.Ay.button`
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
`,v=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,A=e=>{let{entityType:r,entityId:t,currentUserId:n}=e;const[A,F]=(0,o.useState)([]),[w,k]=(0,o.useState)(""),[E,C]=(0,o.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,o.useEffect)(()=>{t&&B()},[r,t]);const z=async()=>{if(w.trim()&&!E){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:w.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},S=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(s,{children:[(0,i.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,i.jsx)(d,{children:A.map(e=>{var r,t,o;return(0,i.jsxs)(l,{children:[(0,i.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(c,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(o=e.author)||void 0===o?void 0:o.role)||e.author_role}),(0,i.jsx)(g,{children:S(e.createdAt)}),n&&e.author_id===n&&(0,i.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(v,{children:"No comments yet"}),(0,i.jsxs)(f,{children:[(0,i.jsx)(b,{value:w,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(j,{onClick:z,disabled:!w.trim()||E,children:"Send"})]})]})}},9889:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Z});var o=t(9950),n=t(4752),i=t(1367),s=t(4302),a=t(4414);const d=n.Ay.div`
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
`,p=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,h=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,m=n.Ay.div`
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
`,f=n.Ay.input`
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
`,b=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=n.Ay.div`
  display: grid;
  gap: 20px;
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,S=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,N=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,$=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,D=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,I=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,R=n.Ay.span`
  color: #374151;
`,q=n.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,L=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 6px;
`,_=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,P=n.Ay.div`
  margin-top: 16px;
  padding: 12px;
  background: #FEF3C7;
  border-radius: 8px;
  border: 1px solid #FCD34D;
`,M=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 6px;
`,O=n.Ay.div`
  font-size: 14px;
  color: #78350F;
  line-height: 1.5;
`,U=n.Ay.div`
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
`,J=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,H=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=n.Ay.h2`
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
`,K=n.Ay.div`
  padding: 24px;
`,G=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,Q=n.Ay.div`
  margin-bottom: 20px;
`,V=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,X=n.Ay.textarea`
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
`,Z=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,o.useState)([]),[n,Z]=(0,o.useState)(""),[ee,re]=(0,o.useState)("all"),[te,oe]=(0,o.useState)("all"),[ne,ie]=(0,o.useState)(null),[se,ae]=(0,o.useState)(!1),[de,le]=(0,o.useState)(!1),[pe,ce]=(0,o.useState)(""),[xe,he]=(0,o.useState)(""),ue=localStorage.getItem("userId")||"2";(0,o.useEffect)(()=>{ge();const e=setInterval(ge,1e4);return()=>clearInterval(e)},[]);const ge=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ue}&userRole=Manager`);if(e.ok){const r=await e.json();t(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},me=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.requesterName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),t="all"===ee||e.status===ee,o="all"===te||e.priority===te;return r&&t&&o}),ye=r.length,fe=r.filter(e=>"open"===e.status).length,be=r.filter(e=>"in-progress"===e.status).length,je=r.filter(e=>"resolved"===e.status).length,ve=e=>new Date(e).toLocaleString("en-MY"),Ae=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`},Fe=async(e,r)=>{try{(await fetch(`/api/operation-tickets/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:r})})).ok&&await ge()}catch(t){console.error("Error updating status:",t)}};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsx)(x,{variant:"secondary",onClick:ge,children:"Refresh"})]}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{color:"#059669",children:[(0,a.jsx)(g,{children:ye}),(0,a.jsx)(m,{children:"Total Inquiries"})]}),(0,a.jsxs)(u,{color:"#D97706",children:[(0,a.jsx)(g,{children:fe}),(0,a.jsx)(m,{children:"Open"})]}),(0,a.jsxs)(u,{color:"#2563EB",children:[(0,a.jsx)(g,{children:be}),(0,a.jsx)(m,{children:"In Progress"})]}),(0,a.jsxs)(u,{color:"#7C3AED",children:[(0,a.jsx)(g,{children:je}),(0,a.jsx)(m,{children:"Resolved"})]})]}),(0,a.jsxs)(y,{children:[(0,a.jsx)(f,{placeholder:"Search inquiries...",value:n,onChange:e=>Z(e.target.value)}),(0,a.jsxs)(b,{value:ee,onChange:e=>re(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsxs)(b,{value:te,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsx)(j,{children:me.map(e=>(0,a.jsxs)(v,{children:[(0,a.jsxs)(A,{children:[(0,a.jsxs)(F,{children:[(0,a.jsx)(w,{children:e.ticketNumber}),(0,a.jsx)(k,{children:e.subject}),(0,a.jsxs)(E,{children:[e.requesterName," (",e.requesterRole,") \u2022 ",e.restaurantName]})]}),(0,a.jsxs)($,{children:[(0,a.jsx)(C,{status:e.status,children:e.status}),(0,a.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(z,{children:e.description}),e.response&&(0,a.jsxs)(q,{children:[(0,a.jsxs)(L,{children:["Manager Response ",e.resolvedAt&&`\u2022 ${ve(e.resolvedAt)}`]}),(0,a.jsx)(_,{children:e.response})]}),e.internalNotes&&(0,a.jsxs)(P,{children:[(0,a.jsx)(M,{children:"Internal Notes (Not visible to requester)"}),(0,a.jsx)(O,{children:e.internalNotes})]}),(0,a.jsxs)(D,{children:[(0,a.jsxs)(I,{children:[(0,a.jsx)(T,{children:"Created"}),(0,a.jsx)(R,{children:ve(e.createdAt)})]}),e.responseTime>0&&(0,a.jsxs)(I,{children:[(0,a.jsx)(T,{children:"Response Time"}),(0,a.jsx)(R,{children:Ae(e.responseTime)})]})]}),(0,a.jsxs)(S,{children:["open"===e.status&&(0,a.jsx)(N,{variant:"primary",onClick:()=>Fe(e,"in-progress"),children:"Start Working"}),"closed"!==e.status&&"resolved"!==e.status&&(0,a.jsx)(N,{variant:"primary",onClick:()=>(e=>{ie(e),ae(!0)})(e),children:"Reply"}),(0,a.jsx)(N,{onClick:()=>(e=>{ie(e),he(e.internalNotes||""),le(!0)})(e),children:e.internalNotes?"Edit Note":"Add Note"}),"resolved"===e.status&&(0,a.jsx)(N,{onClick:()=>Fe(e,"closed"),children:"Close Inquiry"})]})]},e.id))}),se&&ne&&(0,a.jsx)(U,{onClick:()=>ae(!1),children:(0,a.jsxs)(J,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(H,{children:[(0,a.jsxs)(Y,{children:["Reply to ",ne.ticketNumber]}),(0,a.jsx)(W,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ne.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",ne.requesterName," (",ne.requesterRole,")"]}),(0,a.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:ne.description})]})}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Your Reply"}),(0,a.jsx)(X,{value:pe,onChange:e=>ce(e.target.value),placeholder:"Type your reply to the staff member...",style:{minHeight:"120px"}})]}),(0,a.jsx)(s.A,{entityType:"operation_ticket",entityId:String(ne.id),currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,a.jsxs)(G,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(ne&&pe.trim())try{(await fetch(`/api/operation-tickets/${ne.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({response:pe,status:"resolved"})})).ok&&(await ge(),ce(""),ae(!1))}catch(e){console.error("Error sending reply:",e)}},disabled:!pe.trim(),children:"Send Reply"})]})]})}),de&&ne&&(0,a.jsx)(U,{onClick:()=>le(!1),children:(0,a.jsxs)(J,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(H,{children:[(0,a.jsxs)(Y,{children:["Internal Note for ",ne.ticketNumber]}),(0,a.jsx)(W,{onClick:()=>le(!1),children:"\xd7"})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)("div",{style:{marginBottom:"20px"},children:(0,a.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ne.subject}),(0,a.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",ne.requesterName," (",ne.requesterRole,")"]})]})}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(V,{children:"Internal Note (Not visible to requester)"}),(0,a.jsx)(X,{value:xe,onChange:e=>he(e.target.value),placeholder:"Add internal notes about this inquiry...",style:{minHeight:"120px"}})]})]}),(0,a.jsxs)(G,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(ne)try{(await fetch(`/api/operation-tickets/${ne.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({internalNotes:xe})})).ok&&(await ge(),he(""),le(!1))}catch(e){console.error("Error saving note:",e)}},children:"Save Note"})]})]})})]})]})})}}}]);