"use strict";

async function checkLibraries() {
  const originalText = el.checkLibrariesButton.textContent;
  el.checkLibrariesButton.disabled = true;
  el.checkLibrariesButton.textContent = "Vérification…";
  renderAdvancedSettings("Connexion aux bibliothèques GitHub…");

  let failed = 0;

  for (const modeId of MODE_ORDER) {
    try {
      const library = await fetchOfficialLibrary(modeId, {
        forceNetwork: true,
        allowFallback: false
      });

      const mode = modeState(modeId);
      mode.officialLibrary = library;
      mode.libraryMeta.availableVersion = library.libraryVersion;
      mode.libraryMeta.lastCheckedAt = new Date().toISOString();
      saveMode(modeId);
    } catch {
      failed += 1;
    }
  }

  state.settings.lastLibraryCheckAt = new Date().toISOString();
  saveGlobalSettings();

  el.checkLibrariesButton.disabled = false;
  el.checkLibrariesButton.textContent = originalText;

  if (failed) {
    renderAdvancedSettings(
      `${failed} bibliothèque${failed > 1 ? "s n’ont" : " n’a"} pas pu être vérifiée${failed > 1 ? "s" : ""}.`
    );
    el.libraryStatusMessage.classList.add("error");
  } else {
    renderAdvancedSettings();
  }
}

