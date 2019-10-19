import { ITournamentEvent } from "../Category";
import { IBettingData } from "../../../definition/IBettingData";

export interface ITournamentManager {
  filter: (tournamentCategory: ITournamentEvent) => boolean;
  exec: (element: Element, data: IBettingData[], res: any[]) => boolean;
}
