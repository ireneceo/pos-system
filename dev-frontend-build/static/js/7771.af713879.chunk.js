"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{4185:(e,r,t)=>{t.d(r,{A:()=>g});var o=t(8819),n=(t(9950),t(4752)),i=t(4414);const a=n.Ay.div`
  margin-top: 12px;
`,s=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${o.w.colors.text.muted};
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,d=n.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid ${o.w.colors.border};
  border-radius: 6px;
  text-decoration: none;
  color: ${o.w.colors.secondary};
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: ${o.w.colors.primary};
    background: #F4F3FF;
  }
`,c=n.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=n.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,x=n.Ay.span`
  color: ${o.w.colors.text.placeholder};
  flex-shrink: 0;
  font-size: 11px;
`,h=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,u=n.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${o.w.colors.border};
  transition: all 0.15s;

  &:hover {
    border-color: ${o.w.colors.primary};
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const g=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),o=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(a,{children:[(0,i.jsxs)(s,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,i.jsx)(h,{children:t.map((e,r)=>(0,i.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),o.length>0&&(0,i.jsx)(l,{children:o.map((e,r)=>{return(0,i.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(c,{children:(o=e.mimeType,"application/pdf"===o?"\ud83d\udcc4":o.includes("word")||o.includes("document")?"\ud83d\udcdd":o.includes("sheet")||o.includes("excel")?"\ud83d\udcca":o.includes("zip")||o.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(x,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,o})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>D});var o=t(8819),n=t(9950),i=t(4752),a=t(4185),s=t(4414);const l=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid ${o.w.colors.border};
  padding-top: 20px;
`,d=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${o.w.colors.secondary};
  margin: 0 0 16px 0;
`,c=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,p=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=i.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${o.w.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,h=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: ${o.w.colors.secondary};
`,m=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${o.w.colors.status.warningLightAlt};
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=i.Ay.span`
  font-size: 11px;
  color: ${o.w.colors.text.placeholder};
  margin-left: auto;
`,w=i.Ay.p`
  font-size: 13px;
  color: ${o.w.colors.text.dark};
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=i.Ay.button`
  background: none;
  border: none;
  color: ${o.w.colors.text.placeholder};
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }
  &::placeholder { color: ${o.w.colors.text.placeholder}; }
`,k=i.Ay.div`
  display: flex;
  gap: 4px;
`,F=i.Ay.button`
  padding: 10px 12px;
  background: ${o.w.colors.surfaceMuted};
  color: ${o.w.colors.text.muted};
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${o.w.colors.borderLight}; color: ${o.w.colors.secondary}; }
`,$=i.Ay.button`
  padding: 10px 16px;
  background: ${o.w.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,C=i.Ay.p`
  font-size: 13px;
  color: ${o.w.colors.text.placeholder};
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: ${o.w.colors.primary};
`,S=i.Ay.button`
  background: none;
  border: none;
  color: ${o.w.colors.text.placeholder};
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,B=i.Ay.span`
  font-size: 11px;
  color: ${o.w.colors.primary};
  padding: 3px 8px;
`,_=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,I=i.Ay.input`
  display: none;
`,N=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${o.w.colors.text.muted};
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: ${o.w.colors.status.warningAlt};
    cursor: pointer;
  }
`,D=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:i}=e;const[D,L]=(0,n.useState)([]),[R,O]=(0,n.useState)(""),[P,M]=(0,n.useState)(!1),[q,U]=(0,n.useState)([]),[J,H]=(0,n.useState)(!1),[W,K]=(0,n.useState)(""),[Y,G]=(0,n.useState)(!1),Q=(0,n.useRef)(null),X=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(X(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),i&&i(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const V=async()=>{if(J)return;const e=R.trim(),o=q.length>0;if((e||o)&&!Y){G(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:R.trim(),attachments:o?q:void 0,is_internal:P||void 0})})).ok&&(O(""),U([]),M(!1),X())}catch(n){console.error("Error adding comment:",n)}finally{G(!1)}}},Z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",D.length,")"]}),D.length>0?(0,s.jsx)(c,{children:D.map(e=>{var r,t,n;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),e.is_internal&&(0,s.jsx)(f,{children:"Internal"}),(0,s.jsx)(y,{children:Z(e.createdAt)}),o&&e.author_id===o&&(0,s.jsx)(b,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&X()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(w,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(a.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(C,{children:"No comments yet"}),(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsx)(A,{value:R,onChange:e=>O(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),V())},placeholder:P?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(k,{children:[(0,s.jsx)(F,{onClick:()=>{var e;return null===(e=Q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)($,{onClick:V,disabled:!R.trim()&&0===q.length||Y||J,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(T,{children:[(0,s.jsx)("input",{type:"checkbox",checked:P,onChange:e=>M(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(q.length>0||J||W)&&(0,s.jsxs)(E,{children:[J&&(0,s.jsx)(B,{children:"Uploading..."}),W&&(0,s.jsx)(_,{children:W}),q.map((e,r)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const r=q[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),U(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(I,{ref:Q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-q.length,o=Array.from(r).slice(0,t);if(e.target.value="",0!==o.length){H(!0),K("");try{const e=new FormData;o.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data?U(e=>[...e,...n.data]):K(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),K("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},7771:(e,r,t)=>{t.r(r),t.d(r,{default:()=>U});var o=t(8819),n=t(9950),i=t(4752),a=t(1367),s=t(4302),l=t(4185),d=t(2674),c=t(4414);const p=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${o.w.colors.border};\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,w=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${o.w.colors.secondary};
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: ${o.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${o.w.colors.border};
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,F=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
  }
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,C=i.Ay.div`
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
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,z=i.Ay.div`
  flex: 1;
  min-width: 0;
`,S=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,B=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,_=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,I=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,N=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=i.Ay.div`
  font-size: 14px;
  color: ${o.w.colors.text.muted};
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: ${o.w.colors.surfaceHover};
  border-radius: 8px;
  border-left: 3px solid ${o.w.colors.border};
  word-break: break-word;
  overflow-wrap: break-word;
`,L=i.Ay.div`
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
`,R=i.Ay.div`
  background: ${o.w.colors.surfaceHover};
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,O=i.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,P=i.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,M=i.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,q=i.Ay.div`
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
`,U=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)([]),[o,i]=(0,n.useState)(""),[U,J]=(0,n.useState)("all"),[H,W]=(0,n.useState)("all"),[K,Y]=(0,n.useState)(null),[G,Q]=(0,n.useState)("open"),[X,V]=(0,n.useState)({}),Z=(null===e||void 0===e?void 0:e.id)||"2",ee=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,n.useEffect)(()=>{if(e){re();const e=setInterval(re,1e4);return()=>clearInterval(e)}},[e]);const re=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${Z}&userRole=${ee}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),te(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},te=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),V(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},oe=r.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.restaurantName.toLowerCase().includes(o.toLowerCase()),t="all"===U||e.status===U,n="all"===H||e.priority===H;return r&&t&&n}),ne=r.length,ie=r.filter(e=>"open"===e.status).length,ae=r.filter(e=>"in-progress"===e.status).length,se=r.filter(e=>"resolved"===e.status).length,le=e=>new Date(e).toLocaleString("en-MY"),de=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Operation Inquiry"}),(0,c.jsx)(g,{children:(0,c.jsx)(m,{variant:"secondary",onClick:re,children:"Refresh"})})]}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)(y,{borderColor:"#635BFF",children:[(0,c.jsx)(w,{children:ne}),(0,c.jsx)(b,{children:"Total Inquiries"})]}),(0,c.jsxs)(y,{borderColor:"#F59E0B",children:[(0,c.jsx)(w,{children:ie}),(0,c.jsx)(b,{children:"Open"})]}),(0,c.jsxs)(y,{borderColor:"#3B82F6",children:[(0,c.jsx)(w,{children:ae}),(0,c.jsx)(b,{children:"In Progress"})]}),(0,c.jsxs)(y,{borderColor:"#10B981",children:[(0,c.jsx)(w,{children:se}),(0,c.jsx)(b,{children:"Resolved"})]})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:[(0,c.jsx)(A,{children:"Search"}),(0,c.jsx)(k,{placeholder:"Search inquiries...",value:o,onChange:e=>i(e.target.value)})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(A,{children:"Status"}),(0,c.jsxs)(F,{value:U,onChange:e=>J(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(A,{children:"Priority"}),(0,c.jsxs)(F,{value:H,onChange:e=>W(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,c.jsxs)($,{children:[oe.map(e=>(0,c.jsxs)(C,{onClick:()=>(e=>{Y(e),Q(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,c.jsxs)(E,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(S,{children:e.ticketNumber}),(0,c.jsx)(B,{children:e.subject}),(0,c.jsxs)(_,{children:[(0,c.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,c.jsxs)("span",{children:["From: ",e.requesterName]}),(0,c.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)(N,{status:e.status,children:e.status}),(0,c.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(D,{children:e.description}),(0,c.jsxs)(L,{children:[(0,c.jsxs)("span",{children:["Created: ",le(e.createdAt)]}),e.responseTime>0&&(0,c.jsxs)("span",{children:["Response Time: ",de(e.responseTime)]}),X[e.id]&&(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",X[e.id].total_comments,X[e.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[X[e.id].unread_count," new"]})]})]})]},e.id)),0===oe.length&&(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,c.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,c.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),K&&(0,c.jsx)(d.mH,{onClick:()=>Y(null),children:(0,c.jsxs)(d.$m,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(d.rQ,{children:[(0,c.jsx)(d.wt,{children:K.ticketNumber}),(0,c.jsx)(d.Jn,{onClick:()=>Y(null),children:"\xd7"})]}),(0,c.jsxs)(d.cw,{children:[(0,c.jsxs)(R,{children:[(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Subject:"}),(0,c.jsx)(M,{children:K.subject})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Restaurant:"}),(0,c.jsx)(M,{children:K.restaurantName})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"From:"}),(0,c.jsx)(M,{children:K.requesterName})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Priority:"}),(0,c.jsx)(M,{children:(0,c.jsx)(T,{priority:K.priority,children:K.priority})})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Category:"}),(0,c.jsx)(M,{children:K.category})]}),(0,c.jsxs)(O,{children:[(0,c.jsx)(P,{children:"Created:"}),(0,c.jsx)(M,{children:le(K.createdAt)})]})]}),(0,c.jsx)(d.lR,{children:"Description"}),(0,c.jsx)(q,{children:K.description}),(null===K||void 0===K?void 0:K.attachments)&&K.attachments.length>0&&(0,c.jsx)(l.A,{attachments:K.attachments}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(d.lR,{children:"Status"}),(0,c.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,c.jsxs)(d.FX,{value:G,onChange:e=>Q(e.target.value),style:{flex:1},children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]}),G!==K.status&&(0,c.jsx)(m,{variant:"primary",onClick:async()=>{if(K&&G!==K.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${K.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:G,..."resolved"===G&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),o=e.data||e;t(e=>e.map(e=>e.id===K.id?{...e,...o}:e)),Y(e=>e?{...e,...o}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,c.jsx)(s.A,{entityType:"operation_ticket",entityId:String(K.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>V(e=>{const r={...e},t=String(K.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);