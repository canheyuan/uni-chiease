<template>
	<view>
		
		<view v-if="detailData" v-html="detailData[lan]"></view>
		
		<!--备份的静态页-没用到 -->
		<div class="punch_guide" v-if="false">
			<h3>打卡指引</h3>
			<dl class="guide_item" style="padding-top:0;">
				<dt>1</dt>
				<dd>
					<img src="static/images/dkzy_img01.jpg" alt="">
					<p>首页点击学习进度盘进入【学习目标】页，设定每日学习时长目标及提醒。</p>
					<img src="static/images/dkzy_img02.jpg" alt="">
				</dd>
			</dl>
			<dl class="guide_item">
				<dt>2</dt>
				<dd>
					<p>在课程中听原音和跟读都将计入学习时长。完成当日学习目标后，将自动弹出页面提示打卡，点击【去打卡】即可。</p>
					<img src="static/images/dkzy_img03.jpg" alt="">
				</dd>
			</dl>
			<dl class="guide_item">
				<dt>3</dt>
				<dd>
					<p>学习目标完成后，在学习首页点击【每日打卡】，同样可以完成当日打卡。</p>
					<img src="static/images/dkzy_img04.jpg" alt="">
				</dd>
			</dl>
		</div>
			
		<div class="punch_guide" v-if="false">
			<h3>打卡须知</h3>
			<div class="dkxz_txt">
				<p>1. 学习时长包括：学习过程中听、说句子的时间（暂时只记录单词或句子的学习时间）</p>
		<!--		<p>2. 完成打卡即可获得免费抽奖一次，百万大奖等你拿，快来参与哦！</p>-->
				<p>2. 每天晚上12点，数据均会重新计时（以东八区为准），所以要在这之前完成任务并打卡哦~</p>
				<p>3. 打卡徽章是按照你的连续打卡天数计算的，注意，是连续！</p>
		<!--		<p>5. 每获得打卡徽章即可获得大量的金币奖励，赶紧分享给小伙伴一起参与吧 ^_^</p>-->
				<p>4. 如果系统提示你没有打卡成功，可能是网络连接不稳定，换个姿势再试试说不定就能成功了~</p>
		<!--		<p>7. 连续分享打卡到朋友圈，即可获得金币奖励。</p>-->
			</div>
		</div>
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
				name: "punch-guide",
				title: this.langData.punchGuide.title[lan],	//标题
				leftIcon: "back",		//or "close" ，缺省即back
				backgroundColor: "#ffffff"	//不设则默认白色
			}
			Shell.setPageTitle(JSON.stringify(param));
			uni.setNavigationBarTitle({  title: this.langData.punchGuide.title[lan] });
		},
		methods: {
			//获取详情信息
			getDetailFn(){
				var _this = this
				this.$http({
					url:`/api/article/getOneArticleByColumnKey`,
					method:"POST",
					data:{
						"app-type":'',	
						"app-version":'',
						"device-type":'',	
						"columnKey":'punch'	//栏目key
					},
					success:(res)=>{
						console.log('打卡指引：',res);
						var detailData = res.data.contentMulti;
						this.detailData = detailData;	
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
</style>
