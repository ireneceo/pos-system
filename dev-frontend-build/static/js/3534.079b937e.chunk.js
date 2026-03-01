"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=r(8819),n=(r(9950),r(4752)),a=r(4414);const o=n.Ay.div`
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
`,s=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:r,style:i,...n}=e;return(0,a.jsx)(o,{className:r,style:i,...n,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(s,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,a.jsx)(l,{...r,children:t})}},3534:(e,t,r)=>{r.r(t),r.d(t,{default:()=>X});var i=r(8819),n=r(9950),a=r(4752),o=r(1367),s=r(2488),l=r(7455),d=r(4185),c=r(4302),p=r(2674),x=r(3832),h=r(5665),u=r(4414);const g=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }
`,j=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,w=a.Ay.div`
  flex: 1;
  min-width: 0;
`,f=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,b=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,v=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  flex-shrink: 0;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,F=a.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid ${i.w.colors.surfaceMuted};
  font-size: 12px;
  color: #6B7280;
`,k=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,C=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,_=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,E=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,S=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,B=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    border-color: ${i.w.colors.primary};
    background: #F8F7FF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`,$=(0,a.Ay)(p.ZQ)`
  margin-bottom: 8px;
`,z=a.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,R=a.Ay.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${e=>e.selected?"#F0EFFF":"transparent"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${e=>e.selected?"#F0EFFF":"#F8FAFC"};
  }
`,N=a.Ay.input`
  accent-color: ${i.w.colors.primary};
  width: 16px;
  height: 16px;
  cursor: pointer;
`,D=a.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,L=a.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,I=a.Ay.div`
  margin-bottom: 24px;
`,T=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,O=a.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,M=a.Ay.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7280;

  & > * {
    flex-shrink: 0;
  }
`,U=a.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,G=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,J=a.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,P=a.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,Y=a.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,Q=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`,W=a.Ay.button`
  padding: 8px 16px;
  background: transparent;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
  }
