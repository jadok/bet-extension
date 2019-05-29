import * as React from "react"
import * as ReactDOM from "react-dom"

import "../styles/popup.css"

interface state {
  nbrElems: number;
}

class Hello extends React.Component<{}, state> {
  constructor(props) {
    super(props)
    this.state = {
      nbrElems: 0
    }
  }
  componentDidMount() {
    const that = this
    chrome.storage.local.get(['bets'], function(result) {
      console.log(result)
      that.setState({ nbrElems: result.bets.length });
    });
  }
  render() {
    return (
      <div className="popup-padded">
        <h1>{ chrome.i18n.getMessage("l10nHello") }</h1>
        <h2 style={{color: 'green'}}>Nbr bets to add: {this.state.nbrElems}</h2>
      </div>
    )
  }
}

// --------------

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
)