"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>s});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,s=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(d,{...r,children:t})}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ue});var i=r(9950),n=r(4752),o=r(1367),a=r(3832),d=r(5665),s=r(2488),l=r(4414);const c=n.Ay.div`
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

  ${e=>e.unread&&"\n    border-left: 4px solid #635BFF;\n  "}

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
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,f=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,y=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,j=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,b=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,w=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,F=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,k=n.Ay.span`
  color: #6B7C93;
  font-size: 12px;
`,C=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,E=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
  width: 90%;
  flex-shrink: 0;
`,B=n.Ay.div`
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
`,z=n.Ay.div`
  padding: 24px;
`,D=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,N=n.Ay.div`
  margin-bottom: 20px;
`,$=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,U=n.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,I=n.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,T=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,M=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  transition: background 0.1s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`,P=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,R=n.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`,Y=n.Ay.span`
  font-size: 13px;
  color: #6B7C93;
`,J=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,W=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,Q=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,q=n.Ay.div`
  margin-bottom: 24px;
`,G=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,H=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,K=n.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,V=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,X=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,Z=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`,ee=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #FAFBFC;
  border-radius: 8px;
`,te=n.Ay.div`
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
`,re=n.Ay.div`
  flex: 1;
  min-width: 0;
`,ie=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`,ne=n.Ay.span`
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,oe=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`,ae=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 4px;
`,de=n.Ay.button`
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
`,se=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
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
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #635BFF;
  color: white;
  flex-shrink: 0;

  &:hover {
    background: #5A51E6;
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
    color: #374151;
    margin-bottom: 8px;
  }
`,xe=n.Ay.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`,he=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,ue=()=>{var e,t,r;const{user:n}=(0,o.As)(),[ue,ge]=(0,i.useState)([]),[me,fe]=(0,i.useState)([]),[ye,ve]=(0,i.useState)(null),[je,be]=(0,i.useState)(!0),[we,Ae]=(0,i.useState)("received"),[Fe,ke]=(0,i.useState)(""),[Ce,Ee]=(0,i.useState)(""),[Be,_e]=(0,i.useState)(!1),[Se,ze]=(0,i.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal"}),[De,Ne]=(0,i.useState)(!1),[$e,Oe]=(0,i.useState)(null),[Ue,Ie]=(0,i.useState)(!1),[Te,Le]=(0,i.useState)([]),[Me,Pe]=(0,i.useState)(""),[Re,Ye]=(0,i.useState)(!1),Je={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},We=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:Je});if(e.ok){const t=await e.json();t.success&&ve(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Qe=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:Je});if(e.ok){const t=await e.json();t.success&&ge(t.data)}}catch(e){console.error("Error fetching received notices:",e)}},[]),qe=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:Je});if(e.ok){const t=await e.json();t.success&&fe(t.data)}}catch(e){console.error("Error fetching sent notices:",e)}},[]),Ge=(0,i.useCallback)(async()=>{be(!0),await Promise.all([We(),Qe(),qe()]),be(!1)},[We,Qe,qe]);(0,i.useEffect)(()=>{n&&Ge()},[n,Ge]);const He=e=>e.filter(e=>{var t;const r=!Fe||e.title.toLowerCase().includes(Fe.toLowerCase())||(null===(t=e.author_name)||void 0===t?void 0:t.toLowerCase().includes(Fe.toLowerCase())),i=!Ce||e.priority===Ce;return r&&i}),Ke=He(ue),Ve=He(me),Xe="received"===we?Ke:Ve,Ze={total:ue.length,unread:ue.filter(e=>!e.read_at).length,important:ue.filter(e=>"important"===e.priority).length,urgent:ue.filter(e=>"urgent"===e.priority).length},et=(new Date).getMonth(),tt=(new Date).getFullYear(),rt={total:me.length,thisMonth:me.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===et&&t.getFullYear()===tt}).length,important:me.filter(e=>"important"===e.priority).length,urgent:me.filter(e=>"urgent"===e.priority).length},it=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),nt=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4),n=Math.floor(r/36e5),o=Math.floor(r/864e5);return i<1?"Just now":i<60?`${i}m ago`:n<24?`${n}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},ot=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return je?(0,l.jsxs)(a.mc,{children:[(0,l.jsx)(a.Y9,{children:(0,l.jsx)(a.hE,{children:"Notices"})}),(0,l.jsx)(a.UC,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,l.jsxs)(a.mc,{children:[(0,l.jsxs)(a.Y9,{children:[(0,l.jsx)(a.hE,{children:"Notices"}),(0,l.jsx)(a.ex,{children:(null===ye||void 0===ye?void 0:ye.canSend)&&(0,l.jsx)(a.$n,{variant:"primary",onClick:()=>{var e,t,r,i,n;ze({title:"",content:"",target_type:(null===ye||void 0===ye||null===(e=ye.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===ye||void 0===ye||null===(r=ye.foodcourts)||void 0===r||null===(i=r[0])||void 0===i||null===(n=i.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[],priority:"normal"}),_e(!0)},children:"New Notice"})})]}),(0,l.jsxs)(a.UC,{children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{active:"received"===we,onClick:()=>Ae("received"),children:["Received (",ue.length,")"]}),(0,l.jsxs)(p,{active:"sent"===we,onClick:()=>Ae("sent"),children:["Sent (",me.length,")"]})]}),"received"===we?(0,l.jsxs)(d.MD,{children:[(0,l.jsxs)(d.hI,{color:"#635BFF",children:[(0,l.jsx)(d.Os,{children:Ze.total}),(0,l.jsx)(d.v0,{children:"Total Received"})]}),(0,l.jsxs)(d.hI,{color:"#3B82F6",children:[(0,l.jsx)(d.Os,{children:Ze.unread}),(0,l.jsx)(d.v0,{children:"Unread"})]}),(0,l.jsxs)(d.hI,{color:"#F59E0B",children:[(0,l.jsx)(d.Os,{children:Ze.important}),(0,l.jsx)(d.v0,{children:"Important"})]}),(0,l.jsxs)(d.hI,{color:"#EF4444",children:[(0,l.jsx)(d.Os,{children:Ze.urgent}),(0,l.jsx)(d.v0,{children:"Urgent"})]})]}):(0,l.jsxs)(d.MD,{children:[(0,l.jsxs)(d.hI,{color:"#635BFF",children:[(0,l.jsx)(d.Os,{children:rt.total}),(0,l.jsx)(d.v0,{children:"Total Sent"})]}),(0,l.jsxs)(d.hI,{color:"#3B82F6",children:[(0,l.jsx)(d.Os,{children:rt.thisMonth}),(0,l.jsx)(d.v0,{children:"This Month"})]}),(0,l.jsxs)(d.hI,{color:"#F59E0B",children:[(0,l.jsx)(d.Os,{children:rt.important}),(0,l.jsx)(d.v0,{children:"Important"})]}),(0,l.jsxs)(d.hI,{color:"#EF4444",children:[(0,l.jsx)(d.Os,{children:rt.urgent}),(0,l.jsx)(d.v0,{children:"Urgent"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsx)(s.DO,{type:"text",placeholder:"Search notices...",value:Fe,onChange:e=>ke(e.target.value)}),(0,l.jsxs)(s.Jt,{value:Ce,onChange:e=>Ee(e.target.value),children:[(0,l.jsx)("option",{value:"",children:"All Priorities"}),(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,l.jsxs)(h,{children:[Xe.map(e=>{var t,r;const i="received"===we&&!e.read_at;return(0,l.jsxs)(u,{unread:i,onClick:()=>(async e=>{Oe(e),Ie(!0),Pe("");try{const t=await fetch(`/api/notices/${e.id}`,{headers:Je});if(t.ok){const e=await t.json();e.success&&(Oe(e.data),Le(e.data.comments||[]))}Qe()}catch(t){console.error("Error fetching notice detail:",t)}})(e),children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[i&&(0,l.jsx)(f,{}),(0,l.jsxs)("div",{children:[(0,l.jsx)(y,{children:e.title}),(0,l.jsxs)(v,{children:[(0,l.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"Unknown"]}),(0,l.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===we&&(0,l.jsxs)(k,{children:["To: ",ot(e)]})]})]})]}),(0,l.jsx)(j,{children:(0,l.jsx)(b,{priority:e.priority,children:e.priority})})]}),(0,l.jsx)(w,{children:e.content}),(0,l.jsxs)(A,{children:[(0,l.jsx)("span",{children:nt(e.createdAt)}),e.commentCount>0&&(0,l.jsxs)(F,{children:[e.commentCount," comment",1!==e.commentCount?"s":""]})]})]},e.id)}),0===Xe.length&&(0,l.jsxs)(pe,{children:[(0,l.jsx)("h3",{children:"No notices found"}),(0,l.jsx)("p",{children:"received"===we?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),Be&&(0,l.jsx)(C,{onClick:()=>_e(!1),children:(0,l.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(B,{children:[(0,l.jsx)(_,{children:"New Notice"}),(0,l.jsx)(S,{onClick:()=>_e(!1),children:"\xd7"})]}),(0,l.jsxs)(z,{children:[(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Title *"}),(0,l.jsx)(O,{type:"text",value:Se.title,onChange:e=>ze({...Se,title:e.target.value}),placeholder:"Notice title"})]}),(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Content *"}),(0,l.jsx)(I,{value:Se.content,onChange:e=>ze({...Se,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,l.jsxs)(T,{children:[(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Target"}),(0,l.jsx)(U,{value:Se.target_type,onChange:e=>{var t,r,i;return ze({...Se,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===ye||void 0===ye||null===(t=ye.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(i=r.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[]})},children:null===ye||void 0===ye||null===(e=ye.targetOptions)||void 0===e?void 0:e.map(e=>(0,l.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Priority"}),(0,l.jsxs)(U,{value:Se.priority,onChange:e=>ze({...Se,priority:e.target.value}),children:[(0,l.jsx)("option",{value:"normal",children:"Normal"}),(0,l.jsx)("option",{value:"important",children:"Important"}),(0,l.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===Se.target_type&&(null===ye||void 0===ye?void 0:ye.foodcourts)&&ye.foodcourts.length>0&&(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Select Foodcourt"}),(0,l.jsx)(U,{value:Se.foodcourt_id,onChange:e=>ze({...Se,foodcourt_id:e.target.value}),children:ye.foodcourts.map(e=>(0,l.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===Se.target_type&&(null===ye||void 0===ye?void 0:ye.restaurants)&&(0,l.jsxs)(N,{children:[(0,l.jsx)($,{children:"Select Restaurants"}),(0,l.jsxs)(P,{children:[(0,l.jsxs)(Y,{children:[Se.restaurant_ids.length," of ",ye.restaurants.length," selected"]}),(0,l.jsx)(R,{onClick:()=>{if(!ye)return;const e=ye.restaurants.map(e=>e.id),t=e.every(e=>Se.restaurant_ids.includes(e));ze(r=>({...r,restaurant_ids:t?[]:e}))},children:Se.restaurant_ids.length===ye.restaurants.length?"Deselect All":"Select All"})]}),(0,l.jsxs)(L,{children:[ye.restaurants.map(e=>(0,l.jsxs)(M,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Se.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void ze(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===ye.restaurants.length&&(0,l.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,l.jsxs)(D,{children:[(0,l.jsx)(a.$n,{variant:"secondary",onClick:()=>_e(!1),children:"Cancel"}),(0,l.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(Se.title.trim()&&Se.content.trim()){Ne(!0);try{const e={title:Se.title,content:Se.content,target_type:Se.target_type,priority:Se.priority};"foodcourt"===Se.target_type?e.foodcourt_id=parseInt(Se.foodcourt_id):"restaurant"===Se.target_type&&(e.restaurant_ids=Se.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:Je,body:JSON.stringify(e)})).ok?(_e(!1),await Promise.all([qe(),Qe()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}Ne(!1)}},disabled:De||!Se.title.trim()||!Se.content.trim()||"restaurant"===Se.target_type&&0===Se.restaurant_ids.length,children:De?"Sending...":"Send Notice"})]})]})}),Ue&&$e&&(0,l.jsx)(C,{onClick:()=>{Ie(!1),Oe(null)},children:(0,l.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,l.jsxs)(B,{children:[(0,l.jsx)(_,{children:$e.title}),(0,l.jsx)(S,{onClick:()=>{Ie(!1),Oe(null)},children:"\xd7"})]}),(0,l.jsxs)(z,{children:[(0,l.jsxs)(W,{children:[(0,l.jsxs)(Q,{children:["From: ",(0,l.jsx)("strong",{style:{marginLeft:"4px"},children:$e.author_name||(null===(t=$e.author)||void 0===t?void 0:t.name)||"Unknown"})]}),(0,l.jsx)(Q,{children:$e.author_role||(null===(r=$e.author)||void 0===r?void 0:r.role)||""}),(0,l.jsx)(Q,{children:it($e.createdAt)}),(0,l.jsx)(b,{priority:$e.priority,children:$e.priority})]}),(0,l.jsx)(J,{children:$e.content}),String($e.author_id)===String(null===n||void 0===n?void 0:n.id)&&$e.recipients&&$e.recipients.length>0&&(0,l.jsxs)(q,{children:[(0,l.jsx)(G,{children:"Recipients"}),(0,l.jsx)(H,{children:$e.recipients.map((e,t)=>{var r,i;return(0,l.jsx)(K,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(i=e.user)||void 0===i?void 0:i.name)||`Recipient ${t+1}`},t)})})]}),(0,l.jsxs)(V,{children:[(0,l.jsxs)(X,{children:["Comments (",Te.length,")"]}),Te.length>0&&(0,l.jsx)(Z,{children:Te.map(e=>{var t,r,i,o;return(0,l.jsxs)(ee,{children:[(0,l.jsx)(te,{children:(o=e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"U",o.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,l.jsxs)(re,{children:[(0,l.jsxs)(ie,{children:[e.author_name||(null===(r=e.author)||void 0===r?void 0:r.name)||"Unknown",(0,l.jsx)(ne,{children:e.author_role||(null===(i=e.author)||void 0===i?void 0:i.role)||""})]}),(0,l.jsx)(oe,{children:e.content}),(0,l.jsxs)(ae,{children:[it(e.createdAt),String(e.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,l.jsx)(de,{onClick:t=>{t.stopPropagation(),(async e=>{try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:Je})).ok&&Le(t=>t.filter(t=>t.id!==e))}catch(t){console.error("Error deleting comment:",t)}})(e.id)},children:"Delete"})]})]})]},e.id)})}),(0,l.jsxs)(se,{children:[(0,l.jsx)(le,{value:Me,onChange:e=>Pe(e.target.value),placeholder:"Write a comment..."}),(0,l.jsx)(ce,{onClick:async()=>{if(Me.trim()&&$e){Ye(!0);try{const e=await fetch("/api/comments",{method:"POST",headers:Je,body:JSON.stringify({entity_type:"notice",entity_id:String($e.id),content:Me})});if(e.ok){const t=await e.json();t.success&&(Le(e=>[...e,t.data]),Pe(""))}}catch(e){console.error("Error adding comment:",e)}Ye(!1)}},disabled:Re||!Me.trim(),children:Re?"...":"Send"})]})]})]}),String($e.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,l.jsx)(D,{children:(0,l.jsx)(he,{children:(0,l.jsx)(xe,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:Je})).ok&&(Ie(!1),Oe(null),await Promise.all([qe(),Qe()]))}catch(t){console.error("Error deleting notice:",t)}})($e.id),children:"Delete Notice"})})})]})})]})}}}]);