<template>
	<view class="tb_page">
		<!-- 播放动效 -->
		<view class="play_box">
			<view v-show="false">
				<image class="ico_voice" mode="widthFix" :src="`${imgUrl}/textbook/ico_voice.png`"></image>
				<view class="unplay">READ</view>
			</view>
			<view v-show="true">
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
		
		<!-- 下拉上一页 -->
		<view class="pull_tip up">
			<text class="text">下拉到上一页</text>
			<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/arrow_btm.png`"></image>
		</view>
		
		<!-- 上拉下一页 -->
		<view class="pull_tip">
			<text class="text">上拉到下一页</text>
			<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/arrow_btm.png`"></image>
		</view>
		
		<unit-index v-if="false"></unit-index>
		<word-explain ></word-explain>
		<conversations v-if="false"></conversations>
		<notes v-if="false"></notes>
		<supplement v-if="false"></supplement>
		<situation v-if="false"></situation>
		<review v-if="false"></review>
		
		
	</view>
</template>

<script>
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
			'situation'		: situation	,//活动任务
			'review'		: review	,//活动任务
		},
		data(){
			return {
				imgUrl:this.$common.imgUrl	//图片前缀地址
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		},
	}
</script>


<style lang="scss">
	.tb_page{height:100%; overflow:auto;}
	.play_box{
		position:fixed; right:0; top:40upx; z-index:99; display:inline-block; padding:8upx 0 8upx 10upx; width:184upx; height:80upx; box-sizing: border-box; 
		background:url(/static/images/textbook/play_box.png) no-repeat center top; background-size:100% 100%;
		.ico_voice{width:64upx; height:64upx; float:left;}
		.unplay{display:block; overflow:hidden; text-align:center; color:#fff; line-height:64upx; font-weight: bold;}
		.playing{overflow:hidden;}
	}
	.pull_tip{
		font-size:26upx; color:#1788D2; height:52upx; line-height:52upx; text-align:center; position:absolute; left:0; width:100%; bottom:-80upx; padding:20upx 0;
		.text{display:inline-block;}
		.ico{display:inline-block; width:52upx; height:52upx; vertical-align: top; margin-left:20upx;}
	}
	.pull_tip.up{top:-80upx;}
	
	.playing { height: 64upx; display: flex;justify-content: space-between; align-items: flex-end; padding: 10upx 15upx; box-sizing: border-box; }
	.playing__bar { display: inline-block; background: white; width: 10upx; height: 100%;
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


