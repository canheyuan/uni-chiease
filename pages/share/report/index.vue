<template>
	<view class="gray_bg">
		<!-- 底部下载提示 -->
		<download-top :detailData="detailData" :lan="lan"></download-top>
		
		<!--测试报告头部-->
		<div class="report_head" v-if="detailData">
			<div class="report_top">
				<div class="title">
					{{langData.shareReport.headTitleText01[lan]}}
					{{detailData.level}}
					{{langData.shareReport.headTitleText02[lan]}}
				</div>
				<div class="report_progress">
					<div class="progress" >
						<arcbar-chart
							:dataAs="ArcbarChart.dataAs"
							:extraAs="ArcbarChart.extraAs"
							:width="400"
							:height="400"
							canvasId="ht1"
						></arcbar-chart>
					</div>
					
					<div class="progress_data">
						<p>Your level</p>
						<h3>Lv.{{detailData.level}}</h3>
						<a :href="isIOS?langData.shareData.downloadAppleUrl:'#download_mdl'"  class="btn">
							{{langData.shareData.challengeBtn[lan]}}
						</a>
					</div>
				</div>
			</div>
			
			<div class="report_data" v-if="reportData">
				<div class="report_title">
					<i class="icons ico_report"></i>
					{{langData.shareReport.reportTitleText[lan]}}
				</div>
				<ul class="report_list">
					<li class="act" v-for="item in reportData.content">
						<span class="cir"><i class="icons"></i></span>
						<p>{{item[lan]}}</p>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 广告图 -->
		<div 
			class="report_ad" 
			style="background:url(static/images/share_banner01.png) no-repeat; background-size:100% auto;"
		>
			<h3>{{langData.shareReport.reportAdTitle[lan]}}</h3>
			<p>{{langData.shareReport.reportAdDes[lan]}}</p>
		</div>
		
		<!-- 底部下载按钮 -->
		<download-bottom :detailData="detailData" :lan="lan"></download-bottom>
	</view>
</template>

<script>
	const app = getApp();
	const reportData = require('../../../static/js/data/report.js').default
	import downloadTop from "../tpl/download-top.vue"	//顶部下载按钮
	import downloadBottom from "../tpl/download-bottom.vue"	//底部下载按钮
	import ArcbarChart from '@/components/stan-ucharts/ArcbarChart.vue';
	
	//创建音频实例
	const audioObj = uni.createInnerAudioContext();
	audioObj.autoplay = true;
	export default {
		components:{
			'download-top'		: downloadTop,
			'download-bottom'	: downloadBottom,
			'ArcbarChart'		: ArcbarChart
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				reportData:null,
				detailData:null,
				shareId:'',	//分享id
				ArcbarChart: {
					dataAs:{
						series: [{
							name: '',
							data:0,
							color: '#ffffff',
						}]
					},
					extraAs:{
						extra:{
							arcbar:{
								backgroundColor:'rgba(255,255,255,.2)',
								width:9,
								type:'circle'
							}
						}
					}
				},
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
					url:`/api/shareInfo/userExamShareInfo/${shareId}`,
					success:(res)=>{
						console.log('测试报告分享详情：',res.data,reportData)
						var detailData =  res.data;
						this.lan = detailData.lan?detailData.lan:'en'
						this.detailData = detailData
						this.reportData = reportData[detailData.level-1]
						this.ArcbarChart.dataAs.series[0].data = (detailData.level/6).toFixed(2)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
/*测试报告分享*/
.report_head{background:#fff; max-height:100%; overflow: hidden;}
.report_top{height:620upx; background:url(~@/static/images/share_bg04.jpg) no-repeat center bottom; background-size: 100% auto;}
.report_top .title{font-size:36upx; color:#fff; line-height:48upx; padding:40upx 60upx; text-align: center;}

.report_progress{width:400upx; height:400upx; margin:0 auto; position:relative;  border-radius:100%;}
.report_progress .progress{width:100%; height:100%; text-align: center; }
.progress_data{background:rgba(255,255,255,.1); width:320upx; height:320upx; border-radius:100%; position:absolute; top:40upx; left:40upx; color:#fff; text-align: center; padding-top:40upx;}
.progress_data p{font-size:30upx; position:relative; padding-bottom:10upx;}
.progress_data p:after{height:6upx; width:48upx; background:#ffc10a; content:''; position:absolute; left:50%; margin-left:-24upx; bottom:0;}
.progress_data h3{font-size:90upx; line-height:110upx; font-weight: bold; margin-bottom:10upx; }
.progress_data h3.blur{filter: blur(18upx);}
.progress_data .btn{display:inline-block; width:180upx; height:64upx; line-height:58upx; text-align: center; border:2upx solid #fff; border-radius:32upx; color:#fff; font-size:28upx;}

.report_data{padding:50upx 25upx; background:#fff;}
.report_title{font-size:36upx; color:#242629; line-height:60upx; margin-bottom:30upx;}
.report_title .ico_report{ width:60upx; height:60upx; background-position:-180upx -100upx; float:left; margin-right:20upx; vertical-align: top;}
.report_des{margin-left:80upx; color:#242629; line-height:44upx; font-size:34upx; padding-bottom:20upx; border-bottom:2upx solid #e3e3e3; margin-bottom:20upx;}
.report_list{padding-left:80upx;}
.report_list li{margin-bottom:40upx; overflow: hidden;}
.report_list li:last-child{margin-bottom:0;}
.report_list li .cir{float:left; width:38upx; height:38upx; background:#e5e5e5; border-radius:19upx; margin-right:20upx;}
.report_list li.act .cir{background:#ffc10a; box-shadow:4upx 0 10upx rgba(248,195,2,.48); line-height:30upx; text-align: center;}
.report_list li.act .cir i{background-position:-160upx -60upx; width:30upx; height:30upx; margin-top:4upx; }
.report_list li p{overflow:hidden; font-size:34upx; color:#242629; line-height:42upx;}

.report_ad{width:700upx; height:260upx; border-radius:10upx; position:relative; margin:30upx 25upx; padding:30upx;}
.report_ad h3{display:inline-block; height:46upx; line-height:46upx; background:#e98c00; color:#fff; font-size:28upx; padding:0 20upx; border-radius:10upx; margin-bottom:20upx;}
.report_ad p{color:#242629; font-size:32upx; line-height:48upx;}
</style>
