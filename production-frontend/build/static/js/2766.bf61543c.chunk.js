"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{496:(e,i,n)=>{n.d(i,{A:()=>o});n(9950);var t=n(9610),r=n(4414);const o=e=>{let{isOpen:i,onClose:n,onConfirm:o,title:a,message:l,confirmText:s="Confirm",cancelText:d="Cancel",variant:c="info"}=e;const p=(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.yl,{variant:"secondary",onClick:n,children:d}),(0,r.jsx)(t.yl,{variant:(()=>{switch(c){case"danger":case"warning":return"danger";default:return"primary"}})(),onClick:o,children:s})]});return(0,r.jsx)(t.aF,{isOpen:i,onClose:n,title:a,footer:p,children:(0,r.jsxs)("div",{style:{textAlign:"center",padding:"32px 0"},children:[(0,r.jsx)("div",{style:{fontSize:"56px",marginBottom:"24px"},children:(()=>{switch(c){case"danger":case"warning":return"!";default:return"i"}})()}),(0,r.jsx)("p",{style:{fontSize:"16px",color:"#4B5563",lineHeight:"1.6",margin:"0"},children:l})]})})}},2766:(e,i,n)=>{n.r(i),n.d(i,{default:()=>ge});var t=n(9950),r=n(4492),o=n(4752),a=n(3310),l=n(8930),s=n(496),d=n(3338),c=n(4669),p=n(7492),x=n(9194),u=n(4414);const g=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,h=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,m=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,f=o.Ay.div`
  display: flex;
  gap: 12px;
`,j=o.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`,v=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,y=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,b=o.Ay.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
  
  &::placeholder {
    color: #8898AA;
  }
`,F=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,C=o.Ay.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }
`,A=o.Ay.div`
  padding: 12px 16px;
  background: #F0F4FF;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #635BFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=o.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`,k=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,E=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;

  ${e=>e.soldOut&&"\n    opacity: 0.7;\n\n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 20px;\n      right: -30px;\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 40px;\n      transform: rotate(45deg);\n      font-size: 12px;\n      font-weight: 600;\n    }\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,B=o.Ay.div`
  width: 100%;
  height: 180px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,S=o.Ay.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,I=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,_=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,z=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`,R=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,$=o.Ay.span`
  font-size: 12px;
  color: #635BFF;
  cursor: pointer;
  display: inline-block;
  margin-top: 8px;
  transition: all 0.15s;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '→ ';
    opacity: 0.6;
  }
`,M=o.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 12px;
  align-self: flex-start;
  width: fit-content;
`,D=o.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  margin-top: auto;
`,O=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  
  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    \n    &:hover {\n      background: #FFE6E6;\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n    \n    &:hover {\n      background: #F6F9FC;\n      color: #635BFF;\n      border-color: #C7D2FE;\n    }\n  "}
`,L=o.Ay.div`
  background: white;
  border: 2px dashed #C7D2FE;
  border-radius: 12px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    background: #F0F4FF;
    transform: translateY(-2px);
  }
`,T=o.Ay.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`,G=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,q=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,N=o.Ay.button`
  width: 48px;
  height: 48px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.selected?"#F0F4FF":"white"};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    background: #F0F4FF;
  }
`,P=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,U=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #0A2540;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`,Z=o.Ay.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,Q=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,H=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,W=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: #635BFF;
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 600;
`,J=o.Ay.span`
  font-weight: 500;
`,X=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,K=o.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6B7280;
  border-radius: 50%;
  padding: 0;
  transition: all 0.15s;

  &:hover {
    background: #E0E7FF;
    color: #4338CA;
  }
`,Y=o.Ay.div`
  margin-top: 24px;
`,V=o.Ay.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  z-index: 1;
`,ee=o.Ay.div`
  background: #F6F9FC;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,ie=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #E6EBF1;

  &:last-child {
    margin-bottom: 0;
  }
