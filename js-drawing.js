"use strict";

function drawPointValue(difficulty) {
  return difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1;
}

function buildBalancedDrawQueue(cards, wanted) {
  const buckets = { easy: [], medium: [], hard: [] };
  cards.forEach(card => buckets[card.difficulty]?.push(card));
  Object.keys(buckets).forEach(key => buckets[key] = shuffle(buckets[key]));
  const enabled = modeState("draw").selectedDifficultyIds.filter(id => buckets[id]?.length);
  const order = shuffle(enabled.length ? enabled : ["easy", "medium", "hard"]);
  const result = [];
  let guard = 0;
  while (result.length < wanted && guard < wanted * 20) {
    const difficulty = order[guard % order.length];
    if (buckets[difficulty]?.length) result.push({ ...buckets[difficulty].pop(), modeId: "draw" });
    else {
      const fallback = Object.keys(buckets).find(key => buckets[key].length);
      if (!fallback) break;
      result.push({ ...buckets[fallback].pop(), modeId: "draw" });
    }
    guard += 1;
  }
  return result;
}

async function startDrawingRound() {
  const cards = selectedCardsForMode("draw");
  if (!cards.length) {
    alert("Sélectionne au moins une catégorie et une difficulté pour le dessin.");
    return;
  }
  await requestGameDisplay();
  const wanted = Math.min(state.settings.modeOptions.draw.attemptCount, cards.length);
  state.drawRound = {
    queue: buildBalancedDrawQueue(cards, wanted),
    attemptIndex: 0,
    points: 0,
    successes: 0,
    totalUsedMs: 0,
    history: [],
    currentCard: null,
    timerRaf: 0,
    deadline: 0,
    durationMs: 0,
    remainingMs: 0,
    support: null,
    strokes: [],
    undoActions: [],
    currentStroke: null,
    color: "#111318",
    size: 7,
    eraser: false,
    canvasWidth: 0,
    canvasHeight: 0
  };
  showNextDrawingPrompt();
}

function showNextDrawingPrompt() {
  const round = state.drawRound;
  cancelAnimationFrame(round?.timerRaf || 0);
  if (!round || round.attemptIndex >= round.queue.length) {
    finishDrawingRound();
    return;
  }
  round.currentCard = round.queue[round.attemptIndex];
  el.drawPromptPanel.classList.remove("hidden");
  el.drawAttemptLabel.textContent = `Dessin ${round.attemptIndex + 1} sur ${round.queue.length}`;
  el.drawRevealMeta.textContent = `${getBoxName("draw", round.currentCard.boxId)} · ${DIFFICULTY_LABELS[round.currentCard.difficulty]} · ${drawPointValue(round.currentCard.difficulty)} point${drawPointValue(round.currentCard.difficulty) > 1 ? "s" : ""}`;
  setDrawingPromptRevealed(false);
  resetDrawHoldButtons();
  showScreen(el.drawRevealScreen);
}

function setDrawingPromptRevealed(revealed) {
  const round = state.drawRound;
  if (!round?.currentCard) return;
  round.promptRevealed = revealed;
  el.drawRevealPromptButton.classList.toggle("revealed", revealed);
  el.drawRevealPromptButton.setAttribute("aria-pressed", String(revealed));
  el.drawRevealPrompt.textContent = revealed ? round.currentCard.prompt : "Appuie pour révéler le mot";
  el.drawRevealMeta.classList.toggle("hidden", !revealed);
  [el.drawOnPhoneButton, el.drawOnPaperButton, el.drawSkipRevealButton].forEach(button => {
    button.disabled = !revealed;
  });
}

function revealDrawingPrompt() {
  if (!state.drawRound?.currentCard || state.drawRound.promptRevealed) return;
  setDrawingPromptRevealed(true);
  if (state.settings.vibrationEnabled && "vibrate" in navigator) navigator.vibrate(22);
}

function skipDrawingBeforeStart() {
  recordDrawingResult("passed", 0, true);
}

