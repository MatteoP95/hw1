<?php
require "../../session/session.php";

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}

if(!empty($_POST['characterID'])){
    $eliminatoID=$_POST['characterID'];
    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) or die(mysqli_error($dbconn));
    $query = "DELETE FROM personaggicommunity WHERE id = '$eliminatoID' && id_utente = '$idUtente'";
    $risultato = mysqli_query($dbconn, $query) or die($dbconn);

    if(!$risultato){
        echo json_encode(array('ok'=>false, 'error'=>'deletion'));
        mysqli_close($dbconn);
        exit;
    }

    echo json_encode(array('ok'=>true,'id'=>$eliminatoID));
    // mysqli_free_result($risultato);
    mysqli_close($dbconn);
    exit;
}else{
    echo json_encode(array(
        'ok'=>false,
        'error'=>'missing ID'
    ));
    exit;
}
?>