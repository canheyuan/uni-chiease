<template>
	<view>
		<!-- 底部下载提示 -->
		<download-top :detailData="detailData" :lan="lan"></download-top>
		
		<!--口语课头部-->
		<view class="spoken_head">
			<view class="spoken_data">
				<view class="title"  v-if="detailData">
					<view class="h3">{{detailData.chapterName['zh']}}</view>
					<view class="p">{{detailData.chapterName['en']}}</view>
				</view>
				<!--图表-->
				<div class="spoken_charts" id="spoken_charts" ref="charts1"></div>
				<!-- <view class="echarts_box" ref="echartsBox" id="chart_example"></view> -->
				<view class="shadow_bg"></view>
			</view>
			<view class="share_user"  v-if="detailData">
				<view class="per_img"><img :src="detailData.headImg" alt=""></view>
				<view class="btn" @click="downloadFn">
					{{langData.shareData.challengeBtn[lan]}}
				</view>
				<view class="info">
					<view class="h3">{{langData.shareSpoken.headTypeText[lan]}}</view>
					<view class="p">
						{{langData.shareSpoken.headGetText[lan]}}
						<text class="yellow">10</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 表现最佳的句子录音列表 -->
		<record-list v-if="detailData && detailData.paraList" :detailData="detailData" :lan="lan"></record-list>
		
		<!-- 底部下载按钮 -->
		<download-bottom v-if="detailData" :detailData="detailData" :lan="lan"></download-bottom>
	</view>
</template>

