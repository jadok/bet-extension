import { IBet } from './IBet'

/**
 * Total betting data (simple or combined bet).
 */
export interface IBettingData {
  id: string;
  type: string;
  date: string;
  stake: number;
  earn: number;
  status: string;
  bets: IBet[];
}
