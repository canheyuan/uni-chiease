<template>
   <div :class="['topic-answer',animateClass,leaveClass]" v-if="topicData">
        <div class="txt">
            <h3>{{topicData.title}}</h3>
            <p>{{topicData.title_py}}</p>
        </div>
        <img :src="topicData.imgUrl" alt="">
        <div class="learn_btn" @click="gotoTopicFn">{{langData.wordTopic.learnNow[lan]}}</div>
        <!-- <audio v-if="topicData.voiceUrl" id="audio" ref="audioObj" :src="topicData.voiceUrl"></audio> -->
        <!-- <div @click="playAudio" style="margin-top:30px;">播放音频</div>
        <audio id="audio" ref="audioObj" src="https://test.5ideachinese.com/res/voice/2019/08/23fcff6dc8067dd71ad8b8d2bd51978e.mp3"></audio> -->
   </div>
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
        // var _this = this;
        // this.$nextTick(()=>{
        //     this.audioObj = this.$refs.audioObj
        //     //判断有没音频文件
        //     if(_this.topicData && _this.topicData.voiceUrl){
        //         _this.canPlayAudioMP3((res)=>{
        //             if(res){
        //                 //播放音频
        //                 setTimeout(()=>{  _this.audioObj.play() },500);
        //             }  
        //         });
        //     }
        // })
    },
    methods:{
        gotoTopicFn(){
            this.$emit('gotoTopic');
        },

        playAudio(){
            //this.audioObj.play()
        },

        canPlayAudioMP3(callback){
            try {
                var audio = document.getElementById('audio');
                // 判断音频文件格式是否有误
                var b = audio.canPlayType('audio/mpeg') == "probably"?true:false;
                if(!b){  callback(b); return; }

                //监听是否加载完
                audio.addEventListener('canplaythrough', function(e){
                    //console.log('加载完')
                    callback(true);
                }, false);
                
                //监听音频文件是否有误
                audio.addEventListener('error', function(e){
                    callback(false);
                }, false);
            }
            catch(e){
                callback(false, e);
            }
        }
    }
};
</script>

<style lang="scss">
@import 'exercise.scss';
</style>