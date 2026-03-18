"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,t,r)=>{r.r(t),r.d(t,{default:()=>J});var i=r(9950),n=r(4752),o=r(8409),a=r(2853),s=r(1367),l=r(9018),d=r(6038),c=r(8012),p=r(7617),x=r(4414);const u=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=n.Ay.button`
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
`,g=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,m=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,y=n.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,_=n.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,v=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,j=n.Ay.th`
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
`,b=n.Ay.td`
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
`,f=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,F=n.Ay.div`
  display: flex;
  gap: 8px;
`,C=n.Ay.button`
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
`,A=n.Ay.div`
  margin-bottom: 20px;
`,w=n.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,k=n.Ay.input`
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
`,E=n.Ay.select`
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
`,B=n.Ay.textarea`
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
`,S=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,z=n.Ay.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`,D=n.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #6B7C93;
`,$=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,T=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #635BFF;
  }
`,U=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,I=n.Ay.label`
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
`,L=n.Ay.input`
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
`,O=n.Ay.div`
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,N=n.Ay.div`
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
`,V=n.Ay.div`
  flex: 1;
  min-width: 0;
`,P=n.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,M=n.Ay.div`
  font-size: 11px;
  color: #6B7C93;
`,R=n.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,Y=n.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F4F3FF;
  color: #635BFF;
`,J=()=>{const{user:e}=(0,s.As)(),{operationSettings:t}=(0,l.Pj)(),r=null===e||void 0===e?void 0:e.restaurantId,n=(null===t||void 0===t?void 0:t.currency)||"MYR",[J,q]=(0,i.useState)([]),[G,H]=(0,i.useState)(!0),[W,K]=(0,i.useState)(!1),[Q,X]=(0,i.useState)(null),[Z,ee]=(0,i.useState)(!1),[te,re]=(0,i.useState)(null),[ie,ne]=(0,i.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),[oe,ae]=(0,i.useState)(null),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(null),[pe,xe]=(0,i.useState)([]),[ue,he]=(0,i.useState)(""),[ge,me]=(0,i.useState)(!1);(0,i.useEffect)(()=>{r&&ye()},[r]);const ye=async()=>{try{H(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons?restaurantId=${r}`,{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?q(i.data):X(i.error||"Failed to load coupons")}catch(e){X("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{H(!1)}},_e=async()=>{if(r)try{me(!0);const e=localStorage.getItem("auth_token"),t=await fetch(`/api/customers/${r}`,{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();if(i.success){const e=i.data||[];xe(e.map(e=>{var t,r,i;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id||e.id,name:(null===(r=e.customer)||void 0===r?void 0:r.name)||e.name||"",phone:(null===(i=e.customer)||void 0===i?void 0:i.phone)||e.phone||"",loyalty_tier:e.loyalty_tier||"Bronze"}}))}}catch(e){console.error("Error fetching customers:",e)}finally{me(!1)}},ve=()=>{re(null),ne({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),he(""),ae(null),_e(),ee(!0)},je=e=>"percentage"===e.type?`${e.value}%`:(0,d.vv)(e.value,n);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(c.Ay,{title:"Coupons",children:(0,x.jsx)(h,{primary:!0,onClick:ve,children:"Create Coupon"})}),(0,x.jsx)(g,{children:(0,x.jsxs)(m,{children:[(0,x.jsx)(y,{children:"Coupon List"}),G?(0,x.jsx)(D,{children:"Loading coupons..."}):Q?(0,x.jsxs)(a.pp,{children:[(0,x.jsx)(_,{children:Q}),(0,x.jsx)(h,{onClick:ye,children:"Retry"})]}):J.length>0?(0,x.jsxs)(v,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(j,{children:"Code"}),(0,x.jsx)(j,{children:"Name"}),(0,x.jsx)(j,{children:"Discount"}),(0,x.jsx)(j,{children:"Target"}),(0,x.jsx)(j,{children:"Valid Until"}),(0,x.jsx)(j,{children:"Usage"}),(0,x.jsx)(j,{children:"Status"}),(0,x.jsx)(j,{children:"Actions"})]})}),(0,x.jsx)("tbody",{children:J.map(e=>{var t,r;const i=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,x.jsxs)("tr",{children:[(0,x.jsx)(b,{style:{fontWeight:600},children:e.code}),(0,x.jsx)(b,{children:e.name||"-"}),(0,x.jsx)(b,{children:je(e)}),(0,x.jsx)(b,{children:"all"===e.target_type?(0,x.jsx)(Y,{children:"All"}):"customers"===e.target_type?(0,x.jsxs)(Y,{children:[(null===(t=e.target_customer_ids)||void 0===t?void 0:t.length)||0," Customers"]}):"tiers"===e.target_type?(0,x.jsx)(Y,{children:(null===(r=e.target_loyalty_tiers)||void 0===r?void 0:r.join(", "))||"-"}):(0,x.jsx)(Y,{children:"All"})}),(0,x.jsx)(b,{children:(n=e.valid_until,n?new Date(n).toLocaleDateString():"-")}),(0,x.jsxs)(b,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,x.jsx)(b,{children:(0,x.jsx)(f,{status:i,children:i})}),(0,x.jsx)(b,{children:(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{onClick:()=>(e=>{var t,r,i;re(e),ne({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(t=e.min_order)||void 0===t?void 0:t.toString())||"",max_discount:(null===(r=e.max_discount)||void 0===r?void 0:r.toString())||"",usage_limit:(null===(i=e.usage_limit)||void 0===i?void 0:i.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:"",target_type:e.target_type||"all",target_customer_ids:e.target_customer_ids||[],target_loyalty_tiers:e.target_loyalty_tiers||[]}),he(""),ae(null),_e(),ee(!0)})(e),children:"Edit"}),(0,x.jsx)(C,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await r.json()).success&&ye()}catch(t){console.error("Error toggling coupon status:",t)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,x.jsx)(C,{className:"danger",onClick:()=>(e=>{ce(e),le(!0)})(e),children:"Delete"})]})})]},e.id);var n})})]}):(0,x.jsxs)(a.pp,{children:[(0,x.jsx)(_,{children:"No coupons created yet"}),(0,x.jsx)(h,{primary:!0,onClick:ve,children:"Create Your First Coupon"})]})]})}),Z&&(0,x.jsxs)(o.aF,{isOpen:!0,onClose:()=>ee(!1),title:te?"Edit Coupon":"Create New Coupon",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h,{onClick:()=>ee(!1),disabled:W,children:"Cancel"}),(0,x.jsx)(h,{primary:!0,onClick:async()=>{if(ie.code.trim())if(!ie.value||parseFloat(ie.value)<=0)ae("Discount value must be greater than 0");else try{K(!0),ae(null);const e=localStorage.getItem("auth_token"),t={restaurant_id:r,code:ie.code.toUpperCase(),name:ie.name||null,description:ie.description||null,type:ie.type,value:parseFloat(ie.value),min_order:ie.min_order?parseFloat(ie.min_order):0,max_discount:ie.max_discount?parseFloat(ie.max_discount):null,usage_limit:ie.usage_limit?parseInt(ie.usage_limit):null,valid_from:ie.valid_from||null,valid_until:ie.valid_until||null,is_active:!0,target_type:ie.target_type,target_customer_ids:"customers"===ie.target_type?ie.target_customer_ids:null,target_loyalty_tiers:"tiers"===ie.target_type?ie.target_loyalty_tiers:null},i=te?`/api/coupons/${te.id}`:"/api/coupons",n=await fetch(i,{method:te?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();o.success?(ee(!1),ye()):ae(o.error||"Failed to save coupon")}catch(e){ae("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{K(!1)}else ae("Coupon code is required")},disabled:W,children:W?"Saving...":te?"Update Coupon":"Create Coupon"})]}),children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Coupon Code *"}),(0,x.jsx)(k,{type:"text",value:ie.code,onChange:e=>ne({...ie,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Name"}),(0,x.jsx)(k,{type:"text",value:ie.name,onChange:e=>ne({...ie,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Discount Type"}),(0,x.jsxs)(E,{value:ie.type,onChange:e=>ne({...ie,type:e.target.value}),children:[(0,x.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,x.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Discount Value *"}),(0,x.jsx)(k,{type:"number",value:ie.value,onChange:e=>ne({...ie,value:e.target.value}),placeholder:"percentage"===ie.type?"10":"5.00",step:"percentage"===ie.type?"1":"0.01",min:"0"})]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Min Order Amount"}),(0,x.jsx)(k,{type:"number",value:ie.min_order,onChange:e=>ne({...ie,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Max Discount (for %)"}),(0,x.jsx)(k,{type:"number",value:ie.max_discount,onChange:e=>ne({...ie,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==ie.type})]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Valid From"}),(0,x.jsx)(k,{type:"date",value:ie.valid_from,onChange:e=>ne({...ie,valid_from:e.target.value})})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Valid Until"}),(0,x.jsx)(k,{type:"date",value:ie.valid_until,onChange:e=>ne({...ie,valid_until:e.target.value})})]})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Usage Limit"}),(0,x.jsx)(k,{type:"number",value:ie.usage_limit,onChange:e=>ne({...ie,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Target Audience"}),(0,x.jsxs)($,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"all"===ie.target_type,onChange:()=>ne({...ie,target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]})}),"All Customers"]}),(0,x.jsxs)(T,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"customers"===ie.target_type,onChange:()=>ne({...ie,target_type:"customers",target_loyalty_tiers:[]})}),"Specific Customers"]}),(0,x.jsxs)(T,{children:[(0,x.jsx)("input",{type:"radio",name:"target_type",checked:"tiers"===ie.target_type,onChange:()=>ne({...ie,target_type:"tiers",target_customer_ids:[]})}),"Membership Tiers"]})]}),"customers"===ie.target_type&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{type:"text",placeholder:"Search customers by name or phone...",value:ue,onChange:e=>he(e.target.value)}),(0,x.jsxs)(O,{children:[ge?(0,x.jsx)(N,{children:"Loading customers..."}):pe.filter(e=>e.name.toLowerCase().includes(ue.toLowerCase())||e.phone.includes(ue)).map(e=>{const t=ie.target_customer_ids.includes(e.id);return(0,x.jsxs)(N,{selected:t,onClick:()=>{const r=t?ie.target_customer_ids.filter(t=>t!==e.id):[...ie.target_customer_ids,e.id];ne({...ie,target_customer_ids:r})},children:[(0,x.jsx)("input",{type:"checkbox",checked:t,readOnly:!0,style:{accentColor:"#635BFF"}}),(0,x.jsxs)(V,{children:[(0,x.jsx)(P,{children:e.name}),(0,x.jsxs)(M,{children:[e.phone," \xb7 ",e.loyalty_tier]})]})]},e.id)}),!ge&&0===pe.filter(e=>e.name.toLowerCase().includes(ue.toLowerCase())||e.phone.includes(ue)).length&&(0,x.jsx)(N,{children:"No customers found"})]}),(0,x.jsxs)(R,{children:[ie.target_customer_ids.length," customer",1!==ie.target_customer_ids.length?"s":""," selected"]})]}),"tiers"===ie.target_type&&(0,x.jsx)(U,{children:["Bronze","Silver","Gold","VIP"].map(e=>{const t=ie.target_loyalty_tiers.includes(e);return(0,x.jsxs)(I,{checked:t,children:[(0,x.jsx)("input",{type:"checkbox",checked:t,onChange:()=>{const r=t?ie.target_loyalty_tiers.filter(t=>t!==e):[...ie.target_loyalty_tiers,e];ne({...ie,target_loyalty_tiers:r})}}),e]},e)})})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(w,{children:"Description"}),(0,x.jsx)(B,{value:ie.description,onChange:e=>ne({...ie,description:e.target.value}),placeholder:"Optional description..."})]}),oe&&(0,x.jsx)(z,{children:oe})]})]}),(0,x.jsx)(p.A,{isOpen:se,title:"Delete Coupon",message:`Are you sure you want to delete coupon "${null===de||void 0===de?void 0:de.code}"?`,onConfirm:async()=>{if(de){le(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/coupons/${de.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});(await t.json()).success&&ye()}catch(e){console.error("Error deleting coupon:",e)}ce(null)}},onCancel:()=>{le(!1),ce(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var i=r(4752),n=r(9610),o=r(4414);const a=i.Ay.div`
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
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:t,title:r,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,o.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(l,{children:r}),(0,o.jsx)(d,{children:i})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},8012:(e,t,r)=>{r.d(t,{Ay:()=>l});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,a=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:t,children:r}=e;return(0,n.jsxs)(o,{children:[(0,n.jsx)(a,{children:t}),r&&(0,n.jsx)(s,{children:r})]})}}}]);