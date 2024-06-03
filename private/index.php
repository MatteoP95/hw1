<?php
require "../session/session.php"; 

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}

    $dbconn=mysqli_connect($dbsettings["host"], $dbsettings["username"], $dbsettings["password"], $dbsettings["dbname"]) /*or die(mysqli_error($dbconn))*/;
    if(mysqli_connect_errno()){
        echo "errore: ".mysqli_connect_error()." nella connessione al db";
        exit();
    }
    // $idUtente = mysqli_real_escape_string($dbconn, $idUtente);
    // $query = "SELECT * FROM utenti WHERE id = '$idUtente'";
    // $risultato = mysqli_query($dbconn, $query);
    // $riga = mysqli_fetch_assoc($risultato);   

    // $riga['nome_utente'];
    
    // echo "ciao ".$_SESSION["nome_utente"]."  ".$idUtente;
    // echo "</br>";
    // echo "ciao ".$riga['nome_utente']."  ".$riga['id'];

    $query = "SELECT id, nome_utente FROM utenti WHERE id = '$idUtente'";
    $risultato = mysqli_query($dbconn, $query)  or die($dbconn);
    $riga = mysqli_fetch_assoc($risultato);   
    
    echo "ciao ".$_SESSION["nome_utente"]."  ".$idUtente;
    echo "</br>";
    echo "ciao ".$riga['nome_utente']."  ".$riga['id'];
?>

<!DOCTYPE html>
<html lang="en">

</html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="private.css">
    <script src="private.js" defer></script>

    <title>La tua area privata</title>
</head>
<body>
    <div class="bianco">
        <div class="vuoto">
        </div>

        <div id="carica_pg">
            <form action="" method="get" id="carica_pg">
                <label for="livello">Livello</label>
                <input type="number" name="livello" id="livello" min="1" max="20">

                <label for="razza">Razza</label>
                <!-- <input type="text" name="razza" id="razza"> -->
                <select name="razza" id="razza">
                    <option value="">---scegli---</option>
                    <option value="Elfo">Elfo</option>
                    <option value="Halfling">Halfling</option>
                    <option value="Nano">Nano</option>
                    <option value="Umano">Umano</option>
                    <option value="Dragonide">Dragonide</option>
                    <option value="Gnomo">Gnomo</option>
                    <option value="Mezzelfo">Mezzelfo</option>
                    <option value="Mezzorco">Mezzorco</option>
                    <option value="Tiefling">Tiefling</option>
                </select>

                <label for="classe">Classe</label>
                <!-- <input type="text" name="classe" id="classe"> -->
                <select name="classe" id="classe">
                    <option value="">---scegli---</option>
                    <option value="Barbaro">Barbaro</option>
                    <option value="Bardo">Bardo</option>
                    <option value="Chierico">Chierico</option>
                    <option value="Druido">Druido</option>
                    <option value="Guerriero">Guerriero</option>
                    <option value="Ladro">Ladro</option>
                    <option value="Mago">Mago</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Paladino">Paladino</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Stregone">Stregone</option>
                    <option value="Warlock">Warlock</option>
                </select>
                
                <label for="sottoclasse" id="label_sottoclasse">Sottoclasse</label>
                <!-- <input type="text" name="sottoclasse" id="sottoclasse"> -->
                <select name="sottoclasse" id="sottoclasse" disabled>
                    <option value="">---scegli una classe---</option>
                </select>

                <label for="background">Background</label>
                <select name="background" id="background">
                    <option value="">---scegli la tua storia---</option>
                    <option value="Accolito">Accolito</option>
                    <option value="Artigiano della Gilda">Artigiano della Gilda</option>
                    <option value="Ciarlatano">Ciarlatano</option>
                    <option value="Criminale">Criminale</option>
                    <option value="Eremita">Eremita</option>
                    <option value="Eroe Popolare">Eroe Popolare</option>
                    <option value="Forestiero">Forestiero</option>
                    <option value="Intrattenitore">Intrattenitore</option>
                    <option value="Marinaio">Marinaio</option>
                    <option value="Monello">Monello</option>
                    <option value="Nobile">Nobile</option>
                    <option value="Sapiente">Sapiente</option>
                    <option value="Soldato">Soldato</option>
                </select>

                <input type="submit" value="Invia">
            </form>
            <?php
            if(isset($errore)){
                echo "<div>'$errore'</div>";
            }
            ?>
        </div>
                                
        <div class="vuoto">
        </div>

        <div id="spazio_pg_propri">
            <div id="ricevi_tuoi_pg">
            
            </div>
        </div>
        
        <div class="vuoto">
        </div>

        <div id="spazio_pg_community">
            <button id="bottone_altri">Mostra i PG della Comminity</button>

            <div id="ricevi_altri_pg">
            </div>
        </div>
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
<!-- action="javascript:;" onsubmit="ricerca_spotify(event)"  -->
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
                    
                    <div class="vuoto">
                    </div>
                </div>
            </div>

        </div>
        <a href="../logout/">Disconnettiti</a>
        <a href="../index/">torna alla home</a>
    </div>

    <footer id="flex_footer">
            <p>
                <a class="collegamento" href="http://www.wikidot.com/doc">Aiuto</a> | 
                <a class="collegamento" href="http://www.wikidot.com/legal:terms-of-service">Termini di Servizio</a> | 
                <a class="collegamento" href="http://www.wikidot.com/legal:privacy-policy">Privacy</a> | 
                <a class="collegamento" href="http://feedback.wikidot.com/">Segnala un Bug</a>
            </p>
            <p>
                Se non indicato da altre parti, il contenuto di questa pagina non ha licenze ed e' stato -rubato-<br>
                gentilmente offerto da <a class="collegamento" href="http://www.wikidot.com/">Wikidot.com</a>
            </p>
        </footer>
</body>
</html>