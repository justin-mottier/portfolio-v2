let currentIndex;
let tiles = [];
let overlay = document.getElementById('overlay');

function closeOverlay(event) {
	if (event.target === overlay || event.target === cross || event.target === document.getElementsByTagName('body')[0]) {
		overlay.style.display = 'none';
	}
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
	if (elem.dataset.type === "img") {
		div.innerHTML = createImg('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	} else if (elem.dataset.type === "video") {
		div.innerHTML = createVideo('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	}
	
	document.getElementById('insideOverlay').innerHTML = createSpan('arrowPrev', 'arrow flaticon-back').outerHTML + div.outerHTML + createSpan('arrowNext', 'arrow flaticon-next').outerHTML + createSpan('cross', 'flaticon-cancel').outerHTML;
	
	resize();
	overlay.style.display = 'block';
	document.getElementById('arrowPrev').addEventListener('click', clickArrowP);
	document.getElementById('arrowNext').addEventListener('click', clickArrowN);
	document.getElementById('cross').addEventListener('click', closeOverlay);
	window.addEventListener("keydown", handleKey);
}

function showMini(elem) {
	currentIndex = elem.index;
	
	let div = createDiv('overlayContainer', 'container overlayContent');
	let texte = createDiv(null, 'sideText');
	
	texte.innerHTML = elem.alt + elem.dataset.content;
	
	if (elem.dataset.type === "img") {
		div.innerHTML = createImg('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	} else if (elem.dataset.type === "video") {
		div.innerHTML = createVideo('currentDisplay', null, elem.dataset.full).outerHTML + texte.outerHTML;
	}
	
	let arrowContainer = createDiv(null, "flexContent");
	arrowContainer.innerHTML = createSpan('arrowPrev', 'arrow flaticon-back').outerHTML + createSpan('cross', 'flaticon-cancel').outerHTML + createSpan('arrowNext', 'arrow flaticon-next').outerHTML;
	
	document.getElementById('insideOverlay').innerHTML = div.outerHTML + arrowContainer.outerHTML;
	overlay.style.display = 'block';
	resizeMini();
	document.getElementById('arrowPrev').addEventListener('click', clickArrowP);
	document.getElementById('arrowNext').addEventListener('click', clickArrowN);
	document.getElementById('cross').addEventListener('click', closeOverlay);
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

function createVideo(id, classe, src) {
	let vid = document.createElement('video');
	vid.autoplay = true;
	vid.loop = true;
	vid.muted = true;
	vid.playsinline = true;
	if (id) {
		vid.id = id;
	}
	if (classe) {
		vid.className = classe;
	}
	let source = document.createElement('source');
	source.src = src+".mp4";
	source.type = "video/mp4";
	
	let source2 = document.createElement('source');
	source2.src = src+".webm";
	source2.type = "video/webm";
	vid.innerHTML = source.outerHTML + source2.outerHTML;
	return vid;
}

function handleKey(event) {
	if (overlay.style.display === "block") {
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

function resizeMini() {
	let content = document.getElementById('currentDisplay');
	content.style.width = '100%';
	content.style.height = 'auto';
}

function main() {
	fetchContent();
	overlay.addEventListener('click', closeOverlay);
}

window.onload = main;
