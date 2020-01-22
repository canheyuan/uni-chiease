<template>
	<view class="conversations_page">
		<view class="zs_tit02">
			<text class="zh">会话</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Conversations</text>
		</view>
		
		
		<view class="conversations_ctn">
			<!-- 会话1 -->
			<view class="conversations_item">
				<image class="img" mode="widthFix" :src="imgUrl+'/temp/img01.png'"></image>
				<view class="text_box">
					<view class="tit">Conversation <text class="num">1</text></view>
					<view class="from content">
						<view class="name">A：</view>
						<view class="info">
							<text class="py">nín hǎo!</text>
							<text class="zh">您 好！</text>
						</view>
					</view>
					<view class="to content">
						<view class="name">B：</view>
						<view class="info">
							<text class="py">nín hǎo!</text>
							<text class="zh">您 好！</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 会话2 -->
			<view class="conversations_item">
				<image class="img" mode="widthFix" :src="imgUrl+'/temp/img02.png'"></image> 
				<view class="text_box">
					<view class="tit">Conversation <text class="num">2</text></view>
					<view class="from content">
						<view class="name">A：</view>
						<view class="info">
							<text class="py" space="nbsp" decode>zǎoshang（shàngwǔ / zhōngwǔ / xiàwǔ 
							/ wǎnshang） hǎo!</text>
							<text class="zh" space="nbsp" decode>  早上     （  上午   /    中午    / 下午 
							/   晚上    ） 好 ！</text>
						</view>
					</view>
					<view class="to content">
						<view class="name">B：</view>
						<view class="info">
							<text class="py" space="nbsp" decode>nín hǎo!</text>
							<text class="zh" space="nbsp" decode>您 好！</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 会话3 -->
			<view class="conversations_item">
				<image class="img" mode="widthFix" :src="imgUrl+'/temp/img03.png'"></image> 
				<view class="text_box">
					<view class="tit">Conversation <text class="num">3</text></view>
					<view class="from content">
						<view class="name">A：</view>
						<view class="info">
							<text class="py" space="nbsp" decode>hǎojiǔ bú jiàn!  nǐ  hǎo ma ?</text>
							<text class="zh" space="nbsp" decode>好久   不 见！你 好  吗 ？</text>
						</view>
					</view>
					<view class="to content">
						<view class="name">B：</view>
						<view class="info">
							<text class="py" space="nbsp" decode>wǒ  hěn hǎo.</text>
							<text class="zh" space="nbsp" decode>我   很  好。</text>
						</view>
					</view>
					<view class="from content">
						<view class="name">A：</view>
						<view class="info">
							<text class="py" space="nbsp" decode>gōngzuò máng  ma?</text>
							<text class="zh" space="nbsp" decode>  工作        忙    吗?</text>
						</view>
					</view>
					<view class="to content">
						<view class="name">B：</view>
						<view class="info">
							<text class="py">bùmáng.</text>
							<text class="zh">不 忙。</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<style lang="scss">
	@import '@/static/css/textbook.scss';
	.conversations_page{padding:40upx 24upx;}
	.conversations_ctn{
		padding-top:40upx;
		.conversations_item{ margin-bottom:50upx;
			.img{width:100%;}
			.text_box{
				border:2upx solid #90BAEF; border-radius:16upx; position:relative; margin-top:50upx; padding:40upx 20upx 10upx;
				.tit{ 
					position:absolute; top:-22upx; left:20upx;  display:inline-block; padding-left:10upx; font-weight:bold;
					height:44upx; line-height:44upx; color:#548DD4; font-size:40upx; background:#fff;
					.num{
						width:44upx; height:44upx; display:inline-block; background:#69A1E6; border-radius:100%; font-weight:normal;
						font-size:28upx; color:#fff; line-height:44upx; text-align:center; margin-left:20upx; vertical-align: top; 
					}
				}
				.content{
					.name{float:left; margin-top:32upx; font-size:36upx; line-height:48upx; color:#1788D2; font-weight:bold;}
					.info{
						overflow: hidden; position:relative; padding-top:10upx;
						.py{display:block; font-size:30upx; line-height:100upx; color:#777777; position:absolute; top:-35upx; left:0;}
						.zh{display:block; font-size:36upx; line-height:100upx; color:#242629; font-weight:bold;}
					}
				}
				.content.to .name{color:#E98C00;}
			}
		}
	}
</style>

<script>
	export default {
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