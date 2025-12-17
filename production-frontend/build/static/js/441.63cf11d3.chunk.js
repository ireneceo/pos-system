"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,n,r)=>{r.r(n),r.d(n,{default:()=>D});var o=r(9950),t=r(4492),a=r(4752),i=r(3310),s=r(7492),d=r(7617),l=r(4414);const c=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=a.Ay.div`
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
`,h=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`,m=a.Ay.div`
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
`,u=a.Ay.div`
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
`,j=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,v=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,f=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,y=a.Ay.div`
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
`,b=a.Ay.div`
  padding: 16px;
  border: 1px solid #F3F4F6;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #7C3AED;
    background: #FEFBFF;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,F=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,w=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,A=a.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>e.score>=90?"#059669":e.score>=70?"#2563EB":e.score>=50?"#D97706":"#DC2626"};
`,C=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,M=a.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,E=a.Ay.select`
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
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,R=(0,a.Ay)(s.$n)`
  background: #7C3AED;
  color: white;
  border: none;

  &:hover {
    background: #6D28D9;
  }
`,S=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,B=a.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"edit"===e.variant?"\n    background: #EBF8FF;\n    border-color: #2563EB;\n    color: #2563EB;\n\n    &:hover {\n      background: #DBEAFE;\n    }\n  ":"\n    background: #FEF2F2;\n    border-color: #DC2626;\n    color: #DC2626;\n\n    &:hover {\n      background: #FECACA;\n    }\n  "}
`,$=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,z=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #7C3AED;
  }
