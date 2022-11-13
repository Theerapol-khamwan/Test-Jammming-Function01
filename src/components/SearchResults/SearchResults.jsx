import React from "react";
import TrackList from "../TrackList/TrackList";
import style from "./SearchResults.module.css";

const SearchResults = (props) => {
  return (
    <div className={style.SearchResults}>
      <h2>Results</h2>
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        trackList={props.searchResults}
        onAdd={props.onAdd}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;
