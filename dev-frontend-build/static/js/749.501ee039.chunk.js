"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[749],{749:(e,n,r)=>{r.r(n),r.d(n,{default:()=>_});var a=r(9950),t=r(4492),i=r(4752),o=r(3310),s=r(2674),d=r(7617),l=r(4021),c=r(6038),h=r(8666),p=r(4414);const x=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=i.Ay.div`
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
`,g=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
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
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
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
`,f=i.Ay.div`
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
`,b=i.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,w=i.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,A=i.Ay.div`
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
`,C=i.Ay.div`
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
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,M=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,S=i.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>e.score>=90?"#059669":e.score>=70?"#2563EB":e.score>=50?"#D97706":"#DC2626"};
`,B=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,k=i.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,E=i.Ay.select`
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
`,R=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,$=(0,i.Ay)(s.$n)`
  background: #DC2626;
  color: white;
  border: none;

  &:hover {
    background: #B91C1C;
  }
`,z=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,T=i.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"edit"===e.variant?"\n    background: #EBF8FF;\n    border-color: #2563EB;\n    color: #2563EB;\n\n    &:hover {\n      background: #DBEAFE;\n    }\n  ":"\n    background: #FEF2F2;\n    border-color: #DC2626;\n    color: #DC2626;\n\n    &:hover {\n      background: #FECACA;\n    }\n  "}
`,D=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,P=i.Ay.label`
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
`,_=()=>{const e=(0,t.Zp)(),[n,r]=(0,a.useState)("overview"),[i,_]=(0,a.useState)([]),[,O]=(0,a.useState)([]),[G,I]=(0,a.useState)("month"),[N,L]=(0,a.useState)(!1),{defaultCurrency:Q}=(0,l.i1)(),[q,Z]=(0,a.useState)("RM");(0,a.useEffect)(()=>{Q&&Z(Q)},[Q]);const[X,J]=(0,a.useState)(!1),[U,Y]=(0,a.useState)(null),[H,W]=(0,a.useState)(!1),[K,V]=(0,a.useState)({name:"",email:"",phone:"",assignedBrand:"",password:"",permissions:[]}),[ee,ne]=(0,a.useState)({totalBrands:0,totalStores:0,totalManagers:0,monthlyRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,marketShare:0,growthRate:0,customerSatisfaction:0,activePromotions:0,newFranchises:0,totalTransactions:0});(0,a.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 Starting brand data fetch...");const e=localStorage.getItem("auth_token"),n=await fetch("/api/users?role=Brand Manager",{headers:{Authorization:`Bearer ${e}`}});let r=[];if(n.ok){const e=await n.json(),a=Array.isArray(e)?e:Array.isArray(e.data)?e.data:[];console.log("\ud83d\udc65 Fetched brand managers:",(null===a||void 0===a?void 0:a.length)||0),r=a.map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,assignedBrand:`Brand ${e.id}`,storeCount:Math.floor(15*Math.random())+3,monthlyRevenue:Math.floor(8e4*Math.random())+2e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low"}))}else console.error("Failed to fetch brand managers:",n.status);_(r);const a={...ee,totalManagers:r.length,totalBrands:r.length,totalStores:r.reduce((e,n)=>e+n.storeCount,0),monthlyRevenue:r.reduce((e,n)=>e+n.monthlyRevenue,0),marketShare:15*Math.random()+10,growthRate:25*Math.random()+8,customerSatisfaction:1.5*Math.random()+3.5,activePromotions:Math.floor(12*Math.random())+3,newFranchises:Math.floor(8*Math.random())+2};a.averageRevenuePerStore=a.totalStores>0?a.monthlyRevenue/a.totalStores:0,ne(a);const t=["Jan","Feb","Mar","Apr","May","Jun"].map(e=>({period:e,revenue:Math.floor(15e4*Math.random())+8e4,storeCount:Math.floor(10*Math.random())+25}));O(t)}catch(e){console.error("Error fetching brand data:",e)}})()},[]);return(0,p.jsx)(o.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(m,{children:(0,p.jsx)(u,{children:"Brand General Dashboard"})}),(0,p.jsxs)(g,{children:[(0,p.jsxs)(s.j,{children:[(0,p.jsx)(s.oz,{active:"overview"===n,onClick:()=>r("overview"),children:"Overview"}),(0,p.jsxs)(s.oz,{active:"managers"===n,onClick:()=>r("managers"),children:["Brand Managers (",ee.totalManagers,")"]})]}),"overview"===n&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(s.Ot,{children:[(0,p.jsxs)(s.XS,{children:[(0,p.jsx)(s.G$,{children:ee.totalBrands}),(0,p.jsx)(s.h2,{children:"Managed Brands"})]}),(0,p.jsxs)(s.XS,{children:[(0,p.jsx)(s.G$,{children:ee.totalStores}),(0,p.jsx)(s.h2,{children:"Total Franchises"})]}),(0,p.jsxs)(s.XS,{children:[(0,p.jsx)(s.G$,{children:(0,c.vv)(ee.monthlyRevenue,q)}),(0,p.jsx)(s.h2,{children:"Monthly Revenue"})]}),(0,p.jsxs)(s.XS,{children:[(0,p.jsxs)(s.G$,{children:[ee.marketShare.toFixed(1),"%"]}),(0,p.jsx)(s.h2,{children:"Market Share"})]})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(y,{children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,p.jsx)("h3",{children:"Monthly Brand Revenue Trend"}),(0,p.jsxs)(E,{value:G,onChange:e=>I(e.target.value),children:[(0,p.jsx)("option",{value:"week",children:"This Week"}),(0,p.jsx)("option",{value:"month",children:"This Month"}),(0,p.jsx)("option",{value:"quarter",children:"Quarter"}),(0,p.jsx)("option",{value:"year",children:"This Year"})]})]}),(0,p.jsx)(k,{children:"Monthly Brand Revenue Chart (Coming Soon)"})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)("h3",{children:"Brand Status"}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:"Customer Satisfaction"}),(0,p.jsxs)(w,{children:[ee.customerSatisfaction.toFixed(1),"/5.0"]})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:"Active Promotions"}),(0,p.jsx)(w,{children:ee.activePromotions})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:"New Franchises"}),(0,p.jsx)(w,{children:ee.newFranchises})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:"Average Revenue per Store"}),(0,p.jsx)(w,{children:(0,c.vv)(ee.averageRevenuePerStore,q)})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:"Growth Rate (vs Last Month)"}),(0,p.jsxs)(w,{children:["+",ee.growthRate.toFixed(1),"%"]})]})]})]})]}),"managers"===n&&(0,p.jsxs)(A,{children:[(0,p.jsxs)(R,{children:[(0,p.jsx)("h3",{children:"Brand Manager Team"}),(0,p.jsx)($,{onClick:()=>{W(!1),Y(null),V({name:"",email:"",phone:"",assignedBrand:"",password:"",permissions:[]}),L(!0)},children:"Add Manager"})]}),0===i.length?(0,p.jsx)(k,{children:"\ud83d\udc65 Loading brand manager data..."}):i.map(n=>{var r;return(0,p.jsxs)(C,{children:[(0,p.jsxs)("div",{onClick:()=>e(`/manager/profile/${n.id}`),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(M,{children:n.name}),(0,p.jsxs)(S,{score:n.performanceScore,children:[n.performanceScore," pts"]})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)("span",{children:[n.assignedBrand," \u2022 ",n.storeCount," stores"]}),(0,p.jsxs)("span",{children:[(0,c.vv)(n.monthlyRevenue,q),"/month"]})]}),(0,p.jsxs)(B,{style:{marginTop:"4px"},children:[(0,p.jsx)("span",{children:n.email}),(0,p.jsxs)("span",{children:["Permissions: ",(null===(r=n.permissions)||void 0===r?void 0:r.length)||0]})]})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(T,{variant:"edit",onClick:()=>(e=>{W(!0),Y(e),V({name:e.name,email:e.email,phone:e.phone||"",assignedBrand:e.assignedBrand,password:"",permissions:e.permissions||[]}),L(!0)})(n),children:"Edit"}),(0,p.jsx)(T,{variant:"delete",onClick:()=>(e=>{Y(e),J(!0)})(n),children:"Delete"})]})]},n.id)})]}),(0,p.jsx)(s.zf,{isOpen:N,onClose:()=>L(!1),title:H?"Edit Manager Information":"Add New Manager",children:(0,p.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const e=H&&U?`/api/users/${U.id}`:"/api/users",n=H?"PUT":"POST",r={...K,role:"Brand Manager",first_name:K.name.split(" ")[0],last_name:K.name.split(" ").slice(1).join(" ")||"",...K.password&&{password:K.password}};if((await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){L(!1);const e=localStorage.getItem("auth_token"),n=await fetch("/api/users?role=Brand Manager",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json(),r=(Array.isArray(e)?e:Array.isArray(e.data)?e.data:[]).map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,phone:e.phone||"",assignedBrand:`Brand ${e.id}`,storeCount:Math.floor(15*Math.random())+3,monthlyRevenue:Math.floor(8e4*Math.random())+2e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low",permissions:e.permissions||[]}));_(r)}else console.error("Failed to refresh managers list:",n.status)}else console.error("Failed to save manager")}catch(n){console.error("Error saving manager:",n)}},children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Name"}),(0,p.jsx)(s.ZQ,{type:"text",value:K.name,onChange:e=>V(n=>({...n,name:e.target.value})),required:!0})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Email"}),(0,p.jsx)(s.ZQ,{type:"email",value:K.email,onChange:e=>V(n=>({...n,email:e.target.value})),required:!0})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Phone Number"}),(0,p.jsx)(h.A,{value:K.phone,onChange:e=>V(n=>({...n,phone:e}))})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Assigned Brand"}),(0,p.jsx)(s.ZQ,{type:"text",value:K.assignedBrand,onChange:e=>V(n=>({...n,assignedBrand:e.target.value})),required:!0})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:H?"New Password (only when changing)":"Password"}),(0,p.jsx)(s.ZQ,{type:"password",value:K.password,onChange:e=>V(n=>({...n,password:e.target.value})),required:!H})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Permission Settings"}),(0,p.jsx)(D,{children:["Franchise Management","Brand Marketing","Sales Management","Customer Management","Promotion Management","Report Generation","New Franchise","Quality Management"].map(e=>(0,p.jsxs)(P,{children:[(0,p.jsx)("input",{type:"checkbox",checked:K.permissions.includes(e),onChange:n=>((e,n)=>{V(n?n=>({...n,permissions:[...n.permissions,e]}):n=>({...n,permissions:n.permissions.filter(n=>n!==e)}))})(e,n.target.checked)}),e]},e))})]}),(0,p.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,p.jsx)(s.$n,{type:"button",variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,p.jsx)(s.$n,{type:"submit",children:H?"Update":"Add"})]})]})}),(0,p.jsx)(d.A,{isOpen:X,title:"Delete Manager",message:`Are you sure you want to delete manager '${null===U||void 0===U?void 0:U.name}'? This action cannot be undone.`,onConfirm:async()=>{if(U)try{(await fetch(`/api/users/${U.id}`,{method:"DELETE"})).ok?(_(i.filter(e=>e.id!==U.id)),J(!1),Y(null)):console.error("Failed to delete manager")}catch(e){console.error("Error deleting manager:",e)}},onCancel:()=>{J(!1),Y(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var a=r(9950),t=r(1367),i=r(6038);const o=()=>{const{user:e}=(0,t.As)(),[n,r]=(0,a.useState)("RM"),[o,s]=(0,a.useState)(Object.keys(i.DL)),[d,l]=(0,a.useState)(!0),[c,h]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let t=a>=0?n[a+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(a)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),h("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:d,error:c}}},7617:(e,n,r)=>{r.d(n,{A:()=>p});r(9950);var a=r(4752),t=r(9610),i=r(4414);const o=a.Ay.div`
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