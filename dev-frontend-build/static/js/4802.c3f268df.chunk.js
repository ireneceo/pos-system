"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4802],{4802:(e,r,n)=>{n.r(r),n.d(r,{default:()=>ee});var i=n(9950),o=n(4752),t=n(2853),a=n(8409),s=n(1367),d=n(4302),l=n(7455),p=n(4185),c=n(5030),u=n(9955),x=n(4414);const h=o.Ay.div`
  min-height: 100vh;
`,g=o.Ay.div`
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
`,w=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
`,j=o.Ay.div`
  display: flex;
  gap: 12px;
`,m=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n    &:disabled {\n      background: #9CA3AF;\n      cursor: not-allowed;\n      transform: none;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; color: #0A2540; border-color: #CBD5E1; }\n  "}
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); }
`,v=o.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,F=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,I=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`,A=(o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,o.Ay.label`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`),q=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus { outline: none; border-color: #635BFF; }
`,O=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,k=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); }
`,P=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`,E=o.Ay.div`
  flex: 1;
  min-width: 0;
`,C=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`,B=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
  word-break: break-word;
  overflow-wrap: break-word;
`,z=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,S=o.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: #F3E8FF;
  color: #7C3AED;
  margin-left: 8px;
`,$=o.Ay.div`
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
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  word-break: break-word;
  overflow-wrap: break-word;
`,R=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`,T=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,L=o.Ay.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Y=o.Ay.span`
  color: #374151;
`,J=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`,M=o.Ay.div`
  margin-bottom: 20px;
`,U=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`,W=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,G=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,H=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1); }
`,K=o.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,Q=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,V=o.Ay.span`
  color: #6B7C93;
  font-weight: 500;
`,X=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: right;
  max-width: 60%;
`,Z=o.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`,ee=()=>{const{t:e}=(0,c.Bd)("owner"),{user:r}=(0,s.As)(),[n,o]=(0,i.useState)([]),[ee,re]=(0,i.useState)([]),[ne,ie]=(0,i.useState)(""),[oe,te]=(0,i.useState)("all"),[ae,se]=(0,i.useState)("all"),[de,le]=(0,i.useState)("all"),[pe,ce]=(0,i.useState)("all"),[ue,xe]=(0,i.useState)(!1),[he,ge]=(0,i.useState)(null),[we,ye]=(0,i.useState)("open"),[je,me]=(0,i.useState)({}),[fe,be]=(0,i.useState)({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),[ve,Fe]=(0,i.useState)([]);(0,i.useEffect)(()=>{r&&Ie()},[r]),(0,i.useEffect)(()=>{if(ee.length>0){Ae();const e=setInterval(Ae,1e4);return()=>clearInterval(e)}},[ee]);const Ie=async()=>{try{const e=(0,u.c4)(),r=await fetch("/api/owner/restaurants",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;re(n.map(e=>({id:e.id,name:e.name})))}}catch(e){console.error("Error fetching owned restaurants:",e)}},Ae=async()=>{try{const e=(0,u.c4)(),n=await fetch(`/api/operation-tickets?userId=${null===r||void 0===r?void 0:r.id}&userRole=Restaurant Owner`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json(),r=Array.isArray(e)?e:[];o(r),qe(r)}}catch(e){console.error("Error fetching operation tickets:",e)}},qe=async e=>{if(0!==e.length)try{const r=(0,u.c4)(),n=e.map(e=>e.id).join(","),i=await fetch(`/api/comments/unread-counts?entity_type=operation_ticket&entity_ids=${n}`,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();if(e.success){const r={};e.data.forEach(e=>{r[e.entity_id]={total_comments:Number(e.total_comments),unread_count:Number(e.unread_count)}}),me(r)}}}catch(r){console.error("Error fetching unread counts:",r)}},Oe=n.filter(e=>{const r=e.subject.toLowerCase().includes(ne.toLowerCase())||e.ticketNumber.toLowerCase().includes(ne.toLowerCase()),n="all"===oe||e.status===oe,i="all"===ae||e.priority===ae,o="all"===de||e.category===de,t="all"===pe||String(e.restaurantId)===pe;return r&&n&&i&&o&&t}),ke=n.filter(e=>"open"===e.status).length,Pe=n.filter(e=>"in-progress"===e.status).length,Ee=n.filter(e=>"resolved"===e.status).length,Ce=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(y,{children:e("owner:ownerOperationInquiryPage.operationInquiry")}),(0,x.jsx)(j,{children:(0,x.jsx)(m,{variant:"primary",onClick:()=>xe(!0),children:e("owner:ownerOperationInquiryPage.newInquiry")})})]}),(0,x.jsxs)(w,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(b,{color:"#635BFF",children:[(0,x.jsx)(v,{children:n.length}),(0,x.jsx)(F,{children:e("owner:ownerOperationInquiryPage.totalInquiries")})]}),(0,x.jsxs)(b,{color:"#F59E0B",children:[(0,x.jsx)(v,{children:ke}),(0,x.jsx)(F,{children:e("owner:ownerOperationInquiryPage.open")})]}),(0,x.jsxs)(b,{color:"#3B82F6",children:[(0,x.jsx)(v,{children:Pe}),(0,x.jsx)(F,{children:e("owner:ownerOperationInquiryPage.inProgress")})]}),(0,x.jsxs)(b,{color:"#10B981",children:[(0,x.jsx)(v,{children:Ee}),(0,x.jsx)(F,{children:e("owner:ownerOperationInquiryPage.resolved")})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(q,{value:pe,onChange:e=>ce(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allRestaurants")}),ee.map(e=>(0,x.jsx)("option",{value:String(e.id),children:e.name},e.id))]}),(0,x.jsxs)(q,{value:oe,onChange:e=>te(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allStatus")}),(0,x.jsx)("option",{value:"open",children:e("owner:ownerOperationInquiryPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("owner:ownerOperationInquiryPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("owner:ownerOperationInquiryPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("owner:ownerOperationInquiryPage.closed")})]}),(0,x.jsxs)(q,{value:ae,onChange:e=>se(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allPriority")}),(0,x.jsx)("option",{value:"urgent",children:e("owner:ownerOperationInquiryPage.urgent")}),(0,x.jsx)("option",{value:"high",children:e("owner:ownerOperationInquiryPage.high")}),(0,x.jsx)("option",{value:"medium",children:e("owner:ownerOperationInquiryPage.medium")}),(0,x.jsx)("option",{value:"low",children:e("owner:ownerOperationInquiryPage.low")})]}),(0,x.jsxs)(q,{value:de,onChange:e=>le(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("owner:ownerOperationInquiryPage.allCategories")}),(0,x.jsx)("option",{value:"schedule",children:e("owner:ownerOperationInquiryPage.schedule")}),(0,x.jsx)("option",{value:"inventory",children:e("owner:ownerOperationInquiryPage.inventory")}),(0,x.jsx)("option",{value:"staff",children:e("owner:ownerOperationInquiryPage.staff")}),(0,x.jsx)("option",{value:"menu",children:e("owner:ownerOperationInquiryPage.menu")}),(0,x.jsx)("option",{value:"customer",children:e("owner:ownerOperationInquiryPage.customer")}),(0,x.jsx)("option",{value:"other",children:e("owner:ownerOperationInquiryPage.other")})]}),(0,x.jsx)(A,{placeholder:"Search inquiries...",value:ne,onChange:e=>ie(e.target.value)})]}),(0,x.jsxs)(O,{children:[Oe.map(r=>(0,x.jsxs)(k,{onClick:()=>(e=>{ge(e),ye(e.status),window.dispatchEvent(new Event("refreshBadgeCounts"))})(r),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(C,{children:r.ticketNumber}),(0,x.jsx)(B,{children:r.subject}),(0,x.jsxs)(z,{children:[(0,x.jsxs)("span",{children:["From: ",r.requesterName," (",r.requesterRole,")"]}),(0,x.jsx)(S,{children:r.restaurantName})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(N,{status:r.status,children:r.status}),(0,x.jsx)(_,{priority:r.priority,children:r.priority})]})]}),(0,x.jsx)(D,{children:r.description}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{children:e("owner:ownerOperationInquiryPage.created")}),(0,x.jsx)(Y,{children:Ce(r.createdAt)})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{children:e("owner:ownerOperationInquiryPage.category")}),(0,x.jsx)(Y,{style:{textTransform:"capitalize"},children:r.category})]}),je[String(r.id)]&&(0,x.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:"4px"},children:["Comments ",je[String(r.id)].total_comments,je[String(r.id)].unread_count>0&&(0,x.jsxs)("span",{style:{background:"#EF4444",color:"white",borderRadius:"10px",padding:"1px 7px",fontSize:"11px",fontWeight:600},children:[je[String(r.id)].unread_count," new"]})]})]})]},r.id)),0===Oe.length&&(0,x.jsxs)(t.pp,{children:[(0,x.jsx)("h3",{children:e("owner:ownerOperationInquiryPage.noOperationInquiries")}),(0,x.jsx)("p",{children:"Operation inquiries from your restaurants will appear here. You can also create new inquiries."})]})]}),ue&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>xe(!1),title:"Create Operation Inquiry",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>xe(!1),children:e("owner:ownerOperationInquiryPage.cancel")}),(0,x.jsx)(m,{variant:"primary",onClick:async()=>{if(!fe.restaurantId||!fe.subject.trim()||!fe.description.trim())return;const e=ee.find(e=>e.id===parseInt(fe.restaurantId));try{const n=(0,u.c4)(),i={restaurantId:parseInt(fe.restaurantId),restaurantName:(null===e||void 0===e?void 0:e.name)||"",subject:fe.subject,description:fe.description,priority:fe.priority,category:fe.category,inquiryType:"owner",managerId:null===r||void 0===r?void 0:r.id,managerName:(null===r||void 0===r?void 0:r.name)||"Restaurant Owner",attachments:ve.length>0?ve:void 0};(await fetch("/api/operation-tickets",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify(i)})).ok&&(Ae(),xe(!1),be({restaurantId:"",subject:"",description:"",priority:"medium",category:"other"}),Fe([]))}catch(n){console.error("Error creating ticket:",n)}},disabled:!fe.restaurantId||!fe.subject.trim()||!fe.description.trim(),children:e("owner:ownerOperationInquiryPage.submitInquiry")})]}),children:[(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:"Restaurant *"}),(0,x.jsxs)(G,{value:fe.restaurantId,onChange:e=>be({...fe,restaurantId:e.target.value}),required:!0,children:[(0,x.jsx)("option",{value:"",children:e("owner:ownerOperationInquiryPage.selectRestaurant")}),ee.map(e=>(0,x.jsx)("option",{value:String(e.id),children:e.name},e.id))]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:"Subject *"}),(0,x.jsx)(W,{type:"text",value:fe.subject,onChange:e=>be({...fe,subject:e.target.value}),placeholder:"Brief description of your inquiry",required:!0})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:"Description *"}),(0,x.jsx)(H,{value:fe.description,onChange:e=>be({...fe,description:e.target.value}),placeholder:"Detailed description...",rows:4,required:!0})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:e("owner:ownerOperationInquiryPage.attachments")}),(0,x.jsx)(l.A,{files:ve,onChange:Fe,maxFiles:5})]}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:e("owner:ownerOperationInquiryPage.priority")}),(0,x.jsxs)(G,{value:fe.priority,onChange:e=>be({...fe,priority:e.target.value}),children:[(0,x.jsx)("option",{value:"low",children:e("owner:ownerOperationInquiryPage.low")}),(0,x.jsx)("option",{value:"medium",children:e("owner:ownerOperationInquiryPage.medium")}),(0,x.jsx)("option",{value:"high",children:e("owner:ownerOperationInquiryPage.high")}),(0,x.jsx)("option",{value:"urgent",children:e("owner:ownerOperationInquiryPage.urgent")})]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:e("owner:ownerOperationInquiryPage.category")}),(0,x.jsxs)(G,{value:fe.category,onChange:e=>be({...fe,category:e.target.value}),children:[(0,x.jsx)("option",{value:"schedule",children:e("owner:ownerOperationInquiryPage.schedule")}),(0,x.jsx)("option",{value:"inventory",children:e("owner:ownerOperationInquiryPage.inventory")}),(0,x.jsx)("option",{value:"staff",children:e("owner:ownerOperationInquiryPage.staff")}),(0,x.jsx)("option",{value:"menu",children:e("owner:ownerOperationInquiryPage.menu")}),(0,x.jsx)("option",{value:"customer",children:e("owner:ownerOperationInquiryPage.customer")}),(0,x.jsx)("option",{value:"other",children:e("owner:ownerOperationInquiryPage.other")})]})]})]})]}),he&&(0,x.jsxs)(a.aF,{isOpen:!0,onClose:()=>ge(null),title:he.ticketNumber,size:"large",footer:(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(m,{variant:"secondary",onClick:()=>ge(null),children:e("owner:ownerOperationInquiryPage.close")})}),children:[(0,x.jsxs)(K,{children:[(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"Subject:"}),(0,x.jsx)(X,{children:he.subject})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"Restaurant:"}),(0,x.jsx)(X,{children:he.restaurantName})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"From:"}),(0,x.jsxs)(X,{children:[he.requesterName," (",he.requesterRole,")"]})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"Priority:"}),(0,x.jsx)(X,{children:(0,x.jsx)(_,{priority:he.priority,children:he.priority})})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"Category:"}),(0,x.jsx)(X,{style:{textTransform:"capitalize"},children:he.category})]}),(0,x.jsxs)(Q,{children:[(0,x.jsx)(V,{children:"Created:"}),(0,x.jsx)(X,{children:Ce(he.createdAt)})]})]}),(0,x.jsx)(U,{children:e("owner:ownerOperationInquiryPage.description")}),(0,x.jsx)(Z,{children:he.description}),(null===he||void 0===he?void 0:he.attachments)&&he.attachments.length>0&&(0,x.jsx)(p.A,{attachments:he.attachments}),(0,x.jsxs)(M,{children:[(0,x.jsx)(U,{children:e("owner:ownerOperationInquiryPage.status")}),(0,x.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,x.jsxs)(G,{value:we,onChange:e=>ye(e.target.value),style:{flex:1},children:[(0,x.jsx)("option",{value:"open",children:e("owner:ownerOperationInquiryPage.open")}),(0,x.jsx)("option",{value:"in-progress",children:e("owner:ownerOperationInquiryPage.inProgress")}),(0,x.jsx)("option",{value:"resolved",children:e("owner:ownerOperationInquiryPage.resolved")}),(0,x.jsx)("option",{value:"closed",children:e("owner:ownerOperationInquiryPage.closed")})]}),we!==he.status&&(0,x.jsx)(m,{variant:"primary",onClick:async()=>{if(he&&we!==he.status)try{const e=(0,u.c4)(),r=await fetch(`/api/operation-tickets/${he.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:we})});if(r.ok){const e=await r.json(),n=e.data||e;o(e=>e.map(e=>e.id===he.id?{...e,...n}:e)),ge(e=>e?{...e,...n}:null)}}catch(e){console.error("Error updating status:",e)}},style:{padding:"10px 16px",fontSize:"13px"},children:"Save"})]})]}),(0,x.jsx)(d.A,{entityType:"operation_ticket",entityId:String(he.id),currentUserId:null===r||void 0===r?void 0:r.id,onMarkRead:()=>me(e=>{const r={...e},n=String(he.id);return r[n]&&(r[n]={...r[n],unread_count:0}),r})})]})]})]})})}}}]);