"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1176],{1176:(e,t,i)=>{i.r(t),i.d(t,{default:()=>we});var r=i(9950),n=i(4752),o=i(8409),s=i(2597),a=i(2653),d=i(2853),l=i(3705),c=i(2488),p=i(9610),u=i(4877),x=i(7617),h=i(5030),g=i(4414);const m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,y=n.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${e=>e.isHighlighted?"#635BFF":"#E6EBF1"};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: ${e=>e.isHighlighted?"0 0 0 2px rgba(99, 91, 255, 0.3)":"none"};

  &:hover {
    box-shadow: ${e=>e.isHighlighted?"0 0 0 2px rgba(99, 91, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.08)":"0 4px 12px rgba(0, 0, 0, 0.08)"};
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,j=n.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,f=n.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,b=n.Ay.div`
  flex: 1;
  min-width: 0;
`,v=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,_=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,C=n.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,F=n.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,k=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,w=n.Ay.span`
  color: #6B7280;
`,A=n.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,E=n.Ay.div`
  flex: 1;
  min-height: 12px;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,S=n.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  background: ${e=>"danger"===e.variant?"#FEF2F2":"#F9FAFB"};
  color: ${e=>"danger"===e.variant?"#DC2626":"#374151"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>"danger"===e.variant?"#FEE2E2":"#F3F4F6"};
    border-color: ${e=>"danger"===e.variant?"#FECACA":"#D1D5DB"};
  }
`,z=n.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F9FAFB;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F3F4F6; border-color: #D1D5DB; }
`,$=n.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  }
`,D=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,I=n.Ay.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`,R=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,T=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,q=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`,P=n.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,L=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,O=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #FEF3C7;
  color: #D97706;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,N=n.Ay.div`
  margin-top: 24px;
`,M=n.Ay.div`
  display: grid;
  gap: 12px;
`,U=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,W=n.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Y=n.Ay.div`
  flex: 1;
`,H=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,G=n.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Z=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Q=n.Ay.div`
  display: flex;
  gap: 8px;
`,J=n.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,K=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,V=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,X=n.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,ee=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 20px 0 12px 0;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,te=n.Ay.div`
  display: grid;
  gap: 16px;
`,ie=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,re=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,ne=n.Ay.div`
  flex: 1;
`,oe=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,se=n.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,ae=n.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,de=n.Ay.div`
  display: flex;
  gap: 8px;
`,le=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,ce=n.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,pe=n.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,ue=n.Ay.div`
  margin-bottom: 20px;
`,xe=n.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,he=n.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,ge=n.Ay.div`
  display: flex;
  gap: 16px;
`,me=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,ye=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,je=n.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FECACA;
  }
`,fe=n.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover { background: #DC2626; }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover { background: #F9FAFB; }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #5246ED; }\n        "}}}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,be=["KRW","JPY","VND","IDR","TWD"],ve=(e,t)=>be.includes(t)?Math.round(e).toLocaleString("en-US"):e.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),_e=()=>localStorage.getItem("auth_token"),Ce=e=>{let{onCountChange:t,categoryRefreshKey:i,optionRefreshKey:n}=e;const[o,s]=(0,r.useState)([]),[a,h]=(0,r.useState)([]),[N,M]=(0,r.useState)([]),[U,W]=(0,r.useState)([]),[Y,H]=(0,r.useState)([]),[G,Z]=(0,r.useState)("MYR"),[Q,J]=(0,r.useState)(""),[K,V]=(0,r.useState)(!0),[X,te]=(0,r.useState)(""),[ie,re]=(0,r.useState)("all"),[ne,oe]=(0,r.useState)(!1),[se,ae]=(0,r.useState)(null),[de,le]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(null),[ue,xe]=(0,r.useState)({name:"",description:"",sku:"",category_id:"",image_url:"",emoji:"",is_active:!0,is_set:!1,set_group:"",set_tier:"",set_use_case:"",set_setup_items:"",is_recommended:!1,set_items:[],addons:[],prices:{},shipping_countries:[],option_group_ids:[]}),[he,ge]=(0,r.useState)(""),[me,ye]=(0,r.useState)(""),[je,fe]=(0,r.useState)(null),[Ce,Fe]=(0,r.useState)(!1),[ke,we]=(0,r.useState)(null),Ae=(0,r.useCallback)(async()=>{try{const e=_e(),i=await fetch("/api/system-products",{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&(s(r.data),t(r.data.length))}catch(e){console.error("Failed to fetch system products:",e)}},[t]),Ee=(0,r.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/system-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&h(i.data)}catch(e){console.error("Failed to fetch categories:",e)}},[]),Be=(0,r.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/currencies/supported",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&M(i.data||[])}catch(e){console.error("Failed to fetch currencies:",e)}},[]),Se=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/currencies/default"),t=await e.json();t.success&&(Z(t.defaultCurrency||"MYR"),J(t.defaultCurrency||"MYR"))}catch(e){console.error("Failed to fetch default currency:",e)}},[]),ze=(0,r.useCallback)(async()=>{try{const e=await fetch("/api/currencies/countries/supported"),t=await e.json();t.success&&W(t.data||[])}catch(e){console.error("Failed to fetch countries:",e)}},[]),$e=(0,r.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/system-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&H(i.data||[])}catch(e){console.error("Failed to fetch option groups:",e)}},[]);(0,r.useEffect)(()=>{(async()=>{V(!0),await Promise.all([Ae(),Ee(),Be(),Se(),ze(),$e()]),V(!1)})()},[Ae,Ee,Be,Se,ze,$e]),(0,r.useEffect)(()=>{i>0&&Ee()},[i,Ee]),(0,r.useEffect)(()=>{n>0&&$e()},[n,$e]);const De=(e,t)=>{if(!e.prices||0===e.prices.length)return"N/A";const i=t||Q||G,r=e.prices.find(e=>e.currency===i&&e.is_active);if(r)return`${i} ${ve(Number(r.price),i)}`;const n=e.prices.find(e=>e.is_active);if(n)return`${n.currency} ${ve(Number(n.price),n.currency)}`;const o=e.prices[0];return`${o.currency} ${ve(Number(o.price),o.currency)}`},Ie=e=>{const t={};return e.forEach(e=>{t[e.currency]={price:e.price.toString(),is_active:e.is_active}}),t},Re=e=>{if(e){var t,i;ae(e),xe({name:e.name,description:e.description||"",sku:e.sku||"",category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",emoji:e.emoji||"",is_active:e.is_active,is_set:e.is_set||!1,set_group:e.set_group||"",set_tier:e.set_tier||"",set_use_case:e.set_use_case||"",set_setup_items:(e.set_setup_items||[]).join("\n"),is_recommended:e.is_recommended||!1,set_items:e.set_items||[],addons:(e.addons||[]).map(e=>{var t;return{productId:e.addon_product_id||e.productId,name:(null===(t=e.addonProduct)||void 0===t?void 0:t.name)||e.name||"",addon_label:e.addon_label||"",max_quantity:e.max_quantity||1,is_inquiry_only:e.is_inquiry_only||!1}}),prices:Ie(e.prices||[]),shipping_countries:e.shipping_countries||[],option_group_ids:(null===(i=e.optionGroups)||void 0===i?void 0:i.map(e=>e.id))||[]})}else{ae(null);const e={name:"",description:"",sku:"",category_id:"",image_url:"",emoji:"",is_active:!0,is_set:!1,set_group:"",set_tier:"",set_use_case:"",set_setup_items:"",is_recommended:!1,set_items:[],addons:[],prices:{},shipping_countries:[],option_group_ids:[]};a.length>0&&(e.category_id=a[0].id.toString()),xe(e)}ge(""),ye(""),fe(null),oe(!0)},Te=()=>{oe(!1),ae(null),fe(null)},qe=(e,t)=>{xe(i=>({...i,set_items:i.set_items.map(i=>i.productId===e?{...i,quantity:Math.max(1,i.quantity+t)}:i)}))},Pe=(e,t,i)=>{xe(r=>({...r,addons:r.addons.map(r=>r.productId===e?{...r,[t]:i}:r)}))},Le=(e,t,i)=>{xe(r=>({...r,prices:{...r.prices,[e]:{...r.prices[e]||{price:"",is_active:!0},[t]:i}}}))},Oe=o.filter(e=>{var t;const i=e.name.toLowerCase().includes(X.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(X.toLowerCase()),r="all"===ie||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===ie;return i&&r});return K?(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,g.jsxs)(c.Qn,{style:{marginBottom:0},children:[(0,g.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:X,onChange:e=>te(e.target.value)}),(0,g.jsxs)(c.Jt,{value:ie,onChange:e=>re(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Categories"}),a.map(e=>(0,g.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),N.length>1&&(0,g.jsx)(c.Jt,{value:Q,onChange:e=>J(e.target.value),children:N.map(e=>(0,g.jsxs)("option",{value:e.code,children:[e.code," (",e.symbol,")"]},e.code))})]}),(0,g.jsx)(l.cc,{onClick:()=>Re(),style:{flexShrink:0},children:"Add Product"})]}),0===Oe.length?(0,g.jsxs)(d.pp,{children:[(0,g.jsx)(P,{children:X||"all"!==ie?"No products found":"No products yet"}),(0,g.jsx)(L,{children:X||"all"!==ie?"Try adjusting your search or filter criteria.":"Start by adding your first system product."}),!X&&"all"===ie&&(0,g.jsx)(l.cc,{onClick:()=>Re(),children:"Add Product"})]}):(0,g.jsx)(m,{children:Oe.map(e=>(0,g.jsxs)(y,{isActive:e.is_active,isHighlighted:ke===e.id,onClick:()=>Re(e),children:[(0,g.jsxs)(j,{children:[(0,g.jsx)(f,{src:e.image_url,children:!e.image_url&&(e.emoji||"\ud83d\udce6")}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(v,{children:[e.name,e.is_set&&(0,g.jsx)(D,{children:"SET"}),e.is_recommended&&(0,g.jsx)(O,{children:"Recommended"})]}),e.sku&&(0,g.jsxs)(_,{children:["SKU: ",e.sku]}),e.category&&(0,g.jsxs)(C,{children:[e.category.emoji," ",e.category.name]}),e.is_set&&e.set_items&&e.set_items.length>0&&(0,g.jsxs)(I,{children:["Set: ",e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(k,{children:[(0,g.jsx)(w,{children:"Price"}),(0,g.jsx)(A,{children:De(e)})]}),e.is_set&&e.set_group&&(0,g.jsxs)(k,{children:[(0,g.jsx)(w,{children:"Group"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.set_group})]}),e.is_set&&e.set_tier&&(0,g.jsxs)(k,{children:[(0,g.jsx)(w,{children:"Tier"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.set_tier})]}),e.shipping_countries&&e.shipping_countries.length>0&&(0,g.jsxs)(k,{children:[(0,g.jsx)(w,{children:"Ships to"}),(0,g.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.shipping_countries.join(", ")})]})]}),(0,g.jsx)(E,{}),(0,g.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(S,{onClick:()=>Re(e),children:"Edit"}),(0,g.jsx)(z,{onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=_e(),i=await fetch(`/api/system-products/${e.id}/copy`,{method:"POST",headers:{Authorization:`Bearer ${t}`}}),r=await i.json();r.success?(await Ae(),r.data&&r.data.id&&(we(r.data.id),setTimeout(()=>we(null),3e3))):alert(r.message||r.error||"Failed to copy product")}catch(i){console.error("Failed to copy product:",i)}})(e,t),children:"Copy"}),(0,g.jsx)($,{isActive:e.is_active,onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=_e(),i=await fetch(`/api/system-products/${e.id}/toggle-active`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&Ae()}catch(i){console.error("Failed to toggle product:",i)}})(e,t),children:e.is_active?"Active":"Inactive"}),(0,g.jsx)(S,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),pe(e),le(!0)})(e,t),children:"Delete"})]})]},e.id))}),ne&&(0,g.jsx)(p.aF,{isOpen:ne,onClose:Te,title:se?"Edit System Product":"Add System Product",maxWidth:"750px",children:(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!Ce)if(fe(null),ue.name.trim()){Fe(!0);try{const e=_e(),t=se?"PUT":"POST",i=se?`/api/system-products/${se.id}`:"/api/system-products",r=[];Object.entries(ue.prices).forEach(e=>{let[t,i]=e;const n=parseFloat(i.price);!isNaN(n)&&n>=0&&r.push({currency:t,price:n,is_active:i.is_active})});const n=ue.set_setup_items.split("\n").map(e=>e.trim()).filter(e=>e.length>0),o=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:ue.name.trim(),description:ue.description.trim()||null,sku:ue.sku.trim()||null,category_id:ue.category_id?parseInt(ue.category_id):null,image_url:ue.image_url||null,emoji:ue.emoji||null,is_active:ue.is_active,is_set:ue.is_set,set_group:ue.is_set&&ue.set_group||null,set_tier:ue.is_set&&ue.set_tier||null,set_use_case:ue.is_set&&ue.set_use_case.trim()||null,set_setup_items:ue.is_set&&n.length>0?n:null,is_recommended:!!ue.is_set&&ue.is_recommended,set_items:ue.is_set?ue.set_items:null,addons:ue.is_set?ue.addons.map(e=>({addon_product_id:e.productId,addon_label:e.addon_label,max_quantity:e.max_quantity,is_inquiry_only:e.is_inquiry_only})):null,prices:r,shipping_countries:ue.shipping_countries.length>0?ue.shipping_countries:null,option_group_ids:ue.is_set?[]:ue.option_group_ids})}),s=await o.json();s.success?(Te(),Ae()):fe(s.message||s.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),fe("Failed to save product. Please try again.")}finally{Fe(!1)}}else fe("Product name is required")},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:ue.name,onChange:e=>xe({...ue,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"SKU"}),(0,g.jsx)(p.ZQ,{type:"text",value:ue.sku,onChange:e=>xe({...ue,sku:e.target.value}),placeholder:"Auto-generated if empty"})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Category"}),(0,g.jsxs)(p.FX,{value:ue.category_id,onChange:e=>xe({...ue,category_id:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"No category"}),a.map(e=>(0,g.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:ue.description,onChange:e=>xe({...ue,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Product Image"}),(0,g.jsx)(u.A,{value:ue.image_url,onChange:e=>xe({...ue,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,g.jsx)(ee,{children:"Pricing"}),N.length>0?(0,g.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"12px"},children:N.map(e=>{const t=ue.prices[e.code]||{price:"",is_active:!0},i=be.includes(e.code);return(0,g.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,g.jsxs)("span",{style:{fontWeight:600,fontSize:"13px",color:"#0A2540"},children:[e.code," (",e.symbol,")"]}),(0,g.jsxs)(R,{children:[(0,g.jsx)("input",{type:"checkbox",checked:t.is_active,onChange:t=>Le(e.code,"is_active",t.target.checked)}),"Active"]})]}),(0,g.jsx)(p.ZQ,{type:"number",step:i?"1":"0.01",min:"0",value:t.price,onChange:t=>Le(e.code,"price",t.target.value),placeholder:i?"0":"0.00"})]},e.code)})}):(0,g.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No supported currencies found. Configure currencies first."}),(0,g.jsx)(ee,{children:"Set Configuration"}),(0,g.jsx)(p.gE,{children:(0,g.jsxs)(R,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.is_set,onChange:e=>xe({...ue,is_set:e.target.checked,set_items:e.target.checked?ue.set_items:[],addons:e.target.checked?ue.addons:[],option_group_ids:e.target.checked?[]:ue.option_group_ids})}),"Set Product (bundle multiple products)"]})}),ue.is_set&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Group"}),(0,g.jsxs)(p.FX,{value:ue.set_group,onChange:e=>xe({...ue,set_group:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"Select group"}),(0,g.jsx)("option",{value:"tablet",children:"Tablet"}),(0,g.jsx)("option",{value:"monitor",children:"Monitor"}),(0,g.jsx)("option",{value:"custom",children:"Custom"})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Tier"}),(0,g.jsxs)(p.FX,{value:ue.set_tier,onChange:e=>xe({...ue,set_tier:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"Select tier"}),(0,g.jsx)("option",{value:"standard",children:"Standard"}),(0,g.jsx)("option",{value:"hybrid",children:"Hybrid"}),(0,g.jsx)("option",{value:"premium",children:"Premium"}),(0,g.jsx)("option",{value:"custom",children:"Custom"})]})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Use Case"}),(0,g.jsx)(p.ZQ,{type:"text",value:ue.set_use_case,onChange:e=>xe({...ue,set_use_case:e.target.value}),placeholder:"e.g., Small cafe, Food truck, Full restaurant"})]}),(0,g.jsx)(p.gE,{children:(0,g.jsxs)(R,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.is_recommended,onChange:e=>xe({...ue,is_recommended:e.target.checked})}),"Recommended Set"]})}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Setup Items (one per line)"}),(0,g.jsx)(p.Lz,{value:ue.set_setup_items,onChange:e=>xe({...ue,set_setup_items:e.target.value}),placeholder:"POS app installation\nMenu setup\nStaff training",rows:3})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Set Items"}),ue.set_items.length>0&&(0,g.jsx)("div",{style:{marginBottom:"12px"},children:ue.set_items.map(e=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px"},children:[(0,g.jsx)("span",{style:{flex:1,fontSize:"14px"},children:e.name}),(0,g.jsx)("input",{type:"text",placeholder:"Role label",value:e.role_label,onChange:t=>{return i=e.productId,r=t.target.value,void xe(e=>({...e,set_items:e.set_items.map(e=>e.productId===i?{...e,role_label:r}:e)}));var i,r},style:{width:"120px",padding:"4px 8px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}}),(0,g.jsx)("button",{type:"button",onClick:()=>qe(e.productId,-1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"-"}),(0,g.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:e.quantity}),(0,g.jsx)("button",{type:"button",onClick:()=>qe(e.productId,1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"+"}),(0,g.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void xe(e=>({...e,set_items:e.set_items.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,g.jsx)(p.ZQ,{type:"text",placeholder:"Search products to add...",value:he,onChange:e=>ge(e.target.value),style:{marginBottom:"8px"}}),(0,g.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:o.filter(e=>!e.is_set&&(!se||e.id!==se.id)).filter(e=>!he||e.name.toLowerCase().includes(he.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(he.toLowerCase())).map(e=>(0,g.jsxs)("div",{onClick:()=>(e=>{const t=o.find(t=>t.id===e);if(!t||t.is_set)return;const i=ue.set_items.find(t=>t.productId===e);xe(i?t=>({...t,set_items:t.set_items.map(t=>t.productId===e?{...t,quantity:t.quantity+1}:t)}):i=>({...i,set_items:[...i.set_items,{productId:e,name:t.name,quantity:1,role_label:""}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:ue.set_items.some(t=>t.productId===e.id)?"#EEF2FF":"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,g.jsx)("span",{style:{color:"#6B7280"},children:De(e)})]},e.id))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Addons"}),ue.addons.length>0&&(0,g.jsx)("div",{style:{marginBottom:"12px"},children:ue.addons.map(e=>(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px",flexWrap:"wrap"},children:[(0,g.jsx)("span",{style:{flex:1,fontSize:"14px",minWidth:"120px"},children:e.name}),(0,g.jsx)("input",{type:"text",placeholder:"Addon label",value:e.addon_label,onChange:t=>Pe(e.productId,"addon_label",t.target.value),style:{width:"120px",padding:"4px 8px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}}),(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,g.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"Max:"}),(0,g.jsx)("input",{type:"number",min:"1",value:e.max_quantity,onChange:t=>Pe(e.productId,"max_quantity",parseInt(t.target.value)||1),style:{width:"50px",padding:"4px 6px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}})]}),(0,g.jsxs)(R,{style:{fontSize:"12px"},children:[(0,g.jsx)("input",{type:"checkbox",checked:e.is_inquiry_only,onChange:t=>Pe(e.productId,"is_inquiry_only",t.target.checked)}),"Inquiry only"]}),(0,g.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void xe(e=>({...e,addons:e.addons.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,g.jsx)(p.ZQ,{type:"text",placeholder:"Search products to add as addon...",value:me,onChange:e=>ye(e.target.value),style:{marginBottom:"8px"}}),(0,g.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:o.filter(e=>!e.is_set&&(!se||e.id!==se.id)).filter(e=>!me||e.name.toLowerCase().includes(me.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(me.toLowerCase())).filter(e=>!ue.addons.some(t=>t.productId===e.id)).map(e=>(0,g.jsxs)("div",{onClick:()=>(e=>{const t=o.find(t=>t.id===e);if(!t)return;ue.addons.find(t=>t.productId===e)||xe(i=>({...i,addons:[...i.addons,{productId:e,name:t.name,addon_label:"",max_quantity:1,is_inquiry_only:!1}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,g.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,g.jsx)("span",{style:{color:"#6B7280"},children:De(e)})]},e.id))})]})]}),!ue.is_set&&Y.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(ee,{children:"Option Groups"}),(0,g.jsx)(p.gE,{children:(0,g.jsx)(T,{children:Y.map(e=>{var t;return(0,g.jsxs)(q,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.option_group_ids.includes(e.id),onChange:()=>{return t=e.id,void xe(e=>({...e,option_group_ids:e.option_group_ids.includes(t)?e.option_group_ids.filter(e=>e!==t):[...e.option_group_ids,t]}));var t}}),(0,g.jsxs)("span",{children:[e.name," (",(null===(t=e.options)||void 0===t?void 0:t.length)||0," options)"]})]},e.id)})})})]}),(0,g.jsx)(ee,{children:"Shipping"}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Available Countries"}),U.length>0?(0,g.jsx)(T,{children:U.map(e=>(0,g.jsxs)(q,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.shipping_countries.includes(e.code),onChange:()=>{return t=e.code,void xe(e=>{const i=e.shipping_countries.includes(t)?e.shipping_countries.filter(e=>e!==t):[...e.shipping_countries,t];return{...e,shipping_countries:i}});var t}}),(0,g.jsxs)("span",{children:[e.flag," ",e.name," (",e.currency,")"]})]},e.code))}):(0,g.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No supported countries configured. Set up countries in System Settings first."})]}),(0,g.jsx)(p.gE,{style:{marginBottom:0,marginTop:"16px"},children:(0,g.jsxs)(R,{children:[(0,g.jsx)("input",{type:"checkbox",checked:ue.is_active,onChange:e=>xe({...ue,is_active:e.target.checked})}),"Active"]})}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(p.yl,{type:"button",onClick:Te,disabled:Ce,children:"Cancel"}),(0,g.jsx)(p.yl,{type:"submit",variant:"primary",disabled:Ce,children:Ce?"Saving...":se?"Update":"Create"})]}),je&&(0,g.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:je})]})}),(0,g.jsx)(x.A,{isOpen:de,onCancel:()=>{le(!1),pe(null)},onConfirm:async()=>{if(ce)try{const e=_e(),t=await fetch(`/api/system-products/${ce.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(le(!1),pe(null),Ae()):alert(i.message||i.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===ce||void 0===ce?void 0:ce.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},Fe=e=>{let{onCountChange:t,onCategoryChange:i}=e;const[n,s]=(0,r.useState)([]),[a,c]=(0,r.useState)(!0),[u,h]=(0,r.useState)(!1),[m,y]=(0,r.useState)(null),[j,f]=(0,r.useState)(!1),[b,v]=(0,r.useState)(null),[_,C]=(0,r.useState)({name:"",emoji:"",description:""}),F=(0,r.useCallback)(async()=>{try{const e=_e(),i=await fetch("/api/system-product-categories",{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&(s(r.data),t(r.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{c(!1)}},[t]);(0,r.useEffect)(()=>{c(!0),F()},[F]);const k=e=>{e?(y(e),C({name:e.name,emoji:e.emoji||"",description:e.description||""})):(y(null),C({name:"",emoji:"",description:""})),h(!0)},w=()=>{h(!1),y(null),C({name:"",emoji:"",description:""})},A=async(e,t)=>{try{const i=_e(),r=await fetch(`/api/system-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({direction:t})}),n=await r.json();n.success?F():alert(n.message||n.error||"Failed to reorder")}catch(i){console.error("Failed to reorder category:",i)}};return a?(0,g.jsx)(N,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,g.jsxs)(N,{children:[(0,g.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"16px"},children:(0,g.jsx)(l.cc,{onClick:()=>k(),children:"Add Category"})}),0===n.length?(0,g.jsxs)(d.pp,{children:[(0,g.jsx)(P,{children:"No categories yet"}),(0,g.jsx)(L,{children:"Create your first product category to organize your system products."}),(0,g.jsx)(l.cc,{onClick:()=>k(),children:"Add Category"})]}):(0,g.jsx)(M,{children:n.map((e,t)=>(0,g.jsxs)(U,{isActive:e.is_active,children:[(0,g.jsx)(o.Xd,{onMoveUp:()=>A(e.id,"up"),onMoveDown:()=>A(e.id,"down"),disableUp:0===t,disableDown:t===n.length-1}),(0,g.jsx)(W,{children:e.emoji||"\ud83d\udce6"}),(0,g.jsxs)(Y,{children:[(0,g.jsx)(H,{children:e.name}),(0,g.jsxs)(G,{children:[(0,g.jsxs)("span",{children:[e.product_count||0," products"]}),(0,g.jsx)(K,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,g.jsx)(Z,{children:e.description})]}),(0,g.jsxs)(Q,{children:[(0,g.jsx)(J,{onClick:()=>k(e),title:"Edit",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,g.jsx)(J,{onClick:()=>(e=>{v(e),f(!0)})(e),title:"Delete",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,g.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,g.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,g.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),u&&(0,g.jsx)(p.aF,{isOpen:u,onClose:w,title:m?"Edit Category":"Add Category",children:(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),_.name.trim())try{const e=_e(),t=m?"PUT":"POST",r=m?`/api/system-product-categories/${m.id}`:"/api/system-product-categories",n=await fetch(r,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})}),o=await n.json();o.success?(w(),F(),null===i||void 0===i||i()):alert(o.message||o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:_.name,onChange:e=>C({..._,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Emoji"}),(0,g.jsx)(V,{children:["\ud83d\udce6","\ud83d\udcbb","\ud83d\udda8\ufe0f","\ud83d\udcf1","\ud83d\udda5\ufe0f","\u2328\ufe0f","\ud83d\uddb1\ufe0f","\ud83d\udd0c","\ud83d\udd0b","\ud83d\udcf7","\ud83c\udfa7","\ud83d\udd0a","\ud83d\udcfa","\ud83d\udcbd","\ud83d\udcbe","\ud83d\udcbf","\ud83d\udcc0","\ud83e\uddee","\ud83d\udcde","\ud83d\udcdf","\ud83d\udce0","\ud83d\udce1","\ud83d\udd27","\ud83d\udd29","\u2699\ufe0f","\ud83d\udee0\ufe0f","\ud83d\udddc\ufe0f","\ud83c\udf10","\ud83d\udd17","\ud83d\udcc8","\ud83d\udcca","\ud83d\udcc1","\ud83d\udcc2","\ud83d\udcc4","\ud83d\udccb","\ud83d\udccc","\ud83d\udcce","\ud83d\udccf","\ud83d\udcd0","\u2702\ufe0f","\ud83d\udcb3","\ud83c\udff7\ufe0f","\ud83d\uded2","\ud83d\udef5","\ud83d\ude9a","\ud83c\udfe2","\ud83c\udfed","\ud83c\udfea","\u26a1","\ud83d\udd0d"].map(e=>(0,g.jsx)(X,{type:"button",selected:_.emoji===e,onClick:()=>C({..._,emoji:e}),children:e},e))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:_.description,onChange:e=>C({..._,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(p.yl,{type:"button",onClick:w,children:"Cancel"}),(0,g.jsx)(p.yl,{type:"submit",variant:"primary",children:m?"Update":"Create"})]})]})}),(0,g.jsx)(x.A,{isOpen:j,onCancel:()=>{f(!1),v(null)},onConfirm:async()=>{if(b)try{const e=_e(),t=await fetch(`/api/system-product-categories/${b.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?(f(!1),v(null),F(),null===i||void 0===i||i()):alert(r.message||r.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===b||void 0===b?void 0:b.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},ke=e=>{let{onCountChange:t,onOptionChange:i}=e;const[n,o]=(0,r.useState)([]),[s,a]=(0,r.useState)(!0),[u,x]=(0,r.useState)(""),[h,m]=(0,r.useState)(!1),[y,j]=(0,r.useState)(!1),[f,b]=(0,r.useState)(null),[v,_]=(0,r.useState)(null),[C,F]=(0,r.useState)({name:"",is_required:!1,options:[]}),[k,w]=(0,r.useState)({name:"",price_adjustment:0}),A=(0,r.useCallback)(async()=>{try{const e=_e(),i=await fetch("/api/system-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&(o(e.data),t(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{a(!1)}},[t]);(0,r.useEffect)(()=>{A()},[A]);const E=e=>{e?(b(e),F({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(b(null),F({name:"",is_required:!1,options:[]})),m(!0)},B=()=>{m(!1),b(null),F({name:"",is_required:!1,options:[]}),w({name:"",price_adjustment:0})},S=n.filter(e=>e.name.toLowerCase().includes(u.toLowerCase()));return s?(0,g.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px",marginTop:"24px"},children:[(0,g.jsx)(c.Qn,{style:{marginBottom:0},children:(0,g.jsx)(c.DO,{type:"text",placeholder:"Search option groups...",value:u,onChange:e=>x(e.target.value)})}),(0,g.jsx)(l.cc,{onClick:()=>E(),style:{flexShrink:0},children:"Add Option Group"})]}),0===S.length?(0,g.jsxs)(d.pp,{children:[(0,g.jsx)(P,{children:"No option groups yet"}),(0,g.jsx)(L,{children:"Create option groups to add customizable options to your system products"}),(0,g.jsx)(l.cc,{onClick:()=>E(),children:"Add Option Group"})]}):(0,g.jsx)(te,{children:S.map(e=>(0,g.jsxs)(ie,{children:[(0,g.jsxs)(re,{children:[(0,g.jsxs)(ne,{children:[(0,g.jsx)(oe,{children:e.name}),(0,g.jsxs)(se,{children:[(0,g.jsx)(ae,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,g.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,g.jsxs)(de,{children:[(0,g.jsx)(J,{onClick:()=>E(e),title:"Edit",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,g.jsx)(J,{onClick:()=>{return t=e.id,_(t),void j(!0);var t},title:"Delete",children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,g.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,g.jsx)(le,{children:e.options.map((e,t)=>(0,g.jsxs)(ce,{children:[e.name,0!==Number(e.price_adjustment)&&(0,g.jsxs)(pe,{children:[Number(e.price_adjustment)>0?"+":"",Number(e.price_adjustment).toFixed(2)]})]},t))})]},e.id))}),(0,g.jsxs)(p.aF,{isOpen:h,onClose:B,title:f?"Edit Option Group":"New Option Group",children:[(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:"Group Name"}),(0,g.jsx)(he,{type:"text",value:C.name,onChange:e=>F({...C,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,g.jsx)(ue,{children:(0,g.jsx)(ge,{children:(0,g.jsxs)(me,{children:[(0,g.jsx)("input",{type:"checkbox",checked:C.is_required,onChange:e=>F({...C,is_required:e.target.checked})}),"Required Selection"]})})}),(0,g.jsxs)(ue,{children:[(0,g.jsx)(xe,{children:"Options"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,g.jsx)(he,{type:"text",value:k.name,onChange:e=>w({...k,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,g.jsx)(he,{type:"number",value:k.price_adjustment,onChange:e=>w({...k,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,g.jsx)(fe,{type:"button",variant:"secondary",onClick:()=>{if(!k.name.trim())return;const e=isNaN(k.price_adjustment)?0:k.price_adjustment;F(t=>({...t,options:[...t.options,{name:k.name.trim(),price_adjustment:e}]})),w({name:"",price_adjustment:0})},disabled:!k.name.trim(),children:"Add"})]}),C.options.map((e,t)=>(0,g.jsxs)(ye,{children:[(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsx)("strong",{children:e.name}),0!==Number(e.price_adjustment)&&(0,g.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"",Number(e.price_adjustment).toFixed(2),")"]})]}),(0,g.jsx)(je,{onClick:()=>{return e=t,void F(t=>({...t,options:t.options.filter((t,i)=>i!==e)}));var e},children:"x"})]},t))]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(fe,{type:"button",variant:"secondary",onClick:B,children:"Cancel"}),(0,g.jsx)(fe,{type:"button",onClick:async()=>{if(C.name.trim()&&0!==C.options.length)try{const e=_e(),t=f?`/api/system-product-option-groups/${f.id}`:"/api/system-product-option-groups",r=f?"PUT":"POST";(await fetch(t,{method:r,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:C.name,is_required:C.is_required,options:C.options})})).ok&&(A(),B(),null===i||void 0===i||i())}catch(e){console.error("Error saving option group:",e)}},disabled:!C.name.trim()||0===C.options.length,children:f?"Update":"Create"})]})]}),(0,g.jsxs)(p.aF,{isOpen:y,onClose:()=>j(!1),title:"Delete Option Group",children:[(0,g.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(fe,{type:"button",variant:"secondary",onClick:()=>j(!1),children:"Cancel"}),(0,g.jsx)(fe,{type:"button",variant:"danger",onClick:async()=>{if(v)try{const e=_e(),t=await fetch(`/api/system-product-option-groups/${v}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(t.ok)A(),null===i||void 0===i||i();else{const e=await t.json();alert(e.message||e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{j(!1),_(null)}},children:"Delete"})]})]})]})},we=()=>{const{t:e}=(0,h.Bd)("admin"),[t,i]=(0,a.M)("products"),[n,d]=(0,r.useState)(0),[l,c]=(0,r.useState)(0),[p,u]=(0,r.useState)(0),[x,m]=(0,r.useState)(0),[y,j]=(0,r.useState)(0);return(0,g.jsxs)(o.mc,{children:[(0,g.jsx)(o.Y9,{children:(0,g.jsx)(o.hE,{children:"System Products"})}),(0,g.jsxs)(o.UC,{children:[(0,g.jsxs)(s.tU,{children:[(0,g.jsxs)(s.oz,{active:"products"===t,onClick:()=>i("products"),children:["Products",(0,g.jsx)(s.Ex,{count:n,showZero:!0})]}),(0,g.jsxs)(s.oz,{active:"categories"===t,onClick:()=>i("categories"),children:["Categories",(0,g.jsx)(s.Ex,{count:l,showZero:!0})]}),(0,g.jsxs)(s.oz,{active:"options"===t,onClick:()=>i("options"),children:["Options",(0,g.jsx)(s.Ex,{count:p,showZero:!0})]})]}),(0,g.jsx)("div",{style:{display:"products"===t?"block":"none"},children:(0,g.jsx)(Ce,{onCountChange:d,categoryRefreshKey:x,optionRefreshKey:y})}),(0,g.jsx)("div",{style:{display:"categories"===t?"block":"none"},children:(0,g.jsx)(Fe,{onCountChange:c,onCategoryChange:()=>m(e=>e+1)})}),(0,g.jsx)("div",{style:{display:"options"===t?"block":"none"},children:(0,g.jsx)(ke,{onCountChange:u,onOptionChange:()=>j(e=>e+1)})})]})]})}},2653:(e,t,i)=>{i.d(t,{M:()=>o});var r=i(9950),n=i(4492);function o(e){const[t,i]=(0,n.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,r.useState)(o());return[s,(0,r.useCallback)(e=>{a(e),i({tab:e})},[i])]}},3705:(e,t,i)=>{i.d(t,{cc:()=>n});var r=i(4752);const n=r.Ay.button`
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
`;r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},7617:(e,t,i)=>{i.d(t,{A:()=>x});i(9950);var r=i(7119),n=i(4752),o=i(9610),s=i(4414);const a=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=n.Ay.button`
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
`,x=e=>{let{isOpen:t,title:i,message:n,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,s.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:i}),(0,s.jsx)(c,{children:n})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(u,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}}}]);