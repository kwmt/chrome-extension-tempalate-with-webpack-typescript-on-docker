chrome.action.onClicked.addListener(openDemoTab);

function openDemoTab() {
  chrome.tabs.create({ url: 'index.html' });
}

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (url !== 'https://example.com/#inject-programmatic') return;
  const { options } = await chrome.storage.local.get('options');
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['content_script.js'],
    ...options
  })
  .then(injectionResults => {
    for (const frameResult of injectionResults) {
      const {frameId, result} = frameResult;
      console.log(`Frame ${frameId} result:`, result);
    }
  });
});

chrome.runtime.onMessage.addListener(async ({ name, options }) => {
  if (name === 'inject-programmatic') {
    await chrome.storage.local.set({ options });
    await chrome.tabs.create({
      url: 'https://example.com/#inject-programmatic'
    });
  }
});