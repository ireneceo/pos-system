"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4833],{4833:(e,a,n)=>{n.r(a),n.d(a,{default:()=>Z});var i=n(9950),t=n(4752),r=n(2853),l=n(8409),s=n(2488),d=n(1367),o=n(9610),c=n(7617),x=n(8666),m=n(5030),p=n(4414);const h=t.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=t.Ay.div`
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
`,g=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,f=t.Ay.div`
  display: flex;
  gap: 12px;
`,j=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=t.Ay.div`
  padding: 32px;
`,y=t.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,b=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,A=t.Ay.table`
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
`,F=t.Ay.thead`
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
`,w=t.Ay.tr`
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
`,C=t.Ay.td`
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
`,E=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,k=t.Ay.div``,_=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,P=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,B=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,S=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"Restaurant Admin"===e.role?"#ECFDF5":"#EDE9FE"};
  color: ${e=>"Restaurant Admin"===e.role?"#059669":"#7C3AED"};
`,M=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
`,z=t.Ay.button`
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
`,R=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,$=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,D=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,O=t.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,N=t.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,T=t.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,I=t.Ay.div`
  position: relative;
`,L=t.Ay.div`
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
`,Q=t.Ay.div`
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
`,U=t.Ay.div`
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  color: #991B1B;
  font-size: 14px;
  margin-bottom: 16px;
