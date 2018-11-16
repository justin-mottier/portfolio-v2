let tab = document.getElementsByTagName('a');
for (let a of tab) {
	a.addEventListener('click', scroll);
}

function scroll() {
	let from = this;
	let to = this.href;
	
	console.log(from+" "+to);
}