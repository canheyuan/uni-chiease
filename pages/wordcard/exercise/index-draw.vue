<template>
  <view class="topic-page" >
          <!-- 看词选图:type=1 -->
          <topic-choice @successFn='successFn' v-if='subjectStatus==1 && subjectActData.type==1' :topicData='subjectActData' :lan="lan"></topic-choice>
  
           <!-- 排序题:type=2 -->
          <topic-sort @successFn='successFn' v-if='subjectStatus==1 && subjectActData.type==2' :topicData='subjectActData' :lan="lan"></topic-sort> 
  
          <!-- 判断题:type=3 -->
          <topic-judge @successFn='successFn' v-if='subjectStatus==1 && subjectActData.type==3'  :topicData='subjectActData' :lan="lan"></topic-judge>
          
          <!-- 单词介绍 -->
          <topic-intro @gotoTopic='gotoTopic' v-if="subjectStatus==0" :topicData='subjectActData' :lan="lan"></topic-intro>
  
          <!-- 成功 -->
          <topic-success @afterSuccessFn="afterSuccessFn" v-if='subjectStatus==2' :lan="lan"></topic-success>
  
          <!-- 单词答案 -->
          <topic-answer @answerResult="answerResult"  v-if="subjectStatus==3" :topicData='subjectActData' :lan="lan"></topic-answer>
		  
		  <!-- 进度条 -->
		  <view class="topic-progress">
			 <view class="progress-num">{{progressNum}}%</view>
			 <view class="progress"><view class="span" :style="`width:${progressNum}%;`"></view></view>
		  </view>
  
		<!-- 退出按钮 -->
		<view class="close-page word-icons" @click='popupShowFn("outPopup",true)'></view> 
		
		<!-- 退出提示弹窗 -->
		<uni-popup ref="outPopup" type="center">
			<view class="close-page-tip-pop">
				<view class="close" @click='popupShowFn("outPopup",false)'><image class="img" :src="imgUrl+'/word/ico-close2.png'" alt=""></view>
				<view class="title">{{langData.wordTopic.outTitle[lan]}}</view>
				<view class="p">{{langData.wordTopic.outTip[lan]}}</view>
				<view class="pop_btn01"  @click='popupShowFn("outPopup",false)'>{{langData.wordTopic.continueBtn[lan]}}</view>
				<view class="pop_btn02" @click="resetSubject" >{{langData.wordTopic.resetBtn[lan]}}</view>
				<view class="pop_btn03" @click='gobackFn'>{{langData.wordTopic.outBtn[lan]}}</view>
			</view>
		</uni-popup>
		  
		  <!-- 所以题目完成提示弹窗 -->
		  <uni-popup ref="finishPopup" type="center">
			  <view class="close-page-tip-pop">
				  <view class="title">{{langData.wordTopic.finishTitle[lan]}}</view>
				  <view class="p">{{langData.wordTopic.finishTip[lan]}}</view>
				  <view class="pop_btn01"  @click='resetSubject'>{{langData.wordTopic.continueBtn[lan]}}</view>
				  <view class="pop_btn02" @click="gobackFn" >{{langData.wordTopic.outBtn2[lan]}}</view>
			  </view>
		  </uni-popup>
		  <!-- <audio ref="audioObj" :src="subjectActData?subjectActData.voiceUrl:''"></audio> -->
		  
	</view>
</template>

<script>
const app = getApp();
import uniPopup from "@/components/uni-popup/uni-popup.vue"
const lexiconData = require('@/static/js/data/lexiconData.js').default	 //静态题目
import topicChoice from './tpl-choice'
import topicSort from './tpl-sort'
import topicJudge from './tpl-judge'
import topicAnswer from './tpl-answer'
import topicIntro from './tpl-intro'
import topicSuccess from './tpl-success'

