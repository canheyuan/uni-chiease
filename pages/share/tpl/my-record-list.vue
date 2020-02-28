<template>
	<!--录音列表-->
	<view class="share_record" v-if="detailData">
		<view class="record_title"><i class="icons ico_zan"></i>{{langData.shareData.bestTitle[lan]}}</view>
		<view class="record_list">
			<view class="record_item" v-for="(item,index) in detailData.paraList">
				<view class="tit">{{item.content.zh}}</view>
				<view class="audio_list">
					<view class="li">
						<view class="play_box" @click="playAudio('user',index)">
							<image class="img" :src="detailData.headImg" alt="">
							<view class="mask"></view>
							<view :class="['icons','ico_play',{stop:item.isUserPlay}]"></view>
						</view>
						<view class="text">
							{{langData.shareData.recordText01[lan]}} - <text class="orange">{{item.score}}{{langData.shareData.scoreText[lan]}}</text>
						</view>
					</view>
					<view class="li">
						<view class="play_box" @click="playAudio('para',index)">
							<view :class="['icons','ico_play',{stop:item.isParaPlay}]"></view>
							<view class="progress"></view>
						</view>
						<view class="text">{{langData.shareData.recordText02[lan]}}</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	const app = getApp();
	const audioObj = uni.createInnerAudioContext();
	audioObj.autoplay = false;
	
	
	export default {
		data() {
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				dlUrl:app.globalData.dowmlaod,	//下载地址
				langData:app.globalData.langData,	//语言文件
				//lan:app.globalData.lan,	//当前语言
			}
		},
		props:{
			detailData:{ type: Object },
			lan:{type: String}
		},
		mounted() {
			audioObj.onEnded(()=>{
				console.log('监听播放完成')
				this.detailData.paraList.forEach(item=>{
					item.isUserPlay = false;
					item.isParaPlay = false;
				});
			})
		},
		methods: {
			//播放音频
			playAudio(type,index){
				var audioData = this.detailData.paraList[index];
				if(type == 'user'){
					if(!audioData.userAudio){return;};
					if(audioData.userAudio == audioObj.src ){
					   if(audioData.isUserPlay){
							audioObj.pause();  
						}else{
							audioObj.play();  
						}
						audioData.isUserPlay = !audioData.isUserPlay;
					}else{
						this.detailData.paraList.forEach(item=>{
							item.isUserPlay = false;
							item.isParaPlay = false;
						});
						
						audioObj.src = audioData.userAudio;
						audioData.isUserPlay = true;
						setTimeout(function(){
							audioObj.play();
						},300)
					}
				}else if(type == 'para'){
					if(!audioData.paraAudio){return;}
					if(audioData.paraAudio == audioObj.src ){
						if(audioData.isParaPlay){
							audioObj.pause();  
						}else{
							audioObj.play();  
						}
						audioData.isParaPlay = !audioData.isParaPlay;	
					}else{
						this.detailData.paraList.forEach(item=>{
							item.isUserPlay = false;
							item.isParaPlay = false;
						});
						audioObj.src = audioData.paraAudio;
						audioData.isParaPlay = true;
						setTimeout(function(){
							audioObj.play();
						},300)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
//录音列表
.share_record{
	padding:30upx 25upx; background:#fff; margin-bottom:30upx;
	.record_title{
		font-size:36upx; color:#242629; line-height:60upx;
		.ico_zan{
			width:60upx; height:60upx;float:left; margin-right:20upx; vertical-align: top;
			background-position:-60upx -100upx; 
		}
	}
	.record_list{
		padding-left:80upx;
		.record_item {
			border-bottom:2upx solid #e3e3e3; padding:30upx 0;
			.tit{
				font-size:34upx; line-height:48upx; color:#242629; margin-bottom:20upx;
				.blue{color:#1788d2;}
			}
			.audio_list .li{
				height:100upx; background:#ebebeb; border-radius:50upx; border:2upx solid #ffdf80; 
				padding:8upx; margin-bottom:30upx;
				.play_box{
					width:80upx; height:80upx; border-radius:100%; background:#35afff; position:relative; 
					float:left; margin-right:30upx;
					.img{width:100%; height:100%; border-radius: 100%;}
					.ico_play{
						width:50upx; height:50upx; position:absolute; left:50%; top:50%; 
						margin-left:-25upx; margin-top:-25upx;  background-position: -250upx 0;
					}
					.stop{background-position: -300upx 0; }
					.mask{
						background:rgba(0,0,0,.4); width:100%; height:100%; border-radius:100%; 
						position:absolute; left:0; top:0; 
					}
				}
				.text{
					line-height:80upx; font-size:34upx;
					.orange{color:#e98c00;}
				}
			}
			.audio_list .li:last-child{margin-bottom:0;}
		}
		.record_item:last-child{border-bottom:none;}
	}	
}
</style>
