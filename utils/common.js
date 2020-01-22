
export default {
	imgUrl	: '/static/images',		//图片地址前缀
	apiUrl	: 'https://test.5ideachinese.com',	//接口地址前缀
	pinyinUrl: 'https://test.5ideachinese.com/profile',	//拼音表地址前缀
	isTest	: false,	//是否开启测试
	source	: 'h5',		//来源
	sid		: '',		//APP  	5idea-sid
	lan		: 'en',		//APP	语言
	header	: null,		//APP	头部信息
	
	//下载APP地址
	dowmlaod:{
		apple:"https://itunes.apple.com/cn/app/chiease/id1454486250?ls=1&mt=8",	//苹果
		GP:"https://play.google.com/store/apps/details?id=com.fiveidea.chiease",	//谷歌
		myapp:"https://sj.qq.com/myapp/detail.htm?apkName=com.fiveidea.chiease",	//应用宝
	},
	
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
}
