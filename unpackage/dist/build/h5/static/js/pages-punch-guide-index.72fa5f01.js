(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-punch-guide-index"],{"3cff":function(t,a,e){"use strict";(function(t){var n=e("288e");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i=n(e("f499")),l=getApp(),u={components:{},data:function(){return{imgUrl:l.globalData.imgUrl,langData:l.globalData.langData,lan:l.globalData.lan,detailData:null}},onLoad:function(t){l.globalData.isFirst?l.globalData.isFirst=!1:(this.$common.pageLoadFn({test:t.query,lan:t.query.lan,source:t.query.source}),this.getDetailFn()),this.getDetailFn()},onReady:function(){var t=this.lan,a={name:"punch-guide",title:this.langData.punchGuide.title[t],leftIcon:"back",backgroundColor:"#ffffff"};Shell.setPageTitle((0,i.default)(a)),uni.setNavigationBarTitle({title:this.langData.punchGuide.title[t]})},methods:{getDetailFn:function(){var a=this;this.$http({url:"/api/article/getOneArticleByColumnKey",method:"POST",data:{"app-type":"","app-version":"","device-type":"",columnKey:"punch"},success:function(e){t.log("打卡指引：",e);var n=e.data.contentMulti;a.detailData=n},successOther:function(a){0!=a.code&&t.log("数据加载失败：",a)}})}}};a.default=u}).call(this,e("5a52")["default"])},a503:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",[t.detailData?e("v-uni-view",{domProps:{innerHTML:t._s(t.detailData[t.lan])}}):t._e(),t._e(),t._e()],1)},i=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return i})},de7f:function(t,a,e){"use strict";e.r(a);var n=e("a503"),i=e("e55c");for(var l in i)"default"!==l&&function(t){e.d(a,t,function(){return i[t]})}(l);var u=e("2877"),o=Object(u["a"])(i["default"],n["a"],n["b"],!1,null,"7c53997f",null);a["default"]=o.exports},e55c:function(t,a,e){"use strict";e.r(a);var n=e("3cff"),i=e.n(n);for(var l in n)"default"!==l&&function(t){e.d(a,t,function(){return n[t]})}(l);a["default"]=i.a}}]);