"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,a=i.Ay.input`
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
`,s=i.Ay.select`
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
`,d=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ie});var i=r(9950),n=r(4752),o=r(1367),a=r(3832),s=r(5665),d=r(2488),l=r(7455),c=r(4185),p=r(4302),x=r(4414);const h=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,u=n.Ay.button`
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
`,g=n.Ay.div`
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
`,m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,f=n.Ay.div`
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
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,y=n.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,j=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,b=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,A=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,F=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,C=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,_=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,E=n.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,B=n.Ay.div`
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
`,S=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,z=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,N=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=n.Ay.button`
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
`,D=n.Ay.div`
  padding: 24px;
`,I=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,O=n.Ay.div`
  margin-bottom: 20px;
`,T=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,U=n.Ay.input`
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
`,M=n.Ay.select`
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
`,L=n.Ay.textarea`
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
`,R=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,P=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,Y=n.Ay.label`
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
`,J=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,W=n.Ay.button`
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
`,Q=n.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,q=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,G=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,H=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,K=n.Ay.div`
  margin-bottom: 24px;
`,V=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,X=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Z=n.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,ee=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,te=n.Ay.button`
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
`,re=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ie=()=>{var e,t,r;const{user:n}=(0,o.As)(),[ie,ne]=(0,i.useState)([]),[oe,ae]=(0,i.useState)([]),[se,de]=(0,i.useState)(null),[le,ce]=(0,i.useState)(!0),[pe,xe]=(0,i.useState)("received"),[he,ue]=(0,i.useState)(""),[ge,me]=(0,i.useState)(""),[fe,ve]=(0,i.useState)(!1),[ye,je]=(0,i.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal"}),[be,we]=(0,i.useState)(!1),[Ae,Fe]=(0,i.useState)(null),[ke,Ce]=(0,i.useState)(!1),[_e,Ee]=(0,i.useState)({}),[Be,Se]=(0,i.useState)([]),ze={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},Ne=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ee(e=>({...e,...t}))}}}catch(t){}},$e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ze});if(e.ok){const t=await e.json();t.success&&de(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),De=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:ze});if(e.ok){const t=await e.json();t.success&&(ne(t.data),Ne(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),Ie=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ze});if(e.ok){const t=await e.json();t.success&&(ae(t.data),Ne(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Oe=(0,i.useCallback)(async()=>{ce(!0),await Promise.all([$e(),De(),Ie()]),ce(!1)},[$e,De,Ie]);(0,i.useEffect)(()=>{n&&Oe()},[n,Oe]);const Te=e=>e.filter(e=>{var t;const r=!he||e.title.toLowerCase().includes(he.toLowerCase())||(null===(t=e.author_name)||void 0===t?void 0:t.toLowerCase().includes(he.toLowerCase())),i=!ge||e.priority===ge;return r&&i}),Ue=Te(ie),Me=Te(oe),Le="received"===pe?Ue:Me,Re={total:ie.length,unread:ie.filter(e=>!e.read_at).length,important:ie.filter(e=>"important"===e.priority).length,urgent:ie.filter(e=>"urgent"===e.priority).length},Pe=(new Date).getMonth(),Ye=(new Date).getFullYear(),Je={total:oe.length,thisMonth:oe.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===Pe&&t.getFullYear()===Ye}).length,important:oe.filter(e=>"important"===e.priority).length,urgent:oe.filter(e=>"urgent"===e.priority).length},We=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4),n=Math.floor(r/36e5),o=Math.floor(r/864e5);return i<1?"Just now":i<60?`${i}m ago`:n<24?`${n}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},Qe=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return le?(0,x.jsxs)(a.mc,{children:[(0,x.jsx)(a.Y9,{children:(0,x.jsx)(a.hE,{children:"Notices"})}),(0,x.jsx)(a.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,x.jsxs)(a.mc,{children:[(0,x.jsxs)(a.Y9,{children:[(0,x.jsx)(a.hE,{children:"Notices"}),(0,x.jsx)(a.ex,{children:(null===se||void 0===se?void 0:se.canSend)&&(0,x.jsx)(a.$n,{variant:"primary",onClick:()=>{var e,t,r,i,n;je({title:"",content:"",target_type:(null===se||void 0===se||null===(e=se.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===se||void 0===se||null===(r=se.foodcourts)||void 0===r||null===(i=r[0])||void 0===i||null===(n=i.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[],priority:"normal"}),ve(!0)},children:"New Notice"})})]}),(0,x.jsxs)(a.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{active:"received"===pe,onClick:()=>xe("received"),children:["Received (",ie.length,")"]}),(0,x.jsxs)(u,{active:"sent"===pe,onClick:()=>xe("sent"),children:["Sent (",oe.length,")"]})]}),"received"===pe?(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Re.total}),(0,x.jsx)(s.v0,{children:"Total Received"})]}),(0,x.jsxs)(s.hI,{color:"#3B82F6",children:[(0,x.jsx)(s.Os,{children:Re.unread}),(0,x.jsx)(s.v0,{children:"Unread"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Re.important}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Re.urgent}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}):(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Je.total}),(0,x.jsx)(s.v0,{children:"Total Sent"})]}),(0,x.jsxs)(s.hI,{color:"#3B82F6",children:[(0,x.jsx)(s.Os,{children:Je.thisMonth}),(0,x.jsx)(s.v0,{children:"This Month"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Je.important}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Je.urgent}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:he,onChange:e=>ue(e.target.value)}),(0,x.jsxs)(d.Jt,{value:ge,onChange:e=>me(e.target.value),children:[(0,x.jsx)("option",{value:"",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(m,{children:[Le.map(e=>{var t,r,i;const n="received"===pe&&!e.read_at;return(0,x.jsxs)(f,{unread:n,onClick:()=>(async e=>{Fe(e),Ce(!0);try{const t=await fetch(`/api/notices/${e.id}`,{headers:ze});if(t.ok){const e=await t.json();e.success&&Fe(e.data)}De()}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(y,{children:[n&&(0,x.jsx)(j,{}),(0,x.jsxs)("div",{children:[(0,x.jsx)(b,{children:e.title}),(0,x.jsxs)(w,{children:[(0,x.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"Unknown"]}),(0,x.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===pe&&(0,x.jsxs)(E,{children:["To: ",Qe(e)]})]})]})]}),(0,x.jsx)(A,{children:(0,x.jsx)(F,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(k,{children:e.content}),(0,x.jsxs)(C,{children:[(0,x.jsx)("span",{children:We(e.createdAt)}),e.commentCount>0&&(0,x.jsxs)(_,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(i=_e[String(e.id)])||void 0===i?void 0:i.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[_e[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===Le.length&&(0,x.jsxs)(ee,{children:[(0,x.jsx)("h3",{children:"No notices found"}),(0,x.jsx)("p",{children:"received"===pe?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),fe&&(0,x.jsx)(B,{onClick:()=>ve(!1),children:(0,x.jsxs)(S,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(N,{children:"New Notice"}),(0,x.jsx)($,{onClick:()=>ve(!1),children:"\xd7"})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Title *"}),(0,x.jsx)(U,{type:"text",value:ye.title,onChange:e=>je({...ye,title:e.target.value}),placeholder:"Notice title"})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Content *"}),(0,x.jsx)(L,{value:ye.content,onChange:e=>je({...ye,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Attachments"}),(0,x.jsx)(l.A,{files:Be,onChange:Se,maxFiles:5})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Target"}),(0,x.jsx)(M,{value:ye.target_type,onChange:e=>{var t,r,i;return je({...ye,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===se||void 0===se||null===(t=se.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(i=r.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[]})},children:null===se||void 0===se||null===(e=se.targetOptions)||void 0===e?void 0:e.map(e=>(0,x.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Priority"}),(0,x.jsxs)(M,{value:ye.priority,onChange:e=>je({...ye,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===ye.target_type&&(null===se||void 0===se?void 0:se.foodcourts)&&se.foodcourts.length>0&&(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Select Foodcourt"}),(0,x.jsx)(M,{value:ye.foodcourt_id,onChange:e=>je({...ye,foodcourt_id:e.target.value}),children:se.foodcourts.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===ye.target_type&&(null===se||void 0===se?void 0:se.restaurants)&&(0,x.jsxs)(O,{children:[(0,x.jsx)(T,{children:"Select Restaurants"}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(Q,{children:[ye.restaurant_ids.length," of ",se.restaurants.length," selected"]}),(0,x.jsx)(W,{onClick:()=>{if(!se)return;const e=se.restaurants.map(e=>e.id),t=e.every(e=>ye.restaurant_ids.includes(e));je(r=>({...r,restaurant_ids:t?[]:e}))},children:ye.restaurant_ids.length===se.restaurants.length?"Deselect All":"Select All"})]}),(0,x.jsxs)(P,{children:[se.restaurants.map(e=>(0,x.jsxs)(Y,{children:[(0,x.jsx)("input",{type:"checkbox",checked:ye.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void je(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===se.restaurants.length&&(0,x.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsx)(a.$n,{variant:"secondary",onClick:()=>ve(!1),children:"Cancel"}),(0,x.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(ye.title.trim()&&ye.content.trim()){we(!0);try{const e={title:ye.title,content:ye.content,target_type:ye.target_type,priority:ye.priority,attachments:Be.length>0?Be:void 0};"foodcourt"===ye.target_type?e.foodcourt_id=parseInt(ye.foodcourt_id):"restaurant"===ye.target_type&&(e.restaurant_ids=ye.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ze,body:JSON.stringify(e)})).ok?(ve(!1),Se([]),await Promise.all([Ie(),De()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}we(!1)}},disabled:be||!ye.title.trim()||!ye.content.trim()||"restaurant"===ye.target_type&&0===ye.restaurant_ids.length,children:be?"Sending...":"Send Notice"})]})]})}),ke&&Ae&&(0,x.jsx)(B,{onClick:()=>{Ce(!1),Fe(null)},children:(0,x.jsxs)(S,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(N,{children:Ae.title}),(0,x.jsx)($,{onClick:()=>{Ce(!1),Fe(null)},children:"\xd7"})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(G,{children:[(0,x.jsxs)(H,{children:["From: ",(0,x.jsx)("strong",{style:{marginLeft:"4px"},children:Ae.author_name||(null===(t=Ae.author)||void 0===t?void 0:t.name)||"Unknown"})]}),(0,x.jsx)(H,{children:Ae.author_role||(null===(r=Ae.author)||void 0===r?void 0:r.role)||""}),(0,x.jsx)(H,{children:(qe=Ae.createdAt,new Date(qe).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))}),(0,x.jsx)(F,{priority:Ae.priority,children:Ae.priority})]}),(0,x.jsx)(q,{children:Ae.content}),(null===Ae||void 0===Ae?void 0:Ae.attachments)&&Ae.attachments.length>0&&(0,x.jsx)("div",{style:{marginTop:"16px"},children:(0,x.jsx)(c.A,{attachments:Ae.attachments})}),String(Ae.author_id)===String(null===n||void 0===n?void 0:n.id)&&Ae.recipients&&Ae.recipients.length>0&&(0,x.jsxs)(K,{children:[(0,x.jsx)(V,{children:"Recipients"}),(0,x.jsx)(X,{children:Ae.recipients.map((e,t)=>{var r,i;return(0,x.jsx)(Z,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(i=e.user)||void 0===i?void 0:i.name)||`Recipient ${t+1}`},t)})})]}),(0,x.jsx)(p.A,{entityType:"notice",entityId:String(Ae.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>Ee(e=>{const t={...e},r=String(Ae.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),String(Ae.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,x.jsx)(I,{children:(0,x.jsx)(re,{children:(0,x.jsx)(te,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ze})).ok&&(Ce(!1),Fe(null),await Promise.all([Ie(),De()]))}catch(t){console.error("Error deleting notice:",t)}})(Ae.id),children:"Delete Notice"})})})]})})]});var qe}}}]);