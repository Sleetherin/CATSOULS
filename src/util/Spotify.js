
const clientID = "5cac558cc0854eb6a2bd81724ed80ac5";
const redirectURI = "http://localhost:3000/";
let accessToken = "";

const Spotify = {
  getAccessToken()
  {
    if(accessToken) {
        console.log('Found an access token');
        return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    console.log(urlAccessToken);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    console.log(urlExpiresIn);
    if(urlAccessToken && urlExpiresIn)
    {
        accessToken = urlAccessToken[1];
        const expiresIn = Number(urlExpiresIn[1]);
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
    }
    else{
        const redirect = 
        `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;  
    }
  },
  search(term)
  {
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        if(!jsonResponse.tracks)
        {
            return [];
        }
        return jsonResponse.tracks.items.map(tracks => ({
           id: tracks.id,
           name: tracks.name,
           artist: tracks.artists[0].name,
           album: tracks.album.name,
           uri:tracks.uri,
        }));
    });
  },

  savePlaylistName(name, trackURIs)
  {
    if(!name || !trackURIs)
    {
       return;  
    }
    let accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userID = "";
    return fetch("https://api.spotify.com/v1/me", {headers: headers})
    .then((response) => response.json())
    .then((jsonResponse) => {
       userID = jsonResponse;
       return fetch(`https://api.spotify.com/v1/users/${userID}/playlists` , {
        headers: headers,
        method: "POST",
        body: JSON.stringify({name:name}),
       })
       .then((response) => response.json())
       .then((jsonResponse) => {
          const playlistID = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
            headers: headers,
            method: "POST",
            body: JSON.stringify({uris:trackURIs}),
          });
       });
    });
  }
};

export {Spotify};