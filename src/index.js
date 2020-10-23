chrome.runtime.onInstalled.addListener(function () {
  console.log('Running...');

  // create context menu
  chrome.contextMenus.create(
    {
      title: 'Instant Meaning',
      id: 'fa',
      contexts: ['selection'],
    },
    () => {
      console.log('Executed!!');
    }
  );

  // onclick event listener
  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === 'fa') {
      console.log(info.selectionText);
      const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/hello';

      let res = await fetch(URL);
      let json = await res.json();
      console.log(json);
    }
  });
});
