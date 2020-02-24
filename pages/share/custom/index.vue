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
				<!-- 引入的mpvue-echarts组件 -->
				<view class="spoken_charts" id="spoken_charts">
					<mpvue-echarts canvasId="chat1" :echarts="echarts" :onInit="fn1OnInit"  />
				</view>
				<view class="shadow_bg"></view>
			</view>
			<view class="share_user">
				<view class="per_img"><img :src="detailData.headImg" alt=""></view>
				<navigator class="btn" url="../dub/index?source=app">
					{{langData.shareData.challengeBtn[lan]}}
				</navigator>
				<view class="info">
					<view class="h3">{{langData.shareSpoken.headTypeText[lan]}}</view>
					<view class="p">
						{{langData.shareSpoken.headGetText[lan]}}
						<text class="yellow">10</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 录音列表 -->
		<record-list :detailData="detailData"></record-list>
		
		<!-- 底部下载按钮 -->
		<download-bottom></download-bottom>
	</view>
</template>

<script>
	const app = getApp();
	import * as echarts from 'echarts'
	import mpvueEcharts from 'mpvue-echarts'
	//命名一个方法名称，方便自己识别，也方便多个图表引用时易区别。
	//切记这方法不能写到export default中。
	function fn1(canvas, detailData) {
		
			var shareSpokenData = this.langData.shareSpoken
			var chartsHeight = 350/2;
			var barWidth = 40*chartsHeight/350;
			var barInterval =16*chartsHeight/350;
			var color= ['#ff5555', '#35afff','#5fce51', '#ffc10a'];
			const chart = echarts.init(canvas, null, {
				width: 350,
				height: chartsHeight
			})
			canvas.setChart(chart);
			
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
					text: detailData.score,
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
					 data: [shareSpokenData.accuracy[this.lan], shareSpokenData.fluency[this.lan], shareSpokenData.intact[this.lan],shareSpokenData.pronounce[this.lan]],
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
								value: detailData.accuracyScore,
								name: shareSpokenData.accuracy[this.lan],
								itemStyle: {
									normal: {
										color: color[0]
									}
								}
							},
							{
								value: 100-detailData.accuracyScore,
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
								value: detailData.fluencyScore,
								name: shareSpokenData.fluency[this.lan],
								itemStyle: {
									normal: {
										color:color[1]
									}
								}
							},
							{
								value: 100-detailData.fluencyScore,
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
								value: detailData.integrityScore,
								name: shareSpokenData.intact[this.lan],
								itemStyle: {
									normal: {
										color: color[2]
									}
								}
							},
							{
								value: 100-detailData.integrityScore,
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
								value: detailData.rhythmScore,
								name: shareSpokenData.pronounce[this.lan],
								itemStyle: {
									normal: {
										color: color[3]
									}
								}
							},
							{
								value: 100-detailData.rhythmScore,
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
		
			chart.setOption(option)
		return chart
	};
	
	function chartsFn(){
				//var chartsHeight = $('#spoken_charts').height()/2;
				var chartsHeight = this.$refs.spoken_charts.offsetHeight/2;
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
						text: this.checkShareData.score,
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
									value: this.checkShareData.accuracyScore,
									name: '正确率',
									itemStyle: {
										normal: {
											color: color[0]
										}
									}
								},
								{
									value: 100-this.checkShareData.accuracyScore,
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
									value: this.checkShareData.fluencyScore,
									name: '流畅度',
									itemStyle: {
										normal: {
											color:color[1]
										}
									}
								},
								{
									value: 100-this.checkShareData.fluencyScore,
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
									value: this.checkShareData.integrityScore,
									name: '完整度',
									itemStyle: {
										normal: {
											color: color[2]
										}
									}
								},
								{
									value: 100-this.checkShareData.integrityScore,
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
									value: this.checkShareData.rhythmScore,
									name: '发音',
									itemStyle: {
										normal: {
											color: color[3]
										}
									}
								},
								{
									value: 100-this.checkShareData.rhythmScore,
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
	
				var myChart = echarts.init(document.getElementById('spoken_charts'));
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
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
			mpvueEcharts
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				detailData:null,
				shareId:'b5c31a79257ffb3ac2c3af79377932f6',	//分享id
				
				echarts,
				//图表数据绑定（我们定义的两个方法绑定）
				fn1OnInit: chartsFn,
			}
		},
		onLoad(options) {
			app.globalData.source == options.source?options.source:'h5'
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
						detailData.paraList.forEach(item=>{
							item.isUserPlay = false;
							item.isParaPlay = false;
						});
						this.detailData = detailData
						console.log('口语课分享详情：',detailData)
					}
				})
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


</style>
