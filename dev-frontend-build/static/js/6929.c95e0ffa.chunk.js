"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6929],{3705:(e,n,r)=>{r.d(n,{cc:()=>t});var o=r(4752);const t=o.Ay.button`
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
`;o.Ay.select`
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
`,o.Ay.input`
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
`,o.Ay.div`
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
`},6929:(e,n,r)=>{r.r(n),r.d(n,{default:()=>T});var o=r(9950),t=r(4752),i=r(2674),s=r(3705),a=r(7617),d=r(4414);const c=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,l=t.Ay.div`
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
`,p=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=t.Ay.div`
  background: white;
  border-radius: 16px 16px 0 0;
  border: 1px solid #E6EBF1;
  border-bottom: none;
  margin-bottom: 0;
`,g=t.Ay.div`
  display: flex;
  gap: 0;
  padding: 0 24px;
`,m=t.Ay.button`
  padding: 16px 24px;
  border: none;
  background: ${e=>e.active?"#635BFF":"transparent"};
  color: ${e=>e.active?"white":"#6B7280"};
  border-radius: 12px 12px 0 0;
  font-weight: ${e=>e.active?"600":"500"};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  top: 1px;

  &:hover {
    background: ${e=>e.active?"#635BFF":"#F3F4F6"};
    color: ${e=>e.active?"white":"#374151"};
  }
