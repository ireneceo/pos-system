"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,i)=>{i.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,l=e=>{let{children:t,className:i,style:r,...a}=e;return(0,n.jsx)(o,{className:i,style:r,...a,children:t})},d=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(a,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(s,{...i,children:t})}},3534:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ye});var r=i(9950),n=i(4752),o=i(2488),a=i(7455),s=i(4185),l=i(3832),d=i(5665),c=i(4414);const p=n.Ay.div`
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
`,x=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,h=n.Ay.div`
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
`,g=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,m=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,f=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,y=n.Ay.span`
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
`,b=n.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,j=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,w=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,v=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,A=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,F=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,k=n.Ay.div`
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
`,C=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,E=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,B=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,z=n.Ay.button`
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
`,_=n.Ay.div`
  padding: 24px;
`,S=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,D=n.Ay.div`
  margin-bottom: 20px;
`,$=n.Ay.label`
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
`,T=n.Ay.select`
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
`,O=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,I=n.Ay.label`
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
`,P=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,M=n.Ay.div`
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
`,W=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,J=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,Y=n.Ay.div`
  margin-bottom: 24px;
`,G=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,K=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,Q=n.Ay.div`
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
`,X=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,Z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,q=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  border-left: 3px solid ${e=>e.isRead?"#10B981":"#D1D5DB"};
`,H=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: 6px;
`,V=n.Ay.span`
  font-size: 11px;
  color: ${e=>e.isRead?"#10B981":"#9CA3AF"};
  font-weight: 500;
`,ee=n.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,te=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`,ie=n.Ay.div`
  display: flex;
  gap: 12px;
`,re=n.Ay.div`
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
`,ne=n.Ay.div`
  flex: 1;
  min-width: 0;
`,oe=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,ae=n.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,se=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,le=n.Ay.span`
  font-size: 12px;
  color: #9CA3AF;
`,de=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,ce=n.Ay.button`
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
`,pe=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`,xe=n.Ay.textarea`
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
`,he=n.Ay.button`
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
`,ge=n.Ay.div`
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
`,ue=n.Ay.div`
  text-align: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 14px;
