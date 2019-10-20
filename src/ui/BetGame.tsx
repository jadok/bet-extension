import * as React from 'react'

import { IBet } from '../definition/IBet'

interface IProps {
  betGame: IBet;
}

const BetGame: React.SFC<IProps> = ({ betGame }) => (
  <div>
    <span>{betGame.sport}</span>
    <strong>{betGame.peoples}</strong>
    <span>{betGame.status}</span>
  </div>
);

export default BetGame
