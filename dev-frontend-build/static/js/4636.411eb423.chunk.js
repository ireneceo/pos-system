"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>s});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,s=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(d,{...r,children:t})}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ue});var i=r(9950),n=r(4752),o=r(1367),a=r(3832),d=r(5665),s=r(2488),l=r(4414);const c=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,p=n.Ay.button`
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
`,x=n.Ay.div`
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
`,h=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

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
  position: relative;

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,g=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,m=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,y=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,f=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,j=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,v=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,w=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,F=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,k=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,_=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,C=n.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`,E=n.Ay.div`
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
`,B=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,S=n.Ay.div`
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
`,N=n.Ay.button`
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
`,O=n.Ay.div`
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
`,U=n.Ay.textarea`
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
`,L=n.Ay.select`
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
`,P=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=n.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`,Y=n.Ay.label`
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
`,J=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,M=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,W=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,K=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Q=n.Ay.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`,q=n.Ay.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`,G=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,H=n.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,V=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`,X=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,Z=n.Ay.div`
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
`,ee=n.Ay.div`
  flex: 1;
  min-width: 0;
`,te=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,re=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,ie=n.Ay.span`
  font-size: 11px;
  color: #6B7C93;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,ne=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,oe=n.Ay.div`
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`,ae=n.Ay.button`
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
  align-items: flex-start;
