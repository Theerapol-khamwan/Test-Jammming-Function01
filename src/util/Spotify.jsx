let accessToken;
const clientId = "060a3da96fdc4e8bbb7e171cdb72e09f";
const redirectUri = "http://localhost:5173/";
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    try {
      let accessToken = this.getAccessToken();
      console.log(accessToken);

      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
        // returns the response in an array with objects
      } else {
        throw new Error("search request failed");
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlayList(name, trackUris) {
    try {
      if (!name || !trackUris.length) {
        return;
      }

      const accessToken = this.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userId;
      let playListId;
      const response = await fetch(`https://api.spotify.com/v1/me`, {
        headers: headers,
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        userId = jsonResponse.id;
        // first gathers the user id before we can save the playlist
      } else {
        throw new Error("user Id request failed");
      }

      const playListResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        }
      );
      if (playListResponse.ok) {
        const playListResponseJsonRespone = await playListResponse.json();
        playListId = playListResponseJsonRespone.id;
      } else {
        throw new Error("playlist id request failed");
      }

      // playListresponse is awaiting on the user id but once retrieved it can post the playlist name and then retrieve the playlist id

      const addPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
        {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ uris: trackUris }),

          // once userid is retrieved and the playlistname is posted(returning playlistid) we can now save the tracks under the playlist via a post method
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
