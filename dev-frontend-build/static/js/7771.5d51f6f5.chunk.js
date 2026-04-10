"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7771],{2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),o=t(4492);function i(e){const[r,t]=(0,o.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[a,s]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{s(e),t({tab:e})},[t])]}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),o=t(4414);const i=n.Ay.div`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),n=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,o.jsx)(x,{children:t.map((e,r)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},r))}),n.length>0&&(0,o.jsx)(s,{children:n.map((e,r)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,n})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>D});var n=t(9950),o=t(4752),i=t(4185),a=t(9061),s=t(5030),l=t(9955),d=t(4414);const c=o.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,x=o.Ay.div`
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
`,u=o.Ay.div`
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
`,m=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,f=o.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,y=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,b=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,w=o.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,v=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,A=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,k=o.Ay.textarea`
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
`,E=o.Ay.div`
  display: flex;
  gap: 4px;
`,B=o.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,C=o.Ay.button`
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
`,I=o.Ay.div`
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
`,$=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,P=o.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,_=o.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,q=o.Ay.input`
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
`,D=e=>{let{entityType:r,entityId:t,currentUserId:o,onMarkRead:D}=e;const{t:L}=(0,s.Bd)("common"),[M,O]=(0,n.useState)([]),[R,U]=(0,n.useState)(""),[J,W]=(0,n.useState)(!1),[Y,K]=(0,n.useState)([]),[H,G]=(0,n.useState)(!1),[Q,V]=(0,n.useState)(""),[X,Z]=(0,n.useState)(!1),ee=(0,n.useRef)(null),re=async()=>{try{const e=(0,l.c4)(),n=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{t&&(re(),(async()=>{try{const e=(0,l.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),D&&D(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const te=async()=>{if(H)return;const e=R.trim(),n=Y.length>0;if((e||n)&&!X){Z(!0);try{const e=(0,l.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:R.trim(),attachments:n?Y:void 0,is_internal:J||void 0})})).ok&&(U(""),K([]),W(!1),re())}catch(o){console.error("Error adding comment:",o)}finally{Z(!1)}}},ne=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),n=Math.floor(t/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:["Comments (",M.length,")"]}),M.length>0?(0,d.jsx)(x,{children:M.map(e=>{var r,t,s;return(0,d.jsxs)(h,{isInternal:e.is_internal,children:[(0,d.jsx)(u,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(f,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,d.jsx)(y,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,d.jsx)(b,{children:"Internal"}),(0,d.jsx)(w,{children:ne(e.createdAt)}),o&&e.author_id===Number(o)&&(0,d.jsx)(v,{onClick:()=>(async e=>{try{const r=(0,l.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&re()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(j,{children:e.content.split("\n").map((e,r)=>(0,d.jsxs)(n.Fragment,{children:[r>0&&(0,d.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(z,{children:"No comments yet"}),(0,d.jsxs)(A,{children:[(0,d.jsxs)(F,{children:[(0,d.jsx)(k,{value:R,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),te())},placeholder:J?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(E,{children:[(0,d.jsx)(B,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(C,{onClick:te,disabled:!R.trim()&&0===Y.length||X||H,children:"Send"})]})]}),(0,d.jsx)(N,{children:(0,d.jsxs)(T,{children:[(0,d.jsx)("input",{type:"checkbox",checked:J,onChange:e=>W(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Y.length>0||H||Q)&&(0,d.jsxs)(I,{children:[H&&(0,d.jsx)(P,{children:"Uploading..."}),Q&&(0,d.jsx)(_,{children:Q}),Y.map((e,r)=>(0,d.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)($,{onClick:()=>(e=>{const r=Y[e],t=(0,l.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),K(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(q,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-Y.length,n=Array.from(r).slice(0,t);if(e.target.value="",0!==n.length){G(!0),V("");try{const e=new FormData;n.forEach(r=>e.append("files",r));const r=(0,l.c4)(),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),o=await t.json();o.success&&o.data?K(e=>[...e,...o.data]):V(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),V("File upload failed. Please try again.")}finally{G(!1)}}}})]})}},7771:(e,r,t)=>{t.r(r),t.d(r,{default:()=>K});var n=t(9950),o=t(4752),i=t(1367),a=t(8409),s=t(2597),l=t(2653),d=t(4302),c=t(4185),p=t(5030),x=t(9955),h=t(4414);const u=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,g=o.Ay.div`
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
`,m=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,w=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,F=(o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,o.Ay.input`
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
`),k=o.Ay.select`
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
`,I=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,$=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,P=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,_=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,q=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=o.Ay.div`
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
`,T=o.Ay.div`
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
`,D=o.Ay.button`
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
`,L=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=o.Ay.select`
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
`,R=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,U=o.Ay.div`
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
`,Y=o.Ay.div`
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
`,K=()=>{const{t:e}=(0,p.Bd)("common"),{user:r}=(0,i.As)(),[t,o]=(0,n.useState)([]),[K,H]=(0,n.useState)(""),[G,Q]=(0,l.M)("active"),[V,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)(null),[re,te]=(0,n.useState)("open"),[ne,oe]=(0,n.useState)({}),ie=(null===r||void 0===r?void 0:r.id)||"2",ae=(null===r||void 0===r?void 0:r.role)||"Brand General";(0,n.useEffect)(()=>{if(r){se();const e=setInterval(se,1e4);return()=>clearInterval(e)}},[r]);const se=async()=>{try{const e=(0,x.c4)(),r=await fetch(`/api/operation-tickets?userId=${ie}&userRole=${ae}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();o(e),le(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},le=async e=>{if(0!==e.length)try{const r=(0,x.c4)(),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),oe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},de=t.filter(e=>{const r=e.subject.toLowerCase().includes(K.toLowerCase())||e.ticketNumber.toLowerCase().includes(K.toLowerCase())||e.requesterName.toLowerCase().includes(K.toLowerCase())||e.restaurantName.toLowerCase().includes(K.toLowerCase()),t="active"===G?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,n="all"===V||e.priority===V;return r&&t&&n}),ce=t.length,pe=t.filter(e=>"open"===e.status).length,xe=t.filter(e=>"in-progress"===e.status).length,he=t.filter(e=>"resolved"===e.status).length,ue=t.filter(e=>"closed"===e.status).length,ge=e=>new Date(e).toLocaleString("en-MY"),me=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:(0,h.jsx)(f,{children:e("common:operationInquiryPage.operationInquiry")})}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(b,{children:[(0,h.jsxs)(w,{borderColor:"#635BFF",children:[(0,h.jsx)(j,{children:ce}),(0,h.jsx)(v,{children:e("common:operationInquiryPage.totalInquiries")})]}),(0,h.jsxs)(w,{borderColor:"#F59E0B",children:[(0,h.jsx)(j,{children:pe}),(0,h.jsx)(v,{children:e("common:operationInquiryPage.open")})]}),(0,h.jsxs)(w,{borderColor:"#3B82F6",children:[(0,h.jsx)(j,{children:xe}),(0,h.jsx)(v,{children:e("common:operationInquiryPage.inProgress")})]}),(0,h.jsxs)(w,{borderColor:"#10B981",children:[(0,h.jsx)(j,{children:he}),(0,h.jsx)(v,{children:e("common:operationInquiryPage.resolved")})]})]}),(0,h.jsxs)(s.tU,{children:[(0,h.jsxs)(s.oz,{active:"active"===G,onClick:()=>Q("active"),children:["Active Tickets (",pe+xe,")"]}),(0,h.jsxs)(s.oz,{active:"closed"===G,onClick:()=>Q("closed"),children:["Closed Tickets (",ue+he,")"]})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(F,{placeholder:"Search inquiries...",value:K,onChange:e=>H(e.target.value)}),(0,h.jsxs)(k,{value:V,onChange:e=>X(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:e("common:operationInquiryPage.allPriority")}),(0,h.jsx)("option",{value:"urgent",children:e("common:operationInquiryPage.urgent")}),(0,h.jsx)("option",{value:"high",children:e("common:operationInquiryPage.high")}),(0,h.jsx)("option",{value:"medium",children:e("common:operationInquiryPage.medium")}),(0,h.jsx)("option",{value:"low",children:e("common:operationInquiryPage.low")})]})]}),(0,h.jsxs)(E,{children:[de.map(e=>(0,h.jsxs)(B,{onClick:()=>(e=>{ee(e),te(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(z,{children:[(0,h.jsx)(I,{children:e.ticketNumber}),(0,h.jsx)(S,{children:e.subject}),(0,h.jsxs)($,{children:[(0,h.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,h.jsxs)("span",{children:["From: ",e.requesterName]}),(0,h.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(_,{status:e.status,children:e.status}),(0,h.jsx)(q,{priority:e.priority,children:e.priority})]})]}),(0,h.jsx)(N,{children:e.description}),(0,h.jsxs)(T,{children:[(0,h.jsxs)("span",{children:["Created: ",ge(e.createdAt)]}),e.responseTime>0&&(0,h.jsxs)("span",{children:["Response Time: ",me(e.responseTime)]}),ne[e.id]&&(0,h.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ne[e.id].total_comments,ne[e.id].unread_count>0&&(0,h.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ne[e.id].unread_count," new"]})]}),"active"===G&&(0,h.jsx)(D,{onClick:r=>{r.stopPropagation(),(async()=>{try{const r=(0,x.c4)();(await fetch(`/api/operation-tickets/${e.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"closed"})})).ok&&(o(r=>r.map(r=>r.id===e.id?{...r,status:"closed"}:r)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(r){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===de.length&&(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("common:operationInquiryPage.noInquiriesYet")}),(0,h.jsx)("p",{children:e("common:operationInquiryPage.restaurantInquiriesWillAppearHereWhenSubmitted")})]})]}),Z&&(0,h.jsxs)(a.aF,{isOpen:!0,onClose:()=>ee(null),title:Z.ticketNumber,size:"large",footer:(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(y,{variant:"secondary",onClick:()=>ee(null),children:e("common:operationInquiryPage.close")})}),children:[(0,h.jsxs)(R,{children:[(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"Subject:"}),(0,h.jsx)(W,{children:Z.subject})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"Restaurant:"}),(0,h.jsx)(W,{children:Z.restaurantName})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"From:"}),(0,h.jsx)(W,{children:Z.requesterName})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"Priority:"}),(0,h.jsx)(W,{children:(0,h.jsx)(q,{priority:Z.priority,children:Z.priority})})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"Category:"}),(0,h.jsx)(W,{children:Z.category})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(J,{children:"Created:"}),(0,h.jsx)(W,{children:ge(Z.createdAt)})]})]}),(0,h.jsx)(M,{children:e("common:operationInquiryPage.description")}),(0,h.jsx)(Y,{children:Z.description}),(null===Z||void 0===Z?void 0:Z.attachments)&&Z.attachments.length>0&&(0,h.jsx)(c.A,{attachments:Z.attachments}),(0,h.jsxs)(L,{children:[(0,h.jsx)(M,{children:e("common:operationInquiryPage.status")}),(0,h.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,h.jsxs)(O,{value:re,onChange:e=>te(e.target.value),style:{flex:1},children:[(0,h.jsx)("option",{value:"open",children:e("common:operationInquiryPage.open")}),(0,h.jsx)("option",{value:"in-progress",children:e("common:operationInquiryPage.inProgress")}),(0,h.jsx)("option",{value:"resolved",children:e("common:operationInquiryPage.resolved")}),(0,h.jsx)("option",{value:"closed",children:e("common:operationInquiryPage.closed")})]}),re!==Z.status&&(0,h.jsx)(y,{variant:"primary",onClick:async()=>{if(Z&&re!==Z.status)try{const e=(0,x.c4)(),r=await fetch(`/api/operation-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:re,..."resolved"===re&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),t=e.data||e;o(e=>e.map(e=>e.id===Z.id?{...e,...t}:e)),ee(e=>e?{...e,...t}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,h.jsx)(d.A,{entityType:"operation_ticket",entityId:String(Z.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>oe(e=>{const r={...e},t=String(Z.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}},9061:(e,r,t)=>{t.d(r,{c:()=>a});var n=t(9950),o=t(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(i);return 1===r.length?e:r.map((e,r)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,o.jsx)(n.Fragment,{children:e},r))}}}]);