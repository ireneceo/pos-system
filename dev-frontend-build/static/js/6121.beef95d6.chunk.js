"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{4021:(e,t,r)=>{r.d(t,{i1:()=>o});var s=r(9950),a=r(1367),i=r(6038);const o=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,s.useState)("RM"),[o,n]=(0,s.useState)(Object.keys(i.DL)),[d,l]=(0,s.useState)(!0),[c,p]=(0,s.useState)(null);return(0,s.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),s=t.indexOf("restaurant");let a=s>=0?t[s+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),s=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(s)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:d,error:c}}},6121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var s=r(9950),a=r(4752),i=r(3310),o=r(4021),n=r(6038),d=r(4414);const l=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,c=a.Ay.div`
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
`,p=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=a.Ay.select`
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
`,h=a.Ay.button`
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
`,y=a.Ay.div`
  display: flex;
  gap: 8px;
`,u=a.Ay.button`
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
`,g=a.Ay.div`
  padding: 32px;
`,f=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=a.Ay.div`
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
`,m=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,b=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,S=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,F=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,A=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,k=a.Ay.div`
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
`,B=a.Ay.div`
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
`,C=a.Ay.div`
  display: flex;
  flex-direction: column;
`,E=a.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,O=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=a.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,R=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,M=a.Ay.button`
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
`,D=()=>{const[e,t]=(0,s.useState)("all"),[r,a]=(0,s.useState)("today"),[D,T]=(0,s.useState)([]),{defaultCurrency:$}=(0,o.i1)(),[I,L]=(0,s.useState)("RM");(0,s.useEffect)(()=>{$&&L($)},[$]),(0,s.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),r=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));T(r)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const V=D.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),U=V.todayOrders>0?V.todaySales/V.todayOrders:0,_=V.yesterdaySales>0?(V.todaySales-V.yesterdaySales)/V.yesterdaySales*100:0;return(0,d.jsx)(i.A,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(p,{children:"Sales"})}),(0,d.jsxs)(g,{children:[(0,d.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,d.jsxs)(x,{value:e,onChange:e=>t(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),D.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(u,{active:"today"===r,onClick:()=>a("today"),children:"Today"}),(0,d.jsx)(u,{active:"yesterday"===r,onClick:()=>a("yesterday"),children:"Yesterday"}),(0,d.jsx)(u,{active:"week"===r,onClick:()=>a("week"),children:"This Week"}),(0,d.jsx)(u,{active:"month"===r,onClick:()=>a("month"),children:"This Month"}),(0,d.jsx)(u,{active:"custom"===r,onClick:()=>a("custom"),children:"Custom Range"})]}),(0,d.jsxs)(h,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:r,totalSales:V.todaySales,totalOrders:V.todayOrders,averageOrderValue:U,restaurants:D},t=JSON.stringify(e,null,2),s=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(s),i=document.createElement("a");i.href=a,i.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,d.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{color:"#059669",children:[(0,d.jsx)(m,{children:"Total Sales"}),(0,d.jsx)(b,{children:(0,n.vv)(V.todaySales,I)}),(0,d.jsxs)(j,{positive:_>0,children:[_>0?"\u2191":"\u2193"," ",Math.abs(_).toFixed(1),"% vs yesterday"]})]}),(0,d.jsxs)(v,{color:"#2563EB",children:[(0,d.jsx)(m,{children:"Total Orders"}),(0,d.jsx)(b,{children:V.todayOrders}),(0,d.jsx)(j,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,d.jsxs)(v,{color:"#7C3AED",children:[(0,d.jsx)(m,{children:"Average Order Value"}),(0,d.jsx)(b,{children:(0,n.vv)(U,I)}),(0,d.jsx)(j,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,d.jsxs)(v,{color:"#DC2626",children:[(0,d.jsx)(m,{children:"Active Restaurants"}),(0,d.jsx)(b,{children:D.length}),(0,d.jsx)(j,{positive:!0,children:"All operational"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{children:"Sales Trend - All Restaurants"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{children:"Sales Distribution"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{children:"Daily Comparison"}),(0,d.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,d.jsxs)(A,{style:{marginTop:"24px"},children:[(0,d.jsxs)(k,{children:[(0,d.jsx)("span",{children:"Restaurant"}),(0,d.jsx)("span",{children:"Today's Sales"}),(0,d.jsx)("span",{children:"Orders"}),(0,d.jsx)("span",{children:"Avg Order"}),(0,d.jsx)("span",{children:"Week Total"}),(0,d.jsx)("span",{children:"Month Total"}),(0,d.jsx)("span",{children:"Action"})]}),D.map(e=>{const t=e.yesterdaySales>0?(e.todaySales-e.yesterdaySales)/e.yesterdaySales*100:0;return(0,d.jsxs)(B,{children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(E,{children:e.name}),(0,d.jsx)(O,{children:e.location})]}),(0,d.jsxs)(z,{children:[(0,n.vv)(e.todaySales,I),(0,d.jsxs)(R,{positive:t>0,children:[t>0?"\u2191":"\u2193"," ",Math.abs(t).toFixed(1),"%"]})]}),(0,d.jsx)(z,{children:e.todayOrders}),(0,d.jsx)(z,{children:(0,n.vv)(e.averageOrderValue,I)}),(0,d.jsx)(z,{children:(0,n.vv)(e.weekSales,I)}),(0,d.jsx)(z,{children:(0,n.vv)(e.monthSales,I)}),(0,d.jsx)(M,{children:"View Details"})]},e.id)})]})]})]})})}}}]);