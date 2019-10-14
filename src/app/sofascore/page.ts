import { ABetShow } from '../../definition/show/ABetShow';
import { ITournamentEvent } from './Category';

export class SofascoreShow extends ABetShow {
  check = (): boolean => {
    this.data = this.document.querySelectorAll('.js-event-list-tournament.tournament');
    return this.data.length !== 0;
  };

  getTournamentHeader = (element: Element) : ITournamentEvent => ({
    name: element.querySelector('.cell.js-event-list-tournament-header .cell__section--main .tournament.name').innerHTML.trim(),
    category: element.querySelector('.cell.js-event-list-tournament-header .cell__section--main .tournament.category').innerHTML.trim(),
  });


}
