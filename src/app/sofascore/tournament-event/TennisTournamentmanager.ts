import { ITournamentManager } from './ITournamentManager'
import { ITournamentEvent } from '../Category'
import { IBettingData } from '../../../definition/IBettingData'

import { matchData } from '../util'

export class TennisTournamentManager implements ITournamentManager {
  filter = (tournamentCategory: ITournamentEvent) => ['ATP', 'WTA'].includes(tournamentCategory.category)

  exec = (tournamentElem: Element, data: IBettingData[], gamesWatched: any[]) => {
    const tournamentEventElems = tournamentElem.querySelectorAll('.js-event-list-tournament-events a')
    let didAddEvent = false;
    tournamentEventElems.forEach((element) => {
      const names = element.querySelectorAll('.cell__section--main.s-tennisCell .cell__content');
      const isMatch = matchData(data, names[0].innerHTML.trim(), names[1].innerHTML.trim());
      if (isMatch) {
        const favoriteElement = element.querySelector('.cell__content.event-action__content > span');
        gamesWatched.push({
          name: names[0].innerHTML.trim() + '-' + names[1].innerHTML.trim(),
          elem: favoriteElement,
          id: Array.from(names).join('/')
        })
      }
      didAddEvent = didAddEvent || isMatch;
    });
    return didAddEvent;
  }
}
