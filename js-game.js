"use strict";

function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function refillQueue() {
  const next = shuffle(getPlayableCards());

  if (state.currentCard && next.length > 1) {
    const firstSame =
      next[0].modeId === state.currentCard.modeId &&
      next[0].id === state.currentCard.id;

    if (firstSame) [next[0], next[1]] = [next[1], next[0]];
  }

  state.queue.push(...next);
}

function drawNextCard() {
  if (state.queue.length === 0) refillQueue();

  if (state.queue.length === 0) {
    finishGame("empty");
    return;
  }

  state.currentCard = state.queue.shift();
  renderGameCard();
}

function renderGameCard() {
  const card = state.currentCard;
  if (!card) return;
  const config = modeConfig(card.modeId);
  el.gameCard.style.setProperty("--mode-color", config.color);
  el.gameModeLabel.textContent = config.gameLabel;

  el.lyricsGameContent.classList.toggle("hidden", config.type !== "lyrics");
  el.mimeGameContent.classList.toggle("hidden", config.type !== "mime");
  el.wordsGameContent.classList.toggle("hidden", config.type !== "words");
  el.gameCard.classList.remove("forbidden-hidden");

  if (config.type === "lyrics") {
    el.promptText.textContent = card.prompt;
    el.answerText.textContent = card.answer;
    el.cardMetaPrimary.textContent = card.title;
    el.cardMetaSecondary.textContent = `${card.source} · ${DIFFICULTY_LABELS[card.difficulty]}`;
  } else if (config.type === "words") {
    el.wordPromptText.textContent = card.prompt;
    el.forbiddenWordsList.innerHTML = "";
    (card.forbiddenWords || []).forEach(word => {
      const chip = document.createElement("span");
      chip.className = "forbidden-word";
      chip.textContent = word;
      el.forbiddenWordsList.append(chip);
    });
    const showForbidden = state.settings.modeOptions.words.showForbiddenWords;
    el.gameCard.classList.toggle("forbidden-hidden", !showForbidden);
    el.cardMetaPrimary.textContent = getBoxName(card.modeId, card.boxId);
    el.cardMetaSecondary.textContent = DIFFICULTY_LABELS[card.difficulty];
  } else {
    el.mimePromptText.textContent = card.prompt;
    el.cardMetaPrimary.textContent = getBoxName(card.modeId, card.boxId);
    el.cardMetaSecondary.textContent = DIFFICULTY_LABELS[card.difficulty];
  }

  resetCardPosition();
  requestAnimationFrame(fitCardContent);
}

function fitCardContent() {
  el.gameCard.classList.remove("card-medium", "card-compact", "card-tiny");
  const card = state.currentCard;
  if (!card) return;
  const config = modeConfig(card.modeId);
  let length = card.prompt.length;
  if (config.type === "lyrics") length += card.answer.length;
  if (config.type === "words" && state.settings.modeOptions.words.showForbiddenWords) {
    length += (card.forbiddenWords || []).join(" ").length * 0.55;
  }

  if (length > 58) el.gameCard.classList.add("card-medium");
  if (length > 88) {
    el.gameCard.classList.remove("card-medium");
    el.gameCard.classList.add("card-compact");
  }
  if (length > 125) {
    el.gameCard.classList.remove("card-medium", "card-compact");
    el.gameCard.classList.add("card-tiny");
  }
  requestAnimationFrame(() => {
    if (el.gameCard.scrollHeight > el.gameCard.clientHeight + 2) {
      el.gameCard.classList.remove("card-medium", "card-compact");
      el.gameCard.classList.add("card-tiny");
    }
  });
}

function getSwipeThreshold() {
  return Math.min(105, Math.max(60, window.innerWidth * 0.12));
}

function resetCardPosition() {
  el.gameCard.classList.remove(
    "animating",
    "swiping-valid",
    "swiping-pass"
  );
  el.gameCard.style.removeProperty("--swipe-tint");
  el.gameCard.style.transform = "";
  el.gameCard.style.opacity = "1";
}

