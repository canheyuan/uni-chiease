<template>
	<view>
		<view class="zs_tit01">
			<view class="num">1</view>
			<view class="info">
				<ruby class="py_zh">
					<rb>问</rb><rt>wèn</rt>
					<rb>候</rb><rt>hòu</rt>
				</ruby>
				<!-- <view class="py">wèn hòu</view>
				<view class="zh">问候</view> -->
				<view class="en">GREETING</view>
			</view>
		</view>
		<view class="zs_mdl">
			<view class="zs_tit02">
				<text class="zh">学习目标</text>
				<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
				<text class="en">Objectives</text>
			</view>
			<view class="zs_box">
				<image class="bg" :src="imgUrl+'/textbook/q_ico.png'"></image>
				<view class="zh">能在常见情景中使用合适的问候语</view>
				<view class="en">Be able to use appropriate expressions to greet people in daily life</view>
			</view>

			<view class="zs_tbl">
				<view class="zs_tit02">
					<text class="zh">词语</text>
					<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
					<text class="en">New Words & Expressions</text>
				</view>
				<block v-for="(item,index) in wordList">
					<view class="td">
						<view class="item1">{{index+1}}</view>
						<view class="item2"><view class="py">{{item.py}}</view><view class="zh">{{item.zh}}</view></view>
						<view class="item3">{{item.type}}</view>
						<view class="item4">{{item.en}}</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	// .zs_tit01{
	// 	padding-top:30upx; margin-bottom:70upx;
	// 	.num{display:inline-block; width:96upx; height:128upx; background:url(/static/images/textbook/tit_bg01.png) no-repeat center top; background-size:100% 100%; font-size:52upx; color:#fff; line-height:74upx; padding:27upx 15upx 27upx 0; box-sizing:border-box; text-align: center; float:left; margin-right:30upx; margin-top:10upx;}
	// 	.info{overflow:hidden; display:inline-block; text-align:center;
	// 		.py{font-size:30upx; color:#777777; line-height:36upx;}
	// 		.zh{font-size:52upx; color:#4E84C8; line-height:74upx; font-weight: bold;}
	// 		.en{font-size:24upx; color:#88A7CE; line-height:40upx; font-weight:bold;}
	// 	}
	// } 
	// .zs_tit02{
	// 	overflow: hidden;
	// 	.zh,.en{ float:left; height:72upx; line-height:72upx; font-size:36upx;  color:#fff;}
	// 	.zh{ background:#B0B0B0; padding-left:30upx;}
	// 	.en{background:#69A1E6; padding-right:30upx;}
	// 	.bg{float:left; width:62upx; height:72upx;}
	// }
	@import 'textbook.scss';
	.zs_mdl{padding:0 24upx 80upx;
		.zs_tbl{
			.zs_tit02 .en{float:none; overflow:hidden; display:block;}
			.td{
				overflow: hidden; padding:10upx 0; display:flex; flex-flow:row nowrap; align-items:center;
				.item1,.item2,.item3,.item4{float:left; box-sizing:border-box; text-align:center;}
				.item1{width:10%; color:#999999; font-size:28upx;}
				.item2{width:30%;
					.py{color:#777;font-size:30upx; }
					.zh{color:#242629; font-size:32upx; font-weight:bold;}
				}
				.item3{width:20%; color:#777; font-size:28upx;text-align:left; padding-left:15upx;}
				.item4{width:40%; color:#777; font-size:32upx; text-align:left;}
			}
			.td:nth-child(2n){background:#F3F8FF;}
		}
	}
</style>
 
<script>
	const app = getApp();
	export default {
		data(){
			return {
				imgUrl:app.globalData.imgUrl,	//图片前缀地址
				wordList:[
					{zh:'您',py:'nín',type:'代',en:'polite form of you (singular) '},
					{zh:'好',py:'hǎo',type:'形',en:'good, well, fine'},
					{zh:'早上',py:'zǎoshang',type:'名',en:'early morning'},
					{zh:'上午',py:'shàngwǔ',type:'名',en:'morning, before noon'},
					{zh:'中午',py:'zhōngwǔ',type:'名',en:'noon'},
					{zh:'下午',py:'xiàwǔ',type:'名',en:'afternoon'},
					{zh:'晚上',py:'wǎnshang',type:'名',en:'evening, night'},
					{zh:'好久',py:'hǎojiǔ',type:'形',en:'(of time) quite long '},
					{zh:'久',py:'jiǔ',type:'形',en:'for a long time, long'},
					{zh:'不',py:'bù',type:'副',en:'no, not'},
					{zh:'见',py:'jiàn',type:'动',en:'to see, to meet'},
					{zh:'好久不见',py:'hǎojiǔ bú jiàn',type:'',en:"haven't seen you for a long time"},
					{zh:'你',py:'nǐ',type:'代',en:'you (singular)'},
					{zh:'吗',py:'ma',type:'助',en:'(a particle used at the end of a question)'},
					{zh:'我',py:'wǒ',type:'代',en:'I, me'},
					{zh:'很',py:'hěn',type:'副',en:'very, quite'},
					{zh:'工作',py:'gōngzuò',type:'动、名',en:'to work; job'},
					{zh:'忙',py:'máng',type:'形',en:'busy'},
				]
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		},
	}
</script>
