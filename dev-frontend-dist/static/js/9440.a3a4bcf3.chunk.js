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
`,s=e=>{let{children:t,className:i,style:a,...o}=e;return(0,n.jsx)(r,{className:i,style:a,...o,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(o,{placeholder:t,...i})},p=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},9440:(e,t,i)=>{i.r(t),i.d(t,{default:()=>z});var a=i(9950),n=i(4752),r=i(3310),o=i(3832),d=i(4728),s=i(2488),l=i(1367),p=i(4414);const x=n.Ay.div`
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
`,j=n.Ay.div`
  flex: 1;
`,w=n.Ay.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`,v=n.Ay.div`
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
`,F=n.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,S=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`,k=n.Ay.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`,E=n.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`,z=()=>{const{user:e}=(0,l.As)(),[t,i]=(0,a.useState)([]),[n,z]=(0,a.useState)(!0),[_,B]=(0,a.useState)(1),[D,M]=(0,a.useState)(1),[T,U]=(0,a.useState)(0),[P,$]=(0,a.useState)(""),[L,N]=(0,a.useState)(""),[I,J]=(0,a.useState)(""),[O,R]=(0,a.useState)(""),[H,Q]=(0,a.useState)("");(0,a.useEffect)(()=>{W()},[_,P,L,I,O,H]);const W=async()=>{if(null!==e&&void 0!==e&&e.restaurantId){z(!0);try{const t=new URLSearchParams({page:_.toString(),limit:50..toString()});P&&t.append("entity_type",P),L&&t.append("action_type",L),I&&t.append("user_id",I),O&&t.append("start_date",O),H&&t.append("end_date",H);const a=await fetch(`/api/activity-logs/restaurant/${e.restaurantId}?${t}`);if(a.ok){const e=await a.json();i(e.logs||[]),M(e.totalPages||1),U(e.totalLogs||0)}else console.error("Failed to fetch activity logs"),i([])}catch(t){console.error("Error fetching activity logs:",t),i([])}finally{z(!1)}}},Y=e=>{const t=new Date(e),i=new Date,a=Math.floor((i.getTime()-t.getTime())/1e3);return a<60?"just now":a<3600?`${Math.floor(a/60)} minutes ago`:a<86400?`${Math.floor(a/3600)} hours ago`:a<604800?`${Math.floor(a/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},q=e=>{switch(e){case"menu_item":case"category":default:return"info";case"settings":return"warning";case"staff":case"order":return"success"}},G=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},K=e=>e.charAt(0).toUpperCase()+e.slice(1),V=P||L||I||O||H;return(0,p.jsx)(r.A,{children:(0,p.jsxs)(o.mc,{children:[(0,p.jsx)(o.Y9,{children:(0,p.jsx)(o.hE,{children:"Activity History"})}),(0,p.jsxs)(o.UC,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(c,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:"Entity Type"}),(0,p.jsxs)(s.Jt,{value:P,onChange:e=>{$(e.target.value),B(1)},children:[(0,p.jsx)("option",{value:"",children:"All Types"}),(0,p.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,p.jsx)("option",{value:"category",children:"Category"}),(0,p.jsx)("option",{value:"settings",children:"Settings"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"order",children:"Order"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"promotion",children:"Promotion"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:"Action Type"}),(0,p.jsxs)(s.Jt,{value:L,onChange:e=>{N(e.target.value),B(1)},children:[(0,p.jsx)("option",{value:"",children:"All Actions"}),(0,p.jsx)("option",{value:"create",children:"Create"}),(0,p.jsx)("option",{value:"update",children:"Update"}),(0,p.jsx)("option",{value:"delete",children:"Delete"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:"Start Date"}),(0,p.jsx)(m,{type:"date",value:O,onChange:e=>{R(e.target.value),B(1)}})]}),(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:"End Date"}),(0,p.jsx)(m,{type:"date",value:H,onChange:e=>{Q(e.target.value),B(1)}})]})]}),V&&(0,p.jsx)("div",{style:{textAlign:"right"},children:(0,p.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>{$(""),N(""),J(""),R(""),Q(""),B(1)},children:"Reset Filters"})})]}),n?(0,p.jsx)(E,{children:"Loading activity logs..."}):0===t.length?(0,p.jsx)(g,{children:(0,p.jsx)(F,{children:"No activity logs found"})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(g,{children:t.map(e=>{return(0,p.jsx)(y,{children:(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{children:[(0,p.jsx)(w,{children:Y(e.created_at)}),(0,p.jsx)(v,{children:e.user_name}),(0,p.jsx)(b,{children:e.description})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{status:q(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,p.jsx)(C,{status:G(e.action_type),children:K(e.action_type)})]})]})},e.id);var t})}),(0,p.jsxs)(S,{children:[(0,p.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>B(e=>Math.max(1,e-1)),disabled:1===_,children:"Previous"}),(0,p.jsxs)(k,{children:["Page ",_," of ",D," (",T," total logs)"]}),(0,p.jsx)(d.SC,{variant:"secondary",size:"small",onClick:()=>B(e=>Math.min(D,e+1)),disabled:_===D,children:"Next"})]})]})]})]})})}}}]);