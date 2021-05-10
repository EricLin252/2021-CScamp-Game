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
		var player = Crafty("Player");
		var playerPos = topleft_to_center({x: player.x, y: player.y}, {w: player.w, h: player.h});
		var mousePos = {x: data.realX, y: data.realY};
		var playerRadius = player.w/2;
		var playerWeapon = player.weapon;
		if(playerWeapon) playerWeapon.fire(playerPos, mousePos, playerRadius);
	}
});

//bullet基本屬性設定
Crafty.c("Bullet", {
	//設定子彈大小，並且設定初始速度、存活時長
	init: function(){
		this.addComponent("2D, DOM")
			.attr({w: 10, h: 15})
			.origin("center")
			.bind("UpdateFrame", this.fly);

		this.v = 500;
		this.lifetime = 3;
		this.timer = 0;
	},
	//每frame更新一次子彈位置，並決定子彈是否消滅
	fly: function(data){
		this.timer += data.dt / 1000;
		if(this.timer > this.lifetime) this.destroy();

		this.attr({
			x: this.x + this.direction.x * this.v * data.dt/1000,
			y: this.y + this.direction.y * this.v * data.dt/1000
		});
	},
	//設定子彈圖片
	setImg: function(url){
		this.css({
			backgroundImage: "url('" + url + "')",
			backgroundSize: "100% 100%",
			backgroundPosition: "center center"
		});
		return this;
	}
});

//因player的DOM元素顯示存在些許誤差，需要微調武器的顯示位置(單位：px)
//x: 橫向偏移 / y: 縱向偏移 / r: player與武器之間預留空間 / b: 子彈生成與武器之間的預留空間
var weaponErr = {x: 2.5, y: 2, r: 5, b: 2};

//weapon基本屬性設定
Crafty.c("Weapon", {
	init: function(){
		this.addComponent("2D, DOM")
			.attr({x: 0, y: 0, w: 50, h: 50})
			.origin("center");
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
		var newTopleft = center_to_topleft(newCenter, {w: this.w, h: this.h});
		var Rad = Vec.angleBetween(new Crafty.math.Vector2D(0, 1));
		this.attr({
			x: newTopleft.x + weaponErr.x,
			y: newTopleft.y + weaponErr.y,
			rotation: -Crafty.math.radToDeg(Rad)
		});

		//生成子彈
		var bullet = Crafty.e("Bullet");
		if(this.bulletUrl) bullet.setImg(this.bulletUrl);
		var fireDiff = Vec.normalize().scale(this.h/2 + bullet.h/2 + weaponErr.b);
		bullet.attr({
			x: newCenter.x - bullet.w/2 + weaponErr.x + fireDiff.x,
			y: newCenter.y - bullet.h/2 + weaponErr.y + fireDiff.y,
			rotation: this.rotation
		});
		bullet.direction = Vec.normalize();

		return this;
	},
	//設定武器圖片
	setImg: function(url){
		this.css({
			backgroundImage: "url('" + url + "')",
			backgroundSize: "100% 100%",
			backgroundPosition: "center center"
		});
		return this;
	},
	//設定武器所屬子彈圖片
	setBullet: function(url){
		this.bulletUrl = url;
		return this;
	}
});

//player基本屬性設定
Crafty.c("Player", {
	//設定player起始位置、移動速度、以及基本樣式
	init: function(){
		this.addComponent("2D, DOM, Fourway, Text, Mouse")
			.attr({x: 2000, y: 2000, w: 70, h: 70})
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
		
		this.bind("Move", this.whenMove);

		this.validPos = {x: this.x, y: this.y};
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
	//設定武器
	setWeapon: function(url){
		this.weapon = Crafty.e("Weapon").setImg(url);
		var center = topleft_to_center({x: this.x, y: this.y}, {w: this.w, h: this.h});
		this.weapon.attr({
			x: center.x - this.weapon.w/2 + weaponErr.x,
			y: center.y + this.h/2 + weaponErr.y + weaponErr.r
		});
	},
	//每次角色更新座標位置時都會觸發
	whenMove: function(data){
		var _center = topleft_to_center({x: data._x, y: data._y}, {w: this.w, h: this.h});
		var center = topleft_to_center({x: this.x, y: this.y}, {w: this.w, h: this.h});
		var new_state = get_landscape(center);

		if(new_state == "X"){
			this.attr(this.validPos);
		}
		else{
			var delta = {
				x: this.x - this.validPos.x,
				y: this.y - this.validPos.y
			};

			this.validPos.x = this.x;
			this.validPos.y = this.y;

			if(this.weapon){
				this.weapon.attr({
					x: this.weapon.x + delta.x,
					y: this.weapon.y + delta.y
				});
			}
		}
	}
});