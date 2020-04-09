<template>
    <view class="topic-result" v-if="wordParentData">
        <image class="head-img" :src="imgUrl + '/word/word-result-img.png'" alt="" ></image>
        <view class="title"><view class="h3">
			<view class="span">{{langData.topicResult.desTitle[lan]}}</view></view>
		</view>
        <view class="p">
			您刚刚完成了“食物”词卡，掌握了4个新单词，获得了一次抽奖机会
		</view>
        <!-- <view v-if="source=='app'" @click="shareFn" class="share-btn">{{langData.topicResult.shareBtn[lan]}}</view>
        <navigator 
			v-if="source=='app'" 
			:url="'../index/index?category='+category" 
			class="learn-more-btn"
		>{{langData.topicResult.studyBtn[lan]}}</navigator> -->
		
        <navigator 
			class="share-btn" url="../draw/index"
		>去抽奖</navigator>

		<!--下载弹窗-->
		<uni-popup ref="dlPopup" type="bottom">
			<view class="download_pop_btn">
				<view class="tit">{{langData.topicResult.popTitle[lan]}}</view>
					<view class="a" @click="gotoDownload(dlUrl.app)" v-if="system=='pc'">
						<view class="word-icons ico_01"></view>App Store
					</view>
					<view class="a" @click="gotoDownload(dlUrl.GP)">
						<view class="word-icons ico_02"></view>Google Play
					</view>
					<view class="a" @click="gotoDownload(dlUrl.myapp)">
						<view class="word-icons ico_03"></view>MyApp.com
					</view>
				</view>
				<view class="download_pop_close" @click="popupShowFn('dlPopup',false)">{{langData.topicResult.closeBtnText[lan]}}</view>
		</uni-popup>

    </view>
</template>



<script>
const app = getApp();
import lexiconData from '@/static/js/data/lexiconData.js'    //静态题目
import uniPopup from "@/components/uni-popup/uni-popup.vue"
export default {
    name: 'topicResult',
	components: {
		uniPopup
	},
	data () {
		return {
			imgUrl:app.globalData.imgUrl,
			langData:app.globalData.langData,	//语言文件
			lan:app.globalData.lan,	//当前语言
			source:'',	//来源
			dlUrl:app.globalData.dowmlaod,	//下载地址
			isIOS:this.$common.system()=='ios',	//是否IOS系统
			system:this.$common.system(),	//当前手机系统
			wordParentData:null,
			shareDetail:null,
			category:'',	//首页列表类型
		}
    },
	
	onLoad(options){
		//获取地址栏参数，并设置给globalData
		if(!app.globalData.isFirst){	//首次App.vue有加载就不需要再加载
			this.$common.pageLoadFn({
				test:options.test,
				lan :options.lan,
				source:options.source
			})
		}else{
			app.globalData.isFirst = false
		}
		this.source = app.globalData.source
		this.category = app.globalData.categoryType
	},
	
    mounted(){
        var lexiconListAct = lexiconData.lexiconList[0];
        this.wordParentData = app.globalData.nowWordTopicData?app.globalData.nowWordTopicData:lexiconListAct
        if(app.globalData.source=='app'){ //app创建分享信息
            //设置页面标题栏
            var param = {
                title: this.langData.topicResult.title[this.lan]
            }
            Shell.setPageTitle(JSON.stringify(param));
            this.createShareData();
        }
    },
    methods:{
		
		//下载按钮判断
		downlaodPopFn(){
			if(this.isIOS){
				uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
			}else{
				this.popupShowFn('dlPopup',true)
			}
		},
		
		//popup显示、关闭中奖弹窗
		popupShowFn(popName,b,cbOk){
			if(b){
				this.$refs[popName].open()
			}else{
				this.$refs[popName].close()
			}
			//cbOk && cbOk(b)
			if(cbOk){ cbOk(b) }
		},

        //下载跳转
        gotoDownload(gotoUrl){
            uni.navigateTo({ url: `/pages/common/web-view/index?url=${gotoUrl}` });
        },
        
        //分享(分享出去的地址是词卡首页)
        shareFn(){
            var shareDetail = this.shareDetail;
            Shell.share(shareDetail.shareTitle, shareDetail.shareDesc, shareDetail.shareImg, shareDetail.link, shareDetail.shareId);
        },

        //生成分享信息
        createShareData(){
            var _this = this;
             this.$http({
                url:'/shareInfo/shareWordCard',
                method:"post",
                success:function(res){
                    console.log('生成分享信息',res.data);
                    _this.shareDetail = res.data;
                    //_this.getShareDetail(res.data.shareId);
                }
            },this)
        }
    }
};
</script>

<style>
html,body,#app{width:100%; height:100%;}
page{height:100%; width:100%;}
/* 题目结果页 */
.topic-result{width:100%; height:100%; background:url(~@/static/images/word/word-result-bg.png) no-repeat center center; background-size:100% 100%; text-align: center; color:#fff;}
.topic-result .head-img{width:100%;}
.topic-result .title .h3{display:inline-block; font-size:56upx; line-height:80upx; font-weight: bold;  position: relative; margin-bottom:40upx;}
.topic-result .title .h3 .span{display:inline-block; position: relative; z-index:9;}
.topic-result .title .h3:after{content:''; display:inline-block; width:100%; height:22upx; background:rgba(76, 171, 209, 1); position: absolute; bottom:0; left:0; z-index:0;}
.topic-result .p{font-size:32upx; line-height:50upx; margin:0 50upx 100upx;}
.share-btn{display:block; width:370upx; height:110upx; line-height:110upx; text-align: center; border-radius:55upx; background:#fff; font-size:36upx; color:#307DBA; margin:0 auto; }
.learn-more-btn{font-size:26upx; color:#fff; line-height:44upx; text-align: center; display: block;  padding:20upx 0; margin-top:10upx;}

.download_pop_btn{background:#fff;}
.download_pop_btn .tit{height:80upx; line-height:80upx; text-align: center; font-size:26upx; color:#999999;}
.download_pop_btn .a{display:block; height:100upx; line-height:100upx; color:#000000; font-size:36upx; border-top:2upx solid #e3e3e3;}
.download_pop_btn .a .word-icons{width:50upx; height:50upx; margin-right:20upx; vertical-align: middle; position:relative; top:-5upx;}
.download_pop_btn .a .ico_01{background-position: 0 -130upx;}
.download_pop_btn .a .ico_02{background-position: -50upx -130upx;}
.download_pop_btn .a .ico_03{background-position: -100upx -130upx;}
.download_pop_close{color:#1788d2; font-size:36upx; text-align: center; background:#fff; height:100upx; line-height:100upx; margin-top:16upx;}

</style>
