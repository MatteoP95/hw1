nome_utente=document.querySelector("#nome_utente");
password=document.querySelector("#password");
ripeti_password=document.querySelector("#ripeti_password");
form_registrazione=document.querySelector("#registrazione");

nome_utente.addEventListener("blur", isNomeCorretto);
password.addEventListener("blur", isPassswordCorretta);
ripeti_password.addEventListener("blur", isRipetiCorretta);

form_registrazione.addEventListener("submit", isFormCorretto);



function isNomeCorretto(){
    console.log(nome_utente.value);
    console.log(nome_utente.value.length);


    if(nome_utente.value.length <= 2){
        console.log("errore: mancano caratteri");
        return 0;
    } else if(nome_utente.value.length >= 16){
        console.log("errore: troppi caratteri");
        return 0;
    }
    console.log("tutto ok!!");
    return 1;
}

function isPassswordCorretta(){
    console.log(password.value);
    console.log(password.value.length);


    if(password.value.length <= 9){
        console.log("errore: mancano caratteri");
        return 0;
    } else if(password.value.length >= 16){
        console.log("errore: troppi caratteri");
        return 0;
    }
    console.log("tutto ok!!");
    return 1;
}

function isRipetiCorretta(){
    console.log(ripeti_password.value);
    console.log(ripeti_password.value.length);

    if(ripeti_password.value !== password.value && isPassswordCorretta()){
        console.log("errore: password invalida");
        return 0;
    }
    
    console.log("tutto ok!!");
    return 1;
}

const register_endpoint ="../apis/user/register.php";

function isFormCorretto(event){
    event.preventDefault();
    if(isNomeCorretto() && isPassswordCorretta() && isRipetiCorretta()){
        //send form from here to api for Login;

        const form = new FormData();
        form.append('nome_utente', nome_utente.value);
        form.append('password', password.value);
        form.append('ripeti_password', ripeti_password.value);

        fetch(register_endpoint, {
            method:'post',
            body: form
        }).then(onResponseRegister).then(onJsonRegister);
    }
}

function onResponseRegister(response){
    console.log("response di registrazione ricevuta:");
    console.log(response);

    return response.json();
    //si blocca qui dicendo che il contenuto non è un json (mostra come contenuto la pagina privata)
}

function onJsonRegister(json){
    console.log("json di registrazione ricevuto:");
    console.log(json);

    if(json.ok){
        console.log(document.location.href);
        window.location.replace("../"+json.redirect+"/");
    }
}