var canvas = document.getElementById('canvas').getContext('2d');

function loadImg(){
	var input = document.getElementById("img");
	if(!(input.files && input.files[0])) return;
	var regex = /^.+\.(jpe?g|gif|png)$/;
	if(!regex.test(input.files[0]["name"])){
		window.alert("上傳格式錯誤，請上傳圖片檔案");
		return;
	}

	var reader = new FileReader();
	reader.onload = e => {
		var img = new Image();
		img.src = e.target.result;
		img.onload = () => {
			var w = img.naturalWidth;
			var h = img.naturalHeight;
			var cc = document.getElementById("canvas");
			cc.setAttribute("width", w);
			cc.setAttribute("height", h);
			canvas.drawImage(img, 0, 0);
			var imageData = canvas.getImageData(0, 0, w, h);
			console.log(imageData);

			var a = imageData.data;
			/*
            var arrStr = "var landscape = [";
			for(var j = 0; j < h; j++){
                if(j != 0) arrStr += ",";
                arrStr += "[";
				for(var i = 0; i < w; i++){
                    if(i != 0) arrStr += ",";
					var idx = j * w + i;
					var R = a[idx*4], G = a[idx*4+1], B = a[idx*4+2], A = a[idx*4+3];
					if(R < 100 && G < 100 && B < 100){
						arrStr += "0";
						a[idx*4] = 0;
						a[idx*4+1] = 0;
						a[idx*4+2] = 0;
					}
					else if(R > 200 && G > 200 && B > 200){
						arrStr += "4";
						a[idx*4] = 255;
						a[idx*4+1] = 255;
						a[idx*4+2] = 255;
					}
					else if(R > 200){
						arrStr += "1";
						a[idx*4] = 255;
						a[idx*4+1] = 0;
						a[idx*4+2] = 0;
					}
					else if(G > 200){
						arrStr += "2";
						a[idx*4] = 0;
						a[idx*4+1] = 255;
						a[idx*4+2] = 0;
					}
					else if(B > 200){
						arrStr += "3";
						a[idx*4] = 0;
						a[idx*4+1] = 0;
						a[idx*4+2] = 255;
					}
					else{
						arrStr += "4";
						a[idx*4] = 255;
						a[idx*4+1] = 255;
						a[idx*4+2] = 255;
					}
				}
                arrStr += "]";
			}
            arrStr += "];";
			*/

			var arrStr = "var landscape = [\n";
			for(var j = 0; j < h; j++){
				if(j != 0) arrStr += ",\n";
				var prev_state = "", now_state = "", count = 0;
				var rowStr = "[";
				for(var i = 0; i < w; i++){
					var idx = j * w + i;
					var R = a[idx*4], G = a[idx*4+1], B = a[idx*4+2], A = a[idx*4+3];
					if(R < 100 && G < 100 && B < 100) now_state = "X";
					else if(R > 200 && G > 200 && B > 200) now_state = "A";
					else if(R > 200) now_state = "R";
					else if(G > 200) now_state = "B";
					else if(B > 200) now_state = "W";
					else now_state = "A";

					if(prev_state == "") prev_state = now_state;

					if(now_state == prev_state) count ++;
					else{
						if(rowStr != "[") rowStr += ",";
						rowStr += "['" + prev_state + "', " + count + "]";
						prev_state = now_state;
						count = 1;
					}
				}
				if(rowStr != "[") rowStr += ",";
				rowStr += "['" + prev_state + "', " + count + "]]";
				arrStr += rowStr;
			}
			arrStr += "\n];";


			canvas.putImageData(imageData, 0, 0);
            saveTextAsFile("landscape.txt", arrStr);
		}
	}
	reader.readAsDataURL(input.files[0]);
}

function saveTextAsFile(_fileName, _text){
	var textFileAsBlob = new Blob([_text], {type:'text/plain'});

	var downloadLink = document.createElement("a");
	downloadLink.download = _fileName;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = e => {
			document.body.removeChild(e.target);
		}
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}