"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4602],{2488:(t,e,a)=>{a.d(e,{DO:()=>d,Jt:()=>c,Qn:()=>l});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,o=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
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

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

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

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,l=t=>{let{children:e,className:a,style:n,...o}=t;return(0,r.jsx)(i,{className:a,style:n,...o,children:e})},d=t=>{let{placeholder:e="Search...",...a}=t;return(0,r.jsx)(o,{placeholder:e,...a})},c=t=>{let{children:e,...a}=t;return(0,r.jsx)(s,{...a,children:e})}},2597:(t,e,a)=>{a.d(e,{Ex:()=>c,oz:()=>d,tU:()=>l});a(9950);var n=a(4752),r=a(4414);const i=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,o=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${t=>t.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${t=>t.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${t=>{switch(t.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${t=>{switch(t.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=t=>{let{children:e,className:a,style:n}=t;return(0,r.jsx)(i,{className:a,style:n,children:e})},d=t=>{let{active:e,onClick:a,children:n,className:i}=t;return(0,r.jsx)(o,{active:e,onClick:a,className:i,children:n})},c=t=>{let{count:e,variant:a="default",showZero:n=!1}=t;return 0!==e||n?(0,r.jsx)(s,{variant:a,children:e}):null}},2653:(t,e,a)=>{a.d(e,{M:()=>i});var n=a(9950),r=a(4492);function i(t){const[e,a]=(0,r.ok)(),i=(0,n.useCallback)(()=>e.get("tab")||t,[e,t]),[o,s]=(0,n.useState)(i());return[o,(0,n.useCallback)(t=>{s(t),a({tab:t})},[a])]}},4602:(t,e,a)=>{a.r(e),a.d(e,{default:()=>z});var n=a(9950),r=a(4752),i=a(2853),o=a(8409),s=a(2597),l=a(2488),d=a(1367),c=a(2653),x=a(4414);const p=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=r.Ay.div`
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
`,u=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=r.Ay.div`
  display: flex;
  gap: 12px;
`,g=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${t=>"primary"===t.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,f=r.Ay.div`
  padding: 32px;
`,b=r.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,w=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,v=r.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,j=r.Ay.thead`
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

  /* 정렬 규칙: Role, Status, Last Active는 가운데, Actions는 우측 */
  th:nth-child(3) { text-align: center; } /* Role */
  th:nth-child(4) { text-align: center; } /* Status */
  th:nth-child(5) { text-align: center; } /* Last Active */
  th:nth-child(6) { text-align: right; } /* Actions */
`,A=r.Ay.tr`
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
`,y=r.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: Role, Status, Last Active는 가운데, Actions는 우측 */
  &:nth-child(3) { text-align: center; } /* Role */
  &:nth-child(4) { text-align: center; } /* Status */
  &:nth-child(5) { text-align: center; } /* Last Active */
  &:nth-child(6) { text-align: right; } /* Actions */

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
`,F=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=r.Ay.div``,C=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,E=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,S=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${t=>"active"===t.status?"#ECFDF5":"#FEF2F2"};
  color: ${t=>"active"===t.status?"#059669":"#DC2626"};
`,B=r.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,R=r.Ay.button`
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
`,z=()=>{const{user:t}=(0,d.As)(),[e,a]=(0,c.M)("all"),[r,z]=(0,n.useState)([]),[D,I]=(0,n.useState)(""),[N,L]=(0,n.useState)("all"),[_,O]=(0,n.useState)("all"),[$,U]=(0,n.useState)("all");(0,n.useEffect)(()=>{t?(async()=>{try{const e=(null===t||void 0===t?void 0:t.managerId)||(null===t||void 0===t?void 0:t.id)||"2",a={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/users",{headers:a});if(n.ok){const t=await n.json(),r=await fetch(`/api/restaurants/manager/${e}`,{headers:a}),i=r.ok?await r.json():[],o={};i.forEach(t=>{o[t.id]=t.name});const s=(t.data||t).filter(t=>("Restaurant Admin"===t.role||"Staff"===t.role)&&!(!t.restaurant_id||!i.some(e=>e.id===t.restaurant_id))).map(t=>{var e;return{id:t.id.toString(),name:t.full_name||t.username||"Unknown",email:t.email,phone:t.phone||"-",role:t.role,department:"Restaurant Admin"===t.role?"Management":"Restaurant Operations",restaurantId:null===(e=t.restaurant_id)||void 0===e?void 0:e.toString(),restaurantName:t.restaurant_id?o[t.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:t.createdAt?new Date(t.createdAt).toISOString().split("T")[0]:"-",lastActive:"Active",permissions:"Restaurant Admin"===t.role?["pos","inventory","reports"]:["pos"]}});z(s)}}catch(e){console.error("Error fetching staff data:",e)}})():z([])},[t]);const M=r.filter(t=>("restaurant_admin"!==e||"Restaurant Admin"===t.role)&&(("restaurant_staff"!==e||"Staff"===t.role)&&(!(D&&!t.name.toLowerCase().includes(D.toLowerCase())&&!t.email.toLowerCase().includes(D.toLowerCase()))&&(("all"===N||t.role===N)&&(("all"===_||t.status===_)&&("all"===$||t.restaurantId===$)))))),J={total:r.length,admins:r.filter(t=>"Restaurant Admin"===t.role).length,staff:r.filter(t=>"Staff"===t.role).length,active:r.filter(t=>"active"===t.status).length},T=Array.from(new Map(r.filter(t=>t.restaurantId).map(t=>[t.restaurantId,{id:t.restaurantId,name:t.restaurantName}])).values()),Z=Array.from(new Set(r.map(t=>t.role)));return(0,x.jsxs)(p,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(u,{children:"Admin & Staff"}),(0,x.jsx)(m,{children:(0,x.jsx)(g,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalStaff:r.length,manager:null===t||void 0===t?void 0:t.name,statistics:{total:J.total,admins:J.admins,staff:J.staff,active:J.active},staff:r.map(t=>({name:t.name,email:t.email,phone:t.phone,role:t.role,department:t.department,restaurantName:t.restaurantName||"-",status:t.status,joinDate:t.joinDate,lastActive:t.lastActive,permissions:t.permissions.join(", ")}))},a=JSON.stringify(e,null,2),n=new Blob([a],{type:"application/json"}),i=URL.createObjectURL(n),o=document.createElement("a");o.href=i,o.download=`admin-staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Data"})})]}),(0,x.jsxs)(f,{children:[(0,x.jsxs)(s.tU,{children:[(0,x.jsxs)(s.oz,{active:"all"===e,onClick:()=>a("all"),children:["All ",(0,x.jsx)(s.Ex,{count:J.total,showZero:!0})]}),(0,x.jsxs)(s.oz,{active:"restaurant_admin"===e,onClick:()=>a("restaurant_admin"),children:["Restaurant Admin ",(0,x.jsx)(s.Ex,{count:J.admins,showZero:!0})]}),(0,x.jsxs)(s.oz,{active:"restaurant_staff"===e,onClick:()=>a("restaurant_staff"),children:["Restaurant Staff ",(0,x.jsx)(s.Ex,{count:J.staff,showZero:!0})]})]}),(0,x.jsxs)(o.MD,{children:[(0,x.jsxs)(o.hI,{color:"#059669",children:[(0,x.jsx)(o.Os,{children:J.total}),(0,x.jsx)(o.v0,{children:"Total"}),(0,x.jsx)(b,{children:"Admin & Staff"})]}),(0,x.jsxs)(o.hI,{color:"#7C3AED",children:[(0,x.jsx)(o.Os,{children:J.active}),(0,x.jsx)(o.v0,{children:"Active"}),(0,x.jsxs)(b,{children:[J.total>0?Math.round(J.active/J.total*100):0,"% of total"]})]}),(0,x.jsxs)(o.hI,{color:"#2563EB",children:[(0,x.jsx)(o.Os,{children:J.admins}),(0,x.jsx)(o.v0,{children:"Restaurant Admin"}),(0,x.jsx)(b,{children:"Restaurant managers"})]}),(0,x.jsxs)(o.hI,{color:"#F59E0B",children:[(0,x.jsx)(o.Os,{children:J.staff}),(0,x.jsx)(o.v0,{children:"Restaurant Staff"}),(0,x.jsxs)(b,{children:["From ",T.length," restaurants"]})]})]}),(0,x.jsxs)(l.Qn,{children:[(0,x.jsx)(l.DO,{type:"text",placeholder:"Search by name or email...",value:D,onChange:t=>I(t.target.value)}),(0,x.jsxs)(l.Jt,{value:N,onChange:t=>L(t.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Roles"}),Z.map(t=>(0,x.jsx)("option",{value:t,children:t},t))]}),(0,x.jsxs)(l.Jt,{value:_,onChange:t=>O(t.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,x.jsxs)(l.Jt,{value:$,onChange:t=>U(t.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),T.map(t=>(0,x.jsx)("option",{value:t.id,children:t.name},t.id))]})]}),(0,x.jsx)(w,{children:0===M.length?(0,x.jsxs)(i.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No admin or staff found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters"})]}):(0,x.jsxs)(v,{children:[(0,x.jsx)(j,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:"Name"}),(0,x.jsx)("th",{children:"Restaurant"}),(0,x.jsx)("th",{children:"Role"}),(0,x.jsx)("th",{children:"Status"}),(0,x.jsx)("th",{children:"Last Active"}),(0,x.jsx)("th",{children:"Actions"})]})}),(0,x.jsx)("tbody",{children:M.map(t=>(0,x.jsxs)(A,{children:[(0,x.jsx)(y,{"data-label":"Name",children:(0,x.jsx)(F,{children:(0,x.jsxs)(k,{children:[(0,x.jsx)(C,{children:t.name}),(0,x.jsx)(E,{children:t.email})]})})}),(0,x.jsx)(y,{"data-label":"Restaurant",children:(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:t.restaurantName||"-"})}),(0,x.jsx)(y,{"data-label":"Role",children:t.role}),(0,x.jsx)(y,{"data-label":"Status",children:(0,x.jsx)(S,{status:t.status,children:t.status})}),(0,x.jsx)(y,{"data-label":"Last Active",children:t.lastActive}),(0,x.jsx)(y,{"data-label":"",children:(0,x.jsx)(B,{children:(0,x.jsx)(R,{onClick:()=>window.open(`/restaurant/${t.restaurantId}/staff`,"_blank"),children:"View"})})})]},t.id))})]})})]})]})}}}]);