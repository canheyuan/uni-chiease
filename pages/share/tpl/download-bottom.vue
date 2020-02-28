<template>
	<!--下载-->
	<view class="download_mdl"  v-if="detailData">
		<view class="down_head">
			<view class="title">
				<view class="h3">CHIease</view>
				<view class="p">{{detailData.shareDesc}}</view>
			</view>
			<image class="head_img" mode="widthFix" :src="`${imgUrl}/share_img01.jpg`" alt="">
			<image class="down_tit" mode="widthFix" :src="`${imgUrl}/down_head.png`" alt="" >
		</view>
		<view class="down_btns" v-if="system!='ios'">
			<navigator class="btn" :url="'/pages/common/web-view/index?url=' + dlUrl.apple" v-if="system!='android'">
				<image class="img" :src="`${imgUrl}/downbtn01.png`" alt="">
			</navigator>
			<navigator  class="btn" :url="'/pages/common/web-view/index?url=' + dlUrl.GP" v-if="system!='ios'">
				<image class="img" :src="`${imgUrl}/downbtn02.png`" alt="">
			</navigator>
			<navigator class="btn" :url="'/pages/common/web-view/index?url=' + dlUrl.myapp" v-if="system!='ios'">
				<image class="img" :src="`${imgUrl}/downbtn03.png`" alt="">
			</navigator>
		</view>
		<view class="down_btns2" v-if="system=='ios'">
			<navigator class="apply_btn" :url="'/pages/common/web-view/index?url=' + dlUrl.apple">
				<view class="icons"></view>
				<view class="h4">Download</view>
				<view class="p">on the App Store</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				lang:'',	//语言
				dlUrl:app.globalData.dowmlaod,	//下载地址
				system:this.$common.system(),	//系统类型
				systemLan:this.$common.getSystemLang(),	//获取手机语言
			}
		},
		
		props:{
			detailData:{ type: Object },
			lan:{type: String}
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss">
/*下载*/
.download_mdl{
	background:#fff; text-align: center; padding-bottom:80upx;
	.down_head{
		position: relative; text-align: center;
		.title{
			position: absolute; top:50upx; left:0; z-index:10; width:100%; text-align: center; color:#fff; 
			.h3{font-size:44upx; margin-bottom:20upx; line-height:52upx;}
			.p{font-size:32upx; padding:0 40upx;}
		}
		.head_img{width:100%;}
		.down_tit{width:366upx; height:.34upx; margin-bottom:50upx;}
	}
	.down_btns{
		text-align: center;
		.btn{display:inline-block; width:222upx; height:222upx;
			.img{width:100%; height:100%;}
		}
	}
	
	.down_btns2{
		.apply_btn{
			display:inline-block; width:560upx; height:120upx; color:#fff; border-radius:60upx; text-align: left; padding:20upx 0; margin-top:40upx;
			background:-moz-linear-gradient(left,#62d8ff,#35afff); 
			background: -webkit-linear-gradient(left, #62d8ff, #35afff); 
			box-shadow:5upx 0 18upx rgba(53,175,255,.4);
			.h4{font-size:44upx; line-height:46upx;}
			.p{font-size:30upx; line-height:34upx;}
			.icons{float:left; width:70upx; height:70upx; margin-left:50upx; margin-right:40upx; background-position:-70upx -170upx;}
		}
		.android_btn{
			background:-moz-linear-gradient(left,#ffc10a,#ffa100); 
			background: -webkit-linear-gradient(left, #ffc10a, #ffa100); 
			box-shadow:5upx 0 18upx rgba(247,175,0,.4);
			.icons{background-position:-140upx -170upx;}
		}
	}
}

// .down_head .title{position: absolute; top:50upx; left:0; z-index:10; width:100%; text-align: center; color:#fff; }
// .down_head .title .h3{font-size:44upx; margin-bottom:20upx; line-height:52upx;}
// .down_head .title .p{font-size:32upx; padding:0 40upx;}
// .download_mdl .head_img{width:100%;}
// .download_mdl .down_tit{width:366upx; height:.34upx; margin-bottom:50upx;}
// .down_btns{text-align: center;}
// .down_btns .btn{display:inline-block; width:222upx; height:222upx;}
// .down_btns .btn .img{width:100%; height:100%;}


</style>
