(() => {
  "use strict";

  const APP_VERSION = "0.1.2";
  const SWIPE_ANIMATION_MS = 180;

  const DEMO_CARDS = [
    { id: "lyrics-001", prompt: "Libérée, délivrée", answer: "Je ne mentirai plus jamais", title: "Libérée, délivrée", source: "La Reine des Neiges" },
    { id: "lyrics-002", prompt: "Terres brûlées au vent", answer: "Des landes de pierre", title: "Les Lacs du Connemara", source: "Michel Sardou" },
    { id: "lyrics-003", prompt: "Frère Jacques, Frère Jacques", answer: "Dormez-vous ? Dormez-vous ?", title: "Frère Jacques", source: "Comptine" },
    { id: "lyrics-004", prompt: "Je te donne toutes mes différences", answer: "Tous ces défauts qui sont autant de chances", title: "Je te donne", source: "Jean-Jacques Goldman & Michael Jones" },
    { id: "lyrics-005", prompt: "Ce rêve bleu", answer: "Je n’y crois pas, c’est merveilleux", title: "Ce rêve bleu", source: "Aladdin" },
    { id: "lyrics-006", prompt: "J’ai demandé à la lune", answer: "Et le soleil ne le sait pas", title: "J’ai demandé à la lune", source: "Indochine" },
    { id: "lyrics-007", prompt: "Une souris verte", answer: "Qui courait dans l’herbe", title: "Une souris verte", source: "Comptine" },
    { id: "lyrics-008", prompt: "J’irai chercher ton cœur", answer: "Si tu l’emportes ailleurs", title: "Pour que tu m’aimes encore", source: "Céline Dion" },
    { id: "lyrics-009", prompt: "Hakuna Matata", answer: "Quelle phrase magnifique", title: "Hakuna Matata", source: "Le Roi Lion" },
    { id: "lyrics-010", prompt: "Je voue mes nuits à l’assasymphonie", answer: "Aux requiems anatomiques", title: "L’Assasymphonie", source: "Mozart, l’Opéra Rock" },
    { id: "lyrics-011", prompt: "Tatoue-moi sur ta peau", answer: "À l’encre de tes mots", title: "Tatoue-moi", source: "Mozart, l’Opéra Rock" },
    { id: "lyrics-012", prompt: "Aux Champs-Élysées, aux Champs-Élysées", answer: "Au soleil, sous la pluie", title: "Les Champs-Élysées", source: "Joe Dassin" }
  ];

  const el = {
    app: document.querySelector("#app"),
    screens: [...document.querySelectorAll(".screen")],
    homeScreen: document.querySelector("#homeScreen"),
    countdownScreen: document.querySelector("#countdownScreen"),
    gameScreen: document.querySelector("#gameScreen"),
    resultsScreen: document.querySelector("#resultsScreen"),
    startButton: document.querySelector("#startButton"),
    installButton: document.querySelector("#installButton"),
    durationButtons: [...document.querySelectorAll(".duration-btn")],
    customSeconds: document.querySelector("#customSeconds"),
    flipHomeButton: document.querySelector("#flipHomeButton"),
    diagnosticButton: document.querySelector("#diagnosticButton"),
    countdownValue: document.querySelector("#countdownValue"),
    timeDisplay: document.querySelector("#timeDisplay"),
    validScore: document.querySelector("#validScore"),
    passScore: document.querySelector("#passScore"),
    swipeStage: document.querySelector("#swipeStage"),
    gameCard: document.querySelector("#gameCard"),
    swipeBadge: document.querySelector("#swipeBadge"),
    promptText: document.querySelector("#promptText"),
    answerText: document.querySelector("#answerText"),
    songTitle: document.querySelector("#songTitle"),
    songSource: document.querySelector("#songSource"),
    songMeta: document.querySelector(".song-meta"),
    undoButton: document.querySelector("#undoButton"),
    pauseButton: document.querySelector("#pauseButton"),
    flipGameButton: document.querySelector("#flipGameButton"),
    endButton: document.querySelector("#endButton"),
    pauseOverlay: document.querySelector("#pauseOverlay"),
    resumeOverlayButton: document.querySelector("#resumeOverlayButton"),
    resultValid: document.querySelector("#resultValid"),
    resultPassed: document.querySelector("#resultPassed"),
    resultTotal: document.querySelector("#resultTotal"),
    resultDetails: document.querySelector("#resultDetails"),
    replayButton: document.querySelector("#replayButton"),
    homeButton: document.querySelector("#homeButton"),
    diagnosticDialog: document.querySelector("#diagnosticDialog"),
    diagnosticOutput: document.querySelector("#diagnosticOutput"),
    copyDiagnosticButton: document.querySelector("#copyDiagnosticButton")
  };

  const state = {
    selectedSeconds: 60,
    durationMs: 60000,
    remainingMs: 60000,
    deadline: 0,
    rafId: 0,
    countdownTimer: 0,
    running: false,
    paused: false,
    flipped: false,
    queue: [],
    currentCard: null,
    history: [],
    valid: 0,
    passed: 0,
    pointer: null,
    wakeLock: null,
    installPrompt: null,
    lastError: "Aucune"
  };

  function showScreen(target) {
    el.screens.forEach(screen => screen.classList.toggle("active", screen === target));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function refillQueue() {
    const next = shuffle(DEMO_CARDS);
    if (state.currentCard && next.length > 1 && next[0].id === state.currentCard.id) {
      [next[0], next[1]] = [next[1], next[0]];
    }
    state.queue.push(...next);
  }

  function drawNextCard() {
    if (state.queue.length === 0) refillQueue();
    state.currentCard = state.queue.shift();
    renderCard();
  }

  function renderCard() {
    if (!state.currentCard) return;
    el.promptText.textContent = state.currentCard.prompt;
    el.answerText.textContent = state.currentCard.answer;
    el.songTitle.textContent = state.currentCard.title;
    el.songSource.textContent = state.currentCard.source;
    resetCardPosition();
    requestAnimationFrame(fitCardContent);
  }

  function fitCardContent() {
    el.gameCard.classList.remove("card-medium", "card-compact", "card-tiny");

    const promptLength = el.promptText.textContent.trim().length;
    const answerLength = el.answerText.textContent.trim().length;
    const totalLength = promptLength + answerLength;

    if (promptLength > 34 || answerLength > 30 || totalLength > 58) {
      el.gameCard.classList.add("card-medium");
    }
    if (promptLength > 52 || answerLength > 42 || totalLength > 84) {
      el.gameCard.classList.remove("card-medium");
      el.gameCard.classList.add("card-compact");
    }

    requestAnimationFrame(() => {
      const cardRect = el.gameCard.getBoundingClientRect();
      const promptRect = el.promptText.getBoundingClientRect();
      const answerRect = el.answerText.getBoundingClientRect();
      const metaRect = el.songMeta.getBoundingClientRect();

      const contentOverlapsMeta = answerRect.bottom > metaRect.top - 8;
      const contentOverlapsTop = promptRect.top < cardRect.top + 48;
      const cardOverflows = el.gameCard.scrollHeight > el.gameCard.clientHeight + 2;

      if (contentOverlapsMeta || contentOverlapsTop || cardOverflows) {
        el.gameCard.classList.remove("card-medium", "card-compact");
        el.gameCard.classList.add("card-tiny");
      }
    });
  }

  function getSwipeThreshold() {
    return Math.min(150, Math.max(85, window.innerWidth * 0.18));
  }

  function resetCardPosition() {
    el.gameCard.classList.remove("animating", "swiping-valid", "swiping-pass");
    el.gameCard.style.removeProperty("--swipe-tint");
    el.gameCard.style.transform = "";
    el.gameCard.style.opacity = "1";
    el.swipeBadge.textContent = "";
    el.swipeBadge.className = "swipe-badge";
    el.swipeBadge.style.opacity = "0";
  }

  function vibrateForResult(result) {
    if (!("vibrate" in navigator)) return;

    try {
      navigator.vibrate(0);

      if (result === "valid") {
        // Plusieurs petites vibrations, puis une plus marquée.
        navigator.vibrate([35, 45, 35, 45, 120]);
      } else {
        // Une vibration longue et nette pour une carte passée.
        navigator.vibrate(240);
      }
    } catch (error) {
      recordError(error);
    }
  }

  function getRequestedSeconds() {
    const custom = Number.parseInt(el.customSeconds.value, 10);
    if (Number.isFinite(custom)) return Math.min(600, Math.max(10, custom));
    return state.selectedSeconds;
  }

  function updateDurationSelection(seconds) {
    state.selectedSeconds = seconds;
    el.durationButtons.forEach(button => {
      button.classList.toggle("selected", Number(button.dataset.seconds) === seconds);
    });
    el.customSeconds.value = "";
  }

  async function requestGameDisplay() {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen({ navigationUI: "hide" });
      }
    } catch (_) {}

    try {
      if (screen.orientation?.lock) await screen.orientation.lock("landscape");
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
    el.timeDisplay.textContent = String(Math.ceil(state.remainingMs / 1000));
  }

  function updateScores() {
    el.validScore.textContent = String(state.valid);
    el.passScore.textContent = String(state.passed);
    el.undoButton.disabled = state.history.length === 0;
  }

  function togglePause(forcePause) {
    if (!state.running) return;
    const shouldPause = typeof forcePause === "boolean" ? forcePause : !state.paused;

    if (shouldPause === state.paused) return;

    if (shouldPause) {
      state.remainingMs = Math.max(0, state.deadline - performance.now());
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
    el.gameCard.classList.add(result === "valid" ? "swiping-valid" : "swiping-pass");
    el.gameCard.style.setProperty("--swipe-tint", "0.58");

    const direction = result === "valid" ? 1 : -1;
    const displayDirection = state.flipped ? -direction : direction;
    el.gameCard.classList.add("animating");
    el.gameCard.style.transform = `translateX(${displayDirection * window.innerWidth * 1.15}px) rotate(${displayDirection * 10}deg)`;
    el.gameCard.style.opacity = "0";

    window.setTimeout(() => {
      if (!state.running) return;
      drawNextCard();
    }, SWIPE_ANIMATION_MS);
  }

  function undoLast() {
    if (!state.running || state.paused || state.history.length === 0) return;

    const last = state.history.pop();

    if (last.result === "valid") state.valid = Math.max(0, state.valid - 1);
    else state.passed = Math.max(0, state.passed - 1);

    if (state.currentCard) state.queue.unshift(state.currentCard);
    state.currentCard = last.card;
    updateScores();
    renderCard();
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
    el.resultValid.textContent = String(state.valid);
    el.resultPassed.textContent = String(state.passed);
    el.resultTotal.textContent = String(state.history.length);
    el.resultDetails.innerHTML = "";

    if (state.history.length === 0) {
      const empty = document.createElement("p");
      empty.style.padding = "18px";
      empty.style.margin = "0";
      empty.style.color = "var(--muted)";
      empty.textContent = reason === "time" ? "Le temps est écoulé avant la première réponse." : "Aucune carte jouée.";
      el.resultDetails.append(empty);
      return;
    }

    state.history.forEach(entry => {
      const row = document.createElement("div");
      row.className = `result-row ${entry.result === "valid" ? "valid" : "passed"}`;

      const status = document.createElement("span");
      status.className = "status";
      status.textContent = entry.result === "valid" ? "✓" : "✕";

      const details = document.createElement("div");
      details.className = "details";
      const title = document.createElement("strong");
      title.textContent = entry.card.title;
      const source = document.createElement("small");
      source.textContent = entry.card.source;
      details.append(title, source);

      const word = document.createElement("span");
      word.className = "result-word";
      word.textContent = entry.result === "valid" ? "VALIDÉE" : "PASSÉE";

      row.append(status, details, word);
      el.resultDetails.append(row);
    });
  }

  function goHome() {
    state.running = false;
    state.paused = false;
    cancelAnimationFrame(state.rafId);
    clearInterval(state.countdownTimer);
    releaseWakeLock();
    showScreen(el.homeScreen);
  }

  function setFlipped(value) {
    state.flipped = value;
    el.app.classList.toggle("flipped", state.flipped);
    localStorage.setItem("mdb-flipped", state.flipped ? "1" : "0");
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
      moved: false
    };

    el.gameCard.setPointerCapture?.(event.pointerId);
    el.gameCard.classList.remove("animating");
  }

  function onPointerMove(event) {
    if (!state.pointer || event.pointerId !== state.pointer.id || !state.running || state.paused) return;

    const rawDx = event.clientX - state.pointer.startX;
    const dy = event.clientY - state.pointer.startY;
    state.pointer.currentX = event.clientX;

    if (Math.abs(rawDx) > 8 || Math.abs(dy) > 8) state.pointer.moved = true;

    const displayDx = state.flipped ? -rawDx : rawDx;
    const threshold = getSwipeThreshold();
    const progress = Math.min(1, Math.abs(rawDx) / threshold);

    el.gameCard.style.transform = `translateX(${displayDx}px) rotate(${displayDx / 45}deg)`;
    el.gameCard.style.opacity = String(1 - progress * 0.18);

    el.gameCard.classList.remove("swiping-valid", "swiping-pass");
    el.gameCard.style.setProperty("--swipe-tint", String(0.08 + progress * 0.42));

    if (rawDx > 0) {
      el.gameCard.classList.add("swiping-valid");
      el.swipeBadge.textContent = "VALIDÉE";
      el.swipeBadge.className = "swipe-badge valid";
    } else if (rawDx < 0) {
      el.gameCard.classList.add("swiping-pass");
      el.swipeBadge.textContent = "PASSÉE";
      el.swipeBadge.className = "swipe-badge pass";
    }

    el.swipeBadge.style.opacity = String(progress);
  }

  function onPointerEnd(event) {
    if (!state.pointer || event.pointerId !== state.pointer.id) return;

    const rawDx = state.pointer.currentX - state.pointer.startX;
    const threshold = getSwipeThreshold();
    state.pointer = null;

    if (!state.running || state.paused) {
      resetCardPosition();
      return;
    }

    if (rawDx >= threshold) commitSwipe("valid");
    else if (rawDx <= -threshold) commitSwipe("passed");
    else resetCardPosition();
  }

  function recordError(error) {
    state.lastError = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  async function serviceWorkerStatus() {
    if (!("serviceWorker" in navigator)) return "Non pris en charge";
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return "Non enregistré";
      if (registration.active) return "Actif";
      if (registration.waiting) return "En attente";
      if (registration.installing) return "Installation";
      return "Enregistré";
    } catch (error) {
      recordError(error);
      return "Erreur";
    }
  }

  async function buildDiagnostic() {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    const data = [
      `Application : Mais devine, bordel !`,
      `Version : ${APP_VERSION}`,
      `Date : ${new Date().toISOString()}`,
      `Navigateur : ${navigator.userAgent}`,
      `En ligne : ${navigator.onLine ? "Oui" : "Non"}`,
      `Affichage autonome/installé : ${standalone ? "Oui" : "Non"}`,
      `Service worker : ${await serviceWorkerStatus()}`,
      `Orientation : ${screen.orientation?.type || "Inconnue"}`,
      `Fenêtre : ${window.innerWidth} × ${window.innerHeight}`,
      `Densité de pixels : ${window.devicePixelRatio}`,
      `Pointer Events : ${"PointerEvent" in window ? "Oui" : "Non"}`,
      `Vibrations : ${"vibrate" in navigator ? "Prises en charge" : "Non prises en charge"}`,
      `Wake Lock : ${"wakeLock" in navigator ? "Pris en charge" : "Non pris en charge"}`,
      `Plein écran : ${document.fullscreenEnabled ? "Pris en charge" : "Non pris en charge"}`,
      `IndexedDB : ${"indexedDB" in window ? "Pris en charge" : "Non pris en charge"}`,
      `Affichage retourné : ${state.flipped ? "Oui" : "Non"}`,
      `Dernière erreur : ${state.lastError}`
    ];

    return data.join("\n");
  }

  async function openDiagnostic() {
    el.diagnosticOutput.textContent = await buildDiagnostic();
    if (typeof el.diagnosticDialog.showModal === "function") {
      el.diagnosticDialog.showModal();
    } else {
      alert(el.diagnosticOutput.textContent);
    }
  }

  async function copyDiagnostic() {
    const text = el.diagnosticOutput.textContent;
    try {
      await navigator.clipboard.writeText(text);
      el.copyDiagnosticButton.textContent = "Copié !";
      setTimeout(() => { el.copyDiagnosticButton.textContent = "Copier le diagnostic"; }, 1200);
    } catch (error) {
      recordError(error);
      const range = document.createRange();
      range.selectNodeContents(el.diagnosticOutput);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    try {
      await navigator.serviceWorker.register("./sw.js", { scope: "./" });
    } catch (error) {
      recordError(error);
    }
  }

  function bindEvents() {
    el.durationButtons.forEach(button => {
      button.addEventListener("click", () => updateDurationSelection(Number(button.dataset.seconds)));
    });

    el.customSeconds.addEventListener("input", () => {
      if (el.customSeconds.value !== "") {
        el.durationButtons.forEach(button => button.classList.remove("selected"));
      }
    });

    el.startButton.addEventListener("click", startFlow);
    el.flipHomeButton.addEventListener("click", toggleFlipped);
    el.flipGameButton.addEventListener("click", toggleFlipped);
    el.undoButton.addEventListener("click", undoLast);
    el.pauseButton.addEventListener("click", () => togglePause());
    el.resumeOverlayButton.addEventListener("click", () => togglePause(false));
    el.endButton.addEventListener("click", () => finishGame("manual"));
    el.replayButton.addEventListener("click", startFlow);
    el.homeButton.addEventListener("click", goHome);
    el.diagnosticButton.addEventListener("click", openDiagnostic);
    el.copyDiagnosticButton.addEventListener("click", copyDiagnostic);

    el.gameCard.addEventListener("pointerdown", onPointerDown);
    el.gameCard.addEventListener("pointermove", onPointerMove);
    el.gameCard.addEventListener("pointerup", onPointerEnd);
    el.gameCard.addEventListener("pointercancel", onPointerEnd);

    window.addEventListener("beforeinstallprompt", event => {
      event.preventDefault();
      state.installPrompt = event;
      el.installButton.classList.remove("hidden");
    });

    el.installButton.addEventListener("click", async () => {
      if (!state.installPrompt) return;
      state.installPrompt.prompt();
      await state.installPrompt.userChoice;
      state.installPrompt = null;
      el.installButton.classList.add("hidden");
    });

    window.addEventListener("appinstalled", () => {
      el.installButton.classList.add("hidden");
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && state.running && !state.paused) {
        togglePause(true);
      } else if (document.visibilityState === "visible" && state.running) {
        requestWakeLock();
      }
    });

    window.addEventListener("error", event => recordError(event.error || event.message));
    window.addEventListener("unhandledrejection", event => recordError(event.reason));

    window.addEventListener("keydown", event => {
      if (!state.running || state.paused) return;
      if (event.key === "ArrowRight") commitSwipe("valid");
      if (event.key === "ArrowLeft") commitSwipe("passed");
      if (event.key === "Backspace") {
        event.preventDefault();
        undoLast();
      }
      if (event.key === " ") {
        event.preventDefault();
        togglePause();
      }
    });
  }

  function init() {
    setFlipped(localStorage.getItem("mdb-flipped") === "1");
    bindEvents();
    renderTime();
    registerServiceWorker();
  }

  init();
})();
