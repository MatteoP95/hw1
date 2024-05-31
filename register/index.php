<?php
require_once '../session/session.php';

if(isLogged()){
    header("Location: ../private/");
    exit;
}

if(isset($_POST["nome_utente"]) && isset($_POST["password"]) && isset($_POST["ripeti_password"])){
    $elencoErrori = array();

    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo "errore: ".mysqli_connect_error()." nella connessione al db";
        exit();
    }

    if(!preg_match("/^[a-zA-Z0-9_]{2,15}$/", $_POST["nome_utente"])){
        $elencoErrori[] = "Nome utente non valido";
    }
    else {
        $nomeUtente = mysqli_real_escape_string($dbconn, $_POST["nome_utente"]);
        $query = "SELECT nome_utente FROM utenti WHERE nome_utente = '$nomeUtente'";
        $risultato = mysqli_query($dbconn, $query);
        if(mysqli_num_rows($risultato) != 0){
            $elencoErrori[] = "Nome utente gia' preso";
        }
    }

    if(strlen($_POST["password"])>15 || strlen($_POST["password"])<10){
        $elencoErrori[] = "Password non valida";
    }

    if(strcmp($_POST["password"], $_POST["ripeti_password"])!=0){
        $elencoErrori[] = "Password diverse";
    }


    if(count($elencoErrori) == 0){
        $nomeUtente = mysqli_real_escape_string($dbconn, $_POST["nome_utente"]);
        $password = mysqli_real_escape_string($dbconn, $_POST["password"]);
        $password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO Utenti(nome_utente, password) VALUES ('$nomeUtente', '$password')";
        
        if(mysqli_query($dbconn, $query)){
            $_SESSION["nome_utente"] = $_POST["nome_utente"];
            $_SESSION["id_utente"] = mysqli_insert_id($dbconn);
            mysqli_close($dbconn);
            header("Location: ../private/private.php");
            exit;
        } else{
            $elencoErrori[]= "Errore con il db";
        }
    }
    mysqli_close($dbconn);
} else if(isset($_POST["username"]) || isset($_POST["password"]) || isset($_POST["ripeti_password"])){
    $elencoErrori = array();
    $elencoErrori[] = "Mancano dei dati da compilare";
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
            <input type="text" name="nome_utente" id="registrazione_nome_utente" placeholder="2-15 caratteri">

            <label for="password">Password</label>
            <input type="password" name="password" id="registrazione_password" placeholder="10-15 caratteri">

            <label for="ripeti_password">Ripeti la Password</label>
            <input type="password" name="ripeti_password" id="registrazione_ripeti_password" placeholder="ricordatela ;)">
            
            <!-- <label for="accetti">Termini e Condizioni</label>
            <input type="checkbox" name="accetti" id="cookies"> -->

            <input type="submit" value="Registrati" id="bottone">

            <span><br>sei già registrato?<br></span>
            <a href="../login/">Accedi qui</a>

            <?php
                if(isset($elencoErrori)){
                    foreach($elencoErrori as $errore){
                        echo $errore."<br>";
                    }
                }
            ?>
    </form>
</body>
</html>