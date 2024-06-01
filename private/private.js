const form_spotify = document.querySelector('#form_spotify');
form_spotify.addEventListener('submit', ricerca_spotify);

const spotify_fetch_endpoint="../apis/spotify/spotify.php"

function ricerca_spotify(event){
    event.preventDefault();
    let tipo = document.querySelector("#tipo_spotify").value;
    let spotify_endpoint = spotify_fetch_endpoint + "?type="+ tipo + '&q=';


    const input = document.querySelector("#input_spotify");
    const value = encodeURIComponent(input.value);
    
    fetch(spotify_endpoint + value,{
            // headers:{
            //     'Authorization': 'Bearer '+ token
            // }
        }
    ).then(onResponseSpotify).then(onJsonSpotify);
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

    const library = document.querySelector('#contenuto_spotify');
    library.innerHTML = '';



    if(json.albums){
        const risultati= json.albums.items;

        let num_risultati = risultati.length;
    
        for(let i=0; i<num_risultati; i++){
            const album_data= risultati[i];
            const immagine= album_data.images[0].url;
            const titolo = album_data.name;
    
    
            const album = document.createElement('div');
            album.classList.add('album');
    
            const img = document.createElement('img');
            img.src=immagine;
    
            const caption=document.createElement('span');
            caption.textContent=titolo;
    
            album.appendChild(img);
            album.appendChild(caption);
            library.appendChild(album);
        }    
    }
    else if(json.artists){
        const risultati= json.artists.items;

        let num_risultati = risultati.length;

        for(let i=0; i<num_risultati; i++){
            const artist_data= risultati[i];
            const immagine= artist_data.images[0].url;
            const titolo = artist_data.name;
    
    
            const artist = document.createElement('div');
            artist.classList.add('artista');
    
            const img = document.createElement('img');
            img.src=immagine;
    
            const caption=document.createElement('span');
            caption.textContent=titolo;
    
            artist.appendChild(img);
            artist.appendChild(caption);
            library.appendChild(artist);
        }  
    }
    else if(json.tracks){
        const risultati= json.tracks.items;

        let num_risultati = risultati.length;

        for(let i=0; i<num_risultati; i++){
            const track_data= risultati[i];
            const immagine= track_data.album.images[0].url;
            const titolo = track_data.name;
    
    
            const track = document.createElement('div');
            track.classList.add('canzone');
    
            const img = document.createElement('img');
            img.src=immagine;
    
            const caption=document.createElement('span');
            caption.textContent=titolo;
    
            track.appendChild(img);
            track.appendChild(caption);
            library.appendChild(track);
        }  
    }
}
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const form_carica_pg = document.querySelector("#carica_pg");
form_carica_pg.addEventListener("submit", CaricaPG);

let label_sottoclasse = document.querySelector("#label_sottoclasse");

const livello = document.querySelector("#livello");
const razza = document.querySelector("#razza");
const classe = document.querySelector("#classe");
const sottoclasse = document.querySelector("#sottoclasse");
const background = document.querySelector("#background");

const carica_fetch_endpoint ="../apis/fetch/invia_pg.php";

classe.addEventListener("change", changeSubClass);
livello.addEventListener("change", changeSubClass);

// const classe_select = document.querySelector("#classe").addEventListener("blur", changeSubClass);
// const subclasse_select = document.querySelector("#sottoclasse");

