"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var n=t(4752),o=t(4414);const i=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,a=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:t,style:n}=e;return(0,o.jsx)(i,{className:t,style:n,children:r})},d=e=>{let{active:r,onClick:t,children:n,className:i}=e;return(0,o.jsx)(a,{active:r,onClick:t,className:i,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,o.jsx)(s,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),o=t(4492);function i(e){const[r,t]=(0,o.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[a,s]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{s(e),t({tab:e})},[t])]}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),o=t(4414);const i=n.Ay.div`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),n=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,o.jsx)(x,{children:t.map((e,r)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},r))}),n.length>0&&(0,o.jsx)(s,{children:n.map((e,r)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,n})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>D});var n=t(9950),o=t(4752),i=t(4185),a=t(9061),s=t(4414);const l=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,c=o.Ay.div`
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
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=o.Ay.div`
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
`,h=o.Ay.div`
  flex: 1;
  min-width: 0;
`,u=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,w=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,v=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,F=o.Ay.textarea`
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
`,k=o.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,E=o.Ay.button`
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
`,B=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,z=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,$=o.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,_=o.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,I=o.Ay.input`
  display: none;
`,N=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,D=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:D}=e;const[L,O]=(0,n.useState)([]),[P,M]=(0,n.useState)(""),[R,U]=(0,n.useState)(!1),[q,J]=(0,n.useState)([]),[W,K]=(0,n.useState)(!1),[Y,H]=(0,n.useState)(""),[G,Z]=(0,n.useState)(!1),Q=(0,n.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),D&&D(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const X=async()=>{if(W)return;const e=P.trim(),n=q.length>0;if((e||n)&&!G){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:P.trim(),attachments:n?q:void 0,is_internal:R||void 0})})).ok&&(M(""),J([]),U(!1),V())}catch(o){console.error("Error adding comment:",o)}finally{Z(!1)}}},ee=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",L.length,")"]}),L.length>0?(0,s.jsx)(c,{children:L.map(e=>{var r,t,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,s.jsx)(f,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(m,{children:"Internal"}),(0,s.jsx)(y,{children:ee(e.createdAt)}),o&&e.author_id===o&&(0,s.jsx)(w,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&V()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(b,{children:e.content.split("\n").map((e,r)=>(0,s.jsxs)(n.Fragment,{children:[r>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(B,{children:"No comments yet"}),(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsx)(F,{value:P,onChange:e=>M(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=Q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(E,{onClick:X,disabled:!P.trim()&&0===q.length||G||W,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(T,{children:[(0,s.jsx)("input",{type:"checkbox",checked:R,onChange:e=>U(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(q.length>0||W||Y)&&(0,s.jsxs)(C,{children:[W&&(0,s.jsx)($,{children:"Uploading..."}),Y&&(0,s.jsx)(_,{children:Y}),q.map((e,r)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const r=q[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),J(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(I,{ref:Q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-q.length,n=Array.from(r).slice(0,t);if(e.target.value="",0!==n.length){K(!0),H("");try{const e=new FormData;n.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),o=await t.json();o.success&&o.data?J(e=>[...e,...o.data]):H(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),H("File upload failed. Please try again.")}finally{K(!1)}}}})]})}},7771:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var n=t(9950),o=t(4752),i=t(1367),a=t(8409),s=t(2597),l=t(2653),d=t(4302),c=t(4185),p=t(4414);const x=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,v=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=o.Ay.label`
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
`,k=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,E=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,B=o.Ay.div`
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
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,z=o.Ay.div`
  flex: 1;
  min-width: 0;
`,S=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,$=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,_=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,I=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,N=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
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
`,O=o.Ay.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
  }
`,P=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=o.Ay.select`
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
`,U=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,q=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,J=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,W=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,K=o.Ay.div`
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
`,Y=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)([]),[o,Y]=(0,n.useState)(""),[H,G]=(0,l.M)("active"),[Z,Q]=(0,n.useState)("all"),[V,X]=(0,n.useState)(null),[ee,re]=(0,n.useState)("open"),[te,ne]=(0,n.useState)({}),oe=(null===e||void 0===e?void 0:e.id)||"2",ie=(null===e||void 0===e?void 0:e.role)||"Brand General";(0,n.useEffect)(()=>{if(e){ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)}},[e]);const ae=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${oe}&userRole=${ie}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),se(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},se=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ne(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},le=r.filter(e=>{const r=e.subject.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.restaurantName.toLowerCase().includes(o.toLowerCase()),t="active"===H?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,n="all"===Z||e.priority===Z;return r&&t&&n}),de=r.length,ce=r.filter(e=>"open"===e.status).length,pe=r.filter(e=>"in-progress"===e.status).length,xe=r.filter(e=>"resolved"===e.status).length,he=r.filter(e=>"closed"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY"),ge=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:(0,p.jsx)(g,{children:"Operation Inquiry"})}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(m,{children:[(0,p.jsxs)(y,{borderColor:"#635BFF",children:[(0,p.jsx)(b,{children:de}),(0,p.jsx)(w,{children:"Total Inquiries"})]}),(0,p.jsxs)(y,{borderColor:"#F59E0B",children:[(0,p.jsx)(b,{children:ce}),(0,p.jsx)(w,{children:"Open"})]}),(0,p.jsxs)(y,{borderColor:"#3B82F6",children:[(0,p.jsx)(b,{children:pe}),(0,p.jsx)(w,{children:"In Progress"})]}),(0,p.jsxs)(y,{borderColor:"#10B981",children:[(0,p.jsx)(b,{children:xe}),(0,p.jsx)(w,{children:"Resolved"})]})]}),(0,p.jsxs)(s.tU,{children:[(0,p.jsxs)(s.oz,{active:"active"===H,onClick:()=>G("active"),children:["Active Tickets (",ce+pe,")"]}),(0,p.jsxs)(s.oz,{active:"closed"===H,onClick:()=>G("closed"),children:["Closed Tickets (",he+xe,")"]})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Search"}),(0,p.jsx)(A,{placeholder:"Search inquiries...",value:o,onChange:e=>Y(e.target.value)})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Priority"}),(0,p.jsxs)(k,{value:Z,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]})]}),(0,p.jsxs)(E,{children:[le.map(e=>(0,p.jsxs)(B,{onClick:()=>(e=>{X(e),re(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(S,{children:e.ticketNumber}),(0,p.jsx)($,{children:e.subject}),(0,p.jsxs)(_,{children:[(0,p.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,p.jsxs)("span",{children:["From: ",e.requesterName]}),(0,p.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(N,{status:e.status,children:e.status}),(0,p.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(D,{children:e.description}),(0,p.jsxs)(L,{children:[(0,p.jsxs)("span",{children:["Created: ",ue(e.createdAt)]}),e.responseTime>0&&(0,p.jsxs)("span",{children:["Response Time: ",ge(e.responseTime)]}),te[e.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",te[e.id].total_comments,te[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[te[e.id].unread_count," new"]})]}),"active"===H&&(0,p.jsx)(O,{onClick:r=>{r.stopPropagation(),(async()=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/operation-tickets/${e.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"closed"})})).ok&&(t(r=>r.map(r=>r.id===e.id?{...r,status:"closed"}:r)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(r){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===le.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,p.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,p.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),V&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>X(null),title:V.ticketNumber,size:"large",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(f,{variant:"secondary",onClick:()=>X(null),children:"Close"})}),children:[(0,p.jsxs)(U,{children:[(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"Subject:"}),(0,p.jsx)(W,{children:V.subject})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"Restaurant:"}),(0,p.jsx)(W,{children:V.restaurantName})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"From:"}),(0,p.jsx)(W,{children:V.requesterName})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"Priority:"}),(0,p.jsx)(W,{children:(0,p.jsx)(T,{priority:V.priority,children:V.priority})})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"Category:"}),(0,p.jsx)(W,{children:V.category})]}),(0,p.jsxs)(q,{children:[(0,p.jsx)(J,{children:"Created:"}),(0,p.jsx)(W,{children:ue(V.createdAt)})]})]}),(0,p.jsx)(M,{children:"Description"}),(0,p.jsx)(K,{children:V.description}),(null===V||void 0===V?void 0:V.attachments)&&V.attachments.length>0&&(0,p.jsx)(c.A,{attachments:V.attachments}),(0,p.jsxs)(P,{children:[(0,p.jsx)(M,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,p.jsxs)(R,{value:ee,onChange:e=>re(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),ee!==V.status&&(0,p.jsx)(f,{variant:"primary",onClick:async()=>{if(V&&ee!==V.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${V.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ee,..."resolved"===ee&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),n=e.data||e;t(e=>e.map(e=>e.id===V.id?{...e,...n}:e)),X(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,p.jsx)(d.A,{entityType:"operation_ticket",entityId:String(V.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ne(e=>{const r={...e},t=String(V.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}},9061:(e,r,t)=>{t.d(r,{c:()=>a});var n=t(9950),o=t(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(i);return 1===r.length?e:r.map((e,r)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,o.jsx)(n.Fragment,{children:e},r))}}}]);