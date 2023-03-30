import React from "react";
import * as TbIcons from "react-icons/tb";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import '../styles/controls.css'

const PlayerControls = ({
  state,
  handleForward,
  handleMuted,
  handlePlayPause,
  handleRewind,
  handleSeekChange,
  handleVolumeChange,
  toggleFullScreen,
  elapsedTime,
  totalDuration,
}) => {
  return (
    <main className="controls">
      <div className="progressBar">
        <input
          type="range"
          min={0}
          max={100}
          value={state.played * 100}
          onChange={(e) => handleSeekChange(e.target.value)}
        />
      </div>

      <div className="mediaControls">
        <section className="leftControls">
          <button onClick={handleMuted}>
            {state.muted ? <BiIcons.BiVolumeMute /> : <BiIcons.BiVolumeFull />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={state.muted ? 0 : state.volume * 100}
            onChange={(e) => handleVolumeChange(e.target.value)}
          />
        </section>

        <section className="midControls">
          <button onClick={handleRewind}>
            <TbIcons.TbPlayerTrackPrev />
          </button>
          <button onClick={handlePlayPause}>
            {state.playing ? (
              <TbIcons.TbPlayerPause />
            ) : (
              <TbIcons.TbPlayerPlay />
            )}
          </button>
          <button onClick={handleForward}>
            <TbIcons.TbPlayerTrackNext />
          </button>
        </section>

        <section className="rightControls">
          <p>
            {elapsedTime} / {totalDuration}
          </p>
          <button onClick={toggleFullScreen}>
            <BsIcons.BsFullscreen />
          </button>
        </section>
      </div>
    </main>
  );
};

export default PlayerControls;
