//系統初始化，將場景長寬設為與螢幕相同
Crafty.init(window.innerWidth, window.innerHeight);
//加載地圖
Crafty.e("BG").setImg("NCTUmap2.jpg", 6405, 5169);

//讓小隊員自己設計自己的角色
Crafty.c("林冠宇", {
	init: function(){
		this.addComponent("Player")
			.text("林冠宇")
			.setHeadshot("head.jpg")
			.setTeam(9);
	}
});

//在場景上生成一個玩家，設為剛剛設計的角色型態
var Player = Crafty.e("林冠宇").attr({x: 2000, y: 2000});

//讓攝影機持續跟隨玩家
Crafty.viewport.follow(Player, 0, 0);