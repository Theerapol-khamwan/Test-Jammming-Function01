import React, { useState } from "react";
import TrackList from "../TrackList/TrackList";
import style from "./Playlist.module.css";

const Playlist = (props) => {
  const { playlistName, onNameChange, onRemove, onSave, playlistTracks } =
    props;

  const [namesList, setNamesList] = useState(playlistName);

  const handleNameChange = (event) => {
    setNamesList(event.target.value);
    onNameChange(event.target.value);
  };

  return (
    <div className={style.Playlist}>
      <input defaultValue={playlistName} onChange={handleNameChange} />
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        trackList={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className={style["Playlist-save"]} onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
