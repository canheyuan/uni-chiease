<template>
	<view>
		<!-- 底部下载提示 -->
		<download-top :detailData="detailData" :lan="lan"></download-top>
		
		<!--定制课头部-->
		<view class="custom_head" v-if="detailData">
			<view class="star_list">
				<view 
					v-for="item in [1,2,3]" :key="item"
					:class="['span',{'act':item<=detailData.star}]"
				></view>
			</view>
			<view class="score">{{detailData.score}}</view>
			<view class="text">
				{{langData.shareCustom.headText01[lan]}}<br>
				{{langData.shareCustom.headText02[lan] + detailData.score + langData.shareCustom.headText03[lan]}}
			</view>
			
			<view class="custom_data">
				<view class="money"><i class="icons ico_money"></i></view>
				<view class="info">
					<view class="h3">{{langData.shareCustom.totalCoinText[lan]}} {{detailData.totalCoin}} {{langData.shareCustom.coin[lan]}}</view>
					<view class="h4">{{langData.shareCustom.rightTitle[lan]}}</view>
					<view class="p">+ {{detailData.rightCoin}} {{langData.shareCustom.coin[lan]}}</view>
					<view class="h4">{{langData.shareCustom.initiativeTitle[lan]}}</view>
					<view class="p">+ {{detailData.initiativeCoin}} {{langData.shareCustom.coin[lan]}}</view>
				</view>
				<view class="btn" @click="downloadFn">{{langData.shareData.challengeBtn[lan]}}</view>
			</view>
			
		</view>
		
		<!-- 表现最佳的句子录音列表 -->
		<record-list v-if="detailData && detailData.paraList" :detailData="detailData" :lan="lan"></record-list>
		
		
		
		
		<!-- 底部下载按钮 -->
		<download-bottom :detailData="detailData"  :lan="lan"></download-bottom>
	</view>
</template>

<script>
	const app = getApp()

	import downloadTop from "../tpl/download-top.vue"
	import downloadBottom from "../tpl/download-bottom.vue"

	export default {
		components:{
			'download-top'		: downloadTop,
			'download-bottom'	: downloadBottom
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				dlUrl:app.globalData.dowmlaod,	//下载地址
				detailData:null,	//分享接口详情信息
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				shareId:'',	//分享id
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
					url:`/api/shareInfo/cusStuShareInfo/${shareId}`,
					success:(res)=>{
						var detailData =  res.data;
						this.lan = detailData.lan?detailData.lan:'en'
						if(detailData.paraList){
							detailData.paraList.forEach(item=>{
								item.isUserPlay = false;
								item.isParaPlay = false;
							});
						}
						this.detailData = detailData
						console.log('定制课分享：：',detailData)				
					},
					successOther:(res)=>{
						if(res.code!=0){
							console.log('暂未找到该分享页面：',res)		
						}
					}
				})
			},
			
			//下载按钮判断
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
/*定制课*/
.custom_head{
	background:url(~@/static/images/share_bg03.jpg) no-repeat center top; background-size:100% auto; 
	padding-top:600upx; position:relative;
	.score{
		display:inline-block; width:100%; text-align: center; font-size: 200upx; color:#fff55a; 
		position:absolute; top:230upx; font-weight: bold; line-height:220upx;
	}
	.text{
		position:absolute; top:460upx; left:0; width:100%; text-align: center; 
		font-size:36upx; line-height:48upx; color:#fff;
	}
	
	.star_list{
		position:absolute; top:40upx; left:0; width:100%; text-align: center;
		.span{
			display:inline-block; width:180upx; height:180upx; margin:60upx 10upx 0; vertical-align: top;
			background:url(~@/static/images/star.png) no-repeat; background-size: 100% 100%;
		}
		.span:nth-child(2){margin-top:0;}
		.span.act{background-image:url(~@/static/images/star_cur.png);}
	}
}

.custom_data{
	margin:30upx 25upx; padding:30upx; border-radius:14upx; position:relative; 
	box-shadow:6upx 0 20upx rgba(247,157,0,.5);
	background:-moz-linear-gradient(left,#ffc10a,#e98c00);/*火狐*/
	background: -webkit-linear-gradient(left,#ffc10a, #e98c00);   /*Safari5.1 Chrome 10+*/
	.money{
		float:left; width:100upx; height:100upx; background:#fff; border-radius:100%; text-align: center;
		box-shadow:6upx 0 20upx rgba(233,140,0,.44); margin-right:30upx;  line-height:100upx;
		.ico_money{width:60upx; height:60upx; background-position: -120upx -100upx; vertical-align: middle;}
	}
	.info{
		overflow:hidden; color:#fff;
		.h3{font-size:44upx; }
		.h4{font-size:28upx; color:#fff3d2; margin-bottom:10upx; margin-top:20upx;}
		.p{font-size:34upx;}
	}
	.btn{
		display:inline-block; width:160upx; height:64upx; line-height:58upx; text-align: center; 
		border:2upx solid #fff; border-radius:32upx; color:#fff; font-size:28upx; 
		position:absolute; right:30upx; bottom:30upx;
	}
}
</style>
