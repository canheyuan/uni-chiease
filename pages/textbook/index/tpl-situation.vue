<template>
	<view class="situation_mdl">
		
		<view class="zs_tit02">
			<text class="zh">活动任务</text>
			<image class="bg" :src="imgUrl+'/textbook/tit_bg.png'"></image>
			<text class="en">Situation Exercises</text>
		</view>
		
		<!-- 一、看图连词 -->
		<view class="ktlc_mdl">
			<view class="zs_tit04">
				<view class="num">一</view>
				<view class="info">
					<view class="zh">看图连词</view>
					<view class="en">Match the words with the corresponding pictures</view>
				</view>
			</view>
		
			<view class="ktlc_ctn">
				<view class="img_list">
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlc_img01.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlc_img02.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlc_img03.png'"></image>
				</view>
				<view class="text_list">
					<view class="text">早上</view>
					<view class="text">中午</view>
					<view class="text">工作</view>
					<view class="text">忙</view>
					<view class="text">晚上</view>
				</view>
				<view class="img_list">
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlc_img04.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlc_img05.png'"></image>
				</view>
			</view>
		</view>
		
		<!-- 二、看图连句 -->
		<view class="ktlj_mdl">
			<view class="zs_tit04">
				<view class="num">二</view>
				<view class="info">
					<view class="zh">看图连句</view>
					<view class="en">Match the sentences with the corresponding pictures</view>
				</view>
			</view>
			
			<view class="ktlj_ctn">
				<view class="img_list">
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlj_img01.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlj_img02.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlj_img03.png'"></image>
					<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktlj_img04.png'"></image>
				</view>
				<view class="text_list">
					<view class="li"><view class="text"><text class="num">1</text>您好！</view></view>
					<view class="li"><view class="text"><text class="num">2</text>上午好！</view></view>
					<view class="li"><view class="text"><text class="num">3</text>下午好！</view></view>
					<view class="li"><view class="text"><text class="num">4</text>晚上好！</view></view>
				</view>
			</view>
		</view>
		
		<!-- 三、看图编对话 -->
		<view class="ktbjh_mdl">
			<view class="zs_tit04">
				<view class="num">三</view>
				<view class="info">
					<view class="zh">看图编对话</view>
					<view class="en">Make a dialogue according to the pictures</view>
				</view>
			</view>
			<view class="ktbjh_ctn">
				<view class="img_list">
					<view class="li">
						<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktbdh_img01.png'"></image>
						<view class="num">1</view>
					</view>
					<view class="li">
						<image mode="widthFix" class="img" :src="imgUrl+'/temp/ktbdh_img02.png'"></image>
						<view class="num">2</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 四、职场实战 -->
		<view class="zcsz_mdl">
			<view class="zs_tit04">
				<view class="num">四</view>
				<view class="info">
					<view class="zh">职场实战</view>
					<view class="en">Workplace Practice</view>
				</view>
			</view>
			<view class="zcsz_ctn">
				<view class="zcsz_tit">
					<view class="zh">请根据以下场景设计对话</view>
					<view class="en">Please make a conversation according to the scene below</view>
				</view>
				<image mode="widthFix" class="img" :src="imgUrl+'/temp/zcsz_img01.png'"></image>
				
				<view class="duihua_list">
					<view class="li">
						<view class="label">场景</view>
						<view class="text">在公司门口遇到同事，请你用汉语跟他打招呼。</view>
					</view>
					<view class="li">
						<view class="label">Scene</view>
						<view class="text">You meet with a colleague in front of the company, and say hello to him in Chinese.</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<style lang="scss">
	@import '@/static/css/textbook.scss';
	
	.situation_mdl{
		padding:100upx 26upx 50upx;
		.zs_tit02{margin-bottom:50upx;}
		// 看图连词
		.ktlc_mdl{padding-bottom:80upx;
			.ktlc_ctn{
				.img_list{
					text-align:center; font-size:0; line-height:0;
					.img{width:210upx; height:210upx; display:inline-block; margin-right:30upx; border:2upx solid #E3E3E3;}
					.img:last-child{margin-right:0;}
				}
				.text_list{
					text-align:center; padding:40upx 0 10upx;
					.text{display:inline-block; width:210upx; height:72upx; line-height:72upx; margin-right:30upx; background:#EEF3FB; text-align:center; font-size:32upx; color:#242629; margin-bottom:30upx;}
					.text:nth-child(3n+3){margin-right:0;}
				}
			}
		}
		// 看图连句
		.ktlj_mdl{padding-bottom:40upx;
			.ktlj_ctn{
				overflow:hidden;
				.img_list{width:338upx; float:left; line-height:0;
					.img{width:334upx; height:214upx; border:2upx solid #E3E3E3; margin-bottom:20upx;}
				}
				.text_list{overflow:hidden;
					.li{width:100%; height:214upx; display:flex; align-items:center; padding-left:80upx; margin-bottom:20upx;
						.text{
							width:232upx; height:56upx; background:#E9F3FF; border-radius:28upx; box-sizing: border-box; 
							border:2upx solid #C3D6EE; padding:2upx 4upx; 
							.num{
								display:inline-block; width:44upx; height:44upx; line-height:44upx; background:#A7BBD4; 
								border-radius:100%; text-align:center; font-size:28upx; color:#fff; margin-right:16upx;
							}
						}
					}
				}
			}
		}
		// 看图编对话
		.ktbjh_mdl{padding-bottom:60upx;
			.ktbjh_ctn{
				.img_list{
					display:flex; justify-content:space-between;
					.li{
						width:48%; border:2upx solid #E3E3E3; position:relative; font-weight:0; line-height:0;
						.img{width:100%;}
						.num{
							display:inline-block; position:absolute; left:8upx; top:8upx;width:44upx; height:44upx; color:#fff;
							line-height:44upx; background:#A7BBD4; border-radius:100%; text-align:center; font-size:28upx; 
						}
					}
				}
			}
		}
	
		//职场实战
		.zcsz_mdl{
			.zcsz_ctn{
				.zcsz_tit{margin-bottom:20upx;
					.zh{font-size:32upx; line-height:44upx; color:#242629;}
					.en{font-size:26upx; line-height:32upx; color:#777777;}
				}
				.img{width:100%; border:2upx solid #E3E3E3; margin-bottom:20upx;}
				.duihua_list{
					.li{ margin-bottom:20upx;
						.label{
							display:inline-block; height:44upx; line-height:44upx; min-width:110upx; font-size:28upx; color:#fff;
							background:#A7BBD4; border-radius:6upx; text-align:center; margin-bottom:6upx;
						}
						.text{
							font-size: 32upx; color:#242629; line-height:48upx;
						}
					}
				}
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



