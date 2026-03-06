"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>c,Qn:()=>x});i(9950);var a=i(4752),n=i(4414);const r=a.Ay.div`
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
`,o=a.Ay.input`
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
`,d=a.Ay.div`
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
`,s=a.Ay.button`
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
`,l=a.Ay.select`
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
`,x=e=>{let{children:t,className:i,style:a,...o}=e;return(0,n.jsx)(r,{className:i,style:a,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:a,style:r,...l}=e;return(0,n.jsxs)(d,{style:r,children:[(0,n.jsx)(o,{placeholder:t,value:i,onChange:a,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,n.jsx)(s,{type:"button",onClick:()=>null===a||void 0===a?void 0:a({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(l,{...i,children:t})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>E});var a=i(9950),n=i(4752),r=i(2853),o=i(3832),d=i(4728),s=i(2488),l=i(1367),x=i(4414);const p=n.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`,c=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=n.Ay.label`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,m=n.Ay.input`
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
`,g=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,y=n.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,v=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,j=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,A=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,C=(0,n.Ay)(d.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,k=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,F=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,S=n.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,E=()=>{const{user:e}=(0,l.As)(),[t,i]=(0,a.useState)([]),[n,E]=(0,a.useState)(!0),[_,z]=(0,a.useState)(1),[B,D]=(0,a.useState)(1),[M,T]=(0,a.useState)(0),[I,L]=(0,a.useState)(""),[P,U]=(0,a.useState)(""),[$,N]=(0,a.useState)(""),[W,J]=(0,a.useState)(""),[R,O]=(0,a.useState)("");(0,a.useEffect)(()=>{Y()},[_,I,P,$,W,R]);const Y=async()=>{if(null!==e&&void 0!==e&&e.restaurantId){E(!0);try{const n=new URLSearchParams({page:_.toString(),limit:50..toString()});I&&n.append("entity_type",I),P&&n.append("action_type",P),$&&n.append("user_id",$),W&&n.append("start_date",W),R&&n.append("end_date",R);const r=localStorage.getItem("auth_token"),o=await fetch(`/api/activity-logs/restaurant/${e.restaurantId}?${n}`,{headers:{...r?{Authorization:`Bearer ${r}`}:{}}});if(o.ok){var t,a;const e=await o.json(),n=e.data||e;i(n.logs||[]),D((null===(t=n.pagination)||void 0===t?void 0:t.totalPages)||n.totalPages||1),T((null===(a=n.pagination)||void 0===a?void 0:a.total)||n.totalLogs||0)}else console.error("Failed to fetch activity logs"),i([])}catch(n){console.error("Error fetching activity logs:",n),i([])}finally{E(!1)}}},H=e=>{const t=new Date(e),i=new Date,a=Math.floor((i.getTime()-t.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)} minutes ago`:a<86400?`${Math.floor(a/3600)} hours ago`:a<604800?`${Math.floor(a/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},Q=e=>{switch(e){case"menu_item":case"category":case"table":default:return"info";case"settings":case"invoice":return"warning";case"staff":case"promotion":return"success";case"order_item":return"error"}},q=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},G=e=>e.charAt(0).toUpperCase()+e.slice(1),K=I||P||$||W||R;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(o.Y9,{children:(0,x.jsx)(o.hE,{children:"Activity History"})}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(p,{children:[(0,x.jsxs)(c,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Entity Type"}),(0,x.jsxs)(s.Jt,{value:I,onChange:e=>{L(e.target.value),z(1)},children:[(0,x.jsx)("option",{value:"",children:"All Types"}),(0,x.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,x.jsx)("option",{value:"category",children:"Category"}),(0,x.jsx)("option",{value:"settings",children:"Settings"}),(0,x.jsx)("option",{value:"staff",children:"Staff"}),(0,x.jsx)("option",{value:"invoice",children:"Invoice"}),(0,x.jsx)("option",{value:"table",children:"Table"}),(0,x.jsx)("option",{value:"promotion",children:"Promotion"}),(0,x.jsx)("option",{value:"order_item",children:"Order Item"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Action Type"}),(0,x.jsxs)(s.Jt,{value:P,onChange:e=>{U(e.target.value),z(1)},children:[(0,x.jsx)("option",{value:"",children:"All Actions"}),(0,x.jsx)("option",{value:"create",children:"Create"}),(0,x.jsx)("option",{value:"update",children:"Update"}),(0,x.jsx)("option",{value:"delete",children:"Delete"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Start Date"}),(0,x.jsx)(m,{type:"date",value:W,onChange:e=>{J(e.target.value),z(1)}})]}),(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"End Date"}),(0,x.jsx)(m,{type:"date",value:R,onChange:e=>{O(e.target.value),z(1)}})]})]}),K&&(0,x.jsx)("div",{style:{textAlign:"right"},children:(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>{L(""),U(""),N(""),J(""),O(""),z(1)},children:"Reset Filters"})})]}),n?(0,x.jsx)(S,{children:"Loading activity logs..."}):0===t.length?(0,x.jsx)(g,{children:(0,x.jsx)(r.pp,{children:"No activity logs found"})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:t.map(e=>{return(0,x.jsx)(y,{children:(0,x.jsxs)(f,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(w,{children:H(e.created_at)}),(0,x.jsx)(j,{children:e.full_name||e.username}),(0,x.jsx)(b,{children:e.description})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{status:Q(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,x.jsx)(C,{status:q(e.action_type),children:G(e.action_type)})]})]})},e.id);var t})}),(0,x.jsxs)(k,{children:[(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>z(e=>Math.max(1,e-1)),disabled:1===_,children:"Previous"}),(0,x.jsxs)(F,{children:["Page ",_," of ",B," (",M," total logs)"]}),(0,x.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>z(e=>Math.min(B,e+1)),disabled:_===B,children:"Next"})]})]})]})]})})}}}]);