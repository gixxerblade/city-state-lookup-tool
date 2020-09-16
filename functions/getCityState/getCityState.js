/* eslint-disable */
// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/
const xml2js = require("xml2js");
const fetch = require("node-fetch");
const userId = process.env.REACT_APP_USERID;

const xmlToJSON = (str, options) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(str, options, (err, jsonObj) => {
      if (err) {
        return reject(err);
      }
      resolve(jsonObj);
    });
  });
};

const lookup = (id, q) => {
  return `<CityStateLookupRequest USERID=${id}><ZipCode ID='0'><Zip5>${q}</Zip5></ZipCode></CityStateLookupRequest>`;
};

exports.handler = async function (event, context) {
  const zipcode = event.queryStringParamenter.zipcode;
  console.log(zipcode);
  const url = `https://secure.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML=`;
  const config = { headers: { "Content-Type": "text/xml" }, method: "get" };

  try {
    const response = await fetch(`${url}${lookup(userId, zipcode)}`, config);
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.text() };
    }
    const data = await response.text();
    console.log(data);
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
