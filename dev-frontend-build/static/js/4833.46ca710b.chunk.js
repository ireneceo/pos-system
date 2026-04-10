"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4833],{4833:(e,a,n)=>{n.r(a),n.d(a,{default:()=>q});var i=n(9950),t=n(4752),r=n(2853),l=n(8409),s=n(2488),d=n(1367),o=n(9610),c=n(7617),x=n(8666),m=n(5030),p=n(9955),h=n(4414);const u=t.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,g=t.Ay.div`
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
`,f=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,j=t.Ay.div`
  display: flex;
  gap: 12px;
`,v=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=t.Ay.div`
  padding: 32px;
`,b=t.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,A=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,F=t.Ay.table`
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
`,w=t.Ay.thead`
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

  th:nth-child(3) { text-align: center; }
  th:nth-child(4) { text-align: center; }
  th:nth-child(5) { text-align: right; }
`,C=t.Ay.tr`
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

    &:last-child {
      margin-bottom: 0;
    }
  }
`,E=t.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  &:nth-child(3) { text-align: center; }
  &:nth-child(4) { text-align: center; }
  &:nth-child(5) { text-align: right; }

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
`,k=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,_=t.Ay.div``,P=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,B=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,S=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,M=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"Restaurant Admin"===e.role?"#ECFDF5":"#EDE9FE"};
  color: ${e=>"Restaurant Admin"===e.role?"#059669":"#7C3AED"};
