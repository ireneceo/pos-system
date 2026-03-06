"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.input`
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
`,c=e=>{let{children:t,className:r,style:n,...a}=e;return(0,i.jsx)(o,{className:r,style:n,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:n,style:o,...d}=e;return(0,i.jsxs)(s,{style:o,children:[(0,i.jsx)(a,{placeholder:t,value:r,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,i.jsx)(l,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,i.jsx)(d,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,a=n.Ay.button`
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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(o,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:o}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:o,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var n=r(9950),i=r(4492);function o(e){const[t,r]=(0,i.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ie});var n=r(9950),i=r(4752),o=r(2853),a=r(1367),s=r(3832),l=r(5665),d=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(9061),m=r(4414);const f=i.Ay.div`
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
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,j=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,b=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,w=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,F=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,C=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,E=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,B=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,S=i.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,z=i.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,N=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 800px;
  width: 90%;
  flex-shrink: 0;
  margin: auto 0;
`,$=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,D=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,I=i.Ay.button`
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
`,O=i.Ay.div`
  padding: 24px;
`,U=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,R=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,L=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,G=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,Y=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  transition: background 0.1s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,J=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,Q=i.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`,Z=i.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,q=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,H=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,K=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,V=i.Ay.div`
  margin-bottom: 24px;
`,X=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,ee=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,te=i.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,re=i.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,ne=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ie=()=>{var e,t,r;const{user:i}=(0,a.As)(),[ie,oe]=(0,n.useState)([]),[ae,se]=(0,n.useState)([]),[le,de]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(!0),[xe,he]=(0,p.M)("received"),[ue,ge]=(0,n.useState)(""),[me,fe]=(0,n.useState)(""),[ve,ye]=(0,n.useState)("all"),[je,be]=(0,n.useState)("all"),[we,Fe]=(0,n.useState)(!1),[ke,Ae]=(0,n.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[Ce,Ee]=(0,n.useState)(!1),[_e,Be]=(0,n.useState)(null),[Se,ze]=(0,n.useState)(!1),[Ne,$e]=(0,n.useState)({}),[De,Ie]=(0,n.useState)([]),Oe={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},Ue=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),$e(e=>({...e,...t}))}}}catch(t){}},Re=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Oe});if(e.ok){const t=await e.json();t.success&&de(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Te=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Oe});if(e.ok){const t=await e.json();t.success&&(oe(t.data),Ue(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Le=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Oe});if(e.ok){const t=await e.json();t.success&&(se(t.data),Ue(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Me=(0,n.useCallback)(async()=>{pe(!0),await Promise.all([Re(),Te(),Le()]),pe(!1)},[Re,Te,Le]);(0,n.useEffect)(()=>{i&&Me()},[i,Me]);const Ge=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var r;const n=!ue||e.title.toLowerCase().includes(ue.toLowerCase())||(null===(r=e.author_name)||void 0===r?void 0:r.toLowerCase().includes(ue.toLowerCase())),i=!me||e.priority===me,o="all"===ve||(e.category||"general")===ve,a="all"===je||t||e.author_role===je;return n&&i&&o&&a})},Pe=Ge(ie,!1),We=Ge(ae,!0),Ye="received"===xe?Pe:We,Je={total:ie.length,unread:ie.filter(e=>!e.read_at).length,important:ie.filter(e=>"important"===e.priority).length,urgent:ie.filter(e=>"urgent"===e.priority).length},Qe=(new Date).getMonth(),Ze=(new Date).getFullYear(),qe={total:ae.length,thisMonth:ae.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Qe&&t.getFullYear()===Ze}).length,important:ae.filter(e=>"important"===e.priority).length,urgent:ae.filter(e=>"urgent"===e.priority).length},He=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"Just now":n<60?`${n}m ago`:i<24?`${i}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Ke=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return ce?(0,m.jsxs)(s.mc,{children:[(0,m.jsx)(s.Y9,{children:(0,m.jsx)(s.hE,{children:"Notices"})}),(0,m.jsx)(s.UC,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,m.jsxs)(s.mc,{children:[(0,m.jsxs)(s.Y9,{children:[(0,m.jsx)(s.hE,{children:"Notices"}),(0,m.jsx)(s.ex,{children:(null===le||void 0===le?void 0:le.canSend)&&(0,m.jsx)(s.$n,{variant:"primary",onClick:()=>{var e,t,r,n,i;Ae({title:"",content:"",target_type:(null===le||void 0===le||null===(e=le.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===le||void 0===le||null===(r=le.foodcourts)||void 0===r||null===(n=r[0])||void 0===n||null===(i=n.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),Fe(!0)},children:"New Notice"})})]}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(d.tU,{children:[(0,m.jsxs)(d.oz,{active:"received"===xe,onClick:()=>he("received"),children:["Received (",ie.length,")"]}),(0,m.jsxs)(d.oz,{active:"sent"===xe,onClick:()=>he("sent"),children:["Sent (",ae.length,")"]})]}),"received"===xe?(0,m.jsxs)(l.MD,{children:[(0,m.jsxs)(l.hI,{color:"#635BFF",children:[(0,m.jsx)(l.Os,{children:Je.total}),(0,m.jsx)(l.v0,{children:"Total Received"})]}),(0,m.jsxs)(l.hI,{color:"#3B82F6",children:[(0,m.jsx)(l.Os,{children:Je.unread}),(0,m.jsx)(l.v0,{children:"Unread"})]}),(0,m.jsxs)(l.hI,{color:"#F59E0B",children:[(0,m.jsx)(l.Os,{children:Je.important}),(0,m.jsx)(l.v0,{children:"Important"})]}),(0,m.jsxs)(l.hI,{color:"#EF4444",children:[(0,m.jsx)(l.Os,{children:Je.urgent}),(0,m.jsx)(l.v0,{children:"Urgent"})]})]}):(0,m.jsxs)(l.MD,{children:[(0,m.jsxs)(l.hI,{color:"#635BFF",children:[(0,m.jsx)(l.Os,{children:qe.total}),(0,m.jsx)(l.v0,{children:"Total Sent"})]}),(0,m.jsxs)(l.hI,{color:"#3B82F6",children:[(0,m.jsx)(l.Os,{children:qe.thisMonth}),(0,m.jsx)(l.v0,{children:"This Month"})]}),(0,m.jsxs)(l.hI,{color:"#F59E0B",children:[(0,m.jsx)(l.Os,{children:qe.important}),(0,m.jsx)(l.v0,{children:"Important"})]}),(0,m.jsxs)(l.hI,{color:"#EF4444",children:[(0,m.jsx)(l.Os,{children:qe.urgent}),(0,m.jsx)(l.v0,{children:"Urgent"})]})]}),(0,m.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,m.jsx)("button",{onClick:()=>ye(e),style:{padding:"6px 16px",borderRadius:"20px",border:ve===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ve===e?"#F0EFFF":"white",color:ve===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ve===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,m.jsxs)(f,{children:[(0,m.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:ue,onChange:e=>ge(e.target.value)}),"received"===xe&&(0,m.jsxs)(c.Jt,{value:je,onChange:e=>be(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Senders"}),(0,m.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,m.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,m.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,m.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,m.jsxs)(c.Jt,{value:me,onChange:e=>fe(e.target.value),children:[(0,m.jsx)("option",{value:"",children:"All Priorities"}),(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,m.jsxs)(v,{children:[Ye.map(e=>{var t,r,n;const i="received"===xe&&!e.read_at;return(0,m.jsxs)(y,{unread:i,onClick:()=>(async e=>{Be(e),ze(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:Oe});if(t.ok){const e=await t.json();e.success&&Be(e.data)}Te(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,m.jsxs)(j,{children:[(0,m.jsxs)(b,{children:[i&&(0,m.jsx)(w,{}),(0,m.jsxs)("div",{children:[(0,m.jsx)(F,{children:e.title}),(0,m.jsxs)(k,{children:[(0,m.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,m.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===xe&&(0,m.jsxs)(S,{children:["To: ",Ke(e)]})]})]})]}),(0,m.jsxs)(A,{children:["guide"===e.category&&(0,m.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,m.jsx)(C,{priority:e.priority,children:e.priority})]})]}),(0,m.jsx)(E,{children:e.content}),(0,m.jsxs)(_,{children:[(0,m.jsx)("span",{children:He(e.createdAt)}),e.commentCount>0&&(0,m.jsxs)(B,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(n=Ne[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,m.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ne[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Ye.length&&(0,m.jsxs)(o.pp,{children:[(0,m.jsx)("h3",{children:"No notices found"}),(0,m.jsx)("p",{children:"received"===xe?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),we&&(0,m.jsx)(z,{onClick:()=>Fe(!1),children:(0,m.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)($,{children:[(0,m.jsx)(D,{children:"New Notice"}),(0,m.jsx)(I,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,m.jsxs)(O,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Title *"}),(0,m.jsx)(L,{type:"text",value:ke.title,onChange:e=>Ae({...ke,title:e.target.value}),placeholder:"Notice title"})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Content *"}),(0,m.jsx)(G,{value:ke.content,onChange:e=>Ae({...ke,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Attachments"}),(0,m.jsx)(x.A,{files:De,onChange:Ie,maxFiles:5})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Target *"}),(0,m.jsx)(M,{value:ke.target_type,onChange:e=>{var t,r,n;return Ae({...ke,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===le||void 0===le||null===(t=le.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(n=r.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[]})},children:null===le||void 0===le||null===(e=le.targetOptions)||void 0===e?void 0:e.map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value))})]}),"foodcourt"===ke.target_type&&(null===le||void 0===le?void 0:le.foodcourts)&&le.foodcourts.length>0&&(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Select Foodcourt"}),(0,m.jsx)(M,{value:ke.foodcourt_id,onChange:e=>Ae({...ke,foodcourt_id:e.target.value}),children:le.foodcourts.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))})]}),("select_restaurants"===ke.target_type||"restaurant"===ke.target_type)&&(null===le||void 0===le?void 0:le.restaurants)&&(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Select Restaurants"}),(0,m.jsxs)(J,{children:[(0,m.jsxs)(Z,{children:[ke.restaurant_ids.length," of ",le.restaurants.length," selected"]}),(0,m.jsx)(Q,{onClick:()=>{if(!le)return;const e=le.restaurants.map(e=>e.id),t=e.every(e=>ke.restaurant_ids.includes(e));Ae(r=>({...r,restaurant_ids:t?[]:e}))},children:ke.restaurant_ids.length===le.restaurants.length?"Deselect All":"Select All"})]}),(0,m.jsxs)(W,{children:[le.restaurants.map(e=>(0,m.jsxs)(Y,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ke.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void Ae(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===le.restaurants.length&&(0,m.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]}),(0,m.jsxs)(P,{children:[(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Category"}),(0,m.jsxs)(M,{value:ke.category,onChange:e=>Ae({...ke,category:e.target.value}),children:[(0,m.jsx)("option",{value:"general",children:"General"}),(0,m.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,m.jsxs)(R,{children:[(0,m.jsx)(T,{children:"Priority"}),(0,m.jsxs)(M,{value:ke.priority,onChange:e=>Ae({...ke,priority:e.target.value}),children:[(0,m.jsx)("option",{value:"normal",children:"Normal"}),(0,m.jsx)("option",{value:"important",children:"Important"}),(0,m.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,m.jsxs)(U,{children:[(0,m.jsx)(s.$n,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,m.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(ke.title.trim()&&ke.content.trim()){Ee(!0);try{const e={title:ke.title,content:ke.content,target_type:ke.target_type,priority:ke.priority,category:ke.category,attachments:De.length>0?De:void 0};"foodcourt"===ke.target_type?e.foodcourt_id=parseInt(ke.foodcourt_id):"restaurant"===ke.target_type&&(e.restaurant_ids=ke.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Oe,body:JSON.stringify(e)})).ok?(Fe(!1),Ie([]),he("sent"),await Promise.all([Le(),Te()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}Ee(!1)}},disabled:Ce||!ke.title.trim()||!ke.content.trim()||"select_restaurants"===ke.target_type&&0===ke.restaurant_ids.length||"restaurant"===ke.target_type&&0===ke.restaurant_ids.length,children:Ce?"Sending...":"Send Notice"})]})]})}),Se&&_e&&(0,m.jsx)(z,{onClick:()=>{ze(!1),Be(null)},children:(0,m.jsxs)(N,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,m.jsxs)($,{children:[(0,m.jsx)(D,{children:_e.title}),(0,m.jsx)(I,{onClick:()=>{ze(!1),Be(null)},children:"\xd7"})]}),(0,m.jsxs)(O,{children:[(0,m.jsxs)(H,{children:[(0,m.jsxs)(K,{children:["From: ",(0,m.jsx)("strong",{style:{marginLeft:"4px"},children:_e.author_name||(null===(t=_e.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,m.jsx)(K,{children:_e.author_role||(null===(r=_e.author)||void 0===r?void 0:r.role)||""}),(0,m.jsx)(K,{children:(Ve=_e.createdAt,new Date(Ve).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,m.jsx)(C,{priority:_e.priority,children:_e.priority})]}),(0,m.jsx)(q,{children:_e.content.split("\n").map((e,t)=>(0,m.jsxs)(n.Fragment,{children:[t>0&&(0,m.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===_e||void 0===_e?void 0:_e.attachments)&&_e.attachments.length>0&&(0,m.jsx)("div",{style:{marginTop:"16px"},children:(0,m.jsx)(h.A,{attachments:_e.attachments})}),String(_e.author_id)===String(null===i||void 0===i?void 0:i.id)&&_e.recipients&&_e.recipients.length>0&&(0,m.jsxs)(V,{children:[(0,m.jsx)(X,{children:"Recipients"}),(0,m.jsx)(ee,{children:_e.recipients.map((e,t)=>{var r,n;return(0,m.jsx)(te,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient ${t+1}`},t)})})]}),(0,m.jsx)(u.A,{entityType:"notice",entityId:String(_e.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>$e(e=>{const t={...e},r=String(_e.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),String(_e.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,m.jsx)(U,{children:(0,m.jsx)(ne,{children:(0,m.jsx)(re,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Oe})).ok&&(ze(!1),Be(null),await Promise.all([Le(),Te()]))}catch(t){console.error("Error deleting notice:",t)}})(_e.id),children:"Delete Notice"})})})]})})]});var Ve}}}]);