<template>
	<view v-if="subjectData">
		
		<!--测试题开始弹窗-->
		<uni-popup ref="startPop" type="center" :maskClick="false">
			<view class="start_pop">
				<img class="top_img" src="static/images/start_bg.png" alt="">
				<view class="h3">Chinese Proficiency Test</view>
				<view class="p">Accurate Testing<br>Here you are,professional test!<br>Here you go,scientific teaching!</view>
				<view class="btn" @click="startSubject">Start Test</view>
			</view>
		</uni-popup>
		
		<!--测试题暂停弹窗-->
		<uni-popup ref="pausePop" type="center" :maskClick="false">
			<view class="subject_mask_btn">
				<view class="btn" @click="pauseSubject">继续答题</view>
				<!--<a href="javascript:;">重新开始</a>-->
				<view class="btn" >退出</view>
			</view>
		</uni-popup>
		
		
		<!--测试题头部-->
		<view class="subject_head" v-if="subjectItem">
			<view class="progress" id="progress" :style="{width:(subjectIndex+1)/5*100+'%'}"></view>
			<!--<div class="play_btn" @click="pauseSubject">-->
			<view class="play_btn">
				<!-- <i class="icons ico_pause"></i> -->
				<view class="cirqueBox">
					<view class="cirqueYellow"></view>
					<view 
						:class="{'cirqueGrey':subjectIsShow,'play':examStatus}" 
						ref="cirqueBox"
					></view>
				</view>
			</view>
			<!--
			<div class="right_txt"><i class="icons ico_tip"></i><span>提示</span></div>
			-->
			<view class="txt_jf">
				<text class="span">{{subjectIndex+1}}</text>/5
			</view>
		</view>
		
		<!-- 测试题目 -->
		<view 
			:class="['subject_mdl',{'show':subjectIsShow}]" 
			v-if="subjectItem"
		>
			<topic-type1></topic-type1>
			
			
		</view>
		
		
	</view>
</template>

<script>
const app = getApp()

//获取静态题目文件
const subjectListData = require('../../../static/js/data/question-list.js').default
import {uniPopup} from '@dcloudio/uni-ui'	//导入uni-ui
import topicType1 from './topic-type1.vue'

