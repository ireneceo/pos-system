"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2341],{2341:(e,n,a)=>{a.r(n),a.d(n,{default:()=>se});var t=a(9950),r=a(4492),s=a(4752),o=a(3310),i=a(3705),l=a(7492),d=a(9610),c=a(9018),u=a(6038),p=a(4414);const x=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
`,h=s.Ay.div`
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
`,g=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,m=s.Ay.div`
  flex: 1;
`,y=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,j=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 2px;
`,b=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":case"cancelled":default:return"#F3F4F6";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":case"cancelled":default:return"#6B7280";case"trial":return"#D97706";case"expired":case"suspended":return"#DC2626"}}};
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,f=s.Ay.div`
  text-align: center;
`,C=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,w=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
`,A=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
`,F=s.Ay.span`
  color: ${e=>e.filled?"#FFC107":"#E5E7EB"};
  font-size: 14px;
`,S=s.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${e=>e.show?"flex":"none"};
  justify-content: center;
  align-items: center;
  z-index: 10000;
  pointer-events: ${e=>e.show?"auto":"none"};
`,k=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { 
      transform: translateY(-50px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }
`,B=s.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=s.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,T=s.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,I=s.Ay.div`
  padding: 24px;
`,P=s.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,R=s.Ay.div`
  display: grid;
  gap: 16px;
`,M=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,z=s.Ay.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`,_=s.Ay.input`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
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
`,$=s.Ay.select`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,D=s.Ay.textarea`
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  
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
`,N=s.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,L=s.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`,O=s.Ay.input`
  flex: 0 1 220px;
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

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,U=s.Ay.select`
  flex: 0 0 140px;
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

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,Y=s.Ay.div`
  position: relative;
  width: 100%;
`,V=s.Ay.div`
  position: relative;
  flex: 0 0 180px;

  @media (max-width: 600px) {
    flex: 1 1 100%;
    width: 100%;
  }
`,W=s.Ay.input`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }
`,q=s.Ay.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${e=>e.show?"block":"none"};
`,J=s.Ay.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,H=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,K=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Z=s.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  min-height: 32px;
`,G=s.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,Q=s.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;

  &:hover {
    color: #DC2626;
  }
`,X=s.Ay.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #6B7280;
  }
`,ee=s.Ay.button`
  padding: 6px 12px;
  background: #635BFF;
  border: 1px solid #635BFF;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    background: #5A51E6;
    border-color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }

  &:last-child {
    margin-right: 0;
  }
`,ne=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`,ae=s.Ay.div`
  width: 60px;
  height: 60px;
  background: #10B981;
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`,te=s.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #065F46;
  margin: 0 0 8px;
`,re=s.Ay.p`
  color: #6B7280;
  margin: 0 0 20px;
  line-height: 1.5;
