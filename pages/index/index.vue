<template>
	<view class="page_list">
		<navigator class="a" url="../share/dub/index">配音课分享页</navigator>
		<navigator class="a" url="../share/spoken/index">口语课分享页</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
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
		.a{display:block; height:100rpx; line-height:100rpx; border-bottom:2rpx solid #eee; padding:0 30rpx; font-size:32rpx; color:#333;}
	}
</style>
