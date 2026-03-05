"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const a=r.Ay.div`
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
`,o=r.Ay.input`
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
`,s=r.Ay.div`
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
`,l=r.Ay.button`
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
`,d=r.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:r,...o}=e;return(0,n.jsx)(a,{className:i,style:r,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:a,...d}=e;return(0,n.jsxs)(s,{style:a,children:[(0,n.jsx)(o,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,n.jsx)(l,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},3534:(e,t,i)=>{i.r(t),i.d(t,{default:()=>oe});var r=i(9950),n=i(4752),a=i(2853),o=i(1367),s=i(2488),l=i(7455),d=i(4185),c=i(4302),p=i(9061),x=i(3832),h=i(5665),u=i(4414);const g=n.Ay.div`
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
`,m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,y=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,b=n.Ay.div`
  flex: 1;
  min-width: 0;
`,w=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,j=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,v=n.Ay.span`
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
`,F=n.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,k=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,E=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,_=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
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
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1100;
`,S=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  max-height: 90vh;
  overflow: auto;
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
`,D=n.Ay.button`
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
`,R=n.Ay.div`
  padding: 24px;
`,$=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,L=n.Ay.div`
  margin-bottom: 20px;
`,T=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,I=n.Ay.input`
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
`,O=n.Ay.select`
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
`,W=n.Ay.textarea`
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
`,U=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,G=n.Ay.label`
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
`,M=(0,n.Ay)(I)`
  margin-bottom: 8px;
`,Y=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,P=n.Ay.div`
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
`,J=n.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,Q=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,q=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,H=n.Ay.div`
  margin-bottom: 24px;
