<template>
	<view class="subject_item" v-if=subjectItem>
		<view class="tyxt_list">
			<view
				v-for="(item,index) in subjectItem.options" :key="item.id"
				:class="['li',{'act':item.isChecked}]" 
				@click="subjectChoiceFn(index)"
			>
				<image :src="item.img" alt="">
				<view class="mask"><view class="ico_gou"></view></view>
			</view>
		</view>
<!--			<div class="tyxt_answer">{{subjectItem.title}}</div>-->
		<view class="audio_btn audio_btm" @click="subjectPlayAudio(subjectItem.audio,$event)">
			<image class="img" src="static/images/ico_audio.png" alt="">
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
			}
		},
		
		props:{
			subjectItem:{ type: Object },
			lan:{type: String}
		},
		
		onLoad(options) {
			
		},
		
		methods: {
			
		}
	}
</script>


<style lang="scss">
	@import 'index.scss';
</style>