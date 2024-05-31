<?php
require_once "../session/session.php"; 

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">

<?php
    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo "errore: ".mysqli_connect_error()." nella connessione al db";
        exit();
    }
    $idUtente = mysqli_real_escape_string($dbconn, $idUtente);
    $query = "SELECT * FROM Utenti WHERE id = '$idUtente'";
    $risultato = mysqli_query($dbconn, $query);
    $infoUtente = mysqli_fetch_assoc($risultato);   
    // $query = "SELECT * FROM Utenti WHERE id = $userid";

    // $idUtente = mysqli_real_escape_string($conn, $userid);
    
    echo "ciao ".$_SESSION["nome_utente"];
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="private.css">
    <script src="private.js" defer></script>

    <title>La tua area privata</title>
</head>
<body>
    <div class="bianco">
        <div id="carica_pg">

        </div>
        <div id="ricevi_tuoi_pg">

        </div id="ricevi_altri_pg">

        <div>
    </div>


    <div class="giallo">
            <div class="sezione_desktop">
                <div class="sezione_sx">
                    <h1>Tunes</h1>
                    <p>
                        Ricerca qui le canzoni che più si adattano alla tua campagna
                    </p>
                    <p>
                        supporta creatori come <br>
                        Arcane Anthems!!
                    </p>

                </div>
                <div class="sezione_dx">
                    <div class="sezione_dx_top">

                        <form id="form_spotify">
                            <select name="tipo" id="tipo_spotify">
                                <option value="">
                                    ---scegli---
                                </option>
                                <option value="artist">
                                    Artista
                                </option>
                                <option value="album">
                                    Album
                                </option>
                                <option value="track">
                                    Canzone
                                </option>
                            </select>
                          <input type='text' id='input_spotify' placeholder="Scrivi qui">
                          <input class="bottone_ricerca" type='submit'  value='Cerca'>
                        </form>
                    

                    </div>
                    <div class="sezione_dx_bottom">
                        <div id="contenuto_spotify">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <a href="../logout/">Disconnettiti</a>
        <a href="../index/">torna alla home</a>
    </div>
</body>
</html>