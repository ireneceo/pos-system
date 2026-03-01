"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var n=r(8819),i=(r(9950),r(4752)),o=r(4414);const a=i.Ay.div`
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
`,l=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
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
`,s=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:r,style:n,...i}=e;return(0,o.jsx)(a,{className:r,style:n,...i,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,o.jsx)(l,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,o.jsx)(s,{...r,children:t})}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>W});var n=r(8819),i=r(9950),o=r(4752),a=r(1367),l=r(3832),s=r(5665),d=r(2488),c=r(7455),p=r(4185),x=r(4302),h=r(2674),u=r(4414);const g=o.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,m=o.Ay.button`
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;

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
`,v=o.Ay.div`
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
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,j=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&`\n    border-left: 4px solid ${n.w.colors.primary};\n  `}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,f=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,w=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,b=o.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,k=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,F=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,_=o.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,C=o.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,E=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,S=o.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${n.w.colors.text.secondary};
`,$=o.Ay.span`
  color: ${n.w.colors.text.secondary};
  font-size: 12px;
`,B=o.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  padding: 8px;
`,z=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  transition: background 0.1s;

  &:hover {
    background: ${n.w.colors.surfaceHover};
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,N=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,R=o.Ay.button`
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
`,D=o.Ay.span`
  font-size: 13px;
  color: ${n.w.colors.text.secondary};
`,I=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,O=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,L=o.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,T=o.Ay.div`
  margin-bottom: 24px;
