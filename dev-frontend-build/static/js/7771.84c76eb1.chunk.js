"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{4302:(e,r,t)=>{t.d(r,{A:()=>A});var n=t(9950),o=t(4752),i=t(4414);const s=o.Ay.div`
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
`,p=o.Ay.div`
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
`,c=o.Ay.div`
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
`,A=e=>{let{entityType:r,entityId:t,currentUserId:o}=e;const[A,w]=(0,n.useState)([]),[F,E]=(0,n.useState)(""),[k,C]=(0,n.useState)(!1),B=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&w(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&B()},[r,t]);const z=async()=>{if(F.trim()&&!k){C(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:F.trim()})})).ok&&(E(""),B())}catch(e){console.error("Error adding comment:",e)}finally{C(!1)}}},S=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,i.jsxs)(s,{children:[(0,i.jsxs)(a,{children:["Comments (",A.length,")"]}),A.length>0?(0,i.jsx)(d,{children:A.map(e=>{var r,t,n;return(0,i.jsxs)(l,{children:[(0,i.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,i.jsxs)(c,{children:[(0,i.jsxs)(x,{children:[(0,i.jsx)(h,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,i.jsx)(u,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,i.jsx)(g,{children:S(e.createdAt)}),o&&e.author_id===o&&(0,i.jsx)(f,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&B()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),(0,i.jsx)(m,{children:e.content})]})]},e.id)})}):(0,i.jsx)(v,{children:"No comments yet"}),(0,i.jsxs)(y,{children:[(0,i.jsx)(b,{value:F,onChange:e=>E(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),z())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,i.jsx)(j,{onClick:z,disabled:!F.trim()||k,children:"Send"})]})]})}},7771:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ee});var n=t(9950),o=t(4752),i=t(1367),s=t(4302),a=t(4414);const d=o.Ay.div`
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
`,p=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,c=o.Ay.h1`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,m=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,b=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,j=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=o.Ay.input`
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
`,A=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,F=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,E=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=o.Ay.div`
  flex: 1;
`,C=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,B=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,z=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,S=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,$=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,D=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,I=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,T=o.Ay.div`
  margin-top: 16px;
  padding: 16px;
  background: #F0F9FF;
  border-radius: 8px;
  border: 1px solid #BAE6FD;
`,R=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 8px;
`,N=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,L=o.Ay.div`
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
`,_=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"danger"===e.variant?"\n    background: #FEE2E2;\n    color: #DC2626;\n\n    &:hover {\n      background: #FEE2E2;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  "}
`,q=o.Ay.div`
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
`,P=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,M=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=o.Ay.button`
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
`,Y=o.Ay.div`
  padding: 24px;
`,J=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,K=o.Ay.div`
  margin-bottom: 20px;
`,G=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=o.Ay.select`
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
`,Q=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,W=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,X=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,Z=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,ee=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)([]),[o,ee]=(0,n.useState)(""),[re,te]=(0,n.useState)("all"),[ne,oe]=(0,n.useState)("all"),[ie,se]=(0,n.useState)(!1),[ae,de]=(0,n.useState)(null),[le,pe]=(0,n.useState)(""),[ce,xe]=(0,n.useState)("in-progress"),he=(null===e||void 0===e?void 0:e.id)||"2",ue=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,n.useEffect)(()=>{if(e){ge();const e=setInterval(ge,1e4);return()=>clearInterval(e)}},[e]);const ge=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${he}&userRole=${ue}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},me=r.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.restaurantName.toLowerCase().includes(o.toLowerCase()),t="all"===re||e.status===re,n="all"===ne||e.priority===ne;return r&&t&&n}),fe=r.length,ye=r.filter(e=>"open"===e.status).length,be=r.filter(e=>"in-progress"===e.status).length,je=r.filter(e=>"resolved"===e.status).length,ve=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),Ae=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{children:"Operation Inquiry"}),(0,a.jsx)(x,{children:(0,a.jsx)(h,{variant:"secondary",onClick:ge,children:"Refresh"})})]}),(0,a.jsxs)(p,{children:[(0,a.jsxs)(u,{children:[(0,a.jsxs)(g,{borderColor:"#635BFF",children:[(0,a.jsx)(m,{children:fe}),(0,a.jsx)(f,{children:"Total Inquiries"})]}),(0,a.jsxs)(g,{borderColor:"#F59E0B",children:[(0,a.jsx)(m,{children:ye}),(0,a.jsx)(f,{children:"Open"})]}),(0,a.jsxs)(g,{borderColor:"#3B82F6",children:[(0,a.jsx)(m,{children:be}),(0,a.jsx)(f,{children:"In Progress"})]}),(0,a.jsxs)(g,{borderColor:"#10B981",children:[(0,a.jsx)(m,{children:je}),(0,a.jsx)(f,{children:"Resolved"})]})]}),(0,a.jsxs)(y,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(j,{children:"Search"}),(0,a.jsx)(v,{placeholder:"Search inquiries...",value:o,onChange:e=>ee(e.target.value)})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(j,{children:"Status"}),(0,a.jsxs)(A,{value:re,onChange:e=>te(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Status"}),(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(j,{children:"Priority"}),(0,a.jsxs)(A,{value:ne,onChange:e=>oe(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Priority"}),(0,a.jsx)("option",{value:"urgent",children:"Urgent"}),(0,a.jsx)("option",{value:"high",children:"High"}),(0,a.jsx)("option",{value:"medium",children:"Medium"}),(0,a.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,a.jsxs)(w,{children:[me.map(e=>(0,a.jsxs)(F,{children:[(0,a.jsxs)(E,{children:[(0,a.jsxs)(k,{children:[(0,a.jsx)(C,{children:e.ticketNumber}),(0,a.jsx)(B,{children:e.subject}),(0,a.jsxs)(z,{children:[(0,a.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,a.jsxs)("span",{children:["From: ",e.requesterName]}),(0,a.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)($,{status:e.status,children:e.status}),(0,a.jsx)(D,{priority:e.priority,children:e.priority})]})]}),(0,a.jsx)(I,{children:e.description}),e.response&&(0,a.jsxs)(T,{children:[(0,a.jsxs)(R,{children:["Your Response \u2022 ",e.resolvedAt&&ve(e.resolvedAt)]}),(0,a.jsx)(N,{children:e.response})]}),(0,a.jsxs)(L,{children:[(0,a.jsxs)("span",{children:["Created: ",ve(e.createdAt)]}),e.responseTime>0&&(0,a.jsxs)("span",{children:["Response Time: ",Ae(e.responseTime)]}),(0,a.jsx)(_,{variant:"primary",onClick:()=>(e=>{de(e),pe(e.response||""),xe(e.response?e.status:"in-progress"),se(!0)})(e),children:e.response?"Update Reply":"Reply"})]})]},e.id)),0===me.length&&(0,a.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,a.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,a.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),ie&&ae&&(0,a.jsx)(q,{onClick:()=>se(!1),children:(0,a.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(M,{children:[(0,a.jsx)(O,{children:ae.response?"Update Reply":"Reply to Inquiry"}),(0,a.jsx)(U,{onClick:()=>se(!1),children:"\xd7"})]}),(0,a.jsxs)(Y,{children:[(0,a.jsxs)(V,{children:[(0,a.jsxs)(W,{children:[(0,a.jsx)(X,{children:"Ticket Number:"}),(0,a.jsx)(Z,{children:ae.ticketNumber})]}),(0,a.jsxs)(W,{children:[(0,a.jsx)(X,{children:"Restaurant:"}),(0,a.jsx)(Z,{children:ae.restaurantName})]}),(0,a.jsxs)(W,{children:[(0,a.jsx)(X,{children:"From:"}),(0,a.jsx)(Z,{children:ae.requesterName})]}),(0,a.jsxs)(W,{children:[(0,a.jsx)(X,{children:"Subject:"}),(0,a.jsx)(Z,{children:ae.subject})]})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(G,{children:"Status *"}),(0,a.jsxs)(H,{value:ce,onChange:e=>xe(e.target.value),children:[(0,a.jsx)("option",{value:"open",children:"Open"}),(0,a.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,a.jsx)("option",{value:"resolved",children:"Resolved"}),(0,a.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,a.jsxs)(K,{children:[(0,a.jsx)(G,{children:"Response Message *"}),(0,a.jsx)(Q,{value:le,onChange:e=>pe(e.target.value),placeholder:"Enter your response to the inquiry..."})]}),(0,a.jsx)(s.A,{entityType:"operation_ticket",entityId:String(ae.id),currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,a.jsxs)(J,{children:[(0,a.jsx)(h,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,a.jsx)(h,{variant:"primary",onClick:async()=>{if(!le.trim()||!ae)return;const e=new Date(ae.createdAt).getTime(),r=(new Date).getTime(),n=Math.round((r-e)/6e4);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${ae.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ce,response:le,responseTime:n>0?n:1,..."resolved"===ce&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===ae.id?{...e,...n}:e)),pe(""),se(!1)}else alert("Failed to send reply. Please try again.")}catch(o){console.error("Error sending reply:",o),alert("Error sending reply. Please try again.")}},disabled:!le.trim(),children:"Send Reply"})]})]})})]})]})})}}}]);