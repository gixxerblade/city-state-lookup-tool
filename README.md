# City/State Lookup using USPS API

Using this API: https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc39492066

Endpoint: https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=

## Sample Request

Request: CityStateLookup

```html
 <CityStateLookupRequest USERID="XXXXXXXXXXXX">
 <ZipCode ID='0'>
 <Zip5>20024</Zip5>
 </ZipCode>
 </CityStateLookupRequest>
 ```

Data in XML

## Introduction

User experience applies to every part of a website, including forms. You have to pay attention to accessibility, ease of use, and convenience. A form with good UX is easy to understand and to use. I mean, who likes filling in forms? Using this thought process I began to think what can I do to make a form at the [Vets Who Code website](www.vetswhocode.io/apply) more enjoyable. One of things I thought would be a good idea was to make the city and state self populate based on a user's US Postal Code (Applicants are all veterans of US Forces). I started looking for solutions. One was to use [ZipCodeAPI](www.zipcodeapi.com) but they charge for more than 10 requests per hour. Another one was [SmartyStreets](https://smartystreets.com/) because they have an awesome service for address verification, but I digress, they charge for over the limit as well. Here at Vets Who Code, we like to build our own tools. I immediately thought, "How hard can it be to make my own zip code API for our use?" It appears it's not hard to get the basic functionality using the [United States Postal Service's Web Tools](https://www.usps.com/business/web-tools-apis/), a 100% tax-payer funded service.

## Concept of Operations

- Build a tool to `fetch` the city and state of user based on zipcode.
- Determine if entered zipcode is 5-digits
- Determine if zipcode is valid
- If the zipcode is valid, display city and state in the city/state input boxes

### Potential Problems

#### CORS policy

```bash
Access to fetch at 'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field accept is not allowed by Access-Control-Allow-Headers in preflight response.
```

### Front-end

- React for model, view, and control layer and UI
- Fetch from serverless function

### Serverless Function

- Use Netlify Dev
- Process zipcode to xml data and request to api
- GET data from api
