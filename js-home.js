"use strict";

function showScreen(target) {
  el.screens.forEach(screen => screen.classList.toggle("active", screen === target));
}

function getBoxName(modeId, boxId) {
  return modeState(modeId).boxes.find(box => box.id === boxId)?.name || "Sans catégorie";
}

function activeCountForBox(modeId, boxId) {
  return modeState(modeId).cards.filter(card => card.boxId === boxId && card.active).length;
}

function selectedCardsForMode(modeId) {
  if (!state.settings.selectedModeIds.includes(modeId)) return [];
  const mode = modeState(modeId);
  const selectedBoxes = new Set(mode.selectedBoxIds);
  const selectedDifficulties = new Set(mode.selectedDifficultyIds);
  return mode.cards
    .filter(card =>
      card.active &&
      selectedBoxes.has(card.boxId) &&
      selectedDifficulties.has(normalizeDifficulty(card.difficulty, modeId, card))
    )
    .map(card => ({ ...card, modeId }));
}

function getPlayableCards() {
  return MODE_ORDER.flatMap(selectedCardsForMode);
}

function renderHomeData() {
  renderModeSelection();
  renderAdvancedSettings();
  el.vibrationToggle.checked = state.settings.vibrationEnabled;

  const drawOnly = state.settings.selectedModeIds.length === 1 && state.settings.selectedModeIds[0] === "draw";
  el.globalTimerSettings.classList.toggle("hidden", drawOnly);
  el.homeScreen.classList.toggle("draw-only-home", drawOnly);
  const count = getPlayableCards().length;
  el.availableCount.textContent =
    `${count} carte${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`;
  el.startButton.disabled = count === 0;
}

function renderModeSelection() {
  el.modeSelectionList.innerHTML = "";

  MODE_ORDER.forEach(modeId => {
    const config = modeConfig(modeId);
    const selected = state.settings.selectedModeIds.includes(modeId);
    const playableCount = selectedCardsForMode(modeId).length;

    const tile = document.createElement("article");
    tile.className = `mode-app-tile${selected ? " selected" : ""}`;
    tile.style.setProperty("--mode-color", config.color);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "mode-tile-check";
    checkbox.checked = selected;
    checkbox.setAttribute("aria-label", `Inclure ${config.name}`);
    checkbox.addEventListener("click", event => event.stopPropagation());
    checkbox.addEventListener("change", () => {
      setModeEnabled(modeId, checkbox.checked);
      renderHomeData();
    });

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "mode-tile-open";
    openButton.setAttribute("aria-label", `Configurer le mode ${config.name}`);
    openButton.addEventListener("click", () => openModeConfig(modeId));

    const icon = document.createElement("div");
    icon.className = "mode-tile-icon";
    icon.innerHTML = MODE_ICONS[config.icon] || "";

    const text = document.createElement("div");
    text.className = "mode-tile-text";
    const name = document.createElement("strong");
    name.textContent = config.name;
    const description = document.createElement("small");
    description.textContent = config.description;
    text.append(name, description);

    const footer = document.createElement("div");
    footer.className = "mode-tile-footer";
    const count = document.createElement("span");
    count.className = "mode-tile-count";
    count.textContent = `${playableCount} carte${playableCount > 1 ? "s" : ""}`;
    const arrow = document.createElement("span");
    arrow.className = "mode-tile-chevron";
    arrow.textContent = "Configurer ›";
    footer.append(count, arrow);

    openButton.append(icon, text, footer);
    tile.append(checkbox, openButton);
    el.modeSelectionList.append(tile);
  });
}

function setModeEnabled(modeId, enabled) {
  if (enabled) {
    if (modeId === "draw") {
      state.settings.selectedModeIds = ["draw"];
    } else {
      state.settings.selectedModeIds = state.settings.selectedModeIds.filter(id => id !== "draw");
      if (!state.settings.selectedModeIds.includes(modeId)) state.settings.selectedModeIds.push(modeId);
    }
  } else {
    state.settings.selectedModeIds = state.settings.selectedModeIds.filter(id => id !== modeId);
  }
  saveGlobalSettings();
}

function openModeConfig(modeId) {
  state.activeModeDialogId = modeId;
  renderModeConfigDialog();
  el.modeConfigDialog.showModal();
}

function closeModeConfig() {
  el.modeConfigDialog.close();
  state.activeModeDialogId = null;
  renderHomeData();
}

function updateModeDialogCount() {
  const modeId = state.activeModeDialogId;
  if (!modeId) return;
  const count = selectedCardsForMode(modeId).length;
  el.modeDialogCount.textContent = `${count} carte${count > 1 ? "s" : ""} sélectionnée${count > 1 ? "s" : ""}`;
}

