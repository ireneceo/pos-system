"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5577],{4021:(a,e,r)=>{r.d(e,{i1:()=>i});var t=r(9950),n=r(1367),s=r(6038);const i=()=>{const{user:a}=(0,n.As)(),[e,r]=(0,t.useState)("RM"),[i]=(0,t.useState)(Object.keys(s.DL)),[o,d]=(0,t.useState)(!0),[c,l]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const e=window.location.pathname.split("/"),t=e.indexOf("restaurant");let n=t>=0?e[t+1]:null;if(!n&&null!==a&&void 0!==a&&a.restaurant_id&&(n=a.restaurant_id.toString()),!n)return r("RM"),void d(!1);try{const a=localStorage.getItem("auth_token"),e=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}});if(e.ok){var s;const a=await e.json(),t=a.currency||(null===(s=a.operation_settings)||void 0===s?void 0:s.currency)||"MYR";r(t)}else r("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),l("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===a||void 0===a?void 0:a.restaurant_id]),{defaultCurrency:e,supportedCurrencies:i,loading:o,error:c}}},5577:(a,e,r)=>{r.r(e),r.d(e,{default:()=>H});var t=r(9950),n=r(4752),s=r(4492),i=r(8409),o=r(4021),d=r(6038),c=r(5030),l=r(4414);const h=n.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,x=n.Ay.div`
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
`,p=n.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,u=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,v=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,f=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,j=n.Ay.div``,w=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
`,y=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${a=>{switch(a.status){case"active":return"#ECFDF5";case"inactive":return"#FEF2F2";case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${a=>{switch(a.status){case"active":return"#059669";case"inactive":return"#DC2626";case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,F=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F3F4F6;
`,A=n.Ay.div`
  text-align: center;
`,z=n.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,M=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
`,k=n.Ay.span`
  color: ${a=>a.filled?"#FFC107":"#E5E7EB"};
  font-size: 16px;
`,B=n.Ay.button`
  width: 100%;
  padding: 10px 16px;
  margin-top: 16px;
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
`,C=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,E=n.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    
    svg {
      fill: #635BFF;
    }
  }
`,S=n.Ay.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  
  svg {
    width: 32px;
    height: 32px;
    fill: #6B7280;
    transition: fill 0.2s;
  }
`,V=n.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,H=()=>{const{t:a}=(0,c.Bd)("admin"),e=(0,s.Zp)(),[r,n]=(0,t.useState)([]),{defaultCurrency:H}=(0,o.i1)(),[O,R]=(0,t.useState)("RM");(0,t.useEffect)(()=>{H&&R(H)},[H]),(0,t.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 ManagerDashboard: Fetching restaurants from API...");const a=await fetch("/api/restaurants");if(!a.ok)throw new Error("Failed to fetch restaurants");const e=(await a.json()).filter(a=>2===a.admin_id);console.log("\ud83c\udfea Found manager restaurants:",e);const r=e.map(a=>({id:a.id.toString(),name:a.name,location:a.address||a.location||"No address",status:"active"===a.status?"active":"suspended"===a.status?"maintenance":"inactive",todaySales:Math.floor(5e3*Math.random())+2e3,todayOrders:Math.floor(150*Math.random())+50,staffCount:Math.floor(10*Math.random())+5,rating:Number((1*Math.random()+4).toFixed(1))}));console.log("\u2705 ManagerDashboard: Loaded restaurants data:",r),n(r)}catch(a){console.error("\u274c ManagerDashboard: Error fetching restaurants:",a),n([])}})()},[]);const I=r.filter(a=>"active"===a.status).length,$=r.reduce((a,e)=>a+e.todaySales,0),_=r.reduce((a,e)=>a+e.todayOrders,0),L=r.reduce((a,e)=>a+e.staffCount,0),Y=a=>{const e=[];for(let r=1;r<=5;r++)e.push((0,l.jsx)(k,{filled:r<=a,children:"\u2605"},r));return e};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(h,{children:[(0,l.jsx)(x,{children:(0,l.jsx)(m,{children:a("admin:managerDashboard.dashboard")})}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(i.MD,{children:[(0,l.jsxs)(i.hI,{color:"#059669",children:[(0,l.jsx)(i.v0,{children:a("admin:managerDashboard.todaysTotalSales")}),(0,l.jsx)(i.Os,{children:(0,d.vv)($,O)})]}),(0,l.jsxs)(i.hI,{color:"#2563EB",children:[(0,l.jsx)(i.v0,{children:a("admin:managerDashboard.totalOrders")}),(0,l.jsx)(i.Os,{children:_})]}),(0,l.jsxs)(i.hI,{color:"#7C3AED",children:[(0,l.jsx)(i.v0,{children:a("admin:managerDashboard.activeRestaurants")}),(0,l.jsxs)(i.Os,{children:[I,"/",r.length]})]}),(0,l.jsxs)(i.hI,{color:"#D97706",children:[(0,l.jsx)(i.v0,{children:a("admin:managerDashboard.totalStaff")}),(0,l.jsx)(i.Os,{children:L})]})]}),(0,l.jsx)(g,{children:a("admin:managerDashboard.quickActions")}),(0,l.jsxs)(C,{children:[(0,l.jsxs)(E,{onClick:()=>e("/pos/manager/reports"),children:[(0,l.jsx)(S,{children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"})})}),(0,l.jsx)(V,{children:a("admin:managerDashboard.viewReports")})]}),(0,l.jsxs)(E,{onClick:()=>e("/pos/manager/invoices"),children:[(0,l.jsx)(S,{children:(0,l.jsxs)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,l.jsx)("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"}),(0,l.jsx)("path",{d:"M9 15h6v-1H9v1zm0-3h6v-1H9v1zm0-3h6V8H9v1z"})]})}),(0,l.jsx)(V,{children:a("admin:managerDashboard.restaurantInvoices")})]}),(0,l.jsxs)(E,{onClick:()=>e("/pos/manager/sales"),children:[(0,l.jsx)(S,{children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.29 0-.84-.68-1.37-2.08-1.81-1.75-.55-3.28-1.3-3.28-3.4 0-1.68 1.19-2.84 2.8-3.18V5h2.67v1.61c1.73.34 2.76 1.6 2.85 3.16h-1.96c-.12-.78-.53-1.45-1.56-1.45-1.03 0-1.52.52-1.52 1.25 0 .74.66 1.21 2.02 1.63 1.88.6 3.36 1.36 3.36 3.56 0 1.84-1.21 3.05-3.08 3.33z"})})}),(0,l.jsx)(V,{children:a("admin:managerDashboard.salesOverview")})]}),(0,l.jsxs)(E,{onClick:()=>e("/pos/manager/admins"),children:[(0,l.jsx)(S,{children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.98 2.98 0 0 0 17.05 6H16c-.8 0-1.54.37-2.01.96l-.94 1.21A1 1 0 0 0 13.96 10l.79 1.04c.39.51.97.86 1.61.96h.64v10h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5a2.5 2.5 0 0 0-5 0V15h1.5v7h2zm6.5-12c.83 0 1.5-.67 1.5-1.5S14.83 8 14 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"})})}),(0,l.jsx)(V,{children:a("admin:managerDashboard.restaurantAdmins")})]}),(0,l.jsxs)(E,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,l.jsx)(S,{children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,l.jsx)("path",{d:"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"})})}),(0,l.jsx)(V,{children:a("admin:managerDashboard.manageSubscriptions")})]})]}),(0,l.jsx)(g,{children:a("admin:managerDashboard.yourRestaurants")}),(0,l.jsx)(u,{children:r.map(r=>(0,l.jsxs)(v,{onClick:()=>{return a=r.id,void e(`/pos/manager/reports?restaurant=${a}`);var a},children:[(0,l.jsxs)(f,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:r.name}),(0,l.jsx)(b,{children:r.location})]}),(0,l.jsx)(y,{status:r.status,children:r.status})]}),(0,l.jsxs)(M,{children:[Y(r.rating),(0,l.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",marginLeft:"8px"},children:r.rating})]}),(0,l.jsxs)(F,{children:[(0,l.jsxs)(A,{children:[(0,l.jsx)(z,{children:(0,d.vv)(r.todaySales,O)}),(0,l.jsx)(D,{children:a("admin:managerDashboard.todaysSales")})]}),(0,l.jsxs)(A,{children:[(0,l.jsx)(z,{children:r.todayOrders}),(0,l.jsx)(D,{children:a("admin:managerDashboard.orders")})]}),(0,l.jsxs)(A,{children:[(0,l.jsx)(z,{children:r.staffCount}),(0,l.jsx)(D,{children:a("admin:managerDashboard.staff")})]})]}),(0,l.jsx)(B,{children:a("admin:managerDashboard.viewDetails")})]},r.id))})]})]})})}}}]);