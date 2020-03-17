<template>
	<view>
		<view v-if="detailData" :class="['punch_page',{un_punch:detailData.unPunch}]">
			<view class="punch_head">
				<view class="tip" v-show="detailData.tipIsShow">{{langData.punchCard.notReachTip[lan]}}</view>
				<image class="img" :src="imgUrl+'/dk_top.png'" alt="">
	
				<view class="txt">{{langData.punchCard.headText[lan]}}<span> {{detailData.lastPunchDay}} </span>{{langData.punchCard.dayText[lan]}}</view>
				<view 
					class="btn" id="punchBtn" 
					@click="punchCardFn(detailData)"
				>{{detailData.punchBtnTxt}}</view>
				
				<navigator class="xxjh_btn" url="../target/index">{{langData.punchCard.btnLearnPlan[lan]}}
					<view class="icons ico_tri"></view>
				</navigator>

			</view>
	
			<view class="punch_data">
				<view class="li li_date clearfix">
					<view class="em"><view class="icons"></view></view>
					<view class="num">{{detailData.maxPunchDay?detailData.maxPunchDay:0}}</view>
					<view class="p">{{langData.punchCard.punchMaxDay[lan]}}</view>
				</view>
				<view class="li li_score clearfix" >
					<view class="em"><view class="icons"></view></view>
					<view class="num">{{detailData.highestScore?detailData.highestScore:0}}</view>
					<view class="p">{{langData.punchCard.emigrateStroe[lan]}}</view class="p">
				</view>
				<view class="li li_time clearfix">
					<view class="em"><view class="icons"></view></view>
					<view class="num">{{detailData.studiedMinute?detailData.studiedMinute:0}}</view>
					<view class="p">{{langData.punchCard.learnTime[lan]}}</view>
				</view>
			</view>
		<!--
			<div class="share_btn_box">
				<a href="javascript:;"><i class="icons ico_share"></i><span>分享</span></a>
			</div>
		-->
		</view>
		
		<!--打卡成功弹窗-->
		<uni-popup ref="punchCardPop" type="center">
			<view class="punch_pop">
				<image mode="widthFix" class="img" :src="imgUrl+'/dkcg_img.png'" alt="">
				<view @click="closePopupFn" class="icons ico_close close_btn"></view>
				<view class="h3">{{langData.punchCard.punchSuccessTxt[lan]}}</view>
				<view class="p">{{langData.punchCard.popText01[lan]}}<text class="span">0</text> {{langData.punchCard.dayText[lan]}}</view>
				<view class="yellow_btn close_btn" @click="closePopupFn">{{langData.punchCard.popBtn[lan]}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp()
	import {uniPopup} from '@dcloudio/uni-ui'	//导入uni-ui
	export default {
		components: {uniPopup},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				detailData:null,	//分享接口详情信息
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				punchCardPop:false,	//打卡弹窗是否显示
			}
		},
		onLoad(options) {
			//获取地址栏参数，并设置给globalData
			console.log('punch-index-onLoad')
			if(!app.globalData.isFirst){	//首次App.vue有加载就不需要再加载
				this.$common.pageLoadFn({
					test:options.test,
					lan :options.lan,
					source:options.source
				},()=>{
					this.getDetailFn();
				})
				
			}else{
				app.globalData.isFirst = false
				this.getDetailFn();
			}
			
		},
		onReady(){
			//设置页面标题栏
			var lan = this.lan
			var param = {
				name: "punch-card",
				title: this.langData.punchCard.title[lan],
				leftIcon: "back",		//or "close" ，缺省即back
				rightText: this.langData.punchCard.headRightTxt[lan],		//不设此项则不显示右侧文字按钮
				rightTextColor: "#777777",
				rightTextIcon: "question",	//or "book"
				backgroundColor: "#ffffff"	//不设则默认白色
			}
			uni.setNavigationBarTitle({  title: this.langData.punchCard.title[lan] });
			console.log('Shell',Shell)
			Shell.setPageTitle(JSON.stringify(param));	
		},
		methods: {
			
			//打卡操作
			punchCardFn(detailData){
				if(detailData.status == 0 && detailData.studiedTime > detailData.targetTime){
					this.$http({
						url:`/api/userPunch/punchCard`,
						method:'POST',
						success:(res)=>{
							this.openPopupFn()
						}
					})
				}
			},
			
			//打开弹窗
			openPopupFn(){
				this.$refs.punchCardPop.open()
			},
			
			closePopupFn(){
				this.$refs.punchCardPop.close()
			},
			
			//获取详情信息
			getDetailFn(){
				var _this = this
				this.$http({
					url:`/api/userPunch/detail`,
					success:(res)=>{
						var detailData =  res.data;
						detailData.studiedMinute = parseInt(detailData.studiedTime/60);
						
						var langPunchCard = _this.langData.punchCard
						var lan = app.globalData.lan
						if(detailData.status == 1){
							detailData['punchBtnTxt'] = langPunchCard.btnFinished[lan];
						}else{
							if(detailData.studiedTime < detailData.targetTime){
								detailData.unPunch = true	//设置还未打卡字段
								detailData['punchBtnTxt'] = langPunchCard.btnNoReach[lan];
								detailData.tipIsShow = true;
							}else{
								detailData['punchBtnTxt'] = langPunchCard.btnReach[lan];
							}
						};
						_this.detailData = detailData
						if(detailData.tipIsShow){
						   setTimeout(()=>{
							   _this.detailData.tipIsShow = false;
						   },5000);
						}
						console.log('打卡页详情：',detailData)				
					},
					successOther:(res)=>{
						if(res.code!=0){
							console.log('数据加载失败：',res)		
						}
					}
				})
			},
			
			
		
		}
	}
