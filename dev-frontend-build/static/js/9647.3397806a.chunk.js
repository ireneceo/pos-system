"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{1472:(e,t,o)=>{o.d(t,{A:()=>s});o(9950);var r=o(9610),i=o(4414);const s=e=>{let{isOpen:t,onClose:o,onConfirm:s,title:n,message:l,confirmText:a="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const h=(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.yl,{variant:"secondary",onClick:o,children:d}),(0,i.jsx)(r.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:s,children:a})]});return(0,i.jsx)(r.aF,{isOpen:t,onClose:o,title:n,footer:h,children:(0,i.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,i.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,i.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:l})]})})}},2488:(e,t,o)=>{o.d(t,{DO:()=>c,Jt:()=>h,Qn:()=>d});var r=o(8819),i=(o(9950),o(4752)),s=o(4414);const n=i.Ay.div`
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
`,l=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${r.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
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
`,a=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }

  &:disabled {
    background: ${r.w.colors.surfaceHover};
    color: ${r.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:o,style:r,...i}=e;return(0,s.jsx)(n,{className:o,style:r,...i,children:t})},c=e=>{let{placeholder:t="Search...",...o}=e;return(0,s.jsx)(l,{placeholder:t,...o})},h=e=>{let{children:t,...o}=e;return(0,s.jsx)(a,{...o,children:t})}},3705:(e,t,o)=>{o.d(t,{cc:()=>s.$n});var r=o(8819),i=o(4752),s=o(8829);i.Ay.select`
  padding: ${r.w.components.form.inputPadding};
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${r.w.typography.fontSize.sm};
  background: ${r.w.colors.surface};
  color: ${r.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: ${r.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${r.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${r.w.components.form.inputPadding};
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${r.w.typography.fontSize.sm};
  background: ${r.w.colors.surface};
  color: ${r.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: ${r.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${r.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${r.w.colors.surface};
  border-radius: ${r.w.borderRadius.md};
  border: 1px solid ${r.w.colors.borderLight};
  padding: ${r.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${r.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${r.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${r.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},9647:(e,t,o)=>{o.r(t),o.d(t,{default:()=>L});var r=o(8819),i=o(9950),s=o(4492),n=o(4752),l=o(3705),a=o(9610),d=o(1472),c=o(2674),h=o(1313),x=o(2488),p=o(4414);const u=n.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,g=n.Ay.div`
  display: grid;
  gap: 12px;
`,m=n.Ay.div`
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
`,j=n.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,y=n.Ay.div`
  flex: 1;
`,v=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,b=n.Ay.div`
  font-size: 13px;
  color: ${r.w.colors.text.muted};
`,w=n.Ay.div`
  display: flex;
  gap: 8px;
`,f=n.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${r.w.colors.borderLight};
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
    color: ${r.w.colors.text.muted};
  }
`,C=n.Ay.div`
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
    color: ${r.w.colors.text.muted};
    font-size: 14px;
    margin-bottom: 24px;
  }
`,k=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`,A=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid ${r.w.colors.borderLight};
`,$=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,_=n.Ay.div`
  display: flex;
  gap: 12px;
`,S=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`,E=n.Ay.textarea`
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 1px solid ${r.w.colors.borderLight};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,F=n.Ay.div`
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
`,z=(0,n.Ay)(x.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,L=()=>{var e;const[t,o]=(0,s.ok)(),r=t.get("tab")||"blog",[n,L]=(0,i.useState)(r),[T,B]=(0,i.useState)([]),[D,O]=(0,i.useState)([]),[I,R]=(0,i.useState)(!0),[P,Q]=(0,i.useState)(""),[N,U]=(0,i.useState)("all"),[H,q]=(0,i.useState)("all"),[Z,J]=(0,i.useState)(!1),[W,M]=(0,i.useState)(null),[G,K]=(0,i.useState)(!1),[V,X]=(0,i.useState)(null),[Y,ee]=(0,i.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[te,oe]=(0,i.useState)(""),re=()=>n.includes("blog")?"blog":"faq",ie=n.includes("categories");(0,i.useEffect)(()=>{se(),o({tab:n})},[n]);const se=async()=>{R(!0);const e=re();try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[o,r]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:t}),fetch(`/api/contents?type=${e}`,{headers:t})]);if(o.ok){const e=await o.json();B(e)}if(r.ok){const e=await r.json();O(e.items||[])}}catch(t){console.error("Error fetching data:",t)}R(!1)},ne=e=>{L(e),J(!1),M(null)},le=async()=>{if(null!==W&&void 0!==W&&W.title&&null!==W&&void 0!==W&&W.content&&null!==W&&void 0!==W&&W.category_id)try{const e=localStorage.getItem("auth_token"),t=!W.id,o=re();(await fetch(t?"/api/contents":`/api/contents/${W.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:o,category_id:W.category_id,title:W.title,content:W.content,excerpt:W.excerpt,thumbnail_url:W.thumbnail_url,status:W.status||"draft",seo_title:W.seo_title,seo_description:W.seo_description,seo_keywords:W.seo_keywords,og_image_url:W.og_image_url,ai_summary:W.ai_summary})})).ok&&(oe(t?"Content created successfully":"Content updated successfully"),J(!1),M(null),se(),setTimeout(()=>oe(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},ae=D.filter(e=>!(P&&!e.title.toLowerCase().includes(P.toLowerCase()))&&(("all"===N||e.status===N)&&("all"===H||e.category_id===parseInt(H)))),de={total:D.length,published:D.filter(e=>"published"===e.status).length,draft:D.filter(e=>"draft"===e.status).length,categories:T.length},ce=re(),he=()=>{var e;return(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)($,{children:[null!==W&&void 0!==W&&W.id?"Edit":"New"," ","blog"===ce?"Blog Post":"FAQ Item"]}),(0,p.jsxs)(_,{children:[(0,p.jsx)(l.cc,{variant:"secondary",onClick:()=>{J(!1),M(null)},children:"Cancel"}),(0,p.jsx)(l.cc,{variant:"secondary",onClick:()=>{M({...W,status:"draft"}),le()},children:"Save as Draft"}),(0,p.jsx)(l.cc,{onClick:()=>{M({...W,status:"published"}),le()},children:"Publish"})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(a.fh,{children:[(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Title *"}),(0,p.jsx)(a.ZQ,{value:(null===W||void 0===W?void 0:W.title)||"",onChange:e=>M({...W,title:e.target.value}),placeholder:"blog"===ce?"Enter post title":"Enter question"})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Category *"}),(0,p.jsxs)(x.Jt,{value:(null===W||void 0===W||null===(e=W.category_id)||void 0===e?void 0:e.toString())||"",onChange:e=>M({...W,category_id:parseInt(e.target.value)}),children:[(0,p.jsx)("option",{value:"",children:"Select category"}),T.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===ce&&(0,p.jsxs)(a.fh,{children:[(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Excerpt"}),(0,p.jsx)(a.Lz,{value:(null===W||void 0===W?void 0:W.excerpt)||"",onChange:e=>M({...W,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Thumbnail"}),(0,p.jsxs)(F,{children:[null!==W&&void 0!==W&&W.thumbnail_url?(0,p.jsx)("img",{src:W.thumbnail_url,alt:"Thumbnail"}):(0,p.jsx)("p",{children:"Click to upload thumbnail image"}),(0,p.jsx)(a.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.thumbnail_url)||"",onChange:e=>M({...W,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"blog"===ce?"Content *":"Answer *"}),(0,p.jsx)(E,{value:(null===W||void 0===W?void 0:W.content)||"",onChange:e=>M({...W,content:e.target.value}),placeholder:"blog"===ce?"Write your blog post content...":"Write the answer to this question..."})]}),(0,p.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,p.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"AI Summary (for AI citation)"}),(0,p.jsx)(a.Lz,{value:(null===W||void 0===W?void 0:W.ai_summary)||"",onChange:e=>M({...W,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===W||void 0===W?void 0:W.ai_summary)||"").length,"/500 characters"]})]}),"blog"===ce&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(a.fh,{children:[(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"SEO Title (max 70 chars)"}),(0,p.jsx)(a.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.seo_title)||"",onChange:e=>M({...W,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"OG Image URL"}),(0,p.jsx)(a.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.og_image_url)||"",onChange:e=>M({...W,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"SEO Description (max 160 chars)"}),(0,p.jsx)(a.Lz,{value:(null===W||void 0===W?void 0:W.seo_description)||"",onChange:e=>M({...W,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===W||void 0===W?void 0:W.seo_description)||"").length,"/160 characters"]})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"SEO Keywords (comma separated)"}),(0,p.jsx)(a.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.seo_keywords)||"",onChange:e=>M({...W,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(c.mc,{children:[(0,p.jsx)(c.Y9,{children:(0,p.jsx)(c.hE,{children:"Content"})}),te&&(0,p.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:te}),(0,p.jsxs)(c.UC,{children:[(0,p.jsxs)(h.j,{children:[(0,p.jsx)(h.oz,{active:"blog"===n,onClick:()=>ne("blog"),children:"Blog"}),(0,p.jsx)(h.oz,{active:"blog-categories"===n,onClick:()=>ne("blog-categories"),children:"Blog Categories"}),(0,p.jsx)(h.oz,{active:"faq"===n,onClick:()=>ne("faq"),children:"FAQ"}),(0,p.jsx)(h.oz,{active:"faq-categories"===n,onClick:()=>ne("faq-categories"),children:"FAQ Categories"})]}),ie?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(x.DO,{type:"text",placeholder:"Search categories...",value:P,onChange:e=>Q(e.target.value),style:{maxWidth:"300px"}}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsx)(l.cc,{onClick:()=>{X({type:ce}),K(!0)},children:"Add Category"})})]}),(0,p.jsx)(g,{children:0===T.length?(0,p.jsxs)(C,{children:[(0,p.jsx)("h3",{children:"No categories yet"}),(0,p.jsxs)("p",{children:["Create your first category to organize your ","blog"===ce?"blog posts":"FAQ items"]}),(0,p.jsx)(l.cc,{onClick:()=>{X({type:ce}),K(!0)},children:"Add Category"})]}):T.filter(e=>!P||e.name.toLowerCase().includes(P.toLowerCase())).map(e=>(0,p.jsxs)(m,{isActive:e.is_active,children:[(0,p.jsx)(j,{children:e.icon||"\ud83d\udcc1"}),(0,p.jsxs)(y,{children:[(0,p.jsx)(v,{children:e.name}),(0,p.jsxs)(b,{children:[e.content_count," ","blog"===ce?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(f,{onClick:()=>{X(e),K(!0)},children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,p.jsx)(f,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token"),o=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});if(o.ok)oe("Category deleted successfully"),se(),setTimeout(()=>oe(""),3e3);else{const e=await o.json();alert(e.error||"Failed to delete category")}}catch(t){console.error("Error deleting category:",t)}ee({...Y,show:!1})}})})(e.id),children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(c.MD,{children:[(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:de.total}),(0,p.jsxs)(c.v0,{children:["Total ","blog"===ce?"Posts":"FAQs"]})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:de.published}),(0,p.jsx)(c.v0,{children:"Published"})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:de.draft}),(0,p.jsx)(c.v0,{children:"Drafts"})]}),(0,p.jsxs)(c.hI,{children:[(0,p.jsx)(c.Os,{children:de.categories}),(0,p.jsx)(c.v0,{children:"Categories"})]})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(x.DO,{type:"text",placeholder:"Search...",value:P,onChange:e=>Q(e.target.value)}),(0,p.jsxs)(x.Jt,{value:N,onChange:e=>U(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"published",children:"Published"}),(0,p.jsx)("option",{value:"draft",children:"Draft"})]}),(0,p.jsxs)(x.Jt,{value:H,onChange:e=>q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Categories"}),T.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsxs)(l.cc,{onClick:()=>{M({type:ce}),J(!0)},children:["New ","blog"===ce?"Post":"FAQ"]})})]}),Z?he():0===ae.length?(0,p.jsxs)(C,{children:[(0,p.jsx)("h3",{children:"No content yet"}),(0,p.jsxs)("p",{children:["Create your first ","blog"===ce?"blog post":"FAQ item"]}),(0,p.jsxs)(l.cc,{onClick:()=>{M({type:ce}),J(!0)},children:["New ","blog"===ce?"Post":"FAQ"]})]}):(0,p.jsxs)(c.XI,{children:[(0,p.jsxs)(c.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsx)("span",{children:"Title"}),(0,p.jsx)("span",{children:"Category"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Date"}),(0,p.jsx)("span",{children:"Actions"})]}),ae.map(e=>{var t,o;return(0,p.jsxs)(c.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("strong",{children:e.title}),"blog"===ce&&e.view_count>0&&(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,p.jsxs)("div",{children:[null===(t=e.category)||void 0===t?void 0:t.icon," ",null===(o=e.category)||void 0===o?void 0:o.name]}),(0,p.jsx)("div",{children:(0,p.jsx)(u,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,p.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,p.jsxs)(c.wr,{children:[(0,p.jsx)(c.rA,{onClick:()=>{M(e),J(!0)},children:"Edit"}),(0,p.jsx)(c.rA,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),o="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===o?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}}),oe("published"===o?"Content published":"Content unpublished"),se(),setTimeout(()=>oe(""),3e3)}catch(t){console.error("Error toggling publish:",t)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,p.jsx)(c.rA,{onClick:()=>(async e=>{ee({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const t=localStorage.getItem("auth_token");await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),oe("Content deleted successfully"),se(),setTimeout(()=>oe(""),3e3)}catch(t){console.error("Error deleting content:",t)}ee({...Y,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,p.jsxs)(a.aF,{isOpen:G,onClose:()=>{K(!1),X(null)},title:null!==V&&void 0!==V&&V.id?"Edit Category":"New Category",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.yl,{variant:"secondary",onClick:()=>{K(!1),X(null)},children:"Cancel"}),(0,p.jsx)(a.yl,{onClick:async()=>{if(null!==V&&void 0!==V&&V.name)try{const e=localStorage.getItem("auth_token"),t=!V.id,o=re(),r=await fetch(t?"/api/contents/categories":`/api/contents/categories/${V.id}`,{method:t?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:o,name:V.name,description:V.description,icon:V.icon})});if(r.ok)oe(t?"Category created successfully":"Category updated successfully"),K(!1),X(null),se(),setTimeout(()=>oe(""),3e3);else{const e=await r.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},disabled:!(null!==V&&void 0!==V&&null!==(e=V.name)&&void 0!==e&&e.trim()),children:null!==V&&void 0!==V&&V.id?"Update":"Create"})]}),children:[(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Name *"}),(0,p.jsx)(a.ZQ,{value:(null===V||void 0===V?void 0:V.name)||"",onChange:e=>X({...V,name:e.target.value}),placeholder:"Category name"})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Icon (emoji)"}),(0,p.jsx)(a.ZQ,{value:(null===V||void 0===V?void 0:V.icon)||"",onChange:e=>X({...V,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,p.jsxs)(a.gE,{children:[(0,p.jsx)(a.lR,{children:"Description"}),(0,p.jsx)(a.Lz,{value:(null===V||void 0===V?void 0:V.description)||"",onChange:e=>X({...V,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,p.jsx)(d.A,{isOpen:Y.show,title:Y.title,message:Y.message,onConfirm:Y.onConfirm,onClose:()=>ee({...Y,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);