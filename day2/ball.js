/**
 * Created by huang on 2017/8/19.
 */
var Ball = function() {
	var image = imageFromPath('ball.png')
	var o = {
		image: image,
		x: 100,
		y: 200,
		speedX: 10,
		speedY: 10,
		fired: false,
	}
	o.move = function() {
		if (o.fired) {
			if (o.x < 0 || o.x > 400) {
				o.speedX = -o.speedX
			}
			if (o.y < 0 || o.y > 300) {
				o.speedY = -o.speedY
			}
			o.x += o.speedX
			o.y += o.speedY
		}
	}
	o.fire = function(){
		o.fired = true
	}
	o.反弹 = function () {
		o.speedY = - o.speedY
	}
	o.collide = function(b){
		if (b.y > o.y  && b.y < o.y + o.image.height){
			if (b.x > o.x && b.x < o.x +  o.image.width){
				log('相撞')
				return true
			}
		}
		return false
	}
	return o
}
