/**
 * Created by huang on 2017/8/20.
 */

var loadLevel = function (game, n) {
	var blocks = []
	var n = n - 1
	var level = levels[n]
	for (var i = 0; i < level.length; i++){
		var p = level[i]
		var b = Block(game, p)
		blocks.push(b)
	}
	return blocks
	
	
}
var enableDebugMode = function (game, enable) {
	if (!enable){
		return
	}
	window.addEventListener('keydown',function (event) {
		var k = event.key
		if(event.key == 'q'){
			//为了debug
			paused = !paused
		}else if ('1234567'.includes(k)){
			//为了debug，临时加的关卡
			blocks = loadLevel(game, Number(k))
		}
	})
	// 控制速度
	document.querySelector("#id-input-speed").addEventListener("input", function (event) {
		var input = event.target
		window.fps = Number(input.value)
	})
}

var _main = function() {
	
	var images = {
		ball: 'ball.png',
		block: 'block.png',
		paddle: 'paddle.png',
	}
	
	var game = Game(30, images,  function () {
		var paddle = Paddle(game)
		var ball = Ball(game)
		
		var score = 0
		
		
		blocks = loadLevel(game, 1)
		
		paused = false
		
		
		game.registerAction('a', function(){
			paddle.moveLeft()
		})
		game.registerAction('d', function(){
			paddle.moveRight()
		})
		game.registerAction('f', function(){
			ball.fire()
		})
		
		game.update = function() {
			if (paused){
				return
			}
			ball.move()
			if(paddle.collide(ball)){
				ball.speedY *= -1
			}
			//判断ball和block相撞
			for(var i = 0; i < blocks.length; i++){
				var block = blocks[i]
				if(block.collide(ball)){
					log("block相撞")
					block.kill()
					ball.反弹()
					// 更新分数
					score += 100
				}
			}
			
		}
		game.draw = function() {
			game.drawImage(paddle)
			game.drawImage(ball)
			// draw block
			for(var i = 0; i < blocks.length; i++) {
				var block = blocks[i]
				if (block.alive) {
					game.drawImage(block)
				}
			}
			game.context.fillText('分数： '+ score, 10, 380)
		}
	})
	enableDebugMode(game,true)
	
	
}
_main()
