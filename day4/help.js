/**
 * Created by huang on 2017/8/20.
 */
var runloop = function () {
	var actions = Object.keys(g.actions)
	for (var i = 0; i < actions.length; i++){
		var key = actions[i]
		if(g.keydowns[key]){
			//如果按键被按下，调用注册的action
			g.actions[key]()
		}
	}
	//update
	g.update()
	context.clearRect(0, 0, canvas.width, canvas.height);
	//draw
	g.draw()
	
	setTimeout(function () {
		runloop()
	}, 1000/fps)
	return g
}

setTimeout(function () {
	runloop()
}, 1000/fps)