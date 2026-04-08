"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2612],{2612:(e,n,r)=>{r.r(n),r.d(n,{default:()=>S});var t=r(9950),i=r(4752),a=r(2853),o=r(3705),s=r(8409),l=r(2488),d=r(1367),c=r(9610),p=r(4021),u=r(6038),x=r(7617),h=r(5030),g=r(4414);const y=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,b=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,m=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=i.Ay.div`
  margin: 12px 0;
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,F=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,w=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,k=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #4F46E5; }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover { background: #FEE2E2; }\n        ";default:return"\n          background: #F3F4F6;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,E=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,_=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,S=()=>{const{t:e}=(0,h.Bd)("inventory"),{user:n}=(0,d.As)(),{defaultCurrency:r,supportedCurrencies:i}=(0,p.i1)(),[S,$]=(0,t.useState)(""),[z,R]=(0,t.useState)([]),[I,D]=(0,t.useState)(!0),[M,T]=(0,t.useState)(""),[O,Y]=(0,t.useState)("all"),[Q,N]=(0,t.useState)(null),[U,Z]=(0,t.useState)(!1),[L,q]=(0,t.useState)({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}),[G,P]=(0,t.useState)(!1),[J,H]=(0,t.useState)(null),[W,K]=(0,t.useState)(null),[V,X]=(0,t.useState)(null);(0,t.useEffect)(()=>{r&&!S&&$(r)},[r,S]),(0,t.useEffect)(()=>{ee()},[n]);const ee=async()=>{try{D(!0);let e="";if("Brand General"===(null===n||void 0===n?void 0:n.role)||"Brand Manager"===(null===n||void 0===n?void 0:n.role)?n.brand_id&&(e=`/api/brands/${n.brand_id}/ingredients`):"Restaurant Admin"===(null===n||void 0===n?void 0:n.role)&&n.restaurant_id&&(e=`/api/restaurants/${n.restaurant_id}/ingredients`),!e)return void D(!1);const r=await fetch(e),t=await r.json();t.success&&R(t.data)}catch(e){console.error("Failed to fetch ingredients:",e)}finally{D(!1)}},ne=e=>{var n;(X(null),e)?(N(e),q({code:e.code||"",name:e.name,category:e.category,unit:e.unit,unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:(null===(n=e.min_stock)||void 0===n?void 0:n.toString())||"0"})):(N(null),q({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"}));Z(!0)},re=()=>{Z(!1),N(null),q({code:"",name:"",category:"",unit:"",unit_cost:"",supplier_name:"",min_stock:"0"})},te=z.filter(e=>{const n=e.name.toLowerCase().includes(M.toLowerCase()),r="all"===O||e.category===O;return n&&r}),ie=["all",...Array.from(new Set(z.map(e=>e.category)))],ae=z.filter(e=>e.is_active).length,oe=z.length>0?z.reduce((e,n)=>e+Number(n.unit_cost),0)/z.length:0;return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(s.mc,{children:[(0,g.jsxs)(s.Y9,{children:[(0,g.jsx)(s.hE,{children:"Ingredients"}),(0,g.jsx)(s.ex,{children:(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>ne(null),children:"New Ingredient"})})]}),(0,g.jsxs)(s.MD,{children:[(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Total Ingredients"}),(0,g.jsx)(s.Os,{children:z.length}),(0,g.jsxs)(s.d1,{children:[ae," active"]})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Average Cost"}),(0,g.jsx)(s.Os,{children:(0,u.vv)(oe,S||"MYR")}),(0,g.jsx)(s.d1,{children:"per unit"})]}),(0,g.jsxs)(s.hI,{children:[(0,g.jsx)(s.v0,{children:"Categories"}),(0,g.jsx)(s.Os,{children:ie.length-1}),(0,g.jsx)(s.d1,{children:"ingredient types"})]})]}),(0,g.jsxs)(l.Qn,{children:[(0,g.jsx)(l.DO,{type:"text",placeholder:"Search ingredients...",value:M,onChange:e=>T(e.target.value)}),(0,g.jsx)(l.Jt,{value:O,onChange:e=>Y(e.target.value),children:ie.map(e=>(0,g.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,g.jsx)(l.Jt,{value:S,onChange:e=>$(e.target.value),style:{minWidth:"140px"},children:i.map(e=>(0,g.jsxs)("option",{value:e,children:[(0,u.Qn)(e)," ",e]},e))})]}),(0,g.jsxs)(s.UC,{children:[W&&(0,g.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[W,(0,g.jsx)("button",{onClick:()=>K(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),I?(0,g.jsx)(a.pp,{children:(0,g.jsx)(_,{children:"Loading..."})}):0===te.length?(0,g.jsxs)(a.pp,{children:[(0,g.jsx)(_,{children:"No ingredients found"}),(0,g.jsx)(B,{children:M||"all"!==O?"Try adjusting your filters":"Create your first ingredient to get started"}),!M&&"all"===O&&(0,g.jsx)(o.cc,{variant:"primary",onClick:()=>ne(null),children:"Create First Ingredient"})]}):(0,g.jsx)(y,{children:te.map(e=>(0,g.jsxs)(v,{isActive:e.is_active,children:[(0,g.jsx)(b,{children:(0,g.jsxs)("div",{children:[(0,g.jsx)(m,{children:e.name}),(0,g.jsx)(f,{children:e.category})]})}),(0,g.jsxs)(j,{children:[(0,g.jsxs)(C,{children:[(0,g.jsx)(F,{children:"Unit Cost"}),(0,g.jsx)(w,{children:(0,u.vv)(e.unit_cost,S||"MYR")})]}),(0,g.jsxs)(C,{children:[(0,g.jsx)(F,{children:"Unit"}),(0,g.jsx)(w,{children:e.unit})]}),e.supplier_name&&(0,g.jsxs)(C,{children:[(0,g.jsx)(F,{children:"Supplier"}),(0,g.jsx)(w,{children:e.supplier_name})]}),e.code&&(0,g.jsxs)(C,{children:[(0,g.jsx)(F,{children:"Code"}),(0,g.jsx)(w,{children:e.code})]})]}),(0,g.jsxs)(A,{children:[(0,g.jsx)(k,{variant:"secondary",onClick:()=>ne(e),children:"Edit"}),(0,g.jsx)(k,{variant:"danger",onClick:()=>{return n=e.id,K(null),H(n),void P(!0);var n},children:"Delete"})]})]},e.id))})]})]}),(0,g.jsx)(c.aF,{isOpen:U,onClose:re,title:Q?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),X(null),L.name&&L.category&&L.unit&&L.unit_cost)try{let e="";const r=Q?"PUT":"POST";"Brand General"===(null===n||void 0===n?void 0:n.role)||"Brand Manager"===(null===n||void 0===n?void 0:n.role)?e=Q?`/api/brands/${n.brand_id}/ingredients/${Q.id}`:`/api/brands/${n.brand_id}/ingredients`:"Restaurant Admin"===(null===n||void 0===n?void 0:n.role)&&(e=Q?`/api/restaurants/${n.restaurant_id}/ingredients/${Q.id}`:`/api/restaurants/${n.restaurant_id}/ingredients`);const t=await fetch(e,{method:r,headers:{"Content-Type":"application/json"},body:JSON.stringify({...L,unit_cost:parseFloat(L.unit_cost),min_stock:parseInt(L.min_stock)||0})}),i=await t.json();i.success?(re(),ee()):X(i.error||"Failed to save ingredient")}catch(r){console.error("Failed to save ingredient:",r),X("Failed to save ingredient")}else X("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Ingredient Name *"}),(0,g.jsx)(c.ZQ,{type:"text",value:L.name,onChange:e=>q({...L,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Code"}),(0,g.jsx)(c.ZQ,{type:"text",value:L.code,onChange:e=>q({...L,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Category *"}),(0,g.jsx)(c.ZQ,{type:"text",value:L.category,onChange:e=>q({...L,category:e.target.value}),placeholder:"e.g., Grains",required:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Supplier"}),(0,g.jsx)(c.ZQ,{type:"text",value:L.supplier_name,onChange:e=>q({...L,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,g.jsxs)(c.fh,{children:[(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Unit *"}),(0,g.jsx)(c.ZQ,{type:"text",value:L.unit,onChange:e=>q({...L,unit:e.target.value}),placeholder:"kg, g, L, ml",required:!0})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsxs)(c.lR,{children:["Unit Cost (",(0,u.Qn)(S||"MYR"),") *"]}),(0,g.jsx)(c.ZQ,{type:"number",step:"0.01",value:L.unit_cost,onChange:e=>q({...L,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]})]}),(0,g.jsxs)(c.gE,{children:[(0,g.jsx)(c.lR,{children:"Minimum Stock"}),(0,g.jsx)(c.ZQ,{type:"number",value:L.min_stock,onChange:e=>q({...L,min_stock:e.target.value}),placeholder:"0"})]}),V&&(0,g.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:V}),(0,g.jsxs)(E,{children:[(0,g.jsx)(c.yl,{type:"button",variant:"secondary",onClick:re,children:"Cancel"}),(0,g.jsx)(c.yl,{type:"submit",variant:"primary",children:Q?"Update Ingredient":"Create Ingredient"})]})]})}),(0,g.jsx)(x.A,{isOpen:G,title:"Delete Ingredient",message:"Are you sure you want to delete this ingredient?",onConfirm:async()=>{if(J){P(!1);try{let e="";"Brand General"===(null===n||void 0===n?void 0:n.role)||"Brand Manager"===(null===n||void 0===n?void 0:n.role)?e=`/api/brands/${null===n||void 0===n?void 0:n.brand_id}/ingredients/${J}`:"Restaurant Admin"===(null===n||void 0===n?void 0:n.role)&&(e=`/api/restaurants/${null===n||void 0===n?void 0:n.restaurant_id}/ingredients/${J}`);const r=localStorage.getItem("auth_token"),t=await fetch(e,{method:"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}});(await t.json()).success&&ee()}catch(e){console.error("Failed to delete ingredient:",e),K("Failed to delete ingredient")}finally{H(null)}}},onCancel:()=>{P(!1),H(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),i=r(1367),a=r(6038);const o=()=>{const{user:e}=(0,i.As)(),[n,r]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(a.DL)),[s,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=t>=0?n[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";r(t)}else r("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:s,error:d}}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var t=r(7119),i=r(4752),a=r(9610),o=r(4414);const s=i.Ay.div`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:y="Cancel",type:v="warning"}=e;return n?t.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(c,{children:i})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:h,children:y}),(0,o.jsx)(u,{variant:"primary",type:v,onClick:x,children:g})]})]})}),document.body):null}}}]);