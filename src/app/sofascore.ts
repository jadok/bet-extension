import { SofascoreShow } from './sofascore/'
import { IBettingData } from '../definition/IBettingData';

const show = new SofascoreShow(window, document);

var checkReady = setInterval(() => {
  if (document.readyState === "complete" && show.check()) {
    clearInterval(checkReady)
    chrome.storage.sync.get(['bets'], (result) => {
      show.bets = result.bets as IBettingData[] || [];
      const complete = show.exec();
      chrome.runtime.sendMessage({ type: 'result', data: complete}, (response) => {
        console.log('Response', response)
      })
    })

  }
})


