"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),i=t(4414);const o=n.Ay.div`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),n=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,i.jsx)(x,{children:t.map((e,r)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),n.length>0&&(0,i.jsx)(s,{children:n.map((e,r)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,n})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>T});var n=t(9950),i=t(4752),o=t(4185),a=t(9061),s=t(4414);const l=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
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
  background: #635BFF;
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
  color: #0A2540;
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
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,v=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,F=i.Ay.textarea`
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
`,w=i.Ay.div`
  display: flex;
  gap: 4px;
`,k=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,E=i.Ay.button`
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
`,B=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
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
  color: #635BFF;
`,S=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,_=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=i.Ay.span`
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
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,T=e=>{let{entityType:r,entityId:t,currentUserId:i,onMarkRead:T}=e;const[O,L]=(0,n.useState)([]),[R,q]=(0,n.useState)(""),[P,M]=(0,n.useState)(!1),[U,J]=(0,n.useState)([]),[W,K]=(0,n.useState)(!1),[Y,H]=(0,n.useState)(""),[G,Q]=(0,n.useState)(!1),V=(0,n.useRef)(null),X=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(X(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),T&&T(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const Z=async()=>{if(W)return;const e=R.trim(),n=U.length>0;if((e||n)&&!G){Q(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:R.trim(),attachments:n?U:void 0,is_internal:P||void 0})})).ok&&(q(""),J([]),M(!1),X())}catch(i){console.error("Error adding comment:",i)}finally{Q(!1)}}},ee=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const i=Math.floor(n/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",O.length,")"]}),O.length>0?(0,s.jsx)(c,{children:O.map(e=>{var r,t,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(f,{children:"Internal"}),(0,s.jsx)(y,{children:ee(e.createdAt)}),i&&e.author_id===Number(i)&&(0,s.jsx)(j,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&X()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(b,{children:e.content.split("\n").map((e,r)=>(0,s.jsxs)(n.Fragment,{children:[r>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(B,{children:"No comments yet"}),(0,s.jsxs)(v,{children:[(0,s.jsxs)(A,{children:[(0,s.jsx)(F,{value:R,onChange:e=>q(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),Z())},placeholder:P?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(w,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=V.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(E,{onClick:Z,disabled:!R.trim()&&0===U.length||G||W,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(D,{children:[(0,s.jsx)("input",{type:"checkbox",checked:P,onChange:e=>M(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(U.length>0||W||Y)&&(0,s.jsxs)(C,{children:[W&&(0,s.jsx)(_,{children:"Uploading..."}),Y&&(0,s.jsx)($,{children:Y}),U.map((e,r)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const r=U[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),J(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(I,{ref:V,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-U.length,n=Array.from(r).slice(0,t);if(e.target.value="",0!==n.length){K(!0),H("");try{const e=new FormData;n.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await t.json();i.success&&i.data?J(e=>[...e,...i.data]):H(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),H("File upload failed. Please try again.")}finally{K(!1)}}}})]})}},9061:(e,r,t)=>{t.d(r,{c:()=>a});var n=t(9950),i=t(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(n.Fragment,{children:e},r))}},9889:(e,r,t)=>{t.r(r),t.d(r,{default:()=>J});var n=t(9950),i=t(4752),o=t(1367),a=t(8409),s=t(4302),l=t(4185),d=t(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,j=i.Ay.input`
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
`,v=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
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
`,F=i.Ay.div`
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
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,k=i.Ay.div`
  flex: 1;
`,E=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,C=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,z=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,S=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,_=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,$=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,I=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,D=i.Ay.span`
  color: #374151;
`,T=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,O=i.Ay.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,L=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,R=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,q=i.Ay.div`
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
`,P=i.Ay.div`
  margin-bottom: 20px;
