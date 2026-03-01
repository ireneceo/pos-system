"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1143],{1143:(e,r,t)=>{t.r(r),t.d(r,{default:()=>R});var s=t(8819),a=t(9950),n=t(4752),o=t(2674),i=t(6038),d=t(4414);const l=n.Ay.div`
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
`,c=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
    width: 100%;
  }
`,h=n.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  margin-right: 4px;
`,x=n.Ay.button`
  padding: 8px 14px;
  background: ${e=>e.active?"#7C3AED":"white"};
  color: ${e=>e.active?"white":"#6B7280"};
  border: 1px solid ${e=>e.active?"#7C3AED":"#E6EBF1"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#6D28D9":"#F8FAFC"};
  }
`,u=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${s.w.colors.border};
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #7C3AED;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
  }
`,p=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`,g=n.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${s.w.colors.border};
  border-radius: 6px;
  font-size: 13px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #7C3AED;
  }
`,m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,j=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,f=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,w=n.Ay.span`
  font-size: 12px;
  color: ${e=>"active"===e.status?"#059669":"#6B7280"};
  background: ${e=>"active"===e.status?"#ECFDF5":"#F3F4F6"};
  padding: 4px 8px;
  border-radius: 4px;
`,y=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,A=n.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,b=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,k=n.Ay.span`
  font-size: 11px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${e=>e.positive?"#ECFDF5":"#FEE2E2"};
`,C=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,O=n.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 20px 0;
`,D=n.Ay.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,F=n.Ay.div`
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
`,S=n.Ay.div`
  flex: 1;
  min-width: 0;
`,$=n.Ay.div`
  font-size: 15px;
  font-weight: 600;
  color: ${s.w.colors.secondary};
  margin-bottom: 4px;
