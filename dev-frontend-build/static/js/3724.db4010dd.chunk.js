"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3724],{4185:(e,r,o)=>{o.d(r,{A:()=>u});var t=o(8819),n=(o(9950),o(4752)),i=o(4414);const a=n.Ay.div`
  margin-top: 12px;
`,l=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${t.w.colors.text.muted};
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
  border: 1px solid ${t.w.colors.border};
  border-radius: 6px;
  text-decoration: none;
  color: ${t.w.colors.secondary};
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: ${t.w.colors.primary};
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
  color: ${t.w.colors.text.placeholder};
  flex-shrink: 0;
  font-size: 11px;
`,h=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,g=n.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${t.w.colors.border};
  transition: all 0.15s;

  &:hover {
    border-color: ${t.w.colors.primary};
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const o=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(a,{children:[(0,i.jsxs)(l,{children:["Attachments (",r.length,")"]}),o.length>0&&(0,i.jsx)(h,{children:o.map((e,r)=>(0,i.jsx)(g,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,r)=>{return(0,i.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(c,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(x,{children:(o=e.size,o<1024?`${o}B`:o<1048576?`${(o/1024).toFixed(1)}KB`:`${(o/1048576).toFixed(1)}MB`)})]},r);var o,t})})]})}},4302:(e,r,o)=>{o.d(r,{A:()=>N});var t=o(8819),n=o(9950),i=o(4752),a=o(4185),l=o(4414);const s=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid ${t.w.colors.border};
  padding-top: 20px;
`,d=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
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
  background: ${t.w.colors.primary};
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
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,u=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
`,f=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${t.w.colors.status.warningLightAlt};
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,y=i.Ay.span`
  font-size: 11px;
  color: ${t.w.colors.text.placeholder};
  margin-left: auto;
`,w=i.Ay.p`
  font-size: 13px;
  color: ${t.w.colors.text.dark};
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=i.Ay.button`
  background: none;
  border: none;
  color: ${t.w.colors.text.placeholder};
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
`,j=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }
  &::placeholder { color: ${t.w.colors.text.placeholder}; }
`,$=i.Ay.div`
  display: flex;
  gap: 4px;
`,k=i.Ay.button`
  padding: 10px 12px;
  background: ${t.w.colors.surfaceMuted};
  color: ${t.w.colors.text.muted};
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: ${t.w.colors.borderLight}; color: ${t.w.colors.secondary}; }
`,F=i.Ay.button`
  padding: 10px 16px;
  background: ${t.w.colors.primary};
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
  color: ${t.w.colors.text.placeholder};
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
  color: ${t.w.colors.primary};
`,B=i.Ay.button`
  background: none;
  border: none;
  color: ${t.w.colors.text.placeholder};
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,C=i.Ay.span`
  font-size: 11px;
  color: ${t.w.colors.primary};
  padding: 3px 8px;
`,D=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=i.Ay.input`
  display: none;
`,T=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,I=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: ${t.w.colors.status.warningAlt};
    cursor: pointer;
  }
`,N=e=>{let{entityType:r,entityId:o,currentUserId:t,onMarkRead:i}=e;const[N,O]=(0,n.useState)([]),[L,M]=(0,n.useState)(""),[P,U]=(0,n.useState)(!1),[J,K]=(0,n.useState)([]),[R,W]=(0,n.useState)(!1),[X,Z]=(0,n.useState)(""),[q,G]=(0,n.useState)(!1),H=(0,n.useRef)(null),Q=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${r}/${o}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{o&&(Q(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:o})}),i&&i(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,o]);const V=async()=>{if(R)return;const e=L.trim(),t=J.length>0;if((e||t)&&!q){G(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:o,content:L.trim(),attachments:t?J:void 0,is_internal:P||void 0})})).ok&&(M(""),K([]),U(!1),Q())}catch(n){console.error("Error adding comment:",n)}finally{G(!1)}}},Y=e=>{const r=new Date(e),o=(new Date).getTime()-r.getTime(),t=Math.floor(o/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const n=Math.floor(t/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(s,{children:[(0,l.jsxs)(d,{children:["Comments (",N.length,")"]}),N.length>0?(0,l.jsx)(c,{children:N.map(e=>{var r,o,n;return(0,l.jsxs)(p,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(u,{children:(null===(o=e.author)||void 0===o?void 0:o.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(n=e.author)||void 0===n?void 0:n.role)||e.author_role}),e.is_internal&&(0,l.jsx)(m,{children:"Internal"}),(0,l.jsx)(y,{children:Y(e.createdAt)}),t&&e.author_id===t&&(0,l.jsx)(b,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&Q()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(w,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(a.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(z,{children:"No comments yet"}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(j,{value:L,onChange:e=>M(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),V())},placeholder:P?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)($,{children:[(0,l.jsx)(k,{onClick:()=>{var e;return null===(e=H.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(F,{onClick:V,disabled:!L.trim()&&0===J.length||q||R,children:"Send"})]})]}),(0,l.jsx)(T,{children:(0,l.jsxs)(I,{children:[(0,l.jsx)("input",{type:"checkbox",checked:P,onChange:e=>U(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||R||X)&&(0,l.jsxs)(E,{children:[R&&(0,l.jsx)(C,{children:"Uploading..."}),X&&(0,l.jsx)(D,{children:X}),J.map((e,r)=>(0,l.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(B,{onClick:()=>(e=>{const r=J[e],o=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),K(r=>r.filter((r,o)=>o!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(_,{ref:H,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const o=5-J.length,t=Array.from(r).slice(0,o);if(e.target.value="",0!==t.length){W(!0),Z("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),o=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await o.json();n.success&&n.data?K(e=>[...e,...n.data]):Z(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),Z("File upload failed. Please try again.")}finally{W(!1)}}}})]})}},7455:(e,r,o)=>{o.d(r,{A:()=>v});var t=o(8819),n=o(9950),i=o(4752),a=o(4414);const l=i.Ay.div`
  margin-top: 8px;
`,s=i.Ay.div`
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
`,d=i.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,c=i.Ay.p`
  font-size: 11px;
  color: ${t.w.colors.text.placeholder};
  margin: 0;
`,p=i.Ay.input`
  display: none;
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,h=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,g=i.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=i.Ay.div`
  flex: 1;
  min-width: 0;
`,f=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=i.Ay.div`
  font-size: 11px;
  color: ${t.w.colors.text.placeholder};
`,y=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,w=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: ${t.w.colors.primary};
`,b=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const v=e=>{let{files:r,onChange:o,maxFiles:t=5,maxSizeMB:i=10,disabled:v=!1,compact:A=!1}=e;const[j,$]=(0,n.useState)(!1),[k,F]=(0,n.useState)(!1),z=(0,n.useRef)(null),E=!v&&!k&&r.length<t,S=async e=>{const n=t-r.length,i=Array.from(e).slice(0,n);if(0!==i.length){for(const e of i)e.size;F(!0);try{const e=new FormData;i.forEach(r=>e.append("files",r));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),a=await n.json();a.success&&a.data&&o([...r,...a.data])}catch(a){console.error("File upload error:",a)}finally{F(!1)}}};return(0,a.jsxs)(l,{children:[E&&(0,a.jsx)(s,{isDragging:j,disabled:!E,onClick:()=>{var e;return E&&(null===(e=z.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),E&&$(!0)},onDragLeave:e=>{e.preventDefault(),$(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),$(!1),E&&e.dataTransfer.files.length>0&&S(e.dataTransfer.files)},children:A?(0,a.jsxs)(d,{children:["Click or drag files to attach (",r.length,"/",t,")"]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d,{children:j?"Drop files here":"Click or drag files to attach"}),(0,a.jsxs)(c,{children:["Images, PDF, DOC, XLS, ZIP (max ",i,"MB each, ",t-r.length," remaining)"]})]})}),(0,a.jsx)(p,{ref:z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&S(e.target.files),e.target.value=""}}),(r.length>0||k)&&(0,a.jsxs)(x,{children:[k&&(0,a.jsxs)(w,{children:[(0,a.jsx)(b,{}),"Uploading..."]}),r.map((e,t)=>{return(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(i=e.mimeType,i.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,a.jsxs)(u,{children:[(0,a.jsx)(f,{children:e.originalName}),(0,a.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,a.jsx)(y,{onClick:()=>(async e=>{const t=r[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:t.url})})}catch(n){}o(r.filter((r,o)=>o!==e))})(t),title:"Remove",children:"\u2715"})]},e.url);var n,i})]})]})}}}]);