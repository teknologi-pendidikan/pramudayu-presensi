import React from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin.jsx'
import ResultContainerPlugin from '../components/ResultContainerPlugin.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      decodedResults: []
    }

    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <div className="App">
        <section className="App-section">
          <div className="App-section-title">QRCODE-SCANTEST</div>
          <Html5QrcodePlugin 
            fps={1}
            qrbox={512}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
          <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
    );
  }

  onNewScanResult(decodedText, scanResult) {

    console.log(decodedText)
    const dataanggota = require("../data/dataanggota.json")

    if (!dataanggota[decodedText]) {
      console.log("Data tidak ditemukan")
      return;
    }

    if (decodedText in dataanggota) {
      console.log("Data ditemukan")
      console.log(dataanggota[decodedText])
    }

    this.setState((state, props) => {
      state.decodedResults.push(dataanggota[decodedText]);
      return state;
    });
  }
}

export default App;
