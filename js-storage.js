"use strict";

async function fetchOfficialLibrary(modeId, { forceNetwork = false, allowFallback = true } = {}) {
  const config = modeConfig(modeId);
  const suffix = forceNetwork ? `?v=${Date.now()}` : "";

  try {
    const response = await fetch(`${config.libraryUrl}${suffix}`, {
      cache: forceNetwork ? "no-store" : "default"
    });
    if (!response.ok) throw new Error(`${config.name} indisponible (${response.status}).`);
    return normalizeLibrary(modeId, await response.json());
  } catch (error) {
    recordError(error);
    if (!allowFallback) throw error;

    // Secours hors-ligne : reconstruire la bibliothèque à partir des données
    // déjà enregistrées sur ce téléphone. Aucun catalogue géant n'est dupliqué
    // dans le code JavaScript.
    const storedBoxes = safeParse(localStorage.getItem(config.storage.boxes), null);
    const storedCards = safeParse(localStorage.getItem(config.storage.cards), null);
    const storedMeta = safeParse(localStorage.getItem(config.storage.meta), null);

    if (Array.isArray(storedBoxes) && storedBoxes.length && Array.isArray(storedCards)) {
      return normalizeLibrary(modeId, {
        schemaVersion: 1,
        libraryVersion: String(storedMeta?.installedVersion || "local-offline"),
        updatedAt: "",
        modeId,
        modeName: config.name,
        boxes: storedBoxes.map(({ origin, locallyModified, ...box }) => box),
        cards: storedCards.map(({ origin, locallyModified, ...card }) => card)
      });
    }

    throw error;
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

function sameCardAsOfficial(modeId, localCard, officialCard) {
  const config = modeConfig(modeId);
  if (
    localCard.boxId !== officialCard.boxId ||
    Boolean(localCard.active) !== Boolean(officialCard.active !== false) ||
    localCard.prompt !== officialCard.prompt ||
    normalizeDifficulty(localCard.difficulty, modeId, localCard) !== officialCard.difficulty
  ) return false;

  if (config.type === "lyrics") {
    return localCard.answer === officialCard.answer &&
      localCard.title === officialCard.title &&
      localCard.source === officialCard.source;
  }

  if (config.type === "words") {
    return JSON.stringify(localCard.forbiddenWords || []) ===
      JSON.stringify(officialCard.forbiddenWords || []);
  }

  return true;
}

function freshModeState(modeId, library) {
  return {
    officialLibrary: library,
    boxes: library.boxes.map(officialBoxFrom),
    cards: library.cards.map(officialCardFrom),
    selectedBoxIds: library.boxes.map(box => box.id),
    selectedDifficultyIds: ["easy", "medium", "hard"],
    libraryMeta: {
      installedVersion: library.libraryVersion,
      availableVersion: library.libraryVersion,
      lastCheckedAt: new Date().toISOString(),
      deletedOfficialCardIds: [],
      deletedOfficialBoxIds: []
    }
  };
}

function sanitizeMode(modeId, mode, library) {
  const officialBoxIds = new Set(library.boxes.map(box => box.id));
  const officialCardIds = new Set(library.cards.map(card => card.id));
  const config = modeConfig(modeId);

  mode.boxes = mode.boxes.map(box => ({
    ...box,
    protected: box.id === UNCATEGORIZED_ID || box.protected === true,
    origin: box.origin || (officialBoxIds.has(box.id) ? "official" : "personal"),
    locallyModified: box.locallyModified === true
  }));

  if (!mode.boxes.some(box => box.id === UNCATEGORIZED_ID)) {
    const fallback = library.boxes.find(box => box.id === UNCATEGORIZED_ID) ||
      { id: UNCATEGORIZED_ID, name: "Sans catégorie", protected: true };
    mode.boxes.push(officialBoxFrom(fallback));
  }

  const boxIds = new Set(mode.boxes.map(box => box.id));
  mode.cards = mode.cards.map(card => {
    const normalized = {
      ...card,
      boxId: boxIds.has(card.boxId) ? card.boxId : UNCATEGORIZED_ID,
      active: card.active !== false,
      difficulty: normalizeDifficulty(card.difficulty, modeId, card),
      origin: card.origin || (officialCardIds.has(card.id) ? "official" : "personal"),
      locallyModified: card.locallyModified === true
    };
    if (config.type === "words") {
      normalized.forbiddenWords = Array.isArray(card.forbiddenWords)
        ? card.forbiddenWords.map(String).filter(Boolean)
        : [];
    }
    return normalized;
  });

  mode.selectedBoxIds = cleanIdList(mode.selectedBoxIds).filter(id => boxIds.has(id));
  mode.selectedDifficultyIds = cleanIdList(mode.selectedDifficultyIds)
    .filter(id => ["easy", "medium", "hard"].includes(id));
  if (!mode.selectedDifficultyIds.length) {
    mode.selectedDifficultyIds = ["easy", "medium", "hard"];
  }

  mode.libraryMeta = {
    installedVersion: String(mode.libraryMeta?.installedVersion || library.libraryVersion),
    availableVersion: String(mode.libraryMeta?.availableVersion || library.libraryVersion),
    lastCheckedAt: String(mode.libraryMeta?.lastCheckedAt || ""),
    deletedOfficialCardIds: cleanIdList(mode.libraryMeta?.deletedOfficialCardIds),
    deletedOfficialBoxIds: cleanIdList(mode.libraryMeta?.deletedOfficialBoxIds)
  };
  mode.officialLibrary = library;
}

async function loadMode(modeId, legacySettings) {
  const config = modeConfig(modeId);
  const library = await fetchOfficialLibrary(modeId);
  const storedBoxes = safeParse(localStorage.getItem(config.storage.boxes), null);
  const storedCards = safeParse(localStorage.getItem(config.storage.cards), null);
  const storedMeta = safeParse(localStorage.getItem(config.storage.meta), null);
  const storedSelection = safeParse(localStorage.getItem(config.storage.selection), null);

  if (!Array.isArray(storedBoxes) || !storedBoxes.length || !Array.isArray(storedCards)) {
    state.modes[modeId] = freshModeState(modeId, library);
    return { fresh: true };
  }

  const officialBoxes = new Map(library.boxes.map(box => [box.id, box]));
  const officialCards = new Map(library.cards.map(card => [card.id, card]));

  const boxes = storedBoxes.map(box => {
    const official = officialBoxes.get(box.id);
    if (!official) return {
      ...box,
      origin: box.origin || "personal",
      locallyModified: true,
      protected: box.id === UNCATEGORIZED_ID || box.protected === true
    };
    return {
      ...box,
      origin: "official",
      locallyModified: box.locallyModified === true || !sameBoxAsOfficial(box, official),
      protected: box.id === UNCATEGORIZED_ID || box.protected === true
    };
  });

  const cards = storedCards.map(card => {
    const official = officialCards.get(card.id);
    const normalizedCard = {
      ...card,
      difficulty: normalizeDifficulty(card.difficulty, modeId, card)
    };
    if (!official) return {
      ...normalizedCard,
      active: card.active !== false,
      origin: card.origin || "personal",
      locallyModified: true
    };
    return {
      ...normalizedCard,
      active: card.active !== false,
      origin: "official",
      locallyModified: card.locallyModified === true || !sameCardAsOfficial(modeId, normalizedCard, official)
    };
  });

  const localBoxIds = new Set(boxes.map(box => box.id));
  const localCardIds = new Set(cards.map(card => card.id));
  const selectionObject = storedSelection && !Array.isArray(storedSelection)
    ? storedSelection
    : null;
  const selectedBoxIds = Array.isArray(storedSelection)
    ? storedSelection
    : (
        Array.isArray(selectionObject?.boxIds)
          ? selectionObject.boxIds
          : (modeId === "lyrics" && Array.isArray(legacySettings?.selectedBoxIds)
              ? legacySettings.selectedBoxIds
              : boxes.map(box => box.id))
      );

  state.modes[modeId] = {
    officialLibrary: library,
    boxes,
    cards,
    selectedBoxIds,
    selectedDifficultyIds: Array.isArray(selectionObject?.difficultyIds)
      ? selectionObject.difficultyIds
      : ["easy", "medium", "hard"],
    libraryMeta: {
      installedVersion: storedMeta?.installedVersion || library.libraryVersion,
      availableVersion: library.libraryVersion,
      lastCheckedAt: storedMeta?.lastCheckedAt || "",
      deletedOfficialCardIds: cleanIdList(
        storedMeta?.deletedOfficialCardIds ||
        library.cards.filter(card => !localCardIds.has(card.id)).map(card => card.id)
      ),
      deletedOfficialBoxIds: cleanIdList(
        storedMeta?.deletedOfficialBoxIds ||
        library.boxes.filter(box => box.id !== UNCATEGORIZED_ID && !localBoxIds.has(box.id)).map(box => box.id)
      )
    }
  };

  sanitizeMode(modeId, state.modes[modeId], library);
  return { fresh: false };
}

async function loadContent() {
  const legacySettings = safeParse(localStorage.getItem(LEGACY_SETTINGS_KEY), null);
  const globalSettings = safeParse(localStorage.getItem(GLOBAL_SETTINGS_KEY), null);

  state.settings = {
    selectedModeIds: Array.isArray(globalSettings?.selectedModeIds)
      ? globalSettings.selectedModeIds.filter(id => MODE_ORDER.includes(id))
      : [...MODE_ORDER],
    vibrationEnabled: globalSettings?.vibrationEnabled ?? legacySettings?.vibrationEnabled ?? true,
    lastLibraryCheckAt: String(globalSettings?.lastLibraryCheckAt || ""),
    modeOptions: {
      words: {
        showForbiddenWords: globalSettings?.modeOptions?.words?.showForbiddenWords !== false
      },
      draw: {
        attemptCount: [3,5,7,10].includes(Number(globalSettings?.modeOptions?.draw?.attemptCount))
          ? Number(globalSettings.modeOptions.draw.attemptCount) : 3,
        durations: {
          easy: Math.min(120, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.easy) || 30)),
          medium: Math.min(120, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.medium) || 45)),
          hard: Math.min(180, Math.max(10, Number(globalSettings?.modeOptions?.draw?.durations?.hard) || 60))
        },
        soundEnabled: globalSettings?.modeOptions?.draw?.soundEnabled !== false
      }
    }
  };

  if (state.settings.selectedModeIds.length === 0 && !globalSettings) {
    state.settings.selectedModeIds = MODE_ORDER.filter(id => id !== "draw");
  }

  const freshModes = {};
  for (const modeId of MODE_ORDER) {
    freshModes[modeId] = (await loadMode(modeId, legacySettings)).fresh;
  }

  if (freshModes.words && !state.settings.selectedModeIds.includes("words")) {
    state.settings.selectedModeIds.push("words");
  }

  state.flipped = localStorage.getItem("mdb-flipped") === "1";
  saveAllData();
}

function saveMode(modeId) {
  const config = modeConfig(modeId);
  const mode = modeState(modeId);
  localStorage.setItem(config.storage.boxes, JSON.stringify(mode.boxes));
  localStorage.setItem(config.storage.cards, JSON.stringify(mode.cards));
  localStorage.setItem(config.storage.meta, JSON.stringify(mode.libraryMeta));
  localStorage.setItem(config.storage.selection, JSON.stringify({
    boxIds: mode.selectedBoxIds,
    difficultyIds: mode.selectedDifficultyIds
  }));
}

function saveGlobalSettings() {
  localStorage.setItem(GLOBAL_SETTINGS_KEY, JSON.stringify(state.settings));
}

function saveAllData() {
  MODE_ORDER.forEach(saveMode);
  saveGlobalSettings();
}
