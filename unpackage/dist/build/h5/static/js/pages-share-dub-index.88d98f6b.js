(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-share-dub-index"],{"117b":function(a,t,e){var i=e("24fb"),o=e("1de5"),n=e("acd7");t=i(!1);var s=o(n);t.push([a.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.dub_head .title[data-v-6017dbbe]{font-size:%?36?%;color:#fff;text-align:center;padding:%?5?% %?50?%;width:100%;line-height:%?60?%;position:absolute;top:%?50?%;left:0}.dub_head .dub_video[data-v-6017dbbe]{height:%?420?%;background:#000;position:relative}.dub_head .dub_video .video[data-v-6017dbbe]{width:100%;height:100%}.dub_head .dub_video .play_btn[data-v-6017dbbe]{width:%?144?%;height:%?144?%;position:absolute;left:50%;top:50%;margin-left:%?-72?%;margin-top:%?-20?%}.score_top[data-v-6017dbbe]{height:%?220?%;background:url('+s+') no-repeat;background-size:100% 100%;text-align:center;padding-top:%?20?%}.score_top .txt[data-v-6017dbbe]{text-align:right;display:inline-block;color:#fff;font-size:%?28?%;line-height:%?40?%;vertical-align:middle}.score_top .txt .span[data-v-6017dbbe]{color:#bcc3ca;font-size:%?36?%}.score_top .score_num[data-v-6017dbbe]{font-size:%?120?%;color:#ffc10a;font-weight:700;display:inline-block;vertical-align:middle;margin:0 %?20?%}.score_top .btn[data-v-6017dbbe]{display:inline-block;width:%?160?%;height:%?64?%;line-height:%?58?%;text-align:center;border:%?2?% solid #fff;border-radius:%?32?%;color:#fff;font-size:%?28?%;vertical-align:middle}.score_box[data-v-6017dbbe]{width:100%;overflow:auto;margin:%?-50?% 0 %?30?%;-webkit-overflow-scrolling:touch;padding-bottom:%?40?%;margin-bottom:%?-10?%}.score_box .score_list .li[data-v-6017dbbe]{float:left;display:inline-block;min-width:%?170?%;height:%?180?%;border-radius:%?10?%;border-bottom:%?8?% solid #ffb441;background:#fff;text-align:center;margin-left:%?25?%;box-shadow:%?6?% 0 %?20?% rgba(255,180,65,.32)}.score_box .score_list .li .span[data-v-6017dbbe]{display:block;font-size:%?88?%;color:#ffb441;font-weight:700;padding:0 %?15?%}.score_box .score_list .li .p[data-v-6017dbbe]{font-size:%?26?%;color:#999;position:relative;padding:%?15?% %?15?% 0}.score_box .score_list .li .p[data-v-6017dbbe]:before{content:"";display:inline-block;width:%?44?%;height:%?2?%;background:#e3e3e3;position:absolute;top:0;left:50%;margin-left:%?-22?%}.score_box .score_list .li.green[data-v-6017dbbe]{border-bottom-color:#63d554;box-shadow:%?6?% 0 %?20?% rgba(99,213,84,.32)}.score_box .score_list .li.green .span[data-v-6017dbbe]{color:#63d554}.score_box .score_list .li.blue[data-v-6017dbbe]{border-bottom-color:#4ca6fe;box-shadow:%?6?% 0 %?20?% rgba(76,166,254,.32)}.score_box .score_list .li.blue .span[data-v-6017dbbe]{color:#4ca6fe}.score_box .score_list .li.red[data-v-6017dbbe]{border-bottom-color:#f66;box-shadow:%?6?% 0 %?20?% hsla(0,100%,70%,.32)}.score_box .score_list .li.red .span[data-v-6017dbbe]{color:#f66}',""]),a.exports=t},"4b90":function(a,t,e){"use strict";var i=e("638c"),o=e.n(i);o.a},"638c":function(a,t,e){var i=e("117b");"string"===typeof i&&(i=[[a.i,i,""]]),i.locals&&(a.exports=i.locals);var o=e("4f06").default;o("1686b238",i,!0,{sourceMap:!1,shadowMode:!1})},"6dc5":function(a,t,e){"use strict";e.r(t);var i=e("b8a0"),o=e.n(i);for(var n in i)"default"!==n&&function(a){e.d(t,a,(function(){return i[a]}))}(n);t["default"]=o.a},acd7:function(a,t,e){a.exports=e.p+"static/img/share_bg02.f90a6bff.jpg"},b8a0:function(a,t,e){"use strict";(function(a){var i=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("ac6a");var o=i(e("da9b")),n=i(e("8a10")),s=i(e("46e9")),l=getApp(),d=uni.createInnerAudioContext();d.autoplay=!1;var r={components:{"download-top":o.default,"download-bottom":n.default,"record-list":s.default},data:function(){return{imgUrl:l.globalData.imgUrl,langData:l.globalData.langData,lan:l.globalData.lan,detailData:null,dlUrl:l.globalData.dowmlaod,isIOS:"ios"==this.$common.system(),shareId:"",scoreWidth:0,isVideoPlay:!0}},onLoad:function(a){l.globalData.source!=a.source||a.source,this.shareId=a.shareid?a.shareid:"",this.getShareDetailFn(this.shareId)},onShow:function(a){},onReady:function(a){this.videoContext=uni.createVideoContext("myVideo")},methods:{getShareDetailFn:function(t){var e=this;this.$http({url:"/api/shareInfo/dubChaShareInfo/".concat(t),success:function(t){var i=t.data;e.lan=i.lan?i.lan:"en",i.paraList&&i.paraList.forEach((function(a){a.isUserPlay=!1,a.isParaPlay=!1})),e.detailData=i,d.src=i.userAudio,setTimeout((function(){e.getElWidth()}),100),a.log("配音课分享详情：",t.data)}})},downloadFn:function(){this.isIOS?uni.navigateTo({url:"/pages/common/web-view/index?url=".concat(this.dlUrl.apple)}):uni.pageScrollTo({scrollTop:1e4,duration:100})},getElWidth:function(){for(var a=this,t=0,e=1;e<5;e++){var i=uni.createSelectorQuery().in(this);i.select("#score0"+e).boundingClientRect((function(i){t=t+i.width+12,4==e&&(t+=12,a.scoreWidth=t)})).exec()}},changeVideoStatusFn:function(){this.isVideoPlay?(this.videoContext.pause(),d.pause()):(this.videoContext.play(),d.play()),this.isVideoPlay=!this.isVideoPlay},videoPlayFn:function(){this.isVideoPlay=!0,d.play()},videoEndFn:function(){this.isVideoPlay=!1,d.stop()}}};t.default=r}).call(this,e("5a52")["default"])},c2ff:function(a,t,e){"use strict";var i,o=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-uni-view",[e("download-top",{attrs:{detailData:a.detailData,lan:a.lan}}),a.detailData?e("v-uni-view",{staticClass:"dub_head"},[e("v-uni-view",{staticClass:"dub_video",on:{click:function(t){arguments[0]=t=a.$handleEvent(t),a.changeVideoStatusFn.apply(void 0,arguments)}}},[a.detailData.video?e("v-uni-video",{staticClass:"video",attrs:{muted:"true",controls:!1,"show-center-play-btn":!1,"show-play-btn":!1,id:"myVideo",src:a.detailData.video},on:{ended:function(t){arguments[0]=t=a.$handleEvent(t),a.videoEndFn.apply(void 0,arguments)},play:function(t){arguments[0]=t=a.$handleEvent(t),a.videoPlayFn.apply(void 0,arguments)}}}):a._e(),a.isVideoPlay?a._e():[e("v-uni-view",{staticClass:"title"},[a._v(a._s(a.detailData.chapterName.zh))]),e("v-uni-image",{staticClass:"play_btn",attrs:{src:a.imgUrl+"/ico_play.png",alt:""}})]],2),e("v-uni-view",[e("v-uni-view",{staticClass:"score_top"},[e("v-uni-view",{staticClass:"txt"},[a._v(a._s(a.langData.shareDub.score_text01[a.lan])),e("br"),a._v(a._s(a.langData.shareDub.score_text02[a.lan])),e("v-uni-text",{staticClass:"span"},[a._v(a._s(a.detailData.accuracyScore)+"%")]),a._v(a._s(a.langData.shareDub.score_text03[a.lan]))],1),e("v-uni-view",{staticClass:"score_num"},[a._v(a._s(a.detailData.score))]),e("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=a.$handleEvent(t),a.downloadFn.apply(void 0,arguments)}}},[a._v(a._s(a.langData.shareData.challengeBtn[a.lan]))])],1),e("v-uni-view",{staticClass:"score_box"},[e("v-uni-view",{staticClass:"score_list clearfix",style:"width:"+a.scoreWidth+"px"},[e("v-uni-view",{staticClass:"yellow li",attrs:{id:"score01"}},[e("v-uni-text",{staticClass:"span"},[a._v(a._s(a.detailData.rhythmScore))]),e("v-uni-view",{staticClass:"p"},[a._v(a._s(a.langData.shareData.pronounce[a.lan]))])],1),e("v-uni-view",{staticClass:"green li",attrs:{id:"score02"}},[e("v-uni-text",{staticClass:"span"},[a._v(a._s(a.detailData.fluencyScore))]),e("v-uni-view",{staticClass:"p"},[a._v(a._s(a.langData.shareData.fluency[a.lan]))])],1),e("v-uni-view",{staticClass:"blue li",attrs:{id:"score03"}},[e("v-uni-text",{staticClass:"span"},[a._v(a._s(a.detailData.integrityScore))]),e("v-uni-view",{staticClass:"p"},[a._v(a._s(a.langData.shareData.intact[a.lan]))])],1),e("v-uni-view",{staticClass:"red li",attrs:{id:"score04"}},[e("v-uni-text",{staticClass:"span"},[a._v(a._s(a.detailData.accuracyScore))]),e("v-uni-view",{staticClass:"p"},[a._v(a._s(a.langData.shareData.accuracy[a.lan]))])],1)],1)],1)],1)],1):a._e(),a.detailData&&a.detailData.paraList?e("record-list",{attrs:{detailData:a.detailData,lan:a.lan}}):a._e(),e("download-bottom",{attrs:{detailData:a.detailData,lan:a.lan}})],1)},n=[];e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return n})),e.d(t,"a",(function(){return i}))},df03:function(a,t,e){"use strict";e.r(t);var i=e("c2ff"),o=e("6dc5");for(var n in o)"default"!==n&&function(a){e.d(t,a,(function(){return o[a]}))}(n);e("4b90");var s,l=e("f0c5"),d=Object(l["a"])(o["default"],i["b"],i["c"],!1,null,"6017dbbe",null,!1,i["a"],s);t["default"]=d.exports}}]);