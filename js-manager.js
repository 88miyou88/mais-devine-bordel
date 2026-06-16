"use strict";

function renderManageModeTabs() {
  el.manageModeTabs.innerHTML = "";

  MODE_ORDER.forEach(modeId => {
    const config = modeConfig(modeId);
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      `mode-tab${state.activeManageModeId === modeId ? " selected" : ""}`;
    button.style.setProperty("--mode-color", config.color);
    button.textContent = config.name;

    button.addEventListener("click", () => {
      state.activeManageModeId = modeId;
      el.cardSearchInput.value = "";
      renderManageScreen();
    });

    el.manageModeTabs.append(button);
  });
}

function renderManageFilters() {
  const mode = modeState(state.activeManageModeId);
  const current = el.manageBoxFilter.value || "all";
  el.manageBoxFilter.innerHTML = "";

  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "Toutes les boîtes";
  el.manageBoxFilter.append(all);

  mode.boxes.forEach(box => {
    const option = document.createElement("option");
    option.value = box.id;
    option.textContent = box.name;
    el.manageBoxFilter.append(option);
  });

  el.manageBoxFilter.value =
    [...el.manageBoxFilter.options].some(option => option.value === current)
      ? current
      : "all";
}

function getFilteredCards() {
  const modeId = state.activeManageModeId;
  const mode = modeState(modeId);
  const search = el.cardSearchInput.value.trim().toLocaleLowerCase("fr");
  const boxId = el.manageBoxFilter.value;

  return mode.cards.filter(card => {
    if (boxId !== "all" && card.boxId !== boxId) return false;
    if (!search) return true;
    const config = modeConfig(modeId);
    let values;
    if (config.type === "lyrics") {
      values = [card.prompt, card.answer, card.title, card.source];
    } else if (config.type === "words") {
      values = [card.prompt, ...(card.forbiddenWords || [])];
    } else {
      values = [card.prompt];
    }
    values.push(DIFFICULTY_LABELS[card.difficulty], getBoxName(modeId, card.boxId));
    return values.join(" ").toLocaleLowerCase("fr").includes(search);
  });
}

function renderManageScreen() {
  renderManageModeTabs();
  renderManageFilters();
  renderCardList();
}

function renderCardList() {
  const modeId = state.activeManageModeId;
  const config = modeConfig(modeId);
  const mode = modeState(modeId);
  const cards = getFilteredCards();
  const activeTotal = mode.cards.filter(card => card.active).length;

  el.cardSearchInput.placeholder = config.type === "lyrics"
    ? "Rechercher une chanson, un artiste…"
    : config.type === "words"
      ? "Rechercher un mot ou un interdit…"
      : config.type === "draw"
        ? "Rechercher une consigne à dessiner…"
        : "Rechercher une consigne de mime…";

  el.manageStats.textContent =
    `${mode.cards.length} carte${mode.cards.length > 1 ? "s" : ""} · ` +
    `${activeTotal} active${activeTotal > 1 ? "s" : ""} · ` +
    `${cards.length} affichée${cards.length > 1 ? "s" : ""}`;
  el.cardList.innerHTML = "";

  if (cards.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = "Aucune carte ne correspond à ce filtre.";
    el.cardList.append(empty);
    return;
  }

  cards.forEach(card => {
    const row = document.createElement("article");
    row.className = `manage-card-row${card.active ? "" : " inactive"}`;
    const main = document.createElement("div");
    main.className = "manage-card-main";
    const title = document.createElement("strong");
    const subtitle = document.createElement("span");

    if (config.type === "lyrics") {
      title.textContent = card.title;
      subtitle.textContent = `${card.prompt} … ${card.answer}`;
    } else if (config.type === "words") {
      title.textContent = card.prompt;
      subtitle.className = "forbidden-preview";
      subtitle.textContent = `Interdits : ${(card.forbiddenWords || []).join(", ") || "aucun"}`;
    } else {
      title.textContent = card.prompt;
      subtitle.textContent = config.name;
    }

    const badges = document.createElement("div");
    badges.className = "card-badges";
    const boxBadge = document.createElement("span");
    boxBadge.className = "box-badge";
    boxBadge.textContent = getBoxName(modeId, card.boxId);
    const difficulty = document.createElement("span");
    difficulty.className = `difficulty-badge ${card.difficulty}`;
    difficulty.textContent = DIFFICULTY_LABELS[card.difficulty];
    badges.append(boxBadge, difficulty);
    main.append(title, subtitle, badges);

    const actions = document.createElement("div");
    actions.className = "manage-card-actions";
    actions.append(
      makeActionButton("Modifier", () => openCardEditor(modeId, card.id)),
      makeActionButton("Dupliquer", () => duplicateCard(modeId, card.id)),
      makeActionButton(card.active ? "Désactiver" : "Activer", () => toggleCard(modeId, card.id)),
      makeActionButton("Supprimer", () => deleteCard(modeId, card.id), true)
    );
    row.append(main, actions);
    el.cardList.append(row);
  });
}