`,b=t.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,f=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,j=t.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,y=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`,v=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
`,w=t.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${e=>{switch(e.level){case"high":return"background: #FEE2E2; color: #991B1B;";case"medium":return"background: #FEF3C7; color: #92400E;";case"low":return"background: #DCFCE7; color: #166534;";default:return"background: #F3F4F6; color: #374151;"}}}
`,F=t.Ay.div`
  margin-bottom: 16px;
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`,E=t.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,C=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,B=t.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${e=>{switch(e.status){case"Approved":return"background: #DCFCE7; color: #166534;";case"In Progress":return"background: #DBEAFE; color: #1E40AF;";case"Under Review":return"background: #FEF3C7; color: #92400E;";case"Pending":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,k=t.Ay.p`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,z=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`,S=t.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          border-color: #635BFF;\n          color: white;\n          &:hover { background: #5A51E6; border-color: #5A51E6; }\n        ";case"success":return"\n          background: #059669;\n          border-color: #059669;\n          color: white;\n          &:hover { background: #047857; border-color: #047857; }\n        ";default:return"\n          background: white;\n          border-color: #E6EBF1;\n          color: #374151;\n          &:hover { background: #F9FAFB; }\n        "}}}
`,q=t.Ay.div`
  padding: 20px 0;
`,$=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,R=t.Ay.li`
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: #6B7280;
  line-height: 1.6;

  &:before {
    content: '•';
    color: #7C3AED;
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 8px;
  }
`,P=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,D=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`,I=t.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,T=()=>{const[e,n]=(0,o.useState)("requests"),[r,t]=(0,o.useState)(""),[T,L]=(0,o.useState)("all"),[O,M]=(0,o.useState)([]),[N,U]=(0,o.useState)(!1),[_,H]=(0,o.useState)(null),[Y,W]=(0,o.useState)("approve");(0,o.useEffect)(()=>{(async()=>{try{M([])}catch(e){console.error("Error fetching support requests:",e)}})()},[]);const Q=O.filter(e=>{const n=e.title.toLowerCase().includes(r.toLowerCase())||e.storeName.toLowerCase().includes(r.toLowerCase())||e.owner.toLowerCase().includes(r.toLowerCase()),o="all"===T||e.priority===T;return n&&o}),V={totalRequests:O.length,urgentRequests:O.filter(e=>"high"===e.priority).length,inProgress:O.filter(e=>"In Progress"===e.status).length,completed:O.filter(e=>"Approved"===e.status).length,pending:O.filter(e=>"Pending"===e.status).length},G=e=>{switch(e){case"high":return"Urgent";case"medium":return"Normal";case"low":return"Low";default:return e}},J=(e,n)=>{H(e),W(n),U(!0)},K=()=>{switch(Y){case"approve":return"Approved";case"reject":return"Rejected";case"process":return"Start Process";default:return"Process"}};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(l,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(x,{children:"Tenant Support"}),(0,d.jsx)(h,{children:"Foodcourt tenant request and support management"})]}),(0,d.jsx)(s.cc,{variant:"outline",children:"Export Support Report"})]}),(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{active:"requests"===e,onClick:()=>n("requests"),children:"Support Request Management"}),(0,d.jsx)(m,{active:"communication"===e,onClick:()=>n("communication"),children:"Communication Management"}),(0,d.jsx)(m,{active:"announcements"===e,onClick:()=>n("announcements"),children:"Announcements"})]})}),"requests"===e&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(i.MD,{children:[(0,d.jsxs)(i.hI,{children:[(0,d.jsx)(i.Os,{children:V.totalRequests}),(0,d.jsx)(i.v0,{children:"Total Requests"}),(0,d.jsx)(i.E_,{trend:"up",children:"All support cases"})]}),(0,d.jsxs)(i.hI,{children:[(0,d.jsx)(i.Os,{children:V.urgentRequests}),(0,d.jsx)(i.v0,{children:"Urgent Requests"}),(0,d.jsx)(i.E_,{trend:V.urgentRequests>0?"down":"up",children:"High priority"})]}),(0,d.jsxs)(i.hI,{children:[(0,d.jsx)(i.Os,{children:V.pending}),(0,d.jsx)(i.v0,{children:"Pending"}),(0,d.jsx)(i.E_,{trend:V.pending>0?"down":"up",children:"Awaiting action"})]}),(0,d.jsxs)(i.hI,{children:[(0,d.jsx)(i.Os,{children:V.inProgress}),(0,d.jsx)(i.v0,{children:"In Progress"}),(0,d.jsx)(i.E_,{trend:"up",children:"Being processed"})]}),(0,d.jsxs)(i.hI,{children:[(0,d.jsx)(i.Os,{children:V.completed}),(0,d.jsx)(i.v0,{children:"Completed"}),(0,d.jsx)(i.E_,{trend:"up",children:"Successfully resolved"})]})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(D,{type:"text",placeholder:"Search by request title, business name, owner name...",value:r,onChange:e=>t(e.target.value)}),(0,d.jsxs)(I,{value:T,onChange:e=>L(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Priorities"}),(0,d.jsx)("option",{value:"high",children:"Urgent"}),(0,d.jsx)("option",{value:"medium",children:"Normal"}),(0,d.jsx)("option",{value:"low",children:"Low"})]})]}),(0,d.jsx)(b,{children:(0,d.jsx)(f,{children:Q.map(e=>(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(v,{children:e.title}),(0,d.jsx)(w,{level:e.priority,children:G(e.priority)})]}),(0,d.jsxs)(F,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Business Name"}),(0,d.jsx)(C,{children:e.storeName})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Owner"}),(0,d.jsx)(C,{children:e.owner})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Contact"}),(0,d.jsx)(C,{children:e.phone||"-"})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Category"}),(0,d.jsx)(C,{children:e.category})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Request Date"}),(0,d.jsx)(C,{children:e.requestDate})]}),(0,d.jsxs)(A,{children:[(0,d.jsx)(E,{children:"Status"}),(0,d.jsx)(C,{children:(0,d.jsx)(B,{status:e.status,children:e.status})})]})]}),(0,d.jsx)(k,{children:e.description}),(0,d.jsxs)(z,{children:["Pending"===e.status&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(S,{variant:"success",onClick:()=>J(e,"approve"),children:"Approve"}),(0,d.jsx)(S,{variant:"primary",onClick:()=>J(e,"process"),children:"Start Process"})]}),"Under Review"===e.status&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(S,{variant:"success",onClick:()=>J(e,"approve"),children:"Approve"}),(0,d.jsx)(S,{variant:"primary",onClick:()=>J(e,"reject"),children:"Reject"})]}),(0,d.jsx)(S,{variant:"secondary",children:"View Details"})]})]},e.id))})})]}),"communication"===e&&(0,d.jsxs)(b,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Tenant Communication Management"}),(0,d.jsxs)(q,{children:[(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Manages various channels for smooth communication with tenants and collects feedback."}),(0,d.jsxs)($,{children:[(0,d.jsx)(R,{children:"Regular meeting schedule management and attendance monitoring"}),(0,d.jsx)(R,{children:"Tenant feedback collection and analysis system"}),(0,d.jsx)(R,{children:"Suggestion reception and processing status tracking"}),(0,d.jsx)(R,{children:"Quarterly satisfaction surveys and result analysis"}),(0,d.jsx)(R,{children:"Communication channel effectiveness evaluation"}),(0,d.jsx)(R,{children:"Conflict resolution and mediation process management"})]})]})]}),"announcements"===e&&(0,d.jsxs)(b,{children:[(0,d.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Announcement Management"}),(0,d.jsxs)(q,{children:[(0,d.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Efficiently manages and delivers announcements to all foodcourt tenants."}),(0,d.jsxs)($,{children:[(0,d.jsx)(R,{children:"Immediate notification of operational regulations and policy changes"}),(0,d.jsx)(R,{children:"Advance notice of facility inspections and regular maintenance schedules"}),(0,d.jsx)(R,{children:"Foodcourt event and promotion participation guidance"}),(0,d.jsx)(R,{children:"Emergency situation and contingency plan notification system"}),(0,d.jsx)(R,{children:"Industry trends and market information sharing"}),(0,d.jsx)(R,{children:"Training and workshop schedule guidance"})]})]})]}),(0,d.jsx)(a.A,{isOpen:N,title:"Request Process",message:`Are you sure you want to ${K().toLowerCase()} the request '${null===_||void 0===_?void 0:_.title}'?`,onConfirm:()=>{if(_&&Y){let e;switch(Y){case"approve":e="Approved";break;case"reject":e="Rejected";break;case"process":e="In Progress"}M(n=>n.map(n=>n.id===_.id?{...n,status:e}:n))}U(!1)},onCancel:()=>U(!1),confirmText:K(),cancelText:"Cancel",type:"reject"===Y?"danger":"warning"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var o=r(4752),t=r(9610),i=r(4414);const s=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,a=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,l=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=o.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:o,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,i.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(a,{children:[(0,i.jsx)(d,{children:r}),(0,i.jsx)(c,{children:o})]}),(0,i.jsxs)(l,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,i.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);