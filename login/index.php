<?php
require "../session/session.php";

if(isLogged()){
    header("Location: ../private/");
    exit;
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
                <span><br>Torna all'<a class="collegamento" href="../index/">inizio</a></span>
            </div>
        </div>
    </div>
</div>

<div class="bianco">
    <form action="" method="post" id="accesso">
        <!-- <label for="nome_utente">Nome utente</label> -->
        <input type="text" name="nome_utente" id="nome_utente" class="input_utente" placeholder="nome_utente" required>

        <!-- <label for="password">Password</label> -->
        <input type="password" name="password" id="password" class="input_utente" placeholder="password" required>

        <input type="submit" value="Accedi" id="bottone">

        <span><br>non ti sei ancora registrato?<br></span>
        <a class="collegamento" href="../register/">Registrati qui</a>
    </form>
</div>


<div class="bianco">
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
</div>


</body>
</html>