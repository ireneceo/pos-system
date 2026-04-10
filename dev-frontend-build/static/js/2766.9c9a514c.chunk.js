"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2766],{2766:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ye});var i=t(9950),r=t(4492),o=t(4752),a=t(8930),s=t(1472),l=t(2538),d=t(4877),c=t(8409),p=t(9194),u=t(4021),x=t(6038),g=t(5030),h=t(9955),m=t(4414);const j=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,y=o.Ay.div`
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
`,f=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,v=o.Ay.div`
  display: flex;
  gap: 12px;
`,F=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=o.Ay.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`,C=o.Ay.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`,k=o.Ay.input`
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
`,w=o.Ay.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`,_=o.Ay.button`
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
`,E=o.Ay.div`
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
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`,S=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;

  ${e=>e.inactive&&"\n    opacity: 0.5;\n    background: #F9FAFB;\n\n    &::before {\n      content: 'INACTIVE';\n      position: absolute;\n      top: 10px;\n      left: 10px;\n      background: #6B7280;\n      color: white;\n      padding: 2px 8px;\n      border-radius: 4px;\n      font-size: 10px;\n      font-weight: 600;\n      z-index: 10;\n    }\n  "}

  ${e=>e.soldOut&&!e.inactive&&"\n    opacity: 0.7;\n\n    &::after {\n      content: 'SOLD OUT';\n      position: absolute;\n      top: 20px;\n      right: -30px;\n      background: #FF6B6B;\n      color: white;\n      padding: 4px 40px;\n      transform: rotate(45deg);\n      font-size: 12px;\n      font-weight: 600;\n    }\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,M=o.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  position: relative;
  overflow: hidden;
`,I=o.Ay.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`,z=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
`,R=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,$=o.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
`,O=o.Ay.p`
  font-size: 13px;
  color: #6B7C93;
  margin: 8px 0;
  line-height: 1.4;
`,P=o.Ay.span`
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
`,q=o.Ay.div`
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
`,T=o.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  margin-top: auto;
`,L=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n\n    &:hover {\n      background: #FFE6E6;\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n\n    &:hover {\n      background: #F6F9FC;\n      color: #635BFF;\n      border-color: #C7D2FE;\n    }\n  "}
`,N=o.Ay.button`
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${e=>e.danger?"\n    background: #FFF4F4;\n    color: #FF6B6B;\n    border-color: #FFE6E6;\n    &:hover { background: #FFE6E6; }\n  ":e.warning?"\n    background: #FFFBEB;\n    color: #F59E0B;\n    border-color: #FEF3C7;\n    &:hover { background: #FEF3C7; }\n  ":e.inactive?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n    &:hover { background: #E5E7EB; }\n  ":"\n    background: white;\n    color: #6B7C93;\n    &:hover { background: #F6F9FC; color: #635BFF; border-color: #C7D2FE; }\n  "}
`,G=o.Ay.div`
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
`,W=o.Ay.div`
  font-size: 48px;
  color: #635BFF;
  margin-bottom: 12px;
`,D=o.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
`,Z=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,Q=o.Ay.button`
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
`,U=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`,Y=o.Ay.label`
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
`,V=o.Ay.select`
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
`,H=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 36px;
`,X=o.Ay.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 20px;
  font-size: 13px;
  color: #4338CA;
`,J=o.Ay.span`
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
`,K=o.Ay.span`
  font-weight: 500;
`,ee=o.Ay.span`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  ${e=>"required"===e.type?"background: #FEE2E2; color: #DC2626;":"background: #DCFCE7; color: #16A34A;"}
`,ne=o.Ay.button`
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
`,te=o.Ay.div`
  margin-top: 24px;
`,ie=o.Ay.div`
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
`,re=o.Ay.div`
  background: #F6F9FC;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
`,oe=o.Ay.div`
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
`,ae=o.Ay.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`,se=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,le=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,de=o.Ay.button`
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
`,ce=o.Ay.span`
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: #0A2540;
`,pe=o.Ay.button`
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
`,ue=o.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
`,xe=o.Ay.div`
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
`,ge=o.Ay.span`
  font-size: 24px;
`,he=o.Ay.div`
  flex: 1;
`,me=o.Ay.div`
  font-weight: 500;
  color: #0A2540;
  font-size: 14px;
`,je=o.Ay.div`
  font-size: 12px;
  color: #6B7C93;
`,ye=()=>{const{t:e}=(0,g.Bd)("menu"),{categories:n,menuItems:t,optionGroups:o,updateMenuItem:ye,addMenuItem:fe,removeMenuItem:ve,toggleItemSoldOut:Fe}=(0,a.b)(),be=(0,r.Zp)(),[Ce,ke]=(0,i.useState)("all"),[we,_e]=(0,i.useState)(""),[Ae,Ee]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(!1),[Me,Ie]=(0,i.useState)(null),[ze,Re]=(0,i.useState)(!1),[$e,Oe]=(0,i.useState)(null),[Pe,qe]=(0,i.useState)(!1),[Te,Le]=(0,i.useState)(null),{defaultCurrency:Ne}=(0,u.i1)(),[Ge,We]=(0,i.useState)("RM");(0,i.useEffect)(()=>{Ne&&We(Ne)},[Ne]);const[De,Ze]=(0,i.useState)([]),[Qe,Ue]=(0,i.useState)(!1),[Ye,Ve]=(0,i.useState)([]),[,]=(0,i.useState)(0),[He,Xe]=(0,i.useState)(""),[Je,Ke]=(0,i.useState)(40),en=(0,i.useRef)(null),[nn,tn]=(0,i.useState)({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,is_featured:!1,set_items:[],set_display_order:0,recipe_id:null}),[rn,on]=(0,i.useState)([]),[an,sn]=(0,i.useState)([]);i.useEffect(()=>{(async()=>{try{const e=(0,h.c4)(),n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=null;if(t>=0&&(i=n[t+1]),!i)return void console.error("No restaurantId found in URL");const[r,o]=await Promise.all([fetch(`/api/restaurants/${i}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),fetch(`/api/restaurants/${i}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}})]);let a=[];if(r.ok){const e=await r.json();e.success&&(a=[...a,...e.data||[]])}if(o.ok){const e=await o.json();e.success&&(a=[...a,...e.data||[]])}if(Ze(a),i){const n=await fetch(`/api/restaurants/${i}/ingredients`,{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();sn((e.success?e.data:e)||[])}}}catch(e){console.error("Failed to fetch recipes:",e)}})()},[]);const[ln,dn]=(0,i.useState)([]),cn={other:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83e\uded7","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\uded8","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83e\uded0","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\uded2","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udedb","\ud83e\udd54","\ud83e\udeda","\ud83c\udf44","\ud83c\udf7d\ufe0f","\ud83e\udd44","\ud83c\udf74","\ud83e\udd62","\ud83c\udf71","\ud83e\udd61","\ud83d\udd2a","\ud83e\uddc2","\ud83e\uded5"]},pn=(()=>{let e="all"===Ce?t:t.filter(e=>e.category===Ce);if(we.trim()){const t=we.toLowerCase().trim();e=e.filter(e=>{var i;return e.name.toLowerCase().includes(t)||e.description&&e.description.toLowerCase().includes(t)||e.price.toString().includes(t)||(null===(i=n.find(n=>n.id===e.category))||void 0===i?void 0:i.name.toLowerCase().includes(t))})}return e})(),un=pn.length>50;(0,i.useEffect)(()=>{Ke(40)},[Ce,we]),(0,i.useEffect)(()=>{if(!un)return;const e=en.current;if(!e)return;const n=new IntersectionObserver(e=>{e[0].isIntersecting&&Ke(e=>e+30)},{threshold:.1,rootMargin:"100px"});return n.observe(e),()=>n.disconnect()},[un,Je,pn.length]);const xn=()=>{tn({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!1,set_items:[],set_display_order:0,recipe_id:null}),dn([]),Ve([]),Ee(!0)},gn=(e,n)=>{Ve(Ye.map(t=>{if(t.menuItemId===e){const e=Math.max(1,t.quantity+n);return{...t,quantity:e}}return t}))};return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(j,{children:[(0,m.jsxs)(y,{children:[(0,m.jsx)(f,{children:e("menu:menuManagementPage.menu")}),(0,m.jsxs)(v,{children:[(0,m.jsx)(c.$n,{variant:"secondary",onClick:()=>{tn({name:"",price:0,category:"",emoji:"\ud83c\udf7d\ufe0f",description:"",image:"",optionGroups:[],is_set_menu:!0,set_items:[],set_display_order:0,recipe_id:null}),dn([]),Ve([]),Ue(!0)},children:e("menu:menuManagementPage.createSetMenu")}),(0,m.jsx)(c.$n,{variant:"primary",onClick:xn,children:e("menu:menuManagementPage.addNewItem")})]})]}),(0,m.jsxs)(F,{children:[(0,m.jsx)(b,{children:(0,m.jsxs)(C,{children:[(0,m.jsx)(w,{children:"\ud83d\udd0d"}),(0,m.jsx)(k,{type:"text",placeholder:"Search menu items by name, description, price, or category...",value:we,onChange:e=>_e(e.target.value)}),we&&(0,m.jsx)(_,{onClick:()=>_e(""),title:"Clear search",children:"\xd7"})]})}),we&&pn.length>0&&(0,m.jsxs)(A,{children:[(0,m.jsxs)("span",{children:["Found ",pn.length," item",1!==pn.length?"s":"",' matching "',we,'"']}),(0,m.jsx)(c.$n,{variant:"secondary",onClick:()=>_e(""),children:e("menu:menuManagementPage.clearSearch")})]}),(0,m.jsxs)(c.j,{children:[(0,m.jsxs)(c.oz,{active:"all"===Ce,onClick:()=>{ke("all"),_e("")},children:["All Items (",t.length,")"]}),n.map(e=>(0,m.jsxs)(c.oz,{active:Ce===e.id,onClick:()=>{ke(e.id),_e("")},children:[e.emoji," ",e.name]},e.id))]}),we&&0===pn.length?(0,m.jsxs)(E,{children:[(0,m.jsx)("div",{className:"icon",children:"\ud83d\udd0d"}),(0,m.jsxs)("div",{className:"title",children:['No results for "',we,'"']}),(0,m.jsx)("div",{className:"message",children:"Try searching with different keywords or check the spelling"})]}):(0,m.jsxs)(B,{children:[(un?pn.slice(0,Je):pn).map(i=>{var r;return(0,m.jsxs)(S,{soldOut:i.soldOut,inactive:!1===i.is_active,children:[(0,m.jsxs)(M,{children:[i.is_set_menu&&(0,m.jsx)(ie,{children:e("menu:menuManagementPage.set")}),i.is_featured&&(0,m.jsx)(ie,{style:{background:"#635BFF",left:i.is_set_menu?"52px":"8px"},children:e("menu:menuManagementPage.featured")}),i.image&&""!==i.image.trim()?(0,m.jsx)("img",{src:i.image,alt:i.name,loading:"lazy",style:{width:"100%",height:"100%",objectFit:"cover"},onError:e=>{e.currentTarget.style.display="none",e.currentTarget.parentElement&&(e.currentTarget.parentElement.innerHTML=i.emoji||"\ud83c\udf7d\ufe0f",e.currentTarget.parentElement.style.fontSize="48px",e.currentTarget.parentElement.style.display="flex",e.currentTarget.parentElement.style.alignItems="center",e.currentTarget.parentElement.style.justifyContent="center")}}):(0,m.jsx)("span",{style:{fontSize:"48px"},children:i.emoji||"\ud83c\udf7d\ufe0f"})]}),(0,m.jsxs)(I,{children:[(0,m.jsx)(q,{children:null===(r=n.find(e=>e.id===i.category))||void 0===r?void 0:r.name}),(0,m.jsxs)(z,{children:[(0,m.jsxs)(R,{children:[i.code?`${i.code} `:"",i.name]}),(0,m.jsx)($,{children:(0,x.vv)(i.price,Ge)})]}),(0,m.jsx)(O,{children:i.description||"No description available"}),i.is_set_menu&&i.set_items&&i.set_items.length>0&&(0,m.jsxs)(O,{style:{fontSize:"11px",color:"#667eea",fontWeight:500},children:["Set includes: ",i.set_items.map(e=>{const n=t.find(n=>n.id===e.menuItemId.toString()),i=null===n||void 0===n?void 0:n.code;return`${i?`${i} `:""}${e.name} x${e.quantity}`}).join(", ")]}),i.optionGroups&&i.optionGroups.length>0&&(0,m.jsxs)(O,{style:{fontSize:"11px",color:"#8898AA"},children:["Option Groups: ",i.optionGroups.map(e=>{var n;return null===(n=o.find(n=>n.id===e))||void 0===n?void 0:n.name}).filter(Boolean).join(", ")]}),i.recipe_id&&(()=>{const e=De.find(e=>e.id===i.recipe_id);return e?(0,m.jsxs)(P,{onClick:n=>{n.stopPropagation();const t=window.location.pathname.split("/"),i=t.indexOf("restaurant"),r=i>=0?t[i+1]:"";be(`/restaurant/${r}/recipe-management?search=${encodeURIComponent(e.name)}`)},children:["Recipe: ",e.name]}):null})(),(0,m.jsxs)(T,{children:[(0,m.jsx)(L,{onClick:()=>(e=>{if(Ie(e),tn({...e,emoji:e.emoji||"\ud83c\udf7d\ufe0f",image:e.image||"",optionGroups:e.optionGroups||[],is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:e.set_display_order||0,recipe_id:e.recipe_id||null}),dn(e.optionGroups||[]),Ve(e.set_items||[]),e.recipe_id){var n;const t=De.find(n=>n.id===e.recipe_id);t&&null!==(n=t.name)&&void 0!==n&&n.endsWith("(auto)")&&t.recipeIngredients?(tn(e=>({...e,recipe_id:null})),on(t.recipeIngredients.map(e=>{var n,t;return{ingredient_id:e.ingredient_id,name:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||"",quantity:parseFloat(e.quantity),unit:e.unit,unit_cost:parseFloat((null===(t=e.ingredient)||void 0===t?void 0:t.unit_cost)||0)}}))):on([])}else on([]);e.is_set_menu?Ue(!0):Se(!0)})(i),children:"Edit"}),(0,m.jsx)(N,{onClick:()=>(async e=>{try{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant"),i=t>=0?n[t+1]:"",r=(0,h.c4)(),o=await fetch(`/api/menu/product/${e.id}/copy?restaurantId=${i}`,{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),a=await o.json();a.success?window.location.reload():alert(a.error||"Failed to copy menu item")}catch(n){console.error("Error copying menu item:",n),alert("Failed to copy menu item")}})(i),title:"Copy",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2",stroke:"currentColor",strokeWidth:"2"}),(0,m.jsx)("path",{d:"M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",stroke:"currentColor",strokeWidth:"2"})]})}),(0,m.jsx)(N,{onClick:()=>(async e=>{try{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant"),i=t>=0?n[t+1]:"",r=(0,h.c4)(),o=await fetch(`/api/menu/product/${e.id}/toggle-active?restaurantId=${i}`,{method:"PUT",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}}),a=await o.json();a.success?ye({...e,is_active:a.data.is_active}):alert(a.error||"Failed to toggle menu item status")}catch(n){console.error("Error toggling menu item status:",n),alert("Failed to toggle menu item status")}})(i),inactive:!1===i.is_active,title:!1===i.is_active?"Activate":"Deactivate",children:!1===i.is_active?(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",stroke:"currentColor",strokeWidth:"2"}),(0,m.jsx)("circle",{cx:"12",cy:"12",r:"3",stroke:"currentColor",strokeWidth:"2"})]}):(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(N,{onClick:()=>Fe(i.id),warning:i.soldOut,title:i.soldOut?"Mark In Stock":"Mark Sold Out",children:i.soldOut?(0,m.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("polyline",{points:"20 6 9 17 4 12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}):(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("circle",{cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"2"}),(0,m.jsx)("line",{x1:"4.93",y1:"4.93",x2:"19.07",y2:"19.07",stroke:"currentColor",strokeWidth:"2"})]})}),(0,m.jsx)(N,{danger:!0,onClick:()=>{return e=i.id,Oe(e),void Re(!0);var e},title:"Delete",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})})]})]})]},i.id)}),(0,m.jsxs)(G,{onClick:xn,children:[(0,m.jsx)(W,{children:"+"}),(0,m.jsx)(D,{children:e("menu:menuManagementPage.addNewMenuItem")})]}),un&&Je<pn.length&&(0,m.jsx)("div",{ref:en,style:{gridColumn:"1 / -1",height:"20px"}})]})]}),(0,m.jsxs)(c.aF,{isOpen:Ae,onClose:()=>Ee(!1),title:"Add New Menu Item",size:"medium",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.$n,{variant:"secondary",onClick:()=>Ee(!1),children:"Cancel"}),(0,m.jsx)(c.$n,{variant:"primary",onClick:()=>{if(!nn.category)return;const e={id:`item-${Date.now()}`,code:nn.code||"",name:nn.name||"",price:nn.price||0,category:nn.category,emoji:nn.emoji||"\ud83c\udf7d\ufe0f",description:nn.description,image:nn.image,optionGroups:ln,soldOut:!1,is_set_menu:!1,is_featured:nn.is_featured||!1,set_items:[],set_display_order:0,recipe_id:nn.recipe_id||null,directIngredients:nn.recipe_id?void 0:rn};fe(e),on([]),Ee(!1)},disabled:!nn.name||!nn.category,children:"Add Item"})]}),children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.itemCode")}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.code||"",onChange:e=>tn({...nn,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Item Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.name,onChange:e=>tn({...nn,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Price (RM) *"}),(0,m.jsx)(c.ZQ,{type:"number",value:nn.price,onChange:e=>tn({...nn,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category *"}),(0,m.jsxs)(c.FX,{value:nn.category,onChange:e=>tn({...nn,category:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"-- Select Category --"}),n.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsx)(c.gE,{children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,m.jsx)("input",{type:"checkbox",checked:nn.is_featured||!1,onChange:e=>tn({...nn,is_featured:e.target.checked})}),(0,m.jsx)("span",{style:{fontSize:"14px",color:"#0A2540",fontWeight:500},children:e("menu:menuManagementPage.featuredItem")}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:e("menu:menuManagementPage.showInMobileFeaturedTab")})]})}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.emojiIcon")}),(0,m.jsx)(Z,{children:cn.other.map(e=>(0,m.jsx)(Q,{selected:nn.emoji===e,onClick:()=>tn({...nn,emoji:e}),children:e},e))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.description")}),(0,m.jsx)(c.Lz,{value:nn.description,onChange:e=>tn({...nn,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,m.jsx)(d.A,{value:nn.image||"",onChange:e=>tn({...nn,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,m.jsxs)(c.gE,{style:{marginTop:"24px"},children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.linkedRecipe")}),(0,m.jsx)(p.A,{options:De.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:nn.recipe_id||null,onChange:e=>tn({...nn,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),!nn.recipe_id&&(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Ingredients (direct) ",rn.length>0&&(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",fontWeight:400},children:["Cost: RM ",rn.reduce((e,n)=>e+n.unit_cost*n.quantity,0).toFixed(2)]})]}),rn.map((e,n)=>(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",fontSize:"13px",background:"#F9FAFB",padding:"8px 12px",borderRadius:"6px"},children:[(0,m.jsx)("span",{style:{flex:1},children:e.name}),(0,m.jsx)("input",{type:"number",value:e.quantity,min:"0.01",step:"0.01",style:{width:"60px",textAlign:"center",border:"1px solid #E6EBF1",borderRadius:"4px",padding:"2px 4px",fontSize:"13px"},onChange:e=>on(t=>t.map((t,i)=>i===n?{...t,quantity:parseFloat(e.target.value)||0}:t))}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",width:"30px"},children:e.unit}),(0,m.jsxs)("span",{style:{width:"70px",textAlign:"right",color:"#6B7280",fontSize:"12px"},children:["RM ",(e.unit_cost*e.quantity).toFixed(2)]}),(0,m.jsx)("button",{type:"button",onClick:()=>on(e=>e.filter((e,t)=>t!==n)),style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"x"})]},n)),(0,m.jsx)(p.A,{options:an.filter(e=>!rn.some(n=>n.ingredient_id===e.id)).map(e=>({value:e.id,label:e.name,subLabel:`${e.unit} / RM ${Number(e.unit_cost||0).toFixed(2)}`})),value:null,onChange:e=>{if(e){const n=an.find(n=>n.id===e);n&&on(e=>[...e,{ingredient_id:n.id,name:n.name,quantity:1,unit:n.unit,unit_cost:Number(n.unit_cost||0)}])}},placeholder:"+ Add ingredient...",allowClear:!1,noOptionsMessage:"No ingredients available"})]}),(0,m.jsx)(te,{children:(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Option Groups ",ln.length>0&&`(${ln.length} selected)`]}),(0,m.jsxs)(V,{value:"",onChange:e=>{e.target.value&&!ln.includes(e.target.value)&&dn([...ln,e.target.value])},children:[(0,m.jsx)("option",{value:"",children:e("menu:menuManagementPage.selectOptionGroupToAdd")}),o.filter(e=>!ln.includes(e.id)).map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,m.jsx)(H,{children:ln.map((e,n)=>{const t=o.find(n=>n.id===e);return t?(0,m.jsxs)(X,{children:[(0,m.jsx)(J,{children:n+1}),(0,m.jsx)(K,{children:t.name}),(0,m.jsx)(ee,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,m.jsx)(ne,{onClick:()=>dn(ln.filter(n=>n!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,m.jsxs)(c.aF,{isOpen:Be,onClose:()=>Se(!1),title:"Edit Menu Item",size:"medium",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.$n,{variant:"secondary",onClick:()=>Se(!1),children:"Cancel"}),(0,m.jsx)(c.$n,{variant:"primary",onClick:()=>{if(Me){const e={...Me,...nn,optionGroups:ln,directIngredients:nn.recipe_id?void 0:rn};ye(e),on([]),Se(!1),Ie(null)}},children:"Save Changes"})]}),children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.itemCode")}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.code||"",onChange:e=>tn({...nn,code:e.target.value}),placeholder:"e.g., A01, B02 (optional)"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Item Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.name,onChange:e=>tn({...nn,name:e.target.value}),placeholder:"e.g., Chicken Rice"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Price (RM) *"}),(0,m.jsx)(c.ZQ,{type:"number",value:nn.price,onChange:e=>tn({...nn,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category *"}),(0,m.jsxs)(c.FX,{value:nn.category,onChange:e=>tn({...nn,category:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"-- Select Category --"}),n.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsx)(c.gE,{children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,m.jsx)("input",{type:"checkbox",checked:nn.is_featured||!1,onChange:e=>tn({...nn,is_featured:e.target.checked})}),(0,m.jsx)("span",{style:{fontSize:"14px",color:"#0A2540",fontWeight:500},children:e("menu:menuManagementPage.featuredItem")}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:e("menu:menuManagementPage.showInMobileFeaturedTab")})]})}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.emojiIcon")}),(0,m.jsx)(Z,{children:cn.other.map(e=>(0,m.jsx)(Q,{selected:nn.emoji===e,onClick:()=>tn({...nn,emoji:e}),children:e},e))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.description")}),(0,m.jsx)(c.Lz,{value:nn.description,onChange:e=>tn({...nn,description:e.target.value}),placeholder:"Brief description of the item..."})]}),(0,m.jsx)(d.A,{value:nn.image||"",onChange:e=>tn({...nn,image:e}),label:"Menu Item Image",helpText:"Upload an image for this menu item (PNG, JPG, GIF up to 2MB)",maxSize:2,showRemoveButton:!0}),(0,m.jsxs)(c.gE,{style:{marginTop:"24px"},children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.linkedRecipe")}),(0,m.jsx)(p.A,{options:De.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:nn.recipe_id||null,onChange:e=>tn({...nn,recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No recipes found"})]}),!nn.recipe_id&&(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Ingredients (direct) ",rn.length>0&&(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",fontWeight:400},children:["Cost: RM ",rn.reduce((e,n)=>e+n.unit_cost*n.quantity,0).toFixed(2)]})]}),rn.map((e,n)=>(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",fontSize:"13px",background:"#F9FAFB",padding:"8px 12px",borderRadius:"6px"},children:[(0,m.jsx)("span",{style:{flex:1},children:e.name}),(0,m.jsx)("input",{type:"number",value:e.quantity,min:"0.01",step:"0.01",style:{width:"60px",textAlign:"center",border:"1px solid #E6EBF1",borderRadius:"4px",padding:"2px 4px",fontSize:"13px"},onChange:e=>on(t=>t.map((t,i)=>i===n?{...t,quantity:parseFloat(e.target.value)||0}:t))}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",width:"30px"},children:e.unit}),(0,m.jsxs)("span",{style:{width:"70px",textAlign:"right",color:"#6B7280",fontSize:"12px"},children:["RM ",(e.unit_cost*e.quantity).toFixed(2)]}),(0,m.jsx)("button",{type:"button",onClick:()=>on(e=>e.filter((e,t)=>t!==n)),style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"x"})]},n)),(0,m.jsx)(p.A,{options:an.filter(e=>!rn.some(n=>n.ingredient_id===e.id)).map(e=>({value:e.id,label:e.name,subLabel:`${e.unit} / RM ${Number(e.unit_cost||0).toFixed(2)}`})),value:null,onChange:e=>{if(e){const n=an.find(n=>n.id===e);n&&on(e=>[...e,{ingredient_id:n.id,name:n.name,quantity:1,unit:n.unit,unit_cost:Number(n.unit_cost||0)}])}},placeholder:"+ Add ingredient...",allowClear:!1,noOptionsMessage:"No ingredients available"})]}),(0,m.jsx)(te,{children:(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Option Groups ",ln.length>0&&`(${ln.length} selected)`]}),(0,m.jsxs)(V,{value:"",onChange:e=>{e.target.value&&!ln.includes(e.target.value)&&dn([...ln,e.target.value])},children:[(0,m.jsx)("option",{value:"",children:e("menu:menuManagementPage.selectOptionGroupToAdd")}),o.filter(e=>!ln.includes(e.id)).map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))]}),(0,m.jsx)(H,{children:ln.map((e,n)=>{const t=o.find(n=>n.id===e);return t?(0,m.jsxs)(X,{children:[(0,m.jsx)(J,{children:n+1}),(0,m.jsx)(K,{children:t.name}),(0,m.jsx)(ee,{type:t.required?"required":"optional",children:t.required?"Required":"Optional"}),(0,m.jsx)(ne,{onClick:()=>dn(ln.filter(n=>n!==e)),title:"Remove",children:"\xd7"})]},e):null})})]})})]}),(0,m.jsxs)(c.aF,{isOpen:Qe,onClose:()=>{Ue(!1),Ie(null),Ve([])},title:Me?"Edit Set Menu":"Create Set Menu",size:"large",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.$n,{variant:"secondary",onClick:()=>{Ue(!1),Ie(null),Ve([])},children:"Cancel"}),(0,m.jsx)(c.$n,{variant:"primary",onClick:()=>{if(0===Ye.length)return void alert("Set menu must contain at least one menu item.");if(!nn.category)return;const e={id:(null===Me||void 0===Me?void 0:Me.id)||`item-${Date.now()}`,code:nn.code||"",name:nn.name||"",price:nn.price||0,category:nn.category,emoji:nn.emoji||"\ud83c\udf7d\ufe0f",description:nn.description,image:nn.image,optionGroups:ln,soldOut:!1,is_set_menu:!0,set_items:Ye,set_display_order:nn.set_display_order||0};Me?ye(e):fe(e),Ue(!1),Ie(null),Ve([])},disabled:!nn.name||!nn.category,children:Me?"Save Changes":"Create Set Menu"})]}),children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.itemCode")}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.code||"",onChange:e=>tn({...nn,code:e.target.value}),placeholder:"e.g., S01, S02 (optional)"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Set Menu Name *"}),(0,m.jsx)(c.ZQ,{type:"text",value:nn.name,onChange:e=>tn({...nn,name:e.target.value}),placeholder:"e.g., Family Set, Lunch Combo"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Set Price (RM) *"}),(0,m.jsx)(c.ZQ,{type:"number",value:nn.price,onChange:e=>tn({...nn,price:parseFloat(e.target.value)||0}),onFocus:e=>{0===parseFloat(e.target.value)&&e.target.select()},step:"0.01",min:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Category *"}),(0,m.jsxs)(c.FX,{value:nn.category,onChange:e=>tn({...nn,category:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"-- Select Category --"}),n.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsx)(c.gE,{children:(0,m.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[(0,m.jsx)("input",{type:"checkbox",checked:nn.is_featured||!1,onChange:e=>tn({...nn,is_featured:e.target.checked})}),(0,m.jsx)("span",{style:{fontSize:"14px",color:"#0A2540",fontWeight:500},children:e("menu:menuManagementPage.featuredItem")}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:e("menu:menuManagementPage.showInMobileFeaturedTab")})]})}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.emojiIcon")}),(0,m.jsx)(Z,{children:cn.other.map(e=>(0,m.jsx)(Q,{selected:nn.emoji===e,onClick:()=>tn({...nn,emoji:e}),children:e},e))})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.description")}),(0,m.jsx)(c.Lz,{value:nn.description,onChange:e=>tn({...nn,description:e.target.value}),placeholder:"Brief description of this set menu..."})]}),(0,m.jsx)(d.A,{value:nn.image||"",onChange:e=>tn({...nn,image:e}),label:"Set Menu Image"}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.displayOrderForSortingSetMenus")}),(0,m.jsx)(c.ZQ,{type:"number",value:nn.set_display_order||0,onChange:e=>tn({...nn,set_display_order:parseInt(e.target.value)||0}),min:"0"})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Set Menu Items * (at least 1 item required)"}),Ye.length>0&&(0,m.jsx)(re,{children:Ye.map(e=>{const n=t.find(n=>parseInt(n.id)===e.menuItemId),i=null===n||void 0===n?void 0:n.code;return(0,m.jsxs)(oe,{children:[(0,m.jsx)(ae,{children:(0,m.jsxs)(se,{children:[i?`${i} `:"",e.name]})}),(0,m.jsxs)(le,{children:[(0,m.jsx)(de,{onClick:()=>gn(e.menuItemId,-1),disabled:e.quantity<=1,children:"\u2212"}),(0,m.jsx)(ce,{children:e.quantity}),(0,m.jsx)(de,{onClick:()=>gn(e.menuItemId,1),children:"+"})]}),(0,m.jsx)(pe,{onClick:()=>{return n=e.menuItemId,void Ve(Ye.filter(e=>e.menuItemId!==n));var n},children:"Remove"})]},e.menuItemId)})}),(0,m.jsxs)("div",{style:{marginTop:"12px"},children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.availableMenuItemsSelectItemsToAddToSet")}),(0,m.jsx)(c.ZQ,{type:"text",value:He,onChange:e=>Xe(e.target.value),placeholder:"Search by code or name...",style:{marginBottom:"12px"}}),(0,m.jsx)(ue,{children:t.filter(e=>!e.is_set_menu).filter(e=>{var n;if(!He)return!0;const t=He.toLowerCase(),i=null===(n=e.code)||void 0===n?void 0:n.toLowerCase().includes(t),r=e.name.toLowerCase().includes(t);return i||r}).map(e=>{var i;return(0,m.jsxs)(xe,{selected:Ye.some(n=>n.menuItemId===parseInt(e.id)),onClick:()=>(e=>{const n=t.find(n=>n.id===e.toString());if(!n||n.is_set_menu)return;const i=Ye.find(n=>n.menuItemId===e);Ve(i?Ye.map(n=>n.menuItemId===e?{...n,quantity:n.quantity+1}:n):[...Ye,{menuItemId:e,name:n.name,quantity:1}])})(parseInt(e.id)),children:[e.image?(0,m.jsx)("img",{src:e.image,alt:e.name,loading:"lazy",style:{width:"48px",height:"48px",objectFit:"cover",borderRadius:"8px",marginRight:"12px"}}):(0,m.jsx)(ge,{children:e.emoji||"\ud83c\udf7d\ufe0f"}),(0,m.jsxs)(he,{children:[(0,m.jsxs)(me,{children:[e.code?`${e.code} `:"",e.name]}),(0,m.jsxs)(je,{children:[(0,x.vv)(e.price,Ge)," \xb7 ",null===(i=n.find(n=>n.id===e.category))||void 0===i?void 0:i.name]})]})]},e.id)})})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:e("menu:menuManagementPage.setMenuOptionsOptionsForEntireSet")}),(0,m.jsx)(U,{children:o.map(e=>(0,m.jsxs)(Y,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ln.includes(e.id),onChange:()=>{return n=e.id,void(ln.includes(n)?dn(ln.filter(e=>e!==n)):dn([...ln,n]));var n}}),e.name," (",e.required?"Required":"Optional",", ",e.multiple?"Multi":"Single",")"]},e.id))})]})]}),(0,m.jsx)(s.A,{isOpen:ze,onClose:()=>Re(!1),onConfirm:()=>{$e&&(ve($e),Re(!1),Oe(null))},title:"Delete Menu Item",message:"Are you sure you want to delete this menu item? This action cannot be undone.",confirmText:"Delete",cancelText:"Cancel",variant:"danger"}),(0,m.jsx)(l.A,{isOpen:Pe,onClose:()=>qe(!1),onConfirm:e=>{if(Te){const n=parseFloat(e);ye({...Te,price:n}),qe(!1),Le(null)}},title:"Update Price",label:`Enter new price for ${null===Te||void 0===Te?void 0:Te.name}:`,placeholder:null===Te||void 0===Te?void 0:Te.price.toString(),min:0,step:.01,suffix:" RM",confirmText:"Update Price",cancelText:"Cancel"})]})})}},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var i=t(9950),r=t(1367),o=t(6038),a=t(9955);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,i.useState)("RM"),[s]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),i=n.indexOf("restaurant");let r=i>=0?n[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=(0,a.c4)(),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var o;const e=await n.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";t(i)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}}}]);