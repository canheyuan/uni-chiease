<template>
	<view class="draw_page">
		<!-- 选项卡 -->
		<view class="draw_tag">
			<view class="btn" @click="popFn('rulePopShow',true)">
				<image  class="img" :src="imgUrl + '/word/draw_tag01.png'" alt="">
			</view>
			<view class="btn" @click="popFn('myPrizeShow',true)">
				<image class="img" :src="imgUrl + '/word/draw_tag02.png'" alt="">
			</view>
		</view>
		
		<!-- 抽奖框 -->
		<view class="draw_box"  v-show="!myPrizeShow">
			<view class="draw_list clearfix">
				<view 
					:class="['item',{'active':drawIndex==index},{'draw_btn':index==8}]" 
					v-for="(item,index) in grid_info_arr" :key="index" 
					@click="luck_draw" :data-index="index"
				>
					<image mode="widthFix" class="img" :src="imgUrl + item.img1" alt="">
					<image v-if="item.img2" class="img img2" :src="imgUrl + item.img2" alt="">
					<view class="tit">{{item.title}}</view>
				</view>
			</view>
		</view>
		
		<!-- 我的奖品 -->
		<view class="my_prize_box" v-show="myPrizeShow">
			<view class="close_btn" @click="popFn('myPrizeShow',false)">
				<image class="ico" :src="imgUrl+'/word/ico-close.png'"></image>
			</view>
			
			<view class="zw_tip" v-if="!(myPrizeList.length>0)">还未抽中奖品</view>
			<view class="prize_list" v-if="myPrizeList.length>0">
				<view 
					class="li" v-for="(item,index) in myPrizeList" :key="'prize'+index" 
					@click="prizeDetailFn(item,index)"
				>
					<view class="num">{{index+1}}</view>
					<view class="prize_img">
						<image mode="widthFix" class="img" :src="imgUrl+item.img1"></image>
					</view>
					<view class="title">{{item.title}}</view>
					<view class="p">{{item.isUse?'已使用':'未使用'}}</view>
				</view>
			</view>
		</view>
		
		<!-- 活动规则弹窗 -->
		<view class="rule_pop" v-show="rulePopShow">
			<view class="close_btn" @click="popFn('rulePopShow',false)">
				<image class="ico" :src="imgUrl+'/word/ico-close.png'"></image>
			</view>
			<view class="rule_ctn">
				<view class="title">活动规则</view>
				<view class="p">1. 活动时间：2018年1月25日—2018年2月9日（在活动时间内，活动资源送完则活动自动结束）；</view>
				<view class="p">2. 参与方式：在“浙江移动”微信公众号中回复“福袋”关键字；</view>
				<view class="p">3. 活动规则：用户在活动期间参与活动，可通过本人参与、受邀、邀请好友三种方式参与活动，每个手机号累计最多获得11个福袋。（1）首次发起邀请成功，无论对方是否接受邀请，发起人均可获得1个福袋。（2）每次被邀请人接受邀请，发起人和被邀请人双方各自可获得1个福袋。双方可互相邀请，均可以发起人和被发起人的身份各自获得1个福袋，但一方重复接受另一方的邀请，只为双方赠送1个福袋。同一被邀请人接受多个发起人的邀请，均可获赠福袋，但单个手机号码累计获得以11个福袋为上限，之后再发起或接受邀请均不再享受。</view>
				<view class="p">4. 活动奖品：福袋的中奖概率为100%，内含奖励及具体中奖概率如下：</view>
				<view class="p">5.活动所得话费券不可拆分、不可转赠、不可兑换现金、不提供发票，需要在60天内到“浙江移动手机营业厅”APP中兑换才可到账，请在截止日期之前兑换使用，过期自动失效；话费券兑换路径：浙江移动手机营业厅>我的>话费券；兑换成功后话费将自动充入您的个人通信馈赠金账户，充入的金额不提供发票；</view>
			</view>
		</view>
		
		<!-- 中奖弹窗 -->
		<uni-popup ref="winPop" type="top" :animation="false" style="height:100%; background:rgba(0,0,0,.7);">
			<view class="winning_pop">
				<image mode="widthFix" class="bg" :src="imgUrl+'/word/win_pop.png'"></image>
				<view class="win_box">
					<image mode="widthFix" class="good_img" :src="imgUrl+winPopData.img1"></image>
					<text class="text">中奖啦！
					恭喜获得{{winPopData.title}}</text>
					<image 
						@click="openUsePopFn" mode="widthFix" 
						class="use_btn" :src="imgUrl+'/word/user_btn.png'"
					></image>
				</view>
				<view class="close_btn" @click="popupShowFn('winPop',false)">
					<image class="ico" :src="imgUrl+'/word/ico-close.png'"></image>
				</view>
			</view>
		</uni-popup>
		
		<!-- 使用弹窗 -->
		<uni-popup ref="usePop" type="center" :animation="false" style="width:90%; ">
			<view class="use_pop">
				<view class="title">{{winPopData.title}}</view>
				<image mode="widthFix" class="good_img" :src="imgUrl+winPopData.img1"></image>
				<text class="text">购买教材课程书籍时，出示该奖品界面，即可获得奖品</text>
				<view class="btn" @click="usePrizeFn">确定使用</view>
				<view class="close_btn" @click="popupShowFn('usePop',false)">
					<image class="ico" :src="imgUrl+'/word/ico-close2.png'"></image>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
