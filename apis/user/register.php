<?php
require "../../session/session.php";

header('Content-Type: application/json; charset=utf-8');


if(!empty($_POST["nome_utente"]) && !empty($_POST["password"]) && !empty($_POST["ripeti_password"])){

    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'database_connection'
        ));
        exit();
    }

    if(!preg_match("/^[a-zA-Z0-9_]{3,15}$/", $_POST["nome_utente"])){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'invalid_username'
        ));
        mysqli_close($dbconn);
        exit;
    }

    $nomeUtente = mysqli_real_escape_string($dbconn, $_POST["nome_utente"]);
    $query = "SELECT nome_utente FROM utenti WHERE nome_utente = '$nomeUtente'";
    $risultato = mysqli_query($dbconn, $query);
    if(mysqli_num_rows($risultato) != 0){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'dupe_username'
        ));
        mysqli_close($dbconn);
        exit;
    }

    if(strlen($_POST["password"])>15 || strlen($_POST["password"])<10){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'invalid_password'
        ));
        mysqli_close($dbconn);
        exit;
    }

    if(strcmp($_POST["password"], $_POST["ripeti_password"])!=0){
        echo json_encode(array(
            'ok'=>false,
            'error'=>'not_matching_passwords'
        ));
        mysqli_close($dbconn);
        exit;
    }
    mysqli_free_result($risultato);


    $nomeUtente = mysqli_real_escape_string($dbconn, $_POST["nome_utente"]);
    $password = mysqli_real_escape_string($dbconn, $_POST["password"]);
    $password = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO Utenti(nome_utente, password) VALUES ('$nomeUtente', '$password')";
    
    if(mysqli_query($dbconn, $query)){
        $_SESSION["nome_utente"] = $_POST["nome_utente"];
        $_SESSION["id_utente"] = mysqli_insert_id($dbconn);

        echo json_encode(array(
            'ok'=>true,
            'redirect'=>'private'
        ));
        mysqli_close($dbconn);
        exit;
    } else {
        echo json_encode(array(
            'ok'=>false,
            'error'=>'database_connection'
        ));
        mysqli_close($dbconn);
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