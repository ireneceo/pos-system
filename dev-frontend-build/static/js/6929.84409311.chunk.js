"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6929],{3705:(e,r,n)=>{n.d(r,{cc:()=>t.$n});var o=n(8819),i=n(4752),t=n(8829);i.Ay.select`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${o.w.colors.surface};
  border-radius: ${o.w.borderRadius.md};
  border: 1px solid ${o.w.colors.borderLight};
  padding: ${o.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${o.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${o.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${o.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},6929:(e,r,n)=>{n.r(r),n.d(r,{default:()=>T});var o=n(8819),i=n(9950),t=n(4752),s=n(2674),a=n(3705),d=n(7617),c=n(4414);const l=t.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${o.w.colors.border};
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
`,x=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=t.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,g=t.Ay.div`
  background: white;
  border-radius: 16px 16px 0 0;
  border: 1px solid #E6EBF1;
  border-bottom: none;
  margin-bottom: 0;
`,m=t.Ay.div`
  display: flex;
  gap: 0;
  padding: 0 24px;
`,b=t.Ay.button`
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
`,w=t.Ay.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid ${o.w.colors.border};
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
`,A=t.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${e=>{switch(e.level){case"high":return"background: #FEE2E2; color: #991B1B;";case"medium":return"background: #FEF3C7; color: #92400E;";case"low":return"background: #DCFCE7; color: #166534;";default:return"background: #F3F4F6; color: #374151;"}}}
`,F=t.Ay.div`
  margin-bottom: 16px;
`,k=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`,C=t.Ay.span`
  color: #6B7280;
  font-weight: 500;
`,$=t.Ay.span`
  color: #0A2540;
  font-weight: 600;
`,E=t.Ay.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${e=>{switch(e.status){case"Approved":return"background: #DCFCE7; color: #166534;";case"In Progress":return"background: #DBEAFE; color: #1E40AF;";case"Under Review":return"background: #FEF3C7; color: #92400E;";case"Pending":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,B=t.Ay.p`
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

  ${e=>{switch(e.variant){case"primary":return`\n          background: ${o.w.colors.primary};\n          border-color: #635BFF;\n          color: white;\n          &:hover { background: ${o.w.colors.primaryHover}; border-color: #5A51E6; }\n        `;case"success":return`\n          background: ${o.w.colors.status.successAlt};\n          border-color: #059669;\n          color: white;\n          &:hover { background: #047857; border-color: #047857; }\n        `;default:return"\n          background: white;\n          border-color: #E6EBF1;\n          color: #374151;\n          &:hover { background: #F9FAFB; }\n        "}}}
`,q=t.Ay.div`
  padding: 20px 0;
`,P=t.Ay.ul`
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
`,L=t.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${o.w.colors.border};
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,I=t.Ay.input`
  padding: 10px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`,D=t.Ay.select`
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
`,T=()=>{const[e,r]=(0,i.useState)("requests"),[n,o]=(0,i.useState)(""),[t,T]=(0,i.useState)("all"),[H,O]=(0,i.useState)([]),[M,N]=(0,i.useState)(!1),[U,_]=(0,i.useState)(null),[W,Y]=(0,i.useState)("approve");(0,i.useEffect)(()=>{(async()=>{try{O([])}catch(e){console.error("Error fetching support requests:",e)}})()},[]);const Q=H.filter(e=>{const r=e.title.toLowerCase().includes(n.toLowerCase())||e.storeName.toLowerCase().includes(n.toLowerCase())||e.owner.toLowerCase().includes(n.toLowerCase()),o="all"===t||e.priority===t;return r&&o}),V={totalRequests:H.length,urgentRequests:H.filter(e=>"high"===e.priority).length,inProgress:H.filter(e=>"In Progress"===e.status).length,completed:H.filter(e=>"Approved"===e.status).length,pending:H.filter(e=>"Pending"===e.status).length},G=e=>{switch(e){case"high":return"Urgent";case"medium":return"Normal";case"low":return"Low";default:return e}},J=(e,r)=>{_(e),Y(r),N(!0)},K=()=>{switch(W){case"approve":return"Approved";case"reject":return"Rejected";case"process":return"Start Process";default:return"Process"}};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(l,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(h,{children:"Tenant Support"}),(0,c.jsx)(u,{children:"Foodcourt tenant request and support management"})]}),(0,c.jsx)(a.cc,{variant:"outline",children:"Export Support Report"})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(g,{children:(0,c.jsxs)(m,{children:[(0,c.jsx)(b,{active:"requests"===e,onClick:()=>r("requests"),children:"Support Request Management"}),(0,c.jsx)(b,{active:"communication"===e,onClick:()=>r("communication"),children:"Communication Management"}),(0,c.jsx)(b,{active:"announcements"===e,onClick:()=>r("announcements"),children:"Announcements"})]})}),"requests"===e&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(s.MD,{children:[(0,c.jsxs)(s.hI,{children:[(0,c.jsx)(s.Os,{children:V.totalRequests}),(0,c.jsx)(s.v0,{children:"Total Requests"}),(0,c.jsx)(s.E_,{trend:"up",children:"All support cases"})]}),(0,c.jsxs)(s.hI,{children:[(0,c.jsx)(s.Os,{children:V.urgentRequests}),(0,c.jsx)(s.v0,{children:"Urgent Requests"}),(0,c.jsx)(s.E_,{trend:V.urgentRequests>0?"down":"up",children:"High priority"})]}),(0,c.jsxs)(s.hI,{children:[(0,c.jsx)(s.Os,{children:V.pending}),(0,c.jsx)(s.v0,{children:"Pending"}),(0,c.jsx)(s.E_,{trend:V.pending>0?"down":"up",children:"Awaiting action"})]}),(0,c.jsxs)(s.hI,{children:[(0,c.jsx)(s.Os,{children:V.inProgress}),(0,c.jsx)(s.v0,{children:"In Progress"}),(0,c.jsx)(s.E_,{trend:"up",children:"Being processed"})]}),(0,c.jsxs)(s.hI,{children:[(0,c.jsx)(s.Os,{children:V.completed}),(0,c.jsx)(s.v0,{children:"Completed"}),(0,c.jsx)(s.E_,{trend:"up",children:"Successfully resolved"})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(I,{type:"text",placeholder:"Search by request title, business name, owner name...",value:n,onChange:e=>o(e.target.value)}),(0,c.jsxs)(D,{value:t,onChange:e=>T(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Priorities"}),(0,c.jsx)("option",{value:"high",children:"Urgent"}),(0,c.jsx)("option",{value:"medium",children:"Normal"}),(0,c.jsx)("option",{value:"low",children:"Low"})]})]}),(0,c.jsx)(w,{children:(0,c.jsx)(f,{children:Q.map(e=>(0,c.jsxs)(j,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(v,{children:e.title}),(0,c.jsx)(A,{level:e.priority,children:G(e.priority)})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Business Name"}),(0,c.jsx)($,{children:e.storeName})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Owner"}),(0,c.jsx)($,{children:e.owner})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Contact"}),(0,c.jsx)($,{children:e.phone||"-"})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Category"}),(0,c.jsx)($,{children:e.category})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Request Date"}),(0,c.jsx)($,{children:e.requestDate})]}),(0,c.jsxs)(k,{children:[(0,c.jsx)(C,{children:"Status"}),(0,c.jsx)($,{children:(0,c.jsx)(E,{status:e.status,children:e.status})})]})]}),(0,c.jsx)(B,{children:e.description}),(0,c.jsxs)(z,{children:["Pending"===e.status&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(S,{variant:"success",onClick:()=>J(e,"approve"),children:"Approve"}),(0,c.jsx)(S,{variant:"primary",onClick:()=>J(e,"process"),children:"Start Process"})]}),"Under Review"===e.status&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(S,{variant:"success",onClick:()=>J(e,"approve"),children:"Approve"}),(0,c.jsx)(S,{variant:"primary",onClick:()=>J(e,"reject"),children:"Reject"})]}),(0,c.jsx)(S,{variant:"secondary",children:"View Details"})]})]},e.id))})})]}),"communication"===e&&(0,c.jsxs)(w,{children:[(0,c.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Tenant Communication Management"}),(0,c.jsxs)(q,{children:[(0,c.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Manages various channels for smooth communication with tenants and collects feedback."}),(0,c.jsxs)(P,{children:[(0,c.jsx)(R,{children:"Regular meeting schedule management and attendance monitoring"}),(0,c.jsx)(R,{children:"Tenant feedback collection and analysis system"}),(0,c.jsx)(R,{children:"Suggestion reception and processing status tracking"}),(0,c.jsx)(R,{children:"Quarterly satisfaction surveys and result analysis"}),(0,c.jsx)(R,{children:"Communication channel effectiveness evaluation"}),(0,c.jsx)(R,{children:"Conflict resolution and mediation process management"})]})]})]}),"announcements"===e&&(0,c.jsxs)(w,{children:[(0,c.jsx)("h3",{style:{marginBottom:"20px",color:"#0A2540",fontSize:"20px",fontWeight:"600"},children:"Announcement Management"}),(0,c.jsxs)(q,{children:[(0,c.jsx)("p",{style:{color:"#6B7280",lineHeight:1.6,fontSize:"16px",marginBottom:"24px"},children:"Efficiently manages and delivers announcements to all foodcourt tenants."}),(0,c.jsxs)(P,{children:[(0,c.jsx)(R,{children:"Immediate notification of operational regulations and policy changes"}),(0,c.jsx)(R,{children:"Advance notice of facility inspections and regular maintenance schedules"}),(0,c.jsx)(R,{children:"Foodcourt event and promotion participation guidance"}),(0,c.jsx)(R,{children:"Emergency situation and contingency plan notification system"}),(0,c.jsx)(R,{children:"Industry trends and market information sharing"}),(0,c.jsx)(R,{children:"Training and workshop schedule guidance"})]})]})]}),(0,c.jsx)(d.A,{isOpen:M,title:"Request Process",message:`Are you sure you want to ${K().toLowerCase()} the request '${null===U||void 0===U?void 0:U.title}'?`,onConfirm:()=>{if(U&&W){let e;switch(W){case"approve":e="Approved";break;case"reject":e="Rejected";break;case"process":e="In Progress"}O(r=>r.map(r=>r.id===U.id?{...r,status:e}:r))}N(!1)},onCancel:()=>N(!1),confirmText:K(),cancelText:"Cancel",type:"reject"===W?"danger":"warning"})]})]})})}},7617:(e,r,n)=>{n.d(r,{A:()=>h});var o=n(8819),i=(n(9950),n(4752)),t=n(9610),s=n(4414);const a=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${o.w.colors.border};
`,c=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
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
`,h=e=>{let{isOpen:r,title:n,message:o,onConfirm:i,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,s.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,s.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:n}),(0,s.jsx)(l,{children:o})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:g}),(0,s.jsx)(x,{variant:"primary",type:m,onClick:i,children:u})]})]})}):null}}}]);