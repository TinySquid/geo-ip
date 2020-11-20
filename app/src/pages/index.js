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
    latlon: [51.505, -0.09],
  });

  async function getLocalIpAddress() {
    // Hits backend /ip endpoint to get our local ip
    return axios.get(`${process.env.GET_LOCAL_IP_ENDPOINT}`);
  }

  async function getIpLocationData(ipOrDomain) {
    // Hits backend /location endpoint to get information about passed ip / domain
    return axios.get(
      `${process.env.GET_IP_LOCATION_ENDPOINT}?host=${ipOrDomain}`
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
    // Don't need req flag in our localstorage...
    delete data.success;

    // Send to state
    _searchResultHelper(data);

    // Update cache since this is new data
    updateSearchHistory(data);
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
      latlon: search.latlon,
    });
  }

  // By default we want to get our local ip onMount
  useEffect(() => {
    // Gatsby build-time guard
    if (typeof window !== "undefined" && window) {
      (async () => {
        const { data } = await getLocalIpAddress();

        setLocalIp(data.req);
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

            if (daysBetween(new Date(cachedResult[0].timestamp), today) < 7) {
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
          <Title>IP Address Locator</Title>
          <SearchBox initialValue={localIp} />
          <InfoPanel data={searchResult.data} />
        </Header>
        <MapBox
          options={{
            style: { height: "calc(100vh - 300px)", width: "100vw" },
            center: searchResult.latlon,
            zoom: 15,
            zoomControl: false,
            scrollWheelZoom: true,
          }}
        >
          <LiveMarker position={searchResult.latlon} />
        </MapBox>
      </Container>
    </Layout>
  );
}