function mergeModeLibrary(modeId, library) {
  const mode = modeState(modeId);
  const deletedBoxIds = new Set(mode.libraryMeta.deletedOfficialBoxIds);
  const deletedCardIds = new Set(mode.libraryMeta.deletedOfficialCardIds);
  const localBoxes = new Map(mode.boxes.map(box => [box.id, box]));
  const localCards = new Map(mode.cards.map(card => [card.id, card]));

  const stats = {
    boxesAdded: 0,
    boxesUpdated: 0,
    cardsAdded: 0,
    cardsUpdated: 0,
    localPreserved: 0
  };

  library.boxes.forEach(officialBox => {
    if (deletedBoxIds.has(officialBox.id)) return;

    const existing = localBoxes.get(officialBox.id);

    if (!existing) {
      const created = officialBoxFrom(officialBox);
      mode.boxes.splice(Math.max(0, mode.boxes.length - 1), 0, created);
      localBoxes.set(created.id, created);

      if (!mode.selectedBoxIds.includes(created.id)) {
        mode.selectedBoxIds.push(created.id);
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
    if (
      deletedCardIds.has(officialCard.id) ||
      deletedBoxIds.has(officialCard.boxId)
    ) return;

    const existing = localCards.get(officialCard.id);

    if (!existing) {
      const created = officialCardFrom(officialCard);

      if (!mode.boxes.some(box => box.id === created.boxId)) {
        created.boxId = UNCATEGORIZED_ID;
      }

      mode.cards.push(created);
      localCards.set(created.id, created);
      stats.cardsAdded += 1;
    } else if (existing.origin === "official" && !existing.locallyModified) {
      const replacement = officialCardFrom(officialCard);

      if (!mode.boxes.some(box => box.id === replacement.boxId)) {
        replacement.boxId = UNCATEGORIZED_ID;
      }

      Object.assign(existing, replacement);
      stats.cardsUpdated += 1;
    } else {
      stats.localPreserved += 1;
    }
  });

  mode.officialLibrary = library;
  mode.libraryMeta.installedVersion = library.libraryVersion;
  mode.libraryMeta.availableVersion = library.libraryVersion;
  mode.libraryMeta.lastCheckedAt = new Date().toISOString();
  saveMode(modeId);

  return stats;
}

async function updateLibraries() {
  const originalText = el.updateLibrariesButton.textContent;
  el.updateLibrariesButton.disabled = true;
  el.updateLibrariesButton.textContent = "Mise à jour…";

  const totals = {
    cardsAdded: 0,
    cardsUpdated: 0,
    boxesAdded: 0,
    localPreserved: 0,
    failed: 0
  };

  for (const modeId of MODE_ORDER) {
    const mode = modeState(modeId);

    if (
      mode.libraryMeta.installedVersion ===
      mode.libraryMeta.availableVersion
    ) continue;

    try {
      const library = await fetchOfficialLibrary(modeId, {
        forceNetwork: true,
        allowFallback: false
      });

      const stats = mergeModeLibrary(modeId, library);
      totals.cardsAdded += stats.cardsAdded;
      totals.cardsUpdated += stats.cardsUpdated;
      totals.boxesAdded += stats.boxesAdded;
      totals.localPreserved += stats.localPreserved;
    } catch {
      totals.failed += 1;
    }
  }

  state.settings.lastLibraryCheckAt = new Date().toISOString();
  saveGlobalSettings();
  renderHomeData();
  renderManageScreen();
  el.updateLibrariesButton.textContent = originalText;

  alert(
    `Bibliothèques mises à jour.\n\n` +
    `${totals.cardsAdded} nouvelle(s) carte(s)\n` +
    `${totals.cardsUpdated} carte(s) officielle(s) actualisée(s)\n` +
    `${totals.boxesAdded} nouvelle(s) boîte(s)\n` +
    `${totals.localPreserved} modification(s) locale(s) conservée(s)` +
    (totals.failed ? `\n${totals.failed} échec(s)` : "")
  );
}

function exportBackup() {
  const backup = {
    backupSchemaVersion: 3,
    appVersion: APP_VERSION,
    exportedAt: new Date().toISOString(),
    settings: state.settings,
    modes: Object.fromEntries(MODE_ORDER.map(modeId => {
      const mode = modeState(modeId);
      return [modeId, {
        boxes: mode.boxes,
        cards: mode.cards,
        selectedBoxIds: mode.selectedBoxIds,
        selectedDifficultyIds: mode.selectedDifficultyIds,
        libraryMeta: mode.libraryMeta
      }];
    }))
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mdb-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function validBackup(data) {
  if ([2, 3].includes(Number(data?.backupSchemaVersion))) {
    return data.settings && data.modes && Object.values(data.modes).some(mode =>
      Array.isArray(mode?.boxes) && Array.isArray(mode?.cards)
    );
  }
  if (Number(data?.backupSchemaVersion) === 1) {
    return Array.isArray(data.boxes) && Array.isArray(data.cards) && data.settings && data.libraryMeta;
  }
  return false;
}

async function restoreBackupFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  try {
    const data = JSON.parse(await file.text());
    if (!validBackup(data)) throw new Error("Ce fichier n’est pas une sauvegarde MDB valide.");
    if (!confirm(
      `Restaurer cette sauvegarde du ${formatDate(data.exportedAt)} ?\n\n` +
      "Les données des modes présents dans le fichier remplaceront celles de ce téléphone."
    )) return;

    if ([2, 3].includes(Number(data.backupSchemaVersion))) {
      state.settings = {
        ...state.settings,
        ...clone(data.settings),
        modeOptions: {
          words: {
            showForbiddenWords: data.settings?.modeOptions?.words?.showForbiddenWords !== false
          }
        }
      };

      MODE_ORDER.forEach(modeId => {
        const restored = data.modes[modeId];
        if (!restored) return;
        const mode = modeState(modeId);
        mode.boxes = clone(restored.boxes);
        mode.cards = clone(restored.cards);
        mode.selectedBoxIds = clone(restored.selectedBoxIds || []);
        mode.selectedDifficultyIds = clone(restored.selectedDifficultyIds || ["easy", "medium", "hard"]);
        mode.libraryMeta = clone(restored.libraryMeta);
        sanitizeMode(modeId, mode, mode.officialLibrary);
      });
    } else {
      const lyricsMode = modeState("lyrics");
      lyricsMode.boxes = clone(data.boxes);
      lyricsMode.cards = clone(data.cards);
      lyricsMode.selectedBoxIds = clone(data.settings.selectedBoxIds || []);
      lyricsMode.selectedDifficultyIds = ["easy", "medium", "hard"];
      lyricsMode.libraryMeta = clone(data.libraryMeta);
      sanitizeMode("lyrics", lyricsMode, lyricsMode.officialLibrary);
      state.settings.vibrationEnabled = data.settings.vibrationEnabled !== false;
    }

    saveAllData();
    renderHomeData();
    renderManageScreen();
    alert("Sauvegarde restaurée.");
  } catch (error) {
    recordError(error);
    alert(error.message || "Impossible de restaurer cette sauvegarde.");
  }
}

async function resetLibraries() {
  if (!confirm(
    "Réinitialiser toutes les bibliothèques officielles ?\n\n" +
    "Les cartes officielles retrouveront leur version GitHub. " +
    "Les cartes et boîtes personnelles seront conservées."
  )) return;

  const snapshots = {};

  try {
    for (const modeId of MODE_ORDER) {
      snapshots[modeId] = await fetchOfficialLibrary(modeId, {
        forceNetwork: true,
        allowFallback: false
      });
    }

    for (const modeId of MODE_ORDER) {
      const mode = modeState(modeId);
      const library = snapshots[modeId];
      const personalBoxes = mode.boxes.filter(box => box.origin === "personal");
      const personalCards = mode.cards.filter(card => card.origin === "personal");
      const officialBoxes = library.boxes.map(officialBoxFrom);

      const allBoxes = [
        ...officialBoxes.filter(box => box.id !== UNCATEGORIZED_ID),
        ...personalBoxes
      ];

      const uncategorized =
        officialBoxes.find(box => box.id === UNCATEGORIZED_ID);

      if (uncategorized) allBoxes.push(uncategorized);

      const validBoxIds = new Set(allBoxes.map(box => box.id));

      personalCards.forEach(card => {
        if (!validBoxIds.has(card.boxId)) card.boxId = UNCATEGORIZED_ID;
      });

      mode.boxes = allBoxes;
      mode.cards = [
        ...library.cards.map(officialCardFrom),
        ...personalCards
      ];
      mode.officialLibrary = library;
      mode.libraryMeta = {
        installedVersion: library.libraryVersion,
        availableVersion: library.libraryVersion,
        lastCheckedAt: new Date().toISOString(),
        deletedOfficialCardIds: [],
        deletedOfficialBoxIds: []
      };

      mode.selectedBoxIds =
        mode.selectedBoxIds.filter(id => validBoxIds.has(id));

      library.boxes.forEach(box => {
        if (!mode.selectedBoxIds.includes(box.id)) {
          mode.selectedBoxIds.push(box.id);
        }
      });

      saveMode(modeId);
    }

    renderHomeData();
    renderManageScreen();

    alert(
      "Bibliothèques officielles réinitialisées. " +
      "Les contenus personnels ont été conservés."
    );
  } catch (error) {
    recordError(error);
    alert(
      "La réinitialisation a échoué. " +
      "Aucune bibliothèque n’a été remplacée."
    );
  }
}
