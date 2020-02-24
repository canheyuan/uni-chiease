<template>
	<view class="review_mdl">
		<view class="zs_tit02">
			<text class="zh">回顾与评价</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Review & Self-assessment</text>
		</view>
		
		<view class="review_ctn">
			<view class="review_tit">
				<view class="zh">请你在认识的生词和句子前打<view class="cir"></view></view>
				<view class="en">Please tick <view class="cir"></view> in front of the words and sentences you know</view>
			</view>
			<view class="review_list part4">
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">您</text></view>
					<view class="li"><view class="cir"></view><text class="text">好</text></view>
					<view class="li"><view class="cir"></view><text class="text">早上</text></view>
					<view class="li"><view class="cir"></view><text class="text">上午</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">中午</text></view>
					<view class="li"><view class="cir"></view><text class="text">下午</text></view>
					<view class="li"><view class="cir"></view><text class="text">晚上</text></view>
					<view class="li"><view class="cir"></view><text class="text">好久</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">久</text></view>
					<view class="li"><view class="cir"></view><text class="text">不</text></view>
					<view class="li"><view class="cir"></view><text class="text">见</text></view>
					<view class="li"><view class="cir"></view><text class="text">你</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">吗</text></view>
					<view class="li"><view class="cir"></view><text class="text">我</text></view>
					<view class="li"><view class="cir"></view><text class="text">很</text></view>
					<view class="li"><view class="cir"></view><text class="text">工作</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">忙</text></view>
				</view>
			</view>
			<view class="review_list part2">
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">您好！</text></view>
					<view class="li"><view class="cir"></view><text class="text">早上好！</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">好久不见！</text></view>
					<view class="li"><view class="cir"></view><text class="text">你好吗？</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">我很好。</text></view>
					<view class="li"><view class="cir"></view><text class="text">工作忙吗？</text></view>
				</view>
				<view class="box">
					<view class="li"><view class="cir"></view><text class="text">不忙。</text></view>
				</view>
			</view>

			<view class="assessment_box">
				<view class="rows">
					<view class="item item1 blue_bg"></view>
					<view class="item item2 blue_bg">
						<view class="zh">生词</view>
						<view class="en">Words</view>
					</view>
					<view class="item item3 blue_bg">
						<view class="zh">句子</view>
						<view class="en">Sentences</view>
					</view>
				</view>
				<view class="rows">
					<view class="item item1 blue_bg">
						<view class="zh">目标个数</view>
						<view class="en">Number of targets</view>
					</view>
					<view class="item item2">17</view>
					<view class="item item3">7</view>
				</view>
				<view class="rows">
					<view class="item item1 blue_bg">
						<view class="zh">掌握个数</view>
						<view class="en">Number of masters</view>
					</view>
					<view class="item item2"></view>
					<view class="item item3"></view>
				</view>
				<view class="rows">
					<view class="item item1 blue_bg">
						<view class="zh">自我评价(A/B/C)</view>
						<view class="en">Self-evaluation</view>
					</view>
					<view class="item item2"></view>
					<view class="item item3"></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<style lang="scss">
	@import '@/static/css/textbook.scss';
	.review_mdl{
		padding:100upx 26upx;
		.zs_tit02{
			margin-bottom:50upx;
			.zh,.en{font-size:32upx;}
		}
		.review_ctn{
			.review_tit{margin-bottom:40upx;
				.zh{font-size:32upx; color:#242629; line-height:36upx; font-weight: bold; margin-bottom:14upx;}
				.en{font-size:30upx; color:#777777; line-height:36upx;}
				.cir{
					display:inline-block; width:36upx; height:36upx; box-sizing: border-box; border:2upx solid #69A1E6; 
					border-radius:100%; margin:0 16upx; vertical-align: top; 
					background:url(~@/static/images/ico_gou.png) #69A1E6 no-repeat center center; background-size:20upx 20upx;
				}
			}
			.review_list{
				border-top:6upx solid #69A1E6; margin-bottom:50upx;
				.box{overflow:hidden;
					.li{
						width:100%; box-sizing: border-box; padding:22upx 16upx; float:left; height:80upx;
						.cir{ 
							display:inline-block; width:36upx; height:36upx; box-sizing: border-box; border:2upx solid #A7BBD4; 
							border-radius:100%; margin-right:16upx; vertical-align: top;
						}
						.text{display:inline-block; font-size:32upx; color:#242629; line-height:36upx; vertical-align:top;}
					}
					.li.act .cir{background:url(~@/static/images/ico_gou.png) #69A1E6 no-repeat center center; background-size:20upx 20upx; border-width:#69A1E6;}
				}
				.box:nth-child(2n+1){background:#F3F8FF;}
			}
			.review_list.part2 .li{width:50%; }
			.review_list.part3 .li{width:33.33%;}
			.review_list.part4 .li{width:25%; }
			
			.assessment_box{
				border-top:6upx solid #69A1E6;  border-right:2upx solid #E1EAF7;
				.rows{overflow:hidden;
					.blue_bg{background:#F3F8FF;}
					.item{
						box-sizing: border-box; border-left:2upx solid #E1EAF7; border-bottom:2upx solid #E1EAF7;
						display:flex; flex-wrap:wrap; align-items:center; justify-content:center; align-content:center;
						font-size:34upx; line-height:44upx; font-weight:bold; float:left; height:108upx; text-align:center; 
						.zh{width:100%; font-size:30upx; line-height:44upx;}
						.en{font-size:28upx; line-height:34upx; color:#777777; font-weight:normal; width:100%;}
					}
					.item1{width:46%;}
					.item2{width:27%;}
					.item3{width:27%;}
				}
				
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
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		},
	}
</script>

