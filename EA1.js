automated = false;

function loadImage(filename) {
	currentFile = filename;
	var imageObj = new Image();
	imageObj.onload = function() {
		var img = document.getElementById('scheibe');
		img.setAttribute('src', this.src);
	};
	imageObj.src = "textures/" + filename;
}

function loadImageTwo(filename) {
	currentFileTwo = filename;
	var imageObj = new Image();
	imageObj.onload = function () {
		var img = document.getElementById('junge');
		img.setAttribute('src', this.src);
	};
	imageObj.src = "textures/" + filename;
}

function nextImage() {
	currentNumber = currentFile.slice(0, currentFile.indexOf("."));
	currentNumber = parseInt(currentNumber) + 1;
	if (currentNumber == 25) {
		currentNumber = 1;
	}
	loadImage(currentNumber + ".png");

	currentNumberTwo = currentFileTwo.slice(3, currentFileTwo.indexOf("."));
	currentNumberTwo = parseInt(currentNumberTwo) + 1;
	if (currentNumberTwo == 16) {
		currentNumberTwo = 1;
	}
	loadImageTwo("Run" + currentNumberTwo + ".png");
}

function prevImage() {
    currentNumber = currentFile.slice(0, currentFile.indexOf("."));
	currentNumber = parseInt(currentNumber) - 1;
	if (currentNumber == 0) {
		currentNumber = 24;
	}
	loadImage(currentNumber + ".png");

	currentNumberTwo = currentFileTwo.slice(3, currentFileTwo.indexOf("."));
	currentNumberTwo = parseInt(currentNumberTwo) - 1;
	if (currentNumberTwo == 0) {
		currentNumberTwo = 15;
	}
	loadImageTwo("Run" + currentNumberTwo + ".png");
}

function autoAnimate() {
	if (automated == false) {
		loop = window.setInterval(nextImage, 75);
		nextImage();
		automated = true;
	} else {
		automated = false;
		window.clearInterval(loop);
    }
}
	

window.onkeydown = function (evt) {
    var key = evt.which ? evt.which : evt.keyCode;
    var c = String.fromCharCode(key);
    switch (c) {
        case ('R'):
            nextImage();
            break;
		case ('L'):
			prevImage();
			break;
		case ('A'):
			autoAnimate();
			break;
    }
};