<template>
	<view>
		<!-- 底部下载提示 -->
		<download-top></download-top>
		
		<!--口语课头部-->
		<view class="spoken_head" v-if="detailData">
			<view class="spoken_data">
				<view class="title">
					<view class="h3">{{detailData.chapterName['zh']}}</view>
					<view class="p">{{detailData.chapterName['en']}}</view>
				</view>
				<!--图表-->
				<view class="spoken_charts" id="spoken_charts"></view>
				
				<view class="shadow_bg"></view>
			</view>
			<view class="share_user">
				<view class="per_img"><img :src="detailData.headImg" alt=""></view>
				<navigator class="btn" url="../dub/index?source=app">
					我要挑战
				</navigator>
				<view class="info">
					<view class="h3">学习与闯关</view>
					<view class="p">
						获得了
						<text class="yellow">10</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部下载按钮 -->
		<download-bottom></download-bottom>
	</view>
</template>

<script>
	import downloadTop from "../../../components/download-top.vue"
	import downloadBottom from "../../../components/download-bottom.vue"
	export default {
		components:{
			'download-top'		: downloadTop,
			'download-bottom'	: downloadBottom
		},
		data() {
			return {
				imgUrl:this.$common.imgUrl,
				detailData:null,
				shareId:'b5c31a79257ffb3ac2c3af79377932f6',	//分享id
			}
		},
		onLoad(options) {
			console.log('spoken-onLoad-options:',options)
			this.$common.source == options.source?options.source:'h5'
			//this.shareId = options.shareid?options.shareid:''
			this.getShareDetailFn(this.shareId);
		},
		methods: {
			//获取分享详情信息
			getShareDetailFn(shareId){
				this.$http({
					url:`/api/shareInfo/oralChaShareInfo/${shareId}`,
					success:(res)=>{
						var detailData =  res.data;
						this.detailData = detailData
						console.log('口语课分享详情：',detailData)
					}
				},this)
			},
		}
	}
</script>

<style>
/*口语课头部*/
.spoken_head{margin-bottom:30upx;}
.spoken_data{height:570upx; width:100%; text-align: center; position:relative; z-index:2; background:url(/static/images/share_bg01.jpg) no-repeat center top; background-size:100% 100%;}
.spoken_data .title{padding-top:40upx;}
.spoken_data .title .h3{font-size:38upx; color:#fff; margin-bottom:20upx;}
.spoken_data .title .p{font-size:30upx; color:#fff;}
.spoken_data .shadow_bg{height:24upx; width:100%;  position:absolute; bottom:-24upx; left:0;
background:-moz-linear-gradient(top,rgba(0,0,0,.3),rgba(0,0,0,0));/*火狐*/
background: -webkit-linear-gradient(top,rgba(0,0,0,.3), rgba(0,0,0,0));   /*Safari5.1 Chrome 10+*/
}
.spoken_charts{width:550upx; height:350upx; margin:30upx auto 0;}
.share_user{width:700upx; margin:0 auto; background:#35afff; border-bottom-left-radius: 30upx; border-bottom-right-radius: 30upx; padding:30upx; height:160upx; box-shadow:6upx 0 20upx rgba(53,175,255,.4);}
.share_user .per_img{float:left; width:100upx; height:100upx; border:4upx solid #9ad7ff; border-radius:100%; overflow: hidden; margin-right:20upx;}
.share_user .per_img img{width:100%; height:100%; border-radius:100%;}
.share_user .btn{display:inline-block; width:160upx; height:64upx; line-height:58upx; text-align: center; border:2upx solid #fff; border-radius:32upx; color:#fff; font-size:28upx; float:right; margin-top:15upx; margin-left:20upx;}
.share_user .info{overflow:hidden; padding-top:5upx;}
.share_user .info .h3{font-size:34upx; color:#fff; margin-bottom:15upx;}
.share_user .info .p{font-size:28upx; color:#c1e6ff; line-height:30upx;}
.share_user .info .p .yellow{color:#fdcf00;}
.share_user .info .p .ico_money{background-position: -100upx -60upx; width:30upx; height:30upx; vertical-align: top;}
</style>
