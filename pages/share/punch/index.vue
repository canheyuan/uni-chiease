<template>
	<view>
		<!-- 底部下载提示 -->
		<download-top :detailData="detailData" :lan="lan"></download-top>
		
		<!--打卡分享-->
		<view class="punch_page" v-if="detailData">
			<view class="punch_head">
				<image class="img" :src="imgUrl+'/dk_top.png'" alt="">
				<view class="txt" style="font-size:34upx; line-height:60upx; top:30upx;">
					{{langData.sharePunch.headText01[lan]}}<br v-if="lan=='zh'">
					{{langData.sharePunch.headText02[lan]}} {{detailData.lastPunchDay}} {{langData.sharePunch.headText03[lan]}}
				</view>
				<view class="btn" @click="downloadFn" >{{langData.sharePunch.punchBtnText[lan]}}</view>
			</view>
		
			<view class="punch_data">
				<view class="li li_date clearfix">
					<view class="em"><view class="icons"></view></view>
					<text class="num">{{detailData.maxPunchDay}}</text>
					<view class="p">{{langData.punchCard.punchMaxDay[lan]}}</view>
				</view>
				<view class="li li_score clearfix" >
					<view class="em"><view class="icons"></view></view>
					<text class="num">{{detailData.maxChallengeScore}}</text>
					<view class="p">{{langData.punchCard.emigrateStroe[lan]}}</view>
				</view>
				<view class="li li_time clearfix">
					<view class="em"><view class="icons"></view></view>
					<text class="num">{{detailData.studyDuration}}</text>
					<view class="p">{{langData.punchCard.learnTime[lan]}}</view>
				</view>
			</view>
		</view>
		
		<!-- 底部下载按钮 -->
		<download-bottom :detailData="detailData" :lan="lan"></download-bottom>
	</view>
</template>

<script>
	const app = getApp();
	import downloadTop from "../tpl/download-top.vue"	//顶部下载按钮
	import downloadBottom from "../tpl/download-bottom.vue"
	
	export default {
		components:{
			'download-top'		: downloadTop,
			'download-bottom'	: downloadBottom,
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				dlUrl:app.globalData.dowmlaod,	//下载地址
				detailData:null,	//分享接口详情信息
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				shareId:'',	//打卡分享id
			}
		},
		onLoad(options) {
			app.globalData.source == options.source?options.source:'h5'
			this.shareId = options.shareid?options.shareid:''
			this.getShareDetailFn(this.shareId);
		},
		
		methods: {
			//获取分享详情信息
			getShareDetailFn(shareId){
				this.$http({
					url:`/api/shareInfo/userPunchShareInfo/${shareId}`,
					success:(res)=>{
						var detailData =  res.data;
						this.lan = detailData.lan?detailData.lan:'en'
						this.detailData = detailData
						console.log('打卡分享详情：',detailData)
					}
				})
			},
			downloadFn(){
				if(this.isIOS){
					uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
				}else{
					uni.pageScrollTo({		//uni-app中页面滚动接口
						scrollTop:10000,//滚动到页面的目标位置（单位px）
						duration:100  //滚动动画的时长，默认300ms，单位 ms
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.punch_head{
	position:relative;width:100%;
	.img{width:100%;}
	.tip{
		line-height:36upx; background:#ffa800; font-size:28upx; color:#fff; padding:15upx 20upx; 
		position:absolute; left:0; top:0; z-index:9; width:100%; display:none;
	}
	.txt{
		position:absolute; left:0; top:60upx; font-size:56upx; color:#fff; width:100%; text-align: center; 
		line-height:80upx; letter-spacing:6upx;text-shadow:4upx 4upx 4upx #3e79ff; 
		.span{color:#ffc10a; font-size:72upx; line-height:80upx;letter-spacing:0; vertical-align: top; margin-right:10upx;}
	}
	.btn{
		width:80%;height:100upx; line-height:100upx; text-align: center; display:block; margin:-60upx auto 20upx; background:#fff; 
		border-radius:50upx; font-size:34upx; color:#1788d2;box-shadow: 8upx 0 60upx rgba(23,136,210,.26); position:relative; z-index:9;
	}
	.xxjh_btn{font-size:30upx; color:#777777; display:block; margin:0 auto; text-align: center; line-height:30upx; padding:20upx 0;}
	.xxjh_btn .ico_tri{width:30upx; height:30upx; background-position: 0 -60upx; margin-left:10upx; vertical-align: top;}
}

.punch_data{
	padding:30upx 0;
	.li{
		height:120upx; padding:15upx 30upx;
		.em{
			display:inline-block; width:90upx; height:90upx; background:#ffc10a; border-radius:100%; 
			padding:20upx; float:left; margin-right:20upx; 
			.icons{width:50upx; height:50upx;}
		}
		.num{float:right; font-size:72upx; font-family: Arail; font-weight: bold; color:#ffc10a; line-height:90upx;}
		.p{line-height:90upx; font-size:34upx; color:#242629;}
	}
	.li_date{
		.em{
			box-shadow: 6upx 0 24upx rgba(247,157,0,.5); background:#ffc10a;
			.icons{background-position: 0 0;}
		}
		.num{color:#ffc10a;}
	}
	.li_score{
		.em{
			box-shadow: 6upx 0 24upx rgba(110,219,27,.5); background:#6edb1b;
			.icons{background-position: -50upx 0;}
		}
		.num{color:#6edb1b;}
	}
	.li_time{
		.em{
			box-shadow: 6upx 0 24upx rgba(75,183,245,.5); background:#4bb7f5;
			.icons{background-position: -100upx 0;}
		}
		.num{color:#4bb7f5;}
	}
}

.share_btn_box{
	text-align: center; margin-top:40upx;
}
.share_btn_box a{display:inline-block; width:140upx; height:140upx; background:#ffc10a; color:#fff; border-radius:100%; padding:20upx 0; box-shadow: 8upx 0 28upx rgba(233,140,0,.55); transition:all .3s; }
.share_btn_box a .ico_share{width:60upx; height:60upx; background-position: 0 -100upx; margin-bottom:10upx; }
.share_btn_box a span{display:block; font-size:26upx;}
.share_btn_box a:active{transform:scale(.9,.9);}
/*未能打卡*/
.un_punch .punch_head .img{-webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); filter: grayscale(100%);}
.un_punch .punch_head .tip{display:block;}
.un_punch .punch_head .btn{color:#bebebe;}
.un_punch .share_btn_box a{background:#e3e3e3; box-shadow: none;}
.un_punch .share_btn_box a:active{transform:scale(1,1);}
</style>
