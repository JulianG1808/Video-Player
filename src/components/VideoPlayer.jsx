import './videoplayer.css'
import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import Video from '../assets/Video.mp4'

const VideoPlayer = () => {
  const [state, setState] = useState({
    playing: false,
    muted: false
  })

  const playerRef = useRef(null)

  const handlePlayPause = () => setState({...state, playing: !state.playing})
  const handleMuted = () => setState({...state, muted: !state.muted})
  const handleRewind = () =>  playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  const handleForward = () => playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
   
  return (
    <div className="container">
      <div>
        <ReactPlayer width="100%" height="100%" url={Video} playing={state.playing} muted={state.muted} ref={playerRef}/>
      </div>

      <div className='progressBar'>
        <input type='range' min='0' max='100' />
      </div>

      <div className='controls'>
        <div className='rightControls'>
          <button onClick={handleMuted}>Mute Sound</button>
          <input type='range' min='0' max='100' />
        </div>

        <div className='midControls'>
          <button onClick={handleRewind}>Backward</button>
          <button onClick={handlePlayPause}>Pause / Play</button>
          <button onClick={handleForward}>Forward</button>  
        </div>

        <div className='leftControls'>
          <p>00:00 / 00:00</p>
          <button>FullScreen</button>
        </div>

      </div>
    </div>
  )
}

export default VideoPlayer;