<script>
	const app = getApp();
	import echarts from 'echarts'
	// import * as echarts from 'echarts'  
	// import mpvueEcharts from 'mpvue-echarts'  
	//命名一个方法名称，方便自己识别，也方便多个图表引用时易区别。
	//切记这方法不能写到export default中。
	function initChart(canvas, width, height) {
		const chart = echarts.init(canvas, null, {
			width: width,
			height: height
		})
		canvas.setChart(chart)
	
		var option = {
			backgroundColor: '#ffffff',
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
			series: [{
				label: {
					normal: {
						fontSize: 14
					}
				},
				type: 'pie',
				center: ['50%', '50%'],
				radius: [0, '60%'],
				data: [{
					value: 55,
					name: '北京'
				}, {
					value: 20,
					name: '武汉'
				}, {
					value: 10,
					name: '杭州'
				}, {
					value: 20,
					name: '广州'
				}, {
					value: 38,
					name: '上海'
				}],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 2, 2, 0.3)'
					}
				}
			}]
		}
	
		chart.setOption(option)
		return chart
	}


	
	import downloadTop from "../tpl/download-top.vue"
	import downloadBottom from "../tpl/download-bottom.vue"
	import recordList from "../tpl/my-record-list.vue"
	//创建音频实例
	const audioObj = uni.createInnerAudioContext();
	audioObj.autoplay = true;
	export default {
		components:{
			'download-top'		: downloadTop,
			'download-bottom'	: downloadBottom,
			'record-list'		: recordList,
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				detailData:null,
				dlUrl:app.globalData.dowmlaod,	//下载地址
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				shareId:'',	//分享id
				// fn1OnInit: chartsFn,
			}
		},
		onLoad(options) {
			app.globalData.source == options.source?options.source:'h5'
			this.shareId = options.shareid?options.shareid:''
			this.getShareDetailFn(this.shareId);
		},
		onReady(){
			//this.chartsFn2()
		},
		methods: {
			//获取分享详情信息
			getShareDetailFn(shareId){
				this.$http({
					url:`/api/shareInfo/oralChaShareInfo/${shareId}`,
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
						this.chartsFn1()
						console.log('口语课分享详情：',detailData)
					}
				})
			},
			
			chartsFn2(){
				let myChart = echarts.init(document.getElementById('chart_example'));
				let option = {
					color: ['#f44'],
					tooltip : {
					  trigger: 'axis',
					  axisPointer : {
						type : 'shadow'
					  }
					},
					xAxis : [
					  {
						type : 'category',
						data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
						axisTick: {
						  alignWithLabel: true
						}
					  }
					],
					yAxis : [
					  {
						type : 'value'
					  }
					],
					series : [
					  {
						name:'每月花费',
						type:'bar',
						barWidth: '60%',
						data:[995,666,444,858,654,236,645,546,846,225,547,356]
					  }
					]
				 };
				 myChart.setOption(option);
			},
			
			//蚊香图表
			chartsFn1(){
				//var chartsHeight = $('#spoken_charts').height()/2;
				 console.log('this.$refs.spoken_charts',this.$refs,this.$refs.charts1.offsetHeight)
				 
				var myChart = echarts.init(document.getElementById('spoken_charts'));
				var chartsHeight = this.$refs.charts1.offsetHeight/2;
				console.log(chartsHeight);
				var barWidth = 40*chartsHeight/350;
				var barInterval =16*chartsHeight/350;
				var color= ['#ff5555', '#35afff','#5fce51', '#ffc10a'];
				var dataStyle = {
					normal: {
						label: {
							show: false
						},
						labelLine: {
							show: false
						},
						shadowBlur: 40,
						borderWidth: 10,
						shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
					}
				};
				var placeHolderStyle = {
					normal: {
						color: 'rgba(255,255,255,.12)',
						label: {
							show: false
						},
						labelLine: {
							show: false
						}
					},
					emphasis: {
						color: '#393d50'
					}
				};
				var option = {
					backgroundColor: 'transparent',
					title: {
						text: this.detailData.score,
						left:'22%',
						x: 'center',
						y: 'center',
						textStyle: {
							fontWeight: 'bold',
							fontSize: 40,
							color: "#ffffff",
						}
					},
					tooltip: {
						trigger: 'item',
						show: true,
						formatter: "{b} : <br/>{d}%",
						//backgroundColor: 'rgba(0,0,0,0.7)', // 背景
						padding: [8, 10], //内边距
						extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
					},
					legend: {
						orient: 'vertical',
						// icon: 'circle',
						left: '75%',
						top: '20',
						itemWidth:35*chartsHeight/350,
						itemHeight:35*chartsHeight/350,
						itemGap:20,
						data: ['正确率', '流畅度', '完整度','发音'],
						textStyle: {
							color: '#ffffff'
						}
					},
					series: [{
							name: 'Line 1',
							type: 'pie',
							clockWise: true,
							radius: [chartsHeight-barWidth, chartsHeight],
							center:['32%','50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							startAngle: 90,
							label:{
								borderRadius:'10',
							},
							data: [
								{
									value: this.detailData.accuracyScore,
									name: '正确率',
									itemStyle: {
										normal: {
											color: color[0]
										}
									}
								},
								{
									value: 100-this.detailData.accuracyScore,
									name: '',
									tooltip: {
										show: false
									},
									itemStyle: placeHolderStyle
								}
							]
						},
						{
							name: 'Line 2',
							type: 'pie',
							clockWise: true,
							radius: [chartsHeight-barWidth*2-barInterval, chartsHeight-barWidth-barInterval],
							center:['32%','50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							startAngle: 90,
							label:{
								borderRadius:'10',
							},
							data: [{
									value: this.detailData.fluencyScore,
									name: '流畅度',
									itemStyle: {
										normal: {
											color:color[1]
										}
									}
								},
								{
									value: 100-this.detailData.fluencyScore,
									name: '',
									tooltip: {
										show: false
									},
									itemStyle: placeHolderStyle
								},
							]
						},
						{
							name: 'Line 3',
							type: 'pie',
							clockWise: true,
							radius: [chartsHeight-barWidth*3-barInterval*2, chartsHeight-barWidth*2-barInterval*2],
							center:['32%','50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							startAngle: 90,
							data: [{
									value: this.detailData.integrityScore,
									name: '完整度',
									itemStyle: {
										normal: {
											color: color[2]
										}
									}
								},
								{
									value: 100-this.detailData.integrityScore,
									name: '',
									tooltip: {
										show: false
									},
									itemStyle: placeHolderStyle
								},
							]
						},
						{
							name: 'Line 4',
							type: 'pie',
							clockWise: true,
							radius: [chartsHeight-barWidth*4-barInterval*3, chartsHeight-barWidth*3-barInterval*3],
							center:['32%','50%'],
							itemStyle: dataStyle,
							hoverAnimation: false,
							startAngle: 90,
							data: [{
									value: this.detailData.rhythmScore,
									name: '发音',
									itemStyle: {
										normal: {
											color: color[3]
										}
									}
								},
								{
									value: 100-this.detailData.rhythmScore,
									name: '',
									tooltip: {
										show: false
									},
									itemStyle: placeHolderStyle
								},
							]
						}
					]
				};
				
				
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},
			
			//下载跳转
			downloadFn(){
				if(this.isIOS){
					uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
				}else{
					uni.pageScrollTo({		//uni-app中页面滚动接口
						scrollTop:10000,//滚动到页面的目标位置（单位px）
						duration:100  //滚动动画的时长，默认300ms，单位 ms
					})
				}
			},
		}
	}
</script>

<style lang="scss">
/*口语课头部*/
.spoken_head{margin-bottom:30upx;}
.spoken_data{height:570upx; width:100%; text-align: center; position:relative; z-index:2; background:url(~@/static/images/temp/share_bg01.jpg) no-repeat center top; background-size:100% 100%;}
.spoken_data .title{padding-top:40upx;}
.spoken_data .title .h3{font-size:38upx; color:#fff; margin-bottom:20upx;}
.spoken_data .title .p{font-size:30upx; color:#fff;}
.spoken_data .shadow_bg{
	height:24upx; width:100%;  position:absolute; bottom:-24upx; left:0;
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

.echarts_box{width:100%; height:1000rpx;}
</style>



