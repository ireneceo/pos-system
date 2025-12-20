"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>se});var r=n(9950),i=n(4752),a=n(3310),s=n(1367),o=n(4021),d=n(6038),l=n(4414);const c=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=i.Ay.div`
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
`,x=i.Ay.div`
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
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,m=i.Ay.button`
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
`,g=i.Ay.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`,j=i.Ay.select`
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
`,f=i.Ay.input`
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
`,y=i.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,b=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,D=i.Ay.div`
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
`,A=i.Ay.div`
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
`,C=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,S=i.Ay.div`
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
`,k=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,z=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,$=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=i.Ay.span`
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
`,P=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,L=i.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,T=i.Ay.button`
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
`,U=i.Ay.div`
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
`,V=i.Ay.div`
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
`,W=i.Ay.div`
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
`,I=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=i.Ay.h2`
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
`,K=i.Ay.div`
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
`,Q=i.Ay.input`
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
`,X=i.Ay.select`
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
`,Z=i.Ay.textarea`
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
`,ee=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`,te=i.Ay.label`
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
`,ne=i.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,re=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,ie=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,ae=i.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,se=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("all"),[i,se]=(0,r.useState)(""),[oe,de]=(0,r.useState)("all"),[le,ce]=(0,r.useState)("all"),[pe,xe]=(0,r.useState)("name"),[ue,he]=(0,r.useState)([]),[me,ge]=(0,r.useState)([]),[je,ve]=(0,r.useState)(null),[fe,ye]=(0,r.useState)(!1),[be,De]=(0,r.useState)(!1),[Fe,Ae]=(0,r.useState)(null),{defaultCurrency:we}=(0,o.i1)(),[Ce,Se]=(0,r.useState)("MYR");(0,r.useEffect)(()=>{we&&Se(we)},[we]);const[Ee,Be]=(0,r.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[ke]=(0,r.useState)([]);(0,r.useEffect)(()=>{he([])},[]),(0,r.useEffect)(()=>{let e=ue;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),i){const t=i.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==oe&&(e=e.filter(e=>e.type===oe)),"all"!==le&&(e=e.filter(e=>e.status===le)),e.sort((e,t)=>{switch(pe){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),ge(e)},[ue,t,i,oe,le,pe]);const ze={totalPromotions:ue.length,activePromotions:ue.filter(e=>"active"===e.status).length,usedThisMonth:ue.reduce((e,t)=>{const n=new Date,r=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=r?e+t.usageCount:e},0),totalRevenue:ue.reduce((e,t)=>e+t.generatedRevenue,0)},$e=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},Re=e=>{ve(e),ye(!0)},Oe=()=>{Ae(null),Be({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),De(!0)},Pe=e=>{var t,n,r;Ae(e),Be({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(r=e.maxDiscount)||void 0===r?void 0:r.toString())||"",description:e.description}),De(!0)},Le=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};he([...ue,t])},Te=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,l.jsx)(a.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(u,{children:"Promotions"}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(m,{variant:"secondary",onClick:()=>{var n;const r={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=ke.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:ze.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:me.map(e=>({name:e.name,type:$e(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},i=`Promotion Export - ${r.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${r.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+r.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),a=new Blob([i],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,s.click()},children:[(0,l.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,l.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,l.jsx)(m,{variant:"primary",onClick:Oe,children:"+ Add Promotion"})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(j,{value:t,onChange:e=>n(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Restaurants"}),ke.map(e=>(0,l.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(y,{children:"\ud83d\udd0d"}),(0,l.jsx)(f,{type:"text",placeholder:"Search promotions by name, description...",value:i,onChange:e=>se(e.target.value)})]}),(0,l.jsxs)(j,{value:oe,onChange:e=>de(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Types"}),(0,l.jsx)("option",{value:"percentage",children:"Percentage"}),(0,l.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,l.jsx)("option",{value:"bogo",children:"BOGO"}),(0,l.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,l.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,l.jsxs)(j,{value:le,onChange:e=>ce(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,l.jsx)("option",{value:"paused",children:"Paused"}),(0,l.jsx)("option",{value:"expired",children:"Expired"})]}),(0,l.jsxs)(j,{value:pe,onChange:e=>xe(e.target.value),children:[(0,l.jsx)("option",{value:"name",children:"Sort by Name"}),(0,l.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,l.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,l.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(D,{children:[(0,l.jsxs)(F,{color:"#059669",children:[(0,l.jsx)(A,{children:"Total Promotions"}),(0,l.jsx)(w,{children:ze.totalPromotions}),(0,l.jsx)(C,{positive:!0,children:"All restaurants combined"})]}),(0,l.jsxs)(F,{color:"#2563EB",children:[(0,l.jsx)(A,{children:"Active Promotions"}),(0,l.jsx)(w,{children:ze.activePromotions}),(0,l.jsx)(C,{positive:!0,children:"Currently running"})]}),(0,l.jsxs)(F,{color:"#7C3AED",children:[(0,l.jsx)(A,{children:"Used This Month"}),(0,l.jsx)(w,{children:ze.usedThisMonth}),(0,l.jsx)(C,{positive:!0,children:"Promotion activations"})]}),(0,l.jsxs)(F,{color:"#D97706",children:[(0,l.jsx)(A,{children:"Generated Revenue"}),(0,l.jsx)(w,{children:(0,d.vv)(ze.totalRevenue,Ce)}),(0,l.jsx)(C,{positive:!0,children:"From all promotions"})]})]}),(0,l.jsxs)(S,{children:[(0,l.jsxs)(E,{children:[(0,l.jsx)("span",{children:"Promotion"}),(0,l.jsx)("span",{children:"Type"}),(0,l.jsx)("span",{children:"Restaurants"}),(0,l.jsx)("span",{children:"Dates"}),(0,l.jsx)("span",{children:"Usage"}),(0,l.jsx)("span",{children:"Revenue"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Actions"})]}),0===me.length?(0,l.jsxs)(re,{children:[(0,l.jsx)(ie,{children:"\ud83c\udfaf"}),(0,l.jsx)(ae,{children:i||"all"!==oe||"all"!==le||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,l.jsx)(m,{variant:"primary",onClick:Oe,children:"Create First Promotion"})]}):(0,l.jsxs)(l.Fragment,{children:[me.map(e=>(0,l.jsxs)(B,{onClick:()=>Re(e),children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(z,{children:e.name}),(0,l.jsx)($,{children:e.discountText})]}),(0,l.jsx)(R,{type:e.type,children:$e(e.type)}),(0,l.jsx)(P,{children:(0,l.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,l.jsxs)(P,{children:[(0,l.jsx)("div",{children:Te(e.startDate)}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",Te(e.endDate)]})]}),(0,l.jsxs)(P,{children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,l.jsx)(P,{style:{color:"#059669",fontWeight:"600"},children:(0,d.vv)(e.generatedRevenue,Ce)}),(0,l.jsx)(O,{status:e.status,children:e.status}),(0,l.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(T,{onClick:()=>Pe(e),children:"Edit"}),(0,l.jsx)(T,{onClick:()=>Le(e),children:"Copy"}),(0,l.jsx)(T,{onClick:()=>{return t=e.id,void he(ue.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,l.jsx)(U,{children:me.map(e=>(0,l.jsxs)(_,{onClick:()=>Re(e),children:[(0,l.jsxs)(M,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(z,{children:e.name}),(0,l.jsx)($,{children:e.discountText})]}),(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,l.jsx)(R,{type:e.type,children:$e(e.type)}),(0,l.jsx)(O,{status:e.status,children:e.status})]})]}),(0,l.jsxs)(N,{children:[(0,l.jsxs)("span",{children:[e.usageCount," used"]}),(0,l.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,d.vv)(e.generatedRevenue,Ce)}),(0,l.jsx)("span",{children:Te(e.endDate)})]})]},e.id))})]})]})]}),(0,l.jsx)(V,{isOpen:fe,children:(0,l.jsxs)(W,{children:[(0,l.jsxs)(I,{children:[(0,l.jsx)(Y,{children:"Promotion Details"}),(0,l.jsx)(H,{onClick:()=>ye(!1),children:"\xd7"})]}),je&&(0,l.jsxs)(G,{children:[(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,l.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:je.name}),(0,l.jsx)(R,{type:je.type,children:$e(je.type)}),(0,l.jsx)(O,{status:je.status,children:je.status})]}),(0,l.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:je.description})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,l.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Discount:"})," ",je.discountText]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Min Order:"})," ",je.minOrderAmount?`RM ${je.minOrderAmount}`:"No minimum"]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Max Discount:"})," ",je.maxDiscount?`RM ${je.maxDiscount}`:"No limit"]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,l.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Usage:"})," ",je.usageCount," / ",je.usageLimit||"\u221e"]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Revenue:"})," ",(0,d.vv)(je.generatedRevenue,Ce)]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Created:"})," ",Te(je.createdDate)]})]})]})]}),(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,l.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,l.jsx)("strong",{children:"From:"})," ",Te(je.startDate)," ",(0,l.jsx)("br",{}),(0,l.jsx)("strong",{children:"To:"})," ",Te(je.endDate)]})]}),(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,l.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:je.restaurantNames.map((e,t)=>(0,l.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),je.conditions.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,l.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:je.conditions.map((e,t)=>(0,l.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]}),(0,l.jsxs)(ne,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>ye(!1),children:"Close"}),je&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>{ye(!1),Pe(je)},children:"Edit Promotion"}),(0,l.jsx)(m,{variant:"primary",onClick:()=>{ye(!1),Le(je)},children:"Duplicate"})]})]})]})}),(0,l.jsx)(V,{isOpen:be,children:(0,l.jsxs)(W,{style:{maxWidth:"800px"},children:[(0,l.jsxs)(I,{children:[(0,l.jsx)(Y,{children:Fe?"Edit Promotion":"Create New Promotion"}),(0,l.jsx)(H,{onClick:()=>De(!1),children:"\xd7"})]}),(0,l.jsxs)(G,{children:[(0,l.jsxs)(K,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Promotion Name *"}),(0,l.jsx)(Q,{type:"text",value:Ee.name,onChange:e=>Be({...Ee,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Promotion Type *"}),(0,l.jsxs)(X,{value:Ee.type,onChange:e=>Be({...Ee,type:e.target.value}),children:[(0,l.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,l.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,l.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,l.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,l.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,l.jsxs)(K,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Discount Value *"}),(0,l.jsx)(Q,{type:"number",value:Ee.discountValue,onChange:e=>Be({...Ee,discountValue:e.target.value}),placeholder:"percentage"===Ee.type?"15":"10",step:"percentage"===Ee.type?"1":"0.01"})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Minimum Order Amount"}),(0,l.jsx)(Q,{type:"number",value:Ee.minOrderAmount,onChange:e=>Be({...Ee,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,l.jsxs)(K,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Start Date *"}),(0,l.jsx)(Q,{type:"date",value:Ee.startDate,onChange:e=>Be({...Ee,startDate:e.target.value})})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"End Date *"}),(0,l.jsx)(Q,{type:"date",value:Ee.endDate,onChange:e=>Be({...Ee,endDate:e.target.value})})]})]}),(0,l.jsxs)(K,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Usage Limit (Optional)"}),(0,l.jsx)(Q,{type:"number",value:Ee.usageLimit,onChange:e=>Be({...Ee,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Maximum Discount Amount"}),(0,l.jsx)(Q,{type:"number",value:Ee.maxDiscount,onChange:e=>Be({...Ee,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Apply to Restaurants *"}),(0,l.jsx)(ee,{children:ke.map(e=>(0,l.jsxs)(te,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Ee.restaurants.includes(e.id),onChange:t=>{t.target.checked?Be({...Ee,restaurants:[...Ee.restaurants,e.id]}):Be({...Ee,restaurants:Ee.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,l.jsxs)(q,{children:[(0,l.jsx)(J,{children:"Description"}),(0,l.jsx)(Z,{value:Ee.description,onChange:e=>Be({...Ee,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]}),(0,l.jsxs)(ne,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>De(!1),children:"Cancel"}),(0,l.jsx)(m,{variant:"primary",onClick:()=>{const e="percentage"===Ee.type?`${Ee.discountValue}% off`:"fixed_amount"===Ee.type?`RM ${Ee.discountValue} off`:"bogo"===Ee.type?`BOGO ${Ee.discountValue}% off`:"free_shipping"===Ee.type?"Free delivery":`${Ee.discountValue}% off (Happy Hour)`,t=ke.filter(e=>Ee.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===Fe||void 0===Fe?void 0:Fe.id)||`promo-${Date.now()}`,name:Ee.name,type:Ee.type,discountValue:parseFloat(Ee.discountValue),discountText:e,restaurants:Ee.restaurants,restaurantNames:t,startDate:Ee.startDate,endDate:Ee.endDate,usageCount:(null===Fe||void 0===Fe?void 0:Fe.usageCount)||0,usageLimit:Ee.usageLimit?parseInt(Ee.usageLimit):null,minOrderAmount:Ee.minOrderAmount?parseFloat(Ee.minOrderAmount):null,maxDiscount:Ee.maxDiscount?parseFloat(Ee.maxDiscount):null,status:"active",createdDate:(null===Fe||void 0===Fe?void 0:Fe.createdDate)||(new Date).toISOString().split("T")[0],description:Ee.description,conditions:[],generatedRevenue:(null===Fe||void 0===Fe?void 0:Fe.generatedRevenue)||0};he(Fe?ue.map(e=>e.id===Fe.id?n:e):[...ue,n]),De(!1)},children:Fe?"Update Promotion":"Create Promotion"})]})]})})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),i=n(1367);n(6038);const a=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("USD"),[a,s]=(0,r.useState)(["USD"]),[o,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return n("USD"),s(["USD","MYR","KRW"]),void d(!1);try{const t=localStorage.getItem("token"),r=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(r.ok){const e=await r.json();e.success&&e.data&&(n(e.data.default_currency||"USD"),s(e.data.supported_currencies||["USD"]))}else n("USD"),s(["USD","MYR","KRW"])}catch(t){console.error("Failed to fetch brand currency:",t),c("Failed to load currency settings"),n("USD"),s(["USD","MYR","KRW"])}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:t,supportedCurrencies:a,loading:o,error:l}}}}]);