"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4022],{4022:(e,r,n)=>{n.r(r),n.d(r,{default:()=>M});var t=n(9950),i=n(4752),o=n(2853),a=n(1367),s=n(4302),l=n(8409),d=n(5030),c=n(4414);const p=i.Ay.div`
  min-height: 100vh;
`,u=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,g=i.Ay.div`
  display: flex;
  gap: 12px;
`,y=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=i.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,f=(i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,i.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`),w=i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,b=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,F=i.Ay.div`
  flex: 1;
`,A=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=i.Ay.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`,I=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,k=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"open":return"#FEF3C7";case"in-progress":return"#DBEAFE";case"resolved":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"open":return"#D97706";case"in-progress":return"#1E40AF";case"resolved":return"#059669";default:return"#6B7280"}}};
`,B=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.priority){case"urgent":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.priority){case"urgent":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,q=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,C=i.Ay.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`,P=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,z=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,_=i.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=i.Ay.span`
  color: #374151;
`,N=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,T=i.Ay.div`
  margin-bottom: 20px;
`,D=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,O=i.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,R=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,L=i.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=()=>{const{t:e}=(0,d.Bd)("owner"),{user:r}=(0,a.As)(),[n,i]=(0,t.useState)([]),[M,U]=(0,t.useState)([]),[J,W]=(0,t.useState)(""),[Y,K]=(0,t.useState)("all"),[H,G]=(0,t.useState)("all"),[Q,V]=(0,t.useState)("all"),[X,Z]=(0,t.useState)("all"),[ee,re]=(0,t.useState)(!1),[ne,te]=(0,t.useState)(!1),[ie,oe]=(0,t.useState)(null),[ae,se]=(0,t.useState)("open"),[le,de]=(0,t.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}),[ce,pe]=(0,t.useState)({});(0,t.useEffect)(()=>{r&&ue()},[r]),(0,t.useEffect)(()=>{if(M.length>0){xe();const e=setInterval(xe,1e4);return()=>clearInterval(e)}},[M]);const ue=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;U(n.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},xe=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/support-tickets",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;i(n),he(n)}}catch(e){console.error("Error fetching tickets:",e)}},he=async e=>{if(0!==e.length)try{const r=localStorage.getItem("auth_token"),n=e.map(e=>e.id).join(","),t=await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(t.ok){const e=await t.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),pe(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},ge=n.filter(e=>{const r=e.subject.toLowerCase().includes(J.toLowerCase())||e.ticketNumber.toLowerCase().includes(J.toLowerCase()),n="all"===Y||e.status===Y,t="all"===H||e.priority===H,i="all"===Q||e.category===Q,o="all"===X||String(e.restaurantId)===X;return r&&n&&t&&i&&o}),ye=n.filter(e=>"open"===e.status).length,me=n.filter(e=>"in-progress"===e.status).length,fe=n.filter(e=>"resolved"===e.status).length,we=e=>new Date(e).toLocaleString("en-MY"),je=e=>{if(!e)return"";const r=M.find(r=>r.id===e);return r?r.name:""};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(u,{children:[(0,c.jsx)(h,{children:e("owner:ownerSystemInquiryPage.systemInquiry")}),(0,c.jsx)(g,{children:(0,c.jsx)(y,{variant:"primary",onClick:()=>re(!0),children:e("owner:ownerSystemInquiryPage.newInquiry")})})]}),(0,c.jsxs)(x,{children:[(0,c.jsxs)(l.MD,{children:[(0,c.jsxs)(l.hI,{color:"#635BFF",children:[(0,c.jsx)(l.Os,{children:n.length}),(0,c.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.totalInquiries")})]}),(0,c.jsxs)(l.hI,{color:"#F59E0B",children:[(0,c.jsx)(l.Os,{children:ye}),(0,c.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.open")})]}),(0,c.jsxs)(l.hI,{color:"#3B82F6",children:[(0,c.jsx)(l.Os,{children:me}),(0,c.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.inProgress")})]}),(0,c.jsxs)(l.hI,{color:"#10B981",children:[(0,c.jsx)(l.Os,{children:fe}),(0,c.jsx)(l.v0,{children:e("owner:ownerSystemInquiryPage.resolved")})]})]}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(w,{value:X,onChange:e=>Z(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allRestaurants")}),M.map(e=>(0,c.jsx)("option",{value:String(e.id),children:e.name},e.id))]}),(0,c.jsxs)(w,{value:Y,onChange:e=>K(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allStatus")}),(0,c.jsx)("option",{value:"open",children:e("owner:ownerSystemInquiryPage.open")}),(0,c.jsx)("option",{value:"in-progress",children:e("owner:ownerSystemInquiryPage.inProgress")}),(0,c.jsx)("option",{value:"resolved",children:e("owner:ownerSystemInquiryPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("owner:ownerSystemInquiryPage.closed")})]}),(0,c.jsxs)(w,{value:H,onChange:e=>G(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allPriority")}),(0,c.jsx)("option",{value:"urgent",children:e("owner:ownerSystemInquiryPage.urgent")}),(0,c.jsx)("option",{value:"high",children:e("owner:ownerSystemInquiryPage.high")}),(0,c.jsx)("option",{value:"medium",children:e("owner:ownerSystemInquiryPage.medium")}),(0,c.jsx)("option",{value:"low",children:e("owner:ownerSystemInquiryPage.low")})]}),(0,c.jsxs)(w,{value:Q,onChange:e=>V(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:e("owner:ownerSystemInquiryPage.allCategories")}),(0,c.jsx)("option",{value:"technical",children:e("owner:ownerSystemInquiryPage.technical")}),(0,c.jsx)("option",{value:"billing",children:e("owner:ownerSystemInquiryPage.billing")}),(0,c.jsx)("option",{value:"feature-request",children:e("owner:ownerSystemInquiryPage.featureRequest")}),(0,c.jsx)("option",{value:"bug-report",children:e("owner:ownerSystemInquiryPage.bugReport")}),(0,c.jsx)("option",{value:"general",children:e("owner:ownerSystemInquiryPage.general")})]}),(0,c.jsx)(f,{placeholder:"Search inquiries...",value:J,onChange:e=>W(e.target.value)})]}),(0,c.jsxs)(j,{children:[ge.map(r=>(0,c.jsxs)(v,{onClick:()=>{oe(r),se(r.status),te(!0),window.dispatchEvent(new Event("refreshBadgeCounts"))},children:[(0,c.jsxs)(b,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:r.ticketNumber}),(0,c.jsx)(S,{children:r.subject}),(0,c.jsxs)(I,{children:[r.customerName,r.restaurantName&&(0,c.jsx)(q,{children:r.restaurantName})]})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(E,{status:r.status,children:r.status}),(0,c.jsx)(B,{priority:r.priority,children:r.priority})]})]}),(0,c.jsx)(C,{children:r.description}),(0,c.jsxs)(P,{children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(_,{children:e("owner:ownerSystemInquiryPage.created")}),(0,c.jsx)($,{children:we(r.createdAt)})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(_,{children:e("owner:ownerSystemInquiryPage.category")}),(0,c.jsx)($,{style:{textTransform:"capitalize"},children:r.category.replace("-"," ")})]}),(0,c.jsxs)(z,{children:[(0,c.jsx)(_,{children:e("owner:ownerSystemInquiryPage.restaurant")}),(0,c.jsx)($,{children:je(r.restaurantId)||r.restaurantName||"-"})]}),ce[r.id]&&(0,c.jsx)(z,{children:(0,c.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",ce[r.id].total_comments,ce[r.id].unread_count>0&&(0,c.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[ce[r.id].unread_count," new"]})]})})]})]},r.id)),0===ge.length&&(0,c.jsxs)(o.pp,{children:[(0,c.jsx)("h3",{children:e("owner:ownerSystemInquiryPage.noInquiriesYet")}),(0,c.jsx)("p",{children:'Click "New Inquiry" to submit a system inquiry for your restaurants.'})]})]}),ee&&(0,c.jsxs)(l.aF,{isOpen:!0,onClose:()=>re(!1),title:"Create System Inquiry",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(y,{variant:"secondary",onClick:()=>re(!1),children:e("owner:ownerSystemInquiryPage.cancel")}),(0,c.jsx)(y,{variant:"primary",onClick:async()=>{if(!le.restaurantId||!le.subject.trim()||!le.description.trim())return;const e=M.find(e=>e.id===parseInt(le.restaurantId));try{const r={restaurantId:parseInt(le.restaurantId),restaurantName:(null===e||void 0===e?void 0:e.name)||"",subject:le.subject,description:le.description,status:"open",priority:le.priority,category:le.category},n=localStorage.getItem("auth_token");(await fetch("/api/support-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(r)})).ok&&(xe(),re(!1),de({restaurantId:"",subject:"",description:"",priority:"medium",category:"general"}))}catch(r){console.error("Error creating ticket:",r)}},disabled:!le.restaurantId||!le.subject.trim()||!le.description.trim(),children:"Submit Inquiry"})]}),children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Restaurant *"}),(0,c.jsxs)(R,{value:le.restaurantId,onChange:e=>de({...le,restaurantId:e.target.value}),required:!0,children:[(0,c.jsx)("option",{value:"",children:e("owner:ownerSystemInquiryPage.selectRestaurant")}),M.map(e=>(0,c.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Subject *"}),(0,c.jsx)(O,{type:"text",value:le.subject,onChange:e=>de({...le,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:"Description *"}),(0,c.jsx)(L,{value:le.description,onChange:e=>de({...le,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,c.jsxs)(N,{children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.priority")}),(0,c.jsxs)(R,{value:le.priority,onChange:e=>de({...le,priority:e.target.value}),children:[(0,c.jsx)("option",{value:"low",children:e("owner:ownerSystemInquiryPage.low")}),(0,c.jsx)("option",{value:"medium",children:e("owner:ownerSystemInquiryPage.medium")}),(0,c.jsx)("option",{value:"high",children:e("owner:ownerSystemInquiryPage.high")}),(0,c.jsx)("option",{value:"urgent",children:e("owner:ownerSystemInquiryPage.urgent")})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.category")}),(0,c.jsxs)(R,{value:le.category,onChange:e=>de({...le,category:e.target.value}),children:[(0,c.jsx)("option",{value:"general",children:e("owner:ownerSystemInquiryPage.general")}),(0,c.jsx)("option",{value:"technical",children:e("owner:ownerSystemInquiryPage.technical")}),(0,c.jsx)("option",{value:"billing",children:e("owner:ownerSystemInquiryPage.billing")}),(0,c.jsx)("option",{value:"feature-request",children:e("owner:ownerSystemInquiryPage.featureRequest")}),(0,c.jsx)("option",{value:"bug-report",children:e("owner:ownerSystemInquiryPage.bugReport")})]})]})]})]}),ne&&ie&&(0,c.jsxs)(l.aF,{isOpen:!0,onClose:()=>te(!1),title:"Inquiry Details",footer:(0,c.jsx)(y,{variant:"secondary",onClick:()=>te(!1),children:e("owner:ownerSystemInquiryPage.close")}),children:[(0,c.jsxs)("div",{style:{display:"grid",gap:"20px"},children:[(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.ticketNumber")}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ie.ticketNumber})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.status")}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,c.jsxs)(R,{value:ae,onChange:e=>se(e.target.value),style:{flex:1},children:[(0,c.jsx)("option",{value:"open",children:e("owner:ownerSystemInquiryPage.open")}),(0,c.jsx)("option",{value:"in-progress",children:e("owner:ownerSystemInquiryPage.inProgress")}),(0,c.jsx)("option",{value:"resolved",children:e("owner:ownerSystemInquiryPage.resolved")}),(0,c.jsx)("option",{value:"closed",children:e("owner:ownerSystemInquiryPage.closed")})]}),ae!==ie.status&&(0,c.jsx)(y,{variant:"primary",onClick:async()=>{if(ie)try{const e=localStorage.getItem("auth_token");(await fetch(`/api/support-tickets/${ie.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:ae})})).ok&&(i(e=>e.map(e=>e.id===ie.id?{...e,status:ae}:e)),oe(e=>e?{...e,status:ae}:e))}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 20px"},children:e("owner:ownerSystemInquiryPage.save")})]})]})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.priority")}),(0,c.jsx)("div",{style:{padding:"8px 0"},children:(0,c.jsx)(B,{priority:ie.priority,children:ie.priority})})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.restaurant")}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151"},children:je(ie.restaurantId)||ie.restaurantName||"-"})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.subject")}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#0A2540",fontWeight:"600"},children:ie.subject})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.description")}),(0,c.jsx)("div",{style:{padding:"12px",backgroundColor:"#F8FAFC",borderRadius:"8px",border:"1px solid #E6EBF1",minHeight:"80px",whiteSpace:"pre-wrap",lineHeight:"1.5",color:"#374151"},children:ie.description})]}),(0,c.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.created")}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#6B7280"},children:we(ie.createdAt)})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)(D,{children:e("owner:ownerSystemInquiryPage.category")}),(0,c.jsx)("div",{style:{padding:"8px 0",color:"#374151",textTransform:"capitalize"},children:ie.category.replace("-"," ")})]})]})]}),(0,c.jsx)(s.A,{entityType:"support_ticket",entityId:ie.id,currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>pe(e=>{const r={...e};return r[ie.id]&&(r[ie.id]={...r[ie.id],unread_count:0}),r})})]})]})]})})}},4185:(e,r,n)=>{n.d(r,{A:()=>h});n(9950);var t=n(4752),i=n(4414);const o=t.Ay.div`
  margin-top: 12px;
