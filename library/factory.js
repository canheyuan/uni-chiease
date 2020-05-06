// 引入Vue实例
import Vue from 'vue'
// 引入Vuex状态管理
import store from '@/store/index.js';
// 定义一个handle类
class handle {
	constructor(args) {
		return args;
	}
	/* 获取网络当前状态 */
	getNetWorkStatus() {
		let networkType;
		uni.getNetworkType({
			success: (res) => {
				networkType = res.networkType;
				if (networkType == 'none') {
					// 响应式修改网络状态
					store.commit('changeNetWork', false);
				}
				Vue.prototype.networkType = networkType;
			}
		})
	}

	/* 网络状态变化检测 */
	netWorkChange() {
		let status;
		uni.onNetworkStatusChange(res => {
			/* isConnected:当前是否有网络连接,
			 * networkType:网络类型
			 */
			status = res.isConnected;
			if (res.isConnected) {
				switch (res.networkType) {
					case 'unknown':
						this.showToast('未知的网络状态')
						break;
					case 'wifi':
						this.showToast('已切换至wifi网络')
						break;
					case '4g':
						this.showToast('已切换至4g网络')
						break;
					case '3g':
						this.showToast('已切换至3g网络')
						break;
					case '2g':
						this.showToast('已切换至2g网络')
						break;
					case 'none':
						this.showToast('当前无网络连接,请检查网络')
						break;
				}
			} else {
				this.showToast('网络连接不可用,请检查网络');
			}
			// 响应式修改网络状态
			store.commit('changeNetWork', status);
		})
	}

	/* 自定义toast提示框,分平台,如需更多扩展,请参考:https://www.html5plus.org/doc/zh_cn/nativeui.html#plus.nativeUI.toast 
	 *给了三个参数,toast垂直位置和icon都有默认值,改变只需传入不同参数即可,app原生弹框太丑,故分平台进行了编写
	 */
	showToast(message, position = 'bottom', icon = 'none') {
		// #ifdef APP-PLUS
		const styles = {
			verticalAlign: String(position)
		}
		plus.nativeUI.toast(message, styles);
		// #endif
		// #ifdef MP || H5
		uni.showToast({
			title: String(message),
			icon: String(icon),
			position: String(position),
		})
		// #endif
	}
}
export default new handle();
