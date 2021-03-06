export default {
	//APP 获取头部信息
	getHeader : (cbOk)=>{	
		Shell.getHttpHeaders((res)=>{
			cbOk && cbOk(res)
		})
	},
	
	//获取手机系统语言
	getSystemLang:()=>{
		var language = (navigator.appName == 'Netscape') ? navigator.language : navigator.browserLanguage;
		language = language?language:'en';
		var result;
		if(language.indexOf('zh') > -1){result = 'zh';}	//中国
		else if(language.indexOf('ar') > -1){result = 'ar';}	//阿拉伯
		else if(language.indexOf('ja') > -1){result = 'ja';}	//日本
		else if(language.indexOf('ko') > -1){result = 'ko';}	//韩国
		else if(language.indexOf('de') > -1){result = 'de';}	//德国
		else if(language.indexOf('es') > -1){result = 'es';}	//西班牙
		else if(language.indexOf('fr') > -1){result = 'fr';}	//法国
		else if(language.indexOf('ru') > -1){result = 'ru';}	//俄罗斯
		//其他语音一个一个列出来
		else{result = 'en';}
		return result;
	},
	
	//判断手机系统
	system:()=>{	//系统类型(IOS:ios/安卓:android/电脑:pc)
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var result = '';
		if(isAndroid){
			result = 'android'
		}else if(isiOS){
			result = 'ios'
		}else{
			result = 'pc'
		}
		return result;
	},
	
	//判断是否是测试(opt参数:test:true或false,source:app或h5,lan:语言,target:监听目标（APP,Page,默认Page）)
	pageLoadFn(options,cbOk){
		const app = getApp();
		let opt = options ? options : null
		app.globalData.source = opt.source?opt.source:(app.globalData.source?app.globalData.source:'h5')	//来源
		app.globalData.lan = opt.lan?opt.lan:(app.globalData.lan?app.globalData.lan:'h5')	//语言
		app.globalData.isTest = opt.test?true:(app.globalData.isTest?true:false)
		
		if(opt.test){
			Shell.init()
			app.globalData.isTest = true
			//app.globalData.sid = '8e91e1a3ce43e3bb042e0dc752e2dc58'
			app.globalData.sid = '052bcfcd2f02226320c564311f6340c1'
			app.globalData.lan = 'zh'
			app.globalData.header = {
				'5idea-sid':'052bcfcd2f02226320c564311f6340c1',
				'lan':'zh'
			}
			cbOk && cbOk()
			return
		}
		
		//APP访问需要先获取header信息
		if(app.globalData.source == 'app'){
			Shell.init();
			Shell.getHttpHeaders((res)=>{
				app.globalData.sid = res['5idea-sid']
				app.globalData.lan = res['lan']
				app.globalData.header = res
			})
		}else{	//h5
			//app.globalData.lan = 'en'	//语言
		}
		cbOk && cbOk()
	},
	
	//时间戳转时间
	getDate(timestamp){
		function add0(m){ return m < 10 ? '0' + m : m };
	  //shijianchuo是整数，否则要parseInt转换  
	    var time = new Date(timestamp);
	    var y = time.getFullYear();
	    var m = time.getMonth() + 1;
	    var d = time.getDate();
	    var h = time.getHours();
	    var mm = time.getMinutes();
	    var s = time.getSeconds();
	    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
	},
	
}