`,me=n.Ay.button`
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
`,fe=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,ye=()=>{var e;const[t,i]=(0,r.useState)([]),[n,ye]=(0,r.useState)(null),[be,je]=(0,r.useState)([]),[we,ve]=(0,r.useState)({}),[Ae,Fe]=(0,r.useState)(""),[ke,Ce]=(0,r.useState)("all"),[Ee,Be]=(0,r.useState)("newest"),[ze,_e]=(0,r.useState)(!1),[Se,De]=(0,r.useState)(!1),[$e,Ne]=(0,r.useState)(null),[Te,Re]=(0,r.useState)(!1),[Oe,Ie]=(0,r.useState)(""),[Le,Pe]=(0,r.useState)(!1),[Me,Ue]=(0,r.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),[We,Je]=(0,r.useState)(""),[Ye,Ge]=(0,r.useState)([]),Ke=(0,r.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),Qe=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Ke()});if(e.ok){const t=await e.json(),r=t.data||t,n=Array.isArray(r)?r:[];i(n),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),i=e.map(e=>e.id).join(","),r=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${i}`,{headers:{Authorization:`Bearer ${t}`}});if(r.ok){const e=await r.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),ve(t)}}}catch(t){}})(n)}}catch(e){}},[Ke]),Xe=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Ke()});if(e.ok){const t=await e.json();ye(t.data||t)}}catch(e){}},[Ke]),Ze=(0,r.useCallback)(async e=>{try{const t=await fetch(`/api/comments/notice/${e}`,{headers:Ke()});if(t.ok){const e=await t.json(),i=e.data||e;je(Array.isArray(i)?i:[])}}catch(t){je([])}},[Ke]);(0,r.useEffect)(()=>{Qe(),Xe()},[Qe,Xe]);const qe=t.length,He=t.filter(e=>{const t=new Date(e.createdAt),i=new Date;return t.getMonth()===i.getMonth()&&t.getFullYear()===i.getFullYear()}).length,Ve=t.filter(e=>"important"===e.priority).length,et=t.filter(e=>"urgent"===e.priority).length,tt=t.filter(e=>{const t=e.title.toLowerCase().includes(Ae.toLowerCase())||e.content.toLowerCase().includes(Ae.toLowerCase()),i="all"===ke||e.priority===ke;return t&&i}).sort((e,t)=>{const i=new Date(e.createdAt).getTime(),r=new Date(t.createdAt).getTime();return"newest"===Ee?r-i:i-r}),it=e=>new Date(e).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),rt=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},nt=e=>e.recipients?e.recipients.length:0,ot=e=>{Ue(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},at=()=>{Ue({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),Je(""),Ge([])},st=(null===n||void 0===n||null===(e=n.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(We.toLowerCase())))||[];return(0,c.jsxs)(l.mc,{children:[(0,c.jsxs)(l.Y9,{children:[(0,c.jsx)(l.hE,{children:"Notices"}),(0,c.jsx)(l.ex,{children:(0,c.jsx)(l.$n,{variant:"primary",onClick:()=>_e(!0),children:"New Notice"})})]}),(0,c.jsxs)(l.UC,{children:[(0,c.jsxs)(d.MD,{children:[(0,c.jsxs)(d.hI,{color:"#635BFF",children:[(0,c.jsx)(d.Os,{children:qe}),(0,c.jsx)(d.v0,{children:"Total Sent"})]}),(0,c.jsxs)(d.hI,{color:"#10B981",children:[(0,c.jsx)(d.Os,{children:He}),(0,c.jsx)(d.v0,{children:"This Month"})]}),(0,c.jsxs)(d.hI,{color:"#F59E0B",children:[(0,c.jsx)(d.Os,{children:Ve}),(0,c.jsx)(d.v0,{children:"Important"})]}),(0,c.jsxs)(d.hI,{color:"#EF4444",children:[(0,c.jsx)(d.Os,{children:et}),(0,c.jsx)(d.v0,{children:"Urgent"})]})]}),(0,c.jsxs)(p,{children:[(0,c.jsx)(o.DO,{type:"text",placeholder:"Search notices...",value:Ae,onChange:e=>Fe(e.target.value)}),(0,c.jsxs)(o.Jt,{value:ke,onChange:e=>Ce(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priorities"}),(0,c.jsx)("option",{value:"normal",children:"Normal"}),(0,c.jsx)("option",{value:"important",children:"Important"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,c.jsxs)(o.Jt,{value:Ee,onChange:e=>Be(e.target.value),children:[(0,c.jsx)("option",{value:"newest",children:"Newest First"}),(0,c.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===tt.length?(0,c.jsxs)(ge,{children:[(0,c.jsx)("h3",{children:"No Notices Found"}),(0,c.jsx)("p",{children:0===t.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,c.jsx)(x,{children:tt.map(e=>{var t,i;return(0,c.jsxs)(h,{onClick:()=>(e=>{Ne(e),De(!0),Ze(e.id);const t=localStorage.getItem("auth_token");fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),ve(t=>{const i={...t};return i[String(e.id)]&&(i[String(e.id)]={...i[String(e.id)],unread_count:0}),i})})(e),children:[(0,c.jsxs)(g,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(m,{children:e.title})}),(0,c.jsx)(F,{children:(0,c.jsx)(y,{priority:e.priority,children:e.priority})})]}),(0,c.jsx)(f,{children:e.content}),(0,c.jsx)(b,{children:rt(e)}),(0,c.jsxs)(j,{children:[(0,c.jsx)(w,{children:(0,c.jsx)(A,{children:(i=e.createdAt,new Date(i).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,c.jsxs)(v,{children:[(0,c.jsxs)(A,{children:[nt(e)," recipient",1!==nt(e)?"s":""]}),(0,c.jsxs)(A,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=we[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[we[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),ze&&(0,c.jsx)(k,{onClick:()=>{_e(!1),at()},children:(0,c.jsxs)(C,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"New Notice"}),(0,c.jsx)(z,{onClick:()=>{_e(!1),at()},children:"\xd7"})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Target Type"}),(0,c.jsxs)(T,{value:Me.target_type,onChange:e=>Ue(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,c.jsx)("option",{value:"all",children:"All Users"}),(0,c.jsx)("option",{value:"role",children:"By Role"}),(0,c.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===Me.target_type&&(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Select Roles"}),(0,c.jsx)(O,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,c.jsxs)(I,{children:[(0,c.jsx)("input",{type:"checkbox",checked:Me.target_roles.includes(e),onChange:()=>(e=>{Ue(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Me.target_type&&(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Select Restaurants"}),(0,c.jsx)(L,{type:"text",placeholder:"Search restaurants...",value:We,onChange:e=>Je(e.target.value)}),(0,c.jsx)(P,{children:0===st.length?(0,c.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):st.map(e=>(0,c.jsxs)(M,{selected:Me.restaurant_ids.includes(e.id),onClick:()=>ot(e.id),children:[(0,c.jsx)(U,{type:"checkbox",checked:Me.restaurant_ids.includes(e.id),onChange:()=>ot(e.id),onClick:e=>e.stopPropagation()}),(0,c.jsx)(W,{children:e.name})]},e.id))}),Me.restaurant_ids.length>0&&(0,c.jsxs)(J,{children:[Me.restaurant_ids.length," restaurant",1!==Me.restaurant_ids.length?"s":""," selected"]})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Title"}),(0,c.jsx)(N,{type:"text",placeholder:"Enter notice title",value:Me.title,onChange:e=>Ue(t=>({...t,title:e.target.value}))})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Content"}),(0,c.jsx)(R,{placeholder:"Enter notice content...",value:Me.content,onChange:e=>Ue(t=>({...t,content:e.target.value}))})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Attachments"}),(0,c.jsx)(a.A,{files:Ye,onChange:Ge,maxFiles:5})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)($,{children:"Priority"}),(0,c.jsxs)(T,{value:Me.priority,onChange:e=>Ue(t=>({...t,priority:e.target.value})),children:[(0,c.jsx)("option",{value:"normal",children:"Normal"}),(0,c.jsx)("option",{value:"important",children:"Important"}),(0,c.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>{_e(!1),at()},children:"Cancel"}),(0,c.jsx)(l.$n,{variant:"primary",onClick:async()=>{if(Me.title.trim()&&Me.content.trim()){Re(!0);try{const e={title:Me.title,content:Me.content,target_type:Me.target_type,priority:Me.priority,attachments:Ye.length>0?Ye:void 0};"role"===Me.target_type&&Me.target_roles.length>0&&(e.target_roles=Me.target_roles),"restaurant"===Me.target_type&&Me.restaurant_ids.length>0&&(e.restaurant_ids=Me.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Ke(),body:JSON.stringify(e)})).ok&&(_e(!1),at(),Qe())}catch(e){}finally{Re(!1)}}},disabled:Te||!Me.title.trim()||!Me.content.trim(),children:Te?"Sending...":"Send Notice"})]})]})}),Se&&$e&&(0,c.jsx)(k,{onClick:()=>{De(!1),Ne(null),je([]),Ie("")},children:(0,c.jsxs)(C,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(E,{children:[(0,c.jsx)(B,{children:"Notice Details"}),(0,c.jsx)(z,{onClick:()=>{De(!1),Ne(null),je([]),Ie("")},children:"\xd7"})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(K,{children:$e.title}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(y,{priority:$e.priority,children:$e.priority}),(0,c.jsx)(b,{children:rt($e)}),(0,c.jsx)("span",{children:it($e.createdAt)})]}),(0,c.jsx)(X,{children:$e.content}),(null===$e||void 0===$e?void 0:$e.attachments)&&$e.attachments.length>0&&(0,c.jsx)(s.A,{attachments:$e.attachments})]}),(0,c.jsxs)(Y,{children:[(0,c.jsxs)(G,{children:["Recipients (",nt($e),")"]}),$e.recipients&&$e.recipients.length>0?(0,c.jsx)(Z,{children:$e.recipients.map(e=>(0,c.jsxs)(q,{isRead:!!e.read_at,children:[(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`Recipient #${e.id}`,e.user&&e.user.role&&(0,c.jsxs)(H,{children:["(",e.user.role,")"]})]}),(0,c.jsx)(V,{isRead:!!e.read_at,children:e.read_at?`Read ${new Date(e.read_at).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}`:"Unread"})]},e.id))}):(0,c.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,c.jsxs)(ee,{children:[(0,c.jsxs)(G,{children:["Comments (",be.length,")"]}),0===be.length?(0,c.jsx)(ue,{children:"No comments yet"}):(0,c.jsx)(te,{children:be.map(e=>{var t,i,r,n;return(0,c.jsxs)(ie,{children:[(0,c.jsx)(re,{children:(n=(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name,n?n.charAt(0).toUpperCase():"?")}),(0,c.jsxs)(ne,{children:[(0,c.jsxs)(oe,{children:[(0,c.jsx)(ae,{children:(null===(i=e.author)||void 0===i?void 0:i.name)||e.author_name}),(0,c.jsx)(se,{children:(null===(r=e.author)||void 0===r?void 0:r.role)||e.author_role}),(0,c.jsx)(le,{children:it(e.createdAt)}),(0,c.jsx)(ce,{onClick:()=>(async e=>{if($e)try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:Ke()})).ok&&Ze($e.id)}catch(t){}})(e.id),children:"Delete"})]}),(0,c.jsx)(de,{children:e.content})]})]},e.id)})}),(0,c.jsxs)(pe,{children:[(0,c.jsx)(xe,{placeholder:"Write a comment...",value:Oe,onChange:e=>Ie(e.target.value)}),(0,c.jsx)(he,{onClick:async()=>{if(Oe.trim()&&$e){Pe(!0);try{(await fetch("/api/comments",{method:"POST",headers:Ke(),body:JSON.stringify({entity_type:"notice",entity_id:String($e.id),content:Oe})})).ok&&(Ie(""),Ze($e.id))}catch(e){}finally{Pe(!1)}}},disabled:Le||!Oe.trim(),children:Le?"Sending...":"Send"})]})]})]}),(0,c.jsxs)(fe,{children:[(0,c.jsx)(me,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Ke()})).ok&&(De(!1),Ne(null),Qe())}catch(t){}})($e.id),children:"Delete Notice"}),(0,c.jsx)(l.$n,{variant:"secondary",onClick:()=>{De(!1),Ne(null),je([]),Ie("")},children:"Close"})]})]})})]})}},4185:(e,t,i)=>{i.d(t,{A:()=>g});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
  margin-top: 12px;
`,a=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=r.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=r.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=r.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=r.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=r.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const i=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),r=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),i.length>0&&(0,n.jsx)(x,{children:i.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),r.length>0&&(0,n.jsx)(s,{children:r.map((e,t)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(r=e.mimeType,"application/pdf"===r?"\ud83d\udcc4":r.includes("word")||r.includes("document")?"\ud83d\udcdd":r.includes("sheet")||r.includes("excel")?"\ud83d\udcca":r.includes("zip")||r.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(i=e.size,i<1024?`${i}B`:i<1048576?`${(i/1024).toFixed(1)}KB`:`${(i/1048576).toFixed(1)}MB`)})]},t);var i,r})})]})}},7455:(e,t,i)=>{i.d(t,{A:()=>j});var r=i(9950),n=i(4752),o=i(4414);const a=n.Ay.div`
  margin-top: 8px;
`,s=n.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    border-color: ${e=>e.disabled?"#CBD5E1":"#635BFF"};
  }
`,l=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,d=n.Ay.p`
  font-size: 11px;
  color: #9CA3AF;
  margin: 0;
`,c=n.Ay.input`
  display: none;
`,p=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
`,x=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F8F9FA;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
`,h=n.Ay.span`
  font-size: 16px;
  flex-shrink: 0;
`,g=n.Ay.div`
  flex: 1;
  min-width: 0;
`,u=n.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,m=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
`,f=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  line-height: 1;
  flex-shrink: 0;
  &:hover { color: #EF4444; }
`,y=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: #F0F0FF;
  border-radius: 6px;
  font-size: 12px;
  color: #635BFF;
`,b=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const j=e=>{let{files:t,onChange:i,maxFiles:n=5,maxSizeMB:j=10,disabled:w=!1,compact:v=!1}=e;const[A,F]=(0,r.useState)(!1),[k,C]=(0,r.useState)(!1),E=(0,r.useRef)(null),B=!w&&!k&&t.length<n,z=async e=>{const r=n-t.length,o=Array.from(e).slice(0,r);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const r=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),a=await n.json();a.success&&a.data&&i([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:A,disabled:!B,onClick:()=>{var e;return B&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:v?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,r)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!w&&(0,o.jsx)(f,{onClick:()=>(async e=>{const r=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:r.url})})}catch(n){}i(t.filter((t,i)=>i!==e))})(r),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);