![Mail carrier](https://citystatezipcode.s3.amazonaws.com/BlogArt_ZipCodeAllegiance%5B1%5D.jpg)

<!-- omit in toc -->
# City/State Lookup using United States Postal Service API

## Introduction

User experience applies to every part of a website, including forms. You have to pay attention to accessibility, ease of use, and convenience. A form with good UX is easy to understand and easy to use. Who likes filling in forms? Umm, nobody! Using this thought process, I began to research what can I do to make an applicant form at the [Vets Who Code website](www.vetswhocode.io/apply) easier to use. I thought would be a good idea was to make the city and state self populate based on a user's U.S. Postal Code (Applicants are all veterans of US Forces). I started studying solutions. One was to use [ZipCodeAPI](www.zipcodeapi.com) but they charge for more than 10 requests per hour, and I am not in a position to pay for their service. Here at Vets Who Code, we like to build our own tools. I immediately thought, "How hard can it be to make my own zip code API for our use?" It appears it's not hard to get the basic functionality using the [United States Postal Service's Web Tools](https://www.usps.com/business/web-tools-apis/), a 100% free, tax-payer-funded service.

## Goal

- Build a tool using React to `fetch` the city and state of user based on zipcode.
- Determine if entered zipcode is 5-digits.
- Determine if zipcode is valid.
- If the zipcode is valid, display city and state in the city/state input boxes.
- Add animation as the API "loads" the city and state.

<!-- omit in toc -->
### Front-end

- [React](https://reactjs.org/) for building the user interface
- Fetch API to GET items from the serverless function

<!-- omit in toc -->
### Backend

- Use [Netlify Dev](https://www.netlify.com/products/dev/) to create a serverless function
- Process zipcode to xml data and request to API
- GET data from API

<!-- omit in toc -->
## Table of Content

- [Introduction](#introduction)
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [CORS](#cors)
- [Setup](#setup)

## Prerequisites

- A basic understanding of HTML, CSS, and JavaScript.
- A basic understanding of the DOM.
- Yarn or npm & Nodejs installed globally.
- For the above three steps this overview of React by Tania Rascia is a great start. => https://www.taniarascia.com/getting-started-with-react/
- netlify-cli installed globally. `npm i -g netlify-cli` or `yarn add netlify-cli`
- Sign up for [USPS Web Tools](https://www.usps.com/business/web-tools-apis/).
- A code editor (I'm using [VS Code](https://code.visualstudio.com/)) I will do my best to show everything else.
- [Netlify](https://www.netlify.com/) account.
- [Github](https://github.com/) account.

## CORS

Loading publicly accessible APIs from the frontend during development presents some problems. Mainly Cross-Origin Resource Sharing. CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.

> Ever seen this error?

```bash
Access to fetch at 'https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field accept is not allowed by Access-Control-Allow-Headers in preflight response.
```

## Setup

Going under the presupposition that you have a basic understanding of HTML, CSS, and JavaScript, I am assuming you have installed `npm`, the latest version of `node`, React, `netlify-cli`, have a GitHub and Netlify account, and have registered to use USPS WebTools.

1. Create a new repo on github.
2. Create a new React project by typing `npx create-react-app <new-github-repo-name>`
3. Delete all the boilerplate React code in `App.js`, so you're left with this:

```javascript
import React from "react";
import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App;
```

4. Delete all the CSS code in `App.css`.
5. Push your code to Github to the repo you created earlier using these instructions => https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line
6. Go to app.netlify.com and login. Follow the instructions here to add a new site from Git => https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/

You should now be setup to start the tutorial



<!-- omit in toc -->
## Sample Request

Request: CityStateLookup

```html
<CityStateLookupRequest USERID="XXXXXXXXXXXX">
  <ZipCode ID="0">
    <Zip5>20024</Zip5>
  </ZipCode>
</CityStateLookupRequest>
```

Data in XML
