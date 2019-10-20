//// UNIBET

import { UnibetExport } from './unibet/';

const exporter = new UnibetExport(window, document);

function start() {
  const data = exporter.exec();
  chrome.storage.sync.set({ bets: data }, () => {
    console.log('DATA STORED')
  })

}

var checkReady = setInterval(() => {
  if (document.readyState === "complete" && exporter.check()) {
    clearInterval(checkReady)
    start()
  }
});
