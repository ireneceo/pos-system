"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,n,i)=>{i.r(n),i.d(n,{default:()=>N});var t=i(9950),o=i(4752),r=i(3310),a=i(1367),l=i(9018),s=i(6038),d=i(8012),c=i(4414);const p=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,x=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${e=>e.primary?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F6F9FC;\n      border-color: #C7D2FE;\n    }\n  "}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`,u=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,g=o.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,m=o.Ay.div`
  text-align: center;
  padding: 48px 0;
  color: #6B7C93;
`,v=o.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,y=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,f=o.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
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
`,j=o.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;

  /* 정렬 규칙: 숫자/금액은 우측, 상태는 가운데, 액션은 우측 */
  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: right; } /* Min Order */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`,b=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #F3F4F6;\n          color: #6B7C93;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,C=o.Ay.div`
  display: flex;
  gap: 8px;
`,_=o.Ay.button`
  padding: 4px 8px;
  font-size: 12px;
  color: #6B7C93;
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
    border-color: #C7D2FE;
  }

  &.danger:hover {
    background: #FEF2F2;
    color: #DC2626;
    border-color: #FECACA;
  }
`,F=o.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,A=o.Ay.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,w=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,k=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,E=o.Ay.button`
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
  border-radius: 4px;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`,S=o.Ay.div`
  padding: 24px;
`,B=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,z=o.Ay.div`
  margin-bottom: 20px;
