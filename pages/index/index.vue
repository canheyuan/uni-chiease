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
					{title:'配音课分享页',url:'../share/dub/index'},
					{title:'口语课分享页',url:'../share/spoken/index'},
					{title:'测试报告分享',url:'../share/report/index'},
					{title:'打卡分享页',url:'../share/punch/index'},
					{title:'定制课分享页',url:'../share/custom/index'},
					{title:'拼音表',url:'../static/pinyin-table/index'},
					{title:'教材有声读物',url:'../textbook/index/index'},
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