`,M=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,J=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)([]),[i,J]=(0,n.useState)(""),[W,K]=(0,n.useState)("all"),[Y,H]=(0,n.useState)("all"),[G,Q]=(0,n.useState)(null),[V,X]=(0,n.useState)(""),[Z,ee]=(0,n.useState)({}),re=null===e||void 0===e?void 0:e.id,te=(null===e||void 0===e?void 0:e.role)||"Brand Manager";(0,n.useEffect)(()=>{ne();const e=setInterval(ne,1e4);return()=>clearInterval(e)},[]);const ne=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${re}&userRole=${te}`);if(e.ok){const r=await e.json();t(r),ie(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},ie=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ee(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},oe=r.filter(e=>{const r=e.subject.toLowerCase().includes(i.toLowerCase())||e.requesterName.toLowerCase().includes(i.toLowerCase())||e.ticketNumber.toLowerCase().includes(i.toLowerCase()),t="all"===W||e.status===W,n="all"===Y||e.priority===Y;return r&&t&&n}),ae=r.length,se=r.filter(e=>"open"===e.status).length,le=r.filter(e=>"in-progress"===e.status).length,de=r.filter(e=>"resolved"===e.status).length,ce=e=>new Date(e).toLocaleString("en-MY");return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(p,{children:(0,d.jsx)(h,{children:"Operation Inquiry"})}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{color:"#059669",children:[(0,d.jsx)(f,{children:ae}),(0,d.jsx)(y,{children:"Total Inquiries"})]}),(0,d.jsxs)(m,{color:"#D97706",children:[(0,d.jsx)(f,{children:se}),(0,d.jsx)(y,{children:"Open"})]}),(0,d.jsxs)(m,{color:"#2563EB",children:[(0,d.jsx)(f,{children:le}),(0,d.jsx)(y,{children:"In Progress"})]}),(0,d.jsxs)(m,{color:"#7C3AED",children:[(0,d.jsx)(f,{children:de}),(0,d.jsx)(y,{children:"Resolved"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{placeholder:"Search inquiries...",value:i,onChange:e=>J(e.target.value)}),(0,d.jsxs)(v,{value:W,onChange:e=>K(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),(0,d.jsxs)(v,{value:Y,onChange:e=>H(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})]}),(0,d.jsxs)(A,{children:[oe.map(e=>(0,d.jsxs)(F,{onClick:()=>(e=>{Q(e),X(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(E,{children:e.ticketNumber}),(0,d.jsx)(B,{children:e.subject}),(0,d.jsxs)(C,{children:[e.requesterName," (",e.requesterRole,") - ",e.restaurantName]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(z,{status:e.status,children:e.status}),(0,d.jsx)(S,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(_,{children:e.description}),(0,d.jsxs)(I,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(N,{children:"Created "}),(0,d.jsx)(D,{children:ce(e.createdAt)})]}),Z[e.id]&&(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",Z[e.id].total_comments,Z[e.id].unread_count>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[Z[e.id].unread_count," new"]})]})]})]},e.id)),0===oe.length&&(0,d.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,d.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,d.jsx)("p",{children:"No operation inquiries have been submitted."})]})]}),G&&(0,d.jsxs)(a.aF,{isOpen:!0,onClose:()=>Q(null),title:G.ticketNumber,size:"large",footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(u,{variant:"secondary",onClick:()=>Q(null),children:"Close"})}),children:[(0,d.jsxs)(T,{children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Subject"}),(0,d.jsx)(R,{children:G.subject})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Restaurant"}),(0,d.jsx)(R,{children:G.restaurantName})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"From"}),(0,d.jsxs)(R,{children:[G.requesterName," (",G.requesterRole,")"]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Priority"}),(0,d.jsx)(R,{children:(0,d.jsx)(S,{priority:G.priority,children:G.priority})})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Category"}),(0,d.jsx)(R,{children:G.category})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Created"}),(0,d.jsx)(R,{children:ce(G.createdAt)})]})]}),(0,d.jsx)(q,{children:G.description}),(null===G||void 0===G?void 0:G.attachments)&&G.attachments.length>0&&(0,d.jsx)(l.A,{attachments:G.attachments}),(0,d.jsxs)(P,{children:[(0,d.jsx)(M,{children:"Status"}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(v,{value:V,onChange:e=>X(e.target.value),children:[(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),(0,d.jsx)(u,{variant:"primary",onClick:async()=>{if(G)try{(await fetch(`/api/operation-tickets/${G.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:V})})).ok&&(await ne(),Q(e=>e?{...e,status:V}:null))}catch(e){console.error("Error updating status:",e)}},disabled:V===G.status,children:"Save"})]})]}),(0,d.jsx)(s.A,{entityType:"operation_ticket",entityId:String(G.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>ee(e=>{const r={...e},t=String(G.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}}}]);