//创建音频实例
const audioObj = uni.createInnerAudioContext();
//audioObj.src = 'https://test.5ideachinese.com/res/voice/2019/08/a3cbd505c7734816d3787c227985ca08.mp3'
audioObj.autoplay = false;
export default {
    components: {
		uniPopup,
		'topic-choice'	: topicChoice,
		'topic-sort'	: topicSort,
		'topic-judge'	: topicJudge,
		'topic-answer'  : topicAnswer,
		'topic-success' : topicSuccess,
		'topic-intro'   : topicIntro
    },
	name: 'wordIndex',
	data () {
		return {
            imgUrl:app.globalData.imgUrl,
            langData:app.globalData.langData,	//语言文件
            lan:app.globalData.lan,	//当前语言
			listId:'',	//地址传来的listId
			isOutPopShow : false, //退出提示弹窗是否显示
			isFinishPopShow:false,  //题目已全部完成提示弹窗

			//progressNum:0,      //做题进度
			//记录做过的题目
			recordData:{
				listId:'',
				studyItem:[]
			},    
			//模拟题目接口数据
			//batchNum:1,         //分页索引
			batchSize:10,       //分页数量
			subjectDatas:null,  //接口题目列表信息
			subjectActData:null,   //存储当前题目信息
			subjectIndex:0,     //当前题目索引
			
			//当前题目状态（0：显示题目介绍，1：做题中，2：成功中，3：显示题目结果）
			subjectStatus:-1,	
			isFirst:true

		}
    },
	onLoad(options){
		
		this.listId = options.listid || ''	//获取listId
		this.recordData.listId = options.listid || ''	//获取listId
		
		//获取地址通用参数
		this.$common.pageLoadFn(options,()=>{
			this.onloadFn()
		})
	},
	
	//节点完成后执行
	mounted(){
		
		//使用事件监听方式捕捉事件
		audioObj.onEnded(()=>{
			// console.log('this.subjectStatus',this.subjectStatus)
			// if(this.subjectStatus==3){
			// 	this.answerResult();
			// 	// setTimeout(()=>{
			// 	// 	this.answerResult();
			// 	// },500)
			// }
		},false);
	},
	
	//计算属性
	computed: {
		progressNum(){  //计算做题进度条
			return this.subjectDatas?parseInt(100*this.subjectDatas.masterLexiconNum/this.subjectDatas.totalLexiconNum):0;
		}
	},
	
	methods:{
		
		//进入页面后加载
		onloadFn(){
			console.log('onLoadFn:',app.globalData)
			if(app.globalData.source == 'app'){
				//设置页面标题栏
				var param = {
					title: this.langData.wordTopic.title[this.lan]
				}
				Shell.setPageTitle(JSON.stringify(param));
				this.getTopicList(true);
			}else{
				this.getH5TopicList();
			}
		},

		//获取词卡练习列表
		getTopicList(isReach,callback){
			var _this = this;
			console.log(this.listId)
			_this.$http({
				method:"post",
				url:'/api/lexiconList/getLexiconListSubject',
				headerType:'application/x-www-form-urlencoded',	
				data:{
					listId:this.listId,
					//batchNum:this.batchNum,
					batchSize:this.batchSize
				},
				success:(res)=>{
					
					//console.log('词卡首页列表：',res.data.data);
					// if(res.data.data.totalSubjectNum == 0){
					//     return;
					// }
					var datas = res.data;
					datas.subject.forEach((item,index)=>{
						//处理添加交互需要的一些参数
						switch(item.type){
							case 1:
								item.options.forEach(item2=>{
									item2.hover = false;
									item2.id = 'topic_' + item2.answer;
									if(item.answer == item2.answer){
										item.imgUrl = item2.imgUrl;
									}
								});
								break;

							case 2:
								item.options.forEach(item2=>{
									//left:'0',  top:'0',x:'0',y:'0',show:true,hover:false
									item2.hover = false; 
									item2.show = true;
									item2.left = 0; 
									item2.top = 0;
									item2.x = 0; 
									item2.y = 0;
									item2.id = 'topic_' + item2.answer;
								});
								break;

							case 3:
								item.options = [
									{answer:'false', id:'mistakeBtn', hover:false},
									{answer:'true', id:'correctBtn', hover:false},
								]
								break;
						}
					})
					datas.subject = isReach ? datas.subject : this.subjectDatas.subject.concat(datas.subject);  //合并数组
					this.subjectDatas = datas;
					this.subjectIndex = 0;
					this.subjectActData = datas.subject[0];
					this.subjectStatus = 0 
					console.log('233:',datas,this.subjectActData)
					audioObj.src = this.subjectActData.voiceUrl	//设置音频地址
				   
				   
					if(datas.subject.length==0){    //当第一次获取的数据为0时，弹出已完成弹窗
						this.isFinishPopShow = true;
					}
					callback && callback();
				},
				error:(res)=>{
					console.error('题目列表获取失败：',res);
				}
			})
		},

		//获取静态题目数据
		getH5TopicList(){
			var datas = lexiconData.lexiconData
			datas.subject.forEach((item,index)=>{
				//处理添加交互需要的一些参数
				switch(item.type){
					case 1:
						item.options.forEach(item2=>{
							item2.hover = false;
							item2.id = 'topic_' + item2.answer;
							if(item.answer == item2.answer){
								item.imgUrl = item2.imgUrl;
							}
						});
						break;

					case 2:
						item.options.forEach(item2=>{
							//left:'0',  top:'0',x:'0',y:'0',show:true,hover:false
							item2.hover = false
							item2.show = true
							item2.left = 0
							item2.top = 0
							item2.x = 0
							item2.y = 0
							item2.id = 'topic_' + item2.answer;
						});
						break;

					case 3:
						item.options = [
							{answer:'false', id:'mistakeBtn', hover:false},
							{answer:'true', id:'correctBtn', hover:false},
						]
						break;
				}
			})
			
			this.subjectDatas = datas
			this.subjectIndex = 0
			this.subjectActData = datas.subject[0]
			this.subjectStatus = 0
			audioObj.src = this.subjectActData.voiceUrl	//设置音频地址
			console.info('题目列表：',datas)
		},

		//介绍页跳转到题目
		gotoTopic(){
			//alert('介绍页跳转到题目')
			if(this.isFirst){	//IOS需要触发下才能播放
				this.isFirst = false
				audioObj.play()
				audioObj.stop()
			}
			
			console.log('介绍页跳转到题目')
			this.subjectStatus = 1
		},
		
		//回答正确
		successFn(topicType){
			var _this = this;
			this.subjectStatus = 2
			var nowStudyItem = {
				"lexiconId" : this.subjectActData.lexiconId,
				"type": this.subjectActData.type,
				"result": "Y"
			}
			this.recordData.studyItem.push(nowStudyItem)
			
			//判断保存答案记录
			this.judgeWordFinish(this.subjectActData)
		},
		
		//正确图标提示后显示答案播放音频
		afterSuccessFn(){
			//抽奖词卡
			this.answerResult()
			return
			this.subjectStatus = 3	//显示答案状态
			//alert('audioObj.src:'+audioObj.src)
			console.log('播放1111')
			audioObj.play()
		},
		
		
		//成功后显示答案
		answerResult(){
			var _this = this
			//判断是否当前分页最后一题
			if( _this.subjectIndex == _this.subjectDatas.totalSubjectNum-1){
				console.log('answerResult222')
				var masterLexiconNum = _this.subjectDatas.masterLexiconNum      //当前题目加载总数
				var totalLexiconNum = _this.subjectDatas.totalLexiconNum   //单词总数

				//判断是否还有题目，有加载题目，没有跳结果页
				if(masterLexiconNum < totalLexiconNum){
					_this.getTopicList(true,()=>{

						//判断有没音频文件
						console.log('成功后显示答案',_this.subjectActData)
						if(_this.subjectActData && _this.subjectActData.voiceUrl){
							 setTimeout(()=>{
								 _this.subjectStatus = 0;
								 console.log('播放222')
								 audioObj.play();
							},1000);  //播放音频
						}

					});
				}else{
					//提交题目记录数据
					uni.setStorageSync('drawTimes',1)
					uni.navigateTo({ url : '/pages/wordcard/result/index-draw'})
				}
				
			}else{
				
				_this.subjectIndex++;
				_this.subjectActData = _this.subjectDatas.subject[_this.subjectIndex]
				audioObj.src = _this.subjectActData.voiceUrl	//设置音频地址
				
				//判断当前词语是否做过题目
				var isDo = false;
				_this.recordData.studyItem.forEach(item2=>{
					if(item2.lexiconId == _this.subjectActData.lexiconId){
						isDo = true;
					}
				})
				if(isDo){
					//console.log('isDo_yes');
					_this.subjectStatus = 1;
				}else{
					//console.log('isDo_no');
					_this.subjectStatus = 0;
					
					if(_this.subjectActData && _this.subjectActData.voiceUrl){
						setTimeout(()=>{
							console.log('播放333')
								audioObj.play();
						},1000);  //播放音频
					}
				}
			}
		},

		//判断当前词卡题型是否全部完成
		judgeWordFinish(subjectItemData){
			var num = 0;
			var numTotal = 0;
			var studyItems = this.recordData.studyItem;

			if(studyItems.length>0){
				studyItems.forEach(item=>{
					if(item.lexiconId == subjectItemData.lexiconId){
						num++;
						numTotal = subjectItemData.subjectNum;
					}
				})

				//当单词题型数等于总数时，提交数据，并清除记录
				var b = (num < numTotal || numTotal==0)?false:true;
				if(b){
					this.topicFinish(this.recordData,()=>{
						this.recordData.studyItem = this.recordData.studyItem.filter(item=>{
							return item.lexiconId != subjectItemData.lexiconId
						});
					});
				}
			}
		},

		//提交题目已做
		topicFinish(data,callback){
			var _this = this;
			if(app.globalData.source=='app'){
				_this.$http({
					method:"post",
					url:'/api/lexiconList/submitSubjectResult',
					data:data,
					success:(res)=>{
						this.subjectDatas.masterLexiconNum++;
						callback && callback();
					},
					error:(res)=>{
						callback && callback();
						console.error('提交完成失败',res);
					}
				},_this)
			}else{
				this.subjectDatas.masterLexiconNum++;
				callback && callback();
			}
		},

		
		//重新开始,重置题目
		resetSubject(popupStatus){
			var _this = this;
			if(app.globalData.source=='app'){
				_this.$http({
					method:"post",
					url:'/api/lexiconList/resetMasterNum',
					params:{
						listId : this.listId
					},
					success:(res)=>{
						//this.batchNum = 1;
						this.subjectIndex = 0;
						this.getTopicList(true);
						this.popupShowFn("outPopup",false); //关闭弹窗
					},
					error:(res)=>{
						console.error('重置题目信息失败',res);
					}
				},_this)
			}else{
				this.subjectIndex = 0;
				this.subjectDatas.masterLexiconNum = 0
				this.getH5TopicList();
				this.popupShowFn("outPopup",false); //关闭弹窗
			}
		},

		//退出词卡联系，返回上一页
		gobackFn(){
			//console.log('路由router对象：',this.$router,this.recordData);
			uni.navigateBack()
			//this.$router.back(-1);
		},	
		
		//popup显示、关闭中奖弹窗
		popupShowFn(popName,b,cbOk){
			if(b){
				this.$refs[popName].open()
			}else{
				this.$refs[popName].close()
			}
			//cbOk && cbOk(b)
			if(cbOk){ cbOk(b) }
		},
		
		//打开、关闭提示弹窗
		outTipPopFn(obj){
			//console.log('outTipPopFn',obj)
			this[obj] = !this[obj];
		},
		
	}

};
</script>

<style lang="scss">
@import 'exercise.scss';
</style>
<!-- 
	//与之前的有哪些调整
	1、完成后跳转的结果页不同
	2、跳转结果前，先缓存抽奖次数
	3、afterSuccessFn 里不显示答案，直接跳过
	uni.setStorageSync('drawTimes',1)
	uni.navigateTo({ url : '/pages/wordcard/result/index-draw'})
 -->