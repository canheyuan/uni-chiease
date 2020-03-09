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
		<view v-if="subjectItem" :class="['subject_mdl',{'show':subjectIsShow}]">
			
			<!--1、听音选图-->
			<view class="subject_item"  v-if="subjectItem.questionType==1">
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
				<!--<view class="tyxt_answer">{{subjectItem.title}}</view>-->
				<view class="audio_btn audio_btm" @click="subjectPlayAudio(subjectItem.audio)">
					<image class="img" :src="imgUrl+'/ico_audio.png'" alt="">
				</view>
			</view>
			
			<!--4、选择填空-->
			<view class="subject_item"  v-if="subjectItem.questionType==4">
				<view class="tyxz_img"><img class="img" mode="widthFix" :src="subjectItem.img" alt=""></view>
				<view class="tyxt_answer">{{subjectItem.content}}</view>
				<view class="audio_btn audio_center" @click="subjectPlayAudio(subjectItem.audio,$event)">
					<image class="img" :src="imgUrl+'/ico_audio.png'" alt="">
				</view>
				<view class="answer_btn01">
					<view 
						v-for="(item,index) in subjectItem.options"
						@click="subjectChoiceFn(index)" 
						:class="['li',{'df':!item.isPlayAudio},{'act':item.isChecked}]"
					><text class="span">{{item.content}}</text></view>
				</view>
			</view>
	
			<!--5、完形填空题-->
			<view 
				:class="{'subject_item':true,'subject_act':(subjectItem.contentNum>=subjectItem.contentArr.length-1)}"  
				v-if="subjectItem.questionType==5"
			>
				<view class="tyxz_img"><image class="img" mode="widthFix" :src="subjectItem.img" alt=""></view>
				<view class="tyxz_text">
					<view class="p" v-for="(item,index) in subjectItem.contentArr">
						{{item.val}}
						<text class="span" 
							@click="removeAnswer(index)" 
							v-if='index!=subjectItem.contentArr.length-1'
						>
							{{(item.answerIndex==='')?'':subjectItem.options[item.answerIndex].content}}
						</text>
					</view>
				</view>
	<!--				<div class="tyxz_text" v-html="subjectItem.content">{{subjectItem.content}}</div>-->
	
				<view 
					class="audio_btn audio_center" 
					@click="subjectPlayAudio(subjectItem.audio,$event)"
				>
					<image class="img" :src="imgUrl+'/ico_audio.png'" alt="">
				</view>
				<view class="answer_btn02 answer_btm">
					<view 
						v-for="(item,index) in subjectItem.options"
						@click="subjectChoiceFn(index)" 
						:class="['li',{'act':item.isChecked}]"
					>{{item.content}}</view>
				</view>
				<view 
					 class="submit_btn"
					 @click="affirmAnswer()"
				>Submit</view>
			</view>
	
			<!--6、听音选音-->
			<view class="subject_item" v-if="subjectItem.questionType==6">
				<view class="tyxz_img"><image class="img" mode="widthFix" :src="subjectItem.img" alt=""></view>
				<view 
					 class="audio_btn audio_center" 
					 @click="subjectPlayAudio(subjectItem.audioList,$event)"
				>
					<image class="img" :src="imgUrl+'/ico_audio.png'" alt="">
				</view>
				<view class="answer_btn03">
					<view 
						v-for="(item,index) in subjectItem.options"
						@click="subjectChoiceFn(index)" 
						:class="['li',{'df':!item.isPlayAudio},{'act':item.isChecked}]"
					><text class="span">{{item.optionCode}}</text></view>
				</view>
			</view>
	
			<!--7、选择排序-->
			<view 
				:class="{'subject_item':true,'subject_act':(subjectItem.answerArr.length==subjectItem.options.length)}" 
				v-if="subjectItem.questionType==7"
			>
				<view class="tyxz_img"><img class="img" mode="widthFix" :src="subjectItem.img" alt=""></view>
				<view 
					 class="audio_btn audio_center" 
					 @click="subjectPlayAudio(subjectItem.audio,$event)"
				>
					<image class="img" :src="imgUrl+'/ico_audio.png'" alt="">
				</view>
				<view class="answer_btn02" style="position:static;">
					<view 
						class="li"
						v-for="(item,index) in subjectItem.answerArr"
						@click="removeAnswer(index)" 
					>{{subjectItem.options[item].content}}</view>
				</view>
	
				<view class="answer_btn02 answer_btm">
					<view 
						v-for="(item,index) in subjectItem.options"
						@click="subjectChoiceFn(index)" 
						:class="['li',{'act':item.isChecked}]"
					>{{item.content}}</view>
				</view>
				<view 
					class="submit_btn"
					@click="affirmAnswer(subjectItem.answerArr.join(','))"
				>Submit</view>
			</view>
			
			
		</view>
		
		
	</view>
