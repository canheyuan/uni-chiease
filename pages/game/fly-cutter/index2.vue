<template>
	<view class="game_box">
		
		<!-- 加载显示 -->
		<view class="begin_box" v-if="false">
			<view class="load_txt">Loading......0% </view>
		</view>
		
		
		<!-- 游戏画布 -->
		<view class="game_canvas_box">
			<canvas 
				class="game_canvas" type="2d" 
				canvas-id="gameCanvas" disable-scroll="true"
				@touchstart="touchstartFn"
			></canvas>
			<!-- 顶部分数 -->
			<view class="game_top">
				<view class="num1"><image class="img" :src="imgUrl+'/game/king.png'"></image>{{bestScore}}</view>
				<view class="num2">{{sumScore}}</view>
				<view class="change_btn" v-if="sumScore==0" @click="chooseImgFn">替换图片</view>
			</view>
		</view>
		
		<!-- 开始游戏 -->
		<uni-popup ref="gameStart" :animation="false" type="center">
			<view class="game_start">
				<text class="des">点击屏幕发射飞刀击中木板
				越击中中心，获得分数越高</text>
				<view class="btn" style="margin-bottom:60upx;" v-if="sumScore==0" @click="chooseImgFn">上传解恨对象</view>
				<view class="btn"  @click="startGameFn">开始游戏</view>
			</view>
		</uni-popup>
		
		<!-- 游戏结束 -->
		<uni-popup ref="gameOver" :animation="false" type="center">
			<view class="game_over_box">
				<image v-show="bestScore<sumScore" class="new_img" mode="widthFix" :src="imgUrl + '/game/highest-4.png'"></image>
				<view v-show="bestScore>=sumScore" class="tit">游戏结束 </view>
				<view class="des">你在小李飞刀中得了 {{sumScore}} 分，真是太棒了，再练练就能得心应手了</view>
				<view class="btn" @click="resetGameFn">再试一次</view>
			</view>			
		</uni-popup>

		<!-- 图片生成 -->
		<view style="position:fixed; top:100upx; left:-10000upx; z-index:100;">
			<canvas 
				canvas-id="createImg"  type="2d"  
				:style="`width:${createImgData.w}px; height:${createImgData.h}px; background:#eee;`"
			></canvas>
		</view>
	</view>
