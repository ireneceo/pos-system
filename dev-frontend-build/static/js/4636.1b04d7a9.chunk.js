"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4636],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,d=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(a,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(s,{...r,children:t})}},4185:(e,t,r)=>{r.d(t,{A:()=>g});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`;const g=e=>{let{attachments:t}=e;if(!t||0===t.length)return null;const r=t.filter(e=>{var t;return null===(t=e.mimeType)||void 0===t?void 0:t.startsWith("image/")}),i=t.filter(e=>{var t;return!(null!==(t=e.mimeType)&&void 0!==t&&t.startsWith("image/"))});return(0,n.jsxs)(o,{children:[(0,n.jsxs)(a,{children:["Attachments (",t.length,")"]}),r.length>0&&(0,n.jsx)(x,{children:r.map((e,t)=>(0,n.jsx)(h,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,n.jsx)("img",{src:e.url,alt:e.originalName})},t))}),i.length>0&&(0,n.jsx)(s,{children:i.map((e,t)=>{return(0,n.jsxs)(d,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,n.jsx)(l,{children:(i=e.mimeType,"application/pdf"===i?"\ud83d\udcc4":i.includes("word")||i.includes("document")?"\ud83d\udcdd":i.includes("sheet")||i.includes("excel")?"\ud83d\udcca":i.includes("zip")||i.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,n.jsx)(c,{children:e.originalName}),(0,n.jsx)(p,{children:(r=e.size,r<1024?`${r}B`:r<1048576?`${(r/1024).toFixed(1)}KB`:`${(r/1048576).toFixed(1)}MB`)})]},t);var r,i})})]})}},4636:(e,t,r)=>{r.r(t),r.d(t,{default:()=>me});var i=r(9950),n=r(4752),o=r(1367),a=r(3832),s=r(5665),d=r(2488),l=r(7455),c=r(4185),p=r(4414);const x=n.Ay.div`
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
`,u=n.Ay.div`
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

  ${e=>e.unread&&"\n    border-left: 3px solid #635BFF;\n  "}

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
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`,b=n.Ay.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`,j=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,v=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`,w=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"important":return"#FEF3C7";default:return"#E3E8EE"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#991B1B";case"important":return"#92400E";default:return"#6B7280"}}};
`,A=n.Ay.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`,F=n.Ay.div`
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
`,_=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,B=n.Ay.span`
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
`,S=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: ${e=>e.maxWidth||"720px"};
  width: 90%;
  flex-shrink: 0;
`,D=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,$=n.Ay.h2`
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
`,T=n.Ay.div`
  padding: 24px;
`,O=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,I=n.Ay.div`
  margin-bottom: 20px;
`,U=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,L=n.Ay.input`
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
`,P=n.Ay.textarea`
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
`,M=n.Ay.select`
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
`,R=n.Ay.div`
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
`,Y=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,K=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`,Q=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`,X=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,Z=n.Ay.span`
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
`,ee=n.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F8FAFC;
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
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`,ne=n.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,oe=n.Ay.span`
  font-size: 11px;
  color: #6B7C93;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,ae=n.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,se=n.Ay.div`
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  white-space: pre-wrap;
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
`,le=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`,ce=n.Ay.textarea`
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
`,pe=n.Ay.button`
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
`,xe=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,he=n.Ay.button`
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
`,ge=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,ue=n.Ay.div`
  text-align: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 13px;
`,me=()=>{var e,t,r;const{user:n}=(0,o.As)(),[me,fe]=(0,i.useState)("received"),[ye,be]=(0,i.useState)([]),[je,ve]=(0,i.useState)([]),[we,Ae]=(0,i.useState)(null),[Fe,ke]=(0,i.useState)(""),[Ce,Ee]=(0,i.useState)(""),[_e,Be]=(0,i.useState)(!1),[ze,Se]=(0,i.useState)(!1),[De,$e]=(0,i.useState)({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),[Ne,Te]=(0,i.useState)(!1),[Oe,Ie]=(0,i.useState)([]),[Ue,Le]=(0,i.useState)(!1),[Pe,Me]=(0,i.useState)(null),[Re,We]=(0,i.useState)([]),[Je,Ye]=(0,i.useState)(""),[Ke,Qe]=(0,i.useState)(!1),[Xe,Ze]=(0,i.useState)({}),qe=(0,i.useCallback)(()=>({Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"}),[]),Ge=async e=>{if(0!==e.length)try{const t=localStorage.getItem("auth_token"),r=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${r}`,{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const e=await i.json();if(e.success){const t={};e.data.forEach(e=>{t[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),Ze(e=>({...e,...t}))}}}catch(t){}},He=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/metadata",{headers:qe()});if(e.ok){const t=await e.json();Ae(t.data||t)}}catch(e){console.error("Error fetching metadata:",e)}},[qe]),Ve=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/received",{headers:qe()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];be(i),Ge(i)}}catch(e){console.error("Error fetching received notices:",e)}},[qe]),et=(0,i.useCallback)(async()=>{try{const e=await fetch("/api/notices/sent",{headers:qe()});if(e.ok){const t=await e.json(),r=t.data||t,i=Array.isArray(r)?r:[];ve(i),Ge(i)}}catch(e){console.error("Error fetching sent notices:",e)}},[qe]),tt=(0,i.useCallback)(async()=>{Be(!0),await Promise.all([He(),Ve(),et()]),Be(!1)},[He,Ve,et]);(0,i.useEffect)(()=>{n&&tt()},[n,tt]);const rt=async e=>{try{const t=await fetch(`/api/notices/${e}`,{headers:qe()});if(t.ok){const e=await t.json(),r=e.data||e;Me(r),Ve()}}catch(t){console.error("Error fetching notice detail:",t)}},it=async e=>{try{const t=await fetch(`/api/comments/notice/${e}`,{headers:qe()});if(t.ok){const e=await t.json(),r=e.data||e;We(Array.isArray(r)?r:[])}}catch(t){console.error("Error fetching comments:",t)}},nt=async()=>{if(Je.trim()&&Pe){Qe(!0);try{(await fetch("/api/comments",{method:"POST",headers:qe(),body:JSON.stringify({entity_type:"notice",entity_id:Pe.id,content:Je.trim()})})).ok&&(Ye(""),it(Pe.id))}catch(e){console.error("Error adding comment:",e)}finally{Qe(!1)}}},ot=("received"===me?ye:je).filter(e=>{const t=!Fe||e.title.toLowerCase().includes(Fe.toLowerCase())||e.content.toLowerCase().includes(Fe.toLowerCase()),r=!Ce||e.priority===Ce;return t&&r}),at=ye.length,st=ye.filter(e=>!e.read_at).length,dt=ye.filter(e=>"important"===e.priority).length,lt=ye.filter(e=>"urgent"===e.priority).length,ct=je.length,pt=je.filter(e=>{const t=new Date,r=new Date(e.createdAt);return r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}).length,xt=je.filter(e=>"important"===e.priority).length,ht=je.filter(e=>"urgent"===e.priority).length,gt=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),ut=e=>{if("brand"===e.target_type&&e.brand)return`Brand: ${e.brand.name||e.brand.brand_name||"Unknown"}`;if("select_restaurants"===e.target_type){var t;const r=(null===(t=e.recipients)||void 0===t?void 0:t.length)||0;return`${r} restaurant${1!==r?"s":""}`}return"all"===e.target_type?"All":e.target_roles&&e.target_roles.length>0?e.target_roles.join(", "):e.target_type||"N/A"},mt=e=>e.recipients?e.recipients.filter(e=>e.read_at).length:0,ft=e=>{var t;return(null===(t=e.recipients)||void 0===t?void 0:t.length)||0};return(0,p.jsxs)(a.mc,{children:[(0,p.jsxs)(a.Y9,{children:[(0,p.jsx)(a.hE,{children:"Notices"}),(0,p.jsx)(a.ex,{children:(0,p.jsx)(a.$n,{variant:"primary",onClick:()=>{$e({title:"",content:"",target_type:"",brand_id:"",restaurant_ids:[],priority:"normal"}),Ie([]),Se(!0)},children:"New Notice"})})]}),(0,p.jsxs)(a.UC,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(h,{active:"received"===me,onClick:()=>fe("received"),children:["Received (",at,")"]}),(0,p.jsxs)(h,{active:"sent"===me,onClick:()=>fe("sent"),children:["Sent (",ct,")"]})]}),"received"===me?(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#635BFF",children:[(0,p.jsx)(s.Os,{children:at}),(0,p.jsx)(s.v0,{children:"Total Received"})]}),(0,p.jsxs)(s.hI,{color:"#F59E0B",children:[(0,p.jsx)(s.Os,{children:st}),(0,p.jsx)(s.v0,{children:"Unread"})]}),(0,p.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,p.jsx)(s.Os,{children:dt}),(0,p.jsx)(s.v0,{children:"Important"})]}),(0,p.jsxs)(s.hI,{color:"#EF4444",children:[(0,p.jsx)(s.Os,{children:lt}),(0,p.jsx)(s.v0,{children:"Urgent"})]})]}):(0,p.jsxs)(s.MD,{children:[(0,p.jsxs)(s.hI,{color:"#635BFF",children:[(0,p.jsx)(s.Os,{children:ct}),(0,p.jsx)(s.v0,{children:"Total Sent"})]}),(0,p.jsxs)(s.hI,{color:"#10B981",children:[(0,p.jsx)(s.Os,{children:pt}),(0,p.jsx)(s.v0,{children:"This Month"})]}),(0,p.jsxs)(s.hI,{color:"#8B5CF6",children:[(0,p.jsx)(s.Os,{children:xt}),(0,p.jsx)(s.v0,{children:"Important"})]}),(0,p.jsxs)(s.hI,{color:"#EF4444",children:[(0,p.jsx)(s.Os,{children:ht}),(0,p.jsx)(s.v0,{children:"Urgent"})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(d.DO,{type:"text",placeholder:"Search notices...",value:Fe,onChange:e=>ke(e.target.value)}),(0,p.jsxs)(d.Jt,{value:Ce,onChange:e=>Ee(e.target.value),children:[(0,p.jsx)("option",{value:"",children:"All Priorities"}),(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(u,{children:[_e&&0===ot.length&&(0,p.jsx)(xe,{children:(0,p.jsx)("p",{children:"Loading notices..."})}),!_e&&0===ot.length&&(0,p.jsxs)(xe,{children:[(0,p.jsx)("h3",{children:"No notices found"}),(0,p.jsx)("p",{children:"received"===me?"You have no received notices yet.":'You have not sent any notices yet. Click "New Notice" to send one.'})]}),ot.map(e=>{var t,r;return(0,p.jsxs)(m,{unread:"received"===me&&!e.read_at,onClick:()=>(async e=>{Me(e),Le(!0),We([]),Ye("");const t=localStorage.getItem("auth_token");fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({entity_type:"notice",entity_id:String(e.id)})}).catch(()=>{}),Ze(t=>{const r={...t};return r[String(e.id)]&&(r[String(e.id)]={...r[String(e.id)],unread_count:0}),r}),await Promise.all([rt(e.id),it(e.id)])})(e),children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(y,{children:["received"===me&&!e.read_at&&(0,p.jsx)(b,{}),(0,p.jsx)(j,{children:e.title})]}),(0,p.jsx)(v,{children:(0,p.jsx)(w,{priority:e.priority,children:e.priority})})]}),(0,p.jsx)(F,{children:e.content}),(0,p.jsxs)(k,{children:[(0,p.jsx)(C,{children:"received"===me?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(_,{children:[e.author_name||"Unknown",(0,p.jsx)(A,{children:e.author_role||"Admin"})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(_,{children:["To: ",ut(e)]}),(0,p.jsxs)(_,{children:[mt(e),"/",ft(e)," read"]})]})}),(0,p.jsxs)(E,{children:[e.commentCount>0&&(0,p.jsxs)(B,{children:[e.commentCount," comment",1!==e.commentCount?"s":"",(null===(t=Xe[String(e.id)])||void 0===t?void 0:t.unread_count)>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600,marginLeft:"4px"},children:[Xe[String(e.id)].unread_count," new"]})]}),(0,p.jsx)(_,{children:(r=e.createdAt,new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))})]})]})]},e.id)})]})]}),ze&&(0,p.jsx)(z,{onClick:()=>Se(!1),children:(0,p.jsxs)(S,{maxWidth:"720px",onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(D,{children:[(0,p.jsx)($,{children:"New Notice"}),(0,p.jsx)(N,{onClick:()=>Se(!1),children:"\xd7"})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Title *"}),(0,p.jsx)(L,{type:"text",placeholder:"Enter notice title",value:De.title,onChange:e=>$e({...De,title:e.target.value})})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Content *"}),(0,p.jsx)(P,{placeholder:"Enter notice content...",value:De.content,onChange:e=>$e({...De,content:e.target.value})})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Attachments"}),(0,p.jsx)(l.A,{files:Oe,onChange:Ie,maxFiles:5})]}),(0,p.jsxs)(R,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Target Type *"}),(0,p.jsxs)(M,{value:De.target_type,onChange:e=>$e({...De,target_type:e.target.value,brand_id:"",restaurant_ids:[]}),children:[(0,p.jsx)("option",{value:"",children:"Select target..."}),(null===we||void 0===we||null===(e=we.targetOptions)||void 0===e?void 0:e.map(e=>(0,p.jsx)("option",{value:e.value,children:e.label},e.value)))||(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("option",{value:"brand",children:"By Brand"}),(0,p.jsx)("option",{value:"select_restaurants",children:"Select Restaurants"})]})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Priority"}),(0,p.jsxs)(M,{value:De.priority,onChange:e=>$e({...De,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"normal",children:"Normal"}),(0,p.jsx)("option",{value:"important",children:"Important"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]})]}),"brand"===De.target_type&&(null===we||void 0===we?void 0:we.brands)&&(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Select Brand *"}),(0,p.jsxs)(M,{value:De.brand_id,onChange:e=>$e({...De,brand_id:e.target.value}),children:[(0,p.jsx)("option",{value:"",children:"Choose a brand..."}),we.brands.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),"select_restaurants"===De.target_type&&(null===we||void 0===we?void 0:we.restaurants)&&(0,p.jsxs)(I,{children:[(0,p.jsx)(U,{children:"Select Restaurants *"}),(0,p.jsxs)(W,{children:[we.restaurants.map(e=>(0,p.jsxs)(J,{children:[(0,p.jsx)("input",{type:"checkbox",checked:De.restaurant_ids.includes(e.id),onChange:()=>{return t=e.id,void $e(e=>{const r=e.restaurant_ids.includes(t)?e.restaurant_ids.filter(e=>e!==t):[...e.restaurant_ids,t];return{...e,restaurant_ids:r}});var t}}),e.name]},e.id)),0===we.restaurants.length&&(0,p.jsx)("div",{style:{padding:"12px",color:"#9CA3AF",fontSize:"13px",textAlign:"center"},children:"No restaurants available"})]}),(0,p.jsxs)(Y,{children:[De.restaurant_ids.length," restaurant",1!==De.restaurant_ids.length?"s":""," selected"]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(a.$n,{variant:"secondary",onClick:()=>Se(!1),children:"Cancel"}),(0,p.jsx)(a.$n,{variant:"primary",onClick:async()=>{if(De.title.trim()&&De.content.trim()&&De.target_type){Te(!0);try{const e={title:De.title.trim(),content:De.content.trim(),target_type:De.target_type,priority:De.priority,attachments:Oe.length>0?Oe:void 0};"brand"===De.target_type&&De.brand_id&&(e.brand_id=Number(De.brand_id)),"select_restaurants"===De.target_type&&De.restaurant_ids.length>0&&(e.restaurant_ids=De.restaurant_ids);(await fetch("/api/notices",{method:"POST",headers:qe(),body:JSON.stringify(e)})).ok&&(Se(!1),Ie([]),et())}catch(e){console.error("Error creating notice:",e)}finally{Te(!1)}}},disabled:Ne||!De.title.trim()||!De.content.trim()||!De.target_type||"brand"===De.target_type&&!De.brand_id||"select_restaurants"===De.target_type&&0===De.restaurant_ids.length,children:Ne?"Sending...":"Send Notice"})]})]})}),Ue&&Pe&&(0,p.jsx)(z,{onClick:()=>{Le(!1),Me(null)},children:(0,p.jsxs)(S,{maxWidth:"800px",onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(D,{children:[(0,p.jsx)($,{children:Pe.title}),(0,p.jsxs)(ge,{children:[(0,p.jsx)(w,{priority:Pe.priority,children:Pe.priority}),(yt=Pe,String(yt.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,p.jsx)(he,{onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this notice?"))try{(await fetch(`/api/notices/${e}`,{method:"DELETE",headers:qe()})).ok&&(Le(!1),Me(null),et(),Ve())}catch(t){console.error("Error deleting notice:",t)}})(Pe.id),children:"Delete"})),(0,p.jsx)(N,{onClick:()=>{Le(!1),Me(null)},children:"\xd7"})]})]}),(0,p.jsxs)(T,{children:[(0,p.jsxs)(Q,{children:[(0,p.jsxs)(X,{children:[(0,p.jsx)(Z,{children:"From"}),(0,p.jsxs)(q,{children:[Pe.author_name||(null===(t=Pe.author)||void 0===t?void 0:t.name)||"Unknown"," ","(",Pe.author_role||(null===(r=Pe.author)||void 0===r?void 0:r.role)||"N/A",")"]})]}),(0,p.jsxs)(X,{children:[(0,p.jsx)(Z,{children:"To"}),(0,p.jsx)(q,{children:ut(Pe)})]}),(0,p.jsxs)(X,{children:[(0,p.jsx)(Z,{children:"Date"}),(0,p.jsx)(q,{children:gt(Pe.createdAt)})]}),Pe.recipients&&Pe.recipients.length>0&&(0,p.jsxs)(X,{children:[(0,p.jsx)(Z,{children:"Read Status"}),(0,p.jsxs)(q,{children:[mt(Pe),"/",ft(Pe)," read"]})]})]}),(0,p.jsx)(K,{children:Pe.content}),(null===Pe||void 0===Pe?void 0:Pe.attachments)&&Pe.attachments.length>0&&(0,p.jsx)(c.A,{attachments:Pe.attachments}),(0,p.jsxs)(G,{children:[(0,p.jsxs)(H,{children:["Comments (",Re.length,")"]}),(0,p.jsxs)(V,{children:[0===Re.length&&(0,p.jsx)(ue,{children:"No comments yet. Be the first to comment."}),Re.map(e=>{var t,r,i,o;return(0,p.jsxs)(ee,{children:[(0,p.jsx)(te,{children:(o=e.author_name||(null===(t=e.author)||void 0===t?void 0:t.name)||"",o?o.charAt(0).toUpperCase():"?")}),(0,p.jsxs)(re,{children:[(0,p.jsxs)(ie,{children:[(0,p.jsx)(ne,{children:e.author_name||(null===(r=e.author)||void 0===r?void 0:r.name)||"Unknown"}),(0,p.jsx)(oe,{children:e.author_role||(null===(i=e.author)||void 0===i?void 0:i.role)||"N/A"}),(0,p.jsx)(ae,{children:gt(e.createdAt)}),String(e.author_id)===String(null===n||void 0===n?void 0:n.id)&&(0,p.jsx)(de,{onClick:t=>{t.stopPropagation(),(async e=>{if(Pe)try{(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:qe()})).ok&&it(Pe.id)}catch(t){console.error("Error deleting comment:",t)}})(e.id)},children:"Delete"})]}),(0,p.jsx)(se,{children:e.content})]})]},e.id)})]}),(0,p.jsxs)(le,{children:[(0,p.jsx)(ce,{placeholder:"Write a comment...",value:Je,onChange:e=>Ye(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),nt())}}),(0,p.jsx)(pe,{onClick:nt,disabled:!Je.trim()||Ke,children:Ke?"Sending...":"Send"})]})]})]})]})})]});var yt}},7455:(e,t,r)=>{r.d(t,{A:()=>j});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
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
`;const j=e=>{let{files:t,onChange:r,maxFiles:n=5,maxSizeMB:j=10,disabled:v=!1,compact:w=!1}=e;const[A,F]=(0,i.useState)(!1),[k,C]=(0,i.useState)(!1),E=(0,i.useRef)(null),_=!v&&!k&&t.length<n,B=async e=>{const i=n-t.length,o=Array.from(e).slice(0,i);if(0!==o.length){for(const e of o)e.size;C(!0);try{const e=new FormData;o.forEach(t=>e.append("files",t));const i=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${i}`},body:e}),a=await n.json();a.success&&a.data&&r([...t,...a.data])}catch(a){console.error("File upload error:",a)}finally{C(!1)}}};return(0,o.jsxs)(a,{children:[_&&(0,o.jsx)(s,{isDragging:A,disabled:!_,onClick:()=>{var e;return _&&(null===(e=E.current)||void 0===e?void 0:e.click())},onDragEnter:e=>{e.preventDefault(),_&&F(!0)},onDragLeave:e=>{e.preventDefault(),F(!1)},onDragOver:e=>{e.preventDefault()},onDrop:e=>{e.preventDefault(),F(!1),_&&e.dataTransfer.files.length>0&&B(e.dataTransfer.files)},children:w?(0,o.jsxs)(d,{children:["Click or drag files to attach (",t.length,"/",n,")"]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{children:A?"Drop files here":"Click or drag files to attach"}),(0,o.jsxs)(l,{children:["Images, PDF, DOC, XLS, ZIP (max ",j,"MB each, ",n-t.length," remaining)"]})]})}),(0,o.jsx)(c,{ref:E,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:e=>{e.target.files&&e.target.files.length>0&&B(e.target.files),e.target.value=""}}),(t.length>0||k)&&(0,o.jsxs)(p,{children:[k&&(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{}),"Uploading..."]}),t.map((e,i)=>{return(0,o.jsxs)(x,{children:[(0,o.jsx)(h,{children:(a=e.mimeType,a.startsWith("image/")?"\ud83d\uddbc":"application/pdf"===a?"\ud83d\udcc4":a.includes("word")||a.includes("document")?"\ud83d\udcdd":a.includes("sheet")||a.includes("excel")?"\ud83d\udcca":a.includes("zip")||a.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{children:e.originalName}),(0,o.jsx)(m,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]}),!v&&(0,o.jsx)(f,{onClick:()=>(async e=>{const i=t[e];try{const e=localStorage.getItem("auth_token");await fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({url:i.url})})}catch(n){}r(t.filter((t,r)=>r!==e))})(i),title:"Remove",children:"\u2715"})]},e.url);var n,a})]})]})}}}]);