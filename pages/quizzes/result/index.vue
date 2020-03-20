<template>
	<view v-if="resultData">
		<!--测试报告头部-->
		<view class="report_head" >
			<view class="report_top" style="height:540upx;">
				<view class="title" style="padding:40upx 60upx 20upx;">{{langData.subjectResult.title[lan]}}</view>
				<view class="report_progress">
				
					<view class="progress" id="indicatorContainer"></view>
					<view class="progress_data">
						<view class="p">Your level</view>
						<view class="h3 blur" style="margin-bottom:.3upx;">Lv.{{resultData.level}}</view>
						<view class="span">{{resultData.today}}</view>
					</view>
					
				</view>
			</view>
			
			<view class="report_data" v-if="resultData.reportList">
				<view class="report_title" style="margin-bottom:.1upx;">
					<view class="icons ico_report"></view>
					{{langData.subjectResult.reportTitleText[lan]}}
				</view>
				<view class="report_des">{{resultData.title[lan]}}</view>
				<view class="report_list">
					<view class="li act" v-for="(item,index) in resultData.reportList"  v-if="index<5">
						<view class="cir"><view class="icons"></view></view>
						<view class="p">{{item[lan]}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="download_btm">
			<view class="white_mask"></view>
			<view class="download_btm_main">
				<view class="icons ico_arrow"></view>
				<view class="txt">{{langData.subjectResult.reportDes2[lan]}}</view>
				<view class="plan_btn" @click="downlaodPopFn">{{langData.subjectResult.downloadBtn[lan]}}</view>	
			</view>
		</view>
		
		<!--下载弹窗-->
		<view class="mask_bg" v-show="downloadPopShow">
			<view class="mask_bg_ctn" style="vertical-align: bottom;">
				<div class="download_pop_btn">
					<h3 class="tit">{{langData.subjectResult.popTitle[lan]}}</h3>
					<a @click="gotoDownload(dlUrl.app)"  v-if="system=='pc'">
						<i class="icons ico_01"></i>App Store
					</a>
					<a @click="gotoDownload(dlUrl.GP)">
						<i class="icons ico_02"></i>Google Play
					</a>
					<a @click="gotoDownload(dlUrl.myapp)">
						<i class="icons ico_03"></i>MyApp.com
					</a>
				</div>
				<div class="download_pop_close" @click="downloadFn">{{langData.subjectResult.closeBtnText[lan]}}</div>
			</view>	
		</view>
		
		
	</view>
</template>


<script>
	const app = getApp()
	var reportData  = require('../../../static/js/data/report.js').default
	export default {
		components:{
		},
		data() {
			return {
				imgUrl:app.globalData.imgUrl,
				langData:app.globalData.langData,	//语言文件
				lan:app.globalData.lan,	//当前语言
				dlUrl:app.globalData.dowmlaod,	//下载地址
				isIOS:this.$common.system()=='ios',	//是否IOS系统
				system:this.$common.system(),	//当前手机系统
				resultData:null,		//测试题结果页数据
				downloadPopShow:false,	//测试题结果页下载弹窗
				level:2,	//测试结果等级
				tjData:{},		//统计字段
			}
		},
		onLoad(options) {
			this.lan = 'zh'
			this.level = options.level?options.level:2
			//获取地址栏参数，并设置给globalData
			if(!app.globalData.isFirst){	//首次App.vue有加载就不需要再加载
				this.$common.pageLoadFn({
					test:options.test,
					lan :options.lan,
					source:options.source
				})
			}else{
				app.globalData.isFirst = false
			}
			this.getDetailFn();
			
			//获取分享信息
			var tjDataStr = uni.getStorageSync('tjData');
			if(tjDataStr){
				this.tjData = tjDataStr
			}else{
				this.tjData = {
					shareid:'758e1e43956b23aa174f26358111b086',
					uniqueNums:''
				}
			}
			this.getStatisticsData(this.tjData);
			
		},
		onReady(){
			
		},
		methods: {
			//获取分享统计信息
			getStatisticsData(tjData){
				this.$http({
					url:`/api/shareInfo/access/${tjData.shareId}`,
					data:{
						uniqueNums : tjData.uniqueNums
					},
					success:(res)=>{
						console.log('测试题初次加载：',res)
						this.tjData['uniqueNums'] = res.data.uniqueNums;
						uni.setStorageSync('tjData',this.tjData)
					},
				})			
			},
			
			//获取详情信息
			getDetailFn(){
				
				//获取当前时间
				var timestamp = (new Date()).getTime();
				var today = this.$common.getDate(timestamp).substring(0,10);
				
				//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1，从而达到重新排列数组
				function randomsort(a, b) {
					return Math.random()>.5 ? -1 : 1;
				}
				
				var reportList = reportData[this.level-1].content;
				reportList.sort(randomsort);
				this.resultData = {
					title:reportData[this.level-1].title,
					level:this.level,
					reportList:reportList,
					today:today
				};
				
			},
			
			//下载按钮判断
			downlaodPopFn(){
				if(this.isIOS){
					uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
				}else{
					this.downloadPopShow = true
				}
			}
			
		}
	}
</script>


<style lang="scss">
/*测试报告头部*/
.report_head{background:#fff; max-height:100%; overflow: hidden;}
.report_top{height:620upx; background:url(~@/static/images/share_bg04.jpg) no-repeat center bottom; background-size: 100% auto;}
.report_top .title{font-size:36upx; color:#fff; line-height:48upx; padding:40upx 60upx; text-align: center;}

.report_progress{width:400upx; height:400upx; margin:0 auto; position:relative;  border-radius:100%;}
.report_progress .progress{width:100%; height:100%; text-align: center; }
.progress_data{background:rgba(255,255,255,.1); width:320upx; height:320upx; border-radius:100%; position:absolute; top:40upx; left:40upx; color:#fff; text-align: center; padding-top:40upx;}
.progress_data .p{font-size:30upx; position:relative; padding-bottom:20upx;}
.progress_data .p:after{height:6upx; width:48upx; background:#ffc10a; content:''; position:absolute; left:50%; margin-left:-24upx; bottom:0;}
.progress_data .h3{font-size:96upx; font-weight: bold; margin-bottom:10upx; }
.progress_data .h3.blur{filter: blur(9px);}
.progress_data .btn{display:inline-block; width:180upx; height:64upx; line-height:58upx; text-align: center; border:2upx solid #fff; border-radius:32upx; color:#fff; font-size:28upx;}

.report_data{padding:50upx 25upx; background:#fff;}
.report_title{font-size:36upx; color:#242629; line-height:60upx; margin-bottom:30upx;}
.report_title .ico_report{ width:60upx; height:60upx; background-position:-180upx -100upx; float:left; margin-right:20upx; vertical-align: top;}
.report_des{margin-left:80upx; color:#242629; line-height:44upx; font-size:34upx; padding-bottom:20upx; border-bottom:2upx solid #e3e3e3; margin-bottom:20upx;}
.report_list{padding-left:80upx;}
.report_list .li{margin-bottom:40upx; overflow: hidden;}
.report_list .li:last-child{margin-bottom:0;}
.report_list .li .cir{float:left; width:38upx; height:38upx; background:#e5e5e5; border-radius:19upx; margin-right:20upx;}
.report_list .li.act .cir{background:#ffc10a; box-shadow:4upx 0 10upx rgba(248,195,2,.48); line-height:30upx; text-align: center;}
.report_list .li.act .cir .icons{background-position:-160upx -60upx; width:30upx; height:30upx; margin-top:4upx; }
.report_list .li .p{overflow:hidden; font-size:34upx; color:#242629; line-height:42upx;}

.report_ad{width:700upx; height:260upx; border-radius:10upx; position:relative; margin:30upx 25upx; padding:30upx;}
.report_ad .h3{display:inline-block; height:46upx; line-height:46upx; background:#e98c00; color:#fff; font-size:28upx; padding:0 20upx; border-radius:10upx; margin-bottom:20upx;}
.report_ad .p{color:#242629; font-size:32upx; line-height:48upx;}

.download_btm{position:fixed; bottom:0; left:0; width:100%; text-align: center; padding-top:200upx;}
.download_btm .white_mask{position:absolute; top:0; left:0; height:200upx; width:100%;
background:-moz-linear-gradient(top,rgba(255, 255, 255, 0),argba(255, 255, 255, 1)); 
background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0),rgba(255, 255, 255, 1));
}
.download_btm_main{background:#fff; position:relative; width:100%; z-index: 2; box-sizing: border-box; padding:0 20upx 30upx;}
.download_btm_main .ico_arrow{width:50upx; height:50upx; background-position: -450upx 0; margin-bottom:10upx;}
.download_btm_main .txt{color:#1788D2; font-size:32upx; line-height:44upx; margin-bottom:40upx;}
.plan_btn{ width:90%; height:100upx; line-height:100upx; display:block; margin:0 auto; font-size:36upx; text-align: center;color:#fff;  border-radius:50upx; box-shadow:8upx 0 28upx rgba(247, 157, 0, 0.5);
background:-moz-linear-gradient(left,#ffc10a,#e98c00); 
background: -webkit-linear-gradient(left,#ffc10a,#e98c00);
}
.download_pop_btn{background:#fff;}
.download_pop_btn .tit{height:80upx; line-height:80upx; text-align: center; font-size:26upx; color:#999999;}
.download_pop_btn a{display:block; height:100upx; line-height:100upx; color:#000000; font-size:36upx; border-top:2upx solid #e3e3e3;}
.download_pop_btn a .icons{width:50upx; height:50upx; margin-right:20upx; vertical-align: middle; position:relative; top:-5upx;}
.download_pop_btn a .ico_01{background-position: 0 -300upx;}
.download_pop_btn a .ico_02{background-position: -50upx -300upx;}
.download_pop_btn a .ico_03{background-position: -100upx -300upx;}
.download_pop_close{color:#1788d2; font-size:36upx; text-align: center; background:#fff; height:100upx; line-height:100upx; margin-top:16upx;}

</style>