`,z=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,R=t.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  border-radius: 6px;
  color: ${e=>"danger"===e.variant?"#DC2626":"#6B7280"};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>"danger"===e.variant?"#FCA5A5":"#635BFF"};
    color: ${e=>"danger"===e.variant?"#B91C1C":"#635BFF"};
    background: ${e=>"danger"===e.variant?"#FEF2F2":"#F4F3FF"};
  }
`,$=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,D=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,O=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,N=t.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,T=t.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,I=t.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,L=t.Ay.div`
  position: relative;
`,Q=t.Ay.div`
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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
`,U=t.Ay.div`
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`,Z=t.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  margin-bottom: 16px;
`,q=()=>{var e,a,n,t,q,J;const{t:W}=(0,m.Bd)("admin"),{user:Y}=(0,d.As)(),[G,H]=(0,i.useState)([]),[K,V]=(0,i.useState)([]),[X,ee]=(0,i.useState)(!0),[ae,ne]=(0,i.useState)(""),[ie,te]=(0,i.useState)("all"),[re,le]=(0,i.useState)("all"),[se,de]=(0,i.useState)(!1),[oe,ce]=(0,i.useState)({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),[xe,me]=(0,i.useState)(""),[pe,he]=(0,i.useState)(""),[ue,ge]=(0,i.useState)(!1),[fe,je]=(0,i.useState)(!1),[ve,ye]=(0,i.useState)(null),[be,Ae]=(0,i.useState)(!1),[Fe,we]=(0,i.useState)({full_name:"",email:"",phone:""}),[Ce,Ee]=(0,i.useState)(null),[ke,_e]=(0,i.useState)(""),[Pe,Be]=(0,i.useState)({isOpen:!1,staff:null}),[Se,Me]=(0,i.useState)(!1),[ze,Re]=(0,i.useState)(""),[$e,De]=(0,i.useState)(""),[Oe,Ne]=(0,i.useState)(!1),Te=(0,i.useCallback)(()=>(0,p.c4)(),[]),Ie=(0,i.useCallback)(async()=>{try{const e={Authorization:`Bearer ${Te()}`},a=null===Y||void 0===Y?void 0:Y.id,n=await fetch(`/api/restaurants/manager/${a}`,{headers:e}),i=n.ok?await n.json():[];V(i);const t={};i.forEach(e=>{t[e.id]=e.name});const r=await fetch("/api/users",{headers:e});if(r.ok){const e=await r.json(),a=(e.data||e).filter(e=>"Restaurant Admin"===e.role&&(e.restaurant_id&&i.some(a=>a.id===e.restaurant_id))).map(e=>({id:e.id,username:e.username||"",full_name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,restaurant_id:e.restaurant_id,restaurantName:t[e.restaurant_id]||"Unknown",is_active:!1!==e.is_active,pin_code:e.pin_code||null,createdAt:e.createdAt}));H(a)}}catch(e){console.error("Error fetching staff data:",e)}finally{ee(!1)}},[Y,Te]);(0,i.useEffect)(()=>{Y&&Ie()},[Y,Ie]);const Le=G.filter(e=>{var a;return!(ae&&!e.full_name.toLowerCase().includes(ae.toLowerCase())&&!e.email.toLowerCase().includes(ae.toLowerCase()))&&(!("active"===ie&&!e.is_active)&&(("inactive"!==ie||!e.is_active)&&("all"===re||(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())===re)))}),Qe={total:G.length,active:G.filter(e=>e.is_active).length},Ue=pe?K.filter(e=>e.name.toLowerCase().includes(pe.toLowerCase())):K,Ze=Array.from(new Map(G.filter(e=>e.restaurant_id).map(e=>[e.restaurant_id,{id:e.restaurant_id,name:e.restaurantName}])).values());return X?(0,h.jsxs)(u,{children:[(0,h.jsx)(g,{children:(0,h.jsx)(f,{children:W("admin:adminManagementPage.restaurantAdmin")})}),(0,h.jsx)(y,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:W("admin:adminManagementPage.loading")})})]}):(0,h.jsxs)(u,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(f,{children:W("admin:adminManagementPage.restaurantAdmin")}),(0,h.jsx)(j,{children:(0,h.jsx)(v,{variant:"primary",onClick:()=>{ce({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),me(""),he(""),de(!0)},children:W("admin:adminManagementPage.addAdmin")})})]}),(0,h.jsxs)(y,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:Qe.total}),(0,h.jsx)(l.v0,{children:W("admin:adminManagementPage.totalAdmins")}),(0,h.jsxs)(b,{children:["Across ",Ze.length," restaurants"]})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:Qe.active}),(0,h.jsx)(l.v0,{children:W("admin:adminManagementPage.active")}),(0,h.jsxs)(b,{children:[Qe.total>0?Math.round(Qe.active/Qe.total*100):0,"% of total"]})]})]}),(0,h.jsxs)(s.Qn,{children:[(0,h.jsx)(s.DO,{type:"text",placeholder:"Search by name or email...",value:ae,onChange:e=>ne(e.target.value)}),(0,h.jsxs)(s.Jt,{value:ie,onChange:e=>te(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:W("admin:adminManagementPage.allStatus")}),(0,h.jsx)("option",{value:"active",children:W("admin:adminManagementPage.active")}),(0,h.jsx)("option",{value:"inactive",children:W("admin:adminManagementPage.inactive")})]}),(0,h.jsxs)(s.Jt,{value:re,onChange:e=>le(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:W("admin:adminManagementPage.allRestaurants")}),Ze.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,h.jsx)(A,{children:0===Le.length?(0,h.jsxs)(r.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No restaurant admin found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:0===G.length?"Add your first restaurant admin":"Try adjusting your filters"})]}):(0,h.jsxs)(F,{children:[(0,h.jsx)(w,{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:W("admin:adminManagementPage.name")}),(0,h.jsx)("th",{children:W("admin:adminManagementPage.restaurant")}),(0,h.jsx)("th",{children:W("admin:adminManagementPage.role")}),(0,h.jsx)("th",{children:W("admin:adminManagementPage.status")}),(0,h.jsx)("th",{children:W("admin:adminManagementPage.actions")})]})}),(0,h.jsx)("tbody",{children:Le.map(e=>(0,h.jsxs)(C,{children:[(0,h.jsx)(E,{"data-label":"Name",children:(0,h.jsx)(k,{children:(0,h.jsxs)(_,{children:[(0,h.jsx)(P,{children:e.full_name}),(0,h.jsx)(B,{children:e.email})]})})}),(0,h.jsx)(E,{"data-label":"Restaurant",children:(0,h.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:e.restaurantName||"-"})}),(0,h.jsx)(E,{"data-label":"Role",children:(0,h.jsx)(M,{role:e.role,children:e.role})}),(0,h.jsx)(E,{"data-label":"Status",children:(0,h.jsx)(S,{active:e.is_active,children:e.is_active?"Active":"Inactive"})}),(0,h.jsx)(E,{"data-label":"",children:(0,h.jsxs)(z,{children:[(0,h.jsx)(R,{onClick:()=>(e=>{ye(e),je(!0)})(e),children:W("admin:adminManagementPage.view")}),(0,h.jsx)(R,{onClick:()=>(e=>{Ee(e),we({full_name:e.full_name,email:e.email,phone:e.phone}),_e(""),Ae(!0)})(e),children:W("admin:adminManagementPage.edit")}),(0,h.jsx)(R,{variant:"danger",onClick:()=>Be({isOpen:!0,staff:e}),children:e.is_active?"Deactivate":"Activate"})]})})]},e.id))})]})})]}),(0,h.jsxs)(o.aF,{isOpen:se,onClose:()=>de(!1),title:"Add Restaurant Admin",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>de(!1),children:W("admin:adminManagementPage.cancel")}),(0,h.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(me(""),oe.username.trim())if(oe.full_name.trim())if(oe.email.trim())if(oe.restaurant_id)try{const e=Te(),a=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:oe.username.trim(),email:oe.email.trim(),full_name:oe.full_name.trim(),phone:oe.phone.trim()||null,role:"Restaurant Admin",restaurant_id:parseInt(oe.restaurant_id)})}),n=await a.json();if(!a.ok)return void me(n.error||"Failed to create staff");de(!1),Re(`Restaurant Admin "${oe.username}" created successfully.`),De(n.generatedPassword||""),Ne(!1),Me(!0),Ie()}catch(e){me("An error occurred. Please try again.")}else me("Please select a restaurant");else me("Email is required");else me("Full Name is required");else me("Username is required")},children:W("admin:adminManagementPage.create")})]}),children:[xe&&(0,h.jsx)(Z,{children:xe}),(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Restaurant *"}),(0,h.jsxs)(L,{children:[(0,h.jsx)(o.ZQ,{type:"text",placeholder:"Search restaurant...",value:pe,onChange:e=>{he(e.target.value),ge(!0)},onFocus:()=>ge(!0)}),ue&&Ue.length>0&&(0,h.jsx)(Q,{children:Ue.map(e=>(0,h.jsx)(U,{onClick:()=>{ce({...oe,restaurant_id:e.id.toString()}),he(e.name),ge(!1)},children:e.name},e.id))})]})]}),(0,h.jsxs)(o.fh,{children:[(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Username *"}),(0,h.jsx)(o.ZQ,{type:"text",placeholder:"Username",value:oe.username,onChange:e=>ce({...oe,username:e.target.value})})]}),(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Full Name *"}),(0,h.jsx)(o.ZQ,{type:"text",placeholder:"Full name",value:oe.full_name,onChange:e=>ce({...oe,full_name:e.target.value})})]})]}),(0,h.jsxs)(o.fh,{children:[(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Email *"}),(0,h.jsx)(o.ZQ,{type:"email",placeholder:"Email",value:oe.email,onChange:e=>ce({...oe,email:e.target.value})})]}),(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:W("admin:adminManagementPage.phone")}),(0,h.jsx)(x.A,{value:oe.phone,onChange:e=>ce({...oe,phone:e})})]})]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:"Password will be auto-generated and shown after creation."})]}),(0,h.jsx)(o.aF,{isOpen:fe,onClose:()=>{je(!1),ye(null)},title:"Admin Details",size:"medium",footer:(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{je(!1),ye(null)},children:W("admin:adminManagementPage.close")}),children:ve&&(0,h.jsxs)($,{children:[(0,h.jsxs)(D,{children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.fullName")}),(0,h.jsx)(T,{children:ve.full_name})]}),(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.username")}),(0,h.jsx)(T,{children:ve.username})]})]}),(0,h.jsx)(I,{}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.email")}),(0,h.jsx)(T,{children:ve.email})]}),(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.phone")}),(0,h.jsx)(T,{children:ve.phone||"-"})]})]}),(0,h.jsx)(I,{}),(0,h.jsxs)(D,{children:[(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.role")}),(0,h.jsx)(T,{children:(0,h.jsx)(M,{role:ve.role,children:ve.role})})]}),(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.status")}),(0,h.jsx)(T,{children:(0,h.jsx)(S,{active:ve.is_active,children:ve.is_active?"Active":"Inactive"})})]})]}),(0,h.jsx)(I,{}),(0,h.jsx)(D,{children:(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.restaurant")}),(0,h.jsx)(T,{children:ve.restaurantName||"-"})]})}),(0,h.jsx)(D,{children:(0,h.jsxs)(O,{children:[(0,h.jsx)(N,{children:W("admin:adminManagementPage.joined")}),(0,h.jsx)(T,{children:ve.createdAt?new Date(ve.createdAt).toLocaleDateString():"-"})]})})]})}),(0,h.jsxs)(o.aF,{isOpen:be,onClose:()=>{Ae(!1),Ee(null)},title:"Edit Restaurant Admin",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{Ae(!1),Ee(null)},children:W("admin:adminManagementPage.cancel")}),(0,h.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(Ce)if(_e(""),Fe.full_name.trim())if(Fe.email.trim())try{const e=Te(),a=await fetch(`/api/users/${Ce.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:Fe.full_name.trim(),email:Fe.email.trim(),phone:Fe.phone.trim()||null})}),n=await a.json();if(!a.ok)return void _e(n.error||"Failed to update");Ae(!1),Ie()}catch(e){_e("An error occurred. Please try again.")}else _e("Email is required");else _e("Full Name is required")},children:W("admin:adminManagementPage.update")})]}),children:[ke&&(0,h.jsx)(Z,{children:ke}),(0,h.jsxs)(o.fh,{children:[(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Full Name *"}),(0,h.jsx)(o.ZQ,{type:"text",value:Fe.full_name,onChange:e=>we({...Fe,full_name:e.target.value})})]}),(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:"Email *"}),(0,h.jsx)(o.ZQ,{type:"email",value:Fe.email,onChange:e=>we({...Fe,email:e.target.value})})]})]}),(0,h.jsxs)(o.gE,{children:[(0,h.jsx)(o.lR,{children:W("admin:adminManagementPage.phone")}),(0,h.jsx)(x.A,{value:Fe.phone,onChange:e=>we({...Fe,phone:e})})]}),Ce&&(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:["Restaurant: ",Ce.restaurantName||"-"," \xb7 Role: ",Ce.role]})]}),(0,h.jsx)(c.A,{isOpen:Pe.isOpen,onCancel:()=>Be({isOpen:!1,staff:null}),onConfirm:async()=>{const e=Pe.staff;if(e)try{const a=Te();(await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(Be({isOpen:!1,staff:null}),Ie())}catch(a){console.error("Error toggling staff status:",a)}},title:null!==(e=Pe.staff)&&void 0!==e&&e.is_active?"Deactivate Admin":"Activate Admin",message:null!==(a=Pe.staff)&&void 0!==a&&a.is_active?`Are you sure you want to deactivate "${null===(n=Pe.staff)||void 0===n?void 0:n.full_name}"? They will no longer be able to log in.`:`Activate "${null===(t=Pe.staff)||void 0===t?void 0:t.full_name}"? They will be able to log in again.`,confirmText:null!==(q=Pe.staff)&&void 0!==q&&q.is_active?"Deactivate":"Activate",cancelText:"Cancel",type:null!==(J=Pe.staff)&&void 0!==J&&J.is_active?"danger":"info"}),(0,h.jsxs)(o.aF,{isOpen:Se,onClose:()=>Me(!1),title:"Password Generated",size:"small",footer:(0,h.jsxs)(h.Fragment,{children:[$e&&(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText($e),Ne(!0),setTimeout(()=>Ne(!1),2e3)},children:Oe?"Copied!":"Copy Password"}),(0,h.jsx)(o.yl,{variant:"primary",onClick:()=>Me(!1),children:W("admin:adminManagementPage.done")})]}),children:[(0,h.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[ze," Please share this password securely. They should change it after first login."]}),$e&&(0,h.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:W("admin:adminManagementPage.temporaryPassword")}),(0,h.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:$e})]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:W("admin:adminManagementPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})}},7617:(e,a,n)=>{n.d(a,{A:()=>p});n(9950);var i=n(7119),t=n(4752),r=n(9610),l=n(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,o=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,x=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,m=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,p=e=>{let{isOpen:a,title:n,message:t,onConfirm:p,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:f="warning"}=e;return a?i.createPortal((0,l.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,l.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,l.jsxs)(d,{children:[(0,l.jsx)(o,{children:n}),(0,l.jsx)(c,{children:t})]}),(0,l.jsxs)(x,{children:[(0,l.jsx)(m,{variant:"secondary",onClick:h,children:g}),(0,l.jsx)(m,{variant:"primary",type:f,onClick:p,children:u})]})]})}),document.body):null}}}]);