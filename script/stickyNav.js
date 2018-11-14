// A chaque scoll, execute classManager()
window.onscroll = classManager;
window.onresize = classManager;

const NAVBAR = document.getElementById("navContainer"); //navbar
const NAVBAR_TOP = NAVBAR.offsetTop; //distance entre haut de la page et le haut de NAVBAR

const TXT = document.getElementsByTagName("h1")[0]; //texte sur header
const TXT_HALF_SIZE = TXT.offsetHeight * 0.5; //demi-hauteur de TXT
const TXT_TOP = TXT.offsetTop - TXT_HALF_SIZE; //distance entre haut de la page et le haut de TXT

const GAP = document.getElementById("top").offsetHeight / 2 - TXT_HALF_SIZE; //écart entre le bas de TXT et le haut de NAVBAR
const STEP = GAP / 50; //un pas = l'écart divisé par (7em-2em)/0.1em


function classManager() {
	resizeTXT(); //à chaque scroll on redimensionne la taille de TXT
	if (!TXT.classList.contains("sticky") && TXT_TOP <= window.pageYOffset) { //si TXT n'est pas sur la NAVBAR et que le bord de TXT n'est pas au bord du viewport
		TXT.classList.add("anchor");
	}
	if (window.pageYOffset < GAP) {			  								  //si la distance scrollée est inférieure à l'écart entre le haut de la page et le haut de TXT
		TXT.classList.remove("anchor");
	}

	if (window.pageYOffset >= NAVBAR_TOP) { 								  //si la distance scrollée est supérieure au haut de la NAVBAR on colle NARVBAR et TXT en haut du viewport
		NAVBAR.classList.add("sticky");
		TXT.classList.add("sticky");
	} else {																  //sinon on les décolle
		NAVBAR.classList.remove("sticky");
		TXT.classList.remove("sticky");
	}
}

function resizeTXT() {
	let newSize;
	if (document.getElementById("top").offsetHeight / 2 > NAVBAR.getBoundingClientRect().top) {								//si TXT est en cours de déplacement
		newSize = 7 - ((document.getElementById("top").offsetHeight / 2 - NAVBAR.getBoundingClientRect().top) / STEP) * 0.1;//On le redimensionne en fonction de la distance
	}
	if (newSize < 2) { //si sa taille n'est pas comprise entre 2 et 7, on redimensonne
		newSize = 2;
	} else if (newSize > 7 || !TXT.classList.contains("anchor")) { //si TXT n'est plus en mouvement on lui remet 7em de taille
		newSize = 7;
	}
	newSize = Math.round(newSize * 100) / 100; //on arrondit la valeur au centieme
	TXT.style.fontSize = newSize + "em"; //on applique la nouvelle taille
}
