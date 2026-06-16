"use strict";

function bindEvents() {
  el.durationButtons.forEach(button => {
    button.addEventListener("click", () => updateDurationSelection(Number(button.dataset.seconds)));
  });
  el.customSeconds.addEventListener("input", () => {
    if (el.customSeconds.value !== "") el.durationButtons.forEach(button => button.classList.remove("selected"));
  });

  el.startButton.addEventListener("click", startFlow);
  el.manageCardsButton.addEventListener("click", openManageScreen);
  el.manageBackButton.addEventListener("click", closeManageScreen);
  el.selectAllButton.addEventListener("click", selectEverything);
  el.selectNoneButton.addEventListener("click", selectNothing);

  el.modeEnabledInput.addEventListener("change", () => {
    const modeId = state.activeModeDialogId;
    if (!modeId) return;
    setModeEnabled(modeId, el.modeEnabledInput.checked);
    updateModeDialogCount();
    renderModeSelection();
  });
  el.closeModeDialogButton.addEventListener("click", closeModeConfig);
  el.doneModeDialogButton.addEventListener("click", closeModeConfig);
  el.modeSelectAllBoxesButton.addEventListener("click", () => {
    const modeId = state.activeModeDialogId;
    if (!modeId) return;
    const mode = modeState(modeId);
    mode.selectedBoxIds = mode.boxes.map(box => box.id);
    saveMode(modeId);
    renderModeConfigDialog();
    renderModeSelection();
  });
  el.modeSelectNoBoxesButton.addEventListener("click", () => {
    const modeId = state.activeModeDialogId;
    if (!modeId) return;
    modeState(modeId).selectedBoxIds = [];
    saveMode(modeId);
    renderModeConfigDialog();
    renderModeSelection();
  });
  el.showForbiddenWordsInput.addEventListener("change", () => {
    state.settings.modeOptions.words.showForbiddenWords = el.showForbiddenWordsInput.checked;
    saveGlobalSettings();
  });
  const saveDrawOptions = () => {
    const options = state.settings.modeOptions.draw;
    options.attemptCount = Number(el.drawAttemptCountInput.value) || 3;
    options.durations.easy = Math.min(120, Math.max(10, Number(el.drawEasySecondsInput.value) || 30));
    options.durations.medium = Math.min(120, Math.max(10, Number(el.drawMediumSecondsInput.value) || 45));
    options.durations.hard = Math.min(180, Math.max(10, Number(el.drawHardSecondsInput.value) || 60));
    options.soundEnabled = el.drawSoundEnabledInput.checked;
    saveGlobalSettings();
  };
  [el.drawAttemptCountInput, el.drawEasySecondsInput, el.drawMediumSecondsInput, el.drawHardSecondsInput, el.drawSoundEnabledInput]
    .forEach(input => input.addEventListener("change", saveDrawOptions));

  el.vibrationToggle.addEventListener("change", () => {
    state.settings.vibrationEnabled = el.vibrationToggle.checked;
    saveGlobalSettings();
  });
  el.testValidVibrationButton.addEventListener("click", () => vibrateForResult("valid", true));
  el.testPassVibrationButton.addEventListener("click", () => vibrateForResult("pass", true));

  el.checkLibrariesButton.addEventListener("click", checkLibraries);
  el.updateLibrariesButton.addEventListener("click", updateLibraries);
  el.exportBackupButton.addEventListener("click", exportBackup);
  el.restoreBackupButton.addEventListener("click", () => el.restoreBackupInput.click());
  el.restoreBackupInput.addEventListener("change", restoreBackupFile);
  el.resetLibrariesButton.addEventListener("click", resetLibraries);
  el.diagnosticButton.addEventListener("click", openDiagnostic);

  el.cardSearchInput.addEventListener("input", renderCardList);
  el.manageBoxFilter.addEventListener("change", renderCardList);
  el.addCardButton.addEventListener("click", () => openCardEditor(state.activeManageModeId));
  el.manageBoxesButton.addEventListener("click", openBoxesManager);

  el.cardForm.addEventListener("submit", saveCard);
  el.closeCardDialogButton.addEventListener("click", closeCardEditor);
  el.cancelCardButton.addEventListener("click", closeCardEditor);
  el.closeBoxesDialogButton.addEventListener("click", closeBoxesManager);
  el.doneBoxesButton.addEventListener("click", closeBoxesManager);
  el.addBoxButton.addEventListener("click", addBox);
  el.newBoxNameInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addBox();
    }
  });

  el.flipHomeButton.addEventListener("click", toggleFlipped);
  el.flipGameButton.addEventListener("click", toggleFlipped);
  el.undoButton.addEventListener("click", undoLast);
  el.pauseButton.addEventListener("click", () => togglePause());
  el.resumeOverlayButton.addEventListener("click", () => togglePause(false));
  el.endButton.addEventListener("click", () => finishGame("manual"));
  el.replayButton.addEventListener("click", startFlow);
  el.homeButton.addEventListener("click", goHome);
  el.copyDiagnosticButton.addEventListener("click", copyDiagnostic);

  el.drawRevealPromptButton.addEventListener("click", revealDrawingPrompt);
  el.drawSkipRevealButton.addEventListener("click", skipDrawingBeforeStart);
  el.drawOnPhoneButton.addEventListener("click", () => startDrawingPlay("phone"));
  el.drawOnPaperButton.addEventListener("click", () => startDrawingPlay("paper"));
  attachHoldAction(el.drawFoundButton, () => recordDrawingResult("valid"));
  attachHoldAction(el.drawPassButton, () => recordDrawingResult("passed"));
  el.drawColorChoices.querySelectorAll(".draw-color").forEach(button => button.addEventListener("click", () => chooseDrawColor(button.dataset.color)));
  el.drawBrushSize.addEventListener("input", () => { if (state.drawRound) state.drawRound.size = Number(el.drawBrushSize.value); });
  el.drawEraserButton.addEventListener("click", toggleDrawEraser);
  el.drawUndoButton.addEventListener("click", undoDrawingStroke);
  el.drawClearButton.addEventListener("click", clearDrawingCanvas);
  el.drawingCanvas.addEventListener("pointerdown", onDrawPointerDown);
  el.drawingCanvas.addEventListener("pointermove", onDrawPointerMove);
  el.drawingCanvas.addEventListener("pointerup", onDrawPointerEnd);
  el.drawingCanvas.addEventListener("pointercancel", onDrawPointerEnd);
  window.addEventListener("resize", () => { if (state.drawRound?.support === "phone") resizeDrawingCanvas(false); });

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
  window.addEventListener("appinstalled", () => el.installButton.classList.add("hidden"));

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && state.running && !state.paused) togglePause(true);
    else if (document.visibilityState === "visible" && state.running) requestWakeLock();
  });
  window.addEventListener("error", event => recordError(event.error || event.message));
  window.addEventListener("unhandledrejection", event => recordError(event.reason));
  window.addEventListener("keydown", event => {
    if (!state.running || state.paused) return;
    if (event.key === "ArrowRight") commitSwipe("valid");
    if (event.key === "ArrowLeft") commitSwipe("pass");
    if (event.key === "Backspace") { event.preventDefault(); undoLast(); }
    if (event.key === " ") { event.preventDefault(); togglePause(); }
  });
}

async function init() {
  await loadContent();
  setFlipped(state.flipped);
  bindEvents();
  updateDrawToolButton();
  renderHomeData();
  renderManageScreen();
  renderTime();
  registerServiceWorker();
}

init().catch(error => {
  recordError(error);
  alert(
    "L’application n’a pas pu charger ses données. " +
    "Recharge la page ou ouvre le diagnostic."
  );
});