`,ne=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,te=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,re=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,oe=o.Ay.button`
  width: 28px;
  height: 28px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #635BFF;
  transition: all 0.15s;

  &:hover {
    background: #F0F4FF;
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ae=o.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,le=o.Ay.button`
  padding: 4px 12px;
  background: #FFF4F4;
  color: #FF6B6B;
  border: 1px solid #FFE6E6;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FFE6E6;
  }
`,se=o.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,de=o.Ay.div`
  padding: 12px;
  border-bottom: 1px solid #F6F9FC;
  cursor: pointer;
  transition: all 0.15s;
  background: ${e=>e.selected?"#F0F4FF":"white"};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F6F9FC;
  }

  display: flex;
  align-items: center;
  gap: 12px;
`,ce=o.Ay.span`
  font-size: 24px;
`,pe=o.Ay.div`
  flex: 1;
`,xe=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,ue=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,ge=()=>{const{categories:e,menuItems:i,optionGroups:n,updateMenuItem:o,addMenuItem:ge,removeMenuItem:he,toggleItemSoldOut:me}=(0,l.b)(),fe=(0,r.Zp)(),[je,ve]=(0,t.useState)("all"),[ye,be]=(0,t.useState)(""),[Fe,Ce]=(0,t.useState)(!1),[Ae,we]=(0,t.useState)(!1),[ke,Ee]=(0,t.useState)(null),[Be,Se]=(0,t.useState)(!1),[Ie,_e]=(0,t.useState)(null),[ze,Re]=(0,t.useState)(!1),[$e,Me]=(0,t.useState)(null),[De,Oe]=(0,t.useState)([]),[Le,Te]=(0,t.useState)(!1),[Ge,qe]=(0,t.useState)([]),[,]=(0,t.useState)(0),[Ne,Pe]=(0,t.useState)(""),[Ue,Ze]=(0,t.useState)({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null});t.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let t=null;if(n>=0&&(t=i[n+1]),!t)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${t}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${t}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}Oe(a)}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[Qe,He]=(0,t.useState)([]),We={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},Je=(()=>{let n="all"===je?i:i.filter(e=>e.category===je);if(ye.trim()){const i=ye.toLowerCase().trim();n=n.filter(n=>{var t;return n.name.toLowerCase().includes(i)||n.description&&n.description.toLowerCase().includes(i)||n.price.toString().includes(i)||(null===(t=e.find(e=>e.id===n.category))||void 0===t?void 0:t.name.toLowerCase().includes(i))})}return n})(),Xe=()=>{Ze({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),He([]),qe([]),Ce(!0)},Ke=(e,i)=>{qe(Ge.map(n=>{if(n.menuItemId===e){const e=Math.max(1,n.quantity+i);return{...n,quantity:e}}return n}))};return(0,u.jsx)(a.A,{children:(0,u.jsxs)(g,{children:[(0,u.jsxs)(h,{children:[(0,u.jsx)(m,{children:"Menu"}),(0,u.jsxs)(f,{children:[(0,u.jsx)(p.$n,{variant:"secondary",onClick:()=>{Ze({name:"",price:0,category:"korean",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),He([]),qe([]),Te(!0)},children:"Create Set Menu"}),(0,u.jsx)(p.$n,{variant:"primary",onClick:Xe,children:"Add New Item"})]})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(v,{children:(0,u.jsxs)(y,{children:[(0,u.jsx)(F,{children:"\ud83d\udd0d"}),(0,u.jsx)(b,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:ye,onChange:e=>be(e.target.value)}),ye&&(0,u.jsx)(C,{onClick:()=>be(""),title:"Clear search",children:"\xd7"})]})}),ye&&Je.length>0&&(0,u.jsxs)(A,{children:[(0,u.jsxs)("span",{children:["Found ",Je.length," item",1!==Je.length?"s":"",' matching "',ye,'"']}),(0,u.jsx)(p.$n,{variant:"secondary",onClick:()=>be(""),children:"Clear Search"})]}),(0,u.jsxs)(p.j,{children:[(0,u.jsxs)(p.oz,{active:"all"===je,onClick:()=>{ve("all"),be("")},children:["All Items (",i.length,")"]}),e.map(e=>(0,u.jsxs)(p.oz,{active:je===e.id,onClick:()=>{ve(e.id),be("")},children:[e.emoji," ",e.name]},e.id))]}),ye&&0===Je.length?(0,u.jsxs)(w,{children:[(0,u.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,u.jsxs)("div",{className:"title",children:['No results for "',ye,'"']}),(0,u.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,u.jsxs)(k,{children:[Je.map(t=>{var r;return(0,u.jsxs)(E,{soldOut:t.soldOut,children:[(0,u.jsxs)(B,{children:[t.is_set_menu&&(0,u.jsx)(V,{children:"SET"}),t.image&&""!==t.image.trim()?(0,u.jsx)("img",{src:t.image,alt:t.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=t.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,u.jsx)("span",{style:{fontSize:"48px"},children:t.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,u.jsxs)(S,{children:[(0,u.jsx)(M,{children:null===(r=e.find(e=>e.id===t.category))||void 0===r?void 0:r.name}),(0,u.jsxs)(I,{children:[(0,u.jsxs)(_,{children:[t.code?`${t.code} `:"",t.name]}),(0,u.jsxs)(z,{children:["RM ",t.price.toFixed(2)]})]}),(0,u.jsx)(R,{children:t.description||"No description available"}),t.is_set_menu&&t.set_items&&t.set_items.length>0&&(0,u.jsxs)(R,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",t.set_items.map(e=>{const n=i.find(i=>i.id===e.menuItemId.toString()),t=null===n||void 0===n?void 0:n.code;return`${t?`${t} `:""}${e.name} x${e.quantity}`}).join(", ")]}),t.optionGroups&&t.optionGroups.length>0&&(0,u.jsxs)(R,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",t.optionGroups.map(e=>{var i;return null===(i=n.find(i=>i.id===e))||void 0===i?void 0:i.name}).filter(Boolean).join(", ")]}),t.recipe_id&&(()=>{const e=De.find(e=>e.id===t.recipe_id);return e?(0,u.jsxs)($,{onClick:i=>{i.stopPropagation();const n=window.location.pathname.split("/"),t=n.indexOf("restaurant"),r=t>=0?n[t+1]:"";fe(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,u.jsxs)(D,{children:[(0,u.jsx)(O,{onClick:()=>(e=>{Ee(e),Ze({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),He(e.optionGroups||[]),qe(e.set_items||[]),e.is_set_menu?Te(!0):we(!0)})(t),children:"Edit"}),(0,u.jsx)(O,{onClick:()=>(e=>{Me(e),Re(!0)})(t),children:"Price"}),(0,u.jsx)(O,{onClick:()=>me(t.id),children:t.soldOut?"In Stock":"Sold Out"}),(0,u.jsx)(O,{danger:!0,onClick:()=>{return e=t.id,_e(e),void Se(!0);var e},children:"Delete"})]})]})]},t.id)}),(0,u.jsxs)(L,{onClick:Xe,children:[(0,u.jsx)(T,{children:"+"}),(0,u.jsx)(G,{children:"Add New Menu Item"})]})]})]}),(0,u.jsxs)(p.aF,{isOpen:Fe,onClose:()=>Ce(!1),title:"Add New Menu Item",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p.$n,{variant:"secondary",onClick:()=>Ce(!1),children:"Cancel"}),(0,u.jsx)(p.$n,{variant:"primary",onClick:()=>{const e={id:`item-${Date.now()}`,code:Ue.code||"",name:Ue.name||"",price:Ue.price||0,category:Ue.category||"korean",emoji:Ue.emoji||"\ud83c\udf7d\ufe0f",description:Ue.description,image:Ue.image,optionGroups:Qe,soldOut:!1,is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:Ue.recipe_id||null};ge(e),Ce(!1)},children:"Add Item"})]}),children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Item Code"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.code||"",onChange:e=>Ze({...Ue,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Item Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.name,onChange:e=>Ze({...Ue,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Price (RM) *"}),(0,u.jsx)(p.ZQ,{type:"number",value:Ue.price,onChange:e=>Ze({...Ue,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category *"}),(0,u.jsx)(p.FX,{value:Ue.category,onChange:e=>Ze({...Ue,category:e.target.value}),children:e.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Emoji Icon"}),(0,u.jsx)(q,{children:We.other.map(e=>(0,u.jsx)(N,{selected:Ue.emoji===e,onClick:()=>Ze({...Ue,emoji:e}),children:e},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:Ue.description,onChange:e=>Ze({...Ue,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,u.jsx)(c.A,{value:Ue.image||"",onChange:e=>Ze({...Ue,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,u.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,u.jsx)(p.lR,{children:"Linked Recipe"}),(0,u.jsx)(x.A,{options:De.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ue.recipe_id||null,onChange:e=>Ze({...Ue,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,u.jsx)(Y,{children:(0,u.jsxs)(p.gE,{children:[(0,u.jsxs)(p.lR,{children:["Option Groups ",Qe.length>0&&`(${Qe.length} selected)`]}),(0,u.jsxs)(Z,{value:"",onChange:e=>{e.target.value&&!Qe.includes(e.target.value)&&He([...Qe,e.target.value])},children:[(0,u.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!Qe.includes(e.id)).map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,u.jsx)(Q,{children:Qe.map((e,i)=>{const t=n.find(i=>i.id===e);return t?(0,u.jsxs)(H,{children:[(0,u.jsx)(W,{children:i+1}),(0,u.jsx)(J,{children:t.name}),(0,u.jsx)(X,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,u.jsx)(K,{onClick:()=>He(Qe.filter(i=>i!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,u.jsxs)(p.aF,{isOpen:Ae,onClose:()=>we(!1),title:"Edit Menu Item",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p.$n,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,u.jsx)(p.$n,{variant:"primary",onClick:()=>{if(ke){const e={...ke,...Ue,optionGroups:Qe};o(e),we(!1),Ee(null)}},children:"Save Changes"})]}),children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Item Code"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.code||"",onChange:e=>Ze({...Ue,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Item Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.name,onChange:e=>Ze({...Ue,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Price (RM) *"}),(0,u.jsx)(p.ZQ,{type:"number",value:Ue.price,onChange:e=>Ze({...Ue,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category *"}),(0,u.jsx)(p.FX,{value:Ue.category,onChange:e=>Ze({...Ue,category:e.target.value}),children:e.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Emoji Icon"}),(0,u.jsx)(q,{children:We.other.map(e=>(0,u.jsx)(N,{selected:Ue.emoji===e,onClick:()=>Ze({...Ue,emoji:e}),children:e},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:Ue.description,onChange:e=>Ze({...Ue,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,u.jsx)(c.A,{value:Ue.image||"",onChange:e=>Ze({...Ue,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,u.jsxs)(p.gE,{style:{marginTop:"24px"},children:[(0,u.jsx)(p.lR,{children:"Linked Recipe"}),(0,u.jsx)(x.A,{options:De.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:Ue.recipe_id||null,onChange:e=>Ze({...Ue,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),(0,u.jsx)(Y,{children:(0,u.jsxs)(p.gE,{children:[(0,u.jsxs)(p.lR,{children:["Option Groups ",Qe.length>0&&`(${Qe.length} selected)`]}),(0,u.jsxs)(Z,{value:"",onChange:e=>{e.target.value&&!Qe.includes(e.target.value)&&He([...Qe,e.target.value])},children:[(0,u.jsx)("option",{value:"",children:"Select option group to add..."}),n.filter(e=>!Qe.includes(e.id)).map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,u.jsx)(Q,{children:Qe.map((e,i)=>{const t=n.find(i=>i.id===e);return t?(0,u.jsxs)(H,{children:[(0,u.jsx)(W,{children:i+1}),(0,u.jsx)(J,{children:t.name}),(0,u.jsx)(X,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,u.jsx)(K,{onClick:()=>He(Qe.filter(i=>i!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,u.jsxs)(p.aF,{isOpen:Le,onClose:()=>{Te(!1),Ee(null),qe([])},title:ke?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p.$n,{variant:"secondary",onClick:()=>{Te(!1),Ee(null),qe([])},children:"Cancel"}),(0,u.jsx)(p.$n,{variant:"primary",onClick:()=>{if(0===Ge.length)return void alert("Set menu must contain at least one menu item.");const e={id:(null===ke||void 0===ke?void 0:ke.id)||`item-${Date.now()}`,code:Ue.code||"",name:Ue.name||"",price:Ue.price||0,category:Ue.category||"korean",emoji:Ue.emoji||"\ud83c\udf7d\ufe0f",description:Ue.description,image:Ue.image,optionGroups:Qe,soldOut:!1,is_set_menu:!0,set_items:Ge,set_display_order:Ue.set_display_order||0};ke?o(e):ge(e),Te(!1),Ee(null),qe([])},children:ke?"Save Changes":"Create Set Menu"})]}),children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Item Code"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.code||"",onChange:e=>Ze({...Ue,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Set Menu Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ue.name,onChange:e=>Ze({...Ue,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Set Price (RM) *"}),(0,u.jsx)(p.ZQ,{type:"number",value:Ue.price,onChange:e=>Ze({...Ue,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category *"}),(0,u.jsx)(p.FX,{value:Ue.category,onChange:e=>Ze({...Ue,category:e.target.value}),children:e.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Emoji Icon"}),(0,u.jsx)(q,{children:We.other.map(e=>(0,u.jsx)(N,{selected:Ue.emoji===e,onClick:()=>Ze({...Ue,emoji:e}),children:e},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:Ue.description,onChange:e=>Ze({...Ue,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,u.jsx)(c.A,{value:Ue.image||"",onChange:e=>Ze({...Ue,image:e}),label:"Set Menu Image"}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Display Order (for sorting set menus)"}),(0,u.jsx)(p.ZQ,{type:"number",value:Ue.set_display_order||0,onChange:e=>Ze({...Ue,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Set Menu Items * (at least 1 item required)"}),Ge.length>0&&(0,u.jsx)(ee,{children:Ge.map(e=>{const n=i.find(i=>parseInt(i.id)===e.menuItemId),t=null===n||void 0===n?void 0:n.code;return(0,u.jsxs)(ie,{children:[(0,u.jsx)(ne,{children:(0,u.jsxs)(te,{children:[t?`${t} `:"",e.name]})}),(0,u.jsxs)(re,{children:[(0,u.jsx)(oe,{onClick:()=>Ke(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,u.jsx)(ae,{children:e.quantity}),(0,u.jsx)(oe,{onClick:()=>Ke(e.menuItemId,1),children:"+"})]}),(0,u.jsx)(le,{onClick:()=>{return i=e.menuItemId,void qe(Ge.filter(e=>e.menuItemId!==i));var i},children:"Remove"})]},e.menuItemId)})}),(0,u.jsxs)("div",{style:{marginTop:"12px"},children:[(0,u.jsx)(p.lR,{children:"Available Menu Items (select items to add to set)"}),(0,u.jsx)(p.ZQ,{type:"text",value:Ne,onChange:e=>Pe(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,u.jsx)(se,{children:i.filter(e=>!e.is_set_menu).filter(e=>{var i;if(!Ne)return!0;const n=Ne.toLowerCase(),t=null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(n),r=e.name.toLowerCase().includes(n);return t||r}).map(n=>{var t;return(0,u.jsxs)(de,{selected:Ge.some(e=>e.menuItemId===parseInt(n.id)),onClick:()=>(e=>{const n=i.find(i=>i.id===e.toString());if(!n||n.is_set_menu)return;const t=Ge.find(i=>i.menuItemId===e);qe(t?Ge.map(i=>i.menuItemId===e?{...i,quantity:i.quantity+1}:i):[...Ge,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(n.id)),children:[n.image?(0,u.jsx)("img",{src:n.image,alt:n.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,u.jsx)(ce,{children:n.emoji||"\ud83c\udf7d\ufe0f"}),(0,u.jsxs)(pe,{children:[(0,u.jsxs)(xe,{children:[n.code?`${n.code} `:"",n.name]}),(0,u.jsxs)(ue,{children:["RM ",n.price.toFixed(2)," \xb7 ",null===(t=e.find(e=>e.id===n.category))||void 0===t?void 0:t.name]})]})]},n.id)})})]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Set Menu Options (options for entire set)"}),(0,u.jsx)(P,{children:n.map(e=>(0,u.jsxs)(U,{children:[(0,u.jsx)("input",{type:"checkbox",checked:Qe.includes(e.id),onChange:()=>{return i=e.id,void(Qe.includes(i)?He(Qe.filter(e=>e!==i)):He([...Qe,i]));var i}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,u.jsx)(s.A,{isOpen:Be,onClose:()=>Se(!1),onConfirm:()=>{Ie&&(he(Ie),Se(!1),_e(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,u.jsx)(d.A,{isOpen:ze,onClose:()=>Re(!1),onConfirm:e=>{if($e){const i=parseFloat(e);o({...$e,price:i}),Re(!1),Me(null)}},title:"Update Price",label:`Enter new price for ${null===$e||void 0===$e?void 0:$e.name}:`,placeholder:null===$e||void 0===$e?void 0:$e.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},3338:(e,i,n)=>{n.d(i,{A:()=>c});var t=n(9950),r=n(9610),o=n(4752),a=n(4414);const l=o.Ay.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,s=o.Ay.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,d=o.Ay.div`
  color: #6B7C93;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`,c=e=>{let{isOpen:i,onClose:n,onConfirm:o,title:c,label:p,placeholder:x="",min:u=0,max:g,step:h=1,suffix:m="",confirmText:f="Apply",cancelText:j="Cancel"}=e;const[v,y]=(0,t.useState)(""),[b,F]=(0,t.useState)(""),C=()=>{const e=parseFloat(v);!isNaN(e)&&e>=u&&(void 0===g||e<=g)&&(o(v),y(""),F(""),n())},A=()=>{y(""),F(""),n()},w=(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.yl,{variant:"secondary",onClick:A,children:j}),(0,a.jsx)(r.yl,{variant:"primary",onClick:C,disabled:!v||!!b||parseFloat(v)<u,children:f})]});return(0,a.jsx)(r.aF,{isOpen:i,onClose:A,title:c,footer:w,children:(0,a.jsxs)("div",{children:[(0,a.jsx)(r.lR,{children:p}),(0,a.jsx)(l,{type:"text",value:v,onChange:e=>{const i=e.target.value;if(""===i)return y(""),void F("");if(!/^\d*\.?\d*$/.test(i))return;const n=parseFloat(i);isNaN(n)||F(n<u?`Minimum value is ${u}${m}`:void 0!==g&&n>g?`Maximum value is ${g}${m}`:""),y(i)},placeholder:x,autoFocus:!0,onKeyDown:e=>{"Enter"===e.key&&!b&&v&&C()}}),b&&(0,a.jsx)(s,{children:b}),!b&&void 0!==g&&(0,a.jsxs)(d,{children:["Enter a value between ",u,m," and ",g,m]})]})})}},4669:(e,i,n)=>{n.d(i,{A:()=>j});var t=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,l=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=r.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=r.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=r.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,m=r.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,f=r.Ay.input`
  display: none;
`,j=e=>{let{value:i,onChange:n,label:r="Logo Upload",helpText:j="Upload an image for your logo",maxSize:v=2,previewSize:y=150,showRemoveButton:b=!0,changeButtonText:F="Change Image",removeButtonText:C="Remove Image",imageAltText:A="Uploaded"}=e;const[w,k]=(0,t.useState)(!1),E=(0,t.useRef)(null),B=(0,t.useRef)(null),S=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);const i=new FileReader;i.onload=e=>{var i;const t=new Image;t.onload=()=>{const e=document.createElement("canvas"),i=e.getContext("2d");if(!i)return;const r=800;let o=t.width,a=t.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,i.drawImage(t,0,0,o,a);const l=e.toDataURL("image/jpeg",.85);n(l)},t.src=null===(i=e.target)||void 0===i?void 0:i.result},i.readAsDataURL(e)},I=e=>{const i=e.target.files;i&&i.length>0&&S(i[0])};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(l,{children:r}),j&&(0,o.jsx)(s,{children:j}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:B,isDragging:w,hasImage:!!i,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const i=e.dataTransfer.files;i&&i.length>0&&S(i[0])},onClick:()=>{var e;i||(null===(e=E.current)||void 0===e||e.click())},children:i?(0,o.jsx)("img",{src:i,alt:A}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:w?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(u,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),i&&(0,o.jsxs)(g,{children:[(0,o.jsxs)(h,{children:[F,(0,o.jsx)("input",{ref:E,type:"file",accept:"image/*",onChange:I})]}),b&&(0,o.jsx)(m,{onClick:()=>{n("")},children:C})]})]}),!i&&(0,o.jsx)(f,{ref:E,type:"file",accept:"image/*",onChange:I})]})}},9194:(e,i,n)=>{n.d(i,{A:()=>m});var t=n(9950),r=n(4752),o=n(4414);const a=r.Ay.div`
  position: relative;
  width: 100%;
`,l=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${e=>e.isOpen?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.disabled?"#F9FAFB":"white"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.disabled?"#E6EBF1":"#635BFF"};
  }

  ${e=>e.isOpen&&"\n    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);\n  "}
`,s=r.Ay.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${e=>e.disabled?"#9CA3AF":"#0A2540"};
  cursor: ${e=>e.disabled?"not-allowed":"text"};

  &::placeholder {
    color: #9CA3AF;
  }
`,d=r.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #E5E7EB;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #D1D5DB;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #6B7280;
  }
`,c=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0deg)"};

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,p=r.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${e=>e.isOpen?"block":"none"};
`,x=r.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,u=r.Ay.div`
  font-size: 14px;
`,g=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,h=r.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:i,value:n,onChange:r,placeholder:m="Select...",disabled:f=!1,allowClear:j=!0,noOptionsMessage:v="No options found"}=e;const[y,b]=(0,t.useState)(!1),[F,C]=(0,t.useState)(""),[A,w]=(0,t.useState)(-1),k=(0,t.useRef)(null),E=(0,t.useRef)(null),B=i.find(e=>e.value===n),S=i.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,t.useEffect)(()=>{const e=e=>{k.current&&!k.current.contains(e.target)&&(b(!1),C(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,t.useEffect)(()=>{y||(C(""),w(-1))},[y]);const I=e=>{r(e.value),b(!1),C("")},_=y?F:(null===B||void 0===B?void 0:B.label)||"";return(0,o.jsxs)(a,{ref:k,children:[(0,o.jsxs)(l,{isOpen:y,disabled:f,onClick:()=>{var e;f||(b(!0),null===(e=E.current)||void 0===e||e.focus())},children:[(0,o.jsx)(s,{ref:E,type:"text",value:_,onChange:e=>{C(e.target.value),w(0),y||b(!0)},onKeyDown:e=>{if(!f)switch(e.key){case"ArrowDown":e.preventDefault(),y?w(e=>e<S.length-1?e+1:e):b(!0);break;case"ArrowUp":e.preventDefault(),w(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),y&&A>=0&&S[A]?I(S[A]):y||b(!0);break;case"Escape":b(!1),C("")}},placeholder:m,disabled:f}),j&&n&&!f&&(0,o.jsx)(d,{onClick:e=>{e.stopPropagation(),r(null),C("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:y,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:y,children:S.length>0?S.map((e,i)=>(0,o.jsxs)(x,{isSelected:e.value===n,isHighlighted:i===A,onClick:()=>I(e),onMouseEnter:()=>w(i),children:[(0,o.jsx)(u,{children:e.label}),e.subLabel&&(0,o.jsx)(g,{children:e.subLabel})]},e.value)):(0,o.jsx)(h,{children:v})})]})}}}]);