<?php
// require_once "../session/session.php"; 

// if(!isLogged()){
//     exit;
// }

   $clientIdSpotify = "";/*'your_client_id'*/
   $clientSecretSpotify = "";/*'your_client_secret'*/
   $clientEndpointSpotify =  "https://accounts.spotify.com/api/token" ;

   $curl = curl_init();
   curl_setopt($curl, CURLOPT_URL, $clientEndpointSpotify);
   curl_setopt($curl, CURLOPT_POST, 1);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array("Authorization: Basic ".base64_encode($clientIdSpotify.":".$clientSecretSpotify))); 
   curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials");  
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   $token=json_decode(curl_exec($curl));
   curl_close($curl);  

   $type = urlencode($_GET["type"]);
   $q = urlencode($_GET["q"]);

   $endpoint = "https://api.spotify.com/v1/search?type="."$type"."&q="."$q";
   $curl2 = curl_init();
   curl_setopt($curl2, CURLOPT_URL, $endpoint);
   curl_setopt($curl2, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl2, CURLOPT_HTTPHEADER, array('Authorization: Bearer '.$token['access_token'])); 
   $risultatiRicerca=curl_exec($curl2);
   curl_close($curl2);

   echo $risultatiRicerca;
?>