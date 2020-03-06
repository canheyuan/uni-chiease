<template>
	<view class="notes_mdl">
		<view class="zs_tit02">
			<text class="zh">注释</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Notes</text>
		</view>
		
		<view class="notes_item">
			<view class="zs_tit03">
				<view class="num">1</view>
				<text class="text">你 & 您</text>
			</view>
			<view class="zs_box">
				<image class="bg" :src="imgUrl+'/textbook/q_ico.png'"></image>
				<view class="zh">能在常见情景中使用合适的问候语</view>
				<view class="en">Be able to use appropriate expressions to greet people in daily life</view>
			</view>
		</view>
		
		<view class="notes_item">
			<view class="zs_tit03">
				<view class="num">2</view>
				<text class="text">我很好。</text>
			</view>
			<view class="zs_box">
				<image class="bg" :src="imgUrl+'/textbook/q_ico.png'"></image>
				<view class="zh">“主语+形容词”描述人或事物的性质或状态，形容词前常常加上程度副词，如“很”“非常”等。</view>
				<view class="en">“Subject + Adjective” describes the nature or state of a person or thing. Adjectives are often preceded
	by adverbs of degree, such as“很” “非常”,etc.</view>
			</view>
			
			<view class="zs_box">
				<image class="bg" :src="imgUrl+'/textbook/q_ico.png'"></image>
				<view class="zh">否定形式为“主语+不+形容词”。</view>
				<view class="en">The negative form is “Subject + 不 + Adjective”.</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data(){
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		},
	}
</script>

<style lang="scss">
	@import 'textbook.scss';
	.notes_mdl{
		padding:40upx 26upx;
		.zs_tit02{margin-bottom:50upx;}
		.zs_tit03{margin-left:-26upx;}
		.notes_item{
			padding-bottom:30upx;
			.zs_box{margin-left:42upx; margin-bottom:20upx;}
		}
		
	}
</style>