</template>
<script>
	
	//knife.dir:0不移动，1左移，2右移，3上移，4下移
	//circle.dir:0不移动，1左移，2右移，3上移，4下移
	//gameStatus:0未开始游戏，1左右移动，2点击前到插入板砖前，3插入板砖后消失前,  4游戏结束
	const app = getApp()
	const canvasFn = require('@/static/js/canvas.js').default
	console.log('canvasFn',canvasFn)
	var s , w , h, imgUrl	//浏览器 比例、宽、高、图片地址前缀
	var ctx = null
	const audio01 = uni.createInnerAudioContext();	//小刀上移
	const audio02 = uni.createInnerAudioContext();	//小刀击中木板（1分以上）
	const audio03 = uni.createInnerAudioContext();	//失败结束音效
	const audio04 = uni.createInnerAudioContext();	//破纪录
	const audio05 = uni.createInnerAudioContext();	//小刀击中木板(1分)
	audio01.src = app.globalData.apiUrl + '/static/media/game/throw.mp3'
	audio02.src = app.globalData.apiUrl + '/static/media/game/insert.mp3'
	audio03.src = app.globalData.apiUrl + '/static/media/game/shibai.mp3'
	audio04.src = app.globalData.apiUrl + '/static/media/game/su1.mp3'
	audio05.src = app.globalData.apiUrl + '/static/media/game/hit.mp3'
	
	import {uniPopup} from '@dcloudio/uni-ui'	//导入uni-ui
	//pinyinAudio.autoplay = false;
	export default{
		components: {uniPopup},
		data (){
			return {
				imgUrl:app.globalData.imgUrl,
				
				knifeTimes:0,	//点击小刀次数
				isStop:false,	//是否暂停动画
				gameStatus:0,	//当前游戏状态
				elAlpha:1,		//击中模板后的透明度
				firstPlay:true,	//游戏中是否第一次播放破纪录音频
				
				addScore:1,		//添加的分数
				sumScore:0,		//当前获得的分数
				bestScore:0,	//最高记录
				
				knife2:	{ x:0, y:0, w:20, h:40 },	//小刀2
				knife:	{ x:0, y:0, w:20, h:80, dir:0, speed:5,  rotate:0,},	//小刀
				circle:	{ x:0, y:0, w:333,h:163,dir:0, speed:5 , img:''},	//板砖
				
				canvasImg2:'',
				createImgData:{
					w:200,
					h:200
				}
			}
		},
		
		onLoad(){
			var stytemInfo = uni.getSystemInfoSync()
			w = stytemInfo.screenWidth
			h = stytemInfo.screenHeight
			s = stytemInfo.screenWidth/750
			imgUrl = this.imgUrl
		},
		
		onReady(){
			ctx = uni.createCanvasContext('gameCanvas',this)
			this.bestScore = uni.getStorageSync('flyGameBestScore') || 0
			this.beginGameFn()
			
			this.$refs.gameStart.open()
			//this.$refs.gameOver.open()
		},
		
		methods:{
			
			
			//点击开始游戏
			startGameFn(){
				this.gameStatus = 1
				this.$refs.gameStart.close()
			},
			
			//首次加载
			beginGameFn(){
				this.randomCircle(1)
				this.drawKnife(true)
				this.drawCanvas()
			},
			
			//点击事件
			touchstartFn(){
				switch(this.gameStatus){
					case 1:	//首次点击
						this.knife.dir = 3
						this.knifeTimes += 1
						audio01.play()
						window.requestAnimationFrame(this.knifeRun)
						break;
					case 2:	//上移中
						this.knife.dir = 3
						this.knifeTimes += 1
						audio01.play()
						break;
					case 3:	//击中木板
						
						break;
					// case 4:	//重新开始
					// 	if(this.elAlpha < 0){
					// 		this.knifeTimes = 0
					// 		this.isStop = false
					// 		this.gameStatus = 2
					// 		this.elAlpha = 1
					// 		this.firstPlay = true
					// 		this.knife.dir = 0
					// 		this.knife.rotate = 0
					// 		if(this.sumScore > this.bestScore){
					// 			this.bestScore = this.sumScore
					// 		}
					// 		this.sumScore = 0
					// 		this.randomCircle(1)
					// 		this.drawKnife(true)
					// 		window.requestAnimationFrame(this.knifeRun)
					// 	}
					// 	break;
				}
			},
			
			//重新开始
			resetGameFn(){
				
				this.knifeTimes = 0
				this.isStop = false
				this.gameStatus = 2
				this.elAlpha = 1
				this.firstPlay = true
				this.knife.dir = 0
				this.knife.rotate = 0
				if(this.sumScore > this.bestScore){
					this.bestScore = this.sumScore
				}
				this.sumScore = 0
				this.randomCircle(1)
				this.drawKnife(true)
				this.$refs.gameOver.close()
				window.requestAnimationFrame(this.knifeRun)
			},
			
			//绘画长刀元素(isDf:true表示回到默认位置)
			drawKnife(isDf){
				if(isDf){
					this.knife.x = w*.5-20*s
					this.knife.y = h*.7
				}else{
					var knife = this.knife
					canvasFn.rotate(ctx,knife.x + knife.w/2, knife.y + knife.h/2, knife.rotate,()=>{
						ctx.drawImage(this.imgUrl + '/game/knife-1.png', knife.x, knife.y, knife.w, knife.h)
					})
				}
			},
			//绘画短刀元素
			drawKnife2(){
				var knife = this.knife2
				ctx.drawImage(this.imgUrl + '/game/knife-4.png', knife.x, knife.y, knife.w, knife.h)
			},
			
			//随机生成板砖大小、位置(scale=1表示默认大小位置)
			randomCircle(scale){
				var circleData = this.circle
				var knifeTimes = this.knifeTimes < 100 ? this.knifeTimes : 100
				var sCir = scale?scale:(.7 + .3*Math.random()*(1 - knifeTimes/100)) //随机生成一个比例(随点击次数的增加，板砖会越来越小)
				circleData.x = (scale==1)?(w*0.5-166*s):((w - 333*s*sCir)*Math.random())
				circleData.y = (scale==1)?(h*.15):((h*.15) + h*(Math.random()*2)/10)	//生成一个20-50%之间的随机数
				circleData.w = 333*s*sCir
				circleData.h = 163*s*sCir
				this.circle = circleData
			},
			//板砖水平移动
			circleRun(){
				var circleData = this.circle
				switch(circleData.dir){
					case 1:	//左移
						this.circle.x = circleData.x - circleData.speed
						if(circleData.x <= 0){ this.circle.dir = 2}
						break;
					case 2:	//右移
						this.circle.x = circleData.x + circleData.speed
						if(circleData.x >= w - this.circle.w){ this.circle.dir = 1}
						break;
				}
			},
			//绘画板砖元素
			drawCircle(){
				(this.circle.dir==1 || this.circle.dir==2) && this.circleRun()	//板砖移动
				var circle = this.circle
				ctx.drawImage(imgUrl + '/game/circle-2-6.png',circle.x, circle.y, circle.w, circle.h)
				
				if(circle.img){
					ctx.drawImage(circle.img, circle.x+circle.w*.07, circle.y+circle.h*.18, circle.w*.86, circle.h)	//自定义图片
				}
			},
			
			
			//绘画整个画布
			drawCanvas(){
				//每次绘画前先清除画布
				ctx.clearRect(0,0,w,h)
				//顶部分数
				// canvasFn.font(ctx,this.sumScore, w*0.5, 40, 40,'#ffffff','center')
				// ctx.drawImage(this.imgUrl + '/game/king.png', 16,14,30,20)
				// canvasFn.font(ctx,this.bestScore, 50, 36, 28,'#fff','left')
				
				switch(this.gameStatus){
					case 3:	//插入板砖时
						canvasFn.alpha(ctx,this.elAlpha,1,()=>{
							this.drawCircle()
							if(this.addScore > 0){
								canvasFn.font(ctx,'+' + this.addScore, this.circle.x+this.circle.w/2, this.circle.y-30, 26,'#fff','center')
							}
							this.drawKnife2()	//小刀2
						})
						break;
						
					case 4:	//游戏结束
						this.drawCircle()
						// canvasFn.alpha(ctx,1-this.elAlpha,1,()=>{
						// 	var boxH = h/2 - 90
						// 	canvasFn.font(ctx,'游戏结束 ' + (this.sumScore>this.bestScore?'新纪录':''), w/2,boxH, 40,'#000','center')
						// 	canvasFn.font(ctx,`你在小李飞刀中得了 ${this.sumScore} 分，真是` , w/2,boxH + 50, 22,'#000','center')
						// 	canvasFn.font(ctx,`太棒了，再练练就能得心应手` , w/2,boxH+90, 22,'#000','center')
						// 	ctx.strokeRect( w/2-100,boxH+140,200,40)
						// 	canvasFn.font(ctx,`再来一次` , w/2,boxH+160, 20,'#000','center','middle')
						// })
						break;
					default:
						this.drawKnife()	//小刀1
						this.drawCircle()	//板砖
				}
				ctx.draw()
			},
			
			
			//小刀移动
			knifeRun(){
				var knifeData = this.knife
				switch(knifeData.dir){
					case 1:	//左移
						this.knife.x = knifeData.x - knifeData.speed
						if(knifeData.x <= 0){ this.knife.dir = 2}
						break;
						
					case 2:	//右移
						this.knife.x = knifeData.x + knifeData.speed
						if(knifeData.x >= w - this.knife.w){ this.knife.dir = 1}
						break;
						
					case 3:	//上移
						if(this.knife.y > (this.circle.y + 70)){	//小刀和砖板不重叠重叠时小刀上移
							this.knife.y = knifeData.y - 20
							this.knife.rotate = (this.knife.rotate + 20)%360
							
						}else{	//小刀和砖板重叠时
							this.circle.dir = 0	//板砖不移动
							if(!this.checkHitFn()){	//未击中
								audio03.play()
								if(this.knife.y < -this.knife.h){
									
									this.gameStatus = 4
									this.isStop = true
									if(this.sumScore>this.bestScore){
										uni.setStorageSync('flyGameBestScore',this.sumScore)
									}
									this.$refs.gameOver.open()
									
									
									// if(this.elAlpha > 0){
									// 	this.elAlpha -= .01
									// }else{
									// 	console.log('this.isStop',this.isStop)
									// 	this.isStop = true
									// 	if(this.sumScore>this.bestScore){
									// 		uni.setStorageSync('flyGameBestScore',this.sumScore)
									// 	}
									// }
									
								}else{	
									this.knife.y = knifeData.y - 20
									this.knife.rotate = (this.knife.rotate + 20)%360
								}
							}else{	
								if(this.elAlpha==1){
									audio01.stop()
									if(this.addScore==1){
										audio05.play()
									}else{
										audio02.play()
									}
									this.sumScore += this.addScore
									if(this.sumScore > this.bestScore && this.firstPlay){
										this.firstPlay = false
										setTimeout(()=>{
											audio04.play()
										},500)
									}
								}
								this.elAlpha -= .02
								if(this.elAlpha <= 0){
									//下一次
									this.gameStatus = 2
									this.elAlpha = 1
									this.knife.dir = 1
									this.knife.rotate = 0
									this.randomCircle()
									this.drawKnife(true)
									if(this.knifeTimes>5){	//第五次后才有木板移动
										var knifeTimes = this.knifeTimes<80?this.knifeTimes:80
										this.circle.dir = parseInt(Math.random()*100) < knifeTimes?2:0
										this.knife.speed = 5 + (parseInt(knifeTimes/5)<10?parseInt(knifeTimes/5):10)
									}
								}else{
									//击中板砖后渐变消失时
									this.gameStatus = 3
									this.knife2.x = this.knife.x
									this.knife2.y = this.circle.y + this.circle.h*.65
								}
							}
	
						}			
						break;
				}
				
				this.drawCanvas()
				if(!this.isStop){window.requestAnimationFrame(this.knifeRun)}
			},
			
			
			
			//监听是否击中木板（addScore>0表示击中）
			checkHitFn(){
				var knifeData = this.knife
				var circleData = this.circle
				var knifeX = knifeData.x + knifeData.w/2	//小刀中心点位置
				var addScore = null
				if((knifeX + knifeData.w/2) > circleData.x && knifeX < (circleData.x + circleData.w - knifeData.w/2)){
					var b = parseInt((Math.abs(knifeX - circleData.x - circleData.w/2)/(circleData.w/2))*100)
					//console.log('bbbb',b)
					if(b < 2){
						addScore = 5
					}else if(b < 15){
						addScore = 3
					}else if(b < 50){
						addScore = 2
					}
					else if(b <= 100){
						addScore = 1
					}
				}
				this.addScore = addScore?addScore:0
				return addScore
			},
			
			//选择图片加入板砖
			chooseImgFn(){
				
				uni.chooseImage({
					count:1,
					sizeType:'compressed',
					success:(res)=>{
						uni.showLoading({ title:'替换图片中..', mask :true})
						console.log('选择图片',res)
						uni.getImageInfo({
							src:res.tempFilePaths[0],
							success:(res)=>{
								console.log('图片文件：',res)
								//uni.showToast({title:'选择图片成功',icon:'none',duration:3000})
								this.createCircleImg(res)
							},fail:(res)=>{
								uni.hideLoading()
								uni.showToast({title:'图片获取失败,请选其他图片',icon:'none'})
							}
						})
					}
				})
			},
			/**
			* 把图片处理成圆形,如果不是正方形就按最小边一半为半径处理
			* @param {object} imgObj 图片(img)对象
			* @param {number} imgType 设置生成图片的大小：0设置生成的图片大小是以图片设置的css大小为准，1设置生成的图片大小是以图片分辨率为准，默认值为0
			* @return {string} return base64 png图片字符串
			*/
			//生成图片链接
			createCircleImg(img){
				var _this = this
				var radius = 150
				var diameter = radius * 2;
				this.createImgData.w = diameter
				this.createImgData.h = diameter
				var canvasImg = uni.createCanvasContext('createImg',this)
				
				uni.downloadFile({
				    url: img.path,
				    success: function (res) {
						//uni.showToast({title:'选择图片成功111',icon:'none',duration:3000})
						canvasImg.clearRect(0,0,diameter,diameter)
						canvasImg.beginPath();
						canvasFn.ellipse(canvasImg, radius, radius, radius, radius*.56)
						canvasImg.clip();
						setTimeout(()=>{
							canvasImg.drawImage(res.tempFilePath,0, 0, img.width, img.height, 0,0, diameter, diameter);
							canvasImg.draw(true,()=>{
								uni.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: diameter,
									height: diameter,
									destWidth: diameter,
									destHeight: diameter,
									canvasId: 'createImg',
									success: function(res) {
									    // 在H5平台下，tempFilePath 为 base64
										//uni.showToast({title:'生成图片成功222',icon:'none',duration:3000})
										_this.circle.img = res.tempFilePath
										_this.drawCanvas()
										uni.hideLoading()
									},
									fail:(err)=>{
										uni.hideLoading()
										uni.showToast({title:'图片替换失败',icon:'none'})
									}
								})
							});
						},500)
				    },
					fail:(err)=>{
						uni.hideLoading()
						uni.showToast({title:'图片替换失败',icon:'none'})
					}
				})
			},
			
		}
	}
