import { IBettingData } from "../IBettingData";

export class ABetShow {
  data: NodeListOf<Element>;
  window: any;
  document: any;
  bets: IBettingData[];

  constructor(window: any, document: any) {
    this.window = window;
    this.document = document;
  }

  check = (): boolean => false;

  exec = (): any[] => [];
}
