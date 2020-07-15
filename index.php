<?php
require('global.php');

if(isset($_SESSION['id'])) {
	header('Location: hotel.php');
	exit();
}


if(isset($_POST['sub1'])) {
	if(!empty($_POST['pseudo1']) AND !empty($_POST['password'])) {
		$pseudo = htmlspecialchars($_POST['pseudo1']);
		$account_exist = $bdd->prepare('SELECT id,password FROM users WHERE username = :username');
		$account_exist->execute(['username' => $pseudo]);
		if($account_exist->rowCount() == 1) {
			$account_infos = $account_exist->fetch();
			if(password_verify($_POST['password'], $account_infos->password)) {
					$_SESSION['id'] = $account_infos->id;
			        header('Location: hotel.php');
			        exit();
				
			} else {
				$resultat = "Le mot de passe est incorrect.";
			}
		} else {
			$resultat = "Ce pseudo n'existe pas.";
		}
	} else {
		$resultat = "Merci de remplir tous les champs.";
	}
}

if(isset($_POST['sub2'])) {
	if(!empty($_POST['pseudo2']) AND !empty($_POST['mail2']) AND !empty($_POST['password1']) AND !empty($_POST['password2'])) {
		$pseudo = htmlspecialchars($_POST['pseudo2']);
		$mail = htmlspecialchars($_POST['mail2']);
		$password = password_hash($_POST['password1'], PASSWORD_BCRYPT);
		$pseudo_exist = $bdd->prepare('SELECT * FROM users WHERE username = :username');
		$pseudo_exist->execute(['username' => $pseudo]);
		if($pseudo_exist->rowCount() == 0) {
			if(preg_match('`^([a-zA-Z0-9-=?!@:.,]{3,15})$`', $pseudo)) {
				$email_exist = $bdd->prepare('SELECT * FROM users WHERE mail = :mail');
				$email_exist->execute(['mail' => $mail]);
				if($email_exist->rowCount() == 0) {
					if(filter_var($mail, FILTER_VALIDATE_EMAIL)) {
						if(strlen($_POST['password1']) >= 6 AND strlen($_POST['password2']) >= 6) {
							if($_POST['password1'] == $_POST['password2']) {
									$create_account = $bdd->prepare('INSERT INTO users(username, mail, password, rank, credits, vip_points, activity_points, look, gender, motto, account_created, last_online, ip_reg, jetons) VALUES (:username, :mail, :password, :rank, :credits, :vip_points, :activity_points, :look, :gender, :motto, :account_created, :last_online, :ip_reg, :jetons)');
			              			$create_account->execute([
			              				'username' => $pseudo,
			              				'mail' => $mail,
			              				'password' => $password,
			              				'rank' => "1",
			              				'credits' => "10000000",
			              				'vip_points' => "0",
			              				'activity_points' => "10000000",
			              				'look' => "ch-3208-82-92.sh-295-110.lg-3202-110-1408.hd-209-3.hr-3163-1394",
			              				'gender' => "M",
			              				'motto' => "Nouveau sur ".$site_infos->nom."",
			              				'account_created' => time(),
			              				'last_online' => time(),
			              				'ip_reg' => $_SERVER['REMOTE_ADDR'],
			              				'jetons' => "0"
			              			]);
									$_SESSION['id'] = $bdd->lastInsertId();
									header('Location: hotel.php');
									exit();
							} else {
								$resultat = "Les mots de passe ne correspondent pas.";
							}
						} else {
							$resultat = "Le mot de passe doit contenir plus de 6 caractères.";
						}
					} else {
						$resultat = "L'adresse e-mail est invalide.";
					}
				} else {
					$resultat = "Cette adresse e-mail existe déjà..";
				}
			} else {
				$resultat = "Le pseudo est invalide.";
			}
		} else {
			$resultat = "Ce pseudo existe déjà.";
		}
	} else {
		$resultat = "Merci de remplir tous les champs.";
	}
}
?>
<!DOCTYPE html>
<html lang="">

    <head>
        <meta charset="utf-8">
        <title>Scuti - Hôtel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="client/css/style.css">
        <link rel="icon" type="image/x-icon" href=""/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Condensed&display=swap" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://cdn.rawgit.com/adriancooney/console.image/c9e6d4fd/console.image.min.js"></script>
    </head>

    <body>
        <div class="login" >
            <div class="center" style="margin-left: -160px;">
                <div style="width: 100; height: 100px; background-image: url(client/img/logo.png); background-repeat: no-repeat; backgroud-position: center center; background-size: 100% auto;">
                </div>
                <form method="post">
                    <input name="pseudo1" type="text" placeholder="Pseudonyme" style="margin-top: 14px;">
                    <input name="password" type="password" placeholder="Mot de passe" style="margin-top: 14px;">
                    <button name="sub1" style="margin-top: 14px; height: 50px; width: 100%;">
                        Me connecter
                    </button>
                </form>
            </div>
            <div class="center" style="margin-left: 160px;">
                <form method="post">
                    <input name="pseudo2" type="text" placeholder="Pseudonyme" style="margin-top: 14px;">
                    <input name="mail2" type="mail" placeholder="Adresse mail" style="margin-top: 14px;">
                    <input name="password1" type="password" placeholder="Mot de passe" style="margin-top: 14px;">
                    <input name="password2" type="password" placeholder="Répéter le mot de passe" style="margin-top: 14px;">
                    <button name="sub2" style="margin-top: 14px; height: 50px; width: 100%;">
                        M'inscrire
                    </button>
                </form>
            </div>
        </div>
    </body>
</html>