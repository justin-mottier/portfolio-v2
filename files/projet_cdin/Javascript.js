// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
    document.getElementById("Back").style.display = "block";
  } else {
    document.getElementById("Back").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener("DOMContentLoaded", resize);
window.addEventListener("resize", resize);

function resize() {
  document.getElementById('header').style.height = window.innerHeight + "px";
  document.getElementById('header').style.width = window.clientWidth + "px";
  document.getElementsByTagName[0].style.width = window.clientWidth + "px";
}
