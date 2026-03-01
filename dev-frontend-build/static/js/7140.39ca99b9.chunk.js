"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var o=r(8819),n=(r(9950),r(4752)),i=r(4414);const a=n.Ay.div`
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
`,l=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${o.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
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
`,s=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }

  &:disabled {
    background: ${o.w.colors.surfaceHover};
    color: ${o.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:r,style:o,...n}=e;return(0,i.jsx)(a,{className:r,style:o,...n,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(l,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>g});var o=r(8819),n=(r(9950),r(4752)),i=r(4414);const a=n.Ay.div`
  margin-top: 12px;
`,l=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${o.w.colors.text.muted};
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=n.Ay.div`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),o=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,i.jsxs)(a,{children:[(0,i.jsxs)(l,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,i.jsx)(h,{children:r.map((e,t)=>(0,i.jsx)(u,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},t))}),o.length>0&&(0,i.jsx)(s,{children:o.map((e,t)=>{return(0,i.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(c,{children:(o=e.mimeType,"application/pdf"===o?"\ud83d\udcc4":o.includes("word")||o.includes("document")?"\ud83d\udcdd":o.includes("sheet")||o.includes("excel")?"\ud83d\udcca":o.includes("zip")||o.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(x,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,o})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>L});var o=r(8819),n=r(9950),i=r(4752),a=r(4185),l=r(4414);const s=i.Ay.div`
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
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=i.Ay.div`
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
`,$=i.Ay.button`
  padding: 10px 12px;
  background: ${o.w.colors.surfaceMuted};
  color: ${o.w.colors.text.muted};
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${o.w.colors.borderLight}; color: ${o.w.colors.secondary}; }
`,F=i.Ay.button`
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
`,z=i.Ay.p`
  font-size: 13px;
  color: ${o.w.colors.text.placeholder};
  text-align: center;
  padding: 12px 0;
`,E=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,S=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: ${o.w.colors.primary};
`,C=i.Ay.button`
  background: none;
  border: none;
  color: ${o.w.colors.text.placeholder};
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,_=i.Ay.span`
  font-size: 11px;
  color: ${o.w.colors.primary};
  padding: 3px 8px;
`,B=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,I=i.Ay.input`
  display: none;
`,D=i.Ay.div`
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
`,L=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:i}=e;const[L,N]=(0,n.useState)([]),[U,O]=(0,n.useState)(""),[R,J]=(0,n.useState)(!1),[M,G]=(0,n.useState)([]),[P,W]=(0,n.useState)(!1),[H,Y]=(0,n.useState)(""),[K,Q]=(0,n.useState)(!1),q=(0,n.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&N(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),i&&i(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const X=async()=>{if(P)return;const e=U.trim(),o=M.length>0;if((e||o)&&!K){Q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:U.trim(),attachments:o?M:void 0,is_internal:R||void 0})})).ok&&(O(""),G([]),J(!1),V())}catch(n){console.error("Error adding comment:",n)}finally{Q(!1)}}},Z=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),o=Math.floor(r/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(s,{children:[(0,l.jsxs)(d,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(c,{children:L.map(e=>{var t,r,n;return(0,l.jsxs)(p,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,l.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),e.is_internal&&(0,l.jsx)(f,{children:"Internal"}),(0,l.jsx)(y,{children:Z(e.createdAt)}),o&&e.author_id===o&&(0,l.jsx)(b,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&V()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(w,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(a.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(z,{children:"No comments yet"}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(A,{value:U,onChange:e=>O(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)($,{onClick:()=>{var e;return null===(e=q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(F,{onClick:X,disabled:!U.trim()&&0===M.length||K||P,children:"Send"})]})]}),(0,l.jsx)(D,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:R,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(M.length>0||P||H)&&(0,l.jsxs)(E,{children:[P&&(0,l.jsx)(_,{children:"Uploading..."}),H&&(0,l.jsx)(B,{children:H}),M.map((e,t)=>(0,l.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(C,{onClick:()=>(e=>{const t=M[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),G(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(I,{ref:q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const r=5-M.length,o=Array.from(t).slice(0,r);if(e.target.value="",0!==o.length){W(!0),Y("");try{const e=new FormData;o.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),n=await r.json();n.success&&n.data?G(e=>[...e,...n.data]):Y(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),Y("File upload failed. Please try again.")}finally{W(!1)}}}})]})}},7140:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var o=r(8819),n=r(9950),i=r(4752),a=r(4492),l=r(3832),s=r(5665),d=r(2488),c=r(4185),p=r(4302),x=r(1367),h=r(2674),u=r(4414);const g=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.isUnread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=i.Ay.div`
  flex: 1;
  min-width: 0;
`,b=i.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,v=i.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,j=i.Ay.div`
  font-size: 14px;
  color: ${o.w.colors.text.muted};
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,A=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,k=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,$=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,F=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,z=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,E=i.Ay.span`
  font-size: 12px;
  color: ${o.w.colors.text.muted};
  display: flex;
  align-items: center;
  gap: 4px;
`,S=i.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,C=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: ${o.w.colors.text.muted};

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #6B7280;
  }
`,_=i.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?`\n    background: ${o.w.colors.primary};\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  `:`\n    background: white;\n    color: ${o.w.colors.text.muted};\n    border: 1px solid ${o.w.colors.border};\n\n    &:hover {\n      background: ${o.w.colors.surfaceHover};\n      color: ${o.w.colors.secondary};\n      border-color: #CBD5E1;\n    }\n  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,B=i.Ay.div`
  margin-bottom: 24px;
`,I=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${o.w.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,D=i.Ay.div`
  font-size: 14px;
  color: ${o.w.colors.text.dark};
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: ${o.w.colors.surfaceHover};
  border-radius: 8px;
  border: 1px solid ${o.w.colors.border};
  min-height: 80px;
`,T=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,L=i.Ay.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
`,N=i.Ay.div`
  flex: 1;
`,U=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,O=i.Ay.div`
  font-size: 12px;
  color: ${o.w.colors.text.muted};
`,R=i.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,J=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,M=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,G=i.Ay.span`
  font-size: 14px;
  color: #374151;
`,P=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,W=()=>{const{restaurantId:e}=(0,a.g)(),[t,r]=(0,n.useState)([]),[o,i]=(0,n.useState)(!0),[W,H]=(0,n.useState)(""),[Y,K]=(0,n.useState)("all"),[Q,q]=(0,n.useState)("all"),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)(!1),[te,re]=(0,n.useState)(null),[oe,ne]=(0,n.useState)(null),[ie,ae]=(0,n.useState)({}),{user:le}=(0,x.As)(),se=localStorage.getItem("auth_token"),de=async()=>{try{i(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${se}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),o=t.data||t,n=Array.isArray(o)?o:[];r(n),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${se}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ae(t)}}}catch(t){}})(n)}}catch(e){console.error("Failed to fetch notices:",e)}finally{i(!1)}};(0,n.useEffect)(()=>{de()},[]);const ce=e=>{re(e),ne(null),ee(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${se}`,"Content-Type":"application/json"}});if(t.ok){const o=await t.json(),n=o.data||o;ne(n),r(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id)},pe=()=>{ee(!1),re(null),ne(null)},xe=t.filter(e=>{const t=e.title.toLowerCase().includes(W.toLowerCase())||e.content.toLowerCase().includes(W.toLowerCase())||e.author_name.toLowerCase().includes(W.toLowerCase()),r="all"===Y||e.priority===Y,o="all"===Q||(e.category||"general")===Q,n="all"===V||e.author_role===V;return t&&r&&o&&n}),he=t.length,ue=t.filter(e=>!e.read_at).length,ge=t.filter(e=>"important"===e.priority).length,me=t.filter(e=>"urgent"===e.priority).length,fe=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,u.jsxs)(l.mc,{children:[(0,u.jsx)(l.Y9,{children:(0,u.jsx)(l.hE,{children:"Notices"})}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{color:"#635BFF",children:[(0,u.jsx)(s.Os,{children:he}),(0,u.jsx)(s.v0,{children:"Total Received"})]}),(0,u.jsxs)(s.hI,{color:"#2563EB",children:[(0,u.jsx)(s.Os,{children:ue}),(0,u.jsx)(s.v0,{children:"Unread"})]}),(0,u.jsxs)(s.hI,{color:"#D97706",children:[(0,u.jsx)(s.Os,{children:ge}),(0,u.jsx)(s.v0,{children:"Important"})]}),(0,u.jsxs)(s.hI,{color:"#DC2626",children:[(0,u.jsx)(s.Os,{children:me}),(0,u.jsx)(s.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>q(e),style:{padding:"6px 16px",borderRadius:"20px",border:Q===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:Q===e?"#F0EFFF":"white",color:Q===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:Q===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(g,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:W,onChange:e=>H(e.target.value)}),(0,u.jsxs)(d.Jt,{value:V,onChange:e=>X(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(d.Jt,{value:Y,onChange:e=>K(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),o?(0,u.jsx)(P,{children:"Loading notices..."}):0===xe.length?(0,u.jsxs)(C,{children:[(0,u.jsx)("h3",{children:"No notices found"}),(0,u.jsx)("p",{children:W||"all"!==Y?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,u.jsx)(m,{children:xe.map(e=>{var t;const r=!e.read_at;return(0,u.jsx)(f,{isUnread:r,onClick:()=>ce(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,u.jsxs)(y,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(b,{isUnread:r,children:[r&&(0,u.jsx)(v,{}),e.title]}),(0,u.jsx)(j,{children:fe(e.content)}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(k,{children:[e.author_name,(0,u.jsx)($,{role:e.author_role,children:e.author_role})]}),(0,u.jsx)(S,{children:(o=e.createdAt,new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),e.commentCount>0&&(0,u.jsxs)(E,{children:[e.commentCount," ",1===e.commentCount?"comment":"comments",(null===(t=ie[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[ie[String(e.id)].unread_count," new"]})]})]})]}),(0,u.jsxs)(F,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(z,{priority:e.priority,children:e.priority})]})]})},e.id);var o})}),Z&&te&&(0,u.jsx)(h.mH,{onClick:pe,children:(0,u.jsxs)(h.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(h.rQ,{children:[(0,u.jsx)(h.wt,{children:"Notice Details"}),(0,u.jsx)(h.Jn,{onClick:pe,children:"\xd7"})]}),(0,u.jsxs)(h.cw,{children:[(0,u.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:te.title}),(0,u.jsx)(z,{priority:te.priority,children:te.priority})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)(I,{children:"From"}),(0,u.jsxs)(T,{children:[(0,u.jsx)(L,{children:(we=(null===oe||void 0===oe?void 0:oe.author_name)||te.author_name,we?we.charAt(0).toUpperCase():"?")}),(0,u.jsxs)(N,{children:[(0,u.jsx)(U,{children:(null===oe||void 0===oe?void 0:oe.author_name)||te.author_name}),(0,u.jsx)(O,{children:(null===oe||void 0===oe?void 0:oe.author_role)||te.author_role})]})]})]}),(0,u.jsxs)(R,{children:[(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Date"}),(0,u.jsx)(G,{children:(ye=(null===oe||void 0===oe?void 0:oe.createdAt)||te.createdAt,new Date(ye).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Priority"}),(0,u.jsx)(G,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.priority)||te.priority})]}),(0,u.jsxs)(J,{children:[(0,u.jsx)(M,{children:"Status"}),(0,u.jsx)(G,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.status)||te.status})]})]}),(0,u.jsxs)(B,{children:[(0,u.jsx)(I,{children:"Content"}),(0,u.jsx)(D,{children:(null===oe||void 0===oe?void 0:oe.content)||te.content})]}),((null===oe||void 0===oe?void 0:oe.attachments)||(null===te||void 0===te?void 0:te.attachments))&&((null===oe||void 0===oe?void 0:oe.attachments)||(null===te||void 0===te?void 0:te.attachments)||[]).length>0&&(0,u.jsxs)(B,{children:[(0,u.jsx)(I,{children:"Attachments"}),(0,u.jsx)(c.A,{attachments:(null===oe||void 0===oe?void 0:oe.attachments)||(null===te||void 0===te?void 0:te.attachments)||[]})]}),(0,u.jsx)(p.A,{entityType:"notice",entityId:String(te.id),currentUserId:null===le||void 0===le?void 0:le.id,onMarkRead:()=>ae(e=>{const t={...e},r=String(te.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),(0,u.jsx)(h.jl,{children:(0,u.jsx)(_,{variant:"secondary",onClick:pe,children:"Close"})})]})})]})]});var ye,we}}}]);