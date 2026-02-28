"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),o=r(4414);const n=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,s=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,a=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:t,className:r,style:i,...s}=e;return(0,o.jsx)(n,{className:r,style:i,...s,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,o.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,o.jsx)(a,{...r,children:t})}},4302:(e,t,r)=>{r.d(t,{A:()=>w});var i=r(9950),o=r(4752),n=r(4414);const s=o.Ay.div`
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
`,y=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,f=o.Ay.textarea`
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
`,w=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:w}=e;const[A,k]=(0,i.useState)([]),[C,F]=(0,i.useState)(""),[E,B]=(0,i.useState)(!1),S=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&k(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(S(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),w&&w()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const z=async()=>{if(C.trim()&&!E){B(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:C.trim()})})).ok&&(F(""),S())}catch(e){console.error("Error adding comment:",e)}finally{B(!1)}}},I=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const o=Math.floor(i/60);if(o<24)return`${o}h ago`;const n=Math.floor(o/24);return n<7?`${n}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,n.jsxs)(s,{children:[(0,n.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,n.jsx)(d,{children:A.map(e=>{var t,r,i;return(0,n.jsxs)(l,{children:[(0,n.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,n.jsxs)(p,{children:[(0,n.jsxs)(x,{children:[(0,n.jsx)(h,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,n.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,n.jsx)(g,{children:I(e.createdAt)}),o&&e.author_id===o&&(0,n.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&S()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),(0,n.jsx)(m,{children:e.content})]})]},e.id)})}):(0,n.jsx)(v,{children:"No comments yet"}),(0,n.jsxs)(j,{children:[(0,n.jsx)(f,{value:C,onChange:e=>F(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,n.jsx)(b,{onClick:z,disabled:!C.trim()||E,children:"Send"})]})]})}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var i=r(9950),o=r(4752),n=r(2488),s=r(4302),a=r(1367),d=r(3832),l=r(5665),c=r(4414);const p=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,x=o.Ay.button`
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
`,h=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    gap: 12px;
  }
`,u=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,g=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,m=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,j=o.Ay.div`
  flex: 1;
`,f=o.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,b=o.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,v=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,w=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,A=o.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,k=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,C=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,E=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,B=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,S=o.Ay.span`
  color: #374151;
`,z=o.Ay.div`
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
`,I=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,_=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,T=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=o.Ay.button`
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
`,D=o.Ay.div`
  padding: 24px;
`,N=o.Ay.div`
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
`,O=o.Ay.div`
  margin-bottom: 20px;
`,R=o.Ay.label`
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
`,P=o.Ay.select`
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
`,q=o.Ay.textarea`
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
`,M=(0,o.Ay)(U)`
  width: 100%;
`,J=o.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,W=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,G=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,H=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Y=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
  color: #059669;

  strong {
    margin-left: 4px;
    color: #047857;
  }
`,K=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,i.useState)([]),[o,K]=(0,i.useState)("open"),[Q,V]=(0,i.useState)(""),[X,Z]=(0,i.useState)("all"),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[oe,ne]=(0,i.useState)(!1),[se,ae]=(0,i.useState)(!1),[de,le]=(0,i.useState)(null),[ce,pe]=(0,i.useState)(""),[xe,he]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[ue,ge]=(0,i.useState)({}),[me,ye]=(0,i.useState)([]),[je,fe]=(0,i.useState)(""),[be,ve]=(0,i.useState)([]),[we,Ae]=(0,i.useState)(!1),[ke,Ce]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ge(t)}}}catch(t){console.error("Error fetching unread counts:",t)}})(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;ye(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Fe=t.filter(e=>{const t=e.subject.toLowerCase().includes(Q.toLowerCase())||e.customerName.toLowerCase().includes(Q.toLowerCase())||e.ticketNumber.toLowerCase().includes(Q.toLowerCase()),r="all"===o||e.status===o,i="all"===X||e.status===X,n="all"===ee||e.priority===ee,s="all"===re||e.category===re;return t&&r&&i&&n&&s}),Ee=t.length,Be=t.filter(e=>"open"===e.status).length,Se=t.filter(e=>"in-progress"===e.status).length,ze=t.filter(e=>"closed"===e.status).length,Ie=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(d.mc,{children:[(0,c.jsxs)(d.Y9,{children:[(0,c.jsx)(d.hE,{children:"System Inquiry"}),(0,c.jsxs)(d.ex,{children:[(0,c.jsx)(d.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t.data||t)}}catch(e){}},children:"Refresh"}),(0,c.jsx)(d.$n,{variant:"secondary",onClick:()=>{const e=Fe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export"}),(0,c.jsx)(d.$n,{variant:"primary",onClick:()=>{ne(!0)},children:"Create Inquiry"})]})]}),(0,c.jsxs)(d.UC,{children:[(0,c.jsxs)(l.MD,{children:[(0,c.jsxs)(l.hI,{color:"#059669",children:[(0,c.jsx)(l.Os,{children:Ee}),(0,c.jsx)(l.v0,{children:"Total Tickets"}),(0,c.jsx)(l.d1,{children:"All support requests"})]}),(0,c.jsxs)(l.hI,{color:"#D97706",children:[(0,c.jsx)(l.Os,{children:Be}),(0,c.jsx)(l.v0,{children:"Open Tickets"}),(0,c.jsx)(l.d1,{children:"Awaiting response"})]}),(0,c.jsxs)(l.hI,{color:"#2563EB",children:[(0,c.jsx)(l.Os,{children:Se}),(0,c.jsx)(l.v0,{children:"In Progress"}),(0,c.jsx)(l.d1,{children:"Currently being handled"})]}),(0,c.jsxs)(l.hI,{color:"#7C3AED",children:[(0,c.jsx)(l.Os,{children:ze}),(0,c.jsx)(l.v0,{children:"Closed"}),(0,c.jsxs)(l.d1,{children:[Ee>0?Math.round(ze/Ee*100):0,"% completion rate"]})]})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{active:"open"===o,onClick:()=>K("open"),children:"Open"}),(0,c.jsx)(x,{active:"in-progress"===o,onClick:()=>K("in-progress"),children:"In Progress"}),(0,c.jsx)(x,{active:"all"===o,onClick:()=>K("all"),children:"All Tickets"})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(n.DO,{placeholder:"Search tickets...",value:Q,onChange:e=>V(e.target.value)})}),"all"===o&&(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:X,onChange:e=>Z(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:re,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,c.jsx)("option",{value:"general",children:"General"})]})})]}),(0,c.jsx)(g,{children:Fe.map(e=>(0,c.jsxs)(m,{onClick:()=>(e=>{le(e),pe(e.status),ae(!0)})(e),children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(j,{children:[(0,c.jsx)(f,{children:e.ticketNumber}),(0,c.jsx)(b,{children:e.subject}),(0,c.jsxs)(v,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{status:e.status,children:e.status}),(0,c.jsx)(k,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(C,{children:e.description}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Created"}),(0,c.jsx)(S,{children:Ie(e.createdAt)})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Category"}),(0,c.jsx)(S,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),ue[e.id]&&(0,c.jsx)(E,{children:(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ue[e.id].total_comments,ue[e.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ue[e.id].unread_count," new"]})]})})]})]},e.id))}),oe&&(0,c.jsx)(z,{onClick:()=>ne(!1),children:(0,c.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(_,{children:[(0,c.jsx)(T,{children:"Create System Inquiry"}),(0,c.jsx)($,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsxs)(O,{style:{position:"relative"},children:[(0,c.jsx)(R,{children:"Select User *"}),(0,c.jsx)(M,{type:"text",value:je,onChange:e=>(e=>{if(fe(e),Ae(!0),e.length<1){const e=me.slice(0,10);return void ve(e)}const t=me.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));ve(t.slice(0,10))})(e.target.value),onFocus:()=>{Ae(!0),0===je.length&&ve(me.slice(0,10))},onBlur:()=>setTimeout(()=>Ae(!1),200),placeholder:"Search by name, username, or email..."}),we&&be.length>0&&(0,c.jsx)(J,{children:be.map(e=>(0,c.jsxs)(W,{onClick:()=>(e=>{Ce(e),fe(e.full_name||e.username),Ae(!1),he(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,c.jsx)(G,{children:e.full_name||e.username}),(0,c.jsxs)(H,{children:[e.email," \u2022 ",e.role]})]},e.id))}),ke&&(0,c.jsxs)(Y,{children:["\u2713 Selected: ",(0,c.jsx)("strong",{children:ke.full_name||ke.username})," (",ke.email,")"]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Subject *"}),(0,c.jsx)(U,{type:"text",value:xe.subject,onChange:e=>he({...xe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Description *"}),(0,c.jsx)(q,{value:xe.description,onChange:e=>he({...xe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Priority"}),(0,c.jsxs)(P,{value:xe.priority,onChange:e=>he({...xe,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:"Low"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(R,{children:"Category"}),(0,c.jsxs)(P,{value:xe.category,onChange:e=>he({...xe,category:e.target.value}),children:[(0,c.jsx)("option",{value:"general",children:"General"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)(d.$n,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,c.jsx)(d.$n,{variant:"primary",onClick:async()=>{if(ke){try{const e={customerId:xe.customerId,customerName:xe.customerName,customerEmail:xe.customerEmail,customerRole:"System Admin"===ke.role?"admin":"Restaurant Admin"===ke.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(ke.role)?"manager":"staff",subject:xe.subject,description:xe.description,status:"open",priority:xe.priority,category:xe.category},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)return;{const e=await i.json(),o=e.data||e;r([o,...t])}}catch(e){return}ne(!1),he({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),Ce(null),fe(""),ve([])}},disabled:!xe.subject||!xe.description||!ke,children:"Create Inquiry"})]})]})}),se&&de&&(0,c.jsx)(z,{onClick:()=>ae(!1),children:(0,c.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(_,{children:[(0,c.jsx)(T,{children:"Inquiry Details"}),(0,c.jsx)($,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(D,{children:[(0,c.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Ticket Number"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.ticketNumber})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Status"}),(0,c.jsxs)(P,{value:ce,onChange:e=>(async e=>{if(de){pe(e);try{(await fetch(`/api/support-tickets/${de.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===de.id?{...t,status:e}:t)),le(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Priority"}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)(k,{priority:de.priority,children:de.priority})})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Category"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:de.category.replace("-"," ")})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Customer Information"}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:de.customerName}),(0,c.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:de.customerEmail})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Subject"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:de.subject})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Description"}),(0,c.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:de.description})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Created At"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ie(de.createdAt)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(R,{children:"Last Updated"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Ie(de.updatedAt)})]})]})]}),(0,c.jsx)(s.A,{entityType:"support_ticket",entityId:de.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ge(e=>{const t={...e};return t[de.id]&&(t[de.id]={...t[de.id],unread_count:0}),t})})]}),(0,c.jsx)(N,{children:(0,c.jsx)(d.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})})]})]})})}}}]);