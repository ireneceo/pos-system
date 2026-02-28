"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4302:(e,r,t)=>{t.d(r,{A:()=>A});var n=t(9950),i=t(4752),o=t(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=i.Ay.div`
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
`,c=i.Ay.div`
  flex: 1;
  min-width: 0;
`,x=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,m=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,y=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,b=i.Ay.textarea`
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
`,j=i.Ay.button`
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
`,v=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,A=e=>{let{entityType:r,entityId:t,currentUserId:i}=e;const[A,w]=(0,n.useState)([]),[F,E]=(0,n.useState)(""),[k,C]=(0,n.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&w(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&B()},[r,t]);const z=async()=>{if(F.trim()&&!k){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:F.trim()})})).ok&&(E(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},S=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,o.jsx)(d,{children:A.map(e=>{var r,t,n;return(0,o.jsxs)(l,{children:[(0,o.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(c,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,o.jsx)(g,{children:S(e.createdAt)}),i&&e.author_id===i&&(0,o.jsx)(m,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,o.jsx)(f,{children:e.content})]})]},e.id)})}):(0,o.jsx)(v,{children:"No comments yet"}),(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{value:F,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(j,{onClick:z,disabled:!F.trim()||k,children:"Send"})]})]})}},9889:(e,r,t)=>{t.r(r),t.d(r,{default:()=>G});var n=t(9950),i=t(4752),o=t(1367),s=t(4302),a=t(4414);const d=i.Ay.div`
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
`,x=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
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
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,m=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
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
`,b=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;

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
`,w=i.Ay.div`
  flex: 1;
`,F=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,k=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=i.Ay.span`
  color: #374151;
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
`,L=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,_=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,q=i.Ay.button`
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
`,P=i.Ay.div`
  padding: 24px;
`,R=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,O=i.Ay.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,M=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,U=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,J=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  margin-bottom: 20px;
  white-space: pre-wrap;
  word-break: break-word;
`,Y=i.Ay.div`
  margin-bottom: 20px;
`,K=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,G=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,G]=(0,n.useState)(""),[Q,V]=(0,n.useState)("all"),[W,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)(null),[re,te]=(0,n.useState)(""),ne=null===e||void 0===e?void 0:e.id,ie=(null===e||void 0===e?void 0:e.role)||"Brand Manager";(0,n.useEffect)(()=>{oe();const e=setInterval(oe,1e4);return()=>clearInterval(e)},[]);const oe=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ne}&userRole=${ie}`);if(e.ok){const r=await e.json();t(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},se=r.filter(e=>{const r=e.subject.toLowerCase().includes(i.toLowerCase())||e.requesterName.toLowerCase().includes(i.toLowerCase())||e.ticketNumber.toLowerCase().includes(i.toLowerCase()),t="all"===Q||e.status===Q,n="all"===W||e.priority===W;return r&&t&&n}),ae=r.length,de=r.filter(e=>"open"===e.status).length,le=r.filter(e=>"in-progress"===e.status).length,pe=r.filter(e=>"resolved"===e.status).length,ce=e=>new Date(e).toLocaleString("en-MY");return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsx)(x,{variant:"secondary",onClick:oe,children:"Refresh"})]}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{color:"#059669",children:[(0,a.jsx)(g,{children:ae}),(0,a.jsx)(f,{children:"Total Inquiries"})]}),(0,a.jsxs)(u,{color:"#D97706",children:[(0,a.jsx)(g,{children:de}),(0,a.jsx)(f,{children:"Open"})]}),(0,a.jsxs)(u,{color:"#2563EB",children:[(0,a.jsx)(g,{children:le}),(0,a.jsx)(f,{children:"In Progress"})]}),(0,a.jsxs)(u,{color:"#7C3AED",children:[(0,a.jsx)(g,{children:pe}),(0,a.jsx)(f,{children:"Resolved"})]})]}),(0,a.jsxs)(m,{children:[(0,a.jsx)(y,{placeholder:"Search inquiries...",value:i,onChange:e=>G(e.target.value)}),(0,a.jsxs)(b,{value:Q,onChange:e=>V(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsxs)(b,{value:W,onChange:e=>X(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsx)(j,{children:se.map(e=>(0,a.jsxs)(v,{onClick:()=>(e=>{ee(e),te(e.status)})(e),children:[(0,a.jsxs)(A,{children:[(0,a.jsxs)(w,{children:[(0,a.jsx)(F,{children:e.ticketNumber}),(0,a.jsx)(E,{children:e.subject}),(0,a.jsxs)(k,{children:[e.requesterName," (",e.requesterRole,") - ",e.restaurantName]})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(C,{status:e.status,children:e.status}),(0,a.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(z,{children:e.description}),(0,a.jsx)($,{children:(0,a.jsxs)("div",{children:[(0,a.jsx)(D,{children:"Created "}),(0,a.jsx)(I,{children:ce(e.createdAt)})]})})]},e.id))}),Z&&(0,a.jsx)(N,{onClick:()=>ee(null),children:(0,a.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(T,{children:[(0,a.jsx)(_,{children:Z.ticketNumber}),(0,a.jsx)(q,{onClick:()=>ee(null),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsxs)(R,{children:[(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"Subject"}),(0,a.jsx)(U,{children:Z.subject})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"Restaurant"}),(0,a.jsx)(U,{children:Z.restaurantName})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"From"}),(0,a.jsxs)(U,{children:[Z.requesterName," (",Z.requesterRole,")"]})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsx)(U,{children:(0,a.jsx)(B,{priority:Z.priority,children:Z.priority})})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsx)(U,{children:Z.category})]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{children:"Created"}),(0,a.jsx)(U,{children:ce(Z.createdAt)})]})]}),(0,a.jsx)(J,{children:Z.description}),(0,a.jsxs)(Y,{children:[(0,a.jsx)(K,{children:"Status"}),(0,a.jsxs)(H,{children:[(0,a.jsxs)(b,{value:re,onChange:e=>te(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(Z)try{(await fetch(`/api/operation-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:re})})).ok&&(await oe(),ee(e=>e?{...e,status:re}:null))}catch(e){console.error("Error updating status:",e)}},disabled:re===Z.status,children:"Save"})]})]}),(0,a.jsx)(s.A,{entityType:"operation_ticket",entityId:String(Z.id),currentUserId:null===e||void 0===e?void 0:e.id})]})]})})]})]})})}}}]);