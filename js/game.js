Crafty.init(window.innerWidth, window.innerHeight);
Crafty.sprite("NCTUmap2.jpg", {BG: [0, 0, 6405, 5169]});
Crafty.e("Canvas, BG");

var Player = Crafty.e("2D, DOM, Color, Fourway")
	.attr({x: 1000, y: 1000, w: 100, h: 100})
	.color("#F00")
	.fourway(200);

Crafty.viewport.clampToEntities = false;
Crafty.viewport.follow(Player, 0, 0);