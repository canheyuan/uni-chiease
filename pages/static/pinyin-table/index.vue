<template>
	<view v-if="pyData">
		
		<!--顶部-->
		<image class="pinyin_tit" :src="imgUrl+'/pinyin_tit.png'" alt="">
		<view class="pinyin_head" >
			<view class="pinyin_list" :style="`width:${pyData.yunmuLen}upx; transform:translateX(-${pLeft}px)`">
				<view 
					class="li" @click="playAudioFn2(item)"
					v-for="(item,index) in pyData.yunmu" :key="'yunmu_'+index" 
				>{{item}}</view>
			</view>
		</view>
		
		
		<view class="pinyin_mdl clearfix">
			<!-- 左侧 -->
			<view class="pinyin_side" id="pinyin_side">
				<view class="pinyin_list clearfix">
					<view 
						class="li"
						v-for="(item,index) in pyData.shengmu" :key="'shengmu_'+index" 
					>{{item}}</view>
				</view>
			</view>
			<!-- 右侧 -->
			
			<view class="pinyin_ctn" >
				<!-- <view 
					@touchstart="touchstartFn($event)" 
					@touchover="touchoverFn($event)" 
					@touchend="touchendFn($event)"
				> -->
				<scroll-view scroll-x="true" @scroll="scrollFn($event)">
					<view 
						class="pinyin_list clearfix" :style="'width:'+ pyData.yunmuLen +'upx;'"
						v-for="(smItem,smIndex) in pyData.shengmu" :key="'smItem_' + smIndex" 
					>	
						<block v-if="smItem">
							<view 
								:class="'li'" @click="openPopupFn(pyData.pinyin[smItem][ymItem])"
								v-for="(ymItem,ymIndex) in pyData.yunmu" :key="'ymItem_'+ smIndex + '_' + ymIndex" 
							>{{pyData.pinyin[smItem][ymItem]?(smItem+ymItem):'--'}}</view>
						</block>
						<block v-if="!smItem">
							<view 	
								:class="'li'" @click="openPopupFn(pyData.pinyin['ym'][ymItem])"
								v-for="(ymItem,ymIndex) in pyData.yunmu" :key="'ymItem_'+ smIndex + '_' + ymIndex" 
							>{{ymItem}}</view>
						</block>
						
					</view>
				</scroll-view>
			</view>
			
		</view>
		
		
		<!-- 拼音弹窗-->
		<uni-popup ref="pinyinPop" type="center">
			<view class="pop_mdl">
				<view class="pinyin_title">音频示范</view>
				<view class="fayin_list clearfix">
					<block v-for="item in popList">
						<view v-if="item.url" class="li" @click="playAudioFn(item.url)">{{item.val}}</view>
						<view v-if="!item.url" class="li gray">N/A</view>
					</block>
				</view>
				<view class="close_ico close_btn" @click="closePopupFn">×</view>
			</view>				
		</uni-popup>
		
		<!-- 顶部韵母拼音弹窗-->
		<uni-popup ref="pinyinPop2" type="center">
			<view class="pop_mdl">
				<view class="py_title">
					<view class="h3">{{pop2Title}}</view>
					<view class="v_ico" @click="playAudioFn2(pop2Title)"><image class="img" :src="`${imgUrl}/voice_b.png`" alt=""></view>
				</view>
				<!-- <view class="pinyin_title">音频示范</view>
				
				<view class="fayin_list clearfix">
					<block v-for="item in popList">
						<view v-if="item.url" class="li" @click="playAudioFn(item.url)">{{item.val}}</view>
						<view v-if="!item.url" class="li gray">N/A</view>
					</block>
				</view> -->
				<view class="close_ico close_btn" @click="closePopupFn2">×</view>
			</view>				
		</uni-popup>

	</view>
</template>

