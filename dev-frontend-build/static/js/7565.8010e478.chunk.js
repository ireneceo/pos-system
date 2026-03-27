"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7565],{2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,o.jsx)(i,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,o.jsx)(a,{active:t,onClick:r,className:i,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,o.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>i});var n=r(9950),o=r(4492);function i(e){const[t,r]=(0,o.ok)(),i=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(i());return[a,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var n=r(4752),o=r(4414);const i=n.Ay.div`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),n=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,o.jsx)(x,{children:r.map((e,t)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},t))}),n.length>0&&(0,o.jsx)(s,{children:n.map((e,t)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(n=e.mimeType,"application/pdf"===n?"\ud83d\udcc4":n.includes("word")||n.includes("document")?"\ud83d\udcdd":n.includes("sheet")||n.includes("excel")?"\ud83d\udcca":n.includes("zip")||n.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,n})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>D});var n=r(9950),o=r(4752),i=r(4185),a=r(9061),s=r(4414);const l=o.Ay.div`
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
`,D=e=>{let{entityType:t,entityId:r,currentUserId:o,onMarkRead:D}=e;const[L,O]=(0,n.useState)([]),[M,P]=(0,n.useState)(""),[R,U]=(0,n.useState)(!1),[q,J]=(0,n.useState)([]),[W,K]=(0,n.useState)(!1),[Y,H]=(0,n.useState)(""),[G,Z]=(0,n.useState)(!1),Q=(0,n.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&O(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,n.useEffect)(()=>{r&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),D&&D(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const X=async()=>{if(W)return;const e=M.trim(),n=q.length>0;if((e||n)&&!G){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:M.trim(),attachments:n?q:void 0,is_internal:R||void 0})})).ok&&(P(""),J([]),U(!1),V())}catch(o){console.error("Error adding comment:",o)}finally{Z(!1)}}},ee=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4);if(n<1)return"Just now";if(n<60)return`${n}m ago`;const o=Math.floor(n/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",L.length,")"]}),L.length>0?(0,s.jsx)(c,{children:L.map(e=>{var t,r,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,s.jsx)(f,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(m,{children:"Internal"}),(0,s.jsx)(y,{children:ee(e.createdAt)}),o&&e.author_id===o&&(0,s.jsx)(w,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&V()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(b,{children:e.content.split("\n").map((e,t)=>(0,s.jsxs)(n.Fragment,{children:[t>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(B,{children:"No comments yet"}),(0,s.jsxs)(j,{children:[(0,s.jsxs)(v,{children:[(0,s.jsx)(F,{value:M,onChange:e=>P(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=Q.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(E,{onClick:X,disabled:!M.trim()&&0===q.length||G||W,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(T,{children:[(0,s.jsx)("input",{type:"checkbox",checked:R,onChange:e=>U(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(q.length>0||W||Y)&&(0,s.jsxs)(C,{children:[W&&(0,s.jsx)($,{children:"Uploading..."}),Y&&(0,s.jsx)(_,{children:Y}),q.map((e,t)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const t=q[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),J(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(I,{ref:Q,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const r=5-q.length,n=Array.from(t).slice(0,r);if(e.target.value="",0!==n.length){K(!0),H("");try{const e=new FormData;n.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),o=await r.json();o.success&&o.data?J(e=>[...e,...o.data]):H(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),H("File upload failed. Please try again.")}finally{K(!1)}}}})]})}},7565:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var n=r(9950),o=r(4752),i=r(1367),a=r(8409),s=r(2597),l=r(2653),d=r(4302),c=r(4185),p=r(4414);const x=o.Ay.div`
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
`,v=(o.Ay.div`
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
`),F=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,A=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=o.Ay.div`
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
`,E=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=o.Ay.div`
  flex: 1;
