import React from "react";
import Html5QrcodePlugin from "../components/Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "../components/ResultContainerPlugin.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      decodedResults: [],
    };

    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div className="App">
        <section className="App-section">
          <h1 className="App-section-title">PRESENSI DIGITAL PRAMUDAYU</h1>
          {/* <div id="scanner-qrcode" className="noprint"> */}
          <Html5QrcodePlugin
            className="noprint"
            fps={0.5}
            qrbox={256}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}
          />
          {/* </div> */}
          <ResultContainerPlugin results={this.state.decodedResults} />
          <button
            className="button-print noprint"
            onClick={() => window.print()}
          >
            Print
          </button>
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, scanResult) {
    const dataanggota = require("../data/dataanggota.json");

    if (!dataanggota[decodedText]) {
      return;
    }

    this.setState((state, props) => {
      state.decodedResults.push(dataanggota[decodedText]);
      return state;
    });
  }
}

export default App;
