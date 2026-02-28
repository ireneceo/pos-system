"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>p,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},p=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},3534:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ge});var i=r(9950),n=r(4752),o=r(2488),a=r(3832),s=r(5665),l=r(4414);const d=n.Ay.div`
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
`,p=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,c=n.Ay.div`
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
`,E=n.Ay.button`
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
`,B=n.Ay.div`
  padding: 24px;
`,_=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,z=n.Ay.div`
  margin-bottom: 20px;
`,S=n.Ay.label`
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
`,$=n.Ay.textarea`
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
`,R=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,I=n.Ay.div`
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
`,M=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,Y=n.Ay.div`
  margin-bottom: 24px;
`,J=n.Ay.div`
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
`,re=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,ie=n.Ay.span`
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
`,le=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`,de=n.Ay.textarea`
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
`,pe=n.Ay.button`
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
`,ce=n.Ay.div`
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
`,ge=()=>{var e;const[t,r]=(0,i.useState)([]),[n,ge]=(0,i.useState)(null),[me,ye]=(0,i.useState)([]),[fe,be]=(0,i.useState)(""),[je,we]=(0,i.useState)("all"),[ve,Ae]=(0,i.useState)("newest"),[Fe,ke]=(0,i.useState)(!1),[Ce,Ee]=(0,i.useState)(!1),[Be,_e]=(0,i.useState)(null),[ze,Se]=(0,i.useState)(!1),[Ne,De]=(0,i.useState)(""),[$e,Te]=(0,i.useState)(!1),[Oe,Le]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),[Re,Ie]=(0,i.useState)(""),Pe=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),Ue=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Pe()});if(e.ok){const t=await e.json(),i=t.data||t;r(Array.isArray(i)?i:[])}}catch(e){}},[Pe]),Me=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Pe()});if(e.ok){const t=await e.json();ge(t.data||t)}}catch(e){}},[Pe]),Ye=(0,i.useCallback)(async e=>{try{const t=await fetch(`/api/comments/notice/${e}`,{headers:Pe()});if(t.ok){const e=await t.json(),r=e.data||e;ye(Array.isArray(r)?r:[])}}catch(t){ye([])}},[Pe]);(0,i.useEffect)(()=>{Ue(),Me()},[Ue,Me]);const Je=t.length,We=t.filter(e=>{const t=new Date(e.createdAt),r=new Date;return t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}).length,Ge=t.filter(e=>"important"===e.priority).length,Qe=t.filter(e=>"urgent"===e.priority).length,qe=t.filter(e=>{const t=e.title.toLowerCase().includes(fe.toLowerCase())||e.content.toLowerCase().includes(fe.toLowerCase()),r="all"===je||e.priority===je;return t&&r}).sort((e,t)=>{const r=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===ve?i-r:r-i}),He=e=>new Date(e).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),Ke=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Ve=e=>e.recipients?e.recipients.length:0,Xe=e=>{Le(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Ze=()=>{Le({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),Ie("")},et=(null===n||void 0===n||null===(e=n.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(Re.toLowerCase())))||[];return(0,l.jsxs)(a.mc,{children:[(0,l.jsxs)(a.Y9,{children:[(0,l.jsx)(a.hE,{children:"Notices"}),(0,l.jsx)(a.ex,{children:(0,l.jsx)(a.$n,{variant:"primary",onClick:()=>ke(!0),children:"New Notice"})})]}),(0,l.jsxs)(a.UC,{children:[(0,l.jsxs)(s.MD,{children:[(0,l.jsxs)(s.hI,{color:"#635BFF",children:[(0,l.jsx)(s.Os,{children:Je}),(0,l.jsx)(s.v0,{children:"Total Sent"})]}),(0,l.jsxs)(s.hI,{color:"#10B981",children:[(0,l.jsx)(s.Os,{children:We}),(0,l.jsx)(s.v0,{children:"This Month"})]}),(0,l.jsxs)(s.hI,{color:"#F59E0B",children:[(0,l.jsx)(s.Os,{children:Ge}),(0,l.jsx)(s.v0,{children:"Important"})]}),(0,l.jsxs)(s.hI,{color:"#EF4444",children:[(0,l.jsx)(s.Os,{children:Qe}),(0,l.jsx)(s.v0,{children:"Urgent"})]})]}),(0,l.jsxs)(d,{children:[(0,l.jsx)(o.DO,{type:"text",placeholder:"Search notices...",value:fe,onChange:e=>be(e.target.value)}),(0,l.jsxs)(o.Jt,{value:je,onChange:e=>we(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priorities"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,l.jsxs)(o.Jt,{value:ve,onChange:e=>Ae(e.target.value),children:[(0,l.jsx)("option",{value:"newest",children:"Newest First"}),(0,l.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===qe.length?(0,l.jsxs)(ce,{children:[(0,l.jsx)("h3",{children:"No Notices Found"}),(0,l.jsx)("p",{children:0===t.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,l.jsx)(p,{children:qe.map(e=>{return(0,l.jsxs)(c,{onClick:()=>(e=>{_e(e),Ee(!0),Ye(e.id)})(e),children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(h,{children:(0,l.jsx)(u,{children:e.title})}),(0,l.jsx)(v,{children:(0,l.jsx)(m,{priority:e.priority,children:e.priority})})]}),(0,l.jsx)(g,{children:e.content}),(0,l.jsx)(y,{children:Ke(e)}),(0,l.jsxs)(f,{children:[(0,l.jsx)(b,{children:(0,l.jsx)(w,{children:(t=e.createdAt,new Date(t).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(w,{children:[Ve(e)," recipient",1!==Ve(e)?"s":""]}),(0,l.jsxs)(w,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":""]})]})]})]},e.id);var t})})]}),Fe&&(0,l.jsx)(A,{onClick:()=>{ke(!1),Ze()},children:(0,l.jsxs)(F,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(C,{children:"New Notice"}),(0,l.jsx)(E,{onClick:()=>{ke(!1),Ze()},children:"\xd7"})]}),(0,l.jsxs)(B,{children:[(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Target Type"}),(0,l.jsxs)(D,{value:Oe.target_type,onChange:e=>Le(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,l.jsx)("option",{value:"all",children:"All Users"}),(0,l.jsx)("option",{value:"role",children:"By Role"}),(0,l.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===Oe.target_type&&(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Select Roles"}),(0,l.jsx)(T,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,l.jsxs)(O,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Oe.target_roles.includes(e),onChange:()=>(e=>{Le(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Oe.target_type&&(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Select Restaurants"}),(0,l.jsx)(L,{type:"text",placeholder:"Search restaurants...",value:Re,onChange:e=>Ie(e.target.value)}),(0,l.jsx)(R,{children:0===et.length?(0,l.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):et.map(e=>(0,l.jsxs)(I,{selected:Oe.restaurant_ids.includes(e.id),onClick:()=>Xe(e.id),children:[(0,l.jsx)(P,{type:"checkbox",checked:Oe.restaurant_ids.includes(e.id),onChange:()=>Xe(e.id),onClick:e=>e.stopPropagation()}),(0,l.jsx)(U,{children:e.name})]},e.id))}),Oe.restaurant_ids.length>0&&(0,l.jsxs)(M,{children:[Oe.restaurant_ids.length," restaurant",1!==Oe.restaurant_ids.length?"s":""," selected"]})]}),(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Title"}),(0,l.jsx)(N,{type:"text",placeholder:"Enter notice title",value:Oe.title,onChange:e=>Le(t=>({...t,title:e.target.value}))})]}),(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Content"}),(0,l.jsx)($,{placeholder:"Enter notice content...",value:Oe.content,onChange:e=>Le(t=>({...t,content:e.target.value}))})]}),(0,l.jsxs)(z,{children:[(0,l.jsx)(S,{children:"Priority"}),(0,l.jsxs)(D,{value:Oe.priority,onChange:e=>Le(t=>({...t,priority:e.target.value})),children:[(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,l.jsxs)(_,{children:[(0,l.jsx)(a.$n,{variant:"secondary",onClick:()=>{ke(!1),Ze()},children:"Cancel"}),(0,l.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Oe.title.trim()&&Oe.content.trim()){Se(!0);try{const e={title:Oe.title,content:Oe.content,target_type:Oe.target_type,priority:Oe.priority};"role"===Oe.target_type&&Oe.target_roles.length>0&&(e.target_roles=Oe.target_roles),"restaurant"===Oe.target_type&&Oe.restaurant_ids.length>0&&(e.restaurant_ids=Oe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Pe(),body:JSON.stringify(e)})).ok&&(ke(!1),Ze(),Ue())}catch(e){}finally{Se(!1)}}},disabled:ze||!Oe.title.trim()||!Oe.content.trim(),children:ze?"Sending...":"Send Notice"})]})]})}),Ce&&Be&&(0,l.jsx)(A,{onClick:()=>{Ee(!1),_e(null),ye([]),De("")},children:(0,l.jsxs)(F,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(C,{children:"Notice Details"}),(0,l.jsx)(E,{onClick:()=>{Ee(!1),_e(null),ye([]),De("")},children:"\xd7"})]}),(0,l.jsxs)(B,{children:[(0,l.jsxs)(Y,{children:[(0,l.jsx)(W,{children:Be.title}),(0,l.jsxs)(G,{children:[(0,l.jsx)(m,{priority:Be.priority,children:Be.priority}),(0,l.jsx)(y,{children:Ke(Be)}),(0,l.jsx)("span",{children:He(Be.createdAt)})]}),(0,l.jsx)(Q,{children:Be.content})]}),(0,l.jsxs)(Y,{children:[(0,l.jsxs)(J,{children:["Recipients (",Ve(Be),")"]}),Be.recipients&&Be.recipients.length>0?(0,l.jsx)(q,{children:Be.recipients.map(e=>(0,l.jsxs)(H,{children:[e.user?e.user.name:e.restaurant?e.restaurant.name:`Recipient #${e.id}`,e.user&&e.user.role&&(0,l.jsx)(K,{children:e.user.role}),e.read_at&&(0,l.jsx)("span",{style:{color:"#10B981",marginLeft:"4px",fontSize:"10px"},children:"(read)"})]},e.id))}):(0,l.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,l.jsxs)(V,{children:[(0,l.jsxs)(J,{children:["Comments (",me.length,")"]}),0===me.length?(0,l.jsx)(xe,{children:"No comments yet"}):(0,l.jsx)(X,{children:me.map(e=>{var t,r,i,n;return(0,l.jsxs)(Z,{children:[(0,l.jsx)(ee,{children:(n=(null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name,n?n.charAt(0).toUpperCase():"?")}),(0,l.jsxs)(te,{children:[(0,l.jsxs)(re,{children:[(0,l.jsx)(ie,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,l.jsx)(ne,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,l.jsx)(oe,{children:He(e.createdAt)}),(0,l.jsx)(se,{onClick:()=>(async e=>{if(Be)try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:Pe()})).ok&&Ye(Be.id)}catch(t){}})(e.id),children:"Delete"})]}),(0,l.jsx)(ae,{children:e.content})]})]},e.id)})}),(0,l.jsxs)(le,{children:[(0,l.jsx)(de,{placeholder:"Write a comment...",value:Ne,onChange:e=>De(e.target.value)}),(0,l.jsx)(pe,{onClick:async()=>{if(Ne.trim()&&Be){Te(!0);try{(await fetch("/api/comments",{method:"POST",headers:Pe(),body:JSON.stringify({entity_type:"notice",entity_id:String(Be.id),content:Ne})})).ok&&(De(""),Ye(Be.id))}catch(e){}finally{Te(!1)}}},disabled:$e||!Ne.trim(),children:$e?"Sending...":"Send"})]})]})]}),(0,l.jsxs)(ue,{children:[(0,l.jsx)(he,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Pe()})).ok&&(Ee(!1),_e(null),Ue())}catch(t){}})(Be.id),children:"Delete Notice"}),(0,l.jsx)(a.$n,{variant:"secondary",onClick:()=>{Ee(!1),_e(null),ye([]),De("")},children:"Close"})]})]})})]})}}}]);