//创建音频
const audioObj = uni.createInnerAudioContext();
audioObj.autoplay = false;
export default {
	components:{
		uniPopup,
		topicType1
	},
	data() {
		return {
			imgUrl:app.globalData.imgUrl,
			langData:app.globalData.langData,	//语言文件
			lan:app.globalData.lan,	//当前语言
			tjData:null,	//统计信息存储
			subjectData:null,	//处理后的题目信息
			subjectItem:{},	//当前测试题数据
			subjectIndex:0,	//当前测试题索引
			subjectStore:3,	//当前级别分数
			
			subjectIsShow:false,	//题目是否显示
			submitStatus:false,	//是否处于提交状态（防止提交中多点选项）
			isPauseSubject:false,	//是否点击暂停做题
			examStatus:false,	//判断是否在做题状态
			isPlayStatus:false,	//是否在播放状态
			remainingTime:10000,	//做题剩余时间
			currentAudioList:[],	//当前播放音频列表
			currentaudioIndex:0,	//当前播放音频的索引
			currentAudioUrl:'',	//当前的音频地址
			isFirstPlay:true,	//题目是否第一次播放
			choiceAnswer:'',
			resultData:{},		//测试题结果页数据
			downloadPopShow:false,	//测试题结果页下载弹窗
			
			
			dlUrl:app.globalData.dowmlaod,	//下载地址
			detailData:null,	//分享接口详情信息
			isIOS:this.$common.system()=='ios',	//是否IOS系统
			shareId:'',	//分享id
		}
	},
	onLoad(options) {
		if(!app.globalData.isFirst){	//首次App.vue有加载就不需要再加载
			this.$common.pageLoadFn({
				test:options.query,
				lan :options.query.lan,
				source:options.query.source
			})
			this.getDetailFn();
		}else{
			app.globalData.isFirst = false
		}

		//获取分享信息
		var tjDataStr = uni.getStorageSync('tjData');
		if(tjDataStr){
			this.tjData = tjDataStr
		}else{
			this.tjData = {
				shareid:'758e1e43956b23aa174f26358111b086',
				uniqueNums:''
			}
		}
		this.getStatisticsData(this.tjData);
		this.getSubjectFn()
	},
	onReady(){
		this.StartPopFn('open')
	},
	
	methods: {
		
		//开始前弹窗
		StartPopFn(type){
			if(type=='open'){
				this.$refs.startPop.open()
			}else{
				this.$refs.startPop.close()
			}
		},
		
		//获取分享统计信息
		getStatisticsData(tjData){
			this.$http({
				url:`/api/shareInfo/access/${tjData.shareId}`,
				data:{
					uniqueNums : tjData.uniqueNums
				},
				success:(res)=>{
					console.log('测试题初次加载：',res)
					this.tjData['uniqueNums'] = res.data.uniqueNums;
					uni.setStorageSync('tjData',this.tjData)
				},
			})			
		},
		
		//处理题目信息
		getSubjectFn(){
			var subjectData = subjectListData;
			subjectData.currentAudioUrl = '';
			subjectData.currentIndex = 0;
			subjectData.level1  = [];
			subjectData.level2 = [];
			subjectData.level3 = [];
			function randomsort(a, b) {
				return Math.random()>.5 ? -1 : 1;
				//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1，从而达到重新排列数组
			}
			subjectData.data.forEach(item =>{
		
				//类型5表示完型填空题
				if(item.questionType == 5){
					//替换题目中的横线
					item.contentArr = item.content.split('____').map(item2=>{
						return {val:item2,answerIndex:''}
					});
					item.contentNum = 0;	//记录当前题目中有几个答案了
				}
		
				//听音选音
				var audioList = item.audio;
				if(item.questionType == 6){
				   //听音选音,把题目和答案声音的链接通过逗号连在一起
					item.options.forEach(item2=>{
						if(item2.audio){
							item.isPlayAudio = false;
							audioList += ',' + item2.audio;
						}
					})
				}
				item.audioList = audioList;
		
				//选择排序
				if(item.questionType == 7){
					item.answerArr = [];
					item.contentNum = 0;	//记录当前题目中有几个答案了
				}
		
				//选项顺序打乱
				if(item.questionType == 5 || item.questionType == 7){
					item.options.sort(randomsort);   
				}
		
				switch(item.level){
					case 1:
						subjectData.level1.push(item);
						break;
					case 2:
						subjectData.level2.push(item);
						break;
					case 3:
						subjectData.level3.push(item);
						break;
				}
		
			});
			
			this.subjectData = subjectData;
		},
		
		//开始做题
		startSubject(){
			var _this = this;
			console.log('this.$refs',this.$refs.cirqueBox)
			var cirqueBox = this.$refs.cirqueBox
			this.subjectItem = this.subjectData.level2[0];
			this.StartPopFn('close')	//开始弹窗关闭
			this.subjectIsShow = true;	//题目显示
			
			//开始播放录音
			setTimeout(()=>{
				_this.subjectPlayAudio(this.subjectItem.audioList);
			},1000);
			
			//监听进度条css3动画结束
			// cirqueBox.addEventListener("animationiteration", ()=>{
			// 	_this.examStatus = false;
			// });
			return
			//监听播放结束事件
			var subjectAudioObj = $('#subjectPlayAudio').get(0);
			subjectAudioObj.addEventListener("ended",function(){
				
				_this.isPlayStatus = false;
				var audioIndex = _this.currentaudioIndex;
				var audioList = _this.currentAudioList;
				if(audioList.length==1){
					if(!_this.isFirstPlay){return;}
					_this.examStatus = true;
					_this.isFirstPlay = false;
					_this.countTime();
					return;
				};
				audioIndex++;
				_this.currentaudioIndex = audioIndex;
				if(audioIndex < audioList.length){ 
					_this.subjectItem.options[audioIndex-1].isPlayAudio = true;
					_this.currentAudioUrl = audioList[audioIndex];
					var timer = setTimeout(()=>{
						if(!_this.isPauseSubject && !_this.submitStatus){
							clearTimeout(timer);
							subjectAudioObj.play();  
						}
					},1000);
				}else{
					if(!_this.isFirstPlay){return;}
					_this.currentaudioIndex = 0;
					_this.examStatus = true;
					_this.isFirstPlay = false;
					_this.countTime();
				}
			},false);
		},
		
		//下载按钮判断
		downloadFn(){
			if(this.isIOS){
				uni.navigateTo({ url: `/pages/common/web-view/index?url=${this.dlUrl.apple}` });
			}else{
				uni.pageScrollTo({		//uni-app中页面滚动接口
					scrollTop:10000,//滚动到页面的目标位置（单位px）
					duration:100  //滚动动画的时长，默认300ms，单位 ms
				})
			}
		}
	}
}
</script>

<style lang="scss">
	@import 'index.scss';
</style>
