"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>s});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,s=e=>{let{children:t,className:r,style:n,...a}=e;return(0,i.jsx)(o,{className:r,style:n,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(l,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>d,tU:()=>s});r(9950);var n=r(4752),i=r(4414);const o=n.Ay.div`
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
`,l=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,s=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(o,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:o}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:o,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(l,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var n=r(9950),i=r(4492);function o(e){const[t,r]=(0,i.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,l]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{l(e),r({tab:e})},[r])]}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ne});var n=r(9950),i=r(4752),o=r(2853),a=r(1367),l=r(3832),s=r(5665),d=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(4414);const m=i.Ay.div`
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
`,v=i.Ay.div`
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
`,y=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,j=i.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,b=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,w=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,k=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,A=i.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,C=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,_=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,B=i.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,S=i.Ay.div`
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
`,z=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,N=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=i.Ay.button`
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
`,I=i.Ay.div`
  padding: 24px;
`,O=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=i.Ay.div`
  margin-bottom: 20px;
`,T=i.Ay.label`
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

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,R=i.Ay.select`
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
`,L=i.Ay.textarea`
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
`,G=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,P=i.Ay.div`
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
`,W=i.Ay.button`
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
`,Q=i.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,Z=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,q=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,H=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,K=i.Ay.div`
  margin-bottom: 24px;
`,V=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,X=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,ee=i.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,te=i.Ay.button`
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
`,re=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ne=()=>{var e,t,r;const{user:i}=(0,a.As)(),[ne,ie]=(0,n.useState)([]),[oe,ae]=(0,n.useState)([]),[le,se]=(0,n.useState)(null),[de,ce]=(0,n.useState)(!0),[pe,xe]=(0,p.M)("received"),[he,ue]=(0,n.useState)(""),[ge,me]=(0,n.useState)(""),[fe,ve]=(0,n.useState)("all"),[ye,je]=(0,n.useState)("all"),[be,we]=(0,n.useState)(!1),[Fe,ke]=(0,n.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[Ae,Ce]=(0,n.useState)(!1),[Ee,_e]=(0,n.useState)(null),[Be,Se]=(0,n.useState)(!1),[ze,Ne]=(0,n.useState)({}),[$e,De]=(0,n.useState)([]),Ie={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},Oe=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ne(e=>({...e,...t}))}}}catch(t){}},Ue=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Ie});if(e.ok){const t=await e.json();t.success&&se(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Te=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Ie});if(e.ok){const t=await e.json();t.success&&(ie(t.data),Oe(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Me=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Ie});if(e.ok){const t=await e.json();t.success&&(ae(t.data),Oe(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Re=(0,n.useCallback)(async()=>{ce(!0),await Promise.all([Ue(),Te(),Me()]),ce(!1)},[Ue,Te,Me]);(0,n.useEffect)(()=>{i&&Re()},[i,Re]);const Le=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var r;const n=!he||e.title.toLowerCase().includes(he.toLowerCase())||(null===(r=e.author_name)||void 0===r?void 0:r.toLowerCase().includes(he.toLowerCase())),i=!ge||e.priority===ge,o="all"===fe||(e.category||"general")===fe,a="all"===ye||t||e.author_role===ye;return n&&i&&o&&a})},Ge=Le(ne,!1),Pe=Le(oe,!0),Ye="received"===pe?Ge:Pe,Je={total:ne.length,unread:ne.filter(e=>!e.read_at).length,important:ne.filter(e=>"important"===e.priority).length,urgent:ne.filter(e=>"urgent"===e.priority).length},We=(new Date).getMonth(),Qe=(new Date).getFullYear(),Ze={total:oe.length,thisMonth:oe.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===We&&t.getFullYear()===Qe}).length,important:oe.filter(e=>"important"===e.priority).length,urgent:oe.filter(e=>"urgent"===e.priority).length},qe=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"Just now":n<60?`${n}m ago`:i<24?`${i}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},He=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return de?(0,g.jsxs)(l.mc,{children:[(0,g.jsx)(l.Y9,{children:(0,g.jsx)(l.hE,{children:"Notices"})}),(0,g.jsx)(l.UC,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,g.jsxs)(l.mc,{children:[(0,g.jsxs)(l.Y9,{children:[(0,g.jsx)(l.hE,{children:"Notices"}),(0,g.jsx)(l.ex,{children:(null===le||void 0===le?void 0:le.canSend)&&(0,g.jsx)(l.$n,{variant:"primary",onClick:()=>{var e,t,r,n,i;ke({title:"",content:"",target_type:(null===le||void 0===le||null===(e=le.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===le||void 0===le||null===(r=le.foodcourts)||void 0===r||null===(n=r[0])||void 0===n||null===(i=n.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),we(!0)},children:"New Notice"})})]}),(0,g.jsxs)(l.UC,{children:[(0,g.jsxs)(d.tU,{children:[(0,g.jsxs)(d.oz,{active:"received"===pe,onClick:()=>xe("received"),children:["Received (",ne.length,")"]}),(0,g.jsxs)(d.oz,{active:"sent"===pe,onClick:()=>xe("sent"),children:["Sent (",oe.length,")"]})]}),"received"===pe?(0,g.jsxs)(s.MD,{children:[(0,g.jsxs)(s.hI,{color:"#635BFF",children:[(0,g.jsx)(s.Os,{children:Je.total}),(0,g.jsx)(s.v0,{children:"Total Received"})]}),(0,g.jsxs)(s.hI,{color:"#3B82F6",children:[(0,g.jsx)(s.Os,{children:Je.unread}),(0,g.jsx)(s.v0,{children:"Unread"})]}),(0,g.jsxs)(s.hI,{color:"#F59E0B",children:[(0,g.jsx)(s.Os,{children:Je.important}),(0,g.jsx)(s.v0,{children:"Important"})]}),(0,g.jsxs)(s.hI,{color:"#EF4444",children:[(0,g.jsx)(s.Os,{children:Je.urgent}),(0,g.jsx)(s.v0,{children:"Urgent"})]})]}):(0,g.jsxs)(s.MD,{children:[(0,g.jsxs)(s.hI,{color:"#635BFF",children:[(0,g.jsx)(s.Os,{children:Ze.total}),(0,g.jsx)(s.v0,{children:"Total Sent"})]}),(0,g.jsxs)(s.hI,{color:"#3B82F6",children:[(0,g.jsx)(s.Os,{children:Ze.thisMonth}),(0,g.jsx)(s.v0,{children:"This Month"})]}),(0,g.jsxs)(s.hI,{color:"#F59E0B",children:[(0,g.jsx)(s.Os,{children:Ze.important}),(0,g.jsx)(s.v0,{children:"Important"})]}),(0,g.jsxs)(s.hI,{color:"#EF4444",children:[(0,g.jsx)(s.Os,{children:Ze.urgent}),(0,g.jsx)(s.v0,{children:"Urgent"})]})]}),(0,g.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,g.jsx)("button",{onClick:()=>ve(e),style:{padding:"6px 16px",borderRadius:"20px",border:fe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:fe===e?"#F0EFFF":"white",color:fe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:fe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,g.jsxs)(m,{children:[(0,g.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:he,onChange:e=>ue(e.target.value)}),"received"===pe&&(0,g.jsxs)(c.Jt,{value:ye,onChange:e=>je(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Senders"}),(0,g.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,g.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,g.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,g.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,g.jsxs)(c.Jt,{value:ge,onChange:e=>me(e.target.value),children:[(0,g.jsx)("option",{value:"",children:"All Priorities"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,g.jsxs)(f,{children:[Ye.map(e=>{var t,r,n;const i="received"===pe&&!e.read_at;return(0,g.jsxs)(v,{unread:i,onClick:()=>(async e=>{_e(e),Se(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:Ie});if(t.ok){const e=await t.json();e.success&&_e(e.data)}Te(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,g.jsxs)(y,{children:[(0,g.jsxs)(j,{children:[i&&(0,g.jsx)(b,{}),(0,g.jsxs)("div",{children:[(0,g.jsx)(w,{children:e.title}),(0,g.jsxs)(F,{children:[(0,g.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,g.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===pe&&(0,g.jsxs)(B,{children:["To: ",He(e)]})]})]})]}),(0,g.jsxs)(k,{children:["guide"===e.category&&(0,g.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,g.jsx)(A,{priority:e.priority,children:e.priority})]})]}),(0,g.jsx)(C,{children:e.content}),(0,g.jsxs)(E,{children:[(0,g.jsx)("span",{children:qe(e.createdAt)}),e.commentCount>0&&(0,g.jsxs)(_,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(n=ze[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[ze[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Ye.length&&(0,g.jsxs)(o.pp,{children:[(0,g.jsx)("h3",{children:"No notices found"}),(0,g.jsx)("p",{children:"received"===pe?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),be&&(0,g.jsx)(S,{onClick:()=>we(!1),children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(N,{children:[(0,g.jsx)($,{children:"New Notice"}),(0,g.jsx)(D,{onClick:()=>we(!1),children:"\xd7"})]}),(0,g.jsxs)(I,{children:[(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Title *"}),(0,g.jsx)(M,{type:"text",value:Fe.title,onChange:e=>ke({...Fe,title:e.target.value}),placeholder:"Notice title"})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Content *"}),(0,g.jsx)(L,{value:Fe.content,onChange:e=>ke({...Fe,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Attachments"}),(0,g.jsx)(x.A,{files:$e,onChange:De,maxFiles:5})]}),(0,g.jsxs)(G,{children:[(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Target"}),(0,g.jsx)(R,{value:Fe.target_type,onChange:e=>{var t,r,n;return ke({...Fe,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===le||void 0===le||null===(t=le.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(n=r.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[]})},children:null===le||void 0===le||null===(e=le.targetOptions)||void 0===e?void 0:e.map(e=>(0,g.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Category"}),(0,g.jsxs)(R,{value:Fe.category,onChange:e=>ke({...Fe,category:e.target.value}),children:[(0,g.jsx)("option",{value:"general",children:"General"}),(0,g.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Priority"}),(0,g.jsxs)(R,{value:Fe.priority,onChange:e=>ke({...Fe,priority:e.target.value}),children:[(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===Fe.target_type&&(null===le||void 0===le?void 0:le.foodcourts)&&le.foodcourts.length>0&&(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Select Foodcourt"}),(0,g.jsx)(R,{value:Fe.foodcourt_id,onChange:e=>ke({...Fe,foodcourt_id:e.target.value}),children:le.foodcourts.map(e=>(0,g.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===Fe.target_type&&(null===le||void 0===le?void 0:le.restaurants)&&(0,g.jsxs)(U,{children:[(0,g.jsx)(T,{children:"Select Restaurants"}),(0,g.jsxs)(J,{children:[(0,g.jsxs)(Q,{children:[Fe.restaurant_ids.length," of ",le.restaurants.length," selected"]}),(0,g.jsx)(W,{onClick:()=>{if(!le)return;const e=le.restaurants.map(e=>e.id),t=e.every(e=>Fe.restaurant_ids.includes(e));ke(r=>({...r,restaurant_ids:t?[]:e}))},children:Fe.restaurant_ids.length===le.restaurants.length?"Deselect All":"Select All"})]}),(0,g.jsxs)(P,{children:[le.restaurants.map(e=>(0,g.jsxs)(Y,{children:[(0,g.jsx)("input",{type:"checkbox",checked:Fe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ke(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===le.restaurants.length&&(0,g.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,g.jsxs)(O,{children:[(0,g.jsx)(l.$n,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,g.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(Fe.title.trim()&&Fe.content.trim()){Ce(!0);try{const e={title:Fe.title,content:Fe.content,target_type:Fe.target_type,priority:Fe.priority,category:Fe.category,attachments:$e.length>0?$e:void 0};"foodcourt"===Fe.target_type?e.foodcourt_id=parseInt(Fe.foodcourt_id):"restaurant"===Fe.target_type&&(e.restaurant_ids=Fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Ie,body:JSON.stringify(e)})).ok?(we(!1),De([]),await Promise.all([Me(),Te()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}Ce(!1)}},disabled:Ae||!Fe.title.trim()||!Fe.content.trim()||"restaurant"===Fe.target_type&&0===Fe.restaurant_ids.length,children:Ae?"Sending...":"Send Notice"})]})]})}),Be&&Ee&&(0,g.jsx)(S,{onClick:()=>{Se(!1),_e(null)},children:(0,g.jsxs)(z,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,g.jsxs)(N,{children:[(0,g.jsx)($,{children:Ee.title}),(0,g.jsx)(D,{onClick:()=>{Se(!1),_e(null)},children:"\xd7"})]}),(0,g.jsxs)(I,{children:[(0,g.jsxs)(q,{children:[(0,g.jsxs)(H,{children:["From: ",(0,g.jsx)("strong",{style:{marginLeft:"4px"},children:Ee.author_name||(null===(t=Ee.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,g.jsx)(H,{children:Ee.author_role||(null===(r=Ee.author)||void 0===r?void 0:r.role)||""}),(0,g.jsx)(H,{children:(Ke=Ee.createdAt,new Date(Ke).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,g.jsx)(A,{priority:Ee.priority,children:Ee.priority})]}),(0,g.jsx)(Z,{children:Ee.content}),(null===Ee||void 0===Ee?void 0:Ee.attachments)&&Ee.attachments.length>0&&(0,g.jsx)("div",{style:{marginTop:"16px"},children:(0,g.jsx)(h.A,{attachments:Ee.attachments})}),String(Ee.author_id)===String(null===i||void 0===i?void 0:i.id)&&Ee.recipients&&Ee.recipients.length>0&&(0,g.jsxs)(K,{children:[(0,g.jsx)(V,{children:"Recipients"}),(0,g.jsx)(X,{children:Ee.recipients.map((e,t)=>{var r,n;return(0,g.jsx)(ee,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient ${t+1}`},t)})})]}),(0,g.jsx)(u.A,{entityType:"notice",entityId:String(Ee.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>Ne(e=>{const t={...e},r=String(Ee.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),String(Ee.author_id)===String(null===i||void 0===i?void 0:i.id)&&(0,g.jsx)(O,{children:(0,g.jsx)(re,{children:(0,g.jsx)(te,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Ie})).ok&&(Se(!1),_e(null),await Promise.all([Me(),Te()]))}catch(t){console.error("Error deleting notice:",t)}})(Ee.id),children:"Delete Notice"})})})]})})]});var Ke}}}]);