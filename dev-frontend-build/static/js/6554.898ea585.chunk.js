"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(9950),i=r(4752),o=r(8409),a=r(2853),l=r(1367),s=r(9018),d=r(6038),c=r(8012),p=r(7617),u=r(5030),x=r(4414);const g=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=i.Ay.button`
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
`,m=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,y=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,_=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,v=i.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,j=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,b=i.Ay.th`
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
`,f=i.Ay.td`
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
`,F=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,C=i.Ay.div`
  display: flex;
  gap: 8px;
`,A=i.Ay.button`
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
`,w=i.Ay.div`
  margin-bottom: 20px;
`,k=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,E=i.Ay.input`
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
`,B=i.Ay.select`
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
`,S=i.Ay.textarea`
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
`,z=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,D=i.Ay.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`,$=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #6B7C93;
`,T=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,U=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #635BFF;
  }
`,I=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,L=i.Ay.label`
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
`,O=i.Ay.input`
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
`,N=i.Ay.div`
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,P=i.Ay.div`
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
`,V=i.Ay.div`
  flex: 1;
  min-width: 0;
`,M=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,R=i.Ay.div`
  font-size: 11px;
  color: #6B7C93;
`,Y=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,J=i.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F4F3FF;
  color: #635BFF;
`,q=()=>{const{t:e}=(0,u.Bd)("menu"),{user:t}=(0,l.As)(),{operationSettings:r}=(0,s.Pj)(),i=null===t||void 0===t?void 0:t.restaurantId,q=(null===r||void 0===r?void 0:r.currency)||"MYR",[G,H]=(0,n.useState)([]),[W,K]=(0,n.useState)(!0),[Q,X]=(0,n.useState)(!1),[Z,ee]=(0,n.useState)(null),[te,re]=(0,n.useState)(!1),[ne,ie]=(0,n.useState)(null),[oe,ae]=(0,n.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),[le,se]=(0,n.useState)(null),[de,ce]=(0,n.useState)(!1),[pe,ue]=(0,n.useState)(null),[xe,ge]=(0,n.useState)([]),[he,me]=(0,n.useState)(""),[ye,_e]=(0,n.useState)(!1);(0,n.useEffect)(()=>{i&&ve()},[i]);const ve=async()=>{try{K(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons?restaurantId=${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?H(r.data):ee(r.error||"Failed to load coupons")}catch(e){ee("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{K(!1)}},je=async()=>{if(i)try{_e(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/customers/${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();if(r.success){const e=r.data||[];ge(e.map(e=>{var t,r,n;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id||e.id,name:(null===(r=e.customer)||void 0===r?void 0:r.name)||e.name||"",phone:(null===(n=e.customer)||void 0===n?void 0:n.phone)||e.phone||"",loyalty_tier:e.loyalty_tier||"Bronze"}}))}}catch(e){console.error("Error fetching customers:",e)}finally{_e(!1)}},be=()=>{ie(null),ae({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),me(""),se(null),je(),re(!0)},fe=e=>"percentage"===e.type?`${e.value}%`:(0,d.vv)(e.value,q);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(c.Ay,{title:"Coupons",children:(0,x.jsx)(h,{primary:!0,onClick:be,children:"Create Coupon"})}),(0,x.jsx)(m,{children:(0,x.jsxs)(y,{children:[(0,x.jsx)(_,{children:"Coupon List"}),W?(0,x.jsx)($,{children:"Loading coupons..."}):Z?(0,x.jsxs)(a.pp,{children:[(0,x.jsx)(v,{children:Z}),(0,x.jsx)(h,{onClick:ve,children:"Retry"})]}):G.length>0?(0,x.jsxs)(j,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(b,{children:"Code"}),(0,x.jsx)(b,{children:"Name"}),(0,x.jsx)(b,{children:"Discount"}),(0,x.jsx)(b,{children:"Target"}),(0,x.jsx)(b,{children:"Valid Until"}),(0,x.jsx)(b,{children:"Usage"}),(0,x.jsx)(b,{children:"Status"}),(0,x.jsx)(b,{children:"Actions"})]})}),(0,x.jsx)("tbody",{children:G.map(e=>{var t,r;const n=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,x.jsxs)("tr",{children:[(0,x.jsx)(f,{style:{fontWeight:600},children:e.code}),(0,x.jsx)(f,{children:e.name||"-"}),(0,x.jsx)(f,{children:fe(e)}),(0,x.jsx)(f,{children:"all"===e.target_type?(0,x.jsx)(J,{children:"All"}):"customers"===e.target_type?(0,x.jsxs)(J,{children:[(null===(t=e.target_customer_ids)||void 0===t?void 0:t.length)||0," Customers"]}):"tiers"===e.target_type?(0,x.jsx)(J,{children:(null===(r=e.target_loyalty_tiers)||void 0===r?void 0:r.join(", "))||"-"}):(0,x.jsx)(J,{children:"All"})}),(0,x.jsx)(f,{children:(i=e.valid_until,i?new Date(i).toLocaleDateString():"-")}),(0,x.jsxs)(f,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,x.jsx)(f,{children:(0,x.jsx)(F,{status:n,children:n})}),(0,x.jsx)(f,{children:(0,x.jsxs)(C,{children:[(0,x.jsx)(A,{onClick:()=>(e=>{var t,r,n;ie(e),ae({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(t=e.min_order)||void 0===t?void 0:t.toString())||"",max_discount:(null===(r=e.max_discount)||void 0===r?void 0:r.toString())||"",usage_limit:(null===(n=e.usage_limit)||void 0===n?void 0:n.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:"",target_type:e.target_type||"all",target_customer_ids:e.target_customer_ids||[],target_loyalty_tiers:e.target_loyalty_tiers||[]}),me(""),se(null),je(),re(!0)})(e),children:"Edit"}),(0,x.jsx)(A,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await r.json()).success&&ve()}catch(t){console.error("Error toggling coupon status:",t)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,x.jsx)(A,{className:"danger",onClick:()=>(e=>{ue(e),ce(!0)})(e),children:"Delete"})]})})]},e.id);var i})})]}):(0,x.jsxs)(a.pp,{children:[(0,x.jsx)(v,{children:"No coupons created yet"}),(0,x.jsx)(h,{primary:!0,onClick:be,children:"Create Your First Coupon"})]})]})}),te&&(0,x.jsxs)(o.aF,{isOpen:!0,onClose:()=>re(!1),title:ne?"Edit Coupon":"Create New Coupon",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{onClick:()=>re(!1),disabled:Q,children:"Cancel"}),(0,x.jsx)(h,{primary:!0,onClick:async()=>{if(oe.code.trim())if(!oe.value||parseFloat(oe.value)<=0)se("Discount value must be greater than 0");else try{X(!0),se(null);const e=localStorage.getItem("auth_token"),t={restaurant_id:i,code:oe.code.toUpperCase(),name:oe.name||null,description:oe.description||null,type:oe.type,value:parseFloat(oe.value),min_order:oe.min_order?parseFloat(oe.min_order):0,max_discount:oe.max_discount?parseFloat(oe.max_discount):null,usage_limit:oe.usage_limit?parseInt(oe.usage_limit):null,valid_from:oe.valid_from||null,valid_until:oe.valid_until||null,is_active:!0,target_type:oe.target_type,target_customer_ids:"customers"===oe.target_type?oe.target_customer_ids:null,target_loyalty_tiers:"tiers"===oe.target_type?oe.target_loyalty_tiers:null},r=ne?`/api/coupons/${ne.id}`:"/api/coupons",n=await fetch(r,{method:ne?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();o.success?(re(!1),ve()):se(o.error||"Failed to save coupon")}catch(e){se("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{X(!1)}else se("Coupon code is required")},disabled:Q,children:Q?"Saving...":ne?"Update Coupon":"Create Coupon"})]}),children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Coupon Code *"}),(0,x.jsx)(E,{type:"text",value:oe.code,onChange:e=>ae({...oe,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Name"}),(0,x.jsx)(E,{type:"text",value:oe.name,onChange:e=>ae({...oe,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,x.jsxs)(z,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Discount Type"}),(0,x.jsxs)(B,{value:oe.type,onChange:e=>ae({...oe,type:e.target.value}),children:[(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Discount Value *"}),(0,x.jsx)(E,{type:"number",value:oe.value,onChange:e=>ae({...oe,value:e.target.value}),placeholder:"percentage"===oe.type?"10":"5.00",step:"percentage"===oe.type?"1":"0.01",min:"0"})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Min Order Amount"}),(0,x.jsx)(E,{type:"number",value:oe.min_order,onChange:e=>ae({...oe,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Max Discount (for %)"}),(0,x.jsx)(E,{type:"number",value:oe.max_discount,onChange:e=>ae({...oe,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==oe.type})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Valid From"}),(0,x.jsx)(E,{type:"date",value:oe.valid_from,onChange:e=>ae({...oe,valid_from:e.target.value})})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Valid Until"}),(0,x.jsx)(E,{type:"date",value:oe.valid_until,onChange:e=>ae({...oe,valid_until:e.target.value})})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Usage Limit"}),(0,x.jsx)(E,{type:"number",value:oe.usage_limit,onChange:e=>ae({...oe,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Target Audience"}),(0,x.jsxs)(T,{children:[(0,x.jsxs)(U,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"all"===oe.target_type,onChange:()=>ae({...oe,target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]})}),"All Customers"]}),(0,x.jsxs)(U,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"customers"===oe.target_type,onChange:()=>ae({...oe,target_type:"customers",target_loyalty_tiers:[]})}),"Specific Customers"]}),(0,x.jsxs)(U,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"tiers"===oe.target_type,onChange:()=>ae({...oe,target_type:"tiers",target_customer_ids:[]})}),"Membership Tiers"]})]}),"customers"===oe.target_type&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(O,{type:"text",placeholder:"Search customers by name or phone...",value:he,onChange:e=>me(e.target.value)}),(0,x.jsxs)(N,{children:[ye?(0,x.jsx)(P,{children:"Loading customers..."}):xe.filter(e=>e.name.toLowerCase().includes(he.toLowerCase())||e.phone.includes(he)).map(e=>{const t=oe.target_customer_ids.includes(e.id);return(0,x.jsxs)(P,{selected:t,onClick:()=>{const r=t?oe.target_customer_ids.filter(t=>t!==e.id):[...oe.target_customer_ids,e.id];ae({...oe,target_customer_ids:r})},children:[(0,x.jsx)("input",{type:"checkbox",checked:t,readOnly:!0,style:{accentColor:"#635BFF"}}),(0,x.jsxs)(V,{children:[(0,x.jsx)(M,{children:e.name}),(0,x.jsxs)(R,{children:[e.phone," \xb7 ",e.loyalty_tier]})]})]},e.id)}),!ye&&0===xe.filter(e=>e.name.toLowerCase().includes(he.toLowerCase())||e.phone.includes(he)).length&&(0,x.jsx)(P,{children:"No customers found"})]}),(0,x.jsxs)(Y,{children:[oe.target_customer_ids.length," customer",1!==oe.target_customer_ids.length?"s":""," selected"]})]}),"tiers"===oe.target_type&&(0,x.jsx)(I,{children:["Bronze","Silver","Gold","VIP"].map(e=>{const t=oe.target_loyalty_tiers.includes(e);return(0,x.jsxs)(L,{checked:t,children:[(0,x.jsx)("input",{type:"checkbox",checked:t,onChange:()=>{const r=t?oe.target_loyalty_tiers.filter(t=>t!==e):[...oe.target_loyalty_tiers,e];ae({...oe,target_loyalty_tiers:r})}}),e]},e)})})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(k,{children:"Description"}),(0,x.jsx)(S,{value:oe.description,onChange:e=>ae({...oe,description:e.target.value}),placeholder:"Optional description..."})]}),le&&(0,x.jsx)(D,{children:le})]})]}),(0,x.jsx)(p.A,{isOpen:de,title:"Delete Coupon",message:`Are you sure you want to delete coupon "${null===pe||void 0===pe?void 0:pe.code}"?`,onConfirm:async()=>{if(pe){ce(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons/${pe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});(await t.json()).success&&ve()}catch(e){console.error("Error deleting coupon:",e)}ue(null)}},onCancel:()=>{ce(!1),ue(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var n=r(7119),i=r(4752),o=r(9610),a=r(4414);const l=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=i.Ay.button`
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
`,x=e=>{let{isOpen:t,title:r,message:i,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:r}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}}}]);