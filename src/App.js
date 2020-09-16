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
  const zipLen = zipcode.length === 5 && zipcode;

  useEffect(() => {
    const fetchCityState = async () => {
      try {
        if (zipLen) {
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
          setCityState({
            ...cityState,
            city: res.CityStateLookupResponse.ZipCode.City,
            state: res.CityStateLookupResponse.ZipCode.State,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCityState();
    // eslint-disable-next-line
  }, [zipcode]);

  return (
    <div className="App">
      <h1>City/State Lookup Tool</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Zip Code Here</label>
        <input
          value={zipcode || ""}
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
//setCityState({...cityState, city: cityState.city, state: cityState.state})
