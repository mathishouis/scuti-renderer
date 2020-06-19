<?php

try {
    $host = "localhost"; // Hôte de ta base de donnée.
    $nom_bdd = "hotel"; //Nom de ta base de donnée.
    $user_bdd = "root"; // Nom d'utilisateur de ta base de donnée.
    $mdp_bdd = ""; // Le mot de passe de ta base de donnée.
   	$bdd = new PDO('mysql:host='.$host.';dbname='.$nom_bdd.'', ''.$user_bdd.'', ''.$mdp_bdd.'', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
   	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch(Exception $e) {
	die('Erreur : ' . $e->getMessage());
}


$name = "Bobbax";
$url = "http://localhost";
$viewsUrl = $url . "/views";
$staticUrl = $url . "/static";
$imgUrl = $staticUrl . "/assets/img";
$avatarUrl = "https://www.avatar-api.com/habbo-imaging/avatarimage.php?figure=";
$shop = true;

?>