<template>
	<view>
		<!-- 顶部下载提示 -->
		<download-top></download-top>
		
		<!--配音课头部-->
		<view class="dub_head" v-if="detailData">
			<view class="dub_video" @click="changVideoStatusFn">
				<video
					muted="true" :controls='false' :show-center-play-btn='false' :show-play-btn="false"
					class="video" id="myVideo" :src="detailData.video" v-if="detailData.video" 
					@ended="videoEndFn" @play="videoPlayFn"
				></video>
				<!-- <audio id="myAduio" v-if="detailData.userAudio" style="display:none;" :src="detailData.userAudio" ></audio> -->
				<block v-if="!isVideoPlay">
					<view class="title">{{detailData.chapterName.zh}}</view>
					<image class="play_btn" :src="imgUrl + '/ico_play.png'" alt="">
				</block>
			</view>
			<view>
			  	<view class="score_top">
					<view class="txt">
						{{langData.shareDub.score_text01[lan]}}<br>
						{{langData.shareDub.score_text02[lan]}}
						<text class="span">{{detailData.accuracyScore}}%</text>
						{{langData.shareDub.score_text03[lan]}}
					</view>
					<view class="score_num">{{detailData.score}}</view>
					<view class="btn" :href="isIOS?dowmlaodUrl.downloadAppleUrl:'#download_mdl'">
						{{langData.shareData.challengeBtn[lan]}}
					</view>
				</view>
				<view class="score_box">
					<view class="score_list clearfix" :style="`width:${scoreWidth}px`">
						<view class="yellow li" id="score01">
							<text class="span">{{detailData.rhythmScore}}</text>
							<view class="p">{{langData.shareData.pronounce[lan]}}</view>
						</view>
						<view class="green li" id="score02">
							<text class="span">{{detailData.fluencyScore}}</text>
							<view class="p">{{langData.shareData.fluency[lan]}}</view>
						</view>
						<view class="blue li" id="score03">
							<text class="span">{{detailData.integrityScore}}</text>
							<view class="p">{{langData.shareData.intact[lan]}}</view>
						</view>
						<view class="red li" id="score04">
							<text class="span">{{detailData.accuracyScore}}</text>
							<view class="p">{{langData.shareData.accuracy[lan]}}</view>
						</view>
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
	const app = getApp()
	//创建视频用户音频
	var videoAudio =  uni.createInnerAudioContext()
	videoAudio.autoplay = false;
	
	import downloadTop from "../tpl/download-top.vue"
	import downloadBottom from "../tpl/download-bottom.vue"
	import recordList from "../tpl/my-record-list.vue"
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
				dowmlaodUrl:app.globalData.dowmlaod,	//下载地址
				detailData:null,	//分享接口详情信息
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				shareId:'6e016f3f111c352a85ecd069e360534a',	//分享id
				scoreWidth:0,	//分数宽度
				isVideoPlay:false,	//视频是否播放中
			}
		},
		onLoad(options) {
			app.globalData.source == options.source?options.source:'h5'
			//this.shareId = options.shareid?options.shareid:''
			this.getShareDetailFn(this.shareId);
		},
		onShow(options){
			//console.log('dub-onShow-options:',options)
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			//获取分享详情信息
			getShareDetailFn(shareId){
				this.$http({
					url:`/api/shareInfo/dubChaShareInfo/${shareId}`,
					success:(res)=>{
						var detailData =  res.data;
						detailData.paraList.forEach(item=>{
							item.isUserPlay = false;
							item.isParaPlay = false;
						});
						this.detailData = detailData
						videoAudio.src = detailData.userAudio
						setTimeout(()=>{
							this.getElWidth()
						},100)
						console.log('配音课分享详情：',res.data)
					}
				})
			},
			
			//获取元素宽度
			getElWidth(){
				var sumWidth = 0;
				for(var i=1;i<5;i++){
					var query = uni.createSelectorQuery().in(this);
					query.select('#score0' + i).boundingClientRect((data) => {
						sumWidth = sumWidth + data.width + 12
						if(i==4){
							sumWidth += 12
							this.scoreWidth = sumWidth
						}
					}).exec();
				}
			},
			
			//视频播放/暂停
			changeVideoStatusFn(){
				if(!this.isVideoPlay){
					this.videoContext.play()
					videoAudio.play()
				}else{
					this.videoContext.pause()
					videoAudio.pause()
				}
				this.isVideoPlay = !this.isVideoPlay
			},
			
			//监听视频播放时
			videoPlayFn(){
				this.isVideoPlay = true
				videoAudio.play()
			},
			
			//视频播放结束
			videoEndFn(){
				this.isVideoPlay = false
				videoAudio.stop()
			}
		}
	}
</script>

<style lang="scss">
.dub_head{
	.title{
		font-size:36upx; color:#fff; text-align: center; padding:5upx 50upx;
		width:100%; line-height:60upx; position:absolute; top:50upx; left:0;
	}
	.dub_video{
		height:420upx; background:#000; position:relative;
		.video{width:100%; height:100%;}
		.play_btn{
			width:144upx; height:144upx; position:absolute; left:50%; top:50%; margin-left:-72upx; margin-top:-20upx;
		}
	}
}

.score_top{
	height:220upx; background:url(~@/static/images/share_bg02.jpg) no-repeat; background-size:100% 100%; 
	text-align: center; padding-top:20upx;
	.txt{
		text-align: right; display:inline-block; color:#fff; font-size:28upx; line-height:40upx; 
		vertical-align: middle;
		.span{color:#bcc3ca; font-size:36upx;}
	}
	.score_num{
		font-size:120upx; color:#ffc10a; font-weight:bold; display:inline-block; vertical-align: middle; 
		margin:0 20upx;
	}
	.btn{
		display:inline-block; width:160upx; height:64upx; line-height:58upx; text-align: center; 
		border:2upx solid #fff; border-radius:32upx; color:#fff; font-size:28upx; vertical-align: middle;
	}
}

.score_box{
	width:100%; overflow: auto;margin:-50upx 0 30upx; -webkit-overflow-scrolling: touch; 
	padding-bottom:40upx; margin-bottom:-10upx;
	.score_list{
		.li{
			float:left; display:inline-block; min-width:170upx; height:180upx; border-radius:10upx; 
			border-bottom:8upx solid #ffb441; background:#fff; text-align: center; margin-left:25upx;
			box-shadow:6upx 0 20upx rgba(255,180,65,.32);
			.span{display:block; font-size:88upx; color:#ffb441; font-weight: bold; padding:0 15upx;}
			.p{
				font-size:26upx; color:#999999; position:relative; padding:15upx 15upx 0;
			}
			.p:before{
				content:''; display:inline-block; width:44upx; height:2upx; background:#e3e3e3; 
				position:absolute; top:0; left:50%; margin-left:-22upx;
			}
		}
		.li.green{
			border-bottom-color:#63d554; box-shadow:6upx 0 20upx rgba(99,213,84,.32);
			.span{color:#63d554}
		}
		.li.blue{
			border-bottom-color:#4ca6fe; box-shadow:6upx 0 20upx rgba(76,166,254,.32);
			.span{color:#4ca6fe}
		}
		.li.red{
			border-bottom-color:#ff6666; box-shadow:6upx 0 20upx rgba(255,102,102,.32);
			.span{color:#ff6666}
		}
	}	
}
</style>




