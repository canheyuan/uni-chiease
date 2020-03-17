
//读取数据接口
var http = (option) => {
	const app = getApp();
	let apiUrl = app.globalData.apiUrl	//接口域名
	let commonHeader = app.globalData.header	//app传来的头部信息
	//console.log('commonHeader',app.globalData)
	// if(app.globalData.source == 'app' && !commonHeader){
	// 	app.globalData.getHeader((res)=>{
	// 		app.globalData.header = res
	// 	})
	// }else if(!commonHeader){
	// 	commonHeader = {}
	// }
	let opt = option ? option : null;
	//console.log('headerDataheaderData',headerData)
	let opt_default = {
		isLoading: true,  //是否加载loading
		isCloseLoading: true,  //是否关闭Loading
		loadTitle: '数据加载中',
		isApiUrl:true,	//是否使用接口前缀
		url: '', //前缀不用写
		method: 'GET',  //接口类型,必须大写(GET、POST、PUT、DELETE、CONNECT、HEAD、OPTIONS、TRACE)
		headerType:'application/json',	//headerType:'application/x-www-form-urlencoded'
		header: {},	
		data: {}, //data参数
		dataType: 'json',   //数据返回类型
		responseType:'text',	//设置响应的数据类型。合法值：text、arraybuffer
		success: null,  		//成功且code=0时回调函数
		successOther:null,		//成功回调函数
		fail: null,     		//失败回调函数
		complete: null   		//调用接口完回调函数
	};
	opt = opt ? Object.assign(opt_default, opt) : opt_default
	opt.header = Object.assign(commonHeader, opt.header)
	opt.header['content-type'] = opt.headerType
	
	//var headerData = vue.$store.state.headerData
	//headerData = headerData ? Object.assign(opt.headerData, headerData) : opt.headerData; //合并header参数
	//alert('加载axios'+JSON.stringify(headerData))
	console.log('opt',opt)
	if(opt.isLoading){uni.showLoading({ title: 'Loading' });}
	uni.request({
		url: (opt.isApiUrl?apiUrl:'') + opt.url, //仅为示例，并非真实接口地址。
		data:opt.data,
		header: opt.headerData,
		method: opt.method,
		dataType: opt.dataType,
		responseType :opt.responseType,
		success: (res) => {
			if(opt.isCloseLoading){uni.hideLoading()}
			if(res.data.code == 0){
				opt.success && opt.success(res.data)
			}
			opt.successOther && opt.successOther(res.data)
		},
		fail:(res)=>{
			uni.hideLoading()
			opt.fail && opt.fail(res)
		},
		complete:(res)=>{
			opt.complete && opt.complete(res)
		}
	});
 
}


//输出
export default http