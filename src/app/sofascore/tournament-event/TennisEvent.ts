import { ITournamentEvent } from "../Category";
import { IBettingData } from "../../../definition/IBettingData";

import { matchData } from '../util'
import { ITournamentManager } from "./ITournamentManager";

const event: ITournamentManager = {
  filter: (tournamentCategory: ITournamentEvent) => ['ATP', 'WTA'].includes(tournamentCategory.category),
  exec: (element: Element, data: IBettingData[], res: any[]) => {
    const names = element.querySelectorAll('.cell__section--main.s-tennisCell .cell__content');
    const isMatch = matchData(data, names[0].innerHTML.trim(), names[1].innerHTML.trim())
    if (isMatch) {
      res.push({
        name: names[0].innerHTML.trim() + '-' + names[1].innerHTML.trim(),
        elem: element.querySelector('.cell__content.event-action__content > span')
      })
    }
    return isMatch;
  },
}

export default event;
