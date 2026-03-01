"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9440],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>l});var i=r(8819),o=(r(9950),r(4752)),a=r(4414);const n=o.Ay.div`
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
`,s=o.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,d=o.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,l=e=>{let{children:t,className:r,style:i,...o}=e;return(0,a.jsx)(n,{className:r,style:i,...o,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(s,{placeholder:t,...r})},x=e=>{let{children:t,...r}=e;return(0,a.jsx)(d,{...r,children:t})}},9440:(e,t,r)=>{r.r(t),r.d(t,{default:()=>_});var i=r(8819),o=r(9950),a=r(4752),n=r(3832),s=r(4728),d=r(2488),l=r(1367),c=r(4414);const x=a.Ay.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid ${i.w.colors.border};
`,p=a.Ay.div`
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
  color: ${i.w.colors.text.secondary};
`,m=a.Ay.input`
  padding: 10px 12px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${i.w.colors.border};
  overflow: hidden;
`,w=a.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${i.w.colors.border};
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${i.w.colors.surfaceHover};
  }
`,y=a.Ay.div`
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
  color: ${i.w.colors.text.light};
  margin-bottom: 4px;
`,v=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
  margin-bottom: 4px;
`,b=a.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.dark};
  line-height: 1.5;
`,A=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,$=(0,a.Ay)(s.Wh)`
  font-size: 11px;
  padding: 4px 10px;
`,S=a.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: ${i.w.colors.text.light};
  font-size: 14px;
`,k=a.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid ${i.w.colors.border};
`,C=a.Ay.div`
  font-size: 14px;
  color: ${i.w.colors.text.secondary};
  margin: 0 16px;
`,z=a.Ay.div`
  padding: 60px 24px;
  text-align: center;
  color: ${i.w.colors.text.light};
  font-size: 14px;
`,_=()=>{const{user:e}=(0,l.As)(),[t,r]=(0,o.useState)([]),[i,a]=(0,o.useState)(!0),[_,D]=(0,o.useState)(1),[L,M]=(0,o.useState)(1),[T,U]=(0,o.useState)(0),[E,P]=(0,o.useState)(""),[F,N]=(0,o.useState)(""),[H,I]=(0,o.useState)(""),[J,O]=(0,o.useState)(""),[R,Q]=(0,o.useState)("");(0,o.useEffect)(()=>{W()},[_,E,F,H,J,R]);const W=async()=>{if(null!==e&&void 0!==e&&e.restaurantId){a(!0);try{const t=new URLSearchParams({page:_.toString(),limit:50..toString()});E&&t.append("entity_type",E),F&&t.append("action_type",F),H&&t.append("user_id",H),J&&t.append("start_date",J),R&&t.append("end_date",R);const i=await fetch(`/api/activity-logs/restaurant/${e.restaurantId}?${t}`);if(i.ok){const e=await i.json();r(e.logs||[]),M(e.totalPages||1),U(e.totalLogs||0)}else console.error("Failed to fetch activity logs"),r([])}catch(t){console.error("Error fetching activity logs:",t),r([])}finally{a(!1)}}},Y=e=>{const t=new Date(e),r=new Date,i=Math.floor((r.getTime()-t.getTime())/1e3);return i<60?"just now":i<3600?`${Math.floor(i/60)} minutes ago`:i<86400?`${Math.floor(i/3600)} hours ago`:i<604800?`${Math.floor(i/86400)} days ago`:t.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})},q=e=>{switch(e){case"menu_item":case"category":default:return"info";case"settings":return"warning";case"staff":case"order":return"success"}},B=e=>{switch(e){case"create":return"success";case"update":default:return"info";case"delete":return"error"}},G=e=>e.charAt(0).toUpperCase()+e.slice(1),K=E||F||H||J||R;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(n.mc,{children:[(0,c.jsx)(n.Y9,{children:(0,c.jsx)(n.hE,{children:"Activity History"})}),(0,c.jsxs)(n.UC,{children:[(0,c.jsxs)(x,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Entity Type"}),(0,c.jsxs)(d.Jt,{value:E,onChange:e=>{P(e.target.value),D(1)},children:[(0,c.jsx)("option",{value:"",children:"All Types"}),(0,c.jsx)("option",{value:"menu_item",children:"Menu Item"}),(0,c.jsx)("option",{value:"category",children:"Category"}),(0,c.jsx)("option",{value:"settings",children:"Settings"}),(0,c.jsx)("option",{value:"staff",children:"Staff"}),(0,c.jsx)("option",{value:"order",children:"Order"}),(0,c.jsx)("option",{value:"customer",children:"Customer"}),(0,c.jsx)("option",{value:"promotion",children:"Promotion"})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Action Type"}),(0,c.jsxs)(d.Jt,{value:F,onChange:e=>{N(e.target.value),D(1)},children:[(0,c.jsx)("option",{value:"",children:"All Actions"}),(0,c.jsx)("option",{value:"create",children:"Create"}),(0,c.jsx)("option",{value:"update",children:"Update"}),(0,c.jsx)("option",{value:"delete",children:"Delete"})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Start Date"}),(0,c.jsx)(m,{type:"date",value:J,onChange:e=>{O(e.target.value),D(1)}})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"End Date"}),(0,c.jsx)(m,{type:"date",value:R,onChange:e=>{Q(e.target.value),D(1)}})]})]}),K&&(0,c.jsx)("div",{style:{textAlign:"right"},children:(0,c.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>{P(""),N(""),I(""),O(""),Q(""),D(1)},children:"Reset Filters"})})]}),i?(0,c.jsx)(z,{children:"Loading activity logs..."}):0===t.length?(0,c.jsx)(g,{children:(0,c.jsx)(S,{children:"No activity logs found"})}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(g,{children:t.map(e=>{return(0,c.jsx)(w,{children:(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{children:[(0,c.jsx)(j,{children:Y(e.created_at)}),(0,c.jsx)(v,{children:e.user_name}),(0,c.jsx)(b,{children:e.description})]}),(0,c.jsxs)(A,{children:[(0,c.jsx)($,{status:q(e.entity_type),children:(t=e.entity_type,t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "))}),(0,c.jsx)($,{status:B(e.action_type),children:G(e.action_type)})]})]})},e.id);var t})}),(0,c.jsxs)(k,{children:[(0,c.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>D(e=>Math.max(1,e-1)),disabled:1===_,children:"Previous"}),(0,c.jsxs)(C,{children:["Page ",_," of ",L," (",T," total logs)"]}),(0,c.jsx)(s.SC,{variant:"secondary",size:"small",onClick:()=>D(e=>Math.min(L,e+1)),disabled:_===L,children:"Next"})]})]})]})]})})}}}]);