const CLICK_SRC = "/sounds/keyboard-single-click.mp3";

let clickAudio = null;
let unlocked = false;

function getClickAudio() {
  if (typeof window === "undefined") return null;
  if (!clickAudio) {
    clickAudio = new Audio(CLICK_SRC);
    clickAudio.preload = "auto";
    clickAudio.volume = 0.55;
  }
  return clickAudio;
}

/** Unlock audio on first user gesture (browser autoplay policy). */
function unlockAudio() {
  if (unlocked) return;
  const audio = getClickAudio();
  if (!audio) return;
  unlocked = true;
  // Prime the element so later plays start immediately
  const prev = audio.volume;
  audio.volume = 0;
  audio
    .play()
    .then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = prev;
    })
    .catch(() => {
      audio.volume = prev;
      unlocked = false;
    });
}

/** Keyboard single-click sample for all UI buttons (not the dino game). */
export function playClickSound() {
  try {
    const audio = getClickAudio();
    if (!audio) return;
    unlockAudio();
    audio.pause();
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise?.catch) playPromise.catch(() => {});
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
    // Dino game keeps its own jump/hit/score sounds
    if (target.closest("#dino-game, .dino-section")) return;
    const hit = target.closest(CLICK_SELECTOR);
    if (!hit) return;
    if (hit.hasAttribute("disabled") || hit.getAttribute("aria-disabled") === "true") return;
    playClickSound();
  };

  document.addEventListener("pointerdown", onPointerDown, true);
  return () => document.removeEventListener("pointerdown", onPointerDown, true);
}
