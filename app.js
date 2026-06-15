(() => {
  "use strict";

  const APP_VERSION = "0.1.4";
  const SWIPE_ANIMATION_MS = 180;
  const LIBRARY_URL = "./data.json";
  const STORAGE_KEYS = {
    boxes: "mdb-lyrics-boxes-v1",
    cards: "mdb-lyrics-cards-v1",
    settings: "mdb-settings-v1",
    libraryMeta: "mdb-library-meta-v1"
  };
  const UNCATEGORIZED_ID = "uncategorized";

  const FALLBACK_LIBRARY = {"schemaVersion":1,"libraryVersion":"2026.06.15-1","updatedAt":"2026-06-15","modeId":"lyrics","modeName":"Deviner les paroles","boxes":[{"id":"disney","name":"Disney"},{"id":"comptines","name":"Comptines"},{"id":"variete-francaise","name":"Variété française"},{"id":"comedies-musicales","name":"Comédies musicales"},{"id":"uncategorized","name":"Sans catégorie","protected":true}],"cards":[{"id":"lyrics-001","boxId":"disney","active":true,"prompt":"Libérée, délivrée","answer":"Je ne mentirai plus jamais","title":"Libérée, délivrée","source":"La Reine des Neiges"},{"id":"lyrics-002","boxId":"variete-francaise","active":true,"prompt":"Terres brûlées au vent","answer":"Des landes de pierre","title":"Les Lacs du Connemara","source":"Michel Sardou"},{"id":"lyrics-003","boxId":"comptines","active":true,"prompt":"Frère Jacques, Frère Jacques","answer":"Dormez-vous ? Dormez-vous ?","title":"Frère Jacques","source":"Comptine"},{"id":"lyrics-004","boxId":"variete-francaise","active":true,"prompt":"Je te donne toutes mes différences","answer":"Tous ces défauts qui sont autant de chances","title":"Je te donne","source":"Jean-Jacques Goldman & Michael Jones"},{"id":"lyrics-005","boxId":"disney","active":true,"prompt":"Ce rêve bleu","answer":"Je n’y crois pas, c’est merveilleux","title":"Ce rêve bleu","source":"Aladdin"},{"id":"lyrics-006","boxId":"variete-francaise","active":true,"prompt":"J’ai demandé à la lune","answer":"Et le soleil ne le sait pas","title":"J’ai demandé à la lune","source":"Indochine"},{"id":"lyrics-007","boxId":"comptines","active":true,"prompt":"Une souris verte","answer":"Qui courait dans l’herbe","title":"Une souris verte","source":"Comptine"},{"id":"lyrics-008","boxId":"variete-francaise","active":true,"prompt":"J’irai chercher ton cœur","answer":"Si tu l’emportes ailleurs","title":"Pour que tu m’aimes encore","source":"Céline Dion"},{"id":"lyrics-009","boxId":"disney","active":true,"prompt":"Hakuna Matata","answer":"Quelle phrase magnifique","title":"Hakuna Matata","source":"Le Roi Lion"},{"id":"lyrics-010","boxId":"comedies-musicales","active":true,"prompt":"Je voue mes nuits à l’assasymphonie","answer":"Aux requiems anatomiques","title":"L’Assasymphonie","source":"Mozart, l’Opéra Rock"},{"id":"lyrics-011","boxId":"comedies-musicales","active":true,"prompt":"Tatoue-moi sur ta peau","answer":"À l’encre de tes mots","title":"Tatoue-moi","source":"Mozart, l’Opéra Rock"},{"id":"lyrics-012","boxId":"variete-francaise","active":true,"prompt":"Aux Champs-Élysées, aux Champs-Élysées","answer":"Au soleil, sous la pluie","title":"Les Champs-Élysées","source":"Joe Dassin"}]};


  const el = {
    app: document.querySelector("#app"),
    screens: [...document.querySelectorAll(".screen")],
    homeScreen: document.querySelector("#homeScreen"),
    manageScreen: document.querySelector("#manageScreen"),
    countdownScreen: document.querySelector("#countdownScreen"),
    gameScreen: document.querySelector("#gameScreen"),
    resultsScreen: document.querySelector("#resultsScreen"),

    startButton: document.querySelector("#startButton"),
    manageCardsButton: document.querySelector("#manageCardsButton"),
    installButton: document.querySelector("#installButton"),
    durationButtons: [...document.querySelectorAll(".duration-btn")],
    customSeconds: document.querySelector("#customSeconds"),
    boxSelectionList: document.querySelector("#boxSelectionList"),
    availableCount: document.querySelector("#availableCount"),
    selectAllBoxesButton: document.querySelector("#selectAllBoxesButton"),
    selectNoBoxesButton: document.querySelector("#selectNoBoxesButton"),
    vibrationToggle: document.querySelector("#vibrationToggle"),
    testValidVibrationButton: document.querySelector("#testValidVibrationButton"),
    testPassVibrationButton: document.querySelector("#testPassVibrationButton"),
    advancedSettingsPanel: document.querySelector("#advancedSettingsPanel"),
    installedLibraryVersion: document.querySelector("#installedLibraryVersion"),
    availableLibraryVersion: document.querySelector("#availableLibraryVersion"),
    libraryLastChecked: document.querySelector("#libraryLastChecked"),
    libraryStatusMessage: document.querySelector("#libraryStatusMessage"),
    checkLibraryButton: document.querySelector("#checkLibraryButton"),
    updateLibraryButton: document.querySelector("#updateLibraryButton"),
    exportBackupButton: document.querySelector("#exportBackupButton"),
    restoreBackupButton: document.querySelector("#restoreBackupButton"),
    restoreBackupInput: document.querySelector("#restoreBackupInput"),
    resetLibraryButton: document.querySelector("#resetLibraryButton"),
    flipHomeButton: document.querySelector("#flipHomeButton"),
    diagnosticButton: document.querySelector("#diagnosticButton"),

    manageBackButton: document.querySelector("#manageBackButton"),
    cardSearchInput: document.querySelector("#cardSearchInput"),
    manageBoxFilter: document.querySelector("#manageBoxFilter"),
    addCardButton: document.querySelector("#addCardButton"),
    manageBoxesButton: document.querySelector("#manageBoxesButton"),
    manageStats: document.querySelector("#manageStats"),
    cardList: document.querySelector("#cardList"),

    countdownValue: document.querySelector("#countdownValue"),
    timeDisplay: document.querySelector("#timeDisplay"),
    validScore: document.querySelector("#validScore"),
    passScore: document.querySelector("#passScore"),
    gameCard: document.querySelector("#gameCard"),
    leftSwipeGuide: document.querySelector("#leftSwipeGuide"),
    rightSwipeGuide: document.querySelector("#rightSwipeGuide"),
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

    cardDialog: document.querySelector("#cardDialog"),
    cardForm: document.querySelector("#cardForm"),
    cardDialogTitle: document.querySelector("#cardDialogTitle"),
    closeCardDialogButton: document.querySelector("#closeCardDialogButton"),
    cancelCardButton: document.querySelector("#cancelCardButton"),
    cardIdInput: document.querySelector("#cardIdInput"),
    cardPromptInput: document.querySelector("#cardPromptInput"),
    cardAnswerInput: document.querySelector("#cardAnswerInput"),
    cardTitleInput: document.querySelector("#cardTitleInput"),
    cardSourceInput: document.querySelector("#cardSourceInput"),
    cardBoxInput: document.querySelector("#cardBoxInput"),
    cardActiveInput: document.querySelector("#cardActiveInput"),

    boxesDialog: document.querySelector("#boxesDialog"),
    closeBoxesDialogButton: document.querySelector("#closeBoxesDialogButton"),
    doneBoxesButton: document.querySelector("#doneBoxesButton"),
    newBoxNameInput: document.querySelector("#newBoxNameInput"),
    addBoxButton: document.querySelector("#addBoxButton"),
    boxesList: document.querySelector("#boxesList"),

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
    lastError: "Aucune",
    boxes: [],
    cards: [],
    officialLibrary: null,
    libraryMeta: {
      installedVersion: "",
      availableVersion: "",
      lastCheckedAt: "",
      deletedOfficialCardIds: [],
      deletedOfficialBoxIds: []
    },
    settings: {
      selectedBoxIds: [],
      vibrationEnabled: true
    }
  };

  function safeParse(value, fallback) {
    if (!value) return fallback;
    try {
      return JSON.parse(value);
    } catch (error) {
      recordError(error);
      return fallback;
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uniqueId(prefix) {
    if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function normalizeLibrary(raw) {
    if (!raw || !Array.isArray(raw.boxes) || !Array.isArray(raw.cards) || !raw.libraryVersion) {
      throw new Error("Le fichier data.json n’a pas un format valide.");
    }

    return {
      schemaVersion: Number(raw.schemaVersion) || 1,
      libraryVersion: String(raw.libraryVersion),
      updatedAt: String(raw.updatedAt || ""),
      modeId: String(raw.modeId || "lyrics"),
      modeName: String(raw.modeName || "Deviner les paroles"),
      boxes: raw.boxes.map(box => ({
        id: String(box.id),
        name: String(box.name),
        protected: box.id === UNCATEGORIZED_ID || box.protected === true
      })),
      cards: raw.cards.map(card => ({
        id: String(card.id),
        boxId: String(card.boxId || UNCATEGORIZED_ID),
        active: card.active !== false,
        prompt: String(card.prompt || ""),
        answer: String(card.answer || ""),
        title: String(card.title || ""),
        source: String(card.source || "")
      }))
    };
  }

  async function fetchOfficialLibrary({ forceNetwork = false, allowFallback = true } = {}) {
    const suffix = forceNetwork ? `?v=${Date.now()}` : "";
    try {
      const response = await fetch(`${LIBRARY_URL}${suffix}`, {
        cache: forceNetwork ? "no-store" : "default"
      });
      if (!response.ok) throw new Error(`Bibliothèque indisponible (${response.status}).`);
      const library = normalizeLibrary(await response.json());
      state.officialLibrary = library;
      return library;
    } catch (error) {
      recordError(error);
      if (!allowFallback) throw error;
      const fallback = normalizeLibrary(FALLBACK_LIBRARY);
      state.officialLibrary = fallback;
      return fallback;
    }
  }

  function officialBoxFrom(box) {
    return {
      ...clone(box),
      origin: "official",
      locallyModified: false,
      protected: box.id === UNCATEGORIZED_ID || box.protected === true
    };
  }

  function officialCardFrom(card) {
    return {
      ...clone(card),
      origin: "official",
      locallyModified: false,
      active: card.active !== false
    };
  }

  function sameBoxAsOfficial(localBox, officialBox) {
    return localBox.name === officialBox.name &&
      Boolean(localBox.protected) === Boolean(officialBox.protected);
  }

  function sameCardAsOfficial(localCard, officialCard) {
    return localCard.boxId === officialCard.boxId &&
      localCard.prompt === officialCard.prompt &&
      localCard.answer === officialCard.answer &&
      localCard.title === officialCard.title &&
      localCard.source === officialCard.source &&
      Boolean(localCard.active) === Boolean(officialCard.active !== false);
  }

  function cleanIdList(value) {
    return Array.isArray(value) ? [...new Set(value.map(String))] : [];
  }

  function migrateLegacyData(storedBoxes, storedCards, storedMeta, library) {
    const officialBoxes = new Map(library.boxes.map(box => [box.id, box]));
    const officialCards = new Map(library.cards.map(card => [card.id, card]));

    state.boxes = storedBoxes.map(box => {
      const official = officialBoxes.get(box.id);
      if (!official) {
        return {
          ...box,
          protected: box.id === UNCATEGORIZED_ID || box.protected === true,
          origin: box.origin || "personal",
          locallyModified: true
        };
      }
      return {
        ...box,
        protected: box.id === UNCATEGORIZED_ID || box.protected === true,
        origin: "official",
        locallyModified: box.locallyModified === true || !sameBoxAsOfficial(box, official)
      };
    });

    state.cards = storedCards.map(card => {
      const official = officialCards.get(card.id);
      if (!official) {
        return {
          ...card,
          active: card.active !== false,
          origin: card.origin || "personal",
          locallyModified: true
        };
      }
      return {
        ...card,
        active: card.active !== false,
        origin: "official",
        locallyModified: card.locallyModified === true || !sameCardAsOfficial(card, official)
      };
    });

    const localBoxIds = new Set(state.boxes.map(box => box.id));
    const localCardIds = new Set(state.cards.map(card => card.id));

    state.libraryMeta = {
      installedVersion: storedMeta?.installedVersion || library.libraryVersion,
      availableVersion: library.libraryVersion,
      lastCheckedAt: storedMeta?.lastCheckedAt || new Date().toISOString(),
      deletedOfficialCardIds: cleanIdList(
        storedMeta?.deletedOfficialCardIds ||
        library.cards.filter(card => !localCardIds.has(card.id)).map(card => card.id)
      ),
      deletedOfficialBoxIds: cleanIdList(
        storedMeta?.deletedOfficialBoxIds ||
        library.boxes
          .filter(box => box.id !== UNCATEGORIZED_ID && !localBoxIds.has(box.id))
          .map(box => box.id)
      )
    };
  }

  function installFreshLibrary(library) {
    state.boxes = library.boxes.map(officialBoxFrom);
    state.cards = library.cards.map(officialCardFrom);
    state.libraryMeta = {
      installedVersion: library.libraryVersion,
      availableVersion: library.libraryVersion,
      lastCheckedAt: new Date().toISOString(),
      deletedOfficialCardIds: [],
      deletedOfficialBoxIds: []
    };
  }

  function sanitizeLoadedContent(library) {
    const officialBoxIds = new Set(library.boxes.map(box => box.id));
    const officialCardIds = new Set(library.cards.map(card => card.id));

    state.boxes = state.boxes.map(box => ({
      ...box,
      protected: box.id === UNCATEGORIZED_ID || box.protected === true,
      origin: box.origin || (officialBoxIds.has(box.id) ? "official" : "personal"),
      locallyModified: box.locallyModified === true
    }));

    if (!state.boxes.some(box => box.id === UNCATEGORIZED_ID)) {
      const officialUncategorized = library.boxes.find(box => box.id === UNCATEGORIZED_ID) ||
        { id: UNCATEGORIZED_ID, name: "Sans catégorie", protected: true };
      state.boxes.push(officialBoxFrom(officialUncategorized));
    }

    const boxIds = new Set(state.boxes.map(box => box.id));
    state.cards = state.cards.map(card => ({
      ...card,
      boxId: boxIds.has(card.boxId) ? card.boxId : UNCATEGORIZED_ID,
      active: card.active !== false,
      origin: card.origin || (officialCardIds.has(card.id) ? "official" : "personal"),
      locallyModified: card.locallyModified === true
    }));

    state.libraryMeta = {
      installedVersion: String(state.libraryMeta?.installedVersion || library.libraryVersion),
      availableVersion: String(library.libraryVersion),
      lastCheckedAt: String(state.libraryMeta?.lastCheckedAt || ""),
      deletedOfficialCardIds: cleanIdList(state.libraryMeta?.deletedOfficialCardIds),
      deletedOfficialBoxIds: cleanIdList(state.libraryMeta?.deletedOfficialBoxIds)
    };
  }

  async function loadContent() {
    const library = await fetchOfficialLibrary();
    const storedBoxes = safeParse(localStorage.getItem(STORAGE_KEYS.boxes), null);
    const storedCards = safeParse(localStorage.getItem(STORAGE_KEYS.cards), null);
    const storedSettings = safeParse(localStorage.getItem(STORAGE_KEYS.settings), null);
    const storedMeta = safeParse(localStorage.getItem(STORAGE_KEYS.libraryMeta), null);

    if (!Array.isArray(storedBoxes) || !storedBoxes.length || !Array.isArray(storedCards)) {
      installFreshLibrary(library);
    } else {
      migrateLegacyData(storedBoxes, storedCards, storedMeta, library);
      sanitizeLoadedContent(library);
    }

    const allIds = state.boxes.map(box => box.id);
    const selected = storedSettings?.selectedBoxIds;
    state.settings = {
      selectedBoxIds: Array.isArray(selected)
        ? selected.filter(id => allIds.includes(id))
        : [...allIds],
      vibrationEnabled: storedSettings?.vibrationEnabled !== false
    };

    if (!storedSettings) state.settings.selectedBoxIds = [...allIds];

    state.flipped = localStorage.getItem("mdb-flipped") === "1";
    saveAllData();
  }

  function saveAllData() {
    localStorage.setItem(STORAGE_KEYS.boxes, JSON.stringify(state.boxes));
    localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(state.cards));
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
    localStorage.setItem(STORAGE_KEYS.libraryMeta, JSON.stringify(state.libraryMeta));
  }


  function showScreen(target) {
    el.screens.forEach(screen => screen.classList.toggle("active", screen === target));
  }

  function getBoxName(boxId) {
    return state.boxes.find(box => box.id === boxId)?.name || "Sans catégorie";
  }

  function activeCountForBox(boxId) {
    return state.cards.filter(card => card.boxId === boxId && card.active).length;
  }

  function getPlayableCards() {
    const selected = new Set(state.settings.selectedBoxIds);
    return state.cards.filter(card => card.active && selected.has(card.boxId));
  }

  function renderHomeData() {
    renderBoxSelection();
    renderAdvancedSettings();
    el.vibrationToggle.checked = state.settings.vibrationEnabled;
    const count = getPlayableCards().length;
    el.availableCount.textContent = `${count} carte${count > 1 ? "s" : ""} disponible${count > 1 ? "s" : ""}`;
    el.startButton.disabled = count === 0;
  }

  function formatCheckedDate(value) {
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

  function renderAdvancedSettings(message = "") {
    const installed = state.libraryMeta.installedVersion || "Inconnue";
    const available = state.libraryMeta.availableVersion ||
      state.officialLibrary?.libraryVersion ||
      "Inconnue";

    el.installedLibraryVersion.textContent = installed;
    el.availableLibraryVersion.textContent = available;
    el.libraryLastChecked.textContent = formatCheckedDate(state.libraryMeta.lastCheckedAt);

    const updateAvailable = Boolean(installed && available && installed !== available);
    el.updateLibraryButton.disabled = !updateAvailable;

    el.libraryStatusMessage.className = "library-status-message";
    if (message) {
      el.libraryStatusMessage.textContent = message;
      return;
    }

    if (updateAvailable) {
      el.libraryStatusMessage.classList.add("update-available");
      el.libraryStatusMessage.textContent =
        `Une nouvelle bibliothèque est disponible : ${available}. Tes modifications locales seront conservées.`;
    } else {
      el.libraryStatusMessage.classList.add("up-to-date");
      el.libraryStatusMessage.textContent = "La bibliothèque officielle est à jour.";
    }
  }

  function renderBoxSelection() {
    el.boxSelectionList.innerHTML = "";

    state.boxes.forEach(box => {
      const label = document.createElement("label");
      label.className = "box-choice";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.settings.selectedBoxIds.includes(box.id);
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          if (!state.settings.selectedBoxIds.includes(box.id)) {
            state.settings.selectedBoxIds.push(box.id);
          }
        } else {
          state.settings.selectedBoxIds = state.settings.selectedBoxIds.filter(id => id !== box.id);
        }
        saveAllData();
        renderHomeData();
      });

      const name = document.createElement("span");
      name.textContent = box.name;

      const count = document.createElement("small");
      count.textContent = activeCountForBox(box.id);

      label.append(checkbox, name, count);
      el.boxSelectionList.append(label);
    });
  }

  function selectAllBoxes() {
    state.settings.selectedBoxIds = state.boxes.map(box => box.id);
    saveAllData();
    renderHomeData();
  }

  function selectNoBoxes() {
    state.settings.selectedBoxIds = [];
    saveAllData();
    renderHomeData();
  }

  function renderManageFilters() {
    const current = el.manageBoxFilter.value || "all";
    el.manageBoxFilter.innerHTML = "";

    const all = document.createElement("option");
    all.value = "all";
    all.textContent = "Toutes les boîtes";
    el.manageBoxFilter.append(all);

    state.boxes.forEach(box => {
      const option = document.createElement("option");
      option.value = box.id;
      option.textContent = box.name;
      el.manageBoxFilter.append(option);
    });

    el.manageBoxFilter.value = [...el.manageBoxFilter.options].some(option => option.value === current)
      ? current
      : "all";
  }

  function getFilteredCards() {
    const search = el.cardSearchInput.value.trim().toLocaleLowerCase("fr");
    const boxId = el.manageBoxFilter.value;

    return state.cards.filter(card => {
      const boxMatches = boxId === "all" || card.boxId === boxId;
      if (!boxMatches) return false;
      if (!search) return true;

      const haystack = [
        card.prompt,
        card.answer,
        card.title,
        card.source,
        getBoxName(card.boxId)
      ].join(" ").toLocaleLowerCase("fr");

      return haystack.includes(search);
    });
  }

  function renderCardList() {
    renderManageFilters();
    const cards = getFilteredCards();
    const activeTotal = state.cards.filter(card => card.active).length;
    el.manageStats.textContent =
      `${state.cards.length} carte${state.cards.length > 1 ? "s" : ""} · ${activeTotal} active${activeTotal > 1 ? "s" : ""} · ${cards.length} affichée${cards.length > 1 ? "s" : ""}`;
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
      title.textContent = card.title;

      const excerpt = document.createElement("span");
      excerpt.textContent = `${card.prompt} … ${card.answer}`;

      const box = document.createElement("span");
      box.className = "box-badge";
      box.textContent = getBoxName(card.boxId);

      main.append(title, excerpt, box);

      const actions = document.createElement("div");
      actions.className = "manage-card-actions";

      const edit = makeActionButton("Modifier", () => openCardEditor(card.id));
      const duplicate = makeActionButton("Dupliquer", () => duplicateCard(card.id));
      const toggle = makeActionButton(card.active ? "Désactiver" : "Activer", () => toggleCard(card.id));
      const remove = makeActionButton("Supprimer", () => deleteCard(card.id), true);

      actions.append(edit, duplicate, toggle, remove);
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
    renderCardList();
    showScreen(el.manageScreen);
  }

  function closeManageScreen() {
    renderHomeData();
    showScreen(el.homeScreen);
  }

  function populateBoxSelect(select, selectedId) {
    select.innerHTML = "";
    state.boxes.forEach(box => {
      const option = document.createElement("option");
      option.value = box.id;
      option.textContent = box.name;
      select.append(option);
    });
    select.value = state.boxes.some(box => box.id === selectedId)
      ? selectedId
      : UNCATEGORIZED_ID;
  }

  function openCardEditor(cardId = null) {
    const card = cardId ? state.cards.find(item => item.id === cardId) : null;

    el.cardDialogTitle.textContent = card ? "Modifier la carte" : "Ajouter une carte";
    el.cardIdInput.value = card?.id || "";
    el.cardPromptInput.value = card?.prompt || "";
    el.cardAnswerInput.value = card?.answer || "";
    el.cardTitleInput.value = card?.title || "";
    el.cardSourceInput.value = card?.source || "";
    populateBoxSelect(el.cardBoxInput, card?.boxId || state.boxes[0]?.id || UNCATEGORIZED_ID);
    el.cardActiveInput.checked = card?.active !== false;

    el.cardDialog.showModal();
    setTimeout(() => el.cardPromptInput.focus(), 50);
  }

  function closeCardEditor() {
    el.cardDialog.close();
  }

  function saveCard(event) {
    event.preventDefault();

    const data = {
      prompt: el.cardPromptInput.value.trim(),
      answer: el.cardAnswerInput.value.trim(),
      title: el.cardTitleInput.value.trim(),
      source: el.cardSourceInput.value.trim(),
      boxId: el.cardBoxInput.value,
      active: el.cardActiveInput.checked
    };

    if (!data.prompt || !data.answer || !data.title || !data.source) {
      alert("Remplis tous les champs de la carte.");
      return;
    }

    const id = el.cardIdInput.value;
    if (id) {
      const index = state.cards.findIndex(card => card.id === id);
      if (index >= 0) {
        state.cards[index] = {
          ...state.cards[index],
          ...data,
          locallyModified: true
        };
      }
    } else {
      state.cards.unshift({
        id: uniqueId("lyrics"),
        ...data,
        origin: "personal",
        locallyModified: true
      });
    }

    saveAllData();
    closeCardEditor();
    renderCardList();
    renderHomeData();
  }

  function duplicateCard(cardId) {
    const card = state.cards.find(item => item.id === cardId);
    if (!card) return;

    state.cards.unshift({
      ...clone(card),
      id: uniqueId("lyrics"),
      title: `${card.title} — copie`,
      origin: "personal",
      locallyModified: true
    });

    saveAllData();
    renderCardList();
    renderHomeData();
  }

  function toggleCard(cardId) {
    const card = state.cards.find(item => item.id === cardId);
    if (!card) return;
    card.active = !card.active;
    card.locallyModified = true;
    saveAllData();
    renderCardList();
    renderHomeData();
  }

  function deleteCard(cardId) {
    const card = state.cards.find(item => item.id === cardId);
    if (!card) return;

    if (!confirm(`Supprimer définitivement « ${card.title} » ?`)) return;

    if (card.origin === "official" && !state.libraryMeta.deletedOfficialCardIds.includes(card.id)) {
      state.libraryMeta.deletedOfficialCardIds.push(card.id);
    }
    state.cards = state.cards.filter(item => item.id !== cardId);
    saveAllData();
    renderCardList();
    renderHomeData();
  }

  function openBoxesManager() {
    renderBoxesList();
    el.newBoxNameInput.value = "";
    el.boxesDialog.showModal();
  }

  function closeBoxesManager() {
    el.boxesDialog.close();
    renderCardList();
    renderHomeData();
  }

  function renderBoxesList() {
    el.boxesList.innerHTML = "";

    state.boxes.forEach(box => {
      const row = document.createElement("div");
      row.className = "box-row";

      const main = document.createElement("div");
      main.className = "box-row-main";

      const name = document.createElement("strong");
      name.textContent = box.name;

      const count = document.createElement("small");
      const cardCount = state.cards.filter(card => card.boxId === box.id).length;
      count.textContent = `${cardCount} carte${cardCount > 1 ? "s" : ""}`;

      main.append(name, count);

      const actions = document.createElement("div");
      actions.className = "box-row-actions";

      const rename = makeActionButton("Renommer", () => renameBox(box.id));
      actions.append(rename);

      if (!box.protected && box.id !== UNCATEGORIZED_ID) {
        const remove = makeActionButton("Supprimer", () => deleteBox(box.id), true);
        actions.append(remove);
      }

      row.append(main, actions);
      el.boxesList.append(row);
    });
  }

  function addBox() {
    const name = el.newBoxNameInput.value.trim();
    if (!name) return;

    if (state.boxes.some(box => box.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr"))) {
      alert("Une boîte porte déjà ce nom.");
      return;
    }

    const box = {
      id: uniqueId("box"),
      name,
      origin: "personal",
      locallyModified: true
    };
    state.boxes.splice(Math.max(0, state.boxes.length - 1), 0, box);
    state.settings.selectedBoxIds.push(box.id);
    el.newBoxNameInput.value = "";
    saveAllData();
    renderBoxesList();
    renderHomeData();
  }

  function renameBox(boxId) {
    const box = state.boxes.find(item => item.id === boxId);
    if (!box) return;

    const name = prompt("Nouveau nom de la boîte :", box.name)?.trim();
    if (!name || name === box.name) return;

    if (state.boxes.some(item => item.id !== boxId && item.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr"))) {
      alert("Une autre boîte porte déjà ce nom.");
      return;
    }

    box.name = name;
    box.locallyModified = true;
    saveAllData();
    renderBoxesList();
    renderHomeData();
  }

  function deleteBox(boxId) {
    const box = state.boxes.find(item => item.id === boxId);
    if (!box || box.protected || boxId === UNCATEGORIZED_ID) return;

    const cardCount = state.cards.filter(card => card.boxId === boxId).length;
    const message = cardCount
      ? `Supprimer « ${box.name} » ? Ses ${cardCount} carte${cardCount > 1 ? "s" : ""} seront déplacées dans « Sans catégorie ».`
      : `Supprimer la boîte « ${box.name} » ?`;

    if (!confirm(message)) return;

    state.cards.forEach(card => {
      if (card.boxId === boxId) {
        card.boxId = UNCATEGORIZED_ID;
        card.locallyModified = true;
      }
    });

    if (box.origin === "official" && !state.libraryMeta.deletedOfficialBoxIds.includes(box.id)) {
      state.libraryMeta.deletedOfficialBoxIds.push(box.id);
    }
    state.boxes = state.boxes.filter(item => item.id !== boxId);
    state.settings.selectedBoxIds = state.settings.selectedBoxIds.filter(id => id !== boxId);
    if (!state.settings.selectedBoxIds.includes(UNCATEGORIZED_ID)) {
      state.settings.selectedBoxIds.push(UNCATEGORIZED_ID);
    }

    saveAllData();
    renderBoxesList();
    renderHomeData();
  }

  async function checkLibraryUpdate() {
    const originalText = el.checkLibraryButton.textContent;
    el.checkLibraryButton.disabled = true;
    el.checkLibraryButton.textContent = "Vérification…";
    renderAdvancedSettings("Connexion à la bibliothèque GitHub…");

    try {
      const library = await fetchOfficialLibrary({ forceNetwork: true, allowFallback: false });
      state.libraryMeta.availableVersion = library.libraryVersion;
      state.libraryMeta.lastCheckedAt = new Date().toISOString();
      saveAllData();
      renderAdvancedSettings();
    } catch (error) {
      el.libraryStatusMessage.className = "library-status-message error";
      el.libraryStatusMessage.textContent =
        "Impossible de vérifier la bibliothèque. Contrôle la connexion Internet puis réessaie.";
    } finally {
      el.checkLibraryButton.disabled = false;
      el.checkLibraryButton.textContent = originalText;
    }
  }

  async function mergeOfficialLibrary() {
    const originalText = el.updateLibraryButton.textContent;
    el.updateLibraryButton.disabled = true;
    el.updateLibraryButton.textContent = "Mise à jour…";

    try {
      const library = await fetchOfficialLibrary({ forceNetwork: true, allowFallback: false });
      const deletedBoxIds = new Set(state.libraryMeta.deletedOfficialBoxIds);
      const deletedCardIds = new Set(state.libraryMeta.deletedOfficialCardIds);
      const localBoxes = new Map(state.boxes.map(box => [box.id, box]));
      const localCards = new Map(state.cards.map(card => [card.id, card]));

      const stats = {
        boxesAdded: 0,
        boxesUpdated: 0,
        cardsAdded: 0,
        cardsUpdated: 0,
        localPreserved: 0,
        deletedPreserved: 0
      };

      library.boxes.forEach(officialBox => {
        if (deletedBoxIds.has(officialBox.id)) {
          stats.deletedPreserved += 1;
          return;
        }

        const existing = localBoxes.get(officialBox.id);
        if (!existing) {
          const created = officialBoxFrom(officialBox);
          state.boxes.splice(Math.max(0, state.boxes.length - 1), 0, created);
          localBoxes.set(created.id, created);
          if (!state.settings.selectedBoxIds.includes(created.id)) {
            state.settings.selectedBoxIds.push(created.id);
          }
          stats.boxesAdded += 1;
        } else if (existing.origin === "official" && !existing.locallyModified) {
          Object.assign(existing, officialBoxFrom(officialBox));
          stats.boxesUpdated += 1;
        } else {
          stats.localPreserved += 1;
        }
      });

      library.cards.forEach(officialCard => {
        if (deletedCardIds.has(officialCard.id) || deletedBoxIds.has(officialCard.boxId)) {
          stats.deletedPreserved += 1;
          return;
        }

        const existing = localCards.get(officialCard.id);
        if (!existing) {
          const created = officialCardFrom(officialCard);
          if (!state.boxes.some(box => box.id === created.boxId)) {
            created.boxId = UNCATEGORIZED_ID;
          }
          state.cards.push(created);
          localCards.set(created.id, created);
          stats.cardsAdded += 1;
        } else if (existing.origin === "official" && !existing.locallyModified) {
          const replacement = officialCardFrom(officialCard);
          if (!state.boxes.some(box => box.id === replacement.boxId)) {
            replacement.boxId = UNCATEGORIZED_ID;
          }
          Object.assign(existing, replacement);
          stats.cardsUpdated += 1;
        } else {
          stats.localPreserved += 1;
        }
      });

      state.libraryMeta.installedVersion = library.libraryVersion;
      state.libraryMeta.availableVersion = library.libraryVersion;
      state.libraryMeta.lastCheckedAt = new Date().toISOString();

      saveAllData();
      renderHomeData();
      renderCardList();

      alert(
        `Bibliothèque mise à jour.\n\n` +
        `${stats.cardsAdded} nouvelle(s) carte(s)\n` +
        `${stats.cardsUpdated} carte(s) officielle(s) actualisée(s)\n` +
        `${stats.boxesAdded} nouvelle(s) boîte(s)\n` +
        `${stats.localPreserved} modification(s) locale(s) conservée(s)`
      );
    } catch (error) {
      el.libraryStatusMessage.className = "library-status-message error";
      el.libraryStatusMessage.textContent =
        "La mise à jour a échoué. Aucune donnée locale n’a été supprimée.";
    } finally {
      el.updateLibraryButton.textContent = originalText;
      renderAdvancedSettings();
    }
  }

  function exportBackup() {
    const backup = {
      backupSchemaVersion: 1,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      boxes: state.boxes,
      cards: state.cards,
      settings: state.settings,
      libraryMeta: state.libraryMeta
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `mdb-sauvegarde-${date}.json`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function validateBackup(data) {
    return data &&
      Number(data.backupSchemaVersion) === 1 &&
      Array.isArray(data.boxes) &&
      Array.isArray(data.cards) &&
      data.settings &&
      data.libraryMeta;
  }

  async function restoreBackupFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const data = JSON.parse(await file.text());
      if (!validateBackup(data)) {
        throw new Error("Ce fichier n’est pas une sauvegarde MDB valide.");
      }

      if (!confirm(
        `Restaurer cette sauvegarde du ${formatCheckedDate(data.exportedAt)} ?\n\n` +
        "Les cartes et réglages actuellement présents sur ce téléphone seront remplacés."
      )) return;

      state.boxes = clone(data.boxes);
      state.cards = clone(data.cards);
      state.settings = clone(data.settings);
      state.libraryMeta = clone(data.libraryMeta);
      sanitizeLoadedContent(state.officialLibrary || normalizeLibrary(FALLBACK_LIBRARY));
      saveAllData();
      renderHomeData();
      renderCardList();
      alert("Sauvegarde restaurée.");
    } catch (error) {
      recordError(error);
      alert(error.message || "Impossible de restaurer cette sauvegarde.");
    }
  }

  async function resetOfficialLibrary() {
    if (!confirm(
      "Réinitialiser la bibliothèque officielle ?\n\n" +
      "Les cartes officielles retrouveront leur version GitHub. " +
      "Tes cartes et boîtes personnelles seront conservées."
    )) return;

    try {
      const library = await fetchOfficialLibrary({ forceNetwork: true, allowFallback: false });
      const personalBoxes = state.boxes.filter(box => box.origin === "personal");
      const personalCards = state.cards.filter(card => card.origin === "personal");
      const officialBoxes = library.boxes.map(officialBoxFrom);

      const boxIds = new Set([...officialBoxes, ...personalBoxes].map(box => box.id));
      personalCards.forEach(card => {
        if (!boxIds.has(card.boxId)) card.boxId = UNCATEGORIZED_ID;
      });

      state.boxes = [...officialBoxes.filter(box => box.id !== UNCATEGORIZED_ID), ...personalBoxes];
      const uncategorized = officialBoxes.find(box => box.id === UNCATEGORIZED_ID);
      if (uncategorized) state.boxes.push(uncategorized);

      state.cards = [
        ...library.cards.map(officialCardFrom),
        ...personalCards
      ];

      state.libraryMeta = {
        installedVersion: library.libraryVersion,
        availableVersion: library.libraryVersion,
        lastCheckedAt: new Date().toISOString(),
        deletedOfficialCardIds: [],
        deletedOfficialBoxIds: []
      };

      const validIds = new Set(state.boxes.map(box => box.id));
      state.settings.selectedBoxIds = state.settings.selectedBoxIds.filter(id => validIds.has(id));
      library.boxes.forEach(box => {
        if (!state.settings.selectedBoxIds.includes(box.id)) {
          state.settings.selectedBoxIds.push(box.id);
        }
      });

      saveAllData();
      renderHomeData();
      renderCardList();
      alert("Bibliothèque officielle réinitialisée. Les contenus personnels ont été conservés.");
    } catch (error) {
      recordError(error);
      alert("La réinitialisation a échoué. Aucune donnée n’a été modifiée.");
    }
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
    const playable = getPlayableCards();
    const next = shuffle(playable);

    if (state.currentCard && next.length > 1 && next[0].id === state.currentCard.id) {
      [next[0], next[1]] = [next[1], next[0]];
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
    return Math.min(105, Math.max(60, window.innerWidth * 0.12));
  }

  function resetCardPosition() {
    el.gameCard.classList.remove("animating", "swiping-valid", "swiping-pass");
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
        navigator.vibrate([45, 45, 45, 45, 45]);
      } else {
        navigator.vibrate(425);
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
    if (getPlayableCards().length === 0) {
      alert("Sélectionne au moins une boîte contenant une carte active.");
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
      empty.textContent = reason === "time"
        ? "Le temps est écoulé avant la première réponse."
        : "Aucune carte jouée.";
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
    renderHomeData();
    showScreen(el.homeScreen);
  }

  function syncSwipeGuides() {
    const leftResult = state.flipped ? "valid" : "pass";
    const rightResult = state.flipped ? "pass" : "valid";

    setGuide(el.leftSwipeGuide, leftResult);
    setGuide(el.rightSwipeGuide, rightResult);
  }

  function setGuide(guide, result) {
    guide.dataset.result = result;
    guide.classList.toggle("guide-valid", result === "valid");
    guide.classList.toggle("guide-pass", result === "pass");
    const word = guide.querySelector(".guide-word");
    word.textContent = result === "valid" ? "VALIDÉE" : "PASSÉE";
  }

  function setFlipped(value) {
    state.flipped = value;
    el.app.classList.toggle("flipped", state.flipped);
    localStorage.setItem("mdb-flipped", state.flipped ? "1" : "0");
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
    if (!state.pointer || event.pointerId !== state.pointer.id || !state.running || state.paused) return;

    const rawDx = event.clientX - state.pointer.startX;
    const dy = event.clientY - state.pointer.startY;
    state.pointer.currentX = event.clientX;
    state.pointer.currentY = event.clientY;

    const horizontalEnough = Math.abs(rawDx) >= Math.abs(dy) * 0.65;
    if (!horizontalEnough && Math.abs(dy) > 28) {
      resetCardPosition();
      return;
    }

    const displayDx = state.flipped ? -rawDx : rawDx;
    const threshold = getSwipeThreshold();
    const progress = Math.min(1, Math.abs(rawDx) / threshold);

    el.gameCard.style.transform = `translateX(${displayDx}px) rotate(${displayDx / 45}deg)`;
    el.gameCard.style.opacity = String(1 - progress * 0.18);
    el.gameCard.classList.remove("swiping-valid", "swiping-pass");
    el.gameCard.style.setProperty("--swipe-tint", String(0.07 + progress * 0.43));

    if (rawDx > 0) {
      el.gameCard.classList.add("swiping-valid");
    } else if (rawDx < 0) {
      el.gameCard.classList.add("swiping-pass");
    }
  }

  function onPointerEnd(event) {
    if (!state.pointer || event.pointerId !== state.pointer.id) return;

    const rawDx = state.pointer.currentX - state.pointer.startX;
    const dy = state.pointer.currentY - state.pointer.startY;
    const threshold = getSwipeThreshold();
    const horizontalEnough = Math.abs(rawDx) >= Math.abs(dy) * 0.65;
    state.pointer = null;

    if (!state.running || state.paused) {
      resetCardPosition();
      return;
    }

    if (horizontalEnough && rawDx >= threshold) commitSwipe("valid");
    else if (horizontalEnough && rawDx <= -threshold) commitSwipe("pass");
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
      "Application : Mais devine, bordel !",
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
      `Vibrations activées : ${state.settings.vibrationEnabled ? "Oui" : "Non"}`,
      `Wake Lock : ${"wakeLock" in navigator ? "Pris en charge" : "Non pris en charge"}`,
      `Plein écran : ${document.fullscreenEnabled ? "Pris en charge" : "Non pris en charge"}`,
      `IndexedDB : ${"indexedDB" in window ? "Pris en charge" : "Non pris en charge"}`,
      `Cartes enregistrées : ${state.cards.length}`,
      `Cartes officielles : ${state.cards.filter(card => card.origin === "official").length}`,
      `Cartes personnelles : ${state.cards.filter(card => card.origin === "personal").length}`,
      `Boîtes enregistrées : ${state.boxes.length}`,
      `Bibliothèque installée : ${state.libraryMeta.installedVersion || "Inconnue"}`,
      `Bibliothèque disponible : ${state.libraryMeta.availableVersion || "Inconnue"}`,
      `Cartes jouables : ${getPlayableCards().length}`,
      `Seuil du swipe : ${Math.round(getSwipeThreshold())} px`,
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
      setTimeout(() => {
        el.copyDiagnosticButton.textContent = "Copier le diagnostic";
      }, 1200);
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
    el.manageCardsButton.addEventListener("click", openManageScreen);
    el.manageBackButton.addEventListener("click", closeManageScreen);
    el.selectAllBoxesButton.addEventListener("click", selectAllBoxes);
    el.selectNoBoxesButton.addEventListener("click", selectNoBoxes);

    el.vibrationToggle.addEventListener("change", () => {
      state.settings.vibrationEnabled = el.vibrationToggle.checked;
      saveAllData();
    });
    el.testValidVibrationButton.addEventListener("click", () => vibrateForResult("valid", true));
    el.testPassVibrationButton.addEventListener("click", () => vibrateForResult("pass", true));

    el.checkLibraryButton.addEventListener("click", checkLibraryUpdate);
    el.updateLibraryButton.addEventListener("click", mergeOfficialLibrary);
    el.exportBackupButton.addEventListener("click", exportBackup);
    el.restoreBackupButton.addEventListener("click", () => el.restoreBackupInput.click());
    el.restoreBackupInput.addEventListener("change", restoreBackupFile);
    el.resetLibraryButton.addEventListener("click", resetOfficialLibrary);

    el.cardSearchInput.addEventListener("input", renderCardList);
    el.manageBoxFilter.addEventListener("change", renderCardList);
    el.addCardButton.addEventListener("click", () => openCardEditor());
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
      if (event.key === "ArrowLeft") commitSwipe("pass");
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

  async function init() {
    await loadContent();
    setFlipped(state.flipped);
    bindEvents();
    renderHomeData();
    renderManageFilters();
    renderTime();
    registerServiceWorker();
  }

  init().catch(error => {
    recordError(error);
    alert("L’application n’a pas pu charger ses données. Recharge la page ou ouvre le diagnostic.");
  });
})();
