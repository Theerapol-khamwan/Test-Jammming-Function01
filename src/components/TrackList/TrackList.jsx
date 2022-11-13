import React from "react";
import Track from "../Track/Track";
import style from "./TrackList.module.css";

const TrackList = (props) => {
  const { trackList, onAdd, onRemove, isRemoval } = props;

  return (
    <div className={style.TrackList}>
      {/* <!-- You will add a map method that renders a set of Track components  --> */}

      {trackList.map((track) => {
        return (
          <Track
            tracks={track}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemovals={isRemoval}
          />
        );
      })}
    </div>
  );
};

export default TrackList;
