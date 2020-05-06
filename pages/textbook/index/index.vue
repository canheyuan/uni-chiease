<template>
	<view class="tb_page" id="tb_page">
		<!-- 播放动效 -->
		<view class="play_box" @click="playAudioFn" v-show="pageList[pageIndex].audio">
			<view v-show="!isAudioPlay">
				<image class="ico_voice" mode="widthFix" :src="`${imgUrl}/textbook/ico_voice.png`"></image>
				<view class="unplay">READ</view>
			</view>
			<view v-show="isAudioPlay">
				<image class="ico_voice" mode="widthFix" :src="`${imgUrl}/textbook/ico_voice_act.png`"></image>
				<view class="playing">
					<view class="playing__bar playing__bar1"></view>
					<view class="playing__bar playing__bar2"></view>
					<view class="playing__bar playing__bar3"></view>
					<view class="playing__bar playing__bar4"></view>
					<view class="playing__bar playing__bar5"></view>
				</view>
			</view>
		</view>
		
		<!-- 上一页、下一页按钮 -->
		<view class="fixed_btn">
			<view 
				:class="['btn','prev_btn',{disabled:pageIndex==0}]" 
				@click="(pageIndex==0 || isPageLoading)?'':prevPageFn()"
			>
				<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/ico_arrow01.png`"></image>
				<text class="text">上一页</text>
			</view>
			<view 
				:class="['btn','next_btn',{disabled:pageIndex==pageList.length-1}]" 
				@click="(pageIndex==pageList.length-1 || isPageLoading)?'':nextPageFn()"
			>
				<text class="text">下一页</text>
				<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/ico_arrow02.png`"></image>
			</view>
		</view>
		
		
		<!-- 下拉上一页 -->
		<!-- <view class="pull_tip down" @click="prevPageFn" v-show="pageIndex>0">
			<text class="text">下拉到上一页</text>
			<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/arrow_btm.png`"></image>
		</view> -->
		<!-- 上拉下一页 -->
		<!-- <view class="pull_tip"  @click="nextPageFn"  v-show="pageIndex<pageList.length">
			<text class="text">上拉到下一页</text>
			<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/arrow_btm.png`"></image>
		</view> -->
		
		<!-- 显示内容 -->
		<view class="tb_page_ctn">
			<unit-index v-if="pageList[0].show" v-show="pageList[pageIndex].name=='unitIndex'"></unit-index>
			<word-explain v-if="pageList[1].show" v-show="pageList[pageIndex].name=='wordExplain'"></word-explain>
			<conversations v-if="pageList[2].show" v-show="pageList[pageIndex].name=='conversations'"></conversations>
			<notes v-if="pageList[3].show" v-show="pageList[pageIndex].name=='notes'"></notes>
			<supplement v-if="pageList[4].show" v-show="pageList[pageIndex].name=='supplement'"></supplement>
			<situation v-if="pageList[5].show" v-show="pageList[pageIndex].name=='situation'"></situation>
			<review v-if="pageList[6].show" v-show="pageList[pageIndex].name=='review'"></review>
		</view>
		
		
	</view>
</template>

<script>
	
	const app = getApp();
	
	//创建音频实例
	const tbAudio = uni.createInnerAudioContext();
	tbAudio.autoplay = false;
	
	import unitIndex from "./tpl-unit-index.vue"
	import wordExplain from "./tpl-word-explain.vue"
	import conversations from "./tpl-conversations.vue"
	import notes from "./tpl-notes.vue"
	import supplement from "./tpl-supplement.vue"
	import situation from "./tpl-situation.vue"
	import review from "./tpl-review.vue"
	export default {
		components:{
			'unit-index'	: unitIndex,	//单元首页
			'word-explain'	: wordExplain,	//单元首页
			'conversations'	: conversations,	//会话
			'notes'			: notes,	//注释
			'supplement'	: supplement,	//补充与替换
			'situation'		: situation	,	//活动任务
			'review'		: review	,	//回顾与评论
		},
		data(){
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				pageList:[	//页面列表
					{name:'unitIndex',audio:'unit1-page1.mp3',show:true},
					{name:'wordExplain',audio:'unit1-page2.mp3',show:false},
					{name:'conversations',audio:'unit1-page3.mp3',show:false},
					{name:'notes',audio:'',show:false},
					{name:'supplement',audio:'unit1-page5.mp3',show:false},
					{name:'situation',audio:'',show:false},
					{name:'review',audio:'',show:false}
				],	
				pageIndex:0,	//当前页面索引
				isPageLoading:false,	//当前是否在加载中
				isAudioPlay:false,	//当前音频是否在播放
				audioAction: {
					method: 'play'	//pause/play
				},
				audioUrl:'https://test.5ideachinese.com/profile/uni-chiease/static/mp3/',	//音频前缀
			}
		},
		onLoad(options) {
			
		},
		
		
		onReady(){
			var _this = this
			if(_this.pageList[_this.pageIndex].audio){
				tbAudio.src = _this.audioUrl + _this.pageList[_this.pageIndex].audio
			}
			
			//监听播放状态
			tbAudio.onPlay(()=>{ this.isAudioPlay = true })
			//监听暂停状态
			tbAudio.onPause(()=>{ this.isAudioPlay = false })
			//监听播放结束状态
			tbAudio.onEnded(()=>{ this.isAudioPlay = false })
		},
		
		//监听滚动
		// onPageScroll(e) {
		// 	console.log('eeee',e)
		// 	this.getPageHeightFn()
		// },
		
		methods: {
			//获取文档高度
			getPageHeightFn(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#tb_page').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				}).exec();
			},
			
			//播放音频
			playAudioFn(){
				if(!this.isAudioPlay){
					tbAudio.play()
				}else{
					tbAudio.pause()
				}
			},
			
			//上一页
			prevPageFn(){
				var _this = this;
				if(_this.pageIndex > 0){
					_this.isAudioPlay = false
					_this.isPageLoading = true
					uni.showLoading({ title: '加载上一页' });
					setTimeout(function() {
						_this.pageIndex = _this.pageIndex - 1
						if(!_this.pageList[_this.pageIndex].show){
							_this.pageList[_this.pageIndex].show = true
						}
						if(_this.pageList[_this.pageIndex].audio){
							tbAudio.src = _this.audioUrl + _this.pageList[_this.pageIndex].audio
						}
						//tbAudio.play()	//播放音频
						uni.hideLoading();
						_this.isPageLoading = false
					},300)
				}	
			},
			
			//下一页
			nextPageFn(){
				var _this = this;
				if(_this.pageIndex < _this.pageList.length){
					_this.isAudioPlay = false
					_this.isPageLoading = true
					uni.showLoading({ title: '加载下一页' });
					setTimeout(function() {
						_this.pageIndex = _this.pageIndex + 1
						if(!_this.pageList[_this.pageIndex].show){
							_this.pageList[_this.pageIndex].show = true
						}
						if(_this.pageList[_this.pageIndex].audio){
							tbAudio.src = _this.audioUrl + _this.pageList[_this.pageIndex].audio
						}
						
						//tbAudio.play()	//播放音频
						uni.hideLoading();
						_this.isPageLoading = false
					},300)
				}	
			}
		},
	}
