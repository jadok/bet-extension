const unibetAction = (data, sender, sendResponse) => {
  chrome.storage.sync.set({ bets: data }, () => {
    sendResponse({ response: 'success' })
    chrome.runtime.sendMessage({ type: 'print_bets', bets: data });
  })
}

const sofascoreAction = (data, sender, sendResponse) => {
  chrome.storage.sync.get(['bets'], (result) => {
    chrome.runtime.sendMessage({ type: 'print_bets', games: result.bets });
    sendResponse(result.bets)
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'unibet') {
    unibetAction(message.data, sender, sendResponse)
  }
  else if (message.type === 'sofascore') {
    sofascoreAction(message.data, sender, sendResponse)
  }
  else if (message.type === 'result' && message.data.length) {
    const data = message.data.map((added) => added.name).join('\n-> ');
    alert('-> ' + data);
  }
})
