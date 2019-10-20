import { ITournamentManager } from './ITournamentManager'
import { ITournamentEvent } from '../Category'
import { IBettingData } from '../../../definition/IBettingData'

import { matchData } from '../util'
import { normalizeAccent } from '../../utils/string'

export class TennisTournamentManager implements ITournamentManager {
  sports = ['tennis'];
  filter = (tournamentCategory: ITournamentEvent) => ['ATP', 'WTA'].includes(tournamentCategory.category)

  exec = (tournamentElem: Element, data: IBettingData[], gamesWatched: any[]) => {
    const tournamentEventElems = tournamentElem.querySelectorAll('.js-event-list-tournament-events a')

    const tennisData = data.reduce((acc: IBettingData[], currentData: IBettingData) => {
      const copyCurrentData = { ...currentData };
      copyCurrentData.bets = currentData.bets.reduce((accBets, currentBet) => {

        if (this.sports.includes(currentBet.sport) && currentBet.status === 'pending') {
          accBets.push(currentBet);
        }
        return accBets;
      }, [])
      if (copyCurrentData.bets.length) {
        acc.push(copyCurrentData);
      }
      return acc;
    }, []);
    let didAddEvent = false;
    tournamentEventElems.forEach((element) => {
      const names = element.querySelectorAll('.cell__section--main.s-tennisCell .cell__content');
      const isMatch = matchData(
        tennisData,
        normalizeAccent(names[0].innerHTML.trim()),
        normalizeAccent(names[1].innerHTML.trim())
      );
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
