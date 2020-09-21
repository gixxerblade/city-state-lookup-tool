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

## Setup

Going under the presupposition that you have a basic understanding of HTML, CSS, and JavaScript, I am assuming you have installed `npm`, the latest version of `node`, React, `netlify-cli`, have a GitHub and Netlify account, and have registered to use USPS WebTools.

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

We `disabled` the city and state input boxes because we do not want our user to have the ability to change it. You can also use the `readonly` attribute as well. The difference is minor but may make a difference depending on the end state of your form and accessibility needs. A `readonly` element is just not editable, but gets sent when the form submits. A `disabled` element isn't editable and isn't sent on submit. Another difference is that `readonly` elements can be focused (and getting focused when "tabbing" through a form) while disabled elements can't

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
