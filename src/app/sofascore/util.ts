import { IBettingData } from '../../definition/IBettingData'

export const matchData = (datas: IBettingData[], people1, people2) => {
  return datas.some((data) => data.bets.some((match) => (
    match.peoples === (people1 + '-' + people2)
    || match.peoples === (people1 + ' - ' + people2)
  )))
}
