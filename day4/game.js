var Game = function(fps, images, runCallback) {
	// images是一个对象， 里面是图片的名字
	// 程序会在所有图片载入成功之后才运行
	var g = {
		actions: {},
		keydowns: {},
		images: {},
	}
	var canvas = document.querySelector('#id-canvas')
	var context = canvas.getContext('2d')
	g.canvas = canvas
	g.context = context
	g.drawImage = function(image){
		g.context.drawImage(image.image, image.x, image.y)
		
	}
	//events
	window.addEventListener('keydown', function(event){
		g.keydowns[event.key] = true
	})
	window.addEventListener('keyup', function(event){
		g.keydowns[event.key] = false
	})
	//
	g.registerAction = function(key, callback){
		g.actions[key] = callback
	}
	//timer
	window.fps = 30
	
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
		}, 1000/window.fps)
		return g
	}
	
	// 载入所有图片
	var loads = []
	var names = Object.keys(images)
	for(var i = 0; i < names.length; i++){
		let name = names[i]
		var path = images[name]
		let img = new Image()
		img.src = path
		img.onload = function () {
			// 存入g.images
			g.images[name] = img
			loads.push(1)
			// 所有图片都成功载入之后， 再调用run
			log('load images')
			if(loads.length == names.length){
				log("iamges", g.images)
				log('load images')
				g.run()
			}
		}
	}
	g.imageByName = function (name) {
		log('paddle', g.images["ball"])
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
		}
		return image
	}
	g.run = function () {
		runCallback(g)
		// 开始运行程序
		setTimeout(function () {
			runloop()
		}, 1000/fps)
	}
	return g
}
