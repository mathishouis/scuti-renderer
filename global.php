<?php
try {
    $host = "localhost"; 
    $nom_bdd = "bbx";
    $user_bdd = "root";
    $mdp_bdd = "";
   	$bdd = new PDO('mysql:host='.$host.';dbname='.$nom_bdd.'', ''.$user_bdd.'', ''.$mdp_bdd.'', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
   	$bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
}

catch(Exception $e) {
	die('Erreur : ' . $e->getMessage());
}

mb_internal_encoding('UTF-8');
date_default_timezone_set('Europe/Paris');
setlocale(LC_TIME, 'fr_FR.utf8','fra');

session_start();

if(isset($_SESSION['id'])) {
	$account_exist = $bdd->prepare('SELECT * FROM users WHERE id = :id');
	$account_exist->execute(['id' => $_SESSION['id']]);
	if($account_exist->rowCount() == 1) {
		$account_infos = $account_exist->fetch();
		$_SESSION['id'] = $account_infos->id;

	} else {
		header('Location: logout.php');
		exit();
	}
}

?>