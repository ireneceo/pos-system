"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{4021:(e,t,r)=>{r.d(t,{i1:()=>n});var a=r(9950),i=r(1367),o=r(6038);const n=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,a.useState)("RM"),[n]=(0,a.useState)(Object.keys(o.DL)),[s,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),a=t.indexOf("restaurant");let i=a>=0?t[a+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),a=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";r(a)}else r("RM")}catch(n){console.error("Failed to fetch restaurant currency:",n),c("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:n,loading:s,error:l}}},6121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var a=r(9950),i=r(4752),o=r(4021),n=r(6038),s=r(4414);const d=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,l=i.Ay.div`
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
`,c=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=i.Ay.select`
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
`,h=i.Ay.button`
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
`,p=i.Ay.div`
  display: flex;
  gap: 8px;
`,y=i.Ay.button`
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
`,g=i.Ay.div`
  padding: 32px;
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=i.Ay.div`
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
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,v=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,S=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,A=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,k=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,F=i.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  th:nth-child(7) { text-align: right; } /* Action */
`,B=i.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,C=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  &:nth-child(7) { text-align: right; } /* Action */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,O=i.Ay.div`
  display: flex;
  flex-direction: column;
`,E=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,z=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,R=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,M=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,T=i.Ay.button`
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
`,D=()=>{const[e,t]=(0,a.useState)("all"),[r,i]=(0,a.useState)("today"),[D,$]=(0,a.useState)([]),{defaultCurrency:I}=(0,o.i1)(),[L,W]=(0,a.useState)("RM");(0,a.useEffect)(()=>{I&&W(I)},[I]),(0,a.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),r=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));$(r)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const V=D.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),U=V.todayOrders>0?V.todaySales/V.todayOrders:0,_=V.yesterdaySales>0?(V.todaySales-V.yesterdaySales)/V.yesterdaySales*100:0;return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:(0,s.jsx)(c,{children:"Sales"})}),(0,s.jsxs)(g,{children:[(0,s.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,s.jsxs)(x,{value:e,onChange:e=>t(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Restaurants"}),D.map(e=>(0,s.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(y,{active:"today"===r,onClick:()=>i("today"),children:"Today"}),(0,s.jsx)(y,{active:"yesterday"===r,onClick:()=>i("yesterday"),children:"Yesterday"}),(0,s.jsx)(y,{active:"week"===r,onClick:()=>i("week"),children:"This Week"}),(0,s.jsx)(y,{active:"month"===r,onClick:()=>i("month"),children:"This Month"}),(0,s.jsx)(y,{active:"custom"===r,onClick:()=>i("custom"),children:"Custom Range"})]}),(0,s.jsxs)(h,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:r,totalSales:V.todaySales,totalOrders:V.todayOrders,averageOrderValue:U,restaurants:D},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,s.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,s.jsxs)(u,{children:[(0,s.jsxs)(m,{color:"#059669",children:[(0,s.jsx)(b,{children:"Total Sales"}),(0,s.jsx)(v,{children:(0,n.vv)(V.todaySales,L)}),(0,s.jsxs)(f,{positive:_>0,children:[_>0?"\u2191":"\u2193"," ",Math.abs(_).toFixed(1),"% vs yesterday"]})]}),(0,s.jsxs)(m,{color:"#2563EB",children:[(0,s.jsx)(b,{children:"Total Orders"}),(0,s.jsx)(v,{children:V.todayOrders}),(0,s.jsx)(f,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,s.jsxs)(m,{color:"#7C3AED",children:[(0,s.jsx)(b,{children:"Average Order Value"}),(0,s.jsx)(v,{children:(0,n.vv)(U,L)}),(0,s.jsx)(f,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,s.jsxs)(m,{color:"#DC2626",children:[(0,s.jsx)(b,{children:"Active Restaurants"}),(0,s.jsx)(v,{children:D.length}),(0,s.jsx)(f,{positive:!0,children:"All operational"})]})]}),(0,s.jsxs)(j,{children:[(0,s.jsxs)(w,{children:[(0,s.jsx)(S,{children:"Sales Trend - All Restaurants"}),(0,s.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,s.jsxs)(w,{children:[(0,s.jsx)(S,{children:"Sales Distribution"}),(0,s.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,s.jsxs)(w,{children:[(0,s.jsx)(S,{children:"Daily Comparison"}),(0,s.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,s.jsx)(A,{style:{marginTop:"24px"},children:(0,s.jsxs)(k,{children:[(0,s.jsx)(F,{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{children:"Restaurant"}),(0,s.jsx)("th",{children:"Today's Sales"}),(0,s.jsx)("th",{children:"Orders"}),(0,s.jsx)("th",{children:"Avg Order"}),(0,s.jsx)("th",{children:"Week Total"}),(0,s.jsx)("th",{children:"Month Total"}),(0,s.jsx)("th",{children:"Action"})]})}),(0,s.jsx)("tbody",{children:D.map(e=>{const t=e.yesterdaySales>0?(e.todaySales-e.yesterdaySales)/e.yesterdaySales*100:0;return(0,s.jsxs)(B,{children:[(0,s.jsx)(C,{"data-label":"Restaurant",children:(0,s.jsxs)(O,{children:[(0,s.jsx)(E,{children:e.name}),(0,s.jsx)(z,{children:e.location})]})}),(0,s.jsx)(C,{"data-label":"Today's Sales",children:(0,s.jsxs)(R,{children:[(0,n.vv)(e.todaySales,L),(0,s.jsxs)(M,{positive:t>0,children:[t>0?"\u2191":"\u2193"," ",Math.abs(t).toFixed(1),"%"]})]})}),(0,s.jsx)(C,{"data-label":"Orders",children:(0,s.jsx)(R,{children:e.todayOrders})}),(0,s.jsx)(C,{"data-label":"Avg Order",children:(0,s.jsx)(R,{children:(0,n.vv)(e.averageOrderValue,L)})}),(0,s.jsx)(C,{"data-label":"Week Total",children:(0,s.jsx)(R,{children:(0,n.vv)(e.weekSales,L)})}),(0,s.jsx)(C,{"data-label":"Month Total",children:(0,s.jsx)(R,{children:(0,n.vv)(e.monthSales,L)})}),(0,s.jsx)(C,{"data-label":"",children:(0,s.jsx)(T,{children:"View Details"})})]},e.id)})})]})})]})]})})}}}]);