function vibrateForResult(result, force = false) {
  if (!("vibrate" in navigator)) return;
  if (!force && !state.settings.vibrationEnabled) return;

  try {
    navigator.vibrate(0);

    if (result === "valid") {
      navigator.vibrate([45,45,45,45,45]);
    } else {
      navigator.vibrate(425);
    }
  } catch (error) {
    recordError(error);
  }
}

function getRequestedSeconds() {
  const custom = Number.parseInt(el.customSeconds.value, 10);
  if (Number.isFinite(custom)) {
    return Math.min(600, Math.max(10, custom));
  }
  return state.selectedSeconds;
}

function updateDurationSelection(seconds) {
  state.selectedSeconds = seconds;

  el.durationButtons.forEach(button => {
    button.classList.toggle(
      "selected",
      Number(button.dataset.seconds) === seconds
    );
  });

  el.customSeconds.value = "";
}

async function requestGameDisplay() {
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({
        navigationUI: "hide"
      });
    }
  } catch (_) {}

  try {
    if (screen.orientation?.lock) {
      await screen.orientation.lock("landscape");
    }
  } catch (_) {}

  await requestWakeLock();
}

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator && document.visibilityState === "visible") {
      state.wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch (error) {
    recordError(error);
  }
}

async function releaseWakeLock() {
  try {
    if (state.wakeLock) await state.wakeLock.release();
  } catch (_) {
  } finally {
    state.wakeLock = null;
  }
}

async function startFlow() {
  if (getPlayableCards().length === 0) {
    alert("Sélectionne au moins un mode contenant une boîte et une carte active.");
    return;
  }

  const drawSelected = state.settings.selectedModeIds.includes("draw");
  if (drawSelected && state.settings.selectedModeIds.length > 1) {
    alert("Pour cette version, Dessine-moi ça ! se joue seul. Désactive les autres modes ou sélectionne une autre tuile.");
    return;
  }
  if (drawSelected) {
    await startDrawingRound();
    return;
  }

  state.durationMs = getRequestedSeconds() * 1000;
  state.remainingMs = state.durationMs;
  await requestGameDisplay();
  runCountdown();
}

function runCountdown() {
  clearInterval(state.countdownTimer);
  showScreen(el.countdownScreen);

  let value = 3;
  el.countdownValue.textContent = value;

  state.countdownTimer = window.setInterval(() => {
    value -= 1;

    if (value > 0) {
      el.countdownValue.textContent = value;
      el.countdownValue.style.animation = "none";
      void el.countdownValue.offsetWidth;
      el.countdownValue.style.animation = "";
    } else {
      clearInterval(state.countdownTimer);
      beginGame();
    }
  }, 900);
}

function beginGame() {
  state.running = true;
  state.paused = false;
  state.queue = [];
  state.currentCard = null;
  state.history = [];
  state.valid = 0;
  state.passed = 0;
  state.remainingMs = state.durationMs;

  updateScores();
  refillQueue();
  drawNextCard();
  showScreen(el.gameScreen);

  state.deadline = performance.now() + state.remainingMs;
  startTimerLoop();
}

function startTimerLoop() {
  cancelAnimationFrame(state.rafId);

  const tick = now => {
    if (!state.running || state.paused) return;

    state.remainingMs = Math.max(0, state.deadline - now);
    renderTime();

    if (state.remainingMs <= 0) {
      finishGame("time");
      return;
    }

    state.rafId = requestAnimationFrame(tick);
  };

  state.rafId = requestAnimationFrame(tick);
}

function renderTime() {
  el.timeDisplay.textContent =
    String(Math.ceil(state.remainingMs / 1000));
}

function updateScores() {
  el.validScore.textContent = String(state.valid);
  el.passScore.textContent = String(state.passed);
  el.undoButton.disabled = state.history.length === 0;
}

