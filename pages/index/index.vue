<template>
	<view class="page_list">
		<navigator 
			v-for="(item,index) in navList" :key="index"
			:url="item.url" class="a" 
		>{{item.title}}</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[
					{title:'配音课分享页（ok）',url:'../share/dub/index?shareid=6e016f3f111c352a85ecd069e360534a'},
					{title:'口语课分享页（ok）',url:'../share/spoken/index?shareid=b5c31a79257ffb3ac2c3af79377932f6'},
					{title:'测试报告分享（ok）',url:'../share/report/index?shareid=4dccdf22cfdbef27fb500ef3e9de2e1f'},
					{title:'打卡分享页（ok）',url:'../share/punch/index?shareid=fd086bee70fc4467aab3fce75c8266ad'},
					{title:'定制课分享页（ok）',url:'../share/custom/index?shareid=d09411160ed24e4a3c798d6d9e4aabdb'},
					{title:'测试成绩分享页（ok）',url:'../share/test-performance/index?shareid=bfd4be3e2a26927de329d4afa5e210ab'},
					{title:'',url:''},
					{title:'每日打卡',url:'../punch/index/index?test=1&source=app'},
					{title:'打卡提示',url:'../punch/tip/index?test=1&source=app'},
					{title:'打卡目标',url:'../punch/target/index?test=1&source=app'},
					{title:'打卡指引',url:'../punch/guide/index?test=1&source=app'},
					{title:'',url:''},
					{title:'测试题',url:'../quizzes/index/index'},
					{title:'测试结果',url:'../quizzes/result/index'},
					{title:'',url:''},
					{title:'拼音表',url:'../static/pinyin-table/index'},
					{title:'教材有声读物（ok）',url:'../textbook/index/index'},
					{title:'demo',url:'../common/demo/demo'},
					{title:'',url:''},
					{title:'词卡首页-H5',url:'../wordcard/index/index?source=h5'},
					{title:'词卡首页-APP基础课',url:'../wordcard/index/index?test=1&source=app'},
					{title:'词卡首页-APP汉语桥',url:'../wordcard/index/index?test=1&source=app&category=bridge'},
					{title:'词卡练习',url:'../wordcard/exercise/index?test=1&source=app'},
					{title:'词卡结果',url:'../wordcard/result/index?test=1&source=app'},
					{title:'词卡练习-抽奖版',url:'../wordcard/exercise/index-draw?test=1&source=h5'},
					{title:'词卡结果-抽奖版',url:'../wordcard/result/index?test=1&source=app'},
					{title:'词卡-抽奖页',url:'../wordcard/draw/index'},
				]
			}
		},
		onLoad(options) {
			//获取地址通用参数
			this.$common.pageLoadFn(options)
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.page_list{
		.a{
			display:block; height:80rpx; line-height:80rpx; border-bottom:2rpx solid #eee; padding:0 30rpx; 
			font-size:32rpx; color:#333;
		}
	}
</style>
