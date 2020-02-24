<template>
	<!-- 单元首页 -->
	<view class="tb_index_page">
		<!-- 单元头部 -->
		<view class="tb_head">
			<view class="h3">第<text class="num">1</text>单元</view>
			<view class="p">Unit 1</view>
		</view>
		
		<!-- 标题 -->
		<view class="tb_title">
			<view class="py">wèn hòu yǔ chēng hu</view>
			<view class="zh">问候与称呼</view>
			<view class="en">GREETING & ADDRESS</view>
		</view>
		
		<!-- 内容 -->
		<view class="tb_ctn">
			<image class="ctn_img" mode="widthFix" :src="`${imgUrl}/temp/unit1_img01.png`"></image>
		</view>
		
		<!-- 向下箭头提示 -->
		<!-- <view class="arrow_btm">
			<image class="ico" mode="widthFix" :src="`${imgUrl}/textbook/arrow_btm2.png`"></image>
		</view> -->
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
	.tb_head{
		width:100%; height:252upx; text-align:center; box-sizing: border-box; padding-top:30upx;
		background:url(~@/static/images/textbook/head_bg.png) no-repeat center top; background-size:100% 100%; 
		.h3{
			font-size:40upx; line-height:56upx; color:#242629; font-weight:bold; position:relative; padding-bottom:15upx; margin-bottom:15upx;
			.num{font-size:56upx; line-height:56upx; color:#1F68C8; display:inline-block; margin:0 10upx; vertical-align: bottom;}
			:after{content:''; display:inline-block; width:60upx; height:4upx; background:#AED3FF; position:absolute; bottom:0;left:50%; margin-left:-30upx;}
		}
		.p{font-size: 32upx; line-height:44upx; color:#242629;}
	}
	.tb_title{
		text-align: center; margin-bottom:80upx;
		.py{font-size:30upx; line-height:42upx; color:#777777;}
		.zh{font-size:60upx; line-height:84upx; color:#4E84C8; font-weight:bold;}
		.en{font-size:28upx; line-height:40upx; color:#88A7CE;}
	}
	.tb_ctn{margin:0 32upx; 
		.ctn_img{width:100%;}
	}
	.arrow_btm{
		width:78upx; height:78upx; text-align:center; border:1upx solid #E3E3E3; border-radius:10upx; background:#fff; position:absolute; bottom:100upx; left:50%; margin-left:-39upx; box-sizing: border-box; padding:15upx 0;
		.ico{width:36upx; height:48upx;}
	}
</style>
