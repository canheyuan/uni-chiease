<template>
	<!--顶部提示下载-->
	<view class="share_top clearfix download_show">
		<view class="logo"><image class="img" :src="`${imgUrl}/logo.png`" alt=""></view>
		<navigator url="/pages/common/web-view/index" class="down_btn">Download</navigator>
		<view class="info">
			<view class="h3">CHIease</view>
			<view class="p">Package one, Chinese learning course release.</view>
		</view>
		<view class="close_btn">
			<view class="icons"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl:this.$common.imgUrl,
				dlUrl:this.$common.dowmlaod,	//下载地址
				system:this.$common.system()	//系统类型
			}
		},
		onLoad() {
	
		},
		methods: {
	
		}
	}
</script>

<style>
/*分享顶部提示下载*/
.share_top{background:#fff; padding:0 20upx; position:relative; overflow: hidden; height:0;  box-sizing: border-box;  transition:all .3s; opacity: 0;}
.share_top .logo{width:120upx; height:120upx; float:left; margin-right:20upx; font-size:0;}
.share_top .logo .img{width:100%; height:100%}
.share_top .down_btn{display:inline-block; width:160upx; height:64upx; line-height:64upx; text-align: center; background:#ff5555; border-radius:10upx; color:#fff; font-size:28upx; float:right; margin-top:35upx; margin-left:20upx;}
.share_top .info{overflow:hidden; color:#333;}
.share_top .info .h3{font-size:36upx; margin-bottom:10upx;}
.share_top .info .p{font-size:28upx; line-height:34upx;}
.share_top .close_btn{display:inline-block; width:114upx; height:114upx; background:#999999; position:absolute; top:-70upx; right:-60upx; border-radius:100%;}
.share_top .close_btn .icons{content:''; display:inline-block; width:30upx; height:30upx; background-position:-130upx -60upx; position:absolute; bottom:12upx; left:20upx;}

.download_show{height:160upx;  padding:20upx;opacity: 1; }
</style>
