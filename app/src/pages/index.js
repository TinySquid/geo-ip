// React
import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

// Global Layout
import Layout from "../components/Layout/Layout";

// Components
import { BeatLoader } from "react-spinners";
import SearchBox from "../components/SearchBox/SearchBox";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import MapBox from "../components/MapBox/MapBox";
import LiveMarker from "../components/MapBox/LiveMarker";

// Hooks
import { useSearchHistory } from "../hooks/useSearchHistory";

// Utils
import { daysBetween } from "../utility/dateRange";
import { parseFromSearchHistory, parseFromAPI } from "../utility/parse";

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
  const [findSearchItem, addSearchItem, deleteSearchItem] = useSearchHistory(
    []
  );

  const [state, setState] = useState({
    searchIp: null,
    searchResult: {
      data: [
        { header: "ip address", text: "8.8.8.8" },
        { header: "location", text: "Mountain View, California 94043-1351" },
        { header: "timezone", text: "UTC -08:00" },
        { header: "isp", text: "Google LLC" },
      ],
      latlon: [37.4224, -122.08421],
    },
  });

  const search = useCallback(
    async (ip) => {
      let data = {}; // Returned object with keys 'searchIp' & 'searchResult'

      const searchItem = findSearchItem(ip);

      if (searchItem) {
        // Verify date
        const today = new Date().setHours(0, 0, 0, 0);

        if (daysBetween(new Date(searchItem.timestamp), today) < 7) {
          // Use existing location information from history
          const result = parseFromSearchHistory(searchItem);

          data = { searchIp: ip, searchResult: result };
        } else {
          // Search is stale, retrieve from API
          axios
            .get(`${process.env.GATSBY_GET_IP_LOCATION_ENDPOINT}?host=${ip}`)
            .then((response) => {
              const result = parseFromAPI(response.data);

              // Add new search, delete old
              addSearchItem(result.storageObject);

              deleteSearchItem(searchItem.timestamp);

              data = { searchIp: ip, searchResult: result.pageObject };
            });
        }
      } else {
        // Search doesn't exist, retrieve from API
        axios
          .get(`${process.env.GATSBY_GET_IP_LOCATION_ENDPOINT}?host=${ip}`)
          .then((response) => {
            const result = parseFromAPI(response.data);

            addSearchItem(result.storageObject);

            data = { searchIp: ip, searchResult: result.pageObject };
          });
      }

      return Promise.resolve(data);
    },
    [findSearchItem, addSearchItem, deleteSearchItem]
  );

  useEffect(() => {
    // Will get our local IP on initial page visit
    axios
      .get(`${process.env.GATSBY_GET_LOCAL_IP_ENDPOINT}`)
      .then((res) => {
        const { data } = res;

        if (data.success) {
          search(data.req)
            .then((result) => {
              setState(result);
            })
            .catch((error) => {
              console.log("Could not get location information", error);
            });
        }
      })
      .catch((error) => {
        console.log("Could not get local IP", error);
      });
  }, [search]);

  if (!state.searchIp)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <BeatLoader color={"#0E71E4"} size={20} margin={6} />
      </div>
    );

  return (
    <Layout>
      <Container>
        <Header>
          <Title>IP Address Locator</Title>
          <SearchBox initialValue={state.searchIp} search={search} />
          <InfoPanel data={state.searchResult.data} />
        </Header>
        <MapBox
          options={{
            style: { height: "calc(100vh - 300px)", width: "100vw" },
            center: state.searchResult.latlon,
            zoom: 15,
            zoomControl: false,
            scrollWheelZoom: true,
          }}
        >
          <LiveMarker position={state.searchResult.latlon} />
        </MapBox>
      </Container>
    </Layout>
  );
}
