# Personal Homepage using React Redux Typescript GraphQL over [Contentful](https://www.contentful.com)

## Features

* **universal** [**Redux**](https://github.com/reactjs/redux)
  * Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 2.x.
  * Asynchonous Data Fetching on server-side rendering via GraphQL
* [**Webpack**](https://github.com/webpack/webpack) for both development and production bundles. It"s (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!
* [**CSS Modules**](https://github.com/css-modules/css-modules) allows for modular and reusable CSS
* Express 4.x server
* Testing with Jest

## Instructions

### Build & Dev

**Installation**

```bash
yarn install
```

**Development**

```bash
# Starts the server
# Run webpack through webpack.config.dev.js
yarn run dev
```

**Production**

Run the commands below for a production build, i.e. what is deployed to Heroku. Assumes that pages in production are served over HTTPS.

```bash
# Clean public folder
# Run webpack through webpack.config.prod.js
yarn run build

# Start server
yarn start
```

## Data Flow

A simplistic representation of data flow from server to client is:

```
Express app.use() receives a request
-> Calls a pre-built webpack file for the server
-> Runs matching of routes in react-router for server
-> Makes async data fetching request
-> Renders Route component to string
-> Construct HTML file (with Meta, Link tags using helmet)
-> Browser receives html file with initial state
-> Client side React.JS kicks in and initializes with given state
-> Continues where it left off
-> Everyone is happy :)
```
