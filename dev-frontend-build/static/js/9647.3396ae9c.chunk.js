"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{1472:(e,t,n)=>{n.d(t,{A:()=>o});n(9950);var r=n(9610),i=n(4414);const o=e=>{let{isOpen:t,onClose:n,onConfirm:o,title:a,message:s,confirmText:l="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const x=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.yl,{variant:"secondary",onClick:n,children:d}),(0,i.jsx)(r.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:l})]});return(0,i.jsx)(r.aF,{isOpen:t,onClose:n,title:a,footer:x,children:(0,i.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,i.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,i.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:s})]})})}},2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var r=n(4752),i=n(4414);const o=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,a=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,l=e=>{let{children:t,className:n,style:r,...a}=e;return(0,i.jsx)(o,{className:n,style:r,...a,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,i.jsx)(a,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,i.jsx)(s,{...n,children:t})}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`;r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},9647:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var r=n(9950),i=n(4752),o=n(3310),a=n(3705),s=n(9610),l=n(1472),d=n(2674),c=n(2488),x=n(4414);const p=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 16px;
`,h=i.Ay.button`
  padding: 10px 20px;
  border: none;
  background: ${e=>e.active?"#635BFF":"transparent"};
  color: ${e=>e.active?"white":"#6B7280"};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#635BFF":"#F3F4F6"};
  }
`,u=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`,g=i.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  background: ${e=>e.active?"#F0EFFF":"white"};
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
  }
`,b=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,m=i.Ay.div`
  display: grid;
  gap: 12px;
`,v=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,y=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,j=i.Ay.div`
  flex: 1;
`,f=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,w=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,C=i.Ay.div`
  display: flex;
  gap: 8px;
`,A=i.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
  }
