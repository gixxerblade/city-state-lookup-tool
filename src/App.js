import React, { useEffect, useState } from "react";
import "./App.css";

const xml2json = (srcDOM) => {
  let children = [...srcDOM.children];
  // base case for recursion.
  if (!children.length) {
    return srcDOM.innerHTML;
  }
  // initializing object to be returned.
  let jsonResult = {};
  for (let child of children) {
    // checking is child has siblings of same name.
    let childIsArray =
      children.filter((eachChild) => eachChild.nodeName === child.nodeName)
        .length > 1;
    // if child is array, save the values as array, else as strings.
    if (childIsArray) {
      if (jsonResult[child.nodeName] === undefined) {
        jsonResult[child.nodeName] = [xml2json(child)];
      } else {
        jsonResult[child.nodeName].push(xml2json(child));
      }
    } else {
      jsonResult[child.nodeName] = xml2json(child);
    }
  }
  return jsonResult;
};

function App() {
  const parser = new DOMParser();

  const initialCityState = { city: "", state: "" };
  // eslint-disable-next-line
  const [cityState, setCityState] = useState(initialCityState);
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);
  const isZipValid = zipcode.length === 5 && zipcode;

  useEffect(() => {
    const fetchCityState = async () => {
      try {
        if (isZipValid) {
          const response = await fetch(
            `/.netlify/functions/getCityState?&zipcode=${zipcode}`,
            {
              headers: { accept: "application/json" },
            }
          );
          const data = await response.text();
          const srcDOM = parser.parseFromString(data, "application/xml");
          console.log(xml2json(srcDOM));
          const res = xml2json(srcDOM);
          if (res?.CityStateLookupResponse?.ZipCode?.City) {
            setLoading(false);
            setCityState({
              ...cityState,
              city: res.CityStateLookupResponse.ZipCode.City,
              state: res.CityStateLookupResponse.ZipCode.State,
            });
          } else if (res?.CityStateLookupResponse?.ZipCode?.Error) {
            setLoading(false);
            setCityState({
              ...cityState,
              city: `Invalid Zip Code for ${zipcode}`,
              state: "Try Again",
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCityState();
  }, [zipcode]);

  return (
    <div className="App">
      <h1>City/State Lookup Tool</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Type Zip Code Here</label>
        <input
          maxLength="5"
          className="zip"
          value={zipcode || ""}
          placeholder="XXXXX"
          type="text"
          name="zip"
          id="zip"
          onChange={(event) => {
            const { value } = event.target;
            setLoading(true);
            setCityState(initialCityState);
            setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
          }}
        />
        <label htmlFor="city">City</label>
        <div className="input-container">
          <input
            className={`city`}
            value={cityState.city}
            type="text"
            name="city"
            disabled
            id="city"
          />
          <div className="icon-container">
            <i className={`${loading && isZipValid ? "loader" : ""}`}></i>
          </div>
        </div>
        <label htmlFor="state">State</label>
        <div className="input-container">
          <input
            className={`state`}
            value={cityState.state}
            type="text"
            name="state"
            disabled
            id="state"
          />
          <div className="icon-container">
            <i className={`${loading && isZipValid ? "loader" : ""}`}></i>
          </div>
        </div>
      </form>
      <pre>
        <code>
          {JSON.stringify({
            zipcode: zipcode,
            city: cityState.city,
            state: cityState.state,
          })}
        </code>
      </pre>
    </div>
  );
}

export default App;
