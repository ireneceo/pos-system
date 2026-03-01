"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6929],{2597:(e,n,r)=>{r.d(n,{Ex:()=>l,oz:()=>c,tU:()=>d});r(9950);var t=r(4752),o=r(4414);const i=t.Ay.div`
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
`,s=t.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
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
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,a=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:n,className:r,style:t}=e;return(0,o.jsx)(i,{className:r,style:t,children:n})},c=e=>{let{active:n,onClick:r,children:t,className:i}=e;return(0,o.jsx)(s,{active:n,onClick:r,className:i,children:t})},l=e=>{let{count:n,variant:r="default",showZero:t=!1}=e;return 0!==n||t?(0,o.jsx)(a,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>i});var t=r(9950),o=r(4492);function i(e){const[n,r]=(0,o.ok)(),i=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[s,a]=(0,t.useState)(i());return[s,(0,t.useCallback)(e=>{a(e),r({tab:e})},[r])]}},3705:(e,n,r)=>{r.d(n,{cc:()=>o});var t=r(4752);const o=t.Ay.button`
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
`},6929:(e,n,r)=>{r.r(n),r.d(n,{default:()=>I});var t=r(9950),o=r(4752),i=r(7960),s=r(3705),a=r(7617),d=r(2597),c=r(2653),l=r(4414);const p=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=o.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,b=o.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,m=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`,f=o.Ay.div`
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
`,j=o.Ay.div`
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
`,y=o.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${e=>{switch(e.level){case"high":return"background: #FEE2E2; color: #991B1B;";case"medium":return"background: #FEF3C7; color: #92400E;";case"low":return"background: #DCFCE7; color: #166534;";default:return"background: #F3F4F6; color: #374151;"}}}
`,v=o.Ay.div`
  margin-bottom: 16px;
