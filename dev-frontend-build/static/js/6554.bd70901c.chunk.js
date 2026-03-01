"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,o,n)=>{n.r(o),n.d(o,{default:()=>D});var r=n(8819),t=n(9950),i=n(4752),a=n(1367),l=n(9018),s=n(6038),d=n(8012),c=n(2674),p=n(4414);const u=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: ${r.w.colors.background};
  min-height: 100vh;
`,x=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.primary?`\n    background: ${r.w.colors.primary};\n    color: white;\n\n    &:hover {\n      background: ${r.w.colors.primaryHover};\n      transform: translateY(-1px);\n    }\n  `:`\n    background: white;\n    color: ${r.w.colors.text.secondary};\n    border: 1px solid ${r.w.colors.border};\n\n    &:hover {\n      background: ${r.w.colors.backgroundAlt};\n      border-color: #C7D2FE;\n    }\n  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,h=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${r.w.colors.border};
  margin-bottom: 24px;
`,m=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
  margin-bottom: 16px;
`,v=i.Ay.div`
  text-align: center;
  padding: 48px 0;
  color: ${r.w.colors.text.secondary};
`,y=i.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,j=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,b=i.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid ${r.w.colors.backgroundAlt};
  font-size: 11px;
  color: ${r.w.colors.text.secondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  /* 정렬 규칙: 숫자/금액은 우측, 상태는 가운데, 액션은 우측 */
  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: right; } /* Min Order */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`,w=i.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid ${r.w.colors.backgroundAlt};
  font-size: 13px;
  color: ${r.w.colors.secondary};

  /* 정렬 규칙: 숫자/금액은 우측, 상태는 가운데, 액션은 우측 */
  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: right; } /* Min Order */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`,f=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return`\n          background: ${r.w.colors.status.successLight};\n          color: ${r.w.colors.status.successAlt};\n        `;case"inactive":return`\n          background: ${r.w.colors.surfaceMuted};\n          color: ${r.w.colors.text.secondary};\n        `;case"expired":return`\n          background: ${r.w.colors.dangerLight};\n          color: ${r.w.colors.danger};\n        `}}}
`,_=i.Ay.div`
  display: flex;
  gap: 8px;
`,$=i.Ay.button`
  padding: 4px 8px;
  font-size: 12px;
  color: ${r.w.colors.text.secondary};
  background: none;
  border: 1px solid ${r.w.colors.border};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${r.w.colors.backgroundAlt};
    color: ${r.w.colors.secondary};
    border-color: #C7D2FE;
  }

  &.danger:hover {
    background: ${r.w.colors.dangerLight};
    color: ${r.w.colors.danger};
    border-color: #FECACA;
  }
`,C=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${r.w.colors.text.dark};
  margin-bottom: 8px;
`,A=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,k=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,S=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }
`,E=i.Ay.p`
  color: ${r.w.colors.danger};
  font-size: 13px;
  margin-top: 8px;