`,se=()=>{const{operationSettings:e}=(0,c.Pj)(),[n]=(0,r.ok)(),a=(0,r.Zp)(),[s,se]=(0,t.useState)([]),[oe,ie]=(0,t.useState)(""),[le,de]=(0,t.useState)("all"),[ce,ue]=(0,t.useState)("all"),[pe,xe]=(0,t.useState)(!1),[he,ge]=(0,t.useState)(!1),[me,ye]=(0,t.useState)(!1),[je,be]=(0,t.useState)(""),[ve,fe]=(0,t.useState)(""),[Ce,we]=(0,t.useState)(""),[Ae,Fe]=(0,t.useState)(null),[Se,ke]=(0,t.useState)(null),[Be,Ee]=(0,t.useState)(!1),[Te,Ie]=(0,t.useState)(""),[Pe,Re]=(0,t.useState)(!1),[Me,ze]=(0,t.useState)([]),[_e,$e]=(0,t.useState)([]),[De,Ne]=(0,t.useState)(""),[Le,Oe]=(0,t.useState)(!1),[Ue,Ye]=(0,t.useState)([]),[Ve,We]=(0,t.useState)([]),[qe,Je]=(0,t.useState)(""),[He,Ke]=(0,t.useState)(!1),[Ze,Ge]=(0,t.useState)([]),[Qe,Xe]=(0,t.useState)({name:"",managerId:"",email:"",phone:"",address:"",cuisine:"",planType:"Basic Plan",planAmount:"29.00",status:"active",billingCycle:"monthly",paymentModel:"manager",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:""}),[en,nn]=(0,t.useState)([]),[an,tn]=(0,t.useState)([]),[rn,sn]=(0,t.useState)([]),[on,ln]=(0,t.useState)("all"),[dn,cn]=(0,t.useState)(""),[un,pn]=(0,t.useState)(!1),[xn,hn]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udfaf RestaurantsPage useEffect triggered"),console.log("\ud83c\udfaf searchParams:",n.toString()),yn(),mn(),gn();const e=n.get("managerId"),a=n.get("managerName");e&&a&&(console.log("\ud83d\udd0d Setting manager filter from URL:",{managerId:e,managerName:a}),ue(e),Je(decodeURIComponent(a)));const t=n.get("brandId"),r=n.get("brandName");t&&r&&(console.log("\ud83d\udd0d Setting brand filter from URL:",{brandId:t,brandName:r}),ln(t),cn(decodeURIComponent(r)))},[]);const gn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();sn(e)}}catch(e){console.error("Error fetching brands:",e)}},mn=async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);if(tn(n),n.length>0){const e=n[0];Xe(n=>({...n,planType:e.display_name,planAmount:e.base_price_monthly}))}}}catch(e){console.error("Error fetching plans:",e)}},yn=async()=>{try{console.log("\ud83d\udd04 Fetching restaurants from API (using same method as StaffManagementPage)...");const e=await fetch("/api/restaurants");if(console.log("\ud83d\udce1 Restaurants API response status:",e.status),e.ok){const n=await e.json();console.log("\u2705 Restaurants API response:",n);const a=await fetch("/api/users?role=Manager");console.log("\ud83d\udce1 Managers API response status:",a.status);const t=a.ok?await a.json():[];console.log("\u2705 Managers API response:",t);const r=n.data||n,s=t.data||t,o=Array.isArray(r)?r:[],i=Array.isArray(s)?s:[];console.log("\u2705 Setting available managers:",i),nn(i);const l=o.map((e,n)=>{var a;return{id:(null===(a=e.id)||void 0===a?void 0:a.toString())||`rest-${n}`,name:e.name||"Restaurant Name",managerId:e.managerId||"",managerName:e.managerName||"No Manager Assigned",managers:e.managers||[],location:e.location||"Location not specified",cuisine:e.cuisine||"Various",status:e.status||"active",todaySales:e.todaySales||0,todayOrders:e.todayOrders||0,staffCount:e.staffCount||0,rating:e.rating||4.5,createdAt:e.createdAt?new Date(e.createdAt).toISOString().split("T")[0]:"2024-01-01",lastOrder:e.lastOrder||"Never",brand_id:e.brand_id||null}});console.log("\u2705 Formatted restaurants:",l),console.log("\u2705 Setting restaurants state with",l.length,"restaurants"),se(l)}else console.error("\u274c Failed to fetch restaurants data"),se([]),nn([])}catch(e){console.error("\u274c Error fetching restaurants:",e),se([]),nn([])}},jn=s.filter(e=>{const n=e.name.toLowerCase().includes(oe.toLowerCase())||e.managerName.toLowerCase().includes(oe.toLowerCase())||e.cuisine.toLowerCase().includes(oe.toLowerCase()),a="all"===le||e.status===le,t=e.managerId===ce,r=e.managers&&Array.isArray(e.managers)&&e.managers.some(e=>e.id.toString()===ce),s="all"===ce||t||r,o="all"===on||e.brand_id&&e.brand_id.toString()===on;return"all"!==ce&&console.log("\ud83d\udd0d Restaurant filter check:",{restaurantName:e.name,restaurantManagerId:e.managerId,restaurantManagers:e.managers,filterManager:ce,managerIdMatch:t,managersArrayMatch:r,matchesManager:s}),n&&a&&s&&o});console.log("\ud83d\udd0d Filter debug:",{totalRestaurants:s.length,filteredRestaurants:jn.length,searchTerm:oe,filterStatus:le,filterManager:ce,restaurants:s.slice(0,2)});const bn=s.length,vn=s.filter(e=>"active"===e.status).length,fn=s.reduce((e,n)=>e+n.todaySales,0),Cn=s.reduce((e,n)=>e+n.todayOrders,0),wn=e=>{const n=[];for(let a=1;a<=5;a++)n.push((0,p.jsx)(F,{filled:a<=e,children:"\u2605"},a));return n},An=Array.from(new Set(s.map(e=>({id:e.managerId,name:e.managerName})))).filter((e,n,a)=>a.findIndex(n=>n.id===e.id)===n);return console.log("\ud83c\udfa8 RestaurantsPage rendering with:",{restaurantsCount:s.length,filteredCount:jn.length,managersCount:en.length,uniqueManagersCount:An.length,firstRestaurant:s[0],firstFiltered:jn[0]}),(0,p.jsx)(o.A,{children:(0,p.jsxs)(l.mc,{children:[(0,p.jsxs)(l.Y9,{children:[(0,p.jsx)(l.hE,{children:"Restaurants"}),(0,p.jsxs)(l.ex,{children:[(0,p.jsx)(i.cc,{variant:"outline",onClick:()=>{const n=(e=>{if(0===e.length)return"";const n=Object.keys(e[0]);return[n.join(","),...e.map(e=>n.map(n=>{const a=e[n];return"string"===typeof a&&(a.includes(",")||a.includes('"')||a.includes("\n"))?`"${a.replace(/"/g,'""')}"`:a||""}).join(","))].join("\n")})(jn.map(n=>({"Restaurant Name":n.name,Manager:n.managerName,Location:n.location,Cuisine:n.cuisine,Status:n.status,Rating:n.rating,"Today Sales":(0,u.vv)(n.todaySales,e.currency),"Today Orders":n.todayOrders,"Staff Count":n.staffCount,Phone:n.phone,Email:n.email,Address:n.address,"Created At":n.createdAt}))),a=new Blob([n],{type:"text/csv;charset=utf-8;"}),t=URL.createObjectURL(a),r=document.createElement("a");r.href=t,r.download=`restaurants-export-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:"Export"}),(0,p.jsx)(i.cc,{variant:"primary",onClick:()=>{const e=new Date;e.setFullYear(e.getFullYear()+1);const n=an.length>0?an[0]:null;Xe({name:"",managerId:"",email:"",phone:"",address:"",cuisine:"",planType:n?n.display_name:"Basic Plan",planAmount:n?n.base_price_monthly:"29.00",status:"active",billingCycle:"monthly",paymentModel:"restaurant",autoRenew:!0,subscriptionStart:(new Date).toISOString().split("T")[0],subscriptionEnd:e.toISOString().split("T")[0]}),Ie(""),ze([]),Re(!1),$e([]),xe(!0)},children:"Add Restaurant"})]})]}),(0,p.jsxs)(l.UC,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:"#059669",children:[(0,p.jsx)(l.Os,{children:bn}),(0,p.jsx)(l.v0,{children:"Total Restaurants"}),(0,p.jsx)(l.d1,{children:"Across all managers"})]}),(0,p.jsxs)(l.hI,{color:"#2563EB",children:[(0,p.jsx)(l.Os,{children:vn}),(0,p.jsx)(l.v0,{children:"Active Restaurants"}),(0,p.jsxs)(l.d1,{children:[bn>0?Math.round(vn/bn*100):0,"% operational"]})]}),(0,p.jsxs)(l.hI,{color:"#7C3AED",children:[(0,p.jsx)(l.Os,{children:(0,u.vv)(fn,e.currency)}),(0,p.jsx)(l.v0,{children:"Today's Total Sales"}),(0,p.jsx)(l.d1,{children:"Combined revenue"})]}),(0,p.jsxs)(l.hI,{color:"#D97706",children:[(0,p.jsx)(l.Os,{children:Cn}),(0,p.jsx)(l.v0,{children:"Today's Orders"}),(0,p.jsx)(l.d1,{children:"All restaurants"})]})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)(O,{placeholder:"Search restaurants...",value:oe,onChange:e=>ie(e.target.value)}),(0,p.jsxs)(V,{children:[(0,p.jsx)(W,{type:"text",placeholder:"Search managers...",value:qe,onChange:e=>(e=>{if(Je(e),Ke(!0),e.length<1)return void Ge(en.slice(0,10));const n=en.filter(n=>{const a=e.toLowerCase(),t=(n.full_name||"").toLowerCase(),r=(n.username||"").toLowerCase(),s=(n.email||"").toLowerCase();return t.includes(a)||r.includes(a)||s.includes(a)}).slice(0,10);Ge(n)})(e.target.value),onFocus:()=>{Ke(!0),0===qe.length&&Ge(en.slice(0,10))},onBlur:()=>setTimeout(()=>Ke(!1),200)}),"all"!==ce&&qe&&(0,p.jsx)(X,{onClick:()=>{ue("all"),Je(""),Ke(!1)},children:"\xd7"}),(0,p.jsxs)(q,{show:He,children:[(0,p.jsxs)(J,{onClick:()=>{ue("all"),Je(""),Ke(!1)},children:[(0,p.jsx)(H,{children:"All Managers"}),(0,p.jsx)(K,{children:"Show all restaurants"})]}),Ze.map(e=>(0,p.jsxs)(J,{onClick:()=>(e=>{ue(e.id.toString()),Je(e.full_name||e.username),Ke(!1)})(e),children:[(0,p.jsx)(H,{children:e.full_name||e.username}),(0,p.jsxs)(K,{children:[e.username," \u2022 ",e.email]})]},e.id))]})]}),(0,p.jsxs)(V,{children:[(0,p.jsx)(W,{type:"text",placeholder:"Search brands...",value:dn,onChange:e=>(e=>{if(cn(e),pn(!0),e.length<1)return void hn(rn.slice(0,10));const n=rn.filter(n=>{const a=e.toLowerCase(),t=(n.name||"").toLowerCase(),r=(n.code||"").toLowerCase();return t.includes(a)||r.includes(a)}).slice(0,10);hn(n)})(e.target.value),onFocus:()=>{pn(!0),0===dn.length&&hn(rn.slice(0,10))},onBlur:()=>setTimeout(()=>pn(!1),200)}),"all"!==on&&dn&&(0,p.jsx)(X,{onClick:()=>{ln("all"),cn(""),pn(!1),a("/pos/admin/restaurants",{replace:!0})},children:"\xd7"}),(0,p.jsxs)(q,{show:un,children:[(0,p.jsxs)(J,{onClick:()=>{ln("all"),cn(""),pn(!1),a("/pos/admin/restaurants",{replace:!0})},children:[(0,p.jsx)(H,{children:"All Brands"}),(0,p.jsx)(K,{children:"Show all restaurants"})]}),xn.map(e=>(0,p.jsxs)(J,{onClick:()=>(e=>{ln(e.id.toString()),cn(e.name),pn(!1)})(e),children:[(0,p.jsx)(H,{children:e.name}),(0,p.jsxs)(K,{children:[e.code," \u2022 ",e.currency]})]},e.id))]})]}),(0,p.jsxs)(U,{value:le,onChange:e=>de(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"}),(0,p.jsx)("option",{value:"trial",children:"Trial"}),(0,p.jsx)("option",{value:"expired",children:"Expired"}),(0,p.jsx)("option",{value:"suspended",children:"Suspended"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsx)(x,{children:0===jn.length?(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px 20px",color:"#6B7280",fontSize:"16px"},children:[0===s.length?"\ud83d\udd04 Loading restaurants...":"\ud83d\udced No restaurants found matching your criteria.",(0,p.jsx)("br",{}),(0,p.jsxs)("small",{style:{fontSize:"14px",marginTop:"10px",display:"block"},children:["Total restaurants: ",s.length," | Filtered: ",jn.length]})]}):jn.map(n=>(0,p.jsxs)(h,{children:[(0,p.jsxs)(g,{children:[(0,p.jsxs)(m,{children:[(0,p.jsx)(y,{children:n.name}),(0,p.jsx)(j,{children:n.managers&&n.managers.length>0?n.managers.map(e=>`${e.name}${e.isPrimary?" (Primary)":""}`).join(", "):n.managerName||"No Manager Assigned"}),(0,p.jsxs)(j,{children:[n.location," \u2022 ",n.cuisine]})]}),(0,p.jsx)(b,{status:n.status,children:n.status})]}),(0,p.jsxs)(A,{children:[wn(n.rating),(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"4px"},children:[n.rating," \u2022 Created: ",new Date(n.createdAt).toLocaleDateString()]})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(f,{children:[(0,p.jsx)(C,{children:(0,u.vv)(n.todaySales,e.currency)}),(0,p.jsx)(w,{children:"Today's Sales"})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(C,{children:n.todayOrders}),(0,p.jsx)(w,{children:"Orders"})]}),(0,p.jsxs)(f,{children:[(0,p.jsx)(C,{children:n.staffCount}),(0,p.jsx)(w,{children:"Staff"})]})]}),(0,p.jsxs)("div",{style:{marginTop:"16px",display:"flex",gap:"8px",paddingTop:"16px",borderTop:"1px solid #F3F4F6",flexWrap:"wrap"},children:[(0,p.jsx)(ee,{onClick:()=>(e=>{ke(e),Ee(!0)})(n),children:"View"}),(0,p.jsx)(N,{onClick:()=>(e=>{console.log("Navigating to report for restaurant:",e.name),a(`/admin/report?restaurantId=${e.id}&restaurantName=${encodeURIComponent(e.name)}`)})(n),children:"Report"}),(0,p.jsx)(N,{onClick:()=>(e=>{console.log("\ud83d\udd0d Opening edit for restaurant:",e.name),console.log("\ud83d\udd0d Restaurant managers array:",e.managers),console.log("\ud83d\udd0d Available managers:",en);const n=an.length>0?an[0]:null,a=e.planType||(n?n.display_name:"Basic Plan"),t=e.planAmount||(n?n.base_price_monthly:"29.00"),r={...e,email:e.email||"",phone:e.phone||"",address:e.location||"",planType:a,planAmount:t,billingCycle:e.billingCycle||"monthly",paymentModel:e.paymentModel||"restaurant",autoRenew:void 0===e.autoRenew||e.autoRenew,subscriptionStart:e.subscriptionStart||(new Date).toISOString().split("T")[0],subscriptionEnd:e.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0]};if(Fe(r),e.managers&&e.managers.length>0){console.log("\u2705 Loading managers from managers array:",e.managers);const n=e.managers.map(e=>{const n=en.find(n=>n.id.toString()===e.id.toString());return console.log(`\ud83d\udd0d Mapping manager ${e.id} (${e.name}):`,n?`Found: ${n.full_name}`:"NOT FOUND"),n}).filter(e=>void 0!==e);console.log("\u2705 Loaded managers for edit:",n),We(n)}else if(e.managerId){console.log("\u26a0\ufe0f No managers array, using single managerId:",e.managerId);const n=en.find(n=>n.id.toString()===e.managerId.toString());We(n?[n]:[])}else console.log("\u26a0\ufe0f No managers found"),We([]);Ne(""),Ye([]),Oe(!1),ge(!0)})(n),children:"Edit"}),(0,p.jsx)(N,{onClick:()=>(async e=>{try{const n="active"===e.status?"inactive":"active";console.log(`\ud83d\udd04 Toggling restaurant ${e.id} status from ${e.status} to ${n}`);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({status:n})});if(t.ok)se(s.map(a=>a.id===e.id?{...a,status:n}:a)),console.log(`\u2705 Restaurant status updated to ${n}`);else{const e=await t.json();console.error(`Failed to update status: ${e.message||"Unknown error"}`)}}catch(n){console.error("Error toggling restaurant status:",n)}})(n),style:{background:"active"===n.status?"#FEE2E2":"#ECFDF5",color:"active"===n.status?"#DC2626":"#059669",border:"1px solid "+("active"===n.status?"#FCA5A5":"#A7F3D0")},children:"active"===n.status?"Deactivate":"Activate"})]})]},n.id))}),pe&&(0,p.jsx)(S,{show:pe,onClick:()=>xe(!1),children:(0,p.jsxs)(k,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(E,{children:"Add Restaurant"}),(0,p.jsx)(T,{onClick:()=>xe(!1),children:"\xd7"})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(R,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Restaurant Name *"}),(0,p.jsx)(_,{type:"text",placeholder:"Enter restaurant name",value:Qe.name,onChange:e=>Xe({...Qe,name:e.target.value})})]}),(0,p.jsxs)(M,{style:{position:"relative"},children:[(0,p.jsx)(z,{children:"Managers (Multiple selection supported)"}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(W,{type:"text",placeholder:"Type to search and select managers...",value:Te,onChange:e=>(e=>{if(Ie(e),Re(!0),e.length<2)return void ze([]);const n=en.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));ze(n.slice(0,5))})(e.target.value),onFocus:()=>{Re(!0),0===Te.length&&ze(en.slice(0,10))},onBlur:()=>setTimeout(()=>Re(!1),200)}),(0,p.jsx)(q,{show:Pe,children:Me.map(e=>(0,p.jsxs)(J,{onClick:()=>(e=>{_e.find(n=>n.id===e.id)||$e([..._e,e]),Ie(""),Re(!1)})(e),children:[(0,p.jsx)(H,{children:e.full_name||e.username}),(0,p.jsxs)(K,{children:[e.username," \u2022 ",e.email]})]},e.id))})]}),_e.length>0&&(0,p.jsx)(Z,{children:_e.map(e=>(0,p.jsxs)(G,{children:[e.full_name||e.username,(0,p.jsx)(Q,{onClick:()=>{return n=e.id.toString(),void $e(_e.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Email Address *"}),(0,p.jsx)(_,{type:"email",placeholder:"restaurant@example.com",value:Qe.email,onChange:e=>Xe({...Qe,email:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Phone Number *"}),(0,p.jsx)(_,{type:"tel",placeholder:"+60123456789",value:Qe.phone,onChange:e=>Xe({...Qe,phone:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Address *"}),(0,p.jsx)(D,{placeholder:"Enter restaurant address",value:Qe.address,onChange:e=>Xe({...Qe,address:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Cuisine Type"}),(0,p.jsx)(_,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Qe.cuisine,onChange:e=>Xe({...Qe,cuisine:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Plan Type *"}),(0,p.jsx)($,{value:Qe.planType,onChange:e=>{var n;const a=an.find(n=>n.display_name===e.target.value);Xe({...Qe,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:an.map(n=>(0,p.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,u.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Status *"}),(0,p.jsxs)($,{value:Qe.status,onChange:e=>Xe({...Qe,status:e.target.value}),children:[(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"trial",children:"Trial"}),(0,p.jsx)("option",{value:"expired",children:"Expired"}),(0,p.jsx)("option",{value:"suspended",children:"Suspended"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,p.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Billing Cycle *"}),(0,p.jsxs)($,{value:Qe.billingCycle,onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Qe.planType]||a["Basic Plan"];Xe({...Qe,billingCycle:n,planAmount:t[n]})},children:[(0,p.jsx)("option",{value:"monthly",children:"Monthly"}),(0,p.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Payment Model *"}),(0,p.jsxs)($,{value:Qe.paymentModel,onChange:e=>Xe({...Qe,paymentModel:e.target.value}),children:[(0,p.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Subscription Start Date *"}),(0,p.jsx)(_,{type:"date",value:Qe.subscriptionStart,onChange:e=>Xe({...Qe,subscriptionStart:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Subscription End Date *"}),(0,p.jsx)(_,{type:"date",value:Qe.subscriptionEnd,onChange:e=>Xe({...Qe,subscriptionEnd:e.target.value})})]}),(0,p.jsx)(M,{style:{gridColumn:"1 / -1"},children:(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,p.jsx)("input",{type:"checkbox",checked:Qe.autoRenew,onChange:e=>Xe({...Qe,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,p.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Summary:"})}),(0,p.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Qe.planType," - $",Qe.planAmount," (",Qe.billingCycle,")"]}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===Qe.paymentModel?"Manager":"Restaurant"]})]})]}),ve&&(0,p.jsx)(d.IM,{children:ve})]}),(0,p.jsxs)(P,{children:[(0,p.jsx)(i.cc,{variant:"cancel",onClick:()=>{fe(""),xe(!1)},children:"Cancel"}),(0,p.jsx)(i.cc,{variant:"primary",onClick:async()=>{try{if(console.log("Adding restaurant:",Qe),console.log("Selected managers:",_e),fe(""),!Qe.name||0===_e.length||!Qe.email||!Qe.phone||!Qe.address)return void fe("Please fill in all required fields. At least one manager must be selected.");const e=parseInt(_e[0].id.toString()),n={name:Qe.name,managerId:e,managerIds:_e.map(e=>parseInt(e.id.toString())),email:Qe.email,phone:Qe.phone,address:Qe.address,location:Qe.address,cuisine:Qe.cuisine||"Various",status:Qe.status,planType:Qe.planType,planAmount:parseFloat(Qe.planAmount),billingCycle:Qe.billingCycle,paymentModel:Qe.paymentModel,autoRenew:Qe.autoRenew,subscriptionStart:Qe.subscriptionStart,subscriptionEnd:Qe.subscriptionEnd};console.log("\ud83d\udce4 Sending restaurant data:",n);const a=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Restaurant creation API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant created successfully:",e),fe(""),xe(!1),await yn()}else{const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to create restaurant:",e),fe(`Error creating restaurant: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error adding restaurant:",e),fe("Error adding restaurant. Please check your connection and try again.")}},children:"Add Restaurant"})]})]})}),he&&Ae&&(0,p.jsx)(S,{show:he,onClick:()=>ge(!1),children:(0,p.jsxs)(k,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(E,{children:"Edit Restaurant"}),(0,p.jsx)(T,{onClick:()=>ge(!1),children:"\xd7"})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(R,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Restaurant Name *"}),(0,p.jsx)(_,{type:"text",placeholder:"Enter restaurant name",value:Ae.name,onChange:e=>Fe({...Ae,name:e.target.value})})]}),(0,p.jsxs)(M,{style:{position:"relative"},children:[(0,p.jsx)(z,{children:"Managers (Multiple selection supported)"}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(W,{type:"text",placeholder:"Type to search and select managers...",value:De,onChange:e=>(e=>{if(Ne(e),Oe(!0),e.length<1)return void Ye(en.slice(0,10));const n=en.filter(n=>n.full_name&&n.full_name.toLowerCase().includes(e.toLowerCase())||n.username&&n.username.toLowerCase().includes(e.toLowerCase()));Ye(n.slice(0,10))})(e.target.value),onFocus:()=>{Oe(!0),0===De.length&&Ye(en.slice(0,10))},onBlur:()=>setTimeout(()=>Oe(!1),200)}),(0,p.jsx)(q,{show:Le,children:Ue.map(e=>(0,p.jsxs)(J,{onClick:()=>(e=>{Ve.find(n=>n.id===e.id)||We([...Ve,e]),Ne(""),Oe(!1)})(e),children:[(0,p.jsx)(H,{children:e.full_name||e.username}),(0,p.jsxs)(K,{children:[e.username," \u2022 ",e.email]})]},e.id))})]}),Ve.length>0&&(0,p.jsx)(Z,{children:Ve.map(e=>(0,p.jsxs)(G,{children:[e.full_name||e.username,(0,p.jsx)(Q,{onClick:()=>{return n=e.id.toString(),void We(Ve.filter(e=>e.id.toString()!==n));var n},children:"\xd7"})]},e.id))})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Email Address *"}),(0,p.jsx)(_,{type:"email",placeholder:"restaurant@example.com",value:Ae.email||"",onChange:e=>Fe({...Ae,email:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Phone Number *"}),(0,p.jsx)(_,{type:"tel",placeholder:"+60123456789",value:Ae.phone||"",onChange:e=>Fe({...Ae,phone:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Address *"}),(0,p.jsx)(D,{placeholder:"Enter restaurant address",value:Ae.address||Ae.location,onChange:e=>Fe({...Ae,address:e.target.value,location:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Cuisine Type"}),(0,p.jsx)(_,{type:"text",placeholder:"e.g., Malaysian, Chinese, Italian",value:Ae.cuisine,onChange:e=>Fe({...Ae,cuisine:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Plan Type *"}),(0,p.jsx)($,{value:Ae.planType||"Basic Plan",onChange:e=>{var n;const a=an.find(n=>n.display_name===e.target.value);Fe({...Ae,planType:e.target.value,planAmount:(null===a||void 0===a||null===(n=a.base_price_monthly)||void 0===n?void 0:n.toString())||"29.00"})},children:an.map(n=>(0,p.jsxs)("option",{value:n.display_name,children:[n.display_name," (",(0,u.vv)(parseFloat(n.base_price_monthly),e.currency),"/month)"]},n.id))})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Status *"}),(0,p.jsxs)($,{value:Ae.status,onChange:e=>Fe({...Ae,status:e.target.value}),children:[(0,p.jsx)("option",{value:"active",children:"Active"}),(0,p.jsx)("option",{value:"inactive",children:"Inactive"}),(0,p.jsx)("option",{value:"trial",children:"Trial"}),(0,p.jsx)("option",{value:"expired",children:"Expired"}),(0,p.jsx)("option",{value:"suspended",children:"Suspended"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsx)("div",{style:{gridColumn:"1 / -1",marginTop:"20px",marginBottom:"10px"},children:(0,p.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540",borderBottom:"2px solid #635BFF",paddingBottom:"8px"},children:"Subscription Settings"})}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Billing Cycle *"}),(0,p.jsxs)($,{value:Ae.billingCycle||"monthly",onChange:e=>{const n=e.target.value,a={"Basic Plan":{monthly:"29.00",annual:"290.00"},"Professional Plan":{monthly:"99.00",annual:"990.00"},"Enterprise Plan":{monthly:"199.00",annual:"2190.00"}},t=a[Ae.planType||"Basic Plan"]||a["Basic Plan"];Fe({...Ae,billingCycle:n,planAmount:t[n]})},children:[(0,p.jsx)("option",{value:"monthly",children:"Monthly"}),(0,p.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Payment Model *"}),(0,p.jsxs)($,{value:Ae.paymentModel||"restaurant",onChange:e=>Fe({...Ae,paymentModel:e.target.value}),children:[(0,p.jsx)("option",{value:"restaurant",children:"Restaurant Admin"}),(0,p.jsx)("option",{value:"foodcourt_manager",children:"Foodcourt Manager"}),(0,p.jsx)("option",{value:"brand_manager",children:"Brand Manager"})]})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Subscription Start Date *"}),(0,p.jsx)(_,{type:"date",value:Ae.subscriptionStart||(new Date).toISOString().split("T")[0],onChange:e=>Fe({...Ae,subscriptionStart:e.target.value})})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Subscription End Date *"}),(0,p.jsx)(_,{type:"date",value:Ae.subscriptionEnd||new Date(Date.now()+31536e6).toISOString().split("T")[0],onChange:e=>Fe({...Ae,subscriptionEnd:e.target.value})})]}),(0,p.jsx)(M,{style:{gridColumn:"1 / -1"},children:(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,p.jsx)("input",{type:"checkbox",checked:Ae.autoRenew||!0,onChange:e=>Fe({...Ae,autoRenew:e.target.checked}),style:{width:"16px",height:"16px"}}),(0,p.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-renew subscription"})]})}),(0,p.jsxs)("div",{style:{gridColumn:"1 / -1",padding:"16px",background:"#F3F4F6",borderRadius:"8px",marginTop:"10px"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:(0,p.jsx)("strong",{children:"Summary:"})}),(0,p.jsxs)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:[Ae.planType||"Basic Plan"," - $",Ae.planAmount||"29.00"," (",Ae.billingCycle||"monthly",")"]}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ","manager"===(Ae.paymentModel||"manager")?"Manager":"Restaurant"]})]})]}),Ce&&(0,p.jsx)(d.IM,{children:Ce})]}),(0,p.jsxs)(P,{children:[(0,p.jsx)(i.cc,{variant:"cancel",onClick:()=>{we(""),ge(!1)},children:"Cancel"}),(0,p.jsx)(i.cc,{variant:"danger-outline",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"? This action cannot be undone.`))try{console.log("Deleting restaurant:",e.id),we("");const n=localStorage.getItem("auth_token"),a=await fetch(`/api/restaurants/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(console.log("\ud83d\udce1 Restaurant delete API response status:",a.status),a.ok)console.log("\u2705 Restaurant deleted successfully"),we(""),ge(!1),Fe(null),be("Restaurant deleted successfully!"),ye(!0),await yn();else{const e=await a.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to delete restaurant:",e),we(`Error deleting restaurant: ${e.error||"Please try again."}`)}}catch(n){console.error("\u274c Error deleting restaurant:",n),we("Error deleting restaurant. Please check your connection and try again.")}})(Ae),children:"Delete"}),(0,p.jsx)(i.cc,{variant:"primary",onClick:async()=>{if(Ae)try{if(console.log("\ud83d\udd04 Updating restaurant:",Ae),console.log("\ud83d\udd0d Selected edit managers:",Ve),we(""),!Ae.name||0===Ve.length)return void we("Please fill in all required fields. At least one manager must be selected.");const e=parseInt(Ve[0].id.toString()),n={name:Ae.name,managerId:e,managerIds:Ve.map(e=>parseInt(e.id.toString())),email:Ae.email||"",phone:Ae.phone||"",address:Ae.address||Ae.location||"",location:Ae.address||Ae.location||"",cuisine:Ae.cuisine||"Various",status:Ae.status,planType:Ae.planType||"Basic Plan",planAmount:parseFloat(Ae.planAmount||"29.00"),billingCycle:Ae.billingCycle||"monthly",paymentModel:Ae.paymentModel||"manager",autoRenew:Ae.autoRenew||!0,subscriptionStart:Ae.subscriptionStart,subscriptionEnd:Ae.subscriptionEnd};console.log("\ud83d\udce4 Sending restaurant update data:",n);const a=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${Ae.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(n)});if(console.log("\ud83d\udce1 Restaurant update API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 Restaurant updated successfully:",e),we(""),ge(!1),Fe(null),await yn()}else{const e=await t.json().catch(()=>({error:"Unknown error"}));console.error("\u274c Failed to update restaurant:",e),we(`Error updating restaurant: ${e.error||"Please try again."}`)}}catch(e){console.error("\u274c Error updating restaurant:",e),we("Error updating restaurant. Please check your connection and try again.")}},children:"Update Restaurant"})]})]})}),Be&&Se&&(0,p.jsx)(S,{show:Be,onClick:()=>Ee(!1),children:(0,p.jsxs)(k,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(E,{children:"Restaurant Details"}),(0,p.jsx)(T,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,p.jsx)(I,{children:(0,p.jsxs)(R,{children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Restaurant Name"}),(0,p.jsx)(_,{type:"text",value:Se.name,disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(z,{children:["Manager",Se.managers&&Se.managers.length>1?"s":""]}),(0,p.jsx)(D,{value:Se.managers&&Se.managers.length>0?Se.managers.map((e,n)=>`${n+1}. ${e.name}${e.isPrimary?" (Primary)":""} - ${e.email}`).join("\n"):Se.managerName||"No Manager Assigned",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280",minHeight:"80px"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Email Address"}),(0,p.jsx)(_,{type:"email",value:Se.email||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Phone Number"}),(0,p.jsx)(_,{type:"tel",value:Se.phone||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Address"}),(0,p.jsx)(D,{value:Se.address||Se.location||"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Cuisine Type"}),(0,p.jsx)(_,{type:"text",value:Se.cuisine||"Various",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Status"}),(0,p.jsx)(_,{type:"text",value:"active"===Se.status?"Active":"Inactive",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Plan Type"}),(0,p.jsx)(_,{type:"text",value:Se.planType||"Basic Plan",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]}),(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Created Date"}),(0,p.jsx)(_,{type:"text",value:Se.createdAt?new Date(Se.createdAt).toLocaleDateString():"N/A",disabled:!0,style:{backgroundColor:"#F8FAFC",color:"#6B7280"}})]})]})})]})}),me&&(0,p.jsx)(S,{show:me,onClick:()=>ye(!1),children:(0,p.jsxs)(ne,{onClick:e=>e.stopPropagation(),children:[(0,p.jsx)(ae,{children:"\u2713"}),(0,p.jsx)(te,{children:"Success!"}),(0,p.jsx)(re,{children:je}),(0,p.jsx)(i.cc,{variant:"primary",onClick:()=>ye(!1),children:"OK"})]})})]})]})})}},3705:(e,n,a)=>{a.d(n,{cc:()=>r});var t=a(4752);const r=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`}}]);