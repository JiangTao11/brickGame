class SceneTitle extends  HuaScene {
	constructor(game) {
		super(game)
		game.registerAction('k', function(){
			var s = Scene(game)
			game.replaceScene(s)
		})
	}

	draw() {
		// draw labels
		this.game.context.fillText('按k开始游戏', 100, 290)
	}
}