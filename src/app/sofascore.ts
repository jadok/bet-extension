const matchData = (datas: string[], people1, people2) => {
  return !!datas.find((match) => (
    match === (people1 + '-' + people2)
    || match === (people1 + ' - ' + people2)
  ))
}

var complete = []

var checkReady = setInterval(() => {
  if (document.readyState === "complete" && document.querySelectorAll('.js-event-list-tournament.tournament').length) {
    clearInterval(checkReady)
    console.log("We're in the injected content script!")
    chrome.storage.sync.get(['bets'], (result) => {
      const data = result.bets
      const tournamentElems:any[any] = document.querySelectorAll('.js-event-list-tournament.tournament');
      tournamentElems.forEach((tournamentElem) => {
        const headerTournament = tournamentElem.querySelector('.cell.js-event-list-tournament-header .cell__section--main').innerText.split('\n');
        const category = headerTournament[0]
        const tournamentName = headerTournament[1]

        const tournamentEventElems = tournamentElem.querySelectorAll('.js-event-list-tournament-events a')
        const games = new Array()
        const standardCategories: any[any] = ['ATP', 'WTA']
        if (standardCategories.includes(category)) {
          tournamentEventElems.forEach((eventElem) => {
            const names = eventElem.querySelectorAll('.cell__section--main.s-tennisCell .cell__content');
            const isMatch = matchData(data, names[0].innerText.trim(), names[1].innerText.trim())
            if (isMatch) {
              games.push({
                name: names[0].innerText.trim() + '-' + names[1].innerText.trim(),
                elem: eventElem.querySelector('.cell__content.event-action__content > span')
              })
            }
          });
          if (games.length) {
            console.log('Add Tournament name: ', tournamentName, ' for ', category);
            games.forEach((game) => {
              game.elem.click();
              console.log('Game with ', game.name, ' has been added');
            })
          }
        }
        complete = [ ...complete, ...games ];
      })
      chrome.runtime.sendMessage({ type: 'result', data: complete}, (response) => {
        console.log('Response', response)
      })
    })

  }
})


