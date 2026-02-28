"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i,...o}=e;return(0,n.jsx)(a,{className:r,style:i,...o,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(o,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},3534:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ae});var i=r(9950),n=r(4752),a=r(1367),o=r(2488),s=r(7455),l=r(4185),d=r(4302),c=r(3832),p=r(5665),x=r(4414);const h=n.Ay.div`
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
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,g=n.Ay.div`
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
`,m=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`,y=n.Ay.div`
  flex: 1;
  min-width: 0;
`,f=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,b=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,j=n.Ay.span`
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
`,w=n.Ay.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,F=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,A=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,C=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,_=n.Ay.div`
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
`,E=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`,B=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,z=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,S=n.Ay.button`
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
`,N=n.Ay.div`
  padding: 24px;
`,D=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,$=n.Ay.div`
  margin-bottom: 20px;
`,R=n.Ay.label`
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
`,U=n.Ay.label`
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
`,P=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,Y=n.Ay.div`
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
`,W=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,G=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,Q=n.Ay.div`
  margin-bottom: 24px;
`,q=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,H=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,K=n.Ay.div`
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
`,V=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,X=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,Z=n.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${e=>e.isRead?"#BBF7D0":"#E5E7EB"};
`,ee=n.Ay.span`
  font-size: 10px;
  color: #9CA3AF;
