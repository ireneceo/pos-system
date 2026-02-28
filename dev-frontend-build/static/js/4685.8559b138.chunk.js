"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4685],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,d=e=>{let{children:r,className:t,style:i,...a}=e;return(0,n.jsx)(o,{className:t,style:i,...a,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(a,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,n.jsx)(s,{...t,children:r})}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
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
`,d=i.Ay.a`
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
`,l=i.Ay.span`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),i=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,n.jsx)(x,{children:t.map((e,r)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},r))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,r)=>{return(0,n.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(l,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,i})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>T});var i=t(9950),n=t(4752),o=t(4185),a=t(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=n.Ay.h4`
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
`,A=n.Ay.div`
  display: flex;
  gap: 4px;
`,F=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,w=n.Ay.button`
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
`,T=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:T}=e;const[D,$]=(0,i.useState)([]),[R,N]=(0,i.useState)(""),[_,I]=(0,i.useState)([]),[O,L]=(0,i.useState)(!1),[M,U]=(0,i.useState)(!1),P=(0,i.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&$(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{t&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),T&&T()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const W=async()=>{const e=R.trim(),i=_.length>0;if((e||i)&&!M){U(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:R.trim(),attachments:i?_:void 0})})).ok&&(N(""),I([]),J())}catch(n){console.error("Error adding comment:",n)}finally{U(!1)}}},q=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(d,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(l,{children:D.map(e=>{var r,t,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(m,{children:q(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&J()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{value:R,onChange:e=>N(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),W())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{onClick:()=>{var e;return null===(e=P.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(w,{onClick:W,disabled:!R.trim()&&0===_.length||M,children:"Send"})]})]}),(_.length>0||O)&&(0,a.jsxs)(C,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),_.map((e,r)=>(0,a.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const r=_[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),I(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:P,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-_.length,i=Array.from(r).slice(0,t);if(0!==i.length){L(!0);try{const e=new FormData;i.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data&&I(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{L(!1)}}}})]})}},4685:(e,r,t)=>{t.r(r),t.d(r,{default:()=>X});var i=t(9950),n=t(4752),o=t(2488),a=t(2674),s=t(1367),d=t(7455),l=t(4185),c=t(4302),p=t(4414);const x=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=n.Ay.div`
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
`,u=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=n.Ay.div`
  display: flex;
  gap: 12px;
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,j=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border-left: 4px solid ${e=>e.borderColor||"#635BFF"};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,b=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,v=n.Ay.button`
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
`,A=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,w=n.Ay.div`
  flex: 1;
`,k=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=n.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,E=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  flex-direction: column;
  gap: 2px;
`,B=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
  background: ${e=>{switch(e.role){case"manager":return"#E0F2FE";case"restaurant":return"#FEF3C7";case"staff":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"manager":return"#0891B2";case"restaurant":return"#D97706";case"staff":return"#059669";default:return"#6B7280"}}};
`,z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,S=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,N=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=n.Ay.span`
  color: #374151;
`,I=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`,O=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,L=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,M=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
`,U=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,J=n.Ay.button`
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
`,W=n.Ay.div`
  padding: 24px;
`,q=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,H=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,G=n.Ay.div`
  margin-bottom: 20px;
`,K=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Y=n.Ay.input`
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
`,Q=n.Ay.select`
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
`,V=n.Ay.textarea`
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
`,X=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,X]=(0,i.useState)(""),[Z,ee]=(0,i.useState)("all"),[re,te]=(0,i.useState)("all"),[ie,ne]=(0,i.useState)("all"),[oe,ae]=(0,i.useState)("all"),[se,de]=(0,i.useState)(!1),[le,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(null),[he,ue]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"general"}),[ge,me]=(0,i.useState)([]),[fe,ye]=(0,i.useState)({}),je=(null===e||void 0===e?void 0:e.restaurantId)||2,be=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ye(r)}}}catch(r){console.error("Error fetching unread counts:",r)}};(0,i.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),be(i)}}catch(e){}})()},[e]);const ve=r.filter(e=>{const r=e.subject.toLowerCase().includes(n.toLowerCase())||e.customerName.toLowerCase().includes(n.toLowerCase())||e.ticketNumber.toLowerCase().includes(n.toLowerCase()),t="all"===Z||e.status===Z,i="all"===re||e.priority===re,o="all"===ie||e.category===ie,a="all"===oe||e.customerRole===oe;return r&&t&&i&&o&&a}),Ae=r.length,Fe=r.filter(e=>"open"===e.status).length,we=r.filter(e=>"in-progress"===e.status).length,ke=r.filter(e=>"resolved"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY"),Ee=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"Support Tickets"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:()=>{const e=ve.map(e=>[e.ticketNumber,e.customerName,e.customerEmail,e.customerRole,`"${e.subject.replace(/"/g,'""')}"`,`"${e.description.replace(/"/g,'""')}"`,e.status,e.priority,e.category,e.assignedTo||"Unassigned",e.createdAt,e.updatedAt,e.responseTime,e.resolutionTime||"N/A"]),r=[["Ticket Number","Customer Name","Customer Email","Customer Role","Subject","Description","Status","Priority","Category","Assigned To","Created At","Updated At","Response Time (minutes)","Resolution Time (minutes)"].join(","),...e.map(e=>e.join(","))].join("\n"),t=new Blob(["\ufeff"+r],{type:"text/csv;charset=utf-8"}),i=URL.createObjectURL(t),n=document.createElement("a");n.href=i,n.download=`restaurant-support-tickets-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(i)},children:"Export"}),(0,p.jsx)(f,{variant:"primary",onClick:()=>{de(!0)},children:"Create Ticket"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(a.MD,{children:[(0,p.jsxs)(j,{borderColor:"#635BFF",children:[(0,p.jsx)(a.Os,{children:Ae}),(0,p.jsx)(a.v0,{children:"Total Tickets"})]}),(0,p.jsxs)(j,{borderColor:"#F59E0B",children:[(0,p.jsx)(a.Os,{children:Fe}),(0,p.jsx)(a.v0,{children:"Open Tickets"})]}),(0,p.jsxs)(j,{borderColor:"#3B82F6",children:[(0,p.jsx)(a.Os,{children:we}),(0,p.jsx)(a.v0,{children:"In Progress"})]}),(0,p.jsxs)(j,{borderColor:"#10B981",children:[(0,p.jsx)(a.Os,{children:ke}),(0,p.jsx)(a.v0,{children:"Resolved"})]})]}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(v,{active:"all"===Z,onClick:()=>ee("all"),children:["All (",Ae,")"]}),(0,p.jsxs)(v,{active:"open"===Z,onClick:()=>ee("open"),children:["Open (",Fe,")"]}),(0,p.jsxs)(v,{active:"in-progress"===Z,onClick:()=>ee("in-progress"),children:["In Progress (",we,")"]}),(0,p.jsxs)(v,{active:"resolved"===Z,onClick:()=>ee("resolved"),children:["Resolved (",ke,")"]}),(0,p.jsxs)(v,{active:"closed"===Z,onClick:()=>ee("closed"),children:["Closed (",r.filter(e=>"closed"===e.status).length,")"]})]}),(0,p.jsxs)(o.Qn,{children:[(0,p.jsx)(o.DO,{placeholder:"Search tickets...",value:n,onChange:e=>X(e.target.value)}),(0,p.jsxs)(o.Jt,{value:re,onChange:e=>te(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]}),(0,p.jsxs)(o.Jt,{value:oe,onChange:e=>ae(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Roles"}),(0,p.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"staff",children:"Staff"})]}),(0,p.jsxs)(o.Jt,{value:ie,onChange:e=>ne(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"technical",children:"Technical"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,p.jsx)("option",{value:"bug-report",children:"Bug Report"}),(0,p.jsx)("option",{value:"general",children:"General"})]})]}),(0,p.jsx)(y,{children:ve.map(e=>(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{children:e.ticketNumber}),(0,p.jsx)(C,{children:e.subject}),(0,p.jsx)(E,{children:(0,p.jsxs)("div",{children:[e.customerName," \u2022 ",e.customerEmail,(0,p.jsx)(B,{role:e.customerRole,children:e.customerRole})]})})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(S,{status:e.status,children:e.status}),(0,p.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(D,{children:e.description}),e.replyMessage&&(0,p.jsxs)("div",{style:{marginTop:"16px",padding:"12px",backgroundColor:"#F0F9FF",borderRadius:"8px",border:"1px solid #BAE6FD"},children:[(0,p.jsxs)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#0369A1",marginBottom:"6px"},children:["Reply from ",e.repliedBy," \u2022 ",Ce(e.repliedAt||"")]}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.4"},children:e.replyMessage})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(R,{children:[(0,p.jsx)(N,{children:"Created"}),(0,p.jsx)(_,{children:Ce(e.createdAt)})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(N,{children:"Category"}),(0,p.jsx)(_,{style:{textTransform:"capitalize"},children:e.category.replace("-"," ")})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(N,{children:"Response Time"}),(0,p.jsx)(_,{children:Ee(e.responseTime)})]}),e.assignedTo&&(0,p.jsxs)(R,{children:[(0,p.jsx)(N,{children:"Assigned To"}),(0,p.jsx)(_,{children:e.assignedTo})]}),fe[e.id]&&(0,p.jsx)(R,{children:(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",fe[e.id].total_comments,fe[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[fe[e.id].unread_count," new"]})]})})]}),(0,p.jsx)(I,{children:(0,p.jsx)(O,{variant:"primary",onClick:()=>(e=>{xe(e),ce(!0)})(e),children:"View Details"})})]},e.id))}),se&&(0,p.jsx)(L,{onClick:()=>de(!1),children:(0,p.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(P,{children:"Create Support Ticket"}),(0,p.jsx)(J,{onClick:()=>de(!1),children:"\xd7"})]}),(0,p.jsxs)(W,{children:[(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Subject *"}),(0,p.jsx)(Y,{type:"text",value:he.subject,onChange:e=>ue({...he,subject:e.target.value}),placeholder:"Enter ticket subject",required:!0})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Description *"}),(0,p.jsx)(V,{value:he.description,onChange:e=>ue({...he,description:e.target.value}),placeholder:"Describe the issue or request in detail...",rows:4,required:!0})]}),(0,p.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,p.jsx)(K,{children:"Attachments"}),(0,p.jsx)(d.A,{files:ge,onChange:me,maxFiles:5})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Priority"}),(0,p.jsxs)(Q,{value:he.priority,onChange:e=>ue({...he,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(G,{children:[(0,p.jsx)(K,{children:"Category"}),(0,p.jsxs)(Q,{value:he.category,onChange:e=>ue({...he,category:e.target.value}),children:[(0,p.jsx)("option",{value:"general",children:"General"}),(0,p.jsx)("option",{value:"technical",children:"Technical"}),(0,p.jsx)("option",{value:"billing",children:"Billing"}),(0,p.jsx)("option",{value:"feature-request",children:"Feature Request"}),(0,p.jsx)("option",{value:"bug-report",children:"Bug Report"})]})]})]})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(f,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,p.jsx)(f,{variant:"primary",onClick:async()=>{try{const r={customerId:(null===e||void 0===e?void 0:e.id)||"restaurant-user",customerName:(null===e||void 0===e?void 0:e.name)||"Restaurant User",customerEmail:(null===e||void 0===e?void 0:e.email)||"user@restaurant.com",customerRole:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===e||void 0===e?void 0:e.role)||"")?"manager":"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)?"restaurant":"staff",restaurantId:je,restaurantName:"IOI Mall Food Court",subject:he.subject,description:he.description,status:"open",priority:he.priority,category:he.category,attachments:ge.length>0?ge:void 0};if(!(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)return;{const e=await fetch("/api/support-tickets");if(e.ok){const r=await e.json(),i=r.data||r;t(i),be(i)}de(!1)}}catch(r){return}ue({subject:"",description:"",priority:"medium",category:"general"}),me([])},disabled:!he.subject||!he.description,children:"Create Ticket"})]})]})}),le&&pe&&(0,p.jsx)(L,{onClick:()=>ce(!1),children:(0,p.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(U,{children:[(0,p.jsx)(P,{children:"Ticket Details"}),(0,p.jsx)(J,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,p.jsx)(W,{children:(0,p.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Ticket Number"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.ticketNumber})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Status"}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)(S,{status:pe.status,children:pe.status})})]})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Priority"}),(0,p.jsx)("div",{style:{padding:"8px 0"},children:(0,p.jsx)(T,{priority:pe.priority,children:pe.priority})})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Category"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:pe.category.replace("-"," ")})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Customer Information"}),(0,p.jsxs)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{marginBottom:"4px",color:"#0A2540",fontWeight:"600"},children:[pe.customerName,(0,p.jsx)(B,{role:pe.customerRole,style:{marginLeft:"8px"},children:pe.customerRole})]}),(0,p.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:pe.customerEmail})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Subject"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:pe.subject})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Description"}),(0,p.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"100px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:pe.description})]}),(null===pe||void 0===pe?void 0:pe.attachments)&&pe.attachments.length>0&&(0,p.jsx)(l.A,{attachments:pe.attachments}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Created At"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.createdAt})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Last Updated"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:pe.updatedAt})]})]}),pe.assignedTo&&(0,p.jsxs)("div",{children:[(0,p.jsx)(K,{children:"Assigned To"}),(0,p.jsx)("div",{style:{padding:"8px 0",color:"#0A2540"},children:pe.assignedTo})]}),(0,p.jsx)(c.A,{entityType:"support_ticket",entityId:pe.id,currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ye(e=>{const r={...e};return r[pe.id]&&(r[pe.id]={...r[pe.id],unread_count:0}),r})})]})}),(0,p.jsx)(q,{children:(0,p.jsx)(f,{variant:"secondary",onClick:()=>ce(!1),children:"Close"})})]})})]})]})})}},7455:(e,r,t)=>{t.d(r,{A:()=>b});var i=t(9950),n=t(4752),o=t(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    border-color: ${e=>e.disabled?"#CBD5E1":"#635BFF"};
  }
`,d=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,l=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,f=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,j=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:r,onChange:t,maxFiles:n=5,maxSizeMB:b=10,disabled:v=!1,compact:A=!1}=e;const[F,w]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=!v&&!k&&r.length<n,z=async e=>{const i=n-r.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(r=>e.append("files",r));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&t([...r,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:F,disabled:!B,onClick:()=>{var e;return B&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&w(!0)},onDragLeave:e=>{e.preventDefault(),w(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),w(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:A?(0,o.jsxs)(d,{children:["Click or drag files to attach (",r.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{children:F?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(l,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",n-r.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(r.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(j,{}),"Uploading..."]}),r.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(f,{onClick:()=>(async e=>{const i=r[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}t(r.filter((r,t)=>t!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);