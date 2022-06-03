(function(){"use strict";var e={745:function(e,t,s){var o=s(963),l=s(252),a=s(577);const n={id:"gpa-calc-app"},i=(0,l._)("h1",null,"GPA Calculator 1.0",-1),r={style:{width:"70%",display:"inline-block","vertical-align":"top"}},u=(0,l._)("label",{for:"K-12"},"K-12",-1),d=(0,l._)("label",{for:"College"},"College",-1),c=(0,l._)("hr",null,null,-1),p={class:"semester-data"},m=["onUpdate:modelValue"],h=["value","onInput"],g=["onClick"],f=["onUpdate:modelValue"],C=["value","onInput"],v=["value","onInput"],b=(0,l._)("i",{class:"icons fa fa-thin fa-arrow-right fa-lg"},null,-1),_=["value","onInput"],y=["value","onInput"],w=(0,l.Uk)(" or "),k=["onClick"],G=["onClick"],A=["onClick"],D=(0,l._)("i",{class:"icons fa fa-solid fa-calendar fa-lg"},null,-1),I=(0,l._)("i",{class:"icons fa fa-solid fa-graduation-cap fa-lg"},null,-1),S=(0,l._)("hr",null,null,-1),x=(0,l._)("p",null,[(0,l.Uk)(" Made on a "),(0,l._)("i",{class:"icons fa fa-solid fa-plane fa-lg"}),(0,l.Uk)(" by "),(0,l._)("a",{target:"_blank",href:"https://devondoyle.com/"},"Devon Doyle")],-1),E={style:{width:"16.2%",display:"inline-block","vertical-align":"top","margin-left":"2.4%",position:"fixed","text-align":"center"}},P={class:"box"},U=(0,l._)("h2",null,"Total Credits",-1),O=(0,l._)("hr",{style:{width:"80%"}},null,-1),z=(0,l._)("h2",null,"Weighted GPA",-1),T=(0,l._)("br",null,null,-1),N={id:"course-grade-calc"},B=(0,l._)("h1",null,"Course Grade Calculator",-1),V=(0,l._)("hr",null,null,-1),j={class:"semester-data"},K=["onUpdate:modelValue"],F=["value","onInput"],M=["value","onInput"],R=["onClick"],W=["onUpdate:modelValue"],Y=["value","onInput"],H=["value","onInput"],$=["value","onInput"],q=["onClick"],J=["onClick"],L=(0,l._)("hr",null,null,-1),Q={key:0};function Z(e,t,s,Z,X,ee){return(0,l.wg)(),(0,l.iD)("div",{id:"app",style:(0,a.j5)({background:X.gradient})},[(0,l._)("div",n,[i,(0,l._)("div",r,[(0,l._)("p",null,[(0,l._)("button",{class:"menu-button",onClick:t[0]||(t[0]=e=>ee.downloadData())},"Save"),(0,l._)("button",{class:"menu-button",onClick:t[1]||(t[1]=e=>ee.uploadData())},"Load"),(0,l._)("button",{class:"menu-button",onClick:t[2]||(t[2]=e=>ee.reset())},"Reset"),(0,l.wy)((0,l._)("input",{type:"radio",id:"K-12",value:"K-12","onUpdate:modelValue":t[3]||(t[3]=e=>X.mode=e),onChange:t[4]||(t[4]=e=>ee.updateGPA())},null,544),[[o.G2,X.mode]]),u,(0,l.wy)((0,l._)("input",{type:"radio",id:"College",value:"College","onUpdate:modelValue":t[5]||(t[5]=e=>X.mode=e),onChange:t[6]||(t[6]=e=>ee.updateGPA())},null,544),[[o.G2,X.mode]]),d]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(X.semesters,((e,s)=>((0,l.wg)(),(0,l.iD)("div",{key:s,class:"semester-wrapper"},[c,(0,l._)("div",p,[(0,l._)("p",null,[(0,l.wy)((0,l._)("input",{type:"checkbox",id:"semester-checkbox",onChange:t[7]||(t[7]=e=>ee.updateGPA()),"onUpdate:modelValue":t=>e.included=t},null,40,m),[[o.e8,e.included]]),(0,l._)("input",{type:"text",value:e.title,onInput:e=>ee.updateSectionAttribute(e,s,"title","gpa"),placeholder:"Semester (e.g. Fall 2022)",class:"shadow"},null,40,h),(0,l._)("i",{onClick:e=>ee.removeSection(s),class:"icons fa fa-solid fa-trash fa-lg fade-hover"},null,8,g)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.courses,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{key:a},[(0,l.wy)((0,l._)("input",{type:"checkbox",id:"course-checkbox",onChange:t[8]||(t[8]=e=>ee.updateGPA()),"onUpdate:modelValue":e=>X.semesters[s].courses[a].included=e},null,40,f),[[o.e8,X.semesters[s].courses[a].included]]),(0,l._)("input",{type:"text",value:e.title,onInput:e=>ee.updateComponentAttribute(e,s,a,"title"),placeholder:"Course (e.g. EECS 445)",class:"shadow"},null,40,C),"College"==X.mode?((0,l.wg)(),(0,l.iD)("input",{key:0,type:"text",value:e.credits,onInput:e=>ee.updateComponentAttribute(e,s,a,"credits"),placeholder:"Credit hours",class:"shadow"},null,40,v)):(0,l.kq)("",!0),b,e.custom?((0,l.wg)(),(0,l.iD)("input",{key:1,type:"text",value:e.grade,onInput:e=>ee.updateComponentAttribute(e,s,a,"grade"),placeholder:"Letter Grade",disabled:""},null,40,_)):((0,l.wg)(),(0,l.iD)("input",{key:2,type:"text",value:e.grade,onInput:e=>ee.updateComponentAttribute(e,s,a,"grade"),placeholder:"Letter Grade",class:"shadow"},null,40,y)),w,(0,l._)("button",{onClick:e=>ee.startCustomGrade(s,a)},"Calculate Grade",8,k),(0,l._)("i",{onClick:e=>ee.removeComponent(s,a,"gpa"),class:"icons fa fa-solid fa-trash fa-lg fade-hover"},null,8,G)])))),128)),(0,l._)("p",null,[(0,l._)("button",{onClick:e=>ee.addComponent(s,"gpa")},"Add Course",8,A)]),(0,l._)("p",null,[D,(0,l.Uk)(" Semester credits: "+(0,a.zw)(e.credits)+" ",1),I,(0,l.Uk)(" Semester GPA: "+(0,a.zw)(e.gpa),1)])])])))),128)),S,(0,l._)("p",null,[(0,l._)("button",{onClick:t[9]||(t[9]=e=>ee.addSection())},"Add Semester")]),x]),(0,l._)("div",E,[(0,l._)("div",P,[U,(0,l._)("h2",null,(0,a.zw)(X.hours),1),O,z,(0,l._)("h2",null,(0,a.zw)(X.gpa),1)]),T])]),(0,l._)("div",N,[B,(0,l._)("p",null,(0,a.zw)(X.tempName),1),(0,l._)("p",null,[(0,l._)("button",{class:"menu-button",onClick:t[10]||(t[10]=e=>ee.applyCustomGrade())},"Apply"),(0,l._)("button",{class:"menu-button",onClick:t[11]||(t[11]=e=>ee.deleteCustomGrade())},"Remove Custom Grade"),(0,l._)("button",{class:"menu-button",onClick:t[12]||(t[12]=e=>ee.resetCustom())},"Clear")]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(X.customGrades,((e,s)=>((0,l.wg)(),(0,l.iD)("div",{key:s,class:"semester-wrapper"},[V,(0,l._)("div",j,[(0,l._)("p",null,[(0,l.wy)((0,l._)("input",{type:"checkbox",id:"semester-checkbox",onChange:t[13]||(t[13]=e=>ee.updateCourseGrade()),"onUpdate:modelValue":t=>e.included=t},null,40,K),[[o.e8,e.included]]),(0,l._)("input",{type:"text",value:e.title,onInput:e=>ee.updateSectionAttribute(e,s,"title","grade"),placeholder:"Section (e.g. Quizzes)"},null,40,F),(0,l._)("input",{type:"text",value:e.weight,onInput:e=>ee.updateSectionAttribute(e,s,"weight","grade"),placeholder:"Weight percent (e.g. 20%)"},null,40,M),(0,l._)("button",{onClick:e=>ee.removeSection(s,"grade")},"Delete",8,R)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.assignments,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{key:a},[(0,l.wy)((0,l._)("input",{type:"checkbox",id:"course-checkbox",onChange:t[14]||(t[14]=e=>ee.updateCourseGrade()),"onUpdate:modelValue":e=>X.customGrades[s].assignments[a].included=e},null,40,W),[[o.e8,X.customGrades[s].assignments[a].included]]),(0,l._)("input",{type:"text",value:e.title,onInput:e=>ee.updateComponentAttribute(e,s,a,"title","grade"),placeholder:"Assignment (e.g. Quiz 1)"},null,40,Y),(0,l._)("input",{type:"text",value:e.score,onInput:e=>ee.updateComponentAttribute(e,s,a,"score","grade"),placeholder:"Score"},null,40,H),(0,l._)("input",{type:"text",value:e.points,onInput:e=>ee.updateComponentAttribute(e,s,a,"points","grade"),placeholder:"Out of"},null,40,$),(0,l._)("button",{onClick:e=>ee.removeComponent(s,a,"grade")},"Delete",8,q)])))),128)),(0,l._)("p",null,[(0,l._)("button",{onClick:e=>ee.addComponent(s,"grade")},"Add assignment",8,J)]),(0,l._)("p",null,(0,a.zw)(e.title)+" score: "+(0,a.zw)(e.score)+"/"+(0,a.zw)(e.points)+" points, "+(0,a.zw)(e.pct)+"%",1)])])))),128)),L,(0,l._)("p",null,[(0,l._)("button",{onClick:t[15]||(t[15]=e=>ee.addSection("grade"))},"Add grade section")]),(0,l._)("p",null,"Total "+(0,a.zw)(X.tempName)+" weighted percentage: "+(0,a.zw)(X.tempPct)+"%, Weighted grade: "+(0,a.zw)(X.tempGrade),1),X.weightError?((0,l.wg)(),(0,l.iD)("h3",Q," NOTE: Your weights don't currently add up to 100%. This could cause an incorrect grade calculation, unless this is intended. ")):(0,l.kq)("",!0)])],4)}const X={key:0,class:"modal-mask"},ee={class:"modal-wrapper"},te={class:"modal-container"},se={class:"modal-header"},oe=(0,l.Uk)("default header"),le={class:"modal-body"},ae=(0,l.Uk)("default body"),ne={class:"modal-footer"},ie=(0,l.Uk)(" default footer ");function re(e,t,s,a,n,i){return(0,l.wg)(),(0,l.j4)(o.uT,{name:"modal"},{default:(0,l.w5)((()=>[s.show?((0,l.wg)(),(0,l.iD)("div",X,[(0,l._)("div",ee,[(0,l._)("div",te,[(0,l._)("div",se,[(0,l.WI)(e.$slots,"header",{},(()=>[oe]))]),(0,l._)("div",le,[(0,l.WI)(e.$slots,"body",{},(()=>[ae]))]),(0,l._)("div",ne,[(0,l.WI)(e.$slots,"footer",{},(()=>[ie,(0,l._)("button",{class:"modal-default-button",onClick:t[0]||(t[0]=t=>e.$emit("close"))},"OK")]))])])])])):(0,l.kq)("",!0)])),_:3})}var ue={props:{show:Boolean}},de=s(744);const ce=(0,de.Z)(ue,[["render",re]]);var pe=ce;let me={"A+":[4,97],A:[4,93],"A-":[3.7,90],"B+":[3.3,87],B:[3,83],"B-":[2.7,80],"C+":[2.3,77],C:[2,73],"C-":[1.7,70],"D+":[1.3,67],D:[1,63],"D-":[.7,60],F:[0,0]},he=!0;var ge={components:{Modal:pe},data(){return{gradient:"linear-gradient(315deg,#1bd3ef,#2E1BDA)",mode:"college",semesters:[],gpa:0,hours:0,tempSem:0,tempCourse:0,tempName:"",tempPct:0,tempGrade:"",customGrades:[],weightError:!1,mode:"College"}},methods:{updateSectionAttribute(e,t,s,o="gpa"){"gpa"==o?this.semesters[t][s]=e.target.value:this.customGrades[t][s]=e.target.value,"title"!=s&&this.updateCalculations(o)},updateComponentAttribute(e,t,s,o,l="gpa"){"gpa"==l?this.semesters[t].courses[s][o]=e.target.value:this.customGrades[t].assignments[s][o]=e.target.value,"title"!=o&&this.updateCalculations(l)},updateCalculations(e){"gpa"==e?this.updateGPA():this.updateCourseGrade()},updateGPA(){let e=0,t=0,s=this.mode;this.semesters.forEach((function(o){let l=0,a=0;o["courses"].forEach((function(e){if(e.included){let t="College"==s?parseInt(e.credits):1;l+=t*me[e.grade.toUpperCase()][0],a+=t}})),o.credits=a,o.gpa=l/a,o.included&&(e+=l,t+=a)})),this.hours=t,this.gpa=e/t},updateCourseGrade(){let e=0,t=0;this.customGrades.forEach((function(s){let o=parseFloat(s.weight.replace("%",""));t+=o;let l=0,a=0;s["assignments"].forEach((function(e){e.included&&(l+=parseFloat(e.score),a+=parseFloat(e.points))})),s.score=l,s.points=a,s.pct=100*l/a,s.included&&(e+=o*l/a)})),this.tempPct=e,Math.abs(t-100)>1e-4?this.weightError=!0:this.weightError=!1,console.log("\tweighted: "+e);for(let s in me){let t=me[s][1];if(e>=t){this.tempGrade=s;break}}he&&console.log("\tCourse score updated, grade: "+this.tempGrade)},addSection(e="gpa"){he&&console.log("@ COMMAND: Add section, mode: "+e);let t={title:"",courses:[],credits:0,gpa:0,included:!0},s={title:"",assignments:[],score:"",points:"",frac:0,weight:"",included:!0};"gpa"==e?this.semesters.push(t):this.customGrades.push(s)},removeSection(e,t="gpa"){he&&console.log("@ COMMAND: Remove section, mode: "+t+", index: "+e),"gpa"==t?this.semesters.splice(e,1):this.customGrades.splice(e,1),this.updateCalculations(t)},addComponent(e,t){let s={title:"",credits:"",grade:"",color:"#ffffff",included:!0,custom:!1,customGrades:[]},o={title:"",score:"",points:"",included:!0};"gpa"==t?this.semesters[e].courses.push(s):this.customGrades[e].assignments.push(o)},removeComponent(e,t,s){"gpa"==s?this.semesters[e].courses.splice(t,1):this.customGrades[e].assignments.splice(t,1),this.updateCalculations(s)},downloadData(){let e={semesters:this.semesters,mode:this.mode},t=JSON.stringify(e),s=document.createElement("a");s.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(t)),s.setAttribute("download","GPACalculatorData.json"),s.style.display="none",document.body.appendChild(s),s.click(),document.body.removeChild(s)},uploadData(){let e=document.createElement("input");e.type="file",e.onchange=e=>{let t=e.target.files[0],s=new FileReader;s.readAsText(t,"UTF-8"),s.onload=e=>{let t=e.target.result;console.log("PARSED"),console.log(JSON.parse(t));let s=JSON.parse(t);this.semesters=s.semesters,this.mode=s.mode,this.updateGPA()}},e.click()},reset(){this.semesters=[],this.gpa=0,this.hours=0},startCustomGrade(e,t){this.gradient="linear-gradient(315deg,#f49d23,#880000)",document.getElementById("gpa-calc-app").style.display="none",document.getElementById("course-grade-calc").style.display="block",this.semesters[e].courses[t].custom=!0,this.tempSem=e,this.tempCourse=t,this.tempName=this.semesters[e].courses[t].title,this.customGrades=this.semesters[e].courses[t].customGrades,this.updateCourseGrade()},applyCustomGrade(){this.semesters[this.tempSem].courses[this.tempCourse].customGrades=this.customGrades,this.revertToGPA()},deleteCustomGrade(){this.semesters[this.tempSem].courses[this.tempCourse].custom=!1,this.semesters[this.tempSem].courses[this.tempCourse].customGrades=[],this.revertToGPA()},revertToGPA(){this.semesters[this.tempSem].courses[this.tempCourse].grade=this.tempGrade,this.tempSem=0,this.tempCourse=0,this.tempName="",this.customGrades=[],this.gradient="linear-gradient(315deg,#1bd3ef,#2E1BDA)",document.getElementById("gpa-calc-app").style.display="block",document.getElementById("course-grade-calc").style.display="none",this.updateGPA()},resetCustom(){this.customGrades=[]}}};const fe=(0,de.Z)(ge,[["render",Z]]);var Ce=fe;(0,o.ri)(Ce).mount("#app")}},t={};function s(o){var l=t[o];if(void 0!==l)return l.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,o,l,a){if(!o){var n=1/0;for(d=0;d<e.length;d++){o=e[d][0],l=e[d][1],a=e[d][2];for(var i=!0,r=0;r<o.length;r++)(!1&a||n>=a)&&Object.keys(s.O).every((function(e){return s.O[e](o[r])}))?o.splice(r--,1):(i=!1,a<n&&(n=a));if(i){e.splice(d--,1);var u=l();void 0!==u&&(t=u)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[o,l,a]}}(),function(){s.d=function(e,t){for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,o){var l,a,n=o[0],i=o[1],r=o[2],u=0;if(n.some((function(t){return 0!==e[t]}))){for(l in i)s.o(i,l)&&(s.m[l]=i[l]);if(r)var d=r(s)}for(t&&t(o);u<n.length;u++)a=n[u],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(d)},o=self["webpackChunkgpa_calculator"]=self["webpackChunkgpa_calculator"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=s.O(void 0,[998],(function(){return s(745)}));o=s.O(o)})();
//# sourceMappingURL=app.e7826b1b.js.map