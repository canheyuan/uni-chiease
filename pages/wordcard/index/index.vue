<template>
   <view class="index-word">
       <!-- <div style="color:#333;">{{tip}}</div> -->
       <view class="index-word-head" v-if="unfinishedData">
           <view class="per-info">
               <image class="per-img" :src="unfinishedData.imagePath" alt="">
               <view class="info">
                   <view class="h3">{{unfinishedData.nameMulti[lan]}}</view>
                   <view class="p">{{langData.wordIndex.studySchedule[lan] + unfinishedData.percent}}</view>
                   <view class="jd"><view class="span" :style="`width:${unfinishedData.percent}`"></view></view>
               </view>
            </view>
			<view class="learn-btn" @click="gotoWordFn(unfinishedData)">
				{{langData.wordIndex.studyBtn[lan]}}<view class="i"></view>
			</view>
       </view>

       <view class="index-word-ctn clearfix" v-if="wordList">
           <view class="index-word-list" v-for="(ul,ulIndex) in [0,1]"  :key="`wordUl${ulIndex}`">
               <view 
                    v-for="(item,index) in wordList" :key="`wordList${index}`"
                    v-if="index%2==ulIndex"
                    :class="['li',item.bgClass,{'lock':item.status==0,'first':index==0}]" @click="gotoWordFn(item)"
                >
                    <view class="top">
                        <span class="percent">{{item.percent}}</span>
                        <image class="icon" :src="item.imagePath" alt="">
                        <image v-if="item.subitem==0" class="ico_lock" :src="imgUrl+'/word/ico_lock.png'" alt="">
                        <view v-if="item.masteryNum<item.subitem" class="jd"><view class="span" :style="`width:${item.percent}`"></view></view>
                        <image v-if="item.masteryNum==item.subitem && item.subitem!=0" class="ico_right" :src="imgUrl+'/word/ico_right.png'" alt="">
                    </view>
                    <view class="btm">{{item.nameMulti[lan]}}</view>
                </view>
           </view>
       </view>
   </view>
</template>

<script>
const app = getApp()
const lexiconData = require('../../../static/js/data/lexiconData.js').default

export default {
	data () {
		return {
			imgUrl:app.globalData.imgUrl,
			langData:app.globalData.langData,	//语言文件
			lan:app.globalData.lan,	//当前语言
			
			shareId:'',
            wordList:[],
            unfinishedData:null
		}
    },

    
    onLoad(options){
		this.shareId = options.shareid || ''	//获取分享id
		console.log('options.category',options.category)
		app.globalData.categoryType = options.category?options.category:''
		
		//获取地址通用参数
		this.$common.pageLoadFn(options,()=>{
			this.onloadFn()
		})
    },

    mounted(){
		
    },
    
    methods:{
		
		onloadFn(){
			if(app.globalData.source == 'app'){	//判断是app还是H5打开
			    //设置页面标题栏
			    var param = {
			        title: this.langData.wordIndex.title[this.lan]
			    }
			    if(!app.globalData.test){
			        Shell.setPageTitle(JSON.stringify(param));
			    }
			    if(app.globalData.sid){
			        this.getAPPWordList();
			    }
			}else{
			    this.getH5WordList();
			    if(this.shareId){
			        this.getShareDetail(this.shareId);
			    }
			}
		},
		
        //查询分享信息(别人分享出来的才需要加载这个接口)
        getShareDetail(shareId){
			console.log('查询分享信息')
            var _this = this;
            this.$http({
                url:`/shareInfo/wordCardShareInfo/${shareId}`,
                success:(res)=>{
					console.log('查询分享信息：',res.data)
					_this.lan = res.data.lan
                },
                error(res){
                    console.log('查询分享信息失败')
                }
            });
        },

        //跳转到单词练习
        gotoWordFn(data){
            if(data.subitem>0){
				app.globalData.nowWordTopicData = data
				uni.navigateTo({ url:'/pages/wordcard/exercise/index?listid=' + data.listId })
            }
        },

        //APP获取首页词卡列表
        getAPPWordList(){
			console.log('APP获取首页词卡列表')
            var _this = this;

			//category类型：(beginner:零基础（默认），bridge：汉语桥)
            var category = app.globalData.categoryType
			_this.$http({
				url:`/api/lexiconList/getLexiconList${category?('?category='+category):''}`,
				data:{
					pageNum:1,
					pageSize:40,
				},
				method:'post',
				success:(res)=>{
					var list = res.data;
					list.forEach((item,index)=>{
					    //masteryNum：已完成题目，subitem：题目总数
					    item.percent = (item.subitem==0?0:parseInt(100*item.masteryNum/item.subitem)) + '%';
					    
					    item.bgClass = 'bg0' + (index%6+1);
					    //item.link = 'topicIndex/' + item.listId;
					
					    if(item.masteryNum < item.subitem && !_this.unfinishedData){
					        _this.unfinishedData = item;
					        //console.log('unfinishedData',_this.unfinishedData)
					    }
					})
					//若全部完成，头部就显示第一个
					if(!_this.unfinishedData){
					    _this.unfinishedData = list[0]
					}
					_this.wordList = list;
				}
			})
        },

        //H5获取首页词卡
        getH5WordList(){
            var _this = this;
             //console.log('indexList:h5')
            var list = lexiconData.lexiconList;
                list.forEach((item,index)=>{
                //masteryNum：已完成题目，subitem：题目总数
                item.percent = '0%'
                item.masteryNum = 0
                item.bgClass = 'bg0' + (index%6+1)
                item.link = '../exercise/index'
                if(!_this.unfinishedData){
                    _this.unfinishedData = item
                }
            })
            _this.wordList = list;
        }
    }
};
</script>