function renderModeConfigDialog() {
  const modeId = state.activeModeDialogId;
  if (!modeId) return;
  const config = modeConfig(modeId);
  const mode = modeState(modeId);

  el.modeConfigDialog.style.setProperty("--mode-color", config.color);
  el.modeDialogIcon.innerHTML = MODE_ICONS[config.icon] || "";
  el.modeDialogTitle.textContent = config.name;
  el.modeDialogDescription.textContent = config.description;
  el.modeEnabledInput.checked = state.settings.selectedModeIds.includes(modeId);

  el.modeRulesList.innerHTML = "";
  config.rules.forEach(rule => {
    const item = document.createElement("li");
    item.textContent = rule;
    el.modeRulesList.append(item);
  });

  el.modeDifficultyChoices.innerHTML = "";
  ["easy", "medium", "hard"].forEach(difficulty => {
    const label = document.createElement("label");
    label.className = "difficulty-choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = mode.selectedDifficultyIds.includes(difficulty);
    input.addEventListener("change", () => {
      if (input.checked) {
        if (!mode.selectedDifficultyIds.includes(difficulty)) mode.selectedDifficultyIds.push(difficulty);
      } else {
        mode.selectedDifficultyIds = mode.selectedDifficultyIds.filter(id => id !== difficulty);
      }
      saveMode(modeId);
      updateModeDialogCount();
      renderModeSelection();
    });
    const span = document.createElement("span");
    span.textContent = DIFFICULTY_LABELS[difficulty];
    label.append(input, span);
    el.modeDifficultyChoices.append(label);
  });

  el.wordsSpecialSettings.classList.toggle("hidden", config.type !== "words");
  el.showForbiddenWordsInput.checked = state.settings.modeOptions.words.showForbiddenWords;

  el.drawSpecialSettings.classList.toggle("hidden", config.type !== "draw");
  const drawOptions = state.settings.modeOptions.draw;
  el.drawAttemptCountInput.value = String(drawOptions.attemptCount);
  el.drawEasySecondsInput.value = String(drawOptions.durations.easy);
  el.drawMediumSecondsInput.value = String(drawOptions.durations.medium);
  el.drawHardSecondsInput.value = String(drawOptions.durations.hard);
  el.drawSoundEnabledInput.checked = drawOptions.soundEnabled;

  el.modeBoxChoices.innerHTML = "";
  mode.boxes.forEach(box => {
    const label = document.createElement("label");
    label.className = "mode-dialog-box-choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = mode.selectedBoxIds.includes(box.id);
    input.addEventListener("change", () => {
      if (input.checked) {
        if (!mode.selectedBoxIds.includes(box.id)) mode.selectedBoxIds.push(box.id);
      } else {
        mode.selectedBoxIds = mode.selectedBoxIds.filter(id => id !== box.id);
      }
      saveMode(modeId);
      updateModeDialogCount();
      renderModeSelection();
    });
    const name = document.createElement("span");
    name.textContent = box.name;
    const count = document.createElement("small");
    count.textContent = activeCountForBox(modeId, box.id);
    label.append(input, name, count);
    el.modeBoxChoices.append(label);
  });

  updateModeDialogCount();
}

function selectEverything() {
  state.settings.selectedModeIds = [...MODE_ORDER];
  MODE_ORDER.forEach(modeId => {
    const mode = modeState(modeId);
    mode.selectedBoxIds = mode.boxes.map(box => box.id);
    mode.selectedDifficultyIds = ["easy", "medium", "hard"];
  });
  saveAllData();
  renderHomeData();
}

function selectNothing() {
  state.settings.selectedModeIds = [];
  saveGlobalSettings();
  renderHomeData();
}

function formatDate(value) {
  if (!value) return "Jamais";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Jamais";

  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function hasLibraryUpdate() {
  return MODE_ORDER.some(modeId => {
    const meta = modeState(modeId).libraryMeta;
    return meta.installedVersion !== meta.availableVersion;
  });
}

function renderAdvancedSettings(message = "") {
  el.libraryVersionList.innerHTML = "";

  MODE_ORDER.forEach(modeId => {
    const config = modeConfig(modeId);
    const meta = modeState(modeId).libraryMeta;

    const row = document.createElement("div");
    row.className = "library-version-row";
    row.style.setProperty("--mode-color", config.color);

    const name = document.createElement("strong");
    name.textContent = config.name;

    const installed = document.createElement("span");
    installed.innerHTML =
      `Installée<br><code>${meta.installedVersion || "Inconnue"}</code>`;

    const available = document.createElement("span");
    available.innerHTML =
      `Disponible<br><code>${meta.availableVersion || "Inconnue"}</code>`;

    row.append(name, installed, available);
    el.libraryVersionList.append(row);
  });

  el.libraryLastChecked.textContent =
    `Dernière vérification : ${formatDate(state.settings.lastLibraryCheckAt)}`;

  const updateAvailable = hasLibraryUpdate();
  el.updateLibrariesButton.disabled = !updateAvailable;
  el.libraryStatusMessage.className = "library-status-message";

  if (message) {
    el.libraryStatusMessage.textContent = message;
    return;
  }

  if (updateAvailable) {
    el.libraryStatusMessage.classList.add("update-available");
    el.libraryStatusMessage.textContent =
      "Une ou plusieurs bibliothèques peuvent être mises à jour.";
  } else {
    el.libraryStatusMessage.classList.add("up-to-date");
    el.libraryStatusMessage.textContent =
      "Toutes les bibliothèques officielles sont à jour.";
  }
}
