"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var i=r(4752),t=r(4414);const o=i.Ay.div`
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
`,a=i.Ay.button`
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
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:r,style:i}=e;return(0,t.jsx)(o,{className:r,style:i,children:n})},d=e=>{let{active:n,onClick:r,children:i,className:o}=e;return(0,t.jsx)(a,{active:n,onClick:r,className:o,children:i})},c=e=>{let{count:n,variant:r="default",showZero:i=!1}=e;return 0!==n||i?(0,t.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>o});var i=r(9950),t=r(4492);function o(e){const[n,r]=(0,t.ok)(),o=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,i.useState)(o());return[a,(0,i.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4185:(e,n,r)=>{r.d(n,{A:()=>u});r(9950);var i=r(4752),t=r(4414);const o=i.Ay.div`
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
`,h=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,x=i.Ay.a`
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
`;const u=e=>{let{attachments:n}=e;if(!n||0===n.length)return null;const r=n.filter(e=>{var n;return null===(n=e.mimeType)||void 0===n?void 0:n.startsWith("image/")}),i=n.filter(e=>{var n;return!(null!==(n=e.mimeType)&&void 0!==n&&n.startsWith("image/"))});return(0,t.jsxs)(o,{children:[(0,t.jsxs)(a,{children:["Attachments (",n.length,")"]}),r.length>0&&(0,t.jsx)(h,{children:r.map((e,n)=>(0,t.jsx)(x,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,t.jsx)("img",{src:e.url,alt:e.originalName})},n))}),i.length>0&&(0,t.jsx)(s,{children:i.map((e,n)=>{return(0,t.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,t.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,t.jsx)(c,{children:e.originalName}),(0,t.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},n);var r,i})})]})}},4302:(e,n,r)=>{r.d(n,{A:()=>N});var i=r(9950),t=r(4752),o=r(4185),a=r(9061),s=r(4414);const l=t.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=t.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,c=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,p=t.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,h=t.Ay.div`
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
`,x=t.Ay.div`
  flex: 1;
  min-width: 0;
`,u=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=t.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=t.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,v=t.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,f=t.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,y=t.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=t.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=t.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,w=t.Ay.textarea`
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
`,A=t.Ay.div`
  display: flex;
  gap: 4px;
`,k=t.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,_=t.Ay.button`
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
`,C=t.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,B=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=t.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=t.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,$=t.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,T=t.Ay.input`
  display: none;
`,D=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,I=t.Ay.label`
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
`,N=e=>{let{entityType:n,entityId:r,currentUserId:t,onMarkRead:N}=e;const[P,q]=(0,i.useState)([]),[O,W]=(0,i.useState)(""),[L,R]=(0,i.useState)(!1),[U,H]=(0,i.useState)([]),[M,J]=(0,i.useState)(!1),[Q,K]=(0,i.useState)(""),[Y,Z]=(0,i.useState)(!1),G=(0,i.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${n}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&q(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[n,r]);const X=async()=>{if(M)return;const e=O.trim(),i=U.length>0;if((e||i)&&!Y){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r,content:O.trim(),attachments:i?U:void 0,is_internal:L||void 0})})).ok&&(W(""),H([]),R(!1),V())}catch(t){console.error("Error adding comment:",t)}finally{Z(!1)}}},ee=e=>{const n=new Date(e),r=(new Date).getTime()-n.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const t=Math.floor(i/60);if(t<24)return`${t}h ago`;const o=Math.floor(t/24);return o<7?`${o}d ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",P.length,")"]}),P.length>0?(0,s.jsx)(c,{children:P.map(e=>{var n,r,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(h,{children:((null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(v,{children:"Internal"}),(0,s.jsx)(f,{children:ee(e.createdAt)}),t&&e.author_id===t&&(0,s.jsx)(j,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&V()}catch(n){console.error("Error deleting comment:",n)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(y,{children:e.content.split("\n").map((e,n)=>(0,s.jsxs)(i.Fragment,{children:[n>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},n))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(C,{children:"No comments yet"}),(0,s.jsxs)(b,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(w,{value:O,onChange:e=>W(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:L?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(_,{onClick:X,disabled:!O.trim()&&0===U.length||Y||M,children:"Send"})]})]}),(0,s.jsx)(D,{children:(0,s.jsxs)(I,{children:[(0,s.jsx)("input",{type:"checkbox",checked:L,onChange:e=>R(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(U.length>0||M||Q)&&(0,s.jsxs)(B,{children:[M&&(0,s.jsx)(z,{children:"Uploading..."}),Q&&(0,s.jsx)($,{children:Q}),U.map((e,n)=>(0,s.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const n=U[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:n.url})}).catch(()=>{}),H(n=>n.filter((n,r)=>r!==e))})(n),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)(T,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const n=e.target.files;if(!n||0===n.length)return;const r=5-U.length,i=Array.from(n).slice(0,r);if(e.target.value="",0!==i.length){J(!0),K("");try{const e=new FormData;i.forEach(n=>e.append("files",n));const n=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),t=await r.json();t.success&&t.data?H(e=>[...e,...t.data]):K(t.message||"Upload failed")}catch(t){console.error("File upload error:",t),K("File upload failed. Please try again.")}finally{J(!1)}}}})]})}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>de});var i=r(9950),t=r(4492),o=r(4752),a=r(2853),s=r(8409),l=r(2597),d=r(2653),c=r(6038),p=r(4302),h=r(1367),x=r(4414);const u=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,m=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,v=o.Ay.div`
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
`,j=o.Ay.select`
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
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,F=o.Ay.div`
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
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,A=o.Ay.div`
  flex: 1;
  min-width: 0;
`,k=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,_=o.Ay.div`
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
`,S=o.Ay.div`
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
`,z=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,$=o.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,T=o.Ay.div`
  flex: 1;
  min-height: 12px;
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,I=o.Ay.button`
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
`,N=o.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,P=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,q=o.Ay.div`
  font-size: 14px;
`,O=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,W=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,L=o.Ay.select`
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
`,R=o.Ay.button`
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
`,U=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,H=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,J=o.Ay.textarea`
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
`,Q=o.Ay.input`
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
`,K=o.Ay.select`
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
`,Y=o.Ay.div`
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
`,Z=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,G=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,V=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,X=o.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,ee=o.Ay.div`
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
`,ne=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,re=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,ie=o.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,te=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,oe=o.Ay.div`
  flex: 1;
`,ae=["new"],se=["contacted","confirmed"],le=["invoiced","cancelled"],de=()=>{var e,n,r,o,de,ce,pe,he,xe,ue,ge,me,ve,fe,ye,je,be,Fe;const{user:we}=(0,h.As)(),[Ae,ke]=(0,i.useState)([]),[_e,Ce]=(0,i.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[Be,Ee]=(0,i.useState)(!0),[Se]=(0,t.ok)(),[ze,$e]=(0,i.useState)(Se.get("search")||""),[Te,De]=(0,i.useState)("all"),[Ie,Ne]=(0,d.M)("new"),[Pe,qe]=(0,i.useState)(!1),[Oe,We]=(0,i.useState)(null),[Le,Re]=(0,i.useState)(""),[Ue,He]=(0,i.useState)(""),[Me,Je]=(0,i.useState)(!1),[Qe,Ke]=(0,i.useState)(!1),[Ye,Ze]=(0,i.useState)(!1),[Ge,Ve]=(0,i.useState)(""),[Xe,en]=(0,i.useState)([]),[nn,rn]=(0,i.useState)(!1),[tn,on]=(0,i.useState)(!1),[an,sn]=(0,i.useState)(""),[ln,dn]=(0,i.useState)("none"),[cn,pn]=(0,i.useState)(""),[hn,xn]=(0,i.useState)([]),[un,gn]=(0,i.useState)(!1),[mn,vn]=(0,i.useState)(!1),[fn,yn]=(0,i.useState)(""),[jn,bn]=(0,i.useState)("none"),[Fn,wn]=(0,i.useState)(""),[An,kn]=(0,i.useState)([]),[_n,Cn]=(0,i.useState)(!1),[Bn,En]=(0,i.useState)(!1),[Sn,zn]=(0,i.useState)(null),$n=()=>localStorage.getItem("auth_token"),Tn=(0,i.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||Ee(!0);const n=$n(),r=new URLSearchParams;"all"!==Te&&r.append("status",Te),ze&&r.append("search",ze);const[i,t]=await Promise.all([fetch(`/api/hardware-quotes?${r}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(i.ok){const e=await i.json();ke(e.data||e)}if(t.ok){const e=await t.json();Ce(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{Ee(!1)}},[ze,Te]);(0,i.useEffect)(()=>{Tn()},[Tn]),(0,i.useEffect)(()=>{const e=setInterval(()=>Tn(!0),1e4);return()=>clearInterval(e)},[Tn]);const Dn=Ae.filter(e=>("new"===Ie?ae:"progress"===Ie?se:le).includes(e.status)),In=Ae.filter(e=>ae.includes(e.status)).length,Nn=Ae.filter(e=>se.includes(e.status)).length,Pn=Ae.filter(e=>le.includes(e.status)).length,qn=async e=>{try{const n=$n(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;We(n),Re(n.status),He(n.admin_notes||""),qe(!0)}}catch(n){console.error("Error loading quote detail:",n)}},On=()=>{Ve(""),en([]),Ze(!0)},Wn=(0,i.useCallback)(async e=>{if(e.length<2)en([]);else{rn(!0);try{const n=$n(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];en(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{rn(!1)}}},[]);(0,i.useEffect)(()=>{const e=setTimeout(()=>{Ge&&Wn(Ge)},300);return()=>clearTimeout(e)},[Ge,Wn]);const Ln=(e,n,r)=>{xn(i=>i.map((i,t)=>t===e?{...i,[n]:r}:i))},Rn=(e,n,r)=>{kn(i=>i.map((i,t)=>t===e?{...i,[n]:r}:i))},Un=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Hn=e=>({new:"New",contacted:"In Progress",confirmed:"Confirmed",invoiced:"Invoiced",cancelled:"Closed"}[e]||e.charAt(0).toUpperCase()+e.slice(1)),Mn=(null===Oe||void 0===Oe?void 0:Oe.currency)||"MYR";return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsx)(s.Y9,{children:(0,x.jsx)(s.hE,{children:"Hardware Quotes"})}),(0,x.jsxs)(s.UC,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(g,{color:"#635BFF",children:[(0,x.jsx)(m,{children:_e.total}),(0,x.jsx)(v,{children:"Total"})]}),(0,x.jsxs)(g,{color:"#F59E0B",children:[(0,x.jsx)(m,{children:_e.new}),(0,x.jsx)(v,{children:"New"})]}),(0,x.jsxs)(g,{color:"#3B82F6",children:[(0,x.jsx)(m,{children:_e.contacted}),(0,x.jsx)(v,{children:"Contacted"})]}),(0,x.jsxs)(g,{color:"#10B981",children:[(0,x.jsx)(m,{children:_e.confirmed}),(0,x.jsx)(v,{children:"Confirmed"})]}),(0,x.jsxs)(g,{color:"#8B5CF6",children:[(0,x.jsx)(m,{children:_e.invoiced}),(0,x.jsx)(v,{children:"Invoiced"})]})]}),(0,x.jsxs)(l.tU,{children:[(0,x.jsxs)(l.oz,{active:"new"===Ie,onClick:()=>Ne("new"),children:["New (",In,")"]}),(0,x.jsxs)(l.oz,{active:"progress"===Ie,onClick:()=>Ne("progress"),children:["In Progress (",Nn,")"]}),(0,x.jsxs)(l.oz,{active:"closed"===Ie,onClick:()=>Ne("closed"),children:["Closed (",Pn,")"]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(y,{placeholder:"Search by name, email, company, quote number...",value:ze,onChange:e=>$e(e.target.value)}),(0,x.jsxs)(j,{value:Te,onChange:e=>De(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),"new"===Ie?(0,x.jsx)("option",{value:"new",children:"New"}):"progress"===Ie?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"contacted",children:"Contacted"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),Be?(0,x.jsx)(a.pp,{children:"Loading..."}):0===Dn.length?(0,x.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,x.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","new"===Ie?"new":"progress"===Ie?"in progress":"closed"," quotes"]}),(0,x.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,x.jsx)(b,{children:Dn.map(e=>{var n,r,i,t,o;return(0,x.jsxs)(F,{onClick:()=>qn(e),children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(k,{children:e.quote_number}),(0,x.jsx)(_,{children:e.contact_name}),(0,x.jsx)(C,{children:e.contact_email}),e.company_name&&(0,x.jsx)(B,{children:e.company_name})]}),(0,x.jsx)(E,{status:e.status,children:Hn(e.status)})]}),(0,x.jsx)(S,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(r=e.package_snapshot)||void 0===r?void 0:r.name)||"N/A"}),e.plan_id&&(0,x.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:600,background:"#ECFDF5",color:"#059669",marginBottom:"4px"},children:["+ Subscription: ",(null===(i=e.plan_snapshot)||void 0===i?void 0:i.display_name)||"Plan"," (",e.billing_cycle||"monthly",")"]}),e.addon_items&&e.addon_items.length>0&&(0,x.jsx)(z,{children:(o=e.addon_items,o&&0!==o.length?"+ "+o.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,x.jsx)($,{children:(0,c.vv)(e.total_amount,e.currency)}),e.invoice_id&&(0,x.jsxs)("div",{style:{marginTop:"8px",display:"flex",alignItems:"center",gap:"6px"},children:[(0,x.jsx)("span",{style:{padding:"3px 8px",fontSize:"11px",fontWeight:600,background:"#ECFDF5",color:"#059669",borderRadius:"4px"},children:"Invoice Created"}),(null===(t=e.invoice)||void 0===t?void 0:t.invoice_number)&&(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${e.invoice.invoice_number}`,onClick:e=>e.stopPropagation(),style:{fontSize:"11px",color:"#635BFF",textDecoration:"none",fontWeight:500},children:[e.invoice.invoice_number," \u2192"]})]}),(0,x.jsx)(T,{}),(0,x.jsxs)(D,{children:[(0,x.jsx)("span",{children:Un(e.created_at)}),"new"===Ie&&(0,x.jsx)(I,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=$n();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"contacted"})})).ok&&(ke(n=>n.map(n=>n.id===e.id?{...n,status:"contacted"}:n)),Tn(!0))}catch(n){console.error("Error starting process:",n)}})(e)},style:{background:"#F0F0FF",color:"#635BFF",borderColor:"#635BFF"},children:"Start Process"}),"progress"===Ie&&(0,x.jsx)(I,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=$n();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(ke(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),Tn(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),Pe&&Oe&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>qe(!1),title:`Quote ${Oe.quote_number}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{variant:"danger",onClick:()=>Ke(!0),children:"Delete"}),(0,x.jsx)("div",{style:{flex:1}}),"invoiced"!==Oe.status&&"cancelled"!==Oe.status&&!Oe.invoice_id&&(Oe.plan_id?(0,x.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),yn(e.toISOString().split("T")[0]),bn("none"),wn(""),kn([]),Cn(!1),zn(null),qe(!1),setTimeout(()=>vn(!0),200)})(),children:"Proceed Contract"}):(0,x.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),sn(e.toISOString().split("T")[0]),dn("none"),pn(""),xn([]),qe(!1),setTimeout(()=>on(!0),200)})(),children:"Create Invoice"})),(0,x.jsx)(R,{onClick:()=>qe(!1),children:"Close"})]}),children:[(0,x.jsx)(N,{style:{marginTop:0},children:"Quote Info"}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Quote Number"}),(0,x.jsx)(W,{style:{fontFamily:"monospace"},children:Oe.quote_number})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Status"}),(0,x.jsx)(W,{children:(0,x.jsxs)(L,{value:Le,onChange:e=>(async e=>{if(Oe){Re(e);try{const n=$n();(await fetch(`/api/hardware-quotes/${Oe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(ke(n=>n.map(n=>n.id===Oe.id?{...n,status:e}:n)),We(n=>n?{...n,status:e}:null),Tn(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),disabled:"invoiced"===Le,children:[(0,x.jsx)("option",{value:"new",children:"New"}),(0,x.jsx)("option",{value:"contacted",children:"In Progress"}),(0,x.jsx)("option",{value:"confirmed",children:"Confirmed"}),"invoiced"===Le&&(0,x.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,x.jsx)("option",{value:"cancelled",children:"Closed"})]})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Created"}),(0,x.jsx)(W,{children:Un(Oe.created_at)})]})]}),(0,x.jsx)(N,{children:"Customer Info"}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Name"}),(0,x.jsx)(W,{children:Oe.contact_name})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Email"}),(0,x.jsx)(W,{children:Oe.contact_email})]}),Oe.contact_phone&&(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Phone"}),(0,x.jsx)(W,{children:Oe.contact_phone})]}),Oe.company_name&&(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Company"}),(0,x.jsx)(W,{children:Oe.company_name})]})]}),(0,x.jsx)(N,{children:"Linked User"}),Oe.user?(0,x.jsxs)(G,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("strong",{children:Oe.user.full_name}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Oe.user.email,")"]}),(0,x.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Oe.user.role})]}),(0,x.jsx)(R,{onClick:On,children:"Change"})]}):(0,x.jsxs)(G,{style:{background:"#F9FAFB"},children:[(0,x.jsx)(V,{style:{color:"#6B7280"},children:"Not linked"}),(0,x.jsx)(R,{variant:"primary",onClick:On,children:"Link User"})]}),(0,x.jsx)(N,{children:"Quote Details"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,x.jsxs)(Y,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(e=Oe.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Oe.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,x.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(r=Oe.packageProduct)||void 0===r?void 0:r.set_group)||""," - ",(null===(o=Oe.packageProduct)||void 0===o?void 0:o.set_tier)||"",")"]})]}),(0,x.jsx)("div",{style:{fontWeight:600},children:(0,c.vv)(Oe.package_price,Mn)})]}),Oe.addon_items&&Oe.addon_items.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Oe.addon_items.map((e,n)=>(0,x.jsxs)(Y,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Mn)})]},n))]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)("div",{children:"Total"}),(0,x.jsx)("div",{children:(0,c.vv)(Oe.total_amount,Mn)})]})]}),Oe.plan_id&&Oe.plan_snapshot&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Subscription Plan"}),(0,x.jsx)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:16,borderLeft:"3px solid #059669"},children:(0,x.jsxs)(P,{style:{marginBottom:0},children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Plan"}),(0,x.jsx)(W,{style:{fontWeight:600},children:Oe.plan_snapshot.display_name})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Billing Cycle"}),(0,x.jsx)(W,{style:{textTransform:"capitalize"},children:Oe.billing_cycle||"monthly"})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Monthly Price"}),(0,x.jsxs)(W,{children:[(0,c.vv)((null===(de=Oe.plan_snapshot.currency_prices)||void 0===de||null===(ce=de[Mn])||void 0===ce?void 0:ce.monthly)||Oe.plan_snapshot.base_price_monthly,Mn),"/mo"]})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Annual Price"}),(0,x.jsxs)(W,{children:[(0,c.vv)((null===(pe=Oe.plan_snapshot.currency_prices)||void 0===pe||null===(he=pe[Mn])||void 0===he?void 0:he.annual)||Oe.plan_snapshot.base_price_annual,Mn),"/yr"]})]})]})})]}),Oe.message&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Customer Message"}),(0,x.jsx)(U,{children:Oe.message})]}),(0,x.jsx)(N,{children:"Admin Notes"}),(0,x.jsxs)(H,{style:{marginBottom:0},children:[(0,x.jsx)(J,{value:Ue,onChange:e=>He(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,x.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Oe){Je(!0);try{const e=$n();(await fetch(`/api/hardware-quotes/${Oe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Ue})})).ok&&We(e=>e?{...e,admin_notes:Ue}:null)}catch(e){console.error("Error saving notes:",e)}finally{Je(!1)}}},disabled:Me||Ue===(Oe.admin_notes||""),children:Me?"Saving...":"Save Notes"})})]}),(0,x.jsx)(p.A,{entityType:"hardware_quote",entityId:String(Oe.id),currentUserId:null!==we&&void 0!==we&&we.id?Number(we.id):void 0}),Oe.invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Hardware Invoice"}),(0,x.jsx)(ie,{children:(0,x.jsxs)(P,{style:{marginBottom:0},children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Invoice Number"}),(0,x.jsx)(W,{children:(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${Oe.invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Oe.invoice.invoice_number," \u2192"]})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Status"}),(0,x.jsx)(W,{children:(0,x.jsx)(E,{status:Oe.invoice.status,children:Hn(Oe.invoice.status)})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Amount"}),(0,x.jsx)(W,{style:{fontWeight:600},children:(0,c.vv)(Oe.invoice.total_amount,Oe.invoice.currency)})]})]})})]}),Oe.subscription_invoice&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Subscription Invoice"}),(0,x.jsx)(ie,{style:{borderLeftColor:"#059669"},children:(0,x.jsxs)(P,{style:{marginBottom:0},children:[(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Invoice Number"}),(0,x.jsx)(W,{children:(0,x.jsxs)("a",{href:`/pos/admin/invoices?search=${Oe.subscription_invoice.invoice_number}`,style:{fontFamily:"monospace",color:"#635BFF",textDecoration:"none",fontWeight:600},children:[Oe.subscription_invoice.invoice_number," \u2192"]})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Status"}),(0,x.jsx)(W,{children:(0,x.jsx)(E,{status:Oe.subscription_invoice.status,children:Hn(Oe.subscription_invoice.status)})})]}),(0,x.jsxs)(q,{children:[(0,x.jsx)(O,{children:"Amount"}),(0,x.jsx)(W,{style:{fontWeight:600},children:(0,c.vv)(Oe.subscription_invoice.total_amount,Oe.subscription_invoice.currency)})]})]})})]})]}),Ye&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>Ze(!1),title:"Link User to Quote",footer:(0,x.jsx)(R,{onClick:()=>Ze(!1),children:"Cancel"}),children:[(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Search users by name or email"}),(0,x.jsx)(Q,{value:Ge,onChange:e=>Ve(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),nn&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Xe.length>0&&(0,x.jsx)(X,{children:Xe.map(e=>(0,x.jsxs)(ee,{onClick:()=>(async e=>{if(Oe)try{const n=$n();(await fetch(`/api/hardware-quotes/${Oe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(Ze(!1),qn(Oe))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,x.jsx)(ne,{children:e.full_name}),(0,x.jsxs)(re,{children:[e.email," - ",e.role]})]},e.id))}),Ge.length>=2&&!nn&&0===Xe.length&&(0,x.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),tn&&Oe&&(0,x.jsxs)(s.aF,{isOpen:!0,onClose:()=>on(!1),title:"Create Invoice from Quote",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>on(!1),children:"Cancel"}),(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Oe){gn(!0);try{const e=$n(),n={due_date:an};"none"!==ln&&cn&&(n.discount_type=ln,n.discount_value=parseFloat(cn));const r=hn.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const i=await fetch(`/api/hardware-quotes/${Oe.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(i.ok)on(!1),qe(!1),Tn();else{const e=await i.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{gn(!1)}}},disabled:un,children:un?"Creating...":"Create Invoice"})]}),children:[(0,x.jsx)(N,{style:{marginTop:0},children:"Quote Summary"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(Y,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:(null===(xe=Oe.packageProduct)||void 0===xe?void 0:xe.name)||(null===(ue=Oe.package_snapshot)||void 0===ue?void 0:ue.name)||"N/A"})," (",(null===(ge=Oe.packageProduct)||void 0===ge?void 0:ge.set_group)||""," - ",(null===(me=Oe.packageProduct)||void 0===me?void 0:me.set_tier)||"",")"]}),(0,x.jsx)("div",{children:(0,c.vv)(Oe.package_price,Mn)})]}),Oe.addon_items&&Oe.addon_items.map((e,n)=>(0,x.jsxs)(Y,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Mn)})]},n)),(0,x.jsxs)(Z,{children:[(0,x.jsx)("div",{children:"Subtotal"}),(0,x.jsx)("div",{children:(0,c.vv)(Oe.total_amount,Mn)})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Due Date"}),(0,x.jsx)(Q,{type:"date",value:an,onChange:e=>sn(e.target.value)})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Discount"}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(K,{style:{width:"auto",minWidth:150},value:ln,onChange:e=>dn(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:"No Discount"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==ln&&(0,x.jsx)(Q,{type:"number",min:"0",step:"0.01",value:cn,onChange:e=>pn(e.target.value),placeholder:"percentage"===ln?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Additional Charges"}),hn.map((e,n)=>(0,x.jsxs)(te,{children:[(0,x.jsx)(oe,{children:(0,x.jsx)(Q,{value:e.name,onChange:e=>Ln(n,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(oe,{children:(0,x.jsx)(Q,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Ln(n,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void xn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,x.jsx)(R,{onClick:()=>{xn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsxs)(Z,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:"Invoice Total"}),(0,x.jsx)("div",{children:(0,c.vv)((()=>{if(!Oe)return 0;let e=Oe.total_amount;return"percentage"===ln&&cn?e-=e*(parseFloat(cn)/100):"fixed"===ln&&cn&&(e-=parseFloat(cn)),hn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Mn)})]})]}),mn&&Oe&&(0,x.jsx)(s.aF,{isOpen:!0,onClose:()=>{vn(!1),zn(null)},title:"Proceed Contract",footer:Sn?(0,x.jsx)(R,{onClick:()=>{vn(!1),qe(!1),zn(null),Tn()},children:"Close"}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>vn(!1),children:"Cancel"}),(0,x.jsx)(R,{variant:"primary",onClick:async()=>{if(Oe){En(!0);try{const a=$n(),s={due_date:fn,mark_as_paid:_n};"none"!==jn&&Fn&&(s.discount_type=jn,s.discount_value=parseFloat(Fn));const l=An.filter(e=>e.name&&e.amount);l.length>0&&(s.additional_charges=l.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const d=await fetch(`/api/hardware-quotes/${Oe.id}/proceed`,{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(d.ok){var e,n,r,i,t,o;const a=await d.json();zn({hardware_invoice:(null===(e=a.data)||void 0===e||null===(n=e.hardware_invoice)||void 0===n?void 0:n.invoice_number)||(null===(r=a.hardware_invoice)||void 0===r?void 0:r.invoice_number),subscription_invoice:(null===(i=a.data)||void 0===i||null===(t=i.subscription_invoice)||void 0===t?void 0:t.invoice_number)||(null===(o=a.subscription_invoice)||void 0===o?void 0:o.invoice_number)}),Tn(!0)}else{const e=await d.json();alert(e.message||"Failed to proceed contract")}}catch(a){console.error("Error proceeding contract:",a)}finally{En(!1)}}},disabled:Bn||!Oe.user_id,children:Bn?"Processing...":"Proceed Contract"})]}),children:Sn?(0,x.jsxs)("div",{style:{background:"#ECFDF5",border:"1px solid #10B981",borderRadius:8,padding:24,textAlign:"center",color:"#065F46",lineHeight:1.6},children:[(0,x.jsx)("div",{style:{fontSize:18,fontWeight:700,marginBottom:12},children:"Contract Created Successfully"}),Sn.hardware_invoice&&(0,x.jsxs)("div",{children:["Hardware Invoice: ",(0,x.jsx)("strong",{style:{fontFamily:"monospace"},children:Sn.hardware_invoice})]}),Sn.subscription_invoice&&(0,x.jsxs)("div",{children:["Subscription Invoice: ",(0,x.jsx)("strong",{style:{fontFamily:"monospace"},children:Sn.subscription_invoice})]})]}):(0,x.jsxs)(x.Fragment,{children:[!Oe.user_id&&(0,x.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:"#92400E"},children:"A linked user is required to proceed. Please link a user first."}),(0,x.jsx)(N,{style:{marginTop:0},children:"Hardware"}),(0,x.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,x.jsxs)(Y,{children:[(0,x.jsx)("div",{children:(0,x.jsx)("strong",{children:(null===(ve=Oe.packageProduct)||void 0===ve?void 0:ve.name)||(null===(fe=Oe.package_snapshot)||void 0===fe?void 0:fe.name)||"N/A"})}),(0,x.jsx)("div",{children:(0,c.vv)(Oe.package_price,Mn)})]}),Oe.addon_items&&Oe.addon_items.map((e,n)=>(0,x.jsxs)(Y,{children:[(0,x.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,x.jsx)("div",{children:(0,c.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Mn)})]},n)),(0,x.jsxs)(Z,{children:[(0,x.jsx)("div",{children:"Hardware Subtotal"}),(0,x.jsx)("div",{children:(0,c.vv)(Oe.total_amount,Mn)})]})]}),Oe.plan_snapshot&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(N,{children:"Subscription Plan"}),(0,x.jsxs)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:20,borderLeft:"3px solid #059669"},children:[(0,x.jsx)("div",{style:{fontWeight:600,fontSize:14,color:"#0A2540",marginBottom:4},children:Oe.plan_snapshot.display_name}),(0,x.jsxs)("div",{style:{fontSize:13,color:"#6B7280"},children:["annual"===Oe.billing_cycle?"Annual":"Monthly"," billing -"," ",(0,c.vv)("annual"===Oe.billing_cycle?(null===(ye=Oe.plan_snapshot.currency_prices)||void 0===ye||null===(je=ye[Mn])||void 0===je?void 0:je.annual)||Oe.plan_snapshot.base_price_annual:(null===(be=Oe.plan_snapshot.currency_prices)||void 0===be||null===(Fe=be[Mn])||void 0===Fe?void 0:Fe.monthly)||Oe.plan_snapshot.base_price_monthly,Mn),"annual"===Oe.billing_cycle?"/yr":"/mo"]})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Due Date"}),(0,x.jsx)(Q,{type:"date",value:fn,onChange:e=>yn(e.target.value)})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Hardware Discount"}),(0,x.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,x.jsxs)(K,{style:{width:"auto",minWidth:150},value:jn,onChange:e=>bn(e.target.value),children:[(0,x.jsx)("option",{value:"none",children:"No Discount"}),(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==jn&&(0,x.jsx)(Q,{type:"number",min:"0",step:"0.01",value:Fn,onChange:e=>wn(e.target.value),placeholder:"percentage"===jn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(M,{children:"Additional Charges"}),An.map((e,n)=>(0,x.jsxs)(te,{children:[(0,x.jsx)(oe,{children:(0,x.jsx)(Q,{value:e.name,onChange:e=>Rn(n,"name",e.target.value),placeholder:"Charge name"})}),(0,x.jsx)(oe,{children:(0,x.jsx)(Q,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Rn(n,"amount",e.target.value),placeholder:"Amount"})}),(0,x.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void kn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,x.jsx)(R,{onClick:()=>{kn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,x.jsx)(H,{children:(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",fontSize:"14px",color:"#374151"},children:[(0,x.jsx)("input",{type:"checkbox",checked:_n,onChange:e=>Cn(e.target.checked),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),"Mark hardware invoice as paid"]})}),(0,x.jsxs)(Z,{style:{fontSize:18},children:[(0,x.jsx)("div",{children:"Hardware Invoice Total"}),(0,x.jsx)("div",{children:(0,c.vv)((()=>{if(!Oe)return 0;let e=Oe.total_amount;return"percentage"===jn&&Fn?e-=e*(parseFloat(Fn)/100):"fixed"===jn&&Fn&&(e-=parseFloat(Fn)),An.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Mn)})]})]})}),Qe&&(0,x.jsx)(s.aF,{isOpen:!0,onClose:()=>Ke(!1),title:"Confirm Delete",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(R,{onClick:()=>Ke(!1),children:"Cancel"}),(0,x.jsx)(R,{variant:"danger",onClick:async()=>{if(Oe)try{const e=$n();await fetch(`/api/hardware-quotes/${Oe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Ke(!1),qe(!1),Tn()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,x.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,x.jsx)("strong",{children:null===Oe||void 0===Oe?void 0:Oe.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,n,r)=>{r.d(n,{c:()=>a});var i=r(9950),t=r(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const n=e.split(o);return 1===n.length?e:n.map((e,n)=>o.test(e)?(0,t.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},n):(0,t.jsx)(i.Fragment,{children:e},n))}}}]);