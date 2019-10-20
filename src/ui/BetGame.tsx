import * as React from 'react';

import { IBet } from '../definition/IBet';

import '../styles/bet.scss';

interface IProps {
  betGame: IBet;
}

const BetGame: React.SFC<IProps> = ({ betGame }) => (
  <div className="bet">
    <span className="sport">{betGame.sport}</span>
    <strong className="peoples">{betGame.peoples}</strong>
    <span className="status">{betGame.status}</span>
  </div>
);

export default BetGame
