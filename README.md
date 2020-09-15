# City/State Lookup using USPS API

Using this API: https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc39492066

Endpoint: https://secure.shippingapis.com/ShippingAPI.dll?API= CityStateLookup&XML=(see below)

Data in XML

Concept of Ops:

## Front-end

- React for model, view, and control layer and UI
- Fetch from middleware

## Middleware

- Axios
- Process zipcode to xml data and request to api
- GET data from api
- Convert to JSON via package `xml2js`.
