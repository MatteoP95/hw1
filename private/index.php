<?php
require "../session/session.php"; 

if(!$idUtente=isLogged()){
    header("Location: ../index/");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

</html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="stylesheet" href="private.css">
    <script src="private.js" defer></script>
    <script src="https://kit.fontawesome.com/46c0843b72.js" crossorigin="anonymous"></script>

    <title>La tua area privata</title>
</head>
<body>

    <div class="marrone">
        <div id="header">
            <div id="header-top">
                <div id="header-top-left">
                    <div id="testo-su-immagine">
                        <h1 class="titolo">
                            D&D 5a Edizione
                        </h1>
                        <p class="sottotitolo">
                            wiki di Matteo
                        </p>
                    </div>
                </div>
                <div id="header-top-right">
                    <div>
                        <span>La tua area privata<br></span>
                        <a href="../logout/">Disconnettiti</a>
                        <span><br>oppure<br></span>
                        <span>torna alla <a href="../index/">home</a><br></span>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="bianco">
        <div id="carica_pg-div">
            <div id="sinistra">
                <i class="fa-solid fa-user-plus"></i>
                <span>Crea personaggi unici e condividili con tutti!</span>
            </div>
            <div id="destra">
                <form action="" method="get"  id="form_carica_pg">
                    <label for="livello">Livello</label>
                    <input type="number" name="livello" id="livello" min="1" max="20">

                    <label for="razza">Razza</label>
                    <!-- <input type="text" name="razza" id="razza"> -->
                    <select name="razza" id="razza">
                        <optgroup label="Tutte le Razze:">
                            <option value="Elfo">Elfo</option>
                            <option value="Halfling">Halfling</option>
                            <option value="Nano">Nano</option>
                            <option value="Umano">Umano</option>
                            <option value="Dragonide">Dragonide</option>
                            <option value="Gnomo">Gnomo</option>
                            <option value="Mezzelfo">Mezzelfo</option>
                            <option value="Mezzorco">Mezzorco</option>
                            <option value="Tiefling">Tiefling</option>
                        </optgroup>
                    </select>

                    <label for="classe">Classe</label>
                    <!-- <input type="text" name="classe" id="classe"> -->
                    <select name="classe" id="classe">
                        <optgroup label="Tutte le Classi:">
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
                        </optgroup>
                    </select>
                    
                    <label for="sottoclasse" id="label_sottoclasse">Sottoclasse</label>
                    <!-- <input type="text" name="sottoclasse" id="sottoclasse"> -->
                    <select name="sottoclasse" id="sottoclasse" disabled>
                        <optgroup label="Tutte le Sottoclassi:" id="gruppo_opzioni_sottoclasse">
                            <option value="">---scegli una classe---</option>   
                        </optgroup>
                    </select>

                    <label for="background">Origini</label>
                    <select name="background" id="background">
                        <optgroup label="Tutte le Origini:">
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
                        </optgroup>

                    </select>

                    <input type="submit" value="Invia" id="invia_nuovo_pg">
                </form>
            </div>
               
        </div>

                                
        <div class="vuoto">
        </div>

        <div id="spazio_pg_propri">
            <div id="ricevi_tuoi_pg">
                <span>I tuoi personaggi:</span>
            </div>
        </div>
        
        <div class="vuoto">
        </div>

        <div id="spazio_pg_community">
            <button id="bottone_altri">Mostra i PG della Community</button>

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
                            <select name="tipo" id="type_spotify">
                                <optgroup label="Tipo di Ricerca">
                                    <option value="artist">
                                        Artisti
                                    </option>
                                    <option value="album">
                                        Album
                                    </option>
                                    <option value="track">
                                        Canzoni
                                    </option>
                                </optgroup>
                            </select>
                          <input type='text' id='q_spotify' placeholder="Scrivi qui">
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