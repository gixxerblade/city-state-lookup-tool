import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const initialCityState = { city: "", state: "" };
  const [zipcode, setZipcode] = useState("");
  const [cityState, setCityState] = useState(initialCityState);

  const zipLen = zipcode.length === 5 && zipcode;
  useEffect(() => {
    const fetchCityState = async () => {
      try {
        const response = await fetch(
          `../functions/getCityState/${zipcode}`,
          {}
        );
        const data = await response.text();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCityState();
    // eslint-disable-next-line
  }, [zipLen]);

  return (
    <div className="App">
      <h1>City/State Lookup Tool</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Zip Code Here</label>
        <input
          value={zipcode}
          placeholder="XXXXX"
          type="text"
          name="zip"
          id="zip"
          onChange={(event) => {
            const { value } = event.target;
            setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
          }}
        />
        <label htmlFor="city">City Here</label>
        <input
          value={cityState.city}
          type="text"
          name="city"
          disabled
          id="city"
        />
        <label htmlFor="state">State Here</label>
        <input
          value={cityState.state}
          type="text"
          name="state"
          disabled
          id="state"
        />
      </form>
      <pre>
        <code>{JSON.stringify(zipcode)}</code>
      </pre>
    </div>
  );
}

export default App;