function makeActionButton(text, handler, danger = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `icon-button${danger ? " danger" : ""}`;
  button.textContent = text;
  button.addEventListener("click", handler);
  return button;
}

function openManageScreen() {
  renderManageScreen();
  showScreen(el.manageScreen);
}

function closeManageScreen() {
  renderHomeData();
  showScreen(el.homeScreen);
}

function populateBoxSelect(modeId, selectedId) {
  const mode = modeState(modeId);
  el.cardBoxInput.innerHTML = "";

  mode.boxes.forEach(box => {
    const option = document.createElement("option");
    option.value = box.id;
    option.textContent = box.name;
    el.cardBoxInput.append(option);
  });

  el.cardBoxInput.value =
    mode.boxes.some(box => box.id === selectedId)
      ? selectedId
      : UNCATEGORIZED_ID;
}

function openCardEditor(modeId, cardId = null) {
  const config = modeConfig(modeId);
  const mode = modeState(modeId);
  const card = cardId ? mode.cards.find(item => item.id === cardId) : null;

  el.cardDialogTitle.textContent = `${card ? "Modifier" : "Ajouter"} — ${config.name}`;
  el.cardIdInput.value = card?.id || "";
  el.cardModeInput.value = modeId;
  el.cardActiveInput.checked = card?.active !== false;
  el.cardDifficultyInput.value = normalizeDifficulty(card?.difficulty, modeId, card || {});

  el.lyricsEditorFields.classList.toggle("hidden", config.type !== "lyrics");
  el.mimeEditorFields.classList.toggle("hidden", !["mime", "draw"].includes(config.type));
  el.wordsEditorFields.classList.toggle("hidden", config.type !== "words");

  if (config.type === "lyrics") {
    el.cardPromptInput.value = card?.prompt || "";
    el.cardAnswerInput.value = card?.answer || "";
    el.cardTitleInput.value = card?.title || "";
    el.cardSourceInput.value = card?.source || "";
  } else if (config.type === "words") {
    el.wordPromptInput.value = card?.prompt || "";
    el.forbiddenWordsInput.value = (card?.forbiddenWords || []).join(", ");
  } else {
    el.simplePromptLabel.textContent = config.type === "draw" ? "Consigne à dessiner" : "Consigne à mimer";
    el.mimePromptInput.placeholder = config.type === "draw" ? "Un cactus portant des moufles" : "Un pigeon qui vole une frite";
    el.mimePromptInput.value = card?.prompt || "";
  }

  populateBoxSelect(modeId, card?.boxId || mode.boxes[0]?.id || UNCATEGORIZED_ID);
  el.cardDialog.showModal();
  setTimeout(() => {
    if (config.type === "lyrics") el.cardPromptInput.focus();
    else if (config.type === "words") el.wordPromptInput.focus();
    else el.mimePromptInput.focus();
  }, 50);
}

