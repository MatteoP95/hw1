<?php
require "../../session/session.php";

header('Content-Type: application/json; charset=utf-8');

// if(isLogged()){
//     echo json_encode(array(
//         'ok'=>true,
//         'redirect'=>'private'
//     ));
//     exit;
// }

if(!empty($_POST["nome_utente"]) && !empty($_POST["password"])){

    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'database_connection'
        ));
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
            mysqli_free_result($row);

            echo json_encode(array(
                'ok'=>true,
                'redirect'=>'private'
            ));

            mysqli_close($dbconn);
            exit;
        }
    } else {
        echo json_encode(array(
            'ok'=>false,
            'error'=>'not_present'
        ));
        exit;
    }
} else {
    echo json_encode(array(
        'ok'=>false,
        'error'=>'missing_data'
    ));
    exit;
}
?>