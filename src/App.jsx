import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [info, getInfo] = useState([]); // stores json object returned from api call
  const [date, getDate] = useState(""); // gets the date
  const [loading, setLoading] = useState(true); // extra state for loading

  //original api call, calls on first render
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        getInfo(res.data.bpi); // sets data
        getDate(JSON.stringify(res.data.time.updated)); // sets time
        console.log(info); // logs data
        setLoading(false); // sets loading to false, to ensure that the page renders after api call is finished
      } catch (err) {
        console.log(err);
      }
    };
    getData(); // calls the getData function
  }, []);

  // updated api call, can call when you want updated data
  const updateData = async () => {
    try {
      const res = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      getInfo(res.data.bpi); // set data
      getDate(JSON.stringify(res.data.time.updated)); // set date
      console.log(info);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h2>CEO.CA Coding Challenge</h2>
        <button id="button" onClick={updateData}>
          Update Data
        </button>
        <h4 id="date">Updated Date: {date}</h4>
      </div>
      {/* only renders after loading is set to false*/}
      {!loading && (
        <tbody className="table">
          {/* Headers for table */}
          <tr>
            <th style={{ padding: "15px" }}>code</th>
            <th style={{ padding: "15px" }}>symbol</th>
            <th style={{ padding: "15px" }}>rate</th>
            <th style={{ padding: "15px" }}>description</th>
            <th style={{ padding: "15px" }}>rate float</th>
          </tr>
          {/* Data for EUR */}
          <tr>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.EUR.code)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.EUR.symbol)}
            </td>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.EUR.rate)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.EUR.description)}
            </td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.EUR.rate_float)}
            </td>
          </tr>
          {/* Data for GBP */}
          <tr>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.GBP.code)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.GBP.symbol)}
            </td>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.GBP.rate)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.GBP.description)}
            </td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.GBP.rate_float)}
            </td>
          </tr>
          {/* Data for USD */}
          <tr>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.USD.code)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.USD.symbol)}
            </td>
            <td style={{ padding: "15px" }}>{JSON.stringify(info.USD.rate)}</td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.USD.description)}
            </td>
            <td style={{ padding: "15px" }}>
              {JSON.stringify(info.USD.rate_float)}
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}

export default App;
