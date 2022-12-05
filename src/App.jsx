import React, { useState, useEffect } from "react";

import "./App.css";

import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";

import Spotify from "./util/Spotify";

// const DATAMY_STATE = {
//   searchResults: [
//     { id: 1, name: "name1", artist: "artist1", album: "albuml1" },
//     { id: 2, name: "name2", artist: "artist2", album: "albuml2" },
//     { id: 3, name: "name3", artist: "artist3", album: "albuml3" },
//   ],
//   playlistName: "My PlayList for keng",
//   playlistTracks: [
//     {
//       id: 4,
//       name: "playlistName1",
//       artist: "playlistArtist1",
//       album: "playlisAlbuml1",
//     },
//     {
//       id: 5,
//       name: "playlistName2",
//       artist: "playlistArtist2",
//       album: "playlisAlbuml2",
//     },
//     {
//       id: 6,
//       name: "playlistName3",
//       artist: "playlistArtist3",
//       album: "playlisAlbuml3",
//     },
//   ],
// };

const DATAMY_STATE = {
  searchResults: [],
  playlistName: "My PlayList",
  playlistTracks: [],
};

function App() {
  const [addPlayListTracks, setAddPlayListTracks] = useState(
    DATAMY_STATE.playlistTracks
  );
  const [addsearchResults, setAddsearchResults] = useState(
    DATAMY_STATE.searchResults
  );
  const [addplaylistName, setAddplaylistName] = useState(
    DATAMY_STATE.playlistName
  );

  useEffect(() => {
    Spotify.getAccessToken();

    // executes the getaccess token every singletime the application renders
  },[]);

  const updatePlaylistName = (name) => {
    setAddplaylistName(name);

    // update playlist name
    // 1212121212
  };

  const addTrack = (track) => {
    if (addPlayListTracks.includes(track)) {
      return;
    }
    setAddPlayListTracks([...addPlayListTracks, track]);

    //  addtrack to playlist
  };

  const removeTrack = (track) => {
    setAddPlayListTracks(
      addPlayListTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );

    // removertack to playlist
  };

  const savePlayList = () => {
    const trackURIs = addPlayListTracks.map((track) => track.uri);

    Spotify.savePlayList(addplaylistName, trackURIs);

    setAddplaylistName('My PlayList')
    setAddPlayListTracks([]);

    // save playlist
  };

  const search = async (term) => {
    const search = await Spotify.search(term);
    setAddsearchResults(search);

    // search results
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults searchResults={addsearchResults} onAdd={addTrack} />
          {/* <!-- Add a Playlist component --> */}
          <Playlist
            playlistName={addplaylistName}
            playlistTracks={addPlayListTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlayList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
