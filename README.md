![Mail carrier](https://citystatezipcode.s3.amazonaws.com/BlogArt_ZipCodeAllegiance%5B1%5D.jpg)

<!-- omit in toc -->

# City/State Lookup using United States Postal Service API

## Introduction

User experience applies to every part of a website, including forms. You have to pay attention to accessibility, ease of use, and convenience. A form with good UX is easy to understand and easy to use. Who likes filling in forms? Umm, nobody! Using this thought process, I began to research what can I do to make an applicant form at the [Vets Who Code website](www.vetswhocode.io/apply) easier to use. I thought would be a good idea was to make the city and state self populate based on a user's U.S. Postal Code (Applicants are all veterans of US Forces). I started studying solutions. One was to use [ZipCodeAPI](www.zipcodeapi.com) but they charge for more than 10 requests per hour, and I am not in a position to pay for their service. Here at Vets Who Code, we like to build our own tools. I immediately thought, "How hard can it be to make my own zip code API for our use?" It appears it's not hard to get the basic functionality using the [United States Postal Service's Web Tools](https://www.usps.com/business/web-tools-apis/), a 100% free, U.S. tax-payer-funded service.

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
- [CORS :smiling_imp:](#cors-)
- [Setup](#setup)
- [Frontend Form](#frontend-form)

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

## CORS :smiling_imp:

Loading publicly accessible APIs from the frontend during development presents some problems. Mainly **Cross-Origin Resource Sharing** (CORS). CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts.

> Ever seen this error?

![CORS Policy](https://citystatezipcode.s3.amazonaws.com/corspolicy.png)

## Typing vs Copying and Pasting Code

I am a very big believer in typing code out that you intend to use for anything. Typing code versus copypasta provides a better learning return on investment because we're practicing instead of just reading. When we copy code without understanding it, we have a lesser chance of understanding what is happening. While it's nice to see our outcomes immediately the reward comes from understanding what we are doing. With that said, please don't copy and paste the code from this tutorial. Type. Everything. Out. You'll be a better programmer for it, trust me.

## Setup

Going under the assupmtion that you have a basic understanding of HTML, CSS, and JavaScript, I am assuming you have installed `npm` or `yarn`, the latest version of `node`, React, `netlify-cli`, have a GitHub and Netlify account, and have registered to use USPS WebTools.

1. Create a new repo on github.
2. Create a new React site by typing `npx create-react-app <new-github-repo-name>`
3. Navigate to your new folder by typing `cd <new-github-repo-name>`
4. Delete all the boilerplate React code in `App.js`, so you're left with this:

```javascript
import React from "react";
import "./App.css";

function App() {
  return <div className="App"></div>;
}

export default App;
```

5. Delete all the CSS code in `App.css`.
6. Copy and paste the CSS code from this link => [App.css](https://citystatezipcode.s3.amazonaws.com/App.css).
7. Push your code to Github to the repo you created earlier using these instructions => https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line
8. Go to app.netlify.com and login. Follow the instructions here to add your new site from Git => https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/

You should now be setup to start the tutorial

## Frontend Form

First, let's start our development server. Type `yarn start` or `npm start` into your terminal.

Since we are trying to fetch a city and state we need to create a form. It's a pretty standard so I won't go too big into explaining it.

In the code below, we set a couple states using the React `useState()` hooks. We also set an initial value for the `cityState` so it starts as an empty string.

We also added `<code>` so we can view our inputs as they are updated. (This can be removed later)

We `disabled` the city and state input boxes because we do not want our user to have the ability to change it. You can also use the `readonly` attribute as well. The difference is minor but may make a difference depending on the end state of your form and accessibility needs. A `readonly` element is just not editable, but gets sent when the form submits. A `disabled` element isn't editable and isn't sent on submit. Another difference is that `readonly` elements can be focused (and getting focused when "tabbing" through a form) while disabled elements cannot.

If you notice, there is nothing to `submit` the form because we are going to update the city and state as the user types into the zipcode input. You will also notice that you can't actually type anything into the form. We will fix this next.

```javascript
import React, { useState } from "react";
import "./App.css";

function App() {
  const initialCityState = { city: "", state: "" };
  const [cityState, setCityState] = useState(initialCityState);
  const [zipcode, setZipcode] = useState("");
  return (
    <div className="App">
      <h1>City/State Lookup Tool</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Type Zip Code Here</label>
        <input
          className="zip"
          value={zipcode}
          placeholder="XXXXX"
          type="text"
          name="zip"
          id="zip"
        />
        <label htmlFor="city">City</label>
        <input
          className={`city`}
          value={cityState.city}
          type="text"
          name="city"
          disabled
          id="city"
        />
        <label htmlFor="state">State</label>
        <input
          className={`state`}
          value={cityState.state}
          type="text"
          name="state"
          disabled
          id="state"
        />
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
```

If you typed everything correctly, you should see this:

![React started](https://citystatezipcode.s3.amazonaws.com/yarnstart.PNG)

Let's add a little action to this form.

We add an `onChange` handler to our `zipcode` element so that we can update the zipcode.

We destructured the `value` from `event.target.value` to make it easier to read.

We also add some validation and an [input mask](https://dev.to/vetswhocode/how-to-normalize-an-input-colloquially-known-as-how-to-create-an-input-mask-5gh4); this way we can insure that a user will only enter numbers and that it will only be five numbers (The length of US Postal Codes). The `value.replace(/[^\d{5}]$/, "").substr(0, 5))` block has a regular expression to only allow numbers and the `substr` will only allow five in the form.

Now as you type in the form the code block at the bottom will update the zipcode.

```javascript
<input
  className="zip"
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
```

This is what you should be left with:

![zip entered gif](https://citystatezipcode.s3.amazonaws.com/typezip.gif)

## Netlify Functions

The previously installed `netlify-cli` comes with some cool tools. One of them creates a serverless function that acts as a go between the frontend and an API that the app is trying to connect with. To interface with Netlify follow these steps:

1. `netlify init` - This command is going to set off a chain of events. Firstly, if you have a Netlify account, it is going to ask for permission to access Netlify on your behalf. I would recommend clicking "Authorize". Close the browser and then return to your editor.
2. Next, Netlify is going to ask if you want to create a Netlify site without a git repo. Click "No, I will connect this directory with Github first. Follow the instructions. It's going to walk you through the process of setting up a new repo and pushing it.
3. Type `netlify init` again.
4. Select `Create & configure a new site`. Part of the prerequisites required creating a Netlify account. This part will log yo in to Netlify. After that, select your 'team'.
5. Name your site. It has a naming convention of only alphanumeric characters only so something like `city-state-lookup-tool' would work.
6. You'll now have your partially completed app live.
7. Next select `Authorize with Github through app.netlify.com`. A new page will open asking you to allow Netlify access to your repo. Once you allow access, you can close that browser window.
8. The Netlify tool is going to ask you the build command for your site. For yarn it `CI=false yarn build`, for npm it's `CI=false npm run build`. The `CI=false` flag preceding the build command will stop treating warnings as errors, which will prevent your site from being built.
9. `Directory to deploy?` leave blank
10. `Netlify functions folder?` type `functions`
11. `No netlify.toml detected. Would you like to create one with these build settings?` Type `Y`
12. After this a series of steps will happen and you'll end up with `Success! Netlify CI/CD Configured!`.

A new file should have been created named `netlify.toml`. If you open it up it should look similar to this:

```toml
[build]
  command = "CI=false yarn build"
  functions = "functions"
  publish: "."
```

## Serverless Functions

To talk to our back end without any CORS issues we need to create a serverless function. A serverless function is an app that runs on a managed server, like AWS or in this case, Netlify. The companies then manage the the server maintenance and execution of the code. They are nice because the serverless framweorks handle the go between a hosted API and the frontend application.

![serverless architechture](https://citystatezipcode.s3.amazonaws.com/serverlessArchitechture.png)

1. In your terminal type `netlify functions:create`.
2. Typing this will create a dialog. Select `node-fetch`
3. Name your function something easy to remember like `getCityState`. If you observe we now have a new folder located at the root of your directory named `functions`. In it should be the generated file named `getCityState.js` with a `node_modules` folder, and a few other files.
4. Open the `getCityState.js` file and delete the content below `const fetch = require("node-fetch")`

In the `getCityState.js` file add a couple of constants. One is for the secret key which we'll handle soon, one is for the API request link, and the last one is HTML headers which the frontend needs to handle permission to read what the function returns.

```javascript
const fetch = require("node-fetch");

const USER_ID = process.env.REACT_APP_USERID;
const BASE_URI =
  "http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=";
const config = {
  headers: {
    "Content-Type": "text/xml",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET",
  },
  method: "get",
};
```

Below that add the main function:

```javascript
exports.handler = async function (event, context) {
  // The zipcode is sent by the frontend application. This is where we use it.
  const zipcode = event.queryStringParameters.zipcode;

  // The xml variable is the string we are going to send to the USPS to request the information
  const xml = `<CityStateLookupRequest USERID="${USERID}"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`;
  try {
    // Using synatantic sugar (async/await) we send a fetch request with all the
    // required information to the USPS.
    const response = await fetch(`${BASE_URI}${xml}`, config);
    // We first check if we got a good response. response.ok is saying hey, did
    // we receive a good response?
    if (!response.ok) {
      // If we did get a good response we store the response object in the
      // variable
      return { statusCode: response.status, body: response };
    }
    // Format the response as text because the USPS response is not
    // JSON but xml
    const data = await response.text();
    // Return the response to the frontend where it will be used.
    return {
      statusCode: 200,
      body: data,
    };
    // Error checking is very important because if we don't get a response this
    // is what we will use to troubleshoot problems
  } catch (err) {
    console.log("Error: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
```

Add a new file named `.env` the root of the project and add your user information from the USPS. When you signed up they should have sent an email with this information. The title of the email should be similar to **Important USPS Web Tools Registration Notice** from *registration@shippingapis.com*

In the `.env` file:

```env
# USPS API Info:
REACT_APP_USERID="1234567890123"
```

> **IMPORTANT!!!**
> ADD YOUR .ENV FILE TO THE `.gitignore` FILE

## Putting it all together

Up to this point we've created a form where we can enter a zipcode, santized our input, created a repo on Github, connected the repo to Netlify, and created a serverless function. Now to put it all together and get some info from the USPS to display the city and state of the entered zipcode by "fetching" the data.

In `App.js` import `useEffect` and add the `useEffect` hook

```javascript
import React, { useState, useEffect } from "react";

function App() {
  const initialCityState = { city: "", state: "" };
  // eslint-disable-next-line
  const [cityState, setCityState] = useState(initialCityState);
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCityState = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/getCityState?zipcode=${zipcode}`,
          { headers: { accept: "application/json" } }
        );
        const data = await response.text();
        console.log(data)
      } catch (e) {
        console.log(e);
      }
    };

    fetchCityState();
  }, [zipcode]);
}
```

Let's go ahead and restart our development server, except this time use `netlify dev` instead of `yarn start` or `npm start`. We're using this command now because Netlify is going to start taking over things like connection to a serverless function.

To be continued...

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
