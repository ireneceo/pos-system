"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{6121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>R});var s=r(9950),i=r(4752),o=r(3310),a=r(4414);const n=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,d=i.Ay.div`
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
`,l=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,c=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,p=i.Ay.button`
  padding: 12px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`,x=i.Ay.div`
  display: flex;
  gap: 8px;
`,h=i.Ay.button`
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
`,y=i.Ay.div`
  padding: 32px;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,u=i.Ay.div`
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
`,m=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,b=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,S=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 100px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,k=i.Ay.div`
  display: flex;
  flex-direction: column;
`,B=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,C=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,E=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,O=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,z=i.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,R=()=>{const[e,t]=(0,s.useState)("all"),[r,i]=(0,s.useState)("today"),[R,M]=(0,s.useState)([]);(0,s.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),r=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));M(r)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const D=R.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),T=D.todayOrders>0?D.todaySales/D.todayOrders:0,L=D.yesterdaySales>0?(D.todaySales-D.yesterdaySales)/D.yesterdaySales*100:0;return(0,a.jsx)(o.A,{children:(0,a.jsxs)(n,{children:[(0,a.jsx)(d,{children:(0,a.jsx)(l,{children:"Sales"})}),(0,a.jsxs)(y,{children:[(0,a.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,a.jsxs)(c,{value:e,onChange:e=>t(e.target.value),children:[(0,a.jsx)("option",{value:"all",children:"All Restaurants"}),R.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,a.jsxs)(x,{children:[(0,a.jsx)(h,{active:"today"===r,onClick:()=>i("today"),children:"Today"}),(0,a.jsx)(h,{active:"yesterday"===r,onClick:()=>i("yesterday"),children:"Yesterday"}),(0,a.jsx)(h,{active:"week"===r,onClick:()=>i("week"),children:"This Week"}),(0,a.jsx)(h,{active:"month"===r,onClick:()=>i("month"),children:"This Month"}),(0,a.jsx)(h,{active:"custom"===r,onClick:()=>i("custom"),children:"Custom Range"})]}),(0,a.jsxs)(p,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:r,totalSales:D.todaySales,totalOrders:D.todayOrders,averageOrderValue:T,restaurants:R},t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(s),o=document.createElement("a");o.href=i,o.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,a.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(u,{color:"#059669",children:[(0,a.jsx)(m,{children:"Total Sales"}),(0,a.jsxs)(j,{children:["RM ",D.todaySales.toLocaleString()]}),(0,a.jsxs)(f,{positive:L>0,children:[L>0?"\u2191":"\u2193"," ",Math.abs(L).toFixed(1),"% vs yesterday"]})]}),(0,a.jsxs)(u,{color:"#2563EB",children:[(0,a.jsx)(m,{children:"Total Orders"}),(0,a.jsx)(j,{children:D.todayOrders}),(0,a.jsx)(f,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,a.jsxs)(u,{color:"#7C3AED",children:[(0,a.jsx)(m,{children:"Average Order Value"}),(0,a.jsxs)(j,{children:["RM ",T.toFixed(2)]}),(0,a.jsx)(f,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,a.jsxs)(u,{color:"#DC2626",children:[(0,a.jsx)(m,{children:"Active Restaurants"}),(0,a.jsx)(j,{children:R.length}),(0,a.jsx)(f,{positive:!0,children:"All operational"})]})]}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(S,{children:"Sales Trend - All Restaurants"}),(0,a.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(S,{children:"Sales Distribution"}),(0,a.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,a.jsxs)(b,{children:[(0,a.jsx)(S,{children:"Daily Comparison"}),(0,a.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,a.jsxs)(w,{style:{marginTop:"24px"},children:[(0,a.jsxs)(F,{children:[(0,a.jsx)("span",{children:"Restaurant"}),(0,a.jsx)("span",{children:"Today's Sales"}),(0,a.jsx)("span",{children:"Orders"}),(0,a.jsx)("span",{children:"Avg Order"}),(0,a.jsx)("span",{children:"Week Total"}),(0,a.jsx)("span",{children:"Month Total"}),(0,a.jsx)("span",{children:"Action"})]}),R.map(e=>{const t=e.yesterdaySales>0?(e.todaySales-e.yesterdaySales)/e.yesterdaySales*100:0;return(0,a.jsxs)(A,{children:[(0,a.jsxs)(k,{children:[(0,a.jsx)(B,{children:e.name}),(0,a.jsx)(C,{children:e.location})]}),(0,a.jsxs)(E,{children:["RM ",e.todaySales.toLocaleString(),(0,a.jsxs)(O,{positive:t>0,children:[t>0?"\u2191":"\u2193"," ",Math.abs(t).toFixed(1),"%"]})]}),(0,a.jsx)(E,{children:e.todayOrders}),(0,a.jsxs)(E,{children:["RM ",e.averageOrderValue.toFixed(2)]}),(0,a.jsxs)(E,{children:["RM ",e.weekSales.toLocaleString()]}),(0,a.jsxs)(E,{children:["RM ",e.monthSales.toLocaleString()]}),(0,a.jsx)(z,{children:"View Details"})]},e.id)})]})]})]})})}}}]);