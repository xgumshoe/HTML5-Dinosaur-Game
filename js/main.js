var stage = new createjs.Stage('game');
var GRID = 5;
var POINTS = 0;
var started = false;

// Title
var title = stage.addChild(new createjs.Text("DINOSAUR", "Bold 20px Arial", "white"));
title.textAlign = "center";
title.textBaseline = "middle";
title.x = stage.canvas.width/2;
title.y = 100;

// Score
var score = stage.addChild(new createjs.Text(`SCORE: ${POINTS}`, "Bold 20px Arial", "white"));
score.textAlign = "left";
score.textBaseline = "middle";
score.x = 50;
score.y = 180;

// Game screen
var screen = stage.addChild(new createjs.Container());
screen.x = 50;
screen.y = 200;

// Background
var bg = screen.addChild(new createjs.Shape());
bg.graphics
	.beginStroke('rgba(255, 255, 255, 1)').setStrokeStyle(2)
	.beginFill('rgba(0, 0, 0, 1)').drawRect(0, 0, 400, 400);
	
// Controls
var guide = stage.addChild(new createjs.Text("Press space to jump", "Bold 20px Arial", "white"));
guide.textAlign = "center";
guide.textBaseline = "middle";
guide.x = stage.canvas.width/2;
guide.y = 300;

var keys = stage.addChild(new createjs.Shape());
keys.graphics
	.beginStroke('rgba(0, 0, 0, 1)').setStrokeStyle(1)
	.beginFill('rgba(255, 255, 255, 1)').drawRoundRect(0, 0, 120, 40, 5).endStroke()
keys.regX = 60;
keys.regY = 20;
keys.x = 250;
keys.y = 640;

var label = stage.addChild(new createjs.Text("SPACE", "Bold 20px Arial", "#000"));
label.textAlign = "center";
label.textBaseline = "middle";
label.x = 250;
label.y = 640;

// Pixelart
var pixelart = [
	{
		id: 'dinosaur',
		width: 21,
		height: 21,
		cells: [
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0,
			1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
			0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 2, 1, 1, 2, 2, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0,
		]
	},
	{
		id: 'rock',
		width: 10,
		height: 5,
		cells: [
			0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
			0, 0, 1, 1, 1, 1, 1, 1, 0, 0,
			0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
			2, 1, 1, 1, 1, 1, 1, 1, 1, 2,
			2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
		]
	},
	{
		id: 'cactus',
		width: 5,
		height: 10,
		cells: [
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			0, 1, 1, 1, 0,
			2, 1, 1, 1, 2,
			2, 1, 1, 1, 2,
			2, 2, 2, 2, 2,
		]
	},
]

// Land
var land = screen.addChild(new createjs.Shape());
land.graphics
	.beginFill('rgba(50, 50, 50, 1)').drawRect(0, 0, 390, 50)
land.x = 5;
land.y = 295;

// Dinosaur
var dinosaur = {
	x: 20,
	y: 200,
	
	body: screen.addChild(new createjs.Shape()),
	draw: () => {
		dinosaur.body.x = dinosaur.x;
		dinosaur.body.y = dinosaur.y;
		
		var pixel = pixelart.find(e => e.id === 'dinosaur');
		dinosaur.width = pixel.width * GRID;
		dinosaur.height = pixel.height * GRID;
		
		for(var y = 0; y < pixel.height; y++) {
			for(var x = 0; x < pixel.width; x++) {
				var fill = null;
				switch(pixel.cells[((y * pixel.width) + x)]) {
				case 1: fill = 'rgba(50, 50, 50, 1)'; break;
				case 2: fill ='rgba(0, 0, 0, 1)'; break;
				default: fill ='rgba(0, 0, 0, 0)'; break
				}
				dinosaur.body.graphics.beginFill(fill).drawRect(x * GRID, y * GRID, GRID, GRID);
			}
		}
	},
	jumping: false, // Jumping flag
	jump() { // Jump
		var self = this;
		if(self.jumping) return;
			
		self.jumping = true;
		createjs.Tween.get(self.body)
			.to({ y : 100 }, 500)
			.to({ y : 200 }, 500)
			.call(function() {
				self.x = self.body.x;
				self.y = self.body.y;
				self.jumping = false;
			})
	},
}

// Obstacles
var obstacles = {
	delay: 50,
	tick: 0,
	list: [],
	create: function() {
		var node = new Obstacle(300, 300);
		obstacles.list.push(node);
		screen.addChild(node.body)
	},
}
class Obstacle {
	constructor(x = 0, y = 0) {
		this.destroyed = false;
		this.x = x;
		this.y = y;
		
		var n = Math.floor(Math.random() * 2);
		var id = (n === 0) ? 'rock':'cactus';
		var pixel = pixelart.find(e => e.id === id);
		this.width = pixel.width * GRID;
		this.height = pixel.height * GRID;
		
		this.body = new createjs.Shape();
		for(var y = 0; y < pixel.height; y++) {
			for(var x = 0; x < pixel.width; x++) {
				var fill = null;
				switch(pixel.cells[((y * pixel.width) + x)]) {
				case 1: fill = 'rgba(50, 50, 50, 1)'; break;
				case 2: fill ='rgba(0, 0, 0, 1)'; break;
				default: fill ='rgba(0, 0, 0, 0)'; break
				}
				this.body.graphics.beginFill(fill).drawRect(x * GRID, y * GRID, GRID, GRID);
			}
		}
		this.body.regY = pixel.height * GRID;
		this.body.x = this.x;
		this.body.y = this.y;
	}
	/*
	 * Update obstacle position
	 */
	update(delta) {
		this.x -= delta * 400;
		this.body.x = this.x;
		
		if(this.x <= 0) this.destroy();
	}
	/*
	 * Remove obstacle from stage
	 */
	destroy() {
		this.destroyed = true;
		screen.removeChild(this.body);
	}
	/*
	 * Collision check
	 */
	collided(player) {
		return false;
	}
}

// Update game
function update(e) {
	if(started) {
		var delta = e.delta/1000;
		// Create obstacles
		obstacles.tick++;
		if(obstacles.tick % obstacles.delay === 0) {
			obstacles.create();
		}
		
		// Move obstacles
		var nodes = obstacles.list.filter(e => !e.destroyed)
		nodes.map(e => {
			e.update(delta);
		})
		
		score.text = `SCORE: ${++POINTS}`;
	}
	
	stage.update();
}

function restart() {
	started = true;
	POINTS = 0;
	score.text = `SCORE: ${POINTS}`;
	
	guide.visible = false;
	dinosaur.draw();
}
setTimeout(() => { restart(); }, 2000);
	
window.addEventListener('keydown', (e) => {
	if(e.keyCode === 32) {
		dinosaur.jump();
	}
});

createjs.Ticker.on('tick', update);