`,F=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`,A=o.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,k=o.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,C=o.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${e=>{switch(e.status){case"Approved":return"background: #DCFCE7; color: #166534;";case"In Progress":return"background: #DBEAFE; color: #1E40AF;";case"Under Review":return"background: #FEF3C7; color: #92400E;";case"Pending":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,E=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`,B=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`,z=o.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          border-color: #635BFF;\n          color: white;\n          &:hover { background: #5A51E6; border-color: #5A51E6; }\n        ";case"success":return"\n          background: #059669;\n          border-color: #059669;\n          color: white;\n          &:hover { background: #047857; border-color: #047857; }\n        ";default:return"\n          background: white;\n          border-color: #E6EBF1;\n          color: #374151;\n          &:hover { background: #F9FAFB; }\n        "}}}
`,S=o.Ay.div`
  padding: 20px 0;
`,q=o.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`,$=o.Ay.li`
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
`,R=o.Ay.div`
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
`,P=o.Ay.select`
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
`,I=()=>{const[e,n]=(0,c.M)("requests"),[r,o]=(0,t.useState)(""),[I,T]=(0,t.useState)("all"),[L,N]=(0,t.useState)([]),[M,O]=(0,t.useState)(!1),[U,_]=(0,t.useState)(null),[H,Y]=(0,t.useState)("approve");(0,t.useEffect)(()=>{(async()=>{try{N([])}catch(e){console.error("Error fetching support requests:",e)}})()},[]);const W=L.filter(e=>{const n=e.title.toLowerCase().includes(r.toLowerCase())||e.storeName.toLowerCase().includes(r.toLowerCase())||e.owner.toLowerCase().includes(r.toLowerCase()),t="all"===I||e.priority===I;return n&&t}),Q={totalRequests:L.length,urgentRequests:L.filter(e=>"high"===e.priority).length,inProgress:L.filter(e=>"In Progress"===e.status).length,completed:L.filter(e=>"Approved"===e.status).length,pending:L.filter(e=>"Pending"===e.status).length},V=e=>{switch(e){case"high":return"Urgent";case"medium":return"Normal";case"low":return"Low";default:return e}},Z=(e,n)=>{_(e),Y(n),O(!0)},G=()=>{switch(H){case"approve":return"Approved";case"reject":return"Rejected";case"process":return"Start Process";default:return"Process"}};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(p,{children:[(0,l.jsxs)(x,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(h,{children:"Tenant Support"}),(0,l.jsx)(g,{children:"Foodcourt tenant request and support management"})]}),(0,l.jsx)(s.cc,{variant:"outline",children:"Export Support Report"})]}),(0,l.jsxs)(u,{children:[(0,l.jsxs)(d.tU,{children:[(0,l.jsx)(d.oz,{active:"requests"===e,onClick:()=>n("requests"),children:"Support Request Management"}),(0,l.jsx)(d.oz,{active:"communication"===e,onClick:()=>n("communication"),children:"Communication Management"}),(0,l.jsx)(d.oz,{active:"announcements"===e,onClick:()=>n("announcements"),children:"Announcements"})]}),"requests"===e&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(i.MD,{children:[(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:Q.totalRequests}),(0,l.jsx)(i.v0,{children:"Total Requests"}),(0,l.jsx)(i.E_,{trend:"up",children:"All support cases"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:Q.urgentRequests}),(0,l.jsx)(i.v0,{children:"Urgent Requests"}),(0,l.jsx)(i.E_,{trend:Q.urgentRequests>0?"down":"up",children:"High priority"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:Q.pending}),(0,l.jsx)(i.v0,{children:"Pending"}),(0,l.jsx)(i.E_,{trend:Q.pending>0?"down":"up",children:"Awaiting action"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:Q.inProgress}),(0,l.jsx)(i.v0,{children:"In Progress"}),(0,l.jsx)(i.E_,{trend:"up",children:"Being processed"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:Q.completed}),(0,l.jsx)(i.v0,{children:"Completed"}),(0,l.jsx)(i.E_,{trend:"up",children:"Successfully resolved"})]})]}),(0,l.jsxs)(R,{children:[(0,l.jsx)(D,{type:"text",placeholder:"Search by request title, business name, owner name...",value:r,onChange:e=>o(e.target.value)}),(0,l.jsxs)(P,{value:I,onChange:e=>T(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Priorities"}),(0,l.jsx)("option",{value:"high",children:"Urgent"}),(0,l.jsx)("option",{value:"medium",children:"Normal"}),(0,l.jsx)("option",{value:"low",children:"Low"})]})]}),(0,l.jsx)(b,{children:(0,l.jsx)(m,{children:W.map(e=>(0,l.jsxs)(f,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:e.title}),(0,l.jsx)(y,{level:e.priority,children:V(e.priority)})]}),(0,l.jsxs)(v,{children:[(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Business Name"}),(0,l.jsx)(k,{children:e.storeName})]}),(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Owner"}),(0,l.jsx)(k,{children:e.owner})]}),(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Contact"}),(0,l.jsx)(k,{children:e.phone||"-"})]}),(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Category"}),(0,l.jsx)(k,{children:e.category})]}),(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Request Date"}),(0,l.jsx)(k,{children:e.requestDate})]}),(0,l.jsxs)(F,{children:[(0,l.jsx)(A,{children:"Status"}),(0,l.jsx)(k,{children:(0,l.jsx)(C,{status:e.status,children:e.status})})]})]}),(0,l.jsx)(E,{children:e.description}),(0,l.jsxs)(B,{children:["Pending"===e.status&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(z,{variant:"success",onClick:()=>Z(e,"approve"),children:"Approve"}),(0,l.jsx)(z,{variant:"primary",onClick:()=>Z(e,"process"),children:"Start Process"})]}),"Under Review"===e.status&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(z,{variant:"success",onClick:()=>Z(e,"approve"),children:"Approve"}),(0,l.jsx)(z,{variant:"primary",onClick:()=>Z(e,"reject"),children:"Reject"})]}),(0,l.jsx)(z,{variant:"secondary",children:"View Details"})]})]},e.id))})})]}),"communication"===e&&(0,l.jsxs)(b,{children:[(0,l.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Tenant Communication Management"}),(0,l.jsxs)(S,{children:[(0,l.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Manages various channels for smooth communication with tenants and collects feedback."}),(0,l.jsxs)(q,{children:[(0,l.jsx)($,{children:"Regular meeting schedule management and attendance monitoring"}),(0,l.jsx)($,{children:"Tenant feedback collection and analysis system"}),(0,l.jsx)($,{children:"Suggestion reception and processing status tracking"}),(0,l.jsx)($,{children:"Quarterly satisfaction surveys and result analysis"}),(0,l.jsx)($,{children:"Communication channel effectiveness evaluation"}),(0,l.jsx)($,{children:"Conflict resolution and mediation process management"})]})]})]}),"announcements"===e&&(0,l.jsxs)(b,{children:[(0,l.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Announcement Management"}),(0,l.jsxs)(S,{children:[(0,l.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Efficiently manages and delivers announcements to all foodcourt tenants."}),(0,l.jsxs)(q,{children:[(0,l.jsx)($,{children:"Immediate notification of operational regulations and policy changes"}),(0,l.jsx)($,{children:"Advance notice of facility inspections and regular maintenance schedules"}),(0,l.jsx)($,{children:"Foodcourt event and promotion participation guidance"}),(0,l.jsx)($,{children:"Emergency situation and contingency plan notification system"}),(0,l.jsx)($,{children:"Industry trends and market information sharing"}),(0,l.jsx)($,{children:"Training and workshop schedule guidance"})]})]})]}),(0,l.jsx)(a.A,{isOpen:M,title:"Request Process",message:`Are you sure you want to ${G().toLowerCase()} the request '${null===U||void 0===U?void 0:U.title}'?`,onConfirm:()=>{if(U&&H){let e;switch(H){case"approve":e="Approved";break;case"reject":e="Rejected";break;case"process":e="In Progress"}N(n=>n.map(n=>n.id===U.id?{...n,status:e}:n))}O(!1)},onCancel:()=>O(!1),confirmText:G(),cancelText:"Cancel",type:"reject"===H?"danger":"warning"})]})]})})}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var t=r(4752),o=r(9610),i=r(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,a=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,l=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:t,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:b="warning"}=e;return n?(0,i.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(a,{children:[(0,i.jsx)(d,{children:r}),(0,i.jsx)(c,{children:t})]}),(0,i.jsxs)(l,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,i.jsx)(p,{variant:"primary",type:b,onClick:x,children:h})]})]})}):null}}}]);