<script>
	
	//导入拼音表数据
	const pyData = require('../../../static/js/data/pinyin.min.js').default
	pyData.yunmuLen = pyData.yunmu.length*150
	console.log('pyData',pyData)
	pyData.shengmu.forEach((smItem,smIndex)=>{
		pyData.yunmu.forEach((ymItem,ymIndex)=>{
			//console.log(smItem,ymItem)
			if(pyData.pinyin[smItem]){
				if(!pyData.pinyin[smItem][ymItem]){
					pyData.pinyin[smItem][ymItem] = ''
				}
			}
			
		})
	})
	console.log('pyData',pyData)
	import {uniPopup} from '@dcloudio/uni-ui'	//导入uni-ui
	
	//创建音频实例
	const pinyinAudio = uni.createInnerAudioContext();
	pinyinAudio.autoplay = true;
	// pinyinAudio.onPlay(()=>{
	// 	console.log('拼音表开始播放')
	// })
	// pinyinAudio.onEnded(()=>{
	// 	console.log('拼音表停止播放')
	// })
	export default {
		components: {uniPopup},
		data() {
			return {
				imgUrl:this.$common.imgUrl,
				pyData:pyData,	//拼音表数据
				popList:[],		//弹窗某个拼音列表
				pop2Title:'',	//弹窗2title
				pLeft:0,	//顶部韵母的left值
			}
		},
		onLoad(options) {
			
		},
		methods:{
			scrollFn(event){
				console.log('监听滚动',event)
				var pLeft = event.detail.scrollLeft
				this.pLeft = pLeft
			},
			
			//打开弹窗
			openPopupFn(list){
				if(!list){return}
				this.popList = list
				this.$refs.pinyinPop.open()
			},
			
			closePopupFn(){
				this.$refs.pinyinPop.close()
				this.currentAudioUrl = ''
			},
			//播放音频
			playAudioFn(url){
				var audioUrl = this.$common.pinyinUrl + '/voice/pinyin/' + url
				//console.log('当前播放的音频地址',audioUrl)
				pinyinAudio.src = audioUrl;
				pinyinAudio.play()
			},
			
			//底部韵母播放音频
			playAudioFn2(title){
				this.pop2Title = title
				this.$refs.pinyinPop2.open()
				var audioUrl = this.$common.pinyinUrl + '/voice/pinyin/' + title + '.mp3'
				pinyinAudio.src = audioUrl;
				pinyinAudio.play()
			},
			closePopupFn2(){
				this.$refs.pinyinPop2.close()
				this.currentAudioUrl = ''
			},
			
			//滑动事件
			touchstartFn(event){
				console.log('滑动开始',event)
			},
			touchoverFn(event){
				console.log('滑动中',event)
			},
			touchendFn(event){
				console.log('滑动结束',event)
			}
		}
	}
</script>

<style>
/*------------ 拼音表 ------------*/
.pinyin_list .li{float:left; width:150upx; height:80upx; line-height:80upx; border:2upx solid #fff; background:#f3f3f3; color:#242629; text-align: center; font-size:32upx;}
.pinyin_list .li.not{color:#999; font-weight:bold;}
/*头部*/
.pinyin_tit{width:120upx; height:80upx; position:fixed; top:0; left:0; z-index:99;  border:2upx solid #fff; }
.pinyin_head{position:fixed; left:120upx; top:0; z-index:98;}
.pinyin_head .pinyin_list .li{background:#ffc10a; color:#555555;}
/*内容*/
.pinyin_mdl{overflow:auto; width:100%; height:100%; position:relative; padding-top:80upx; box-sizing: border-box;}
.pinyin_ctn {overflow:auto; position:relative; z-index:2; }
.pinyin_ctn .pinyin_list .li{background:#f3f3f3; }
.pinyin_ctn .pinyin_list:nth-child(2n) li{background:#fff; }
.pinyin_side{float:left; width:120upx; position:relative; z-index:3;}
.pinyin_side .pinyin_list .li{background:#ffc10a; color:#ff5555; width:120upx;}
/*弹窗*/
.pop_mdl{background:#fff; border-radius:10upx; padding:20upx; width:650upx; box-sizing:border-box; margin:0 auto; position:relative;}
.pop_mdl .close_ico{position:absolute; top:0; right:0; font-size:60upx; color:#666; width:80upx; height:80upx; text-align: center; line-height:80upx;}
.fayin_list .li{float:left; width:44%; height:100upx; line-height:100upx; text-align: center; background:#6fa0fa; color:#fff; font-size:36upx; border-radius:10upx; margin:0 3% 40upx; position:relative;}
.pinyin_title{font-size:36upx; padding:40upx 0 60upx; text-align: center;}
.fayin_list .li:before{display:inline-block; content:''; width:30upx; height:30upx; background:url(../../../static/images/voice_w.png) no-repeat; background-size:100% 100%; position:absolute; right:20upx; top:10upx;}
.fayin_list .li:active{background:#407eef;}
.fayin_list .li.gray{background:#e3e3e3;}
.fayin_list .li.gray:before{display:none;}
.py_title {padding:30upx 0 50upx; text-align:center;}
.py_title .h3{font-size:120upx; color:#333; font-weight: bold; margin-bottom:50upx;}
.py_title .img{width:80upx; height:80upx;}
</style>
