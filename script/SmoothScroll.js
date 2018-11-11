const TIME = 1000;
const HTML = document.getElementsByTagName("html")[0];
let step = 10;

let target;




function clickManager() {
	fetchElements(event);
	smoothScroll(window.pageYOffset, target-80);
}

function fetchElements(event) {
	for (let elem of event.path) {
		if (elem.tagName == "A") {
			target = document.getElementById(elem.dataset.goto).offsetTop;
		}
	}
}

async function smoothScroll(source, target) {
	let msToWait = TIME/(Math.abs(source-target)/step);
	if (source > target) {
		for (let i = source; i > target; i-=step) {
			HTML.scrollTop = i;
			await sleep(msToWait);
		}
	} else {
		for (let i = source; i < target; i+=step) {
			HTML.scrollTop = i;
			await sleep(msToWait);
		}
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
