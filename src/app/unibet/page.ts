import { currencyToNumber } from '../utils/number';
import { convertFullDashFormat, convertShortDashFormat } from '../utils/date';
import { IBettingData } from '../../definition/IBettingData';
import { ABetPage } from '../../definition/ABetPage';

export class UnibetPage extends ABetPage {
  bettingHeader = (element: Element) => {
    const bettingDate = element.querySelector('.cell-header .datetime .date').innerHTML.trim();
    const bettingTime = element.querySelector('.cell-header .datetime .time').innerHTML.trim();
    return {
      id: element.querySelector('.cell-header .reference').innerHTML.trim().split(' ')[1],
      date: convertFullDashFormat(bettingDate, bettingTime),
      type: element.querySelector('.cell-header .datetime .bettype').innerHTML,
    }
  }

  bettingBets = (element: Element) => {
    let sumOdds = 1;
    const res = Array.from(element.querySelectorAll('.cell-content > .row'))
      .map((betElement) => {
        var status = betElement.querySelector('.status').className.replace('status ', '').replace('icon-', '');
        var date = betElement.querySelector('.details .date.line').innerHTML.trim().split(' ')[0];
        var odd = parseFloat(betElement.querySelector('.price').innerHTML);
        var peoples = betElement.querySelector('.details .event.line').innerHTML.trim().split('v>')[1].trim();
        var sport = betElement.querySelector('.icon-sport').className.split(' ').find((elem) => elem.indexOf('SPORT') !== -1).replace('SPORT_', '').toLowerCase()
        var betData = {
          status,
          odd,
          peoples,
          sport,
          date: convertShortDashFormat(date),
        };
        sumOdds *= odd;
        return betData;
      })
    return {
      bets: res,
      sumOdds,
      nbr_bets: res.length
    };
  }

  bettingFooter = (element: Element) => {
    const bettingStake = currencyToNumber(element.querySelector('.cell-footer .totalstake .value strong').innerHTML);
    const bettingEarn = currencyToNumber(element.querySelector('.cell-footer .totalreturns .value').innerHTML);
    const bettingStatus = element.querySelector('.cell-footer .totalreturns .value').className.includes('pending') ? 'pending' : (bettingEarn === 0 ? 'lose' : 'win');
    return {
      stake: bettingStake,
      earn: bettingEarn,
      status: bettingStatus,
    }
  }

  exec = () : IBettingData[] => {
    return Array.from(this.data).map((betElement: Element) => {
      const bettingHeader = this.bettingHeader(betElement);
      const bettingBets = this.bettingBets(betElement);
      const bettingFooter = this.bettingFooter(betElement);

      return {
        ...bettingHeader,
        ...bettingBets,
        ...bettingFooter
      };
    })
  }
}
