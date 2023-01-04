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
            fps={0.5}
            qrbox={512}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
            <br></br>
            <button onClick={() => window.print()}>Print</button>
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

    let formdata = new FormData();
    formdata.append("nomor_induk", dataanggota[decodedText].nomor_induk);
    formdata.append("nama_lengkap", dataanggota[decodedText].nama_lengkap);
    formdata.append("golongan", dataanggota[decodedText].golongan);
    formdata.append("jenis_kelamin", dataanggota[decodedText].jenis_kelamin);
    formdata.append("timestamp", Date.now());
    formdata.append("keterangan", "HADIR");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://sheetdb.io/api/v1/8h4tj7ezfyl5d", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    this.setState((state, props) => {
      state.decodedResults.push(dataanggota[decodedText]);
      return state;
    });
  }
}

export default App;
