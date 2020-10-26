const URL = (word) => `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
const MENU_ITEM_ID = '1n5tantM3an1ng';

// Async function for fetching data
const fetchSynonyms = async (word) => {
  const response = await fetch(URL(word));
  const json = await response.json();

  return json[0];
};

chrome.runtime.onInstalled.addListener(function () {
  // Create a new context menu entry
  chrome.contextMenus.create({
    title: 'Instant Meaning',
    id: MENU_ITEM_ID,
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === MENU_ITEM_ID) {
    const textSelected = info.selectionText;

    try {
      const result = await fetchSynonyms(textSelected);
      const { meanings } = result;

      const { definition, synonyms } = meanings[0].definitions[0];

      const synonymString = synonyms
        ? synonyms.map((synonym) => synonym)
        : 'No synonyms found!';

      alert(definition + '\n\n' + synonymString);
    } catch (error) {
      alert('An error occurred while finding meaning of this word!');
    }
  }
});
