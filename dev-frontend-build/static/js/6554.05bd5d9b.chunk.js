"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,t,r)=>{r.r(t),r.d(t,{default:()=>G});var n=r(9950),i=r(4752),o=r(8409),a=r(2853),s=r(1367),l=r(9018),d=r(6038),c=r(8012),p=r(7617),u=r(5030),x=r(9955),h=r(4414);const g=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,m=i.Ay.button`
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
`,y=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,_=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,v=i.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,j=i.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,b=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,f=i.Ay.th`
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
`,F=i.Ay.td`
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
`,C=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
`,w=i.Ay.button`
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
`,k=i.Ay.div`
  margin-bottom: 20px;
`,E=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,B=i.Ay.input`
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
`,z=i.Ay.select`
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
`,D=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,$=i.Ay.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`,T=i.Ay.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #6B7C93;
`,U=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`,L=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #635BFF;
  }
`,O=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,N=i.Ay.label`
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
`,P=i.Ay.input`
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
`,V=i.Ay.div`
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`,I=i.Ay.div`
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
`,M=i.Ay.div`
  flex: 1;
  min-width: 0;
`,R=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,Y=i.Ay.div`
  font-size: 11px;
  color: #6B7C93;
`,J=i.Ay.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`,q=i.Ay.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F4F3FF;
  color: #635BFF;
`,G=()=>{const{t:e}=(0,u.Bd)("menu"),{user:t}=(0,s.As)(),{operationSettings:r}=(0,l.Pj)(),i=null===t||void 0===t?void 0:t.restaurantId,G=(null===r||void 0===r?void 0:r.currency)||"MYR",[H,W]=(0,n.useState)([]),[K,Q]=(0,n.useState)(!0),[X,Z]=(0,n.useState)(!1),[ee,te]=(0,n.useState)(null),[re,ne]=(0,n.useState)(!1),[ie,oe]=(0,n.useState)(null),[ae,se]=(0,n.useState)({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),[le,de]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(!1),[ue,xe]=(0,n.useState)(null),[he,ge]=(0,n.useState)([]),[me,ye]=(0,n.useState)(""),[_e,ve]=(0,n.useState)(!1);(0,n.useEffect)(()=>{i&&je()},[i]);const je=async()=>{try{Q(!0);const e=(0,x.c4)(),t=await fetch(`/api/coupons?restaurantId=${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?W(r.data):te(r.error||"Failed to load coupons")}catch(e){te("Failed to load coupons"),console.error("Error fetching coupons:",e)}finally{Q(!1)}},be=async()=>{if(i)try{ve(!0);const e=(0,x.c4)(),t=await fetch(`/api/customers/${i}`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();if(r.success){const e=r.data||[];ge(e.map(e=>{var t,r,n;return{id:(null===(t=e.customer)||void 0===t?void 0:t.id)||e.customer_id||e.id,name:(null===(r=e.customer)||void 0===r?void 0:r.name)||e.name||"",phone:(null===(n=e.customer)||void 0===n?void 0:n.phone)||e.phone||"",loyalty_tier:e.loyalty_tier||"Bronze"}}))}}catch(e){console.error("Error fetching customers:",e)}finally{ve(!1)}},fe=()=>{oe(null),se({code:"",name:"",description:"",type:"percentage",value:"",min_order:"",max_discount:"",usage_limit:"",valid_from:"",valid_until:"",target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]}),ye(""),de(null),be(),ne(!0)},Fe=e=>"percentage"===e.type?`${e.value}%`:(0,d.vv)(e.value,G);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(c.Ay,{title:"Coupons",children:(0,h.jsx)(m,{primary:!0,onClick:fe,children:"Create Coupon"})}),(0,h.jsx)(y,{children:(0,h.jsxs)(_,{children:[(0,h.jsx)(v,{children:"Coupon List"}),K?(0,h.jsx)(T,{children:"Loading coupons..."}):ee?(0,h.jsxs)(a.pp,{children:[(0,h.jsx)(j,{children:ee}),(0,h.jsx)(m,{onClick:je,children:"Retry"})]}):H.length>0?(0,h.jsxs)(b,{children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)(f,{children:"Code"}),(0,h.jsx)(f,{children:"Name"}),(0,h.jsx)(f,{children:"Discount"}),(0,h.jsx)(f,{children:"Target"}),(0,h.jsx)(f,{children:"Valid Until"}),(0,h.jsx)(f,{children:"Usage"}),(0,h.jsx)(f,{children:"Status"}),(0,h.jsx)(f,{children:"Actions"})]})}),(0,h.jsx)("tbody",{children:H.map(e=>{var t,r;const n=(e=>e.is_active?e.valid_until&&new Date(e.valid_until)<new Date||e.usage_limit&&e.usage_count>=e.usage_limit?"expired":"active":"inactive")(e);return(0,h.jsxs)("tr",{children:[(0,h.jsx)(F,{style:{fontWeight:600},children:e.code}),(0,h.jsx)(F,{children:e.name||"-"}),(0,h.jsx)(F,{children:Fe(e)}),(0,h.jsx)(F,{children:"all"===e.target_type?(0,h.jsx)(q,{children:"All"}):"customers"===e.target_type?(0,h.jsxs)(q,{children:[(null===(t=e.target_customer_ids)||void 0===t?void 0:t.length)||0," Customers"]}):"tiers"===e.target_type?(0,h.jsx)(q,{children:(null===(r=e.target_loyalty_tiers)||void 0===r?void 0:r.join(", "))||"-"}):(0,h.jsx)(q,{children:"All"})}),(0,h.jsx)(F,{children:(i=e.valid_until,i?new Date(i).toLocaleDateString():"-")}),(0,h.jsxs)(F,{children:[e.usage_count," / ",e.usage_limit||"\u221e"]}),(0,h.jsx)(F,{children:(0,h.jsx)(C,{status:n,children:n})}),(0,h.jsx)(F,{children:(0,h.jsxs)(A,{children:[(0,h.jsx)(w,{onClick:()=>(e=>{var t,r,n;oe(e),se({code:e.code,name:e.name||"",description:e.description||"",type:e.type,value:e.value.toString(),min_order:(null===(t=e.min_order)||void 0===t?void 0:t.toString())||"",max_discount:(null===(r=e.max_discount)||void 0===r?void 0:r.toString())||"",usage_limit:(null===(n=e.usage_limit)||void 0===n?void 0:n.toString())||"",valid_from:e.valid_from?e.valid_from.split("T")[0]:"",valid_until:e.valid_until?e.valid_until.split("T")[0]:"",target_type:e.target_type||"all",target_customer_ids:e.target_customer_ids||[],target_loyalty_tiers:e.target_loyalty_tiers||[]}),ye(""),de(null),be(),ne(!0)})(e),children:"Edit"}),(0,h.jsx)(w,{onClick:()=>(async e=>{try{const t=(0,x.c4)(),r=await fetch(`/api/coupons/${e.id}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})});(await r.json()).success&&je()}catch(t){console.error("Error toggling coupon status:",t)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,h.jsx)(w,{className:"danger",onClick:()=>(e=>{xe(e),pe(!0)})(e),children:"Delete"})]})})]},e.id);var i})})]}):(0,h.jsxs)(a.pp,{children:[(0,h.jsx)(j,{children:"No coupons created yet"}),(0,h.jsx)(m,{primary:!0,onClick:fe,children:"Create Your First Coupon"})]})]})}),re&&(0,h.jsxs)(o.aF,{isOpen:!0,onClose:()=>ne(!1),title:ie?"Edit Coupon":"Create New Coupon",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(m,{onClick:()=>ne(!1),disabled:X,children:"Cancel"}),(0,h.jsx)(m,{primary:!0,onClick:async()=>{if(ae.code.trim())if(!ae.value||parseFloat(ae.value)<=0)de("Discount value must be greater than 0");else try{Z(!0),de(null);const e=(0,x.c4)(),t={restaurant_id:i,code:ae.code.toUpperCase(),name:ae.name||null,description:ae.description||null,type:ae.type,value:parseFloat(ae.value),min_order:ae.min_order?parseFloat(ae.min_order):0,max_discount:ae.max_discount?parseFloat(ae.max_discount):null,usage_limit:ae.usage_limit?parseInt(ae.usage_limit):null,valid_from:ae.valid_from||null,valid_until:ae.valid_until||null,is_active:!0,target_type:ae.target_type,target_customer_ids:"customers"===ae.target_type?ae.target_customer_ids:null,target_loyalty_tiers:"tiers"===ae.target_type?ae.target_loyalty_tiers:null},r=ie?`/api/coupons/${ie.id}`:"/api/coupons",n=await fetch(r,{method:ie?"PUT":"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await n.json();o.success?(ne(!1),je()):de(o.error||"Failed to save coupon")}catch(e){de("Failed to save coupon"),console.error("Error saving coupon:",e)}finally{Z(!1)}else de("Coupon code is required")},disabled:X,children:X?"Saving...":ie?"Update Coupon":"Create Coupon"})]}),children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Coupon Code *"}),(0,h.jsx)(B,{type:"text",value:ae.code,onChange:e=>se({...ae,code:e.target.value.toUpperCase()}),placeholder:"e.g., SAVE10"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Name"}),(0,h.jsx)(B,{type:"text",value:ae.name,onChange:e=>se({...ae,name:e.target.value}),placeholder:"e.g., 10% Off Summer Sale"})]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Discount Type"}),(0,h.jsxs)(z,{value:ae.type,onChange:e=>se({...ae,type:e.target.value}),children:[(0,h.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,h.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Discount Value *"}),(0,h.jsx)(B,{type:"number",value:ae.value,onChange:e=>se({...ae,value:e.target.value}),placeholder:"percentage"===ae.type?"10":"5.00",step:"percentage"===ae.type?"1":"0.01",min:"0"})]})]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Min Order Amount"}),(0,h.jsx)(B,{type:"number",value:ae.min_order,onChange:e=>se({...ae,min_order:e.target.value}),placeholder:"0",step:"0.01",min:"0"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Max Discount (for %)"}),(0,h.jsx)(B,{type:"number",value:ae.max_discount,onChange:e=>se({...ae,max_discount:e.target.value}),placeholder:"No limit",step:"0.01",min:"0",disabled:"percentage"!==ae.type})]})]}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Valid From"}),(0,h.jsx)(B,{type:"date",value:ae.valid_from,onChange:e=>se({...ae,valid_from:e.target.value})})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Valid Until"}),(0,h.jsx)(B,{type:"date",value:ae.valid_until,onChange:e=>se({...ae,valid_until:e.target.value})})]})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Usage Limit"}),(0,h.jsx)(B,{type:"number",value:ae.usage_limit,onChange:e=>se({...ae,usage_limit:e.target.value}),placeholder:"Unlimited",min:"1"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Target Audience"}),(0,h.jsxs)(U,{children:[(0,h.jsxs)(L,{children:[(0,h.jsx)("input",{type:"radio",name:"target_type",checked:"all"===ae.target_type,onChange:()=>se({...ae,target_type:"all",target_customer_ids:[],target_loyalty_tiers:[]})}),"All Customers"]}),(0,h.jsxs)(L,{children:[(0,h.jsx)("input",{type:"radio",name:"target_type",checked:"customers"===ae.target_type,onChange:()=>se({...ae,target_type:"customers",target_loyalty_tiers:[]})}),"Specific Customers"]}),(0,h.jsxs)(L,{children:[(0,h.jsx)("input",{type:"radio",name:"target_type",checked:"tiers"===ae.target_type,onChange:()=>se({...ae,target_type:"tiers",target_customer_ids:[]})}),"Membership Tiers"]})]}),"customers"===ae.target_type&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(P,{type:"text",placeholder:"Search customers by name or phone...",value:me,onChange:e=>ye(e.target.value)}),(0,h.jsxs)(V,{children:[_e?(0,h.jsx)(I,{children:"Loading customers..."}):he.filter(e=>e.name.toLowerCase().includes(me.toLowerCase())||e.phone.includes(me)).map(e=>{const t=ae.target_customer_ids.includes(e.id);return(0,h.jsxs)(I,{selected:t,onClick:()=>{const r=t?ae.target_customer_ids.filter(t=>t!==e.id):[...ae.target_customer_ids,e.id];se({...ae,target_customer_ids:r})},children:[(0,h.jsx)("input",{type:"checkbox",checked:t,readOnly:!0,style:{accentColor:"#635BFF"}}),(0,h.jsxs)(M,{children:[(0,h.jsx)(R,{children:e.name}),(0,h.jsxs)(Y,{children:[e.phone," \xb7 ",e.loyalty_tier]})]})]},e.id)}),!_e&&0===he.filter(e=>e.name.toLowerCase().includes(me.toLowerCase())||e.phone.includes(me)).length&&(0,h.jsx)(I,{children:"No customers found"})]}),(0,h.jsxs)(J,{children:[ae.target_customer_ids.length," customer",1!==ae.target_customer_ids.length?"s":""," selected"]})]}),"tiers"===ae.target_type&&(0,h.jsx)(O,{children:["Bronze","Silver","Gold","VIP"].map(e=>{const t=ae.target_loyalty_tiers.includes(e);return(0,h.jsxs)(N,{checked:t,children:[(0,h.jsx)("input",{type:"checkbox",checked:t,onChange:()=>{const r=t?ae.target_loyalty_tiers.filter(t=>t!==e):[...ae.target_loyalty_tiers,e];se({...ae,target_loyalty_tiers:r})}}),e]},e)})})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(E,{children:"Description"}),(0,h.jsx)(S,{value:ae.description,onChange:e=>se({...ae,description:e.target.value}),placeholder:"Optional description..."})]}),le&&(0,h.jsx)($,{children:le})]})]}),(0,h.jsx)(p.A,{isOpen:ce,title:"Delete Coupon",message:`Are you sure you want to delete coupon "${null===ue||void 0===ue?void 0:ue.code}"?`,onConfirm:async()=>{if(ue){pe(!1);try{const e=(0,x.c4)(),t=await fetch(`/api/coupons/${ue.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});(await t.json()).success&&je()}catch(e){console.error("Error deleting coupon:",e)}xe(null)}},onCancel:()=>{pe(!1),xe(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var n=r(7119),i=r(4752),o=r(9610),a=r(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=i.Ay.div`
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
`,x=e=>{let{isOpen:t,title:r,message:i,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:r}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}}}]);