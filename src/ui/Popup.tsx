import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.scss"
import { IBettingData } from "../definition/IBettingData"

import Bet from './Bet'

interface state {
  bets: IBettingData[];
  filter?: string;
}

const listener = (message, sender, sendResponse, cbState) => {
  switch (message.type) {
    case 'print_bets': {
      cbState({ bets: message.data || [] });
    }
  }
}

class Popup extends React.Component<{}, state> {
  constructor(props) {
    super(props)
    this.state = {
      bets: [],
      filter: ''
    }
    console.log('Construct');
  }

  chromeListener = (message, sender, sendResponse) => {
    listener(
      message,
      sender,
      sendResponse,
      (newState) => this.setState(newState)
    )
  }

  componentDidMount() {
    const that = this
    chrome.storage.sync.get(['bets'], (result) => {
      that.setState({ bets: result.bets || [] });
      window.chrome.runtime.onMessage.addListener(this.chromeListener);
    });
  }

  componentWillUnmount() {
    window.chrome.runtime.onMessage.removeListener(this.chromeListener);
  }

  render() {
    return (
      <div className="popup-padded">
        <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
        <h2 style={{color: 'green'}}>Nbr bets to add: {this.state.bets.length}</h2>
        <ol>
          {this.state.bets.map((bet) => <Bet bet={bet} />)}
        </ol>
      </div>
    )
  }
}

// --------------

ReactDOM.render(
  <Popup />,
  document.getElementById('root')
)