`,K=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,V=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,X=n.Ay.div`
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
`,Z=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,ee=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,te=n.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,ie=n.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,re=n.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,ne=n.Ay.button`
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
`,ae=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,oe=()=>{var e;const{user:t}=(0,o.As)(),[i,n]=(0,r.useState)([]),[oe,se]=(0,r.useState)(null),[le,de]=(0,r.useState)({}),[ce,pe]=(0,r.useState)(""),[xe,he]=(0,r.useState)("all"),[ue,ge]=(0,r.useState)("all"),[me,ye]=(0,r.useState)("newest"),[fe,be]=(0,r.useState)(!1),[we,je]=(0,r.useState)(!1),[ve,Fe]=(0,r.useState)(null),[Ae,ke]=(0,r.useState)(!1),[Ce,Ee]=(0,r.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),[_e,Be]=(0,r.useState)(""),[Se,ze]=(0,r.useState)([]),Ne=(0,r.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),De=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Ne(),cache:"no-store"});if(e.ok){const t=await e.json(),i=t.data||t,r=Array.isArray(i)?i:[];n(r),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),de(t)}}}catch(t){}})(r)}}catch(e){}},[Ne]),Re=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Ne()});if(e.ok){const t=await e.json();se(t.data||t)}}catch(e){}},[Ne]);(0,r.useEffect)(()=>{De(),Re()},[De,Re]);const $e=i.length,Le=i.filter(e=>{const t=new Date(e.createdAt),i=new Date;return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).length,Te=i.filter(e=>"important"===e.priority).length,Ie=i.filter(e=>"urgent"===e.priority).length,Oe=i.filter(e=>{const t=e.title.toLowerCase().includes(ce.toLowerCase())||e.content.toLowerCase().includes(ce.toLowerCase()),i="all"===xe||e.priority===xe,r="all"===ue||(e.category||"general")===ue;return t&&i&&r}).sort((e,t)=>{const i=new Date(e.createdAt).getTime(),r=new Date(t.createdAt).getTime();return"newest"===me?r-i:i-r}),We=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Ue=e=>e.recipients?e.recipients.length:0,Ge=e=>{Ee(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Me=()=>{Ee({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal",category:"general"}),Be(""),ze([])},Ye=(null===oe||void 0===oe||null===(e=oe.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(_e.toLowerCase())))||[];return(0,u.jsxs)(x.mc,{children:[(0,u.jsxs)(x.Y9,{children:[(0,u.jsx)(x.hE,{children:"Notices"}),(0,u.jsx)(x.ex,{children:(0,u.jsx)(x.$n,{variant:"primary",onClick:()=>be(!0),children:"New Notice"})})]}),(0,u.jsxs)(x.UC,{children:[(0,u.jsxs)(h.MD,{children:[(0,u.jsxs)(h.hI,{color:"#635BFF",children:[(0,u.jsx)(h.Os,{children:$e}),(0,u.jsx)(h.v0,{children:"Total Sent"})]}),(0,u.jsxs)(h.hI,{color:"#10B981",children:[(0,u.jsx)(h.Os,{children:Le}),(0,u.jsx)(h.v0,{children:"This Month"})]}),(0,u.jsxs)(h.hI,{color:"#F59E0B",children:[(0,u.jsx)(h.Os,{children:Te}),(0,u.jsx)(h.v0,{children:"Important"})]}),(0,u.jsxs)(h.hI,{color:"#EF4444",children:[(0,u.jsx)(h.Os,{children:Ie}),(0,u.jsx)(h.v0,{children:"Urgent"})]})]}),(0,u.jsx)("div",{style:{display:"flex",gap:"8px",marginBottom:"16px"},children:["all","general","guide"].map(e=>(0,u.jsx)("button",{onClick:()=>ge(e),style:{padding:"6px 16px",borderRadius:"20px",border:ue===e?"1.5px solid #635BFF":"1px solid #E6EBF1",background:ue===e?"#F0EFFF":"white",color:ue===e?"#635BFF":"#6B7280",fontSize:"13px",fontWeight:ue===e?600:400,cursor:"pointer",transition:"all 0.15s"},children:"all"===e?"All":"general"===e?"General":"Guide"},e))}),(0,u.jsxs)(g,{children:[(0,u.jsxs)(s.Jt,{value:xe,onChange:e=>he(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Priorities"}),(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,u.jsxs)(s.Jt,{value:me,onChange:e=>ye(e.target.value),children:[(0,u.jsx)("option",{value:"newest",children:"Newest First"}),(0,u.jsx)("option",{value:"oldest",children:"Oldest First"})]}),(0,u.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:ce,onChange:e=>pe(e.target.value)})]}),0===Oe.length?(0,u.jsxs)(a.pp,{children:[(0,u.jsx)("h3",{children:"No Notices Found"}),(0,u.jsx)("p",{children:0===i.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,u.jsx)(m,{children:Oe.map(e=>{var t,i;return(0,u.jsxs)(y,{onClick:()=>(e=>{Fe(e),je(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:"guide"===e.category?{borderLeft:"4px solid #10B981"}:void 0,children:[(0,u.jsxs)(f,{children:[(0,u.jsx)(b,{children:(0,u.jsx)(w,{children:e.title})}),(0,u.jsxs)(_,{children:["guide"===e.category&&(0,u.jsx)("span",{style:{display:"inline-block",padding:"4px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:600,background:"#D1FAE5",color:"#065F46"},children:"Guide"}),(0,u.jsx)(v,{priority:e.priority,children:e.priority})]})]}),(0,u.jsx)(j,{children:e.content}),(0,u.jsx)(F,{children:We(e)}),(0,u.jsxs)(A,{children:[(0,u.jsx)(k,{children:(0,u.jsx)(E,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,u.jsxs)(C,{children:[(0,u.jsxs)(E,{children:[Ue(e)," recipient",1!==Ue(e)?"s":""]}),(0,u.jsxs)(E,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=le[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,u.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[le[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),fe&&(0,u.jsx)(B,{onClick:()=>{be(!1),Me()},children:(0,u.jsxs)(S,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(N,{children:"New Notice"}),(0,u.jsx)(D,{onClick:()=>{be(!1),Me()},children:"\xd7"})]}),(0,u.jsxs)(R,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Target Type"}),(0,u.jsxs)(O,{value:Ce.target_type,onChange:e=>Ee(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,u.jsx)("option",{value:"all",children:"All Users"}),(0,u.jsx)("option",{value:"role",children:"By Role"}),(0,u.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===Ce.target_type&&(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Select Roles"}),(0,u.jsx)(U,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,u.jsxs)(G,{children:[(0,u.jsx)("input",{type:"checkbox",checked:Ce.target_roles.includes(e),onChange:()=>(e=>{Ee(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Ce.target_type&&(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Select Restaurants"}),(0,u.jsx)(M,{type:"text",placeholder:"Search restaurants...",value:_e,onChange:e=>Be(e.target.value)}),(0,u.jsx)(Y,{children:0===Ye.length?(0,u.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Ye.map(e=>(0,u.jsxs)(P,{selected:Ce.restaurant_ids.includes(e.id),onClick:()=>Ge(e.id),children:[(0,u.jsx)(J,{type:"checkbox",checked:Ce.restaurant_ids.includes(e.id),onChange:()=>Ge(e.id),onClick:e=>e.stopPropagation()}),(0,u.jsx)(Q,{children:e.name})]},e.id))}),Ce.restaurant_ids.length>0&&(0,u.jsxs)(q,{children:[Ce.restaurant_ids.length," restaurant",1!==Ce.restaurant_ids.length?"s":""," selected"]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Title"}),(0,u.jsx)(I,{type:"text",placeholder:"Enter notice title",value:Ce.title,onChange:e=>Ee(t=>({...t,title:e.target.value}))})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Content"}),(0,u.jsx)(W,{placeholder:"Enter notice content...",value:Ce.content,onChange:e=>Ee(t=>({...t,content:e.target.value}))})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)(T,{children:"Attachments"}),(0,u.jsx)(l.A,{files:Se,onChange:ze,maxFiles:5})]}),(0,u.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,u.jsxs)(L,{style:{flex:1},children:[(0,u.jsx)(T,{children:"Category"}),(0,u.jsxs)(O,{value:Ce.category,onChange:e=>Ee(t=>({...t,category:e.target.value})),children:[(0,u.jsx)("option",{value:"general",children:"General"}),(0,u.jsx)("option",{value:"guide",children:"Guide"})]})]}),(0,u.jsxs)(L,{style:{flex:1},children:[(0,u.jsx)(T,{children:"Priority"}),(0,u.jsxs)(O,{value:Ce.priority,onChange:e=>Ee(t=>({...t,priority:e.target.value})),children:[(0,u.jsx)("option",{value:"normal",children:"Normal"}),(0,u.jsx)("option",{value:"important",children:"Important"}),(0,u.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]})]}),(0,u.jsxs)($,{children:[(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>{be(!1),Me()},children:"Cancel"}),(0,u.jsx)(x.$n,{variant:"primary",onClick:async()=>{if(Ce.title.trim()&&Ce.content.trim()){ke(!0);try{const e={title:Ce.title,content:Ce.content,target_type:Ce.target_type,priority:Ce.priority,category:Ce.category,attachments:Se.length>0?Se:void 0};"role"===Ce.target_type&&Ce.target_roles.length>0&&(e.target_roles=Ce.target_roles),"restaurant"===Ce.target_type&&Ce.restaurant_ids.length>0&&(e.restaurant_ids=Ce.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Ne(),body:JSON.stringify(e)})).ok&&(be(!1),Me(),setActiveTab("sent"),await De())}catch(e){}finally{ke(!1)}}},disabled:Ae||!Ce.title.trim()||!Ce.content.trim(),children:Ae?"Sending...":"Send Notice"})]})]})}),we&&ve&&(0,u.jsx)(B,{onClick:()=>{je(!1),Fe(null)},children:(0,u.jsxs)(S,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(z,{children:[(0,u.jsx)(N,{children:"Notice Details"}),(0,u.jsx)(D,{onClick:()=>{je(!1),Fe(null)},children:"\xd7"})]}),(0,u.jsxs)(R,{children:[(0,u.jsxs)(H,{children:[(0,u.jsx)(V,{children:ve.title}),(0,u.jsxs)(X,{children:[(0,u.jsx)(v,{priority:ve.priority,children:ve.priority}),(0,u.jsx)(F,{children:We(ve)}),(0,u.jsx)("span",{children:(Pe=ve.createdAt,new Date(Pe).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,u.jsx)(Z,{children:ve.content.split("\n").map((e,t)=>(0,u.jsxs)(r.Fragment,{children:[t>0&&(0,u.jsx)("br",{}),(0,p.c)(e)]},t))}),(null===ve||void 0===ve?void 0:ve.attachments)&&ve.attachments.length>0&&(0,u.jsx)(d.A,{attachments:ve.attachments})]}),(0,u.jsxs)(H,{children:[(0,u.jsxs)(K,{children:["Recipients (",Ue(ve),")"]}),ve.recipients&&ve.recipients.length>0?(0,u.jsx)(ee,{children:ve.recipients.map(e=>(0,u.jsxs)(te,{isRead:!!e.read_at,children:[(0,u.jsx)(re,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,u.jsx)(ie,{children:e.user.role})]},e.id))}):(0,u.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,u.jsx)(c.A,{entityType:"notice",entityId:String(ve.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>de(e=>{const t={...e},i=String(ve.id);return t[i]&&(t[i]={...t[i],unread_count:0}),t})})]}),(0,u.jsxs)(ae,{children:[(0,u.jsx)(ne,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Ne()})).ok&&(je(!1),Fe(null),De())}catch(t){}})(ve.id),children:"Delete Notice"}),(0,u.jsx)(x.$n,{variant:"secondary",onClick:()=>{je(!1),Fe(null)},children:"Close"})]})]})})]});var Pe}}}]);