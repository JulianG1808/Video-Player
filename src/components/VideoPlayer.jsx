import "../styles/styles.css";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Video from "../assets/Video.mp4";
import screenfull from "screenfull";
import PlayerControls from "./PlayerControls"

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }

  return `${mm}:${ss}`;
};

const VideoPlayer = () => {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.2,
    played: 0,
    seeking: false,
  });

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  const handlePlayPause = () => setState({ ...state, playing: !state.playing });
  const handleMuted = () => setState({ ...state, muted: !state.muted });
  const handleRewind = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  const handleForward = () =>
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  const handleProgress = (changeState) =>
    setState({ ...state, ...changeState });

  const toggleFullScreen = () => {
    screenfull.toggle(playerContainerRef.current);
  };

  const handleVolumeChange = (newValue) => {
    setState({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue < 1 ? true : false,
    });
  };

  const handleSeekChange = (newValue) => {
    setState({ ...state, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(newValue / 100);
  };

  const elapsedTime =
    playerRef && playerRef.current
      ? format(playerRef.current.getCurrentTime())
      : "00:00";
  const totalDuration =
    playerRef && playerRef.current
      ? format(playerRef.current.getDuration())
      : "00:00";

  return (
    <main ref={playerContainerRef} className="videoplayer">
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

        <PlayerControls 
          state={state}
          handleForward={handleForward}
          handleMuted={handleMuted}
          handlePlayPause={handlePlayPause}
          handleProgress={handleProgress}
          handleRewind={handleRewind}
          handleSeekChange={handleSeekChange}
          handleVolumeChange={handleVolumeChange}
          toggleFullScreen={toggleFullScreen}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
        />
    </main>
  );
};

export default VideoPlayer;
