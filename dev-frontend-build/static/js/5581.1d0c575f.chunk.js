"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5581],{2597:(e,r,n)=>{n.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var t=n(4752),s=n(4414);const i=t.Ay.div`
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
`,a=t.Ay.button`
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
`,o=t.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:n,style:t}=e;return(0,s.jsx)(i,{className:n,style:t,children:r})},d=e=>{let{active:r,onClick:n,children:t,className:i}=e;return(0,s.jsx)(a,{active:r,onClick:n,className:i,children:t})},c=e=>{let{count:r,variant:n="default",showZero:t=!1}=e;return 0!==r||t?(0,s.jsx)(o,{variant:n,children:r}):null}},2653:(e,r,n)=>{n.d(r,{M:()=>i});var t=n(9950),s=n(4492);function i(e){const[r,n]=(0,s.ok)(),i=(0,t.useCallback)(()=>r.get("tab")||e,[r,e]),[a,o]=(0,t.useState)(i());return[a,(0,t.useCallback)(e=>{o(e),n({tab:e})},[n])]}},5581:(e,r,n)=>{n.r(r),n.d(r,{default:()=>J});var t=n(9950),s=n(4752),i=n(3832),a=n(4728),o=n(1721),l=n(5665),d=n(2597),c=n(2653),p=n(9610),x=n(7617),h=n(4414);const u=s.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,g=s.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,j=s.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,m=s.Ay.div`
  display: flex;
  gap: 8px;
`,y=s.Ay.div`
  display: grid;
  gap: 0;
`,f=s.Ay.div`
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
`,b=s.Ay.div``,v=s.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,F=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 12px;
`,k=s.Ay.div``,C=s.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,w=s.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,A=s.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`,B=s.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.variant){case"type":return"#DBEAFE";case"encrypted":return"#ECFDF5";case"compressed":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.variant){case"type":return"#1E40AF";case"encrypted":return"#059669";case"compressed":return"#D97706";default:return"#6B7280"}}};
`,E=s.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`,z=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"completed":return"#ECFDF5";case"in-progress":return"#DBEAFE";case"failed":return"#FEE2E2";case"scheduled":return"#FEF3C7";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"completed":return"#059669";case"in-progress":return"#1E40AF";case"failed":return"#DC2626";case"scheduled":return"#D97706";default:return"#6B7280"}}};
`,D=s.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,S=s.Ay.div`
  padding: 0;
`,$=s.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
  }
`,M=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`,T=s.Ay.div``,O=s.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,N=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,I=s.Ay.div`
  width: 100%;
  height: 8px;
  background: #F3F4F6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`,R=s.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: #635BFF;
  transition: width 0.3s ease;
