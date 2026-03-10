"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1038],{1038:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ee});var r=n(9950),i=n(4752),a=n(8409),s=n(2853),o=n(1367),l=n(4021),d=n(6038),c=n(7617),p=n(4414);const x=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=i.Ay.div`
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
`,h=i.Ay.div`
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
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`,v=i.Ay.button`
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
`,y=i.Ay.div`
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
`,f=i.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,b=i.Ay.input`
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
`,F=i.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
`,A=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,w=i.Ay.div`
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
`,C=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,E=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,B=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,S=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,k=i.Ay.div`
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
`,z=i.Ay.div`
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
`,$=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,O=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,P=i.Ay.div`
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
`,T=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"scheduled":return"#FEF3C7";case"paused":default:return"#F3F4F6";case"expired":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"scheduled":return"#D97706";case"paused":default:return"#6B7280";case"expired":return"#DC2626"}}};
`,L=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,_=i.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`,M=i.Ay.button`
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
`,N=i.Ay.div`
  display: none;
  
  @media (max-width: 1400px) {
    display: grid;
    gap: 16px;
  }
`,V=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,U=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,W=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,H=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,I=i.Ay.div`
  margin-bottom: 20px;
`,G=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,Y=i.Ay.input`
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
`,q=i.Ay.select`
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
`,J=i.Ay.textarea`
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
`,K=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
`,Q=i.Ay.label`
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
`,X=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`,Z=i.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,ee=()=>{const{user:e}=(0,o.As)(),[t,n]=(0,r.useState)("all"),[i,ee]=(0,r.useState)(""),[te,ne]=(0,r.useState)("all"),[re,ie]=(0,r.useState)("all"),[ae,se]=(0,r.useState)("name"),[oe,le]=(0,r.useState)([]),[de,ce]=(0,r.useState)([]),[pe,xe]=(0,r.useState)(null),[ue,he]=(0,r.useState)(!1),[ge,me]=(0,r.useState)(!1),[ve,ye]=(0,r.useState)(null),{defaultCurrency:je}=(0,l.i1)(),[fe,be]=(0,r.useState)("RM");(0,r.useEffect)(()=>{je&&be(je)},[je]);const[Fe,Ae]=(0,r.useState)({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),[we]=(0,r.useState)([]),[De,Ce]=(0,r.useState)(!1),[Ee,Be]=(0,r.useState)("");(0,r.useEffect)(()=>{le([])},[]),(0,r.useEffect)(()=>{let e=oe;if("all"!==t&&(e=e.filter(e=>e.restaurants.includes(t))),i){const t=i.toLowerCase();e=e.filter(e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)||e.discountText.toLowerCase().includes(t))}"all"!==te&&(e=e.filter(e=>e.type===te)),"all"!==re&&(e=e.filter(e=>e.status===re)),e.sort((e,t)=>{switch(ae){case"name":return e.name.localeCompare(t.name);case"startDate":return new Date(t.startDate).getTime()-new Date(e.startDate).getTime();case"usageCount":return t.usageCount-e.usageCount;case"revenue":return t.generatedRevenue-e.generatedRevenue;default:return 0}}),ce(e)},[oe,t,i,te,re,ae]);const Se={totalPromotions:oe.length,activePromotions:oe.filter(e=>"active"===e.status).length,usedThisMonth:oe.reduce((e,t)=>{const n=new Date,r=new Date(n.getFullYear(),n.getMonth(),1);return new Date(t.startDate)>=r?e+t.usageCount:e},0),totalRevenue:oe.reduce((e,t)=>e+t.generatedRevenue,0)},ke=e=>{switch(e){case"percentage":return"Percentage";case"fixed_amount":return"Fixed Amount";case"bogo":return"BOGO";case"free_shipping":return"Free Delivery";case"happy_hour":return"Time Discount";default:return e}},ze=e=>{xe(e),he(!0)},$e=()=>{ye(null),Ae({name:"",type:"percentage",discountValue:"",restaurants:[],startDate:"",endDate:"",usageLimit:"",minOrderAmount:"",maxDiscount:"",description:""}),me(!0)},Oe=e=>{var t,n,r;ye(e),Ae({name:e.name,type:e.type,discountValue:e.discountValue.toString(),restaurants:e.restaurants,startDate:e.startDate,endDate:e.endDate,usageLimit:(null===(t=e.usageLimit)||void 0===t?void 0:t.toString())||"",minOrderAmount:(null===(n=e.minOrderAmount)||void 0===n?void 0:n.toString())||"",maxDiscount:(null===(r=e.maxDiscount)||void 0===r?void 0:r.toString())||"",description:e.description}),me(!0)},Pe=e=>{const t={...e,id:`promo-${Date.now()}`,name:`${e.name} (Copy)`,usageCount:0,generatedRevenue:0,createdDate:(new Date).toISOString().split("T")[0],status:"active"};le([...oe,t])},Re=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(g,{children:"Promotions"}),(0,p.jsxs)(m,{children:[(0,p.jsxs)(v,{variant:"secondary",onClick:()=>{var n;const r={exportDate:(new Date).toISOString(),restaurant:"all"===t?"All Restaurants":null===(n=we.find(e=>e.id===t))||void 0===n?void 0:n.name,totalPromotions:Se.totalPromotions,manager:null===e||void 0===e?void 0:e.name,promotions:de.map(e=>({name:e.name,type:ke(e.type),discount:e.discountText,restaurants:e.restaurantNames.join(", "),startDate:e.startDate,endDate:e.endDate,usageCount:e.usageCount,usageLimit:e.usageLimit,status:e.status,revenue:e.generatedRevenue}))},i=`Promotion Export - ${r.restaurant}\nGenerated: ${(new Date).toLocaleString()}\nManager: ${r.manager}\n\nName,Type,Discount,Restaurants,Start Date,End Date,Usage Count,Usage Limit,Status,Revenue\n`+r.promotions.map(e=>`"${e.name}","${e.type}","${e.discount}","${e.restaurants}","${e.startDate}","${e.endDate}",${e.usageCount},${e.usageLimit||"Unlimited"},"${e.status}",${e.revenue}`).join("\n"),a=new Blob([i],{type:"text/csv;charset=utf-8;"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`promotions-export-${t}-${(new Date).toISOString().split("T")[0]}.csv`,s.click()},children:[(0,p.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,p.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Data"]}),(0,p.jsx)(v,{variant:"primary",onClick:$e,children:"Add Promotion"})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(j,{value:t,onChange:e=>n(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Restaurants"}),we.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(F,{children:"\ud83d\udd0d"}),(0,p.jsx)(b,{type:"text",placeholder:"Search promotions by name, description...",value:i,onChange:e=>ee(e.target.value)})]}),(0,p.jsxs)(j,{value:te,onChange:e=>ne(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Types"}),(0,p.jsx)("option",{value:"percentage",children:"Percentage"}),(0,p.jsx)("option",{value:"fixed_amount",children:"Fixed Amount"}),(0,p.jsx)("option",{value:"bogo",children:"BOGO"}),(0,p.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,p.jsx)("option",{value:"happy_hour",children:"Time Discount"})]}),(0,p.jsxs)(j,{value:re,onChange:e=>ie(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"scheduled",children:"Scheduled"}),(0,p.jsx)("option",{value:"paused",children:"Paused"}),(0,p.jsx)("option",{value:"expired",children:"Expired"})]}),(0,p.jsxs)(j,{value:ae,onChange:e=>se(e.target.value),children:[(0,p.jsx)("option",{value:"name",children:"Sort by Name"}),(0,p.jsx)("option",{value:"startDate",children:"Sort by Start Date"}),(0,p.jsx)("option",{value:"usageCount",children:"Sort by Usage"}),(0,p.jsx)("option",{value:"revenue",children:"Sort by Revenue"})]})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsxs)(D,{color:"#059669",children:[(0,p.jsx)(C,{children:"Total Promotions"}),(0,p.jsx)(E,{children:Se.totalPromotions}),(0,p.jsx)(B,{positive:!0,children:"All restaurants combined"})]}),(0,p.jsxs)(D,{color:"#2563EB",children:[(0,p.jsx)(C,{children:"Active Promotions"}),(0,p.jsx)(E,{children:Se.activePromotions}),(0,p.jsx)(B,{positive:!0,children:"Currently running"})]}),(0,p.jsxs)(D,{color:"#7C3AED",children:[(0,p.jsx)(C,{children:"Used This Month"}),(0,p.jsx)(E,{children:Se.usedThisMonth}),(0,p.jsx)(B,{positive:!0,children:"Promotion activations"})]}),(0,p.jsxs)(D,{color:"#D97706",children:[(0,p.jsx)(C,{children:"Generated Revenue"}),(0,p.jsx)(E,{children:(0,d.vv)(Se.totalRevenue,fe)}),(0,p.jsx)(B,{positive:!0,children:"From all promotions"})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(k,{children:[(0,p.jsx)("span",{children:"Promotion"}),(0,p.jsx)("span",{style:{textAlign:"center"},children:"Type"}),(0,p.jsx)("span",{children:"Restaurants"}),(0,p.jsx)("span",{style:{textAlign:"center"},children:"Dates"}),(0,p.jsx)("span",{style:{textAlign:"right"},children:"Usage"}),(0,p.jsx)("span",{style:{textAlign:"right"},children:"Revenue"}),(0,p.jsx)("span",{style:{textAlign:"center"},children:"Status"}),(0,p.jsx)("span",{children:"Actions"})]}),0===de.length?(0,p.jsxs)(s.pp,{children:[(0,p.jsx)(X,{children:"\ud83c\udfaf"}),(0,p.jsx)(Z,{children:i||"all"!==te||"all"!==re||"all"!==t?"No promotions found with the current filters":"No promotions created yet"}),(0,p.jsx)(v,{variant:"primary",onClick:$e,children:"Create First Promotion"})]}):(0,p.jsxs)(p.Fragment,{children:[de.map(e=>(0,p.jsxs)(z,{onClick:()=>ze(e),children:[(0,p.jsxs)($,{children:[(0,p.jsx)(O,{children:e.name}),(0,p.jsx)(P,{children:e.discountText})]}),(0,p.jsx)("div",{style:{textAlign:"center"},children:(0,p.jsx)(R,{type:e.type,children:ke(e.type)})}),(0,p.jsx)(L,{children:(0,p.jsx)("div",{style:{fontSize:"12px"},children:e.restaurantNames.length>2?`${e.restaurantNames.slice(0,2).join(", ")} +${e.restaurantNames.length-2}`:e.restaurantNames.join(", ")})}),(0,p.jsxs)(L,{style:{textAlign:"center"},children:[(0,p.jsx)("div",{children:Re(e.startDate)}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["to ",Re(e.endDate)]})]}),(0,p.jsxs)(L,{style:{textAlign:"right"},children:[e.usageCount," / ",e.usageLimit||"\u221e"]}),(0,p.jsx)(L,{style:{color:"#059669",fontWeight:"600",textAlign:"right"},children:(0,d.vv)(e.generatedRevenue,fe)}),(0,p.jsx)("div",{style:{textAlign:"center"},children:(0,p.jsx)(T,{status:e.status,children:e.status})}),(0,p.jsxs)(_,{onClick:e=>e.stopPropagation(),children:[(0,p.jsx)(M,{onClick:()=>Oe(e),children:"Edit"}),(0,p.jsx)(M,{onClick:()=>Pe(e),children:"Copy"}),(0,p.jsx)(M,{onClick:()=>{return t=e.id,void le(oe.map(e=>e.id===t?{...e,status:"active"===e.status?"paused":"active"}:e));var t},children:"active"===e.status?"Pause":"Activate"})]})]},e.id)),(0,p.jsx)(N,{children:de.map(e=>(0,p.jsxs)(V,{onClick:()=>ze(e),children:[(0,p.jsxs)(U,{children:[(0,p.jsxs)($,{children:[(0,p.jsx)(O,{children:e.name}),(0,p.jsx)(P,{children:e.discountText})]}),(0,p.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,p.jsx)(R,{type:e.type,children:ke(e.type)}),(0,p.jsx)(T,{status:e.status,children:e.status})]})]}),(0,p.jsxs)(W,{children:[(0,p.jsxs)("span",{children:[e.usageCount," used"]}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,d.vv)(e.generatedRevenue,fe)}),(0,p.jsx)("span",{children:Re(e.endDate)})]})]},e.id))})]})]})]}),ue&&(0,p.jsx)(a.aF,{isOpen:!0,onClose:()=>he(!1),title:"Promotion Details",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>he(!1),children:"Close"}),pe&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>{he(!1),Oe(pe)},children:"Edit Promotion"}),(0,p.jsx)(v,{variant:"primary",onClick:()=>{he(!1),Pe(pe)},children:"Duplicate"})]})]}),children:pe&&(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:0},children:pe.name}),(0,p.jsx)(R,{type:pe.type,children:ke(pe.type)}),(0,p.jsx)(T,{status:pe.status,children:pe.status})]}),(0,p.jsx)("p",{style:{color:"#6B7280",margin:"0 0 16px 0"},children:pe.description})]}),(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Discount Details"}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Discount:"})," ",pe.discountText]}),(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Min Order:"})," ",pe.minOrderAmount?(0,d.vv)(pe.minOrderAmount,fe):"No minimum"]}),(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Max Discount:"})," ",pe.maxDiscount?(0,d.vv)(pe.maxDiscount,fe):"No limit"]})]})]}),(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Usage & Performance"}),(0,p.jsxs)("div",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.5"},children:[(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Usage:"})," ",pe.usageCount," / ",pe.usageLimit||"\u221e"]}),(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Revenue:"})," ",(0,d.vv)(pe.generatedRevenue,fe)]}),(0,p.jsxs)("p",{children:[(0,p.jsx)("strong",{children:"Created:"})," ",Re(pe.createdDate)]})]})]})]}),(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Valid Period"}),(0,p.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:[(0,p.jsx)("strong",{children:"From:"})," ",Re(pe.startDate)," ",(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"To:"})," ",Re(pe.endDate)]})]}),(0,p.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Applied Restaurants"}),(0,p.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:pe.restaurantNames.map((e,t)=>(0,p.jsx)("span",{style:{padding:"6px 12px",background:"#F3F4F6",borderRadius:"6px",fontSize:"13px",color:"#6B7280"},children:e},t))})]}),pe.conditions.length>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",marginBottom:"12px"},children:"Terms & Conditions"}),(0,p.jsx)("ul",{style:{fontSize:"14px",color:"#374151",paddingLeft:"20px"},children:pe.conditions.map((e,t)=>(0,p.jsx)("li",{style:{marginBottom:"4px"},children:e},t))})]})]})}),ge&&(0,p.jsx)(a.aF,{isOpen:!0,onClose:()=>me(!1),title:ve?"Edit Promotion":"Create New Promotion",size:"large",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>me(!1),children:"Cancel"}),(0,p.jsx)(v,{variant:"primary",onClick:()=>{const e="percentage"===Fe.type?`${Fe.discountValue}% off`:"fixed_amount"===Fe.type?`${(0,d.vv)(Fe.discountValue,fe)} off`:"bogo"===Fe.type?`BOGO ${Fe.discountValue}% off`:"free_shipping"===Fe.type?"Free delivery":`${Fe.discountValue}% off (Happy Hour)`,t=we.filter(e=>Fe.restaurants.includes(e.id)).map(e=>`${e.name} - ${e.location}`),n={id:(null===ve||void 0===ve?void 0:ve.id)||`promo-${Date.now()}`,name:Fe.name,type:Fe.type,discountValue:parseFloat(Fe.discountValue),discountText:e,restaurants:Fe.restaurants,restaurantNames:t,startDate:Fe.startDate,endDate:Fe.endDate,usageCount:(null===ve||void 0===ve?void 0:ve.usageCount)||0,usageLimit:Fe.usageLimit?parseInt(Fe.usageLimit):null,minOrderAmount:Fe.minOrderAmount?parseFloat(Fe.minOrderAmount):null,maxDiscount:Fe.maxDiscount?parseFloat(Fe.maxDiscount):null,status:"active",createdDate:(null===ve||void 0===ve?void 0:ve.createdDate)||(new Date).toISOString().split("T")[0],description:Fe.description,conditions:[],generatedRevenue:(null===ve||void 0===ve?void 0:ve.generatedRevenue)||0};le(ve?oe.map(e=>e.id===ve.id?n:e):[...oe,n]),me(!1)},children:ve?"Update Promotion":"Create Promotion"})]}),children:(0,p.jsxs)("div",{children:[(0,p.jsxs)(H,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Promotion Name *"}),(0,p.jsx)(Y,{type:"text",value:Fe.name,onChange:e=>Ae({...Fe,name:e.target.value}),placeholder:"e.g., Summer Special 2025"})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Promotion Type *"}),(0,p.jsxs)(q,{value:Fe.type,onChange:e=>Ae({...Fe,type:e.target.value}),children:[(0,p.jsx)("option",{value:"percentage",children:"Percentage Discount"}),(0,p.jsx)("option",{value:"fixed_amount",children:"Fixed Amount Discount"}),(0,p.jsx)("option",{value:"bogo",children:"Buy One Get One"}),(0,p.jsx)("option",{value:"free_shipping",children:"Free Delivery"}),(0,p.jsx)("option",{value:"happy_hour",children:"Happy Hour / Time-based"})]})]})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Discount Value *"}),(0,p.jsx)(Y,{type:"number",value:Fe.discountValue,onChange:e=>Ae({...Fe,discountValue:e.target.value}),placeholder:"percentage"===Fe.type?"15":"10",step:"percentage"===Fe.type?"1":"0.01"})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Minimum Order Amount"}),(0,p.jsx)(Y,{type:"number",value:Fe.minOrderAmount,onChange:e=>Ae({...Fe,minOrderAmount:e.target.value}),placeholder:"50.00",step:"0.01"})]})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Start Date *"}),(0,p.jsx)(Y,{type:"date",value:Fe.startDate,onChange:e=>Ae({...Fe,startDate:e.target.value})})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"End Date *"}),(0,p.jsx)(Y,{type:"date",value:Fe.endDate,onChange:e=>Ae({...Fe,endDate:e.target.value})})]})]}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Usage Limit (Optional)"}),(0,p.jsx)(Y,{type:"number",value:Fe.usageLimit,onChange:e=>Ae({...Fe,usageLimit:e.target.value}),placeholder:"Leave empty for unlimited"})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Maximum Discount Amount"}),(0,p.jsx)(Y,{type:"number",value:Fe.maxDiscount,onChange:e=>Ae({...Fe,maxDiscount:e.target.value}),placeholder:"20.00",step:"0.01"})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Apply to Restaurants *"}),(0,p.jsx)(K,{children:we.map(e=>(0,p.jsxs)(Q,{children:[(0,p.jsx)("input",{type:"checkbox",checked:Fe.restaurants.includes(e.id),onChange:t=>{t.target.checked?Ae({...Fe,restaurants:[...Fe.restaurants,e.id]}):Ae({...Fe,restaurants:Fe.restaurants.filter(t=>t!==e.id)})}}),e.name," - ",e.location]},e.id))})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(G,{children:"Description"}),(0,p.jsx)(J,{value:Fe.description,onChange:e=>Ae({...Fe,description:e.target.value}),placeholder:"Describe the promotion and its terms...",rows:3})]})]})})]}),(0,p.jsx)(c.A,{isOpen:De,title:"Delete Promotion",message:"Are you sure you want to delete this promotion? This action cannot be undone.",onConfirm:()=>{Ce(!1),le(oe.filter(e=>e.id!==Ee)),Be("")},onCancel:()=>{Ce(!1),Be("")},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),a=n(6038);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(a.DL)),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";n(r)}else n("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),n("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:o,error:d}}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var r=n(4752),i=n(9610),a=n(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=r.Ay.div`
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
`,x=e=>{let{isOpen:t,title:n,message:r,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(o,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(d,{children:r})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}}}]);