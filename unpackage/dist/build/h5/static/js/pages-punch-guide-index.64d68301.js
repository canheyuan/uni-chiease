(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-punch-guide-index"],{"8b16":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=getApp(),e={components:{},data:function(){return{imgUrl:a.globalData.imgUrl,langData:a.globalData.langData,lan:a.globalData.lan,detailData:null}},onLoad:function(t){var n=this;this.$common.pageLoadFn(t,(function(){n.getDetailFn()}))},onReady:function(){var t=this.lan,n={name:"punch-guide",title:this.langData.punchGuide.title[t],leftIcon:"back",backgroundColor:"#ffffff"};Shell.setPageTitle(JSON.stringify(n)),uni.setNavigationBarTitle({title:this.langData.punchGuide.title[t]})},methods:{getDetailFn:function(){var n=this;this.$http({url:"/api/article/getOneArticleByColumnKey",method:"POST",data:{"app-type":"","app-version":"","device-type":"",columnKey:"punch"},success:function(a){t.log("打卡指引：",a);var e=a.data.contentMulti;n.detailData=e},successOther:function(n){0!=n.code&&t.log("数据加载失败：",n)}})}}};n.default=e}).call(this,a("5a52")["default"])},"8bad":function(t,n,a){"use strict";var e,i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",[t.detailData?a("v-uni-view",{domProps:{innerHTML:t._s(t.detailData[t.lan])}}):t._e(),t._e(),t._e()],1)},u=[];a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return e}))},de7f:function(t,n,a){"use strict";a.r(n);var e=a("8bad"),i=a("e55c");for(var u in i)"default"!==u&&function(t){a.d(n,t,(function(){return i[t]}))}(u);var l,o=a("f0c5"),c=Object(o["a"])(i["default"],e["b"],e["c"],!1,null,"da46e238",null,!1,e["a"],l);n["default"]=c.exports},e55c:function(t,n,a){"use strict";a.r(n);var e=a("8b16"),i=a.n(e);for(var u in e)"default"!==u&&function(t){a.d(n,t,(function(){return e[t]}))}(u);n["default"]=i.a}}]);