</template>

<script>
const app = getApp()

//获取静态题目文件
const subjectListData = require('../../../static/js/data/question-list.js').default
import {uniPopup} from '@dcloudio/uni-ui'	//导入uni-ui
// import topicType1 from './topic-type1.vue'

//创建音频
const audioObj = uni.createInnerAudioContext();
audioObj.autoplay = false;
var countTimer = null
export default {
	components:{
		uniPopup
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
				test:options.test,
				lan :options.lan,
				source:options.source
			})
			
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
			//audioObj.src = '';
			
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
				item.options.forEach(item2=>{
					item2.isPlayAudio = false
				})
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
			//return
			//监听播放结束事件
			audioObj.onEnded(()=>{
				
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
					console.log('听音选音1',_this.subjectItem.options)

					audioObj.src = audioList[audioIndex];
					var timer = setTimeout(()=>{
						if(!_this.isPauseSubject && !_this.submitStatus){
							clearTimeout(timer);
							audioObj.play();  
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
		
		//暂停/开始做题(是否播放)
		pauseSubject(){
			var _this = this;
			if(this.isPauseSubject){
				
				this.isPauseSubject = false;
				if(this.isPlayStatus){ 
					audioObj.play(); 
				}
				if(this.remainingTime<10000){ 
					this.examStatus = true;
					_this.countTime(); 
				}
			}else{
				clearInterval(countTimer);
				audioObj.pause();
				this.examStatus = false;
				this.isPauseSubject = true;
			}
		},
		
		//计算做题时间
		countTime(){
			countTimer = setInterval(()=>{
				if(this.remainingTime<=0){
					clearInterval(countTimer);
					this.skipNextSubject();	//超时进入下一题  
				}else{
					this.remainingTime -= 100;
				}
			},100);
		},
		
		//播放音频
		subjectPlayAudio(audioUrl,event){
			if(this.isFirstPlay && event){return;}	//播放状态不能重新播放
			var _this = this;
			var audioList = audioUrl.split(',');
			this.currentAudioList = audioList;
			audioObj.src = audioList[0];
			setTimeout(()=>{
				if(!this.isPauseSubject){
					audioObj.play();
					this.isPlayStatus = true;
				 }
			},100);
		},
		
		//选择答案(点击选项的索引)
		subjectChoiceFn(cIndex){
			var subjectItem = this.subjectItem;
			var subjectType = subjectItem.questionType;	//当前题目的类型
			var currentCheck = subjectItem.options[cIndex].isChecked;
			if(currentCheck || this.submitStatus){
				return;
			}else{
				subjectItem.options[cIndex].isChecked = true;
			}
			
			//完型填空题，把选项添加到题目中
			if(subjectType == 5 ){
				var isFirst = true;	
				subjectItem.contentArr.forEach((item,index)=>{
				   if(item.answerIndex==='' && isFirst){
						item.answerIndex = cIndex;
						subjectItem.contentNum++;
						if(	subjectItem.contentNum >= subjectItem.contentArr.length-1 ){
						   this.submitStatus = true;
						}
						isFirst = false;
					}
				});
				this.subjectItem = subjectItem;
				if(subjectItem.contentNum>=subjectItem.contentArr.length-1){
					
				   var  contentArr = subjectItem.contentArr.filter((item,index,arr)=>{
					   return  index<arr.length-1;
				   });
					this.choiceAnswer=contentArr.map((item,index)=>{
						return subjectItem.options[item.answerIndex].optionCode;
					}).join(',');
				}
			}
			
			//选择排序题
			if(subjectType == 7){
				subjectItem.answerArr.push(cIndex);
				this.subjectItem = subjectItem;
				if(subjectItem.answerArr.length == subjectItem.options.length){
				   this.choiceAnswer = subjectItem.answerArr.map(item=>{
					   return subjectItem.options[item].optionCode;
				   }).join(',');
				}
			}
			
			if(subjectType == 1 || subjectType == 4 || subjectType == 6){
				this.choiceAnswer = subjectItem.options[cIndex].optionCode;
				this.affirmAnswer();
			}
			
		},
		
		//判断答案是否正确(选择的选项，正确的选项)
		affirmAnswer(callback){
			
			var subjectStore = this.subjectStore;
			console.log('answer:',this.choiceAnswer,this.subjectItem.answer)
			if(this.choiceAnswer == this.subjectItem.answer){
				subjectStore = subjectStore + 0.4;
			}else{
				subjectStore = subjectStore - 0.6;
			}
			this.subjectStore = subjectStore;
			audioObj.pause();
			clearInterval(countTimer);
			this.submitStatus = true;
			this.examStatus = false;
			this.currentaudioIndex = 0;
			this.skipNextSubject();
		},
		
		//跳转下一题
		skipNextSubject(){
			console.log('跳转下一题1111')
			var _this = this;
			this.getStatisticsFn(this.tjData.shareid,this.tjData.uniqueNums)
			audioObj.pause();
			var subjectStore = this.subjectStore;
			console.log('subjectStore',subjectStore);
			//判断是否最后一题
			if(this.subjectIndex == 4){
				console.log('跳转下一题333')
				setTimeout(function(){
					
					var level = parseInt(subjectStore);
					uni.navigateTo({ url:`../result/index?level=${level}` })
					//window.location.href = `subject-result.html?shareid=1&level=${level}`;
				},1000);
				return;
			}
			console.log('跳转下一题222')
			var subjectData = this.subjectData;
			var subjectItem;
			if(subjectStore < 2){
				subjectItem = subjectData.level1[this.subjectIndex+1];
			}else if(subjectStore > 2 && subjectStore < 3){
				subjectItem = subjectData.level2[this.subjectIndex+1];
			}else{
				subjectItem = subjectData.level3[this.subjectIndex+1];
			}
			
			this.subjectIsShow = false;
			setTimeout(()=>{
				console.log('跳转下一题444')
				this.subjectIndex++;
				this.subjectIsShow = true;
				this.subjectItem = subjectItem;
				this.submitStatus = false;
				this.isFirstPlay = true;
				this.currentaudioIndex = 0;
				clearInterval(countTimer);
				this.remainingTime = 10000;
				setTimeout(()=>{
					console.log('跳转下一题555')
					_this.subjectPlayAudio(this.subjectItem.audioList);	//播放音频
				},1000);
			},1000);
		},
		
		//完形填空移除答案
		removeAnswer(cIndex){
			var subjectItem = this.subjectItem;
			var subjectType = subjectItem.questionType;	//当前题目的类型
			var answerIndex;
			if(subjectType == 5){
				answerIndex = subjectItem.contentArr[cIndex].answerIndex;
				subjectItem.contentArr[cIndex].answerIndex = '';
				subjectItem.contentNum--;
				this.submitStatus = false;
			}
			
			if(subjectType == 7){
				answerIndex = subjectItem.answerArr[cIndex];
				subjectItem.answerArr.splice(cIndex,1);	//删除当前项
			}
			
			subjectItem.options[answerIndex].isChecked = false;
			this.subjectItem = subjectItem;
		},
		
		//统计完成率
		getStatisticsFn(shareid,uniqueNums){
			this.$http({
				url:`/api/shareInfo/operate/${shareid}`,
				data:{
					uniqueNums : uniqueNums
				},
				success:(res)=>{
					console.log('统计完成率')
				}
			})
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
