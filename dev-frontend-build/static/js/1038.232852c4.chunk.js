"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ae});var r=n(9950),i=n(4752),a=n(1367),s=n(4021),o=n(6038),d=n(4414);const l=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,c=i.Ay.div`
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
`,p=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,h=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=i.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,g=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 180px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,v=i.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,j=i.Ay.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`,f=i.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,y=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,F=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,D=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,w=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,C=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,E=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1400px) {
    display: none;
  }
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1400px) {
    display: none;
  }
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,k=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,z=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,$=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.type){case"percentage":return"#DBEAFE";case"fixed_amount":return"#D1FAE5";case"bogo":return"#FEF3C7";case"free_shipping":return"#E0E7FF";case"happy_hour":return"#FCE7F3";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"percentage":return"#1E40AF";case"fixed_amount":return"#065F46";case"bogo":return"#92400E";case"free_shipping":return"#3730A3";case"happy_hour":return"#BE185D";default:return"#6B7280"}}};
`,O=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"scheduled":return"#FEF3C7";case"paused":default:return"#F3F4F6";case"expired":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"scheduled":return"#D97706";case"paused":default:return"#6B7280";case"expired":return"#DC2626"}}};
`,R=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,P=i.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,L=i.Ay.button`
  padding: 4px 8px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  color: #6B7280;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,T=i.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,_=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,M=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,U=i.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,V=i.Ay.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,W=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,I=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`,H=i.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`,G=i.Ay.div`
  padding: 24px;
`,Y=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,q=i.Ay.div`
  margin-bottom: 20px;
