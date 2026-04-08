"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6929],{2653:(e,n,r)=>{r.d(n,{M:()=>i});var t=r(9950),o=r(4492);function i(e){const[n,r]=(0,o.ok)(),i=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[s,a]=(0,t.useState)(i());return[s,(0,t.useCallback)(e=>{a(e),r({tab:e})},[r])]}},3705:(e,n,r)=>{r.d(n,{cc:()=>o});var t=r(4752);const o=t.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`},6929:(e,n,r)=>{r.r(n),r.d(n,{default:()=>T});var t=r(9950),o=r(4752),i=r(8409),s=r(3705),a=r(7617),d=r(2597),c=r(2653),l=r(5030),p=r(4414);const x=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,u=o.Ay.div`
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
`,m=o.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,b=o.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,j=o.Ay.div`
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
`,y=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`,w=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
`,v=o.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${e=>{switch(e.level){case"high":return"background: #FEE2E2; color: #991B1B;";case"medium":return"background: #FEF3C7; color: #92400E;";case"low":return"background: #DCFCE7; color: #166534;";default:return"background: #F3F4F6; color: #374151;"}}}
`,F=o.Ay.div`
  margin-bottom: 16px;
`,A=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`,C=o.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,E=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,k=o.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${e=>{switch(e.status){case"Approved":return"background: #DCFCE7; color: #166534;";case"In Progress":return"background: #DBEAFE; color: #1E40AF;";case"Under Review":return"background: #FEF3C7; color: #92400E;";case"Pending":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,B=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,z=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`,S=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          border-color: #635BFF;\n          color: white;\n          &:hover { background: #5A51E6; border-color: #5A51E6; }\n        ";case"success":return"\n          background: #10B981;\n          border-color: #059669;\n          color: white;\n          &:hover { background: #047857; border-color: #047857; }\n        ";default:return"\n          background: white;\n          border-color: #E6EBF1;\n          color: #374151;\n          &:hover { background: #F9FAFB; }\n        "}}}
`,q=o.Ay.div`
  padding: 20px 0;
