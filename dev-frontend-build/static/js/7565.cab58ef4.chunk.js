"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7565],{4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),o=t(4414);const i=n.Ay.div`
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
`,p=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,c=n.Ay.span`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),n=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,o.jsx)(x,{children:t.map((e,r)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},r))}),n.length>0&&(0,o.jsx)(s,{children:n.map((e,r)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(p,{children:e.originalName}),(0,o.jsx)(c,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,n})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>_});var n=t(9950),o=t(4752),i=t(4185),a=t(4414);const s=o.Ay.div`
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
`,p=o.Ay.div`
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
`,w=o.Ay.textarea`
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
`,A=o.Ay.div`
  display: flex;
  gap: 4px;
`,v=o.Ay.button`
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
`,B=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,C=o.Ay.button`
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
`,_=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:_}=e;const[$,I]=(0,n.useState)([]),[N,T]=(0,n.useState)(""),[D,L]=(0,n.useState)([]),[R,O]=(0,n.useState)(!1),[P,M]=(0,n.useState)(!1),q=(0,n.useRef)(null),U=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&I(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(U(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),_&&_()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const J=async()=>{const e=N.trim(),n=D.length>0;if((e||n)&&!P){M(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:N.trim(),attachments:n?D:void 0})})).ok&&(T(""),L([]),U())}catch(o){console.error("Error adding comment:",o)}finally{M(!1)}}},K=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",$.length,")"]}),$.length>0?(0,a.jsx)(d,{children:$.map(e=>{var r,t,n;return(0,a.jsxs)(p,{children:[(0,a.jsx)(c,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),(0,a.jsx)(m,{children:K(e.createdAt)}),o&&e.author_id===o&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&U()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(w,{value:N,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),J())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(v,{onClick:()=>{var e;return null===(e=q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:J,disabled:!N.trim()&&0===D.length||P,children:"Send"})]})]}),(D.length>0||R)&&(0,a.jsxs)(E,{children:[R&&(0,a.jsx)(z,{children:"Uploading..."}),D.map((e,r)=>(0,a.jsxs)(B,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(C,{onClick:()=>(e=>{const r=D[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),L(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-D.length,n=Array.from(r).slice(0,t);if(0!==n.length){O(!0);try{const e=new FormData;n.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),o=await t.json();o.success&&o.data&&L(e=>[...e,...o.data])}catch(o){console.error("File upload error:",o)}finally{O(!1)}}}})]})}},7565:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Q});var n=t(9950),o=t(4752),i=t(1367),a=t(4302),s=t(4185),l=t(4414);const d=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=o.Ay.div`
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
`,x=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=o.Ay.div`
  display: flex;
  gap: 12px;
`,u=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,j=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,w=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=o.Ay.input`
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
`,v=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=o.Ay.div`
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
`,E=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=o.Ay.div`
  flex: 1;
`,C=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,S=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,_=o.Ay.div`
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
`,I=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,T=o.Ay.div`
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
`,L=o.Ay.div`
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
`,O=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,P=o.Ay.button`
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
`,M=o.Ay.div`
  padding: 24px;
`,q=(o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,o.Ay.div`
  margin-bottom: 20px;
