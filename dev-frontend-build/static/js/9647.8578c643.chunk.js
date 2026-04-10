"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9647],{2653:(e,n,t)=>{t.d(n,{M:()=>o});var a=t(9950),r=t(4492);function o(e){const[n,t]=(0,r.ok)(),o=(0,a.useCallback)(()=>n.get("tab")||e,[n,e]),[i,s]=(0,a.useState)(o());return[i,(0,a.useCallback)(e=>{s(e),t({tab:e})},[t])]}},3705:(e,n,t)=>{t.d(n,{cc:()=>r});var a=t(4752);const r=a.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`;a.Ay.select`
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
`,a.Ay.input`
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
`,a.Ay.div`
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
`},9647:(e,n,t)=>{t.r(n),t.d(n,{default:()=>T});var a=t(9950),r=t(4752),o=t(2853),i=t(3705),s=t(9610),l=t(1472),d=t(8409),c=t(2597),h=t(2653),g=t(2488),x=t(5030),u=t(9955),p=t(4414);const m=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"published"===e.status?"#ECFDF5":"#FEF3C7"};
  color: ${e=>"published"===e.status?"#059669":"#D97706"};
`,v=r.Ay.div`
  display: grid;
  gap: 12px;
`,j=r.Ay.div`
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
`,b=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,y=r.Ay.div`
  flex: 1;
`,f=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,C=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=r.Ay.div`
  display: flex;
  gap: 8px;
`,k=r.Ay.button`
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
`,E=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-top: 16px;
`,A=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
`,F=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,B=r.Ay.div`
  display: flex;
  gap: 12px;
`,_=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`,P=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,z=r.Ay.textarea`
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
`,M=r.Ay.div`
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
`,S=(0,r.Ay)(g.Qn)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`,T=()=>{const{t:e}=(0,x.Bd)("admin"),[n,t]=(0,h.M)("blog"),[r,T]=(0,a.useState)([]),[L,D]=(0,a.useState)([]),[,$]=(0,a.useState)(!0),[R,Q]=(0,a.useState)(""),[O,I]=(0,a.useState)("all"),[N,U]=(0,a.useState)("all"),[q,Z]=(0,a.useState)(!1),[W,J]=(0,a.useState)(null),[Y,H]=(0,a.useState)(!1),[K,V]=(0,a.useState)(null),[X,G]=(0,a.useState)({show:!1,title:"",message:"",onConfirm:()=>{}}),[ee,ne]=(0,a.useState)(""),te=()=>n.includes("blog")?"blog":"faq",ae=n.includes("categories");(0,a.useEffect)(()=>{re()},[n]);const re=async()=>{$(!0);const e=te();try{const n={Authorization:`Bearer ${(0,u.c4)()}`},[t,a]=await Promise.all([fetch(`/api/contents/categories?type=${e}`,{headers:n}),fetch(`/api/contents?type=${e}`,{headers:n})]);if(t.ok){const e=await t.json();T(e)}if(a.ok){const e=await a.json();D(e.items||[])}}catch(n){console.error("Error fetching data:",n)}$(!1)},oe=e=>{t(e),Z(!1),J(null)},ie=async()=>{if(null!==W&&void 0!==W&&W.title&&null!==W&&void 0!==W&&W.content&&null!==W&&void 0!==W&&W.category_id)try{const e=(0,u.c4)(),n=!W.id,t=te();(await fetch(n?"/api/contents":`/api/contents/${W.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:t,category_id:W.category_id,title:W.title,content:W.content,excerpt:W.excerpt,thumbnail_url:W.thumbnail_url,status:W.status||"draft",seo_title:W.seo_title,seo_description:W.seo_description,seo_keywords:W.seo_keywords,og_image_url:W.og_image_url,ai_summary:W.ai_summary})})).ok&&(ne(n?"Content created successfully":"Content updated successfully"),Z(!1),J(null),re(),setTimeout(()=>ne(""),3e3))}catch(e){console.error("Error saving content:",e)}else alert("Please fill in all required fields")},se=L.filter(e=>!(R&&!e.title.toLowerCase().includes(R.toLowerCase()))&&(("all"===O||e.status===O)&&("all"===N||e.category_id===parseInt(N)))),le={total:L.length,published:L.filter(e=>"published"===e.status).length,draft:L.filter(e=>"draft"===e.status).length,categories:r.length},de=te(),ce=()=>{var n;return(0,p.jsxs)(E,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[null!==W&&void 0!==W&&W.id?"Edit":"New"," ","blog"===de?"Blog Post":"FAQ Item"]}),(0,p.jsxs)(B,{children:[(0,p.jsx)(i.cc,{variant:"secondary",onClick:()=>{Z(!1),J(null)},children:"Cancel"}),(0,p.jsx)(i.cc,{variant:"secondary",onClick:()=>{J({...W,status:"draft"}),ie()},children:"Save as Draft"}),(0,p.jsx)(i.cc,{onClick:()=>{J({...W,status:"published"}),ie()},children:"Publish"})]})]}),(0,p.jsxs)(_,{children:[(0,p.jsxs)(P,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Title *"}),(0,p.jsx)(s.ZQ,{value:(null===W||void 0===W?void 0:W.title)||"",onChange:e=>J({...W,title:e.target.value}),placeholder:"blog"===de?"Enter post title":"Enter question"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Category *"}),(0,p.jsxs)(g.Jt,{value:(null===W||void 0===W||null===(n=W.category_id)||void 0===n?void 0:n.toString())||"",onChange:e=>J({...W,category_id:parseInt(e.target.value)}),children:[(0,p.jsx)("option",{value:"",children:e("admin:contentManagementPage.selectCategory")}),r.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.icon," ",e.name]},e.id))]})]})]}),"blog"===de&&(0,p.jsxs)(P,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.excerpt")}),(0,p.jsx)(s.Lz,{value:(null===W||void 0===W?void 0:W.excerpt)||"",onChange:e=>J({...W,excerpt:e.target.value}),placeholder:"Brief summary for the blog card",rows:3})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.thumbnail")}),(0,p.jsxs)(M,{children:[null!==W&&void 0!==W&&W.thumbnail_url?(0,p.jsx)("img",{src:W.thumbnail_url,alt:"Thumbnail"}):(0,p.jsx)("p",{children:e("admin:contentManagementPage.clickToUploadThumbnailImage")}),(0,p.jsx)(s.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.thumbnail_url)||"",onChange:e=>J({...W,thumbnail_url:e.target.value}),placeholder:"Enter image URL",style:{marginTop:"12px"}})]})]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"blog"===de?"Content *":"Answer *"}),(0,p.jsx)(z,{value:(null===W||void 0===W?void 0:W.content)||"",onChange:e=>J({...W,content:e.target.value}),placeholder:"blog"===de?"Write your blog post content...":"Write the answer to this question..."})]}),(0,p.jsxs)("div",{style:{marginTop:"24px",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[(0,p.jsx)("h4",{style:{margin:"0 0 16px",fontSize:"14px",fontWeight:600,color:"#0F172A"},children:"SEO & AEO Settings"}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.aiSummaryForAiCitation")}),(0,p.jsx)(s.Lz,{value:(null===W||void 0===W?void 0:W.ai_summary)||"",onChange:e=>J({...W,ai_summary:e.target.value}),placeholder:"2-3 sentence summary that AI assistants will use to cite this content. Be concise and include key facts.",rows:3,maxLength:500}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===W||void 0===W?void 0:W.ai_summary)||"").length,"/500 characters"]})]}),"blog"===de&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(P,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.seoTitleMax70Chars")}),(0,p.jsx)(s.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.seo_title)||"",onChange:e=>J({...W,seo_title:e.target.value}),placeholder:"Custom title for search results",maxLength:70})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.ogImageUrl")}),(0,p.jsx)(s.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.og_image_url)||"",onChange:e=>J({...W,og_image_url:e.target.value}),placeholder:"Image URL for social sharing"})]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.seoDescriptionMax160Chars")}),(0,p.jsx)(s.Lz,{value:(null===W||void 0===W?void 0:W.seo_description)||"",onChange:e=>J({...W,seo_description:e.target.value}),placeholder:"Description for search results",rows:2,maxLength:160}),(0,p.jsxs)("small",{style:{color:"#64748B",fontSize:"12px"},children:[((null===W||void 0===W?void 0:W.seo_description)||"").length,"/160 characters"]})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.seoKeywordsCommaSeparated")}),(0,p.jsx)(s.ZQ,{type:"text",value:(null===W||void 0===W?void 0:W.seo_keywords)||"",onChange:e=>J({...W,seo_keywords:e.target.value}),placeholder:"keyword1, keyword2, keyword3"})]})]})]})]})]})};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.mc,{children:[(0,p.jsx)(d.Y9,{children:(0,p.jsx)(d.hE,{children:e("admin:contentManagementPage.content")})}),ee&&(0,p.jsx)("div",{style:{background:"#ECFDF5",color:"#059669",padding:"12px 16px",borderRadius:"8px",marginBottom:"16px"},children:ee}),(0,p.jsxs)(d.UC,{children:[(0,p.jsxs)(c.tU,{children:[(0,p.jsx)(c.oz,{active:"blog"===n,onClick:()=>oe("blog"),children:"Blog"}),(0,p.jsx)(c.oz,{active:"blog-categories"===n,onClick:()=>oe("blog-categories"),children:"Blog Categories"}),(0,p.jsx)(c.oz,{active:"faq"===n,onClick:()=>oe("faq"),children:"FAQ"}),(0,p.jsx)(c.oz,{active:"faq-categories"===n,onClick:()=>oe("faq-categories"),children:"FAQ Categories"})]}),ae?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(S,{children:[(0,p.jsx)(g.DO,{type:"text",placeholder:"Search categories...",value:R,onChange:e=>Q(e.target.value),style:{maxWidth:"300px"}}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsx)(i.cc,{onClick:()=>{V({type:de}),H(!0)},children:"Add Category"})})]}),(0,p.jsx)(v,{children:0===r.length?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:e("admin:contentManagementPage.noCategoriesYet")}),(0,p.jsxs)("p",{children:["Create your first category to organize your ","blog"===de?"blog posts":"FAQ items"]}),(0,p.jsx)(i.cc,{onClick:()=>{V({type:de}),H(!0)},children:"Add Category"})]}):r.filter(e=>!R||e.name.toLowerCase().includes(R.toLowerCase())).map(e=>(0,p.jsxs)(j,{isActive:e.is_active,children:[(0,p.jsx)(b,{children:e.icon||"\ud83d\udcc1"}),(0,p.jsxs)(y,{children:[(0,p.jsx)(f,{children:e.name}),(0,p.jsxs)(C,{children:[e.content_count," ","blog"===de?"posts":"items"," \u2022 ",e.description||"No description"]})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{onClick:()=>{V(e),H(!0)},children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,p.jsx)(k,{onClick:()=>(async e=>{G({show:!0,title:"Delete Category",message:"Are you sure you want to delete this category? This action cannot be undone.",onConfirm:async()=>{try{const n=(0,u.c4)(),t=await fetch(`/api/contents/categories/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});if(t.ok)ne("Category deleted successfully"),re(),setTimeout(()=>ne(""),3e3);else{const e=await t.json();alert(e.error||"Failed to delete category")}}catch(n){console.error("Error deleting category:",n)}G({...X,show:!1})}})})(e.id),children:(0,p.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,p.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))})]}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.MD,{children:[(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:le.total}),(0,p.jsxs)(d.v0,{children:["Total ","blog"===de?"Posts":"FAQs"]})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:le.published}),(0,p.jsx)(d.v0,{children:e("admin:contentManagementPage.published")})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:le.draft}),(0,p.jsx)(d.v0,{children:e("admin:contentManagementPage.drafts")})]}),(0,p.jsxs)(d.hI,{children:[(0,p.jsx)(d.Os,{children:le.categories}),(0,p.jsx)(d.v0,{children:e("admin:contentManagementPage.categories")})]})]}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(g.Jt,{value:O,onChange:e=>I(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:contentManagementPage.allStatus")}),(0,p.jsx)("option",{value:"published",children:e("admin:contentManagementPage.published")}),(0,p.jsx)("option",{value:"draft",children:e("admin:contentManagementPage.draft")})]}),(0,p.jsxs)(g.Jt,{value:N,onChange:e=>U(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:e("admin:contentManagementPage.allCategories")}),r.map(e=>(0,p.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,p.jsx)(g.DO,{type:"text",placeholder:"Search...",value:R,onChange:e=>Q(e.target.value)}),(0,p.jsx)("div",{style:{marginLeft:"auto"},children:(0,p.jsxs)(i.cc,{onClick:()=>{J({type:de}),Z(!0)},children:["New ","blog"===de?"Post":"FAQ"]})})]}),q?ce():0===se.length?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)("h3",{children:e("admin:contentManagementPage.noContentYet")}),(0,p.jsxs)("p",{children:["Create your first ","blog"===de?"blog post":"FAQ item"]}),(0,p.jsxs)(i.cc,{onClick:()=>{J({type:de}),Z(!0)},children:["New ","blog"===de?"Post":"FAQ"]})]}):(0,p.jsxs)(d.XI,{children:[(0,p.jsxs)(d.A0,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsx)("span",{className:"col-info",children:e("admin:contentManagementPage.title")}),(0,p.jsx)("span",{children:e("admin:contentManagementPage.category")}),(0,p.jsx)("span",{children:e("admin:contentManagementPage.status")}),(0,p.jsx)("span",{children:e("admin:contentManagementPage.date")}),(0,p.jsx)("span",{className:"col-action",children:e("admin:contentManagementPage.actions")})]}),se.map(e=>{var n,t;return(0,p.jsxs)(d.Hj,{columns:"2fr 1fr 1fr 1fr 120px",children:[(0,p.jsxs)("div",{className:"col-info",children:[(0,p.jsx)("strong",{children:e.title}),"blog"===de&&e.view_count>0&&(0,p.jsxs)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:[e.view_count," views"]})]}),(0,p.jsxs)("div",{children:[null===(n=e.category)||void 0===n?void 0:n.icon," ",null===(t=e.category)||void 0===t?void 0:t.name]}),(0,p.jsx)("div",{children:(0,p.jsx)(m,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})}),(0,p.jsx)("div",{children:new Date(e.updated_at).toLocaleDateString()}),(0,p.jsxs)(d.wr,{children:[(0,p.jsx)(d.rA,{onClick:()=>{J(e),Z(!0)},children:"Edit"}),(0,p.jsx)(d.rA,{onClick:()=>(async e=>{try{const n=(0,u.c4)(),t="published"===e.status?"draft":"published";await fetch(`/api/contents/${e.id}/${"published"===t?"publish":"unpublish"}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`}}),ne("published"===t?"Content published":"Content unpublished"),re(),setTimeout(()=>ne(""),3e3)}catch(n){console.error("Error toggling publish:",n)}})(e),children:"published"===e.status?"Unpublish":"Publish"}),(0,p.jsx)(d.rA,{onClick:()=>(async e=>{G({show:!0,title:"Delete Content",message:"Are you sure you want to delete this content? This action cannot be undone.",onConfirm:async()=>{try{const n=(0,u.c4)();await fetch(`/api/contents/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}}),ne("Content deleted successfully"),re(),setTimeout(()=>ne(""),3e3)}catch(n){console.error("Error deleting content:",n)}G({...X,show:!1})}})})(e.id),className:"danger",children:"Delete"})]})]},e.id)})]})]})]})]}),(0,p.jsxs)(s.aF,{isOpen:Y,onClose:()=>{H(!1),V(null)},title:null!==K&&void 0!==K&&K.id?"Edit Category":"New Category",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>{H(!1),V(null)},children:"Cancel"}),(0,p.jsx)(s.yl,{onClick:async()=>{if(null!==K&&void 0!==K&&K.name)try{const e=(0,u.c4)(),n=!K.id,t=te(),a=await fetch(n?"/api/contents/categories":`/api/contents/categories/${K.id}`,{method:n?"POST":"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({type:t,name:K.name,description:K.description,icon:K.icon})});if(a.ok)ne(n?"Category created successfully":"Category updated successfully"),H(!1),V(null),re(),setTimeout(()=>ne(""),3e3);else{const e=await a.json();alert(e.error||"Failed to save category")}}catch(e){console.error("Error saving category:",e)}},children:null!==K&&void 0!==K&&K.id?"Update":"Create"})]}),children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:"Name *"}),(0,p.jsx)(s.ZQ,{value:(null===K||void 0===K?void 0:K.name)||"",onChange:e=>V({...K,name:e.target.value}),placeholder:"Category name"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.iconEmoji")}),(0,p.jsx)(s.ZQ,{value:(null===K||void 0===K?void 0:K.icon)||"",onChange:e=>V({...K,icon:e.target.value}),placeholder:"e.g. \ud83d\udcda"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(s.lR,{children:e("admin:contentManagementPage.description")}),(0,p.jsx)(s.Lz,{value:(null===K||void 0===K?void 0:K.description)||"",onChange:e=>V({...K,description:e.target.value}),placeholder:"Brief description",rows:3})]})]}),(0,p.jsx)(l.A,{isOpen:X.show,title:X.title,message:X.message,onConfirm:X.onConfirm,onClose:()=>G({...X,show:!1}),confirmText:"Delete",cancelText:"Cancel",variant:"danger"})]})}}}]);