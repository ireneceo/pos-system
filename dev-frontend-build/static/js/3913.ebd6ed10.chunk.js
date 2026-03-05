"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3913],{2488:(e,r,t)=>{t.d(r,{DO:()=>x,Jt:()=>h,Qn:()=>c});t(9950);var n=t(4752),i=t(4414);const s=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,o=n.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,d=n.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,c=e=>{let{children:r,className:t,style:n,...a}=e;return(0,i.jsx)(s,{className:t,style:n,...a,children:r})},x=e=>{let{placeholder:r="Search...",value:t,onChange:n,style:s,...l}=e;return(0,i.jsxs)(o,{style:s,children:[(0,i.jsx)(a,{placeholder:r,value:t,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...l}),t&&(0,i.jsx)(d,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:r,...t}=e;return(0,i.jsx)(l,{...t,children:r})}},3913:(e,r,t)=>{t.r(r),t.d(r,{default:()=>k});var n=t(9950),i=t(4752),s=t(1367),a=t(4492),o=t(2488),d=t(8409),l=t(4021),c=t(6038),x=t(4414);const h=i.Ay.div`
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
`,p=i.Ay.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=i.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
  }
`,g=i.Ay.button`
  padding: 12px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    background: #5A51E6;
  }
`,y=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=i.Ay.div`
  font-size: 12px;
  color: ${e=>"up"===e.trend?"#059669":"down"===e.trend?"#DC2626":"#6B7280"};
  font-weight: 500;
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,w=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,C=i.Ay.div`
  height: 300px;
  background: #F8FAFC;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 14px;
  text-align: center;
