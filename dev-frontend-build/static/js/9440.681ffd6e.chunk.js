"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>c,Qn:()=>x});i(9950);var n=i(4752),a=i(4414);const r=n.Ay.div`
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
`,o=n.Ay.input`
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
`,d=n.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,s=n.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=n.Ay.select`
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
`,x=e=>{let{children:t,className:i,style:n,...o}=e;return(0,a.jsx)(r,{className:i,style:n,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:r,...l}=e;return(0,a.jsxs)(d,{style:r,children:[(0,a.jsx)(o,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,a.jsx)(s,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},c=e=>{let{children:t,...i}=e;return(0,a.jsx)(l,{...i,children:t})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>E});var n=i(9950),a=i(4752),r=i(2853),o=i(3832),d=i(4728),s=i(2488),l=i(1367),x=i(4414);const p=a.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`,c=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,h=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=a.Ay.label`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,m=a.Ay.input`
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
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,y=a.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,f=a.Ay.div`
  flex: 1;
`,j=a.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,v=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=a.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,C=(0,a.Ay)(d.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,k=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,F=a.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,S=a.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,E=()=>{const{user:e}=(0,l.As)(),[t,i]=(0,n.useState)([]),[a,E]=(0,n.useState)(!0),[z,B]=(0,n.useState)(1),[_,D]=(0,n.useState)(1),[M,L]=(0,n.useState)(0),[T,U]=(0,n.useState)(""),[P,$]=(0,n.useState)(""),[N,W]=(0,n.useState)(""),[I,J]=(0,n.useState)(""),[R,O]=(0,n.useState)("");(0,n.useEffect)(()=>{Y()},[z,T,P,N,I,R]);const Y=async()=>{if(null!==e&&void 0!==e&&e.restaurantId){E(!0);try{const t=new URLSearchParams({page:z.toString(),limit:50..toString()});T&&t.append("entity_type",T),P&&t.append("action_type",P),N&&t.append("user_id",N),I&&t.append("start_date",I),R&&t.append("end_date",R);const n=await fetch(`/api/activity-logs/restaurant/${e.restaurantId}?${t}`);if(n.ok){const e=await n.json();i(e.logs||[]),D(e.totalPages||1),L(e.totalLogs||0)}else console.error("Failed to fetch activity logs"),i([])}catch(t){console.error("Error fetching activity logs:",t),i([])}finally{E(!1)}}},H=e=>{const t=new Date(e),i=new Date,n=Math.floor((i.getTime()-t.getTime())/1e3);return n<60?"just now":n<3600?`${Math.floor(n/60)} minutes ago`:n<86400?`${Math.floor(n/3600)} hours ago`:n<604800?`${Math.floor(n/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},Q=e=>{switch(e){case"menu_item":case"category":default:return"info";case"settings":return"warning";case"staff":case"order":return"success"}},q=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},G=e=>e.charAt(0).toUpperCase()+e.slice(1),K=T||P||N||I||R;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(o.Y9,{children:(0,x.jsx)(o.hE,{children:"Activity History"})}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(p,{children:[(0,x.jsxs)(c,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Entity Type"}),(0,x.jsxs)(s.Jt,{value:T,onChange:e=>{U(e.target.value),B(1)},children:[(0,x.jsx)("option",{value:"",children:"All Types"}),(0,x.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,x.jsx)("option",{value:"category",children:"Category"}),(0,x.jsx)("option",{value:"settings",children:"Settings"}),(0,x.jsx)("option",{value:"staff",children:"Staff"}),(0,x.jsx)("option",{value:"order",children:"Order"}),(0,x.jsx)("option",{value:"customer",children:"Customer"}),(0,x.jsx)("option",{value:"promotion",children:"Promotion"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Action Type"}),(0,x.jsxs)(s.Jt,{value:P,onChange:e=>{$(e.target.value),B(1)},children:[(0,x.jsx)("option",{value:"",children:"All Actions"}),(0,x.jsx)("option",{value:"create",children:"Create"}),(0,x.jsx)("option",{value:"update",children:"Update"}),(0,x.jsx)("option",{value:"delete",children:"Delete"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Start Date"}),(0,x.jsx)(m,{type:"date",value:I,onChange:e=>{J(e.target.value),B(1)}})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"End Date"}),(0,x.jsx)(m,{type:"date",value:R,onChange:e=>{O(e.target.value),B(1)}})]})]}),K&&(0,x.jsx)("div",{style:{textAlign:"right"},children:(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>{U(""),$(""),W(""),J(""),O(""),B(1)},children:"Reset Filters"})})]}),a?(0,x.jsx)(S,{children:"Loading activity logs..."}):0===t.length?(0,x.jsx)(g,{children:(0,x.jsx)(r.pp,{children:"No activity logs found"})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:t.map(e=>{return(0,x.jsx)(y,{children:(0,x.jsxs)(w,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(j,{children:H(e.created_at)}),(0,x.jsx)(v,{children:e.user_name}),(0,x.jsx)(b,{children:e.description})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{status:Q(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,x.jsx)(C,{status:q(e.action_type),children:G(e.action_type)})]})]})},e.id);var t})}),(0,x.jsxs)(k,{children:[(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>B(e=>Math.max(1,e-1)),disabled:1===z,children:"Previous"}),(0,x.jsxs)(F,{children:["Page ",z," of ",_," (",M," total logs)"]}),(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>B(e=>Math.min(_,e+1)),disabled:z===_,children:"Next"})]})]})]})]})})}}}]);