`,J=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,K=i.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Q=i.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,X=i.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Z=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`,ee=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
`,te=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,ne=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,re=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,ie=i.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,ae=()=>{const{user:e}=(0,a.As)(),[t,n]=(0,r.useState)("all"),[i,ae]=(0,r.useState)(""),[se,oe]=(0,r.useState)("all"),[de,le]=(0,r.useState)("all"),[ce,pe]=(0,r.useState)("name"),[xe,ue]=(0,r.useState)([]),[he,me]=(0,r.useState)([]),[ge,ve]=(0,r.useState)(null),[je,fe]=(0,r.useState)(!1),[ye,be]=(0,r.useState)(!1),[Fe,De]=(0,r.useState)(null),{defaultCurrency:we}=(0,s.i1)(),[Ae,Ce]=(0,r.useState)("RM");(0,r.useEffect)(()=>{we&&Ce(we)},[we]);const[Ee,Be]=(0,r.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[Se]=(0,r.useState)([]);(0,r.useEffect)(()=>{ue([])},[]),(0,r.useEffect)(()=>{let e=xe;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),i){const t=i.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==se&&(e=e.filter(e=>e.type===se)),"all"!==de&&(e=e.filter(e=>e.status===de)),e.sort((e,t)=>{switch(ce){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),me(e)},[xe,t,i,se,de,ce]);const ke={totalPromotions:xe.length,activePromotions:xe.filter(e=>"active"===e.status).length,usedThisMonth:xe.reduce((e,t)=>{const n=new Date,r=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=r?e+t.usageCount:e},0),totalRevenue:xe.reduce((e,t)=>e+t.generatedRevenue,0)},ze=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},$e=e=>{ve(e),fe(!0)},Oe=()=>{De(null),Be({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),be(!0)},Re=e=>{var t,n,r;De(e),Be({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(r=e.maxDiscount)||void 0===r?void 0:r.toString())||"",description:e.description}),be(!0)},Pe=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};ue([...xe,t])},Le=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Promotions"}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(h,{variant:"secondary",onClick:()=>{var n;const r={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=Se.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:ke.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:he.map(e=>({name:e.name,type:ze(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},i=`Promotion Export - ${r.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${r.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+r.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),a=new Blob([i],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,s.click()},children:[(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,d.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,d.jsx)(h,{variant:"primary",onClick:Oe,children:"Add Promotion"})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{value:t,onChange:e=>n(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),Se.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(f,{children:"\ud83d\udd0d"}),(0,d.jsx)(j,{type:"text",placeholder:"Search promotions by name, description...",value:i,onChange:e=>ae(e.target.value)})]}),(0,d.jsxs)(g,{value:se,onChange:e=>oe(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Types"}),(0,d.jsx)("option",{value:"percentage",children:"Percentage"}),(0,d.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,d.jsx)("option",{value:"bogo",children:"BOGO"}),(0,d.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,d.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,d.jsxs)(g,{value:de,onChange:e=>le(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,d.jsx)("option",{value:"paused",children:"Paused"}),(0,d.jsx)("option",{value:"expired",children:"Expired"})]}),(0,d.jsxs)(g,{value:ce,onChange:e=>pe(e.target.value),children:[(0,d.jsx)("option",{value:"name",children:"Sort by Name"}),(0,d.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,d.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,d.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(F,{color:"#059669",children:[(0,d.jsx)(D,{children:"Total Promotions"}),(0,d.jsx)(w,{children:ke.totalPromotions}),(0,d.jsx)(A,{positive:!0,children:"All restaurants combined"})]}),(0,d.jsxs)(F,{color:"#2563EB",children:[(0,d.jsx)(D,{children:"Active Promotions"}),(0,d.jsx)(w,{children:ke.activePromotions}),(0,d.jsx)(A,{positive:!0,children:"Currently running"})]}),(0,d.jsxs)(F,{color:"#7C3AED",children:[(0,d.jsx)(D,{children:"Used This Month"}),(0,d.jsx)(w,{children:ke.usedThisMonth}),(0,d.jsx)(A,{positive:!0,children:"Promotion activations"})]}),(0,d.jsxs)(F,{color:"#D97706",children:[(0,d.jsx)(D,{children:"Generated Revenue"}),(0,d.jsx)(w,{children:(0,o.vv)(ke.totalRevenue,Ae)}),(0,d.jsx)(A,{positive:!0,children:"From all promotions"})]})]}),(0,d.jsxs)(C,{children:[(0,d.jsxs)(E,{children:[(0,d.jsx)("span",{children:"Promotion"}),(0,d.jsx)("span",{children:"Type"}),(0,d.jsx)("span",{children:"Restaurants"}),(0,d.jsx)("span",{children:"Dates"}),(0,d.jsx)("span",{children:"Usage"}),(0,d.jsx)("span",{children:"Revenue"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Actions"})]}),0===he.length?(0,d.jsxs)(ne,{children:[(0,d.jsx)(re,{children:"\ud83c\udfaf"}),(0,d.jsx)(ie,{children:i||"all"!==se||"all"!==de||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,d.jsx)(h,{variant:"primary",onClick:Oe,children:"Create First Promotion"})]}):(0,d.jsxs)(d.Fragment,{children:[he.map(e=>(0,d.jsxs)(B,{onClick:()=>$e(e),children:[(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:e.name}),(0,d.jsx)(z,{children:e.discountText})]}),(0,d.jsx)($,{type:e.type,children:ze(e.type)}),(0,d.jsx)(R,{children:(0,d.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,d.jsxs)(R,{children:[(0,d.jsx)("div",{children:Le(e.startDate)}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",Le(e.endDate)]})]}),(0,d.jsxs)(R,{children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,d.jsx)(R,{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(e.generatedRevenue,Ae)}),(0,d.jsx)(O,{status:e.status,children:e.status}),(0,d.jsxs)(P,{onClick:e=>e.stopPropagation(),children:[(0,d.jsx)(L,{onClick:()=>Re(e),children:"Edit"}),(0,d.jsx)(L,{onClick:()=>Pe(e),children:"Copy"}),(0,d.jsx)(L,{onClick:()=>{return t=e.id,void ue(xe.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,d.jsx)(T,{children:he.map(e=>(0,d.jsxs)(_,{onClick:()=>$e(e),children:[(0,d.jsxs)(M,{children:[(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:e.name}),(0,d.jsx)(z,{children:e.discountText})]}),(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,d.jsx)($,{type:e.type,children:ze(e.type)}),(0,d.jsx)(O,{status:e.status,children:e.status})]})]}),(0,d.jsxs)(N,{children:[(0,d.jsxs)("span",{children:[e.usageCount," used"]}),(0,d.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(e.generatedRevenue,Ae)}),(0,d.jsx)("span",{children:Le(e.endDate)})]})]},e.id))})]})]})]}),(0,d.jsx)(U,{isOpen:je,children:(0,d.jsxs)(V,{children:[(0,d.jsxs)(W,{children:[(0,d.jsx)(I,{children:"Promotion Details"}),(0,d.jsx)(H,{onClick:()=>fe(!1),children:"\xd7"})]}),ge&&(0,d.jsxs)(G,{children:[(0,d.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,d.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:ge.name}),(0,d.jsx)($,{type:ge.type,children:ze(ge.type)}),(0,d.jsx)(O,{status:ge.status,children:ge.status})]}),(0,d.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:ge.description})]}),(0,d.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Discount:"})," ",ge.discountText]}),(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Min Order:"})," ",ge.minOrderAmount?(0,o.vv)(ge.minOrderAmount,Ae):"No minimum"]}),(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Max Discount:"})," ",ge.maxDiscount?(0,o.vv)(ge.maxDiscount,Ae):"No limit"]})]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,d.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Usage:"})," ",ge.usageCount," / ",ge.usageLimit||"\u221e"]}),(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Revenue:"})," ",(0,o.vv)(ge.generatedRevenue,Ae)]}),(0,d.jsxs)("p",{children:[(0,d.jsx)("strong",{children:"Created:"})," ",Le(ge.createdDate)]})]})]})]}),(0,d.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,d.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,d.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,d.jsx)("strong",{children:"From:"})," ",Le(ge.startDate)," ",(0,d.jsx)("br",{}),(0,d.jsx)("strong",{children:"To:"})," ",Le(ge.endDate)]})]}),(0,d.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,d.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,d.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:ge.restaurantNames.map((e,t)=>(0,d.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),ge.conditions.length>0&&(0,d.jsxs)("div",{children:[(0,d.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,d.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:ge.conditions.map((e,t)=>(0,d.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>fe(!1),children:"Close"}),ge&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>{fe(!1),Re(ge)},children:"Edit Promotion"}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{fe(!1),Pe(ge)},children:"Duplicate"})]})]})]})}),(0,d.jsx)(U,{isOpen:ye,children:(0,d.jsxs)(V,{style:{maxWidth:"800px"},children:[(0,d.jsxs)(W,{children:[(0,d.jsx)(I,{children:Fe?"Edit Promotion":"Create New Promotion"}),(0,d.jsx)(H,{onClick:()=>be(!1),children:"\xd7"})]}),(0,d.jsxs)(G,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Promotion Name *"}),(0,d.jsx)(K,{type:"text",value:Ee.name,onChange:e=>Be({...Ee,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Promotion Type *"}),(0,d.jsxs)(Q,{value:Ee.type,onChange:e=>Be({...Ee,type:e.target.value}),children:[(0,d.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,d.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,d.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,d.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,d.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Discount Value *"}),(0,d.jsx)(K,{type:"number",value:Ee.discountValue,onChange:e=>Be({...Ee,discountValue:e.target.value}),placeholder:"percentage"===Ee.type?"15":"10",step:"percentage"===Ee.type?"1":"0.01"})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Minimum Order Amount"}),(0,d.jsx)(K,{type:"number",value:Ee.minOrderAmount,onChange:e=>Be({...Ee,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Start Date *"}),(0,d.jsx)(K,{type:"date",value:Ee.startDate,onChange:e=>Be({...Ee,startDate:e.target.value})})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"End Date *"}),(0,d.jsx)(K,{type:"date",value:Ee.endDate,onChange:e=>Be({...Ee,endDate:e.target.value})})]})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Usage Limit (Optional)"}),(0,d.jsx)(K,{type:"number",value:Ee.usageLimit,onChange:e=>Be({...Ee,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Maximum Discount Amount"}),(0,d.jsx)(K,{type:"number",value:Ee.maxDiscount,onChange:e=>Be({...Ee,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Apply to Restaurants *"}),(0,d.jsx)(Z,{children:Se.map(e=>(0,d.jsxs)(ee,{children:[(0,d.jsx)("input",{type:"checkbox",checked:Ee.restaurants.includes(e.id),onChange:t=>{t.target.checked?Be({...Ee,restaurants:[...Ee.restaurants,e.id]}):Be({...Ee,restaurants:Ee.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(J,{children:"Description"}),(0,d.jsx)(X,{value:Ee.description,onChange:e=>Be({...Ee,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{const e="percentage"===Ee.type?`${Ee.discountValue}% off`:"fixed_amount"===Ee.type?`${(0,o.vv)(Ee.discountValue,Ae)} off`:"bogo"===Ee.type?`BOGO ${Ee.discountValue}% off`:"free_shipping"===Ee.type?"Free delivery":`${Ee.discountValue}% off (Happy Hour)`,t=Se.filter(e=>Ee.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===Fe||void 0===Fe?void 0:Fe.id)||`promo-${Date.now()}`,name:Ee.name,type:Ee.type,discountValue:parseFloat(Ee.discountValue),discountText:e,restaurants:Ee.restaurants,restaurantNames:t,startDate:Ee.startDate,endDate:Ee.endDate,usageCount:(null===Fe||void 0===Fe?void 0:Fe.usageCount)||0,usageLimit:Ee.usageLimit?parseInt(Ee.usageLimit):null,minOrderAmount:Ee.minOrderAmount?parseFloat(Ee.minOrderAmount):null,maxDiscount:Ee.maxDiscount?parseFloat(Ee.maxDiscount):null,status:"active",createdDate:(null===Fe||void 0===Fe?void 0:Fe.createdDate)||(new Date).toISOString().split("T")[0],description:Ee.description,conditions:[],generatedRevenue:(null===Fe||void 0===Fe?void 0:Fe.generatedRevenue)||0};ue(Fe?xe.map(e=>e.id===Fe.id?n:e):[...xe,n]),be(!1)},children:Fe?"Update Promotion":"Create Promotion"})]})]})})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(a.DL)),[d,l]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:c}}}}]);