<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="webUrl"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				webUrl:''
            }
        },
		onLoad(options) {
			console.log('spoken-onLoad-options:',options)
			//this.webUrl = options.url?options.url:''
			window.location.href = options.url?options.url:''
		},
    }
</script>

<style>

</style>