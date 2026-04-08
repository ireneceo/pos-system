"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3724],{4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
  margin-top: 12px;
`,a=n.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,s=n.Ay.a`
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
`,h=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,x=n.Ay.a`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,o.jsx)(h,{children:r.map((e,t)=>(0,o.jsx)(x,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,o.jsx)(l,{children:n.map((e,t)=>{return(0,o.jsxs)(s,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(p,{children:e.originalName}),(0,o.jsx)(c,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>O});var n=r(9950),o=r(4752),i=r(4185),a=r(9061),l=r(5030),s=r(4414);const d=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=o.Ay.h4`
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
`,h=o.Ay.div`
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
`,g=o.Ay.div`
  flex: 1;
  min-width: 0;
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,u=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,A=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,F=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,v=o.Ay.div`
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
`,k=o.Ay.div`
  display: flex;
  gap: 4px;
`,E=o.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,B=o.Ay.button`
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
`,z=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,C=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,S=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,D=o.Ay.button`
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
`,T=o.Ay.input`
  display: none;
`,I=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=o.Ay.label`
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
`,O=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:O}=e;const{t:M}=(0,l.Bd)("common"),[P,L]=(0,n.useState)([]),[U,J]=(0,n.useState)(""),[K,R]=(0,n.useState)(!1),[W,X]=(0,n.useState)([]),[Z,q]=(0,n.useState)(!1),[G,H]=(0,n.useState)(""),[Q,V]=(0,n.useState)(!1),Y=(0,n.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&L(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),O&&O(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const te=async()=>{if(Z)return;const e=U.trim(),n=W.length>0;if((e||n)&&!Q){V(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:U.trim(),attachments:n?W:void 0,is_internal:K||void 0})})).ok&&(J(""),X([]),R(!1),ee())}catch(o){console.error("Error adding comment:",o)}finally{V(!1)}}},re=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(d,{children:[(0,s.jsxs)(p,{children:["Comments (",P.length,")"]}),P.length>0?(0,s.jsx)(c,{children:P.map(e=>{var t,r,l;return(0,s.jsxs)(h,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(g,{children:[(0,s.jsxs)(f,{children:[(0,s.jsx)(u,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(y,{children:"Internal"}),(0,s.jsx)(A,{children:re(e.createdAt)}),o&&e.author_id===Number(o)&&(0,s.jsx)(b,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&ee()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(F,{children:e.content.split("\n").map((e,t)=>(0,s.jsxs)(n.Fragment,{children:[t>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(z,{children:"No comments yet"}),(0,s.jsxs)(v,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(w,{value:U,onChange:e=>J(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),te())},placeholder:K?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(k,{children:[(0,s.jsx)(E,{onClick:()=>{var e;return null===(e=Y.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(B,{onClick:te,disabled:!U.trim()&&0===W.length||Q||Z,children:"Send"})]})]}),(0,s.jsx)(I,{children:(0,s.jsxs)(N,{children:[(0,s.jsx)("input",{type:"checkbox",checked:K,onChange:e=>R(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(W.length>0||Z||G)&&(0,s.jsxs)(C,{children:[Z&&(0,s.jsx)($,{children:"Uploading..."}),G&&(0,s.jsx)(_,{children:G}),W.map((e,t)=>(0,s.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(D,{onClick:()=>(e=>{const t=W[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),X(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(T,{ref:Y,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const r=5-W.length,n=Array.from(t).slice(0,r);if(e.target.value="",0!==n.length){q(!0),H("");try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();o.success&&o.data?X(e=>[...e,...o.data]):H(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),H("File upload failed. Please try again.")}finally{q(!1)}}}})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>F});var n=r(9950),o=r(4752),i=r(4414);const a=o.Ay.div`
  margin-top: 8px;
`,l=o.Ay.div`
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
`,s=o.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=o.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,p=o.Ay.input`
  display: none;
`,c=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,h=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,x=o.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,g=o.Ay.div`
  flex: 1;
  min-width: 0;
`,f=o.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,u=o.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,A=o.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const F=e=>{let{files:t,onChange:r,maxFiles:o=5,maxSizeMB:F=10,disabled:b=!1,compact:v=!1}=e;const[j,w]=(0,n.useState)(!1),[k,E]=(0,n.useState)(!1),B=(0,n.useRef)(null),z=!b&&!k&&t.length<o,C=async e=>{const n=o-t.length,i=Array.from(e).slice(0,n);if(0!==i.length){for(const e of i)e.size;E(!0);try{const e=new FormData;i.forEach(t=>e.append("files",t));const n=localStorage.getItem("auth_token"),o=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),a=await o.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,i.jsxs)(a,{children:[z&&(0,i.jsx)(l,{isDragging:j,disabled:!z,onClick:()=>{var e;return z&&(null===(e=B.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),z&&w(!0)},onDragLeave:e=>{e.preventDefault(),w(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),w(!1),z&&e.dataTransfer.files.length>0&&C(e.dataTransfer.files)},children:v?(0,i.jsxs)(s,{children:["Click or drag files to attach (",t.length,"/",o,")"]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s,{children:j?"Drop files here":"Click or drag files to attach"}),(0,i.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",F,"MB each, ",o-t.length," remaining)"]})]})}),(0,i.jsx)(p,{ref:B,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&C(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,i.jsxs)(c,{children:[k&&(0,i.jsxs)(y,{children:[(0,i.jsx)(A,{}),"Uploading..."]}),t.map((e,n)=>{return(0,i.jsxs)(h,{children:[(0,i.jsx)(x,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsxs)(g,{children:[(0,i.jsx)(f,{children:e.originalName}),(0,i.jsx)(u,{children:(o=e.size,o<1024?`${o}B`:o<1048576?`${(o/1024).toFixed(1)}KB`:`${(o/1048576).toFixed(1)}MB`)})]}),!b&&(0,i.jsx)(m,{onClick:()=>(async e=>{const n=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:n.url})})}catch(o){}r(t.filter((t,r)=>r!==e))})(n),title:"Remove",children:"\u2715"})]},e.url);var o,a})]})]})}},9061:(e,t,r)=>{r.d(t,{c:()=>a});var n=r(9950),o=r(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(i);return 1===t.length?e:t.map((e,t)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,o.jsx)(n.Fragment,{children:e},t))}}}]);