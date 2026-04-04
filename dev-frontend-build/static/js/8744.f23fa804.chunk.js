"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8744],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
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
`,a=t.Ay.button`
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
`,s=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:r,style:t}=e;return(0,i.jsx)(o,{className:r,style:t,children:n})},d=e=>{let{active:n,onClick:r,children:t,className:o}=e;return(0,i.jsx)(a,{active:n,onClick:r,className:o,children:t})},c=e=>{let{count:n,variant:r="default",showZero:t=!1}=e;return 0!==n||t?(0,i.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>o});var t=r(9950),i=r(4492);function o(e){const[n,r]=(0,i.ok)(),o=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,t.useState)(o());return[a,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4185:(e,n,r)=>{r.d(n,{A:()=>u});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
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
`,c=t.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=t.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,h=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,x=t.Ay.a`
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
`;const u=e=>{let{attachments:n}=e;if(!n||0===n.length)return null;const r=n.filter(e=>{var n;return null===(n=e.mimeType)||void 0===n?void 0:n.startsWith("image/")}),t=n.filter(e=>{var n;return!(null!==(n=e.mimeType)&&void 0!==n&&n.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",n.length,")"]}),r.length>0&&(0,i.jsx)(h,{children:r.map((e,n)=>(0,i.jsx)(x,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},n))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,n)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},n);var r,t})})]})}},4302:(e,n,r)=>{r.d(n,{A:()=>N});var t=r(9950),i=r(4752),o=r(4185),a=r(9061),s=r(4414);const l=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,d=i.Ay.h4`
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
`,p=i.Ay.div`
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
`,x=i.Ay.div`
  flex: 1;
  min-width: 0;
`,u=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,g=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,v=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,f=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,y=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,j=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,w=i.Ay.textarea`
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
`,A=i.Ay.div`
  display: flex;
  gap: 4px;
`,k=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,_=i.Ay.button`
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
`,B=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,E=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,S=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,T=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,$=i.Ay.input`
  display: none;
`,I=i.Ay.div`
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
`,N=e=>{let{entityType:n,entityId:r,currentUserId:i,onMarkRead:N}=e;const[P,q]=(0,t.useState)([]),[O,L]=(0,t.useState)(""),[R,U]=(0,t.useState)(!1),[H,M]=(0,t.useState)([]),[W,J]=(0,t.useState)(!1),[Q,K]=(0,t.useState)(""),[Y,Z]=(0,t.useState)(!1),G=(0,t.useRef)(null),V=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${n}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&q(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{r&&(V(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r})}),N&&N(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[n,r]);const X=async()=>{if(W)return;const e=O.trim(),t=H.length>0;if((e||t)&&!Y){Z(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:n,entity_id:r,content:O.trim(),attachments:t?H:void 0,is_internal:R||void 0})})).ok&&(L(""),M([]),U(!1),V())}catch(i){console.error("Error adding comment:",i)}finally{Z(!1)}}},ee=e=>{const n=new Date(e),r=(new Date).getTime()-n.getTime(),t=Math.floor(r/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:n.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,s.jsxs)(l,{children:[(0,s.jsxs)(d,{children:["Comments (",P.length,")"]}),P.length>0?(0,s.jsx)(c,{children:P.map(e=>{var n,r,l;return(0,s.jsxs)(p,{isInternal:e.is_internal,children:[(0,s.jsx)(h,{children:((null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name}),(0,s.jsx)(m,{children:(null===(l=e.author)||void 0===l?void 0:l.role)||e.author_role}),e.is_internal&&(0,s.jsx)(v,{children:"Internal"}),(0,s.jsx)(f,{children:ee(e.createdAt)}),i&&e.author_id===i&&(0,s.jsx)(j,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}})).ok&&V()}catch(n){console.error("Error deleting comment:",n)}})(e.id),children:"Delete"})]}),e.content&&(0,s.jsx)(y,{children:e.content.split("\n").map((e,n)=>(0,s.jsxs)(t.Fragment,{children:[n>0&&(0,s.jsx)("br",{}),(0,a.c)(e)]},n))}),e.attachments&&e.attachments.length>0&&(0,s.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,s.jsx)(C,{children:"No comments yet"}),(0,s.jsxs)(b,{children:[(0,s.jsxs)(F,{children:[(0,s.jsx)(w,{value:O,onChange:e=>L(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),X())},placeholder:R?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,s.jsxs)(A,{children:[(0,s.jsx)(k,{onClick:()=>{var e;return null===(e=G.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,s.jsx)(_,{onClick:X,disabled:!O.trim()&&0===H.length||Y||W,children:"Send"})]})]}),(0,s.jsx)(I,{children:(0,s.jsxs)(D,{children:[(0,s.jsx)("input",{type:"checkbox",checked:R,onChange:e=>U(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(H.length>0||W||Q)&&(0,s.jsxs)(B,{children:[W&&(0,s.jsx)(z,{children:"Uploading..."}),Q&&(0,s.jsx)(T,{children:Q}),H.map((e,n)=>(0,s.jsxs)(E,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,s.jsx)(S,{onClick:()=>(e=>{const n=H[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:n.url})}).catch(()=>{}),M(n=>n.filter((n,r)=>r!==e))})(n),children:"\u2715"})]},e.url))]})]}),(0,s.jsx)($,{ref:G,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const n=e.target.files;if(!n||0===n.length)return;const r=5-H.length,t=Array.from(n).slice(0,r);if(e.target.value="",0!==t.length){J(!0),K("");try{const e=new FormData;t.forEach(n=>e.append("files",n));const n=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${n}`},body:e}),i=await r.json();i.success&&i.data?M(e=>[...e,...i.data]):K(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),K("File upload failed. Please try again.")}finally{J(!1)}}}})]})}},8744:(e,n,r)=>{r.r(n),r.d(n,{default:()=>le});var t=r(9950),i=r(4752),o=r(2853),a=r(8409),s=r(2597),l=r(2653),d=r(6038),c=r(4302),p=r(1367),h=r(4414);const x=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
`,g=i.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`,m=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,v=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,f=i.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,y=i.Ay.select`
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
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=i.Ay.div`
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
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=i.Ay.div`
  flex: 1;
  min-width: 0;
`,A=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
  font-family: monospace;
`,k=i.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,_=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 2px;
`,B=i.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.status){case"new":return"#FEF3C7";case"contacted":return"#DBEAFE";case"confirmed":return"#ECFDF5";case"invoiced":return"#F0F0FF";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"new":return"#D97706";case"contacted":return"#1E40AF";case"confirmed":return"#059669";case"invoiced":return"#635BFF";default:return"#6B7280"}}};
`,E=i.Ay.div`
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
`,S=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,z=i.Ay.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 4px 0;
`,T=i.Ay.div`
  flex: 1;
  min-height: 12px;
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
`,I=i.Ay.button`
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
`,D=i.Ay.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;

  &:first-child {
    margin-top: 0;
  }
