"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4185:(e,r,t)=>{t.d(r,{A:()=>g});var o=t(8819),n=(t(9950),t(4752)),i=t(4414);const s=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
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
`;const g=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),o=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(s,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,i.jsx)(h,{children:t.map((e,r)=>(0,i.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),o.length>0&&(0,i.jsx)(l,{children:o.map((e,r)=>{return(0,i.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(c,{children:(o=e.mimeType,"application/pdf"===o?"\ud83d\udcc4":o.includes("word")||o.includes("document")?"\ud83d\udcdd":o.includes("sheet")||o.includes("excel")?"\ud83d\udcca":o.includes("zip")||o.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(x,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,o})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>T});var o=t(8819),n=t(9950),i=t(4752),s=t(4185),a=t(4414);const l=i.Ay.div`
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
`,E=i.Ay.p`
  font-size: 13px;
  color: ${o.w.colors.text.placeholder};
  text-align: center;
  padding: 12px 0;
`,C=i.Ay.div`
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
`,D=i.Ay.label`
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
`,T=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:i}=e;const[T,L]=(0,n.useState)([]),[R,M]=(0,n.useState)(""),[O,P]=(0,n.useState)(!1),[q,U]=(0,n.useState)([]),[J,H]=(0,n.useState)(!1),[W,K]=(0,n.useState)(""),[Y,Q]=(0,n.useState)(!1),G=(0,n.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),i&&i(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const X=async()=>{if(J)return;const e=R.trim(),o=q.length>0;if((e||o)&&!Y){Q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:R.trim(),attachments:o?q:void 0,is_internal:O||void 0})})).ok&&(M(""),U([]),P(!1),V())}catch(n){console.error("Error adding comment:",n)}finally{Q(!1)}}},Z=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(l,{children:[(0,a.jsxs)(d,{children:["Comments (",T.length,")"]}),T.length>0?(0,a.jsx)(c,{children:T.map(e=>{var r,t,n;return(0,a.jsxs)(p,{isInternal:e.is_internal,children:[(0,a.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(h,{children:[(0,a.jsxs)(u,{children:[(0,a.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,a.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),e.is_internal&&(0,a.jsx)(f,{children:"Internal"}),(0,a.jsx)(y,{children:Z(e.createdAt)}),o&&e.author_id===o&&(0,a.jsx)(b,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&V()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(w,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(s.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(E,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(v,{children:[(0,a.jsx)(A,{value:R,onChange:e=>M(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:O?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(k,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)($,{onClick:X,disabled:!R.trim()&&0===q.length||Y||J,children:"Send"})]})]}),(0,a.jsx)(N,{children:(0,a.jsxs)(D,{children:[(0,a.jsx)("input",{type:"checkbox",checked:O,onChange:e=>P(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(q.length>0||J||W)&&(0,a.jsxs)(C,{children:[J&&(0,a.jsx)(B,{children:"Uploading..."}),W&&(0,a.jsx)(_,{children:W}),q.map((e,r)=>(0,a.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(S,{onClick:()=>(e=>{const r=q[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),U(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(I,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-q.length,o=Array.from(r).slice(0,t);if(e.target.value="",0!==o.length){H(!0),K("");try{const e=new FormData;o.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data?U(e=>[...e,...n.data]):K(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),K("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},9889:(e,r,t)=>{t.r(r),t.d(r,{default:()=>U});var o=t(8819),n=t(9950),i=t(4752),s=t(1367),a=t(4302),l=t(4185),d=t(2674),c=t(4414);const p=i.Ay.div`
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
`,g=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${o.w.colors.border};\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,y=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${o.w.colors.secondary};
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: ${o.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${o.w.colors.border};
`,j=i.Ay.input`
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
`,v=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=i.Ay.div`
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
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,$=i.Ay.div`
  flex: 1;
