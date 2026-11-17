import { useEffect, useRef } from 'react';
import { initDinoGame } from '../lib/dinoGame';

export default function DinoGame() {
  const canvasRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const cleanup = initDinoGame(canvasRef.current, statusRef.current);
    return cleanup;
  }, []);

  return (
    <section className="dino-section" aria-label="Chrome Dino mini game">
      <canvas
        ref={canvasRef}
        id="dino-game"
        width="1920"
        height="122"
        tabIndex={0}
        aria-label="Chrome T-Rex runner. Press Space or Up arrow to jump."
      />
      <div className="dino-ground-line" aria-hidden="true" />
      <p ref={statusRef} id="dino-status" className="dino-status" aria-live="polite">
        Press Space / Tap to play
      </p>
    </section>
  );
}