`,a=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,l=t.Ay.a`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: #F8F9FA;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  text-decoration: none;
  color: #0A2540;
  font-size: 12px;
  transition: all 0.15s;
  max-width: 240px;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }
`,d=t.Ay.span`
  font-size: 14px;
  flex-shrink: 0;
`,c=t.Ay.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`,p=t.Ay.span`
  color: #9CA3AF;
  flex-shrink: 0;
  font-size: 11px;
`,u=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`,x=t.Ay.a`
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.15);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;const h=e=>{let{attachments:r}=e;if(!r||0===r.length)return null;const n=r.filter(e=>{var r;return null===(r=e.mimeType)||void 0===r?void 0:r.startsWith("image/")}),t=r.filter(e=>{var r;return!(null!==(r=e.mimeType)&&void 0!==r&&r.startsWith("image/"))});return(0,i.jsxs)(o,{children:[(0,i.jsxs)(a,{children:["Attachments (",r.length,")"]}),n.length>0&&(0,i.jsx)(u,{children:n.map((e,r)=>(0,i.jsx)(x,{href:e.url,target:"_blank",rel:"noopener noreferrer",title:e.originalName,children:(0,i.jsx)("img",{src:e.url,alt:e.originalName})},r))}),t.length>0&&(0,i.jsx)(s,{children:t.map((e,r)=>{return(0,i.jsxs)(l,{href:e.url,target:"_blank",rel:"noopener noreferrer",download:e.originalName,children:[(0,i.jsx)(d,{children:(t=e.mimeType,"application/pdf"===t?"\ud83d\udcc4":t.includes("word")||t.includes("document")?"\ud83d\udcdd":t.includes("sheet")||t.includes("excel")?"\ud83d\udcca":t.includes("zip")||t.includes("compressed")?"\ud83d\udce6":"\ud83d\udcce")}),(0,i.jsx)(c,{children:e.originalName}),(0,i.jsx)(p,{children:(n=e.size,n<1024?`${n}B`:n<1048576?`${(n/1024).toFixed(1)}KB`:`${(n/1048576).toFixed(1)}MB`)})]},r);var n,t})})]})}},4302:(e,r,n)=>{n.d(r,{A:()=>T});var t=n(9950),i=n(4752),o=n(4185),a=n(9061),s=n(5030),l=n(4414);const d=i.Ay.div`
  margin-top: 24px;
  border-top: 1px solid #E6EBF1;
  padding-top: 20px;
`,c=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`,p=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  max-height: 300px;
  overflow-y: auto;
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${e=>e.isInternal?"#FFFBEB":"#F8F9FA"};
  border-radius: 8px;
  ${e=>e.isInternal&&"\n    border: 1px dashed #F59E0B;\n  "}
`,x=i.Ay.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
`,h=i.Ay.div`
  flex: 1;
  min-width: 0;
`,g=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
`,y=i.Ay.span`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,m=i.Ay.span`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EEF2FF;
  color: #4338CA;
`,f=i.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: #FEF3C7;
  color: #92400E;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 3px;
`,w=i.Ay.span`
  font-size: 11px;
  color: #9CA3AF;
  margin-left: auto;
`,j=i.Ay.p`
  font-size: 13px;
  color: #374151;
  margin: 0;
  line-height: 1.5;
  white-space: pre-wrap;
`,v=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
  &:hover { color: #EF4444; }
`,b=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,F=i.Ay.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`,A=i.Ay.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 13px;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  &::placeholder { color: #9CA3AF; }
`,S=i.Ay.div`
  display: flex;
  gap: 4px;
`,I=i.Ay.button`
  padding: 10px 12px;
  background: #F3F4F6;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  line-height: 1;
  &:hover { background: #E5E7EB; color: #0A2540; }
`,k=i.Ay.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:hover { background: #5046E5; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`,E=i.Ay.p`
  font-size: 13px;
  color: #9CA3AF;
  text-align: center;
  padding: 12px 0;
`,B=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`,q=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: #F0F0FF;
  border-radius: 4px;
  font-size: 11px;
  color: #635BFF;
`,C=i.Ay.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  &:hover { color: #EF4444; }
`,P=i.Ay.span`
  font-size: 11px;
  color: #635BFF;
  padding: 3px 8px;
`,z=i.Ay.span`
  font-size: 11px;
  color: #EF4444;
  padding: 3px 8px;
`,_=i.Ay.input`
  display: none;
`,$=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,N=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #6B7280;
  cursor: pointer;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    accent-color: #D97706;
    cursor: pointer;
  }
`,T=e=>{let{entityType:r,entityId:n,currentUserId:i,onMarkRead:T}=e;const{t:D}=(0,s.Bd)("common"),[O,R]=(0,t.useState)([]),[L,M]=(0,t.useState)(""),[U,J]=(0,t.useState)(!1),[W,Y]=(0,t.useState)([]),[K,H]=(0,t.useState)(!1),[G,Q]=(0,t.useState)(""),[V,X]=(0,t.useState)(!1),Z=(0,t.useRef)(null),ee=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/comments/${r}/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&R(e.data)}}catch(e){console.error("Error fetching comments:",e)}};(0,t.useEffect)(()=>{n&&(ee(),(async()=>{try{const e=localStorage.getItem("auth_token");await fetch("/api/comments/mark-read",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n})}),T&&T(),window.dispatchEvent(new Event("refreshBadgeCounts"))}catch(e){console.error("Error marking comments as read:",e)}})())},[r,n]);const re=async()=>{if(K)return;const e=L.trim(),t=W.length>0;if((e||t)&&!V){X(!0);try{const e=localStorage.getItem("auth_token");(await fetch("/api/comments",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({entity_type:r,entity_id:n,content:L.trim(),attachments:t?W:void 0,is_internal:U||void 0})})).ok&&(M(""),Y([]),J(!1),ee())}catch(i){console.error("Error adding comment:",i)}finally{X(!1)}}},ne=e=>{const r=new Date(e),n=(new Date).getTime()-r.getTime(),t=Math.floor(n/6e4);if(t<1)return"Just now";if(t<60)return`${t}m ago`;const i=Math.floor(t/60);if(i<24)return`${i}h ago`;const o=Math.floor(i/24);return o<7?`${o}d ago`:r.toLocaleDateString("en-US",{month:"short",day:"numeric"})};return(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:["Comments (",O.length,")"]}),O.length>0?(0,l.jsx)(p,{children:O.map(e=>{var r,n,s;return(0,l.jsxs)(u,{isInternal:e.is_internal,children:[(0,l.jsx)(x,{children:((null===(r=e.author)||void 0===r?void 0:r.full_name)||e.author_name||"?")[0].toUpperCase()}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(g,{children:[(0,l.jsx)(y,{children:(null===(n=e.author)||void 0===n?void 0:n.full_name)||e.author_name}),(0,l.jsx)(m,{children:(null===(s=e.author)||void 0===s?void 0:s.role)||e.author_role}),e.is_internal&&(0,l.jsx)(f,{children:"Internal"}),(0,l.jsx)(w,{children:ne(e.createdAt)}),i&&e.author_id===Number(i)&&(0,l.jsx)(v,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");(await fetch(`/api/comments/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}})).ok&&ee()}catch(r){console.error("Error deleting comment:",r)}})(e.id),children:"Delete"})]}),e.content&&(0,l.jsx)(j,{children:e.content.split("\n").map((e,r)=>(0,l.jsxs)(t.Fragment,{children:[r>0&&(0,l.jsx)("br",{}),(0,a.c)(e)]},r))}),e.attachments&&e.attachments.length>0&&(0,l.jsx)(o.A,{attachments:e.attachments})]})]},e.id)})}):(0,l.jsx)(E,{children:"No comments yet"}),(0,l.jsxs)(b,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{value:L,onChange:e=>M(e.target.value),onKeyDown:e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),re())},placeholder:U?"Write an internal note... (visible only to your role group)":"Add a comment... (Enter to send, Shift+Enter for newline)",rows:1}),(0,l.jsxs)(S,{children:[(0,l.jsx)(I,{onClick:()=>{var e;return null===(e=Z.current)||void 0===e?void 0:e.click()},title:"Attach file",children:"\ud83d\udcce"}),(0,l.jsx)(k,{onClick:re,disabled:!L.trim()&&0===W.length||V||K,children:"Send"})]})]}),(0,l.jsx)($,{children:(0,l.jsxs)(N,{children:[(0,l.jsx)("input",{type:"checkbox",checked:U,onChange:e=>J(e.target.checked)}),"Internal note (visible only to your role group)"]})}),(W.length>0||K||G)&&(0,l.jsxs)(B,{children:[K&&(0,l.jsx)(P,{children:"Uploading..."}),G&&(0,l.jsx)(z,{children:G}),W.map((e,r)=>(0,l.jsxs)(q,{children:[e.originalName.length>20?e.originalName.slice(0,17)+"...":e.originalName,(0,l.jsx)(C,{onClick:()=>(e=>{const r=W[e],n=localStorage.getItem("auth_token");fetch("/api/upload/file",{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({url:r.url})}).catch(()=>{}),Y(r=>r.filter((r,n)=>n!==e))})(r),children:"\u2715"})]},e.url))]})]}),(0,l.jsx)(_,{ref:Z,type:"file",accept:".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip",multiple:!0,onChange:async e=>{const r=e.target.files;if(!r||0===r.length)return;const n=5-W.length,t=Array.from(r).slice(0,n);if(e.target.value="",0!==t.length){H(!0),Q("");try{const e=new FormData;t.forEach(r=>e.append("files",r));const r=localStorage.getItem("auth_token"),n=await fetch("/api/upload/files",{method:"POST",headers:{Authorization:`Bearer ${r}`},body:e}),i=await n.json();i.success&&i.data?Y(e=>[...e,...i.data]):Q(i.message||"Upload failed")}catch(i){console.error("File upload error:",i),Q("File upload failed. Please try again.")}finally{H(!1)}}}})]})}},9061:(e,r,n)=>{n.d(r,{c:()=>a});var t=n(9950),i=n(4414);const o=/(https?:\/\/[^\s<]+)/g;function a(e){const r=e.split(o);return 1===r.length?e:r.map((e,r)=>o.test(e)?(0,i.jsx)("a",{href:e,target:"_blank",rel:"noopener noreferrer",style:{color:"#635BFF",wordBreak:"break-all"},children:e},r):(0,i.jsx)(t.Fragment,{children:e},r))}}}]);