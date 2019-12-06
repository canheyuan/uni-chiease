<template>
	<view>配音课分享</view>
</template>

<script>
	export default {
		data(){
			return {
				imgUrl:this.$common.imgUrl
			}
		},
		onLoad(options) {
			console.log('dub-onLoad-options:',options)
			console.log('dub-commom:',this.common)
		},
		onShow(options){
			console.log('dub-onShow-options:',options)
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