function closeCardEditor() {
  el.cardDialog.close();
}

function saveCard(event) {
  event.preventDefault();
  const modeId = el.cardModeInput.value;
  const config = modeConfig(modeId);
  const mode = modeState(modeId);
  const common = {
    difficulty: el.cardDifficultyInput.value,
    boxId: el.cardBoxInput.value,
    active: el.cardActiveInput.checked
  };
  let data;

  if (config.type === "lyrics") {
    data = {
      ...common,
      prompt: el.cardPromptInput.value.trim(),
      answer: el.cardAnswerInput.value.trim(),
      title: el.cardTitleInput.value.trim(),
      source: el.cardSourceInput.value.trim()
    };
    if (!data.prompt || !data.answer || !data.title || !data.source) {
      alert("Remplis tous les champs de la carte.");
      return;
    }
  } else if (config.type === "words") {
    data = {
      ...common,
      prompt: el.wordPromptInput.value.trim(),
      forbiddenWords: el.forbiddenWordsInput.value
        .split(/[,;\n]+/)
        .map(word => word.trim())
        .filter(Boolean)
    };
    if (!data.prompt) {
      alert("Écris le mot ou l’expression à faire deviner.");
      return;
    }
  } else {
    data = { ...common, prompt: el.mimePromptInput.value.trim() };
    if (!data.prompt) {
      alert(config.type === "draw" ? "Écris une consigne à dessiner." : "Écris une consigne à mimer.");
      return;
    }
  }

  const id = el.cardIdInput.value;
  if (id) {
    const index = mode.cards.findIndex(card => card.id === id);
    if (index >= 0) mode.cards[index] = { ...mode.cards[index], ...data, locallyModified: true };
  } else {
    mode.cards.unshift({
      id: uniqueId(modeId),
      ...data,
      origin: "personal",
      locallyModified: true
    });
  }

  saveMode(modeId);
  closeCardEditor();
  renderManageScreen();
  renderHomeData();
}

function duplicateCard(modeId, cardId) {
  const mode = modeState(modeId);
  const card = mode.cards.find(item => item.id === cardId);
  if (!card) return;

  const copy = {
    ...clone(card),
    id: uniqueId(modeId),
    origin: "personal",
    locallyModified: true
  };

  if (modeConfig(modeId).type === "lyrics") {
    copy.title = `${card.title} — copie`;
  } else {
    copy.prompt = `${card.prompt} — copie`;
  }

  mode.cards.unshift(copy);
  saveMode(modeId);
  renderManageScreen();
  renderHomeData();
}

function toggleCard(modeId, cardId) {
  const mode = modeState(modeId);
  const card = mode.cards.find(item => item.id === cardId);
  if (!card) return;

  card.active = !card.active;
  card.locallyModified = true;
  saveMode(modeId);
  renderManageScreen();
  renderHomeData();
}

function deleteCard(modeId, cardId) {
  const mode = modeState(modeId);
  const card = mode.cards.find(item => item.id === cardId);
  if (!card) return;

  const label = modeConfig(modeId).type === "lyrics"
    ? card.title
    : card.prompt;

  if (!confirm(`Supprimer définitivement « ${label} » ?`)) return;

  if (
    card.origin === "official" &&
    !mode.libraryMeta.deletedOfficialCardIds.includes(card.id)
  ) {
    mode.libraryMeta.deletedOfficialCardIds.push(card.id);
  }

  mode.cards = mode.cards.filter(item => item.id !== cardId);
  saveMode(modeId);
  renderManageScreen();
  renderHomeData();
}

function openBoxesManager() {
  const config = modeConfig(state.activeManageModeId);
  el.boxesDialogTitle.textContent = `Boîtes — ${config.name}`;
  el.newBoxNameInput.value = "";
  renderBoxesList();
  el.boxesDialog.showModal();
}

