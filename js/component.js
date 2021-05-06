//background設定
Crafty.c("BG", {
	//初始化，並綁定滑鼠點擊事件
	init: function(){
		this.addComponent("Canvas, Mouse")
			.bind("Click", this.mapClick);
	},
	//設定地圖圖片以及長寬
	setImg: function(url, w, h){
		Crafty.sprite(url, {BGimg: [0, 0, w, h]});
		this.addComponent("BGimg");
		return this;
	},
	//滑鼠點擊事件發生時會運作
	mapClick: function(data){
		var playerPos = Crafty("Player").getCenter();
		var mousePos = {
			x: data.realX,
			y: data.realY
		};
		var playerRadius = Crafty("Player").w/2;
		Crafty("Player").weapon.fire(playerPos, mousePos, playerRadius);
	}
});

Crafty.c("Bullet", {
	init: function(){
		this.addComponent("2D, DOM, Color")
			.attr({w: 10, h: 15})
			.color("gray")
			.origin("center")
			.bind("UpdateFrame", this.fly);

		this.v = 300;
		this.lifetime = 3;
		this.timer = 0;
	},
	fly: function(data){
		this.timer += data.dt / 1000;
		if(this.timer > this.lifetime) this.destroy();

		this.attr({
			x: this.x + this.direction.x * this.v * data.dt/1000,
			y: this.y + this.direction.y * this.v * data.dt/1000
		});
	}
});

//因player的DOM元素顯示存在些許誤差，需要微調武器的顯示位置(單位：px)
//x: 橫向偏移 / y: 縱向偏移 / r: player與武器之間預留空間 / b: 子彈生成與武器之間的預留空間
var weaponErr = {x: 2.5, y: 2, r: 5, b: 2};

//weapon基本屬性設定
Crafty.c("Weapon", {
	init: function(){
		this.addComponent("2D, DOM, Color")
			.attr({x: 0, y: 0, w: 30, h: 30})
			.origin("center")
			.color("red");
	},
	//由滑鼠點擊事件呼叫
	fire: function(playerPos, mousePos, playerRadius){
		//更改武器的位置與朝向
		playerRadius += this.h/2 + weaponErr.r;
		var distance = Crafty.math.distance(playerPos.x, playerPos.y, mousePos.x, mousePos.y);
		var Vec = new Crafty.math.Vector2D(mousePos.x - playerPos.x, mousePos.y - playerPos.y);
		var newCenter = {
			x: playerPos.x * (distance-playerRadius)/distance + mousePos.x * playerRadius/distance,
			y: playerPos.y * (distance-playerRadius)/distance + mousePos.y * playerRadius/distance
		};
		var newTopleft = this.center_to_topleft(newCenter);
		var Rad = Vec.angleBetween(new Crafty.math.Vector2D(0, 1));
		this.attr({
			x: newTopleft.x + weaponErr.x,
			y: newTopleft.y + weaponErr.y,
			rotation: -Crafty.math.radToDeg(Rad)
		});

		//生成子彈
		var bullet = Crafty.e("Bullet");
		var fireDiff = Vec.normalize().scale(this.h/2 + bullet.h/2 + weaponErr.b);
		bullet.attr({
			x: newCenter.x - bullet.w/2 + weaponErr.x + fireDiff.x,
			y: newCenter.y - bullet.h/2 + weaponErr.y + fireDiff.y,
			rotation: this.rotation
		});
		bullet.direction = Vec.normalize();
	},
	//將武器中央座標轉換為左上角座標
	center_to_topleft: function(center){
		return {x: center.x - this.w/2, y: center.y - this.h/2};
	},
	//將武器左上角座標轉換為中央座標
	topleft_to_center: function(topleft){
		return {x: topleft.x + this.w/2, y: topleft.y + this.h/2};
	}
});

//player基本屬性設定
Crafty.c("Player", {
	//設定player起始位置、移動速度、以及基本樣式
	init: function(){
		this.addComponent("2D, DOM, Fourway, Text, Mouse")
			.attr({w: 70, h: 70})
			.fourway(200)
			.css({
				backgroundColor: "rgba(255, 255, 255, 0.5)",
				textAlign: "center",
				fontSize: "15px",
				fontWeight: "bold",
				borderRadius: "50%",
				border: "solid 2px",
				textShadow: "white 0 0 5px"
			});

		this.weapon = Crafty.e("Weapon");
		var center = this.getCenter();
		this.weapon.attr({
			x: center.x - this.weapon.w/2 + weaponErr.x,
			y: center.y + this.h/2 + weaponErr.y + weaponErr.r
		});
		
		this.bind("Move", function(data){
			var delta = {
				x: this.x - data._x,
				y: this.y - data._y
			};
			this.weapon.attr({
				x: this.weapon.x + delta.x,
				y: this.weapon.y + delta.y
			});
		});
	},
	//設定照片
	setHeadshot: function(url){
		this.css({
			backgroundImage: "url('" + url + "')",
			backgroundPosition: "center bottom",
			backgroundSize: "100% auto",
			backgroundRepeat: "no-repeat"
		});
		return this;
	},
	//設定所屬隊伍
	setTeam: function(team){
		var color = "";
		switch(team){
			case 1:
				color = "crimson";
				break;
			case 2:
				color = "deepskyblue";
				break;
			case 3:
				color = "forestgreen";
				break;
			case 4:
				color = "coral";
				break;
			case 5:
				color = "blueviolet";
				break;
			case 6:
				color = "deeppink";
				break;
			case 7:
				color = "slategray";
				break;
			case 8:
				color = "cyan";
				break;
			case 9:
				color = "bisque";
				break;
			case 10:
				color = "greenyellow";
				break;
		}
		this.css({
			borderColor: color,
			boxShadow: "0 0 10px " + color
		});
		return this;
	},
	//獲得角色中央座標
	getCenter: function(){
		return {x: this.x + this.w/2, y: this.y + this.h/2};
	}
});