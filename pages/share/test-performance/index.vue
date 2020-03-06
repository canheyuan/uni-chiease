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
				</view>
				<view class="btn" @click="downloadFn">{{langData.shareData.challengeBtn[lan]}}</view>
			</view>
			
		</view>
		
		<!-- 表现最佳的句子录音列表 -->
		<record-list v-if="detailData && detailData.paraList" :detailData="detailData" :lan="lan"></record-list>
		
		<!-- 生词掌握情况 -->
		<view class="sczw_mdl">
			<image class="pj_img" mode="widthFix" :src="imgUrl+'/ico_B.png'"></image>
			<view class="sczw_title"><view class="icons ico_word"></view>生词掌握情况</view>
			<view class="sczw_ctn">
				<view class="bxzj_box">
					<view class="tit"><view class="icons ico_gou"></view><text class="text">表现最佳</text></view>
					<view class="bxzj_list">
						<view class="li">女生</view>
						<view class="li">先生</view>
						<view class="li">请</view>
						<view class="li">对不起</view>
						<view class="li">女生</view>
						<view class="li">女生</view>
						<view class="li">女生</view>
					</view>
				</view>
				<view class="xyjq_box">
					<view class="tit"><view class="icons ico_th"></view><text class="text">还需加强</text></view>
					<view class="xyjq_list">
						<view class="li">小</view>
						<view class="li">董事长</view>
						<view class="li">你好</view>
						<view class="li">小</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 生词掌握情况 -->
		<view class="hxjz_mdl">
			<view class="hxjz_title"><view class="icons ico_hxjz"></view>核心句子</view>
			<view class="hxjz_ctn">
				<view class="hxjz_list">
					<view class="li"><view class="dot"></view><view class="text">这儿是什么地方?</view></view>
					<view class="li"><view class="dot"></view><view class="text">洗手间在哪儿?</view></view>
					<view class="li"><view class="dot"></view><view class="text">这儿是财务部吗?</view></view>
					<view class="li"><view class="dot"></view><view class="text">哪个办公室?</view></view>
				</view>
			
				<view class="zs_box">
					<image class="bg" :src="imgUrl+'/textbook/q_ico.png'"></image>
					<view class="zh">掌握这些核心句子，能让你在学习汉语的过程中循序渐进，学以致用，更好地用汉语流畅沟通。</view>
				</view>
			</view>
		</view>
		
		
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
page{background:#f7f7f7;}
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
		display:block; width:100%; height:88upx; line-height:88upx; text-align: center; margin-top:30upx;
		background:rgba(255, 255, 255, .8); border-radius:10upx; color:#E98C00; font-size:32upx; 
	}
}

.sczw_mdl{
	padding:30upx 25upx; background:#fff; margin-bottom:30upx; position:relative;
	.pj_img{position:absolute; top:6upx; right:6upx; width:130upx;}
	.sczw_title{
		font-size:36upx; color:#242629; line-height:60upx; margin-bottom:20upx; font-weight: bold;
		.ico_word{
			width:60upx; height:60upx;float:left; margin-right:20upx; vertical-align: top;
			background-position:-300upx -100upx; 
		}
		
	}
	.sczw_ctn{padding-left:80upx;
		.bxzj_box{ margin-bottom:30upx;
			.tit{
				font-size:34upx; color:#242629; line-height:40upx; position:relative; 
				overflow: hidden; margin-bottom:30upx; font-weight: bold;
				.ico_gou{
					width:40upx; height:40upx; float:left; margin-right:15upx; vertical-align: top;
					background-position:-80upx -250upx;
				}
				.text{float:left; margin-right:10upx;}
			}
			.tit:after{
				content:''; height:0upx; border-bottom:1upx solid #E3E3E3;display:block; 
				overflow:hidden; padding-top:19upx; 
			}
			.bxzj_list{
				.li{
					display:inline-block; min-width:60upx; padding:0 30upx; height:56upx; line-height:56upx; 
					text-align:center; background:#E9F7FF; margin-right:15upx; font-size:28upx; color:#242629;
					margin-bottom:15upx; border-radius:12upx; box-sizing:content-box;
				}
			}
		}
		.xyjq_box{
			background:#F7F7F7; border-radius:14upx; padding:20upx;
			.tit{
				font-size:34upx; color:#242629; line-height:40upx; position:relative; 
				overflow: hidden; margin-bottom:30upx; font-weight: bold;
				.ico_th{
					width:40upx; height:40upx; float:left; margin-right:15upx; vertical-align: top;
					background-position:-40upx -250upx;
				}
				.text{float:left; margin-right:10upx;}
			}
			.xyjq_list{
				.li{
					display:inline-block; min-width:60upx; padding:0 30upx; height:56upx; line-height:56upx; 
					text-align:center; background:#EBEBEB; margin-right:15upx; font-size:28upx; color:#242629;
					margin-bottom:15upx; border-radius:12upx; box-sizing:content-box;
				}
			}
		}
	}
	
	
}
.hxjz_mdl{
	padding:30upx 25upx; background:#fff; margin-bottom:30upx;
	.hxjz_title{
		font-size:36upx; color:#242629; line-height:60upx; margin-bottom:20upx; font-weight: bold;
		.ico_hxjz{
			width:60upx; height:60upx;float:left; margin-right:20upx; vertical-align: top;
			background-position:-360upx -100upx; 
		}
	}
	.hxjz_ctn{padding-left:80upx;
		.hxjz_list{ border-bottom:1upx solid #E3E3E3; padding-bottom:20upx; margin-bottom:20upx;
			.li{ margin-bottom:10upx; overflow: hidden;
				.dot{display:inline-block; width:14upx; height:14upx; background:#A5DBFF; border-radius:100%; float:left; margin-top:16upx; margin-right:14upx;}
				.text{color:#1788D2;font-size:30upx; display:block; overflow:hidden; line-height:46upx;}
			}
		}
		
		.zs_box{margin-top:30upx; background:#F7F7F7; border-radius:14upx; position:relative;
			.bg{width:100upx; height:88upx; position:absolute; left:0; top:0; z-index:0;}
			.zh{font-size:32upx; line-height:44upx; color:#242629; padding:20upx 42upx 20upx 26upx; position:relative; z-index:1; }
		}
	}
	
		
}

</style>
