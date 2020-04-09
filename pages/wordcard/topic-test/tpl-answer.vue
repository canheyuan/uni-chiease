<template>
   <div :class="['topic-answer',animateClass]">
       <div class="txt">
            <h3>{{topicData.title}}</h3>
            <p>{{topicData.title_py}}</p>
       </div>
       <img :src="topicData.imgUrl" alt="">
        <!-- <audio v-if="topicData.voiceUrl" id="audio" ref="audioObj" :src="topicData.voiceUrl"></audio> -->
        <!-- <audio id="audio" ref="audioObj" src="https://test.5ideachinese.com/res/voice/2019/08/23fcff6dc8067dd71ad8b8d2bd51978e.mp3"></audio> -->
   </div>
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
            //audioObj:null,  //音频对象
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
        // var _this = this;
        // this.audioObj = this.$refs.audioObj
        //使用事件监听方式捕捉事件
        // this.audioObj.addEventListener("ended",function(){
        //     _this.animateClass = '';
        //     setTimeout(()=>{
        //         _this.$emit('answerResult'); //给父级传值
        //     },500)
        // },false);
    },
    methods:{
       
    }
};
</script>
<style lang="scss">
@import 'exercise.scss';
</style>