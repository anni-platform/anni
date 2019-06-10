import React from 'react';
import useCanvasScrubber from 'anni-player';

export default function Player({ frames }) {
  const { canvasRef, togglePlay, isPlaying } = useCanvasScrubber({
    frames,
  });
  return (
    <div style={{ position: 'relative', maxWidth: 800 }}>
      <div style={{ padding: '8px 0 8px' }}>
        <button onClick={togglePlay}>{isPlaying ? 'pause' : 'play'}</button>
      </div>
      <canvas
        style={{
          maxWidth: '100%',
        }}
        ref={canvasRef}
      />
    </div>
  );
}
