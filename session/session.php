<?php
    require 'dbsettings.php';
    session_start();

    function isLogged() {
        if(isset($_SESSION['id_utente'])) {
            return $_SESSION['id_utente'];
        } else return 0;
    }
?>