<style lang="scss">
page{background:#F0F0F0;}
/* 头部 */
.index-word{background:#F0F0F0; min-height:100%;}
.index-word-head{height:490upx; background:url(~@/static/images/word/index_head_bg.png) no-repeat center center; background-size:100% 100%; margin-bottom:80upx; position: relative;}
.per-info{overflow: hidden; padding:130upx 30upx 0;}
.per-info .per-img{float:left; width:240upx; height:240upx; margin-right:20upx;}
.per-info .info{overflow: hidden;}
.per-info .info .h3{font-size:50upx; line-height:72upx; height:72upx; color:#fff; padding-top:20upx; margin-bottom:60upx;}
.per-info .info .p{font-size:26upx; line-height:42upx; color:#fff; margin-bottom:15upx;}
.per-info .info .jd{width:280upx; height:16upx; background:rgba(0, 0, 0, .2); border-radius:8upx; padding:2upx; }
.per-info .info .jd .span{display:inline-block; float:left; border-radius:60upx; height:12upx; background:#fff;}
.learn-btn{display:block; width:630upx; height:100upx; line-height:100upx; text-align: center; font-size:34upx; color:#307DBA;  border-radius:50upx; position: absolute; left:50%; bottom:-40upx; margin-left:-315upx; background:#fff; box-shadow:0 0 24upx 8upx rgba(0,0,0,.1);}
.learn-btn .i{display:inline-block; width:30upx; height:30upx; background:url(~@/static/images/word/ico_tri.png) no-repeat; background-size:100%; margin-left:20upx; position: relative; top:4upx;}
.learn-btn:active{opacity: .8;}

.index-word-ctn{padding:0 15upx; overflow: hidden;}
.index-word-list{float:left; width:48%; margin:0 1%;
	.li{
		width:100%; height:400upx; background:url(~@/static/images/word/index_item_bg01.png) #fff no-repeat center top; 
		background-size:100% 310upx; border-radius:10upx; overflow: hidden; text-align: center; margin-bottom:30upx; 
		.top{width:100%; height:310upx; box-sizing: border-box; padding-top:70upx; position: relative;
			.percent{font-size:28upx; line-height:40upx; display:inline-block; position: absolute; top:20upx; right:20upx; color:#fff;}
			.icon{display:block; width:140upx; height:140upx; margin:0 auto;}
			.ico_lock{width:28upx; height:34upx; display:inline-block; margin-top:40upx; position: absolute; bottom:25upx; left:50%; margin-left:-14upx;}
			.ico_right{width:36upx; height:36upx; display:inline-block; margin-top:40upx;  position: absolute; bottom:25upx; left:50%; margin-left:-18upx;}
			.jd{width:250upx; height:16upx; background:rgba(0, 0, 0, .15); border-radius:8upx; position: absolute; left:50%; bottom:35upx; margin-left:-125upx; padding:2upx;}
			.jd .span{float:left; border-radius:6upx; height:12upx; background:#fff;}
		}
		.btm{height:90upx; line-height:90upx; font-size:32upx; color:#444444; }
	}
	.li.bg01{background-image:url(~@/static/images/word/index_item_bg01.png);}
	.li.bg02{background-image:url(~@/static/images/word/index_item_bg02.png);}
	.li.bg03{background-image:url(~@/static/images/word/index_item_bg03.png);}
	.li.bg04{background-image:url(~@/static/images/word/index_item_bg04.png);}
	.li.bg05{background-image:url(~@/static/images/word/index_item_bg05.png);}
	.li.bg06{background-image:url(~@/static/images/word/index_item_bg06.png);}
	.li.lock .top .icon{opacity:.3;}
	
	.li.first{height:470upx; background-image:url(~@/static/images/word/index_item_first.png); background-size:100% 380upx;}
	.li.first .top{padding-top:100upx; height:380upx;}
}
</style>
