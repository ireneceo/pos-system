"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4185:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var i=t(4752),n=t(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const u=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const t=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),i=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",r.length,")"]}),t.length>0&&(0,n.jsx)(x,{children:t.map((e,r)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},r))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,r)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},r);var t,i})})]})}},4302:(e,r,t)=>{t.d(r,{A:()=>I});var i=t(9950),n=t(4752),o=t(4185),a=t(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,u=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,g=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,m=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,j=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,v=n.Ay.textarea`
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
`,A=n.Ay.div`
  display: flex;
  gap: 4px;
`,w=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=n.Ay.button`
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
`,k=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,S=n.Ay.input`
  display: none;
`,I=e=>{let{entityType:r,entityId:t,currentUserId:n,onMarkRead:I}=e;const[D,$]=(0,i.useState)([]),[_,T]=(0,i.useState)(""),[N,O]=(0,i.useState)([]),[R,q]=(0,i.useState)(!1),[P,M]=(0,i.useState)(!1),L=(0,i.useRef)(null),U=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${r}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&$(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{t&&(U(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t})}),I&&I()}catch(e){console.error("Error marking comments as read:",e)}})())},[r,t]);const J=async()=>{const e=_.trim(),i=N.length>0;if((e||i)&&!P){M(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:t,content:_.trim(),attachments:i?N:void 0})})).ok&&(T(""),O([]),U())}catch(n){console.error("Error adding comment:",n)}finally{M(!1)}}},K=e=>{const r=new Date(e),t=(new Date).getTime()-r.getTime(),i=Math.floor(t/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var r,t,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{children:(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name}),(0,a.jsx)(g,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(f,{children:K(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&U()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(m,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(j,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(v,{value:_,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),J())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(w,{onClick:()=>{var e;return null===(e=L.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:J,disabled:!_.trim()&&0===N.length||P,children:"Send"})]})]}),(N.length>0||R)&&(0,a.jsxs)(E,{children:[R&&(0,a.jsx)(z,{children:"Uploading..."}),N.map((e,r)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const r=N[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),O(r=>r.filter((r,t)=>t!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(S,{ref:L,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;e.target.value="";const t=5-N.length,i=Array.from(r).slice(0,t);if(0!==i.length){q(!0);try{const e=new FormData;i.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),n=await t.json();n.success&&n.data&&O(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{q(!1)}}}})]})}},4802:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ae});var i=t(9950),n=t(4752),o=t(1367),a=t(4302),s=t(7455),l=t(4185),d=t(4414);const c=n.Ay.div`
  min-height: 100vh;
`,p=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,x=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,u=n.Ay.div`
  display: flex;
  gap: 12px;
`,g=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,f=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,y=n.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=n.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #E6EBF1;
`,v=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=n.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,F=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
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
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,C=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,B=n.Ay.div`
  flex: 1;
  min-width: 0;
`,z=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,S=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,I=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,D=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,$=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,_=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,T=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,N=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,O=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,R=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,q=n.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,P=n.Ay.span`
  color: #374151;
`,M=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  h3 { color: #374151; margin-bottom: 8px; }
`,L=n.Ay.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,U=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,J=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,K=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,W=n.Ay.button`
  background: none; border: none; font-size: 24px; color: #6B7C93;
  cursor: pointer; padding: 0; width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  &:hover { color: #0A2540; }
`,Y=n.Ay.div`
  padding: 24px;
`,H=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,X=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,Z=n.Ay.div`
  margin-bottom: 20px;
`,G=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,Q=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,V=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,ee=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,re=n.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,te=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,ie=n.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,ne=n.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,oe=n.Ay.div`
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
`,ae=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,i.useState)([]),[n,ae]=(0,i.useState)([]),[se,le]=(0,i.useState)(""),[de,ce]=(0,i.useState)("all"),[pe,xe]=(0,i.useState)("all"),[he,ue]=(0,i.useState)("all"),[ge,fe]=(0,i.useState)("all"),[me,ye]=(0,i.useState)(!1),[je,be]=(0,i.useState)(null),[ve,Ae]=(0,i.useState)("open"),[we,Fe]=(0,i.useState)({}),[ke,Ee]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[Ce,Be]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&ze()},[e]),(0,i.useEffect)(()=>{if(n.length>0){Se();const e=setInterval(Se,1e4);return()=>clearInterval(e)}},[n]);const ze=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e;ae(t.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Se=async()=>{try{const r=localStorage.getItem("auth_token"),i=await fetch(`/api/operation-tickets?userId=${null===e||void 0===e?void 0:e.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json(),r=Array.isArray(e)?e:[];t(r),Ie(r)}}catch(r){console.error("Error fetching operation tickets:",r)}},Ie=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Fe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},De=r.filter(e=>{const r=e.subject.toLowerCase().includes(se.toLowerCase())||e.ticketNumber.toLowerCase().includes(se.toLowerCase()),t="all"===de||e.status===de,i="all"===pe||e.priority===pe,n="all"===he||e.category===he,o="all"===ge||String(e.restaurantId)===ge;return r&&t&&i&&n&&o}),$e=r.filter(e=>"open"===e.status).length,_e=r.filter(e=>"in-progress"===e.status).length,Te=r.filter(e=>"resolved"===e.status).length,Ne=e=>new Date(e).toLocaleString("en-MY");return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Operation Inquiry"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:Se,children:"Refresh"}),(0,d.jsx)(g,{variant:"primary",onClick:()=>ye(!0),children:"New Inquiry"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(f,{children:[(0,d.jsxs)(m,{color:"#635BFF",children:[(0,d.jsx)(y,{children:r.length}),(0,d.jsx)(j,{children:"Total Inquiries"})]}),(0,d.jsxs)(m,{color:"#F59E0B",children:[(0,d.jsx)(y,{children:$e}),(0,d.jsx)(j,{children:"Open"})]}),(0,d.jsxs)(m,{color:"#3B82F6",children:[(0,d.jsx)(y,{children:_e}),(0,d.jsx)(j,{children:"In Progress"})]}),(0,d.jsxs)(m,{color:"#10B981",children:[(0,d.jsx)(y,{children:Te}),(0,d.jsx)(j,{children:"Resolved"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Search"}),(0,d.jsx)(w,{placeholder:"Search inquiries...",value:se,onChange:e=>le(e.target.value)})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Restaurant"}),(0,d.jsxs)(F,{value:ge,onChange:e=>fe(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),n.map(e=>(0,d.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Status"}),(0,d.jsxs)(F,{value:de,onChange:e=>ce(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Priority"}),(0,d.jsxs)(F,{value:pe,onChange:e=>xe(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priority"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(A,{children:"Category"}),(0,d.jsxs)(F,{value:he,onChange:e=>ue(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Categories"}),(0,d.jsx)("option",{value:"schedule",children:"Schedule"}),(0,d.jsx)("option",{value:"inventory",children:"Inventory"}),(0,d.jsx)("option",{value:"staff",children:"Staff"}),(0,d.jsx)("option",{value:"menu",children:"Menu"}),(0,d.jsx)("option",{value:"customer",children:"Customer"}),(0,d.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,d.jsxs)(k,{children:[De.map(e=>(0,d.jsxs)(E,{onClick:()=>(e=>{be(e),Ae(e.status)})(e),children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(z,{children:e.ticketNumber}),(0,d.jsx)(S,{children:e.subject}),(0,d.jsxs)(I,{children:[(0,d.jsxs)("span",{children:["From: ",e.requesterName," (",e.requesterRole,")"]}),(0,d.jsx)(D,{children:e.restaurantName})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(_,{status:e.status,children:e.status}),(0,d.jsx)(T,{priority:e.priority,children:e.priority})]})]}),(0,d.jsx)(N,{children:e.description}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(q,{children:"Created"}),(0,d.jsx)(P,{children:Ne(e.createdAt)})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(q,{children:"Category"}),(0,d.jsx)(P,{style:{textTransform:"capitalize"},children:e.category})]}),we[String(e.id)]&&(0,d.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",we[String(e.id)].total_comments,we[String(e.id)].unread_count>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[we[String(e.id)].unread_count," new"]})]})]})]},e.id)),0===De.length&&(0,d.jsxs)(M,{children:[(0,d.jsx)("h3",{children:"No operation inquiries"}),(0,d.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),me&&(0,d.jsx)(L,{onClick:()=>ye(!1),children:(0,d.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(K,{children:"Create Operation Inquiry"}),(0,d.jsx)(W,{onClick:()=>ye(!1),children:"\xd7"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Restaurant *"}),(0,d.jsxs)(V,{value:ke.restaurantId,onChange:e=>Ee({...ke,restaurantId:e.target.value}),required:!0,children:[(0,d.jsx)("option",{value:"",children:"Select Restaurant"}),n.map(e=>(0,d.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Subject *"}),(0,d.jsx)(Q,{type:"text",value:ke.subject,onChange:e=>Ee({...ke,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Description *"}),(0,d.jsx)(ee,{value:ke.description,onChange:e=>Ee({...ke,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Attachments"}),(0,d.jsx)(s.A,{files:Ce,onChange:Be,maxFiles:5})]}),(0,d.jsxs)(X,{children:[(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Priority"}),(0,d.jsxs)(V,{value:ke.priority,onChange:e=>Ee({...ke,priority:e.target.value}),children:[(0,d.jsx)("option",{value:"low",children:"Low"}),(0,d.jsx)("option",{value:"medium",children:"Medium"}),(0,d.jsx)("option",{value:"high",children:"High"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Category"}),(0,d.jsxs)(V,{value:ke.category,onChange:e=>Ee({...ke,category:e.target.value}),children:[(0,d.jsx)("option",{value:"schedule",children:"Schedule"}),(0,d.jsx)("option",{value:"inventory",children:"Inventory"}),(0,d.jsx)("option",{value:"staff",children:"Staff"}),(0,d.jsx)("option",{value:"menu",children:"Menu"}),(0,d.jsx)("option",{value:"customer",children:"Customer"}),(0,d.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(g,{variant:"secondary",onClick:()=>ye(!1),children:"Cancel"}),(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(!ke.restaurantId||!ke.subject.trim()||!ke.description.trim())return;const r=n.find(e=>e.id===parseInt(ke.restaurantId));try{const t=localStorage.getItem("auth_token"),i={restaurantId:parseInt(ke.restaurantId),restaurantName:(null===r||void 0===r?void 0:r.name)||"",subject:ke.subject,description:ke.description,priority:ke.priority,category:ke.category,inquiryType:"owner",managerId:null===e||void 0===e?void 0:e.id,managerName:(null===e||void 0===e?void 0:e.name)||"Restaurant Owner",attachments:Ce.length>0?Ce:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)})).ok&&(Se(),ye(!1),Ee({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),Be([]))}catch(t){console.error("Error creating ticket:",t)}},disabled:!ke.restaurantId||!ke.subject.trim()||!ke.description.trim(),children:"Submit Inquiry"})]})]})}),je&&(0,d.jsx)(L,{onClick:()=>be(null),children:(0,d.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(J,{children:[(0,d.jsx)(K,{children:je.ticketNumber}),(0,d.jsx)(W,{onClick:()=>be(null),children:"\xd7"})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(re,{children:[(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"Subject:"}),(0,d.jsx)(ne,{children:je.subject})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"Restaurant:"}),(0,d.jsx)(ne,{children:je.restaurantName})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"From:"}),(0,d.jsxs)(ne,{children:[je.requesterName," (",je.requesterRole,")"]})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"Priority:"}),(0,d.jsx)(ne,{children:(0,d.jsx)(T,{priority:je.priority,children:je.priority})})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"Category:"}),(0,d.jsx)(ne,{style:{textTransform:"capitalize"},children:je.category})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(ie,{children:"Created:"}),(0,d.jsx)(ne,{children:Ne(je.createdAt)})]})]}),(0,d.jsx)(G,{children:"Description"}),(0,d.jsx)(oe,{children:je.description}),(null===je||void 0===je?void 0:je.attachments)&&je.attachments.length>0&&(0,d.jsx)(l.A,{attachments:je.attachments}),(0,d.jsxs)(Z,{children:[(0,d.jsx)(G,{children:"Status"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,d.jsxs)(V,{value:ve,onChange:e=>Ae(e.target.value),style:{flex:1},children:[(0,d.jsx)("option",{value:"open",children:"Open"}),(0,d.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,d.jsx)("option",{value:"resolved",children:"Resolved"}),(0,d.jsx)("option",{value:"closed",children:"Closed"})]}),ve!==je.status&&(0,d.jsx)(g,{variant:"primary",onClick:async()=>{if(je&&ve!==je.status)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets/${je.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ve})});if(r.ok){const e=await r.json(),i=e.data||e;t(e=>e.map(e=>e.id===je.id?{...e,...i}:e)),be(e=>e?{...e,...i}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,d.jsx)(a.A,{entityType:"operation_ticket",entityId:String(je.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>Fe(e=>{const r={...e},t=String(je.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})})]})]})})}},7455:(e,r,t)=>{t.d(r,{A:()=>b});var i=t(9950),n=t(4752),o=t(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
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
`,l=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,f=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,m=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,j=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:r,onChange:t,maxFiles:n=5,maxSizeMB:b=10,disabled:v=!1,compact:A=!1}=e;const[w,F]=(0,i.useState)(!1),[k,E]=(0,i.useState)(!1),C=(0,i.useRef)(null),B=!v&&!k&&r.length<n,z=async e=>{const i=n-r.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(r=>e.append("files",r));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&t([...r,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:w,disabled:!B,onClick:()=>{var e;return B&&(null===(e=C.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:A?(0,o.jsxs)(l,{children:["Click or drag files to attach (",r.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:w?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",n-r.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:C,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(r.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(j,{}),"Uploading..."]}),r.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(f,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(m,{onClick:()=>(async e=>{const i=r[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}t(r.filter((r,t)=>t!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);