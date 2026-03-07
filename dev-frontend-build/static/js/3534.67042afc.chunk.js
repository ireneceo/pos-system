"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var i=r(4752),n=r(4414);const a=i.Ay.div`
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
`,o=i.Ay.input`
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
`,s=i.Ay.div`
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
`,l=i.Ay.button`
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
`,d=i.Ay.select`
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
`,c=e=>{let{children:t,className:r,style:i,...o}=e;return(0,n.jsx)(a,{className:r,style:i,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:i,style:a,...d}=e;return(0,n.jsxs)(s,{style:a,children:[(0,n.jsx)(o,{placeholder:t,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,n.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,n.jsx)(d,{...r,children:t})}},3534:(e,t,r)=>{r.r(t),r.d(t,{default:()=>Z});var i=r(9950),n=r(4752),a=r(2853),o=r(1367),s=r(2488),l=r(7455),d=r(4185),c=r(4302),p=r(9061),x=r(3832),h=r(5665),u=r(8409),g=r(4414);const m=n.Ay.div`
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
`,y=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

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

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }
`,w=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,b=n.Ay.div`
  flex: 1;
  min-width: 0;
`,j=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,v=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,F=n.Ay.span`
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
`,A=n.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,_=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,E=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,S=n.Ay.div`
  margin-bottom: 20px;
`,z=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,N=n.Ay.input`
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
`,D=n.Ay.select`
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
`,R=n.Ay.textarea`
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
`,$=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,L=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`,T=(0,n.Ay)(N)`
  margin-bottom: 8px;
`,I=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,O=n.Ay.div`
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
`,U=n.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,G=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,M=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,W=n.Ay.div`
  margin-bottom: 24px;
