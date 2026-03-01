"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4083],{4083:(e,r,t)=>{t.r(r),t.d(r,{default:()=>G});var n=t(8819),i=t(9950),o=t(4752),s=t(1367),a=t(4302),l=t(7455),d=t(4185),c=t(2674),p=t(4414);const u=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=o.Ay.div`
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
`,h=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=o.Ay.div`
  display: flex;
  gap: 12px;
`,j=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${n.w.colors.border};\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,v=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${n.w.colors.secondary};
  margin-bottom: 4px;
`,w=o.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=o.Ay.div`
  padding: 20px 0;
  margin-bottom: 24px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${n.w.colors.border};
`,A=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: ${n.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,C=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,S=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,E=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,B=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,I=o.Ay.div`
  flex: 1;
`,$=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
  overflow-wrap: break-word;
`,q=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,R=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,N=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,_=o.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,D=o.Ay.div`
  font-size: 14px;
  color: ${n.w.colors.text.muted};
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,M=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: ${n.w.colors.text.muted};
  flex-wrap: wrap;
  gap: 12px;
`,O=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,T=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,L=o.Ay.span`
  color: ${n.w.colors.text.dark};
`,P=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    color: #374151;
    margin-bottom: 8px;
  }
`,G=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,i.useState)([]),[n,o]=(0,i.useState)([]),[G,H]=(0,i.useState)(""),[U,W]=(0,i.useState)("all"),[J,Q]=(0,i.useState)("all"),[X,Y]=(0,i.useState)("all"),[Z,K]=(0,i.useState)(!1),[V,ee]=(0,i.useState)(""),[re,te]=(0,i.useState)({subject:"",description:"",priority:"medium",category:"other"}),[ne,ie]=(0,i.useState)(null),[oe,se]=(0,i.useState)([]),[ae,le]=(0,i.useState)({}),de=(null===e||void 0===e?void 0:e.id)||"3",ce=(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.email)||"Restaurant User",pe=(null===e||void 0===e?void 0:e.email)||"restaurant@example.com",ue=(null===e||void 0===e?void 0:e.role)||"Restaurant Admin",xe=(null===e||void 0===e?void 0:e.restaurantId)||"1",he=(null===e||void 0===e?void 0:e.restaurantName)||"Test Restaurant";(0,i.useEffect)(()=>{if(e&&e.restaurantId){me(),ge();const e=setInterval(me,1e4);return()=>clearInterval(e)}},[e]),(0,i.useEffect)(()=>{1===n.length&&ee(n[0].id.toString())},[n]);const ge=async()=>{try{const e=await fetch(`/api/restaurants/${xe}`);if(e.ok){const r=await e.json();console.log("Restaurant data:",r),r.managers&&r.managers.length>0?o(r.managers):console.warn("No managers found for restaurant")}}catch(e){console.error("Error fetching managers:",e)}},me=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/operation-tickets?userId=${de}&userRole=${ue}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();t(e),je(e)}}catch(e){console.error("Error fetching operation tickets:",e)}},je=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),t=e.map(e=>e.id).join(","),n=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${t}`,{headers:{Authorization:`Bearer ${r}`}});if(n.ok){const e=await n.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),le(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ye=r.filter(e=>{const r=e.subject.toLowerCase().includes(G.toLowerCase())||e.ticketNumber.toLowerCase().includes(G.toLowerCase())||e.managerName.toLowerCase().includes(G.toLowerCase()),t="all"===U||e.status===U,n="all"===J||e.priority===J,i="all"===X||e.category===X;return r&&t&&n&&i}),fe=r.length,ve=r.filter(e=>"open"===e.status).length,we=r.filter(e=>"in-progress"===e.status).length,be=r.filter(e=>"resolved"===e.status).length,Ae=(r.filter(e=>"closed"===e.status).length,e=>new Date(e).toLocaleString("en-MY"));return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(u,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:"Operation Inquiry"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:me,children:"Refresh"}),(0,p.jsx)(j,{variant:"primary",onClick:()=>{K(!0)},children:"New Inquiry"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(y,{children:[(0,p.jsxs)(f,{color:"#635BFF",children:[(0,p.jsx)(v,{children:fe}),(0,p.jsx)(w,{children:"Total Inquiries"})]}),(0,p.jsxs)(f,{color:"#F59E0B",children:[(0,p.jsx)(v,{children:ve}),(0,p.jsx)(w,{children:"Open"})]}),(0,p.jsxs)(f,{color:"#3B82F6",children:[(0,p.jsx)(v,{children:we}),(0,p.jsx)(w,{children:"In Progress"})]}),(0,p.jsxs)(f,{color:"#10B981",children:[(0,p.jsx)(v,{children:be}),(0,p.jsx)(w,{children:"Resolved"})]})]}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"Search"}),(0,p.jsx)(k,{placeholder:"Search inquiries...",value:G,onChange:e=>H(e.target.value)})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"Status"}),(0,p.jsxs)(C,{value:U,onChange:e=>W(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"open",children:"Open"}),(0,p.jsx)("option",{value:"in-progress",children:"In Progress"}),(0,p.jsx)("option",{value:"resolved",children:"Resolved"}),(0,p.jsx)("option",{value:"closed",children:"Closed"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"Priority"}),(0,p.jsxs)(C,{value:J,onChange:e=>Q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priority"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(F,{children:"Category"}),(0,p.jsxs)(C,{value:X,onChange:e=>Y(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]}),(0,p.jsxs)(S,{children:[ye.map(e=>(0,p.jsxs)(E,{onClick:()=>(e=>{ie(e),window.dispatchEvent(new Event("refreshBadgeCounts"))})(e),style:{cursor:"pointer"},children:[(0,p.jsxs)(B,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)($,{children:e.ticketNumber}),(0,p.jsx)(z,{children:e.subject}),(0,p.jsxs)(q,{children:["Manager: ",e.managerName]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(N,{status:e.status,children:e.status}),(0,p.jsx)(_,{priority:e.priority,children:e.priority})]})]}),(0,p.jsx)(D,{children:e.description}),(0,p.jsxs)(M,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(T,{children:"Created"}),(0,p.jsx)(L,{children:Ae(e.createdAt)})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(T,{children:"Category"}),(0,p.jsx)(L,{children:e.category})]}),ae[e.id]&&(0,p.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ae[e.id].total_comments,ae[e.id].unread_count>0&&(0,p.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ae[e.id].unread_count," new"]})]})]})]},e.id)),0===ye.length&&(0,p.jsxs)(P,{children:[(0,p.jsx)("h3",{children:"No inquiries yet"}),(0,p.jsx)("p",{children:'Click "New Inquiry" to submit your first operation inquiry to your manager.'})]})]}),ne&&(0,p.jsx)(c.mH,{onClick:()=>ie(null),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"700px"},children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:ne.ticketNumber}),(0,p.jsx)(c.Jn,{onClick:()=>ie(null),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:600,color:"#0A2540",marginBottom:"8px",wordBreak:"break-word"},children:ne.subject}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px"},children:[(0,p.jsx)(N,{status:ne.status,children:ne.status}),(0,p.jsx)(_,{priority:ne.priority,children:ne.priority}),(0,p.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",padding:"4px 12px",background:"#F3F4F6",borderRadius:"6px"},children:ne.category})]}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7C93"},children:["To: ",ne.managerName," \xb7 ",Ae(ne.createdAt)]})]}),(0,p.jsx)(D,{children:ne.description}),(null===ne||void 0===ne?void 0:ne.attachments)&&ne.attachments.length>0&&(0,p.jsx)(d.A,{attachments:ne.attachments}),(0,p.jsx)(a.A,{entityType:"operation_ticket",entityId:String(ne.id),currentUserId:null===e||void 0===e?void 0:e.id,onMarkRead:()=>le(e=>{const r={...e},t=String(ne.id);return r[t]&&(r[t]={...r[t],unread_count:0}),r})})]})]})}),Z&&(0,p.jsx)(c.mH,{onClick:()=>K(!1),children:(0,p.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Create Operation Inquiry"}),(0,p.jsx)(c.Jn,{onClick:()=>K(!1),children:"\xd7"})]}),(0,p.jsxs)(c.cw,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Inquiry Target *"}),(0,p.jsxs)(c.FX,{value:V,onChange:e=>ee(e.target.value),required:!0,disabled:n.length<=1,children:[(0,p.jsx)("option",{value:"",children:0===n.length?"No one connected":"Select Inquiry Target"}),n.map(e=>{return(0,p.jsxs)("option",{value:e.id.toString(),children:[e.name," (",(r=e.role,"Foodcourt General"===r||"Foodcourt Manager"===r?"Foodcourt":"Brand General"===r||"Brand Manager"===r?"Brand":"Restaurant Owner"===r?"Owner":r),")"]},e.id);var r})]}),0===n.length&&(0,p.jsx)("div",{style:{fontSize:"12px",color:"#DC2626",marginTop:"4px"},children:"This restaurant is not connected to anyone. Please contact system administrator."})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Subject *"}),(0,p.jsx)(c.ZQ,{type:"text",value:re.subject,onChange:e=>te({...re,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Description *"}),(0,p.jsx)(c.Lz,{value:re.description,onChange:e=>te({...re,description:e.target.value}),placeholder:"Detailed description of your inquiry...",rows:4,required:!0})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Attachments"}),(0,p.jsx)(l.A,{files:oe,onChange:se,maxFiles:5})]}),(0,p.jsxs)(c.fh,{children:[(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Priority"}),(0,p.jsxs)(c.FX,{value:re.priority,onChange:e=>te({...re,priority:e.target.value}),children:[(0,p.jsx)("option",{value:"low",children:"Low"}),(0,p.jsx)("option",{value:"medium",children:"Medium"}),(0,p.jsx)("option",{value:"high",children:"High"}),(0,p.jsx)("option",{value:"urgent",children:"Urgent"})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Category"}),(0,p.jsxs)(c.FX,{value:re.category,onChange:e=>te({...re,category:e.target.value}),children:[(0,p.jsx)("option",{value:"schedule",children:"Schedule"}),(0,p.jsx)("option",{value:"inventory",children:"Inventory"}),(0,p.jsx)("option",{value:"staff",children:"Staff"}),(0,p.jsx)("option",{value:"menu",children:"Menu"}),(0,p.jsx)("option",{value:"customer",children:"Customer"}),(0,p.jsx)("option",{value:"other",children:"Other"})]})]})]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>K(!1),children:"Cancel"}),(0,p.jsx)(j,{variant:"primary",onClick:async()=>{if(!re.subject.trim()||!re.description.trim()||!V)return;const e=n.find(e=>e.id.toString()===V);if(!e)return;const r=(e=>{const r=n.find(r=>r.id.toString()===e);if(r)return"Foodcourt General"===r.role||"Foodcourt Manager"===r.role?"foodcourt":"Brand General"===r.role||"Brand Manager"===r.role?"brand":"Restaurant Owner"===r.role?"owner":void 0})(V);try{const t={requesterId:parseInt(de),requesterName:ce,requesterEmail:pe,requesterRole:ue,restaurantId:parseInt(xe),restaurantName:he,managerId:parseInt(e.id.toString()),managerName:e.name,subject:re.subject,description:re.description,priority:re.priority,category:re.category,inquiryType:r,attachments:oe.length>0?oe:void 0},i=localStorage.getItem("auth_token");(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(t)})).ok&&(await me(),te({subject:"",description:"",priority:"medium",category:"other"}),se([]),ee(1===n.length?n[0].id.toString():""),K(!1))}catch(t){console.error("Error creating ticket:",t)}},disabled:!re.subject.trim()||!re.description.trim()||!V,children:"Submit Inquiry"})]})]})})]})]})})}}}]);