`,k=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  h3 {
    font-size: 18px;
    color: #1F2937;
    margin: 16px 0 8px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin-bottom: 24px;
  }
`,F=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
`,B=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,z=i.Ay.div`
  display: flex;
  gap: 12px;
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,T=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,$=i.Ay.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,D=i.Ay.div`
  border: 2px dashed #E5E7EB;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: #F9FAFB;
  }

  img {
    max-width: 200px;
    max-height: 150px;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  p {
    color: #6B7280;
    font-size: 14px;
    margin: 0;
  }
`,_=()=>{const[e,t]=(0,r.useState)("blog"),[n,i]=(0,r.useState)("contents"),[_,I]=(0,r.useState)([]),[P,L]=(0,r.useState)([]),[Q,N]=(0,r.useState)(!0),[O,R]=(0,r.useState)(""),[U,J]=(0,r.useState)("all"),[q,H]=(0,r.useState)("all"),[M,W]=(0,r.useState)(!1),[Z,Y]=(0,r.useState)(null),[V,X]=(0,r.useState)(!1),[G,K]=(0,r.useState)(null),[ee,te]=(0,r.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[ne,re]=(0,r.useState)("");(0,r.useEffect)(()=>{ie()},[e]);const ie=async()=>{N(!0);try{const t={Authorization:`Bearer ${localStorage.getItem("token")}`},[n,r]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(n.ok){const e=await n.json();I(e)}if(r.ok){const e=await r.json();L(e.items||[])}}catch(t){console.error("Error fetching data:",t)}N(!1)},oe=async()=>{if(null!==Z&&void 0!==Z&&Z.title&&null!==Z&&void 0!==Z&&Z.content&&null!==Z&&void 0!==Z&&Z.category_id)try{const t=localStorage.getItem("token"),n=!Z.id;(await fetch(n?"/api/contents":`/api/contents/${Z.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({type:e,category_id:Z.category_id,title:Z.title,content:Z.content,excerpt:Z.excerpt,thumbnail_url:Z.thumbnail_url,status:Z.status||"draft"})})).ok&&(re(n?"Content created successfully":"Content updated successfully"),W(!1),Y(null),ie(),setTimeout(()=>re(""),3e3))}catch(t){console.error("Error saving content:",t)}else alert("Please fill in all required fields")},ae=P.filter(e=>!(O&&!e.title.toLowerCase().includes(O.toLowerCase()))&&(("all"===U||e.status===U)&&("all"===q||e.category_id===parseInt(q)))),se={total:P.length,published:P.filter(e=>"published"===e.status).length,draft:P.filter(e=>"draft"===e.status).length,categories:_.length};var le;return M?(0,x.jsx)(o.A,{children:(0,x.jsx)(d.mc,{children:(0,x.jsxs)(F,{children:[(0,x.jsxs)(E,{children:[(0,x.jsxs)(B,{children:[null!==Z&&void 0!==Z&&Z.id?"Edit":"New"," ","blog"===e?"Blog Post":"FAQ Item"]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(a.cc,{variant:"secondary",onClick:()=>{W(!1),Y(null)},children:"Cancel"}),(0,x.jsx)(a.cc,{variant:"secondary",onClick:()=>{Y({...Z,status:"draft"}),oe()},children:"Save as Draft"}),(0,x.jsx)(a.cc,{onClick:()=>{Y({...Z,status:"published"}),oe()},children:"Publish"})]})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(T,{children:[(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Title *"}),(0,x.jsx)(s.ZQ,{value:(null===Z||void 0===Z?void 0:Z.title)||"",onChange:e=>Y({...Z,title:e.target.value}),placeholder:"blog"===e?"Enter post title":"Enter question"})]}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Category *"}),(0,x.jsxs)(c.Jt,{value:(null===Z||void 0===Z||null===(le=Z.category_id)||void 0===le?void 0:le.toString())||"",onChange:e=>Y({...Z,category_id:parseInt(e.target.value)}),children:[(0,x.jsx)("option",{value:"",children:"Select category"}),_.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===e&&(0,x.jsxs)(T,{children:[(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Excerpt"}),(0,x.jsx)(s.Lz,{value:(null===Z||void 0===Z?void 0:Z.excerpt)||"",onChange:e=>Y({...Z,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Thumbnail"}),(0,x.jsxs)(D,{children:[null!==Z&&void 0!==Z&&Z.thumbnail_url?(0,x.jsx)("img",{src:Z.thumbnail_url,alt:"Thumbnail"}):(0,x.jsx)("p",{children:"Click to upload thumbnail image"}),(0,x.jsx)(s.ZQ,{type:"text",value:(null===Z||void 0===Z?void 0:Z.thumbnail_url)||"",onChange:e=>Y({...Z,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"blog"===e?"Content *":"Answer *"}),(0,x.jsx)($,{value:(null===Z||void 0===Z?void 0:Z.content)||"",onChange:e=>Y({...Z,content:e.target.value}),placeholder:"blog"===e?"Write your blog post content...":"Write the answer to this question..."})]})]})]})})}):(0,x.jsxs)(o.A,{children:[(0,x.jsxs)(d.mc,{children:[(0,x.jsxs)(d.Y9,{children:[(0,x.jsx)(d.hE,{children:"Content Management"}),(0,x.jsx)(d.ex,{children:"categories"===n?(0,x.jsx)(a.cc,{onClick:()=>{K({type:e}),X(!0)},children:"+ Add Category"}):(0,x.jsxs)(a.cc,{onClick:()=>{Y({type:e}),W(!0)},children:["+ New ","blog"===e?"Post":"FAQ"]})})]}),ne&&(0,x.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:ne}),(0,x.jsxs)(d.UC,{children:[(0,x.jsxs)(p,{children:[(0,x.jsx)(h,{active:"blog"===e,onClick:()=>t("blog"),children:"Blog"}),(0,x.jsx)(h,{active:"faq"===e,onClick:()=>t("faq"),children:"FAQ"})]}),(0,x.jsxs)(u,{children:[(0,x.jsx)(g,{active:"contents"===n,onClick:()=>i("contents"),children:"blog"===e?"Posts":"Questions"}),(0,x.jsx)(g,{active:"categories"===n,onClick:()=>i("categories"),children:"Categories"})]}),"categories"===n?(0,x.jsx)(m,{children:0===_.length?(0,x.jsxs)(k,{children:[(0,x.jsx)("h3",{children:"No categories yet"}),(0,x.jsxs)("p",{children:["Create your first category to organize your ","blog"===e?"blog posts":"FAQ items"]}),(0,x.jsx)(a.cc,{onClick:()=>{K({type:e}),X(!0)},children:"+ Add Category"})]}):_.map(t=>(0,x.jsxs)(v,{isActive:t.is_active,children:[(0,x.jsx)(y,{children:t.icon||"\ud83d\udcc1"}),(0,x.jsxs)(j,{children:[(0,x.jsx)(f,{children:t.name}),(0,x.jsxs)(w,{children:[t.content_count," ","blog"===e?"posts":"items"," \u2022 ",t.description||"No description"]})]}),(0,x.jsxs)(C,{children:[(0,x.jsx)(A,{onClick:()=>{K(t),X(!0)},children:(0,x.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,x.jsx)(A,{onClick:()=>(async e=>{te({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("token"),n=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(n.ok)re("Category deleted successfully"),ie(),setTimeout(()=>re(""),3e3);else{const e=await n.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}te({...ee,show:!1})}})})(t.id),children:(0,x.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,x.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},t.id))}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d.MD,{children:[(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:se.total}),(0,x.jsxs)(d.v0,{children:["Total ","blog"===e?"Posts":"FAQs"]})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:se.published}),(0,x.jsx)(d.v0,{children:"Published"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:se.draft}),(0,x.jsx)(d.v0,{children:"Drafts"})]}),(0,x.jsxs)(d.hI,{children:[(0,x.jsx)(d.Os,{children:se.categories}),(0,x.jsx)(d.v0,{children:"Categories"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{type:"text",placeholder:"Search...",value:O,onChange:e=>R(e.target.value)}),(0,x.jsxs)(c.Jt,{value:U,onChange:e=>J(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"published",children:"Published"}),(0,x.jsx)("option",{value:"draft",children:"Draft"})]}),(0,x.jsxs)(c.Jt,{value:q,onChange:e=>H(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Categories"}),_.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),0===ae.length?(0,x.jsxs)(k,{children:[(0,x.jsx)("h3",{children:"No content yet"}),(0,x.jsxs)("p",{children:["Create your first ","blog"===e?"blog post":"FAQ item"]}),(0,x.jsxs)(a.cc,{onClick:()=>{Y({type:e}),W(!0)},children:["+ New ","blog"===e?"Post":"FAQ"]})]}):(0,x.jsxs)(d.XI,{children:[(0,x.jsxs)(d.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,x.jsx)("span",{children:"Title"}),(0,x.jsx)("span",{children:"Category"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Date"}),(0,x.jsx)("span",{children:"Actions"})]}),ae.map(t=>{var n,r;return(0,x.jsxs)(d.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("strong",{children:t.title}),"blog"===e&&t.view_count>0&&(0,x.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[t.view_count," views"]})]}),(0,x.jsxs)("div",{children:[null===(n=t.category)||void 0===n?void 0:n.icon," ",null===(r=t.category)||void 0===r?void 0:r.name]}),(0,x.jsx)("div",{children:(0,x.jsx)(b,{status:t.status,children:t.status.charAt(0).toUpperCase()+t.status.slice(1)})}),(0,x.jsx)("div",{children:new Date(t.updated_at).toLocaleDateString()}),(0,x.jsxs)(d.wr,{children:[(0,x.jsx)(d.rA,{onClick:()=>{Y(t),W(!0)},children:"Edit"}),(0,x.jsx)(d.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("token"),n="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===n?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),re("published"===n?"Content published":"Content unpublished"),ie(),setTimeout(()=>re(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(t),children:"published"===t.status?"Unpublish":"Publish"}),(0,x.jsx)(d.rA,{onClick:()=>(async e=>{te({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),re("Content deleted successfully"),ie(),setTimeout(()=>re(""),3e3)}catch(t){console.error("Error deleting content:",t)}te({...ee,show:!1})}})})(t.id),className:"danger",children:"Delete"})]})]},t.id)})]})]})]})]}),V&&(0,x.jsxs)(s.aF,{onClose:()=>{X(!1),K(null)},children:[(0,x.jsx)("h2",{children:null!==G&&void 0!==G&&G.id?"Edit Category":"New Category"}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Name *"}),(0,x.jsx)(s.ZQ,{value:(null===G||void 0===G?void 0:G.name)||"",onChange:e=>K({...G,name:e.target.value}),placeholder:"Category name"})]}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Icon (emoji)"}),(0,x.jsx)(s.ZQ,{value:(null===G||void 0===G?void 0:G.icon)||"",onChange:e=>K({...G,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,x.jsxs)(s.gE,{children:[(0,x.jsx)(s.lR,{children:"Description"}),(0,x.jsx)(s.Lz,{value:(null===G||void 0===G?void 0:G.description)||"",onChange:e=>K({...G,description:e.target.value}),placeholder:"Brief description",rows:3})]}),(0,x.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,x.jsx)(s.yl,{variant:"secondary",onClick:()=>{X(!1),K(null)},children:"Cancel"}),(0,x.jsx)(s.yl,{onClick:async()=>{if(null!==G&&void 0!==G&&G.name)try{const t=localStorage.getItem("token"),n=!G.id;(await fetch(n?"/api/contents/categories":`/api/contents/categories/${G.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({type:e,name:G.name,description:G.description,icon:G.icon})})).ok&&(re(n?"Category created successfully":"Category updated successfully"),X(!1),K(null),ie(),setTimeout(()=>re(""),3e3))}catch(t){console.error("Error saving category:",t)}},children:null!==G&&void 0!==G&&G.id?"Update":"Create"})]})]}),(0,x.jsx)(l.A,{isOpen:ee.show,title:ee.title,message:ee.message,onConfirm:ee.onConfirm,onCancel:()=>te({...ee,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);