function startDrawingPlay(support) {
  const round = state.drawRound;
  if (!round?.currentCard) return;
  round.support = support;
  round.strokes = [];
  round.undoActions = [];
  round.currentStroke = null;
  round.eraser = false;
  updateDrawToolButton();
  el.drawCanvasArea.classList.toggle("hidden", support !== "phone");
  el.drawPaperArea.classList.toggle("hidden", support !== "paper");
  el.drawColorChoices.classList.toggle("hidden", support !== "phone");
  el.drawToolsPanel.classList.toggle("hidden", support !== "phone");
  el.drawPlayScreen.classList.toggle("draw-paper-mode", support === "paper");
  resetDrawHoldButtons();
  el.drawPlayProgress.textContent = `Dessin ${round.attemptIndex + 1}/${round.queue.length}`;
  updateDrawLiveScore();
  showScreen(el.drawPlayScreen);
  if (support === "phone") requestAnimationFrame(() => resizeDrawingCanvas(true));
  startDrawingTimer();
}

function updateDrawLiveScore() {
  const round = state.drawRound;
  if (!round) return;
  el.drawLiveScore.textContent = `${round.points} point${round.points > 1 ? "s" : ""}`;
}

function startDrawingTimer() {
  const round = state.drawRound;
  const seconds = state.settings.modeOptions.draw.durations[round.currentCard.difficulty];
  round.durationMs = seconds * 1000;
  round.remainingMs = round.durationMs;
  round.deadline = performance.now() + round.durationMs;
  cancelAnimationFrame(round.timerRaf);

  const tick = now => {
    if (!state.drawRound || state.drawRound !== round) return;
    round.remainingMs = Math.max(0, round.deadline - now);
    el.drawTimerDisplay.textContent = String(Math.ceil(round.remainingMs / 1000));
    if (round.remainingMs <= 0) {
      playDrawingEndSignal();
      recordDrawingResult("passed", round.durationMs, false, true);
      return;
    }
    round.timerRaf = requestAnimationFrame(tick);
  };
  round.timerRaf = requestAnimationFrame(tick);
}

function playDrawingEndSignal() {
  if (state.settings.vibrationEnabled && "vibrate" in navigator) navigator.vibrate([180,80,180,80,300]);
  if (!state.settings.modeOptions.draw.soundEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.drawAudioContext ||= new AudioContext();
    const ctx = state.drawAudioContext;
    const start = ctx.currentTime;
    [0, .18, .36].forEach((offset, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = index === 2 ? 440 : 660;
      gain.gain.setValueAtTime(.0001, start + offset);
      gain.gain.exponentialRampToValueAtTime(.18, start + offset + .01);
      gain.gain.exponentialRampToValueAtTime(.0001, start + offset + .14);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start + offset); osc.stop(start + offset + .15);
    });
  } catch (error) { recordError(error); }
}

function recordDrawingResult(result, elapsedMs = null, fromReveal = false, timeout = false) {
  const round = state.drawRound;
  if (!round?.currentCard) return;
  cancelAnimationFrame(round.timerRaf);
  const used = fromReveal ? 0 : Math.max(0, elapsedMs ?? (round.durationMs - round.remainingMs));
  const gained = result === "valid" ? drawPointValue(round.currentCard.difficulty) : 0;
  if (result === "valid") {
    round.points += gained;
    round.successes += 1;
    vibrateForResult("valid");
  } else if (!timeout) {
    vibrateForResult("pass");
  }
  round.totalUsedMs += used;
  round.history.push({ card: round.currentCard, result, points: gained, usedMs: used, support: round.support || "skipped" });
  round.attemptIndex += 1;
  updateDrawLiveScore();
  window.setTimeout(showNextDrawingPrompt, 280);
}

function finishDrawingRound() {
  const round = state.drawRound;
  if (!round) return;
  cancelAnimationFrame(round.timerRaf);
  el.resultValid.textContent = String(round.points);
  el.resultPassed.textContent = String(round.successes);
  el.resultTotal.textContent = String(round.history.length);
  el.resultValidLabel.textContent = "points";
  el.resultPassedLabel.textContent = "trouvés";
  el.resultTotalLabel.textContent = "dessins";
  el.resultDetails.innerHTML = "";

  round.history.forEach(entry => {
    const row = document.createElement("div");
    row.className = `result-row ${entry.result === "valid" ? "valid" : "passed"}`;
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = entry.result === "valid" ? "✓" : "✕";
    const details = document.createElement("div");
    details.className = "details";
    const title = document.createElement("strong");
    title.textContent = entry.card.prompt;
    const small = document.createElement("small");
    const seconds = (entry.usedMs / 1000).toFixed(1).replace(".0", "");
    small.textContent = `${DIFFICULTY_LABELS[entry.card.difficulty]} · ${entry.points} point${entry.points > 1 ? "s" : ""} · ${seconds} s`;
    details.append(title, small);
    const word = document.createElement("span");
    word.className = "result-word";
    word.textContent = entry.result === "valid" ? "TROUVÉ" : "PASSÉ";
    row.append(status, details, word);
    el.resultDetails.append(row);
  });

  state.drawRound = null;
  showScreen(el.resultsScreen);
  releaseWakeLock();
}