function closeBoxesManager() {
  el.boxesDialog.close();
  renderManageScreen();
  renderHomeData();
}

function renderBoxesList() {
  const modeId = state.activeManageModeId;
  const mode = modeState(modeId);
  el.boxesList.innerHTML = "";

  mode.boxes.forEach(box => {
    const row = document.createElement("div");
    row.className = "box-row";

    const main = document.createElement("div");
    main.className = "box-row-main";

    const name = document.createElement("strong");
    name.textContent = box.name;

    const count = document.createElement("small");
    const cardCount = mode.cards.filter(card => card.boxId === box.id).length;
    count.textContent = `${cardCount} carte${cardCount > 1 ? "s" : ""}`;

    main.append(name, count);

    const actions = document.createElement("div");
    actions.className = "box-row-actions";
    actions.append(makeActionButton("Renommer", () => renameBox(modeId, box.id)));

    if (!box.protected && box.id !== UNCATEGORIZED_ID) {
      actions.append(
        makeActionButton("Supprimer", () => deleteBox(modeId, box.id), true)
      );
    }

    row.append(main, actions);
    el.boxesList.append(row);
  });
}

function addBox() {
  const modeId = state.activeManageModeId;
  const mode = modeState(modeId);
  const name = el.newBoxNameInput.value.trim();
  if (!name) return;

  if (
    mode.boxes.some(
      box => box.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr")
    )
  ) {
    alert("Une boîte porte déjà ce nom.");
    return;
  }

  const box = {
    id: uniqueId(`${modeId}-box`),
    name,
    origin: "personal",
    locallyModified: true
  };

  mode.boxes.splice(Math.max(0, mode.boxes.length - 1), 0, box);
  mode.selectedBoxIds.push(box.id);
  el.newBoxNameInput.value = "";

  saveMode(modeId);
  renderBoxesList();
  renderHomeData();
}

function renameBox(modeId, boxId) {
  const mode = modeState(modeId);
  const box = mode.boxes.find(item => item.id === boxId);
  if (!box) return;

  const name = prompt("Nouveau nom de la boîte :", box.name)?.trim();
  if (!name || name === box.name) return;

  if (
    mode.boxes.some(
      item =>
        item.id !== boxId &&
        item.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr")
    )
  ) {
    alert("Une autre boîte porte déjà ce nom.");
    return;
  }

  box.name = name;
  box.locallyModified = true;
  saveMode(modeId);
  renderBoxesList();
  renderHomeData();
}

function deleteBox(modeId, boxId) {
  const mode = modeState(modeId);
  const box = mode.boxes.find(item => item.id === boxId);
  if (!box || box.protected || boxId === UNCATEGORIZED_ID) return;

  const cardCount = mode.cards.filter(card => card.boxId === boxId).length;
  const message = cardCount
    ? `Supprimer « ${box.name} » ? Ses ${cardCount} carte${cardCount > 1 ? "s" : ""} seront déplacées dans « Sans catégorie ».`
    : `Supprimer la boîte « ${box.name} » ?`;

  if (!confirm(message)) return;

  mode.cards.forEach(card => {
    if (card.boxId === boxId) {
      card.boxId = UNCATEGORIZED_ID;
      card.locallyModified = true;
    }
  });

  if (
    box.origin === "official" &&
    !mode.libraryMeta.deletedOfficialBoxIds.includes(box.id)
  ) {
    mode.libraryMeta.deletedOfficialBoxIds.push(box.id);
  }

  mode.boxes = mode.boxes.filter(item => item.id !== boxId);
  mode.selectedBoxIds = mode.selectedBoxIds.filter(id => id !== boxId);

  if (!mode.selectedBoxIds.includes(UNCATEGORIZED_ID)) {
    mode.selectedBoxIds.push(UNCATEGORIZED_ID);
  }

  saveMode(modeId);
  renderBoxesList();
  renderHomeData();
}
