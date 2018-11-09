// When the user scrolls the page, execute myFunction
window.onscroll = function() {
  myFunction()
};

// Get the NAVBAR

const NAVBAR = document.getElementById("navContainer");
const TXT = document.getElementsByTagName("h1")[0];
const TXT_HALF_SIZE = TXT.offsetHeight * 0.5;
const TXT_TOP = TXT.offsetTop - TXT_HALF_SIZE;
const GAP = document.getElementById("top").offsetHeight/2 - TXT_HALF_SIZE;
const STEP = GAP / 50;

// Get the offset position of the NAVBAR
var sticky = NAVBAR.offsetTop;

// Add the sticky class to the NAVBAR when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (!TXT.classList.contains("sticky") && TXT_TOP <= window.pageYOffset) {
	resizeTXT();
    TXT.classList.add("anchor");
} if (document.getElementsByTagName("html")[0].scrollTop < GAP) {
    TXT.classList.remove("anchor");
  }

  if (window.pageYOffset >= sticky) {
    NAVBAR.classList.add("sticky");
    TXT.classList.add("sticky");
  } else {
    NAVBAR.classList.remove("sticky");
    TXT.classList.remove("sticky");
  }
}

function resizeTXT() {
	let newSize;
	if (document.getElementById("top").offsetHeight/2 > NAVBAR.getBoundingClientRect().top) {
		console.log(document.getElementById("top").offsetHeight/2 - NAVBAR.getBoundingClientRect().top);
		newSize = 7 - ((document.getElementById("top").offsetHeight/2 - NAVBAR.getBoundingClientRect().top)/STEP)*0.1;
	}

	if (newSize < 2) {
		newSize = 2;
	} else if (newSize > 7) {
		newSize = 7;
	}
	TXT.style.fontSize = newSize+"em";
}
