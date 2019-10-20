import * as React from 'react';
import { IBettingData } from '../definition/IBettingData';

import BetGame from './BetGame';
import '../styles/details.scss';

interface IProps {
  bet: IBettingData;
  className?: any;
}

const Bets: React.SFC<IProps> = ({ bet, className }) => (
  <details {...className}>
    <summary>
      <span>[{bet.id}]</span>
      <span>[{bet.type}]</span>
      <span>[{bet.date}]</span>
    </summary>
    <p>
      {JSON.stringify(bet)}
      {/*bet.bets.map((betGame) => <BetGame betGame={betGame} />)*/}
    </p>
  </details>
);

export default Bets;
