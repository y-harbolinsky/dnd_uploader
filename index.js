(function(){
	
	var list = [];
	var bytes_uploaded = [];
	var index = 0;
	function processFiles(files) {
	
		if(!files || !files.length || list.length) {
			return;
		}
		
		index = -1;
		list = [];
		bytes_uploaded = [];
		
		var ul = $('#files');
		ul.html();
		var filesCount = files.length;
		for(var i=0; i < filesCount; i++) {			
			list.push(files[i]);
			bytes_uploaded.push(10);	
			
			var li = $('<li id="file' + i + '">');
			li.append('<span class="progress"><canvas width="200" height="20"></canvas></span>');
			li.append('<span class="name">' + files[i].name + '</span>');
			ul.append(li);
		}

		$('#info').slideToggle('fast');
		
		for(var i=0; i < filesCount; i++){
			drawProgress(i);
		}
		
		uploadNext();		
	}
	
	function uploadNext() {
		if(list.length){
			index++;
			if(index < list.length){
				uploadFile(list[index]);
			}
		}
	}
	
	function uploadFile(file) {
		var xhr = new XMLHttpRequest();
		xhr.open("post", "/upload/", true);
		xhr.onload = function() {
			switch(this.status) {
				case 200:
					bytes_uploaded[index] = file.size;
					drawProgress();
					uploadNext();
					break;
				
				default:
					console.log("Files not uploaded.");		
			}
		};
		
		xhr.onerror = function() {
			console.log('Error');
		}
		
		xhr.upload.onprogress = function(event) {
			bytes_uploaded[index] = event.loaded;
			drawProgress();
		}
		
		var formData = new FormData();
		formData.append('myfile', file);
		xhr.send(formData);
	}

	function drawProgress(i) {
	
		if(typeof i === 'undefined'){
			i = index;
		}
	
		var progress = bytes_uploaded[i]/list[i].size;
		var canvas = $('#file' + i + ' canvas');
		var width = canvas.width();
		var height = canvas.height();
		var context = canvas[0].getContext('2d');
		
		context.clearRect(0, 0, width, height);
		context.beginPath();
		context.strokeStyle = '#4b9500';
		context.fillStyle = '#4b9500';
		context.fillRect(0, 0, progress * width, height);
		context.closePath();
		
		context.font = '12px Verdana';
		context.fillStyle = '#000';
		context.fillText(Math.floor(progress*100) + '%', 50, 15);
	}

	function prepareEvent(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	// fires as soon as the file is dragged over the webpage or element
	document.addEventListener("dragenter", function(event) {
		prepareEvent(event);
	}, false);

	// firing repeatedly as the file is moved within the droppable area
	document.addEventListener("dragover", function(event) {
		prepareEvent(event);
	}, false);

	// fires when the file is dragged out of the webpage or element
	document.addEventListener("dragleave", function(event) {
		prepareEvent(event);
	}, false);

	document.addEventListener("drop", function(event) {
		prepareEvent(event);
		if(event.target.id == "target") {
			processFiles(event.dataTransfer.files);
		}
	}, false);
	
})();