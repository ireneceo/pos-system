"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[733],{733:(e,i,n)=>{n.r(i),n.d(i,{default:()=>Y});var t=n(9950),s=n(4752),r=n(3832),l=n(4728),o=n(1721),c=n(5665),a=n(2674),d=n(9610),x=n(4414);const h=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,p=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: between;
  align-items: center;
`,u=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,g=s.Ay.div`
  max-height: 600px;
  overflow-y: auto;
`,m=s.Ay.div`
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.2s;
  
  &:hover {
    background: #FAFBFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,j=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`,y=s.Ay.div`
  flex: 1;
`,v=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,b=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,f=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
`,A=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.severity){case"critical":return"#FEE2E2";case"high":return"#FED7AA";case"medium":return"#FEF3C7";case"low":return"#E0F2FE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.severity){case"critical":return"#DC2626";case"high":return"#EA580C";case"medium":return"#D97706";case"low":return"#0891B2";default:return"#6B7280"}}};
`,C=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
`,w=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin: 8px 0;
  line-height: 1.4;
`,F=s.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
`,k=s.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,S=s.Ay.div`
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
`,E=s.Ay.div`
  flex: 1;
`,B=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,z=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,D=s.Ay.div`
  font-size: 11px;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`,U=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,T=s.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,L=s.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #635BFF;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`,O=s.Ay.span`
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
`,_=s.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,I=s.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,M=s.Ay.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 12px;
  line-height: 1.5;
`,R=s.Ay.div`
  margin-top: 24px;
`,P=s.Ay.div`
  margin-bottom: 20px;
`,V=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,$=s.Ay.input`
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
`,N=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,Y=()=>{const[e,i]=(0,t.useState)("events"),[n,s]=(0,t.useState)([]),[Y,q]=(0,t.useState)([]),[H,J]=(0,t.useState)(!1),[X,G]=(0,t.useState)(null),[K,Q]=(0,t.useState)(!1);(0,t.useEffect)(()=>{s([]),q([])},[]);const W=n.length,Z=n.filter(e=>"critical"===e.severity).length,ee=n.filter(e=>!e.resolved).length,ie=Y.filter(e=>e.enabled).length,ne=e=>{q(Y.map(i=>i.id===e?{...i,enabled:!i.enabled,lastUpdated:(new Date).toISOString().replace("T"," ").slice(0,19)}:i))},te=e=>new Date(e).toLocaleString("en-MY");return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(r.mc,{children:[(0,x.jsxs)(r.Y9,{children:[(0,x.jsx)(r.hE,{children:"Security & Access Control"}),(0,x.jsxs)(r.ex,{children:[(0,x.jsx)(l.SC,{variant:"secondary",onClick:()=>{const e={generatedAt:(new Date).toISOString(),summary:{totalEvents:n.length,criticalEvents:Z,unresolvedEvents:ee,activePolicies:ie,totalPolicies:Y.length},eventBreakdown:{critical:n.filter(e=>"critical"===e.severity).length,high:n.filter(e=>"high"===e.severity).length,medium:n.filter(e=>"medium"===e.severity).length,low:n.filter(e=>"low"===e.severity).length},eventTypes:{login:n.filter(e=>"login"===e.eventType).length,failed_login:n.filter(e=>"failed_login"===e.eventType).length,permission_change:n.filter(e=>"permission_change"===e.eventType).length,data_access:n.filter(e=>"data_access"===e.eventType).length,suspicious_activity:n.filter(e=>"suspicious_activity"===e.eventType).length},recentEvents:n.slice(0,20),policies:Y.map(e=>({name:e.name,enabled:e.enabled,category:e.category,lastUpdated:e.lastUpdated}))},i=JSON.stringify(e,null,2),t=new Blob([i],{type:"application/json"}),s=URL.createObjectURL(t),r=document.createElement("a");r.href=s,r.download=`security-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(s)},children:"Security Report"}),(0,x.jsx)(l.SC,{variant:"primary",onClick:()=>{Q(!0)},children:"Lock All Sessions"})]})]}),(0,x.jsxs)(r.UC,{children:[(0,x.jsxs)(c.MD,{children:[(0,x.jsxs)(c.hI,{color:"#059669",children:[(0,x.jsx)(c.Os,{children:W}),(0,x.jsx)(c.v0,{children:"Security Events (24h)"})]}),(0,x.jsxs)(c.hI,{color:"#DC2626",children:[(0,x.jsx)(c.Os,{children:Z}),(0,x.jsx)(c.v0,{children:"Critical Alerts"})]}),(0,x.jsxs)(c.hI,{color:"#D97706",children:[(0,x.jsx)(c.Os,{children:ee}),(0,x.jsx)(c.v0,{children:"Unresolved Events"})]}),(0,x.jsxs)(c.hI,{color:"#2563EB",children:[(0,x.jsxs)(c.Os,{children:[ie,"/",Y.length]}),(0,x.jsx)(c.v0,{children:"Active Policies"})]})]}),(0,x.jsxs)(a.j,{children:[(0,x.jsx)(a.oz,{active:"events"===e,onClick:()=>i("events"),children:"Security Events"}),(0,x.jsx)(a.oz,{active:"policies"===e,onClick:()=>i("policies"),children:"Security Policies"}),(0,x.jsx)(a.oz,{active:"access"===e,onClick:()=>i("access"),children:"Access Control"})]}),(0,x.jsxs)(h,{children:["events"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p,{children:(0,x.jsx)(u,{children:"Recent Security Events"})}),(0,x.jsx)(g,{children:n.map(e=>(0,x.jsxs)(m,{children:[(0,x.jsxs)(j,{children:[(0,x.jsxs)(y,{children:[(0,x.jsx)(v,{children:e.eventType.replace("_"," ")}),(0,x.jsxs)(b,{children:[e.userName," (",e.userRole,")"]})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(A,{severity:e.severity,children:e.severity}),(0,x.jsx)(C,{children:te(e.timestamp)})]})]}),(0,x.jsx)(w,{children:e.description}),(0,x.jsxs)(F,{children:["IP: ",e.ipAddress," | Location: ",e.location||"Unknown"," | Status: ",e.resolved?"Resolved":"Unresolved"]})]},e.id))})]}),"policies"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p,{children:(0,x.jsx)(u,{children:"Security Policies"})}),(0,x.jsx)(k,{children:Y.map(e=>(0,x.jsxs)(S,{enabled:e.enabled,children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(B,{children:e.name}),(0,x.jsx)(z,{children:e.description}),(0,x.jsx)(D,{children:e.category.replace("_"," ")})]}),(0,x.jsxs)(U,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{type:"checkbox",checked:e.enabled,onChange:()=>ne(e.id)}),(0,x.jsx)(O,{})]}),(0,x.jsx)(l.SC,{variant:"secondary",onClick:()=>(e=>{G(e),J(!0)})(e),children:"Configure"})]})]},e.id))})]}),"access"===e&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p,{children:(0,x.jsx)(u,{children:"Access Control Matrix"})}),(0,x.jsx)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:"Access Control Matrix will be implemented here with role-based permissions management."})]})]}),(0,x.jsxs)(d.aF,{isOpen:K,onClose:()=>Q(!1),title:"Lock All User Sessions",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{variant:"primary",onClick:()=>{alert("All user sessions have been locked. Users will be required to re-authenticate."),Q(!1);const e={id:`event-${Date.now()}`,timestamp:(new Date).toISOString().replace("T"," ").slice(0,19),eventType:"permission_change",severity:"high",userId:"admin",userName:"System Administrator",userRole:"Admin",ipAddress:"127.0.0.1",userAgent:"Admin Console",description:"All user sessions locked by administrator",location:"System",resolved:!0};s([e,...n])},children:"Lock All Sessions"})]}),children:[(0,x.jsx)(_,{children:"\u26a0\ufe0f"}),(0,x.jsx)(I,{children:(0,x.jsx)("strong",{children:"Are you sure you want to lock all active user sessions?"})}),(0,x.jsx)("p",{style:{color:"#6B7280",marginBottom:"0",textAlign:"center"},children:"This will immediately terminate all user sessions across all devices. Users will need to log in again to continue using the system."})]}),X&&(0,x.jsxs)(d.aF,{isOpen:H,onClose:()=>J(!1),title:`Configure Policy: ${X.name}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(d.yl,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,x.jsx)(d.yl,{onClick:()=>{alert("Policy configuration updated successfully!"),J(!1)},children:"Save Configuration"})]}),children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(z,{children:X.description}),(0,x.jsxs)(M,{children:[(0,x.jsx)("strong",{children:"Category:"})," ",X.category.replace("_"," "),(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Status:"})," ",X.enabled?"Enabled":"Disabled",(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Last Updated:"})," ",te(X.lastUpdated)]})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Policy Status"}),(0,x.jsxs)(N,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(L,{type:"checkbox",checked:X.enabled,onChange:()=>ne(X.id)}),(0,x.jsx)(O,{})]}),(0,x.jsx)("span",{children:X.enabled?"Enabled":"Disabled"})]})]}),"authentication"===X.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Session Timeout (minutes)"}),(0,x.jsx)($,{type:"number",defaultValue:"30",min:"5",max:"480"})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Max Login Attempts"}),(0,x.jsx)($,{type:"number",defaultValue:"5",min:"3",max:"10"})]})]}),"data_protection"===X.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Encryption Level"}),(0,x.jsxs)(o.mM,{defaultValue:"aes256",children:[(0,x.jsx)("option",{value:"aes128",children:"AES-128"}),(0,x.jsx)("option",{value:"aes256",children:"AES-256"})]})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Data Retention (days)"}),(0,x.jsx)($,{type:"number",defaultValue:"365",min:"30",max:"2555"})]})]}),"monitoring"===X.category&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Alert Threshold"}),(0,x.jsxs)(o.mM,{defaultValue:"medium",children:[(0,x.jsx)("option",{value:"low",children:"Low"}),(0,x.jsx)("option",{value:"medium",children:"Medium"}),(0,x.jsx)("option",{value:"high",children:"High"}),(0,x.jsx)("option",{value:"critical",children:"Critical"})]})]}),(0,x.jsxs)(P,{children:[(0,x.jsx)(V,{children:"Monitoring Interval (minutes)"}),(0,x.jsx)($,{type:"number",defaultValue:"5",min:"1",max:"60"})]})]})]})]})]})]})})}}}]);