const form_spotify = document.querySelector('#form_spotify');
form_spotify.addEventListener('submit', ricerca_spotify);

async function ricerca_spotify(event){
    event.preventDefault();
    let spotify_endpoint = '../apis/spotify/spotify.php?type=';
    let tipo = document.querySelector("#tipo_spotify").value;


    spotify_endpoint = spotify_endpoint + tipo + '&q=';


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

const form_carica_pg = document.querySelector("#carica_pg").addEventListener("submit", Carica_pg);

let label_sottoclasse = document.querySelector("#label_sottoclasse");

const livello = document.querySelector("#livello");
const razza = document.querySelector("#razza");
const classe = document.querySelector("#classe");
const sottoclasse = document.querySelector("#sottoclasse");
const background = document.querySelector("#background");

classe.addEventListener("change", changeSubClass);

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
            opzione.value="scegli una classe";
            opzione.text="---scegli una classe---";
            sottoclasse.appendChild(opzione);
            
            break;

        case "Barbaro":
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

        case "Bardo":
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

        case "Chierico":
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

        case "Druido":
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

        case "Guerriero":
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

        case "Ladro":
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

        case "Mago":
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

        case "Monaco":
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

        case "Paladino":
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

        case "Ranger":
            if(sottoclasse.disabled){
                sottoclasse.removeAttribute("disabled");
            }

            label_sottoclasse.textContent="Archetipi";
            sottoclasse.innerHTML="";

            opzione = document.createElement("option");
            opzione.value="Cacciatore";
            opzione.text="Cacciatore";
            sottoclasse.appendChild(opzione);

            opzione = document.createElement("option");
            opzione.value="Signore delle Bestie";
            opzione.text="Signore delle Bestie";
            sottoclasse.appendChild(opzione);

            break;

        case "Stregone":
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

        case "Warlock":
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


async function Carica_pg(event){
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


    fetch("../apis/fetch/invia_pg.php", {
        method:'post',
        body: form
    }).then(onResponseCarica_pg, onErrorCarica_pg);

}

function onResponseCarica_pg(response){
    console.log("risposta ricevuta");
    console.log(response);
    return response.json().then(onJsonCarica_pg);
}

function onJsonCarica_pg(json){
    if(!json.ok){
        onErrorCarica_pg(json);
        return null;
    }
    console.log(json);
}

function onErrorCarica_pg(errore){
    console.log(errore);
}