</script>


<style lang="scss">
	.tb_page{width:100%;}
	.tb_page_ctn{ overflow:auto; position:relative; transform:translateY(0upx);}
	
	//上一页、下一页按钮
	.fixed_btn{
		position:fixed; right:0; top:50%; z-index:100; width:88upx; margin-top:-240upx;
		.btn{
			display:inline-block; width:88upx; height:230upx; padding:50upx 20upx 0 40upx; 
			background-repeat:no-repeat; background-size:100% 100%;
			.ico{dislay:inline-block; width:28upx; height:28upx; position:relative;}
			.text{display:inline-block;width:28upx; line-height:28upx; font-size:26upx; color:#1788D2;}
		}
		.prev_btn{background-image:url(~@/static/images/textbook/prev_bg.png); }
		.next_btn{background-image:url(~@/static/images/textbook/next_bg.png); margin-top:-20upx; padding-top:54upx;}
		.disabled{
			.ico{-webkit-filter: grayscale(1); opacity:.5;}
			.text{color:#ccc;}
		}
	}
	
	.pull_tip{
		font-size:26upx; color:#1788D2; height:92upx; line-height:52upx; text-align:center; padding:20upx 0; width:100%;
		// position:absolute; left:0;  bottom:-80upx; 
		.text{display:inline-block;}
		.ico{display:inline-block; width:52upx; height:52upx; vertical-align: top; margin-left:20upx;}
	}
	.pull_tip.down{top:-80upx; 
		.ico{transform: rotate(180deg);}
	}
	
	.play_box{
		position:fixed; right:0; top:40upx; z-index:99; display:inline-block; 
		padding:8upx 0 8upx 10upx; width:184upx; height:80upx; box-sizing: border-box; 
		background:url(~@/static/images/textbook/play_box.png) no-repeat center top; background-size:100% 100%;
		.ico_voice{width:64upx; height:64upx; float:left;}
		.unplay{display:block; overflow:hidden; text-align:center; color:#fff; line-height:64upx; font-weight: bold;}
		.playing{overflow:hidden;}
	}
	.playing { 
		height: 64upx; display: flex;justify-content: space-between; align-items: flex-end; 
		padding: 10upx 15upx; box-sizing: border-box; 
	}
	.playing__bar { 
		display: inline-block; background: white; width: 10upx; height: 100%;
		-webkit-animation: up-and-down 1.3s ease infinite alternate;
				animation: up-and-down 1.3s ease infinite alternate;
	}
	.playing__bar1 { height: 50%; }
	.playing__bar2 { height: 20%; -webkit-animation-delay: -2.4s; animation-delay: -2.4s;}
	.playing__bar3 { height: 85%; -webkit-animation-delay: -5s; animation-delay: -5s;}
	.playing__bar4 { height: 70%; -webkit-animation-delay: -3.7s; animation-delay: -3.7s;}
	.playing__bar3 { height: 35%; -webkit-animation-delay: -6s; animation-delay: -6s;}

	
	@-webkit-keyframes up-and-down {
	  10% { height: 30%; }
	  30% {  height: 100%; }
	  60% { height: 50%; }
	  80% { height: 75%; }
	  100% { height: 20%; }
	}
	
	@keyframes up-and-down {
	  10% {  height: 30%; }
	  30% { height: 100%; }
	  60% { height: 50%; }
	  80% {  height: 75%; }
	  100% { height: 20%; }
	}
</style>


