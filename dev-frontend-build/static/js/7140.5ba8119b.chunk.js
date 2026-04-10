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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const n=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,r.jsxs)(o,{children:[(0,r.jsxs)(a,{children:["Attachments (",t.length,")"]}),n.length>0&&(0,r.jsx)(x,{children:n.map((e,t)=>(0,r.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,r.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,r.jsx)(s,{children:i.map((e,t)=>{return(0,r.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,r.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,r.jsx)(c,{children:e.originalName}),(0,r.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},t);var n,i})})]})}},4302:(e,t,n)=>{n.d(t,{A:()=>L});var i=n(9950),r=n(4752),o=n(4185),a=n(9061),s=n(5030),l=n(9955),d=n(4414);const c=r.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,p=r.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,x=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,h=r.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,g=r.Ay.div`
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
`,u=r.Ay.div`
  flex: 1;
  min-width: 0;
`,m=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,f=r.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,y=r.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,v=r.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,j=r.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,b=r.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,w=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,A=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,E=r.Ay.textarea`
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
`,B=r.Ay.div`
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
`,C=r.Ay.button`
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
`,z=r.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,S=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,_=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,$=r.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,P=r.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,D=r.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=r.Ay.input`
  display: none;
`,N=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,I=r.Ay.label`
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
`,L=e=>{let{entityType:t,entityId:n,currentUserId:r,onMarkRead:L}=e;const{t:O}=(0,s.Bd)("common"),[U,R]=(0,i.useState)([]),[M,W]=(0,i.useState)(""),[G,J]=(0,i.useState)(!1),[Y,K]=(0,i.useState)([]),[H,q]=(0,i.useState)(!1),[Q,V]=(0,i.useState)(""),[X,Z]=(0,i.useState)(!1),ee=(0,i.useRef)(null),te=async()=>{try{const e=(0,l.c4)(),i=await fetch(`/api/comments/${t}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&R(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{n&&(te(),(async()=>{try{const e=(0,l.c4)();await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n})}),L&&L(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[t,n]);const ne=async()=>{if(H)return;const e=M.trim(),i=Y.length>0;if((e||i)&&!X){Z(!0);try{const e=(0,l.c4)();(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:n,content:M.trim(),attachments:i?Y:void 0,is_internal:G||void 0})})).ok&&(W(""),K([]),J(!1),te())}catch(r){console.error("Error adding comment:",r)}finally{Z(!1)}}},ie=e=>{const t=new Date(e),n=(new Date).getTime()-t.getTime(),i=Math.floor(n/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const r=Math.floor(i/60);if(r<24)return`${r}h ago`;const o=Math.floor(r/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:["Comments (",U.length,")"]}),U.length>0?(0,d.jsx)(x,{children:U.map(e=>{var t,n,s;return(0,d.jsxs)(h,{isInternal:e.is_internal,children:[(0,d.jsx)(g,{children:((null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(f,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,d.jsx)(y,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,d.jsx)(v,{children:"Internal"}),(0,d.jsx)(j,{children:ie(e.createdAt)}),r&&e.author_id===Number(r)&&(0,d.jsx)(w,{onClick:()=>(async e=>{try{const t=(0,l.c4)();(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&te()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,d.jsx)(b,{children:e.content.split("\n").map((e,t)=>(0,d.jsxs)(i.Fragment,{children:[t>0&&(0,d.jsx)("br",{}),(0,a.c)(e)]},t))}),e.attachments&&e.attachments.length>0&&(0,d.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,d.jsx)(z,{children:"No comments yet"}),(0,d.jsxs)(A,{children:[(0,d.jsxs)(F,{children:[(0,d.jsx)(E,{value:M,onChange:e=>W(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),ne())},placeholder:G?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,d.jsxs)(B,{children:[(0,d.jsx)(k,{onClick:()=>{var e;return null===(e=ee.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,d.jsx)(C,{onClick:ne,disabled:!M.trim()&&0===Y.length||X||H,children:"Send"})]})]}),(0,d.jsx)(N,{children:(0,d.jsxs)(I,{children:[(0,d.jsx)("input",{type:"checkbox",checked:G,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Y.length>0||H||Q)&&(0,d.jsxs)(S,{children:[H&&(0,d.jsx)(P,{children:"Uploading..."}),Q&&(0,d.jsx)(D,{children:Q}),Y.map((e,t)=>(0,d.jsxs)(_,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,d.jsx)($,{onClick:()=>(e=>{const t=Y[e],n=(0,l.c4)();fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),K(t=>t.filter((t,n)=>n!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,d.jsx)(T,{ref:ee,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;const n=5-Y.length,i=Array.from(t).slice(0,n);if(e.target.value="",0!==i.length){q(!0),V("");try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=(0,l.c4)(),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),r=await n.json();r.success&&r.data?K(e=>[...e,...r.data]):V(r.message||"Upload failed")}catch(r){console.error("File upload error:",r),V("File upload failed. Please try again.")}finally{q(!1)}}}})]})}},7140:(e,t,n)=>{n.r(t),n.d(t,{default:()=>K});var i=n(9950),r=n(4752),o=n(2853),a=n(4492),s=n(3832),l=n(8409),d=n(5665),c=n(2488),p=n(4185),x=n(4302),h=n(9061),g=n(1367),u=n(5030),m=n(9955),f=n(4414);const y=r.Ay.div`
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
`,v=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,j=r.Ay.div`
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
`,b=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=r.Ay.div`
  flex: 1;
  min-width: 0;
`,A=r.Ay.div`
  font-size: 16px;
  font-weight: ${e=>e.isUnread?"700":"600"};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`,F=r.Ay.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`,E=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,B=r.Ay.div`
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
`,C=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#E0F2FE":t.includes("brand")?"#F3E8FF":t.includes("foodcourt")?"#FEF3C7":"#F3F4F6"}};
  color: ${e=>{const t=e.role.toLowerCase();return t.includes("admin")||t.includes("system")?"#0891B2":t.includes("brand")?"#7C3AED":t.includes("foodcourt")?"#D97706":"#6B7280"}};
`,z=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`,S=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,_=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`,$=r.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,P=r.Ay.button`
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
`,D=r.Ay.div`
  margin-bottom: 24px;
`,T=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,N=r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`,I=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,L=r.Ay.div`
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
`,O=r.Ay.div`
  flex: 1;
`,U=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,R=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,M=r.Ay.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`,W=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,G=r.Ay.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,J=r.Ay.span`
  font-size: 14px;
  color: #374151;
`,Y=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`,K=()=>{const{t:e}=(0,u.Bd)("settings");(0,a.g)();const[t,n]=(0,i.useState)([]),[r,K]=(0,i.useState)(!0),[H,q]=(0,i.useState)(""),[Q,V]=(0,i.useState)("all"),[X,Z]=(0,i.useState)("all"),[ee,te]=(0,i.useState)("all"),[ne,ie]=(0,i.useState)(!1),[re,oe]=(0,i.useState)(null),[ae,se]=(0,i.useState)(null),[le,de]=(0,i.useState)({}),{user:ce}=(0,g.As)(),pe=(0,m.c4)(),xe=async()=>{try{K(!0);const e=await fetch("/api/notices/received",{headers:{Authorization:`Bearer ${pe}`,"Content-Type":"application/json"}});if(e.ok){const t=await e.json(),i=t.data||t,r=Array.isArray(i)?i:[];n(r),(async e=>{if(0!==e.length)try{const t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${t}`,{headers:{Authorization:`Bearer ${pe}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),de(t)}}}catch(t){}})(r)}}catch(e){console.error("Failed to fetch notices:",e)}finally{K(!1)}};(0,i.useEffect)(()=>{xe()},[]);const he=e=>{oe(e),se(null),ie(!0),(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:{Authorization:`Bearer ${pe}`,"Content-Type":"application/json"}});if(t.ok){const i=await t.json(),r=i.data||i;se(r),n(t=>t.map(t=>t.id===e?{...t,read_at:(new Date).toISOString()}:t)),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Failed to fetch notice detail:",t)}})(e.id)},ge=()=>{ie(!1),oe(null),se(null)},ue=t.filter(e=>{const t=e.title.toLowerCase().includes(H.toLowerCase())||e.content.toLowerCase().includes(H.toLowerCase())||e.author_name.toLowerCase().includes(H.toLowerCase()),n="all"===Q||e.priority===Q,i="all"===X||(e.category||"general")===X,r="all"===ee||e.author_role===ee;return t&&n&&i&&r}),me=t.length,fe=t.filter(e=>!e.read_at).length,ye=t.filter(e=>"important"===e.priority).length,ve=t.filter(e=>"urgent"===e.priority).length,je=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120;return e.length<=t?e:e.substring(0,t)+"..."};return(0,f.jsxs)(s.mc,{children:[(0,f.jsx)(s.Y9,{children:(0,f.jsx)(s.hE,{children:e("settings:noticesPage.notices")})}),(0,f.jsxs)(s.UC,{children:[(0,f.jsxs)(d.MD,{children:[(0,f.jsxs)(d.hI,{color:"#635BFF",children:[(0,f.jsx)(d.Os,{children:me}),(0,f.jsx)(d.v0,{children:e("settings:noticesPage.totalReceived")})]}),(0,f.jsxs)(d.hI,{color:"#2563EB",children:[(0,f.jsx)(d.Os,{children:fe}),(0,f.jsx)(d.v0,{children:e("settings:noticesPage.unread")})]}),(0,f.jsxs)(d.hI,{color:"#D97706",children:[(0,f.jsx)(d.Os,{children:ye}),(0,f.jsx)(d.v0,{children:e("settings:noticesPage.important")})]}),(0,f.jsxs)(d.hI,{color:"#DC2626",children:[(0,f.jsx)(d.Os,{children:ve}),(0,f.jsx)(d.v0,{children:e("settings:noticesPage.urgent")})]})]}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,f.jsx)("button",{onClick:()=>Z(e),style:{padding:"6px 16px",borderRadius:"20px",border:X===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:X===e?"#F0EFFF":"white",color:X===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:X===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,f.jsxs)(y,{children:[(0,f.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:H,onChange:e=>q(e.target.value)}),(0,f.jsxs)(c.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,f.jsx)("option",{value:"all",children:e("settings:noticesPage.allSenders")}),(0,f.jsx)("option",{value:"System Admin",children:e("settings:noticesPage.systemAdmin")}),(0,f.jsx)("option",{value:"Brand General",children:e("settings:noticesPage.brandGeneral")}),(0,f.jsx)("option",{value:"Foodcourt General",children:e("settings:noticesPage.foodcourtGeneral")}),(0,f.jsx)("option",{value:"Restaurant Owner",children:e("settings:noticesPage.restaurantOwner")})]}),(0,f.jsxs)(c.Jt,{value:Q,onChange:e=>V(e.target.value),children:[(0,f.jsx)("option",{value:"all",children:e("settings:noticesPage.allPriorities")}),(0,f.jsx)("option",{value:"normal",children:e("settings:noticesPage.normal")}),(0,f.jsx)("option",{value:"important",children:e("settings:noticesPage.important")}),(0,f.jsx)("option",{value:"urgent",children:e("settings:noticesPage.urgent")})]})]}),r?(0,f.jsx)(Y,{children:e("settings:noticesPage.loadingNotices")}):0===ue.length?(0,f.jsxs)(o.pp,{children:[(0,f.jsx)("h3",{children:e("settings:noticesPage.noNoticesFound")}),(0,f.jsx)("p",{children:H||"all"!==Q?"Try adjusting your search or filter criteria.":"You have no notices yet."})]}):(0,f.jsx)(v,{children:ue.map(t=>{var n;const i=!t.read_at;return(0,f.jsx)(j,{isUnread:i,onClick:()=>he(t),style:"guide"===t.category?{borderLeft:"4px solid #10B981"}:void 0,children:(0,f.jsxs)(b,{children:[(0,f.jsxs)(w,{children:[(0,f.jsxs)(A,{isUnread:i,children:[i&&(0,f.jsx)(F,{}),t.title]}),(0,f.jsx)(E,{children:je(t.content)}),(0,f.jsxs)(B,{children:[(0,f.jsxs)(k,{children:[t.author_name,(0,f.jsx)(C,{role:t.author_role,children:t.author_role})]}),(0,f.jsx)($,{children:(r=t.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))}),t.commentCount>0&&(0,f.jsxs)(_,{children:[t.commentCount," ",1===t.commentCount?"comment":"comments",(null===(n=le[String(t.id)])||void 0===n?void 0:n.unread_count)>0&&(0,f.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[le[String(t.id)].unread_count," new"]})]})]})]}),(0,f.jsxs)(z,{children:["guide"===t.category&&(0,f.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:e("settings:noticesPage.guide")}),(0,f.jsx)(S,{priority:t.priority,children:t.priority})]})]})},t.id);var r})}),ne&&re&&(0,f.jsxs)(l.aF,{isOpen:!0,onClose:ge,title:"Notice Details",size:"large",footer:(0,f.jsx)(P,{variant:"secondary",onClick:ge,children:"Close"}),children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px",gap:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"18px",fontWeight:"700",color:"#0A2540",lineHeight:"1.4",flex:1},children:re.title}),(0,f.jsx)(S,{priority:re.priority,children:re.priority})]}),(0,f.jsxs)(D,{children:[(0,f.jsx)(T,{children:e("settings:noticesPage.from")}),(0,f.jsxs)(I,{children:[(0,f.jsx)(L,{children:(we=(null===ae||void 0===ae?void 0:ae.author_name)||re.author_name,we?we.charAt(0).toUpperCase():"?")}),(0,f.jsxs)(O,{children:[(0,f.jsx)(U,{children:(null===ae||void 0===ae?void 0:ae.author_name)||re.author_name}),(0,f.jsx)(R,{children:(null===ae||void 0===ae?void 0:ae.author_role)||re.author_role})]})]})]}),(0,f.jsxs)(M,{children:[(0,f.jsxs)(W,{children:[(0,f.jsx)(G,{children:e("settings:noticesPage.date")}),(0,f.jsx)(J,{children:(be=(null===ae||void 0===ae?void 0:ae.createdAt)||re.createdAt,new Date(be).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,f.jsxs)(W,{children:[(0,f.jsx)(G,{children:e("settings:noticesPage.priority")}),(0,f.jsx)(J,{style:{textTransform:"capitalize"},children:(null===ae||void 0===ae?void 0:ae.priority)||re.priority})]}),(0,f.jsxs)(W,{children:[(0,f.jsx)(G,{children:e("settings:noticesPage.status")}),(0,f.jsx)(J,{style:{textTransform:"capitalize"},children:(null===ae||void 0===ae?void 0:ae.status)||re.status})]})]}),(0,f.jsxs)(D,{children:[(0,f.jsx)(T,{children:e("settings:noticesPage.content")}),(0,f.jsx)(N,{children:((null===ae||void 0===ae?void 0:ae.content)||re.content).split("\n").map((e,t)=>(0,f.jsxs)(i.Fragment,{children:[t>0&&(0,f.jsx)("br",{}),(0,h.c)(e)]},t))})]}),((null===ae||void 0===ae?void 0:ae.attachments)||(null===re||void 0===re?void 0:re.attachments))&&((null===ae||void 0===ae?void 0:ae.attachments)||(null===re||void 0===re?void 0:re.attachments)||[]).length>0&&(0,f.jsxs)(D,{children:[(0,f.jsx)(T,{children:e("settings:noticesPage.attachments")}),(0,f.jsx)(p.A,{attachments:(null===ae||void 0===ae?void 0:ae.attachments)||(null===re||void 0===re?void 0:re.attachments)||[]})]}),(0,f.jsx)(x.A,{entityType:"notice",entityId:String(re.id),currentUserId:null===ce||void 0===ce?void 0:ce.id,onMarkRead:()=>de(e=>{const t={...e},n=String(re.id);return t[n]&&(t[n]={...t[n],unread_count:0}),t})})]})]})]});var be,we}},9061:(e,t,n)=>{n.d(t,{c:()=>a});var i=n(9950),r=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const t=e.split(o);return 1===t.length?e:t.map((e,t)=>o.test(e)?(0,r.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},t):(0,r.jsx)(i.Fragment,{children:e},t))}}}]);