`),U=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
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
`,K=o.Ay.div`
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
`,Y=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,G=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,H=o.Ay.div`
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
`,Q=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)([]),[o,Q]=(0,n.useState)(""),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)("all"),[re,te]=(0,n.useState)(null),[ne,oe]=(0,n.useState)("open"),[ie,ae]=(0,n.useState)({}),se=(null===e||void 0===e?void 0:e.id)||"4",le=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,n.useEffect)(()=>{if(e){de();const e=setInterval(de,1e4);return()=>clearInterval(e)}},[e]);const de=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${se}&userRole=${le}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),pe(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},pe=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ce=r.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.restaurantName.toLowerCase().includes(o.toLowerCase()),t="all"===V||e.status===V,n="all"===Z||e.priority===Z;return r&&t&&n}),xe=r.length,he=r.filter(e=>"open"===e.status).length,ue=r.filter(e=>"in-progress"===e.status).length,ge=r.filter(e=>"resolved"===e.status).length,me=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY")),fe=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:"Operation Inquiry"}),(0,l.jsx)(h,{children:(0,l.jsx)(u,{variant:"secondary",onClick:de,children:"Refresh"})})]}),(0,l.jsxs)(c,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{borderColor:"#635BFF",children:[(0,l.jsx)(f,{children:xe}),(0,l.jsx)(y,{children:"Total Inquiries"})]}),(0,l.jsxs)(m,{borderColor:"#F59E0B",children:[(0,l.jsx)(f,{children:he}),(0,l.jsx)(y,{children:"Open"})]}),(0,l.jsxs)(m,{borderColor:"#3B82F6",children:[(0,l.jsx)(f,{children:ue}),(0,l.jsx)(y,{children:"In Progress"})]}),(0,l.jsxs)(m,{borderColor:"#10B981",children:[(0,l.jsx)(f,{children:ge}),(0,l.jsx)(y,{children:"Resolved"})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:"Search"}),(0,l.jsx)(A,{placeholder:"Search inquiries...",value:o,onChange:e=>Q(e.target.value)})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:"Status"}),(0,l.jsxs)(v,{value:V,onChange:e=>X(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:"Priority"}),(0,l.jsxs)(v,{value:Z,onChange:e=>ee(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,l.jsxs)(F,{children:[ce.map(e=>(0,l.jsxs)(k,{onClick:()=>(e=>{te(e),oe(e.status)})(e),children:[(0,l.jsxs)(E,{children:[(0,l.jsxs)(B,{children:[(0,l.jsx)(C,{children:e.ticketNumber}),(0,l.jsx)(z,{children:e.subject}),(0,l.jsxs)(S,{children:[(0,l.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,l.jsxs)("span",{children:["From: ",e.requesterName]}),(0,l.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,l.jsxs)(_,{children:[(0,l.jsx)($,{status:e.status,children:e.status}),(0,l.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)(N,{children:e.description}),(0,l.jsxs)(T,{children:[(0,l.jsxs)("span",{children:["Created: ",me(e.createdAt)]}),e.responseTime>0&&(0,l.jsxs)("span",{children:["Response Time: ",fe(e.responseTime)]}),ie[e.id]&&(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ie[e.id].total_comments,ie[e.id].unread_count>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ie[e.id].unread_count," new"]})]})]})]},e.id)),0===ce.length&&(0,l.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,l.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,l.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),re&&(0,l.jsx)(D,{onClick:()=>te(null),children:(0,l.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(R,{children:[(0,l.jsx)(O,{children:re.ticketNumber}),(0,l.jsx)(P,{onClick:()=>te(null),children:"\xd7"})]}),(0,l.jsxs)(M,{children:[(0,l.jsxs)(K,{children:[(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Subject:"}),(0,l.jsx)(G,{children:re.subject})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Restaurant:"}),(0,l.jsx)(G,{children:re.restaurantName})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"From:"}),(0,l.jsx)(G,{children:re.requesterName})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Priority:"}),(0,l.jsx)(G,{children:(0,l.jsx)(I,{priority:re.priority,children:re.priority})})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Category:"}),(0,l.jsx)(G,{children:re.category})]}),(0,l.jsxs)(W,{children:[(0,l.jsx)(Y,{children:"Created:"}),(0,l.jsx)(G,{children:me(re.createdAt)})]})]}),(0,l.jsx)(U,{children:"Description"}),(0,l.jsx)(H,{children:re.description}),(null===re||void 0===re?void 0:re.attachments)&&re.attachments.length>0&&(0,l.jsx)(s.A,{attachments:re.attachments}),(0,l.jsxs)(q,{children:[(0,l.jsx)(U,{children:"Status"}),(0,l.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,l.jsxs)(J,{value:ne,onChange:e=>oe(e.target.value),style:{flex:1},children:[(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),ne!==re.status&&(0,l.jsx)(u,{variant:"primary",onClick:async()=>{if(re&&ne!==re.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${re.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ne,..."resolved"===ne&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===re.id?{...e,...n}:e)),te(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,l.jsx)(a.A,{entityType:"operation_ticket",entityId:String(re.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ae(e=>{const r={...e},t=String(re.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);