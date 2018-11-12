const TIME = 1000;
const HTML = document.getElementsByTagName("html")[0];
let step = 10;

async function smoothScroll(event) {
	let source = window.pageYOffset;
	let target;
	if (event.target.tagName != 'A') {
		console.log(event.target.parentElement.dataset.goto);
		target = document.getElementById(event.target.parentElement.dataset.goto).offsetTop-80;
	} else {
		target = document.getElementById(event.target.dataset.goto).offsetTop-80;
	}
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
