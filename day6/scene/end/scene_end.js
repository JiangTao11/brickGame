// var SceneEnd = function(game) {
// 	var s = {
// 		game: game,
// 	}
// 	// 初始化
// 	s.draw = function() {
// 		// draw labels
// 		game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
// 	}
// 	game.registerAction('r', function(){
// 		var s = SceneTitle.new(game)
// 		game.replaceScene(s)
// 	})
//
// 	s.update = function() {
//
// 	}
// 	return s
// }
class SceneEnd extends  HuaScene {
	constructor(game) {
		super(game)
		game.registerAction('r', function(){
			var s = SceneTitle.new(game)
			game.replaceScene(s)
		})
	}
	draw() {
		// draw labels
		this.game.context.fillText('游戏结束, 按 r 返回标题界面', 100, 290)
	}
}
