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
`,d=t.Ay.a`
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
`,l=t.Ay.span`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const n=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),n.length>0&&(0,i.jsx)(x,{children:n.map((e,r)=>(0,i.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,r)=>{return(0,i.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(l,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(p,{children:e.originalName}),(0,i.jsx)(c,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},r);var n,t})})]})}},4302:(e,r,n)=>{n.d(r,{A:()=>T});var t=n(9950),i=n(4752),o=n(4185),a=n(9061),s=n(5030),d=n(9955),l=n(4414);const p=i.Ay.div`
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
`,u=i.Ay.div`
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
`,g=i.Ay.div`
  flex: 1;
  min-width: 0;
`,m=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,f=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,y=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,b=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,j=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,v=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,A=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,E=i.Ay.textarea`
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
`,C=i.Ay.button`
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
`,z=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,I=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,P=i.Ay.button`
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
`,_=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,$=i.Ay.input`
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
`,T=e=>{let{entityType:r,entityId:n,currentUserId:i,onMarkRead:T}=e;const{t:L}=(0,s.Bd)("common"),[O,M]=(0,t.useState)([]),[R,U]=(0,t.useState)(""),[J,W]=(0,t.useState)(!1),[Y,K]=(0,t.useState)([]),[H,G]=(0,t.useState)(!1),[Q,V]=(0,t.useState)(""),[X,Z]=(0,t.useState)(!1),ee=(0,t.useRef)(null),re=async()=>{try{const e=(0,d.c4)(),t=await fetch(`/api/comments/${r}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&M(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{n&&(re(),(async()=>{try{const e=(0,d.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n})}),T&&T(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,n]);const ne=async()=>{if(H)return;const e=R.trim(),t=Y.length>0;if((e||t)&&!X){Z(!0);try{const e=(0,d.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n,content:R.trim(),attachments:t?Y:void 0,is_internal:J||void 0})})).ok&&(U(""),K([]),W(!1),re())}catch(i){console.error("Error adding comment:",i)}finally{Z(!1)}}},te=e=>{const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(p,{children:[(0,l.jsxs)(c,{children:["Comments (",O.length,")"]}),O.length>0?(0,l.jsx)(x,{children:O.map(e=>{var r,n,s;return(0,l.jsxs)(h,{isInternal:e.is_internal,children:[(0,l.jsx)(u,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(f,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(y,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(b,{children:"Internal"}),(0,l.jsx)(j,{children:te(e.createdAt)}),i&&e.author_id===Number(i)&&(0,l.jsx)(A,{onClick:()=>(async e=>{try{const r=(0,d.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&re()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(v,{children:e.content.split("\n").map((e,r)=>(0,l.jsxs)(t.Fragment,{children:[r>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(z,{children:"No comments yet"}),(0,l.jsxs)(w,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(E,{value:R,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:J?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)(B,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(C,{onClick:ne,disabled:!R.trim()&&0===Y.length||X||H,children:"Send"})]})]}),(0,l.jsx)(N,{children:(0,l.jsxs)(D,{children:[(0,l.jsx)("input",{type:"checkbox",checked:J,onChange:e=>W(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Y.length>0||H||Q)&&(0,l.jsxs)(I,{children:[H&&(0,l.jsx)(S,{children:"Uploading..."}),Q&&(0,l.jsx)(_,{children:Q}),Y.map((e,r)=>(0,l.jsxs)(q,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(P,{onClick:()=>(e=>{const r=Y[e],n=(0,d.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),K(r=>r.filter((r,n)=>n!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)($,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const n=5-Y.length,t=Array.from(r).slice(0,n);if(e.target.value="",0!==t.length){G(!0),V("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=(0,d.c4)(),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await n.json();i.success&&i.data?K(e=>[...e,...i.data]):V(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),V("File upload failed. Please try again.")}finally{G(!1)}}}})]})}},9061:(e,r,n)=>{n.d(r,{c:()=>a});var t=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(t.Fragment,{children:e},r))}},9889:(e,r,n)=>{n.r(r),n.d(r,{default:()=>Y});var t=n(9950),i=n(4752),o=n(1367),a=n(8409),s=n(4302),d=n(4185),l=n(5030),p=n(9955),c=n(4414);const x=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=i.Ay.div`
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
`,u=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
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
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,A=i.Ay.input`
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
`,w=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,E=i.Ay.div`
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
`,B=i.Ay.div`
  flex: 1;
`,C=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,I=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,q=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,P=i.Ay.span`
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
`,_=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,$=i.Ay.div`
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
`,L=i.Ay.div`
  display: flex;
  align-items: center;
  padding: 6px 0;

  &:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`,O=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  width: 100px;
  flex-shrink: 0;
`,M=i.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,R=i.Ay.div`
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
`,U=i.Ay.div`
  margin-bottom: 20px;
`,J=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Y=()=>{const{t:e}=(0,l.Bd)("admin"),{user:r}=(0,o.As)(),[n,i]=(0,t.useState)([]),[Y,K]=(0,t.useState)(""),[H,G]=(0,t.useState)("all"),[Q,V]=(0,t.useState)("all"),[X,Z]=(0,t.useState)(null),[ee,re]=(0,t.useState)(""),[ne,te]=(0,t.useState)({}),ie=null===r||void 0===r?void 0:r.id,oe=(null===r||void 0===r?void 0:r.role)||"Brand Manager";(0,t.useEffect)(()=>{ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)},[]);const ae=async()=>{try{const e=await fetch(`/api/operation-tickets?userId=${ie}&userRole=${oe}`);if(e.ok){const r=await e.json();i(r),se(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},se=async e=>{if(0!==e.length)try{const r=(0,p.c4)(),n=e.map(e=>e.id).join(","),t=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),te(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},de=n.filter(e=>{const r=e.subject.toLowerCase().includes(Y.toLowerCase())||e.requesterName.toLowerCase().includes(Y.toLowerCase())||e.ticketNumber.toLowerCase().includes(Y.toLowerCase()),n="all"===H||e.status===H,t="all"===Q||e.priority===Q;return r&&n&&t}),le=n.length,pe=n.filter(e=>"open"===e.status).length,ce=n.filter(e=>"in-progress"===e.status).length,xe=n.filter(e=>"resolved"===e.status).length,he=e=>new Date(e).toLocaleString("en-MY");return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(g,{children:e("admin:operationInquiryPage.operationInquiry")})}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(f,{children:[(0,c.jsxs)(y,{color:"#059669",children:[(0,c.jsx)(b,{children:le}),(0,c.jsx)(j,{children:e("admin:operationInquiryPage.totalInquiries")})]}),(0,c.jsxs)(y,{color:"#D97706",children:[(0,c.jsx)(b,{children:pe}),(0,c.jsx)(j,{children:e("admin:operationInquiryPage.open")})]}),(0,c.jsxs)(y,{color:"#2563EB",children:[(0,c.jsx)(b,{children:ce}),(0,c.jsx)(j,{children:e("admin:operationInquiryPage.inProgress")})]}),(0,c.jsxs)(y,{color:"#7C3AED",children:[(0,c.jsx)(b,{children:xe}),(0,c.jsx)(j,{children:e("admin:operationInquiryPage.resolved")})]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(A,{placeholder:"Search inquiries...",value:Y,onChange:e=>K(e.target.value)}),(0,c.jsxs)(w,{value:H,onChange:e=>G(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("admin:operationInquiryPage.allStatus")}),(0,c.jsx)("option",{value:"open",children:e("admin:operationInquiryPage.open")}),(0,c.jsx)("option",{value:"in-progress",children:e("admin:operationInquiryPage.inProgress")}),(0,c.jsx)("option",{value:"resolved",children:e("admin:operationInquiryPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("admin:operationInquiryPage.closed")})]}),(0,c.jsxs)(w,{value:Q,onChange:e=>V(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("admin:operationInquiryPage.allPriority")}),(0,c.jsx)("option",{value:"urgent",children:e("admin:operationInquiryPage.urgent")}),(0,c.jsx)("option",{value:"high",children:e("admin:operationInquiryPage.high")}),(0,c.jsx)("option",{value:"medium",children:e("admin:operationInquiryPage.medium")}),(0,c.jsx)("option",{value:"low",children:e("admin:operationInquiryPage.low")})]})]}),(0,c.jsxs)(F,{children:[de.map(r=>(0,c.jsxs)(E,{onClick:()=>(e=>{Z(e),re(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(r),children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(C,{children:r.ticketNumber}),(0,c.jsx)(z,{children:r.subject}),(0,c.jsxs)(I,{children:[r.requesterName," (",r.requesterRole,") - ",r.restaurantName]})]}),(0,c.jsxs)(_,{children:[(0,c.jsx)(q,{status:r.status,children:r.status}),(0,c.jsx)(P,{priority:r.priority,children:r.priority})]})]}),(0,c.jsx)(S,{children:r.description}),(0,c.jsxs)($,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(N,{children:e("admin:operationInquiryPage.created")}),(0,c.jsx)(D,{children:he(r.createdAt)})]}),ne[r.id]&&(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ne[r.id].total_comments,ne[r.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ne[r.id].unread_count," new"]})]})]})]},r.id)),0===de.length&&(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,c.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("admin:operationInquiryPage.noInquiriesYet")}),(0,c.jsx)("p",{children:e("admin:operationInquiryPage.noOperationInquiriesHaveBeenSubmitted")})]})]}),X&&(0,c.jsxs)(a.aF,{isOpen:!0,onClose:()=>Z(null),title:X.ticketNumber,size:"large",footer:(0,c.jsx)(c.Fragment,{children:(0,c.jsx)(m,{variant:"secondary",onClick:()=>Z(null),children:e("admin:operationInquiryPage.close")})}),children:[(0,c.jsxs)(T,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.subject")}),(0,c.jsx)(M,{children:X.subject})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.restaurant")}),(0,c.jsx)(M,{children:X.restaurantName})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.from")}),(0,c.jsxs)(M,{children:[X.requesterName," (",X.requesterRole,")"]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.priority")}),(0,c.jsx)(M,{children:(0,c.jsx)(P,{priority:X.priority,children:X.priority})})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.category")}),(0,c.jsx)(M,{children:X.category})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(O,{children:e("admin:operationInquiryPage.created")}),(0,c.jsx)(M,{children:he(X.createdAt)})]})]}),(0,c.jsx)(R,{children:X.description}),(null===X||void 0===X?void 0:X.attachments)&&X.attachments.length>0&&(0,c.jsx)(d.A,{attachments:X.attachments}),(0,c.jsxs)(U,{children:[(0,c.jsx)(J,{children:e("admin:operationInquiryPage.status")}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(w,{value:ee,onChange:e=>re(e.target.value),children:[(0,c.jsx)("option",{value:"open",children:e("admin:operationInquiryPage.open")}),(0,c.jsx)("option",{value:"in-progress",children:e("admin:operationInquiryPage.inProgress")}),(0,c.jsx)("option",{value:"resolved",children:e("admin:operationInquiryPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("admin:operationInquiryPage.closed")})]}),(0,c.jsx)(m,{variant:"primary",onClick:async()=>{if(X)try{(await fetch(`/api/operation-tickets/${X.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:ee})})).ok&&(await ae(),Z(e=>e?{...e,status:ee}:null))}catch(e){console.error("Error updating status:",e)}},disabled:ee===X.status,children:"Save"})]})]}),(0,c.jsx)(s.A,{entityType:"operation_ticket",entityId:String(X.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>te(e=>{const r={...e},n=String(X.id);return r[n]&&(r[n]={...r[n],unread_count:0}),r})})]})]})]})})}}}]);