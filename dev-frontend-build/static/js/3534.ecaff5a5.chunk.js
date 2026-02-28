"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,i)=>{i.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,a=r.Ay.input`
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
`,s=r.Ay.select`
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
`,d=e=>{let{children:t,className:i,style:r,...a}=e;return(0,n.jsx)(o,{className:i,style:r,...a,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(a,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(s,{...i,children:t})}},3534:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ge});var r=i(9950),n=i(4752),o=i(2488),a=i(3832),s=i(5665),d=i(4414);const l=n.Ay.div`
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
`,c=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,h=n.Ay.div`
  flex: 1;
  min-width: 0;
`,u=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,g=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,m=n.Ay.span`
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
`,y=n.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,b=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,j=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,w=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,v=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,A=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`,F=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,k=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,_=n.Ay.button`
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
`,E=n.Ay.div`
  padding: 24px;
`,S=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,z=n.Ay.div`
  margin-bottom: 20px;
`,B=n.Ay.label`
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
`,$=n.Ay.select`
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
`,D=n.Ay.textarea`
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
`,T=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,O=n.Ay.label`
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
`,L=(0,n.Ay)(N)`
  margin-bottom: 8px;
`,I=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,R=n.Ay.div`
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
`,P=n.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,U=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,J=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,M=n.Ay.div`
  margin-bottom: 24px;
`,Y=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,W=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,G=n.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7280;
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
  gap: 8px;
`,H=n.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 12px;
  color: #374151;
`,K=n.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
  text-transform: uppercase;
`,V=n.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,X=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,Z=n.Ay.div`
  display: flex;
  gap: 12px;
`,ee=n.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,te=n.Ay.div`
  flex: 1;
  min-width: 0;
`,ie=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,re=n.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,ne=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,oe=n.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,ae=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,se=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    color: #DC2626;
    background: #FEE2E2;
  }
`,de=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`,le=n.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,ce=n.Ay.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #5A54E5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,pe=n.Ay.div`
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
`,xe=n.Ay.div`
  text-align: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 14px;
