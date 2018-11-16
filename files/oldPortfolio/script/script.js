
var pop = document.getElementById('popup');
var image = document.getElementsByClassName('img-galerie');
var fullvideo = document.getElementById('fullsize_video');
var fullimg = document.getElementById('fullsize');
var desc = document.getElementById('description');
var container = document.getElementById('fullsize_container');
var indice_prev = "";
var indice_next = "";
var button_prev = document.getElementById('previous');
var button_next = document.getElementById('next');
var cross = document.getElementById('cross');
var nbr_img = image.length - 1;

window.addEventListener('load', thumbs_size);
window.addEventListener('resize', thumbs_size);
for (var i = 0; i < image.length; i++) {
    image[i].addEventListener('click', click_img);
}
document.getElementById('previous').addEventListener('click', function() {
    reset_container();
    click_img.call(indice_prev);
});
document.getElementById('next').addEventListener('click', function() {
    reset_container();
    click_img.call(indice_next);
});

function click_img() {
    reset_container();
    var ceci = this;
    var fullsize_url = ceci.dataset.full;
    if (ceci.dataset.type == "video") {
        fullvideo.src = fullsize_url;
        fullvideo.style.display = 'block';
    } else {
        fullimg.src = fullsize_url;
        fullimg.style.display = 'block';
    }
    if (ceci.dataset.type == "LP") {
        container.style.width = 'auto';
        fullimg.style.width = 'auto'
    }
    desc.innerHTML = ceci.alt;
    pop.style.display = 'block';
    var j = 0
    while (image[j] != ceci) {
        j++;
    }
    indice_prev = image[j - 1];
    indice_next = image[j + 1];
    if (j == 0) {
        indice_prev = image[nbr_img];
    } else if (j == nbr_img) {
        indice_next = image[0];
    }
}

function close_img() {
  reset_container;
    pop.style.display = 'none';
}
fullimg.addEventListener('click', close_img);
cross.addEventListener('click', close_img);

function reset_container() {
    fullvideo.style.display = 'none';
    fullimg.style.display = 'none';
    fullimg.style.width = '100%';
    if (window.innerWidth < 640) {
        container.style.width = '90%';
    }
}

function thumbs_size() {
  if (window.innerWidth <= 640) {
    var new_size = document.getElementsByClassName('center')[0].offsetWidth*0.49 +"px";
  }
  if (window.innerWidth > 640 && window.innerWidth <= 1000) {
    var new_size = document.getElementsByClassName('center')[0].offsetWidth*0.32 +"px";
  }
  if (window.innerWidth > 1000) {
     var new_size = document.getElementsByClassName('center')[0].offsetWidth*0.24 +"px";
  }
  for (var k=0; k<nbr_img; k++){
    image[k].style.width = new_size;
  }
}