`,Y=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,J=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,P=n.Ay.div`
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
`,Q=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,q=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,H=n.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,K=n.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,V=n.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,X=n.Ay.button`
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
`,Z=(n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,()=>{var e;const{user:t}=(0,o.As)(),[r,n]=(0,i.useState)([]),[Z,ee]=(0,i.useState)(null),[te,re]=(0,i.useState)({}),[ie,ne]=(0,i.useState)(""),[ae,oe]=(0,i.useState)("all"),[se,le]=(0,i.useState)("all"),[de,ce]=(0,i.useState)("newest"),[pe,xe]=(0,i.useState)(!1),[he,ue]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(null),[ye,fe]=(0,i.useState)(!1),[we,be]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),[je,ve]=(0,i.useState)(""),[Fe,Ae]=(0,i.useState)([]),ke=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),Ce=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ke(),cache:"no-store"});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];n(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),re(t)}}}catch(t){}})(i)}}catch(e){}},[ke]),_e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ke()});if(e.ok){const t=await e.json();ee(t.data||t)}}catch(e){}},[ke]);(0,i.useEffect)(()=>{Ce(),_e()},[Ce,_e]);const Ee=r.length,Be=r.filter(e=>{const t=new Date(e.createdAt),r=new Date;return t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}).length,Se=r.filter(e=>"important"===e.priority).length,ze=r.filter(e=>"urgent"===e.priority).length,Ne=r.filter(e=>{const t=e.title.toLowerCase().includes(ie.toLowerCase())||e.content.toLowerCase().includes(ie.toLowerCase()),r="all"===ae||e.priority===ae,i="all"===se||(e.category||"general")===se;return t&&r&&i}).sort((e,t)=>{const r=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===de?i-r:r-i}),De=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Re=e=>e.recipients?e.recipients.length:0,$e=e=>{be(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Le=()=>{be({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),ve(""),Ae([])},Te=(null===Z||void 0===Z||null===(e=Z.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(je.toLowerCase())))||[];return(0,g.jsxs)(x.mc,{children:[(0,g.jsxs)(x.Y9,{children:[(0,g.jsx)(x.hE,{children:"Notices"}),(0,g.jsx)(x.ex,{children:(0,g.jsx)(x.$n,{variant:"primary",onClick:()=>xe(!0),children:"New Notice"})})]}),(0,g.jsxs)(x.UC,{children:[(0,g.jsxs)(h.MD,{children:[(0,g.jsxs)(h.hI,{color:"#635BFF",children:[(0,g.jsx)(h.Os,{children:Ee}),(0,g.jsx)(h.v0,{children:"Total Sent"})]}),(0,g.jsxs)(h.hI,{color:"#10B981",children:[(0,g.jsx)(h.Os,{children:Be}),(0,g.jsx)(h.v0,{children:"This Month"})]}),(0,g.jsxs)(h.hI,{color:"#F59E0B",children:[(0,g.jsx)(h.Os,{children:Se}),(0,g.jsx)(h.v0,{children:"Important"})]}),(0,g.jsxs)(h.hI,{color:"#EF4444",children:[(0,g.jsx)(h.Os,{children:ze}),(0,g.jsx)(h.v0,{children:"Urgent"})]})]}),(0,g.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,g.jsx)("button",{onClick:()=>le(e),style:{padding:"6px 16px",borderRadius:"20px",border:se===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:se===e?"#F0EFFF":"white",color:se===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:se===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,g.jsxs)(m,{children:[(0,g.jsxs)(s.Jt,{value:ae,onChange:e=>oe(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Priorities"}),(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,g.jsxs)(s.Jt,{value:de,onChange:e=>ce(e.target.value),children:[(0,g.jsx)("option",{value:"newest",children:"Newest First"}),(0,g.jsx)("option",{value:"oldest",children:"Oldest First"})]}),(0,g.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:ie,onChange:e=>ne(e.target.value)})]}),0===Ne.length?(0,g.jsxs)(a.pp,{children:[(0,g.jsx)("h3",{children:"No Notices Found"}),(0,g.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,g.jsx)(y,{children:Ne.map(e=>{var t,r;return(0,g.jsxs)(f,{onClick:()=>(e=>{me(e),ue(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,g.jsxs)(w,{children:[(0,g.jsx)(b,{children:(0,g.jsx)(j,{children:e.title})}),(0,g.jsxs)(B,{children:["guide"===e.category&&(0,g.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,g.jsx)(F,{priority:e.priority,children:e.priority})]})]}),(0,g.jsx)(v,{children:e.content}),(0,g.jsx)(A,{children:De(e)}),(0,g.jsxs)(k,{children:[(0,g.jsx)(C,{children:(0,g.jsx)(E,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,g.jsxs)(_,{children:[(0,g.jsxs)(E,{children:[Re(e)," recipient",1!==Re(e)?"s":""]}),(0,g.jsxs)(E,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=te[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,g.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[te[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),pe&&(0,g.jsxs)(u.aF,{isOpen:!0,onClose:()=>{xe(!1),Le()},title:"New Notice",maxWidth:"720px",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.$n,{variant:"secondary",onClick:()=>{xe(!1),Le()},children:"Cancel"}),(0,g.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(we.title.trim()&&we.content.trim()){fe(!0);try{const e={title:we.title,content:we.content,target_type:we.target_type,priority:we.priority,category:we.category,attachments:Fe.length>0?Fe:void 0};"role"===we.target_type&&we.target_roles.length>0&&(e.target_roles=we.target_roles),"restaurant"===we.target_type&&we.restaurant_ids.length>0&&(e.restaurant_ids=we.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ke(),body:JSON.stringify(e)})).ok&&(xe(!1),Le(),setActiveTab("sent"),await Ce())}catch(e){}finally{fe(!1)}}},disabled:ye||!we.title.trim()||!we.content.trim(),children:ye?"Sending...":"Send Notice"})]}),children:[(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Target Type"}),(0,g.jsxs)(D,{value:we.target_type,onChange:e=>be(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,g.jsx)("option",{value:"all",children:"All Users"}),(0,g.jsx)("option",{value:"role",children:"By Role"}),(0,g.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===we.target_type&&(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Select Roles"}),(0,g.jsx)($,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,g.jsxs)(L,{children:[(0,g.jsx)("input",{type:"checkbox",checked:we.target_roles.includes(e),onChange:()=>(e=>{be(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===we.target_type&&(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Select Restaurants"}),(0,g.jsx)(T,{type:"text",placeholder:"Search restaurants...",value:je,onChange:e=>ve(e.target.value)}),(0,g.jsx)(I,{children:0===Te.length?(0,g.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Te.map(e=>(0,g.jsxs)(O,{selected:we.restaurant_ids.includes(e.id),onClick:()=>$e(e.id),children:[(0,g.jsx)(U,{type:"checkbox",checked:we.restaurant_ids.includes(e.id),onChange:()=>$e(e.id),onClick:e=>e.stopPropagation()}),(0,g.jsx)(G,{children:e.name})]},e.id))}),we.restaurant_ids.length>0&&(0,g.jsxs)(M,{children:[we.restaurant_ids.length," restaurant",1!==we.restaurant_ids.length?"s":""," selected"]})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Title"}),(0,g.jsx)(N,{type:"text",placeholder:"Enter notice title",value:we.title,onChange:e=>be(t=>({...t,title:e.target.value}))})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Content"}),(0,g.jsx)(R,{placeholder:"Enter notice content...",value:we.content,onChange:e=>be(t=>({...t,content:e.target.value}))})]}),(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:"Attachments"}),(0,g.jsx)(l.A,{files:Fe,onChange:Ae,maxFiles:5})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,g.jsxs)(S,{style:{flex:1},children:[(0,g.jsx)(z,{children:"Category"}),(0,g.jsxs)(D,{value:we.category,onChange:e=>be(t=>({...t,category:e.target.value})),children:[(0,g.jsx)("option",{value:"general",children:"General"}),(0,g.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,g.jsxs)(S,{style:{flex:1},children:[(0,g.jsx)(z,{children:"Priority"}),(0,g.jsxs)(D,{value:we.priority,onChange:e=>be(t=>({...t,priority:e.target.value})),children:[(0,g.jsx)("option",{value:"normal",children:"Normal"}),(0,g.jsx)("option",{value:"important",children:"Important"}),(0,g.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),he&&ge&&(0,g.jsxs)(u.aF,{isOpen:!0,onClose:()=>{ue(!1),me(null)},title:"Notice Details",size:"large",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(X,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ke()})).ok&&(ue(!1),me(null),Ce())}catch(t){}})(ge.id),children:"Delete Notice"}),(0,g.jsx)(x.$n,{variant:"secondary",onClick:()=>{ue(!1),me(null)},children:"Close"})]}),children:[(0,g.jsxs)(W,{children:[(0,g.jsx)(J,{children:ge.title}),(0,g.jsxs)(P,{children:[(0,g.jsx)(F,{priority:ge.priority,children:ge.priority}),(0,g.jsx)(A,{children:De(ge)}),(0,g.jsx)("span",{children:(Ie=ge.createdAt,new Date(Ie).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,g.jsx)(Q,{children:ge.content.split("\n").map((e,t)=>(0,g.jsxs)(i.Fragment,{children:[t>0&&(0,g.jsx)("br",{}),(0,p.c)(e)]},t))}),(null===ge||void 0===ge?void 0:ge.attachments)&&ge.attachments.length>0&&(0,g.jsx)(d.A,{attachments:ge.attachments})]}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(Y,{children:["Recipients (",Re(ge),")"]}),ge.recipients&&ge.recipients.length>0?(0,g.jsx)(q,{children:ge.recipients.map(e=>(0,g.jsxs)(H,{isRead:!!e.read_at,children:[(0,g.jsx)(V,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,g.jsx)(K,{children:e.user.role})]},e.id))}):(0,g.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,g.jsx)(c.A,{entityType:"notice",entityId:String(ge.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>re(e=>{const t={...e},r=String(ge.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]});var Ie})}}]);