function resetResultLabels() {
  el.resultValidLabel.textContent = "validées";
  el.resultPassedLabel.textContent = "passées";
  el.resultTotalLabel.textContent = "jouées";
}

function resizeDrawingCanvas(clear = false) {
  const canvas = el.drawingCanvas;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const round = state.drawRound;
  if (round) {
    round.canvasWidth = rect.width;
    round.canvasHeight = rect.height;
    if (clear) {
      round.strokes = [];
      round.undoActions = [];
    }
  }
  redrawDrawingCanvas();
}

function redrawDrawingCanvas() {
  const canvas = el.drawingCanvas;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,rect.width,rect.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0,0,rect.width,rect.height);
  const strokes = state.drawRound?.strokes || [];
  strokes.forEach(stroke => drawStroke(ctx, stroke));
}

function drawStroke(ctx, stroke) {
  if (!stroke.points.length) return;
  ctx.save();
  ctx.strokeStyle = stroke.eraser ? "#ffffff" : stroke.color;
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (stroke.points.length === 1) {
    const p = stroke.points[0];
    ctx.beginPath(); ctx.arc(p.x,p.y,stroke.size/2,0,Math.PI*2); ctx.fill();
  } else {
    ctx.beginPath(); ctx.moveTo(stroke.points[0].x,stroke.points[0].y);
    stroke.points.slice(1).forEach(p => ctx.lineTo(p.x,p.y));
    ctx.stroke();
  }
  ctx.restore();
}

