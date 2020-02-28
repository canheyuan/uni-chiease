<template>
	<!--顶部提示下载-->
	<view :class="['share_top','clearfix',{download_show:topShow}]  " v-if="detailData">
		<view class="logo"><image class="img" :src="`${imgUrl}/logo.png`" alt=""></view>
		<view class="down_btn" @click="downloadFn">Download</view>
		<view class="info">
			<view class="h3">CHIease</view>
			<view class="p">{{detailData.shareTitle}}</view>
		</view>
		<view class="close_btn" @click="closeDownloadFn">
			<view class="icons"></view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				//lan:app.globalData.lan,	//语言 
				dlUrl:app.globalData.dowmlaod,	//下载地址
				system:this.$common.system(),	//系统类型(ios/android/pc)
				systemLan:this.$common.getSystemLang(),	//获取手机语言
				topShow:true,	//顶部下载提醒是否显示
			}
		},
		
		props:{
			detailData:{ type: Object },
			lan:{type: String}
		},
		
		
		methods: {
			downloadFn(){
				if(this.system == 'ios'){
					uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
				}else{
					 uni.pageScrollTo({//uni-app中页面滚动接口
                            scrollTop:10000,//滚动到页面的目标位置（单位px）
                            duration:100  //滚动动画的时长，默认300ms，单位 ms
                        })
				}
			},
			//关闭顶部下载通知
			closeDownloadFn(){
				this.topShow = false
			}
		}
	}
</script>

<style>
/*分享顶部提示下载*/
.share_top{background:#fff; padding:0 20upx; position:relative; overflow: hidden; height:0;  box-sizing: border-box; transition:all .3s; opacity: 0;}
.share_top .logo{width:120upx; height:120upx; float:left; margin-right:20upx; font-size:0;}
.share_top .logo .img{width:100%; height:100%}
.share_top .down_btn{display:inline-block; width:160upx; height:64upx; line-height:64upx; text-align: center; background:#ff5555; border-radius:10upx; color:#fff; font-size:28upx; float:right; margin-top:35upx; margin-left:20upx;}
.share_top .info{overflow:hidden; color:#333;}
.share_top .info .h3{font-size:36upx; margin-bottom:10upx;}
.share_top .info .p{font-size:28upx; line-height:34upx;}
.share_top .close_btn{display:inline-block; width:114upx; height:114upx; background:#999999; position:absolute; top:-70upx; right:-60upx; border-radius:100%;}
.share_top .close_btn .icons{content:''; display:inline-block; width:30upx; height:30upx; background-position:-130upx -60upx; position:absolute; bottom:12upx; left:20upx;}

.download_show{height:160upx;  padding:20upx; opacity: 1; }
</style>
