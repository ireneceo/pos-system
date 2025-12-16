"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4987],{4987:(e,r,t)=>{t.r(r),t.d(r,{default:()=>T});var n=t(9950),a=t(4752),s=t(3310),o=t(7492),i=t(4414);const d=a.Ay.div`
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
`,l=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
  }
`,c=a.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,h=a.Ay.button`
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
`,x=a.Ay.input`
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
`,u=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,p=a.Ay.select`
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
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,m=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,j=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,v=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,f=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  background: #F3F4F6;
  padding: 4px 8px;
  border-radius: 4px;
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,y=a.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,b=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,A=a.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,F=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,S=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,O=a.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,k=a.Ay.div`
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
`,C=a.Ay.div`
  flex: 1;
  min-width: 0;
`,D=a.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,$=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
`,M=a.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,B=a.Ay.div`
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
`,E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,T=()=>{const[e,r]=(0,n.useState)("month"),[t,a]=(0,n.useState)(()=>{const e=new Date,r=new Date(e);return r.setMonth(r.getMonth()-1),{start:E(r),end:E(e)}}),[T,z]=(0,n.useState)(!1),[_,R]=(0,n.useState)("all"),[I,P]=(0,n.useState)("sales"),[N,q]=(0,n.useState)([]),[L,Y]=(0,n.useState)([]),[G,H]=(0,n.useState)([]),[U,V]=(0,n.useState)(!0);(0,n.useEffect)(()=>{W()},[]),(0,n.useEffect)(()=>{L.length>0&&K()},[L,t.start,t.end]);const W=async()=>{try{V(!0);const e=localStorage.getItem("auth_token"),[r,t]=await Promise.all([fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}}),fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`}})]);let n=[];r.ok&&(n=await r.json(),q(n));const a=new Map;if(n.forEach(e=>{a.set(e.id,e)}),t.ok){const e=(await t.json()).map(e=>{const r=e.brand_id?a.get(e.brand_id):null;return{id:e.id,name:e.name,brandId:e.brand_id||0,brandName:(null===r||void 0===r?void 0:r.name)||"No Brand",brandCode:(null===r||void 0===r?void 0:r.code)||"-",currency:(null===r||void 0===r?void 0:r.currency)||e.currency||"RM"}});Y(e),0===e.length&&V(!1)}else V(!1)}catch(e){console.error("Error fetching data:",e),V(!1)}},K=async()=>{try{V(!0);const e=localStorage.getItem("auth_token");if(0===L.length)return H([]),void V(!1);const r=L.map(async r=>{try{const n=await fetch(`/api/orders?restaurant_id=${r.id}&start_date=${t.start}&end_date=${t.end}`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();console.log(`[Performance] Restaurant ${r.id} (${r.name}) orders response:`,e);let t=[];return Array.isArray(e)?t=e:e.data&&Array.isArray(e.data)?t=e.data:e.orders&&Array.isArray(e.orders)&&(t=e.orders),console.log(`[Performance] Restaurant ${r.id} parsed orders:`,t.length,"orders"),t}return[]}catch(n){return console.error(`[Performance] Error fetching orders for restaurant ${r.id}:`,n),[]}}),n=(await Promise.all(r)).flat();console.log("[Performance] Total orders fetched:",n.length),console.log("[Performance] Sample orders:",n.slice(0,3)),H(n)}catch(e){console.error("Error fetching orders:",e)}finally{V(!1)}},J=e=>{r(e),z(!1);const t=new Date;let n=new Date;switch(e){case"today":n=t;break;case"week":n=new Date(t),n.setDate(n.getDate()-6);break;case"month":n=new Date(t),n.setMonth(n.getMonth()-1);break;case"year":n=new Date(t),n.setFullYear(n.getFullYear()-1);break;case"all":n=new Date("2020-01-01")}a({start:E(n),end:E(t)})},Q=(0,n.useMemo)(()=>{const e=new Date(t.start),r=new Date(t.end),n=Math.ceil((r.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const s=new Date(a);return s.setDate(s.getDate()-n),{start:E(s),end:E(a)}},[t.start,t.end]),X=(0,n.useMemo)(()=>{if(0===L.length)return[];const e=new Date(t.start);e.setHours(0,0,0,0);const r=new Date(t.end);r.setHours(23,59,59,999);const n=new Date(Q.start);n.setHours(0,0,0,0);const a=new Date(Q.end);return a.setHours(23,59,59,999),L.map(t=>{const s=G.filter(e=>Number(e.restaurant_id)===Number(t.id));console.log(`[Performance] Restaurant ${t.id} (${t.name}):`,{totalOrdersInState:G.length,restaurantOrders:s.length,sampleOrder:s[0]});const o=s.filter(t=>{const n=new Date(t.order_date||t.createdAt);return n>=e&&n<=r});console.log(`[Performance] Restaurant ${t.id} date filter:`,{startDate:e.toISOString(),endDate:r.toISOString(),currentPeriodOrders:o.length});const i=s.filter(e=>{const r=new Date(e.order_date||e.createdAt);return r>=n&&r<=a}),d=o.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status);console.log(`[Performance] Restaurant ${t.id} completed:`,{completedOrders:d.length,statuses:o.map(e=>e.status).filter((e,r,t)=>t.indexOf(e)===r)});const c=d.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),h=l.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),x=h>0?(c-h)/h*100:c>0?100:0,u=d.length>0?c/d.length:0,p=d.reduce((e,r)=>{const t=parseFloat(r.total_amount||"0");return t>e?t:e},0),g=new Set(o.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.preparation_time&&e.preparation_time>0),j=m.length>0?m.reduce((e,r)=>e+(r.preparation_time||0),0)/m.length:0;return{id:t.id,name:t.name,brandId:t.brandId,brandName:t.brandName,brandCode:t.brandCode,currency:t.currency,totalOrders:o.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*h)/100,growth:Math.round(10*x)/10,avgOrder:Math.round(100*u)/100,maxOrder:Math.round(100*p)/100,uniqueCustomers:g,avgServiceTime:Math.round(j)}})},[L,G,t.start,t.end,Q]),Z=(0,n.useMemo)(()=>"all"===_?X:X.filter(e=>e.brandId.toString()===_),[X,_]),ee=(0,n.useMemo)(()=>[...Z].sort((e,r)=>{switch(I){case"sales":default:return r.sales-e.sales;case"growth":return r.growth-e.growth;case"orders":return r.completedOrders-e.completedOrders;case"customers":return r.uniqueCustomers-e.uniqueCustomers}}),[Z,I]),re=(0,n.useMemo)(()=>{const e=Z.reduce((e,r)=>e+r.sales,0),r=Z.length,t=Z.reduce((e,r)=>e+r.completedOrders,0),n=Z.reduce((e,r)=>e+r.previousSales,0),a=Z.reduce((e,r)=>e+r.uniqueCustomers,0),s=Math.max(...Z.map(e=>e.maxOrder),0),o=t>0?e/t:0,i=Z.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,r)=>e+r.avgServiceTime,0)/i.length:0,l=n>0?(e-n)/n*100:e>0?100:0;return{totalSales:e,totalRestaurants:r,totalOrders:t,totalCustomers:a,maxOrderValue:s,overallAvgOrder:Math.round(100*o)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[Z]),te=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"RM";return e>=1e6?`${r} ${(e/1e6).toFixed(1)}M`:e>=1e3?`${r} ${(e/1e3).toFixed(1)}K`:`${r} ${e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2})}`},ne=()=>{if(T)return`${t.start} to ${t.end}`;switch(e){case"today":return"Today";case"week":return"This Week";case"month":return"This Month";case"year":return"This Year";case"all":return"All Time";default:return""}};return(0,i.jsx)(s.A,{children:(0,i.jsxs)(o.mc,{children:[(0,i.jsxs)(o.Y9,{children:[(0,i.jsx)("div",{children:(0,i.jsx)(o.hE,{children:"Performance"})}),(0,i.jsxs)(o.ex,{children:[(0,i.jsx)(o.$n,{variant:"secondary",onClick:()=>K(),children:"Refresh"}),(0,i.jsx)(o.$n,{variant:"primary",children:"Export Report"})]})]}),(0,i.jsxs)(o.UC,{children:[(0,i.jsxs)(d,{children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:"Period:"}),(0,i.jsx)(h,{active:"today"===e&&!T,onClick:()=>J("today"),children:"Today"}),(0,i.jsx)(h,{active:"week"===e&&!T,onClick:()=>J("week"),children:"Week"}),(0,i.jsx)(h,{active:"month"===e&&!T,onClick:()=>J("month"),children:"Month"}),(0,i.jsx)(h,{active:"year"===e&&!T,onClick:()=>J("year"),children:"Year"}),(0,i.jsx)(h,{active:"all"===e&&!T,onClick:()=>J("all"),children:"All"}),(0,i.jsxs)(u,{children:[(0,i.jsx)(x,{type:"date",value:t.start,onChange:e=>{a({...t,start:e.target.value}),z(!0)}}),(0,i.jsx)("span",{children:"to"}),(0,i.jsx)(x,{type:"date",value:t.end,onChange:e=>{a({...t,end:e.target.value}),z(!0)}})]})]}),(0,i.jsxs)(l,{children:[(0,i.jsx)(c,{children:"Brand:"}),(0,i.jsxs)(p,{value:_,onChange:e=>R(e.target.value),children:[(0,i.jsx)("option",{value:"all",children:"All Brands"}),N.map(e=>(0,i.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]}),(0,i.jsx)(c,{style:{marginLeft:"16px"},children:"Sort by:"}),(0,i.jsxs)(p,{value:I,onChange:e=>P(e.target.value),children:[(0,i.jsx)("option",{value:"sales",children:"Revenue"}),(0,i.jsx)("option",{value:"growth",children:"Growth"}),(0,i.jsx)("option",{value:"orders",children:"Orders"}),(0,i.jsx)("option",{value:"customers",children:"Customers"})]})]})]}),(0,i.jsxs)(o.MD,{children:[(0,i.jsxs)(o.hI,{color:"#635BFF",children:[(0,i.jsx)(o.Os,{children:te(re.totalSales)}),(0,i.jsx)(o.v0,{children:"Total Revenue"}),(0,i.jsx)(o.d1,{children:ne()})]}),(0,i.jsxs)(o.hI,{color:"#10B981",children:[(0,i.jsx)(o.Os,{children:re.totalOrders.toLocaleString()}),(0,i.jsx)(o.v0,{children:"Total Orders"}),(0,i.jsx)(o.d1,{children:"Completed orders"})]}),(0,i.jsxs)(o.hI,{color:"#F59E0B",children:[(0,i.jsx)(o.Os,{children:re.totalCustomers.toLocaleString()}),(0,i.jsx)(o.v0,{children:"Customers"}),(0,i.jsx)(o.d1,{children:"Unique customers"})]}),(0,i.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,i.jsx)(o.Os,{children:te(re.overallAvgOrder)}),(0,i.jsx)(o.v0,{children:"Avg Order"}),(0,i.jsx)(o.d1,{children:"Per order value"})]})]}),(0,i.jsxs)(o.MD,{style:{marginTop:"-16px"},children:[(0,i.jsxs)(o.hI,{color:"#EC4899",children:[(0,i.jsx)(o.Os,{children:te(re.maxOrderValue)}),(0,i.jsx)(o.v0,{children:"Max Order"}),(0,i.jsx)(o.d1,{children:"Highest order value"})]}),(0,i.jsxs)(o.hI,{color:"#06B6D4",children:[(0,i.jsx)(o.Os,{children:re.overallAvgServiceTime>0?`${re.overallAvgServiceTime} min`:"N/A"}),(0,i.jsx)(o.v0,{children:"Avg Service Time"}),(0,i.jsx)(o.d1,{children:"Preparation time"})]}),(0,i.jsxs)(o.hI,{color:"#F97316",children:[(0,i.jsxs)(o.Os,{children:[re.overallGrowth>0?"+":"",re.overallGrowth,"%"]}),(0,i.jsx)(o.v0,{children:"Growth"}),(0,i.jsx)(o.d1,{children:"vs previous period"})]}),(0,i.jsxs)(o.hI,{color:"#14B8A6",children:[(0,i.jsx)(o.Os,{children:re.totalRestaurants}),(0,i.jsx)(o.v0,{children:"Restaurants"}),(0,i.jsx)(o.d1,{children:"all"===_?"All brands":"Selected brand"})]})]}),U?(0,i.jsx)(B,{children:(0,i.jsx)("p",{children:"Loading performance data..."})}):0===ee.length?(0,i.jsxs)(B,{children:[(0,i.jsx)("h3",{children:"No Data Available"}),(0,i.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g,{children:ee.map(e=>(0,i.jsxs)(m,{children:[(0,i.jsxs)(j,{children:[(0,i.jsx)(v,{children:e.name}),(0,i.jsx)(f,{children:e.brandCode})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Revenue"}),(0,i.jsxs)(b,{children:[te(e.sales,e.currency),0!==e.growth&&(0,i.jsxs)(A,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Orders"}),(0,i.jsxs)(b,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Customers"}),(0,i.jsxs)(b,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Avg Order"}),(0,i.jsx)(b,{children:e.avgOrder>0?te(e.avgOrder,e.currency):"N/A"})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Max Order"}),(0,i.jsx)(b,{children:e.maxOrder>0?te(e.maxOrder,e.currency):"N/A"})]}),(0,i.jsxs)(w,{children:[(0,i.jsx)(y,{children:"Avg Service Time"}),(0,i.jsx)(b,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,i.jsxs)(F,{children:[(0,i.jsxs)(S,{children:["Restaurant Ranking (",ne(),")"]}),ee.slice(0,10).map((e,r)=>(0,i.jsxs)(O,{children:[(0,i.jsx)(k,{rank:r+1,children:r+1}),(0,i.jsxs)(C,{children:[(0,i.jsx)(D,{children:e.name}),(0,i.jsxs)($,{children:[(0,i.jsxs)(M,{children:["Revenue: ",te(e.sales,e.currency)]}),(0,i.jsxs)(M,{children:["Orders: ",e.completedOrders]}),(0,i.jsxs)(M,{children:["Customers: ",e.uniqueCustomers]}),(0,i.jsxs)(M,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);