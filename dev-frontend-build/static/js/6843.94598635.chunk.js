"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6843],{2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,a=i.Ay.input`
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
`,s=i.Ay.select`
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
`,l=e=>{let{children:r,className:t,style:i,...a}=e;return(0,n.jsx)(o,{className:t,style:i,...a,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(a,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(s,{...t,children:r})}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),i=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,n.jsx)(x,{children:t.map((e,r)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},r))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,r)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,i})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>N});var i=t(9950),n=t(4752),o=t(4185),a=t(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
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
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=n.Ay.textarea`
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
`,w=n.Ay.div`
  display: flex;
  gap: 4px;
`,A=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=n.Ay.button`
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
`,k=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=n.Ay.input`
  display: none;
`,N=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:N}=e;const[T,D]=(0,i.useState)([]),[$,R]=(0,i.useState)(""),[I,L]=(0,i.useState)([]),[O,_]=(0,i.useState)(!1),[P,U]=(0,i.useState)(!1),q=(0,i.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&D(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{t&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),N&&N()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const M=async()=>{const e=$.trim(),i=I.length>0;if((e||i)&&!P){U(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:$.trim(),attachments:i?I:void 0})})).ok&&(R(""),L([]),J())}catch(n){console.error("Error adding comment:",n)}finally{U(!1)}}},W=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",T.length,")"]}),T.length>0?(0,a.jsx)(d,{children:T.map(e=>{var r,t,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(m,{children:W(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&J()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{value:$,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),M())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(w,{children:[(0,a.jsx)(A,{onClick:()=>{var e;return null===(e=q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:M,disabled:!$.trim()&&0===I.length||P,children:"Send"})]})]}),(I.length>0||O)&&(0,a.jsxs)(C,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),I.map((e,r)=>(0,a.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const r=I[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),L(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-I.length,i=Array.from(r).slice(0,t);if(0!==i.length){_(!0);try{const e=new FormData;i.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data&&L(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{_(!1)}}}})]})}},6843:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var i=t(9950),n=t(4752),o=t(1367),a=t(2488),s=t(4302),l=t(4414);const d=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=n.Ay.div`
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
`,p=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=n.Ay.div`
  display: flex;
  gap: 12px;
`,u=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=n.Ay.div`
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
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=n.Ay.div`
  flex: 1;
`,A=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,C=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,E=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,B=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,z=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
`,N=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,D=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=n.Ay.span`
  color: #374151;
`,R=n.Ay.div`
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
`,I=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,L=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,O=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,_=n.Ay.button`
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
`,U=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,q=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,J=n.Ay.div`
  margin-bottom: 20px;