`,P=o.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,R=o.Ay.li`
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
`,$=o.Ay.div`
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
`,D=o.Ay.input`
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
`,I=o.Ay.select`
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
`,T=()=>{const{t:e}=(0,l.Bd)("common"),[n,r]=(0,c.M)("requests"),[o,T]=(0,t.useState)(""),[L,M]=(0,t.useState)("all"),[O,U]=(0,t.useState)([]),[N,_]=(0,t.useState)(!1),[H,Y]=(0,t.useState)(null),[W,Q]=(0,t.useState)("approve");(0,t.useEffect)(()=>{(async()=>{try{U([])}catch(e){console.error("Error fetching support requests:",e)}})()},[]);const V=O.filter(e=>{const n=e.title.toLowerCase().includes(o.toLowerCase())||e.storeName.toLowerCase().includes(o.toLowerCase())||e.owner.toLowerCase().includes(o.toLowerCase()),r="all"===L||e.priority===L;return n&&r}),G={totalRequests:O.length,urgentRequests:O.filter(e=>"high"===e.priority).length,inProgress:O.filter(e=>"In Progress"===e.status).length,completed:O.filter(e=>"Approved"===e.status).length,pending:O.filter(e=>"Pending"===e.status).length},J=e=>{switch(e){case"high":return"Urgent";case"medium":return"Normal";case"low":return"Low";default:return e}},K=(e,n)=>{Y(e),Q(n),_(!0)},X=()=>{switch(W){case"approve":return"Approved";case"reject":return"Rejected";case"process":return"Start Process";default:return"Process"}};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsxs)("div",{children:[(0,p.jsx)(g,{children:"Tenant Support"}),(0,p.jsx)(m,{children:"Foodcourt tenant request and support management"})]}),(0,p.jsx)(s.cc,{variant:"outline",children:"Export Support Report"})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(d.tU,{children:[(0,p.jsx)(d.oz,{active:"requests"===n,onClick:()=>r("requests"),children:"Support Request Management"}),(0,p.jsx)(d.oz,{active:"communication"===n,onClick:()=>r("communication"),children:"Communication Management"}),(0,p.jsx)(d.oz,{active:"announcements"===n,onClick:()=>r("announcements"),children:"Announcements"})]}),"requests"===n&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(i.MD,{children:[(0,p.jsxs)(i.hI,{children:[(0,p.jsx)(i.Os,{children:G.totalRequests}),(0,p.jsx)(i.v0,{children:"Total Requests"}),(0,p.jsx)(i.E_,{trend:"up",children:"All support cases"})]}),(0,p.jsxs)(i.hI,{children:[(0,p.jsx)(i.Os,{children:G.urgentRequests}),(0,p.jsx)(i.v0,{children:"Urgent Requests"}),(0,p.jsx)(i.E_,{trend:G.urgentRequests>0?"down":"up",children:"High priority"})]}),(0,p.jsxs)(i.hI,{children:[(0,p.jsx)(i.Os,{children:G.pending}),(0,p.jsx)(i.v0,{children:"Pending"}),(0,p.jsx)(i.E_,{trend:G.pending>0?"down":"up",children:"Awaiting action"})]}),(0,p.jsxs)(i.hI,{children:[(0,p.jsx)(i.Os,{children:G.inProgress}),(0,p.jsx)(i.v0,{children:"In Progress"}),(0,p.jsx)(i.E_,{trend:"up",children:"Being processed"})]}),(0,p.jsxs)(i.hI,{children:[(0,p.jsx)(i.Os,{children:G.completed}),(0,p.jsx)(i.v0,{children:"Completed"}),(0,p.jsx)(i.E_,{trend:"up",children:"Successfully resolved"})]})]}),(0,p.jsxs)($,{children:[(0,p.jsx)(D,{type:"text",placeholder:"Search by request title, business name, owner name...",value:o,onChange:e=>T(e.target.value)}),(0,p.jsxs)(I,{value:L,onChange:e=>M(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Priorities"}),(0,p.jsx)("option",{value:"high",children:"Urgent"}),(0,p.jsx)("option",{value:"medium",children:"Normal"}),(0,p.jsx)("option",{value:"low",children:"Low"})]})]}),(0,p.jsx)(b,{children:(0,p.jsx)(f,{children:V.map(e=>(0,p.jsxs)(j,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(w,{children:e.title}),(0,p.jsx)(v,{level:e.priority,children:J(e.priority)})]}),(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Business Name"}),(0,p.jsx)(E,{children:e.storeName})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Owner"}),(0,p.jsx)(E,{children:e.owner})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Contact"}),(0,p.jsx)(E,{children:e.phone||"-"})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Category"}),(0,p.jsx)(E,{children:e.category})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Request Date"}),(0,p.jsx)(E,{children:e.requestDate})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(C,{children:"Status"}),(0,p.jsx)(E,{children:(0,p.jsx)(k,{status:e.status,children:e.status})})]})]}),(0,p.jsx)(B,{children:e.description}),(0,p.jsxs)(z,{children:["Pending"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(S,{variant:"success",onClick:()=>K(e,"approve"),children:"Approve"}),(0,p.jsx)(S,{variant:"primary",onClick:()=>K(e,"process"),children:"Start Process"})]}),"Under Review"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(S,{variant:"success",onClick:()=>K(e,"approve"),children:"Approve"}),(0,p.jsx)(S,{variant:"primary",onClick:()=>K(e,"reject"),children:"Reject"})]}),(0,p.jsx)(S,{variant:"secondary",children:"View Details"})]})]},e.id))})})]}),"communication"===n&&(0,p.jsxs)(b,{children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Tenant Communication Management"}),(0,p.jsxs)(q,{children:[(0,p.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Manages various channels for smooth communication with tenants and collects feedback."}),(0,p.jsxs)(P,{children:[(0,p.jsx)(R,{children:"Regular meeting schedule management and attendance monitoring"}),(0,p.jsx)(R,{children:"Tenant feedback collection and analysis system"}),(0,p.jsx)(R,{children:"Suggestion reception and processing status tracking"}),(0,p.jsx)(R,{children:"Quarterly satisfaction surveys and result analysis"}),(0,p.jsx)(R,{children:"Communication channel effectiveness evaluation"}),(0,p.jsx)(R,{children:"Conflict resolution and mediation process management"})]})]})]}),"announcements"===n&&(0,p.jsxs)(b,{children:[(0,p.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Announcement Management"}),(0,p.jsxs)(q,{children:[(0,p.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Efficiently manages and delivers announcements to all foodcourt tenants."}),(0,p.jsxs)(P,{children:[(0,p.jsx)(R,{children:"Immediate notification of operational regulations and policy changes"}),(0,p.jsx)(R,{children:"Advance notice of facility inspections and regular maintenance schedules"}),(0,p.jsx)(R,{children:"Foodcourt event and promotion participation guidance"}),(0,p.jsx)(R,{children:"Emergency situation and contingency plan notification system"}),(0,p.jsx)(R,{children:"Industry trends and market information sharing"}),(0,p.jsx)(R,{children:"Training and workshop schedule guidance"})]})]})]}),(0,p.jsx)(a.A,{isOpen:N,title:"Request Process",message:`Are you sure you want to ${X().toLowerCase()} the request '${null===H||void 0===H?void 0:H.title}'?`,onConfirm:()=>{if(H&&W){let e;switch(W){case"approve":e="Approved";break;case"reject":e="Rejected";break;case"process":e="In Progress"}U(n=>n.map(n=>n.id===H.id?{...n,status:e}:n))}_(!1)},onCancel:()=>_(!1),confirmText:X(),cancelText:"Cancel",type:"reject"===W?"danger":"warning"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>u});r(9950);var t=r(7119),o=r(4752),i=r(9610),s=r(4414);const a=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,c=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=o.Ay.button`
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
`,u=e=>{let{isOpen:n,title:r,message:o,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:b="warning"}=e;return n?t.createPortal((0,s.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:r}),(0,s.jsx)(l,{children:o})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(x,{variant:"primary",type:b,onClick:u,children:g})]})]})}),document.body):null}}}]);