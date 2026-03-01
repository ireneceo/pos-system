"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{4021:(e,t,r)=>{r.d(t,{i1:()=>s});var a=r(9950),o=r(1367),i=r(6038);const s=()=>{const{user:e}=(0,o.As)(),[t,r]=(0,a.useState)("RM"),[s,n]=(0,a.useState)(Object.keys(i.DL)),[d,l]=(0,a.useState)(!0),[c,x]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),a=t.indexOf("restaurant");let o=a>=0?t[a+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(a)}else r("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:c}}},6121:(e,t,r)=>{r.r(t),r.d(t,{default:()=>D});var a=r(8819),o=r(9950),i=r(4752),s=r(4021),n=r(6038),d=r(4414);const l=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,c=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${a.w.colors.border};
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
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
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
`,y=i.Ay.div`
  display: flex;
  gap: 8px;
`,g=i.Ay.button`
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
`,u=i.Ay.div`
  padding: 32px;
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=i.Ay.div`
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
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${a.w.colors.secondary};
  margin-bottom: 4px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,S=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${a.w.colors.border};
`,k=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${a.w.colors.secondary};
  margin-bottom: 20px;
`,A=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${a.w.colors.border};
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,F=i.Ay.table`
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
`,C=i.Ay.thead`
  background: ${a.w.colors.surfaceHover};
  border-bottom: 1px solid ${a.w.colors.border};

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: ${a.w.colors.text.muted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  th:nth-child(7) { text-align: right; } /* Action */
`,O=i.Ay.tr`
  border-bottom: 1px solid ${a.w.colors.surfaceMuted};
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
`,B=i.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: ${a.w.colors.secondary};
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
`,z=i.Ay.div`
  display: flex;
  flex-direction: column;
`,$=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,E=i.Ay.div`
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
    border-color: ${a.w.colors.primary};
    color: #635BFF;
    background: #F4F3FF;
  }
`,D=()=>{const[e,t]=(0,o.useState)("all"),[r,a]=(0,o.useState)("today"),[i,D]=(0,o.useState)([]),{defaultCurrency:I}=(0,s.i1)(),[L,W]=(0,o.useState)("RM");(0,o.useEffect)(()=>{I&&W(I)},[I]),(0,o.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),r=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));D(r)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const V=i.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),U=V.todayOrders>0?V.todaySales/V.todayOrders:0,_=V.yesterdaySales>0?(V.todaySales-V.yesterdaySales)/V.yesterdaySales*100:0;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(x,{children:"Sales"})}),(0,d.jsxs)(u,{children:[(0,d.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,d.jsxs)(h,{value:e,onChange:e=>t(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),i.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(g,{active:"today"===r,onClick:()=>a("today"),children:"Today"}),(0,d.jsx)(g,{active:"yesterday"===r,onClick:()=>a("yesterday"),children:"Yesterday"}),(0,d.jsx)(g,{active:"week"===r,onClick:()=>a("week"),children:"This Week"}),(0,d.jsx)(g,{active:"month"===r,onClick:()=>a("month"),children:"This Month"}),(0,d.jsx)(g,{active:"custom"===r,onClick:()=>a("custom"),children:"Custom Range"})]}),(0,d.jsxs)(p,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:r,totalSales:V.todaySales,totalOrders:V.todayOrders,averageOrderValue:U,restaurants:i},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(a),s=document.createElement("a");s.href=o,s.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(o)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,d.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,d.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(b,{color:"#059669",children:[(0,d.jsx)(f,{children:"Total Sales"}),(0,d.jsx)(j,{children:(0,n.vv)(V.todaySales,L)}),(0,d.jsxs)(v,{positive:_>0,children:[_>0?"\u2191":"\u2193"," ",Math.abs(_).toFixed(1),"% vs yesterday"]})]}),(0,d.jsxs)(b,{color:"#2563EB",children:[(0,d.jsx)(f,{children:"Total Orders"}),(0,d.jsx)(j,{children:V.todayOrders}),(0,d.jsx)(v,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,d.jsxs)(b,{color:"#7C3AED",children:[(0,d.jsx)(f,{children:"Average Order Value"}),(0,d.jsx)(j,{children:(0,n.vv)(U,L)}),(0,d.jsx)(v,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,d.jsxs)(b,{color:"#DC2626",children:[(0,d.jsx)(f,{children:"Active Restaurants"}),(0,d.jsx)(j,{children:i.length}),(0,d.jsx)(v,{positive:!0,children:"All operational"})]})]}),(0,d.jsxs)(w,{children:[(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:"Sales Trend - All Restaurants"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:"Sales Distribution"}),(0,d.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(k,{children:"Daily Comparison"}),(0,d.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,d.jsx)(A,{style:{marginTop:"24px"},children:(0,d.jsxs)(F,{children:[(0,d.jsx)(C,{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Restaurant"}),(0,d.jsx)("th",{children:"Today's Sales"}),(0,d.jsx)("th",{children:"Orders"}),(0,d.jsx)("th",{children:"Avg Order"}),(0,d.jsx)("th",{children:"Week Total"}),(0,d.jsx)("th",{children:"Month Total"}),(0,d.jsx)("th",{children:"Action"})]})}),(0,d.jsx)("tbody",{children:i.map(e=>{const t=e.yesterdaySales>0?(e.todaySales-e.yesterdaySales)/e.yesterdaySales*100:0;return(0,d.jsxs)(O,{children:[(0,d.jsx)(B,{"data-label":"Restaurant",children:(0,d.jsxs)(z,{children:[(0,d.jsx)($,{children:e.name}),(0,d.jsx)(E,{children:e.location})]})}),(0,d.jsx)(B,{"data-label":"Today's Sales",children:(0,d.jsxs)(R,{children:[(0,n.vv)(e.todaySales,L),(0,d.jsxs)(M,{positive:t>0,children:[t>0?"\u2191":"\u2193"," ",Math.abs(t).toFixed(1),"%"]})]})}),(0,d.jsx)(B,{"data-label":"Orders",children:(0,d.jsx)(R,{children:e.todayOrders})}),(0,d.jsx)(B,{"data-label":"Avg Order",children:(0,d.jsx)(R,{children:(0,n.vv)(e.averageOrderValue,L)})}),(0,d.jsx)(B,{"data-label":"Week Total",children:(0,d.jsx)(R,{children:(0,n.vv)(e.weekSales,L)})}),(0,d.jsx)(B,{"data-label":"Month Total",children:(0,d.jsx)(R,{children:(0,n.vv)(e.monthSales,L)})}),(0,d.jsx)(B,{"data-label":"",children:(0,d.jsx)(T,{children:"View Details"})})]},e.id)})})]})})]})]})})}}}]);