<template>
   <view class="topic-success">
       <view :class="['success-icon',animateClass]">
           <image class="img" :src="imgUrl + '/word/ico-success.png'" alt="">
       </view>
   </view>
</template>


<script>
const app = getApp();
export default {
	name: 'topicSuccess',
	data () {
		return {
			imgUrl:app.globalData.imgUrl,
			langData:app.globalData.langData,	//语言文件
            animateClass:'',    //成功图标动画class
		}
    },
    mounted(){
		
		var _this = this
		//_this.$emit('afterSuccessFn')
        setTimeout(()=>{
            _this.animateClass = 's-animate'
            setTimeout(()=>{
                _this.animateClass = ''
				setTimeout(()=>{
					_this.$emit('afterSuccessFn')
				},500)
            },800);
        },100);
    }
};
</script>

<style lang="scss">
@import 'exercise.scss';
</style>