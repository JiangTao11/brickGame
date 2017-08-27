/**
 * Created by huang on 2017/8/19.
 */
//  1.省了8个字符
// 	2.自定义功能， 可以关闭log
var log = console.log.bind(console)

var e = sel =>  document.querySelector(sel)

// var log = function (s) {
// 	e('#id-text-log').value += '\n' + s
// }

var imageFromPath = function(path){
	var img = new Image()
	img.src = path
	return img
}



var rectIntersects = function (a, b) {
	var o = a
	if (b.y > o.y  && b.y < o.y + o.image.height){
		if (b.x > o.x && b.x < o.x +  o.image.width){
			log('相撞')
			return true
		}
	}
	return false
}