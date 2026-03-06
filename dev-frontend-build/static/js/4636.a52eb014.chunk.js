"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,o=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=n.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,d=n.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,c=e=>{let{children:t,className:r,style:n,...o}=e;return(0,i.jsx)(a,{className:r,style:n,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:n,style:a,...l}=e;return(0,i.jsxs)(s,{style:a,children:[(0,i.jsx)(o,{placeholder:t,value:r,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...l}),r&&(0,i.jsx)(d,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,i.jsx)(l,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,o=n.Ay.button`
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
`,d=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(o,{active:t,onClick:r,className:a,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ne});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(3832),d=r(5665),l=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(9061),m=r(7617),y=r(4414);const b=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,j=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,F=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,A=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,C=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,E=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,_=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,S=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,N=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,$=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,D=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1100;
  overflow-y: auto;
  padding: 40px 0;
`,T=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
  margin: auto 0;
`,O=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,I=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,U=i.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`,L=i.Ay.div`
  padding: 24px;
`,R=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,G=i.Ay.div`
  margin-bottom: 20px;
`,W=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,M=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Y=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=i.Ay.select`
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
`,J=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Z=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,H=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,Q=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,K=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,V=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,X=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,ee=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,te=i.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,re=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,ne=()=>{var e,t,r;const{user:i}=(0,o.As)(),[ne,ie]=(0,p.M)("received"),[ae,oe]=(0,n.useState)([]),[se,de]=(0,n.useState)([]),[le,ce]=(0,n.useState)(null),[pe,xe]=(0,n.useState)(""),[he,ue]=(0,n.useState)(""),[ge,me]=(0,n.useState)("all"),[ye,be]=(0,n.useState)("all"),[fe,je]=(0,n.useState)(!1),[ve,we]=(0,n.useState)(!1),[Fe,Ae]=(0,n.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[ke,Ce]=(0,n.useState)(!1),[Ee,_e]=(0,n.useState)([]),[Be,Se]=(0,n.useState)(!1),[ze,Ne]=(0,n.useState)(null),[$e,De]=(0,n.useState)({}),[Te,Oe]=(0,n.useState)(!1),[Ie,Ue]=(0,n.useState)(null),Le=(0,n.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Re=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),De(e=>({...e,...t}))}}}catch(t){}},Ge=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Le()});if(e.ok){const t=await e.json();ce(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[Le]),We=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Le()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];oe(n),Re(n)}}catch(e){console.error("Error fetching received notices:",e)}},[Le]),Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Le()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];de(n),Re(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[Le]),Ye=(0,n.useCallback)(async()=>{je(!0),await Promise.all([Ge(),We(),Me()]),je(!1)},[Ge,We,Me]);(0,n.useEffect)(()=>{i&&Ye()},[i,Ye]);const Pe=async e=>{Ne(e),Se(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:Le()});if(t.ok){const e=await t.json(),r=e.data||e;Ne(r),We(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Je=("received"===ne?ae:se).filter(e=>{const t=!pe||e.title.toLowerCase().includes(pe.toLowerCase())||e.content.toLowerCase().includes(pe.toLowerCase()),r=!he||e.priority===he,n="all"===ge||(e.category||"general")===ge,i="all"===ye||"sent"===ne||e.author_role===ye;return t&&r&&n&&i}),Ze=ae.length,He=ae.filter(e=>!e.read_at).length,Qe=ae.filter(e=>"important"===e.priority).length,qe=ae.filter(e=>"urgent"===e.priority).length,Ke=se.length,Ve=se.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Xe=se.filter(e=>"important"===e.priority).length,et=se.filter(e=>"urgent"===e.priority).length,tt=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},rt=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,nt=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,y.jsxs)(s.mc,{children:[(0,y.jsxs)(s.Y9,{children:[(0,y.jsx)(s.hE,{children:"Notices"}),(0,y.jsx)(s.ex,{children:(0,y.jsx)(s.$n,{variant:"primary",onClick:()=>{Ae({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),_e([]),we(!0)},children:"New Notice"})})]}),(0,y.jsxs)(s.UC,{children:[(0,y.jsxs)(l.tU,{children:[(0,y.jsxs)(l.oz,{active:"received"===ne,onClick:()=>ie("received"),children:["Received",(0,y.jsx)(l.Ex,{count:Ze,showZero:!0})]}),(0,y.jsxs)(l.oz,{active:"sent"===ne,onClick:()=>ie("sent"),children:["Sent",(0,y.jsx)(l.Ex,{count:Ke,showZero:!0})]})]}),"received"===ne?(0,y.jsxs)(d.MD,{children:[(0,y.jsxs)(d.hI,{color:"#635BFF",children:[(0,y.jsx)(d.Os,{children:Ze}),(0,y.jsx)(d.v0,{children:"Total Received"})]}),(0,y.jsxs)(d.hI,{color:"#F59E0B",children:[(0,y.jsx)(d.Os,{children:He}),(0,y.jsx)(d.v0,{children:"Unread"})]}),(0,y.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,y.jsx)(d.Os,{children:Qe}),(0,y.jsx)(d.v0,{children:"Important"})]}),(0,y.jsxs)(d.hI,{color:"#EF4444",children:[(0,y.jsx)(d.Os,{children:qe}),(0,y.jsx)(d.v0,{children:"Urgent"})]})]}):(0,y.jsxs)(d.MD,{children:[(0,y.jsxs)(d.hI,{color:"#635BFF",children:[(0,y.jsx)(d.Os,{children:Ke}),(0,y.jsx)(d.v0,{children:"Total Sent"})]}),(0,y.jsxs)(d.hI,{color:"#10B981",children:[(0,y.jsx)(d.Os,{children:Ve}),(0,y.jsx)(d.v0,{children:"This Month"})]}),(0,y.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,y.jsx)(d.Os,{children:Xe}),(0,y.jsx)(d.v0,{children:"Important"})]}),(0,y.jsxs)(d.hI,{color:"#EF4444",children:[(0,y.jsx)(d.Os,{children:et}),(0,y.jsx)(d.v0,{children:"Urgent"})]})]}),(0,y.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,y.jsx)("button",{onClick:()=>me(e),style:{padding:"6px 16px",borderRadius:"20px",border:ge===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ge===e?"#F0EFFF":"white",color:ge===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ge===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,y.jsxs)(b,{children:[(0,y.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:pe,onChange:e=>xe(e.target.value)}),"received"===ne&&(0,y.jsxs)(c.Jt,{value:ye,onChange:e=>be(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:"All Senders"}),(0,y.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,y.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,y.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,y.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,y.jsxs)(c.Jt,{value:he,onChange:e=>ue(e.target.value),children:[(0,y.jsx)("option",{value:"",children:"All Priorities"}),(0,y.jsx)("option",{value:"normal",children:"Normal"}),(0,y.jsx)("option",{value:"important",children:"Important"}),(0,y.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,y.jsxs)(f,{children:[fe&&0===Je.length&&(0,y.jsx)(a.pp,{children:(0,y.jsx)("p",{children:"Loading notices..."})}),!fe&&0===Je.length&&(0,y.jsxs)(a.pp,{children:[(0,y.jsx)("h3",{children:"No notices found"}),(0,y.jsx)("p",{children:"received"===ne?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Je.map(e=>{var t,r;return(0,y.jsxs)(j,{unread:"received"===ne&&!e.read_at,onClick:()=>Pe(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,y.jsxs)(v,{children:[(0,y.jsxs)(w,{children:["received"===ne&&!e.read_at&&(0,y.jsx)(F,{}),(0,y.jsx)(A,{children:e.title})]}),(0,y.jsxs)(k,{children:["guide"===e.category&&(0,y.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,y.jsx)(C,{priority:e.priority,children:e.priority})]})]}),(0,y.jsx)(_,{children:e.content}),(0,y.jsxs)(B,{children:[(0,y.jsx)(S,{children:"received"===ne?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(N,{children:[e.author_name||"Unknown",(0,y.jsx)(E,{children:e.author_role||"Admin"})]})}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(N,{children:["To: ",tt(e)]}),(0,y.jsxs)(N,{children:[rt(e),"/",nt(e)," read"]})]})}),(0,y.jsxs)(z,{children:[e.commentCount>0&&(0,y.jsxs)($,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=$e[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,y.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[$e[String(e.id)].unread_count," new"]})]}),(0,y.jsx)(N,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ve&&(0,y.jsx)(D,{onClick:()=>we(!1),children:(0,y.jsxs)(T,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(I,{children:"New Notice"}),(0,y.jsx)(U,{onClick:()=>we(!1),children:"\xd7"})]}),(0,y.jsxs)(L,{children:[(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Title *"}),(0,y.jsx)(M,{type:"text",placeholder:"Enter notice title",value:Fe.title,onChange:e=>Ae({...Fe,title:e.target.value})})]}),(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Content *"}),(0,y.jsx)(Y,{placeholder:"Enter notice content...",value:Fe.content,onChange:e=>Ae({...Fe,content:e.target.value})})]}),(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Attachments"}),(0,y.jsx)(x.A,{files:Ee,onChange:_e,maxFiles:5})]}),(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Target Type *"}),(0,y.jsxs)(P,{value:Fe.target_type,onChange:e=>Ae({...Fe,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,y.jsx)("option",{value:"",children:"Select target..."}),(null===le||void 0===le||null===(e=le.targetOptions)||void 0===e?void 0:e.map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("option",{value:"brand",children:"By Brand"}),(0,y.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),"brand"===Fe.target_type&&(null===le||void 0===le?void 0:le.brands)&&(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Select Brand *"}),(0,y.jsxs)(P,{value:Fe.brand_id,onChange:e=>Ae({...Fe,brand_id:e.target.value}),children:[(0,y.jsx)("option",{value:"",children:"Choose a brand..."}),le.brands.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===Fe.target_type&&(null===le||void 0===le?void 0:le.restaurants)&&(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Select Restaurants *"}),(0,y.jsxs)(Z,{children:[le.restaurants.map(e=>(0,y.jsxs)(H,{children:[(0,y.jsx)("input",{type:"checkbox",checked:Fe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void Ae(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===le.restaurants.length&&(0,y.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,y.jsxs)(Q,{children:[Fe.restaurant_ids.length," restaurant",1!==Fe.restaurant_ids.length?"s":""," selected"]})]}),(0,y.jsxs)(J,{children:[(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Category"}),(0,y.jsxs)(P,{value:Fe.category,onChange:e=>Ae({...Fe,category:e.target.value}),children:[(0,y.jsx)("option",{value:"general",children:"General"}),(0,y.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,y.jsxs)(G,{children:[(0,y.jsx)(W,{children:"Priority"}),(0,y.jsxs)(P,{value:Fe.priority,onChange:e=>Ae({...Fe,priority:e.target.value}),children:[(0,y.jsx)("option",{value:"normal",children:"Normal"}),(0,y.jsx)("option",{value:"important",children:"Important"}),(0,y.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,y.jsxs)(R,{children:[(0,y.jsx)(s.$n,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,y.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(Fe.title.trim()&&Fe.content.trim()&&Fe.target_type){Ce(!0);try{const e={title:Fe.title.trim(),content:Fe.content.trim(),target_type:Fe.target_type,priority:Fe.priority,category:Fe.category,attachments:Ee.length>0?Ee:void 0};"brand"===Fe.target_type&&Fe.brand_id&&(e.brand_id=Number(Fe.brand_id)),"select_restaurants"===Fe.target_type&&Fe.restaurant_ids.length>0&&(e.restaurant_ids=Fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Le(),body:JSON.stringify(e)})).ok&&(we(!1),_e([]),ie("sent"),Me())}catch(e){console.error("Error creating notice:",e)}finally{Ce(!1)}}},disabled:ke||!Fe.title.trim()||!Fe.content.trim()||!Fe.target_type||"brand"===Fe.target_type&&!Fe.brand_id||"select_restaurants"===Fe.target_type&&0===Fe.restaurant_ids.length,children:ke?"Sending...":"Send Notice"})]})]})}),Be&&ze&&(0,y.jsx)(D,{onClick:()=>{Se(!1),Ne(null)},children:(0,y.jsxs)(T,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(I,{children:ze.title}),(0,y.jsxs)(re,{children:[(0,y.jsx)(C,{priority:ze.priority,children:ze.priority}),(at=ze,String(at.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,y.jsx)(te,{onClick:()=>{return e=ze.id,Ue(e),void Oe(!0);var e},children:"Delete"})),(0,y.jsx)(U,{onClick:()=>{Se(!1),Ne(null)},children:"\xd7"})]})]}),(0,y.jsxs)(L,{children:[(0,y.jsxs)(K,{children:[(0,y.jsxs)(V,{children:[(0,y.jsx)(X,{children:"From"}),(0,y.jsxs)(ee,{children:[ze.author_name||(null===(t=ze.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",ze.author_role||(null===(r=ze.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(X,{children:"To"}),(0,y.jsx)(ee,{children:tt(ze)})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(X,{children:"Date"}),(0,y.jsx)(ee,{children:(it=ze.createdAt,new Date(it).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),ze.recipients&&ze.recipients.length>0&&(0,y.jsxs)(V,{children:[(0,y.jsx)(X,{children:"Read Status"}),(0,y.jsxs)(ee,{children:[rt(ze),"/",nt(ze)," read"]})]})]}),(0,y.jsx)(q,{children:ze.content.split("\n").map((e,t)=>(0,y.jsxs)(n.Fragment,{children:[t>0&&(0,y.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===ze||void 0===ze?void 0:ze.attachments)&&ze.attachments.length>0&&(0,y.jsx)(h.A,{attachments:ze.attachments}),(0,y.jsx)(u.A,{entityType:"notice",entityId:String(ze.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>De(e=>{const t={...e},r=String(ze.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})}),(0,y.jsx)(m.A,{isOpen:Te,title:"Delete Notice",message:"Are you sure you want to delete this notice?",onConfirm:async()=>{if(Ie){Oe(!1);try{(await fetch(`/api/notices/${Ie}`,{method:"DELETE",headers:Le()})).ok&&(Se(!1),Ne(null),Me(),We())}catch(e){console.error("Error deleting notice:",e)}finally{Ue(null)}}},onCancel:()=>{Oe(!1),Ue(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]});var it,at}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var n=r(4752),i=r(9610),a=r(4414);const o=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:t,title:r,message:n,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:r}),(0,a.jsx)(l,{children:n})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);