`,E=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,z=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,S=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,_=i.Ay.div`
  font-size: 14px;
  color: ${o.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: ${o.w.colors.surfaceHover};
  border-radius: 8px;
  border-left: 3px solid ${o.w.colors.border};
`,I=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${o.w.colors.surfaceMuted};
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,D=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,T=i.Ay.span`
  color: ${o.w.colors.text.dark};
`,L=i.Ay.div`
  background: ${o.w.colors.surfaceHover};
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,R=i.Ay.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,M=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,O=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,P=i.Ay.div`
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
`,q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,U=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)([]),[o,i]=(0,n.useState)(""),[U,J]=(0,n.useState)("all"),[H,W]=(0,n.useState)("all"),[K,Y]=(0,n.useState)(null),[Q,G]=(0,n.useState)(""),[V,X]=(0,n.useState)({}),Z=null===e||void 0===e?void 0:e.id,ee=(null===e||void 0===e?void 0:e.role)||"Brand Manager";(0,n.useEffect)(()=>{re();const e=setInterval(re,1e4);return()=>clearInterval(e)},[]);const re=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${Z}&userRole=${ee}`);if(e.ok){const r=await e.json();t(r),te(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},te=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),X(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},oe=r.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase()),t="all"===U||e.status===U,n="all"===H||e.priority===H;return r&&t&&n}),ne=r.length,ie=r.filter(e=>"open"===e.status).length,se=r.filter(e=>"in-progress"===e.status).length,ae=r.filter(e=>"resolved"===e.status).length,le=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Operation Inquiry"}),(0,c.jsx)(g,{variant:"secondary",onClick:re,children:"Refresh"})]}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(f,{color:"#059669",children:[(0,c.jsx)(y,{children:ne}),(0,c.jsx)(w,{children:"Total Inquiries"})]}),(0,c.jsxs)(f,{color:"#D97706",children:[(0,c.jsx)(y,{children:ie}),(0,c.jsx)(w,{children:"Open"})]}),(0,c.jsxs)(f,{color:"#2563EB",children:[(0,c.jsx)(y,{children:se}),(0,c.jsx)(w,{children:"In Progress"})]}),(0,c.jsxs)(f,{color:"#7C3AED",children:[(0,c.jsx)(y,{children:ae}),(0,c.jsx)(w,{children:"Resolved"})]})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(j,{placeholder:"Search inquiries...",value:o,onChange:e=>i(e.target.value)}),(0,c.jsxs)(v,{value:U,onChange:e=>J(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]}),(0,c.jsxs)(v,{value:H,onChange:e=>W(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priority"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"}),(0,c.jsx)("option",{value:"high",children:"High"}),(0,c.jsx)("option",{value:"medium",children:"Medium"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})]}),(0,c.jsx)(A,{children:oe.map(e=>(0,c.jsxs)(k,{onClick:()=>(e=>{Y(e),G(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(E,{children:e.ticketNumber}),(0,c.jsx)(C,{children:e.subject}),(0,c.jsxs)(z,{children:[e.requesterName," (",e.requesterRole,") - ",e.restaurantName]})]}),(0,c.jsxs)(I,{children:[(0,c.jsx)(S,{status:e.status,children:e.status}),(0,c.jsx)(B,{priority:e.priority,children:e.priority})]})]}),(0,c.jsx)(_,{children:e.description}),(0,c.jsxs)(N,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:"Created "}),(0,c.jsx)(T,{children:le(e.createdAt)})]}),V[e.id]&&(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",V[e.id].total_comments,V[e.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[V[e.id].unread_count," new"]})]})]})]},e.id))}),K&&(0,c.jsx)(d.mH,{onClick:()=>Y(null),children:(0,c.jsxs)(d.$m,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(d.rQ,{children:[(0,c.jsx)(d.wt,{children:K.ticketNumber}),(0,c.jsx)(d.Jn,{onClick:()=>Y(null),children:"\xd7"})]}),(0,c.jsxs)(d.cw,{children:[(0,c.jsxs)(L,{children:[(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"Subject"}),(0,c.jsx)(O,{children:K.subject})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"Restaurant"}),(0,c.jsx)(O,{children:K.restaurantName})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"From"}),(0,c.jsxs)(O,{children:[K.requesterName," (",K.requesterRole,")"]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"Priority"}),(0,c.jsx)(O,{children:(0,c.jsx)(B,{priority:K.priority,children:K.priority})})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"Category"}),(0,c.jsx)(O,{children:K.category})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(M,{children:"Created"}),(0,c.jsx)(O,{children:le(K.createdAt)})]})]}),(0,c.jsx)(P,{children:K.description}),(null===K||void 0===K?void 0:K.attachments)&&K.attachments.length>0&&(0,c.jsx)(l.A,{attachments:K.attachments}),(0,c.jsxs)(d.gE,{children:[(0,c.jsx)(d.lR,{children:"Status"}),(0,c.jsxs)(q,{children:[(0,c.jsxs)(v,{value:Q,onChange:e=>G(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:"Open"}),(0,c.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,c.jsx)("option",{value:"resolved",children:"Resolved"}),(0,c.jsx)("option",{value:"closed",children:"Closed"})]}),(0,c.jsx)(g,{variant:"primary",onClick:async()=>{if(K)try{(await fetch(`/api/operation-tickets/${K.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:Q})})).ok&&(await re(),Y(e=>e?{...e,status:Q}:null))}catch(e){console.error("Error updating status:",e)}},disabled:Q===K.status,children:"Save"})]})]}),(0,c.jsx)(a.A,{entityType:"operation_ticket",entityId:String(K.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>X(e=>{const r={...e},t=String(K.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}}}]);