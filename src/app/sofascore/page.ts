import { ABetShow } from '../../definition/show/ABetShow';
import { ITournamentEvent } from './Category';
import { ITournamentManager } from './tournament-event/ITournamentManager';
import Tournamentmanagers from './tournament-event';
import { IBettingData } from '../../definition/IBettingData';

export class SofascoreShow extends ABetShow {
  managers: ITournamentManager[] = Tournamentmanagers.map((manager) => new manager());

  check = (): boolean => {
    this.data = this.document.querySelectorAll('.js-event-list-tournament.tournament');
    return this.data.length !== 0;
  };

  getTournamentHeader = (element: Element) : ITournamentEvent => ({
    name: element.querySelector('.cell.js-event-list-tournament-header .cell__section--main .tournament__name').innerHTML.trim(),
    category: element.querySelector('.cell.js-event-list-tournament-header .cell__section--main .tournament__category').innerHTML.trim(),
  });

  execManager = (manager: ITournamentManager, header: ITournamentEvent, element: Element, data: IBettingData[], gamesWatched: any[]) => {
    const isManaging = manager.filter(header);
    if (isManaging) {
      return manager.exec(element, data, gamesWatched);
    }
    return false;
  }

  exec = () => {
    const gamesWatched = []
    this.data.forEach((element) => {
      const header = this.getTournamentHeader(element);
      this.managers.forEach((manager) => {
        this.execManager(manager, header, element, this.bets, gamesWatched)
      })
    })
    return gamesWatched;
  }

}
