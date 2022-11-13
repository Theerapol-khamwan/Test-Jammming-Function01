import React from "react";
import style from "./Track.module.css";

const Track = (props) => {
  const renderAction = () => {
    if (props.isRemovals) {
      return <button className={style["Track-action"]} onClick={removeTrack}> - </button>;
    } else {
      return <button className={style["Track-action"]} onClick={addTrack} > + </button>;
    }
  };

  let addTrack = () => {
    props.onAdd(props.tracks);
  };

  let removeTrack = () => {
    props.onRemove(props.tracks)
  }

  return (
    <div className={style.Track}>
      <div className={style["Track-information"]}>
        <h3>
          {/*<!-- track name will go here -->*/}
          {props.tracks.name}
        </h3>
        <p>
          {/* <!-- track artist will go here--> | <!-- track album will go here -->*/}
          {props.tracks.artist} | {props.tracks.album}
        </p>
      </div>
      <a className={style["Track-action"]}>
        {/* <!-- + or - will go here --> */}
        {renderAction()}
      </a>
    </div>
  );
};

export default Track;
