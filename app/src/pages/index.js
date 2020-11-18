// React
import React, { useState, useEffect } from "react";

import axios from "axios";

// Global Layout
import Layout from "../components/Layout/Layout";

// Components
import SearchBox from "../components/SearchBox/SearchBox";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import MapBox from "../components/MapBox/MapBox";
import LiveMarker from "../components/MapBox/LiveMarker";

import { daysBetween } from "../utility/dateRange";

// SC
import styled from "styled-components";
import HeaderBackground from "../assets/pattern-bg.png";

const Container = styled.div`
  text-align: center;
  overflow-x: hidden; // Removes horiz scroll from background on resize
`;

const Header = styled.div`
  background-image: url(${HeaderBackground});
  background-color: #2f3fcf; // Fallback for no img
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: white;

  margin: 0;
  padding: 35px 0 0 0;

  // Mobile
  @media (max-width: 760px) {
    font-size: 26px;

    padding: 25px 0 0 0;
  }
`;

export default function Home() {
  const [localIp, setLocalIp] = useState(null);
  const [searchResult, setSearchResult] = useState({
    data: [
      { header: "ip address", text: "192.212.174.101" },
      { header: "location", text: "Brooklyn, NY 10001" },
      { header: "timezone", text: "UTC -05:00" },
      { header: "isp", text: "SpaceX Starlink" },
    ],
    coords: [51.505, -0.09],
  });

  async function getLocalIpAddress() {
    /* Getting the client's IP is difficult. 
      I've setup this environment variable so you can change it, but by default I'm using https://www.cloudflare.com/cdn-cgi/trace
      The cloudflare endpoint returns a plain-text response and is subject to change at their will so a proxy backend would be better in this instance.
    */
    return axios.get(`${process.env.GET_LOCAL_IP_ENDPOINT}`);
  }

  async function getIpLocationData(localIp) {
    // Retrieve ip location data
    return axios.get(
      `${process.env.GET_IP_LOCATION_ENDPOINT}?apiKey=${process.env.IPIFY_API_KEY}&ipAddress=${localIp}`
    );
  }

  function updateSearchHistory(search) {
    const searchHistory = localStorage.getItem("cache");

    if (searchHistory) {
      // pre-existing cache
      localStorage.setItem(
        "cache",
        JSON.stringify([...JSON.parse(searchHistory), search])
      );
    } else {
      // First store to cache
      localStorage.setItem("cache", JSON.stringify([search]));
    }
  }

  function parseSearchResultFromAPI(data) {
    // parse for InfoPanel component to render
    /* Expected input to be object with keys:
      {
        ip,
        location: {
          region,
          city,
          lat,
          lng,
          postalCode,
          timezone
        },
        isp
      }
    */

    // Parse to format for info panel to use
    const searchResult = {
      // Used by InfoPanel
      ip: data.ip,
      location: `${data.location.city}, ${data.location.region} ${data.location.postalCode}`,
      timezone: `UTC ${data.location.timezone}`,
      isp: data.isp,

      // Used by map
      coords: [data.location.lat, data.location.lng],

      // Used to decrease API usage
      date: new Date().setHours(0, 0, 0, 0),
    };

    // Send to state
    _searchResultHelper(searchResult);

    // Update cache since this is new data
    updateSearchHistory(searchResult);
  }

  function parseSearchResultFromCache(cacheResult) {
    // Cache already in correct format to be displayed
    _searchResultHelper(cacheResult);
  }

  function _searchResultHelper(search) {
    // Used by the parse functions to set the search result state for the page. *DO NOT USE ON ITS OWN*
    setSearchResult({
      data: [
        { header: "ip address", text: search.ip },
        { header: "location", text: search.location },
        { header: "timezone", text: search.timezone },
        { header: "isp", text: search.isp },
      ],
      coords: search.coords,
    });
  }

  // By default we want to get our local ip onMount
  useEffect(() => {
    // Gatsby build-time guard
    if (typeof window !== "undefined" && window) {
      (async () => {
        const { data } = await getLocalIpAddress();

        // Data comes back as plain-text so I parse by spliting & retrieving the ip by index before trimming the key off
        setLocalIp(data.split("\n")[2].substring(3));
      })();
    }
  }, []);

  // Will determine if we grab location data from cache or API
  useEffect(() => {
    // Gatsby build-time guard
    if (typeof window !== "undefined" && window) {
      if (localIp) {
        // Get cache
        const searchHistory = JSON.parse(localStorage.getItem("cache"));

        if (!searchHistory) {
          // Get fresh location data and setup cache for next use
          (async () => {
            const { data } = await getIpLocationData(localIp);

            parseSearchResultFromAPI(data);
          })();
        } else {
          // Verify cache search is not stale
          const cachedResult = searchHistory.filter(
            (search) => search.ip === localIp
          );

          if (cachedResult.length > 0) {
            const today = new Date().setHours(0, 0, 0, 0);

            if (daysBetween(new Date(cachedResult[0].date), today) < 7) {
              parseSearchResultFromCache(cachedResult[0]);
            } else {
              (async () => {
                const { data } = await getIpLocationData(localIp);

                parseSearchResultFromAPI(data);
              })();
            }
          }
        }
      }
    }
  }, [localIp]);

  return (
    <Layout>
      <Container>
        <Header>
          <Title>IP Address Tracker</Title>
          <SearchBox initialValue={localIp} />
          <InfoPanel data={searchResult.data} />
        </Header>
        <MapBox
          options={{
            style: { height: "calc(100vh - 300px)", width: "100vw" },
            center: searchResult.coords,
            zoom: 15,
            zoomControl: false,
            scrollWheelZoom: true,
          }}
        >
          <LiveMarker position={searchResult.coords} />
        </MapBox>
      </Container>
    </Layout>
  );
}