`,b=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,R=i.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,S=i.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,O=i.Ay.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`,k=()=>{var e;const{user:r}=(0,s.As)(),t=(0,a.zy)(),[i,k]=(0,n.useState)("all"),[F,M]=(0,n.useState)("today"),{defaultCurrency:$}=(0,l.i1)(),[I,B]=(0,n.useState)("RM");(0,n.useEffect)(()=>{$&&B($)},[$]);const[P]=(0,n.useState)([{id:"rest-001",name:"Nasi Lemak Corner",location:"KLCC"},{id:"rest-002",name:"Char Kuey Teow King",location:"Pavilion KL"},{id:"rest-003",name:"Roti Canai House",location:"Mid Valley"},{id:"rest-004",name:"Satay House",location:"Level 1, Unit 108"},{id:"rest-005",name:"Japanese Sushi Bar",location:"Level 2, Unit 208"},{id:"rest-006",name:"Laksa Paradise",location:"Level 2, Unit 210"}]);(0,n.useEffect)(()=>{const e=new URLSearchParams(t.search),r=e.get("restaurantId")||e.get("restaurant");r&&k(r)},[t]);const[E,z]=(0,n.useState)({totalRevenue:13130,totalOrders:222,averageOrderValue:59.14,topItems:[{name:"Nasi Lemak Special",quantity:45,revenue:450},{name:"CKT Special",quantity:38,revenue:570},{name:"Roti Canai",quantity:85,revenue:255},{name:"Rendang Set",quantity:32,revenue:480},{name:"Penang CKT",quantity:29,revenue:435}],customerCount:856,staffPerformance:[{name:"Ahmad Rahman",orders:45,efficiency:92},{name:"Siti Nurhaliza",orders:38,efficiency:88},{name:"Raj Kumar",orders:42,efficiency:90},{name:"Li Wei",orders:35,efficiency:85},{name:"Maria Santos",orders:40,efficiency:87}],hourlyData:[{hour:"11AM",orders:25,revenue:680},{hour:"12PM",orders:45,revenue:1280},{hour:"1PM",orders:38,revenue:940},{hour:"2PM",orders:22,revenue:580},{hour:"3PM",orders:18,revenue:420},{hour:"4PM",orders:15,revenue:380},{hour:"5PM",orders:25,revenue:650},{hour:"6PM",orders:42,revenue:1120},{hour:"7PM",orders:35,revenue:890},{hour:"8PM",orders:20,revenue:520}],customerAnalysis:{newCustomers:284,returningCustomers:572,satisfaction:4.7,totalCustomers:856,vipCustomers:128,averageOrdersPerCustomer:4.2,customerRetentionRate:78.5}});(0,n.useEffect)(()=>{const e="all"===i?1:.33;z(r=>({...r,totalRevenue:Math.round(13130*e*(.8+.4*Math.random())),totalOrders:Math.round(222*e*(.8+.4*Math.random()))}))},[i,F]);const T=e=>{let r=`Manager Reports - ${e.restaurant}\n`;return r+=`Generated: ${(new Date).toLocaleString()}\n`,r+=`Period: ${e.dateRange}\n`,r+=`Manager: ${e.manager}\n\n`,r+="SALES SUMMARY\n",r+=`Total Revenue,RM ${e.summary.totalRevenue}\n`,r+=`Total Orders,${e.summary.totalOrders}\n`,r+=`Average Order Value,RM ${e.summary.averageOrderValue}\n`,r+=`Customer Count,${e.summary.customerCount}\n\n`,r+="CUSTOMER ANALYSIS\n",r+=`Total Customers,${e.customerAnalysis.totalCustomers}\n`,r+=`New Customers,${e.customerAnalysis.newCustomers}\n`,r+=`Returning Customers,${e.customerAnalysis.returningCustomers}\n`,r+=`VIP Customers,${e.customerAnalysis.vipCustomers}\n`,r+=`Average Orders per Customer,${e.customerAnalysis.averageOrdersPerCustomer}\n`,r+=`Customer Retention Rate,${e.customerAnalysis.customerRetentionRate}%\n`,r+=`Satisfaction Score,${e.customerAnalysis.satisfaction}/5.0\n\n`,r+="TOP PERFORMING ITEMS\n",r+="Item Name,Quantity,Revenue\n",e.topItems.forEach(e=>{r+=`${e.name},${e.quantity},RM ${e.revenue}\n`}),r+="\nSTAFF PERFORMANCE\n",r+="Staff Name,Orders Handled,Efficiency\n",e.staffPerformance.forEach(e=>{r+=`${e.name},${e.orders},${e.efficiency}%\n`}),r+="\nHOURLY ANALYSIS\n",r+="Hour,Orders,Revenue\n",e.hourlyAnalysis.forEach(e=>{r+=`${e.hour},${e.orders},RM ${e.revenue}\n`}),r};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:(0,x.jsx)(p,{children:(0,x.jsx)(m,{children:"all"===i?"Reports Dashboard":`${(null===(e=P.find(e=>e.id===i))||void 0===e?void 0:e.name)||"Restaurant"} Reports`})})}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(o.Qn,{children:[(0,x.jsxs)("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Date Range:"}),(0,x.jsx)(v,{active:"today"===F,onClick:()=>M("today"),children:"Today"}),(0,x.jsx)(v,{active:"week"===F,onClick:()=>M("week"),children:"Week"}),(0,x.jsx)(v,{active:"month"===F,onClick:()=>M("month"),children:"Month"}),(0,x.jsx)(v,{active:"custom"===F,onClick:()=>M("custom"),children:"Year"})]}),(0,x.jsxs)(o.Jt,{value:i,onChange:e=>k(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),P.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,x.jsxs)(g,{onClick:()=>{var e;const t={generatedAt:(new Date).toISOString(),restaurant:"all"===i?"All Restaurants":null===(e=P.find(e=>e.id===i))||void 0===e?void 0:e.name,dateRange:F,manager:null===r||void 0===r?void 0:r.name,summary:{totalRevenue:E.totalRevenue,totalOrders:E.totalOrders,averageOrderValue:E.averageOrderValue,customerCount:E.customerCount},topItems:E.topItems,staffPerformance:E.staffPerformance,hourlyAnalysis:E.hourlyData,customerAnalysis:E.customerAnalysis},n=T(t),s=new Blob([n],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(s),a.download=`manager-report-${i}-${F}-${(new Date).toISOString().split("T")[0]}.csv`,a.click()},children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download Report"]})]}),(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:(0,c.vv)(E.totalRevenue,I)}),(0,x.jsx)(d.v0,{children:"Total Revenue"}),(0,x.jsx)(j,{trend:"up",children:"+18% vs yesterday"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.totalOrders}),(0,x.jsx)(d.v0,{children:"Total Orders"}),(0,x.jsx)(j,{trend:"up",children:"+12% vs yesterday"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:(0,c.vv)(E.averageOrderValue,I)}),(0,x.jsx)(d.v0,{children:"Average Order Value"}),(0,x.jsx)(j,{trend:"up",children:"+5.3% vs yesterday"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.customerCount}),(0,x.jsx)(d.v0,{children:"Customer Count"}),(0,x.jsx)(j,{trend:"up",children:"+24% vs yesterday"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:"all"===i?P.length:1}),(0,x.jsx)(d.v0,{children:"Active Restaurants"}),(0,x.jsx)(j,{children:"All operational"})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(w,{children:"Order Analysis"}),(0,x.jsxs)(A,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Revenue Trend"}),(0,x.jsxs)(C,{children:["Revenue trend chart will be displayed here",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Line chart showing revenue over time"})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Order Distribution"}),(0,x.jsxs)(C,{children:["\ud83c\udf70 Order distribution pie chart",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Distribution by restaurant/category"})]})]})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(w,{children:"Customer Analysis"}),(0,x.jsxs)(d.MD,{style:{marginBottom:"24px"},children:[(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.customerAnalysis.totalCustomers}),(0,x.jsx)(d.v0,{children:"Total Customers"}),(0,x.jsx)(j,{trend:"up",children:"Active across all restaurants"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.customerAnalysis.newCustomers}),(0,x.jsx)(d.v0,{children:"New Customers"}),(0,x.jsx)(j,{trend:"up",children:"+15% vs last period"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.customerAnalysis.vipCustomers}),(0,x.jsx)(d.v0,{children:"VIP Customers"}),(0,x.jsxs)(j,{trend:"up",children:[Math.round(E.customerAnalysis.vipCustomers/E.customerAnalysis.totalCustomers*100),"% of total"]})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:E.customerAnalysis.averageOrdersPerCustomer}),(0,x.jsx)(d.v0,{children:"Avg Orders per Customer"}),(0,x.jsx)(j,{trend:"up",children:"+0.3 vs last period"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsxs)(d.Os,{children:[E.customerAnalysis.customerRetentionRate,"%"]}),(0,x.jsx)(d.v0,{children:"Customer Retention"}),(0,x.jsx)(j,{trend:"up",children:"+2.1% vs last period"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsxs)(d.Os,{children:[E.customerAnalysis.satisfaction,"/5.0"]}),(0,x.jsx)(d.v0,{children:"Satisfaction Score"}),(0,x.jsx)(j,{trend:"up",children:"+0.2 vs last period"})]})]}),(0,x.jsxs)(A,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Segmentation"}),(0,x.jsxs)(C,{children:["Customer tier distribution",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bronze, Silver, Gold, VIP breakdown"})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Growth"}),(0,x.jsxs)(C,{children:["Customer acquisition trend",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"New vs returning customers over time"})]})]})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(w,{children:"Popular Items"}),(0,x.jsxs)(b,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(R,{children:"Rank"}),(0,x.jsx)(R,{children:"Item Name"}),(0,x.jsx)(R,{children:"Quantity Sold"}),(0,x.jsx)(R,{children:"Revenue"}),(0,x.jsx)(R,{children:"Performance"})]})}),(0,x.jsx)("tbody",{children:E.topItems.map((e,r)=>{var t;const n=(null===(t=E.topItems[0])||void 0===t?void 0:t.quantity)||1;return(0,x.jsxs)("tr",{children:[(0,x.jsxs)(S,{style:{fontWeight:"600"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,x.jsx)(S,{style:{fontWeight:"600"},children:e.name}),(0,x.jsx)(S,{children:e.quantity}),(0,x.jsx)(S,{children:(0,c.vv)(e.revenue,I)}),(0,x.jsx)(S,{children:(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(O,{percentage:e.quantity/n*100}),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.quantity/n*100),"%"]})]})})]},r)})})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(w,{children:"Hourly Analysis"}),(0,x.jsx)("div",{style:{marginBottom:"20px"},children:(0,x.jsxs)(C,{style:{height:"250px"},children:["Hourly orders and revenue bar chart",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bar chart showing orders and revenue by hour"})]})}),(0,x.jsxs)(b,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(R,{children:"Time Slot"}),(0,x.jsx)(R,{children:"Orders"}),(0,x.jsx)(R,{children:"Revenue"}),(0,x.jsx)(R,{children:"Avg Order Value"})]})}),(0,x.jsx)("tbody",{children:E.hourlyData.map((e,r)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)(S,{style:{fontWeight:"600"},children:e.hour}),(0,x.jsx)(S,{children:e.orders}),(0,x.jsx)(S,{children:(0,c.vv)(e.revenue,I)}),(0,x.jsx)(S,{children:(0,c.vv)(e.revenue/e.orders,I)})]},r))})]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(w,{children:"Staff Performance"}),(0,x.jsxs)(b,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(R,{children:"Staff Name"}),(0,x.jsx)(R,{children:"Orders Handled"}),(0,x.jsx)(R,{children:"Efficiency"}),(0,x.jsx)(R,{children:"Performance"})]})}),(0,x.jsx)("tbody",{children:E.staffPerformance.map((e,r)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)(S,{style:{fontWeight:"600"},children:e.name}),(0,x.jsx)(S,{children:e.orders}),(0,x.jsxs)(S,{children:[e.efficiency,"%"]}),(0,x.jsx)(S,{children:(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(O,{percentage:e.efficiency}),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]})]})})}},4021:(e,r,t)=>{t.d(r,{i1:()=>a});var n=t(9950),i=t(1367),s=t(6038);const a=()=>{const{user:e}=(0,i.As)(),[r,t]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(s.DL)),[o,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let i=n>=0?r[n+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";t(n)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:o,error:l}}}}]);