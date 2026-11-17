let audioCtx = null;

function getContext() {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

/** Short tactile UI click — synthesized so no audio file is required. */
export function playClickSound() {
  try {
    const ctx = getContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.045);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore autoplay / unsupported-audio failures
  }
}

const CLICK_SELECTOR = [
  "button:not([disabled])",
  "a.cv-btn",
  "a.nav-link",
  "a.contact-social-btn",
  "a[aria-label]",
  "[data-click-sound]",
].join(",");

export function attachGlobalClickSound() {
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("#dino-game, .dino-section")) return;
    const hit = target.closest(CLICK_SELECTOR);
    if (!hit) return;
    if (hit.hasAttribute("disabled") || hit.getAttribute("aria-disabled") === "true") return;
    playClickSound();
  };

  document.addEventListener("pointerdown", onPointerDown, true);
  return () => document.removeEventListener("pointerdown", onPointerDown, true);
}