`,E=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: ${s.w.colors.text.muted};
`,M=n.Ay.span`
  display: flex;
  align-items: center;
  gap: 4px;
`,T=n.Ay.div`
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
`,B=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,R=()=>{const[e,r]=(0,a.useState)("month"),[t,s]=(0,a.useState)(()=>{const e=new Date,r=new Date(e);return r.setMonth(r.getMonth()-1),{start:B(r),end:B(e)}}),[n,R]=(0,a.useState)(!1),[z,_]=(0,a.useState)("sales"),[I,Y]=(0,a.useState)([]),[q,L]=(0,a.useState)([]),[N,G]=(0,a.useState)(!0);(0,a.useEffect)(()=>{U()},[]),(0,a.useEffect)(()=>{I.length>0&&H()},[I,t.start,t.end]);const U=async()=>{try{G(!0);const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),t=e.data||e,s=(Array.isArray(t)?t:[]).map(e=>({id:e.id,name:e.name,status:e.status||"active",currency:e.currency||"MYR"}));Y(s),0===s.length&&G(!1)}else G(!1)}catch(e){console.error("Error fetching data:",e),G(!1)}},H=async()=>{try{G(!0);const e=localStorage.getItem("auth_token");if(0===I.length)return L([]),void G(!1);const r=I.map(async r=>{try{const s=await fetch(`/api/orders?restaurant_id=${r.id}&start_date=${t.start}&end_date=${t.end}`,{headers:{Authorization:`Bearer ${e}`}});if(s.ok){const e=await s.json();let r=[];return Array.isArray(e)?r=e:e.data&&Array.isArray(e.data)?r=e.data:e.orders&&Array.isArray(e.orders)&&(r=e.orders),r}return[]}catch(s){return console.error(`Error fetching orders for restaurant ${r.id}:`,s),[]}}),s=(await Promise.all(r)).flat();L(s)}catch(e){console.error("Error fetching orders:",e)}finally{G(!1)}},P=e=>{r(e),R(!1);const t=new Date;let a=new Date;switch(e){case"today":a=t;break;case"week":a=new Date(t),a.setDate(a.getDate()-6);break;case"month":a=new Date(t),a.setMonth(a.getMonth()-1);break;case"year":a=new Date(t),a.setFullYear(a.getFullYear()-1);break;case"all":a=new Date("2020-01-01")}s({start:B(a),end:B(t)})},V=(0,a.useMemo)(()=>{const e=new Date(t.start),r=new Date(t.end),s=Math.ceil((r.getTime()-e.getTime())/864e5),a=new Date(e);a.setDate(a.getDate()-1);const n=new Date(a);return n.setDate(n.getDate()-s),{start:B(n),end:B(a)}},[t.start,t.end]),W=(0,a.useMemo)(()=>{if(0===I.length)return[];const e=new Date(t.start);e.setHours(0,0,0,0);const r=new Date(t.end);r.setHours(23,59,59,999);const s=new Date(V.start);s.setHours(0,0,0,0);const a=new Date(V.end);return a.setHours(23,59,59,999),I.map(t=>{const n=q.filter(e=>Number(e.restaurant_id)===Number(t.id)),o=n.filter(t=>{const s=new Date(t.order_date||t.createdAt);return s>=e&&s<=r}),i=n.filter(e=>{const r=new Date(e.order_date||e.createdAt);return r>=s&&r<=a}),d=o.filter(e=>"completed"===e.status),l=i.filter(e=>"completed"===e.status),c=d.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),h=l.reduce((e,r)=>e+parseFloat(r.total_amount||"0"),0),x=h>0?(c-h)/h*100:c>0?100:0,u=d.length>0?c/d.length:0,p=d.reduce((e,r)=>{const t=parseFloat(r.total_amount||"0");return t>e?t:e},0),g=new Set(o.filter(e=>e.customer_id).map(e=>e.customer_id)).size,m=d.filter(e=>e.preparation_time&&e.preparation_time>0),v=m.length>0?m.reduce((e,r)=>e+(r.preparation_time||0),0)/m.length:0;return{id:t.id,name:t.name,status:t.status,currency:t.currency,totalOrders:o.length,completedOrders:d.length,sales:Math.round(100*c)/100,previousSales:Math.round(100*h)/100,growth:Math.round(10*x)/10,avgOrder:Math.round(100*u)/100,maxOrder:Math.round(100*p)/100,uniqueCustomers:g,avgServiceTime:Math.round(v)}})},[I,q,t.start,t.end,V]),J=(0,a.useMemo)(()=>[...W].sort((e,r)=>{switch(z){case"sales":default:return r.sales-e.sales;case"growth":return r.growth-e.growth;case"orders":return r.completedOrders-e.completedOrders;case"customers":return r.uniqueCustomers-e.uniqueCustomers}}),[W,z]),K=(0,a.useMemo)(()=>{const e=W.reduce((e,r)=>e+r.sales,0),r=W.length,t=W.reduce((e,r)=>e+r.completedOrders,0),s=W.reduce((e,r)=>e+r.previousSales,0),a=W.reduce((e,r)=>e+r.uniqueCustomers,0),n=Math.max(...W.map(e=>e.maxOrder),0),o=t>0?e/t:0,i=W.filter(e=>e.avgServiceTime>0),d=i.length>0?i.reduce((e,r)=>e+r.avgServiceTime,0)/i.length:0,l=s>0?(e-s)/s*100:e>0?100:0;return{totalSales:e,totalRestaurants:r,totalOrders:t,totalCustomers:a,maxOrderValue:n,overallAvgOrder:Math.round(100*o)/100,overallAvgServiceTime:Math.round(d),overallGrowth:Math.round(10*l)/10}},[W]),Q=(e,r)=>{const t=r||"MYR";return(0,i.vv)(e,t)},X=()=>{if(n)return`${t.start} to ${t.end}`;switch(e){case"today":return"Today";case"week":return"This Week";case"month":return"This Month";case"year":return"This Year";case"all":return"All Time";default:return""}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(o.mc,{children:[(0,d.jsxs)(o.Y9,{children:[(0,d.jsx)("div",{children:(0,d.jsx)(o.hE,{children:"Performance"})}),(0,d.jsxs)(o.ex,{children:[(0,d.jsx)(o.$n,{variant:"secondary",onClick:()=>H(),children:"Refresh"}),(0,d.jsx)(o.$n,{variant:"primary",onClick:()=>{if(0===J.length)return;const e=J.map(e=>[`"${e.name}"`,e.status,e.sales.toFixed(2),e.completedOrders,e.uniqueCustomers,e.avgOrder.toFixed(2),e.maxOrder.toFixed(2),e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A",`${e.growth}%`]),r=[["Restaurant","Status","Revenue","Orders","Customers","Avg Order","Max Order","Avg Service Time","Growth %"].join(","),...e.map(e=>e.join(","))].join("\n"),s=new Blob([r],{type:"text/csv;charset=utf-8;"}),a=document.createElement("a");a.href=URL.createObjectURL(s),a.download=`owner-performance-${t.start}-to-${t.end}.csv`,a.click(),URL.revokeObjectURL(a.href)},children:"Export Report"})]})]}),(0,d.jsxs)(o.UC,{children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(h,{children:"Period:"}),(0,d.jsx)(x,{active:"today"===e&&!n,onClick:()=>P("today"),children:"Today"}),(0,d.jsx)(x,{active:"week"===e&&!n,onClick:()=>P("week"),children:"Week"}),(0,d.jsx)(x,{active:"month"===e&&!n,onClick:()=>P("month"),children:"Month"}),(0,d.jsx)(x,{active:"year"===e&&!n,onClick:()=>P("year"),children:"Year"}),(0,d.jsx)(x,{active:"all"===e&&!n,onClick:()=>P("all"),children:"All"}),(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{type:"date",value:t.start,onChange:e=>{s({...t,start:e.target.value}),R(!0)}}),(0,d.jsx)("span",{children:"to"}),(0,d.jsx)(u,{type:"date",value:t.end,onChange:e=>{s({...t,end:e.target.value}),R(!0)}})]})]}),(0,d.jsxs)(c,{children:[(0,d.jsx)(h,{children:"Sort by:"}),(0,d.jsxs)(g,{value:z,onChange:e=>_(e.target.value),children:[(0,d.jsx)("option",{value:"sales",children:"Revenue"}),(0,d.jsx)("option",{value:"growth",children:"Growth"}),(0,d.jsx)("option",{value:"orders",children:"Orders"}),(0,d.jsx)("option",{value:"customers",children:"Customers"})]})]})]}),(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{color:"#7C3AED",children:[(0,d.jsx)(o.Os,{children:Q(K.totalSales)}),(0,d.jsx)(o.v0,{children:"Total Revenue"}),(0,d.jsx)(o.d1,{children:X()})]}),(0,d.jsxs)(o.hI,{color:"#10B981",children:[(0,d.jsx)(o.Os,{children:K.totalOrders.toLocaleString()}),(0,d.jsx)(o.v0,{children:"Total Orders"}),(0,d.jsx)(o.d1,{children:"Completed orders"})]}),(0,d.jsxs)(o.hI,{color:"#F59E0B",children:[(0,d.jsx)(o.Os,{children:K.totalCustomers.toLocaleString()}),(0,d.jsx)(o.v0,{children:"Customers"}),(0,d.jsx)(o.d1,{children:"Unique customers"})]}),(0,d.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,d.jsx)(o.Os,{children:Q(K.overallAvgOrder)}),(0,d.jsx)(o.v0,{children:"Avg Order"}),(0,d.jsx)(o.d1,{children:"Per order value"})]})]}),(0,d.jsxs)(o.MD,{style:{marginTop:"-16px"},children:[(0,d.jsxs)(o.hI,{color:"#EC4899",children:[(0,d.jsx)(o.Os,{children:Q(K.maxOrderValue)}),(0,d.jsx)(o.v0,{children:"Max Order"}),(0,d.jsx)(o.d1,{children:"Highest order value"})]}),(0,d.jsxs)(o.hI,{color:"#06B6D4",children:[(0,d.jsx)(o.Os,{children:K.overallAvgServiceTime>0?`${K.overallAvgServiceTime} min`:"N/A"}),(0,d.jsx)(o.v0,{children:"Avg Service Time"}),(0,d.jsx)(o.d1,{children:"Preparation time"})]}),(0,d.jsxs)(o.hI,{color:"#F97316",children:[(0,d.jsxs)(o.Os,{children:[K.overallGrowth>0?"+":"",K.overallGrowth,"%"]}),(0,d.jsx)(o.v0,{children:"Growth"}),(0,d.jsx)(o.d1,{children:"vs previous period"})]}),(0,d.jsxs)(o.hI,{color:"#14B8A6",children:[(0,d.jsx)(o.Os,{children:K.totalRestaurants}),(0,d.jsx)(o.v0,{children:"Restaurants"}),(0,d.jsx)(o.d1,{children:"Your restaurants"})]})]}),N?(0,d.jsx)(T,{children:(0,d.jsx)("p",{children:"Loading performance data..."})}):0===J.length?(0,d.jsxs)(T,{children:[(0,d.jsx)("h3",{children:"No Data Available"}),(0,d.jsx)("p",{children:"No performance data found for the selected period."})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{children:J.map(e=>(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(f,{children:e.name}),(0,d.jsx)(w,{status:e.status,children:"active"===e.status?"Active":e.status})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Revenue"}),(0,d.jsxs)(b,{children:[Q(e.sales,e.currency),0!==e.growth&&(0,d.jsxs)(k,{positive:e.growth>0,children:[e.growth>0?"+":"",e.growth,"%"]})]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Orders"}),(0,d.jsxs)(b,{children:[e.completedOrders.toLocaleString()," completed"]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Customers"}),(0,d.jsxs)(b,{children:[e.uniqueCustomers.toLocaleString()," unique"]})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Avg Order"}),(0,d.jsx)(b,{children:e.avgOrder>0?Q(e.avgOrder,e.currency):"N/A"})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Max Order"}),(0,d.jsx)(b,{children:e.maxOrder>0?Q(e.maxOrder,e.currency):"N/A"})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(A,{children:"Avg Service Time"}),(0,d.jsx)(b,{children:e.avgServiceTime>0?`${e.avgServiceTime} min`:"N/A"})]})]},e.id))}),(0,d.jsxs)(C,{children:[(0,d.jsxs)(O,{children:["Restaurant Ranking (",X(),")"]}),J.slice(0,10).map((e,r)=>(0,d.jsxs)(D,{children:[(0,d.jsx)(F,{rank:r+1,children:r+1}),(0,d.jsxs)(S,{children:[(0,d.jsx)($,{children:e.name}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(M,{children:["Revenue: ",Q(e.sales,e.currency)]}),(0,d.jsxs)(M,{children:["Orders: ",e.completedOrders]}),(0,d.jsxs)(M,{children:["Customers: ",e.uniqueCustomers]}),(0,d.jsxs)(M,{children:["Growth: ",e.growth>0?"+":"",e.growth,"%"]})]})]})]},e.id))]})]})]})]})})}}}]);