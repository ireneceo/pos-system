"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=n.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=n.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=n.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,o.jsx)(x,{children:r.map((e,t)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,o.jsx)(s,{children:n.map((e,t)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>_});var n=r(9950),o=r(4752),i=r(4185),a=r(4414);const s=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=o.Ay.h4`
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
`,c=o.Ay.div`
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
`,x=o.Ay.div`
  flex: 1;
  min-width: 0;
`,h=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=o.Ay.p`
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
`,b=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=o.Ay.textarea`
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
`,v=o.Ay.div`
  display: flex;
  gap: 4px;
`,w=o.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=o.Ay.button`
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
`,k=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=o.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=o.Ay.input`
  display: none;
`,_=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:_}=e;const[$,N]=(0,n.useState)([]),[I,D]=(0,n.useState)(""),[T,R]=(0,n.useState)([]),[L,O]=(0,n.useState)(!1),[P,M]=(0,n.useState)(!1),q=(0,n.useRef)(null),U=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&N(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(U(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),_&&_()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const J=async()=>{const e=I.trim(),n=T.length>0;if((e||n)&&!P){M(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:I.trim(),attachments:n?T:void 0})})).ok&&(D(""),R([]),U())}catch(o){console.error("Error adding comment:",o)}finally{M(!1)}}},K=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",$.length,")"]}),$.length>0?(0,a.jsx)(d,{children:$.map(e=>{var t,r,n;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(m,{children:K(e.createdAt)}),o&&e.author_id===o&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&U()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(A,{value:I,onChange:e=>D(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),J())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(v,{children:[(0,a.jsx)(w,{onClick:()=>{var e;return null===(e=q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:J,disabled:!I.trim()&&0===T.length||P,children:"Send"})]})]}),(T.length>0||L)&&(0,a.jsxs)(E,{children:[L&&(0,a.jsx)(z,{children:"Uploading..."}),T.map((e,t)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=T[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),R(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-T.length,n=Array.from(t).slice(0,r);if(0!==n.length){O(!0);try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();o.success&&o.data&&R(e=>[...e,...o.data])}catch(o){console.error("File upload error:",o)}finally{O(!1)}}}})]})}},9889:(e,t,r)=>{r.r(t),r.d(t,{default:()=>G});var n=r(9950),o=r(4752),i=r(1367),a=r(4302),s=r(4185),l=r(4414);const d=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=o.Ay.div`
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
`,x=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
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
`,b=o.Ay.input`
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
`,j=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=o.Ay.div`
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
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=o.Ay.div`
  flex: 1;
`,k=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,C=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,B=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,_=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,$=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=o.Ay.span`
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
`,T=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,R=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,L=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,O=o.Ay.button`
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
`,M=o.Ay.div`
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
`,U=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,J=o.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,K=o.Ay.div`
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
`,W=o.Ay.div`
  margin-bottom: 20px;
