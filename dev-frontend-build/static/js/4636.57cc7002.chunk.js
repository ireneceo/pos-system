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
`,l=n.Ay.button`
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
`,d=n.Ay.select`
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
`,c=e=>{let{children:t,className:r,style:n,...o}=e;return(0,i.jsx)(a,{className:r,style:n,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:n,style:a,...d}=e;return(0,i.jsxs)(s,{style:a,children:[(0,i.jsx)(o,{placeholder:t,value:r,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,i.jsx)(l,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,i.jsx)(d,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(o,{active:t,onClick:r,className:a,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>K});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(3832),l=r(5665),d=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(9061),m=r(7617),y=r(8409),b=r(4414);const v=i.Ay.div`
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
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,F=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,A=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,C=i.Ay.div`
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
`,_=i.Ay.span`
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
`,B=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,S=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,N=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,D=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,$=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,O=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,I=i.Ay.input`
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
`,U=i.Ay.textarea`
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
`,L=i.Ay.select`
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
`,R=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,G=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,M=i.Ay.label`
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
`,Y=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,W=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,P=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,J=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Z=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,H=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,Q=i.Ay.button`
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
`,q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,K=()=>{var e,t,r;const{user:i}=(0,o.As)(),[K,V]=(0,p.M)("received"),[X,ee]=(0,n.useState)([]),[te,re]=(0,n.useState)([]),[ne,ie]=(0,n.useState)(null),[ae,oe]=(0,n.useState)(""),[se,le]=(0,n.useState)(""),[de,ce]=(0,n.useState)("all"),[pe,xe]=(0,n.useState)("all"),[he,ue]=(0,n.useState)(!1),[ge,me]=(0,n.useState)(!1),[ye,be]=(0,n.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[ve,fe]=(0,n.useState)(!1),[je,we]=(0,n.useState)([]),[Fe,Ae]=(0,n.useState)(!1),[Ce,ke]=(0,n.useState)(null),[_e,Ee]=(0,n.useState)({}),[Be,Se]=(0,n.useState)(!1),[ze,Ne]=(0,n.useState)(null),De=(0,n.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),$e=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ee(e=>({...e,...t}))}}}catch(t){}},Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:De()});if(e.ok){const t=await e.json();ie(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[De]),Te=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:De()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];ee(n),$e(n)}}catch(e){console.error("Error fetching received notices:",e)}},[De]),Ie=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:De()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];re(n),$e(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[De]),Ue=(0,n.useCallback)(async()=>{ue(!0),await Promise.all([Oe(),Te(),Ie()]),ue(!1)},[Oe,Te,Ie]);(0,n.useEffect)(()=>{i&&Ue()},[i,Ue]);const Le=async e=>{ke(e),Ae(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:De()});if(t.ok){const e=await t.json(),r=e.data||e;ke(r),Te(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Re=("received"===K?X:te).filter(e=>{const t=!ae||e.title.toLowerCase().includes(ae.toLowerCase())||e.content.toLowerCase().includes(ae.toLowerCase()),r=!se||e.priority===se,n="all"===de||(e.category||"general")===de,i="all"===pe||"sent"===K||e.author_role===pe;return t&&r&&n&&i}),Ge=X.length,Me=X.filter(e=>!e.read_at).length,Ye=X.filter(e=>"important"===e.priority).length,We=X.filter(e=>"urgent"===e.priority).length,Pe=te.length,Je=te.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Ze=te.filter(e=>"important"===e.priority).length,He=te.filter(e=>"urgent"===e.priority).length,Qe=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},qe=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Ke=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,b.jsxs)(s.mc,{children:[(0,b.jsxs)(s.Y9,{children:[(0,b.jsx)(s.hE,{children:"Notices"}),(0,b.jsx)(s.ex,{children:(0,b.jsx)(s.$n,{variant:"primary",onClick:()=>{be({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),we([]),me(!0)},children:"New Notice"})})]}),(0,b.jsxs)(s.UC,{children:[(0,b.jsxs)(d.tU,{children:[(0,b.jsxs)(d.oz,{active:"received"===K,onClick:()=>V("received"),children:["Received",(0,b.jsx)(d.Ex,{count:Ge,showZero:!0})]}),(0,b.jsxs)(d.oz,{active:"sent"===K,onClick:()=>V("sent"),children:["Sent",(0,b.jsx)(d.Ex,{count:Pe,showZero:!0})]})]}),"received"===K?(0,b.jsxs)(l.MD,{children:[(0,b.jsxs)(l.hI,{color:"#635BFF",children:[(0,b.jsx)(l.Os,{children:Ge}),(0,b.jsx)(l.v0,{children:"Total Received"})]}),(0,b.jsxs)(l.hI,{color:"#F59E0B",children:[(0,b.jsx)(l.Os,{children:Me}),(0,b.jsx)(l.v0,{children:"Unread"})]}),(0,b.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,b.jsx)(l.Os,{children:Ye}),(0,b.jsx)(l.v0,{children:"Important"})]}),(0,b.jsxs)(l.hI,{color:"#EF4444",children:[(0,b.jsx)(l.Os,{children:We}),(0,b.jsx)(l.v0,{children:"Urgent"})]})]}):(0,b.jsxs)(l.MD,{children:[(0,b.jsxs)(l.hI,{color:"#635BFF",children:[(0,b.jsx)(l.Os,{children:Pe}),(0,b.jsx)(l.v0,{children:"Total Sent"})]}),(0,b.jsxs)(l.hI,{color:"#10B981",children:[(0,b.jsx)(l.Os,{children:Je}),(0,b.jsx)(l.v0,{children:"This Month"})]}),(0,b.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,b.jsx)(l.Os,{children:Ze}),(0,b.jsx)(l.v0,{children:"Important"})]}),(0,b.jsxs)(l.hI,{color:"#EF4444",children:[(0,b.jsx)(l.Os,{children:He}),(0,b.jsx)(l.v0,{children:"Urgent"})]})]}),(0,b.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,b.jsx)("button",{onClick:()=>ce(e),style:{padding:"6px 16px",borderRadius:"20px",border:de===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:de===e?"#F0EFFF":"white",color:de===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:de===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,b.jsxs)(v,{children:[(0,b.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:ae,onChange:e=>oe(e.target.value)}),"received"===K&&(0,b.jsxs)(c.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,b.jsx)("option",{value:"all",children:"All Senders"}),(0,b.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,b.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,b.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,b.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,b.jsxs)(c.Jt,{value:se,onChange:e=>le(e.target.value),children:[(0,b.jsx)("option",{value:"",children:"All Priorities"}),(0,b.jsx)("option",{value:"normal",children:"Normal"}),(0,b.jsx)("option",{value:"important",children:"Important"}),(0,b.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,b.jsxs)(f,{children:[he&&0===Re.length&&(0,b.jsx)(a.pp,{children:(0,b.jsx)("p",{children:"Loading notices..."})}),!he&&0===Re.length&&(0,b.jsxs)(a.pp,{children:[(0,b.jsx)("h3",{children:"No notices found"}),(0,b.jsx)("p",{children:"received"===K?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Re.map(e=>{var t,r;return(0,b.jsxs)(j,{unread:"received"===K&&!e.read_at,onClick:()=>Le(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(F,{children:["received"===K&&!e.read_at&&(0,b.jsx)(A,{}),(0,b.jsx)(C,{children:e.title})]}),(0,b.jsxs)(k,{children:["guide"===e.category&&(0,b.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,b.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,b.jsx)(B,{children:e.content}),(0,b.jsxs)(S,{children:[(0,b.jsx)(z,{children:"received"===K?(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(D,{children:[e.author_name||"Unknown",(0,b.jsx)(E,{children:e.author_role||"Admin"})]})}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(D,{children:["To: ",Qe(e)]}),(0,b.jsxs)(D,{children:[qe(e),"/",Ke(e)," read"]})]})}),(0,b.jsxs)(N,{children:[e.commentCount>0&&(0,b.jsxs)($,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=_e[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,b.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[_e[String(e.id)].unread_count," new"]})]}),(0,b.jsx)(D,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ge&&(0,b.jsxs)(y.aF,{isOpen:!0,onClose:()=>me(!1),title:"New Notice",maxWidth:"720px",footer:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s.$n,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,b.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(ye.title.trim()&&ye.content.trim()&&ye.target_type){fe(!0);try{const e={title:ye.title.trim(),content:ye.content.trim(),target_type:ye.target_type,priority:ye.priority,category:ye.category,attachments:je.length>0?je:void 0};"brand"===ye.target_type&&ye.brand_id&&(e.brand_id=Number(ye.brand_id)),"select_restaurants"===ye.target_type&&ye.restaurant_ids.length>0&&(e.restaurant_ids=ye.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:De(),body:JSON.stringify(e)})).ok&&(me(!1),we([]),V("sent"),Ie())}catch(e){console.error("Error creating notice:",e)}finally{fe(!1)}}},disabled:ve||!ye.title.trim()||!ye.content.trim()||!ye.target_type||"brand"===ye.target_type&&!ye.brand_id||"select_restaurants"===ye.target_type&&0===ye.restaurant_ids.length,children:ve?"Sending...":"Send Notice"})]}),children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Title *"}),(0,b.jsx)(I,{type:"text",placeholder:"Enter notice title",value:ye.title,onChange:e=>be({...ye,title:e.target.value})})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Content *"}),(0,b.jsx)(U,{placeholder:"Enter notice content...",value:ye.content,onChange:e=>be({...ye,content:e.target.value})})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Attachments"}),(0,b.jsx)(x.A,{files:je,onChange:we,maxFiles:5})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Target Type *"}),(0,b.jsxs)(L,{value:ye.target_type,onChange:e=>be({...ye,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,b.jsx)("option",{value:"",children:"Select target..."}),(null===ne||void 0===ne||null===(e=ne.targetOptions)||void 0===e?void 0:e.map(e=>(0,b.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("option",{value:"brand",children:"By Brand"}),(0,b.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),"brand"===ye.target_type&&(null===ne||void 0===ne?void 0:ne.brands)&&(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Select Brand *"}),(0,b.jsxs)(L,{value:ye.brand_id,onChange:e=>be({...ye,brand_id:e.target.value}),children:[(0,b.jsx)("option",{value:"",children:"Choose a brand..."}),ne.brands.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===ye.target_type&&(null===ne||void 0===ne?void 0:ne.restaurants)&&(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Select Restaurants *"}),(0,b.jsxs)(G,{children:[ne.restaurants.map(e=>(0,b.jsxs)(M,{children:[(0,b.jsx)("input",{type:"checkbox",checked:ye.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void be(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===ne.restaurants.length&&(0,b.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,b.jsxs)(Y,{children:[ye.restaurant_ids.length," restaurant",1!==ye.restaurant_ids.length?"s":""," selected"]})]}),(0,b.jsxs)(R,{children:[(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Category"}),(0,b.jsxs)(L,{value:ye.category,onChange:e=>be({...ye,category:e.target.value}),children:[(0,b.jsx)("option",{value:"general",children:"General"}),(0,b.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,b.jsxs)(O,{children:[(0,b.jsx)(T,{children:"Priority"}),(0,b.jsxs)(L,{value:ye.priority,onChange:e=>be({...ye,priority:e.target.value}),children:[(0,b.jsx)("option",{value:"normal",children:"Normal"}),(0,b.jsx)("option",{value:"important",children:"Important"}),(0,b.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),Fe&&Ce&&(0,b.jsxs)(y.aF,{isOpen:!0,onClose:()=>{Ae(!1),ke(null)},title:Ce.title,size:"large",headerActions:(0,b.jsxs)(q,{children:[(0,b.jsx)(_,{priority:Ce.priority,children:Ce.priority}),(Xe=Ce,String(Xe.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,b.jsx)(Q,{onClick:()=>{return e=Ce.id,Ne(e),void Se(!0);var e},children:"Delete"}))]}),children:[(0,b.jsxs)(P,{children:[(0,b.jsxs)(J,{children:[(0,b.jsx)(Z,{children:"From"}),(0,b.jsxs)(H,{children:[Ce.author_name||(null===(t=Ce.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",Ce.author_role||(null===(r=Ce.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,b.jsxs)(J,{children:[(0,b.jsx)(Z,{children:"To"}),(0,b.jsx)(H,{children:Qe(Ce)})]}),(0,b.jsxs)(J,{children:[(0,b.jsx)(Z,{children:"Date"}),(0,b.jsx)(H,{children:(Ve=Ce.createdAt,new Date(Ve).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),Ce.recipients&&Ce.recipients.length>0&&(0,b.jsxs)(J,{children:[(0,b.jsx)(Z,{children:"Read Status"}),(0,b.jsxs)(H,{children:[qe(Ce),"/",Ke(Ce)," read"]})]})]}),(0,b.jsx)(W,{children:Ce.content.split("\n").map((e,t)=>(0,b.jsxs)(n.Fragment,{children:[t>0&&(0,b.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===Ce||void 0===Ce?void 0:Ce.attachments)&&Ce.attachments.length>0&&(0,b.jsx)(h.A,{attachments:Ce.attachments}),(0,b.jsx)(u.A,{entityType:"notice",entityId:String(Ce.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>Ee(e=>{const t={...e},r=String(Ce.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),(0,b.jsx)(m.A,{isOpen:Be,title:"Delete Notice",message:"Are you sure you want to delete this notice?",onConfirm:async()=>{if(ze){Se(!1);try{(await fetch(`/api/notices/${ze}`,{method:"DELETE",headers:De()})).ok&&(Ae(!1),ke(null),Ie(),Te())}catch(e){console.error("Error deleting notice:",e)}finally{Ne(null)}}},onCancel:()=>{Se(!1),Ne(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]});var Ve,Xe}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var n=r(4752),i=r(9610),a=r(4414);const o=n.Ay.div`
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
`,l=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=n.Ay.p`
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
`,x=e=>{let{isOpen:t,title:r,message:n,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(d,{children:n})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);