`,he=n.Ay.button`
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
`,ue=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,ge=()=>{var e;const[t,i]=(0,r.useState)([]),[n,ge]=(0,r.useState)(null),[me,ye]=(0,r.useState)([]),[fe,be]=(0,r.useState)({}),[je,we]=(0,r.useState)(""),[ve,Ae]=(0,r.useState)("all"),[Fe,ke]=(0,r.useState)("newest"),[Ce,_e]=(0,r.useState)(!1),[Ee,Se]=(0,r.useState)(!1),[ze,Be]=(0,r.useState)(null),[Ne,$e]=(0,r.useState)(!1),[De,Te]=(0,r.useState)(""),[Oe,Le]=(0,r.useState)(!1),[Ie,Re]=(0,r.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),[Pe,Ue]=(0,r.useState)(""),Je=(0,r.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),Me=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Je()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];i(n),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),be(t)}}}catch(t){}})(n)}}catch(e){}},[Je]),Ye=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Je()});if(e.ok){const t=await e.json();ge(t.data||t)}}catch(e){}},[Je]),We=(0,r.useCallback)(async e=>{try{const t=await fetch(`/api/comments/notice/${e}`,{headers:Je()});if(t.ok){const e=await t.json(),i=e.data||e;ye(Array.isArray(i)?i:[])}}catch(t){ye([])}},[Je]);(0,r.useEffect)(()=>{Me(),Ye()},[Me,Ye]);const Ge=t.length,Qe=t.filter(e=>{const t=new Date(e.createdAt),i=new Date;return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).length,qe=t.filter(e=>"important"===e.priority).length,He=t.filter(e=>"urgent"===e.priority).length,Ke=t.filter(e=>{const t=e.title.toLowerCase().includes(je.toLowerCase())||e.content.toLowerCase().includes(je.toLowerCase()),i="all"===ve||e.priority===ve;return t&&i}).sort((e,t)=>{const i=new Date(e.createdAt).getTime(),r=new Date(t.createdAt).getTime();return"newest"===Fe?r-i:i-r}),Ve=e=>new Date(e).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Xe=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Ze=e=>e.recipients?e.recipients.length:0,et=e=>{Re(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},tt=()=>{Re({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),Ue("")},it=(null===n||void 0===n||null===(e=n.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(Pe.toLowerCase())))||[];return(0,d.jsxs)(a.mc,{children:[(0,d.jsxs)(a.Y9,{children:[(0,d.jsx)(a.hE,{children:"Notices"}),(0,d.jsx)(a.ex,{children:(0,d.jsx)(a.$n,{variant:"primary",onClick:()=>_e(!0),children:"New Notice"})})]}),(0,d.jsxs)(a.UC,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{color:"#635BFF",children:[(0,d.jsx)(s.Os,{children:Ge}),(0,d.jsx)(s.v0,{children:"Total Sent"})]}),(0,d.jsxs)(s.hI,{color:"#10B981",children:[(0,d.jsx)(s.Os,{children:Qe}),(0,d.jsx)(s.v0,{children:"This Month"})]}),(0,d.jsxs)(s.hI,{color:"#F59E0B",children:[(0,d.jsx)(s.Os,{children:qe}),(0,d.jsx)(s.v0,{children:"Important"})]}),(0,d.jsxs)(s.hI,{color:"#EF4444",children:[(0,d.jsx)(s.Os,{children:He}),(0,d.jsx)(s.v0,{children:"Urgent"})]})]}),(0,d.jsxs)(l,{children:[(0,d.jsx)(o.DO,{type:"text",placeholder:"Search notices...",value:je,onChange:e=>we(e.target.value)}),(0,d.jsxs)(o.Jt,{value:ve,onChange:e=>Ae(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priorities"}),(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,d.jsxs)(o.Jt,{value:Fe,onChange:e=>ke(e.target.value),children:[(0,d.jsx)("option",{value:"newest",children:"Newest First"}),(0,d.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===Ke.length?(0,d.jsxs)(pe,{children:[(0,d.jsx)("h3",{children:"No Notices Found"}),(0,d.jsx)("p",{children:0===t.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,d.jsx)(c,{children:Ke.map(e=>{var t,i;return(0,d.jsxs)(p,{onClick:()=>(e=>{Be(e),Se(!0),We(e.id);const t=localStorage.getItem("auth_token");fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),be(t=>{const i={...t};return i[String(e.id)]&&(i[String(e.id)]={...i[String(e.id)],unread_count:0}),i})})(e),children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(u,{children:e.title})}),(0,d.jsx)(v,{children:(0,d.jsx)(m,{priority:e.priority,children:e.priority})})]}),(0,d.jsx)(g,{children:e.content}),(0,d.jsx)(y,{children:Xe(e)}),(0,d.jsxs)(f,{children:[(0,d.jsx)(b,{children:(0,d.jsx)(w,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(w,{children:[Ze(e)," recipient",1!==Ze(e)?"s":""]}),(0,d.jsxs)(w,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=fe[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,d.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[fe[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),Ce&&(0,d.jsx)(A,{onClick:()=>{_e(!1),tt()},children:(0,d.jsxs)(F,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"New Notice"}),(0,d.jsx)(_,{onClick:()=>{_e(!1),tt()},children:"\xd7"})]}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Target Type"}),(0,d.jsxs)($,{value:Ie.target_type,onChange:e=>Re(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,d.jsx)("option",{value:"all",children:"All Users"}),(0,d.jsx)("option",{value:"role",children:"By Role"}),(0,d.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===Ie.target_type&&(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Select Roles"}),(0,d.jsx)(T,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,d.jsxs)(O,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Ie.target_roles.includes(e),onChange:()=>(e=>{Re(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Ie.target_type&&(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Select Restaurants"}),(0,d.jsx)(L,{type:"text",placeholder:"Search restaurants...",value:Pe,onChange:e=>Ue(e.target.value)}),(0,d.jsx)(I,{children:0===it.length?(0,d.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):it.map(e=>(0,d.jsxs)(R,{selected:Ie.restaurant_ids.includes(e.id),onClick:()=>et(e.id),children:[(0,d.jsx)(P,{type:"checkbox",checked:Ie.restaurant_ids.includes(e.id),onChange:()=>et(e.id),onClick:e=>e.stopPropagation()}),(0,d.jsx)(U,{children:e.name})]},e.id))}),Ie.restaurant_ids.length>0&&(0,d.jsxs)(J,{children:[Ie.restaurant_ids.length," restaurant",1!==Ie.restaurant_ids.length?"s":""," selected"]})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Title"}),(0,d.jsx)(N,{type:"text",placeholder:"Enter notice title",value:Ie.title,onChange:e=>Re(t=>({...t,title:e.target.value}))})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Content"}),(0,d.jsx)(D,{placeholder:"Enter notice content...",value:Ie.content,onChange:e=>Re(t=>({...t,content:e.target.value}))})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Priority"}),(0,d.jsxs)($,{value:Ie.priority,onChange:e=>Re(t=>({...t,priority:e.target.value})),children:[(0,d.jsx)("option",{value:"normal",children:"Normal"}),(0,d.jsx)("option",{value:"important",children:"Important"}),(0,d.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>{_e(!1),tt()},children:"Cancel"}),(0,d.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Ie.title.trim()&&Ie.content.trim()){$e(!0);try{const e={title:Ie.title,content:Ie.content,target_type:Ie.target_type,priority:Ie.priority};"role"===Ie.target_type&&Ie.target_roles.length>0&&(e.target_roles=Ie.target_roles),"restaurant"===Ie.target_type&&Ie.restaurant_ids.length>0&&(e.restaurant_ids=Ie.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Je(),body:JSON.stringify(e)})).ok&&(_e(!1),tt(),Me())}catch(e){}finally{$e(!1)}}},disabled:Ne||!Ie.title.trim()||!Ie.content.trim(),children:Ne?"Sending...":"Send Notice"})]})]})}),Ee&&ze&&(0,d.jsx)(A,{onClick:()=>{Se(!1),Be(null),ye([]),Te("")},children:(0,d.jsxs)(F,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"Notice Details"}),(0,d.jsx)(_,{onClick:()=>{Se(!1),Be(null),ye([]),Te("")},children:"\xd7"})]}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(W,{children:ze.title}),(0,d.jsxs)(G,{children:[(0,d.jsx)(m,{priority:ze.priority,children:ze.priority}),(0,d.jsx)(y,{children:Xe(ze)}),(0,d.jsx)("span",{children:Ve(ze.createdAt)})]}),(0,d.jsx)(Q,{children:ze.content})]}),(0,d.jsxs)(M,{children:[(0,d.jsxs)(Y,{children:["Recipients (",Ze(ze),")"]}),ze.recipients&&ze.recipients.length>0?(0,d.jsx)(q,{children:ze.recipients.map(e=>(0,d.jsxs)(H,{children:[e.user?e.user.name:e.restaurant?e.restaurant.name:`Recipient #${e.id}`,e.user&&e.user.role&&(0,d.jsx)(K,{children:e.user.role}),e.read_at&&(0,d.jsx)("span",{style:{color:"#10B981",marginLeft:"4px",fontSize:"10px"},children:"(read)"})]},e.id))}):(0,d.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,d.jsxs)(V,{children:[(0,d.jsxs)(Y,{children:["Comments (",me.length,")"]}),0===me.length?(0,d.jsx)(xe,{children:"No comments yet"}):(0,d.jsx)(X,{children:me.map(e=>{var t,i,r,n;return(0,d.jsxs)(Z,{children:[(0,d.jsx)(ee,{children:(n=(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name,n?n.charAt(0).toUpperCase():"?")}),(0,d.jsxs)(te,{children:[(0,d.jsxs)(ie,{children:[(0,d.jsx)(re,{children:(null===(i=e.author)||void 0===i?void 0:i.name)||e.author_name}),(0,d.jsx)(ne,{children:(null===(r=e.author)||void 0===r?void 0:r.role)||e.author_role}),(0,d.jsx)(oe,{children:Ve(e.createdAt)}),(0,d.jsx)(se,{onClick:()=>(async e=>{if(ze)try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:Je()})).ok&&We(ze.id)}catch(t){}})(e.id),children:"Delete"})]}),(0,d.jsx)(ae,{children:e.content})]})]},e.id)})}),(0,d.jsxs)(de,{children:[(0,d.jsx)(le,{placeholder:"Write a comment...",value:De,onChange:e=>Te(e.target.value)}),(0,d.jsx)(ce,{onClick:async()=>{if(De.trim()&&ze){Le(!0);try{(await fetch("/api/comments",{method:"POST",headers:Je(),body:JSON.stringify({entity_type:"notice",entity_id:String(ze.id),content:De})})).ok&&(Te(""),We(ze.id))}catch(e){}finally{Le(!1)}}},disabled:Oe||!De.trim(),children:Oe?"Sending...":"Send"})]})]})]}),(0,d.jsxs)(ue,{children:[(0,d.jsx)(he,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Je()})).ok&&(Se(!1),Be(null),Me())}catch(t){}})(ze.id),children:"Delete Notice"}),(0,d.jsx)(a.$n,{variant:"secondary",onClick:()=>{Se(!1),Be(null),ye([]),Te("")},children:"Close"})]})]})})]})}}}]);