`,H=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,X=()=>{var e;const{user:t}=(0,o.As)(),[r,i]=(0,n.useState)([]),[a,X]=(0,n.useState)(null),[Z,q]=(0,n.useState)({}),[K,V]=(0,n.useState)(""),[ee,te]=(0,n.useState)("all"),[re,ie]=(0,n.useState)("all"),[ne,ae]=(0,n.useState)("newest"),[oe,se]=(0,n.useState)(!1),[le,de]=(0,n.useState)(!1),[ce,pe]=(0,n.useState)(null),[xe,he]=(0,n.useState)(!1),[ue,ge]=(0,n.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),[me,ye]=(0,n.useState)(""),[je,we]=(0,n.useState)([]),fe=(0,n.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),be=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:fe()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];i(n),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),q(t)}}}catch(t){}})(n)}}catch(e){}},[fe]),ve=(0,n.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:fe()});if(e.ok){const t=await e.json();X(t.data||t)}}catch(e){}},[fe]);(0,n.useEffect)(()=>{be(),ve()},[be,ve]);const Fe=r.length,Ae=r.filter(e=>{const t=new Date(e.createdAt),r=new Date;return t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}).length,ke=r.filter(e=>"important"===e.priority).length,Ce=r.filter(e=>"urgent"===e.priority).length,_e=r.filter(e=>{const t=e.title.toLowerCase().includes(K.toLowerCase())||e.content.toLowerCase().includes(K.toLowerCase()),r="all"===ee||e.priority===ee,i="all"===re||(e.category||"general")===re;return t&&r&&i}).sort((e,t)=>{const r=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===ne?i-r:r-i}),Ee=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Se=e=>e.recipients?e.recipients.length:0,Be=e=>{ge(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},$e=()=>{ge({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),ye(""),we([])},ze=(null===a||void 0===a||null===(e=a.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(me.toLowerCase())))||[];return(0,u.jsxs)(x.mc,{children:[(0,u.jsxs)(x.Y9,{children:[(0,u.jsx)(x.hE,{children:"Notices"}),(0,u.jsx)(x.ex,{children:(0,u.jsx)(x.$n,{variant:"primary",onClick:()=>se(!0),children:"New Notice"})})]}),(0,u.jsxs)(x.UC,{children:[(0,u.jsxs)(h.MD,{children:[(0,u.jsxs)(h.hI,{color:"#635BFF",children:[(0,u.jsx)(h.Os,{children:Fe}),(0,u.jsx)(h.v0,{children:"Total Sent"})]}),(0,u.jsxs)(h.hI,{color:"#10B981",children:[(0,u.jsx)(h.Os,{children:Ae}),(0,u.jsx)(h.v0,{children:"This Month"})]}),(0,u.jsxs)(h.hI,{color:"#F59E0B",children:[(0,u.jsx)(h.Os,{children:ke}),(0,u.jsx)(h.v0,{children:"Important"})]}),(0,u.jsxs)(h.hI,{color:"#EF4444",children:[(0,u.jsx)(h.Os,{children:Ce}),(0,u.jsx)(h.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>ie(e),style:{padding:"6px 16px",borderRadius:"20px",border:re===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:re===e?"#F0EFFF":"white",color:re===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:re===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(g,{children:[(0,u.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:K,onChange:e=>V(e.target.value)}),(0,u.jsxs)(s.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,u.jsxs)(s.Jt,{value:ne,onChange:e=>ae(e.target.value),children:[(0,u.jsx)("option",{value:"newest",children:"Newest First"}),(0,u.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===_e.length?(0,u.jsxs)(Q,{children:[(0,u.jsx)("h3",{children:"No Notices Found"}),(0,u.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,u.jsx)(m,{children:_e.map(e=>{var t,r;return(0,u.jsxs)(y,{onClick:()=>(e=>{pe(e),de(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,u.jsxs)(j,{children:[(0,u.jsx)(w,{children:(0,u.jsx)(f,{children:e.title})}),(0,u.jsxs)(E,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(v,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(b,{children:e.content}),(0,u.jsx)(F,{children:Ee(e)}),(0,u.jsxs)(A,{children:[(0,u.jsx)(k,{children:(0,u.jsx)(_,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(_,{children:[Se(e)," recipient",1!==Se(e)?"s":""]}),(0,u.jsxs)(_,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=Z[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Z[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),oe&&(0,u.jsx)(p.mH,{onClick:()=>{se(!1),$e()},children:(0,u.jsxs)(p.$m,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(p.rQ,{children:[(0,u.jsx)(p.wt,{children:"New Notice"}),(0,u.jsx)(p.Jn,{onClick:()=>{se(!1),$e()},children:"\xd7"})]}),(0,u.jsxs)(p.cw,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Target Type"}),(0,u.jsxs)(p.FX,{value:ue.target_type,onChange:e=>ge(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,u.jsx)("option",{value:"all",children:"All Users"}),(0,u.jsx)("option",{value:"role",children:"By Role"}),(0,u.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===ue.target_type&&(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Select Roles"}),(0,u.jsx)(S,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,u.jsxs)(B,{children:[(0,u.jsx)("input",{type:"checkbox",checked:ue.target_roles.includes(e),onChange:()=>(e=>{ge(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===ue.target_type&&(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Select Restaurants"}),(0,u.jsx)($,{type:"text",placeholder:"Search restaurants...",value:me,onChange:e=>ye(e.target.value)}),(0,u.jsx)(z,{children:0===ze.length?(0,u.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):ze.map(e=>(0,u.jsxs)(R,{selected:ue.restaurant_ids.includes(e.id),onClick:()=>Be(e.id),children:[(0,u.jsx)(N,{type:"checkbox",checked:ue.restaurant_ids.includes(e.id),onChange:()=>Be(e.id),onClick:e=>e.stopPropagation()}),(0,u.jsx)(D,{children:e.name})]},e.id))}),ue.restaurant_ids.length>0&&(0,u.jsxs)(L,{children:[ue.restaurant_ids.length," restaurant",1!==ue.restaurant_ids.length?"s":""," selected"]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Title"}),(0,u.jsx)(p.ZQ,{type:"text",placeholder:"Enter notice title",value:ue.title,onChange:e=>ge(t=>({...t,title:e.target.value}))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Content"}),(0,u.jsx)(p.Lz,{placeholder:"Enter notice content...",value:ue.content,onChange:e=>ge(t=>({...t,content:e.target.value}))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Attachments"}),(0,u.jsx)(l.A,{files:je,onChange:we,maxFiles:5})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,u.jsxs)(p.gE,{style:{flex:1},children:[(0,u.jsx)(p.lR,{children:"Category"}),(0,u.jsxs)(p.FX,{value:ue.category,onChange:e=>ge(t=>({...t,category:e.target.value})),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,u.jsxs)(p.gE,{style:{flex:1},children:[(0,u.jsx)(p.lR,{children:"Priority"}),(0,u.jsxs)(p.FX,{value:ue.priority,onChange:e=>ge(t=>({...t,priority:e.target.value})),children:[(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,u.jsxs)(p.jl,{children:[(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>{se(!1),$e()},children:"Cancel"}),(0,u.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(ue.title.trim()&&ue.content.trim()){he(!0);try{const e={title:ue.title,content:ue.content,target_type:ue.target_type,priority:ue.priority,category:ue.category,attachments:je.length>0?je:void 0};"role"===ue.target_type&&ue.target_roles.length>0&&(e.target_roles=ue.target_roles),"restaurant"===ue.target_type&&ue.restaurant_ids.length>0&&(e.restaurant_ids=ue.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:fe(),body:JSON.stringify(e)})).ok&&(se(!1),$e(),be())}catch(e){}finally{he(!1)}}},disabled:xe||!ue.title.trim()||!ue.content.trim(),children:xe?"Sending...":"Send Notice"})]})]})}),le&&ce&&(0,u.jsx)(p.mH,{onClick:()=>{de(!1),pe(null)},children:(0,u.jsxs)(p.$m,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(p.rQ,{children:[(0,u.jsx)(p.wt,{children:"Notice Details"}),(0,u.jsx)(p.Jn,{onClick:()=>{de(!1),pe(null)},children:"\xd7"})]}),(0,u.jsxs)(p.cw,{children:[(0,u.jsxs)(I,{children:[(0,u.jsx)(O,{children:ce.title}),(0,u.jsxs)(M,{children:[(0,u.jsx)(v,{priority:ce.priority,children:ce.priority}),(0,u.jsx)(F,{children:Ee(ce)}),(0,u.jsx)("span",{children:(Re=ce.createdAt,new Date(Re).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,u.jsx)(U,{children:ce.content}),(null===ce||void 0===ce?void 0:ce.attachments)&&ce.attachments.length>0&&(0,u.jsx)(d.A,{attachments:ce.attachments})]}),(0,u.jsxs)(I,{children:[(0,u.jsxs)(T,{children:["Recipients (",Se(ce),")"]}),ce.recipients&&ce.recipients.length>0?(0,u.jsx)(G,{children:ce.recipients.map(e=>(0,u.jsxs)(J,{isRead:!!e.read_at,children:[(0,u.jsx)(Y,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,u.jsx)(P,{children:e.user.role})]},e.id))}):(0,u.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,u.jsx)(c.A,{entityType:"notice",entityId:String(ce.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>q(e=>{const t={...e},r=String(ce.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),(0,u.jsxs)(H,{children:[(0,u.jsx)(W,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:fe()})).ok&&(de(!1),pe(null),be())}catch(t){}})(ce.id),children:"Delete Notice"}),(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>{de(!1),pe(null)},children:"Close"})]})]})})]});var Re}}}]);