function drawingPoint(event) {
  const rect = el.drawingCanvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function onDrawPointerDown(event) {
  if (!state.drawRound || state.drawRound.support !== "phone") return;
  event.preventDefault();
  const round = state.drawRound;
  round.currentStroke = { color: round.color, size: round.size, eraser: round.eraser, points: [drawingPoint(event)] };
  round.strokes.push(round.currentStroke);
  round.undoActions.push({ type: "stroke", stroke: round.currentStroke });
  state.drawPointer = event.pointerId;
  el.drawingCanvas.setPointerCapture?.(event.pointerId);
  redrawDrawingCanvas();
}

function onDrawPointerMove(event) {
  if (state.drawPointer !== event.pointerId || !state.drawRound?.currentStroke) return;
  event.preventDefault();
  state.drawRound.currentStroke.points.push(drawingPoint(event));
  redrawDrawingCanvas();
}

function onDrawPointerEnd(event) {
  if (state.drawPointer !== event.pointerId) return;
  state.drawPointer = null;
  if (state.drawRound) state.drawRound.currentStroke = null;
}

const DRAW_ERASER_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m7.5 17.5-4-4a2 2 0 0 1 0-2.8l7.2-7.2a2 2 0 0 1 2.8 0l7 7a2 2 0 0 1 0 2.8l-4.2 4.2H7.5Z"/>
    <path d="m10 7 7 7M7.5 17.5h12"/>
  </svg>`;

const DRAW_PENCIL_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/>
    <path d="m13.8 7.2 3 3M5.5 16.5l2 2"/>
  </svg>`;

function updateDrawToolButton() {
  if (!el.drawEraserButton || !el.drawToolIcon) return;
  const erasing = Boolean(state.drawRound?.eraser);
  el.drawEraserButton.classList.toggle("active", erasing);
  el.drawToolIcon.innerHTML = erasing ? DRAW_PENCIL_ICON : DRAW_ERASER_ICON;
  el.drawEraserButton.setAttribute("aria-label", erasing ? "Repasser au crayon" : "Passer à la gomme");
  el.drawEraserButton.title = erasing ? "Crayon" : "Gomme";
}

function chooseDrawColor(color) {
  const round = state.drawRound;
  if (!round) return;
  round.color = color;
  round.eraser = false;
  updateDrawToolButton();
  el.drawColorChoices.querySelectorAll(".draw-color").forEach(button => button.classList.toggle("selected", button.dataset.color === color));
}

function toggleDrawEraser() {
  if (!state.drawRound) return;
  state.drawRound.eraser = !state.drawRound.eraser;
  updateDrawToolButton();
}

function undoDrawingStroke() {
  const round = state.drawRound;
  if (!round?.undoActions.length) return;
  const action = round.undoActions.pop();
  if (action.type === "stroke") {
    const index = round.strokes.lastIndexOf(action.stroke);
    if (index >= 0) round.strokes.splice(index, 1);
  } else if (action.type === "clear") {
    round.strokes = action.strokes;
  }
  redrawDrawingCanvas();
}

function clearDrawingCanvas() {
  const round = state.drawRound;
  if (!round?.strokes.length) return;
  const snapshot = [...round.strokes];
  round.undoActions.push({ type: "clear", strokes: snapshot });
  round.strokes = [];
  redrawDrawingCanvas();
}

function resetDrawHoldButtons() {
  [el.drawFoundButton, el.drawPassButton].forEach(button => {
    if (!button) return;
    button.classList.remove("holding", "hold-complete");
    button.style.removeProperty("--hold-duration");
  });
}

function attachHoldAction(button, action) {
  let timer = 0;
  let activePointer = null;
  let fired = false;
  let pointerInside = false;

  const clearVisualState = () => {
    button.classList.remove("holding", "hold-complete");
    button.style.removeProperty("--hold-duration");
  };

  const cancel = event => {
    window.clearTimeout(timer);
    timer = 0;
    if (event?.pointerId !== undefined && button.hasPointerCapture?.(event.pointerId)) {
      button.releasePointerCapture?.(event.pointerId);
    }
    activePointer = null;
    pointerInside = false;
    fired = false;
    clearVisualState();
  };

  const isInsideButton = event => {
    if (event?.clientX === undefined || event?.clientY === undefined) return true;
    const rect = button.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right &&
      event.clientY >= rect.top && event.clientY <= rect.bottom;
  };

  const begin = event => {
    if (button.disabled || !state.drawRound?.currentCard) return;
    event.preventDefault();
    cancel();
    fired = false;
    pointerInside = true;
    activePointer = event.pointerId ?? "keyboard";
    if (event.pointerId !== undefined) button.setPointerCapture?.(event.pointerId);
    button.style.setProperty("--hold-duration", `${DRAW_HOLD_MS}ms`);
    button.classList.add("holding");
    timer = window.setTimeout(() => {
      if (!pointerInside || activePointer === null) return;
      fired = true;
      button.classList.remove("holding");
      button.classList.add("hold-complete");
      if (state.settings.vibrationEnabled && "vibrate" in navigator) navigator.vibrate(28);
      action();
      activePointer = null;
      pointerInside = false;
      window.setTimeout(clearVisualState, 120);
    }, DRAW_HOLD_MS);
  };

  const move = event => {
    if (activePointer === null) return;
    if (event.pointerId !== undefined && activePointer !== event.pointerId) return;
    pointerInside = isInsideButton(event);
    if (!pointerInside && !fired) cancel(event);
  };

  const end = event => {
    if (activePointer === null) return;
    if (event?.pointerId !== undefined && activePointer !== event.pointerId) return;
    if (!fired || !isInsideButton(event)) cancel(event);
  };

  button.addEventListener("pointerdown", begin);
  button.addEventListener("pointermove", move);
  button.addEventListener("pointerup", end);
  button.addEventListener("pointercancel", cancel);
  button.addEventListener("lostpointercapture", () => {
    if (!fired) cancel();
  });
  button.addEventListener("contextmenu", event => event.preventDefault());
  button.addEventListener("click", event => event.preventDefault());
  button.addEventListener("keydown", event => {
    if ((event.key === " " || event.key === "Enter") && !event.repeat) begin(event);
  });
  button.addEventListener("keyup", event => {
    if (event.key === " " || event.key === "Enter") end(event);
  });
}
