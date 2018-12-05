<?php

$pdo = new PDO("mysql:dbname=Portfolio;host=localhost", "root", "root");

$query = $pdo->prepare("SELECT * FROM images");
$query->execute([]);
$resultat = $query->fetchAll();
if (!empty($resultat)) {
    if ($resultat[0]["password"] == $_POST["mdp"]) {
        echo "Le mot de passe est valide !";
    } else {
        echo "Oh oh le mot de passe n'est pas valide";
    }
} else {
    echo "l'email est incorrect";
}
}