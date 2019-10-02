import { IBettingData } from "./IBettingData";

export class ABetPage {
  data: NodeListOf<Element>;
  window: any;
  document: any;

  constructor(window: any, document: any) {
    this.window = window;
    this.document = document;
  }

  check = (): boolean => {
    this.data = this.document.querySelectorAll('.history-container > ul > li');
    return this.data.length !== 0;
  }

  exec = (): IBettingData[] => []
}
