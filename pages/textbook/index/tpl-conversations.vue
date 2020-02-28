<template>
	<view class="conversations_page">
		<view class="zs_tit02">
			<text class="zh">会话</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Conversations</text>
		</view>
		
		
		<view class="conversations_ctn">
			<!-- 会话 -->
			<view class="conversations_item" v-for="converItem in converList">
				<image class="img" mode="widthFix" :src="imgUrl+converItem.img"></image>
				<view class="text_box">
					<view class="tit">Conversation <text class="num">{{converItem.num}}</text></view>
					<view 
						v-for="item in converItem.content" 
						:class="['content',{from:item.name=='A'},{to:item.name=='B'}]"
					>
						<view class="name">{{item.name}}：</view>
						<view class="info">
							<ruby class="ruby" v-html="item.html"></ruby>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 会话2 -->
			<view class="conversations_item" v-if="false">
				<image class="img" mode="widthFix" :src="imgUrl+'/temp/img02.png'"></image> 
				<view class="text_box">
					<view class="tit">Conversation <text class="num">2</text></view>
					<view class="from content">
						<view class="name">A：</view>
						<view class="info">
							<ruby class="ruby"><rb>早上</rb><rt>zǎoshang</rt><rb>（</rb><rt>（</rt><rb>上午</rb><rt>shàngwǔ</rt><rb>/</rb><rt>/</rt><rb>中午</rb><rt>zhōngwǔ</rt><rb>/</rb><rt>/</rt><rb>下午</rb><rt>xiàwǔ</rt><rb>/</rb><rt>/</rt><rb>晚上</rb><rt>wǎnshang</rt><rb>）</rb><rt>）</rt><rb>好</rb><rt>hǎo</rt><rb>！</rb><rt>!</rt></ruby>
							<!-- <text class="py" space="nbsp" decode>zǎoshang（shàngwǔ / zhōngwǔ / xiàwǔ 
							/ wǎnshang） hǎo!</text>
							<text class="zh" space="nbsp" decode>  早上     （  上午   /    中午    / 下午 
							/   晚上    ） 好 ！</text> -->
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
			<view class="conversations_item" v-if="false">
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

<style lang="scss" scoped>
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
					margin-bottom:20upx;
					.name{float:left; margin-top:40upx; font-size:36upx; line-height:48upx; color:#1788D2; font-weight:bold;}
					.info{
						overflow: hidden; position:relative; padding-top:10upx;

						.ruby {
							 /deep/ rb{display:block; font-size:36upx; line-height:48upx; color:#242629; font-weight:bold; text-align:center;}
							 /deep/ rt{display:block; font-size:30upx; line-height:40upx; color:#777777; text-align:center;}
						}
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
	const app = getApp();
	export default {
		data(){
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				converList:[
					{
						num:1,
						img:'/temp/img01.png',
						content:[
							{
								name:'A',
								html:`<rb class='aa'>您</rb><rt>nín</rt><rb>好</rb><rt>hǎo</rt><rb>！</rb><rt>!</rt>`
							},
							{
								name:'B',
								html:`<rb>您</rb><rt>nín</rt><rb>好</rb><rt>hǎo</rt><rb>！</rb><rt>!</rt>`
							}
						]
					},
					{
						num:2,
						img:'/temp/img02.png',
						content:[
							{
								name:'A',
								html:`<rb>早上</rb><rt>zǎoshang</rt><rb>（</rb><rt>（</rt><rb>上午</rb><rt>shàngwǔ</rt><rb>/</rb><rt>/</rt><rb>中午</rb><rt>zhōngwǔ</rt><rb>/</rb><rt>/</rt><rb>下午</rb><rt>xiàwǔ</rt><rb>/</rb><rt>/</rt><rb>晚上</rb><rt>wǎnshang</rt><rb>）</rb><rt>）</rt><rb>好</rb><rt>hǎo</rt><rb>！</rb><rt>!</rt>`
							},
							{
								name:'B',
								html:`<rb>您</rb><rt>nín</rt><rb>好</rb><rt>hǎo</rt><rb>！</rb><rt>!</rt>`
							}
						]
					},
					{
						num:3,
						img:'/temp/img03.png',
						content:[
							{
								name:'A',
								html:`<rb>好久</rb><rt>hǎojiǔ</rt><rb></rb><rt>bú</rt><rb></rb><rt>jiàn!</rt><rb>不</rb><rt></rt><rb>见！你</rb><rt>nǐ</rt><rb>好</rb><rt></rt><rb></rb><rt>hǎo</rt><rb>吗</rb><rt>ma</rt><rb>？</rb><rt>?</rt>`
							},
							{
								name:'B',
								html:`<rb>wǒ</rb><rt>我</rt><rb>hěn</rb><rt>很</rt><rb>hǎo</rb><rt>好</rt><rb>.</rb><rt>。</rt>`
							},
							{
								name:'A',
								html:`<rb>gōngzuò</rb><rt>工作</rt><rb>máng</rb><rt>忙</rt><rb>ma</rb><rt>吗</rt><rb>?</rb><rt>?</rt>`
							},
							{
								name:'B',
								html:`<rb>bù</rb><rt>不</rt><rb>máng</rb><rt>忙</rt><rb>.</rb><rt>。</rt>`
							}
						]
					},
					
				]
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		},
	}
</script>