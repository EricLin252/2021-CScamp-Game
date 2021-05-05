//系統初始化，將場景長寬設為與螢幕相同
Crafty.init(window.innerWidth, window.innerHeight);
//加載地圖
Crafty.sprite("NCTUmap2.jpg", {BG: [0, 0, 6405, 5169]});
Crafty.e("Canvas, BG");

//player基本屬性設定
Crafty.c("Player", {
	//設定player起始位置、移動速度、以及基本樣式
	init: function(){
		this.addComponent("2D, DOM, Fourway, Text")
			.attr({x: 0, y: 0, w: 70, h: 70})
			.fourway(200)
			.css({
				backgroundColor: "rgba(255, 255, 255, 0.5)",
				textAlign: "center",
				fontSize: "15px",
				fontWeight: "bold",
				borderRadius: "50%",
				border: "solid 2px"
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
				color = "chocolate";
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
	}
});

//讓小隊員自己設計自己的角色
Crafty.c("林冠宇", {
	init: function(){
		this.addComponent("Player")
			.text("林冠宇")
			.setHeadshot("head.jpg")
			.setTeam(7);
	}
});

//在場景上生成一個玩家，設為剛剛設計的角色型態
var Player = Crafty.e("林冠宇")
					.attr({x: 2000, y: 2000});

//讓攝影機持續跟隨玩家
Crafty.viewport.follow(Player, 0, 0);