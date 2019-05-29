//// UNIBET

function start() {
  var bets = document.querySelectorAll('.cell-content .row');
  var res = new Array();

  function betElementData(betElement) {
    var status = betElement.querySelector('.status').className.replace('status ', '').replace('icon-', '');
    var date = betElement.querySelector('.details .date.line').innerText.split(' ')[0];
    var rating = betElement.querySelector('.price').innerText;
    var peoples = betElement.querySelector('.details .event.line').innerText;
    var betData = {
      status,
      rating,
      peoples,
    };
    if (typeof res[date] === 'undefined') {
      res[date] = new Array();
    }
    res[date][peoples] = betData;
  }

  bets.forEach((betElement) => {
    betElementData(betElement);
  })
  const initDatas: any[] = []
  const flattenDatas: any[] = Object.keys(res).reduce((curr: any[], dateData: string) => curr.concat(Object.keys(res[dateData])), initDatas)
  chrome.storage.sync.set({ bets: flattenDatas }, () => {
    console.log('DATA STORED')
  })

}

var checkReady = setInterval(() => {
  if (document.readyState === "complete" && document.querySelectorAll('.cell-content .row').length) {
    clearInterval(checkReady)
    start()
  }
});