`,K=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
`,U=s.Ay.div`
  margin-bottom: 20px;
`,q=s.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,H=s.Ay.input`
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
`,Y=s.Ay.textarea`
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
`,L=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.4;
`,P=s.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  overflow: hidden;
`,W=s.Ay.div`
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
`,Z=s.Ay.div`
  flex: 1;
`,_=s.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`,G=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,V=s.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
`,J=()=>{const[e,r]=(0,c.M)("backups"),[n,s]=(0,t.useState)([]),[J,Q]=(0,t.useState)([]),[X,ee]=(0,t.useState)(!1),[re,ne]=(0,t.useState)(!1),[te,se]=(0,t.useState)(!1),[,]=(0,t.useState)(null),[ie,ae]=(0,t.useState)("full"),[oe,le]=(0,t.useState)(""),[de,ce]=(0,t.useState)(!1),[pe,xe]=(0,t.useState)(0),[he,ue]=(0,t.useState)([]);(0,t.useEffect)(()=>{s([]),Q([])},[]);const ge=n.filter(e=>"completed"===e.status).length,je=n.filter(e=>"failed"===e.status).length,me=n.filter(e=>"completed"===e.status).reduce((e,r)=>e+r.size,0),ye=e=>{if(0===e)return"0 Bytes";const r=Math.floor(Math.log(e)/Math.log(1024));return parseFloat((e/Math.pow(1024,r)).toFixed(2))+" "+["Bytes","KB","MB","GB","TB"][r]},fe=e=>{const r=Math.floor(e/3600),n=Math.floor(e%3600/60),t=e%60;return r>0?`${r}h ${n}m ${t}s`:n>0?`${n}m ${t}s`:`${t}s`},be=e=>new Date(e).toLocaleString("en-MY"),ve=()=>{ee(!0)};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(i.mc,{children:[(0,h.jsxs)(i.Y9,{children:[(0,h.jsx)(i.hE,{children:"Backup & Restore"}),(0,h.jsxs)(i.ex,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{0!==n.filter(e=>"completed"===e.status).length&&se(!0)},children:"Download Backup"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ve,children:"Create Backup"})]})]}),(0,h.jsxs)(i.UC,{children:[(0,h.jsxs)(l.MD,{children:[(0,h.jsxs)(l.hI,{color:"#059669",children:[(0,h.jsx)(l.Os,{children:n.length}),(0,h.jsx)(l.v0,{children:"Total Backups"})]}),(0,h.jsxs)(l.hI,{color:"#2563EB",children:[(0,h.jsx)(l.Os,{children:ge}),(0,h.jsx)(l.v0,{children:"Successful Backups"})]}),(0,h.jsxs)(l.hI,{color:"#DC2626",children:[(0,h.jsx)(l.Os,{children:je}),(0,h.jsx)(l.v0,{children:"Failed Backups"})]}),(0,h.jsxs)(l.hI,{color:"#7C3AED",children:[(0,h.jsx)(l.Os,{children:ye(me)}),(0,h.jsx)(l.v0,{children:"Total Storage Used"})]})]}),(0,h.jsxs)(d.tU,{children:[(0,h.jsx)(d.oz,{active:"backups"===e,onClick:()=>r("backups"),children:"Backup History"}),(0,h.jsx)(d.oz,{active:"restore"===e,onClick:()=>r("restore"),children:"Restore Operations"}),(0,h.jsx)(d.oz,{active:"schedule"===e,onClick:()=>r("schedule"),children:"Backup Schedule"})]}),(0,h.jsxs)(u,{children:["backups"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(j,{children:"Backup History"}),(0,h.jsxs)(m,{children:[(0,h.jsx)(a.SC,{variant:"secondary",onClick:()=>{const e=n.filter(e=>{const r=new Date(e.createdAt),n=new Date;return n.setDate(n.getDate()-30),r<n&&"completed"===e.status});0!==e.length&&(ue(e),xe(e.length),ce(!0))},children:"Cleanup Old Backups"}),(0,h.jsx)(a.SC,{variant:"primary",onClick:ve,children:"New Backup"})]})]}),(0,h.jsx)(y,{children:n.map(e=>(0,h.jsxs)(f,{status:e.status,children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(v,{children:e.name}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)(C,{children:"Size"}),(0,h.jsx)(w,{children:ye(e.size)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(C,{children:"Duration"}),(0,h.jsx)(w,{children:e.duration>0?fe(e.duration):"N/A"})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(C,{children:"Created"}),(0,h.jsx)(w,{children:be(e.createdAt)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)(C,{children:"Tables"}),(0,h.jsxs)(w,{children:[e.tables.length," tables"]})]})]}),e.description&&(0,h.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"8px"},children:e.description}),(0,h.jsxs)(A,{children:[(0,h.jsx)(B,{variant:"type",children:e.type}),e.encrypted&&(0,h.jsx)(B,{variant:"encrypted",children:"Encrypted"}),e.compressed&&(0,h.jsx)(B,{variant:"compressed",children:"Compressed"})]})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(z,{status:e.status,children:e.status}),"completed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{variant:"primary",children:"Restore"}),(0,h.jsx)(D,{children:"Download"}),(0,h.jsx)(D,{variant:"danger",children:"Delete"})]}),"failed"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{variant:"primary",children:"Retry"}),(0,h.jsx)(D,{variant:"danger",children:"Delete"})]}),"scheduled"===e.status&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(D,{children:"Edit Schedule"}),(0,h.jsx)(D,{variant:"danger",children:"Cancel"})]})]})]},e.id))})]}),"restore"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:(0,h.jsx)(j,{children:"Restore Operations"})}),(0,h.jsxs)(S,{children:[J.map(e=>(0,h.jsxs)($,{children:[(0,h.jsxs)(M,{children:[(0,h.jsxs)(T,{children:[(0,h.jsxs)(O,{children:["Restoring: ",e.backupName]}),(0,h.jsxs)(N,{children:["Started: ",be(e.startedAt)," |",e.completedAt&&` Completed: ${be(e.completedAt)}`]})]}),(0,h.jsx)(z,{status:e.status,children:e.status})]}),(0,h.jsx)(I,{children:(0,h.jsx)(R,{percentage:e.progress})}),(0,h.jsxs)(K,{children:[(0,h.jsxs)("span",{children:[e.restoredTables.length," of ",e.totalTables," tables restored"]}),(0,h.jsxs)("span",{children:[e.progress,"%"]})]}),e.errorMessage&&(0,h.jsxs)("div",{style:{color:"#DC2626",fontSize:"12px",marginTop:"8px"},children:["Error: ",e.errorMessage]})]},e.id)),0===J.length&&(0,h.jsx)("div",{style:{textAlign:"center",color:"#6B7280",padding:"40px"},children:"No restore operations in progress"})]})]}),"schedule"===e&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(j,{children:"Backup Schedule"}),(0,h.jsx)(m,{children:(0,h.jsx)(a.SC,{variant:"primary",onClick:()=>{ne(!0)},children:"Add Schedule"})})]}),(0,h.jsxs)("div",{style:{padding:"24px",textAlign:"center",color:"#6B7280"},children:["Backup scheduling configuration will be implemented here.",(0,h.jsx)("br",{}),"Features: Daily/Weekly/Monthly schedules, retention policies, notification settings."]})]})]}),(0,h.jsxs)(p.aF,{isOpen:X,onClose:()=>ee(!1),title:"Create New Backup",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{const e={id:`backup-${Date.now()}`,name:`${ie.charAt(0).toUpperCase()+ie.slice(1)} Backup - ${(new Date).toLocaleDateString()}`,type:ie,size:0,createdAt:(new Date).toISOString().replace("T"," ").slice(0,19),status:"in-progress",duration:0,location:`s3://orderhere-backups/${ie}-${(new Date).toISOString().split("T")[0]}.sql.gz`,description:oe||`${ie} backup created manually`,tables:"full"===ie?["users","restaurants","orders","menu_items","payments","subscriptions","invoices"]:["orders","payments","order_items"],compressed:!0,encrypted:!0};s([e,...n]),ee(!1),le(""),setTimeout(()=>{s(r=>r.map(r=>r.id===e.id?{...r,status:"completed",duration:Math.floor(1800*Math.random())+300,size:Math.floor(1e9*Math.random())+1e8}:r))},3e3)},children:"Create Backup"})]}),children:[(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{value:ie,onChange:e=>ae(e.target.value),children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"}),(0,h.jsx)("option",{value:"differential",children:"Differential Backup"})]}),(0,h.jsx)(L,{children:"Full: Complete database backup. Incremental: Only changes since last backup. Differential: Changes since last full backup."})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Description (Optional)"}),(0,h.jsx)(Y,{value:oe,onChange:e=>le(e.target.value),placeholder:"Enter a description for this backup...",rows:3})]})]}),(0,h.jsxs)(p.aF,{isOpen:te,onClose:()=>se(!1),title:"Download Backup",footer:(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),children:[(0,h.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a backup to download:"}),(0,h.jsx)(P,{children:n.filter(e=>"completed"===e.status).map(e=>(0,h.jsxs)(W,{onClick:()=>(e=>{const r=document.createElement("a");r.href="#",r.download=`${e.name.replace(/[^a-zA-Z0-9]/g,"-")}.sql.gz`,document.body.appendChild(r),r.click(),document.body.removeChild(r),se(!1)})(e),children:[(0,h.jsxs)(Z,{children:[(0,h.jsx)(_,{children:e.name}),(0,h.jsxs)(G,{children:[ye(e.size)," \u2022 ",be(e.createdAt)]})]}),(0,h.jsx)(V,{children:ye(e.size)})]},e.id))})]}),(0,h.jsxs)(p.aF,{isOpen:re,onClose:()=>ne(!1),title:"Add Backup Schedule",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:()=>{alert("Backup schedule created successfully!"),ne(!1)},children:"Create Schedule"})]}),children:[(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Schedule Name"}),(0,h.jsx)(H,{type:"text",placeholder:"e.g., Daily Full Backup"})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Backup Type"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"full",children:"Full Backup"}),(0,h.jsx)("option",{value:"incremental",children:"Incremental Backup"})]})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Frequency"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"daily",children:"Daily"}),(0,h.jsx)("option",{value:"weekly",children:"Weekly"}),(0,h.jsx)("option",{value:"monthly",children:"Monthly"})]})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Time"}),(0,h.jsx)(H,{type:"time",defaultValue:"02:00"})]}),(0,h.jsxs)(U,{children:[(0,h.jsx)(q,{children:"Retention Policy"}),(0,h.jsxs)(o.mM,{children:[(0,h.jsx)("option",{value:"7",children:"Keep for 7 days"}),(0,h.jsx)("option",{value:"30",children:"Keep for 30 days"}),(0,h.jsx)("option",{value:"90",children:"Keep for 90 days"}),(0,h.jsx)("option",{value:"365",children:"Keep for 1 year"})]})]})]})]})]}),(0,h.jsx)(x.A,{isOpen:de,title:"Cleanup Old Backups",message:`This will delete ${pe} backups older than 30 days. Continue?`,onConfirm:()=>{const e=n.filter(e=>!he.includes(e));s(e),ce(!1),ue([])},onCancel:()=>{ce(!1),ue([])},confirmText:"Delete",cancelText:"Cancel",type:"warning"})]})}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var t=n(4752),s=n(9610),i=n(4414);const a=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=t.Ay.div`
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
`,x=e=>{let{isOpen:r,title:n,message:t,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:j="warning"}=e;return r?(0,i.jsx)(s.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(o,{children:[(0,i.jsx)(l,{children:n}),(0,i.jsx)(d,{children:t})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,i.jsx)(p,{variant:"primary",type:j,onClick:x,children:u})]})]})}):null}}}]);