`,D=()=>{const e=(0,t.Zp)(),[n,r]=(0,o.useState)("overview"),[a,D]=(0,o.useState)([]),[T,O]=(0,o.useState)("month"),[q,L]=(0,o.useState)(!1),[_,P]=(0,o.useState)(!1),[G,Z]=(0,o.useState)(null),[Q,I]=(0,o.useState)(!1),[X,J]=(0,o.useState)({name:"",email:"",phone:"",assignedFoodcourt:"",password:"",permissions:[]}),[K,H]=(0,o.useState)({totalFoodcourts:0,totalStores:0,totalManagers:0,monthlyRentRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,occupancyRate:0,growthRate:0,maintenanceRequests:0,activeLeases:0,pendingApplications:0,totalTransactions:0});(0,o.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 Starting foodcourt data fetch...");const e=await fetch("/api/users?role=Foodcourt Manager");if(e.ok){const n=await e.json(),r=n.data||n;console.log("\ud83d\udc65 Fetched foodcourt managers:",(null===r||void 0===r?void 0:r.length)||0);const o=r.map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,assignedFoodcourt:`Foodcourt ${e.id}`,storeCount:Math.floor(20*Math.random())+5,monthlyRevenue:Math.floor(5e4*Math.random())+1e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low"}));D(o);const t={...K,totalManagers:o.length,totalFoodcourts:Math.ceil(o.length/2),totalStores:o.reduce((e,n)=>e+n.storeCount,0),monthlyRentRevenue:o.reduce((e,n)=>e+n.monthlyRevenue,0),occupancyRate:30*Math.random()+70,growthRate:20*Math.random()+5,activeLeases:o.reduce((e,n)=>e+n.storeCount,0),pendingApplications:Math.floor(15*Math.random())+5,maintenanceRequests:Math.floor(10*Math.random())+2};t.averageRevenuePerStore=t.totalStores>0?t.monthlyRentRevenue/t.totalStores:0,H(t);["Jan","Feb","Mar","Apr","May","Jun"].map(e=>({period:e,revenue:Math.floor(1e5*Math.random())+5e4,storeCount:Math.floor(20*Math.random())+40}))}}catch(e){console.error("Error fetching foodcourt data:",e)}})()},[]);return(0,l.jsx)(i.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(x,{children:"Foodcourt General Dashboard"})}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(s.j,{children:[(0,l.jsx)(s.oz,{active:"overview"===n,onClick:()=>r("overview"),children:"Overview"}),(0,l.jsxs)(s.oz,{active:"managers"===n,onClick:()=>r("managers"),children:["\ud300 \ub9e4\ub2c8\uc800 (",K.totalManagers,")"]})]}),"overview"===n&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(s.Ot,{children:[(0,l.jsxs)(s.XS,{children:[(0,l.jsx)(s.G$,{children:K.totalFoodcourts}),(0,l.jsx)(s.h2,{children:"Managed Foodcourts"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsx)(s.G$,{children:K.totalStores}),(0,l.jsx)(s.h2,{children:"Total Rental Stores"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsxs)(s.G$,{children:["RM ",(K.monthlyRentRevenue/1e3).toFixed(0),"K"]}),(0,l.jsx)(s.h2,{children:"Monthly Rental Revenue"})]}),(0,l.jsxs)(s.XS,{children:[(0,l.jsxs)(s.G$,{children:[K.occupancyRate.toFixed(1),"%"]}),(0,l.jsx)(s.h2,{children:"Average Occupancy Rate"})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,l.jsx)("h3",{children:"\uc6d4\ubcc4 \uc784\ub300 \uc218\uc775 \ucd94\uc774"}),(0,l.jsxs)(E,{value:T,onChange:e=>O(e.target.value),children:[(0,l.jsx)("option",{value:"week",children:"\uc774\ubc88 \uc8fc"}),(0,l.jsx)("option",{value:"month",children:"\uc774\ubc88 \ub2ec"}),(0,l.jsx)("option",{value:"quarter",children:"\ubd84\uae30"}),(0,l.jsx)("option",{value:"year",children:"\uc62c\ud574"})]})]}),(0,l.jsx)(M,{children:"\ud83d\udcca \uc6d4\ubcc4 \uc784\ub300 \uc218\uc775 \ucc28\ud2b8 (\uac1c\ubc1c \uc608\uc815)"})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)("h3",{children:"\uc6b4\uc601 \ud604\ud669"}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"\ud65c\uc131 \uc784\ub300 \uacc4\uc57d"}),(0,l.jsx)(f,{children:K.activeLeases})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"\uc784\ub300 \uc2e0\uccad \ub300\uae30"}),(0,l.jsx)(f,{children:K.pendingApplications})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"\uc720\uc9c0\ubcf4\uc218 \uc694\uccad"}),(0,l.jsx)(f,{children:K.maintenanceRequests})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"\ud3c9\uade0 \ub9e4\uc7a5\ub2f9 \uc218\uc775"}),(0,l.jsxs)(f,{children:["RM ",K.averageRevenuePerStore.toFixed(0)]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:"\uc131\uc7a5\ub960 (\uc804\uc6d4 \ub300\ube44)"}),(0,l.jsxs)(f,{children:["+",K.growthRate.toFixed(1),"%"]})]})]})]})]}),"managers"===n&&(0,l.jsxs)(y,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)("h3",{children:"Foodcourt Manager Team"}),(0,l.jsx)(R,{onClick:()=>{I(!1),Z(null),J({name:"",email:"",phone:"",assignedFoodcourt:"",password:"",permissions:[]}),L(!0)},children:"+ Add Manager"})]}),0===a.length?(0,l.jsx)(M,{children:"\ud83d\udc65 Loading Foodcourt manager data..."}):a.map(n=>{var r;return(0,l.jsxs)(b,{children:[(0,l.jsxs)("div",{onClick:()=>e(`/manager/profile/${n.id}`),children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(w,{children:n.name}),(0,l.jsxs)(A,{score:n.performanceScore,children:[n.performanceScore,"\uc810"]})]}),(0,l.jsxs)(C,{children:[(0,l.jsxs)("span",{children:[n.assignedFoodcourt," \u2022 ",n.storeCount,"\uac1c \ub9e4\uc7a5"]}),(0,l.jsxs)("span",{children:["RM ",(n.monthlyRevenue/1e3).toFixed(0),"K/\uc6d4"]})]}),(0,l.jsxs)(C,{style:{marginTop:"4px"},children:[(0,l.jsx)("span",{children:n.email}),(0,l.jsxs)("span",{children:["\uad8c\ud55c: ",(null===(r=n.permissions)||void 0===r?void 0:r.length)||0,"\uac1c"]})]})]}),(0,l.jsxs)(S,{children:[(0,l.jsx)(B,{variant:"edit",onClick:()=>(e=>{I(!0),Z(e),J({name:e.name,email:e.email,phone:e.phone||"",assignedFoodcourt:e.assignedFoodcourt,password:"",permissions:e.permissions||[]}),L(!0)})(n),children:"\uc218\uc815"}),(0,l.jsx)(B,{variant:"delete",onClick:()=>(e=>{Z(e),P(!0)})(n),children:"\uc0ad\uc81c"})]})]},n.id)})]}),(0,l.jsx)(s.zf,{isOpen:q,onClose:()=>L(!1),title:Q?"\ub9e4\ub2c8\uc800 \uc815\ubcf4 \uc218\uc815":"\uc0c8 \ub9e4\ub2c8\uc800 \ucd94\uac00",children:(0,l.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const e=Q&&G?`/api/users/${G.id}`:"/api/users",n=Q?"PUT":"POST",r={...X,role:"Foodcourt Manager",first_name:X.name.split(" ")[0],last_name:X.name.split(" ").slice(1).join(" ")||"",...X.password&&{password:X.password}};if((await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){L(!1);const e=await fetch("/api/users?role=Foodcourt Manager");if(e.ok){const n=await e.json(),r=(n.data||n).map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,phone:e.phone||"",assignedFoodcourt:`Foodcourt ${e.id}`,storeCount:Math.floor(20*Math.random())+5,monthlyRevenue:Math.floor(5e4*Math.random())+1e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low",permissions:e.permissions||[]}));D(r)}}else console.error("Failed to save manager")}catch(n){console.error("Error saving manager:",n)}},children:[(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"\uc774\ub984"}),(0,l.jsx)(s.ZQ,{type:"text",value:X.name,onChange:e=>J(n=>({...n,name:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"\uc774\uba54\uc77c"}),(0,l.jsx)(s.ZQ,{type:"email",value:X.email,onChange:e=>J(n=>({...n,email:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"\uc804\ud654\ubc88\ud638"}),(0,l.jsx)(s.ZQ,{type:"tel",value:X.phone,onChange:e=>J(n=>({...n,phone:e.target.value}))})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"Assigned Foodcourt"}),(0,l.jsx)(s.ZQ,{type:"text",value:X.assignedFoodcourt,onChange:e=>J(n=>({...n,assignedFoodcourt:e.target.value})),required:!0})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:Q?"\uc0c8 \ube44\ubc00\ubc88\ud638 (\ubcc0\uacbd\uc2dc\uc5d0\ub9cc)":"\ube44\ubc00\ubc88\ud638"}),(0,l.jsx)(s.ZQ,{type:"password",value:X.password,onChange:e=>J(n=>({...n,password:e.target.value})),required:!Q})]}),(0,l.jsxs)(s.gE,{children:[(0,l.jsx)(s.lR,{children:"\uad8c\ud55c \uc124\uc815"}),(0,l.jsx)($,{children:["Store Management","Lease Contract","Revenue Management","Maintenance Request","Report Generation","Customer Management","Promotion Management","Inventory Management"].map(e=>(0,l.jsxs)(z,{children:[(0,l.jsx)("input",{type:"checkbox",checked:X.permissions.includes(e),onChange:n=>((e,n)=>{J(n?n=>({...n,permissions:[...n.permissions,e]}):n=>({...n,permissions:n.permissions.filter(n=>n!==e)}))})(e,n.target.checked)}),e]},e))})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,l.jsx)(s.$n,{type:"button",variant:"secondary",onClick:()=>L(!1),children:"\ucde8\uc18c"}),(0,l.jsx)(s.$n,{type:"submit",children:Q?"\uc218\uc815":"\ucd94\uac00"})]})]})}),(0,l.jsx)(d.A,{isOpen:_,title:"\ub9e4\ub2c8\uc800 \uc0ad\uc81c",message:`'${null===G||void 0===G?void 0:G.name}' \ub9e4\ub2c8\uc800\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c? \uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.`,onConfirm:async()=>{if(G)try{(await fetch(`/api/users/${G.id}`,{method:"DELETE"})).ok?(D(a.filter(e=>e.id!==G.id)),P(!1),Z(null)):console.error("Failed to delete manager")}catch(e){console.error("Error deleting manager:",e)}},onCancel:()=>{P(!1),Z(null)},confirmText:"\uc0ad\uc81c",cancelText:"\ucde8\uc18c",type:"danger"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>h});r(9950);var o=r(4752),t=r(9610),a=r(4414);const i=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=o.Ay.button`
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
`,h=e=>{let{isOpen:n,title:r,message:o,onConfirm:h,onCancel:x,confirmText:g="Confirm",cancelText:m="Cancel",type:u="warning"}=e;return n?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,a.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:r}),(0,a.jsx)(l,{children:o})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:x,children:m}),(0,a.jsx)(p,{variant:"primary",type:u,onClick:h,children:g})]})]})}):null}}}]);