![Project Preview](./assets/project-header.jpg)

# Geo-IP

[![Netlify Status](https://api.netlify.com/api/v1/badges/a57a4fb9-5d81-40cd-a52a-8ea6fea1daeb/deploy-status)](https://app.netlify.com/sites/ts-geo-ip/deploys)

<!-- ## [Click here to view the app](#) -->

A Gatsby PWA for finding the geographic location of an IP address. Built to look great on both desktop & mobile devices.

## Tech Stack

### Framework

- [Gatsby / React](https://www.gatsbyjs.com/)

### Styling

- [Styled Components](https://styled-components.com/)

### Third-Party

- [LeafletJS](https://leafletjs.com/) - For managing the interactive map and location waypoints
- [ipify](https://geo.ipify.org/) - API that resolves IP addresses to geo-location.

## Architecture

Built into a PWA using Gatsby, with map rendering handled by LeafletJS and ip information coming from the ipify API. Styling is implemented with styled-components. I followed the TDD approach and so far only modified tests when absolutely necessary. Tests were written using jest.

## Local Development

After cloning the repository make sure you cd into the `/app` directory before installing packages or running available scripts:

- `yarn start` / `yarn develop` - Runs the project in development mode on a hot-reload server @ http://localhost:8000/
- `yarn build` - Compiles the app for deployment
- `yarn serve` - Runs the app in production mode for testing @ http://localhost:9000
- `yarn clean` - Used to clear the cache / public dir when you encounter weird issues with the dev server
- `yarn test` - Runs tests
- `yarn format` - Runs prettier on the project

<!-- ## Screenshots -->

<!-- ### Desktop -->

<!-- ### Mobile -->

<hr />

## Original Challenge

[Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)
