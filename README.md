![Project Preview](./assets/project-header.jpg)

# Geo-IP

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

Built into a PWA using Gatsby, with map rendering handled by LeafletJS and ip information coming from the ipify API. Styling and theming is implemented with styled-components.

I chose Gatsby again on this challenge to continue gaining experience with it and I've picked styled-components because while I have used it before, I haven't touched the theming aspect of it.

## Local Development

After cloning the repository and installing the required dependencies via npm or yarn, you can run the following scripts from the project root directory:

- `yarn start` / `yarn develop` - Runs the project in development mode on a hot-reload server @ http://localhost:8000/
- `yarn build` - Compiles the app for deployment
- `yarn serve` - Runs the app in production mode for testing @ http://localhost:9000
- `yarn clean` - Used to clear the cache / public dir when you encounter weird issues with the dev server
- `yarn test` - Runs tests

<!-- ## Screenshots -->

<!-- ### Desktop -->

<!-- ### Mobile -->

<hr />

## Original Challenge

[Frontend Mentor Challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)
