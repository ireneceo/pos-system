"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7565],{2653:(e,r,t)=>{t.d(r,{M:()=>i});var o=t(9950),n=t(4492);function i(e){const[r,t]=(0,n.ok)(),i=(0,o.useCallback)(()=>r.get("tab")||e,[r,e]),[a,s]=(0,o.useState)(i());return[a,(0,o.useCallback)(e=>{s(e),t({tab:e})},[t])]}},4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var o=t(4752),n=t(4414);const i=o.Ay.div`
  margin-top: 12px;
`,a=o.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=o.Ay.a`
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
`,d=o.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=o.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=o.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=o.Ay.a`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),o=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,n.jsxs)(i,{children:[(0,n.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,n.jsx)(x,{children:t.map((e,r)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},r))}),o.length>0&&(0,n.jsx)(s,{children:o.map((e,r)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(o=e.mimeType,"application/pdf"===o?"\ud83d\udcc4":o.includes("word")||o.includes("document")?"\ud83d\udcdd":o.includes("sheet")||o.includes("excel")?"\ud83d\udcca":o.includes("zip")||o.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,o})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>T});var o=t(9950),n=t(4752),i=t(4185),a=t(9061),s=t(5030),l=t(4414);const d=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,x=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=n.Ay.div`
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
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=n.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,b=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,w=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,F=n.Ay.textarea`
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
`,k=n.Ay.div`
  display: flex;
  gap: 4px;
`,E=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,B=n.Ay.button`
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
`,C=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,z=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,I=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,_=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=n.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,P=n.Ay.input`
  display: none;
`,q=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=n.Ay.label`
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
`,T=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:T}=e;const{t:D}=(0,s.Bd)("common"),[L,M]=(0,o.useState)([]),[O,R]=(0,o.useState)(""),[U,J]=(0,o.useState)(!1),[W,Y]=(0,o.useState)([]),[K,H]=(0,o.useState)(!1),[G,Q]=(0,o.useState)(""),[V,X]=(0,o.useState)(!1),Z=(0,o.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(o.ok){const e=await o.json();e.success&&M(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,o.useEffect)(()=>{t&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),T&&T(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const re=async()=>{if(K)return;const e=O.trim(),o=W.length>0;if((e||o)&&!V){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:O.trim(),attachments:o?W:void 0,is_internal:U||void 0})})).ok&&(R(""),Y([]),J(!1),ee())}catch(n){console.error("Error adding comment:",n)}finally{X(!1)}}},te=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),o=Math.floor(t/6e4);if(o<1)return"Just now";if(o<60)return`${o}m ago`;const n=Math.floor(o/60);if(n<24)return`${n}h ago`;const i=Math.floor(n/24);return i<7?`${i}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:["Comments (",L.length,")"]}),L.length>0?(0,l.jsx)(p,{children:L.map(e=>{var r,t,s;return(0,l.jsxs)(x,{isInternal:e.is_internal,children:[(0,l.jsx)(h,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(y,{children:"Internal"}),(0,l.jsx)(b,{children:te(e.createdAt)}),n&&e.author_id===Number(n)&&(0,l.jsx)(w,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&ee()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(j,{children:e.content.split("\n").map((e,r)=>(0,l.jsxs)(o.Fragment,{children:[r>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(C,{children:"No comments yet"}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(F,{value:O,onChange:e=>R(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),re())},placeholder:U?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(k,{children:[(0,l.jsx)(E,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(B,{onClick:re,disabled:!O.trim()&&0===W.length||V||K,children:"Send"})]})]}),(0,l.jsx)(q,{children:(0,l.jsxs)(N,{children:[(0,l.jsx)("input",{type:"checkbox",checked:U,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(W.length>0||K||G)&&(0,l.jsxs)(z,{children:[K&&(0,l.jsx)(_,{children:"Uploading..."}),G&&(0,l.jsx)($,{children:G}),W.map((e,r)=>(0,l.jsxs)(I,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(S,{onClick:()=>(e=>{const r=W[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),Y(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(P,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const t=5-W.length,o=Array.from(r).slice(0,t);if(e.target.value="",0!==o.length){H(!0),Q("");try{const e=new FormData;o.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data?Y(e=>[...e,...n.data]):Q(n.message||"Upload failed")}catch(n){console.error("File upload error:",n),Q("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},7565:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Y});var o=t(9950),n=t(4752),i=t(1367),a=t(8409),s=t(2597),l=t(2653),d=t(4302),c=t(4185),p=t(5030),x=t(4414);const h=n.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=n.Ay.div`
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
`,g=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.borderColor||e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,j=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=n.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,A=(n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,n.Ay.input`
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
`),F=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,k=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,E=n.Ay.div`
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
`,B=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,C=n.Ay.div`
  flex: 1;
`,z=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,I=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,S=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,_=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
`,$=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,P=n.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,q=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,N=n.Ay.div`
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
`,T=n.Ay.button`
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
`,D=n.Ay.div`
  margin-bottom: 20px;
`,L=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=n.Ay.select`
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
`,O=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,R=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,U=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,J=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,W=n.Ay.div`
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
`,Y=()=>{const{t:e}=(0,p.Bd)("common"),{user:r}=(0,i.As)(),[t,n]=(0,o.useState)([]),[Y,K]=(0,o.useState)(""),[H,G]=(0,l.M)("active"),[Q,V]=(0,o.useState)("all"),[X,Z]=(0,o.useState)(null),[ee,re]=(0,o.useState)("open"),[te,oe]=(0,o.useState)({}),ne=(null===r||void 0===r?void 0:r.id)||"4",ie=(null===r||void 0===r?void 0:r.role)||"Foodcourt General";(0,o.useEffect)(()=>{if(r){ae();const e=setInterval(ae,1e4);return()=>clearInterval(e)}},[r]);const ae=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${ne}&userRole=${ie}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();n(e),se(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},se=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),o=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(o.ok){const e=await o.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),oe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},le=t.filter(e=>{const r=e.subject.toLowerCase().includes(Y.toLowerCase())||e.ticketNumber.toLowerCase().includes(Y.toLowerCase())||e.requesterName.toLowerCase().includes(Y.toLowerCase())||e.restaurantName.toLowerCase().includes(Y.toLowerCase()),t="active"===H?"open"===e.status||"in-progress"===e.status:"closed"===e.status||"resolved"===e.status,o="all"===Q||e.priority===Q;return r&&t&&o}),de=t.length,ce=t.filter(e=>"open"===e.status).length,pe=t.filter(e=>"in-progress"===e.status).length,xe=t.filter(e=>"resolved"===e.status).length,he=t.filter(e=>"closed"===e.status).length,ue=e=>new Date(e).toLocaleString("en-MY"),ge=e=>{const r=Math.floor(e/60),t=e%60;return r>0?`${r}h ${t}m`:`${t}m`};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:(0,x.jsx)(m,{children:e("common:operationInquiryPage.operationInquiry")})}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(b,{borderColor:"#635BFF",children:[(0,x.jsx)(j,{children:de}),(0,x.jsx)(w,{children:e("common:operationInquiryPage.totalInquiries")})]}),(0,x.jsxs)(b,{borderColor:"#F59E0B",children:[(0,x.jsx)(j,{children:ce}),(0,x.jsx)(w,{children:e("common:operationInquiryPage.open")})]}),(0,x.jsxs)(b,{borderColor:"#3B82F6",children:[(0,x.jsx)(j,{children:pe}),(0,x.jsx)(w,{children:e("common:operationInquiryPage.inProgress")})]}),(0,x.jsxs)(b,{borderColor:"#10B981",children:[(0,x.jsx)(j,{children:xe}),(0,x.jsx)(w,{children:e("common:operationInquiryPage.resolved")})]})]}),(0,x.jsxs)(s.tU,{children:[(0,x.jsxs)(s.oz,{active:"active"===H,onClick:()=>G("active"),children:["Active Tickets (",ce+pe,")"]}),(0,x.jsxs)(s.oz,{active:"closed"===H,onClick:()=>G("closed"),children:["Closed Tickets (",he+xe,")"]})]}),(0,x.jsxs)(v,{children:[(0,x.jsx)(A,{placeholder:"Search inquiries...",value:Y,onChange:e=>K(e.target.value)}),(0,x.jsxs)(F,{value:Q,onChange:e=>V(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("common:operationInquiryPage.allPriority")}),(0,x.jsx)("option",{value:"urgent",children:e("common:operationInquiryPage.urgent")}),(0,x.jsx)("option",{value:"high",children:e("common:operationInquiryPage.high")}),(0,x.jsx)("option",{value:"medium",children:e("common:operationInquiryPage.medium")}),(0,x.jsx)("option",{value:"low",children:e("common:operationInquiryPage.low")})]})]}),(0,x.jsxs)(k,{children:[le.map(e=>(0,x.jsxs)(E,{onClick:()=>(e=>{Z(e),re(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),children:[(0,x.jsxs)(B,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)(z,{children:e.ticketNumber}),(0,x.jsx)(I,{children:e.subject}),(0,x.jsxs)(S,{children:[(0,x.jsxs)("span",{children:["Restaurant: ",e.restaurantName]}),(0,x.jsxs)("span",{children:["From: ",e.requesterName]}),(0,x.jsxs)("span",{children:["Category: ",e.category]})]})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)($,{status:e.status,children:e.status}),(0,x.jsx)(P,{priority:e.priority,children:e.priority})]})]}),(0,x.jsx)(q,{children:e.description}),(0,x.jsxs)(N,{children:[(0,x.jsxs)("span",{children:["Created: ",ue(e.createdAt)]}),e.responseTime>0&&(0,x.jsxs)("span",{children:["Response Time: ",ge(e.responseTime)]}),te[e.id]&&(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",te[e.id].total_comments,te[e.id].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[te[e.id].unread_count," new"]})]}),"active"===H&&(0,x.jsx)(T,{onClick:r=>{r.stopPropagation(),(async()=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/operation-tickets/${e.id}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({status:"closed"})})).ok&&(n(r=>r.map(r=>r.id===e.id?{...r,status:"closed"}:r)),window.dispatchEvent(new Event("refreshBadgeCounts")))}catch(r){}})()},style:{marginLeft:"auto"},children:"Close"})]})]},e.id)),0===le.length&&(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,x.jsx)("h3",{style:{color:"#374151",marginBottom:"8px"},children:e("common:operationInquiryPage.noInquiriesYet")}),(0,x.jsx)("p",{children:e("common:operationInquiryPage.restaurantInquiriesWillAppearHereWhenSubmitted")})]})]}),X&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>Z(null),title:X.ticketNumber,size:"large",footer:(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(f,{variant:"secondary",onClick:()=>Z(null),children:e("common:operationInquiryPage.close")})}),children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"Subject:"}),(0,x.jsx)(J,{children:X.subject})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"Restaurant:"}),(0,x.jsx)(J,{children:X.restaurantName})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"From:"}),(0,x.jsx)(J,{children:X.requesterName})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"Priority:"}),(0,x.jsx)(J,{children:(0,x.jsx)(P,{priority:X.priority,children:X.priority})})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"Category:"}),(0,x.jsx)(J,{children:X.category})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(U,{children:"Created:"}),(0,x.jsx)(J,{children:ue(X.createdAt)})]})]}),(0,x.jsx)(L,{children:e("common:operationInquiryPage.description")}),(0,x.jsx)(W,{children:X.description}),(null===X||void 0===X?void 0:X.attachments)&&X.attachments.length>0&&(0,x.jsx)(c.A,{attachments:X.attachments}),(0,x.jsxs)(D,{children:[(0,x.jsx)(L,{children:e("common:operationInquiryPage.status")}),(0,x.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,x.jsxs)(M,{value:ee,onChange:e=>re(e.target.value),style:{flex:1},children:[(0,x.jsx)("option",{value:"open",children:e("common:operationInquiryPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("common:operationInquiryPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("common:operationInquiryPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("common:operationInquiryPage.closed")})]}),ee!==X.status&&(0,x.jsx)(f,{variant:"primary",onClick:async()=>{if(X&&ee!==X.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${X.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ee,..."resolved"===ee&&{resolvedAt:(new Date).toISOString().replace("T"," ").slice(0,19)}})});if(r.ok){const e=await r.json(),t=e.data||e;n(e=>e.map(e=>e.id===X.id?{...e,...t}:e)),Z(e=>e?{...e,...t}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,x.jsx)(d.A,{entityType:"operation_ticket",entityId:String(X.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>oe(e=>{const r={...e},t=String(X.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})]})})}},9061:(e,r,t)=>{t.d(r,{c:()=>a});var o=t(9950),n=t(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(i);return 1===r.length?e:r.map((e,r)=>i.test(e)?(0,n.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,n.jsx)(o.Fragment,{children:e},r))}}}]);