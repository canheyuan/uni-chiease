<template>
	<view class="punch_tip_page" v-if="detailData">
		<view class="punch_tip_box animated bounceInDown">
			<view class="punch_tip_main">
				<view class="title">{{langData.punchTip.punchText[lan]}}</view>
				
				<view class="learn_time">
					{{langData.punchTip.learnText[lan]}}
					<view class="span" id="studiedTime">{{detailData.studiedTimeMinute}}</view>
					{{langData.punchTip.minuteText[lan]}}
				</view>
				
				<view class="txt">
					{{langData.punchTip.continuousPunch[lan]}}
					<view class="span" id="lastPunchDay">0</view>
					{{langData.punchTip.dayText[lan]}}
				</view>
				
				<navigator class="yellow_btn" url="../index/index">
					{{langData.punchTip.btnText[lan]}}
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()

	export default {
		components:{
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				detailData:null,	//分享接口详情信息
			}
		},
		onLoad(options) {
			//获取地址通用参数
			this.$common.pageLoadFn(options,()=>{
				this.getDetailFn();
			})
		},
		onReady(){
			//设置页面标题栏
			var lan = this.lan
			var param = {
				name: "punch-tip",
				title: this.langData.punchTip.title[lan],	
				leftIcon: "back",		//or "close" ，缺省即back
				backgroundColor: "#00ffffff"	//不设则默认白色
			}
			Shell.setPageTitle(JSON.stringify(param));
			uni.setNavigationBarTitle({  title: this.langData.punchTip.title[lan] });
		},
		methods: {
			//获取详情信息
			getDetailFn(){
				var _this = this
				this.$http({
					url:`/api/userPunch/detail`,
					success:(res)=>{
						var detailData =  res.data;
						detailData.studiedTimeMinute =parseInt(detailData.studiedTime/60)
						this.detailData = detailData;
						console.log('打卡信息详情：',detailData)				
					},
					successOther:(res)=>{
						if(res.code!=0){
							console.log('数据加载失败：',res)		
						}
					}
				})
			},
			
			//改变打卡目标详情
			changeTargetTimeFn(changeTime,index,ev){
				console.log('切换',changeTime,index,ev);	
				this.detailData.targetTimeMinute = changeTime;
				this.targetTimeIndex = index;
			},
			
			//改变每日提醒状态
			tipChangeFn(remind){
				var statusCode = (remind==0)?1:0;
				this.$http({
					isLoading:false,
					url:`/api/userPunch/updateRemind`,
					method:'POST',
					data:{
						remind : statusCode	//状态0：关闭，1：开启
					},
					success:(res)=>{
						
					}
				})
			},
		}
	}
</script>


<style lang="scss">
page{width:100%; height:100%;}
/*--------- 提醒打卡页面 -----------*/
.punch_tip_page{background:url(~@/static/images/punch_bg02.jpg) #69bd7d no-repeat center top; background-size:100% auto; width:100%; height:100%; position:relative;}
.punch_tip_box{position:absolute; top:330upx; width:650upx; left:50upx; background:rgba(255,255,255,.5); border-radius:30upx; padding:25upx;}
.punch_tip_main{background:#fff; border-radius:16upx; height:540upx; padding-top:30upx; text-align: center;}
.punch_tip_main .title{background:url(~@/static/images/punch_tit_bg.png) no-repeat center top; background-size:100% 100%; display:inline-block; width:580upx; height:100upx; line-height:80upx; font-size:36upx; color:#fff; margin-bottom:20upx; }
.punch_tip_main .learn_time{font-size:32upx; color:#f66060; font-weight: 500; margin-bottom:50upx;}
.punch_tip_main .learn_time .span{display:inline-block; font-size:120upx; font-weight: bold; margin:0 10upx;}
.punch_tip_main .txt{font-size:28upx; color:#e98c00; margin-bottom:15upx;}
.punch_tip_main .txt .span{display:inline-block; margin:0 10upx;}
.punch_tip_main .yellow_btn{margin:0 80upx;}
</style>