`,D=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,$=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,I=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,O=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,T=o.Ay.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`,M=o.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #6B7C93;
`,N=()=>{const{user:e}=(0,a.As)(),{operationSettings:n}=(0,l.Pj)(),i=null===e||void 0===e?void 0:e.restaurantId,o=(null===n||void 0===n?void 0:n.currency)||"MYR",[N,V]=(0,t.useState)([]),[P,L]=(0,t.useState)(!0),[Y,R]=(0,t.useState)(!1),[J,q]=(0,t.useState)(null),[W,G]=(0,t.useState)(!1),[H,K]=(0,t.useState)(null),[Q,X]=(0,t.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:""}),[Z,ee]=(0,t.useState)(null);(0,t.useEffect)(()=>{i&&ne()},[i]);const ne=async()=>{try{L(!0);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/coupons?restaurantId=${i}`,{headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?V(t.data):q(t.error||"Failed to load coupons")}catch(e){q("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{L(!1)}},ie=()=>{K(null),X({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:""}),ee(null),G(!0)},te=e=>"percentage"===e.type?`${e.value}%`:(0,s.vv)(e.value,o);return(0,c.jsx)(r.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(d.Ay,{title:"Coupons",children:(0,c.jsx)(x,{primary:!0,onClick:ie,children:"Create Coupon"})}),(0,c.jsx)(u,{children:(0,c.jsxs)(h,{children:[(0,c.jsx)(g,{children:"Coupon List"}),P?(0,c.jsx)(M,{children:"Loading coupons..."}):J?(0,c.jsxs)(m,{children:[(0,c.jsx)(v,{children:J}),(0,c.jsx)(x,{onClick:ne,children:"Retry"})]}):N.length>0?(0,c.jsxs)(y,{children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)(f,{children:"Code"}),(0,c.jsx)(f,{children:"Name"}),(0,c.jsx)(f,{children:"Discount"}),(0,c.jsx)(f,{children:"Min Order"}),(0,c.jsx)(f,{children:"Valid Until"}),(0,c.jsx)(f,{children:"Usage"}),(0,c.jsx)(f,{children:"Status"}),(0,c.jsx)(f,{children:"Actions"})]})}),(0,c.jsx)("tbody",{children:N.map(e=>{const n=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,c.jsxs)("tr",{children:[(0,c.jsx)(j,{style:{fontWeight:600},children:e.code}),(0,c.jsx)(j,{children:e.name||"-"}),(0,c.jsx)(j,{children:te(e)}),(0,c.jsx)(j,{children:e.min_order>0?(0,s.vv)(e.min_order,o):"-"}),(0,c.jsx)(j,{children:(i=e.valid_until,i?new Date(i).toLocaleDateString():"-")}),(0,c.jsxs)(j,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,c.jsx)(j,{children:(0,c.jsx)(b,{status:n,children:n})}),(0,c.jsx)(j,{children:(0,c.jsxs)(C,{children:[(0,c.jsx)(_,{onClick:()=>(e=>{var n,i,t;K(e),X({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(n=e.min_order)||void 0===n?void 0:n.toString())||"",max_discount:(null===(i=e.max_discount)||void 0===i?void 0:i.toString())||"",usage_limit:(null===(t=e.usage_limit)||void 0===t?void 0:t.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:""}),ee(null),G(!0)})(e),children:"Edit"}),(0,c.jsx)(_,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),i=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await i.json()).success&&ne()}catch(n){console.error("Error toggling coupon status:",n)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,c.jsx)(_,{className:"danger",onClick:()=>(async e=>{if(window.confirm(`Are you sure you want to delete coupon "${e.code}"?`))try{const n=localStorage.getItem("auth_token"),i=await fetch(`/api/coupons/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});(await i.json()).success&&ne()}catch(n){console.error("Error deleting coupon:",n)}})(e),children:"Delete"})]})})]},e.id);var i})})]}):(0,c.jsxs)(m,{children:[(0,c.jsx)(v,{children:"No coupons created yet"}),(0,c.jsx)(x,{primary:!0,onClick:ie,children:"Create Your First Coupon"})]})]})}),(0,c.jsx)(F,{isOpen:W,onClick:()=>G(!1),children:(0,c.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(k,{children:H?"Edit Coupon":"Create New Coupon"}),(0,c.jsx)(E,{onClick:()=>G(!1),children:"\xd7"})]}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Coupon Code *"}),(0,c.jsx)(U,{type:"text",value:Q.code,onChange:e=>X({...Q,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Name"}),(0,c.jsx)(U,{type:"text",value:Q.name,onChange:e=>X({...Q,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Discount Type"}),(0,c.jsxs)($,{value:Q.type,onChange:e=>X({...Q,type:e.target.value}),children:[(0,c.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,c.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Discount Value *"}),(0,c.jsx)(U,{type:"number",value:Q.value,onChange:e=>X({...Q,value:e.target.value}),placeholder:"percentage"===Q.type?"10":"5.00",step:"percentage"===Q.type?"1":"0.01",min:"0"})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Min Order Amount"}),(0,c.jsx)(U,{type:"number",value:Q.min_order,onChange:e=>X({...Q,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Max Discount (for %)"}),(0,c.jsx)(U,{type:"number",value:Q.max_discount,onChange:e=>X({...Q,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==Q.type})]})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Valid From"}),(0,c.jsx)(U,{type:"date",value:Q.valid_from,onChange:e=>X({...Q,valid_from:e.target.value})})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Valid Until"}),(0,c.jsx)(U,{type:"date",value:Q.valid_until,onChange:e=>X({...Q,valid_until:e.target.value})})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Usage Limit"}),(0,c.jsx)(U,{type:"number",value:Q.usage_limit,onChange:e=>X({...Q,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{children:"Description"}),(0,c.jsx)(I,{value:Q.description,onChange:e=>X({...Q,description:e.target.value}),placeholder:"Optional description..."})]}),Z&&(0,c.jsx)(T,{children:Z})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(x,{onClick:()=>G(!1),disabled:Y,children:"Cancel"}),(0,c.jsx)(x,{primary:!0,onClick:async()=>{if(Q.code.trim())if(!Q.value||parseFloat(Q.value)<=0)ee("Discount value must be greater than 0");else try{R(!0),ee(null);const e=localStorage.getItem("auth_token"),n={restaurant_id:i,code:Q.code.toUpperCase(),name:Q.name||null,description:Q.description||null,type:Q.type,value:parseFloat(Q.value),min_order:Q.min_order?parseFloat(Q.min_order):0,max_discount:Q.max_discount?parseFloat(Q.max_discount):null,usage_limit:Q.usage_limit?parseInt(Q.usage_limit):null,valid_from:Q.valid_from||null,valid_until:Q.valid_until||null,is_active:!0},t=H?`/api/coupons/${H.id}`:"/api/coupons",o=await fetch(t,{method:H?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(n)}),r=await o.json();r.success?(G(!1),ne()):ee(r.error||"Failed to save coupon")}catch(e){ee("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{R(!1)}else ee("Coupon code is required")},disabled:Y,children:Y?"Saving...":H?"Update Coupon":"Create Coupon"})]})]})})]})})}},8012:(e,n,i)=>{i.d(n,{Ay:()=>s});i(9950);var t=i(4752),o=i(4414);const r=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,a=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,l=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,s=e=>{let{title:n,children:i}=e;return(0,o.jsxs)(r,{children:[(0,o.jsx)(a,{children:n}),i&&(0,o.jsx)(l,{children:i})]})}}}]);