const app = getApp();
import LotteryDraw from '@/static/js/SJ-LotteryDraw.js';	//抽奖插件
import uniPopup from "@/components/uni-popup/uni-popup.vue"	//弹窗组件
import dateTime from '@/components/shoyu-date/utils.filter.js';	//时间转换器
export default {
    components: {
		uniPopup
    },
	name: 'wordIndex',
	data () {
		return {
            imgUrl:app.globalData.imgUrl,
            langData:app.globalData.langData,	//语言文件
            lan:app.globalData.lan,	//当前语言
			dateTime,	//时间转换器
			grid_info_arr:[
				{ img1:'/word/draw_img01.png', title:'8折优惠券' },
				{ img1:'/word/draw_img02.png', title:'' },
				{ img1:'/word/draw_img03.png', title:'精品课程体验券' },
				{ img1:'/word/draw_img04.png', title:'中国结' },
				{ img1:'/word/draw_img01.png', title:'8折优惠券' },
				{ img1:'/word/draw_img03.png', title:'精品课程体验券' },
				{ img1:'/word/draw_img04.png', title:'中国结' },
				{ img1:'/word/draw_img01.png', title:'8折优惠券' },
				{ img1:'/word/draw_btn_img.png', title:'剩余 0 次' },
			],
			lottery_draw_param: {
				startIndex: 0, //开始抽奖位置，从0开始
				totalCount: 8, //一共要转的圈数
				winingIndex: -1, //中奖的位置，从0开始
				speed: 40 //抽奖动画的速度 [数字越大越慢,默认100]
			},
			drawIndex:0,	//当前选中哪个
			myPrizeList:[],	//我的奖品列表
			myPrizeIndex:0,	//当前操作的奖品列表索引
			myPrizeShow:false,	//我的奖品是否显示
			rulePopShow:false,	//活动规则弹窗是否显示
			winPopData:{ img1:'/word/draw_img03.png', img2:'', title:'精品课程体验券' },	//中奖信息
			drawTimes:0,	//剩余抽奖次数
		}
    },
	onLoad(options){
		//获取地址通用参数
		this.$common.pageLoadFn(options,()=>{
		})
	},
	mounted(){
		uni.setStorageSync('drawTimes',10)
		//uni.removeStorageSync('drawTimes')
		//uni.clearStorageSync()
		//获取缓存的抽奖次数
		var drawTimes = uni.getStorageSync('drawTimes')?uni.getStorageSync('drawTimes'):0
		console.log('drawTimes',drawTimes)
		this.drawTimesFn(drawTimes)
		
		//获取缓存里的我的奖品列表
		var myPrizeList = uni.getStorageSync('myPrizeList')?uni.getStorageSync('myPrizeList'):[]
		this.myPrizeList = myPrizeList
		console.log('this.myPrizeList',this.myPrizeList)
	},
	methods:{
		
		//设置更新抽奖次数
		drawTimesFn(drawTimes){
			this.drawTimes = drawTimes
			this.grid_info_arr[8].title = `剩余 ${drawTimes} 次`
			uni.setStorageSync('drawTimes',drawTimes)
		},
		
		// 计算抽奖结果概率(判断哪个区间中哪个奖)
		calculateAnswer(){
			var num = parseInt(Math.random()*10000)
			var result = null
			console.log('随机数',num)
			if(num < 10){	//千分之一
				result = 0
			}else if(num > 10 && num < 100){
				result = 1
			}else if(num > 100 && num < 1000){
				result = 2
			}else if(num > 1000 && num < 2000){
				result = 3
			}else if(num > 2000 && num < 3000){
				result = 4
			}else if(num > 3000 && num < 4000){ 
				result = 5
			}else if(num > 6000 && num < 8000){
				result = 6
			}else if(num > 8000 && num < 10000){ 
				result = 7
			}
			return result
		},
		
		//开始抽奖
		luck_draw(event) {
			var drawTimes = this.drawTimes
			if(drawTimes<1){
				uni.showModal({
					content:'很抱歉，您的抽奖次数为0！',
					showCancel:false,
					confirmText:'我知道了'
				})
				return
			}
			var answerIndex = this.calculateAnswer()
			this.lottery_draw_param.winingIndex = answerIndex
			let index = event.currentTarget.dataset.index;
			let _this = this;
			if (index == 8) {
				let win = new LotteryDraw({
					domData: _this.grid_info_arr,
					..._this.lottery_draw_param
				},
				function(index, count) {
					_this.drawIndex = index;
					if (answerIndex == index && _this.lottery_draw_param.totalCount == count) {
						
						//减少次数
						_this.drawTimesFn(drawTimes-1)

						//设置下次开始设置的位置
						_this.lottery_draw_param.startIndex = answerIndex	
						//当前奖品信息
						var timestamp = new Date().getTime()	//当前时间
						var nowWinPopData = _this.grid_info_arr[answerIndex]	
						nowWinPopData.time = timestamp
						nowWinPopData.isUse = false
						
						//互转处理一下，不然变量下次改变渲染不了
						var tempObj = JSON.stringify(nowWinPopData)
						nowWinPopData = JSON.parse(tempObj);
						
						_this.winPopData = nowWinPopData	
						
						//当前奖品添加到我的奖品中
						var myPrizeList = _this.myPrizeList
						myPrizeList.push(nowWinPopData)
						_this.myPrizeList = myPrizeList
						_this.myPrizeIndex = myPrizeList.length-1
						uni.setStorageSync('myPrizeList',myPrizeList)

						setTimeout(()=>{	//打开弹窗
							_this.popupShowFn('winPop',true)
						},1000)
						
					}
				});
			}
		},
		
		openUsePopFn(){
			this.popupShowFn('winPop',false)
			this.popupShowFn('usePop',true)
		},
		
		//打开我的奖品
		prizeDetailFn(prizeItem,index){
			this.winPopData = prizeItem
			this.myPrizeIndex = index
			this.popupShowFn('usePop',true)
		},
		
		//确定使用奖品
		usePrizeFn(){

			this.myPrizeList[this.myPrizeIndex].isUse = true
			console.log('this.myPrizeList',this.myPrizeList)
			uni.setStorageSync('myPrizeList',this.myPrizeList)
			this.popupShowFn('usePop',false)
		},
		
		//popup显示、关闭中奖弹窗
		popupShowFn(popName,b,cbOk){
			if(b){
				this.$refs[popName].open()
			}else{
				this.$refs[popName].close()
			}
			//cbOk && cbOk(b)
			if(cbOk){ cbOk(b) }
		},
		
		//弹窗关闭隐藏
		popFn(popName,b,cbOk){
			this[popName] = b
			//cbOk && cbOk(b)
			if(cbOk){ cbOk(b) }
		}
	}

}
</script>

