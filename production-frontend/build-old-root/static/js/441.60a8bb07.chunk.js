"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[441],{441:(e,n,r)=>{r.r(n),r.d(n,{default:()=>T});var o=r(9950),t=r(4492),a=r(4752),i=r(3310),s=r(7492),d=r(7617),l=r(2874),c=r(4414);const p=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,h=a.Ay.div`
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
`,x=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
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
`,v=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,f=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,y=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,b=a.Ay.div`
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
`,F=a.Ay.div`
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
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,A=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,C=a.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${e=>e.score>=90?"#059669":e.score>=70?"#2563EB":e.score>=50?"#D97706":"#DC2626"};
`,M=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,E=a.Ay.div`
  height: 300px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-style: italic;
`,k=a.Ay.select`
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
`,R=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,S=(0,a.Ay)(s.$n)`
  background: #7C3AED;
  color: white;
  border: none;

  &:hover {
    background: #6D28D9;
  }
`,B=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`,$=a.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"edit"===e.variant?"\n    background: #EBF8FF;\n    border-color: #2563EB;\n    color: #2563EB;\n\n    &:hover {\n      background: #DBEAFE;\n    }\n  ":"\n    background: #FEF2F2;\n    border-color: #DC2626;\n    color: #DC2626;\n\n    &:hover {\n      background: #FECACA;\n    }\n  "}
`,z=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,D=a.Ay.label`
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
`,T=()=>{const e=(0,t.Zp)(),[n,r]=(0,o.useState)("overview"),[a,T]=(0,o.useState)([]),[O,q]=(0,o.useState)("month"),[L,_]=(0,o.useState)(!1),[P,G]=(0,o.useState)(!1),[Z,I]=(0,o.useState)(null),[Q,X]=(0,o.useState)(!1),[J,K]=(0,o.useState)({name:"",email:"",phone:"",assignedFoodcourt:"",password:"",permissions:[]}),[H,N]=(0,o.useState)({totalFoodcourts:0,totalStores:0,totalManagers:0,monthlyRentRevenue:0,cumulativeRevenue:0,averageRevenuePerStore:0,occupancyRate:0,growthRate:0,maintenanceRequests:0,activeLeases:0,pendingApplications:0,totalTransactions:0});(0,o.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 Starting foodcourt data fetch...");const e=await fetch("/api/users?role=Foodcourt Manager");if(e.ok){const n=await e.json(),r=n.data||n;console.log("\ud83d\udc65 Fetched foodcourt managers:",(null===r||void 0===r?void 0:r.length)||0);const o=r.map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,assignedFoodcourt:`Foodcourt ${e.id}`,storeCount:Math.floor(20*Math.random())+5,monthlyRevenue:Math.floor(5e4*Math.random())+1e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low"}));T(o);const t={...H,totalManagers:o.length,totalFoodcourts:Math.ceil(o.length/2),totalStores:o.reduce((e,n)=>e+n.storeCount,0),monthlyRentRevenue:o.reduce((e,n)=>e+n.monthlyRevenue,0),occupancyRate:30*Math.random()+70,growthRate:20*Math.random()+5,activeLeases:o.reduce((e,n)=>e+n.storeCount,0),pendingApplications:Math.floor(15*Math.random())+5,maintenanceRequests:Math.floor(10*Math.random())+2};t.averageRevenuePerStore=t.totalStores>0?t.monthlyRentRevenue/t.totalStores:0,N(t);["Jan","Feb","Mar","Apr","May","Jun"].map(e=>({period:e,revenue:Math.floor(1e5*Math.random())+5e4,storeCount:Math.floor(20*Math.random())+40}))}}catch(e){console.error("Error fetching foodcourt data:",e)}})()},[]);return(0,c.jsx)(i.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(g,{children:"Foodcourt General Dashboard"})}),(0,c.jsxs)(x,{children:[(0,c.jsxs)(s.j,{children:[(0,c.jsx)(s.oz,{active:"overview"===n,onClick:()=>r("overview"),children:"Overview"}),(0,c.jsxs)(s.oz,{active:"managers"===n,onClick:()=>r("managers"),children:["\ud300 \ub9e4\ub2c8\uc800 (",H.totalManagers,")"]})]}),"overview"===n&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(s.Ot,{children:[(0,c.jsxs)(s.XS,{children:[(0,c.jsx)(s.G$,{children:H.totalFoodcourts}),(0,c.jsx)(s.h2,{children:"Managed Foodcourts"})]}),(0,c.jsxs)(s.XS,{children:[(0,c.jsx)(s.G$,{children:H.totalStores}),(0,c.jsx)(s.h2,{children:"Total Rental Stores"})]}),(0,c.jsxs)(s.XS,{children:[(0,c.jsxs)(s.G$,{children:["RM ",(H.monthlyRentRevenue/1e3).toFixed(0),"K"]}),(0,c.jsx)(s.h2,{children:"Monthly Rental Revenue"})]}),(0,c.jsxs)(s.XS,{children:[(0,c.jsxs)(s.G$,{children:[H.occupancyRate.toFixed(1),"%"]}),(0,c.jsx)(s.h2,{children:"Average Occupancy Rate"})]})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(u,{children:[(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,c.jsx)("h3",{children:"\uc6d4\ubcc4 \uc784\ub300 \uc218\uc775 \ucd94\uc774"}),(0,c.jsxs)(k,{value:O,onChange:e=>q(e.target.value),children:[(0,c.jsx)("option",{value:"week",children:"\uc774\ubc88 \uc8fc"}),(0,c.jsx)("option",{value:"month",children:"\uc774\ubc88 \ub2ec"}),(0,c.jsx)("option",{value:"quarter",children:"\ubd84\uae30"}),(0,c.jsx)("option",{value:"year",children:"\uc62c\ud574"})]})]}),(0,c.jsx)(E,{children:"\ud83d\udcca \uc6d4\ubcc4 \uc784\ub300 \uc218\uc775 \ucc28\ud2b8 (\uac1c\ubc1c \uc608\uc815)"})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)("h3",{children:"\uc6b4\uc601 \ud604\ud669"}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"\ud65c\uc131 \uc784\ub300 \uacc4\uc57d"}),(0,c.jsx)(y,{children:H.activeLeases})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"\uc784\ub300 \uc2e0\uccad \ub300\uae30"}),(0,c.jsx)(y,{children:H.pendingApplications})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"\uc720\uc9c0\ubcf4\uc218 \uc694\uccad"}),(0,c.jsx)(y,{children:H.maintenanceRequests})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"\ud3c9\uade0 \ub9e4\uc7a5\ub2f9 \uc218\uc775"}),(0,c.jsxs)(y,{children:["RM ",H.averageRevenuePerStore.toFixed(0)]})]}),(0,c.jsxs)(v,{children:[(0,c.jsx)(f,{children:"\uc131\uc7a5\ub960 (\uc804\uc6d4 \ub300\ube44)"}),(0,c.jsxs)(y,{children:["+",H.growthRate.toFixed(1),"%"]})]})]})]})]}),"managers"===n&&(0,c.jsxs)(b,{children:[(0,c.jsxs)(R,{children:[(0,c.jsx)("h3",{children:"Foodcourt Manager Team"}),(0,c.jsx)(S,{onClick:()=>{X(!1),I(null),K({name:"",email:"",phone:"",assignedFoodcourt:"",password:"",permissions:[]}),_(!0)},children:"+ Add Manager"})]}),0===a.length?(0,c.jsx)(E,{children:"\ud83d\udc65 Loading Foodcourt manager data..."}):a.map(n=>{var r;return(0,c.jsxs)(F,{children:[(0,c.jsxs)("div",{onClick:()=>e(`/manager/profile/${n.id}`),children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(A,{children:n.name}),(0,c.jsxs)(C,{score:n.performanceScore,children:[n.performanceScore,"\uc810"]})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)("span",{children:[n.assignedFoodcourt," \u2022 ",n.storeCount,"\uac1c \ub9e4\uc7a5"]}),(0,c.jsxs)("span",{children:["RM ",(n.monthlyRevenue/1e3).toFixed(0),"K/\uc6d4"]})]}),(0,c.jsxs)(M,{style:{marginTop:"4px"},children:[(0,c.jsx)("span",{children:n.email}),(0,c.jsxs)("span",{children:["\uad8c\ud55c: ",(null===(r=n.permissions)||void 0===r?void 0:r.length)||0,"\uac1c"]})]})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)($,{variant:"edit",onClick:()=>(e=>{X(!0),I(e),K({name:e.name,email:e.email,phone:e.phone||"",assignedFoodcourt:e.assignedFoodcourt,password:"",permissions:e.permissions||[]}),_(!0)})(n),children:"\uc218\uc815"}),(0,c.jsx)($,{variant:"delete",onClick:()=>(e=>{I(e),G(!0)})(n),children:"\uc0ad\uc81c"})]})]},n.id)})]}),(0,c.jsx)(s.zf,{isOpen:L,onClose:()=>_(!1),title:Q?"\ub9e4\ub2c8\uc800 \uc815\ubcf4 \uc218\uc815":"\uc0c8 \ub9e4\ub2c8\uc800 \ucd94\uac00",children:(0,c.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{const e=Q&&Z?`/api/users/${Z.id}`:"/api/users",n=Q?"PUT":"POST",r={...J,role:"Foodcourt Manager",first_name:J.name.split(" ")[0],last_name:J.name.split(" ").slice(1).join(" ")||"",...J.password&&{password:J.password}};if((await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok){_(!1);const e=await fetch("/api/users?role=Foodcourt Manager");if(e.ok){const n=await e.json(),r=(n.data||n).map(e=>({id:e.id.toString(),name:e.name||`${e.first_name} ${e.last_name}`.trim(),email:e.email,phone:e.phone||"",assignedFoodcourt:`Foodcourt ${e.id}`,storeCount:Math.floor(20*Math.random())+5,monthlyRevenue:Math.floor(5e4*Math.random())+1e4,createdAt:e.created_at||e.createdAt,lastActive:(new Date).toISOString(),performanceScore:Math.floor(40*Math.random())+60,riskLevel:Math.random()>.7?"high":Math.random()>.4?"medium":"low",permissions:e.permissions||[]}));T(r)}}else console.error("Failed to save manager")}catch(n){console.error("Error saving manager:",n)}},children:[(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"\uc774\ub984"}),(0,c.jsx)(s.ZQ,{type:"text",value:J.name,onChange:e=>K(n=>({...n,name:e.target.value})),required:!0})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"\uc774\uba54\uc77c"}),(0,c.jsx)(s.ZQ,{type:"email",value:J.email,onChange:e=>K(n=>({...n,email:e.target.value})),required:!0})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"\uc804\ud654\ubc88\ud638"}),(0,c.jsx)(l.A,{value:J.phone,onChange:e=>K(n=>({...n,phone:e}))})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"Assigned Foodcourt"}),(0,c.jsx)(s.ZQ,{type:"text",value:J.assignedFoodcourt,onChange:e=>K(n=>({...n,assignedFoodcourt:e.target.value})),required:!0})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:Q?"\uc0c8 \ube44\ubc00\ubc88\ud638 (\ubcc0\uacbd\uc2dc\uc5d0\ub9cc)":"\ube44\ubc00\ubc88\ud638"}),(0,c.jsx)(s.ZQ,{type:"password",value:J.password,onChange:e=>K(n=>({...n,password:e.target.value})),required:!Q})]}),(0,c.jsxs)(s.gE,{children:[(0,c.jsx)(s.lR,{children:"\uad8c\ud55c \uc124\uc815"}),(0,c.jsx)(z,{children:["Store Management","Lease Contract","Revenue Management","Maintenance Request","Report Generation","Customer Management","Promotion Management","Inventory Management"].map(e=>(0,c.jsxs)(D,{children:[(0,c.jsx)("input",{type:"checkbox",checked:J.permissions.includes(e),onChange:n=>((e,n)=>{K(n?n=>({...n,permissions:[...n.permissions,e]}):n=>({...n,permissions:n.permissions.filter(n=>n!==e)}))})(e,n.target.checked)}),e]},e))})]}),(0,c.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,c.jsx)(s.$n,{type:"button",variant:"secondary",onClick:()=>_(!1),children:"\ucde8\uc18c"}),(0,c.jsx)(s.$n,{type:"submit",children:Q?"\uc218\uc815":"\ucd94\uac00"})]})]})}),(0,c.jsx)(d.A,{isOpen:P,title:"\ub9e4\ub2c8\uc800 \uc0ad\uc81c",message:`'${null===Z||void 0===Z?void 0:Z.name}' \ub9e4\ub2c8\uc800\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c? \uc774 \uc791\uc5c5\uc740 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.`,onConfirm:async()=>{if(Z)try{(await fetch(`/api/users/${Z.id}`,{method:"DELETE"})).ok?(T(a.filter(e=>e.id!==Z.id)),G(!1),I(null)):console.error("Failed to delete manager")}catch(e){console.error("Error deleting manager:",e)}},onCancel:()=>{G(!1),I(null)},confirmText:"\uc0ad\uc81c",cancelText:"\ucde8\uc18c",type:"danger"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>h});r(9950);var o=r(4752),t=r(9610),a=r(4414);const i=o.Ay.div`
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