`,z=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: ${r.w.colors.text.secondary};
`,D=()=>{const{user:e}=(0,a.As)(),{operationSettings:o}=(0,l.Pj)(),n=null===e||void 0===e?void 0:e.restaurantId,r=(null===o||void 0===o?void 0:o.currency)||"MYR",[i,D]=(0,t.useState)([]),[F,U]=(0,t.useState)(!0),[L,O]=(0,t.useState)(!1),[I,M]=(0,t.useState)(null),[T,N]=(0,t.useState)(!1),[V,P]=(0,t.useState)(null),[B,R]=(0,t.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:""}),[J,Y]=(0,t.useState)(null);(0,t.useEffect)(()=>{n&&H()},[n]);const H=async()=>{try{U(!0);const e=localStorage.getItem("auth_token"),o=await fetch(`/api/coupons?restaurantId=${n}`,{headers:{Authorization:`Bearer ${e}`}}),r=await o.json();r.success?D(r.data):M(r.error||"Failed to load coupons")}catch(e){M("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{U(!1)}},q=()=>{P(null),R({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:""}),Y(null),N(!0)},Q=e=>"percentage"===e.type?`${e.value}%`:(0,s.vv)(e.value,r);return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u,{children:[(0,p.jsx)(d.Ay,{title:"Coupons",children:(0,p.jsx)(x,{primary:!0,onClick:q,children:"Create Coupon"})}),(0,p.jsx)(h,{children:(0,p.jsxs)(g,{children:[(0,p.jsx)(m,{children:"Coupon List"}),F?(0,p.jsx)(z,{children:"Loading coupons..."}):I?(0,p.jsxs)(v,{children:[(0,p.jsx)(y,{children:I}),(0,p.jsx)(x,{onClick:H,children:"Retry"})]}):i.length>0?(0,p.jsxs)(j,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(b,{children:"Code"}),(0,p.jsx)(b,{children:"Name"}),(0,p.jsx)(b,{children:"Discount"}),(0,p.jsx)(b,{children:"Min Order"}),(0,p.jsx)(b,{children:"Valid Until"}),(0,p.jsx)(b,{children:"Usage"}),(0,p.jsx)(b,{children:"Status"}),(0,p.jsx)(b,{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:i.map(e=>{const o=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,p.jsxs)("tr",{children:[(0,p.jsx)(w,{style:{fontWeight:600},children:e.code}),(0,p.jsx)(w,{children:e.name||"-"}),(0,p.jsx)(w,{children:Q(e)}),(0,p.jsx)(w,{children:e.min_order>0?(0,s.vv)(e.min_order,r):"-"}),(0,p.jsx)(w,{children:(n=e.valid_until,n?new Date(n).toLocaleDateString():"-")}),(0,p.jsxs)(w,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,p.jsx)(w,{children:(0,p.jsx)(f,{status:o,children:o})}),(0,p.jsx)(w,{children:(0,p.jsxs)(_,{children:[(0,p.jsx)($,{onClick:()=>(e=>{var o,n,r;P(e),R({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(o=e.min_order)||void 0===o?void 0:o.toString())||"",max_discount:(null===(n=e.max_discount)||void 0===n?void 0:n.toString())||"",usage_limit:(null===(r=e.usage_limit)||void 0===r?void 0:r.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:""}),Y(null),N(!0)})(e),children:"Edit"}),(0,p.jsx)($,{onClick:()=>(async e=>{try{const o=localStorage.getItem("auth_token"),n=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await n.json()).success&&H()}catch(o){console.error("Error toggling coupon status:",o)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,p.jsx)($,{className:"danger",onClick:()=>(async e=>{if(window.confirm(`Are you sure you want to delete coupon "${e.code}"?`))try{const o=localStorage.getItem("auth_token"),n=await fetch(`/api/coupons/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${o}`}});(await n.json()).success&&H()}catch(o){console.error("Error deleting coupon:",o)}})(e),children:"Delete"})]})})]},e.id);var n})})]}):(0,p.jsxs)(v,{children:[(0,p.jsx)(y,{children:"No coupons created yet"}),(0,p.jsx)(x,{primary:!0,onClick:q,children:"Create Your First Coupon"})]})]})}),(0,p.jsx)(c.mH,{isOpen:T,onClick:()=>N(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:V?"Edit Coupon":"Create New Coupon"}),(0,p.jsx)(c.Jn,{onClick:()=>N(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Coupon Code *"}),(0,p.jsx)(A,{type:"text",value:B.code,onChange:e=>R({...B,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Name"}),(0,p.jsx)(A,{type:"text",value:B.name,onChange:e=>R({...B,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Discount Type"}),(0,p.jsxs)(k,{value:B.type,onChange:e=>R({...B,type:e.target.value}),children:[(0,p.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,p.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Discount Value *"}),(0,p.jsx)(A,{type:"number",value:B.value,onChange:e=>R({...B,value:e.target.value}),placeholder:"percentage"===B.type?"10":"5.00",step:"percentage"===B.type?"1":"0.01",min:"0"})]})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Min Order Amount"}),(0,p.jsx)(A,{type:"number",value:B.min_order,onChange:e=>R({...B,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Max Discount (for %)"}),(0,p.jsx)(A,{type:"number",value:B.max_discount,onChange:e=>R({...B,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==B.type})]})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Valid From"}),(0,p.jsx)(A,{type:"date",value:B.valid_from,onChange:e=>R({...B,valid_from:e.target.value})})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Valid Until"}),(0,p.jsx)(A,{type:"date",value:B.valid_until,onChange:e=>R({...B,valid_until:e.target.value})})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Usage Limit"}),(0,p.jsx)(A,{type:"number",value:B.usage_limit,onChange:e=>R({...B,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(C,{children:"Description"}),(0,p.jsx)(S,{value:B.description,onChange:e=>R({...B,description:e.target.value}),placeholder:"Optional description..."})]}),J&&(0,p.jsx)(E,{children:J})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(x,{onClick:()=>N(!1),disabled:L,children:"Cancel"}),(0,p.jsx)(x,{primary:!0,onClick:async()=>{if(B.code.trim())if(!B.value||parseFloat(B.value)<=0)Y("Discount value must be greater than 0");else try{O(!0),Y(null);const e=localStorage.getItem("auth_token"),o={restaurant_id:n,code:B.code.toUpperCase(),name:B.name||null,description:B.description||null,type:B.type,value:parseFloat(B.value),min_order:B.min_order?parseFloat(B.min_order):0,max_discount:B.max_discount?parseFloat(B.max_discount):null,usage_limit:B.usage_limit?parseInt(B.usage_limit):null,valid_from:B.valid_from||null,valid_until:B.valid_until||null,is_active:!0},r=V?`/api/coupons/${V.id}`:"/api/coupons",t=await fetch(r,{method:V?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(o)}),i=await t.json();i.success?(N(!1),H()):Y(i.error||"Failed to save coupon")}catch(e){Y("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{O(!1)}else Y("Coupon code is required")},disabled:L,children:L?"Saving...":V?"Update Coupon":"Create Coupon"})]})]})})]})})}},8012:(e,o,n)=>{n.d(o,{Ay:()=>d});var r=n(8819),t=(n(9950),n(4752)),i=n(4414);const a=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${r.w.colors.border};
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,l=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,s=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:o,children:n}=e;return(0,i.jsxs)(a,{children:[(0,i.jsx)(l,{children:o}),n&&(0,i.jsx)(s,{children:n})]})}}}]);