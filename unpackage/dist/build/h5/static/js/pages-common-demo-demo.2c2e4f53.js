(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-common-demo-demo"],{"19ed":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{watchText:"123",navList:[{title:"配音课分享页（ok）",url:"../share/dub/index?shareid=6e016f3f111c352a85ecd069e360534a"},{title:"口语课分享页（ok）",url:"../share/spoken/index?shareid=b5c31a79257ffb3ac2c3af79377932f6"},{title:"测试报告分享（ok）",url:"../share/report/index?shareid=4dccdf22cfdbef27fb500ef3e9de2e1f"},{title:"打卡分享页（ok）",url:"../share/punch/index?shareid=fd086bee70fc4467aab3fce75c8266ad"},{title:"定制课分享页（ok）",url:"../share/custom/index?shareid=d09411160ed24e4a3c798d6d9e4aabdb"},{title:"测试成绩分享页（ok）",url:"../share/test-performance/index?shareid=bfd4be3e2a26927de329d4afa5e210ab"},{title:"",url:""},{title:"每日打卡",url:"../punch/index/index?test=1&source=app"},{title:"打卡提示",url:"../punch/tip/index?test=1&source=app"},{title:"打卡目标",url:"../punch/target/index?test=1&source=app"},{title:"打卡指引",url:"../punch/guide/index?test=1&source=app"},{title:"",url:""},{title:"测试题",url:"../quizzes/index/index"},{title:"测试结果",url:"../quizzes/result/index"},{title:"",url:""},{title:"拼音表",url:"../static/pinyin-table/index"},{title:"教材有声读物（ok）",url:"../textbook/index/index"}],navItem:{}}},onLoad:function(){t.log("watchText改变111")},watch:{watchText:function(e,n){t.log("watchText改变222",e,n)}},methods:{changeWatchFn:function(){this.watchText="456"},aaa:function(){this.navItem={title2:"bbb"}},bbb:function(){t.log("bbbb"),this.navItem.title2="ccc"}}};e.default=n}).call(this,n("5a52")["default"])},2800:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.page_list .a[data-v-35a97495]{display:block;height:%?80?%;line-height:%?80?%;border-bottom:%?2?% solid #eee;padding:0 %?30?%;font-size:%?32?%;color:#333}',""]),t.exports=e},"353d":function(t,e,n){var i=n("2800");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("5e0dc292",i,!0,{sourceMap:!1,shadowMode:!1})},"8b90":function(t,e,n){"use strict";n.r(e);var i=n("8cec"),a=n("a899");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("d8c0");var u,r=n("f0c5"),s=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"35a97495",null,!1,i["a"],u);e["default"]=s.exports},"8cec":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page_list"},[n("v-uni-view",[t._v(t._s(t.watchText))]),n("v-uni-view",{staticStyle:{padding:"30upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeWatchFn.apply(void 0,arguments)}}},[t._v("改变watchText")]),n("v-uni-view",{staticStyle:{"margin-top":"100upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.aaa.apply(void 0,arguments)}}},[t._v("改变变量111")]),n("v-uni-view",[t._v("navItem:"+t._s(t.navItem.title))]),n("v-uni-view",[t._v("navItem:"+t._s(t.navItem.title2))]),n("v-uni-view",[t._v("navItem:"+t._s(t.navItem.title3))]),n("v-uni-view",[t._v("navList:"+t._s(t.navList[0].title))]),n("v-uni-view",[t._v("navList:"+t._s(t.navList[0].title2))]),n("v-uni-view",{staticStyle:{"margin-top":"100upx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bbb.apply(void 0,arguments)}}},[t._v("改变变量222")])],1)},c=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}))},a899:function(t,e,n){"use strict";n.r(e);var i=n("19ed"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},d8c0:function(t,e,n){"use strict";var i=n("353d"),a=n.n(i);a.a}}]);