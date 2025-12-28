"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[733],{733:(e,i,n)=>{n.r(i),n.d(i,{default:()=>q});var t=n(9950),s=n(4752),r=n(3310),l=n(3832),o=n(4728),c=n(1721),a=n(5665),d=n(7492),x=n(9610),h=n(4414);const p=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,u=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
`,g=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,m=s.Ay.div`
  max-height: 600px;
  overflow-y: auto;
`,j=s.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  &:hover {
    background: #FAFBFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,y=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,v=s.Ay.div`
  flex: 1;
`,b=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,f=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,A=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,C=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.severity){case"critical":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.severity){case"critical":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,w=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
`,F=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
  line-height: 1.4;
`,k=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
`,S=s.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,E=s.Ay.div`
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
`,B=s.Ay.div`
  flex: 1;
`,z=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,U=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,T=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,L=s.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,O=s.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #635BFF;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`,_=s.Ay.span`
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
`,I=s.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,M=s.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,R=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 12px;
  line-height: 1.5;
`,P=s.Ay.div`
  margin-top: 24px;
`,V=s.Ay.div`
  margin-bottom: 20px;
`,$=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,N=s.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Y=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,q=()=>{const[e,i]=(0,t.useState)("events"),[n,s]=(0,t.useState)([]),[q,H]=(0,t.useState)([]),[J,X]=(0,t.useState)(!1),[G,K]=(0,t.useState)(null),[Q,W]=(0,t.useState)(!1);(0,t.useEffect)(()=>{s([]),H([])},[]);const Z=n.length,ee=n.filter(e=>"critical"===e.severity).length,ie=n.filter(e=>!e.resolved).length,ne=q.filter(e=>e.enabled).length,te=e=>{H(q.map(i=>i.id===e?{...i,enabled:!i.enabled,lastUpdated:(new Date).toISOString().replace("T"," ").slice(0,19)}:i))},se=e=>new Date(e).toLocaleString("en-MY");return(0,h.jsx)(r.A,{children:(0,h.jsxs)(l.mc,{children:[(0,h.jsxs)(l.Y9,{children:[(0,h.jsx)(l.hE,{children:"Security & Access Control"}),(0,h.jsxs)(l.ex,{children:[(0,h.jsx)(o.SC,{variant:"secondary",onClick:()=>{const e={generatedAt:(new Date).toISOString(),summary:{totalEvents:n.length,criticalEvents:ee,unresolvedEvents:ie,activePolicies:ne,totalPolicies:q.length},eventBreakdown:{critical:n.filter(e=>"critical"===e.severity).length,high:n.filter(e=>"high"===e.severity).length,medium:n.filter(e=>"medium"===e.severity).length,low:n.filter(e=>"low"===e.severity).length},eventTypes:{login:n.filter(e=>"login"===e.eventType).length,failed_login:n.filter(e=>"failed_login"===e.eventType).length,permission_change:n.filter(e=>"permission_change"===e.eventType).length,data_access:n.filter(e=>"data_access"===e.eventType).length,suspicious_activity:n.filter(e=>"suspicious_activity"===e.eventType).length},recentEvents:n.slice(0,20),policies:q.map(e=>({name:e.name,enabled:e.enabled,category:e.category,lastUpdated:e.lastUpdated}))},i=JSON.stringify(e,null,2),t=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(t),r=document.createElement("a");r.href=s,r.download=`security-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)},children:"Security Report"}),(0,h.jsx)(o.SC,{variant:"primary",onClick:()=>{W(!0)},children:"Lock All Sessions"})]})]}),(0,h.jsxs)(l.UC,{children:[(0,h.jsxs)(a.MD,{children:[(0,h.jsxs)(a.hI,{color:"#059669",children:[(0,h.jsx)(a.Os,{children:Z}),(0,h.jsx)(a.v0,{children:"Security Events (24h)"})]}),(0,h.jsxs)(a.hI,{color:"#DC2626",children:[(0,h.jsx)(a.Os,{children:ee}),(0,h.jsx)(a.v0,{children:"Critical Alerts"})]}),(0,h.jsxs)(a.hI,{color:"#D97706",children:[(0,h.jsx)(a.Os,{children:ie}),(0,h.jsx)(a.v0,{children:"Unresolved Events"})]}),(0,h.jsxs)(a.hI,{color:"#2563EB",children:[(0,h.jsxs)(a.Os,{children:[ne,"/",q.length]}),(0,h.jsx)(a.v0,{children:"Active Policies"})]})]}),(0,h.jsxs)(d.j,{children:[(0,h.jsx)(d.oz,{active:"events"===e,onClick:()=>i("events"),children:"Security Events"}),(0,h.jsx)(d.oz,{active:"policies"===e,onClick:()=>i("policies"),children:"Security Policies"}),(0,h.jsx)(d.oz,{active:"access"===e,onClick:()=>i("access"),children:"Access Control"})]}),(0,h.jsxs)(p,{children:["events"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(g,{children:"Recent Security Events"})}),(0,h.jsx)(m,{children:n.map(e=>(0,h.jsxs)(j,{children:[(0,h.jsxs)(y,{children:[(0,h.jsxs)(v,{children:[(0,h.jsx)(b,{children:e.eventType.replace("_"," ")}),(0,h.jsxs)(f,{children:[e.userName," (",e.userRole,")"]})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{severity:e.severity,children:e.severity}),(0,h.jsx)(w,{children:se(e.timestamp)})]})]}),(0,h.jsx)(F,{children:e.description}),(0,h.jsxs)(k,{children:["IP: ",e.ipAddress," | Location: ",e.location||"Unknown"," | Status: ",e.resolved?"Resolved":"Unresolved"]})]},e.id))})]}),"policies"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(g,{children:"Security Policies"})}),(0,h.jsx)(S,{children:q.map(e=>(0,h.jsxs)(E,{enabled:e.enabled,children:[(0,h.jsxs)(B,{children:[(0,h.jsx)(z,{children:e.name}),(0,h.jsx)(D,{children:e.description}),(0,h.jsx)(U,{children:e.category.replace("_"," ")})]}),(0,h.jsxs)(T,{children:[(0,h.jsxs)(L,{children:[(0,h.jsx)(O,{type:"checkbox",checked:e.enabled,onChange:()=>te(e.id)}),(0,h.jsx)(_,{})]}),(0,h.jsx)(o.SC,{variant:"secondary",onClick:()=>(e=>{K(e),X(!0)})(e),children:"Configure"})]})]},e.id))})]}),"access"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:(0,h.jsx)(g,{children:"Access Control Matrix"})}),(0,h.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:"Access Control Matrix will be implemented here with role-based permissions management."})]})]}),(0,h.jsxs)(x.aF,{isOpen:Q,onClose:()=>W(!1),title:"Lock All User Sessions",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(x.yl,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,h.jsx)(x.yl,{variant:"primary",onClick:()=>{alert("All user sessions have been locked. Users will be required to re-authenticate."),W(!1);const e={id:`event-${Date.now()}`,timestamp:(new Date).toISOString().replace("T"," ").slice(0,19),eventType:"permission_change",severity:"high",userId:"admin",userName:"System Administrator",userRole:"Admin",ipAddress:"127.0.0.1",userAgent:"Admin Console",description:"All user sessions locked by administrator",location:"System",resolved:!0};s([e,...n])},children:"Lock All Sessions"})]}),children:[(0,h.jsx)(I,{children:"\u26a0\ufe0f"}),(0,h.jsx)(M,{children:(0,h.jsx)("strong",{children:"Are you sure you want to lock all active user sessions?"})}),(0,h.jsx)("p",{style:{color:"#6B7280",marginBottom:"0",textAlign:"center"},children:"This will immediately terminate all user sessions across all devices. Users will need to log in again to continue using the system."})]}),G&&(0,h.jsxs)(x.aF,{isOpen:J,onClose:()=>X(!1),title:`Configure Policy: ${G.name}`,footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(x.yl,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,h.jsx)(x.yl,{onClick:()=>{alert("Policy configuration updated successfully!"),X(!1)},children:"Save Configuration"})]}),children:[(0,h.jsxs)(B,{children:[(0,h.jsx)(D,{children:G.description}),(0,h.jsxs)(R,{children:[(0,h.jsx)("strong",{children:"Category:"})," ",G.category.replace("_"," "),(0,h.jsx)("br",{}),(0,h.jsx)("strong",{children:"Status:"})," ",G.enabled?"Enabled":"Disabled",(0,h.jsx)("br",{}),(0,h.jsx)("strong",{children:"Last Updated:"})," ",se(G.lastUpdated)]})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Policy Status"}),(0,h.jsxs)(Y,{children:[(0,h.jsxs)(L,{children:[(0,h.jsx)(O,{type:"checkbox",checked:G.enabled,onChange:()=>te(G.id)}),(0,h.jsx)(_,{})]}),(0,h.jsx)("span",{children:G.enabled?"Enabled":"Disabled"})]})]}),"authentication"===G.category&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Session Timeout (minutes)"}),(0,h.jsx)(N,{type:"number",defaultValue:"30",min:"5",max:"480"})]}),(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Max Login Attempts"}),(0,h.jsx)(N,{type:"number",defaultValue:"5",min:"3",max:"10"})]})]}),"data_protection"===G.category&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Encryption Level"}),(0,h.jsxs)(c.mM,{defaultValue:"aes256",children:[(0,h.jsx)("option",{value:"aes128",children:"AES-128"}),(0,h.jsx)("option",{value:"aes256",children:"AES-256"})]})]}),(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Data Retention (days)"}),(0,h.jsx)(N,{type:"number",defaultValue:"365",min:"30",max:"2555"})]})]}),"monitoring"===G.category&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Alert Threshold"}),(0,h.jsxs)(c.mM,{defaultValue:"medium",children:[(0,h.jsx)("option",{value:"low",children:"Low"}),(0,h.jsx)("option",{value:"medium",children:"Medium"}),(0,h.jsx)("option",{value:"high",children:"High"}),(0,h.jsx)("option",{value:"critical",children:"Critical"})]})]}),(0,h.jsxs)(V,{children:[(0,h.jsx)($,{children:"Monitoring Interval (minutes)"}),(0,h.jsx)(N,{type:"number",defaultValue:"5",min:"1",max:"60"})]})]})]})]})]})]})})}}}]);