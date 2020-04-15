<script>
	const langData = require('./static/js/data/lang.js').default	//语言包
	
	export default {
		globalData:{
			imgUrl	: '/static/images',		//图片地址前缀
			//apiUrl	: 'https://test.5ideachinese.com',	//接口地址前缀
			apiUrl	: '',	//接口地址前缀
			pinyinUrl: 'https://test.5ideachinese.com/profile',	//拼音表mp3地址前缀
			isFirst : true,	//是否第一次加载（第一次加载的页面不需要调用pageLoadFn函数）
			isTest	: false,	//是否开启测试
			source	: 'h5',		//来源
			sid		: '',		//APP  	5idea-sid
			lan		: 'zh',		//APP	语言
			header	: null,		//APP	头部信息
			// headerData: {   //app加载的头部信息
			// 	'5idea-sid': 'aab99cac85776427bcb467990a75f149', //用户请求sid
			// 	'5idea-sid': '', //用户请求sid
			// 	'accept-language': '',   //设备语言
			// 	'app-type': '',    //app类型 e.g. IOS, ANDROID
			// 	'app-version': '', //app版本
			// 	'device-type': '', //设备型号
			// 	'device-id': '', //设备id
			// 	'lan': '', //语言
			// },
			
			langData: langData,	//多语言文件
			//下载APP地址
			dowmlaod:{
				apple:"https://itunes.apple.com/cn/app/chiease/id1454486250?ls=1&mt=8",	//苹果
				GP:"https://play.google.com/store/apps/details?id=com.fiveidea.chiease",	//谷歌
				myapp:"https://sj.qq.com/myapp/detail.htm?apkName=com.fiveidea.chiease",	//应用宝
			},
			
			nowWordTopicData:null,	//词卡当前题型信息
			categoryType:null,	//词卡首页类型参数(beginner:零基础（默认），bridge：汉语桥)
		},
		
		onLaunch: function(options) {
			console.log('App Launch',options)
			this.$common.pageLoadFn({
				test:options.query.test,
				lan :options.query.lan,
				source:options.query.source
			})
		},
		
		onShow: function() {
			console.log('App Show')
		},
		
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	html, div, span, iframe, h1, h2, h4, h3, h5, h6, p, img, dd, dt, dl, nav, textarea, button, input, select, em, i, s, strong, ul, li { padding: 0; margin: 0; border: none; }
	html * { -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  box-sizing: border-box;}
	.deal::-webkit-textfield-decoration-container {background-color: #f0f3f9;}
	.deal::-webkit-inner-spin-button {-webkit-appearance: none;}
	.deal::-webkit-outer-spin-button {-webkit-appearance: none;/* 有无看不出差别 */}
	select, input { -webkit-appearance: none; }
	input { appearance: none; border-radius: 0; outline: none; }
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {-webkit-appearance: none !important; margin: 0;}
	img { padding: 0; margin: 0; vertical-align: top; }
	ul, li { list-style: none outside none; }
	h1, h2, h3, h4, h4, h5, h6, textarea, button, input, select { font-size: 100%; font-weight: normal; }
	em, i, s { font-weight: normal; font-style: normal; }
	a { color: #252525; text-decoration: none; }
	a:visited, a:hover {text-decoration: none; }
	a.a_white:visited, a.a_white:hover { color: #fff; text-decoration: none; }
	a.a_red:visited, a.a_red:hover { color: #d9242b; }
	/**  清楚浮动*/
	.clear { clear: both; height: 0; width: 100%; }
	.clearfix:after { visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
	.clearfix { zoom: 1; clear: both; }
	.fl { float: left; }
	.fr { float: right; }
	.indent2{text-indent:2em;}
	/* html,body{max-width:750px; margin:0 auto;} */
	.icons{background:url(~@/static/images/icons.png) no-repeat; background-size:500upx 500upx; display: inline-block; vertical-align: middle;}
	.word-icons{display:inline-block; background:url(~@/static/images/word/word-icons.png) no-repeat left top; background-size:300upx 300upx;}
	.gray_bg{min-height:100%; background:#f7f7f7;}
	
	/*通用按钮*/
	.yellow_btn{height:100upx; line-height:100upx; display:block; border-radius:50upx; color:#fff; background:#ffbc08; margin:0 80upx; box-shadow: 8upx 0 28upx rgba(247,157,0,.5); font-size:34upx;  background:-moz-linear-gradient(left,#ffc10a,#ffa100); background:-webkit-gradient(linear, 0% 0%,100% 0%,from(#ffc10a), to(#ffa100));/*谷歌*/}
	.yellow_btn:active{ background:-moz-linear-gradient(left,#ffa100,#ffc10a); background:-webkit-gradient(linear, 0% 0%,100% 0%,from(#ffa100), to(#ffc10a));/*谷歌*/}
	
	/* 加载更多提示文字 */
	.more_tip{text-align: center; height:40upx; margin:30upx 0;}
	.more_tip .txt{ text-align: center; font-size:28upx; color:#777777; line-height:40upx; height:40upx; }
	.more_tip .txt::before{content:'————'; color:#d7d7d7; display:inline-block; font-size:24upx; line-height:40upx; margin-right:30upx;}
	.more_tip .txt::after{content:'————'; color:#d7d7d7; display:inline-block; font-size:24upx; line-height:40upx; margin-left:30upx; vertical-align: middle;}
</style>