function togglePause(forcePause) {
  if (!state.running) return;

  const shouldPause =
    typeof forcePause === "boolean"
      ? forcePause
      : !state.paused;

  if (shouldPause === state.paused) return;

  if (shouldPause) {
    state.remainingMs =
      Math.max(0, state.deadline - performance.now());
    state.paused = true;
    cancelAnimationFrame(state.rafId);
    el.pauseOverlay.classList.remove("hidden");
    el.pauseButton.textContent = "▶ Reprendre";
  } else {
    state.paused = false;
    state.deadline = performance.now() + state.remainingMs;
    el.pauseOverlay.classList.add("hidden");
    el.pauseButton.textContent = "Ⅱ Pause";
    startTimerLoop();
    requestWakeLock();
  }
}

function commitSwipe(result) {
  if (!state.running || state.paused || !state.currentCard) return;

  const judgedCard = state.currentCard;
  state.history.push({ card: judgedCard, result });

  if (result === "valid") state.valid += 1;
  else state.passed += 1;

  updateScores();
  vibrateForResult(result);

  el.gameCard.classList.remove("swiping-valid", "swiping-pass");
  el.gameCard.classList.add(
    result === "valid" ? "swiping-valid" : "swiping-pass"
  );
  el.gameCard.style.setProperty("--swipe-tint", "0.58");

  const direction = result === "valid" ? 1 : -1;
  const displayDirection = state.flipped ? -direction : direction;

  el.gameCard.classList.add("animating");
  el.gameCard.style.transform =
    `translateX(${displayDirection * window.innerWidth * 1.15}px) ` +
    `rotate(${displayDirection * 10}deg)`;
  el.gameCard.style.opacity = "0";

  window.setTimeout(() => {
    if (!state.running) return;
    drawNextCard();
  }, SWIPE_ANIMATION_MS);
}

function undoLast() {
  if (
    !state.running ||
    state.paused ||
    state.history.length === 0
  ) return;

  const last = state.history.pop();

  if (last.result === "valid") {
    state.valid = Math.max(0, state.valid - 1);
  } else {
    state.passed = Math.max(0, state.passed - 1);
  }

  if (state.currentCard) state.queue.unshift(state.currentCard);
  state.currentCard = last.card;

  updateScores();
  renderGameCard();
}

function finishGame(reason = "manual") {
  if (!state.running) return;

  state.running = false;
  state.paused = false;
  cancelAnimationFrame(state.rafId);
  clearInterval(state.countdownTimer);
  el.pauseOverlay.classList.add("hidden");
  el.pauseButton.textContent = "Ⅱ Pause";

  renderResults(reason);
  showScreen(el.resultsScreen);
  releaseWakeLock();
}

function renderResults(reason) {
  resetResultLabels();
  el.resultValid.textContent = String(state.valid);
  el.resultPassed.textContent = String(state.passed);
  el.resultTotal.textContent = String(state.history.length);
  el.resultDetails.innerHTML = "";

  if (state.history.length === 0) {
    const empty = document.createElement("p");
    empty.style.padding = "18px";
    empty.style.margin = "0";
    empty.style.color = "var(--muted)";
    empty.textContent =
      reason === "time"
        ? "Le temps est écoulé avant la première réponse."
        : "Aucune carte jouée.";

    el.resultDetails.append(empty);
    return;
  }

  state.history.forEach(entry => {
    const card = entry.card;
    const config = modeConfig(card.modeId);

    const row = document.createElement("div");
    row.className =
      `result-row ${entry.result === "valid" ? "valid" : "passed"}`;

    const status = document.createElement("span");
    status.className = "status";
    status.textContent =
      entry.result === "valid" ? "✓" : "✕";

    const details = document.createElement("div");
    details.className = "details";

    const title = document.createElement("strong");
    const source = document.createElement("small");

    if (config.type === "lyrics") {
      title.textContent = card.title;
      source.textContent = `${config.name} · ${card.source}`;
    } else {
      title.textContent = card.prompt;
      source.textContent =
        `${config.name} · ` +
        `${getBoxName(card.modeId, card.boxId)} · ` +
        `${DIFFICULTY_LABELS[card.difficulty]}`;
    }

    details.append(title, source);

    const word = document.createElement("span");
    word.className = "result-word";
    word.textContent =
      entry.result === "valid" ? "VALIDÉE" : "PASSÉE";

    row.append(status, details, word);
    el.resultDetails.append(row);
  });
}

