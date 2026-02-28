"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8018],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>u});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,d=i.Ay.a`
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
`,l=i.Ay.span`
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
`;const u=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(l,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},5637:(e,t,r)=>{r.r(t),r.d(t,{default:()=>me});var i=r(9950),n=r(4752),o=r(1367),a=r(3832),s=r(5665),d=r(2488),l=r(7455),c=r(4185),p=r(4414);const x=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
`,h=n.Ay.button`
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
`,u=n.Ay.div`
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
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`,m=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`,y=n.Ay.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`,v=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`,b=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,w=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`,A=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,F=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`,C=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`,E=n.Ay.span`
  color: #6B7C93;
  font-size: 12px;
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
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`,_=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 700px;
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
`,$=n.Ay.div`
  padding: 24px;
`,N=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,T=n.Ay.div`
  margin-bottom: 20px;
`,O=n.Ay.label`
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

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,P=n.Ay.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`,R=n.Ay.label`
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
`,J=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`,W=n.Ay.button`
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
`,K=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,Q=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`,X=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,Z=n.Ay.div`
  margin-bottom: 24px;
`,q=n.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,G=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,H=n.Ay.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,V=n.Ay.div`
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,ee=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,te=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`,re=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #FAFBFC;
  border-radius: 8px;
`,ie=n.Ay.div`
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
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`,ae=n.Ay.span`
  font-size: 11px;
  font-weight: 500;
  color: #6B7C93;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,se=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
`,de=n.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 4px;
`,le=n.Ay.button`
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
`,ce=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,pe=n.Ay.textarea`
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
`,xe=n.Ay.button`
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
`,he=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,ue=n.Ay.button`
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
`,ge=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,me=()=>{var e,t,r;const{user:n}=(0,o.As)(),[me,fe]=(0,i.useState)([]),[ye,ve]=(0,i.useState)([]),[be,je]=(0,i.useState)(null),[we,Ae]=(0,i.useState)(!0),[Fe,ke]=(0,i.useState)("received"),[Ce,Ee]=(0,i.useState)(""),[Be,_e]=(0,i.useState)(""),[Se,ze]=(0,i.useState)(!1),[De,$e]=(0,i.useState)({title:"",content:"",target_type:"",foodcourt_id:"",restaurant_ids:[],priority:"normal"}),[Ne,Te]=(0,i.useState)(!1),[Oe,Ie]=(0,i.useState)(null),[Ue,Le]=(0,i.useState)(!1),[Me,Pe]=(0,i.useState)([]),[Re,Je]=(0,i.useState)(""),[We,Ye]=(0,i.useState)(!1),[Ke,Qe]=(0,i.useState)({}),[Xe,Ze]=(0,i.useState)([]),qe={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},Ge=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Qe(e=>({...e,...t}))}}}catch(t){}},He=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:qe});if(e.ok){const t=await e.json();t.success&&je(t.data)}}catch(e){console.error("Error fetching metadata:",e)}},[]),Ve=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:qe});if(e.ok){const t=await e.json();t.success&&(fe(t.data),Ge(t.data))}}catch(e){console.error("Error fetching received notices:",e)}},[]),et=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:qe});if(e.ok){const t=await e.json();t.success&&(ve(t.data),Ge(t.data))}}catch(e){console.error("Error fetching sent notices:",e)}},[]),tt=(0,i.useCallback)(async()=>{Ae(!0),await Promise.all([He(),Ve(),et()]),Ae(!1)},[He,Ve,et]);(0,i.useEffect)(()=>{n&&tt()},[n,tt]);const rt=e=>e.filter(e=>{var t;const r=!Ce||e.title.toLowerCase().includes(Ce.toLowerCase())||(null===(t=e.author_name)||void 0===t?void 0:t.toLowerCase().includes(Ce.toLowerCase())),i=!Be||e.priority===Be;return r&&i}),it=rt(me),nt=rt(ye),ot="received"===Fe?it:nt,at={total:me.length,unread:me.filter(e=>!e.read_at).length,important:me.filter(e=>"important"===e.priority).length,urgent:me.filter(e=>"urgent"===e.priority).length},st=(new Date).getMonth(),dt=(new Date).getFullYear(),lt={total:ye.length,thisMonth:ye.filter(e=>{const t=new Date(e.createdAt);return t.getMonth()===st&&t.getFullYear()===dt}).length,important:ye.filter(e=>"important"===e.priority).length,urgent:ye.filter(e=>"urgent"===e.priority).length},ct=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),pt=e=>{const t=new Date(e),r=(new Date).getTime()-t.getTime(),i=Math.floor(r/6e4),n=Math.floor(r/36e5),o=Math.floor(r/864e5);return i<1?"Just now":i<60?`${i}m ago`:n<24?`${n}h ago`:o<7?`${o}d ago`:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})},xt=e=>{var t;if("foodcourt"===e.target_type&&e.foodcourt)return`Foodcourt: ${e.foodcourt.name}`;if("restaurant"===e.target_type&&e.recipients){const t=e.recipients.filter(e=>e.restaurant);return 1===t.length?`Restaurant: ${t[0].restaurant.name}`:`${t.length} restaurants`}return"all"===e.target_type?"All Users":"role"===e.target_type?`Roles: ${(null===(t=e.target_roles)||void 0===t?void 0:t.join(", "))||"N/A"}`:""};return we?(0,p.jsxs)(a.mc,{children:[(0,p.jsx)(a.Y9,{children:(0,p.jsx)(a.hE,{children:"Notices"})}),(0,p.jsx)(a.UC,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7C93"},children:"Loading..."})})]}):(0,p.jsxs)(a.mc,{children:[(0,p.jsxs)(a.Y9,{children:[(0,p.jsx)(a.hE,{children:"Notices"}),(0,p.jsx)(a.ex,{children:(null===be||void 0===be?void 0:be.canSend)&&(0,p.jsx)(a.$n,{variant:"primary",onClick:()=>{var e,t,r,i,n;$e({title:"",content:"",target_type:(null===be||void 0===be||null===(e=be.targetOptions)||void 0===e||null===(t=e[0])||void 0===t?void 0:t.value)||"foodcourt",foodcourt_id:(null===be||void 0===be||null===(r=be.foodcourts)||void 0===r||null===(i=r[0])||void 0===i||null===(n=i.id)||void 0===n?void 0:n.toString())||"",restaurant_ids:[],priority:"normal"}),ze(!0)},children:"New Notice"})})]}),(0,p.jsxs)(a.UC,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{active:"received"===Fe,onClick:()=>ke("received"),children:["Received (",me.length,")"]}),(0,p.jsxs)(h,{active:"sent"===Fe,onClick:()=>ke("sent"),children:["Sent (",ye.length,")"]})]}),"received"===Fe?(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#635BFF",children:[(0,p.jsx)(s.Os,{children:at.total}),(0,p.jsx)(s.v0,{children:"Total Received"})]}),(0,p.jsxs)(s.hI,{color:"#3B82F6",children:[(0,p.jsx)(s.Os,{children:at.unread}),(0,p.jsx)(s.v0,{children:"Unread"})]}),(0,p.jsxs)(s.hI,{color:"#F59E0B",children:[(0,p.jsx)(s.Os,{children:at.important}),(0,p.jsx)(s.v0,{children:"Important"})]}),(0,p.jsxs)(s.hI,{color:"#EF4444",children:[(0,p.jsx)(s.Os,{children:at.urgent}),(0,p.jsx)(s.v0,{children:"Urgent"})]})]}):(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#635BFF",children:[(0,p.jsx)(s.Os,{children:lt.total}),(0,p.jsx)(s.v0,{children:"Total Sent"})]}),(0,p.jsxs)(s.hI,{color:"#3B82F6",children:[(0,p.jsx)(s.Os,{children:lt.thisMonth}),(0,p.jsx)(s.v0,{children:"This Month"})]}),(0,p.jsxs)(s.hI,{color:"#F59E0B",children:[(0,p.jsx)(s.Os,{children:lt.important}),(0,p.jsx)(s.v0,{children:"Important"})]}),(0,p.jsxs)(s.hI,{color:"#EF4444",children:[(0,p.jsx)(s.Os,{children:lt.urgent}),(0,p.jsx)(s.v0,{children:"Urgent"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:Ce,onChange:e=>Ee(e.target.value)}),(0,p.jsxs)(d.Jt,{value:Be,onChange:e=>_e(e.target.value),children:[(0,p.jsx)("option",{value:"",children:"All Priorities"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(g,{children:[ot.map(e=>{var t,r,i;const n="received"===Fe&&!e.read_at;return(0,p.jsxs)(m,{unread:n,onClick:()=>(async e=>{Ie(e),Le(!0),Je("");const t=localStorage.getItem("auth_token");fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),Qe(t=>{const r={...t};return r[String(e.id)]&&(r[String(e.id)]={...r[String(e.id)],unread_count:0}),r});try{const t=await fetch(`/api/notices/${e.id}`,{headers:qe});if(t.ok){const e=await t.json();e.success&&(Ie(e.data),Pe(e.data.comments||[]))}Ve()}catch(r){console.error("Error fetching notice detail:",r)}})(e),children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(y,{children:[n&&(0,p.jsx)(v,{}),(0,p.jsxs)("div",{children:[(0,p.jsx)(b,{children:e.title}),(0,p.jsxs)(j,{children:[(0,p.jsxs)("span",{children:["From: ",e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"Unknown"]}),(0,p.jsx)("span",{children:e.author_role||(null===(r=e.author)||void 0===r?void 0:r.role)||""}),"sent"===Fe&&(0,p.jsxs)(E,{children:["To: ",xt(e)]})]})]})]}),(0,p.jsx)(w,{children:(0,p.jsx)(A,{priority:e.priority,children:e.priority})})]}),(0,p.jsx)(F,{children:e.content}),(0,p.jsxs)(k,{children:[(0,p.jsx)("span",{children:pt(e.createdAt)}),e.commentCount>0&&(0,p.jsxs)(C,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(i=Ke[String(e.id)])||void 0===i?void 0:i.unread_count)>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Ke[String(e.id)].unread_count," new"]})]})]})]},e.id)}),0===ot.length&&(0,p.jsxs)(he,{children:[(0,p.jsx)("h3",{children:"No notices found"}),(0,p.jsx)("p",{children:"received"===Fe?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]})]})]}),Se&&(0,p.jsx)(B,{onClick:()=>ze(!1),children:(0,p.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(z,{children:"New Notice"}),(0,p.jsx)(D,{onClick:()=>ze(!1),children:"\xd7"})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Title *"}),(0,p.jsx)(I,{type:"text",value:De.title,onChange:e=>$e({...De,title:e.target.value}),placeholder:"Notice title"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Content *"}),(0,p.jsx)(L,{value:De.content,onChange:e=>$e({...De,content:e.target.value}),placeholder:"Write your notice content here..."})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Attachments"}),(0,p.jsx)(l.A,{files:Xe,onChange:Ze,maxFiles:5})]}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Target"}),(0,p.jsx)(U,{value:De.target_type,onChange:e=>{var t,r,i;return $e({...De,target_type:e.target.value,foodcourt_id:"foodcourt"===e.target.value&&(null===be||void 0===be||null===(t=be.foodcourts)||void 0===t||null===(r=t[0])||void 0===r||null===(i=r.id)||void 0===i?void 0:i.toString())||"",restaurant_ids:[]})},children:null===be||void 0===be||null===(e=be.targetOptions)||void 0===e?void 0:e.map(e=>(0,p.jsx)("option",{value:e.value,children:e.label},e.value))})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Priority"}),(0,p.jsxs)(U,{value:De.priority,onChange:e=>$e({...De,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"foodcourt"===De.target_type&&(null===be||void 0===be?void 0:be.foodcourts)&&be.foodcourts.length>0&&(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Select Foodcourt"}),(0,p.jsx)(U,{value:De.foodcourt_id,onChange:e=>$e({...De,foodcourt_id:e.target.value}),children:be.foodcourts.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))})]}),"restaurant"===De.target_type&&(null===be||void 0===be?void 0:be.restaurants)&&(0,p.jsxs)(T,{children:[(0,p.jsx)(O,{children:"Select Restaurants"}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[De.restaurant_ids.length," of ",be.restaurants.length," selected"]}),(0,p.jsx)(W,{onClick:()=>{if(!be)return;const e=be.restaurants.map(e=>e.id),t=e.every(e=>De.restaurant_ids.includes(e));$e(r=>({...r,restaurant_ids:t?[]:e}))},children:De.restaurant_ids.length===be.restaurants.length?"Deselect All":"Select All"})]}),(0,p.jsxs)(P,{children:[be.restaurants.map(e=>(0,p.jsxs)(R,{children:[(0,p.jsx)("input",{type:"checkbox",checked:De.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void $e(e=>({...e,restaurant_ids:e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t]}));var t}}),e.name]},e.id)),0===be.restaurants.length&&(0,p.jsx)("div",{style:{padding:"12px",textAlign:"center",color:"#9CA3AF",fontSize:"13px"},children:"No restaurants available"})]})]})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>ze(!1),children:"Cancel"}),(0,p.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(De.title.trim()&&De.content.trim()){Te(!0);try{const e={title:De.title,content:De.content,target_type:De.target_type,priority:De.priority,attachments:Xe.length>0?Xe:void 0};"foodcourt"===De.target_type?e.foodcourt_id=parseInt(De.foodcourt_id):"restaurant"===De.target_type&&(e.restaurant_ids=De.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:qe,body:JSON.stringify(e)})).ok?(ze(!1),Ze([]),await Promise.all([et(),Ve()])):console.error("Failed to send notice")}catch(e){console.error("Error sending notice:",e)}Te(!1)}},disabled:Ne||!De.title.trim()||!De.content.trim()||"restaurant"===De.target_type&&0===De.restaurant_ids.length,children:Ne?"Sending...":"Send Notice"})]})]})}),Ue&&Oe&&(0,p.jsx)(B,{onClick:()=>{Le(!1),Ie(null)},children:(0,p.jsxs)(_,{onClick:e=>e.stopPropagation(),style:{maxWidth:"750px"},children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(z,{children:Oe.title}),(0,p.jsx)(D,{onClick:()=>{Le(!1),Ie(null)},children:"\xd7"})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(Q,{children:[(0,p.jsxs)(X,{children:["From: ",(0,p.jsx)("strong",{style:{marginLeft:"4px"},children:Oe.author_name||(null===(t=Oe.author)||void 0===t?void 0:t.name)||"Unknown"})]}),(0,p.jsx)(X,{children:Oe.author_role||(null===(r=Oe.author)||void 0===r?void 0:r.role)||""}),(0,p.jsx)(X,{children:ct(Oe.createdAt)}),(0,p.jsx)(A,{priority:Oe.priority,children:Oe.priority})]}),(0,p.jsx)(K,{children:Oe.content}),(null===Oe||void 0===Oe?void 0:Oe.attachments)&&Oe.attachments.length>0&&(0,p.jsx)("div",{style:{marginTop:"16px"},children:(0,p.jsx)(c.A,{attachments:Oe.attachments})}),String(Oe.author_id)===String(null===n||void 0===n?void 0:n.id)&&Oe.recipients&&Oe.recipients.length>0&&(0,p.jsxs)(Z,{children:[(0,p.jsx)(q,{children:"Recipients"}),(0,p.jsx)(G,{children:Oe.recipients.map((e,t)=>{var r,i;return(0,p.jsx)(H,{children:(null===(r=e.restaurant)||void 0===r?void 0:r.name)||(null===(i=e.user)||void 0===i?void 0:i.name)||`Recipient ${t+1}`},t)})})]}),(0,p.jsxs)(V,{children:[(0,p.jsxs)(ee,{children:["Comments (",Me.length,")"]}),Me.length>0&&(0,p.jsx)(te,{children:Me.map(e=>{var t,r,i,o;return(0,p.jsxs)(re,{children:[(0,p.jsx)(ie,{children:(o=e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"U",o.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2))}),(0,p.jsxs)(ne,{children:[(0,p.jsxs)(oe,{children:[e.author_name||(null===(r=e.author)||void 0===r?void 0:r.name)||"Unknown",(0,p.jsx)(ae,{children:e.author_role||(null===(i=e.author)||void 0===i?void 0:i.role)||""})]}),(0,p.jsx)(se,{children:e.content}),(0,p.jsxs)(de,{children:[ct(e.createdAt),String(e.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,p.jsx)(le,{onClick:t=>{t.stopPropagation(),(async e=>{try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:qe})).ok&&Pe(t=>t.filter(t=>t.id!==e))}catch(t){console.error("Error deleting comment:",t)}})(e.id)},children:"Delete"})]})]})]},e.id)})}),(0,p.jsxs)(ce,{children:[(0,p.jsx)(pe,{value:Re,onChange:e=>Je(e.target.value),placeholder:"Write a comment..."}),(0,p.jsx)(xe,{onClick:async()=>{if(Re.trim()&&Oe){Ye(!0);try{const e=await fetch("/api/comments",{method:"POST",headers:qe,body:JSON.stringify({entity_type:"notice",entity_id:String(Oe.id),content:Re})});if(e.ok){const t=await e.json();t.success&&(Pe(e=>[...e,t.data]),Je(""))}}catch(e){console.error("Error adding comment:",e)}Ye(!1)}},disabled:We||!Re.trim(),children:We?"...":"Send"})]})]})]}),String(Oe.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,p.jsx)(N,{children:(0,p.jsx)(ge,{children:(0,p.jsx)(ue,{onClick:()=>(async e=>{try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:qe})).ok&&(Le(!1),Ie(null),await Promise.all([et(),Ve()]))}catch(t){console.error("Error deleting notice:",t)}})(Oe.id),children:"Delete Notice"})})})]})})]})}},7455:(e,t,r)=>{r.d(t,{A:()=>b});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
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
`,d=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 4px 0;
`,l=n.Ay.p`
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
`,u=n.Ay.div`
  flex: 1;
  min-width: 0;
`,g=n.Ay.div`
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
`,v=n.Ay.div`
  width: 14px;
  height: 14px;
  border: 2px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
  @keyframes spin { to { transform: rotate(360deg); } }
`;const b=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:b=10,disabled:j=!1,compact:w=!1}=e;const[A,F]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),E=(0,i.useRef)(null),B=!j&&!k&&t.length<n,_=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[B&&(0,o.jsx)(s,{isDragging:A,disabled:!B,onClick:()=>{var e;return B&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),B&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),B&&e.dataTransfer.files.length>0&&_(e.dataTransfer.files)},children:w?(0,o.jsxs)(d,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(l,{children:["Images, PDF, DOC, XLS, ZIP (max ",b,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&_(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(v,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(u,{children:[(0,o.jsx)(g,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!j&&(0,o.jsx)(f,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);