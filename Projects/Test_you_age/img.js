var images = [
   "img/foto1.png",
   "img/foto2.png",
   "img/foto3.png",
   "img/foto4.png",
   "img/foto5.png",
   "img/foto6.png",
   "img/foto7.png",
];
var num = 0;

function next() {
	var slider = document.getElementById("slider");
	num++;
	if (num >= images.length) {
		num = 0;
	}
	slider.src = images[num];
}

function prev() {
	var slider = document.getElementById("slider");
	num--;
	if (num < 0) {
		num = images.length - 1;
	}
	slider.src = images[num];
}

