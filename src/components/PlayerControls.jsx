import React from "react";

const PlayerControls = ({ onPlayPause }) => {
  return (
    <div>
      <div>
        ProgressBar
      </div>

      <div>
        <button>Backward</button>
        <button onClick={onPlayPause}>Pause / Play</button>
        <button>Forward</button>  
      </div>

      <div>
        <p>00:00 / 00:00</p>
      </div>

      <div>
        <button>Mute Sound</button>
      </div>

      <div>
        <button>FullScreen</button>
      </div>
    </div>
  )
}

export default PlayerControls;