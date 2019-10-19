import { IBettingData } from "../IBettingData";

/**
 * From betting data
 */
export class ABetShow {
  data: NodeListOf<Element>;
  window: any;
  document: any;
  bets: IBettingData[];

  constructor(window: any, document: any) {
    this.window = window;
    this.document = document;
  }

  /**
   * Check if the dom matched the one expected.
   */
  check = (): boolean => false;

  /**
   * Scrape the whole dom to display the bets stored.
   */
  exec = (): any[] => [];
}
