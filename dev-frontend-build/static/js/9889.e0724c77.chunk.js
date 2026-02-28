"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4302:(e,t,r)=>{r.d(t,{A:()=>A});var n=r(9950),o=r(4752),i=r(4414);const s=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,l=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,c=o.Ay.div`
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
`,p=o.Ay.div`
  flex: 1;
  min-width: 0;
`,x=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,h=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,g=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,f=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,y=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,b=o.Ay.textarea`
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
`,j=o.Ay.button`
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
`,v=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,A=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:A}=e;const[w,F]=(0,n.useState)([]),[k,E]=(0,n.useState)(""),[C,B]=(0,n.useState)(!1),z=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(z(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),A&&A()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const S=async()=>{if(k.trim()&&!C){B(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:k.trim()})})).ok&&(E(""),z())}catch(e){console.error("Error adding comment:",e)}finally{B(!1)}}},_=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(s,{children:[(0,i.jsxs)(a,{children:["Comments (",w.length,")"]}),w.length>0?(0,i.jsx)(d,{children:w.map(e=>{var t,r,n;return(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(p,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,i.jsx)(g,{children:_(e.createdAt)}),o&&e.author_id===o&&(0,i.jsx)(f,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&z()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(v,{children:"No comments yet"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(b,{value:k,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(j,{onClick:S,disabled:!k.trim()||C,children:"Send"})]})]})}},9889:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var n=r(9950),o=r(4752),i=r(1367),s=r(4302),a=r(4414);const d=o.Ay.div`
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
`,c=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,g=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,m=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,y=o.Ay.input`
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
`,b=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=o.Ay.div`
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
`,A=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=o.Ay.div`
  flex: 1;
`,F=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,z=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,S=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=o.Ay.span`
  color: #374151;
`,D=o.Ay.div`
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
`,N=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,R=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,L=o.Ay.button`
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
`,O=o.Ay.div`
  padding: 24px;
`,P=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,q=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,M=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,U=o.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,J=o.Ay.div`
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
`,Y=o.Ay.div`
  margin-bottom: 20px;
`,K=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,W=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,n.useState)([]),[o,W]=(0,n.useState)(""),[G,Q]=(0,n.useState)("all"),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)(null),[te,re]=(0,n.useState)(""),[ne,oe]=(0,n.useState)({}),ie=null===e||void 0===e?void 0:e.id,se=(null===e||void 0===e?void 0:e.role)||"Brand Manager";(0,n.useEffect)(()=>{ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)},[]);const ae=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ie}&userRole=${se}`);if(e.ok){const t=await e.json();r(t),de(t)}}catch(e){console.error("Error fetching operation tickets:",e)}},de=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),oe(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},le=t.filter(e=>{const t=e.subject.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase()),r="all"===G||e.status===G,n="all"===V||e.priority===V;return t&&r&&n}),ce=t.length,pe=t.filter(e=>"open"===e.status).length,xe=t.filter(e=>"in-progress"===e.status).length,he=t.filter(e=>"resolved"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY");return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(p,{children:"Operation Inquiry"}),(0,a.jsx)(x,{variant:"secondary",onClick:ae,children:"Refresh"})]}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{color:"#059669",children:[(0,a.jsx)(g,{children:ce}),(0,a.jsx)(m,{children:"Total Inquiries"})]}),(0,a.jsxs)(u,{color:"#D97706",children:[(0,a.jsx)(g,{children:pe}),(0,a.jsx)(m,{children:"Open"})]}),(0,a.jsxs)(u,{color:"#2563EB",children:[(0,a.jsx)(g,{children:xe}),(0,a.jsx)(m,{children:"In Progress"})]}),(0,a.jsxs)(u,{color:"#7C3AED",children:[(0,a.jsx)(g,{children:he}),(0,a.jsx)(m,{children:"Resolved"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsx)(y,{placeholder:"Search inquiries...",value:o,onChange:e=>W(e.target.value)}),(0,a.jsxs)(b,{value:G,onChange:e=>Q(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsxs)(b,{value:V,onChange:e=>X(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]}),(0,a.jsx)(j,{children:le.map(e=>(0,a.jsxs)(v,{onClick:()=>(e=>{ee(e),re(e.status)})(e),children:[(0,a.jsxs)(A,{children:[(0,a.jsxs)(w,{children:[(0,a.jsx)(F,{children:e.ticketNumber}),(0,a.jsx)(k,{children:e.subject}),(0,a.jsxs)(E,{children:[e.requesterName," (",e.requesterRole,") - ",e.restaurantName]})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(C,{status:e.status,children:e.status}),(0,a.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(z,{children:e.description}),(0,a.jsxs)(_,{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)($,{children:"Created "}),(0,a.jsx)(I,{children:ue(e.createdAt)})]}),ne[e.id]&&(0,a.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ne[e.id].total_comments,ne[e.id].unread_count>0&&(0,a.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ne[e.id].unread_count," new"]})]})]})]},e.id))}),Z&&(0,a.jsx)(D,{onClick:()=>ee(null),children:(0,a.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(T,{children:[(0,a.jsx)(R,{children:Z.ticketNumber}),(0,a.jsx)(L,{onClick:()=>ee(null),children:"\xd7"})]}),(0,a.jsxs)(O,{children:[(0,a.jsxs)(P,{children:[(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"Subject"}),(0,a.jsx)(U,{children:Z.subject})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"Restaurant"}),(0,a.jsx)(U,{children:Z.restaurantName})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"From"}),(0,a.jsxs)(U,{children:[Z.requesterName," (",Z.requesterRole,")"]})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsx)(U,{children:(0,a.jsx)(B,{priority:Z.priority,children:Z.priority})})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsx)(U,{children:Z.category})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(M,{children:"Created"}),(0,a.jsx)(U,{children:ue(Z.createdAt)})]})]}),(0,a.jsx)(J,{children:Z.description}),(0,a.jsxs)(Y,{children:[(0,a.jsx)(K,{children:"Status"}),(0,a.jsxs)(H,{children:[(0,a.jsxs)(b,{value:te,onChange:e=>re(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),(0,a.jsx)(x,{variant:"primary",onClick:async()=>{if(Z)try{(await fetch(`/api/operation-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:te})})).ok&&(await ae(),ee(e=>e?{...e,status:te}:null))}catch(e){console.error("Error updating status:",e)}},disabled:te===Z.status,children:"Save"})]})]}),(0,a.jsx)(s.A,{entityType:"operation_ticket",entityId:String(Z.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>oe(e=>{const t={...e},r=String(Z.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})]})})}}}]);