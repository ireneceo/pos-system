"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{4302:(e,r,t)=>{t.d(r,{A:()=>v});var o=t(9950),n=t(4752),i=t(4414);const a=n.Ay.div`
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
`,w=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,v=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:v}=e;const[A,F]=(0,o.useState)([]),[k,E]=(0,o.useState)(""),[C,B]=(0,o.useState)(!1),z=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,o.useEffect)(()=>{t&&(z(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),v&&v()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const S=async()=>{if(k.trim()&&!C){B(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:k.trim()})})).ok&&(E(""),z())}catch(e){console.error("Error adding comment:",e)}finally{B(!1)}}},_=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(a,{children:[(0,i.jsxs)(s,{children:["Comments (",A.length,")"]}),A.length>0?(0,i.jsx)(d,{children:A.map(e=>{var r,t,o;return(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(p,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(o=e.author)||void 0===o?void 0:o.role)||e.author_role}),(0,i.jsx)(g,{children:_(e.createdAt)}),n&&e.author_id===n&&(0,i.jsx)(f,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&z()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(w,{children:"No comments yet"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(b,{value:k,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(j,{onClick:S,disabled:!k.trim()||C,children:"Send"})]})]})}},7771:(e,r,t)=>{t.r(r),t.d(r,{default:()=>W});var o=t(9950),n=t(4752),i=t(1367),a=t(4302),s=t(4414);const d=n.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
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
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
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
`,b=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=n.Ay.input`
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
`,v=n.Ay.select`
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
  cursor: pointer;
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
  min-width: 0;
`,C=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,B=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,z=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,S=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,_=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,$=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,I=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,D=n.Ay.div`
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
`,N=n.Ay.div`
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
`,T=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,L=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,R=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=n.Ay.button`
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
`,P=n.Ay.div`
  padding: 24px;
`,q=(n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,n.Ay.div`
  margin-bottom: 20px;
`),M=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,Y=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,K=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,G=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,H=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`,W=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,o.useState)([]),[n,W]=(0,o.useState)(""),[Q,V]=(0,o.useState)("all"),[X,Z]=(0,o.useState)("all"),[ee,re]=(0,o.useState)(null),[te,oe]=(0,o.useState)("open"),[ne,ie]=(0,o.useState)({}),ae=(null===e||void 0===e?void 0:e.id)||"2",se=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,o.useEffect)(()=>{if(e){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[e]);const de=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ae}&userRole=${se}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),le(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},le=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ie(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ce=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.requesterName.toLowerCase().includes(n.toLowerCase())||e.restaurantName.toLowerCase().includes(n.toLowerCase()),t="all"===Q||e.status===Q,o="all"===X||e.priority===X;return r&&t&&o}),pe=r.length,xe=r.filter(e=>"open"===e.status).length,he=r.filter(e=>"in-progress"===e.status).length,ue=r.filter(e=>"resolved"===e.status).length,ge=e=>new Date(e).toLocaleString("en-MY"),me=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(p,{children:"Operation Inquiry"}),(0,s.jsx)(x,{children:(0,s.jsx)(h,{variant:"secondary",onClick:de,children:"Refresh"})})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{borderColor:"#635BFF",children:[(0,s.jsx)(m,{children:pe}),(0,s.jsx)(f,{children:"Total Inquiries"})]}),(0,s.jsxs)(g,{borderColor:"#F59E0B",children:[(0,s.jsx)(m,{children:xe}),(0,s.jsx)(f,{children:"Open"})]}),(0,s.jsxs)(g,{borderColor:"#3B82F6",children:[(0,s.jsx)(m,{children:he}),(0,s.jsx)(f,{children:"In Progress"})]}),(0,s.jsxs)(g,{borderColor:"#10B981",children:[(0,s.jsx)(m,{children:ue}),(0,s.jsx)(f,{children:"Resolved"})]})]}),(0,s.jsxs)(y,{children:[(0,s.jsxs)(b,{children:[(0,s.jsx)(j,{children:"Search"}),(0,s.jsx)(w,{placeholder:"Search inquiries...",value:n,onChange:e=>W(e.target.value)})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(j,{children:"Status"}),(0,s.jsxs)(v,{value:Q,onChange:e=>V(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(j,{children:"Priority"}),(0,s.jsxs)(v,{value:X,onChange:e=>Z(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Priority"}),(0,s.jsx)("option",{value:"urgent",children:"Urgent"}),(0,s.jsx)("option",{value:"high",children:"High"}),(0,s.jsx)("option",{value:"medium",children:"Medium"}),(0,s.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,s.jsxs)(A,{children:[ce.map(e=>(0,s.jsxs)(F,{onClick:()=>(e=>{re(e),oe(e.status)})(e),children:[(0,s.jsxs)(k,{children:[(0,s.jsxs)(E,{children:[(0,s.jsx)(C,{children:e.ticketNumber}),(0,s.jsx)(B,{children:e.subject}),(0,s.jsxs)(z,{children:[(0,s.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,s.jsxs)("span",{children:["From: ",e.requesterName]}),(0,s.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(_,{status:e.status,children:e.status}),(0,s.jsx)($,{priority:e.priority,children:e.priority})]})]}),(0,s.jsx)(I,{children:e.description}),(0,s.jsxs)(D,{children:[(0,s.jsxs)("span",{children:["Created: ",ge(e.createdAt)]}),e.responseTime>0&&(0,s.jsxs)("span",{children:["Response Time: ",me(e.responseTime)]}),ne[e.id]&&(0,s.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ne[e.id].total_comments,ne[e.id].unread_count>0&&(0,s.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ne[e.id].unread_count," new"]})]})]})]},e.id)),0===ce.length&&(0,s.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,s.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,s.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),ee&&(0,s.jsx)(N,{onClick:()=>re(null),children:(0,s.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(L,{children:[(0,s.jsx)(R,{children:ee.ticketNumber}),(0,s.jsx)(O,{onClick:()=>re(null),children:"\xd7"})]}),(0,s.jsxs)(P,{children:[(0,s.jsxs)(J,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"Subject:"}),(0,s.jsx)(G,{children:ee.subject})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"Restaurant:"}),(0,s.jsx)(G,{children:ee.restaurantName})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"From:"}),(0,s.jsx)(G,{children:ee.requesterName})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"Priority:"}),(0,s.jsx)(G,{children:(0,s.jsx)($,{priority:ee.priority,children:ee.priority})})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"Category:"}),(0,s.jsx)(G,{children:ee.category})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(K,{children:"Created:"}),(0,s.jsx)(G,{children:ge(ee.createdAt)})]})]}),(0,s.jsx)(M,{children:"Description"}),(0,s.jsx)(H,{children:ee.description}),(0,s.jsxs)(q,{children:[(0,s.jsx)(M,{children:"Status"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,s.jsxs)(U,{value:te,onChange:e=>oe(e.target.value),style:{flex:1},children:[(0,s.jsx)("option",{value:"open",children:"Open"}),(0,s.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,s.jsx)("option",{value:"resolved",children:"Resolved"}),(0,s.jsx)("option",{value:"closed",children:"Closed"})]}),te!==ee.status&&(0,s.jsx)(h,{variant:"primary",onClick:async()=>{if(ee&&te!==ee.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ee.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:te,..."resolved"===te&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),o=e.data||e;t(e=>e.map(e=>e.id===ee.id?{...e,...o}:e)),re(e=>e?{...e,...o}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,s.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ee.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ie(e=>{const r={...e},t=String(ee.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);