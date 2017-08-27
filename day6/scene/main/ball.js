/**
 * Created by huang on 2017/8/19.
 */
var Ball = function(game) {
	// var image = imageFromPath('ball.png')
	var o = game.imageByName('ball')
	o.x = 100,
	o.y = 200,
	o.speedX = 10,
	o.speedY = 10,
	o.fired =  false,
	
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
	o.hasPoint = function (x, y) {
		var xIn =  x > o.x && x < o.x + o.w
		log(o.x, )
		var yIn = y  > o.y && y < o.y + o.h
		log(xIn, yIn)
		return xIn && yIn
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
