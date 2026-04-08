"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9889],{4185:(e,r,n)=>{n.d(r,{A:()=>u});n(9950);var t=n(4752),i=n(4414);const o=t.Ay.div`
  margin-top: 12px;
`,a=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=t.Ay.a`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const n=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,r)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,r)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},r);var n,t})})]})}},4302:(e,r,n)=>{n.d(r,{A:()=>D});var t=n(9950),i=n(4752),o=n(4185),a=n(9061),s=n(5030),l=n(4414);const d=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=i.Ay.h4`
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
`,x=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=i.Ay.div`
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
`,u=i.Ay.div`
  flex: 1;
  min-width: 0;
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,b=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=i.Ay.p`
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
`,A=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,w=i.Ay.div`
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
`,k=i.Ay.div`
  display: flex;
  gap: 4px;
`,E=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,B=i.Ay.button`
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
`,I=i.Ay.div`
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
`,q=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,S=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,P=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=i.Ay.input`
  display: none;
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=i.Ay.label`
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
`,D=e=>{let{entityType:r,entityId:n,currentUserId:i,onMarkRead:D}=e;const{t:T}=(0,s.Bd)("common"),[L,O]=(0,t.useState)([]),[M,R]=(0,t.useState)(""),[U,J]=(0,t.useState)(!1),[W,Y]=(0,t.useState)([]),[K,H]=(0,t.useState)(!1),[G,Q]=(0,t.useState)(""),[V,X]=(0,t.useState)(!1),Z=(0,t.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${r}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{n&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n})}),D&&D(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,n]);const re=async()=>{if(K)return;const e=M.trim(),t=W.length>0;if((e||t)&&!V){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n,content:M.trim(),attachments:t?W:void 0,is_internal:U||void 0})})).ok&&(R(""),Y([]),J(!1),ee())}catch(i){console.error("Error adding comment:",i)}finally{X(!1)}}},ne=e=>{const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(p,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(c,{children:L.map(e=>{var r,n,s;return(0,l.jsxs)(x,{isInternal:e.is_internal,children:[(0,l.jsx)(h,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(y,{children:"Internal"}),(0,l.jsx)(b,{children:ne(e.createdAt)}),i&&e.author_id===Number(i)&&(0,l.jsx)(v,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&ee()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(j,{children:e.content.split("\n").map((e,r)=>(0,l.jsxs)(t.Fragment,{children:[r>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(C,{children:"No comments yet"}),(0,l.jsxs)(A,{children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(F,{value:M,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),re())},placeholder:U?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)(E,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(B,{onClick:re,disabled:!M.trim()&&0===W.length||V||K,children:"Send"})]})]}),(0,l.jsx)($,{children:(0,l.jsxs)(N,{children:[(0,l.jsx)("input",{type:"checkbox",checked:U,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(W.length>0||K||G)&&(0,l.jsxs)(I,{children:[K&&(0,l.jsx)(S,{children:"Uploading..."}),G&&(0,l.jsx)(P,{children:G}),W.map((e,r)=>(0,l.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(q,{onClick:()=>(e=>{const r=W[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),Y(r=>r.filter((r,n)=>n!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(_,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const n=5-W.length,t=Array.from(r).slice(0,n);if(e.target.value="",0!==t.length){H(!0),Q("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await n.json();i.success&&i.data?Y(e=>[...e,...i.data]):Q(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),Q("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},9061:(e,r,n)=>{n.d(r,{c:()=>a});var t=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(t.Fragment,{children:e},r))}},9889:(e,r,n)=>{n.r(r),n.d(r,{default:()=>W});var t=n(9950),i=n(4752),o=n(1367),a=n(8409),s=n(4302),l=n(4185),d=n(5030),p=n(4414);const c=i.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
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
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,v=i.Ay.input`
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
`,A=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,w=i.Ay.div`
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
`,k=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=i.Ay.div`
  flex: 1;
`,B=i.Ay.div`
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
`,I=i.Ay.div`
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
`,q=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,S=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,P=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,$=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=i.Ay.span`
  color: #374151;
`,D=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,T=i.Ay.div`
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
`,O=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,M=i.Ay.div`
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
`,R=i.Ay.div`
  margin-bottom: 20px;
`,U=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,J=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,W=()=>{const{t:e}=(0,d.Bd)("admin"),{user:r}=(0,o.As)(),[n,i]=(0,t.useState)([]),[W,Y]=(0,t.useState)(""),[K,H]=(0,t.useState)("all"),[G,Q]=(0,t.useState)("all"),[V,X]=(0,t.useState)(null),[Z,ee]=(0,t.useState)(""),[re,ne]=(0,t.useState)({}),te=null===r||void 0===r?void 0:r.id,ie=(null===r||void 0===r?void 0:r.role)||"Brand Manager";(0,t.useEffect)(()=>{oe();const e=setInterval(oe,1e4);return()=>clearInterval(e)},[]);const oe=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${te}&userRole=${ie}`);if(e.ok){const r=await e.json();i(r),ae(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},ae=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),t=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ne(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},se=n.filter(e=>{const r=e.subject.toLowerCase().includes(W.toLowerCase())||e.requesterName.toLowerCase().includes(W.toLowerCase())||e.ticketNumber.toLowerCase().includes(W.toLowerCase()),n="all"===K||e.status===K,t="all"===G||e.priority===G;return r&&n&&t}),le=n.length,de=n.filter(e=>"open"===e.status).length,pe=n.filter(e=>"in-progress"===e.status).length,ce=n.filter(e=>"resolved"===e.status).length,xe=e=>new Date(e).toLocaleString("en-MY");return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(u,{children:e("admin:operationInquiryPage.operationInquiry")})}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(m,{children:[(0,p.jsxs)(f,{color:"#059669",children:[(0,p.jsx)(y,{children:le}),(0,p.jsx)(b,{children:e("admin:operationInquiryPage.totalInquiries")})]}),(0,p.jsxs)(f,{color:"#D97706",children:[(0,p.jsx)(y,{children:de}),(0,p.jsx)(b,{children:e("admin:operationInquiryPage.open")})]}),(0,p.jsxs)(f,{color:"#2563EB",children:[(0,p.jsx)(y,{children:pe}),(0,p.jsx)(b,{children:e("admin:operationInquiryPage.inProgress")})]}),(0,p.jsxs)(f,{color:"#7C3AED",children:[(0,p.jsx)(y,{children:ce}),(0,p.jsx)(b,{children:e("admin:operationInquiryPage.resolved")})]})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(v,{placeholder:"Search inquiries...",value:W,onChange:e=>Y(e.target.value)}),(0,p.jsxs)(A,{value:K,onChange:e=>H(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:operationInquiryPage.allStatus")}),(0,p.jsx)("option",{value:"open",children:e("admin:operationInquiryPage.open")}),(0,p.jsx)("option",{value:"in-progress",children:e("admin:operationInquiryPage.inProgress")}),(0,p.jsx)("option",{value:"resolved",children:e("admin:operationInquiryPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("admin:operationInquiryPage.closed")})]}),(0,p.jsxs)(A,{value:G,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:operationInquiryPage.allPriority")}),(0,p.jsx)("option",{value:"urgent",children:e("admin:operationInquiryPage.urgent")}),(0,p.jsx)("option",{value:"high",children:e("admin:operationInquiryPage.high")}),(0,p.jsx)("option",{value:"medium",children:e("admin:operationInquiryPage.medium")}),(0,p.jsx)("option",{value:"low",children:e("admin:operationInquiryPage.low")})]})]}),(0,p.jsxs)(w,{children:[se.map(r=>(0,p.jsxs)(F,{onClick:()=>(e=>{X(e),ee(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(r),children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:r.ticketNumber}),(0,p.jsx)(C,{children:r.subject}),(0,p.jsxs)(I,{children:[r.requesterName," (",r.requesterRole,") - ",r.restaurantName]})]}),(0,p.jsxs)(P,{children:[(0,p.jsx)(z,{status:r.status,children:r.status}),(0,p.jsx)(q,{priority:r.priority,children:r.priority})]})]}),(0,p.jsx)(S,{children:r.description}),(0,p.jsxs)(_,{children:[(0,p.jsxs)("div",{children:[(0,p.jsx)($,{children:e("admin:operationInquiryPage.created")}),(0,p.jsx)(N,{children:xe(r.createdAt)})]}),re[r.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",re[r.id].total_comments,re[r.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[re[r.id].unread_count," new"]})]})]})]},r.id)),0===se.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,p.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("admin:operationInquiryPage.noInquiriesYet")}),(0,p.jsx)("p",{children:e("admin:operationInquiryPage.noOperationInquiriesHaveBeenSubmitted")})]})]}),V&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>X(null),title:V.ticketNumber,size:"large",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(g,{variant:"secondary",onClick:()=>X(null),children:e("admin:operationInquiryPage.close")})}),children:[(0,p.jsxs)(D,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.subject")}),(0,p.jsx)(O,{children:V.subject})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.restaurant")}),(0,p.jsx)(O,{children:V.restaurantName})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.from")}),(0,p.jsxs)(O,{children:[V.requesterName," (",V.requesterRole,")"]})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.priority")}),(0,p.jsx)(O,{children:(0,p.jsx)(q,{priority:V.priority,children:V.priority})})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.category")}),(0,p.jsx)(O,{children:V.category})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(L,{children:e("admin:operationInquiryPage.created")}),(0,p.jsx)(O,{children:xe(V.createdAt)})]})]}),(0,p.jsx)(M,{children:V.description}),(null===V||void 0===V?void 0:V.attachments)&&V.attachments.length>0&&(0,p.jsx)(l.A,{attachments:V.attachments}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:e("admin:operationInquiryPage.status")}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(A,{value:Z,onChange:e=>ee(e.target.value),children:[(0,p.jsx)("option",{value:"open",children:e("admin:operationInquiryPage.open")}),(0,p.jsx)("option",{value:"in-progress",children:e("admin:operationInquiryPage.inProgress")}),(0,p.jsx)("option",{value:"resolved",children:e("admin:operationInquiryPage.resolved")}),(0,p.jsx)("option",{value:"closed",children:e("admin:operationInquiryPage.closed")})]}),(0,p.jsx)(g,{variant:"primary",onClick:async()=>{if(V)try{(await fetch(`/api/operation-tickets/${V.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:Z})})).ok&&(await oe(),X(e=>e?{...e,status:Z}:null))}catch(e){console.error("Error updating status:",e)}},disabled:Z===V.status,children:"Save"})]})]}),(0,p.jsx)(s.A,{entityType:"operation_ticket",entityId:String(V.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>ne(e=>{const r={...e},n=String(V.id);return r[n]&&(r[n]={...r[n],unread_count:0}),r})})]})]})]})})}}}]);