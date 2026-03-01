"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4602],{2488:(t,e,a)=>{a.d(e,{DO:()=>s,Jt:()=>x,Qn:()=>l});a(9950);var n=a(4752),i=a(4414);const r=n.Ay.div`
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
`,d=n.Ay.select`
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
`,l=t=>{let{children:e,className:a,style:n,...o}=t;return(0,i.jsx)(r,{className:a,style:n,...o,children:e})},s=t=>{let{placeholder:e="Search...",...a}=t;return(0,i.jsx)(o,{placeholder:e,...a})},x=t=>{let{children:e,...a}=t;return(0,i.jsx)(d,{...a,children:e})}},4602:(t,e,a)=>{a.r(e),a.d(e,{default:()=>B});var n=a(9950),i=a(4752),r=a(7960),o=a(2488),d=a(1367),l=a(4414);const s=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=i.Ay.div`
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
`,p=i.Ay.div`
  display: flex;
  gap: 12px;
`,h=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${t=>"primary"===t.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=i.Ay.div`
  padding: 32px;
`,u=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,g=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,f=i.Ay.table`
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
`,b=i.Ay.thead`
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
`,w=i.Ay.tr`
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
`,v=i.Ay.td`
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
`,j=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,A=i.Ay.div``,y=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,k=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${t=>"active"===t.status?"#ECFDF5":"#FEF2F2"};
  color: ${t=>"active"===t.status?"#059669":"#DC2626"};
`,S=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,C=i.Ay.button`
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
`,E=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`,B=()=>{const{user:t}=(0,d.As)(),[e,a]=(0,n.useState)("all"),[i,B]=(0,n.useState)([]),[R,z]=(0,n.useState)(""),[I,D]=(0,n.useState)("all"),[L,_]=(0,n.useState)("all"),[O,N]=(0,n.useState)("all");(0,n.useEffect)(()=>{t?(async()=>{try{const e=(null===t||void 0===t?void 0:t.managerId)||(null===t||void 0===t?void 0:t.id)||"2",a={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},n=await fetch("/api/users",{headers:a});if(n.ok){const t=await n.json(),i=await fetch(`/api/restaurants/manager/${e}`,{headers:a}),r=i.ok?await i.json():[],o={};r.forEach(t=>{o[t.id]=t.name});const d=(t.data||t).filter(t=>("Restaurant Admin"===t.role||"Staff"===t.role)&&!(!t.restaurant_id||!r.some(e=>e.id===t.restaurant_id))).map(t=>{var e;return{id:t.id.toString(),name:t.full_name||t.username||"Unknown",email:t.email,phone:t.phone||"-",role:t.role,department:"Restaurant Admin"===t.role?"Management":"Restaurant Operations",restaurantId:null===(e=t.restaurant_id)||void 0===e?void 0:e.toString(),restaurantName:t.restaurant_id?o[t.restaurant_id]||"Unknown Restaurant":void 0,status:"active",joinDate:t.createdAt?new Date(t.createdAt).toISOString().split("T")[0]:"-",lastActive:"Active",permissions:"Restaurant Admin"===t.role?["pos","inventory","reports"]:["pos"]}});B(d)}}catch(e){console.error("Error fetching staff data:",e)}})():B([])},[t]);const $=i.filter(t=>("restaurant_admin"!==e||"Restaurant Admin"===t.role)&&(("restaurant_staff"!==e||"Staff"===t.role)&&(!(R&&!t.name.toLowerCase().includes(R.toLowerCase())&&!t.email.toLowerCase().includes(R.toLowerCase()))&&(("all"===I||t.role===I)&&(("all"===L||t.status===L)&&("all"===O||t.restaurantId===O)))))),U={total:i.length,admins:i.filter(t=>"Restaurant Admin"===t.role).length,staff:i.filter(t=>"Staff"===t.role).length,active:i.filter(t=>"active"===t.status).length},J=Array.from(new Map(i.filter(t=>t.restaurantId).map(t=>[t.restaurantId,{id:t.restaurantId,name:t.restaurantName}])).values()),T=Array.from(new Set(i.map(t=>t.role)));return(0,l.jsxs)(s,{children:[(0,l.jsxs)(x,{children:[(0,l.jsx)(c,{children:"Admin & Staff"}),(0,l.jsx)(p,{children:(0,l.jsx)(h,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalStaff:i.length,manager:null===t||void 0===t?void 0:t.name,statistics:{total:U.total,admins:U.admins,staff:U.staff,active:U.active},staff:i.map(t=>({name:t.name,email:t.email,phone:t.phone,role:t.role,department:t.department,restaurantName:t.restaurantName||"-",status:t.status,joinDate:t.joinDate,lastActive:t.lastActive,permissions:t.permissions.join(", ")}))},a=JSON.stringify(e,null,2),n=new Blob([a],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`admin-staff-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r)},children:"Export Data"})})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(r.j,{children:[(0,l.jsxs)(r.oz,{active:"all"===e,onClick:()=>a("all"),children:["All (",U.total,")"]}),(0,l.jsxs)(r.oz,{active:"restaurant_admin"===e,onClick:()=>a("restaurant_admin"),children:["Restaurant Admin (",U.admins,")"]}),(0,l.jsxs)(r.oz,{active:"restaurant_staff"===e,onClick:()=>a("restaurant_staff"),children:["Restaurant Staff (",U.staff,")"]})]}),(0,l.jsxs)(r.MD,{children:[(0,l.jsxs)(r.hI,{color:"#059669",children:[(0,l.jsx)(r.Os,{children:U.total}),(0,l.jsx)(r.v0,{children:"Total"}),(0,l.jsx)(u,{children:"Admin & Staff"})]}),(0,l.jsxs)(r.hI,{color:"#7C3AED",children:[(0,l.jsx)(r.Os,{children:U.active}),(0,l.jsx)(r.v0,{children:"Active"}),(0,l.jsxs)(u,{children:[U.total>0?Math.round(U.active/U.total*100):0,"% of total"]})]}),(0,l.jsxs)(r.hI,{color:"#2563EB",children:[(0,l.jsx)(r.Os,{children:U.admins}),(0,l.jsx)(r.v0,{children:"Restaurant Admin"}),(0,l.jsx)(u,{children:"Restaurant managers"})]}),(0,l.jsxs)(r.hI,{color:"#F59E0B",children:[(0,l.jsx)(r.Os,{children:U.staff}),(0,l.jsx)(r.v0,{children:"Restaurant Staff"}),(0,l.jsxs)(u,{children:["From ",J.length," restaurants"]})]})]}),(0,l.jsxs)(o.Qn,{children:[(0,l.jsx)(o.DO,{type:"text",placeholder:"Search by name or email...",value:R,onChange:t=>z(t.target.value)}),(0,l.jsxs)(o.Jt,{value:I,onChange:t=>D(t.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Roles"}),T.map(t=>(0,l.jsx)("option",{value:t,children:t},t))]}),(0,l.jsxs)(o.Jt,{value:L,onChange:t=>_(t.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,l.jsxs)(o.Jt,{value:O,onChange:t=>N(t.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Restaurants"}),J.map(t=>(0,l.jsx)("option",{value:t.id,children:t.name},t.id))]})]}),(0,l.jsx)(g,{children:0===$.length?(0,l.jsxs)(E,{children:[(0,l.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No admin or staff found"}),(0,l.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters"})]}):(0,l.jsxs)(f,{children:[(0,l.jsx)(b,{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:"Name"}),(0,l.jsx)("th",{children:"Restaurant"}),(0,l.jsx)("th",{children:"Role"}),(0,l.jsx)("th",{children:"Status"}),(0,l.jsx)("th",{children:"Last Active"}),(0,l.jsx)("th",{children:"Actions"})]})}),(0,l.jsx)("tbody",{children:$.map(t=>(0,l.jsxs)(w,{children:[(0,l.jsx)(v,{"data-label":"Name",children:(0,l.jsx)(j,{children:(0,l.jsxs)(A,{children:[(0,l.jsx)(y,{children:t.name}),(0,l.jsx)(F,{children:t.email})]})})}),(0,l.jsx)(v,{"data-label":"Restaurant",children:(0,l.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:t.restaurantName||"-"})}),(0,l.jsx)(v,{"data-label":"Role",children:t.role}),(0,l.jsx)(v,{"data-label":"Status",children:(0,l.jsx)(k,{status:t.status,children:t.status})}),(0,l.jsx)(v,{"data-label":"Last Active",children:t.lastActive}),(0,l.jsx)(v,{"data-label":"",children:(0,l.jsx)(S,{children:(0,l.jsx)(C,{onClick:()=>window.open(`/restaurant/${t.restaurantId}/staff`,"_blank"),children:"View"})})})]},t.id))})]})})]})]})}}}]);