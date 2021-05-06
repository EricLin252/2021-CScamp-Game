2021-CScamp-Game
===
## Crafty 簡易教學
[Crafty 簡易教學](https://hackmd.io/@zMGOXq6ZT6qYmFk5bOyXHQ/ryZuoFZOu)

## 檔案說明
* _**game.html**_  
	遊戲主頁，不需要編輯

* _**js**_
	* _**crafty-min.js**_  
		crafty 函式庫，不用看，你也看不懂

	* _**game.js**_  
		小隊員要學的部分，包含場景初始化，以及自製自己的角色

	* _**component.js**_  
		所有遊戲中物件的定義，包含武器、子彈、玩家等基本設定

	* _**event.js**_  
		暫時用不到，我多寫的

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
> **url**：地圖圖片的相對路徑  
> **w**：圖片像素寬度  
> **h**：圖片像素高度  
> ***
> 設定地圖圖片，若 w 或 h 比原圖的長寬小，圖片會被裁切。  
***
> _void **.mapClick (** mouseEvent **data )**_  
> **data**：由 Click 事件傳送的滑鼠點擊事件資料  
> ***  
> 只可以由 BG.init 中的 Click 事件呼叫，負責呼叫 Weapon.fire

### Bullet
> _public Number **v** = 500_
> ***  
> 子彈速度
***
> _public Number **lifetime** = 3_
> ***
> 子彈最多可以在場上存活多久(秒)
***
> _Number **timer** = 0_
> ***
> 記錄子彈目前已在場上存活多久(秒)
***
> _void **.fly (** frameEvent **data )**_