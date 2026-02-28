"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),n=r(4414);const a=i.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:i,...o}=e;return(0,n.jsx)(a,{className:r,style:i,...o,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(o,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>te});var i=r(9950),n=r(4752),a=r(1367),o=r(3832),s=r(5665),d=r(2488),l=r(7455),c=r(4185),p=r(4302),x=r(4414);const h=n.Ay.div`
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
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,b=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,f=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,j=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,v=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,w=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,A=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,F=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,_=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,C=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,E=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,B=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,S=n.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,z=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1100;
  overflow-y: auto;
  padding: 40px 0;
`,N=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,$=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,I=n.Ay.h2`
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
`,O=n.Ay.div`
  padding: 24px;
`,T=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,U=n.Ay.div`
  margin-bottom: 20px;
`,L=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,R=n.Ay.input`
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
`,M=n.Ay.textarea`
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
`,P=n.Ay.select`
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
`,Y=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,W=n.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,J=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,Q=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,q=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,G=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,H=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,K=n.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,V=n.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,X=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,Z=n.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
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
`,ee=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,te=()=>{var e,t,r;const{user:n}=(0,a.As)(),[te,re]=(0,i.useState)("received"),[ie,ne]=(0,i.useState)([]),[ae,oe]=(0,i.useState)([]),[se,de]=(0,i.useState)(null),[le,ce]=(0,i.useState)(""),[pe,xe]=(0,i.useState)(""),[he,ue]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(!1),[ye,be]=(0,i.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),[fe,je]=(0,i.useState)(!1),[ve,we]=(0,i.useState)([]),[Ae,Fe]=(0,i.useState)(!1),[_e,ke]=(0,i.useState)(null),[Ce,Ee]=(0,i.useState)({}),Be=(0,i.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Se=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ee(e=>({...e,...t}))}}}catch(t){}},ze=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Be()});if(e.ok){const t=await e.json();de(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[Be]),Ne=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Be()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];ne(i),Se(i)}}catch(e){console.error("Error fetching received notices:",e)}},[Be]),$e=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Be()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];oe(i),Se(i)}}catch(e){console.error("Error fetching sent notices:",e)}},[Be]),Ie=(0,i.useCallback)(async()=>{ue(!0),await Promise.all([ze(),Ne(),$e()]),ue(!1)},[ze,Ne,$e]);(0,i.useEffect)(()=>{n&&Ie()},[n,Ie]);const De=async e=>{ke(e),Fe(!0),await(async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:Be()});if(t.ok){const e=await t.json(),r=e.data||e;ke(r),Ne()}}catch(t){console.error("Error fetching notice detail:",t)}})(e.id)},Oe=("received"===te?ie:ae).filter(e=>{const t=!le||e.title.toLowerCase().includes(le.toLowerCase())||e.content.toLowerCase().includes(le.toLowerCase()),r=!pe||e.priority===pe;return t&&r}),Te=ie.length,Ue=ie.filter(e=>!e.read_at).length,Le=ie.filter(e=>"important"===e.priority).length,Re=ie.filter(e=>"urgent"===e.priority).length,Me=ae.length,Pe=ae.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,Ye=ae.filter(e=>"important"===e.priority).length,We=ae.filter(e=>"urgent"===e.priority).length,Je=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},Qe=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,qe=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"Notices"}),(0,x.jsx)(o.ex,{children:(0,x.jsx)(o.$n,{variant:"primary",onClick:()=>{be({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),we([]),me(!0)},children:"New Notice"})})]}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(u,{active:"received"===te,onClick:()=>re("received"),children:["Received (",Te,")"]}),(0,x.jsxs)(u,{active:"sent"===te,onClick:()=>re("sent"),children:["Sent (",Me,")"]})]}),"received"===te?(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Te}),(0,x.jsx)(s.v0,{children:"Total Received"})]}),(0,x.jsxs)(s.hI,{color:"#F59E0B",children:[(0,x.jsx)(s.Os,{children:Ue}),(0,x.jsx)(s.v0,{children:"Unread"})]}),(0,x.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,x.jsx)(s.Os,{children:Le}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:Re}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}):(0,x.jsxs)(s.MD,{children:[(0,x.jsxs)(s.hI,{color:"#635BFF",children:[(0,x.jsx)(s.Os,{children:Me}),(0,x.jsx)(s.v0,{children:"Total Sent"})]}),(0,x.jsxs)(s.hI,{color:"#10B981",children:[(0,x.jsx)(s.Os,{children:Pe}),(0,x.jsx)(s.v0,{children:"This Month"})]}),(0,x.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,x.jsx)(s.Os,{children:Ye}),(0,x.jsx)(s.v0,{children:"Important"})]}),(0,x.jsxs)(s.hI,{color:"#EF4444",children:[(0,x.jsx)(s.Os,{children:We}),(0,x.jsx)(s.v0,{children:"Urgent"})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:le,onChange:e=>ce(e.target.value)}),(0,x.jsxs)(d.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,x.jsx)("option",{value:"",children:"All Priorities"}),(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,x.jsxs)(m,{children:[he&&0===Oe.length&&(0,x.jsx)(X,{children:(0,x.jsx)("p",{children:"Loading notices..."})}),!he&&0===Oe.length&&(0,x.jsxs)(X,{children:[(0,x.jsx)("h3",{children:"No notices found"}),(0,x.jsx)("p",{children:"received"===te?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),Oe.map(e=>{var t,r;return(0,x.jsxs)(y,{unread:"received"===te&&!e.read_at,onClick:()=>De(e),children:[(0,x.jsxs)(b,{children:[(0,x.jsxs)(f,{children:["received"===te&&!e.read_at&&(0,x.jsx)(j,{}),(0,x.jsx)(v,{children:e.title})]}),(0,x.jsx)(w,{children:(0,x.jsx)(A,{priority:e.priority,children:e.priority})})]}),(0,x.jsx)(_,{children:e.content}),(0,x.jsxs)(k,{children:[(0,x.jsx)(C,{children:"received"===te?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(B,{children:[e.author_name||"Unknown",(0,x.jsx)(F,{children:e.author_role||"Admin"})]})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(B,{children:["To: ",Je(e)]}),(0,x.jsxs)(B,{children:[Qe(e),"/",qe(e)," read"]})]})}),(0,x.jsxs)(E,{children:[e.commentCount>0&&(0,x.jsxs)(S,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Ce[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ce[String(e.id)].unread_count," new"]})]}),(0,x.jsx)(B,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ge&&(0,x.jsx)(z,{onClick:()=>me(!1),children:(0,x.jsxs)(N,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(I,{children:"New Notice"}),(0,x.jsx)(D,{onClick:()=>me(!1),children:"\xd7"})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Title *"}),(0,x.jsx)(R,{type:"text",placeholder:"Enter notice title",value:ye.title,onChange:e=>be({...ye,title:e.target.value})})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Content *"}),(0,x.jsx)(M,{placeholder:"Enter notice content...",value:ye.content,onChange:e=>be({...ye,content:e.target.value})})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Attachments"}),(0,x.jsx)(l.A,{files:ve,onChange:we,maxFiles:5})]}),(0,x.jsxs)(Y,{children:[(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Target Type *"}),(0,x.jsxs)(P,{value:ye.target_type,onChange:e=>be({...ye,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,x.jsx)("option",{value:"",children:"Select target..."}),(null===se||void 0===se||null===(e=se.targetOptions)||void 0===e?void 0:e.map(e=>(0,x.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("option",{value:"brand",children:"By Brand"}),(0,x.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Priority"}),(0,x.jsxs)(P,{value:ye.priority,onChange:e=>be({...ye,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"normal",children:"Normal"}),(0,x.jsx)("option",{value:"important",children:"Important"}),(0,x.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"brand"===ye.target_type&&(null===se||void 0===se?void 0:se.brands)&&(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Select Brand *"}),(0,x.jsxs)(P,{value:ye.brand_id,onChange:e=>be({...ye,brand_id:e.target.value}),children:[(0,x.jsx)("option",{value:"",children:"Choose a brand..."}),se.brands.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===ye.target_type&&(null===se||void 0===se?void 0:se.restaurants)&&(0,x.jsxs)(U,{children:[(0,x.jsx)(L,{children:"Select Restaurants *"}),(0,x.jsxs)(W,{children:[se.restaurants.map(e=>(0,x.jsxs)(J,{children:[(0,x.jsx)("input",{type:"checkbox",checked:ye.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void be(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===se.restaurants.length&&(0,x.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,x.jsxs)(Q,{children:[ye.restaurant_ids.length," restaurant",1!==ye.restaurant_ids.length?"s":""," selected"]})]})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(o.$n,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,x.jsx)(o.$n,{variant:"primary",onClick:async()=>{if(ye.title.trim()&&ye.content.trim()&&ye.target_type){je(!0);try{const e={title:ye.title.trim(),content:ye.content.trim(),target_type:ye.target_type,priority:ye.priority,attachments:ve.length>0?ve:void 0};"brand"===ye.target_type&&ye.brand_id&&(e.brand_id=Number(ye.brand_id)),"select_restaurants"===ye.target_type&&ye.restaurant_ids.length>0&&(e.restaurant_ids=ye.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Be(),body:JSON.stringify(e)})).ok&&(me(!1),we([]),$e())}catch(e){console.error("Error creating notice:",e)}finally{je(!1)}}},disabled:fe||!ye.title.trim()||!ye.content.trim()||!ye.target_type||"brand"===ye.target_type&&!ye.brand_id||"select_restaurants"===ye.target_type&&0===ye.restaurant_ids.length,children:fe?"Sending...":"Send Notice"})]})]})}),Ae&&_e&&(0,x.jsx)(z,{onClick:()=>{Fe(!1),ke(null)},children:(0,x.jsxs)(N,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)($,{children:[(0,x.jsx)(I,{children:_e.title}),(0,x.jsxs)(ee,{children:[(0,x.jsx)(A,{priority:_e.priority,children:_e.priority}),(He=_e,String(He.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,x.jsx)(Z,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Be()})).ok&&(Fe(!1),ke(null),$e(),Ne())}catch(t){console.error("Error deleting notice:",t)}})(_e.id),children:"Delete"})),(0,x.jsx)(D,{onClick:()=>{Fe(!1),ke(null)},children:"\xd7"})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(G,{children:[(0,x.jsxs)(H,{children:[(0,x.jsx)(K,{children:"From"}),(0,x.jsxs)(V,{children:[_e.author_name||(null===(t=_e.author)||void 0===t?void 0:t.name)||"Unknown"," ","(",_e.author_role||(null===(r=_e.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(K,{children:"To"}),(0,x.jsx)(V,{children:Je(_e)})]}),(0,x.jsxs)(H,{children:[(0,x.jsx)(K,{children:"Date"}),(0,x.jsx)(V,{children:(Ge=_e.createdAt,new Date(Ge).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}))})]}),_e.recipients&&_e.recipients.length>0&&(0,x.jsxs)(H,{children:[(0,x.jsx)(K,{children:"Read Status"}),(0,x.jsxs)(V,{children:[Qe(_e),"/",qe(_e)," read"]})]})]}),(0,x.jsx)(q,{children:_e.content}),(null===_e||void 0===_e?void 0:_e.attachments)&&_e.attachments.length>0&&(0,x.jsx)(c.A,{attachments:_e.attachments}),(0,x.jsx)(p.A,{entityType:"notice",entityId:String(_e.id),currentUserId:null===n||void 0===n?void 0:n.id,onMarkRead:()=>Ee(e=>{const t={...e},r=String(_e.id);return t[r]&&(t[r]={...t[r],unread_count:0}),t})})]})]})})]});var Ge,He}}}]);