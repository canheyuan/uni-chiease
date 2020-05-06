<template>
	<view class="game_box">
		<!-- 加载显示 -->
		<view class="begin_box" v-if="false">
			<view class="load_txt">Loading......0% </view>
		</view>
		
		<!-- 开始前提示 -->
		<view class="begin_tip" v-show="gameStatus==0"  @click="startGameFn">
			<view class="des">点击屏幕发射飞刀击中木板</view>
			<view class="btn">开 始</view>
		</view>
		
		<!-- 游戏 -->
		<view class="game_canvas_box">
			<canvas 
				class="game_canvas" type="2d" canvas-id="gameCanvas" disable-scroll="true"
				@touchstart="touchstartFn"
			></canvas>
		</view>
	</view>
</template>
<script>
	//knife.dir:1左移，2右移，3上移，4下移
	//gameStatus:0开始移动前，1左右移动，2向上移动，3插入面板后消失时,4游戏结束
	const app = getApp()
	var s , w , h, imgUrl
	var ctx = null
	const audio01 = uni.createInnerAudioContext();	//小刀上移
	const audio02 = uni.createInnerAudioContext();	//小刀击中木板
	const audio03 = uni.createInnerAudioContext();	//失败结束音效
	const audio04 = uni.createInnerAudioContext();	//破纪录
	audio01.src = app.globalData.apiUrl + '/static/media/game/throw.mp3'
	audio02.src = app.globalData.apiUrl + '/static/media/game/insert.mp3'
	audio03.src = app.globalData.apiUrl + '/static/media/game/shibai.mp3'
	audio04.src = app.globalData.apiUrl + '/static/media/game/su1.mp3'
	//pinyinAudio.autoplay = false;
	export default{
		data (){
			return {
				imgUrl:app.globalData.imgUrl,
				// winW:0,	//浏览器宽度
				// winH:0,	//浏览器高度
				// scale:1,	//元素缩放比例
				isStop:false,
				gameStatus:0,	//当前游戏状态
				addScore:1,		//添加的分数
				sumScore:0,		//当前获得的分数
				bestScore:0,	//最高记录
				knifeTimes:0,	//点击小刀次数
				elAlpha:1,	
				knife:{ x:0, y:0, w:15, h:70, rotate:0, dir:1, speed:8, status:0 },
				knife2:{ x:0, y:0, w:18, h:36 },	
				circle:{ x:0, y:0, w:0, h:0, s:1, dir:0, speed:5, status:0 },	//圆板
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
			ctx = uni.createCanvasContext('gameCanvas')
			this.bestScore = uni.getStorageSync('flyGameBestScore') || 0
			this.beginFn()
		},
		
		methods:{
			
			//开始游戏
			startGameFn(){
				this.gameStatus = 1
			},
			
			//小刀默认位置
			knifeDf(ckOk){
				var knifeData = this.knife
				knifeData.x = w*.5-20*s
				knifeData.y = h*.7
				this.knife = knifeData
				ckOk && ckOk()
			},
			
			//圆板的位置
			circleDf(ckOk){
				var circleData = this.circle
				circleData.x = w*0.5-166*s
				circleData.y = h*.15
				circleData.w = 333*s
				circleData.h = 163*s
				this.circle = circleData
				ckOk && ckOk()
			},
			
			//首次加载
			beginFn(){
				this.knifeDf()
				this.circleDf()
				this.drawImg()
			},
			
			//文字
			ctxFont(val,x,y,size,color,textAlign){
				//console.log(val,x,y,size,color,textAlign)
				ctx.setFontSize(size)
				ctx.setFillStyle(color)
				ctx.setTextAlign(textAlign)
				ctx.fillText(val, x, y)
			},
			
			//小刀
			ctxKnife(knife){
				ctx.translate(knife.x + knife.w/2, knife.y + knife.h/2)
				ctx.rotate( knife.rotate* Math.PI / 180)
				ctx.translate(-(knife.x + knife.w/2), -(knife.y + knife.h/2))
				ctx.drawImage(this.imgUrl + '/game/knife-1.png', knife.x, knife.y, knife.w, knife.h)
			},
			ctxKnife2(knife){
				//ctx.drawImage(imgUrl + '/game/knife-1.png', w*.5-20*s, (h-212*s-80), 41*s, 212*s)
				ctx.drawImage(this.imgUrl + '/game/knife-4.png', knife.x, knife.y, knife.w, knife.h)
			},
			
			//随机生成圆板
			randomCircle(cbOk){
				var circleData = this.circle
				var times = this.knifeTimes<100?this.knifeTimes:100
				var sCir = .7 + .3*Math.random()*(1 - times/100) //随机生成一个比例
				console.log('sCir',sCir)
				circleData.x = (w - 333*s*sCir)*Math.random() 
				circleData.y = (h*.15) + h*(Math.random()*2)/10	//生成一个20-50%之间的随机数
				circleData.w = 333*s*sCir
				circleData.h = 163*s*sCir
				this.circle = circleData
				//console.log('circleData', circleData)
				cbOk && cbOk()
			},
			
			//圆板
			ctxCircle(circle){
				ctx.drawImage(imgUrl + '/game/circle-2-6.png',circle.x, circle.y, circle.w, circle.h)
			},
			
			//暂时没用
			drawImage(image , x  , y , alpha) {
				// 绘制图片
				ctx.drawImage(image , x , y)
				// 获取从x、y开始，宽为image.width、高为image.height的图片数据
				// 也就是获取绘制的图片数据
				var imgData = ctx.getImageData(x , y , image.width , image.height);
				for (var i = 0 , len = imgData.data.length ; i < len ; i += 4 )
				{
					// 改变每个像素的透明度
					imgData.data[i + 3] = imgData.data[i + 3] * alpha;
				}
				// 将获取的图片数据放回去。
				ctx.putImageData(imgData , x , y)
			},
			
			//画布
			drawImg(){
				this.circleRun()
				//console.log('circle',this.circle)
				ctx.clearRect(0,0,w,h);
				
				//ctx.drawImage(imgUrl + '/game/bg02.png', 0, 0, w, h)	//背景
				this.ctxFont(this.sumScore, w*0.5, 40, 40,'#ffffff','center')
				ctx.drawImage(this.imgUrl + '/game/king.png', 16,14,30,20)
				this.ctxFont(this.bestScore, 50, 36, 28,'#fff','left')
				
				switch(this.gameStatus){
					case 3:
						//console.log('this.elAlpha',this.elAlpha)
						ctx.setGlobalAlpha(this.elAlpha)
						this.ctxCircle(this.circle)	//圆板
						if(this.addScore > 0){
							this.ctxFont('+' + this.addScore, this.circle.x+this.circle.w/2, this.circle.y-30, 26,'#fff','center')
						}
						this.ctxKnife2(this.knife2)	//小刀2
						ctx.setGlobalAlpha(1)
						break;
					case 4:
						ctx.setGlobalAlpha(1 - this.elAlpha)
						this.ctxFont('游戏结束 ' + (this.sumScore>this.bestScore?'新纪录':''), w/2,300, 40,'#000','center')
						this.ctxFont(`你在小李飞刀中得了 ${this.sumScore} 分，真是` , w/2,350, 22,'#000','center')
						this.ctxFont(`太棒了，再练练就能得心应手` , w/2,390, 22,'#000','center')
						ctx.strokeRect( w/2-100,440,200,40)
						this.ctxFont(`再来一次` , w/2,466, 20,'#000','center')
						ctx.setGlobalAlpha(1)
						break;
					default:
						this.ctxCircle(this.circle)	//圆板
						this.ctxKnife(this.knife)	//小刀
				}
				ctx.draw()
			},
			
			//木板移动
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
			
			//小刀移动
			knifeRun(){
				var knifeData = this.knife
				if(knifeData.dir == 1){	//左移
				
					this.knife.x = knifeData.x - knifeData.speed
					if(knifeData.x <= 0){ this.knife.dir = 2}
					
				}else if(knifeData.dir == 2){	//右移
				
					this.knife.x = knifeData.x + knifeData.speed
					if(knifeData.x >= w - this.knife.w){ this.knife.dir = 1}
					
				}else if(knifeData.dir == 3){	//上移
					
					//var knifeTargetY = (this.addScore == 0)? -this.knife.h:this.circle.y + 70
					if(this.knife.y > (this.circle.y + 70)){	
						this.knife.y = knifeData.y - 20
						this.knife.rotate = (this.knife.rotate + 20)%360
						
					}else{
						this.circle.dir = 0
						
						if(!this.checkHitFn()){
							audio03.play()
							if(this.knife.y < -this.knife.h){
								
								this.gameStatus = 4
								if(this.elAlpha > 0){
									this.elAlpha -= .01
								}else{
									console.log('this.isStop',this.isStop)
									this.isStop = true
									if(this.sumScore>this.bestScore){
										uni.setStorageSync('flyGameBestScore',this.sumScore)
									}
								}
								
							}else{
								this.knife.y = knifeData.y - 20
								this.knife.rotate = (this.knife.rotate + 20)%360
							}
						}else{
							if(this.elAlpha==1){
								audio02.play()
								this.sumScore += this.addScore
								//console.log('this.sumScore',this.sumScore,this.gameStatus)
							}
							this.elAlpha -= .02
							if(this.elAlpha <= 0){
								this.elAlpha = 1
								this.gameStatus = 2
								this.knife.dir = 1
								this.knife.rotate = 0
								this.knifeDf()
								
								if(this.knifeTimes>5){	//第十次后才有木板移动
									var times = this.knifeTimes<100?this.knifeTimes:100
									this.circle.dir = parseInt(Math.random()*100) < times?1:0
								}
								
								//console.log('this.circle.dir',this.circle.dir)
								this.randomCircle()
							}else{
								this.gameStatus = 3
								this.knife2.x = this.knife.x
								this.knife2.y = (this.addScore == 0)? -this.knife.h:this.circle.y + this.circle.h*.65
							}
						}
						
						
					}
				}
				this.drawImg()
				if(!this.isStop){window.requestAnimationFrame(this.knifeRun)}
			},
			
			//点击事件
			touchstartFn(){
				//console.log('this.gameStatus',this.gameStatus)
				switch(this.gameStatus){
					case 1:
						this.knife.dir = 3
						this.checkHitFn()
						audio01.play()
						this.knifeTimes += 1
						window.requestAnimationFrame(this.knifeRun)
						break;
					case 2:	//上移中
						this.knife.dir = 3
						this.gameStatus = 2
						audio01.play()
						this.knifeTimes += 1
						//console.log('this.checkHitFn()',this.checkHitFn())
						// if(!this.checkHitFn()){
						// 	audio03.play()
						// }
						break;
					case 3:	//击中木板
						
						break;
					case 4:	//重新开始
						if(this.elAlpha<0){
							this.knifeTimes = 0
							this.isStop = false
							this.gameStatus = 2
							this.elAlpha = 1
							this.knife.dir = 0
							this.knife.rotate = 0
							if(this.sumScore > this.bestScore){
								this.bestScore = this.sumScore
							}
							this.sumScore = 0
							this.knifeDf()
							this.circleDf()
							//this.randomCircle()
							window.requestAnimationFrame(this.knifeRun)
						}
						break;
				}
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
					}else if(b < 66){
						addScore = 2
					}
					else if(b <= 100){
						addScore = 1
					}
				}
				this.addScore = addScore?addScore:0
				return addScore
			},
			
			//
		}
	}
</script>

<style lang="scss">
page{width:100%; height:100%; overflow: hidden;}
.game_box{width:100%; height:100%; background:#eee; position:relative; background:url(~@/static/images/game/bg02.png) no-repeat center center; background-size:cover;}
.begin_box{
	width:100%; height:100%; position:relative;
	background:url(~@/static/images/game/bg01.jpg) no-repeat center center; background-size:cover;
	.load_txt{ 
		position:absolute; top:50%; left:0; width:100%; margin-top:120upx; height:60upx; 
		font-size:40upx; color:#fff; text-align: center; font-weight: bold;
	}
}
.begin_tip{
	background:rgba(0,0,0,.5); width:100%; height:100%; position:absolute; left:0; top:0; z-index:100;
	.des{width:100%; text-align: center; padding-top:300upx; font-size:44upx; color:#fff;}
	.btn{position:absolute; bottom:200upx; left:50%; margin-left:-150upx; width:300upx; height:100upx; line-height:100upx; color:#fff; font-size:60upx;  text-align: center;}
}
.game_canvas_box{width:100%; height:100%;}
.game_canvas{width:100%; height:100%;}
</style>
