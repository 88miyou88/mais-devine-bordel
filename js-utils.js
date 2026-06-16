"use strict";

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
  if (globalThis.crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function modeState(modeId) {
  return state.modes[modeId];
}

function modeConfig(modeId) {
  return MODE_CONFIG[modeId];
}

function cleanIdList(value) {
  return Array.isArray(value) ? [...new Set(value.map(String))] : [];
}

function normalizeDifficulty(value, modeId, card = {}) {
  if (["easy", "medium", "hard"].includes(value)) return value;
  if (modeId === "lyrics") {
    if (card.boxId === "anglais") return "hard";
    if (["comptines", "disney", "tubes-soiree"].includes(card.boxId)) return "easy";
  }
  return "medium";
}

function normalizeLibrary(modeId, raw) {
  const config = modeConfig(modeId);
  if (!raw || raw.modeId !== modeId || !Array.isArray(raw.boxes) || !Array.isArray(raw.cards) || !raw.libraryVersion) {
    throw new Error(`Bibliothèque invalide pour le mode ${config.name}.`);
  }

  const boxes = raw.boxes.map(box => ({
    id: String(box.id),
    name: String(box.name),
    protected: box.id === UNCATEGORIZED_ID || box.protected === true
  }));
  const boxIds = new Set(boxes.map(box => box.id));

  const cards = raw.cards.map(card => {
    const common = {
      id: String(card.id),
      boxId: boxIds.has(String(card.boxId)) ? String(card.boxId) : UNCATEGORIZED_ID,
      active: card.active !== false,
      difficulty: normalizeDifficulty(card.difficulty, modeId, card)
    };

    if (config.type === "lyrics") {
      return {
        ...common,
        prompt: String(card.prompt || ""),
        answer: String(card.answer || ""),
        title: String(card.title || ""),
        source: String(card.source || "")
      };
    }

    if (config.type === "words") {
      return {
        ...common,
        prompt: String(card.prompt || ""),
        forbiddenWords: Array.isArray(card.forbiddenWords)
          ? card.forbiddenWords.map(String).filter(Boolean)
          : []
      };
    }

    return { ...common, prompt: String(card.prompt || "") };
  });

  return {
    schemaVersion: Number(raw.schemaVersion) || 1,
    libraryVersion: String(raw.libraryVersion),
    updatedAt: String(raw.updatedAt || ""),
    modeId,
    modeName: String(raw.modeName || config.name),
    boxes,
    cards
  };
}
