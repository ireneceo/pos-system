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
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,i.jsx)(o,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:o}=e;return(0,i.jsx)(a,{active:t,onClick:r,className:o,children:n})},c=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,i.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var n=r(9950),i=r(4492);function o(e){const[t,r]=(0,i.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>V});var n=r(9950),i=r(4752),o=r(2853),a=r(1367),s=r(3832),l=r(5665),d=r(2597),c=r(2488),p=r(2653),x=r(7455),h=r(4185),u=r(4302),g=r(9061),m=r(8409),v=r(4414);const f=i.Ay.div`
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
`,j=i.Ay.div`
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
`,w=i.Ay.div`
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
`,F=i.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,k=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,C=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,_=i.Ay.span`
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
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,S=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,z=i.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,N=i.Ay.div`
  margin-bottom: 20px;
`,$=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,D=i.Ay.input`
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
`,O=i.Ay.select`
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
`,I=i.Ay.textarea`
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
`,U=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=i.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,T=i.Ay.label`
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
`,L=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,M=i.Ay.button`
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
`,G=i.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,Y=i.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,W=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,P=i.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,J=i.Ay.div`
  margin-bottom: 24px;
`,Z=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,Q=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,q=i.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,H=i.Ay.button`
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
`,K=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,V=()=>{var e,t,r;const{user:i}=(0,a.As)(),[V,X]=(0,n.useState)([]),[ee,te]=(0,n.useState)([]),[re,ne]=(0,n.useState)(null),[ie,oe]=(0,n.useState)(!0),[ae,se]=(0,p.M)("received"),[le,de]=(0,n.useState)(""),[ce,pe]=(0,n.useState)(""),[xe,he]=(0,n.useState)("all"),[ue,ge]=(0,n.useState)("all"),[me,ve]=(0,n.useState)(!1),[fe,ye]=(0,n.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[je,we]=(0,n.useState)(!1),[be,Fe]=(0,n.useState)(null),[ke,Ae]=(0,n.useState)(!1),[Ce,_e]=(0,n.useState)({}),[Ee,Be]=(0,n.useState)([]),Se={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},ze=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),_e(e=>({...e,...t}))}}}catch(t){}},Ne=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Se});if(e.ok){const t=await e.json();t.success&&ne(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),$e=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Se});if(e.ok){const t=await e.json();t.success&&(X(t.data),ze(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),De=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Se});if(e.ok){const t=await e.json();t.success&&(te(t.data),ze(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Oe=(0,n.useCallback)(async()=>{oe(!0),await Promise.all([Ne(),$e(),De()]),oe(!1)},[Ne,$e,De]);(0,n.useEffect)(()=>{i&&Oe()},[i,Oe]);const Ie=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var r;const n=!le||e.title.toLowerCase().includes(le.toLowerCase())||(null===(r=e.author_name)||void 0===r?void 0:r.toLowerCase().includes(le.toLowerCase())),i=!ce||e.priority===ce,o="all"===xe||(e.category||"general")===xe,a="all"===ue||t||e.author_role===ue;return n&&i&&o&&a})},Ue=Ie(V,!1),Re=Ie(ee,!0),Te="received"===ae?Ue:Re,Le={total:V.length,unread:V.filter(e=>!e.read_at).length,important:V.filter(e=>"important"===e.priority).length,urgent:V.filter(e=>"urgent"===e.priority).length},Me=(new Date).getMonth(),Ge=(new Date).getFullYear(),Ye={total:ee.length,thisMonth:ee.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Me&&t.getFullYear()===Ge}).length,important:ee.filter(e=>"important"===e.priority).length,urgent:ee.filter(e=>"urgent"===e.priority).length},We=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"Just now":n<60?`${n}m ago`:i<24?`${i}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Pe=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return ie?(0,v.jsxs)(s.mc,{children:[(0,v.jsx)(s.Y9,{children:(0,v.jsx)(s.hE,{children:"Notices"})}),(0,v.jsx)(s.UC,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,v.jsxs)(s.mc,{children:[(0,v.jsxs)(s.Y9,{children:[(0,v.jsx)(s.hE,{children:"Notices"}),(0,v.jsx)(s.ex,{children:(null===re||void 0===re?void 0:re.canSend)&&(0,v.jsx)(s.$n,{variant:"primary",onClick:()=>{var e,t,r,n,i;ye({title:"",content:"",target_type:(null===re||void 0===re||null===(e=re.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===re||void 0===re||null===(r=re.foodcourts)||void 0===r||null===(n=r[0])||void 0===n||null===(i=n.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),ve(!0)},children:"New Notice"})})]}),(0,v.jsxs)(s.UC,{children:[(0,v.jsxs)(d.tU,{children:[(0,v.jsxs)(d.oz,{active:"received"===ae,onClick:()=>se("received"),children:["Received",(0,v.jsx)(d.Ex,{count:V.length,showZero:!0})]}),(0,v.jsxs)(d.oz,{active:"sent"===ae,onClick:()=>se("sent"),children:["Sent",(0,v.jsx)(d.Ex,{count:ee.length,showZero:!0})]})]}),"received"===ae?(0,v.jsxs)(l.MD,{children:[(0,v.jsxs)(l.hI,{color:"#635BFF",children:[(0,v.jsx)(l.Os,{children:Le.total}),(0,v.jsx)(l.v0,{children:"Total Received"})]}),(0,v.jsxs)(l.hI,{color:"#3B82F6",children:[(0,v.jsx)(l.Os,{children:Le.unread}),(0,v.jsx)(l.v0,{children:"Unread"})]}),(0,v.jsxs)(l.hI,{color:"#F59E0B",children:[(0,v.jsx)(l.Os,{children:Le.important}),(0,v.jsx)(l.v0,{children:"Important"})]}),(0,v.jsxs)(l.hI,{color:"#EF4444",children:[(0,v.jsx)(l.Os,{children:Le.urgent}),(0,v.jsx)(l.v0,{children:"Urgent"})]})]}):(0,v.jsxs)(l.MD,{children:[(0,v.jsxs)(l.hI,{color:"#635BFF",children:[(0,v.jsx)(l.Os,{children:Ye.total}),(0,v.jsx)(l.v0,{children:"Total Sent"})]}),(0,v.jsxs)(l.hI,{color:"#3B82F6",children:[(0,v.jsx)(l.Os,{children:Ye.thisMonth}),(0,v.jsx)(l.v0,{children:"This Month"})]}),(0,v.jsxs)(l.hI,{color:"#F59E0B",children:[(0,v.jsx)(l.Os,{children:Ye.important}),(0,v.jsx)(l.v0,{children:"Important"})]}),(0,v.jsxs)(l.hI,{color:"#EF4444",children:[(0,v.jsx)(l.Os,{children:Ye.urgent}),(0,v.jsx)(l.v0,{children:"Urgent"})]})]}),(0,v.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,v.jsx)("button",{onClick:()=>he(e),style:{padding:"6px 16px",borderRadius:"20px",border:xe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:xe===e?"#F0EFFF":"white",color:xe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:xe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,v.jsxs)(f,{children:[(0,v.jsx)(c.DO,{type:"text",placeholder:"Search notices...",value:le,onChange:e=>de(e.target.value)}),"received"===ae&&(0,v.jsxs)(c.Jt,{value:ue,onChange:e=>ge(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Senders"}),(0,v.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,v.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,v.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,v.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,v.jsxs)(c.Jt,{value:ce,onChange:e=>pe(e.target.value),children:[(0,v.jsx)("option",{value:"",children:"All Priorities"}),(0,v.jsx)("option",{value:"normal",children:"Normal"}),(0,v.jsx)("option",{value:"important",children:"Important"}),(0,v.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,v.jsxs)(y,{children:[Te.map(e=>{var t,r,n;const i="received"===ae&&!e.read_at;return(0,v.jsxs)(j,{unread:i,onClick:()=>(async e=>{Fe(e),Ae(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:Se});if(t.ok){const e=await t.json();e.success&&Fe(e.data)}$e(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,v.jsxs)(w,{children:[(0,v.jsxs)(b,{children:[i&&(0,v.jsx)(F,{}),(0,v.jsxs)("div",{children:[(0,v.jsx)(k,{children:e.title}),(0,v.jsxs)(A,{children:[(0,v.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,v.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===ae&&(0,v.jsxs)(z,{children:["To: ",Pe(e)]})]})]})]}),(0,v.jsxs)(C,{children:["guide"===e.category&&(0,v.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,v.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,v.jsx)(E,{children:e.content}),(0,v.jsxs)(B,{children:[(0,v.jsx)("span",{children:We(e.createdAt)}),e.commentCount>0&&(0,v.jsxs)(S,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(n=Ce[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,v.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ce[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Te.length&&(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h3",{children:"No notices found"}),(0,v.jsx)("p",{children:"received"===ae?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),me&&(0,v.jsxs)(m.aF,{isOpen:!0,onClose:()=>ve(!1),title:"New Notice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s.$n,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,v.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(fe.title.trim()&&fe.content.trim()){we(!0);try{const e={title:fe.title,content:fe.content,target_type:fe.target_type,priority:fe.priority,category:fe.category,attachments:Ee.length>0?Ee:void 0};"foodcourt"===fe.target_type?e.foodcourt_id=parseInt(fe.foodcourt_id):"restaurant"===fe.target_type&&(e.restaurant_ids=fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Se,body:JSON.stringify(e)})).ok?(ve(!1),Be([]),se("sent"),await Promise.all([De(),$e()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}we(!1)}},disabled:je||!fe.title.trim()||!fe.content.trim()||"select_restaurants"===fe.target_type&&0===fe.restaurant_ids.length||"restaurant"===fe.target_type&&0===fe.restaurant_ids.length,children:je?"Sending...":"Send Notice"})]}),children:[(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Title *"}),(0,v.jsx)(D,{type:"text",value:fe.title,onChange:e=>ye({...fe,title:e.target.value}),placeholder:"Notice title"})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Content *"}),(0,v.jsx)(I,{value:fe.content,onChange:e=>ye({...fe,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Attachments"}),(0,v.jsx)(x.A,{files:Ee,onChange:Be,maxFiles:5})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Target *"}),(0,v.jsx)(O,{value:fe.target_type,onChange:e=>{var t,r,n;return ye({...fe,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===re||void 0===re||null===(t=re.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(n=r.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[]})},children:null===re||void 0===re||null===(e=re.targetOptions)||void 0===e?void 0:e.map(e=>(0,v.jsx)("option",{value:e.value,children:e.label},e.value))})]}),"foodcourt"===fe.target_type&&(null===re||void 0===re?void 0:re.foodcourts)&&re.foodcourts.length>0&&(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Select Foodcourt"}),(0,v.jsx)(O,{value:fe.foodcourt_id,onChange:e=>ye({...fe,foodcourt_id:e.target.value}),children:re.foodcourts.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))})]}),("select_restaurants"===fe.target_type||"restaurant"===fe.target_type)&&(null===re||void 0===re?void 0:re.restaurants)&&(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Select Restaurants"}),(0,v.jsxs)(L,{children:[(0,v.jsxs)(G,{children:[fe.restaurant_ids.length," of ",re.restaurants.length," selected"]}),(0,v.jsx)(M,{onClick:()=>{if(!re)return;const e=re.restaurants.map(e=>e.id),t=e.every(e=>fe.restaurant_ids.includes(e));ye(r=>({...r,restaurant_ids:t?[]:e}))},children:fe.restaurant_ids.length===re.restaurants.length?"Deselect All":"Select All"})]}),(0,v.jsxs)(R,{children:[re.restaurants.map(e=>(0,v.jsxs)(T,{children:[(0,v.jsx)("input",{type:"checkbox",checked:fe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ye(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===re.restaurants.length&&(0,v.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]}),(0,v.jsxs)(U,{children:[(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Category"}),(0,v.jsxs)(O,{value:fe.category,onChange:e=>ye({...fe,category:e.target.value}),children:[(0,v.jsx)("option",{value:"general",children:"General"}),(0,v.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)($,{children:"Priority"}),(0,v.jsxs)(O,{value:fe.priority,onChange:e=>ye({...fe,priority:e.target.value}),children:[(0,v.jsx)("option",{value:"normal",children:"Normal"}),(0,v.jsx)("option",{value:"important",children:"Important"}),(0,v.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),ke&&be&&(0,v.jsxs)(m.aF,{isOpen:!0,onClose:()=>{Ae(!1),Fe(null)},title:be.title,size:"large",footer:String(be.author_id)===String(null===i||void 0===i?void 0:i.id)?(0,v.jsx)(K,{children:(0,v.jsx)(H,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Se})).ok&&(Ae(!1),Fe(null),await Promise.all([De(),$e()]))}catch(t){console.error("Error deleting notice:",t)}})(be.id),children:"Delete Notice"})}):void 0,children:[(0,v.jsxs)(W,{children:[(0,v.jsxs)(P,{children:["From: ",(0,v.jsx)("strong",{style:{marginLeft:"4px"},children:be.author_name||(null===(t=be.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,v.jsx)(P,{children:be.author_role||(null===(r=be.author)||void 0===r?void 0:r.role)||""}),(0,v.jsx)(P,{children:(Je=be.createdAt,new Date(Je).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,v.jsx)(_,{priority:be.priority,children:be.priority})]}),(0,v.jsx)(Y,{children:be.content.split("\n").map((e,t)=>(0,v.jsxs)(n.Fragment,{children:[t>0&&(0,v.jsx)("br",{}),(0,g.c)(e)]},t))}),(null===be||void 0===be?void 0:be.attachments)&&be.attachments.length>0&&(0,v.jsx)("div",{style:{marginTop:"16px"},children:(0,v.jsx)(h.A,{attachments:be.attachments})}),String(be.author_id)===String(null===i||void 0===i?void 0:i.id)&&be.recipients&&be.recipients.length>0&&(0,v.jsxs)(J,{children:[(0,v.jsx)(Z,{children:"Recipients"}),(0,v.jsx)(Q,{children:be.recipients.map((e,t)=>{var r,n;return(0,v.jsx)(q,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient ${t+1}`},t)})})]}),(0,v.jsx)(u.A,{entityType:"notice",entityId:String(be.id),currentUserId:null===i||void 0===i?void 0:i.id,onMarkRead:()=>_e(e=>{const t={...e},r=String(be.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]});var Je}}}]);