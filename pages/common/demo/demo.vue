<template>
	<view class="page_list">
		<view>{{watchText}}</view>
		<view style="padding:30upx;" @click="changeWatchFn">改变watchText</view>
		
		<view @click="aaa" style="margin-top:100upx;">改变变量111</view>
		<view>navItem:{{navItem.title}}</view>
		<view>navItem:{{navItem.title2}}</view>
		<view>navItem:{{navItem.title3}}</view>
		<view>navList:{{navList[0].title}}</view>
		<view>navList:{{navList[0].title2}}</view>
		<view @click="bbb" style="margin-top:100upx;">改变变量222</view>
		<!-- <navigator 
			v-for="(item,index) in navList" :key="index"
			:url="item.url" class="a" 
		>{{item.title}}</navigator> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				watchText:'123',
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
				],
				navItem:{}
			}
		},
		onLoad() {
			console.log('watchText改变111')
			// this.$watch('watchText', function (newValue, oldValue) {
			//    console.log('watchText改变',newValue,oldValue)
			// })
			
			
		},
		watch:{
			watchText(newValue, oldValue){
				console.log('watchText改变222',newValue,oldValue)
			}
		},
		methods: {
			
			changeWatchFn(){
				this.watchText = '456'
			},
			
			aaa(){
				this.navItem = {title2:'bbb'}
				// var navListObj = this.navList
				// navListObj[0].title2 = 'aaa'
				// this.navItem = navListObj[0]
				// console.log('navListObj',this.navItem)
			},
			
			bbb(){
				console.log('bbbb')
				// var navItem = this.navItem
				this.navItem.title2 = 'ccc'
				// navItem.title3 = 'ccc'
				//this.navItem = {title2:'bbb'}
			}
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
