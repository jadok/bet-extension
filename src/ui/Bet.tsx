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
      <strong>[{bet.id}]</strong>
      <span>[{bet.type}]</span>
      <span style={{ float: 'right', display: 'inline-block' }}>{(new Date(bet.date)).toDateString()}</span>
    </summary>
    <p>
      {bet.bets.map((betGame) => <BetGame betGame={betGame} />)}
    </p>
  </details>
);

export default Bets;
