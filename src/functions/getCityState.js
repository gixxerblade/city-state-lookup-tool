const userId = process.env.USERID;
const axios = require("axios");
const xml2js = require("xml2js");

const errorResponse = (err, callback) => {
  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 500,
    body: JSON.stringify({
      error: err,
    }),
  };

  if (typeof callback === "function") {
    callback(null, response);
  }
};

const lookup = (id, q) => {
  return `
<CityStateLookupRequest USERID=${id}>
<ZipCode ID='0'>
<Zip5>${q}</Zip5>
</ZipCode>
</CityStateLookupRequest>
`;
};

module.exports.handler = async (event, context, callback) => {
  const query = event.queryStringParamenter.zip;
  const url = `https://secure.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML=`;
  const config = { headers: { "Content-Type": "text/xml" } };
    
  try {
    axios.post(url, lookup(userId, 28574));
  }
};
