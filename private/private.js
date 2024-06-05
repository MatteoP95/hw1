const form_spotify = document.querySelector('#form_spotify');
form_spotify.addEventListener('submit', ricerca_spotify);

const spotify_fetch_endpoint="../apis/spotify/spotify.php"

function ricerca_spotify(event){
    event.preventDefault();

    const tipo = document.querySelector("#type_spotify").value;

    const q = document.querySelector("#q_spotify").value;

    const form = new FormData();
    form.append('type', tipo);
    form.append('q', q);
    
    fetch(spotify_fetch_endpoint, {
        method:'post',
        body: form
    }).then(onResponseSpotify).then(onJsonSpotify);
}

function onResponseSpotify(response){
    console.log("spotify risponde:");
    console.log(response);
    if(!response.ok){
        return null;
    }
    return response.json();
}

function onJsonSpotify(json){

    console.log("json ricevuto:");
    console.log(json);

    const elenco_canzoni = document.querySelector('#contenuto_spotify');
    elenco_canzoni.innerHTML = '';

    const name=Object.keys(json)[0];  
    console.log(name);

    switch(name){
        default:
            const errore = document.createElement("span");
            errore.classList.add("errore");
            errore.textContent="errore nel caricamento dei dati";
        break;
            
        case "albums":
            for(let risultato of json.albums.items){
                if(risultato.images.length>0) {
        
                    const album = document.createElement("div");
                    album.classList.add("album");
            
                    const img = document.createElement("img");
                    img.src=risultato.images[0].url;
            
                    const caption=document.createElement("span");
                    caption.textContent=risultato.name;
            
                    album.appendChild(img);
                    album.appendChild(caption);
                    elenco_canzoni.appendChild(album);
                }
            }
        break;

        case "artists":
            for(let risultato of json.artists.items){
                if(risultato.images.length>0) {
        
                    const artist = document.createElement("div");
                    artist.classList.add("artista");
            
                    const img = document.createElement("img");
                    img.src=risultato.images[0].url;
            
                    const caption=document.createElement("span");
                    caption.textContent=risultato.name;
            
                    artist.appendChild(img);
                    artist.appendChild(caption);
                    elenco_canzoni.appendChild(artist);
                }
            }
        break;

        case "tracks":
            for(let risultato of json.tracks.items){
                if(risultato.album.images.length>0) {
        
                    const track = document.createElement("div");
                    track.classList.add("canzone");
            
                    const img = document.createElement("img");
                    img.src=risultato.album.images[0].url;
            
                    const caption=document.createElement("span");
                    caption.textContent=risultato.name;
            
                    track.appendChild(img);
                    track.appendChild(caption);
                    elenco_canzoni.appendChild(track);
                }
            }
        break;
    }
}

//////////////////////////////////////////////////////////////////////////

const form_carica_pg = document.querySelector("#form_carica_pg");
form_carica_pg.addEventListener("submit", CaricaPG);
form_carica_pg.addEventListener("submit", RiceviTuoiPg);

let label_sottoclasse = document.querySelector("#label_sottoclasse");

const livello = document.querySelector("#livello");
const razza = document.querySelector("#razza");
const classe = document.querySelector("#classe");
const sottoclasse = document.querySelector("#sottoclasse");
const background = document.querySelector("#background");

const subclassOptgroup = document.querySelector("#gruppo_opzioni_sottoclasse");

const carica_fetch_endpoint ="../apis/wikifake/invia_pg.php";

const errore_caricamento = document.createElement("span");
errore_caricamento.innerText="Personaggio non caricato!";

classe.addEventListener("change", changeSubClass);
livello.addEventListener("change", changeSubClass);

