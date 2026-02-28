"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5871],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),o=r(4414);const n=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i,...s}=e;return(0,o.jsx)(n,{className:r,style:i,...s,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,o.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,o.jsx)(a,{...r,children:t})}},4302:(e,t,r)=>{r.d(t,{A:()=>w});var i=r(9950),o=r(4752),n=r(4414);const s=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,a=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,l=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,d=o.Ay.div`
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
`,j=o.Ay.button`
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
`,w=e=>{let{entityType:t,entityId:r,currentUserId:o}=e;const[w,A]=(0,i.useState)([]),[C,F]=(0,i.useState)(""),[k,E]=(0,i.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&A(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&B()},[t,r]);const S=async()=>{if(C.trim()&&!k){E(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:C.trim()})})).ok&&(F(""),B())}catch(e){console.error("Error adding comment:",e)}finally{E(!1)}}},z=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const o=Math.floor(i/60);if(o<24)return`${o}h ago`;const n=Math.floor(o/24);return n<7?`${n}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,n.jsxs)(s,{children:[(0,n.jsxs)(a,{children:["Comments (",w.length,")"]}),w.length>0?(0,n.jsx)(l,{children:w.map(e=>{var t,r,i;return(0,n.jsxs)(d,{children:[(0,n.jsx)(c,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,n.jsxs)(p,{children:[(0,n.jsxs)(x,{children:[(0,n.jsx)(h,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,n.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,n.jsx)(g,{children:z(e.createdAt)}),o&&e.author_id===o&&(0,n.jsx)(j,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&B()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),(0,n.jsx)(m,{children:e.content})]})]},e.id)})}):(0,n.jsx)(v,{children:"No comments yet"}),(0,n.jsxs)(y,{children:[(0,n.jsx)(f,{value:C,onChange:e=>F(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),S())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,n.jsx)(b,{onClick:S,disabled:!C.trim()||k,children:"Send"})]})]})}},5871:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var i=r(9950),o=r(4752),n=r(2488),s=r(4302),a=r(1367),l=r(3832),d=r(5665),c=r(4414);const p=o.Ay.div`
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
`,j=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,y=o.Ay.div`
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
`,C=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,F=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,k=o.Ay.div`
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
`,L=o.Ay.div`
  padding: 24px;
`,N=o.Ay.div`
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
`,_=o.Ay.div`
  margin-bottom: 20px;
`,U=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,q=o.Ay.input`
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
`,R=o.Ay.textarea`
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
`,M=(0,o.Ay)(q)`
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
`,K=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,i.useState)([]),[o,K]=(0,i.useState)("open"),[Q,V]=(0,i.useState)(""),[X,Z]=(0,i.useState)("all"),[ee,te]=(0,i.useState)("all"),[re,ie]=(0,i.useState)("all"),[oe,ne]=(0,i.useState)(!1),[se,ae]=(0,i.useState)(!1),[le,de]=(0,i.useState)(null),[ce,pe]=(0,i.useState)(""),[xe,he]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),[ue,ge]=(0,i.useState)([]),[me,je]=(0,i.useState)(""),[ye,fe]=(0,i.useState)([]),[be,ve]=(0,i.useState)(!1),[we,Ae]=(0,i.useState)(null);(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json(),i=t.data||t;r(i)}}catch(e){}};e(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/users",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json(),r=e.data||e;ge(r)}}catch(e){}})();const t=setInterval(e,1e4);return()=>clearInterval(t)},[]);const Ce=t.filter(e=>{const t=e.subject.toLowerCase().includes(Q.toLowerCase())||e.customerName.toLowerCase().includes(Q.toLowerCase())||e.ticketNumber.toLowerCase().includes(Q.toLowerCase()),r="all"===o||e.status===o,i="all"===X||e.status===X,n="all"===ee||e.priority===ee,s="all"===re||e.category===re;return t&&r&&i&&n&&s}),Fe=t.length,ke=t.filter(e=>"open"===e.status).length,Ee=t.filter(e=>"in-progress"===e.status).length,Be=t.filter(e=>"closed"===e.status).length,Se=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l.mc,{children:[(0,c.jsxs)(l.Y9,{children:[(0,c.jsx)(l.hE,{children:"System Inquiry"}),(0,c.jsxs)(l.ex,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const t=await e.json();r(t.data||t)}}catch(e){}},children:"Refresh"}),(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>{const e=Ce.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),t=[["Ticket Number","Customer Name","Customer Email","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),r=new Blob(["\ufeff"+t],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>{ne(!0)},children:"Create Inquiry"})]})]}),(0,c.jsxs)(l.UC,{children:[(0,c.jsxs)(d.MD,{children:[(0,c.jsxs)(d.hI,{color:"#059669",children:[(0,c.jsx)(d.Os,{children:Fe}),(0,c.jsx)(d.v0,{children:"Total Tickets"}),(0,c.jsx)(d.d1,{children:"All support requests"})]}),(0,c.jsxs)(d.hI,{color:"#D97706",children:[(0,c.jsx)(d.Os,{children:ke}),(0,c.jsx)(d.v0,{children:"Open Tickets"}),(0,c.jsx)(d.d1,{children:"Awaiting response"})]}),(0,c.jsxs)(d.hI,{color:"#2563EB",children:[(0,c.jsx)(d.Os,{children:Ee}),(0,c.jsx)(d.v0,{children:"In Progress"}),(0,c.jsx)(d.d1,{children:"Currently being handled"})]}),(0,c.jsxs)(d.hI,{color:"#7C3AED",children:[(0,c.jsx)(d.Os,{children:Be}),(0,c.jsx)(d.v0,{children:"Closed"}),(0,c.jsxs)(d.d1,{children:[Fe>0?Math.round(Be/Fe*100):0,"% completion rate"]})]})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(x,{active:"open"===o,onClick:()=>K("open"),children:"Open"}),(0,c.jsx)(x,{active:"in-progress"===o,onClick:()=>K("in-progress"),children:"In Progress"}),(0,c.jsx)(x,{active:"all"===o,onClick:()=>K("all"),children:"All Tickets"})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(n.DO,{placeholder:"Search tickets...",value:Q,onChange:e=>V(e.target.value)})}),"all"===o&&(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:X,onChange:e=>Z(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:ee,onChange:e=>te(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})}),(0,c.jsx)(u,{children:(0,c.jsxs)(n.Jt,{value:re,onChange:e=>ie(e.target.value),style:{maxWidth:"180px"},children:[(0,c.jsx)("option",{value:"all",children:"All Categories"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,c.jsx)("option",{value:"general",children:"General"})]})})]}),(0,c.jsx)(g,{children:Ce.map(e=>(0,c.jsxs)(m,{onClick:()=>(e=>{de(e),pe(e.status),ae(!0)})(e),children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(f,{children:e.ticketNumber}),(0,c.jsx)(b,{children:e.subject}),(0,c.jsxs)(v,{children:[e.customerName," \u2022 ",e.customerEmail]})]}),(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{status:e.status,children:e.status}),(0,c.jsx)(C,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(F,{children:e.description}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Created"}),(0,c.jsx)(S,{children:Se(e.createdAt)})]}),(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Category"}),(0,c.jsx)(S,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]})]})]},e.id))}),oe&&(0,c.jsx)(z,{onClick:()=>ne(!1),children:(0,c.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Create System Inquiry"}),(0,c.jsx)($,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)(_,{style:{position:"relative"},children:[(0,c.jsx)(U,{children:"Select User *"}),(0,c.jsx)(M,{type:"text",value:me,onChange:e=>(e=>{if(je(e),ve(!0),e.length<1){const e=ue.slice(0,10);return void fe(e)}const t=ue.filter(t=>t.full_name&&t.full_name.toLowerCase().includes(e.toLowerCase())||t.username&&t.username.toLowerCase().includes(e.toLowerCase())||t.email&&t.email.toLowerCase().includes(e.toLowerCase()));fe(t.slice(0,10))})(e.target.value),onFocus:()=>{ve(!0),0===me.length&&fe(ue.slice(0,10))},onBlur:()=>setTimeout(()=>ve(!1),200),placeholder:"Search by name, username, or email..."}),be&&ye.length>0&&(0,c.jsx)(J,{children:ye.map(e=>(0,c.jsxs)(W,{onClick:()=>(e=>{Ae(e),je(e.full_name||e.username),ve(!1),he(t=>({...t,customerId:e.id.toString(),customerName:e.full_name||e.username,customerEmail:e.email}))})(e),children:[(0,c.jsx)(G,{children:e.full_name||e.username}),(0,c.jsxs)(H,{children:[e.email," \u2022 ",e.role]})]},e.id))}),we&&(0,c.jsxs)(Y,{children:["\u2713 Selected: ",(0,c.jsx)("strong",{children:we.full_name||we.username})," (",we.email,")"]})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(U,{children:"Subject *"}),(0,c.jsx)(q,{type:"text",value:xe.subject,onChange:e=>he({...xe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(U,{children:"Description *"}),(0,c.jsx)(R,{value:xe.description,onChange:e=>he({...xe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(_,{children:[(0,c.jsx)(U,{children:"Priority"}),(0,c.jsxs)(P,{value:xe.priority,onChange:e=>he({...xe,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:"Low"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(U,{children:"Category"}),(0,c.jsxs)(P,{value:xe.category,onChange:e=>he({...xe,category:e.target.value}),children:[(0,c.jsx)("option",{value:"general",children:"General"}),(0,c.jsx)("option",{value:"technical",children:"Technical"}),(0,c.jsx)("option",{value:"billing",children:"Billing"}),(0,c.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,c.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,c.jsxs)(N,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(we){try{const e={customerId:xe.customerId,customerName:xe.customerName,customerEmail:xe.customerEmail,customerRole:"System Admin"===we.role?"admin":"Restaurant Admin"===we.role?"restaurant":["Foodcourt Manager","Foodcourt General","Brand Manager","Brand General"].includes(we.role)?"manager":"staff",subject:xe.subject,description:xe.description,status:"open",priority:xe.priority,category:xe.category},i=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)return;{const e=await i.json(),o=e.data||e;r([o,...t])}}catch(e){return}ne(!1),he({subject:"",description:"",priority:"medium",category:"general",customerName:"",customerEmail:"",customerId:""}),Ae(null),je(""),fe([])}},disabled:!xe.subject||!xe.description||!we,children:"Create Inquiry"})]})]})}),se&&le&&(0,c.jsx)(z,{onClick:()=>ae(!1),children:(0,c.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Inquiry Details"}),(0,c.jsx)($,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(L,{children:[(0,c.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Ticket Number"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.ticketNumber})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Status"}),(0,c.jsxs)(P,{value:ce,onChange:e=>(async e=>{if(le){pe(e);try{(await fetch(`/api/support-tickets/${le.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(r(t=>t.map(t=>t.id===le.id?{...t,status:e}:t)),de(t=>t?{...t,status:e}:null))}catch(t){}}})(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Priority"}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)(C,{priority:le.priority,children:le.priority})})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Category"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:le.category.replace("-"," ")})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Customer Information"}),(0,c.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,c.jsx)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:le.customerName}),(0,c.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:le.customerEmail})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Subject"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:le.subject})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Description"}),(0,c.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:le.description})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Created At"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(le.createdAt)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(U,{children:"Last Updated"}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:Se(le.updatedAt)})]})]})]}),(0,c.jsx)(s.A,{entityType:"support_ticket",entityId:le.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,c.jsx)(N,{children:(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})})]})]})})}}}]);