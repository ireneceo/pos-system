"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Q});var r=i(9950),n=i(4752),o=i(2853),a=i(1367),s=i(9018),l=i(6038),d=i(8012),c=i(7617),p=i(4414);const x=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,u=n.Ay.button`
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
`,h=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,m=n.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,y=n.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,v=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,f=n.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: center; } /* Target */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`,_=n.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;

  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: center; } /* Target */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`,b=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #F3F4F6;\n          color: #6B7C93;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,j=n.Ay.div`
  display: flex;
  gap: 8px;
`,F=n.Ay.button`
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
`,C=n.Ay.div`
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
`,A=n.Ay.div`
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
`,w=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,k=n.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,E=n.Ay.button`
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
`,B=n.Ay.div`
  padding: 24px;
`,z=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,S=n.Ay.div`
  margin-bottom: 20px;
`,D=n.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,$=n.Ay.input`
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
`,T=n.Ay.select`
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
`,U=n.Ay.textarea`
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
`,I=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,O=n.Ay.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`,L=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #6B7C93;
`,N=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,P=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #635BFF;
  }
`,V=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,M=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid ${e=>e.checked?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 13px;
  color: ${e=>e.checked?"#635BFF":"#374151"};
  background: ${e=>e.checked?"#F4F3FF":"white"};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`,Y=n.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,R=n.Ay.div`
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,J=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F6F9FC;
  background: ${e=>e.selected?"#F4F3FF":"white"};
  transition: background 0.1s;

  &:hover {
    background: ${e=>e.selected?"#F4F3FF":"#F6F9FC"};
  }

  &:last-child {
    border-bottom: none;
  }
`,q=n.Ay.div`
  flex: 1;
  min-width: 0;
`,G=n.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,H=n.Ay.div`
  font-size: 11px;
  color: #6B7C93;
`,W=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,K=n.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F4F3FF;
  color: #635BFF;
`,Q=()=>{const{user:e}=(0,a.As)(),{operationSettings:t}=(0,s.Pj)(),i=null===e||void 0===e?void 0:e.restaurantId,n=(null===t||void 0===t?void 0:t.currency)||"MYR",[Q,X]=(0,r.useState)([]),[Z,ee]=(0,r.useState)(!0),[te,ie]=(0,r.useState)(!1),[re,ne]=(0,r.useState)(null),[oe,ae]=(0,r.useState)(!1),[se,le]=(0,r.useState)(null),[de,ce]=(0,r.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),[pe,xe]=(0,r.useState)(null),[ue,he]=(0,r.useState)(!1),[ge,me]=(0,r.useState)(null),[ye,ve]=(0,r.useState)([]),[fe,_e]=(0,r.useState)(""),[be,je]=(0,r.useState)(!1);(0,r.useEffect)(()=>{i&&Fe()},[i]);const Fe=async()=>{try{ee(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons?restaurantId=${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?X(r.data):ne(r.error||"Failed to load coupons")}catch(e){ne("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{ee(!1)}},Ce=async()=>{if(i)try{je(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/customers/${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();if(r.success){const e=r.data||[];ve(e.map(e=>{var t,i,r;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id||e.id,name:(null===(i=e.customer)||void 0===i?void 0:i.name)||e.name||"",phone:(null===(r=e.customer)||void 0===r?void 0:r.phone)||e.phone||"",loyalty_tier:e.loyalty_tier||"Bronze"}}))}}catch(e){console.error("Error fetching customers:",e)}finally{je(!1)}},Ae=()=>{le(null),ce({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),_e(""),xe(null),Ce(),ae(!0)},we=e=>"percentage"===e.type?`${e.value}%`:(0,l.vv)(e.value,n);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(d.Ay,{title:"Coupons",children:(0,p.jsx)(u,{primary:!0,onClick:Ae,children:"Create Coupon"})}),(0,p.jsx)(h,{children:(0,p.jsxs)(g,{children:[(0,p.jsx)(m,{children:"Coupon List"}),Z?(0,p.jsx)(L,{children:"Loading coupons..."}):re?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)(y,{children:re}),(0,p.jsx)(u,{onClick:Fe,children:"Retry"})]}):Q.length>0?(0,p.jsxs)(v,{children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(f,{children:"Code"}),(0,p.jsx)(f,{children:"Name"}),(0,p.jsx)(f,{children:"Discount"}),(0,p.jsx)(f,{children:"Target"}),(0,p.jsx)(f,{children:"Valid Until"}),(0,p.jsx)(f,{children:"Usage"}),(0,p.jsx)(f,{children:"Status"}),(0,p.jsx)(f,{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:Q.map(e=>{var t,i;const r=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,p.jsxs)("tr",{children:[(0,p.jsx)(_,{style:{fontWeight:600},children:e.code}),(0,p.jsx)(_,{children:e.name||"-"}),(0,p.jsx)(_,{children:we(e)}),(0,p.jsx)(_,{children:"all"===e.target_type?(0,p.jsx)(K,{children:"All"}):"customers"===e.target_type?(0,p.jsxs)(K,{children:[(null===(t=e.target_customer_ids)||void 0===t?void 0:t.length)||0," Customers"]}):"tiers"===e.target_type?(0,p.jsx)(K,{children:(null===(i=e.target_loyalty_tiers)||void 0===i?void 0:i.join(", "))||"-"}):(0,p.jsx)(K,{children:"All"})}),(0,p.jsx)(_,{children:(n=e.valid_until,n?new Date(n).toLocaleDateString():"-")}),(0,p.jsxs)(_,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,p.jsx)(_,{children:(0,p.jsx)(b,{status:r,children:r})}),(0,p.jsx)(_,{children:(0,p.jsxs)(j,{children:[(0,p.jsx)(F,{onClick:()=>(e=>{var t,i,r;le(e),ce({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(t=e.min_order)||void 0===t?void 0:t.toString())||"",max_discount:(null===(i=e.max_discount)||void 0===i?void 0:i.toString())||"",usage_limit:(null===(r=e.usage_limit)||void 0===r?void 0:r.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:"",target_type:e.target_type||"all",target_customer_ids:e.target_customer_ids||[],target_loyalty_tiers:e.target_loyalty_tiers||[]}),_e(""),xe(null),Ce(),ae(!0)})(e),children:"Edit"}),(0,p.jsx)(F,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),i=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await i.json()).success&&Fe()}catch(t){console.error("Error toggling coupon status:",t)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,p.jsx)(F,{className:"danger",onClick:()=>(e=>{me(e),he(!0)})(e),children:"Delete"})]})})]},e.id);var n})})]}):(0,p.jsxs)(o.pp,{children:[(0,p.jsx)(y,{children:"No coupons created yet"}),(0,p.jsx)(u,{primary:!0,onClick:Ae,children:"Create Your First Coupon"})]})]})}),(0,p.jsx)(C,{isOpen:oe,onClick:()=>ae(!1),children:(0,p.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{children:se?"Edit Coupon":"Create New Coupon"}),(0,p.jsx)(E,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Coupon Code *"}),(0,p.jsx)($,{type:"text",value:de.code,onChange:e=>ce({...de,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Name"}),(0,p.jsx)($,{type:"text",value:de.name,onChange:e=>ce({...de,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Discount Type"}),(0,p.jsxs)(T,{value:de.type,onChange:e=>ce({...de,type:e.target.value}),children:[(0,p.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,p.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Discount Value *"}),(0,p.jsx)($,{type:"number",value:de.value,onChange:e=>ce({...de,value:e.target.value}),placeholder:"percentage"===de.type?"10":"5.00",step:"percentage"===de.type?"1":"0.01",min:"0"})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Min Order Amount"}),(0,p.jsx)($,{type:"number",value:de.min_order,onChange:e=>ce({...de,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Max Discount (for %)"}),(0,p.jsx)($,{type:"number",value:de.max_discount,onChange:e=>ce({...de,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==de.type})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Valid From"}),(0,p.jsx)($,{type:"date",value:de.valid_from,onChange:e=>ce({...de,valid_from:e.target.value})})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Valid Until"}),(0,p.jsx)($,{type:"date",value:de.valid_until,onChange:e=>ce({...de,valid_until:e.target.value})})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Usage Limit"}),(0,p.jsx)($,{type:"number",value:de.usage_limit,onChange:e=>ce({...de,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Target Audience"}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(P,{children:[(0,p.jsx)("input",{type:"radio",name:"target_type",checked:"all"===de.target_type,onChange:()=>ce({...de,target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]})}),"All Customers"]}),(0,p.jsxs)(P,{children:[(0,p.jsx)("input",{type:"radio",name:"target_type",checked:"customers"===de.target_type,onChange:()=>ce({...de,target_type:"customers",target_loyalty_tiers:[]})}),"Specific Customers"]}),(0,p.jsxs)(P,{children:[(0,p.jsx)("input",{type:"radio",name:"target_type",checked:"tiers"===de.target_type,onChange:()=>ce({...de,target_type:"tiers",target_customer_ids:[]})}),"Membership Tiers"]})]}),"customers"===de.target_type&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(Y,{type:"text",placeholder:"Search customers by name or phone...",value:fe,onChange:e=>_e(e.target.value)}),(0,p.jsxs)(R,{children:[be?(0,p.jsx)(J,{children:"Loading customers..."}):ye.filter(e=>e.name.toLowerCase().includes(fe.toLowerCase())||e.phone.includes(fe)).map(e=>{const t=de.target_customer_ids.includes(e.id);return(0,p.jsxs)(J,{selected:t,onClick:()=>{const i=t?de.target_customer_ids.filter(t=>t!==e.id):[...de.target_customer_ids,e.id];ce({...de,target_customer_ids:i})},children:[(0,p.jsx)("input",{type:"checkbox",checked:t,readOnly:!0,style:{accentColor:"#635BFF"}}),(0,p.jsxs)(q,{children:[(0,p.jsx)(G,{children:e.name}),(0,p.jsxs)(H,{children:[e.phone," \xb7 ",e.loyalty_tier]})]})]},e.id)}),!be&&0===ye.filter(e=>e.name.toLowerCase().includes(fe.toLowerCase())||e.phone.includes(fe)).length&&(0,p.jsx)(J,{children:"No customers found"})]}),(0,p.jsxs)(W,{children:[de.target_customer_ids.length," customer",1!==de.target_customer_ids.length?"s":""," selected"]})]}),"tiers"===de.target_type&&(0,p.jsx)(V,{children:["Bronze","Silver","Gold","VIP"].map(e=>{const t=de.target_loyalty_tiers.includes(e);return(0,p.jsxs)(M,{checked:t,children:[(0,p.jsx)("input",{type:"checkbox",checked:t,onChange:()=>{const i=t?de.target_loyalty_tiers.filter(t=>t!==e):[...de.target_loyalty_tiers,e];ce({...de,target_loyalty_tiers:i})}}),e]},e)})})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"Description"}),(0,p.jsx)(U,{value:de.description,onChange:e=>ce({...de,description:e.target.value}),placeholder:"Optional description..."})]}),pe&&(0,p.jsx)(O,{children:pe})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(u,{onClick:()=>ae(!1),disabled:te,children:"Cancel"}),(0,p.jsx)(u,{primary:!0,onClick:async()=>{if(de.code.trim())if(!de.value||parseFloat(de.value)<=0)xe("Discount value must be greater than 0");else try{ie(!0),xe(null);const e=localStorage.getItem("auth_token"),t={restaurant_id:i,code:de.code.toUpperCase(),name:de.name||null,description:de.description||null,type:de.type,value:parseFloat(de.value),min_order:de.min_order?parseFloat(de.min_order):0,max_discount:de.max_discount?parseFloat(de.max_discount):null,usage_limit:de.usage_limit?parseInt(de.usage_limit):null,valid_from:de.valid_from||null,valid_until:de.valid_until||null,is_active:!0,target_type:de.target_type,target_customer_ids:"customers"===de.target_type?de.target_customer_ids:null,target_loyalty_tiers:"tiers"===de.target_type?de.target_loyalty_tiers:null},r=se?`/api/coupons/${se.id}`:"/api/coupons",n=await fetch(r,{method:se?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();o.success?(ae(!1),Fe()):xe(o.error||"Failed to save coupon")}catch(e){xe("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{ie(!1)}else xe("Coupon code is required")},disabled:te,children:te?"Saving...":se?"Update Coupon":"Create Coupon"})]})]})})]}),(0,p.jsx)(c.A,{isOpen:ue,title:"Delete Coupon",message:`Are you sure you want to delete coupon "${null===ge||void 0===ge?void 0:ge.code}"?`,onConfirm:async()=>{if(ge){he(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons/${ge.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});(await t.json()).success&&Fe()}catch(e){console.error("Error deleting coupon:",e)}me(null)}},onCancel:()=>{he(!1),me(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,t,i)=>{i.d(t,{A:()=>x});i(9950);var r=i(4752),n=i(9610),o=i(4414);const a=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:t,title:i,message:r,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,o.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(l,{children:i}),(0,o.jsx)(d,{children:r})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},8012:(e,t,i)=>{i.d(t,{Ay:()=>l});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,a=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,s=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:t,children:i}=e;return(0,n.jsxs)(o,{children:[(0,n.jsx)(a,{children:t}),i&&(0,n.jsx)(s,{children:i})]})}}}]);