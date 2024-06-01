<?php
require_once "../../session/session.php";

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}

$dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
if(mysqli_connect_errno()){
    echo "errore: ".mysqli_connect_error()." nella connessione al db";
    exit();
}

$idUtente = mysqli_real_escape_string($dbconn, $idUtente);

$livello = mysqli_real_escape_string($dbconn, $_POST['livello']);
$razza = mysqli_real_escape_string($dbconn, $_POST['razza']);
$classe = mysqli_real_escape_string($dbconn, $_POST['classe']);
$sottoclasse = mysqli_real_escape_string($dbconn, $_POST['sottoclasse']);
$background = mysqli_real_escape_string($dbconn, $_POST['background']);

//query per controllare che il personaggio non sia già stato inserito da qualcuno ed evitare eventuali copie
$query = "SELECT * FROM PersonaggiCommunity WHERE livello='$livello' AND razza='$razza' AND classe='$classe' AND sottoclasse='$sottoclasse' AND background='$background'";
$risultato = mysqli_query($dbconn, $query) or die(mysqli_error($dbconn));
if(mysqli_num_rows($risultato)>0){
    echo json_encode(array('ok'=>false));
    mysqli_close($dbconn);
    exit;
}

$query = "SELECT nome_utente FROM Utenti WHERE id = '$idUtente'";
$risultato = mysqli_query($dbconn, $query);
$riga = mysqli_fetch_assoc($risultato);
$nomeUtente = $riga['nome_utente'];
$nomeUtente = mysqli_real_escape_string($dbconn, $nomeUtente);

$query = "INSERT INTO PersonaggiCommunity(id_utente, nome_utente, livello, razza, classe, sottoclasse, background) VALUES('$idUtente', '$nomeUtente', '$livello', '$razza', '$classe', '$sottoclasse', '$background')";
$risultato = mysqli_query($dbconn, $query);
if($risultato){
    echo json_encode(array('ok'=>true));
    mysqli_close($dbconn);
    exit;
}
echo json_encode(array('ok'=>false));
mysqli_close($dbconn);
exit;
?>