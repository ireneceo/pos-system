"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[733],{733:(e,i,n)=>{n.r(i),n.d(i,{default:()=>V});var s=n(8819),t=n(9950),r=n(4752),l=n(3832),o=n(4728),c=n(1721),a=n(5665),d=n(2674),h=n(9610),x=n(4414);const p=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${s.w.colors.border};
  overflow: hidden;
`,g=r.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
`,u=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${s.w.colors.secondary};
`,j=r.Ay.div`
  max-height: 600px;
  overflow-y: auto;
`,m=r.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  &:hover {
    background: #FAFBFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,y=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,v=r.Ay.div`
  flex: 1;
`,f=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,b=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,C=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.severity){case"critical":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.severity){case"critical":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,w=r.Ay.div`
  font-size: 12px;
  color: ${s.w.colors.text.placeholder};
`,k=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
  line-height: 1.4;
`,F=r.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
`,S=r.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,E=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;
  opacity: ${e=>e.enabled?1:.6};

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,z=r.Ay.div`
  flex: 1;
`,B=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=r.Ay.div`
  font-size: 13px;
  color: ${s.w.colors.text.muted};
  line-height: 1.4;
`,R=r.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,U=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=r.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,L=r.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #635BFF;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`,O=r.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBD5E1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`,_=r.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,I=r.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,M=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 12px;
  line-height: 1.5;
`,$=r.Ay.div`
  margin-top: 24px;
`,P=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,V=()=>{const[e,i]=(0,t.useState)("events"),[n,s]=(0,t.useState)([]),[r,V]=(0,t.useState)([]),[Q,Z]=(0,t.useState)(!1),[N,Y]=(0,t.useState)(null),[q,H]=(0,t.useState)(!1);(0,t.useEffect)(()=>{s([]),V([])},[]);const J=n.length,X=n.filter(e=>"critical"===e.severity).length,G=n.filter(e=>!e.resolved).length,K=r.filter(e=>e.enabled).length,W=e=>{V(r.map(i=>i.id===e?{...i,enabled:!i.enabled,lastUpdated:(new Date).toISOString().replace("T"," ").slice(0,19)}:i))},ee=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(l.mc,{children:[(0,x.jsxs)(l.Y9,{children:[(0,x.jsx)(l.hE,{children:"Security & Access Control"}),(0,x.jsxs)(l.ex,{children:[(0,x.jsx)(o.SC,{variant:"secondary",onClick:()=>{const e={generatedAt:(new Date).toISOString(),summary:{totalEvents:n.length,criticalEvents:X,unresolvedEvents:G,activePolicies:K,totalPolicies:r.length},eventBreakdown:{critical:n.filter(e=>"critical"===e.severity).length,high:n.filter(e=>"high"===e.severity).length,medium:n.filter(e=>"medium"===e.severity).length,low:n.filter(e=>"low"===e.severity).length},eventTypes:{login:n.filter(e=>"login"===e.eventType).length,failed_login:n.filter(e=>"failed_login"===e.eventType).length,permission_change:n.filter(e=>"permission_change"===e.eventType).length,data_access:n.filter(e=>"data_access"===e.eventType).length,suspicious_activity:n.filter(e=>"suspicious_activity"===e.eventType).length},recentEvents:n.slice(0,20),policies:r.map(e=>({name:e.name,enabled:e.enabled,category:e.category,lastUpdated:e.lastUpdated}))},i=JSON.stringify(e,null,2),s=new Blob([i],{type:"application/json"}),t=URL.createObjectURL(s),l=document.createElement("a");l.href=t,l.download=`security-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(t)},children:"Security Report"}),(0,x.jsx)(o.SC,{variant:"primary",onClick:()=>{H(!0)},children:"Lock All Sessions"})]})]}),(0,x.jsxs)(l.UC,{children:[(0,x.jsxs)(a.MD,{children:[(0,x.jsxs)(a.hI,{color:"#059669",children:[(0,x.jsx)(a.Os,{children:J}),(0,x.jsx)(a.v0,{children:"Security Events (24h)"})]}),(0,x.jsxs)(a.hI,{color:"#DC2626",children:[(0,x.jsx)(a.Os,{children:X}),(0,x.jsx)(a.v0,{children:"Critical Alerts"})]}),(0,x.jsxs)(a.hI,{color:"#D97706",children:[(0,x.jsx)(a.Os,{children:G}),(0,x.jsx)(a.v0,{children:"Unresolved Events"})]}),(0,x.jsxs)(a.hI,{color:"#2563EB",children:[(0,x.jsxs)(a.Os,{children:[K,"/",r.length]}),(0,x.jsx)(a.v0,{children:"Active Policies"})]})]}),(0,x.jsxs)(d.j,{children:[(0,x.jsx)(d.oz,{active:"events"===e,onClick:()=>i("events"),children:"Security Events"}),(0,x.jsx)(d.oz,{active:"policies"===e,onClick:()=>i("policies"),children:"Security Policies"}),(0,x.jsx)(d.oz,{active:"access"===e,onClick:()=>i("access"),children:"Access Control"})]}),(0,x.jsxs)(p,{children:["events"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:(0,x.jsx)(u,{children:"Recent Security Events"})}),(0,x.jsx)(j,{children:n.map(e=>(0,x.jsxs)(m,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(v,{children:[(0,x.jsx)(f,{children:e.eventType.replace("_"," ")}),(0,x.jsxs)(b,{children:[e.userName," (",e.userRole,")"]})]}),(0,x.jsxs)(A,{children:[(0,x.jsx)(C,{severity:e.severity,children:e.severity}),(0,x.jsx)(w,{children:ee(e.timestamp)})]})]}),(0,x.jsx)(k,{children:e.description}),(0,x.jsxs)(F,{children:["IP: ",e.ipAddress," | Location: ",e.location||"Unknown"," | Status: ",e.resolved?"Resolved":"Unresolved"]})]},e.id))})]}),"policies"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:(0,x.jsx)(u,{children:"Security Policies"})}),(0,x.jsx)(S,{children:r.map(e=>(0,x.jsxs)(E,{enabled:e.enabled,children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(B,{children:e.name}),(0,x.jsx)(D,{children:e.description}),(0,x.jsx)(R,{children:e.category.replace("_"," ")})]}),(0,x.jsxs)(U,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{type:"checkbox",checked:e.enabled,onChange:()=>W(e.id)}),(0,x.jsx)(O,{})]}),(0,x.jsx)(o.SC,{variant:"secondary",onClick:()=>(e=>{Y(e),Z(!0)})(e),children:"Configure"})]})]},e.id))})]}),"access"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:(0,x.jsx)(u,{children:"Access Control Matrix"})}),(0,x.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:"Access Control Matrix will be implemented here with role-based permissions management."})]})]}),(0,x.jsxs)(h.aF,{isOpen:q,onClose:()=>H(!1),title:"Lock All User Sessions",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,x.jsx)(h.yl,{variant:"primary",onClick:()=>{alert("All user sessions have been locked. Users will be required to re-authenticate."),H(!1);const e={id:`event-${Date.now()}`,timestamp:(new Date).toISOString().replace("T"," ").slice(0,19),eventType:"permission_change",severity:"high",userId:"admin",userName:"System Administrator",userRole:"Admin",ipAddress:"127.0.0.1",userAgent:"Admin Console",description:"All user sessions locked by administrator",location:"System",resolved:!0};s([e,...n])},children:"Lock All Sessions"})]}),children:[(0,x.jsx)(_,{children:"\u26a0\ufe0f"}),(0,x.jsx)(I,{children:(0,x.jsx)("strong",{children:"Are you sure you want to lock all active user sessions?"})}),(0,x.jsx)("p",{style:{color:"#6B7280",marginBottom:"0",textAlign:"center"},children:"This will immediately terminate all user sessions across all devices. Users will need to log in again to continue using the system."})]}),N&&(0,x.jsxs)(h.aF,{isOpen:Q,onClose:()=>Z(!1),title:`Configure Policy: ${N.name}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.yl,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,x.jsx)(h.yl,{onClick:()=>{alert("Policy configuration updated successfully!"),Z(!1)},children:"Save Configuration"})]}),children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(D,{children:N.description}),(0,x.jsxs)(M,{children:[(0,x.jsx)("strong",{children:"Category:"})," ",N.category.replace("_"," "),(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Status:"})," ",N.enabled?"Enabled":"Disabled",(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Last Updated:"})," ",ee(N.lastUpdated)]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Policy Status"}),(0,x.jsxs)(P,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{type:"checkbox",checked:N.enabled,onChange:()=>W(N.id)}),(0,x.jsx)(O,{})]}),(0,x.jsx)("span",{children:N.enabled?"Enabled":"Disabled"})]})]}),"authentication"===N.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Session Timeout (minutes)"}),(0,x.jsx)(d.ZQ,{type:"number",defaultValue:"30",min:"5",max:"480"})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Max Login Attempts"}),(0,x.jsx)(d.ZQ,{type:"number",defaultValue:"5",min:"3",max:"10"})]})]}),"data_protection"===N.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Encryption Level"}),(0,x.jsxs)(c.mM,{defaultValue:"aes256",children:[(0,x.jsx)("option",{value:"aes128",children:"AES-128"}),(0,x.jsx)("option",{value:"aes256",children:"AES-256"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Data Retention (days)"}),(0,x.jsx)(d.ZQ,{type:"number",defaultValue:"365",min:"30",max:"2555"})]})]}),"monitoring"===N.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Alert Threshold"}),(0,x.jsxs)(c.mM,{defaultValue:"medium",children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"critical",children:"Critical"})]})]}),(0,x.jsxs)(d.gE,{children:[(0,x.jsx)(d.lR,{children:"Monitoring Interval (minutes)"}),(0,x.jsx)(d.ZQ,{type:"number",defaultValue:"5",min:"1",max:"60"})]})]})]})]})]})]})})}}}]);