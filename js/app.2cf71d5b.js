(function(t){function e(e){for(var n,i,s=e[0],l=e[1],c=e[2],h=0,f=[];h<s.length;h++)i=s[h],r[i]&&f.push(r[i][0]),r[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,s=1;s<a.length;s++){var l=a[s];0!==r[l]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},o=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/plotly-image-viewer/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var n=a("c21b"),r=a.n(n);r.a},"199c":function(t,e,a){"use strict";(function(t){a("ac6a"),a("7f7f"),a("28a5"),a("6b54"),a("96cf");var n=a("3040"),r=(a("a481"),a("386d"),a("cadf"),a("551c"),a("097d"),a("674b")),o=a("3c4d"),i=a("7fab"),s=a("755b"),l=a.n(s),c=a("d051"),u=a.n(c),h=a("9cb3"),f=a("ffe7"),p=a.n(f),d=a("bc3a"),m=a("bd7e"),g=a("eabd"),v=a("6724");e["a"]={data:function(){return{title:"plotly.js image viewer",fromGithub:"local",versions:["local","master","v1.47.2","v1.31.0","v1.2.0"],baseUrl:"http://localhost:3000",orcaUrl:"http://localhost:9091",mock:null,mockPayload:null,numDiffPixels:0,fuse:null,fuseOptions:{},AutocompleteItem:h["a"],AllMocks:[],results:[],mapboxAccessToken:"pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ",errorMsg:!1,loading:!1,plotlyJSdisplay:!0,compareToOrca:!1}},beforeRouteUpdate:function(t,e,a){"config"!==t.params.id&&this.fetchMock(t.params.id),a()},computed:{rawGithubBaseUrl:function(){return"https://raw.githubusercontent.com/plotly/plotly.js/"+this.fromGithub},image:function(){return this.mock?"".concat(this.baseUrl,"/build/test_images/").concat(this.mock,".png"):"overlay.jpg"},baseline:function(){return this.mock?"".concat("local"!==this.fromGithub?this.rawGithubBaseUrl:this.baseUrl,"/test/image/baselines/").concat(this.mock,".png"):"baseline.jpg"},json_url:function(){if(this.mock)return"".concat("local"!==this.fromGithub?this.rawGithubBaseUrl:this.baseUrl,"/test/image/mocks/").concat(this.mock,".json")},errorColor:function(){return this.errorMsg?"red":"green"}},methods:{initFuse:function(t){this.fuse=new p.a(t,this.fuseOptions)},updateResults:function(t){var e=this;this.results=this.fuse.search(t).map(function(t){return e.AllMocks[t]})},navigate:function(t){this.$router.replace({params:{id:t}})},fetchMock:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a,n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e){t.next=2;break}return t.abrupt("return");case 2:this.errorMsg=!1,this.mockPayload=null,a=this,a.loading=!0,n=m(a.$refs.image),r=m(a.$refs.baseline),n.on("fail",function(){a.errorMsg="Cannot load build image ".concat(a.$refs.image.src),a.$refs.image.src="favicon.ico"}),r.on("fail",function(){a.errorMsg="Cannot load baseline image ".concat(a.$refs.baseline.src),a.$refs.baseline.src="favicon.ico",a.loading=!1}),r.on("done",function(){var t=a.$refs.baseline.width,e=a.$refs.baseline.height;t<64&&(t=700),e<64&&(e=400),d.get(a.json_url).then(function(t){return a.mockPayload=t.data}).catch(function(t){return a.mockPayload=null,a.loading=!1,a.errorMsg=t}).then(function(n){n&&(a.$refs.graph.style.width=t+"px",a.$refs.graph.style.height=e+"px",a.imgDiff(),a.plotlyRender())}).finally(function(){return a.loading=!1})}),a.mock=e;case 12:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),plotlyRender:function(){if(this.mockPayload){this.loading=!0;var t=this;setTimeout(function(){var e=JSON.parse(JSON.stringify(t.mockPayload));return e.layout?(e.layout.width&&delete e.layout.width,e.layout.height&&delete e.layout.height):e.layout={},e.layout.autosize=!0,e.config={mapboxAccessToken:this.mapboxAccessToken},Plotly.newPlot("graph",e).then(function(){window.gd=t.$refs.graph,setTimeout(function(){return t.loading=!1},100)})},5)}},orcaRender:function(){var e=this;if(this.mockPayload){var a=JSON.parse(JSON.stringify(this.mockPayload));a.layout||(a.layout={}),a.layout.width=this.$refs.baseline.width,a.layout.height=this.$refs.baseline.height;var n=this;n.loading=!0,n.errorMsg=!1,d({method:"post",url:n.orcaUrl,data:a,responseType:"arraybuffer"}).catch(function(t){n.loading=!1,n.errorMsg="HTTP call to Orca failed with ".concat(t)}).then(function(e){return new t(e.data,"binary").toString("base64")}).then(function(t){return e.$refs.image.src="data:image/png;base64,"+t}).then(function(){return n.compareToOrca="output from Orca at ".concat(n.orcaUrl,"/"),!0}).then(n.imgDiff).finally(function(){return n.loading=!1})}},imgDiff:function(){try{var t=this.$refs.baseline.width,e=this.$refs.baseline.height,a=this.convertImageToCanvas(this.$refs.baseline).getContext("2d"),n=this.convertImageToCanvas(this.$refs.image).getContext("2d"),r=this.$refs.diff.getContext("2d"),o=a.getImageData(0,0,t,e),i=n.getImageData(0,0,t,e),s=r.createImageData(t,e);this.$refs.diff.width=t,this.$refs.diff.height=e,this.numDiffPixels=g(o.data,i.data,s.data,t,e,{threshold:0}),r.putImageData(s,0,0)}catch(t){throw this.errorMsg="image comparison failed with ".concat(t),t}},convertImageToCanvas:function(t){var e=document.createElement("canvas");return e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(t,0,0),e},fetAllMocksGithub:function(){var t="https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks",e=this;d.get(t).then(function(t){var e=t.data.map(function(t){return t.name.split("/").splice(-1)[0].replace(".json","")});return e}).then(function(t){e.initFuse(t),e.AllMocks=t})},fetchAllMocks:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e="".concat(this.baseUrl,"/test/image/mocks/"),a=this,d.get(e).then(function(t){var e=new v.DefaultHandler(function(t){t&&(a.errorMsg=t)}),n=new v.Parser(e);n.parseComplete(t.data);var r=e.dom[2].children[3].children[3].children,o=r.filter(function(t,e){return e%2===0}).map(function(t){return t.children[3].children[0].attribs.href.split("/").splice(-1)[0].replace(".json","")});return o}).then(function(t){a.initFuse(t),a.AllMocks=t});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},created:function(){"local"!==this.fromGithub?this.fetAllMocksGithub():this.fetchAllMocks()},mounted:function(){[this.$refs.baseline,this.$refs.image].forEach(function(t){return t.crossOrigin="Anonymous"}),this.fetchMock(this.$route.params.id)},components:{Comparify:r["a"],Opacity:o["a"],JsonTree:i["a"],Autocomplete:u.a,Loading:l.a}}}).call(this,a("b639").Buffer)},"3c4d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compare-wrapper"},[a("div",{staticClass:"compare"},[a("div",{staticClass:"compare__content",style:{opacity:t.opacity/100}},[t._t("first")],2),a("div",{staticClass:"handle-wrap",style:{left:"calc("+t.opacity+"% - var(--handle-line-width) / 2"}},[a("div",{staticClass:"handle"},[a("svg",{staticClass:"handle__arrow handle__arrow--l feather feather-chevron-left",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polyline",{attrs:{points:"15 18 9 12 15 6"}})]),a("svg",{staticClass:"handle__arrow handle__arrow--r feather feather-chevron-right",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polyline",{attrs:{points:"9 18 15 12 9 6"}})])]),a("span",{staticClass:"handle-line"})]),a("div",{staticClass:"compare-overlay"},[a("div",{staticClass:"compare-overlay__content",style:{opacity:1-t.opacity/100}},[t._t("second")],2)])]),a("input",{staticClass:"compare__range",attrs:{type:"range",min:"0",max:"100",step:t.step,tabindex:"-1"},domProps:{value:t.opacity},on:{input:t.handleInput}})])},r=[],o=(a("cadf"),a("551c"),a("097d"),{props:{value:{default:50},step:{default:".1"}},data:function(){return{opacity:1}},mounted:function(){this.opacity=this.value},methods:{handleInput:function(t){this.opacity=t.target.value,this.$emit("input",t.target.value)}}}),i=o,s=(a("3c5e"),a("2877")),l=Object(s["a"])(i,n,r,!1,null,"9bec5a28",null);l.options.__file="Opacity.vue";e["a"]=l.exports},"3c5e":function(t,e,a){"use strict";var n=a("c12a"),r=a.n(n);r.a},"3e2e":function(t,e,a){"use strict";var n=a("a700"),r=a.n(n);r.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("097d");var n=a("ba4c"),r=a.n(n),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("loading",{attrs:{show:t.loading}}),a("header",{staticClass:"main"},[a("div",{staticClass:"row"},[t._m(0),a("autocomplete",{attrs:{"min-len":0,wait:10,"component-item":t.AutocompleteItem,items:t.results,"input-attrs":{placeholder:"search mocks"}},on:{submit:function(e){t.navigate(this.value)},"item-selected":t.navigate,"update-items":t.updateResults}}),a("a",{attrs:{alt:"Download JSON",target:"_blank",href:t.json_url}},[a("font-awesome-layers",{staticClass:"fa-2x"},[a("font-awesome-icon",{attrs:{icon:"circle",color:"white"}}),a("font-awesome-icon",{attrs:{icon:"download",transform:"shrink-7",color:"#118DFF"}})],1)],1),a("a",{attrs:{alt:"Configuration",href:"#config"}},[a("font-awesome-layers",{staticClass:"fa-2x"},[a("font-awesome-icon",{attrs:{icon:"circle",color:"white"}}),a("font-awesome-icon",{attrs:{icon:"cog",transform:"shrink-7",color:"#118DFF"}})],1)],1)],1),a("div",{staticClass:"row button"},[a("a",{staticStyle:{"flex-grow":"1",display:"flex","justify-content":"center","align-items":"center",height:"50px"},attrs:{alt:"Render in plotly.js"},on:{click:t.plotlyRender}},[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:"logo.svg"}}),a("span",{staticStyle:{"font-size":"1.5em"}},[t._v("plotly.js")])]),a("a",{staticStyle:{"flex-grow":"1",display:"flex","justify-content":"center","align-items":"center",height:"50px"},attrs:{alt:"Render on Orca"},on:{click:t.orcaRender}},[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:"https://raw.githubusercontent.com/plotly/orca/master/orca_logo.png"}}),a("span",{staticStyle:{"font-size":"1.5em"}},[t._v("Orca")])]),a("div",{staticStyle:{display:"flex","justify-content":"flex-end","flex-grow":"1"}},[a("span",{staticStyle:{"font-size":"1.5em"}},[t._v("plotly.js @ ")]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.fromGithub,expression:"fromGithub"}],on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.fromGithub=e.target.multiple?a:a[0]}}},t._l(t.versions,function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e))])}))])]),t.errorMsg?a("div",{staticClass:"row",style:{backgroundColor:t.errorColor}},[a("div",[a("font-awesome-layers",{staticClass:"fa-1x",attrs:{alt:t.errorMsg}},[a("font-awesome-icon",{attrs:{icon:"circle",color:t.errorColor}}),a("font-awesome-icon",{attrs:{icon:t.errorMsg?"exclamation":"check",transform:"shrink-7",color:"white"}})],1),a("span",[t._v(t._s(t.errorMsg))])],1)]):t._e()]),a("div",{staticClass:"container"},[a("div",{staticClass:"preview"},[a("div",[a("h3",[t._v("Comparing")]),a("span",[t._v(t._s(t.baseline)+">")]),t._v(" with "),a("span",[t._v(t._s(t.compareToOrca||t.image))]),a("comparify",{attrs:{value:"50"}},[a("img",{ref:"baseline",attrs:{slot:"first",src:t.baseline},slot:"first"}),a("img",{ref:"image",attrs:{slot:"second",src:t.image},slot:"second"})])],1),a("div",[a("h3",[t._v("Diff ("+t._s(t.numDiffPixels)+" different pixels)")]),a("canvas",{ref:"diff"})]),t._e(),t.mockPayload?a("div",[a("h3",[t._v("Comparing")]),a("span",[t._v(t._s(t.baseline)+">")]),t._v(" with "),a("span",[t._v("plotly.js")]),a("comparify",{attrs:{value:"50"}},[a("img",{attrs:{slot:"first",src:t.baseline},slot:"first"}),a("div",{ref:"graph",attrs:{slot:"second",id:"graph"},slot:"second"})])],1):t._e(),t._e()])]),a("footer",{attrs:{id:"config"}},[a("h2",[t._v("Serving local assets from:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.baseUrl,expression:"baseUrl"}],attrs:{type:"text"},domProps:{value:t.baseUrl},on:{input:function(e){e.target.composing||(t.baseUrl=e.target.value)}}}),a("h2",[t._v("Orca endpoint:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.orcaUrl,expression:"orcaUrl"}],attrs:{type:"text"},domProps:{value:t.orcaUrl},on:{input:function(e){e.target.composing||(t.orcaUrl=e.target.value)}}})])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{attrs:{href:"https://plot.ly"}},[a("img",{staticClass:"plotly-logo",attrs:{src:"https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format"}})])}],s=a("199c"),l=s["a"],c=(a("034f"),a("2877")),u=Object(c["a"])(l,o,i,!1,null,null,null);u.options.__file="App.vue";var h=u.exports,f=a("8c4f"),p=a("ecee"),d=a("c074"),m=a("7a55");r.a.use(f["a"]);var g=[{path:"/:id?",component:h}],v=new f["a"]({routes:g});p["library"].add(d["e"],d["a"],d["d"],d["f"],d["b"],d["c"]),r.a.component("font-awesome-icon",m["FontAwesomeIcon"]),r.a.component("font-awesome-layers",m["FontAwesomeLayers"]),r.a.config.productionTip=!1,new r.a({router:v}).$mount("#app")},"674b":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"compare-wrapper"},[a("div",{staticClass:"compare"},[a("div",{staticClass:"compare__content",style:{width:t.width}},[t._t("first")],2),a("div",{staticClass:"handle-wrap",style:{left:"calc("+t.compareWidth+"% - var(--handle-line-width) / 2"}},[a("div",{staticClass:"handle"},[a("svg",{staticClass:"handle__arrow handle__arrow--l feather feather-chevron-left",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polyline",{attrs:{points:"15 18 9 12 15 6"}})]),a("svg",{staticClass:"handle__arrow handle__arrow--r feather feather-chevron-right",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"}},[a("polyline",{attrs:{points:"9 18 15 12 9 6"}})])]),a("span",{staticClass:"handle-line"})]),a("div",{staticClass:"compare-overlay ",style:{width:"calc("+t.compareWidth+"%)"}},[a("div",{staticClass:"compare-overlay__content",style:{width:t.width}},[t._t("second")],2)])]),a("input",{staticClass:"compare__range",attrs:{type:"range",min:"0",max:"100",step:t.step,tabindex:"-1"},domProps:{value:t.compareWidth},on:{input:t.handleInput}})])},r=[],o={props:{value:{default:50},step:{default:".1"}},data:function(){return{width:null,compareWidth:this.value}},watch:{value:function(){this.compareWidth=this.value}},mounted:function(){this.width=this.getContainerWidth(),window.addEventListener("resize",this.handleResize)},beforeDestroy:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleInput:function(t){this.compareWidth=t.target.value,this.$emit("input",t.target.value)},handleResize:function(){var t=this.getContainerWidth();t!==this.width&&(this.width=t)},getContainerWidth:function(){return window.getComputedStyle(this.$el,null).getPropertyValue("width")}}},i=o,s=(a("3e2e"),a("2877")),l=Object(s["a"])(i,n,r,!1,null,null,null);l.options.__file="Comparify.vue";e["a"]=l.exports},"9cb3":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[t._v("\n"+t._s(t.item)+"\n")])},r=[],o=(a("cadf"),a("551c"),a("097d"),{props:{item:{required:!0}}}),i=o,s=a("2877"),l=Object(s["a"])(i,n,r,!1,null,null,null);l.options.__file="AutocompleteItem.vue";e["a"]=l.exports},a700:function(t,e,a){},c12a:function(t,e,a){},c21b:function(t,e,a){}});
//# sourceMappingURL=app.2cf71d5b.js.map