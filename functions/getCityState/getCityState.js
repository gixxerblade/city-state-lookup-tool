const fetch = require("node-fetch");
const USERID = process.env.REACT_APP_USERID;
const BASE_URI =
  "http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=";
const config = {
  headers: { "Content-Type": "text/xml", "Access-Control-Allow-Origin": "*" },
  method: "get",
  mode: "no-cors",
};

exports.handler = async function (event, context) {
  const zipcode = event.queryStringParameters.zipcode;
  console.log("EVENT===", event.queryStringParameters);
  const xml = `<CityStateLookupRequest USERID="${USERID}"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`;
  try {
    console.log("ZIP: ", zipcode);
    const response = await fetch(`${BASE_URI}${xml}`, config);
    if (!response.ok) {
      return { statusCode: response.status, body: response };
    }
    const data = await response.text();

    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