`,Z=()=>{var e,a,n,t,Z,q;const{t:J}=(0,m.Bd)("admin"),{user:W}=(0,d.As)(),[Y,G]=(0,i.useState)([]),[H,K]=(0,i.useState)([]),[V,X]=(0,i.useState)(!0),[ee,ae]=(0,i.useState)(""),[ne,ie]=(0,i.useState)("all"),[te,re]=(0,i.useState)("all"),[le,se]=(0,i.useState)(!1),[de,oe]=(0,i.useState)({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),[ce,xe]=(0,i.useState)(""),[me,pe]=(0,i.useState)(""),[he,ue]=(0,i.useState)(!1),[ge,fe]=(0,i.useState)(!1),[je,ve]=(0,i.useState)(null),[ye,be]=(0,i.useState)(!1),[Ae,Fe]=(0,i.useState)({full_name:"",email:"",phone:""}),[we,Ce]=(0,i.useState)(null),[Ee,ke]=(0,i.useState)(""),[_e,Pe]=(0,i.useState)({isOpen:!1,staff:null}),[Be,Se]=(0,i.useState)(!1),[Me,ze]=(0,i.useState)(""),[Re,$e]=(0,i.useState)(""),[De,Oe]=(0,i.useState)(!1),Ne=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),Te=(0,i.useCallback)(async()=>{try{const e={Authorization:`Bearer ${Ne()}`},a=null===W||void 0===W?void 0:W.id,n=await fetch(`/api/restaurants/manager/${a}`,{headers:e}),i=n.ok?await n.json():[];K(i);const t={};i.forEach(e=>{t[e.id]=e.name});const r=await fetch("/api/users",{headers:e});if(r.ok){const e=await r.json(),a=(e.data||e).filter(e=>"Restaurant Admin"===e.role&&(e.restaurant_id&&i.some(a=>a.id===e.restaurant_id))).map(e=>({id:e.id,username:e.username||"",full_name:e.full_name||e.username||"Unknown",email:e.email,phone:e.phone||"",role:e.role,restaurant_id:e.restaurant_id,restaurantName:t[e.restaurant_id]||"Unknown",is_active:!1!==e.is_active,pin_code:e.pin_code||null,createdAt:e.createdAt}));G(a)}}catch(e){console.error("Error fetching staff data:",e)}finally{X(!1)}},[W,Ne]);(0,i.useEffect)(()=>{W&&Te()},[W,Te]);const Ie=Y.filter(e=>{var a;return!(ee&&!e.full_name.toLowerCase().includes(ee.toLowerCase())&&!e.email.toLowerCase().includes(ee.toLowerCase()))&&(!("active"===ne&&!e.is_active)&&(("inactive"!==ne||!e.is_active)&&("all"===te||(null===(a=e.restaurant_id)||void 0===a?void 0:a.toString())===te)))}),Le={total:Y.length,active:Y.filter(e=>e.is_active).length},Qe=me?H.filter(e=>e.name.toLowerCase().includes(me.toLowerCase())):H,Ue=Array.from(new Map(Y.filter(e=>e.restaurant_id).map(e=>[e.restaurant_id,{id:e.restaurant_id,name:e.restaurantName}])).values());return V?(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(g,{children:J("admin:adminManagementPage.restaurantAdmin")})}),(0,p.jsx)(v,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:J("admin:adminManagementPage.loading")})})]}):(0,p.jsxs)(h,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:J("admin:adminManagementPage.restaurantAdmin")}),(0,p.jsx)(f,{children:(0,p.jsx)(j,{variant:"primary",onClick:()=>{oe({username:"",full_name:"",email:"",phone:"",role:"Restaurant Admin",restaurant_id:""}),xe(""),pe(""),se(!0)},children:J("admin:adminManagementPage.addAdmin")})})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(l.MD,{children:[(0,p.jsxs)(l.hI,{color:"#059669",children:[(0,p.jsx)(l.Os,{children:Le.total}),(0,p.jsx)(l.v0,{children:J("admin:adminManagementPage.totalAdmins")}),(0,p.jsxs)(y,{children:["Across ",Ue.length," restaurants"]})]}),(0,p.jsxs)(l.hI,{color:"#7C3AED",children:[(0,p.jsx)(l.Os,{children:Le.active}),(0,p.jsx)(l.v0,{children:J("admin:adminManagementPage.active")}),(0,p.jsxs)(y,{children:[Le.total>0?Math.round(Le.active/Le.total*100):0,"% of total"]})]})]}),(0,p.jsxs)(s.Qn,{children:[(0,p.jsx)(s.DO,{type:"text",placeholder:"Search by name or email...",value:ee,onChange:e=>ae(e.target.value)}),(0,p.jsxs)(s.Jt,{value:ne,onChange:e=>ie(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:J("admin:adminManagementPage.allStatus")}),(0,p.jsx)("option",{value:"active",children:J("admin:adminManagementPage.active")}),(0,p.jsx)("option",{value:"inactive",children:J("admin:adminManagementPage.inactive")})]}),(0,p.jsxs)(s.Jt,{value:te,onChange:e=>re(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:J("admin:adminManagementPage.allRestaurants")}),Ue.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),(0,p.jsx)(b,{children:0===Ie.length?(0,p.jsxs)(r.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No restaurant admin found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:0===Y.length?"Add your first restaurant admin":"Try adjusting your filters"})]}):(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{children:J("admin:adminManagementPage.name")}),(0,p.jsx)("th",{children:J("admin:adminManagementPage.restaurant")}),(0,p.jsx)("th",{children:J("admin:adminManagementPage.role")}),(0,p.jsx)("th",{children:J("admin:adminManagementPage.status")}),(0,p.jsx)("th",{children:J("admin:adminManagementPage.actions")})]})}),(0,p.jsx)("tbody",{children:Ie.map(e=>(0,p.jsxs)(w,{children:[(0,p.jsx)(C,{"data-label":"Name",children:(0,p.jsx)(E,{children:(0,p.jsxs)(k,{children:[(0,p.jsx)(_,{children:e.full_name}),(0,p.jsx)(P,{children:e.email})]})})}),(0,p.jsx)(C,{"data-label":"Restaurant",children:(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540"},children:e.restaurantName||"-"})}),(0,p.jsx)(C,{"data-label":"Role",children:(0,p.jsx)(S,{role:e.role,children:e.role})}),(0,p.jsx)(C,{"data-label":"Status",children:(0,p.jsx)(B,{active:e.is_active,children:e.is_active?"Active":"Inactive"})}),(0,p.jsx)(C,{"data-label":"",children:(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{onClick:()=>(e=>{ve(e),fe(!0)})(e),children:J("admin:adminManagementPage.view")}),(0,p.jsx)(z,{onClick:()=>(e=>{Ce(e),Fe({full_name:e.full_name,email:e.email,phone:e.phone}),ke(""),be(!0)})(e),children:J("admin:adminManagementPage.edit")}),(0,p.jsx)(z,{variant:"danger",onClick:()=>Pe({isOpen:!0,staff:e}),children:e.is_active?"Deactivate":"Activate"})]})})]},e.id))})]})})]}),(0,p.jsxs)(o.aF,{isOpen:le,onClose:()=>se(!1),title:"Add Restaurant Admin",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>se(!1),children:J("admin:adminManagementPage.cancel")}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(xe(""),de.username.trim())if(de.full_name.trim())if(de.email.trim())if(de.restaurant_id)try{const e=Ne(),a=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({username:de.username.trim(),email:de.email.trim(),full_name:de.full_name.trim(),phone:de.phone.trim()||null,role:"Restaurant Admin",restaurant_id:parseInt(de.restaurant_id)})}),n=await a.json();if(!a.ok)return void xe(n.error||"Failed to create staff");se(!1),ze(`Restaurant Admin "${de.username}" created successfully.`),$e(n.generatedPassword||""),Oe(!1),Se(!0),Te()}catch(e){xe("An error occurred. Please try again.")}else xe("Please select a restaurant");else xe("Email is required");else xe("Full Name is required");else xe("Username is required")},children:J("admin:adminManagementPage.create")})]}),children:[ce&&(0,p.jsx)(U,{children:ce}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Restaurant *"}),(0,p.jsxs)(I,{children:[(0,p.jsx)(o.ZQ,{type:"text",placeholder:"Search restaurant...",value:me,onChange:e=>{pe(e.target.value),ue(!0)},onFocus:()=>ue(!0)}),he&&Qe.length>0&&(0,p.jsx)(L,{children:Qe.map(e=>(0,p.jsx)(Q,{onClick:()=>{oe({...de,restaurant_id:e.id.toString()}),pe(e.name),ue(!1)},children:e.name},e.id))})]})]}),(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Username *"}),(0,p.jsx)(o.ZQ,{type:"text",placeholder:"Username",value:de.username,onChange:e=>oe({...de,username:e.target.value})})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Full Name *"}),(0,p.jsx)(o.ZQ,{type:"text",placeholder:"Full name",value:de.full_name,onChange:e=>oe({...de,full_name:e.target.value})})]})]}),(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Email *"}),(0,p.jsx)(o.ZQ,{type:"email",placeholder:"Email",value:de.email,onChange:e=>oe({...de,email:e.target.value})})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:J("admin:adminManagementPage.phone")}),(0,p.jsx)(x.A,{value:de.phone,onChange:e=>oe({...de,phone:e})})]})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:"Password will be auto-generated and shown after creation."})]}),(0,p.jsx)(o.aF,{isOpen:ge,onClose:()=>{fe(!1),ve(null)},title:"Admin Details",size:"medium",footer:(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{fe(!1),ve(null)},children:J("admin:adminManagementPage.close")}),children:je&&(0,p.jsxs)(R,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.fullName")}),(0,p.jsx)(N,{children:je.full_name})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.username")}),(0,p.jsx)(N,{children:je.username})]})]}),(0,p.jsx)(T,{}),(0,p.jsxs)($,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.email")}),(0,p.jsx)(N,{children:je.email})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.phone")}),(0,p.jsx)(N,{children:je.phone||"-"})]})]}),(0,p.jsx)(T,{}),(0,p.jsxs)($,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.role")}),(0,p.jsx)(N,{children:(0,p.jsx)(S,{role:je.role,children:je.role})})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.status")}),(0,p.jsx)(N,{children:(0,p.jsx)(B,{active:je.is_active,children:je.is_active?"Active":"Inactive"})})]})]}),(0,p.jsx)(T,{}),(0,p.jsx)($,{children:(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.restaurant")}),(0,p.jsx)(N,{children:je.restaurantName||"-"})]})}),(0,p.jsx)($,{children:(0,p.jsxs)(D,{children:[(0,p.jsx)(O,{children:J("admin:adminManagementPage.joined")}),(0,p.jsx)(N,{children:je.createdAt?new Date(je.createdAt).toLocaleDateString():"-"})]})})]})}),(0,p.jsxs)(o.aF,{isOpen:ye,onClose:()=>{be(!1),Ce(null)},title:"Edit Restaurant Admin",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{be(!1),Ce(null)},children:J("admin:adminManagementPage.cancel")}),(0,p.jsx)(o.yl,{variant:"primary",onClick:async()=>{if(we)if(ke(""),Ae.full_name.trim())if(Ae.email.trim())try{const e=Ne(),a=await fetch(`/api/users/${we.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:Ae.full_name.trim(),email:Ae.email.trim(),phone:Ae.phone.trim()||null})}),n=await a.json();if(!a.ok)return void ke(n.error||"Failed to update");be(!1),Te()}catch(e){ke("An error occurred. Please try again.")}else ke("Email is required");else ke("Full Name is required")},children:J("admin:adminManagementPage.update")})]}),children:[Ee&&(0,p.jsx)(U,{children:Ee}),(0,p.jsxs)(o.fh,{children:[(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Full Name *"}),(0,p.jsx)(o.ZQ,{type:"text",value:Ae.full_name,onChange:e=>Fe({...Ae,full_name:e.target.value})})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:"Email *"}),(0,p.jsx)(o.ZQ,{type:"email",value:Ae.email,onChange:e=>Fe({...Ae,email:e.target.value})})]})]}),(0,p.jsxs)(o.gE,{children:[(0,p.jsx)(o.lR,{children:J("admin:adminManagementPage.phone")}),(0,p.jsx)(x.A,{value:Ae.phone,onChange:e=>Fe({...Ae,phone:e})})]}),we&&(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",background:"#F9FAFB",padding:"12px",borderRadius:"8px"},children:["Restaurant: ",we.restaurantName||"-"," \xb7 Role: ",we.role]})]}),(0,p.jsx)(c.A,{isOpen:_e.isOpen,onCancel:()=>Pe({isOpen:!1,staff:null}),onConfirm:async()=>{const e=_e.staff;if(e)try{const a=Ne();(await fetch(`/api/users/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(Pe({isOpen:!1,staff:null}),Te())}catch(a){console.error("Error toggling staff status:",a)}},title:null!==(e=_e.staff)&&void 0!==e&&e.is_active?"Deactivate Admin":"Activate Admin",message:null!==(a=_e.staff)&&void 0!==a&&a.is_active?`Are you sure you want to deactivate "${null===(n=_e.staff)||void 0===n?void 0:n.full_name}"? They will no longer be able to log in.`:`Activate "${null===(t=_e.staff)||void 0===t?void 0:t.full_name}"? They will be able to log in again.`,confirmText:null!==(Z=_e.staff)&&void 0!==Z&&Z.is_active?"Deactivate":"Activate",cancelText:"Cancel",type:null!==(q=_e.staff)&&void 0!==q&&q.is_active?"danger":"info"}),(0,p.jsxs)(o.aF,{isOpen:Be,onClose:()=>Se(!1),title:"Password Generated",size:"small",footer:(0,p.jsxs)(p.Fragment,{children:[Re&&(0,p.jsx)(o.yl,{variant:"secondary",onClick:()=>{navigator.clipboard.writeText(Re),Oe(!0),setTimeout(()=>Oe(!1),2e3)},children:De?"Copied!":"Copy Password"}),(0,p.jsx)(o.yl,{variant:"primary",onClick:()=>Se(!1),children:J("admin:adminManagementPage.done")})]}),children:[(0,p.jsxs)("div",{style:{marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:[Me," Please share this password securely. They should change it after first login."]}),Re&&(0,p.jsxs)("div",{style:{background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",padding:"16px",textAlign:"center",marginBottom:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px",fontWeight:600},children:J("admin:adminManagementPage.temporaryPassword")}),(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:700,color:"#0A2540",fontFamily:"monospace",letterSpacing:"1px",userSelect:"all"},children:Re})]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#DC2626"},children:J("admin:adminManagementPage.thisPasswordWillNotBeShownAgainPleaseCopyItNow")})]})]})}},7617:(e,a,n)=>{n.d(a,{A:()=>p});n(9950);var i=n(7119),t=n(4752),r=n(9610),l=n(4414);const s=t.Ay.div`
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