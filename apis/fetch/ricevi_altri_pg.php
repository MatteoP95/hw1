<?php
require "../../session/session.php";

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}


$dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) or die(mysqli_error($dbconn));

$query = "SELECT * FROM personaggicommunity WHERE id_utente != '$idUtente'";
$risultato = mysqli_query($dbconn, $query) or die($dbconn);
if(mysqli_num_rows($risultato) == 0){
    echo json_encode(array('ok'=>false, 'error'=>'no creations'));
    mysqli_close($dbconn);
    exit;
}

$arrayPG=array();
while($riga=mysqli_fetch_assoc($risultato)){
    $arrayPG[]=array(
        'userid'=>$riga['id_utente'],
        'username'=>$riga['nome_utente'],
        'lvl'=>$riga['livello'],
        'race'=>$riga['razza'],
        'class'=>$riga['classe'],
        'subclass'=>$riga['sottoclasse'],
        'bg'=>$riga['background']
    );
}

echo json_encode($arrayPG);
mysqli_free_result($risultato);
mysqli_close($dbconn);
exit;
?>