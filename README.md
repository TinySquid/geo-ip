![Project Preview](./assets/project-header.jpg)

# Geo-IP

[![Netlify Status](https://api.netlify.com/api/v1/badges/a57a4fb9-5d81-40cd-a52a-8ea6fea1daeb/deploy-status)](https://app.netlify.com/sites/ts-geo-ip/deploys)
![Code coverage from jest](https://img.shields.io/badge/coverage-92%25-green)

## [Click here to view the app](https://ts-geo-ip.netlify.app/)

A work-in-progress Gatsby web app built for finding the geographic location of an IP address or domain. Designed to look great on both desktop & mobile devices.

## Tech Stack

### Framework

- [Gatsby / React](https://www.gatsbyjs.com/)

### Testing

- [Jest](https://jestjs.io/) / [Supertest](https://github.com/visionmedia/supertest#readme)

### Styling

- [Styled Components](https://styled-components.com/)

### Third-Party

- [LeafletJS](https://leafletjs.com/) - For managing the interactive map and location waypoints
- [ipgeo](https://ipgeolocation.io/) - API that resolves IP addresses to geo-location.

## Architecture

The frontend of this app is built using the Gatsby framework and styled components. For the live map I am using LeafletJS with data from OpenStreetMaps. To keep API keys secure, I've built out a simple Node/Express backend with a basic API that acts as a go-between for the ipgeo API to frontend app.

## Local Development

If you want to get this up and running yourself, you first need to know the environment variables being used:

```
# FRONTEND ENV VARS
GATSBY_APP_HREF="<localhost or front end deployment link>"
GATSBY_GET_LOCAL_IP_ENDPOINT="https://<your backend api>.herokuapp.com/ip"
GATSBY_GET_IP_LOCATION_ENDPOINT="https://<your backend api>.herokuapp.com/location"


# BACKEND ENV VARS
PORT=5000

CORS_ORIGIN="https://<YOUR FRONTEND APP>.netlify.app"

IPGEO_API_KEY="<YOUR API KEY>"
IP_LOCATION_ENDPOINT="https://api.ipgeolocation.io/ipgeo"
```

Basically make sure you point your frontend env vars to your backend API wherever it's hosted. Note that Gatsby uses a `.env.development` & `.env.production` file so you can alter the values based on develop/build setting. Also of importance is the `CORS_ORIGIN` variable, that will need to be set to where your frontend is hosted, that way only your app can use the api.

After cloning the repository make sure you cd into and run the package manager of your choice inside `/app` and `/backend`. Also verify you have setup the correct `.env` files for each with the proper values set.

Once the project is done there will be better instructions for getting the app hosted on your own!

### Frontend scripts:

- `yarn start` / `yarn develop` - Runs the project in development mode on a hot-reload server @ http://localhost:8000/
- `yarn build` - Compiles the app for deployment
- `yarn serve` - Runs the app in production mode for testing @ http://localhost:9000
- `yarn clean` - Used to clear the cache / public dir when you encounter weird issues with the dev server or build problems
- `yarn test` - Runs tests with jest
- `yarn test:cov` - Generates a coverage report with jest
- `yarn format` - Runs prettier on the project if you don't already use the extension in your IDE

### Backend scripts:

- `yarn start` - Uses node to start the server
- `yarn develop` - Uses nodemon to run the server (will auto-reload on changes)
- `yarn test` - Runs tests with supertest

<!-- ## Screenshots -->

<!-- ### Desktop -->

<!-- ### Mobile -->

<hr />

## Original Challenge

[Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)
