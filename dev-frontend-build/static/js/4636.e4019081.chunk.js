"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var n=r(8819),i=(r(9950),r(4752)),a=r(4414);const o=i.Ay.div`
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
`,s=i.Ay.input`
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
`,l=i.Ay.select`
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
`,d=e=>{let{children:t,className:r,style:n,...i}=e;return(0,a.jsx)(o,{className:r,style:n,...i,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(s,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,a.jsx)(l,{...r,children:t})}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>P});var n=r(8819),i=r(9950),a=r(4752),o=r(1367),s=r(3832),l=r(5665),d=r(2488),c=r(7455),p=r(4185),x=r(4302),h=r(2674),u=r(4414);const g=a.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,m=a.Ay.button`
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
`,y=a.Ay.div`
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
`,j=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,w=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&`\n    border-left: 3px solid ${n.w.colors.primary};\n  `}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,v=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,f=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,b=a.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,_=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=a.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,A=a.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,F=a.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,C=a.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,E=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${n.w.colors.text.placeholder};
  flex-wrap: wrap;
  gap: 8px;
`,S=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,$=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,B=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,z=a.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${n.w.colors.primary};
  font-weight: 500;
`,N=a.Ay.div`
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,R=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  transition: background 0.15s;

  &:hover {
    background: ${n.w.colors.surfaceHover};
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,I=a.Ay.div`
  font-size: 12px;
  color: ${n.w.colors.text.secondary};
  margin-top: 6px;
`,D=a.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,O=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,L=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=a.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,U=a.Ay.span`
  font-size: 14px;
  color: ${n.w.colors.text.dark};
  font-weight: 500;
`,G=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,J=a.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: ${n.w.colors.danger};
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
`,M=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,P=()=>{var e,t,r;const{user:n}=(0,o.As)(),[a,P]=(0,i.useState)("received"),[Y,W]=(0,i.useState)([]),[H,Q]=(0,i.useState)([]),[X,Z]=(0,i.useState)(null),[q,K]=(0,i.useState)(""),[V,ee]=(0,i.useState)(""),[te,re]=(0,i.useState)("all"),[ne,ie]=(0,i.useState)("all"),[ae,oe]=(0,i.useState)(!1),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal",category:"general"}),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)([]),[ge,me]=(0,i.useState)(!1),[ye,je]=(0,i.useState)(null),[we,ve]=(0,i.useState)({}),fe=(0,i.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),be=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ve(e=>({...e,...t}))}}}catch(t){}},_e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:fe()});if(e.ok){const t=await e.json();Z(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[fe]),ke=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:fe()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];W(n),be(n)}}catch(e){console.error("Error fetching received notices:",e)}},[fe]),Ae=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:fe()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];Q(n),be(n)}}catch(e){console.error("Error fetching sent notices:",e)}},[fe]),Fe=(0,i.useCallback)(async()=>{oe(!0),await Promise.all([_e(),ke(),Ae()]),oe(!1)},[_e,ke,Ae]);(0,i.useEffect)(()=>{n&&Fe()},[n,Fe]);const Ce=async e=>{je(e),me(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:fe()});if(t.ok){const e=await t.json(),r=e.data||e;je(r),ke(),window.dispatchEvent(new Event("refreshBadgeCounts"))}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Ee=("received"===a?Y:H).filter(e=>{const t=!q||e.title.toLowerCase().includes(q.toLowerCase())||e.content.toLowerCase().includes(q.toLowerCase()),r=!V||e.priority===V,n="all"===te||(e.category||"general")===te,i="all"===ne||"sent"===a||e.author_role===ne;return t&&r&&n&&i}),Se=Y.length,$e=Y.filter(e=>!e.read_at).length,Be=Y.filter(e=>"important"===e.priority).length,ze=Y.filter(e=>"urgent"===e.priority).length,Ne=H.length,Re=H.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Ie=H.filter(e=>"important"===e.priority).length,De=H.filter(e=>"urgent"===e.priority).length,Oe=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Le=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,Te=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,u.jsxs)(s.mc,{children:[(0,u.jsxs)(s.Y9,{children:[(0,u.jsx)(s.hE,{children:"Notices"}),(0,u.jsx)(s.ex,{children:(0,u.jsx)(s.$n,{variant:"primary",onClick:()=>{ce({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),ue([]),le(!0)},children:"New Notice"})})]}),(0,u.jsxs)(s.UC,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)(m,{active:"received"===a,onClick:()=>P("received"),children:["Received (",Se,")"]}),(0,u.jsxs)(m,{active:"sent"===a,onClick:()=>P("sent"),children:["Sent (",Ne,")"]})]}),"received"===a?(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#635BFF",children:[(0,u.jsx)(l.Os,{children:Se}),(0,u.jsx)(l.v0,{children:"Total Received"})]}),(0,u.jsxs)(l.hI,{color:"#F59E0B",children:[(0,u.jsx)(l.Os,{children:$e}),(0,u.jsx)(l.v0,{children:"Unread"})]}),(0,u.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,u.jsx)(l.Os,{children:Be}),(0,u.jsx)(l.v0,{children:"Important"})]}),(0,u.jsxs)(l.hI,{color:"#EF4444",children:[(0,u.jsx)(l.Os,{children:ze}),(0,u.jsx)(l.v0,{children:"Urgent"})]})]}):(0,u.jsxs)(l.MD,{children:[(0,u.jsxs)(l.hI,{color:"#635BFF",children:[(0,u.jsx)(l.Os,{children:Ne}),(0,u.jsx)(l.v0,{children:"Total Sent"})]}),(0,u.jsxs)(l.hI,{color:"#10B981",children:[(0,u.jsx)(l.Os,{children:Re}),(0,u.jsx)(l.v0,{children:"This Month"})]}),(0,u.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,u.jsx)(l.Os,{children:Ie}),(0,u.jsx)(l.v0,{children:"Important"})]}),(0,u.jsxs)(l.hI,{color:"#EF4444",children:[(0,u.jsx)(l.Os,{children:De}),(0,u.jsx)(l.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>re(e),style:{padding:"6px 16px",borderRadius:"20px",border:te===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:te===e?"#F0EFFF":"white",color:te===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:te===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(y,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:q,onChange:e=>K(e.target.value)}),"received"===a&&(0,u.jsxs)(d.Jt,{value:ne,onChange:e=>ie(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Senders"}),(0,u.jsx)("option",{value:"System Admin",children:"System Admin"}),(0,u.jsx)("option",{value:"Brand General",children:"Brand General"}),(0,u.jsx)("option",{value:"Foodcourt General",children:"Foodcourt General"}),(0,u.jsx)("option",{value:"Restaurant Owner",children:"Restaurant Owner"})]}),(0,u.jsxs)(d.Jt,{value:V,onChange:e=>ee(e.target.value),children:[(0,u.jsx)("option",{value:"",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,u.jsxs)(j,{children:[ae&&0===Ee.length&&(0,u.jsx)(G,{children:(0,u.jsx)("p",{children:"Loading notices..."})}),!ae&&0===Ee.length&&(0,u.jsxs)(G,{children:[(0,u.jsx)("h3",{children:"No notices found"}),(0,u.jsx)("p",{children:"received"===a?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Ee.map(e=>{var t,r;return(0,u.jsxs)(w,{unread:"received"===a&&!e.read_at,onClick:()=>Ce(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:["received"===a&&!e.read_at&&(0,u.jsx)(b,{}),(0,u.jsx)(_,{children:e.title})]}),(0,u.jsxs)(k,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(A,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(C,{children:e.content}),(0,u.jsxs)(E,{children:[(0,u.jsx)(S,{children:"received"===a?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(B,{children:[e.author_name||"Unknown",(0,u.jsx)(F,{children:e.author_role||"Admin"})]})}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(B,{children:["To: ",Oe(e)]}),(0,u.jsxs)(B,{children:[Le(e),"/",Te(e)," read"]})]})}),(0,u.jsxs)($,{children:[e.commentCount>0&&(0,u.jsxs)(z,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=we[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[we[String(e.id)].unread_count," new"]})]}),(0,u.jsx)(B,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),se&&(0,u.jsx)(h.mH,{onClick:()=>le(!1),children:(0,u.jsxs)(h.$m,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(h.rQ,{children:[(0,u.jsx)(h.wt,{children:"New Notice"}),(0,u.jsx)(h.Jn,{onClick:()=>le(!1),children:"\xd7"})]}),(0,u.jsxs)(h.cw,{children:[(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Title *"}),(0,u.jsx)(h.ZQ,{type:"text",placeholder:"Enter notice title",value:de.title,onChange:e=>ce({...de,title:e.target.value})})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Content *"}),(0,u.jsx)(h.Lz,{placeholder:"Enter notice content...",value:de.content,onChange:e=>ce({...de,content:e.target.value})})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Attachments"}),(0,u.jsx)(c.A,{files:he,onChange:ue,maxFiles:5})]}),(0,u.jsxs)(h.fh,{children:[(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Target Type *"}),(0,u.jsxs)(h.FX,{value:de.target_type,onChange:e=>ce({...de,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,u.jsx)("option",{value:"",children:"Select target..."}),(null===X||void 0===X||null===(e=X.targetOptions)||void 0===e?void 0:e.map(e=>(0,u.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("option",{value:"brand",children:"By Brand"}),(0,u.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Category"}),(0,u.jsxs)(h.FX,{value:de.category,onChange:e=>ce({...de,category:e.target.value}),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Priority"}),(0,u.jsxs)(h.FX,{value:de.priority,onChange:e=>ce({...de,priority:e.target.value}),children:[(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"brand"===de.target_type&&(null===X||void 0===X?void 0:X.brands)&&(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Select Brand *"}),(0,u.jsxs)(h.FX,{value:de.brand_id,onChange:e=>ce({...de,brand_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Choose a brand..."}),X.brands.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===de.target_type&&(null===X||void 0===X?void 0:X.restaurants)&&(0,u.jsxs)(h.gE,{children:[(0,u.jsx)(h.lR,{children:"Select Restaurants *"}),(0,u.jsxs)(N,{children:[X.restaurants.map(e=>(0,u.jsxs)(R,{children:[(0,u.jsx)("input",{type:"checkbox",checked:de.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ce(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===X.restaurants.length&&(0,u.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,u.jsxs)(I,{children:[de.restaurant_ids.length," restaurant",1!==de.restaurant_ids.length?"s":""," selected"]})]})]}),(0,u.jsxs)(h.jl,{children:[(0,u.jsx)(s.$n,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,u.jsx)(s.$n,{variant:"primary",onClick:async()=>{if(de.title.trim()&&de.content.trim()&&de.target_type){xe(!0);try{const e={title:de.title.trim(),content:de.content.trim(),target_type:de.target_type,priority:de.priority,category:de.category,attachments:he.length>0?he:void 0};"brand"===de.target_type&&de.brand_id&&(e.brand_id=Number(de.brand_id)),"select_restaurants"===de.target_type&&de.restaurant_ids.length>0&&(e.restaurant_ids=de.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:fe(),body:JSON.stringify(e)})).ok&&(le(!1),ue([]),Ae())}catch(e){console.error("Error creating notice:",e)}finally{xe(!1)}}},disabled:pe||!de.title.trim()||!de.content.trim()||!de.target_type||"brand"===de.target_type&&!de.brand_id||"select_restaurants"===de.target_type&&0===de.restaurant_ids.length,children:pe?"Sending...":"Send Notice"})]})]})}),ge&&ye&&(0,u.jsx)(h.mH,{onClick:()=>{me(!1),je(null)},children:(0,u.jsxs)(h.$m,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(h.rQ,{children:[(0,u.jsx)(h.wt,{children:ye.title}),(0,u.jsxs)(M,{children:[(0,u.jsx)(A,{priority:ye.priority,children:ye.priority}),(Ge=ye,String(Ge.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,u.jsx)(J,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:fe()})).ok&&(me(!1),je(null),Ae(),ke())}catch(t){console.error("Error deleting notice:",t)}})(ye.id),children:"Delete"})),(0,u.jsx)(h.Jn,{onClick:()=>{me(!1),je(null)},children:"\xd7"})]})]}),(0,u.jsxs)(h.cw,{children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"From"}),(0,u.jsxs)(U,{children:[ye.author_name||(null===(t=ye.author)||void 0===t?void 0:t.full_name)||"Unknown"," ","(",ye.author_role||(null===(r=ye.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"To"}),(0,u.jsx)(U,{children:Oe(ye)})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Date"}),(0,u.jsx)(U,{children:(Ue=ye.createdAt,new Date(Ue).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),ye.recipients&&ye.recipients.length>0&&(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Read Status"}),(0,u.jsxs)(U,{children:[Le(ye),"/",Te(ye)," read"]})]})]}),(0,u.jsx)(D,{children:ye.content}),(null===ye||void 0===ye?void 0:ye.attachments)&&ye.attachments.length>0&&(0,u.jsx)(p.A,{attachments:ye.attachments}),(0,u.jsx)(x.A,{entityType:"notice",entityId:String(ye.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>ve(e=>{const t={...e},r=String(ye.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]});var Ue,Ge}}}]);