function goHome() {
  if (state.drawRound) cancelAnimationFrame(state.drawRound.timerRaf || 0);
  state.drawRound = null;
  state.running = false;
  state.paused = false;
  cancelAnimationFrame(state.rafId);
  clearInterval(state.countdownTimer);
  releaseWakeLock();
  renderHomeData();
  showScreen(el.homeScreen);
}

function syncSwipeGuides() {
  setGuide(
    el.leftSwipeGuide,
    state.flipped ? "valid" : "pass"
  );

  setGuide(
    el.rightSwipeGuide,
    state.flipped ? "pass" : "valid"
  );
}

function setGuide(guide, result) {
  guide.dataset.result = result;
  guide.classList.toggle("guide-valid", result === "valid");
  guide.classList.toggle("guide-pass", result === "pass");
  guide.querySelector(".guide-word").textContent =
    result === "valid" ? "VALIDÉE" : "PASSÉE";
}

function setFlipped(value) {
  state.flipped = value;
  el.app.classList.toggle("flipped", value);
  localStorage.setItem("mdb-flipped", value ? "1" : "0");
  syncSwipeGuides();
}

function toggleFlipped() {
  setFlipped(!state.flipped);
}

function onPointerDown(event) {
  if (!state.running || state.paused || event.button !== 0) return;
  if (event.target.closest("button")) return;

  state.pointer = {
    id: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    currentX: event.clientX,
    currentY: event.clientY
  };

  el.gameCard.setPointerCapture?.(event.pointerId);
  el.gameCard.classList.remove("animating");
}

function onPointerMove(event) {
  if (
    !state.pointer ||
    event.pointerId !== state.pointer.id ||
    !state.running ||
    state.paused
  ) return;

  const rawDx = event.clientX - state.pointer.startX;
  const dy = event.clientY - state.pointer.startY;

  state.pointer.currentX = event.clientX;
  state.pointer.currentY = event.clientY;

  const horizontalEnough =
    Math.abs(rawDx) >= Math.abs(dy) * 0.65;

  if (!horizontalEnough && Math.abs(dy) > 28) {
    resetCardPosition();
    return;
  }

  const displayDx = state.flipped ? -rawDx : rawDx;
  const threshold = getSwipeThreshold();
  const progress = Math.min(1, Math.abs(rawDx) / threshold);

  el.gameCard.style.transform =
    `translateX(${displayDx}px) rotate(${displayDx / 45}deg)`;
  el.gameCard.style.opacity =
    String(1 - progress * 0.18);

  el.gameCard.classList.remove(
    "swiping-valid",
    "swiping-pass"
  );

  el.gameCard.style.setProperty(
    "--swipe-tint",
    String(0.07 + progress * 0.43)
  );

  if (rawDx > 0) {
    el.gameCard.classList.add("swiping-valid");
  } else if (rawDx < 0) {
    el.gameCard.classList.add("swiping-pass");
  }
}

function onPointerEnd(event) {
  if (
    !state.pointer ||
    event.pointerId !== state.pointer.id
  ) return;

  const rawDx =
    state.pointer.currentX - state.pointer.startX;
  const dy =
    state.pointer.currentY - state.pointer.startY;
  const threshold = getSwipeThreshold();
  const horizontalEnough =
    Math.abs(rawDx) >= Math.abs(dy) * 0.65;

  state.pointer = null;

  if (!state.running || state.paused) {
    resetCardPosition();
    return;
  }

  if (horizontalEnough && rawDx >= threshold) {
    commitSwipe("valid");
  } else if (horizontalEnough && rawDx <= -threshold) {
    commitSwipe("pass");
  } else {
    resetCardPosition();
  }
}