`,M=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=n.Ay.input`
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
`,H=n.Ay.select`
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
`,K=n.Ay.textarea`
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
`,Y=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,Y]=(0,i.useState)(""),[G,Q]=(0,i.useState)("all"),[V,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)("all"),[re,te]=(0,i.useState)("all"),[ie,ne]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)(!1),[se,le]=(0,i.useState)(null),[de,ce]=(0,i.useState)(""),[pe,xe]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"});(0,i.useEffect)(()=>{const e=async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i)}}catch(e){}};e();const r=setInterval(e,1e4);return()=>clearInterval(r)},[e]);const he=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase())||e.restaurantName&&e.restaurantName.toLowerCase().includes(n.toLowerCase()),t="all"===G||e.status===G,i="all"===V||e.priority===V,o="all"===Z||e.category===Z,a="all"===re||e.customerRole===re;return r&&t&&i&&o&&a}),ue=r.length,ge=r.filter(e=>"open"===e.status).length,me=r.filter(e=>"in-progress"===e.status).length,fe=r.filter(e=>"resolved"===e.status).length,ye=e=>new Date(e).toLocaleString("en-MY");return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(x,{children:"System Inquiry"}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>{const e=he.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,e.restaurantName||"N/A",`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.createdAt,e.updatedAt]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Restaurant","Subject","Description","Status","Priority","Category","Created At","Updated At"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`manager-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,l.jsx)(u,{variant:"primary",onClick:()=>{ne(!0)},children:"Create Inquiry"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{color:"#059669",children:[(0,l.jsx)(f,{children:ue}),(0,l.jsx)(y,{children:"Total Tickets"})]}),(0,l.jsxs)(m,{color:"#D97706",children:[(0,l.jsx)(f,{children:ge}),(0,l.jsx)(y,{children:"Open Tickets"})]}),(0,l.jsxs)(m,{color:"#2563EB",children:[(0,l.jsx)(f,{children:me}),(0,l.jsx)(y,{children:"In Progress"})]}),(0,l.jsxs)(m,{color:"#7C3AED",children:[(0,l.jsx)(f,{children:fe}),(0,l.jsx)(y,{children:"Resolved"})]})]}),(0,l.jsxs)(a.Qn,{children:[(0,l.jsx)(a.DO,{type:"text",placeholder:"Search tickets, customers...",value:n,onChange:e=>Y(e.target.value)}),(0,l.jsxs)(a.Jt,{value:G,onChange:e=>Q(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]}),(0,l.jsxs)(a.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priority"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"low",children:"Low"})]}),(0,l.jsxs)(a.Jt,{value:re,onChange:e=>te(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Roles"}),(0,l.jsx)("option",{value:"manager",children:"Manager"}),(0,l.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,l.jsx)("option",{value:"staff",children:"Staff"})]}),(0,l.jsxs)(a.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Categories"}),(0,l.jsx)("option",{value:"technical",children:"Technical"}),(0,l.jsx)("option",{value:"billing",children:"Billing"}),(0,l.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,l.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,l.jsx)("option",{value:"general",children:"General"})]})]}),(0,l.jsx)(j,{children:he.map(e=>(0,l.jsxs)(b,{onClick:()=>(e=>{le(e),ce(e.status),ae(!0)})(e),children:[(0,l.jsxs)(v,{children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(A,{children:e.ticketNumber}),(0,l.jsx)(F,{children:e.subject}),(0,l.jsxs)(k,{children:[(0,l.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,l.jsx)(C,{role:e.customerRole,children:e.customerRole})]}),e.restaurantName&&(0,l.jsx)("div",{style:{marginTop:"4px",fontWeight:"500"},children:e.restaurantName})]})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(B,{status:e.status,children:e.status}),(0,l.jsx)(z,{priority:e.priority,children:e.priority})]})]}),(0,l.jsx)(S,{children:e.description}),(0,l.jsxs)(N,{children:[(0,l.jsxs)(T,{children:[(0,l.jsx)(D,{children:"Created"}),(0,l.jsx)($,{children:ye(e.createdAt)})]}),(0,l.jsxs)(T,{children:[(0,l.jsx)(D,{children:"Category"}),(0,l.jsx)($,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]})]})]},e.id))}),ie&&(0,l.jsx)(R,{onClick:()=>ne(!1),children:(0,l.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(L,{children:[(0,l.jsx)(O,{children:"Create System Inquiry"}),(0,l.jsx)(_,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,l.jsxs)(P,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(M,{children:"Subject *"}),(0,l.jsx)(W,{type:"text",value:pe.subject,onChange:e=>xe({...pe,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(M,{children:"Description *"}),(0,l.jsx)(K,{value:pe.description,onChange:e=>xe({...pe,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,l.jsxs)(q,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(M,{children:"Priority"}),(0,l.jsxs)(H,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"low",children:"Low"}),(0,l.jsx)("option",{value:"medium",children:"Medium"}),(0,l.jsx)("option",{value:"high",children:"High"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(M,{children:"Category"}),(0,l.jsxs)(H,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,l.jsx)("option",{value:"general",children:"General"}),(0,l.jsx)("option",{value:"technical",children:"Technical"}),(0,l.jsx)("option",{value:"billing",children:"Billing"}),(0,l.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,l.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)(u,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,l.jsx)(u,{variant:"primary",onClick:async()=>{try{const i={customerId:(null===e||void 0===e?void 0:e.id)||"manager-user",customerName:(null===e||void 0===e?void 0:e.name)||"Manager",customerEmail:(null===e||void 0===e?void 0:e.email)||"manager@company.com",customerRole:"manager",subject:pe.subject,description:pe.description,status:"open",priority:pe.priority,category:pe.category},n=await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!n.ok)return;{const e=await n.json(),i=e.data||e;t([i,...r])}}catch(i){return}ne(!1),xe({subject:"",description:"",priority:"medium",category:"general"})},disabled:!pe.subject||!pe.description,children:"Create Inquiry"})]})]})}),oe&&se&&(0,l.jsx)(R,{onClick:()=>ae(!1),children:(0,l.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(L,{children:[(0,l.jsx)(O,{children:"Inquiry Details"}),(0,l.jsx)(_,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,l.jsxs)(P,{children:[(0,l.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Ticket Number"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.ticketNumber})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Status"}),(0,l.jsxs)(H,{value:de,onChange:e=>(async e=>{if(se){ce(e);try{(await fetch(`/api/support-tickets/${se.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(t(r=>r.map(r=>r.id===se.id?{...r,status:e}:r)),le(r=>r?{...r,status:e}:null))}catch(r){}}})(e.target.value),children:[(0,l.jsx)("option",{value:"open",children:"Open"}),(0,l.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,l.jsx)("option",{value:"resolved",children:"Resolved"}),(0,l.jsx)("option",{value:"closed",children:"Closed"})]})]})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Priority"}),(0,l.jsx)("div",{style:{padding:"8px 0"},children:(0,l.jsx)(z,{priority:se.priority,children:se.priority})})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Category"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:se.category.replace("-"," ")})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Customer Information"}),(0,l.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,l.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[se.customerName,(0,l.jsx)(C,{role:se.customerRole,style:{marginLeft:"8px"},children:se.customerRole})]}),(0,l.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:se.customerEmail}),se.restaurantName&&(0,l.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",marginTop:"4px"},children:se.restaurantName})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Subject"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:se.subject})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Description"}),(0,l.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:se.description})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Created At"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye(se.createdAt)})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)(M,{children:"Last Updated"}),(0,l.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:ye(se.updatedAt)})]})]})]}),(0,l.jsx)(s.A,{entityType:"support_ticket",entityId:se.id,currentUserId:null===e||void 0===e?void 0:e.id})]}),(0,l.jsx)(U,{children:(0,l.jsx)(u,{variant:"secondary",onClick:()=>ae(!1),children:"Close"})})]})})]})]})})}}}]);