<?php
require "../session/session.php";

if(isLogged()){
    header("Location: ../private/");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="register.css">
    <script src="register.js" defer></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <title>Document</title>
</head>



<body id="body">
    <form id="registrazione" name="form" action="" method="post">
            <label for="nome_utente">Nome Utente</label>
            <input type="text" name="nome_utente" id="nome_utente" placeholder="3-15 caratteri">

            <label for="password">Password</label>
            <input type="password" name="password" id="password" placeholder="10-15 caratteri">

            <label for="ripeti_password">Ripeti la Password</label>
            <input type="password" name="ripeti_password" id="ripeti_password" placeholder="ricordatela ;)">

            <input type="submit" value="Registrati" id="bottone">

            <span><br>sei già registrato?<br></span>
            <a href="../login/">Accedi qui</a>
    </form>
</body>
</html>