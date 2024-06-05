nome_utente=document.querySelector("#nome_utente");
password=document.querySelector("#password");
form_accesso=document.querySelector("#accesso");

nome_utente.addEventListener("blur", isNomeCorretto);
password.addEventListener("blur", isPassswordCorretta);

form_accesso.addEventListener("submit", isFormCorretto);


const register_endpoint ="../apis/user/login.php";



function isNomeCorretto(){
    console.log(nome_utente.value);
    console.log(nome_utente.value.length);


    if(nome_utente.value.length <= 2){
        console.log("errore: mancano caratteri");
        
        nome_utente.classList.remove("input_utente");
        nome_utente.classList.add("errore");
        return 0;
    } else if(nome_utente.value.length >= 16){
        console.log("errore: troppi caratteri");
        
        nome_utente.classList.remove("input_utente");
        nome_utente.classList.add("errore");
        return 0;
    }
    nome_utente.classList.remove("errore");
    nome_utente.classList.add("input_utente");
    console.log("tutto ok!!");
    return 1;
}

function isPassswordCorretta(){
    console.log(password.value);
    console.log(password.value.length);


    if(password.value.length <= 9){
        console.log("errore: mancano caratteri");
        
        password.classList.remove("input_utente");
        password.classList.add("errore");
        return 0;

    } else if(password.value.length >= 16){
        console.log("errore: troppi caratteri");

        password.classList.remove("input_utente");
        password.classList.add("errore");
        return 0;
    }
    
    password.classList.remove("errore");
    password.classList.add("input_utente");
    console.log("tutto ok!!");
    return 1;
}



function isFormCorretto(event){
    event.preventDefault();
    if(isNomeCorretto() && isPassswordCorretta()){
        //send form from here to api for Login;

        const form = new FormData();
        form.append('nome_utente', nome_utente.value);
        form.append('password', password.value);

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