function changeSubClass(event){
    const pgClass = classe.value;
    let opzione;


    switch(pgClass){
        default:
            if(!sottoclasse.disabled){
                sottoclasse.setAttribute("disabled","");
            }

            label_sottoclasse.textContent="Sottoclasse";

            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value=null;
            opzione.text="---scegli prima una classe---";
            subclassOptgroup.appendChild(opzione);
            
            break;

        case "Barbaro": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Cammini Primordiali";
            
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Berserker";
            opzione.text="Berserker";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Combattente Totemico";
            opzione.text="Combattente Totemico";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Bardo": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Collegi Bardici";

            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Collegio della Sapienza";
            opzione.text="Collegio della Sapienza";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Collegio del Valore";
            opzione.text="Collegio del Valore";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Chierico": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Domini Divini";

            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Dominio della Conoscenza";
            opzione.text="Dominio della Conoscenza";
            subclassOptgroup.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Dominio della Guerra";
            opzione.text="Dominio della Guerra";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio dell'Inganno";
            opzione.text="Dominio dell'Inganno";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Luce";
            opzione.text="Dominio della Luce";
            subclassOptgroup.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Dominio della Natura";
            opzione.text="Dominio della Natura";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Tempesta";
            opzione.text="Dominio della Tempesta";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Vita";
            opzione.text="Dominio della Vita";
            subclassOptgroup.appendChild(opzione);


            break;

        case "Druido": //secondo livello
            if(livello.value<2){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Circoli Druidici";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Circolo della Luna";
            opzione.text="Circolo della Luna";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Circolo della Terra";
            opzione.text="Circolo della Terra";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Guerriero": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi Marziali";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Campione";
            opzione.text="Campione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Maestro di Battaglia";
            opzione.text="Maestro di Battaglia";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Ladro": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi Ladreschi";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Assassino";
            opzione.text="Assassino";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Furfante";
            opzione.text="Furfante";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Mistificatore Arcano";
            opzione.text="Mistificatore Arcano";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Mago": //secondo livello
            if(livello.value<2){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Tradizioni Arcane";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Abiurazione";
            opzione.text="Abiurazione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Ammaliamento";
            opzione.text="Ammaliamento";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Divinazione";
            opzione.text="Divinazione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Evocazione";
            opzione.text="Evocazione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Illusione";
            opzione.text="Illusione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Invocazione";
            opzione.text="Invocazione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Necromanzia";
            opzione.text="Necromanzia";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Trasmutazione";
            opzione.text="Trasmutazione";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Monaco": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Tradizioni Monastiche";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Via della Mano Aperta";
            opzione.text="Via della Mano Aperta";
            subclassOptgroup.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Via dell'Ombra";
            opzione.text="Via dell'Ombra";
            subclassOptgroup.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Via dei Quattro Elementi";
            opzione.text="Via dei Quattro Elementi";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Paladino": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Giuramenti Sacri";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Giuramento degli Antichi";
            opzione.text="Giuramento degli Antichi";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Giuramento della Devozione";
            opzione.text="Giuramento della Devozione";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Giuramento della Vendetta";
            opzione.text="Giuramento della Vendetta";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Ranger": //terzo livello
            if(livello.value<3){
                subclassOptgroup.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                subclassOptgroup.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Cacciatore";
            opzione.text="Cacciatore";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Signore delle Bestie";
            opzione.text="Signore delle Bestie";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Stregone": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Origini Strgonesche";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Discendenza Draconica";
            opzione.text="Discendenza Draconica";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Magia Selvaggia";
            opzione.text="Magia Selvaggia";
            subclassOptgroup.appendChild(opzione);

            break;

        case "Warlock": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Patroni Ultraterreni";
            subclassOptgroup.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Il Signore Fatato";
            opzione.text="Il Signore Fatato";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="L'Immondo";
            opzione.text="L'Immondo";
            subclassOptgroup.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Il Grande Antico";
            opzione.text="Il Grande Antico";
            subclassOptgroup.appendChild(opzione);

            break;
    }

}

//////////////////////////////////////////////////////////////////////////

function CaricaPG(event){
    event.preventDefault();
    
    const form = new FormData();
    form.append('livello', livello.value);
    form.append('razza', razza.value);
    form.append('classe', classe.value);
    form.append('sottoclasse', sottoclasse.value);
    form.append('background', background.value);


    fetch(carica_fetch_endpoint, {
        method:'post',
        body: form
    }).then(onResponseCaricaPG).then(onJsonCaricaPG);

}

function onResponseCaricaPG(response){
    console.log("risposta di carica: ricevuta");
    // console.log(response);
    return response.json();
}

function onJsonCaricaPG(json){
    if(!json.ok){
        if(!form_carica_pg.contains(errore_caricamento)){
            form_carica_pg.appendChild(errore_caricamento);
            console.log("pg non caricato: ");
            console.log(json);
            return;
        }
        console.log("pg non caricato: ");
        console.log(json);
        return;
    }
    
    if(form_carica_pg.contains(errore_caricamento)){
        form_carica_pg.removeChild(errore_caricamento);
    }
    console.log("pg caricato: ");
    console.log(json);
    return;
}

//////////////////////////////////////////////////////////////////////////

const ricevi_fetch_endpoint = "../apis/wikifake/ricevi_tuoi_pg.php";
window.addEventListener("pageshow", RiceviTuoiPg);
const tuoi_container=document.querySelector("#ricevi_tuoi_pg");

function RiceviTuoiPg(event){

    fetch(ricevi_fetch_endpoint, {
        method:'post'
    }).then(onResponseRiceviPG).then(onJsonRiceviPG);
}

function onResponseRiceviPG(response){
    console.log("risposta di ricevimento propri pg:");
    console.log(response);
    return response.json();
}

function onJsonRiceviPG(json){
    console.log(json);
    tuoi_container.innerHTML="";

    if(json.ok){
        console.log("ci siamo");
        
        for(let personaggio of json.characters){
            
            const pg = document.createElement("div");
            pg.classList.add("personaggio_ricevuto");

            pg.appendChild(document.createElement("br"));

            const livello = document.createElement("span");
            livello.textContent="Livello: "+personaggio.info.lvl;
            pg.appendChild(livello);
            
            const razza = document.createElement("span");
            razza.textContent="Razza: "+personaggio.info.race;
            pg.appendChild(razza);

            const classe = document.createElement("span");
            classe.textContent="Classe: "+personaggio.info.class;
            pg.appendChild(classe);

            if(personaggio.info.subclass!=="null"){
                const sottoclasse = document.createElement("span");
                sottoclasse.textContent="Sottoclasse: "+personaggio.info.subclass;
                pg.appendChild(sottoclasse);
            }

            const background = document.createElement("span");
            background.textContent="Origini: "+personaggio.info.bg;
            pg.appendChild(background);

            const bottone_elimina = document.createElement("button");
            bottone_elimina.classList.add("eliminami");
            bottone_elimina.innerText="elimina il personaggio";
            bottone_elimina.setAttribute("id", personaggio.info.pgid);
            bottone_elimina.addEventListener("click", EliminaPG);
            bottone_elimina.addEventListener("click", RiceviTuoiPg);
            pg.appendChild(bottone_elimina);


            pg.appendChild(document.createElement("br"));

            tuoi_container.appendChild(pg);

        }
    }
}

//////////////////////////////////////////////////////////////////////////

const elimina_fetch_endpoint ="../apis/wikifake/elimina_tuoi_pg.php";

function EliminaPG(event){
    console.log("vuoi davvero eliminarmi??? :(");

    const form= new FormData();
    form.append('characterID', event.target.id);

    console.log("NOOOOOOOOOO");
    fetch(elimina_fetch_endpoint, {
        method:'post',
        body: form
    }).then(onResponseEliminaPG).then(onJsonEliminaPG);
}

function onResponseEliminaPG(response){
    console.log("response di eliminazione ricevuta: ");
    console.log(response);
    return response.json()
}

function onJsonEliminaPG(json){
    console.log("json di eliminazione ricevuto: ");
    console.log(json);
}

//////////////////////////////////////////////////////////////////////////

const bottone_altri_pg=document.querySelector("#bottone_altri").addEventListener("click", RiceviAltriPG);
const ricevi_altri_fetch_endpoint = "../apis/wikifake/ricevi_altri_pg.php";
const altri_container=document.querySelector("#ricevi_altri_pg");


function RiceviAltriPG(event){

    fetch(ricevi_altri_fetch_endpoint, {
        method:'post'
    }).then(onResponseRiceviAltriPG).then(onJsonRiceviAltriPG);
}

function onResponseRiceviAltriPG(response){
    console.log("risposta di ricevimento altri pg:");
    console.log(response);
    return response.json();
}

function onJsonRiceviAltriPG(json){
    altri_container.innerHTML="";

    console.log(json);

    if(json.ok){
    console.log("ci siamo");
        for(let personaggio of json.characters){

            const pg = document.createElement("div");
            pg.classList.add("personaggio_ricevuto");

            pg.appendChild(document.createElement("br"));


            const creatore = document.createElement("span");
            creatore.textContent="Creato da: "+personaggio.info.username;
            pg.appendChild(creatore);
            

            const livello = document.createElement("span");
            livello.textContent="Livello: "+personaggio.info.lvl;
            pg.appendChild(livello);


            const razza = document.createElement("span");
            razza.textContent="Razza: "+personaggio.info.race;
            pg.appendChild(razza);


            const classe = document.createElement("span");
            classe.textContent="Classe: "+personaggio.info.class;
            pg.appendChild(classe);

            
            if(personaggio.info.subclass!=="null"){
                const sottoclasse = document.createElement("span");
                sottoclasse.textContent="Sottoclasse: "+personaggio.info.subclass;
                pg.appendChild(sottoclasse);
            }

            const background = document.createElement("span");
            background.textContent="Origini: "+personaggio.info.bg;
            pg.appendChild(background);

            pg.appendChild(document.createElement("br"));


            altri_container.appendChild(pg);
        }
    }
}