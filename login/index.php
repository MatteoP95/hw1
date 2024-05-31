<?php
require "../session/session.php";

if(isLogged()){
    header("Location: ../private/");
    exit;
}

if(isset($_POST["nome_utente"]) && isset($_POST["password"])){

    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo "errore: ".mysqli_connect_error()." nella connessione al db";
        exit();
    }

    $nomeUtente = mysqli_real_escape_string($dbconn, $_POST["nome_utente"]);
    $password = mysqli_real_escape_string($dbconn, $_POST["password"]);
    $password = password_hash($password, PASSWORD_DEFAULT);

    $query = "SELECT * FROM Utenti WHERE nome_utente='$nomeUtente'";
    $row = mysqli_query($dbconn, $query) or die($dbconn);

    if(mysqli_num_rows($row)==1){
        $confronta = mysqli_fetch_assoc($row);
        if(password_verify($_POST["password"], $confronta["password"])){
            $_SESSION["nome_utente"] = $_POST["nome_utente"];
            $_SESSION["id_utente"] = $confronta["id"];
            // mysqli_free_result($row);
            header("Location: ../private/");

            mysqli_close($dbconn);
            exit;
        }
    } else {
        $errore= "Nome utente e/o password errati";
    }
} else if(isset($_POST["username"]) || isset($_POST["password"])){
    $errore = "Mancano dei dati da inserire";
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
    <form action="" method="post" id="login_form">
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