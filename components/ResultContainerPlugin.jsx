import React from "react";

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; ++i) {
    if (i === 0) {
      filteredResults.push(results[i]);
      continue;
    }

    if (filteredResults.includes(results[i]) == false) {
      filteredResults.push(results[i]);
      console.log("Data hasil scan: (DITAMBAH) ", filteredResults);

      // Push to SheetDB API (https://sheetdb.io/)
      let formdata = new FormData();
      formdata.append("nomor_induk", results[i].nomor_induk);
      formdata.append("nama_lengkap", results[i].nama_lengkap);
      formdata.append("golongan", results[i].golongan);
      formdata.append("jenis_kelamin", results[i].jenis_kelamin);
      formdata.append("timestamp", Date.now());
      formdata.append("keterangan", "HADIR");

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      console.log(formdata)

      // fetch("https://sheetdb.io/api/v1/8h4tj7ezfyl5d", requestOptions)
      //   .then((response) => response.text())
      //   .then((result) => console.info("DATA TERKIRIM KE API", result))
      //   .catch((error) => console.error("error", error));

    } else {
      console.log("Data hasil scan: (TIDAK DITAMBAH) ", filteredResults);
    }
  }
  return filteredResults;
}

class ResultContainerTable extends React.Component {
  render() {
    var results = filterResults(this.props.data);
    return (
      <table className={"Qrcode-result-table"}>
        <thead>
          <tr>
            <td>#</td>
            <td>Decoded Text</td>
            <td>Format</td>
            <td>Timestamp</td>
            <td>Foto</td>
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => {
            return (
              <tr key={i}>
                <td>{i}</td>
                <td>{result.nomor_induk}</td>
                <td>{result.nama_lengkap}</td>
                <td>{Date.now()}</td>
                <td className="image-user">
                  <img src="dummy-user.png" alt="" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

class ResultContainerPlugin extends React.Component {
  render() {
    let results = filterResults(this.props.results);
    return (
      <div className="Result-container">
        <h2 className="Result-header">Scanned results ({results.length})</h2>
        <div className="Result-section">
          <ResultContainerTable data={this.props.results} />
        </div>
      </div>
    );
  }
}

export default ResultContainerPlugin;
