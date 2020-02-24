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
}