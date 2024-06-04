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

    <link rel="stylesheet" href="login.css">
    <script src="login.js" defer></script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">

    <title>Document</title>
</head>



<body id="body">
    <form action="" method="post" id="accesso">
        <label for="nome_utente">Nome utente</label>
        <input type="text" name="nome_utente" id="nome_utente" placeholder="nome_utente">

        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="password">

        <input type="submit" value="Accedi" id="bottone">

        <span><br>non sei ancora registrato?<br></span>
        <a href="../register/">Registrati qui</a>
    </form>
    <?php
        if(isset($errore)){
            echo $errore; 
        }
    ?>
</body>
</html>