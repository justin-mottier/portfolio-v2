let currentIndex;
let tiles = [];
let overlay = document.getElementById('overlay');
let cross = document.getElementById('cross');

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
        tiles[i].addEventListener('click', show);
    }
}

function show() {
    currentIndex = this.index;
    let div = createDiv('overlayContainer', 'container overlayContent');
    if (this.dataset.type === 'img') {
		div.innerHTML = createImg('currentDisplay', null, this.dataset.full).outerHTML + this.alt;
	} else if (this.dataset.type === 'project') {
    div.style.display = "inline-flex";
    let texte = createDiv(null, 'sideText');
    texte.innerHTML = this.alt + this.dataset.content;
    div.innerHTML = createImg('currentDisplay', null, this.dataset.full).outerHTML + texte.outerHTML;
    console.log(this);
    } else if (this.dataset.type === 'video') {
        div.innerHTML = createIFrame('currentDisplay', null, this.dataset.full).outerHTML;
    }
    document.getElementById('insideOverlay').innerHTML = createImg('arrowPrev', 'arrow', 'img/prev.png').outerHTML + div.outerHTML + createImg('arrowNext', 'arrow', 'img/next.png').outerHTML;
    overlay.style.display = 'block';
	  resize();
    document.getElementById('arrowPrev').addEventListener('click', clickArrowP);
    document.getElementById('arrowNext').addEventListener('click', clickArrowN);
    window.addEventListener("keydown", handleKey);
}

function clickArrowP() {
    let prev = currentIndex-1;
    if (currentIndex === 0) {
        prev = tiles.length-1;
    }
    tiles[prev].dispatchEvent(new Event('click'));
}

function clickArrowN() {
    let next = currentIndex+1;
    if (currentIndex === tiles.length-1) {
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
  frame.allowfullscreen;
	return frame;
}

function setEvents() {
    overlay.addEventListener('click', function(event) {
        closeOverlay(event);
    });
    cross.addEventListener('click', closeOverlay);
}

function handleKey(event) {

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

function resize() {
    let content = document.getElementById('currentDisplay');
    let width, height;
	content.onload = function() {
		height = content.height;
		width = content.width;
		console.log(width + " " + height);
		if (width < height) { //si portrait
			console.log("portrait");
			content.style.height = '75vh';
			content.style.width = 'auto';
		} else { //si paysage ou carré
			console.log("paysage");
			content.style.width = '75vw';
      content.style.height = 'auto';
		}
	};
}

function main() {
    fetchContent();
    setEvents();
}
