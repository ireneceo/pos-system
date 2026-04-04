"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var r=t(4752),o=t(4414);const i=r.Ay.div`
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
`,a=r.Ay.button`
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
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:t,style:r}=e;return(0,o.jsx)(i,{className:t,style:r,children:n})},d=e=>{let{active:n,onClick:t,children:r,className:i}=e;return(0,o.jsx)(a,{active:n,onClick:t,className:i,children:r})},c=e=>{let{count:n,variant:t="default",showZero:r=!1}=e;return 0!==n||r?(0,o.jsx)(s,{variant:t,children:n}):null}},2653:(e,n,t)=>{t.d(n,{M:()=>i});var r=t(9950),o=t(4492);function i(e){const[n,t]=(0,o.ok)(),i=(0,r.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,r.useState)(i());return[a,(0,r.useCallback)(e=>{s(e),t({tab:e})},[t])]}},4185:(e,n,t)=>{t.d(n,{A:()=>u});t(9950);var r=t(4752),o=t(4414);const i=r.Ay.div`
  margin-top: 12px;
`,a=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=r.Ay.a`
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
`,d=r.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=r.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=r.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=r.Ay.a`
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
`;const u=e=>{let{attachments:n}=e;if(!n||0===n.length)return null;const t=n.filter(e=>{var n;return null===(n=e.mimeType)||void 0===n?void 0:n.startsWith("image/")}),r=n.filter(e=>{var n;return!(null!==(n=e.mimeType)&&void 0!==n&&n.startsWith("image/"))});return(0,o.jsxs)(i,{children:[(0,o.jsxs)(a,{children:["Attachments (",n.length,")"]}),t.length>0&&(0,o.jsx)(x,{children:t.map((e,n)=>(0,o.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,o.jsx)("img",{src:e.url,alt:e.originalName})},n))}),r.length>0&&(0,o.jsx)(s,{children:r.map((e,n)=>{return(0,o.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,o.jsx)(d,{children:(r=e.mimeType,"application/pdf"===r?"\ud83d\udcc4":r.includes("word")||r.includes("document")?"\ud83d\udcdd":r.includes("sheet")||r.includes("excel")?"\ud83d\udcca":r.includes("zip")||r.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsx)(c,{children:e.originalName}),(0,o.jsx)(p,{children:(t=e.size,t<1024?`${t}B`:t<1048576?`${(t/1024).toFixed(1)}KB`:`${(t/1048576).toFixed(1)}MB`)})]},n);var t,r})})]})}},4302:(e,n,t)=>{t.d(n,{A:()=>I});var r=t(9950),o=t(4752),i=t(4185),a=t(9061),s=t(4414);const l=o.Ay.div`
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
`,m=o.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=o.Ay.span`
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
`,v=o.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=o.Ay.div`
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
`,B=o.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=o.Ay.div`
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
`,_=o.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,S=o.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=o.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=o.Ay.input`
  display: none;
`,N=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,D=o.Ay.label`
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
`,I=e=>{let{entityType:n,entityId:t,currentUserId:o,onMarkRead:I}=e;const[q,P]=(0,r.useState)([]),[O,U]=(0,r.useState)(""),[L,M]=(0,r.useState)(!1),[Q,J]=(0,r.useState)([]),[R,H]=(0,r.useState)(!1),[W,K]=(0,r.useState)(""),[Y,Z]=(0,r.useState)(!1),G=(0,r.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/comments/${n}/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&P(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,r.useEffect)(()=>{t&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:t})}),I&&I(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[n,t]);const X=async()=>{if(R)return;const e=O.trim(),r=Q.length>0;if((e||r)&&!Y){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:t,content:O.trim(),attachments:r?Q:void 0,is_internal:L||void 0})})).ok&&(U(""),J([]),M(!1),V())}catch(o){console.error("Error adding comment:",o)}finally{Z(!1)}}},ee=e=>{const n=new Date(e),t=(new Date).getTime()-n.getTime(),r=Math.floor(t/6e4);if(r<1)return"Just now";if(r<60)return`${r}m ago`;const o=Math.floor(r/60);if(o<24)return`${o}h ago`;const i=Math.floor(o/24);return i<7?`${i}d ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",q.length,")"]}),q.length>0?(0,s.jsx)(c,{children:q.map(e=>{var n,t,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(x,{children:((null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(h,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(t=e.author)||void 0===t?void 0:t.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(f,{children:"Internal"}),(0,s.jsx)(y,{children:ee(e.createdAt)}),o&&e.author_id===o&&(0,s.jsx)(j,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&V()}catch(n){console.error("Error deleting comment:",n)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(v,{children:e.content.split("\n").map((e,n)=>(0,s.jsxs)(r.Fragment,{children:[n>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},n))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(i.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(B,{children:"No comments yet"}),(0,s.jsxs)(b,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(w,{value:O,onChange:e=>U(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:L?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(C,{onClick:X,disabled:!O.trim()&&0===Q.length||Y||R,children:"Send"})]})]}),(0,s.jsx)(N,{children:(0,s.jsxs)(D,{children:[(0,s.jsx)("input",{type:"checkbox",checked:L,onChange:e=>M(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(Q.length>0||R||W)&&(0,s.jsxs)(E,{children:[R&&(0,s.jsx)(S,{children:"Uploading..."}),W&&(0,s.jsx)($,{children:W}),Q.map((e,n)=>(0,s.jsxs)(z,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(_,{onClick:()=>(e=>{const n=Q[e],t=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({url:n.url})}).catch(()=>{}),J(n=>n.filter((n,t)=>t!==e))})(n),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(T,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const n=e.target.files;if(!n||0===n.length)return;const t=5-Q.length,r=Array.from(n).slice(0,t);if(e.target.value="",0!==r.length){H(!0),K("");try{const e=new FormData;r.forEach(n=>e.append("files",n));const n=localStorage.getItem("auth_token"),t=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),o=await t.json();o.success&&o.data?J(e=>[...e,...o.data]):K(o.message||"Upload failed")}catch(o){console.error("File upload error:",o),K("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},8744:(e,n,t)=>{t.r(n),t.d(n,{default:()=>se});var r=t(9950),o=t(4752),i=t(2853),a=t(8409),s=t(2597),l=t(2653),d=t(6038),c=t(4302),p=t(1367),x=t(4414);const h=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,g=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,m=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,f=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=o.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,j=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=o.Ay.div`
  flex: 1;
  min-width: 0;
`,A=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,k=o.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,B=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,E=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,z=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin: 8px 0 4px 0;
`,_=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,S=o.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,$=o.Ay.div`
  flex: 1;
  min-height: 12px;
`,T=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,N=o.Ay.button`
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
`,D=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,I=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,q=o.Ay.div`
  font-size: 14px;
`,P=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,O=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,U=o.Ay.select`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,L=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    &:hover { background: #5A51E6; }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    &:hover { background: #FEE2E2; }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; }\n  "}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,M=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,Q=o.Ay.div`
  margin-bottom: 20px;
`,J=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,R=o.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,H=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,W=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,K=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,Z=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,G=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,V=o.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,X=o.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F0F4FF;
  }

  &:last-child {
    border-bottom: none;
  }
`,ee=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ne=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,te=o.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,re=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,oe=o.Ay.div`
  flex: 1;
`,ie=["new","contacted","confirmed"],ae=["invoiced","cancelled"],se=()=>{var e,n,t,o,se,le,de,ce;const{user:pe}=(0,p.As)(),[xe,he]=(0,r.useState)([]),[ue,ge]=(0,r.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[me,fe]=(0,r.useState)(!0),[ye,ve]=(0,r.useState)(""),[je,be]=(0,r.useState)("all"),[Fe,we]=(0,l.M)("active"),[Ae,ke]=(0,r.useState)(!1),[Ce,Be]=(0,r.useState)(null),[Ee,ze]=(0,r.useState)(""),[_e,Se]=(0,r.useState)(""),[$e,Te]=(0,r.useState)(!1),[Ne,De]=(0,r.useState)(!1),[Ie,qe]=(0,r.useState)(!1),[Pe,Oe]=(0,r.useState)(""),[Ue,Le]=(0,r.useState)([]),[Me,Qe]=(0,r.useState)(!1),[Je,Re]=(0,r.useState)(!1),[He,We]=(0,r.useState)(""),[Ke,Ye]=(0,r.useState)("none"),[Ze,Ge]=(0,r.useState)(""),[Ve,Xe]=(0,r.useState)([]),[en,nn]=(0,r.useState)(!1),tn=()=>localStorage.getItem("auth_token"),rn=(0,r.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||fe(!0);const n=tn(),t=new URLSearchParams;"all"!==je&&t.append("status",je),ye&&t.append("search",ye);const[r,o]=await Promise.all([fetch(`/api/hardware-quotes?${t}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(r.ok){const e=await r.json();he(e.data||e)}if(o.ok){const e=await o.json();ge(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{fe(!1)}},[ye,je]);(0,r.useEffect)(()=>{rn()},[rn]),(0,r.useEffect)(()=>{const e=setInterval(()=>rn(!0),1e4);return()=>clearInterval(e)},[rn]);const on=xe.filter(e=>("active"===Fe?ie:ae).includes(e.status)),an=xe.filter(e=>ie.includes(e.status)).length,sn=xe.filter(e=>ae.includes(e.status)).length,ln=async e=>{try{const n=tn(),t=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),n=e.data||e;Be(n),ze(n.status),Se(n.admin_notes||""),ke(!0)}}catch(n){console.error("Error loading quote detail:",n)}},dn=()=>{Oe(""),Le([]),qe(!0)},cn=(0,r.useCallback)(async e=>{if(e.length<2)Le([]);else{Qe(!0);try{const n=tn(),t=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),n=Array.isArray(e)?e:e.data||[];Le(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{Qe(!1)}}},[]);(0,r.useEffect)(()=>{const e=setTimeout(()=>{Pe&&cn(Pe)},300);return()=>clearTimeout(e)},[Pe,cn]);const pn=(e,n,t)=>{Xe(r=>r.map((r,o)=>o===e?{...r,[n]:t}:r))},xn=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),hn=e=>e.charAt(0).toUpperCase()+e.slice(1),un=(null===Ce||void 0===Ce?void 0:Ce.currency)||"MYR";return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(a.mc,{children:[(0,x.jsx)(a.Y9,{children:(0,x.jsx)(a.hE,{children:"Hardware Quotes"})}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{color:"#635BFF",children:[(0,x.jsx)(g,{children:ue.total}),(0,x.jsx)(m,{children:"Total"})]}),(0,x.jsxs)(u,{color:"#F59E0B",children:[(0,x.jsx)(g,{children:ue.new}),(0,x.jsx)(m,{children:"New"})]}),(0,x.jsxs)(u,{color:"#3B82F6",children:[(0,x.jsx)(g,{children:ue.contacted}),(0,x.jsx)(m,{children:"Contacted"})]}),(0,x.jsxs)(u,{color:"#10B981",children:[(0,x.jsx)(g,{children:ue.confirmed}),(0,x.jsx)(m,{children:"Confirmed"})]}),(0,x.jsxs)(u,{color:"#8B5CF6",children:[(0,x.jsx)(g,{children:ue.invoiced}),(0,x.jsx)(m,{children:"Invoiced"})]})]}),(0,x.jsxs)(s.tU,{children:[(0,x.jsxs)(s.oz,{active:"active"===Fe,onClick:()=>we("active"),children:["Active Quotes (",an,")"]}),(0,x.jsxs)(s.oz,{active:"closed"===Fe,onClick:()=>we("closed"),children:["Closed Quotes (",sn,")"]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(y,{placeholder:"Search by name, email, company, quote number...",value:ye,onChange:e=>ve(e.target.value)}),(0,x.jsxs)(v,{value:je,onChange:e=>be(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),"active"===Fe?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"new",children:"New"}),(0,x.jsx)("option",{value:"contacted",children:"Contacted"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),me?(0,x.jsx)(i.pp,{children:"Loading..."}):0===on.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,x.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","active"===Fe?"active":"closed"," quotes"]}),(0,x.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,x.jsx)(j,{children:on.map(e=>{var n,t,r;return(0,x.jsxs)(b,{onClick:()=>ln(e),children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:e.quote_number}),(0,x.jsx)(k,{children:e.contact_name}),(0,x.jsx)(C,{children:e.contact_email}),e.company_name&&(0,x.jsx)(B,{children:e.company_name})]}),(0,x.jsx)(E,{status:e.status,children:hn(e.status)})]}),(0,x.jsx)(z,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(t=e.package_snapshot)||void 0===t?void 0:t.name)||"N/A"}),e.addon_items&&e.addon_items.length>0&&(0,x.jsx)(_,{children:(r=e.addon_items,r&&0!==r.length?"+ "+r.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,x.jsx)(S,{children:(0,d.vv)(e.total_amount,e.currency)}),(0,x.jsx)($,{}),(0,x.jsxs)(T,{children:[(0,x.jsx)("span",{children:xn(e.created_at)}),"active"===Fe&&(0,x.jsx)(N,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=tn();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(he(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),rn(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),Ae&&Ce&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>ke(!1),title:`Quote ${Ce.quote_number}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{variant:"danger",onClick:()=>De(!0),children:"Delete"}),(0,x.jsx)("div",{style:{flex:1}}),"confirmed"===Ce.status&&!Ce.invoice_id&&(0,x.jsx)(L,{variant:"primary",onClick:()=>{const e=new Date;e.setDate(e.getDate()+14),We(e.toISOString().split("T")[0]),Ye("none"),Ge(""),Xe([]),Re(!0)},children:"Create Invoice"}),(0,x.jsx)(L,{onClick:()=>ke(!1),children:"Close"})]}),children:[(0,x.jsx)(D,{style:{marginTop:0},children:"Quote Info"}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Quote Number"}),(0,x.jsx)(O,{style:{fontFamily:"monospace"},children:Ce.quote_number})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Status"}),(0,x.jsx)(O,{children:(0,x.jsxs)(U,{value:Ee,onChange:e=>(async e=>{if(Ce){ze(e);try{const n=tn();(await fetch(`/api/hardware-quotes/${Ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(he(n=>n.map(n=>n.id===Ce.id?{...n,status:e}:n)),Be(n=>n?{...n,status:e}:null),rn(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),disabled:"invoiced"===Ee,children:[(0,x.jsx)("option",{value:"new",children:"New"}),(0,x.jsx)("option",{value:"contacted",children:"Contacted"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"}),"invoiced"===Ee&&(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Created"}),(0,x.jsx)(O,{children:xn(Ce.created_at)})]})]}),(0,x.jsx)(D,{children:"Customer Info"}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Name"}),(0,x.jsx)(O,{children:Ce.contact_name})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Email"}),(0,x.jsx)(O,{children:Ce.contact_email})]}),Ce.contact_phone&&(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Phone"}),(0,x.jsx)(O,{children:Ce.contact_phone})]}),Ce.company_name&&(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Company"}),(0,x.jsx)(O,{children:Ce.company_name})]})]}),(0,x.jsx)(D,{children:"Linked User"}),Ce.user?(0,x.jsxs)(Z,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)("strong",{children:Ce.user.full_name}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Ce.user.email,")"]}),(0,x.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Ce.user.role})]}),(0,x.jsx)(L,{onClick:dn,children:"Change"})]}):(0,x.jsxs)(Z,{style:{background:"#F9FAFB"},children:[(0,x.jsx)(G,{style:{color:"#6B7280"},children:"Not linked"}),(0,x.jsx)(L,{variant:"primary",onClick:dn,children:"Link User"})]}),(0,x.jsx)(D,{children:"Quote Details"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,x.jsxs)(K,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(e=Ce.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Ce.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(t=Ce.packageProduct)||void 0===t?void 0:t.set_group)||""," - ",(null===(o=Ce.packageProduct)||void 0===o?void 0:o.set_tier)||"",")"]})]}),(0,x.jsx)("div",{style:{fontWeight:600},children:(0,d.vv)(Ce.package_price,un)})]}),Ce.addon_items&&Ce.addon_items.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Ce.addon_items.map((e,n)=>(0,x.jsxs)(K,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,un)})]},n))]}),(0,x.jsxs)(Y,{children:[(0,x.jsx)("div",{children:"Total"}),(0,x.jsx)("div",{children:(0,d.vv)(Ce.total_amount,un)})]})]}),Ce.message&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(D,{children:"Customer Message"}),(0,x.jsx)(M,{children:Ce.message})]}),(0,x.jsx)(D,{children:"Admin Notes"}),(0,x.jsxs)(Q,{style:{marginBottom:0},children:[(0,x.jsx)(R,{value:_e,onChange:e=>Se(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,x.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,x.jsx)(L,{variant:"primary",onClick:async()=>{if(Ce){Te(!0);try{const e=tn();(await fetch(`/api/hardware-quotes/${Ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:_e})})).ok&&Be(e=>e?{...e,admin_notes:_e}:null)}catch(e){console.error("Error saving notes:",e)}finally{Te(!1)}}},disabled:$e||_e===(Ce.admin_notes||""),children:$e?"Saving...":"Save Notes"})})]}),(0,x.jsx)(D,{children:"Comments"}),(0,x.jsx)(c.A,{entityType:"hardware_quote",entityId:String(Ce.id),currentUserId:null!==pe&&void 0!==pe&&pe.id?Number(pe.id):void 0}),Ce.invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(D,{children:"Invoice"}),(0,x.jsx)(te,{children:(0,x.jsxs)(I,{style:{marginBottom:0},children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Invoice Number"}),(0,x.jsx)(O,{style:{fontFamily:"monospace"},children:Ce.invoice.invoice_number})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Status"}),(0,x.jsx)(O,{children:(0,x.jsx)(E,{status:Ce.invoice.status,children:hn(Ce.invoice.status)})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(P,{children:"Amount"}),(0,x.jsx)(O,{style:{fontWeight:600},children:(0,d.vv)(Ce.invoice.total_amount,Ce.invoice.currency)})]})]})})]})]}),Ie&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>qe(!1),title:"Link User to Quote",footer:(0,x.jsx)(L,{onClick:()=>qe(!1),children:"Cancel"}),children:[(0,x.jsxs)(Q,{children:[(0,x.jsx)(J,{children:"Search users by name or email"}),(0,x.jsx)(H,{value:Pe,onChange:e=>Oe(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Me&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Ue.length>0&&(0,x.jsx)(V,{children:Ue.map(e=>(0,x.jsxs)(X,{onClick:()=>(async e=>{if(Ce)try{const n=tn();(await fetch(`/api/hardware-quotes/${Ce.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(qe(!1),ln(Ce))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,x.jsx)(ee,{children:e.full_name}),(0,x.jsxs)(ne,{children:[e.email," - ",e.role]})]},e.id))}),Pe.length>=2&&!Me&&0===Ue.length&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),Je&&Ce&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>Re(!1),title:"Create Invoice from Quote",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{onClick:()=>Re(!1),children:"Cancel"}),(0,x.jsx)(L,{variant:"primary",onClick:async()=>{if(Ce){nn(!0);try{const e=tn(),n={due_date:He};"none"!==Ke&&Ze&&(n.discount_type=Ke,n.discount_value=parseFloat(Ze));const t=Ve.filter(e=>e.name&&e.amount);t.length>0&&(n.additional_charges=t.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const r=await fetch(`/api/hardware-quotes/${Ce.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(r.ok)Re(!1),ke(!1),rn();else{const e=await r.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{nn(!1)}}},disabled:en,children:en?"Creating...":"Create Invoice"})]}),children:[(0,x.jsx)(D,{style:{marginTop:0},children:"Quote Summary"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(K,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(se=Ce.packageProduct)||void 0===se?void 0:se.name)||(null===(le=Ce.package_snapshot)||void 0===le?void 0:le.name)||"N/A"})," (",(null===(de=Ce.packageProduct)||void 0===de?void 0:de.set_group)||""," - ",(null===(ce=Ce.packageProduct)||void 0===ce?void 0:ce.set_tier)||"",")"]}),(0,x.jsx)("div",{children:(0,d.vv)(Ce.package_price,un)})]}),Ce.addon_items&&Ce.addon_items.map((e,n)=>(0,x.jsxs)(K,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,un)})]},n)),(0,x.jsxs)(Y,{children:[(0,x.jsx)("div",{children:"Subtotal"}),(0,x.jsx)("div",{children:(0,d.vv)(Ce.total_amount,un)})]})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(J,{children:"Due Date"}),(0,x.jsx)(H,{type:"date",value:He,onChange:e=>We(e.target.value)})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(J,{children:"Discount"}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(W,{style:{width:"auto",minWidth:150},value:Ke,onChange:e=>Ye(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:"No Discount"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==Ke&&(0,x.jsx)(H,{type:"number",min:"0",step:"0.01",value:Ze,onChange:e=>Ge(e.target.value),placeholder:"percentage"===Ke?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(J,{children:"Additional Charges"}),Ve.map((e,n)=>(0,x.jsxs)(re,{children:[(0,x.jsx)(oe,{children:(0,x.jsx)(H,{value:e.name,onChange:e=>pn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(oe,{children:(0,x.jsx)(H,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>pn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(L,{variant:"danger",onClick:()=>{return e=n,void Xe(n=>n.filter((n,t)=>t!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,x.jsx)(L,{onClick:()=>{Xe(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsxs)(Y,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:"Invoice Total"}),(0,x.jsx)("div",{children:(0,d.vv)((()=>{if(!Ce)return 0;let e=Ce.total_amount;return"percentage"===Ke&&Ze?e-=e*(parseFloat(Ze)/100):"fixed"===Ke&&Ze&&(e-=parseFloat(Ze)),Ve.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),un)})]})]}),Ne&&(0,x.jsx)(a.aF,{isOpen:!0,onClose:()=>De(!1),title:"Confirm Delete",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{onClick:()=>De(!1),children:"Cancel"}),(0,x.jsx)(L,{variant:"danger",onClick:async()=>{if(Ce)try{const e=tn();await fetch(`/api/hardware-quotes/${Ce.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),De(!1),ke(!1),rn()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,x.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,x.jsx)("strong",{children:null===Ce||void 0===Ce?void 0:Ce.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,n,t)=>{t.d(n,{c:()=>a});var r=t(9950),o=t(4414);const i=/(https?:\/\/[^\s<]+)/g;function a(e){const n=e.split(i);return 1===n.length?e:n.map((e,n)=>i.test(e)?(0,o.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},n):(0,o.jsx)(r.Fragment,{children:e},n))}}}]);