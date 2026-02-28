"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{5581:(e,r,s)=>{s.r(r),s.d(r,{default:()=>V});var n=s(9950),t=s(4752),i=s(3832),l=s(4728),a=s(1721),o=s(5665),d=s(2674),c=s(9610),p=s(4414);const h=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,x=t.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,u=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,j=t.Ay.div`
  display: flex;
  gap: 8px;
`,g=t.Ay.div`
  display: grid;
  gap: 0;
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  ${e=>"failed"===e.status&&"\n    background: #FEF2F2;\n  "}

  ${e=>"in-progress"===e.status&&"\n    background: #EFF6FF;\n  "}

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,y=t.Ay.div``,f=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,b=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,v=t.Ay.div``,F=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,k=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,A=t.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,B=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,C=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,w=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,E=t.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,S=t.Ay.div`
  padding: 0;
`,D=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`,z=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,$=t.Ay.div``,M=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,O=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,T=t.Ay.div`
  width: 100%;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`,I=t.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: #635BFF;
  transition: width 0.3s ease;
`,N=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,R=t.Ay.div`
  margin-bottom: 20px;
`,K=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,q=t.Ay.input`
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
`,U=t.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,H=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`,L=t.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,W=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F8FAFC;
  }
  
  &:last-child {
    border-bottom: none;
  }
`,Y=t.Ay.div`
  flex: 1;
`,_=t.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,G=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,P=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,V=()=>{const[e,r]=(0,n.useState)("backups"),[s,t]=(0,n.useState)([]),[V,Z]=(0,n.useState)([]),[J,Q]=(0,n.useState)(!1),[X,ee]=(0,n.useState)(!1),[re,se]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[ne,te]=(0,n.useState)("full"),[ie,le]=(0,n.useState)("");(0,n.useEffect)(()=>{t([]),Z([])},[]);const ae=s.filter(e=>"completed"===e.status).length,oe=s.filter(e=>"failed"===e.status).length,de=s.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),ce=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},pe=e=>{const r=Math.floor(e/3600),s=Math.floor(e%3600/60),n=e%60;return r>0?`${r}h ${s}m ${n}s`:s>0?`${s}m ${n}s`:`${n}s`},he=e=>new Date(e).toLocaleString("en-MY"),xe=()=>{Q(!0)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:"Backup & Restore"}),(0,p.jsxs)(i.ex,{children:[(0,p.jsx)(l.SC,{variant:"secondary",onClick:()=>{0!==s.filter(e=>"completed"===e.status).length?se(!0):alert("No completed backups available for download.")},children:"Download Backup"}),(0,p.jsx)(l.SC,{variant:"primary",onClick:xe,children:"Create Backup"})]})]}),(0,p.jsxs)(i.UC,{children:[(0,p.jsxs)(o.MD,{children:[(0,p.jsxs)(o.hI,{color:"#059669",children:[(0,p.jsx)(o.Os,{children:s.length}),(0,p.jsx)(o.v0,{children:"Total Backups"})]}),(0,p.jsxs)(o.hI,{color:"#2563EB",children:[(0,p.jsx)(o.Os,{children:ae}),(0,p.jsx)(o.v0,{children:"Successful Backups"})]}),(0,p.jsxs)(o.hI,{color:"#DC2626",children:[(0,p.jsx)(o.Os,{children:oe}),(0,p.jsx)(o.v0,{children:"Failed Backups"})]}),(0,p.jsxs)(o.hI,{color:"#7C3AED",children:[(0,p.jsx)(o.Os,{children:ce(de)}),(0,p.jsx)(o.v0,{children:"Total Storage Used"})]})]}),(0,p.jsxs)(d.j,{children:[(0,p.jsx)(d.oz,{active:"backups"===e,onClick:()=>r("backups"),children:"Backup History"}),(0,p.jsx)(d.oz,{active:"restore"===e,onClick:()=>r("restore"),children:"Restore Operations"}),(0,p.jsx)(d.oz,{active:"schedule"===e,onClick:()=>r("schedule"),children:"Backup Schedule"})]}),(0,p.jsxs)(h,{children:["backups"===e&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(u,{children:"Backup History"}),(0,p.jsxs)(j,{children:[(0,p.jsx)(l.SC,{variant:"secondary",onClick:()=>{const e=s.filter(e=>{const r=new Date(e.createdAt),s=new Date;return s.setDate(s.getDate()-30),r<s&&"completed"===e.status});if(0!==e.length){if(confirm(`This will delete ${e.length} backups older than 30 days. Continue?`)){const r=s.filter(r=>!e.includes(r));t(r),alert(`Successfully cleaned up ${e.length} old backups.`)}}else alert("No old backups found to clean up.")},children:"Cleanup Old Backups"}),(0,p.jsx)(l.SC,{variant:"primary",onClick:xe,children:"New Backup"})]})]}),(0,p.jsx)(g,{children:s.map(e=>(0,p.jsxs)(m,{status:e.status,children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(f,{children:e.name}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Size"}),(0,p.jsx)(k,{children:ce(e.size)})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Duration"}),(0,p.jsx)(k,{children:e.duration>0?pe(e.duration):"N/A"})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Created"}),(0,p.jsx)(k,{children:he(e.createdAt)})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(F,{children:"Tables"}),(0,p.jsxs)(k,{children:[e.tables.length," tables"]})]})]}),e.description&&(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:e.description}),(0,p.jsxs)(A,{children:[(0,p.jsx)(B,{variant:"type",children:e.type}),e.encrypted&&(0,p.jsx)(B,{variant:"encrypted",children:"Encrypted"}),e.compressed&&(0,p.jsx)(B,{variant:"compressed",children:"Compressed"})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(w,{status:e.status,children:e.status}),"completed"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(E,{variant:"primary",children:"Restore"}),(0,p.jsx)(E,{children:"Download"}),(0,p.jsx)(E,{variant:"danger",children:"Delete"})]}),"failed"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(E,{variant:"primary",children:"Retry"}),(0,p.jsx)(E,{variant:"danger",children:"Delete"})]}),"scheduled"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(E,{children:"Edit Schedule"}),(0,p.jsx)(E,{variant:"danger",children:"Cancel"})]})]})]},e.id))})]}),"restore"===e&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(u,{children:"Restore Operations"})}),(0,p.jsxs)(S,{children:[V.map(e=>(0,p.jsxs)(D,{children:[(0,p.jsxs)(z,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(M,{children:["Restoring: ",e.backupName]}),(0,p.jsxs)(O,{children:["Started: ",he(e.startedAt)," |",e.completedAt&&` Completed: ${he(e.completedAt)}`]})]}),(0,p.jsx)(w,{status:e.status,children:e.status})]}),(0,p.jsx)(T,{children:(0,p.jsx)(I,{percentage:e.progress})}),(0,p.jsxs)(N,{children:[(0,p.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,p.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,p.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===V.length&&(0,p.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===e&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(u,{children:"Backup Schedule"}),(0,p.jsx)(j,{children:(0,p.jsx)(l.SC,{variant:"primary",onClick:()=>{ee(!0)},children:"Add Schedule"})})]}),(0,p.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,p.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,p.jsxs)(c.aF,{isOpen:J,onClose:()=>Q(!1),title:"Create New Backup",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.yl,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,p.jsx)(c.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${ne.charAt(0).toUpperCase()+ne.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:ne,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${ne}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:ie||`${ne} backup created manually`,tables:"full"===ne?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};t([e,...s]),Q(!1),le(""),setTimeout(()=>{t(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r)),alert("Backup completed successfully!")},3e3)},children:"Create Backup"})]}),children:[(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Backup Type"}),(0,p.jsxs)(a.mM,{value:ne,onChange:e=>te(e.target.value),children:[(0,p.jsx)("option",{value:"full",children:"Full Backup"}),(0,p.jsx)("option",{value:"incremental",children:"Incremental Backup"}),(0,p.jsx)("option",{value:"differential",children:"Differential Backup"})]}),(0,p.jsx)(H,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Description (Optional)"}),(0,p.jsx)(U,{value:ie,onChange:e=>le(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,p.jsxs)(c.aF,{isOpen:re,onClose:()=>se(!1),title:"Download Backup",footer:(0,p.jsx)(c.yl,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),children:[(0,p.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,p.jsx)(L,{children:s.filter(e=>"completed"===e.status).map(e=>(0,p.jsxs)(W,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),alert(`Starting download of ${e.name}...`),se(!1)})(e),children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)(_,{children:e.name}),(0,p.jsxs)(G,{children:[ce(e.size)," \u2022 ",he(e.createdAt)]})]}),(0,p.jsx)(P,{children:ce(e.size)})]},e.id))})]}),(0,p.jsxs)(c.aF,{isOpen:X,onClose:()=>ee(!1),title:"Add Backup Schedule",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,p.jsx)(c.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),ee(!1)},children:"Create Schedule"})]}),children:[(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Schedule Name"}),(0,p.jsx)(q,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Backup Type"}),(0,p.jsxs)(a.mM,{children:[(0,p.jsx)("option",{value:"full",children:"Full Backup"}),(0,p.jsx)("option",{value:"incremental",children:"Incremental Backup"})]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Frequency"}),(0,p.jsxs)(a.mM,{children:[(0,p.jsx)("option",{value:"daily",children:"Daily"}),(0,p.jsx)("option",{value:"weekly",children:"Weekly"}),(0,p.jsx)("option",{value:"monthly",children:"Monthly"})]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Time"}),(0,p.jsx)(q,{type:"time",defaultValue:"02:00"})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(K,{children:"Retention Policy"}),(0,p.jsxs)(a.mM,{children:[(0,p.jsx)("option",{value:"7",children:"Keep for 7 days"}),(0,p.jsx)("option",{value:"30",children:"Keep for 30 days"}),(0,p.jsx)("option",{value:"90",children:"Keep for 90 days"}),(0,p.jsx)("option",{value:"365",children:"Keep for 1 year"})]})]})]})]})]})})}}}]);