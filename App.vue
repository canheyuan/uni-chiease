<script>
	const langData = require('./static/js/data/lang.js').default
	
	export default {
		globalData:{
			imgUrl	: '/static/images',		//图片地址前缀
			apiUrl	: 'https://test.5ideachinese.com',	//接口地址前缀
			pinyinUrl: 'https://test.5ideachinese.com/profile',	//拼音表mp3地址前缀
			isTest	: false,	//是否开启测试
			source	: 'h5',		//来源
			sid		: '',		//APP  	5idea-sid
			lan		: 'en',		//APP	语言
			header	: null,		//APP	头部信息
			
			langData: langData,	//多语言文件
			//下载APP地址
			dowmlaod:{
				apple:"https://itunes.apple.com/cn/app/chiease/id1454486250?ls=1&mt=8",	//苹果
				GP:"https://play.google.com/store/apps/details?id=com.fiveidea.chiease",	//谷歌
				myapp:"https://sj.qq.com/myapp/detail.htm?apkName=com.fiveidea.chiease",	//应用宝
			},
		},
		
		onLaunch: function(options) {
			//console.log('App Launch',options)
			var _this = this;
			
			//获取设置来源
			var source = options.query.source?options.query.source:'h5'
			this.$common.source = source
			//this.$common.system = this.$common.
			
			//APP访问需要先获取header信息
			if(source == 'app'){
				Shell.init();
				Shell.getHttpHeaders((res)=>{
					_this.$common.header = res
				})
			}else{
				var lang = options.query.lang?options.query.lang:'en'
				this.$common.lan = lang
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
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
	.gray_bg{background:#f7f7f7;}
	
</style>