`,U=o.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,M=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,G=o.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,P=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,J=o.Ay.button`
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
`,Y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,W=()=>{var e,t,r;const{user:n}=(0,a.As)(),[o,W]=(0,i.useState)([]),[H,Q]=(0,i.useState)([]),[X,Z]=(0,i.useState)(null),[q,K]=(0,i.useState)(!0),[V,ee]=(0,i.useState)("received"),[te,re]=(0,i.useState)(""),[ne,ie]=(0,i.useState)(""),[oe,ae]=(0,i.useState)("all"),[le,se]=(0,i.useState)("all"),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[he,ue]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(null),[ve,ye]=(0,i.useState)(!1),[je,fe]=(0,i.useState)({}),[we,be]=(0,i.useState)([]),ke={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},Ae=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),fe(e=>({...e,...t}))}}}catch(t){}},Fe=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ke});if(e.ok){const t=await e.json();t.success&&Z(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),_e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:ke});if(e.ok){const t=await e.json();t.success&&(W(t.data),Ae(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Ce=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ke});if(e.ok){const t=await e.json();t.success&&(Q(t.data),Ae(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Ee=(0,i.useCallback)(async()=>{K(!0),await Promise.all([Fe(),_e(),Ce()]),K(!1)},[Fe,_e,Ce]);(0,i.useEffect)(()=>{n&&Ee()},[n,Ee]);const Se=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e.filter(e=>{var r;const n=!te||e.title.toLowerCase().includes(te.toLowerCase())||(null===(r=e.author_name)||void 0===r?void 0:r.toLowerCase().includes(te.toLowerCase())),i=!ne||e.priority===ne,o="all"===oe||(e.category||"general")===oe,a="all"===le||t||e.author_role===le;return n&&i&&o&&a})},$e=Se(o,!1),Be=Se(H,!0),ze="received"===V?$e:Be,Ne={total:o.length,unread:o.filter(e=>!e.read_at).length,important:o.filter(e=>"important"===e.priority).length,urgent:o.filter(e=>"urgent"===e.priority).length},Re=(new Date).getMonth(),De=(new Date).getFullYear(),Ie={total:H.length,thisMonth:H.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Re&&t.getFullYear()===De}).length,important:H.filter(e=>"important"===e.priority).length,urgent:H.filter(e=>"urgent"===e.priority).length},Oe=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),n=Math.floor(r/6e4),i=Math.floor(r/36e5),o=Math.floor(r/864e5);return n<1?"Just now":n<60?`${n}m ago`:i<24?`${i}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Le=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return q?(0,u.jsxs)(l.mc,{children:[(0,u.jsx)(l.Y9,{children:(0,u.jsx)(l.hE,{children:"Notices"})}),(0,u.jsx)(l.UC,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,u.jsxs)(l.mc,{children:[(0,u.jsxs)(l.Y9,{children:[(0,u.jsx)(l.hE,{children:"Notices"}),(0,u.jsx)(l.ex,{children:(null===X||void 0===X?void 0:X.canSend)&&(0,u.jsx)(l.$n,{variant:"primary",onClick:()=>{var e,t,r,n,i;xe({title:"",content:"",target_type:(null===X||void 0===X||null===(e=X.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===X||void 0===X||null===(r=X.foodcourts)||void 0===r||null===(n=r[0])||void 0===n||null===(i=n.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[],priority:"normal",category:"general"}),ce(!0)},children:"New Notice"})})]}),(0,u.jsxs)(l.UC,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)(m,{active:"received"===V,onClick:()=>ee("received"),children:["Received (",o.length,")"]}),(0,u.jsxs)(m,{active:"sent"===V,onClick:()=>ee("sent"),children:["Sent (",H.length,")"]})]}),"received"===V?(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{color:"#635BFF",children:[(0,u.jsx)(s.Os,{children:Ne.total}),(0,u.jsx)(s.v0,{children:"Total Received"})]}),(0,u.jsxs)(s.hI,{color:"#3B82F6",children:[(0,u.jsx)(s.Os,{children:Ne.unread}),(0,u.jsx)(s.v0,{children:"Unread"})]}),(0,u.jsxs)(s.hI,{color:"#F59E0B",children:[(0,u.jsx)(s.Os,{children:Ne.important}),(0,u.jsx)(s.v0,{children:"Important"})]}),(0,u.jsxs)(s.hI,{color:"#EF4444",children:[(0,u.jsx)(s.Os,{children:Ne.urgent}),(0,u.jsx)(s.v0,{children:"Urgent"})]})]}):(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{color:"#635BFF",children:[(0,u.jsx)(s.Os,{children:Ie.total}),(0,u.jsx)(s.v0,{children:"Total Sent"})]}),(0,u.jsxs)(s.hI,{color:"#3B82F6",children:[(0,u.jsx)(s.Os,{children:Ie.thisMonth}),(0,u.jsx)(s.v0,{children:"This Month"})]}),(0,u.jsxs)(s.hI,{color:"#F59E0B",children:[(0,u.jsx)(s.Os,{children:Ie.important}),(0,u.jsx)(s.v0,{children:"Important"})]}),(0,u.jsxs)(s.hI,{color:"#EF4444",children:[(0,u.jsx)(s.Os,{children:Ie.urgent}),(0,u.jsx)(s.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>ae(e),style:{padding:"6px 16px",borderRadius:"20px",border:oe===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:oe===e?"#F0EFFF":"white",color:oe===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:oe===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(v,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:te,onChange:e=>re(e.target.value)}),"received"===V&&(0,u.jsxs)(d.Jt,{value:le,onChange:e=>se(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(d.Jt,{value:ne,onChange:e=>ie(e.target.value),children:[(0,u.jsx)("option",{value:"",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(y,{children:[ze.map(e=>{var t,r,n;const i="received"===V&&!e.read_at;return(0,u.jsxs)(j,{unread:i,onClick:()=>(async e=>{me(e),ye(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:ke});if(t.ok){const e=await t.json();e.success&&me(e.data)}_e(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(t){console.error("Error fetching notice detail:",t)}})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,u.jsxs)(f,{children:[(0,u.jsxs)(w,{children:[i&&(0,u.jsx)(b,{}),(0,u.jsxs)("div",{children:[(0,u.jsx)(k,{children:e.title}),(0,u.jsxs)(A,{children:[(0,u.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.full_name)||"Unknown"]}),(0,u.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===V&&(0,u.jsxs)($,{children:["To: ",Le(e)]})]})]})]}),(0,u.jsxs)(F,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(C,{children:e.content}),(0,u.jsxs)(E,{children:[(0,u.jsx)("span",{children:Oe(e.createdAt)}),e.commentCount>0&&(0,u.jsxs)(S,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(n=je[String(e.id)])||void 0===n?void 0:n.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[je[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===ze.length&&(0,u.jsxs)(P,{children:[(0,u.jsx)("h3",{children:"No notices found"}),(0,u.jsx)("p",{children:"received"===V?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),de&&(0,u.jsx)(h.mH,{onClick:()=>ce(!1),children:(0,u.jsxs)(h.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(h.rQ,{children:[(0,u.jsx)(h.wt,{children:"New Notice"}),(0,u.jsx)(h.Jn,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,u.jsxs)(h.cw,{children:[(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Title *"}),(0,u.jsx)(h.ZQ,{type:"text",value:pe.title,onChange:e=>xe({...pe,title:e.target.value}),placeholder:"Notice title"})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Content *"}),(0,u.jsx)(h.Lz,{value:pe.content,onChange:e=>xe({...pe,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Attachments"}),(0,u.jsx)(c.A,{files:we,onChange:be,maxFiles:5})]}),(0,u.jsxs)(h.fh,{children:[(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Target"}),(0,u.jsx)(h.FX,{value:pe.target_type,onChange:e=>{var t,r,n;return xe({...pe,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===X||void 0===X||null===(t=X.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(n=r.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[]})},children:null===X||void 0===X||null===(e=X.targetOptions)||void 0===e?void 0:e.map(e=>(0,u.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Category"}),(0,u.jsxs)(h.FX,{value:pe.category,onChange:e=>xe({...pe,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Priority"}),(0,u.jsxs)(h.FX,{value:pe.priority,onChange:e=>xe({...pe,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===pe.target_type&&(null===X||void 0===X?void 0:X.foodcourts)&&X.foodcourts.length>0&&(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Select Foodcourt"}),(0,u.jsx)(h.FX,{value:pe.foodcourt_id,onChange:e=>xe({...pe,foodcourt_id:e.target.value}),children:X.foodcourts.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===pe.target_type&&(null===X||void 0===X?void 0:X.restaurants)&&(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Select Restaurants"}),(0,u.jsxs)(N,{children:[(0,u.jsxs)(D,{children:[pe.restaurant_ids.length," of ",X.restaurants.length," selected"]}),(0,u.jsx)(R,{onClick:()=>{if(!X)return;const e=X.restaurants.map(e=>e.id),t=e.every(e=>pe.restaurant_ids.includes(e));xe(r=>({...r,restaurant_ids:t?[]:e}))},children:pe.restaurant_ids.length===X.restaurants.length?"Deselect All":"Select All"})]}),(0,u.jsxs)(B,{children:[X.restaurants.map(e=>(0,u.jsxs)(z,{children:[(0,u.jsx)("input",{type:"checkbox",checked:pe.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void xe(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===X.restaurants.length&&(0,u.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,u.jsxs)(h.jl,{children:[(0,u.jsx)(l.$n,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,u.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(pe.title.trim()&&pe.content.trim()){ue(!0);try{const e={title:pe.title,content:pe.content,target_type:pe.target_type,priority:pe.priority,category:pe.category,attachments:we.length>0?we:void 0};"foodcourt"===pe.target_type?e.foodcourt_id=parseInt(pe.foodcourt_id):"restaurant"===pe.target_type&&(e.restaurant_ids=pe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ke,body:JSON.stringify(e)})).ok?(ce(!1),be([]),await Promise.all([Ce(),_e()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}ue(!1)}},disabled:he||!pe.title.trim()||!pe.content.trim()||"restaurant"===pe.target_type&&0===pe.restaurant_ids.length,children:he?"Sending...":"Send Notice"})]})]})}),ve&&ge&&(0,u.jsx)(h.mH,{onClick:()=>{ye(!1),me(null)},children:(0,u.jsxs)(h.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,u.jsxs)(h.rQ,{children:[(0,u.jsx)(h.wt,{children:ge.title}),(0,u.jsx)(h.Jn,{onClick:()=>{ye(!1),me(null)},children:"\xd7"})]}),(0,u.jsxs)(h.cw,{children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(L,{children:["From: ",(0,u.jsx)("strong",{style:{marginLeft:"4px"},children:ge.author_name||(null===(t=ge.author)||void 0===t?void 0:t.full_name)||"Unknown"})]}),(0,u.jsx)(L,{children:ge.author_role||(null===(r=ge.author)||void 0===r?void 0:r.role)||""}),(0,u.jsx)(L,{children:(Te=ge.createdAt,new Date(Te).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,u.jsx)(_,{priority:ge.priority,children:ge.priority})]}),(0,u.jsx)(I,{children:ge.content}),(null===ge||void 0===ge?void 0:ge.attachments)&&ge.attachments.length>0&&(0,u.jsx)("div",{style:{marginTop:"16px"},children:(0,u.jsx)(p.A,{attachments:ge.attachments})}),String(ge.author_id)===String(null===n||void 0===n?void 0:n.id)&&ge.recipients&&ge.recipients.length>0&&(0,u.jsxs)(T,{children:[(0,u.jsx)(U,{children:"Recipients"}),(0,u.jsx)(M,{children:ge.recipients.map((e,t)=>{var r,n;return(0,u.jsx)(G,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(n=e.user)||void 0===n?void 0:n.name)||`Recipient ${t+1}`},t)})})]}),(0,u.jsx)(x.A,{entityType:"notice",entityId:String(ge.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>fe(e=>{const t={...e},r=String(ge.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),String(ge.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,u.jsx)(h.jl,{children:(0,u.jsx)(Y,{children:(0,u.jsx)(J,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ke})).ok&&(ye(!1),me(null),await Promise.all([Ce(),_e()]))}catch(t){console.error("Error deleting notice:",t)}})(ge.id),children:"Delete Notice"})})})]})})]});var Te}}}]);