"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5577],{5577:(e,s,t)=>{t.r(s),t.d(s,{default:()=>V});var r=t(9950),i=t(4752),n=t(3310),a=t(4492),o=t(7492),d=t(4414);const c=i.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
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
`,p=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`,m=i.Ay.div`
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
`,v=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,u=i.Ay.div``,f=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
`,w=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":return"#FEF2F2";case"maintenance":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":return"#DC2626";case"maintenance":return"#D97706";default:return"#6B7280"}}};
`,y=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #F3F4F6;
`,b=i.Ay.div`
  text-align: center;
`,F=i.Ay.div`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
`,M=i.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 16px;
`,k=i.Ay.button`
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
`,B=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
`,C=i.Ay.div`
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
`,E=i.Ay.div`
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
`,S=i.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,V=()=>{const e=(0,a.Zp)(),[s,t]=(0,r.useState)([]);(0,r.useEffect)(()=>{(async()=>{try{console.log("\ud83d\udd04 ManagerDashboard: Fetching restaurants from API...");const e=await fetch("/api/restaurants");if(!e.ok)throw new Error("Failed to fetch restaurants");const s=(await e.json()).filter(e=>2===e.manager_id);console.log("\ud83c\udfea Found manager restaurants:",s);const r=s.map(e=>({id:e.id.toString(),name:e.name,location:e.address||e.location||"No address",status:"active"===e.status?"active":"suspended"===e.status?"maintenance":"inactive",todaySales:Math.floor(5e3*Math.random())+2e3,todayOrders:Math.floor(150*Math.random())+50,staffCount:Math.floor(10*Math.random())+5,rating:Number((1*Math.random()+4).toFixed(1))}));console.log("\u2705 ManagerDashboard: Loaded restaurants data:",r),t(r)}catch(e){console.error("\u274c ManagerDashboard: Error fetching restaurants:",e),t([])}})()},[]);const i=s.filter(e=>"active"===e.status).length,V=s.reduce((e,s)=>e+s.todaySales,0),D=s.reduce((e,s)=>e+s.todayOrders,0),H=s.reduce((e,s)=>e+s.staffCount,0),O=e=>{const s=[];for(let t=1;t<=5;t++)s.push((0,d.jsx)(M,{filled:t<=e,children:"\u2605"},t));return s};return(0,d.jsx)(n.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(l,{children:(0,d.jsx)(x,{children:"Dashboard"})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(o.MD,{children:[(0,d.jsxs)(o.hI,{color:"#059669",children:[(0,d.jsx)(o.v0,{children:"Today's Total Sales"}),(0,d.jsxs)(o.Os,{children:["RM ",V.toLocaleString()]})]}),(0,d.jsxs)(o.hI,{color:"#2563EB",children:[(0,d.jsx)(o.v0,{children:"Total Orders"}),(0,d.jsx)(o.Os,{children:D})]}),(0,d.jsxs)(o.hI,{color:"#7C3AED",children:[(0,d.jsx)(o.v0,{children:"Active Restaurants"}),(0,d.jsxs)(o.Os,{children:[i,"/",s.length]})]}),(0,d.jsxs)(o.hI,{color:"#D97706",children:[(0,d.jsx)(o.v0,{children:"Total Staff"}),(0,d.jsx)(o.Os,{children:H})]})]}),(0,d.jsx)(p,{children:"Quick Actions"}),(0,d.jsxs)(B,{children:[(0,d.jsxs)(C,{onClick:()=>e("/pos/manager/reports"),children:[(0,d.jsx)(E,{children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"})})}),(0,d.jsx)(S,{children:"View Reports"})]}),(0,d.jsxs)(C,{onClick:()=>e("/pos/manager/invoices"),children:[(0,d.jsx)(E,{children:(0,d.jsxs)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[(0,d.jsx)("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"}),(0,d.jsx)("path",{d:"M9 15h6v-1H9v1zm0-3h6v-1H9v1zm0-3h6V8H9v1z"})]})}),(0,d.jsx)(S,{children:"Restaurant Invoices"})]}),(0,d.jsxs)(C,{onClick:()=>e("/pos/manager/sales"),children:[(0,d.jsx)(E,{children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1.81.45 1.61 1.67 1.61 1.16 0 1.6-.64 1.6-1.29 0-.84-.68-1.37-2.08-1.81-1.75-.55-3.28-1.3-3.28-3.4 0-1.68 1.19-2.84 2.8-3.18V5h2.67v1.61c1.73.34 2.76 1.6 2.85 3.16h-1.96c-.12-.78-.53-1.45-1.56-1.45-1.03 0-1.52.52-1.52 1.25 0 .74.66 1.21 2.02 1.63 1.88.6 3.36 1.36 3.36 3.56 0 1.84-1.21 3.05-3.08 3.33z"})})}),(0,d.jsx)(S,{children:"Sales Overview"})]}),(0,d.jsxs)(C,{onClick:()=>e("/pos/manager/staff"),children:[(0,d.jsx)(E,{children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.98 2.98 0 0 0 17.05 6H16c-.8 0-1.54.37-2.01.96l-.94 1.21A1 1 0 0 0 13.96 10l.79 1.04c.39.51.97.86 1.61.96h.64v10h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5a2.5 2.5 0 0 0-5 0V15h1.5v7h2zm6.5-12c.83 0 1.5-.67 1.5-1.5S14.83 8 14 8s-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"})})}),(0,d.jsx)(S,{children:"Staff Management"})]}),(0,d.jsxs)(C,{onClick:()=>e("/pos/manager/subscriptions"),children:[(0,d.jsx)(E,{children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{d:"M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"})})}),(0,d.jsx)(S,{children:"Manage Subscriptions"})]})]}),(0,d.jsx)(p,{children:"Your Restaurants"}),(0,d.jsx)(g,{children:s.map(s=>(0,d.jsxs)(m,{onClick:()=>{return t=s.id,void e(`/manager/reports?restaurant=${t}`);var t},children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(f,{children:s.name}),(0,d.jsx)(j,{children:s.location})]}),(0,d.jsx)(w,{status:s.status,children:s.status})]}),(0,d.jsxs)(z,{children:[O(s.rating),(0,d.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",marginLeft:"8px"},children:s.rating})]}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(F,{children:["RM ",s.todaySales.toLocaleString()]}),(0,d.jsx)(A,{children:"Today's Sales"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:s.todayOrders}),(0,d.jsx)(A,{children:"Orders"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(F,{children:s.staffCount}),(0,d.jsx)(A,{children:"Staff"})]})]}),(0,d.jsx)(k,{children:"View Details"})]},s.id))})]})]})})}}}]);