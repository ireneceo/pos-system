"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i,...s}=e;return(0,n.jsx)(o,{className:r,style:i,...s,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(a,{...r,children:t})}},4302:(e,t,r)=>{r.d(t,{A:()=>C});var i=r(9950),n=r(4752),o=r(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,l=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,d=n.Ay.div`
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
`,j=n.Ay.button`
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
`,f=n.Ay.textarea`
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
`,b=n.Ay.button`
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
`,C=e=>{let{entityType:t,entityId:r,currentUserId:n}=e;const[C,w]=(0,i.useState)([]),[A,k]=(0,i.useState)(""),[F,E]=(0,i.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&w(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&B()},[t,r]);const S=async()=>{if(A.trim()&&!F){E(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:A.trim()})})).ok&&(k(""),B())}catch(e){console.error("Error adding comment:",e)}finally{E(!1)}}},T=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,o.jsxs)(s,{children:[(0,o.jsxs)(a,{children:["Comments (",C.length,")"]}),C.length>0?(0,o.jsx)(l,{children:C.map(e=>{var t,r,i;return(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,o.jsxs)(p,{children:[(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,o.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,o.jsx)(g,{children:T(e.createdAt)}),n&&e.author_id===n&&(0,o.jsx)(j,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&B()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),(0,o.jsx)(m,{children:e.content})]})]},e.id)})}):(0,o.jsx)(v,{children:"No comments yet"}),(0,o.jsxs)(y,{children:[(0,o.jsx)(f,{value:A,onChange:e=>k(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,o.jsx)(b,{onClick:S,disabled:!A.trim()||F,children:"Send"})]})]})}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>V});var i=r(9950),n=r(4752),o=r(2488),s=r(4302),a=r(1367),l=r(3832),d=r(5665),c=r(4414);const p=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,x=n.Ay.button`
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
`,h=n.Ay.div`
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
`,u=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,j=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,y=n.Ay.div`
  flex: 1;
`,f=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 6px;
`,b=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
`,v=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,C=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,w=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"closed":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"closed":return"#059669";default:return"#6B7280"}}};
`,A=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,E=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,B=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,S=n.Ay.span`
  color: #374151;
`,T=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,D=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,z=n.Ay.div`
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
`,$=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,N=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,I=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,R=n.Ay.button`
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
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,M=n.Ay.div`
  margin-bottom: 20px;
`,W=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,_=n.Ay.input`
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
`,U=n.Ay.select`
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
`,H=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,q=(0,n.Ay)(_)`
  width: 100%;
