let currentIndex;
let tiles = [];
let overlay = document.getElementById('overlay');
let cross = document.getElementById('cross');

function closeOverlay(event) {
	if (event.target === overlay || event.target === cross || event.target === document.getElementsByTagName('body')[0]) {
		overlay.style.display = 'none';
	}
}

function isDisplayed() {
	return overlay.style.display === "block";
}

function fetchContent() {
	tiles = document.getElementsByClassName('img-galerie');
	for (let i = 0; i < tiles.length; i++) {
		tiles[i].index = i;
		tiles[i].type = tiles[i].dataset.type;
		tiles[i].addEventListener('click', showManager);
	}
}

function showManager() {
	if (window.innerWidth < 1080) {
		showMini(this);
	} else {
		show(this);
	}
}

function show(elem) {
	currentIndex = elem.index;
	
	let div = createDiv('overlayContainer', 'container overlayContent');
	let texte = createDiv(null, 'sideText');
	
	texte.innerHTML = elem.alt + elem.dataset.content;
	
	div.innerHTML = createImg('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	
	document.getElementById('insideOverlay').innerHTML = createSpan('arrowPrev', 'arrow flaticon-back').outerHTML + div.outerHTML + createSpan('arrowNext', 'arrow flaticon-next').outerHTML;
	resize();
	overlay.style.display = 'block';
	document.getElementById('arrowPrev').addEventListener('click', clickArrowP);
	document.getElementById('arrowNext').addEventListener('click', clickArrowN);
	window.addEventListener("keydown", handleKey);
}

function showMini(elem) {
	currentIndex = elem.index;
	
	let div = createDiv('overlayContainer', 'container overlayContent');
	let texte = createDiv(null, 'sideText');
	
	texte.innerHTML = elem.alt + elem.dataset.content;
	
	div.innerHTML = createImg('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	
	let arrowContainer = createDiv(null, "flexContent");
	arrowContainer.innerHTML = createSpan('arrowPrev', 'arrow flaticon-back').outerHTML + createSpan('arrowNext', 'arrow flaticon-next').outerHTML;
	
	document.getElementById('insideOverlay').innerHTML = div.outerHTML + arrowContainer.outerHTML;
	overlay.style.display = 'block';
	resize();
	document.getElementById('arrowPrev').addEventListener('click', clickArrowP);
	document.getElementById('arrowNext').addEventListener('click', clickArrowN);
	window.addEventListener("keydown", handleKey);
}

function clickArrowP() {
	let prev = currentIndex - 1;
	if (currentIndex === 0) {
		prev = tiles.length - 1;
	}
	tiles[prev].dispatchEvent(new Event('click'));
}

function clickArrowN() {
	let next = currentIndex + 1;
	if (currentIndex === tiles.length - 1) {
		next = 0;
	}
	tiles[next].dispatchEvent(new Event('click'));
}

function createDiv(id, classe) {
	let div = document.createElement('div');
	if (id) {
		div.id = id;
	}
	if (classe) {
		div.className = classe;
	}
	return div;
}

function createImg(id, classe, src) {
	let img = document.createElement('img');
	if (id) {
		img.id = id;
	}
	if (classe) {
		img.className = classe;
	}
	img.src = src;
	return img;
}

function createSpan(id, classe) {
	let span = document.createElement('span');
	if (id) {
		span.id = id;
	}
	if (classe) {
		span.className = classe;
	}
	return span;
}

function createIFrame(id, classe, src) {
	let frame = document.createElement('iFrame');
	if (id) {
		frame.id = id;
	}
	if (classe) {
		frame.className = classe;
	}
	frame.src = src;
	frame.frameborder = "0";
	return frame;
}

function createP(id, classe, content) {
	let p = document.createElement('p');
	if (id) {
		p.id = id;
	}
	if (classe) {
		p.class = classe;
	}
	p.innerHTML = content;
	return p;
}

function setEvents() {
	overlay.addEventListener('click', function (event) {
		closeOverlay(event);
	});
	cross.addEventListener('click', closeOverlay);
}

function handleKey(event) {
	if (isDisplayed()) {
		if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
			clickArrowP();
		}
		if (event.code === 'ArrowRight' || event.code === 'KeyD') {
			clickArrowN();
		}
		if (event.code === 'Escape') {
			closeOverlay(event);
		}
	}
}

function resize() {
	let content = document.getElementById('currentDisplay');
	let width, height;
	let inside = document.getElementById('overlayContainer');
	
	content.onload = function () {
		height = content.offsetHeight;
		width = content.offsetWidth;
		console.log(width + " " + height);
		if (width > height) { //si paysage
			content.style.maxWidth = '75vw';
			content.style.height = 'auto';
			
		} else { //si portrait ou carré
			content.style.maxHeight = '75vh';
			content.style.width = 'auto';
		}
		if (window.innerWidth < 640) {
			content.style.height = "350px";
			inside.style.display = "block";
		}
	};
}

function main() {
	fetchContent();
	setEvents();
}

window.onload = main;
