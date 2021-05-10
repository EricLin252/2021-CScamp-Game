# 2021-CScamp-Game

## Crafty 簡易教學
[Crafty 簡易教學](https://hackmd.io/@zMGOXq6ZT6qYmFk5bOyXHQ/ryZuoFZOu)

## 檔案說明

* _**game.html**_  
	遊戲主頁，不需要編輯。

* _**landscape_generate.html**_  
	可選擇地形圖檔，生成地形資料檔 _landscape.txt_ 。

* _**js**_
	* _**crafty-min.js**_  
		crafty 函式庫，不用看，你也看不懂。

	* _**game.js**_  
		小隊員要學的部分，包含場景初始化，以及自製自己的角色。

	* _**component.js**_  
		所有遊戲中物件的定義，包含武器、子彈、玩家等基本設定。

	* _**tool.js**_  
		一些簡單的小function。

	* _**event.js**_  
		暫時用不到，我多寫的。

	* _**landscape.js**_  
		由 _landscape.html_ 生成的 txt 檔改副檔名而成，紀錄整個地圖的地形資訊。

* _**css**_
	* _**default.css**_  
		把 `<html>` 與 `<body>` 內的白邊去掉，不用看，也不會編輯這邊

* _**img**_
	* _**headshot**_  
		放玩家的大頭貼的地方

	* _**weapon**_  
		放武器與子彈的圖片的地方

	* _**skill**_  
		放技能的圖片的地方

	* _**map**_  
		放地圖的地方

**以上，你最需要學的就是 `game.js` 與 `component.js` 的內容**

## _game.js_

* _Crafty.init_  
	設定場景顯示範圍， `window.innerWidth, window.innerHeight` 表示瀏覽器此時視窗大小。

* 設計角色  
	讓小隊員學習宣告 _component_ ，掛載 _component.js_ 中的 _Player component_ 。

* 生成玩家角色物件在場景上  
	玩家初始位置到時會由系統隨機生成。

* _Crafty.viewport.follow_  
	設定攝影機跟隨 Player ，最後兩個0表示攝影機中央即為玩家，水平與垂直偏移都為0。

## _component.js_

### BG
> _public this **.setImg (** String **url** , Number **w** , Number **h )**_  
> **url**：地圖圖片檔的相對路徑  
> **w**：圖片像素寬度(px)  
> **h**：圖片像素高度(px)
> ***
> 設定地圖圖片，若 w 或 h 比原圖的長寬小，圖片會被裁切。  
***
> _void **.\_mapClick (** mouseEvent **data )**_  
> **data**：由 Click 事件傳送的滑鼠點擊事件資料
> ***  
> 只可以由 BG.init 中的 Click 事件呼叫，負責呼叫 Weapon.fire。

### Bullet
> _public Number **v** = 500_
> ***  
> 子彈速度(px/s)。
***
> _public Number **lifetime** = 3_
> ***
> 子彈最多可以在場上存活多久(秒)。
***
> _Number **\_timer** = 0_
> ***
> 記錄子彈目前已在場上存活多久(秒)。
***
> _void **.\_fly (** frameEvent **data )**_  
> **data**：由 UpdateFrame 事件傳送的frame更新資料
> ***
> 只可由 Bullet.init 中的 UpdataFrame 事件呼叫，負責更新目前子彈的位置，以及更新 timer ，確認子彈是否需要消滅。
***
> _public this **.setImg (** String **url )**_  
> **url**：子彈圖片檔的相對路徑
> ***
> 設定子彈圖片，圖片會被子彈的 w 與 h 拉伸變形。

### Weapon
> _String **\_bulletUrl** = undefined_
> ***
> 記錄武器的子彈的圖片檔相對路徑，只有在呼叫過 Weapon.setBullet 後才會被設置，否則都是 undefined。
***
> _this **\_fire (** Object **playerPos** , Object **mousePos** , Number **playerRadius )**_  
> **playerPos**：玩家角色中心位置座標(px)  
> **mousePos**：滑鼠點擊在地圖上的實際座標(px)  
> **playerRadius**：玩家角色半徑大小(px)
> ***
> **playerPos** = **{** Number **x** , Number **y }**  
> **mousePos** = **{** Number **x** , Number **y }**
> ***
> 依照玩家點擊的位置與玩家角色的連線，算出武器該更新的位置，並且使武器面向點擊的位置。  
> 同時，生成一個子彈物件在武器前，使用 bulletUrl 作為子彈的圖片，使子彈朝向武器的方向射出。
***
> _public this **.setImg (** String **url )**_  
> **url**：武器圖片檔的相對路徑
> ***
> 設定武器圖片，圖片會被武器的 w 與 h 拉伸變形。
***
> _public this **.setBullet (** String **url )**_  
> **url**：子彈圖片檔的相對路徑
> ***
> 將此武器所需子彈的圖片檔路徑暫存起來，以便呼叫 fire 時可以直接使用。

### Player
> _public this **.setHeadshot (** String **url )**_  
> **url**：大頭貼圖片檔的相對路徑
> ***
> 設定玩家角色的圖片，寬度會被自動縮放，圖片下部超出的部分會被裁切。
***
> _public this **.setTeam (** Number **team )**_  
> **team**：1~10的數字，代表玩家所屬的隊伍
> ***
> 設定玩家的所屬隊伍，依照隊伍的不同，給予不同的角色外框色。  
> 1：_crimson_  
> 2：_deepskyblue_  
> 3：_forestgreen_  
> 4：_coral_  
> 5：_blueviolet_  
> 6：_deeppink_  
> 7：_slategray_  
> 8：_cyan_  
> 9：_bisque_  
> 10：_greenyellow_
***
> _public this **.setWeapon (** String **url )**_  
> **url**：武器圖片檔的相對路徑
> ***
> 為角色新增武器，並設定武器圖片。
***
> _void **.\_whenMove (** moveEvent **data )**_  
> **data**：移動更新所帶的資料
> ***
> **data** = **{** Number **\_x** , Number **\_y** , Number **\_w** , Number **\_h }**
> ***
> 由 Move 事件呼叫，更新武器的位置，並且確認目前所在區域

### weaponErr
因player的DOM元素顯示存在些許誤差，需要微調武器的顯示位置。  
玩家、武器、子彈初始位置之間需要有間隔，也記錄在這邊。
> _public Number **x** = 2.5_
> ***
> 武器的橫向偏移量(px)。
***
> _public Number **y** = 2_
> ***
> 武器的縱向向偏移量(px)。
***
> _public Number **r** = 5_
> ***
> 玩家與武器之間預留空間(px)。
***
> _public Number **b** = 2_
> ***
> 子彈生成與武器之間的預留空間(px)。

## _tool.js_
> _public Object **center\_to\_topleft (** Object **center** , Object **size )**_  
> **center**：物體中心點座標(px)  
> **size**：物體長寬(px)  
> **return**：物體左上點座標(px)
> ***
> **center** = **{** Number **x** , Number **y }**  
> **size** = **{** Number **w** , Number **h }**  
> **return** = **{** Number **x** , Number **y }**
> ***
> 將一物體的中央點座標轉換為左上點座標。
***
> _public Object **topleft\_to\_center (** Object **topleft** , Object **size )**_  
> **topleft**：物體左上點座標(px)  
> **size**：物體長寬(px)  
> **return**：物體中心點座標(px)
> ***
> **topleft** = **{** Number **x** , Number **y }**  
> **size** = **{** Number **w** , Number **h }**  
> **return** = **{** Number **x** , Number **y }**
> ***
> 將一物體的左上點座標轉換為中央點座標。
***
> _public String **get\_landscape (** Object **center )**_  
> **center**：物體中心點座標(px)  
> **return**：物體所在的地區的種類
> ***
> **center** = **{** Number **x** , Number **y }**
> ***
> 尋找物體所在區域為何，回傳值有四種：  
> X：禁止進入區域(地圖外)  
> A：普通可行走區域  
> W：水域  
> R：競技區

## _landscape.js_
只存一個變數 _**landscape**_ ，是一個三維陣列：  
* ex1：  
	地圖寬度100(px)，地形上第1橫行(px)全是禁止進入區域，所以
	```js
	landscape[0] = ["X", 100]
	```
* ex2：  
	地圖寬度10(px)，地形上第1橫行(px)先是3格禁止進入區域，接著是4格普通行走區，最後是3格禁止進入區域，所以
	```js
	landscape[0] = [["X", 3], ["A", 4], ["X", 3]]
	```
* ex3：  
	地圖大小 10*3 (px)，地形上第1與第3橫行(px)全是禁止進入區域，第2橫行先是3格禁止進入區域，接著是4格普通行走區，最後是3格禁止進入區域，所以
	```js
	landscape = [
		[["X", 10]],
		[["X", 3], ["A", 4], ["X", 3]],
		[["X", 10]]
	];
	```
		