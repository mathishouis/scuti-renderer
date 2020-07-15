<?php 

require('global.php');

$base = ""; for($i = 1; $i <= 3; $i++): { $base = $base . rand(0,99); $base = uniqid($base); } endfor; $base = $base . ""; $auth_ticket = $bdd->prepare('UPDATE users SET auth_ticket = :auth_ticket WHERE id = :id'); $auth_ticket->execute(['auth_ticket' => $base, 'id' => $_SESSION['id']]); 


?>
<!DOCTYPE html>
<html>
    <head>
		<title>ScutiPROJECT - Hôtel</title>
		<meta charset="utf-8" />
        <link rel="stylesheet" href="./client/css/style.css">
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script type="module" src="./ui/UI.js"></script>
	    <script type="module" src="./modules/Main.js"></script>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="app">
            <loading></loading>
            <navigator></navigator>
            <catalog></catalog>
            <bar></bar>
            <leftbar></leftbar>
        </div>
        <script>
            var ssoTicket = "<?php echo $base ?>";
        </script>
	</body>
</html>