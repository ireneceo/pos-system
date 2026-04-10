"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3724],{4185:(e,r,n)=>{n.d(r,{A:()=>g});n(9950);var t=n(4752),i=n(4414);const o=t.Ay.div`
  margin-top: 12px;
`,a=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,s=t.Ay.a`
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
`,d=t.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,p=t.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,c=t.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=t.Ay.a`
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
`;const g=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const n=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,r)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(l,{children:t.map((e,r)=>{return(0,i.jsxs)(s,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},r);var n,t})})]})}},4302:(e,r,n)=>{n.d(r,{A:()=>M});var t=n(9950),i=n(4752),o=n(4185),a=n(9061),l=n(5030),s=n(9955),d=n(4414);const p=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,x=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,h=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,g=i.Ay.div`
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
`,f=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,y=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,A=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,F=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,v=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,k=i.Ay.textarea`
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
`,E=i.Ay.div`
  display: flex;
  gap: 4px;
`,B=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,z=i.Ay.button`
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
`,C=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,D=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,$=i.Ay.div`
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
`,T=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,_=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,N=i.Ay.input`
  display: none;
`,O=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,I=i.Ay.label`
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
`,M=e=>{let{entityType:r,entityId:n,currentUserId:i,onMarkRead:M}=e;const{t:P}=(0,l.Bd)("common"),[L,U]=(0,t.useState)([]),[J,K]=(0,t.useState)(""),[R,W]=(0,t.useState)(!1),[X,Z]=(0,t.useState)([]),[q,G]=(0,t.useState)(!1),[H,Q]=(0,t.useState)(""),[V,Y]=(0,t.useState)(!1),ee=(0,t.useRef)(null),re=async()=>{try{const e=(0,s.c4)(),t=await fetch(`/api/comments/${r}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&U(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{n&&(re(),(async()=>{try{const e=(0,s.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n})}),M&&M(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,n]);const ne=async()=>{if(q)return;const e=J.trim(),t=X.length>0;if((e||t)&&!V){Y(!0);try{const e=(0,s.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n,content:J.trim(),attachments:t?X:void 0,is_internal:R||void 0})})).ok&&(K(""),Z([]),W(!1),re())}catch(i){console.error("Error adding comment:",i)}finally{Y(!1)}}},te=e=>{const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(p,{children:[(0,d.jsxs)(c,{children:["Comments (",L.length,")"]}),L.length>0?(0,d.jsx)(x,{children:L.map(e=>{var r,n,l;return(0,d.jsxs)(h,{isInternal:e.is_internal,children:[(0,d.jsx)(g,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,d.jsx)(y,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,d.jsx)(A,{children:"Internal"}),(0,d.jsx)(F,{children:te(e.createdAt)}),i&&e.author_id===Number(i)&&(0,d.jsx)(v,{onClick:()=>(async e=>{try{const r=(0,s.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&re()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(b,{children:e.content.split("\n").map((e,r)=>(0,d.jsxs)(t.Fragment,{children:[r>0&&(0,d.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(C,{children:"No comments yet"}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(k,{value:J,onChange:e=>K(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(E,{children:[(0,d.jsx)(B,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(z,{onClick:ne,disabled:!J.trim()&&0===X.length||V||q,children:"Send"})]})]}),(0,d.jsx)(O,{children:(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",checked:R,onChange:e=>W(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(X.length>0||q||H)&&(0,d.jsxs)(D,{children:[q&&(0,d.jsx)(T,{children:"Uploading..."}),H&&(0,d.jsx)(_,{children:H}),X.map((e,r)=>(0,d.jsxs)($,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)(S,{onClick:()=>(e=>{const r=X[e],n=(0,s.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),Z(r=>r.filter((r,n)=>n!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(N,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const n=5-X.length,t=Array.from(r).slice(0,n);if(e.target.value="",0!==t.length){G(!0),Q("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=(0,s.c4)(),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await n.json();i.success&&i.data?Z(e=>[...e,...i.data]):Q(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),Q("File upload failed. Please try again.")}finally{G(!1)}}}})]})}},7455:(e,r,n)=>{n.d(r,{A:()=>b});var t=n(9950),i=n(4752),o=n(9955),a=n(4414);const l=i.Ay.div`
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
`,p=i.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=i.Ay.input`
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
`,f=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=i.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
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
`,A=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,F=i.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:r,onChange:n,maxFiles:i=5,maxSizeMB:b=10,disabled:v=!1,compact:j=!1}=e;const[w,k]=(0,t.useState)(!1),[E,B]=(0,t.useState)(!1),z=(0,t.useRef)(null),C=!v&&!E&&r.length<i,D=async e=>{const t=i-r.length,a=Array.from(e).slice(0,t);if(0!==a.length){for(const e of a)e.size;B(!0);try{const e=new FormData;a.forEach(r=>e.append("files",r));const t=(0,o.c4)(),i=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),l=await i.json();l.success&&l.data&&n([...r,...l.data])}catch(l){console.error("File upload error:",l)}finally{B(!1)}}};return(0,a.jsxs)(l,{children:[C&&(0,a.jsx)(s,{isDragging:w,disabled:!C,onClick:()=>{var e;return C&&(null===(e=z.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),C&&k(!0)},onDragLeave:e=>{e.preventDefault(),k(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),k(!1),C&&e.dataTransfer.files.length>0&&D(e.dataTransfer.files)},children:j?(0,a.jsxs)(d,{children:["Click or drag files to attach (",r.length,"/",i,")"]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d,{children:w?"Drop files here":"Click or drag files to attach"}),(0,a.jsxs)(p,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",i-r.length," remaining)"]})]})}),(0,a.jsx)(c,{ref:z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&D(e.target.files),e.target.value=""}}),(r.length>0||E)&&(0,a.jsxs)(x,{children:[E&&(0,a.jsxs)(A,{children:[(0,a.jsx)(F,{}),"Uploading..."]}),r.map((e,t)=>{return(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(l=e.mimeType,l.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===l?"\ud83d\udcc4":l.includes("word")||l.includes("document")?"\ud83d\udcdd":l.includes("sheet")||l.includes("excel")?"\ud83d\udcca":l.includes("zip")||l.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,a.jsxs)(f,{children:[(0,a.jsx)(u,{children:e.originalName}),(0,a.jsx)(m,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]}),!v&&(0,a.jsx)(y,{onClick:()=>(async e=>{const t=r[e];try{const e=(0,o.c4)();await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:t.url})})}catch(i){}n(r.filter((r,n)=>n!==e))})(t),title:"Remove",children:"\u2715"})]},e.url);var i,l})]})]})}},9061:(e,r,n)=>{n.d(r,{c:()=>a});var t=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(t.Fragment,{children:e},r))}}}]);