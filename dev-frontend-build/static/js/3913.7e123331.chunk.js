"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3913],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,o=n.Ay.select`
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
`,d=e=>{let{children:r,className:t,style:n,...a}=e;return(0,s.jsx)(i,{className:t,style:n,...a,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,s.jsx)(a,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,s.jsx)(o,{...t,children:r})}},3913:(e,r,t)=>{t.r(r),t.d(r,{default:()=>k});var n=t(9950),s=t(4752),i=t(3310),a=t(1367),o=t(4492),d=t(2488),l=t(2674),c=t(4021),h=t(6038),x=t(4414);const u=s.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=s.Ay.div`
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
`,m=s.Ay.div`
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
`,v=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=s.Ay.button`
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
`,j=s.Ay.button`
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
`,y=s.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,f=s.Ay.div`
  font-size: 12px;
  color: ${e=>"up"===e.trend?"#059669":"down"===e.trend?"#DC2626":"#6B7280"};
  font-weight: 500;
`,w=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,A=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`,b=s.Ay.div`
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
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,S=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,O=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,F=s.Ay.div`
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
`,k=()=>{var e;const{user:r}=(0,a.As)(),t=(0,o.zy)(),[s,k]=(0,n.useState)("all"),[M,$]=(0,n.useState)("today"),{defaultCurrency:I}=(0,c.i1)(),[B,P]=(0,n.useState)("RM");(0,n.useEffect)(()=>{I&&P(I)},[I]);const[E]=(0,n.useState)([{id:"rest-001",name:"Nasi Lemak Corner",location:"KLCC"},{id:"rest-002",name:"Char Kuey Teow King",location:"Pavilion KL"},{id:"rest-003",name:"Roti Canai House",location:"Mid Valley"},{id:"rest-004",name:"Satay House",location:"Level 1, Unit 108"},{id:"rest-005",name:"Japanese Sushi Bar",location:"Level 2, Unit 208"},{id:"rest-006",name:"Laksa Paradise",location:"Level 2, Unit 210"}]);(0,n.useEffect)(()=>{const e=new URLSearchParams(t.search),r=e.get("restaurantId")||e.get("restaurant");r&&k(r)},[t]);const[z,T]=(0,n.useState)({totalRevenue:13130,totalOrders:222,averageOrderValue:59.14,topItems:[{name:"Nasi Lemak Special",quantity:45,revenue:450},{name:"CKT Special",quantity:38,revenue:570},{name:"Roti Canai",quantity:85,revenue:255},{name:"Rendang Set",quantity:32,revenue:480},{name:"Penang CKT",quantity:29,revenue:435}],customerCount:856,staffPerformance:[{name:"Ahmad Rahman",orders:45,efficiency:92},{name:"Siti Nurhaliza",orders:38,efficiency:88},{name:"Raj Kumar",orders:42,efficiency:90},{name:"Li Wei",orders:35,efficiency:85},{name:"Maria Santos",orders:40,efficiency:87}],hourlyData:[{hour:"11AM",orders:25,revenue:680},{hour:"12PM",orders:45,revenue:1280},{hour:"1PM",orders:38,revenue:940},{hour:"2PM",orders:22,revenue:580},{hour:"3PM",orders:18,revenue:420},{hour:"4PM",orders:15,revenue:380},{hour:"5PM",orders:25,revenue:650},{hour:"6PM",orders:42,revenue:1120},{hour:"7PM",orders:35,revenue:890},{hour:"8PM",orders:20,revenue:520}],customerAnalysis:{newCustomers:284,returningCustomers:572,satisfaction:4.7,totalCustomers:856,vipCustomers:128,averageOrdersPerCustomer:4.2,customerRetentionRate:78.5}});(0,n.useEffect)(()=>{const e="all"===s?1:.33;T(r=>({...r,totalRevenue:Math.round(13130*e*(.8+.4*Math.random())),totalOrders:Math.round(222*e*(.8+.4*Math.random()))}))},[s,M]);const L=e=>{let r=`Manager Reports - ${e.restaurant}\n`;return r+=`Generated: ${(new Date).toLocaleString()}\n`,r+=`Period: ${e.dateRange}\n`,r+=`Manager: ${e.manager}\n\n`,r+="SALES SUMMARY\n",r+=`Total Revenue,RM ${e.summary.totalRevenue}\n`,r+=`Total Orders,${e.summary.totalOrders}\n`,r+=`Average Order Value,RM ${e.summary.averageOrderValue}\n`,r+=`Customer Count,${e.summary.customerCount}\n\n`,r+="CUSTOMER ANALYSIS\n",r+=`Total Customers,${e.customerAnalysis.totalCustomers}\n`,r+=`New Customers,${e.customerAnalysis.newCustomers}\n`,r+=`Returning Customers,${e.customerAnalysis.returningCustomers}\n`,r+=`VIP Customers,${e.customerAnalysis.vipCustomers}\n`,r+=`Average Orders per Customer,${e.customerAnalysis.averageOrdersPerCustomer}\n`,r+=`Customer Retention Rate,${e.customerAnalysis.customerRetentionRate}%\n`,r+=`Satisfaction Score,${e.customerAnalysis.satisfaction}/5.0\n\n`,r+="TOP PERFORMING ITEMS\n",r+="Item Name,Quantity,Revenue\n",e.topItems.forEach(e=>{r+=`${e.name},${e.quantity},RM ${e.revenue}\n`}),r+="\nSTAFF PERFORMANCE\n",r+="Staff Name,Orders Handled,Efficiency\n",e.staffPerformance.forEach(e=>{r+=`${e.name},${e.orders},${e.efficiency}%\n`}),r+="\nHOURLY ANALYSIS\n",r+="Hour,Orders,Revenue\n",e.hourlyAnalysis.forEach(e=>{r+=`${e.hour},${e.orders},RM ${e.revenue}\n`}),r};return(0,x.jsx)(i.A,{children:(0,x.jsxs)(u,{children:[(0,x.jsx)(p,{children:(0,x.jsx)(m,{children:(0,x.jsx)(v,{children:"all"===s?"Reports Dashboard":`${(null===(e=E.find(e=>e.id===s))||void 0===e?void 0:e.name)||"Restaurant"} Reports`})})}),(0,x.jsxs)(y,{children:[(0,x.jsxs)(d.Qn,{children:[(0,x.jsxs)("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[(0,x.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:"#374151"},children:"Date Range:"}),(0,x.jsx)(g,{active:"today"===M,onClick:()=>$("today"),children:"Today"}),(0,x.jsx)(g,{active:"week"===M,onClick:()=>$("week"),children:"Week"}),(0,x.jsx)(g,{active:"month"===M,onClick:()=>$("month"),children:"Month"}),(0,x.jsx)(g,{active:"custom"===M,onClick:()=>$("custom"),children:"Year"})]}),(0,x.jsxs)(d.Jt,{value:s,onChange:e=>k(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),E.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,x.jsxs)(j,{onClick:()=>{var e;const t={generatedAt:(new Date).toISOString(),restaurant:"all"===s?"All Restaurants":null===(e=E.find(e=>e.id===s))||void 0===e?void 0:e.name,dateRange:M,manager:null===r||void 0===r?void 0:r.name,summary:{totalRevenue:z.totalRevenue,totalOrders:z.totalOrders,averageOrderValue:z.averageOrderValue,customerCount:z.customerCount},topItems:z.topItems,staffPerformance:z.staffPerformance,hourlyAnalysis:z.hourlyData,customerAnalysis:z.customerAnalysis},n=L(t),i=new Blob([n],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(i),a.download=`manager-report-${s}-${M}-${(new Date).toISOString().split("T")[0]}.csv`,a.click()},children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download Report"]})]}),(0,x.jsxs)(l.MD,{children:[(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:(0,h.vv)(z.totalRevenue,B)}),(0,x.jsx)(l.v0,{children:"Total Revenue"}),(0,x.jsx)(f,{trend:"up",children:"+18% vs yesterday"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.totalOrders}),(0,x.jsx)(l.v0,{children:"Total Orders"}),(0,x.jsx)(f,{trend:"up",children:"+12% vs yesterday"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:(0,h.vv)(z.averageOrderValue,B)}),(0,x.jsx)(l.v0,{children:"Average Order Value"}),(0,x.jsx)(f,{trend:"up",children:"+5.3% vs yesterday"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.customerCount}),(0,x.jsx)(l.v0,{children:"Customer Count"}),(0,x.jsx)(f,{trend:"up",children:"+24% vs yesterday"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:"all"===s?E.length:1}),(0,x.jsx)(l.v0,{children:"Active Restaurants"}),(0,x.jsx)(f,{children:"All operational"})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Order Analysis"}),(0,x.jsxs)(C,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Revenue Trend"}),(0,x.jsxs)(b,{children:["Revenue trend chart will be displayed here",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Line chart showing revenue over time"})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Order Distribution"}),(0,x.jsxs)(b,{children:["\ud83c\udf70 Order distribution pie chart",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Distribution by restaurant/category"})]})]})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Customer Analysis"}),(0,x.jsxs)(l.MD,{style:{marginBottom:"24px"},children:[(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.customerAnalysis.totalCustomers}),(0,x.jsx)(l.v0,{children:"Total Customers"}),(0,x.jsx)(f,{trend:"up",children:"Active across all restaurants"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.customerAnalysis.newCustomers}),(0,x.jsx)(l.v0,{children:"New Customers"}),(0,x.jsx)(f,{trend:"up",children:"+15% vs last period"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.customerAnalysis.vipCustomers}),(0,x.jsx)(l.v0,{children:"VIP Customers"}),(0,x.jsxs)(f,{trend:"up",children:[Math.round(z.customerAnalysis.vipCustomers/z.customerAnalysis.totalCustomers*100),"% of total"]})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsx)(l.Os,{children:z.customerAnalysis.averageOrdersPerCustomer}),(0,x.jsx)(l.v0,{children:"Avg Orders per Customer"}),(0,x.jsx)(f,{trend:"up",children:"+0.3 vs last period"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsxs)(l.Os,{children:[z.customerAnalysis.customerRetentionRate,"%"]}),(0,x.jsx)(l.v0,{children:"Customer Retention"}),(0,x.jsx)(f,{trend:"up",children:"+2.1% vs last period"})]}),(0,x.jsxs)(l.hI,{children:[(0,x.jsxs)(l.Os,{children:[z.customerAnalysis.satisfaction,"/5.0"]}),(0,x.jsx)(l.v0,{children:"Satisfaction Score"}),(0,x.jsx)(f,{trend:"up",children:"+0.2 vs last period"})]})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Segmentation"}),(0,x.jsxs)(b,{children:["Customer tier distribution",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bronze, Silver, Gold, VIP breakdown"})]})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Customer Growth"}),(0,x.jsxs)(b,{children:["Customer acquisition trend",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"New vs returning customers over time"})]})]})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Popular Items"}),(0,x.jsxs)(R,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(S,{children:"Rank"}),(0,x.jsx)(S,{children:"Item Name"}),(0,x.jsx)(S,{children:"Quantity Sold"}),(0,x.jsx)(S,{children:"Revenue"}),(0,x.jsx)(S,{children:"Performance"})]})}),(0,x.jsx)("tbody",{children:z.topItems.map((e,r)=>{var t;const n=(null===(t=z.topItems[0])||void 0===t?void 0:t.quantity)||1;return(0,x.jsxs)("tr",{children:[(0,x.jsxs)(O,{style:{fontWeight:"600"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,x.jsx)(O,{style:{fontWeight:"600"},children:e.name}),(0,x.jsx)(O,{children:e.quantity}),(0,x.jsx)(O,{children:(0,h.vv)(e.revenue,B)}),(0,x.jsx)(O,{children:(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(F,{percentage:e.quantity/n*100}),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.quantity/n*100),"%"]})]})})]},r)})})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Hourly Analysis"}),(0,x.jsx)("div",{style:{marginBottom:"20px"},children:(0,x.jsxs)(b,{style:{height:"250px"},children:["Hourly orders and revenue bar chart",(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"8px",opacity:.7},children:"Bar chart showing orders and revenue by hour"})]})}),(0,x.jsxs)(R,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(S,{children:"Time Slot"}),(0,x.jsx)(S,{children:"Orders"}),(0,x.jsx)(S,{children:"Revenue"}),(0,x.jsx)(S,{children:"Avg Order Value"})]})}),(0,x.jsx)("tbody",{children:z.hourlyData.map((e,r)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)(O,{style:{fontWeight:"600"},children:e.hour}),(0,x.jsx)(O,{children:e.orders}),(0,x.jsx)(O,{children:(0,h.vv)(e.revenue,B)}),(0,x.jsx)(O,{children:(0,h.vv)(e.revenue/e.orders,B)})]},r))})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(A,{children:"Staff Performance"}),(0,x.jsxs)(R,{children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(S,{children:"Staff Name"}),(0,x.jsx)(S,{children:"Orders Handled"}),(0,x.jsx)(S,{children:"Efficiency"}),(0,x.jsx)(S,{children:"Performance"})]})}),(0,x.jsx)("tbody",{children:z.staffPerformance.map((e,r)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)(O,{style:{fontWeight:"600"},children:e.name}),(0,x.jsx)(O,{children:e.orders}),(0,x.jsxs)(O,{children:[e.efficiency,"%"]}),(0,x.jsx)(O,{children:(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,x.jsx)(F,{percentage:e.efficiency}),(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[e.efficiency,"%"]})]})})]},r))})]})]})]})]})})}},4021:(e,r,t)=>{t.d(r,{i1:()=>a});var n=t(9950),s=t(1367),i=t(6038);const a=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.useState)("RM"),[a,o]=(0,n.useState)(Object.keys(i.DL)),[d,l]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let s=n>=0?r[n+1]:null;if(!s&&null!==e&&void 0!==e&&e.restaurant_id&&(s=e.restaurant_id.toString()),!s)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${s}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var i;const e=await r.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(n)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),h("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:d,error:c}}}}]);