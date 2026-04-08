"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7140],{4185:(e,t,n)=>{n.d(t,{A:()=>g});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,r.jsx)(x,{children:n.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,r.jsx)(s,{children:i.map((e,t)=>{return(0,r.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(c,{children:e.originalName}),(0,r.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>N});var i=n(9950),r=n(4752),o=n(4185),a=n(9061),s=n(5030),l=n(4414);const d=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=r.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,x=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=r.Ay.div`
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
`,g=r.Ay.div`
  flex: 1;
  min-width: 0;
`,u=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,m=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,f=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,y=r.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,v=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=r.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,b=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,w=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,A=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,F=r.Ay.textarea`
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
`,E=r.Ay.div`
  display: flex;
  gap: 4px;
`,k=r.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,B=r.Ay.button`
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
`,C=r.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,z=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,S=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,_=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,$=r.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,P=r.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,D=r.Ay.input`
  display: none;
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=r.Ay.label`
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
`,N=e=>{let{entityType:t,entityId:n,currentUserId:r,onMarkRead:N}=e;const{t:L}=(0,s.Bd)("common"),[O,U]=(0,i.useState)([]),[R,M]=(0,i.useState)(""),[W,G]=(0,i.useState)(!1),[J,Y]=(0,i.useState)([]),[K,H]=(0,i.useState)(!1),[q,Q]=(0,i.useState)(""),[V,X]=(0,i.useState)(!1),Z=(0,i.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&U(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const te=async()=>{if(K)return;const e=R.trim(),i=J.length>0;if((e||i)&&!V){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:R.trim(),attachments:i?J:void 0,is_internal:W||void 0})})).ok&&(M(""),Y([]),G(!1),ee())}catch(r){console.error("Error adding comment:",r)}finally{X(!1)}}},ne=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);if(r<24)return`${r}h ago`;const o=Math.floor(r/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:["Comments (",O.length,")"]}),O.length>0?(0,l.jsx)(p,{children:O.map(e=>{var t,n,s;return(0,l.jsxs)(x,{isInternal:e.is_internal,children:[(0,l.jsx)(h,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(u,{children:[(0,l.jsx)(m,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(f,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(y,{children:"Internal"}),(0,l.jsx)(v,{children:ne(e.createdAt)}),r&&e.author_id===Number(r)&&(0,l.jsx)(b,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&ee()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(j,{children:e.content.split("\n").map((e,t)=>(0,l.jsxs)(i.Fragment,{children:[t>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(C,{children:"No comments yet"}),(0,l.jsxs)(w,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(F,{value:R,onChange:e=>M(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),te())},placeholder:W?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(E,{children:[(0,l.jsx)(k,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(B,{onClick:te,disabled:!R.trim()&&0===J.length||V||K,children:"Send"})]})]}),(0,l.jsx)(I,{children:(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:W,onChange:e=>G(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(J.length>0||K||q)&&(0,l.jsxs)(z,{children:[K&&(0,l.jsx)($,{children:"Uploading..."}),q&&(0,l.jsx)(P,{children:q}),J.map((e,t)=>(0,l.jsxs)(S,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(_,{onClick:()=>(e=>{const t=J[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),Y(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(D,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-J.length,i=Array.from(t).slice(0,n);if(e.target.value="",0!==i.length){H(!0),Q("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),r=await n.json();r.success&&r.data?Y(e=>[...e,...r.data]):Q(r.message||"Upload failed")}catch(r){console.error("File upload error:",r),Q("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Y});var i=n(9950),r=n(4752),o=n(2853),a=n(4492),s=n(3832),l=n(8409),d=n(5665),c=n(2488),p=n(4185),x=n(4302),h=n(9061),g=n(1367),u=n(5030),m=n(4414);const f=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,y=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,v=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.isUnread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,j=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,b=r.Ay.div`
  flex: 1;
  min-width: 0;
`,w=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,A=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,F=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`,k=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,B=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,C=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,z=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,S=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,_=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,$=r.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,P=r.Ay.div`
  margin-bottom: 24px;
`,D=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,I=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,T=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,N=r.Ay.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
`,L=r.Ay.div`
  flex: 1;
`,O=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,U=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=r.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,M=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,W=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,G=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,J=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,Y=()=>{const{t:e}=(0,u.Bd)("settings");(0,a.g)();const[t,n]=(0,i.useState)([]),[r,Y]=(0,i.useState)(!0),[K,H]=(0,i.useState)(""),[q,Q]=(0,i.useState)("all"),[V,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)("all"),[te,ne]=(0,i.useState)(!1),[ie,re]=(0,i.useState)(null),[oe,ae]=(0,i.useState)(null),[se,le]=(0,i.useState)({}),{user:de}=(0,g.As)(),ce=localStorage.getItem("auth_token"),pe=async()=>{try{Y(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${ce}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),i=t.data||t,r=Array.isArray(i)?i:[];n(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${ce}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),le(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{Y(!1)}};(0,i.useEffect)(()=>{pe()},[]);const xe=e=>{re(e),ae(null),ne(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${ce}`,"Content-Type":"application/json"}});if(t.ok){const i=await t.json(),r=i.data||i;ae(r),n(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id)},he=()=>{ne(!1),re(null),ae(null)},ge=t.filter(e=>{const t=e.title.toLowerCase().includes(K.toLowerCase())||e.content.toLowerCase().includes(K.toLowerCase())||e.author_name.toLowerCase().includes(K.toLowerCase()),n="all"===q||e.priority===q,i="all"===V||(e.category||"general")===V,r="all"===Z||e.author_role===Z;return t&&n&&i&&r}),ue=t.length,me=t.filter(e=>!e.read_at).length,fe=t.filter(e=>"important"===e.priority).length,ye=t.filter(e=>"urgent"===e.priority).length,ve=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,m.jsxs)(s.mc,{children:[(0,m.jsx)(s.Y9,{children:(0,m.jsx)(s.hE,{children:e("settings:noticesPage.notices")})}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(d.MD,{children:[(0,m.jsxs)(d.hI,{color:"#635BFF",children:[(0,m.jsx)(d.Os,{children:ue}),(0,m.jsx)(d.v0,{children:e("settings:noticesPage.totalReceived")})]}),(0,m.jsxs)(d.hI,{color:"#2563EB",children:[(0,m.jsx)(d.Os,{children:me}),(0,m.jsx)(d.v0,{children:e("settings:noticesPage.unread")})]}),(0,m.jsxs)(d.hI,{color:"#D97706",children:[(0,m.jsx)(d.Os,{children:fe}),(0,m.jsx)(d.v0,{children:e("settings:noticesPage.important")})]}),(0,m.jsxs)(d.hI,{color:"#DC2626",children:[(0,m.jsx)(d.Os,{children:ye}),(0,m.jsx)(d.v0,{children:e("settings:noticesPage.urgent")})]})]}),(0,m.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,m.jsx)("button",{onClick:()=>X(e),style:{padding:"6px 16px",borderRadius:"20px",border:V===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:V===e?"#F0EFFF":"white",color:V===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:V===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,m.jsxs)(f,{children:[(0,m.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:K,onChange:e=>H(e.target.value)}),(0,m.jsxs)(c.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:e("settings:noticesPage.allSenders")}),(0,m.jsx)("option",{value:"System Admin",children:e("settings:noticesPage.systemAdmin")}),(0,m.jsx)("option",{value:"Brand General",children:e("settings:noticesPage.brandGeneral")}),(0,m.jsx)("option",{value:"Foodcourt General",children:e("settings:noticesPage.foodcourtGeneral")}),(0,m.jsx)("option",{value:"Restaurant Owner",children:e("settings:noticesPage.restaurantOwner")})]}),(0,m.jsxs)(c.Jt,{value:q,onChange:e=>Q(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:e("settings:noticesPage.allPriorities")}),(0,m.jsx)("option",{value:"normal",children:e("settings:noticesPage.normal")}),(0,m.jsx)("option",{value:"important",children:e("settings:noticesPage.important")}),(0,m.jsx)("option",{value:"urgent",children:e("settings:noticesPage.urgent")})]})]}),r?(0,m.jsx)(J,{children:e("settings:noticesPage.loadingNotices")}):0===ge.length?(0,m.jsxs)(o.pp,{children:[(0,m.jsx)("h3",{children:e("settings:noticesPage.noNoticesFound")}),(0,m.jsx)("p",{children:K||"all"!==q?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,m.jsx)(y,{children:ge.map(t=>{var n;const i=!t.read_at;return(0,m.jsx)(v,{isUnread:i,onClick:()=>xe(t),style:"guide"===t.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,m.jsxs)(j,{children:[(0,m.jsxs)(b,{children:[(0,m.jsxs)(w,{isUnread:i,children:[i&&(0,m.jsx)(A,{}),t.title]}),(0,m.jsx)(F,{children:ve(t.content)}),(0,m.jsxs)(E,{children:[(0,m.jsxs)(k,{children:[t.author_name,(0,m.jsx)(B,{role:t.author_role,children:t.author_role})]}),(0,m.jsx)(_,{children:(r=t.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),t.commentCount>0&&(0,m.jsxs)(S,{children:[t.commentCount," ",1===t.commentCount?"comment":"comments",(null===(n=se[String(t.id)])||void 0===n?void 0:n.unread_count)>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[se[String(t.id)].unread_count," new"]})]})]})]}),(0,m.jsxs)(C,{children:["guide"===t.category&&(0,m.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:e("settings:noticesPage.guide")}),(0,m.jsx)(z,{priority:t.priority,children:t.priority})]})]})},t.id);var r})}),te&&ie&&(0,m.jsxs)(l.aF,{isOpen:!0,onClose:he,title:"Notice Details",size:"large",footer:(0,m.jsx)($,{variant:"secondary",onClick:he,children:"Close"}),children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:ie.title}),(0,m.jsx)(z,{priority:ie.priority,children:ie.priority})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)(D,{children:e("settings:noticesPage.from")}),(0,m.jsxs)(T,{children:[(0,m.jsx)(N,{children:(be=(null===oe||void 0===oe?void 0:oe.author_name)||ie.author_name,be?be.charAt(0).toUpperCase():"?")}),(0,m.jsxs)(L,{children:[(0,m.jsx)(O,{children:(null===oe||void 0===oe?void 0:oe.author_name)||ie.author_name}),(0,m.jsx)(U,{children:(null===oe||void 0===oe?void 0:oe.author_role)||ie.author_role})]})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsxs)(M,{children:[(0,m.jsx)(W,{children:e("settings:noticesPage.date")}),(0,m.jsx)(G,{children:(je=(null===oe||void 0===oe?void 0:oe.createdAt)||ie.createdAt,new Date(je).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,m.jsxs)(M,{children:[(0,m.jsx)(W,{children:e("settings:noticesPage.priority")}),(0,m.jsx)(G,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.priority)||ie.priority})]}),(0,m.jsxs)(M,{children:[(0,m.jsx)(W,{children:e("settings:noticesPage.status")}),(0,m.jsx)(G,{style:{textTransform:"capitalize"},children:(null===oe||void 0===oe?void 0:oe.status)||ie.status})]})]}),(0,m.jsxs)(P,{children:[(0,m.jsx)(D,{children:e("settings:noticesPage.content")}),(0,m.jsx)(I,{children:((null===oe||void 0===oe?void 0:oe.content)||ie.content).split("\n").map((e,t)=>(0,m.jsxs)(i.Fragment,{children:[t>0&&(0,m.jsx)("br",{}),(0,h.c)(e)]},t))})]}),((null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments))&&((null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments)||[]).length>0&&(0,m.jsxs)(P,{children:[(0,m.jsx)(D,{children:e("settings:noticesPage.attachments")}),(0,m.jsx)(p.A,{attachments:(null===oe||void 0===oe?void 0:oe.attachments)||(null===ie||void 0===ie?void 0:ie.attachments)||[]})]}),(0,m.jsx)(x.A,{entityType:"notice",entityId:String(ie.id),currentUserId:null===de||void 0===de?void 0:de.id,onMarkRead:()=>le(e=>{const t={...e},n=String(ie.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})]})]});var je,be}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var i=n(9950),r=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(o);return 1===t.length?e:t.map((e,t)=>o.test(e)?(0,r.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,r.jsx)(i.Fragment,{children:e},t))}}}]);