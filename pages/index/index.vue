<template>
	<view class="page_list">
		<navigator v-for="(item,index) in navList" class="a" :url="item.url">{{item.title}}</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[
					{title:'配音课分享页',url:'../share/dub/index?shareid=6e016f3f111c352a85ecd069e360534a'},
					{title:'口语课分享页',url:'../share/spoken/index?shareid=b5c31a79257ffb3ac2c3af79377932f6'},
					{title:'测试报告分享',url:'../share/report/index?shareid=4dccdf22cfdbef27fb500ef3e9de2e1f'},
					{title:'打卡分享页',url:'../share/punch/index?shareid=fd086bee70fc4467aab3fce75c8266ad'},
					{title:'定制课分享页',url:'../share/custom/index?shareid=f4969e05ccb9ba18daf7503eed06846d'},
					{title:'测试成绩分享页',url:'../share/test-performance/index?shareid=f4969e05ccb9ba18daf7503eed06846d'},
					{title:'拼音表',url:'../static/pinyin-table/index'},
					{title:'教材有声读物',url:'../textbook/index/index'},
					{title:'每日打卡',url:'../punch/index/index?test=1&source=app'},
					{title:'打卡提示',url:'../punch/tip/index?test=1&source=app'},
					{title:'打卡目标',url:'../punch/target/index?test=1&source=app'},
					{title:'打卡指引',url:'../punch/guide/index?test=1&source=app'},
					{title:'测试题',url:'../quizzes/index/index'},
					{title:'测试结果',url:'../quizzes/result/index'},
				]
			}
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.page_list{
		.a{
			display:block; height:100rpx; line-height:100rpx; border-bottom:2rpx solid #eee; padding:0 30rpx; 
			font-size:32rpx; color:#333;
		}
	}
</style>
