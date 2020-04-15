<template>
   <view :class="['topic-answer',animateClass,leaveClass]" v-if="topicData">
        <view class="txt">
            <view class="h3">{{topicData.title}}</view>
            <view class="p">{{topicData.title_py}}</view>
        </view>
        <image class="img" :src="topicData.imgUrl" alt="">
        <view class="learn_btn" @click="gotoTopicFn">{{langData.wordTopic.learnNow[lan]}}</view>
   </view>
</template>

<script>
const app = getApp();
export default {
	name: 'topicIntro',
	data () {
		return {
			imgUrl:app.globalData.imgUrl,
			langData:app.globalData.langData,	//语言文件
		   
            animateClass:'', //成功图标动画class
            leaveClass:'',  //离开的class
            audioObj:null,  //音频对象
		}
    },
    // 接受父组件的值
    props: {
		lan:String,
        topicData:Object
    },
    //计算属性
    computed: {
        lang(){ return this.$store.state.lan },    //获取语言
    },

    mounted(){
		//加载完页面后执行动画
		setTimeout(()=>{
		    this.animateClass = 's-animate';
		},500);
    },
    methods:{
        gotoTopicFn(){
            this.$emit('gotoTopic');
        }
    }
};
</script>

<style lang="scss">
@import 'exercise.scss';
</style>