<style lang="scss">
$grid_item_width: 239upx; //每个格子的宽度
$grid_item_height: 222upx; //每个格子的高度

page{background:#0e537b;}
/*------------------- 抽奖页  -----------------------------*/
.draw_page{
	background:url(~@/static/images/word/draw_bg.jpg) #0e537b no-repeat center top; background-size:100% auto; 
	padding-top:390upx; 
	.draw_tag{text-align: center;}
	.draw_tag .btn{display:inline-block; width:205upx; height:74upx; margin:0 10upx; }
	.draw_tag .btn .img{width:100%;  height:100%;}
}
.draw_box{padding:20upx;}
.draw_list {
	position:relative;
	.item{
		float:left; width:229upx; height:212upx; 
		background: url(~@/static/images/word/draw_btn_bg.png) no-repeat; background-size:100% 100%; 
		position:absolute; margin-right:10upx; margin-bottom:10upx; text-align:center; padding-top:20upx;
		.img{width:170upx; height:auto;}
		.img2{z-index:9; opacity: 0;}
		.tit{
			position:absolute; bottom:20upx; left:0; width:100%; text-align:center; font-size:24upx; 
			line-height:44rpx; color:#000000; font-weight:bold;
		}
	}
	.item:nth-child(1){left:$grid_item_width * 0; top:$grid_item_height * 0;}
	.item:nth-child(2){left:$grid_item_width * 1; top:$grid_item_height * 0;}
	.item:nth-child(3){left:$grid_item_width * 2; top:$grid_item_height * 0;}
	.item:nth-child(4){left:$grid_item_width * 2; top:$grid_item_height * 1;}
	.item:nth-child(5){left:$grid_item_width * 2; top:$grid_item_height * 2;}
	.item:nth-child(6){left:$grid_item_width * 1; top:$grid_item_height * 2;}
	.item:nth-child(7){left:$grid_item_width * 0; top:$grid_item_height * 2;}
	.item:nth-child(8){left:$grid_item_width * 0; top:$grid_item_height * 1;}
	.item:nth-child(9){left:$grid_item_width * 1; top:$grid_item_height * 1;}
	.item:nth-child(2),
	.item:nth-child(9){
		padding-top:0;
		.img{width:100%; height:100%;}
	}
	.draw_btn .tit{
		display:inline-block; position:absolute; left:0; top:130upx; width:100%; text-align: center; 
		font-size:24upx; color:#fff0ab;
	}
	.active{
		background-image:url(~@/static/images/word/draw_btn_bg_act.png); 
		.img2{opacity: 1;}
		.tit{color:#fffb90;}
	}
}



// 我的奖品
.my_prize_box{
	padding:90upx 60upx 30upx; position:relative;
	.close_btn{
		position:absolute; right:30upx; top:50upx;
		.ico{width:40upx; height:40upx;}
	}
	.zw_tip{font-size:44upx; color:#fff; text-align:center; padding:100upx 0;}
	.prize_list .li{
		border-bottom:1upx solid #619dc0; padding:24upx; overflow:hidden;
		.num{
			font-size:32upx; color:#fff; width:44upx; height:44upx; line-height:44upx; text-align:center; 
			border:2upx solid #619dc0; border-radius:100%; float:left; margin-top:60upx; margin-right:30upx;
		}
		.prize_img{
			width:160upx; height:160upx; line-height:160upx; text-align:center; box-sizing: border-box; 
			border:2upx solid #619dc0; background:#1c6c9a;border-radius:20upx; float:left; margin-right:40upx;
			.img{width:95%; height:auto; vertical-align: middle;}
		}
		.title{font-size:32upx; color:#fff; line-height:80upx;}
		.p{font-size:28upx; color:#fff; line-height:80upx;}
	}
}

//活动规则弹窗
.rule_pop{
	color:#fff; padding-top:80upx; position:fixed; top:0; left:0; height:100%; background:rgba(14,83,123,.96);
	.close_btn{
		position:absolute; right:10upx; top:5upx; padding:20upx;
		.ico{width:30upx; height:30upx;}
	}
	
	.rule_ctn{
		margin:0 40upx; height:calc(100%); overflow:auto; border-top:1upx solid #fff;
		.title{
			font-size:38upx; line-height:50upx; font-weight:bold; text-align:center; 
			margin:0 30upx; padding:30upx 0;
		}
		.p{font-size:30upx; line-height:48upx; margin-bottom:40upx;}
	}
}

// 抽中弹窗
.winning_pop{
	width:750upx; position: relative; padding-top:80upx;
	.bg{width:100%;}
	.win_box{
		width:500upx; position:absolute; left:50%; top:540upx; margin-left:-250upx; text-align:center;
		.good_img{display:inline-block; width:230upx; }
		.text{display:block; text-align:center; font-size:32upx; line-height:40upx; color:#ec5900; margin-top:-10upx;}
		.use_btn{width:249upx; margin-top:40upx;}
	}
	.close_btn{width:64upx; height:64upx; box-sizing: border-box; padding:17upx; position:absolute; left:50%; top:1000upx; margin-left:-32upx; border-radius:100%; background:#f33441; text-align:center;}
	.close_btn .ico{width:34upx; height:34upx; vertical-align: top;}
}

//使用弹窗
.use_pop{
	width:650upx; padding:50upx; border-radius:20upx; background:#fff;text-align:center; position:relative;
	.title{font-weight:bold; font-size:48upx; color:#000; margin-bottom:20upx;}
	.good_img{display:inline-block; width:250upx; height:auto;}
	.text{display:block; font-size:32upx; color:#000; line-height:48upx; height:250upx;}
	.btn{
		display:inline-block; width:450upx; height:100upx; line-height:100upx; text-align:center; 
		border-radius:50upx; color:#fff;
		background: -webkit-linear-gradient(left, #ffc10a, #ffa000);   /*Safari5.1 Chrome 10+*/
	}
	.close_btn{
		width:64upx; height:64upx; box-sizing: border-box; position:absolute; right:-20upx; top:-20upx; 
		border-radius:100%; text-align:center;
	}
	.close_btn .ico{width:100%; height:100%; vertical-align: top;}
}


</style>
