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
`},9647:(e,t,n)=>{n.r(t),n.d(t,{default:()=>$});var r=n(9950),i=n(4752),o=n(3310),a=n(3705),s=n(9610),l=n(1472),d=n(2674),c=n(1313),x=n(2488),p=n(4414);const h=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`,u=i.Ay.button`
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
`,g=i.Ay.span`
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
`,b=i.Ay.div`
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
`,j=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,y=i.Ay.div`
  flex: 1;
`,v=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=i.Ay.div`
  display: flex;
  gap: 8px;
`,C=i.Ay.button`
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
`,A=i.Ay.div`
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
`,k=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
`,E=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,B=i.Ay.div`
  display: flex;
  gap: 12px;
`,z=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,T=i.Ay.textarea`
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
`,$=()=>{const[e,t]=(0,r.useState)("blog"),[n,i]=(0,r.useState)("contents"),[$,_]=(0,r.useState)([]),[I,P]=(0,r.useState)([]),[L,Q]=(0,r.useState)(!0),[N,O]=(0,r.useState)(""),[R,U]=(0,r.useState)("all"),[J,q]=(0,r.useState)("all"),[H,M]=(0,r.useState)(!1),[W,Z]=(0,r.useState)(null),[Y,V]=(0,r.useState)(!1),[X,G]=(0,r.useState)(null),[K,ee]=(0,r.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[te,ne]=(0,r.useState)("");(0,r.useEffect)(()=>{re()},[e]);const re=async()=>{Q(!0);try{const t={Authorization:`Bearer ${localStorage.getItem("token")}`},[n,r]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(n.ok){const e=await n.json();_(e)}if(r.ok){const e=await r.json();P(e.items||[])}}catch(t){console.error("Error fetching data:",t)}Q(!1)},ie=async()=>{if(null!==W&&void 0!==W&&W.title&&null!==W&&void 0!==W&&W.content&&null!==W&&void 0!==W&&W.category_id)try{const t=localStorage.getItem("token"),n=!W.id;(await fetch(n?"/api/contents":`/api/contents/${W.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({type:e,category_id:W.category_id,title:W.title,content:W.content,excerpt:W.excerpt,thumbnail_url:W.thumbnail_url,status:W.status||"draft"})})).ok&&(ne(n?"Content created successfully":"Content updated successfully"),M(!1),Z(null),re(),setTimeout(()=>ne(""),3e3))}catch(t){console.error("Error saving content:",t)}else alert("Please fill in all required fields")},oe=I.filter(e=>!(N&&!e.title.toLowerCase().includes(N.toLowerCase()))&&(("all"===R||e.status===R)&&("all"===J||e.category_id===parseInt(J)))),ae={total:I.length,published:I.filter(e=>"published"===e.status).length,draft:I.filter(e=>"draft"===e.status).length,categories:$.length};var se;return H?(0,p.jsx)(o.A,{children:(0,p.jsx)(d.mc,{children:(0,p.jsxs)(k,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(E,{children:[null!==W&&void 0!==W&&W.id?"Edit":"New"," ","blog"===e?"Blog Post":"FAQ Item"]}),(0,p.jsxs)(B,{children:[(0,p.jsx)(a.cc,{variant:"secondary",onClick:()=>{M(!1),Z(null)},children:"Cancel"}),(0,p.jsx)(a.cc,{variant:"secondary",onClick:()=>{Z({...W,status:"draft"}),ie()},children:"Save as Draft"}),(0,p.jsx)(a.cc,{onClick:()=>{Z({...W,status:"published"}),ie()},children:"Publish"})]})]}),(0,p.jsxs)(z,{children:[(0,p.jsxs)(S,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Title *"}),(0,p.jsx)(s.ZQ,{value:(null===W||void 0===W?void 0:W.title)||"",onChange:e=>Z({...W,title:e.target.value}),placeholder:"blog"===e?"Enter post title":"Enter question"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Category *"}),(0,p.jsxs)(x.Jt,{value:(null===W||void 0===W||null===(se=W.category_id)||void 0===se?void 0:se.toString())||"",onChange:e=>Z({...W,category_id:parseInt(e.target.value)}),children:[(0,p.jsx)("option",{value:"",children:"Select category"}),$.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===e&&(0,p.jsxs)(S,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Excerpt"}),(0,p.jsx)(s.Lz,{value:(null===W||void 0===W?void 0:W.excerpt)||"",onChange:e=>Z({...W,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Thumbnail"}),(0,p.jsxs)(D,{children:[null!==W&&void 0!==W&&W.thumbnail_url?(0,p.jsx)("img",{src:W.thumbnail_url,alt:"Thumbnail"}):(0,p.jsx)("p",{children:"Click to upload thumbnail image"}),(0,p.jsx)(s.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.thumbnail_url)||"",onChange:e=>Z({...W,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"blog"===e?"Content *":"Answer *"}),(0,p.jsx)(T,{value:(null===W||void 0===W?void 0:W.content)||"",onChange:e=>Z({...W,content:e.target.value}),placeholder:"blog"===e?"Write your blog post content...":"Write the answer to this question..."})]})]})]})})}):(0,p.jsxs)(o.A,{children:[(0,p.jsxs)(d.mc,{children:[(0,p.jsxs)(d.Y9,{children:[(0,p.jsx)(d.hE,{children:"Content Management"}),(0,p.jsx)(d.ex,{children:"categories"===n?(0,p.jsx)(a.cc,{onClick:()=>{G({type:e}),V(!0)},children:"+ Add Category"}):(0,p.jsxs)(a.cc,{onClick:()=>{Z({type:e}),M(!0)},children:["+ New ","blog"===e?"Post":"FAQ"]})})]}),te&&(0,p.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:te}),(0,p.jsxs)(d.UC,{children:[(0,p.jsxs)(c.j,{children:[(0,p.jsx)(c.oz,{active:"blog"===e,onClick:()=>t("blog"),children:"Blog"}),(0,p.jsx)(c.oz,{active:"faq"===e,onClick:()=>t("faq"),children:"FAQ"})]}),(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{active:"contents"===n,onClick:()=>i("contents"),children:"blog"===e?"Posts":"Questions"}),(0,p.jsx)(u,{active:"categories"===n,onClick:()=>i("categories"),children:"Categories"})]}),"categories"===n?(0,p.jsx)(m,{children:0===$.length?(0,p.jsxs)(A,{children:[(0,p.jsx)("h3",{children:"No categories yet"}),(0,p.jsxs)("p",{children:["Create your first category to organize your ","blog"===e?"blog posts":"FAQ items"]}),(0,p.jsx)(a.cc,{onClick:()=>{G({type:e}),V(!0)},children:"+ Add Category"})]}):$.map(t=>(0,p.jsxs)(b,{isActive:t.is_active,children:[(0,p.jsx)(j,{children:t.icon||"\ud83d\udcc1"}),(0,p.jsxs)(y,{children:[(0,p.jsx)(v,{children:t.name}),(0,p.jsxs)(f,{children:[t.content_count," ","blog"===e?"posts":"items"," \u2022 ",t.description||"No description"]})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(C,{onClick:()=>{G(t),V(!0)},children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,p.jsx)(C,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("token"),n=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(n.ok)ne("Category deleted successfully"),re(),setTimeout(()=>ne(""),3e3);else{const e=await n.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}ee({...K,show:!1})}})})(t.id),children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},t.id))}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.MD,{children:[(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:ae.total}),(0,p.jsxs)(d.v0,{children:["Total ","blog"===e?"Posts":"FAQs"]})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:ae.published}),(0,p.jsx)(d.v0,{children:"Published"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:ae.draft}),(0,p.jsx)(d.v0,{children:"Drafts"})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:ae.categories}),(0,p.jsx)(d.v0,{children:"Categories"})]})]}),(0,p.jsxs)(x.Qn,{children:[(0,p.jsx)(x.DO,{type:"text",placeholder:"Search...",value:N,onChange:e=>O(e.target.value)}),(0,p.jsxs)(x.Jt,{value:R,onChange:e=>U(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"published",children:"Published"}),(0,p.jsx)("option",{value:"draft",children:"Draft"})]}),(0,p.jsxs)(x.Jt,{value:J,onChange:e=>q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),$.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),0===oe.length?(0,p.jsxs)(A,{children:[(0,p.jsx)("h3",{children:"No content yet"}),(0,p.jsxs)("p",{children:["Create your first ","blog"===e?"blog post":"FAQ item"]}),(0,p.jsxs)(a.cc,{onClick:()=>{Z({type:e}),M(!0)},children:["+ New ","blog"===e?"Post":"FAQ"]})]}):(0,p.jsxs)(d.XI,{children:[(0,p.jsxs)(d.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsx)("span",{children:"Title"}),(0,p.jsx)("span",{children:"Category"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Date"}),(0,p.jsx)("span",{children:"Actions"})]}),oe.map(t=>{var n,r;return(0,p.jsxs)(d.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:t.title}),"blog"===e&&t.view_count>0&&(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[t.view_count," views"]})]}),(0,p.jsxs)("div",{children:[null===(n=t.category)||void 0===n?void 0:n.icon," ",null===(r=t.category)||void 0===r?void 0:r.name]}),(0,p.jsx)("div",{children:(0,p.jsx)(g,{status:t.status,children:t.status.charAt(0).toUpperCase()+t.status.slice(1)})}),(0,p.jsx)("div",{children:new Date(t.updated_at).toLocaleDateString()}),(0,p.jsxs)(d.wr,{children:[(0,p.jsx)(d.rA,{onClick:()=>{Z(t),M(!0)},children:"Edit"}),(0,p.jsx)(d.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("token"),n="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===n?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),ne("published"===n?"Content published":"Content unpublished"),re(),setTimeout(()=>ne(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(t),children:"published"===t.status?"Unpublish":"Publish"}),(0,p.jsx)(d.rA,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),ne("Content deleted successfully"),re(),setTimeout(()=>ne(""),3e3)}catch(t){console.error("Error deleting content:",t)}ee({...K,show:!1})}})})(t.id),className:"danger",children:"Delete"})]})]},t.id)})]})]})]})]}),Y&&(0,p.jsxs)(s.aF,{onClose:()=>{V(!1),G(null)},children:[(0,p.jsx)("h2",{children:null!==X&&void 0!==X&&X.id?"Edit Category":"New Category"}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Name *"}),(0,p.jsx)(s.ZQ,{value:(null===X||void 0===X?void 0:X.name)||"",onChange:e=>G({...X,name:e.target.value}),placeholder:"Category name"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Icon (emoji)"}),(0,p.jsx)(s.ZQ,{value:(null===X||void 0===X?void 0:X.icon)||"",onChange:e=>G({...X,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Description"}),(0,p.jsx)(s.Lz,{value:(null===X||void 0===X?void 0:X.description)||"",onChange:e=>G({...X,description:e.target.value}),placeholder:"Brief description",rows:3})]}),(0,p.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>{V(!1),G(null)},children:"Cancel"}),(0,p.jsx)(s.yl,{onClick:async()=>{if(null!==X&&void 0!==X&&X.name)try{const t=localStorage.getItem("token"),n=!X.id;(await fetch(n?"/api/contents/categories":`/api/contents/categories/${X.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({type:e,name:X.name,description:X.description,icon:X.icon})})).ok&&(ne(n?"Category created successfully":"Category updated successfully"),V(!1),G(null),re(),setTimeout(()=>ne(""),3e3))}catch(t){console.error("Error saving category:",t)}},children:null!==X&&void 0!==X&&X.id?"Update":"Create"})]})]}),(0,p.jsx)(l.A,{isOpen:K.show,title:K.title,message:K.message,onConfirm:K.onConfirm,onCancel:()=>ee({...K,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);