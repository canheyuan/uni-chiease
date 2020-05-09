export default {
	//画椭圆
	ellipse(canvas, x, y, a, b){
		var step = (a > b) ? 1 / a : 1 / b;
		canvas.beginPath();
		canvas.moveTo(x + a, y);
		for(var i = 0; i < 2 * Math.PI; i += step) {
			canvas.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
		}
		canvas.closePath();
	},

	//元素透明度(回调函数cbOK不能是异步的)
	alpha(canvas,startAlpha,endAlpha,cbOk){
		canvas.save()
		canvas.setGlobalAlpha(startAlpha)
		cbOk && cbOk()
		canvas.restore()
	},

	//元素旋转(元素应该在绘画最底部，而且draw()不能为true)
	rotate(canvas,x,y,rotateDeg,cbOk){
		canvas.save()
		canvas.translate(x, y)
		canvas.rotate( rotateDeg* Math.PI / 180)
		canvas.translate(-x, -y)
		cbOk && cbOk()
		canvas.restore()
	},

	//绘画文字
	font(canvas,val,x,y,fontSize,fontColor,align,vAlign){
		fontSize && canvas.setFontSize(fontSize)
		fontColor && canvas.setFillStyle(fontColor)
		align && canvas.setTextAlign(align)
		vAlign && canvas.setTextBaseline(vAlign)
		canvas.fillText(val, x, y)
	},
	
}