`,se=n.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,le=n.Ay.button`
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: #635BFF;
  color: white;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A54E5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ce=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,pe=n.Ay.button`
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
`,xe=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,he=n.Ay.div`
  text-align: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 13px;
`,ue=()=>{var e,t,r;const{user:n}=(0,o.As)(),[ue,ge]=(0,i.useState)("received"),[me,ye]=(0,i.useState)([]),[fe,be]=(0,i.useState)([]),[je,ve]=(0,i.useState)(null),[we,Ae]=(0,i.useState)(""),[Fe,ke]=(0,i.useState)(""),[_e,Ce]=(0,i.useState)(!1),[Ee,Be]=(0,i.useState)(!1),[Se,ze]=(0,i.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),[Ne,De]=(0,i.useState)(!1),[$e,Oe]=(0,i.useState)(!1),[Te,Ie]=(0,i.useState)(null),[Ue,Le]=(0,i.useState)([]),[Pe,Re]=(0,i.useState)(""),[Ye,Je]=(0,i.useState)(!1),[Me,We]=(0,i.useState)({}),Ke=(0,i.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Qe=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),We(e=>({...e,...t}))}}}catch(t){}},qe=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Ke()});if(e.ok){const t=await e.json();ve(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[Ke]),Ge=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Ke()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];ye(i),Qe(i)}}catch(e){console.error("Error fetching received notices:",e)}},[Ke]),He=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Ke()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];be(i),Qe(i)}}catch(e){console.error("Error fetching sent notices:",e)}},[Ke]),Ve=(0,i.useCallback)(async()=>{Ce(!0),await Promise.all([qe(),Ge(),He()]),Ce(!1)},[qe,Ge,He]);(0,i.useEffect)(()=>{n&&Ve()},[n,Ve]);const Xe=async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:Ke()});if(t.ok){const e=await t.json(),r=e.data||e;Ie(r),Ge()}}catch(t){console.error("Error fetching notice detail:",t)}},Ze=async e=>{try{const t=await fetch(`/api/comments/notice/${e}`,{headers:Ke()});if(t.ok){const e=await t.json(),r=e.data||e;Le(Array.isArray(r)?r:[])}}catch(t){console.error("Error fetching comments:",t)}},et=async()=>{if(Pe.trim()&&Te){Je(!0);try{(await fetch("/api/comments",{method:"POST",headers:Ke(),body:JSON.stringify({entity_type:"notice",entity_id:Te.id,content:Pe.trim()})})).ok&&(Re(""),Ze(Te.id))}catch(e){console.error("Error adding comment:",e)}finally{Je(!1)}}},tt=("received"===ue?me:fe).filter(e=>{const t=!we||e.title.toLowerCase().includes(we.toLowerCase())||e.content.toLowerCase().includes(we.toLowerCase()),r=!Fe||e.priority===Fe;return t&&r}),rt=me.length,it=me.filter(e=>!e.read_at).length,nt=me.filter(e=>"important"===e.priority).length,ot=me.filter(e=>"urgent"===e.priority).length,at=fe.length,dt=fe.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,st=fe.filter(e=>"important"===e.priority).length,lt=fe.filter(e=>"urgent"===e.priority).length,ct=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),pt=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},xt=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,ht=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,l.jsxs)(a.mc,{children:[(0,l.jsxs)(a.Y9,{children:[(0,l.jsx)(a.hE,{children:"Notices"}),(0,l.jsx)(a.ex,{children:(0,l.jsx)(a.$n,{variant:"primary",onClick:()=>{ze({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),Be(!0)},children:"New Notice"})})]}),(0,l.jsxs)(a.UC,{children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{active:"received"===ue,onClick:()=>ge("received"),children:["Received (",rt,")"]}),(0,l.jsxs)(p,{active:"sent"===ue,onClick:()=>ge("sent"),children:["Sent (",at,")"]})]}),"received"===ue?(0,l.jsxs)(d.MD,{children:[(0,l.jsxs)(d.hI,{color:"#635BFF",children:[(0,l.jsx)(d.Os,{children:rt}),(0,l.jsx)(d.v0,{children:"Total Received"})]}),(0,l.jsxs)(d.hI,{color:"#F59E0B",children:[(0,l.jsx)(d.Os,{children:it}),(0,l.jsx)(d.v0,{children:"Unread"})]}),(0,l.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,l.jsx)(d.Os,{children:nt}),(0,l.jsx)(d.v0,{children:"Important"})]}),(0,l.jsxs)(d.hI,{color:"#EF4444",children:[(0,l.jsx)(d.Os,{children:ot}),(0,l.jsx)(d.v0,{children:"Urgent"})]})]}):(0,l.jsxs)(d.MD,{children:[(0,l.jsxs)(d.hI,{color:"#635BFF",children:[(0,l.jsx)(d.Os,{children:at}),(0,l.jsx)(d.v0,{children:"Total Sent"})]}),(0,l.jsxs)(d.hI,{color:"#10B981",children:[(0,l.jsx)(d.Os,{children:dt}),(0,l.jsx)(d.v0,{children:"This Month"})]}),(0,l.jsxs)(d.hI,{color:"#8B5CF6",children:[(0,l.jsx)(d.Os,{children:st}),(0,l.jsx)(d.v0,{children:"Important"})]}),(0,l.jsxs)(d.hI,{color:"#EF4444",children:[(0,l.jsx)(d.Os,{children:lt}),(0,l.jsx)(d.v0,{children:"Urgent"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:we,onChange:e=>Ae(e.target.value)}),(0,l.jsxs)(s.Jt,{value:Fe,onChange:e=>ke(e.target.value),children:[(0,l.jsx)("option",{value:"",children:"All Priorities"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(h,{children:[_e&&0===tt.length&&(0,l.jsx)(ce,{children:(0,l.jsx)("p",{children:"Loading notices..."})}),!_e&&0===tt.length&&(0,l.jsxs)(ce,{children:[(0,l.jsx)("h3",{children:"No notices found"}),(0,l.jsx)("p",{children:"received"===ue?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),tt.map(e=>{var t,r;return(0,l.jsxs)(u,{unread:"received"===ue&&!e.read_at,onClick:()=>(async e=>{Ie(e),Oe(!0),Le([]),Re("");const t=localStorage.getItem("auth_token");fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),We(t=>{const r={...t};return r[String(e.id)]&&(r[String(e.id)]={...r[String(e.id)],unread_count:0}),r}),await Promise.all([Xe(e.id),Ze(e.id)])})(e),children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:["received"===ue&&!e.read_at&&(0,l.jsx)(y,{}),(0,l.jsx)(f,{children:e.title})]}),(0,l.jsx)(b,{children:(0,l.jsx)(j,{priority:e.priority,children:e.priority})})]}),(0,l.jsx)(w,{children:e.content}),(0,l.jsxs)(A,{children:[(0,l.jsx)(F,{children:"received"===ue?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(_,{children:[e.author_name||"Unknown",(0,l.jsx)(v,{children:e.author_role||"Admin"})]})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(_,{children:["To: ",pt(e)]}),(0,l.jsxs)(_,{children:[xt(e),"/",ht(e)," read"]})]})}),(0,l.jsxs)(k,{children:[e.commentCount>0&&(0,l.jsxs)(C,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Me[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,l.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Me[String(e.id)].unread_count," new"]})]}),(0,l.jsx)(_,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),Ee&&(0,l.jsx)(E,{onClick:()=>Be(!1),children:(0,l.jsxs)(B,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(S,{children:[(0,l.jsx)(z,{children:"New Notice"}),(0,l.jsx)(N,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,l.jsxs)(D,{children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Title *"}),(0,l.jsx)(I,{type:"text",placeholder:"Enter notice title",value:Se.title,onChange:e=>ze({...Se,title:e.target.value})})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Content *"}),(0,l.jsx)(U,{placeholder:"Enter notice content...",value:Se.content,onChange:e=>ze({...Se,content:e.target.value})})]}),(0,l.jsxs)(P,{children:[(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Target Type *"}),(0,l.jsxs)(L,{value:Se.target_type,onChange:e=>ze({...Se,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,l.jsx)("option",{value:"",children:"Select target..."}),(null===je||void 0===je||null===(e=je.targetOptions)||void 0===e?void 0:e.map(e=>(0,l.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("option",{value:"brand",children:"By Brand"}),(0,l.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Priority"}),(0,l.jsxs)(L,{value:Se.priority,onChange:e=>ze({...Se,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"brand"===Se.target_type&&(null===je||void 0===je?void 0:je.brands)&&(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Select Brand *"}),(0,l.jsxs)(L,{value:Se.brand_id,onChange:e=>ze({...Se,brand_id:e.target.value}),children:[(0,l.jsx)("option",{value:"",children:"Choose a brand..."}),je.brands.map(e=>(0,l.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===Se.target_type&&(null===je||void 0===je?void 0:je.restaurants)&&(0,l.jsxs)(O,{children:[(0,l.jsx)(T,{children:"Select Restaurants *"}),(0,l.jsxs)(R,{children:[je.restaurants.map(e=>(0,l.jsxs)(Y,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Se.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ze(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===je.restaurants.length&&(0,l.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,l.jsxs)(J,{children:[Se.restaurant_ids.length," restaurant",1!==Se.restaurant_ids.length?"s":""," selected"]})]})]}),(0,l.jsxs)($,{children:[(0,l.jsx)(a.$n,{variant:"secondary",onClick:()=>Be(!1),children:"Cancel"}),(0,l.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Se.title.trim()&&Se.content.trim()&&Se.target_type){De(!0);try{const e={title:Se.title.trim(),content:Se.content.trim(),target_type:Se.target_type,priority:Se.priority};"brand"===Se.target_type&&Se.brand_id&&(e.brand_id=Number(Se.brand_id)),"select_restaurants"===Se.target_type&&Se.restaurant_ids.length>0&&(e.restaurant_ids=Se.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Ke(),body:JSON.stringify(e)})).ok&&(Be(!1),He())}catch(e){console.error("Error creating notice:",e)}finally{De(!1)}}},disabled:Ne||!Se.title.trim()||!Se.content.trim()||!Se.target_type||"brand"===Se.target_type&&!Se.brand_id||"select_restaurants"===Se.target_type&&0===Se.restaurant_ids.length,children:Ne?"Sending...":"Send Notice"})]})]})}),$e&&Te&&(0,l.jsx)(E,{onClick:()=>{Oe(!1),Ie(null)},children:(0,l.jsxs)(B,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(S,{children:[(0,l.jsx)(z,{children:Te.title}),(0,l.jsxs)(xe,{children:[(0,l.jsx)(j,{priority:Te.priority,children:Te.priority}),(ut=Te,String(ut.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,l.jsx)(pe,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Ke()})).ok&&(Oe(!1),Ie(null),He(),Ge())}catch(t){console.error("Error deleting notice:",t)}})(Te.id),children:"Delete"})),(0,l.jsx)(N,{onClick:()=>{Oe(!1),Ie(null)},children:"\xd7"})]})]}),(0,l.jsxs)(D,{children:[(0,l.jsxs)(W,{children:[(0,l.jsxs)(K,{children:[(0,l.jsx)(Q,{children:"From"}),(0,l.jsxs)(q,{children:[Te.author_name||(null===(t=Te.author)||void 0===t?void 0:t.name)||"Unknown"," ","(",Te.author_role||(null===(r=Te.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,l.jsxs)(K,{children:[(0,l.jsx)(Q,{children:"To"}),(0,l.jsx)(q,{children:pt(Te)})]}),(0,l.jsxs)(K,{children:[(0,l.jsx)(Q,{children:"Date"}),(0,l.jsx)(q,{children:ct(Te.createdAt)})]}),Te.recipients&&Te.recipients.length>0&&(0,l.jsxs)(K,{children:[(0,l.jsx)(Q,{children:"Read Status"}),(0,l.jsxs)(q,{children:[xt(Te),"/",ht(Te)," read"]})]})]}),(0,l.jsx)(M,{children:Te.content}),(0,l.jsxs)(G,{children:[(0,l.jsxs)(H,{children:["Comments (",Ue.length,")"]}),(0,l.jsxs)(V,{children:[0===Ue.length&&(0,l.jsx)(he,{children:"No comments yet. Be the first to comment."}),Ue.map(e=>{var t,r,i,o;return(0,l.jsxs)(X,{children:[(0,l.jsx)(Z,{children:(o=e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"",o?o.charAt(0).toUpperCase():"?")}),(0,l.jsxs)(ee,{children:[(0,l.jsxs)(te,{children:[(0,l.jsx)(re,{children:e.author_name||(null===(r=e.author)||void 0===r?void 0:r.name)||"Unknown"}),(0,l.jsx)(ie,{children:e.author_role||(null===(i=e.author)||void 0===i?void 0:i.role)||"N/A"}),(0,l.jsx)(ne,{children:ct(e.createdAt)}),String(e.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,l.jsx)(ae,{onClick:t=>{t.stopPropagation(),(async e=>{if(Te)try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:Ke()})).ok&&Ze(Te.id)}catch(t){console.error("Error deleting comment:",t)}})(e.id)},children:"Delete"})]}),(0,l.jsx)(oe,{children:e.content})]})]},e.id)})]}),(0,l.jsxs)(de,{children:[(0,l.jsx)(se,{placeholder:"Write a comment...",value:Pe,onChange:e=>Re(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),et())}}),(0,l.jsx)(le,{onClick:et,disabled:!Pe.trim()||Ye,children:Ye?"Sending...":"Send"})]})]})]})]})})]});var ut}}}]);