`,J=n.Ay.div`
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
`,G=n.Ay.div`
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
`,Y=n.Ay.div`
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,K=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=n.Ay.div`
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
`,V=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,i.useState)([]),[n,V]=(0,i.useState)("open"),[X,Z]=(0,i.useState)(""),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[ne,oe]=(0,i.useState)("all"),[se,ae]=(0,i.useState)(!1),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,he]=(0,i.useState)(!1),[ue,ge]=(0,i.useState)(!1),[me,je]=(0,i.useState)(!1),[ye,fe]=(0,i.useState)(null),[be,ve]=(0,i.useState)(""),[Ce,we]=(0,i.useState)("in-progress"),[Ae,ke]=(0,i.useState)(""),[Fe,Ee]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[Be,Se]=(0,i.useState)([]),[Te,De]=(0,i.useState)(""),[ze,$e]=(0,i.useState)([]),[Ne,Ie]=(0,i.useState)(!1),[Re,Pe]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;Se(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Oe=t.filter(e=>{const t=e.subject.toLowerCase().includes(X.toLowerCase())||e.customerName.toLowerCase().includes(X.toLowerCase())||e.ticketNumber.toLowerCase().includes(X.toLowerCase()),r="all"===n||e.status===n,i="all"===ee||e.status===ee,o="all"===re||e.priority===re,s="all"===ne||e.category===ne;return t&&r&&i&&o&&s}),Le=t.length,Me=t.filter(e=>"open"===e.status).length,We=t.filter(e=>"in-progress"===e.status).length,_e=t.filter(e=>"closed"===e.status).length,Ue=t.filter(e=>e.responseTime&&e.responseTime>0),He=(Ue.length>0&&Math.round(Ue.reduce((e,t)=>e+t.responseTime,0)/Ue.length),e=>new Date(e).toLocaleString("en-MY")),qe=e=>{if(!e||0===e)return"Pending";const t=Math.floor(e/60),r=e%60;return t>0?`${t}h ${r}m`:`${r}m`},Je=e=>{fe(e),he(!0)},Ge=e=>{fe(e),ve(e.replyMessage||""),we(e.status),pe(!0)};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l.mc,{children:[(0,c.jsxs)(l.Y9,{children:[(0,c.jsx)(l.hE,{children:"System Inquiry"}),(0,c.jsxs)(l.ex,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t.data||t)}}catch(e){}},children:"Refresh"}),(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=Oe.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),n=document.createElement("a");n.href=i,n.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>{ae(!0)},children:"Create Ticket"})]})]}),(0,c.jsxs)(l.UC,{children:[(0,c.jsxs)(d.MD,{children:[(0,c.jsxs)(d.hI,{color:"#059669",children:[(0,c.jsx)(d.Os,{children:Le}),(0,c.jsx)(d.v0,{children:"Total Tickets"}),(0,c.jsx)(d.d1,{children:"All support requests"})]}),(0,c.jsxs)(d.hI,{color:"#D97706",children:[(0,c.jsx)(d.Os,{children:Me}),(0,c.jsx)(d.v0,{children:"Open Tickets"}),(0,c.jsx)(d.d1,{children:"Awaiting response"})]}),(0,c.jsxs)(d.hI,{color:"#2563EB",children:[(0,c.jsx)(d.Os,{children:We}),(0,c.jsx)(d.v0,{children:"In Progress"}),(0,c.jsx)(d.d1,{children:"Currently being handled"})]}),(0,c.jsxs)(d.hI,{color:"#7C3AED",children:[(0,c.jsx)(d.Os,{children:_e}),(0,c.jsx)(d.v0,{children:"Closed"}),(0,c.jsxs)(d.d1,{children:[Le>0?Math.round(_e/Le*100):0,"% completion rate"]})]})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{active:"open"===n,onClick:()=>V("open"),children:"Open"}),(0,c.jsx)(x,{active:"in-progress"===n,onClick:()=>V("in-progress"),children:"In Progress"}),(0,c.jsx)(x,{active:"all"===n,onClick:()=>V("all"),children:"All Tickets"})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(o.DO,{placeholder:"Search tickets...",value:X,onChange:e=>Z(e.target.value)})}),"all"===n&&(0,c.jsx)(u,{children:(0,c.jsxs)(o.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(o.Jt,{value:re,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(o.Jt,{value:ne,onChange:e=>oe(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,c.jsx)("option",{value:"general",children:"General"})]})})]}),(0,c.jsx)(g,{children:Oe.map(e=>(0,c.jsxs)(m,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(f,{children:e.ticketNumber}),(0,c.jsx)(b,{children:e.subject}),(0,c.jsxs)(v,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)(w,{status:e.status,children:e.status}),(0,c.jsx)(A,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(k,{children:e.description}),e.replyMessage&&(0,c.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,c.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",He(e.repliedAt||"")]}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Created"}),(0,c.jsx)(S,{children:He(e.createdAt)})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Category"}),(0,c.jsx)(S,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Response Time"}),(0,c.jsx)(S,{children:e.replyMessage?qe(e.responseTime):"Pending"})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{variant:"primary",onClick:()=>(e=>{fe(e),de(!0)})(e),children:"View"}),"closed"!==e.status&&(0,c.jsx)(D,{variant:"primary",onClick:()=>Ge(e),children:"Reply"}),(0,c.jsx)(D,{onClick:()=>Je(e),children:"Add Note"}),e.replyMessage&&"closed"!==e.status&&(0,c.jsx)(D,{onClick:()=>(e=>{fe(e),ge(!0)})(e),children:"Close Ticket"}),(0,c.jsx)(D,{variant:"danger",onClick:()=>(e=>{fe(e),je(!0)})(e),children:"Delete"})]})]},e.id))}),se&&(0,c.jsx)(z,{onClick:()=>ae(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsx)(I,{children:"Create Support Ticket"}),(0,c.jsx)(R,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(P,{children:[(0,c.jsxs)(M,{style:{position:"relative"},children:[(0,c.jsx)(W,{children:"Select User *"}),(0,c.jsx)(q,{type:"text",value:Te,onChange:e=>(e=>{if(De(e),Ie(!0),e.length<1){const e=Be.slice(0,10);return void $e(e)}const t=Be.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));$e(t.slice(0,10))})(e.target.value),onFocus:()=>{Ie(!0),0===Te.length&&$e(Be.slice(0,10))},onBlur:()=>setTimeout(()=>Ie(!1),200),placeholder:"Search by name, username, or email..."}),Ne&&ze.length>0&&(0,c.jsx)(J,{children:ze.map(e=>(0,c.jsxs)(G,{onClick:()=>(e=>{Pe(e),De(e.full_name||e.username),Ie(!1),Ee(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,c.jsx)(Y,{children:e.full_name||e.username}),(0,c.jsxs)(K,{children:[e.email," \u2022 ",e.role]})]},e.id))}),Re&&(0,c.jsxs)(Q,{children:["\u2713 Selected: ",(0,c.jsx)("strong",{children:Re.full_name||Re.username})," (",Re.email,")"]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Subject *"}),(0,c.jsx)(_,{type:"text",value:Fe.subject,onChange:e=>Ee({...Fe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Description *"}),(0,c.jsx)(H,{value:Fe.description,onChange:e=>Ee({...Fe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Priority"}),(0,c.jsxs)(U,{value:Fe.priority,onChange:e=>Ee({...Fe,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:"Low"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Category"}),(0,c.jsxs)(U,{value:Fe.category,onChange:e=>Ee({...Fe,category:e.target.value}),children:[(0,c.jsx)("option",{value:"general",children:"General"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(Re){try{const e={customerId:Fe.customerId,customerName:Fe.customerName,customerEmail:Fe.customerEmail,customerRole:"System Admin"===Re.role?"admin":"Restaurant Admin"===Re.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(Re.role)?"manager":"staff",subject:Fe.subject,description:Fe.description,status:"open",priority:Fe.priority,category:Fe.category},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)return void alert("Failed to create support ticket. Please try again.");{const e=await i.json(),n=e.data||e;r([n,...t])}}catch(e){return void alert("Error creating support ticket. Please try again.")}ae(!1),Ee({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),Pe(null),De(""),$e([])}else alert("Please select a user to create ticket for")},disabled:!Fe.subject||!Fe.description||!Re,children:"Create Ticket"})]})]})}),le&&ye&&(0,c.jsx)(z,{onClick:()=>de(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsx)(I,{children:"Ticket Details"}),(0,c.jsx)(R,{onClick:()=>de(!1),children:"\xd7"})]}),(0,c.jsxs)(P,{children:[(0,c.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Ticket Number"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ye.ticketNumber})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Status"}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"open"===ye.status?"#FEF3C7":"in-progress"===ye.status?"#DBEAFE":"#ECFDF5",color:"open"===ye.status?"#D97706":"in-progress"===ye.status?"#1E40AF":"#059669"},children:ye.status})})]})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Priority"}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)("span",{style:{padding:"4px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",background:"urgent"===ye.priority?"#FEE2E2":"high"===ye.priority?"#FEF3C7":"medium"===ye.priority?"#DBEAFE":"#F3F4F6",color:"urgent"===ye.priority?"#DC2626":"high"===ye.priority?"#D97706":"medium"===ye.priority?"#1E40AF":"#6B7280"},children:ye.priority})})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Category"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ye.category.replace("-"," ")})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Customer Information"}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:ye.customerName}),(0,c.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:ye.customerEmail})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Subject"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ye.subject})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Description"}),(0,c.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ye.description})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Created At"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye.createdAt})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Last Updated"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye.updatedAt})]})]}),ye.assignedTo&&(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Assigned To"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:ye.assignedTo})]}),ye.replyMessage&&(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Support Reply"}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD",marginTop:"8px"},children:[(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#0369A1",marginBottom:"8px",fontWeight:"600"},children:[ye.repliedBy," \u2022 ",He(ye.repliedAt||"")]}),(0,c.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:ye.replyMessage})]})]}),ye.notes&&ye.notes.length>0&&(0,c.jsxs)("div",{children:[(0,c.jsx)(W,{children:"Internal Notes (Admin Only)"}),(0,c.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"12px",marginTop:"8px"},children:ye.notes.map(e=>(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEF3C7",borderRadius:"8px",border:"1px solid #FCD34D"},children:[(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#92400E",marginBottom:"8px",fontWeight:"600"},children:[e.createdBy," \u2022 ",He(e.createdAt)]}),(0,c.jsx)("div",{style:{color:"#374151",lineHeight:"1.5",whiteSpace:"pre-wrap"},children:e.message})]},e.id))})]})]}),(0,c.jsx)(s.A,{entityType:"support_ticket",entityId:ye.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>de(!1),children:"Close"}),"closed"!==ye.status&&(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>{de(!1),Ge(ye)},children:"Reply"}),(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>Je(ye),children:"Add Note"})]})]})}),ce&&ye&&(0,c.jsx)(z,{onClick:()=>pe(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsxs)(I,{children:["Reply to Ticket ",ye.ticketNumber]}),(0,c.jsx)(R,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ye.subject}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:["From: ",ye.customerName," (",ye.customerEmail,")"]}),(0,c.jsx)("div",{style:{color:"#374151",lineHeight:"1.5"},children:ye.description})]})}),ye.notes&&ye.notes.length>0&&(0,c.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,c.jsx)(W,{children:"Internal Notes (Admin Only)"}),(0,c.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px",marginTop:"8px"},children:ye.notes.map(e=>(0,c.jsxs)("div",{style:{padding:"10px",backgroundColor:"#FEF3C7",borderRadius:"6px",border:"1px solid #FCD34D"},children:[(0,c.jsxs)("div",{style:{fontSize:"11px",color:"#92400E",marginBottom:"6px",fontWeight:"600"},children:["\ud83d\udcdd ",e.createdBy," \u2022 ",He(e.createdAt)]}),(0,c.jsx)("div",{style:{color:"#374151",fontSize:"13px",lineHeight:"1.4"},children:e.message})]},e.id))})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Ticket Status"}),(0,c.jsxs)(U,{value:Ce,onChange:e=>we(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Your Reply"}),(0,c.jsx)(H,{value:be,onChange:e=>ve(e.target.value),placeholder:"Type your reply to the customer...",style:{minHeight:"120px"}})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!be.trim()||!ye)return;const e=new Date(ye.createdAt).getTime(),t=(new Date).getTime(),i=Math.round((t-e)/6e4);try{const e=await fetch(`/api/support-tickets/${ye.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:Ce,replyMessage:be,repliedBy:"Support Agent",repliedAt:(new Date).toISOString().replace("T"," ").slice(0,19),responseTime:i>0?i:1,..."closed"===Ce&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(!e.ok)return void alert("Failed to send reply. Please try again.");{const t=await e.json(),i=t.data||t;r(e=>e.map(e=>e.id===ye.id?{...e,...i}:e))}}catch(n){return void alert("Error sending reply. Please try again.")}ve(""),pe(!1)},disabled:!be.trim(),children:"Send Reply"})]})]})}),xe&&ye&&(0,c.jsx)(z,{onClick:()=>he(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsxs)(I,{children:["Add Note to Ticket ",ye.ticketNumber]}),(0,c.jsx)(R,{onClick:()=>he(!1),children:"\xd7"})]}),(0,c.jsxs)(P,{children:[(0,c.jsx)("div",{style:{marginBottom:"20px"},children:(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:ye.subject}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#6B7280"},children:["From: ",ye.customerName," (",ye.customerEmail,")"]})]})}),(0,c.jsxs)(M,{children:[(0,c.jsx)(W,{children:"Internal Note (Not visible to customer)"}),(0,c.jsx)(H,{value:Ae,onChange:e=>ke(e.target.value),placeholder:"Add an internal note for your team..."})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(!Ae.trim()||!ye)return;const e={id:`note-${Date.now()}`,message:Ae,createdBy:"System Admin",createdAt:(new Date).toISOString().replace("T"," ").slice(0,19)},t=[...ye.notes||[],e];try{const e=await fetch(`/api/support-tickets/${ye.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:t})});if(!e.ok)return void alert("Failed to add note. Please try again.");{const t=await e.json(),i=t.data||t;r(e=>e.map(e=>e.id===ye.id?{...e,...i}:e))}}catch(i){return void alert("Error adding note. Please try again.")}ke(""),he(!1)},disabled:!Ae.trim(),children:"Add Note"})]})]})}),ue&&ye&&(0,c.jsx)(z,{onClick:()=>ge(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsx)(I,{children:"Close Ticket"}),(0,c.jsx)(R,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,c.jsx)(P,{children:(0,c.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,c.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Close This Ticket?"}),(0,c.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This will mark ticket ",(0,c.jsx)("strong",{children:ye.ticketNumber})," as ",(0,c.jsx)("strong",{children:"CLOSED"}),".",(0,c.jsx)("br",{}),"The customer will be notified that their issue has been resolved."]}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#ECFDF5",borderRadius:"8px",border:"1px solid #86EFAC",marginBottom:"20px"},children:[(0,c.jsxs)("div",{style:{fontWeight:"600",color:"#065F46",marginBottom:"4px"},children:["Subject: ",ye.subject]}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Customer: ",ye.customerName]}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#047857"},children:["Current Status: ",(0,c.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:ye.status})]})]})]})}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>ge(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>{ye&&(r(e=>e.map(e=>e.id===ye.id?{...e,status:"closed",resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}:e)),ge(!1))},children:"Close Ticket"})]})]})}),me&&ye&&(0,c.jsx)(z,{onClick:()=>je(!1),children:(0,c.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(N,{children:[(0,c.jsx)(I,{children:"Delete Ticket"}),(0,c.jsx)(R,{onClick:()=>je(!1),children:"\xd7"})]}),(0,c.jsx)(P,{children:(0,c.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,c.jsx)("h3",{style:{color:"#0A2540",marginBottom:"12px"},children:"Delete This Ticket?"}),(0,c.jsxs)("p",{style:{color:"#6B7280",marginBottom:"20px",lineHeight:"1.5"},children:["This action ",(0,c.jsx)("strong",{children:"cannot be undone"}),". This will permanently delete ticket ",(0,c.jsx)("strong",{children:ye.ticketNumber})," and remove all associated data."]}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#FEE2E2",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"20px"},children:[(0,c.jsxs)("div",{style:{fontWeight:"600",color:"#991B1B",marginBottom:"4px"},children:["Subject: ",ye.subject]}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Customer: ",ye.customerName]}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#B91C1C"},children:["Status: ",(0,c.jsx)("span",{style:{textTransform:"uppercase",fontWeight:"600"},children:ye.status})]})]})]})}),(0,c.jsxs)(O,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>je(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(ye){try{if(!(await fetch(`/api/support-tickets/${ye.id}`,{method:"DELETE"})).ok)return void alert("Failed to delete support ticket. Please try again.");r(e=>e.filter(e=>e.id!==ye.id))}catch(e){return void alert("Error deleting support ticket. Please try again.")}je(!1),fe(null)}},style:{backgroundColor:"#DC2626",borderColor:"#DC2626"},children:"Delete Permanently"})]})]})})]})]})})}}}]);