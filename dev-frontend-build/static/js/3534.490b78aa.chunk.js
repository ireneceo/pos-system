"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3534],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,l=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},3534:(e,t,r)=>{r.r(t),r.d(t,{default:()=>oe});var i=r(9950),n=r(4752),o=r(1367),a=r(2488),s=r(7455),l=r(4185),d=r(4302),c=r(3832),p=r(5665),x=r(4414);const h=n.Ay.div`
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
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,u=n.Ay.div`
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
`,f=n.Ay.div`
  flex: 1;
  min-width: 0;
`,y=n.Ay.div`
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
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`,v=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,E=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`,C=n.Ay.div`
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
`,B=n.Ay.div`
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
`,_=n.Ay.h2`
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
`,D=n.Ay.div`
  padding: 24px;
`,$=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=n.Ay.div`
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
`,R=n.Ay.select`
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
`,O=n.Ay.textarea`
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
`,L=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`,M=n.Ay.label`
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
`,U=(0,n.Ay)(I)`
  margin-bottom: 8px;
`,P=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,J=n.Ay.div`
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
`,W=n.Ay.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`,Y=n.Ay.span`
  font-size: 14px;
  color: #0A2540;
`,K=n.Ay.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`,G=n.Ay.div`
  margin-bottom: 24px;
`,Q=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`,X=n.Ay.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`,Z=n.Ay.div`
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
`,q=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`,H=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,V=n.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: ${e=>e.isRead?"#F0FDF4":"#F3F4F6"};
  border-radius: 8px;
  font-size: 13px;
  color: #374151;
  border-left: 3px solid ${e=>e.isRead?"#10B981":"#D1D5DB"};
`,ee=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: 6px;
`,te=n.Ay.span`
  font-size: 11px;
  color: ${e=>e.isRead?"#10B981":"#9CA3AF"};
  font-weight: 500;
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
`,oe=()=>{var e;const{user:t}=(0,o.As)(),[r,n]=(0,i.useState)([]),[oe,ae]=(0,i.useState)(null),[se,le]=(0,i.useState)({}),[de,ce]=(0,i.useState)(""),[pe,xe]=(0,i.useState)("all"),[he,ge]=(0,i.useState)("newest"),[ue,me]=(0,i.useState)(!1),[fe,ye]=(0,i.useState)(!1),[be,je]=(0,i.useState)(null),[we,Ae]=(0,i.useState)(!1),[ve,Fe]=(0,i.useState)({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),[ke,Ee]=(0,i.useState)(""),[Ce,Be]=(0,i.useState)([]),ze=(0,i.useCallback)(()=>({"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("auth_token")}`}),[]),_e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:ze()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];n(i),(async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),le(t)}}}catch(t){}})(i)}}catch(e){}},[ze]),Se=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:ze()});if(e.ok){const t=await e.json();ae(t.data||t)}}catch(e){}},[ze]);(0,i.useEffect)(()=>{_e(),Se()},[_e,Se]);const De=r.length,$e=r.filter(e=>{const t=new Date(e.createdAt),r=new Date;return t.getMonth()===r.getMonth()&&t.getFullYear()===r.getFullYear()}).length,Ne=r.filter(e=>"important"===e.priority).length,Te=r.filter(e=>"urgent"===e.priority).length,Ie=r.filter(e=>{const t=e.title.toLowerCase().includes(de.toLowerCase())||e.content.toLowerCase().includes(de.toLowerCase()),r="all"===pe||e.priority===pe;return t&&r}).sort((e,t)=>{const r=new Date(e.createdAt).getTime(),i=new Date(t.createdAt).getTime();return"newest"===he?i-r:r-i}),Re=e=>{switch(e.target_type){case"all":return"All Users";case"role":return e.target_roles?e.target_roles.join(", "):"By Role";case"brand":return e.brand?`Brand: ${e.brand.name}`:"Brand";case"foodcourt":return e.foodcourt?`Foodcourt: ${e.foodcourt.name}`:"Foodcourt";case"restaurant":return"Selected Restaurants";case"individual":return"Individual";default:return e.target_type}},Oe=e=>e.recipients?e.recipients.length:0,Le=e=>{Fe(t=>({...t,restaurant_ids:t.restaurant_ids.includes(e)?t.restaurant_ids.filter(t=>t!==e):[...t.restaurant_ids,e]}))},Me=()=>{Fe({title:"",content:"",target_type:"all",target_roles:[],restaurant_ids:[],priority:"normal"}),Ee(""),Be([])},Ue=(null===oe||void 0===oe||null===(e=oe.restaurants)||void 0===e?void 0:e.filter(e=>e.name.toLowerCase().includes(ke.toLowerCase())))||[];return(0,x.jsxs)(c.mc,{children:[(0,x.jsxs)(c.Y9,{children:[(0,x.jsx)(c.hE,{children:"Notices"}),(0,x.jsx)(c.ex,{children:(0,x.jsx)(c.$n,{variant:"primary",onClick:()=>me(!0),children:"New Notice"})})]}),(0,x.jsxs)(c.UC,{children:[(0,x.jsxs)(p.MD,{children:[(0,x.jsxs)(p.hI,{color:"#635BFF",children:[(0,x.jsx)(p.Os,{children:De}),(0,x.jsx)(p.v0,{children:"Total Sent"})]}),(0,x.jsxs)(p.hI,{color:"#10B981",children:[(0,x.jsx)(p.Os,{children:$e}),(0,x.jsx)(p.v0,{children:"This Month"})]}),(0,x.jsxs)(p.hI,{color:"#F59E0B",children:[(0,x.jsx)(p.Os,{children:Ne}),(0,x.jsx)(p.v0,{children:"Important"})]}),(0,x.jsxs)(p.hI,{color:"#EF4444",children:[(0,x.jsx)(p.Os,{children:Te}),(0,x.jsx)(p.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(a.DO,{type:"text",placeholder:"Search notices...",value:de,onChange:e=>ce(e.target.value)}),(0,x.jsxs)(a.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]}),(0,x.jsxs)(a.Jt,{value:he,onChange:e=>ge(e.target.value),children:[(0,x.jsx)("option",{value:"newest",children:"Newest First"}),(0,x.jsx)("option",{value:"oldest",children:"Oldest First"})]})]}),0===Ie.length?(0,x.jsxs)(re,{children:[(0,x.jsx)("h3",{children:"No Notices Found"}),(0,x.jsx)("p",{children:0===r.length?'Create your first notice by clicking "New Notice" above.':"No notices match your current filters."})]}):(0,x.jsx)(g,{children:Ie.map(e=>{var t,r;return(0,x.jsxs)(u,{onClick:()=>(e=>{je(e),ye(!0)})(e),children:[(0,x.jsxs)(m,{children:[(0,x.jsx)(f,{children:(0,x.jsx)(y,{children:e.title})}),(0,x.jsx)(E,{children:(0,x.jsx)(j,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(b,{children:e.content}),(0,x.jsx)(w,{children:Re(e)}),(0,x.jsxs)(A,{children:[(0,x.jsx)(v,{children:(0,x.jsx)(k,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-MY",{month:"short",day:"numeric",year:"numeric"}))})}),(0,x.jsxs)(F,{children:[(0,x.jsxs)(k,{children:[Oe(e)," recipient",1!==Oe(e)?"s":""]}),(0,x.jsxs)(k,{children:[e.commentCount||0," comment",1!==(e.commentCount||0)?"s":"",(null===(t=se[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[se[String(e.id)].unread_count," new"]})]})]})]})]},e.id)})})]}),ue&&(0,x.jsx)(C,{onClick:()=>{me(!1),Me()},children:(0,x.jsxs)(B,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(_,{children:"New Notice"}),(0,x.jsx)(S,{onClick:()=>{me(!1),Me()},children:"\xd7"})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Target Type"}),(0,x.jsxs)(R,{value:ve.target_type,onChange:e=>Fe(t=>({...t,target_type:e.target.value,target_roles:[],restaurant_ids:[]})),children:[(0,x.jsx)("option",{value:"all",children:"All Users"}),(0,x.jsx)("option",{value:"role",children:"By Role"}),(0,x.jsx)("option",{value:"restaurant",children:"Select Restaurants"})]})]}),"role"===ve.target_type&&(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Select Roles"}),(0,x.jsx)(L,{children:["Brand General","Foodcourt General","Restaurant Owner","Restaurant Admin","Staff"].map(e=>(0,x.jsxs)(M,{children:[(0,x.jsx)("input",{type:"checkbox",checked:ve.target_roles.includes(e),onChange:()=>(e=>{Fe(t=>({...t,target_roles:t.target_roles.includes(e)?t.target_roles.filter(t=>t!==e):[...t.target_roles,e]}))})(e)}),e]},e))})]}),"restaurant"===ve.target_type&&(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Select Restaurants"}),(0,x.jsx)(U,{type:"text",placeholder:"Search restaurants...",value:ke,onChange:e=>Ee(e.target.value)}),(0,x.jsx)(P,{children:0===Ue.length?(0,x.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#9CA3AF",fontSize:"14px"},children:"No restaurants found"}):Ue.map(e=>(0,x.jsxs)(J,{selected:ve.restaurant_ids.includes(e.id),onClick:()=>Le(e.id),children:[(0,x.jsx)(W,{type:"checkbox",checked:ve.restaurant_ids.includes(e.id),onChange:()=>Le(e.id),onClick:e=>e.stopPropagation()}),(0,x.jsx)(Y,{children:e.name})]},e.id))}),ve.restaurant_ids.length>0&&(0,x.jsxs)(K,{children:[ve.restaurant_ids.length," restaurant",1!==ve.restaurant_ids.length?"s":""," selected"]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Title"}),(0,x.jsx)(I,{type:"text",placeholder:"Enter notice title",value:ve.title,onChange:e=>Fe(t=>({...t,title:e.target.value}))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Content"}),(0,x.jsx)(O,{placeholder:"Enter notice content...",value:ve.content,onChange:e=>Fe(t=>({...t,content:e.target.value}))})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Attachments"}),(0,x.jsx)(s.A,{files:Ce,onChange:Be,maxFiles:5})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(T,{children:"Priority"}),(0,x.jsxs)(R,{value:ve.priority,onChange:e=>Fe(t=>({...t,priority:e.target.value})),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{me(!1),Me()},children:"Cancel"}),(0,x.jsx)(c.$n,{variant:"primary",onClick:async()=>{if(ve.title.trim()&&ve.content.trim()){Ae(!0);try{const e={title:ve.title,content:ve.content,target_type:ve.target_type,priority:ve.priority,attachments:Ce.length>0?Ce:void 0};"role"===ve.target_type&&ve.target_roles.length>0&&(e.target_roles=ve.target_roles),"restaurant"===ve.target_type&&ve.restaurant_ids.length>0&&(e.restaurant_ids=ve.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:ze(),body:JSON.stringify(e)})).ok&&(me(!1),Me(),_e())}catch(e){}finally{Ae(!1)}}},disabled:we||!ve.title.trim()||!ve.content.trim(),children:we?"Sending...":"Send Notice"})]})]})}),fe&&be&&(0,x.jsx)(C,{onClick:()=>{ye(!1),je(null)},children:(0,x.jsxs)(B,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(_,{children:"Notice Details"}),(0,x.jsx)(S,{onClick:()=>{ye(!1),je(null)},children:"\xd7"})]}),(0,x.jsxs)(D,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(X,{children:be.title}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(j,{priority:be.priority,children:be.priority}),(0,x.jsx)(w,{children:Re(be)}),(0,x.jsx)("span",{children:(Pe=be.createdAt,new Date(Pe).toLocaleString("en-MY",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),(0,x.jsx)(q,{children:be.content}),(null===be||void 0===be?void 0:be.attachments)&&be.attachments.length>0&&(0,x.jsx)(l.A,{attachments:be.attachments})]}),(0,x.jsxs)(G,{children:[(0,x.jsxs)(Q,{children:["Recipients (",Oe(be),")"]}),be.recipients&&be.recipients.length>0?(0,x.jsx)(H,{children:be.recipients.map(e=>(0,x.jsxs)(V,{isRead:!!e.read_at,children:[(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[e.restaurant?e.restaurant.name:e.user?e.user.full_name||e.user.name:`Recipient #${e.id}`,e.user&&e.user.role&&(0,x.jsxs)(ee,{children:["(",e.user.role,")"]})]}),(0,x.jsx)(te,{isRead:!!e.read_at,children:e.read_at?`Read ${new Date(e.read_at).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}`:"Unread"})]},e.id))}):(0,x.jsx)("div",{style:{fontSize:"14px",color:"#9CA3AF"},children:"No recipients data available"})]}),(0,x.jsx)(d.A,{entityType:"notice",entityId:String(be.id),currentUserId:null===t||void 0===t?void 0:t.id,onMarkRead:()=>le(e=>{const t={...e},r=String(be.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]}),(0,x.jsxs)(ne,{children:[(0,x.jsx)(ie,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:ze()})).ok&&(ye(!1),je(null),_e())}catch(t){}})(be.id),children:"Delete Notice"}),(0,x.jsx)(c.$n,{variant:"secondary",onClick:()=>{ye(!1),je(null)},children:"Close"})]})]})})]});var Pe}},4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
  margin-top: 12px;
`,a=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=i.Ay.a`
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
`,d=i.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=i.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=i.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,x=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,h=i.Ay.a`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(d,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},4302:(e,t,r)=>{r.d(t,{A:()=>S});var i=r(9950),n=r(4752),o=r(4185),a=r(4414);const s=n.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,l=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,d=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,c=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  flex: 1;
  min-width: 0;
`,h=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,g=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,u=n.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,m=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,f=n.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,y=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,j=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,w=n.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,A=n.Ay.div`
  display: flex;
  gap: 4px;
`,v=n.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,F=n.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,k=n.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,E=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,B=n.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,z=n.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,_=n.Ay.input`
  display: none;
`,S=e=>{let{entityType:t,entityId:r,currentUserId:n,onMarkRead:S}=e;const[D,$]=(0,i.useState)([]),[N,T]=(0,i.useState)(""),[I,R]=(0,i.useState)([]),[O,L]=(0,i.useState)(!1),[M,U]=(0,i.useState)(!1),P=(0,i.useRef)(null),J=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/comments/${t}/${r}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&$(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,i.useEffect)(()=>{r&&(J(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r})}),S&&S()}catch(e){console.error("Error marking comments as read:",e)}})())},[t,r]);const W=async()=>{const e=N.trim(),i=I.length>0;if((e||i)&&!M){U(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:t,entity_id:r,content:N.trim(),attachments:i?I:void 0})})).ok&&(T(""),R([]),J())}catch(n){console.error("Error adding comment:",n)}finally{U(!1)}}},Y=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4);if(i<1)return"Just now";if(i<60)return`${i}m ago`;const n=Math.floor(i/60);if(n<24)return`${n}h ago`;const o=Math.floor(n/24);return o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,a.jsxs)(s,{children:[(0,a.jsxs)(l,{children:["Comments (",D.length,")"]}),D.length>0?(0,a.jsx)(d,{children:D.map(e=>{var t,r,i;return(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{children:((null===(t=e.author)||void 0===t?void 0:t.name)||e.author_name||"?")[0].toUpperCase()}),(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{children:(null===(r=e.author)||void 0===r?void 0:r.name)||e.author_name}),(0,a.jsx)(u,{children:(null===(i=e.author)||void 0===i?void 0:i.role)||e.author_role}),(0,a.jsx)(m,{children:Y(e.createdAt)}),n&&e.author_id===n&&(0,a.jsx)(y,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}})).ok&&J()}catch(t){console.error("Error deleting comment:",t)}})(e.id),children:"Delete"})]}),e.content&&(0,a.jsx)(f,{children:e.content}),e.attachments&&e.attachments.length>0&&(0,a.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,a.jsx)(k,{children:"No comments yet"}),(0,a.jsxs)(b,{children:[(0,a.jsxs)(j,{children:[(0,a.jsx)(w,{value:N,onChange:e=>T(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),W())},placeholder:"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,a.jsxs)(A,{children:[(0,a.jsx)(v,{onClick:()=>{var e;return null===(e=P.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,a.jsx)(F,{onClick:W,disabled:!N.trim()&&0===I.length||M,children:"Send"})]})]}),(I.length>0||O)&&(0,a.jsxs)(E,{children:[O&&(0,a.jsx)(z,{children:"Uploading..."}),I.map((e,t)=>(0,a.jsxs)(C,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,a.jsx)(B,{onClick:()=>(e=>{const t=I[e],r=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({url:t.url})}).catch(()=>{}),R(t=>t.filter((t,r)=>r!==e))})(t),children:"\u2715"})]},e.url))]})]}),(0,a.jsx)(_,{ref:P,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const t=e.target.files;if(!t||0===t.length)return;e.target.value="";const r=5-I.length,i=Array.from(t).slice(0,r);if(0!==i.length){L(!0);try{const e=new FormData;i.forEach(t=>e.append("files",t));const t=localStorage.getItem("auth_token"),r=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${t}`},body:e}),n=await r.json();n.success&&n.data&&R(e=>[...e,...n.data])}catch(n){console.error("File upload error:",n)}finally{L(!1)}}}})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>j});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
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
`;const j=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:j=10,disabled:w=!1,compact:A=!1}=e;const[v,F]=(0,i.useState)(!1),[k,E]=(0,i.useState)(!1),C=(0,i.useRef)(null),B=!w&&!k&&t.length<n,z=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;E(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{E(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:v,disabled:!B,onClick:()=>{var e;return B&&(null===(e=C.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&z(e.dataTransfer.files)},children:A?(0,o.jsxs)(l,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{children:v?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(d,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:C,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&z(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!w&&(0,o.jsx)(f,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);