"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,r)=>{r.r(n),r.d(n,{default:()=>z});var a=r(9950),t=r(4492),i=r(4752),o=r(3310),s=r(7492),d=r(7617),l=r(4414);const c=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=i.Ay.div`
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
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
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
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,g=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,u=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,j=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,f=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,y=i.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;

  h3 {
    margin: 0 0 20px 0;
    color: #0A2540;
    font-size: 18px;
    font-weight: 600;
  }
`,b=i.Ay.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #DC2626;
    background: #FEF2F2;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,A=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,F=i.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>e.score>=90?"#059669":e.score>=70?"#2563EB":e.score>=50?"#D97706":"#DC2626"};
`,C=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,M=i.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,B=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,k=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,S=(0,i.Ay)(s.$n)`
  background: #DC2626;
  color: white;
  border: none;

  &:hover {
    background: #B91C1C;
  }
`,E=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,R=i.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"edit"===e.variant?"\n    background: #EBF8FF;\n    border-color: #2563EB;\n    color: #2563EB;\n\n    &:hover {\n      background: #DBEAFE;\n    }\n  ":"\n    background: #FEF2F2;\n    border-color: #DC2626;\n    color: #DC2626;\n\n    &:hover {\n      background: #FECACA;\n    }\n  "}
`,$=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,T=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #DC2626;
  }
`,z=()=>{const e=(0,t.Zp)(),[n,r]=(0,a.useState)("overview"),[i,z]=(0,a.useState)([]),[,D]=(0,a.useState)([]),[P,O]=(0,a.useState)("month"),[_,G]=(0,a.useState)(!1),[N,Q]=(0,a.useState)(!1),[Z,q]=(0,a.useState)(null),[L,I]=(0,a.useState)(!1),[X,J]=(0,a.useState)({name:"",email:"",phone:"",assignedBrand:"",password:"",permissions:[]}),[K,U]=(0,a.useState)({totalBrands:0,totalStores:0,totalManagers:0,monthlyRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,marketShare:0,growthRate:0,customerSatisfaction:0,activePromotions:0,newFranchises:0,totalTransactions:0});(0,a.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 Starting brand data fetch...");const e=await fetch("/api/users?role=Brand Manager");if(e.ok){const n=await e.json(),r=n.data||n;console.log("\ud83d\udc65 Fetched brand managers:",(null===r||void 0===r?void 0:r.length)||0);const a=r.map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,assignedBrand:`Brand ${e.id}`,storeCount:Math.floor(15*Math.random())+3,monthlyRevenue:Math.floor(8e4*Math.random())+2e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low"}));z(a);const t={...K,totalManagers:a.length,totalBrands:a.length,totalStores:a.reduce((e,n)=>e+n.storeCount,0),monthlyRevenue:a.reduce((e,n)=>e+n.monthlyRevenue,0),marketShare:15*Math.random()+10,growthRate:25*Math.random()+8,customerSatisfaction:1.5*Math.random()+3.5,activePromotions:Math.floor(12*Math.random())+3,newFranchises:Math.floor(8*Math.random())+2};t.averageRevenuePerStore=t.totalStores>0?t.monthlyRevenue/t.totalStores:0,U(t);const i=["Jan","Feb","Mar","Apr","May","Jun"].map(e=>({period:e,revenue:Math.floor(15e4*Math.random())+8e4,storeCount:Math.floor(10*Math.random())+25}));D(i)}}catch(e){console.error("Error fetching brand data:",e)}})()},[]);return(0,l.jsx)(o.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:(0,l.jsx)(x,{children:"Brand General Dashboard"})}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(s.j,{children:[(0,l.jsx)(s.oz,{active:"overview"===n,onClick:()=>r("overview"),children:"Overview"}),(0,l.jsxs)(s.oz,{active:"managers"===n,onClick:()=>r("managers"),children:["Brand Managers (",K.totalManagers,")"]})]}),"overview"===n&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(s.Ot,{children:[(0,l.jsxs)(s.XS,{children:[(0,l.jsx)(s.G$,{children:K.totalBrands}),(0,l.jsx)(s.h2,{children:"Managed Brands"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsx)(s.G$,{children:K.totalStores}),(0,l.jsx)(s.h2,{children:"Total Franchises"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsxs)(s.G$,{children:["RM ",(K.monthlyRevenue/1e3).toFixed(0),"K"]}),(0,l.jsx)(s.h2,{children:"Monthly Revenue"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsxs)(s.G$,{children:[K.marketShare.toFixed(1),"%"]}),(0,l.jsx)(s.h2,{children:"Market Share"})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(g,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,l.jsx)("h3",{children:"Monthly Brand Revenue Trend"}),(0,l.jsxs)(B,{value:P,onChange:e=>O(e.target.value),children:[(0,l.jsx)("option",{value:"week",children:"This Week"}),(0,l.jsx)("option",{value:"month",children:"This Month"}),(0,l.jsx)("option",{value:"quarter",children:"Quarter"}),(0,l.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,l.jsx)(M,{children:"Monthly Brand Revenue Chart (Coming Soon)"})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)("h3",{children:"Brand Status"}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"Customer Satisfaction"}),(0,l.jsxs)(f,{children:[K.customerSatisfaction.toFixed(1),"/5.0"]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"Active Promotions"}),(0,l.jsx)(f,{children:K.activePromotions})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"New Franchises"}),(0,l.jsx)(f,{children:K.newFranchises})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"Average Revenue per Store"}),(0,l.jsxs)(f,{children:["RM ",K.averageRevenuePerStore.toFixed(0)]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"Growth Rate (vs Last Month)"}),(0,l.jsxs)(f,{children:["+",K.growthRate.toFixed(1),"%"]})]})]})]})]}),"managers"===n&&(0,l.jsxs)(y,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)("h3",{children:"Brand Manager Team"}),(0,l.jsx)(S,{onClick:()=>{I(!1),q(null),J({name:"",email:"",phone:"",assignedBrand:"",password:"",permissions:[]}),G(!0)},children:"+ Add Manager"})]}),0===i.length?(0,l.jsx)(M,{children:"\ud83d\udc65 Loading brand manager data..."}):i.map(n=>{var r;return(0,l.jsxs)(b,{children:[(0,l.jsxs)("div",{onClick:()=>e(`/manager/profile/${n.id}`),children:[(0,l.jsxs)(w,{children:[(0,l.jsx)(A,{children:n.name}),(0,l.jsxs)(F,{score:n.performanceScore,children:[n.performanceScore," pts"]})]}),(0,l.jsxs)(C,{children:[(0,l.jsxs)("span",{children:[n.assignedBrand," \u2022 ",n.storeCount," stores"]}),(0,l.jsxs)("span",{children:["RM ",(n.monthlyRevenue/1e3).toFixed(0),"K/month"]})]}),(0,l.jsxs)(C,{style:{marginTop:"4px"},children:[(0,l.jsx)("span",{children:n.email}),(0,l.jsxs)("span",{children:["Permissions: ",(null===(r=n.permissions)||void 0===r?void 0:r.length)||0]})]})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(R,{variant:"edit",onClick:()=>(e=>{I(!0),q(e),J({name:e.name,email:e.email,phone:e.phone||"",assignedBrand:e.assignedBrand,password:"",permissions:e.permissions||[]}),G(!0)})(n),children:"Edit"}),(0,l.jsx)(R,{variant:"delete",onClick:()=>(e=>{q(e),Q(!0)})(n),children:"Delete"})]})]},n.id)})]}),(0,l.jsx)(s.zf,{isOpen:_,onClose:()=>G(!1),title:L?"Edit Manager Information":"Add New Manager",children:(0,l.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const e=L&&Z?`/api/users/${Z.id}`:"/api/users",n=L?"PUT":"POST",r={...X,role:"Brand Manager",first_name:X.name.split(" ")[0],last_name:X.name.split(" ").slice(1).join(" ")||"",...X.password&&{password:X.password}};if((await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){G(!1);const e=await fetch("/api/users?role=Brand Manager");if(e.ok){const n=await e.json(),r=(n.data||n).map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,phone:e.phone||"",assignedBrand:`Brand ${e.id}`,storeCount:Math.floor(15*Math.random())+3,monthlyRevenue:Math.floor(8e4*Math.random())+2e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low",permissions:e.permissions||[]}));z(r)}}else console.error("Failed to save manager")}catch(n){console.error("Error saving manager:",n)}},children:[(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Name"}),(0,l.jsx)(s.ZQ,{type:"text",value:X.name,onChange:e=>J(n=>({...n,name:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Email"}),(0,l.jsx)(s.ZQ,{type:"email",value:X.email,onChange:e=>J(n=>({...n,email:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Phone Number"}),(0,l.jsx)(s.ZQ,{type:"tel",value:X.phone,onChange:e=>J(n=>({...n,phone:e.target.value}))})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Assigned Brand"}),(0,l.jsx)(s.ZQ,{type:"text",value:X.assignedBrand,onChange:e=>J(n=>({...n,assignedBrand:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:L?"New Password (only when changing)":"Password"}),(0,l.jsx)(s.ZQ,{type:"password",value:X.password,onChange:e=>J(n=>({...n,password:e.target.value})),required:!L})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Permission Settings"}),(0,l.jsx)($,{children:["Franchise Management","Brand Marketing","Sales Management","Customer Management","Promotion Management","Report Generation","New Franchise","Quality Management"].map(e=>(0,l.jsxs)(T,{children:[(0,l.jsx)("input",{type:"checkbox",checked:X.permissions.includes(e),onChange:n=>((e,n)=>{J(n?n=>({...n,permissions:[...n.permissions,e]}):n=>({...n,permissions:n.permissions.filter(n=>n!==e)}))})(e,n.target.checked)}),e]},e))})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,l.jsx)(s.$n,{type:"button",variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,l.jsx)(s.$n,{type:"submit",children:L?"Update":"Add"})]})]})}),(0,l.jsx)(d.A,{isOpen:N,title:"Delete Manager",message:`Are you sure you want to delete manager '${null===Z||void 0===Z?void 0:Z.name}'? This action cannot be undone.`,onConfirm:async()=>{if(Z)try{(await fetch(`/api/users/${Z.id}`,{method:"DELETE"})).ok?(z(i.filter(e=>e.id!==Z.id)),Q(!1),q(null)):console.error("Failed to delete manager")}catch(e){console.error("Error deleting manager:",e)}},onCancel:()=>{Q(!1),q(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>p});r(9950);var a=r(4752),t=r(9610),i=r(4414);const o=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,h=a.Ay.button`
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
`,p=e=>{let{isOpen:n,title:r,message:a,onConfirm:p,onCancel:x,confirmText:m="Confirm",cancelText:g="Cancel",type:u="warning"}=e;return n?(0,i.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(d,{children:r}),(0,i.jsx)(l,{children:a})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(h,{variant:"secondary",onClick:x,children:g}),(0,i.jsx)(h,{variant:"primary",type:u,onClick:p,children:m})]})]})}):null}}}]);