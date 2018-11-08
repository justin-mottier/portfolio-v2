var script = function() {
	b1.addEventListener("click",funcb1);
  b2.addEventListener("click",funcb2);
  b3.addEventListener("click",funcb3);
}
window.addEventListener("load",script);

var b1 = document.getElementById('b1');
var b2 = document.getElementById('b2');
var about = document.getElementById('about')
var b3 = document.getElementById('b3');
var contact = document.getElementById('contact');
var shadow = document.getElementById('shadow')

function funcb1() {
  contact.style.zIndex= "-2";
  about.style.zIndex= "-1";
  about.style.opacity = "0";
  contact.style.opacity = "0";
  shadow.style.opacity = "0";
}
function funcb2() {
  contact.style.zIndex= "-2";
  about.style.zIndex= "1";
  about.style.opacity = "1";
  contact.style.opacity = "0";
  shadow.style.opacity = "0";
  shadow.style.opacity = "1"
}
function funcb3() {
  about.style.zIndex= "-1";
  contact.style.zIndex= "2";
  about.style.opacity = "0";
  contact.style.opacity = "1";
  contact.style.opacity = "1"
  shadow.style.opacity = "1";
  shadow.style.opacity = "1"
}