`,N=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
`,P=i.Ay.div`
  font-size: 14px;
`,q=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  font-weight: 600;
`,O=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`,L=i.Ay.select`
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
`,R=i.Ay.button`
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
`,U=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  white-space: pre-wrap;
  word-break: break-word;
`,H=i.Ay.div`
  margin-bottom: 20px;
`,M=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,W=i.Ay.textarea`
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
`,J=i.Ay.input`
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
`,Q=i.Ay.select`
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
`,K=i.Ay.div`
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
`,Y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  border-top: 2px solid #E6EBF1;
  margin-top: 8px;
`,Z=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
`,G=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,V=i.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,X=i.Ay.div`
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
`,ee=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,ne=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,re=i.Ay.div`
  padding: 12px 16px;
  background: #F5F3FF;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,te=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`,ie=i.Ay.div`
  flex: 1;
`,oe=["new"],ae=["contacted","confirmed"],se=["invoiced","cancelled"],le=()=>{var e,n,r,i,le,de,ce,pe,he,xe,ue,ge,me,ve,fe,ye,je,be;const{user:Fe}=(0,p.As)(),[we,Ae]=(0,t.useState)([]),[ke,_e]=(0,t.useState)({total:0,new:0,contacted:0,confirmed:0,invoiced:0}),[Ce,Be]=(0,t.useState)(!0),[Ee,Se]=(0,t.useState)(""),[ze,Te]=(0,t.useState)("all"),[$e,Ie]=(0,l.M)("new"),[De,Ne]=(0,t.useState)(!1),[Pe,qe]=(0,t.useState)(null),[Oe,Le]=(0,t.useState)(""),[Re,Ue]=(0,t.useState)(""),[He,Me]=(0,t.useState)(!1),[We,Je]=(0,t.useState)(!1),[Qe,Ke]=(0,t.useState)(!1),[Ye,Ze]=(0,t.useState)(""),[Ge,Ve]=(0,t.useState)([]),[Xe,en]=(0,t.useState)(!1),[nn,rn]=(0,t.useState)(!1),[tn,on]=(0,t.useState)(""),[an,sn]=(0,t.useState)("none"),[ln,dn]=(0,t.useState)(""),[cn,pn]=(0,t.useState)([]),[hn,xn]=(0,t.useState)(!1),[un,gn]=(0,t.useState)(!1),[mn,vn]=(0,t.useState)(""),[fn,yn]=(0,t.useState)("none"),[jn,bn]=(0,t.useState)(""),[Fn,wn]=(0,t.useState)([]),[An,kn]=(0,t.useState)(!1),[_n,Cn]=(0,t.useState)(!1),[Bn,En]=(0,t.useState)(null),Sn=()=>localStorage.getItem("auth_token"),zn=(0,t.useCallback)(async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{e||Be(!0);const n=Sn(),r=new URLSearchParams;"all"!==ze&&r.append("status",ze),Ee&&r.append("search",Ee);const[t,i]=await Promise.all([fetch(`/api/hardware-quotes?${r}`,{headers:{Authorization:`Bearer ${n}`}}),fetch("/api/hardware-quotes/stats",{headers:{Authorization:`Bearer ${n}`}})]);if(t.ok){const e=await t.json();Ae(e.data||e)}if(i.ok){const e=await i.json();_e(e.data||e)}}catch(n){console.error("Error loading hardware quotes:",n)}finally{Be(!1)}},[Ee,ze]);(0,t.useEffect)(()=>{zn()},[zn]),(0,t.useEffect)(()=>{const e=setInterval(()=>zn(!0),1e4);return()=>clearInterval(e)},[zn]);const Tn=we.filter(e=>("new"===$e?oe:"progress"===$e?ae:se).includes(e.status)),$n=we.filter(e=>oe.includes(e.status)).length,In=we.filter(e=>ae.includes(e.status)).length,Dn=we.filter(e=>se.includes(e.status)).length,Nn=async e=>{try{const n=Sn(),r=await fetch(`/api/hardware-quotes/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=e.data||e;qe(n),Le(n.status),Ue(n.admin_notes||""),Ne(!0)}}catch(n){console.error("Error loading quote detail:",n)}},Pn=()=>{Ze(""),Ve([]),Ke(!0)},qn=(0,t.useCallback)(async e=>{if(e.length<2)Ve([]);else{en(!0);try{const n=Sn(),r=await fetch(`/api/users?search=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${n}`}});if(r.ok){const e=await r.json(),n=Array.isArray(e)?e:e.data||[];Ve(n.slice(0,20).map(e=>({id:e.id,full_name:e.full_name,email:e.email,role:e.role})))}}catch(n){console.error("Error searching users:",n)}finally{en(!1)}}},[]);(0,t.useEffect)(()=>{const e=setTimeout(()=>{Ye&&qn(Ye)},300);return()=>clearTimeout(e)},[Ye,qn]);const On=(e,n,r)=>{pn(t=>t.map((t,i)=>i===e?{...t,[n]:r}:t))},Ln=(e,n,r)=>{wn(t=>t.map((t,i)=>i===e?{...t,[n]:r}:t))},Rn=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Un=e=>({new:"New",contacted:"In Progress",confirmed:"Confirmed",invoiced:"Invoiced",cancelled:"Closed"}[e]||e.charAt(0).toUpperCase()+e.slice(1)),Hn=(null===Pe||void 0===Pe?void 0:Pe.currency)||"MYR";return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(a.mc,{children:[(0,h.jsx)(a.Y9,{children:(0,h.jsx)(a.hE,{children:"Hardware Quotes"})}),(0,h.jsxs)(a.UC,{children:[(0,h.jsxs)(x,{children:[(0,h.jsxs)(u,{color:"#635BFF",children:[(0,h.jsx)(g,{children:ke.total}),(0,h.jsx)(m,{children:"Total"})]}),(0,h.jsxs)(u,{color:"#F59E0B",children:[(0,h.jsx)(g,{children:ke.new}),(0,h.jsx)(m,{children:"New"})]}),(0,h.jsxs)(u,{color:"#3B82F6",children:[(0,h.jsx)(g,{children:ke.contacted}),(0,h.jsx)(m,{children:"Contacted"})]}),(0,h.jsxs)(u,{color:"#10B981",children:[(0,h.jsx)(g,{children:ke.confirmed}),(0,h.jsx)(m,{children:"Confirmed"})]}),(0,h.jsxs)(u,{color:"#8B5CF6",children:[(0,h.jsx)(g,{children:ke.invoiced}),(0,h.jsx)(m,{children:"Invoiced"})]})]}),(0,h.jsxs)(s.tU,{children:[(0,h.jsxs)(s.oz,{active:"new"===$e,onClick:()=>Ie("new"),children:["New (",$n,")"]}),(0,h.jsxs)(s.oz,{active:"progress"===$e,onClick:()=>Ie("progress"),children:["In Progress (",In,")"]}),(0,h.jsxs)(s.oz,{active:"closed"===$e,onClick:()=>Ie("closed"),children:["Closed (",Dn,")"]})]}),(0,h.jsxs)(v,{children:[(0,h.jsx)(f,{placeholder:"Search by name, email, company, quote number...",value:Ee,onChange:e=>Se(e.target.value)}),(0,h.jsxs)(y,{value:ze,onChange:e=>Te(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),"new"===$e?(0,h.jsx)("option",{value:"new",children:"New"}):"progress"===$e?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"contacted",children:"Contacted"}),(0,h.jsx)("option",{value:"confirmed",children:"Confirmed"})]}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]})]}),Ce?(0,h.jsx)(o.pp,{children:"Loading..."}):0===Tn.length?(0,h.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280",gridColumn:"1 / -1"},children:[(0,h.jsxs)("h3",{style:{color:"#374151",marginBottom:"8px"},children:["No ","new"===$e?"new":"progress"===$e?"in progress":"closed"," quotes"]}),(0,h.jsx)("p",{children:"Hardware quotes will appear here when submitted."})]}):(0,h.jsx)(j,{children:Tn.map(e=>{var n,r,t,i,o;return(0,h.jsxs)(b,{onClick:()=>Nn(e),children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:e.quote_number}),(0,h.jsx)(k,{children:e.contact_name}),(0,h.jsx)(_,{children:e.contact_email}),e.company_name&&(0,h.jsx)(C,{children:e.company_name})]}),(0,h.jsx)(B,{status:e.status,children:Un(e.status)})]}),(0,h.jsx)(E,{children:(null===(n=e.packageProduct)||void 0===n?void 0:n.name)||(null===(r=e.package_snapshot)||void 0===r?void 0:r.name)||"N/A"}),e.plan_id&&(0,h.jsxs)("span",{style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"4px 10px",borderRadius:"6px",fontSize:"12px",fontWeight:600,background:"#ECFDF5",color:"#059669",marginBottom:"4px"},children:["+ Subscription: ",(null===(t=e.plan_snapshot)||void 0===t?void 0:t.display_name)||"Plan"," (",e.billing_cycle||"monthly",")"]}),e.addon_items&&e.addon_items.length>0&&(0,h.jsx)(S,{children:(o=e.addon_items,o&&0!==o.length?"+ "+o.map(e=>`${e.name} x${e.quantity}`).join(", "):"")}),(0,h.jsx)(z,{children:(0,d.vv)(e.total_amount,e.currency)}),e.invoice_id&&(0,h.jsxs)("div",{style:{marginTop:"8px",display:"flex",alignItems:"center",gap:"6px"},children:[(0,h.jsx)("span",{style:{padding:"3px 8px",fontSize:"11px",fontWeight:600,background:"#ECFDF5",color:"#059669",borderRadius:"4px"},children:"Invoice Created"}),(null===(i=e.invoice)||void 0===i?void 0:i.invoice_number)&&(0,h.jsx)("span",{style:{fontSize:"11px",color:"#6B7280"},children:e.invoice.invoice_number})]}),(0,h.jsx)(T,{}),(0,h.jsxs)($,{children:[(0,h.jsx)("span",{children:Rn(e.created_at)}),"new"===$e&&(0,h.jsx)(I,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=Sn();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"contacted"})})).ok&&(Ae(n=>n.map(n=>n.id===e.id?{...n,status:"contacted"}:n)),zn(!0))}catch(n){console.error("Error starting process:",n)}})(e)},style:{background:"#F0F0FF",color:"#635BFF",borderColor:"#635BFF"},children:"Start Process"}),"progress"===$e&&(0,h.jsx)(I,{onClick:n=>{n.stopPropagation(),(async e=>{try{const n=Sn();(await fetch(`/api/hardware-quotes/${e.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})})).ok&&(Ae(n=>n.map(n=>n.id===e.id?{...n,status:"cancelled"}:n)),zn(!0))}catch(n){console.error("Error closing quote:",n)}})(e)},children:"Close"})]})]},e.id)})})]}),De&&Pe&&(0,h.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ne(!1),title:`Quote ${Pe.quote_number}`,footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(R,{variant:"danger",onClick:()=>Je(!0),children:"Delete"}),(0,h.jsx)("div",{style:{flex:1}}),"invoiced"!==Pe.status&&"cancelled"!==Pe.status&&!Pe.invoice_id&&(Pe.plan_id?(0,h.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),vn(e.toISOString().split("T")[0]),yn("none"),bn(""),wn([]),kn(!1),En(null),Ne(!1),setTimeout(()=>gn(!0),200)})(),children:"Proceed Contract"}):(0,h.jsx)(R,{variant:"primary",onClick:()=>(()=>{const e=new Date;e.setDate(e.getDate()+14),on(e.toISOString().split("T")[0]),sn("none"),dn(""),pn([]),Ne(!1),setTimeout(()=>rn(!0),200)})(),children:"Create Invoice"})),(0,h.jsx)(R,{onClick:()=>Ne(!1),children:"Close"})]}),children:[(0,h.jsx)(D,{style:{marginTop:0},children:"Quote Info"}),(0,h.jsxs)(N,{children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Quote Number"}),(0,h.jsx)(O,{style:{fontFamily:"monospace"},children:Pe.quote_number})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Status"}),(0,h.jsx)(O,{children:(0,h.jsxs)(L,{value:Oe,onChange:e=>(async e=>{if(Pe){Le(e);try{const n=Sn();(await fetch(`/api/hardware-quotes/${Pe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({status:e})})).ok&&(Ae(n=>n.map(n=>n.id===Pe.id?{...n,status:e}:n)),qe(n=>n?{...n,status:e}:null),zn(!0))}catch(n){console.error("Error updating status:",n)}}})(e.target.value),disabled:"invoiced"===Oe,children:[(0,h.jsx)("option",{value:"new",children:"New"}),(0,h.jsx)("option",{value:"contacted",children:"In Progress"}),(0,h.jsx)("option",{value:"confirmed",children:"Confirmed"}),"invoiced"===Oe&&(0,h.jsx)("option",{value:"invoiced",children:"Invoiced"}),(0,h.jsx)("option",{value:"cancelled",children:"Closed"})]})})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Created"}),(0,h.jsx)(O,{children:Rn(Pe.created_at)})]})]}),(0,h.jsx)(D,{children:"Customer Info"}),(0,h.jsxs)(N,{children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Name"}),(0,h.jsx)(O,{children:Pe.contact_name})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Email"}),(0,h.jsx)(O,{children:Pe.contact_email})]}),Pe.contact_phone&&(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Phone"}),(0,h.jsx)(O,{children:Pe.contact_phone})]}),Pe.company_name&&(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Company"}),(0,h.jsx)(O,{children:Pe.company_name})]})]}),(0,h.jsx)(D,{children:"Linked User"}),Pe.user?(0,h.jsxs)(Z,{children:[(0,h.jsxs)(G,{children:[(0,h.jsx)("strong",{children:Pe.user.full_name}),(0,h.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",Pe.user.email,")"]}),(0,h.jsx)("span",{style:{color:"#635BFF",marginLeft:8,fontSize:12},children:Pe.user.role})]}),(0,h.jsx)(R,{onClick:Pn,children:"Change"})]}):(0,h.jsxs)(Z,{style:{background:"#F9FAFB"},children:[(0,h.jsx)(G,{style:{color:"#6B7280"},children:"Not linked"}),(0,h.jsx)(R,{variant:"primary",onClick:Pn,children:"Link User"})]}),(0,h.jsx)(D,{children:"Quote Details"}),(0,h.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:16},children:[(0,h.jsxs)(K,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:(null===(e=Pe.packageProduct)||void 0===e?void 0:e.name)||(null===(n=Pe.package_snapshot)||void 0===n?void 0:n.name)||"N/A"}),(0,h.jsxs)("span",{style:{color:"#6B7280",marginLeft:8},children:["(",(null===(r=Pe.packageProduct)||void 0===r?void 0:r.set_group)||""," - ",(null===(i=Pe.packageProduct)||void 0===i?void 0:i.set_tier)||"",")"]})]}),(0,h.jsx)("div",{style:{fontWeight:600},children:(0,d.vv)(Pe.package_price,Hn)})]}),Pe.addon_items&&Pe.addon_items.length>0&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{style:{fontSize:12,color:"#6B7280",marginTop:12,marginBottom:8,fontWeight:600,textTransform:"uppercase"},children:"Add-ons"}),Pe.addon_items.map((e,n)=>(0,h.jsxs)(K,{children:[(0,h.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,h.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Hn)})]},n))]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)("div",{children:"Total"}),(0,h.jsx)("div",{children:(0,d.vv)(Pe.total_amount,Hn)})]})]}),Pe.plan_id&&Pe.plan_snapshot&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Subscription Plan"}),(0,h.jsx)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:16,borderLeft:"3px solid #059669"},children:(0,h.jsxs)(N,{style:{marginBottom:0},children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Plan"}),(0,h.jsx)(O,{style:{fontWeight:600},children:Pe.plan_snapshot.display_name})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Billing Cycle"}),(0,h.jsx)(O,{style:{textTransform:"capitalize"},children:Pe.billing_cycle||"monthly"})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Monthly Price"}),(0,h.jsxs)(O,{children:[(0,d.vv)((null===(le=Pe.plan_snapshot.currency_prices)||void 0===le||null===(de=le[Hn])||void 0===de?void 0:de.monthly)||Pe.plan_snapshot.base_price_monthly,Hn),"/mo"]})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Annual Price"}),(0,h.jsxs)(O,{children:[(0,d.vv)((null===(ce=Pe.plan_snapshot.currency_prices)||void 0===ce||null===(pe=ce[Hn])||void 0===pe?void 0:pe.annual)||Pe.plan_snapshot.base_price_annual,Hn),"/yr"]})]})]})})]}),Pe.message&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Customer Message"}),(0,h.jsx)(U,{children:Pe.message})]}),(0,h.jsx)(D,{children:"Admin Notes"}),(0,h.jsxs)(H,{style:{marginBottom:0},children:[(0,h.jsx)(W,{value:Re,onChange:e=>Ue(e.target.value),placeholder:"Add internal notes...",style:{minHeight:80}}),(0,h.jsx)("div",{style:{marginTop:8,textAlign:"right"},children:(0,h.jsx)(R,{variant:"primary",onClick:async()=>{if(Pe){Me(!0);try{const e=Sn();(await fetch(`/api/hardware-quotes/${Pe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({admin_notes:Re})})).ok&&qe(e=>e?{...e,admin_notes:Re}:null)}catch(e){console.error("Error saving notes:",e)}finally{Me(!1)}}},disabled:He||Re===(Pe.admin_notes||""),children:He?"Saving...":"Save Notes"})})]}),(0,h.jsx)(c.A,{entityType:"hardware_quote",entityId:String(Pe.id),currentUserId:null!==Fe&&void 0!==Fe&&Fe.id?Number(Fe.id):void 0}),Pe.invoice&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Hardware Invoice"}),(0,h.jsx)(re,{children:(0,h.jsxs)(N,{style:{marginBottom:0},children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Invoice Number"}),(0,h.jsx)(O,{style:{fontFamily:"monospace"},children:Pe.invoice.invoice_number})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Status"}),(0,h.jsx)(O,{children:(0,h.jsx)(B,{status:Pe.invoice.status,children:Un(Pe.invoice.status)})})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Amount"}),(0,h.jsx)(O,{style:{fontWeight:600},children:(0,d.vv)(Pe.invoice.total_amount,Pe.invoice.currency)})]})]})})]}),Pe.subscription_invoice&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Subscription Invoice"}),(0,h.jsx)(re,{style:{borderLeftColor:"#059669"},children:(0,h.jsxs)(N,{style:{marginBottom:0},children:[(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Invoice Number"}),(0,h.jsx)(O,{style:{fontFamily:"monospace"},children:Pe.subscription_invoice.invoice_number})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Status"}),(0,h.jsx)(O,{children:(0,h.jsx)(B,{status:Pe.subscription_invoice.status,children:Un(Pe.subscription_invoice.status)})})]}),(0,h.jsxs)(P,{children:[(0,h.jsx)(q,{children:"Amount"}),(0,h.jsx)(O,{style:{fontWeight:600},children:(0,d.vv)(Pe.subscription_invoice.total_amount,Pe.subscription_invoice.currency)})]})]})})]})]}),Qe&&(0,h.jsxs)(a.aF,{isOpen:!0,onClose:()=>Ke(!1),title:"Link User to Quote",footer:(0,h.jsx)(R,{onClick:()=>Ke(!1),children:"Cancel"}),children:[(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Search users by name or email"}),(0,h.jsx)(J,{value:Ye,onChange:e=>Ze(e.target.value),placeholder:"Type at least 2 characters...",autoFocus:!0})]}),Xe&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"Searching..."}),Ge.length>0&&(0,h.jsx)(V,{children:Ge.map(e=>(0,h.jsxs)(X,{onClick:()=>(async e=>{if(Pe)try{const n=Sn();(await fetch(`/api/hardware-quotes/${Pe.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({user_id:e})})).ok&&(Ke(!1),Nn(Pe))}catch(n){console.error("Error linking user:",n)}})(e.id),children:[(0,h.jsx)(ee,{children:e.full_name}),(0,h.jsxs)(ne,{children:[e.email," - ",e.role]})]},e.id))}),Ye.length>=2&&!Xe&&0===Ge.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:16},children:"No users found"})]}),nn&&Pe&&(0,h.jsxs)(a.aF,{isOpen:!0,onClose:()=>rn(!1),title:"Create Invoice from Quote",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(R,{onClick:()=>rn(!1),children:"Cancel"}),(0,h.jsx)(R,{variant:"primary",onClick:async()=>{if(Pe){xn(!0);try{const e=Sn(),n={due_date:tn};"none"!==an&&ln&&(n.discount_type=an,n.discount_value=parseFloat(ln));const r=cn.filter(e=>e.name&&e.amount);r.length>0&&(n.additional_charges=r.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const t=await fetch(`/api/hardware-quotes/${Pe.id}/invoice`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(t.ok)rn(!1),Ne(!1),zn();else{const e=await t.json();alert(e.message||"Failed to create invoice")}}catch(e){console.error("Error creating invoice:",e)}finally{xn(!1)}}},disabled:hn,children:hn?"Creating...":"Create Invoice"})]}),children:[(0,h.jsx)(D,{style:{marginTop:0},children:"Quote Summary"}),(0,h.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,h.jsxs)(K,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:(null===(he=Pe.packageProduct)||void 0===he?void 0:he.name)||(null===(xe=Pe.package_snapshot)||void 0===xe?void 0:xe.name)||"N/A"})," (",(null===(ue=Pe.packageProduct)||void 0===ue?void 0:ue.set_group)||""," - ",(null===(ge=Pe.packageProduct)||void 0===ge?void 0:ge.set_tier)||"",")"]}),(0,h.jsx)("div",{children:(0,d.vv)(Pe.package_price,Hn)})]}),Pe.addon_items&&Pe.addon_items.map((e,n)=>(0,h.jsxs)(K,{children:[(0,h.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,h.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Hn)})]},n)),(0,h.jsxs)(Y,{children:[(0,h.jsx)("div",{children:"Subtotal"}),(0,h.jsx)("div",{children:(0,d.vv)(Pe.total_amount,Hn)})]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Due Date"}),(0,h.jsx)(J,{type:"date",value:tn,onChange:e=>on(e.target.value)})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Discount"}),(0,h.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,h.jsxs)(Q,{style:{width:"auto",minWidth:150},value:an,onChange:e=>sn(e.target.value),children:[(0,h.jsx)("option",{value:"none",children:"No Discount"}),(0,h.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,h.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==an&&(0,h.jsx)(J,{type:"number",min:"0",step:"0.01",value:ln,onChange:e=>dn(e.target.value),placeholder:"percentage"===an?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Additional Charges"}),cn.map((e,n)=>(0,h.jsxs)(te,{children:[(0,h.jsx)(ie,{children:(0,h.jsx)(J,{value:e.name,onChange:e=>On(n,"name",e.target.value),placeholder:"Charge name"})}),(0,h.jsx)(ie,{children:(0,h.jsx)(J,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>On(n,"amount",e.target.value),placeholder:"Amount"})}),(0,h.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void pn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,h.jsx)(R,{onClick:()=>{pn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,h.jsxs)(Y,{style:{fontSize:18},children:[(0,h.jsx)("div",{children:"Invoice Total"}),(0,h.jsx)("div",{children:(0,d.vv)((()=>{if(!Pe)return 0;let e=Pe.total_amount;return"percentage"===an&&ln?e-=e*(parseFloat(ln)/100):"fixed"===an&&ln&&(e-=parseFloat(ln)),cn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Hn)})]})]}),un&&Pe&&(0,h.jsx)(a.aF,{isOpen:!0,onClose:()=>{gn(!1),En(null)},title:"Proceed Contract",footer:Bn?(0,h.jsx)(R,{onClick:()=>{gn(!1),Ne(!1),En(null),zn()},children:"Close"}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(R,{onClick:()=>gn(!1),children:"Cancel"}),(0,h.jsx)(R,{variant:"primary",onClick:async()=>{if(Pe){Cn(!0);try{const a=Sn(),s={due_date:mn,mark_as_paid:An};"none"!==fn&&jn&&(s.discount_type=fn,s.discount_value=parseFloat(jn));const l=Fn.filter(e=>e.name&&e.amount);l.length>0&&(s.additional_charges=l.map(e=>({name:e.name,amount:parseFloat(e.amount)})));const d=await fetch(`/api/hardware-quotes/${Pe.id}/proceed`,{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify(s)});if(d.ok){var e,n,r,t,i,o;const a=await d.json();En({hardware_invoice:(null===(e=a.data)||void 0===e||null===(n=e.hardware_invoice)||void 0===n?void 0:n.invoice_number)||(null===(r=a.hardware_invoice)||void 0===r?void 0:r.invoice_number),subscription_invoice:(null===(t=a.data)||void 0===t||null===(i=t.subscription_invoice)||void 0===i?void 0:i.invoice_number)||(null===(o=a.subscription_invoice)||void 0===o?void 0:o.invoice_number)}),zn(!0)}else{const e=await d.json();alert(e.message||"Failed to proceed contract")}}catch(a){console.error("Error proceeding contract:",a)}finally{Cn(!1)}}},disabled:_n||!Pe.user_id,children:_n?"Processing...":"Proceed Contract"})]}),children:Bn?(0,h.jsxs)("div",{style:{background:"#ECFDF5",border:"1px solid #10B981",borderRadius:8,padding:24,textAlign:"center",color:"#065F46",lineHeight:1.6},children:[(0,h.jsx)("div",{style:{fontSize:18,fontWeight:700,marginBottom:12},children:"Contract Created Successfully"}),Bn.hardware_invoice&&(0,h.jsxs)("div",{children:["Hardware Invoice: ",(0,h.jsx)("strong",{style:{fontFamily:"monospace"},children:Bn.hardware_invoice})]}),Bn.subscription_invoice&&(0,h.jsxs)("div",{children:["Subscription Invoice: ",(0,h.jsx)("strong",{style:{fontFamily:"monospace"},children:Bn.subscription_invoice})]})]}):(0,h.jsxs)(h.Fragment,{children:[!Pe.user_id&&(0,h.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:8,padding:12,marginBottom:16,fontSize:13,color:"#92400E"},children:"A linked user is required to proceed. Please link a user first."}),(0,h.jsx)(D,{style:{marginTop:0},children:"Hardware"}),(0,h.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:8,padding:16,marginBottom:20},children:[(0,h.jsxs)(K,{children:[(0,h.jsx)("div",{children:(0,h.jsx)("strong",{children:(null===(me=Pe.packageProduct)||void 0===me?void 0:me.name)||(null===(ve=Pe.package_snapshot)||void 0===ve?void 0:ve.name)||"N/A"})}),(0,h.jsx)("div",{children:(0,d.vv)(Pe.package_price,Hn)})]}),Pe.addon_items&&Pe.addon_items.map((e,n)=>(0,h.jsxs)(K,{children:[(0,h.jsxs)("div",{children:[e.name," x ",e.quantity]}),(0,h.jsx)("div",{children:(0,d.vv)(e.subtotal||e.total_price||e.unit_price*e.quantity,Hn)})]},n)),(0,h.jsxs)(Y,{children:[(0,h.jsx)("div",{children:"Hardware Subtotal"}),(0,h.jsx)("div",{children:(0,d.vv)(Pe.total_amount,Hn)})]})]}),Pe.plan_snapshot&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Subscription Plan"}),(0,h.jsxs)("div",{style:{background:"#ECFDF5",borderRadius:8,padding:16,marginBottom:20,borderLeft:"3px solid #059669"},children:[(0,h.jsx)("div",{style:{fontWeight:600,fontSize:14,color:"#0A2540",marginBottom:4},children:Pe.plan_snapshot.display_name}),(0,h.jsxs)("div",{style:{fontSize:13,color:"#6B7280"},children:["annual"===Pe.billing_cycle?"Annual":"Monthly"," billing -"," ",(0,d.vv)("annual"===Pe.billing_cycle?(null===(fe=Pe.plan_snapshot.currency_prices)||void 0===fe||null===(ye=fe[Hn])||void 0===ye?void 0:ye.annual)||Pe.plan_snapshot.base_price_annual:(null===(je=Pe.plan_snapshot.currency_prices)||void 0===je||null===(be=je[Hn])||void 0===be?void 0:be.monthly)||Pe.plan_snapshot.base_price_monthly,Hn),"annual"===Pe.billing_cycle?"/yr":"/mo"]})]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Due Date"}),(0,h.jsx)(J,{type:"date",value:mn,onChange:e=>vn(e.target.value)})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Hardware Discount"}),(0,h.jsxs)("div",{style:{display:"flex",gap:12},children:[(0,h.jsxs)(Q,{style:{width:"auto",minWidth:150},value:fn,onChange:e=>yn(e.target.value),children:[(0,h.jsx)("option",{value:"none",children:"No Discount"}),(0,h.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,h.jsx)("option",{value:"fixed",children:"Fixed Amount"})]}),"none"!==fn&&(0,h.jsx)(J,{type:"number",min:"0",step:"0.01",value:jn,onChange:e=>bn(e.target.value),placeholder:"percentage"===fn?"e.g. 10":"e.g. 50.00",style:{width:150}})]})]}),(0,h.jsxs)(H,{children:[(0,h.jsx)(M,{children:"Additional Charges"}),Fn.map((e,n)=>(0,h.jsxs)(te,{children:[(0,h.jsx)(ie,{children:(0,h.jsx)(J,{value:e.name,onChange:e=>Ln(n,"name",e.target.value),placeholder:"Charge name"})}),(0,h.jsx)(ie,{children:(0,h.jsx)(J,{type:"number",min:"0",step:"0.01",value:e.amount,onChange:e=>Ln(n,"amount",e.target.value),placeholder:"Amount"})}),(0,h.jsx)(R,{variant:"danger",onClick:()=>{return e=n,void wn(n=>n.filter((n,r)=>r!==e));var e},style:{flexShrink:0},children:"Remove"})]},n)),(0,h.jsx)(R,{onClick:()=>{wn(e=>[...e,{name:"",amount:""}])},style:{marginTop:8},children:"+ Add Charge"})]}),(0,h.jsx)(H,{children:(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer",fontSize:"14px",color:"#374151"},children:[(0,h.jsx)("input",{type:"checkbox",checked:An,onChange:e=>kn(e.target.checked),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),"Mark hardware invoice as paid"]})}),(0,h.jsxs)(Y,{style:{fontSize:18},children:[(0,h.jsx)("div",{children:"Hardware Invoice Total"}),(0,h.jsx)("div",{children:(0,d.vv)((()=>{if(!Pe)return 0;let e=Pe.total_amount;return"percentage"===fn&&jn?e-=e*(parseFloat(jn)/100):"fixed"===fn&&jn&&(e-=parseFloat(jn)),Fn.forEach(n=>{n.amount&&(e+=parseFloat(n.amount))}),Math.max(0,e)})(),Hn)})]})]})}),We&&(0,h.jsx)(a.aF,{isOpen:!0,onClose:()=>Je(!1),title:"Confirm Delete",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(R,{onClick:()=>Je(!1),children:"Cancel"}),(0,h.jsx)(R,{variant:"danger",onClick:async()=>{if(Pe)try{const e=Sn();await fetch(`/api/hardware-quotes/${Pe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),Je(!1),Ne(!1),zn()}catch(e){console.error("Error deleting quote:",e)}},children:"Delete"})]}),children:(0,h.jsxs)("p",{style:{margin:0,color:"#374151",fontSize:"14px"},children:["Are you sure you want to delete quote ",(0,h.jsx)("strong",{children:null===Pe||void 0===Pe?void 0:Pe.quote_number}),"? This action cannot be undone."]})})]})})}},9061:(e,n,r)=>{r.d(n,{c:()=>a});var t=r(9950),i=r(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const n=e.split(o);return 1===n.length?e:n.map((e,n)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},n):(0,i.jsx)(t.Fragment,{children:e},n))}}}]);