function changeSubClass(event){
    const pgClass = classe.value;
    let opzione;


    switch(pgClass){
        default:
            if(!sottoclasse.disabled){
                sottoclasse.setAttribute("disabled","");
            }

            label_sottoclasse.textContent="Sottoclasse";

            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value=null;
            opzione.text="---scegli una classe---";
            sottoclasse.appendChild(opzione);
            
            break;

        case "Barbaro": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Cammini Primordiali";
            
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Berserker";
            opzione.text="Berserker";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Combattente Totemico";
            opzione.text="Combattente Totemico";
            sottoclasse.appendChild(opzione);

            break;

        case "Bardo": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Collegi Bardici";

            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Collegio della Sapienza";
            opzione.text="Collegio della Sapienza";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Collegio del Valore";
            opzione.text="Collegio del Valore";
            sottoclasse.appendChild(opzione);

            break;

        case "Chierico": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Domini Divini";

            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Dominio della Conoscenza";
            opzione.text="Dominio della Conoscenza";
            sottoclasse.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Dominio della Guerra";
            opzione.text="Dominio della Guerra";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio dell'Inganno";
            opzione.text="Dominio dell'Inganno";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Luce";
            opzione.text="Dominio della Luce";
            sottoclasse.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Dominio della Natura";
            opzione.text="Dominio della Natura";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Tempesta";
            opzione.text="Dominio della Tempesta";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Dominio della Vita";
            opzione.text="Dominio della Vita";
            sottoclasse.appendChild(opzione);


            break;

        case "Druido": //secondo livello
            if(livello.value<2){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Circoli Druidici";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Circolo della Luna";
            opzione.text="Circolo della Luna";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Circolo della Terra";
            opzione.text="Circolo della Terra";
            sottoclasse.appendChild(opzione);

            break;

        case "Guerriero": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi Marziali";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Campione";
            opzione.text="Campione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Maestro di Battaglia";
            opzione.text="Maestro di Battaglia";
            sottoclasse.appendChild(opzione);

            break;

        case "Ladro": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi Ladreschi";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Assassino";
            opzione.text="Assassino";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Furfante";
            opzione.text="Furfante";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Mistificatore Arcano";
            opzione.text="Mistificatore Arcano";
            sottoclasse.appendChild(opzione);

            break;

        case "Mago": //secondo livello
            if(livello.value<2){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","");
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Tradizioni Arcane";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Abiurazione";
            opzione.text="Abiurazione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Ammaliamento";
            opzione.text="Ammaliamento";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Divinazione";
            opzione.text="Divinazione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Evocazione";
            opzione.text="Evocazione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Illusione";
            opzione.text="Illusione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Invocazione";
            opzione.text="Invocazione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Necromanzia";
            opzione.text="Necromanzia";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Trasmutazione";
            opzione.text="Trasmutazione";
            sottoclasse.appendChild(opzione);

            break;

        case "Monaco": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Tradizioni Monastiche";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Via della Mano Aperta";
            opzione.text="Via della Mano Aperta";
            sottoclasse.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Via dell'Ombra";
            opzione.text="Via dell'Ombra";
            sottoclasse.appendChild(opzione);
            
            opzione = document.createElement("option");
            opzione.value="Via dei Quattro Elementi";
            opzione.text="Via dei Quattro Elementi";
            sottoclasse.appendChild(opzione);

            break;

        case "Paladino": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Giuramenti Sacri";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Giuramento degli Antichi";
            opzione.text="Giuramento degli Antichi";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Giuramento della Devozione";
            opzione.text="Giuramento della Devozione";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Giuramento della Vendetta";
            opzione.text="Giuramento della Vendetta";
            sottoclasse.appendChild(opzione);

            break;

        case "Ranger": //terzo livello
            if(livello.value<3){
                sottoclasse.innerHTML="";

                opzione = document.createElement("option");
                opzione.value=null;
                opzione.text="---livello troppo basso---";
                sottoclasse.appendChild(opzione);
                if(!sottoclasse.disabled){
                    sottoclasse.setAttribute("disabled","")
                }

                break;
            }

            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi";
            sottoclasse.innerHTML=null;

            opzione = document.createElement("option");
            opzione.value="Cacciatore";
            opzione.text="Cacciatore";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Signore delle Bestie";
            opzione.text="Signore delle Bestie";
            sottoclasse.appendChild(opzione);

            break;

        case "Stregone": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Origini Strgonesche";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Discendenza Draconica";
            opzione.text="Discendenza Draconica";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Magia Selvaggia";
            opzione.text="Magia Selvaggia";
            sottoclasse.appendChild(opzione);

            break;

        case "Warlock": //primo livello - va bene così
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Patroni Ultraterreni";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Il Signore Fatato";
            opzione.text="Il Signore Fatato";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="L'Immondo";
            opzione.text="L'Immondo";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Il Grande Antico";
            opzione.text="Il Grande Antico";
            sottoclasse.appendChild(opzione);

            break;
    }

}


function CaricaPG(event){
    event.preventDefault();

    // const livello = document.querySelector("#livello");
    // const razza = document.querySelector("#razza");
    // const classe = document.querySelector("#classe");
    // const sottoclasse = document.querySelector("#sottoclasse");
    // const background = document.querySelector("#background");

    // console.log(livello.value);
    // console.log(razza.value);
    // console.log(classe.value);
    // console.log(sottoclasse.value);
    // console.log(background.value);
    
    const form = new FormData();
    form.append('livello', livello.value);
    form.append('razza', razza.value);
    form.append('classe', classe.value);
    form.append('sottoclasse', sottoclasse.value);
    form.append('background', background.value);


    fetch(carica_fetch_endpoint, {
        method:'post',
        body: form
    }).then(onResponseCaricaPG/*, onErrorCaricaPG*/);

}

function onResponseCaricaPG(response){
    console.log("risposta di carica: ricevuta");
    console.log(response);
    return response.json().then(onJsonCaricaPG);
}

function onJsonCaricaPG(json){
    // if(!json.ok){
    //     onErrorCaricaPG(json);
    //     return null;
    // }
    console.log(json);

    //body
}

// function onErrorCaricaPG(errore){
//     console.log("errore caricamento: ");
//     console.log(errore);
// }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const ricevi_fetch_endpoint = "../apis/fetch/ricevi_tuoi_pg.php";
window.addEventListener("pageshow", RiceviTuoiPg);
form_carica_pg.addEventListener("submit", RiceviTuoiPg);

function RiceviTuoiPg(event){

    fetch(ricevi_fetch_endpoint, {
        method:'post'
    }).then(onResponseRiceviPG).then(onJsonRiceviPG);
}

function onResponseRiceviPG(response){
    console.log("risposta di ricevimento: ricevuta");
    console.log(response);
    return response.json();
}

function onJsonRiceviPG(json){
    console.log(json);
    //body
    

}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const bottone_altri_pg=document.querySelector("#bottone_altri").addEventListener("click", RiceviAltriPG);
const ricevi_altri_fetch_endpoint = "../apis/fetch/ricevi_altri_pg.php";

function RiceviAltriPG(event){

    fetch(ricevi_altri_fetch_endpoint, {
        method:'post'
    }).then(onResponseRiceviAltriPG/*, onErrorRiceviAltriPG*/);
}

function onResponseRiceviAltriPG(response){
    console.log("risposta di ricevimento altrui: ricevuta");
    console.log(response);
    return response.json().then(onJsonRiceviAltriPG);
}

function onJsonRiceviAltriPG(json){
    // if(json.ok!==true){
    //     onErrorRiceviAltriPG(json);
    //     return null;
    // }
    console.log(json);

    //body
}

// function onErrorRiceviAltriPG(errore){
//     console.log("errore ricevimento altrui: ");
//     console.log(errore);
// }