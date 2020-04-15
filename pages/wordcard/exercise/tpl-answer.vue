<template>
   <view :class="['topic-answer',animateClass]">
       <view class="txt">
            <view class="h3">{{topicData.title}}</view>
            <view class="p">{{topicData.title_py}}</view>
       </view>
       <image class="img" :src="topicData.imgUrl" alt="" />
   </view>
</template>

<script>
const app = getApp();
export default {
	name: 'topicAnswer',
	data () {
		return {
            imgUrl:app.globalData.imgUrl,
            langData:app.globalData.langData,	//语言文件
            animateClass:'', //成功图标动画class
		}
    },
    // 接受父组件的值
    props: {
        topicData:Object,
    },

    mounted(){
		console.log('答案页')
		//加载完页面后执行动画
		setTimeout(()=>{
		    this.animateClass = 's-animate';
		},100);
		
		setTimeout(()=>{
		    this.animateClass = '';
			this.$emit('answerResult'); //给父级传值
		},3000)
    },
    methods:{
    }
};
</script>
<style lang="scss">
@import 'exercise.scss';
</style>