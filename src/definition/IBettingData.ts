import { IBet } from './IBet'

export interface IBettingData {
  id: string;
  type: string;
  date: string;
  stake: number;
  earn: number;
  status: string;
  bets: IBet[];
}
