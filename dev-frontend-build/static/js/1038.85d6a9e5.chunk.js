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
`,v=i.Ay.select`
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
`,j=i.Ay.div`
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
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,D=i.Ay.div`
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
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,A=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,C=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,E=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,B=i.Ay.div`
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
`,S=i.Ay.div`
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
`,O=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.type){case"percentage":return"#DBEAFE";case"fixed_amount":return"#D1FAE5";case"bogo":return"#FEF3C7";case"free_shipping":return"#E0E7FF";case"happy_hour":return"#FCE7F3";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.type){case"percentage":return"#1E40AF";case"fixed_amount":return"#065F46";case"bogo":return"#92400E";case"free_shipping":return"#3730A3";case"happy_hour":return"#BE185D";default:return"#6B7280"}}};
`,R=i.Ay.span`
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
`,_=i.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,M=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,U=i.Ay.div`
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
`,H=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`,G=i.Ay.button`
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
`,Y=i.Ay.div`
  padding: 24px;
`,q=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,J=i.Ay.div`
  margin-bottom: 20px;
`,K=i.Ay.label`
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
`,se=()=>{const{user:e}=(0,s.As)(),[t,n]=(0,r.useState)("all"),[i,se]=(0,r.useState)(""),[oe,de]=(0,r.useState)("all"),[le,ce]=(0,r.useState)("all"),[pe,xe]=(0,r.useState)("name"),[ue,he]=(0,r.useState)([]),[me,ge]=(0,r.useState)([]),[ve,je]=(0,r.useState)(null),[fe,ye]=(0,r.useState)(!1),[be,Fe]=(0,r.useState)(!1),[De,we]=(0,r.useState)(null),{defaultCurrency:Ae}=(0,o.i1)(),[Ce,Ee]=(0,r.useState)("RM");(0,r.useEffect)(()=>{Ae&&Ee(Ae)},[Ae]);const[Be,Se]=(0,r.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[ke]=(0,r.useState)([]);(0,r.useEffect)(()=>{he([])},[]),(0,r.useEffect)(()=>{let e=ue;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),i){const t=i.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==oe&&(e=e.filter(e=>e.type===oe)),"all"!==le&&(e=e.filter(e=>e.status===le)),e.sort((e,t)=>{switch(pe){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),ge(e)},[ue,t,i,oe,le,pe]);const ze={totalPromotions:ue.length,activePromotions:ue.filter(e=>"active"===e.status).length,usedThisMonth:ue.reduce((e,t)=>{const n=new Date,r=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=r?e+t.usageCount:e},0),totalRevenue:ue.reduce((e,t)=>e+t.generatedRevenue,0)},$e=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},Oe=e=>{je(e),ye(!0)},Re=()=>{we(null),Se({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),Fe(!0)},Pe=e=>{var t,n,r;we(e),Se({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(r=e.maxDiscount)||void 0===r?void 0:r.toString())||"",description:e.description}),Fe(!0)},Le=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};he([...ue,t])},Te=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,l.jsx)(a.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(u,{children:"Promotions"}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(m,{variant:"secondary",onClick:()=>{var n;const r={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=ke.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:ze.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:me.map(e=>({name:e.name,type:$e(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},i=`Promotion Export - ${r.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${r.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+r.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),a=new Blob([i],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,s.click()},children:[(0,l.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,l.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,l.jsx)(m,{variant:"primary",onClick:Re,children:"Add Promotion"})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(v,{value:t,onChange:e=>n(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Restaurants"}),ke.map(e=>(0,l.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(y,{children:"\ud83d\udd0d"}),(0,l.jsx)(f,{type:"text",placeholder:"Search promotions by name, description...",value:i,onChange:e=>se(e.target.value)})]}),(0,l.jsxs)(v,{value:oe,onChange:e=>de(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Types"}),(0,l.jsx)("option",{value:"percentage",children:"Percentage"}),(0,l.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,l.jsx)("option",{value:"bogo",children:"BOGO"}),(0,l.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,l.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,l.jsxs)(v,{value:le,onChange:e=>ce(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,l.jsx)("option",{value:"paused",children:"Paused"}),(0,l.jsx)("option",{value:"expired",children:"Expired"})]}),(0,l.jsxs)(v,{value:pe,onChange:e=>xe(e.target.value),children:[(0,l.jsx)("option",{value:"name",children:"Sort by Name"}),(0,l.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,l.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,l.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(F,{children:[(0,l.jsxs)(D,{color:"#059669",children:[(0,l.jsx)(w,{children:"Total Promotions"}),(0,l.jsx)(A,{children:ze.totalPromotions}),(0,l.jsx)(C,{positive:!0,children:"All restaurants combined"})]}),(0,l.jsxs)(D,{color:"#2563EB",children:[(0,l.jsx)(w,{children:"Active Promotions"}),(0,l.jsx)(A,{children:ze.activePromotions}),(0,l.jsx)(C,{positive:!0,children:"Currently running"})]}),(0,l.jsxs)(D,{color:"#7C3AED",children:[(0,l.jsx)(w,{children:"Used This Month"}),(0,l.jsx)(A,{children:ze.usedThisMonth}),(0,l.jsx)(C,{positive:!0,children:"Promotion activations"})]}),(0,l.jsxs)(D,{color:"#D97706",children:[(0,l.jsx)(w,{children:"Generated Revenue"}),(0,l.jsx)(A,{children:(0,d.vv)(ze.totalRevenue,Ce)}),(0,l.jsx)(C,{positive:!0,children:"From all promotions"})]})]}),(0,l.jsxs)(E,{children:[(0,l.jsxs)(B,{children:[(0,l.jsx)("span",{children:"Promotion"}),(0,l.jsx)("span",{children:"Type"}),(0,l.jsx)("span",{children:"Restaurants"}),(0,l.jsx)("span",{children:"Dates"}),(0,l.jsx)("span",{children:"Usage"}),(0,l.jsx)("span",{children:"Revenue"}),(0,l.jsx)("span",{children:"Status"}),(0,l.jsx)("span",{children:"Actions"})]}),0===me.length?(0,l.jsxs)(re,{children:[(0,l.jsx)(ie,{children:"\ud83c\udfaf"}),(0,l.jsx)(ae,{children:i||"all"!==oe||"all"!==le||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,l.jsx)(m,{variant:"primary",onClick:Re,children:"Create First Promotion"})]}):(0,l.jsxs)(l.Fragment,{children:[me.map(e=>(0,l.jsxs)(S,{onClick:()=>Oe(e),children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(z,{children:e.name}),(0,l.jsx)($,{children:e.discountText})]}),(0,l.jsx)(O,{type:e.type,children:$e(e.type)}),(0,l.jsx)(P,{children:(0,l.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,l.jsxs)(P,{children:[(0,l.jsx)("div",{children:Te(e.startDate)}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",Te(e.endDate)]})]}),(0,l.jsxs)(P,{children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,l.jsx)(P,{style:{color:"#059669",fontWeight:"600"},children:(0,d.vv)(e.generatedRevenue,Ce)}),(0,l.jsx)(R,{status:e.status,children:e.status}),(0,l.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,l.jsx)(T,{onClick:()=>Pe(e),children:"Edit"}),(0,l.jsx)(T,{onClick:()=>Le(e),children:"Copy"}),(0,l.jsx)(T,{onClick:()=>{return t=e.id,void he(ue.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,l.jsx)(_,{children:me.map(e=>(0,l.jsxs)(M,{onClick:()=>Oe(e),children:[(0,l.jsxs)(N,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(z,{children:e.name}),(0,l.jsx)($,{children:e.discountText})]}),(0,l.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,l.jsx)(O,{type:e.type,children:$e(e.type)}),(0,l.jsx)(R,{status:e.status,children:e.status})]})]}),(0,l.jsxs)(U,{children:[(0,l.jsxs)("span",{children:[e.usageCount," used"]}),(0,l.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,d.vv)(e.generatedRevenue,Ce)}),(0,l.jsx)("span",{children:Te(e.endDate)})]})]},e.id))})]})]})]}),(0,l.jsx)(V,{isOpen:fe,children:(0,l.jsxs)(W,{children:[(0,l.jsxs)(I,{children:[(0,l.jsx)(H,{children:"Promotion Details"}),(0,l.jsx)(G,{onClick:()=>ye(!1),children:"\xd7"})]}),ve&&(0,l.jsxs)(Y,{children:[(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,l.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:ve.name}),(0,l.jsx)(O,{type:ve.type,children:$e(ve.type)}),(0,l.jsx)(R,{status:ve.status,children:ve.status})]}),(0,l.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:ve.description})]}),(0,l.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,l.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Discount:"})," ",ve.discountText]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Min Order:"})," ",ve.minOrderAmount?(0,d.vv)(ve.minOrderAmount,Ce):"No minimum"]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Max Discount:"})," ",ve.maxDiscount?(0,d.vv)(ve.maxDiscount,Ce):"No limit"]})]})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,l.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Usage:"})," ",ve.usageCount," / ",ve.usageLimit||"\u221e"]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Revenue:"})," ",(0,d.vv)(ve.generatedRevenue,Ce)]}),(0,l.jsxs)("p",{children:[(0,l.jsx)("strong",{children:"Created:"})," ",Te(ve.createdDate)]})]})]})]}),(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,l.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,l.jsx)("strong",{children:"From:"})," ",Te(ve.startDate)," ",(0,l.jsx)("br",{}),(0,l.jsx)("strong",{children:"To:"})," ",Te(ve.endDate)]})]}),(0,l.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,l.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:ve.restaurantNames.map((e,t)=>(0,l.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),ve.conditions.length>0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,l.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:ve.conditions.map((e,t)=>(0,l.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]}),(0,l.jsxs)(ne,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>ye(!1),children:"Close"}),ve&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>{ye(!1),Pe(ve)},children:"Edit Promotion"}),(0,l.jsx)(m,{variant:"primary",onClick:()=>{ye(!1),Le(ve)},children:"Duplicate"})]})]})]})}),(0,l.jsx)(V,{isOpen:be,children:(0,l.jsxs)(W,{style:{maxWidth:"800px"},children:[(0,l.jsxs)(I,{children:[(0,l.jsx)(H,{children:De?"Edit Promotion":"Create New Promotion"}),(0,l.jsx)(G,{onClick:()=>Fe(!1),children:"\xd7"})]}),(0,l.jsxs)(Y,{children:[(0,l.jsxs)(q,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Promotion Name *"}),(0,l.jsx)(Q,{type:"text",value:Be.name,onChange:e=>Se({...Be,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Promotion Type *"}),(0,l.jsxs)(X,{value:Be.type,onChange:e=>Se({...Be,type:e.target.value}),children:[(0,l.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,l.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,l.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,l.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,l.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,l.jsxs)(q,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Discount Value *"}),(0,l.jsx)(Q,{type:"number",value:Be.discountValue,onChange:e=>Se({...Be,discountValue:e.target.value}),placeholder:"percentage"===Be.type?"15":"10",step:"percentage"===Be.type?"1":"0.01"})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Minimum Order Amount"}),(0,l.jsx)(Q,{type:"number",value:Be.minOrderAmount,onChange:e=>Se({...Be,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,l.jsxs)(q,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Start Date *"}),(0,l.jsx)(Q,{type:"date",value:Be.startDate,onChange:e=>Se({...Be,startDate:e.target.value})})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"End Date *"}),(0,l.jsx)(Q,{type:"date",value:Be.endDate,onChange:e=>Se({...Be,endDate:e.target.value})})]})]}),(0,l.jsxs)(q,{children:[(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Usage Limit (Optional)"}),(0,l.jsx)(Q,{type:"number",value:Be.usageLimit,onChange:e=>Se({...Be,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Maximum Discount Amount"}),(0,l.jsx)(Q,{type:"number",value:Be.maxDiscount,onChange:e=>Se({...Be,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Apply to Restaurants *"}),(0,l.jsx)(ee,{children:ke.map(e=>(0,l.jsxs)(te,{children:[(0,l.jsx)("input",{type:"checkbox",checked:Be.restaurants.includes(e.id),onChange:t=>{t.target.checked?Se({...Be,restaurants:[...Be.restaurants,e.id]}):Se({...Be,restaurants:Be.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(K,{children:"Description"}),(0,l.jsx)(Z,{value:Be.description,onChange:e=>Se({...Be,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]}),(0,l.jsxs)(ne,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:()=>Fe(!1),children:"Cancel"}),(0,l.jsx)(m,{variant:"primary",onClick:()=>{const e="percentage"===Be.type?`${Be.discountValue}% off`:"fixed_amount"===Be.type?`${(0,d.vv)(Be.discountValue,Ce)} off`:"bogo"===Be.type?`BOGO ${Be.discountValue}% off`:"free_shipping"===Be.type?"Free delivery":`${Be.discountValue}% off (Happy Hour)`,t=ke.filter(e=>Be.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===De||void 0===De?void 0:De.id)||`promo-${Date.now()}`,name:Be.name,type:Be.type,discountValue:parseFloat(Be.discountValue),discountText:e,restaurants:Be.restaurants,restaurantNames:t,startDate:Be.startDate,endDate:Be.endDate,usageCount:(null===De||void 0===De?void 0:De.usageCount)||0,usageLimit:Be.usageLimit?parseInt(Be.usageLimit):null,minOrderAmount:Be.minOrderAmount?parseFloat(Be.minOrderAmount):null,maxDiscount:Be.maxDiscount?parseFloat(Be.maxDiscount):null,status:"active",createdDate:(null===De||void 0===De?void 0:De.createdDate)||(new Date).toISOString().split("T")[0],description:Be.description,conditions:[],generatedRevenue:(null===De||void 0===De?void 0:De.generatedRevenue)||0};he(De?ue.map(e=>e.id===De.id?n:e):[...ue,n]),Fe(!1)},children:De?"Update Promotion":"Create Promotion"})]})]})})]})})}},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(a.DL)),[d,l]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:c}}}}]);