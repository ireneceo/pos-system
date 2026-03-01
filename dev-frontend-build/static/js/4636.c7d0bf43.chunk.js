"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,s=n.Ay.select`
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
`,d=e=>{let{children:t,className:r,style:n,...o}=e;return(0,i.jsx)(a,{className:r,style:n,...o,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(o,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(s,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var n=r(4752),i=r(4414);const a=n.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(a,{className:r,style:n,children:t})},l=e=>{let{active:t,onClick:r,children:n,className:a}=e;return(0,i.jsx)(o,{active:t,onClick:r,className:a,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>a});var n=r(9950),i=r(4492);function a(e){const[t,r]=(0,i.ok)(),a=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>te});var n=r(9950),i=r(4752),a=r(2853),o=r(1367),s=r(3832),d=r(5665),l=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(4414);const m=i.Ay.div`
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
`,y=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,b=i.Ay.div`
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
`,f=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,j=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,v=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,w=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,A=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,k=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,C=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,E=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,B=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,S=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,z=i.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,N=i.Ay.div`
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
`,$=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,D=i.Ay.div`
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
`,O=i.Ay.button`
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
`,U=i.Ay.div`
  padding: 24px;
`,T=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,R=i.Ay.div`
  margin-bottom: 20px;
`,L=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,G=i.Ay.input`
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
`,M=i.Ay.textarea`
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
`,W=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Y=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,J=i.Ay.label`
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
`,Z=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,q=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,H=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,K=i.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,V=i.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,X=i.Ay.button`
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
`,ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,te=()=>{var e,t,r;const{user:i}=(0,o.As)(),[te,re]=(0,p.M)("received"),[ne,ie]=(0,n.useState)([]),[ae,oe]=(0,n.useState)([]),[se,de]=(0,n.useState)(null),[le,ce]=(0,n.useState)(""),[pe,xe]=(0,n.useState)(""),[he,ue]=(0,n.useState)("all"),[ge,me]=(0,n.useState)("all"),[ye,be]=(0,n.useState)(!1),[fe,je]=(0,n.useState)(!1),[ve,we]=(0,n.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[Fe,Ae]=(0,n.useState)(!1),[ke,Ce]=(0,n.useState)([]),[_e,Ee]=(0,n.useState)(!1),[Be,Se]=(0,n.useState)(null),[ze,Ne]=(0,n.useState)({}),$e=(0,n.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),De=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ne(e=>({...e,...t}))}}}catch(t){}},Ie=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:$e()});if(e.ok){const t=await e.json();de(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[$e]),Oe=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:$e()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];ie(n),De(n)}}catch(e){console.error("Error fetching received notices:",e)}},[$e]),Ue=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:$e()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];oe(n),De(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[$e]),Te=(0,n.useCallback)(async()=>{be(!0),await Promise.all([Ie(),Oe(),Ue()]),be(!1)},[Ie,Oe,Ue]);(0,n.useEffect)(()=>{i&&Te()},[i,Te]);const Re=async e=>{Se(e),Ee(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:$e()});if(t.ok){const e=await t.json(),r=e.data||e;Se(r),Oe(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Le=("received"===te?ne:ae).filter(e=>{const t=!le||e.title.toLowerCase().includes(le.toLowerCase())||e.content.toLowerCase().includes(le.toLowerCase()),r=!pe||e.priority===pe,n="all"===he||(e.category||"general")===he,i="all"===ge||"sent"===te||e.author_role===ge;return t&&r&&n&&i}),Ge=ne.length,Me=ne.filter(e=>!e.read_at).length,Pe=ne.filter(e=>"important"===e.priority).length,We=ne.filter(e=>"urgent"===e.priority).length,Ye=ae.length,Je=ae.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Qe=ae.filter(e=>"important"===e.priority).length,Ze=ae.filter(e=>"urgent"===e.priority).length,qe=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},He=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Ke=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,g.jsxs)(s.mc,{children:[(0,g.jsxs)(s.Y9,{children:[(0,g.jsx)(s.hE,{children:"Notices"}),(0,g.jsx)(s.ex,{children:(0,g.jsx)(s.$n,{variant:"primary",onClick:()=>{we({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),Ce([]),je(!0)},children:"New Notice"})})]}),(0,g.jsxs)(s.UC,{children:[(0,g.jsxs)(l.tU,{children:[(0,g.jsxs)(l.oz,{active:"received"===te,onClick:()=>re("received"),children:["Received (",Ge,")"]}),(0,g.jsxs)(l.oz,{active:"sent"===te,onClick:()=>re("sent"),children:["Sent (",Ye,")"]})]}),"received"===te?(0,g.jsxs)(d.MD,{children:[(0,g.jsxs)(d.hI,{color:"#635BFF",children:[(0,g.jsx)(d.Os,{children:Ge}),(0,g.jsx)(d.v0,{children:"Total Received"})]}),(0,g.jsxs)(d.hI,{color:"#F59E0B",children:[(0,g.jsx)(d.Os,{children:Me}),(0,g.jsx)(d.v0,{children:"Unread"})]}),(0,g.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,g.jsx)(d.Os,{children:Pe}),(0,g.jsx)(d.v0,{children:"Important"})]}),(0,g.jsxs)(d.hI,{color:"#EF4444",children:[(0,g.jsx)(d.Os,{children:We}),(0,g.jsx)(d.v0,{children:"Urgent"})]})]}):(0,g.jsxs)(d.MD,{children:[(0,g.jsxs)(d.hI,{color:"#635BFF",children:[(0,g.jsx)(d.Os,{children:Ye}),(0,g.jsx)(d.v0,{children:"Total Sent"})]}),(0,g.jsxs)(d.hI,{color:"#10B981",children:[(0,g.jsx)(d.Os,{children:Je}),(0,g.jsx)(d.v0,{children:"This Month"})]}),(0,g.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,g.jsx)(d.Os,{children:Qe}),(0,g.jsx)(d.v0,{children:"Important"})]}),(0,g.jsxs)(d.hI,{color:"#EF4444",children:[(0,g.jsx)(d.Os,{children:Ze}),(0,g.jsx)(d.v0,{children:"Urgent"})]})]}),(0,g.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,g.jsx)("button",{onClick:()=>ue(e),style:{padding:"6px 16px",borderRadius:"20px",border:he===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:he===e?"#F0EFFF":"white",color:he===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:he===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,g.jsxs)(m,{children:[(0,g.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:le,onChange:e=>ce(e.target.value)}),"received"===te&&(0,g.jsxs)(c.Jt,{value:ge,onChange:e=>me(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Senders"}),(0,g.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,g.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,g.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,g.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,g.jsxs)(c.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,g.jsx)("option",{value:"",children:"All Priorities"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,g.jsxs)(y,{children:[ye&&0===Le.length&&(0,g.jsx)(a.pp,{children:(0,g.jsx)("p",{children:"Loading notices..."})}),!ye&&0===Le.length&&(0,g.jsxs)(a.pp,{children:[(0,g.jsx)("h3",{children:"No notices found"}),(0,g.jsx)("p",{children:"received"===te?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Le.map(e=>{var t,r;return(0,g.jsxs)(b,{unread:"received"===te&&!e.read_at,onClick:()=>Re(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,g.jsxs)(f,{children:[(0,g.jsxs)(j,{children:["received"===te&&!e.read_at&&(0,g.jsx)(v,{}),(0,g.jsx)(w,{children:e.title})]}),(0,g.jsxs)(F,{children:["guide"===e.category&&(0,g.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,g.jsx)(A,{priority:e.priority,children:e.priority})]})]}),(0,g.jsx)(C,{children:e.content}),(0,g.jsxs)(_,{children:[(0,g.jsx)(E,{children:"received"===te?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(S,{children:[e.author_name||"Unknown",(0,g.jsx)(k,{children:e.author_role||"Admin"})]})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(S,{children:["To: ",qe(e)]}),(0,g.jsxs)(S,{children:[He(e),"/",Ke(e)," read"]})]})}),(0,g.jsxs)(B,{children:[e.commentCount>0&&(0,g.jsxs)(z,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=ze[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[ze[String(e.id)].unread_count," new"]})]}),(0,g.jsx)(S,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),fe&&(0,g.jsx)(N,{onClick:()=>je(!1),children:(0,g.jsxs)($,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(D,{children:[(0,g.jsx)(I,{children:"New Notice"}),(0,g.jsx)(O,{onClick:()=>je(!1),children:"\xd7"})]}),(0,g.jsxs)(U,{children:[(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Title *"}),(0,g.jsx)(G,{type:"text",placeholder:"Enter notice title",value:ve.title,onChange:e=>we({...ve,title:e.target.value})})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Content *"}),(0,g.jsx)(M,{placeholder:"Enter notice content...",value:ve.content,onChange:e=>we({...ve,content:e.target.value})})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Attachments"}),(0,g.jsx)(x.A,{files:ke,onChange:Ce,maxFiles:5})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Target Type *"}),(0,g.jsxs)(P,{value:ve.target_type,onChange:e=>we({...ve,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,g.jsx)("option",{value:"",children:"Select target..."}),(null===se||void 0===se||null===(e=se.targetOptions)||void 0===e?void 0:e.map(e=>(0,g.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("option",{value:"brand",children:"By Brand"}),(0,g.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),"brand"===ve.target_type&&(null===se||void 0===se?void 0:se.brands)&&(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Select Brand *"}),(0,g.jsxs)(P,{value:ve.brand_id,onChange:e=>we({...ve,brand_id:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"Choose a brand..."}),se.brands.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===ve.target_type&&(null===se||void 0===se?void 0:se.restaurants)&&(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Select Restaurants *"}),(0,g.jsxs)(Y,{children:[se.restaurants.map(e=>(0,g.jsxs)(J,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ve.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void we(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===se.restaurants.length&&(0,g.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,g.jsxs)(Q,{children:[ve.restaurant_ids.length," restaurant",1!==ve.restaurant_ids.length?"s":""," selected"]})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Category"}),(0,g.jsxs)(P,{value:ve.category,onChange:e=>we({...ve,category:e.target.value}),children:[(0,g.jsx)("option",{value:"general",children:"General"}),(0,g.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(L,{children:"Priority"}),(0,g.jsxs)(P,{value:ve.priority,onChange:e=>we({...ve,priority:e.target.value}),children:[(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,g.jsxs)(T,{children:[(0,g.jsx)(s.$n,{variant:"secondary",onClick:()=>je(!1),children:"Cancel"}),(0,g.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(ve.title.trim()&&ve.content.trim()&&ve.target_type){Ae(!0);try{const e={title:ve.title.trim(),content:ve.content.trim(),target_type:ve.target_type,priority:ve.priority,category:ve.category,attachments:ke.length>0?ke:void 0};"brand"===ve.target_type&&ve.brand_id&&(e.brand_id=Number(ve.brand_id)),"select_restaurants"===ve.target_type&&ve.restaurant_ids.length>0&&(e.restaurant_ids=ve.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:$e(),body:JSON.stringify(e)})).ok&&(je(!1),Ce([]),Ue())}catch(e){console.error("Error creating notice:",e)}finally{Ae(!1)}}},disabled:Fe||!ve.title.trim()||!ve.content.trim()||!ve.target_type||"brand"===ve.target_type&&!ve.brand_id||"select_restaurants"===ve.target_type&&0===ve.restaurant_ids.length,children:Fe?"Sending...":"Send Notice"})]})]})}),_e&&Be&&(0,g.jsx)(N,{onClick:()=>{Ee(!1),Se(null)},children:(0,g.jsxs)($,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(D,{children:[(0,g.jsx)(I,{children:Be.title}),(0,g.jsxs)(ee,{children:[(0,g.jsx)(A,{priority:Be.priority,children:Be.priority}),(Xe=Be,String(Xe.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,g.jsx)(X,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:$e()})).ok&&(Ee(!1),Se(null),Ue(),Oe())}catch(t){console.error("Error deleting notice:",t)}})(Be.id),children:"Delete"})),(0,g.jsx)(O,{onClick:()=>{Ee(!1),Se(null)},children:"\xd7"})]})]}),(0,g.jsxs)(U,{children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(H,{children:[(0,g.jsx)(K,{children:"From"}),(0,g.jsxs)(V,{children:[Be.author_name||(null===(t=Be.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",Be.author_role||(null===(r=Be.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,g.jsxs)(H,{children:[(0,g.jsx)(K,{children:"To"}),(0,g.jsx)(V,{children:qe(Be)})]}),(0,g.jsxs)(H,{children:[(0,g.jsx)(K,{children:"Date"}),(0,g.jsx)(V,{children:(Ve=Be.createdAt,new Date(Ve).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),Be.recipients&&Be.recipients.length>0&&(0,g.jsxs)(H,{children:[(0,g.jsx)(K,{children:"Read Status"}),(0,g.jsxs)(V,{children:[He(Be),"/",Ke(Be)," read"]})]})]}),(0,g.jsx)(Z,{children:Be.content}),(null===Be||void 0===Be?void 0:Be.attachments)&&Be.attachments.length>0&&(0,g.jsx)(h.A,{attachments:Be.attachments}),(0,g.jsx)(u.A,{entityType:"notice",entityId:String(Be.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>Ne(e=>{const t={...e},r=String(Be.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]});var Ve,Xe}}}]);