`,te=n.Ay.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${e=>e.isRead?"#10B981":"#D1D5DB"};
  flex-shrink: 0;
`,re=n.Ay.div`
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
`,ie=n.Ay.button`
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
`,ne=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`,ae=()=>{var e;const{user:t}=(0,a.As)(),[r,n]=(0,i.useState)([]),[ae,oe]=(0,i.useState)(null),[se,le]=(0,i.useState)({}),[de,ce]=(0,i.useState)(""),[pe,xe]=(0,i.useState)("all"),[he,ue]=(0,i.useState)("newest"),[ge,me]=(0,i.useState)(!1),[ye,fe]=(0,i.useState)(!1),[be,je]=(0,i.useState)(null),[we,ve]=(0,i.useState)(!1),[Fe,Ae]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),[ke,Ce]=(0,i.useState)(""),[_e,Ee]=(0,i.useState)([]),Be=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),ze=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Be()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];n(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),le(t)}}}catch(t){}})(i)}}catch(e){}},[Be]),Se=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Be()});if(e.ok){const t=await e.json();oe(t.data||t)}}catch(e){}},[Be]);(0,i.useEffect)(()=>{ze(),Se()},[ze,Se]);const Ne=r.length,De=r.filter(e=>{const t=new Date(e.createdAt),r=new Date;return t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}).length,$e=r.filter(e=>"important"===e.priority).length,Re=r.filter(e=>"urgent"===e.priority).length,Ie=r.filter(e=>{const t=e.title.toLowerCase().includes(de.toLowerCase())||e.content.toLowerCase().includes(de.toLowerCase()),r="all"===pe||e.priority===pe;return t&&r}).sort((e,t)=>{const r=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===he?i-r:r-i}),Te=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Le=e=>e.recipients?e.recipients.length:0,Oe=e=>{Ae(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Ue=()=>{Ae({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),Ce(""),Ee([])},Me=(null===ae||void 0===ae||null===(e=ae.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(ke.toLowerCase())))||[];return(0,x.jsxs)(c.mc,{children:[(0,x.jsxs)(c.Y9,{children:[(0,x.jsx)(c.hE,{children:"Notices"}),(0,x.jsx)(c.ex,{children:(0,x.jsx)(c.$n,{variant:"primary",onClick:()=>me(!0),children:"New Notice"})})]}),(0,x.jsxs)(c.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#635BFF",children:[(0,x.jsx)(p.Os,{children:Ne}),(0,x.jsx)(p.v0,{children:"Total Sent"})]}),(0,x.jsxs)(p.hI,{color:"#10B981",children:[(0,x.jsx)(p.Os,{children:De}),(0,x.jsx)(p.v0,{children:"This Month"})]}),(0,x.jsxs)(p.hI,{color:"#F59E0B",children:[(0,x.jsx)(p.Os,{children:$e}),(0,x.jsx)(p.v0,{children:"Important"})]}),(0,x.jsxs)(p.hI,{color:"#EF4444",children:[(0,x.jsx)(p.Os,{children:Re}),(0,x.jsx)(p.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(o.DO,{type:"text",placeholder:"Search notices...",value:de,onChange:e=>ce(e.target.value)}),(0,x.jsxs)(o.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,x.jsxs)(o.Jt,{value:he,onChange:e=>ue(e.target.value),children:[(0,x.jsx)("option",{value:"newest",children:"Newest First"}),(0,x.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===Ie.length?(0,x.jsxs)(re,{children:[(0,x.jsx)("h3",{children:"No Notices Found"}),(0,x.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,x.jsx)(u,{children:Ie.map(e=>{var t,r;return(0,x.jsxs)(g,{onClick:()=>(e=>{je(e),fe(!0)})(e),children:[(0,x.jsxs)(m,{children:[(0,x.jsx)(y,{children:(0,x.jsx)(f,{children:e.title})}),(0,x.jsx)(C,{children:(0,x.jsx)(j,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(b,{children:e.content}),(0,x.jsx)(w,{children:Te(e)}),(0,x.jsxs)(v,{children:[(0,x.jsx)(F,{children:(0,x.jsx)(k,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,x.jsxs)(A,{children:[(0,x.jsxs)(k,{children:[Le(e)," recipient",1!==Le(e)?"s":""]}),(0,x.jsxs)(k,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=se[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[se[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),ge&&(0,x.jsx)(_,{onClick:()=>{me(!1),Ue()},children:(0,x.jsxs)(E,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(B,{children:[(0,x.jsx)(z,{children:"New Notice"}),(0,x.jsx)(S,{onClick:()=>{me(!1),Ue()},children:"\xd7"})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Target Type"}),(0,x.jsxs)(T,{value:Fe.target_type,onChange:e=>Ae(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,x.jsx)("option",{value:"all",children:"All Users"}),(0,x.jsx)("option",{value:"role",children:"By Role"}),(0,x.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===Fe.target_type&&(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Select Roles"}),(0,x.jsx)(O,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,x.jsxs)(U,{children:[(0,x.jsx)("input",{type:"checkbox",checked:Fe.target_roles.includes(e),onChange:()=>(e=>{Ae(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===Fe.target_type&&(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Select Restaurants"}),(0,x.jsx)(M,{type:"text",placeholder:"Search restaurants...",value:ke,onChange:e=>Ce(e.target.value)}),(0,x.jsx)(P,{children:0===Me.length?(0,x.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Me.map(e=>(0,x.jsxs)(Y,{selected:Fe.restaurant_ids.includes(e.id),onClick:()=>Oe(e.id),children:[(0,x.jsx)(J,{type:"checkbox",checked:Fe.restaurant_ids.includes(e.id),onChange:()=>Oe(e.id),onClick:e=>e.stopPropagation()}),(0,x.jsx)(W,{children:e.name})]},e.id))}),Fe.restaurant_ids.length>0&&(0,x.jsxs)(G,{children:[Fe.restaurant_ids.length," restaurant",1!==Fe.restaurant_ids.length?"s":""," selected"]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Title"}),(0,x.jsx)(I,{type:"text",placeholder:"Enter notice title",value:Fe.title,onChange:e=>Ae(t=>({...t,title:e.target.value}))})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Content"}),(0,x.jsx)(L,{placeholder:"Enter notice content...",value:Fe.content,onChange:e=>Ae(t=>({...t,content:e.target.value}))})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Attachments"}),(0,x.jsx)(s.A,{files:_e,onChange:Ee,maxFiles:5})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(R,{children:"Priority"}),(0,x.jsxs)(T,{value:Fe.priority,onChange:e=>Ae(t=>({...t,priority:e.target.value})),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,x.jsxs)(D,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{me(!1),Ue()},children:"Cancel"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(Fe.title.trim()&&Fe.content.trim()){ve(!0);try{const e={title:Fe.title,content:Fe.content,target_type:Fe.target_type,priority:Fe.priority,attachments:_e.length>0?_e:void 0};"role"===Fe.target_type&&Fe.target_roles.length>0&&(e.target_roles=Fe.target_roles),"restaurant"===Fe.target_type&&Fe.restaurant_ids.length>0&&(e.restaurant_ids=Fe.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Be(),body:JSON.stringify(e)})).ok&&(me(!1),Ue(),ze())}catch(e){}finally{ve(!1)}}},disabled:we||!Fe.title.trim()||!Fe.content.trim(),children:we?"Sending...":"Send Notice"})]})]})}),ye&&be&&(0,x.jsx)(_,{onClick:()=>{fe(!1),je(null)},children:(0,x.jsxs)(E,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(B,{children:[(0,x.jsx)(z,{children:"Notice Details"}),(0,x.jsx)(S,{onClick:()=>{fe(!1),je(null)},children:"\xd7"})]}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(Q,{children:[(0,x.jsx)(H,{children:be.title}),(0,x.jsxs)(K,{children:[(0,x.jsx)(j,{priority:be.priority,children:be.priority}),(0,x.jsx)(w,{children:Te(be)}),(0,x.jsx)("span",{children:(Pe=be.createdAt,new Date(Pe).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,x.jsx)(V,{children:be.content}),(null===be||void 0===be?void 0:be.attachments)&&be.attachments.length>0&&(0,x.jsx)(l.A,{attachments:be.attachments})]}),(0,x.jsxs)(Q,{children:[(0,x.jsxs)(q,{children:["Recipients (",Le(be),")"]}),be.recipients&&be.recipients.length>0?(0,x.jsx)(X,{children:be.recipients.map(e=>(0,x.jsxs)(Z,{isRead:!!e.read_at,children:[(0,x.jsx)(te,{isRead:!!e.read_at,title:e.read_at?"Read":"Unread"}),e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`#${e.id}`,e.user&&e.user.role&&(0,x.jsx)(ee,{children:e.user.role})]},e.id))}):(0,x.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,x.jsx)(d.A,{entityType:"notice",entityId:String(be.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>le(e=>{const t={...e},r=String(be.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Be()})).ok&&(fe(!1),je(null),ze())}catch(t){}})(be.id),children:"Delete Notice"}),(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{fe(!1),je(null)},children:"Close"})]})]})})]});var Pe}}}]);