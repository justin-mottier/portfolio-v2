document.getElementById("Binit").addEventListener("click", init);
document.getElementById('Bincendie').addEventListener("click", depart_incendie);
window.onload = setTimeout(intro, 100); 


var abscisse = 500;
var ordonnee = 500;
var proba = 0.5;
var temps = 1;
var c = '';
var nbrTrees = 0;
var nbrTreesLeft = 0;
var verif = false;
var aleaX = 0;
var aleaY = 0;
var to1, to2, to3, to4, to5, to6 = " ";

function init() { 
    reinit()
    temps = document.getElementById("temps").value * 1000;
    setTimeout(function() {
        abscisse = (Math.round(document.getElementById("largeur").value / 10) * 10);
        ordonnee = (Math.round(document.getElementById("hauteur").value / 10) * 10);
        document.getElementById("container-canvas").innerHTML = "<canvas id='pane' width=" + abscisse + " height=" + ordonnee + " onmousedown='getpos(event)'></canvas>"; 
        document.getElementById("container-canvas").style.width = abscisse;
        c = document.getElementById("pane").getContext('2d'); 
        proba = document.getElementById("proba").value;
        nbrTrees = 0;
        var cote = 10;
        for (var i = 0; i < abscisse; i += cote) {
            for (var r = 0; r < ordonnee; r += cote) {
                var alea = Math.random();
                if (alea <= proba) {
                    c.fillStyle = "green";
                    c.fillRect(i, r, cote, cote);
                    nbrTrees++;
                }
            }
        }
        nbrTreesLeft = nbrTrees;
        verif = true;
       var cell = document.getElementById('infos').innerHTML = "Il y a " + nbrTrees + " arbres dans la forêt";
    }, 2 * temps);
}

function reinit() {
    clearTimeout(to1);
    clearTimeout(to2);
    clearTimeout(to3);
    clearTimeout(to4);
    clearTimeout(to5);
    clearTimeout(to6);
    verif = false;
    document.getElementById('infos').innerHTML = "";

}

function getpos(evt) {
    if (verif) {
        var x = evt.pageX;
        var x_true = x - (window.innerWidth - abscisse)/2 + 10;
        var clickX = (Math.ceil(x_true / 10) * 10)-10;
        if (clickX == 500){clickX = 490}
        var y = evt.pageY;
        var y_true = y-414;
        var clickY = (Math.ceil(y_true / 10) * 10)-10;
        console.log(clickX + " " + clickY);
        var Area = c.getImageData(clickX, clickY, 10, 10).data; 
        var AreaColor = Area[0] + Area[1] + Area[2]; 
        if (AreaColor == 128) {
            incendie(clickX, clickY);
		
        }
	
    }
}

function depart_incendie() {
    if (verif) { 
        aleaX = (Math.round((Math.random() * (abscisse - 10)) / 10) * 10); 
        aleaY = (Math.round((Math.random() * (ordonnee - 10)) / 10) * 10); 
        var Area = c.getImageData(aleaX, aleaY, 10, 10).data;
        var AreaColor = Area[0] + Area[1] + Area[2]; 
        if (AreaColor != 128) { 
            depart_incendie() 
            return 
        }
        incendie(aleaX, aleaY); 
    }
}

function incendie(x, y) {
    if (verif) { 
        var Area = c.getImageData(x, y, 10, 10).data; 
        var AreaColor = Area[0] + Area[1] + Area[2]; 
        if (AreaColor == 128) { 
            c.fillStyle = "red";
            c.fillRect(x, y, 10, 10);
            nbrTreesLeft--;

            to1 = setTimeout(function() {
                incendie(x - 10, y);
            }, temps); 

            to2 = setTimeout(function() {
                incendie(x + 10, y);
            }, temps); 

            to3 = setTimeout(function() {
                incendie(x, y - 10);
            }, temps); 

            to4 = setTimeout(function() {
                incendie(x, y + 10);
            }, temps); 

            to5 = setTimeout(function() {
                c.fillStyle = "grey";
                c.fillRect(x, y, 10, 10);
            }, temps); 

            to6 = setTimeout(function() {
                c.fillStyle = "white";
                c.fillRect(x, y, 10, 10);
            }, temps * 2); 
            var percent = 100 - (nbrTreesLeft / nbrTrees * 100)
            var reste = Math.trunc(percent * 100) / 100;
        }
    }
}

function intro() { 
    var c_intro = document.getElementById('pane-intro').getContext('2d');
    console.log(c_intro);
    c_intro.fillStyle = "black";
    c_intro.textAlign="center";
    c_intro.font = "50px vcr";
    c_intro.fillText("Comment ça fonctionne ?", 400, 50);

    c_intro.textAlign="left";
    c_intro.font = "20px vcr";
    c_intro.fillText("Etape 1: Choisissez la largeur et la hauteur de votre forêt.", 50, 125);

    c_intro.fillText("Etape 2: Chosissez la densité de la forêt, c'est-à-dire la", 50, 175);
    c_intro.fillText("probabilité qu'il y ai un arbre.", 155, 200);

    c_intro.fillText('Etape 3: Cliquez sur "initialiser" pour créer votre forêt.', 50, 250);

c_intro.fillText('Etape 4: Cliquez sur "Depart de feu" pour créer un incendie', 50, 300);
c_intro.fillText('aléatoirement.', 155, 325);
c_intro.fillText("  OU:    Cliquez sur un arbre pour l'enflammer.", 50, 350);

  }
