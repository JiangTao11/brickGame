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
	window.paused = false
	window.addEventListener('keydown',function (event) {
		var k = event.key
		if(k == 'q'){
			//为了debug
			window.paused = !window.paused
		}else if ('1234567'.includes(k)){
			//为了debug，临时加的关卡
			log("1213", k)
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
		ball: 'img/ball.png',
		block: 'img/block.png',
		paddle: 'img/paddle.png',
	}
	
	var game = Game.instance(30, images,  function (g) {
		var s = SceneTitle.new(g)
		g.runWithScene(s)
		
		// game.update = function() {
		// 	if (window.paused){
		// 		return
		// 	}
		// 	// s.update
		// 	scene.update()
		//
		// }
		//
		// game.draw = function() {
		// 	scene.draw()
		// }
		
	})
	enableDebugMode(game,true)
	
	
	
}
_main()