`,C=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,S=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,$=o.Ay.div`
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
`,I=o.Ay.span`
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
`,O=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=o.Ay.select`
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
`,P=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,R=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,U=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,q=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,J=o.Ay.div`
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
`,W=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,n.useState)([]),[o,W]=(0,n.useState)(""),[K,Y]=(0,l.M)("active"),[H,G]=(0,n.useState)("all"),[Z,Q]=(0,n.useState)(null),[V,X]=(0,n.useState)("open"),[ee,te]=(0,n.useState)({}),re=(null===e||void 0===e?void 0:e.id)||"4",ne=(null===e||void 0===e?void 0:e.role)||"Foodcourt General";(0,n.useEffect)(()=>{if(e){oe();const e=setInterval(oe,1e4);return()=>clearInterval(e)}},[e]);const oe=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/operation-tickets?userId=${re}&userRole=${ne}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();r(e),ie(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},ie=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),te(t)}}}catch(t){console.error("Error fetching unread counts:",t)}},ae=t.filter(e=>{const t=e.subject.toLowerCase().includes(o.toLowerCase())||e.ticketNumber.toLowerCase().includes(o.toLowerCase())||e.requesterName.toLowerCase().includes(o.toLowerCase())||e.restaurantName.toLowerCase().includes(o.toLowerCase()),r="active"===K?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,n="all"===H||e.priority===H;return t&&r&&n}),se=t.length,le=t.filter(e=>"open"===e.status).length,de=t.filter(e=>"in-progress"===e.status).length,ce=t.filter(e=>"resolved"===e.status).length,pe=t.filter(e=>"closed"===e.status).length,xe=e=>new Date(e).toLocaleString("en-MY"),he=e=>{const t=Math.floor(e/60),r=e%60;return t>0?`${t}h ${r}m`:`${r}m`};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(h,{children:(0,p.jsx)(g,{children:"Operation Inquiry"})}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(m,{children:[(0,p.jsxs)(y,{borderColor:"#635BFF",children:[(0,p.jsx)(b,{children:se}),(0,p.jsx)(w,{children:"Total Inquiries"})]}),(0,p.jsxs)(y,{borderColor:"#F59E0B",children:[(0,p.jsx)(b,{children:le}),(0,p.jsx)(w,{children:"Open"})]}),(0,p.jsxs)(y,{borderColor:"#3B82F6",children:[(0,p.jsx)(b,{children:de}),(0,p.jsx)(w,{children:"In Progress"})]}),(0,p.jsxs)(y,{borderColor:"#10B981",children:[(0,p.jsx)(b,{children:ce}),(0,p.jsx)(w,{children:"Resolved"})]})]}),(0,p.jsxs)(s.tU,{children:[(0,p.jsxs)(s.oz,{active:"active"===K,onClick:()=>Y("active"),children:["Active Tickets (",le+de,")"]}),(0,p.jsxs)(s.oz,{active:"closed"===K,onClick:()=>Y("closed"),children:["Closed Tickets (",pe+ce,")"]})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(v,{placeholder:"Search inquiries...",value:o,onChange:e=>W(e.target.value)}),(0,p.jsxs)(F,{value:H,onChange:e=>G(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]}),(0,p.jsxs)(A,{children:[ae.map(e=>(0,p.jsxs)(k,{onClick:()=>(e=>{Q(e),X(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,p.jsxs)(E,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(C,{children:e.ticketNumber}),(0,p.jsx)(z,{children:e.subject}),(0,p.jsxs)(S,{children:[(0,p.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,p.jsxs)("span",{children:["From: ",e.requesterName]}),(0,p.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(_,{status:e.status,children:e.status}),(0,p.jsx)(I,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(N,{children:e.description}),(0,p.jsxs)(T,{children:[(0,p.jsxs)("span",{children:["Created: ",xe(e.createdAt)]}),e.responseTime>0&&(0,p.jsxs)("span",{children:["Response Time: ",he(e.responseTime)]}),ee[e.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ee[e.id].total_comments,ee[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ee[e.id].unread_count," new"]})]}),"active"===K&&(0,p.jsx)(D,{onClick:t=>{t.stopPropagation(),(async()=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/operation-tickets/${e.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({status:"closed"})})).ok&&(r(t=>t.map(t=>t.id===e.id?{...t,status:"closed"}:t)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(t){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===ae.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,p.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:"No inquiries yet"}),(0,p.jsx)("p",{children:"Restaurant inquiries will appear here when submitted."})]})]}),Z&&(0,p.jsxs)(a.aF,{isOpen:!0,onClose:()=>Q(null),title:Z.ticketNumber,size:"large",footer:(0,p.jsx)(p.Fragment,{children:(0,p.jsx)(f,{variant:"secondary",onClick:()=>Q(null),children:"Close"})}),children:[(0,p.jsxs)(P,{children:[(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"Subject:"}),(0,p.jsx)(q,{children:Z.subject})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"Restaurant:"}),(0,p.jsx)(q,{children:Z.restaurantName})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"From:"}),(0,p.jsx)(q,{children:Z.requesterName})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"Priority:"}),(0,p.jsx)(q,{children:(0,p.jsx)(I,{priority:Z.priority,children:Z.priority})})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"Category:"}),(0,p.jsx)(q,{children:Z.category})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(U,{children:"Created:"}),(0,p.jsx)(q,{children:xe(Z.createdAt)})]})]}),(0,p.jsx)(O,{children:"Description"}),(0,p.jsx)(J,{children:Z.description}),(null===Z||void 0===Z?void 0:Z.attachments)&&Z.attachments.length>0&&(0,p.jsx)(c.A,{attachments:Z.attachments}),(0,p.jsxs)(L,{children:[(0,p.jsx)(O,{children:"Status"}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,p.jsxs)(M,{value:V,onChange:e=>X(e.target.value),style:{flex:1},children:[(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]}),V!==Z.status&&(0,p.jsx)(f,{variant:"primary",onClick:async()=>{if(Z&&V!==Z.status)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/operation-tickets/${Z.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:V,..."resolved"===V&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(t.ok){const e=await t.json(),n=e.data||e;r(e=>e.map(e=>e.id===Z.id?{...e,...n}:e)),Q(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,p.jsx)(d.A,{entityType:"operation_ticket",entityId:String(Z.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>te(e=>{const t={...e},r=String(Z.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})]})})}},9061:(e,t,r)=>{r.d(t,{c:()=>a});var n=r(9950),o=r(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(i);return 1===t.length?e:t.map((e,t)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,o.jsx)(n.Fragment,{children:e},t))}}}]);