`,Y=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,H=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,G=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,n.useState)([]),[o,G]=(0,n.useState)(""),[Q,V]=(0,n.useState)("all"),[X,Z]=(0,n.useState)("all"),[ee,te]=(0,n.useState)(null),[re,ne]=(0,n.useState)(""),[oe,ie]=(0,n.useState)({}),ae=null===e||void 0===e?void 0:e.id,se=(null===e||void 0===e?void 0:e.role)||"Brand Manager";(0,n.useEffect)(()=>{le();const e=setInterval(le,1e4);return()=>clearInterval(e)},[]);const le=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ae}&userRole=${se}`);if(e.ok){const t=await e.json();r(t),de(t)}}catch(e){console.error("Error fetching operation tickets:",e)}},de=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ie(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},ce=t.filter(e=>{const t=e.subject.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase()),r="all"===Q||e.status===Q,n="all"===X||e.priority===X;return t&&r&&n}),pe=t.length,xe=t.filter(e=>"open"===e.status).length,he=t.filter(e=>"in-progress"===e.status).length,ue=t.filter(e=>"resolved"===e.status).length,ge=e=>new Date(e).toLocaleString("en-MY");return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(x,{children:"Operation Inquiry"}),(0,l.jsx)(h,{variant:"secondary",onClick:le,children:"Refresh"})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{color:"#059669",children:[(0,l.jsx)(m,{children:pe}),(0,l.jsx)(f,{children:"Total Inquiries"})]}),(0,l.jsxs)(g,{color:"#D97706",children:[(0,l.jsx)(m,{children:xe}),(0,l.jsx)(f,{children:"Open"})]}),(0,l.jsxs)(g,{color:"#2563EB",children:[(0,l.jsx)(m,{children:he}),(0,l.jsx)(f,{children:"In Progress"})]}),(0,l.jsxs)(g,{color:"#7C3AED",children:[(0,l.jsx)(m,{children:ue}),(0,l.jsx)(f,{children:"Resolved"})]})]}),(0,l.jsxs)(y,{children:[(0,l.jsx)(b,{placeholder:"Search inquiries...",value:o,onChange:e=>G(e.target.value)}),(0,l.jsxs)(j,{value:Q,onChange:e=>V(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),(0,l.jsxs)(j,{value:X,onChange:e=>Z(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"low",children:"Low"})]})]}),(0,l.jsx)(A,{children:ce.map(e=>(0,l.jsxs)(v,{onClick:()=>(e=>{te(e),ne(e.status)})(e),children:[(0,l.jsxs)(w,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(k,{children:e.ticketNumber}),(0,l.jsx)(E,{children:e.subject}),(0,l.jsxs)(C,{children:[e.requesterName," (",e.requesterRole,") - ",e.restaurantName]})]}),(0,l.jsxs)(_,{children:[(0,l.jsx)(B,{status:e.status,children:e.status}),(0,l.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)(S,{children:e.description}),(0,l.jsxs)($,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(N,{children:"Created "}),(0,l.jsx)(I,{children:ge(e.createdAt)})]}),oe[e.id]&&(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",oe[e.id].total_comments,oe[e.id].unread_count>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[oe[e.id].unread_count," new"]})]})]})]},e.id))}),ee&&(0,l.jsx)(D,{onClick:()=>te(null),children:(0,l.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(R,{children:[(0,l.jsx)(L,{children:ee.ticketNumber}),(0,l.jsx)(O,{onClick:()=>te(null),children:"\xd7"})]}),(0,l.jsxs)(P,{children:[(0,l.jsxs)(M,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Subject"}),(0,l.jsx)(J,{children:ee.subject})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Restaurant"}),(0,l.jsx)(J,{children:ee.restaurantName})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"From"}),(0,l.jsxs)(J,{children:[ee.requesterName," (",ee.requesterRole,")"]})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Priority"}),(0,l.jsx)(J,{children:(0,l.jsx)(z,{priority:ee.priority,children:ee.priority})})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Category"}),(0,l.jsx)(J,{children:ee.category})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Created"}),(0,l.jsx)(J,{children:ge(ee.createdAt)})]})]}),(0,l.jsx)(K,{children:ee.description}),(null===ee||void 0===ee?void 0:ee.attachments)&&ee.attachments.length>0&&(0,l.jsx)(s.A,{attachments:ee.attachments}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Status"}),(0,l.jsxs)(H,{children:[(0,l.jsxs)(j,{value:re,onChange:e=>ne(e.target.value),children:[(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),(0,l.jsx)(h,{variant:"primary",onClick:async()=>{if(ee)try{(await fetch(`/api/operation-tickets/${ee.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:re})})).ok&&(await le(),te(e=>e?{...e,status:re}:null))}catch(e){console.error("Error updating status:",e)}},disabled:re===ee.status,children:"Save"})]})]}),(0,l.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ee.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ie(e=>{const t={...e},r=String(ee.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]})]})})}}}]);