"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4987],{4021:(e,r,t)=>{t.d(r,{i1:()=>o});var n=t(9950),a=t(1367),s=t(6038);const o=()=>{const{user:e}=(0,a.As)(),[r,t]=(0,n.useState)("RM"),[o,i]=(0,n.useState)(Object.keys(s.DL)),[d,l]=(0,n.useState)(!0),[c,h]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let a=n>=0?r[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var s;const e=await r.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";t(n)}else t("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),h("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:c}}},4987:(e,r,t)=>{t.r(r),t.d(r,{default:()=>T});var n=t(9950),a=t(4752),s=t(3310),o=t(7492),i=t(4021),d=t(6038),l=t(4414);const c=a.Ay.div`
  background: #FAFBFC;
  padding: 24px 0;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 16px 0;
  }
`,h=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
  }
`,u=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,x=a.Ay.button`
  padding: 8px 14px;
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
  }
`,p=a.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,g=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,m=a.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,j=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,f=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,y=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,w=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`,b=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,A=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,S=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,O=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,k=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,C=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,D=a.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${e=>1===e.rank?"#FFD700":2===e.rank?"#C0C0C0":3===e.rank?"#CD7F32":"#E5E7EB"};
  color: ${e=>e.rank<=3?"white":"#6B7280"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  margin-right: 16px;
  flex-shrink: 0;
`,M=a.Ay.div`
  flex: 1;
  min-width: 0;
`,$=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,E=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,_=a.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`,R=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,T=()=>{const[e,r]=(0,n.useState)("month"),[t,a]=(0,n.useState)(()=>{const e=new Date,r=new Date(e);return r.setMonth(r.getMonth()-1),{start:R(r),end:R(e)}}),[T,z]=(0,n.useState)(!1),[I,P]=(0,n.useState)("all"),[N,q]=(0,n.useState)("sales"),{defaultCurrency:L}=(0,i.i1)(),[Y,G]=(0,n.useState)("RM");(0,n.useEffect)(()=>{L&&G(L)},[L]);const[H,U]=(0,n.useState)([]),[V,W]=(0,n.useState)([]),[J,K]=(0,n.useState)([]),[Q,X]=(0,n.useState)(!0);(0,n.useEffect)(()=>{Z()},[]),(0,n.useEffect)(()=>{V.length>0&&ee()},[V,t.start,t.end]);const Z=async()=>{try{X(!0);const e=localStorage.getItem("auth_token"),[r,t]=await Promise.all([fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}})]);let n=[];r.ok&&(n=await r.json(),U(n));const a=new Map;if(n.forEach(e=>{a.set(e.id,e)}),t.ok){const e=(await t.json()).map(e=>{const r=e.brand_id?a.get(e.brand_id):null;return{id:e.id,name:e.name,brandId:e.brand_id||0,brandName:(null===r||void 0===r?void 0:r.name)||"No Brand",brandCode:(null===r||void 0===r?void 0:r.code)||"-",currency:(null===r||void 0===r?void 0:r.currency)||e.currency||"RM"}});W(e),0===e.length&&X(!1)}else X(!1)}catch(e){console.error("Error fetching data:",e),X(!1)}},ee=async()=>{try{X(!0);const e=localStorage.getItem("auth_token");if(0===V.length)return K([]),void X(!1);const r=V.map(async r=>{try{const n=await fetch(`/api/orders?restaurant_id=${r.id}&start_date=${t.start}&end_date=${t.end}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();console.log(`[Performance] Restaurant ${r.id} (${r.name}) orders response:`,e);let t=[];return Array.isArray(e)?t=e:e.data&&Array.isArray(e.data)?t=e.data:e.orders&&Array.isArray(e.orders)&&(t=e.orders),console.log(`[Performance] Restaurant ${r.id} parsed orders:`,t.length,"orders"),t}return[]}catch(n){return console.error(`[Performance] Error fetching orders for restaurant ${r.id}:`,n),[]}}),n=(await Promise.all(r)).flat();console.log("[Performance] Total orders fetched:",n.length),console.log("[Performance] Sample orders:",n.slice(0,3)),K(n)}catch(e){console.error("Error fetching orders:",e)}finally{X(!1)}},re=e=>{r(e),z(!1);const t=new Date;let n=new Date;switch(e){case"today":n=t;break;case"week":n=new Date(t),n.setDate(n.getDate()-6);break;case"month":n=new Date(t),n.setMonth(n.getMonth()-1);break;case"year":n=new Date(t),n.setFullYear(n.getFullYear()-1);break;case"all":n=new Date("2020-01-01")}a({start:R(n),end:R(t)})},te=(0,n.useMemo)(()=>{const e=new Date(t.start),r=new Date(t.end),n=Math.ceil((r.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const s=new Date(a);return s.setDate(s.getDate()-n),{start:R(s),end:R(a)}},[t.start,t.end]),ne=(0,n.useMemo)(()=>{if(0===V.length)return[];const e=new Date(t.start);e.setHours(0,0,0,0);const r=new Date(t.end);r.setHours(23,59,59,999);const n=new Date(te.start);n.setHours(0,0,0,0);const a=new Date(te.end);return a.setHours(23,59,59,999),V.map(t=>{const s=J.filter(e=>Number(e.restaurant_id)===Number(t.id));console.log(`[Performance] Restaurant ${t.id} (${t.name}):`,{totalOrdersInState:J.length,restaurantOrders:s.length,sampleOrder:s[0]});const o=s.filter(t=>{const n=new Date(t.order_date||t.createdAt);return n>=e&&n<=r});console.log(`[Performance] Restaurant ${t.id} date filter:`,{startDate:e.toISOString(),endDate:r.toISOString(),currentPeriodOrders:o.length});const i=s.filter(e=>{const r=new Date(e.order_date||e.createdAt);return r>=n&&r<=a}),d=o.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status);console.log(`[Performance] Restaurant ${t.id} completed:`,{completedOrders:d.length,statuses:o.map(e=>e.status).filter((e,r,t)=>t.indexOf(e)===r)});const c=d.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),h=l.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),u=h>0?(c-h)/h*100:c>0?100:0,x=d.length>0?c/d.length:0,p=d.reduce((e,r)=>{const t=parseFloat(r.total_amount||"0");return t>e?t:e},0),g=new Set(o.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.preparation_time&&e.preparation_time>0),v=m.length>0?m.reduce((e,r)=>e+(r.preparation_time||0),0)/m.length:0;return{id:t.id,name:t.name,brandId:t.brandId,brandName:t.brandName,brandCode:t.brandCode,currency:t.currency,totalOrders:o.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*h)/100,growth:Math.round(10*u)/10,avgOrder:Math.round(100*x)/100,maxOrder:Math.round(100*p)/100,uniqueCustomers:g,avgServiceTime:Math.round(v)}})},[V,J,t.start,t.end,te]),ae=(0,n.useMemo)(()=>"all"===I?ne:ne.filter(e=>e.brandId.toString()===I),[ne,I]),se=(0,n.useMemo)(()=>[...ae].sort((e,r)=>{switch(N){case"sales":default:return r.sales-e.sales;case"growth":return r.growth-e.growth;case"orders":return r.completedOrders-e.completedOrders;case"customers":return r.uniqueCustomers-e.uniqueCustomers}}),[ae,N]),oe=(0,n.useMemo)(()=>{const e=ae.reduce((e,r)=>e+r.sales,0),r=ae.length,t=ae.reduce((e,r)=>e+r.completedOrders,0),n=ae.reduce((e,r)=>e+r.previousSales,0),a=ae.reduce((e,r)=>e+r.uniqueCustomers,0),s=Math.max(...ae.map(e=>e.maxOrder),0),o=t>0?e/t:0,i=ae.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,r)=>e+r.avgServiceTime,0)/i.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:r,totalOrders:t,totalCustomers:a,maxOrderValue:s,overallAvgOrder:Math.round(100*o)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[ae]),ie=(e,r)=>{const t=r||Y;return(0,d.vv)(e,t)},de=()=>{if(T)return`${t.start} to ${t.end}`;switch(e){case"today":return"Today";case"week":return"This Week";case"month":return"This Month";case"year":return"This Year";case"all":return"All Time";default:return""}};return(0,l.jsx)(s.A,{children:(0,l.jsxs)(o.mc,{children:[(0,l.jsxs)(o.Y9,{children:[(0,l.jsx)("div",{children:(0,l.jsx)(o.hE,{children:"Performance"})}),(0,l.jsxs)(o.ex,{children:[(0,l.jsx)(o.$n,{variant:"secondary",onClick:()=>ee(),children:"Refresh"}),(0,l.jsx)(o.$n,{variant:"primary",children:"Export Report"})]})]}),(0,l.jsxs)(o.UC,{children:[(0,l.jsxs)(c,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Period:"}),(0,l.jsx)(x,{active:"today"===e&&!T,onClick:()=>re("today"),children:"Today"}),(0,l.jsx)(x,{active:"week"===e&&!T,onClick:()=>re("week"),children:"Week"}),(0,l.jsx)(x,{active:"month"===e&&!T,onClick:()=>re("month"),children:"Month"}),(0,l.jsx)(x,{active:"year"===e&&!T,onClick:()=>re("year"),children:"Year"}),(0,l.jsx)(x,{active:"all"===e&&!T,onClick:()=>re("all"),children:"All"}),(0,l.jsxs)(g,{children:[(0,l.jsx)(p,{type:"date",value:t.start,onChange:e=>{a({...t,start:e.target.value}),z(!0)}}),(0,l.jsx)("span",{children:"to"}),(0,l.jsx)(p,{type:"date",value:t.end,onChange:e=>{a({...t,end:e.target.value}),z(!0)}})]})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Brand:"}),(0,l.jsxs)(m,{value:I,onChange:e=>P(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Brands"}),H.map(e=>(0,l.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]}),(0,l.jsx)(u,{style:{marginLeft:"16px"},children:"Sort by:"}),(0,l.jsxs)(m,{value:N,onChange:e=>q(e.target.value),children:[(0,l.jsx)("option",{value:"sales",children:"Revenue"}),(0,l.jsx)("option",{value:"growth",children:"Growth"}),(0,l.jsx)("option",{value:"orders",children:"Orders"}),(0,l.jsx)("option",{value:"customers",children:"Customers"})]})]})]}),(0,l.jsxs)(o.MD,{children:[(0,l.jsxs)(o.hI,{color:"#635BFF",children:[(0,l.jsx)(o.Os,{children:ie(oe.totalSales)}),(0,l.jsx)(o.v0,{children:"Total Revenue"}),(0,l.jsx)(o.d1,{children:de()})]}),(0,l.jsxs)(o.hI,{color:"#10B981",children:[(0,l.jsx)(o.Os,{children:oe.totalOrders.toLocaleString()}),(0,l.jsx)(o.v0,{children:"Total Orders"}),(0,l.jsx)(o.d1,{children:"Completed orders"})]}),(0,l.jsxs)(o.hI,{color:"#F59E0B",children:[(0,l.jsx)(o.Os,{children:oe.totalCustomers.toLocaleString()}),(0,l.jsx)(o.v0,{children:"Customers"}),(0,l.jsx)(o.d1,{children:"Unique customers"})]}),(0,l.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,l.jsx)(o.Os,{children:ie(oe.overallAvgOrder)}),(0,l.jsx)(o.v0,{children:"Avg Order"}),(0,l.jsx)(o.d1,{children:"Per order value"})]})]}),(0,l.jsxs)(o.MD,{style:{marginTop:"-16px"},children:[(0,l.jsxs)(o.hI,{color:"#EC4899",children:[(0,l.jsx)(o.Os,{children:ie(oe.maxOrderValue)}),(0,l.jsx)(o.v0,{children:"Max Order"}),(0,l.jsx)(o.d1,{children:"Highest order value"})]}),(0,l.jsxs)(o.hI,{color:"#06B6D4",children:[(0,l.jsx)(o.Os,{children:oe.overallAvgServiceTime>0?`${oe.overallAvgServiceTime} min`:"N/A"}),(0,l.jsx)(o.v0,{children:"Avg Service Time"}),(0,l.jsx)(o.d1,{children:"Preparation time"})]}),(0,l.jsxs)(o.hI,{color:"#F97316",children:[(0,l.jsxs)(o.Os,{children:[oe.overallGrowth>0?"+":"",oe.overallGrowth,"%"]}),(0,l.jsx)(o.v0,{children:"Growth"}),(0,l.jsx)(o.d1,{children:"vs previous period"})]}),(0,l.jsxs)(o.hI,{color:"#14B8A6",children:[(0,l.jsx)(o.Os,{children:oe.totalRestaurants}),(0,l.jsx)(o.v0,{children:"Restaurants"}),(0,l.jsx)(o.d1,{children:"all"===I?"All brands":"Selected brand"})]})]}),Q?(0,l.jsx)(_,{children:(0,l.jsx)("p",{children:"Loading performance data..."})}):0===se.length?(0,l.jsxs)(_,{children:[(0,l.jsx)("h3",{children:"No Data Available"}),(0,l.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(v,{children:se.map(e=>(0,l.jsxs)(j,{children:[(0,l.jsxs)(f,{children:[(0,l.jsx)(y,{children:e.name}),(0,l.jsx)(w,{children:e.brandCode})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Revenue"}),(0,l.jsxs)(S,{children:[ie(e.sales,e.currency),0!==e.growth&&(0,l.jsxs)(F,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Orders"}),(0,l.jsxs)(S,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Customers"}),(0,l.jsxs)(S,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Avg Order"}),(0,l.jsx)(S,{children:e.avgOrder>0?ie(e.avgOrder,e.currency):"N/A"})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Max Order"}),(0,l.jsx)(S,{children:e.maxOrder>0?ie(e.maxOrder,e.currency):"N/A"})]}),(0,l.jsxs)(b,{children:[(0,l.jsx)(A,{children:"Avg Service Time"}),(0,l.jsx)(S,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,l.jsxs)(O,{children:[(0,l.jsxs)(k,{children:["Restaurant Ranking (",de(),")"]}),se.slice(0,10).map((e,r)=>(0,l.jsxs)(C,{children:[(0,l.jsx)(D,{rank:r+1,children:r+1}),(0,l.jsxs)(M,{children:[(0,l.jsx)($,{children:e.name}),(0,l.jsxs)(B,{children:[(0,l.jsxs)(E,{children:["Revenue: ",ie(e.sales,e.currency)]}),(0,l.jsxs)(E,{children:["Orders: ",e.completedOrders]}),(0,l.jsxs)(E,{children:["Customers: ",e.uniqueCustomers]}),(0,l.jsxs)(E,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);