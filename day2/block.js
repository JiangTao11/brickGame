/**
 * Created by huang on 2017/8/19.
 */

var Block = function(position) {
	//position 是[0, 0]格式
	var p = position
	var image = imageFromPath('block.png')
	var o = {
		image: image,
		x: p[0],
		y: p[1],
		w: 50,
		h: 20,
		alive: true,
		lifes: p[2] || 1,
	}
	o.kill = function () {
		o.lifes--
		if (o.lifes < 1){
			o.alive = false
		}
	}
	o.collide = function (b) {
		return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
	}
	return o
}