</script>

<style lang="scss">
page{width:100%; height:100%; overflow: hidden;}
.game_box{
	width:100%; height:100%; background:#eee; position:relative; 
	background:url(~@/static/images/game/bg02.png) no-repeat center center; background-size:cover;
}
.begin_box{
	width:100%; height:100%; position:relative;
	background:url(~@/static/images/game/bg01.jpg) no-repeat center center; background-size:cover;
	.load_txt{ 
		position:absolute; top:50%; left:0; width:100%; margin-top:120upx; height:60upx; 
		font-size:40upx; color:#fff; text-align: center; font-weight: bold;
	}
}

// 开始游戏
.game_start{
	width:90%; margin:0 auto; text-align:center;
	.des{display:block; width:100%; text-align: center; font-size:50upx; line-height:80upx; color:#fff; margin-bottom:100upx;}
	.btn{ display:inline-block; text-align:center; width:500upx; height:100upx; line-height:100upx; color:#fff; font-size:46upx;  text-align: center; border:2upx solid #fff;}
}

// 游戏中
.game_canvas_box{
	width:100%; height:100%;
	.game_canvas{width:100%; height:100%;}
	.game_top{
		position:fixed; left:0; top:0; z-index:9; width:100%; height:100upx;
		.num1{
			float:left; line-height:100upx; font-size:50upx; color:#fff; padding-left:20upx;
			.img{width:80upx; height:44upx; vertical-align: middle; display:inline-block; position:relative; top:-10upx; margin-right:15upx;}
		}
		.num2{
			position:absolute; left:50%; top:0; text-align:center;
			width:300upx; margin-left:-150upx; line-height:100upx; height:100upx; 
			font-size:80upx; font-weight:bold; color:#fff;
		}
		.change_btn{float:right; line-height:100upx; font-size:40upx; color:#fff; padding-right:20upx; text-decoration: underline;}
	}
}
// 游戏结束弹窗
.game_over_box{
	width:85%; margin:0 auto; color:#fff; text-align:center;
	.new_img{width:300upx; margin-bottom:40upx;}
	.tit{font-size:80upx; margin-bottom:50upx;}
	.des{font-size:40upx; line-height:70upx; margin-bottom: 70upx;;}
	.btn{font-size:40upx; height:90upx; line-height:90upx; border:2upx solid #fff; display:inline-block; width:500upx; border-radius:45upx;}
}


.choose_img{position:fixed; top:10upx; right:10upx; font-size:40upx; line-height:60upx; color:#fff; text-decoration:underline;}
</style>
