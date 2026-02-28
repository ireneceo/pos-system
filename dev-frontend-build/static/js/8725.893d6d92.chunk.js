"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8725],{4302:(e,t,r)=>{r.d(t,{A:()=>w});var i=r(9950),o=r(4752),n=r(4414);const s=o.Ay.div`
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
`,y=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,m=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,f=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,j=o.Ay.textarea`
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
`,b=o.Ay.button`
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
`,w=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:w}=e;const[A,F]=(0,i.useState)([]),[k,C]=(0,i.useState)(""),[E,B]=(0,i.useState)(!1),z=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&F(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(z(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),w&&w()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const S=async()=>{if(k.trim()&&!E){B(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:k.trim()})})).ok&&(C(""),z())}catch(e){console.error("Error adding comment:",e)}finally{B(!1)}}},_=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const o=Math.floor(i/60);if(o<24)return`${o}h ago`;const n=Math.floor(o/24);return n<7?`${n}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,n.jsxs)(s,{children:[(0,n.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,n.jsx)(d,{children:A.map(e=>{var t,r,i;return(0,n.jsxs)(l,{children:[(0,n.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,n.jsxs)(p,{children:[(0,n.jsxs)(x,{children:[(0,n.jsx)(h,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,n.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,n.jsx)(g,{children:_(e.createdAt)}),o&&e.author_id===o&&(0,n.jsx)(m,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&z()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),(0,n.jsx)(y,{children:e.content})]})]},e.id)})}):(0,n.jsx)(v,{children:"No comments yet"}),(0,n.jsxs)(f,{children:[(0,n.jsx)(j,{value:k,onChange:e=>C(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,n.jsx)(b,{onClick:S,disabled:!k.trim()||E,children:"Send"})]})]})}},8725:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Y});var i=r(9950),o=r(4752),n=r(1367),s=r(4302),a=r(4414);const d=o.Ay.div`
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
`,y=o.Ay.div`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`,m=o.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  font-weight: 500;
`,f=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,j=o.Ay.button`
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
`,b=o.Ay.div`
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
  overflow: hidden;

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
`,C=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,E=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,B=o.Ay.span`
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
`,S=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,_=o.Ay.div`
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
`,I=o.Ay.div`
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
`,$=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,T=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,N=o.Ay.button`
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
`,P=o.Ay.div`
  padding: 24px;
`,q=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,O=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,J=o.Ay.select`
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
`,L=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Y=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,i.useState)([]),[o,Y]=(0,i.useState)("all"),[H,W]=(0,i.useState)(!1),[K,G]=(0,i.useState)(!1),[Q,V]=(0,i.useState)(null),[X,Z]=(0,i.useState)("open"),[ee,te]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[re,ie]=(0,i.useState)({}),oe=(null===e||void 0===e?void 0:e.id)||"2",ne=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Brand User",se=(null===e||void 0===e?void 0:e.email)||"brand@example.com",ae=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,i.useEffect)(()=>{if(e){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[e]);const de=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/support-tickets?customerId=${oe}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),i=e.success?e.data:Array.isArray(e)?e:[];r(i),le(i)}}catch(e){console.error("Error fetching support tickets:",e)}},le=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ie(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},ce=t.filter(e=>"all"===o||e.status===o),pe=t.length,xe=t.filter(e=>"open"===e.status).length,he=t.filter(e=>"in-progress"===e.status).length,ue=t.filter(e=>"resolved"===e.status).length,ge=t.filter(e=>"closed"===e.status).length,ye=e=>new Date(e).toLocaleString("en-MY");return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(p,{children:"System Inquiry"}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:de,children:"Refresh"}),(0,a.jsx)(h,{variant:"primary",onClick:()=>{W(!0)},children:"New Inquiry"})]})]}),(0,a.jsxs)(c,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{borderColor:"#635BFF",children:[(0,a.jsx)(y,{children:pe}),(0,a.jsx)(m,{children:"Total Tickets"})]}),(0,a.jsxs)(g,{borderColor:"#F59E0B",children:[(0,a.jsx)(y,{children:xe}),(0,a.jsx)(m,{children:"Open Tickets"})]}),(0,a.jsxs)(g,{borderColor:"#3B82F6",children:[(0,a.jsx)(y,{children:he}),(0,a.jsx)(m,{children:"In Progress"})]}),(0,a.jsxs)(g,{borderColor:"#10B981",children:[(0,a.jsx)(y,{children:ue}),(0,a.jsx)(m,{children:"Resolved"})]})]}),(0,a.jsxs)(f,{children:[(0,a.jsxs)(j,{active:"all"===o,onClick:()=>Y("all"),children:["All (",pe,")"]}),(0,a.jsxs)(j,{active:"open"===o,onClick:()=>Y("open"),children:["Open (",xe,")"]}),(0,a.jsxs)(j,{active:"in-progress"===o,onClick:()=>Y("in-progress"),children:["In Progress (",he,")"]}),(0,a.jsxs)(j,{active:"resolved"===o,onClick:()=>Y("resolved"),children:["Resolved (",ue,")"]}),(0,a.jsxs)(j,{active:"closed"===o,onClick:()=>Y("closed"),children:["Closed (",ge,")"]})]}),(0,a.jsxs)(b,{children:[ce.map(e=>(0,a.jsxs)(v,{style:{cursor:"pointer"},onClick:()=>(e=>{V(e),Z(e.status),G(!0)})(e),children:[(0,a.jsxs)(w,{children:[(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{children:e.ticketNumber}),(0,a.jsx)(k,{children:e.subject}),(0,a.jsx)(C,{children:(0,a.jsxs)("span",{children:["Category: ",e.category]})})]}),(0,a.jsxs)(E,{children:[(0,a.jsx)(B,{status:e.status,children:e.status}),(0,a.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(S,{children:e.description}),(0,a.jsxs)(_,{children:[(0,a.jsxs)("span",{children:["Created: ",ye(e.createdAt)]}),re[e.id]&&(0,a.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",re[e.id].total_comments,re[e.id].unread_count>0&&(0,a.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[re[e.id].unread_count," new"]})]})]})]},e.id)),0===ce.length&&(0,a.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,a.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No tickets yet"}),(0,a.jsx)("p",{children:'Click "New Inquiry" to submit your first support ticket to system administrator.'})]})]}),H&&(0,a.jsx)(I,{onClick:()=>W(!1),children:(0,a.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(T,{children:[(0,a.jsx)(D,{children:"Create System Inquiry"}),(0,a.jsx)(N,{onClick:()=>W(!1),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsxs)(R,{children:[(0,a.jsx)(M,{children:"Subject *"}),(0,a.jsx)(U,{type:"text",value:ee.subject,onChange:e=>te({...ee,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,a.jsxs)(R,{children:[(0,a.jsx)(M,{children:"Description *"}),(0,a.jsx)(L,{value:ee.description,onChange:e=>te({...ee,description:e.target.value}),placeholder:"Detailed description of your inquiry...",required:!0})]}),(0,a.jsxs)(O,{children:[(0,a.jsxs)(R,{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsxs)(J,{value:ee.priority,onChange:e=>te({...ee,priority:e.target.value}),children:[(0,a.jsx)("option",{value:"low",children:"Low"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,a.jsxs)(R,{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsxs)(J,{value:ee.category,onChange:e=>te({...ee,category:e.target.value}),children:[(0,a.jsx)("option",{value:"technical",children:"Technical Issue"}),(0,a.jsx)("option",{value:"account",children:"Account Management"}),(0,a.jsx)("option",{value:"billing",children:"Billing"}),(0,a.jsx)("option",{value:"feature",children:"Feature Request"}),(0,a.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,a.jsxs)(q,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(ee.subject.trim()&&ee.description.trim())try{const e={customerId:oe,customerName:ne,customerEmail:se,customerRole:ae,subject:ee.subject,description:ee.description,priority:ee.priority,category:ee.category},t=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)})).ok?(await de(),te({subject:"",description:"",priority:"medium",category:"general"}),W(!1)):alert("Failed to create ticket. Please try again.")}catch(e){console.error("Error creating ticket:",e),alert("Error creating ticket. Please try again.")}else alert("Please fill in all required fields.")},disabled:!ee.subject.trim()||!ee.description.trim(),children:"Submit Inquiry"})]})]})}),K&&Q&&(0,a.jsx)(I,{onClick:()=>G(!1),children:(0,a.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(T,{children:[(0,a.jsx)(D,{children:"Inquiry Details"}),(0,a.jsx)(N,{onClick:()=>G(!1),children:"\xd7"})]}),(0,a.jsxs)(P,{children:[(0,a.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Ticket Number"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Q.ticketNumber})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Status"}),(0,a.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,a.jsxs)(J,{value:X,onChange:e=>Z(e.target.value),style:{flex:1},children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]}),X!==Q.status&&(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(Q)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${Q.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:X})})).ok&&(r(e=>e.map(e=>e.id===Q.id?{...e,status:X}:e)),V(e=>e?{...e,status:X}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:"Save"})]})]})]}),(0,a.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Priority"}),(0,a.jsx)("div",{style:{padding:"8px 0"},children:(0,a.jsx)(z,{priority:Q.priority,children:Q.priority})})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Category"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:Q.category.replace("-"," ")})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Subject"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:Q.subject})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Description"}),(0,a.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:Q.description})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)(M,{children:"Created"}),(0,a.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye(Q.createdAt)})]})]}),(0,a.jsx)(s.A,{entityType:"support_ticket",entityId:Q.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ie(e=>{const t={...e};return t[Q.id]&&(t[Q.id]={...t[Q.id],unread_count:0}),t})})]}),(0,a.jsx)(q,{children:(0,a.jsx)(h,{variant:"secondary",onClick:()=>G(!1),children:"Close"})})]})})]})]})})}}}]);