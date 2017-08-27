var Scene = function (game) {
	var s = {
		game: game,
	}
	//初始化数据
	var paddle = Paddle(game)
	var ball = Ball(game)
	var score = 0
	var blocks = loadLevel(game, 1)
	
	game.registerAction('a', function(){
		paddle.moveLeft()
	})
	game.registerAction('d', function(){
		paddle.moveRight()
	})
	game.registerAction('f', function(){
		ball.fire()
	})
	s.draw = function () {
		// 背景图
		game.context.fillStyle = "#554"
		game.context.fillRect(0, 0,  400, 300)
		
		game.drawImage(paddle)
		game.drawImage(ball)
		// draw block
		for(var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.alive) {
				game.drawImage(block)
			}
		}
		game.context.fillText('分数： '+ score, 10, 280)
	}
	
	s.update = function () {
		if(window.paused){
			return
		}
		ball.move()
		if(paddle.collide(ball)){
			ball.speedY *= -1
		}
		// 判断游戏结束
		if (ball.y > paddle.y) {
			// 跳转到 游戏结束 的场景
			var end = SceneEnd.new(game)
			game.replaceScene(end)
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
	
	// mouse event
	var enableDrag = false
	game.canvas.addEventListener('mousedown', function (event) {
		var x = event.offsetX
		var y = event.offsetY
		log(x, y, 'down')
		if(ball.hasPoint(x, y)){
			log("点中")
			enableDrag = true
		}
	})
	game.canvas.addEventListener('mousemove', function (event) {
		var x = event.offsetX
		var y = event.offsetY
		if(enableDrag){
			ball.x = x
			ball.y = y
		}
	})
	
	game.canvas.addEventListener('mouseup', function (event) {
		var x = event.offsetX
		var y = event.offsetY
		// log(x, y, 'up')
		enableDrag = false
	})
	
	return s
}