</script>

<style lang="scss">
/*-------- 每日打卡 ---------*/
.punch_head{position:relative;width:100%;}
.punch_head .img{width:100%;}
.punch_head .tip{line-height:36upx; background:#ffa800; font-size:28upx; color:#fff; padding:15upx 20upx; position:absolute; left:0; top:0; z-index:9; width:100%; display:none;}
.punch_head .txt{position:absolute; left:0; top:60upx; font-size:56upx; color:#fff; width:100%; text-align: center; line-height:80upx; letter-spacing:6upx;text-shadow:4upx 4upx 4upx #3e79ff; }
.punch_head .txt span{color:#ffc10a; font-size:72upx; line-height:80upx;letter-spacing:0; vertical-align: top; margin-right:10upx;}
.punch_head .btn{width:80%;height:100upx; line-height:100upx; text-align: center; display:block; margin:-60upx auto 20upx; background:#fff; border-radius:50upx; font-size:34upx; color:#1788d2;box-shadow: 8upx 0 60upx rgba(23,136,210,.26); position:relative; z-index:9;}
.punch_head .xxjh_btn{font-size:30upx; color:#777777; display:block; margin:0 auto; text-align: center; line-height:30upx; padding:20upx 0;}
.punch_head .xxjh_btn .ico_tri{width:30upx; height:30upx; background-position: 0 -60upx; margin-left:10upx; vertical-align: top;}

.punch_data{
	padding:30upx 0;
	.li{
		height:120upx; padding:15upx 30upx;
		.em{
			display:inline-block; width:90upx; height:90upx; background:#ffc10a; border-radius:100%; 
			padding:20upx; float:left; margin-right:20upx; 
			.icons{width:50upx; height:50upx;}
		}
		.num{float:right; font-size:72upx; font-family: Arail; font-weight: bold; color:#ffc10a; line-height:90upx;}
		.p{line-height:90upx; font-size:34upx; color:#242629;}
	}
	.li_date{
		.em{
			box-shadow: 6upx 0 24upx rgba(247,157,0,.5); background:#ffc10a;
			.icons{background-position: 0 0;}
		}
		.num{color:#ffc10a;}
	}
	.li_score{
		.em{
			box-shadow: 6upx 0 24upx rgba(110,219,27,.5); background:#6edb1b;
			.icons{background-position: -50upx 0;}
		}
		.num{color:#6edb1b;}
	}
	.li_time{
		.em{
			box-shadow: 6upx 0 24upx rgba(75,183,245,.5); background:#4bb7f5;
			.icons{background-position: -100upx 0;}
		}
		.num{color:#4bb7f5;}
	}
}
.share_btn_box{text-align: center; margin-top:40upx;}
.share_btn_box a{display:inline-block; width:140upx; height:140upx; background:#ffc10a; color:#fff; border-radius:100%; padding:20upx 0; box-shadow: 8upx 0 28upx rgba(233,140,0,.55); transition:all .3s; }
.share_btn_box a .ico_share{width:60upx; height:60upx; background-position: 0 -100upx; margin-bottom:.100upx; }
.share_btn_box a span{display:block; font-size:26upx;}
.share_btn_box a:active{transform:scale(.9,.9);}
/*未能打卡*/
.un_punch .punch_head .img{-webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); filter: grayscale(100%);}
.un_punch .punch_head .tip{display:block;}
.un_punch .punch_head .btn{color:#bebebe;}
.un_punch .share_btn_box a{background:#e3e3e3; box-shadow: none;}
.un_punch .share_btn_box a:active{transform:scale(1,1);}
/*打卡成功弹窗*/
.punch_pop{position:relative; width:750upx; text-align: center; margin-bottom:200upx;}
.punch_pop .img{width:100%;}
.punch_pop .h3{color:#000; font-size:44upx; position:absolute; left:0; top:540upx; width:100%; font-weight: bold;}
.punch_pop .p{color:#777777; font-size:32upx; position:absolute; left:0; top:620upx; width:100%;}
.punch_pop .p .span{color:#e98c00;}
.punch_pop .yellow_btn{position:absolute; top:700upx; left:50%; margin-left:-220upx; width:440upx;}
.punch_pop .ico_close{width:70upx; height:70upx; background-position: 0 -170upx; position:absolute; top:70upx;right:70upx;}
</style>
