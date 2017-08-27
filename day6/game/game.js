// game
class Game {
	constructor(fps, images, runCallBack) {
		window.fps = fps
		this.images = images
		this.runCallBack = runCallBack
		//
		this.scene = null
		this.actions = {}
		this.keydowns = {}
		this.canvas = document.querySelector('#id-canvas')
		this.context = this.canvas.getContext('2d')
		
		//events
		var self = this
		window.addEventListener('keydown', event =>{
			this.keydowns[event.key] = true
		})
		window.addEventListener('keyup', function(event){
			self.keydowns[event.key] = false
		})
		this.init()
	}
	
	static instance(...args) {
		this.i = this.i || new this(...args)
		return this.i
	}
	drawImage(img) {
		this.context.drawImage(img.image, img.x, img.y)
	}
	
	//update
	update() {
		this.scene.update()
	}
	// draw
	draw() {
		this.scene.draw()
	}
	//
	registerAction(key, callback) {
		this.actions[key] = callback
	}
	runloop() {
		var g = this
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
		g.context.clearRect(0, 0, g.canvas.width, g.canvas.height);
		//draw
		g.draw()
		setTimeout(function () {
			g.runloop()
		}, 1000/window.fps)
		return g
	}
	imageByName(name) {
		var g = this
		log('paddle', g.images["ball"])
		var img = g.images[name]
		var image = {
			w: img.width,
			h: img.height,
			image: img,
	}
	return image
	}
	
	__start(scene) {
		this.runCallBack(this)
	}
	replaceScene(scene) {
		this.scene = scene
	}
	runWithScene(scene) {
		var g = this
		g.scene = scene// 开始运行程序
		setTimeout(function () {
			g.runloop()
		}, 1000 / window.fps)
	}
	
	init() {
		// 载入所有图片
		var g = this
		var loads = []
		var names = Object.keys(g.images)
		for(var i = 0; i < names.length; i++){
			let name = names[i]
			var path = g.images[name]
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
					g.__start()
				}
			}
		}
	}
}
