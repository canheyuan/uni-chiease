<template>
	<view class="supplement_mdl">
		<view class="zs_tit02">
			<text class="zh">补充与替换</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Supplement & Substitution</text>
		</view>
		<view>
			<!-- 第1条 -->
			<view class="supplement_item clearfix">
				<view class="num">1</view>
				<view class="item">
					<view class="text1 tri">你</view>
					<view class="box">
						<view class="text2">你</view>
						<view class="text2">他</view>
						<view class="text2">她</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">好</view>
					<view class="box">
						<view class="text2">饿</view>
						<view class="text2">渴</view>
						<view class="text2">累</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">吗</view>
					<view class="box">
						<view class="text2">吗</view>
						<view class="text2">吗</view>
						<view class="text2">吗</view>
					</view>
				</view>
				<view class="item">
					<view class="text1">？</view>
				</view>
			</view>
			
			<!-- 第2条 -->
			<view class="supplement_item clearfix">
				<view class="num">2</view>
				<view class="item">
					<view class="text1 tri">我</view>
					<view class="box">
						<view class="text2">你</view>
						<view class="text2">他</view>
						<view class="text2">她</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">很</view>
					<view class="box">
						<view class="text2">很</view>
						<view class="text2">很</view>
						<view class="text2">很</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">好</view>
					<view class="box">
						<view class="text2">帅</view>
						<view class="text2">高</view>
						<view class="text2">漂亮</view>
					</view>
				</view>
				<view class="item">
					<view class="text1">？</view>
				</view>
			</view>
			
			<!-- 第3条 -->
			<view class="supplement_item clearfix">
				<view class="num">3</view>
				<view class="item">
					<view class="text1 tri">我</view>
					<view class="box">
						<view class="text2">我</view>
						<view class="text2">他</view>
						<view class="text2">她</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">不</view>
					<view class="box">
						<view class="text2">不</view>
						<view class="text2">不</view>
						<view class="text2">不</view>
					</view>
				</view>
				<view class="item">
					<view class="add">+</view>
				</view>
				<view class="item">
					<view class="text1 tri">忙</view>
					<view class="box">
						<view class="text2">饿</view>
						<view class="text2">渴</view>
						<view class="text2">累</view>
					</view>
				</view>
				<view class="item">
					<view class="text1">？</view>
				</view>
			</view>
		</view>
		
		<!-- Word Bank -->
		<view class="word_bank">
			<view class="wb_tit">
				<text class="txt">Word Bank</text>
			</view>
			<view class="wb_list">
				<view class="li">
					<view class="py_zh">
						<view class="py">è</view>
						<view class="zh">饿</view>
					</view>
					<view class="en">hungry</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">lèi</view>
						<view class="zh">累</view>
					</view>
					<view class="en">tired</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">tā</view>
						<view class="zh">他</view>
					</view>
					<view class="en">he, him</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">shuài</view>
						<view class="zh">帅</view>
					</view>
					<view class="en">handsome</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">kě</view>
						<view class="zh">渴</view>
					</view>
					<view class="en">thirsty</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">gāo</view>
						<view class="zh">高</view>
					</view>
					<view class="en">high</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">tā</view>
						<view class="zh">她</view>
					</view>
					<view class="en">she, her</view>
				</view>
				<view class="li">
					<view class="py_zh">
						<view class="py">piàoliang</view>
						<view class="zh">漂亮</view>
					</view>
					<view class="en">beautiful</view>
				</view>
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
	@import '@/static/css/textbook.scss';
	.supplement_mdl{
		padding:100upx 0 40upx 26upx;
		.zs_tit02{
			margin-bottom:10upx;
			.zh,.en{font-size:32upx;}
		}
		.zs_tit03{margin-left:-26upx;}
		.notes_item{
			padding-bottom:30upx;
			.zs_box{margin-left:42upx; margin-bottom:20upx;}
		}
		.supplement_item{ position:relative; clear:both; padding:40upx 0; margin-left:50upx; border-bottom:2upx solid #E3E3E3;
			.num{
				display:inline-block; width:54upx; height:48upx; font-size:28upx; line-height:48upx; position:absolute; left:-76upx; top:40upx;
				box-sizing:border-box; text-align: center; padding-right:18upx; vertical-align: top; margin-right:14upx;
				background:url(~@/static/images/num_bg.png) no-repeat center top; background-size:100% 100%;color:#fff;
			}
			.item{ text-align:center; float:left; 
				.text1{font-size:36upx; color:#242629; font-weight:bold; line-height:48upx; display:block; margin-bottom:30upx; position:relative;}
				.text1.tri:after{
					content:''; width:0; height:0; overflow:hidden; font-size:0; display:inline-block; border-style:solid; border-width:12upx 10upx 0 10upx; 
					border-color:#D8D8D8 transparent transparent transparent; position:absolute; bottom:-20upx; left:50%; margin-left:-10upx;
				}
				.add{font-size:44upx; color:#242629; font-weight:bold; line-height:48upx; margin:0 20upx;}
				.box{
					background:#F9F9F9; border-left:2upx dashed #DCDCDC;  border-right:2upx dashed #DCDCDC; padding:8upx; min-width:66upx; display:inline-block;
					.text2{font-size:32upx; color:#242629; display:block; line-height:72upx;}
				}
			}
		}
		.supplement_item:last-child{border-bottom:none;}
		
		.word_bank{
			padding:40upx 26upx 40upx 0;
			.wb_tit{
				 text-align:center; margin-bottom:30upx;
				.txt{font-size:40upx; color:#548DD4; line-height:48upx; font-weight:bold;}
				.txt:before,
				.txt:after{content:''; height:2upx; width:100upx; background:#ABC6E8; display:inline-block; vertical-align: middle; margin:0 25upx;}
			}
			.wb_list{
				display:flex; display:-webkit-flex; flex-flow:row wrap; justify-content: space-between; align-items:center;
				.li{
					display:inline-block; width:48%; height:104upx; background:#fffeff; 
					.py_zh{
						height:104upx; width:50%; background:#fcf9fc; flaot:left; text-align:center; box-sizing: border-box; padding:17upx 0; float:left;
						.py{font-size:30upx; line-height:30upx; color:#777777;}
						.zh{font-size:32upx; line-height:40upx; color:#242629;}
					}
					.en{ 
						width:50%; height:104upx; overflow: hidden; font-size:28upx; color:#777777; line-height:32upx;  word-break:break-all; text-align:center;
						display:flex;  align-items:center; padding:0 10upx; box-sizing: border-box; justify-content:center;
					}
				}
				.li:nth-child(4n+1),
				.li:nth-child(4n+2){
					background:#f5f8ff;
					.py_zh{
						background:#eff2fc;
						
					}
				}
			}
		}
	}
</style>