import "./videoplayer.css";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Video from "../assets/Video.mp4";
import screenfull from 'screenfull'
import * as TbIcons from "react-icons/tb";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";

const format = (seconds) => {
  if(isNaN(seconds)) {
    return '00:00'
  } 

  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = date.getUTCSeconds().toString().padStart(2,'0')

  if(hh) {
    return `${hh}:${mm.toString().padStart(2,'0')}:${ss}`
  }

  return `${mm}:${ss}`
}

const VideoPlayer = () => {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.2,
    played: 0,
    seeking: false
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const handlePlayPause = () => setState({ ...state, playing: !state.playing });
  const handleMuted = () => setState({ ...state, muted: !state.muted });
  const handleRewind = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  const handleForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  const handleProgress = (changeState) => setState({ ...state, ...changeState});

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current)
  }

  const handleVolumeChange = (newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue < 1 ? true : false,
    });
  };
    
    const handleSeekChange = (newValue) => {
      setState({ ...state, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(newValue / 100)
  };

  const elapsedTime = playerRef && playerRef.current ? format(playerRef.current.getCurrentTime()) : "00:00"
  const totalDuration = playerRef && playerRef.current ? format(playerRef.current.getDuration()) : "00:00"

  return (
    <div ref={playerContainerRef} className="container">
      <div>
        <ReactPlayer
          width="100%"
          height="100%"
          url={Video}
          playing={state.playing}
          muted={state.muted}
          ref={playerRef}
          volume={state.volume}
          onProgress={handleProgress}
        />
      </div>

      <div className="progressBar">
        <input
          type="range"
          min={0}
          max={100}
          value={state.played * 100}
          onChange={(e) => handleSeekChange(e.target.value)}
        />
      </div>

      <div className="controls">
        <div className="leftControls">
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
        </div>

        <div className="midControls">
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
        </div>

        <div className="rightControls">
          <p>{elapsedTime} / {totalDuration}</p>
          <button onClick={toggleFullScreen}>
            <BsIcons.BsFullscreen />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
