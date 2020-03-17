<template>
	<view class="gray_bg">
		<view v-if="detailData" class="punch_target">
			<view class="punch_time_mdl">
				<view class="punch_circle">
					<view 
						class="punch_circle_main" 
						:style="'background-color:'+targetTimes[targetTimeIndex].bgColor"
					>
						<view class="p">{{langData.punchTarget.targetTitle[lan]}}</view>
						<view class="h3">{{detailData.targetTimeMinute}}</view>
						<view class="p">{{langData.punchTarget.minuteText[lan]}}</view>
					</view>
					<image mode="widthFix" class="cloud01 cloud" :src="imgUrl+'/cloud_img01.png'" alt="">
					<image mode="widthFix" class="cloud02 cloud" :src="imgUrl+'/cloud_img01.png'" alt="">
					<image mode="widthFix" class="cloud03 cloud" :src="imgUrl+'/cloud_img02.png'" alt="">
				</view>
	
				<view class="punch_time_num">
					<view class="num_list">
						<view 
							class="li" 
							v-for="(item) in targetTimes" :key="item.min"
						>{{item.min}} min</view>
					</view>
					<view class="time_list">
						<view 
							class="li"
							v-for="(item, index) in targetTimes" :key="item.min"
							@click="changeTargetTimeFn(item.min,index,$event)"
							:class="{act : targetTimeIndex==index}"
						><view class="icons ico_gou"></view></view>
					</view>
				</view>
				<view class="tip_txt">
					<view class="p">{{langData.punchTarget.targetTip[lan]}}</view>
				</view>
			</view>
			<view class="punch_target_btn">
			<!--
				<view class="li"><view class="a">
					<view class="h4"><view class="icons ico_email"></view>邮箱提醒</view>
					<view class="span">通过绑定邮箱提醒您学习</view>
					<view class="icons ico_tri"></view>
				</view></view>
			-->
				<view class="li">
					<view class="h4">
						<view class="icons ico_day"></view>
						{{langData.punchTarget.remindText[lan]}}
					</view>
					<switch 
						class="on_off_btn" color="#09bb06"
						:checked="detailData.remind==1" 
						@change="tipChangeFn(detailData.remind)"
					></switch>
				</view>
			</view>
			<view class="gray_txt">{{langData.punchTarget.remindTip[lan]}}</view>
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
				"targetTimes":[
					{min:'5',bgColor:'#ffc10a'},
					{min:'10',bgColor:'#35afff'},
					{min:'15',bgColor:'#ff5555'},
					{min:'30',bgColor:'#39d9e4'},
					{min:'45',bgColor:'#f271ea'},
					{min:'60',bgColor:'#94d070'}
				],	//打卡目标时间
				targetTimeIndex:0,	//当前的打卡目标索引
				defaultTime:''
			}
		},
		onLoad(options) {
			//获取地址栏参数，并设置给globalData
			if(!app.globalData.isFirst){	//首次App.vue有加载就不需要再加载
				this.$common.pageLoadFn({
					test:options.test,
					lan :options.lan,
					source:options.source
				})
				this.getDetailFn();
			}else{
				app.globalData.isFirst = false
			}
			this.getDetailFn();
		},
		onReady(){
			//设置页面标题栏
			var lan = this.lan
			var param = {
				name: "punch-target",
				title: this.langData.punchTarget.title[lan],
				leftIcon: "back",		//or "close" ，缺省即back
				rightText: this.langData.punchTarget.headRightTxt[lan],	//不设此项则不显示右侧文字按钮
				rightTextColor: "#1788D2",
				rightTextIcon: "book",	//or "book"
				backgroundColor: "#ffffff"	//不设则默认白色
			}
			uni.setNavigationBarTitle({  title: this.langData.punchTarget.title[lan] });
			Shell.setPageTitle(JSON.stringify(param));
			//监听标题栏右侧按钮事件
			Shell.addListener({event:"EVENT_ACTION_PRESSED",callback:function(){
				//var nowTime = parseInt($('.time_list li.act').attr('data-min'));
				if(this.defaultTime == this.detailData.targetTimeMinute){
					uni.showToast({
					    title: this.langData.punchTarget.saveErrorTxt[lan],
						icon:'none',
					    duration: 3000
					});
				}else{
					this.punchTargetFn(this.detailData.targetTimeMinute);
				}
			}});
			
		},
		methods: {
			
			//获取详情信息
			getDetailFn(){
				var _this = this
				this.$http({
					url:`/api/userPunch/detail`,
					success:(res)=>{
						var detailData =  res.data;
						
						detailData.targetTimeMinute = parseInt(detailData.targetTime/60);
						this.$attrsdefaultTime = parseInt(detailData.targetTime/60);	//存储当前的打卡目标值
						this.targetTimes.forEach((item,i)=>{
							if(item.min==detailData.targetTimeMinute){ this.targetTimeIndex=i; }
						});
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
			
			//修改打卡目标
			punchTargetFn(min){
				this.$http({
					url:'/api/userPunch/updateTarget',
					method:'POST',
					data:{
						targetTime:min
					},
					success:(res)=>{
						this.defaultTime = min;
						uni.showToast({
						    title: this.langData.punchTarget.saveSuccessTxt[lan],
							icon:'none',
						    duration: 3000
						});
					}
				})
			}
		}
	}
</script>


<style lang="scss">
page{background:#f7f7f7;}
/* 打卡目标 */
.punch_target{background:#f7f7f7;}
.punch_time_mdl{padding:50upx 0; text-align: center;
background:-moz-linear-gradient(top,#c9f3fd,#c7e0fb);/*火狐*/
background: -webkit-linear-gradient(top, #c9f3fd, #c7e0fb);   /*Safari5.1 Chrome 10+*/
}
.punch_circle{width:410upx; height:410upx; background:url(~@/static/images/circle.png) no-repeat; background-size:100% 100%; margin:0 auto; color:#fff; position:relative; padding:40upx;}
.punch_circle_main{width:330upx; height:330upx; background:#39d9e4; padding-top:40upx; border-radius:100%; transition:all .3s; -webkit-transition:all .3s;}
.punch_circle .p{font-size:32upx; }
.punch_circle .h3{font-size:160upx; font-weight: bold; line-height:180upx;}
.punch_circle .cloud{position:absolute; width:135upx; }
.punch_circle .cloud01{left:-30upx; top:20upx; animation: cloud 15s linear 0s infinite normal; }
.punch_circle .cloud02{right:-60upx; top:180upx; animation: cloud 10s linear 2s infinite normal; }
.punch_circle .cloud03{left:-100upx; top:250upx; width:80upx; animation: cloud 12s linear 0s infinite normal; }
/*打卡时间*/
.punch_time_num{margin:60upx 30upx 0;}
.num_list{ display:box; display:-webkit-box; margin:0 6upx 4upx;}
.num_list .li{width:100%; box-flex:1;-webkit-box-flex:1; font-size:24upx; color:#333; }

.time_list{border:6upx solid #fff; height:44upx; border-radius:22upx; display:box; display:-webkit-box;}
.time_list .li{width:100%; height:32upx; box-flex:1;-webkit-box-flex:1;  transition:all .3s; -webkit-transition:all .3s; position:relative; z-index: 1;}
.time_list .li:nth-child(1){background:#ffc10a; border-top-left-radius: 16upx; border-bottom-left-radius: 16upx;}
.time_list .li:nth-child(2){background:#35afff;}
.time_list .li:nth-child(3){background:#ff5555;}
.time_list .li:nth-child(4){background:#39d9e4;}
.time_list .li:nth-child(5){background:#f271ea;}
.time_list .li:nth-child(6){background:#94d070; border-top-right-radius: 16upx; border-bottom-right-radius: 16upx;}
.time_list .li .ico_gou{width:40upx; height:30upx; background-position:-30upx -60upx; transform: scale(.6,.6); vertical-align: top; opacity: 0; transition:all .3s; -webkit-transition:all .3s;}
.time_list .li.act{transform:scale(1.1,1.375); -webkit-transform:scale(1.1,1.375);  z-index: 9;}
.time_list .li.act:nth-child(1){box-shadow:6upx 0 24upx rgba(255,193,10,.5);}
.time_list .li.act:nth-child(2){box-shadow:6upx 0 24upx rgba(53,175,255,.5);}
.time_list .li.act:nth-child(3){box-shadow:6upx 0 24upx rgba(255,85,85,.5);}
.time_list .li.act:nth-child(4){box-shadow:6upx 0 24upx rgba(6,193,206,.5);}
.time_list .li.act:nth-child(5){box-shadow:6upx 0 24upx rgba(242,113,234,.5);}
.time_list .li.act:nth-child(6){box-shadow:6upx 0 24upx rgba(148,208,112,.5);}
.time_list .li.act .ico_gou{opacity: 1;}

.punch_time_mdl .tip_txt{font-size:26upx; color:#777777; line-height:36upx; margin:30upx 30upx 0; padding-top:20upx; border-top:2upx solid #bebebe;}
.punch_target_btn .li{height:100upx; line-height:100upx; background:#fff; margin-top:30upx; position:relative;}
.punch_target_btn .li .btn{display:block; height:100%;}
.punch_target_btn .li .h4{padding-left: 30upx; font-size:32upx; color:#242629;}
.punch_target_btn .li .h4 .icons{width:50upx; height:50upx; vertical-align: middle; position:relative; top:-2upx; margin-right:15upx;}
.punch_target_btn .li .h4 .ico_email{background-position: -150upx 0;}
.punch_target_btn .li .h4 .ico_day{background-position: -200upx 0;}
.punch_target_btn .li .span{position:absolute; right:65upx; display:inline-block; top:0; line-height:100upx; font-size:24upx; color:#999; text-align: right;}
.punch_target_btn .li .ico_tri{width:20upx; height:30upx; position:absolute; right:30upx; top:35upx;background-position: -70upx -60upx;}
.punch_target_btn .li .on_off_btn{position:absolute; right:30upx; top:-4upx;}
.gray_txt{color:#bebebe; font-size:26upx; text-align: center; margin:20upx 0;}

@keyframes cloud {
	0% {transform:translate(0,0);}
	25% {transform:translate(20px,10px);}
	50% {transform:translate(10px,15px);}
	75% {transform:translate(-10px,10px);}
	100% {transform:translate(0,0);}
}
</style>
