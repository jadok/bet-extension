const unibetAction = (data, sender, sendResponse) => {
  console.log('Bet added: ', data.length)
  chrome.storage.sync.set({ bets: data }, () => {
    console.log('DATA STORED')
    sendResponse({ response: 'success' })
  })
}

const sofascoreAction = (data, sender, sendResponse) => {
  chrome.storage.sync.get(['bets'], (result) => {
    console.log('get data', result)
    sendResponse(result.bets)
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background got a message!", message)
  if (message.type === 'unibet') {
    unibetAction(message.data, sender, sendResponse)
  }
  else if (message.type === 'sofascore') {
    sofascoreAction(message.data, sender, sendResponse)
  }
  else {
    const data = message.data.map((added) => added.name).join('\n-> ')
    alert('-> ' + data)
  }
})
