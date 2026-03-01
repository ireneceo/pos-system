"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{5581:(e,r,s)=>{s.r(r),s.d(r,{default:()=>W});var t=s(8819),n=s(9950),l=s(4752),i=s(3832),a=s(4728),o=s(1721),c=s(5665),d=s(2674),p=s(9610),h=s(4414);const u=l.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${t.w.colors.border};
  overflow: hidden;
`,x=l.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid ${t.w.colors.border};
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,j=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,g=l.Ay.div`
  display: flex;
  gap: 8px;
`,m=l.Ay.div`
  display: grid;
  gap: 0;
`,y=l.Ay.div`
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
`,f=l.Ay.div``,b=l.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,v=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,k=l.Ay.div``,F=l.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,w=l.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,A=l.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,C=l.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,B=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,E=l.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,$=l.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?`\n    background: ${t.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":`\n    background: transparent;\n    color: ${t.w.colors.text.muted};\n    border-color: ${t.w.colors.border};\n    \n    &:hover {\n      background: ${t.w.colors.surfaceHover};\n      color: ${t.w.colors.secondary};\n    }\n  `}
`,S=l.Ay.div`
  padding: 0;
`,D=l.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${t.w.colors.border};

  &:last-child {
    border-bottom: none;
  }
`,z=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,M=l.Ay.div``,O=l.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
`,R=l.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  margin-top: 2px;
`,T=l.Ay.div`
  width: 100%;
  height: 8px;
  background: ${t.w.colors.surfaceMuted};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`,I=l.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: ${t.w.colors.primary};
  transition: width 0.3s ease;
`,N=l.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  display: flex;
  justify-content: space-between;
`,K=l.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  margin-top: 4px;
  line-height: 1.4;
`,q=l.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,H=l.Ay.div`
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
`,L=l.Ay.div`
  flex: 1;
`,U=l.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,Z=l.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,Q=l.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,W=()=>{const[e,r]=(0,n.useState)("backups"),[s,t]=(0,n.useState)([]),[l,W]=(0,n.useState)([]),[Y,_]=(0,n.useState)(!1),[G,P]=(0,n.useState)(!1),[V,J]=(0,n.useState)(!1),[,]=(0,n.useState)(null),[X,ee]=(0,n.useState)("full"),[re,se]=(0,n.useState)("");(0,n.useEffect)(()=>{t([]),W([])},[]);const te=s.filter(e=>"completed"===e.status).length,ne=s.filter(e=>"failed"===e.status).length,le=s.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),ie=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},ae=e=>{const r=Math.floor(e/3600),s=Math.floor(e%3600/60),t=e%60;return r>0?`${r}h ${s}m ${t}s`:s>0?`${s}m ${t}s`:`${t}s`},oe=e=>new Date(e).toLocaleString("en-MY"),ce=()=>{_(!0)};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(i.mc,{children:[(0,h.jsxs)(i.Y9,{children:[(0,h.jsx)(i.hE,{children:"Backup & Restore"}),(0,h.jsxs)(i.ex,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{0!==s.filter(e=>"completed"===e.status).length?J(!0):alert("No completed backups available for download.")},children:"Download Backup"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ce,children:"Create Backup"})]})]}),(0,h.jsxs)(i.UC,{children:[(0,h.jsxs)(c.MD,{children:[(0,h.jsxs)(c.hI,{color:"#059669",children:[(0,h.jsx)(c.Os,{children:s.length}),(0,h.jsx)(c.v0,{children:"Total Backups"})]}),(0,h.jsxs)(c.hI,{color:"#2563EB",children:[(0,h.jsx)(c.Os,{children:te}),(0,h.jsx)(c.v0,{children:"Successful Backups"})]}),(0,h.jsxs)(c.hI,{color:"#DC2626",children:[(0,h.jsx)(c.Os,{children:ne}),(0,h.jsx)(c.v0,{children:"Failed Backups"})]}),(0,h.jsxs)(c.hI,{color:"#7C3AED",children:[(0,h.jsx)(c.Os,{children:ie(le)}),(0,h.jsx)(c.v0,{children:"Total Storage Used"})]})]}),(0,h.jsxs)(d.j,{children:[(0,h.jsx)(d.oz,{active:"backups"===e,onClick:()=>r("backups"),children:"Backup History"}),(0,h.jsx)(d.oz,{active:"restore"===e,onClick:()=>r("restore"),children:"Restore Operations"}),(0,h.jsx)(d.oz,{active:"schedule"===e,onClick:()=>r("schedule"),children:"Backup Schedule"})]}),(0,h.jsxs)(u,{children:["backups"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x,{children:[(0,h.jsx)(j,{children:"Backup History"}),(0,h.jsxs)(g,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{const e=s.filter(e=>{const r=new Date(e.createdAt),s=new Date;return s.setDate(s.getDate()-30),r<s&&"completed"===e.status});if(0!==e.length){if(confirm(`This will delete ${e.length} backups older than 30 days. Continue?`)){const r=s.filter(r=>!e.includes(r));t(r),alert(`Successfully cleaned up ${e.length} old backups.`)}}else alert("No old backups found to clean up.")},children:"Cleanup Old Backups"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ce,children:"New Backup"})]})]}),(0,h.jsx)(m,{children:s.map(e=>(0,h.jsxs)(y,{status:e.status,children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Size"}),(0,h.jsx)(w,{children:ie(e.size)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Duration"}),(0,h.jsx)(w,{children:e.duration>0?ae(e.duration):"N/A"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Created"}),(0,h.jsx)(w,{children:oe(e.createdAt)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(F,{children:"Tables"}),(0,h.jsxs)(w,{children:[e.tables.length," tables"]})]})]}),e.description&&(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:e.description}),(0,h.jsxs)(A,{children:[(0,h.jsx)(C,{variant:"type",children:e.type}),e.encrypted&&(0,h.jsx)(C,{variant:"encrypted",children:"Encrypted"}),e.compressed&&(0,h.jsx)(C,{variant:"compressed",children:"Compressed"})]})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)(E,{status:e.status,children:e.status}),"completed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{variant:"primary",children:"Restore"}),(0,h.jsx)($,{children:"Download"}),(0,h.jsx)($,{variant:"danger",children:"Delete"})]}),"failed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{variant:"primary",children:"Retry"}),(0,h.jsx)($,{variant:"danger",children:"Delete"})]}),"scheduled"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)($,{children:"Edit Schedule"}),(0,h.jsx)($,{variant:"danger",children:"Cancel"})]})]})]},e.id))})]}),"restore"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(x,{children:(0,h.jsx)(j,{children:"Restore Operations"})}),(0,h.jsxs)(S,{children:[l.map(e=>(0,h.jsxs)(D,{children:[(0,h.jsxs)(z,{children:[(0,h.jsxs)(M,{children:[(0,h.jsxs)(O,{children:["Restoring: ",e.backupName]}),(0,h.jsxs)(R,{children:["Started: ",oe(e.startedAt)," |",e.completedAt&&` Completed: ${oe(e.completedAt)}`]})]}),(0,h.jsx)(E,{status:e.status,children:e.status})]}),(0,h.jsx)(T,{children:(0,h.jsx)(I,{percentage:e.progress})}),(0,h.jsxs)(N,{children:[(0,h.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,h.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,h.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===l.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x,{children:[(0,h.jsx)(j,{children:"Backup Schedule"}),(0,h.jsx)(g,{children:(0,h.jsx)(a.SC,{variant:"primary",onClick:()=>{P(!0)},children:"Add Schedule"})})]}),(0,h.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,h.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,h.jsxs)(p.aF,{isOpen:Y,onClose:()=>_(!1),title:"Create New Backup",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${X.charAt(0).toUpperCase()+X.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:X,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${X}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:re||`${X} backup created manually`,tables:"full"===X?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};t([e,...s]),_(!1),se(""),setTimeout(()=>{t(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r)),alert("Backup completed successfully!")},3e3)},children:"Create Backup"})]}),children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{value:X,onChange:e=>ee(e.target.value),children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"}),(0,h.jsx)("option",{value:"differential",children:"Differential Backup"})]}),(0,h.jsx)(K,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Description (Optional)"}),(0,h.jsx)(d.Lz,{value:re,onChange:e=>se(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,h.jsxs)(p.aF,{isOpen:V,onClose:()=>J(!1),title:"Download Backup",footer:(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,h.jsx)(q,{children:s.filter(e=>"completed"===e.status).map(e=>(0,h.jsxs)(H,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),alert(`Starting download of ${e.name}...`),J(!1)})(e),children:[(0,h.jsxs)(L,{children:[(0,h.jsx)(U,{children:e.name}),(0,h.jsxs)(Z,{children:[ie(e.size)," \u2022 ",oe(e.createdAt)]})]}),(0,h.jsx)(Q,{children:ie(e.size)})]},e.id))})]}),(0,h.jsxs)(p.aF,{isOpen:G,onClose:()=>P(!1),title:"Add Backup Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>P(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),P(!1)},children:"Create Schedule"})]}),children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Schedule Name"}),(0,h.jsx)(d.ZQ,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Frequency"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"daily",children:"Daily"}),(0,h.jsx)("option",{value:"weekly",children:"Weekly"}),(0,h.jsx)("option",{value:"monthly",children:"Monthly"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Time"}),(0,h.jsx)(d.ZQ,{type:"time",defaultValue:"02:00"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Retention Policy"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"7",children:"Keep for 7 days"}),(0,h.jsx)("option",{value:"30",children:"Keep for 30 days"}),(0,h.jsx)("option",{value:"90",children:"Keep for 90 days"}),(0,h.jsx)("option",{value:"365",children:"Keep for 1 year"})]})]})]})]})]})})}}}]);