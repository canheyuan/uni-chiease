(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wordcard-draw-index"],{"0175":function(t,i,e){"use strict";var a=e("3f21"),n=e.n(a);n.a},"0e5e":function(t,i,e){"use strict";var a={"uni-popup":e("7e50").default},n=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"draw_page"},[e("v-uni-view",{staticClass:"draw_tag"},[e("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popFn("rulePopShow",!0)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:t.imgUrl+"/word/draw_tag01.png",alt:""}})],1),e("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popFn("myPrizeShow",!0)}}},[e("v-uni-image",{staticClass:"img",attrs:{src:t.imgUrl+"/word/draw_tag02.png",alt:""}})],1)],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!t.myPrizeShow,expression:"!myPrizeShow"}],staticClass:"draw_box"},[e("v-uni-view",{staticClass:"draw_list clearfix"},t._l(t.grid_info_arr,(function(i,a){return e("v-uni-view",{key:a,class:["item",{active:t.drawIndex==a},{draw_btn:8==a}],attrs:{"data-index":a},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.luck_draw.apply(void 0,arguments)}}},[e("v-uni-image",{staticClass:"img",attrs:{mode:"widthFix",src:t.imgUrl+i.img1,alt:""}}),i.img2?e("v-uni-image",{staticClass:"img img2",attrs:{src:t.imgUrl+i.img2,alt:""}}):t._e(),e("v-uni-view",{staticClass:"tit"},[t._v(t._s(i.title))])],1)})),1)],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.myPrizeShow,expression:"myPrizeShow"}],staticClass:"my_prize_box"},[e("v-uni-view",{staticClass:"close_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popFn("myPrizeShow",!1)}}},[e("v-uni-image",{staticClass:"ico",attrs:{src:t.imgUrl+"/word/ico-close.png"}})],1),t.myPrizeList.length>0?t._e():e("v-uni-view",{staticClass:"zw_tip"},[t._v("还未抽中奖品")]),t.myPrizeList.length>0?e("v-uni-view",{staticClass:"prize_list"},t._l(t.myPrizeList,(function(i,a){return e("v-uni-view",{key:"prize"+a,staticClass:"li",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.prizeDetailFn(i,a)}}},[e("v-uni-view",{staticClass:"num"},[t._v(t._s(a+1))]),e("v-uni-view",{staticClass:"prize_img"},[e("v-uni-image",{staticClass:"img",attrs:{mode:"widthFix",src:t.imgUrl+i.img1}})],1),e("v-uni-view",{staticClass:"title"},[t._v(t._s(i.title))]),e("v-uni-view",{staticClass:"p"},[t._v(t._s(i.isUse?"已使用":"未使用"))])],1)})),1):t._e()],1),e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.rulePopShow,expression:"rulePopShow"}],staticClass:"rule_pop"},[e("v-uni-view",{staticClass:"close_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popFn("rulePopShow",!1)}}},[e("v-uni-image",{staticClass:"ico",attrs:{src:t.imgUrl+"/word/ico-close.png"}})],1),e("v-uni-view",{staticClass:"rule_ctn"},[e("v-uni-view",{staticClass:"title"},[t._v("活动规则")]),e("v-uni-view",{staticClass:"p"},[t._v("1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；")]),e("v-uni-view",{staticClass:"p"},[t._v("2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；")]),e("v-uni-view",{staticClass:"p"},[t._v("3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋。（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋。双方可互相邀请，均可以发起人和被发起人的身份各自获得1个福袋，但一方重复接受另一方的邀请，只为双方赠送1个福袋。同一被邀请人接受多个发起人的邀请，均可获赠福袋，但单个手机号码累计获得以11个福袋为上限，之后再发起或接受邀请均不再享受。")]),e("v-uni-view",{staticClass:"p"},[t._v("4. 活动奖品：福袋的中奖概率为100%，内含奖励及具体中奖概率如下：")]),e("v-uni-view",{staticClass:"p"},[t._v("5.活动所得话费券不可拆分、不可转赠、不可兑换现金、不提供发票，需要在60天内到“浙江移动手机营业厅”APP中兑换才可到账，请在截止日期之前兑换使用，过期自动失效；话费券兑换路径：浙江移动手机营业厅>我的>话费券；兑换成功后话费将自动充入您的个人通信馈赠金账户，充入的金额不提供发票；")])],1)],1),e("uni-popup",{ref:"winPop",staticStyle:{height:"100%",background:"rgba(0,0,0,.7)"},attrs:{type:"top",animation:!1}},[e("v-uni-view",{staticClass:"winning_pop"},[e("v-uni-image",{staticClass:"bg",attrs:{mode:"widthFix",src:t.imgUrl+"/word/win_pop.png"}}),e("v-uni-view",{staticClass:"win_box"},[e("v-uni-image",{staticClass:"good_img",attrs:{mode:"widthFix",src:t.imgUrl+t.winPopData.img1}}),e("v-uni-text",{staticClass:"text"},[t._v("中奖啦！\n\t\t\t\t恭喜获得"+t._s(t.winPopData.title))]),e("v-uni-image",{staticClass:"use_btn",attrs:{mode:"widthFix",src:t.imgUrl+"/word/user_btn.png"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openUsePopFn.apply(void 0,arguments)}}})],1),e("v-uni-view",{staticClass:"close_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popupShowFn("winPop",!1)}}},[e("v-uni-image",{staticClass:"ico",attrs:{src:t.imgUrl+"/word/ico-close.png"}})],1)],1)],1),e("uni-popup",{ref:"usePop",staticStyle:{width:"90%"},attrs:{type:"center",animation:!1}},[e("v-uni-view",{staticClass:"use_pop"},[e("v-uni-view",{staticClass:"title"},[t._v(t._s(t.winPopData.title))]),e("v-uni-image",{staticClass:"good_img",attrs:{mode:"widthFix",src:t.imgUrl+t.winPopData.img1}}),e("v-uni-text",{staticClass:"text"},[t._v("购买教材课程书籍时，出示该奖品界面，即可获得奖品")]),e("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.usePrizeFn.apply(void 0,arguments)}}},[t._v("确定使用")]),e("v-uni-view",{staticClass:"close_btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.popupShowFn("usePop",!1)}}},[e("v-uni-image",{staticClass:"ico",attrs:{src:t.imgUrl+"/word/ico-close2.png"}})],1)],1)],1)],1)},o=[];e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return a}))},"399f":function(t,i,e){"use strict";(function(t){var a=e("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("8e6e"),e("ac6a"),e("456d");var n=a(e("bd86")),o=a(e("d692")),r=a(e("7e50")),s=a(e("f3f5"));function d(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i&&(a=a.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,a)}return e}function l(t){for(var i=1;i<arguments.length;i++){var e=null!=arguments[i]?arguments[i]:{};i%2?d(Object(e),!0).forEach((function(i){(0,n.default)(t,i,e[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}))}return t}var c=getApp(),p={components:{uniPopup:r.default},name:"wordIndex",data:function(){return{imgUrl:c.globalData.imgUrl,langData:c.globalData.langData,lan:c.globalData.lan,dateTime:s.default,grid_info_arr:[{img1:"/word/draw_img01.png",title:"8折优惠券"},{img1:"/word/draw_img02.png",title:""},{img1:"/word/draw_img03.png",title:"精品课程体验券"},{img1:"/word/draw_img04.png",title:"中国结"},{img1:"/word/draw_img01.png",title:"8折优惠券"},{img1:"/word/draw_img03.png",title:"精品课程体验券"},{img1:"/word/draw_img04.png",title:"中国结"},{img1:"/word/draw_img01.png",title:"8折优惠券"},{img1:"/word/draw_btn_img.png",title:"剩余 0 次"}],lottery_draw_param:{startIndex:0,totalCount:8,winingIndex:-1,speed:40},drawIndex:0,myPrizeList:[],myPrizeIndex:0,myPrizeShow:!1,rulePopShow:!1,winPopData:{img1:"/word/draw_img03.png",img2:"",title:"精品课程体验券"},drawTimes:0}},onLoad:function(t){this.$common.pageLoadFn(t,(function(){}))},mounted:function(){uni.setStorageSync("drawTimes",10);var i=uni.getStorageSync("drawTimes")?uni.getStorageSync("drawTimes"):0;t.log("drawTimes",i),this.drawTimesFn(i);var e=uni.getStorageSync("myPrizeList")?uni.getStorageSync("myPrizeList"):[];this.myPrizeList=e,t.log("this.myPrizeList",this.myPrizeList)},methods:{drawTimesFn:function(t){this.drawTimes=t,this.grid_info_arr[8].title="剩余 ".concat(t," 次"),uni.setStorageSync("drawTimes",t)},calculateAnswer:function(){var i=parseInt(1e4*Math.random()),e=null;return t.log("随机数",i),i<10?e=0:i>10&&i<100?e=1:i>100&&i<1e3?e=2:i>1e3&&i<2e3?e=3:i>2e3&&i<3e3?e=4:i>3e3&&i<4e3?e=5:i>6e3&&i<8e3?e=6:i>8e3&&i<1e4&&(e=7),e},luck_draw:function(t){var i=this.drawTimes;if(i<1)uni.showModal({content:"很抱歉，您的抽奖次数为0！",showCancel:!1,confirmText:"我知道了"});else{var e=this.calculateAnswer();this.lottery_draw_param.winingIndex=e;var a=t.currentTarget.dataset.index,n=this;if(8==a)new o.default(l({domData:n.grid_info_arr},n.lottery_draw_param),(function(t,a){if(n.drawIndex=t,e==t&&n.lottery_draw_param.totalCount==a){n.drawTimesFn(i-1),n.lottery_draw_param.startIndex=e;var o=(new Date).getTime(),r=n.grid_info_arr[e];r.time=o,r.isUse=!1;var s=JSON.stringify(r);r=JSON.parse(s),n.winPopData=r;var d=n.myPrizeList;d.push(r),n.myPrizeList=d,n.myPrizeIndex=d.length-1,uni.setStorageSync("myPrizeList",d),setTimeout((function(){n.popupShowFn("winPop",!0)}),1e3)}}))}},openUsePopFn:function(){this.popupShowFn("winPop",!1),this.popupShowFn("usePop",!0)},prizeDetailFn:function(t,i){this.winPopData=t,this.myPrizeIndex=i,this.popupShowFn("usePop",!0)},usePrizeFn:function(){this.myPrizeList[this.myPrizeIndex].isUse=!0,t.log("this.myPrizeList",this.myPrizeList),uni.setStorageSync("myPrizeList",this.myPrizeList),this.popupShowFn("usePop",!1)},popupShowFn:function(t,i,e){i?this.$refs[t].open():this.$refs[t].close(),e&&e(i)},popFn:function(t,i,e){this[t]=i,e&&e(i)}}};i.default=p}).call(this,e("5a52")["default"])},"3f21":function(t,i,e){var a=e("c727");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("61287ffc",a,!0,{sourceMap:!1,shadowMode:!1})},"46eb":function(t,i){t.exports="data:image/png;base64,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"},"8b86":function(t,i,e){t.exports=e.p+"static/img/draw_btn_bg_act.a6585258.png"},ad14:function(t,i,e){"use strict";e.r(i);var a=e("0e5e"),n=e("e1a6");for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("0175");var r,s=e("f0c5"),d=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"01d41492",null,!1,a["a"],r);i["default"]=d.exports},c727:function(t,i,e){var a=e("24fb"),n=e("1de5"),o=e("d0ff"),r=e("46eb"),s=e("8b86");i=a(!1);var d=n(o),l=n(r),c=n(s);i.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-01d41492]{background:#0e537b}\n/*------------------- 抽奖页  -----------------------------*/.draw_page[data-v-01d41492]{background:url('+d+") #0e537b no-repeat top;background-size:100% auto;padding-top:%?390?%}.draw_page .draw_tag[data-v-01d41492]{text-align:center}.draw_page .draw_tag .btn[data-v-01d41492]{display:inline-block;width:%?205?%;height:%?74?%;margin:0 %?10?%}.draw_page .draw_tag .btn .img[data-v-01d41492]{width:100%;height:100%}.draw_box[data-v-01d41492]{padding:%?20?%}.draw_list[data-v-01d41492]{position:relative}.draw_list .item[data-v-01d41492]{float:left;width:%?229?%;height:%?212?%;background:url("+l+") no-repeat;background-size:100% 100%;position:absolute;margin-right:%?10?%;margin-bottom:%?10?%;text-align:center;padding-top:%?20?%}.draw_list .item .img[data-v-01d41492]{width:%?170?%;height:auto}.draw_list .item .img2[data-v-01d41492]{z-index:9;opacity:0}.draw_list .item .tit[data-v-01d41492]{position:absolute;bottom:%?20?%;left:0;width:100%;text-align:center;font-size:%?24?%;line-height:%?44?%;color:#000;font-weight:700}.draw_list .item[data-v-01d41492]:nth-child(1){left:%?0?%;top:%?0?%}.draw_list .item[data-v-01d41492]:nth-child(2){left:%?239?%;top:%?0?%}.draw_list .item[data-v-01d41492]:nth-child(3){left:%?478?%;top:%?0?%}.draw_list .item[data-v-01d41492]:nth-child(4){left:%?478?%;top:%?222?%}.draw_list .item[data-v-01d41492]:nth-child(5){left:%?478?%;top:%?444?%}.draw_list .item[data-v-01d41492]:nth-child(6){left:%?239?%;top:%?444?%}.draw_list .item[data-v-01d41492]:nth-child(7){left:%?0?%;top:%?444?%}.draw_list .item[data-v-01d41492]:nth-child(8){left:%?0?%;top:%?222?%}.draw_list .item[data-v-01d41492]:nth-child(9){left:%?239?%;top:%?222?%}.draw_list .item[data-v-01d41492]:nth-child(2),\n  .draw_list .item[data-v-01d41492]:nth-child(9){padding-top:0}.draw_list .item:nth-child(2) .img[data-v-01d41492],\n    .draw_list .item:nth-child(9) .img[data-v-01d41492]{width:100%;height:100%}.draw_list .draw_btn .tit[data-v-01d41492]{display:inline-block;position:absolute;left:0;top:%?130?%;width:100%;text-align:center;font-size:%?24?%;color:#fff0ab}.draw_list .active[data-v-01d41492]{background-image:url("+c+")}.draw_list .active .img2[data-v-01d41492]{opacity:1}.draw_list .active .tit[data-v-01d41492]{color:#fffb90}.my_prize_box[data-v-01d41492]{padding:%?90?% %?60?% %?30?%;position:relative}.my_prize_box .close_btn[data-v-01d41492]{position:absolute;right:%?30?%;top:%?50?%}.my_prize_box .close_btn .ico[data-v-01d41492]{width:%?40?%;height:%?40?%}.my_prize_box .zw_tip[data-v-01d41492]{font-size:%?44?%;color:#fff;text-align:center;padding:%?100?% 0}.my_prize_box .prize_list .li[data-v-01d41492]{border-bottom:%?1?% solid #619dc0;padding:%?24?%;overflow:hidden}.my_prize_box .prize_list .li .num[data-v-01d41492]{font-size:%?32?%;color:#fff;width:%?44?%;height:%?44?%;line-height:%?44?%;text-align:center;border:%?2?% solid #619dc0;border-radius:100%;float:left;margin-top:%?60?%;margin-right:%?30?%}.my_prize_box .prize_list .li .prize_img[data-v-01d41492]{width:%?160?%;height:%?160?%;line-height:%?160?%;text-align:center;box-sizing:border-box;border:%?2?% solid #619dc0;background:#1c6c9a;border-radius:%?20?%;float:left;margin-right:%?40?%}.my_prize_box .prize_list .li .prize_img .img[data-v-01d41492]{width:95%;height:auto;vertical-align:middle}.my_prize_box .prize_list .li .title[data-v-01d41492]{font-size:%?32?%;color:#fff;line-height:%?80?%}.my_prize_box .prize_list .li .p[data-v-01d41492]{font-size:%?28?%;color:#fff;line-height:%?80?%}.rule_pop[data-v-01d41492]{color:#fff;padding-top:%?80?%;position:fixed;top:0;left:0;height:100%;background:rgba(14,83,123,.96)}.rule_pop .close_btn[data-v-01d41492]{position:absolute;right:%?10?%;top:%?5?%;padding:%?20?%}.rule_pop .close_btn .ico[data-v-01d41492]{width:%?30?%;height:%?30?%}.rule_pop .rule_ctn[data-v-01d41492]{margin:0 %?40?%;height:calc(100%);overflow:auto;border-top:%?1?% solid #fff}.rule_pop .rule_ctn .title[data-v-01d41492]{font-size:%?38?%;line-height:%?50?%;font-weight:700;text-align:center;margin:0 %?30?%;padding:%?30?% 0}.rule_pop .rule_ctn .p[data-v-01d41492]{font-size:%?30?%;line-height:%?48?%;margin-bottom:%?40?%}.winning_pop[data-v-01d41492]{width:%?750?%;position:relative;padding-top:%?80?%}.winning_pop .bg[data-v-01d41492]{width:100%}.winning_pop .win_box[data-v-01d41492]{width:%?500?%;position:absolute;left:50%;top:%?540?%;margin-left:%?-250?%;text-align:center}.winning_pop .win_box .good_img[data-v-01d41492]{display:inline-block;width:%?230?%}.winning_pop .win_box .text[data-v-01d41492]{display:block;text-align:center;font-size:%?32?%;line-height:%?40?%;color:#ec5900;margin-top:%?-10?%}.winning_pop .win_box .use_btn[data-v-01d41492]{width:%?249?%;margin-top:%?40?%}.winning_pop .close_btn[data-v-01d41492]{width:%?64?%;height:%?64?%;box-sizing:border-box;padding:%?17?%;position:absolute;left:50%;top:%?1000?%;margin-left:%?-32?%;border-radius:100%;background:#f33441;text-align:center}.winning_pop .close_btn .ico[data-v-01d41492]{width:%?34?%;height:%?34?%;vertical-align:top}.use_pop[data-v-01d41492]{width:%?650?%;padding:%?50?%;border-radius:%?20?%;background:#fff;text-align:center;position:relative}.use_pop .title[data-v-01d41492]{font-weight:700;font-size:%?48?%;color:#000;margin-bottom:%?20?%}.use_pop .good_img[data-v-01d41492]{display:inline-block;width:%?250?%;height:auto}.use_pop .text[data-v-01d41492]{display:block;font-size:%?32?%;color:#000;line-height:%?48?%;height:%?250?%}.use_pop .btn[data-v-01d41492]{display:inline-block;width:%?450?%;height:%?100?%;line-height:%?100?%;text-align:center;border-radius:%?50?%;color:#fff;background:-webkit-linear-gradient(left,#ffc10a,#ffa000)\n    /*Safari5.1 Chrome 10+*/}.use_pop .close_btn[data-v-01d41492]{width:%?64?%;height:%?64?%;box-sizing:border-box;position:absolute;right:%?-20?%;top:%?-20?%;border-radius:100%;text-align:center}.use_pop .close_btn .ico[data-v-01d41492]{width:100%;height:100%;vertical-align:top}body.?%PAGE?%[data-v-01d41492]{background:#0e537b}",""]),t.exports=i},d0ff:function(t,i,e){t.exports=e.p+"static/img/draw_bg.b0bd1525.jpg"},d692:function(t,i,e){"use strict";function a(t,i){this.timer=null,this.startIndex=t.startIndex-1||0,this.count=0,this.winingIndex=t.winingIndex||0,this.totalCount=t.totalCount||6,this.speed=t.speed||100,this.domData=t.domData,this.rollFn(),this.callback=i}a.prototype={rollFn:function(){var t=this;this.startIndex++,this.startIndex>=this.domData.length-1&&(this.startIndex=0,this.count++),this.count>=this.totalCount&&this.startIndex===this.winingIndex?("function"===typeof this.callback&&setTimeout((function(){t.callback(t.startIndex,t.count)}),400),clearInterval(this.timer)):(this.count>=this.totalCount-1&&(this.speed+=30),this.timer=setTimeout((function(){t.callback(t.startIndex,t.count),t.rollFn()}),this.speed))}},t.exports=a},e1a6:function(t,i,e){"use strict";e.r(i);var a=e("399f"),n=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(i,t,(function(){return a[t]}))}(o);i["default"]=n.a},f3f5:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("a481");var a={friendlyDate:function(t){var i={year:"%n% 年前",month:"%n% 月前",day:"%n% 天前",hour:"%n% 小时前",minute:"%n% 分钟前",second:"%n% 秒前"},e=Date.now(),a=Math.floor((e-parseInt(t))/1e3),n=Math.floor(a/60),o=Math.floor(n/60),r=Math.floor(o/24),s=Math.floor(r/30),d=Math.floor(s/12),l="",c=0;return d>0?(l="year",c=d):s>0?(l="month",c=s):r>0?(l="day",c=r):o>0?(l="hour",c=o):n>0?(l="minute",c=n):(l="second",c=0===a?a=1:a),i[l].replace("%n%",c)},timeTodate:function(t,i){var e=new Date;e.getYear(),e.getFullYear(),e.getMonth(),e.getDate(),e.getDay(),e.getTime(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds(),e.toLocaleDateString();e.toLocaleTimeString();e.toLocaleString();var a=new Date(i),n=a.getSeconds(),o=("0"+a.getMinutes()).substr(-2),r=a.getHours(),s=("0"+a.getDate()).substr(-2),d=("0"+(a.getMonth()+1)).substr(-2),l=a.getFullYear(),c="自定义替换值";return t.replace("Y",l).replace("m",d).replace("d",s).replace("H",r).replace("i",o).replace("s",n).replace("index",c)}};i.default=a}}]);