"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{2488:(e,t,i)=>{i.d(t,{DO:()=>l,Jt:()=>p,Qn:()=>s});i(9950);var a=i(4752),n=i(4414);const r=a.Ay.div`
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
`,d=a.Ay.select`
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
`,s=e=>{let{children:t,className:i,style:a,...o}=e;return(0,n.jsx)(r,{className:i,style:a,...o,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(o,{placeholder:t,...i})},p=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>E});var a=i(9950),n=i(4752),r=i(3832),o=i(4728),d=i(2488),s=i(1367),l=i(4414);const p=n.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`,x=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,c=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=n.Ay.label`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`,u=n.Ay.input`
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
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,g=n.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,y=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`,f=n.Ay.div`
  flex: 1;
`,j=n.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,w=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=n.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`,b=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,A=(0,n.Ay)(o.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,F=n.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,C=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,S=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,k=n.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,E=()=>{const{user:e}=(0,s.As)(),[t,i]=(0,a.useState)([]),[n,E]=(0,a.useState)(!0),[z,_]=(0,a.useState)(1),[B,D]=(0,a.useState)(1),[M,T]=(0,a.useState)(0),[U,P]=(0,a.useState)(""),[$,L]=(0,a.useState)(""),[N,I]=(0,a.useState)(""),[J,O]=(0,a.useState)(""),[R,H]=(0,a.useState)("");(0,a.useEffect)(()=>{Q()},[z,U,$,N,J,R]);const Q=async()=>{if(null!==e&&void 0!==e&&e.restaurantId){E(!0);try{const t=new URLSearchParams({page:z.toString(),limit:50..toString()});U&&t.append("entity_type",U),$&&t.append("action_type",$),N&&t.append("user_id",N),J&&t.append("start_date",J),R&&t.append("end_date",R);const a=await fetch(`/api/activity-logs/restaurant/${e.restaurantId}?${t}`);if(a.ok){const e=await a.json();i(e.logs||[]),D(e.totalPages||1),T(e.totalLogs||0)}else console.error("Failed to fetch activity logs"),i([])}catch(t){console.error("Error fetching activity logs:",t),i([])}finally{E(!1)}}},W=e=>{const t=new Date(e),i=new Date,a=Math.floor((i.getTime()-t.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)} minutes ago`:a<86400?`${Math.floor(a/3600)} hours ago`:a<604800?`${Math.floor(a/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},Y=e=>{switch(e){case"menu_item":case"category":default:return"info";case"settings":return"warning";case"staff":case"order":return"success"}},q=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},G=e=>e.charAt(0).toUpperCase()+e.slice(1),K=U||$||N||J||R;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(r.mc,{children:[(0,l.jsx)(r.Y9,{children:(0,l.jsx)(r.hE,{children:"Activity History"})}),(0,l.jsxs)(r.UC,{children:[(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:"Entity Type"}),(0,l.jsxs)(d.Jt,{value:U,onChange:e=>{P(e.target.value),_(1)},children:[(0,l.jsx)("option",{value:"",children:"All Types"}),(0,l.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,l.jsx)("option",{value:"category",children:"Category"}),(0,l.jsx)("option",{value:"settings",children:"Settings"}),(0,l.jsx)("option",{value:"staff",children:"Staff"}),(0,l.jsx)("option",{value:"order",children:"Order"}),(0,l.jsx)("option",{value:"customer",children:"Customer"}),(0,l.jsx)("option",{value:"promotion",children:"Promotion"})]})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:"Action Type"}),(0,l.jsxs)(d.Jt,{value:$,onChange:e=>{L(e.target.value),_(1)},children:[(0,l.jsx)("option",{value:"",children:"All Actions"}),(0,l.jsx)("option",{value:"create",children:"Create"}),(0,l.jsx)("option",{value:"update",children:"Update"}),(0,l.jsx)("option",{value:"delete",children:"Delete"})]})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:"Start Date"}),(0,l.jsx)(u,{type:"date",value:J,onChange:e=>{O(e.target.value),_(1)}})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:"End Date"}),(0,l.jsx)(u,{type:"date",value:R,onChange:e=>{H(e.target.value),_(1)}})]})]}),K&&(0,l.jsx)("div",{style:{textAlign:"right"},children:(0,l.jsx)(o.SC,{variant:"secondary",size:"small",onClick:()=>{P(""),L(""),I(""),O(""),H(""),_(1)},children:"Reset Filters"})})]}),n?(0,l.jsx)(k,{children:"Loading activity logs..."}):0===t.length?(0,l.jsx)(m,{children:(0,l.jsx)(F,{children:"No activity logs found"})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(m,{children:t.map(e=>{return(0,l.jsx)(g,{children:(0,l.jsxs)(y,{children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(j,{children:W(e.created_at)}),(0,l.jsx)(w,{children:e.user_name}),(0,l.jsx)(v,{children:e.description})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{status:Y(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,l.jsx)(A,{status:q(e.action_type),children:G(e.action_type)})]})]})},e.id);var t})}),(0,l.jsxs)(C,{children:[(0,l.jsx)(o.SC,{variant:"secondary",size:"small",onClick:()=>_(e=>Math.max(1,e-1)),disabled:1===z,children:"Previous"}),(0,l.jsxs)(S,{children:["Page ",z," of ",B," (",M," total logs)"]}),(0,l.jsx)(o.SC,{variant:"secondary",size:"small",onClick:()=>_(e=>Math.min(B,e+1)),disabled:z===B,children:"Next"})]})]})]})]})})}}}]);