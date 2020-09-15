import React, { useEffect, useState } from "react";
import "./App.css";

const lookup = (id, q) => {
  return `<CityStateLookupRequest USERID=${id}><ZipCode ID='0'><Zip5>${q}</Zip5></ZipCode></CityStateLookupRequest>`;
};

function App() {
  const initialCityState = { city: "", state: "" };
  const [zipcode, setZipcode] = useState("");
  const [cityState, setCityState] = useState(initialCityState);
  const url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=`;
  const config = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    method: "get",
  };
  const userId = process.env.REACT_APP_USERID;

  console.log(`${url}${lookup(userId, zipcode)}`);
  useEffect(() => {
    const fetchCityState = async () => {
      try {
        const response = await fetch(
          `${url}${lookup(userId, zipcode)}`,
          config
        );
        const data = response;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCityState();
  }, [zipcode.length === 5]);

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
