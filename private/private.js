const form_spotify = document.querySelector('#form_spotify');
form_spotify.addEventListener('submit', ricerca_spotify);

function ricerca_spotify(event){
    event.preventDefault();
    let spotify_endpoint = '../apis/spotify/spotify.php?type=';
    let tipo = document.querySelector("#tipo_spotify").value;


    spotify_endpoint = spotify_endpoint + tipo + '&q=';


    const input = document.querySelector("#input_spotify");
    const value = encodeURIComponent(input.value);
    
    fetch(spotify_endpoint + value,{
            headers:{
                'Authorization': 'Bearer '+ token
            }
        }
    ).then(onResponseSpotify).then(onJsonSpotify);
}

function onResponseSpotify(response){
    console.log("spotify risponde:");
    console.log(response);
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
