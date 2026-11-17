import { playDinoHit, playDinoJump, playDinoScore } from "./dinoSounds.js";

export function initDinoGame(canvas, statusEl) {
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d");
  canvas.tabIndex = 0;

  // Figma 2935:1657 — transparent canvas; contact photo + overlay show behind sprites
  const INK = "#A2A2A4";
  const HEIGHT = 122;
  const DINO_W = 35;
  const DINO_H = 75;
  const GROUND_DINO_Y = HEIGHT - DINO_H; // 47 — matches Figma top offset
  const BODY_TOP = 38;
  const CACTUS_H = 28;
  const CACTUS_Y = HEIGHT - CACTUS_H; // 94
  const NARROW_W = 16;
  const WIDE_W = 28;
  const FIGMA_W = 1920;
  const FIGMA_DINO_X = 625;

  // Easy Chrome-like pacing — taller, smoother jump arc
  const START_SPEED = 2.4;
  const MAX_SPEED = 4.8;
  const ACCEL = 0.00015;
  const GRAVITY_UP = 0.26; // light while rising (hold Space)
  const GRAVITY_FALL = 0.36; // slightly firmer on the way down
  const JUMP_V = -12.8;
  const DROP_V = -5.2; // short-hop cut when key released
  const MAX_JUMP_Y = 0; // use full 122px playfield
  const CLEAR = 120;
  const BASE_GAP = 280;
  const GAP_EXTRA = 160;
  const HIT_PAD = 7;
  const HI_KEY = "asad-dino-hi";

  let width = 0;
  let dpr = 1;
  let running = false;
  let waiting = true;
  let crashed = false;
  let score = 0;
  let highScore = Number(localStorage.getItem(HI_KEY) || 0);
  let speed = START_SPEED;
  let frame = 0;
  let distance = 0;
  let spawnIn = 0;
  let ready = false;
  let lastTime = 0;
  let keyHeld = false;
  let scoreMilestone = 0;

  const imgs = {
    stand: new Image(),
    runA: new Image(),
    runB: new Image(),
    cactA: new Image(),
    cactB: new Image(),
  };

  const dino = { x: 0, y: GROUND_DINO_Y, vy: 0, jumping: false };
  let obstacles = [];

  function load(img, src) {
    return new Promise((res) => {
      img.onload = () => res(true);
      img.onerror = () => res(false);
      img.src = src;
    });
  }

  function pad(n) {
    return String(Math.min(99999, Math.floor(n))).padStart(5, "0");
  }

  function placeDino() {
    dino.x = Math.round(width * (FIGMA_DINO_X / FIGMA_W));
    dino.x = Math.max(20, Math.min(dino.x, width - DINO_W - 20));
  }

  function groundDino() {
    dino.y = GROUND_DINO_Y;
    dino.vy = 0;
    dino.jumping = false;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(320, canvas.parentElement.clientWidth);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(HEIGHT * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = HEIGHT + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    placeDino();
    if (!running) groundDino();
    draw();
  }

  function resetGame() {
    running = true;
    waiting = false;
    crashed = false;
    score = 0;
    speed = START_SPEED;
    frame = 0;
    distance = 0;
    spawnIn = CLEAR;
    obstacles = [];
    keyHeld = false;
    scoreMilestone = 0;
    groundDino();
    placeDino();
    if (statusEl) statusEl.textContent = "";
  }

  function jump() {
    if (crashed) resetGame();
    else if (waiting || !running) resetGame();

    if (dino.jumping || keyHeld) return;

    keyHeld = true;
    dino.jumping = true;
    dino.vy = JUMP_V;
    playDinoJump();
  }

  function releaseJump() {
    keyHeld = false;
    if (dino.jumping && dino.vy < DROP_V) dino.vy = DROP_V;
  }

  function spawn() {
    const wide = score > 400 && Math.random() > 0.8;
    const unit = wide ? WIDE_W : NARROW_W;
    obstacles.push({
      x: width + 24,
      w: unit,
      h: CACTUS_H,
      wide: wide,
    });
    spawnIn = (BASE_GAP + Math.random() * GAP_EXTRA) / Math.max(speed, 1);
  }

  function hit(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  function dinoBox() {
    return {
      x: dino.x + 10,
      y: dino.y + BODY_TOP + 6,
      w: DINO_W - 16,
      h: DINO_H - BODY_TOP - 12,
    };
  }

  function update(dt) {
    if (!running) return;

    frame += dt;
    distance += speed * dt;
    score = distance * 0.018;
    const milestone = Math.floor(score / 100);
    if (milestone > scoreMilestone) {
      scoreMilestone = milestone;
      playDinoScore();
    }
    if (speed < MAX_SPEED) speed += ACCEL * dt * 16;

    if (dino.jumping) {
      // Chrome-style: lower gravity while rising + holding → taller, smoother float
      const rising = dino.vy < 0;
      const g =
        rising && keyHeld ? GRAVITY_UP : rising ? GRAVITY_UP * 1.15 : GRAVITY_FALL;
      dino.vy += g * dt;
      dino.y += dino.vy * dt;
      if (dino.y < MAX_JUMP_Y) {
        dino.y = MAX_JUMP_Y;
        if (dino.vy < 0) dino.vy *= 0.35; // soft apex, not a hard stop
      }
      if (dino.y >= GROUND_DINO_Y) groundDino();
    } else {
      groundDino();
    }

    spawnIn -= dt;
    if (spawnIn <= 0) spawn();

    const move = speed * dt;
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].x -= move;
      if (obstacles[i].x + obstacles[i].w < -20) obstacles.splice(i, 1);
    }

    const box = dinoBox();
    for (const o of obstacles) {
      const ob = {
        x: o.x + HIT_PAD,
        y: CACTUS_Y + HIT_PAD,
        w: Math.max(4, o.w - HIT_PAD * 2),
        h: Math.max(4, o.h - HIT_PAD),
      };
      if (hit(box, ob)) {
        running = false;
        crashed = true;
        playDinoHit();
        if (score > highScore) {
          highScore = Math.floor(score);
          localStorage.setItem(HI_KEY, String(highScore));
        }
        if (statusEl) statusEl.textContent = "Game Over";
        break;
      }
    }
  }

  const RUN_STEP = 5; // Chrome-like leg cadence (~12 fps stride)

  function drawDino() {
    ctx.imageSmoothingEnabled = false;

    let sprite = imgs.stand;
    if (!waiting && !crashed && !dino.jumping) {
      // Alternate run frames so legs clearly cycle while running
      sprite = Math.floor(frame / RUN_STEP) % 2 === 0 ? imgs.runA : imgs.runB;
    }
    if (!(sprite.complete && sprite.naturalWidth)) {
      sprite = imgs.stand;
      if (!(sprite.complete && sprite.naturalWidth)) return;
    }
    ctx.drawImage(sprite, dino.x, dino.y, DINO_W, DINO_H);
  }

  function drawRestartIcon(cx, cy) {
    ctx.strokeStyle = INK;
    ctx.fillStyle = INK;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 9, -Math.PI * 0.85, Math.PI * 0.75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + 6, cy - 8);
    ctx.lineTo(cx + 11, cy - 3);
    ctx.lineTo(cx + 3, cy - 2);
    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    // Clear only — leave canvas transparent so contactUsBg shows through
    ctx.clearRect(0, 0, width, HEIGHT);

    if (ready) {
      if (!waiting) {
        obstacles.forEach((o) => {
          const img = o.wide ? imgs.cactB : imgs.cactA;
          if (img.complete && img.naturalWidth) {
            ctx.drawImage(img, o.x, CACTUS_Y, o.w, o.h);
          }
        });
      }
      drawDino();
    }

    ctx.font = 'bold 11px "Courier New", monospace';
    ctx.fillStyle = "rgba(162,162,164,0.9)";
    ctx.textBaseline = "top";

    if (waiting) {
      ctx.textAlign = "center";
      ctx.fillText("Press Space or ↑ to play", width / 2, 10);
    } else {
      ctx.textAlign = "right";
      ctx.fillText(pad(score), width - 14, 10);
      if (highScore > 0) {
        ctx.fillText(pad(highScore), width - 78, 10);
        ctx.fillText("HI", width - 124, 10);
      }
      if (crashed) {
        ctx.textAlign = "center";
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.fillStyle = INK;
        ctx.fillText("G A M E  O V E R", width / 2, 10);
        drawRestartIcon(width / 2, 42);
      }
    }
  }

  let stopped = false;
  let rafId = 0;

  function loop(now) {
    if (stopped) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min((now - lastTime) / (1000 / 60), 3);
    lastTime = now;

    if (waiting) {
      frame += dt;
      groundDino();
    } else if (running) {
      update(dt);
    }

    draw();
    rafId = requestAnimationFrame(loop);
  }

  function isTypingTarget(el) {
    if (!el || el === document.body) return false;
    const tag = el.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
    if (el.isContentEditable) return true;
    return Boolean(el.closest && el.closest("input, textarea, select, [contenteditable='true']"));
  }

  function onKeyDown(e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
      if (isTypingTarget(e.target) || isTypingTarget(document.activeElement)) return;
      e.preventDefault();
      if (e.repeat) return;
      jump();
    }
  }

  function onKeyUp(e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
      if (isTypingTarget(e.target) || isTypingTarget(document.activeElement)) return;
      e.preventDefault();
      releaseJump();
    }
  }

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    canvas.focus({ preventScroll: true });
    jump();
  }

  Promise.all([
    load(imgs.stand, "/images/footer/dino-stand.svg"),
    load(imgs.runA, "/images/footer/dino-run-a.svg"),
    load(imgs.runB, "/images/footer/dino-run-b.svg"),
    load(imgs.cactA, "/images/footer/cactus-b.svg"),
    load(imgs.cactB, "/images/footer/cactus-wide.svg"),
  ]).then(() => {
    ready = true;
    draw();
  });

  const onContextMenu = (e) => e.preventDefault();
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointerup", releaseJump);
  canvas.addEventListener("contextmenu", onContextMenu);

  resize();
  if (statusEl) statusEl.textContent = "Press Space or ↑ to play";
  rafId = requestAnimationFrame(loop);

  return () => {
    stopped = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", releaseJump);
    canvas.removeEventListener("contextmenu", onContextMenu);
  };
}