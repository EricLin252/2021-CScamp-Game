const MapClick = function(data){
	console.log(data.realX.toFixed(2) + " " + data.realY.toFixed(2));
	Crafty("Player").weapon.setPos({x: data.realX, y: data.realY});
}